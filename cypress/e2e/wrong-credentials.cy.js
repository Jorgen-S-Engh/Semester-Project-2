describe("Login test", () => {
  it("Logs inn with wrong credentials and display error message", () => {
    cy.visit("https://jorgen-s-engh.github.io/Semester-Project-2/index.html");
    cy.get(".login_email").type("jorgen@noroff.no");
    cy.get(".login_password").type("12345jorgen");
    cy.get(".login_btn").click();
    cy.wait(1000);
    cy.get(".create_account_error").contains(
      "Only emails ending in @stud.noroff.no may Log in"
    );
  });
});
