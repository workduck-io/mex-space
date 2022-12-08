import { LegacyTheme } from './theme-legacy'
import { BackgroundImages, LayoutTokens, ThemeTokens } from './tokens'

export type ThemeMode = 'light' | 'dark'

/*
 * CSS variable string type that accpets:
 * --var-name
 * where var-name is comprised of keys of the LayoutTheme
 */
export type CssPrefix = '--theme-'
export type CssVariable = `${CssPrefix}${string}`
export type CssVariableAccessor = `var(${CssVariable})`

export interface BaseElementStyle<T> {
  surface?: T
  textColor?: T
  iconColor?: T
  border?: T
  borderLeft?: T
}
type KeyOfBaseElementStyle<T> = keyof BaseElementStyle<T>
//Required<Pick<BaseElementStyle<T>, K>>
type RequiredBaseElementStyle<T, K extends KeyOfBaseElementStyle<T>> = Required<Pick<BaseElementStyle<T>, K>>
//

// What is generated:

export interface ElementStyle<T> extends BaseElementStyle<T> {
  /**
   * When an element is hovered over
   */
  hover?: BaseElementStyle<T>

  /**
   * When an element is active (clicked)
   */
  active?: BaseElementStyle<T>

  /**
   * When an element is disabled
   */
  disabled?: BaseElementStyle<T>

  /**
   * When an element is selected
   */
  selected?: BaseElementStyle<T>
}

type RequiredElementStyle<T, K extends keyof ElementStyle<T>> = Required<Pick<ElementStyle<T>, K>>

export interface ListStyle<T> {
  marker?: BaseElementStyle<T>
}

type ButtonState<T> = RequiredBaseElementStyle<T, 'surface' | 'textColor' | 'iconColor'>

export interface ButtonStyle<T> extends ButtonState<T> {
  hover: ButtonState<T>
  active: ButtonState<T>
  disabled: ButtonState<T>
}

export interface SelectableButtonStyle<T> extends ButtonStyle<T> {
  selected: ButtonState<T>
}

interface CreateNew<T> extends Menu<T> {
  button: ButtonStyle<T>
}

type SimpleIcon<T> = RequiredBaseElementStyle<T, 'iconColor'>
type TextColor<T> = { textColor: T }

type TodoStyle<T> = {
  self: TextColor<T>
  checkbox: RequiredBaseElementStyle<T, 'surface' | 'iconColor'>
  controls: ButtonStyle<T>
}

export type MenuItem<T> = Required<
  Pick<ElementStyle<T>, 'surface' | 'textColor' | 'iconColor' | 'hover' | 'active' | 'disabled' | 'selected'>
>

export type Card<T> = {
  surface: T
}

export type SelectableCard<T> = Card<T> & {
  selected: Card<T>
}

export interface Menu<T> {
  item: MenuItem<T>
  menu: Card<T>
}

export interface Combobox<T> extends Menu<T> {
  groupLabel: TextColor<T> & SimpleIcon<T>
  preview: Card<T>
}

export interface EmbedViewStyle<T> {
  wrapper: Card<T>
  toolbar: {
    wrapper: Card<T>
    iconColor: T
    input: InputStyle<T>
    button: ButtonStyle<T>
  }
}

export interface ShortcutStyle<T> {
  surface: T
  iconColor: T
  border: T
  hover: {
    surface: T
    iconColor: T
    border: T
  }
}

type TooltipStyle<T> = Card<T> & TextColor<T>

interface InputStyle<T> extends RequiredBaseElementStyle<T, 'surface' | 'textColor' | 'iconColor'> {
  hover: RequiredBaseElementStyle<T, 'surface' | 'iconColor'>
  active: RequiredBaseElementStyle<T, 'surface' | 'iconColor' | 'border'>
  disabled: RequiredBaseElementStyle<T, 'surface' | 'iconColor' | 'textColor'>
}

type SpotlightItemStyle<T> = RequiredBaseElementStyle<T, 'surface' | 'textColor' | 'iconColor'> & {
  hover: RequiredBaseElementStyle<T, 'surface' | 'iconColor'>
  active: RequiredBaseElementStyle<T, 'surface' | 'iconColor' | 'textColor'>
  selected: RequiredBaseElementStyle<T, 'surface' | 'iconColor' | 'textColor'>
}

interface TableStyle<T> {
  wrapper: RequiredBaseElementStyle<T, 'surface'>
  tr: TextColor<T>
  td: TextColor<T>
  th: TextColor<T>
}

type ReminderStatusStyle<T> = RequiredBaseElementStyle<T, 'textColor' | 'iconColor'>

export interface LayoutTheme<
  T,
  GenericListStyle = ListStyle<T>,
  GenericButtonStyle = ButtonStyle<T>,
  GenericSelectableButtonStyle = SelectableButtonStyle<T>,
  GenericTextColor = TextColor<T>,
  GenericIcon = SimpleIcon<T>,
  GenericCard = Card<T>,
  GenericSelectableCard = SelectableCard<T>,
  GenericEmbedViewStyle = EmbedViewStyle<T>
> {
  tokens: ThemeTokens<T>
  // For base styles
  //  Required of BaseElementStyle: surface
  app: RequiredBaseElementStyle<T, 'surface' | 'iconColor' | 'textColor'> & {
    text: {
      size: T
      weight: T
      family: T
    }
  }

  sidebar: {
    toggle: GenericIcon
    wrapper: GenericCard
    nav: {
      logo: GenericIcon
      search: GenericButtonStyle
      link: {
        main: GenericSelectableButtonStyle
        end: GenericSelectableButtonStyle
      }
      backForward: GenericButtonStyle
    }
    tabs: {
      // wrapper: GenericElementStyle
      tab: GenericSelectableButtonStyle
      indicator: GenericCard
    }
    filter: InputStyle<T>
    tree: {
      // wrapper: GenericElementStyle
      item: {
        wrapper: MenuItem<T>
        collpaseToggle: GenericIcon
        icon: GenericIcon
        label: GenericTextColor
        count: GenericTextColor
      }
    }
    spaces: {
      // wrapper: GenericElementStyle
      item: {
        wrapper: GenericSelectableCard
        icon: RequiredElementStyle<T, 'iconColor' | 'hover' | 'active' | 'selected'>
      }
    }
    createNew: CreateNew<T>
    infobar: {
      toolbar: GenericCard
      context: {
        outlineItem: GenericTextColor
        ilink: RequiredBaseElementStyle<T, 'textColor' | 'iconColor'>
        collapsable: {
          header: RequiredBaseElementStyle<T, 'textColor' | 'iconColor'>
          toggle: GenericIcon
        }
      }
      graph: {
        controlsWrapper: GenericCard
      }
      smartSuggestion: GenericCard
      reminders: GenericCard
    }
  }

  fleet: {
    item: RequiredElementStyle<T, 'surface' | 'textColor' | 'iconColor' | 'hover' | 'active' | 'disabled' | 'selected'>
  }

  editor: {
    toolbar: {
      // wrapper: GenericCard
      title: GenericTextColor
      button: GenericButtonStyle
      balloonToolbar: {
        wrapper: GenericCard
        button: GenericButtonStyle
      }
    }

    metadata: RequiredElementStyle<T, 'surface' | 'textColor' | 'iconColor' | 'hover'>
    // content: GenericElementStyle
    preview: {
      wrapper: GenericCard
      header: GenericTextColor
      // editor: GenericElementStyle
    }
    dnd: RequiredElementStyle<T, 'surface' | 'iconColor' | 'hover' | 'active'>
    elements: {
      paragraph: GenericTextColor
      heading: {
        h1: GenericTextColor
        h2: GenericTextColor
        h3: GenericTextColor
        h4: GenericTextColor
        h5: GenericTextColor
        h6: GenericTextColor
      }
      marks: {
        highlight: GenericCard
        bold: GenericTextColor
        code: RequiredBaseElementStyle<T, 'textColor' | 'surface'>
        italic: GenericTextColor
        strikethrough: GenericTextColor
      }
      list: {
        ul: GenericListStyle
        ol: GenericListStyle
      }
      tag: GenericTextColor
      mention: {
        self: GenericTextColor
        invited: GenericTextColor
        default: GenericTextColor
      }
      todo: TodoStyle<T>
      ilink: {
        preview: {
          wrapper: GenericCard
          // content: GenericElementStyle
          header: GenericTextColor
          close: RequiredElementStyle<T, 'iconColor' | 'hover'>
        }
        default: GenericTextColor
        missing: GenericTextColor
        archived: GenericTextColor
        shared: GenericTextColor
      }
      weblink: GenericTextColor
      blockquote: RequiredBaseElementStyle<T, 'textColor' | 'surface' | 'borderLeft'>
      codeblock: GenericCard
      table: TableStyle<T>
      image: {
        // image: GenericElementStyle
        caption: RequiredBaseElementStyle<T, 'textColor' | 'surface'>
      }
      webEmbed: GenericEmbedViewStyle
      canvas: GenericEmbedViewStyle
      qaBlock: RequiredBaseElementStyle<T, 'textColor' | 'iconColor' | 'surface' | 'border'>
    }
    combobox: Combobox<T>
  }

  search: {
    result: {
      list: RequiredElementStyle<T, 'surface' | 'textColor' | 'iconColor' | 'hover' | 'active' | 'selected'>
      card: RequiredElementStyle<T, 'surface' | 'textColor' | 'iconColor' | 'hover' | 'active' | 'selected'>
    }
    input: InputStyle<T>
    viewToggle: MenuItem<T>
    filters: {
      container: GenericCard
      filter: {
        wrapper: RequiredElementStyle<T, 'surface' | 'textColor' | 'iconColor' | 'hover' | 'active'>
        count: GenericTextColor
      }
    }
    preview: {
      wrapper: GenericCard
      title: GenericTextColor
      editor: GenericCard
    }
  }

  integrations: {
    card: {
      wrapper: GenericCard
      iconColor: T
      textColor: T
      checkedColor: T
    }
    details: {
      wrapper: GenericCard
      textColor: T
    }
  }

  reminders: {
    reminder: {
      wrapper: GenericCard
      status: {
        surface: T
        active: ReminderStatusStyle<T>
        snooze: ReminderStatusStyle<T>
        seen: ReminderStatusStyle<T>
        missed: ReminderStatusStyle<T>
      }
      note: GenericTextColor
      controls: {
        button: GenericButtonStyle
        snoozeControls: GenericButtonStyle
      }
    }
  }

  // TODO:
  // These are highlights shown in sidebar and in links
  highlight: GenericCard

  links: {
    // wrapper: GenericCard
    link: RequiredElementStyle<T, 'surface' | 'textColor' | 'iconColor' | 'hover' | 'active' | 'selected'>
  }

  spotlight: {
    input: InputStyle<T>
    logo: GenericIcon
    list: {
      item: SpotlightItemStyle<T>
      groupLabel: GenericTextColor
    }
    preview: GenericCard
    toast: {
      success: TooltipStyle<T>
      error: TooltipStyle<T>
    }
  }

  modal: {
    overlay: GenericCard
    // content: GenericElementStyle
  }

  helpButton: GenericButtonStyle

  generic: {
    tags: {
      wrapper: GenericCard
      tag: GenericTextColor
    }
    button: {
      default: GenericButtonStyle
      primary: GenericButtonStyle
      secondary: GenericButtonStyle
      danger: GenericButtonStyle
    }
    tooltip: {
      default: TooltipStyle<T>
      primary: TooltipStyle<T>
      info: TooltipStyle<T>
    }
    // The selection dropdown for selecting a note
    // While renaming, refactoring, lookup etc
    noteSelect: Menu<T> & {
      // status: {
      //   selected: GenericElementStyle
      //   empty: GenericElementStyle
      // }
    }
    pageTitle: GenericTextColor
    form: {
      // Use input for textarea, select as well
      input: InputStyle<T>
      control: GenericTextColor & GenericIcon
      label: GenericTextColor
    }
    shortcut: ShortcutStyle<T>
    toast: {
      success: GenericCard & GenericTextColor
      error: RequiredBaseElementStyle<T, 'textColor' | 'surface' | 'iconColor'>
    }
    contextMenu: Menu<T>
    separator: GenericIcon
  }

  kanban: {
    card: RequiredElementStyle<T, 'surface' | 'textColor' | 'iconColor' | 'hover' | 'active' | 'selected'>
    column: GenericCard
    columnHeader: GenericTextColor
  }

  settings: {
    sidebar: GenericCard
    content: GenericCard
    importCard: GenericCard
    themeCard: GenericSelectableCard
  }
}

export interface UserThemePreferences {
  themeId: string
  mode: ThemeMode
}

type ThemeCssTokens = LayoutTheme<CssVariableAccessor>

export interface MexThemeData {
  name: string
  id: string
  data: Record<ThemeMode, ThemeTokens<string>>
}

export interface MexTheme extends LayoutTokens<CssVariableAccessor>, ThemeCssTokens, LegacyTheme {
  backgroundImages?: BackgroundImages<CssVariableAccessor>
  additional: {
    profilePalette: string[]
    reactSelect: any
    hasBlocks?: boolean
  }
  custom?: string
}
