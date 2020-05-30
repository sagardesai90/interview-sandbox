describe("My First Test", () => {
  it("Go from Home page to Coding page", () => {
    cy.visit("/");

    cy.contains("Let's go").click();
  });

  it("Contains the Code Mirror element", () => {
    cy.contains('print("happy coding")');
  });

  it("Contains the Dropdown Menu", () => {
    cy.contains("Select Language").click();

    cy.contains("Javascript").click();
    cy.contains("Python").click();
    cy.contains("Ruby").click();
    cy.contains("Swift").click();
    cy.contains("Python").click();
  });

  it("Contains the Code Output Element", () => {
    cy.contains("Run Code").click();
  });

  it("Contains the Whiteboard Element", () => {
    cy.get("iframe");
  });

  it("Contains the Video Chat Element", () => {
    cy.get("Video");
  });
});
