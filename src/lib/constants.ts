import { NoteTabsIdentifiers, NoteTabsConstants, NoteTabsTags, NoteTabsAttributes } from './constants.types';

export const NOTETABS_IDENTIFIERS: NoteTabsIdentifiers = {
  basicLayout: {
    classNames: {
      container: "notetabs-container",
      section: {
        header: "notetabs-headers-section",
        content: "notetabs-content-section"
      },
      tab: {
        header: "notetabs-tab-header",
        body: "notetabs-tab-content",
        active: {
          leftSibling: "active-tab-left-sibling"
        }
      },
      warnings: {
        badHeader: "notetabs-warning"
      },
      settings: {
        header: "notetabs-settings-header"
      }
    }
  },
  settingsLayout: {
    labels: {
      section: {
        roundedEdges: "Rounded edges"
      },
      tab: {
        defaultOrientation: "Horizontal",
        verticalOrientation: "Vertical"
      }
    },
    classNames: {
      section: {
        roundedEdges: "rounded-edges"
      },
      tab: {
        defaultOrientation: "default",
        verticalOrientation: "vertical-tab-headers"
      }
    }
  },
  settingsStyles: {
    labels: {
      default: "Sketch",
      minimalist: "Minimalist",
      defaultCompact: "Sketch (Compact)",
      minimalistCompact: "Minimalist (Compact)"
    },
    classNames: {
      default: "default",
      minimalist: "tab-style-minimalist",
      defaultCompact: "default-compact",
      minimalistCompact: "tab-style-minimalist-compact"
    }
  }
};

export const NOTETABS_TAGS: NoteTabsTags = {
  section: {
    opener: "~~~notetabs",
    closer: "~~~"
  },
  tab: {
    opener: "---begintab",
    closer: "---closetab",
    headerMarker: "header:"
  }
};

export const NOTETABS_ATTRIBUTES: NoteTabsAttributes = {
  prefix: 'data-x',
  get settings() {
    return {
      orientation:`${this.prefix}-orientation`,
      edges: `${this.prefix}-edgestyle`,
      style: `${this.prefix}-style`
    };
  },
  get tab() {
    return {
      id: `${this.prefix}-id`,
      header: `${this.prefix}-header`,
      content: `${this.prefix}-content`
    };
  },
  get active() {
    return {
      attr: `${this.prefix}-active`,
      state: {
        on: 1,
        off: 0
      }
    };
  }
};

export const NOTETABS_CONSTANTS: NoteTabsConstants = {
  get emptyTab() {
    return `
${NOTETABS_TAGS.tab.opener}
${NOTETABS_TAGS.tab.headerMarker} New Tab

Replace this with your tab content.
${NOTETABS_TAGS.tab.closer}
`;
  },
  get emptySection() {
    return `
${NOTETABS_TAGS.section.opener}
${this.emptyTab}
${NOTETABS_TAGS.section.closer}
`;
  },
  warnings: {
    badHeader: `<span class="${NOTETABS_IDENTIFIERS.basicLayout.classNames.warnings.badHeader}">&#x26A0; Badly-formatted tab header!</span>`
  },
  support: {
    // TODO: Clean up this shortcut
    callout: `
<div class="callout notetabs-settings-callout">
	<div class="callout-title">
	  <div class="callout-icon"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-handshake-icon lucide-handshake"><path d="m11 17 2 2a1 1 0 1 0 3-3"/><path d="m14 14 2.5 2.5a1 1 0 1 0 3-3l-3.88-3.88a3 3 0 0 0-4.24 0l-.88.88a1 1 0 1 1-3-3l2.81-2.81a5.79 5.79 0 0 1 7.06-.87l.47.28a2 2 0 0 0 1.42.25L21 4"/><path d="m21 3 1 11h-2"/><path d="M3 3 2 14l6.5 6.5a1 1 0 1 0 3-3"/><path d="M3 4h8"/></svg></div>
    <div class="callout-title-inner">Support</div>
  </div>
  <div class="callout-content">
    <p>Enjoying the plugin and want to support <span class="notetabs-settings-callout-hightlighted">Project Free Rangers</span>?</p>
    <p>
      <a href='https://ko-fi.com/N4N11RXRQW' target='_blank'>
        <img height='36' style='border:0px;height:36px;' src='data:image/png;base64,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' border='0' alt='Buy Me a Coffee at ko-fi.com' />
      </a>
    </p>
  </div>
</div>
`
  }
};