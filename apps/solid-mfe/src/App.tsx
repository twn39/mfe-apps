import {createSignal, onCleanup} from "solid-js";
import logoImage from '../assets/images/solidjs.jpg';

const App = () => {
    const [title, setTitle] = createSignal("Solid MFE.");

    return (
        <div>
            <p>{title}</p>
            <img width={180} src={logoImage} alt="solidjs"/>
        </div>
    );
};

export default App;
