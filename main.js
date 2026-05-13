// Mahir Nagersheth — 3D Solar Portfolio  (THREE loaded globally)

// ---------- PLANETS + subsections (subsections become moons) ----------
const PLANETS = [
  { id:'work', name:'Work', sub:'Goldman Sachs',
    color:0xd6b25e, emissive:0x4a3819, orbit:5.4, speed:0.0042, size:1.00,
    hasRings:true, ringColor:0xf2d28a, ringInner:1.45, ringOuter:2.00,
    tilt:0.25, startAngle:0.4, inclination:{x:0.04,z:0.02},
    texture:{ style:'bands', base:'#7a5b22', mid:'#d6b25e', accent:'#fff0c4', seed:17 },
    subsections:[
      { name:'Risk Engineering', size:0.20, orbit:1.65, speed:0.012, color:0xf2d28a, tilt:0.10 },
      { name:'Data Pipelines',   size:0.13, orbit:2.10, speed:0.008, color:0xb58e44, tilt:-0.15 },
      { name:'Pipeline Testing', size:0.11, orbit:2.55, speed:0.006, color:0x9d7a36, tilt:0.20 },
    ] },
  { id:'education', name:'Education', sub:'Carnegie Mellon',
    color:0xc41e3a, emissive:0x3a0c14, orbit:8.6, speed:0.0028, size:0.86,
    tilt:0.18, startAngle:1.7, inclination:{x:-0.10,z:0.05},
    texture:{ style:'rocky', base:'#5a141c', mid:'#c41e3a', accent:'#ff7388', seed:31 },
    subsections:[
      { name:'Master’s Studies', size:0.16, orbit:1.40, speed:0.011, color:0xff4763, tilt:0.10 },
      { name:'Undergraduate',         size:0.12, orbit:1.85, speed:0.007, color:0xa83a4f, tilt:-0.15 },
    ] },
  { id:'projects', name:'Projects', sub:'What I build',
    color:0x4a7ff5, emissive:0x122150, orbit:12.0, speed:0.0021, size:0.66,
    tilt:0.30, startAngle:2.7, inclination:{x:0.13,z:-0.06},
    texture:{ style:'continents', base:'#0e2057', mid:'#4a7ff5', accent:'#5dd391', seed:53 },
    subsections:[
      { name:'Machine Learning', size:0.11, orbit:1.10, speed:0.014, color:0x6f9bff, tilt:0.05 },
      { name:'Deep Learning',    size:0.10, orbit:1.45, speed:0.011, color:0x4a7ff5, tilt:-0.12 },
      { name:'Web Apps',         size:0.10, orbit:1.80, speed:0.009, color:0x5dd391, tilt:0.18 },
      { name:'Data Analytics',   size:0.09, orbit:2.15, speed:0.007, color:0x8db8ff, tilt:-0.22 },
    ] },
  { id:'piano', name:'Piano', sub:'Performances',
    color:0xb46be0, emissive:0x351754, orbit:16.0, speed:0.0016, size:0.54,
    tilt:0.10, startAngle:3.6, inclination:{x:-0.18,z:0.08},
    texture:{ style:'swirl', base:'#3a154e', mid:'#b46be0', accent:'#f3c4ff', seed:71 },
    subsections:[
      { name:'Performance I',   size:0.09, orbit:1.05, speed:0.013, color:0xcf8dff, tilt:0.08 },
      { name:'Performance II',  size:0.09, orbit:1.45, speed:0.010, color:0xb46be0, tilt:-0.18 },
      { name:'Performance III', size:0.09, orbit:1.85, speed:0.008, color:0x9758c8, tilt:0.22 },
    ] },
  { id:'entrepreneurship', name:'Ventures', sub:'Founder stories',
    color:0x4ad991, emissive:0x0f4d30, orbit:20.5, speed:0.0012, size:0.62,
    hasRings:true, ringColor:0x8effc1, ringInner:1.05, ringOuter:1.30,
    tilt:-0.20, startAngle:4.5, inclination:{x:0.09,z:0.18},
    texture:{ style:'cells', base:'#0f3a26', mid:'#4ad991', accent:'#a4ffd1', seed:89 },
    subsections:[
      { name:'Past Venture',  size:0.10, orbit:1.55, speed:0.012, color:0x6dffac, tilt:0.06 },
      { name:'Pivot',         size:0.10, orbit:1.95, speed:0.009, color:0x4ad991, tilt:-0.15 },
      { name:'Now Building',  size:0.11, orbit:2.40, speed:0.007, color:0x7afcb8, tilt:0.20 },
    ] },
  { id:'nonprofit', name:'Impact', sub:'TIDE Foundation',
    color:0x4ed5cf, emissive:0x0f3f3d, orbit:25.5, speed:0.0009, size:0.58,
    tilt:0.22, startAngle:5.5, inclination:{x:-0.07,z:-0.14},
    texture:{ style:'ocean', base:'#0c3635', mid:'#4ed5cf', accent:'#bff7f3', seed:103 },
    subsections:[
      { name:'TIDE Foundation', size:0.12, orbit:1.20, speed:0.010, color:0xbff7f3, tilt:0.08 },
    ] },
  { id:'writing', name:'Notes', sub:'Long-form writing',
    color:0x9c8dc7, emissive:0x2a1d52, orbit:30.5, speed:0.00075, size:0.40,
    tilt:0.12, startAngle:7.1, inclination:{x:0.20,z:-0.18},
    texture:{ style:'cratered', base:'#3d2f5e', mid:'#9c8dc7', accent:'#e0d3f8', seed:127 },
    subsections:[
      { name:'Engineering', size:0.06, orbit:0.85, speed:0.013, color:0xc7d7ff, tilt:0.08 },
      { name:'Reflections', size:0.06, orbit:1.10, speed:0.010, color:0xb89fff, tilt:-0.14 },
      { name:'Life',        size:0.06, orbit:1.35, speed:0.008, color:0xe0c4f8, tilt:0.20 },
    ] },
  { id:'contact', name:'Contact', sub:'Get in touch',
    color:0xe8e8e8, emissive:0x2a2a2e, orbit:35.0, speed:0.00060, size:0.46,
    tilt:0.05, startAngle:6.3, inclination:{x:0.16,z:-0.09},
    texture:{ style:'cratered', base:'#5b5b66', mid:'#c8c8cf', accent:'#f2f1ee', seed:113 },
    subsections:[
      { name:'Email',    size:0.07, orbit:0.90, speed:0.014, color:0xffffff, tilt:0.06 },
      { name:'LinkedIn', size:0.07, orbit:1.20, speed:0.011, color:0xc7d7ff, tilt:-0.12 },
      { name:'Phone',    size:0.07, orbit:1.50, speed:0.009, color:0xeaeaea, tilt:0.18 },
      { name:'GitHub',   size:0.07, orbit:1.80, speed:0.007, color:0x9aa3b5, tilt:-0.22 },
    ] },
];
const PLANET_BY_ID = Object.fromEntries(PLANETS.map(p => [p.id, p]));

// ---------- Noise + color helpers ----------
function makeNoise(seed) {
  let s = seed | 0;
  const r = () => { s = (s * 9301 + 49297) % 233280; return s / 233280; };
  const perm = []; for (let i = 0; i < 256; i++) perm.push(i);
  for (let i = 255; i > 0; i--) { const j = Math.floor(r() * (i + 1)); [perm[i], perm[j]] = [perm[j], perm[i]]; }
  for (let i = 0; i < 256; i++) perm.push(perm[i]);
  const fade = t => t * t * t * (t * (t * 6 - 15) + 10);
  const lerp = (a, b, t) => a + t * (b - a);
  const grad = (h, x, y) => { const u = (h & 1) ? -x : x, v = (h & 2) ? -y : y; return ((h & 4) ? u + v : u - v) * 0.7; };
  return (x, y) => {
    const X = Math.floor(x) & 255, Y = Math.floor(y) & 255;
    x -= Math.floor(x); y -= Math.floor(y);
    const u = fade(x), v = fade(y), A = perm[X] + Y, B = perm[X + 1] + Y;
    return lerp(lerp(grad(perm[A], x, y), grad(perm[B], x - 1, y), u),
                lerp(grad(perm[A + 1], x, y - 1), grad(perm[B + 1], x - 1, y - 1), u), v);
  };
}
function fbm(n, x, y, oct = 5) {
  let v = 0, a = 0.5, f = 1;
  for (let i = 0; i < oct; i++) { v += a * n(x * f, y * f); f *= 2; a *= 0.5; }
  return v;
}
const hexToRgb = h => { const m = h.replace('#', ''); return { r: parseInt(m.slice(0,2),16), g: parseInt(m.slice(2,4),16), b: parseInt(m.slice(4,6),16) }; };
const mixRgb = (a, b, t) => { t = Math.max(0, Math.min(1, t)); return { r: Math.round(a.r+(b.r-a.r)*t), g: Math.round(a.g+(b.g-a.g)*t), b: Math.round(a.b+(b.b-a.b)*t) }; };
const rgbStr = ({r,g,b}, a=1) => `rgba(${r},${g},${b},${a})`;
const BLACK = { r: 0, g: 0, b: 0 };

// ---------- Procedural planet textures (color only, 512×256) ----------
function generatePlanetTexture(opts) {
  const W = 512, H = 256;
  const cv = document.createElement('canvas'); cv.width = W; cv.height = H;
  const ctx = cv.getContext('2d');
  const baseRgb = hexToRgb(opts.base), midRgb = hexToRgb(opts.mid), accRgb = hexToRgb(opts.accent);
  const noise = makeNoise(opts.seed || 1);
  const img = ctx.createImageData(W, H), data = img.data;
  const setPx = (x, y, c) => { const i = (y * W + x) * 4; data[i] = c.r; data[i+1] = c.g; data[i+2] = c.b; data[i+3] = 255; };
  const poleShade = y => Math.pow(Math.abs(y / H - 0.5) * 2, 1.6) * 0.45;

  switch (opts.style) {
    case 'bands': {
      for (let y = 0; y < H; y++) {
        const yn = y / H;
        const band = Math.sin(yn * Math.PI * 7) * 0.32 + Math.sin(yn * Math.PI * 13) * 0.20 + Math.sin(yn * Math.PI * 21) * 0.10;
        for (let x = 0; x < W; x++) {
          const xn = x / W;
          const turb = fbm(noise, xn * 6, yn * 26, 4) * 0.18;
          let c = mixRgb(baseRgb, midRgb, Math.max(0, Math.min(1, 0.5 + band + turb)));
          const storm = fbm(noise, xn * 3 + 5, yn * 6, 3);
          if (storm > 0.45) c = mixRgb(c, accRgb, (storm - 0.45) * 1.4);
          setPx(x, y, mixRgb(c, BLACK, poleShade(y)));
        }
      }
      break;
    }
    case 'rocky': {
      for (let y = 0; y < H; y++) for (let x = 0; x < W; x++) {
        const xn = x / W * 8, yn = y / H * 4;
        const n = fbm(noise, xn, yn, 6) * 0.5 + 0.5;
        let c = mixRgb(baseRgb, midRgb, n);
        const veins = fbm(noise, xn * 1.7 + 9, yn * 1.7, 3);
        if (veins > 0.55) c = mixRgb(c, accRgb, (veins - 0.55) * 1.6);
        setPx(x, y, mixRgb(c, BLACK, poleShade(y)));
      }
      ctx.putImageData(img, 0, 0);
      for (let i = 0; i < 60; i++) {
        const cx = Math.random() * W, cy = Math.random() * H, r = 3 + Math.random() * 18;
        const g = ctx.createRadialGradient(cx, cy, 0, cx, cy, r);
        g.addColorStop(0, rgbStr(mixRgb(baseRgb, BLACK, 0.55), 0.7));
        g.addColorStop(0.7, rgbStr(midRgb, 0));
        g.addColorStop(1, rgbStr(accRgb, 0.18));
        ctx.fillStyle = g; ctx.beginPath(); ctx.arc(cx, cy, r, 0, Math.PI * 2); ctx.fill();
      }
      const tex = new THREE.CanvasTexture(cv); tex.colorSpace = THREE.SRGBColorSpace; return tex;
    }
    case 'continents': {
      const landBase = mixRgb(midRgb, { r: 60, g: 110, b: 70 }, 0.45);
      const landHigh = mixRgb(accRgb, { r: 240, g: 220, b: 170 }, 0.25);
      const waterDeep = mixRgb(baseRgb, BLACK, 0.30);
      for (let y = 0; y < H; y++) {
        const lat = Math.abs(y / H - 0.5) * 2;
        for (let x = 0; x < W; x++) {
          const n = fbm(noise, x / W * 4, y / H * 3, 6);
          let c = n > 0.05
            ? mixRgb(landBase, landHigh, Math.min(1, (n - 0.05) * 2.5))
            : mixRgb(waterDeep, baseRgb, Math.max(0, n * 4 + 1));
          if (lat > 0.78) c = mixRgb(c, { r: 240, g: 244, b: 250 }, (lat - 0.78) / 0.22 * 0.85);
          setPx(x, y, mixRgb(c, BLACK, poleShade(y) * 0.6));
        }
      }
      break;
    }
    case 'swirl': {
      const cx = W / 2, cy = H / 2;
      for (let y = 0; y < H; y++) for (let x = 0; x < W; x++) {
        const dx = (x - cx) / W, dy = (y - cy) / H, r = Math.sqrt(dx * dx + dy * dy);
        const theta = Math.atan2(dy, dx) + r * 8 + fbm(noise, x * 0.02, y * 0.02, 4) * 1.2;
        const sx = Math.cos(theta) * r * 5, sy = Math.sin(theta) * r * 5;
        const n = fbm(noise, sx + 3, sy + 3, 5) * 0.5 + 0.5;
        let c = mixRgb(baseRgb, midRgb, n);
        const hot = fbm(noise, sx * 2, sy * 2, 3);
        if (hot > 0.4) c = mixRgb(c, accRgb, (hot - 0.4) * 1.2);
        setPx(x, y, mixRgb(c, BLACK, poleShade(y) * 0.7));
      }
      break;
    }
    case 'cells': {
      const pts = [];
      for (let i = 0; i < 28; i++) pts.push({
        x: Math.random() * W, y: Math.random() * H,
        c: Math.random() < 0.7 ? midRgb : (Math.random() < 0.5 ? baseRgb : accRgb),
      });
      for (let y = 0; y < H; y++) for (let x = 0; x < W; x++) {
        let d1 = Infinity, d2 = Infinity, near = pts[0];
        for (const p of pts) {
          let dx = Math.abs(p.x - x); if (dx > W / 2) dx = W - dx;
          const dy = p.y - y, d = dx * dx + dy * dy;
          if (d < d1) { d2 = d1; d1 = d; near = p; } else if (d < d2) d2 = d;
        }
        const edge = Math.sqrt(d2) - Math.sqrt(d1);
        const tint = fbm(noise, x * 0.04, y * 0.04, 3) * 0.3;
        let c = mixRgb(near.c, accRgb, Math.max(0, tint));
        if (edge < 4) c = mixRgb(c, baseRgb, 0.65);
        setPx(x, y, mixRgb(c, BLACK, poleShade(y) * 0.7));
      }
      break;
    }
    case 'ocean': {
      const landBase = mixRgb(accRgb, { r: 80, g: 90, b: 80 }, 0.30);
      for (let y = 0; y < H; y++) {
        const lat = Math.abs(y / H - 0.5) * 2;
        for (let x = 0; x < W; x++) {
          const n = fbm(noise, x / W * 5, y / H * 3, 5);
          const wave = Math.sin((y + fbm(noise, x / W * 10, y / H * 6, 3) * 30) * 0.05) * 0.5 + 0.5;
          let c = n > 0.18
            ? mixRgb(midRgb, landBase, Math.min(1, (n - 0.18) * 4))
            : mixRgb(baseRgb, midRgb, wave * 0.55 + (n + 0.5) * 0.4);
          if (lat > 0.85) c = mixRgb(c, { r: 232, g: 246, b: 248 }, (lat - 0.85) / 0.15 * 0.7);
          setPx(x, y, mixRgb(c, BLACK, poleShade(y) * 0.55));
        }
      }
      break;
    }
    case 'cratered': {
      for (let y = 0; y < H; y++) for (let x = 0; x < W; x++) {
        const n = fbm(noise, x / W * 6, y / H * 3, 5) * 0.5 + 0.5;
        setPx(x, y, mixRgb(mixRgb(baseRgb, midRgb, n), BLACK, poleShade(y)));
      }
      ctx.putImageData(img, 0, 0);
      for (let i = 0; i < 110; i++) {
        const cx = Math.random() * W, cy = Math.random() * H, r = 2 + Math.random() * 22;
        const g = ctx.createRadialGradient(cx, cy, 0, cx, cy, r);
        g.addColorStop(0, rgbStr(mixRgb(baseRgb, BLACK, 0.5), 0.85));
        g.addColorStop(0.7, rgbStr(midRgb, 0));
        g.addColorStop(1, rgbStr(accRgb, 0.30));
        ctx.fillStyle = g; ctx.beginPath(); ctx.arc(cx, cy, r, 0, Math.PI * 2); ctx.fill();
      }
      const tex = new THREE.CanvasTexture(cv); tex.colorSpace = THREE.SRGBColorSpace; return tex;
    }
  }
  ctx.putImageData(img, 0, 0);
  const tex = new THREE.CanvasTexture(cv); tex.colorSpace = THREE.SRGBColorSpace; return tex;
}

// Saturn-style ring strip (radial bands with gaps)
function generateRingTexture(opts) {
  const W = 512, H = 32;
  const cv = document.createElement('canvas'); cv.width = W; cv.height = H;
  const ctx = cv.getContext('2d');
  const ringRgb = hexToRgb(opts.color), accRgb = hexToRgb(opts.accent || opts.color);
  const noise = makeNoise(opts.seed || 7);
  const img = ctx.createImageData(W, H), data = img.data;
  for (let x = 0; x < W; x++) {
    const xn = x / W;
    const bands = Math.sin(xn * Math.PI * 18) * 0.35 + Math.sin(xn * Math.PI * 31) * 0.22 + Math.sin(xn * Math.PI * 7) * 0.18;
    const turb = fbm(noise, xn * 60, 0, 3) * 0.15;
    const v = Math.max(0, Math.min(1, 0.45 + bands + turb));
    let alpha = Math.pow(v, 1.4);
    if (Math.sin(xn * Math.PI * 9 + 1.2) < -0.85) alpha = 0;
    if (Math.sin(xn * Math.PI * 27 + 0.5) < -0.94) alpha *= 0.2;
    const c = mixRgb(ringRgb, accRgb, v);
    for (let y = 0; y < H; y++) {
      const i = (y * W + x) * 4;
      data[i] = c.r; data[i+1] = c.g; data[i+2] = c.b; data[i+3] = Math.round(alpha * 255);
    }
  }
  ctx.putImageData(img, 0, 0);
  const tex = new THREE.CanvasTexture(cv); tex.colorSpace = THREE.SRGBColorSpace; return tex;
}

// ---------- Scene ----------
const canvas = document.getElementById('bg-canvas');
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(55, innerWidth / innerHeight, 0.1, 500);
camera.position.set(0, 0.5, 5);
camera.lookAt(0, 0, 0);
const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true, powerPreference: 'high-performance' });
renderer.setPixelRatio(Math.min(devicePixelRatio, 2));
renderer.setSize(innerWidth, innerHeight);
renderer.setClearColor(0x000000, 0);

// Lights
scene.add(new THREE.AmbientLight(0xffffff, 0.18));
const sunLight = new THREE.PointLight(0xfff1c1, 4.0, 220, 1.4);
scene.add(sunLight);
scene.add(new THREE.HemisphereLight(0xa9b4ff, 0x1a0e2a, 0.18));

// Starfield
function starfield(count, spread, size, opacity) {
  const g = new THREE.BufferGeometry();
  const pos = new Float32Array(count * 3);
  for (let i = 0; i < count; i++) {
    pos[i*3] = (Math.random() - 0.5) * spread;
    pos[i*3+1] = (Math.random() - 0.5) * spread;
    pos[i*3+2] = (Math.random() - 0.5) * spread;
  }
  g.setAttribute('position', new THREE.BufferAttribute(pos, 3));
  return new THREE.Points(g, new THREE.PointsMaterial({
    color: 0xffffff, size, sizeAttenuation: true, transparent: true, opacity,
    depthWrite: false, blending: THREE.AdditiveBlending,
  }));
}
const starsFar = starfield(2000, 200, 0.115, 0.85), starsNear = starfield(500, 60, 0.085, 0.55);
scene.add(starsFar); scene.add(starsNear);

// Fairy-dust particles — only visible in day mode. Pastel motes drifting
// through the scene that give the dreamy, enchanted-air feel.
function fairyDust(count = 700, spread = 90) {
  const g = new THREE.BufferGeometry();
  const pos = new Float32Array(count * 3), col = new Float32Array(count * 3);
  const palette = [
    [1.00, 0.74, 0.85], [1.00, 0.86, 0.55], [0.74, 0.88, 1.00],
    [0.88, 0.74, 1.00], [0.78, 1.00, 0.86], [1.00, 0.92, 0.72],
  ];
  for (let i = 0; i < count; i++) {
    pos[i*3] = (Math.random() - 0.5) * spread;
    pos[i*3+1] = (Math.random() - 0.5) * spread;
    pos[i*3+2] = (Math.random() - 0.5) * spread;
    const c = palette[Math.floor(Math.random() * palette.length)];
    col[i*3] = c[0]; col[i*3+1] = c[1]; col[i*3+2] = c[2];
  }
  g.setAttribute('position', new THREE.BufferAttribute(pos, 3));
  g.setAttribute('color',    new THREE.BufferAttribute(col, 3));
  return new THREE.Points(g, new THREE.PointsMaterial({
    vertexColors: true, size: 0.16, sizeAttenuation: true,
    transparent: true, opacity: 0, depthWrite: false, blending: THREE.AdditiveBlending,
  }));
}
const dust = fairyDust();
scene.add(dust);

// ---------- Sun ----------
const sunGroup = new THREE.Group();
scene.add(sunGroup);
const sunCore = new THREE.Mesh(new THREE.SphereGeometry(1.6, 64, 64), new THREE.MeshBasicMaterial({ color: 0xffd166 }));
sunGroup.add(sunCore);
const sunHaloInner = new THREE.Mesh(
  new THREE.SphereGeometry(1.95, 64, 64),
  new THREE.MeshBasicMaterial({ color: 0xffb454, transparent: true, opacity: 0.25, blending: THREE.AdditiveBlending, depthWrite: false })
);
sunGroup.add(sunHaloInner);

const coronaCv = document.createElement('canvas'); coronaCv.width = coronaCv.height = 256;
{ const c = coronaCv.getContext('2d'), g = c.createRadialGradient(128, 128, 0, 128, 128, 128);
  g.addColorStop(0, 'rgba(255,209,102,0.65)'); g.addColorStop(0.30, 'rgba(255,162,70,0.35)');
  g.addColorStop(0.65, 'rgba(196,30,58,0.10)'); g.addColorStop(1, 'rgba(0,0,0,0)');
  c.fillStyle = g; c.fillRect(0, 0, 256, 256); }
const corona = new THREE.Sprite(new THREE.SpriteMaterial({
  map: new THREE.CanvasTexture(coronaCv), transparent: true, blending: THREE.AdditiveBlending, depthWrite: false,
}));
corona.scale.set(7, 7, 1);
sunGroup.add(corona);

// ---------- Planets + Moons ----------
PLANETS.forEach(p => {
  const incl = new THREE.Group();
  incl.rotation.x = p.inclination?.x || 0;
  incl.rotation.z = p.inclination?.z || 0;
  scene.add(incl);
  p.inclinationGroup = incl;

  const pivot = new THREE.Group();
  pivot.rotation.y = p.startAngle;
  incl.add(pivot);
  p.pivot = pivot;

  const planetGroup = new THREE.Group();
  planetGroup.position.set(p.orbit, 0, 0);
  planetGroup.rotation.z = p.tilt || 0;
  pivot.add(planetGroup);
  p.group = planetGroup;

  const surfaceMap = generatePlanetTexture(p.texture);
  surfaceMap.wrapS = THREE.RepeatWrapping;
  surfaceMap.wrapT = THREE.ClampToEdgeWrapping;
  surfaceMap.anisotropy = renderer.capabilities.getMaxAnisotropy?.() || 4;

  const planetMat = new THREE.MeshStandardMaterial({
    map: surfaceMap, color: 0xffffff,
    emissive: p.emissive, emissiveIntensity: 0.18,
    roughness: 0.55, metalness: 0.15,
  });
  const planet = new THREE.Mesh(new THREE.SphereGeometry(p.size, 48, 48), planetMat);
  planetGroup.add(planet);
  p.mesh = planet; p.material = planetMat;

  // Atmosphere halo
  const halo = new THREE.Mesh(
    new THREE.SphereGeometry(p.size * 1.18, 32, 32),
    new THREE.MeshBasicMaterial({ color: p.color, transparent: true, opacity: 0.10, blending: THREE.AdditiveBlending, depthWrite: false })
  );
  planetGroup.add(halo);
  p.halo = halo;

  // Rings
  if (p.hasRings) {
    const ri = p.size * (p.ringInner || 1.35), ro = p.size * (p.ringOuter || 1.75);
    const rg = new THREE.RingGeometry(ri, ro, 128, 1);
    rg.rotateX(Math.PI / 2);
    const pos = rg.attributes.position, uv = rg.attributes.uv;
    for (let i = 0; i < pos.count; i++) {
      const x = pos.getX(i), z = pos.getZ(i), r = Math.sqrt(x * x + z * z);
      uv.setXY(i, (r - ri) / (ro - ri), (Math.atan2(z, x) + Math.PI) / (Math.PI * 2));
    }
    uv.needsUpdate = true;
    const ringTex = generateRingTexture({ color: p.texture?.mid || '#ffffff', accent: p.texture?.accent || '#ffffff', seed: (p.texture?.seed || 0) + 11 });
    ringTex.wrapS = THREE.ClampToEdgeWrapping; ringTex.wrapT = THREE.RepeatWrapping;
    const rings = new THREE.Mesh(rg, new THREE.MeshBasicMaterial({ map: ringTex, transparent: true, side: THREE.DoubleSide, depthWrite: false }));
    rings.rotation.z = (p.tilt || 0) + 0.22;
    planetGroup.add(rings);
    p.rings = rings;
  }

  // Orbit guide line
  const og = new THREE.RingGeometry(p.orbit - 0.018, p.orbit + 0.018, 256);
  og.rotateX(-Math.PI / 2);
  const orbitLine = new THREE.Mesh(og, new THREE.MeshBasicMaterial({
    color: p.color, transparent: true, opacity: 0.18, side: THREE.DoubleSide, depthWrite: false,
  }));
  incl.add(orbitLine);
  p.orbitLine = orbitLine;

  // Moons (subsections)
  p.moons = [];
  if (p.subsections) {
    p.subsections.forEach((s, i) => {
      const moonIncl = new THREE.Group();
      moonIncl.rotation.x = s.tilt || 0;
      planetGroup.add(moonIncl);

      const moonPivot = new THREE.Group();
      moonPivot.rotation.y = (i / p.subsections.length) * Math.PI * 2 + Math.random() * 0.4;
      moonIncl.add(moonPivot);

      const moonMesh = new THREE.Mesh(
        new THREE.SphereGeometry(s.size, 24, 24),
        new THREE.MeshStandardMaterial({ color: s.color, emissive: s.color, emissiveIntensity: 0.18, roughness: 0.7, metalness: 0.1 })
      );
      moonMesh.position.set(s.orbit, 0, 0);
      moonPivot.add(moonMesh);

      // Faint orbit ring around the planet
      const mog = new THREE.RingGeometry(s.orbit - 0.005, s.orbit + 0.005, 96);
      mog.rotateX(-Math.PI / 2);
      const mLine = new THREE.Mesh(mog, new THREE.MeshBasicMaterial({
        color: s.color, transparent: true, opacity: 0.12, side: THREE.DoubleSide, depthWrite: false,
      }));
      moonIncl.add(mLine);

      p.moons.push({ pivot: moonPivot, mesh: moonMesh, line: mLine, speed: s.speed, name: s.name });
    });
  }
});

// ---------- HTML labels ----------
const labelsRoot = document.getElementById('planet-labels');
const cssColor = h => '#' + h.toString(16).padStart(6, '0');
PLANETS.forEach(p => {
  const el = document.createElement('button');
  el.type = 'button'; el.className = 'planet-label'; el.dataset.target = p.id;
  el.style.setProperty('--planet-color', cssColor(p.color));
  el.style.setProperty('--planet-color-glow', `rgba(${(p.color>>16)&255},${(p.color>>8)&255},${p.color&255},0.45)`);
  el.innerHTML = `<span class="pl-name">${p.name}</span><span class="pl-tag">${p.sub}</span>`;
  el.addEventListener('mouseenter', () => setHover(p.id));
  el.addEventListener('mouseleave', () => setHover(null));
  el.addEventListener('focus', () => setHover(p.id));
  el.addEventListener('blur', () => setHover(null));
  el.addEventListener('click', () => focusPlanet(p.id, true));
  labelsRoot.appendChild(el);
  p.label = el;
});
const sunLabelEl = document.createElement('div');
sunLabelEl.className = 'sun-label';
sunLabelEl.innerHTML = `
  <span class="sl-eyebrow">The Sun</span>
  <span class="sl-name">Mahir Nagersheth</span>
  <span class="sl-sub">Carnegie Mellon <span class="sub-em">MISM</span> · Incoming <span class="sub-em">Goldman Sachs</span> Engineering Summer Analyst</span>`;
labelsRoot.appendChild(sunLabelEl);

// Cache title elements (used by the 60%-above-readable-space trigger)
PLANETS.forEach(p => { p.titleEl = document.querySelector(`#${p.id} .section-title`); p.sectionActive = false; p.activityT = 0; });

// ---------- Mouse parallax ----------
const mouse = { x: 0, y: 0, tx: 0, ty: 0 };
addEventListener('mousemove', e => { mouse.tx = (e.clientX / innerWidth) * 2 - 1; mouse.ty = (e.clientY / innerHeight) * 2 - 1; });
addEventListener('touchmove', e => {
  if (!e.touches[0]) return;
  mouse.tx = (e.touches[0].clientX / innerWidth) * 2 - 1;
  mouse.ty = (e.touches[0].clientY / innerHeight) * 2 - 1;
}, { passive: true });

// ---------- Camera state machine ----------
const HERO_CLOSE_POS = new THREE.Vector3(0, 0.5, 5);
const HERO_CLOSE_LOOKAT = new THREE.Vector3(0, 0, 0);
const OVERVIEW_POS = new THREE.Vector3(0, 6, 26);
const OVERVIEW_LOOKAT = new THREE.Vector3(0, 0, 0);
const camPosTarget = HERO_CLOSE_POS.clone();
const camLookTarget = HERO_CLOSE_LOOKAT.clone();
const currentLookAt = HERO_CLOSE_LOOKAT.clone();
let mode = 'overview', activePlanetId = null, hoveredPlanetId = null, clickScrollUntil = 0;

const easeInOutCubic = t => t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
const clamp01 = v => Math.max(0, Math.min(1, v));
function heroScrollProgress() {
  const el = document.getElementById('hero');
  if (!el) return 1;
  const span = el.offsetHeight - innerHeight;
  return span <= 0 ? 1 : clamp01(scrollY / span);
}
function isInHeroZone() {
  const el = document.getElementById('hero');
  if (!el) return false;
  return scrollY < el.offsetTop + el.offsetHeight - innerHeight * 0.4;
}

function setHover(id) {
  hoveredPlanetId = id;
  PLANETS.forEach(p => {
    const isHover = p.id === id;
    p.material.emissiveIntensity = isHover ? 1.05 : 0.18;
    p.label.classList.toggle('is-hover', isHover);
    p.label.classList.toggle('faded', id !== null && !isHover && mode === 'overview');
  });
}

function setMode(newMode, planetId) {
  mode = newMode;
  activePlanetId = planetId || null;
  if (newMode === 'overview') document.body.removeAttribute('data-section');
  else if (planetId) document.body.setAttribute('data-section', planetId);
  PLANETS.forEach(p => p.label.classList.toggle('hidden', newMode !== 'overview'));
  const back = document.getElementById('back-button');
  if (back) back.classList.toggle('visible', newMode === 'planet');
  document.querySelectorAll('.nav-links a[data-link]').forEach(a => a.classList.toggle('active', a.dataset.link === planetId));
}

function refreshCameraTargets() {
  if (mode === 'planet' && activePlanetId) {
    const p = PLANET_BY_ID[activePlanetId];
    if (!p) return;
    const pw = new THREE.Vector3();
    p.group.getWorldPosition(pw);
    camPosTarget.copy(pw).add(computeTourOffset(p, p.smoothIdx || 0));
    camLookTarget.copy(pw);
    return;
  }
  const t = easeInOutCubic(heroScrollProgress());
  camPosTarget.lerpVectors(HERO_CLOSE_POS, OVERVIEW_POS, t);
  camLookTarget.lerpVectors(HERO_CLOSE_LOOKAT, OVERVIEW_LOOKAT, t);
}

function focusPlanet(planetId, scrollToSection) {
  if (!PLANET_BY_ID[planetId]) return;
  setMode('planet', planetId);
  refreshCameraTargets();
  if (scrollToSection) {
    clickScrollUntil = performance.now() + 1400;
    document.getElementById(planetId)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
}
function focusOverview(scrollToTop) {
  setMode('overview');
  refreshCameraTargets();
  if (scrollToTop) {
    clickScrollUntil = performance.now() + 1400;
    scrollTo({ top: 0, behavior: 'smooth' });
  }
}

// Section observer — when a section enters view, switch to that planet
const sectionEls = document.querySelectorAll('main .section');
const sectionObs = new IntersectionObserver(entries => {
  let best = null;
  entries.forEach(e => { if (e.isIntersecting && (!best || e.intersectionRatio > best.intersectionRatio)) best = e; });
  if (!best) return;
  const id = best.target.id;
  if (PLANET_BY_ID[id]) { setMode('planet', id); refreshCameraTargets(); }
}, { threshold: [0.25, 0.5, 0.75] });
sectionEls.forEach(el => sectionObs.observe(el));

// Subsection cards: each card → its planet's moon. As the user scrolls
// through cards, p.activeSubsectionIdx updates → camera pans to a new
// angle around the planet (tour) + the matching moon highlights.
const SUBSECTION_SELECTORS = {
  work: '.work-card', education: '.edu-card',
  projects: '.project-card:not(.phase2)', piano: '.piano-card',
  entrepreneurship: '.venture', nonprofit: '.nonprofit-card',
  writing: '.writing-card', contact: '.contact-card',
};
PLANETS.forEach(p => {
  p.activeSubsectionIdx = 0; p.smoothIdx = 0;
  const sectionEl = document.getElementById(p.id);
  const sel = SUBSECTION_SELECTORS[p.id];
  if (!sectionEl || !sel) return;
  const cards = sectionEl.querySelectorAll(sel);
  p.subsectionCards = Array.from(cards);
  p.subsectionCards.forEach((card, i) => {
    card.dataset.subsectionIdx = i;
    card.dataset.planetId = p.id;
  });
});
const subObs = new IntersectionObserver(entries => {
  let best = null;
  entries.forEach(e => {
    if (e.isIntersecting && (!best || e.intersectionRatio > best.intersectionRatio)) best = e;
  });
  if (!best) return;
  const idx = parseInt(best.target.dataset.subsectionIdx, 10);
  const p = PLANET_BY_ID[best.target.dataset.planetId];
  if (p && !isNaN(idx)) p.activeSubsectionIdx = idx;
}, { threshold: [0.4, 0.6] });
PLANETS.forEach(p => p.subsectionCards?.forEach(c => subObs.observe(c)));

// computeTourOffset — places the camera at a per-subsection angle around
// the planet, kept on the sun-lit hemisphere so the planet stays visible.
function computeTourOffset(planet, idx) {
  const pw = new THREE.Vector3();
  planet.group.getWorldPosition(pw);
  const radial = pw.clone().normalize();
  const N = Math.max(1, planet.subsections?.length || 1);
  if (N === 1) return radial.clone().multiplyScalar(3.4).add(new THREE.Vector3(0, 1.2, 0));
  const t = idx / (N - 1);            // 0..1 across subsections
  const sweep = Math.PI * 0.85;        // ~153° arc keeps the lit side facing camera
  const theta = -sweep / 2 + t * sweep;
  const elevation = 0.6 + Math.sin(t * Math.PI) * 0.7;
  const distance = 3.4 + Math.cos(t * Math.PI) * 0.35;
  const right = new THREE.Vector3(0, 1, 0).cross(radial).normalize();
  return radial.clone().multiplyScalar(distance * Math.cos(theta))
    .add(right.multiplyScalar(distance * Math.sin(theta)))
    .add(new THREE.Vector3(0, elevation, 0));
}

// ---------- Resize ----------
function onResize() {
  const w = innerWidth, h = innerHeight;
  camera.aspect = w / h; camera.updateProjectionMatrix();
  renderer.setSize(w, h);
  const scale = w < 720 ? 0.62 : w < 1100 ? 0.82 : 1;
  PLANETS.forEach(p => { p.group.position.set(p.orbit * scale, 0, 0); p.orbitLine.scale.set(scale, scale, scale); });
  // Overview pulled back to fit the wider, progressively-spaced orbits
  // (Contact is now at 31). Y bumped slightly for a flatter top-down feel.
  // Pulled back further to fit the new outer planets (Notes at 30.5, Contact at 35).
  if (w < 720)      { HERO_CLOSE_POS.set(0, 0.4, 5.6); OVERVIEW_POS.set(0, 9, 42); }
  else if (w < 1100){ HERO_CLOSE_POS.set(0, 0.5, 5.2); OVERVIEW_POS.set(0, 9, 46); }
  else              { HERO_CLOSE_POS.set(0, 0.5, 5.0); OVERVIEW_POS.set(0, 9, 50); }
  refreshCameraTargets();
}
addEventListener('resize', onResize);
onResize();

// ---------- Render loop ----------
let focusModeActive = false;
const POS_LAMBDA = 1.7, LOOK_LAMBDA = 2.1, SCALE_LAMBDA = 6, ACT_LAMBDA = 3.5;
const clock = new THREE.Clock(), tmpVec = new THREE.Vector3();

function animate() {
  const dt = Math.min(0.05, clock.getDelta());
  const t = clock.elapsedTime;

  // Sun
  sunGroup.scale.setScalar(1 + Math.sin(t * 0.6) * 0.015);
  sunHaloInner.material.opacity = 0.22 + Math.sin(t * 0.9) * 0.05;
  corona.material.opacity = 0.85 + Math.sin(t * 0.7) * 0.10;

  // Stars drift
  starsFar.rotation.y  += 0.00015;
  starsNear.rotation.y -= 0.0003;
  // Fairy dust drifts at its own pace
  dust.rotation.y += 0.00022;
  dust.rotation.x += 0.00009;

  // Section title trigger (60% above readable space) — drives moon animation.
  // Also: being the active planet (zoomed in) keeps moons alive so they don't
  // sit dormant when you click straight to a section from the solar overview.
  PLANETS.forEach(p => {
    if (p.titleEl) {
      const r = p.titleEl.getBoundingClientRect();
      p.sectionActive = (r.top + r.height * 0.6) < 0;
    } else {
      p.sectionActive = false;
    }
    const trigger = p.sectionActive || (mode === 'planet' && activePlanetId === p.id);
    p.activityT += ((trigger ? 1 : 0) - p.activityT) * (1 - Math.exp(-ACT_LAMBDA * dt));
  });

  // Smooth-lerp the active subsection index for the active planet —
  // drives both the camera tour position and which moon is highlighted.
  if (mode === 'planet' && activePlanetId) {
    const p = PLANET_BY_ID[activePlanetId];
    if (p) {
      const target = p.activeSubsectionIdx || 0;
      p.smoothIdx = (p.smoothIdx || 0) + (target - (p.smoothIdx || 0)) * (1 - Math.exp(-2.0 * dt));
      refreshCameraTargets(); // re-evaluate every frame so the tour stays smooth
    }
  }

  // Orbits — paused when zoomed onto a planet so the camera doesn't chase
  const orbitFactor = mode === 'overview' ? 1 : 0;
  PLANETS.forEach(p => {
    p.pivot.rotation.y += p.speed * orbitFactor;
    p.mesh.rotation.y += 0.0035;
    if (p.rings) p.rings.rotation.z += 0.0012;
    // Hover scale
    const tgt = (hoveredPlanetId === p.id || activePlanetId === p.id) ? 1.18 : 1.0;
    const sf = 1 - Math.exp(-SCALE_LAMBDA * dt);
    const next = p.mesh.scale.x + (tgt - p.mesh.scale.x) * sf;
    p.mesh.scale.setScalar(next);
    p.halo.scale.setScalar(next);

    // Moons — orbit speed scales with activity; the moon for the
    // currently-visible subsection scales up and glows.
    if (p.moons.length) {
      const isActivePlanet = mode === 'planet' && activePlanetId === p.id;
      const focusIdx = p.smoothIdx || 0;
      p.moons.forEach((m, i) => {
        m.pivot.rotation.y += m.speed * p.activityT;
        m.mesh.rotation.y += 0.01 * p.activityT;
        m.line.material.opacity = 0.04 + 0.18 * p.activityT;
        // Highlight the moon corresponding to the active subsection
        const focus = isActivePlanet ? Math.max(0, 1 - Math.abs(focusIdx - i)) : 0;
        const baseScale = 0.4 + 0.6 * p.activityT;
        const tgtScale = baseScale + focus * 1.0;     // active moon ~1.6, neighbors fall off
        const next = m.mesh.scale.x + (tgtScale - m.mesh.scale.x) * sf;
        m.mesh.scale.setScalar(next);
        m.mesh.material.emissiveIntensity = 0.15 + focus * 0.85;
      });
    }

    // Subtle "section-active" emissive bump on the planet
    if (mode === 'planet' && activePlanetId === p.id) {
      p.material.emissiveIntensity = 0.18 + 0.40 * p.activityT;
    }
  });

  // Auto-pop back to overview if user scrolled into hero (and no click in flight)
  if (isInHeroZone() && mode === 'planet' && performance.now() > clickScrollUntil) setMode('overview');

  if (mode === 'overview') refreshCameraTargets();

  // Camera damping — frame-rate independent
  camera.position.lerp(camPosTarget, 1 - Math.exp(-POS_LAMBDA * dt));
  currentLookAt.lerp(camLookTarget, 1 - Math.exp(-LOOK_LAMBDA * dt));
  camera.lookAt(currentLookAt);

  // Hero chrome fade
  const inHero = isInHeroZone();
  document.querySelector('.solar-chip')?.classList.toggle('scrolled-past', !inHero);
  document.querySelector('.solar-instructions')?.classList.toggle('scrolled-past', !inHero);

  // Project labels in overview/hero only
  if (mode === 'overview' && inHero) {
    PLANETS.forEach(p => {
      p.group.getWorldPosition(tmpVec);
      tmpVec.project(camera);
      const onScreen = tmpVec.z < 1 && tmpVec.z > -1;
      p.label.style.left = `${(tmpVec.x * 0.5 + 0.5) * innerWidth}px`;
      p.label.style.top = `${(-tmpVec.y * 0.5 + 0.5) * innerHeight - 38}px`;
      p.label.style.visibility = onScreen ? 'visible' : 'hidden';
    });
    tmpVec.set(0, 0, 0).project(camera);
    const sx = (tmpVec.x * 0.5 + 0.5) * innerWidth, sy = (-tmpVec.y * 0.5 + 0.5) * innerHeight;
    const camDist = camera.position.length();
    const focal = innerHeight / (2 * Math.tan(THREE.MathUtils.degToRad(camera.fov / 2)));
    const offset = Math.max(60, (focal * 1.95) / Math.max(0.5, camDist) + 36);
    sunLabelEl.style.left = `${sx}px`;
    sunLabelEl.style.top = `${sy + offset}px`;
    sunLabelEl.classList.toggle('visible', tmpVec.z < 1 && tmpVec.z > -1);
  } else {
    sunLabelEl.classList.remove('visible');
  }

  renderer.render(scene, camera);
  if (!focusModeActive) requestAnimationFrame(animate);
}
animate();

// ---------- UI: loader, nav, reveals, counters ----------
addEventListener('load', () => {
  const l = document.getElementById('loader');
  if (l) { setTimeout(() => l.classList.add('hidden'), 1500); setTimeout(() => l.remove(), 2500); }
});

const navToggle = document.querySelector('.nav-toggle');
const navLinksEl = document.querySelector('.nav-links');
if (navToggle && navLinksEl) {
  navToggle.addEventListener('click', () => { navToggle.classList.toggle('open'); navLinksEl.classList.toggle('open'); });
  navLinksEl.querySelectorAll('a').forEach(a => a.addEventListener('click', () => { navToggle.classList.remove('open'); navLinksEl.classList.remove('open'); }));
}
document.querySelectorAll('.nav-links a[data-link]').forEach(a => a.addEventListener('click', e => {
  const id = a.dataset.link;
  if (PLANET_BY_ID[id]) { e.preventDefault(); focusPlanet(id, true); }
}));
document.querySelector('.nav-logo')?.addEventListener('click', e => { e.preventDefault(); focusOverview(true); });
document.getElementById('back-button')?.addEventListener('click', () => focusOverview(true));

const revealObs = new IntersectionObserver(entries => {
  entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('visible'); revealObs.unobserve(e.target); } });
}, { threshold: 0.15 });
document.querySelectorAll('.reveal').forEach(el => revealObs.observe(el));

const easeOutCubic = t => 1 - Math.pow(1 - t, 3);
function animateCounter(el) {
  const tgt = parseFloat(el.dataset.count), dur = 1600, start = performance.now(), large = tgt >= 1000;
  const step = now => {
    const p = Math.min((now - start) / dur, 1), v = tgt * easeOutCubic(p);
    el.textContent = large ? Math.round(v).toLocaleString() : Math.round(v).toString();
    if (p < 1) requestAnimationFrame(step);
  };
  requestAnimationFrame(step);
}
const counterObs = new IntersectionObserver(entries => {
  entries.forEach(e => { if (e.isIntersecting) { animateCounter(e.target); counterObs.unobserve(e.target); } });
}, { threshold: 0.4 });
document.querySelectorAll('[data-count]').forEach(el => counterObs.observe(el));

const yearEl = document.getElementById('year');
if (yearEl) yearEl.textContent = new Date().getFullYear();

// ---------- Day / night / focus theme ----------
const THEME_KEY = 'mn-portfolio-theme';
const DAY_STAR_COLOR    = new THREE.Color(0xffe0b0);
const NIGHT_STAR_COLOR  = new THREE.Color(0xffffff);
const DAY_HALO_COLOR    = new THREE.Color(0xfff0c0);
const NIGHT_HALO_COLOR  = new THREE.Color(0xffb454);
const DAY_AMBIENT_COLOR = new THREE.Color(0xfff0e0);
const NIGHT_AMBIENT_COLOR = new THREE.Color(0xffffff);

function updateSceneForTheme(theme) {
  const day = theme === 'day';
  // Stars dim and shift to soft pastels in day
  starsFar.material.opacity = day ? 0.25 : 0.85;
  starsNear.material.opacity = day ? 0.18 : 0.55;
  starsFar.material.color.copy(day ? DAY_STAR_COLOR : NIGHT_STAR_COLOR);
  starsNear.material.color.copy(day ? new THREE.Color(0xffd0e8) : NIGHT_STAR_COLOR);
  // Fairy dust visible only in day mode
  dust.material.opacity = day ? 0.78 : 0;
  // Sun warmth + halo
  sunHaloInner.material.color.copy(day ? DAY_HALO_COLOR : NIGHT_HALO_COLOR);
  sunHaloInner.material.opacity = day ? 0.42 : 0.25;
  sunCore.material.color.set(day ? 0xfff1a8 : 0xffd166);
  sunLight.color.set(day ? 0xfff5cc : 0xfff1c1);
  sunLight.intensity = day ? 4.6 : 4.0;
  scene.children.forEach(c => {
    if (c.isAmbientLight) { c.color.copy(day ? DAY_AMBIENT_COLOR : NIGHT_AMBIENT_COLOR); c.intensity = day ? 0.32 : 0.18; }
  });
}

function applyTheme(theme) {
  const wasFocus = focusModeActive;
  focusModeActive = (theme === 'focus');

  if (theme === 'day' || theme === 'focus') document.body.setAttribute('data-theme', theme);
  else document.body.removeAttribute('data-theme');

  try { localStorage.setItem(THEME_KEY, theme); } catch (_) {}
  updateSceneForTheme(theme);

  // Restart render loop when leaving focus mode
  if (wasFocus && !focusModeActive) animate();
}

// First-visit theme: honour the user's OS preference (prefers-color-scheme)
// if they haven't picked one yet. Saved choice always wins.
const initialTheme = (() => {
  try { const saved = localStorage.getItem(THEME_KEY); if (saved) return saved; } catch (_) {}
  return matchMedia?.('(prefers-color-scheme: light)').matches ? 'day' : 'night';
})();
applyTheme(initialTheme);

document.getElementById('theme-toggle')?.addEventListener('click', () => {
  const cur = document.body.getAttribute('data-theme') || 'night';
  applyTheme(cur === 'night' ? 'day' : cur === 'day' ? 'focus' : 'night');
});

// ---------- Keyboard shortcuts ----------
// 1–7 jump to each planet. Esc returns to the solar overview. T toggles theme.
const KEY_TO_PLANET = ['work','education','projects','piano','entrepreneurship','nonprofit','writing','contact'];
addEventListener('keydown', e => {
  const tag = (e.target?.tagName || '').toLowerCase();
  if (tag === 'input' || tag === 'textarea' || e.metaKey || e.ctrlKey || e.altKey) return;
  if (e.key === 'Escape') { focusOverview(true); return; }
  if (e.key === 't' || e.key === 'T') { document.getElementById('theme-toggle')?.click(); return; }
  const idx = parseInt(e.key, 10);
  if (idx >= 1 && idx <= 8) {
    e.preventDefault();
    focusPlanet(KEY_TO_PLANET[idx - 1], true);
  }
});

// ============================================================
//  Flight paths — wrap focusPlanet to capture the camera's
//  current position before it starts tweening, so we can draw
//  a glowing arc from there to the new target planet.
// ============================================================
const _origFocusPlanet = focusPlanet;
focusPlanet = function(planetId, scrollToSection) {
  const fromPos = camera.position.clone();
  _origFocusPlanet(planetId, scrollToSection);
  const p = PLANET_BY_ID[planetId];
  if (!p) return;
  const toPos = new THREE.Vector3();
  p.group.getWorldPosition(toPos);
  drawFlightPath(fromPos, toPos);
};

// ============================================================
//  Flight paths — draw a faint arc between camera origin and
//  the target planet, fading out over ~1.4 seconds.
// ============================================================
function drawFlightPath(fromPos, toPos) {
  const dist = fromPos.distanceTo(toPos);
  if (dist < 0.5) return;
  const mid = fromPos.clone().add(toPos).multiplyScalar(0.5);
  // Lift the midpoint perpendicular to the chord — gives a real arc
  const chord = toPos.clone().sub(fromPos).normalize();
  const upish = new THREE.Vector3(0, 1, 0);
  const perp = upish.clone().cross(chord).cross(chord).multiplyScalar(-1).normalize();
  mid.add(perp.multiplyScalar(dist * 0.25));
  const curve = new THREE.QuadraticBezierCurve3(fromPos, mid, toPos);
  const points = curve.getPoints(80);
  const geom = new THREE.BufferGeometry().setFromPoints(points);
  const mat = new THREE.LineBasicMaterial({
    color: 0xffffff, transparent: true, opacity: 0.85,
    blending: THREE.AdditiveBlending, depthWrite: false,
  });
  const line = new THREE.Line(geom, mat);
  scene.add(line);
  const start = performance.now(), dur = 1400;
  function step() {
    const t = (performance.now() - start) / dur;
    if (t >= 1) {
      scene.remove(line); geom.dispose(); mat.dispose();
      return;
    }
    mat.opacity = 0.85 * (1 - t);
    requestAnimationFrame(step);
  }
  step();
}

// ============================================================
//  Live-from-GitHub feed (Projects section)
//  Set GITHUB_USERNAME to your real handle; leave empty to hide.
// ============================================================
const GITHUB_USERNAME = 'MahirNagersheth';
async function loadGitHubFeed() {
  const body = document.getElementById('gh-body');
  const handle = document.getElementById('gh-handle');
  if (!body) return;
  if (!GITHUB_USERNAME) return;
  if (handle) handle.textContent = '@' + GITHUB_USERNAME;
  try {
    const r = await fetch(`https://api.github.com/users/${GITHUB_USERNAME}/repos?sort=updated&per_page=6`);
    if (!r.ok) throw new Error(r.statusText);
    const repos = await r.json();
    if (!Array.isArray(repos) || !repos.length) return;
    const escape = s => s ? String(s).replace(/[<>&"]/g, c => ({'<':'&lt;','>':'&gt;','&':'&amp;','"':'&quot;'}[c])) : '';
    body.innerHTML = `<div class="gh-grid">${repos.map(repo => `
      <a class="gh-repo" href="${repo.html_url}" target="_blank" rel="noopener">
        <h4 class="gh-name">${escape(repo.name)}</h4>
        <p class="gh-desc">${escape(repo.description || 'No description provided.')}</p>
        <div class="gh-meta">
          <span class="lang">${escape(repo.language || 'Repo')}</span>
          <span>★ ${repo.stargazers_count || 0}</span>
          <span>${new Date(repo.updated_at).toLocaleDateString(undefined, { month: 'short', year: 'numeric' })}</span>
        </div>
      </a>`).join('')}</div>`;
  } catch (e) {
    body.innerHTML = `<p class="gh-empty">Couldn't reach GitHub right now.</p>`;
  }
}
loadGitHubFeed();

// Letter-by-letter section title reveal on first scroll-in
function wrapSectionTitleLetters() {
  document.querySelectorAll('.section-title').forEach(title => {
    if (title.dataset.wrapped) return;
    title.dataset.wrapped = '1';
    let charIdx = 0;
    function wrapNode(node) {
      if (node.nodeType === Node.TEXT_NODE) {
        const frag = document.createDocumentFragment();
        for (const ch of node.textContent) {
          if (ch === ' ') { frag.appendChild(document.createTextNode(' ')); continue; }
          const span = document.createElement('span');
          span.className = 'letter';
          span.style.transitionDelay = (charIdx++ * 28) + 'ms';
          span.textContent = ch;
          frag.appendChild(span);
        }
        node.parentNode.replaceChild(frag, node);
      } else if (node.nodeType === Node.ELEMENT_NODE) {
        // .accent uses background-clip:text for its gradient. Wrapping its
        // child characters with inline-block .letter spans destroys the
        // clip (children replace the parent's renderable text). So we
        // treat .accent as one atomic .letter unit instead.
        if (node.classList?.contains('accent')) {
          node.classList.add('letter');
          node.style.transitionDelay = (charIdx * 28) + 'ms';
          charIdx += (node.textContent || '').length;
          return;
        }
        Array.from(node.childNodes).forEach(wrapNode);
      }
    }
    Array.from(title.childNodes).forEach(wrapNode);
  });
}
wrapSectionTitleLetters();

const titleObs = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.classList.add('is-revealed');
      titleObs.unobserve(e.target);
    }
  });
}, { threshold: 0.4 });
document.querySelectorAll('.section-title').forEach(t => titleObs.observe(t));

// Tab title — reflects current planet
const BASE_TITLE = 'Mahir Nagersheth — CMU MISM • Goldman Sachs Engineering Summer Analyst';
function updateTabTitle(planetId) {
  const p = planetId && PLANET_BY_ID[planetId];
  document.title = p ? `Mahir · ${p.name}` : BASE_TITLE;
}
// Wrap setMode to also drive the tab title (preserves existing behaviour).
const _origSetModeForTitle = setMode;
setMode = function(newMode, planetId) {
  _origSetModeForTitle(newMode, planetId);
  updateTabTitle(newMode === 'planet' ? planetId : null);
};

// ============================================================
//  Deep-linkable subsections: URL hash includes section/subsection
//  Examples: #projects, #projects/data-analytics
// ============================================================
function updateHash(planetId, subIdx) {
  const p = planetId && PLANET_BY_ID[planetId];
  let hash = '';
  if (p) {
    hash = '#' + p.id;
    const sub = p.subsections?.[subIdx];
    if (sub) hash += '/' + sub.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
  }
  if (hash !== location.hash) history.replaceState(null, '', hash || location.pathname);
}
// Tick continuously while on a planet — cheap, idempotent.
(function deeplinkLoop() {
  if (mode === 'planet' && activePlanetId) {
    const p = PLANET_BY_ID[activePlanetId];
    updateHash(activePlanetId, Math.round(p?.smoothIdx || 0));
  } else if (mode === 'overview' && location.hash) {
    history.replaceState(null, '', location.pathname);
  }
  setTimeout(deeplinkLoop, 350);
})();
// Honor hash on initial load (after a brief moment so the scene is ready).
addEventListener('load', () => {
  setTimeout(() => {
    const m = location.hash.match(/^#([a-z-]+)(?:\/([a-z0-9-]+))?$/i);
    if (!m) return;
    const planetId = m[1];
    if (!PLANET_BY_ID[planetId]) return;
    const p = PLANET_BY_ID[planetId];
    let subIdx = 0;
    if (m[2] && p.subsections) {
      const slug = m[2];
      const found = p.subsections.findIndex(s =>
        s.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '') === slug
      );
      if (found >= 0) subIdx = found;
    }
    focusPlanet(planetId, true);
    // Scroll to the specific subsection card if requested
    if (subIdx > 0) {
      setTimeout(() => {
        const card = p.subsectionCards?.[subIdx];
        card?.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }, 900);
    }
  }, 600);
});

// Keyboard cheatsheet modal — press `?` to open
const cheatsheet = document.getElementById('cheatsheet');
function openCheatsheet() { cheatsheet?.removeAttribute('hidden'); }
function closeCheatsheet() { cheatsheet?.setAttribute('hidden', ''); }
document.getElementById('help-toggle')?.addEventListener('click', openCheatsheet);
document.getElementById('cs-close')?.addEventListener('click', closeCheatsheet);
cheatsheet?.querySelector('.cs-backdrop')?.addEventListener('click', closeCheatsheet);

// Extend the keyboard handler for `?` and `M` (audio)
addEventListener('keydown', e => {
  const tag = (e.target?.tagName || '').toLowerCase();
  if (tag === 'input' || tag === 'textarea' || e.metaKey || e.ctrlKey || e.altKey) return;
  if (e.key === '?' || (e.key === '/' && e.shiftKey)) {
    e.preventDefault();
    cheatsheet?.hasAttribute('hidden') ? openCheatsheet() : closeCheatsheet();
    return;
  }
  if (e.key === 'm' || e.key === 'M') {
    document.getElementById('audio-toggle')?.click();
    return;
  }
  if (e.key === 'Escape' && cheatsheet && !cheatsheet.hasAttribute('hidden')) {
    closeCheatsheet();
    // Don't fall through to the overview-focus Escape handler
    e.stopImmediatePropagation();
  }
});

// ============================================================
//  Ambient audio — Web Audio API drone with low-pass filter.
//  Muted by default. Toggle via the nav button or `M`.
// ============================================================
const audioBtn = document.getElementById('audio-toggle');
let audioCtx = null, audioGain = null, audioNodes = [];
function ensureAudio() {
  if (audioCtx) return;
  audioCtx = new (window.AudioContext || window.webkitAudioContext)();
  audioGain = audioCtx.createGain();
  audioGain.gain.value = 0;
  // Soft low-pass for warmth
  const lp = audioCtx.createBiquadFilter();
  lp.type = 'lowpass';
  lp.frequency.value = 600;
  audioGain.connect(lp);
  lp.connect(audioCtx.destination);
  // Three detuned drone oscillators — gentle cosmic chord
  [110, 165, 220].forEach((freq, i) => {
    const osc = audioCtx.createOscillator();
    osc.type = i === 0 ? 'sine' : 'triangle';
    osc.frequency.value = freq;
    const oscGain = audioCtx.createGain();
    oscGain.gain.value = i === 0 ? 0.35 : 0.22;
    // Slow LFO on each oscillator's volume for breath
    const lfo = audioCtx.createOscillator();
    const lfoGain = audioCtx.createGain();
    lfo.frequency.value = 0.07 + i * 0.04;
    lfoGain.gain.value = 0.08;
    lfo.connect(lfoGain);
    lfoGain.connect(oscGain.gain);
    lfo.start();
    osc.connect(oscGain);
    oscGain.connect(audioGain);
    osc.start();
    audioNodes.push(osc, lfo);
  });
}
audioBtn?.addEventListener('click', () => {
  ensureAudio();
  const on = audioBtn.getAttribute('aria-pressed') === 'true';
  audioBtn.setAttribute('aria-pressed', String(!on));
  if (audioCtx.state === 'suspended') audioCtx.resume();
  // Smooth fade — never click on/off
  const now = audioCtx.currentTime;
  audioGain.gain.cancelScheduledValues(now);
  audioGain.gain.setValueAtTime(audioGain.gain.value, now);
  audioGain.gain.linearRampToValueAtTime(on ? 0 : 0.18, now + 1.2);
});

// Skills constellation — hover-to-highlight related projects
{
  const projectCards = document.querySelectorAll('.project-card');
  function applyHighlight(tag) {
    projectCards.forEach(card => {
      const tags = (card.dataset.tags || '').split(/\s+/);
      const match = tag && tags.includes(tag);
      card.classList.toggle('skill-highlight', !!match);
      card.classList.toggle('skill-dim', !!tag && !match && !card.classList.contains('phase2'));
    });
  }
  document.querySelectorAll('.sc-chip').forEach(chip => {
    chip.addEventListener('mouseenter', () => applyHighlight(chip.dataset.tag));
    chip.addEventListener('mouseleave', () => applyHighlight(null));
    chip.addEventListener('focus',  () => applyHighlight(chip.dataset.tag));
    chip.addEventListener('blur',   () => applyHighlight(null));
  });
}

// Sun easter egg — click the sun-label 7 times for a meteor shower
{
  const sunEl = document.querySelector('.sun-label');
  if (sunEl) {
    let clicks = 0, resetTimer = null;
    sunEl.style.pointerEvents = 'auto';
    sunEl.style.cursor = 'pointer';
    sunEl.addEventListener('click', () => {
      clicks++;
      clearTimeout(resetTimer);
      resetTimer = setTimeout(() => { clicks = 0; }, 2500);
      if (clicks >= 7) {
        clicks = 0;
        spawnMeteorShower();
        console.log('%cMeteor shower unlocked! ⠂⠐⢂⠈ ⠠ ⠐⢀', 'color:#ffd166;font-size:14px;font-weight:bold');
      }
    });
  }
}

function spawnMeteorShower() {
  const SHOWER = 18;
  for (let i = 0; i < SHOWER; i++) {
    setTimeout(() => spawnMeteor(), i * 70);
  }
}
function spawnMeteor() {
  // Random start near the top of the scene's bounding sphere
  const startX = (Math.random() - 0.5) * 60;
  const startY = 12 + Math.random() * 8;
  const startZ = (Math.random() - 0.5) * 30 - 10;
  const dirX = (Math.random() - 0.5) * 2;
  const dirY = -1 - Math.random() * 0.5;
  const dirZ = (Math.random() - 0.5) * 2;
  const len = Math.sqrt(dirX*dirX + dirY*dirY + dirZ*dirZ);
  const speed = 24 + Math.random() * 14;
  const vel = new THREE.Vector3(dirX/len*speed, dirY/len*speed, dirZ/len*speed);
  const pos = new THREE.Vector3(startX, startY, startZ);

  // Trail line: two-vertex line whose tail follows the head with lag
  const trailPoints = [pos.clone(), pos.clone()];
  const geom = new THREE.BufferGeometry().setFromPoints(trailPoints);
  const mat = new THREE.LineBasicMaterial({
    color: 0xfff3cf, transparent: true, opacity: 0.95,
    blending: THREE.AdditiveBlending, depthWrite: false,
  });
  const line = new THREE.Line(geom, mat);
  scene.add(line);
  // Head dot
  const head = new THREE.Mesh(
    new THREE.SphereGeometry(0.08, 12, 12),
    new THREE.MeshBasicMaterial({ color: 0xffffff })
  );
  head.position.copy(pos);
  scene.add(head);

  const start = performance.now();
  const life = 2200;
  function step() {
    const elapsed = performance.now() - start;
    const t = elapsed / life;
    if (t >= 1) {
      scene.remove(line); scene.remove(head);
      geom.dispose(); mat.dispose(); head.geometry.dispose(); head.material.dispose();
      return;
    }
    const dt = 0.016;
    pos.x += vel.x * dt;
    pos.y += vel.y * dt;
    pos.z += vel.z * dt;
    head.position.copy(pos);
    // Trail tail lags behind the head
    trailPoints[0].lerp(pos, 0.18);
    trailPoints[1].copy(pos);
    geom.setFromPoints(trailPoints);
    geom.attributes.position.needsUpdate = true;
    mat.opacity = 0.95 * (1 - t);
    head.material.opacity = 1 - t;
    head.material.transparent = true;
    requestAnimationFrame(step);
  }
  step();
}

// Profile avatar — swap initials for ./avatar.jpg (or .png) when present
(function loadAvatarIfExists() {
  const slot = document.querySelector('.profile-avatar');
  if (!slot) return;
  // Try many common filenames so you can drop your photo in as whatever
  // name feels natural — case-insensitive thanks to most filesystems.
  const exts = ['png', 'jpg', 'jpeg', 'webp', 'PNG', 'JPG', 'JPEG'];
  const names = ['avatar', 'profile', 'me', 'mahir', 'headshot', 'photo'];
  const candidates = [];
  for (const n of names) for (const e of exts) candidates.push(`${n}.${e}`);
  let i = 0;
  function tryNext() {
    if (i >= candidates.length) return;       // none found — keep initials
    const test = new Image();
    test.onload = () => {
      const img = document.createElement('img');
      img.src = candidates[i];
      img.alt = 'Mahir Nagersheth';
      img.className = 'profile-photo';
      slot.querySelector('.profile-initials')?.remove();
      slot.appendChild(img);
    };
    test.onerror = () => { i++; tryNext(); };
    test.src = candidates[i];
  }
  tryNext();
})();

// Service worker registration (offline + installable)
if ('serviceWorker' in navigator) {
  addEventListener('load', () => {
    navigator.serviceWorker.register('sw.js').catch(() => { /* no-op offline */ });
  });
}

// ================================================================
//  FEATURES 1-12 — All new feature implementations
// ================================================================

// ── F1: Micro-animations — handled entirely in CSS ───────────────
// (breathing on .sl-name, typing-pulse on .now-date,
//  shimmer-sweep on .pl-tag — no JS needed)

// ── F2: Spacebar tour mode ───────────────────────────────────────
const TOUR_SEQUENCE = ['work','education','projects','piano','entrepreneurship','nonprofit','writing','contact'];
let tourActive = false, tourStep = 0, tourTimer = null;
const tourIndicatorEl = (() => {
  const el = document.createElement('div');
  el.className = 'tour-indicator';
  el.innerHTML = `<span>Auto-tour</span><div class="tour-progress-dots">${
    TOUR_SEQUENCE.map(() => '<div class="tour-dot"></div>').join('')
  }</div><span>Release Space to stop</span>`;
  document.body.appendChild(el);
  return el;
})();

function tourUpdateDots() {
  tourIndicatorEl.querySelectorAll('.tour-dot').forEach((d, i) => {
    d.classList.toggle('active', i === tourStep - 1);
  });
}
function tourStop() {
  tourActive = false; clearTimeout(tourTimer);
  tourIndicatorEl.classList.remove('active');
}
function tourAdvance() {
  if (!tourActive) return;
  if (tourStep >= TOUR_SEQUENCE.length) {
    tourTimer = setTimeout(() => { tourStop(); focusOverview(false); }, 4500);
    return;
  }
  focusPlanet(TOUR_SEQUENCE[tourStep], true);
  tourStep++;
  tourUpdateDots();
  tourTimer = setTimeout(tourAdvance, 5200);
}
function tourStart() {
  if (tourActive) return;
  tourActive = true; tourStep = 0;
  tourIndicatorEl.classList.add('active');
  tourAdvance();
}

addEventListener('keydown', e => {
  if (e.code !== 'Space') return;
  const tag = (e.target?.tagName || '').toLowerCase();
  if (tag === 'input' || tag === 'textarea') return;
  if (!document.getElementById('cheatsheet')?.hasAttribute('hidden')) return;
  if (!document.getElementById('search-palette')?.hasAttribute('hidden')) return;
  if (!document.getElementById('ask-panel')?.hasAttribute('hidden')) return;
  e.preventDefault();
  if (!tourActive) tourStart();
});
addEventListener('keyup', e => { if (e.code === 'Space' && tourActive) tourStop(); });

// ── F3: Per-section dynamic OG cards via Canvas API ─────────────
const ogCanvas = Object.assign(document.createElement('canvas'), { width: 1200, height: 630 });
const ogCtx = ogCanvas.getContext('2d');
const OG_META = {
  work:           { label: 'Work Experience',   sub: 'Goldman Sachs · Risk Division',        color: '#d6b25e' },
  education:      { label: 'Education',          sub: 'Carnegie Mellon MISM · PDEU',          color: '#c41e3a' },
  projects:       { label: 'Projects',           sub: 'ML · Deep Learning · Data Engineering', color: '#4a7ff5' },
  piano:          { label: 'Piano',              sub: 'Selected Performances',                color: '#b46be0' },
  entrepreneurship:{ label: 'Ventures',          sub: 'Founder Stories',                      color: '#4ad991' },
  nonprofit:      { label: 'Impact',             sub: 'TIDE Foundation · 7,000+ students',    color: '#4ed5cf' },
  writing:        { label: 'Notes & Writing',    sub: 'Long-form thoughts',                   color: '#9c8dc7' },
  contact:        { label: "Let's Talk",         sub: 'mnagersh@andrew.cmu.edu',               color: '#e0e0e0' },
};
function renderOGCard(sectionId) {
  const meta = OG_META[sectionId]; if (!meta) return;
  const ctx = ogCtx, W = 1200, H = 630;
  ctx.clearRect(0, 0, W, H);
  ctx.fillStyle = '#07080d'; ctx.fillRect(0, 0, W, H);
  const grd = ctx.createRadialGradient(W * 0.55, H * 0.45, 0, W * 0.55, H * 0.45, 480);
  grd.addColorStop(0, meta.color + '44'); grd.addColorStop(1, 'transparent');
  ctx.fillStyle = grd; ctx.fillRect(0, 0, W, H);
  ctx.textBaseline = 'middle';
  ctx.fillStyle = 'rgba(255,255,255,0.32)'; ctx.font = '500 20px sans-serif';
  ctx.fillText('MAHIR NAGERSHETH', 80, 230);
  ctx.fillStyle = '#fff'; ctx.font = 'bold 62px sans-serif';
  ctx.fillText(meta.label, 80, 305);
  ctx.fillStyle = 'rgba(255,255,255,0.58)'; ctx.font = '400 28px sans-serif';
  ctx.fillText(meta.sub, 80, 368);
  ctx.fillStyle = meta.color; ctx.fillRect(80, 425, 110, 4);
  const url = ogCanvas.toDataURL('image/png');
  document.querySelectorAll('meta[property="og:image"],meta[name="twitter:image"]')
    .forEach(m => m.setAttribute('content', url));
}
// Hook into setMode to update OG card whenever planet changes
const _smOG = setMode;
setMode = function(newMode, planetId) {
  _smOG(newMode, planetId);
  if (newMode === 'planet' && planetId) renderOGCard(planetId);
};

// ── F4: Changelog modal ──────────────────────────────────────────
const changelogModal = document.getElementById('changelog-modal');
function openChangelog()  { changelogModal?.removeAttribute('hidden'); }
function closeChangelog() { changelogModal?.setAttribute('hidden', ''); }
document.getElementById('footer-year')?.addEventListener('click', openChangelog);
document.getElementById('cl-close')?.addEventListener('click', closeChangelog);
changelogModal?.querySelector('.cl-backdrop')?.addEventListener('click', closeChangelog);
addEventListener('keydown', e => {
  if (e.key === 'Escape' && changelogModal && !changelogModal.hasAttribute('hidden')) {
    e.stopImmediatePropagation(); closeChangelog();
  }
});

// ── F5: YouTube inline hover/modal for piano cards ───────────────
function extractVideoId(href) {
  const m = href?.match(/(?:v=|\/shorts\/|youtu\.be\/)([A-Za-z0-9_-]{11})/);
  return m ? m[1] : null;
}
document.querySelectorAll('.piano-card').forEach(card => {
  const vid = extractVideoId(card.getAttribute('href') || '');
  if (!vid) return;
  const btn = Object.assign(document.createElement('button'), {
    type: 'button', className: 'yt-hover-btn', textContent: '▶ Play here',
  });
  btn.addEventListener('click', e => { e.preventDefault(); e.stopPropagation(); openYTModal(vid); });
  card.appendChild(btn);
});
const ytModal    = document.getElementById('yt-modal');
const ytIframe   = document.getElementById('yt-modal-iframe');
function openYTModal(vid) {
  if (ytIframe) ytIframe.src = `https://www.youtube-nocookie.com/embed/${vid}?autoplay=1&rel=0`;
  ytModal?.removeAttribute('hidden');
}
function closeYTModal() {
  if (ytIframe) ytIframe.src = '';
  ytModal?.setAttribute('hidden', '');
}
document.getElementById('yt-modal-backdrop')?.addEventListener('click', closeYTModal);
document.getElementById('yt-modal-close')?.addEventListener('click', closeYTModal);
addEventListener('keydown', e => {
  if (e.key === 'Escape' && ytModal && !ytModal.hasAttribute('hidden')) {
    e.stopImmediatePropagation(); closeYTModal();
  }
});

// ── F6: Ask Mahir — Claude-powered chat widget ───────────────────
const PORTFOLIO_SYSTEM = `You are a concise AI assistant for Mahir Nagersheth's portfolio. Answer questions about Mahir using only the facts below. Keep answers to 2-4 sentences. If a question goes beyond these facts, say you don't have that info and suggest emailing mnagersh@andrew.cmu.edu.

Facts:
- CMU MISM student (Business Intelligence & Data Analytics), graduating December 2026, Pittsburgh PA
- Incoming Goldman Sachs Engineering Summer Analyst, Risk Division, Dallas TX, June 2026
- Published IEEE researcher: "Leveraging ML for Predicting Vehicle Fuel Efficiency", ICONAT 2024
- Data Engineer at Rapidops Inc (Azure Data Factory, Synapse, Snowflake, Power BI, DAX, T-SQL)
- Built 13-agent LangGraph Agentic Portfolio Management System (Groq, Streamlit, SQLite, human-in-the-loop)
- Built Time-Adaptive Masked DiT + Optimal-Transport Flow for ImageNet-100 generation (PyTorch, FID eval)
- Credit Risk Prediction App (XGBoost, ExtraTrees, GridSearchCV, Streamlit)
- TIDE Foundation Project Manager: 85 volunteers, 14 schools, 20+ events, 7000+ students, raised ₹45,650
- Pianist who performs and posts on YouTube
- Languages: English, Hindi, Gujarati
- Skills: Python, SQL, Azure, Snowflake, LangGraph, LLM agents, PyTorch, TensorFlow, scikit-learn, XGBoost, Streamlit, BeautifulSoup, SSIS
- Contact: mnagersh@andrew.cmu.edu | linkedin.com/in/mahir-nagersheth | github.com/MahirNagersheth`;

const askBubble   = document.getElementById('ask-bubble');
const askPanel    = document.getElementById('ask-panel');
const askMessages = document.getElementById('ask-messages');
const askInput    = document.getElementById('ask-input');
const askSend     = document.getElementById('ask-send');

askBubble?.addEventListener('click', () => { askPanel?.removeAttribute('hidden'); askInput?.focus(); });
document.getElementById('ask-close')?.addEventListener('click', () => askPanel?.setAttribute('hidden', ''));

function appendAskMsg(text, role) {
  const d = Object.assign(document.createElement('div'), { className: `ask-msg ${role}`, textContent: text });
  askMessages?.appendChild(d);
  if (askMessages) askMessages.scrollTop = askMessages.scrollHeight;
  return d;
}
async function sendAskMessage() {
  const q = askInput?.value.trim(); if (!q) return;
  if (askInput) askInput.value = '';
  appendAskMsg(q, 'user');
  const typing = Object.assign(document.createElement('div'), { className: 'ask-msg assistant typing' });
  askMessages?.appendChild(typing);
  if (askMessages) askMessages.scrollTop = askMessages.scrollHeight;

  const workerUrl = window.ASK_WORKER_URL;
  if (!workerUrl) {
    typing.remove();
    appendAskMsg("AI responses aren't configured yet — reach Mahir directly at mnagersh@andrew.cmu.edu!", 'assistant');
    return;
  }
  try {
    const res = await fetch(workerUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        model: 'llama-3.1-8b-instant',
        messages: [
          { role: 'system', content: PORTFOLIO_SYSTEM },
          { role: 'user', content: q },
        ],
        max_tokens: 280,
        temperature: 0.7,
      }),
    });
    const data = await res.json();
    typing.remove();
    if (!res.ok) {
      console.error('[Ask Mahir] API error:', data);
      appendAskMsg("Couldn't reach the AI right now — try emailing Mahir at mnagersh@andrew.cmu.edu", 'assistant');
      return;
    }
    appendAskMsg(data.choices?.[0]?.message?.content || "Couldn't reach the AI right now.", 'assistant');
  } catch (err) {
    console.error('[Ask Mahir] fetch error:', err);
    typing.remove();
    appendAskMsg("Network error — try emailing Mahir at mnagersh@andrew.cmu.edu", 'assistant');
  }
}
askSend?.addEventListener('click', sendAskMessage);
askInput?.addEventListener('keydown', e => { if (e.key === 'Enter') sendAskMessage(); });

// ── F7: Live Credit Risk Playground ─────────────────────────────
function updateCreditRisk() {
  const income = +document.getElementById('cd-income')?.value || 65000;
  const loan   = +document.getElementById('cd-loan')?.value   || 15000;
  const emp    = +document.getElementById('cd-emp')?.value    || 5;
  const dti    = +document.getElementById('cd-dti')?.value    || 0.25;
  const hist   = +document.getElementById('cd-hist')?.value   || 7;

  const fmt = n => '$' + Math.round(n).toLocaleString();
  const el = id => document.getElementById(id);
  if (el('cd-income-val')) el('cd-income-val').textContent = fmt(income);
  if (el('cd-loan-val'))   el('cd-loan-val').textContent   = fmt(loan);
  if (el('cd-emp-val'))    el('cd-emp-val').textContent    = emp + (emp === 1 ? ' yr' : ' yrs');
  if (el('cd-dti-val'))    el('cd-dti-val').textContent    = dti.toFixed(2);
  if (el('cd-hist-val'))   el('cd-hist-val').textContent   = hist + (hist === 1 ? ' yr' : ' yrs');

  const ltiScore  = Math.min(1, (loan / income) / 0.5);
  const dtiScore  = Math.min(1, dti / 0.5);
  const empScore  = Math.max(0, 1 - emp / 25);
  const histScore = Math.max(0, 1 - hist / 20);
  const incScore  = 1 - Math.min(income, 200000) / 200000;
  const raw = 0.30 * ltiScore + 0.25 * dtiScore + 0.20 * empScore + 0.15 * histScore + 0.10 * incScore;
  const prob = Math.round(Math.max(2, Math.min(98, raw * 100)));

  if (el('cd-score')) el('cd-score').textContent = prob;
  const arc = el('cd-arc-fill');
  if (arc) {
    arc.setAttribute('stroke-dasharray', `${(prob / 100) * 173} ${173 - (prob / 100) * 173}`);
    arc.style.stroke = prob < 33 ? '#4ad991' : prob < 66 ? '#ffc850' : '#ff5555';
  }
  const rl = el('cd-risk-label');
  if (rl) {
    if (prob < 33)      { rl.textContent = 'Low Risk';    rl.className = 'cd-risk-label'; }
    else if (prob < 66) { rl.textContent = 'Medium Risk'; rl.className = 'cd-risk-label medium'; }
    else                { rl.textContent = 'High Risk';   rl.className = 'cd-risk-label high'; }
  }
  const fl = el('cd-factors');
  if (fl) {
    const factors = [
      { label: 'Loan-to-income',      v: ltiScore  },
      { label: 'Debt-to-income',      v: dtiScore  },
      { label: 'Employment history',  v: empScore  },
      { label: 'Credit history',      v: histScore },
    ].sort((a, b) => b.v - a.v);
    fl.innerHTML = factors.map(f =>
      `<li>${f.label}<div class="cd-factor-bar" style="width:${Math.round(f.v * 100)}%"></div></li>`
    ).join('');
  }
}
['cd-income','cd-loan','cd-emp','cd-dti','cd-hist'].forEach(id =>
  document.getElementById(id)?.addEventListener('input', updateCreditRisk)
);
updateCreditRisk();

// ── F8: Section background overlays (procedural + photo-ready) ───
// Drop real workspace photo paths into SECTION_BACKGROUNDS to activate.
// Empty arrays fall back to a subtle procedural planet-color radial.
const SECTION_BACKGROUNDS = {
  work: [], education: [], projects: [], piano: [],
  entrepreneurship: [], nonprofit: [], writing: [], contact: [],
};
PLANETS.forEach(p => {
  const sec = document.getElementById(p.id); if (!sec) return;
  const ov  = document.createElement('div');
  ov.className = 'section-bg-overlay';
  const imgs = SECTION_BACKGROUNDS[p.id] || [];
  if (imgs.length) {
    ov.style.cssText = `background-image:url(${imgs[0]});background-size:cover;background-position:center;opacity:0.05;`;
  } else {
    const hex = '#' + p.color.toString(16).padStart(6, '0');
    ov.style.cssText = `background:radial-gradient(ellipse 80% 60% at 65% 35%,${hex}1a,transparent);`;
  }
  sec.appendChild(ov);
});

// ── F9: Bookshelf — rendered via HTML, no extra JS needed ────────

// ── F10: Recommendations carousel ───────────────────────────────
(function() {
  const track = document.getElementById('reco-track');
  const dotsEl = document.getElementById('reco-dots');
  if (!track) return;
  const cards = [...track.querySelectorAll('.reco-card')];
  if (!cards.length) return;
  let cur = 0;
  cards[0].classList.add('reco-active');
  cards.forEach((_, i) => {
    const d = Object.assign(document.createElement('button'), {
      className: 'reco-dot' + (i === 0 ? ' active' : ''),
      type: 'button',
    });
    d.setAttribute('aria-label', `Recommendation ${i + 1}`);
    d.addEventListener('click', () => goTo(i));
    dotsEl?.appendChild(d);
  });
  function goTo(idx) {
    cards[cur].classList.remove('reco-active');
    dotsEl?.querySelectorAll('.reco-dot')[cur]?.classList.remove('active');
    cur = (idx + cards.length) % cards.length;
    cards[cur].classList.add('reco-active');
    dotsEl?.querySelectorAll('.reco-dot')[cur]?.classList.add('active');
  }
  setInterval(() => goTo(cur + 1), 5500);
})();

// ── F11: Cmd+K search palette ────────────────────────────────────
(function() {
  const palette = document.getElementById('search-palette');
  const spInput = document.getElementById('sp-input');
  const spList  = document.getElementById('sp-results');
  if (!palette || !spInput || !spList) return;

  // Build index
  const IDX = [];
  PLANETS.forEach(p => IDX.push({
    title: p.name, sub: p.sub,
    id: p.id, color: '#' + p.color.toString(16).padStart(6, '0'),
  }));
  document.querySelectorAll('.project-card h3').forEach(h => {
    const tags = h.closest('.project-card')?.dataset.tags || '';
    IDX.push({ title: h.textContent.trim(), sub: 'Project · ' + tags.split(' ').slice(0,3).join(', '), id: 'projects', color: '#4a7ff5' });
  });
  document.querySelectorAll('.work-role').forEach(h => {
    const co = h.closest('.work-card')?.querySelector('.work-company')?.textContent.replace(/\s+/g,' ').trim() || '';
    IDX.push({ title: h.textContent.trim(), sub: co, id: 'work', color: '#d6b25e' });
  });
  document.querySelectorAll('.sc-chip').forEach(c => {
    IDX.push({ title: c.textContent.trim(), sub: 'Skill', id: 'projects', color: '#4a7ff5' });
  });

  let focused = -1;

  function open()  { palette.removeAttribute('hidden'); spInput.value=''; focused=-1; render(''); spInput.focus(); }
  function close() { palette.setAttribute('hidden',''); }

  function render(q) {
    const lq = q.toLowerCase();
    const hits = !lq ? IDX.slice(0,8) : IDX.filter(x =>
      x.title.toLowerCase().includes(lq) || x.sub.toLowerCase().includes(lq)
    ).slice(0,8);
    focused = -1;
    if (!hits.length) { spList.innerHTML = `<li class="sp-empty">No results for "${q}"</li>`; return; }
    spList.innerHTML = hits.map((x, i) => `
      <li class="sp-result" data-i="${i}" role="option" tabindex="-1">
        <span class="sp-result-dot" style="background:${x.color}"></span>
        <span class="sp-result-text">
          <span class="sp-result-title">${x.title}</span>
          <span class="sp-result-sub">${x.sub}</span>
        </span>
        <kbd class="sp-result-kbd">↵</kbd>
      </li>`).join('');
    spList.querySelectorAll('.sp-result').forEach((el, i) => {
      el.addEventListener('click', () => { close(); focusPlanet(hits[i].id, true); });
      el.addEventListener('mouseenter', () => {
        spList.querySelectorAll('.sp-result').forEach(r => r.classList.remove('focused'));
        el.classList.add('focused'); focused = i;
      });
    });
  }

  spInput.addEventListener('input', () => render(spInput.value));
  spInput.addEventListener('keydown', e => {
    const items = [...spList.querySelectorAll('.sp-result')];
    if (e.key === 'ArrowDown') { e.preventDefault(); focused = Math.min(focused+1, items.length-1); }
    else if (e.key === 'ArrowUp') { e.preventDefault(); focused = Math.max(focused-1, 0); }
    else if (e.key === 'Enter' && focused >= 0) { items[focused].click(); return; }
    else if (e.key === 'Escape') { close(); return; }
    items.forEach((el, i) => el.classList.toggle('focused', i === focused));
    items[focused]?.scrollIntoView({ block:'nearest' });
  });
  palette.querySelector('.sp-backdrop')?.addEventListener('click', close);
  addEventListener('keydown', e => {
    if ((e.metaKey || e.ctrlKey) && (e.key === 'k' || e.key === 'K')) { e.preventDefault(); palette.hasAttribute('hidden') ? open() : close(); }
    if (e.key === 'Escape' && !palette.hasAttribute('hidden')) { e.stopImmediatePropagation(); close(); }
  });

  render('');
})();

// ── F12: Timezone-aware greeting in sun label ────────────────────
(function() {
  const nameEl = document.querySelector('.sun-label .sl-name');
  const subEl  = document.querySelector('.sun-label .sl-sub');
  if (!nameEl) return;

  const h = new Date().getHours();
  const greet = h < 5 ? 'Up late? Meet' : h < 12 ? 'Good morning — meet' : h < 17 ? 'Good afternoon — meet' : h < 21 ? 'Good evening — meet' : 'Good night — meet';
  nameEl.textContent = `${greet} Mahir`;

  if (subEl) {
    // Pittsburgh is UTC-4 (EDT) / UTC-5 (EST). Use live offset.
    const now = new Date();
    const pittsburgNow = new Date(now.toLocaleString('en-US', { timeZone: 'America/New_York' }));
    const pittH = pittsburgNow.getHours() + pittsburgNow.getMinutes() / 60;
    let note;
    if (pittH >= 9 && pittH < 23) {
      note = ' · 🟢 likely online now';
    } else {
      const hoursUntil = pittH < 9 ? 9 - pittH : 9 + (24 - pittH);
      note = ` · typically online in ~${Math.ceil(hoursUntil)}h`;
    }
    const span = document.createElement('span');
    span.className = 'sl-online-note';
    span.textContent = note;
    subEl.appendChild(span);
  }
})();

// ================================================================
//  FRIENDS & FAMILY — Planet 9 (live asteroid belt)
// ================================================================

// ── Jagged asteroid geometry ─────────────────────────────────────
function makeAsteroidGeo(radius, seed) {
  let s = ((seed | 0) * 9301 + 49297) % 233280;
  const rng = () => { s = (s * 9301 + 49297) % 233280; return s / 233280; };
  const geo = new THREE.IcosahedronGeometry(radius, 2);
  const pos = geo.attributes.position;
  for (let i = 0; i < pos.count; i++) {
    // Per-axis independent scale so the rock looks irregular
    const sx = 0.52 + rng() * 0.96, sy = 0.52 + rng() * 0.96, sz = 0.52 + rng() * 0.96;
    pos.setXYZ(i, pos.getX(i) * sx, pos.getY(i) * sy, pos.getZ(i) * sz);
  }
  pos.needsUpdate = true;
  geo.computeVertexNormals();
  return geo;
}

// ── Planet 9 definition ──────────────────────────────────────────
const FRIENDS_DEF = {
  id: 'friends', name: 'Friends & Family', sub: '',
  color: 0xffb347, emissive: 0x3d2200, orbit: 32.5, speed: 0.00052, size: 0.50,
  tilt: 0.16, startAngle: 0.85, inclination: { x: 0.10, z: -0.07 },
  texture: { style: 'rocky', base: '#3d2200', mid: '#d97c20', accent: '#ffe0a0', seed: 199 },
  moons: [], subsections: [],
  activeSubsectionIdx: 0, smoothIdx: 0,
  sectionActive: false, activityT: 0, subsectionCards: [],
};
PLANETS.push(FRIENDS_DEF);
PLANET_BY_ID['friends'] = FRIENDS_DEF;
const FP = FRIENDS_DEF;

// Update tour + keyboard map to include Friends
if (typeof TOUR_SEQUENCE !== 'undefined') {
  const cIdx = TOUR_SEQUENCE.indexOf('contact');
  if (cIdx >= 0) TOUR_SEQUENCE.splice(cIdx, 0, 'friends');
  else TOUR_SEQUENCE.push('friends');
}
if (typeof KEY_TO_PLANET !== 'undefined') {
  const cIdx2 = KEY_TO_PLANET.indexOf('contact');
  if (cIdx2 >= 0) KEY_TO_PLANET.splice(cIdx2, 0, 'friends');
  else KEY_TO_PLANET.push('friends');
}
// Add Friends to OG meta card map
if (typeof OG_META !== 'undefined') {
  OG_META.friends = { label: 'Friends & Family', sub: 'People who make it worth doing', color: '#ffb347' };
}

// ── Build the planet's Three.js objects ─────────────────────────
(function buildFriendsPlanet() {
  const p = FP;
  const scale = innerWidth < 720 ? 0.62 : innerWidth < 1100 ? 0.82 : 1;

  const incl = new THREE.Group();
  incl.rotation.x = p.inclination.x;
  incl.rotation.z = p.inclination.z;
  scene.add(incl);
  p.inclinationGroup = incl;

  const pivot = new THREE.Group();
  pivot.rotation.y = p.startAngle;
  incl.add(pivot);
  p.pivot = pivot;

  const pg = new THREE.Group();
  pg.position.set(p.orbit * scale, 0, 0);
  pg.rotation.z = p.tilt;
  pivot.add(pg);
  p.group = pg;

  const surfMap = generatePlanetTexture(p.texture);
  surfMap.wrapS = THREE.RepeatWrapping;
  surfMap.wrapT = THREE.ClampToEdgeWrapping;
  surfMap.anisotropy = renderer.capabilities.getMaxAnisotropy?.() || 4;

  const mat = new THREE.MeshStandardMaterial({
    map: surfMap, color: 0xffffff,
    emissive: p.emissive, emissiveIntensity: 0.18,
    roughness: 0.58, metalness: 0.12,
  });
  const mesh = new THREE.Mesh(new THREE.SphereGeometry(p.size, 48, 48), mat);
  pg.add(mesh);
  p.mesh = mesh; p.material = mat;

  const halo = new THREE.Mesh(
    new THREE.SphereGeometry(p.size * 1.18, 32, 32),
    new THREE.MeshBasicMaterial({ color: p.color, transparent: true, opacity: 0.10, blending: THREE.AdditiveBlending, depthWrite: false })
  );
  pg.add(halo); p.halo = halo;

  // Orbit guide ring
  const orbitR = p.orbit;
  const og = new THREE.RingGeometry(orbitR - 0.018, orbitR + 0.018, 256);
  og.rotateX(-Math.PI / 2);
  const orbitLine = new THREE.Mesh(og, new THREE.MeshBasicMaterial({
    color: p.color, transparent: true, opacity: 0.18, side: THREE.DoubleSide, depthWrite: false,
  }));
  incl.add(orbitLine);
  p.orbitLine = orbitLine;

  // HTML planet label
  const hex = '#' + p.color.toString(16).padStart(6, '0');
  const lEl = document.createElement('button');
  lEl.type = 'button'; lEl.className = 'planet-label'; lEl.dataset.target = p.id;
  lEl.style.setProperty('--planet-color', hex);
  lEl.style.setProperty('--planet-color-glow', `rgba(${(p.color>>16)&255},${(p.color>>8)&255},${p.color&255},0.45)`);
  lEl.innerHTML = `<span class="pl-name">${p.name}</span><span class="pl-tag">${p.sub}</span>`;
  lEl.addEventListener('mouseenter', () => setHover(p.id));
  lEl.addEventListener('mouseleave', () => setHover(null));
  lEl.addEventListener('focus', () => setHover(p.id));
  lEl.addEventListener('blur', () => setHover(null));
  lEl.addEventListener('click', () => focusPlanet(p.id, true));
  labelsRoot.appendChild(lEl);
  p.label = lEl;

  p.titleEl = document.querySelector('#friends .section-title');

  // Register with section + reveal observers
  const secEl = document.getElementById('friends');
  if (secEl) { sectionObs.observe(secEl); }
  secEl?.querySelectorAll('.reveal').forEach(el => revealObs.observe(el));
})();

// ── Background asteroid belt (30 static gray rocks) ─────────────
// ── Named asteroid helper ────────────────────────────────────────
const FRIEND_COLORS = [0xffb347, 0xffd166, 0xff8c69, 0xffa07a, 0xffcc80, 0xf4c842, 0xffe0a0];
let friendAsteroidCount = 0;

function addNamedAsteroid(data) {
  const p = FP;
  const idx  = friendAsteroidCount++;
  const seed = ((data.timestamp || Date.now()) % 9999) + idx * 17;

  let s2 = seed;
  const rng2 = () => { s2 = (s2 * 9301 + 49297) % 233280; return s2 / 233280; };

  const orbitR = 0.65 + rng2() * 1.85;
  const speed  = (0.003 + rng2() * 0.006) * (idx % 2 === 0 ? 1 : -1);
  const size   = 0.07 + rng2() * 0.06;
  const tilt   = (rng2() - 0.5) * 1.0;
  const col    = FRIEND_COLORS[idx % FRIEND_COLORS.length];

  const incl = new THREE.Group(); incl.rotation.x = tilt; p.group.add(incl);
  // Golden-angle distribution for even spread
  const piv  = new THREE.Group();
  piv.rotation.y = (idx * 2.399963) % (Math.PI * 2);
  incl.add(piv);

  const mesh = new THREE.Mesh(
    makeAsteroidGeo(size, seed + 100),
    new THREE.MeshStandardMaterial({ color: col, emissive: col, emissiveIntensity: 0.30, roughness: 0.75, metalness: 0.15 })
  );
  mesh.position.set(orbitR, 0, 0);
  mesh.rotation.set(rng2() * Math.PI, rng2() * Math.PI, 0);
  piv.add(mesh);

  // Subtle orbit ring (same color, visible when planet is active)
  const lineGeo = new THREE.RingGeometry(orbitR - 0.005, orbitR + 0.005, 64);
  lineGeo.rotateX(-Math.PI / 2);
  const lineMesh = new THREE.Mesh(lineGeo, new THREE.MeshBasicMaterial({
    color: col, transparent: true, opacity: 0.08, side: THREE.DoubleSide, depthWrite: false,
  }));
  incl.add(lineMesh);

  // HTML overlay label
  const lbl = document.createElement('div');
  lbl.className = 'asteroid-label';
  lbl.innerHTML = `<span class="al-emoji">${data.emoji || '⭐'}</span><span class="al-name">${escFriendHtml(data.name)}</span>`;
  lbl.style.visibility = 'hidden';
  labelsRoot.appendChild(lbl);

  p.moons.push({ pivot: piv, mesh, line: lineMesh, speed, name: data.name, labelEl: lbl });

  // Spawn particle burst
  spawnAsteroidBurst(p.group, orbitR, col);
}

function escFriendHtml(s) {
  return String(s || '').replace(/[<>&"]/g, c => ({'<':'&lt;','>':'&gt;','&':'&amp;','"':'&quot;'}[c]));
}

// ── Particle burst when a new asteroid is added ──────────────────
function spawnAsteroidBurst(parentGroup, orbitR, color) {
  const PARTS = 8;
  for (let i = 0; i < PARTS; i++) {
    const angle = (i / PARTS) * Math.PI * 2;
    const sp = Object.assign(new THREE.Mesh(
      new THREE.SphereGeometry(0.015, 4, 4),
      new THREE.MeshBasicMaterial({ color, transparent: true, opacity: 1 })
    ));
    const startPos = new THREE.Vector3(Math.cos(angle) * orbitR, 0, Math.sin(angle) * orbitR);
    const vel = new THREE.Vector3(
      (Math.random() - 0.5) * 0.08,
      (Math.random() - 0.5) * 0.08,
      (Math.random() - 0.5) * 0.08
    );
    sp.position.copy(startPos);
    parentGroup.add(sp);
    const t0 = performance.now();
    (function step() {
      const t = (performance.now() - t0) / 900;
      if (t >= 1) { parentGroup.remove(sp); sp.geometry.dispose(); sp.material.dispose(); return; }
      sp.position.addScaledVector(vel, 0.016);
      sp.material.opacity = 1 - t;
      requestAnimationFrame(step);
    })();
  }
}

// ── Project asteroid labels onto screen each frame ───────────────
const _friendsTmpVec = new THREE.Vector3();
(function projectAsteroidLabels() {
  const p = FP;
  if (p && p.moons && camera && renderer) {
    const isActive = (typeof mode !== 'undefined') && mode === 'planet' && activePlanetId === 'friends';
    p.moons.forEach(m => {
      if (!m.labelEl) return;
      if (!isActive) { m.labelEl.style.display = 'none'; return; }
      m.labelEl.style.display = '';
      m.mesh.getWorldPosition(_friendsTmpVec);
      _friendsTmpVec.project(camera);
      const onScreen = _friendsTmpVec.z < 1 && _friendsTmpVec.z > -1;
      m.labelEl.style.left = `${(_friendsTmpVec.x * 0.5 + 0.5) * innerWidth}px`;
      m.labelEl.style.top  = `${(-_friendsTmpVec.y * 0.5 + 0.5) * innerHeight - 28}px`;
      m.labelEl.style.visibility = onScreen ? 'visible' : 'hidden';
    });
  }
  requestAnimationFrame(projectAsteroidLabels);
})();

// ── Friends data layer: Firebase (live) or localStorage (local) ──
const FRIENDS_DB_PATH = 'portfolio-friends-v1/asteroids';
const FRIENDS_LS_KEY  = 'mn-friends-asteroids-v1';
const ADDED_SELF_KEY  = 'mn-friends-added-self';

let friendsDbRef = null;  // Firebase ref if connected

function updateFriendsUI(data) {
  // Add to 3D scene
  addNamedAsteroid(data);

  // Add card to DOM grid
  const grid = document.getElementById('friends-grid');
  if (grid) {
    const card = document.createElement('div');
    card.className = 'asteroid-entry';
    const relTime = data.timestamp
      ? new Intl.RelativeTimeFormat('en', { numeric: 'auto' }).format(
          -Math.round((Date.now() - data.timestamp) / 60000), 'minutes')
      : '';
    card.innerHTML = `
      <span class="ae-emoji">${escFriendHtml(data.emoji || '⭐')}</span>
      <strong class="ae-name">${escFriendHtml(data.name)}</strong>
      ${data.message ? `<p class="ae-message">${escFriendHtml(data.message)}</p>` : ''}
      <span class="ae-time">${relTime}</span>`;
    grid.prepend(card);
    revealObs.observe(card);
  }

  // Update counter
  const numEl = document.getElementById('friends-count');
  if (numEl) numEl.textContent = friendAsteroidCount;
}

function initFirebaseFriends() {
  try {
    if (!firebase.apps.length) firebase.initializeApp(window.FIREBASE_CONFIG);
    const db  = firebase.database();
    friendsDbRef = db.ref(FRIENDS_DB_PATH);
    const statusEl = document.getElementById('friends-db-status');
    if (statusEl) { statusEl.classList.add('live'); statusEl.querySelector('.fsb-status-text').textContent = 'Live'; }

    // Listen for new entries (child_added fires for existing + future)
    friendsDbRef.on('child_added', snap => {
      const d = snap.val(); if (!d || !d.name) return;
      d._key = snap.key;
      updateFriendsUI(d);
    });
  } catch (e) {
    console.warn('[Friends] Firebase init failed:', e);
    initLocalFriends();
  }
}

function initLocalFriends() {
  const statusEl = document.getElementById('friends-db-status');
  if (statusEl) { statusEl.classList.add('local'); statusEl.querySelector('.fsb-status-text').textContent = 'Local only'; }
  document.getElementById('friends-setup-notice')?.removeAttribute('hidden');

  // Load from localStorage
  const saved = JSON.parse(localStorage.getItem(FRIENDS_LS_KEY) || '[]');
  saved.forEach(d => updateFriendsUI(d));
}

async function submitFriendAsteroid(data) {
  if (friendsDbRef) {
    await friendsDbRef.push(data);
    // Firebase child_added will fire and call updateFriendsUI automatically
  } else {
    // Local: update manually
    const saved = JSON.parse(localStorage.getItem(FRIENDS_LS_KEY) || '[]');
    saved.push(data);
    localStorage.setItem(FRIENDS_LS_KEY, JSON.stringify(saved));
    updateFriendsUI(data);
  }
}

// Start — load Firebase SDK dynamically if config present
(function startFriendsLayer() {
  if (window.FIREBASE_CONFIG && window.FIREBASE_CONFIG.databaseURL) {
    // Dynamically load Firebase compat SDK
    const s1 = document.createElement('script');
    s1.src = 'https://www.gstatic.com/firebasejs/10.12.0/firebase-app-compat.js';
    s1.onload = () => {
      const s2 = document.createElement('script');
      s2.src = 'https://www.gstatic.com/firebasejs/10.12.0/firebase-database-compat.js';
      s2.onload = initFirebaseFriends;
      s2.onerror = initLocalFriends;
      document.head.appendChild(s2);
    };
    s1.onerror = initLocalFriends;
    document.head.appendChild(s1);
  } else {
    initLocalFriends();
  }
})();

// ── "Add yourself" modal logic ───────────────────────────────────
function openAddSelfModal() { document.getElementById('add-self-modal')?.removeAttribute('hidden'); document.getElementById('add-self-name')?.focus(); }
function closeAddSelfModal() { document.getElementById('add-self-modal')?.setAttribute('hidden', ''); }

document.getElementById('friends-add-btn')?.addEventListener('click', openAddSelfModal);
document.getElementById('asm-close')?.addEventListener('click', closeAddSelfModal);
document.getElementById('asm-backdrop')?.addEventListener('click', closeAddSelfModal);

// Emoji picker
document.querySelectorAll('.emoji-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.emoji-btn').forEach(b => b.classList.remove('selected'));
    btn.classList.add('selected');
  });
});

document.getElementById('add-self-form')?.addEventListener('submit', async e => {
  e.preventDefault();
  const name = document.getElementById('add-self-name')?.value.trim();
  if (!name) { document.getElementById('add-self-name')?.focus(); return; }

  const emoji   = document.querySelector('.emoji-btn.selected')?.dataset.emoji || '⭐';
  const message = (document.getElementById('add-self-msg')?.value || '').trim();

  const submitBtn  = document.getElementById('add-self-submit');
  const submitText = submitBtn?.querySelector('.asm-submit-text');
  const submitLoad = submitBtn?.querySelector('.asm-submit-loading');

  if (submitBtn) submitBtn.disabled = true;
  if (submitText) submitText.hidden = true;
  if (submitLoad) submitLoad.hidden = false;

  try {
    await submitFriendAsteroid({ name, emoji, message, timestamp: Date.now() });
    closeAddSelfModal();
    localStorage.setItem(ADDED_SELF_KEY, '1');

    // Toast
    const toast = document.createElement('div');
    toast.className = 'friend-toast';
    toast.textContent = `${emoji} ${name} joined the asteroid belt!`;
    document.body.appendChild(toast);
    setTimeout(() => toast.classList.add('visible'), 10);
    setTimeout(() => { toast.classList.remove('visible'); setTimeout(() => toast.remove(), 400); }, 3500);

    // Reset form
    if (document.getElementById('add-self-name')) document.getElementById('add-self-name').value = '';
    if (document.getElementById('add-self-msg'))  document.getElementById('add-self-msg').value = '';
    document.querySelectorAll('.emoji-btn').forEach((b, i) => b.classList.toggle('selected', i === 0));
  } catch (err) {
    console.error('[Friends] submit failed:', err);
  } finally {
    if (submitBtn) submitBtn.disabled = false;
    if (submitText) submitText.hidden = false;
    if (submitLoad) submitLoad.hidden = true;
  }
});

// Escape key closes the modal
addEventListener('keydown', e => {
  if (e.key === 'Escape' && document.getElementById('add-self-modal') && !document.getElementById('add-self-modal').hasAttribute('hidden')) {
    e.stopImmediatePropagation(); closeAddSelfModal();
  }
});

// ── First-visit welcome prompt (fires once per device) ───────────
let _friendsVisited = false;
const _friendsSecEl = document.getElementById('friends');
if (_friendsSecEl) {
  new IntersectionObserver(entries => {
    if (!_friendsVisited && entries.some(e => e.isIntersecting)) {
      _friendsVisited = true;
      if (!localStorage.getItem(ADDED_SELF_KEY)) {
        setTimeout(openAddSelfModal, 1600);
      }
    }
  }, { threshold: 0.35 }).observe(_friendsSecEl);
}

// ---------- Spotify now-playing ----------
(function () {
  const workerUrl = window.ASK_WORKER_URL;
  if (!workerUrl) return;
  const card = document.getElementById('spotify-now');
  if (!card) return;

  async function fetchNow() {
    try {
      const res = await fetch(workerUrl + '/spotify');
      if (!res.ok) { console.warn('[Spotify] Worker responded', res.status); return; }
      const d = await res.json();
      console.log('[Spotify]', d);
      if (d.track) {
        const art = document.getElementById('sp-art');
        art.src = d.albumArt || '';
        art.alt = d.album || '';
        document.getElementById('sp-track').textContent = d.track;
        document.getElementById('sp-artist').textContent = d.artist || '';
        document.getElementById('sp-link').href = d.url || '#';
        card.dataset.paused = String(!d.playing);
        card.classList.remove('hidden');
      } else {
        card.classList.add('hidden');
      }
    } catch (_) {}
  }

  fetchNow();
  setInterval(fetchNow, 30000);
})();
