import { useState, useEffect } from 'react';
import { Eye, Type, Contrast } from 'lucide-react';

export function AccessibilitySettings() {
  const [fontSize, setFontSize] = useState(16);
  const [highContrast, setHighContrast] = useState(false);

  useEffect(() => {
    const savedFontSize = localStorage.getItem('fontSize');
    const savedHighContrast = localStorage.getItem('highContrast');

    if (savedFontSize) setFontSize(parseInt(savedFontSize));
    if (savedHighContrast) setHighContrast(savedHighContrast === 'true');
  }, []);

  useEffect(() => {
    document.documentElement.style.setProperty('--font-size', `${fontSize}px`);
    localStorage.setItem('fontSize', fontSize.toString());
  }, [fontSize]);

  useEffect(() => {
    if (highContrast) {
      document.documentElement.classList.add('high-contrast');
    } else {
      document.documentElement.classList.remove('high-contrast');
    }
    localStorage.setItem('highContrast', highContrast.toString());
  }, [highContrast]);

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
      <div className="p-6 border-b border-gray-100">
        <div className="flex items-center gap-3 mb-2">
          <Eye className="w-6 h-6 text-primary" />
          <h2>Acessibilidade</h2>
        </div>
        <p className="text-sm text-gray-600">
          Ajuste as configurações para melhorar sua experiência
        </p>
      </div>

      <div className="p-6 space-y-6">
        <div>
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <Type className="w-5 h-5 text-gray-600" />
              <div>
                <p className="font-medium">Tamanho da Fonte</p>
                <p className="text-sm text-gray-600">Ajuste o tamanho do texto</p>
              </div>
            </div>
            <span className="text-primary font-medium">{fontSize}px</span>
          </div>

          <div className="flex items-center gap-4">
            <button
              onClick={() => setFontSize(Math.max(12, fontSize - 2))}
              className="px-4 py-2 bg-gray-100 rounded-lg hover:bg-gray-200"
              aria-label="Diminuir tamanho da fonte"
            >
              A-
            </button>
            <input
              type="range"
              min="12"
              max="24"
              step="2"
              value={fontSize}
              onChange={(e) => setFontSize(parseInt(e.target.value))}
              className="flex-1"
              aria-label="Controle de tamanho da fonte"
            />
            <button
              onClick={() => setFontSize(Math.min(24, fontSize + 2))}
              className="px-4 py-2 bg-gray-100 rounded-lg hover:bg-gray-200"
              aria-label="Aumentar tamanho da fonte"
            >
              A+
            </button>
          </div>

          <div className="mt-3 flex gap-2">
            <button
              onClick={() => setFontSize(14)}
              className={`px-4 py-2 rounded-lg ${fontSize === 14 ? 'bg-primary text-white' : 'bg-gray-100'}`}
            >
              Pequeno
            </button>
            <button
              onClick={() => setFontSize(16)}
              className={`px-4 py-2 rounded-lg ${fontSize === 16 ? 'bg-primary text-white' : 'bg-gray-100'}`}
            >
              Padrão
            </button>
            <button
              onClick={() => setFontSize(20)}
              className={`px-4 py-2 rounded-lg ${fontSize === 20 ? 'bg-primary text-white' : 'bg-gray-100'}`}
            >
              Grande
            </button>
          </div>
        </div>

        <div className="pt-6 border-t border-gray-100">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Contrast className="w-5 h-5 text-gray-600" />
              <div>
                <p className="font-medium">Alto Contraste</p>
                <p className="text-sm text-gray-600">Aumenta o contraste das cores</p>
              </div>
            </div>
            <button
              onClick={() => setHighContrast(!highContrast)}
              className={`relative w-14 h-8 rounded-full transition-colors ${
                highContrast ? 'bg-primary' : 'bg-gray-300'
              }`}
              role="switch"
              aria-checked={highContrast}
              aria-label="Alternar modo de alto contraste"
            >
              <div
                className={`absolute top-1 left-1 w-6 h-6 bg-white rounded-full transition-transform ${
                  highContrast ? 'translate-x-6' : 'translate-x-0'
                }`}
              />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
