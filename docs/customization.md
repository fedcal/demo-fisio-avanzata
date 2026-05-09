# Customization

## Cambiare i dati mock

Edita i file in `src/assets/mock/`. Vedi [Mock Data](/mock-data).

## Cambiare i colori

I design tokens sono in `src/styles.css`:

```css
:root {
  --color-accent: #0969da;        /* Cambia qui per il colore primario */
  --color-bg-default: #ffffff;
  --color-fg-default: #1f2328;
  /* ... */
}
```

## Cambiare il logo

Sostituisci `public/favicon.ico` e aggiungi il logo SVG in `public/logo.svg`.

## Aggiungere route

1. Crea il componente in `src/app/pages/{nome}/`
2. Aggiungi la route in `src/app/app.routes.ts`:

```typescript
{
  path: 'servizi',
  loadComponent: () => import('./pages/servizi/servizi.component').then((m) => m.ServiziComponent),
  title: 'Servizi — Centro Fisioterapia Avanzata'
}
```

## Cambiare i metadati SEO

Edita `src/index.html` per:
- `<title>` globale
- `<meta name="description">`
- Open Graph

Per metadati per-route usa `Title` e `Meta` di `@angular/platform-browser`.

## Disabilitare il prerender

In `angular.json`:

```json
"prerender": false
```

In questo caso il sito gira solo in modalità SSR runtime (più lento al cold start, più dinamico).

## White-label per cliente

1. Fork del repo o copia in nuova cartella
2. Sostituisci `fisio-avanzata` con nome cliente (`acme-fisioterapia`)
3. Sostituisci footer rimuovendo riferimento a Federico (modifica `footer.component.ts`)
4. Personalizza `vercel.json` con domain custom cliente
5. Deploy su Vercel cliente con loro account

---

## Possibili Sviluppi Customizzabili per Centro Fisioterapia Avanzata

### 1. TensorFlow.js PoseNet Realtime Video Feedback
**Scope**: ~28h | **Tier**: Avanzato | **Valore**: Compliance, home exercise engagement +60%

Webcam → 17 keypoints overlay. RED/GREEN form correction live. Auto-rep counter. Video recording optional patient. Confidence boost. Remote homework compliance driver.

### 2. 3D Exercise Visualization + Gamification
**Scope**: ~30h | **Tier**: Premium | **Valore**: Engagement, ROI psychological+adherence

Babylon.js avatar 3D. Reps×form accuracy multiplier score. Badge unlock per milestone. Leaderboard peer comparison. Motivation psychology-backed engagement.

### 3. Teleriabilitazione Session E2EE + Canvas Annotation
**Scope**: ~26h | **Tier**: Avanzato | **Valore**: Privacy + clinical continuity, telemedicina edge

Jitsi E2EE WebRTC. Canvas draw annotation (fisio markup movement). Realtime instruction. Summary PDF auto-generate. Medical record encrypted. Compliance GDPR Art.9.

### 4. LLaVA 7B Posture Analysis Before/After
**Scope**: ~20h | **Tier**: Avanzato | **Valore**: Structural feedback, engagement, objective progress

Photo before/after upload. LLaVA 7B structural feedback (postura, simmetry, tono). Weekly posture score trend. Discharge recommendation trigger. Objective proof progress visible.

### 5. Intensity Prescription Automation (ML Linear Regression)
**Scope**: ~22h | **Tier**: Avanzato | **Valore**: Optimized progression, fisio time -30%

Spring LightGBM: analyze past 10 session load+RPE → optimal load week recommendation. Progressive overload automation. Prevent plateau. Prevent re-injury risk.

### 6. Group Teleriabilitazione Class (Janus Multi-Party)
**Scope**: ~24h | **Tier**: Avanzato | **Valore**: Revenue stream, peer motivation, margin 30%

Janus multi-party max 8 partecipanti. Peer motivation + individual feedback per patient. Group accountability driver. Cost-effective revenue stream for clinic.

### 7. GDPR Art.9 + Complete Audit Trail
**Scope**: ~16h | **Tier**: Avanzato | **Valore**: Compliance, liability mitigation, audit-ready

PostgreSQL AES-256-GCM encryption. Access log every record touch (who, when, what). Compliance-ready GDPR audit. Medical record security gold standard. Compliance automatic.

### 8. Outcomes Dashboard (ROM/Pain/Strength Trends)
**Scope**: ~18h | **Tier**: Avanzato | **Valore**: Clinical evidence, patient engagement, outcome tracking

ROM trend chart (goniometer input). Pain VAS trend. Strength curve (Nm isokinetic). AI recommendation: discharge green, progression yellow, referral red. Evidence-based clinical.

### 9. Return-to-Sport/Work Automation (RTS/RTW 5-Criteria)
**Scope**: ~25h | **Tier**: Premium | **Valore**: High-value service, €500-1000 premium, liability safe

5-criteria automation: ROM ≥90% vs baseline, strength ≥85% Limb Symmetry Index, single-leg hop ≥85%, pain 0-1/10, sport-specific test pass → auto-clearance PDF. AIFI compliant.

### 10. Occupational Health Integration
**Scope**: ~20h | **Tier**: Premium | **Valore**: B2B revenue, workplace ergonomia leadership, €2k-5k/client/year

LLaVA workplace photo ergonomia feedback. RTW tolerance survey structured. Accommodation recommendations PDF. Employer HR dashboard (aggregate, no individual data). B2B differentiator.

**Total customizzazioni**: 10 idee, €6k-10.5k, ROI 3-8 mesi per centro fisio PMI 3-8 fisioterapisti.
