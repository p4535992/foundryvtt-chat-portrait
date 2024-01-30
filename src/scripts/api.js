import CONSTANTS from "./constants.js";
import { error } from "./lib/lib.js";
import { SYSTEMS } from "./systems.js";
const API = {
  /**
   * The attributes used to track dynamic attributes in this system
   *
   * @returns {array}
   */
  get imageReplacerDamageType() {
    let arr = game.settings.get(CONSTANTS.MODULE_ID, "imageReplacerDamageType") || [];
    if (arr.length <= 0) {
      arr = SYSTEMS.DATA?.imageReplacerDamageType;
    }
    return arr;
  },
  /**
   * Sets the inAttribute used to track the passive perceptions in this system
   *
   * @param {String} inAttribute
   * @returns {Promise}
   */
  async setImageReplacerDamageType(inAttribute) {
    if (typeof inAttribute !== "string") {
      throw error("setImageReplacerDamageType | inAttribute must be of type string");
    }
    await game.settings.set(CONSTANTS.MODULE_ID, "preconfiguredSystem", true);
    return game.settings.set(CONSTANTS.MODULE_ID, "imageReplacerDamageType", inAttribute);
  },
  /**
   * The attributes used to track dynamic attributes in this system
   *
   * @returns {array}
   */
  get imageReplacerWeaponProperties() {
    let arr = game.settings.get(CONSTANTS.MODULE_ID, "imageReplacerWeaponProperties") || [];
    if (arr.length <= 0) {
      arr = SYSTEMS.DATA?.imageReplacerWeaponProperties;
    }
    return arr;
  },
  /**
   * Sets the inAttribute used to track the passive perceptions in this system
   *
   * @param {String} inAttribute
   * @returns {Promise}
   */
  async setImageReplacerWeaponProperties(inAttribute) {
    if (typeof inAttribute !== "string") {
      throw error("setImageReplacerWeaponProperties | inAttribute must be of type string");
    }
    await game.settings.set(CONSTANTS.MODULE_ID, "preconfiguredSystem", true);
    return game.settings.set(CONSTANTS.MODULE_ID, "imageReplacerWeaponProperties", inAttribute);
  },
  /**
   * The attributes used to track dynamic attributes in this system
   *
   * @returns {array}
   */
  get imageReplacerIconizer() {
    let arr = game.settings.get(CONSTANTS.MODULE_ID, "imageReplacerIconizer") || [];
    if (arr.length <= 0) {
      arr = SYSTEMS.DATA?.imageReplacerIconizer;
    }
    return arr;
  },
  /**
   * Sets the inAttribute used to track the passive perceptions in this system
   *
   * @param {String} inAttribute
   * @returns {Promise}
   */
  async setImageReplacerIconizer(inAttribute) {
    if (typeof inAttribute !== "string") {
      throw error("setImageReplacerIconizer | inAttribute must be of type string");
    }
    await game.settings.set(CONSTANTS.MODULE_ID, "preconfiguredSystem", true);
    return game.settings.set(CONSTANTS.MODULE_ID, "imageReplacerIconizer", inAttribute);
  },
  retrieveSystemId() {
    const sys = SYSTEMS.DATA?.SYSTEM_ID;
    if (sys && game.system.id === sys) {
      return sys;
    } else {
      return "generic";
    }
  },
};
export default API;
