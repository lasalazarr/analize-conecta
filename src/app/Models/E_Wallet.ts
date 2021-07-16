import { E_Error } from "./E_Error";

export class E_Wallet {


  public idEntCommerce :string;
  public codCardHolderCommerce :string;
  public names :string
  public lastNames :string
  public mail :string
  public reserved1:string
  public reserved2:string
  public reserved3:string
  public claveSecreta :string
  public registerVerification:string;
  public ansDescription:string;
  public codAsoCardHolderWallet:string;
  public purchaseVerification : string;
  public numeroOperacion : string;
  public monto : string;
  public date:string;
  public  hour:string;
  public acquirerId: string;
  public idCommerce: string;
  public purchaseAmount: string;
  public purchaseCurrencyCode: string;
  public Error: E_Error;

    constructor() { }
}
