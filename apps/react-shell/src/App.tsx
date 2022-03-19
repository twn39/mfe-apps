import React from 'react';
import PreactMfeModule from "./mfe/PreactMfe";
import VueMfeModule from "./mfe/VueMfe";
import SolidMfeModule from "./mfe/SolidMfe";
import styles from './app.module.scss';

interface Props {
}

class App extends React.Component<Props> {
  render() {
    return (
      <div>
        <h1>React Shell</h1>
          <div className={styles.mfeApps}>
              <div className={styles.mfe}>
                  <PreactMfeModule />
              </div>
              <div className={styles.mfe}>
                  <VueMfeModule />
              </div>
              <div className={styles.mfe}>
                  <SolidMfeModule />
              </div>
          </div>
      </div>
    );
  }
}

export default App;
