import { Component, OnInit } from '@angular/core';
import { OfertasService } from '../ofertas.service';
import { Observable } from 'rxjs/Observable';
/*
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/of';*/
import '../util/rxjs-extensions';
import { Oferta } from '../shared/oferta.model';
import { Subject } from 'rxjs/Subject';

@Component({
  selector: 'app-topo',
  templateUrl: './topo.component.html',
  styleUrls: ['./topo.component.css'],
  providers: [OfertasService]
})
export class TopoComponent implements OnInit {

  public ofertas: Observable<Oferta[]>;
  // public ofertasLista: Oferta[] = [];
  private subjectPesquisa: Subject<string> = new Subject<string>();

  constructor(private ofertasService: OfertasService) { }

  ngOnInit() {
    /*
    Um subject efetua uma chamada assicrona de subscribe,
    onde ele pode cancelar uma requisição efetuada anteriormente,
    em uma nova requisição se ela for chamada antes da resposta
    */
    this.ofertas = this.subjectPesquisa
      .debounceTime(1000)// executa a ação do swithMap após 1 segundo
      .distinctUntilChanged()// executa a ação do swithMap apenas se o termo passado não for o mesmo da última requisição
      .switchMap((termo: string) => {
        if (termo.trim() === '') {
          // retornar um observable de array de ofertas vazias
          return Observable.of<Oferta[]>([]);
        }
        return this.ofertasService.pesquisaOfertas(termo);
      })
      .catch(
        (erro: any) => {
          console.log(erro);
          return Observable.of<Oferta[]>([]);
      });
    /* this.ofertas.subscribe(
        (ofertas: Oferta[]) => {
          this.ofertasLista = ofertas;
          console.log(ofertas);
        },
        (erro: any) => console.log(erro),
        () => console.log('Fluxo de eventos completo')
    );*/
  }

  /*pesquisa(event: Event):  void {
    console.log((<HTMLInputElement>event.target).value);
  }*/

  pesquisa(termoDaBusca: string):  void {
    /*this.ofertas = this.ofertasService.pesquisaOfertas(termoDaBusca);
    this.ofertas.subscribe(
      (ofertas: Oferta[]) => console.log(ofertas),
      (erro: any) => console.log(erro),
      () => console.log('Fluxo de eventos completo')
    );*/
    this.subjectPesquisa.next(termoDaBusca);
  }

  limpaPesquisa(): void {
   this.subjectPesquisa.next('');
  }

}
