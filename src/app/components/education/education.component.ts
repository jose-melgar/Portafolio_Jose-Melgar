import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

interface Educacion {
  id: number;
  titulo: string;
  institucion: string;
  fechaInicio: string;
  fechaFin?: string;
  descripcion: string;
  tipo: string; // 'formal', 'certificacion', 'curso'
}

@Component({
  selector: 'app-education',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './education.component.html',
  styleUrl: './education.component.css'
})
export class EducationComponent implements OnInit {
  
  educacion: Educacion[] = [
    {
      id: 1,
      titulo: 'Ingeniería de Sistemas',
      institucion: 'Universidad Nacional',
      fechaInicio: '2018-03',
      fechaFin: '2023-12',
      descripcion: 'Formación en desarrollo de software y sistemas informáticos',
      tipo: 'formal'
    },
    {
      id: 2,
      titulo: 'Certificación Angular',
      institucion: 'Platzi',
      fechaInicio: '2023-06',
      fechaFin: '2023-08',
      descripcion: 'Curso completo de Angular y TypeScript',
      tipo: 'certificacion'
    },
    {
      id: 3,
      titulo: 'Spring Boot Masterclass',
      institucion: 'Udemy',
      fechaInicio: '2023-01',
      fechaFin: '2023-03',
      descripcion: 'Desarrollo de aplicaciones backend con Spring Boot',
      tipo: 'curso'
    }
  ];

  constructor() {}

  ngOnInit(): void {
    console.log('Educación cargada:', this.educacion);
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
      'certificacion': 'Certificaciones',
      'curso': 'Cursos y Talleres'
    };
    return tipos[tipo as keyof typeof tipos] || tipo;
  }
}
