import { idArg, nonNull, nullable } from 'nexus'
import type { ObjectDefinitionBlock } from 'nexus/dist/core'

export const deleteTodoMutation = (t: ObjectDefinitionBlock<'Mutation'>) => {
  t.nullable.field('deleteTodo', {
    type: nullable('Todo'),
    args: {
      id: nonNull(idArg()),
    },
    resolve: async (_, arguments_, ctx) => {
      const record = await ctx.todo.findUnique({
        where: {
          id: arguments_.id,
        },
      })
      if (record === null) {
        throw new Error(`レコードが見つかりません。id: ${arguments_.id}`)
      }

      const res = await ctx.favorite.delete({
        where: {
          id: arguments_.id,
        },
      })
      return res
    },
  })
}
