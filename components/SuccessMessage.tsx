import { ReactNode } from 'react';

interface SuccessMessageProps {
  clientName: string;
}

export default function SuccessMessage({ clientName }: SuccessMessageProps) {
  return (
    <div className="mb-8 bg-emerald-500/10 border-2 border-emerald-500 rounded-xl p-6 animate-in slide-in-from-top-4 duration-300">
      <div className="flex items-start gap-4">
        <div className="text-emerald-500 text-2xl">✓</div>
        <div>
          <h3 className="text-lg font-semibold text-emerald-400 mb-2">
            Booking Submitted Successfully!
          </h3>
          <p className="text-emerald-300">
            Thank you, <strong>{clientName}</strong>! We've received your booking request and will review it shortly. 
            You'll receive a confirmation email with next steps within 24 hours.
          </p>
        </div>
      </div>
    </div>
  );
}
