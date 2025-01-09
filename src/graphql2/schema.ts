import { objectType, queryType, makeSchema } from 'nexus'
import path from 'path'
import { nexusPrisma } from 'nexus-plugin-prisma'
const Query = queryType({
  definition(t) {
    t.string('hello', { resolve: () => 'hello world' })
  },
})

const User = objectType({
  name: 'User',
  definition(t) {
    t.model.name()
    t.model.id()
  },
})

export const schema = makeSchema({
  types: [Query, User],
  plugins: [nexusPrisma({ experimentalCRUD: true })],
  outputs: {
    typegen: path.join(process.cwd(), 'generated', 'nexus-typegen.ts'),
    schema: path.join(process.cwd(), 'generated', 'schema.graphql'),
  },
  contextType: {
    module: path.join(process.cwd(), 'graphql', 'context.ts'),
    export: 'Context',
  },
  sourceTypes: {
    modules: [
      {
        module: '@prisma/client',
        alias: 'prisma',
      },
    ],
  },
})
