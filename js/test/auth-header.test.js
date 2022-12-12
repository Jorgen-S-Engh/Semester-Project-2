import postOptions from "./auth-header.mjs";

describe("postOptions", () => {
  it("Return POST", () => {
    expect(postOptions.method).toEqual("POST");
  })
});