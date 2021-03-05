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
      .replace(
        /@@TITLE@@/g,
        "Genshin Wishes — Sauvegardez votre historique de vœux facilement"
      )
      .replace(
        /@@DESCRIPTION@@/g,
        "Sauvegardez vos vœux Genshin Impact rapidement et conservez les autant de temps que vous le souhaitez. Consultez vos statistiques de vœux, calculez votre pity pour chaque bannière et parcourez vos anciens vœux en toute simplicité."
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
      .replace(/@@TITLE@@/g, "Genshin Wishes - Backup your wish history easily")
      .replace(
        /@@DESCRIPTION@@/g,
        "Backup your Genshin Impact wishes quickly and keep them for as long as you want. Check your wish statistics, calculate your pity for each banner and browse your old wishes easily."
      ),
    function (err) {
      if (err) return console.log(err);
      console.log("Successfully rewrote index en html");
    }
  );
});
