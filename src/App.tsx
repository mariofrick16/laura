import { useState, useEffect } from 'react';
import ProductShowcase from './components/ProductShowcase';
import OrderForm, { type OrderFormData } from './components/OrderForm';
import OrderConfirmation from './components/OrderConfirmation';
import AdminDashboard from './components/AdminDashboard';
import { supabase, type Order } from './lib/supabase';
import { sizes, DELIVERY_COST } from './lib/colors';

type AppState = 'showcase' | 'ordering' | 'confirmation';

function App() {
  const [appState, setAppState] = useState<AppState>('showcase');
  const [currentOrder, setCurrentOrder] = useState<Order | null>(null);
  const [isAdminRoute, setIsAdminRoute] = useState(false);
  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState(false);
  const [passwordInput, setPasswordInput] = useState('');

  useEffect(() => {
    const checkRoute = () => {
      setIsAdminRoute(window.location.hash === '#admin');
    };

    checkRoute();
    window.addEventListener('hashchange', checkRoute);

    return () => window.removeEventListener('hashchange', checkRoute);
  }, []);

  const handleOrderSubmit = async (formData: OrderFormData) => {
    const selectedSize = sizes.find(s => s.value === formData.scarf_size) || sizes[1];
    const totalPrice = selectedSize.price + DELIVERY_COST;

    const { data, error } = await supabase
      .from('orders')
      .insert([
        {
          ...formData,
          order_status: 'pending',
          total_price: totalPrice,
        }
      ])
      .select()
      .single();

    if (error) {
      console.error('Error creating order:', error);
      alert('Fehler beim Erstellen der Bestellung. Bitte versuchen Sie es erneut.');
    } else {
      setCurrentOrder(data);
      setAppState('confirmation');
    }
  };

  const handleCloseConfirmation = () => {
    setAppState('showcase');
    setCurrentOrder(null);
  };

  if (isAdminRoute) {
    if (!isAdminAuthenticated) {
      return (
        <div className="min-h-screen bg-amber-50 flex items-center justify-center">
          <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
            <h2 className="text-2xl font-bold text-amber-900 mb-6">Admin Login</h2>
            <form onSubmit={(e) => {
              e.preventDefault();
              if (passwordInput === 'rennvelo') {
                setIsAdminAuthenticated(true);
                setPasswordInput('');
              } else {
                alert('Falsches Passwort');
                setPasswordInput('');
              }
            }}>
              <div className="mb-4">
                <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                  Passwort
                </label>
                <input
                  type="password"
                  id="password"
                  value={passwordInput}
                  onChange={(e) => setPasswordInput(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                  placeholder="Passwort eingeben"
                  autoFocus
                />
              </div>
              <button
                type="submit"
                className="w-full bg-amber-600 hover:bg-amber-700 text-white font-semibold py-2 px-4 rounded-lg transition-colors duration-200"
              >
                Anmelden
              </button>
              <button
                type="button"
                onClick={() => {
                  window.location.hash = '';
                  setIsAdminRoute(false);
                }}
                className="w-full mt-3 bg-gray-200 hover:bg-gray-300 text-gray-700 font-semibold py-2 px-4 rounded-lg transition-colors duration-200"
              >
                Abbrechen
              </button>
            </form>
          </div>
        </div>
      );
    }

    return (
      <div className="min-h-screen bg-amber-50">
        <AdminDashboard onClose={() => {
          window.location.hash = '';
          setIsAdminRoute(false);
          setIsAdminAuthenticated(false);
        }} />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-amber-50">
      {appState === 'showcase' && (
        <ProductShowcase onOrderClick={() => setAppState('ordering')} />
      )}

      {appState === 'ordering' && (
        <OrderForm
          onClose={() => setAppState('showcase')}
          onSubmit={handleOrderSubmit}
        />
      )}

      {appState === 'confirmation' && currentOrder && (
        <OrderConfirmation
          order={currentOrder}
          onClose={handleCloseConfirmation}
        />
      )}
    </div>
  );
}

export default App;
