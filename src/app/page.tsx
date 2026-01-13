'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Header } from '@/components/shared/Header';
import { Footer } from '@/components/shared/Footer';
import { Hero } from '@/components/landing/Hero';
import { Program } from '@/components/landing/Program';
import { Universities } from '@/components/landing/Universities';
import { Pricing } from '@/components/landing/Pricing';
import { Team } from '@/components/landing/Team';
import { Testimonials } from '@/components/landing/Testimonials';
import { FAQ } from '@/components/landing/FAQ';
import { CTA } from '@/components/landing/CTA';
import { PaymentModal } from '@/components/PaymentModal';
import { ConsultationModal } from '@/components/ConsultationModal';
import { PricingTier } from '@/types';

export default function Home() {
  const router = useRouter();
  const [selectedTier, setSelectedTier] = useState<PricingTier | null>(null);
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);
  const [isConsultationModalOpen, setIsConsultationModalOpen] = useState(false);

  const handleStartAssessment = () => {
    router.push('/assessment');
  };

  const handleBookConsultation = () => {
    setIsConsultationModalOpen(true);
  };

  const handleSelectTier = (tier: PricingTier) => {
    setSelectedTier(tier);
    setIsPaymentModalOpen(true);
  };

  return (
    <main className="min-h-screen">
      <Header />

      <Hero
        onStartAssessment={handleStartAssessment}
        onBookConsultation={handleBookConsultation}
      />

      <Program />

      <Universities />

      <Pricing onSelectTier={handleSelectTier} />

      <Team />

      <Testimonials />

      <FAQ />

      <CTA onStartAssessment={handleStartAssessment} />

      <Footer />

      <PaymentModal
        isOpen={isPaymentModalOpen}
        onClose={() => setIsPaymentModalOpen(false)}
        tier={selectedTier}
      />

      <ConsultationModal
        isOpen={isConsultationModalOpen}
        onClose={() => setIsConsultationModalOpen(false)}
      />
    </main>
  );
}
