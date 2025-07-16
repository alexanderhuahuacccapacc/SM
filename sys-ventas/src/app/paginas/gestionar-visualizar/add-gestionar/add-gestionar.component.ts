import { Component } from '@angular/core';
import {MaterialModule} from '../../../material/material.module';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';

class Solicitud {
  id: number | undefined;
}

@Component({
  selector: 'app-add-gestionar',
  imports: [
    MaterialModule,
    ReactiveFormsModule,
  ],
  templateUrl: './add-gestionar.component.html',
  styleUrl: './add-gestionar.component.css'
})
export class AddGestionarComponent {
  form!: FormGroup;
  solicitudes: Solicitud[] = [];
  columnas: string[] = ['id', 'titulo', 'fecha', 'mecanico', 'prioridad', 'estado', 'acciones'];
  nextId = 1265;
  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      titulo: ['', Validators.required],
      fecha: ['', Validators.required],
      mecanico: ['', Validators.required],
      prioridad: ['Media', Validators.required],
      estado: ['Pendiente', Validators.required]
    });
  }

  // Agregar solicitud
  agregarSolicitud(): void {
    if (this.form.valid) {
      const nueva: Solicitud = {
        id: this.nextId++,
        ...this.form.value
      };
      this.solicitudes.push(nueva);
      this.form.reset({ prioridad: 'Media', estado: 'Pendiente' });
    }
  }

  // Eliminar
  eliminarSolicitud(id: number) {
    this.solicitudes = this.solicitudes.filter(s => s.id !== id);
  }

  // Editar simple
  editarSolicitud(solicitud: Solicitud) {
    this.form.patchValue(solicitud);
    if (solicitud.id != null) {
      this.eliminarSolicitud(solicitud.id);
    } // para reinsertar actualizado
  }

}
