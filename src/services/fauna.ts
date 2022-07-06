import { Client } from "faunadb";

export const client = new Client({
  secret: process.env.FAUNA_SECRET_KEY as string,
});
