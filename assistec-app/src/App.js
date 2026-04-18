import { db } from "./firebase/config.js";
import { collection, addDoc } from "firebase/firestore";
import Cliente from './components/Cliente'
import OrdemServico from './components/OrdemServico'

function App() {
  return (
    <div>
      <h1>Sistema de Assistência</h1>
      <Cliente />
      <hr/>
      <OrdemServico />
    </div>
  );
}
export default App;