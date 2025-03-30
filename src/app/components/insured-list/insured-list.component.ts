import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { InsuredService } from '../../services/insured.service';


@Component({
  selector: 'app-insured-list',
  standalone: true,
  imports: [CommonModule, MatTableModule, MatButtonModule, MatCardModule, MatFormFieldModule, MatInputModule],
  templateUrl: './insured-list.component.html',
  styleUrls: ['./insured-list.component.css']
})
export class InsuredListComponent implements OnInit {
  displayedColumns: string[] = ['idNumber', 'firstName', 'firstLastName', 'email', 'contactPhone', 'estimatedValue', 'actions'];
  insureds: any[] = [];
  filteredInsureds: any[] = []; // Nueva lista para filtrado
  searchValue: string = ''; // Valor del campo de búsqueda

  private insuredService = inject(InsuredService);

  ngOnInit() {
    this.loadInsureds();
  }

  loadInsureds() {
    this.insuredService.getInsureds().subscribe({
      next: (data) => {
        this.insureds = data;
        this.filteredInsureds = data; // Inicializa la lista con todos los asegurados
      },
      error: (err) => {
        console.error('Error al obtener asegurados', err);
      }
    });
  }

  deleteInsured(id: number) {
    if (confirm('¿Seguro que quieres eliminar este asegurado?')) {
      this.insuredService.deleteInsured(id).subscribe({
        next: () => {          
          this.loadInsureds(); // 🔄 Recargar la tabla después de eliminar
        },
        error: (err) => {
          console.error('Error al eliminar asegurado', err);
        }
      });
    }
  }

  // Método para enviar el asegurado seleccionado al formulario de edición
  editInsured(insured: any) {
    this.insuredService.setSelectedInsured(insured);
  }

  // 📌 Método para filtrar asegurados por número de identificación
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value.trim();

    if (filterValue) {
      this.filteredInsureds = this.insureds.filter(insured => 
        insured.idNumber.toString().includes(filterValue)
      );
    } else {
      this.filteredInsureds = [...this.insureds]; // Restaurar lista completa si el filtro está vacío
    }
  }
}