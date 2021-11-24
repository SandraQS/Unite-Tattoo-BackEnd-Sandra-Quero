import { Request, Response } from "express";
import WorkModel from "../../database/models/workModel";
import { createWork } from "./worksControllers";

jest.mock("../../database/models/collectionModel");

const mockResponse = () => {
  const res = {} as Response;
  res.status = jest.fn().mockReturnThis();
  res.json = jest.fn().mockReturnThis();
  return res;
};

class CodeError extends Error {
  code: number | undefined;
}

describe("Given createWork controller", () => {
  describe("When it receives a req with a new work", () => {
    test("Then it should called the method json with the new work", async () => {
      const requestBody = {
        tittle: "Lobo",
        tattooArtist: "Bruno",
        description: "Loremm fasdfasdfasd",
        tattooStyles: "Acuarela",
        image: "url imagen",
      };

      const req = {
        body: requestBody,
      } as Request;

      const res = mockResponse();
      const expectStatus = 201;

      WorkModel.create = jest.fn().mockResolvedValue(requestBody);

      await createWork(req, res, null);

      expect(res.json).toHaveBeenCalledWith(requestBody);
      expect(res.status).toHaveBeenCalledWith(expectStatus);
    });
  });

  describe("When it receives a function next and rejected error", () => {
    test("Then it should called next function with the error object, error.message 'Objeto no válido' and error.code is 401", async () => {
      const requestBody = {
        tittle: "Lobo",
        tattooArtist: "Bruno",
        description: "Loremm fasdfasdfasd",
        tattooStyles: "Acuarela",
        image: "url imagen",
      };

      const req = {
        body: requestBody,
      } as Request;

      const res = mockResponse();
      const error = new CodeError("Objeto no válido");
      const next = jest.fn();

      WorkModel.create = jest.fn().mockRejectedValue(null);

      await createWork(req, res, next);

      expect(next).toHaveBeenCalledWith(error);
      expect(next.mock.calls[0][0]).toHaveProperty("code", 404);
      expect(next.mock.calls[0][0]).toHaveProperty(
        "message",
        "Objeto no válido"
      );
    });
  });
});
