// Loading the dependencies. We don't need pretty
// because we shall not log html to the terminal
const axios = require("axios");
const cheerio = require("cheerio");
const fs = require("fs");

// URL of the page we want to scrape
const url = "https://www.hireitpeople.com/resume-database/64-java-developers-architects-resumes/188909-react-node-js-lead-architect-resume-phoenix-az";

// Async function which scrapes the data
async function scrapeData() {
  try {
    // Fetch HTML of the page we want to scrape
    const { data } = await axios.get(url);
    // Load HTML we fetched in the previous line
    const websiteData = cheerio.load(data);
    // Select all the list items in plainlist class
    const listItems = websiteData(".single-post-body ul li");
    // Stores data for all countries
    const targetedData = [];
    listItems.each(function (idx, el) {
      // console.log(websiteData(el).text());
      targetedData.push(websiteData(el).text());
    });
    // Logs countries array to the console
    console.log(targetedData);


    fs.writeFile("ouput.txt", JSON.stringify(targetedData, null, "\n"), (err) => {
      if (err) {
        console.error(err);
        return;
      }
      console.log("Successfully written data to file");
    });

    // console.log(dataSelection.html());
  } catch (err) {
    console.error(err);
  }
}
// Invoke the above function
scrapeData();
