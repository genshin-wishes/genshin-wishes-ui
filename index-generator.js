const fs = require("fs");
const indexFileProfilePath = "dist/genshin-wishes/index_profile.html";
const indexFileFrPath = "dist/genshin-wishes/index_fr.html";
const indexFileEnPath = "dist/genshin-wishes/index_en.html";
const indexFilePath = "dist/genshin-wishes/index.html";

console.log("After build script started...");

// read our index file
console.log("About to rewrite file: ", indexFilePath);

fs.readFile(indexFilePath, "utf8", function (err, data) {
  if (err) {
    return console.log(err);
  }

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

  // now write that file back
  fs.writeFile(
    indexFileEnPath,
    data
      .replace(/@@LANG@@/g, "en")
      .replace(/@@URL@@/g, "https://genshin-wishes.com")
      .replace(/@@TITLE@@/g, "Genshin Wishes - Backup your wish history easily")
      .replace(
        /@@DESCRIPTION@@/g,
        "Backup your Genshin Impact wishes quickly and keep them for as long as you want. Check your wish statistics, calculate your pity for each banner and browse your old wishes easily."
      )
      .replace(
        /@@IMAGE@@/g,
        "https://genshin-wishes.com/assets/landing-landscape.jpg"
      ),
    function (err) {
      if (err) return console.log(err);
      console.log("Successfully rewrote index en html");
    }
  );
});
