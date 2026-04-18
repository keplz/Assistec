import { db } from "../firebase/config";
import { collection, addDoc, getDocs, onSnapshot } from "firebase/firestore";

const clientesCollection = collection(db, "clientes");

// 🔹 Criar cliente
export async function criarCliente(nome, telefone) {
  await addDoc(clientesCollection, {
    nome,
    telefone,
    createdAt: new Date()
  });
}

// 🔹 Listar clientes (uma vez)
export async function listarClientes() {
  const snapshot = await getDocs(clientesCollection);

  return snapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data()
  }));
}

// 🔥 Tempo real
export function ouvirClientes(callback) {
  return onSnapshot(clientesCollection, (snapshot) => {
    const data = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));

    callback(data);
  });
}