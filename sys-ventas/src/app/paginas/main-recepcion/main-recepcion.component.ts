import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { MatTooltipModule } from '@angular/material/tooltip';
import { RouterModule, Router } from '@angular/router';
import { DatePipe, CommonModule } from '@angular/common';

import { Recepcion } from '../../modelo/Recepcion';
import { Repuesto } from '../../modelo/Repuesto';
import { RecepcionService } from '../../servicio/recepcion.service';
import { RepuestoService } from '../../servicio/repuesto.service';
import { SalidaService } from '../../servicio/salida.service';
import {ConfirmDialogComponent} from '../../shared/confirm-dialog/confirm-dialog.component';
import {MatDialog} from '@angular/material/dialog';
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'app-main-recepcion',
  templateUrl: './main-recepcion.component.html',
  styleUrls: ['./main-recepcion.component.css'],
  standalone: true,
  imports: [
    CommonModule,
    MatPaginatorModule,
    MatSortModule,
    MatTableModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule,
    MatToolbarModule,
    MatCardModule,
    MatChipsModule,
    MatTooltipModule,
    RouterModule,
    DatePipe
  ]
})
export class MainRecepcionComponent implements OnInit {
  displayedColumns: string[] = [
    'id',
    'repuesto',
    'cantidadRecibida',
    'proveedor',
    'codigo',
    'fechaRecepcion',
    'estado',
    'accion'
  ];
  dataSource: MatTableDataSource<Recepcion> = new MatTableDataSource<Recepcion>();
  repuestos: Repuesto[] = [];

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private recepcionService: RecepcionService,
    private repuestoService: RepuestoService,
    private salidaService: SalidaService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadRecepciones();
    this.loadRepuestos();
  }
  loadRepuestos() {
    this.repuestoService.findAll().subscribe(repuestos => {
      this.repuestos = repuestos;
    });
  }

  getNombreRepuesto(id: number): string {
    const rep = this.repuestos.find(r => r.idRepuesto === id);
    return rep ? rep.nombre : 'Desconocido';
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value.trim().toLowerCase();
    this.dataSource.filter = filterValue;
  }

  validarRecepcion(id: number): void {
    this.recepcionService.validarRecepcion(id).subscribe({
      next: () => {
        this.showSuccess('Recepción validada correctamente');
        this.loadRecepciones();
      },
      error: (err) => this.showError('Error al validar recepción')
    });
  }

  cambiarEstado(id: number, estado: string): void {
    this.recepcionService.cambiarEstado(id, estado).subscribe({
      next: () => {
        this.showSuccess(`Estado cambiado a ${estado}`);
        this.loadRecepciones();
      },
      error: (err) => this.showError('Error al cambiar estado')
    });
  }

  deleteRecepcion(id: number): void {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      data: '¿Está seguro de eliminar esta recepción?'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.recepcionService.delete(id).subscribe({
          next: () => {
            this.showSuccess('Recepción eliminada');
            this.loadRecepciones();
          },
          error: (err) => this.showError('Error al eliminar recepción')
        });
      }
    });
  }

  private showSuccess(message: string): void {
    this.snackBar.open(message, 'Cerrar', {
      duration: 3000,
      panelClass: ['success-snackbar']
    });
  }

  private showError(message: string): void {
    this.snackBar.open(message, 'Cerrar', {
      duration: 3000,
      panelClass: ['error-snackbar']
    });
  }
  loadRecepciones(): void {
    this.recepcionService.findAll().subscribe({
      next: (data) => {
        this.dataSource.data = data;
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      },
      error: (err) => this.showError('Error al cargar recepciones')
    });
  }
  getEstadoColor(estado: string): 'primary' | 'accent' | 'warn' | undefined {
    switch (estado.toLowerCase()) {
      case 'pendiente':
        return 'warn';
      case 'en proceso':
        return 'accent';
      case 'finalizado':
        return 'primary';
      default:
        return undefined;
    }
  }

}





