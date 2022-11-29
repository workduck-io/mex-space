import { DefaultTheme } from 'styled-components'

type Shadow = string
type Pixels = number // Pixels in integer
type HexColor = string
export type ThemeMode = 'light' | 'dark'

export interface LayoutTokens {
  spacing: {
    large: string
    medium: string
    small: string
    tiny: string
  }
  borderRadius: {
    large: string
    small: string
    tiny: string
  }
  width: {
    nav: Pixels
    sidebar: Pixels
  }
  indent: { sidebar: Pixels }
}

// interface ShadePalette {
//   10: HexColor // Darkest
//   9: HexColor
//   8: HexColor
//   7: HexColor
//   6: HexColor
//   5: HexColor
//   4: HexColor
//   3: HexColor
//   2: HexColor
//   1: HexColor // Lightest
// }

interface TextPalette {
  heading: HexColor
  default: HexColor
  subheading: HexColor
  fade: HexColor
  disabled: HexColor
  accent: HexColor
  oppositePrimary: HexColor
}

export interface ElementStyle {
  text: TextPalette
  surface: HexColor
}

export interface BackgroundImages {
  app: string
  preview: string
}

interface Surfaces {
  card: string
  sidebar: string
  nav: string
  modal: string
  tooltip: {
    default: string
    primary: string
    info: string
  }
  editor: string
  appBackground: string
}

interface ColorPalette {
  primary: string
  secondary: string
  white: string
  black: string
  green: string
  yellow: string
  red: string
  blue: string
}

// What is fed
interface ThemeTokens {
  layout: LayoutTokens
  colors: ColorPalette
  text: TextPalette
  surfaces: Surfaces
  shadow: {
    small: Shadow
    medium: Shadow
    large: Shadow
  }
  additionalTheme?: Partial<DefaultTheme>
}

export interface BaseElementStyle {
  surface?: string
  text?: {
    size?: string
    color?: string
    weight?: string
    family?: string
  }
  iconColor?: string
  border?: string
}

//What is generated:
//
//
export interface GenericElementStyle extends BaseElementStyle {
  // Should focus be different from hover?
  hover?: BaseElementStyle
  active?: BaseElementStyle
  disabled?: BaseElementStyle
}

interface ListStyle extends BaseElementStyle {
  marker?: BaseElementStyle
}

interface EmbedViewStyle {
  wrapper: BaseElementStyle
  toolbar: {
    wrapper: BaseElementStyle
    icon: BaseElementStyle
    input: BaseElementStyle
    button: BaseElementStyle
  }
}

interface LayoutTheme {
  // For base styles
  app: GenericElementStyle

  nav: {
    wrapper: GenericElementStyle
    logo: GenericElementStyle
    search: GenericElementStyle
    link: { main: GenericElementStyle; end: GenericElementStyle }
    backForward: GenericElementStyle
  }

  sidebar: {
    toggle: GenericElementStyle
    tabs: {
      wrapper: GenericElementStyle
      tab: GenericElementStyle
      indicator: GenericElementStyle
    }
    filter: GenericElementStyle
    tree: {
      wrapper: GenericElementStyle
      item: {
        wrapper: GenericElementStyle
        collpaseToggle: GenericElementStyle
        icon: GenericElementStyle
        label: GenericElementStyle
        count: GenericElementStyle
      }
    }
    spaces: {
      wrapper: GenericElementStyle
      item: {
        wrapper: GenericElementStyle
        icon: GenericElementStyle
      }
    }
    createNew: {
      button: GenericElementStyle
      menu: GenericElementStyle
      item: GenericElementStyle
    }
    infobar: {
      wrapper: GenericElementStyle
      toolbar: GenericElementStyle
      context: {
        outlineItem: GenericElementStyle
        ilink: GenericElementStyle
        collapsable: {
          header: GenericElementStyle
          toggle: GenericElementStyle
        }
      }
      graph: GenericElementStyle
      smartSuggestion: GenericElementStyle
      reminders: GenericElementStyle
    }
  }

  fleet: {
    wrapper: GenericElementStyle
    item: {
      wrapper: GenericElementStyle
      icon: GenericElementStyle
      text: GenericElementStyle
    }
  }

  editor: {
    toolbar: {
      wrapper: GenericElementStyle
      title: GenericElementStyle
      button: GenericElementStyle
      balloonToolbar: {
        wrapper: GenericElementStyle
        button: GenericElementStyle
        separator: GenericElementStyle
      }
    }

    metadata: GenericElementStyle
    content: GenericElementStyle
    preview: {
      wrapper: GenericElementStyle
      header: GenericElementStyle
      editor: GenericElementStyle
    }
    dnd: GenericElementStyle
    elements: {
      paragraph: GenericElementStyle
      heading: {
        h1: GenericElementStyle
        h2: GenericElementStyle
        h3: GenericElementStyle
        h4: GenericElementStyle
        h5: GenericElementStyle
        h6: GenericElementStyle
      }
      marks: {
        highlight: GenericElementStyle
        bold: GenericElementStyle
        code: GenericElementStyle
        italic: GenericElementStyle
        strikethrough: GenericElementStyle
      }
      list: {
        ul: ListStyle
        ol: ListStyle
      }
      tag: GenericElementStyle
      mention: {
        self: GenericElementStyle
        invited: GenericElementStyle
        default: GenericElementStyle
      }
      todo: {
        self: GenericElementStyle
        checkbox: GenericElementStyle
        actions: GenericElementStyle // Better name maybe
      }
      ilink: {
        preview: {
          wrapper: GenericElementStyle
          content: GenericElementStyle
          header: GenericElementStyle
          close: GenericElementStyle
        }
        default: GenericElementStyle
        missing: GenericElementStyle
        archived: GenericElementStyle
        shared: GenericElementStyle
      }
      weblink: GenericElementStyle
      code: GenericElementStyle
      blockquote: GenericElementStyle
      codeblock: GenericElementStyle
      table: {
        tr: GenericElementStyle
        td: GenericElementStyle
        th: GenericElementStyle
      }
      image: {
        image: GenericElementStyle
        caption: GenericElementStyle
      }
      webEmbed: EmbedViewStyle
      canvas: EmbedViewStyle
      qaBlock: GenericElementStyle
    }
    combobox: {
      wrapper: GenericElementStyle
      item: {
        wrapper: GenericElementStyle
        label: GenericElementStyle
        icon: GenericElementStyle
      }
      groupLabel: GenericElementStyle
      preview: GenericElementStyle
    }
  }

  search: {
    result: {
      list: GenericElementStyle
      card: GenericElementStyle
    }
    input: GenericElementStyle
    viewToggle: GenericElementStyle
    filters: {
      container: GenericElementStyle
      filter: {
        wrapper: GenericElementStyle
        icon: GenericElementStyle
        label: GenericElementStyle
        count: GenericElementStyle
      }
    }
    preview: {
      wrapper: GenericElementStyle
      title: GenericElementStyle
      editor: GenericElementStyle
    }
  }

  integrations: {
    card: {
      wrapper: GenericElementStyle
      icon: GenericElementStyle
      text: GenericElementStyle
      checked: GenericElementStyle
    }
    details: {
      wrapper: GenericElementStyle
    }
  }

  reminders: {
    reminder: {
      wrapper: GenericElementStyle
      status: {
        active: GenericElementStyle
        snooze: GenericElementStyle
        seen: GenericElementStyle
        missed: GenericElementStyle
      }
      note: GenericElementStyle
      controls: {
        button: GenericElementStyle
        snoozeControls: GenericElementStyle
      }
    }
  }

  highlight: {
    wrapper: GenericElementStyle
  }

  links: {
    wrapper: GenericElementStyle
    link: {
      wrapper: GenericElementStyle
      icon: GenericElementStyle
    }
  }

  spotlight: {
    input: GenericElementStyle
    logo: GenericElementStyle
    list: {
      item: GenericElementStyle
      groupLabel: GenericElementStyle
    }
    preview: GenericElementStyle
    toast: {
      success: GenericElementStyle
      error: GenericElementStyle
    }
  }

  modal: {
    overlay: GenericElementStyle
    content: GenericElementStyle
  }

  helpButton: GenericElementStyle

  generic: {
    tags: {
      wrapper: GenericElementStyle
      tag: GenericElementStyle
    }
    button: {
      default: GenericElementStyle
      primary: GenericElementStyle
      secondary: GenericElementStyle
    }
    tooltip: {
      default: GenericElementStyle
      primary: GenericElementStyle
      info: GenericElementStyle
    }
    // The selection dropdown for selecting a note
    // While renaming, refactoring, lookup etc
    noteSelect: {
      wrapper: GenericElementStyle
      item: GenericElementStyle
      status: {
        selected: GenericElementStyle
        empty: GenericElementStyle
      }
    }
    pageTitle: GenericElementStyle
    form: {
      input: GenericElementStyle
      select: GenericElementStyle
      textarea: GenericElementStyle
      checkbox: GenericElementStyle
      radio: GenericElementStyle
      label: GenericElementStyle
    }
    shortcut: GenericElementStyle
    toast: {
      success: GenericElementStyle
      error: GenericElementStyle
    }
    contextMenu: {
      wrapper: GenericElementStyle
      item: {
        icon: GenericElementStyle
        label: GenericElementStyle
      }
    }
  }

  kanban: {
    card: GenericElementStyle
    column: GenericElementStyle
    columnHeader: GenericElementStyle
  }

  settings: {
    sidebar: GenericElementStyle
    content: GenericElementStyle
    importCard: GenericElementStyle
    themeCard: GenericElementStyle
  }
}

export interface MexThemeData {
  name: string
  id: string
  data: Record<ThemeMode, MexTheme>
}

export interface UserThemePreferences {
  themeId: string
  mode: ThemeMode
}

export interface MexTheme extends LayoutTokens {
  t: LayoutTheme
  backgroundImages?: BackgroundImages
  additional: {
    profilePalette: string[]
    reactSelect: any
    hasBlocks?: boolean
  }
  custom?: string
}
