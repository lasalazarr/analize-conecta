import { E_Error } from "../Models/E_Error";
import { E_Ventas } from "app/Models/E_Ventas";

export class VentasBuilder {
  public Fecha:  Date
    public Mes: string
    public Nit: string
    public Vendedor:  string
    public Meta: number
    public Venta: number
    public Cumplimiento: number
    public Nombre:  string
    public Apellido1:  string
    public Apellido2:  string
    public Codigolider: string
    public Lider: string

    public Error: E_Error

    buildFromObject(x: any): VentasBuilder {
        if (x.Fecha != undefined) { this.Fecha = x.Fecha }
        if (x.Mes != undefined) { this.Mes = x.Mes }
        if (x.Nit != undefined) { this.Nit = x.Nit }
        if (x.Vendedor != undefined) { this.Vendedor = x.Vendedor }
        if (x.Meta != undefined) { this.Meta = x.Meta }
        if (x.Venta != undefined) { this.Venta = x.Venta }
        if (x.Cumplimiento != undefined) { this.Cumplimiento = x.Cumplimiento }
        if (x.Nombre != undefined) { this.Nombre = x.Nombre }
        if (x.Apellido1 != undefined) { this.Apellido1 = x.Apellido1 }
        if (x.Apellido2 != undefined) { this.Apellido2 = x.Apellido2 }
        if (x.Codigolider != undefined) { this.Codigolider = x.Codigolider }
        if (x.Lider != undefined) { this.Lider = x.Lider }

        if (x.Error != undefined) { this.Error = x.Error }

        return this
    }
    Build(): E_Ventas {
        var obj: E_Ventas = new E_Ventas()
        obj.Fecha = this.Fecha
        obj.Mes = this.Mes
        obj.Nit = this.Nit
        obj.Vendedor = this.Vendedor
        obj.Meta = this.Meta
        obj.Venta = this.Venta
        obj.Cumplimiento = this.Cumplimiento
        obj.Nombre = this.Nombre
        obj.Apellido1 = this.Apellido1
        obj.Apellido2 = this.Apellido2
        obj.Codigolider = this.Codigolider
        obj.Lider = this.Lider

        obj.Error = this.Error

        return obj
    }


}
