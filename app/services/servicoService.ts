import {
  collection,
  doc,
  getDocs,
  getDoc,
  addDoc,
  updateDoc,
  deleteDoc
} from 'firebase/firestore';
import { db } from '../lib/firebase';

const servicoCollection = collection(db, 'servicos');

export const servicoService = {
  async getAll() {
    const snapshot = await getDocs(servicoCollection);
    return snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    })) as (Servico & { id: string })[];
  },

  async getById(id: string) {
    const docRef = doc(db, 'servicos', id);
    const snapshot = await getDoc(docRef);
    if (!snapshot.exists()) return null;
    return { id: snapshot.id, ...snapshot.data() } as Servico & { id: string };
  },

  async create(data: Servico) {
    const docRef = await addDoc(servicoCollection, data);
    return docRef.id;
  },

  async update(id: string, data: Partial<Servico>) {
    const docRef = doc(db, 'servicos', id);
    await updateDoc(docRef, data);
  },

  async remove(id: string) {
    const docRef = doc(db, 'servicos', id);
    await deleteDoc(docRef);
  },

};
