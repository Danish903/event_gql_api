

export default {
    Query: {
        getEvents: async (_, args, ctx, info) => {
            return await ctx.models.Event.find({})
        }
    },
    Mutation: {
        createEvent: async (_, { input }, ctx) => {
            const event = await ctx.models.Event.create(input);

            return event;
        }
    }
}