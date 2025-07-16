import { Component } from '@angular/core';

@Component({
  selector: 'app-form-registro',
  imports: [
    MaterialModule,
  ],
  templateUrl: './form-registro.component.html',
  styleUrl: './form-registro.component.css'
})
export class FormRegistroComponent {

}

import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import {MaterialModule} from '../../../material/material.module';

@Component({
  selector: 'app-crear-solicitud',
  templateUrl: './crear-solicitud.component.html',
  styleUrls: ['./crear-solicitud.component.css']
})
export class CrearSolicitudComponent {
  solicitudForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.solicitudForm = this.fb.group({
      titulo: ['', Validators.required],
      tipo: ['Repuestos'],
      fecha: [new Date()],
      solicitante: ['Juan Perez'],
      area: ['Taller'],
      prioridad: ['Alta'],
      items: this.fb.array([])
    });
    this.agregarItem(); // inicia con un ítem
  }

  get items(): FormArray {
    return this.solicitudForm.get('items') as FormArray;
  }

  agregarItem(): void {
    const item = this.fb.group({
      nombre: ['', Validators.required],
      unidades: [1, [Validators.required, Validators.min(1)]],
      descripcion: ['']
    });
    this.items.push(item);
  }

  enviarSolicitud(): void {
    if (this.solicitudForm.valid) {
      console.log(this.solicitudForm.value);
      // aquí puedes llamar al servicio para guardar la solicitud
    }
  }
}
