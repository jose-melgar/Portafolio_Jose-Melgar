import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DataService } from '../../services/data.service';

interface Educacion {
  id: number;
  titulo: string;
  institucion: string;
  fechaInicio: string;
  fechaFin?: string;
  descripcion: string;
  tipo: string;
  certificado?: string;
}

@Component({
  selector: 'app-education',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './education.component.html',
  styleUrl: './education.component.css'
})
export class EducationComponent implements OnInit {
  
  educacion: Educacion[] = [];
  
  loadingEducation = true;
  errorEducation = false;

  constructor(private dataService: DataService) {}

  ngOnInit(): void {
    this.loadEducationData();
  }
  
  loadEducationData(): void {
    this.dataService.getEducation().subscribe({
      next: (data) => {
        if (data.error) {
          this.errorEducation = true;
        } else {
          this.educacion = data.educacion;
        }
        this.loadingEducation = false;
      },
      error: (err) => {
        this.errorEducation = true;
        this.loadingEducation = false;
      }
    });
  }

  getEducacionPorTipo(tipo: string): Educacion[] {
    return this.educacion.filter(e => e.tipo === tipo);
  }

  getTiposUnicos(): string[] {
    return [...new Set(this.educacion.map(e => e.tipo))];
  }

  getTipoDisplay(tipo: string): string {
    const tipos = {
      'formal': 'Educación Formal',
      'certificado': 'Certificados',
      'certificacion': 'Certificaciones',
      'curso': 'Cursos y Talleres'
    };
    return tipos[tipo as keyof typeof tipos] || tipo;
  }
}
