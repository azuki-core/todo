import { booleanArg, idArg, nonNull, nullable } from 'nexus'
import type { ObjectDefinitionBlock } from 'nexus/dist/core'
import { title } from 'process'

export const updateTodoMutation = (t: ObjectDefinitionBlock<'Mutation'>) => {
  t.nullable.field('updateTodo', {
    type: nullable('Todo'),
    args: {
      id: nonNull(idArg()),
      done: nonNull(booleanArg()),
    },
    resolve: async (_, arguments_, ctx) => {
      const todo = await ctx.todo.update({
        where: {
          id: arguments_.id,
        },
        data: {
          done: arguments_.done,
        },
      })

      return todo
    },
  })
}
