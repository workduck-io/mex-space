import React from 'react';
import { MexEditor, Plate } from '@mexin/mex-editor';
import { StyledHome } from './components/home.style';

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
              <MexEditor
                options={{
                  editableProps: {
                    placeholder: "Let's try something here...",
                    autoFocus: true,
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
