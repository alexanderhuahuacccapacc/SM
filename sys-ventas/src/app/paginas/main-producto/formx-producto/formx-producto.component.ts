import {Component, OnInit} from '@angular/core';
import {MaterialModule} from "../../../material/material.module";
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {Categoria} from "../../../modelo/Categoria";
import {Marca} from "../../../modelo/Marca";
import {UnidadMedida} from "../../../modelo/UnidadMedida";
import {Observable, switchMap} from "rxjs";
import {ProductoService} from "../../../servicio/producto.service";
import {MarcaService} from "../../../servicio/marca.service";
import {CategoriaService} from "../../../servicio/categoria.service";
import {ActivatedRoute, Router, RouterLink} from "@angular/router";
import {MatSnackBar} from "@angular/material/snack-bar";
import {UnidadmedidaService} from "../../../servicio/unidadmedida.service";
import {Producto} from "../../../modelo/Producto";
import {AsyncPipe, NgForOf, NgIf} from "@angular/common";

@Component({
  selector: 'app-formx-producto',
  standalone: true,
  imports: [
    MaterialModule,
    ReactiveFormsModule,
    NgIf,
    RouterLink,
    NgForOf,
    AsyncPipe,
  ],
  templateUrl: './formx-producto.component.html',
  styleUrl: './formx-producto.component.css'
})

export class FormxProductoComponent implements OnInit{
  productForm!: FormGroup;

  categorias: Categoria[] = [];
  marcas: Marca[] = [];
  unidadMedidas$!:Observable<UnidadMedida[]>;


  id!: number;
  isEdit!: boolean;
  constructor(private serviceProducto:ProductoService,
              private servicioMarca: MarcaService,
              private servicioCategoria: CategoriaService,
              private serviceUnitMed: UnidadmedidaService,
              private route: ActivatedRoute,
              private router: Router,
              private _snackBar: MatSnackBar
  ) {
  }
  ngOnInit(): void {
    this.productForm = new FormGroup({
      idProducto: new FormControl(null),
      nombre: new FormControl("", [Validators.required, Validators.minLength(3), Validators.maxLength(70)]),
      pu: new FormControl(0, [Validators.required]),
      puOld: new FormControl(0, [Validators.required]),
      utilidad: new FormControl(0, [Validators.required]),
      stock: new FormControl(0, [Validators.required]),
      stockOld: new FormControl(0, [Validators.required]),
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
      this.serviceProducto.findByIdOT(this.id).subscribe(data => {
        this.productForm = new FormGroup({
          idProducto: new FormControl(data.idProducto),
          nombre: new FormControl(data.nombre, [Validators.required, Validators.minLength(3), Validators.maxLength(70)]),
          pu: new FormControl(data.pu, [Validators.required]),
          puOld: new FormControl(data.puOld, [Validators.required]),
          utilidad: new FormControl(data.utilidad, [Validators.required]),
          stock: new FormControl(data.stock, [Validators.required]),
          stockOld: new FormControl(data.stockOld, [Validators.required]),
          categoria: new FormControl(data.categoria.idCategoria, [Validators.required]),
          marca: new FormControl(data.marca.idMarca, [Validators.required]),
          unidadMedida: new FormControl(data.unidadMedida.idUnidad, [Validators.required]),
        });
      });
    }
  }

  operar() {
    const product: Producto = { ...this.productForm.value };
    const operacion = this.isEdit
      ? this.serviceProducto.update(product.idProducto, product)
      : this.serviceProducto.save(product);

    operacion
      .pipe(switchMap(()=>{
        return this.serviceProducto.listPageable(0, 2);
      }))
      .subscribe((data) => {
        this.serviceProducto.setProductosSubject(data);
        const mensaje = this.isEdit ? "Se ha Modificado correctamente" : "Se ha Creado correctamente";
        this.toastMsg(mensaje);
        this.router.navigate(['pages/product']);
      });
  }

  toastMsg(msg: string): void {
    this._snackBar.open(msg, 'INFO', { duration: 2000, verticalPosition: 'top', horizontalPosition: 'right'});
  }
}
