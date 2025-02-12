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
    en: "/en/who-we-are",
  },
  "/messaggio-inviato": {
    en: "/en/message-sent",
  },
  ...transformedCategories,
  ...transformedTypes,
};

export const ui = {
  common: {
    ciao: {
      en: "hello",
    },
  },
};
