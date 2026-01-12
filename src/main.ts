import { Plugin } from 'obsidian';
import { DEFAULT_SETTINGS, NoteTabsSettingsTab, NoteTabsSettings } from "./settings";
import { notetabsCodeBlockProcessor, notetabsAddNewTabSection, notetabsAddNewTab, notetabsApplyUpdatedSettings } from 'lib/plugin.helpers';

export default class NoteTabsPlugin extends Plugin {
	settings: NoteTabsSettings;

	async onload() {
		await this.loadSettings();

		// Register context menu items
		this._registerContexMenuItems();

		// Register code block
		this._registerCodeBlockType();

		// add settings
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
	private _registerCodeBlockType() {
		this.registerMarkdownCodeBlockProcessor('notetabs', async (source, el, ctx) => {
			await notetabsCodeBlockProcessor(source, el, ctx, this);
		});
	}

	/**
	 * Register context menu items
	 * @internal
	 */
	private _registerContexMenuItems() {
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
}
