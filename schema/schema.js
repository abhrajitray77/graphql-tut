const { projects, clients } = require("../sampleData");

const {
  GrapghQlObjectType,
  GraphQLID,
  GraphQLString,
  GraphQLObjectType,
  GraphQLSchema,
  GraphQLList,
} = require("graphql");

//project type
const ProjectType = new GraphQLObjectType({
    name: "Project",
    fields: () => ({
      id: { type: GraphQLID },
      name: { type: GraphQLString },
      description: { type: GraphQLString },
      status: { type: GraphQLString },
    }),
  });
//client type

const ClientType = new GraphQLObjectType({
  name: "Client",
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    email: { type: GraphQLString },
    phone: { type: GraphQLString },
  }),
});

//getting client by id

const RootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  fields: {
    projects: {
        type: new GraphQLList(ProjectType),
        resolve(parent, args) {
            return projects
        }
    },
    project: {
      type: ProjectType,
      //to know which client to return
      args: { id: { type: GraphQLID } },
      //where we'll have our return
      resolve(parent, args) {
        //code to get data from db/other source using this higher order function
        return projects.find((project) => project.id === args.id);
      },
    },
    clients: {
        type: new GraphQLList(ClientType),
        resolve(parent, args) {
            return clients
        }
    },
    client: {
      type: ClientType,
      //to know which client to return
      args: { id: { type: GraphQLID } },
      //where we'll have our return
      resolve(parent, args) {
        //code to get data from db/other source using this higher order function
        return clients.find((client) => client.id === args.id);
      },
    },
  },
});

module.exports = new GraphQLSchema({
  query: RootQuery,
});
