import _ from "lodash";
import { i18nConfig } from "../../astro.config.mjs";
import { routes, ui } from "./translations";

export function useTranslation(lang, nameSpace) {
  return function t(key) {
    if (lang === i18nConfig.defaultLocale) {
      return key;
    } else {
      try {
        return ui[nameSpace][key][lang];
      } catch (err) {
        console.log("missing transaltion for", { nameSpace, key, lang });
        return key;
      }
    }
  };
}

export function pageLink(path, locale, currentLocale) {
  const defaultLocale = i18nConfig.defaultLocale;
  if (locale === currentLocale) return null;
  if (locale === defaultLocale) {
    return Object.keys(routes).find((key) =>
      Object.values(routes[key]).includes(path)
    );
  }

  if (!routes[path]) {
    return "";
  }

  return routes[path][locale];
}

export function getLocalizedLink(key, locale) {
  if (locale === i18nConfig.defaultLocale) {
    return key;
  }
  const translations = routes[key];
  if (!translations) return null;

  const localizedPath = translations[locale];
  if (!localizedPath) return null;

  return `${localizedPath}`;
}

export function getLocalizedField(key, object, locale) {
  try {
    if (locale === i18nConfig.defaultLocale) {
      return _.get(object, key);
    } else {
      return _.get(object, `${key}_${locale}`);
    }
  } catch (err) {
    console.log("cannot get localized item field", { key });
    return "";
  }
}

function prefixLink(link, locale) {
  if (locale === i18nConfig.defaultLocale) {
    return `/${link}`;
  } else {
    return `/${locale}/${link}`;
  }
}

export function contentTypeLink(item, locale) {
  try {
    const map = {
      activity: {
        it: "attivita",
        en: "activities",
      },
      blog: {
        it: "post",
        en: "post",
      },
    };

    return prefixLink(
      `${map[item.sys.contentType.sys.id][locale]}/${getLocalizedField(
        "fields.slug",
        item,
        locale
      )}`,
      locale
    );
  } catch (err) {
    console.log(err);
    return "";
  }
}

export function activityCategoryLink(category, locale) {
  if (!category) {
    return "";
  }
  try {
    const map = {
      it: "categoria",
      en: "category",
    };
    let slug =
      locale === i18nConfig.defaultLocale
        ? category.id
        : category[`id_${locale}`];
    return prefixLink(`${map[locale]}/${slug}`, locale);
  } catch (err) {
    console.log(err);
    return "";
  }
}

export function activityTypeLink(type, locale) {
  try {
    const map = {
      it: "tipo",
      en: "type",
    };
    let slug =
      locale === i18nConfig.defaultLocale ? type.id : type[`id_${locale}`];
    return prefixLink(`${map[locale]}/${slug}`, locale);
  } catch (err) {
    console.log(err);
    return "";
  }
}
