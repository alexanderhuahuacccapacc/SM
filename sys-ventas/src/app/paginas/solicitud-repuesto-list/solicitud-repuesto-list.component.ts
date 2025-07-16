import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SolicitudRepuesto } from '../../modelo/SolicitudRepuesto';
import { SolicitudRepuestoService } from '../../servicio/solicitudrepuesto.service';
import { SolicitudRepuestoFormComponent } from '../solicitud-repuesto/solicitud-repuesto.component';
import { switchMap } from 'rxjs';
import {MatFormField} from '@angular/material/input';
import {MaterialModule} from '../../material/material.module';
import {MatChip} from '@angular/material/chips';
import {DatePipe, NgClass, NgForOf, NgIf, NgSwitch, NgSwitchCase, NgSwitchDefault} from '@angular/common';

@Component({
  selector: 'app-solicitud-repuesto-list',
  templateUrl: './solicitud-repuesto-list.component.html',
  imports: [
    MatPaginator,
    MatFormField,
    MatFormField,
    MatFormField,
    MaterialModule,
    MatFormField,
    MatChip,
    NgSwitch,
    NgClass,
    NgSwitchDefault,
    NgSwitchCase,
    NgForOf,
    DatePipe,
    NgIf
  ],
  styleUrls: ['./solicitud-repuesto-list.component.css']
})
export class SolicitudRepuestoListComponent implements OnInit {
  columnsDefinitions = [
    { def: 'idSolicitudRepuesto', label: 'ID', hide: true },
    { def: 'fecha', label: 'Fecha', hide: false },
    { def: 'Busplaca', label: 'Bus (Placa)', hide: false },
    { def: 'nombreRepuesto', label: 'Repuesto', hide: false },
    { def: 'cantidad', label: 'Cantidad', hide: false },
    { def: 'estado', label: 'Estado', hide: false },
    { def: 'acciones', label: 'Acciones', hide: false }
  ];


  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  totalElements: number = 0;
  dataSource!: MatTableDataSource<SolicitudRepuesto>;

  constructor(
    private solicitudService: SolicitudRepuestoService,
    private snackBar: MatSnackBar,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.solicitudService.listPageable(0, 5).subscribe(data => {
      this.createTable(data);
    });
  }

  createTable(data: any) {
    this.totalElements = data.totalElements;
    this.dataSource = new MatTableDataSource(data.content);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    this.dataSource.sortingDataAccessor = (item, property) => {
      switch (property) {
        case 'Busplaca': return item.placa || '';
        case 'nombreRepuesto': return item.nombre || '';
        default: return item[property as keyof SolicitudRepuesto] as string;
      }
    };
  }

  showMore(e: any): void {
    this.solicitudService.listPageable(e.pageIndex, e.pageSize).subscribe(data => {
      this.createTable(data);
    });
  }

  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  getDisplayedColumns(): string[] {
    return this.columnsDefinitions.filter(cd => !cd.hide).map(cd => cd.def);
  }

  openCreateDialog(): void {
    const dialogRef = this.dialog.open(SolicitudRepuestoFormComponent, {
      width: '600px',
      data: { isEdit: false }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.solicitudService.listPageable(0, 5).subscribe(data => {
          this.createTable(data);
        });
      }
    });
  }

  openEditDialog(solicitud: SolicitudRepuesto): void {
    const dialogRef = this.dialog.open(SolicitudRepuestoFormComponent, {
      width: '600px',
      data: { isEdit: true, solicitud }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.solicitudService.listPageable(0, 200).subscribe(data => {
          this.createTable(data);
        });
      }
    });
  }

  cambiarEstado(id: number, nuevoEstado: string): void {
    if (confirm('¿Desea cambiar el estado?')) {
      this.solicitudService.cambiarEstado(id, nuevoEstado).pipe(switchMap(() =>
        this.solicitudService.listPageable(0, 5)))
        .subscribe(data => {
          this.createTable(data);
          this.toastMsg(`Estado cambiado a ${nuevoEstado}`);
        });
    }
  }


  toastMsg(msg: string): void {
    this.snackBar.open(msg, 'INFO', {
      duration: 2000,
      verticalPosition: 'top',
      horizontalPosition: 'right'
    });
  }
}
