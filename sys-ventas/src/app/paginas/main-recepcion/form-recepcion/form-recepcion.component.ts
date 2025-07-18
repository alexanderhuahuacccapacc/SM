import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Recepcion } from '../../../modelo/Recepcion';
import { RecepcionService } from '../../../servicio/recepcion.service';
import { RepuestoService } from '../../../servicio/repuesto.service';
import { switchMap, map, startWith } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../../../material/material.module';
import { MatDatepicker, MatDatepickerInput, MatDatepickerToggle } from '@angular/material/datepicker';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { Repuesto } from '../../../modelo/Repuesto';
import {provideNativeDateAdapter} from '@angular/material/core';

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
    MatAutocompleteModule
  ],
  providers: [provideNativeDateAdapter()],
  templateUrl: './form-recepcion.component.html',
  styleUrls: ['./form-recepcion.component.css']
})
export class FormRecepcionComponent implements OnInit {
  form!: FormGroup;
  isEdit: boolean = false;
  id!: number;

  repuestos: Repuesto[] = [];
  filteredRepuestos!: Observable<Repuesto[]>;
  repuestoControl = new FormControl('', [Validators.required]);

  @Output() formularioCerrado = new EventEmitter<void>();

  constructor(
    private recepcionService: RecepcionService,
    private repuestoService: RepuestoService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    console.log('Inicializando FormRecepcionComponent');
    this.form = new FormGroup({
      id: new FormControl(null),
      repuesto: new FormControl(null, [Validators.required]),
      repuestoNombre: this.repuestoControl,
      cantidadRecibida: new FormControl(0, [Validators.required]),
      proveedor: new FormControl('', [Validators.required]),
      codigo: new FormControl('', [Validators.required]),
      fechaRecepcion: new FormControl(new Date(), [Validators.required]),
      estado: new FormControl('', [Validators.required])
    });

    this.repuestoService.findAll().subscribe((data: Repuesto[]) => {
      this.repuestos = data;

      this.filteredRepuestos = this.repuestoControl.valueChanges.pipe(
        startWith(''),
        map(value => this._filterRepuestos(value || ''))
      );
    });

    this.route.params.subscribe(params => {
      console.log('Params recibidos:', params);
      this.id = params['id'];
      this.isEdit = !!this.id;
      console.log(`Modo edición: ${this.isEdit}, ID: ${this.id}`);

      if (this.isEdit) {
        this.initForm();
      }
    });
  }

  private _filterRepuestos(value: string): Repuesto[] {
    const filterValue = typeof value === 'string' ? value.toLowerCase() : '';
    return this.repuestos
      .filter(repuesto => repuesto.nombre.toLowerCase().includes(filterValue))
      .sort((a, b) => a.nombre.localeCompare(b.nombre));
  }

  seleccionarRepuesto(repuesto: Repuesto): void {
    this.form.patchValue({
      repuesto: repuesto.idRepuesto,
      repuestoNombre: repuesto.nombre
    });
  }

  displayRepuesto(repuesto?: Repuesto): string {
    return repuesto ? `${repuesto.nombre} (Stock: ${repuesto.stockActual})` : '';
  }

  initForm() {
    this.recepcionService.findById(this.id).subscribe({
      next: (data: Recepcion) => {
        const repuestoSeleccionado = this.repuestos.find(r => r.idRepuesto === data.idRepuesto);

        this.form.setValue({
          id: data.id,
          repuesto: data.idRepuesto,
          repuestoNombre: repuestoSeleccionado ? this.displayRepuesto(repuestoSeleccionado) : '',
          cantidadRecibida: data.cantidadRecibida,
          proveedor: data.proveedor,
          codigo: data.codigo,
          fechaRecepcion: new Date(data.fechaRecepcion),
          estado: data.estado
        });
      },
      error: (err) => {
        console.error('Error al cargar recepción:', err);
      }
    });
  }

  operate() {
    const recepcion: Recepcion = {
      ...this.form.value,
      idRepuesto: this.form.value.repuesto,
      fechaRecepcion: this.form.value.fechaRecepcion.toISOString().split('T')[0]
    };

    const operation = this.isEdit
      ? this.recepcionService.update(this.id, recepcion)
      : this.recepcionService.save(recepcion);

    operation.pipe(
      switchMap(() => this.recepcionService.findAll())
    ).subscribe({
      next: (data: Recepcion[]) => {
        this.recepcionService.setRecepcionChange(data);
        this.recepcionService.setMessageChange(this.isEdit ? 'Actualizado correctamente' : 'Creado correctamente');
        this.formularioCerrado.emit();
        this.router.navigate(['/pages/recepcion']);
      },
      error: (err) => {
        console.error('Error en la operación:', err);
      }
    });
  }

  get f() {
    return this.form.controls;
  }
}
