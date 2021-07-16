import { E_Error } from "../Models/E_Error";
import { E_Bodegas } from "../Models/E_Bodegas";


export class BodegasBuilder {
    public Bodega: string
    public Nombre: string
    public CuentaContable: string
    public Estado: number
    public CentroCostos: string
    public VisibleInv: number

    buildFromObject(x: any): BodegasBuilder {
        if (x.Bodega != undefined) { this.Bodega = x.Bodega }
        if (x.Nombre != undefined) { this.Nombre = x.Nombre }
        if (x.CuentaContable != undefined) { this.CuentaContable = x.CuentaContable }
        if (x.Estado != undefined) { this.Estado = x.Estado }
        if (x.CentroCostos != undefined) { this.CentroCostos = x.CentroCostos }
        if (x.VisibleInv != undefined) { this.VisibleInv = x.VisibleInv }

        return this
    }
    Build(): E_Bodegas {
        var obj: E_Bodegas = new E_Bodegas()
        obj.Bodega = this.Bodega
        obj.Nombre = this.Nombre
        obj.CuentaContable = this.CuentaContable
        obj.Estado = this.Estado
        obj.CentroCostos = this.CentroCostos
        obj.VisibleInv = this.VisibleInv

        return obj
    }


}
