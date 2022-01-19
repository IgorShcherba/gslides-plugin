/**
 * This function is invoked when a User opens Google Slide and the add-on has been installed.
 * It adds menu items for the add-on
 */
export const onOpen = () => {
  const menu = SlidesApp.getUi()
    .createMenu('✌ Rashomon ✌') // edit me!
    .addItem('Open Rashomon Add-on', 'openSidebar')
    .addSeparator()
    .addItem('Help', 'openModal');

  menu.addToUi();
};

export const openSidebar = () => {
  const html = HtmlService.createHtmlOutputFromFile('sidebar').setTitle(
    'Rashomon'
  );
  SlidesApp.getUi().showSidebar(html);
};

export const openModal = () => {
  const html = HtmlService.createHtmlOutputFromFile('modal');

  SlidesApp.getUi().showModalDialog(
    html,
    'Help for Rashomon Google Slides Add-on'
  );
};
