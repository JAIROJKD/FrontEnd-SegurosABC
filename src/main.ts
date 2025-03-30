import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { InsuredService } from './app/services/insured.service'; // ✅ Importa el servicio
import { provideHttpClient, withFetch } from '@angular/common/http';

bootstrapApplication(AppComponent, {
  providers: [provideHttpClient(withFetch()), InsuredService] // ✅ Agrega `withFetch()`
}).catch(err => console.error(err));
