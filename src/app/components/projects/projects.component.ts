import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

interface Proyecto {
  id: number;
  titulo: string;
  descripcion: string;
  tecnologias: string[];
  imagen: string;
  urlDemo?: string;
  urlGitHub?: string;
  categoria: string;
  fecha: string;
}

@Component({
  selector: 'app-projects',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './projects.component.html',
  styleUrl: './projects.component.css'
})
export class ProjectsComponent implements OnInit {
  
  proyectos: Proyecto[] = [
    {
      id: 1,
      titulo: 'MusiConnect API',
      descripcion: 'API RESTful para conectar músicos y bandas. Desarrollado con Spring Boot, Angular y MySQL.',
      tecnologias: ['Spring Boot', 'Angular', 'MySQL', 'Docker'],
      imagen: 'assets/images/musiconnect.jpg',
      urlDemo: 'https://musiconnect-demo.com',
      urlGitHub: 'https://github.com/jose-melgar/musiconnect-api',
      categoria: 'Full Stack',
      fecha: '2024'
    },
    {
      id: 2,
      titulo: 'E-commerce Platform',
      descripcion: 'Plataforma de comercio electrónico completa con gestión de productos, carrito de compras y pagos.',
      tecnologias: ['Java', 'Spring Boot', 'React', 'PostgreSQL'],
      imagen: 'assets/images/ecommerce.jpg',
      urlDemo: 'https://ecommerce-demo.com',
      urlGitHub: 'https://github.com/jose-melgar/ecommerce',
      categoria: 'Backend',
      fecha: '2023'
    },
    {
      id: 3,
      titulo: 'Task Manager App',
      descripcion: 'Aplicación de gestión de tareas con interfaz intuitiva y funcionalidades avanzadas.',
      tecnologias: ['Angular', 'TypeScript', 'Bootstrap', 'LocalStorage'],
      imagen: 'assets/images/taskmanager.jpg',
      urlDemo: 'https://taskmanager-demo.com',
      urlGitHub: 'https://github.com/jose-melgar/task-manager',
      categoria: 'Frontend',
      fecha: '2023'
    }
  ];

  constructor() {}

  ngOnInit(): void {
    console.log('Proyectos cargados:', this.proyectos);
  }

  getProyectosPorCategoria(categoria: string): Proyecto[] {
    return this.proyectos.filter(p => p.categoria === categoria);
  }

  getCategoriasUnicas(): string[] {
    return [...new Set(this.proyectos.map(p => p.categoria))];
  }
}
