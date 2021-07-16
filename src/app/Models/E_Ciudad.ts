
import { E_Error } from "./E_Error";
import { E_ZonaxCiudad } from "./E_ZonaxCiudad";

export class E_Ciudad {

    public CodCiudad: string
    public NombreCiudad: string
    public CodEstado: string
    public ReteIca: string
    public CodigoCiudad: string
    public CodigoServientrega: string
    public ValorFlete: number
    public ExcluidoIVA: number
    public IVA: number
    public PedidoMin: number
    public ValorFleteFull: number
    public CodigoCiudadDespacho: string
    public ZonaxCiudad: E_ZonaxCiudad
    public Error: E_Error
    
    constructor() { }
}

