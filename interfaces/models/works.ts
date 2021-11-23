import { ObjectId } from "mongoose";

interface Work {
  tittle: string;
  tattooArtist: string;
  description: string;
  tattooStyles: string;
  likes: number;
  image: string;
  collection: ObjectId[];
}

export default Work;
