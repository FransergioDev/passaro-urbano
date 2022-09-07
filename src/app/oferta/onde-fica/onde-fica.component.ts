import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { OfertasService } from '../../ofertas.service';

@Component({
  selector: 'app-onde-fica',
  templateUrl: './onde-fica.component.html',
  styleUrls: ['./onde-fica.component.css'],
  providers: [OfertasService]
})
export class OndeFicaComponent implements OnInit {

  private idOferta: number;
  public ondeFica: string;
  constructor(private route: ActivatedRoute, private ofertasService: OfertasService) { }

  ngOnInit() {
    // this.idOferta = this.route.parent.snapshot.params['id'];
    this.route.parent.params.subscribe((params: Params) => {
      this.idOferta = params.id;
      this.ofertasService.getOndeFicaPorId(this.idOferta)
      .then((resposta: any) => {
          this.ondeFica =  resposta.descricao;
          console.log(this.ondeFica);
      })
      .catch((e) => console.log(e));
    });
  }

}
