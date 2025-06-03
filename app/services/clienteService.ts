import { db } from '../lib/firebase';
import {
  collection, doc, getDocs, getDoc, addDoc, updateDoc, deleteDoc
} from 'firebase/firestore';
import { Cliente } from '../types/cliente';

const ref = collection(db, 'clientes');

export const clienteService = {
  async getAll() {
    const snapshot = await getDocs(ref);
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })) as (Cliente & { id: string })[];
  },
  async getById(id: string) {
    const snap = await getDoc(doc(db, 'clientes', id));
    if (!snap.exists()) return null;
    return { id: snap.id, ...snap.data() } as Cliente & { id: string };
  },
  async create(data: Cliente) {
    const docRef = await addDoc(ref, data);
    return docRef.id;
  },
  async update(id: string, data: Partial<Cliente>) {
    await updateDoc(doc(db, 'clientes', id), data);
  },
  async remove(id: string) {
    await deleteDoc(doc(db, 'clientes', id));
  }
};
