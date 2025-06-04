import { db } from '../lib/firebase'; // ajuste se necessário
import { collection, addDoc, getDocs, deleteDoc, doc, getDoc, updateDoc } from 'firebase/firestore';
import { Nota } from '../types/nota';

export const notaService = {
  async getAll(): Promise<Nota[]> {
    const snapshot = await getDocs(collection(db, 'notas'));
    return snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
    })) as Nota[];
  },

  async delete(id: string) {
    await deleteDoc(doc(db, 'notas', id));
  },

  async criarNota(nota: Nota) {
    await addDoc(collection(db, 'notas'), nota);
  },

  async getById(id: string): Promise<Nota | null> {
    const ref = doc(db, 'notas', id);
    const snap = await getDoc(ref);
    if (!snap.exists()) return null;
    return { id: snap.id, ...snap.data() } as Nota;
  },

  async update(id: string, nota: Nota): Promise<void> {
    const ref = doc(db, 'notas', id);

    const { id: _, ...notaSemId } = nota;

    await updateDoc(ref, notaSemId);
  },
};
