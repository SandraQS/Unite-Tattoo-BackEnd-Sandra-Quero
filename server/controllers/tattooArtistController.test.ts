import { Request, Response } from "express";
import bcrypt from "bcrypt";
import TattooArtistModel from "../../database/models/tattooArtistModel";
import tattooArtistRegister from "./tattooArtistController";

jest.mock("../../database/models/tattooArtist");

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

class CodeError extends Error {
  code: number | undefined;
}

describe("Given tattooArtistRegister controller", () => {
  describe("When it receives a req with a new tattoo artist", () => {
    test("Then it should called the method json with the new tattoo Artist", async () => {
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
      const expectStatus = 201;

      TattooArtistModel.create = jest.fn().mockResolvedValue(requestBody);

      await tattooArtistRegister(req, res, null);

      expect(res.json).toHaveBeenCalledWith(requestBody);
      expect(res.status).toHaveBeenCalledWith(expectStatus);
    });
  });

  describe("When it receives a function next and rejected error", () => {
    test("Then it should called next function with the error object, error.message 'No estás autorizado' and error.code is 401", async () => {
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
      const error = new CodeError("Objeto no válido");
      const next = jest.fn();

      TattooArtistModel.create = jest.fn().mockRejectedValue(null);

      await tattooArtistRegister(req, res, next);

      expect(next).toHaveBeenCalledWith(error);
      expect(next.mock.calls[0][0]).toHaveProperty("code", 404);
      expect(next.mock.calls[0][0]).toHaveProperty(
        "message",
        "Objeto no válido"
      );
    });
  });
});
