import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { AsyncPipe, CurrencyPipe, NgFor, NgIf } from '@angular/common';
import { RouterLink } from '@angular/router';
import { map } from 'rxjs';

import { MockDataService } from '../../data/mock-data.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [AsyncPipe, CurrencyPipe, NgFor, NgIf, RouterLink],
  template: `
    <section class="hero">
      <div class="demo-container">
        <h1>Spine Center Milano — eccellenza per colonna e ortopedia</h1>
        <p class="hero-tagline">Centro specializzato in fisioterapia avanzata, riabilitazione ortopedica e neuromotoria. Tecnologie PoseNet 3D, isocinetica, laser HIL e onde d'urto.</p>
        <div class="hero-actions">
          <a routerLink="/prenota" class="btn btn-primary">Prenota una visita</a>
          <a routerLink="/servizi" class="btn btn-secondary">Scopri i servizi</a>
        </div>
      </div>
    </section>

    <section class="features demo-container">
      <h2>Perché scegliere Spine Center</h2>
      <ul class="feature-grid">
        <li>
          <span class="feature-icon" aria-hidden="true">🏥</span>
          <h3>Equipe specializzata</h3>
          <p>5 professionisti: ortopedico, fisioterapisti specialisti e osteopata DO, tutti iscritti all'albo.</p>
        </li>
        <li>
          <span class="feature-icon" aria-hidden="true">🔬</span>
          <h3>Tecnologie di eccellenza</h3>
          <p>PoseNet 3D, isocinetica, laser HIL, onde d'urto e tecar. Standard riabilitativo da centro universitario.</p>
        </li>
        <li>
          <span class="feature-icon" aria-hidden="true">📋</span>
          <h3>Piano personalizzato</h3>
          <p>Ogni percorso inizia con una valutazione diagnostica completa. Nessun protocollo standard, solo piani su misura.</p>
        </li>
        <li>
          <span class="feature-icon" aria-hidden="true">🎯</span>
          <h3>Sport e performance</h3>
          <p>Fisioterapista ufficiale di società di Serie A. Riabilitazione sport-specifica con analisi biomeccanica.</p>
        </li>
      </ul>
    </section>

    <section class="featured demo-container" *ngIf="featuredServizi$ | async as servizi">
      <div class="section-header">
        <h2>Servizi in evidenza</h2>
        <a routerLink="/servizi" class="link-more">Tutti i servizi →</a>
      </div>
      <ul class="servizi-grid">
        <li *ngFor="let s of servizi" class="servizio-card">
          <div class="servizio-card__header">
            <h3>{{ s.nome }}</h3>
            <span class="servizio-card__price">{{ s.prezzo | currency: 'EUR':'symbol':'1.0-0' }}</span>
          </div>
          <p class="servizio-card__desc">{{ s.descrizione }}</p>
          <span class="servizio-card__durata">{{ s.durata }}</span>
        </li>
      </ul>
    </section>

    <section class="cta-band">
      <div class="demo-container">
        <h2>Inizia il tuo percorso riabilitativo</h2>
        <p>Prima visita ortopedica completa con analisi posturale PoseNet 3D inclusa. Ricevi un piano terapeutico personalizzato.</p>
        <div class="hero-actions">
          <a routerLink="/prenota" class="btn btn-primary">Prenota ora</a>
          <a routerLink="/tecnologie" class="btn btn-secondary">Le nostre tecnologie</a>
        </div>
      </div>
    </section>
  `,
  styles: [
    `
      .hero {
        padding: 5rem 1rem;
        text-align: center;
        background: linear-gradient(180deg, #ecfeff 0%, #ffffff 100%);
        border-bottom: 1px solid var(--color-border);
      }
      .hero h1 {
        font-size: clamp(1.75rem, 4.5vw, 3rem);
        margin: 0 0 1rem;
        color: var(--color-fg-default);
      }
      .hero-tagline {
        font-size: 1.1rem;
        color: var(--color-fg-muted);
        margin: 0 0 2rem;
        max-width: 680px;
        margin-left: auto;
        margin-right: auto;
      }
      .hero-actions {
        display: flex;
        gap: 0.75rem;
        justify-content: center;
        flex-wrap: wrap;
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
      .btn-secondary {
        background: #ffffff;
        color: var(--color-fg-default);
        border: 1px solid var(--color-border);
      }
      .btn-secondary:hover {
        background: var(--color-bg-subtle);
      }
      .features {
        padding: 4rem 1rem;
      }
      .features h2 {
        text-align: center;
        margin-bottom: 2rem;
      }
      .feature-grid {
        list-style: none;
        margin: 0;
        padding: 0;
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
        gap: 1.5rem;
      }
      .feature-grid li {
        text-align: center;
        padding: 1.5rem;
        border: 1px solid var(--color-border);
        border-radius: var(--radius-md);
      }
      .feature-icon {
        font-size: 2.5rem;
        display: block;
        margin-bottom: 0.5rem;
      }
      .feature-grid h3 {
        margin: 0 0 0.5rem;
        font-size: 1.05rem;
      }
      .feature-grid p {
        margin: 0;
        color: var(--color-fg-muted);
        font-size: 0.9rem;
      }
      .featured {
        padding: 4rem 1rem;
        background: var(--color-bg-subtle);
        border-radius: var(--radius-lg);
        margin: 0 1rem 4rem;
      }
      .section-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 1.5rem;
        flex-wrap: wrap;
        gap: 0.5rem;
      }
      .section-header h2 {
        margin: 0;
      }
      .link-more {
        color: var(--color-accent);
        text-decoration: none;
        font-weight: 600;
      }
      .servizi-grid {
        list-style: none;
        margin: 0;
        padding: 0;
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
        gap: 1rem;
      }
      .servizio-card {
        background: #ffffff;
        border: 1px solid var(--color-border);
        border-radius: var(--radius-md);
        padding: 1.25rem;
      }
      .servizio-card__header {
        display: flex;
        justify-content: space-between;
        align-items: flex-start;
        margin-bottom: 0.5rem;
        gap: 0.5rem;
      }
      .servizio-card__header h3 {
        margin: 0;
        font-size: 1rem;
        flex: 1;
      }
      .servizio-card__price {
        color: var(--color-accent);
        font-weight: 700;
        font-size: 1.05rem;
        white-space: nowrap;
      }
      .servizio-card__desc {
        color: var(--color-fg-muted);
        font-size: 0.88rem;
        margin: 0 0 0.75rem;
        line-height: 1.5;
      }
      .servizio-card__durata {
        font-size: 0.78rem;
        background: var(--color-bg-subtle);
        color: var(--color-fg-muted);
        padding: 0.2rem 0.6rem;
        border-radius: 9999px;
        font-weight: 500;
      }
      .cta-band {
        padding: 4rem 1rem;
        background: var(--color-fg-default);
        color: #ffffff;
        text-align: center;
      }
      .cta-band h2 {
        margin: 0 0 0.75rem;
        color: #ffffff;
      }
      .cta-band p {
        color: rgba(255, 255, 255, 0.85);
        margin: 0 0 2rem;
        max-width: 560px;
        margin-left: auto;
        margin-right: auto;
      }
      .cta-band .btn-secondary {
        background: transparent;
        color: #ffffff;
        border-color: rgba(255, 255, 255, 0.3);
      }
      .cta-band .btn-secondary:hover {
        background: rgba(255, 255, 255, 0.1);
      }
    `
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HomeComponent {
  private readonly mockData = inject(MockDataService);

  readonly featuredServizi$ = this.mockData.servizi$.pipe(
    map((data) => data.servizi.filter((s) => s.featured).slice(0, 3))
  );
}
