import { HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";

/*import express = require('express');
const cors = require('cors')({
  origin: true,
  allowedHeaders: ['Content-Type', 'Authorization', 'Content-Length', 'X-Requested-With', 'Accept'],
  methods: ['OPTIONS', 'GET', 'PUT', 'POST', 'DELETE']
});
const app = express();*/

@Injectable()
export class HeaderBuilder {
    public HeadNow(UserId?: number) {
        const httpOptions = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
                //'Userid': UserId == undefined ? btoa("0") : btoa(UserId.toString()),
            })
        };
        return httpOptions
    }


}
