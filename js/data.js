/* NEOFORGE · contenido del sitio (todo ficticio) */
window.NF = {
  proyectos: [
    {id:'nyx', t:'NYX PROTOCOL', g:'Shooter táctico', st:'dev', y:'2028', plat:'PC, PS5, Xbox Series', mot:'Forja Engine 4', team:62, prog:58, hue:[190,320], m:'hex',
     d:'Infiltración por escuadras en una megaciudad que reescribe sus calles cada noche. Nuestro proyecto más ambicioso.',
     long:'Cuatro jugadores, una ciudad procedural y una IA que aprende de tus rutas. NYX PROTOCOL combina sigilo y combate táctico con un sistema de hackeo en tiempo real que altera iluminación, cámaras y tráfico.',
     feats:['Cooperativo para 4 con juego cruzado','Ciudad que se regenera en cada partida','Hackeo del entorno en tiempo real','Trazado de rayos híbrido a 60 fps']},
    {id:'abisal', t:'ABISAL', g:'Aventura submarina', st:'dev', y:'2027', plat:'PC, PS5, Switch 2', mot:'Forja Engine 4', team:34, prog:91, hue:[180,210], m:'waves',
     d:'Explora una fosa oceánica viva donde la luz es tu único recurso. Supervivencia narrativa en primera persona.',
     long:'Desciende 11 000 metros a bordo de un batiscafo averiado. Cada bengala ilumina y atrae a la vez. Simulación de fluidos y audio espacial diseñados específicamente para auriculares.',
     feats:['Simulación de fluidos propia','Audio binaural para auriculares','Historia de 12 horas con tres finales','Modo foto y modo exploración sin amenazas']},
    {id:'ferrum', t:'FERRUM', g:'Estrategia en tiempo real', st:'live', y:'2024', plat:'PC, PS5', mot:'Forja Engine 3', team:48, prog:100, hue:[18,40], m:'mount',
     d:'Construye y defiende la última fortaleza de una era industrial. Más de 2,5 millones de jugadores.',
     long:'Estrategia de asedio con física de estructuras: cada muro se calcula pieza a pieza. Incluye editor de mapas, multijugador para 8 y una campaña de 30 misiones.',
     feats:['Física de estructuras pieza a pieza','Campaña de 30 misiones','Multijugador para 8 jugadores','Editor de mapas con taller de la comunidad']},
    {id:'drift', t:'NEON DRIFT 2088', g:'Carreras arcade', st:'live', y:'2022', plat:'PC, PS5, Xbox, Switch', mot:'Forja Engine 2', team:30, prog:100, hue:[300,195], m:'grid',
     d:'Carreras a 400 km/h por autopistas suspendidas. Banda sonora synth original y multijugador cruzado.',
     long:'Conducción arcade con derrapes magnéticos y circuitos que se generan al ritmo de la música. Nuestro primer gran éxito multiplataforma.',
     feats:['Circuitos generados al ritmo de la música','Multijugador cruzado para 12','Más de 60 vehículos personalizables','Banda sonora original de 40 temas']},
    {id:'kairo', t:'KAIRO', g:'Puzle narrativo', st:'live', y:'2018', plat:'PC, Switch, móvil', mot:'Forja Engine 1', team:9, prog:100, hue:[40,170], m:'rings',
     d:'Nuestro primer juego: un reloj roto, una ciudad congelada en el tiempo y 80 puzles que giran alrededor de los segundos.',
     long:'Manipula el tiempo de cada habitante para desbloquear la historia. Diseñado por tres personas en un garaje y llevado después a Switch y móvil.',
     feats:['80 puzles de manipulación temporal','Ilustración a mano en cada escena','Disponible en 14 idiomas','Partida guardada en la nube entre plataformas']},
    {id:'forja', t:'FORJA ENGINE', g:'Motor y herramientas', st:'tool', y:'v4.2', plat:'Windows, Linux, consolas', mot:'C++20, Vulkan, Rust', team:22, prog:100, hue:[195,18], m:'code',
     d:'Nuestro motor propio en C++ y Vulkan: render en tiempo real, físicas, red y editor visual.',
     long:'Render diferido con trazado de rayos híbrido, sistema de entidades por componentes, editor colaborativo en tiempo real y compilación a todas las consolas actuales desde un solo proyecto.',
     feats:['Editor colaborativo en tiempo real','Recarga en caliente de código y assets','Netcode con rollback integrado','Compilación a todas las consolas actuales']}
  ],
  estados: {live:['Lanzado','live'], dev:['En desarrollo','dev'], tool:['Herramienta','tool']},
  servicios: [
    ['Desarrollo de juegos','Diseño, programación, arte y audio de títulos propios para PC y consola.','<path d="M6 14h32a4 4 0 0 1 4 4v8a8 8 0 0 1-8 8c-3 0-5-2-7-4h-10c-2 2-4 4-7 4a8 8 0 0 1-8-8v-8a4 4 0 0 1 4-4Z"/><path d="M12 20v6M9 23h6"/><circle cx="31" cy="21" r="1.5"/><circle cx="35" cy="25" r="1.5"/>'],
    ['Motor propio','Forja Engine: render, físicas y red hechos a medida de cada juego.','<path d="M22 4 39 13v18L22 40 5 31V13Z"/><path d="M22 22 39 13M22 22 5 13M22 22v18"/>'],
    ['Co-desarrollo','Nos integramos en tu equipo para sistemas, niveles, IA o rendimiento.','<circle cx="15" cy="16" r="6"/><circle cx="30" cy="16" r="6"/><path d="M4 38c0-7 5-11 11-11s11 4 11 11M19 38c0-7 5-11 11-11s11 4 11 11"/>'],
    ['Ports y optimización','Llevamos juegos a nuevas plataformas manteniendo 60 fps estables.','<rect x="5" y="8" width="34" height="22" rx="2"/><path d="M15 38h14M22 30v8M14 22l6-6 5 4 6-7"/>']
  ],
  tech: ['C++20','Vulkan','Rust','HLSL','Trazado de rayos','Físicas propias','Netcode con rollback','Audio espacial','PlayStation 5','Xbox Series','Nintendo Switch 2','Steam Deck','Linux','IA procedural'],
  bench: [
    ['Tiempo de compilación de un nivel','8,4 s',.92,true],
    ['Recarga en caliente de shaders','0,3 s',.97,true],
    ['Entidades simuladas a 60 fps','250 000',.84,false],
    ['Memoria del editor en reposo','1,1 GB',.7,false]
  ],
  diario: [
    {f:'2026-11-18', t:'Así iluminamos 11 000 metros de oscuridad', d:'El equipo de render de ABISAL explica cómo una sola bengala puede mover 4 000 partículas de sedimento sin bajar de 60 fps.', a:'Equipo de render', min:7},
    {f:'2026-10-30', t:'Forja Engine 4.2: editor colaborativo', d:'Hasta 16 personas editando el mismo nivel a la vez, con historial y bloqueo por capas. Lo contamos con números.', a:'Equipo de herramientas', min:5},
    {f:'2026-10-02', t:'FERRUM supera los 2,5 millones de jugadores', d:'Repasamos dos años de parches, la temporada 6 y lo que la comunidad ha construido en el editor de mapas.', a:'Producción', min:4}
  ],
  historia: [
    ['2016','Primer commit','Tres fundadores, un garaje en Valencia y el primer prototipo de KAIRO.'],
    ['2018','Lanzamiento de KAIRO','Nuestro primer juego llega a PC y Switch y financia el estudio.'],
    ['2020','Forja Engine 1.0','Dejamos los motores comerciales y construimos tecnología propia.'],
    ['2022','NEON DRIFT 2088','Primer título multiplataforma con juego cruzado. El equipo pasa a 60 personas.'],
    ['2024','FERRUM y sede en Madrid','2,5 millones de jugadores y un segundo estudio dedicado a tecnología.'],
    ['2026','Presentamos NYX PROTOCOL','140 personas y el proyecto más grande de nuestra historia.']
  ],
  valores: [
    ['01','La sensación primero','Si un sistema no mejora cómo se siente jugar, no entra en la build. Prototipamos en días, no en meses.'],
    ['02','Tecnología propia','Controlar nuestro motor nos permite optimizar cada milisegundo y no depender de licencias ajenas.'],
    ['03','Sin crunch','Planificamos con margen real. Jornadas sostenibles y un viernes al mes dedicado a experimentar.'],
    ['04','Comunidad abierta','Builds públicas tempranas, hojas de ruta visibles y feedback que llega directo al equipo.']
  ],
  equipo: [
    ['Elena Vidal','CEO y directora creativa','15 años diseñando juegos',18],
    ['Marco Ibáñez','CTO, arquitecto de Forja','especialista en motores',195],
    ['Aiko Tanaka','Directora de arte','ilustración y dirección visual',320],
    ['Samuel Okoye','Director de diseño','sistemas y economía de juego',40],
    ['Lucía Ferrer','Directora de audio','compositora y diseño sonoro',160],
    ['David Ruiz','Productor ejecutivo','planificación y lanzamientos',270]
  ],
  sedes: [
    {n:'Valencia', r:'Sede central · 95 personas', d:'Diseño, arte, audio y producción. Un antiguo almacén portuario reconvertido con sala de captura de movimiento y estudio de grabación.', t:['Captura de movimiento','Estudio de audio','Sala de playtest'], hue:18},
    {n:'Madrid', r:'Estudio de tecnología · 45 personas', d:'El hogar de Forja Engine: render, red, herramientas y ports. Laboratorio de rendimiento con todos los kits de consola.', t:['Laboratorio de rendimiento','Kits de consola','I+D en render'], hue:195}
  ],
  empleo: [
    ['Programador/a de gameplay sénior','C++ · sistemas de combate para NYX PROTOCOL','Valencia o remoto'],
    ['Ingeniero/a de render','Vulkan · trazado de rayos en Forja Engine','Madrid'],
    ['Artista técnico/a','Shaders, VFX y herramientas para artistas','Valencia'],
    ['Diseñador/a de niveles','Espacios submarinos para ABISAL','Valencia o remoto'],
    ['QA tester con inglés','Pruebas de certificación en consola','Madrid']
  ],
  pipeline: [['Concepto','2-4 semanas'],['Prototipo jugable','2-3 meses'],['Vertical slice','4-6 meses'],['Producción','12-24 meses'],['Pulido y certificación','2-4 meses'],['Lanzamiento y soporte','continuo']],
  faq: [
    ['¿Aceptáis proyectos de co-desarrollo?','Sí. Trabajamos con estudios de cualquier tamaño en sistemas de juego, niveles, IA, rendimiento y ports. Indica en el formulario plataformas y plazos.'],
    ['¿Publicáis juegos de otros estudios?','Estamos abriendo un pequeño programa de publicación para equipos independientes que usen o quieran adoptar Forja Engine.'],
    ['¿Tenéis ofertas de empleo?','Contratamos todo el año en programación, arte técnico, diseño y QA. Mira las vacantes en Quiénes somos o selecciona "Empleo" como motivo.'],
    ['¿Se puede licenciar Forja Engine?','Por ahora es de uso interno y de socios de co-desarrollo. Planeamos una licencia para estudios externos en 2027.'],
    ['¿Cuánto tardáis en responder?','Menos de 48 horas laborables. Prensa y socios tienen un canal prioritario.']
  ],
  lanzamiento: {id:'abisal', fecha:'2027-03-12T18:00:00+01:00'}
};
