import React, { useState } from 'react';
import { useApp } from '../lib/AppContext';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Textarea } from './ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Upload } from 'lucide-react';
import { toast } from 'sonner@2.0.3';

interface CustomDesignProps {
  onNavigate: (page: string) => void;
}

export const CustomDesign: React.FC<CustomDesignProps> = ({ onNavigate }) => {
  const { submitCustomDesign } = useApp();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    mobile: '',
    fabric: '',
    colorPattern: '',
    referenceImage: ''
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // In a real app, you would upload this file to a server
      // For now, we'll just store the filename
      setFormData(prev => ({ ...prev, referenceImage: file.name }));
      toast.success('Image uploaded successfully');
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.name || !formData.email || !formData.mobile) {
      toast.error('Please fill in all required fields');
      return;
    }

    if (formData.mobile.length !== 10) {
      toast.error('Please enter a valid 10-digit mobile number');
      return;
    }

    if (!formData.fabric || !formData.colorPattern) {
      toast.error('Please specify fabric preference and color/pattern');
      return;
    }

    submitCustomDesign({
      name: formData.name,
      email: formData.email,
      mobile: formData.mobile,
      fabric: formData.fabric,
      colorPattern: formData.colorPattern,
      referenceImage: formData.referenceImage
    });

    toast.success('Custom design request submitted successfully! We will contact you soon.');
    
    // Reset form
    setFormData({
      name: '',
      email: '',
      mobile: '',
      fabric: '',
      colorPattern: '',
      referenceImage: ''
    });

    // Navigate to home after a brief delay
    setTimeout(() => {
      onNavigate('home');
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Breadcrumb */}
        <div className="mb-6">
          <nav className="text-sm text-gray-500">
            <button onClick={() => onNavigate('home')} className="hover:text-gray-700">
              HOME
            </button>
            <span className="mx-2">/</span>
            <span className="text-gray-900 uppercase">Custom Design</span>
          </nav>
        </div>

        {/* Header */}
        <div className="mb-8 text-center">
          <h1 className="text-4xl text-gray-900 mb-4">Design Your Own Hijab</h1>
          <p className="text-xl text-gray-600">
            Have a unique vision? Share your design ideas with us and we'll bring them to life.
          </p>
        </div>

        {/* Form */}
        <div className="bg-white rounded-lg shadow-md p-6 md:p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Personal Information */}
            <div className="space-y-4">
              <h2 className="text-2xl text-gray-900 border-b border-gray-200 pb-2">
                Personal Information
              </h2>

              <div className="space-y-2">
                <Label htmlFor="name">Full Name *</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => handleInputChange('name', e.target.value)}
                  placeholder="Enter your full name"
                  required
                />
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="email">Email Address *</Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    placeholder="your.email@example.com"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="mobile">Mobile Number *</Label>
                  <Input
                    id="mobile"
                    type="tel"
                    value={formData.mobile}
                    onChange={(e) => handleInputChange('mobile', e.target.value.replace(/\D/g, '').slice(0, 10))}
                    placeholder="10-digit mobile number"
                    maxLength={10}
                    required
                  />
                </div>
              </div>
            </div>

            {/* Design Preferences */}
            <div className="space-y-4">
              <h2 className="text-2xl text-gray-900 border-b border-gray-200 pb-2">
                Design Preferences
              </h2>

              <div className="space-y-2">
                <Label htmlFor="fabric">Fabric Preference *</Label>
                <Select value={formData.fabric} onValueChange={(value) => handleInputChange('fabric', value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select fabric type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Jersey">Jersey</SelectItem>
                    <SelectItem value="Chiffon">Chiffon</SelectItem>
                    <SelectItem value="Silk">Silk</SelectItem>
                    <SelectItem value="Georgette">Georgette</SelectItem>
                    <SelectItem value="Cotton">Cotton</SelectItem>
                    <SelectItem value="Modal">Modal</SelectItem>
                    <SelectItem value="Other">Other (Specify in description)</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="colorPattern">Color/Pattern Idea *</Label>
                <Textarea
                  id="colorPattern"
                  value={formData.colorPattern}
                  onChange={(e) => handleInputChange('colorPattern', e.target.value)}
                  placeholder="Describe your desired color scheme, patterns, embroidery, or any special design elements..."
                  rows={5}
                  required
                />
                <p className="text-sm text-gray-500">
                  Please provide as much detail as possible about your desired design
                </p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="referenceImage">Reference Image (Optional)</Label>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 hover:border-pink-400 transition-colors">
                  <div className="text-center">
                    <Upload className="mx-auto h-12 w-12 text-gray-400 mb-4" />
                    <div className="flex text-sm text-gray-600 justify-center">
                      <label
                        htmlFor="file-upload"
                        className="relative cursor-pointer bg-white rounded-md text-pink-600 hover:text-pink-700"
                      >
                        <span>Upload a file</span>
                        <input
                          id="file-upload"
                          type="file"
                          className="sr-only"
                          accept="image/*"
                          onChange={handleFileChange}
                        />
                      </label>
                      <p className="pl-1">or drag and drop</p>
                    </div>
                    <p className="text-xs text-gray-500 mt-2">PNG, JPG, GIF up to 10MB</p>
                    {formData.referenceImage && (
                      <p className="text-sm text-green-600 mt-2">
                        Uploaded: {formData.referenceImage}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Information */}
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <h3 className="text-lg text-blue-900 mb-2">What happens next?</h3>
              <ul className="space-y-1 text-sm text-blue-800">
                <li>• Our design team will review your request within 24-48 hours</li>
                <li>• We'll contact you via email or phone to discuss details and pricing</li>
                <li>• Once confirmed, we'll create a sample for your approval</li>
                <li>• Production typically takes 7-10 business days after approval</li>
              </ul>
            </div>

            {/* Submit Button */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
              <Button type="submit" size="lg" className="sm:min-w-[200px]">
                Submit Request
              </Button>
              <Button
                type="button"
                variant="outline"
                size="lg"
                onClick={() => onNavigate('shop')}
                className="sm:min-w-[200px]"
              >
                Browse Ready-Made Collection
              </Button>
            </div>
          </form>
        </div>

        {/* Benefits Section */}
        <div className="mt-12 grid md:grid-cols-3 gap-6">
          <div className="text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-pink-100 rounded-full mb-4">
              <svg className="w-8 h-8 text-pink-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
              </svg>
            </div>
            <h3 className="text-lg text-gray-900 mb-2">Personalized Design</h3>
            <p className="text-gray-600 text-sm">
              Work directly with our designers to create your perfect hijab
            </p>
          </div>

          <div className="text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-purple-100 rounded-full mb-4">
              <svg className="w-8 h-8 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h3 className="text-lg text-gray-900 mb-2">Premium Quality</h3>
            <p className="text-gray-600 text-sm">
              Same high-quality fabrics and craftsmanship as our collection
            </p>
          </div>

          <div className="text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-indigo-100 rounded-full mb-4">
              <svg className="w-8 h-8 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 className="text-lg text-gray-900 mb-2">Quick Turnaround</h3>
            <p className="text-gray-600 text-sm">
              Receive your custom hijab within 10-14 business days
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
