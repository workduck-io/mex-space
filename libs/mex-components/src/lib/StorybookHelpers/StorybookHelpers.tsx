import React from 'react'
import styled from 'styled-components'

import GlobalStyle from '../Global/GlobalStyle'

export const Rows = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  width: fit-content;
`

export const StoryWrapper = ({ children }) => {
  return (
    <>
      {
        // Shows error for GlobalStyle which can be ignoredb
      }
      {/* eslint-disable-line */}
      <GlobalStyle />
      {children}
    </>
  )
}

export const LongContent = () => (
  <div>
    <h1>Some Long Content</h1>
    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
    <h2>Gangsta Lorizzle</h2>
    <p>
      Lorem ipsum dolizzle sit yippiyo, consectetuer adipiscing izzle. Nullizzle fo shizzle velit, away ma nizzle,
      suscipizzle quis, owned vizzle, crunk. Pellentesque egizzle tortor. Ghetto fo shizzle my nizzle. Shiz phat dolor
      dapibizzle fo bling bling sheezy. Maurizzle pellentesque nizzle et turpizzle. Go to hizzle in tortor. Pellentesque
      eleifend rhoncizzle i'm in the shizzle. In hac habitasse platea dictumst. Mofo dapibizzle. Curabitizzle tellizzle
      mah nizzle, pretium eu, mattizzle ac, yippiyo dope, ma nizzle. Ghetto crackalackin. Dizzle sempizzle brizzle
      sizzle cool.
    </p>

    <p>
      Sed shit tortizzle izzle arcu fo yo mamma. In convallis, arcu izzle dignissim posuere, nulla lorem gangster pede,
      sizzle its fo rizzle augue dolizzle sed things. Sizzle ac crackalackin nizzle elit check it out dang. Curabitur
      turpis gangster, fo shizzle izzle, boofron eleifend, bow wow wow away, metizzle. Nunc fo shizzle neque. Lorizzle
      rizzle dolor sizzle amet, consectetizzle gangsta elizzle. Maecenizzle izzle mofo. In tellivizzle. Shiznit hizzle
      erat nizzle velizzle gangster dictum. Gangsta facilisis break it down sit amet that's the shizzle. things. Nunc eu
      yippiyo et fo shizzle mah nizzle fo rizzle, mah home g-dizzle lacinia away. Aenizzle tellivizzle crazy things urna
      shiznit lobortizzle. Suspendisse fo shizzle mah nizzle fo rizzle, mah home g-dizzle est, bibendizzle pulvinar,
      ornare vel, imperdizzle fo shizzle, lacus. Funky fresh egizzle diam things go to hizzle adipiscing its fo rizzle.
      Shizznit izzle nisl quizzle check out this phat nonummy.
    </p>

    <p>
      In gravida gizzle nizzle boofron. Prizzle ullamcorper. Etizzle tempor. Stuff black mi a erizzle imperdizzle
      vehicula. Shiznit vizzle ipsum. Tellivizzle iaculis est id lacizzle. Praesent ipsum vitae fo shizzle my nizzle
      hizzle ullamcorper. nec dawg. Rizzle lobortizzle lacus vizzle owned. Morbi justo. Brizzle eu fizzle in magna
      elementum pot. Morbi daahng dawg, arcu ma nizzle euismod mammasay mammasa mamma oo sa, nisl est adipiscing bow wow
      wow, cursizzle ornare mi dolor sizzle sizzle est. Morbi turpizzle. Vestibulum ante fo shizzle mah nizzle fo
      rizzle, mah home g-dizzle primizzle in orci luctus et sure shiznit cubilia Mah nizzle; Pimpin' brizzle, daahng
      dawg izzle tincidunt hendrerit, risizzle lorem gravida nunc, a fermentum urna bow wow wow quizzle fo shizzle my
      nizzle. Duis pretizzle erizzle ass nulla. Phasellizzle izzle. Fizzle socizzle crazy penatibizzle izzle da bomb dis
      crunk uhuh ... yih!, nascetur ridiculizzle mus. Fo shizzle my nizzle et brizzle fringilla shizzlin dizzle shizznit
      fo shizzle my nizzle. Donec dang mi.
    </p>
  </div>
)
