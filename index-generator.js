const fs = require("fs");
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
    indexFileFrPath,
    data
      .replace(/@@LANG@@/g, "fr")
      .replace(/@@TITLE@@/g, "Genshin Wishes — Calculez votre pity")
      .replace(
        /@@DESCRIPTION@@/g,
        "Calculez votre pity sur chaque bannière et consultez vos vœux Genshin Impact simplement."
      ),
    function (err) {
      if (err) return console.log(err);
      console.log("Successfully rewrote index fr html");
    }
  );

  fs.writeFile(
    indexFileEnPath,
    data
      .replace(/@@LANG@@/g, "en")
      .replace(/@@TITLE@@/g, "Genshin Wishes - Calculate your pity")
      .replace(
        /@@DESCRIPTION@@/g,
        "Calculate your pity on each banner and view your Genshin Impact wishes easily."
      ),
    function (err) {
      if (err) return console.log(err);
      console.log("Successfully rewrote index en html");
    }
  );
});
