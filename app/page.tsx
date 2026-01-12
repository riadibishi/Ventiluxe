export const revalidate = 0;

import { supabase } from '@/lib/supabase';
import Link from 'next/link';
import Counter from '@/components/Counter'; // Importojmë komponentin e ri

export default async function HomePage() {
  const { data: settings } = await supabase.from('settings').select('*').single();

  const { data: projects, error: projError } = await supabase
    .from('projects')
    .select('*')
    .order('created_at', { ascending: false })
    .limit(6);

  const { data: announcements } = await supabase
    .from('announcements')
    .select('*')
    .order('created_at', { ascending: false })
    .limit(3);

  if (projError) console.log("Gabim nga Supabase:", projError.message);

  const bgImage = settings?.hero_image_url || "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2070";

  return (
    <main className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative h-[85vh] flex items-center justify-center overflow-hidden">
        <div 
          className="absolute inset-0 z-0 bg-cover bg-center transition-transform duration-700 hover:scale-105"
          style={{ backgroundImage: `linear-gradient(to bottom, rgba(0,0,0,0.6), rgba(0,0,0,0.3)), url('${bgImage}')` }}
        ></div>
        <div className="relative z-10 text-center text-white px-6 max-w-4xl">
          <h1 className="text-5xl md:text-7xl font-black mb-6 tracking-tight uppercase drop-shadow-2xl">
            {settings?.hero_title || "Ventiluxe Fasada"}
          </h1>
          <p className="text-xl md:text-2xl mb-10 font-light opacity-90 leading-relaxed drop-shadow-lg">
            {settings?.hero_description || "Krijojmë fasada që kombinojnë estetikën moderne me efikasitetin energjetik."}
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/kontakt" className="bg-orange-600 hover:bg-orange-700 text-white px-10 py-4 rounded-full text-lg font-bold transition-all transform hover:scale-105 shadow-xl">
              NA KONTAKTONI
            </Link>
            <Link href="/portfolio" className="bg-white/10 hover:bg-white/20 backdrop-blur-md text-white border border-white/30 px-10 py-4 rounded-full text-lg font-bold transition-all shadow-lg">
              PROJEKTET TONA
            </Link>
          </div>
        </div>
      </section>

      {/* Seksioni i Shërbimeve */}
      <section className="py-24 px-10">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-12">
          <div className="group p-8 bg-gray-50 rounded-2xl hover:bg-orange-50 transition-colors border border-gray-100">
            <div className="text-4xl mb-6 group-hover:scale-110 transition-transform inline-block">💎</div>
            <h3 className="text-2xl font-bold mb-4 text-gray-900">Cilësi Premium</h3>
            <p className="text-gray-600 leading-relaxed">Përdorim materialet më të mira ndërkombëtare për fasada që zgjasin dekada.</p>
          </div>
          <div className="group p-8 bg-gray-50 rounded-2xl hover:bg-orange-50 transition-colors border border-gray-100">
            <div className="text-4xl mb-6 group-hover:scale-110 transition-transform inline-block">🌡️</div>
            <h3 className="text-2xl font-bold mb-4 text-gray-900">Izolim Termik</h3>
            <p className="text-gray-600 leading-relaxed">Fasadat tona ventiluese ulin deri në 40% koston e faturave të energjisë.</p>
          </div>
          <div className="group p-8 bg-gray-50 rounded-2xl hover:bg-orange-50 transition-colors border border-gray-100">
            <div className="text-4xl mb-6 group-hover:scale-110 transition-transform inline-block">✅</div>
            <h3 className="text-2xl font-bold mb-4 text-gray-900">Garanci 10 vjeçare</h3>
            <p className="text-gray-600 leading-relaxed">Çdo projekt mbulohet nga një garanci e plotë për punimet dhe materialet.</p>
          </div>
        </div>
      </section>

      {/* PIKA 3: SEKSIONI I STATISTIKAVE */}
      <section className="py-24 bg-gray-900 border-y border-gray-800">
        <div className="max-w-7xl mx-auto px-10 grid grid-cols-1 md:grid-cols-3 gap-16">
          <Counter end={50} label="Projekte të Përfunduara" />
          <Counter end={12} label="Vite Përvojë Pune" />
          <Counter end={100} label="Klientë të Kënaqur" />
        </div>
      </section>

      {/* SEKSIONI I PROJEKTEVE (Pika 2: Me efekt Hover) */}
      <section className="py-24 bg-gray-50 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-end mb-12">
            <div>
              <h2 className="text-4xl font-black text-gray-900 uppercase tracking-tight">Projektet e Fundit</h2>
              <div className="h-2 w-20 bg-orange-600 mt-4 rounded-full"></div>
            </div>
            <Link href="/portfolio" className="hidden md:block text-orange-600 font-bold hover:text-orange-700 transition-colors text-lg">
              SHIKO TË GJITHA →
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {projects?.map((project) => (
              <Link href={`/projekte/${project.id}`} 
                key={project.id} 
                className="bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-500 group cursor-pointer block"
              >
                <div className="h-80 overflow-hidden relative">
                  <img 
                    src={project.image_url} 
                    alt={project.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  
                  {/* OVERLAY I PIKËS 2 */}
                  <div className="absolute inset-0 bg-gradient-to-t from-orange-600/90 via-orange-600/20 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500 flex flex-col justify-end p-8">
                     <span className="text-white text-xs font-bold tracking-[0.3em] mb-2 translate-y-4 group-hover:translate-y-0 transition-transform duration-500 uppercase">Shiko Detajet</span>
                     <h4 className="text-white text-2xl font-black uppercase translate-y-4 group-hover:translate-y-0 transition-transform duration-700 delay-75">{project.name}</h4>
                  </div>

                  <div className="absolute top-4 left-4 bg-orange-600 text-white text-[10px] font-black px-3 py-1 rounded-full shadow-lg uppercase tracking-widest z-10">
                    Projekt i Ri
                  </div>
                </div>

                <div className="p-6">
                  <div className="flex items-center text-orange-600 text-xs font-black mb-2 uppercase tracking-tighter">
                    <span className="mr-2">📍</span> {project.location}
                  </div>
                  {/* <h3 className="text-xl font-bold text-gray-800 mb-3 group-hover:text-orange-600 transition-colors">
                    {project.name}
                  </h3> */}
                  <p className="text-gray-500 text-sm line-clamp-2 mb-4 leading-relaxed">
                    {project.description}
                  </p>
                  {/* <div className="flex items-center text-gray-900 text-xs font-black uppercase pt-1 group-hover:border-orange-200 transition-colors">
                    Lexo më shumë <span className="ml-2 group-hover:translate-x-2 transition-transform">→</span>
                  </div> */}
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* SEKSIONI I NJOFTIMEVE */}
      <section className="py-20 bg-orange-600">
        <div className="max-w-7xl mx-auto px-10 text-white">
          <div className="flex justify-between items-end mb-10 border-b border-orange-500 pb-6">
            <div>
              <h2 className="text-4xl font-black italic uppercase">📢 Njoftimet e Fundit</h2>
              <p className="opacity-80">Lajmet më të reja nga Ventiluxe Fasada</p>
            </div>
            <Link href="/njoftimet" className="font-bold border-b-2 border-white hover:opacity-70 transition-opacity pb-1">
              SHIKO TË GJITHA
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {announcements?.map((ann) => (
              <div key={ann.id} className="bg-white/10 backdrop-blur-sm p-6 rounded-2xl border border-white/20">
                <span className="text-[10px] font-black tracking-widest bg-white text-orange-600 px-2 py-1 rounded mb-4 inline-block">
                  {new Date(ann.created_at).toLocaleDateString()}
                </span>
                <p className="text-lg font-medium leading-relaxed italic line-clamp-3 italic">
                  "{ann.content}"
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}