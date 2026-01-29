import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";

function parseAdminEmails() {
  return (process.env.ADMIN_EMAILS || "")
    .split(",")
    .map((s) => s.trim().toLowerCase())
    .filter(Boolean);
}

export const { handlers, auth, signIn, signOut } = NextAuth({
  // ✅ resolve MissingSecret
  secret: process.env.AUTH_SECRET,

  pages: {
    signIn: "/entrar",
  },

  session: { strategy: "jwt" },

  providers: [
    Credentials({
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Senha", type: "password" },
      },
      async authorize(credentials) {
        const email = String(credentials?.email || "").toLowerCase();
        const password = String(credentials?.password || "");

        const admins = parseAdminEmails();
        const okEmail = admins.includes(email);
        const okPass = password && password === process.env.ADMIN_PASSWORD;

        if (!okEmail || !okPass) return null;

        return { id: "admin", name: "Administrador", email };
      },
    }),
  ],

  callbacks: {
    async jwt({ token, user }) {
      // marca admin no token ao logar
      if (user?.email) {
        const admins = parseAdminEmails();
        token.isAdmin = admins.includes(String(user.email).toLowerCase());
      }
      return token;
    },

    async session({ session, token }) {
      // ✅ sem mutação e sem "(session.user as any)"
      return {
        ...session,
        user: {
          ...session.user,
          isAdmin: !!token.isAdmin,
        },
      };
    },
  },
});
