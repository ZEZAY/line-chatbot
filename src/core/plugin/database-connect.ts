import * as mongoDB from 'mongodb';

import Container from 'typedi';

export async function connectToDatabase(database_uri: string, database_name: string, collection_name: string) {
  const client: mongoDB.MongoClient = new mongoDB.MongoClient(database_uri);
  await client.connect();

  const db: mongoDB.Db = client.db(database_name);
  const collection: mongoDB.Collection = db.collection(collection_name);

  Container.set(mongoDB.Db, db);
  Container.set(mongoDB.Collection, collection);
}
