import GoogleProvider from 'next-auth/providers/google';
import CredentialsProvider from 'next-auth/providers/credentials';
import { UserModel } from './models.js';
import { isValidEmail } from './utils.js';

export const authOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    CredentialsProvider({
      name: 'credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' }
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null;
        }

        if (!isValidEmail(credentials.email)) {
          return null;
        }

        // For demo purposes, we'll accept any email/password combination
        // In production, you would verify against a hashed password in the database
        try {
          let user = await UserModel.findByEmail(credentials.email);
          
          if (!user) {
            // Create new user if doesn't exist (for demo purposes)
            user = await UserModel.create({
              email: credentials.email,
              name: credentials.email.split('@')[0], // Use email prefix as name
            });
          }

          return {
            id: user.id,
            email: user.email,
            name: user.name,
          };
        } catch (error) {
          console.error('Auth error:', error);
          return null;
        }
      }
    })
  ],
  callbacks: {
    async signIn({ user, account, profile }) {
      if (account.provider === 'google') {
        try {
          // Check if user exists in database
          let dbUser = await UserModel.findByEmail(user.email);
          
          if (!dbUser) {
            // Create new user from Google profile
            dbUser = await UserModel.create({
              email: user.email,
              name: user.name,
              image: user.image,
            });
          }
          
          // Update user ID to match database ID
          user.id = dbUser.id;
          return true;
        } catch (error) {
          console.error('Google sign-in error:', error);
          return false;
        }
      }
      return true;
    },
    async jwt({ token, user, account }) {
      // Persist the OAuth access_token and user id to the token right after signin
      if (account && user) {
        token.id = user.id;
      }
      return token;
    },
    async session({ session, token }) {
      // Send properties to the client
      if (token) {
        session.user.id = token.id;
      }
      return session;
    },
  },
  pages: {
    signIn: '/login',
  },
  session: {
    strategy: 'jwt',
  },
  secret: process.env.NEXTAUTH_SECRET,
};