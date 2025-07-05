type MintPayload = {
  privateKey: string;
  contractAddress: string;
  chainId: number;
  gasMultiplier?: number;
};

type MintResponse =
  | { success: true; txHash: string }
  | { success: false; error: string };

type CancelResponse =
  | { success: true; message: string }
  | { success: false; error: string };

export class ProxyService {
  private baseURL: string;
  constructor( baseURL= '/api') {
    this.baseURL = baseURL;
  }

  async mint(payload: MintPayload): Promise<MintResponse> {
    try {
      const res = await fetch(`${this.baseURL}/proxy`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (!res.ok || data.success === false) {
        return {
          success: false,
          error: data.error || `Mint failed with status ${res.status}`,
        };
      }

      return { success: true, txHash: data.txHash };
    } catch (err: unknown) {
        const message = err instanceof Error ? err.message : 'Mint proxy failed';
        return {
          success: false,
          error: message,
  };
}

  }

  async cancel(address: string): Promise<CancelResponse> {
    try {
      const res = await fetch(`${this.baseURL}/cancel`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ address }),
      });

      const data = await res.json();

      if (!res.ok || data.success === false) {
        return {
          success: false,
          error: data.error || `Cancel failed with status ${res.status}`,
        };
      }

      return { success: true, message: data.message };
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'Mint proxy failed';
      return {
        success: false,
        error: message,
      };
    }
  }
}
