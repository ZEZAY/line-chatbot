import { AccessTokenRepository } from '../../domain/access-token/access-token-repository';
import { MongoClient, Db } from 'mongodb';

import Container from 'typedi';

export async function connectToDatabase(database_uri: string, database_name: string) {
  const client: MongoClient = new MongoClient(database_uri);
  await client.connect();

  const db: Db = client.db(database_name);
  Container.set(Db, db);
  Container.set(AccessTokenRepository, new AccessTokenRepository(db.collection('access-token')));
}
