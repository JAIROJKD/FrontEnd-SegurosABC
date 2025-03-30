import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { provideClientHydration, withEventReplay } from '@angular/platform-browser';
import { provideHttpClient } from '@angular/common/http'; // ✅ Importamos el módulo HTTP

// Importa el HeaderComponent
//import { HeaderComponent } from './components/header/header.component';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideHttpClient(), // ✅ Agregamos el cliente HTTP
    provideClientHydration(withEventReplay())
  ]
  //imports: [HeaderComponent] // Agrega el HeaderComponent aquí
};

