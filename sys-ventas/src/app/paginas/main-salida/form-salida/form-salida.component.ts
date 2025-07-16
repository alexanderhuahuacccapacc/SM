import { Component, OnInit, Inject } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule, AbstractControl, ValidationErrors
} from '@angular/forms';
import { SalidaService } from '../../../servicio/salida.service';
import {debounceTime, distinctUntilChanged, switchMap, tap} from 'rxjs';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MaterialModule } from '../../../material/material.module';
import { RepuestoService } from '../../../servicio/repuesto.service';
import { Repuesto } from '../../../modelo/Repuesto';
import {CommonModule, formatDate} from '@angular/common';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-form-salida',
  standalone: true,
  templateUrl: './form-salida.component.html',
  styleUrls: ['./form-salida.component.css'],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MaterialModule,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatButtonModule,
    MatSelectModule
  ]
})
export class FormSalidaComponent implements OnInit {
  form!: FormGroup;
  isEdit: boolean = false;
  id!: number;
  repuestos: Repuesto[] = [];
  repuestosFiltrados: Repuesto[] = [];

  constructor(
    private fb: FormBuilder,
    private salidaService: SalidaService,
    private repuestoService: RepuestoService,
    private dialogRef: MatDialogRef<FormSalidaComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      id: [null],
      idRepuesto: ['', Validators.required],
      cantidadEntregada: [0,
        [Validators.required,
        Validators.min(1),
        (control: AbstractControl)=> this.validateStock(control)]],
      destinatario: ['', Validators.required],
      codigo: ['',Validators.required],
      fechaSalida: [new Date(), Validators.required],
      estado: [''],
      nombreRepuesto: ['', Validators.required]

    });

    this.configurarAutocompletado();
    this.listarRepuestos();

    if (this.data?.id) {
      this.id = this.data.id;
      this.isEdit = true;
      this.initForm();
    } else if (this.data) {
      this.form.patchValue({
        idRepuesto: this.data.idRepuesto ?? '',
        cantidadEntregada: this.data.cantidadRecibida ?? 0,
        destinatario: this.data.destinatario ?? '',
        codigo: this.data.codigo ?? '',
        fechaSalida: new Date(),
        estado: 'PENDIENTE',
        nombreRepuesto: this.data.nombreRepuesto
      });
    }
  }

  private configurarAutocompletado(): void {
    this.form.get('nombreRepuesto')?.valueChanges
      .pipe(
        debounceTime(300),
        distinctUntilChanged(),
        tap(() => this.filtrarRepuestos())
      )
      .subscribe();
  }


  listarRepuestos() {
    this.repuestoService.findAll().subscribe((data: Repuesto[]) => {
      this.repuestos = data;
      this.repuestosFiltrados = data;
    });
  }

  initForm() {
    this.salidaService.findById(this.id).subscribe(data => {
      this.form.setValue({
        id: data.id,
        idRepuesto: data.idRepuesto,
        cantidadEntregada: data.cantidadEntregada,
        destinatario: data.destinatario,
        codigo: data.codigo,
        fechaSalida: new Date(data.fechaSalida),
        estado: data.estado,
        nombreRepuesto:data.nombreRepuesto
      });
    });
  }

  guardar(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const { idRepuesto, cantidadEntregada, destinatario } = this.form.value;

    if (!this.isEdit) {
      // Lógica para NUEVAS salidas (actualiza stock)
      this.registrarNuevaSalida(idRepuesto, cantidadEntregada, destinatario);
    } else {
      // Lógica para EDITAR salidas (manejo especial de stock)
      this.actualizarSalidaExistente(idRepuesto, cantidadEntregada);
    }
  }

  private registrarNuevaSalida(idRepuesto: number, cantidad: number, destinatario: string): void {
    this.salidaService.registrarSalida(idRepuesto, cantidad, destinatario).subscribe({
      next: () => {
        this.salidaService.setMensajeCambio('Salida registrada y stock actualizado correctamente');
        this.dialogRef.close('guardado');
      },
      error: (err) => {
        console.error('Error al registrar:', err);
        this.salidaService.setMensajeCambio(err.error?.message || 'Error al registrar la salida');
      }
    });
  }


  private actualizarSalidaExistente(idRepuesto: number, nuevaCantidad: number): void {
    // 1. Obtener la salida original para conocer la cantidad anterior
    this.salidaService.findById(this.id).subscribe(salidaOriginal => {
      const diferencia = nuevaCantidad - salidaOriginal.cantidadEntregada;

      // 2. Preparar datos para actualización
      const salidaActualizada = {
        ...this.form.value,
        idRepuesto: Number(idRepuesto),
        cantidadEntregada: nuevaCantidad,
        fechaSalida: formatDate(this.form.value.fechaSalida, 'yyyy-MM-dd', 'en-US')
      };

      // 3. Si la cantidad cambió, usar endpoint especial
      if (diferencia !== 0) {
        this.salidaService.actualizarSalidaConStock(
          this.id,
          salidaActualizada,
          diferencia
        ).subscribe({
          next: () => this.handleSuccess('Salida y stock actualizados correctamente'),
          error: (err) => this.handleError(err, 'Error al actualizar salida y stock')
        });
      } else {
        // 4. Si la cantidad no cambió, actualización normal
        this.salidaService.update(this.id, salidaActualizada).subscribe({
          next: () => this.handleSuccess('Salida actualizada correctamente'),
          error: (err) => this.handleError(err, 'Error al actualizar la salida')
        });
      }
    });
  }

  private handleSuccess(message: string): void {
    this.salidaService.setMensajeCambio(message);
    this.dialogRef.close('guardado');
  }

  private handleError(error: any, defaultMessage: string): void {
    console.error('Error:', error);
    this.salidaService.setMensajeCambio(error.error?.message || defaultMessage);
  }
  private prepareDataForUpdate(): any {
    return {
      id: this.form.value.id,
      idRepuesto: Number(this.form.value.idRepuesto),
      cantidadEntregada: Number(this.form.value.cantidadEntregada),
      destinatario: this.form.value.destinatario,
      codigo: this.form.value.codigo,
      fechaSalida: formatDate(this.form.value.fechaSalida, 'yyyy-MM-dd', 'en-US'),
      estado: this.form.value.estado,
      nombreRepuesto: this.form.value.nombreRepuesto
    };
  }


  cancelar() {
    this.dialogRef.close();
  }
  private getFormErrors() {
    const errors: { [key: string]: any } = {}; // ✅ define firma de índice
    Object.keys(this.form.controls).forEach(key => {
      const control = this.form.get(key);
      if (control?.errors) {
        errors[key] = control.errors;
      }
    });
    return errors;
  }
  actualizarNombreRepuesto(idRepuesto: number) {
    // Busca el repuesto en el array `repuestos` por su ID
    const repuestoSeleccionado = this.repuestos.find(r => r.idRepuesto === idRepuesto);

    if (repuestoSeleccionado) {
      // Actualiza el campo oculto `nombreRepuesto` en el formulario
      this.form.patchValue({
        nombreRepuesto: repuestoSeleccionado.nombre
      });
    }
  }
  private validateStock(control: AbstractControl): ValidationErrors | null {
    const idRepuesto = this.form?.get('idRepuesto')?.value;
    const cantidad = control.value;

    if (idRepuesto && cantidad) {
      const repuesto = this.repuestos.find(r => r.idRepuesto === idRepuesto);
      if (repuesto && cantidad > repuesto.stockActual) {
        return { stockInsuficiente: true };
      }
    }
    return null;
  }


  filtrarRepuestos() {
    const filtro = this.form.get('nombreRepuesto')?.value?.toLowerCase() || '';
    this.repuestosFiltrados = this.repuestos.filter(r =>
      r.nombre.toLowerCase().includes(filtro)
    );
  }

  seleccionarRepuesto(nombreRepuesto: string) {
    const repuestoSeleccionado = this.repuestos.find(r => r.nombre === nombreRepuesto);
    if (repuestoSeleccionado) {
      this.form.patchValue({
        idRepuesto: repuestoSeleccionado.idRepuesto,
        nombreRepuesto: repuestoSeleccionado.nombre
      });
    }
  }

  protected readonly FormGroup = FormGroup;
}







