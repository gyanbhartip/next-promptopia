import type { Post } from "_/types";
import type { FC } from "react";
import PromptCard from "./PromptCard";

type Props = {
  name: string;
  desc: string;
  data: Array<Post>;
  handleEdit: (post: Post) => void;
  handleDelete: (post: Post) => Promise<void>;
};

const Profile: FC<Props> = ({
  name,
  desc,
  data = [],
  handleEdit,
  handleDelete,
}) => {
  return (
    <section className="w-full">
      <h1 className="head_text text-left">
        <span className="blue_gradient">{name} Profile</span>
      </h1>
      <p className="desc text-left">{desc}</p>

      <div className="prompt_layout mt-10">
        {data?.map((post) => (
          <PromptCard
            post={post}
            key={post._id}
            handleEdit={() => handleEdit?.(post)}
            handleDelete={() => handleDelete?.(post)}
          />
        ))}
      </div>
    </section>
  );
};

export default Profile;
