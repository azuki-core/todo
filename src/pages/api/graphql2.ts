import { ApolloServer } from 'apollo-server-micro'

// これはあとで作ります
import { schema } from '../../graphql2/schema'
import { createContext } from './../../graphql2/context'
import Cors from 'micro-cors'
const cors = Cors()

const apolloServer = new ApolloServer({
  context: createContext,
  schema,
  //   tracing: process.env.NODE_ENV === 'development',
})

// export const config = {
//   api: {
//     bodyParser: false,
//   },
// }
const startServer = apolloServer.start()
export default cors(async function handler(req, res) {
  if (req.method === 'OPTIONS') {
    res.end()
    return false
  }
  await startServer
  await apolloServer.createHandler({
    path: '/api/graphql2',
  })(req, res)
})

export const config = {
  api: {
    bodyParser: false,
  },
}
