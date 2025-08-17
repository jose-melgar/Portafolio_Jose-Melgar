import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DataService } from '../../services/data.service';

interface Habilidad {
  id: number;
  nombre: string;
  categoria: string;
  nivel: number; // 1-5
  descripcion: string;
  certificado?: string;
}

@Component({
  selector: 'app-skills',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './skills.component.html',
  styleUrl: './skills.component.css'
})
export class SkillsComponent implements OnInit {
  
  habilidades: Habilidad[] = [];
  
  // Estados de carga
  loadingSkills = true;
  
  // Estados de error
  errorSkills = false;

  constructor(private dataService: DataService) {}

  ngOnInit(): void {
    this.loadSkillsData();
  }
  
  loadSkillsData(): void {
    this.dataService.getSkills().subscribe({
      next: (data) => {
        if (data.error) {
          this.errorSkills = true;
        } else {
          this.habilidades = data.habilidades;
          console.log('Habilidades cargadas:', this.habilidades);
        }
        this.loadingSkills = false;
      },
      error: (err) => {
        console.error('Error al cargar habilidades:', err);
        this.errorSkills = true;
        this.loadingSkills = false;
      }
    });
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
