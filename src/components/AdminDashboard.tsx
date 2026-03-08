import { useState, useEffect } from 'react';
import { X, Package, CheckCircle, Clock, Truck, Search } from 'lucide-react';
import { supabase, type Order } from '../lib/supabase';
import { colors } from '../lib/colors';

interface AdminDashboardProps {
  onClose: () => void;
}

const statusLabels = {
  pending: 'Ausstehend',
  paid: 'Bezahlt',
  delivered: 'Geliefert',
};

const statusColors = {
  pending: 'bg-yellow-100 text-yellow-800',
  paid: 'bg-blue-100 text-blue-800',
  delivered: 'bg-green-100 text-green-800',
};

const statusIcons = {
  pending: Clock,
  paid: CheckCircle,
  delivered: Truck,
};

const colorLabelsMap = colors.reduce((acc, color) => {
  acc[color.value] = `${color.label} (${color.colorCode})`;
  return acc;
}, {} as Record<string, string>);

const sizeLabels = {
  small: 'Small',
  regular: 'Regular',
};

export default function AdminDashboard({ onClose }: AdminDashboardProps) {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState<string>('all');

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from('orders')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching orders:', error);
    } else {
      setOrders(data || []);
    }
    setLoading(false);
  };

  const updateOrderStatus = async (orderId: string, newStatus: 'pending' | 'paid' | 'delivered') => {
    const { error } = await supabase
      .from('orders')
      .update({ order_status: newStatus, updated_at: new Date().toISOString() })
      .eq('id', orderId);

    if (error) {
      console.error('Error updating order:', error);
    } else {
      await fetchOrders();
    }
  };

  const filteredOrders = orders.filter(order => {
    const matchesSearch =
      order.customer_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.customer_email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.id.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus = filterStatus === 'all' || order.order_status === filterStatus;

    return matchesSearch && matchesStatus;
  });

  const totalRevenue = orders
    .filter(o => o.order_status === 'paid' || o.order_status === 'delivered')
    .reduce((sum, order) => sum + Number(order.total_price), 0);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50 overflow-y-auto">
      <div className="bg-white rounded-2xl shadow-2xl max-w-6xl w-full my-8">
        <div className="p-6 border-b border-slate-200 flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-slate-800">Admin Dashboard</h2>
            <p className="text-slate-600 text-sm">Bestellungsverwaltung</p>
          </div>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-slate-600 transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
            <div className="bg-blue-50 rounded-xl p-4 border border-blue-200">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-sm text-blue-600 mb-1">Total Bestellungen</div>
                  <div className="text-2xl font-bold text-blue-800">{orders.length}</div>
                </div>
                <Package className="w-8 h-8 text-blue-600" />
              </div>
            </div>

            <div className="bg-yellow-50 rounded-xl p-4 border border-yellow-200">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-sm text-yellow-600 mb-1">Ausstehend</div>
                  <div className="text-2xl font-bold text-yellow-800">
                    {orders.filter(o => o.order_status === 'pending').length}
                  </div>
                </div>
                <Clock className="w-8 h-8 text-yellow-600" />
              </div>
            </div>

            <div className="bg-green-50 rounded-xl p-4 border border-green-200">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-sm text-green-600 mb-1">Geliefert</div>
                  <div className="text-2xl font-bold text-green-800">
                    {orders.filter(o => o.order_status === 'delivered').length}
                  </div>
                </div>
                <Truck className="w-8 h-8 text-green-600" />
              </div>
            </div>

            <div className="bg-slate-50 rounded-xl p-4 border border-slate-200">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-sm text-slate-600 mb-1">Umsatz</div>
                  <div className="text-2xl font-bold text-slate-800">
                    CHF {totalRevenue.toFixed(2)}
                  </div>
                </div>
                <CheckCircle className="w-8 h-8 text-slate-600" />
              </div>
            </div>
          </div>

          <div className="mb-6 flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Suchen nach Name, E-Mail oder Bestellnummer..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-slate-800 focus:border-transparent"
              />
            </div>
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-slate-800 focus:border-transparent"
            >
              <option value="all">Alle Status</option>
              <option value="pending">Ausstehend</option>
              <option value="paid">Bezahlt</option>
              <option value="delivered">Geliefert</option>
            </select>
          </div>

          {loading ? (
            <div className="text-center py-12">
              <div className="text-slate-600">Lade Bestellungen...</div>
            </div>
          ) : filteredOrders.length === 0 ? (
            <div className="text-center py-12">
              <Package className="w-12 h-12 text-slate-300 mx-auto mb-4" />
              <div className="text-slate-600">Keine Bestellungen gefunden</div>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-slate-200">
                    <th className="text-left py-3 px-4 text-sm font-semibold text-slate-600">
                      Bestellung
                    </th>
                    <th className="text-left py-3 px-4 text-sm font-semibold text-slate-600">
                      Kunde
                    </th>
                    <th className="text-left py-3 px-4 text-sm font-semibold text-slate-600">
                      Produkt
                    </th>
                    <th className="text-left py-3 px-4 text-sm font-semibold text-slate-600">
                      Adresse
                    </th>
                    <th className="text-left py-3 px-4 text-sm font-semibold text-slate-600">
                      Datum
                    </th>
                    <th className="text-left py-3 px-4 text-sm font-semibold text-slate-600">
                      Status
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {filteredOrders.map((order) => {
                    const StatusIcon = statusIcons[order.order_status];
                    return (
                      <tr key={order.id} className="border-b border-slate-100 hover:bg-slate-50">
                        <td className="py-4 px-4">
                          <div className="font-mono text-sm text-slate-800">
                            {order.id.slice(0, 8).toUpperCase()}
                          </div>
                          <div className="text-xs text-slate-500">
                            CHF {order.total_price.toFixed(2)}
                          </div>
                        </td>
                        <td className="py-4 px-4">
                          <div className="font-medium text-slate-800">{order.customer_name}</div>
                          <div className="text-sm text-slate-600">{order.customer_email}</div>
                          <div className="text-xs text-slate-500">{order.customer_phone}</div>
                        </td>
                        <td className="py-4 px-4">
                          <div className="text-sm text-slate-800">
                            {colorLabelsMap[order.scarf_color]}
                          </div>
                          <div className="text-xs text-slate-500">
                            {sizeLabels[order.scarf_size]}
                          </div>
                        </td>
                        <td className="py-4 px-4">
                          <div className="text-sm text-slate-800">{order.delivery_street}</div>
                          <div className="text-xs text-slate-600">
                            {order.delivery_postal_code} {order.delivery_city}
                          </div>
                        </td>
                        <td className="py-4 px-4">
                          <div className="text-sm text-slate-800">
                            {new Date(order.created_at).toLocaleDateString('de-CH')}
                          </div>
                          <div className="text-xs text-slate-500">
                            {new Date(order.created_at).toLocaleTimeString('de-CH', {
                              hour: '2-digit',
                              minute: '2-digit'
                            })}
                          </div>
                        </td>
                        <td className="py-4 px-4">
                          <select
                            value={order.order_status}
                            onChange={(e) => updateOrderStatus(order.id, e.target.value as any)}
                            className={`text-xs font-semibold px-3 py-1 rounded-full border-0 focus:ring-2 focus:ring-slate-800 ${statusColors[order.order_status]}`}
                          >
                            <option value="pending">Ausstehend</option>
                            <option value="paid">Bezahlt</option>
                            <option value="delivered">Geliefert</option>
                          </select>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
