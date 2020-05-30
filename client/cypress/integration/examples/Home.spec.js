describe("My First Test", () => {
  it("Gets, types and asserts", () => {
    cy.visit("/");

    cy.contains("Let's go");
  });
});
