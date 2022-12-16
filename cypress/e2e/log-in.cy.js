describe("Login test", () => {
  it("Can log in with correct credentials", () => {
    cy.visit("https://jorgen-s-engh.github.io/Semester-Project-2/index.html");
    cy.get(".login_email").type("jorgen@stud.noroff.no");
    cy.get(".login_password").type("12345jorgen");
    cy.get(".login_btn").click();
  });
});
