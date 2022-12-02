import { BackgroundImages, LayoutTokens } from './tokens'

export type ThemeMode = 'light' | 'dark'

/*
 * CSS variable string type that accpets:
 * --var-name
 * where var-name is comprised of keys of the LayoutTheme
 */
export type CssPrefix = '--theme-'
export type CssVariable = `${CssPrefix}${string}`

const keysToVar = (keys: string[]) => `--theme-${keys.join('-')}`

export interface BaseElementStyle<T> {
  surface?: T
  text?: {
    size?: T
    color?: T
    weight?: T
    family?: T
  }
  iconColor?: T
  border?: T
  borderLeft?: T
}
type KeyOfBaseElementStyle<T> = keyof BaseElementStyle<T>
//Required<Pick<BaseElementStyle<T>, K>>
type RequiredBaseElementStyle<T, K extends KeyOfBaseElementStyle<T>> = Required<Pick<BaseElementStyle<T>, K>>
//

//What is generated:
//
//
export interface ElementStyle<T> extends BaseElementStyle<T> {
  // Should focus be different from hover?
  hover?: BaseElementStyle<T>
  active?: BaseElementStyle<T>
  disabled?: BaseElementStyle<T>
}

type RequiredElementStyle<T, K extends keyof ElementStyle<T>> = Required<Pick<ElementStyle<T>, K>>

export interface ListStyle<T> {
  marker?: BaseElementStyle<T>
}

export interface EmbedViewStyle<T> {
  wrapper: BaseElementStyle<T>
  toolbar: {
    wrapper: BaseElementStyle<T>
    iconColor: T
    // TODO:
    input: BaseElementStyle<T>
    button: BaseElementStyle<T>
  }
}

interface CreateNew<T> extends Menu<T> {
  button: ElementStyle<T>
}

type SimpleIcon<T> = RequiredBaseElementStyle<T, 'iconColor'>
type TextColor<T> = {
  text: {
    color: T
  }
}

// {
//   text: {
//     color: T
//   },
//   iconColor: T
//   hover: {
//     surface: T
//     text: {
//       color: tokens.colors.primary.hover
//     }
//   },
//   active: {
//     surface: tokens.surfaces.s[3],
//     text: {
//       color: tokens.colors.primary.active
//     }
//   }
// },
export type MenuItem<T> = Required<
  Pick<ElementStyle<T>, 'surface' | 'text' | 'iconColor' | 'hover' | 'active' | 'disabled'>
>

export type Card<T> = {
  surface: T
}

export interface Menu<T> {
  item: MenuItem<T>
  menu: Card<T>
}

export interface Combobox<T> extends Menu<T> {
  groupLabel: ElementStyle<T>
  preview: ElementStyle<T>
}
interface TableStyle<T> {
  tr: ElementStyle<T>
  td: ElementStyle<T>
  th: ElementStyle<T>
}
export interface LayoutTheme<
  T,
  GenericElementStyle = ElementStyle<T>,
  GenericListStyle = ListStyle<T>,
  GenericEmbedViewStyle = EmbedViewStyle<T>
> {
  // For base styles
  //  Required of BaseElementStyle: surface
  app: RequiredBaseElementStyle<T, 'surface' | 'iconColor' | 'text'>

  nav: {
    wrapper: Card<T>
    logo: SimpleIcon<T>
    search: GenericElementStyle
    link: { main: GenericElementStyle; end: GenericElementStyle }
    backForward: GenericElementStyle
  }

  sidebar: {
    toggle: SimpleIcon<T>
    tabs: {
      // wrapper: GenericElementStyle
      tab: GenericElementStyle
      indicator: Card<T>
    }
    // TODO:
    filter: GenericElementStyle
    tree: {
      // wrapper: GenericElementStyle
      item: {
        wrapper: MenuItem<T>
        collpaseToggle: SimpleIcon<T>
        icon: SimpleIcon<T>
        label: TextColor<T>
        count: TextColor<T>
      }
    }
    spaces: {
      // wrapper: GenericElementStyle
      item: {
        wrapper: Card<T>
        icon: RequiredElementStyle<T, 'iconColor' | 'hover' | 'active'>
      }
    }
    createNew: CreateNew<T>
    infobar: {
      toolbar: Card<T>
      context: {
        outlineItem: TextColor<T>
        ilink: RequiredBaseElementStyle<T, 'text' | 'iconColor'>
        collapsable: {
          header: RequiredBaseElementStyle<T, 'text' | 'iconColor'>
          toggle: SimpleIcon<T>
        }
      }
      graph: GenericElementStyle
      smartSuggestion: Card<T>
      reminders: Card<T>
    }
  }

  fleet: {
    item: RequiredElementStyle<T, 'surface' | 'text' | 'iconColor' | 'hover' | 'active' | 'disabled'>
  }

  editor: {
    toolbar: {
      // wrapper: Card<T>
      title: TextColor<T>
      button: GenericElementStyle
      balloonToolbar: {
        wrapper: Card<T>
        button: GenericElementStyle
      }
    }

    metadata: RequiredElementStyle<T, 'surface' | 'text' | 'iconColor' | 'hover'>
    // content: GenericElementStyle
    preview: {
      wrapper: Card<T>
      header: TextColor<T>
      editor: GenericElementStyle
    }
    dnd: RequiredElementStyle<T, 'surface' | 'iconColor' | 'hover' | 'active'>
    elements: {
      paragraph: TextColor<T>
      heading: {
        h1: TextColor<T>
        h2: TextColor<T>
        h3: TextColor<T>
        h4: TextColor<T>
        h5: TextColor<T>
        h6: TextColor<T>
      }
      marks: {
        highlight: Card<T>
        bold: TextColor<T>
        code: RequiredBaseElementStyle<T, 'text' | 'surface'>
        italic: TextColor<T>
        strikethrough: TextColor<T>
      }
      list: {
        ul: GenericListStyle
        ol: GenericListStyle
      }
      tag: TextColor<T>
      mention: {
        self: TextColor<T>
        invited: TextColor<T>
        default: TextColor<T>
      }
      // TODO:
      todo: {
        self: GenericElementStyle
        checkbox: GenericElementStyle
        actions: GenericElementStyle // Better name maybe
      }
      ilink: {
        preview: {
          wrapper: Card<T>
          // content: GenericElementStyle
          header: TextColor<T>
          close: RequiredElementStyle<T, 'iconColor' | 'hover'>
        }
        default: TextColor<T>
        missing: TextColor<T>
        archived: TextColor<T>
        shared: TextColor<T>
      }
      weblink: TextColor<T>
      blockquote: RequiredBaseElementStyle<T, 'text' | 'surface' | 'borderLeft'>
      codeblock: Card<T>
      // TODO:
      table: TableStyle<T>
      image: {
        image: GenericElementStyle
        caption: RequiredBaseElementStyle<T, 'text' | 'surface'>
      }
      webEmbed: GenericEmbedViewStyle
      canvas: GenericEmbedViewStyle
      qaBlock: RequiredBaseElementStyle<T, 'text' | 'iconColor' | 'surface' | 'border'>
    }
    combobox: Combobox<T>
  }

  search: {
    result: {
      list: RequiredElementStyle<T, 'surface' | 'text' | 'iconColor' | 'hover' | 'active'>
      card: RequiredElementStyle<T, 'surface' | 'text' | 'iconColor' | 'hover' | 'active'>
    }
    // TODO:
    input: GenericElementStyle
    viewToggle: MenuItem<T>
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
      wrapper: Card<T>
      iconColor: T
      textColor: T
      checkedColor: T
    }
    details: {
      wrapper: Card<T>
      textColor: T
    }
  }

  reminders: {
    reminder: {
      wrapper: Card<T>
      // TODO:
      status: {
        active: GenericElementStyle
        snooze: GenericElementStyle
        seen: GenericElementStyle
        missed: GenericElementStyle
      }
      note: TextColor<T>
      controls: {
        button: GenericElementStyle
        snoozeControls: GenericElementStyle
      }
    }
  }

  // TODO:
  // These are highlights shown in sidebar and in links
  highlight: Card<T>

  links: {
    // wrapper: Card<T>
    link: RequiredElementStyle<T, 'surface' | 'text' | 'iconColor' | 'hover' | 'active'>
  }

  // TODO:
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
    overlay: Card<T>
    // content: GenericElementStyle
  }

  helpButton: GenericElementStyle

  generic: {
    tags: {
      wrapper: Card<T>
      tag: TextColor<T>
    }
    button: {
      default: GenericElementStyle
      primary: GenericElementStyle
      secondary: GenericElementStyle
    }
    tooltip: {
      default: Card<T> & TextColor<T>
      primary: Card<T> & TextColor<T>
      info: Card<T> & TextColor<T>
    }
    // The selection dropdown for selecting a note
    // While renaming, refactoring, lookup etc
    noteSelect: Menu<T> & {
      // status: {
      //   selected: GenericElementStyle
      //   empty: GenericElementStyle
      // }
    }
    pageTitle: TextColor<T>
    // TODO:
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
      success: Card<T> & TextColor<T>
      error: RequiredBaseElementStyle<T, 'text' | 'surface' | 'iconColor'>
    }
    contextMenu: Menu<T>
    separator: SimpleIcon<T>
  }

  kanban: {
    card: RequiredElementStyle<T, 'surface' | 'text' | 'iconColor' | 'hover' | 'active'>
    column: Card<T>
    columnHeader: TextColor<T>
  }

  settings: {
    sidebar: Card<T>
    content: Card<T>
    importCard: Card<T>
    themeCard: Card<T>
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
  t: LayoutTheme<string>
  backgroundImages?: BackgroundImages
  additional: {
    profilePalette: string[]
    reactSelect: any
    hasBlocks?: boolean
  }
  custom?: string
}
