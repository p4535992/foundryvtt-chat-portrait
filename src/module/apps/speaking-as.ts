import CONSTANTS from "../constants";
import { i18n, i18nFormat, info } from "../lib/lib";

const CSS_PREFIX = `${CONSTANTS.MODULE_NAME}--`;

const CSS_CURRENT_SPEAKER = CSS_PREFIX + "currentSpeaker";

const CHAT_MESSAGE_SUB_TYPES = {
	NONE: 0,
	DESC: 1,
	AS: 2
};

let image;

// Add name
let text;

// Add buttons / indicators
let locked;

let lastHoveredToken;

let currentSpeakerDisplay;

function getThisSceneTokenObj(speaker) {
	let token = <Token>getTokenObj(speaker.token);
	if (!token) {
		token = <Token>getThisSceneTokenObjForActor(speaker.actor);
	}
	return token;
}

function getThisSceneTokenObjForActor(actorID) {
	let token: Token | null = null;
	const scene = game.scenes?.get(<string>game.user?.viewedScene);
	if (scene) {
		const thisSceneToken = scene.tokens.find((token: any) => {
			return token.actor && token.actor.id === actorID;
		});
		if (thisSceneToken) {
			token = <Token>getTokenObj(thisSceneToken.id);
		}
	}
	return token;
}

function getTokenObj(id) {
	if (!canvas.ready) {
		info(`getTokenObj(${id}) bailed - canvas is not ready yet`);
		return undefined;
	}
	return canvas.tokens?.get(id);
}

export const initSpeakingAs = function () {
	// Create our div
	currentSpeakerDisplay = document.createElement("div");
	currentSpeakerDisplay.classList.add(CSS_CURRENT_SPEAKER);

	// Add images
	image = <any>`<img class="${CSS_CURRENT_SPEAKER}--icon">`;

	// Add name
	text = <any>`<span class="${CSS_CURRENT_SPEAKER}--text"></span>`;

	// Add buttons / indicators
	locked = <any>`<i class="fa-solid fa-unlock ${CSS_CURRENT_SPEAKER}--locked"></i>`;

	// Once: <i class="fa-solid fa-circle-1"></i>
	// Repeat: <i class="fa-solid fa-repeat"></i>
	let oocButton = <any>(
		$(
			$.parseHTML(
				`<i class="fa-solid fa-user ${CSS_CURRENT_SPEAKER}--button" data-tooltip=""><i class="${CSS_CURRENT_SPEAKER}--buttonInset fa-solid fa-inverse" mode="0"></i></i>`
			)
		)
	);
	oocButton.click(function (event) {
		event.stopPropagation();
		let classes = <string[]>["", "fa-circle-1", "fa-repeat"];
		$(`.${CSS_CURRENT_SPEAKER}--buttonInset`).attr("mode", mode() >= 2 ? 0 : mode() + 1);
		$(`.${CSS_CURRENT_SPEAKER}--buttonInset`)
			.removeClass(classes.at(mode() - 1) ?? "")
			.addClass(<string>classes.at(mode()));

		updateSpeaker();
	});

	$(currentSpeakerDisplay).append(image).append(text).append(locked).append(oocButton);
};

const hoverIn = (event, speaker) => {
	let token = getThisSceneTokenObj(speaker);
	if (token && token.isVisible) {
		event.fromChat = true;
		//@ts-ignore
		token._onHoverIn(event);
		//@ts-ignore
		lastHoveredToken = token;
	}
};

const hoverOut = (event) => {
	if (lastHoveredToken) {
		event.fromChat = true;
		//@ts-ignore
		lastHoveredToken._onHoverOut(event);
		lastHoveredToken = null;
	}
};

const panToSpeaker = (speaker) => {
	panToToken(getThisSceneTokenObj(speaker));
};

const panToToken = (token) => {
	if (token && token.isVisible) {
		//@ts-ignore
		const scale = Math.max(1, canvas.stage?.scale.x);
		canvas.animatePan({ ...token.center, scale, duration: 1000 });
	}
};

const hasTokenOnSheet = (actor) => {
	return !!getThisSceneTokenObjForActor(actor.id);
};

const selectActorToken = (actor) => {
	let token = <Token>getThisSceneTokenObjForActor(actor.id);
	token.control();
	panToToken(token);
};

function updateMessageData(messageData, ...args) {
	return messageData.updateSource.apply(messageData, args);
}

// https://github.com/cs96and/FoundryVTT-CGMP/blob/c9ff185fb5dcdde67815039dc78a5de409a24956/module/scripts/chat-resolver.js#L122
function convertToOoc(messageData) {
	// For all types of messages, change the speaker to the GM.
	// Convert in-character message to out-of-character, and remove the actor and token.

	const isInCharacter = CONST.CHAT_MESSAGE_TYPES.IC === messageData.type;
	const newType = isInCharacter ? CONST.CHAT_MESSAGE_TYPES.OOC : messageData.type;
	const newActor = isInCharacter ? null : messageData.speaker.actor;
	const newToken = isInCharacter ? null : messageData.speaker.token;
	const newTokenD = isInCharacter ? null : messageData.token;
	const newActorD = isInCharacter ? null : messageData.actor;

	const user = messageData.user instanceof User ? messageData.user : game.users?.get(messageData.user);

	updateMessageData(messageData, {
		type: newType,
		speaker: {
			actor: newActor,
			alias: user.name,
			token: newToken
		},
		token: newTokenD,
		actor: newActorD
	});
}

export function overrideMessage(messageData) {
	if (mode() === 0) return;
	switch (messageData?.flags?.cgmp?.subType) {
		case CHAT_MESSAGE_SUB_TYPES.AS:
		case CHAT_MESSAGE_SUB_TYPES.DESC: {
			break;
		}
		default: {
			//@ts-ignore
			convertToOoc(messageData, true);
			break;
		}
	}
	if (mode() === 1) {
		$(`.${CSS_CURRENT_SPEAKER}--buttonInset`).attr("mode", 0);
		$(`.${CSS_CURRENT_SPEAKER}--buttonInset`).removeClass("fa-circle-1");
		updateSpeaker();
	}
}

function mode() {
	return Number($(`.${CSS_CURRENT_SPEAKER}--buttonInset`).attr("mode"));
}

export function updateSpeaker() {
	// Get the token speaker, if it doesn't exist it turns undefined.
	let tokenDocument = <
		TokenDocument //@ts-ignore
	>fromUuidSync(`Scene.${ChatMessage.getSpeaker().scene}.Token.${ChatMessage.getSpeaker().token}`);
	let name = <string>ChatMessage.getSpeaker().alias;
	let lockReason: any = false;

	if (mode() !== 0) {
		lockReason = game.i18n.localize("chat-portrait.self-locked");
		name = <string>game.user?.name;
	}

	const speakerObject =
		name !== game.user?.name
			? <any>{
					actor: tokenDocument?.actor?.id,
					alias: name,
					scene: tokenDocument?.parent?.id ?? game.user?.viewedScene,
					token: tokenDocument?.id
			  }
			: <any>{
					alias: name,
					scene: game.user?.viewedScene
			  };

	// Compatibility with Cautious Gamemaster's Pack
	// 1 - Disable Speaking as PC (GM ONLY, you can still speak as non-player owned tokens)
	// 2 - Force in Character (only ASSIGNED characters)
	// 3 - Force out of Character (always out of character)

	// If the module is active
	if (game.modules.get("CautiousGamemastersPack")?.active) {
		// If the user is a player and is forced to be always out of character (3)
		// If the user is a gamemaster and is forced to be always out of character (3)
		if (
			(game.user?.isGM && game.settings.get("CautiousGamemastersPack", "gmSpeakerMode") === 3) ||
			(!game.user?.isGM && game.settings.get("CautiousGamemastersPack", "playerSpeakerMode") === 3)
		) {
			name = <string>game.user?.name;
			lockReason = `${game.i18n.format("chat-portrait.locked", { module: "Cautious Gamemaster's Pack" })}`;
		}
		// If the user is a gamemaster and cannot speak as PC tokens (1)
		if (
			game.user?.isGM &&
			game.settings.get("CautiousGamemastersPack", "gmSpeakerMode") === 1 &&
			tokenDocument?.actor?.hasPlayerOwner
		) {
			name = <string>game.user?.name;
			lockReason = `${game.i18n.format("chat-portrait.locked", { module: "Cautious Gamemaster's Pack" })}`;
		}
		// If the user is a gamemaster and is forced to be always in character (2)
		if (
			(game.user?.isGM && game.settings.get("CautiousGamemastersPack", "gmSpeakerMode") === 2) ||
			(!game.user?.isGM && game.settings.get("CautiousGamemastersPack", "playerSpeakerMode") === 2)
		) {
			//@ts-ignore
			tokenDocument = <TokenDocument>game.user?.character?.prototypeToken;
			name = <string>game.user?.character?.name;
			lockReason = `${game.i18n.format("chat-portrait.locked", { module: "Cautious Gamemaster's Pack" })}`;
		}
	}

	// If a token is available and the user can speak as the character.
	if (tokenDocument && name !== game.user?.name) {
		//@ts-ignore
		image = `<img src="${tokenDocument.texture?.src}" class="${CSS_CURRENT_SPEAKER}--icon" style="transform: scale(${tokenDocument.texture.scaleX})">`;
	} else {
		image = `<img src="${game.user?.avatar}" class="${CSS_CURRENT_SPEAKER}--icon">`;
	}
	text = `<span class="${CSS_CURRENT_SPEAKER}--text">${name}</span>`;

	locked = $(
		$.parseHTML(
			`<i class="fa-solid fa-unlock ${CSS_CURRENT_SPEAKER}--locked" data-tooltip="${game.i18n.localize(
				"chat-portrait.unlocked"
			)}"></i>`
		)
	);
	if (lockReason) {
		$(locked).attr("data-tooltip", lockReason);
		$(locked).removeClass("fa-unlock").addClass("fa-lock");
	}

	image = $(image);
	text = $(text);
	locked = $(locked);

	var textAndImage = $().add(image).add(text);
	textAndImage
		// hover over token
		.hover(
			(event) => {
				hoverIn(event, speakerObject);
			},
			(event) => {
				//@ts-ignore
				hoverOut(event, speakerObject);
			}
		)
		// add hover glow on token
		.hover(function () {
			if (name !== game.user?.name) $(this).toggleClass(`shadow`);
		})
		// double click to pan to the token
		.dblclick(() => panToSpeaker(speakerObject));

	$(image).on("load", () => {
		if ($(`${CSS_CURRENT_SPEAKER}--icon`).html() !== image.html()) {
			$(`.${CSS_CURRENT_SPEAKER}--icon`).replaceWith(image);
		}
		if ($(`${CSS_CURRENT_SPEAKER}--text`).html() !== text.html()) {
			$(`.${CSS_CURRENT_SPEAKER}--text`).replaceWith(text);
		}
		if ($(`${CSS_CURRENT_SPEAKER}--locked`).html() !== locked.html()) {
			$(`.${CSS_CURRENT_SPEAKER}--locked`).replaceWith(locked);
		}
		setTimeout(<any>checkWarn(), 0);
	});
}

Hooks.once("renderChatLog", () => {
	if (game.settings.get(CONSTANTS.MODULE_NAME, "enableSpeakingAs")) {
		const chatControls = <HTMLElement>document.getElementById("chat-controls");
		// "be last" magic trick from Supe
		setTimeout(async () => {
			chatControls.parentNode?.insertBefore(currentSpeakerDisplay, chatControls);
			// Apparently game.i18n.localize is not loaded when the button is added so it's here instead.
			$(`.${CSS_CURRENT_SPEAKER}--button`).attr(
				"data-tooltip",
				i18n("chat-portrait.buttonHint")
			);
		}, 0);

		const currentSpeakerToggleMenu = new ContextMenu(
			$(<any>chatControls?.parentNode),
			"." + CSS_CURRENT_SPEAKER,
			[]
		);
		const originalRender = currentSpeakerToggleMenu.render.bind(currentSpeakerToggleMenu);
		currentSpeakerToggleMenu.render = (...args) => {
			const actors = game.actors?.contents.filter((a) => a.isOwner && hasTokenOnSheet(a));
			const speakerOptions = <any[]>[];
			for (let actor of <Actor[]>actors) {
				speakerOptions.push({
					name: <string>actor.name,
					icon: "",
					callback: () => {
						selectActorToken(actor);
					}
				});
			}
			currentSpeakerToggleMenu.menuItems = speakerOptions;
			originalRender(...args);
		};

		setTimeout(async () => {
			updateSpeaker();
			$("#chat-message").on("input", () => {
				checkWarn();
			});
			$("#chat-message").on("keydown", () => {
				$("#chat-message").removeClass(CSS_PREFIX + "warning");
				//@ts-ignore
				game.tooltip.deactivate();
			});
		}, 0);

		// Remove Illandril's Chat Enhancements display
		if (game.modules.get("illandril-chat-enhancements")?.active) {
			document.getElementsByClassName("illandril-chat-enhancements--current-speaker")[0]?.remove();
		}
	}
});

function checkWarn() {
	// Add a warning on key enter if the textarea contains quotes, as if you were talking in character.
	if (
		game.settings.get(CONSTANTS.MODULE_NAME, "speakingAsWarningCharacters") === "" ||
		$(".chat-portrait--currentSpeaker--text").text() !== game.user?.name || // Return if speaking out of character
		["/ic", "/ooc", "/emote"].some((str: string) => (<string>$("#chat-message").val())?.includes(str)) // Return if the message contains a command that would deliberately make you speak in or out of character
	) {
		$("#chat-message").removeClass(CSS_PREFIX + "warning");
		//@ts-ignore
		game.tooltip.deactivate();
		return;
	}

	const regex = new RegExp(<string>game.settings.get(CONSTANTS.MODULE_NAME, "speakingAsWarningCharacters"));
	if (regex.test(<string>$("#chat-message").val())) {
		$("#chat-message").addClass(CSS_PREFIX + "warning");
		//@ts-ignore
		game.tooltip.activate($("#chat-message")[0], {
			text: i18nFormat("chat-portrait.speakingAs.buttonHint.warning", {
				characters: game.settings.get(CONSTANTS.MODULE_NAME, "speakingAsWarningCharacters")
			}),
			direction: "LEFT"
		});
	} else {
		$("#chat-message").removeClass(CSS_PREFIX + "warning");
		//@ts-ignore
		game.tooltip.deactivate();
	}
}

// Hooks.on("controlToken", updateSpeaker);
// Hooks.on('preCreateChatMessage', overrideMessage);
