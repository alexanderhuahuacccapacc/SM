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
import { Salida } from '../../modelo/Salida';

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
    private router: Router
  ) {}

  ngOnInit(): void {
    this.repuestoService.findAll().subscribe((reps: Repuesto[]) => {
      this.repuestos = reps;
      this.listarRecepciones();
    });
  }

  listarRecepciones() {
    this.recepcionService.findAll().subscribe(data => {
      this.dataSource.data = data;
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
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

  delete(id: number) {
    this.recepcionService.delete(id).subscribe(() => {
      this.listarRecepciones();
    });
  }

  validar(id: number) {
    this.recepcionService.validarRecepcion(id).subscribe(() => {
      this.listarRecepciones();
    });
  }

  enviarASalida(row: Recepcion) {
    const nuevaSalida: Omit<Salida, 'id'> = {
      idRepuesto: row.idRepuesto!,
      cantidadEntregada: row.cantidadRecibida,
      destinatario: 'SIN DESTINATARIO',
      codigo: row.codigo,
      fechaSalida: new Date(),
      estado: 'ENTREGADO'
    };

    this.salidaService.guardar(nuevaSalida).subscribe(() => {
      this.recepcionService.delete(row.id!).subscribe(() => {
        this.listarRecepciones();

        this.salidaService.findAll().subscribe(data => {
          this.salidaService.setEntidadChange(data);
          this.salidaService.setMessageChange('Movido a salida correctamente');
        });
      });
    });
  }
}





