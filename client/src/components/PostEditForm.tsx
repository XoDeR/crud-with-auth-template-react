import { useForm, type SubmitHandler } from "react-hook-form";
import { usePost, useUpdatePost } from "../hooks/usePosts";
import { useEffect } from "react";
import type { Post } from "../types";

interface PostEditFormProps {
  postId: number;
  onSuccess: () => void;
}

const PostEditForm = ({postId, onSuccess}: PostEditFormProps) => {
  const { data: postToEdit, isLoading: isFetchingPost } = usePost(postId);
  const updateMutation = useUpdatePost();

  const { register, handleSubmit, reset } = useForm<Post>({
    defaultValues: {
      title: '',
      content: '',
    }
  })

  // to populate the form fields when editing
  useEffect(() => {
    if (postToEdit) {
      reset(postToEdit);
    }
  }, [postToEdit, reset])

  const onSubmit: SubmitHandler<Post> = (data) => {
    updateMutation.mutate({...data, id: postId}, {
      onSuccess: onSuccess,
    })
  }

  const isLoading = updateMutation.isPending || isFetchingPost;
  
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <h2>Edit Post</h2>
      <label>
        Title:
        <input  {...register('title', { required: true })} disabled={isLoading}/>
      </label>
      <label>
        Content:
        <textarea {...register('content', { required: true })} disabled={isLoading}/>
      </label>
      <button type="submit" disabled={isLoading}>
        {isLoading ? 'Saving...' : 'Save Post'}
      </button>
      {updateMutation.isError && <p>Error updating post: {updateMutation.error.message}</p>}
    </form>
  )
}

export default PostEditForm;