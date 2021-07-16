
import { E_Error } from "./E_Error";

export class E_Zona {

    public Zona : string      
        public Descripcion  : string     
        public CodLocalidad : string      
        public NitCliente   : string   
        public NitProveedor  : string     
        public Contacto       : string
        public Direccion      : string
        public Telefonos      : string 
        public Fax       : string
        public Email       : string
        public CodGereg      : string 
        public CodGereg1      : string 
        public Localizacion   : string   
        public MailGroup     : string   
        public Excluido         :number
        public CodCiudad      : string
        public CodSector      : string
        public ValorFlete     :number   
        public ValorFlete1      :number
        public Activo       :number
        public ActivoNombre    : string    
        public FechaCreacion     :Date   
        public IdVendedor      : string
        public DiasBorrador       :number
        public DiasReserva       :number
        public DiasDeGracia      :number
        public ValorFleteConIVA   : number    
        public NombreRegional       : string
        public TelefonoUnoRegional     : string
        public TelefonoDosRegional    : string  
        public NombreRegion    : string
        public NombreVendedor      : string
        public CedulaVendedor      : string
        public FechaIngresoVendedor   :Date    
        public TelefonoUnoVendedor      : string
        public TelefonoDosVendedor     : string
        public TelefonoTresVendedor     : string 
        public EmailNivi      : string
        public NombreTransportista     : string  
        public NitTransportista       : string
        public DireccionTransportista   : string    
        public TelefonoTransportista    : string  
        public EmailTransportista       : string
        public TipoLiTransportista     :number
        public IdPromesa      :number
        public Departamento    : string   
        public Municipio      : string
        public TiempoEntrega      :number 
        public Valor_1_20      :number
        public Valor_21_45       :number 
        public Valor_46_85       :number
        public Transportadora      : string 
        public MAI       :Boolean
        public MRL :Boolean
        public FacturacionDiaria   :Boolean     
        public Facturacion21Dias    :Boolean   
        public UnidadNegocio      : string
        public IdZonaMaestra      : string
        public Cod_Rango      : string
        public TipoZona      : string
        public SumaGerente      :number
        public Vendedor      : string
        public Zona_Mtra      : string
        public Usuario: string
    public Error: E_Error
    
    constructor() { }
}
        
      