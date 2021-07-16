
import { E_Error } from "../Models/E_Error";
import { E_PedidosDetalleCliente } from "../Models/E_PedidosDetalleCliente";
import { E_PedidosCliente } from 'app/Models/E_PedidosCliente';

export class PedidosDetalleClienteBuilder {
    public Numero: string;
    public Id: string;
    public Referencia: string;
    public Descripcion: string;
    public Valor: number;
    public Cantidad: number;
    public Descuento: number;
    public Anulado: number;
    public TarifaIVA: number;
    public CentroCostos: string;
    public Lote: string;
    public Ensamblado: number;
    public CantidadPedida: number;
    public IdDocumentoFuente: string;
    public CodigoUbicacion: string;
    public PLU: number;
    public NumeroEnvio: number;
    public ConceptoContable: string;
    public Imagen: string;
    public Grupo: string;
    public CantidadNivelServicio: number;
    public ValorPrecioCatalogo: number;
    public IVAPrecioCatalogo: number;
    public Catalogo: string;
    public NumeroPedidoPadre: string;
    public TotalPrecioCatalogo: number;
    public CatalogoReal: string;
    public IdCodigoCorto: string;
    public ValorUnitario: number;
    public Nit: string;
    public FechaCreacion: Date;
    public Zona: string;
    public Campana: string;
    public Procesado: boolean;
    public FechaUltimaModificacion: Date;
    public Mailgroup: string;
    public Total: number;
    public TotalPrecioCatalogoCantidad: number;
    public UnidadNegocio: string;
    public PorcentajeDescuento: number;
    public ValorPrecioCatalogoUnitario: number;
    public GrupoProducto: string;
    public Estado: boolean;
    public CampanaInicio: string;
    public CatalogoEnvio: string;
    public PLUSustituto: number;
    public CodigoRapidoSustituto: string;
    public ProdEstrella: boolean;
    public SubTotal: number;
    public SubTotalPrecioCat: number;
    public IVA: number;
    public IVAPrecioCat: number;
    public TotalPrecioCat: number;
    public PuntosGanados: number;
    public PorcentajeDescuentoPuntos: number;
    public Bodega: string;
    public PedidosClienteInfo: E_PedidosCliente
    public Error: E_Error

    buildFromObject(x: any): PedidosDetalleClienteBuilder {

        if (x.Numero != undefined) { this.Numero = x.Numero }
        if (x.Id != undefined) { this.Id = x.Id }
        if (x.Referencia != undefined) { this.Referencia = x.Referencia }
        if (x.Descripcion != undefined) { this.Descripcion = x.Descripcion }
        if (x.Valor != undefined) { this.Valor = x.Valor }
        if (x.Cantidad != undefined) { this.Cantidad = x.Cantidad }
        if (x.Descuento != undefined) { this.Descuento = x.Descuento }
        if (x.Anulado != undefined) { this.Anulado = x.Anulado }
        if (x.TarifaIVA != undefined) { this.TarifaIVA = x.TarifaIVA }
        if (x.CentroCostos != undefined) { this.CentroCostos = x.CentroCostos }
        if (x.Lote != undefined) { this.Lote = x.Lote }
        if (x.Ensamblado != undefined) { this.Ensamblado = x.Ensamblado }
        if (x.CantidadPedida != undefined) { this.CantidadPedida = x.CantidadPedida }
        if (x.IdDocumentoFuente != undefined) { this.IdDocumentoFuente = x.IdDocumentoFuente }
        if (x.CodigoUbicacion != undefined) { this.CodigoUbicacion = x.CodigoUbicacion }
        if (x.PLU != undefined) { this.PLU = x.PLU }
        if (x.NumeroEnvio != undefined) { this.NumeroEnvio = x.NumeroEnvio }
        if (x.ConceptoContable != undefined) { this.ConceptoContable = x.ConceptoContable }
        if (x.Imagen != undefined) { this.Imagen = x.Imagen }
        if (x.Grupo != undefined) { this.Grupo = x.Grupo }
        if (x.CantidadNivelServicio != undefined) { this.CantidadNivelServicio = x.CantidadNivelServicio }
        if (x.ValorPrecioCatalogo != undefined) { this.ValorPrecioCatalogo = x.ValorPrecioCatalogo }
        if (x.IVAPrecioCatalogo != undefined) { this.IVAPrecioCatalogo = x.IVAPrecioCatalogo }
        if (x.Catalogo != undefined) { this.Catalogo = x.Catalogo }
        if (x.NumeroPedidoPadre != undefined) { this.NumeroPedidoPadre = x.NumeroPedidoPadre }
        if (x.TotalPrecioCatalogo != undefined) { this.TotalPrecioCatalogo = x.TotalPrecioCatalogo }
        if (x.CatalogoReal != undefined) { this.CatalogoReal = x.CatalogoReal }
        if (x.IdCodigoCorto != undefined) { this.IdCodigoCorto = x.IdCodigoCorto }
        if (x.ValorUnitario != undefined) { this.ValorUnitario = x.ValorUnitario }
        if (x.Nit != undefined) { this.Nit = x.Nit }
        if (x.FechaCreacion != undefined) { this.FechaCreacion = x.FechaCreacion }
        if (x.Zona != undefined) { this.Zona = x.Zona }
        if (x.Campana != undefined) { this.Campana = x.Campana }
        if (x.Procesado != undefined) { this.Procesado = x.Procesado }
        if (x.FechaUltimaModificacion != undefined) { this.FechaUltimaModificacion = x.FechaUltimaModificacion }
        if (x.Mailgroup != undefined) { this.Mailgroup = x.Mailgroup }
        if (x.Total != undefined) { this.Total = x.Total }
        if (x.TotalPrecioCatalogoCantidad != undefined) { this.TotalPrecioCatalogoCantidad = x.TotalPrecioCatalogoCantidad }
        if (x.UnidadNegocio != undefined) { this.UnidadNegocio = x.UnidadNegocio }
        if (x.PorcentajeDescuento != undefined) { this.PorcentajeDescuento = x.PorcentajeDescuento }
        if (x.ValorPrecioCatalogoUnitario != undefined) { this.ValorPrecioCatalogoUnitario = x.ValorPrecioCatalogoUnitario }
        if (x.GrupoProducto != undefined) { this.GrupoProducto = x.GrupoProducto }
        if (x.Estado != undefined) { this.Estado = x.Estado }
        if (x.CampanaInicio != undefined) { this.CampanaInicio = x.CampanaInicio }
        if (x.CatalogoEnvio != undefined) { this.CatalogoEnvio = x.CatalogoEnvio }
        if (x.PLUSustituto != undefined) { this.PLUSustituto = x.PLUSustituto }
        if (x.CodigoRapidoSustituto != undefined) { this.CodigoRapidoSustituto = x.CodigoRapidoSustituto }
        if (x.ProdEstrella != undefined) { this.ProdEstrella = x.ProdEstrella }
        if (x.SubTotal != undefined) { this.SubTotal = x.SubTotal }
        if (x.SubTotalPrecioCat != undefined) { this.SubTotalPrecioCat = x.SubTotalPrecioCat }
        if (x.IVA != undefined) { this.IVA = x.IVA }
        if (x.IVAPrecioCat != undefined) { this.IVAPrecioCat = x.IVAPrecioCat }
        if (x.TotalPrecioCat != undefined) { this.TotalPrecioCat = x.TotalPrecioCat }
        if (x.PuntosGanados != undefined) { this.PuntosGanados = x.PuntosGanados }
        if (x.PorcentajeDescuentoPuntos != undefined) { this.PorcentajeDescuentoPuntos = x.PorcentajeDescuentoPuntos }
        if (x.Bodega != undefined) { this.Bodega = x.Bodega }
        if (x.PedidosClienteInfo != undefined) { this.PedidosClienteInfo = x.PedidosClienteInfo }
        if (x.Error != undefined) { this.Error = x.Error }

        return this
    }
    Build(): E_PedidosDetalleCliente {
        var obj: E_PedidosDetalleCliente = new E_PedidosDetalleCliente()

        obj.Numero = this.Numero
        obj.Id = this.Id
        obj.Referencia = this.Referencia
        obj.Descripcion = this.Descripcion
        obj.Valor = this.Valor
        obj.Cantidad = this.Cantidad
        obj.Descuento = this.Descuento
        obj.Anulado = this.Anulado
        obj.TarifaIVA = this.TarifaIVA
        obj.CentroCostos = this.CentroCostos
        obj.Lote = this.Lote
        obj.Ensamblado = this.Ensamblado
        obj.CantidadPedida = this.CantidadPedida
        obj.IdDocumentoFuente = this.IdDocumentoFuente
        obj.CodigoUbicacion = this.CodigoUbicacion
        obj.PLU = this.PLU
        obj.NumeroEnvio = this.NumeroEnvio
        obj.ConceptoContable = this.ConceptoContable
        obj.Imagen = this.Imagen
        obj.Grupo = this.Grupo
        obj.CantidadNivelServicio = this.CantidadNivelServicio
        obj.ValorPrecioCatalogo = this.ValorPrecioCatalogo
        obj.IVAPrecioCatalogo = this.IVAPrecioCatalogo
        obj.Catalogo = this.Catalogo
        obj.NumeroPedidoPadre = this.NumeroPedidoPadre
        obj.TotalPrecioCatalogo = this.TotalPrecioCatalogo
        obj.CatalogoReal = this.CatalogoReal
        obj.IdCodigoCorto = this.IdCodigoCorto
        obj.ValorUnitario = this.ValorUnitario
        obj.Nit = this.Nit
        obj.FechaCreacion = this.FechaCreacion
        obj.Zona = this.Zona
        obj.Campana = this.Campana
        obj.Procesado = this.Procesado
        obj.FechaUltimaModificacion = this.FechaUltimaModificacion
        obj.Mailgroup = this.Mailgroup
        obj.Total = this.Total
        obj.TotalPrecioCatalogoCantidad = this.TotalPrecioCatalogoCantidad
        obj.UnidadNegocio = this.UnidadNegocio
        obj.PorcentajeDescuento = this.PorcentajeDescuento
        obj.ValorPrecioCatalogoUnitario = this.ValorPrecioCatalogoUnitario
        obj.GrupoProducto = this.GrupoProducto
        obj.Estado = this.Estado
        obj.CampanaInicio = this.CampanaInicio
        obj.CatalogoEnvio = this.CatalogoEnvio
        obj.PLUSustituto = this.PLUSustituto
        obj.CodigoRapidoSustituto = this.CodigoRapidoSustituto
        obj.ProdEstrella = this.ProdEstrella
        obj.SubTotal = this.SubTotal
        obj.SubTotalPrecioCat = this.SubTotalPrecioCat
        obj.IVA = this.IVA
        obj.IVAPrecioCat = this.IVAPrecioCat
        obj.TotalPrecioCat = this.TotalPrecioCat
        obj.PuntosGanados = this.PuntosGanados
        obj.PorcentajeDescuentoPuntos = this.PorcentajeDescuentoPuntos
        obj.Bodega = this.Bodega
        obj.PedidosClienteInfo = this.PedidosClienteInfo

        obj.Error = this.Error

        return obj
    }


}
