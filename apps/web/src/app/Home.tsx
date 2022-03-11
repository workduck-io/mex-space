import React, { useState } from 'react';
import { ComboboxKey, MexEditor } from '@workduck-io/mex-editor';
import { StyledHome } from './components/home.style';
import { gruvboxTheme } from './theme/theme';
import { ThemeProvider } from 'styled-components';

type HomeProps = {
  title: string;
};

const Home = ({ title }: HomeProps) => {
  const [ilinks, setIlinks] = useState<Array<any>>([]);
  return (
    <StyledHome>
      <div className="wrapper">
        <div className="container">
          <div id="welcome">
            <h1>
              <span> Hello there, </span>
              Welcome {title} 👋
            </h1>
            <pre>
              {ilinks.map((i) => (
                <div key={i.path}>{i.path}</div>
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
                          newItemHandler: (ilink: string) => {
                            setIlinks((prev) => [
                              ...prev,
                              {
                                path: ilink,
                                value: ilink,
                                text: ilink,
                                nodeid: 'ilink1',
                                icon: 'something',
                              },
                            ]);

                            return ilink;
                          },
                        },
                        tag: {
                          newItemHandler: (tag: string) => {
                            return tag;
                          },
                        },
                      },
                      slashCommands: {},
                    },
                    onChangeConfig: {
                      ilink: {
                        cbKey: ComboboxKey.ILINK,
                        data: ilinks,
                        trigger: '[[',
                      },
                      tag: {
                        cbKey: ComboboxKey.TAG,
                        data: [],
                        trigger: '#',
                      },
                    },
                  }}
                  debug
                  meta={{
                    path: 'documentation.first',
                  }}
                  options={{
                    editableProps: {
                      readOnly: false,
                      placeholder: "Let's try something here...",
                      autoFocus: true,
                    },
                    withoutCombobox: true,
                    withBallonToolbar: true,
                    focusOptions: {
                      edge: 'start',
                      focus: true,
                    },
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
  );
};

export default Home;
