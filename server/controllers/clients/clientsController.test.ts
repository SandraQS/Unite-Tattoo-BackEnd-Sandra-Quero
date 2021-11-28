import { Response } from "express";
import clientModel from "../../../database/models/clientModel";
import { clientRegister } from "./clientsController";

jest.mock("../../../database/models/clientModel");
jest.mock("bcrypt");

const mockResponse = () => {
  const res = {} as Response;
  res.status = jest.fn().mockReturnThis();
  res.json = jest.fn().mockReturnThis();
  return res;
};
class CodeError extends Error {
  code: number | undefined;
}

describe("Given clientRegister controller", () => {
  describe("When it receives a req with a new client", () => {
    test("Then it should called the method json with the new client", async () => {
      const fileURL =
        "https://storage.googleapis.com/unite-tattoo.appspot.com/undefined-1637922995666-.png";

      const requestBody = {
        personalDataClient: {
          name: "Marina",
          surname1: "Sánchez",
          surname2: "Sánchez",
        },
        userDataClient: {
          userName: "MSS",
          password: "hola",
          email: "otromail@gmail.com",
          phone: 55555555,
        },
        interestDataClient: {
          tattooStyles: ["Realista, Acuarela, Fine line"],
        },
        profileImage: fileURL,
      };

      const req = {
        body: requestBody,
        file: fileURL,
      };

      const res = mockResponse();
      const expectStatus = 201;

      clientModel.create = jest.fn().mockResolvedValue(requestBody);

      await clientRegister(req, res, null);

      expect(res.json).toHaveBeenCalledWith(requestBody);
      expect(res.status).toHaveBeenCalledWith(expectStatus);
    });
  });

  describe("When it receives a function next and rejected error", () => {
    test("Then it should called next function with the error object, error.message 'No estás autorizado' and error.code is 401", async () => {
      const fileURL =
        "https://storage.googleapis.com/unite-tattoo.appspot.com/undefined-1637922995666-.png";

      const requestBody = {
        personalDataClient: {
          name: "Marina",
          surname1: "Sánchez",
          surname2: "Sánchez",
        },
        userDataClient: {
          userName: "MSS",
          password: "hola",
          email: "otromail@gmail.com",
          phone: 55555555,
        },
        interestDataClient: {
          tattooStyles: ["Realista, Acuarela, Fine line"],
        },
        profileImage: fileURL,
      };

      const req = {
        body: requestBody,
        file: fileURL,
      };

      const res = mockResponse();
      const error = new CodeError("Objeto no válido");
      const next = jest.fn();

      clientModel.create = jest.fn().mockRejectedValue(null);

      await clientRegister(req, res, next);

      expect(next).toHaveBeenCalledWith(error);
      expect(next.mock.calls[0][0]).toHaveProperty("code", 404);
      expect(next.mock.calls[0][0]).toHaveProperty(
        "message",
        "Objeto no válido"
      );
    });
  });
});
