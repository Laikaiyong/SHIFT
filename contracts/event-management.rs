use anchor_lang::prelude::*;
use anchor_lang::solana_program::system_program;

declare_id!("YourProgramIDHere");

#[program]
mod event_hub_management {
    use super::*;

    pub fn submit_event(
        ctx: Context<SubmitEvent>,
        name: String,
        start_date_time: i64,
        end_date_time: i64,
    ) -> Result<()> {
        require!(start_date_time < end_date_time, EventError::InvalidTimeRange);
        let event = &mut ctx.accounts.event;
        event.name = name;
        event.start_date_time = start_date_time;
        event.end_date_time = end_date_time;
        event.organizer = *ctx.accounts.organizer.key;
        event.is_approved = false;
        event.votes = 0;

        emit!(EventSubmitted {
            id: event.id,
            name: event.name.clone(),
            start_date_time: event.start_date_time,
            end_date_time: event.end_date_time,
            organizer: event.organizer,
        });

        Ok(())
    }

    pub fn approve_event(ctx: Context<ApproveEvent>) -> Result<()> {
        let event = &mut ctx.accounts.event;
        require!(!event.is_approved, EventError::AlreadyApproved);
        event.is_approved = true;

        emit!(EventApproved { id: event.id });
        Ok(())
    }

    pub fn vote_for_event(ctx: Context<VoteForEvent>) -> Result<()> {
        let event = &mut ctx.accounts.event;
        require!(event.is_approved, EventError::NotApproved);
        let has_voted = &mut ctx.accounts.has_voted;
        require!(!has_voted.voted, EventError::AlreadyVoted);

        has_voted.voted = true;
        event.votes += 1;

        emit!(VotedForEvent {
            event_id: event.id,
            voter: *ctx.accounts.voter.key,
        });

        Ok(())
    }
}

#[derive(Accounts)]
pub struct SubmitEvent<'info> {
    #[account(init, payer = organizer, space = 8 + Event::LEN)]
    pub event: Account<'info, Event>,
    #[account(mut)]
    pub organizer: Signer<'info>,
    pub system_program: Program<'info, System>,
}

#[derive(Accounts)]
pub struct ApproveEvent<'info> {
    #[account(mut)]
    pub event: Account<'info, Event>,
}

#[derive(Accounts)]
pub struct VoteForEvent<'info> {
    #[account(mut)]
    pub event: Account<'info, Event>,
    #[account(init_if_needed, payer = voter, space = 8 + HasVoted::LEN)]
    pub has_voted: Account<'info, HasVoted>,
    #[account(mut)]
    pub voter: Signer<'info>,
    pub system_program: Program<'info, System>,
}

#[account]
pub struct Event {
    pub id: u64,
    pub name: String,
    pub start_date_time: i64,
    pub end_date_time: i64,
    pub organizer: Pubkey,
    pub is_approved: bool,
    pub votes: u64,
}

impl Event {
    const LEN: usize = 8 + 4 + 128 + 8 + 8 + 32 + 1 + 8;
}

#[account]
pub struct HasVoted {
    pub voter: Pubkey,
    pub event_id: u64,
    pub voted: bool,
}

impl HasVoted {
    const LEN: usize = 32 + 8 + 1;
}

#[event]
pub struct EventSubmitted {
    pub id: u64,
    pub name: String,
    pub start_date_time: i64,
    pub end_date_time: i64,
    pub organizer: Pubkey,
}

#[event]
pub struct EventApproved {
    pub id: u64,
}

#[event]
pub struct VotedForEvent {
    pub event_id: u64,
    pub voter: Pubkey,
}

#[error_code]
pub enum EventError {
    #[msg("Invalid time range.")]
    InvalidTimeRange,
    #[msg("Event is already approved.")]
    AlreadyApproved,
    #[msg("Event is not approved.")]
    NotApproved,
    #[msg("You have already voted for this event.")]
    AlreadyVoted,
}
