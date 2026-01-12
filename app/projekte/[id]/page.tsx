export const revalidate = 0;

import { supabase } from '@/lib/supabase';
import { notFound } from 'next/navigation';
import Link from 'next/link';

export default async function ProjectPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  // Tërheqim projektin nga Supabase
  const { data: project, error } = await supabase
    .from('projects')
    .select('*')
    .eq('id', id)
    .single();

  if (error || !project) return notFound();

  // 1. Marrim fotot nga kolona 'gallery'
  // Sigurohemi që nëse galeria është bosh ose null, të përdoret fotoja kryesore
  const projectGallery = project.gallery && project.gallery.length > 0 
    ? project.gallery 
    : [project.image_url];

  return (
    <main className="min-h-screen bg-white">
      {/* Hero Section me efekt Parallax-like */}
      <section className="relative h-[70vh] flex items-end pb-20 px-6 md:px-20">
        <div 
          className="absolute inset-0 z-0 bg-cover bg-center bg-fixed"
          style={{ 
            backgroundImage: `linear-gradient(to top, rgba(0,0,0,0.85), rgba(0,0,0,0.2)), url('${project.image_url}')` 
          }}
        ></div>
        
        <div className="relative z-10 max-w-7xl mx-auto w-full">
          <Link href="/portfolio" className="bg-orange-600 text-white px-6 py-2 rounded-full text-xs font-black tracking-widest mb-8 inline-flex items-center gap-2 hover:bg-white hover:text-orange-600 transition-all shadow-xl">
            ← KTHEHU TE PORTFOLIO
          </Link>
          <h1 className="text-5xl md:text-8xl font-black text-white uppercase italic tracking-tighter leading-[0.9]">
            {project.name}
          </h1>
          <div className="flex items-center gap-4 mt-6">
             <span className="h-[2px] w-12 bg-orange-600"></span>
             <p className="text-orange-500 text-xl font-bold uppercase tracking-widest">📍 {project.location}</p>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-6 md:px-20 py-24">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-20">
          
          {/* Kolona 1: Detajet e Projektit */}
          <div className="lg:col-span-1">
            <div className="sticky top-32 space-y-10">
              <div>
                <h2 className="text-[px] font-black text-orange-600 uppercase tracking-[0.4em] mb-4">Përshkrimi</h2>
                <p className="text-gray-700 text-l leading-relaxed font-medium italic border-l-4 border-orange-600 pl-6">
                  "{project.description}"
                </p>
              </div>
              
              <div className="space-y-6 pt-10 border-t border-gray-100">
                <div className="flex flex-col">
                  <span className="text-[10px] font-black text-gray-400 uppercase mb-1">Lokacioni</span>
                  <span className="text-lg font-bold text-gray-900">{project.location}</span>
                </div>
                <div className="flex flex-col">
                  <span className="text-[10px] font-black text-gray-400 uppercase mb-1">Kategoria</span>
                  <span className="text-lg font-bold text-gray-900">Fasada Moderne Ventiluese</span>
                </div>
              </div>
            </div>
          </div>

          {/* Kolona 2 & 3: Galeria e Punimeve (Grid Moderne) */}
          <div className="lg:col-span-2">
            <div className="flex items-center justify-between mb-12">
               <h3 className="text-3xl font-black uppercase italic tracking-tighter text-gray-900">Galeria e Detajeve</h3>
               <span className="text-orange-600 font-bold text-sm italic">{projectGallery.length} Foto</span>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {projectGallery.map((imgUrl: string, index: number) => (
                <div 
                  key={index} 
                  className={`group relative overflow-hidden rounded-3xl bg-gray-50 shadow-sm hover:shadow-2xl transition-all duration-500 ${
                    index % 3 === 0 ? 'md:col-span-2 h-[550px]' : 'h-[400px]'
                  }`}
                >
                  <img 
                    src={imgUrl} 
                    alt={`${project.name} - detaji ${index + 1}`}
                    className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                  />
                  {/* Overlay elegant në hover */}
                  <div className="absolute inset-0  opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  <div className="absolute bottom-6 left-6 bg-white/90 backdrop-blur-md px-4 py-2 rounded-xl opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500">
                     <span className="text-orange-600 font-black text-[10px] uppercase tracking-widest">Ventiluxe Detaj {index + 1}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </main>
  );
}