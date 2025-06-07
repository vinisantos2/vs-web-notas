'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { onAuthStateChanged, User as FirebaseUser } from 'firebase/auth';
import { auth } from './firebase';
import { Usuario } from '../types/usuario';
import { usuarioService } from '../services/usuarioService';
import Loading from '../components/Loading';


export function withAuth<P extends object>(
  WrappedComponent: React.ComponentType<P & { user: Usuario }>
): React.FC<P> {
  const ProtectedComponent: React.FC<P> = (props) => {
    const router = useRouter();
    const [loading, setLoading] = useState(true);
    const [user, setUser] = useState<Usuario | null>(null);

    useEffect(() => {
      const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
        console.log("Auth state changed:", firebaseUser);

        if (!firebaseUser) {
          router.replace('/login');
          setLoading(false);
        } else {
          try {
            const usuario = await usuarioService.getById(firebaseUser.uid);
            console.log("Usuário recuperado:", usuario);

            if (usuario) {
              setUser(usuario);
            } else {
              console.warn("Usuário não encontrado no Firestore!");
              router.replace('/');
            }
          } catch (error) {
            console.error('Erro ao buscar usuário:', error);
            router.replace('/login');
          } finally {
            setLoading(false);
          }
        }
      });

      return () => unsubscribe();
    }, [router]);

    if (loading) return <Loading msg='Carregando...' />;
    if (!user) return (
      <div className="text-center mt-10 text-red-500">
        Usuário não encontrado. Verifique se sua conta está cadastrada corretamente.
      </div>
    );

    return <WrappedComponent {...props} user={user} />;
  };

  return ProtectedComponent;
}
