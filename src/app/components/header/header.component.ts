import { Component, ViewContainerRef, ViewChild, ComponentRef, HostListener, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AboutComponent } from '../about/about.component';
import { SkillsComponent } from '../skills/skills.component';
import { ProjectsComponent } from '../projects/projects.component';
import { EducationComponent } from '../education/education.component';
import { ContactComponent } from '../contact/contact.component';

interface NavItem {
  sectionId: string;
  label: string;
  icon: string;
  component: any;
}

interface ComponentInfo {
  component: any;
  name: string;
  ref?: ComponentRef<any>;
}

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent implements OnInit, OnDestroy {
  @ViewChild('dynamicComponentContainer', { read: ViewContainerRef, static: true })
  dynamicComponentContainer!: ViewContainerRef;
  
  navItems: NavItem[] = [
    { sectionId: 'about', label: 'Sobre Mí', icon: '👤', component: AboutComponent },
    { sectionId: 'skills', label: 'Habilidades', icon: '💻', component: SkillsComponent },
    { sectionId: 'projects', label: 'Proyectos', icon: '🚀', component: ProjectsComponent },
    { sectionId: 'education', label: 'Educación', icon: '🎓', component: EducationComponent },
    { sectionId: 'contact', label: 'Contacto', icon: '📧', component: ContactComponent }
  ];

  currentComponentIndex = 0;
  currentComponentRef: ComponentRef<any> | null = null;
  isTransitioning = false;

  isMenuOpen = false;

  ngOnInit(): void {
    this.loadComponent(0);
  }

  ngOnDestroy(): void {
    if (this.currentComponentRef) {
      this.currentComponentRef.destroy();
    }
  }

  toggleMenu(): void {
    this.isMenuOpen = !this.isMenuOpen;
  }

  closeMenu(): void {
    this.isMenuOpen = false;
  }

  navigateToSection(sectionId: string): void {
    const index = this.navItems.findIndex(item => item.sectionId === sectionId);
    if (index !== -1) {
      this.loadComponent(index);
    }
    this.closeMenu();
  }

  loadComponent(index: number): void {
    if (this.isTransitioning || index < 0 || index >= this.navItems.length) {
      return;
    }

    this.isTransitioning = true;
    this.currentComponentIndex = index;

    // Limpiar componente anterior
    if (this.currentComponentRef) {
      this.currentComponentRef.destroy();
    }

    // Cargar nuevo componente
    const componentToLoad = this.navItems[index].component;
    this.currentComponentRef = this.dynamicComponentContainer.createComponent(componentToLoad);

    // Simular transición
    setTimeout(() => {
      this.isTransitioning = false;
    }, 300);
  }

  nextComponent(): void {
    const nextIndex = (this.currentComponentIndex + 1) % this.navItems.length;
    this.loadComponent(nextIndex);
  }

  previousComponent(): void {
    const prevIndex = this.currentComponentIndex === 0 
      ? this.navItems.length - 1 
      : this.currentComponentIndex - 1;
    this.loadComponent(prevIndex);
  }

  @HostListener('keydown', ['$event'])
  onKeyDown(event: KeyboardEvent): void {
    if (this.isTransitioning) {
      return;
    }

    // Solo navegación con teclas específicas (opcional)
    switch (event.key) {
      case 'Home':
        event.preventDefault();
        this.loadComponent(0);
        break;
      case 'End':
        event.preventDefault();
        this.loadComponent(this.navItems.length - 1);
        break;
    }
  }

  getCurrentComponentName(): string {
    return this.navItems[this.currentComponentIndex]?.label || '';
  }
}
