
import { E_Error } from "../Models/E_Error";
import { E_PedidosCliente } from 'app/Models/E_PedidosCliente';

export class PedidosClienteBuilder {

    public Numero: string
    public Mes: string;
    public Fecha: Date;
    public Anulado: number;
    public Espera: number;
    public Despacho: Date;
    public Nit: string;
    public Vendedor: string;
    public IVA: number;
    public Valor: number;
    public Descuento: number;
    public FechaCreacion: Date;
    public ClaveUsuario: string;
    public Zona: string;
    public CodigoNumeracion: string;
    public Transmitido: number;
    public Campana: string;
    public NumeroEnvio: string;
    public NoFacturado: number;
    public Facturar: number;
    public CodTipo: string;
    public Devol: string;
    public Factura: string;
    public NombreVendedor: string;
    public NombreEmpresaria: string;
    public NombreZona: string;
    public IdEstado: number;
    public NombreEstado: string;
    public Orden: number;
    public Procesado: boolean;
    public NivelServicioEstimado: number;
    public NivelServicioReal: number;
    public NivelServicioEstado: boolean;
    public NivelServicioTipo: string;
    public TotalPedidosProcesados: number;
    public TotalPedidosNoProcesados: number;
    public TotalPedidos: number;
    public Consecutivo: number;
    public TerminoProcess: boolean;
    public TotalSiCumplenNivelServicio: number;
    public TotalNoCumplenNivelServicio: number;
    public TotalSiCumplenReglas: number;
    public TotalNoCumplenReglas: number;
    public TotalSiCumplenInventario: number;
    public TotalNoCumplenInventario: number;
    public ValorPremio: number;
    public ValorPremioNiveles: number;
    public ValorPremioNivelesSep: number;
    public FechaUltimaModificacion: Date;
    public IdArticuloPremio: number;
    public TipoQuery: string;
    public ValorIva: number;
    public Mailgroup: string;
    public EnProduccion: boolean;
    public IVAPrecioCat: number;
    public ValorPrecioCat: number;
    public Codigo: string;
    public GrupoCatalogo: string;
    public TotalPrecioCatalogo: number;
    public GeneraPremios: boolean;
    public ValorTotalNeto: number;
    public ValorTotalIvaFlete: number;
    public ValorTotalIvaFleteFactura: number;
    public DescripcionReferencia: string;
    public Referencia: string;
    public CantidadPedida: number;
    public CodigoTotal: string;
    public CCostos: string;
    public GuardarAuditoria: boolean;
    public Usuario: string;
    public DireccionEntregaPedido: string;
    public CodigoCiudad: string;
    public NombreCiudad: string;
    public TelefonoPrincipal: string;
    public Email: string;
    public Celular: string;
    public Sector: string;
    public Referido: string;
    public UltimaModificacionEmpresaria: Date;
    public IdEstadoCliente: number;
    public EstadoCliente: string;
    public IdEstadoPedido: number;
    public EstadoPedido: string;
    public IdVendedor: string;
    public CedulaVendedor: string;
    public NumeroFactura: string;
    public Anexo: number;
    public ProcesadoClienteHistorico: boolean;
    public IdLider: string;
    public Saldo: number;
    public NumeroFac: string;
    public IdCodigoCorto: string;
    public Reserva: boolean;
    public Borrador: boolean;
    public FechaCierreBorrador: Date;
    public FechaCierreReserva: Date;
    public FechaCierreReservaReal: Date;
    public Portal: string;
    public TelefonoDos: string;
    public FechaIngresoCliente: Date;
    public CelularDos: string;
    public ClasificacionCliente: string;
    public ClienteCreadoPor: string;
    public TipoEnvio: number;
    public CiudadDespacho: string;
    public FacturacionSemanal: boolean;
    public UsuarioDigito: string;
    public Cupo_asignado: number;
    public Claseventa: string;
    public FechaAnulacion: Date;
    public MotivoAnulacion: string;
    public DescripcionAnulacion: string;
    public Asistente: string;
    public NombreAnulo: string;
    public ExcentoIVA: boolean;
    public CodCiudadCliente: string;
    public okTransEncabezadoPedido: boolean;
    public okTransDetallePedido: boolean;
    public PuntosUsar: number;
    public TotalPuntosPedido: number;
    public Guia: string;
    public NumeroDespacho: string;
    public OperadorLogistico: string;
    public PagarFletePuntos: boolean;
    public ClienteFinal : string;
    public Bodega: string;
    public NombreDestinatario: string;
    public PuntoEnvio: string;
    public Error: E_Error

    buildFromObject(x: any): PedidosClienteBuilder {
        if (x.Numero != undefined) { this.Numero = x.Numero }
        if (x.Mes != undefined) { this.Mes = x.Mes }
        if (x.Fecha != undefined) { this.Fecha = x.Fecha }
        if (x.Anulado != undefined) { this.Anulado = x.Anulado }
        if (x.Espera != undefined) { this.Espera = x.Espera }
        if (x.Despacho != undefined) { this.Despacho = x.Despacho }
        if (x.Nit != undefined) { this.Nit = x.Nit }
        if (x.Vendedor != undefined) { this.Vendedor = x.Vendedor }
        if (x.IVA != undefined) { this.IVA = x.IVA }
        if (x.Valor != undefined) { this.Valor = x.Valor }
        if (x.Descuento != undefined) { this.Descuento = x.Descuento }
        if (x.FechaCreacion != undefined) { this.FechaCreacion = x.FechaCreacion }
        if (x.ClaveUsuario != undefined) { this.ClaveUsuario = x.ClaveUsuario }
        if (x.Zona != undefined) { this.Zona = x.Zona }
        if (x.CodigoNumeracion != undefined) { this.CodigoNumeracion = x.CodigoNumeracion }
        if (x.Transmitido != undefined) { this.Transmitido = x.Transmitido }
        if (x.Campana != undefined) { this.Campana = x.Campana }
        if (x.NumeroEnvio != undefined) { this.NumeroEnvio = x.NumeroEnvio }
        if (x.NoFacturado != undefined) { this.NoFacturado = x.NoFacturado }
        if (x.Facturar != undefined) { this.Facturar = x.Facturar }
        if (x.CodTipo != undefined) { this.CodTipo = x.CodTipo }
        if (x.Devol != undefined) { this.Devol = x.Devol }
        if (x.Factura != undefined) { this.Factura = x.Factura }
        if (x.NombreVendedor != undefined) { this.NombreVendedor = x.NombreVendedor }
        if (x.NombreEmpresaria != undefined) { this.NombreEmpresaria = x.NombreEmpresaria }
        if (x.NombreZona != undefined) { this.NombreZona = x.NombreZona }
        if (x.IdEstado != undefined) { this.IdEstado = x.IdEstado }
        if (x.NombreEstado != undefined) { this.NombreEstado = x.NombreEstado }
        if (x.Orden != undefined) { this.Orden = x.Orden }
        if (x.Procesado != undefined) { this.Procesado = x.Procesado }
        if (x.NivelServicioEstimado != undefined) { this.NivelServicioEstimado = x.NivelServicioEstimado }
        if (x.NivelServicioReal != undefined) { this.NivelServicioReal = x.NivelServicioReal }
        if (x.NivelServicioEstado != undefined) { this.NivelServicioEstado = x.NivelServicioEstado }
        if (x.NivelServicioTipo != undefined) { this.NivelServicioTipo = x.NivelServicioTipo }
        if (x.TotalPedidosProcesados != undefined) { this.TotalPedidosProcesados = x.TotalPedidosProcesados }
        if (x.TotalPedidosNoProcesados != undefined) { this.TotalPedidosNoProcesados = x.TotalPedidosNoProcesados }
        if (x.TotalPedidos != undefined) { this.TotalPedidos = x.TotalPedidos }
        if (x.Consecutivo != undefined) { this.Consecutivo = x.Consecutivo }
        if (x.TerminoProcess != undefined) { this.TerminoProcess = x.TerminoProcess }
        if (x.TotalSiCumplenNivelServicio != undefined) { this.TotalSiCumplenNivelServicio = x.TotalSiCumplenNivelServicio }
        if (x.TotalNoCumplenNivelServicio != undefined) { this.TotalNoCumplenNivelServicio = x.TotalNoCumplenNivelServicio }
        if (x.TotalSiCumplenReglas != undefined) { this.TotalSiCumplenReglas = x.TotalSiCumplenReglas }
        if (x.TotalNoCumplenReglas != undefined) { this.TotalNoCumplenReglas = x.TotalNoCumplenReglas }
        if (x.TotalSiCumplenInventario != undefined) { this.TotalSiCumplenInventario = x.TotalSiCumplenInventario }
        if (x.TotalNoCumplenInventario != undefined) { this.TotalNoCumplenInventario = x.TotalNoCumplenInventario }
        if (x.ValorPremio != undefined) { this.ValorPremio = x.ValorPremio }
        if (x.ValorPremioNiveles != undefined) { this.ValorPremioNiveles = x.ValorPremioNiveles }
        if (x.ValorPremioNivelesSep != undefined) { this.ValorPremioNivelesSep = x.ValorPremioNivelesSep }
        if (x.FechaUltimaModificacion != undefined) { this.FechaUltimaModificacion = x.FechaUltimaModificacion }
        if (x.IdArticuloPremio != undefined) { this.IdArticuloPremio = x.IdArticuloPremio }
        if (x.TipoQuery != undefined) { this.TipoQuery = x.TipoQuery }
        if (x.ValorIva != undefined) { this.ValorIva = x.ValorIva }
        if (x.Mailgroup != undefined) { this.Mailgroup = x.Mailgroup }
        if (x.EnProduccion != undefined) { this.EnProduccion = x.EnProduccion }
        if (x.IVAPrecioCat != undefined) { this.IVAPrecioCat = x.IVAPrecioCat }
        if (x.ValorPrecioCat != undefined) { this.ValorPrecioCat = x.ValorPrecioCat }
        if (x.Codigo != undefined) { this.Codigo = x.Codigo }
        if (x.GrupoCatalogo != undefined) { this.GrupoCatalogo = x.GrupoCatalogo }
        if (x.TotalPrecioCatalogo != undefined) { this.TotalPrecioCatalogo = x.TotalPrecioCatalogo }
        if (x.GeneraPremios != undefined) { this.GeneraPremios = x.GeneraPremios }
        if (x.ValorTotalNeto != undefined) { this.ValorTotalNeto = x.ValorTotalNeto }
        if (x.ValorTotalIvaFlete != undefined) { this.ValorTotalIvaFlete = x.ValorTotalIvaFlete }
        if (x.ValorTotalIvaFleteFactura != undefined) { this.ValorTotalIvaFleteFactura = x.ValorTotalIvaFleteFactura }
        if (x.DescripcionReferencia != undefined) { this.DescripcionReferencia = x.DescripcionReferencia }
        if (x.Referencia != undefined) { this.Referencia = x.Referencia }
        if (x.CantidadPedida != undefined) { this.CantidadPedida = x.CantidadPedida }
        if (x.CodigoTotal != undefined) { this.CodigoTotal = x.CodigoTotal }
        if (x.CCostos != undefined) { this.CCostos = x.CCostos }
        if (x.GuardarAuditoria != undefined) { this.GuardarAuditoria = x.GuardarAuditoria }
        if (x.Usuario != undefined) { this.Usuario = x.Usuario }
        if (x.DireccionEntregaPedido != undefined) { this.DireccionEntregaPedido = x.DireccionEntregaPedido }
        if (x.CodigoCiudad != undefined) { this.CodigoCiudad = x.CodigoCiudad }
        if (x.NombreCiudad != undefined) { this.NombreCiudad = x.NombreCiudad }
        if (x.TelefonoPrincipal != undefined) { this.TelefonoPrincipal = x.TelefonoPrincipal }
        if (x.Email != undefined) { this.Email = x.Email }
        if (x.Celular != undefined) { this.Celular = x.Celular }
        if (x.Sector != undefined) { this.Sector = x.Sector }
        if (x.Referido != undefined) { this.Referido = x.Referido }
        if (x.UltimaModificacionEmpresaria != undefined) { this.UltimaModificacionEmpresaria = x.UltimaModificacionEmpresaria }
        if (x.IdEstadoCliente != undefined) { this.IdEstadoCliente = x.IdEstadoCliente }
        if (x.EstadoCliente != undefined) { this.EstadoCliente = x.EstadoCliente }
        if (x.IdEstadoPedido != undefined) { this.IdEstadoPedido = x.IdEstadoPedido }
        if (x.EstadoPedido != undefined) { this.EstadoPedido = x.EstadoPedido }
        if (x.IdVendedor != undefined) { this.IdVendedor = x.IdVendedor }
        if (x.CedulaVendedor != undefined) { this.CedulaVendedor = x.CedulaVendedor }
        if (x.NumeroFactura != undefined) { this.NumeroFactura = x.NumeroFactura }
        if (x.Anexo != undefined) { this.Anexo = x.Anexo }
        if (x.ProcesadoClienteHistorico != undefined) { this.ProcesadoClienteHistorico = x.ProcesadoClienteHistorico }
        if (x.IdLider != undefined) { this.IdLider = x.IdLider }
        if (x.Saldo != undefined) { this.Saldo = x.Saldo }
        if (x.NumeroFac != undefined) { this.NumeroFac = x.NumeroFac }
        if (x.IdCodigoCorto != undefined) { this.IdCodigoCorto = x.IdCodigoCorto }
        if (x.Reserva != undefined) { this.Reserva = x.Reserva }
        if (x.Borrador != undefined) { this.Borrador = x.Borrador }
        if (x.FechaCierreBorrador != undefined) { this.FechaCierreBorrador = x.FechaCierreBorrador }
        if (x.FechaCierreReserva != undefined) { this.FechaCierreReserva = x.FechaCierreReserva }
        if (x.FechaCierreReservaReal != undefined) { this.FechaCierreReservaReal = x.FechaCierreReservaReal }
        if (x.Portal != undefined) { this.Portal = x.Portal }
        if (x.TelefonoDos != undefined) { this.TelefonoDos = x.TelefonoDos }
        if (x.FechaIngresoCliente != undefined) { this.FechaIngresoCliente = x.FechaIngresoCliente }
        if (x.CelularDos != undefined) { this.CelularDos = x.CelularDos }
        if (x.ClasificacionCliente != undefined) { this.ClasificacionCliente = x.ClasificacionCliente }
        if (x.ClienteCreadoPor != undefined) { this.ClienteCreadoPor = x.ClienteCreadoPor }
        if (x.TipoEnvio != undefined) { this.TipoEnvio = x.TipoEnvio }
        if (x.CiudadDespacho != undefined) { this.CiudadDespacho = x.CiudadDespacho }
        if (x.FacturacionSemanal != undefined) { this.FacturacionSemanal = x.FacturacionSemanal }
        if (x.UsuarioDigito != undefined) { this.UsuarioDigito = x.UsuarioDigito }
        if (x.Cupo_asignado != undefined) { this.Cupo_asignado = x.Cupo_asignado }
        if (x.Claseventa != undefined) { this.Claseventa = x.Claseventa }
        if (x.FechaAnulacion != undefined) { this.FechaAnulacion = x.FechaAnulacion }
        if (x.MotivoAnulacion != undefined) { this.MotivoAnulacion = x.MotivoAnulacion }
        if (x.DescripcionAnulacion != undefined) { this.DescripcionAnulacion = x.DescripcionAnulacion }
        if (x.Asistente != undefined) { this.Asistente = x.Asistente }
        if (x.NombreAnulo != undefined) { this.NombreAnulo = x.NombreAnulo }
        if (x.ExcentoIVA != undefined) { this.ExcentoIVA = x.ExcentoIVA }
        if (x.CodCiudadCliente != undefined) { this.CodCiudadCliente = x.CodCiudadCliente }
        if (x.okTransEncabezadoPedido != undefined) { this.okTransEncabezadoPedido = x.okTransEncabezadoPedido }
        if (x.okTransDetallePedido != undefined) { this.okTransDetallePedido = x.okTransDetallePedido }
        if (x.PuntosUsar != undefined) { this.PuntosUsar = x.PuntosUsar }
        if (x.TotalPuntosPedido != undefined) { this.TotalPuntosPedido = x.TotalPuntosPedido }
        if (x.Guia != undefined) { this.Guia = x.Guia }
        if (x.NumeroDespacho != undefined) { this.NumeroDespacho = x.NumeroDespacho }
        if (x.PagarFletePuntos != undefined) { this.PagarFletePuntos = x.PagarFletePuntos }
        if (x.OperadorLogistico != undefined) { this.OperadorLogistico = x.OperadorLogistico }
        if (x.ClienteFinal != undefined) { this.ClienteFinal = x.ClienteFinal }
        if (x.Bodega != undefined) { this.Bodega = x.Bodega }
        if (x.NombreDestinatario != undefined) { this.NombreDestinatario = x.NombreDestinatario }
        if (x.PuntoEnvio != undefined) { this.PuntoEnvio = x.PuntoEnvio }
        if (x.Error != undefined) { this.Error = x.Error }

        return this
    }
    Build(): E_PedidosCliente {
        var obj: E_PedidosCliente = new E_PedidosCliente()
        obj.Numero = this.Numero
        obj.Mes = this.Mes
        obj.Fecha = this.Fecha
        obj.Anulado = this.Anulado
        obj.Espera = this.Espera
        obj.Despacho = this.Despacho
        obj.Nit = this.Nit
        obj.Vendedor = this.Vendedor
        obj.IVA = this.IVA
        obj.Valor = this.Valor
        obj.Descuento = this.Descuento
        obj.FechaCreacion = this.FechaCreacion
        obj.ClaveUsuario = this.ClaveUsuario
        obj.Zona = this.Zona
        obj.CodigoNumeracion = this.CodigoNumeracion
        obj.Transmitido = this.Transmitido
        obj.Campana = this.Campana
        obj.NumeroEnvio = this.NumeroEnvio
        obj.NoFacturado = this.NoFacturado
        obj.Facturar = this.Facturar
        obj.CodTipo = this.CodTipo
        obj.Devol = this.Devol
        obj.Factura = this.Factura
        obj.NombreVendedor = this.NombreVendedor
        obj.NombreEmpresaria = this.NombreEmpresaria
        obj.NombreZona = this.NombreZona
        obj.IdEstado = this.IdEstado
        obj.NombreEstado = this.NombreEstado
        obj.Orden = this.Orden
        obj.Procesado = this.Procesado
        obj.NivelServicioEstimado = this.NivelServicioEstimado
        obj.NivelServicioReal = this.NivelServicioReal
        obj.NivelServicioEstado = this.NivelServicioEstado
        obj.NivelServicioTipo = this.NivelServicioTipo
        obj.TotalPedidosProcesados = this.TotalPedidosProcesados
        obj.TotalPedidosNoProcesados = this.TotalPedidosNoProcesados
        obj.TotalPedidos = this.TotalPedidos
        obj.Consecutivo = this.Consecutivo
        obj.TerminoProcess = this.TerminoProcess
        obj.TotalSiCumplenNivelServicio = this.TotalSiCumplenNivelServicio
        obj.TotalNoCumplenNivelServicio = this.TotalNoCumplenNivelServicio
        obj.TotalSiCumplenReglas = this.TotalSiCumplenReglas
        obj.TotalNoCumplenReglas = this.TotalNoCumplenReglas
        obj.TotalSiCumplenInventario = this.TotalSiCumplenInventario
        obj.TotalNoCumplenInventario = this.TotalNoCumplenInventario
        obj.ValorPremio = this.ValorPremio
        obj.ValorPremioNiveles = this.ValorPremioNiveles
        obj.ValorPremioNivelesSep = this.ValorPremioNivelesSep
        obj.FechaUltimaModificacion = this.FechaUltimaModificacion
        obj.IdArticuloPremio = this.IdArticuloPremio
        obj.TipoQuery = this.TipoQuery
        obj.ValorIva = this.ValorIva
        obj.Mailgroup = this.Mailgroup
        obj.EnProduccion = this.EnProduccion
        obj.IVAPrecioCat = this.IVAPrecioCat
        obj.ValorPrecioCat = this.ValorPrecioCat
        obj.Codigo = this.Codigo
        obj.GrupoCatalogo = this.GrupoCatalogo
        obj.TotalPrecioCatalogo = this.TotalPrecioCatalogo
        obj.GeneraPremios = this.GeneraPremios
        obj.ValorTotalNeto = this.ValorTotalNeto
        obj.ValorTotalIvaFlete = this.ValorTotalIvaFlete
        obj.ValorTotalIvaFleteFactura = this.ValorTotalIvaFleteFactura
        obj.DescripcionReferencia = this.DescripcionReferencia
        obj.Referencia = this.Referencia
        obj.CantidadPedida = this.CantidadPedida
        obj.CodigoTotal = this.CodigoTotal
        obj.CCostos = this.CCostos
        obj.GuardarAuditoria = this.GuardarAuditoria
        obj.Usuario = this.Usuario
        obj.DireccionEntregaPedido = this.DireccionEntregaPedido
        obj.CodigoCiudad = this.CodigoCiudad
        obj.NombreCiudad = this.NombreCiudad
        obj.TelefonoPrincipal = this.TelefonoPrincipal
        obj.Email = this.Email
        obj.Celular = this.Celular
        obj.Sector = this.Sector
        obj.Referido = this.Referido
        obj.UltimaModificacionEmpresaria = this.UltimaModificacionEmpresaria
        obj.IdEstadoCliente = this.IdEstadoCliente
        obj.EstadoCliente = this.EstadoCliente
        obj.IdEstadoPedido = this.IdEstadoPedido
        obj.EstadoPedido = this.EstadoPedido
        obj.IdVendedor = this.IdVendedor
        obj.CedulaVendedor = this.CedulaVendedor
        obj.NumeroFactura = this.NumeroFactura
        obj.Anexo = this.Anexo
        obj.ProcesadoClienteHistorico = this.ProcesadoClienteHistorico
        obj.IdLider = this.IdLider
        obj.Saldo = this.Saldo
        obj.NumeroFac = this.NumeroFac
        obj.IdCodigoCorto = this.IdCodigoCorto
        obj.Reserva = this.Reserva
        obj.Borrador = this.Borrador
        obj.FechaCierreBorrador = this.FechaCierreBorrador
        obj.FechaCierreReserva = this.FechaCierreReserva
        obj.FechaCierreReservaReal = this.FechaCierreReservaReal
        obj.Portal = this.Portal
        obj.TelefonoDos = this.TelefonoDos
        obj.FechaIngresoCliente = this.FechaIngresoCliente
        obj.CelularDos = this.CelularDos
        obj.ClasificacionCliente = this.ClasificacionCliente
        obj.ClienteCreadoPor = this.ClienteCreadoPor
        obj.TipoEnvio = this.TipoEnvio
        obj.CiudadDespacho = this.CiudadDespacho
        obj.FacturacionSemanal = this.FacturacionSemanal
        obj.UsuarioDigito = this.UsuarioDigito
        obj.Cupo_asignado = this.Cupo_asignado
        obj.Claseventa = this.Claseventa
        obj.FechaAnulacion = this.FechaAnulacion
        obj.MotivoAnulacion = this.MotivoAnulacion
        obj.DescripcionAnulacion = this.DescripcionAnulacion
        obj.Asistente = this.Asistente
        obj.NombreAnulo = this.NombreAnulo
        obj.ExcentoIVA = this.ExcentoIVA
        obj.CodCiudadCliente = this.CodCiudadCliente
        obj.okTransEncabezadoPedido = this.okTransEncabezadoPedido
        obj.okTransDetallePedido = this.okTransDetallePedido
        obj.PuntosUsar = this.PuntosUsar
        obj.TotalPuntosPedido = this.TotalPuntosPedido
        obj.Guia = this.Guia
        obj.NumeroDespacho = this.NumeroDespacho
        obj.PagarFletePuntos = this.PagarFletePuntos
        obj.OperadorLogistico = this.OperadorLogistico
        obj.ClienteFinal = this.ClienteFinal
        obj.Bodega = this.Bodega
        obj.NombreDestinatario = this.NombreDestinatario
        obj.PuntoEnvio = this.PuntoEnvio
        obj.Error = this.Error

        return obj
    }


}
