import { SolanaAgentKit } from "../../../../core/src";

export function getWalletAddress(agent: SolanaAgentKit): string {
    return agent.wallet.publicKey.toBase58();
}
