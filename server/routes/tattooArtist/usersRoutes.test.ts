import dotenv from "dotenv";

dotenv.config();
import mongoose from "mongoose";
import supertest from "supertest";

import { initServer, app } from "../..";
import initDB from "../../../database";

import TattooArtistModel from "../../../database/models/tattooArtistModel";

const request = supertest(app);
jest.setTimeout(20000);

let server;

beforeAll(async () => {
  await initDB(process.env.MONGODB_STRING_UNITETATTOO_TESTS);
  server = await initServer(8909);
});

afterAll((done) => {
  server.close(async () => {
    await mongoose.connection.close();
    done();
  });
});

beforeEach(async () => {
  // await TattooArtistModel.deleteMany({});
  await TattooArtistModel.create({
    personalDataTattoArtist: {
      name: "Gisela",
      surname1: "Quero",
      surname2: "Sánchez",
    },
    userDataTattoArtist: {
      userName: "ShivaShana",
      password: "hola",
      email: "email@gmail.com",
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
  await TattooArtistModel.create({
    personalDataTattoArtist: {
      name: "Gisela",
      surname1: "Quero",
      surname2: "Sánchez",
    },
    userDataTattoArtist: {
      userName: "ShivaShana",
      password: "hola",
      email: "email@gmail.com",
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
});

describe("Given /userRoutes route", () => {
  describe("When it receives a POST request to the /register route with a req.body correct", () => {
    test("Then it should respond a with the new tattooArtist and a 201 status", async () => {
      const { body } = await request
        .post("/uniteTattoo/tattooArtist/register")
        .send({
          personalDataTattoArtist: {
            name: "Gisela",
            surname1: "Quero",
            surname2: "Sánchez",
          },
          userDataTattoArtist: {
            userName: "ShivaShana",
            password: "hola",
            email: "email@gmail.com",
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
        })
        .expect(201);

      expect(body).toHaveProperty("personalDataTattoArtist", {
        name: "Gisela",
        surname1: "Quero",
        surname2: "Sánchez",
      });
    });
  });

  describe("When it receives a POST request to the /register route with a req.body incorrect", () => {
    test("Then it should respond a with error and a 404 status and message 'Objeto no válido'", async () => {
      const { body } = await request
        .post("/uniteTattoo/tattooArtist/register")
        .send({
          personalDataTattoArtisttt: {
            name: "Gisela",
            surname1: "Quero",
            surname2: "Sánchez",
          },
          userDataTattoArtist: {
            userName: "ShivaShana",
            password: "hola",
            email: "email@gmail.com",
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
        })
        .expect(404);

      expect(body).toHaveProperty("error", "Objeto no válido");
    });
  });
});
