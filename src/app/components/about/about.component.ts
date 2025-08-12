import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DataService } from '../../services/data.service';

// Interfaces que coinciden con la estructura de los archivos JSON
interface PersonalInfo {
  id: number;
  nombre: string;
  apellidos: string;
  titulo: string;
  email: string;
  ubicacion: string;
  bio: string;
  disponibilidad: boolean;
  estado: string;
  fraseMotivacional: string;
  logros: string[];
  tecnologiasFavoritas: string[];
}

interface RedSocial {
  id: number;
  nombre: string;
  url: string;
  icono: string;
  color?: string;
}

interface Habilidad {
  id: number;
  nombre: string;
  categoria: string;
  nivel: number; // 1-5
  descripcion: string;
  certificado?: string;
}

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

interface ContactInfo {
  email: string;
  telefono: string;
  ubicacion: string;
  github: string;
  linkedin: string;
  disponibilidad: boolean;
}



@Component({
  selector: 'app-about',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './about.component.html',
  styleUrl: './about.component.css'
})
export class AboutComponent implements OnInit {
  
  // Datos de cada sección
  personalInfo: PersonalInfo | null = null;
  habilidades: Habilidad[] = [];
  proyectos: Proyecto[] = [];
  educacion: Educacion[] = [];
  contactInfo: ContactInfo | null = null;
  redesSociales: RedSocial[] = [];

  // Estados de carga
  loadingPersonal = true;
  loadingSkills = true;
  loadingProjects = true;
  loadingEducation = true;
  loadingContact = true;

  // Estados de error
  errorPersonal = false;
  errorSkills = false;
  errorProjects = false;
  errorEducation = false;
  errorContact = false;

  // Estado de la imagen de perfil
  profileImageLoaded = true; // Inicialmente asumimos que la imagen cargará

  constructor(private dataService: DataService) {}

  ngOnInit(): void {
    this.loadAllData();
  }

  // Método para manejar la carga de la imagen de perfil
  onProfileImageLoad(success: boolean): void {
    this.profileImageLoaded = success;
  }

  loadAllData(): void {
    // Cargar información personal
    this.dataService.getPersonalInfo().subscribe({
      next: (data) => {
        if (data.error) {
          this.errorPersonal = true;
        } else {
          this.personalInfo = data.personalInfo;
          console.log('Información personal cargada:', this.personalInfo);
        }
        this.loadingPersonal = false;
      },
      error: (err) => {
        console.error('Error al cargar información personal:', err);
        this.errorPersonal = true;
        this.loadingPersonal = false;
      }
    });

    // Cargar habilidades
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

    // Cargar proyectos
    this.dataService.getProjects().subscribe({
      next: (data) => {
        if (data.error) {
          this.errorProjects = true;
        } else {
          this.proyectos = data.proyectos;
          console.log('Proyectos cargados:', this.proyectos);
        }
        this.loadingProjects = false;
      },
      error: (err) => {
        console.error('Error al cargar proyectos:', err);
        this.errorProjects = true;
        this.loadingProjects = false;
      }
    });

    // Cargar educación
    this.dataService.getEducation().subscribe({
      next: (data) => {
        if (data.error) {
          this.errorEducation = true;
        } else {
          this.educacion = data.educacion;
          console.log('Educación cargada:', this.educacion);
        }
        this.loadingEducation = false;
      },
      error: (err) => {
        console.error('Error al cargar educación:', err);
        this.errorEducation = true;
        this.loadingEducation = false;
      }
    });

    // Cargar información de contacto
    this.dataService.getContactInfo().subscribe({
      next: (data) => {
        if (data.error) {
          this.errorContact = true;
        } else {
          this.contactInfo = data.contactInfo;
          this.redesSociales = data.redesSociales;
          console.log('Información de contacto cargada:', this.contactInfo);
          console.log('Redes sociales cargadas:', this.redesSociales);
        }
        this.loadingContact = false;
      },
      error: (err) => {
        console.error('Error al cargar información de contacto:', err);
        this.errorContact = true;
        this.loadingContact = false;
      }
    });
  }

  // Métodos auxiliares
  getHabilidadesPorCategoria(categoria: string): Habilidad[] {
    return this.habilidades.filter(h => h.categoria === categoria);
  }

  getCategoriasUnicas(): string[] {
    return [...new Set(this.habilidades.map(h => h.categoria))];
  }

  getNivelEstrellas(nivel: number): string {
    return '★'.repeat(nivel) + '☆'.repeat(5 - nivel);
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
