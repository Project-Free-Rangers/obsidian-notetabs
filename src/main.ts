import { Plugin } from 'obsidian';
import { DEFAULT_SETTINGS, NoteTabsSettingsTab, NoteTabsSettings } from "./settings";
import { notetabsCodeBlockProcessor, notetabsAddNewTabSection, notetabsAddNewTab, notetabsApplyUpdatedSettings, notetabsRerenderEmbeds } from 'lib/plugin.helpers';

export default class NoteTabsPlugin extends Plugin {
	settings: NoteTabsSettings;

	async onload() {
		await this.loadSettings();

		// Register context menu items
		this.__registerContexMenuItems();

		// Register code block
		this.__registerCodeBlockType();

		// Register events
		this.__registerRerenderEvent();

		// Add settings
		this.addSettingTab(new NoteTabsSettingsTab(this.app, this));
	}

	onunload() {
	}

	async loadSettings() {
		this.settings = Object.assign({}, DEFAULT_SETTINGS, await this.loadData() as Partial<NoteTabsSettings>);
	}

	async saveSettings() {
		await this.saveData(this.settings);

		// update settings
		notetabsApplyUpdatedSettings(this);
	}

	/**
	 * Register code block type
	 * @internal
	 */
	__registerCodeBlockType() {
		this.registerMarkdownCodeBlockProcessor('notetabs', async (source, el, ctx) => {
			await notetabsCodeBlockProcessor(source, el, ctx, this);
		});
	}

	/**
	 * Register context menu items
	 * @internal
	 */
	__registerContexMenuItems() {
		this.registerEvent(
			this.app.workspace.on('editor-menu', (menu, editor) => {
				menu.addSeparator()
				.addItem((item) =>
					item
						.setTitle('Add new notetabs section')
						.setIcon('notebook-tabs')
						.onClick(() => {
							notetabsAddNewTabSection(editor);
						})
				)
				.addItem((item) =>
					item
						.setTitle('Add new notetabs tab')
						.setIcon('notebook-tabs')
						.onClick(() => {
							notetabsAddNewTab(editor);
						})
				);
			})
		);
	}

	/**
	 * Register render event for fallback rerender of embeds
	 * @internal
	 */
	__registerRerenderEvent() {
		this.registerEvent(this.app.workspace.on('active-leaf-change', (leaf) => {
			if (leaf) {
				notetabsRerenderEmbeds(leaf, this);
			}
		}));
	}
}
