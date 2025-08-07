import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

interface NavItem {
  sectionId: string;
  label: string;
  icon: string;
}

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  
  navItems: NavItem[] = [
    { sectionId: 'about', label: 'Sobre Mí', icon: '👤' },
    { sectionId: 'skills', label: 'Habilidades', icon: '💻' },
    { sectionId: 'projects', label: 'Proyectos', icon: '🚀' },
    { sectionId: 'education', label: 'Educación', icon: '🎓' },
    { sectionId: 'contact', label: 'Contacto', icon: '📧' }
  ];

  isMenuOpen = false;

  toggleMenu(): void {
    this.isMenuOpen = !this.isMenuOpen;
  }

  closeMenu(): void {
    this.isMenuOpen = false;
  }

  scrollToSection(sectionId: string): void {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    this.closeMenu();
  }
}
