import { E_Error } from "../Models/E_Error";
import { E_VentasG } from "app/Models/E_VentasG";

export class VentasGBuilder {

    public label: string
    public value: number



    buildFromObject(x: any): VentasGBuilder {

        if (x.label != undefined) { this.label = x.label }
        if (x.value != undefined) { this.value = x.value }


        return this
    }
    Build(): E_VentasG {
        var obj: E_VentasG = new E_VentasG()
        obj.label = this.label
        obj.value = this.value


        return obj
    }


}
