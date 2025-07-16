import {Component, OnInit, ViewChild} from '@angular/core';
import {Marca} from '../../modelo/Marca';
import {
  MatTableDataSource
}
from '@angular/material/table';
import {MarcaService} from '../../servicio/marca.service';
import {MatSnackBar} from '@angular/material/snack-bar';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {RouterLink, RouterOutlet} from '@angular/router';
import {MaterialModule} from '../../material/material.module';
import {switchMap} from 'rxjs';

@Component({
  selector: 'app-main-marca',
  standalone: true,
  imports: [
    RouterOutlet,
    MaterialModule,
    RouterLink,
  ],
  templateUrl: './main-marca.component.html',
  styleUrl: './main-marca.component.css'
})
export class MainMarcaComponent implements OnInit {
      dataSource!: MatTableDataSource<Marca>;
      displayedColumns= [
       {def:'idMarca', label:'idMarca', hide:false},
       {def:'nombre', label:'nombre', hide:false},
       {def:'accion', label:'action', hide:false},
      ];
      @ViewChild(MatPaginator) paginator!: MatPaginator;
      @ViewChild(MatSort) sort!: MatSort;
      constructor(private marcaService: MarcaService,
                  private _snackBar: MatSnackBar) {}


    ngOnInit(): void {
        this.marcaService.findAll().subscribe(data=>{
         this.marcaService.setEntidadChange(data);
        });
        this.marcaService.getEntidadChange().subscribe(data=>{
          this.createTable(data);
        });
        this.marcaService.getMessageChange()
          .subscribe(data=>this._snackBar.open(data, 'INFO', {duration:2000}));
    }

    createTable(marca: Marca[]){
        this.dataSource=new MatTableDataSource(marca);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
    }

    getDisplayedColumns(){
        return this.displayedColumns.filter(d=>!d.hide)
          .map(d=>d.def);
    }

    applyFilter(filter: any){
        this.dataSource.filter = filter.target.value.trim().toLowerCase();
    }

  delete(id:number){
    this.marcaService.delete(id).pipe(switchMap(()=>this.marcaService.findAll()))
      .subscribe(res=>{
        this.marcaService.setEntidadChange(res);
        this.marcaService.setMessageChange('DELETED!');
      });
  }

}
