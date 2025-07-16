import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {environment} from "../../environments/environment.development";
import {Producto} from "../modelo/Producto";
import {BehaviorSubject, Observable, Subject, tap} from "rxjs";
import {ProductoReport} from "../modelo/Producto";
import {GenericService} from './generic.service';
import {Marca} from '../modelo/Marca';
@Injectable({
  providedIn: 'root'
})

export class ProductoService extends GenericService<Producto>{
  private productosSubject: Subject<ProductoReport[]> = new Subject<ProductoReport[]>;
  private productoSeleccionadoSubject = new BehaviorSubject<ProductoReport | null>(null);
  productoSeleccionado$ = this.productoSeleccionadoSubject.asObservable();

  constructor(protected override http: HttpClient) {
    super(http,`${environment.HOST}/productos`);
  }

  findAllOT():void{
    this.http.get<ProductoReport[]>(this.url).subscribe(data=>{
      this.productosSubject.next(data);
    });
  }

  findByIdOT(id:number){
    return this.http.get<ProductoReport>(this.url+`/${id}`);
  }

  seleccionarProducto(producto: ProductoReport) {
    console.log("SERVICE");
    console.log(producto);
    this.productoSeleccionadoSubject.next(producto);
  }

  setProductosSubject(data: ProductoReport[]){this.productosSubject.next(data);}
  getProductosSubject(){return this.productosSubject.asObservable();}

  listPageable(p: number, s: number){
    return this.http.get<any>(`${this.url}/pageable?page=${p}&size=${s}`);
  }

}
