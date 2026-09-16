// src/data/cv.ts

export interface Proyecto {
  id: string;
  titulo: string;
  rol: string;
  tipo: string;
  descripcion?: string;
  puntosClave: string[];
  tecnologias: string[];
  enlaceGithub?: string;
  enlaceDemo?: string;
  esDestacado?: boolean;
  esPlaceholder?: boolean;
}

export interface Referencia {
  nombre: string;
  cargo: string;
  contacto: string;
}

export interface CVData {
  perfil: {
    nombre: string;
    titulo: string;
    institucion: string;
    ubicacion: string;
    email: string;
    telefono: string;
    github: string;
    linkedin: string;
    cvPdfUrl: string;
    bioParrafo1: string;
    bioParrafo2: string;
  };
  ingles: {
    nivel: string;
    institucion: string;
    modalidad?: string;
  };
  proyectos: Proyecto[];
  habilidades: {
    lenguajes: string[];
    frontend: string[];
    backend: string[];
    basesDeDatos: string[];
    herramientas: string[];
  };
  referencias: Referencia[];
  informacionAdicional: {
    conadis: string;
  };
}

export const cvData: CVData = {
  perfil: {
    nombre: "Gabriel Escobar",
    titulo: "Tecnólogo Superior en Desarrollo de Software",
    institucion: "Escuela Politécnica Nacional (EPN)",
    ubicacion: "Quito, Ecuador",
    email: "gabrielescobar283@gmail.com",
    telefono: "+593 994301752",
    github: "https://github.com/GabrielEsc23",
    linkedin: "https://www.linkedin.com/in/gabriel-escobar-52b066188/",
    cvPdfUrl: "\Hoja de vida Gabriel Escobar.pdf",
    bioParrafo1:
      "Tecnólogo Superior en Desarrollo de Software con sólida formación en desarrollo de aplicaciones web, desarrollo móvil, Internet de las Cosas (IoT) y fundamentos de inteligencia artificial.",
    bioParrafo2:
      "Cuento con experiencia en el diseño e implementación de soluciones de software mediante tecnologías como Node.js, React, Java, Python y MongoDB. Busco integrarme a un equipo donde pueda aportar, aprender nuevas tecnologías y crecer profesionalmente."
  },

  ingles: {
    nivel: "Inglés — Académico",
    institucion: "Centro de Educación Continua (CEC - EPN)",
    modalidad: "Certificación Académica"
  },

  proyectos: [
    {
      id: "gestion-curricular",
      titulo: "Sistema de Gestión de Proyectos de Integración Curricular",
      rol: "Backend Developer · Proyecto de tesis",
      tipo: "Proyecto Destacado",
      puntosClave: [
        "Plataforma web para la gestión, consulta y acceso a proyectos de integración curricular de la ESFOT, desarrollada mediante una API REST con <strong>Node.js, Express, MongoDB y JWT</strong>.",
        "El proyecto incorporó funcionalidades de gestión de usuarios y proyectos, autenticación y autorización basada en roles, favoritos, estadísticas, registro de actividad y un chatbot para búsqueda de proyectos y generación de ideas.",
        "También realicé una <strong>auditoría de seguridad basada en OWASP Top 10</strong>, utilizando <strong>Burp Suite</strong> para analizar el tráfico HTTP, revisar mecanismos de autenticación y autorización, identificar configuraciones inseguras y documentar recomendaciones."
      ],
      tecnologias: [
        "Node.js",
        "Express",
        "MongoDB",
        "Mongoose",
        "JWT",
        "REST API",
        "Cloudinary",
        "Groq",
        "OWASP",
        "Burp Suite"
      ],
      enlaceGithub: "https://github.com/GabrielEsc23",
      esDestacado: true,
      esPlaceholder: false
    },
    {
      id: "app-distribuida",
      titulo: "Aplicación Distribuida con Contenedores Docker",
      rol: "Software Developer",
      tipo: "Arquitectura & Backend",
      puntosClave: [
        "Aplicación web distribuida desarrollada con <strong>Python y Flask</strong>, utilizando Docker, NGINX y MySQL para implementar múltiples nodos, balanceo de carga y replicación de base de datos."
      ],
      tecnologias: ["Python", "Flask", "Docker", "Docker Compose", "NGINX", "MySQL"],
      enlaceGithub: "https://github.com/GabrielEsc23/Proyecto-final-Aplicaciones-Distribuidas",
      esDestacado: false,
      esPlaceholder: false
    },
    {
      id: "ecuguardian",
      titulo: "EcuGuardian — Reportes comunitarios de seguridad",
      rol: "Mobile & Backend Developer",
      tipo: "Proyecto Universitario Grupal",
      puntosClave: [
        "Aplicación móvil desarrollada en <strong>Flutter</strong> como proyecto universitario grupal, orientada al registro y consulta de incidentes de seguridad mediante ubicación GPS, fotografías y mapas.",
        "<strong>Mi aporte:</strong> gestión de usuarios y perfiles, integración de fotografía y GPS, y desarrollo del módulo de zonas de seguridad."
      ],
      tecnologias: ["Flutter", "Dart", "Supabase", "Google Maps API", "Provider"],
      enlaceGithub: "https://github.com/Eddy-Morales/app_guardian",
      esDestacado: false,
      esPlaceholder: false
    },
    {
      id: "epic-rides",
      titulo: "Epic Rides — Paseos en Bicicleta & Rutas Guiadas",
      rol: "Frontend Developer",
      tipo: "Landing Page · En Desarrollo",
      puntosClave: [
        "Landing page moderna para un negocio de paseos y experiencias cicloturísticas, desarrollada con <strong>Astro</strong> para máxima velocidad de carga y componentes reutilizables.",
        "Diseño responsivo orientado a la conversión y presentación visual de rutas de aventura.",
        "Despliegue activo en fase de prueba en Render (provisional)."
      ],
      tecnologias: ["Astro", "Tailwind CSS", "JavaScript", "Render"],
      enlaceGithub: "https://github.com/GabrielEsc23/EPIC-RIDES",
      enlaceDemo: "https://epic-rides.onrender.com/",
      esDestacado: false,
      esPlaceholder: true
    }
  ],

  habilidades: {
    lenguajes: ["JavaScript", "TypeScript", "Python", "Dart", "Java", "C++", "HTML5", "CSS3"],
    frontend: ["React", "Astro", "Tailwind CSS", "Flutter"],
    backend: ["Node.js", "Express.js", "Flask", "REST APIs", "JWT", "Mongoose"],
    basesDeDatos: ["MongoDB", "MySQL", "Supabase", "SQL Relacional"],
    herramientas: [
      "Docker",
      "NGINX",
      "Git",
      "GitHub",
      "Linux",
      "Burp Suite",
      
    ]
  },

  referencias: [
    {
      nombre: "Josselyn Obando",
      cargo: "Consejería de España en Ecuador",
      contacto: "+593 991685404"
    },
    {
      nombre: "Ing. Lorena Chulde",
      cargo: "Docente Desarrollo de Software - EPN",
      contacto: "+593 996603406"
    },
    {
      nombre: "Ing. Yadira Franco Mg.",
      cargo: "Docente Desarrollo de Software - EPN",
      contacto: "+593 982366357"
    }
  ],

  informacionAdicional: {
    conadis: "Discapacidad física reconocida (57%), carnet emitido por CONADIS."
  }
};
