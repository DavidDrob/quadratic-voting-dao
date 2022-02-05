import * as Realm from "realm-web";

export default async function registeredDAOs() {
  const app = new Realm.App({ id: import.meta.env.VITE_SECRET_ID });
  // const credentials = Realm.Credentials.anonymous();
  try {
    // return await app.logIn(credentials);
    return await app.currentUser
      .mongoClient("mongodb-atlas")
      .db("DAOs")
      .collection("registeredDAOs");
  } catch (err) {
    console.error("Failed to log in", err);
  }
}
