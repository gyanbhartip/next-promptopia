import mongoose, { models, Schema } from "mongoose";

type Prompt = {
  creator?: Record<string, unknown>;
  prompt: string;
  tag: string;
};

const PromptSchema = new Schema({
  creator: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  prompt: {
    type: String,
    required: [true, "Prompt is required"],
  },
  tag: {
    type: String,
    required: [true, "Tag is required"],
  },
});

const Prompt =
  (models.Prompt as mongoose.Model<Prompt>) ||
  mongoose.model("Prompt", PromptSchema);

export default Prompt;
