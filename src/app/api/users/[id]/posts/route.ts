import Prompt from "_/models/prompt";
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

    const prompts = await Prompt.find({
      creator: context.params.id,
    }).populate("creator");

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
