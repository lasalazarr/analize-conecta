import { E_Error } from "./E_Error";

export class CarteraReportePerfil {
        public Id : number
        public EsCredito : number
        public Coordinador :string
        public Director :string
        public Lider :string
        public Empresaria :string
        public Cedula:string
        public Factura:string
        public Fecha:string
        public _7_14 : number
        public _15_21: number
        public _22_30 : number
        public _31 : number
        public Corriente : number
        public TotalGeneral: number

        public _7_14Por : number
        public _15_21Por: number
        public _22_30Por : number
        public _31Por : number
        public CorrientePor : number

        public SubLista :Array<CarteraReportePerfil>
}

