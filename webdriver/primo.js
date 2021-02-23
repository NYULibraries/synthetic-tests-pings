describe("Primo search feature", () => {
  beforeEach(() => {
    browser.url("https://bobcat.library.nyu.edu/primo-explore/search?vid=NYU");
  });

  it("should have a search bar", () => {
    expect($("#searchBar")).toBeExisting();
  });

  it("should search for books successfully", () => {
    $("#searchBar").setValue("catcher in the rye");
    $("button.button-confirm").click();

    expect(browser).toHaveTitle("BobCat - catcher in the rye");
    expect($("#searchResultPage1")).toHaveChildren();
  });
});
