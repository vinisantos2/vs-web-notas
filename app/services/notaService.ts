import { db } from '../lib/firebase';
import {
  collection, doc, getDocs, getDoc, addDoc, updateDoc, deleteDoc
} from 'firebase/firestore';
import { Nota } from '../types/nota';

const ref = collection(db, 'notas');

export const notaService = {
  async getAll() {
    const snapshot = await getDocs(ref);
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })) as (Nota & { id: string })[];
  },
  async getById(id: string) {
    const snap = await getDoc(doc(db, 'notas', id));
    if (!snap.exists()) return null;
    return { id: snap.id, ...snap.data() } as Nota & { id: string };
  },
  async create(data: Nota) {
    const docRef = await addDoc(ref, data);
    return docRef.id;
  },
  async update(id: string, data: Partial<Nota>) {
    await updateDoc(doc(db, 'notas', id), data);
  },
  async remove(id: string) {
    await deleteDoc(doc(db, 'notas', id));
  }
};
