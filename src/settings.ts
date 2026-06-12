import {App, PluginSettingTab, Setting} from "obsidian";
import NoteTabsPlugin from "./main";
import { NOTETABS_CONSTANTS, NOTETABS_IDENTIFIERS } from 'lib/constants';
import { parseHTMLStringAndAppend } from 'lib/utils';

export interface NoteTabsSettings {
	tabOrientation: string;
	tabRoundedEdges: boolean;
	tabStyle: string;
}

export const DEFAULT_SETTINGS: NoteTabsSettings = {
	tabOrientation: NOTETABS_IDENTIFIERS.settingsLayout.classNames.tab.defaultOrientation,
	tabRoundedEdges: true,
	tabStyle: NOTETABS_IDENTIFIERS.settingsStyles.classNames.default
}

export class NoteTabsSettingsTab extends PluginSettingTab {
	plugin: NoteTabsPlugin;

	constructor(app: App, plugin: NoteTabsPlugin) {
		super(app, plugin);
		this.plugin = plugin;
	}

	display() {
		const { basicLayout, settingsLayout, settingsStyles } = NOTETABS_IDENTIFIERS;
		const { containerEl } = this;
		containerEl.empty();

		// Layout settings header
		const LayoutSettingsHeader = new Setting(containerEl);
		LayoutSettingsHeader
			.setName('Layout')
			.setHeading()
			.setClass(basicLayout.classNames.settings.header);

		// Orientation settings
		const TabOrientationSettings = new Setting(containerEl);
		TabOrientationSettings
			.setName('Tab orientation')
			.setDesc('Use horizontal or vertical tab headers.')
			.addDropdown((dropdown) =>
				dropdown
					.addOption(settingsLayout.classNames.tab.defaultOrientation, settingsLayout.labels.tab.defaultOrientation)
					.addOption(settingsLayout.classNames.tab.verticalOrientation, settingsLayout.labels.tab.verticalOrientation)
					.setValue(this.plugin.settings.tabOrientation)
					.onChange(async (val) => {
						this.plugin.settings.tabOrientation = val;
						await this.plugin.saveSettings();
					})
			);

		// Edge style settings
		const EdgeStyleSettings = new Setting(containerEl);
		EdgeStyleSettings
			.setName('Rounded edges')
			.setDesc('Use rounded edges for layout styles')
			.addToggle((toggle) =>
				toggle
					.setValue(this.plugin.settings.tabRoundedEdges)
					.onChange(async (val) => {
						this.plugin.settings.tabRoundedEdges = val;
						await this.plugin.saveSettings();
					})
			);

		// Appearance settings header
		const StyleSettingsHeader = new Setting(containerEl);
		StyleSettingsHeader
			.setName('Appearance')
			.setHeading()
			.setClass(basicLayout.classNames.settings.header);

		const TabStyleSettings = new Setting(containerEl);
		TabStyleSettings
			.setName('Tab style')
			.setDesc('Look and feel of note tabs.')
			.addDropdown((dropdown) =>
				dropdown
					.addOption(settingsStyles.classNames.default, settingsStyles.labels.default)
					.addOption(settingsStyles.classNames.defaultCompact, settingsStyles.labels.defaultCompact)
					.addOption(settingsStyles.classNames.minimalist, settingsStyles.labels.minimalist)
					.addOption(settingsStyles.classNames.minimalistCompact, settingsStyles.labels.minimalistCompact)
					.setValue(this.plugin.settings.tabStyle)
					.onChange(async (val) => {
						this.plugin.settings.tabStyle = val;
						await this.plugin.saveSettings();
					})
			);

		// Support button
		const SupportArea = containerEl.createDiv();
		parseHTMLStringAndAppend((NOTETABS_CONSTANTS.support?.callout || ''), SupportArea);
	}
}
