import { MahjongSolitairePage } from './app.po';

describe('mahjong-solitaire App', function() {
  let page: MahjongSolitairePage;

  beforeEach(() => {
    page = new MahjongSolitairePage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
