import { E_Error } from "../Models/E_Error";
import { E_SessionEmpresaria } from "../Models/E_SessionEmpresaria";
import { E_Bodegas } from 'app/Models/E_Bodegas';

export class SessionEmpresariaBuilder {

    public DocumentoEmpresaria: string
    public NombreEmpresariaCompleto: string
    public TipoPedidoMinimo: string
    public CodCiudadCliente: string
    public PremioBienvenida: string
    public TipoEnvioCliente: string
    public Empresaria_Lider: string
    public IdZona: string
    public Email: string
    public Vendedor: string
    public Clasificacion: string
    public Telefono1: string
    public Celular1: string
    public CodigoRegional: string
    public Usuario: string
    public Whatsapp: string
    public TipoCliente: string
    public TallaPrendaSuperior: string
    public TallaPrendaInferior: string
    public TallaCalzado: string
    public Catalogo: string
    public Campana: string
    public ExcentoIVA: boolean
    public PuntosEmpresaria: number
    public ValorPuntos: number
    public GrupoDescuento: string
    public BodegaEmpresaria: string
    public CarpetaImagenes: string
    public CodigoParroquia: string
    public DireccionPedidos: string
    public EmailLider: string
    public Celular2 : string
    public Bodegas: E_Bodegas
    public ClasificacionC: string
    public Error: E_Error

    buildFromObject(x: any): SessionEmpresariaBuilder {

        if (x.DocumentoEmpresaria != undefined) { this.DocumentoEmpresaria = x.DocumentoEmpresaria }
        if (x.NombreEmpresariaCompleto != undefined) { this.NombreEmpresariaCompleto = x.NombreEmpresariaCompleto }
        if (x.TipoPedidoMinimo != undefined) { this.TipoPedidoMinimo = x.TipoPedidoMinimo }
        if (x.CodCiudadCliente != undefined) { this.CodCiudadCliente = x.CodCiudadCliente }
        if (x.PremioBienvenida != undefined) { this.PremioBienvenida = x.PremioBienvenida }
        if (x.TipoEnvioCliente != undefined) { this.TipoEnvioCliente = x.TipoEnvioCliente }
        if (x.Empresaria_Lider != undefined) { this.Empresaria_Lider = x.Empresaria_Lider }
        if (x.ExcentoIVA != undefined) { this.ExcentoIVA = x.ExcentoIVA }
        if (x.IdZona != undefined) { this.IdZona = x.IdZona }
        if (x.Email != undefined) { this.Email = x.Email }
        if (x.Vendedor != undefined) { this.Vendedor = x.Vendedor }
        if (x.Clasificacion != undefined) { this.Clasificacion = x.Clasificacion }
        if (x.Telefono1 != undefined) { this.Telefono1 = x.Telefono1 }
        if (x.Celular1 != undefined) { this.Celular1 = x.Celular1 }
        if (x.CodigoRegional != undefined) { this.CodigoRegional = x.CodigoRegional }
        if (x.Usuario != undefined) { this.Usuario = x.Usuario }
        if (x.Whatsapp != undefined) { this.Whatsapp = x.Whatsapp }
        if (x.TipoCliente != undefined) { this.TipoCliente = x.TipoCliente }
        if (x.TallaPrendaSuperior != undefined) { this.TallaPrendaSuperior = x.TallaPrendaSuperior }
        if (x.TallaPrendaInferior != undefined) { this.TallaPrendaInferior = x.TallaPrendaInferior }
        if (x.TallaCalzado != undefined) { this.TallaCalzado = x.TallaCalzado }
        if (x.Catalogo != undefined) { this.Catalogo = x.Catalogo }
        if (x.Campana != undefined) { this.Campana = x.Campana }
        if (x.PuntosEmpresaria != undefined) { this.PuntosEmpresaria = x.PuntosEmpresaria }
        if (x.ValorPuntos != undefined) { this.ValorPuntos = x.ValorPuntos }
        if (x.GrupoDescuento != undefined) { this.GrupoDescuento = x.GrupoDescuento }
        if (x.BodegaEmpresaria != undefined) { this.BodegaEmpresaria = x.BodegaEmpresaria }
        if (x.CarpetaImagenes != undefined) { this.CarpetaImagenes = x.CarpetaImagenes }
        if (x.CodigoParroquia != undefined) { this.CodigoParroquia = x.CodigoParroquia }
        if (x.DireccionPedidos != undefined) { this.DireccionPedidos = x.DireccionPedidos }
        if (x.EmailLider != undefined) { this.EmailLider = x.EmailLider }
        if (x.Celular2 != undefined) { this.Celular2 = x.Celular2 }

        if (x.Bodegas != undefined) { this.Bodegas = x.Bodegas }
        if (x.ClasificacionC != undefined) { this.ClasificacionC = x.ClasificacionC }
        if (x.Error != undefined) { this.Error = x.Error }

        return this
    }
    Build(): E_SessionEmpresaria {
        var obj: E_SessionEmpresaria = new E_SessionEmpresaria()

        obj.DocumentoEmpresaria = this.DocumentoEmpresaria
        obj.NombreEmpresariaCompleto = this.NombreEmpresariaCompleto
        obj.TipoPedidoMinimo = this.TipoPedidoMinimo
        obj.CodCiudadCliente = this.CodCiudadCliente
        obj.PremioBienvenida = this.PremioBienvenida
        obj.TipoEnvioCliente = this.TipoEnvioCliente
        obj.Empresaria_Lider = this.Empresaria_Lider
        obj.ExcentoIVA = this.ExcentoIVA
        obj.IdZona = this.IdZona
        obj.Email = this.Email
        obj.Vendedor = this.Vendedor
        obj.Clasificacion = this.Clasificacion
        obj.Telefono1 = this.Telefono1
        obj.Celular1 = this.Celular1
        obj.CodigoRegional = this.CodigoRegional
        obj.Usuario = this.Usuario
        obj.Whatsapp = this.Whatsapp
        obj.TipoCliente = this.TipoCliente
        obj.TallaPrendaSuperior = this.TallaPrendaSuperior
        obj.TallaPrendaInferior = this.TallaPrendaInferior
        obj.TallaCalzado = this.TallaCalzado
        obj.Catalogo = this.Catalogo
        obj.Campana = this.Campana
        obj.PuntosEmpresaria = this.PuntosEmpresaria
        obj.ValorPuntos = this.ValorPuntos
        obj.GrupoDescuento = this.GrupoDescuento
        obj.BodegaEmpresaria = this.BodegaEmpresaria
        obj.CarpetaImagenes = this.CarpetaImagenes
        obj.CodigoParroquia = this.CodigoParroquia
        obj.DireccionPedidos = this.DireccionPedidos
        obj.EmailLider = this.EmailLider
        obj.Celular2 = this.Celular2
        obj.Bodegas = this.Bodegas
        obj.ClasificacionC = this.ClasificacionC
        obj.Error = this.Error
        return obj
    }
}
