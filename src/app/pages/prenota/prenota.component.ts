import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { AsyncPipe, NgFor, NgIf } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

import { MockDataService } from '../../data/mock-data.service';

@Component({
  selector: 'app-prenota',
  standalone: true,
  imports: [AsyncPipe, NgFor, NgIf, ReactiveFormsModule],
  template: `
    <section class="page-header">
      <div class="demo-container">
        <h1>Prenota una visita</h1>
        <p>Compila il modulo per richiedere un appuntamento. Risponderemo entro 24 ore per confermare.</p>
      </div>
    </section>

    <article class="demo-container content">
      <div class="prenota-grid">
        <section class="info-block" *ngIf="info$ | async as info">
          <h2>Dove siamo</h2>
          <p>
            {{ info.indirizzo.via }}<br />
            {{ info.indirizzo.cap }} {{ info.indirizzo.citta }} ({{ info.indirizzo.provincia }})
          </p>

          <h2>Contatti diretti</h2>
          <ul class="contact-list">
            <li>
              <strong>Telefono:</strong>
              <a [href]="'tel:' + info.contatti.telefono">{{ info.contatti.telefono }}</a>
            </li>
            <li>
              <strong>WhatsApp:</strong>
              <a [href]="whatsAppLink(info.contatti.whatsapp)" target="_blank" rel="noopener">{{ info.contatti.whatsapp }}</a>
            </li>
            <li>
              <strong>Email:</strong>
              <a [href]="'mailto:' + info.contatti.email">{{ info.contatti.email }}</a>
            </li>
          </ul>

          <h2>Orari di apertura</h2>
          <ul class="hours-list">
            <li><span>Lunedì</span><span>{{ info.orari.lunedi }}</span></li>
            <li><span>Martedì</span><span>{{ info.orari.martedi }}</span></li>
            <li><span>Mercoledì</span><span>{{ info.orari.mercoledi }}</span></li>
            <li><span>Giovedì</span><span>{{ info.orari.giovedi }}</span></li>
            <li><span>Venerdì</span><span>{{ info.orari.venerdi }}</span></li>
            <li><span>Sabato</span><span>{{ info.orari.sabato }}</span></li>
            <li><span>Domenica</span><span>{{ info.orari.domenica }}</span></li>
          </ul>
        </section>

        <section class="form-block">
          <h2>Richiesta appuntamento</h2>

          <form [formGroup]="form" (ngSubmit)="onSubmit()" *ngIf="!submitted(); else thankyou">
            <div class="field">
              <label for="nome">Nome e cognome *</label>
              <input id="nome" type="text" formControlName="nome" required autocomplete="name" />
            </div>
            <div class="field">
              <label for="email">Email *</label>
              <input id="email" type="email" formControlName="email" required autocomplete="email" />
            </div>
            <div class="field">
              <label for="telefono">Telefono *</label>
              <input id="telefono" type="tel" formControlName="telefono" required autocomplete="tel" />
            </div>
            <div class="field">
              <label for="servizio">Servizio richiesto *</label>
              <select id="servizio" formControlName="servizio" required>
                <option value="">-- Seleziona --</option>
                <optgroup *ngFor="let cat of categorie$ | async" [label]="cat.nome">
                  <option *ngFor="let s of getServiziCat(cat.id)" [value]="s.nome">{{ s.nome }} — €{{ s.prezzo }}</option>
                </optgroup>
              </select>
            </div>
            <div class="row">
              <div class="field">
                <label for="data">Data preferita *</label>
                <input id="data" type="date" formControlName="data" required />
              </div>
              <div class="field">
                <label for="fascia">Fascia oraria *</label>
                <select id="fascia" formControlName="fascia" required>
                  <option value="">--</option>
                  <option value="mattina">Mattina (08-13)</option>
                  <option value="pomeriggio">Pomeriggio (13-20)</option>
                </select>
              </div>
            </div>
            <div class="field">
              <label for="anamnesi">Descrizione breve del problema</label>
              <textarea id="anamnesi" formControlName="anamnesi" rows="3" placeholder="Es.: lombalgia da 3 mesi, dolore al ginocchio dopo distorsione..."></textarea>
            </div>
            <div class="field field--checkbox">
              <input id="privacy" type="checkbox" formControlName="privacy" required />
              <label for="privacy">
                Accetto il trattamento dei dati sanitari ai sensi del <strong>GDPR Art. 9</strong> e della normativa sulla protezione dei dati personali sensibili in ambito sanitario. *
              </label>
            </div>
            <div class="field field--checkbox">
              <input id="marketing" type="checkbox" formControlName="marketing" />
              <label for="marketing">
                Accetto di ricevere comunicazioni su servizi, promozioni e aggiornamenti clinici (facoltativo).
              </label>
            </div>
            <button type="submit" class="btn btn-primary" [disabled]="form.invalid">Invia richiesta</button>
            <p class="form-disclaimer">
              Demo non funzionale: nessun dato viene trasmesso. In un sito reale i dati sanitari sarebbero cifrati in transito e trattati con misure di sicurezza rinforzate (GDPR Art. 9).
            </p>
          </form>

          <ng-template #thankyou>
            <div class="thankyou">
              <h3>Grazie {{ form.value['nome'] }}!</h3>
              <p>
                La richiesta per <strong>{{ form.value['servizio'] }}</strong> è stata simulata.
                In un sito reale riceveresti un'email di conferma entro 24 ore.
              </p>
              <p>Per urgenze chiama direttamente: <a href="tel:+390212345678">+39 02 1234 5678</a></p>
              <button type="button" class="btn btn-secondary" (click)="reset()">Nuova richiesta</button>
            </div>
          </ng-template>
        </section>
      </div>
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
      .prenota-grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
        gap: 3rem;
      }
      .info-block h2 {
        margin: 1.5rem 0 0.75rem;
        font-size: 1.1rem;
      }
      .info-block h2:first-child {
        margin-top: 0;
      }
      .info-block p {
        color: var(--color-fg-muted);
        margin: 0;
        line-height: 1.6;
      }
      .contact-list {
        list-style: none;
        padding: 0;
        margin: 0;
      }
      .contact-list li {
        margin-bottom: 0.5rem;
        font-size: 0.95rem;
      }
      .hours-list {
        list-style: none;
        padding: 0;
        margin: 0;
      }
      .hours-list li {
        display: flex;
        justify-content: space-between;
        padding: 0.35rem 0;
        border-bottom: 1px dashed var(--color-border);
        font-size: 0.9rem;
      }
      .form-block {
        background: var(--color-bg-subtle);
        padding: 2rem;
        border-radius: var(--radius-lg);
        border: 1px solid var(--color-border);
      }
      .form-block h2 {
        margin: 0 0 1.5rem;
      }
      .field {
        margin-bottom: 1rem;
        display: flex;
        flex-direction: column;
      }
      .field label {
        font-size: 0.85rem;
        font-weight: 600;
        margin-bottom: 0.25rem;
        color: var(--color-fg-default);
      }
      .field input,
      .field textarea,
      .field select {
        padding: 0.5rem 0.75rem;
        border: 1px solid var(--color-border);
        border-radius: var(--radius-sm);
        font-family: inherit;
        font-size: 0.95rem;
        background: var(--color-bg-default);
        color: var(--color-fg-default);
      }
      .field input:focus,
      .field textarea:focus,
      .field select:focus {
        outline: 2px solid var(--color-accent);
        outline-offset: 1px;
        border-color: var(--color-accent);
      }
      .field--checkbox {
        flex-direction: row;
        align-items: flex-start;
        gap: 0.5rem;
      }
      .field--checkbox input {
        margin-top: 0.2rem;
        flex-shrink: 0;
      }
      .field--checkbox label {
        font-weight: 400;
        font-size: 0.83rem;
        color: var(--color-fg-muted);
        line-height: 1.4;
      }
      .row {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 0.75rem;
      }
      .btn {
        display: inline-block;
        padding: 0.7rem 1.5rem;
        border-radius: var(--radius-md);
        text-decoration: none;
        font-weight: 600;
        border: none;
        cursor: pointer;
        font-size: 0.95rem;
        transition: all 0.15s ease;
      }
      .btn-primary {
        background: var(--color-accent);
        color: #ffffff;
      }
      .btn-primary:disabled {
        opacity: 0.5;
        cursor: not-allowed;
      }
      .btn-primary:not(:disabled):hover {
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
      .form-disclaimer {
        font-size: 0.78rem;
        color: var(--color-fg-muted);
        font-style: italic;
        margin-top: 0.75rem;
        line-height: 1.4;
      }
      .thankyou {
        text-align: center;
        padding: 1rem 0;
      }
      .thankyou h3 {
        color: var(--color-success);
        margin-bottom: 1rem;
      }
      .thankyou p {
        color: var(--color-fg-muted);
        margin-bottom: 0.75rem;
      }
    `
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PrenotaComponent {
  private readonly mockData = inject(MockDataService);
  private readonly fb = inject(FormBuilder);

  readonly info$ = this.mockData.info$;
  readonly categorie$ = this.mockData.servizi$.pipe();
  readonly submitted = signal(false);

  private serviziCache: { categoria: string; id: number; nome: string; prezzo: number }[] = [];

  constructor() {
    this.mockData.servizi$.subscribe((data) => {
      this.serviziCache = data.servizi;
    });
  }

  readonly form: FormGroup = this.fb.nonNullable.group({
    nome: ['', [Validators.required, Validators.minLength(2)]],
    email: ['', [Validators.required, Validators.email]],
    telefono: ['', [Validators.required, Validators.pattern(/^[+0-9 ]{6,}$/)]],
    servizio: ['', Validators.required],
    data: ['', Validators.required],
    fascia: ['', Validators.required],
    anamnesi: [''],
    privacy: [false, Validators.requiredTrue],
    marketing: [false]
  });

  whatsAppLink(num: string): string {
    const clean = num.replace(/[^0-9]/g, '');
    return `https://wa.me/${clean}`;
  }

  getServiziCat(catId: string) {
    return this.serviziCache.filter((s) => s.categoria === catId);
  }

  onSubmit(): void {
    if (this.form.valid) {
      this.submitted.set(true);
    }
  }

  reset(): void {
    this.form.reset({ privacy: false, marketing: false });
    this.submitted.set(false);
  }
}
