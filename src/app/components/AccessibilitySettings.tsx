import { useState, useEffect } from 'react';
import { Eye, Type, Contrast, Moon, Check } from 'lucide-react';

type ColorblindMode = 'none' | 'deuteranopia' | 'protanopia' | 'tritanopia';

const COLORBLIND_OPTIONS: {
  id: ColorblindMode;
  label: string;
  description: string;
  swatches: string[];
}[] = [
  {
    id: 'none',
    label: 'Padrão',
    description: 'Cores originais do ArenaPass',
    swatches: ['#1E7F43', '#F5C518', '#f39c12'],
  },
  {
    id: 'deuteranopia',
    label: 'Deuteranopia',
    description: 'Verde/vermelho — mais comum',
    swatches: ['#004d99', '#4db8ff', '#e68a00'],
  },
  {
    id: 'protanopia',
    label: 'Protanopia',
    description: 'Cones vermelhos ausentes',
    swatches: ['#005588', '#55aaff', '#ddaa00'],
  },
  {
    id: 'tritanopia',
    label: 'Tritanopia',
    description: 'Azul/amarelo',
    swatches: ['#994400', '#ff8833', '#cc0044'],
  },
];

export function AccessibilitySettings() {
  const [fontSize, setFontSize] = useState(16);
  const [highContrast, setHighContrast] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [colorblind, setColorblindState] = useState<ColorblindMode>('none');

  useEffect(() => {
    const savedFontSize = localStorage.getItem('fontSize');
    const savedHighContrast = localStorage.getItem('highContrast');
    const savedDarkMode = localStorage.getItem('darkMode');
    const savedColorblind = localStorage.getItem('colorblind') as ColorblindMode | null;

    if (savedFontSize) setFontSize(parseInt(savedFontSize));
    if (savedHighContrast) setHighContrast(savedHighContrast === 'true');
    if (savedDarkMode) setDarkMode(savedDarkMode === 'true');
    if (savedColorblind) setColorblindState(savedColorblind);
  }, []);

  useEffect(() => {
    document.documentElement.style.setProperty('--font-size', `${fontSize}px`);
    localStorage.setItem('fontSize', fontSize.toString());
  }, [fontSize]);

  useEffect(() => {
    document.documentElement.classList.toggle('high-contrast', highContrast);
    localStorage.setItem('highContrast', highContrast.toString());
  }, [highContrast]);

  useEffect(() => {
    document.documentElement.classList.toggle('dark', darkMode);
    localStorage.setItem('darkMode', darkMode.toString());
  }, [darkMode]);

  useEffect(() => {
    const root = document.documentElement;
    if (colorblind === 'none') {
      root.removeAttribute('data-colorblind');
    } else {
      root.setAttribute('data-colorblind', colorblind);
    }
    localStorage.setItem('colorblind', colorblind);
  }, [colorblind]);

  function setColorblind(mode: ColorblindMode) {
    setColorblindState(mode);
  }

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

        {/* Tema Escuro */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Moon className="w-5 h-5 text-gray-600" />
            <div>
              <p className="font-medium">Tema Escuro</p>
              <p className="text-sm text-gray-600">Reduz o brilho da tela</p>
            </div>
          </div>
          <button
            onClick={() => setDarkMode(!darkMode)}
            className={`relative w-14 h-8 rounded-full transition-colors ${darkMode ? 'bg-primary' : 'bg-gray-300'}`}
            role="switch"
            aria-checked={darkMode}
            aria-label="Alternar tema escuro"
          >
            <div className={`absolute top-1 left-1 w-6 h-6 bg-white rounded-full transition-transform ${darkMode ? 'translate-x-6' : 'translate-x-0'}`} />
          </button>
        </div>

        {/* Alto Contraste */}
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
              className={`relative w-14 h-8 rounded-full transition-colors ${highContrast ? 'bg-primary' : 'bg-gray-300'}`}
              role="switch"
              aria-checked={highContrast}
              aria-label="Alternar modo de alto contraste"
            >
              <div className={`absolute top-1 left-1 w-6 h-6 bg-white rounded-full transition-transform ${highContrast ? 'translate-x-6' : 'translate-x-0'}`} />
            </button>
          </div>
        </div>

        {/* Tamanho da Fonte */}
        <div className="pt-6 border-t border-gray-100">
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
              className="px-4 py-2 bg-gray-100 rounded-lg hover:bg-gray-200 cursor-pointer"
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
              aria-valuemin={12}
              aria-valuemax={24}
              aria-valuenow={fontSize}
              aria-valuetext={`${fontSize} pixels`}
            />
            <button
              onClick={() => setFontSize(Math.min(24, fontSize + 2))}
              className="px-4 py-2 bg-gray-100 rounded-lg hover:bg-gray-200 cursor-pointer"
              aria-label="Aumentar tamanho da fonte"
            >
              A+
            </button>
          </div>

          <div className="mt-3 flex gap-2">
            {([14, 16, 20] as const).map((size, i) => (
              <button
                key={size}
                onClick={() => setFontSize(size)}
                className={`px-4 py-2 rounded-lg transition-colors cursor-pointer ${fontSize === size ? 'bg-primary text-white hover:bg-primary/90' : 'bg-gray-100 hover:bg-gray-200'}`}
                aria-pressed={fontSize === size}
              >
                {['Pequeno', 'Padrão', 'Grande'][i]}
              </button>
            ))}
          </div>
        </div>

        {/* Modo Daltônico */}
        <div className="pt-6 border-t border-gray-100">
          <div className="flex items-center gap-3 mb-1">
            <Eye className="w-5 h-5 text-gray-600" />
            <p className="font-medium">Modo Daltônico</p>
          </div>
          <p className="text-sm text-gray-600 mb-4 ml-8">
            Adapta as cores para diferentes tipos de daltonismo
          </p>

          <div className="grid grid-cols-2 gap-2">
            {COLORBLIND_OPTIONS.map((opt) => {
              const isSelected = colorblind === opt.id;
              return (
                <button
                  key={opt.id}
                  onClick={() => setColorblind(opt.id)}
                  role="radio"
                  aria-checked={isSelected}
                  aria-label={`${opt.label}: ${opt.description}`}
                  className={`text-left p-3 rounded-xl border-2 transition-all cursor-pointer ${
                    isSelected
                      ? 'border-primary bg-primary/5'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex gap-1">
                      {opt.swatches.map((color) => (
                        <span
                          key={color}
                          className="w-4 h-4 rounded-full inline-block"
                          style={{ backgroundColor: color }}
                        />
                      ))}
                    </div>
                    {isSelected && (
                      <div className="w-5 h-5 bg-primary rounded-full flex items-center justify-center shrink-0">
                        <Check className="w-3 h-3 text-white" />
                      </div>
                    )}
                  </div>
                  <p className="font-medium text-sm leading-tight">{opt.label}</p>
                  <p className="text-xs text-gray-500 leading-tight mt-0.5">{opt.description}</p>
                </button>
              );
            })}
          </div>
        </div>

      </div>
    </div>
  );
}
