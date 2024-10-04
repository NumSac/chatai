"use server";

import { getCurrentUser } from "@/lib/session";
import { getToken, JWT } from "next-auth/jwt";
import { getSession } from "next-auth/react";
import { headers } from "next/headers";
import { NextRequest } from "next/server";

export const LangChainChatService = async (input: string) => {
  const token = await getCurrentUser();
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_DOMAIN}/ai/chat`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `${token?.token}`,
    },
    body: JSON.stringify({
      // for this example, we only cover for stream API,
      // we can also dyamically handle in the frontend to
      // enable both use cases
      stream: true,
      messages: [{ role: "user", content: input }],
    }),
  });

  return response.json();
};
