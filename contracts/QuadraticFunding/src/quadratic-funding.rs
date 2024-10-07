#![cfg_attr(not(feature = "std"), no_std)]

use ink::env::DefaultEnvironment;
use ink::storage::Mapping;
use ink_lang as ink;
use ink::prelude::vec::Vec;
use ink::prelude::string::String;

#[ink::contract]
mod quadratic_funding {
    use super::*;
    
    #[ink(storage)]
    pub struct QuadraticFunding {
        matching_pool_amount: Balance,
        event_count: u64,
        events: Mapping<u64, Event>,
        contributions: Mapping<(AccountId, u64), Balance>,
        projects_by_event: Mapping<u64, Vec<AccountId>>,
        approved_events: Mapping<u64, bool>,
        token: AccountId,
    }

    #[derive(scale::Encode, scale::Decode, Clone, Debug, PartialEq, Eq)]
    #[cfg_attr(feature = "std", derive(scale_info::TypeInfo))]
    pub struct Event {
        name: String,
        start_date_time: u64,
        end_date_time: u64,
        organizer: AccountId,
    }

    #[ink(event)]
    pub struct EventSubmitted {
        #[ink(topic)]
        id: u64,
        name: String,
        start_date_time: u64,
        end_date_time: u64,
        organizer: AccountId,
    }

    #[ink(event)]
    pub struct EventApproved {
        #[ink(topic)]
        id: u64,
    }

    impl QuadraticFunding {
        #[ink(constructor)]
        pub fn new(matching_pool_amount: Balance, token: AccountId) -> Self {
            Self {
                matching_pool_amount,
                event_count: 0,
                events: Mapping::new(),
                contributions: Mapping::new(),
                projects_by_event: Mapping::new(),
                approved_events: Mapping::new(),
                token,
            }
        }

        #[ink(message)]
        pub fn submit_event(&mut self, name: String, start_date_time: u64, end_date_time: u64) {
            assert!(start_date_time < end_date_time, "Invalid time range");
            assert!(!self.has_conflict(start_date_time, end_date_time), "Time slot conflict");

            self.event_count += 1;
            let event = Event {
                name: name.clone(),
                start_date_time,
                end_date_time,
                organizer: self.env().caller(),
            };
            self.events.insert(self.event_count, &event);

            self.env().emit_event(EventSubmitted {
                id: self.event_count,
                name,
                start_date_time,
                end_date_time,
                organizer: self.env().caller(),
            });
        }

        #[ink(message)]
        pub fn approve_event(&mut self, event_id: u64) {
            assert!(self.events.contains(event_id), "Event does not exist");
            assert!(!self.approved_events.get(event_id).unwrap_or(false), "Event already approved");

            self.approved_events.insert(event_id, &true);
            self.env().emit_event(EventApproved { id: event_id });
        }

        #[ink(message)]
        pub fn contribute(&mut self, event_id: u64, project: AccountId, amount: Balance) {
            assert!(self.approved_events.get(event_id).unwrap_or(false), "Event is not approved");

            let caller = self.env().caller();
            ink_env::transfer(self.token, caller, amount).expect("Transfer failed");

            let contribution_key = (project, event_id);
            let current_contribution = self.contributions.get(contribution_key).unwrap_or(0);
            self.contributions.insert(contribution_key, &(current_contribution + amount));

            if !self.project_exists(event_id, project) {
                let mut projects = self.projects_by_event.get(event_id).unwrap_or(Vec::new());
                projects.push(project);
                self.projects_by_event.insert(event_id, &projects);
            }
        }

        #[ink(message)]
        pub fn calculate_allocation(&self, event_id: u64) -> Vec<Balance> {
            let projects = self.projects_by_event.get(event_id).unwrap_or(Vec::new());
            let mut total_sqrt_sum = 0u128;
            let mut allocations = Vec::new();

            for project in &projects {
                let contribution = self.contributions.get((*project, event_id)).unwrap_or(0);
                let sqrt_contribution = self.sqrt(contribution as u128);
                total_sqrt_sum += sqrt_contribution;
            }

            for project in projects {
                let contribution = self.contributions.get((project, event_id)).unwrap_or(0);
                let sqrt_contribution = self.sqrt(contribution as u128);
                let allocation = (self.matching_pool_amount as u128 * sqrt_contribution) / total_sqrt_sum;
                allocations.push(allocation as Balance);
            }

            allocations
        }

        #[ink(message)]
        pub fn distribute_funds(&mut self, event_id: u64) {
            assert!(self.approved_events.get(event_id).unwrap_or(false), "Event is not approved");

            let allocations = self.calculate_allocation(event_id);
            let projects = self.projects_by_event.get(event_id).unwrap_or(Vec::new());

            for (i, project) in projects.into_iter().enumerate() {
                let amount = allocations[i];
                ink_env::transfer(self.token, project, amount).expect("Transfer failed");
            }
        }

        fn has_conflict(&self, start_date_time: u64, end_date_time: u64) -> bool {
            for event_id in 1..=self.event_count {
                let event = self.events.get(event_id).unwrap();
                let is_approved = self.approved_events.get(event_id).unwrap_or(false);
                if is_approved && event.start_date_time > 0 {
                    if (start_date_time >= event.start_date_time && start_date_time < event.end_date_time) ||
                       (end_date_time > event.start_date_time && end_date_time <= event.end_date_time) ||
                       (start_date_time <= event.start_date_time && end_date_time >= event.end_date_time) {
                        return true;
                    }
                }
            }
            false
        }

        fn project_exists(&self, event_id: u64, project: AccountId) -> bool {
            let projects = self.projects_by_event.get(event_id).unwrap_or(Vec::new());
            projects.contains(&project)
        }

        fn sqrt(&self, x: u128) -> u128 {
            let mut z = (x + 1) / 2;
            let mut y = x;
            while z < y {
                y = z;
                z = (x / z + z) / 2;
            }
            y
        }
    }
}
