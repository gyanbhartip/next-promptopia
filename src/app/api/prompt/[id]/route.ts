import Prompt from "_/models/prompt";
import type { PostData } from "_/types";
import { connectToDB } from "_/utils/database";
import { type NextRequest, NextResponse } from "next/server";

type Params = {
  id: string;
};
export const GET = async (
  request: NextRequest,
  context: { params: Params },
) => {
  try {
    await connectToDB();

    const prompts = await Prompt.findById(context.params.id).populate(
      "creator",
    );

    if (!prompts) {
      return NextResponse.json({ error: "Prompt not found" }, { status: 404 });
    }

    return NextResponse.json(prompts, {
      status: 200,
    });
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : error },
      { status: 500 },
    );
  }
};

export const PATCH = async (
  request: NextRequest,
  context: { params: Params },
) => {
  const { prompt, tag } = (await request.json()) as PostData;
  try {
    await connectToDB();
    const existingPrompt = await Prompt.findById(context.params.id);

    if (!existingPrompt) {
      return NextResponse.json({ error: "Prompt not found" }, { status: 404 });
    }

    existingPrompt.prompt = prompt;
    existingPrompt.tag = tag;

    await existingPrompt.save();

    return NextResponse.json(existingPrompt, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : error },
      { status: 500 },
    );
  }
};

export const DELETE = async (
  request: NextRequest,
  context: { params: Params },
) => {
  try {
    await connectToDB();

    await Prompt.findByIdAndDelete(context.params.id);

    return NextResponse.json({ message: "Prompt deleted" }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : error },
      { status: 500 },
    );
  }
};
