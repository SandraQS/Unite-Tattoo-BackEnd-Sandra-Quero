import { model, Model, Schema } from "mongoose";

interface PersonalDataTattooArtist {
  name: string;
  surname1: string;
  surname2: string;
}

interface UserDataTattooArtist {
  userName: string;
  password: string;
  confirmPassword: string;
  email: string;
}

interface ProfessionalDataTattooArtist {
  studioName: string;
  professionalName: string;
  phone: number;
  contactEmail: string;
  openingHours: string;
  direction: string;
  tattooStyles: Array<string>;
  colaboration: boolean;
}

interface TattooArtist {
  personalDataTattoArtist: PersonalDataTattooArtist;
  userDataTattoArtist: UserDataTattooArtist;
  professionalDataTattoArtist: ProfessionalDataTattooArtist;
  collections: Array<string>;
  appointmentSchedule: Array<string>;
}

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
    type: Array,
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
