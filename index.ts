import { web3 } from "@coral-xyz/anchor";
import { bs58 } from "@coral-xyz/anchor/dist/cjs/utils/bytes";
import { clusterApiUrl } from "@solana/web3.js";
import { config } from "dotenv";
import { KeypairWallet, SolanaAgentKit } from "./libs/solana-agent-kit/core/src";
import TokenPlugin from "./libs/solana-agent-kit/plugin-token/src";
import DefiPlugin from "./libs/solana-agent-kit/plugin-defi/src";
import NftPlugin from "./libs/solana-agent-kit/plugin-nft/src";
import MiscPlugin from "./libs/solana-agent-kit/plugin-misc/src";

config();
const rpcURL = clusterApiUrl("mainnet-beta");
const keyPair = web3.Keypair.fromSecretKey(bs58.decode(process.env.PK_SOLANA ?? ""));

const wallet = new KeypairWallet(keyPair, rpcURL);

(async () => {
    const agent = new SolanaAgentKit(wallet, rpcURL, {
        OPENAI_API_KEY: process.env.OPENAI_API_KEY,
    })
        .use(TokenPlugin)
        .use(DefiPlugin)
        .use(NftPlugin)
        .use(MiscPlugin);
})().then();
