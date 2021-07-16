import { Component, OnInit } from '@angular/core';
import { AdminService } from 'app/ApiServices/AdminService';
import { UserService } from 'app/ApiServices/UserService';

@Component({
  selector: 'app-formulario-container',
  templateUrl: './formulario-container.component.html',
  styleUrls: ['./formulario-container.component.scss']
})
export class FormularioContainerComponent implements OnInit {
  validarSolicitud: boolean;

  constructor(private adminservice: AdminService, private userService: UserService
  ) { }

  ngOnInit() {
    let user = this.userService.GetCurrentCurrentUserNow()
    this.adminservice.ValidarSolicitudCredito(user.Cedula).subscribe(x => {
      this.validarSolicitud = x
    })
  }

}
