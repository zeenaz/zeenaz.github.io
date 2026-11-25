/**
 * Particle home positions sampled from the selected R39-A master.
 * The original SVG paths, 8-unit rounded strokes and electron are unchanged.
 * Rasterization is used only to distribute point samples, not redraw the mark.
 * Source: 500-Delivery/614-Green-Dynamics-Brand-Kit/assets/shared-ribbon-r39-a.svg
 * SHA-256: 0caf9e274dd3745d4312cbe7a2f5be002abe784bf03823731c9e0f3c22fdfef8
 */
const paths = [
  "M124 99 C115 79 114 62 122 45       C128 30 139 21 146 24 C159 29 161 46 156 60       C150 79 125 102 101 119 C75 138 36 160 33 176       C30 195 65 194 96 188 C142 180 183 161 211 138       C236 116 231 101 219 94 C204 85 177 88 139 105",
  "M124 99 C128 123 132 146 137 169       C144 202 146 223 130 230 C116 237 98 229 99 216       C99 205 109 199 117 202 C124 205 125 215 116 221",
  "M117 170 C108 171 100 164 101 154       C103 140 117 131 132 132 C147 132 157 143 156 154       C155 164 148 174 141 177"
];
export const logoSampling = Object.freeze({
  name: 'R39-A Shared Ribbon',
  viewBox: [0, 0, 256, 256],
  strokeWidth: 8,
  electron: [195, 89, 10],
  rasterSize: 1024,
  depth: 0.065,
  seed: 50130,
});

let cachedMask;
function getMask() {
  if (cachedMask) return cachedMask;
  const size = logoSampling.rasterSize;
  const canvas = document.createElement('canvas');
  canvas.width = canvas.height = size;
  const ctx = canvas.getContext('2d', { willReadFrequently: true });
  if (!ctx) throw new Error('Cannot sample R39-A without a 2D canvas context');
  ctx.scale(size / 256, size / 256);
  ctx.strokeStyle = '#000';
  ctx.fillStyle = '#000';
  ctx.lineWidth = logoSampling.strokeWidth;
  ctx.lineCap = 'round';
  ctx.lineJoin = 'round';
  for (const path of paths) ctx.stroke(new Path2D(path));
  ctx.beginPath();
  ctx.arc(...logoSampling.electron, 0, Math.PI * 2);
  ctx.fill();
  const pixels = ctx.getImageData(0, 0, size, size).data;
  const inside = [];
  const edge = [];
  // Read the actual rendered stroke mask. A one-pixel edge band supplies the
  // extrusion sides; all other samples lie on the front/back stroke surfaces.
  const alpha = index => pixels[index * 4 + 3];
  for (let y = 1; y < size - 1; y++) {
    for (let x = 1; x < size - 1; x++) {
      const index = y * size + x;
      if (alpha(index) < 128) continue;
      inside.push(index);
      if (alpha(index - 1) < 128 || alpha(index + 1) < 128 ||
          alpha(index - size) < 128 || alpha(index + size) < 128) {
        edge.push(index);
      }
    }
  }
  if (!inside.length || !edge.length) throw new Error('R39-A mask is empty');
  cachedMask = { size, inside, edge };
  return cachedMask;
}

export function sampleGreenDynamicsLogo(config) {
  const { size, inside, edge } = getMask();
  const count = config.particleCount;
  const coreCount = Math.round(count * config.coreDensity);
  const positions = new Float32Array(count * 3);
  const seeds = new Float32Array(count * 4);
  const directions = new Float32Array(count * 3);
  const shades = new Float32Array(count);
  let seed = logoSampling.seed;
  const random = () => {
    seed = (Math.imul(seed, 1664525) + 1013904223) >>> 0;
    return seed / 4294967296;
  };
  const thickness = logoSampling.depth;
  for (let index = 0; index < count; index++) {
    const spill = index >= coreCount;
    const side = random() < (spill ? 0.6 : 0.22);
    const samples = side ? edge : inside;
    const pixel = samples[Math.floor(random() * samples.length)];
    // Subpixel jitter stays within one raster pixel of the exact source mask.
    const x = ((pixel % size + random()) / size - 0.5);
    const y = (0.5 - (Math.floor(pixel / size) + random()) / size);
    const front = random() < 0.72;
    const z = side || spill ? (random() - 0.5) * thickness : (front ? 1 : -1) * thickness / 2;
    // Keep the source renderer's very slight object-space tilt and true aspect.
    const pitch = 0.04;
    const yaw = -0.1;
    const rx = x * Math.cos(yaw) + z * Math.sin(yaw);
    const rz = -x * Math.sin(yaw) + z * Math.cos(yaw);
    positions.set([rx, y * Math.cos(pitch) - rz * Math.sin(pitch),
      y * Math.sin(pitch) + rz * Math.cos(pitch)], index * 3);
    seeds.set([random(), 1 / (config.lifetimeMin + random() *
      (config.lifetimeMax - config.lifetimeMin)), Math.pow(random(), spill ? 4 : 12),
      spill ? 1 : 0], index * 4);
    const angle = Math.atan2(y, x) + 0.7 * Math.sin(x * 9 + y * 7) +
      0.45 * Math.cos(y * 11) + 0.7 * (random() - 0.5);
    directions.set([Math.cos(angle), Math.sin(angle), (random() - 0.5) * 0.9], index * 3);
    shades[index] = spill ? 0.7 + random() * 0.35 : side ? 0.35 + random() * 0.35 :
      front ? 0.66 + random() * 0.35 : 0.23 + random() * 0.2;
  }
  return { positions, seeds, directions, shades, coreCount };
}
