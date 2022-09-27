export interface ChatPortraitSettings {
	useTokenImage: boolean;
	doNotUseTokenImageWithSpecificType: string;
	useTokenName: boolean;
	portraitSize: number;
	portraitSizeItem: number;
	borderShape: string;
	useUserColorAsBorderColor: boolean;
	borderColor: string;
	borderWidth: number;
	useUserColorAsChatBackgroundColor: boolean;
	useUserColorAsChatBorderColor: boolean;
	// flavorNextToPortrait: boolean;
	forceNameSearch: boolean;
	// hoverTooltip: boolean,
	textSizeName: number;
	displaySetting: string;
	useAvatarImage: boolean;
	displayPlayerName: boolean;
	displayUnknown: string;
	displayUnknownPlaceHolderActorName: string;
	displayUnknownPlaceHolderItemName: string;
	displayUnknownPlaceHolderItemIcon: string;
	displaySettingOTHER: boolean;
	displaySettingOOC: boolean;
	displaySettingIC: boolean;
	displaySettingEMOTE: boolean;
	displaySettingWHISPER: boolean;
	displaySettingROLL: boolean;
	displaySettingWhisperToOther: boolean;
	// customStylingMessageSystem: boolean;
	customStylingMessageText: string;
	customStylingMessageImage: string;
	displayMessageTag: boolean;
	// displayMessageTagNextToName: boolean;
	useImageReplacer: boolean;
	useImageReplacerDamageType: boolean;
	applyOnCombatTracker: boolean;
	// applyPreCreateChatMessagePatch: boolean;
	disablePortraitForAliasGmMessage: boolean;
	setUpPortraitForAliasGmMessage: string;
}
