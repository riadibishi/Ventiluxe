"use client";
import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function Navbar() {
  const [user, setUser] = useState<any>(null);
  const router = useRouter();

  useEffect(() => {
    // Kontrollo sesionin kur hapet faqja
    const getSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      setUser(session?.user ?? null);
    };
    getSession();

    // Dëgjo në kohë reale nëse admini bën login ose logout
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    return () => subscription.unsubscribe();
  }, []);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push('/');
    router.refresh(); // Rifreskon faqen për të fshehur butonat e adminit
  };

  return (
    <nav className="flex justify-between items-center py-6 px-10 bg-slate-100 border-b border-slate-300 sticky top-5 z-50">
      <Link href="/" className="text-2xl font-bold text-gray-800">
        VENTILUXE <span className="text-orange-600">FASADA</span>
      </Link>

      <div className="flex items-center space-x-8 font-medium text-gray-600">
        <Link href="/" className="hover:text-orange-600 transition">Home</Link>
        <Link href="/portfolio" className="hover:text-orange-600 transition">Portfolio</Link>
        <Link href="/njoftimet" className="hover:text-orange-600 transition">Njoftime</Link>
        
        {/* SHFAQET VETËM NËSE ADMINI ËSHTË I KYÇUR */}
        {user ? (
          <>
            <Link 
              href="/admin" 
              className="text-orange-600 border border-orange-600 px-4 py-2 rounded hover:bg-orange-50 transition font-bold"
            >
              Dashboard ⚙️
            </Link>
            <button 
              onClick={handleLogout}
              className="text-red-500 hover:text-red-700 text-sm font-bold transition"
            >
              Log Out
            </button>
          </>
        ) : (
          <Link href="/kontakt" className="bg-orange-600 text-white px-5 py-2 rounded hover:bg-orange-700 transition">
            Kontakt
          </Link>
        )}
      </div>
    </nav>
  );
}