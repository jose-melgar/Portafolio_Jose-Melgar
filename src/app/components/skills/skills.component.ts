import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

interface Habilidad {
  id: number;
  nombre: string;
  categoria: string;
  nivel: number; // 1-5
  descripcion: string;
}

@Component({
  selector: 'app-skills',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './skills.component.html',
  styleUrl: './skills.component.css'
})
export class SkillsComponent implements OnInit {
  
  habilidades: Habilidad[] = [
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
  ];

  constructor() {}

  ngOnInit(): void {
    console.log('Habilidades cargadas:', this.habilidades);
  }

  getHabilidadesPorCategoria(categoria: string): Habilidad[] {
    return this.habilidades.filter(h => h.categoria === categoria);
  }

  getCategoriasUnicas(): string[] {
    return [...new Set(this.habilidades.map(h => h.categoria))];
  }

  getNivelEstrellas(nivel: number): string {
    return '★'.repeat(nivel) + '☆'.repeat(5 - nivel);
  }
}
