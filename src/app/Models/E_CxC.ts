
import { E_Error } from "./E_Error";

export class E_CxC {

    //OJO MRG: SI RECIBE UN DECIMAL EN UN INT SE REVIENTA EL ENVIO AL API. LAS PROPIEDADES DEBEN SER DEL TIPO QUE SE ENVIAR DESDE ANGULAR.
    //OJO MRG: SI RECIBE UN DECIMAL EN UN INT SE REVIENTA EL ENVIO AL API. LAS PROPIEDADES DEBEN SER DEL TIPO QUE SE ENVIAR DESDE ANGULAR.
    //OJO MRG: SI RECIBE UN DECIMAL EN UN INT SE REVIENTA EL ENVIO AL API. LAS PROPIEDADES DEBEN SER DEL TIPO QUE SE ENVIAR DESDE ANGULAR.

    //OJO MRG: LOS TIPOS DEBEN SER IGUALES EN EL ANGULAR Y EL API SINO SE REVIENTA EL ENVIO AL API.
    //OJO MRG: LOS TIPOS DEBEN SER IGUALES EN EL ANGULAR Y EL API SINO SE REVIENTA EL ENVIO AL API.
    //OJO MRG: LOS TIPOS DEBEN SER IGUALES EN EL ANGULAR Y EL API SINO SE REVIENTA EL ENVIO AL API.

    public Numero: string;
    public Zona: string;
    public Mes: string;
    public Anulado: number;
    public Nit: string;
    public Fecha:  Date;
    public Vencimiento:  Date;
    public Vendedor:  string;
    public Valor: number;
    public SaldoIniMes: number;
    public Debitos: number;
    public Creditos: number;
    public SaldoInicial: number;
    public CuentaContable: string;
    public TasaCambio: number;
    public EstadoCartera: number;
    public Fechacreacion:  Date;
    public Hora: string;
    public Placa: string;
    public FechaSalida:  Date;
    public Nombre:  string;
    public Apellido1:  string;
    public Apellido2:  string;
    public SaldoTotal:  number;

    public Codigolider: string;
    public Lider: string;
    public Saldo: number;
    public Devolucion: number;
    public Recaudo: number;
    public Campana: string;
    public EstadoCredito: string;
    public CupoCredito : number;

    public CxCInfo : E_CxC;
    public Error: E_Error

    constructor() { }
}

