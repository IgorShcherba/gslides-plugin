/* eslint-disable no-unused-vars */
/**
 * Executes when a user opens a presentation
 * @param {Event} event The open event.
 */
export const onOpen = event => {
  const menu = SlidesApp.getUi()
    .createMenu('✌ Rashomon ✌') // edit me!
    .addItem('Open Rashomon Add-on', 'openSidebar')
    .addSeparator()
    .addItem('Help', 'openModal');

  menu.addToUi();
};

/**
 * Executes when a user installs the add-on.
 * We call onOpen here so that the add-on menu appears immediately after installation without requiring the user to refresh the page
 * @param {Event} event The install event.
 */
export const onInstall = () => {
  onOpen();
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
