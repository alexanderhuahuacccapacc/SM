import {Usuario} from '../modelo/Usuario';
import { HttpClient } from '@angular/common/http';
import {BehaviorSubject, Observable} from 'rxjs';
import {GenericService} from './generic.service';
import {Injectable, Inject} from '@angular/core';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})

export class UsuarioService extends GenericService<Usuario> {
  private usuariosSubject = new BehaviorSubject<Usuario[]>([]);
  private messageSubject = new BehaviorSubject<string>('');
  private currentUserSubject = new BehaviorSubject<Usuario | null>(null);

  constructor(
    protected override http: HttpClient,  // <-- Añadido override
    @Inject('url') protected override url: string  // <-- Añadido override
  ) {
    super(http, `${url}/usuarios`);
  }

  // Observable de la lista de usuarios
  getUsuarios$(): Observable<Usuario[]> {
    return this.usuariosSubject.asObservable();
  }

  // Actualizar lista de usuarios
  updateUsuariosList(usuarios: Usuario[]): void {
    this.usuariosSubject.next(usuarios);
  }

  // Mensajes del servicio
  getMessages$(): Observable<string> {
    return this.messageSubject.asObservable();
  }

  sendMessage(message: string): void {
    this.messageSubject.next(message);
  }

  // Usuario actual
  getCurrentUser$(): Observable<Usuario | null> {
    return this.currentUserSubject.asObservable();
  }

  setCurrentUser(usuario: Usuario | null): void {
    this.currentUserSubject.next(usuario);
  }

  // Métodos específicos para usuarios
  login(credentials: { user: string, password: string }): Observable<Usuario> {
    return this.http.post<Usuario>(`${this.url}/login`, credentials).pipe(
      tap(usuario => this.setCurrentUser(usuario))
    );
  }

  logout(): void {
    this.setCurrentUser(null);
  }

  buscarPorUsername(username: string): Observable<Usuario[]> {
    return this.http.get<Usuario[]>(`${this.url}/buscar?username=${username}`);
  }

  cambiarEstado(id: number, estado: string): Observable<Usuario> {
    return this.http.patch<Usuario>(`${this.url}/${id}/estado`, { estado });
  }

  // Sobreescribir findAll para actualizar el subject
  override findAll(): Observable<Usuario[]> {
    return this.http.get<Usuario[]>(this.url).pipe(
      tap(usuarios => this.updateUsuariosList(usuarios))
    );
  }
}
