import * as publicUiFunctions from './ui';

// Expose public functions by attaching to `global`
global.onOpen = publicUiFunctions.onOpen;

global.openSidebar = publicUiFunctions.openSidebar;
global.openModal = publicUiFunctions.openModal;
