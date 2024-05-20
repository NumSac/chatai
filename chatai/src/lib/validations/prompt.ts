import * as z from "zod"

export const promptSchema = z.object({
    input: z.string(),
})
