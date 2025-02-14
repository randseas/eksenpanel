"use client";
import React from "react";
import { GoogleOAuthProvider } from "@react-oauth/google";

const GOOGLE_CLIENT_ID = "705051336612-5u70eb9hth9r2sji3j2a4tkkp0e50oam.apps.googleusercontent.com";

export default function AuthLayout({ children }: any) {
  return (
    <>
      <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
        {children}
      </GoogleOAuthProvider>
    </>
  );
}
