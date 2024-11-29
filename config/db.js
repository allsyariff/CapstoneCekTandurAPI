const admin = require("firebase-admin");
// const serviceAccount = require("../ServiceAccount_Firebase.json");
require('dotenv').config()

const serviceAccount = JSON.parse(
  Buffer.from(process.env.FIREBASE_SERVICE_ACCOUNT_KEY, 'base64').toString('utf-8')
)

if (!admin.apps.length){
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: process.env.URLDATABASE,
  });
}


const db = admin.firestore();
module.exports = { admin, db };