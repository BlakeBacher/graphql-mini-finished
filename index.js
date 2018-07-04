var GraphQLServer = require('graphql-yoga').GraphQLServer;

var typeDefs = `
type Query {
    welcome: String!
    links: [Link!]!
}

type Mutation {
    addLink(url: String!, description: String!): Link!
}

type Link {
    id: ID!
    url: String!
    description: String!
}
`

let articleLinks = [{
    id: 'link-0',
    url: 'www.howtographql.com',
    description: 'A resources to learn graphql. Check out the advanced sections for some more in-depth tutorials.'
}, {
    id: 'link-1',
    url: 'news.ycombinator.com',
    description: 'Hacker news is like reddit that doesn\'t suck.  Focused on tech.  Great place to improvey our chameleon skills.'
}, {
    id: 'link-2',
    url: 'https://www.graphqlhub.com/',
    description: 'Some practice APIs to play around with queries'
}]
var idCount = articleLinks.length;

var resolvers = {
    Query: {
        welcome: () => "Hacker News clone in action!",
        links: () => articleLinks
    },
    Mutation: {
        addLink: (root, args) => {
            var link = {
                id: `link-${idCount++}`,
                description: args.description,
                url: args.url
            }
            articleLinks.push(link);
            return link;
        }
    }
}

var server = new GraphQLServer({
    typeDefs,
    resolvers
})

server.start(() => console.log("Giddyup!"))