import { Component, OnInit } from '@angular/core';
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { routerTransition } from '../../../router.animations';
import { Router } from '@angular/router';


@Component({
  selector: 'wsf-repoexternos',
  templateUrl: './repoexternos.component.html',
  styleUrls: ['./repoexternos.component.scss'],
  animations: [routerTransition()]
})
export class RepoexternosComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  createExcel(): void{
	  console.log( "Hola createExcel" );

  }
}
