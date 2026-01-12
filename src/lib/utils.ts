import { MarkdownRenderer, App, Component } from 'obsidian';
import { NOTETABS_CONSTANTS, NOTETABS_TAGS, NOTETABS_IDENTIFIERS, NOTETABS_ATTRIBUTES } from 'lib/constants';
import { NoteTabsAttributes, NoteTabsConstants, NoteTabsIdentifiers, NoteTabsTags } from './constants.types';

type CleanTabRender = {
  header: HTMLElement;
  content: HTMLElement;
};

type AttributeCollection = {
  attr: string;
  val: string;
};

export const setElAttributes = (attrList: Array<AttributeCollection>, el: HTMLElement): void => {
  for (const attribute of attrList) {
    el.setAttribute(attribute.attr, attribute.val);
  }
};

export const parseHTMLStringAndAppend = (source: string, container: HTMLElement): void => {
  /**
   * TODO: Using the lazy-man's cheat with DOMParser here. Re-evaluate and refactor this process later.
   */
  const parsedDOM = new DOMParser().parseFromString(source, 'text/html');
  const parsedElements = Array.from(parsedDOM.body.children);

  for (const elements of parsedElements  as HTMLElement[]) {
    container.appendChild(elements);
  }
};

export const cleanAndRenderTabs = async (src: string, path: string, app: App, cmp: Component, pluginConstants: NoteTabsConstants = NOTETABS_CONSTANTS, pluginTags: NoteTabsTags = NOTETABS_TAGS): Promise<CleanTabRender | null> => {
  let output = null;
  const findHeaderSrc = new RegExp(`${pluginTags.tab.headerMarker}(.*)`, 'g').exec(src) || [];
  const header = findHeaderSrc[1]?.trim() || '';
  const content = src.replace(pluginTags.tab.opener, '')
                      .replace((findHeaderSrc[0] || ''), '')
                      .trim();

  if (header && content) {
    // render secondary markdown
    const tabHeadEl = document.createElement('div');
    const tabContentEl = document.createElement('div');

    await MarkdownRenderer.render(app, header, tabHeadEl, path, cmp);
    await MarkdownRenderer.render(app, content, tabContentEl, path, cmp);

    // clean up header render
    const allowedHeadChildTags = ['P'];
    const allowedHeadChild = (tabHeadEl.firstElementChild && allowedHeadChildTags.includes(tabHeadEl.firstElementChild.tagName))
                          ? tabHeadEl.firstElementChild
                          : '';
    tabHeadEl.replaceChildren(allowedHeadChild);

    if (!tabHeadEl.childElementCount) {
      parseHTMLStringAndAppend(pluginConstants.warnings.badHeader, tabHeadEl);
    }

    output = {
      header: tabHeadEl,
      content: tabContentEl
    };
  }

  return output;
};

export const addInitialTabClassesAndAttributes = (headEl: HTMLElement, contentEl: HTMLElement, idx: number, pluginIdentifiers: NoteTabsIdentifiers = NOTETABS_IDENTIFIERS, pluginAttributes: NoteTabsAttributes = NOTETABS_ATTRIBUTES): void => {
  const { basicLayout } = pluginIdentifiers;

  // add tab classes
  headEl.addClass(basicLayout.classNames.tab.header);
  contentEl.addClass(basicLayout.classNames.tab.body);

  // add data attributes
  const headAttrLabel = `tab-head-${idx}`;
  const contentAttrLabel = `tab-body-${idx}`;

  // header attributes
  setElAttributes([
    { attr: pluginAttributes.tab.id, val: headAttrLabel },
    { attr: pluginAttributes.tab.content, val: contentAttrLabel },
    { attr: 'title', val: (headEl.textContent || '') },
    (idx == 0 ?
      { attr: pluginAttributes.active.attr, val: pluginAttributes.active.state.on.toString() } :
      { attr: pluginAttributes.active.attr, val: pluginAttributes.active.state.off.toString() }
    )
  ], headEl);

  // content attributes
  setElAttributes([
    { attr: pluginAttributes.tab.id, val: contentAttrLabel },
    { attr: pluginAttributes.tab.content, val: headAttrLabel },
    (idx == 0 ?
      { attr: pluginAttributes.active.attr, val: pluginAttributes.active.state.on.toString() } :
      { attr: pluginAttributes.active.attr, val: pluginAttributes.active.state.off.toString() }
    )
  ], contentEl);
};