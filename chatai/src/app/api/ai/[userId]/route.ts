import { authOptions } from "@/lib/auth";
import { db } from "@/lib/db";
import { chatSettingsSchema } from "@/lib/validations/chatSettings";
import { userNameSchema } from "@/lib/validations/user";
import { getServerSession } from "next-auth";
import { z } from "zod";

const routeContextSchema = z.object({
  params: z.object({
    userId: z.string(),
  }),
});

export async function PATCH(
  req: Request,
  context: z.infer<typeof routeContextSchema>
) {
  try {
    const { params } = routeContextSchema.parse(context);

    const session = await getServerSession(authOptions);
    if (!session?.user || params.userId !== session?.user.id) {
      return new Response(null, { status: 403 });
    }

    const body = await req.json();
    const payload = chatSettingsSchema.parse(body);

    await db.settings.upsert({
      where: {
        userId: session.user.id,
      },
      update: {
        name: payload.name,
        profession: payload.profession,
        interests: payload.interests,
      },
      create: {
        userId: session.user.id,
        name: payload.name,
        profession: payload.profession,
        interests: payload.interests,
      },
    });

    return new Response(null, { status: 200 });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return new Response(JSON.stringify(error.issues), { status: 422 });
    }

    return new Response(null, { status: 500 });
  }
}
