import { E_Error } from "../Models/E_Error";
import { E_ExceptionError } from "../Models/E_ExceptionError";

export class ExceptionErrorBuilder {
    public Id: number
    public Componente: string
    public Metodo: string
    public Descripcion: string
    public Usuario: string
    
    buildFromObject(x: any): ExceptionErrorBuilder {
        if (x.Id != undefined) { this.Id = x.Id }        
        if (x.Componente != undefined) { this.Componente = x.Componente }
        if (x.Metodo != undefined) { this.Metodo = x.Metodo }
        if (x.Descripcion != undefined) { this.Descripcion = x.Descripcion }
        if (x.Usuario != undefined) { this.Usuario = x.Usuario }
       
        return this
    }
    Build(): E_ExceptionError {
        var obj: E_ExceptionError = new E_ExceptionError()
        obj.Id = this.Id
        obj.Componente = this.Componente
        obj.Metodo = this.Metodo
        obj.Descripcion = this.Descripcion
        obj.Usuario = this.Usuario
      
        return obj
    }


}
