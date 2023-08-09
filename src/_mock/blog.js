import { faker } from '@faker-js/faker';

// ----------------------------------------------------------------------

const POST_TITLES = [
  '📦 Introducción a la Programación Orientada a Objetos',
  '🧠 Redes Neuronales y Aprendizaje Profundo',
  '🔒 Seguridad Informática: Amenazas y Prevenciones',
  '🔮 El Futuro de la Computación Cuántica',
  '☁️ Arquitecturas de Microservicios en la Nube',
  '📱 Desarrollo de Aplicaciones Móviles: iOS vs. Android',
  '💾 Optimización de Bases de Datos Relacionales',
  '🔐 Técnicas Avanzadas de Criptografía',
  '🕶️ El Impacto de la Realidad Aumentada en la Web',
  '🔄 Métodos Ágiles: Scrum, Kanban y XP',
  '🤖 Tendencias en Inteligencia Artificial',
  '🎨 Principios de Diseño de Interfaces de Usuario',
  '💻 Evolución de los Sistemas Operativos',
  '🎮 Desarrollo de Videojuegos: Motores y Herramientas',
  '🌐 La Promesa de la Computación Edge',
  '🛠️ Integración Continua y Entrega Continua (CI/CD)',
  '🌍 Los Desafíos del Internet de las Cosas (IoT)',
  '⏳ Estrategias de Backup y Recuperación de Datos',
  '📈 Big Data: Herramientas y Aplicaciones',
  '🔧 Prácticas Modernas de DevOps',
  '📖 Lenguajes de Programación Emergentes',
  '🔍 Bases de Datos NoSQL: Casos de Uso y Comparativas',
  '🎥 Hardware Gráfico: GPUs y Computación Paralela',
  '📦 Fundamentos de la Virtualización y Contenedores',
  '💰 Blockchain y sus Aplicaciones Más Allá de las Criptomonedas',
];

const posts = [...Array(23)].map((_, index) => ({
  id: faker.datatype.uuid(),
  cover: `/assets/images/covers/cover_${index + 1}.jpg`,
  title: POST_TITLES[index + 1],
  createdAt: faker.date.past(),
  view: faker.datatype.number(),
  comment: faker.datatype.number(),
  share: faker.datatype.number(),
  favorite: faker.datatype.number(),
  author: {
    name: faker.name.fullName(),
    avatarUrl: `/assets/images/avatars/avatar_${index + 1}.jpg`,
  },
}));

export default posts;
