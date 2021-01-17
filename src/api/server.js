const http = require('http');
const ffmetadata = require("ffmetadata");
const fs = require('fs');

const hostname = '127.0.0.1';
const port = 4201;
const folder = '../assets/music/';
const types = ["mp3", "mp4"];

const server = http.createServer((req, res) => {
  res.writeHead(200, {
    'Content-Type': 'text/json',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Credentials': true,
    'Access-Control-Allow-Methods': 'GET, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
  });




  // Read song.mp3 metadata
  // ffmetadata.read("song.mp3", function(err, data) {
  //     if (err) console.error("Error reading metadata", err);
  //     else console.log(data);
  // });

  // Set the artist for song.mp3
  // var data = {
  //   artist: "Me",
  // };
  // ffmetadata.write("song.mp3", data, function(err) {
  //     if (err) console.error("Error writing metadata", err);
  //     else console.log("Data written");
  // });




  fs.readdir(folder, (err, files) => {
    let filelist = [];
    files.forEach(file => {

      console.log(folder+file);
      ffmetadata.read(folder+file, (err, data) => {
          if (err) console.error("Error reading metadata", err);
          else console.log(data);
      });

      let fileTypes = file.split('.');
      if (types.includes(fileTypes[fileTypes.length - 1])) {
        filelist.push(folder+file);
      }
    });

    res.write(JSON.stringify(filelist));
    res.end();
  });
});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
