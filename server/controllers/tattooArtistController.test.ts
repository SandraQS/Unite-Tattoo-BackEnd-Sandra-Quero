import { Request, Response } from "express";
import bcrypt from "bcrypt";
import TattooArtistModel from "../../database/models/tattooArtist";
import tattooArtistRegister from "./tattooArtistController";

jest.mock("../../database/models/tattooArtist", () => ({
  create: jest.fn(),
}));

const mockResponse = () => {
  const res = {} as Response;
  res.status = jest.fn().mockReturnThis();
  res.json = jest.fn().mockReturnThis();
  return res;
};

// const mockRequest = () => {
//   const req = {} as Request;
//   return req;
// };

describe("Given tattooArtistRegister controller", () => {
  describe("When it receives a req with a new tattoo artist", () => {
    test("Then it should called the method json with the new user", async () => {
      const requestBody = {
        personalDataTattoArtist: {
          name: "Sandra",
          surname1: "Quero",
          surname2: "Sánchez",
        },
        userDataTattoArtist: {
          userName: "ShivaShana",
          password: await bcrypt.hash("hola", 10),
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
      };

      const req = {
        body: requestBody,
      } as Request;

      const res = mockResponse();

      TattooArtistModel.create = jest.fn().mockResolvedValue(requestBody);

      await tattooArtistRegister(req, res, null);

      expect(res.json).toHaveBeenCalledWith(requestBody);
    });
  });
});
