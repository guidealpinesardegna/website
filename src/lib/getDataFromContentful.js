import "dotenv/config";
import _ from "lodash";
import * as contentful from "contentful";
import fs from "fs-extra";
import {
  HOMEPAGE_ENTRY_ID,
  ACTIVITY_CONTENT_TYPE,
  BLOG_CONTENT_TYPE,
} from "../constants.js";
import { sortActivities } from "./utils.js";
import { CATEGORIES, TYPES } from "../constants.js";

const IS_PROD = process.env.ENV === "production";

const perIteration = 20;
const Client = contentful.createClient({
  space: process.env.CONTENTFUL_SPACE_ID,
  accessToken: process.env.CONTENTFUL_DELIVERY_TOKEN,
});

const getEntries = async (query) => {
  try {
    let iteration = 1;
    let entries;
    query.limit = perIteration;
    query.skip = 0;
    let chunk = await Client.getEntries(query);
    entries = chunk.items;
    while (chunk.total > query.limit * iteration) {
      query.skip = query.limit * iteration;
      chunk = await Client.withAllLocales.getEntries(query);
      entries = _.union(entries, chunk.items);
      iteration++;
    }
    return IS_PROD
      ? entries.filter((entry) => entry.sys.id !== TEST_ACTIVITY_ID)
      : entries;
  } catch (err) {
    console.log(err);
    return [];
  }
};

const getEntry = async (entryId) => {
  const post = await Client.getEntry(entryId);
  return [post];
};

const writeJson = async (fileName, data) => {
  const cleanData = JSON.stringify(data, null, 2).replace(
    /[\u2028\u2029\uFEFF\u200B-\u200D]/g,
    ""
  ); // Remove problematic Unicode characters
  await fs.outputFile(`_cache/${fileName}.json`, cleanData);
};

async function getHomePage() {
  const homepage = await getEntry(HOMEPAGE_ENTRY_ID, {
    include: 2,
  });
  await writeJson("homepage", homepage[0]);
  return homepage;
}

async function getActivities() {
  const activities = await getEntries({
    content_type: ACTIVITY_CONTENT_TYPE,
    include: 2,
  });

  await writeJson(
    "activities",
    sortActivities(activities).map((a) => ({
      ...a,
      category: CATEGORIES.find((c) => c.id === a.fields.category),
      type: TYPES.find((c) => c.id === a.fields.type),
    }))
  );
  return activities;
}

async function getBlogPosts() {
  const posts = await getEntries({
    content_type: BLOG_CONTENT_TYPE,
    include: 2,
  });

  await writeJson(
    "posts",
    posts.sort((a, b) => {
      const dateA = new Date(a.fields.date);
      const dateB = new Date(b.fields.date);
      return dateB - dateA;
    })
  );

  return posts;
}

await getHomePage();
const activities = await getActivities();
const posts = await getBlogPosts();

console.log(
  `fetched homepage, ${activities.length} activities, ${posts.length} posts`
);
