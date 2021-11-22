const { Schema, model } = require("mongoose");

interface PersonalDataTattoArtist {
  name: string;
  surname1: string;
  surname2: string;
}

interface UserDataTattoArtist {
  userName: string;
  password: string;
  confirmPassword: string;
  email: string;
}

interface ProfessionalDataTattoArtist {
  studioName: string;
  professionalName: string;
  phone: number;
  contactEmail: string;
  openingHours: string;
  direction: string;
  tattooStyles: Array<string>;
  colaboration: boolean;
}

interface TattoArtist {
  personalDataTattoArtist: PersonalDataTattoArtist;
  userDataTattoArtist: UserDataTattoArtist;
  professionalDataTattoArtist: ProfessionalDataTattoArtist;
  collections: Array<string>;
  appointmentSchedule: Array<string>;
}

const TattoArtistSchema: TattoArtist = new Schema({
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
    confirmPassword: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
  },
  professionalDataTattoArtist: {
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
    ddefault: [],
  },
  appointmentSchedule: {
    type: Array,
    default: [],
  },
});

const TattoArtistModel = model(
  "TattoArtist",
  TattoArtistSchema,
  "tattoArtists"
);

export = { TattoArtistModel };
