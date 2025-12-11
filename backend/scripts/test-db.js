#!/usr/bin/env node

const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function main() {
  try {
    console.log('Intentando conectar a la base de datos...');
    console.log('DATABASE_URL:', process.env.DATABASE_URL || '<no set>');

    // Mostrar tablas disponibles (MySQL)
    const tables = await prisma.$queryRawUnsafe('SHOW TABLES;');
    console.log('Tablas encontradas:', tables);

    // Si se proporciona TEST_TABLE como variable de entorno, mostrar hasta 5 filas
    const table = process.env.TEST_TABLE;
    if (table) {
      console.log(`Consultando primeras filas de la tabla: ${table}`);
      const rows = await prisma.$queryRawUnsafe(`SELECT * FROM \`${table}\` LIMIT 5;`);
      console.log(`Filas (máx 5) de ${table}:`, rows);
    } else {
      console.log('No se proporcionó la variable de entorno TEST_TABLE. Para consultar filas, exporta TEST_TABLE=nombre_tabla');
    }

    console.log('Prueba completada con éxito.');
  } catch (err) {
    console.error('Error en la prueba de DB:', err);
    process.exitCode = 1;
  } finally {
    await prisma.$disconnect();
  }
}

main();
