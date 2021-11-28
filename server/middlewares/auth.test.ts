import jwt from "jsonwebtoken";
import auth from "./auth";

jest.mock("jsonwebtoken");

class CodeError extends Error {
  code: number | undefined;
}

describe("Given a auth function", () => {
  describe("When it receives an request whitout an authHeader", () => {
    test("Then it should return error with message 'No estás autorizado' and code 401", () => {
      const req = { header: jest.fn() };
      const next = jest.fn();
      const error = new CodeError("No estás autorizado");
      error.code = 401;

      auth(req, null, next);

      expect(next).toHaveBeenCalledWith(error);
      expect(next.mock.calls[0][0]).toHaveProperty("message", error.message);
      expect(next.mock.calls[0][0]).toHaveProperty("code", error.code);
    });
  });

  describe("When it receives a Authorization request without token", () => {
    test("Then it should return error with message 'No estás autorizado' and code 401", () => {
      const req = {
        header: jest.fn().mockReturnValue("No"),
      };

      const next = jest.fn();
      const error = new CodeError("No estás autorizado");
      error.code = 401;

      auth(req, null, next);

      expect(next).toHaveBeenCalledWith(error);
      expect(next.mock.calls[0][0]).toHaveProperty("message", error.message);
      expect(next.mock.calls[0][0]).toHaveProperty("code", error.code);
    });
  });

  describe("When it receives a Authorization request and valid token", () => {
    test("Then it should return invoke next function without error", () => {
      const req = {
        header: jest
          .fn()
          .mockReturnValue(
            "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6IkNhcmxpdHVzIiwiaWQiOiI2MThlY2NlYTY4OWQ4NzlhYzNmODU1NzciLCJuYW1lIjoiQ2FybGl0b3MiLCJhZ2UiOjMzLCJmcmllbmRzIjpbXSwiZW5lbWllcyI6W10sImltYWdlIjoiaHR0cHM6Ly9jZG5zLmljb25tb25zdHIuY29tL3dwLWNvbnRlbnQvYXNzZXRzL3ByZXZpZXcvMjAxMi8yNDAvaWNvbm1vbnN0ci11c2VyLTE0LnBuZyIsImlhdCI6MTYzNjgwNzg3NH0.nVz9ZoTSP8pthcrFvpHQV4YFMKn1pGfcOGPNjvEcahY"
          ),
      };
      const next = jest.fn();
      jwt.verify = jest.fn().mockReturnValue({});

      auth(req, null, next);

      expect(next).toHaveBeenCalled();
    });
  });

  describe("When it receives a Authorization request with the invalid token", () => {
    test("Then it should return error with message 'Token no válido' and code 401", () => {
      const req = {
        header: jest.fn().mockReturnValue("Bearer INVALIDTOKEN"),
      };

      const next = jest.fn();
      const error = new CodeError("Token no válido");
      error.code = 401;
      jwt.verify = jest.fn().mockReturnValue(null);

      auth(req, null, next);

      expect(next).toHaveBeenCalledWith(error);
      expect(next.mock.calls[0][0]).toHaveProperty("message", error.message);
      expect(next.mock.calls[0][0]).toHaveProperty("code", error.code);
    });
  });
});
