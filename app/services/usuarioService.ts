import { db } from '../lib/firebase';
import {
  collection, doc, getDocs, getDoc, addDoc, updateDoc, deleteDoc
} from 'firebase/firestore';
import { Usuario } from '../types/usuario';

const ref = collection(db, 'usuarios');

export const usuarioService = {
  async getAll() {
    const snapshot = await getDocs(ref);
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })) as (Usuario & { id: string })[];
  },
  async getById(id: string) {
    const snap = await getDoc(doc(db, 'usuarios', id));
    if (!snap.exists()) return null;
    return { id: snap.id, ...snap.data() } as Usuario & { id: string };
  },
  async create(data: Usuario) {
    const docRef = await addDoc(ref, data);
    return docRef.id;
  },
  async update(id: string, data: Partial<Usuario>) {
    await updateDoc(doc(db, 'usuarios', id), data);
  },
  async remove(id: string) {
    await deleteDoc(doc(db, 'usuarios', id));
  }


};

export const getUserRole = async (uid: string): Promise<string | null> => {
  const ref = doc(db, 'usuarios', uid);
  const snap = await getDoc(ref);
  return snap.exists() ? snap.data().role : null;
};
