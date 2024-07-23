import type { Post } from "_/types";
import type { FC } from "react";
import PromptCard from "./PromptCard";

type Props = {
  data: Array<Post>;
  handleTagClick: () => void;
};

const PromptCardList: FC<Props> = ({ data = [], handleTagClick }) => {
  return (
    <div className="prompt_layout mt-16">
      {data.map((prompt) => (
        <PromptCard post={prompt} key={prompt._id} />
      ))}
    </div>
  );
};

export default PromptCardList;
