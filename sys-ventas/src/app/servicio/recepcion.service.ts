import { Injectable } from '@angular/core';
import { GenericService } from './generic.service';
import { Recepcion } from '../modelo/Recepcion';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { BehaviorSubject, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RecepcionService extends GenericService<Recepcion> {

  private recepcionChange = new BehaviorSubject<Recepcion[]>([]);
  private messageChange = new Subject<string>();

  constructor(protected override http: HttpClient) {
    super(http, `${environment.HOST}/api/recepciones`);
  }

  
  setRecepcionChange(data: Recepcion[]) {
    this.recepcionChange.next(data);
  }

  getRecepcionChange() {
    return this.recepcionChange.asObservable();
  }

  
  setMessageChange(message: string) {
    this.messageChange.next(message);
  }

  getMessageChange() {
    return this.messageChange.asObservable();
  }

  
  validarRecepcion(id: number) {
    return this.http.post(`${this.url}/${id}/validar`, {});
  }
}

