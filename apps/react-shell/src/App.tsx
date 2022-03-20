import React, {lazy, Suspense} from 'react';
const PreactMfeModule = lazy( () => import("./mfe/PreactMfe"));
const VueMfeModule = lazy(() => import('./mfe/VueMfe'));
const SolidMfeModule = lazy(() => import('./mfe/SolidMfe'));
const LitMfeModule = lazy(() => import('./mfe/LitMfe'));
import ErrorBoundary from "./ErrorBoundary";
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
            <ErrorBoundary>
              <Suspense fallback={<div>Loading...</div>}>
                <PreactMfeModule />
              </Suspense>
            </ErrorBoundary>
          </div>
          <div className={styles.mfe}>
            <ErrorBoundary>
              <Suspense fallback={<div>Loading...</div>}>
                <VueMfeModule />
              </Suspense>
            </ErrorBoundary>
          </div>
          <div className={styles.mfe}>
            <ErrorBoundary>
              <Suspense fallback={<div>Loading...</div>}>
                <SolidMfeModule />
              </Suspense>
            </ErrorBoundary>
          </div>
          <div className={styles.mfe}>
            <ErrorBoundary>
              <Suspense fallback={<div>Loading...</div>}>
                <LitMfeModule />
              </Suspense>
            </ErrorBoundary>
          </div>

        </div>
      </div>
    );
  }
}

export default App;
