import mongoose from "mongoose"
const Schema = mongoose.Schema
const EventSchema = new Schema({
    title: {
        type: String
    },
    category: {
        type: String
    },
    description: {
        type: String
    },
    // Venue: { type: String },
    hostedBy: {
        type: String
    },
    hostPhotoURL: {
        type: String
    }

}, { timestamps: true })

export default mongoose.model("event", EventSchema)