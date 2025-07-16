import { Component, Inject, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {MatDialogRef, MAT_DIALOG_DATA, MatDialogTitle} from '@angular/material/dialog';
import {SolicitudRepuestoService} from '../../../servicio/solicitudrepuesto.service';
import {MatFormField, MatInput} from '@angular/material/input';
import {MatOption, MatSelect} from '@angular/material/select';
import {MatButton} from '@angular/material/button';
import {NgForOf} from '@angular/common';

@Component({
  selector: 'app-solicitud-repuesto-form',
  standalone: true,
  templateUrl: './solicitud-repuesto-form.component.html',
  imports: [
    ReactiveFormsModule,
    MatFormField,
    MatSelect,
    MatOption,
    MatButton,
    MatInput,
    MatDialogTitle,
    NgForOf
  ],
  styleUrls: ['./solicitud-repuesto-form.component.css']
})
export class SolicitudRepuestoFormComponent implements OnInit {
  solicitudForm!: FormGroup;
  isEditMode: boolean = false;
  estados: string[] = ['Pendiente', 'Aprobado', 'Rechazado'];

  usuarios: any[] = [];
  repuestos: any[] = [];
  buses: any[] = [];

  constructor(
    private fb: FormBuilder,
    private solicitudService: SolicitudRepuestoService,
    private dialogRef: MatDialogRef<SolicitudRepuestoFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  ngOnInit(): void {
    this.isEditMode = this.data?.isEdit || false;

    this.solicitudForm = this.fb.group({
      id_SolicitudRepuesto: [this.isEditMode ? this.data.solicitud?.id_SolicitudRepuesto : null],
      fecha: ['', Validators.required],
      cantidad: ['', [Validators.required, Validators.min(1)]],
      motivo: ['', [Validators.required, Validators.maxLength(200)]],
      estado: [this.isEditMode ? this.data.solicitud?.estado : 'Pendiente'],
      idUsuario: ['', Validators.required],
      idRepuesto: ['', Validators.required],
      idBus: ['', Validators.required],
      nombre: [{ value: '', disabled: true }], // opcional, solo para visualización
      placa: [{ value: '', disabled: true }]
    });

    if (this.isEditMode && this.data?.solicitud) {
      this.solicitudForm.patchValue(this.data.solicitud);
    }

    this.loadCombos(); // carga usuarios, buses, repuestos
  }

  loadCombos(): void {
    this.solicitudService.listarUsuarios().subscribe(data => this.usuarios = data);
    this.solicitudService.listarRepuestos().subscribe(data => this.repuestos = data);
    this.solicitudService.listarBuses().subscribe(data => this.buses = data);
  }

  onSubmit(): void {
    if (this.solicitudForm.invalid) return;
    const formValue = this.solicitudForm.value;

    if (this.isEditMode) {
      this.solicitudService.updateSolicitud(this.data.solicitud.idSolicitudRepuesto, formValue).subscribe(() => {
        this.dialogRef.close(true); // cerrar y refrescar lista
      });
    } else {
      this.solicitudService.createSolicitud(this.solicitudForm.value).subscribe({
        next: (data) => {
          console.log('Guardado:', data);
          this.dialogRef.close(true); // Cierra el modal y actualiza lista
        },
        error: (err) => {
          console.error('Error al guardar:', err);
        }
      });
    }
  }

  onCancel(): void {
    this.dialogRef.close(false);
  }
}
