import { Request, Response } from "express";
import {
  createCollection,
  getCollections,
  deleteCollection,
} from "./collectionsController";
import collectionModel from "../../database/models/collectionModel";

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

describe("Given createCollection controller", () => {
  describe("When it receives a req with a new collection", () => {
    test("Then it should called the method json with the new collection", async () => {
      const requestBody = {
        tattooStyles: "realista",
        image: "url",
      };

      const req = {
        body: requestBody,
      } as Request;

      const res = mockResponse();
      const expectStatus = 201;

      collectionModel.create = jest.fn().mockResolvedValue(requestBody);

      await createCollection(req, res, null);

      expect(res.json).toHaveBeenCalledWith(requestBody);
      expect(res.status).toHaveBeenCalledWith(expectStatus);
    });
  });

  describe("When it receives a function next and rejected error", () => {
    test("Then it should called next function with the error object, error.message 'No estás autorizado' and error.code is 401", async () => {
      const requestBody = {
        tattooStyles: "realista",
        image: "url",
      };

      const req = {
        body: requestBody,
      } as Request;

      const res = mockResponse();
      const error = new CodeError("Objeto no válido");
      const next = jest.fn();

      collectionModel.create = jest.fn().mockRejectedValue(null);

      await createCollection(req, res, next);

      expect(next).toHaveBeenCalledWith(error);
      expect(next.mock.calls[0][0]).toHaveProperty("code", 404);
      expect(next.mock.calls[0][0]).toHaveProperty(
        "message",
        "Objeto no válido"
      );
    });
  });
});

describe("Given getCollections controller", () => {
  describe("When it receives res object", () => {
    test("Then it should called the method json with all collections", async () => {
      const collections = {
        collections: {},
      };

      const res = mockResponse();

      collectionModel.find = jest.fn().mockResolvedValue({});

      await getCollections(null, res, null);

      expect(res.json).toHaveBeenCalledWith(collections);
    });
  });

  describe("When it receives a function next and rejected error", () => {
    test("Then it should called next function with the error object, error.message 'No estás autorizado' and error.code is 401", async () => {
      const res = mockResponse();
      const error = new CodeError("No encontrado");
      const next = jest.fn();

      const req = {
        body: {},
      } as Request;
      collectionModel.find = jest.fn().mockRejectedValue(false);

      await getCollections(req, res, next);

      expect(next).toHaveBeenCalledWith(error);
      expect(next.mock.calls[0][0]).toHaveProperty("code", 404);
      expect(next.mock.calls[0][0]).toHaveProperty("message", "No encontrado");
    });
  });
});

describe("Given deleteCollection controller", () => {
  describe("When it receives id", () => {
    test("Then it should called the method json message and id deleted", async () => {
      const id = "619d5b5f4b6e7ff3fads64bf3c96";
      const params: any = id;
      const res = mockResponse();
      const req = {
        params,
      } as Request;

      collectionModel.findByIdAndDelete = jest.fn();

      await deleteCollection(req, res, null);

      expect(res.json).toHaveBeenCalled();
    });
  });
  describe("When it receives a function next and rejected error", () => {
    test("Then it should called next function with the error object, error.message 'No estás autorizado' and error.code is 401", async () => {
      const id = "619d5b5f4b6e7ff3fads64bf3c9543";
      const params: any = id;
      const res = mockResponse();
      const error = new CodeError("Id no encontrada");
      const next = jest.fn();
      const req = {
        params,
      } as Request;
      collectionModel.findByIdAndDelete = jest.fn().mockRejectedValue(false);

      await deleteCollection(req, res, next);

      expect(next).toHaveBeenCalledWith(error);
      expect(next.mock.calls[0][0]).toHaveProperty("code", 400);
      expect(next.mock.calls[0][0]).toHaveProperty(
        "message",
        "Id no encontrada"
      );
    });
  });
});
