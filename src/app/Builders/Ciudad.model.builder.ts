import { E_Error } from "../Models/E_Error";
import { E_Ciudad } from "../Models/E_Ciudad";
import { E_ZonaxCiudad } from "../Models/E_ZonaxCiudad";

export class CiudadBuilder {
    public CodCiudad: string
    public NombreCiudad: string
    public CodEstado: string
    public ReteIca: string
    public CodigoCiudad: string
    public CodigoServientrega: string
    public ValorFlete: number
    public ExcluidoIVA: number
    public IVA: number
    public PedidoMin: number
    public ValorFleteFull: number
    public CodigoCiudadDespacho: string
    public ZonaxCiudad: E_ZonaxCiudad
    public Error: E_Error
    
    buildFromObject(x: any): CiudadBuilder {
        if (x.CodCiudad != undefined) { this.CodCiudad = x.CodCiudad }        
        if (x.NombreCiudad != undefined) { this.NombreCiudad = x.NombreCiudad }
        if (x.CodEstado != undefined) { this.CodEstado = x.CodEstado }
        if (x.ReteIca != undefined) { this.ReteIca = x.ReteIca }
        if (x.CodigoCiudad != undefined) { this.CodigoCiudad = x.CodigoCiudad }
        if (x.CodigoServientrega != undefined) { this.CodigoServientrega = x.CodigoServientrega } 
        if (x.ValorFlete != undefined) { this.ValorFlete = x.ValorFlete } 
        if (x.ExcluidoIVA != undefined) { this.ExcluidoIVA = x.ExcluidoIVA } 
        if (x.IVA != undefined) { this.IVA = x.IVA } 
        if (x.PedidoMin != undefined) { this.PedidoMin = x.PedidoMin } 
        if (x.ValorFleteFull != undefined) { this.ValorFleteFull = x.ValorFleteFull } 
        if (x.CodigoCiudadDespacho != undefined) { this.CodigoCiudadDespacho = x.CodigoCiudadDespacho }         
        if (x.ZonaxCiudad != undefined) { this.ZonaxCiudad = x.ZonaxCiudad }      
        if (x.Error != undefined) { this.Error = x.Error }
        
        return this
    }
    Build(): E_Ciudad {
        var obj: E_Ciudad = new E_Ciudad()
        obj.CodCiudad = this.CodCiudad
        obj.NombreCiudad = this.NombreCiudad
        obj.CodEstado = this.CodEstado
        obj.ReteIca = this.ReteIca
        obj.CodigoCiudad = this.CodigoCiudad
        obj.CodigoServientrega = this.CodigoServientrega 
        obj.ValorFlete = this.ValorFlete
        obj.ExcluidoIVA = this.ExcluidoIVA
        obj.IVA = this.IVA
        obj.PedidoMin = this.PedidoMin 
        obj.ValorFleteFull = this.ValorFleteFull
        obj.CodigoCiudadDespacho = this.CodigoCiudadDespacho        
        obj.ZonaxCiudad = this.ZonaxCiudad
        obj.Error = this.Error
     
        return obj
    }


}
