'use client';

import { useState } from 'react';
import BookingForm from '@/components/BookingForm';
import SuccessMessage from '@/components/SuccessMessage';

export default function BookingPage() {
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [formData, setFormData] = useState<any>(null);

  const handleSubmitSuccess = (data: any) => {
    setFormData(data);
    setSubmitSuccess(true);
    setTimeout(() => setSubmitSuccess(false), 5000);
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl sm:text-5xl font-bold text-white mb-4">
            Book Your Design Project
          </h1>
          <p className="text-lg text-slate-300">
            Tell us about your project and let's create something amazing together
          </p>
        </div>

        {submitSuccess && <SuccessMessage clientName={formData?.name} />}

        <div className="bg-slate-800 rounded-2xl shadow-2xl p-8 border border-slate-700">
          <BookingForm onSubmitSuccess={handleSubmitSuccess} />
        </div>

        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="text-center">
            <div className="bg-slate-700 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-xl text-white">⚡</span>
            </div>
            <h3 className="text-white font-semibold mb-2">Quick Response</h3>
            <p className="text-slate-400 text-sm">We'll get back to you within 24 hours</p>
          </div>
          <div className="text-center">
            <div className="bg-slate-700 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-xl text-white">🎨</span>
            </div>
            <h3 className="text-white font-semibold mb-2">Expert Design</h3>
            <p className="text-slate-400 text-sm">Professional designers with years of experience</p>
          </div>
          <div className="text-center">
            <div className="bg-slate-700 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-xl text-white">✓</span>
            </div>
            <h3 className="text-white font-semibold mb-2">100% Satisfaction</h3>
            <p className="text-slate-400 text-sm">Revisions until you're completely happy</p>
          </div>
        </div>
      </div>
    </main>
  );
}
