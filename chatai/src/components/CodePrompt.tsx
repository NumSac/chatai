"use client";

import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { promptSchema } from "@/lib/validations/prompt";
import { z } from "zod";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useSocket } from "@/context/SocketContext";
import { WebsocketEvents } from "@/lib/websocket-events.enum";

interface PromptFormProps extends React.HTMLAttributes<HTMLDivElement> {}

interface PromptMessage {
  message: string;
}

type FormData = z.infer<typeof promptSchema>;

export default function CodePrompt({ className, ...props }: PromptFormProps) {
  const { socket } = useSocket();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [promptMessages, setPromptMessages] = useState<PromptMessage[]>([]);
  const [messageId, setMessageId] = useState(0); // To generate unique IDs for each message

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormData>({
    resolver: zodResolver(promptSchema),
  });

  useEffect(() => {
    if ("speechSynthesis" in window) {
      console.log("speechSynthesis supported");
    } else {
      alert("Sorry, your browser doesn't support text to speech!");
    }
    // Listener setup can remain the same or be removed if not needed
    socket?.on(WebsocketEvents.ChatMessageRes, (newMessage: string) => {
      //setPromptMessages((prevMessages) => [...prevMessages, newMessage]);

      var msg = new SpeechSynthesisUtterance();
      console.log(msg);
      msg.text = newMessage;
      window.speechSynthesis.speak(msg);
    });

    return () => {
      socket?.off(WebsocketEvents.ChatMessageRes);
    };
  }, [socket]);

  async function onSubmit(data: FormData) {
    setIsLoading(true);
    const newMessage: PromptMessage = { message: data.input };
    setPromptMessages((prevMessages) => [...prevMessages, newMessage]);
    setMessageId((prevId) => prevId + 1); // Increment the message ID for the next message

    socket!.emit(WebsocketEvents.ChatMessageReq, data.input);

    reset();
    setIsLoading(false);
  }

  return (
    <div className={`p-4 h-full ${className}`} {...props}>
      <ScrollArea className="h-48 rounded-md border max-w-m">
        <div className="p-4">
          {promptMessages.map((msg) => (
            <div key={msg.message} className="mb-2">
              {msg.message}
            </div>
          ))}
        </div>
      </ScrollArea>
      <div className="mb-4">
        <form onSubmit={handleSubmit(onSubmit)}>
          <Textarea
            placeholder="Enter your text here"
            className="input input-bordered w-full max-w-m"
            {...register("input", { required: true })}
          />
          {errors.input && (
            <p className="text-red-500">This field is required</p>
          )}
          <Button className="btn btn-primary" disabled={isLoading}>
            Submit
          </Button>
        </form>
      </div>
    </div>
  );
}
