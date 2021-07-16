
import { E_Error } from "../Models/E_Error";
import { E_Puntos } from "../Models/E_Puntos";
import { BrowserJsonp } from '@angular/http/src/backends/browser_jsonp';

export class PuntosBuilder {
  public Nit: string
  public NombreEmpresaria: string
  public Zona: string
  public Vendedor: string
  public NombreVendedor: string
  public Lider: string
  public NombreLider: string
  public PuntosEfectivos: number
  public PuntosPedidos: number
  public PuntosRedimidos:  number
  public PuntosTotal: number
  public Tipo: string
  public Campana: string
  public Numero: string
  public Tipo2: string
  public Cantidad: number
  public Fecha: Date
  public Movimiento: string
  public Concepto: string
  public EstadoEmpresaria : string

    public Error: E_Error

    buildFromObject(x: any): PuntosBuilder {
        if (x.Nit != undefined) { this.Nit = x.Nit }
        if (x.NombreEmpresaria != undefined) { this.NombreEmpresaria = x.NombreEmpresaria }
        if (x.Zona != undefined) { this.Zona = x.Zona }
        if (x.Vendedor != undefined) { this.Vendedor = x.Vendedor }
        if (x.NombreVendedor != undefined) { this.NombreVendedor = x.NombreVendedor }
        if (x.Lider != undefined) { this.Lider = x.Lider }
        if (x.NombreLider != undefined) { this.NombreLider = x.NombreLider }
        if (x.PuntosEfectivos != undefined) { this.PuntosEfectivos = x.PuntosEfectivos }
        if (x.PuntosPedidos != undefined) { this.PuntosPedidos = x.PuntosPedidos }
        if (x.PuntosRedimidos != undefined) { this.PuntosRedimidos = x.PuntosRedimidos }
        if (x.PuntosTotal != undefined) { this.PuntosTotal = x.PuntosTotal }
        if (x.Tipo != undefined) { this.Tipo = x.Tipo }
        if (x.Campana != undefined) { this.Campana = x.Campana }
        if (x.Numero != undefined) { this.Numero = x.Numero }
        if (x.Tipo2 != undefined) { this.Tipo2 = x.Tipo2 }
        if (x.Cantidad != undefined) { this.Cantidad = x.Cantidad }
        if (x.Fecha != undefined) { this.Fecha = x.Fecha }
        if (x.Movimiento != undefined) { this.Movimiento = x.Movimiento }
        if (x.Concepto != undefined) { this.Concepto = x.Concepto }
        if (x.EstadoEmpresaria != undefined) { this.EstadoEmpresaria = x.EstadoEmpresaria }
        if (x.Error != undefined) { this.Error = x.Error }

        return this
    }
    Build(): E_Puntos {
        var obj: E_Puntos = new E_Puntos()
        obj.Nit = this.Nit
        obj.NombreEmpresaria = this.NombreEmpresaria
        obj.Zona = this.Zona
        obj.Vendedor = this.Vendedor
        obj.NombreVendedor = this.NombreVendedor
        obj.Lider = this.Lider
        obj.NombreLider = this.NombreLider
        obj.PuntosEfectivos = this.PuntosEfectivos
        obj.PuntosPedidos = this.PuntosPedidos
        obj.PuntosRedimidos = this.PuntosRedimidos
        obj.PuntosTotal = this.PuntosTotal
        obj.Tipo = this.Tipo
        obj.Campana= this.Campana
        obj.Numero = this.Numero
        obj.Tipo2 = this.Tipo2
        obj.Cantidad = this.Cantidad
        obj.Fecha = this.Fecha
        obj.Movimiento = this.Movimiento
        obj.Concepto = this.Concepto
        obj.EstadoEmpresaria = this.EstadoEmpresaria

        obj.Error = this.Error

        return obj
    }


}
