"use client";

import { type ChangeEvent, useEffect, useState } from "react";
import PromptCardList from "./PromptCardList";
import type { Post } from "_/types";

const Feed = () => {
  const [searchText, setSearchText] = useState<string>("");
  const [posts, setPosts] = useState<Array<Post>>([]);
  const [filteredPosts, setFilteredPosts] = useState<Array<Post>>(posts);

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
          setFilteredPosts(data);
        }
      } catch (error) {
        console.error("Error fetching prompts", error);
      }
    };
    fetchPrompts().catch((error) =>
      console.error("Error fetching prompts", error),
    );
  }, []);

  useEffect(() => {
    setFilteredPosts(() => {
      if (searchText.length > 0) {
        return searchText
          .toLowerCase()
          .split(" ")
          .reduce((acc, curr) => {
            return acc.filter((post) => {
              return (
                post.tag.toLowerCase().indexOf(curr.toLowerCase()) !== -1 ||
                post.creator.username
                  .toLowerCase()
                  .indexOf(curr.toLowerCase()) !== -1 ||
                post.prompt.toLowerCase().indexOf(curr.toLowerCase()) !== -1
              );
            });
          }, posts);
      }
      return posts;
    });
  }, [posts, searchText]);

  return (
    <section className="feed">
      <form className="relative w-full text-center">
        <input
          className="search_input peer"
          onChange={handleSearchChange}
          placeholder="Search for a tag or username etc."
          type="text"
          value={searchText}
        />
      </form>

      <PromptCardList data={filteredPosts} handleTagClick={handleTagClick} />
    </section>
  );
};

export default Feed;
