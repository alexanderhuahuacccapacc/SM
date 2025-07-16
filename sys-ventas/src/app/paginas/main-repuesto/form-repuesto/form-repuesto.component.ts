import {Component, OnInit} from '@angular/core';
import {AsyncPipe, NgForOf, NgIf} from '@angular/common';
import {MatButton} from '@angular/material/button';
import {MatCard, MatCardContent, MatCardHeader, MatCardTitle} from '@angular/material/card';
import {MatFormField, MatHint, MatInput, MatLabel} from '@angular/material/input';
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {ActivatedRoute, Router, RouterLink} from '@angular/router';
import {MatOption} from '@angular/material/core';
import {MatSelect} from '@angular/material/select';
import {MaterialModule} from '../../../material/material.module';
import {Categoria} from '../../../modelo/Categoria';
import {Marca} from '../../../modelo/Marca';
import {Observable, switchMap} from 'rxjs';
import {UnidadMedida} from '../../../modelo/UnidadMedida';
import {RepuestoService} from '../../../servicio/repuesto.service';
import {MarcaService} from '../../../servicio/marca.service';
import {CategoriaService} from '../../../servicio/categoria.service';
import {UnidadmedidaService} from '../../../servicio/unidadmedida.service';
import {MatSnackBar} from '@angular/material/snack-bar';
import {Repuesto} from '../../../modelo/Repuesto';

@Component({
  selector: 'app-form-repuesto',
  imports: [
    MaterialModule,
    AsyncPipe,
    MatButton,
    MatCard,
    MatCardContent,
    MatCardHeader,
    MatCardTitle,
    MatFormField,
    MatInput,
    MatLabel,
    MatOption,
    MatSelect,
    NgForOf,
    NgIf,
    ReactiveFormsModule,
    RouterLink
  ],
  templateUrl: './form-repuesto.component.html',
  styleUrl: './form-repuesto.component.css'
})
export class FormRepuestoComponent implements OnInit{
  repuestForm!: FormGroup;

  categorias: Categoria[] = [];
  marcas: Marca[] = [];
  unidadMedidas$!:Observable<UnidadMedida[]>;


  id!: number;
  isEdit!: boolean;
  constructor(private serviceRepuesto:RepuestoService,
              private servicioMarca: MarcaService,
              private servicioCategoria: CategoriaService,
              private serviceUnitMed: UnidadmedidaService,
              private route: ActivatedRoute,
              private router: Router,
              private _snackBar: MatSnackBar
  ) {
  }
  ngOnInit(): void {
    this.repuestForm = new FormGroup({
      idRepuesto: new FormControl(""),
      nombre: new FormControl("", [Validators.required, Validators.minLength(3), Validators.maxLength(70)]),
      stockActual: new FormControl(0, [Validators.required]),
      codigo: new FormControl(0, [Validators.required]),
      ubicacion: new FormControl(0, [Validators.required]),
      estado: new FormControl(0, [Validators.required]),
      stockMinimo: new FormControl(0, [Validators.required]),
      categoria: new FormControl(null, [Validators.required]),
      marca: new FormControl(null, [Validators.required]),
      unidadMedida: new FormControl(null, [Validators.required]),
    });

    this.servicioMarca.findAll().subscribe(data=>{
      this.servicioMarca.setEntidadChange(data);
    });
    this.servicioMarca.getEntidadChange().subscribe(data=>{
      this.marcas=data;
    });

    this.servicioCategoria.findAll();
    this.servicioCategoria.categoria$.subscribe(data=>{
      this.categorias=data;
    });
    this.unidadMedidas$=this.serviceUnitMed.findAll();

    this.route.params.subscribe(data => {
      this.id = data['id'];
      this.isEdit = data['id'] != null;
      this.initForm();
    });

  }


  initForm(){
    if(this.isEdit){
      this.serviceRepuesto.findByIdOT(this.id).subscribe(data => {
        this.repuestForm = new FormGroup({
          idRepuesto: new FormControl(data.idRepuesto),
          nombre: new FormControl(data.nombre, [Validators.required, Validators.minLength(3), Validators.maxLength(70)]),
          stockActual: new FormControl(data.stockActual, [Validators.required]),
          stockMinimo: new FormControl(data.stockMinimo, [Validators.required]),
          codigo: new FormControl(data.codigo, [Validators.required]),
          ubicacion: new FormControl(data.ubicacion, [Validators.required]),
          estado: new FormControl(data.estado, [Validators.required]),
          categoria: new FormControl(data.categoria.idCategoria, [Validators.required]),
          marca: new FormControl(data.marca.idMarca, [Validators.required]),
          unidadMedida: new FormControl(data.unidadMedida.idUnidad, [Validators.required]),
        });
      });
    }
  }

  operar() {
    const repuest: Repuesto = { ...this.repuestForm.value };
    const operacion = this.isEdit
      ? this.serviceRepuesto.update(repuest.idRepuesto, repuest)
      : this.serviceRepuesto.save(repuest);

    operacion
      .pipe(switchMap(()=>{
        return this.serviceRepuesto.listPageable(0, 200);
      }))
      .subscribe((data) => {
        this.serviceRepuesto.setRepuestoSubject(data);
        const mensaje = this.isEdit ? "Se ha Modificado correctamente" : "Se ha Creado correctamente";
        this.toastMsg(mensaje);
        this.router.navigate(['pages/repuestos']);
      });
  }

  toastMsg(msg: string): void {
    this._snackBar.open(msg, 'INFO', { duration: 2000, verticalPosition: 'top', horizontalPosition: 'right'});
  }

}
