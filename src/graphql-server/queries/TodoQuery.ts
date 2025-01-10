import { idArg, list, nonNull, type ObjectDefinitionBlock } from 'nexus/dist/core'

export const TodosQuery = (t: ObjectDefinitionBlock<'Query'>) => {
  t.nonNull.field('todos', {
    type: list(nonNull('Todo')),
    resolve: async (_, __, ctx) => {
      console.log('TodosQuery', ctx)
      console.log('TodosQuery2', ctx.prisma)
      console.log('TodosQuery3', ctx.prisma.todo)
      const todos = await ctx.prisma.todo.findMany({
        orderBy: {
          updatedAt: 'desc',
        },
      })

      return todos
    },
  })
}
