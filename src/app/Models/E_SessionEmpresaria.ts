import { E_Error } from "./E_Error";
import { E_Bodegas } from './E_Bodegas';

export class E_SessionEmpresaria {

    public DocumentoEmpresaria: string
    public NombreEmpresariaCompleto: string
    public TipoPedidoMinimo: string
    public CodCiudadCliente: string
    public PremioBienvenida: string
    public TipoEnvioCliente: string
    public Empresaria_Lider: string
    public ExcentoIVA: boolean

    public IdZona: string
    public Email: string
    public Vendedor: string
    public Clasificacion: string
    public Telefono1: string
    public Celular1: string
    public CodigoRegional: string
    public Usuario: string
    public Whatsapp: string
    public TipoCliente: string
    public TallaPrendaSuperior: string
    public TallaPrendaInferior: string
    public TallaCalzado: string
    public Catalogo: string
    public Campana: string
    public PuntosEmpresaria: number
    public ValorPuntos: number
    public GrupoDescuento: string
    public BodegaEmpresaria: string
    public CarpetaImagenes: string
    public Bodegas: E_Bodegas
    public CodigoParroquia: string
    public DireccionPedidos: string
    public IdGrupo: string
    public EmailLider: string
    public Celular2: string
    public ClasificacionC: string
    public Error: E_Error

    constructor() { }
}

