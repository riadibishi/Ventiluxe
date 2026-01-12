"use client";
import { useState } from 'react';
import { supabase } from '@/lib/supabase';

export default function KontaktPage() {
  const [status, setStatus] = useState(''); 

  async function handleSubmit(e) {
    e.preventDefault();
    setStatus('loading');
    const formData = new FormData(e.target);
    
    const { error } = await supabase.from('messages').insert([{
      full_name: formData.get('emri'),
      email: formData.get('email'),
      message: formData.get('mesazhi')
    }]);

    if (error) setStatus('error');
    else {
      setStatus('success');
      e.target.reset();
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 py-20 px-6">
      <div className="max-w-xl mx-auto bg-white p-8 rounded-2xl shadow-lg border border-gray-100">
        <h1 className="text-3xl font-bold text-gray-900 mb-6">Na Kontaktoni</h1>
        
        {status === 'success' && (
          <div className="mb-6 p-4 bg-green-100 text-green-700 rounded-lg">
            ✅ Mesazhi u dërgua! Do t'ju kontaktojmë së shpejti.
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          <input name="emri" type="text" required className="w-full p-3 border rounded-lg outline-none focus:ring-2 focus:ring-orange-500" placeholder="Emri juaj" />
          <input name="email" type="email" required className="w-full p-3 border rounded-lg outline-none focus:ring-2 focus:ring-orange-500" placeholder="Email adresa" />
          <textarea name="mesazhi" required rows="5" className="w-full p-3 border rounded-lg outline-none focus:ring-2 focus:ring-orange-500" placeholder="Si mund t'ju ndihmojmë?"></textarea>
          <button type="submit" disabled={status === 'loading'} className="w-full bg-orange-600 hover:bg-orange-700 text-white font-bold py-4 rounded-lg transition-all">
            {status === 'loading' ? 'Duke u dërguar...' : 'DËRGO MESAZHIN'}
          </button>
        </form>
      </div>
    </div>
  );
}