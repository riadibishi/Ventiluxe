import Link from 'next/link';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 text-white pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          
          {/* Kolona 1: Rreth Nesh */}
          <div className="col-span-1 md:col-span-1">
            <h2 className="text-2xl font-black italic mb-6 tracking-tighter">
              VENTILUXE <span className="text-orange-600">FASADA</span>
            </h2>
            <p className="text-gray-400 leading-relaxed mb-6">
              Lider në projektimin dhe montimin e fasadave ventiluese, duke ofruar cilësi premium dhe izolim maksimal.
            </p>
          </div>

          {/* Kolona 2: Linqe të Shpejta */}
          <div>
            <h4 className="text-lg font-bold mb-6 border-b border-orange-600 inline-block">Linqe të Shpejta</h4>
            <ul className="space-y-4 text-gray-400">
              <li><Link href="/" className="hover:text-orange-600 transition">Ballina</Link></li>
              <li><Link href="/portfolio" className="hover:text-orange-600 transition">Projektet</Link></li>
              <li><Link href="/njoftimet" className="hover:text-orange-600 transition">Njoftimet</Link></li>
              <li><Link href="/kontakt" className="hover:text-orange-600 transition">Kontakti</Link></li>
            </ul>
          </div>

          {/* Kolona 3: Shërbimet */}
          <div>
            <h4 className="text-lg font-bold mb-6 border-b border-orange-600 inline-block">Shërbimet</h4>
            <ul className="space-y-4 text-gray-400">
              <li>Fasada Ventiluese</li>
              <li>Izolim Termik</li>
              <li>Panele Alubond</li>
              <li>Kualitet Premium</li>
            </ul>
          </div>

          {/* Kolona 4: Kontakt */}
          <div>
            <h4 className="text-lg font-bold mb-6 border-b border-orange-600 inline-block">Na Gjeni</h4>
            <ul className="space-y-4 text-gray-400">
              <li className="flex items-center gap-3">
                <span className="text-orange-600 text-xl">📍</span> Kumanovë / Maqedoni e Veriut
              </li>
              <li className="flex items-center gap-3">
                <span className="text-orange-600 text-xl">📞</span> +389 70 123 456
              </li>
              <li className="flex items-center gap-3">
                <span className="text-orange-600 text-xl">✉️</span> info@ventiluxe-fasada.com
              </li>
            </ul>
          </div>
        </div>

        {/* Shiriti i Fundit */}
        <div className="border-t border-gray-800 pt-8 mt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-gray-500 text-sm">
            © {currentYear} Ventiluxe Fasada. Të gjitha të drejtat e rezervuara.
          </p>
          
          <p className="text-gray-500 text-sm">
            © Punuar nga <a href="https://www.facebook.com/Riad.Ibishii" className="hover:text-orange-600 transition">Riad Ibishi</a>.
          </p>
          <div className="flex gap-6 text-gray-500 text-xl">
            <a href="#" className="hover:text-orange-600 transition">Facebook</a>
            <a href="#" className="hover:text-orange-600 transition">Instagram</a>
            <a href="#" className="hover:text-orange-600 transition">LinkedIn</a>
          </div>
        </div>
      </div>
    </footer>
  );
}