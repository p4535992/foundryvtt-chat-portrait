import CONSTANTS from "./constants.js";
/**
 * Provides functionality for interaction with module settings
 */
export class SettingsForm {
  //#region getters and setters
  // static getBorderShapeList() {
  //     return game.settings.get(MODULE_NAME, 'borderShapeList');
  // }
  static getUseTokenImage() {
    return game.settings.get(CONSTANTS.MODULE_NAME, "useTokenImage");
  }
  static setUseTokenImage(value) {
    game.settings.set(CONSTANTS.MODULE_NAME, "useTokenImage", value);
  }
  static getDoNotUseTokenImageWithSpecificType() {
    return game.settings.get(CONSTANTS.MODULE_NAME, "doNotUseTokenImageWithSpecificType");
  }
  static setDoNotUseTokenImageWithSpecificType(value) {
    game.settings.set(CONSTANTS.MODULE_NAME, "doNotUseTokenImageWithSpecificType", value);
  }
  static getUseTokenName() {
    return game.settings.get(CONSTANTS.MODULE_NAME, "useTokenName");
  }
  static setUseTokenName(value) {
    game.settings.set(CONSTANTS.MODULE_NAME, "useTokenName", value);
  }
  static getPortraitSize() {
    return game.settings.get(CONSTANTS.MODULE_NAME, "portraitSize");
  }
  static setPortraitSize(value) {
    game.settings.set(CONSTANTS.MODULE_NAME, "portraitSize", value);
  }
  static getPortraitSizeItem() {
    return game.settings.get(CONSTANTS.MODULE_NAME, "portraitSizeItem");
  }
  static setPortraitSizeItem(value) {
    game.settings.set(CONSTANTS.MODULE_NAME, "portraitSizeItem", value);
  }
  static getBorderShape() {
    return game.settings.get(CONSTANTS.MODULE_NAME, "borderShape");
  }
  static setBorderShape(value) {
    game.settings.set(CONSTANTS.MODULE_NAME, "borderShape", value);
  }
  static getUseUserColorAsBorderColor() {
    return game.settings.get(CONSTANTS.MODULE_NAME, "useUserColorAsBorderColor");
  }
  static setUseUserColorAsBorderColor(value) {
    game.settings.set(CONSTANTS.MODULE_NAME, "useUserColorAsBorderColor", value);
  }
  static getBorderColor() {
    return game.settings.get(CONSTANTS.MODULE_NAME, "borderColor");
  }
  static setBorderColor(value) {
    game.settings.set(CONSTANTS.MODULE_NAME, "borderColor", value);
  }
  static getBorderWidth() {
    return game.settings.get(CONSTANTS.MODULE_NAME, "borderWidth");
  }
  static setBorderWidth(value) {
    game.settings.set(CONSTANTS.MODULE_NAME, "borderWidth", value);
  }
  static getUseUserColorAsChatBackgroundColor() {
    return game.settings.get(CONSTANTS.MODULE_NAME, "useUserColorAsChatBackgroundColor");
  }
  static setUseUserColorAsChatBackgroundColor(value) {
    game.settings.set(CONSTANTS.MODULE_NAME, "useUserColorAsChatBackgroundColor", value);
  }
  static getUseUserColorAsChatBorderColor() {
    return game.settings.get(CONSTANTS.MODULE_NAME, "useUserColorAsChatBorderColor");
  }
  static setUseUserColorAsChatBorderColor(value) {
    game.settings.set(CONSTANTS.MODULE_NAME, "useUserColorAsChatBorderColor", value);
  }
  // static getFlavorNextToPortrait() {
  // 	return <boolean>game.settings.get(CONSTANTS.MODULE_NAME, "flavorNextToPortrait");
  // }
  // static setFlavorNextToPortrait(value: boolean) {
  // 	game.settings.set(CONSTANTS.MODULE_NAME, "flavorNextToPortrait", value);
  // }
  static getForceNameSearch() {
    return game.settings.get(CONSTANTS.MODULE_NAME, "forceNameSearch");
  }
  static setForceNameSearch(value) {
    game.settings.set(CONSTANTS.MODULE_NAME, "forceNameSearch", value);
  }
  // static getHoverTooltip() {
  //     return <boolean>game.settings.get(CONSTANTS.MODULE_NAME, 'hoverTooltip');
  // }
  // static setHoverTooltip(value:boolean) {
  //     game.settings.set(CONSTANTS.MODULE_NAME,'hoverTooltip',value);
  // }
  static getTextSizeName() {
    return game.settings.get(CONSTANTS.MODULE_NAME, "textSizeName");
  }
  static setTextSizeName(value) {
    game.settings.set(CONSTANTS.MODULE_NAME, "textSizeName", value);
  }
  static getDisplaySetting() {
    return game.settings.get(CONSTANTS.MODULE_NAME, "displaySetting");
  }
  static setDisplaySetting(value) {
    game.settings.set(CONSTANTS.MODULE_NAME, "displaySetting", value);
  }
  static getUseAvatarImage() {
    return game.settings.get(CONSTANTS.MODULE_NAME, "useAvatarImage");
  }
  static setUseAvatarImage(value) {
    game.settings.set(CONSTANTS.MODULE_NAME, "useAvatarImage", value);
  }
  static getDisplayPlayerName() {
    return game.settings.get(CONSTANTS.MODULE_NAME, "displayPlayerName");
  }
  static setDisplayPlayerName(value) {
    game.settings.set(CONSTANTS.MODULE_NAME, "displayPlayerName", value);
  }
  //   static getDisplayUnknown() {
  //     return game.settings.get(CONSTANTS.MODULE_NAME, "displayUnknown");
  //   }
  //   static setDisplayUnknown(value) {
  //     game.settings.set(CONSTANTS.MODULE_NAME, "displayUnknown", value);
  //   }
  //   static getDisplayUnknownPlaceHolderActorName() {
  //     return game.settings.get(CONSTANTS.MODULE_NAME, "displayUnknownPlaceHolderActorName");
  //   }
  //   static setDisplayUnknownPlaceHolderActorName(value) {
  //     game.settings.set(CONSTANTS.MODULE_NAME, "displayUnknownPlaceHolderActorName", value);
  //   }
  //   static getDisplayUnknownPlaceHolderItemName() {
  //     return game.settings.get(CONSTANTS.MODULE_NAME, "displayUnknownPlaceHolderItemName");
  //   }
  //   static setDisplayUnknownPlaceHolderItemName(value) {
  //     game.settings.set(CONSTANTS.MODULE_NAME, "displayUnknownPlaceHolderItemName", value);
  //   }
  //   static getDisplayUnknownPlaceHolderItemIcon() {
  //     return game.settings.get(CONSTANTS.MODULE_NAME, "displayUnknownPlaceHolderItemIcon");
  //   }
  //   static setDisplayUnknownPlaceHolderItemIcon(value) {
  //     game.settings.set(CONSTANTS.MODULE_NAME, "displayUnknownPlaceHolderItemIcon", value);
  //   }
  static getDisplaySettingOTHER() {
    return game.settings.get(CONSTANTS.MODULE_NAME, "displaySettingOTHER");
  }
  static setDisplaySettingOTHER(value) {
    game.settings.set(CONSTANTS.MODULE_NAME, "displaySettingOTHER", value);
  }
  static getDisplaySettingOOC() {
    return game.settings.get(CONSTANTS.MODULE_NAME, "displaySettingOOC");
  }
  static setDisplaySettingOOC(value) {
    game.settings.set(CONSTANTS.MODULE_NAME, "displaySettingOOC", value);
  }
  static getDisplaySettingIC() {
    return game.settings.get(CONSTANTS.MODULE_NAME, "displaySettingIC");
  }
  static setDisplaySettingIC(value) {
    game.settings.set(CONSTANTS.MODULE_NAME, "displaySettingIC", value);
  }
  static getDisplaySettingEMOTE() {
    return game.settings.get(CONSTANTS.MODULE_NAME, "displaySettingEMOTE");
  }
  static setDisplaySettingEMOTE(value) {
    game.settings.set(CONSTANTS.MODULE_NAME, "displaySettingEMOTE", value);
  }
  static getDisplaySettingWHISPER() {
    return game.settings.get(CONSTANTS.MODULE_NAME, "displaySettingWHISPER");
  }
  static setDisplaySettingWHISPER(value) {
    game.settings.set(CONSTANTS.MODULE_NAME, "displaySettingWHISPER", value);
  }
  static getDisplaySettingROLL() {
    return game.settings.get(CONSTANTS.MODULE_NAME, "displaySettingROLL");
  }
  static setDisplaySettingROLL(value) {
    game.settings.set(CONSTANTS.MODULE_NAME, "displaySettingROLL", value);
  }
  static getDisplaySettingWhisperToOther() {
    return game.settings.get(CONSTANTS.MODULE_NAME, "displaySettingWhisperToOther");
  }
  static setDisplaySettingWhisperToOther(value) {
    game.settings.set(CONSTANTS.MODULE_NAME, "displaySettingWhisperToOther", value);
  }
  // static getCustomStylingMessageSystem() {
  //   return <boolean>game.settings.get(CONSTANTS.MODULE_NAME, 'customStylingMessageSystem');
  // }
  // static setCustomStylingMessageSystem(value: boolean) {
  //   game.settings.set(CONSTANTS.MODULE_NAME, 'customStylingMessageSystem', value);
  // }
  static getCustomStylingMessageText() {
    return game.settings.get(CONSTANTS.MODULE_NAME, "customStylingMessageText");
  }
  static setCustomStylingMessageText(value) {
    game.settings.set(CONSTANTS.MODULE_NAME, "customStylingMessageText", value);
  }
  static getCustomStylingMessageImage() {
    return game.settings.get(CONSTANTS.MODULE_NAME, "customStylingMessageImage");
  }
  static setCustomStylingMessageImage(value) {
    game.settings.set(CONSTANTS.MODULE_NAME, "customStylingMessageImage", value);
  }
  static getDisplayMessageTag() {
    return game.settings.get(CONSTANTS.MODULE_NAME, "displayMessageTag");
  }
  static setDisplayMessageTag(value) {
    game.settings.set(CONSTANTS.MODULE_NAME, "displayMessageTag", value);
  }
  // static getDisplayMessageTagNextToName() {
  // 	return <boolean>game.settings.get(CONSTANTS.MODULE_NAME, "displayMessageTagNextToName");
  // }
  // static setDisplayMessageTagNextToName(value: boolean) {
  // 	game.settings.set(CONSTANTS.MODULE_NAME, "displayMessageTagNextToName", value);
  // }
  static getUseImageReplacer() {
    return game.settings.get(CONSTANTS.MODULE_NAME, "useImageReplacer");
  }
  static setUseImageReplacer(value) {
    game.settings.set(CONSTANTS.MODULE_NAME, "useImageReplacer", value);
  }
  static getUseImageReplacerDamageType() {
    return game.settings.get(CONSTANTS.MODULE_NAME, "useImageReplacerDamageType");
  }
  static setUseImageReplacerDamageType(value) {
    game.settings.set(CONSTANTS.MODULE_NAME, "useImageReplacerDamageType", value);
  }
  static getApplyOnCombatTracker() {
    return game.settings.get(CONSTANTS.MODULE_NAME, "applyOnCombatTracker");
  }
  static setApplyOnCombatTracker(value) {
    game.settings.set(CONSTANTS.MODULE_NAME, "applyOnCombatTracker", value);
  }
  // static getApplyPreCreateChatMessagePatch() {
  // 	return <boolean>game.settings.get(CONSTANTS.MODULE_NAME, "applyPreCreateChatMessagePatch");
  // }
  // static setApplyPreCreateChatMessagePatch(value: boolean) {
  // 	game.settings.set(CONSTANTS.MODULE_NAME, "applyPreCreateChatMessagePatch", value);
  // }
  static getDisablePortraitForAliasGmMessage() {
    return game.settings.get(CONSTANTS.MODULE_NAME, "disablePortraitForAliasGmMessage");
  }
  static setDisablePortraitForAliasGmMessage(value) {
    game.settings.set(CONSTANTS.MODULE_NAME, "disablePortraitForAliasGmMessage", value);
  }
  static getSetUpPortraitForAliasGmMessage() {
    return game.settings.get(CONSTANTS.MODULE_NAME, "setUpPortraitForAliasGmMessage");
  }
  static setSetUpPortraitForAliasGmMessage(value) {
    game.settings.set(CONSTANTS.MODULE_NAME, "setUpPortraitForAliasGmMessage", value);
  }
}
