const functions = require('firebase-functions');
const admin = require('firebase-admin');

admin.initializeApp();

const db = admin.firestore();

const createSearchStrings = (memeRecord, memeId) => {
    const { name, tldr } = memeRecord;

    let memeSearchStrings = new Set();

    addStringToSet(name, memeSearchStrings);
    addStringToSet(tldr, memeSearchStrings);

    let nameSplit = name.split(" ");
    for (let i = 1; i < nameSplit.length; i++) {
        addStringToSet(nameSplit[i], memeSearchStrings);
    }

    let tldrSplit = tldr.split(" ");
    for (let i = 1; i < tldrSplit.length; i++) {
        addStringToSet(tldrSplit[i], memeSearchStrings);
    }

    let searchStrings = [...memeSearchStrings];

    return db.collection('memes').doc(memeId).update({
        searchStrings,
    })
        .catch(console.error);
};

const addStringToSet = (string, set) => {
    for (let i = 1; i < string.length + 1; i++) {
        set.add(string.substring(0, i).toLowerCase().replace(/\W/g, ''));
    }
}

module.exports = {
    addMemeSearchStrings: functions.firestore.document('memes/{memeId}')
        .onWrite((change) => {
            const memeId = change.before.id;
            const before = change.before.data();
            const update = change.after.data();
            if (update && (!before || before['tldr'] !== update['tldr'] || before['name'] !== update['name'])) {
                return createSearchStrings(update, memeId);
            } else {
                return 0;
            }
        }),
};