import { useState } from 'react';
import { X, Check } from 'lucide-react';
import ColorHover from './ColorHover';
import { colors, sizes, DELIVERY_COST, type ScarfSize } from '../lib/colors';

interface OrderFormProps {
  onClose: () => void;
  onSubmit: (orderData: OrderFormData) => void;
}

export interface OrderFormData {
  customer_name: string;
  customer_email: string;
  customer_phone: string;
  delivery_street: string;
  delivery_postal_code: string;
  delivery_city: string;
  scarf_color: 'kornblumen-blau' | 'rose' | 'grau-braun' | 'kitt' | 'himbeer';
  scarf_size: ScarfSize;
}

export default function OrderForm({ onClose, onSubmit }: OrderFormProps) {
  const [formData, setFormData] = useState<OrderFormData>({
    customer_name: '',
    customer_email: '',
    customer_phone: '',
    delivery_street: '',
    delivery_postal_code: '',
    delivery_city: '',
    scarf_color: 'kornblumen-blau',
    scarf_size: 'regular',
  });

  const selectedSize = sizes.find(s => s.value === formData.scarf_size) || sizes[1];
  const totalPrice = selectedSize.price + DELIVERY_COST;

  const [errors, setErrors] = useState<Partial<Record<keyof OrderFormData, string>>>({});

  const validateForm = () => {
    const newErrors: Partial<Record<keyof OrderFormData, string>> = {};

    if (!formData.customer_name.trim()) {
      newErrors.customer_name = 'Name ist erforderlich';
    }
    if (!formData.customer_email.trim() || !formData.customer_email.includes('@')) {
      newErrors.customer_email = 'Gültige E-Mail ist erforderlich';
    }
    if (!formData.customer_phone.trim()) {
      newErrors.customer_phone = 'Telefonnummer ist erforderlich';
    }
    if (!formData.delivery_street.trim()) {
      newErrors.delivery_street = 'Strasse ist erforderlich';
    }
    if (!formData.delivery_postal_code.trim()) {
      newErrors.delivery_postal_code = 'PLZ ist erforderlich';
    }
    if (!formData.delivery_city.trim()) {
      newErrors.delivery_city = 'Ort ist erforderlich';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      onSubmit(formData);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-start justify-center p-4 z-50 overflow-y-auto py-8">
      <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full my-8">
        <div className="p-6 border-b border-amber-200 bg-gradient-to-r from-amber-50 to-orange-50 flex items-center justify-between">
          <h2 className="text-2xl font-bold text-amber-900">Bestellung aufgeben</h2>
          <button
            onClick={onClose}
            className="text-amber-600 hover:text-amber-800 transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6">
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold text-amber-900 mb-4">Kontaktdaten</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-amber-800 mb-1">
                    Name *
                  </label>
                  <input
                    type="text"
                    value={formData.customer_name}
                    onChange={(e) => setFormData({ ...formData, customer_name: e.target.value })}
                    className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-amber-700 focus:border-transparent ${
                      errors.customer_name ? 'border-red-500' : 'border-amber-300'
                    }`}
                    placeholder="Ihr vollständiger Name"
                  />
                  {errors.customer_name && (
                    <p className="text-red-500 text-sm mt-1">{errors.customer_name}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-amber-800 mb-1">
                    E-Mail *
                  </label>
                  <input
                    type="email"
                    value={formData.customer_email}
                    onChange={(e) => setFormData({ ...formData, customer_email: e.target.value })}
                    className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-amber-700 focus:border-transparent ${
                      errors.customer_email ? 'border-red-500' : 'border-amber-300'
                    }`}
                    placeholder="ihre.email@beispiel.ch"
                  />
                  {errors.customer_email && (
                    <p className="text-red-500 text-sm mt-1">{errors.customer_email}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-amber-800 mb-1">
                    Telefon *
                  </label>
                  <input
                    type="tel"
                    value={formData.customer_phone}
                    onChange={(e) => setFormData({ ...formData, customer_phone: e.target.value })}
                    className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-amber-700 focus:border-transparent ${
                      errors.customer_phone ? 'border-red-500' : 'border-amber-300'
                    }`}
                    placeholder="+41 79 123 45 67"
                  />
                  {errors.customer_phone && (
                    <p className="text-red-500 text-sm mt-1">{errors.customer_phone}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-amber-800 mb-2">
                    Farbauswahl *
                  </label>
                  <div className="grid grid-cols-5 gap-3">
                    {colors.map((color) => (
                      <ColorHover key={color.value} color={color}>
                        <button
                          type="button"
                          onClick={() => setFormData({ ...formData, scarf_color: color.value })}
                          className={`relative rounded-xl p-4 transition-all duration-200 ${
                            formData.scarf_color === color.value
                              ? 'ring-4 ring-amber-700 ring-offset-2'
                              : 'hover:scale-105'
                          }`}
                          style={{ backgroundColor: color.hex }}
                        >
                          {formData.scarf_color === color.value && (
                            <div className="absolute inset-0 flex items-center justify-center">
                              <Check className="w-8 h-8 text-white drop-shadow-lg" strokeWidth={3} />
                            </div>
                          )}
                          <span className="sr-only">{color.label}</span>
                        </button>
                      </ColorHover>
                    ))}
                  </div>
                  <div className="mt-2 text-center">
                    <span className="text-sm font-medium text-amber-800">
                      Ausgewählt: {colors.find(c => c.value === formData.scarf_color)?.label} ({colors.find(c => c.value === formData.scarf_color)?.colorCode})
                    </span>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-amber-800 mb-2">
                    Grösse *
                  </label>
                  <div className="grid grid-cols-2 gap-4">
                    {sizes.map((size) => (
                      <button
                        key={size.value}
                        type="button"
                        onClick={() => setFormData({ ...formData, scarf_size: size.value })}
                        className={`relative rounded-xl p-4 transition-all duration-200 border-2 ${
                          formData.scarf_size === size.value
                            ? 'border-amber-700 bg-amber-50'
                            : 'border-amber-200 hover:border-amber-400 bg-white'
                        }`}
                      >
                        <div className="flex items-center justify-between mb-2">
                          <span className="font-semibold text-amber-900">{size.label}</span>
                          {formData.scarf_size === size.value && (
                            <Check className="w-5 h-5 text-amber-700" strokeWidth={3} />
                          )}
                        </div>
                        <p className="text-sm text-amber-700 mb-1">{size.description}</p>
                        <p className="text-lg font-bold text-amber-900">CHF {size.price}.–</p>
                      </button>
                    ))}
                  </div>
                  <p className="mt-2 text-xs text-amber-600 text-center">
                    Das Produktbild zeigt die Regular-Grösse
                  </p>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-amber-900 mb-4">Lieferadresse</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-amber-800 mb-1">
                    Strasse und Hausnummer *
                  </label>
                  <input
                    type="text"
                    value={formData.delivery_street}
                    onChange={(e) => setFormData({ ...formData, delivery_street: e.target.value })}
                    className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-amber-700 focus:border-transparent ${
                      errors.delivery_street ? 'border-red-500' : 'border-amber-300'
                    }`}
                    placeholder="Musterstrasse 123"
                  />
                  {errors.delivery_street && (
                    <p className="text-red-500 text-sm mt-1">{errors.delivery_street}</p>
                  )}
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-amber-800 mb-1">
                      PLZ *
                    </label>
                    <input
                      type="text"
                      value={formData.delivery_postal_code}
                      onChange={(e) => setFormData({ ...formData, delivery_postal_code: e.target.value })}
                      className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-amber-700 focus:border-transparent ${
                        errors.delivery_postal_code ? 'border-red-500' : 'border-amber-300'
                      }`}
                      placeholder="8000"
                    />
                    {errors.delivery_postal_code && (
                      <p className="text-red-500 text-sm mt-1">{errors.delivery_postal_code}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-amber-800 mb-1">
                      Ort *
                    </label>
                    <input
                      type="text"
                      value={formData.delivery_city}
                      onChange={(e) => setFormData({ ...formData, delivery_city: e.target.value })}
                      className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-amber-700 focus:border-transparent ${
                        errors.delivery_city ? 'border-red-500' : 'border-amber-300'
                      }`}
                      placeholder="Zürich"
                    />
                    {errors.delivery_city && (
                      <p className="text-red-500 text-sm mt-1">{errors.delivery_city}</p>
                    )}
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-amber-50 rounded-xl p-6 border border-amber-200">
              <div className="flex items-center justify-between mb-2">
                <span className="text-amber-700">Sophie Scarf ({selectedSize.label})</span>
                <span className="font-semibold text-amber-900">CHF {selectedSize.price}.–</span>
              </div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-amber-700">Lieferung</span>
                <span className="font-semibold text-amber-900">CHF {DELIVERY_COST}.–</span>
              </div>
              <div className="border-t border-amber-200 mt-4 pt-4 flex items-center justify-between">
                <span className="text-lg font-bold text-amber-900">Total</span>
                <span className="text-2xl font-bold text-amber-900">CHF {totalPrice}.–</span>
              </div>
              <p className="text-xs text-amber-600 mt-4 text-center">
                Bezahlung via Twint erfolgt nach Bestellbestätigung
              </p>
            </div>
          </div>

          <div className="mt-8 flex gap-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-6 py-3 border border-amber-300 text-amber-800 font-semibold rounded-xl hover:bg-amber-50 transition-colors"
            >
              Abbrechen
            </button>
            <button
              type="submit"
              className="flex-1 px-6 py-3 bg-amber-700 hover:bg-amber-800 text-white font-semibold rounded-xl transition-colors shadow-lg"
            >
              Bestellung absenden
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
