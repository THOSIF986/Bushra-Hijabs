import React, { useMemo } from 'react';
import { useApp } from '../../lib/AppContext';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Badge } from '../ui/badge';
import { User, Mail, Phone, MapPin, Calendar } from 'lucide-react';

interface Customer {
  id: string;
  name: string;
  email: string;
  mobile: string;
  joinedDate: string;
  addresses: any[];
  language?: string;
}

export const CustomersView: React.FC = () => {
  const { orders, user } = useApp();

  // Create a unique list of customers from orders
  const customers = useMemo<Customer[]>(() => {
    const customerMap = new Map<string, Customer>();
    
    // Add current logged in user if exists
    if (user) {
      customerMap.set(user.email, {
        id: user.id,
        name: user.name,
        email: user.email,
        mobile: user.mobile,
        joinedDate: new Date().toISOString(),
        addresses: user.addresses,
        language: user.language
      });
    }
    
    // Extract unique customers from orders
    orders.forEach(order => {
      if (!customerMap.has(order.email)) {
        customerMap.set(order.email, {
          id: order.email, // Use email as ID since we don't have customer IDs in orders
          name: order.customerName,
          email: order.email,
          mobile: order.mobile,
          joinedDate: order.date,
          addresses: [order.address],
          language: undefined
        });
      }
    });
    
    return Array.from(customerMap.values());
  }, [orders, user]);

  const getCustomerOrders = (customerEmail: string) => {
    return orders.filter(order => order.email === customerEmail);
  };

  const getCustomerTotalSpent = (customerEmail: string) => {
    const customerOrders = getCustomerOrders(customerEmail);
    return customerOrders.reduce((sum, order) => sum + order.total, 0);
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl text-gray-900">Customers</h1>
        <p className="text-gray-600 mt-1">View all registered customers and their details</p>
      </div>

      <div className="grid gap-6">
        {customers.length === 0 ? (
          <Card>
            <CardContent className="py-12">
              <div className="text-center text-gray-600">
                <p className="text-xl">No customers yet</p>
                <p className="mt-2">Customer information will appear here when users register</p>
              </div>
            </CardContent>
          </Card>
        ) : (
          customers.map((customer) => {
            const customerOrders = getCustomerOrders(customer.email);
            const totalSpent = getCustomerTotalSpent(customer.email);

            return (
              <Card key={customer.id} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 bg-pink-100 rounded-full flex items-center justify-center flex-shrink-0">
                        <User className="h-6 w-6 text-pink-600" />
                      </div>
                      <div>
                        <CardTitle className="text-xl">{customer.name}</CardTitle>
                        <CardDescription>Customer since {new Date(customer.joinedDate || Date.now()).toLocaleDateString('en-IN', { month: 'long', year: 'numeric' })}</CardDescription>
                      </div>
                    </div>
                    <Badge className="bg-pink-100 text-pink-800">
                      {customerOrders.length} {customerOrders.length === 1 ? 'Order' : 'Orders'}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-3">
                      <div className="flex items-center gap-3">
                        <Mail className="h-4 w-4 text-gray-400" />
                        <div>
                          <p className="text-xs text-gray-600">Email</p>
                          <p className="text-gray-900">{customer.email}</p>
                        </div>
                      </div>
                      {customer.mobile && (
                        <div className="flex items-center gap-3">
                          <Phone className="h-4 w-4 text-gray-400" />
                          <div>
                            <p className="text-xs text-gray-600">Mobile</p>
                            <p className="text-gray-900">{customer.mobile}</p>
                          </div>
                        </div>
                      )}
                      {customer.language && (
                        <div className="flex items-center gap-3">
                          <Calendar className="h-4 w-4 text-gray-400" />
                          <div>
                            <p className="text-xs text-gray-600">Preferred Language</p>
                            <p className="text-gray-900">{customer.language}</p>
                          </div>
                        </div>
                      )}
                    </div>

                    <div className="space-y-3">
                      <div className="p-4 bg-green-50 rounded-lg">
                        <p className="text-xs text-green-700">Total Spent</p>
                        <p className="text-2xl text-green-900">₹{totalSpent.toLocaleString()}</p>
                      </div>

                      {customer.addresses && customer.addresses.length > 0 && (
                        <div className="flex items-start gap-3">
                          <MapPin className="h-4 w-4 text-gray-400 mt-1" />
                          <div>
                            <p className="text-xs text-gray-600">Primary Address</p>
                            <p className="text-sm text-gray-900">
                              {customer.addresses[0].address}, {customer.addresses[0].city}, {customer.addresses[0].state} - {customer.addresses[0].pincode}
                            </p>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>

                  {customerOrders.length > 0 && (
                    <div className="mt-4 pt-4 border-t border-gray-200">
                      <p className="text-sm text-gray-600 mb-2">Recent Orders</p>
                      <div className="space-y-2">
                        {customerOrders.slice(0, 3).map((order) => (
                          <div key={order.id} className="flex justify-between items-center text-sm p-2 bg-gray-50 rounded">
                            <span className="text-gray-900">Order #{order.id}</span>
                            <div className="flex items-center gap-2">
                              <span className="text-gray-600">₹{order.total}</span>
                              <Badge className={`text-xs ${
                                order.status === 'delivered' ? 'bg-green-100 text-green-800' :
                                order.status === 'shipped' ? 'bg-blue-100 text-blue-800' :
                                'bg-orange-100 text-orange-800'
                              }`}>
                                {order.status}
                              </Badge>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            );
          })
        )}
      </div>
    </div>
  );
};
