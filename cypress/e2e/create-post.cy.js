describe("Login test", () => {
  it("Can log in with correct credentials", () => {
    cy.visit("https://jorgen-s-engh.github.io/Semester-Project-2/index.html");
    cy.get(".login_email").type("jorgen@stud.noroff.no");
    cy.get(".login_password").type("12345jorgen");
    cy.get(".login_btn").click();
    cy.get(".profile-img-small").click();
    cy.wait(500);
    cy.get('[data-bs-target="#new-listing-modal"]').click();
    cy.wait(500);
    cy.get(".CE-title-red").type("Some title");
    cy.wait(500);
    cy.get(".CE-end-date").type("2022-12-24");
    cy.get(".CE-desc").type("Def not cypress");
    cy.get(".new-listing-modal__btn").click();
  });
});
