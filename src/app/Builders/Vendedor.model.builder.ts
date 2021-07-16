import { E_Error } from "../Models/E_Error";
import { E_Vendedor } from "../Models/E_Vendedor";

export class VendedorBuilder {
    public CodPais: string
    public IdVendedor: string
    public Nombre: string
    public Cedula: string
    public FechaIngreso: Date
    public Comision: number
    public Recaudo_0: number
    public Recaudo_30: number
    public Recaudo_60: number
    public Recaudo_90: number
    public FechaNacimiento: Date
    public Localizacion: string
    public Clasificacion: string
    public Persona: string
    public Sexo: string
    public Categoria: string
    public Zona: string
    public NombreUno: string
    public NombreDos: string
    public ApellidoUno: string
    public ApellidoDos: string
    public Direccion: string
    public Email: string
    public TelefonoUno: string
    public TelefonoDos: string
    public TelefonoTres: string
    public EmailNivi: string
    public FechaVigenciaInicio: Date
    public FechaVigenciaFin: Date
    public Activo: number
    public NombrePais: string
    public CodigoEstado: string
    public NombreEstado: string
    public CodigoCiudad: string
    public NombreCiudad: string
    public CodigoSector: string
    public NombreSector: string
    public CodigoZona: string
    public Nit: string
    public CodigoRegional: string
    public MailGroup: string
    public ValorFlete: number
    public TerminosyCondiciones: boolean
    public FechaAceptacionTerminos: Date
    public MostrarTerminosyCondiciones: boolean
    public Director: number
    public Usuario: string
    public Error: E_Error

    buildFromObject(x: any): VendedorBuilder {
        if (x.CodPais != undefined) { this.CodPais = x.CodPais }
        if (x.IdVendedor != undefined) { this.IdVendedor = x.IdVendedor }
        if (x.Nombre != undefined) { this.Nombre = x.Nombre }
        if (x.Cedula != undefined) { this.Cedula = x.Cedula }
        if (x.FechaIngreso != undefined) { this.FechaIngreso = x.FechaIngreso }
        if (x.Comision != undefined) { this.Comision = x.Comision }
        if (x.Recaudo_0 != undefined) { this.Recaudo_0 = x.Recaudo_0 }
        if (x.Recaudo_30 != undefined) { this.Recaudo_30 = x.Recaudo_30 }
        if (x.Recaudo_60 != undefined) { this.Recaudo_60 = x.Recaudo_60 }
        if (x.Recaudo_90 != undefined) { this.Recaudo_90 = x.Recaudo_90 }
        if (x.FechaNacimiento != undefined) { this.FechaNacimiento = x.FechaNacimiento }
        if (x.Localizacion != undefined) { this.Localizacion = x.Localizacion }
        if (x.Clasificacion != undefined) { this.Clasificacion = x.Clasificacion }
        if (x.Persona != undefined) { this.Persona = x.Persona }
        if (x.Sexo != undefined) { this.Sexo = x.Sexo }
        if (x.Categoria != undefined) { this.Categoria = x.Categoria }
        if (x.Zona != undefined) { this.Zona = x.Zona }
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
        if (x.FechaVigenciaInicio != undefined) { this.FechaVigenciaInicio = x.FechaVigenciaInicio }
        if (x.FechaVigenciaFin != undefined) { this.FechaVigenciaFin = x.FechaVigenciaFin }
        if (x.Activo != undefined) { this.Activo = x.Activo }
        if (x.NombrePais != undefined) { this.NombrePais = x.NombrePais }
        if (x.CodigoEstado != undefined) { this.CodigoEstado = x.CodigoEstado }
        if (x.NombreEstado != undefined) { this.NombreEstado = x.NombreEstado }
        if (x.CodigoCiudad != undefined) { this.CodigoCiudad = x.CodigoCiudad }
        if (x.NombreCiudad != undefined) { this.NombreCiudad = x.NombreCiudad }
        if (x.CodigoSector != undefined) { this.CodigoSector = x.CodigoSector }
        if (x.NombreSector != undefined) { this.NombreSector = x.NombreSector }
        if (x.CodigoZona != undefined) { this.CodigoZona = x.CodigoZona }
        if (x.Nit != undefined) { this.Nit = x.Nit }
        if (x.CodigoRegional != undefined) { this.CodigoRegional = x.CodigoRegional }
        if (x.MailGroup != undefined) { this.MailGroup = x.MailGroup }
        if (x.ValorFlete != undefined) { this.ValorFlete = x.ValorFlete }
        if (x.TerminosyCondiciones != undefined) { this.TerminosyCondiciones = x.TerminosyCondiciones }
        if (x.FechaAceptacionTerminos != undefined) { this.FechaAceptacionTerminos = x.FechaAceptacionTerminos }
        if (x.MostrarTerminosyCondiciones != undefined) { this.MostrarTerminosyCondiciones = x.MostrarTerminosyCondiciones }
        if (x.Director != undefined) { this.Director = x.Director }
        if (x.Usuario != undefined) { this.Usuario = x.Usuario }
        if (x.Error != undefined) { this.Error = x.Error }

        return this
    }
    Build(): E_Vendedor {
        var obj: E_Vendedor = new E_Vendedor()
        obj.CodPais = this.CodPais
        obj.IdVendedor = this.IdVendedor
        obj.Nombre = this.Nombre
        obj.Cedula = this.Cedula
        obj.FechaIngreso = this.FechaIngreso
        obj.Comision = this.Comision
        obj.Recaudo_0 = this.Recaudo_0
        obj.Recaudo_30 = this.Recaudo_30
        obj.Recaudo_60 = this.Recaudo_60
        obj.Recaudo_90 = this.Recaudo_90
        obj.FechaNacimiento = this.FechaNacimiento
        obj.Localizacion = this.Localizacion
        obj.Clasificacion = this.Clasificacion
        obj.Persona = this.Persona
        obj.Sexo = this.Sexo
        obj.Categoria = this.Categoria
        obj.Zona = this.Zona
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
        obj.FechaVigenciaInicio = this.FechaVigenciaInicio
        obj.FechaVigenciaFin = this.FechaVigenciaFin
        obj.Activo = this.Activo
        obj.NombrePais = this.NombrePais
        obj.CodigoEstado = this.CodigoEstado
        obj.NombreEstado = this.NombreEstado
        obj.CodigoCiudad = this.CodigoCiudad
        obj.NombreCiudad = this.NombreCiudad
        obj.CodigoSector = this.CodigoSector
        obj.NombreSector = this.NombreSector
        obj.CodigoZona = this.CodigoZona
        obj.Nit = this.Nit
        obj.CodigoRegional = this.CodigoRegional
        obj.MailGroup = this.MailGroup
        obj.ValorFlete = this.ValorFlete
        obj.TerminosyCondiciones = this.TerminosyCondiciones
        obj.FechaAceptacionTerminos = this.FechaAceptacionTerminos
        obj.MostrarTerminosyCondiciones = this.MostrarTerminosyCondiciones
        obj.Director = this.Director
        obj.Usuario = this.Usuario
        obj.Error = this.Error

        return obj
    }


}
