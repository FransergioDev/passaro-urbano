import { Routes } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { RestaurantesComponent } from './restaurantes/restaurantes.component';
import { DiversaoComponent } from './diversao/diversao.component';
import { OfertaComponent } from './oferta/oferta.component';
import { ComoUsarComponent } from './oferta/como-usar/como-usar.component';
import { OndeFicaComponent } from './oferta/onde-fica/onde-fica.component';
import { OrdemCompraComponent } from './ordem-compra/ordem-compra.component';
import { TermosDeUsoComponent } from './termos-de-uso/termos-de-uso.component';
import { PoliticaDePrivacidadeComponent } from './politica-de-privacidade/politica-de-privacidade.component';

export const ROUTES: Routes = [
  {path: '', component: HomeComponent},
  {path: 'restaurantes', component: RestaurantesComponent},
  {path: 'diversao', component: DiversaoComponent},
  {path: 'oferta', component: OfertaComponent},
  {path: 'oferta/:id', component: OfertaComponent,
    children: [ // Rotas filhas
      { path: '', component: ComoUsarComponent },
      { path: 'como-usar', component: ComoUsarComponent },
      { path: 'onde-fica', component: OndeFicaComponent }
    ]},
  {path: 'ordem-compra', component: OrdemCompraComponent },
  {path: 'termos-de-uso', component: TermosDeUsoComponent },
  {path: 'politica-de-privacidade', component: PoliticaDePrivacidadeComponent }
];
