import { db } from "../firebase/config";
import {
  collection,
  addDoc,
  getDocs,
  doc,
  getDoc,
  setDoc
} from "firebase/firestore";

const osCollection = collection(db, "ordens_servico");

// 🔥 gerar número automático
async function gerarNumeroOS() {
  const ref = doc(db, "counters", "ordem_servico");
  const snap = await getDoc(ref);

  let numero = 1;

  if (snap.exists()) {
    numero = snap.data().value + 1;
  }

  // 🔥 cria ou atualiza automaticamente
  await setDoc(ref, { value: numero }, { merge: true });

  return numero;
}

// 🔹 Criar OS
export async function criarOS(dados) {
  const numero = await gerarNumeroOS();

  await addDoc(osCollection, {
    numero,
    ...dados,
    createdAt: new Date()
  });
}

// 🔹 Listar
export async function listarOS() {
  const snapshot = await getDocs(osCollection);

  return snapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data()
  }));
}