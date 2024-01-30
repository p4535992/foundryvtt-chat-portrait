import { ChatPortrait } from "./ChatPortrait.js";
import CONSTANTS from "./constants.js";
import { warn } from "./lib/lib.js";
export class ChatLink {
  static init() {
    ChatLink.updateSettings();
  }
  static updateSettings() {
    ChatLink.showTooltip = game.settings.get(CONSTANTS.MODULE_ID, "hoverTooltip");
  }
  static prepareEvent(message, html, speakerInfo, gameSystemId) {
    // let clickable = html.find('.chat-card'); // message-sender
    // if(!clickable){
    //     clickable = html.find('.message-sender');
    // }
    const clickable = html.find(`.chat-portrait-message-portrait-${gameSystemId}`);
    if (!clickable) {
      // Ignored some system as strange behavior
      return;
    }
    const speaker = speakerInfo.message ? speakerInfo.message.speaker : speakerInfo;
    if (!(speaker.actor || speaker.token)) {
      return;
    }
    // Removed 4535992 just a bug i can avoid to manage
    //ChatLink.formatLink(clickable);
    const speakerName =
      clickable[0]?.textContent ?? speaker.alias ?? ChatLink.i18n(CONSTANTS.MODULE_ID + ".genericName");
    const speakerData = {
      idScene: speaker.scene,
      idActor: speaker.actor,
      idToken: speaker.token,
      name: speakerName,
    };
    if (!speakerData.idScene) {
      if (speakerInfo.author) {
        speakerData.idScene = speakerInfo.author.viewedScene;
      } else {
        speakerData.idScene = game.scenes?.current?.id;
      }
    }
    clickable.hover((event) => {
      ChatLink.hoverIn(event, speaker);
    }, ChatLink.hoverOut);
    clickable.dblclick((event) => ChatLink.panToToken(speakerData));
    // function clicks(e, speakerData) {
    //     ChatLink.clickCount++;
    //     if (ChatLink.clickCount == 1) {
    //         ChatLink.clickTimer = setTimeout(() => {
    //             ChatLink.clickCount = 0;
    //             ChatLink.selectToken(e, speakerData);
    //         }, ChatLink.clickTimeout);
    //     } else {
    //         ChatLink.clickCount = 0;
    //         clearTimeout(ChatLink.clickTimer);
    //         ChatLink.panToToken(speakerData);
    //     }
    // }
    // clickable.on('click', (e) => {
    //     clicks(e, speakerData)
    // }).on('dblclick', (e) => {
    //     e.preventDefault();
    // });
  }
  static prepareEventImage(message, html, speakerInfo, gameSystemId) {
    const clickable = html.find(`.chat-portrait-message-portrait-${gameSystemId}`);
    const speaker = speakerInfo.message ? speakerInfo.message.speaker : speakerInfo;
    if (!(speaker.actor || speaker.token)) {
      return;
    }
    // Removed 4535992 just a bug i can avoid to manage
    //ChatLink.formatLink(clickable);
    const speakerName =
      clickable[0]?.textContent ?? speaker.alias ?? ChatLink.i18n(CONSTANTS.MODULE_ID + ".genericName");
    const speakerData = {
      idScene: speaker.scene,
      idActor: speaker.actor,
      idToken: speaker.token,
      name: speakerName,
    };
    if (!speakerData.idScene) {
      if (speakerInfo.author) {
        speakerData.idScene = speakerInfo.author.viewedScene;
      } else {
        speakerData.idScene = game.scenes?.current?.id;
      }
    }
    clickable.hover((event) => {
      ChatLink.hoverIn(event, speaker);
    }, ChatLink.hoverOut);
    clickable.dblclick((event) => ChatLink.panToToken(speakerData));
    // function clicks(e, speakerData) {
    //     ChatLink.clickCount++;
    //     if (ChatLink.clickCount == 1) {
    //         ChatLink.clickTimer = setTimeout(() => {
    //             ChatLink.clickCount = 0;
    //             ChatLink.selectToken(e, speakerData);
    //         }, ChatLink.clickTimeout);
    //     } else {
    //         ChatLink.clickCount = 0;
    //         clearTimeout(ChatLink.clickTimer);
    //         ChatLink.panToToken(speakerData);
    //     }
    // }
    // clickable.on('click', (e) => {
    //     clicks(e, speakerData)
    // }).on('dblclick', (e) => {
    //     e.preventDefault();
    // });
  }
  // If it's reached this far, assume scene is correct.
  static panToToken(speakerData) {
    const user = game.user;
    const token = ChatLink.getToken(speakerData);
    if (!ChatLink.tokenExists(user, speakerData, token)) {
      return;
    }
    if (!ChatLink.permissionToSee(user, speakerData, token)) {
      return;
    }
    ChatLink.doPanToToken(user, token);
  }
  static selectToken(event, speakerData) {
    const user = game.user;
    const token = ChatLink.getToken(speakerData);
    if (!ChatLink.tokenExists(user, speakerData, token)) return;
    if (!ChatLink.permissionToSee(user, speakerData, token)) return;
    ChatLink.doSelectToken(event, user, token);
  }
  static getToken(speakerData) {
    let token = canvas.tokens?.placeables.find((t) => t.id === speakerData.idToken);
    if (!token) token = canvas.tokens?.placeables.find((t) => t.actor?.id === speakerData.idActor);
    return token;
  }
  static tokenExists(user, speakerData, token) {
    if (token && token.visible) {
      return true;
    }
    if (!ChatLink.isRightScene(user, speakerData)) {
      return false;
    }
    const message = user.isGM
      ? ChatLink.playerWarning(speakerData) + ` ${ChatLink.i18n(CONSTANTS.MODULE_ID + ".noTokenFound")}`
      : ChatLink.playerWarning(speakerData);
    ChatLink.warning(message);
    return false;
  }
  static isRightScene(user, speakerData) {
    if (canvas.scene?.id === speakerData.idScene) {
      return true;
    }
    let sceneNote;
    if (!speakerData.idScene) {
      sceneNote = ` ${ChatLink.i18n(CONSTANTS.MODULE_ID + ".noSceneFound")}`;
    } else {
      const tokenScene = game.scenes?.find((s) => s.id === speakerData.idScene);
      sceneNote = ` ${ChatLink.i18nFormat(CONSTANTS.MODULE_ID + ".checkScene", {
        sceneName: tokenScene?.name,
      })}`;
    }
    const message = user.isGM ? ChatLink.playerWarning(speakerData) + sceneNote : ChatLink.playerWarning(speakerData);
    ChatLink.warning(message);
    return false;
  }
  static permissionToSee(user, speakerData, token) {
    if (user.isGM || token.visible) {
      return true;
    }
    ChatLink.warning(ChatLink.playerWarning(speakerData));
    return false;
  }
  static permissionToControl(user, token) {
    // return user.isGM || token.actor?.hasPerm(user, 'OWNER');
    return user.isGM || token.actor?.hasPlayerOwner;
  }
  static doSelectToken(event, user, token) {
    const ctrlKey = event.ctrlKey;
    if (!ChatLink.permissionToControl(user, token)) {
      ChatLink.targetToken(event, user, token, ctrlKey);
      return;
    }
    const shiftKey = event.shiftKey;
    if (shiftKey) {
      ChatLink.targetToken(event, user, token, ctrlKey);
    } else {
      ChatLink.controlToken(event, user, token, ctrlKey);
    }
  }
  static doPanToToken(user, token) {
    //@ts-ignore
    const scale = canvas.scene?._viewPosition.scale;
    canvas.animatePan({ x: token.x, y: token.y, scale: scale, duration: 500 });
    if (token && token.isVisible) {
      canvas.animatePan({ ...token.center, duration: 250 });
    }
  }
  static controlToken(event, user, token, ctrlKey) {
    const releaseOthers = { releaseOthers: !ctrlKey };
    if (ctrlKey) {
      if (token._controlled) token.release();
      else token.control(releaseOthers);
      return;
    }
    if (token._controlled || canvas.tokens?.controlled.length !== 1) token.control(releaseOthers);
    else if (!token._controlled && canvas.tokens?.controlled.length === 1) token.control(releaseOthers);
    else token.release();
  }
  static targetToken(event, user, token, ctrlKey) {
    const releaseOthers = { releaseOthers: !ctrlKey };
    if (ctrlKey) {
      if (token.isTargeted) token.setTarget(false, releaseOthers);
      else token.setTarget(true, releaseOthers);
      return;
    }
    if (token.isTargeted && game.user?.targets.size !== 1) token.setTarget(true, releaseOthers);
    else if (token.isTargeted && game.user?.targets.size === 1) token.setTarget(false, releaseOthers);
    else token.setTarget(true, releaseOthers);
  }
  static getCoords(token) {
    const result = { x: token.center.x, y: token.center.y, width: 1, height: 1 };
    return result;
  }
  static warning(message) {
    warn(message, true);
  }
}
ChatLink.clickTimeout = 250;
ChatLink.clickCount = 0;
ChatLink.playerWarning = (data) => ChatLink.i18nFormat(CONSTANTS.MODULE_ID + ".notInSight", data);
ChatLink.showTooltip = true;
ChatLink.hoverTimeout = 1000;
ChatLink.hoverTimer = null;
ChatLink.i18n = (toTranslate) => game.i18n.localize(toTranslate);
ChatLink.i18nFormat = (toTranslate, data) => game.i18n.format(toTranslate, data);
ChatLink.hoverIn = (event, speaker) => {
  const token = ChatPortrait.getTokenFromSpeaker(speaker);
  if (token && token.visible) {
    event.fromChat = true;
    //@ts-ignore
    if (token._object) {
      //@ts-ignore
      token._object._onHoverIn(event);
      ChatLink.lastHoveredToken = token;
    } else {
      // Bug fix : https://github.com/p4535992/foundryvtt-chat-portrait/issues/35
      //   warn(`Can't hover in the chat portrait of the token '${token}'`);
    }
  }
};
ChatLink.hoverOut = (event) => {
  //@ts-ignore
  if (ChatLink.lastHoveredToken && ChatLink.lastHoveredToken._hover) {
    event.fromChat = true;
    //@ts-ignore
    ChatLink.lastHoveredToken._onHoverOut(event);
    ChatLink.lastHoveredToken = null;
  }
};
// export class TooltipHelper {
//     static getContent() {
//         let tips = game.user.isGM ? TooltipHelper.gmTips() : TooltipHelper.playerTips();
//         let tooltipData = {
//             title: game.i18n.localize(CONSTANTS.MODULE_ID+".instructionsTitle"),
//             tips: tips
//         }
//         //let template = Handlebars.compile(`{{> modules/${CONSTANTS.MODULE_ID}/templates/instructions.html}}`);
//         let template = Handlebars.compile(`{{> modules/${CONSTANTS.MODULE_ID}/templates/instructions.hbs }}`);
//         let content = template(tooltipData);
//         return content;
//     }
//     static gmTips() {
//         return [
//             game.i18n.localize(CONSTANTS.MODULE_ID+".gmClick"),
//             game.i18n.localize(CONSTANTS.MODULE_ID+".shiftClick"),
//             game.i18n.localize(CONSTANTS.MODULE_ID+".doubleClick"),
//             game.i18n.localize(CONSTANTS.MODULE_ID+".gmCtrlClick"),
//             game.i18n.localize(CONSTANTS.MODULE_ID+".gmCtrlShiftClick")
//         ]
//     }
//     static playerTips() {
//         return [
//             game.i18n.localize(CONSTANTS.MODULE_ID+".playerClick"),
//             game.i18n.localize(CONSTANTS.MODULE_ID+".shiftClick"),
//             game.i18n.localize(CONSTANTS.MODULE_ID+".doubleClick"),
//             game.i18n.localize(CONSTANTS.MODULE_ID+".playerCtrlClick"),
//             game.i18n.localize(CONSTANTS.MODULE_ID+".playerCtrlShiftClick")
//         ]
//     }
// }
