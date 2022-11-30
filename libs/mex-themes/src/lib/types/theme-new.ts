import { BackgroundImages, LayoutTokens } from './tokens'

export type ThemeMode = 'light' | 'dark'

/*
 * CSS variable string type that accpets:
 * --var-name
 * where var-name is comprised of keys of the LayoutTheme
 */
export type CSSPrefix = '--theme-'
export type CSSSeparator = '-'
export type CSSVariable = `${CSSPrefix}${string}`

const x: CSSVariable = '--theme-kanban-column-text-color'

const keysToVar = (keys: string[]) => `--theme-${keys.join('-')}`

export interface BaseElementStyle {
  surface?: CSSVariable
  text?: {
    size?: CSSVariable
    color?: CSSVariable
    weight?: CSSVariable
    family?: CSSVariable
  }
  iconColor?: CSSVariable
  border?: CSSVariable
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
