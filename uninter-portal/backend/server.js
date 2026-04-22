const express = require('express');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

const programs = [
  {
    id: 1,
    nombre: 'Ingeniería en Sistemas Computacionales',
    nivel: 'Lic.',
    modalidad: 'En línea',
    descripcion: 'Forma ingenieros capaces de diseñar, desarrollar e implementar soluciones tecnológicas.',
    duracion: '9 cuatrimestres',
  },
  {
    id: 2,
    nombre: 'Licenciatura en Administración de Empresas',
    nivel: 'Lic.',
    modalidad: 'Mixta',
    descripcion: 'Desarrolla habilidades de liderazgo, gestión estratégica y toma de decisiones empresariales.',
    duracion: '9 cuatrimestres',
  },
  {
    id: 3,
    nombre: 'Licenciatura en Psicología',
    nivel: 'Lic.',
    modalidad: 'Presencial',
    descripcion: 'Comprende el comportamiento humano y brinda herramientas para la intervención clínica y organizacional.',
    duracion: '9 cuatrimestres',
  },
  {
    id: 4,
    nombre: 'Licenciatura en Derecho',
    nivel: 'Lic.',
    modalidad: 'En línea',
    descripcion: 'Forma juristas con sólidos conocimientos del sistema legal mexicano e internacional.',
    duracion: '9 cuatrimestres',
  },
  {
    id: 5,
    nombre: 'Maestría en Educación',
    nivel: 'Posgrado',
    modalidad: 'En línea',
    descripcion: 'Especialización para docentes y directivos que buscan transformar la práctica educativa.',
    duracion: '4 cuatrimestres',
  },
  {
    id: 6,
    nombre: 'Maestría en Administración de Negocios (MBA)',
    nivel: 'Posgrado',
    modalidad: 'Mixta',
    descripcion: 'Programa ejecutivo orientado a desarrollar competencias gerenciales de alto nivel.',
    duracion: '4 cuatrimestres',
  },
  {
    id: 7,
    nombre: 'Maestría en Tecnologías de la Información',
    nivel: 'Posgrado',
    modalidad: 'En línea',
    descripcion: 'Prepara profesionales para liderar proyectos tecnológicos complejos en la era digital.',
    duracion: '4 cuatrimestres',
  },
  {
    id: 8,
    nombre: 'Licenciatura en Contaduría Pública',
    nivel: 'Lic.',
    modalidad: 'Presencial',
    descripcion: 'Forma contadores con dominio de la normativa fiscal, financiera y de auditoría.',
    duracion: '9 cuatrimestres',
  },
];

const buildResponse = (res, { data = null, message = 'OK', status = 200 }) => {
  return res.status(status).json({ data, message, status });
};


// GET /api/programs
app.get('/api/programs', (req, res) => {
  try {
    buildResponse(res, {
      data: programs,
      message: 'Programas académicos obtenidos correctamente',
      status: 200,
    });
  } catch (error) {
    buildResponse(res, {
      data: null,
      message: 'Error interno del servidor',
      status: 500,
    });
  }
});

// GET /api/programs/:id
app.get('/api/programs/:id', (req, res) => {
  const id = parseInt(req.params.id, 10);
  const program = programs.find((p) => p.id === id);

  if (!program) {
    return buildResponse(res, {
      data: null,
      message: `Programa con id ${id} no encontrado`,
      status: 404,
    });
  }

  buildResponse(res, {
    data: program,
    message: 'Programa académico obtenido correctamente',
    status: 200,
  });
});

// 404 catch-all
app.use((req, res) => {
  buildResponse(res, { data: null, message: 'Ruta no encontrada', status: 404 });
});

app.listen(PORT, () => {
  console.log(` Servidor UNINTER corriendo en http://localhost:${PORT}`);
  console.log(` → GET /api/programs`);
});
