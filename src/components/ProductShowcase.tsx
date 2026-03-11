import ColorHover from './ColorHover';
import { colors } from '../lib/colors';

interface ProductShowcaseProps {
  onOrderClick: () => void;
}

export default function ProductShowcase({ onOrderClick }: ProductShowcaseProps) {
  return (
    <section className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-amber-100 flex items-center justify-center px-4 py-12">
      <div className="max-w-6xl w-full">
        <div className="text-center mb-12">
          <h1 className="text-5xl md:text-7xl font-bold text-amber-900 mb-2 tracking-tight">
            Sophie Scarf
          </h1>
          <p className="text-lg md:text-xl text-amber-700 italic mb-4">
            made by Laura
          </p>
          <p className="text-xl md:text-2xl text-amber-800 font-light">
            Zeitlose Eleganz für jeden Tag
          </p>
        </div>

        <div className="bg-white rounded-3xl shadow-2xl overflow-hidden">
          <div className="grid md:grid-cols-2 gap-0">
            <div className="bg-gradient-to-br from-amber-100 to-orange-100 p-12 flex items-center justify-center">
              <div className="w-full max-w-md aspect-square rounded-2xl shadow-xl overflow-hidden">
                <img
                  src="/sophie-scarf4.jpg"
                  alt="Sophie Scarf"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

            <div className="p-8 md:p-12 flex flex-col justify-center">
              <div className="mb-8">
                <h2 className="text-3xl font-semibold text-amber-900 mb-4">
                  Premium Qualität
                </h2>
                <p className="text-lg text-amber-800 leading-relaxed mb-6">
                  Der Sophie Scarf vereint höchste Qualität mit zeitlosem Design.
                  Perfekt für jede Jahreszeit und jeden Anlass.
                </p>

                <div className="mb-8">
                  <h3 className="text-sm font-semibold text-amber-900 mb-3">Verfügbare Farben:</h3>
                  <div className="flex gap-3 flex-wrap justify-center md:justify-start">
                    {colors.map((color) => (
                      <ColorHover key={color.value} color={color}>
                        <div className="flex flex-col items-center gap-1 cursor-pointer">
                          <div
                            className="w-12 h-12 rounded-full border-2 border-amber-200 shadow-md hover:scale-110 transition-transform"
                            style={{ backgroundColor: color.hex }}
                            title={`${color.label} (${color.colorCode})`}
                          ></div>
                          <span className="text-xs text-amber-700">{color.label}</span>
                        </div>
                      </ColorHover>
                    ))}
                  </div>
                </div>

                <div className="space-y-3 mb-8">
                  <div className="flex items-center text-amber-800">
                    <div className="w-2 h-2 bg-amber-600 rounded-full mr-3"></div>
                    <span>Premium Merino-Wolle von Lana Grossa</span>
                  </div>
                  <div className="flex items-center text-amber-800">
                    <div className="w-2 h-2 bg-amber-600 rounded-full mr-3"></div>
                    <span>5 wunderschöne Farben zur Auswahl</span>
                  </div>
                  <div className="flex items-center text-amber-800">
                    <div className="w-2 h-2 bg-amber-600 rounded-full mr-3"></div>
                    <span>2 Grössen verfügbar: Small & Regular</span>
                  </div>
                  <div className="flex items-center text-amber-800">
                    <div className="w-2 h-2 bg-amber-600 rounded-full mr-3"></div>
                    <span>Handgefertigt mit Liebe</span>
                  </div>
                  <div className="flex items-center text-amber-800">
                    <div className="w-2 h-2 bg-amber-600 rounded-full mr-3"></div>
                    <span>Lieferung nach Vereinbarung</span>
                  </div>
                </div>

                <div className="bg-amber-50 rounded-xl p-6 mb-8 border border-amber-200">
                  <div className="space-y-2">
                    <div className="flex items-baseline justify-between">
                      <span className="text-amber-700">Sophie Scarf</span>
                      <span className="text-xl font-semibold text-amber-900">ab CHF 44.–</span>
                    </div>
                    <div className="flex items-baseline justify-between text-sm">
                      <span className="text-amber-700">Lieferung</span>
                      <span className="font-medium text-amber-900">CHF 7.–</span>
                    </div>
                    <div className="border-t border-amber-200 pt-3 mt-3 flex items-baseline justify-between">
                      <span className="text-lg font-semibold text-amber-900">Total</span>
                      <span className="text-3xl font-bold text-amber-900">ab CHF 51.–</span>
                    </div>
                  </div>
                </div>

                <button
                  onClick={onOrderClick}
                  className="w-full bg-amber-700 hover:bg-amber-800 text-white font-semibold py-4 px-8 rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
                >
                  Jetzt bestellen
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-8 text-center">
          <p className="text-amber-700 text-sm">
            Bezahlung via Twint erfolgt nach Bestellbestätigung
          </p>
        </div>
      </div>
    </section>
  );
}
