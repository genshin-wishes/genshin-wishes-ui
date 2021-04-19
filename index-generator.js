const fs = require("fs");
const indexFilePrefix = "dist/genshin-wishes/";
const indexFilePath = "dist/genshin-wishes/index.template";
const indexFileProfilePath = "dist/genshin-wishes/index_profile.html";

const i18n = require("genshin-wishes-i18n/i18n/i18n.json");

console.log("After build script started...");

// read our index file
console.log("About to rewrite file: ", indexFilePath);

fs.readFile(indexFilePath, "utf8", function (err, data) {
  if (err) {
    return console.log(err);
  }

  data = data.replace(
    /@@LANG_TAGS@@/g,
    i18n
      .map(
        (locale) =>
          `    <link rel="alternate" href="https://genshin-wishes.com/${locale.toLowerCase()}" hreflang="${locale.toLowerCase()}" />\n    <link rel="alternate" href="https://genshin-wishes.com/${locale.toLowerCase()}" hreflang="${
            locale.toLowerCase().split("-")[0]
          }" />`
      )
      .join("\n")
  );

  // now write that file back
  fs.writeFile(
    indexFileProfilePath,
    data
      .replace(/@@LANG@@/g, "en")
      .replace(/@@URL@@/g, "__url__")
      .replace(/@@TITLE@@/g, "Genshin Wishes")
      .replace(/@@DESCRIPTION@@/g, "genshin-wishes.com")
      .replace(/@@IMAGE@@/g, "__host__/og/__profileId__.png"),
    function (err) {
      if (err) return console.log(err);
      console.log("Successfully rewrote index_profile.html");
    }
  );

  i18n.forEach((locale) => {
    const translations = require("genshin-wishes-i18n/i18n/" +
      locale +
      "/site.json");
    const title = translations.app.title;
    const description = translations.landing.welcome.description;
    const lowerCaseLocale = locale.toLowerCase();

    fs.writeFileSync(
      indexFilePrefix + "index_" + lowerCaseLocale + ".html",
      data
        .replace(/@@LANG@@/g, lowerCaseLocale)
        .replace(/@@URL@@/g, "https://genshin-wishes.com")
        .replace(/@@TITLE@@/g, title)
        .replace(/@@DESCRIPTION@@/g, description)
        .replace(
          /@@IMAGE@@/g,
          "https://genshin-wishes.com/assets/landing-landscape.jpg"
        ),
      function (err) {
        if (err) return console.log(err);
        console.log("Successfully rewrote index_" + lowerCaseLocale + ".html");
      }
    );
  });

  const enUs = Buffer.from(
    fs.readFileSync(indexFilePrefix + "index_en-us.html")
  ).toString();

  fs.writeFileSync(
    indexFilePrefix + "index.html",
    enUs.replace('lang="en-us"', 'lang=""')
  );
});
