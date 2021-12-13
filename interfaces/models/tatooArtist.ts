import { ObjectId } from "mongoose";

interface PersonalDataTattooArtist {
  name: string;
  surname1: string;
  surname2: string;
}

interface UserDataTattooArtist {
  userName?: string;
  password?: string;
  email?: string;
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
  collections: ObjectId[];
  appointmentSchedule: ObjectId[];
  imageAmbient: string;
  profileImage: string;
}

export default TattooArtist;
