import type { FC } from "react";
import PromptCard from "./PromptCard";

type Props = {
  data: unknown[];
  handleTagClick: () => void;
};

const PromptCardList: FC<Props> = ({ data = [{}], handleTagClick }) => {
  return (
    <div className="prompt_layout mt-16">
      {data.map((prompt) => (
        <PromptCard post={prompt} key={prompt._id} />
      ))}
    </div>
  );
};

export default PromptCardList;
