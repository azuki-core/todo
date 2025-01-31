import { arg, idArg, nonNull, nullable, stringArg } from 'nexus'
import type { ObjectDefinitionBlock } from 'nexus/dist/core'

export const createTodoMutation = (t: ObjectDefinitionBlock<'Mutation'>) => {
  t.nullable.field('createTodo', {
    type: nullable('Todo'),
    args: {
      title: nonNull(stringArg()),
    },
    resolve: async (_, arguments_, ctx) => {
      const todo = await ctx.prisma.todo.create({
        data: {
          title: arguments_.title,
          done: false,
        },
      })

      return todo
    },
  })
}
