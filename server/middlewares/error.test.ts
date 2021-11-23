import ValidationError from "express-validation";
import { handlerNotFound, handlerGeneralError } from "./errors";

interface ResponseTest {
  status: () => void;
  json: () => void;
}

const mockResponse = () => {
  const res: ResponseTest = {
    status: jest.fn().mockReturnThis(),
    json: jest.fn().mockReturnThis(),
  };
  return res;
};

describe("Given a handlerNotFound function", () => {
  describe("When an endpoint is not found ", () => {
    test("Then it should invoke the method json with a status 404 and a message `No se ha encontrado la ruta`", () => {
      const error = {
        error: "No se ha encontrado la ruta",
      };
      const res = mockResponse();

      handlerNotFound(null, res);
      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith(error);
    });
  });
});

describe("Given a handlerGeneralError function", () => {
  describe("When it receives an error", () => {
    test("Then it should invoke the method json with the error message 'ERROR' and the method status with 500", () => {
      const error = {
        error: "ERROR",
      };

      const next = jest.fn();
      const res = mockResponse();

      handlerGeneralError(error, null, res, next);
      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith(error);
    });
  });
});
