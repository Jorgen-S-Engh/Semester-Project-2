import { baseUrl } from "../components/baseUrl";

describe("Checks API url", () => {
  it("Checks baseUrl and endPoint make the correct api-url", () => {
    expect(`${baseUrl}/auction/listings`).toEqual("https://nf-api.onrender.com/api/v1/auction/listings");
  });
});