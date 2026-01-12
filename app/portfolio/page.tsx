import { supabase } from '@/lib/supabase';
import Link from 'next/link';

export default async function PortfolioPage() {
  // Zëvendëso bllokun e marrjes së të dhënave me këtë:
const { data: projects, error } = await supabase
  .from('projects')
  // .order('created_at', { ascending: false }) // 'false' do të thotë: më i riu i pari
  .select('*')

   // 2. Marrim projektet më të fundit (vetëm 3 të parat)
  
  .order('created_at', { ascending: false }); // 'false' do të thotë: më i riu i pari

if (error) {
  console.log("Gabimi teknik:", error); // Kjo do të shfaqet në terminalin e VS Code
  return <div className="p-10 text-red-500">Gabimi: {error.message}</div>;
}

  return (
    <div className="min-h-screen bg-gray-50 py-16 px-6 md:px-12">
      <div className="max-w-7xl mx-auto">
        <header className="mb-12">
          <h1 className="text-4xl font-extrabold text-gray-900 border-b-4 border-orange-600 inline-block pb-2">
            PORTOFOLIO
          </h1>
          <p className="text-gray-600 mt-4 text-lg">
            Eksploroni punimet tona në fasada ventiluese dhe projekte rezidenciale.
          </p>
        </header>

        {/* Grid e Projekteve */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
  {projects?.map((project) => (
  <Link href={`/projekte/${project.id}`} 
    key={project.id} 
    className="bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-300 group cursor-pointer block"
  >
      {/* Fotoja */}
      <div className="h-64 overflow-hidden relative">
        <img 
          src={project.image_url} 
          alt={project.name}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
        />
        <div className="absolute top-4 left-4 bg-orange-600 text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg">
          PROJEKT
        </div>
      </div>

      {/* Detajet */}
      <div className="p-6">
        <h3 className="text-xl font-bold text-gray-800 mb-1 group-hover:text-orange-600 transition-colors">
          {project.name}
        </h3>
        <div className="flex items-center text-gray-500 text-sm mb-4">
          <span className="mr-1">📍</span> {project.location}
        </div>
        <p className="text-gray-600 text-sm line-clamp-3">
          {project.description}
        </p>
        
        {/* 2. Shtojmë një tregues vizual që projekti mund të lexohet i plotë */}
        <div className="mt-4 text-orange-600 text-xs font-bold uppercase tracking-wider flex items-center">
          Lexo më shumë <span className="ml-1 group-hover:translate-x-1 transition-transform">→</span>
        </div>
      </div>
    </Link>
  ))}
</div>
      </div>
    </div>
  );
}