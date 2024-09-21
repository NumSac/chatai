export const LangChainChatService = async (input: string) => {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_DOMAIN}/ai/chat`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
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
