import { ThemeConfig } from 'react-select/src/theme';

type Pixels = number; // Pixels in integer

interface LayoutTokens {
  spacing: {
    large: string;
    medium: string;
    small: string;
    tiny: string;
  };
  borderRadius: {
    large: string;
    small: string;
    tiny: string;
  };
  indent: { sidebar: Pixels };
}

interface ColorPalette {
  white: string;
  black: string;
  green: string;
  yellow: string;
  red: string;
  blue: string;
}

interface Surfaces {
  card: string;
  sidebar: string;
  nav: string;
  modal: string;
  tooltip: {
    default: string;
    primary: string;
    info: string;
  };
  editor: string;
  appBackground: string;
}

interface ThemeTokens {
  colors: ColorPalette;
  surfaces: string[];
  shadow: {
    small: string;
    medium: string;
    large: string;
  };
}

interface BaseElementStyle {
  surface?: string;
  text?: {
    size?: string;
    color?: string;
    weight?: string;
    family?: string;
  };
  iconColor?: string;
  border?: string;
}

interface GenericElementStyle extends BaseElementStyle {
  // Should focus be different from hover?
  hover?: BaseElementStyle;
  active?: BaseElementStyle;
  disabled?: BaseElementStyle;
}

interface ListStyle extends BaseElementStyle {
  marker?: BaseElementStyle;
}

interface EmbedViewStyle {
  wrapper: BaseElementStyle;
  toolbar: {
    wrapper: BaseElementStyle;
    icon: BaseElementStyle;
    input: BaseElementStyle;
    button: BaseElementStyle;
  };
}

interface LayoutTheme {
  // For base styles
  app: GenericElementStyle;

  nav: {
    wrapper: GenericElementStyle;
    logo: GenericElementStyle;
    search: GenericElementStyle;
    link: { main: GenericElementStyle; end: GenericElementStyle };
    backForward: GenericElementStyle;
  };

  sidebar: {
    toggle: GenericElementStyle;
    tabs: {
      wrapper: GenericElementStyle;
      tab: GenericElementStyle;
      indicator: GenericElementStyle;
    };
    tree: {
      wrapper: GenericElementStyle;
      item: {
        wrapper: GenericElementStyle;
        collpaseToggle: GenericElementStyle;
        icon: GenericElementStyle;
        label: GenericElementStyle;
        count: GenericElementStyle;
      };
    };
    infobar: {
      wrapper: GenericElementStyle;
      toolbar: GenericElementStyle;
      context: {
        tags: GenericElementStyle;
        outlineItem: GenericElementStyle;
        ilink: GenericElementStyle;
        collapsable: {
          header: GenericElementStyle;
          toggle: GenericElementStyle;
        };
      };
      graph: GenericElementStyle;
      smartSuggestion: GenericElementStyle;
      reminders: GenericElementStyle;
    };
  };

  editor: {
    toolbar: {
      wrapper: GenericElementStyle;
      title: GenericElementStyle;
      button: GenericElementStyle;
      balloonToolbar: {
        wrapper: GenericElementStyle;
        button: GenericElementStyle;
        separator: GenericElementStyle;
      };
    };

    metadata: GenericElementStyle;
    content: GenericElementStyle;
    preview: {
      wrapper: GenericElementStyle;
      header: GenericElementStyle;
      editor: GenericElementStyle;
    };
    dnd: GenericElementStyle;
    elements: {
      paragraph: GenericElementStyle;
      heading: {
        h1: GenericElementStyle;
        h2: GenericElementStyle;
        h3: GenericElementStyle;
        h4: GenericElementStyle;
        h5: GenericElementStyle;
        h6: GenericElementStyle;
      };
      marks: {
        highlight: GenericElementStyle;
        bold: GenericElementStyle;
        code: GenericElementStyle;
        italic: GenericElementStyle;
        strikethrough: GenericElementStyle;
      };
      list: {
        ul: ListStyle;
        ol: ListStyle;
      };
      tag: GenericElementStyle;
      mention: {
        self: GenericElementStyle;
        invited: GenericElementStyle;
        default: GenericElementStyle;
      };
      todo: {
        self: GenericElementStyle;
        checkbox: GenericElementStyle;
        actions: GenericElementStyle; // Better name maybe
      };
      ilink: {
        preview: {
          wrapper: GenericElementStyle;
          content: GenericElementStyle;
          header: GenericElementStyle;
          close: GenericElementStyle;
        };
        default: GenericElementStyle;
        missing: GenericElementStyle;
        archived: GenericElementStyle;
        shared: GenericElementStyle;
      };
      weblink: GenericElementStyle;
      code: GenericElementStyle;
      blockquote: GenericElementStyle;
      codeblock: GenericElementStyle;
      table: {
        tr: GenericElementStyle;
        td: GenericElementStyle;
        th: GenericElementStyle;
      };
      image: {
        image: GenericElementStyle;
        caption: GenericElementStyle;
      };
      webEmbed: EmbedViewStyle;
      canvas: EmbedViewStyle;
      qaBlock: GenericElementStyle;
    };
    combobox: {
      wrapper: GenericElementStyle;
      item: {
        wrapper: GenericElementStyle;
        label: GenericElementStyle;
        icon: GenericElementStyle;
      };
      groupLabel: GenericElementStyle;
      preview: GenericElementStyle;
    };
  };

  search: {
    result: {
      list: GenericElementStyle;
      card: GenericElementStyle;
    };
    input: GenericElementStyle;
    viewToggle: GenericElementStyle;
    filters: {
      container: GenericElementStyle;
      filter: {
        wrapper: GenericElementStyle;
        icon: GenericElementStyle;
        label: GenericElementStyle;
        count: GenericElementStyle;
      };
    };
    preview: {
      wrapper: GenericElementStyle;
      title: GenericElementStyle;
      editor: GenericElementStyle;
    };
  };

  integrations: {
    card: {
      wrapper: GenericElementStyle;
      icon: GenericElementStyle;
      text: GenericElementStyle;
      checked: GenericElementStyle;
    };
    details: {
      wrapper: GenericElementStyle;
    };
  };

  reminders: {
    reminder: {
      wrapper: GenericElementStyle;
      status: {
        active: GenericElementStyle;
        snooze: GenericElementStyle;
        seen: GenericElementStyle;
        missed: GenericElementStyle;
      };
      note: GenericElementStyle;
      controls: {
        button: GenericElementStyle;
        snoozeControls: GenericElementStyle;
      };
    };
  };

  spotlight: {
    input: GenericElementStyle;
    logo: GenericElementStyle;
    list: {
      item: GenericElementStyle;
      groupLabel: GenericElementStyle;
    };
    preview: GenericElementStyle;
    toast: {
      success: GenericElementStyle;
      error: GenericElementStyle;
    };
  };

  modal: {
    overlay: GenericElementStyle;
    content: GenericElementStyle;
  };

  helpButton: GenericElementStyle;

  generic: {
    button: {
      default: GenericElementStyle;
      primary: GenericElementStyle;
      secondary: GenericElementStyle;
    };
    tooltip: {
      default: GenericElementStyle;
      primary: GenericElementStyle;
      info: GenericElementStyle;
    };
    // The selection dropdown for selecting a note
    // While renaming, refactoring, lookup etc
    noteSelect: {
      wrapper: GenericElementStyle;
      item: GenericElementStyle;
      status: {
        selected: GenericElementStyle;
        empty: GenericElementStyle;
      };
    };
    pageTitle: GenericElementStyle;
    form: {
      input: GenericElementStyle;
      select: GenericElementStyle;
      textarea: GenericElementStyle;
      checkbox: GenericElementStyle;
      radio: GenericElementStyle;
      label: GenericElementStyle;
    };
    shortcut: GenericElementStyle;
    toast: {
      success: GenericElementStyle;
      error: GenericElementStyle;
    };
    contextMenu: {
      wrapper: GenericElementStyle;
      item: {
        icon: GenericElementStyle;
        label: GenericElementStyle;
      };
    };
  };

  kanban: {
    card: GenericElementStyle;
    column: GenericElementStyle;
    columnHeader: GenericElementStyle;
  };

  settings: {
    sidebar: GenericElementStyle;
    content: GenericElementStyle;
    importCard: GenericElementStyle;
    themeCard: GenericElementStyle;
  };
}

// and extend them!
declare module 'styled-components' {
  export interface DefaultTheme extends LayoutTokens {
    colors: {
      primary: string;
      secondary: string;
      palette: ColorPalette;
      gray: ShadePalette;

      background: {
        app: string;
        card: string;
        modal: string;
        sidebar: string;
        highlight: string;
      };
      divider: string;
      fade: {
        primary: string;
        secondary: string;
        background: string;
      };
      form: {
        input: {
          bg: string;
          fg: string;
          border: string;
        };
        button: {
          bg: string;
          fg: string;
          hover: string;
          border: string;
        };
      };
      text: {
        heading: string;
        subheading: string;
        default: string;
        fade: string;
        disabled: string;
        accent: string;
        oppositePrimary: string;
      };
    };
    backgroundImages?: BackgroundImages;
    additional: {
      profilePalette: string[];
      reactSelect: ThemeConfig;
      hasBlocks?: boolean;
    };
    custom?: string;
  }
}
