import CONSTANTS from "./constants.js";
import "./api.js";
import { debug } from "./lib/lib.js";
import { setSocket } from "../module.js";
export const SOCKET_HANDLERS = {
  // TODO ADD SOCKET HANLDER
};
export let chatPortraitSocket;
export function registerSocket() {
  debug("Registered chatPortraitSocket");
  if (chatPortraitSocket) {
    return chatPortraitSocket;
  }
  //@ts-ignore
  chatPortraitSocket = socketlib.registerModule(CONSTANTS.MODULE_NAME);
  // TODO add some socket method ?
  setSocket(chatPortraitSocket);
  return chatPortraitSocket;
}
