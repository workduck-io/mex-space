import { css } from 'styled-components'

import {
  ButtonStyle,
  Card,
  CssVariable,
  CssVariableAccessor,
  EmbedViewStyle,
  LayoutTheme,
  ListStyle,
  Menu,
  MenuItem,
  MexTheme,
  SelectableButtonStyle
} from './types/theme'
import { LayoutTokens, ThemeTokens } from './types/tokens'
import { GLOBAL_STYLE_ID } from './defaults'
import { keyConverter } from './objHelpers'
import { generateTheme } from './themeGenerator'

const layoutTokens: LayoutTokens<string> = {
  spacing: {
    large: '2rem',
    medium: '1rem',
    small: '0.5rem',
    tiny: '0.25rem'
  },
  borderRadius: {
    large: '1rem',
    small: '0.5rem',
    tiny: '0.25rem'
  }
}

interface GeneratorOptions {
  antiLegacy?: boolean
}

export const getGlobalStylesAndTheme = (
  tokens: ThemeTokens<string>,
  options?: GeneratorOptions
): { theme: MexTheme; cssVarMap: Record<CssVariable, string> } => {
  const app = {
    surface: tokens.surfaces.app,
    textColor: tokens.text.default,
    text: {
      size: '16px',
      weight: '400',
      family: 'Roboto, sans-serif'
    },
    iconColor: tokens.text.default
  }

  const card = (level: number): Card<string> => ({
    surface: tokens.surfaces.s[level]
  })

  const modal = card(1)

  const menuItem = (level: number, usePrimary = true): MenuItem<string> => ({
    surface: 'transparent',
    textColor: tokens.text.default,
    iconColor: tokens.text.default,
    hover: {
      surface: tokens.surfaces.s[level + 2],
      textColor: tokens.colors.primary.default
    },
    active: {
      surface: tokens.surfaces.s[level + 3],
      textColor: tokens.colors.primary.active
    },
    disabled: {
      surface: 'transparent',
      textColor: tokens.text.disabled
    },
    selected: {
      surface: usePrimary ? tokens.colors.primary.default : tokens.surfaces.s[level + 3],
      textColor: usePrimary ? tokens.colors.primary.text : tokens.text.heading
    }
  })

  const menu = (level: number, usePrimary = true): Menu<string> => ({
    item: menuItem(level, usePrimary),
    menu: card(level)
  })

  const primaryButton: ButtonStyle<string> = {
    surface: tokens.colors.primary.default,
    textColor: tokens.colors.primary.text,
    iconColor: tokens.colors.primary.text,
    hover: {
      surface: tokens.colors.primary.hover,
      textColor: tokens.colors.primary.text,
      iconColor: tokens.colors.primary.text
    },
    active: {
      surface: tokens.colors.primary.active,
      textColor: tokens.colors.primary.text,
      iconColor: tokens.colors.primary.text
    },
    disabled: {
      surface: tokens.colors.primary.disabled,
      textColor: tokens.text.disabled,
      iconColor: tokens.text.disabled
    }
  }

  const IconButtonTitle = (
    level: number,
    transparent = true,
    selectable = false
  ): ButtonStyle<string> | SelectableButtonStyle<string> => {
    const style = {
      surface: transparent ? 'transparent' : tokens.surfaces.s[level + 2],
      textColor: tokens.text.default,
      iconColor: tokens.colors.primary.default,
      hover: {
        surface: tokens.surfaces.s[level + 2],
        textColor: tokens.colors.primary.hover,
        iconColor: tokens.colors.primary.hover
      },
      active: {
        surface: tokens.surfaces.s[level + 1],
        textColor: tokens.colors.primary.active,
        iconColor: tokens.colors.primary.active
      },
      disabled: {
        surface: transparent ? 'transparent' : tokens.surfaces.s[level + 1],
        textColor: tokens.text.disabled,
        iconColor: tokens.text.disabled
      }
    }
    if (!selectable) return style as ButtonStyle<string>
    else
      return {
        ...style,

        ...(selectable && {
          selected: {
            surface: tokens.surfaces.s[level + 2],
            textColor: tokens.colors.primary.active,
            iconColor: tokens.colors.primary.active
          }
        })
      } as SelectableButtonStyle<string>
  }

  const button = (level: number, transparent = false): ButtonStyle<string> => ({
    surface: transparent ? 'transparent' : tokens.surfaces.s[level + 2],
    textColor: tokens.text.default,
    iconColor: tokens.text.default,
    hover: {
      surface: tokens.surfaces.s[level + (transparent ? 2 : 3)],
      textColor: tokens.text.heading,
      iconColor: tokens.text.heading
    },
    active: {
      surface: tokens.surfaces.s[level + 1],
      textColor: tokens.text.default,
      iconColor: tokens.text.default
    },
    disabled: {
      surface: 'transparent',
      textColor: tokens.text.disabled,
      iconColor: tokens.text.disabled
    }
  })

  const dangerButton = (level: number): ButtonStyle<string> => ({
    surface: tokens.surfaces.s[level + 2],
    textColor: tokens.colors.red,
    iconColor: tokens.colors.red,
    hover: {
      surface: tokens.colors.red,
      textColor: tokens.text.default,
      iconColor: tokens.text.default
    },
    active: {
      surface: tokens.colors.red,
      textColor: tokens.text.heading,
      iconColor: tokens.text.heading
    },
    disabled: {
      surface: tokens.surfaces.s[level],
      textColor: tokens.text.disabled,
      iconColor: tokens.text.disabled
    }
  })

  const listStyle: ListStyle<string> = {
    marker: {
      iconColor: tokens.text.default
    }
  }

  const defaultTooltip = {
    surface: tokens.surfaces.s[2],
    textColor: tokens.text.default
  }

  const primaryTooltip = {
    surface: tokens.colors.primary.default,
    textColor: tokens.colors.primary.text
  }

  const infoTooltip = {
    textColor: tokens.text.fade,
    surface: tokens.surfaces.s[2]
  }
  const errorTooltip = {
    surface: tokens.surfaces.s[2],
    iconColor: tokens.colors.red,
    textColor: tokens.text.default
  }

  const embedViewStyle = (level: number): EmbedViewStyle<string> => ({
    wrapper: card(level),
    toolbar: {
      wrapper: card(level + 1),
      iconColor: tokens.colors.primary.default,
      input: input(level + 1),
      button: button(level + 1, true)
    }
  })

  const tagStyle = {
    textColor: tokens.text.default
  }
  const defaultText = {
    textColor: tokens.text.default
  }
  const headingText = {
    textColor: tokens.text.heading
  }
  const fadeText = {
    textColor: tokens.text.fade
  }
  const primaryText = {
    textColor: tokens.colors.primary.default
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
    },
    selected: {
      surface: tokens.surfaces.s[level + 2],
      iconColor: tokens.colors.primary.active
    }
  })
  const input = (level: number) => ({
    ...card(level + 1),
    ...defaultText,
    iconColor: tokens.colors.fade,
    border: '1px solid transparent',
    hover: {
      surface: tokens.surfaces.s[level + 2],
      iconColor: tokens.colors.primary.hover
    },
    active: {
      surface: tokens.surfaces.s[level + 3],
      iconColor: tokens.colors.primary.active,
      border: '1px solid ' + tokens.colors.primary.active
    },
    disabled: {
      surface: tokens.surfaces.s[level + 1],
      iconColor: tokens.colors.fade,
      textColor: tokens.text.disabled
    }
  })

  const shortcutStyle = {
    surface: tokens.surfaces.s[2],
    iconColor: tokens.colors.primary.default,
    border: '1px solid ' + tokens.surfaces.s[3],
    hover: {
      surface: tokens.surfaces.s[3],
      iconColor: tokens.colors.primary.hover,
      border: '1px solid ' + tokens.colors.primary.default
    }
  }

  const theme: LayoutTheme<string> = {
    // For base styles
    tokens,
    app,

    sidebar: {
      wrapper: {
        surface: tokens.surfaces.sidebar
      },
      nav: {
        logo: {
          iconColor: tokens.colors.primary.default
        },
        search: button(0, true),
        link: {
          main: IconButtonTitle(1, true, true) as SelectableButtonStyle<string>,
          end: IconButtonTitle(1, true, true) as SelectableButtonStyle<string>
        },
        backForward: IconButtonTitle(1, true)
      },
      toggle: {
        iconColor: tokens.colors.fade
      },
      tabs: {
        // wrapper: {},
        tab: IconButtonTitle(0, true, true) as SelectableButtonStyle<string>,
        indicator: {
          surface: tokens.colors.primary.default
        }
      },
      filter: input(1),
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
            surface: tokens.surfaces.s[3],
            selected: {
              surface: tokens.surfaces.s[4]
            }
          },
          icon: {
            iconColor: tokens.colors.fade,
            hover: {
              iconColor: tokens.colors.primary.hover
            },
            active: {
              iconColor: tokens.colors.primary.default
            },
            selected: {
              iconColor: tokens.colors.primary.default
            }
          }
        }
      },
      createNew: primaryButton,
      infobar: {
        toolbar: card(0),
        context: {
          outlineItem: {
            textColor: tokens.text.default
          },
          ilink: {
            textColor: tokens.colors.primary.default,
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
        graph: {
          controlsWrapper: card(2)
        },
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
        },
        selected: {
          surface: tokens.surfaces.s[2],
          iconColor: tokens.colors.primary.default
        }
      }
    },

    editor: {
      toolbar: {
        // wrapper: genericElementStyle,
        title: headingText,
        button: button(0),
        balloonToolbar: {
          wrapper: card(2),
          button: button(2, true)
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
        header: defaultText
        // editor: genericElementStyle
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
            textColor: tokens.text.code,
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
          self: defaultText,
          checkbox: {
            surface: 'transparent',
            iconColor: tokens.colors.primary.default
          },
          controls: {
            ...button(0, false),
            iconColor: tokens.colors.secondary,
            hover: {
              ...button(0, false).hover,
              iconColor: tokens.colors.secondary
            },
            active: {
              ...button(0, false).active,
              iconColor: tokens.colors.secondary
            }
          }
        },
        ilink: {
          preview: {
            wrapper: card(2),
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
          ...card(2),
          ...defaultText,
          borderLeft: '2px solid ' + tokens.colors.fade
        },
        codeblock: card(2),
        table: {
          wrapper: card(2),
          tr: defaultText,
          td: defaultText,
          th: headingText
        },
        image: {
          // image: genericElementStyle,
          caption: {
            ...card(2),
            ...defaultText
          }
        },
        webEmbed: embedViewStyle(2),
        canvas: embedViewStyle(2),
        qaBlock: {
          ...card(2),
          ...defaultText,
          border: '1px solid ' + tokens.colors.fade,
          iconColor: tokens.colors.fade
        }
      },
      combobox: {
        ...menu(0, false),
        groupLabel: {
          textColor: tokens.text.default,
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
      input: input(1),
      viewToggle: menuItem(1),
      filters: {
        container: card(1),
        filter: {
          wrapper: {
            ...card(2),
            ...defaultText,
            iconColor: tokens.colors.fade,
            hover: {
              surface: tokens.surfaces.s[2],
              iconColor: tokens.colors.primary.hover
            },
            active: {
              surface: tokens.surfaces.s[3],
              iconColor: tokens.colors.primary.default
            }
          },
          count: fadeText
        }
      },
      preview: {
        wrapper: card(1),
        title: headingText,
        editor: card(2)
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
        status: {
          surface: tokens.surfaces.s[2],
          active: {
            textColor: tokens.text.default,
            iconColor: tokens.colors.primary.default
          },
          snooze: {
            textColor: tokens.text.default,
            iconColor: tokens.colors.yellow
          },
          seen: {
            textColor: tokens.text.fade,
            iconColor: tokens.colors.fade
          },
          missed: {
            textColor: tokens.text.default,
            iconColor: tokens.colors.red
          }
        },
        note: fadeText,
        controls: {
          button: button(1, true),
          snoozeControls: button(1, true)
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
      input: input(1),
      logo: {
        iconColor: tokens.colors.primary.default
      },
      list: {
        item: {
          surface: 'transparent',
          textColor: tokens.text.default,
          iconColor: tokens.text.fade,
          hover: {
            surface: tokens.surfaces.s[1],
            iconColor: tokens.colors.primary.hover
          },
          active: {
            surface: tokens.surfaces.s[2],
            textColor: tokens.colors.primary.default,
            iconColor: tokens.colors.primary.active
          },
          selected: {
            surface: tokens.surfaces.s[2],
            textColor: tokens.colors.primary.default,
            iconColor: tokens.colors.primary.active
          }
        },
        groupLabel: fadeText
      },
      preview: card(1),
      toast: {
        success: primaryTooltip,
        error: errorTooltip
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
        secondary: button(1, true),
        danger: dangerButton(1)
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
        input: input(1),
        control: {
          ...defaultText,
          iconColor: tokens.colors.primary.default
        },
        label: fadeText
      },
      shortcut: shortcutStyle,
      toast: {
        success: defaultTooltip,
        error: errorTooltip
      },
      contextMenu: menu(2)
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
      themeCard: { ...card(1), selected: card(2) }
    }
  }

  const legacyTheme = generateTheme(
    options?.antiLegacy
      ? {
          // AntiLegacyTheme
          primary: tokens.colors.primary.default,
          secondary: tokens.colors.secondary,

          // Palettes
          gray: {
            10: '#f74f9e',
            9: '#f74f9e',
            8: '#f74f9e',
            7: '#f74f9e',
            6: '#f74f9e',
            5: '#f74f9e',
            4: '#f74f9e',
            3: '#f74f9e',
            2: '#f74f9e',
            1: '#f74f9e'
          },
          palette: {
            white: '#f74f9e',
            black: '#f74f9e',
            green: '#f74f9e',
            yellow: '#f74f9e',
            red: '#f74f9e'
          }
        }
      : {
          // Default generation of legacy
          primary: tokens.colors.primary.default,
          secondary: tokens.colors.secondary,

          // Palettes
          gray: {
            10: tokens.surfaces.s[0],
            9: tokens.surfaces.s[1],
            8: tokens.surfaces.s[2],
            7: tokens.surfaces.s[3],
            6: tokens.surfaces.s[4],
            5: tokens.surfaces.s[5],
            4: tokens.surfaces.s[6],
            3: tokens.colors.fade,
            2: tokens.text.default,
            1: tokens.text.heading
          },
          palette: {
            white: tokens.colors.white,
            black: tokens.colors.black,
            green: tokens.colors.green,
            yellow: tokens.colors.yellow,
            red: tokens.colors.red
          },
          text: {
            heading: tokens.text.heading,
            default: tokens.text.default,
            subheading: tokens.text.subheading,
            fade: tokens.text.fade,
            disabled: tokens.text.disabled,
            accent: tokens.text.accent,
            oppositePrimary: tokens.colors.primary.text
          }
        }
  )

  const { theme: cssTheme, cssVariables: themeCssvariables } = getVarAndThemeMap(theme)
  const { obj: layoutTokensInCssVar, keys: layoutTokensVarMap } = keyConverter<string>(layoutTokens as any)
  const { obj: rgbTokens, keys: rgbTokenKeys } = keyConverter<string>(tokens as any, true)
  // console.log('rgbTokens', { rgbTokens, rgbTokenKeys })

  // const cssVariable = `--${key}`
  return {
    theme: {
      ...legacyTheme,
      ...layoutTokensInCssVar,
      ...cssTheme,
      rgbTokens: rgbTokens as any,
      additional: {
        profilePalette: [] as string[],
        reactSelect: {} as any
      }
    },
    cssVarMap: { ...themeCssvariables, ...layoutTokensVarMap, ...rgbTokenKeys }
  }
}

const getVarAndThemeMap = (
  theme: LayoutTheme<string>
): { theme: LayoutTheme<CssVariableAccessor>; cssVariables: Record<CssVariable, string> } => {
  /*
   * We will now generate the two maps,
   * first the theme map in CssVariables
   * and the second of CssVariables and their values
   */
  const { obj: themeMap, keys: cssVariablesMap } = keyConverter<string>(theme as any)

  return {
    theme: themeMap as unknown as LayoutTheme<CssVariableAccessor>,
    cssVariables: cssVariablesMap as Record<CssVariable, string>
  }
}

interface GlobalStyleOptions extends GeneratorOptions {
  wrapperStyles?: boolean
}

export const generateGlobalStyles = (tokens: ThemeTokens<string>, options?: GlobalStyleOptions) => {
  const { theme, cssVarMap } = getGlobalStylesAndTheme(tokens, options)
  const varStr = Object.entries(cssVarMap)
    .map(([key, value]) => {
      return `${key}: ${value};`
    })
    .join('\n')

  if (options?.wrapperStyles) {
    const wrapperStyle = css`
      ${varStr}
      .no-transition * {
        transition: none !important;
      }
    `
    return { wrapperStyle, theme }
  }

  const style = ` :root { ${varStr} } .no-transition * { transition: none !important; }`

  return { theme, style }
}

export const appendGlobalStyle = (style: string, id = GLOBAL_STYLE_ID) => {
  const el = document.getElementById(id)
  const body = document.body
  if (el) {
    // Add noStyle to body
    body.classList.add('no-transition')
    el.innerHTML = style
    setTimeout(() => {
      body.classList.remove('no-transition')
    }, 100)
  } else {
    const styleEl = document.createElement('style')
    styleEl.id = id
    styleEl.innerHTML = style
    body.classList.add('no-transition')
    document.head.appendChild(styleEl)
    setTimeout(() => {
      body.classList.remove('no-transition')
    }, 100)
  }
}
