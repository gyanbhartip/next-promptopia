import type { PostData } from "_/types";
import Link from "next/link";
import type { Dispatch, FC, FormEventHandler, SetStateAction } from "react";

type Props = {
  type: "Create" | "Edit";
  post: PostData;
  setPost: Dispatch<SetStateAction<PostData>>;
  submitting: boolean;
  handleSubmit: FormEventHandler<HTMLFormElement>;
};

const Form: FC<Props> = ({ type, post, setPost, submitting, handleSubmit }) => {
  return (
    <section className="flex-start w-full max-w-full flex-col">
      <h1 className="head_text text-left">
        <span className="blue_gradient">{`${type} Post`}</span>
      </h1>
      <p className="desc max-w-md text-left">{`${type} and share amazing prompts with the world, and let your imagination run wild with any AI-powered platform`}</p>
      <form
        onSubmit={handleSubmit}
        className="glassmorphism mt-10 flex w-full max-w-2xl flex-col gap-7"
      >
        <label>
          <span className="font-satoshi text-base font-semibold text-gray-700">
            YOUR AI PROMPT
          </span>
          <textarea
            value={post.prompt}
            onChange={(e) => {
              setPost({ ...post, prompt: e.target.value });
            }}
            className="form_textarea"
            placeholder="Type your prompt here..."
            required
          />
        </label>
        <label>
          <span className="font-satoshi text-base font-semibold text-gray-700">
            Tag{" "}
            <span className="font-normal">
              (#product, #webdevelopment, #idea)
            </span>
          </span>
          <input
            type="text"
            value={post.tag}
            onChange={(e) => {
              setPost({ ...post, tag: e.target.value });
            }}
            placeholder="#tag"
            className="form_input"
            required
          />
        </label>
        <div className="flex-end mx-3 mb-5 gap-4">
          <Link href="/" className="text-sm text-gray-500">
            Cancel
          </Link>
          <button
            type="submit"
            disabled={submitting}
            className="rounded-full bg-primary-orange px-5 py-1.5 text-sm text-white"
          >
            {submitting ? `${type}...` : type}
          </button>
        </div>
      </form>
    </section>
  );
};

export default Form;
