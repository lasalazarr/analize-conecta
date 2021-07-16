import { Component, OnInit } from '@angular/core';
import { debounce, startWith, map } from "rxjs/operators";
import { timer, Observable } from "rxjs";
import { treeCategories } from '../../articulos/articulos.tree';
@Component({
  selector: 'app-home-config',
  templateUrl: './home-config.component.html',
  styleUrls: ['./home-config.component.scss']
})
export class HomeConfigComponent implements OnInit {

  chat: string;
  filteredProduct: any;
  productCtrl: any;
  categories: any;
  constructor(

  ) {}

  ngOnInit() {
   this.categories = treeCategories
  }

 

}
