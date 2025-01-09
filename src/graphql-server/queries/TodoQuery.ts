import { idArg, list, nonNull, type ObjectDefinitionBlock } from 'nexus/dist/core'

export const TodosQuery = (t: ObjectDefinitionBlock<'Query'>) => {
  t.nonNull.field('todos', {
    type: list(nonNull('Todo')),
    resolve: async (_, __, ctx) => {
      const todos = await ctx.prisma.todo.findMany({
        orderBy: {
          updatedAt: 'desc',
        },
      })

      return todos
    },
  })
}
