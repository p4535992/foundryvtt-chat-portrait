import { ChatPortrait } from "./ChatPortrait.js";
import Logger from "./lib/Logger.js";
/**
 * Class that encapsulates a better rolls card at runtime.
 * When a chat message enters the chat it should be binded
 * with ChatPortraitChatCard.bind().
 */
export class ChatPortraitChatCard extends ChatMessage {
    // id: string;
    // roll:Roll;
    constructor(message, html, speakerInfo, imageReplacer) {
        super(message);
        this.updateBinding(message, html, speakerInfo, imageReplacer);
    }
    get message() {
        return game.messages?.get(this.id);
    }
    /**
     * Initializes data. Used in the constructor or by ChatPortraitChatCard.bind().
     * @param {*} message
     * @param {*} html
     * @private
     */
    updateBinding(message, html, speakerInfo, imageReplacer) {
        this.speaker = game.actors?.get(message.speaker.actor);
        ChatPortrait.onRenderChatMessage(message, html, speakerInfo, imageReplacer);
    }
    /**
     * Inflates an existing chat message, adding runtime elements
     * and events to it. Does nothing if the message is not the correct type.
     * @param {ChatMessage} message
     * @param {JQuery} html
     */
    static async bind(message, html, speakerInfo, imageReplacer) {
        const chatCard = html.find(".message-sender");
        if (chatCard.length === 0) {
            return null;
        }
        // Check if the card already exists
        const existing = message.ChatPortraitCardBinding;
        if (existing) {
            Logger.log("Retrieved existing card");
            //existing.updateBinding(message, chatCard);
            existing.updateBinding(message, html, speakerInfo, imageReplacer);
            // Pulse the card to make it look more obvious
            // Wait for the event queue before doing so to allow CSS calculations to work,
            // otherwise the border color will be incorrectly transparent
            window.setTimeout(() => {
                //
                gsap?.from(html.get(), {
                    "border-color": "red",
                    "box-shadow": "0 0 6px inset #ff6400",
                    duration: 2,
                });
            }, 0);
            // Scroll to bottom if the last card had updated
            const messagesSize = game.messages?.size || 0;
            const last = game.messages?.contents[messagesSize - 1];
            if (last?.id === existing.id) {
                //window.setTimeout(() => { ui.chat?.scrollBottom(); }, 0);
                window.setTimeout(function () {
                    const log = document.querySelector("#chat-log");
                    const shouldForceScroll = log ? ChatPortrait.shouldScrollToBottom(log) : false;
                    if (log && shouldForceScroll) {
                        log.scrollTo({ behavior: "smooth", top: log.scrollHeight });
                    }
                }, 50);
            }
            return existing;
        } else {
            const newCard = new ChatPortraitChatCard(message, html, speakerInfo, imageReplacer);
            message.ChatPortraitCardBinding = newCard;
            return newCard;
        }
    }
}
