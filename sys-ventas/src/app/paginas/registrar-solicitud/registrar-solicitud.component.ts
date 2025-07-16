import { Component, OnInit, ViewChild } from '@angular/core';
import {
  MatCell, MatCellDef,
  MatColumnDef,
  MatHeaderCell,
  MatHeaderCellDef,
  MatHeaderRow, MatHeaderRowDef,
  MatRow, MatRowDef, MatTable,
  MatTableDataSource
} from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import {MatButton, MatIconButton} from '@angular/material/button';
import {MatIcon} from '@angular/material/icon';

export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  {position: 1, name: 'Hidrógeno', weight: 1.0079, symbol: 'H'},
  {position: 2, name: 'Helio', weight: 4.0026, symbol: 'He'},
  {position: 3, name: 'Litio', weight: 6.941, symbol: 'Li'},
  {position: 4, name: 'Berilio', weight: 9.0122, symbol: 'Be'},
  {position: 5, name: 'Boro', weight: 10.811, symbol: 'B'},
  {position: 6, name: 'Carbono', weight: 12.0107, symbol: 'C'},
  {position: 7, name: 'Nitrógeno', weight: 14.0067, symbol: 'N'},
  {position: 8, name: 'Oxígeno', weight: 15.9994, symbol: 'O'},
  {position: 9, name: 'Flúor', weight: 18.9984, symbol: 'F'},
  {position: 10, name: 'Neón', weight: 20.1797, symbol: 'Ne'},
];

@Component({
  selector: 'app-registrar-solicitud',
  templateUrl: './registrar-solicitud.component.html',
  imports: [
    MatIcon,
    MatColumnDef,
    MatHeaderCell,
    MatCell,
    MatIconButton,
    MatHeaderRow,
    MatRow,
    MatPaginator,
    MatButton,
    MatHeaderCellDef,
    MatCellDef,
    MatTable,
    MatHeaderRowDef,
    MatRowDef
  ],
  styleUrls: ['./registrar-solicitud.component.css']
})
export class RegistrarSolicitudComponent implements OnInit {
  displayedColumns: string[] = ['position', 'name', 'weight', 'symbol', 'actions'];
  dataSource = new MatTableDataSource<PeriodicElement>(ELEMENT_DATA);

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  ngOnInit() {
    this.dataSource.paginator = this.paginator;
  }

  addNewItem() {
    // Logic to add new item
    console.log('Add new item clicked');
  }

  editItem(item: PeriodicElement) {
    // Logic to edit item
    console.log('Edit item:', item);
  }

  deleteItem(item: PeriodicElement) {
    // Logic to delete item
    console.log('Delete item:', item);
  }
}
