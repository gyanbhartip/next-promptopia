"use client";

import Form from "_/components/Form";
import type { PostData } from "_/types";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { type FormEvent, useState } from "react";

const CreatePrompt = () => {
  const { data: session } = useSession();
  const router = useRouter();

  const [submitting, setSubmitting] = useState<boolean>(false);
  const [post, setPost] = useState<PostData>({
    prompt: "",
    tag: "",
  });

  const createPrompt = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      if (typeof session?.user?.id === "string") {
        const response = await fetch("/api/prompt/new", {
          method: "POST",
          body: JSON.stringify({
            prompt: post.prompt,
            tag: post.tag,
            userId: session.user.id,
          }),
        });

        if (response.ok) {
          setPost({ prompt: "", tag: "" });
          router.push("/");
        }
      }
    } catch (error) {
      console.error("Error occurred while creating prompt", error);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Form
      type={"Create"}
      post={post}
      setPost={setPost}
      submitting={submitting}
      handleSubmit={createPrompt}
    />
  );
};

export default CreatePrompt;
