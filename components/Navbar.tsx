"use client";
import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function Navbar() {
  const [user, setUser] = useState<any>(null);
  const [isOpen, setIsOpen] = useState(false); // State për menunë mobile
  const router = useRouter();

  useEffect(() => {
    const getSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      setUser(session?.user ?? null);
    };
    getSession();

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    return () => subscription.unsubscribe();
  }, []);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    setIsOpen(false);
    router.push('/');
    router.refresh();
  };

  return (
    <nav className="fixed md:sticky top-15 md:top-10 w-full md:w-[100%] mx-auto z-50 bg-white/90 backdrop-blur-md border-b border-slate-200  md:shadow-lg transition-all duration-300">
      <div className="flex justify-between items-center py-4 px-6 md:px-10">
        {/* LOGO */}
        <Link href="/" className="text-xl md:text-2xl font-black tracking-tighter text-gray-800">
          VENTILUXE <span className="text-orange-600">FASADA</span>
        </Link>

        {/* BURGER BUTTON (Vetëm Mobile) */}
        <button 
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden text-2xl text-gray-800 focus:outline-none"
        >
          {isOpen ? '✕' : '☰'}
        </button>

        {/* DESKTOP MENU */}
        <div className="hidden md:flex items-center space-x-8 font-bold text-[13px] uppercase tracking-widest text-gray-600">
          <Link href="/" className="hover:text-orange-600 transition">Home</Link>
          <Link href="/portfolio" className="hover:text-orange-600 transition">Portfolio</Link>
          <Link href="/njoftimet" className="hover:text-orange-600 transition">Njoftime</Link>
          
          {user ? (
            <div className="flex items-center gap-4">
              <Link href="/admin" className="text-orange-600 border-2 border-orange-600 px-4 py-1.5 rounded-full hover:bg-orange-600 hover:text-white transition text-[11px]">
                DASHBOARD ⚙️
              </Link>
              <button onClick={handleLogout} className="text-red-500 hover:text-red-700 text-[11px]">
                LOG OUT
              </button>
            </div>
          ) : (
            <Link href="/kontakt" className="bg-orange-600 text-white px-6 py-2 rounded-full hover:bg-black transition shadow-md shadow-orange-200">
              Kontakt
            </Link>
          )}
        </div>
      </div>

      {/* MOBILE MENU (Shfaqet kur isOpen është true) */}
      <div className={`md:hidden absolute w-full bg-white border-b shadow-xl transition-all duration-300 overflow-hidden ${isOpen ? 'max-h-[400px] opacity-100' : 'max-h-0 opacity-0'}`}>
        <div className="flex flex-col p-6 space-y-4 font-bold text-center uppercase tracking-widest text-sm">
          <Link href="/" onClick={() => setIsOpen(false)} className="py-2 border-b border-gray-50">Home</Link>
          <Link href="/portfolio" onClick={() => setIsOpen(false)} className="py-2 border-b border-gray-50">Portfolio</Link>
          <Link href="/njoftimet" onClick={() => setIsOpen(false)} className="py-2 border-b border-gray-50">Njoftime</Link>
          
          {user ? (
            <>
              <Link href="/admin" onClick={() => setIsOpen(false)} className="text-orange-600 py-2">Dashboard ⚙️</Link>
              <button onClick={handleLogout} className="text-red-500 py-2 uppercase">Log Out</button>
            </>
          ) : (
            <Link href="/kontakt" onClick={() => setIsOpen(false)} className="bg-orange-600 text-white py-3 rounded-xl">
              Kontakt
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
}
