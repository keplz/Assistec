import { db } from "./firebase/config.js";
import { collection, addDoc } from "firebase/firestore";
import Cliente from './components/Cliente'

function App() {
  return (
    <div>
      <h1>Sistema de Assistência</h1>
      <Cliente />
    </div>
  );
}
export default App;