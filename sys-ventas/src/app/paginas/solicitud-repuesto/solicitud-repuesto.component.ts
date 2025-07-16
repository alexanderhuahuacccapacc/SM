import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {MatFormField, MatInput, MatInputModule} from '@angular/material/input';
import {MatOption} from '@angular/material/core';
import {MatButton} from '@angular/material/button';
import {MatSelect, MatSelectModule} from '@angular/material/select';
import {MatFormFieldModule} from '@angular/material/form-field';

@Component({
  selector: 'app-solicitud-repuesto-form',
  templateUrl: './solicitud-repuesto.component.html',
  imports: [
    MatOption,
    MatInput,
    MatSelect,
    MatFormField,
    ReactiveFormsModule,
    MatButton,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
  ],
  styleUrls: ['./solicitud-repuesto.component.css']
})
export class SolicitudRepuestoFormComponent implements OnInit {
  solicitudForm!: FormGroup;

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.solicitudForm = this.fb.group({
      fecha: [new Date().toISOString().substring(0, 10), Validators.required],
      cantidad: ['', [Validators.required, Validators.min(1)]],
      motivo: ['', [Validators.required, Validators.maxLength(200)]],
      estado: ['Pendiente', Validators.required],
      usuarioId: [null, Validators.required],
      repuestoId: [null, Validators.required],
      busId: [null, Validators.required]
    });
  }

  onSubmit(): void {
    if (this.solicitudForm.valid) {
      console.log(this.solicitudForm.value);
      // Aquí se envía al backend usando HttpClient
    }
  }
}
