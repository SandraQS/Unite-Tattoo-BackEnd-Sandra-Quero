import { model, Model, Schema /* Types */, Types } from "mongoose";
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
    default:
      "https://logiabarcelona.com/wp-content/uploads/2019/05/tatuaje_espalda_color_flor_cara_mujer_logia_barcelona_lincoln_lima.jpg",
  },
  collectionWork: {
    type: Types.ObjectId,
    ref: "Collection",
    required: true,
  },
});

const workModel: Model<Work> = model("Work", workSchema, "works");

export default workModel;
