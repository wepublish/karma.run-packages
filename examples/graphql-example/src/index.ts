#!/usr/bin/env node
import {createServer} from 'http'
import {GraphQLSchema, GraphQLObjectType, GraphQLNonNull} from 'graphql'
import graphqlHTTP from 'express-graphql'

import {createRichTextScalar} from '@karma.run/graphql'
import {URL} from 'url'

const GraphQLRichText = createRichTextScalar({
  validation: {
    block: {
      paragraph: null,
      header1: null
    },
    inline: {
      link: (value: any) => {
        return {url: new URL(value.url).toString()}
      }
    },
    marks: {
      strong: null
    }
  }
})

const GraphQLQuery = new GraphQLObjectType({
  name: 'Query',
  fields: {
    richText: {
      type: GraphQLNonNull(GraphQLRichText),
      resolve() {
        return {
          object: 'document',
          nodes: [
            {object: 'block', type: 'paragraph'},
            {object: 'block', type: 'paragraph'},
            {
              object: 'block',
              type: 'paragraph',
              nodes: [
                {
                  object: 'inline',
                  type: 'link',
                  data: {url: 'http://foo.bar'},
                  nodes: [
                    {
                      object: 'text',
                      text: 'Test',
                      marks: [{object: 'mark', type: 'strong'}]
                    }
                  ]
                },
                {
                  object: 'inline',
                  type: 'link',
                  data: {url: 'http://foo.bar'},
                  nodes: [
                    {
                      object: 'text',
                      text: 'Test',
                      marks: [{object: 'mark', type: 'strong'}]
                    }
                  ]
                }
              ]
            }
          ]
        }
      }
    }
  }
})

const GraphQLMutation = new GraphQLObjectType({
  name: 'Mutation',
  fields: {
    createRichText: {
      type: GraphQLNonNull(GraphQLRichText),
      args: {
        richText: {
          type: GraphQLNonNull(GraphQLRichText),
          description: 'RichText to create.'
        }
      },
      resolve(_root, args) {
        return args.richText
      }
    }
  }
})

const schema = new GraphQLSchema({
  query: GraphQLQuery,
  mutation: GraphQLMutation
})

const server = createServer(
  graphqlHTTP({
    schema: schema,
    graphiql: true
  })
)

const port = process.env.PORT ? parseInt(process.env.PORT) : 3012
const address = process.env.ADDRESS ? process.env.ADDRESS : 'localhost'

server.listen(port, address)
console.log(`GraphQL server listening on: http://${address}:${port}`)
