import { useState } from "react";
import PostCreateForm from "../components/PostCreateForm";
import PostEditForm from "../components/PostEditForm";
import PostList from "../components/PostList";

const PostsPage = () => {
  const [editingPostId, setEditingPostId] = useState<number | undefined>(undefined);
  
  const onEdit = (postId: number) => {
    setEditingPostId(postId)
  }

  const handleFormSuccess = () => {
    setEditingPostId(undefined);
  }

  return (
    <div>
      <PostCreateForm onSuccess={handleFormSuccess}/>
      {/* <PostEditForm postId={editingPostId} onSuccess={handleFormSuccess}/> */}
      <PostEditForm postId={1} onSuccess={handleFormSuccess}/>
      <hr />
      <PostList onEdit={onEdit}/>
    </div>
  )
}

export default PostsPage;