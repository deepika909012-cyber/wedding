'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

interface BookingFormData {
  name: string;
  phone: string;
  email: string;
  service: string;
  package: string;
  message: string;
}

interface BookingFormProps {
  onSubmitSuccess: (data: BookingFormData) => void;
}

export default function BookingForm({ onSubmitSuccess }: BookingFormProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [formData, setFormData] = useState<BookingFormData>({
    name: '',
    phone: '',
    email: '',
    service: '',
    package: '',
    message: '',
  });

  const services = [
    'Logo Design',
    'Brand Identity',
    'Web Design',
    'Print Design',
    'Packaging Design',
    'Social Media Graphics',
    'Illustration',
    'UI/UX Design',
  ];

  const packages = ['Basic', 'Standard', 'Premium'];

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    // Validation
    if (!formData.name || !formData.phone || !formData.email || !formData.service || !formData.package || !formData.message) {
      setError('Please fill in all fields');
      setLoading(false);
      return;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setError('Please enter a valid email address');
      setLoading(false);
      return;
    }

    // Phone validation
    const phoneRegex = /^[\d\s\-\+\(\)]{10,}$/;
    if (!phoneRegex.test(formData.phone)) {
      setError('Please enter a valid phone number');
      setLoading(false);
      return;
    }

    try {
      const response = await fetch('/api/booking', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.message || 'Failed to submit booking');
        setLoading(false);
        return;
      }

      // Reset form
      setFormData({
        name: '',
        phone: '',
        email: '',
        service: '',
        package: '',
        message: '',
      });

      // Call success callback
      onSubmitSuccess(formData);
    } catch (err) {
      setError('An error occurred. Please try again.');
      console.error('Booking error:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {error && (
        <div className="bg-red-500/10 border border-red-500 text-red-400 px-4 py-3 rounded-lg">
          {error}
        </div>
      )}

      {/* Name Field */}
      <div>
        <label htmlFor="name" className="block text-sm font-medium text-slate-300 mb-2">
          Full Name
        </label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="John Doe"
          className="w-full px-4 py-3 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition"
          required
        />
      </div>

      {/* Phone Field */}
      <div>
        <label htmlFor="phone" className="block text-sm font-medium text-slate-300 mb-2">
          Phone Number
        </label>
        <input
          type="tel"
          id="phone"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          placeholder="+1 (555) 123-4567"
          className="w-full px-4 py-3 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition"
          required
        />
      </div>

      {/* Email Field */}
      <div>
        <label htmlFor="email" className="block text-sm font-medium text-slate-300 mb-2">
          Email Address
        </label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="john@example.com"
          className="w-full px-4 py-3 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition"
          required
        />
      </div>

      {/* Service Dropdown */}
      <div>
        <label htmlFor="service" className="block text-sm font-medium text-slate-300 mb-2">
          Service Type
        </label>
        <select
          id="service"
          name="service"
          value={formData.service}
          onChange={handleChange}
          className="w-full px-4 py-3 bg-slate-700 border border-slate-600 rounded-lg text-white focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition appearance-none cursor-pointer"
          required
        >
          <option value="">Select a service</option>
          {services.map((service) => (
            <option key={service} value={service}>
              {service}
            </option>
          ))}
        </select>
      </div>

      {/* Package Selection */}
      <div>
        <label className="block text-sm font-medium text-slate-300 mb-3">
          Select Package
        </label>
        <div className="grid grid-cols-3 gap-3">
          {packages.map((pkg) => (
            <label
              key={pkg}
              className="relative flex items-center p-4 border-2 rounded-lg cursor-pointer transition"
              style={{
                borderColor: formData.package === pkg ? '#3b82f6' : '#475569',
                backgroundColor: formData.package === pkg ? 'rgba(59, 130, 246, 0.1)' : 'transparent',
              }}
            >
              <input
                type="radio"
                name="package"
                value={pkg}
                checked={formData.package === pkg}
                onChange={handleChange}
                className="sr-only"
                required
              />
              <span className="text-sm font-medium text-white">{pkg}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Message Textarea */}
      <div>
        <label htmlFor="message" className="block text-sm font-medium text-slate-300 mb-2">
          Project Description
        </label>
        <textarea
          id="message"
          name="message"
          value={formData.message}
          onChange={handleChange}
          placeholder="Tell us about your project, vision, and any specific requirements..."
          rows={5}
          className="w-full px-4 py-3 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition resize-none"
          required
        />
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        disabled={loading}
        className={`w-full py-3 px-4 rounded-lg font-semibold text-white transition duration-200 ${
          loading
            ? 'bg-slate-600 cursor-not-allowed opacity-50'
            : 'bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 shadow-lg hover:shadow-xl'
        }`}
      >
        {loading ? (
          <span className="flex items-center justify-center">
            <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            Submitting...
          </span>
        ) : (
          'Submit Booking Request'
        )}
      </button>

      <p className="text-center text-slate-400 text-sm">
        We'll review your request and get back to you within 24 hours
      </p>
    </form>
  );
}
