import { warn } from "../main.js";
import { ChatPortrait } from "./ChatPortrait.js";
import { ImageReplacerInit } from "./ImageReplacer.js";
import { getGame } from "./settings.js";
export let readyHooks = async () => {
};
export const setupHooks = async () => {
    // setup all the hooks
    let imageReplacer;
    if (ChatPortrait.settings.useImageReplacer) {
        imageReplacer = ImageReplacerInit();
    }
    let currentSpeakerBackUp;
    /**
    * This line connects our method above with the chat rendering.
    * Note that this happens after the core code has already generated HTML.
    * Bind to any newly rendered chat cards at runtime
    * For whatever reason, this callback is sometimes called with unattached html elements
    */
    Hooks.on('renderChatMessage', (message, html, speakerInfo) => {
        if (!speakerInfo.message.speaker.token && currentSpeakerBackUp?.token) {
            if (currentSpeakerBackUp.scene)
                speakerInfo.message.speaker.scene = currentSpeakerBackUp.scene;
            if (currentSpeakerBackUp.actor)
                speakerInfo.message.speaker.actor = currentSpeakerBackUp.actor;
            if (currentSpeakerBackUp.token)
                speakerInfo.message.speaker.token = currentSpeakerBackUp.token;
            if (currentSpeakerBackUp.alias)
                speakerInfo.message.speaker.alias = currentSpeakerBackUp.alias;
        }
        if (!message.data.speaker.token && currentSpeakerBackUp?.token) {
            if (currentSpeakerBackUp.scene)
                message.data.speaker.scene = currentSpeakerBackUp.scene;
            if (currentSpeakerBackUp.actor)
                message.data.speaker.actor = currentSpeakerBackUp.actor;
            if (currentSpeakerBackUp.token)
                message.data.speaker.token = currentSpeakerBackUp.token;
            if (currentSpeakerBackUp.alias)
                message.data.speaker.alias = currentSpeakerBackUp.alias;
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
    //   if(!message.data.speaker.token && currentSpeakerBackUp?.token){
    //     if(currentSpeakerBackUp.scene) message.data.speaker.scene = currentSpeakerBackUp.scene;
    //     if(currentSpeakerBackUp.actor) message.data.speaker.actor = currentSpeakerBackUp.actor;
    //     if(currentSpeakerBackUp.token) message.data.speaker.token = currentSpeakerBackUp.token;
    //     if(currentSpeakerBackUp.alias) message.data.speaker.alias = currentSpeakerBackUp.alias;
    //   }
    //   if(render.render){
    //     const html:JQuery<HTMLElement> = $("<div>" + message.data.content + "</div>");
    //     let speakerInfo = message.data.speaker;
    //     //@ts-ignore
    //     if(!speakerInfo.alias && speakerInfo.document?.alias){
    //       //@ts-ignore
    //       speakerInfo.alias = speakerInfo.document?.alias;
    //     }
    //     await ChatPortrait.onRenderChatMessage(message, html, speakerInfo, imageReplacer);
    //     let updates = {
    //       content: html.html()
    //     };
    //     message.data.update(updates);
    //     //@ts-ignore
    //     speakerInfo.message = {};
    //      //@ts-ignore
    //     speakerInfo.message = message.data;
    //   }
    // });
    // let chatData:any = {
    //   type: ChatPortrait.getMessageTypeVisible(speakerInfo),
    //   user: getGame().user,
    //   speaker: speakerInfo,
    //   content: message.data.content,
    //   //@ts-ignore
    //   whisper: message.data.whisper ? message.data.whisper : speakerInfo.document.data.whisper,
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
    Hooks.on('preCreateChatMessage', async (message, options, render, userId) => {
        if (options) {
            // Update the speaker
            if (!options.speaker || (!options.speaker.token && !options.speaker.actor)) {
                let user = getGame().users?.get(options.user);
                let avatar;
                if (!user) {
                    user = getGame().users?.get(options.user.id);
                }
                let speakerInfo = {};
                let mytoken = ChatPortrait.getFirstPlayerToken();
                speakerInfo.alias = message.alias;
                speakerInfo.token = mytoken;
                speakerInfo.actor = getGame().actors?.get(user?.data.character);
                let updates = {
                    speaker: speakerInfo
                };
                message.data.update(updates);
            }
            // MidiQol , Better Rolls, and other modules.. sometime destroy the info
            // for my purpose i backup the speaker i will found on the preCreateChatMessage
            else if (options.speaker) {
                currentSpeakerBackUp = options.speaker;
                currentSpeakerBackUp.token = options.speaker.token.id;
            }
        }
        // if(render.render){
        //   const html:JQuery<HTMLElement> = $("<div>" + message.data.content + "</div>");
        //   let speakerInfo = message.data.speaker;
        //   //@ts-ignore
        //   if(!speakerInfo.alias && speakerInfo.document?.alias){
        //     //@ts-ignore
        //     speakerInfo.alias = speakerInfo.document?.alias;
        //   }
        //   await ChatPortrait.onRenderChatMessage(message, html, speakerInfo, imageReplacer);
        //   let updates = {
        //     content: html.html()
        //   };
        //   message.data.update(updates);
        //   //@ts-ignore
        //   speakerInfo.message = {};
        //    //@ts-ignore
        //   speakerInfo.message = message.data;
        //   if(flag){
        //     let chatData:any = {
        //       type: ChatPortrait.getMessageTypeVisible(speakerInfo),
        //       user: getGame().user,
        //       speaker: speakerInfo,
        //       content: message.data.content,
        //       //@ts-ignore
        //       whisper: message.data.whisper ? message.data.whisper : speakerInfo.document.data.whisper,
        //     };
        //     flag = false;
        //     ChatMessage.create(chatData,{});
        //   }else{
        //     flag = true;
        //   }
        // }
    });
};
export const initHooks = () => {
    warn("Init Hooks processing");
};