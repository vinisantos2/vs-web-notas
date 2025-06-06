'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { onAuthStateChanged, getAuth, User } from 'firebase/auth';
import { auth } from './firebase';


export function withAuth<P extends object>(
  WrappedComponent: React.ComponentType<P>
): React.FC<P> {
  const ProtectedComponent: React.FC<P> = (props) => {
    const router = useRouter();
    const [loading, setLoading] = useState(true);
    const [user, setUser] = useState<User | null>(null);

    useEffect(() => {
      const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
        if (!firebaseUser) {
          router.replace('/login');
        } else {
          setUser(firebaseUser);
        }
        setLoading(false);
      });

      return () => unsubscribe();
    }, [router]);

    if (loading) return <p>Carregando...</p>;
    if (!user) return null;

    return <WrappedComponent {...props} />;
  };

  return ProtectedComponent;
}
