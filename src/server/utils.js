/* eslint-disable no-restricted-syntax */
const isTitle = pageElement => {
  if (
    !pageElement ||
    pageElement.getPageElementType() !== SlidesApp.PageElementType.SHAPE
  ) {
    return false;
  }

  const type = pageElement.asShape().getPlaceholderType();

  if (
    type === SlidesApp.PlaceholderType.CENTERED_TITLE ||
    type === SlidesApp.PlaceholderType.TITLE
  ) {
    return true;
  }

  return false;
};

export const getActiveSlideTitle = () => {
  const presentation = SlidesApp.getActivePresentation();

  const selection = presentation.getSelection();

  if (selection) {
    const allSlideElements = selection.getCurrentPage().getPageElements();

    let title = null;
    for (const element of allSlideElements) {
      if (isTitle(element)) {
        title = element
          .asShape()
          .getText()
          .asString();
        break;
      }
    }

    return title;
  }
  return null;
};

export const getAllTitles = () => {
  return [];
};
