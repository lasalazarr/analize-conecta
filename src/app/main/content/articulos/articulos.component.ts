
import { Component, OnInit, ViewEncapsulation, ViewChild, ElementRef, Output, EventEmitter, Input, NgZone } from '@angular/core';
import { FormControl } from '@angular/forms';
import { CommunicationService } from 'app/ApiServices/CommunicationService';
import { ParameterService } from 'app/ApiServices/ParametersServices';
import { UserService } from 'app/ApiServices/UserService';
import { E_PLU } from 'app/Models/E_PLU';
import { E_SessionUser } from 'app/Models/E_SessionUser';
import _ from 'lodash';
import { treeCategories } from './articulos.tree';
import { debounce, startWith, map, withLatestFrom } from 'rxjs/operators';
import { Observable, timer, Subject } from 'rxjs';

@Component({
    moduleId: module.id,
    selector: 'articulos',
    templateUrl: 'articulos.component.html',
    styleUrls: ['articulos.component.scss'],
    encapsulation: ViewEncapsulation.None
})

export class ArticulosComponent implements OnInit {
    @Output() close = new EventEmitter<boolean>();
    @Output() OpenProduct = new EventEmitter<string>();
    @Input() initialReturn: boolean
    @Input() filteredItem: any
    @ViewChild('inputFilter') inputFilter: ElementRef
    @ViewChild('videoPlayer') videoplayer: ElementRef;
    @ViewChild("jojo") jojo: ElementRef
    videoSource = "assets/video/Pronto.mp4"
    categoryTree: Array<Category> = new Array<Category>()
    lodash = _
    secondLevel = false
    thirdLevel = false
    secondTree: Category;
    thirdTree: Category;
    SessionUser: E_SessionUser;
    ListProducts: E_PLU[];
    ListProductsFiltered: E_PLU[];
    productCtrl = new FormControl();
    showProduct = false
    filteredProduct: Observable<E_PLU[]>;
    updateField: Subject<E_PLU[]>;
    filterWord: string
    
    constructor(private userService: UserService,
        private communicationService: CommunicationService,
        private parameterService: ParameterService,
        private ngzone: NgZone) {
            

    }

    ngOnInit(): void {
        
        this.updateField = new Subject()
        this.categoryTree = treeCategories
        this.SessionUser = this.userService.GetCurrentCurrentUserNow()
        this.GetProductsCatalog()
    }

    selectCategoryFirst(item: Category) {
        this.secondLevel = true
        this.thirdLevel = false
        this.secondTree = item
        if (_.isNil(item.listCategory)) {
            this.searchProducts(item)
        }
    }

    selectCategorySecond(item: Category) {
        this.thirdLevel = true
        this.secondLevel = false
        this.thirdTree = item
        if (_.isNil(item.listCategory)) {
            this.searchProducts(item)
        }
    }

    selectCategoryThird(item: Category) {
        this.thirdLevel = true
        this.secondLevel = false
        this.thirdTree = item
        if (_.isNil(item.listCategory)) {
            this.searchProducts(item)
        }
    }

    searchProducts(item: Category) {

         if( !_.isNil(item.Nuevo) && item.Nuevo == true) {
            this.ListProductsFiltered = _.filter(this.ListProducts, itemList =>
                itemList.Estrella == item.Nuevo 
            )
        }else  if (_.isNil(item.Genero) && _.isNil(item.Grupo) && _.isNil(item.Categoria)) {
            this.ListProductsFiltered = this.ListProducts

        } 
        else if (!_.isNil(item.All) && item.All) {
            this.ListProductsFiltered = this.ListProducts
        }
        else {
            this.ListProductsFiltered = _.filter(this.ListProducts, itemList =>
                itemList.Genero == item.Genero && itemList.Grupo == item.Grupo &&
                itemList.Categoria == item.Categoria
            )
        }
        this.showProduct = true
        this.secondLevel = false
        this.thirdLevel = false
        this.updateField.next(this._filterStates(""))
    }

    GetProductsCatalog() {
        const plu = new E_PLU();
        plu.Campana = this.SessionUser.Campana;
        plu.Usuario = this.SessionUser.Cedula;
        this.communicationService.showLoaderArticulo.next(true)

        this.parameterService.ListCatalogoActual(plu).subscribe(x => {
            this.ListProducts = x
            this.ListProductsFiltered = x
            this.loadEventQuickSearch()
            this.updateField.next(this._filterStates("", true));
            if(!_.isNil(this.filteredItem))
            {
                setTimeout(() => {
                    this.searchProducts(this.filteredItem)
                }, 300);
            }
        });

    }

    loadEventQuickSearch() {
        this.ngzone.run(() => {
            this.filteredProduct = this.updateField.asObservable().pipe(debounce(() => timer(500)))
        })
    }

    private _filterStates(value: any, initialLoad = false): E_PLU[] {
        let returnObject = []
        const filterValue = value.toLowerCase();
        if (filterValue == "" || _.isNil(filterValue)) {
            returnObject = this.ListProductsFiltered
        }
        else {
            returnObject = this.ListProductsFiltered.filter(state => state.NombreProducto.toLowerCase().includes(filterValue)
                || state.PLU.toString().includes(filterValue)
                || state.NombreColor.toString().includes(filterValue));
        }
        if (initialLoad) {
            this.communicationService.showLoaderArticulo.next(false)
        }
        return returnObject;
    }

    sendFilterWord() {
        this.updateField.next(this._filterStates(this.filterWord))
    }

    returnToCategories() {
        this.filterWord = "";
        this.updateField.next(this._filterStates(""));
        this.showProduct = false;
        this.secondLevel = false;
        this.thirdLevel = false;
    }
    closeComponent() {
        this.close.next(true)
    }
}
export class Category {
    Nuevo?: boolean
    Grupo?: string
    Categoria?: string
    Genero?: string
    img?: string
    description: string
    listCategory?: Array<Category>
    All?: boolean

}
