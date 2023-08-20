import "./lib/lib.js";
import { ChatPortrait } from "./ChatPortrait.js";
import CONSTANTS from "./constants.js";
import { setApi } from "../module.js";
import API from "./api.js";
import { registerSocket } from "./socket.js";
import { initSpeakingAs, overrideMessage, updateSpeaker } from "./apps/speaking-as.js";
import { readySpeakAs, renderSidebarTabSpeakAs } from "./apps/speak-as.js";
const mapCombatTrackerPortrait = new Map();
export const initHooks = () => {
  // debug("Init Hooks processing");
  Hooks.once("socketlib.ready", registerSocket);
  if (game.settings.get(CONSTANTS.MODULE_NAME, "enableSpeakingAs")) {
    initSpeakingAs();
  }
};
export const setupHooks = async () => {
  // debug("Setup Hooks processing");
  setApi(API);
  // setup all the hooks
  let imageReplacer;
  // if (ChatPortrait.settings.useImageReplacer) {
  //   imageReplacer = ImageReplacerInit();
  // }
  let currentSpeakerBackUp;
  /**
   * This line connects our method above with the chat rendering.
   * Note that this happens after the core code has already generated HTML.
   * Bind to any newly rendered chat cards at runtime
   * For whatever reason, this callback is sometimes called with unattached html elements
   */
  Hooks.on("renderChatMessage", async (message, html, speakerInfo) => {
    if (!speakerInfo.message.speaker.token && currentSpeakerBackUp?.token) {
      if (currentSpeakerBackUp.scene) {
        speakerInfo.message.speaker.scene = currentSpeakerBackUp.scene;
      }
      if (currentSpeakerBackUp.actor) {
        speakerInfo.message.speaker.actor = currentSpeakerBackUp.actor;
      }
      if (currentSpeakerBackUp.token) {
        speakerInfo.message.speaker.token = currentSpeakerBackUp.token;
      }
      if (currentSpeakerBackUp.alias) {
        speakerInfo.message.speaker.alias = currentSpeakerBackUp.alias;
      }
    }
    //@ts-ignore
    if (!message.speaker.token && currentSpeakerBackUp?.token) {
      //@ts-ignore
      if (currentSpeakerBackUp.scene) {
        //@ts-ignore
        message.speaker.scene = currentSpeakerBackUp.scene;
      }
      //@ts-ignore
      if (currentSpeakerBackUp.actor) {
        //@ts-ignore
        message.speaker.actor = currentSpeakerBackUp.actor;
      }
      //@ts-ignore
      if (currentSpeakerBackUp.token) {
        //@ts-ignore
        message.speaker.token = currentSpeakerBackUp.token;
      }
      //@ts-ignore
      if (currentSpeakerBackUp.alias) {
        //@ts-ignore
        message.speaker.alias = currentSpeakerBackUp.alias;
      }
    }
    ChatPortrait.onRenderChatMessage(message, html, speakerInfo, imageReplacer);
    setTimeout(function () {
      const log = document.querySelector("#chat-log");
      const shouldForceScroll = log ? ChatPortrait.shouldScrollToBottom(log) : false;
      if (log && shouldForceScroll) {
        log.scrollTo({ behavior: "smooth", top: log.scrollHeight });
      }
    }, 50);
    // ChatPortraitChatCard.bind(message, html, speakerInfo, imageReplacer);
  });
  // Hooks.on('createChatMessage', async (message:ChatMessage, render, userId) => {
  //   if(!message.speaker.token && currentSpeakerBackUp?.token){
  //     if(currentSpeakerBackUp.scene) message.speaker.scene = currentSpeakerBackUp.scene;
  //     if(currentSpeakerBackUp.actor) message.speaker.actor = currentSpeakerBackUp.actor;
  //     if(currentSpeakerBackUp.token) message.speaker.token = currentSpeakerBackUp.token;
  //     if(currentSpeakerBackUp.alias) message.speaker.alias = currentSpeakerBackUp.alias;
  //   }
  //   if(render.render){
  //     const html:JQuery<HTMLElement> = $("<div>" + message.content + "</div>");
  //     let speakerInfo = message.speaker;
  //     //@ts-ignore
  //     if(!speakerInfo.alias && speakerInfo.document?.alias){
  //       //@ts-ignore
  //       speakerInfo.alias = speakerInfo.document?.alias;
  //     }
  //     await ChatPortrait.onRenderChatMessage(message, html, speakerInfo, imageReplacer);
  //     let updates = {
  //       content: html.html()
  //     };
  //     message.update(updates);
  //     //@ts-ignore
  //     speakerInfo.message = {};
  //      //@ts-ignore
  //     speakerInfo.message = message;
  //   }
  // });
  // let chatData:any = {
  //   type: ChatPortrait.getMessageTypeVisible(speakerInfo),
  //   user: game.user,
  //   speaker: speakerInfo,
  //   content: message.content,
  //   //@ts-ignore
  //   whisper: message.whisper ? message.whisper : speakerInfo.document.whisper,
  // };
  // await ChatMessage.create(chatData,{});
  // Hooks.on("chatMessage", (chatlog, messageText, chatData) => {
  //   let test = "";
  // });
  // Hooks.on('updateChatMessage', (message, update, options, user) => {
  // });
  // let flag = true;
  /**
   * Catch chat message creations and add some more data if we need to
   */
  Hooks.on("preCreateChatMessage", (message, options, render, userId) => {
    //@ts-ignore
    // const src = ChatPortrait.getTokenFromSpeaker(message.speaker);
    let speakerInfo = {};
    //@ts-ignore
    if (message.speaker?.token) {
      //@ts-ignore
      const src = ChatPortrait.loadImagePathForChatMessage(message.speaker);
      if (src) {
        //@ts-ignore
        message.updateSource({
          flags: {
            "chat-portrait": {
              src: src,
            },
          },
        });
      }
    }
    if (game.settings.get(CONSTANTS.MODULE_NAME, "enableSpeakingAs")) {
      overrideMessage(message);
    }
    // if (game.settings.get(CONSTANTS.MODULE_NAME, "applyPreCreateChatMessagePatch")) {
    // 	if (options) {
    // 		// Update the speaker
    // 		if (!options.speaker || (!options.speaker.token && !options.speaker.actor)) {
    // 			let user = game.users?.get(options.user);
    // 			let avatar;
    // 			if (!user && options.user) {
    // 				user = game.users?.get(options.user?.id);
    // 			} else {
    // 				user = game.users?.get(userId);
    // 			}
    // 			const speakerInfo: any = {};
    // 			const mytoken = ChatPortrait.getFirstPlayerToken();
    // 			speakerInfo.alias = message.alias;
    // 			speakerInfo.token = mytoken;
    // 			speakerInfo.actor = game.actors?.get(<string>user?.character?.id);
    // 			const updates = {
    // 				speaker: speakerInfo,
    // 			};
    // 			message.update(updates);
    // 		}
    // 		// MidiQol , Better Rolls, and other modules.. sometime destroy the info
    // 		// for my purpose i backup the speaker i will found on the preCreateChatMessage
    // 		else if (options.speaker) {
    // 			currentSpeakerBackUp = options.speaker;
    // 			if (options.speaker.token) {
    // 				currentSpeakerBackUp.token = options.speaker.token?.id;
    // 			}
    // 		}
    // 	}
    // 	// if(render.render){
    // 	//   const html:JQuery<HTMLElement> = $("<div>" + message.content + "</div>");
    // 	//   let speakerInfo = message.speaker;
    // 	//   //@ts-ignore
    // 	//   if(!speakerInfo.alias && speakerInfo.document?.alias){
    // 	//     //@ts-ignore
    // 	//     speakerInfo.alias = speakerInfo.document?.alias;
    // 	//   }
    // 	//   await ChatPortrait.onRenderChatMessage(message, html, speakerInfo, imageReplacer);
    // 	//   let updates = {
    // 	//     content: html.html()
    // 	//   };
    // 	//   message.update(updates);
    // 	//   //@ts-ignore
    // 	//   speakerInfo.message = {};
    // 	//    //@ts-ignore
    // 	//   speakerInfo.message = message;
    // 	//   if(flag){
    // 	//     let chatData:any = {
    // 	//       type: ChatPortrait.getMessageTypeVisible(speakerInfo),
    // 	//       user: game.user,
    // 	//       speaker: speakerInfo,
    // 	//       content: message.content,
    // 	//       //@ts-ignore
    // 	//       whisper: message.whisper ? message.whisper : speakerInfo.document.whisper,
    // 	//     };
    // 	//     flag = false;
    // 	//     ChatMessage.create(chatData,{});
    // 	//   }else{
    // 	//     flag = true;
    // 	//   }
    // 	// }
    // }
  });
  Hooks.on("controlToken", (token, options) => {
    if (game.settings.get(CONSTANTS.MODULE_NAME, "enableSpeakingAs")) {
      updateSpeaker();
    }
  });
};
export const readyHooks = async () => {
  if (game.settings.get(CONSTANTS.MODULE_NAME, "enableSpeakAs")) {
    readySpeakAs();
  }
  Hooks.on("renderSidebarTab", (dialog, $element, targets) => {
    if (game.settings.get(CONSTANTS.MODULE_NAME, "enableSpeakAs")) {
      renderSidebarTabSpeakAs(dialog, $element, targets);
    }
  });
  // debug("Ready Hooks processing");
  // When the combat tracker is rendered, we need to completely replace
  // its HTML with a custom version.
  Hooks.on("renderCombatTracker", async (app, html, options) => {
    if (game.settings.get(CONSTANTS.MODULE_NAME, "applyOnCombatTracker")) {
      // If there's as combat, we can proceed.
      if (game.combat) {
        // Retrieve a list of the combatants
        const combatants = game.combat?.combatants;
        combatants.forEach(async (c) => {
          // Add class to trigger drag events.
          const $combatant = html.find(`.combatant[data-combatant-id="${c.id}"]`);
          //$combatant.addClass('actor-elem');
          //@ts-ignore
          const img = $combatant.find(".token-image")[0];
          const tokenID = c.token?.id;
          let imgPath = CONSTANTS.DEF_TOKEN_IMG_PATH;
          if (!mapCombatTrackerPortrait.get(tokenID)) {
            const actorID = c.actor?.id;
            const token = ChatPortrait._getTokenFromId(tokenID);
            let userID = "";
            let isOwnedFromPLayer = false;
            let useTokenImage = ChatPortrait.settings.useTokenImage;
            const actor = ChatPortrait.getActorFromSpeaker(token.actor);
            const doNotUseTokenImageWithSpecificType = ChatPortrait.settings.doNotUseTokenImageWithSpecificType
              ? String(ChatPortrait.settings.doNotUseTokenImageWithSpecificType).split(",")
              : [];
            if (
              doNotUseTokenImageWithSpecificType.length > 0 &&
              doNotUseTokenImageWithSpecificType.includes(actor?.type)
            ) {
              useTokenImage = false;
            }
            if (ChatPortrait.settings.useAvatarImage && !useTokenImage) {
              // if user not admin is owner of the token
              //userID = (!game.user?.isGM && token.actor?.hasPerm(<User>game.user, "OWNER")) ? <string>game.user?.id : "";
              //userID = (!game.user?.isGM && (token.document.permission === CONST.ENTITY_PERMISSIONS.OWNER)) ? <string>game.user?.id : "";
              const permissions = token.actor?.permission;
              for (const keyPermission in permissions) {
                const valuePermission = permissions[keyPermission];
                if (game.user?.isGM) {
                  if (game.user?.id != keyPermission && valuePermission === CONST.ENTITY_PERMISSIONS.OWNER) {
                    userID = keyPermission;
                    break;
                  }
                } else {
                  if (game.user?.id === keyPermission && valuePermission === CONST.ENTITY_PERMISSIONS.OWNER) {
                    userID = game.user?.id;
                    isOwnedFromPLayer = true;
                    break;
                  }
                }
              }
            }
            const sceneID = (canvas.tokens?.get(token.id)).scene.id;
            imgPath = ChatPortrait.loadImagePathForCombatTracker(tokenID, actorID, userID, sceneID, isOwnedFromPLayer);
            if (imgPath?.includes(".webm")) {
              try {
                const imgThumb = await ImageHelper.createThumbnail(imgPath);
                if (imgPath.includes(".webm")) {
                  imgPath = imgThumb.thumb;
                } else {
                  imgPath = imgThumb.src;
                }
              } catch {
                //img.src = imgPath;
              }
            }
            mapCombatTrackerPortrait.set(tokenID, imgPath);
          } else {
            imgPath = mapCombatTrackerPortrait.get(tokenID);
          }
          if (imgPath) {
            img.setAttribute("data-src", imgPath);
          }
        });
      } else {
        mapCombatTrackerPortrait.clear();
      }
    }
  });
  Hooks.on("renderSettingsConfig", (app, html, data) => {
    // Add colour pickers to the Configure Game Settings: Module Settings menu
    const nameBorderColor = `${CONSTANTS.MODULE_NAME}.borderColor`;
    const colourBorderColor = game.settings.get(CONSTANTS.MODULE_NAME, "borderColor");
    $("<input>")
      .attr("type", "color")
      .attr("data-edit", nameBorderColor)
      .val(colourBorderColor)
      .insertAfter($(`input[name="${nameBorderColor}"]`, html).addClass("color"));
    const nameCustomStylingMessageText = `${CONSTANTS.MODULE_NAME}.customStylingMessageText`;
    const customStylingMessageText = game.settings.get(CONSTANTS.MODULE_NAME, "customStylingMessageText");
    $(`input[name="${nameCustomStylingMessageText}"]`)
      .attr(
        "placeholder",
        `.chat-portrait-text-size-name-dnd5e .chat-portrait-system-dnd5e {
			display: flex;
			margin: auto;
		}
		`
      )
      .attr("id", nameCustomStylingMessageText)
      .each(function () {
        const style = $(this).attr("style");
        const name = $(this).attr("name");
        const id = $(this).attr("id");
        const datadtype = $(this).attr("data-dtype");
        const value = $(this).attr("value");
        const placeholder = $(this).attr("placeholder");
        const textbox = $(document.createElement("textarea"))
          .attr("style", style)
          .attr("name", name)
          .attr("id", id)
          .attr("data-dtype", datadtype)
          .attr("value", value)
          .attr("placeholder", placeholder);
        textbox.val(value);
        $(this).replaceWith(textbox);
      });
    const nameCustomStylingMessageImage = `${CONSTANTS.MODULE_NAME}.customStylingMessageImage`;
    const customStylingMessageImage = game.settings.get(CONSTANTS.MODULE_NAME, "customStylingMessageImage");
    $(`input[name="${nameCustomStylingMessageImage}"]`)
      .attr(
        "placeholder",
        `.chat-portrait-image-size-name-dnd5e .chat-portrait-system-dnd5e {
			display: flex;
			margin: auto;
		}
		`
      )
      .attr("id", nameCustomStylingMessageImage)
      .each(function () {
        const style = $(this).attr("style");
        const name = $(this).attr("name");
        const id = $(this).attr("id");
        const datadtype = $(this).attr("data-dtype");
        const value = $(this).attr("value");
        const placeholder = $(this).attr("placeholder");
        const textbox = $(document.createElement("textarea"))
          .attr("style", style)
          .attr("name", name)
          .attr("id", id)
          .attr("data-dtype", datadtype)
          .attr("value", value)
          .attr("placeholder", placeholder);
        textbox.val(value);
        $(this).replaceWith(textbox);
      });
  });
};
