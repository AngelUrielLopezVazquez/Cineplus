const fun = obtener('funcionActual', {});
const sel = obtener('asientosSeleccionados');
let cupon = obtener('cupon', '');

function calcular() {
  const subtotal = sel.length * (fun.precioBoleto || PRECIO);
  const descuento = Object.hasOwn(CUPONES, cupon) ? subtotal * CUPONES[cupon] : 0;
  return { subtotal, descuento, total: subtotal - descuento };
}
const fechaMX = (f) => f.split('-').reverse().join('/');

function pintar() {
  const { subtotal, descuento, total } = calcular();
  $('lista').innerHTML = sel.length ? `<table class="table table-dark align-middle"><thead><tr><th>Película</th><th>Función</th><th>Asiento</th><th class="text-end">Precio</th></tr></thead><tbody>
    ${sel.map((a) => `<tr><td>${fun.pelicula}</td><td>${fechaMX(fun.fecha)} ${fun.hora}</td><td>${a.id}</td><td class="text-end">$${fun.precioBoleto}</td></tr>`).join('')}</tbody></table>`
    : '<p class="text-secondary">Tu carrito está vacío. <a href="funciones.html">Elige tus asientos</a>.</p>';
  $('totales').innerHTML = `Subtotal: $${subtotal.toFixed(2)}<br>Descuento: −$${descuento.toFixed(2)}<br><strong class="fs-5">Total: $${total.toFixed(2)}</strong>`;
  $('btnConfirmar').disabled = !sel.length;
}

function historial() {
  const c = obtener('compras');
  $('historial').innerHTML = c.length ? `<table class="table table-dark"><thead><tr><th>Película</th><th>Función</th><th>Asientos</th><th class="text-end">Total</th></tr></thead><tbody>
    ${c.map((x) => `<tr><td>${x.pelicula}</td><td>${fechaMX(x.fecha)} ${x.hora}</td><td>${x.asientos.join(', ')}</td><td class="text-end">$${x.total.toFixed(2)}</td></tr>`).join('')}</tbody></table>`
    : '<p class="text-secondary">Aún no hay compras.</p>';
}

$('btnCupon').onclick = () => {
  const c = $('cupon').value.trim().toUpperCase();
  if (Object.hasOwn(CUPONES, c)) { cupon = c; alerta('aviso', `Cupón ${c} aplicado.`, 'success'); }
  else { cupon = ''; if (c) alerta('aviso', 'Cupón inválido.'); }
  guardar('cupon', cupon);
  pintar();
};

$('btnConfirmar').onclick = () => {
  if (!sel.length) return alerta('aviso', 'No puedes confirmar una compra con el carrito vacío.');
  if (new Date(`${fun.fecha}T${fun.hora}`) < new Date()) return alerta('aviso', 'La función ya pasó. Elige otra desde Funciones.');
  const clave = `${fun.pelicula}|${fun.fecha}|${fun.hora}`, ocupados = obtener('ocupados', {});
  if (sel.some((a) => (ocupados[clave] || []).includes(a.id))) return alerta('aviso', 'Algún asiento ya fue comprado. Vuelve a elegir.');

  const compra = { id: Date.now(), pelicula: fun.pelicula, fecha: fun.fecha, hora: fun.hora, asientos: sel.map((a) => a.id), cupon, total: calcular().total };
  guardar('compras', [...obtener('compras'), compra]);
  ocupados[clave] = [...(ocupados[clave] || []), ...compra.asientos];
  guardar('ocupados', ocupados);   // los asientos comprados quedan ocupados para esa función
  guardar('asientosSeleccionados', []);
  guardar('cupon', '');
  exportarBoletosTxt(compra);
  alerta('aviso', `¡Compra confirmada! Se descargó boletos_${compra.id}.txt.`, 'success');
  sel.length = 0; cupon = '';
  pintar(); historial();
};

// Respaldo legible: Blob + URL.createObjectURL
function exportarBoletosTxt(compra) {
  let t = 'Comprobante de compra - CinePlus\n';
  t += `Generado: ${new Date().toLocaleString('es-MX')}\n` + '='.repeat(40) + '\n\n';
  t += `Folio: ${compra.id}\n`;
  t += `Película: ${compra.pelicula}\nFunción: ${fechaMX(compra.fecha)} ${compra.hora}\nAsientos: ${compra.asientos.join(', ')}\n`;
  if (compra.cupon) t += `Cupón aplicado: ${compra.cupon}\n`;
  t += '-'.repeat(40) + `\nTOTAL: $${compra.total.toFixed(2)}\n`;
  const url = URL.createObjectURL(new Blob([t], { type: 'text/plain' }));
  const a = document.createElement('a');
  a.href = url; a.download = `boletos_${compra.id}.txt`;
  document.body.appendChild(a); a.click(); document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

pintar();
historial();
