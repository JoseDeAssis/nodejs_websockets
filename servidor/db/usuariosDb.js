import 'dotenv/config';
import { usersCollection } from "./dbConnect.js";
import criaHashESalSenha from '../utils/criaHashESalSenha.js';

function createUser({ user, password }){
  const { hashPassword, salPassword } = criaHashESalSenha(password);

  return usersCollection.insertOne({ user, hashPassword, salPassword });
}

function findUser(user) {
  return usersCollection.findOne({ user });
}

export { createUser, findUser };