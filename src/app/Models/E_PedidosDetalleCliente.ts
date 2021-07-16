
import { E_Error } from "./E_Error";
import { E_PedidosCliente } from "./E_PedidosCliente";

export class E_PedidosDetalleCliente {

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

    constructor() { }
}

