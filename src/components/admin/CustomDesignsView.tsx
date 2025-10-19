import React from 'react';
import { useApp } from '../../lib/AppContext';
import { Button } from '../ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Badge } from '../ui/badge';
import { Check, X, Clock, Palette } from 'lucide-react';
import { toast } from 'sonner@2.0.3';

export const CustomDesignsView: React.FC = () => {
  const { customDesigns, updateCustomDesignStatus } = useApp();

  const handleApprove = (requestId: string) => {
    updateCustomDesignStatus(requestId, 'approved');
    toast.success('Custom design request approved');
  };

  const handleReject = (requestId: string) => {
    updateCustomDesignStatus(requestId, 'rejected');
    toast.success('Custom design request rejected');
  };

  const handleComplete = (requestId: string) => {
    updateCustomDesignStatus(requestId, 'completed');
    toast.success('Custom design request marked as completed');
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'bg-green-100 text-green-800';
      case 'approved':
        return 'bg-blue-100 text-blue-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'rejected':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const pendingCount = customDesigns.filter(d => d.status === 'pending').length;
  const approvedCount = customDesigns.filter(d => d.status === 'approved').length;
  const completedCount = customDesigns.filter(d => d.status === 'completed').length;

  return (
    <div className="space-y-6">
      {/* Stats */}
      <div className="grid sm:grid-cols-4 gap-6">
        <Card className="border-l-4 border-l-purple-500">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total Requests</p>
                <p className="text-3xl text-gray-900 mt-1">{customDesigns.length}</p>
              </div>
              <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center">
                <Palette className="h-6 w-6 text-purple-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-yellow-500">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Pending</p>
                <p className="text-3xl text-gray-900 mt-1">{pendingCount}</p>
              </div>
              <div className="w-12 h-12 bg-yellow-100 rounded-xl flex items-center justify-center">
                <Clock className="h-6 w-6 text-yellow-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-blue-500">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Approved</p>
                <p className="text-3xl text-gray-900 mt-1">{approvedCount}</p>
              </div>
              <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                <Check className="h-6 w-6 text-blue-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-green-500">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Completed</p>
                <p className="text-3xl text-gray-900 mt-1">{completedCount}</p>
              </div>
              <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
                <Check className="h-6 w-6 text-green-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Card */}
      <Card>
        <CardHeader>
          <CardTitle>Custom Design Requests</CardTitle>
          <CardDescription>Review and manage customer design requests</CardDescription>
        </CardHeader>
        <CardContent>
          {customDesigns.length === 0 ? (
            <div className="text-center py-12 text-gray-600">
              No custom design requests yet
            </div>
          ) : (
            <div className="space-y-4">
              {customDesigns.map((request) => (
                <div 
                  key={request.id} 
                  className="border border-gray-200 rounded-lg p-5 hover:shadow-md transition-shadow"
                >
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="text-lg text-gray-900 mb-1">{request.name}</h3>
                      <div className="flex flex-col gap-1 text-sm text-gray-600">
                        <span>{request.email}</span>
                        <span>{request.mobile}</span>
                        <span className="text-xs text-gray-500">
                          Submitted: {new Date(request.date).toLocaleDateString('en-US', { 
                            year: 'numeric', 
                            month: 'long', 
                            day: 'numeric' 
                          })}
                        </span>
                      </div>
                    </div>
                    <Badge className={getStatusColor(request.status)}>
                      {request.status.toUpperCase()}
                    </Badge>
                  </div>

                  <div className="bg-gray-50 rounded-lg p-4 space-y-3 mb-4">
                    <div>
                      <p className="text-sm text-gray-600 mb-1">Fabric Preference</p>
                      <p className="text-gray-900">{request.fabric}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600 mb-1">Color/Pattern Ideas</p>
                      <p className="text-gray-900">{request.colorPattern}</p>
                    </div>
                    {request.referenceImage && (
                      <div>
                        <p className="text-sm text-gray-600 mb-1">Reference Image</p>
                        <p className="text-gray-900 font-mono text-sm">{request.referenceImage}</p>
                      </div>
                    )}
                  </div>

                  <div className="flex gap-2">
                    {request.status === 'pending' && (
                      <>
                        <Button
                          size="sm"
                          onClick={() => handleApprove(request.id)}
                          className="bg-green-600 hover:bg-green-700"
                        >
                          <Check className="h-4 w-4 mr-1" />
                          Approve
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleReject(request.id)}
                        >
                          <X className="h-4 w-4 mr-1" />
                          Reject
                        </Button>
                      </>
                    )}
                    {request.status === 'approved' && (
                      <Button
                        size="sm"
                        onClick={() => handleComplete(request.id)}
                        className="bg-blue-600 hover:bg-blue-700"
                      >
                        <Check className="h-4 w-4 mr-1" />
                        Mark as Completed
                      </Button>
                    )}
                    {request.status === 'completed' && (
                      <Badge className="bg-green-100 text-green-800 px-3 py-1">
                        ✓ This request has been completed
                      </Badge>
                    )}
                    {request.status === 'rejected' && (
                      <Badge className="bg-red-100 text-red-800 px-3 py-1">
                        This request has been rejected
                      </Badge>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};
