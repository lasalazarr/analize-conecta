
import { E_Error } from "../Models/E_Error";
import { E_Catalogo } from "../Models/E_Catalogo";

export class CatalogoBuilder {
    public Codigo: string
    public Nombre: string
    public Ano: string
    public FechaInicial: Date
    public FechaFin: Date
    public GrupoCatalogo: string
    public Estado: boolean
    public Unineg: string
    public Usuario: string
    public Error: E_Error
    
    buildFromObject(x: any): CatalogoBuilder {
        if (x.Codigo != undefined) { this.Codigo = x.Codigo }        
        if (x.Nombre != undefined) { this.Nombre = x.Nombre }
        if (x.Ano != undefined) { this.Ano = x.Ano }
        if (x.FechaInicial != undefined) { this.FechaInicial = x.FechaInicial }       
        if (x.FechaFin != undefined) { this.FechaFin = x.FechaFin }
        if (x.GrupoCatalogo != undefined) { this.GrupoCatalogo = x.GrupoCatalogo }
        if (x.Estado != undefined) { this.Estado = x.Estado }
        if (x.Unineg != undefined) { this.Unineg = x.Unineg }
        if (x.Usuario != undefined) { this.Usuario = x.Usuario }
        if (x.Error != undefined) { this.Error = x.Error }
        
        return this
    }
    Build(): E_Catalogo {
        var obj: E_Catalogo = new E_Catalogo()
        obj.Codigo = this.Codigo
        obj.Nombre = this.Nombre
        obj.Ano = this.Ano
        obj.FechaInicial = this.FechaInicial          
        obj.FechaFin = this.FechaFin
        obj.GrupoCatalogo = this.GrupoCatalogo
        obj.Estado = this.Estado
        obj.Unineg = this.Unineg
        obj.Usuario = this.Usuario
        obj.Error = this.Error
     
        return obj
    }


}
