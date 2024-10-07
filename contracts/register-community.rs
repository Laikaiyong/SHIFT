use anchor_lang::prelude::*;

declare_id!("YourProgramIDHere");

#[program]
mod community_registry {
    use super::*;

    pub fn register_community(
        ctx: Context<RegisterCommunity>,
        name: String,
        location: String,
    ) -> Result<()> {
        let community = &mut ctx.accounts.community;
        community.name = name;
        community.location = location;
        community.owner = *ctx.accounts.owner.key;
        community.members_count = 1;
        community.reputation_score = 0;

        emit!(CommunityRegistered {
            id: community.id,
            name: community.name.clone(),
            owner: community.owner,
            location: community.location.clone(),
            members_count: community.members_count,
        });

        Ok(())
    }

    pub fn add_member(ctx: Context<AddMember>) -> Result<()> {
        let community = &mut ctx.accounts.community;
        community.members_count += 1;

        emit!(MemberAdded {
            id: community.id,
            new_members_count: community.members_count,
        });

        Ok(())
    }

    pub fn update_reputation_score(
        ctx: Context<UpdateReputationScore>,
        change: i64,
    ) -> Result<()> {
        let community = &mut ctx.accounts.community;
        require!(
            *ctx.accounts.owner.key == community.owner,
            CommunityError::Unauthorized
        );

        if change < 0 {
            let deduction = -change as u64;
            require!(
                community.reputation_score >= deduction,
                CommunityError::NegativeReputation
            );
            community.reputation_score -= deduction;
        } else {
            community.reputation_score += change as u64;
        }

        emit!(ReputationUpdated {
            id: community.id,
            new_reputation_score: community.reputation_score,
        });

        Ok(())
    }
}

#[derive(Accounts)]
pub struct RegisterCommunity<'info> {
    #[account(init, payer = owner, space = 8 + Community::LEN)]
    pub community: Account<'info, Community>,
    #[account(mut)]
    pub owner: Signer<'info>,
    pub system_program: Program<'info, System>,
}

#[derive(Accounts)]
pub struct AddMember<'info> {
    #[account(mut)]
    pub community: Account<'info, Community>,
}

#[derive(Accounts)]
pub struct UpdateReputationScore<'info> {
    #[account(mut)]
    pub community: Account<'info, Community>,
    #[account(mut)]
    pub owner: Signer<'info>,
}

#[account]
pub struct Community {
    pub id: u64,
    pub name: String,
    pub location: String,
    pub owner: Pubkey,
    pub members_count: u64,
    pub reputation_score: u64,
}

impl Community {
    const LEN: usize = 8 + 4 + 128 + 4 + 128 + 32 + 8 + 8;
}

#[event]
pub struct CommunityRegistered {
    pub id: u64,
    pub name: String,
    pub owner: Pubkey,
    pub location: String,
    pub members_count: u64,
}

#[event]
pub struct MemberAdded {
    pub id: u64,
    pub new_members_count: u64,
}

#[event]
pub struct ReputationUpdated {
    pub id: u64,
    pub new_reputation_score: u64,
}

#[error_code]
pub enum CommunityError {
    #[msg("Only the community owner can update the reputation score.")]
    Unauthorized,
    #[msg("Reputation score cannot be negative.")]
    NegativeReputation,
}
