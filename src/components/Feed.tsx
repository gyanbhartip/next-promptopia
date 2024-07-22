"use client";

import { type ChangeEvent, useEffect, useState } from "react";
import PromptCardList from "./PromptCardList";

type Props = unknown;

const Feed = (props: Props) => {
  const [searchText, setSearchText] = useState("");
  const [posts, setPosts] = useState([]);

  const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {};

  useEffect(() => {
    const fetchPrompts = async () => {
      try {
        const response = await fetch("/api/prompt");

        const data = await response.json();

        setPosts(data);
      } catch (error) {
        console.error("Error fetching prompts", error);
      }
    };
    fetchPrompts();
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

      <PromptCardList data={posts} handleTagClick={() => {}} />
    </section>
  );
};

export default Feed;
