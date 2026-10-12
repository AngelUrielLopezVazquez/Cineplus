const FILAS = 'ABCDEF', COLS = 8;
let fun = obtener('funcionActual', {}), asientos = [];
const ahora = new Date();
const hoy = new Date(ahora - ahora.getTimezoneOffset() * 6e4).toISOString().slice(0, 10);

// Asientos "ya vendidos" de forma repetible para cada función
function ocupadosBase(clave) {
  let h = 0;
  for (const c of clave) h = (h * 31 + c.charCodeAt(0)) >>> 0;
  return [...FILAS].flatMap((f, i) => [...Array(COLS)].map((_, j) => ({ id: f + (j + 1), j })).filter((a) => (h + i * 7 + a.j * 13) % 6 === 0).map((a) => a.id));
}

function generar() {
  const f = $('fecha').value, h = $('hora').value, k = `${fun.pelicula}|${f}|${h}`;
  $('aviso').innerHTML = '';
  $('mapa').innerHTML = '';
  if (!f || new Date(`${f}T${h}`) < new Date()) {
    alerta('aviso', 'La fecha y hora de la función no pueden ser pasadas.');
    guardar('asientosSeleccionados', []);
    return resumen([]);
  }
  const ocupados = [...ocupadosBase(k), ...(obtener('ocupados', {})[k] || [])];
  const mismaFuncion = fun.fecha === f && fun.hora === h;
  const elegidos = mismaFuncion ? obtener('asientosSeleccionados').map((a) => a.id) : [];
  fun = { ...fun, fecha: f, hora: h };
  guardar('funcionActual', fun);
  if (!mismaFuncion) guardar('asientosSeleccionados', []);

  asientos = [...FILAS].flatMap((fila) => [...Array(COLS)].map((_, j) => {
    const id = fila + (j + 1);
    return { id, fila, numero: j + 1, estado: ocupados.includes(id) ? 'ocupado' : elegidos.includes(id) ? 'seleccionado' : 'libre' };
  }));
  $('mapa').innerHTML = [...FILAS].map((fila) => `<div class="fila"><b>${fila}</b>${asientos.filter((a) => a.fila === fila)
    .map((a) => `<button class="seat ${a.estado}" data-id="${a.id}" aria-label="Asiento ${a.id}" ${a.estado === 'ocupado' ? 'disabled' : ''}></button>`).join('')}</div>`).join('');
  resumen(asientos.filter((a) => a.estado === 'seleccionado'));
}

function seleccionarAsiento(id) {
  const a = asientos.find((x) => x.id === id);
  if (a.estado === 'ocupado') return;
  a.estado = a.estado === 'seleccionado' ? 'libre' : 'seleccionado';
  const sel = asientos.filter((x) => x.estado === 'seleccionado');
  guardar('asientosSeleccionados', sel);
  resumen(sel);
  return a.estado;
}

function resumen(sel) {
  $('resumen').textContent = sel.length ? sel.map((a) => a.id).join(', ') : '—';
  $('total').textContent = '$' + sel.length * PRECIO;
  $('btnCarrito').classList.toggle('disabled', !sel.length);
}

if (!fun.pelicula) {
  $('panel').classList.add('d-none');
  $('aviso').innerHTML = '<div class="alert alert-warning">Primero elige una película en la <a href="index.html">cartelera</a>.</div>';
} else {
  $('peli').textContent = fun.pelicula;
  $('fecha').min = hoy;
  $('fecha').value = fun.fecha || hoy;
  if (fun.hora) $('hora').value = fun.hora;
  $('fecha').onchange = $('hora').onchange = generar;
  $('mapa').onclick = (e) => {
    const b = e.target.closest('button');
    if (b) b.className = 'seat ' + (seleccionarAsiento(b.dataset.id) || 'libre');
  };
  generar();
}
