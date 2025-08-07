import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

// Interfaces similares a la estructura de MusiConnect_API
interface PersonalInfo {
  id: number;
  nombre: string;
  apellidos: string;
  titulo: string;
  email: string;
  ubicacion: string;
  bio: string;
  disponibilidad: boolean;
  redesSociales: RedSocial[];
  habilidades: Habilidad[];
  experiencia: Experiencia[];
  educacion: Educacion[];
}

interface RedSocial {
  id: number;
  nombre: string;
  url: string;
  icono: string;
}

interface Habilidad {
  id: number;
  nombre: string;
  categoria: string;
  nivel: number; // 1-5
  descripcion: string;
}

interface Experiencia {
  id: number;
  titulo: string;
  empresa: string;
  fechaInicio: string;
  fechaFin?: string;
  descripcion: string;
  tecnologias: string[];
}

interface Educacion {
  id: number;
  titulo: string;
  institucion: string;
  fechaInicio: string;
  fechaFin?: string;
  descripcion: string;
}

@Component({
  selector: 'app-about',
  imports: [CommonModule],
  templateUrl: './about.component.html',
  styleUrl: './about.component.css'
})
export class AboutComponent implements OnInit {
  
  personalInfo: PersonalInfo = {
    id: 1,
    nombre: 'José Guillermo',
    apellidos: 'Melgar Puertas',
    titulo: 'Desarrollador Full Stack',
    email: 'jose.melgar@example.com',
    ubicacion: 'Lima, Perú',
    bio: 'Desarrollador Full Stack apasionado por crear soluciones innovadoras y experiencias digitales excepcionales. Especializado en Angular, Spring Boot y tecnologías modernas.',
    disponibilidad: true,
    redesSociales: [
      {
        id: 1,
        nombre: 'LinkedIn',
        url: 'https://linkedin.com/in/jose-melgar',
        icono: 'linkedin'
      },
      {
        id: 2,
        nombre: 'GitHub',
        url: 'https://github.com/jose-melgar',
        icono: 'github'
      },
      {
        id: 3,
        nombre: 'Email',
        url: 'mailto:jose.melgar@example.com',
        icono: 'email'
      }
    ],
    habilidades: [
      {
        id: 1,
        nombre: 'Angular',
        categoria: 'Frontend',
        nivel: 4,
        descripcion: 'Framework de desarrollo frontend'
      },
      {
        id: 2,
        nombre: 'Spring Boot',
        categoria: 'Backend',
        nivel: 4,
        descripcion: 'Framework de desarrollo backend'
      },
      {
        id: 3,
        nombre: 'Java',
        categoria: 'Backend',
        nivel: 5,
        descripcion: 'Lenguaje de programación principal'
      },
      {
        id: 4,
        nombre: 'TypeScript',
        categoria: 'Frontend',
        nivel: 4,
        descripcion: 'Lenguaje de programación tipado'
      },
      {
        id: 5,
        nombre: 'MySQL',
        categoria: 'Base de Datos',
        nivel: 4,
        descripcion: 'Sistema de gestión de bases de datos'
      },
      {
        id: 6,
        nombre: 'Docker',
        categoria: 'DevOps',
        nivel: 3,
        descripcion: 'Plataforma de contenedores'
      }
    ],
    experiencia: [
      {
        id: 1,
        titulo: 'Desarrollador Full Stack',
        empresa: 'Empresa Tecnológica',
        fechaInicio: '2023-01',
        fechaFin: '2024-01',
        descripcion: 'Desarrollo de aplicaciones web completas usando Angular y Spring Boot',
        tecnologias: ['Angular', 'Spring Boot', 'MySQL', 'Docker']
      },
      {
        id: 2,
        titulo: 'Desarrollador Backend',
        empresa: 'Startup Innovadora',
        fechaInicio: '2022-06',
        fechaFin: '2022-12',
        descripcion: 'Desarrollo de APIs RESTful y microservicios',
        tecnologias: ['Java', 'Spring Boot', 'PostgreSQL', 'Redis']
      }
    ],
    educacion: [
      {
        id: 1,
        titulo: 'Ingeniería de Sistemas',
        institucion: 'Universidad Nacional',
        fechaInicio: '2018-03',
        fechaFin: '2023-12',
        descripcion: 'Formación en desarrollo de software y sistemas informáticos'
      },
      {
        id: 2,
        titulo: 'Certificación Angular',
        institucion: 'Platzi',
        fechaInicio: '2023-06',
        fechaFin: '2023-08',
        descripcion: 'Curso completo de Angular y TypeScript'
      }
    ]
  };

  constructor() {}

  ngOnInit(): void {
    // Aquí se podría cargar la información desde un servicio
    console.log('Información personal cargada:', this.personalInfo);
  }

  getHabilidadesPorCategoria(categoria: string): Habilidad[] {
    return this.personalInfo.habilidades.filter(h => h.categoria === categoria);
  }

  getCategoriasUnicas(): string[] {
    return [...new Set(this.personalInfo.habilidades.map(h => h.categoria))];
  }

  getNivelEstrellas(nivel: number): string {
    return '★'.repeat(nivel) + '☆'.repeat(5 - nivel);
  }
}
