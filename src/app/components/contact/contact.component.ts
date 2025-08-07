import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface RedSocial {
  id: number;
  nombre: string;
  url: string;
  icono: string;
  color: string;
}

interface ContactInfo {
  email: string;
  telefono: string;
  ubicacion: string;
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
  
  contactInfo: ContactInfo = {
    email: 'jose.melgar@example.com',
    telefono: '+51 999 888 777',
    ubicacion: 'Lima, Perú',
    disponibilidad: true
  };

  redesSociales: RedSocial[] = [
    {
      id: 1,
      nombre: 'LinkedIn',
      url: 'https://linkedin.com/in/jose-melgar',
      icono: 'linkedin',
      color: '#0077b5'
    },
    {
      id: 2,
      nombre: 'GitHub',
      url: 'https://github.com/jose-melgar',
      icono: 'github',
      color: '#333'
    },
    {
      id: 3,
      nombre: 'Twitter',
      url: 'https://twitter.com/jose-melgar',
      icono: 'twitter',
      color: '#1da1f2'
    },
    {
      id: 4,
      nombre: 'Email',
      url: 'mailto:jose.melgar@example.com',
      icono: 'email',
      color: '#ea4335'
    }
  ];

  formData = {
    nombre: '',
    email: '',
    asunto: '',
    mensaje: ''
  };

  constructor() {}

  ngOnInit(): void {
    console.log('Información de contacto cargada:', this.contactInfo);
  }

  enviarMensaje(): void {
    console.log('Mensaje enviado:', this.formData);
    // Aquí se implementaría la lógica para enviar el mensaje
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
