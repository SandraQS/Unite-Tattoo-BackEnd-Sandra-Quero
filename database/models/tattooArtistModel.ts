import { model, Model, Schema, Types } from "mongoose";
import TattooArtist from "../../interfaces/models/tatooArtist";

const TattooArtistSchema: Schema = new Schema({
  personalDataTattoArtist: {
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

  userDataTattoArtist: {
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
  },

  professionalDataTattooArtist: {
    studioName: {
      type: String,
      required: false,
    },
    professionalName: {
      type: String,
      required: true,
    },
    phone: {
      type: Number,
      required: true,
    },
    contactEmail: {
      type: String,
      required: true,
    },
    openingHours: {
      type: String,
      required: true,
    },
    direction: {
      type: String,
      required: true,
    },
    tattooStyles: {
      type: Array,
      default: [],
    },
    colaboration: {
      type: String,
      required: true,
    },
  },
  collections: {
    type: [Types.ObjectId],
    ref: "Collection",
    default: [],
  },
  appointmentSchedule: {
    type: Array,
    default: [],
  },
});

const TattooArtistModel: Model<TattooArtist> = model(
  "TattooArtist",
  TattooArtistSchema,
  "tattooArtists"
);

export default TattooArtistModel;
