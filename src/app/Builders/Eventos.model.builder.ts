
import { E_Eventos } from "app/Models/E_Eventos";

export class EventosBuilder {

    public Fecha: Date
    public Comentario: string
    public Vendedor : string
    public Lider: string
    public Nit: string



    buildFromObject(x: any): EventosBuilder {

        if (x.Fecha != undefined) { this.Fecha = x.Fecha }
        if (x.Comentario != undefined) { this.Comentario = x.Comentario }
        if (x.Vendedor != undefined) { this.Vendedor = x.Vendedor }
        if (x.Lider != undefined) { this.Lider = x.Lider }
        if (x.Nit != undefined) { this.Nit = x.Nit }


        return this
    }
    Build(): E_Eventos {
        var obj: E_Eventos = new E_Eventos()
        obj.Fecha = this.Fecha
        obj.Comentario = this.Comentario
        obj.Vendedor = this.Vendedor
        obj.Lider = this.Lider
        obj.Nit = this.Nit


        return obj
    }


}
