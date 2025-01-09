// import { gql } from 'apollo-server-micro'

// export const typeDefs = gql`
//   type Task {
//     id: Int
//     title: String
//     done: Boolean
//   }

//   type Query {
//     tasks: [Task]!
//   }
// `
import path from 'node:path'

import { makeSchema } from 'nexus'
import { DateTimeScalar } from './scalars/DateTimeScalar'
import { Todo } from './types/Todo'

export const schema = makeSchema({
  types: [Todo, DateTimeScalar],
  outputs: {
    // eslint-disable-next-line unicorn/prefer-module
    schema: path.join(__dirname, '../generated/schema.graphql'),
    // eslint-disable-next-line unicorn/prefer-module
    typegen: path.join(__dirname, '../generated/nexus.ts'),
  },
  // contextType: {
  //   export: 'Context',
  //   module: join(process.cwd(), 'graphql', 'context.ts'),
  // },
  contextType: {
    // eslint-disable-next-line unicorn/prefer-module
    // module: require.resolve('./context'),
    // export: 'Context',
  },
  sourceTypes: {
    modules: [],
  },
})
