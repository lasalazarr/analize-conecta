import { E_Error } from "../Models/E_Error";
import { E_Lider } from "../Models/E_Lider";

export class LiderBuilder {
  public IdLider: string
  public Cedula: string
  public Nombres: string
  public FechaIngreso : Date
  public FechaNacimiento : Date
  public Localizacion: string
  public Sexo : string
  public Codciudad: string
  public NombreUno : string
  public NombreDos : string
  public ApellidoUno : string
  public ApellidoDos : string
  public Direccion: string
  public Email : string
  public TelefonoUno: string
  public TelefonoDos: string
  public TelefonoTres : string
  public EmailNivi : string
  public Zona: string
  public Activo : number
  public IdTipoRed : number
  public Usuario : string
  public TipoRedNombre : string
  public DescripcionCombos :string
  public IdVendedor: string
    public Error: E_Error

    buildFromObject(x: any): LiderBuilder {
        if (x.IdLider != undefined) { this.IdLider = x.IdLider }
        if (x.Cedula != undefined) { this.Cedula = x.Cedula }
        if (x.Nombres != undefined) { this.Nombres = x.Nombres }
        if (x.FechaIngreso != undefined) { this.FechaIngreso = x.FechaIngreso }
        if (x.FechaNacimiento != undefined) { this.FechaNacimiento = x.FechaNacimiento }
        if (x.Localizacion != undefined) { this.Localizacion = x.Localizacion }
        if (x.Sexo != undefined) { this.Sexo = x.Sexo }
        if (x.Codciudad != undefined) { this.Codciudad = x.Codciudad }
        if (x.NombreUno != undefined) { this.NombreUno = x.NombreUno }
        if (x.NombreDos != undefined) { this.NombreDos = x.NombreDos }
        if (x.ApellidoUno != undefined) { this.ApellidoUno = x.ApellidoUno }
        if (x.ApellidoDos != undefined) { this.ApellidoDos = x.ApellidoDos }
        if (x.Direccion != undefined) { this.Direccion = x.Direccion }
        if (x.Email != undefined) { this.Email = x.Email }
        if (x.TelefonoUno != undefined) { this.TelefonoUno = x.TelefonoUno }
        if (x.TelefonoDos != undefined) { this.TelefonoDos = x.TelefonoDos }
        if (x.TelefonoTres != undefined) { this.TelefonoTres = x.TelefonoTres }
        if (x.EmailNivi != undefined) { this.EmailNivi = x.EmailNivi }
        if (x.Zona != undefined) { this.Zona = x.Zona }
        if (x.Activo != undefined) { this.Activo = x.Activo }
        if (x.IdTipoRed != undefined) { this.IdTipoRed = x.IdTipoRed }
        if (x.Usuario != undefined) { this.Usuario = x.Usuario }
        if (x.TipoRedNombre != undefined) { this.TipoRedNombre = x.TipoRedNombre }
        if (x.DescripcionCombos != undefined) { this.DescripcionCombos = x.DescripcionCombos }
        if (x.IdVendedor != undefined) { this.IdVendedor = x.IdVendedor }



        if (x.Error != undefined) { this.Error = x.Error }

        return this
    }
    Build(): E_Lider {
        var obj: E_Lider = new E_Lider()
        obj.IdLider = this.IdLider
        obj.Cedula = this.Cedula
        obj.Nombres = this.Nombres
        obj.FechaIngreso = this.FechaIngreso
        obj.FechaNacimiento = this.FechaNacimiento
        obj.Localizacion = this.Localizacion
        obj.Sexo = this.Sexo
        obj.Codciudad = this.Codciudad
        obj.NombreUno = this.NombreUno
        obj.NombreDos = this.NombreDos
        obj.ApellidoUno = this.ApellidoUno
        obj.ApellidoDos = this.ApellidoDos
        obj.Direccion = this.Direccion
        obj.Email = this.Email
        obj.TelefonoUno = this.TelefonoUno
        obj.TelefonoDos = this.TelefonoDos
        obj.TelefonoTres = this.TelefonoTres
        obj.EmailNivi = this.EmailNivi
        obj.Zona = this.Zona
        obj.Activo = this.Activo
        obj.IdTipoRed = this.IdTipoRed
        obj.Usuario = this.Usuario
        obj.TipoRedNombre = this.TipoRedNombre
        obj.DescripcionCombos = this.DescripcionCombos
        obj.IdVendedor = this.IdVendedor



        obj.Error = this.Error

        return obj
    }


}
