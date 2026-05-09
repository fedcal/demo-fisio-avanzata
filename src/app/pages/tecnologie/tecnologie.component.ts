import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { AsyncPipe, NgFor, NgIf } from '@angular/common';
import { RouterLink } from '@angular/router';

import { MockDataService } from '../../data/mock-data.service';

@Component({
  selector: 'app-tecnologie',
  standalone: true,
  imports: [AsyncPipe, NgFor, NgIf, RouterLink],
  template: `
    <section class="page-header">
      <div class="demo-container">
        <h1>Tecnologie avanzate</h1>
        <p>12 dispositivi di ultima generazione per diagnostica, riabilitazione e terapia fisica. Lo stesso standard dei centri universitari.</p>
      </div>
    </section>

    <article class="demo-container content" *ngIf="tecnologie$ | async as data">
      <section *ngFor="let cat of data.categorie" class="categoria-section">
        <h2 class="categoria-title">{{ cat.nome }}</h2>
        <ul class="tec-grid">
          <li *ngFor="let t of getByCat(data.tecnologie, cat.id)" class="tec-card">
            <h3 class="tec-card__nome">{{ t.nome }}</h3>
            <p class="tec-card__desc">{{ t.descrizione }}</p>
            <div class="tec-card__indicazioni">
              <span class="indicazioni-label">Indicazioni:</span>
              <ul class="indicazioni-list">
                <li *ngFor="let ind of t.indicazioni">{{ ind }}</li>
              </ul>
            </div>
          </li>
        </ul>
      </section>

      <section class="cta-section">
        <h2>Vuoi sapere quale tecnologia fa per te?</h2>
        <p>Durante la prima visita ortopedica il Dr. Ferretti indica le tecnologie più adatte alla tua patologia. La scelta è sempre guidata dall'evidenza clinica.</p>
        <a routerLink="/prenota" class="btn btn-primary">Prenota la prima visita</a>
      </section>
    </article>
  `,
  styles: [
    `
      .page-header {
        padding: 4rem 1rem 3rem;
        background: var(--color-bg-subtle);
        text-align: center;
        border-bottom: 1px solid var(--color-border);
      }
      .page-header h1 {
        margin: 0 0 0.5rem;
      }
      .page-header p {
        color: var(--color-fg-muted);
        margin: 0 auto;
        max-width: 580px;
      }
      .content {
        padding: 3rem 1rem;
      }
      .categoria-section {
        margin-bottom: 3rem;
      }
      .categoria-title {
        font-size: 1.2rem;
        color: var(--color-accent);
        margin-bottom: 1rem;
        padding-bottom: 0.4rem;
        border-bottom: 2px solid var(--color-accent);
        display: inline-block;
      }
      .tec-grid {
        list-style: none;
        padding: 0;
        margin: 0;
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
        gap: 1rem;
      }
      .tec-card {
        background: var(--color-bg-subtle);
        border: 1px solid var(--color-border);
        border-radius: var(--radius-md);
        padding: 1.25rem;
      }
      .tec-card__nome {
        margin: 0 0 0.5rem;
        font-size: 1rem;
        color: var(--color-fg-default);
      }
      .tec-card__desc {
        color: var(--color-fg-muted);
        font-size: 0.88rem;
        line-height: 1.55;
        margin: 0 0 1rem;
      }
      .tec-card__indicazioni {
        border-top: 1px dashed var(--color-border);
        padding-top: 0.75rem;
      }
      .indicazioni-label {
        font-size: 0.75rem;
        font-weight: 600;
        text-transform: uppercase;
        letter-spacing: 0.04em;
        color: var(--color-fg-muted);
        display: block;
        margin-bottom: 0.4rem;
      }
      .indicazioni-list {
        list-style: none;
        padding: 0;
        margin: 0;
        display: flex;
        flex-wrap: wrap;
        gap: 0.35rem;
      }
      .indicazioni-list li {
        font-size: 0.72rem;
        background: #cffafe;
        color: #0e7490;
        padding: 0.15rem 0.5rem;
        border-radius: 9999px;
        font-weight: 500;
      }
      .cta-section {
        background: #ecfeff;
        border: 1px solid #a5f3fc;
        border-radius: var(--radius-lg);
        padding: 2.5rem;
        text-align: center;
        margin-top: 1rem;
      }
      .cta-section h2 {
        margin: 0 0 0.5rem;
      }
      .cta-section p {
        color: var(--color-fg-muted);
        margin: 0 auto 1.5rem;
        max-width: 520px;
      }
      .btn {
        display: inline-block;
        padding: 0.7rem 1.5rem;
        border-radius: var(--radius-md);
        text-decoration: none;
        font-weight: 600;
        transition: all 0.15s ease;
      }
      .btn-primary {
        background: var(--color-accent);
        color: #ffffff;
      }
      .btn-primary:hover {
        background: #0e7490;
      }
    `
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TecnologieComponent {
  private readonly mockData = inject(MockDataService);

  readonly tecnologie$ = this.mockData.tecnologie$;

  getByCat(tecnologie: { categoria: string; id: number; nome: string; descrizione: string; indicazioni: string[] }[], catId: string) {
    return tecnologie.filter((t) => t.categoria === catId);
  }
}
