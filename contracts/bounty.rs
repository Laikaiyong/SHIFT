use anchor_lang::prelude::*;
use anchor_lang::solana_program::system_program;

declare_id!("YourProgramIDHere");

#[program]
mod bounty_contract {
    use super::*;

    pub fn create_bounty(ctx: Context<CreateBounty>, title: String, amount: u64) -> Result<()> {
        let bounty = &mut ctx.accounts.bounty;
        bounty.title = title;
        bounty.amount = amount;
        bounty.creator = *ctx.accounts.creator.key;
        bounty.is_claimed = false;

        emit!(BountyCreated {
            id: bounty.id,
            title: bounty.title.clone(),
            amount: bounty.amount,
            creator: bounty.creator,
        });

        Ok(())
    }

    pub fn claim_bounty(ctx: Context<ClaimBounty>) -> Result<()> {
        let bounty = &mut ctx.accounts.bounty;
        require!(!bounty.is_claimed, BountyError::AlreadyClaimed);

        bounty.is_claimed = true;
        bounty.claimed_by = Some(*ctx.accounts.claimer.key);

        emit!(BountyClaimed {
            id: bounty.id,
            claimed_by: bounty.claimed_by.unwrap(),
        });

        Ok(())
    }
}

// Accounts required for creating a bounty
#[derive(Accounts)]
pub struct CreateBounty<'info> {
    #[account(init, payer = creator, space = 8 + Bounty::LEN)]
    pub bounty: Account<'info, Bounty>,
    #[account(mut)]
    pub creator: Signer<'info>,
    pub system_program: Program<'info, System>,
}

// Accounts required for claiming a bounty
#[derive(Accounts)]
pub struct ClaimBounty<'info> {
    #[account(mut)]
    pub bounty: Account<'info, Bounty>,
    pub claimer: Signer<'info>,
}

// The Bounty struct stores each bounty's state
#[account]
pub struct Bounty {
    pub title: String,
    pub amount: u64,
    pub creator: Pubkey,
    pub claimed_by: Option<Pubkey>,
    pub is_claimed: bool,
}

impl Bounty {
    const LEN: usize = 32 + 8 + 4 + 128 + 1; // Adjust size for the title, amount, and addresses
}

// Event declarations
#[event]
pub struct BountyCreated {
    pub id: u64,
    pub title: String,
    pub amount: u64,
    pub creator: Pubkey,
}

#[event]
pub struct BountyClaimed {
    pub id: u64,
    pub claimed_by: Pubkey,
}

// Error handling
#[error_code]
pub enum BountyError {
    #[msg("Bounty already claimed.")]
    AlreadyClaimed,
}
