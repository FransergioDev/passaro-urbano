import { CarrinhoService } from './../carrinho.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { OfertasService } from '../ofertas.service';
import { Oferta } from '../shared/oferta.model';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/interval';
import { Observer } from 'rxjs/Observer';
import { Subscription } from 'rxjs/Subscription';


@Component({
  selector: 'app-oferta',
  templateUrl: './oferta.component.html',
  styleUrls: ['./oferta.component.css'],
  providers: [OfertasService]
})
export class OfertaComponent implements OnInit, OnDestroy {
  private routeSubscript: Subscription;
  public idOferta: number;
  public oferta: Oferta = null;
  constructor(
    private route: ActivatedRoute,
    private ofertasService: OfertasService,
    private carrinhoService: CarrinhoService
  ) {}

  ngOnInit() {

    /* As formas de recuperar parametros */
    // this.idOferta = this.route.snapshot.params['id'];
    // this.idOfertaSegundaria = this.route.snapshot.params['subId'];
    this.routeSubscript = this.route.params.subscribe((parametro: Params) => {
      this.idOferta = parametro.id;
      this.ofertasService.getOfertaPorId(this.idOferta)
        .then(
          (ofertas: Oferta) => { this.oferta = ofertas; console.log(this.oferta); }
        )
        .catch((param: any) => {
          console.log(param);
        });
    });
  }

  ngOnDestroy(): void {
    this.routeSubscript.unsubscribe();
  }
  
  adicionarItemCarrinho(oferta: Oferta): void {
    this.carrinhoService.incluirItem(oferta);
  }
}
