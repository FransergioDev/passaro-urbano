import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { OfertasService } from '../../ofertas.service';

@Component({
  selector: 'app-como-usar',
  templateUrl: './como-usar.component.html',
  styleUrls: ['./como-usar.component.css'],
  providers: [OfertasService]
})
export class ComoUsarComponent implements OnInit {

  private idOferta: number;
  public comoUsar: string;
  constructor(private route: ActivatedRoute, private ofertasService: OfertasService) { }

  ngOnInit() {
    this.route.parent.params.subscribe((params: Params) => {
      this.idOferta = params.id;
      this.ofertasService.getComoUsarOfertaPorId(this.idOferta)
      .then((resposta: any) => {
          this.comoUsar =  resposta.descricao;
          console.log(this.comoUsar);
      })
      .catch((e) => console.log(e));
    }
  );
  }
}
