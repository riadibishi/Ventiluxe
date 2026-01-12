"use client";
import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import { useRouter } from 'next/navigation';

export default function AdminDashboard() {
  const [messages, setMessages] = useState<any[]>([]);
  const [allProjects, setAllProjects] = useState<any[]>([]);
  const [allAnnouncements, setAllAnnouncements] = useState<any[]>([]);
  const [newAnnContent, setNewAnnContent] = useState('');
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const router = useRouter();

  // STATE PËR EDITIMIN
  const [editingProject, setEditingProject] = useState<any>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // State për projektin e ri
  const [pName, setPName] = useState('');
  const [pLocation, setPLocation] = useState('');
  const [pDescription, setPDescription] = useState('');
  const [featuredFile, setFeaturedFile] = useState<File | null>(null);
  const [galleryFiles, setGalleryFiles] = useState<FileList | null>(null);

  useEffect(() => {
    const checkUser = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        router.replace('/login');
      } else {
        fetchInitialData();
      }
    };
    checkUser();
  }, [router]);

  async function fetchInitialData() {
    const { data: msgData } = await supabase.from('messages').select('*').order('created_at', { ascending: false });
    if (msgData) setMessages(msgData);

    const { data: projData } = await supabase.from('projects').select('*').order('created_at', { ascending: false });
    if (projData) setAllProjects(projData);

    const { data: annData } = await supabase.from('announcements').select('*').order('created_at', { ascending: false });
    if (annData) setAllAnnouncements(annData);

    setLoading(false);
  }

  // FUNKSIONI PËR TË RUAJTUR NDRYSHIMET (UPDATE)
  async function handleUpdateProject(e: React.FormEvent) {
    e.preventDefault();
    setUploading(true);

    const { error } = await supabase
      .from('projects')
      .update({
        name: editingProject.name,
        location: editingProject.location,
        description: editingProject.description,
      })
      .eq('id', editingProject.id);

    if (error) {
      alert("Gabim gjatë përditësimit: " + error.message);
    } else {
      alert("Projekti u përditësua!");
      setIsModalOpen(false);
      fetchInitialData();
    }
    setUploading(false);
  }

  // FUNKSIONET EKZISTUESE (Njoftimet, Upload, etj.)
  async function handleAddAnnouncement(e: React.FormEvent) {
    e.preventDefault();
    if (!newAnnContent.trim()) return;
    const { error } = await supabase.from('announcements').insert([{ content: newAnnContent, is_active: true }]);
    if (error) alert(error.message);
    else { setNewAnnContent(''); fetchInitialData(); }
  }

  async function deleteAnnouncement(id: string) {
    if (confirm("Fshij njoftimin?")) {
      await supabase.from('announcements').delete().eq('id', id);
      fetchInitialData();
    }
  }

  async function uploadImage(file: File) {
    const fileExt = file.name.split('.').pop();
    const fileName = `${Math.random()}.${fileExt}`;
    const filePath = `projects/${fileName}`;
    const { error: uploadError } = await supabase.storage.from('project-images').upload(filePath, file);
    if (uploadError) throw uploadError;
    const { data } = supabase.storage.from('project-images').getPublicUrl(filePath);
    return data.publicUrl;
  }

  async function addProject(e: React.FormEvent) {
    e.preventDefault();
    setUploading(true);
    try {
      let mainImageUrl = "";
      if (featuredFile) mainImageUrl = await uploadImage(featuredFile);
      const galleryUrls: string[] = [];
      if (galleryFiles) {
        for (let i = 0; i < galleryFiles.length; i++) {
          const url = await uploadImage(galleryFiles[i]);
          galleryUrls.push(url);
        }
      }
      const { error } = await supabase.from('projects').insert([{ 
        name: pName, location: pLocation, image_url: mainImageUrl, gallery: galleryUrls, description: pDescription 
      }]);
      if (error) throw error;
      alert("Projekti u shtua!");
      fetchInitialData();
    } catch (err: any) { alert(err.message); }
    finally { setUploading(false); }
  }

  async function deleteProject(id: string) {
    if (confirm("A jeni i sigurt?")) {
      const { error } = await supabase.from('projects').delete().eq('id', id);
      if (error) alert(error.message);
      else fetchInitialData();
    }
  }

  if (loading) return <div className="p-10 text-center font-bold">Duke u ngarkuar...</div>;


  async function deleteMessage(id: string) {
  if (confirm("A jeni i sigurt që dëshironi ta fshini këtë mesazh?")) {
    const { error } = await supabase.from('messages').delete().eq('id', id);
    if (error) {
      alert(error.message);
    } else {
      setMessages(prev => prev.filter(m => m.id !== id));
    }
  }
}
  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-10 text-gray-800">
      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* KOLONA MAJTAS: NJOFTIMET & MESAZHET */}
        <div className="lg:col-span-1 space-y-6">
          <section className="bg-white p-6 rounded-2xl shadow-sm border">
            <h2 className="font-bold mb-4 italic">📣 Posto Njoftim</h2>
            <form onSubmit={handleAddAnnouncement} className="space-y-3">
              <textarea placeholder="Njoftimi i ri..." className="w-full p-2 border rounded-lg text-sm" rows={3} value={newAnnContent} onChange={(e) => setNewAnnContent(e.target.value)} required />
              <button type="submit" className="w-full bg-orange-600 text-white py-2 rounded-lg font-bold">POSTO</button>
            </form>
            <div className="mt-6 pt-6 border-t space-y-2">
              {allAnnouncements.map(ann => (
                <div key={ann.id} className="flex justify-between items-start p-2 bg-gray-50 rounded-lg border text-xs group">
                  <span className="italic line-clamp-2">"{ann.content}"</span>
                  <button onClick={() => deleteAnnouncement(ann.id)} className="text-red-500">🗑️</button>
                </div>
              ))}
            </div>
          </section>

          <section className="bg-white p-6 rounded-2xl shadow-sm border">
            <h2 className="font-bold mb-6 italic">📩 Mesazhet ({messages.length})</h2>
            <div className="space-y-4 max-h-[400px] overflow-y-auto">
              {messages.map((msg) => (
                <div key={msg.id} className={`p-4 border rounded-xl ${msg.is_read ? 'opacity-60' : 'bg-orange-50 border-orange-100'}`}>
                  <p className="font-bold text-xs">{msg.full_name}</p>
                  <p className="text-gray-600 text-xs italic">"{msg.message}"</p>
                  <button onClick={() => deleteMessage(msg.id)} className="text-[10px] text-red-500 font-bold mt-2">🗑️ FSHIJ</button>
                </div>
              ))}
            </div>
          </section>
        </div>

        {/* KOLONA DJATHTAS: PROJEKTET */}
        <div className="lg:col-span-2 space-y-6">
          <section className="bg-white p-6 rounded-2xl shadow-sm border">
            <h2 className="font-bold mb-4 italic">🏗️ Shto Projekt të Ri</h2>
            <form onSubmit={addProject} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <input type="text" placeholder="Emri" className="p-2 border rounded-lg text-sm" value={pName} onChange={e => setPName(e.target.value)} required />
                <input type="text" placeholder="Lokacioni" className="p-2 border rounded-lg text-sm" value={pLocation} onChange={e => setPLocation(e.target.value)} required />
              </div>
              <textarea placeholder="Përshkrimi..." className="w-full p-2 border rounded-lg text-sm" value={pDescription} onChange={e => setPDescription(e.target.value)} rows={3} />
              <div className="grid grid-cols-2 gap-4 text-[10px]">
                <label className="block">FOTO KRYESORE<input type="file" onChange={e => setFeaturedFile(e.target.files?.[0] || null)} className="w-full mt-1" /></label>
                <label className="block">GALERIA<input type="file" multiple onChange={e => setGalleryFiles(e.target.files)} className="w-full mt-1" /></label>
              </div>
              <button disabled={uploading} className="w-full py-2 rounded-lg font-bold text-white bg-blue-600">
                {uploading ? 'DUKE U NGARKUAR...' : 'RUAJ PROJEKTIN'}
              </button>
            </form>

            <div className="mt-10 pt-6 border-t">
              <h3 className="text-xs font-bold text-gray-400 uppercase mb-4 tracking-widest">Menaxho Projektet ({allProjects.length})</h3>
              <div className="grid grid-cols-1 gap-2">
                {allProjects.map(proj => (
                  <div key={proj.id} className="flex justify-between items-center p-3 bg-gray-50 rounded-xl border group">
                    <div className="flex items-center gap-3">
                      <img src={proj.image_url} className="w-10 h-10 object-cover rounded-lg" alt="" />
                      <span className="font-bold text-sm">{proj.name}</span>
                    </div>
                    <div className="flex gap-2">
                      <button 
                        onClick={() => { setEditingProject(proj); setIsModalOpen(true); }}
                        className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                      >
                        ✏️ Edit
                      </button>
                      <button onClick={() => deleteProject(proj.id)} className="p-2 text-red-500 hover:bg-red-50 rounded-lg">
                        🗑️
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        </div>
      </div>

      {/* MODAL PËR EDITIMIN E PROJEKTIT */}
      {isModalOpen && editingProject && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl w-full max-w-lg shadow-2xl overflow-hidden">
            <div className="bg-orange-600 p-4 text-white flex justify-between items-center">
              <h2 className="font-bold uppercase tracking-widest">Editoni Projektin</h2>
              <button onClick={() => setIsModalOpen(false)} className="text-xl">✕</button>
            </div>
            <form onSubmit={handleUpdateProject} className="p-6 space-y-4">
              <input 
                className="w-full p-2 border rounded-lg" 
                value={editingProject.name} 
                onChange={e => setEditingProject({...editingProject, name: e.target.value})} 
                placeholder="Emri i projektit"
              />
              <input 
                className="w-full p-2 border rounded-lg" 
                value={editingProject.location} 
                onChange={e => setEditingProject({...editingProject, location: e.target.value})} 
                placeholder="Lokacioni"
              />
              <textarea 
                className="w-full p-2 border rounded-lg" 
                rows={5}
                value={editingProject.description} 
                onChange={e => setEditingProject({...editingProject, description: e.target.value})} 
                placeholder="Përshkrimi"
              />
              <div className="flex gap-2 pt-2">
                <button type="submit" disabled={uploading} className="flex-1 bg-orange-600 text-white py-3 rounded-xl font-bold">
                  {uploading ? 'Duke u ruajtur...' : 'RUAJ NDRYSHIMET'}
                </button>
                <button type="button" onClick={() => setIsModalOpen(false)} className="px-6 bg-gray-100 rounded-xl font-bold">Anulo</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}