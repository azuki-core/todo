import { FetchTodoDocument } from '@/generated/apollo'
import { useQuery } from '@apollo/client'

const TodoList: React.FC = () => {
  const { data, loading, error } = useQuery(FetchTodoDocument)

  if (loading) return <p>Loading...</p>
  if (error) return <p>Error: {error.message}</p>

  return (
    <div>
      {data?.todos.map((todo) => (
        <div>
          {todo.id}:{todo.title}
        </div>
      ))}
    </div>
  )
}

export default TodoList
