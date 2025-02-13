import fetch from "node-fetch";

// An asynchronous function to call
// the Netlify build hook to rebuild your site
const rebuildSite = async function () {
  // Make a POST request to the Netlify webhook
  return await fetch(process.env.SCHEDULED_NETLIFY_BUILD_HOOK, {
    method: "POST",
  });
};

// Always update your footer every year! :)
export default async () => {
  await rebuildSite();
};

// Netlify scheduled function cron syntax
// ogni giorno all'1
export const config = {
  schedule: "0 1 * * *",
};
