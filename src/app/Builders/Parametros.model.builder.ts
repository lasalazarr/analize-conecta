import { E_Error } from "../Models/E_Error";
import { E_Parametros } from "../Models/E_Parametros";

export class ParametrosBuilder {
    public Id: number
    public Nombre: string
    public Valor: string
    public Concepto: string
    public Tipo: string
    public Estado: boolean
    public Error: E_Error
    
    buildFromObject(x: any): ParametrosBuilder {
        if (x.Id != undefined) { this.Id = x.Id }        
        if (x.Nombre != undefined) { this.Nombre = x.Nombre }
        if (x.Valor != undefined) { this.Valor = x.Valor }
        if (x.Concepto != undefined) { this.Concepto = x.Concepto }       
        if (x.Tipo != undefined) { this.Tipo = x.Tipo }       
        if (x.Estado != undefined) { this.Estado = x.Estado }              
        if (x.Error != undefined) { this.Error = x.Error }
        
        return this
    }
    Build(): E_Parametros {
        var obj: E_Parametros = new E_Parametros()
        obj.Id = this.Id
        obj.Nombre = this.Nombre
        obj.Valor = this.Valor
        obj.Concepto = this.Concepto
        obj.Tipo = this.Tipo
        obj.Estado = this.Estado       
        obj.Error = this.Error
     
        return obj
    }
}
