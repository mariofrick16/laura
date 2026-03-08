import { CheckCircle, Package, Mail } from 'lucide-react';
import type { Order } from '../lib/supabase';

interface OrderConfirmationProps {
  order: Order;
  onClose: () => void;
}

const colorLabels = {
  grey: 'Grau',
  blue: 'Blau',
  brown: 'Braun',
  yellow: 'Gelb',
  red: 'Rot',
};

export default function OrderConfirmation({ order, onClose }: OrderConfirmationProps) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-2xl shadow-2xl max-w-lg w-full p-8">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-green-100 rounded-full mb-4">
            <CheckCircle className="w-12 h-12 text-green-600" />
          </div>
          <h2 className="text-3xl font-bold text-slate-800 mb-2">
            Bestellung erfolgreich!
          </h2>
          <p className="text-slate-600">
            Vielen Dank für Ihre Bestellung
          </p>
        </div>

        <div className="bg-slate-50 rounded-xl p-6 mb-6 space-y-4">
          <div>
            <div className="text-sm text-slate-500 mb-1">Bestellnummer</div>
            <div className="font-mono font-semibold text-slate-800">
              {order.id.slice(0, 8).toUpperCase()}
            </div>
          </div>

          <div className="border-t border-slate-200 pt-4">
            <div className="text-sm text-slate-500 mb-2">Produkt</div>
            <div className="font-semibold text-slate-800">Sophie Scarf</div>
            <div className="text-slate-600">
              Farbe: {colorLabels[order.scarf_color]}
            </div>
          </div>

          <div className="border-t border-slate-200 pt-4">
            <div className="text-sm text-slate-500 mb-2">Lieferadresse</div>
            <div className="text-slate-800">
              <div>{order.customer_name}</div>
              <div>{order.delivery_street}</div>
              <div>{order.delivery_postal_code} {order.delivery_city}</div>
            </div>
          </div>

          <div className="border-t border-slate-200 pt-4">
            <div className="flex items-center justify-between">
              <span className="text-slate-600">Total</span>
              <span className="text-xl font-bold text-slate-800">
                CHF {order.total_price.toFixed(2)}
              </span>
            </div>
          </div>
        </div>

        <div className="space-y-4 mb-6">
          <div className="flex gap-3 items-start bg-blue-50 border border-blue-200 rounded-lg p-4">
            <Mail className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
            <div className="text-sm text-blue-800">
              <p className="font-semibold mb-1">Bestätigung per E-Mail</p>
              <p className="text-blue-700">
                Sie erhalten eine Bestätigungs-E-Mail an <strong>{order.customer_email}</strong>
              </p>
            </div>
          </div>

          <div className="flex gap-3 items-start bg-green-50 border border-green-200 rounded-lg p-4">
            <Package className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
            <div className="text-sm text-green-800">
              <p className="font-semibold mb-1">Lieferung</p>
              <p className="text-green-700">
                Ihr Sophie Scarf wird in den nächsten Tagen an die angegebene Adresse geliefert.
              </p>
            </div>
          </div>
        </div>

        <button
          onClick={onClose}
          className="w-full bg-slate-800 hover:bg-slate-900 text-white font-semibold py-3 px-6 rounded-xl transition-colors shadow-lg"
        >
          Schliessen
        </button>
      </div>
    </div>
  );
}
