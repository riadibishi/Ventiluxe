"use client";
import { useState } from 'react';
import { supabase } from '@/lib/supabase';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) alert("Gabim: " + error.message);
    else router.push('/admin');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-6">
      <form onSubmit={handleLogin} className="bg-white p-8 rounded-2xl shadow-xl max-w-sm w-full">
        <h1 className="text-2xl font-bold mb-6 text-center text-gray-800">Admin Login</h1>
        <input 
          type="email" placeholder="Email" 
          className="w-full p-3 mb-4 border rounded-lg outline-none focus:ring-2 focus:ring-orange-500"
          onChange={(e) => setEmail(e.target.value)}
        />
        <input 
          type="password" placeholder="Fjalëkalimi" 
          className="w-full p-3 mb-6 border rounded-lg outline-none focus:ring-2 focus:ring-orange-500"
          onChange={(e) => setPassword(e.target.value)}
        />
        <button className="w-full bg-orange-600 text-white font-bold py-3 rounded-lg hover:bg-orange-700 transition">
          HYR
        </button>
      </form>
    </div>
  );
}