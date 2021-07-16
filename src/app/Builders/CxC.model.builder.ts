import { E_Error } from "../Models/E_Error";
import { E_CxC } from "app/Models/E_CxC";

export class CxCBuilder {
  public Numero: string
  public Zona: string
  public Mes: string
  public Anulado: number
  public Nit: string
  public Fecha:  Date
  public Vencimiento:  Date
  public Vendedor:  string
  public Valor: number
  public SaldoIniMes: number
  public Debitos: number
  public Creditos: number
  public SaldoInicial: number
  public CuentaContable: string
  public TasaCambio: number
  public EstadoCartera: number
  public Fechacreacion:  Date
  public Hora: string
  public Placa: string
  public FechaSalida:  Date
  public Nombre:  string
  public Apellido1:  string
  public Apellido2:  string
  public SaldoTotal:  number


  public Codigolider: string
  public Lider: string
  public Saldo: number
  public Devolucion: number
  public Recaudo: number
  public Campana: string
  public CxCInfo : E_CxC

  public Error: E_Error

    buildFromObject(x: any): CxCBuilder {
        if (x.Numero != undefined) { this.Numero = x.Numero }
        if (x.Zona != undefined) { this.Zona = x.Zona }
        if (x.Mes != undefined) { this.Mes = x.Mes }
        if (x.Anulado != undefined) { this.Anulado = x.Anulado }
        if (x.Nit != undefined) { this.Nit = x.Nit }
        if (x.Fecha != undefined) { this.Fecha = x.Fecha }
        if (x.Vencimiento != undefined) { this.Vencimiento = x.Vencimiento }
        if (x.Vendedor != undefined) { this.Vendedor = x.Vendedor }
        if (x.Valor != undefined) { this.Valor = x.Valor }
        if (x.SaldoIniMes != undefined) { this.SaldoIniMes = x.SaldoIniMes }
        if (x.Debitos != undefined) { this.Debitos = x.Debitos }
        if (x.Creditos != undefined) { this.Creditos = x.Creditos }
        if (x.SaldoInicial != undefined) { this.SaldoInicial = x.SaldoInicial }
        if (x.CuentaContable != undefined) { this.CuentaContable = x.CuentaContable }
        if (x.TasaCambio != undefined) { this.TasaCambio = x.TasaCambio }
        if (x.EstadoCartera != undefined) { this.EstadoCartera = x.EstadoCartera }
        if (x.Fechacreacion != undefined) { this.Fechacreacion = x.Fechacreacion }
        if (x.Hora != undefined) { this.Hora = x.Hora }
        if (x.Placa != undefined) { this.Placa = x.Placa }
        if (x.FechaSalida != undefined) { this.FechaSalida = x.FechaSalida }
        if (x.Nombre != undefined) { this.Nombre = x.Nombre }
        if (x.Apellido1 != undefined) { this.Apellido1 = x.Apellido1 }
        if (x.Apellido2 != undefined) { this.Apellido2 = x.Apellido2 }
        if (x.SaldoTotal != undefined) { this.SaldoTotal = x.SaldoTotal }
        if (x.Codigolider != undefined) { this.Codigolider = x.Codigolider }
        if (x.Lider != undefined) { this.Lider = x.Lider }
        if (x.Saldo != undefined) { this.Saldo = x.Saldo }
        if (x.Devolucion != undefined) { this.Devolucion = x.Devolucion }
        if (x.Recaudo != undefined) { this.Recaudo = x.Recaudo }
        if (x.Campana != undefined) { this.Campana = x.Campana }
        if (x.CxCInfo != undefined) { this.CxCInfo = x.CxCInfo }

        if (x.Error != undefined) { this.Error = x.Error }

        return this
    }
    Build(): E_CxC {
        var obj: E_CxC = new E_CxC()
        obj.Numero = this.Numero
        obj.Zona = this.Zona
        obj.Mes = this.Mes
        obj.Anulado = this.Anulado
        obj.Nit = this.Nit
        obj.Fecha = this.Fecha
        obj.Vencimiento = this.Vencimiento
        obj.Vendedor = this.Vendedor
        obj.Valor = this.Valor
        obj.Fecha = this.Fecha
        obj.SaldoIniMes = this.SaldoIniMes
        obj.Debitos = this.Debitos
        obj.Creditos = this.Creditos
        obj.SaldoInicial = this.SaldoInicial
        obj.CuentaContable = this.CuentaContable
        obj.TasaCambio = this.TasaCambio
        obj.EstadoCartera = this.EstadoCartera
        obj.Fechacreacion = this.Fechacreacion
        obj.Hora = this.Hora
        obj.Placa = this.Placa
        obj.FechaSalida= this.FechaSalida
        obj.Nombre = this.Nombre
        obj.Apellido1 = this.Apellido1
        obj.Apellido2 = this.Apellido2
        obj.SaldoTotal = this.SaldoTotal
        obj.Codigolider = this.Codigolider
        obj.Lider = this.Lider
        obj.Saldo = this.Saldo
        obj.Devolucion = this.Devolucion
        obj.Recaudo = this.Recaudo
        obj.Campana = this.Campana
        obj.CxCInfo = this.CxCInfo

        obj.Error = this.Error

        return obj
    }


}
