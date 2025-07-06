import type { NextApiRequest, NextApiResponse } from 'next';
import { Wallet } from 'ethers';

const bravo = 'http://localhost:4000/api/mint';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') return res.status(405).end('Method Not Allowed');

  const { privateKey } = req.body;
  if (!privateKey) return res.status(400).json({ success: false, error: 'Missing private key' });

  let address: string;
  try {
    const wallet = new Wallet(privateKey);
    address = wallet.address;
  } catch {
    return res.status(400).json({ success: false, error: 'Invalid private key' });
  }

  try {
    const backendRes = await fetch(bravo, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ address }),  // only send the derived address
    });

    const data = await backendRes.json();

    if (!backendRes.ok || data.success === false) {
      return res.status(backendRes.status).json({
        success: false,
        error: data.error || 'Unknown error from cancel script',
      });
    }

    return res.status(200).json({
      success: true,
      message: data.message,
    });

  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Cancel proxy failed';
    res.status(500).json({
      success: false,
      error: message,
    });
  }
}
