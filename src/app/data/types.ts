// Tipi TypeScript per i dati mock di Spine Center Milano

export interface Indirizzo {
  via: string;
  citta: string;
  provincia: string;
  cap: string;
  regione: string;
  paese: string;
  lat: number;
  lng: number;
}

export interface Contatti {
  telefono: string;
  whatsapp: string;
  email: string;
  social: {
    instagram?: string;
    facebook?: string;
  };
}

export interface OrariApertura {
  lunedi: string;
  martedi: string;
  mercoledi: string;
  giovedi: string;
  venerdi: string;
  sabato: string;
  domenica: string;
}

export interface MetaSeo {
  title: string;
  description: string;
  keywords: string[];
}

export interface InfoAttivita {
  ragioneSociale: string;
  nomeCommerciale: string;
  tagline: string;
  indirizzo: Indirizzo;
  contatti: Contatti;
  orari: OrariApertura;
  metaSeo: MetaSeo;
}

export interface CategoriaServizio {
  id: string;
  nome: string;
  ordine: number;
}

export interface Servizio {
  id: number;
  categoria: string;
  nome: string;
  descrizione: string;
  prezzo: number;
  durata: string;
  featured: boolean;
}

export interface ServiziData {
  servizi: Servizio[];
  categorie: CategoriaServizio[];
}

export interface CategoriaTecnologia {
  id: string;
  nome: string;
  ordine: number;
}

export interface Tecnologia {
  id: number;
  nome: string;
  categoria: string;
  descrizione: string;
  indicazioni: string[];
}

export interface TecnologieData {
  tecnologie: Tecnologia[];
  categorie: CategoriaTecnologia[];
}

export interface Membro {
  id: number;
  nome: string;
  ruolo: string;
  bio: string;
  anniEsperienza: number;
  albo: string;
  image: string;
  specialita: string[];
}

export interface Team {
  team: Membro[];
}

export interface FaqItem {
  domanda: string;
  risposta: string;
}

export interface Faq {
  faq: FaqItem[];
}
