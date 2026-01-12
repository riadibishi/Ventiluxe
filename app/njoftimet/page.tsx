"use client";
import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';

export default function NjoftimetPage() {
  const [announcements, setAnnouncements] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // DUHET useEffect që kodi të ekzekutohet kur hapet faqja
  useEffect(() => {
    async function fetchAnnouncements() {
      const { data, error } = await supabase
        .from('announcements')
        .select('*')
        .order('created_at', { ascending: false }); // I rendit nga më i riu

      if (error) {
        console.error("GABIM:", error.message);
      } else {
        console.log("Të dhënat e marra:", data); // Tani duhet të jetë > 0
        setAnnouncements(data || []);
      }
      setLoading(false); // Ndalon loading-un pas marrjes së të dhënave
    }

    fetchAnnouncements();
  }, []); // [] siguron që thirret vetëm 1 herë

  if (loading) return <div className="text-center py-20 font-bold">Duke u ngarkuar...</div>;

  return (
    <div className="max-w-4xl mx-auto p-6 min-h-screen">
      <h1 className="text-3xl font-black mb-8 italic uppercase border-b-2 pb-2">
        📢 NJOFTIMET
      </h1>
      
      <div className="space-y-6">
        {announcements.map((ann) => (
          <div key={ann.id} className="p-5 border-l-8 border-orange-600 bg-white shadow-md rounded-r-xl transition-transform hover:scale-[1.01]">
            <p className="text-gray-800 text-lg font-medium leading-relaxed">
              {ann.content}
            </p>
            <div className="mt-4 text-xs font-bold text-gray-400 uppercase tracking-widest">
              Postuar më: {new Date(ann.created_at).toLocaleDateString('sq-AL')}
            </div>
          </div>
        ))}

        {announcements.length === 0 && (
          <div className="text-center py-20 bg-gray-50 rounded-2xl border-2 border-dashed">
            <p className="text-gray-500 italic">Për momentin nuk ka asnjë njoftim të ri.</p>
          </div>
        )}
      </div>
    </div>
  );
}