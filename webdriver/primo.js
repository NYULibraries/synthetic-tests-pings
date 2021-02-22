describe('My Login application', () => {
  beforeEach(() => {
    browser.url('https://bobcat.library.nyu.edu/primo-explore/search?vid=NYU');
  });
  it('should have a search bar', () => {
    expect($('#searchBar')).toBeExisting();
  });
//   it('should search for books successfully', () => {
//     $('#searchBar').setValue("catcher in the rye");
//     $('button[type="button"]').click();
//     expect($('h3.item-title')).toContain('~{{');
//   });
});
