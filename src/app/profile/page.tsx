"use client";

import Profile from "_/components/Profile";
import type { Post } from "_/types";
import { useSession } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

const MyProfile = () => {
  const { data: session } = useSession();
  const router = useRouter();
  const searchParams = useSearchParams();
  const userId = searchParams.get("id");
  const userName = searchParams.get("name");

  const [posts, setPosts] = useState<Array<Post>>([]);

  const isLoggedInUser = session?.user?.id === userId;

  const handleEdit = (post: Post) => {
    router.push(`/update-prompt?id=${post._id}`);
  };

  const handleDelete = async (post: Post) => {
    const hasConfirmed = confirm(
      "Are you sure you want to delete this prompt?",
    );

    if (hasConfirmed) {
      try {
        const response = await fetch(`/api/prompt/${post._id.toString()}`, {
          method: "DELETE",
        });

        if (response.ok) {
          const updatedPosts = posts.filter((p) => p._id !== post._id);
          setPosts(updatedPosts);
        }
      } catch (error) {
        console.error("Error deleting prompt", error);
      }
    }
  };

  useEffect(() => {
    const fetchPrompts = async (id: string) => {
      console.log("id: ", id);
      try {
        const response = await fetch(`/api/users/${id}/posts`);

        const data = (await response.json()) as Array<Post>;

        setPosts(data);
      } catch (error) {
        console.error("Error fetching prompts", error);
      }
    };
    if (userId) {
      fetchPrompts(userId).catch((error) =>
        console.error("Error fetching prompts", error),
      );
    }
  }, [userId]);

  return (
    <Profile
      name={isLoggedInUser ? "My" : `${userName}'s`}
      desc={`Welcome to ${isLoggedInUser ? "your" : `${userName}'s`} personalized profile page. Share your exceptional prompts and inspire others with the power of your imagination`}
      data={posts}
      handleEdit={handleEdit}
      handleDelete={handleDelete}
    />
  );
};

export default MyProfile;
