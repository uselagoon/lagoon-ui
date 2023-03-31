const crypto = require("crypto-js");
const fs = require("fs");

/* 
    Using this script before or during build, makes sure that each step in tour.json have hashes appended as their "key" properties,
    that then get used to identify content changes, which affects the visibility of these steps during the product tour.

    Removes the need for manual versioning.
*/

const tourData = JSON.parse(fs.readFileSync("tour.json", "utf-8"));

// add content hash to each step object
const routes = tourData.routes;

for (let i = 0; i < routes.length; i++) {
  const routeSteps = routes[i].steps;
  for (let k = 0; k < routeSteps.length; k++) {
    const step = routeSteps[k];
    const stepHash = crypto.MD5(step.content).toString();
    routeSteps[k].key = stepHash;
  }
}
// rewrite the modified tour steps
fs.writeFileSync("tour.json", JSON.stringify(tourData, null, 2));
