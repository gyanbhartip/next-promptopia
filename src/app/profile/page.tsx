"use client";

import Profile from "_/components/Profile";
import type { Post } from "_/types";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const MyProfile = () => {
  const { data: session } = useSession();
  const router = useRouter();

  const [posts, setPosts] = useState<Array<Post>>([]);

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
      try {
        const response = await fetch(`/api/users/${id}/posts`);

        const data = (await response.json()) as Array<Post>;

        setPosts(data);
      } catch (error) {
        console.error("Error fetching prompts", error);
      }
    };
    if (session?.user?.id) {
      fetchPrompts(session.user.id).catch((error) =>
        console.error("Error fetching prompts", error),
      );
    }
  }, [session?.user?.id]);

  return (
    <Profile
      name="My"
      desc="Welcome to your personalized profile"
      data={posts}
      handleEdit={handleEdit}
      handleDelete={handleDelete}
    />
  );
};

export default MyProfile;
