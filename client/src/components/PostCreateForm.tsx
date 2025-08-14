import { useForm, type SubmitHandler } from "react-hook-form";
import { useCreatePost } from "../hooks/usePosts";
import type { Post } from "../types";

interface PostCreateFormProps {
  onSuccess: () => void;
}

const PostCreateForm = ({onSuccess}: PostCreateFormProps) => {
  const createMutation = useCreatePost();

  const { register, handleSubmit } = useForm<Post>({
    defaultValues: {
      title: '',
      content: '',
    }
  })

  const onSubmit: SubmitHandler<Post> = (data) => {
    createMutation.mutate(data, {
      onSuccess: onSuccess,
    })
  }

  const isLoading = createMutation.isPending;
  
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <h2>Create Post</h2>
      <label>
        Title:
        <input  {...register('title', { required: true })} disabled={isLoading}/>
      </label>
      <label>
        Content:
        <textarea {...register('content', { required: true })} disabled={isLoading}/>
      </label>
      <button type="submit" disabled={isLoading}>
        {isLoading ? 'Saving...' : 'Create Post'}
      </button>
      {createMutation.isError && <p>Error creating post: {createMutation.error.message}</p>}
    </form>
  )
}

export default PostCreateForm;