import { supabase } from '@/lib/supabase';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer'; // U rregullua importi këtu
import './globals.css';

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Marrim njoftimin e fundit aktiv nga tabela
  const { data: announcement } = await supabase
    .from('announcements')
    .select('*')
    .eq('is_active', true)
    .order('created_at', { ascending: false }) // Sigurohemi që të marrim më të riun
    .limit(1)
    .maybeSingle(); 

  return (
    <html lang="sq">
      <body className="antialiased">
        {announcement && (
          <div className="bg-orange-600 text-white text-center py-2.5 px-4 text-sm font-bold sticky top-0 z-[60] shadow-md uppercase tracking-wide">
            <span className="animate-pulse mr-2">📢</span> 
            {announcement.content}
          </div>
        )}
        <Navbar />
        <div className="min-h-screen">
          {children}
        </div>
        <Footer />
      </body>
    </html>
  );
}