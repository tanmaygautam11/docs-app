import { NextAuthOptions } from "next-auth"
import GoogleProvider from "next-auth/providers/google"
import { MongoDBAdapter } from "@next-auth/mongodb-adapter"
import clientPromise from "./mongodb"

export const authOptions: NextAuthOptions = {

  adapter: MongoDBAdapter(clientPromise),

  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string
    })
  ],

  session: {
    strategy: "database"
  },

  callbacks: {

    async session({ session, user }) {

      if (session.user) {
        session.user.id = user.id
      }

      return session
    }

  },

  secret: process.env.NEXTAUTH_SECRET

}