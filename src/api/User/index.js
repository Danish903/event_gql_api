import userModel from "./UserModel";
import userResolver from "./resolver";
import { loadGQLFile } from "../../utils/gqlLoader";

export default {
    model: userModel,
    resolvers: userResolver,
    typeDefs: loadGQLFile("User/User.graphql")
}