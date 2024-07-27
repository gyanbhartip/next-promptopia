import type { Post } from "_/types";
import type { FC } from "react";
import PromptCard from "./PromptCard";

type Props = {
  data: Array<Post>;
  handleTagClick: (tag: string) => void;
};

const PromptCardList: FC<Props> = ({ data = [], handleTagClick }) => {
  return (
    <div className="prompt_layout mt-16">
      {data.map((prompt) => (
        <div key={prompt._id} onClick={() => handleTagClick(prompt.tag)}>
          <PromptCard post={prompt} />
        </div>
      ))}
    </div>
  );
};

export default PromptCardList;
