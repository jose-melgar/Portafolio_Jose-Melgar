import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DataService } from '../../services/data.service';

// Interface para la información personal
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



@Component({
  selector: 'app-about',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './about.component.html',
  styleUrl: './about.component.css'
})
export class AboutComponent implements OnInit {
  
  personalInfo: PersonalInfo | null = null;
  loadingPersonal = true;
  errorPersonal = false;
  profileImageLoaded = true;

  constructor(private dataService: DataService) {}

  ngOnInit(): void {
    this.loadPersonalData();
  }

  onProfileImageLoad(success: boolean): void {
    this.profileImageLoaded = success;
  }

  loadPersonalData(): void {
    this.dataService.getPersonalInfo().subscribe({
      next: (data) => {
        if (data.error) {
          this.errorPersonal = true;
        } else {
          this.personalInfo = data.personalInfo;
        }
        this.loadingPersonal = false;
      },
      error: (err) => {
        this.errorPersonal = true;
        this.loadingPersonal = false;
      }
    });
  }
}
