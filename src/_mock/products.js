import { faker } from '@faker-js/faker';
import { sample } from 'lodash';
import { fetchWithToken } from '../utils/helper';
// ----------------------------------------------------------------------

const PRODUCT_NAME = [
  'Algoritmos y Estrucutra de datos',
  'Base de datos',
  'Calculo',
  'Calculo II',
  'Calculo III',
  'Calculo IV',
];
const PRODUCT_COLOR = ['#00AB55', '#000000', '#FFFFFF', '#FFC0CB', '#FF4842', '#1890FF', '#94D82D', '#FFC107'];

const apiUrl = process.env.REACT_APP_API_BASE_URL;


async function fetchSubjects() {
  try {
    const response = await fetchWithToken(`${apiUrl}/api/subject/list-subjects-by-logged`);
    const data = await response.data;
    return data; // Asumo que las materias están en la propiedad 'data' del objeto de respuesta
  } catch (error) {
    console.error('Error fetching subjects:', error);
    return [];
  }
}


// ----------------------------------------------------------------------

export async function fetchAndPrepareProducts() {
  let products = [];
  try {

    const subjects = await fetchSubjects(); // Asume que fetchSubjects ya está definido
    products = subjects.map((subject, index) => {
      return {
        id: subject.subjectId,
        cover: `/assets/images/products/product_26.png`, // Este campo parece ser una constante en tu ejemplo
        name: subject.subjectName,
        description: subject.description,
        completedHours: subject.completedHours,
        teacherName: subject.teacherName,
        price: faker.datatype.number({ min: 4, max: 99, precision: 0.01 }), // Este campo se genera al azar en tu ejemplo
        priceSale: index % 3 ? null : faker.datatype.number({ min: 19, max: 29, precision: 0.01 }), // Este campo también
        colors: PRODUCT_COLOR, // Este campo usa un array constante en tu ejemplo
        status: sample(['verificado', 'pendiente', '', '']), // Este campo se genera al azar en tu ejemplo
      };
    });
  } catch (error) {
    console.error('Error in fetchAndPrepareProducts:', error);
  }

  return products;
}

