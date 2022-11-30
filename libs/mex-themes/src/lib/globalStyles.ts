import { set, get } from 'lodash'

import { ElementStyle, LayoutTheme, ListStyle, EmbedViewStyle, MexTheme, CssVariable } from './types/theme-new'
import { ThemeTokens } from './types/tokens'

export const getGlobalStylesAndTheme = (tokens: ThemeTokens): { theme: MexTheme } => {
  const app = {
    surface: tokens.surfaces.s[0],
    text: {
      color: tokens.text.default,
      size: '16px',
      weight: '400',
      family: 'Roboto, sans-serif'
    },
    iconColor: tokens.text.default
  }

  const baseCard = {
    surface: tokens.surfaces.s[2],
    text: {
      color: tokens.text.default,
      size: app.text.size,
      weight: app.text.weight,
      family: app.text.family
    },
    iconColor: tokens.text.default
  }

  const card = (level: number): ElementStyle<string> => ({
    surface: tokens.surfaces.s[level]
  })

  const menu = (level: number) => card(level + 1)

  const primaryButton: ElementStyle<string> = {
    surface: tokens.colors.primary.default,
    text: {
      color: tokens.colors.primary.text
    },
    iconColor: tokens.colors.primary.text,
    hover: {
      surface: tokens.colors.primary.hover
    },
    active: {
      surface: tokens.colors.primary.active
    },
    disabled: {
      surface: tokens.colors.primary.disabled,
      text: {
        color: tokens.text.disabled
      },
      iconColor: tokens.text.disabled
    }
  }

  const button = (level: number): ElementStyle<string> => ({
    surface: tokens.surfaces.s[level + 1],
    text: { color: tokens.text.default },
    iconColor: tokens.text.default,
    hover: { surface: tokens.surfaces.s[level + 2] },
    active: { surface: tokens.surfaces.s[level + 3] },
    disabled: {
      surface: 'transparent',
      text: { color: tokens.text.disabled },
      iconColor: tokens.text.disabled
    }
  })

  const transparentButton = (level: number): ElementStyle<string> => ({
    surface: 'transparent',
    text: { color: tokens.text.default },
    iconColor: tokens.text.default,
    hover: { surface: tokens.surfaces.s[level + 1] },
    active: { surface: tokens.surfaces.s[level + 2] },
    disabled: {
      surface: 'transparent',
      text: { color: tokens.text.disabled },
      iconColor: tokens.text.disabled
    }
  })

  const genericElementStyle: ElementStyle<string> = {
    ...baseCard
  }

  const listStyle: ListStyle<string> = {
    marker: {
      iconColor: tokens.text.default
    }
  }

  const defaultTooltip: ElementStyle<string> = {
    surface: tokens.surfaces.tooltip.default
  }

  const primaryTooltip: ElementStyle<string> = {
    surface: tokens.surfaces.tooltip.primary
  }

  const embedViewStyle = (level: number): EmbedViewStyle<string> => ({
    wrapper: card(level),
    toolbar: {
      wrapper: baseCard,
      icon: baseCard,
      input: baseCard,
      button: button(level)
    }
  })

  const tagStyle: ElementStyle<string> = {
    text: {
      color: tokens.text.default
    }
  }

  const theme: LayoutTheme<string> = {
    // For base styles
    app,

    nav: {
      wrapper: genericElementStyle,
      logo: genericElementStyle,
      search: genericElementStyle,
      link: { main: genericElementStyle, end: genericElementStyle },
      backForward: genericElementStyle
    },

    sidebar: {
      toggle: genericElementStyle,
      tabs: {
        wrapper: genericElementStyle,
        tab: genericElementStyle,
        indicator: genericElementStyle
      },
      filter: genericElementStyle,
      tree: {
        wrapper: genericElementStyle,
        item: {
          wrapper: genericElementStyle,
          collpaseToggle: genericElementStyle,
          icon: genericElementStyle,
          label: genericElementStyle,
          count: genericElementStyle
        }
      },
      spaces: {
        wrapper: genericElementStyle,
        item: {
          wrapper: genericElementStyle,
          icon: genericElementStyle
        }
      },
      createNew: {
        button: primaryButton,
        menu: menu(0),
        item: genericElementStyle
      },
      infobar: {
        wrapper: genericElementStyle,
        toolbar: genericElementStyle,
        context: {
          outlineItem: genericElementStyle,
          ilink: genericElementStyle,
          collapsable: {
            header: genericElementStyle,
            toggle: genericElementStyle
          }
        },
        graph: genericElementStyle,
        smartSuggestion: genericElementStyle,
        reminders: genericElementStyle
      }
    },

    fleet: {
      wrapper: genericElementStyle,
      item: {
        wrapper: genericElementStyle,
        icon: genericElementStyle,
        text: genericElementStyle
      }
    },

    editor: {
      toolbar: {
        wrapper: genericElementStyle,
        title: genericElementStyle,
        button: button(0),
        balloonToolbar: {
          wrapper: genericElementStyle,
          button: transparentButton(1),
          separator: genericElementStyle
        }
      },

      metadata: genericElementStyle,
      content: genericElementStyle,
      preview: {
        wrapper: genericElementStyle,
        header: genericElementStyle,
        editor: genericElementStyle
      },
      dnd: genericElementStyle,
      elements: {
        paragraph: genericElementStyle,
        heading: {
          h1: genericElementStyle,
          h2: genericElementStyle,
          h3: genericElementStyle,
          h4: genericElementStyle,
          h5: genericElementStyle,
          h6: genericElementStyle
        },
        marks: {
          highlight: genericElementStyle,
          bold: genericElementStyle,
          code: genericElementStyle,
          italic: genericElementStyle,
          strikethrough: genericElementStyle
        },
        list: {
          ul: listStyle,
          ol: listStyle
        },
        tag: tagStyle,
        mention: {
          self: genericElementStyle,
          invited: genericElementStyle,
          default: genericElementStyle
        },
        todo: {
          self: genericElementStyle,
          checkbox: genericElementStyle,
          actions: genericElementStyle // Better name maybe,
        },
        ilink: {
          preview: {
            wrapper: card(1),
            content: genericElementStyle,
            header: genericElementStyle,
            close: genericElementStyle
          },
          default: genericElementStyle,
          missing: genericElementStyle,
          archived: genericElementStyle,
          shared: genericElementStyle
        },
        weblink: genericElementStyle,
        code: genericElementStyle,
        blockquote: genericElementStyle,
        codeblock: card(1),
        table: {
          tr: genericElementStyle,
          td: genericElementStyle,
          th: genericElementStyle
        },
        image: {
          image: genericElementStyle,
          caption: genericElementStyle
        },
        webEmbed: embedViewStyle(1),
        canvas: embedViewStyle(1),
        qaBlock: genericElementStyle
      },
      combobox: {
        wrapper: menu(0),
        item: {
          wrapper: genericElementStyle,
          label: genericElementStyle,
          icon: genericElementStyle
        },
        groupLabel: genericElementStyle,
        preview: genericElementStyle
      }
    },

    search: {
      result: {
        list: genericElementStyle,
        card: genericElementStyle
      },
      input: genericElementStyle,
      viewToggle: genericElementStyle,
      filters: {
        container: genericElementStyle,
        filter: {
          wrapper: genericElementStyle,
          icon: genericElementStyle,
          label: genericElementStyle,
          count: genericElementStyle
        }
      },
      preview: {
        wrapper: genericElementStyle,
        title: genericElementStyle,
        editor: genericElementStyle
      }
    },

    integrations: {
      card: {
        wrapper: genericElementStyle,
        icon: genericElementStyle,
        text: genericElementStyle,
        checked: genericElementStyle
      },
      details: {
        wrapper: genericElementStyle
      }
    },

    reminders: {
      reminder: {
        wrapper: genericElementStyle,
        status: {
          active: genericElementStyle,
          snooze: genericElementStyle,
          seen: genericElementStyle,
          missed: genericElementStyle
        },
        note: genericElementStyle,
        controls: {
          button: transparentButton(1),
          snoozeControls: transparentButton(1)
        }
      }
    },

    highlight: {
      wrapper: genericElementStyle
    },

    links: {
      wrapper: genericElementStyle,
      link: {
        wrapper: genericElementStyle,
        icon: genericElementStyle
      }
    },

    spotlight: {
      input: genericElementStyle,
      logo: {
        iconColor: tokens.colors.primary.default
      },
      list: {
        item: genericElementStyle,
        groupLabel: genericElementStyle
      },
      preview: genericElementStyle,
      toast: {
        success: genericElementStyle,
        error: genericElementStyle
      }
    },

    modal: {
      overlay: genericElementStyle,
      content: genericElementStyle
    },

    helpButton: button(0),

    generic: {
      tags: {
        wrapper: genericElementStyle,
        tag: tagStyle
      },
      button: {
        default: button(1),
        primary: primaryButton,
        secondary: transparentButton(1)
      },
      tooltip: {
        default: defaultTooltip,
        primary: primaryTooltip,
        info: genericElementStyle
      },
      // The selection dropdown for selecting a note
      // While renaming, refactoring, lookup etc
      noteSelect: {
        wrapper: menu(2),
        item: genericElementStyle,
        status: {
          selected: genericElementStyle,
          empty: genericElementStyle
        }
      },
      pageTitle: genericElementStyle,
      form: {
        input: genericElementStyle,
        select: genericElementStyle,
        textarea: genericElementStyle,
        checkbox: genericElementStyle,
        radio: genericElementStyle,
        label: genericElementStyle
      },
      shortcut: genericElementStyle,
      toast: {
        success: defaultTooltip,
        error: genericElementStyle
      },
      contextMenu: {
        wrapper: menu(1),
        item: {
          icon: genericElementStyle,
          label: genericElementStyle
        }
      }
    },

    kanban: {
      card: card(2),
      column: card(1),
      columnHeader: genericElementStyle
    },

    settings: {
      sidebar: card(1),
      content: card(1),
      importCard: card(1),
      themeCard: card(1)
    }
  }

  const { theme: cssTheme, cssVariables: themeCssvariables } = getVarAndThemeMap(theme)

  // const cssVariable = `--${key}`
  return {
    theme: {
      ...tokens.layout,
      t: cssTheme,
      additional: {
        profilePalette: [],
        reactSelect: {}
      }
    }
  }
}

const getVarAndThemeMap = (
  theme: LayoutTheme<string>
): { theme: LayoutTheme<CssVariable>; cssVariables: Record<CssVariable, string> } => {
  /*
   * We will now generate the two maps,
   * first the theme map in CssVariables
   * and the second of CssVariables and their values
   */
  const themeMap = {}
  const cssVariablesMap = {}

  const leaveKeys = getKeyOfLeaves(theme as any)

  console.log({ leaveKeys })

  leaveKeys.forEach((key) => {
    const cssVariable: CssVariable = `--theme-${key.join('-')}`
    set(themeMap, key, cssVariable)
    set(cssVariablesMap, cssVariable, get(theme, key))
  })

  return {
    theme: themeMap as LayoutTheme<CssVariable>,
    cssVariables: cssVariablesMap as Record<CssVariable, string>
  }
}

interface DeepObject {
  [key: string]: DeepObject | string
}

const getKeyOfLeaves = (obj: DeepObject): Array<string[]> => {
  const keys: Array<string[]> = []
  const leaves = (obj: DeepObject | string, path: string[] = []) => {
    if (typeof obj === 'string') {
      keys.push(path)
    } else {
      Object.keys(obj).forEach((key) => leaves(obj[key], [...path, key]))
    }
  }
  leaves(obj)
  return keys
}
