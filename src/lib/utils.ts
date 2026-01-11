import { MarkdownRenderer, App, Component } from 'obsidian';
import { NOTETABS_CONSTANTS, NOTETABS_TAGS, NOTETABS_IDENTIFIERS, NOTETABS_ATTRIBUTES } from 'lib/constants';

/* eslint @microsoft/sdl/no-inner-html: off */

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

export const cleanAndRenderTabs = async (src: string, path: string, app: App, cmp: Component): Promise<CleanTabRender | null> => {
  let output = null;
  const findHeaderSrc = new RegExp(`${NOTETABS_TAGS.tab.headerMarker}(.*)`, 'g').exec(src) || [];
  const header = findHeaderSrc[1]?.trim() || '';
  const content = src.replace(NOTETABS_TAGS.tab.opener, '')
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
      tabHeadEl.innerHTML = NOTETABS_CONSTANTS.warnings.badHeader;
    }

    output = {
      header: tabHeadEl,
      content: tabContentEl
    };
  }

  return output;
};

export const addInitialTabClassesAndAttributes = (headEl: HTMLElement, contentEl: HTMLElement, idx: number): void => {
  const { basicLayout } = NOTETABS_IDENTIFIERS;

  // add tab classes
  headEl.addClass(basicLayout.classNames.tab.header);
  contentEl.addClass(basicLayout.classNames.tab.body);

  // add data attributes
  const headAttrLabel = `tab-head-${idx}`;
  const contentAttrLabel = `tab-body-${idx}`;

  // header attributes
  setElAttributes([
    { attr: NOTETABS_ATTRIBUTES.tab.id, val: headAttrLabel },
    { attr: NOTETABS_ATTRIBUTES.tab.content, val: contentAttrLabel },
    { attr: 'title', val: (headEl.textContent || '') },
    (idx == 0 ?
      { attr: NOTETABS_ATTRIBUTES.active.attr, val: NOTETABS_ATTRIBUTES.active.state.on.toString() } :
      { attr: NOTETABS_ATTRIBUTES.active.attr, val: NOTETABS_ATTRIBUTES.active.state.off.toString() }
    )
  ], headEl);

  // content attributes
  setElAttributes([
    { attr: NOTETABS_ATTRIBUTES.tab.id, val: contentAttrLabel },
    { attr: NOTETABS_ATTRIBUTES.tab.content, val: headAttrLabel },
    (idx == 0 ?
      { attr: NOTETABS_ATTRIBUTES.active.attr, val: NOTETABS_ATTRIBUTES.active.state.on.toString() } :
      { attr: NOTETABS_ATTRIBUTES.active.attr, val: NOTETABS_ATTRIBUTES.active.state.off.toString() }
    )
  ], contentEl);
};