import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DataService } from '../../services/data.service';

interface Proyecto {
  id: number;
  titulo: string;
  descripcion: string;
  tecnologias: string[];
  imagen?: string;
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
  
  proyectos: Proyecto[] = [];
  loadingProjects = true;
  errorProjects = false;

  constructor(private dataService: DataService) {}

  ngOnInit(): void {
    this.loadProjectsData();
  }
  
  loadProjectsData(): void {
    this.dataService.getProjects().subscribe({
      next: (data) => {
        if (data.error) {
          this.errorProjects = true;
        } else {
          this.proyectos = data.proyectos;
        }
        this.loadingProjects = false;
      },
      error: (err) => {
        this.errorProjects = true;
        this.loadingProjects = false;
      }
    });
  }

  getProyectosPorCategoria(categoria: string): Proyecto[] {
    return this.proyectos.filter(p => p.categoria === categoria);
  }

  getCategoriasUnicas(): string[] {
    return [...new Set(this.proyectos.map(p => p.categoria))];
  }
}
