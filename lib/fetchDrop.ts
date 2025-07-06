import { Contract, JsonRpcProvider } from "ethers";
import abi from "./ABI.json"; // Ensure ABI.json is in your project

const SEADROP_ADDRESS = "0x00005EA00Ac477B1030CE78506496e8C2dE24bf5";

const RPC_URLS: Record<number, string> = {
  1: "https://rpc.ankr.com/eth",
  10: "https://mainnet.optimism.io",
  137: "https://polygon-rpc.com",
  42161: "https://arb1.arbitrum.io/rpc",
  8453: "https://mainnet.base.org",
  43114: "https://rpc.zerion.io/v1/avalanche",
};

type PublicDropResult =
  | {
      valid: true;
      startTime: string;
      endTime: string;
    }
  | {
      valid: false;
    };

export async function fetchDrop(
  nftAddress: string,
  chainId: number
): Promise<PublicDropResult> {
  try {
    const rpc = RPC_URLS[chainId];
    if (!rpc) return { valid: false };

    const provider = new JsonRpcProvider(rpc);
    const seaDrop = new Contract(SEADROP_ADDRESS, abi, provider);
    const drop = await seaDrop.getPublicDrop(nftAddress);

    const startTime = drop[1];
    const endTime = drop[2];

    if (!startTime || Number(startTime) === 0) {
      return { valid: false };
    }

    return {
      valid: true,
      startTime: new Date(Number(startTime) * 1000).toISOString(),
      endTime: new Date(Number(endTime) * 1000).toISOString(),
    };
  } catch {
    return { valid: false };
  }
}
