import { supabase } from '@/lib/supabase';

export default async function AdminMessages() {
  const { data: messages } = await supabase
    .from('messages')
    .select('*')
    .order('created_at', { ascending: false });

  return (
    <div className="p-10 bg-gray-50 min-h-screen">
      <h1 className="text-2xl font-bold mb-6">Inbox - Mesazhet nga Klientët</h1>
      <div className="grid gap-4">
        {messages?.map((msg) => (
          <div key={msg.id} className="bg-white p-5 rounded-lg shadow border-l-4 border-orange-500">
            <div className="flex justify-between mb-2">
              <h2 className="font-bold text-lg">{msg.full_name}</h2>
              <span className="text-gray-400 text-sm">{new Date(msg.created_at).toLocaleDateString()}</span>
            </div>
            <p className="text-orange-600 text-sm mb-3">{msg.email}</p>
            <p className="text-gray-700 italic">"{msg.message}"</p>
          </div>
        ))}
      </div>
    </div>
  );
}