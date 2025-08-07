import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private http: HttpClient) { }

  // Cargar información personal
  getPersonalInfo(): Observable<any> {
    return this.http.get('assets/about/personal-info.json')
      .pipe(
        catchError(error => {
          console.error('Error cargando información personal:', error);
          return of({ error: 'Falla al encontrar data' });
        })
      );
  }

  // Cargar habilidades
  getSkills(): Observable<any> {
    return this.http.get('assets/skills/skills-data.json')
      .pipe(
        catchError(error => {
          console.error('Error cargando habilidades:', error);
          return of({ error: 'Falla al encontrar data' });
        })
      );
  }

  // Cargar proyectos
  getProjects(): Observable<any> {
    return this.http.get('assets/projects/projects-data.json')
      .pipe(
        catchError(error => {
          console.error('Error cargando proyectos:', error);
          return of({ error: 'Falla al encontrar data' });
        })
      );
  }

  // Cargar educación
  getEducation(): Observable<any> {
    return this.http.get('assets/education/education-data.json')
      .pipe(
        catchError(error => {
          console.error('Error cargando educación:', error);
          return of({ error: 'Falla al encontrar data' });
        })
      );
  }

  // Cargar información de contacto
  getContactInfo(): Observable<any> {
    return this.http.get('assets/contact/contact-data.json')
      .pipe(
        catchError(error => {
          console.error('Error cargando información de contacto:', error);
          return of({ error: 'Falla al encontrar data' });
        })
      );
  }
}
