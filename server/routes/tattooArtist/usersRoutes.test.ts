// import dotenv from "dotenv";
// import mongoose from "mongoose";
// import supertest from "supertest";
// import chalk from "chalk";
// import initDB from "../../../database";
// import TattooArtistModel from "../../../database/models/tattooArtistModel";
// import { initServer, app } from "../..";

// const request = supertest(app);

// let server;

// beforeAll(async () => {
//   await initDB(process.env.MONGODB_STRING_UNITETATTOO_TESTS);
//   server = await initServer(process.env.SERVER_PORT_TESTS);
//   await TattooArtistModel.deleteMany({});
// });

// afterAll((done) => {
//   server.close(async () => {
//     await mongoose.connection.close();
//     done();
//   });
// });

// beforeEach(async () => {
//   await TattooArtistModel.create({
//     personalDataTattoArtist: {
//       name: "Gisela",
//       surname1: "Quero",
//       surname2: "Sánchez",
//     },
//     userDataTattoArtist: {
//       userName: "ShivaShana",
//       password: "hola",
//       email: "email@gmail.com",
//     },
//     professionalDataTattooArtist: {
//       studioName: "Shiva",
//       professionalName: "ShivaShana",
//       phone: 666666666,
//       contactEmail: "email@gmail.com",
//       openingHours: "de 9.00 a 18.00h",
//       direction: "C/hola, nº13",
//       colaboration: "true",
//     },
//   });
//   await TattooArtistModel.create({
//     personalDataTattoArtist: {
//       name: "Gisela",
//       surname1: "Quero",
//       surname2: "Sánchez",
//     },
//     userDataTattoArtist: {
//       userName: "ShivaShana",
//       password: "hola",
//       email: "email@gmail.com",
//     },
//     professionalDataTattooArtist: {
//       studioName: "Shiva",
//       professionalName: "ShivaShana",
//       phone: 666666666,
//       contactEmail: "email@gmail.com",
//       openingHours: "de 9.00 a 18.00h",
//       direction: "C/hola, nº13",
//       colaboration: "true",
//     },
//   });
// });
