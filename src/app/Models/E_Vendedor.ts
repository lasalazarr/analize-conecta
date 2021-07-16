
import { E_Error } from "./E_Error";

export class E_Vendedor {

    public CodPais: string
    public IdVendedor: string
    public Nombre: string
    public Cedula: string
    public FechaIngreso: Date
    public Comision: number
    public Recaudo_0: number
    public Recaudo_30: number
    public Recaudo_60: number
    public Recaudo_90: number
    public FechaNacimiento: Date
    public Localizacion: string
    public Clasificacion: string
    public Persona: string
    public Sexo: string
    public Categoria: string
    public Zona: string
    public NombreUno: string
    public NombreDos: string
    public ApellidoUno: string
    public ApellidoDos: string
    public Direccion: string
    public Email: string
    public TelefonoUno: string
    public TelefonoDos: string
    public TelefonoTres: string
    public EmailNivi: string
    public FechaVigenciaInicio: Date
    public FechaVigenciaFin: Date
    public Activo: number
    public NombrePais: string
    public CodigoEstado: string
    public NombreEstado: string
    public CodigoCiudad: string
    public NombreCiudad: string
    public CodigoSector: string
    public NombreSector: string
    public CodigoZona: string
    public Nit: string
    public CodigoRegional: string
    public MailGroup: string
    public ValorFlete: number
    public TerminosyCondiciones: boolean
    public FechaAceptacionTerminos: Date
    public MostrarTerminosyCondiciones: boolean
    public Director: number
    public Usuario: string
    public Error: E_Error
    
    constructor() { }
}

