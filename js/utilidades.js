// ---------- Constantes y datos ----------
const PRECIO = 85;
const CUPONES = { DESCUENTO10: 0.10, BUAP15: 0.15 };
const PELICULAS = [
  {
    id: 1,
    titulo: 'Mary & Max',
    genero: 'Animación',
    duracion: '92 min',
    sinopsis: 'Mary, una niña solitaria de ocho años que vive en Australia, comienza una inesperada amistad por correspondencia con Max, un hombre de Nueva York que vive con síndrome de Asperger. A través de sus cartas, ambos comparten sus experiencias, inseguridades, dificultades y reflexiones sobre la vida. A pesar de la distancia y de sus profundas diferencias, construyen un vínculo extraordinario que explora la soledad, la amistad, la aceptación y la necesidad humana de encontrar a alguien que nos comprenda.',
    trailer: 'https://www.youtube.com/embed/kc_bf-7NNEA'
  },
  {
    id: 2,
    titulo: 'Jurassic Park',
    genero: 'Ciencia ficción',
    duracion: '127 min',
    sinopsis: 'El multimillonario John Hammond invita a un grupo de científicos y especialistas a visitar un parque temático construido en una isla remota, donde la ingeniería genética ha permitido recrear dinosaurios extintos. Lo que promete ser un extraordinario avance científico pronto se convierte en una lucha por sobrevivir cuando una serie de fallos compromete la seguridad del parque. Los visitantes deberán enfrentarse a criaturas prehistóricas mientras descubren los peligros de intentar controlar la naturaleza y las consecuencias de llevar el progreso científico más allá de sus límites.',
    trailer: 'https://www.youtube.com/embed/QWBKEmWWL38'
  },
  {
    id: 3,
    titulo: 'Blade Runner 2049',
    genero: 'Ciencia ficción',
    duracion: '164 min',
    sinopsis: 'En un futuro distópico, K, un replicante que trabaja como blade runner para la policía de Los Ángeles, descubre un secreto enterrado durante décadas que amenaza con alterar el frágil equilibrio de la sociedad. Su investigación lo conduce hasta Rick Deckard, un antiguo blade runner desaparecido, y lo obliga a cuestionar su propia identidad, sus recuerdos y aquello que significa ser humano. En un mundo dominado por la tecnología, la desigualdad y la soledad, la búsqueda de la verdad se transforma también en una exploración de la memoria, el amor y la necesidad de encontrar un propósito.',
    trailer: 'https://www.youtube.com/embed/PkqHVGFAhbU'
  },
  {
    id: 4,
    titulo: 'Rango',
    genero: 'Animación',
    duracion: '107 min',
    sinopsis: 'Rango es un camaleón doméstico que termina accidentalmente en Dirt, un pueblo del desierto donde el agua escasea y sus habitantes viven bajo la amenaza de una misteriosa crisis. Tras inventarse una identidad heroica, consigue convertirse en sheriff y asume la responsabilidad de descubrir qué está ocurriendo con las reservas de agua. En medio de duelos, personajes extravagantes y peligros inesperados, Rango tendrá que descubrir quién es realmente y aprender que el valor no consiste en aparentar ser un héroe, sino en actuar cuando los demás necesitan ayuda.',
    trailer: 'https://www.youtube.com/embed/5YPoi-I7s24'
  },
  {
    id: 5,
    titulo: 'IT',
    genero: 'Terror',
    duracion: '135 min',
    sinopsis: 'En el pueblo de Derry, Maine, un grupo de niños comienza a experimentar sucesos aterradores relacionados con la desaparición de varios menores. Pronto descubren que detrás de estos acontecimientos se encuentra Pennywise, una entidad maligna capaz de adoptar la apariencia de un payaso y manifestarse a través de los mayores temores de sus víctimas. Mientras los protagonistas intentan comprender el origen de esta amenaza, deberán enfrentarse tanto al horror sobrenatural como a sus propios miedos y a la violencia que los rodea. Su amistad se convertirá en una de sus principales fortalezas frente a una presencia que parece imposible de detener.',
    trailer: 'https://www.youtube.com/embed/_oBZ_zTz0Nw'
  },
  {
    id: 6,
    titulo: 'Son como niños',
    genero: 'Comedia',
    duracion: '102 min',
    sinopsis: 'Tras la muerte de su antiguo entrenador de baloncesto, cinco amigos de la infancia vuelven a reunirse después de muchos años para pasar un fin de semana junto a sus familias. Lo que comienza como una oportunidad para recordar viejos tiempos pronto se transforma en una sucesión de situaciones cómicas, competencias absurdas y conflictos familiares. Mientras intentan recuperar la espontaneidad de su juventud, descubren que crecer no significa necesariamente abandonar la diversión, aunque sus responsabilidades, diferencias y comportamientos infantiles compliquen constantemente la convivencia.',
    trailer: 'https://www.youtube.com/embed/yMEDiKD7cyE'
  },
  {
    id: 7,
    titulo: 'Oppenheimer',
    genero: 'Drama',
    duracion: '180 min',
    sinopsis: 'Durante la Segunda Guerra Mundial, el físico J. Robert Oppenheimer es elegido para dirigir el Proyecto Manhattan, una operación científica secreta destinada a desarrollar la primera bomba atómica. Rodeado de algunos de los científicos más brillantes de su época, deberá afrontar enormes desafíos técnicos y una carrera contrarreloj que cambiará el curso de la historia. Sin embargo, el éxito del proyecto abrirá un conflicto mucho más profundo: las consecuencias humanas, políticas y morales de crear un arma de semejante poder. A medida que aumentan las tensiones internacionales y las sospechas políticas, Oppenheimer deberá enfrentarse al legado de sus decisiones y a las contradicciones entre el conocimiento científico, la responsabilidad individual y el poder del Estado.',
    trailer: 'https://www.youtube.com/embed/uYPbbksJxIg'
  },
  {
    id: 8,
    titulo: 'Se7en: Los siete pecados capitales',
    genero: 'Thriller',
    duracion: '127 min',
    sinopsis: 'En una ciudad opresiva marcada por la violencia y la decadencia, el detective veterano William Somerset y el joven David Mills investigan una serie de asesinatos que parecen responder a una lógica macabra. Cada crimen está inspirado en uno de los siete pecados capitales y forma parte de un plan cuidadosamente elaborado por un asesino que pretende convertir sus actos en una especie de juicio moral sobre la sociedad. Mientras siguen las pistas y descubren la inquietante coherencia de los crímenes, ambos detectives se enfrentan a dilemas sobre la justicia, la maldad y los límites de la condición humana. La investigación pondrá a prueba sus convicciones y los conducirá hacia una confrontación psicológica cada vez más perturbadora.',
    trailer: 'https://www.youtube.com/embed/znmZoVkCjpI'
  },
  {
    id: 9,
    titulo: 'Suzume',
    genero: 'Anime',
    duracion: '122 min',
    sinopsis: 'Suzume, una adolescente que vive en una tranquila región de Japón, conoce a un joven que busca unas misteriosas puertas relacionadas con fenómenos sobrenaturales. Al descubrir una de ellas entre las ruinas de un edificio abandonado, Suzume desencadena una serie de acontecimientos que amenazan distintas regiones del país. Junto a su nuevo compañero, emprende un viaje para encontrar y cerrar las puertas antes de que ocurran nuevas catástrofes. En el camino, se enfrentará a fuerzas inexplicables y a los recuerdos de su propio pasado, en una aventura que explora el duelo, la memoria, el crecimiento personal y la capacidad de seguir adelante.',
    trailer: 'https://www.youtube.com/embed/8OEn2k4YCHM'
  },
  {
    id: 10,
    titulo: 'Interstellar',
    genero: 'Ciencia ficción',
    duracion: '169 min',
    sinopsis: 'En un futuro en el que la Tierra sufre una grave crisis ambiental y la humanidad se enfrenta a la escasez de alimentos, el expiloto e ingeniero Cooper es reclutado para participar en una misión espacial extraordinaria. Junto a un equipo de astronautas, deberá atravesar un agujero de gusano en busca de planetas que puedan convertirse en un nuevo hogar para la humanidad. Mientras exploran mundos desconocidos y se enfrentan a los efectos extremos del tiempo y la gravedad, Cooper tendrá que afrontar una difícil separación de su familia. La película combina exploración espacial, teorías físicas y preguntas sobre el amor, el sacrificio, la supervivencia y el futuro de nuestra especie.',
    trailer: 'https://www.youtube.com/embed/zSWdZVtXT7E'
  },
  {
    id: 11,
    titulo: 'Coyote vs. Acme',
    genero: 'Comedia',
    duracion: '103 min',
    sinopsis: 'Después de años de perseguir al Correcaminos y sufrir los fallos de los productos de la corporación ACME, Wile E. Coyote decide llevar a la empresa ante los tribunales. Con la ayuda de un abogado, se enfrenta a una compañía que ha fabricado los artefactos que tantas veces le han causado accidentes. El conflicto convierte una rivalidad clásica de los dibujos animados en una batalla legal llena de situaciones absurdas, humor y enfrentamientos inesperados. La historia juega con la posibilidad de que el eterno perdedor finalmente reclame justicia por los desastres que ha sufrido.',
    trailer: 'https://www.youtube.com/embed/Yj-Nm47IW9k'
  },
  {
    id: 12,
    titulo: 'Demon Slayer: Infinity Castle',
    genero: 'Anime',
    duracion: '155 min',
    sinopsis: 'Tanjiro Kamado y los demás cazadores de demonios se ven arrastrados al misterioso Castillo Infinito, una fortaleza sobrenatural controlada por Muzan Kibutsuji. Separados en distintos enfrentamientos, los miembros del Cuerpo de Exterminio de Demonios deberán luchar contra algunos de los demonios más poderosos de las Doce Lunas Demoníacas. Mientras Tanjiro y sus compañeros se enfrentan a enemigos formidables, saldrán a la luz historias personales, heridas del pasado y los sacrificios que han marcado sus vidas. La batalla representa un momento decisivo en la lucha contra Muzan y pondrá a prueba la determinación, los vínculos y la voluntad de quienes buscan poner fin a la amenaza demoníaca.',
    trailer: 'https://www.youtube.com/embed/1iBnWJKbvHI'
  } 
].map((p) => ({...p, poster: `img/poster${p.id}.jpg`}));

// ---------- localStorage ----------
function obtener(clave, defecto = []) {
  try { return JSON.parse(localStorage.getItem(clave)) ?? defecto; } catch { return defecto; }
}
function guardar(clave, datos) { localStorage.setItem(clave, JSON.stringify(datos)); }

// ---------- Utilidades de interfaz ----------
const $ = (id) => document.getElementById(id);
function alerta(id, mensaje, tipo = 'danger') {
  $(id).innerHTML = `<div class="alert alert-${tipo} alert-dismissible" role="alert"><i class="bi bi-info-circle"></i> ${mensaje}<button class="btn-close" data-bs-dismiss="alert" aria-label="Cerrar"></button></div>`;
}

const MENU = [['index.html', 'film', 'Cartelera'], ['funciones.html', 'ticket-perforated', 'Funciones'], ['carrito.html', 'cart3', 'Carrito'], ['contacto.html', 'envelope', 'Contacto']];
function pintarNavbar() {
  const actual = location.pathname.split('/').pop() || 'index.html';
  $('nav').innerHTML = `<nav class="navbar navbar-expand-md navbar-dark sticky-top"><div class="container">
    <a class="navbar-brand marquee d-flex align-items-center" href="index.html"><img src="img/logo.png" alt="" height="48" class="me-2">CINE<span>PLUS</span></a>
    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#menu" aria-label="Abrir menú"><span class="navbar-toggler-icon"></span></button>
    <div class="collapse navbar-collapse" id="menu"><ul class="navbar-nav ms-auto">
      ${MENU.map(([h, i, t]) => `<li class="nav-item"><a class="nav-link ${h === actual ? 'active' : ''}" href="${h}"><i class="bi bi-${i}"></i> ${t}</a></li>`).join('')}
    </ul></div></div></nav>`;
}

// ---------- Formulario de contacto ----------
function iniciarContacto() {
  const f = $('formContacto');
  if (!f) return;
  f.addEventListener('submit', (e) => {
    e.preventDefault();
    f.classList.add('was-validated');
    if (!f.checkValidity()) return;
    alerta('aviso', '¡Mensaje enviado! Te responderemos pronto.', 'success');
    f.reset();
    f.classList.remove('was-validated');
  });
}

pintarNavbar();
iniciarContacto();
