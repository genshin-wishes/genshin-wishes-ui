const fs = require("fs");
const rp = require("request-promise");
const express = require("express");
const sharp = require("sharp");

function parseSvg(
  svg,
  username,
  count,
  count4Stars,
  count5Stars,
  last5StarA,
  last5StarB
) {
  return svg
    .replace("@@username@@", username)
    .replace("@@count@@", count)
    .replace("@@count4Stars@@", count4Stars)
    .replace("@@count5Stars@@", count5Stars)
    .replace("@@last5StarA@@", last5StarA)
    .replace("@@last5StarB@@", last5StarB);
}

const app = express();
const port = 8080;

let indexAsString = "";
let items = [];

rp({
  uri: "http://genshin-wishes-ui/index_unparsed.html",
}).then((data) => {
  indexAsString = data;
});

const svgTemplate = Buffer.from(
  fs.readFileSync("./profile-banner.svg", null)
).toString();
const notFound =
  "data:image/png;base64," +
  Buffer.from(fs.readFileSync("./not-found.png", null)).toString("base64");

rp({
  uri: "http://genshin-wishes-ui/api/items",
  json: true,
}).then((data) => {
  items = data;

  items.forEach((i) => getItemImageAs64(i).then((img) => (i.image = img)));
});

async function getItemImageAs64(item) {
  let itemImage =
    item &&
    (await rp({
      uri: "https://genshin-wishes.com/content" + item.image.url,
      encoding: null,
    }).catch(() => ""));

  return !itemImage
    ? notFound
    : "data:image/png;base64," + Buffer.from(itemImage).toString("base64");
}

app.get("/:profileId.png", async (req, res, next) => {
  const username = await rp({
    uri: "http://genshin-wishes-ui/api/profile/" + req.params.profileId + "/",
  }).catch(() => null);
  const stats = await rp({
    uri:
      "http://genshin-wishes-ui/api/profile/" +
      req.params.profileId +
      "/stats/ALL",
    json: true,
  }).catch(() => null);

  if (!username || !stats) {
    res.status(404);
    res.send("Not found");
    return;
  }

  const wishes = stats.wishes.map((w) => ({
    ...w,
    item: items.find((i) => i.itemId === w.itemId),
  }));
  const wishes5Star = wishes.filter((w) => w.item.rankType === 5);
  const last5StarA =
    wishes5Star.length >= 1 && wishes5Star[wishes5Star.length - 1].item;
  const last5StarB =
    wishes5Star.length >= 2 && wishes5Star[wishes5Star.length - 2].item;

  const parsedSvg = parseSvg(
    svgTemplate,
    username,
    stats.count,
    stats.count4Stars,
    stats.count5Stars,
    last5StarA.image || notFound,
    last5StarB.image || notFound
  );

  sharp(Buffer.from(parsedSvg))
    .png()
    .toBuffer()
    .then((svgToPng) => {
      res.writeHead(200, {
        "Content-Type": "image/png",
        "Content-Length": svgToPng.length,
      });
      res.end(svgToPng);
    })
    .catch(() => {
      res.status(500);
      res.send("Rendering error");
    });
});

app.listen(port, () => {
  console.log(`Profile proxy app listening at http://localhost:${port}`);
});
