import Prompt from "_/models/prompt";
import { connectToDB } from "_/utils/database";
import { type NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextRequest): Promise<NextResponse> => {
  const { userId, prompt, tag } = (await req.json()) as {
    userId: string;
    prompt: string;
    tag: string;
  };
  try {
    await connectToDB();

    const newPrompt = new Prompt({
      creator: userId,
      prompt,
      tag,
    });
    await newPrompt.save();

    return NextResponse.json(newPrompt, {
      status: 201,
    });
  } catch (error) {
    console.error("Error creating prompt", error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : error },
      { status: 500 },
    );
  }
};
