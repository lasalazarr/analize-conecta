
import { E_Error } from "./E_Error";

export class E_Catalogo {
  
    public Codigo: string
    public Nombre: string
    public Ano: string
    public FechaInicial: Date
    public FechaFin: Date
    public GrupoCatalogo: string
    public Estado: boolean
    public Unineg: string
    public Usuario: string
    public Error: E_Error
    
    constructor() { }
}

