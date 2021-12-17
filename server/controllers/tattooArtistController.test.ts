import { Request, Response } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import TattooArtistModel from "../../database/models/tattooArtistModel";
import {
  tatooArtistPorfile,
  tattooArtistLogin,
  tattooArtistRegister,
} from "./tattooArtistController";

jest.mock("../../database/models/tattooArtistModel");
jest.mock("bcrypt");
jest.mock("jsonwebtoken");

const mockResponse = () => {
  const res = {} as Response;
  res.status = jest.fn().mockReturnThis();
  res.json = jest.fn().mockReturnThis();
  return res;
};
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

describe("Given tattooArtistLogin controller", () => {
  describe("When it receives an req object with an email unexist, and a next function", () => {
    test("Then it should called the next function with error, error.message 'Algo ha fallado' and error.code 401", async () => {
      const requestBody = {
        password: "hola",
        email: "email@gmail.com",
      };
      const error = new CodeError("Algo ha fallado");

      const req = {
        body: requestBody,
      } as Request;
      const res = mockResponse();
      const next = jest.fn();
      TattooArtistModel.findOne = jest.fn().mockResolvedValue(null);

      await tattooArtistLogin(req, res, next);

      expect(next).toHaveBeenCalledWith(error);
      expect(next.mock.calls[0][0]).toHaveProperty("message", error.message);
      expect(next.mock.calls[0][0]).toHaveProperty("code", 401);
    });
  });

  describe("When it receives an req object with a correct email and a password incorrect", () => {
    test("Then it should called the next function with error, error.message 'Algo ha fallado' and error.code 401", async () => {
      const requestBody = {
        password: "hola",
        email: "email@gmail.com",
      };

      const error = new CodeError("Algo ha fallado");
      const user = {
        userDataTattoArtist: {
          password: "hola",
          email: "email@gmail.com",
        },
      };

      const req = {
        body: requestBody,
      } as Request;
      const res = mockResponse();
      const next = jest.fn();
      TattooArtistModel.findOne = jest.fn().mockResolvedValue(user);

      await tattooArtistLogin(req, res, next);
      bcrypt.compare = jest.fn().mockResolvedValue(false);

      expect(next).toHaveBeenCalledWith(error);
      expect(next.mock.calls[0][0]).toHaveProperty("message", error.message);
      expect(next.mock.calls[0][0]).toHaveProperty("code", 401);
    });
  });

  describe("When receives an req object with a correct email and a correct password", () => {
    test("Then it should called res.json with token", async () => {
      const requestBody = {
        password: "hola",
        email: "email@gmail.com",
      };

      const user = {
        userDataTattoArtist: {
          password: "hola",
          email: "email@gmail.com",
        },
      };

      const req = {
        body: requestBody,
      } as Request;
      const res = mockResponse();

      const token = "MockToken";
      const expectToken = {
        token,
      };

      TattooArtistModel.findOne = jest.fn().mockResolvedValue(user);
      bcrypt.compare = jest.fn().mockResolvedValue(true);
      jwt.sign = jest.fn().mockReturnValue(token);

      await tattooArtistLogin(req, res, null);

      expect(res.json).toHaveBeenLastCalledWith(expectToken);
    });
  });

  describe("When it receives a function next and rejected error", () => {
    test("Then it should called next function with the error object, error.message 'No estás autorizado' and error.code is 401", async () => {
      const requestBody = {
        password: "hola",
        email: "email@gmail.com",
      };

      const req = {
        body: requestBody,
      } as Request;
      const res = mockResponse();
      const next = jest.fn();

      const error = new CodeError("No autorizado");
      TattooArtistModel.findOne = jest.fn().mockRejectedValue(null);

      await tattooArtistLogin(req, res, next);

      expect(next).toHaveBeenCalledWith(error);
      expect(next.mock.calls[0][0]).toHaveProperty("message", error.message);
      expect(next.mock.calls[0][0]).toHaveProperty("code", 401);
    });
  });
});

describe("Given tatooArtistPorfile controller", () => {
  describe("When it receives an req object with a id unexist", () => {
    test("Then it should called the next function with error, error.message 'El usuario no existe' and error.code 404", async () => {
      const idUser = "61b1230c136733d8752847d8";
      const req = {
        idUser,
      };

      const error = new CodeError("El usuario no existe");
      const res = mockResponse();
      const next = jest.fn();

      TattooArtistModel.findById = jest.fn().mockResolvedValue(null);

      await tatooArtistPorfile(req, res, next);

      expect(next).toHaveBeenCalledWith(error);
      expect(next.mock.calls[0][0]).toHaveProperty("message", error.message);
      expect(next.mock.calls[0][0]).toHaveProperty("code", 404);
    });
  });

  describe("When it receives an req object with a valid id", () => {
    test("Then it should called the method json with the porfile user", async () => {
      const idUser = "61b1230c136733d8752847d8";
      const expectUserPorfile = {
        personalDataTattoArtist: {
          name: "Ezequiel",
          surname1: "Sánchez",
          surname2: "Molina",
        },
        userDataTattoArtist: {
          userName: "𝗘𝗭𝗘𝗤𝗨𝗜𝗘𝗟",
          password:
            "$2b$10$ww7anSbsOWHqDr3EOx6UqOUNLCRtiyzbWtjBcZIrPqxfaiKXk7Mwi",
          email: "ezequiel@gmail.com",
        },
        professionalDataTattooArtist: {
          studioName: "Circa Tattoo Bcn",
          professionalName: "Ezequiel Samuraii",
          phone: 63526378,
          contactEmail: "ezequiel@gmail.com",
          openingHours: "8.00h a 18.00h",
          direction: "C/Diputació, 20",
          tattooStyles: ["Realista, color"],
          colaboration: "false",
        },
        collections: [
          "61b12387136733d8752847ef",
          "61b12520136733d875284813",
          "61b12684136733d875284820",
        ],
        appointmentSchedule: [],
        imageAmbient:
          "https://cdn.pixabay.com/photo/2017/07/11/17/03/tattoo-artist-2494298_1280.jpg",
        profileImage:
          "https://cdn.pixabay.com/photo/2016/04/01/10/11/avatar-1299805_1280.png",
        id: idUser,
      };
      const req = {
        idUser,
      };

      const res = mockResponse();
      const next = jest.fn();

      TattooArtistModel.findById = jest
        .fn()
        .mockResolvedValue(expectUserPorfile);

      await tatooArtistPorfile(req, res, next);

      expect(res.json).toHaveBeenCalledWith(expectUserPorfile);
    });
  });

  describe("When it receives a function next and rejected error", () => {
    test("Then it should called next function with the error object, error.message 'No encontrado' and error.code is 401", async () => {
      const idUser = "61b1230c136733d8752847d8";
      const req = {
        idUser,
      };

      const error = new CodeError("No encontrado");
      const res = mockResponse();
      const next = jest.fn();

      TattooArtistModel.findById = jest.fn().mockRejectedValue(null);

      await tatooArtistPorfile(req, res, next);

      expect(next).toHaveBeenCalledWith(error);
      expect(next.mock.calls[0][0]).toHaveProperty("message", error.message);
      expect(next.mock.calls[0][0]).toHaveProperty("code", 401);
    });
  });
});
