import { Wallet, JsonRpcProvider } from 'ethers';

const RPC_URLS: Record<number, string> = {
  1: 'https://rpc.ankr.com/eth',
  10: 'https://mainnet.optimism.io',
  137: 'https://polygon-rpc.com',
  42161: 'https://arb1.arbitrum.io/rpc',
  8453: 'https://mainnet.base.org',
  43114: 'https://api.avax.network/ext/bc/C/rpc',
};

const COINGECKO_IDS: Record<number, string> = {
  1: 'ethereum',
  10: 'optimism',
  137: 'matic-network',
  42161: 'arbitrum',
  8453: 'base',
  43114: 'avalanche-2',
};

export async function checkPrivateKeyBalance(
  privateKey: string,
  chainId: number
): Promise<{
  valid: boolean;
  funded: boolean;
  address?: string;
  usdValue?: number;
}> {
  try {
    const rpc = RPC_URLS[chainId];
    const coinId = COINGECKO_IDS[chainId];
    if (!rpc || !coinId) throw new Error('Unsupported chain');

    const wallet = new Wallet(privateKey);
    const address = await wallet.getAddress();

    const provider = new JsonRpcProvider(rpc);
    const balance = await provider.getBalance(address);
    const eth = parseFloat(balance.toString()) / 1e18;

    const priceRes = await fetch(
      `https://api.coingecko.com/api/v3/simple/price?ids=${coinId}&vs_currencies=usd`
    );
    const priceJson = await priceRes.json();
    const usdValue = eth * (priceJson[coinId]?.usd || 0);

    return {
      valid: true,
      funded: true,//usdValue >= 2,
      address,
      usdValue,
    };
  } catch {
    return {
      valid: false,
      funded: false,
    };
  }
}
