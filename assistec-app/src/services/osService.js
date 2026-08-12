import { db } from "../firebase/config";

import {
  collection,
  addDoc,
  getDocs,
  doc,
  getDoc,
  setDoc,
  updateDoc,
} from "firebase/firestore";

const osCollection = collection(db, "ordens_servico");

// 🔥 Gerar número automático da OS
async function gerarNumeroOS() {
  const ref = doc(db, "counters", "ordem_servico");
  const snap = await getDoc(ref);

  let numero = 1;

  if (snap.exists()) {
    numero = snap.data().value + 1;
  }

  await setDoc(ref, {
    value: numero,
  });

  return numero;
}

// 🔹 Criar OS
export async function criarOS(dados) {
  const numero = await gerarNumeroOS();

  const novaOS = {
    numero,

    clienteId: dados.clienteId || "",

    aparelho: {
      marca: dados.marca || "",
      modelo: dados.modelo || "",
      imei: dados.imei || "",
    },

    defeito: dados.defeito || "",

    status: dados.status || "aberto",

    valorServico: dados.valorServico || 0,

    formaPagamento: dados.formaPagamento || "",

    statusPagamento: dados.statusPagamento || "pendente",

    dataEntrada: dados.dataEntrada || new Date(),

    dataPrevisaoEntrega: dados.dataPrevisaoEntrega || null,

    dataEntrega: dados.dataEntrega || null,

    observacoes: dados.observacoes || "",

    createdAt: new Date(),
  };

  await addDoc(osCollection, novaOS);
}

// 🔹 Listar OS
export async function listarOS() {
  const snapshot = await getDocs(osCollection);

  return snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));
}

export async function atualizarOS(id, dados) {
  const osRef = doc(db, "ordens_servico", id);

  await updateDoc(osRef, {
    clienteId: dados.clienteId || "",
    aparelho: {
      marca: dados.marca || "",
      modelo: dados.modelo || "",
      imei: dados.imei || "",
    },
    defeito: dados.defeito || "",
    status: dados.status || "aberto",
    valorServico: dados.valorServico || 0,
    formaPagamento: dados.formaPagamento || "",
    statusPagamento: dados.statusPagamento || "pendente",
    dataPrevisaoEntrega: dados.dataPrevisaoEntrega || null,
    dataEntrega: dados.dataEntrega || null,
    observacoes: dados.observacoes || "",
  });
}