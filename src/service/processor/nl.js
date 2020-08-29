require('dotenv').config();
const fs = require('fs');
const language = require('@google-cloud/language');

const util = require('../../utils/jsonparser');
async function main() {
  const client = new language.LanguageServiceClient({
    keyFilename: process.env.GOOGLE_SECRET,
  });

  // The text to analyze
  const text = `In a place like Carlyss, a town of 6,000 people just west of Lake Charles, Rita is the storm all others are judged against. It leveled some small coastal communities almost completely and was the first to seriously rattle the area since Hurricane Audrey, which killed more than 400 people in 1957.`;

  const document = {
    content: text,
    type: 'PLAIN_TEXT',
  };

  // Detects the sentiment of the text
  const [result] = await client.analyzeSentiment({ document: document });
  const sentiment = result.documentSentiment;

  const entity = await client.analyzeEntities({ document: document });

  const entities = entity[0].entities;
  util.mkdirSync('test-results/nl');

  entities.forEach((el, val = 1) => {
    console.log(el);
    fs.writeFile(
      `test-results/nl/index-${val}.json`,
      JSON.stringify(el),
      (err) => console.log(err)
    );
  });

  console.log(`Text: ${text}`);
  console.log('------------');

  console.log(`Sentiment score: ${sentiment.score}`);
  console.log(`Sentiment magnitude: ${sentiment.magnitude}`);

  const [classification] = await client.classifyText({ document: document });

  if (classification.categories.length > 0) {
    console.log('Categories:');
    classification.categories.forEach((category) => {
      console.log(`Name: ${category.name}, Confidence: ${category.confidence}`);
    });
  }
}

main();
