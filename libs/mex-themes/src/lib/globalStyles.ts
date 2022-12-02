import { set, get } from 'lodash'

import {
  ElementStyle,
  LayoutTheme,
  ListStyle,
  EmbedViewStyle,
  MexTheme,
  CssVariable,
  Card,
  Menu,
  MenuItem
} from './types/theme-new'
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

  const card = (level: number): Card<string> => ({
    surface: tokens.surfaces.s[level]
  })

  const modal = card(3)

  const menuItem = (level: number): MenuItem<string> => ({
    surface: 'transparent',
    text: {
      color: tokens.text.default
    },
    iconColor: tokens.text.default,
    hover: {
      surface: tokens.surfaces.s[level + 1],
      text: {
        color: tokens.colors.primary.hover
      }
    },
    active: {
      surface: tokens.surfaces.s[level + 2],
      text: {
        color: tokens.colors.primary.active
      }
    },
    disabled: {
      surface: 'transparent',
      text: {
        color: tokens.text.disabled
      }
    }
  })

  const menu = (level: number): Menu<string> => ({
    item: menuItem(level),
    menu: card(level + 1)
  })

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

  const IconButtonTitle = (level: number, transparent = true): ElementStyle<string> => ({
    surface: transparent ? 'transparent' : tokens.surfaces.s[level + 1],
    text: {
      color: tokens.colors.primary.default
    },
    iconColor: tokens.colors.primary.default,
    hover: {
      surface: tokens.surfaces.s[level + 2],
      text: {
        color: tokens.colors.primary.hover
      },
      iconColor: tokens.colors.primary.hover
    },
    active: {
      surface: tokens.surfaces.s[level + 2],
      text: {
        color: tokens.colors.primary.active
      },
      iconColor: tokens.colors.primary.active
    },
    disabled: {
      surface: transparent ? 'transparent' : tokens.surfaces.s[level + 1],
      text: {
        color: tokens.text.disabled
      },
      iconColor: tokens.text.disabled
    }
  })

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

  const defaultTooltip = {
    surface: tokens.surfaces.s[1],
    text: {
      color: tokens.text.default
    }
  }
  const primaryTooltip = {
    surface: tokens.colors.primary.default,
    text: {
      color: tokens.colors.primary.text
    }
  }

  const infoTooltip = {
    text: {
      color: tokens.text.fade
    },
    surface: tokens.surfaces.s[1]
  }
  const errorTooltip = {
    surface: tokens.surfaces.s[1],
    iconColor: tokens.colors.red,
    text: {
      color: tokens.text.default
    }
  }

  const embedViewStyle = (level: number): EmbedViewStyle<string> => ({
    wrapper: card(level),
    toolbar: {
      wrapper: card(level + 1),
      iconColor: tokens.colors.primary.default,
      input: baseCard,
      button: button(level)
    }
  })

  const tagStyle = {
    text: {
      color: tokens.text.default
    }
  }

  const defaultText = {
    text: {
      color: tokens.text.default
    }
  }
  const headingText = {
    text: {
      color: tokens.text.heading
    }
  }
  const fadeText = {
    text: {
      color: tokens.text.fade
    }
  }
  const primaryText = {
    text: {
      color: tokens.colors.primary.default
    }
  }
  const hoverCard = (level: number) => ({
    ...card(level),
    ...defaultText,
    iconColor: tokens.colors.fade,
    hover: {
      surface: tokens.surfaces.s[level + 1],
      iconColor: tokens.colors.primary.hover
    },
    active: {
      surface: tokens.surfaces.s[level + 2],
      iconColor: tokens.colors.primary.active
    }
  })
  const theme: LayoutTheme<string> = {
    // For base styles
    app,

    nav: {
      wrapper: {
        surface: tokens.surfaces.sidebar
      },
      logo: {
        iconColor: tokens.colors.primary.default
      },
      search: {
        surface: tokens.surfaces.s[1]
      },
      link: { main: IconButtonTitle(1, true), end: IconButtonTitle(1, true) },
      backForward: IconButtonTitle(1, true)
    },

    sidebar: {
      toggle: {
        iconColor: tokens.colors.fade
      },
      tabs: {
        // wrapper: {},
        tab: IconButtonTitle(0, true),
        indicator: {
          surface: tokens.colors.primary.default
        }
      },
      filter: genericElementStyle,
      tree: {
        // wrapper: {},
        item: {
          wrapper: menuItem(0),
          collpaseToggle: { iconColor: tokens.colors.fade },
          icon: {
            iconColor: tokens.colors.fade
          },
          label: fadeText,
          count: fadeText
        }
      },
      spaces: {
        // wrapper: {},
        item: {
          wrapper: {
            surface: tokens.surfaces.s[1]
          },
          icon: {
            iconColor: tokens.colors.fade,
            hover: {
              iconColor: tokens.colors.primary.hover
            },
            active: {
              iconColor: tokens.colors.primary.default
            }
          }
        }
      },
      createNew: {
        button: primaryButton,
        ...menu(0)
      },
      infobar: {
        toolbar: card(0),
        context: {
          outlineItem: {
            text: {
              color: tokens.text.default
            }
          },
          ilink: {
            text: {
              color: tokens.colors.primary.default
            },
            iconColor: tokens.colors.primary.default
          },
          collapsable: {
            header: {
              ...defaultText,
              iconColor: tokens.colors.secondary
            },
            toggle: {
              iconColor: tokens.colors.fade
            }
          }
        },
        graph: {},
        smartSuggestion: card(1),
        reminders: card(1)
      }
    },

    fleet: {
      item: {
        ...card(0),
        ...fadeText,
        iconColor: tokens.colors.fade,
        hover: {
          surface: tokens.surfaces.s[2],
          iconColor: tokens.colors.primary.hover
        },
        active: {
          surface: tokens.surfaces.s[3],
          iconColor: tokens.colors.primary.active
        },
        disabled: {
          surface: tokens.surfaces.s[0],
          iconColor: tokens.text.disabled
        }
      }
    },

    editor: {
      toolbar: {
        // wrapper: genericElementStyle,
        title: headingText,
        button: button(0),
        balloonToolbar: {
          wrapper: card(1),
          button: transparentButton(1)
        }
      },

      metadata: {
        ...card(0),
        ...defaultText,
        iconColor: tokens.colors.fade,
        hover: {
          surface: tokens.surfaces.s[1],
          iconColor: tokens.colors.primary.hover
        }
      },
      // content: genericElementStyle,
      preview: {
        wrapper: modal,
        header: defaultText,
        editor: genericElementStyle
      },
      dnd: {
        ...card(1),
        iconColor: tokens.colors.fade,
        hover: {
          surface: tokens.surfaces.s[2],
          iconColor: tokens.text.default
        },
        active: {
          surface: tokens.surfaces.s[3],
          iconColor: tokens.colors.primary.active
        }
      },
      elements: {
        paragraph: defaultText,
        heading: {
          h1: headingText,
          h2: headingText,
          h3: headingText,
          h4: headingText,
          h5: headingText,
          h6: headingText
        },
        marks: {
          highlight: {
            surface: tokens.surfaces.highlight
          },
          bold: defaultText,
          code: {
            text: {
              color: tokens.text.code
            },
            surface: tokens.surfaces.code
          },
          italic: defaultText,
          strikethrough: fadeText
        },
        list: {
          ul: listStyle,
          ol: listStyle
        },
        tag: tagStyle,
        mention: {
          self: primaryText,
          invited: defaultText,
          default: primaryText
        },
        todo: {
          self: genericElementStyle,
          checkbox: genericElementStyle,
          actions: genericElementStyle // Better name maybe,
        },
        ilink: {
          preview: {
            wrapper: card(1),
            // content: genericElementStyle,
            header: headingText,
            close: {
              iconColor: tokens.colors.fade,
              hover: {
                iconColor: tokens.colors.red
              }
            }
          },
          default: primaryText,
          missing: fadeText,
          archived: fadeText,
          shared: primaryText
        },
        weblink: primaryText,
        blockquote: {
          ...card(1),
          ...defaultText,
          borderLeft: '2px solid ' + tokens.colors.fade
        },
        codeblock: card(1),
        table: {
          tr: genericElementStyle,
          td: genericElementStyle,
          th: genericElementStyle
        },
        image: {
          image: genericElementStyle,
          caption: {
            ...card(1),
            ...defaultText
          }
        },
        webEmbed: embedViewStyle(1),
        canvas: embedViewStyle(1),
        qaBlock: {
          ...card(1),
          ...defaultText,
          border: '1px solid ' + tokens.colors.fade,
          iconColor: tokens.colors.fade
        }
      },
      combobox: {
        ...menu(0),
        groupLabel: {
          text: {
            color: tokens.text.default
          },
          iconColor: tokens.text.default
        },
        preview: card(2)
      }
    },

    search: {
      result: {
        list: hoverCard(1),
        card: hoverCard(1)
      },
      input: genericElementStyle,
      viewToggle: menuItem(1),
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
        wrapper: card(0),
        iconColor: tokens.colors.fade,
        textColor: tokens.text.default,
        checkedColor: tokens.colors.primary.default
      },
      details: {
        wrapper: card(0),
        textColor: tokens.text.default
      }
    },

    reminders: {
      reminder: {
        wrapper: card(2),
        // TODO:
        status: {
          active: genericElementStyle,
          snooze: genericElementStyle,
          seen: genericElementStyle,
          missed: genericElementStyle
        },
        note: fadeText,
        controls: {
          button: transparentButton(1),
          snoozeControls: transparentButton(1)
        }
      }
    },

    highlight: {
      surface: tokens.surfaces.highlight
    },

    links: {
      // wrapper: card(1),
      link: hoverCard(1)
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
      overlay: modal
      // content: genericElementStyle
    },

    helpButton: button(0),

    generic: {
      separator: {
        iconColor: tokens.surfaces.separator
      },
      tags: {
        wrapper: card(1),
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
        info: infoTooltip
      },
      // The selection dropdown for selecting a note
      // While renaming, refactoring, lookup etc
      noteSelect: {
        ...menu(2)
        // status: {
        //   selected: genericElementStyle,
        //   empty: genericElementStyle
        // }
      },
      pageTitle: headingText,
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
        error: errorTooltip
      },
      contextMenu: menu(1)
    },

    kanban: {
      card: hoverCard(2),
      column: card(1),
      columnHeader: headingText
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
