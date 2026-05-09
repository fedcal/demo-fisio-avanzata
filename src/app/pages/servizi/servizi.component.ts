import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { AsyncPipe, CurrencyPipe, NgFor, NgIf } from '@angular/common';
import { RouterLink } from '@angular/router';

import { MockDataService } from '../../data/mock-data.service';

@Component({
  selector: 'app-servizi',
  standalone: true,
  imports: [AsyncPipe, CurrencyPipe, NgFor, NgIf, RouterLink],
  template: `
    <section class="page-header">
      <div class="demo-container">
        <h1>Servizi specialistici</h1>
        <p>12 percorsi riabilitativi per patologie ortopediche, neurologiche e sportive. Piani terapeutici personalizzati €60-200.</p>
      </div>
    </section>

    <article class="demo-container content" *ngIf="servizi$ | async as data">
      <section *ngFor="let cat of data.categorie" class="categoria-section">
        <h2 class="categoria-title">{{ cat.nome }}</h2>
        <ul class="servizi-grid">
          <li *ngFor="let s of getByCat(data.servizi, cat.id)" class="servizio-card">
            <div class="servizio-card__header">
              <h3>{{ s.nome }}</h3>
              <div class="servizio-card__meta">
                <span class="badge-durata">{{ s.durata }}</span>
                <span class="badge-prezzo">{{ s.prezzo | currency: 'EUR':'symbol':'1.0-0' }}</span>
              </div>
            </div>
            <p class="servizio-card__desc">{{ s.descrizione }}</p>
          </li>
        </ul>
      </section>

      <section class="cta-section">
        <h2>Hai bisogno di un consiglio?</h2>
        <p>La nostra equipe è disponibile per una consulenza preliminare gratuita di 15 minuti prima di prenotare la prima visita.</p>
        <a routerLink="/prenota" class="btn btn-primary">Prenota una visita</a>
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
        margin: 0;
        max-width: 600px;
        margin: 0 auto;
      }
      .content {
        padding: 3rem 1rem;
      }
      .categoria-section {
        margin-bottom: 3rem;
      }
      .categoria-title {
        font-size: 1.25rem;
        color: var(--color-accent);
        margin-bottom: 1rem;
        padding-bottom: 0.5rem;
        border-bottom: 2px solid var(--color-accent);
        display: inline-block;
      }
      .servizi-grid {
        list-style: none;
        padding: 0;
        margin: 0;
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
        gap: 1rem;
      }
      .servizio-card {
        background: var(--color-bg-subtle);
        border: 1px solid var(--color-border);
        border-radius: var(--radius-md);
        padding: 1.25rem;
      }
      .servizio-card__header {
        display: flex;
        justify-content: space-between;
        align-items: flex-start;
        gap: 1rem;
        margin-bottom: 0.75rem;
      }
      .servizio-card__header h3 {
        margin: 0;
        font-size: 1rem;
        flex: 1;
      }
      .servizio-card__meta {
        display: flex;
        flex-direction: column;
        align-items: flex-end;
        gap: 0.3rem;
        flex-shrink: 0;
      }
      .badge-durata {
        font-size: 0.75rem;
        color: var(--color-fg-muted);
        background: var(--color-bg-default);
        border: 1px solid var(--color-border);
        padding: 0.15rem 0.5rem;
        border-radius: 9999px;
      }
      .badge-prezzo {
        font-size: 1rem;
        font-weight: 700;
        color: var(--color-accent);
      }
      .servizio-card__desc {
        margin: 0;
        color: var(--color-fg-muted);
        font-size: 0.9rem;
        line-height: 1.5;
      }
      .cta-section {
        background: #ecfeff;
        border: 1px solid #a5f3fc;
        border-radius: var(--radius-lg);
        padding: 2.5rem;
        text-align: center;
        margin-top: 2rem;
      }
      .cta-section h2 {
        margin: 0 0 0.5rem;
      }
      .cta-section p {
        color: var(--color-fg-muted);
        margin: 0 0 1.5rem;
        max-width: 500px;
        margin-left: auto;
        margin-right: auto;
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
export class ServiziComponent {
  private readonly mockData = inject(MockDataService);

  readonly servizi$ = this.mockData.servizi$;

  getByCat(servizi: { categoria: string; id: number; nome: string; descrizione: string; prezzo: number; durata: string; featured: boolean }[], catId: string) {
    return servizi.filter((s) => s.categoria === catId);
  }
}
