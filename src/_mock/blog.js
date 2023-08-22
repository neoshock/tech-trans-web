import { faker } from '@faker-js/faker';

// ----------------------------------------------------------------------

const POST_TITLES = [
  '📦 Introducción a la Programación Orientada a Objetos',
  '🧠 Redes Neuronales y Aprendizaje Profundo',
  '🔒 Seguridad Informática: Amenazas y Prevenciones',
  '🔮 El Futuro de la Computación Cuántica',
  '☁️ Arquitecturas de Microservicios en la Nube',
  '📱 Desarrollo de Aplicaciones Móviles: iOS vs. Android',
  // '💾 Optimización de Bases de Datos Relacionales',
  // '🔐 Técnicas Avanzadas de Criptografía',
  // '🕶️ El Impacto de la Realidad Aumentada en la Web',
  // '🔄 Métodos Ágiles: Scrum, Kanban y XP',
  // '🤖 Tendencias en Inteligencia Artificial',
  // '🎨 Principios de Diseño de Interfaces de Usuario',
  // '💻 Evolución de los Sistemas Operativos',
  // '🎮 Desarrollo de Videojuegos: Motores y Herramientas',
  // '🌐 La Promesa de la Computación Edge',
  // '🛠️ Integración Continua y Entrega Continua (CI/CD)',
  // '🌍 Los Desafíos del Internet de las Cosas (IoT)',
  // '⏳ Estrategias de Backup y Recuperación de Datos',
  // '📈 Big Data: Herramientas y Aplicaciones',
  // '🔧 Prácticas Modernas de DevOps',
  // '📖 Lenguajes de Programación Emergentes',
  // '🔍 Bases de Datos NoSQL: Casos de Uso y Comparativas',
  // '🎥 Hardware Gráfico: GPUs y Computación Paralela',
  // '📦 Fundamentos de la Virtualización y Contenedores',
  // '💰 Blockchain y sus Aplicaciones Más Allá de las Criptomonedas',
];

const POST_CONTENT = [
  `<div>
  <img src="https://digitalpress.fra1.cdn.digitaloceanspaces.com/zn3wniw/2021/01/cpython.png" alt="Imagen relacionada con POO" style="max-width: 100%; margin-top: 20px;" />

  <h2 style="font-size: 20px; color: #444; margin-top: 30px;">Breve Historia</h2>
  <p style="font-size: 16px; color: #666;">
      La Programación Orientada a Objetos (POO) tuvo sus inicios en la década de 1960. Simula, un lenguaje de programación desarrollado por Ole-Johan Dahl y Kristen Nygaard, es considerado como uno de los primeros lenguajes orientados a objetos. Más tarde, en la década de 1970, Smalltalk, desarrollado en Xerox PARC, llevó la POO a la vanguardia de la programación.
  </p>

  <h2 style="font-size: 20px; color: #444; margin-top: 30px;">Puntos Clave</h2>
  <ul style="font-size: 16px; color: #666;">
      <li>La POO se basa en la idea de "objetos" que contienen datos y métodos para manipular esos datos.</li>
      <li>Permite un diseño modular y reutilizable del código.</li>
      <li>Introduce conceptos como herencia, polimorfismo, encapsulación y abstracción.</li>
  </ul>

  <h2 style="font-size: 20px; color: #444; margin-top: 30px;">Ventajas</h2>
  <ul style="font-size: 16px; color: #666;">
      <li>Mejora la organización del código y su mantenimiento.</li>
      <li>Facilita la reutilización de código.</li>
      <li>Permite la modelización de sistemas complejos de una manera más intuitiva.</li>
  </ul>

  <h2 style="font-size: 20px; color: #444; margin-top: 30px;">Desventajas</h2>
  <ul style="font-size: 16px; color: #666;">
      <li>Puede introducir una mayor complejidad en sistemas sencillos.</li>
      <li>Requiere un mayor consumo de memoria en algunos casos.</li>
      <li>El rendimiento puede ser un poco más lento en comparación con la programación procedural.</li>
  </ul>

  <h2 style="font-size: 20px; color: #444; margin-top: 30px;">Ejemplo de Código</h2>
  <pre style="background-color: #f4f4f4; padding: 10px; font-size: 14px; color: #333;">
      <code>
      class Animal {
        constructor(name) {
            this.name = name;
        }
        speak() {
            console.log('{this.name} makes a noise.');
        }
      }
      
      class Dog extends Animal {
        speak() {
            console.log('{this.name} barks.');
        }
      }
      
      const dog = new Dog('Rover');
      dog.speak(); // Outputs: Rover barks.
      </code>
  </pre>
</div>
`,
  `<div>
<img src="https://www.wordstream.com/wp-content/uploads/2021/07/machine-learning.png" alt="Imagen ilustrativa de redes neuronales" style="max-width: 100%; margin-top: 20px;" />

<h2 style="font-size: 20px; color: #444; margin-top: 30px;">Breve Historia</h2>
<p style="font-size: 16px; color: #666;">
    Las redes neuronales, inspiradas en el funcionamiento del cerebro humano, han existido desde los años 40 y 50. Sin embargo, su popularidad aumentó en la década de 2010 debido a la mejora en capacidad de cómputo y algoritmos, dando origen a lo que conocemos como aprendizaje profundo.
</p>

<h2 style="font-size: 20px; color: #444; margin-top: 30px;">Puntos Clave</h2>
<ul style="font-size: 16px; color: #666;">
    <li>Las redes neuronales se componen de capas de nodos interconectados que procesan información.</li>
    <li>El aprendizaje profundo se refiere a redes neuronales con muchas capas, permitiendo modelar problemas complejos.</li>
    <li>Es fundamental en áreas como visión por computadora, procesamiento de lenguaje natural y juegos.</li>
</ul>

<h2 style="font-size: 20px; color: #444; margin-top: 30px;">Ventajas</h2>
<ul style="font-size: 16px; color: #666;">
    <li>Puede modelar relaciones no lineales y complejas en grandes conjuntos de datos.</li>
    <li>Autodetecta características relevantes en el aprendizaje.</li>
    <li>Alta precisión en tareas como clasificación de imágenes y traducción automática.</li>
</ul>

<h2 style="font-size: 20px; color: #444; margin-top: 30px;">Desventajas</h2>
<ul style="font-size: 16px; color: #666;">
    <li>Requieren grandes cantidades de datos para entrenamiento.</li>
    <li>Consumo intensivo de recursos y tiempo de entrenamiento.</li>
    <li>La interpretación de sus decisiones puede ser poco transparente.</li>
</ul>

<h2 style="font-size: 20px; color: #444; margin-top: 30px;">Ejemplo de Código</h2>
<pre style="background-color: #f4f4f4; padding: 10px; font-size: 14px; color: #333;">
    <code>
import tensorflow as tf
from tensorflow import keras

# Crear una red neuronal simple
model = keras.Sequential([
keras.layers.Flatten(input_shape=(28, 28)),
keras.layers.Dense(128, activation='relu'),
keras.layers.Dense(10, activation='softmax')
])

model.compile(optimizer='adam', 
          loss='sparse_categorical_crossentropy', 
          metrics=['accuracy'])
    </code>
</pre>
</div>
`,
  `<div>
<img src="https://source.unsplash.com/random" alt="Imagen ilustrativa de seguridad informática" style="max-width: 100%; margin-top: 20px;" />

<h2 style="font-size: 20px; color: #444; margin-top: 30px;">Breve Historia</h2>
<p style="font-size: 16px; color: #666;">
    Desde los inicios de la computación, la seguridad ha sido una preocupación primordial. A medida que las tecnologías y la conectividad han avanzado, las amenazas han evolucionado, llevando a una mayor necesidad de proteger la información y los sistemas.
</p>

<h2 style="font-size: 20px; color: #444; margin-top: 30px;">Puntos Clave</h2>
<ul style="font-size: 16px; color: #666;">
    <li>La seguridad informática se ocupa de proteger los sistemas de información contra el acceso no autorizado.</li>
    <li>Las amenazas pueden ser de naturaleza física o digital.</li>
    <li>Es esencial tanto para organizaciones como para individuos.</li>
</ul>

<h2 style="font-size: 20px; color: #444; margin-top: 30px;">Ventajas</h2>
<ul style="font-size: 16px; color: #666;">
    <li>Protección contra pérdida de información y datos confidenciales.</li>
    <li>Preserva la reputación y confianza de las organizaciones.</li>
    <li>Previene interrupciones en operaciones críticas.</li>
</ul>

<h2 style="font-size: 20px; color: #444; margin-top: 30px;">Desventajas</h2>
<ul style="font-size: 16px; color: #666;">
    <li>Requiere inversión constante en herramientas y formación.</li>
    <li>Puede afectar la eficiencia si no se implementa correctamente.</li>
    <li>El panorama de amenazas está en constante evolución, lo que requiere adaptabilidad.</li>
</ul>

<h2 style="font-size: 20px; color: #444; margin-top: 30px;">Prevenciones Comunes</h2>
<ul style="font-size: 16px; color: #666;">
    <li>Uso de contraseñas fuertes y autenticación de dos factores.</li>
    <li>Actualizar regularmente el software y sistemas operativos.</li>
    <li>Backup regular de información importante.</li>
    <li>Uso de antivirus y firewalls adecuados.</li>
</ul>
</div>
`,
  `<div>
<img src="https://source.unsplash.com/random" alt="Imagen ilustrativa de computación cuántica" style="max-width: 100%; margin-top: 20px;" />

<h2 style="font-size: 20px; color: #444; margin-top: 30px;">Breve Historia</h2>
<p style="font-size: 16px; color: #666;">
    La idea de la computación cuántica se originó en la década de 1980, cuando Richard Feynman y Yuri Manin propusieron que una máquina cuántica sería eficaz para simular sistemas cuánticos, una tarea notoriamente difícil para las computadoras clásicas. Desde entonces, la ciencia ha avanzado, llevando al desarrollo de algoritmos cuánticos y al nacimiento de prototipos de computadoras cuánticas.
</p>

<h2 style="font-size: 20px; color: #444; margin-top: 30px;">Puntos Clave</h2>
<ul style="font-size: 16px; color: #666;">
    <li>La computación cuántica explora el uso de principios cuánticos para realizar cálculos.</li>
    <li>Potencial para resolver problemas que son inabordables para las computadoras clásicas.</li>
    <li>Empresas líderes como IBM, Google y Microsoft están invirtiendo activamente en investigación cuántica.</li>
</ul>

<h2 style="font-size: 20px; color: #444; margin-top: 30px;">Ventajas</h2>
<ul style="font-size: 16px; color: #666;">
    <li>Puede procesar grandes cantidades de información simultáneamente.</li>
    <li>Posibilidad de revolucionar campos como la criptografía, la optimización y la simulación de materiales.</li>
    <li>Realiza operaciones complejas en fracciones del tiempo que toma una computadora clásica.</li>
</ul>

<h2 style="font-size: 20px; color: #444; margin-top: 30px;">Desafíos</h2>
<ul style="font-size: 16px; color: #666;">
    <li>Requiere temperaturas extremadamente bajas para funcionar.</li>
    <li>La decoherencia cuántica limita el tiempo de cálculo efectivo.</li>
    <li>Aún en una etapa experimental y no está lista para aplicaciones comerciales generalizadas.</li>
</ul>

<h2 style="font-size: 20px; color: #444; margin-top: 30px;">Visión Futura</h2>
<p style="font-size: 16px; color: #666;">
    Mientras que las computadoras cuánticas actuales están todavía en su infancia, el potencial es inmenso. A medida que superemos los desafíos técnicos, podemos esperar que la computación cuántica transforme industrias enteras, mejorando áreas desde la investigación farmacéutica hasta la inteligencia artificial.
</p>
</div>
`,
  `<div>
<img src="https://source.unsplash.com/random" alt="Imagen ilustrativa de microservicios en la nube" style="max-width: 100%; margin-top: 20px;" />

<h2 style="font-size: 20px; color: #444; margin-top: 30px;">Breve Historia</h2>
<p style="font-size: 16px; color: #666;">
    La arquitectura de microservicios ha surgido como una solución a las limitaciones de las aplicaciones monolíticas. A medida que las aplicaciones crecían en complejidad, mantener y escalar estas aplicaciones monolíticas se volvía desafiante. En este contexto, la arquitectura de microservicios se popularizó en la década de 2010, permitiendo a las empresas descomponer sus aplicaciones en servicios más pequeños y gestionables que funcionan de manera independiente.
</p>

<h2 style="font-size: 20px; color: #444; margin-top: 30px;">Puntos Clave</h2>
<ul style="font-size: 16px; color: #666;">
    <li>Los microservicios son pequeñas unidades de servicio que funcionan de manera independiente.</li>
    <li>Cada microservicio es responsable de una funcionalidad específica y puede desarrollarse y desplegarse de forma independiente.</li>
    <li>Las arquitecturas de microservicios son altamente escalables y resilientes.</li>
</ul>

<h2 style="font-size: 20px; color: #444; margin-top: 30px;">Ventajas</h2>
<ul style="font-size: 16px; color: #666;">
    <li>Fomenta la modularidad y la separación de preocupaciones.</li>
    <li>Permite la entrega y despliegue continuo de componentes individuales.</li>
    <li>Facilita la escalabilidad y la resistencia a fallos al reducir los puntos únicos de fallo.</li>
</ul>

<h2 style="font-size: 20px; color: #444; margin-top: 30px;">Desafíos</h2>
<ul style="font-size: 16px; color: #666;">
    <li>Requiere una coordinación y monitorización intensiva entre servicios.</li>
    <li>La gestión de la base de datos puede volverse compleja debido a la separación de servicios.</li>
    <li>Puede llevar a la duplicación de esfuerzos si no se gestiona correctamente.</li>
</ul>

<h2 style="font-size: 20px; color: #444; margin-top: 30px;">Ejemplo de Código</h2>
<pre style="background-color: #f5f5f5; padding: 10px; font-size: 14px; color: #333;">
<code>
// Creación de un microservicio simple en Node.js
const express = require('express');
const app = express();
const PORT = 3000;

app.get('/api/servicio', (req, res) => {
    res.send('Microservicio en acción!');
});

app.listen(PORT, () => {
    console.log('Microservicio ejecutándose en el puerto {PORT}');
});
</code>
</pre>
</div>
`,
  `<div>
<img src="https://source.unsplash.com/random" alt="Imagen ilustrativa de aplicaciones móviles" style="max-width: 100%; margin-top: 20px;" />

<h2 style="font-size: 20px; color: #444; margin-top: 30px;">Breve Historia</h2>
<p style="font-size: 16px; color: #666;">
    Android e iOS son los dos sistemas operativos dominantes en el mercado de smartphones. Android, desarrollado por Google, fue lanzado en 2008, mientras que iOS, desarrollado por Apple, hizo su debut en 2007 con el iPhone. A lo largo de los años, ambas plataformas han evolucionado drásticamente, ofreciendo capacidades y funcionalidades avanzadas a los desarrolladores y usuarios.
</p>

<h2 style="font-size: 20px; color: #444; margin-top: 30px;">Puntos Clave</h2>
<ul style="font-size: 16px; color: #666;">
    <li>Android es de código abierto, mientras que iOS es propietario.</li>
    <li>iOS tiende a tener un ecosistema más cerrado, lo que puede resultar en aplicaciones más estables.</li>
    <li>Android ofrece una mayor flexibilidad y personalización.</li>
</ul>

<h2 style="font-size: 20px; color: #444; margin-top: 30px;">Ventajas de iOS</h2>
<ul style="font-size: 16px; color: #666;">
    <li>Integración más fluida con otros productos Apple.</li>
    <li>Proceso de revisión de aplicaciones más estricto en la App Store, lo que puede conducir a aplicaciones de mayor calidad.</li>
    <li>Rápida adopción de nuevas versiones del sistema operativo por parte de los usuarios.</li>
</ul>

<h2 style="font-size: 20px; color: #444; margin-top: 30px;">Ventajas de Android</h2>
<ul style="font-size: 16px; color: #666;">
    <li>Flexibilidad para instalar aplicaciones de fuentes externas.</li>
    <li>Mayor variedad de dispositivos y rangos de precios.</li>
    <li>Posibilidad de personalización a nivel de sistema operativo.</li>
</ul>

<h2 style="font-size: 20px; color: #444; margin-top: 30px;">Desafíos Comunes</h2>
<ul style="font-size: 16px; color: #666;">
    <li>Compatibilidad con múltiples dispositivos y tamaños de pantalla, especialmente en Android.</li>
    <li>Mantenimiento de aplicaciones con la salida de nuevas versiones del sistema operativo.</li>
    <li>Requerimientos específicos y políticas de las tiendas de aplicaciones.</li>
</ul>

<h2 style="font-size: 20px; color: #444; margin-top: 30px;">Ejemplo de Código</h2>
<pre style="background-color: #f5f5f5; padding: 10px; font-size: 14px; color: #333;">
<code>
// Ejemplo en Swift (iOS)
import UIKit

class ViewController: UIViewController {
    override func viewDidLoad() {
        super.viewDidLoad()
        // Código para la interfaz de iOS
    }
}

// Ejemplo en Kotlin (Android)
import android.os.Bundle
import androidx.appcompat.app.AppCompatActivity

class MainActivity : AppCompatActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_main)
        // Código para la interfaz de Android
    }
}
</code>
</pre>
</div>
`
];

const posts = [...Array(6)].map((_, index) => ({
  id: faker.datatype.uuid(),
  cover: `/assets/images/covers/cover_${index + 1}.jpg`,
  title: POST_TITLES[index],
  createdAt: faker.date.past(),
  view: faker.datatype.number(),
  comment: faker.datatype.number(),
  share: faker.datatype.number(),
  favorite: faker.datatype.number(),
  author: {
    name: faker.name.fullName(),
    avatarUrl: `/assets/images/avatars/avatar_${index + 1}.jpg`,
  },
  content: POST_CONTENT[index]
}));

export default posts;
