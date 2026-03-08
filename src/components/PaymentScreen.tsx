import { useState, useEffect } from 'react';
import { CheckCircle, Smartphone, AlertCircle } from 'lucide-react';

interface PaymentScreenProps {
  orderId: string;
  amount: number;
  onPaymentConfirmed: () => void;
}

export default function PaymentScreen({ orderId, amount, onPaymentConfirmed }: PaymentScreenProps) {
  const [paymentConfirmed, setPaymentConfirmed] = useState(false);
  const [showManualConfirm, setShowManualConfirm] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowManualConfirm(true);
    }, 5000);

    return () => clearTimeout(timer);
  }, []);

  const handleManualConfirm = () => {
    setPaymentConfirmed(true);
    setTimeout(() => {
      onPaymentConfirmed();
    }, 1500);
  };

  const twintNumber = '079 000 00 00';
  const paymentReference = orderId.slice(0, 8).toUpperCase();

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-8">
        {!paymentConfirmed ? (
          <>
            <div className="text-center mb-8">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-pink-100 rounded-full mb-4">
                <Smartphone className="w-8 h-8 text-pink-600" />
              </div>
              <h2 className="text-2xl font-bold text-slate-800 mb-2">
                Mit Twint bezahlen
              </h2>
              <p className="text-slate-600">
                Bitte überweisen Sie den Betrag via Twint
              </p>
            </div>

            <div className="bg-slate-50 rounded-xl p-6 mb-6">
              <div className="text-center mb-6">
                <div className="inline-block bg-white p-8 rounded-xl shadow-md">
                  <div className="text-6xl font-bold text-pink-600">tw</div>
                  <div className="text-xs text-slate-500 mt-2">Twint</div>
                </div>
              </div>

              <div className="space-y-3 text-sm">
                <div className="flex justify-between items-center py-2 border-b border-slate-200">
                  <span className="text-slate-600">Betrag:</span>
                  <span className="font-bold text-slate-800 text-lg">CHF {amount.toFixed(2)}</span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-slate-200">
                  <span className="text-slate-600">Telefonnummer:</span>
                  <span className="font-mono font-semibold text-slate-800">{twintNumber}</span>
                </div>
                <div className="flex justify-between items-center py-2">
                  <span className="text-slate-600">Referenz:</span>
                  <span className="font-mono font-semibold text-slate-800">{paymentReference}</span>
                </div>
              </div>
            </div>

            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
              <div className="flex gap-3">
                <AlertCircle className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                <div className="text-sm text-blue-800">
                  <p className="font-semibold mb-1">So bezahlen Sie:</p>
                  <ol className="list-decimal list-inside space-y-1 text-blue-700">
                    <li>Öffnen Sie die Twint App</li>
                    <li>Wählen Sie "Geld senden"</li>
                    <li>Geben Sie die obige Telefonnummer ein</li>
                    <li>Senden Sie CHF {amount.toFixed(2)}</li>
                    <li>Fügen Sie die Referenz hinzu</li>
                  </ol>
                </div>
              </div>
            </div>

            {showManualConfirm && (
              <button
                onClick={handleManualConfirm}
                className="w-full bg-slate-800 hover:bg-slate-900 text-white font-semibold py-3 px-6 rounded-xl transition-all duration-300 shadow-lg"
              >
                Zahlung abgeschlossen
              </button>
            )}

            {!showManualConfirm && (
              <div className="text-center text-sm text-slate-500">
                Warten auf Zahlungsbestätigung...
              </div>
            )}
          </>
        ) : (
          <div className="text-center py-8">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-green-100 rounded-full mb-6">
              <CheckCircle className="w-12 h-12 text-green-600" />
            </div>
            <h2 className="text-2xl font-bold text-slate-800 mb-2">
              Zahlung bestätigt!
            </h2>
            <p className="text-slate-600">
              Ihre Bestellung wird verarbeitet...
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
