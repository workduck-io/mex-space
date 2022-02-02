import React from 'react';
import { MexEditor } from '@mexin/mex-editor';
import { StyledHome } from './components/home.style';
import { gruvboxTheme } from './theme/theme';

type HomeProps = {
  title: string;
};

const Home = ({ title }: HomeProps) => {
  const comboConfig = {};

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
              <MexEditor
                theme={gruvboxTheme}
                comboboxConfig={{
                  onKeyDownConfig: {
                    keys: {},
                    slashCommands: {},
                  },
                  onChangeConfig: {},
                }}
                meta={{
                  parentPath: 'documentation',
                  path: 'documentation.first',
                }}
                options={{
                  editableProps: {
                    placeholder: "Let's try something here...",
                    autoFocus: true,
                  },
                  focusOptions: {
                    edge: 'start',
                    focus: true,
                  },
                }}
                editorId="wd-mex-editor"
                value={[{ type: 'p', children: [{ text: '' }] }]}
              />
            </div>
          </div>
        </div>
      </div>
    </StyledHome>
  );
};

export default Home;
