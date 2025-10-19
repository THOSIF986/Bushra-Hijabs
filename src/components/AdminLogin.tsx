import React, { useState } from 'react';
import { useApp } from '../lib/AppContext';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Lock } from 'lucide-react';
import { toast } from 'sonner@2.0.3';

interface AdminLoginProps {
  onNavigate: (page: string) => void;
}

export const AdminLogin: React.FC<AdminLoginProps> = ({ onNavigate }) => {
  const { adminLogin } = useApp();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const success = adminLogin(email, password);
    
    if (success) {
      toast.success('Admin login successful!');
      onNavigate('admin-dashboard');
    } else {
      toast.error('Invalid credentials. Use admin@bushrahijabs.com / admin123');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-pink-900 flex items-center justify-center p-4 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-pink-500/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>
      
      <Card className="w-full max-w-md shadow-2xl border-0 relative z-10">
        <CardHeader className="text-center space-y-4">
          <div className="mx-auto mb-2 w-20 h-20 bg-gradient-to-br from-pink-500 to-purple-600 rounded-2xl flex items-center justify-center shadow-xl shadow-pink-500/50">
            <Lock className="h-10 w-10 text-white" />
          </div>
          <CardTitle className="text-3xl bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent">Admin Login</CardTitle>
          <CardDescription className="text-base">Bushra Hijabs - Admin Panel</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email Address</Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@bushrahijabs.com"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                required
              />
            </div>
            <Button type="submit" className="w-full bg-gradient-to-r from-pink-600 to-purple-600 hover:from-pink-700 hover:to-purple-700 shadow-lg">
              Login to Admin Panel
            </Button>
          </form>

          <div className="mt-6 p-4 bg-gradient-to-r from-blue-50 to-purple-50 border border-blue-200 rounded-xl">
            <p className="text-sm text-blue-900 mb-2">Demo Credentials:</p>
            <p className="text-xs text-blue-800 font-mono">Email: admin@bushrahijabs.com</p>
            <p className="text-xs text-blue-800 font-mono">Password: admin123</p>
          </div>

          <div className="mt-4 text-center">
            <button
              type="button"
              onClick={() => onNavigate('home')}
              className="text-sm text-gray-600 hover:text-pink-600 transition-colors"
            >
              ← Back to Store
            </button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
