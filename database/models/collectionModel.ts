import { model, Model, Schema, Types } from "mongoose";

interface Collection {
  tattooStyles: string;
  image: string;
  works: Array<string>;
}

const collectionSchema: Schema = new Schema({
  tattooStyles: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  works: {
    type: [Types.ObjectId],
    ref: "Work",
    default: [],
  },
});

const collectionModel: Model<Collection> = model(
  "Collection",
  collectionSchema,
  "collections"
);

export default collectionModel;