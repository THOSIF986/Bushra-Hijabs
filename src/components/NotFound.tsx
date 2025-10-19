import React from 'react';
import { Button } from './ui/button';
import { Home } from 'lucide-react';

interface NotFoundProps {
  onNavigate: (page: string) => void;
}

export const NotFound: React.FC<NotFoundProps> = ({ onNavigate }) => {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="text-center space-y-6 max-w-md">
        <div className="text-6xl">404</div>
        <h1 className="text-4xl text-gray-900">Page Not Found</h1>
        <p className="text-xl text-gray-600">
          Sorry, we couldn't find the page you're looking for.
        </p>
        <Button onClick={() => onNavigate('home')} size="lg">
          <Home className="h-5 w-5 mr-2" />
          Back to Home
        </Button>
      </div>
    </div>
  );
};
