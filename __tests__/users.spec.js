/* eslint-disable no-undef */
const request = require("supertest");
const app = require("../src/app");

describe("POST /users", () => {
  it("return status code 200", (done) => {
    request(app)
      .post("/api/v1/users")
      .send({
        username: "user1",
        email: "user1@email.com",
        password: "P@4Word",
      })
      .expect({ message: "User created successfully" })
      .expect(200, done);
  });
  it("return error 400 if validation fails", (done) => {
    request(app)
      .post("/api/v1/users")
      .send({
        username: "",
        email: "asd",
        password: "P@",
      })
      .expect(400, done);
  });
});
