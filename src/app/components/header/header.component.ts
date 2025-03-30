import { Component } from '@angular/core';

@Component({
  selector: 'app-header',
  standalone: true, // ✅ Hace que este componente sea independiente
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent {}
