import CONSTANTS from "../constants";
import { debug, warn } from "../lib/lib";

var color;
var height;
var bgcolor;
var width = "80%";
var checkedSetting = false;

export const readySpeakAs = function () {
	const btn = document.querySelector("#speakerSwitch");
	btn?.addEventListener("click", (event) => {
		//@ts-ignore
		checkedSetting = document?.getElementById("speakerSwitch")?.checked;
	});

	Hooks.on("chatMessage", (dialog, $element, targets) => {
		let namelist = <any>document.getElementById("namelist");
		//@ts-ignore
		let checkedSpeakAS = <any>document.getElementById("speakerSwitch")?.checked;
		if (!checkedSpeakAS) {
			debug(`checkedSpeakAS is not checked`);
			return;
		}
		if (!namelist) {
			warn(`namelist is not checked`);
			return;
		}
		switch (namelist.value) {
			case "userName": {
				targets.speaker.actor = null;
				targets.speaker.token = null;
				//@ts-ignore
				targets.speaker.alias = null;
				break;
			}
			default: {
				let map = <any>game.scenes?.find((scene) => scene.isView);
				let tokenTarget = map.tokens.find((token) => {
					return (
						// token.name === namelist.options[namelist.selectedIndex].text ||
						// token.actor?.name === namelist.options[namelist.selectedIndex].text ||
						token.id === namelist.options[namelist.selectedIndex].value ||
						token.actor?.id === namelist.options[namelist.selectedIndex].value
					);
				});
				if (!tokenTarget) {
					debug(`No target is been found`);
					// targets.speaker.token = "Speak As zzzz";
					let actorTarget = game.actors?.find((actor) => {
						return (
							actor?.name === namelist.options[namelist.selectedIndex].text ||
							actor?.id === namelist.options[namelist.selectedIndex].value
						);
					});
					if (actorTarget) {
						targets.speaker.actor = actorTarget.id;
					}
					targets.speaker.alias = namelist.options[namelist.selectedIndex].text;
				}
				if (tokenTarget) {
					targets.speaker.token = tokenTarget.id;
					targets.speaker.alias = namelist.options[namelist.selectedIndex].text;
				}
				break;
			}
		}
	});

	Hooks.on("renderActorDirectory", (dialog, $element, targets) => {
		$("#divnamelist").remove();
		$("#chat-controls.flexrow").before(updateSpeakerList());
		check();

		$(".roll-type-select").css("color") ? (color = $(".roll-type-select").css("color")) : null;
		$(".roll-type-select").css("height") ? (height = $(".roll-type-select").css("height")) : null;
		$(".roll-type-select").css("background") ? (bgcolor = $(".roll-type-select").css("background")) : null;
		var x = document.querySelectorAll("#namelist");
		if (!x.length) {
			return;
		}
		if (width) {
			//@ts-ignore
			x[0].style.setProperty("width", width, "important");
		}
		if (color) {
			//@ts-ignore
			x[0].style.setProperty("color", color, "important");
		}
		if (height) {
			//@ts-ignore
			x[0].style.setProperty("height", height, "important");
		}
		if (bgcolor) {
			//@ts-ignore
			x[0].style.setProperty("background", bgcolor, "important");
		}
	});
};
export const renderSidebarTabSpeakAs = function (dialog, $element, targets) {
	/**
	 * 自己的登入名字
	 * 自己擁有的角色
	 */
	let HTML = $("div#chat-controls.flexrow")[0]; // $element.find(`div#chat-controls.flexrow`)[0];
	if (!HTML) {
		return;
	}
	$("#divnamelist").remove();
	$("#chat-controls.flexrow").before(updateSpeakerList());
	$(".roll-type-select").css("color") ? (color = $(".roll-type-select").css("color")) : null;
	$(".roll-type-select").css("height") ? (height = $(".roll-type-select").css("height")) : null;
	$(".roll-type-select").css("background") ? (bgcolor = $(".roll-type-select").css("background")) : null;
	check();

	var x = document.querySelectorAll("#namelist");
	if (width) {
		//@ts-ignore
		x[0].style.setProperty("width", width, "important");
	}
	if (color) {
		//@ts-ignore
		x[0].style.setProperty("color", color, "important");
	}
	if (height) {
		//@ts-ignore
		x[0].style.setProperty("height", height, "important");
	}
	if (bgcolor) {
		//@ts-ignore
		x[0].style.setProperty("background", bgcolor, "important");
	}
	$("#namelist").attr("title", "Speak As……");
	$("#speakerSwitch").attr("title", "Disable Speak As…… if unchecked");
};

function updateSpeakerList() {
	let myUser = <any>game.users?.find((user) => user.id == game.userId);
	let myactors = <any>game.actors?.filter((actor) => actor.permission >= 2);
	myactors = <Actor[]>myactors.sort((a, b) => a.name.localeCompare(b.name));
	let selectedCharacter = <any>myactors.find((actor) => actor.id === myUser.character?.id);
	let formConfig = ``;
	const options: string[] = [];
	if (selectedCharacter) {
		options.push(
			`<option data-image="${selectedCharacter.img}" selected="selected" value="${selectedCharacter.id}">${selectedCharacter.name}</option>`
		);
		options.push(
			`<option data-image="${myUser.avatar}" name="${myUser.name}" value="userName">${myUser.name}</option>`
		);
	} else {
		options.push(
			`<option data-image="${myUser.avatar}" selected="selected" name="${myUser.name}" value="userName">${myUser.name}</option>`
		);
	}

	myactors.forEach((a: Actor) => {
		options.push(`<option data-image="${a.img}"  value="${a.id}">${a.name}</option>`);
	});

	let addText = `
	<div style="flex: 0;" id="divnamelist">
		<input type="checkbox" id="speakerSwitch" name="speakerSwitch" checked>
		<select 
			class="actor-template" 
			id="namelist"
			name="namelist" 
			class="namelist"
			data-dtype="String" 
			is="ms-dropdown-chat-portrait"
			data-enable-auto-filter
			>
			<optgroup label="Speak As....">
			${options.join("")}
			</optgroup>
		</select>
    </div>
    `;
	/*
	let addText = `<div style="flex: 0;" id="divnamelist">
    <input type="checkbox" id="speakerSwitch" name="speakerSwitch" checked>
    <select name="namelist" id="namelist" class="namelist">
    <optgroup label="Speak As....">`;
	if (selectedCharacter) {
		addText += `<option value="${selectedCharacter.id}">${selectedCharacter.name}</option>`;
	}
	addText += `<option value="userName" name="XX">${myUser.name}</option>`;
	for (let index = 0; index < myactors.length; index++) {
		addText += `\n<option value="${myactors[index].id}">${myactors[index].name}</option>`;
	}
	addText += `\n</select></div>`;
	*/
	return addText;
}

function check() {
	// let checkedSetting = game.settings.get(CONSTANTS.MODULE_NAME, "speak-as-checked");
	let speaker = document.getElementById("speakerSwitch");
	if (speaker) {
		//@ts-ignore
		speaker.checked = checkedSetting;
	}
}
