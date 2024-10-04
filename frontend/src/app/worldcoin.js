"use client"
import { IDKitWidget, VerificationLevel } from '@worldcoin/idkit'

export default function WorldCoinKit() {
    // TODO: Calls your implemented server route
    // Note: This must be implemented server side
    const verifyProof = async (proof) => {
        console.log('proof', proof);
        const response = await fetch(
            'https://developer.worldcoin.org/api/v1/verify/app_staging_129259332fd6f93d4fabaadcc5e4ff9d',
            {
                method: 'POST',
                headers: {
                'Content-Type': 'application/json',
                },
                body: JSON.stringify({ ...proof, action: "test"}),
            }
        );
        if (response.ok) {
            const { verified } = await response.json();
            return verified;
        } else {
            const { code, detail } = await response.json();
            throw new Error(`Error Code ${code}: ${detail}`);
        }
    };
    // For a complete example see:
    // https://github.com/worldcoin/world-id-cloud-template

    // TODO: Functionality after verifying
    const onSuccess = () => {
        onsole.log("Success")
    };

    // ...
    return (
    <IDKitWidget
        app_id="app_staging_2bf37d8b2d567c4c10b784c836ea26f9"
        action="testing"
        false
        verification_level={VerificationLevel.Device}
        handleVerify={verifyProof}
        onSuccess={onSuccess}>
        {({ open }) => (
        <button
            onClick={open}
        >
            Verify with World ID
        </button>
        )}
    </IDKitWidget>
    );
}
