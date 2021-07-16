import { HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";

@Injectable()
export class ValidarDocumento {

    /// <summary>
    /// Valida si la cedula de ecuador es valida para ingresar al sistema.
    /// </summary>
    /// <param name="cedula"></param>
    /// <returns></returns>
    public pc_verificar(cedula: string) {
        try {
            var a: number
            var c: number
            var x: number
            var b: number
            var d: number
            var ap: number = 0
            var at: number = 0

            for (a = 0; a < 9; a = a + 2) {
                b = Number(cedula.substring(a, 1));
                b = b + b;
                Number(b);
                if (b > 9) {
                    b = b - 9;
                }
                ap = ap + b;
            }
            for (c = 1; c <= 8; c = c + 2) {
                d = Number(cedula.substring(c, 1));
                at = at + d;
            }
            x = ap + at;
            do {
                x = x - 10;
            }
            while (x > 0);
            var di: number = Math.abs(x);
            var ver: string = cedula.substring(a - 1, 1);
            var dig: string = di.toString();
            if (ver == dig) {
                return true;
                //MessageBox.Show("CEdula buena");
            }
            else {
                return false;
                // MessageBox.Show("CEdula mal");
            }
        }
        catch (Exception) {
            return false;
        }
    }


}
