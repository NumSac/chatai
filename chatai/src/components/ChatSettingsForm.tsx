"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { Settings } from "@prisma/client";
import { useForm } from "react-hook-form";
import * as z from "zod";

import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "@/components/ui/use-toast";
import { Icons } from "@/components/Icons";
import { chatSettingsSchema } from "@/lib/validations/chatSettings";
import { chatSettings } from "@/config/chatSettings";

interface ChatSettingsFormProps extends React.HTMLAttributes<HTMLFormElement> {
  settings: Pick<Settings, "name" | "profession" | "interests">;
  userId: string;
}

type FormData = z.infer<typeof chatSettingsSchema>;

export function ChatSettingsForm({
  settings,
  userId,
  className,
  ...props
}: ChatSettingsFormProps) {
  const router = useRouter();
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(chatSettingsSchema),
    defaultValues: {
      name: settings?.name || "",
      profession: settings?.profession || "",
      interests: settings?.interests || "",
    },
  });
  const [isSaving, setIsSaving] = React.useState<boolean>(false);

  async function onSubmit(data: FormData) {
    setIsSaving(true);

    const response = await fetch(`/api/ai/${userId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: data.name,
        profession: data.profession,
        interests: data.interests,
      }),
    });

    setIsSaving(false);

    if (!response?.ok) {
      return toast({
        title: "Something went wrong.",
        description: "Your settings were not updated. Please try again.",
        variant: "destructive",
      });
    }

    toast({
      description: "Your settings has been updated.",
    });

    router.refresh();
  }

  return (
    <form
      className={cn(className)}
      onSubmit={handleSubmit(onSubmit)}
      {...props}
    >
      <Card>
        {chatSettings.map((item, index) => (
          <div key={index}>
            <CardHeader>
              <CardTitle className="capitalize">{item.title}</CardTitle>
              <CardDescription>{item.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-1">
                <Label className="sr-only" htmlFor="name">
                  Name
                </Label>
                <Input
                  id={item.htmlName}
                  className="w-[400px]"
                  size={32}
                  {...register(item.htmlName as keyof FormData)}
                />
                {errors?.name && (
                  <p className="px-1 text-xs text-red-600">
                    {errors.name.message}
                  </p>
                )}
              </div>
            </CardContent>
          </div>
        ))}

        <CardFooter>
          <button
            type="submit"
            className={cn(buttonVariants(), className)}
            disabled={isSaving}
          >
            {isSaving && (
              <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
            )}
            <span>Save</span>
          </button>
        </CardFooter>
      </Card>
    </form>
  );
}
