
import { E_Error } from "./E_Error";

export class E_PedidosCliente {

    //OJO MRG: SI RECIBE UN DECIMAL EN UN INT SE REVIENTA EL ENVIO AL API. LAS PROPIEDADES DEBEN SER DEL TIPO QUE SE ENVIAR DESDE ANGULAR.
    //OJO MRG: SI RECIBE UN DECIMAL EN UN INT SE REVIENTA EL ENVIO AL API. LAS PROPIEDADES DEBEN SER DEL TIPO QUE SE ENVIAR DESDE ANGULAR.
    //OJO MRG: SI RECIBE UN DECIMAL EN UN INT SE REVIENTA EL ENVIO AL API. LAS PROPIEDADES DEBEN SER DEL TIPO QUE SE ENVIAR DESDE ANGULAR.

    //OJO MRG: LOS TIPOS DEBEN SER IGUALES EN EL ANGULAR Y EL API SINO SE REVIENTA EL ENVIO AL API.
    //OJO MRG: LOS TIPOS DEBEN SER IGUALES EN EL ANGULAR Y EL API SINO SE REVIENTA EL ENVIO AL API.
    //OJO MRG: LOS TIPOS DEBEN SER IGUALES EN EL ANGULAR Y EL API SINO SE REVIENTA EL ENVIO AL API.


    public Numero: string
    public Mes: string;
    public Fecha: Date;
    public Anulado: number;
    public Espera: number;
    public Despacho: Date;
    public Nit: string;
    public Vendedor: string;
    public IVA: number;
    public Valor: number;
    public Descuento: number;
    public FechaCreacion: Date;
    public ClaveUsuario: string;
    public Zona: string;
    public CodigoNumeracion: string;
    public Transmitido: number;
    public Campana: string;
    public NumeroEnvio: string;
    public NoFacturado: number;
    public Facturar: number;
    public CodTipo: string;
    public Devol: string;
    public Factura: string;
    public NombreVendedor: string;
    public NombreEmpresaria: string;
    public NombreZona: string;
    public IdEstado: number;
    public NombreEstado: string;
    public Orden: number;
    public Procesado: boolean;
    public NivelServicioEstimado: number;
    public NivelServicioReal: number;
    public NivelServicioEstado: boolean;
    public NivelServicioTipo: string;
    public TotalPedidosProcesados: number;
    public TotalPedidosNoProcesados: number;
    public TotalPedidos: number;
    public Consecutivo: number;
    public TerminoProcess: boolean;
    public TotalSiCumplenNivelServicio: number;
    public TotalNoCumplenNivelServicio: number;
    public TotalSiCumplenReglas: number;
    public TotalNoCumplenReglas: number;
    public TotalSiCumplenInventario: number;
    public TotalNoCumplenInventario: number;
    public ValorPremio: number;
    public ValorPremioNiveles: number;
    public ValorPremioNivelesSep: number;
    public FechaUltimaModificacion: Date;
    public IdArticuloPremio: number;
    public TipoQuery: string;
    public ValorIva: number;
    public Mailgroup: string;
    public EnProduccion: boolean;
    public IVAPrecioCat: number;
    public ValorPrecioCat: number;
    public Codigo: string;
    public GrupoCatalogo: string;
    public TotalPrecioCatalogo: number;
    public GeneraPremios: boolean;
    public ValorTotalNeto: number;
    public ValorTotalIvaFlete: number;
    public ValorTotalIvaFleteFactura: number;
    public DescripcionReferencia: string;
    public Referencia: string;
    public CantidadPedida: number;
    public CodigoTotal: string;
    public CCostos: string;
    public GuardarAuditoria: boolean;
    public Usuario: string;
    public DireccionEntregaPedido: string;
    public CodigoCiudad: string;
    public NombreCiudad: string;
    public TelefonoPrincipal: string;
    public Email: string;
    public Celular: string;
    public Sector: string;
    public Referido: string;
    public UltimaModificacionEmpresaria: Date;
    public IdEstadoCliente: number;
    public EstadoCliente: string;
    public IdEstadoPedido: number;
    public EstadoPedido: string;
    public IdVendedor: string;
    public CedulaVendedor: string;
    public NumeroFactura: string;
    public Anexo: number;
    public ProcesadoClienteHistorico: boolean;
    public IdLider: string;
    public Saldo: number;
    public NumeroFac: string;
    public IdCodigoCorto: string;
    public Reserva: boolean;
    public Borrador: boolean;
    public FechaCierreBorrador: Date;
    public FechaCierreReserva: Date;
    public FechaCierreReservaReal: Date;
    public Portal: string;
    public TelefonoDos: string;
    public FechaIngresoCliente: Date;
    public CelularDos: string;
    public ClasificacionCliente: string;
    public ClienteCreadoPor: string;
    public TipoEnvio: number;
    public CiudadDespacho: string;
    public FacturacionSemanal: boolean;
    public UsuarioDigito: string;
    public Cupo_asignado: number;
    public Claseventa: string;
    public FechaAnulacion: Date;
    public MotivoAnulacion: string;
    public DescripcionAnulacion: string;
    public Asistente: string;
    public NombreAnulo: string;
    public ExcentoIVA: boolean;
    public CodCiudadCliente: string;

    public okTransEncabezadoPedido: boolean;
    public okTransDetallePedido: boolean;
    public PuntosUsar: number;
    public TotalPuntosPedido: number;

    public Guia: string;
    public NumeroDespacho: string;
    public PagarFletePuntos: boolean;
    public GrupoUser: string;
    public OperadorLogistico : string;
    public ClienteFinal: string;
    public Bodega: string;
    public NombreDestinatario: string;
    public PuntoEnvio: string;
    public Longitud:number
    public Latitud: number
    public ValorNotaCredito: number
    public MotivoNotaCredito: string    
    public FechaNotaCredito: Date
    public UsuarioFactura: string
    public UsuarioAduana: string
    public UsuarioDespacho: string
    public NumeroAduana: string
    public FechaAduana: Date
    public FechaLiberacion: Date
    public UsuarioLibero: string
    public FechaMovimiento: string
    public Error: E_Error
    IdDireccionXUsuario: number;

    selected: boolean;
    Contraentrega:boolean;
    GeoZona:string;

    constructor() { }
}

