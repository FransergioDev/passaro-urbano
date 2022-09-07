import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/retry';
import { Oferta } from './shared/oferta.model';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class OfertasService {
  private URL_API = `http://localhost:3000/`;
  constructor(private http: HttpClient) {}
  public ofertas_mock: Oferta[] = [
      {
        id: 1,
        categoria: 'restaurante',
        titulo: 'Super Burger',
        descricao_oferta: 'Rodízio de Mini-hambúrger com opção de entrada.',
        anunciante: 'Original Burger',
        valor: 29.90,
        destaque: true,
        imagens: [
          {url: '/assets/ofertas/1/img1.jpg'},
          {url: '/assets/ofertas/1/img2.jpg'},
          {url: '/assets/ofertas/1/img3.jpg'},
          {url: '/assets/ofertas/1/img4.jpg'}
        ]
      },
      {
        id: 2,
        categoria: 'restaurante',
        titulo: 'Cozinha Mexicana',
        descricao_oferta: 'Almoço ou Jantar com Rodízio Mexicano delicioso.',
        anunciante: 'Mexicana',
        valor: 32.90,
        destaque: true,
        imagens: [
          {url: '/assets/ofertas/2/img1.jpg'},
          {url: '/assets/ofertas/2/img2.jpg'},
          {url: '/assets/ofertas/2/img3.jpg'},
          {url: '/assets/ofertas/2/img4.jpg'}
        ]
      },
      {
        id: 4,
        categoria: 'diversao',
        titulo: 'Estância das águas',
        descricao_oferta: 'Diversão garantida com piscinas, trilhas e muito mais.',
        anunciante: 'Estância das águas',
        valor: 31.90,
        destaque: true,
        imagens: [
          {url: '/assets/ofertas/3/img1.jpg'},
          {url: '/assets/ofertas/3/img2.jpg'},
          {url: '/assets/ofertas/3/img3.jpg'},
          {url: '/assets/ofertas/3/img4.jpg'},
          {url: '/assets/ofertas/3/img5.jpg'},
          {url: '/assets/ofertas/3/img6.jpg'}
        ]
      }
  ];

  public getOfertas(): Promise<Oferta[]> {
    // efetuar uma requisição http
    return this.http.get(`${this.URL_API}ofertas?destaque=true`)
      .toPromise()
      .then((resposta: any) => resposta);
    // retornar uma promisse Oferta[]
  }

  public getOfertasPorCategoria(categoria: string): Promise<Oferta[]> {
    return this.http.get(`${this.URL_API}ofertas?categoria=${categoria}`)
    .toPromise()
    .then((resposta: any) => resposta);
  }

  public getOfertaPorId(id: number): Promise<Oferta> {
    return this.http.get(`${this.URL_API}ofertas?id=${id}`)
    .toPromise()
    .then((resposta: any) => resposta.shift());
  }

  public getComoUsarOfertaPorId(id: number): Promise<string> {
    return this.http.get(`${this.URL_API}como-usar?id=${id}`)
    .toPromise()
    .then((resposta: any) => resposta.shift());
  }

  public getOndeFicaPorId(id: number): Promise<string> {
    return this.http.get(`${this.URL_API}onde-fica?id=${id}`)
    .toPromise()
    .then((resposta: any) => resposta.shift());
  }

  public pesquisaOfertas(termo: string): Observable<Oferta[]> {
    return this.http.get(`${this.URL_API}ofertas?descricao_oferta_like=${termo}`)
      .retry(10)
      .map((resposta: any) => resposta);
  }
  
  // Promisse encadeada - um metodo assicrono chamou outro metrodo assicrono
  public getOfertasMock(): Promise<Oferta[]> {
    return new Promise((resolve, reject) => {
      const deuCerto = true;
      if (deuCerto) {
        setTimeout(() => resolve(this.ofertas_mock), 3000);
      } else {
        reject();
      }
    })
    .then((ofertas: Oferta[]) => {
      return new Promise((resolve) => setTimeout(() => resolve(ofertas), 3000));
    }).then((ofertas: Oferta[]) => {
      return ofertas;
    });
  }
}
