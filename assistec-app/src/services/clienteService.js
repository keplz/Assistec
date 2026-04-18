import { db } from "../firebase/config";
import { collection, addDoc, getDocs } from "firebase/firestore";

const clientesCollection = collection(db, "clientes");

export async function criarCliente(nome, telefone) {
  await addDoc(clientesCollection, {
    nome,
    telefone,
    createdAt: new Date()
  });
}

export async function listarClientes() {
  const snapshot = await getDocs(clientesCollection);

  return snapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data()
  }));
}