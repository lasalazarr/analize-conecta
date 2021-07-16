
import { E_Error } from "./E_Error";

export class E_Canton {

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
    public Error: E_Error
    
    constructor() { }
}

