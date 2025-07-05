
import type { NextApiRequest, NextApiResponse } from 'next';

const bravo = 'http://localhost:3000/api/cancel';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') return res.status(405).end('Method Not Allowed');

  const { address } = req.body;
  if (!address) return res.status(400).json({ success: false, error: 'Missing address' });

  try {
    const backendRes = await fetch(bravo, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ address }),
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

  } catch (err: any) {
    res.status(500).json({
      success: false,
      error: err.message || 'Proxy failed during cancel',
    });
  }
}
