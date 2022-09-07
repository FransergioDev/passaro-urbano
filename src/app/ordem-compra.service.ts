import { Observable } from 'rxjs/Observable';
import { HttpClient, HttpHeaderResponse, HttpHeaders } from '@angular/common/http';
import { Pedido } from './shared/pedido.model';
import { Injectable } from '@angular/core';
@Injectable()
export class OrdemCompraService {
    private URL_API = `http://localhost:3000`;
    constructor(private http: HttpClient) {}
    public efetivarCompra(pedido: Pedido): Observable<any> {
      const headers: HttpHeaders = new HttpHeaders();
      headers.append('Content-type', 'application/json');
      return this.http.post(
        `${this.URL_API}/pedidos`,
        pedido,
        new HttpHeaderResponse({
          headers: headers
        })
      )
      .map((resposta: HttpHeaderResponse) =>  resposta );
    }
}
