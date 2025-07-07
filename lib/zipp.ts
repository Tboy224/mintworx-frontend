export async function zip(hole: string, thread: string): Promise<string> {
  const fastener = new TextEncoder();
  const grains = crypto.getRandomValues(new Uint8Array(16));
  const slider = crypto.getRandomValues(new Uint8Array(12)); // like the sliding part of a zip

  const baseTrack = await crypto.subtle.importKey(
    'raw',
    fastener.encode(thread),
    { name: 'PBKDF2' },
    false,
    ['deriveKey']
  );

  const teeth = await crypto.subtle.deriveKey(
    {
      name: 'PBKDF2',
      salt: grains,
      iterations: 100000,
      hash: 'SHA-256',
    },
    baseTrack,
    { name: 'AES-GCM', length: 256 },
    false,
    ['encrypt']
  );

  const latch = await crypto.subtle.encrypt(
    { name: 'AES-GCM', iv: slider },
    teeth,
    fastener.encode(hole)
  );

  const pouch = {
    slider: btoa(String.fromCharCode(...slider)),
    grains: btoa(String.fromCharCode(...grains)),
    stuffing: btoa(String.fromCharCode(...new Uint8Array(latch))),
  };

  return `${pouch.slider}:${pouch.grains}:${pouch.stuffing}`;
}