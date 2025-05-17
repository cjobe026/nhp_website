const functions = require('firebase-functions');
const next = require('next');


// Set the environment to development or production
const dev = process.env.NODE_ENV !== 'production';

// Initialize the Next.js app
const app = next({ dev });
const handle = app.getRequestHandler();

// Prepare the Next.js app for SSR and create the function
exports.nextApp = functions.https.onRequest((req, res) => {
  app.prepare().then(() => {
    return handle(req, res);  // Handles each request via Next.js SSR
  }).catch((err) => {
    console.error("Error during SSR:", err);
    res.status(500).send("Internal Server Error");
  });
});
