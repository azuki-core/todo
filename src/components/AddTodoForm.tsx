import { useState } from 'react'
import { useMutation } from '@apollo/client'
import { CreateTodoDocument } from '@/generated/apollo'
const AddTodoForm = () => {
  const [title, setTitle] = useState('')
  const [createTodo, { data, loading, error }] = useMutation(CreateTodoDocument)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      await createTodo({ variables: { title } })
      setTitle('') // Clear the input field
    } catch (err) {
      console.error(err)
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Enter todo title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
      />
      <button type="submit" disabled={loading}>
        {loading ? 'Adding...' : 'Add Todo'}
      </button>
      {error && <p>Error: {error.message}</p>}
      {data && <p>Todo added: {data.createTodo?.title}</p>}
    </form>
  )
}

export default AddTodoForm
