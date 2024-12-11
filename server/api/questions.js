import dynamoDB from '../lib/dynamodb';
import { ScanCommand } from '@aws-sdk/lib-dynamodb';

// Función para obtener preguntas aleatorias
function obtenerPreguntasAleatorias(items, cantidad) {
  return items.sort(() => 0.5 - Math.random()).slice(0, cantidad);
}

export default defineEventHandler(async () => {
  const params = {
    TableName: 'Preguntas',
  };

  try {
    // Ejecutar comando Scan para obtener todos los elementos
    const data = await dynamoDB.send(new ScanCommand(params));

    // Seleccionar 20 preguntas aleatorias
    const preguntasAleatorias = obtenerPreguntasAleatorias(data.Items, 50);

    return preguntasAleatorias;
  } catch (error) {
    console.error('Error al obtener preguntas de DynamoDB:', error);
    throw createError({ statusCode: 500, message: 'Error al obtener preguntas' });
  }
});
