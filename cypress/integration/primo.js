describe("when searching", () => {
  beforeEach(() => {
    cy.visit("https://bobcat.library.nyu.edu/primo-explore/search?vid=NYU")
  });

  it('performs a search', () => {
    cy.get('#searchBar')
      .type("catcher in the rye{enter}");
    cy.title().should("eq", "BobCat - catcher in the rye");
    cy.get(".results-container").children().should("exist");
  });
});
