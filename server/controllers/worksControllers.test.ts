import { Request, Response } from "express";
import collectionModel from "../../database/models/collectionModel";
import workModel from "../../database/models/workModel";
import {
  createWork,
  getWorksCollections,
  getAllWorks,
  deleteWork,
  editWork,
} from "./worksControllers";

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
  describe("When it receives a req with unexist idCollection", () => {
    test("Then it should called the next function with error, error.message 'Colección no encontrada' and error.code is 404", async () => {
      const fileURL = "UrlImagen";
      const requestBody = {
        tittle: "Lobo",
        tattooArtist: "Bruno",
        description: "Loremm fasdfasdfasd",
        tattooStyles: "Acuarela",
        image: fileURL,
      };

      const idCollection = "619e00aea445d48b6fe09192";
      const params = { idCollection };
      const file = fileURL;
      const error = new CodeError("Colección no encontrada");
      const errorCode = 404;

      const req = {
        body: requestBody,
        params,
        file,
      };
      const res = mockResponse();
      const next = jest.fn();

      collectionModel.findById = jest.fn().mockResolvedValue(null);

      await createWork(req, res, next);

      expect(next).toHaveBeenCalledWith(error);
      expect(next.mock.calls[0][0]).toHaveProperty("code", errorCode);
      expect(next.mock.calls[0][0]).toHaveProperty("message", error.message);
    });
  });

  describe("When it receives a req with a new work", () => {
    test("Then it should called the method json with the new work", async () => {
      const fileURL = "UrlImagen";
      const requestBody = {
        tittle: "Lobo",
        tattooArtist: "Bruno",
        description: "Loremm fasdfasdfasd",
        tattooStyles: "Acuarela",
        image: fileURL,
      };

      const idCollection = "619e00aea445d48b6fe09192";

      const params: any = { idCollection };

      const req = {
        body: requestBody,
        params,
        file: fileURL,
      };

      const neWork = {
        tittle: "Lobo",
        tattooArtist: "Bruno",
        description: "Loremm fasdfasdfasd",
        tattooStyles: "Acuarela",
        image: "url imagen",
        id: "619f4c68f41ab430cfe513c0",
      };

      const res = mockResponse();
      const expectStatus = 201;
      const next = jest.fn();

      collectionModel.findById = jest.fn().mockResolvedValue({
        save: jest.fn(),
        works: {
          push: jest.fn(),
        },
      });

      workModel.create = jest.fn().mockResolvedValue(neWork);

      await createWork(req, res, next);

      expect(res.json).toHaveBeenCalledWith(neWork);
      expect(res.status).toHaveBeenCalledWith(expectStatus);
    });
  });

  describe("When it receives a function next and rejected error", () => {
    test("Then it should called next function with the error object, error.message 'Objeto no válido' and error.code is 401", async () => {
      const fileURL = "UrlImagen";
      const requestBody = {
        tittle: "Lobo",
        tattooArtist: "Bruno",
        description: "Loremm fasdfasdfasd",
        tattooStyles: "Acuarela",
        image: fileURL,
      };

      const idCollection = "619f4c68f41ab430cfe513c0";
      const params = idCollection;
      const file = fileURL;
      const body = requestBody;

      const req = {
        body,
        params,
        file,
      };
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

describe("Given getWorksCollections controller", () => {
  describe("When it receives res object", () => {
    test("Then it should called the method json with all works", async () => {
      const idCollection = "619e00aea445d48b6fe09192";
      const params = { idCollection };
      const collection = {
        works: {},
      };
      const req = {
        params,
      };
      const res = mockResponse();
      collectionModel.findById = jest.fn().mockReturnValue({
        populate: jest.fn().mockResolvedValue(collection),
      });

      await getWorksCollections(req, res, null);

      expect(res.json).toHaveBeenCalledWith(collection.works);
    });
  });

  describe("When it receives a function next and rejected error", () => {
    test("Then it should called next function with the error object, error.message 'No encontrado' and error.code is 401", async () => {
      const res = mockResponse();
      const error = new CodeError("No encontrado");
      const next = jest.fn();

      const idCollection = "619e00aea445d48b6fe09192";
      const params = { idCollection };

      const req = {
        params,
        body: {},
      };
      collectionModel.findById = jest.fn().mockReturnValue({
        populate: jest.fn().mockResolvedValue(null),
      });

      await getWorksCollections(req, res, next);

      expect(next).toHaveBeenCalledWith(error);
      expect(next.mock.calls[0][0]).toHaveProperty("code", 404);
      expect(next.mock.calls[0][0]).toHaveProperty("message", "No encontrado");
    });
  });
});

describe("Given getAllWorks controller", () => {
  describe("When it receives res object", () => {
    test("Then it should called the method json with all works", async () => {
      const works = {
        works: {},
      };

      const res = mockResponse();

      workModel.find = jest.fn().mockResolvedValue({});

      await getAllWorks(null, res, null);

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

      await getAllWorks(req, res, next);

      expect(next).toHaveBeenCalledWith(error);
      expect(next.mock.calls[0][0]).toHaveProperty("code", 404);
      expect(next.mock.calls[0][0]).toHaveProperty("message", "No encontrado");
    });
  });
});

describe("Given deleteWork controller", () => {
  describe("When it receives correct id", () => {
    test("Then it should called the method json message and id deleted", async () => {
      const idWork = "619d5b5f4b6e7ff3fads64bf3c96";
      const params: any = idWork;
      const res = mockResponse();
      const req = {
        params,
      } as Request;

      workModel.findById = jest.fn().mockResolvedValue(idWork);
      workModel.findByIdAndDelete = jest.fn();
      collectionModel.findById = jest.fn().mockResolvedValue({
        save: jest.fn(),
        works: {
          filter: jest.fn(),
        },
      });

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
  describe("When it receives req.params with idWork unexist", () => {
    test("Then it should called next function with error, message 'Trabajo no encontrado', and code 404", async () => {
      const fileURL = "UrlImagen";
      const idWork = false;
      const params = { idWork };
      const file = fileURL;

      const req = {
        params,
        file,
      };
      const next = jest.fn();

      const error = new CodeError("Trabajo no encontrado");

      workModel.findById = jest.fn().mockResolvedValue(false);

      await editWork(req, null, next);

      expect(next).toHaveBeenCalledWith(error);
      expect(next.mock.calls[0][0]).toHaveProperty("code", 404);
      expect(next.mock.calls[0][0]).toHaveProperty("message", error.message);
    });
  });

  describe("When it receives req.params with id correct and work modified", () => {
    test("Then it should called the method json with the work edited", async () => {
      const fileURL = "UrlImagen";
      const idWork = "619d5b5f4b6e7ff3fads64bf3c96";
      const params = { idWork };
      const body = {
        tittle: "Lobo",
        tattooArtist: "Bruno",
        description: "Loremm",
        tattooStyles: "Acuarela",
        image: fileURL,
        collectionWork: [],
      };
      const file = fileURL;

      const req = {
        params,
        body,
        file,
      };
      const res = mockResponse();

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
      const fileURL = "UrlImagen";
      const idWork = "619d5b5f4b6e7ff3fads64bf3c96";
      const params = { idWork };
      const body = {
        tittle: "Lobo",
        tattooArtist: "Bruno",
        description: "Loremm",
        tattooStyles: "Acuarela",
        image: fileURL,
        collectionWork: [],
      };
      const file = fileURL;

      const req = {
        params,
        body,
        file,
      };
      const next = jest.fn();
      const error = new CodeError("No se ha podido modificar el trabajo");

      workModel.findByIdAndUpdate = jest.fn();
      workModel.findById = jest.fn().mockRejectedValue(null);

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
