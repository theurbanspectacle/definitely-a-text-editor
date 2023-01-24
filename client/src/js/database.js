import { openDB } from 'idb';
const databaseName = 'date';
const databaseVersion = 1;

const initdb = async () =>
  openDB(databaseName, databaseVersion, {
    upgrade(db) {
      if (db.objectStoreNames.contains(databaseName)) {
        console.log('date database already exists');
        return;
      }
      db.createObjectStore(databaseName, { keyPath: 'id', autoIncrement: true });
      console.log('date database created');
    },
  });

// https://github.com/jakearchibald/idb#transaction-lifetime

// TODO: Add logic to a method that accepts some content and adds it to the database
export const putDb = (content) => {
  openDB(databaseName, databaseVersion).then(database => {
    const transaction = database.transaction(databaseName, 'readwrite');
    const store = transaction.objectStore(databaseName);
    store.put({id: databaseVersion, value: content}).then(() => {}).catch(error => {
      console.error('Put to database store failed', error);
    });
  }).catch(error => {
    console.error('Put to database failed', error);
  });
};

// TODO: Add logic for a method that gets all the content from the database
export const getDb = () => {
  let reject, resolve;
  const returnPromise = new Promise((pResolve, pReject) => {
    resolve = pResolve;
    reject = pReject;
  });

  openDB(databaseName, databaseVersion).then(database => {
    const transaction = database.transaction(databaseName, 'readonly');
    const store = transaction.objectStore(databaseName);
    store.get(databaseVersion).then(results => {
      if (results && typeof results === 'object') {
        resolve(results.value || '');
      } else {
        resolve('');
      }
    }).catch(error => {
      console.error('Get database store returned nothing', error);
      resolve('');
    });
  }).catch(error => {
    console.error('Get database failed', error);
    reject(error);
  });

  return returnPromise;
};

initdb();
