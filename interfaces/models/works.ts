import { ObjectId } from "mongoose";

interface Work {
  tittle: string;
  tattooArtist: string;
  description: string;
  tattooStyles: string;
  likes: number;
  image: string;
  collectionWork: ObjectId[];
}

export default Work;
