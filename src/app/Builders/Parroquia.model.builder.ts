

import { E_Error } from "../Models/E_Error";
import { E_Parroquia } from "../Models/E_Parroquia";

export class ParroquiaBuilder {
    public Codigo: string
    public CodigoProvincia: string
    public NombreProvincia: string
    public CodigoCanton: string
    public NombreCanton: string
    public CodigoParroquia: string
    public NombreParroquia: string
    public Hombres: number 
    public Mujer: number 
    public Total: number 
    public Estado: boolean
    public Error: E_Error
    
    buildFromObject(x: any): ParroquiaBuilder {
        if (x.Codigo != undefined) { this.Codigo = x.Codigo }        
        if (x.CodigoProvincia != undefined) { this.CodigoProvincia = x.CodigoProvincia }        
        if (x.NombreProvincia != undefined) { this.NombreProvincia = x.NombreProvincia }        
        if (x.CodigoCanton != undefined) { this.CodigoCanton = x.CodigoCanton }        
        if (x.NombreCanton != undefined) { this.NombreCanton = x.NombreCanton }        
        if (x.CodigoParroquia != undefined) { this.CodigoParroquia = x.CodigoParroquia }        
        if (x.NombreParroquia != undefined) { this.NombreParroquia = x.NombreParroquia }        
        if (x.Hombres != undefined) { this.Hombres = x.Hombres }        
        if (x.Mujer != undefined) { this.Mujer = x.Mujer }        
        if (x.Total != undefined) { this.Total = x.Total }        
        if (x.Estado != undefined) { this.Estado = x.Estado }        
        if (x.Error != undefined) { this.Error = x.Error }
        
        return this
    }
    Build(): E_Parroquia {
        var obj: E_Parroquia = new E_Parroquia()
        obj.Codigo = this.Codigo
        obj.CodigoProvincia = this.CodigoProvincia
        obj.NombreProvincia = this.NombreProvincia
        obj.CodigoCanton = this.CodigoCanton
        obj.NombreCanton = this.NombreCanton
        obj.CodigoParroquia = this.CodigoParroquia
        obj.NombreParroquia = this.NombreParroquia
        obj.Hombres = this.Hombres
        obj.Mujer = this.Mujer
        obj.Total = this.Total
        obj.Estado = this.Estado
        obj.Error = this.Error
     
        return obj
    }
}
