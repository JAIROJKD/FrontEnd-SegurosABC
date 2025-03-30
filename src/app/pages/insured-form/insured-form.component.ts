import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { InsuredService } from '../../services/insured.service';
import { Component, EventEmitter, Output, inject, OnInit } from '@angular/core';

// Importamos Angular Material
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-insured-form',
  standalone: true,
  templateUrl: './insured-form.component.html',
  styleUrls: ['./insured-form.component.css'],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule
  ],
})
export class InsuredFormComponent implements OnInit {
  insuredForm: FormGroup;
  loading = false;
  successMessage = '';
  errorMessage = '';
  selectedInsured: any = null;  // Asegurado seleccionado para edición

  private fb = inject(FormBuilder);
  private insuredService = inject(InsuredService);

  @Output() onSave = new EventEmitter<void>(); // 🔥 Evento para actualizar la lista de asegurados

  constructor() {
    this.insuredForm = this.fb.group({
      idNumber: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(15)]],
      firstName: ['', [Validators.required, Validators.pattern('^[A-Za-zÁáÉéÍíÓóÚúÑñ ]+$')]], // Solo letras y espacios
      middleName: ['', [Validators.pattern('^[^0-9]+$')]], // No números
      firstLastName: ['', [Validators.required, Validators.pattern('^[^0-9]+$')]], // No números
      middleLastName: ['', [Validators.required, Validators.pattern('^[^0-9]+$')]], // No números
      contactPhone: ['', [Validators.required, Validators.pattern('^[0-9]+$'), Validators.minLength(7), Validators.maxLength(15)]],
      email: ['', [Validators.required, Validators.email]], // Validación de email
      dateOfBirth: ['', [Validators.required, Validators.pattern('^\\d{4}-\\d{2}-\\d{2}$')]], // Formato YYYY-MM-DD
      estimatedValue: ['', [Validators.required, Validators.pattern('^[0-9]+$'), Validators.min(1000), Validators.max(100000000)]],
      observations: [''] // 🔹 Opcional
    });
  }

  get formControls() {
    return this.insuredForm.controls;
  }

  ngOnInit() {
    this.insuredService.selectedInsured$.subscribe((insured) => {
      if (insured) {
        this.selectedInsured = insured;
        this.insuredForm.patchValue(insured);
      }
    });
  }

  submitForm() {
    if (this.insuredForm.valid) {
      this.loading = true;
      this.successMessage = '';
      this.errorMessage = '';

      if (this.selectedInsured) {
        // Modo edición: actualizar asegurado
        this.insuredService.updateInsured(this.selectedInsured.idNumber, this.insuredForm.value).subscribe({
          next: () => {
            this.successMessage = '✅ Asegurado actualizado correctamente.';
            this.clearForm();
            this.onSave.emit(); // 🔥 Notificar actualización de la lista
          },
          error: () => {
            this.errorMessage = '❌ Error al actualizar asegurado.';
          },
          complete: () => {
            this.loading = false;
          },
        });
      } else {
        // Modo creación: registrar nuevo asegurado
        this.insuredService.createInsured(this.insuredForm.value).subscribe({
          next: () => {
            this.successMessage = '✅ Asegurado registrado correctamente.';
            this.clearForm();
            this.onSave.emit(); // 🔥 Notificar actualización de la lista
          },
          error: () => {
            this.errorMessage = '❌ Error al registrar asegurado.';
          },
          complete: () => {
            this.loading = false;
          },
        });
      }
    } else {
      this.errorMessage = '⚠️ El formulario contiene errores.';
    }
  }

  loadInsuredData(insured: any) {
    console.log('Datos recibidos para edición:', insured);

    let formattedDate = '';

    if (insured.dateOfBirth) {
      const date = new Date(insured.dateOfBirth);
      formattedDate = date.toISOString().split('T')[0]; // Extrae solo YYYY-MM-DD
    }

    console.log('Fecha formateada:', formattedDate); // Depuración

    this.insuredForm.patchValue({
      ...insured,
      dateOfBirth: formattedDate
    });
  }

  // Método para limpiar el formulario y resetear la selección
  clearForm() {
    this.insuredForm.reset();
    this.selectedInsured = null;
    this.insuredService.setSelectedInsured(null);
  }
}