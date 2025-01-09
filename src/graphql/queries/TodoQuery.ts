import { idArg, list, nonNull, type ObjectDefinitionBlock } from 'nexus/dist/core'

export const TodosQuery = (t: ObjectDefinitionBlock<'Query'>) => {
  t.nonNull.field('todos', {
    type: list(nonNull('Todo')),
    args: {
      organizationId: nonNull(idArg()),
    },
    resolve: async (_, __, ctx) => {
      const todos = await ctx.todos.findMany({
        orderBy: {
          rank: 'updatedAt',
        },
      })

      return todos
    },
  })
}
