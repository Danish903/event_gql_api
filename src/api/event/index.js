import eventModel from "./event_model";
import eventResolver from "./event.resolver";
import { loadGQLFile } from "../../utils/gqlLoader";

export default {
    model: eventModel,
    resolvers: eventResolver,
    typeDefs: loadGQLFile("event/event.graphql")
}