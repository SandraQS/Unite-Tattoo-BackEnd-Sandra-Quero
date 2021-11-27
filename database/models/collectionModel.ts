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
    default:
      "https://logiabarcelona.com/wp-content/uploads/2019/05/tatuaje_espalda_color_flor_cara_mujer_logia_barcelona_lincoln_lima.jpg",
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
