import { E_Error } from "./E_Error";

export class E_Parametros {

    public Id: number
    public Nombre: string
    public Valor: string
    public Concepto: string
    public Tipo: string
    public Estado: boolean
    public Error: E_Error
    
    constructor() { }
}

