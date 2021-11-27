import dotenv from "dotenv";

dotenv.config();
import mongoose from "mongoose";
import supertest from "supertest";
import bcrypt from "bcrypt";

import { initServer, app } from "../..";
import initDB from "../../../database";

import TattooArtistModel from "../../../database/models/tattooArtistModel";
import CollectionModel from "../../../database/models/collectionModel";
import WorkModel from "../../../database/models/workModel";

const request = supertest(app);
jest.setTimeout(40000);

let server;
let token;

beforeAll(async () => {
  await initDB(process.env.MONGODB_STRING_UNITETATTOO_TESTS);
  server = await initServer(2354);

  await TattooArtistModel.create({
    _id: "619fc46e527d8bdac56ae123",
    personalDataTattoArtist: {
      name: "Gisela",
      surname1: "Quero",
      surname2: "Sánchez",
    },
    userDataTattoArtist: {
      userName: "ShivaShana",
      password: await bcrypt.hash("hola", 10),
      email: "otroemail@gmail.com",
    },
    professionalDataTattooArtist: {
      studioName: "Shiva",
      professionalName: "ShivaShana",
      phone: 666666666,
      contactEmail: "email@gmail.com",
      openingHours: "de 9.00 a 18.00h",
      direction: "C/hola, nº13",
      colaboration: "true",
    },
  });

  const response = await request
    .post("/uniteTattoo/tattooArtist/login")
    .send({ password: "hola", email: "otroemail@gmail.com" })
    .expect(200);
  token = response.body.token;
});

afterAll((done) => {
  server.close(async () => {
    await mongoose.connection.close();
    done();
  });
});

beforeEach(async () => {
  await TattooArtistModel.deleteMany({});
  await CollectionModel.deleteMany({});
  await WorkModel.deleteMany({});

  await TattooArtistModel.create({
    _id: "619fc46e527d8bdac56ae666",
    personalDataTattoArtist: {
      name: "Gisela",
      surname1: "Quero",
      surname2: "Sánchez",
    },
    userDataTattoArtist: {
      userName: "ShivaShana",
      password: await bcrypt.hash("hola", 10),
      email: "otroemail@gmail.com",
    },
    professionalDataTattooArtist: {
      studioName: "Shiva",
      professionalName: "ShivaShana",
      phone: 666666666,
      contactEmail: "email@gmail.com",
      openingHours: "de 9.00 a 18.00h",
      direction: "C/hola, nº13",
      colaboration: "true",
    },
    collections: [
      await CollectionModel.create({
        _id: "619fc46e527d8bdac56aee25",
        tattooStyles: "Acuarela",
        works: [
          await WorkModel.create({
            tittle: "Lobo",
            tattooArtist: "Bruno",
            description: "Loremm",
            tattooStyles: "Acuarela",
            collectionWork: "619fc46e527d8bdac56aee25",
            _id: "61a2679fe15151038b77c2bc",
          }),
        ],
      }),
    ],
  });
});

afterEach(async () => {
  await TattooArtistModel.deleteMany({});
});

describe("Given /workRoutes route", () => {
  describe("When it receives a GET request to the /works/:idCollection route with a valid body", () => {
    test("Then it should respond a with the new tattooArtist and a 201 status", async () => {
      const { body } = await request
        .get("/uniteTattoo/tattooArtist/works/619fc46e527d8bdac56aee25")
        .set("Authorization", `Bearer ${token}`)
        .expect(200);

      const expectedResult = {
        tittle: "Lobo",
        tattooArtist: "Bruno",
        description: "Loremm",
        tattooStyles: "Acuarela",
        image:
          "https://logiabarcelona.com/wp-content/uploads/2019/05/tatuaje_espalda_color_flor_cara_mujer_logia_barcelona_lincoln_lima.jpg",
        likes: 0,
        collectionWork: "619fc46e527d8bdac56aee25",
        id: "61a2679fe15151038b77c2bc",
      };
      expect(body[0]).toEqual(expectedResult);
    });
  });
});
