/**
 * This function is invoked when a User opens Google Slide and the add-on has been installed
 */
export const onOpen = () => {
  const menu = SlidesApp.getUi()
    .createMenu('✌ Rashomon ✌') // edit me!
    .addItem('Slide Editor', 'openSidebar');

  menu.addToUi();
};

export const openSidebar = () => {
  const html = HtmlService.createHtmlOutputFromFile('sidebar').setTitle(
    'Rashomon.io'
  );
  SlidesApp.getUi().showSidebar(html);
};
