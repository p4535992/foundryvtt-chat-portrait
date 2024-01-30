// import { ChatPortraitForm } from './ChatPortraitForm';
import CONSTANTS from "./constants.js";
import { i18n } from "./lib/lib.js";
import { SYSTEMS } from "./systems.js";
// export const CONSTANTS.MODULE_ID = 'chat-portrait';
// export const INV_UNIDENTIFIED_BOOK = `modules/${CONSTANTS.MODULE_ID}/assets/inv-unidentified-book.png`;
// export const CHAT_PORTRAIT_DEF_TOKEN_IMG_NAME = 'mystery-man';
export const registerSettings = function () {
  game.settings.registerMenu(CONSTANTS.MODULE_ID, "resetAllSettings", {
    name: `${CONSTANTS.MODULE_ID}.setting.reset.name`,
    hint: `${CONSTANTS.MODULE_ID}.setting.reset.hint`,
    icon: "fas fa-coins",
    type: ResetSettingsDialog,
    restricted: true,
  });
  // =====================================================================
  // game.settings.registerMenu(CONSTANTS.MODULE_ID, CONSTANTS.MODULE_ID, {
  //   name: i18n(CONSTANTS.MODULE_ID + '.form'),
  //   label: i18n(CONSTANTS.MODULE_ID + '.form-title'),
  //   hint: i18n(CONSTANTS.MODULE_ID + '.form-hint'),
  //   icon: 'fas fa-portrait',
  //   type: ChatPortraitForm,
  //   restricted: true,
  // });
  // Form setitngs
  game.settings.register(CONSTANTS.MODULE_ID, "useTokenImage", {
    name: `${CONSTANTS.MODULE_ID}.settings.useTokenImage.name`,
    hint: `${CONSTANTS.MODULE_ID}.settings.useTokenImage.hint`,
    scope: "client",
    config: true,
    type: Boolean,
    default: false,
  });
  game.settings.register(CONSTANTS.MODULE_ID, "doNotUseTokenImageWithSpecificType", {
    name: `${CONSTANTS.MODULE_ID}.settings.doNotUseTokenImageWithSpecificType.name`,
    hint: `${CONSTANTS.MODULE_ID}.settings.doNotUseTokenImageWithSpecificType.hint`,
    scope: "world",
    config: true,
    type: String,
    default: "",
  });
  game.settings.register(CONSTANTS.MODULE_ID, "useTokenName", {
    name: `${CONSTANTS.MODULE_ID}.settings.useTokenName.name`,
    hint: `${CONSTANTS.MODULE_ID}.settings.useTokenName.hint`,
    scope: "client",
    config: true,
    type: Boolean,
    default: false,
  });
  game.settings.register(CONSTANTS.MODULE_ID, "useAvatarImage", {
    name: `${CONSTANTS.MODULE_ID}.settings.useAvatarImage.name`,
    hint: `${CONSTANTS.MODULE_ID}.settings.useAvatarImage.hint`,
    scope: "client",
    config: true,
    type: Boolean,
    default: false,
  });
  game.settings.register(CONSTANTS.MODULE_ID, "displayPlayerName", {
    name: `${CONSTANTS.MODULE_ID}.settings.displayPlayerName.name`,
    hint: `${CONSTANTS.MODULE_ID}.settings.displayPlayerName.hint`,
    scope: "client",
    config: true,
    type: Boolean,
    default: false,
  });
  game.settings.register(CONSTANTS.MODULE_ID, "portraitSize", {
    name: `${CONSTANTS.MODULE_ID}.settings.portraitSize.name`,
    hint: `${CONSTANTS.MODULE_ID}.settings.portraitSize.hint`,
    scope: "client",
    config: true,
    type: Number,
    default: 36,
  });
  game.settings.register(CONSTANTS.MODULE_ID, "portraitSizeItem", {
    name: `${CONSTANTS.MODULE_ID}.settings.portraitSizeItem.name`,
    hint: `${CONSTANTS.MODULE_ID}.settings.portraitSizeItem.hint`,
    scope: "client",
    config: true,
    type: Number,
    default: 36,
  });
  game.settings.register(CONSTANTS.MODULE_ID, "borderShape", {
    name: `${CONSTANTS.MODULE_ID}.settings.borderShape.name`,
    hint: `${CONSTANTS.MODULE_ID}.settings.borderShape.hint`,
    scope: "client",
    config: true,
    type: String,
    default: "square",
    choices: {
      square: i18n(`${CONSTANTS.MODULE_ID}.settings.borderShape.choice.square`),
      circle: i18n(`${CONSTANTS.MODULE_ID}.settings.borderShape.choice.circle`),
      none: i18n(`${CONSTANTS.MODULE_ID}.settings.borderShape.choice.none`),
    },
  });
  game.settings.register(CONSTANTS.MODULE_ID, "useUserColorAsBorderColor", {
    name: `${CONSTANTS.MODULE_ID}.settings.useUserColorAsBorderColor.name`,
    hint: `${CONSTANTS.MODULE_ID}.settings.useUserColorAsBorderColor.hint`,
    scope: "client",
    config: true,
    type: Boolean,
    default: true,
  });
  game.settings.register(CONSTANTS.MODULE_ID, "borderColor", {
    name: `${CONSTANTS.MODULE_ID}.settings.borderColor.name`,
    hint: `${CONSTANTS.MODULE_ID}.settings.borderColor.hint`,
    scope: "client",
    config: true,
    type: String,
    default: "#000000",
  });
  game.settings.register(CONSTANTS.MODULE_ID, "borderWidth", {
    name: `${CONSTANTS.MODULE_ID}.settings.borderWidth.name`,
    hint: `${CONSTANTS.MODULE_ID}.settings.borderWidth.hint`,
    scope: "client",
    config: true,
    type: Number,
    default: 2,
  });
  game.settings.register(CONSTANTS.MODULE_ID, "useUserColorAsChatBackgroundColor", {
    name: `${CONSTANTS.MODULE_ID}.settings.useUserColorAsChatBackgroundColor.name`,
    hint: `${CONSTANTS.MODULE_ID}.settings.useUserColorAsChatBackgroundColor.hint`,
    scope: "client",
    config: true,
    type: Boolean,
    default: false,
  });
  game.settings.register(CONSTANTS.MODULE_ID, "useUserColorAsChatBorderColor", {
    name: `${CONSTANTS.MODULE_ID}.settings.useUserColorAsChatBorderColor.name`,
    hint: `${CONSTANTS.MODULE_ID}.settings.useUserColorAsChatBorderColor.hint`,
    scope: "client",
    config: true,
    type: Boolean,
    default: true,
  });
  // game.settings.register(CONSTANTS.MODULE_ID, "flavorNextToPortrait", {
  // 	name: `${CONSTANTS.MODULE_ID}.settings.flavorNextToPortrait.name`,
  // 	hint: `${CONSTANTS.MODULE_ID}.settings.flavorNextToPortrait.hint`,
  // 	scope: "client",
  // 	config: true,
  // 	type: Boolean,
  // 	default: false,
  // });
  game.settings.register(CONSTANTS.MODULE_ID, "forceNameSearch", {
    name: `${CONSTANTS.MODULE_ID}.settings.forceNameSearch.name`,
    hint: `${CONSTANTS.MODULE_ID}.settings.forceNameSearch.hint`,
    scope: "client",
    config: true,
    type: Boolean,
    default: false,
  });
  // game.settings.register(CONSTANTS.MODULE_ID,'hoverTooltip', {
  //   // name : game.i18n.localize('chat-portrait.settings.hoverTooltip.name'),
  //   // hint : game.i18n.localize('chat-portrait.settings.hoverTooltip.hint'),
  //   scope : 'world',
  //   config : false,
  //   type : Boolean,
  //   default : false,
  //   onChange: value => { ChatLink.updateSettings(); }
  // });
  game.settings.register(CONSTANTS.MODULE_ID, "textSizeName", {
    name: `${CONSTANTS.MODULE_ID}.settings.textSizeName.name`,
    hint: `${CONSTANTS.MODULE_ID}.settings.textSizeName.hint`,
    scope: "client",
    config: true,
    type: Number,
    default: 0,
  });
  game.settings.register(CONSTANTS.MODULE_ID, "displayMessageTag", {
    name: `${CONSTANTS.MODULE_ID}.settings.displayMessageTag.name`,
    hint: `${CONSTANTS.MODULE_ID}.settings.displayMessageTag.hint`,
    scope: "client",
    config: true,
    type: Boolean,
    default: false,
  });
  // game.settings.register(CONSTANTS.MODULE_ID, "displayMessageTagNextToName", {
  // 	name: `${CONSTANTS.MODULE_ID}.settings.displayMessageTagNextToName.name`,
  // 	hint: `${CONSTANTS.MODULE_ID}.settings.displayMessageTagNextToName.hint`,
  // 	scope: "client",
  // 	config: true,
  // 	type: Boolean,
  // 	default: false,
  // });
  game.settings.register(CONSTANTS.MODULE_ID, "useImageReplacer", {
    name: `${CONSTANTS.MODULE_ID}.settings.useImageReplacer.name`,
    hint: `${CONSTANTS.MODULE_ID}.settings.useImageReplacer.hint`,
    scope: "world",
    config: true,
    type: Boolean,
    default: false,
  });
  game.settings.register(CONSTANTS.MODULE_ID, "useImageReplacerDamageType", {
    name: `${CONSTANTS.MODULE_ID}.settings.useImageReplacerDamageType.name`,
    hint: `${CONSTANTS.MODULE_ID}.settings.useImageReplacerDamageType.hint`,
    scope: "world",
    config: true,
    type: Boolean,
    default: false,
  });
  game.settings.register(CONSTANTS.MODULE_ID, "imageReplacerDamageType", {
    name: `${CONSTANTS.MODULE_ID}.setting.imageReplacerDamageType.name`,
    hint: `${CONSTANTS.MODULE_ID}.setting.imageReplacerDamageType.hint`,
    scope: "world",
    config: false,
    default: SYSTEMS.DATA ? SYSTEMS.DATA.imageReplacerDamageType : [],
    type: Array,
  });
  game.settings.register(CONSTANTS.MODULE_ID, "imageReplacerWeaponProperties", {
    name: `${CONSTANTS.MODULE_ID}.setting.imageReplacerWeaponProperties.name`,
    hint: `${CONSTANTS.MODULE_ID}.setting.imageReplacerWeaponProperties.hint`,
    scope: "world",
    config: false,
    default: SYSTEMS.DATA ? SYSTEMS.DATA.imageReplacerWeaponProperties : [],
    type: Array,
  });
  game.settings.register(CONSTANTS.MODULE_ID, "imageReplacerIconizer", {
    name: `${CONSTANTS.MODULE_ID}.setting.imageReplacerIconizer.name`,
    hint: `${CONSTANTS.MODULE_ID}.setting.imageReplacerIconizer.hint`,
    scope: "world",
    config: false,
    default: SYSTEMS.DATA ? SYSTEMS.DATA.imageReplacerIconizer : [],
    type: Array,
  });
  game.settings.register(CONSTANTS.MODULE_ID, "applyOnCombatTracker", {
    name: `${CONSTANTS.MODULE_ID}.settings.applyOnCombatTracker.name`,
    hint: `${CONSTANTS.MODULE_ID}.settings.applyOnCombatTracker.hint`,
    scope: "client",
    config: true,
    type: Boolean,
    default: false,
  });
  // game.settings.register(CONSTANTS.MODULE_ID, "applyPreCreateChatMessagePatch", {
  // 	name: `${CONSTANTS.MODULE_ID}.settings.applyPreCreateChatMessagePatch.name`,
  // 	hint: `${CONSTANTS.MODULE_ID}.settings.applyPreCreateChatMessagePatch.hint`,
  // 	scope: "client",
  // 	config: true,
  // 	type: Boolean,
  // 	default: false,
  // });
  game.settings.register(CONSTANTS.MODULE_ID, "displaySetting", {
    name: `${CONSTANTS.MODULE_ID}.settings.displaySetting.name`,
    hint: `${CONSTANTS.MODULE_ID}.settings.displaySetting.hint`,
    scope: "client",
    config: true,
    default: "allCards",
    type: String,
    choices: {
      allCards: i18n(`${CONSTANTS.MODULE_ID}.settings.displaySetting.choice.allCards`),
      selfAndGM: i18n(`${CONSTANTS.MODULE_ID}.settings.displaySetting.choice.selfAndGM`),
      self: i18n(`${CONSTANTS.MODULE_ID}.settings.displaySetting.choice.self`),
      gm: i18n(`${CONSTANTS.MODULE_ID}.settings.displaySetting.choice.gm`),
      player: i18n(`${CONSTANTS.MODULE_ID}.settings.displaySetting.choice.player`),
      none: i18n(`${CONSTANTS.MODULE_ID}.settings.displaySetting.choice.none`),
    },
  });
  game.settings.register(CONSTANTS.MODULE_ID, "displaySettingOTHER", {
    name: `${CONSTANTS.MODULE_ID}.settings.displaySettingOTHER.name`,
    hint: `${CONSTANTS.MODULE_ID}.settings.displaySettingOTHER.hint`,
    scope: "client",
    config: true,
    type: Boolean,
    default: true,
  });
  game.settings.register(CONSTANTS.MODULE_ID, "displaySettingOOC", {
    name: `${CONSTANTS.MODULE_ID}.settings.displaySettingOOC.name`,
    hint: `${CONSTANTS.MODULE_ID}.settings.displaySettingOOC.hint`,
    scope: "client",
    config: true,
    type: Boolean,
    default: true,
  });
  game.settings.register(CONSTANTS.MODULE_ID, "displaySettingIC", {
    name: `${CONSTANTS.MODULE_ID}.settings.displaySettingIC.name`,
    hint: `${CONSTANTS.MODULE_ID}.settings.displaySettingIC.hint`,
    scope: "client",
    config: true,
    type: Boolean,
    default: true,
  });
  game.settings.register(CONSTANTS.MODULE_ID, "displaySettingEMOTE", {
    name: `${CONSTANTS.MODULE_ID}.settings.displaySettingEMOTE.name`,
    hint: `${CONSTANTS.MODULE_ID}.settings.displaySettingEMOTE.hint`,
    scope: "client",
    config: true,
    type: Boolean,
    default: true,
  });
  game.settings.register(CONSTANTS.MODULE_ID, "displaySettingWHISPER", {
    name: `${CONSTANTS.MODULE_ID}.settings.displaySettingWHISPER.name`,
    hint: `${CONSTANTS.MODULE_ID}.settings.displaySettingWHISPER.hint`,
    scope: "client",
    config: true,
    type: Boolean,
    default: true,
  });
  game.settings.register(CONSTANTS.MODULE_ID, "displaySettingROLL", {
    name: `${CONSTANTS.MODULE_ID}.settings.displaySettingROLL.name`,
    hint: `${CONSTANTS.MODULE_ID}.settings.displaySettingROLL.hint`,
    scope: "client",
    config: true,
    type: Boolean,
    default: true,
  });
  game.settings.register(CONSTANTS.MODULE_ID, "displaySettingWhisperToOther", {
    name: `${CONSTANTS.MODULE_ID}.settings.displaySettingWhisperToOther.name`,
    hint: `${CONSTANTS.MODULE_ID}.settings.displaySettingWhisperToOther.hint`,
    scope: "client",
    config: true,
    type: Boolean,
    default: false,
  });
  //   game.settings.register(CONSTANTS.MODULE_ID, "displayUnknown", {
  //     name: `${CONSTANTS.MODULE_ID}.settings.displayUnknown.name`,
  //     hint: `${CONSTANTS.MODULE_ID}.settings.displayUnknown.hint`,
  //     scope: "world",
  //     config: true,
  //     default: "none",
  //     type: String,
  //     choices: {
  //       allCards: i18n(`${CONSTANTS.MODULE_ID}.settings.displayUnknown.choice.allCards`),
  //       selfAndGM: i18n(`${CONSTANTS.MODULE_ID}.settings.displayUnknown.choice.selfAndGM`),
  //       self: i18n(`${CONSTANTS.MODULE_ID}.settings.displayUnknown.choice.self`),
  //       gm: i18n(`${CONSTANTS.MODULE_ID}.settings.displayUnknown.choice.gm`),
  //       player: i18n(`${CONSTANTS.MODULE_ID}.settings.displayUnknown.choice.player`),
  //       none: i18n(`${CONSTANTS.MODULE_ID}.settings.displayUnknown.choice.none`),
  //       onlyNpc: i18n(`${CONSTANTS.MODULE_ID}.settings.displayUnknown.choice.onlyNpc`),
  //     },
  //   });
  //   game.settings.register(CONSTANTS.MODULE_ID, "displayUnknownPlaceHolderActorName", {
  //     name: `${CONSTANTS.MODULE_ID}.settings.displayUnknownPlaceHolderActorName.name`,
  //     hint: `${CONSTANTS.MODULE_ID}.settings.displayUnknownPlaceHolderActorName.hint`,
  //     scope: "world",
  //     config: true,
  //     type: String,
  //     default: "Unknown Actor",
  //   });
  //   game.settings.register(CONSTANTS.MODULE_ID, "displayUnknownPlaceHolderItemName", {
  //     name: `${CONSTANTS.MODULE_ID}.settings.displayUnknownPlaceHolderItemName.name`,
  //     hint: `${CONSTANTS.MODULE_ID}.settings.displayUnknownPlaceHolderItemName.hint`,
  //     scope: "world",
  //     config: true,
  //     type: String,
  //     default: "Unknown Item",
  //   });
  //   game.settings.register(CONSTANTS.MODULE_ID, "displayUnknownPlaceHolderItemIcon", {
  //     name: `${CONSTANTS.MODULE_ID}.settings.displayUnknownPlaceHolderItemIcon.name`,
  //     hint: `${CONSTANTS.MODULE_ID}.settings.displayUnknownPlaceHolderItemIcon.hint`,
  //     scope: "world",
  //     config: true,
  //     type: String,
  //     default: `modules/${CONSTANTS.MODULE_ID}/assets/inv-unidentified.png`,
  //   });

  // game.settings.register(CONSTANTS.MODULE_ID, 'customStylingMessageSystem', {
  //   name: `${CONSTANTS.MODULE_ID}.settings.customStylingMessageSystem.name`,
  //   hint: `${CONSTANTS.MODULE_ID}.settings.customStylingMessageSystem.hint`,
  //   scope: 'client',
  //   config: true,
  //   type: Boolean,
  //   default: true,
  // });
  game.settings.register(CONSTANTS.MODULE_ID, "customStylingMessageText", {
    name: `${CONSTANTS.MODULE_ID}.settings.customStylingMessageText.name`,
    hint: `${CONSTANTS.MODULE_ID}.settings.customStylingMessageText.hint`,
    scope: "client",
    config: true,
    type: String,
    default: "",
  });
  game.settings.register(CONSTANTS.MODULE_ID, "customStylingMessageImage", {
    name: `${CONSTANTS.MODULE_ID}.settings.customStylingMessageImage.name`,
    hint: `${CONSTANTS.MODULE_ID}.settings.customStylingMessageImage.hint`,
    scope: "client",
    config: true,
    type: String,
    default: "",
  });
  game.settings.register(CONSTANTS.MODULE_ID, "disablePortraitForAliasGmMessage", {
    name: `${CONSTANTS.MODULE_ID}.settings.disablePortraitForAliasGmMessage.name`,
    hint: `${CONSTANTS.MODULE_ID}.settings.disablePortraitForAliasGmMessage.hint`,
    scope: "world",
    config: true,
    type: Boolean,
    default: false,
  });
  game.settings.register(CONSTANTS.MODULE_ID, "setUpPortraitForAliasGmMessage", {
    name: `${CONSTANTS.MODULE_ID}.settings.setUpPortraitForAliasGmMessage.name`,
    hint: `${CONSTANTS.MODULE_ID}.settings.setUpPortraitForAliasGmMessage.hint`,
    scope: "world",
    config: true,
    type: String,
    default: "",
  });
  game.settings.register(CONSTANTS.MODULE_ID, "enableSpeakingAs", {
    name: `${CONSTANTS.MODULE_ID}.settings.enableSpeakingAs.name`,
    hint: `${CONSTANTS.MODULE_ID}.settings.enableSpeakingAs.hint`,
    scope: "client",
    config: true,
    type: Boolean,
    default: false,
  });
  game.settings.register(CONSTANTS.MODULE_ID, "speakingAsWarningCharacters", {
    name: `${CONSTANTS.MODULE_ID}.settings.speakingAsWarningCharacters.name`,
    hint: `${CONSTANTS.MODULE_ID}.settings.speakingAsWarningCharacters.hint`,
    scope: "client",
    config: true,
    type: String,
    default: '".+"',
  });
  game.settings.register(CONSTANTS.MODULE_ID, "enableSpeakAs", {
    name: `${CONSTANTS.MODULE_ID}.settings.enableSpeakAs.name`,
    hint: `${CONSTANTS.MODULE_ID}.settings.enableSpeakAs.hint`,
    scope: "world",
    config: true,
    type: Boolean,
    default: false,
  });
  // ========================================================================
  game.settings.register(CONSTANTS.MODULE_ID, "debug", {
    name: `${CONSTANTS.MODULE_ID}.setting.debug.name`,
    hint: `${CONSTANTS.MODULE_ID}.setting.debug.hint`,
    scope: "world",
    config: true,
    default: false,
    type: Boolean,
  });
  // game.settings.register(CONSTANTS.MODULE_ID, 'debugHooks', {
  //   scope: 'world',
  //   config: false,
  //   default: false,
  //   type: Boolean,
  // });
  game.settings.register(CONSTANTS.MODULE_ID, "systemFound", {
    scope: "world",
    config: false,
    default: false,
    type: Boolean,
  });
  game.settings.register(CONSTANTS.MODULE_ID, "systemNotFoundWarningShown", {
    scope: "world",
    config: false,
    default: false,
    type: Boolean,
  });
  game.settings.register(CONSTANTS.MODULE_ID, "preconfiguredSystem", {
    name: `${CONSTANTS.MODULE_ID}.setting.preconfiguredSystem.name`,
    hint: `${CONSTANTS.MODULE_ID}.setting.preconfiguredSystem.hint`,
    scope: "world",
    config: false,
    default: false,
    type: Boolean,
  });
};
class ResetSettingsDialog extends FormApplication {
  constructor(...args) {
    //@ts-ignore
    super(...args);
    //@ts-ignore
    return new Dialog({
      title: game.i18n.localize(`${CONSTANTS.MODULE_ID}.dialogs.resetsettings.title`),
      content:
        '<p style="margin-bottom:1rem;">' +
        game.i18n.localize(`${CONSTANTS.MODULE_ID}.dialogs.resetsettings.content`) +
        "</p>",
      buttons: {
        confirm: {
          icon: '<i class="fas fa-check"></i>',
          label: game.i18n.localize(`${CONSTANTS.MODULE_ID}.dialogs.resetsettings.confirm`),
          callback: async () => {
            const worldSettings = game.settings.storage
              ?.get("world")
              ?.filter((setting) => setting.key.startsWith(`${CONSTANTS.MODULE_ID}.`));
            for (let setting of worldSettings) {
              console.log(`Reset setting '${setting.key}'`);
              await setting.delete();
            }
            //window.location.reload();
          },
        },
        cancel: {
          icon: '<i class="fas fa-times"></i>',
          label: game.i18n.localize(`${CONSTANTS.MODULE_ID}.dialogs.resetsettings.cancel`),
        },
      },
      default: "cancel",
    });
  }
  async _updateObject(event, formData) {
    // do nothing
  }
}
