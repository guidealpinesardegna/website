import fs from "fs-extra";
import { CATEGORIES, TYPES } from "../constants";
import { i18nConfig } from "../../astro.config.mjs";

export const activitiesStaticPaths = (lang) => {
  const activities = fs.readJsonSync("_cache/activities.json");
  return activities.map((activity) => ({
    params: {
      slug:
        i18nConfig.defaultLocale === lang
          ? activity.fields.slug
          : activity.fields[`slug_${lang}`],
    },
    props: {
      activity,
    },
  }));
};

export const postsStaticPaths = (lang) => {
  const posts = fs.readJsonSync("_cache/posts.json");
  return posts.map((post) => ({
    params: {
      slug:
        i18nConfig.defaultLocale === lang
          ? post.fields.slug
          : post.fields[`slug_${lang}`],
    },
    props: {
      post,
    },
  }));
};

export const activitiesCategoriesStaticPaths = (lang) => {
  return CATEGORIES.map((category) => ({
    params: {
      category:
        lang === i18nConfig.defaultLocale
          ? category.id
          : category[`id_${lang}`],
    },
  }));
};

export const activitiesTypesStaticPaths = (lang) => {
  return TYPES.map((type) => ({
    params: {
      type: lang === i18nConfig.defaultLocale ? type.id : type[`id_${lang}`],
    },
  }));
};
