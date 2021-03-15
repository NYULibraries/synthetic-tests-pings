module.exports = {
  'Get title': (browser) => {
    browser
      .url('https://bobcat.library.nyu.edu/primo-explore/search?vid=NYU')
      .setValue('#searchBar', 'catcher in the rye')
      .click('button.button-confirm')
      .assert.title('BobCat - catcher in the rye')
      .assert.elementPresent(".results-container > div.first-in-page");
  },
};
