"use server";

import { signIn, signOut } from "@/auth";
import { AuthError } from "next-auth";

export async function authenticate(_: string | undefined, formData: FormData) {
  try {
    await signIn("credentials", formData);
  } catch (error) {
    if (error instanceof AuthError) {
      if (error.type === "CredentialsSignin") return "Email ou senha inválidos.";
      return "Erro no login.";
    }
    throw error;
  }
}

export async function logout() {
  await signOut({ redirectTo: "/" });
}
