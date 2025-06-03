import { signInWithEmailAndPassword, signOut } from 'firebase/auth';
import { auth } from './firebase';

export const authService = {
    login: async (email: string, senha: string) => {
        const userCredential = await signInWithEmailAndPassword(auth, email, senha);
        return userCredential.user;
    },
    logout: async () => {
        await signOut(auth);
    }
};
