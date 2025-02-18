import { CATEGORIES, TYPES } from "../constants";

const transformedCategories = CATEGORIES.reduce((acc, { id, id_en }) => {
  acc[`/categoria/${id}`] = { en: `/en/category/${id_en}` };
  return acc;
}, {});

const transformedTypes = TYPES.reduce((acc, { id, id_en }) => {
  acc[`/tipo/${id}`] = { en: `/en/type/${id_en}` };
  return acc;
}, {});

export const routes = {
  "/": {
    en: "/en",
  },
  "/attivita": {
    en: "/en/activities",
  },
  "/blog": {
    en: "/en/blog",
  },
  "/chi-siamo": {
    en: "/en/about-us",
  },
  "/contatti": {
    en: "/en/contact-us",
  },
  "/privacy": {
    en: "/en/privacy",
  },
  "/messaggio-inviato": {
    en: "/en/message-sent",
  },
  ...transformedCategories,
  ...transformedTypes,
};

export const ui = {
  common: {
    "Guide Alpine Sardegna": {
      en: "Sardinia Mountain Guides",
    },
    Attività: { en: "Activities" },
    "Chi siamo": { en: "Who we are" },
    Contatti: { en: "Contact us" },
    "Cerca...": { en: "Search..." },
    "Digita almeno 3 caratteri": { en: "Type at least 3 characters" },
    "Nessun risultato": { en: "No results" },
    Arrampicata: { en: "Climbing" },
    Ferrate: { en: "Via ferrata" },
    "Leggi tutto": { en: "Read more" },
    "Dal blog": { en: "From the blog" },
    "Iscriviti per rimanere aggiornato sulle nostre ultime attività": {
      en: "Sign up to stay updated on our latest activities",
    },
    "Ho letto la": { en: "I've read the" },
    "Contattaci via Whatsapp": { en: "Contact us via Whatsapp" },
    Rifiuta: { en: "Decline" },
    Accetta: { en: "Accept" },
    "Torna alla homepage": { en: "Back to homepage" },
    Chiudi: { en: "Close" },
    "Info & Contatti": { en: "Info & Contact" },
    "Seguici su Instagram": { en: "Follow us on Instagram" },
    "Seguici su Facebook": { en: "Follow us on Facebook" },
  },
  blog: {
    Dettagli: { en: "Details" },
    "Galleria fotografica": { en: "Photo gallery" },
  },
  activity: {
    Dettagli: { en: "Details" },
    Dove: { en: "Where" },
    Difficoltà: { en: "Difficulty" },
    "Dimensioni del gruppo": { en: "Group size" },
    "Galleria fotografica": { en: "Photo gallery" },
    Quando: { en: "When" },
    Costo: { en: "Cost" },
    "Richiedi informazioni": { en: "Request information" },
    Nome: { en: "Name" },
    Messaggio: { en: "Message" },
    Invia: { en: "Send" },
  },
  "about-us": {
    "Chi siamo": { en: "Who we are" },
  },
  contact: {
    Contattaci: { en: "Contact us" },
    "Scrivici per qualsiasi dubbio o domanda": {
      en: "Write to us with any concerns or questions",
    },
    Nome: { en: "Name" },
    Messaggio: { en: "Message" },
    Invia: { en: "Send" },
  },
};
