import * as z from "zod";

export const chatSettingsSchema = z.object({
  name: z.string().max(32),
  profession: z.string(),
  interests: z.string(),
});
