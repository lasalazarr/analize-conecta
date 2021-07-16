
import { E_Error } from "./E_Error";

export class E_Puntos {

    
    public Nit: string
    public NombreEmpresaria: string
    public Zona: string
    public Vendedor: string
    public NombreVendedor: string
    public Lider: string
    public NombreLider: string
    public PuntosEfectivos: number
    public PuntosPedidos: number
    public PuntosRedimidos:  number
    public PuntosTotal: number
    public Tipo: string
    public Campana: string
    public Numero: string
    public Tipo2: string
    public Cantidad: number
    public Fecha: Date
    public Movimiento: string
    public Concepto: string
    public EstadoEmpresaria : string
    public Error: E_Error
    public Bonopuntos:number
    public Valor_unidades_a :number
    public Valor_unidades_b :number
    public Monto  : number
    public Puntos : number
    

    public Decripcion:string
    public Estado:number
    public Id_regla:number
    public PuntosSinPagar:number
    public IdPedido:string
    public Nombre:string

    constructor() { }
}

