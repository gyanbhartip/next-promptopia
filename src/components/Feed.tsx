"use client";

import { type ChangeEvent, useEffect, useState } from "react";
import PromptCardList from "./PromptCardList";
import type { Post } from "_/types";

const Feed = () => {
  const [searchText, setSearchText] = useState("");
  const [posts, setPosts] = useState<Array<Post>>([]);

  const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchText(e.target.value);
  };

  const handleTagClick = (tag: string) => {
    setSearchText(tag);
  };

  useEffect(() => {
    const fetchPrompts = async () => {
      try {
        const response = await fetch("/api/prompt");

        if (response.ok) {
          const data = (await response.json()) as Array<Post>;
          setPosts(data);
        }
      } catch (error) {
        console.error("Error fetching prompts", error);
      }
    };
    fetchPrompts().catch((error) =>
      console.error("Error fetching prompts", error),
    );
  }, []);

  return (
    <section className="feed">
      <form className="relative w-full text-center">
        <input
          className="search_input peer"
          onChange={handleSearchChange}
          placeholder="Search for a tag or username"
          required
          type="text"
          value={searchText}
        />
      </form>

      <PromptCardList data={posts} handleTagClick={handleTagClick} />
    </section>
  );
};

export default Feed;
