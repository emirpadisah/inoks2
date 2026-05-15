import { deflateSync } from "node:zlib";
import { mkdirSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";

const root = process.cwd();

const assets = [
  {
    path: "public/projects/hotel-lobby.png",
    width: 1500,
    height: 940,
    render: (x, y, w, h) => projectScene(x, y, w, h, "lobby")
  },
  {
    path: "public/projects/luxury-villa.png",
    width: 1500,
    height: 940,
    render: (x, y, w, h) => projectScene(x, y, w, h, "villa")
  },
  {
    path: "public/projects/bathroom.png",
    width: 1500,
    height: 940,
    render: (x, y, w, h) => projectScene(x, y, w, h, "bathroom")
  },
  {
    path: "public/projects/facade.png",
    width: 1500,
    height: 940,
    render: (x, y, w, h) => projectScene(x, y, w, h, "facade")
  }
];

const palettes = {
  calacatta: {
    base: [226, 222, 211],
    warm: [246, 242, 232],
    vein: [78, 78, 76],
    gold: [172, 143, 91]
  },
  limestone: {
    base: [193, 190, 180],
    warm: [218, 215, 205],
    vein: [142, 137, 126],
    gold: [181, 169, 139]
  }
};

function renderPng({ path, width, height, render }) {
  const file = join(root, path);
  mkdirSync(dirname(file), { recursive: true });
  const raw = Buffer.alloc((width * 4 + 1) * height);

  for (let y = 0; y < height; y += 1) {
    const row = y * (width * 4 + 1);
    raw[row] = 0;

    for (let x = 0; x < width; x += 1) {
      const [r, g, b, a = 255] = render(x, y, width, height);
      const index = row + 1 + x * 4;
      raw[index] = clamp(r);
      raw[index + 1] = clamp(g);
      raw[index + 2] = clamp(b);
      raw[index + 3] = clamp(a);
    }
  }

  const png = Buffer.concat([
    Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]),
    chunk("IHDR", ihdr(width, height)),
    chunk("IDAT", deflateSync(raw, { level: 9 })),
    chunk("IEND", Buffer.alloc(0))
  ]);

  writeFileSync(file, png);
}

function ihdr(width, height) {
  const buffer = Buffer.alloc(13);
  buffer.writeUInt32BE(width, 0);
  buffer.writeUInt32BE(height, 4);
  buffer[8] = 8;
  buffer[9] = 6;
  buffer[10] = 0;
  buffer[11] = 0;
  buffer[12] = 0;
  return buffer;
}

function chunk(type, data) {
  const typeBuffer = Buffer.from(type);
  const length = Buffer.alloc(4);
  length.writeUInt32BE(data.length, 0);
  const crcBuffer = Buffer.alloc(4);
  crcBuffer.writeUInt32BE(crc32(Buffer.concat([typeBuffer, data])), 0);
  return Buffer.concat([length, typeBuffer, data, crcBuffer]);
}

const crcTable = Array.from({ length: 256 }, (_, n) => {
  let c = n;
  for (let k = 0; k < 8; k += 1) {
    c = c & 1 ? 0xedb88320 ^ (c >>> 1) : c >>> 1;
  }
  return c >>> 0;
});

function crc32(buffer) {
  let crc = 0xffffffff;
  for (const byte of buffer) {
    crc = crcTable[(crc ^ byte) & 0xff] ^ (crc >>> 8);
  }
  return (crc ^ 0xffffffff) >>> 0;
}

function marbleTexture(x, y, w, h, palette, seed) {
  const nx = x / w;
  const ny = y / h;
  const drift =
    valueNoise(nx * 2.2, ny * 2.8, seed) * 0.28 +
    valueNoise(nx * 7, ny * 9, seed + 5) * 0.08;
  const diagonal = nx * 1.5 - ny * 0.36 + drift;
  const wideBand = 1 - Math.abs(Math.sin((diagonal * 4.2 + seed * 0.07) * Math.PI));
  const thinBand = 1 - Math.abs(Math.sin((diagonal * 9.5 + valueNoise(nx * 8, ny * 8, seed + 3)) * Math.PI));
  const vein = smoothstep(0.78, 0.985, wideBand);
  const fine = smoothstep(0.955, 0.998, thinBand);
  const branchA = curvedVein(nx, ny, 0.22, 0.76, 0.72, -0.22, seed + 11);
  const branchB = curvedVein(nx, ny, 0.58, 0.96, 0.18, -0.08, seed + 17);
  const gold = curvedVein(nx, ny, 0.08, 0.9, 0.92, 0.16, seed + 23);
  const grain = (hash2(Math.floor(x / 3), Math.floor(y / 3), seed) - 0.5) * 4;
  let color = mix(palette.base, palette.warm, 0.56 + valueNoise(nx * 2, ny * 2, seed + 1) * 0.28);
  color = mix(color, palette.vein, vein * 0.16 + fine * 0.08 + branchA * 0.58 + branchB * 0.44);
  color = mix(color, palette.gold, gold * 0.26 + fine * vein * 0.04);
  return shade(add(color, grain), vignette(nx, ny, 0.13));
}

function curvedVein(nx, ny, startX, startY, endX, endY, seed) {
  const t = clamp01((ny - endY) / (startY - endY));
  const center =
    startX +
    (endX - startX) * t +
    Math.sin(t * Math.PI * 2.2 + seed) * 0.025 +
    (valueNoise(t * 6, seed * 0.01, seed) - 0.5) * 0.075;
  const distance = Math.abs(nx - center);
  const width = 0.006 + valueNoise(t * 9, seed * 0.02, seed + 9) * 0.012;
  return 1 - smoothstep(width, width + 0.035, distance);
}

function travertineTexture(x, y, w, h, seed) {
  const nx = x / w;
  const ny = y / h;
  const striation = Math.sin((ny * 64 + valueNoise(nx * 16, ny * 8, seed) * 6) * Math.PI);
  const pores = smoothstep(0.83, 0.98, valueNoise(nx * 64, ny * 80, seed + 3));
  const base = [204, 185, 154];
  const light = [226, 212, 186];
  const dark = [144, 118, 86];
  let color = mix(base, light, 0.36 + striation * 0.12 + valueNoise(nx * 6, ny * 22, seed + 1) * 0.3);
  color = mix(color, dark, pores * 0.42);
  color = mix(color, [235, 225, 202], smoothstep(0.42, 0.92, striation) * 0.12);
  return shade(color, vignette(nx, ny, 0.12));
}

function limestoneTexture(x, y, w, h, seed) {
  const nx = x / w;
  const ny = y / h;
  const cloudy = valueNoise(nx * 6, ny * 7, seed) * 0.7 + valueNoise(nx * 26, ny * 30, seed + 6) * 0.25;
  const fossil = smoothstep(0.77, 0.98, Math.sin((nx * 14 + ny * 10 + valueNoise(nx * 5, ny * 5, seed) * 2) * Math.PI));
  let color = mix(palettes.limestone.base, palettes.limestone.warm, cloudy);
  color = mix(color, palettes.limestone.vein, fossil * 0.12);
  return shade(color, vignette(nx, ny, 0.1));
}

function onyxTexture(x, y, w, h, seed) {
  const nx = x / w;
  const ny = y / h;
  const band = Math.sin((ny * 11 + nx * 2 + valueNoise(nx * 6, ny * 12, seed) * 4) * Math.PI);
  const ember = smoothstep(0.46, 1, band);
  const dark = [34, 32, 28];
  const amber = [188, 128, 55];
  const cream = [232, 203, 142];
  let color = mix(dark, amber, ember * 0.55);
  color = mix(color, cream, smoothstep(0.86, 1, band) * 0.55);
  color = mix(color, [12, 12, 12], valueNoise(nx * 18, ny * 16, seed + 4) * 0.2);
  return shade(color, vignette(nx, ny, 0.18));
}

function projectScene(x, y, w, h, type) {
  const nx = x / w;
  const ny = y / h;
  const floorLine = type === "villa" ? 0.63 : 0.66;
  let color = gradient([29, 28, 25], [168, 158, 140], ny * 0.72);

  if (type === "lobby") {
    if (ny > floorLine) {
      color = marbleTexture(x, y, w, h, palettes.calacatta, 42);
      color = shade(color, 0.75 - (ny - floorLine) * 0.5);
    } else if (inRect(nx, ny, 0.28, 0.12, 0.44, 0.55)) {
      color = marbleTexture(x, y, w, h, palettes.calacatta, 40);
    } else if (inRect(nx, ny, 0.12, 0.08, 0.08, 0.74) || inRect(nx, ny, 0.8, 0.08, 0.08, 0.74)) {
      color = [28, 27, 24];
    }
  }

  if (type === "villa") {
    color = gradient([181, 186, 184], [227, 220, 207], ny);
    if (inRect(nx, ny, 0.09, 0.23, 0.82, 0.43)) {
      color = travertineTexture(x, y, w, h, 52);
      const grid = nearGrid(nx, ny, 0.09, 0.23, 0.82, 0.43, 8, 3);
      color = mix(color, [50, 48, 44], grid * 0.72);
    }
    if (inRect(nx, ny, 0.16, 0.37, 0.19, 0.2) || inRect(nx, ny, 0.65, 0.34, 0.18, 0.24)) {
      color = [31, 38, 38];
    }
    if (ny > 0.72) {
      color = mix([108, 132, 130], [218, 207, 185], smoothstep(0.72, 1, ny));
    }
  }

  if (type === "bathroom") {
    color = marbleTexture(x, y, w, h, palettes.calacatta, 62);
    if (ny > floorLine) {
      color = shade(color, 0.78);
    }
    if (inRect(nx, ny, 0.58, 0.32, 0.22, 0.12)) {
      color = [48, 47, 43];
    }
    if (inRect(nx, ny, 0.22, 0.55, 0.42, 0.16)) {
      color = [236, 231, 220];
    }
  }

  if (type === "facade") {
    color = gradient([22, 22, 21], [114, 112, 106], ny);
    if (inRect(nx, ny, 0.18, 0.08, 0.64, 0.8)) {
      color = marbleTexture(x, y, w, h, palettes.limestone, 72);
      const grid = nearGrid(nx, ny, 0.18, 0.08, 0.64, 0.8, 7, 5);
      color = mix(color, [28, 27, 25], grid * 0.66);
    }
    if (
      inRect(nx, ny, 0.26, 0.2, 0.1, 0.17) ||
      inRect(nx, ny, 0.45, 0.2, 0.1, 0.17) ||
      inRect(nx, ny, 0.64, 0.2, 0.1, 0.17) ||
      inRect(nx, ny, 0.35, 0.52, 0.11, 0.2) ||
      inRect(nx, ny, 0.56, 0.52, 0.11, 0.2)
    ) {
      color = [28, 32, 31];
    }
  }

  const light = 0.95 + radial(nx, ny, 0.42, 0.2, 0.55) * 0.1 - radial(nx, ny, 0.05, 0.9, 0.65) * 0.28;
  return shade(color, light);
}

function valueNoise(x, y, seed) {
  const x0 = Math.floor(x);
  const y0 = Math.floor(y);
  const xf = fade(x - x0);
  const yf = fade(y - y0);
  const a = hash2(x0, y0, seed);
  const b = hash2(x0 + 1, y0, seed);
  const c = hash2(x0, y0 + 1, seed);
  const d = hash2(x0 + 1, y0 + 1, seed);
  return lerp(lerp(a, b, xf), lerp(c, d, xf), yf);
}

function hash2(x, y, seed) {
  let n = x * 374761393 + y * 668265263 + seed * 1442695041;
  n = (n ^ (n >>> 13)) * 1274126177;
  return ((n ^ (n >>> 16)) >>> 0) / 4294967295;
}

function nearGrid(nx, ny, x, y, width, height, columns, rows) {
  if (!inRect(nx, ny, x, y, width, height)) {
    return 0;
  }
  const gx = ((nx - x) / width) * columns;
  const gy = ((ny - y) / height) * rows;
  const dx = Math.min(gx % 1, 1 - (gx % 1));
  const dy = Math.min(gy % 1, 1 - (gy % 1));
  return smoothstep(0.04, 0.005, Math.min(dx, dy));
}

function inRect(nx, ny, x, y, width, height) {
  return nx >= x && nx <= x + width && ny >= y && ny <= y + height;
}

function radial(nx, ny, cx, cy, radius) {
  const distance = Math.hypot(nx - cx, ny - cy);
  return 1 - smoothstep(0, radius, distance);
}

function gradient(a, b, t) {
  return mix(a, b, clamp01(t));
}

function vignette(nx, ny, amount) {
  const distance = Math.hypot(nx - 0.5, ny - 0.5) / 0.72;
  return 1 - smoothstep(0.32, 1, distance) * amount;
}

function mix(a, b, t) {
  const k = clamp01(t);
  return [
    a[0] + (b[0] - a[0]) * k,
    a[1] + (b[1] - a[1]) * k,
    a[2] + (b[2] - a[2]) * k
  ];
}

function add(color, value) {
  return [color[0] + value, color[1] + value, color[2] + value];
}

function shade(color, amount) {
  return [color[0] * amount, color[1] * amount, color[2] * amount];
}

function smoothstep(edge0, edge1, x) {
  const t = clamp01((x - edge0) / (edge1 - edge0));
  return t * t * (3 - 2 * t);
}

function fade(t) {
  return t * t * t * (t * (t * 6 - 15) + 10);
}

function lerp(a, b, t) {
  return a + (b - a) * t;
}

function clamp(value) {
  return Math.max(0, Math.min(255, Math.round(value)));
}

function clamp01(value) {
  return Math.max(0, Math.min(1, value));
}

for (const asset of assets) {
  renderPng(asset);
  console.log(`Generated ${asset.path}`);
}
