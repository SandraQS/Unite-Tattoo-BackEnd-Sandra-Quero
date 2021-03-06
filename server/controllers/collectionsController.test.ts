import { Request, Response } from "express";
import {
  createCollection,
  getCollections,
  deleteCollection,
  editCollection,
} from "./collectionsController";
import collectionModel from "../../database/models/collectionModel";
import TattooArtistModel from "../../database/models/tattooArtistModel";

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
  describe("When it receives a idUser incorrect", () => {
    test("Then it should called next function with the error object, error.message 'Usuario no encontrado' and error.code is 404", async () => {
      const fileURL = "UrlImagen";
      const requestBody = {
        tattooStyles: "realista",
        image: fileURL,
      };
      const id = "619d380da88c81eb05dd1666";
      const req = {
        body: requestBody,
        idUser: id,
        file: fileURL,
      };
      const next = jest.fn();
      const res = mockResponse();
      const error = new CodeError("Usuario no encontrado");
      const expectStatus = 404;

      TattooArtistModel.findById = jest.fn().mockResolvedValue(null);

      await createCollection(req, res, next);

      expect(next).toHaveBeenCalledWith(error);
      expect(next.mock.calls[0][0]).toHaveProperty("code", expectStatus);
      expect(next.mock.calls[0][0]).toHaveProperty("message", error.message);
    });
  });

  describe("When it receives a req with a new collection", () => {
    test("Then it should called the method json with the new collection", async () => {
      const fileURL = "UrlImagen";
      const requestBody = {
        tattooStyles: "realista",
        image: fileURL,
      };
      const id = "619d380da88c81eb05dd1666";
      const req = {
        body: requestBody,
        idUser: id,
        file: fileURL,
      };

      const res = mockResponse();
      const expectStatus = 201;

      TattooArtistModel.findById = jest.fn().mockResolvedValue({
        save: jest.fn(),
        collections: {
          push: jest.fn(),
        },
      });
      collectionModel.create = jest.fn().mockResolvedValue(requestBody);

      await createCollection(req, res, null);

      expect(res.json).toHaveBeenCalledWith(requestBody);
      expect(res.status).toHaveBeenCalledWith(expectStatus);
    });
  });

  describe("When it receives a function next and rejected error", () => {
    test("Then it should called next function with the error object, error.message 'Objeto no v??lido' and error.code is 401", async () => {
      const fileURL = "UrlImagen";
      const requestBody = {
        tattooStyles: "realista",
        image: fileURL,
      };
      const req = {
        body: requestBody,
        file: fileURL,
      };

      const res = mockResponse();
      const error = new CodeError("Objeto no v??lido");
      const next = jest.fn();

      collectionModel.create = jest.fn().mockRejectedValue(null);

      await createCollection(req, res, next);

      expect(next).toHaveBeenCalledWith(error);
      expect(next.mock.calls[0][0]).toHaveProperty("code", 404);
      expect(next.mock.calls[0][0]).toHaveProperty(
        "message",
        "Objeto no v??lido"
      );
    });
  });
});

describe("Given deleteCollection controller", () => {
  describe("When it receives a invalid idCollection and idUser", () => {
    test("Then it should called next function with the error, error.message 'Colecci??n no encontrada' and error.code is 404", async () => {
      const idUser = "619d380da88c81eb05dd1666";
      const idCollection = "619d5b5f4b6e7ff3fads64bf3c96";
      const params = idCollection;
      const res = mockResponse();
      const req = {
        params,
        idUser,
      };

      TattooArtistModel.findById = jest.fn().mockResolvedValue(idUser);
      collectionModel.findById = jest.fn().mockResolvedValue(null);

      const error = new CodeError("Colecci??n no encontrada");
      error.code = 404;
      const next = jest.fn();

      collectionModel.findByIdAndDelete = jest.fn().mockRejectedValue(false);

      await deleteCollection(req, res, next);

      expect(next).toHaveBeenCalledWith(error);
      expect(next.mock.calls[0][0]).toHaveProperty("code", error.code);
      expect(next.mock.calls[0][0]).toHaveProperty("message", error.message);
    });
  });

  describe("When it receives a valid idCollection and idUser", () => {
    test("Then it should called the method json message and id deleted", async () => {
      const idUser = "619d380da88c81eb05dd1666";
      const idCollection = "619d5b5f4b6e7ff3fads64bf3c96";
      const params = idCollection;
      const res = mockResponse();
      const req = {
        params,
        idUser,
      };

      TattooArtistModel.findById = jest.fn().mockResolvedValue(idUser);
      collectionModel.findById = jest.fn().mockResolvedValue(idCollection);

      collectionModel.findByIdAndDelete = jest.fn();
      TattooArtistModel.findById = jest.fn().mockResolvedValue({
        save: jest.fn(),
        collections: {
          filter: jest.fn(),
        },
      });

      await deleteCollection(req, res, null);

      expect(res.json).toHaveBeenCalled();
    });
  });

  describe("When it receives a function next and rejected error", () => {
    test("Then it should called next function with the error object, error.message 'Id no encontrada' and error.code is 401", async () => {
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

describe("Given editCollection controller", () => {
  describe("When it receives req.params with id unexist", () => {
    test("Then it should called next function with error, message 'Colecci??n no encontrada', and code 404", async () => {
      const fileURL = "UrlImagen";
      const idCollection = false;
      const params = idCollection;
      const file = fileURL;

      const req = {
        params,
        file,
      };

      const next = jest.fn();

      const error = new CodeError("Colecci??n no encontrada");
      const codeError = 404;

      collectionModel.findById = jest.fn().mockResolvedValue(false);

      await editCollection(req, null, next);

      expect(next).toHaveBeenCalledWith(error);
      expect(next.mock.calls[0][0]).toHaveProperty("code", codeError);
      expect(next.mock.calls[0][0]).toHaveProperty("message", error.message);
    });
  });

  describe("When it receives req.params with id correct and collection modified", () => {
    test("Then it should called the method json with the collection edited", async () => {
      const fileURL = "UrlImagen";

      const idCollection = "619d5b5f4b6e7ff3fads64bf3c96";
      const body = {
        tattooStyles: "siii",
        image: "Hay que modificar para que sea con multer",
        works: [],
      };
      const params = { idCollection };
      const file = fileURL;

      const res = mockResponse();
      const req = {
        params,
        body,
        file,
      };

      const collectionEdited = {
        tattooStyles: "siii",
        image: "Hay que modificar para que sea con multer",
        works: [],
        id: "619df77b0396d1ff45fe32c4",
      };

      collectionModel.findByIdAndUpdate = jest.fn();
      collectionModel.findById = jest.fn().mockResolvedValue(collectionEdited);

      await editCollection(req, res, null);

      expect(res.json).toHaveBeenCalledWith(collectionEdited);
      expect(res.status).toHaveBeenCalledWith(202);
    });
  });

  describe("When it receives a function next and rejected error", () => {
    test("Then it should called next function with the error object, error.message 'No se ha podido modificar la colecci??n' and error.code is 401", async () => {
      const fileURL = "UrlImagen";

      const idCollection = "619d5b5f4b6e7ff3fads64bf3c96";
      const body = {
        tattooStyles: "siii",
        image: "Hay que modificar para que sea con multer",
        works: [],
      };
      const params = { idCollection };
      const file = fileURL;

      const req = {
        params,
        body,
        file,
      };

      const next = jest.fn();
      const error = new CodeError("No se ha podido modificar la colecci??n");
      const codeError = 404;

      collectionModel.findByIdAndUpdate = jest.fn();
      collectionModel.findById = jest.fn().mockRejectedValue(null);

      await editCollection(req, null, next);

      expect(next).toHaveBeenCalledWith(error);
      expect(next.mock.calls[0][0]).toHaveProperty("code", codeError);
      expect(next.mock.calls[0][0]).toHaveProperty("message", error.message);
    });
  });
});

describe("Given getCollections controller", () => {
  describe("When it receives res object", () => {
    test("Then it should called the method json with all collections", async () => {
      const id = "619d380da88c81eb05dd1666";

      const expectTattooArtistUser = {
        tattooArtistUser: { populate: jest.fn() },
      };
      const req = {
        idUser: id,
      };
      const res = mockResponse();

      TattooArtistModel.findById = jest.fn().mockReturnValue({
        populate: jest
          .fn()
          .mockResolvedValue(expectTattooArtistUser.tattooArtistUser),
      });
      await getCollections(req, res, null);

      expect(res.json).toHaveBeenCalledWith(expectTattooArtistUser);
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

      TattooArtistModel.findById = jest.fn().mockReturnValue(null);

      await getCollections(req, res, next);

      expect(next).toHaveBeenCalledWith(error);
      expect(next.mock.calls[0][0]).toHaveProperty("code", 404);
      expect(next.mock.calls[0][0]).toHaveProperty("message", "No encontrado");
    });
  });
});
