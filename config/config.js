const admin = require('firebase-admin');
const serviceAccount = require('./ServiceAccountKey.json'); // Firebase private key

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://backend-capstone.firebaseio.com"
});

// Menambahkan pengaturan ignoreUndefinedProperties
const db = admin.firestore();
db.settings({
    ignoreUndefinedProperties: true // Mengabaikan nilai undefined saat menyimpan data
});

module.exports = { admin, db };
