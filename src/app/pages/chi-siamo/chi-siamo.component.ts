import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { AsyncPipe, NgFor, NgIf } from '@angular/common';
import { RouterLink } from '@angular/router';

import { MockDataService } from '../../data/mock-data.service';

@Component({
  selector: 'app-chi-siamo',
  standalone: true,
  imports: [AsyncPipe, NgFor, NgIf, RouterLink],
  template: `
    <section class="page-header">
      <div class="demo-container">
        <h1>Chi siamo</h1>
        <p>Un centro multidisciplinare nato dalla passione per la riabilitazione d'eccellenza.</p>
      </div>
    </section>

    <article class="demo-container content">
      <section class="story">
        <h2>Spine Center Milano</h2>
        <p>
          Spine Center Milano nasce nel 2014 dall'esperienza ventennale del Dr. Marco Ferretti, ortopedico già
          primario all'Ospedale Niguarda. La sua visione: creare un centro dove chirurgia ortopedica e fisioterapia
          avanzata dialogassero quotidianamente, eliminando il confine tra diagnosi e riabilitazione.
        </p>
        <p>
          Oggi l'equipe comprende cinque specialisti — ortopedico, tre fisioterapisti con master europei e un
          osteopata DO — che lavorano su protocolli condivisi aggiornati annualmente con la letteratura scientifica
          internazionale. Ogni paziente riceve una valutazione con analisi posturale 3D e un piano terapeutico
          ridiscusso ogni sei sedute sulla base dei risultati misurabili.
        </p>
      </section>

      <section class="values">
        <h2>I nostri pilastri</h2>
        <ul class="values-grid">
          <li>
            <h3>Evidence-based</h3>
            <p>Ogni protocollo è fondato sulla letteratura scientifica peer-reviewed. Nessuna terapia senza evidenza clinica.</p>
          </li>
          <li>
            <h3>Tecnologia avanzata</h3>
            <p>12 tecnologie riabilitative di ultima generazione: da PoseNet 3D all'isocinetica, dallo stesso standard degli ospedali universitari.</p>
          </li>
          <li>
            <h3>Piano personalizzato</h3>
            <p>Non esistono protocolli standard. Ogni percorso nasce da una diagnosi funzionale completa e si evolve sui risultati.</p>
          </li>
          <li>
            <h3>Trasparenza</h3>
            <p>Referto scritto dopo ogni valutazione, obiettivi chiari, tempistiche realistiche. Il paziente è parte attiva del percorso.</p>
          </li>
        </ul>
      </section>

      <section class="team" *ngIf="team$ | async as team">
        <h2>Il nostro team</h2>
        <ul class="team-grid">
          <li *ngFor="let m of team.team" class="team-card">
            <div class="team-card__avatar" aria-hidden="true">{{ m.nome.charAt(0) }}</div>
            <h3>{{ m.nome }}</h3>
            <p class="team-card__role">{{ m.ruolo }}</p>
            <p class="team-card__albo">{{ m.albo }}</p>
            <p class="team-card__bio">{{ m.bio }}</p>
            <p class="team-card__exp">{{ m.anniEsperienza }} anni di esperienza</p>
            <ul class="team-card__skills">
              <li *ngFor="let s of m.specialita">{{ s }}</li>
            </ul>
          </li>
        </ul>
      </section>

      <section class="faq" *ngIf="faq$ | async as faq">
        <h2>Domande frequenti</h2>
        <dl class="faq-list">
          <ng-container *ngFor="let item of faq.faq">
            <dt>{{ item.domanda }}</dt>
            <dd>{{ item.risposta }}</dd>
          </ng-container>
        </dl>
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
      }
      .content {
        padding: 3rem 1rem;
      }
      .story {
        max-width: 720px;
        margin: 0 auto 4rem;
      }
      .story h2 {
        margin-bottom: 1rem;
      }
      .story p {
        line-height: 1.7;
        margin-bottom: 1rem;
        color: var(--color-fg-muted);
      }
      .values {
        margin-bottom: 4rem;
      }
      .values h2 {
        text-align: center;
        margin-bottom: 2rem;
      }
      .values-grid {
        list-style: none;
        padding: 0;
        margin: 0;
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
        gap: 1.5rem;
      }
      .values-grid li {
        padding: 1.5rem;
        background: var(--color-bg-subtle);
        border: 1px solid var(--color-border);
        border-radius: var(--radius-md);
      }
      .values-grid h3 {
        margin: 0 0 0.5rem;
        color: var(--color-accent);
      }
      .values-grid p {
        margin: 0;
        color: var(--color-fg-muted);
        font-size: 0.9rem;
      }
      .team {
        margin-bottom: 4rem;
      }
      .team h2 {
        text-align: center;
        margin-bottom: 2rem;
      }
      .team-grid {
        list-style: none;
        padding: 0;
        margin: 0;
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
        gap: 1.5rem;
      }
      .team-card {
        padding: 1.5rem;
        border: 1px solid var(--color-border);
        border-radius: var(--radius-md);
        text-align: center;
      }
      .team-card__avatar {
        width: 72px;
        height: 72px;
        border-radius: 50%;
        background: var(--color-accent);
        color: #ffffff;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 1.75rem;
        font-weight: 700;
        margin: 0 auto 1rem;
      }
      .team-card h3 {
        margin: 0 0 0.25rem;
      }
      .team-card__role {
        margin: 0 0 0.25rem;
        color: var(--color-accent);
        font-weight: 600;
        font-size: 0.9rem;
      }
      .team-card__albo {
        font-size: 0.72rem;
        color: var(--color-fg-muted);
        font-style: italic;
        margin-bottom: 0.75rem;
      }
      .team-card__bio {
        font-size: 0.88rem;
        color: var(--color-fg-muted);
        margin-bottom: 0.5rem;
        text-align: left;
        line-height: 1.5;
      }
      .team-card__exp {
        font-size: 0.8rem;
        font-weight: 600;
        margin-bottom: 0.75rem;
      }
      .team-card__skills {
        list-style: none;
        padding: 0;
        margin: 0;
        display: flex;
        gap: 0.4rem;
        flex-wrap: wrap;
        justify-content: center;
      }
      .team-card__skills li {
        font-size: 0.7rem;
        background: var(--color-bg-subtle);
        padding: 0.2rem 0.5rem;
        border-radius: 9999px;
        color: var(--color-fg-muted);
        border: 1px solid var(--color-border);
      }
      .faq h2 {
        margin-bottom: 1.5rem;
      }
      .faq-list {
        margin: 0;
        padding: 0;
      }
      .faq-list dt {
        font-weight: 600;
        padding: 1rem 0 0.25rem;
        border-top: 1px solid var(--color-border);
      }
      .faq-list dt:first-of-type {
        border-top: none;
      }
      .faq-list dd {
        margin: 0 0 0.75rem;
        color: var(--color-fg-muted);
        font-size: 0.95rem;
        line-height: 1.6;
        padding-left: 1rem;
      }
    `
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ChiSiamoComponent {
  private readonly mockData = inject(MockDataService);

  readonly team$ = this.mockData.team$;
  readonly faq$ = this.mockData.faq$;
}
