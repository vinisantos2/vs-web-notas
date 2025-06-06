import { signInWithEmailAndPassword, signOut } from 'firebase/auth';
import { auth, db } from './firebase';
import { doc, getDoc } from 'firebase/firestore';

export const authService = {
    login: async (email: string, senha: string) => {
        const userCredential = await signInWithEmailAndPassword(auth, email, senha);
        return userCredential.user;
    },
    logout: async () => {
        await signOut(auth);
    },

    async getUsuarioLogado() {
        const user = auth.currentUser;

        if (!user) return null;

        // Pegando dados adicionais do usuário no Firestore, por exemplo:
        const userDoc = await getDoc(doc(db, 'usuarios', user.uid));

        if (!userDoc.exists()) {
            return {
                uid: user.uid,
                email: user.email,
                role: 'user',
            };
        }

        const dados = userDoc.data();

        return {
            uid: user.uid,
            email: user.email,
            role: dados.role || 'user',
        };
    },
};
