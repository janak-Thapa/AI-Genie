import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { userId } = auth();
    if (!userId) {
      return NextResponse.json({ error: "User not authenticated" }, { status: 401 });
    }

    const { title, description, templateUsed } = await req.json();

    const createNewOutput = await db.aIOutput.create({
      data: {
        userId,
        title,
        description,
        templateUsed,
      },
    });

    revalidatePath("/");

    return NextResponse.json(createNewOutput, { status: 200 });

  } catch (error) {
    console.error("Error creating new output:", error);
    return NextResponse.json({ error: "New Output generation error" }, { status: 500 });
  }
}
