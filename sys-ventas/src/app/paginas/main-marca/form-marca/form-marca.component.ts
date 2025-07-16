import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import {MaterialModule} from '../../../material/material.module';
import {ActivatedRoute, Router, RouterLink} from '@angular/router';
import {Marca} from '../../../modelo/Marca';
import {MarcaService} from '../../../servicio/marca.service';
import {switchMap} from 'rxjs';

@Component({
  selector: 'app-form-marca',
  imports: [
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    RouterLink
  ],
  templateUrl: './form-marca.component.html',
  styleUrl: './form-marca.component.css'
})
export class FormMarcaComponent implements OnInit {
  form!: FormGroup;
  isEdit!: boolean;
  id!:number;

  constructor(
    private marcaService: MarcaService,
    private router: Router,
    private route: ActivatedRoute,
    ) {}

  ngOnInit(): void {
    this.form=new FormGroup({
      idMarca:new FormControl(0),
      nombre:new FormControl('', [Validators.required,
        Validators.minLength(3), Validators.maxLength(80)]),
    });
    this.route.params.subscribe(params => {
      this.id = params['id'];
      this.isEdit=params['id']!=null;
      this.initForm();
    });

  }

  initForm() {
    if(this.isEdit){
      this.marcaService.findById(this.id).subscribe(data => {
        this.form=new FormGroup({
          idMarca:new FormControl(data.idMarca),
          nombre:new FormControl(data.nombre, [Validators.required,
            Validators.minLength(3), Validators.maxLength(80)]),
        });
      });
    }
  }


  operate(){
    const marca:Marca =new Marca(null, this.form.value['nombre']);

    if(this.isEdit){
      this.marcaService.update(this.id, marca).subscribe(() => {
          this.marcaService.findAll().subscribe(data => {
          this.marcaService.setEntidadChange(data);
          this.marcaService.setMessageChange('Actualizado correctamente');
        });
      });
    }else{
      this.marcaService.save(marca).pipe(switchMap(()=>{
        return this.marcaService.findAll()
      }) ).subscribe((data)=>{
        this.marcaService.setEntidadChange(data);
        this.marcaService.setMessageChange('Creado correctamente');
      });
    }

    this.router.navigate(['pages/marca']);
  }

  get f(){
    return this.form.controls;
  }

}
