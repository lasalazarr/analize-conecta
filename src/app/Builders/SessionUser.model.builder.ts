import { E_Error } from "../Models/E_Error";
import { E_SessionUser } from "../Models/E_SessionUser";

export class SessionUserBuilder {
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
    public CodigoParroquia: string
    public FechaIniCampana: Date
    public FechaFinCampana: Date
    public Multipedido: boolean
    public Persona: string
     public Error: E_Error

    buildFromObject(x: any): SessionUserBuilder {
        if (x.ReiniciarClave != undefined) { this.ReiniciarClave = x.ReiniciarClave }
        if (x.Cedula != undefined) { this.Cedula = x.Cedula }
        if (x.Usuario != undefined) {
            this.Usuario = x.Usuario
            this.Email = x.Usuario
        }
        if (x.IdVendedor != undefined) { this.IdVendedor = x.IdVendedor }
        if (x.IdZona != undefined) { this.IdZona = x.IdZona }
        if (x.IdZonaMatriz != undefined) { this.IdZonaMatriz = x.IdZonaMatriz }
        if (x.NombreUsuario != undefined) { this.NombreUsuario = x.NombreUsuario }
        if (x.IdGrupo != undefined) { this.IdGrupo = x.IdGrupo }
        if (x.Grupo != undefined) { this.Grupo = x.Grupo }
        if (x.Email != undefined) { this.Email = x.Email }
        if (x.MostrarTermyCond != undefined) { this.MostrarTermyCond = x.MostrarTermyCond }
        if (x.ClaveUsuario != undefined) { this.ClaveUsuario = x.ClaveUsuario }
        if (x.ZonaReservaEnLinea != undefined) { this.ZonaReservaEnLinea = x.ZonaReservaEnLinea }
        if (x.CedulaRegional != undefined) { this.CedulaRegional = x.CedulaRegional }
        if (x.CedulaRegionalMatriz != undefined) { this.CedulaRegionalMatriz = x.CedulaRegionalMatriz }
        if (x.Asistente != undefined) { this.Asistente = x.Asistente }
        if (x.AsistentexZona != undefined) { this.AsistentexZona = x.AsistentexZona }
        if (x.IdRegional != undefined) { this.IdRegional = x.IdRegional }

        if (x.UsuarioMatriz != undefined) { this.UsuarioMatriz = x.UsuarioMatriz }
        if (x.Estado != undefined) { this.Estado = x.Estado }
        if (x.IdPerfil != undefined) { this.IdPerfil = x.IdPerfil }
        if (x.Perfil != undefined) { this.Perfil = x.Perfil }
        if (x.vsemailOk != undefined) { this.vsemailOk = x.vsemailOk }
        if (x.Nit != undefined) { this.Nit = x.Nit }
        if (x.MostrarNombreGerente != undefined) { this.MostrarNombreGerente = x.MostrarNombreGerente }
        if (x.Campana != undefined) { this.Campana = x.Campana }
        if (x.Catalogo != undefined) { this.Catalogo = x.Catalogo }
        if (x.DiasCierrePedidoBorrador != undefined) { this.DiasCierrePedidoBorrador = x.DiasCierrePedidoBorrador }
        if (x.DiasCierrePedidoReservado != undefined) { this.DiasCierrePedidoReservado = x.DiasCierrePedidoReservado }
        if (x.DiasDeGracia != undefined) { this.DiasDeGracia = x.DiasDeGracia }
        if (x.UniNegZona != undefined) { this.UniNegZona = x.UniNegZona }
        if (x.Privilegio != undefined) { this.Privilegio = x.Privilegio }
        if (x.IdLider != undefined) { this.IdLider = x.IdLider }
        if (x.Imagen != undefined) { this.Imagen = x.Imagen }
        if (x.CodCiudad != undefined) { this.CodCiudad = x.CodCiudad }
        if (x.CodigoParroquia != undefined) { this.CodigoParroquia = x.CodigoParroquia }
        if (x.FechaIniCampana != undefined) { this.FechaIniCampana = x.FechaIniCampana }
        if (x.FechaFinCampana != undefined) { this.FechaFinCampana = x.FechaFinCampana }
        if (x.Multipedido != undefined) { this.Multipedido = x.Multipedido }
        if (x.Persona != undefined) { this.Persona = x.Persona }
        
        if (x.Error != undefined) { this.Error = x.Error }

        return this 
    }
    Build(): E_SessionUser {
        var obj: E_SessionUser = new E_SessionUser()
        obj.ReiniciarClave = this.ReiniciarClave
        obj.Cedula = this.Cedula
        obj.Usuario = this.Usuario
        obj.IdVendedor = this.IdVendedor
        obj.IdZona = this.IdZona
        obj.IdZonaMatriz = this.IdZonaMatriz
        obj.NombreUsuario = this.NombreUsuario
        obj.IdGrupo = this.IdGrupo
        obj.Grupo = this.Grupo
        obj.Email = this.Email
        obj.MostrarTermyCond = this.MostrarTermyCond
        obj.ClaveUsuario = this.ClaveUsuario
        obj.ZonaReservaEnLinea = this.ZonaReservaEnLinea
        obj.CedulaRegional = this.CedulaRegional
        obj.CedulaRegionalMatriz = this.CedulaRegionalMatriz
        obj.Asistente = this.Asistente
        obj.AsistentexZona = this.AsistentexZona
        obj.IdRegional = this.IdRegional

        obj.UsuarioMatriz = this.UsuarioMatriz
        obj.Estado = this.Estado
        obj.IdPerfil = this.IdPerfil
        obj.Perfil = this.Perfil
        obj.vsemailOk = this.vsemailOk
        obj.Nit = this.Nit
        obj.MostrarNombreGerente = this.MostrarNombreGerente
        obj.Campana = this.Campana
        obj.Catalogo = this.Catalogo
        obj.DiasCierrePedidoBorrador = this.DiasCierrePedidoBorrador
        obj.DiasCierrePedidoReservado = this.DiasCierrePedidoReservado
        obj.DiasDeGracia = this.DiasDeGracia
        obj.UniNegZona = this.UniNegZona
        obj.Privilegio = this.Privilegio
        obj.IdLider = this.IdLider
        obj.Imagen = this.Imagen
        obj.CodCiudad = this.CodCiudad
        obj.CodigoParroquia = this.CodigoParroquia
        obj.FechaIniCampana = this.FechaIniCampana
        obj.FechaFinCampana = this.FechaFinCampana
        obj.Multipedido = this.Multipedido
        obj.Persona = this.Persona

        obj.Error = this.Error

        return obj
    }
}
