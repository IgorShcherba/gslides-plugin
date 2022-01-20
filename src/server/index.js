import * as publicUiFunctions from './ui';
import * as utils from './utils';
// Expose public functions by attaching to `global`
global.onOpen = publicUiFunctions.onOpen;
global.onInstall = publicUiFunctions.onInstall;

global.openSidebar = publicUiFunctions.openSidebar;
global.openModal = publicUiFunctions.openModal;

global.getActiveSlideTitle = utils.getActiveSlideTitle;
