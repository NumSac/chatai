"use client";

import React, { useState, useEffect, ChangeEvent } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { promptSchema } from "@/lib/validations/prompt";
import { z } from "zod";
import { ScrollArea } from "@/components/ui/scroll-area";
import { LangChainChatService } from "@/services/ai/chat";

interface PromptFormProps extends React.HTMLAttributes<HTMLDivElement> {}

interface PromptMessage {
  message: string;
}

export default function CodePrompt({ className, ...props }: PromptFormProps) {
  const [input, setInput] = useState("");
  const [generatedText, setGeneratedText] = useState("");
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);

  const onChangeInputHandler = (event: ChangeEvent<HTMLTextAreaElement>) => {
    setInput(event.target.value);
  };

  const eventSourceHandler = () => {
    const eventSource = new EventSource(
      `${process.env.NEXT_PUBLIC_API_DOMAIN}/ai/chat-streams`
    );

    const listener = ({ data }: { data: string }) => {
      const resp = JSON.parse(data);

      if (resp?.delta?.content) {
        setGeneratedText((prevText) => prevText + resp?.delta?.content || "");
      }
    };
    eventSource.addEventListener("chat.completion.chunk", listener);

    eventSource.onerror = (error) => {
      console.log(error);
      eventSource.removeEventListener("chat.completion.chunk", listener);
      eventSource.close();
    };
  };

  const renderGeneratedAIResponse = () => {
    if (!generatedText) {
      return <p className="text-sm">Empty...</p>;
    }

    return (
      <p className="w-full sm:max-w-md whitespace-pre-wrap">{generatedText}</p>
    );
  };

  const onClickButtonHandler = async () => {
    setIsButtonDisabled(true);
    setGeneratedText("");

    try {
      eventSourceHandler();
      await LangChainChatService(input);
    } catch (error) {
      console.log(error);
    }
    setIsButtonDisabled(false);
  };
  return (
    <div className={`p-4 h-full ${className}`} {...props}>
      <ScrollArea className="h-48 rounded-md border max-w-m">
        {renderGeneratedAIResponse()}
      </ScrollArea>
      <div className="mb-4">
        <Textarea
          placeholder="Enter your text here"
          className="input input-bordered w-full max-w-m"
          value={input}
          rows={6}
          id="input"
          name="input-openai"
          onChange={onChangeInputHandler}
        />
        <Button
          className="btn btn-primary"
          disabled={isButtonDisabled}
          onClick={onClickButtonHandler}
        >
          Submit
        </Button>
      </div>
    </div>
  );
}
