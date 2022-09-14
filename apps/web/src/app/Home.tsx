import { ELEMENT_MEDIA_EMBED, ELEMENT_TABLE } from '@udecode/plate'
import { ELEMENT_EXCALIDRAW } from '@udecode/plate-excalidraw'
import { ComboboxKey, MexEditor } from '@workduck-io/mex-editor'
import React, { useState } from 'react'
import { ThemeProvider } from 'styled-components'
import { StyledHome } from './components/home.style'
import { gruvboxTheme } from './theme/theme'
import FleetContainer from './components/FleetContainer'

type HomeProps = {
  title: string
}

const commands = [
  {
    command: 'table',
    text: 'Insert Table',
    icon: 'ri:table-line',
    type: 'Quick Actions'
  },
  {
    command: 'canvas',
    text: 'Insert Drawing canvas',
    icon: 'ri:markup-line',
    type: 'Quick Actions'
  },
  {
    command: 'webem',
    text: 'Insert Web embed',
    icon: 'ri:global-line',
    type: 'Quick Actions'
  }
]

const Home = ({ title }: HomeProps) => {
  const [ilinks, setIlinks] = useState<Array<any>>([])
  return (
    <StyledHome>
      <div className="wrapper">
        <div className="container">
          <div id="welcome">
            <h1>
              <span> Hello there, </span>
              Welcome {title} 👋
            </h1>
            <FleetContainer />
            <pre>
              {ilinks.map((i) => (
                <div>{i.path}</div>
              ))}
            </pre>
          </div>

          <div id="mex-editor-container" className="rounded">
            <div className="text-container">
              <ThemeProvider theme={gruvboxTheme}>
                <MexEditor
                  comboboxConfig={{
                    onKeyDownConfig: {
                      keys: {
                        ilink: {
                          newItemHandler: (ilink: string) =>
                            setIlinks((prev) => [
                              ...prev,
                              {
                                path: ilink,
                                value: ilink,
                                text: ilink,
                                nodeid: 'ilink1',
                                icon: 'something'
                              }
                            ])
                        },
                        tag: {
                          newItemHandler: (tag: string) => console.log('New Tag: ', tag)
                        },
                        slash_command: {
                          newItemHandler: () => undefined
                        }
                      },
                      slashCommands: {
                        webem: {
                          slateElementType: ELEMENT_MEDIA_EMBED,
                          command: 'webem',
                          options: {
                            url: 'http://example.com/'
                          }
                        },
                        excalidraw: {
                          slateElementType: ELEMENT_EXCALIDRAW,
                          command: 'canvas'
                        },
                        table: {
                          slateElementType: ELEMENT_TABLE,
                          command: 'table'
                        }
                      }
                    },
                    onChangeConfig: {
                      ilink: {
                        cbKey: ComboboxKey.ILINK,
                        data: ilinks,
                        trigger: '[['
                      },
                      tag: {
                        cbKey: ComboboxKey.TAG,
                        data: [],
                        trigger: '#'
                      },
                      slash_command: {
                        cbKey: ComboboxKey.SLASH_COMMAND,
                        data: commands.map((l) => ({ ...l, value: l.command })),
                        trigger: '/'
                      }
                    }
                  }}
                  meta={{
                    path: 'documentation.first'
                  }}
                  options={{
                    editableProps: {
                      readOnly: false,
                      placeholder: "Let's try something here...",
                      autoFocus: true
                    },
                    withBalloonToolbar: true,
                    focusOptions: {
                      edge: 'start',
                      focus: true
                    }
                  }}
                  editorId="wd-mex-editor"
                  value={[{ type: 'p', children: [{ text: '' }] }]}
                />
              </ThemeProvider>
            </div>
          </div>
        </div>
      </div>
    </StyledHome>
  )
}

export default Home
