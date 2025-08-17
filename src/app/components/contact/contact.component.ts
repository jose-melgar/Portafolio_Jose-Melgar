import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DataService } from '../../services/data.service';

interface RedSocial {
  id: number;
  nombre: string;
  url: string;
  icono: string;
  color?: string;
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
  selector: 'app-contact',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.css'
})
export class ContactComponent implements OnInit {
  
  contactInfo: ContactInfo | null = null;
  redesSociales: RedSocial[] = [];
  loadingContact = true;
  errorContact = false;

  formData = {
    nombre: '',
    email: '',
    asunto: '',
    mensaje: ''
  };

  constructor(private dataService: DataService) {}

  ngOnInit(): void {
    this.loadContactData();
  }
  
  loadContactData(): void {
    this.dataService.getContactInfo().subscribe({
      next: (data) => {
        if (data.error) {
          this.errorContact = true;
        } else {
          this.contactInfo = data.contactInfo;
          this.redesSociales = data.redesSociales;
        }
        this.loadingContact = false;
      },
      error: (err) => {
        this.errorContact = true;
        this.loadingContact = false;
      }
    });
  }

  enviarMensaje(): void {
    alert('Mensaje enviado correctamente!');
    this.limpiarFormulario();
  }

  limpiarFormulario(): void {
    this.formData = {
      nombre: '',
      email: '',
      asunto: '',
      mensaje: ''
    };
  }
}
