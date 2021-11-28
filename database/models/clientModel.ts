import { model, Model, Schema } from "mongoose";
import Client from "../../interfaces/models/clients";

const clientSchema: Schema = new Schema({
  personalDataClient: {
    name: {
      type: String,
      required: true,
    },
    surname1: {
      type: String,
      required: true,
    },
    surname2: {
      type: String,
      required: true,
    },
  },

  userDataClient: {
    userName: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    phone: {
      type: Number,
      required: false,
    },
  },

  interestDataClient: {
    tattooStyles: {
      type: Array,
      default: [],
    },
    suggestions: {
      type: Boolean,
      default: false,
    },
  },

  profileImage: {
    type: String,
    required: true,
  },

  favoriteTattoos: {
    type: Array,
    default: [],
  },

  favoriteTattooArtists: {
    type: Array,
    default: [],
  },
});

const clientModel: Model<Client> = model("Client", clientSchema, "clients");

export default clientModel;
