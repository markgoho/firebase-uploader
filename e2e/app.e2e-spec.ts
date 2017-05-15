import { FirebaseUploaderPage } from './app.po';

describe('firebase-uploader App', () => {
  let page: FirebaseUploaderPage;

  beforeEach(() => {
    page = new FirebaseUploaderPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
