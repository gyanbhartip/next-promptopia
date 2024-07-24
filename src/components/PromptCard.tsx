"use client";

import type { Post } from "_/types";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { type FC, useState } from "react";

type Props = {
  post: Post;
  handleEdit?: (post: Post) => void;
  handleDelete?: (post: Post) => Promise<void>;
};

const PromptCard: FC<Props> = ({ post, handleEdit, handleDelete }) => {
  const { data: session } = useSession();
  const pathName = usePathname();

  const [copied, setCopied] = useState<string>("");

  const handleCopy = async () => {
    setCopied(post.prompt);
    await navigator.clipboard.writeText(post.prompt);
    setTimeout(() => {
      setCopied("");
    }, 3000);
  };

  const handleTagClick = (tag: string) => {
    console.log(tag);
  };

  const postCreator = post.creator || {
    username: "",
    email: "",
    image: "",
    _id: "",
  };

  return (
    <div className="prompt_card">
      <div className="flex items-start justify-between gap-5">
        <div className="flex flex-1 cursor-pointer items-center justify-start gap-3">
          <Image
            alt="user image"
            className="rounded-full object-contain"
            height={40}
            src={postCreator.image}
            width={40}
          />
          <div className="flex flex-col">
            <h3 className="font-satoshi font-semibold text-gray-900">
              {postCreator.username}
            </h3>
            <p className="font-inter text-sm text-gray-500">
              {postCreator.email}
            </p>
          </div>
        </div>
        <div className="copy_btn" onClick={handleCopy}>
          <Image
            src={
              copied === post.prompt
                ? "/assets/icons/tick.svg"
                : "/assets/icons/copy.svg"
            }
            width={12}
            height={12}
            alt={copied === post.prompt ? "copied" : "copy"}
          />
        </div>
      </div>
      <p className="my-4 font-satoshi text-sm text-gray-500">{post.prompt}</p>
      <p
        className="blue_gradient cursor-pointer font-inter text-sm"
        onClick={() => handleTagClick?.(post.tag)}
      >
        #{post.tag}
      </p>
      {session?.user?.id === postCreator._id && pathName === "/profile" && (
        <div className="flex-center mt-5 gap-4 border-t border-gray-100 pt-3">
          <p
            className="green_gradient cursor-pointer font-inter text-sm"
            onClick={handleEdit}
          >
            Edit
          </p>
          <p
            className="orange_gradient cursor-pointer font-inter text-sm"
            onClick={handleDelete}
          >
            Delete
          </p>
        </div>
      )}
    </div>
  );
};

export default PromptCard;
