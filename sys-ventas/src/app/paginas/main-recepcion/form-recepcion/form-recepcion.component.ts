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
import { switchMap } from 'rxjs';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../../../material/material.module';
import { MatDatepicker, MatDatepickerInput, MatDatepickerToggle } from '@angular/material/datepicker';
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
    MatDatepicker
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
      cantidadRecibida: new FormControl(0, [Validators.required]),
      proveedor: new FormControl('', [Validators.required]),
      codigo: new FormControl('', [Validators.required]),
      fechaRecepcion: new FormControl(new Date(), [Validators.required]),
      estado: new FormControl('', [Validators.required])
    });

    this.repuestoService.findAll().subscribe((data: Repuesto[]) => {
      this.repuestos = data;
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

  initForm() {
    this.recepcionService.findById(this.id).subscribe({
      next: (data: Recepcion) => {
        this.form.setValue({
          id: data.id,
          repuesto: data.idRepuesto, // Asegúrate que esto coincide con el valor esperado
          cantidadRecibida: data.cantidadRecibida,
          proveedor: data.proveedor,
          codigo: data.codigo,
          fechaRecepcion: new Date(data.fechaRecepcion),
          estado: data.estado
        });
      },
      error: (err) => {
        console.error('Error al cargar recepción:', err);
        // Puedes redirigir o mostrar un mensaje al usuario
      }
    });
  }

  operate() {
    const recepcion: Recepcion = {
      ...this.form.value,
      idRepuesto:this.form.value.repuesto
    };

    if (this.isEdit) {
      this.recepcionService.update(this.id, recepcion).pipe(
        switchMap(() => this.recepcionService.findAll())
      ).subscribe((data: Recepcion[]) => {
        this.recepcionService.setRecepcionChange(data);
        this.recepcionService.setMessageChange('Actualizado correctamente');
        this.formularioCerrado.emit();
        this.router.navigate(['/pages/recepcion']);
      });
    } else {
      this.recepcionService.save(recepcion).pipe(
        switchMap(() => this.recepcionService.findAll())
      ).subscribe((data: Recepcion[]) => {
        this.recepcionService.setRecepcionChange(data);
        this.recepcionService.setMessageChange('Creado correctamente');
        this.formularioCerrado.emit();
        this.router.navigate(['/pages/recepcion']);
      });
    }
  }

  get f() {
    return this.form.controls;
  }
}


