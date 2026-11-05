'use client';

import React, { useState } from 'react';
import { Mail, Phone, MapPin, Clock, CheckCircle2, ArrowRight } from 'lucide-react';
import { Breadcrumb } from '@/components/ui/Breadcrumb';

export default function ContactPage() {
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: 'Bespoke Order & Styling Concierge',
    message: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormSubmitted(true);
  };

  return (
    <div className="bg-brand-ivory min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Breadcrumb items={[{ label: 'Client Concierge' }]} />

        <div className="text-center max-w-2xl mx-auto mb-14 space-y-3">
          <span className="text-xs uppercase tracking-[0.25em] text-brand-rose font-semibold">
            Dedicated Client Salon
          </span>
          <h1 className="font-serif text-3xl sm:text-5xl font-medium text-brand-charcoal">
            Client Concierge & Inquiries
          </h1>
          <p className="text-xs sm:text-sm text-brand-muted font-light leading-relaxed">
            Our styling specialists and personal shoppers are available six days a week for size consultations, bespoke curations, and private salon appointments.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          {/* Left Column: Contact Cards (5 cols) */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-white p-6 sm:p-8 rounded-3xl border border-brand-border/70 shadow-luxury space-y-6">
              <h3 className="font-serif text-xl font-medium text-brand-charcoal">
                Atelier Salons
              </h3>

              <div className="space-y-4 text-xs text-brand-charcoal">
                <div className="flex items-start gap-3">
                  <MapPin className="w-4 h-4 text-brand-rose shrink-0 mt-0.5" />
                  <div>
                    <strong className="block font-medium">Karachi Salon & Head Office</strong>
                    <span className="text-brand-muted">Clifton Block 4, Karachi, Pakistan</span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Phone className="w-4 h-4 text-brand-rose shrink-0 mt-0.5" />
                  <div>
                    <strong className="block font-medium">VIP Concierge Telephone</strong>
                    <span className="text-brand-muted">+92 (21) 3582-LYZOO / +92 300 0059966</span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Mail className="w-4 h-4 text-brand-rose shrink-0 mt-0.5" />
                  <div>
                    <strong className="block font-medium">Electronic Dossiers</strong>
                    <span className="text-brand-muted">concierge@lyzoo.com / vip@lyzoo.com</span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Clock className="w-4 h-4 text-brand-rose shrink-0 mt-0.5" />
                  <div>
                    <strong className="block font-medium">Salon Hours (PST)</strong>
                    <span className="text-brand-muted">Monday – Saturday: 10:00 AM – 8:00 PM</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-[#211E1B] text-white p-6 sm:p-8 rounded-3xl shadow-luxury space-y-3">
              <span className="text-[10px] uppercase tracking-widest text-brand-rose">
                Complimentary Service
              </span>
              <h4 className="font-serif text-xl font-medium text-white">
                Bespoke Styling Consultation
              </h4>
              <p className="text-xs text-white/70 leading-relaxed font-light">
                Request a dedicated stylist to assemble a complete wardrobe capsule or select jewelry combinations for your upcoming events.
              </p>
            </div>
          </div>

          {/* Right Column: Contact Form (7 cols) */}
          <div className="lg:col-span-7 bg-white p-8 sm:p-10 rounded-3xl border border-brand-border/70 shadow-luxury">
            <h3 className="font-serif text-2xl font-medium text-brand-charcoal mb-2">
              Send an Atelier Inquiry
            </h3>
            <p className="text-xs text-brand-muted font-light mb-6">
              Please enter your details below. A client concierge advisor will respond within 4 business hours.
            </p>

            {formSubmitted ? (
              <div className="p-8 bg-brand-rose-light/50 border border-brand-rose/40 rounded-2xl text-center space-y-3 animate-fadeIn">
                <CheckCircle2 className="w-10 h-10 text-brand-rose mx-auto" />
                <h4 className="font-serif text-2xl font-medium text-brand-charcoal">
                  Inquiry Dispatched
                </h4>
                <p className="text-xs text-brand-charcoal/80 leading-relaxed font-light max-w-sm mx-auto">
                  Thank you, <strong className="font-semibold">{formData.name || 'Patron'}</strong>. Your consultation dossier has been delivered to our concierge desk.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-medium text-brand-charcoal mb-1">
                      Your Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="e.g. Ayla Rahman"
                      className="w-full px-4 py-2.5 rounded-xl border border-brand-border text-xs text-brand-charcoal bg-brand-ivory/50 focus:outline-none focus:border-brand-charcoal"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-brand-charcoal mb-1">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="e.g. ayla@example.com"
                      className="w-full px-4 py-2.5 rounded-xl border border-brand-border text-xs text-brand-charcoal bg-brand-ivory/50 focus:outline-none focus:border-brand-charcoal"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-medium text-brand-charcoal mb-1">
                    Nature of Inquiry
                  </label>
                  <select
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl border border-brand-border text-xs text-brand-charcoal bg-brand-ivory/50 focus:outline-none focus:border-brand-charcoal"
                  >
                    <option value="Bespoke Order & Styling Concierge">Bespoke Order & Styling Concierge</option>
                    <option value="Silk Sizing & Fit Advice">Silk Sizing & Fit Advice</option>
                    <option value="High Jewellery & Watch Consultation">High Jewellery & Watch Consultation</option>
                    <option value="VIP Client Salon Appointment">VIP Client Salon Appointment</option>
                    <option value="Corporate / Wedding Gifting">Corporate / Wedding Gifting</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-medium text-brand-charcoal mb-1">
                    Your Message *
                  </label>
                  <textarea
                    required
                    rows={5}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Describe your inquiry or styling request..."
                    className="w-full px-4 py-2.5 rounded-xl border border-brand-border text-xs text-brand-charcoal bg-brand-ivory/50 focus:outline-none focus:border-brand-charcoal"
                  />
                </div>

                <button
                  type="submit"
                  className="px-8 py-3.5 bg-brand-charcoal text-white hover:bg-brand-rose rounded-xl text-xs uppercase tracking-widest font-semibold transition shadow-md flex items-center justify-center gap-2"
                >
                  <span>Submit Inquiry</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

