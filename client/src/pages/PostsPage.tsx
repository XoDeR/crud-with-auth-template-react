import { useState } from "react";
import PostForm from "../components/PostForm";
import PostList from "../components/PostList";

const PostsPage = () => {
  const [editingPostId, setEditingPostId] = useState<number | undefined>(undefined);
  
  const onEdit = (postId: number) => {
    setEditingPostId(postId)
  }

  return (
    <div>
      <PostForm/>
      <hr />
      <PostList onEdit={onEdit}/>
    </div>
  )
}

export default PostsPage;