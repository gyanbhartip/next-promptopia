import Prompt from "_/models/prompt";
import { connectToDB } from "_/utils/database";
import { NextResponse } from "next/server";

export const GET = async () => {
  try {
    await connectToDB();

    const prompts = await Prompt.find({}).populate("creator");

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
