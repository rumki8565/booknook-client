import { betterAuth } from "better-auth";
import { mongodbAdapter } from "better-auth/adapters/mongodb";
import { nextCookies } from "better-auth/next-js";
import { MongoClient } from "mongodb";

const uri: string | undefined = process.env.MONGODB_URI;
if (!uri) {
  throw new Error("MONGODB_URI is missing in .env.local");
}

// Reuse one client while the dev server reloads files
const globalForMongo = globalThis as unknown as { mongoClient?: MongoClient };
const client: MongoClient = globalForMongo.mongoClient ?? new MongoClient(uri);
if (process.env.NODE_ENV !== "production") {
  globalForMongo.mongoClient = client;
}

export const auth = betterAuth({
  database: mongodbAdapter(client.db("booknook")),
  emailAndPassword: {
    enabled: true,
    minPasswordLength: 6,
    autoSignIn: false, // after registering, the user goes to the Login page
  },
  socialProviders: {
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    },
  },
  plugins: [nextCookies()],
});
