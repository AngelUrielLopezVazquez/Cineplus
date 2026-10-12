let genero = 'Todas', texto = '', actual = null;
const generos = ['Todas', ...new Set(PELICULAS.map((p) => p.genero))];
const modal = new bootstrap.Modal($('modalPelicula'));

$('filtros').innerHTML = generos.map((g) => `<button class="btn btn-hora ${g === genero ? 'active' : ''}" data-g="${g}">${g}</button>`).join('');
$('filtros').onclick = (e) => {
  const b = e.target.closest('button');
  if (!b) return;
  genero = b.dataset.g;
  [...$('filtros').children].forEach((x) => x.classList.toggle('active', x === b));
  pintar();
};
$('buscar').oninput = (e) => { texto = e.target.value.toLowerCase(); pintar(); };

function pintar() {
  const lista = PELICULAS.filter((p) => (genero === 'Todas' || p.genero === genero) && p.titulo.toLowerCase().includes(texto));
  $('peliculas').innerHTML = lista.length ? lista.map((p) => `
    <div class="col"><article class="card h-100">
      <img src="${p.poster}" class="card-img-top" alt="Póster de ${p.titulo}">
      <div class="card-body d-flex flex-column">
        <h2 class="h5">${p.titulo}</h2>
        <span class="badge mb-3 align-self-start">${p.genero} · ${p.duracion}</span>
        <div class="mt-auto d-grid gap-2">
          <button class="btn btn-outline-light btn-sm" data-ver="${p.id}"><i class="bi bi-play-circle"></i> Sinopsis y tráiler</button>
          <button class="btn btn-warning btn-sm" data-elegir="${p.id}"><i class="bi bi-ticket-perforated"></i> Elegir función</button>
        </div>
      </div>
    </article></div>`).join('') : '<p class="text-secondary">No hay películas con ese filtro.</p>';
}

$('peliculas').onclick = (e) => {
  const b = e.target.closest('button');
  if (!b) return;
  if (b.dataset.elegir) return elegir(Number(b.dataset.elegir));
  actual = PELICULAS.find((p) => p.id === Number(b.dataset.ver));
  $('mTitulo').textContent = actual.titulo;
  $('mSinopsis').textContent = actual.sinopsis;
  $('mTrailer').src = actual.trailer;
  modal.show();
};
$('mElegir').onclick = () => elegir(actual.id);
$('modalPelicula').addEventListener('hidden.bs.modal', () => { $('mTrailer').src = ''; });

// Guarda la película elegida en localStorage y pasa a funciones.html
function elegir(id) {
  const p = PELICULAS.find((x) => x.id === id);
  guardar('funcionActual', { pelicula: p.titulo, genero: p.genero, precioBoleto: PRECIO });
  guardar('asientosSeleccionados', []);
  location.href = 'funciones.html';
}

pintar();
