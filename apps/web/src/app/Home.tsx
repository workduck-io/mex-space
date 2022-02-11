import React from 'react';
import { ComboboxKey, MexEditor } from '@workduck-io/mex-editor';
import { StyledHome } from './components/home.style';
import { gruvboxTheme } from './theme/theme';
import { ThemeProvider } from 'styled-components';

type HomeProps = {
  title: string;
};

const Home = ({ title }: HomeProps) => {
  return (
    <StyledHome>
      <div className="wrapper">
        <div className="container">
          <div id="welcome">
            <h1>
              <span> Hello there, </span>
              Welcome {title} 👋
            </h1>
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
                            console.log('New Ilink: ', ilink),
                        },
                        tag: {
                          newItemHandler: (tag: string) =>
                            console.log('New Tag: ', tag),
                        },
                      },
                      slashCommands: {},
                    },
                    onChangeConfig: {
                      ilink: {
                        cbKey: ComboboxKey.ILINK,
                        data: [],
                        trigger: '[[',
                      },
                      tag: {
                        cbKey: ComboboxKey.TAG,
                        data: [],
                        trigger: '#',
                      },
                    },
                  }}
                  meta={{
                    path: 'documentation.first',
                  }}
                  options={{
                    editableProps: {
                      readOnly: false,
                      placeholder: "Let's try something here...",
                      autoFocus: true,
                    },

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
