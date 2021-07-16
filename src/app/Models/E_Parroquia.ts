
import { E_Error } from "./E_Error";

export class E_Parroquia {

    public Codigo: string
    public CodigoProvincia: string
    public NombreProvincia: string
    public CodigoCanton: string
    public NombreCanton: string
    public CodigoParroquia: string
    public NombreParroquia: string
    public Hombres: number 
    public Mujer: number 
    public Total: number 
    public Estado: boolean
    public Error: E_Error
    
    constructor() { }
}

