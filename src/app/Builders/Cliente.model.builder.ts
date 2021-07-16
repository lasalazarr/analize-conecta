import { E_Error } from "../Models/E_Error";
import { E_Cliente } from "../Models/E_Cliente";

export class ClienteBuilder {

    public Nit: string
    public Zona: string
    public ZonaDesc: string
    public RazonSocial: string
    public Contacto: string
    public DireccionResidencia: string
    public DireccionPedidos: string
    public Ciudad: string
    public Telefono1: string
    public Fax: string
    public Email: string
    public PlazoCredito: number
    public CupoAsignado: number
    public PrecioVenta: number
    public Descuento: number
    public Activo: number
    public Vendedor: string
    public VendedorNombre: string
    public Grancontribuyen: number
    public RetenedorFuente: number
    public RetenedorIca: number
    public CuentaContable: string
    public Localizacion: string
    public Clasificacion: string
    public Persona: string
    public Sector: string
    public FechaNacimiento: Date
    public CodCiudad: string
    public Categoria: string
    public Sexo: string
    public CuentaCRM: number
    public TipoDocumento: number
    public NombreTipoDocumento: string
    public Apellido1: string
    public Apellido2: string
    public Nombre1: string
    public Nombre2: string
    public DV: string
    public Simplificado: number
    public Autoretenedor: number
    public CodMediosMagneticos: string
    public Desmantelados: number
    public Telefono2: string
    public FechaIngreso: Date
    public UltimaModificacion: Date
    public SuspenderCredito: number
    public TipoTercero: number
    public Barrio: string
    public CodLista: string
    public Fpago: string
    public Facturar: number
    public Celular1: string
    public Celular2: string
    public IdEstadosCliente: number
    public NombreEstadosCliente: string
    public CodDepartamento: string
    public Departamento: string
    public CodPais: string
    public Pais: string
    public CodSector: string
    public IdReferidor: string
    public EnProduccion: boolean
    public TerminoProcess: boolean
    public TotalClientes: number
    public CodigoBarrio: number
    public NombreBarrio: string
    public CodigoCiudad2: number
    public NombreCiudad2: string
    public CodigoRegional: number
    public NombreRegional: string
    public NumeroPedido: string
    public Usuario: string
    public GuardarAuditoria: boolean
    public IdDistribuidor: number
    public DocumentoDistribuidor: string
    public Cxv_Id_Anterior: string
    public Cxv_Nombre_Anterior: string
    public Cxv_Id_Actual: string
    public Cxv_Nombre_Actual: string
    public Cxv_Fr: number
    public Cxv_Op: number
    public CodigoParroquia: string
    public NombreParroquia: string
    public Calles: string
    public NumeroCasa: string
    public ComoLlegar: string
    public ReferenciaFamiliar: string
    public TelefonoReferenciaFamiliar: string
    public NombreReferidor: string
    public OperadorCelular: string
    public Lider: string
    public CreadoPor: string
    public AprobadoCCN: boolean
    public ComoTeEnteraste: number
    public TerminosyCondiciones: boolean
    public FechaAceptacionTerminos: Date
    public MostrarTerminosyCondiciones: boolean
    public PedidoMinimoNivi: number
    public PedidoMinimoPisame: number
    public PedidoMinimoMixto: number
    public PedidoMinimoOutletNivi: number
    public PedidoMinimoHogarNivi: number
    public PedidoMinimoOutletPisame: number
    public TipoPedidoMinimo: number
    public IdCatalogoInteres: number
    public CatalogoInteres: string
    public Premio: number
    public TipoEnvio: number
    public ComoTeEnterasteNombre: string
    public CodCiudadDespacho: string
    public CodDeptoDespacho: string
    public IdTransportista: string
    public IdTipoRed: string
    public NombreTipoRed: string
    public NombreLider: string
    public NombreTransportista: string
    public Privilegio: boolean
    public Solicitudcredito: string
    public Cupo_credito: number
    public MPago: string
    public Saldo: number
    public Actudatos: number
    public Fechactudatos: Date
    public UltimaCompra: Date
    public Empresaria: string
    public TiempoContacto: string
    public Whatsapp: string
    public TipoCliente: string
    public TallaPrendaSuperior: string
    public TallaPrendaInferior: string
    public TallaCalzado: string
    public TarjetaCD: string
    public NombreEmpresariaCompleto: string

    public PorcentajeIvaFlete: number
    public ValorFleteSinIva: number
    public ValorFlete: number
    public EmpresariaLider: number

    public Bodega: string
    public GrupoDescuentoCliente: string
    public CodEstado: string
    public EmailLider: string
    public ClasificacionC: string
    public Contactada: boolean
    public InteresCredito: boolean
    public Geolocalizado: number  

    public Error: E_Error

    buildFromObject(x: any): ClienteBuilder {

        if (x.Nit != undefined) { this.Nit = x.Nit }
        if (x.Zona != undefined) { this.Zona = x.Zona }
        if (x.ZonaDesc != undefined) { this.ZonaDesc = x.ZonaDesc }
        if (x.RazonSocial != undefined) { this.RazonSocial = x.RazonSocial }
        if (x.Contacto != undefined) { this.Contacto = x.Contacto }
        if (x.DireccionResidencia != undefined) { this.DireccionResidencia = x.DireccionResidencia }
        if (x.DireccionPedidos != undefined) { this.DireccionPedidos = x.DireccionPedidos }
        if (x.Ciudad != undefined) { this.Ciudad = x.Ciudad }
        if (x.Telefono1 != undefined) { this.Telefono1 = x.Telefono1 }
        if (x.Fax != undefined) { this.Fax = x.Fax }
        if (x.Email != undefined) { this.Email = x.Email }
        if (x.PlazoCredito != undefined) { this.PlazoCredito = x.PlazoCredito }
        if (x.CupoAsignado != undefined) { this.CupoAsignado = x.CupoAsignado }
        if (x.PrecioVenta != undefined) { this.PrecioVenta = x.PrecioVenta }
        if (x.Descuento != undefined) { this.Descuento = x.Descuento }
        if (x.Activo != undefined) { this.Activo = x.Activo }
        if (x.Vendedor != undefined) { this.Vendedor = x.Vendedor }
        if (x.VendedorNombre != undefined) { this.VendedorNombre = x.VendedorNombre }
        if (x.Grancontribuyen != undefined) { this.Grancontribuyen = x.Grancontribuyen }
        if (x.RetenedorFuente != undefined) { this.RetenedorFuente = x.RetenedorFuente }
        if (x.RetenedorIca != undefined) { this.RetenedorIca = x.RetenedorIca }
        if (x.CuentaContable != undefined) { this.CuentaContable = x.CuentaContable }
        if (x.Localizacion != undefined) { this.Localizacion = x.Localizacion }
        if (x.Clasificacion != undefined) { this.Clasificacion = x.Clasificacion }
        if (x.Persona != undefined) { this.Persona = x.Persona }
        if (x.Sector != undefined) { this.Sector = x.Sector }
        if (x.FechaNacimiento != undefined) { this.FechaNacimiento = x.FechaNacimiento }
        if (x.CodCiudad != undefined) { this.CodCiudad = x.CodCiudad }
        if (x.Categoria != undefined) { this.Categoria = x.Categoria }
        if (x.Sexo != undefined) { this.Sexo = x.Sexo }
        if (x.CuentaCRM != undefined) { this.CuentaCRM = x.CuentaCRM }
        if (x.TipoDocumento != undefined) { this.TipoDocumento = x.TipoDocumento }
        if (x.NombreTipoDocumento != undefined) { this.NombreTipoDocumento = x.NombreTipoDocumento }
        if (x.Apellido1 != undefined) { this.Apellido1 = x.Apellido1 }
        if (x.Apellido2 != undefined) { this.Apellido2 = x.Apellido2 }
        if (x.Nombre1 != undefined) { this.Nombre1 = x.Nombre1 }
        if (x.Nombre2 != undefined) { this.Nombre2 = x.Nombre2 }
        if (x.DV != undefined) { this.DV = x.DV }
        if (x.Simplificado != undefined) { this.Simplificado = x.Simplificado }
        if (x.Autoretenedor != undefined) { this.Autoretenedor = x.Autoretenedor }
        if (x.CodMediosMagneticos != undefined) { this.CodMediosMagneticos = x.CodMediosMagneticos }
        if (x.Desmantelados != undefined) { this.Desmantelados = x.Desmantelados }
        if (x.Telefono2 != undefined) { this.Telefono2 = x.Telefono2 }
        if (x.FechaIngreso != undefined) { this.FechaIngreso = x.FechaIngreso }
        if (x.UltimaModificacion != undefined) { this.UltimaModificacion = x.UltimaModificacion }
        if (x.SuspenderCredito != undefined) { this.SuspenderCredito = x.SuspenderCredito }
        if (x.TipoTercero != undefined) { this.TipoTercero = x.TipoTercero }
        if (x.Barrio != undefined) { this.Barrio = x.Barrio }
        if (x.CodLista != undefined) { this.CodLista = x.CodLista }
        if (x.Fpago != undefined) { this.Fpago = x.Fpago }
        if (x.Facturar != undefined) { this.Facturar = x.Facturar }
        if (x.Celular1 != undefined) { this.Celular1 = x.Celular1 }
        if (x.Celular2 != undefined) { this.Celular2 = x.Celular2 }
        if (x.IdEstadosCliente != undefined) { this.IdEstadosCliente = x.IdEstadosCliente }
        if (x.NombreEstadosCliente != undefined) { this.NombreEstadosCliente = x.NombreEstadosCliente }
        if (x.CodDepartamento != undefined) { this.CodDepartamento = x.CodDepartamento }
        if (x.Departamento != undefined) { this.Departamento = x.Departamento }
        if (x.CodPais != undefined) { this.CodPais = x.CodPais }
        if (x.Pais != undefined) { this.Pais = x.Pais }
        if (x.CodSector != undefined) { this.CodSector = x.CodSector }
        if (x.IdReferidor != undefined) { this.IdReferidor = x.IdReferidor }
        if (x.EnProduccion != undefined) { this.EnProduccion = x.EnProduccion }
        if (x.TerminoProcess != undefined) { this.TerminoProcess = x.TerminoProcess }
        if (x.TotalClientes != undefined) { this.TotalClientes = x.TotalClientes }
        if (x.CodigoBarrio != undefined) { this.CodigoBarrio = x.CodigoBarrio }
        if (x.NombreBarrio != undefined) { this.NombreBarrio = x.NombreBarrio }
        if (x.CodigoCiudad2 != undefined) { this.CodigoCiudad2 = x.CodigoCiudad2 }
        if (x.NombreCiudad2 != undefined) { this.NombreCiudad2 = x.NombreCiudad2 }
        if (x.CodigoRegional != undefined) { this.CodigoRegional = x.CodigoRegional }
        if (x.NombreRegional != undefined) { this.NombreRegional = x.NombreRegional }
        if (x.NumeroPedido != undefined) { this.NumeroPedido = x.NumeroPedido }
        if (x.Usuario != undefined) { this.Usuario = x.Usuario }
        if (x.GuardarAuditoria != undefined) { this.GuardarAuditoria = x.GuardarAuditoria }
        if (x.IdDistribuidor != undefined) { this.IdDistribuidor = x.IdDistribuidor }
        if (x.DocumentoDistribuidor != undefined) { this.DocumentoDistribuidor = x.DocumentoDistribuidor }
        if (x.Cxv_Id_Anterior != undefined) { this.Cxv_Id_Anterior = x.Cxv_Id_Anterior }
        if (x.Cxv_Nombre_Anterior != undefined) { this.Cxv_Nombre_Anterior = x.Cxv_Nombre_Anterior }
        if (x.Cxv_Id_Actual != undefined) { this.Cxv_Id_Actual = x.Cxv_Id_Actual }
        if (x.Cxv_Nombre_Actual != undefined) { this.Cxv_Nombre_Actual = x.Cxv_Nombre_Actual }
        if (x.Cxv_Fr != undefined) { this.Cxv_Fr = x.Cxv_Fr }
        if (x.Cxv_Op != undefined) { this.Cxv_Op = x.Cxv_Op }
        if (x.CodigoParroquia != undefined) { this.CodigoParroquia = x.CodigoParroquia }
        if (x.NombreParroquia != undefined) { this.NombreParroquia = x.NombreParroquia }
        if (x.Calles != undefined) { this.Calles = x.Calles }
        if (x.NumeroCasa != undefined) { this.NumeroCasa = x.NumeroCasa }
        if (x.ComoLlegar != undefined) { this.ComoLlegar = x.ComoLlegar }
        if (x.ReferenciaFamiliar != undefined) { this.ReferenciaFamiliar = x.ReferenciaFamiliar }
        if (x.TelefonoReferenciaFamiliar != undefined) { this.TelefonoReferenciaFamiliar = x.TelefonoReferenciaFamiliar }
        if (x.NombreReferidor != undefined) { this.NombreReferidor = x.NombreReferidor }
        if (x.OperadorCelular != undefined) { this.OperadorCelular = x.OperadorCelular }
        if (x.Lider != undefined) { this.Lider = x.Lider }
        if (x.CreadoPor != undefined) { this.CreadoPor = x.CreadoPor }
        if (x.AprobadoCCN != undefined) { this.AprobadoCCN = x.AprobadoCCN }
        if (x.ComoTeEnteraste != undefined) { this.ComoTeEnteraste = x.ComoTeEnteraste }
        if (x.TerminosyCondiciones != undefined) { this.TerminosyCondiciones = x.TerminosyCondiciones }
        if (x.FechaAceptacionTerminos != undefined) { this.FechaAceptacionTerminos = x.FechaAceptacionTerminos }
        if (x.MostrarTerminosyCondiciones != undefined) { this.MostrarTerminosyCondiciones = x.MostrarTerminosyCondiciones }
        if (x.PedidoMinimoNivi != undefined) { this.PedidoMinimoNivi = x.PedidoMinimoNivi }
        if (x.PedidoMinimoPisame != undefined) { this.PedidoMinimoPisame = x.PedidoMinimoPisame }
        if (x.PedidoMinimoMixto != undefined) { this.PedidoMinimoMixto = x.PedidoMinimoMixto }
        if (x.PedidoMinimoOutletNivi != undefined) { this.PedidoMinimoOutletNivi = x.PedidoMinimoOutletNivi }
        if (x.PedidoMinimoHogarNivi != undefined) { this.PedidoMinimoHogarNivi = x.PedidoMinimoHogarNivi }
        if (x.PedidoMinimoOutletPisame != undefined) { this.PedidoMinimoOutletPisame = x.PedidoMinimoOutletPisame }
        if (x.TipoPedidoMinimo != undefined) { this.TipoPedidoMinimo = x.TipoPedidoMinimo }
        if (x.IdCatalogoInteres != undefined) { this.IdCatalogoInteres = x.IdCatalogoInteres }
        if (x.CatalogoInteres != undefined) { this.CatalogoInteres = x.CatalogoInteres }
        if (x.Premio != undefined) { this.Premio = x.Premio }
        if (x.TipoEnvio != undefined) { this.TipoEnvio = x.TipoEnvio }
        if (x.ComoTeEnterasteNombre != undefined) { this.ComoTeEnterasteNombre = x.ComoTeEnterasteNombre }
        if (x.CodCiudadDespacho != undefined) { this.CodCiudadDespacho = x.CodCiudadDespacho }
        if (x.CodDeptoDespacho != undefined) { this.CodDeptoDespacho = x.CodDeptoDespacho }
        if (x.IdTransportista != undefined) { this.IdTransportista = x.IdTransportista }
        if (x.IdTipoRed != undefined) { this.IdTipoRed = x.IdTipoRed }
        if (x.NombreTipoRed != undefined) { this.NombreTipoRed = x.NombreTipoRed }
        if (x.NombreLider != undefined) { this.NombreLider = x.NombreLider }
        if (x.NombreTransportista != undefined) { this.NombreTransportista = x.NombreTransportista }
        if (x.Privilegio != undefined) { this.Privilegio = x.Privilegio }
        if (x.Solicitudcredito != undefined) { this.Solicitudcredito = x.Solicitudcredito }
        if (x.Cupo_credito != undefined) { this.Cupo_credito = x.Cupo_credito }
        if (x.MPago != undefined) { this.MPago = x.MPago }
        if (x.Saldo != undefined) { this.Saldo = x.Saldo }
        if (x.Actudatos != undefined) { this.Actudatos = x.Actudatos }
        if (x.Fechactudatos != undefined) { this.Fechactudatos = x.Fechactudatos }
        if (x.UltimaCompra != undefined) { this.UltimaCompra = x.UltimaCompra }
        if (x.Empresaria != undefined) { this.Empresaria = x.Empresaria }
        if (x.TiempoContacto != undefined) { this.TiempoContacto = x.TiempoContacto }
        if (x.Whatsapp != undefined) { this.Whatsapp = x.Whatsapp }
        if (x.TipoCliente != undefined) { this.TipoCliente = x.TipoCliente }
        if (x.TallaPrendaSuperior != undefined) { this.TallaPrendaSuperior = x.TallaPrendaSuperior }
        if (x.TallaPrendaInferior != undefined) { this.TallaPrendaInferior = x.TallaPrendaInferior }
        if (x.TallaCalzado != undefined) { this.TallaCalzado = x.TallaCalzado }
        if (x.TarjetaCD != undefined) { this.TarjetaCD = x.TarjetaCD }
        if (x.NombreEmpresariaCompleto != undefined) { this.NombreEmpresariaCompleto = x.NombreEmpresariaCompleto }

        if (x.PorcentajeIvaFlete != undefined) { this.PorcentajeIvaFlete = x.PorcentajeIvaFlete }
        if (x.ValorFleteSinIva != undefined) { this.ValorFleteSinIva = x.ValorFleteSinIva }
        if (x.ValorFlete != undefined) { this.ValorFlete = x.ValorFlete }
        if (x.EmpresariaLider != undefined) { this.EmpresariaLider = x.EmpresariaLider }

        if (x.Bodega != undefined) { this.Bodega = x.Bodega }
        if (x.GrupoDescuentoCliente != undefined) { this.GrupoDescuentoCliente = x.GrupoDescuentoCliente }
        if (x.CodEstado != undefined) { this.CodEstado = x.CodEstado }
        if (x.EmailLider != undefined) { this.EmailLider = x.EmailLider }
        if (x.ClasificacionC != undefined) { this.ClasificacionC = x.ClasificacionC }
        if (x.Contactada != undefined) { this.Contactada = x.Contactada }
        if (x.InteresCredito != undefined) { this.InteresCredito = x.InteresCredito }
        if (x.Geolocalizado != undefined) { this.Geolocalizado = x.Geolocalizado }
        if (x.Error != undefined) { this.Error = x.Error }

        return this
    }
    Build(): E_Cliente {
        var obj: E_Cliente = new E_Cliente()

        obj.Nit = this.Nit
        obj.Zona = this.Zona
        obj.ZonaDesc = this.ZonaDesc
        obj.RazonSocial = this.RazonSocial
        obj.Contacto = this.Contacto
        obj.DireccionResidencia = this.DireccionResidencia
        obj.DireccionPedidos = this.DireccionPedidos
        obj.Ciudad = this.Ciudad
        obj.Telefono1 = this.Telefono1
        obj.Fax = this.Fax
        obj.Email = this.Email
        obj.PlazoCredito = this.PlazoCredito
        obj.CupoAsignado = this.CupoAsignado
        obj.PrecioVenta = this.PrecioVenta
        obj.Descuento = this.Descuento
        obj.Activo = this.Activo
        obj.Vendedor = this.Vendedor
        obj.VendedorNombre = this.VendedorNombre
        obj.Grancontribuyen = this.Grancontribuyen
        obj.RetenedorFuente = this.RetenedorFuente
        obj.RetenedorIca = this.RetenedorIca
        obj.CuentaContable = this.CuentaContable
        obj.Localizacion = this.Localizacion
        obj.Clasificacion = this.Clasificacion
        obj.Persona = this.Persona
        obj.Sector = this.Sector
        obj.FechaNacimiento = this.FechaNacimiento
        obj.CodCiudad = this.CodCiudad
        obj.Categoria = this.Categoria
        obj.Sexo = this.Sexo
        obj.CuentaCRM = this.CuentaCRM
        obj.TipoDocumento = this.TipoDocumento
        obj.NombreTipoDocumento = this.NombreTipoDocumento
        obj.Apellido1 = this.Apellido1
        obj.Apellido2 = this.Apellido2
        obj.Nombre1 = this.Nombre1
        obj.Nombre2 = this.Nombre2
        obj.DV = this.DV
        obj.Simplificado = this.Simplificado
        obj.Autoretenedor = this.Autoretenedor
        obj.CodMediosMagneticos = this.CodMediosMagneticos
        obj.Desmantelados = this.Desmantelados
        obj.Telefono2 = this.Telefono2
        obj.FechaIngreso = this.FechaIngreso
        obj.UltimaModificacion = this.UltimaModificacion
        obj.SuspenderCredito = this.SuspenderCredito
        obj.TipoTercero = this.TipoTercero
        obj.Barrio = this.Barrio
        obj.CodLista = this.CodLista
        obj.Fpago = this.Fpago
        obj.Facturar = this.Facturar
        obj.Celular1 = this.Celular1
        obj.Celular2 = this.Celular2
        obj.IdEstadosCliente = this.IdEstadosCliente
        obj.NombreEstadosCliente = this.NombreEstadosCliente
        obj.CodDepartamento = this.CodDepartamento
        obj.Departamento = this.Departamento
        obj.CodPais = this.CodPais
        obj.Pais = this.Pais
        obj.CodSector = this.CodSector
        obj.IdReferidor = this.IdReferidor
        obj.EnProduccion = this.EnProduccion
        obj.TerminoProcess = this.TerminoProcess
        obj.TotalClientes = this.TotalClientes
        obj.CodigoBarrio = this.CodigoBarrio
        obj.NombreBarrio = this.NombreBarrio
        obj.CodigoCiudad2 = this.CodigoCiudad2
        obj.NombreCiudad2 = this.NombreCiudad2
        obj.CodigoRegional = this.CodigoRegional
        obj.NombreRegional = this.NombreRegional
        obj.NumeroPedido = this.NumeroPedido
        obj.Usuario = this.Usuario
        obj.GuardarAuditoria = this.GuardarAuditoria
        obj.IdDistribuidor = this.IdDistribuidor
        obj.DocumentoDistribuidor = this.DocumentoDistribuidor
        obj.Cxv_Id_Anterior = this.Cxv_Id_Anterior
        obj.Cxv_Nombre_Anterior = this.Cxv_Nombre_Anterior
        obj.Cxv_Id_Actual = this.Cxv_Id_Actual
        obj.Cxv_Nombre_Actual = this.Cxv_Nombre_Actual
        obj.Cxv_Fr = this.Cxv_Fr
        obj.Cxv_Op = this.Cxv_Op
        obj.CodigoParroquia = this.CodigoParroquia
        obj.NombreParroquia = this.NombreParroquia
        obj.Calles = this.Calles
        obj.NumeroCasa = this.NumeroCasa
        obj.ComoLlegar = this.ComoLlegar
        obj.ReferenciaFamiliar = this.ReferenciaFamiliar
        obj.TelefonoReferenciaFamiliar = this.TelefonoReferenciaFamiliar
        obj.NombreReferidor = this.NombreReferidor
        obj.OperadorCelular = this.OperadorCelular
        obj.Lider = this.Lider
        obj.CreadoPor = this.CreadoPor
        obj.AprobadoCCN = this.AprobadoCCN
        obj.ComoTeEnteraste = this.ComoTeEnteraste
        obj.TerminosyCondiciones = this.TerminosyCondiciones
        obj.FechaAceptacionTerminos = this.FechaAceptacionTerminos
        obj.MostrarTerminosyCondiciones = this.MostrarTerminosyCondiciones
        obj.PedidoMinimoNivi = this.PedidoMinimoNivi
        obj.PedidoMinimoPisame = this.PedidoMinimoPisame
        obj.PedidoMinimoMixto = this.PedidoMinimoMixto
        obj.PedidoMinimoOutletNivi = this.PedidoMinimoOutletNivi
        obj.PedidoMinimoHogarNivi = this.PedidoMinimoHogarNivi
        obj.PedidoMinimoOutletPisame = this.PedidoMinimoOutletPisame
        obj.TipoPedidoMinimo = this.TipoPedidoMinimo
        obj.IdCatalogoInteres = this.IdCatalogoInteres
        obj.CatalogoInteres = this.CatalogoInteres
        obj.Premio = this.Premio
        obj.TipoEnvio = this.TipoEnvio
        obj.ComoTeEnterasteNombre = this.ComoTeEnterasteNombre
        obj.CodCiudadDespacho = this.CodCiudadDespacho
        obj.CodDeptoDespacho = this.CodDeptoDespacho
        obj.IdTransportista = this.IdTransportista
        obj.IdTipoRed = this.IdTipoRed
        obj.NombreTipoRed = this.NombreTipoRed
        obj.NombreLider = this.NombreLider
        obj.NombreTransportista = this.NombreTransportista
        obj.Privilegio = this.Privilegio
        obj.Solicitudcredito = this.Solicitudcredito
        obj.Cupo_credito = this.Cupo_credito
        obj.MPago = this.MPago
        obj.Saldo = this.Saldo
        obj.Actudatos = this.Actudatos
        obj.Fechactudatos = this.Fechactudatos
        obj.UltimaCompra = this.UltimaCompra
        obj.Empresaria = this.Empresaria
        obj.TiempoContacto = this.TiempoContacto
        obj.Whatsapp = this.Whatsapp
        obj.TipoCliente = this.TipoCliente
        obj.TallaPrendaSuperior = this.TallaPrendaSuperior
        obj.TallaPrendaInferior = this.TallaPrendaInferior
        obj.TallaCalzado = this.TallaCalzado
        obj.TarjetaCD = this.TarjetaCD
        obj.NombreEmpresariaCompleto = this.NombreEmpresariaCompleto

        obj.PorcentajeIvaFlete = this.PorcentajeIvaFlete
        obj.ValorFleteSinIva = this.ValorFleteSinIva
        obj.ValorFlete = this.ValorFlete
        obj.EmpresariaLider = this.EmpresariaLider

        obj.Bodega = this.Bodega
        obj.GrupoDescuentoCliente = this.GrupoDescuentoCliente
        obj.CodEstado = this.CodEstado
        obj.EmailLider = this.EmailLider
        obj.ClasificacionC = this.ClasificacionC
        obj.Contactada = this.Contactada
        obj.InteresCredito = this.InteresCredito
        obj.Geolocalizado = this.Geolocalizado



        obj.Error = this.Error

        return obj
    }


}
