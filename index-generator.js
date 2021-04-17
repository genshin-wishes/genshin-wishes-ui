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
          `    <link rel="alternate" href="https://genshin-wishes.com/${locale.toLowerCase()}" hreflang="${locale.toLowerCase()}" />`
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
      console.log("Successfully rewrote index profile html");
    }
  );

  i18n.forEach((locale) => {
    const translations = require("genshin-wishes-i18n/i18n/" +
      locale +
      "/site.json");
    const title = translations.app.title;
    const description = translations.landing.welcome.description;

    fs.writeFile(
      indexFilePrefix + "index_" + locale.toLowerCase() + ".html",
      data
        .replace(/@@LANG@@/g, locale)
        .replace(/@@URL@@/g, "https://genshin-wishes.com")
        .replace(/@@TITLE@@/g, title)
        .replace(/@@DESCRIPTION@@/g, description)
        .replace(
          /@@IMAGE@@/g,
          "https://genshin-wishes.com/assets/landing-landscape.jpg"
        ),
      function (err) {
        if (err) return console.log(err);
        console.log("Successfully rewrote index_" + locale + ".html");
      }
    );
  });
});
