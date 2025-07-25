import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators
} from '@angular/forms';
import {ActivatedRoute, Router, RouterLink} from '@angular/router';
import { Recepcion } from '../../../modelo/Recepcion';
import { RecepcionService } from '../../../servicio/recepcion.service';
import { RepuestoService } from '../../../servicio/repuesto.service';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../../../material/material.module';
import { MatDatepicker, MatDatepickerInput, MatDatepickerToggle } from '@angular/material/datepicker';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { Repuesto } from '../../../modelo/Repuesto';
import {provideNativeDateAdapter} from '@angular/material/core';
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'app-form-recepcion',
  standalone: true,
  imports: [
    CommonModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    MatDatepickerInput,
    MatDatepickerToggle,
    MatDatepicker,
    MatAutocompleteModule,
    RouterLink
  ],
  providers: [provideNativeDateAdapter()],
  templateUrl: './form-recepcion.component.html',
  styleUrls: ['./form-recepcion.component.css']
})
export class FormRecepcionComponent implements OnInit {
  form: FormGroup;
  isEdit = false;
  id?: number;
  repuestos: Repuesto[] = [];

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private recepcionService: RecepcionService,
    private repuestoService: RepuestoService,
    private snackBar: MatSnackBar
  ) {
    this.form = this.fb.group({
      repuesto: ['', Validators.required],
      cantidadRecibida: [0, [Validators.required, Validators.min(1)]],
      proveedor: ['', Validators.required],
      codigo: ['', Validators.required],
      fechaRecepcion: [new Date(), Validators.required],
      estado: ['PENDIENTE', Validators.required]
    });
  }

  ngOnInit(): void {
    this.loadRepuestos();

    this.route.params.subscribe(params => {
      this.id = params['id'];
      if (this.id) {
        this.isEdit = true;
        this.loadRecepcion(this.id);
      }
    });
  }

  loadRepuestos(): void {
    this.repuestoService.findAll().subscribe({
      next: (data) => this.repuestos = data,
      error: (err) => this.showError('Error al cargar repuestos')
    });
  }

  loadRecepcion(id: number): void {
    this.recepcionService.findById(id).subscribe({
      next: (data) => this.form.patchValue(data),
      error: (err) => this.showError('Error al cargar recepción')
    });
  }

  onSubmit(): void {
    if (this.form.valid) {
      const formValues = this.form.value;
      const repuestoSeleccionado = this.repuestos.find(r => r.idRepuesto === formValues.repuesto);

      if (!repuestoSeleccionado) {
        this.showError('Debe seleccionar un repuesto válido');
        return;
      }

      const recepcion = new Recepcion(
        this.isEdit ? this.id ?? null : null,
        repuestoSeleccionado.idRepuesto, // idRepuesto (número)
        repuestoSeleccionado.nombre,     // repuesto (string)
        formValues.cantidadRecibida,
        formValues.proveedor,
        formValues.codigo,
        formValues.fechaRecepcion,
        formValues.estado || 'PENDIENTE'
      );

      const operation = this.isEdit
        ? this.recepcionService.update(recepcion.id!, recepcion)
        : this.recepcionService.save(recepcion);

      operation.subscribe({
        next: () => {
          this.showSuccess(this.isEdit ? 'Recepción actualizada' : 'Recepción creada');
          this.router.navigate(['/pages/recepcion']);
        },
        error: (err) => {
          console.error('Error detallado:', err);
          this.showError(err.error?.message || 'Error al guardar recepción');
        }
      });
    } else {
      this.markFormGroupTouched(this.form);
    }
  }

  private markFormGroupTouched(formGroup: FormGroup) {
    Object.values(formGroup.controls).forEach(control => {
      control.markAsTouched();

      if (control instanceof FormGroup) {
        this.markFormGroupTouched(control);
      }
    });
  }

  private showSuccess(message: string): void {
    this.snackBar.open(message, 'Cerrar', { duration: 3000 });
  }

  private showError(message: string): void {
    this.snackBar.open(message, 'Cerrar', { duration: 3000 });
  }
}


