import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Package, ShoppingBag, Users, DollarSign, TrendingUp } from 'lucide-react';
import { useApp } from '../../lib/AppContext';
import { motion } from 'motion/react';

export default function AdminDashboardHome() {
  const { products, orders } = useApp();
  
  const totalProducts = products.length;
  const totalOrders = orders.length;
  const totalCustomers = 156; // Mock data
  const revenue = orders.reduce((sum, order) => sum + order.total, 0);

  const stats = [
    {
      title: 'Total Products',
      value: totalProducts,
      icon: Package,
      gradient: 'from-blue-500 to-cyan-500',
      trend: '+12%',
    },
    {
      title: 'Total Orders',
      value: totalOrders,
      icon: ShoppingBag,
      gradient: 'from-green-500 to-emerald-500',
      trend: '+23%',
    },
    {
      title: 'Total Customers',
      value: totalCustomers,
      icon: Users,
      gradient: 'from-purple-500 to-indigo-500',
      trend: '+8%',
    },
    {
      title: 'Revenue',
      value: `₹${revenue.toLocaleString()}`,
      icon: DollarSign,
      gradient: 'from-pink-500 to-rose-500',
      trend: '+18%',
    },
  ];

  return (
    <div>
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-4xl text-gray-900 mb-2">Dashboard Overview</h1>
        <p className="text-gray-600 mb-8">Welcome back! Here's what's happening with your store today.</p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <motion.div
              key={stat.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <p className="text-sm text-gray-600 mb-1">{stat.title}</p>
                      <p className="text-3xl">{stat.value}</p>
                      <div className="flex items-center gap-1 mt-2 text-green-600 text-sm">
                        <TrendingUp className="h-4 w-4" />
                        <span>{stat.trend}</span>
                      </div>
                    </div>
                    <div className={`bg-gradient-to-br ${stat.gradient} p-4 rounded-2xl shadow-lg`}>
                      <Icon className="h-6 w-6 text-white" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <Card className="border-0 shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <ShoppingBag className="h-5 w-5 text-pink-600" />
                Recent Orders
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {orders.slice(0, 5).map((order) => (
                  <div key={order.id} className="flex items-center justify-between pb-4 border-b last:border-0 hover:bg-gray-50 -mx-2 px-2 py-2 rounded-lg transition-colors">
                    <div>
                      <p className="text-sm">{order.id}</p>
                      <p className="text-xs text-gray-500">{order.customerName}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm">₹{order.total}</p>
                      <span className={`text-xs px-2 py-1 rounded-full ${
                        order.status === 'delivered' ? 'bg-green-100 text-green-800' :
                        order.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                        'bg-blue-100 text-blue-800'
                      }`}>
                        {order.status}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
        >
          <Card className="border-0 shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Package className="h-5 w-5 text-red-600" />
                Low Stock Alert
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {products
                  .filter(p => p.stock && p.stock < 20)
                  .slice(0, 5)
                  .map((product) => (
                    <div key={product.id} className="flex items-center justify-between pb-4 border-b last:border-0 hover:bg-red-50 -mx-2 px-2 py-2 rounded-lg transition-colors">
                      <div className="flex-1">
                        <p className="text-sm line-clamp-1">{product.name}</p>
                        <p className="text-xs text-gray-500">{product.category}</p>
                      </div>
                      <div className="text-right">
                        <span className="text-sm px-3 py-1 bg-red-100 text-red-700 rounded-full">
                          {product.stock} left
                        </span>
                      </div>
                    </div>
                  ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}
