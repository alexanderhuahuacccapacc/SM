import {Component, ViewChild, OnInit} from '@angular/core';
import {MatButton, MatFabButton} from '@angular/material/button';
import {
  MatCell,
  MatCellDef,
  MatColumnDef,
  MatHeaderCell, MatHeaderCellDef,
  MatHeaderRow,
  MatHeaderRowDef, MatNoDataRow,
  MatRow, MatRowDef, MatTable, MatTableDataSource
} from '@angular/material/table';
import {MatFormField, MatInput, MatLabel} from '@angular/material/input';
import {MatSort, MatSortHeader} from '@angular/material/sort';
import {RouterLink, RouterOutlet} from '@angular/router';
import {MatIcon} from '@angular/material/icon';
import {MatPaginator} from '@angular/material/paginator';
import {ProductoReport} from '../../modelo/Producto';
import {RepuestoService} from '../../servicio/repuesto.service';
import {MatSnackBar} from '@angular/material/snack-bar';
import {switchMap} from 'rxjs';
import {NgClass} from '@angular/common';

@Component({
  selector: 'app-main-repuesto',
  standalone: true,
  imports: [
    MatCell,
    MatCellDef,
    MatColumnDef,
    MatFabButton,
    MatFormField,
    MatHeaderCell,
    MatHeaderRow,
    MatHeaderRowDef,
    MatIcon,
    MatInput,
    MatLabel,
    MatPaginator,
    MatRow,
    MatRowDef,
    MatSort,
    MatSortHeader,
    MatTable,
    RouterLink,
    RouterOutlet,
    MatHeaderCellDef,
    MatNoDataRow,
    NgClass,
  ],
  templateUrl: './main-repuesto.component.html',
  styleUrl: './main-repuesto.component.css'
})
export class MainRepuestoComponent implements OnInit {
  columnsDefinitions = [
    { def: 'idRepuesto', label: 'idRepuesto', hide: true},
    { def: 'nombre', label: 'nombre', hide: false},
    { def: 'stockActual', label: 'stockActual', hide: false},
    { def: 'categoria', label: 'categoria', hide: false},
    { def: 'acciones', label: 'acciones', hide: false}
  ];

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  totalElements: number = 0;
  dataSource!: MatTableDataSource<ProductoReport>;
  row: any;
  constructor(private repuestoService: RepuestoService, private _snackBar: MatSnackBar) {}

  ngOnInit(): void {
    this.repuestoService.listPageable(0, 200).subscribe(data=>{
      this.repuestoService.setRepuestoSubject(data);
    });
    this.repuestoService.getRepuestoSubject().subscribe(data => {
      this.createTable(data);
    });

  }
  createTable(data: any){
    this.totalElements = data.totalElements;
    this.dataSource = new MatTableDataSource(data.content);
    this.dataSource.sort = this.sort;
  }
  showMore(e : any){
    this.repuestoService.listPageable(e.pageIndex, e.pageSize).subscribe(data => this.createTable(data));
  }
  eliminar(id:number){
    if(confirm("Desea eliminar?")){
      this.repuestoService.delete(id).pipe(switchMap( ()=>
        this.repuestoService.listPageable(0, 200)))
        .subscribe(data=>{
          this.repuestoService.setRepuestoSubject(data);
          this.toastMsg("Se ha elimidado correctamente!");
        });
    }
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  getDisplayedColumns(){
    return this.columnsDefinitions.filter(cd => !cd.hide).map(cd => cd.def);
  }
  toastMsg(msg: string): void {
    this._snackBar.open(msg, 'INFO', { duration: 2000, verticalPosition: 'top', horizontalPosition: 'right'});
  }


}
