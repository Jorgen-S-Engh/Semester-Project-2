describe("Login test", () => {
  it("Can log in with correct credentials", () => {
    cy.visit("https://jorgen-s-engh.github.io/Semester-Project-2/index.html");
    cy.get(".login_email").type("jorgen@stud.noroff.no");
    cy.get(".login_password").type("12345jorgen");
    cy.get(".login_btn").click();
    cy.get(".profile-img-small").click();
    cy.get('[data-bs-target="#change-avatar-modal"]').click();
    cy.wait(1000);
    cy.get(".CA-media").type(
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTHmCgtELKdJbKxv1eRwpVU-h0OlnpWS0hsqoprRrfSq_eoDMQO2hv5XSPho0rAPQOMz7A&usqp=CAU"
    );
    cy.wait(1000);
    cy.get("button").eq(1).click();
    cy.end();
  });
});
