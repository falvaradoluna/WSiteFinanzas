import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'wsf-honda',
  templateUrl: './honda.component.html',
  styleUrls: ['./honda.component.scss']
})
export class HondaComponent implements OnInit {
  periodType: any[];
  constructor() { }

  ngOnInit() {
    this.loadType();
  }
  
  loadType(): void {
    this.periodType = [
      {id: "1",Nombre:"Clasificación"},
      {id: "2",Nombre:"Contabilidad"}
     ]
  }
}
