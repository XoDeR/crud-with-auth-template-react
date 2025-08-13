import { useDeletePost, usePosts } from "../hooks/usePosts";

interface PostListProps {
  onEdit: (postId: number) => void
}

const PostList = ({onEdit} : PostListProps) => {
  const { data: posts, isLoading, isError } = usePosts();
  const deleteMutation = useDeletePost();

  if (isLoading) return <div>Loading posts...</div>

  if (isError) return <div>Error fetching posts.</div>

  const handleDelete = (postId: number) => {
    if (window.confirm('Are you sure you want to delete this post?')) {
      deleteMutation.mutate(postId)
    }
  }
  
  return (
    <div>
      <h1>Posts</h1>
      <ul>
        {posts?.map((post) => (
          <li key={post.id}>
            <h3>{post.title}</h3>
            <p>{post.content}</p>
            <button onClick={() => handleDelete(post.id)}
              disabled={deleteMutation.isPending}
              >
                {deleteMutation.isPending ? 'Deleting...' : 'Delete'}
            </button>
            <button onClick={() => onEdit(post.id)}>
              Edit
            </button>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default PostList;