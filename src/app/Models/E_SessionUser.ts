import { E_Error } from "./E_Error";

export class E_SessionUser {

    public ReiniciarClave: string
    public Cedula: string
    public Usuario: string
    public IdVendedor: string
    public IdZona: string
    public IdZonaMatriz: string
    public NombreUsuario: string
    public IdGrupo: string
    public Grupo: string
    public Email: string
    public MostrarTermyCond: string
    public ClaveUsuario: string
    public ZonaReservaEnLinea: string
    public CedulaRegional: string
    public CedulaRegionalMatriz: string
    public Asistente: string
    public AsistentexZona: string
    public IdRegional: string

    public UsuarioMatriz: string
    public Estado: string
    public IdPerfil: string
    public Perfil: string
    public vsemailOk: string
    public Nit: string
    public MostrarNombreGerente: string
    public Campana: string
    public Catalogo: string
    public DiasCierrePedidoBorrador: string
    public DiasCierrePedidoReservado: string
    public DiasDeGracia: string
    public UniNegZona: string
    public Privilegio: string
    public IdLider: string
    public Imagen: string
    public CodCiudad: string
    public ClaveNueva: string
    public FechaIniCampana: Date
    public FechaFinCampana: Date
    public CodigoParroquia: string
    public Multipedido: boolean
    public Persona: string
    public Error: E_Error
    Empresaria_Lider

    constructor() { }
}

