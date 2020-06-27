const functions = require('firebase-functions');
const adminone = require('firebase-admin');


adminone.initializeApp();
const json2csv = require("json2csv").parse;
exports.csvJsonReport = functions.https.onRequest((request, response) => {


    var date = new Date()
  const db = adminone.firestore();
  const ordersRef = db.collection('fitnessonbroughton').doc('weights').collection('peoplecount')
  return ordersRef.get()
    .then((querySnapshot) => {
      const orders = [];

      querySnapshot.forEach(doc => {
        const order = doc.data();
        orders.push(order);
      });
      const csv = json2csv(orders);
      response.setHeader(
        "Content-disposition",
        "attachment; filename=Report.csv"
      );
      response.set("Content-Type", "text/csv");
      response.status(200).send(csv)
      return null
    }).catch((err) => {
      console.log(err);
    });

});