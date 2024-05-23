const { Firestore } = require('@google-cloud/firestore');

async function getData() {
    const firestore = new Firestore();

    return allData = await firestore.collection('predictions').get();
}

module.exports = getData;