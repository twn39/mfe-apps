import {Component, h} from 'preact';
import logoImage from '../assets/images/preact.png';

interface Props {
}

class App extends Component<Props> {
  render() {
    return (
      <div>
        <p>Preact MFE.</p>
        <img width={150} src={logoImage} alt="preact"/>
      </div>
    );
  }
}

export default App;
