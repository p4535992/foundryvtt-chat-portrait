import CONSTANTS from "./constants.js";
export const preloadTemplates = async function () {
  const templatePaths = [
    // Add paths to "module/XXX/templates"
    //`modules/${MODULE_ID}/templates/XXX.html`,
    `modules/${CONSTANTS.MODULE_ID}/templates/chat-portrait-form.html`,
    // `modules/${CONSTANTS.MODULE_ID}/templates/instructions.html`,
  ];
  return loadTemplates(templatePaths);
};
