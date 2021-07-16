import { E_ExceptionError } from "./E_ExceptionError";
import { ExceptionErrorService } from 'app/ApiServices/ExceptionErrorService';

/**
 * Created by Mauricio Ramos on 23/03/2019.
 */
export class ErrorLogExcepcion extends Error{
	constructor(Componente: string, Metodo: string, Descripcion: string, Usuario: string, ExceptionErrorService: ExceptionErrorService ){
		super()
		Error.apply(this,arguments)

		var objError: E_ExceptionError = new E_ExceptionError()
		objError.Componente = Componente;
		objError.Metodo = Metodo;
		objError.Descripcion = Descripcion;
		objError.Usuario = Usuario;

		var objExceptionErrorResponse: E_ExceptionError = new E_ExceptionError()
		ExceptionErrorService.RegistrarException(objError)
			.subscribe((x: E_ExceptionError) => {
				objExceptionErrorResponse = x
			})
	}
}

