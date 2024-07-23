export type Post = {
  _id: string;
  creator: {
    _id: string;
    email: string;
    username: string;
    image: string;
    __v: number;
  };
  prompt: string;
  tag: string;
  __v: number;
};

export type PostData = Omit<Post, "creator" | "__v" | "_id">;
