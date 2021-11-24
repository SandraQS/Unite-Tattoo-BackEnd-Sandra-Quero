import { Request, Response } from "express";
import workModel from "../../database/models/workModel";
import { createWork, getWorks, deleteWork, editWork } from "./worksControllers";

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

      workModel.create = jest.fn().mockResolvedValue(requestBody);

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

      workModel.create = jest.fn().mockRejectedValue(null);

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

describe("Given getWork controller", () => {
  describe("When it receives res object", () => {
    test("Then it should called the method json with all works", async () => {
      const works = {
        works: {},
      };

      const res = mockResponse();

      workModel.find = jest.fn().mockResolvedValue({});

      await getWorks(null, res, null);

      expect(res.json).toHaveBeenCalledWith(works);
    });
  });

  describe("When it receives a function next and rejected error", () => {
    test("Then it should called next function with the error object, error.message 'No encontrado' and error.code is 401", async () => {
      const res = mockResponse();
      const error = new CodeError("No encontrado");
      const next = jest.fn();

      const req = {
        body: {},
      } as Request;
      workModel.find = jest.fn().mockRejectedValue(false);

      await getWorks(req, res, next);

      expect(next).toHaveBeenCalledWith(error);
      expect(next.mock.calls[0][0]).toHaveProperty("code", 404);
      expect(next.mock.calls[0][0]).toHaveProperty("message", "No encontrado");
    });
  });
});

describe("Given deleteWork controller", () => {
  describe("When it receives correct id", () => {
    test("Then it should called the method json message and id deleted", async () => {
      const id = "619d5b5f4b6e7ff3fads64bf3c96";
      const params: any = id;
      const res = mockResponse();
      const req = {
        params,
      } as Request;

      workModel.findByIdAndDelete = jest.fn();

      await deleteWork(req, res, null);

      expect(res.json).toHaveBeenCalled();
    });
  });
  describe("When it receives a function next and rejected error", () => {
    test("Then it should called next function with the error object, error.message 'Id no encontrada' and error.code is 401", async () => {
      const idWork = "619d5b5f4b6e7ff3fads64bf3c9543";
      const params: any = idWork;
      const res = mockResponse();
      const error = new CodeError("Id no encontrada");
      const next = jest.fn();
      const req = {
        params,
      } as Request;
      workModel.findByIdAndDelete = jest.fn().mockRejectedValue(false);

      await deleteWork(req, res, next);

      expect(next).toHaveBeenCalledWith(error);
      expect(next.mock.calls[0][0]).toHaveProperty("code", 400);
      expect(next.mock.calls[0][0]).toHaveProperty(
        "message",
        "Id no encontrada"
      );
    });
  });
});

describe("Given editWork controller", () => {
  describe("When it receives req.params with id unexist", () => {
    test("Then it should called next function with error, message 'Id no encontrada', and code 404", async () => {
      const idWork = false;
      const params: any = { idWork };

      const req = {
        params,
      } as Request;

      const next = jest.fn();

      const error = new CodeError("Id no encontrada");

      workModel.findById = jest.fn().mockResolvedValue(false);

      await editWork(req, null, next);

      expect(next).toHaveBeenCalledWith(error);
      expect(next.mock.calls[0][0]).toHaveProperty("code", 404);
      expect(next.mock.calls[0][0]).toHaveProperty(
        "message",
        "Id no encontrada"
      );
    });
  });

  describe("When it receives req.params with id correct and work modified", () => {
    test("Then it should called the method json with the work edited", async () => {
      const idWork = "619d5b5f4b6e7ff3fads64bf3c96";
      const params: any = { idWork };
      const body: any = {
        tittle: "Lobo",
        tattooArtist: "Bruno",
        description: "Loremm",
        tattooStyles: "Acuarela",
        image: "url imagen",
        collectionWork: [],
      };

      const res = mockResponse();
      const req = {
        params,
        body,
      } as Request;

      const collectionEdited = {
        tittle: "Lobo",
        tattooArtist: "Bruno",
        description: "Loremm fasdfasdfasd",
        tattooStyles: "Acuarela",
        likes: 0,
        image: "url imagen",
        collectionWork: [],
        id: "619df77b0396d1ff45fe32c4",
      };

      workModel.findByIdAndUpdate = jest.fn();
      workModel.findById = jest.fn().mockResolvedValue(collectionEdited);

      await editWork(req, res, null);

      expect(res.json).toHaveBeenCalledWith(collectionEdited);
      expect(res.status).toHaveBeenCalledWith(202);
    });
  });

  describe("When it receives a function next and rejected error", () => {
    test("Then it should called next function with the error object, error.message 'No se ha podido modificar el trabajo' and error.code is 401", async () => {
      const idWork = "619d5b5f4b6e7ff3fads64bf3c96";
      const params: any = { idWork };
      const body: any = {
        tittle: "Lobo",
        tattooArtist: "Bruno",
        description: "Loremm",
        tattooStyles: "Acuarela",
        image: "url imagen",
        collectionWork: [],
      };

      const req = {
        params,
        body,
      } as Request;
      const next = jest.fn();
      const error = new CodeError("No se ha podido modificar el trabajo");

      workModel.findByIdAndUpdate = jest.fn();
      workModel.findById = jest.fn().mockResolvedValue(null);

      await editWork(req, null, next);

      expect(next).toHaveBeenCalledWith(error);
      expect(next.mock.calls[0][0]).toHaveProperty("code", 404);
      expect(next.mock.calls[0][0]).toHaveProperty(
        "message",
        "No se ha podido modificar el trabajo"
      );
    });
  });
});
