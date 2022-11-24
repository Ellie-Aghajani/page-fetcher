const fs = require("fs");
const request = require("request");

const times = process.argv.slice(2);
const site = times[0];
const localPath = times[1];

request(site, (error, response, body) => {
  let siteResponse = body;

  // if URL is invalid
  if (siteResponse === undefined)
    return console.log(`URL is invalid. ${error}`);


  fs.writeFile(localPath, siteResponse, (err) => {
    if (err) {
      console.error(err);
      return;
    }

    //file written successfully
    fs.stat(localPath, (err, stats) => {
      if (err) {
        console.error(err);
        return;
      }

      //we have access to the file stats in `stats`, size in particular
      console.log(`Downloaded and saved ${stats.size} bytes to ${localPath}`);
    });
  });
});