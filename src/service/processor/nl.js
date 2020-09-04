require('dotenv').config();
const fs = require('fs');
const language = require('@google-cloud/language');

const util = require('../../utils/jsonparser');
async function main() {
  const client = new language.LanguageServiceClient({
    keyFilename: process.env.GOOGLE_SECRET,
  });

  // The text to analyze
  const text = `Chadwick Boseman, who played Black American icons Jackie Robinson and James Brown with searing intensity before inspiring audiences worldwide as the regal Black Panther in Marvel’s blockbuster movie franchise, died Friday of cancer. He was 43 `;
  const text2 = `AFP — Water covers 70 percent of the Earth’s surface and is crucial to life as we know it, but how it got here has been a longstanding scientific debate.

The puzzle was a step closer to being solved Thursday after a French team reported in the journal Science they had identified which space rocks were responsible, and suggested our planet has been wet ever since it formed.
Cosmo-chemist Laurette Piani, who led the research, told AFP the findings contradicted the prevalent theory that water was brought to an initially dry Earth by far-reaching comets or asteroids.`;

  const document = {
    content: text2,
    type: 'PLAIN_TEXT',
  };

  // Detects the sentiment of the text
  const [result] = await client.analyzeSentiment({ document: document });
  const sentiment = result.documentSentiment;
  const entity = await client.analyzeEntities({ document: document });
  const entities = entity[0].entities;

  util.mkdirSync('test-results/nl');

  entities.forEach((el, val = 1) => {
    fs.writeFile(
      `test-results/nl/index-${val}.json`,
      JSON.stringify(el),
      () => {}
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
