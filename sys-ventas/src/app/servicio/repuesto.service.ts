import {Injectable} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import {Repuesto, RepuestoReport} from '../modelo/Repuesto';
import {GenericService} from './generic.service';
import {BehaviorSubject, Observable, Subject, tap} from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class RepuestoService extends GenericService<Repuesto>{
  private repuestosSubject: Subject<RepuestoReport[]>= new Subject<RepuestoReport[]>;
  private repuestoSeleccionadoSubject = new BehaviorSubject<RepuestoReport | null>(null);
  repuestoSeleccionado$ = this.repuestoSeleccionadoSubject.asObservable();


  constructor(protected  override http: HttpClient) {
    super(http, `${environment.HOST}/api/repuesto`);
  }

  findAllOT():void{
    this.http.get<RepuestoReport[]>(this.url).subscribe(data=>{
      this.repuestosSubject.next(data);
    });
  }

  findByIdOT(id:number){
    return this.http.get<RepuestoReport>(this.url+`/${id}`);
  }
  seleccionarProducto(repuesto: RepuestoReport) {
    console.log("SERVICE");
    console.log(repuesto);
    this.repuestoSeleccionadoSubject.next(repuesto);
  }

  //1
  setRepuestoSubject(data: RepuestoReport[]){this.repuestosSubject.next(data);}
  getRepuestoSubject(){return this.repuestosSubject.asObservable();}

  listPageable(p: number, s: number){
    return this.http.get<any>(`${this.url}/pageable?page=${p}&size=${s}`);
  }

}
