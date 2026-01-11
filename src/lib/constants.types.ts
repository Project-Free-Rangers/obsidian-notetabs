type StylesCollection = {
  default: string;
  defaultCompact: string;
  minimalist: string;
  minimalistCompact: string;
};

type SettingsCollection = {
  section: {
    roundedEdges: string;
  },
  tab: {
    defaultOrientation: string;
    verticalOrientation: string;
  }
};

type NoteTabsBasicLayoutIdentifiers = {
  classNames: {
      container: string,
      section: {
        header: string;
        content: string;
      },
      tab: {
        header: string;
        body: string;
        active: {
          leftSibling: string;
        }
      },
      warnings: {
        badHeader: string
      },
      settings: {
        header: string;
      }
    }
};

type NoteTabsStylesIdentifiers = {
  labels: StylesCollection;
  classNames: StylesCollection;
};

type NoteTabsSettingsLayoutIdentifiers = {
  labels: SettingsCollection,
  classNames: SettingsCollection
};

export type NoteTabsConstants = {
  warnings: {
    badHeader: string;
  };
  emptySection: string;
  emptyTab: string;
  support?: { callout: string; };
};

export type NoteTabsIdentifiers = {
  basicLayout: NoteTabsBasicLayoutIdentifiers;
  settingsLayout: NoteTabsSettingsLayoutIdentifiers;
  settingsStyles: NoteTabsStylesIdentifiers
};

export type NoteTabsTags = {
  section: {
    opener: string;
    closer: string;
  };
  tab: {
    opener: string;
    closer: string;
    headerMarker: string;
  };
};

export type NoteTabsAttributes = {
  prefix: string;
  settings: {
    orientation: string;
    edges: string;
    style: string;
  };
  tab: {
    id: string;
    header: string;
    content: string;
  }
  active: {
    attr: string;
    state: {
      on: number;
      off: number;
    }
  }
};