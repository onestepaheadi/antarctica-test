
let helfer = null;
function helfer_holen() {
  if (helfer) return helfer;
  const code = `onmessage = async e => {
    try {
      const aus = await Promise.all(e.data.bloecke.map(b => new Response(new Blob([b]).stream().pipeThrough(new DecompressionStream('deflate'))).arrayBuffer()));
      postMessage({ nr: e.data.nr, aus }, aus);
    } catch (f) { postMessage({ nr: e.data.nr, fehler: String(f) }); }
  };`;
  const url = URL.createObjectURL(new Blob([code], { type: 'text/javascript' }));
  const zahl = Math.max(2, Math.min(8, navigator.hardwareConcurrency || 4));
  helfer = { liste: Array.from({ length: zahl }, () => new Worker(url)), nr: 0 };
  return helfer;
}
export function schlafen(ms) { return new Promise(ok => setTimeout(ok, ms)); }
export function naechstes_bild() { return new Promise(ok => requestAnimationFrame(() => setTimeout(ok, 0))); }
export function zlib_da() { return typeof DecompressionStream === 'function' && typeof Worker === 'function'; }
export function zlib_entpacken(liste) {
  const h = helfer_holen(), n = h.liste.length;
  const gruppen = h.liste.map(() => ({ nr: ++h.nr, bloecke: [], stellen: [] }));
  liste.forEach((b, i) => { const g = gruppen[i % n]; g.bloecke.push(b); g.stellen.push(i); });
  return Promise.all(gruppen.map((g, k) => g.bloecke.length === 0 ? [] : new Promise((ok, fehler) => {
    const w = h.liste[k];
    const hoeren = e => { if (e.data.nr !== g.nr) return; w.removeEventListener('message', hoeren); e.data.fehler ? fehler(new Error(e.data.fehler)) : ok(e.data.aus); };
    w.addEventListener('message', hoeren);
    w.postMessage({ nr: g.nr, bloecke: g.bloecke }, g.bloecke.map(b => b.buffer));
  }))).then(teile => { const aus = new Array(liste.length); gruppen.forEach((g, k) => g.stellen.forEach((s, j) => { aus[s] = teile[k][j]; })); return aus; });
}