import { MarkdownPostProcessorContext, MarkdownView, Notice, Editor, WorkspaceLeaf } from 'obsidian';
import NoteTabsPlugin from 'main';
import { NOTETABS_CONSTANTS, NOTETABS_ATTRIBUTES, NOTETABS_IDENTIFIERS, NOTETABS_TAGS } from 'lib/constants';
import { addInitialTabClassesAndAttributes, cleanAndRenderTabs, setElAttributes } from 'lib/utils';
import { NoteTabsAttributes, NoteTabsConstants, NoteTabsIdentifiers, NoteTabsTags } from './constants.types';
import { NoteTabsSettings } from 'settings';

/**
 * NOTE:
 * Using function declarations here instead of function expressions because of hoisting benefits.
 * These functions should be available for calling as soon as possible, regardless of when they've been defined.
 */

/**
 * Note Tabs code block processor
 *
 * @param source - Raw markdown value of the Note Tabs code block
 * @param el - MarkdownView.contentEl
 * @param ctx - MardownPostProcessorContext passed by registerMarkdownCodeBlockProcessor
 * @param plugin - NoteTabsPlugin
 * @param pluginAttributes - Optional dictionary of Note Tabs attributes. Default value `NOTETABS_ATTRIBUTES`
 * @param pluginTags - Optional dictionary of Notes Tabs tags. Default value `NOTETABS_TAGS`
 * @returns Promise with a `void` return value
 */
export async function notetabsCodeBlockProcessor(
  source: string,
  el: HTMLElement,
  ctx: MarkdownPostProcessorContext,
  plugin: NoteTabsPlugin,
  pluginAttributes: NoteTabsAttributes = NOTETABS_ATTRIBUTES,
  pluginTags: NoteTabsTags = NOTETABS_TAGS
): Promise<void> {
  const { basicLayout } = NOTETABS_IDENTIFIERS;

  el.empty();

  let tabCounter = 0;
  const sourceTabs = source.split(pluginTags.tab.closer);

  const noteTabsSection = el.createDiv();
  const tabHeadSection = noteTabsSection.createDiv();
  const tabContentSection = noteTabsSection.createDiv();

  // Get the component of the active workspace to ensure the MarkdownRender processes correctly
  const activeView = plugin.app.workspace.getActiveViewOfType(MarkdownView);

  const tabHeadList = [];
  const _tabHeadHandler = (e: Event & { currentTarget: HTMLElement }) => {
    const { currentTarget } = e;

    if (!tabHeadSection.contains(currentTarget)) {
      new Notice('Invalid notetabs header click target!');
      return;
    }

    /**
     * Deactivate siblings
     */
    const siblings = Array.from(
      tabHeadSection.querySelectorAll<HTMLElement>(`.${basicLayout.classNames.tab.header}:not([${pluginAttributes.tab.id}="${currentTarget.dataset.id}"])`)
    );

    for (const nonActiveHead of siblings) {
      const nonActiveBody = tabContentSection.querySelector(`[${pluginAttributes.tab.id}="${nonActiveHead.dataset.xContent}"]`);

      if (!(nonActiveBody instanceof HTMLElement)) continue;

      // set head attributes
      setElAttributes([
        { attr: pluginAttributes.active.attr, val: pluginAttributes.active.state.off.toString() }
      ], nonActiveHead);

      // remove class if needed
      nonActiveHead.removeClass(basicLayout.classNames.tab.active.leftSibling);

      // set body attributes
      setElAttributes([
        { attr: pluginAttributes.active.attr, val: pluginAttributes.active.state.off.toString() }
      ], nonActiveBody);
    }

    /**
     * Activate target
     */
    const activeBody = tabContentSection.querySelector(`[${pluginAttributes.tab.id}="${currentTarget.dataset.xContent}"]`);
    const activeLeftSibling = currentTarget.previousElementSibling;

    if (!(activeBody instanceof HTMLElement)) {
      new Notice('No active tab body found in current view.');
      return;
    }

    // set head attributes
    setElAttributes([
      { attr: pluginAttributes.active.attr, val: pluginAttributes.active.state.on.toString() }
    ], currentTarget);

    // set body attributes
    setElAttributes([
      { attr: pluginAttributes.active.attr, val: pluginAttributes.active.state.on.toString() }
    ], activeBody);

    // set left sibling attributes
    if (activeLeftSibling) {
      activeLeftSibling.addClass(basicLayout.classNames.tab.active.leftSibling);
    }
  };

  if (activeView) {
    for (let t = 0; t < sourceTabs.length; t++) {
      const tab = sourceTabs[t];

      if (!tab || typeof tab !== 'string') continue;

      const cleaned = await cleanAndRenderTabs(tab, ctx.sourcePath, activeView.app, activeView);

      if (cleaned?.header) {
        tabCounter+= 1;
        const tabHead = cleaned.header;
        const tabContent = cleaned.content;

        // update HTML
        tabHeadSection.appendChild(tabHead);
        tabContentSection.appendChild(tabContent);

        // add classes and attributes
        addInitialTabClassesAndAttributes(tabHead, tabContent, t);

        // set inline CSS position variable
        tabHead.style.setProperty('--pos', `${t}`);
        tabContent.style.setProperty('--pos', `${t}`);

        // add event listener
        tabHead.addEventListener('click', _tabHeadHandler, true);

        // add to tab head list
        tabHeadList.push(tabHead);
      }
    }
  }

  // add section classes
  noteTabsSection.addClass(basicLayout.classNames.container);
  tabHeadSection.addClass(basicLayout.classNames.section.header);
  tabContentSection.addClass(basicLayout.classNames.section.content);

  // add settings
  notetabsApplySettings(noteTabsSection, plugin.settings);

  // add inline CSS tab count variable
  noteTabsSection.style.setProperty('--tab-count', `${tabCounter}`);
}

/**
 * Apply settings to Note Tabs containers
 *
 * @param containerEl - Note Tabs container
 * @param pluginSettings - NoteTabsPlugin.settings
 * @param pluginAttributes - Optional dictionary of Note Tabs attributes. Default value `NOTETABS_ATTRIBUTES`
 */
export function notetabsApplySettings(
  containerEl: HTMLElement,
  pluginSettings: NoteTabsSettings,
  pluginAttributes: NoteTabsAttributes = NOTETABS_ATTRIBUTES
): void {
  const { settings } = pluginAttributes;

  setElAttributes([
    { attr: settings.orientation, val: pluginSettings.tabOrientation },
    { attr: settings.edges, val: pluginSettings.tabRoundedEdges.toString() },
    { attr: settings.style, val: pluginSettings.tabStyle }
  ], containerEl);
}

/**
 * Add new Note Tabs container section
 *
 * @param editor - MarkdownView.editor
 * @param pluginConstants - Optional dictionary of Note Tabs constants. Default value `NOTETABS_CONSTANTS`
 */
export function notetabsAddNewTabSection(editor: Editor, pluginConstants: NoteTabsConstants = NOTETABS_CONSTANTS): void {
  if (!editor) return;

  editor.replaceRange(
    pluginConstants.emptySection,
    editor.getCursor()
  );
}


/**
 * Add new Note Tabs tab
 *
 * @param editor - MarkdownView.editor
 * @param pluginConstants - Optional dictionary of Note Tabs constants. Default value `NOTETABS_CONSTANTS`
 */
export function notetabsAddNewTab(editor: Editor, pluginConstants: NoteTabsConstants = NOTETABS_CONSTANTS): void {
  if (!editor) return;

  editor.replaceRange(
    pluginConstants.emptyTab,
    editor.getCursor()
  );
}

/**
 * Apply updated changes made from the Settings menu
 *
 * @public
 * @param plugin - NoteTabsPlugin
 * @param pluginIndentifiers - Optional dictionary of Note Tabs indentifiers. Default value `NOTETABS_CONSTANTS`
 */
export function notetabsApplyUpdatedSettings(plugin: NoteTabsPlugin, pluginIndentifiers: NoteTabsIdentifiers = NOTETABS_IDENTIFIERS): void {
  plugin.app.workspace.iterateAllLeaves((leaf) => {
    if (!(leaf.view instanceof MarkdownView)) return;

    const { containerEl } = leaf.view;
    const { basicLayout } = pluginIndentifiers;

    const noteTabsCollection = Array.from(
      containerEl.querySelectorAll(`.${basicLayout.classNames.container}`)
    );

    for (const notetabs of noteTabsCollection as HTMLElement[]) {
      notetabsApplySettings(notetabs, plugin.settings);
    }
  });
}

/**
 * Fallback rerender method for embeds inside Note Tabs
 *
 * @param leaf - WorkspaceLeaf passed by event listener
 * @param plugin - NoteTabsPlugin
 * @param pluginIndentifiers - Optional dictionary of Note Tabs indentifiers. Default value `NOTETABS_IDENTIFIERS`
 */
export function notetabsRerenderEmbeds(leaf: WorkspaceLeaf, plugin: NoteTabsPlugin, pluginIndentifiers: NoteTabsIdentifiers = NOTETABS_IDENTIFIERS): void {
  const activeView = plugin.app.workspace.getActiveViewOfType(MarkdownView)

  if (!activeView || !Object.is(leaf.view, activeView)) return;

  const { contentEl } = activeView;
  const { basicLayout } = pluginIndentifiers;
  const notetabsWithEmbed = contentEl.querySelector(`${basicLayout.classNames.container} .markdown-embed`);

  if (notetabsWithEmbed) {
    activeView.previewMode.rerender(true);
  }
}