import { model, Model, Schema, Types } from "mongoose";
import Work from "../../interfaces/models/works";

const workSchema: Schema = new Schema({
  tittle: {
    type: String,
    required: true,
  },
  tattooArtist: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  tattooStyles: {
    type: String,
    required: true,
  },
  likes: {
    type: Number,
    default: 0,
  },
  image: {
    type: String,
    required: true,
  },
  collection: {
    type: [Types.ObjectId],
    ref: "Collection",
    default: [],
  },
});

const WorkModel: Model<Work> = model("Work", workSchema, "works");

export default WorkModel;
