
import { E_Error } from "./E_Error";

export class E_DepositoP {


    public FechaDocumento:  Date
    public Numero: string
    public TipoDocumento: string
    public Nit: string
    public Banco:  string
    public Observacion: string
    public Monto: number
    public Usuario: string
    public Leido:   number
    public Ip:  string
    public Equipo:  string
    public Pedido:  string
    public MontoPedido: number
    public Factura: string
    public Error: E_Error;

    constructor() { }
}

