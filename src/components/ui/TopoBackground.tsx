'use client';
import { useEffect, useRef } from 'react';

// ─── Deterministic Perlin noise ───────────────────────────────────────────────

function seededShuffle(seed: number): number[] {
  const arr = Array.from({ length: 256 }, (_, i) => i);
  let s = seed;
  for (let i = 255; i > 0; i--) {
    s = (s * 1664525 + 1013904223) & 0xffffffff;
    const j = Math.abs(s) % (i + 1);
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}
const _p   = seededShuffle(137);
const PERM = [..._p, ..._p];

function fade(t: number) { return t * t * t * (t * (t * 6 - 15) + 10); }
function lerp(a: number, b: number, t: number) { return a + t * (b - a); }
function grad(h: number, x: number, y: number) { return ((h&1)?-x:x)+((h&2)?-y:y); }

function noise(x: number, y: number): number {
  const X = Math.floor(x) & 255, Y = Math.floor(y) & 255;
  const fx = x-Math.floor(x), fy = y-Math.floor(y);
  const u = fade(fx), v = fade(fy);
  const a = PERM[X]+Y, b = PERM[X+1]+Y;
  return lerp(
    lerp(grad(PERM[a],fx,fy),    grad(PERM[b],fx-1,fy),  u),
    lerp(grad(PERM[a+1],fx,fy-1),grad(PERM[b+1],fx-1,fy-1),u), v);
}

// Fractional Brownian Motion — 4 octaves for geological detail
function fbm(x: number, y: number): number {
  return noise(x,y)*0.50 + noise(x*2.1,y*2.1)*0.28
       + noise(x*4.3,y*4.3)*0.14 + noise(x*8.7,y*8.7)*0.08;
}

// ─── Color mapping (elevation → RGBA) ────────────────────────────────────────
// Dark navy at sea level rising through amber to gold at peaks
// Matches site palette (#0a0a0f background, #c9a84c gold)

const COLOR_STOPS = [
  { t:0.00, r:10,  g:8,   b:25,  a:0   }, // transparent (below sea level)
  { t:0.30, r:10,  g:8,   b:25,  a:0   }, // still transparent
  { t:0.42, r:20,  g:14,  b:38,  a:55  }, // dark indigo, low opacity
  { t:0.54, r:55,  g:38,  b:10,  a:90  }, // very dark amber
  { t:0.65, r:110, g:78,  b:20,  a:115 }, // dark gold
  { t:0.76, r:160, g:118, b:38,  a:130 }, // medium gold
  { t:0.88, r:196, g:158, b:62,  a:140 }, // bright gold
  { t:1.00, r:215, g:185, b:105, a:148 }, // pale gold peak
];

function writeColor(buf: Uint8ClampedArray, idx: number, t: number): void {
  const stops = COLOR_STOPS;
  let i = 0;
  while (i < stops.length - 2 && t > stops[i+1].t) i++;
  const p = stops[i], q = stops[i+1];
  const f = (q.t === p.t) ? 0 : (t - p.t) / (q.t - p.t);
  buf[idx]   = Math.round(p.r + (q.r-p.r)*f);
  buf[idx+1] = Math.round(p.g + (q.g-p.g)*f);
  buf[idx+2] = Math.round(p.b + (q.b-p.b)*f);
  buf[idx+3] = Math.round(p.a + (q.a-p.a)*f);
}

// ─── Marching Squares ─────────────────────────────────────────────────────────

const MS: number[][][] = [
  [],[[3,2]],[[2,1]],[[3,1]],[[0,1]],[[0,3],[2,1]],[[0,2]],[[0,3]],
  [[0,3]],[[0,2]],[[0,1],[2,3]],[[0,1]],[[3,1]],[[2,1]],[[3,2]],[],
];

function edgePt(x0:number,y0:number,cw:number,ch:number,
                edge:number,v:number[],thr:number):[number,number] {
  const s=(n:number,d:number)=>d===0?0.5:Math.max(0,Math.min(1,n/d));
  switch(edge){
    case 0: return [x0+s(thr-v[0],v[1]-v[0])*cw, y0];
    case 1: return [x0+cw, y0+s(thr-v[1],v[2]-v[1])*ch];
    case 2: return [x0+s(thr-v[3],v[2]-v[3])*cw, y0+ch];
    case 3: return [x0, y0+s(thr-v[0],v[3]-v[0])*ch];
    default:return [x0,y0];
  }
}

// ─── Config ───────────────────────────────────────────────────────────────────

const SCALE       = 0.0026;  // noise frequency — controls how wide the "landmasses" are
const TIME_SPEED  = 0.00007; // very slow drift (geological timescale feel)
const FILL_DIV    = 4;       // fill canvas resolution divisor (renders at 1/4 size, stretched)
const LINE_CELL   = 14;      // marching squares grid spacing
const LINE_LEVELS = 16;      // number of contour lines

// ─── Component ────────────────────────────────────────────────────────────────

export function TopoBackground() {
  const fillRef  = useRef<HTMLCanvasElement>(null);
  const lineRef  = useRef<HTMLCanvasElement>(null);
  const frameRef = useRef<number>(0);
  const tRef     = useRef<number>(0);

  useEffect(() => {
    const fillCanvas = fillRef.current;
    const lineCanvas = lineRef.current;
    if (!fillCanvas || !lineCanvas) return;
    const fCtx = fillCanvas.getContext('2d');
    const lCtx = lineCanvas.getContext('2d');
    if (!fCtx || !lCtx) return;

    const resize = () => {
      // Fill canvas: low resolution — browser stretches it, CSS blur handles the rest
      fillCanvas.width  = Math.ceil(window.innerWidth  / FILL_DIV);
      fillCanvas.height = Math.ceil(window.innerHeight / FILL_DIV);
      // Line canvas: full resolution
      lineCanvas.width  = window.innerWidth;
      lineCanvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    const draw = () => {
      const W = window.innerWidth, H = window.innerHeight;
      const scrollY = window.scrollY;
      tRef.current += TIME_SPEED;
      const T = tRef.current;

      // ── Fill pass ─────────────────────────────────────────────────────────
      const fw = fillCanvas.width, fh = fillCanvas.height;
      const imgData = fCtx.createImageData(fw, fh);
      const buf     = imgData.data;

      // Pre-compute global min/max for normalisation using the fill grid
      let mn = Infinity, mx = -Infinity;
      const raw = new Float32Array(fw * fh);
      for (let fy = 0; fy < fh; fy++) {
        for (let fx2 = 0; fx2 < fw; fx2++) {
          const sx = fx2 * FILL_DIV, sy = fy * FILL_DIV;
          const v  = fbm(sx * SCALE + T * 0.30, (sy + scrollY) * SCALE + T);
          raw[fy * fw + fx2] = v;
          if (v < mn) mn = v;
          if (v > mx) mx = v;
        }
      }
      const rng = mx - mn || 1;
      for (let i = 0; i < raw.length; i++) {
        writeColor(buf, i * 4, (raw[i] - mn) / rng);
      }
      fCtx.putImageData(imgData, 0, 0);

      // ── Contour line pass (marching squares) ──────────────────────────────
      lCtx.clearRect(0, 0, W, H);

      const cols = Math.ceil(W / LINE_CELL) + 1;
      const rows = Math.ceil(H / LINE_CELL) + 1;
      const stride = cols + 1;
      const field  = new Float32Array((rows + 1) * stride);

      let fmn = Infinity, fmx = -Infinity;
      for (let r = 0; r <= rows; r++) {
        for (let c = 0; c <= cols; c++) {
          const sx = c * LINE_CELL, sy = r * LINE_CELL;
          const v  = fbm(sx * SCALE + T * 0.30, (sy + scrollY) * SCALE + T);
          field[r * stride + c] = v;
          if (v < fmn) fmn = v;
          if (v > fmx) fmx = v;
        }
      }
      const frng = fmx - fmn || 1;
      for (let i = 0; i < field.length; i++) field[i] = (field[i] - fmn) / frng;

      lCtx.lineCap  = 'round';
      lCtx.lineJoin = 'round';

      for (let lvl = 1; lvl < LINE_LEVELS; lvl++) {
        const thr = lvl / LINE_LEVELS;
        // More opaque near mid-elevations, faint at extremes
        const dfc = Math.abs(thr - 0.5) * 2;
        lCtx.globalAlpha  = lerp(0.55, 0.10, dfc);
        lCtx.strokeStyle  = '#c9a84c';
        lCtx.lineWidth    = lerp(1.0, 0.5, dfc);

        lCtx.beginPath();
        for (let r = 0; r < rows; r++) {
          for (let c = 0; c < cols; c++) {
            const x0 = c * LINE_CELL, y0 = r * LINE_CELL;
            const tl = field[r * stride + c];
            const tr = field[r * stride + c + 1];
            const br = field[(r+1) * stride + c + 1];
            const bl = field[(r+1) * stride + c];
            const cidx = (tl>thr?8:0)|(tr>thr?4:0)|(br>thr?2:0)|(bl>thr?1:0);
            const v    = [tl, tr, br, bl];
            for (const [e0,e1] of MS[cidx]) {
              const [ax,ay] = edgePt(x0,y0,LINE_CELL,LINE_CELL,e0,v,thr);
              const [bx,by] = edgePt(x0,y0,LINE_CELL,LINE_CELL,e1,v,thr);
              lCtx.moveTo(ax, ay);
              lCtx.lineTo(bx, by);
            }
          }
        }
        lCtx.stroke();
      }
      lCtx.globalAlpha = 1;

      frameRef.current = requestAnimationFrame(draw);
    };

    draw();
    return () => {
      cancelAnimationFrame(frameRef.current);
      window.removeEventListener('resize', resize);
    };
  }, []);

  return (
    <>
      {/* Elevation fill: low-res canvas stretched to full screen, heavy blur for smooth gradients */}
      <canvas
        ref={fillRef}
        style={{
          position: 'fixed', top:0, left:0,
          width: '100%', height: '100%',
          zIndex: 0, pointerEvents: 'none',
          filter: 'blur(22px)',
          imageRendering: 'auto',
        }}
      />
      {/* Contour lines: full-res canvas, slight blur for smooth edges */}
      <canvas
        ref={lineRef}
        style={{
          position: 'fixed', top:0, left:0,
          width: '100%', height: '100%',
          zIndex: 0, pointerEvents: 'none',
          filter: 'blur(1.2px)',
        }}
      />
    </>
  );
}
