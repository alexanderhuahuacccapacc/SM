import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import { environment } from '../../environments/environment';
import {Repuesto, RepuestoReport} from '../modelo/Repuesto';
import {GenericService} from './generic.service';
import {BehaviorSubject, catchError, Observable, Subject, tap, throwError} from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class RepuestoService extends GenericService<Repuesto>{
  private mensajeCambio = new Subject<string>();

  setMessageChange(msg: string) {
    this.mensajeCambio.next(msg);
  }

  getMessageChange() {
    return this.mensajeCambio.asObservable();
  }
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
  incrementarStock(idRepuesto: number, cantidad: number): Observable<void> {
    return this.http.put<void>(
      `${this.url}/incrementar-stock`,
      { idRepuesto, cantidad } // Enviar como body en lugar de params
    ).pipe(
      tap(() => this.setMessageChange('Stock actualizado correctamente')),
      catchError(error => {
        console.error('Error al incrementar stock:', error);
        this.setMessageChange('Error al actualizar stock');
        return throwError(() => error);
      })
    );
  }
}
