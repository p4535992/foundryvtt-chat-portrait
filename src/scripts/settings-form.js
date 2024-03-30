import CONSTANTS from "./constants.js";
/**
 * Provides functionality for interaction with module settings
 */
export class SettingsForm {
    //#region getters and setters
    // static getBorderShapeList() {
    //     return game.settings.get(MODULE_ID, 'borderShapeList');
    // }
    static getDisableChatPortrait() {
        return game.settings.get(CONSTANTS.MODULE_ID, "disableChatPortrait");
    }
    static setDisableChatPortrait(value) {
        game.settings.set(CONSTANTS.MODULE_ID, "disableChatPortrait", value);
    }
    static getUseTokenImage() {
        return game.settings.get(CONSTANTS.MODULE_ID, "useTokenImage");
    }
    static setUseTokenImage(value) {
        game.settings.set(CONSTANTS.MODULE_ID, "useTokenImage", value);
    }
    static getDoNotUseTokenImageWithSpecificType() {
        return game.settings.get(CONSTANTS.MODULE_ID, "doNotUseTokenImageWithSpecificType");
    }
    static setDoNotUseTokenImageWithSpecificType(value) {
        game.settings.set(CONSTANTS.MODULE_ID, "doNotUseTokenImageWithSpecificType", value);
    }
    static getUseTokenName() {
        return game.settings.get(CONSTANTS.MODULE_ID, "useTokenName");
    }
    static setUseTokenName(value) {
        game.settings.set(CONSTANTS.MODULE_ID, "useTokenName", value);
    }
    static getPortraitSize() {
        return game.settings.get(CONSTANTS.MODULE_ID, "portraitSize");
    }
    static setPortraitSize(value) {
        game.settings.set(CONSTANTS.MODULE_ID, "portraitSize", value);
    }
    static getPortraitSizeItem() {
        return game.settings.get(CONSTANTS.MODULE_ID, "portraitSizeItem");
    }
    static setPortraitSizeItem(value) {
        game.settings.set(CONSTANTS.MODULE_ID, "portraitSizeItem", value);
    }
    static getBorderShape() {
        return game.settings.get(CONSTANTS.MODULE_ID, "borderShape");
    }
    static setBorderShape(value) {
        game.settings.set(CONSTANTS.MODULE_ID, "borderShape", value);
    }
    static getUseUserColorAsBorderColor() {
        return game.settings.get(CONSTANTS.MODULE_ID, "useUserColorAsBorderColor");
    }
    static setUseUserColorAsBorderColor(value) {
        game.settings.set(CONSTANTS.MODULE_ID, "useUserColorAsBorderColor", value);
    }
    static getBorderColor() {
        return game.settings.get(CONSTANTS.MODULE_ID, "borderColor");
    }
    static setBorderColor(value) {
        game.settings.set(CONSTANTS.MODULE_ID, "borderColor", value);
    }
    static getBorderWidth() {
        return game.settings.get(CONSTANTS.MODULE_ID, "borderWidth");
    }
    static setBorderWidth(value) {
        game.settings.set(CONSTANTS.MODULE_ID, "borderWidth", value);
    }
    static getUseUserColorAsChatBackgroundColor() {
        return game.settings.get(CONSTANTS.MODULE_ID, "useUserColorAsChatBackgroundColor");
    }
    static setUseUserColorAsChatBackgroundColor(value) {
        game.settings.set(CONSTANTS.MODULE_ID, "useUserColorAsChatBackgroundColor", value);
    }
    static getUseUserColorAsChatBorderColor() {
        return game.settings.get(CONSTANTS.MODULE_ID, "useUserColorAsChatBorderColor");
    }
    static setUseUserColorAsChatBorderColor(value) {
        game.settings.set(CONSTANTS.MODULE_ID, "useUserColorAsChatBorderColor", value);
    }
    // static getFlavorNextToPortrait() {
    // 	return <boolean>game.settings.get(CONSTANTS.MODULE_ID, "flavorNextToPortrait");
    // }
    // static setFlavorNextToPortrait(value: boolean) {
    // 	game.settings.set(CONSTANTS.MODULE_ID, "flavorNextToPortrait", value);
    // }
    static getForceNameSearch() {
        return game.settings.get(CONSTANTS.MODULE_ID, "forceNameSearch");
    }
    static setForceNameSearch(value) {
        game.settings.set(CONSTANTS.MODULE_ID, "forceNameSearch", value);
    }
    // static getHoverTooltip() {
    //     return <boolean>game.settings.get(CONSTANTS.MODULE_ID, 'hoverTooltip');
    // }
    // static setHoverTooltip(value:boolean) {
    //     game.settings.set(CONSTANTS.MODULE_ID,'hoverTooltip',value);
    // }
    static getTextSizeName() {
        return game.settings.get(CONSTANTS.MODULE_ID, "textSizeName");
    }
    static setTextSizeName(value) {
        game.settings.set(CONSTANTS.MODULE_ID, "textSizeName", value);
    }
    static getDisplaySetting() {
        return game.settings.get(CONSTANTS.MODULE_ID, "displaySetting");
    }
    static setDisplaySetting(value) {
        game.settings.set(CONSTANTS.MODULE_ID, "displaySetting", value);
    }
    static getUseAvatarImage() {
        return game.settings.get(CONSTANTS.MODULE_ID, "useAvatarImage");
    }
    static setUseAvatarImage(value) {
        game.settings.set(CONSTANTS.MODULE_ID, "useAvatarImage", value);
    }
    static getDisplayPlayerName() {
        return game.settings.get(CONSTANTS.MODULE_ID, "displayPlayerName");
    }
    static setDisplayPlayerName(value) {
        game.settings.set(CONSTANTS.MODULE_ID, "displayPlayerName", value);
    }
    //   static getDisplayUnknown() {
    //     return game.settings.get(CONSTANTS.MODULE_ID, "displayUnknown");
    //   }
    //   static setDisplayUnknown(value) {
    //     game.settings.set(CONSTANTS.MODULE_ID, "displayUnknown", value);
    //   }
    //   static getDisplayUnknownPlaceHolderActorName() {
    //     return game.settings.get(CONSTANTS.MODULE_ID, "displayUnknownPlaceHolderActorName");
    //   }
    //   static setDisplayUnknownPlaceHolderActorName(value) {
    //     game.settings.set(CONSTANTS.MODULE_ID, "displayUnknownPlaceHolderActorName", value);
    //   }
    //   static getDisplayUnknownPlaceHolderItemName() {
    //     return game.settings.get(CONSTANTS.MODULE_ID, "displayUnknownPlaceHolderItemName");
    //   }
    //   static setDisplayUnknownPlaceHolderItemName(value) {
    //     game.settings.set(CONSTANTS.MODULE_ID, "displayUnknownPlaceHolderItemName", value);
    //   }
    //   static getDisplayUnknownPlaceHolderItemIcon() {
    //     return game.settings.get(CONSTANTS.MODULE_ID, "displayUnknownPlaceHolderItemIcon");
    //   }
    //   static setDisplayUnknownPlaceHolderItemIcon(value) {
    //     game.settings.set(CONSTANTS.MODULE_ID, "displayUnknownPlaceHolderItemIcon", value);
    //   }
    static getDisplaySettingOTHER() {
        return game.settings.get(CONSTANTS.MODULE_ID, "displaySettingOTHER");
    }
    static setDisplaySettingOTHER(value) {
        game.settings.set(CONSTANTS.MODULE_ID, "displaySettingOTHER", value);
    }
    static getDisplaySettingOOC() {
        return game.settings.get(CONSTANTS.MODULE_ID, "displaySettingOOC");
    }
    static setDisplaySettingOOC(value) {
        game.settings.set(CONSTANTS.MODULE_ID, "displaySettingOOC", value);
    }
    static getDisplaySettingIC() {
        return game.settings.get(CONSTANTS.MODULE_ID, "displaySettingIC");
    }
    static setDisplaySettingIC(value) {
        game.settings.set(CONSTANTS.MODULE_ID, "displaySettingIC", value);
    }
    static getDisplaySettingEMOTE() {
        return game.settings.get(CONSTANTS.MODULE_ID, "displaySettingEMOTE");
    }
    static setDisplaySettingEMOTE(value) {
        game.settings.set(CONSTANTS.MODULE_ID, "displaySettingEMOTE", value);
    }
    static getDisplaySettingWHISPER() {
        return game.settings.get(CONSTANTS.MODULE_ID, "displaySettingWHISPER");
    }
    static setDisplaySettingWHISPER(value) {
        game.settings.set(CONSTANTS.MODULE_ID, "displaySettingWHISPER", value);
    }
    static getDisplaySettingROLL() {
        return game.settings.get(CONSTANTS.MODULE_ID, "displaySettingROLL");
    }
    static setDisplaySettingROLL(value) {
        game.settings.set(CONSTANTS.MODULE_ID, "displaySettingROLL", value);
    }
    static getDisplaySettingWhisperToOther() {
        return game.settings.get(CONSTANTS.MODULE_ID, "displaySettingWhisperToOther");
    }
    static setDisplaySettingWhisperToOther(value) {
        game.settings.set(CONSTANTS.MODULE_ID, "displaySettingWhisperToOther", value);
    }
    // static getCustomStylingMessageSystem() {
    //   return <boolean>game.settings.get(CONSTANTS.MODULE_ID, 'customStylingMessageSystem');
    // }
    // static setCustomStylingMessageSystem(value: boolean) {
    //   game.settings.set(CONSTANTS.MODULE_ID, 'customStylingMessageSystem', value);
    // }
    static getCustomStylingMessageText() {
        return game.settings.get(CONSTANTS.MODULE_ID, "customStylingMessageText");
    }
    static setCustomStylingMessageText(value) {
        game.settings.set(CONSTANTS.MODULE_ID, "customStylingMessageText", value);
    }
    static getCustomStylingMessageImage() {
        return game.settings.get(CONSTANTS.MODULE_ID, "customStylingMessageImage");
    }
    static setCustomStylingMessageImage(value) {
        game.settings.set(CONSTANTS.MODULE_ID, "customStylingMessageImage", value);
    }
    static getDisplayMessageTag() {
        return game.settings.get(CONSTANTS.MODULE_ID, "displayMessageTag");
    }
    static setDisplayMessageTag(value) {
        game.settings.set(CONSTANTS.MODULE_ID, "displayMessageTag", value);
    }
    // static getDisplayMessageTagNextToName() {
    // 	return <boolean>game.settings.get(CONSTANTS.MODULE_ID, "displayMessageTagNextToName");
    // }
    // static setDisplayMessageTagNextToName(value: boolean) {
    // 	game.settings.set(CONSTANTS.MODULE_ID, "displayMessageTagNextToName", value);
    // }
    static getUseImageReplacer() {
        return game.settings.get(CONSTANTS.MODULE_ID, "useImageReplacer");
    }
    static setUseImageReplacer(value) {
        game.settings.set(CONSTANTS.MODULE_ID, "useImageReplacer", value);
    }
    static getUseImageReplacerDamageType() {
        return game.settings.get(CONSTANTS.MODULE_ID, "useImageReplacerDamageType");
    }
    static setUseImageReplacerDamageType(value) {
        game.settings.set(CONSTANTS.MODULE_ID, "useImageReplacerDamageType", value);
    }
    static getApplyOnCombatTracker() {
        return game.settings.get(CONSTANTS.MODULE_ID, "applyOnCombatTracker");
    }
    static setApplyOnCombatTracker(value) {
        game.settings.set(CONSTANTS.MODULE_ID, "applyOnCombatTracker", value);
    }
    // static getApplyPreCreateChatMessagePatch() {
    // 	return <boolean>game.settings.get(CONSTANTS.MODULE_ID, "applyPreCreateChatMessagePatch");
    // }
    // static setApplyPreCreateChatMessagePatch(value: boolean) {
    // 	game.settings.set(CONSTANTS.MODULE_ID, "applyPreCreateChatMessagePatch", value);
    // }
    static getDisablePortraitForAliasGmMessage() {
        return game.settings.get(CONSTANTS.MODULE_ID, "disablePortraitForAliasGmMessage");
    }
    static setDisablePortraitForAliasGmMessage(value) {
        game.settings.set(CONSTANTS.MODULE_ID, "disablePortraitForAliasGmMessage", value);
    }
    static getSetUpPortraitForAliasGmMessage() {
        return game.settings.get(CONSTANTS.MODULE_ID, "setUpPortraitForAliasGmMessage");
    }
    static setSetUpPortraitForAliasGmMessage(value) {
        game.settings.set(CONSTANTS.MODULE_ID, "setUpPortraitForAliasGmMessage", value);
    }
}
