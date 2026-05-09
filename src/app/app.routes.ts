import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./pages/home/home.component').then((m) => m.HomeComponent),
    title: 'Spine Center Milano — Eccellenza per colonna e ortopedia'
  },
  {
    path: 'servizi',
    loadComponent: () => import('./pages/servizi/servizi.component').then((m) => m.ServiziComponent),
    title: 'Servizi — Spine Center Milano'
  },
  {
    path: 'chi-siamo',
    loadComponent: () => import('./pages/chi-siamo/chi-siamo.component').then((m) => m.ChiSiamoComponent),
    title: 'Chi siamo — Spine Center Milano'
  },
  {
    path: 'tecnologie',
    loadComponent: () => import('./pages/tecnologie/tecnologie.component').then((m) => m.TecnologieComponent),
    title: 'Tecnologie avanzate — Spine Center Milano'
  },
  {
    path: 'prenota',
    loadComponent: () => import('./pages/prenota/prenota.component').then((m) => m.PrenotaComponent),
    title: 'Prenota una visita — Spine Center Milano'
  },
  {
    path: '**',
    redirectTo: ''
  }
];
