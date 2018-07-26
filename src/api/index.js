import event from "./event";
import { merge } from "lodash"

import User from "./User";

const resolvers = merge({}, event.resolvers, User.resolvers);
const typeDefs = [event.typeDefs, User.typeDefs].join(" ");
export default {
    resolvers,
    typeDefs,
    context: (req) => ({
        ...req,
        models: {
            Event: event.model,
            User: User.model
        }
    })
}