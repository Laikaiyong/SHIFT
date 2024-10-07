import { Transaction, SystemProgram, LAMPORTS_PER_SOL } from '@solana/web3.js'; // Ensure this is correctly installed

export const handleSolanaTransaction = async (wallet, connection, amount = 0.0001, recipient = "DnhmBBGMiKLtG2gj5VCq4TPmgFT9dwDxDoUPAmrSNWqa") => {
  if (!wallet.publicKey) {
    alert('Please connect your wallet first!');
    return;
  }

  try {
    const transaction = new Transaction().add(
      SystemProgram.transfer({
        fromPubkey: wallet.publicKey,
        toPubkey: recipient,
        lamports: amount * LAMPORTS_PER_SOL,
      })
    );

    const signature = await wallet.sendTransaction(transaction, connection);
    await connection.confirmTransaction(signature, 'processed');
    alert(`Transaction successful! Signature: ${signature}`);
  } catch (error) {
    console.error('Error processing Solana transaction:', error);
    alert(`Transaction failed: ${error.message}`);
  }
};
