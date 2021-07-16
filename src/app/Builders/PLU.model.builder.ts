import { E_Error } from "../Models/E_Error";
import { E_PLU } from "../Models/E_PLU";
import { E_SessionEmpresaria } from 'app/Models/E_SessionEmpresaria';

export class PLUBuilder {
    public PLU: number
    public Referencia: string
    public CodigoColor: string
    public NombreColor: string
    public CodigoTalla: string
    public NombreTalla: string
    public CodigoTotal: string
    public CodigoBarras: string
    public NombreProducto: string
    public PrecioSinIVA: number
    public IVA: number
    public PrecioConIVA: number
    public PorcentajeIVA: number
    public PrecioTotalConIVA: number
    public CodigoRapido: string
    public Cantidad: number
    public FechaCreacion: Date
    public PrecioCatalogoSinIVA: number
    public IVAPrecioCatalogo: number
    public PrecioCatalogoTotalConIVA: number
    public CatalogoReal: string
    public CodigoRapidoSustituto: string
    public PLUSustituto: number
    public Campana: string
    public IdZona: string
    public Usuario: string
   
    public PrecioEmpresaria: number
    public PrecioPuntos: number
    public Pagopuntos: number
    public Activo: number
    public Disponible: boolean
    public PorcentajeDescuento: number
    public Imagen: string
    public ExcentoIVA: boolean   
    public PrecioEmpresariaSinIVA: number
    public ValorIVA: number 
    public IVAPrecioEmpresaria: number
    public PuntosGanados: number
    public CantidadPedida: number
    public SessionEmpresaria: E_SessionEmpresaria
    public Error: E_Error
    
    buildFromObject(x: any): PLUBuilder {
        if (x.PLU != undefined) { this.PLU = x.PLU }        
        if (x.Referencia != undefined) { this.Referencia = x.Referencia }
        if (x.CodigoColor != undefined) { this.CodigoColor = x.CodigoColor }
        if (x.NombreColor != undefined) { this.NombreColor = x.NombreColor }
        if (x.CodigoTalla != undefined) { this.CodigoTalla = x.CodigoTalla }
        if (x.NombreTalla != undefined) { this.NombreTalla = x.NombreTalla }
        if (x.CodigoTotal != undefined) { this.CodigoTotal = x.CodigoTotal }
        if (x.CodigoBarras != undefined) { this.CodigoBarras = x.CodigoBarras }
        if (x.NombreProducto != undefined) { this.NombreProducto = x.NombreProducto }
        if (x.PrecioSinIVA != undefined) { this.PrecioSinIVA = x.PrecioSinIVA }
        if (x.IVA != undefined) { this.IVA = x.IVA }
        if (x.PrecioConIVA != undefined) { this.PrecioConIVA = x.PrecioConIVA }
        if (x.PorcentajeIVA != undefined) { this.PorcentajeIVA = x.PorcentajeIVA }
        if (x.PrecioTotalConIVA != undefined) { this.PrecioTotalConIVA = x.PrecioTotalConIVA }
        if (x.CodigoRapido != undefined) { this.CodigoRapido = x.CodigoRapido }
        if (x.Cantidad != undefined) { this.Cantidad = x.Cantidad }
        if (x.FechaCreacion != undefined) { this.FechaCreacion = x.FechaCreacion }
        if (x.PrecioCatalogoSinIVA != undefined) { this.PrecioCatalogoSinIVA = x.PrecioCatalogoSinIVA }
        if (x.IVAPrecioCatalogo != undefined) { this.IVAPrecioCatalogo = x.IVAPrecioCatalogo }
        if (x.PrecioCatalogoTotalConIVA != undefined) { this.PrecioCatalogoTotalConIVA = x.PrecioCatalogoTotalConIVA }
        if (x.CatalogoReal != undefined) { this.CatalogoReal = x.CatalogoReal }
        if (x.CodigoRapidoSustituto != undefined) { this.CodigoRapidoSustituto = x.CodigoRapidoSustituto }
        if (x.PLUSustituto != undefined) { this.PLUSustituto = x.PLUSustituto }
        if (x.Campana != undefined) { this.Campana = x.Campana }
        if (x.IdZona != undefined) { this.IdZona = x.IdZona }
        if (x.Usuario != undefined) { this.Usuario = x.Usuario }

        if (x.PrecioEmpresaria != undefined) { this.PrecioEmpresaria = x.PrecioEmpresaria }
        if (x.PrecioPuntos != undefined) { this.PrecioPuntos = x.PrecioPuntos }
        if (x.Pagopuntos != undefined) { this.Pagopuntos = x.Pagopuntos }
        if (x.Activo != undefined) { this.Activo = x.Activo }
        if (x.Disponible != undefined) { this.Disponible = x.Disponible }
        if (x.PorcentajeDescuento != undefined) { this.PorcentajeDescuento = x.PorcentajeDescuento }
        if (x.Imagen != undefined) { this.Imagen = x.Imagen }
        if (x.ExcentoIVA != undefined) { this.ExcentoIVA = x.ExcentoIVA }
        if (x.PrecioEmpresariaSinIVA != undefined) { this.PrecioEmpresariaSinIVA = x.PrecioEmpresariaSinIVA }
        if (x.ValorIVA != undefined) { this.ValorIVA = x.ValorIVA }
        if (x.IVAPrecioEmpresaria != undefined) { this.IVAPrecioEmpresaria = x.IVAPrecioEmpresaria }
        if (x.PuntosGanados != undefined) { this.PuntosGanados = x.PuntosGanados }
        if (x.CantidadPedida != undefined) { this.CantidadPedida = x.CantidadPedida }
        if (x.SessionEmpresaria != undefined) { this.SessionEmpresaria = x.SessionEmpresaria }
        if (x.Error != undefined) { this.Error = x.Error }
        
        return this
    }
    Build(): E_PLU {
        var obj: E_PLU = new E_PLU()
        obj.PLU = this.PLU
        obj.Referencia = this.Referencia
        obj.CodigoColor = this.CodigoColor
        obj.NombreColor = this.NombreColor
        obj.CodigoTalla = this.CodigoTalla
        obj.NombreTalla = this.NombreTalla
        obj.CodigoTotal = this.CodigoTotal
        obj.CodigoBarras = this.CodigoBarras
        obj.NombreProducto = this.NombreProducto
        obj.PrecioSinIVA = this.PrecioSinIVA
        obj.IVA = this.IVA
        obj.PrecioConIVA = this.PrecioConIVA
        obj.PorcentajeIVA = this.PorcentajeIVA
        obj.PrecioTotalConIVA = this.PrecioTotalConIVA
        obj.CodigoRapido = this.CodigoRapido
        obj.Cantidad = this.Cantidad
        obj.FechaCreacion = this.FechaCreacion
        obj.PrecioCatalogoSinIVA = this.PrecioCatalogoSinIVA
        obj.IVAPrecioCatalogo = this.IVAPrecioCatalogo
        obj.PrecioCatalogoTotalConIVA = this.PrecioCatalogoTotalConIVA
        obj.CatalogoReal = this.CatalogoReal
        obj.CodigoRapidoSustituto = this.CodigoRapidoSustituto
        obj.PLUSustituto = this.PLUSustituto
        obj.Campana = this.Campana
        obj.IdZona = this.IdZona
        obj.Usuario = this.Usuario

        obj.PrecioEmpresaria = this.PrecioEmpresaria
        obj.PrecioPuntos = this.PrecioPuntos
        obj.Pagopuntos = this.Pagopuntos
        obj.Activo = this.Activo
        obj.Disponible = this.Disponible  
        obj.PorcentajeDescuento = this.PorcentajeDescuento  
        obj.Imagen = this.Imagen
        obj.ExcentoIVA = this.ExcentoIVA
        obj.PrecioEmpresariaSinIVA = this.PrecioEmpresariaSinIVA
        obj.ValorIVA = this.ValorIVA
        obj.IVAPrecioEmpresaria = this.IVAPrecioEmpresaria
        obj.PuntosGanados = this.PuntosGanados
        obj.CantidadPedida = this.CantidadPedida
        obj.SessionEmpresaria = this.SessionEmpresaria
        obj.Error = this.Error
        
        return obj
    } 

}
