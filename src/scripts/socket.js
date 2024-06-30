import CONSTANTS from "./constants.js";
import "./api.js";
import { setSocket } from "../module.js";
import Logger from "./lib/Logger.js";
export const SOCKET_HANDLERS = {
    // TODO ADD SOCKET HANLDER
};
export let chatPortraitSocket;
export function registerSocket() {
    Logger.debug("Registered chatPortraitSocket");
    if (chatPortraitSocket) {
        return chatPortraitSocket;
    }
    //
    chatPortraitSocket = socketlib.registerModule(CONSTANTS.MODULE_ID);
    // TODO add some socket method ?
    setSocket(chatPortraitSocket);
    return chatPortraitSocket;
}
