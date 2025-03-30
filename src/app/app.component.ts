import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './components/header/header.component';
import { InsuredFormComponent } from './pages/insured-form/insured-form.component';
import { InsuredListComponent } from './components/insured-list/insured-list.component'; // 👈 Importamos el nuevo componente

@Component({
  selector: 'app-root',
  standalone: true, // ✅ Componente independiente
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  imports: [RouterOutlet, HeaderComponent, InsuredFormComponent, InsuredListComponent], // ✅ Agregamos InsuredListComponent
})
export class AppComponent {
  title = 'InsuredABC-FrontEnd';
}
