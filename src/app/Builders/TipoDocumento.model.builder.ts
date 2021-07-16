import { E_Error } from "../Models/E_Error";
import { E_TipoDocumento } from "../Models/E_TipoDocumento";

export class TipoDocumentoBuilder {
    public Id: string
    public Nombre: string
    public Estado: number    
    public Error: E_Error
    
    buildFromObject(x: any): TipoDocumentoBuilder {
        if (x.Id != undefined) { this.Id = x.Id }        
        if (x.Nombre != undefined) { this.Nombre = x.Nombre }
        if (x.Estado != undefined) { this.Estado = x.Estado }          
        if (x.Error != undefined) { this.Error = x.Error }
        
        return this
    }
    Build(): E_TipoDocumento {
        var obj: E_TipoDocumento = new E_TipoDocumento()
        obj.Id = this.Id
        obj.Nombre = this.Nombre
        obj.Estado = this.Estado      
        obj.Error = this.Error
     
        return obj
    }


}
