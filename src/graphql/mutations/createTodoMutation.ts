import { arg, idArg, nonNull, nullable, stringArg } from 'nexus'
import type { ObjectDefinitionBlock } from 'nexus/dist/core'
import { title } from 'process'

export const createTodoMutation = (t: ObjectDefinitionBlock<'Mutation'>) => {
  t.nullable.field('createTodo', {
    type: nullable('Todo'),
    args: {
      title: nonNull(stringArg()),
    },
    resolve: async (_, arguments_, ctx) => {
      const todo = await ctx.todo.create({
        title,
        done: false,
      })

      return todo
    },
  })
}
