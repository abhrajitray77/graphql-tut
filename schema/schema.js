const { projects, clients } = require("../sampleData");

//Mongoose Models

const Project = require("../server/models/Project");
const Client = require("../server/models/Client");

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
      client: {
        type: ClientType,
        resolve(parent, args) {
            return clients.findById(parent.clientId)

        }
      }
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
            return Project.find();
        }
    },
    project: {
      type: ProjectType,
      //to know which client to return
      args: { id: { type: GraphQLID } },
      //where we'll have our return
      resolve(parent, args) {
        //code to get data from db/other source using this higher order function
        return Project.findById(args.id);
      },
    },
    clients: {
        type: new GraphQLList(ClientType),
        resolve(parent, args) {
            return Client.find();
        }
    },
    client: {
      type: ClientType,
      //to know which client to return
      args: { id: { type: GraphQLID } },
      //where we'll have our return
      resolve(parent, args) {
        //code to get data from db/other source using this higher order function
        return Client.findById(args.id);
      },
    },
  },
});

module.exports = new GraphQLSchema({
  query: RootQuery,
});
