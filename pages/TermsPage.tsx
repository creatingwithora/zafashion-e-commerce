import React from 'react';
import { Link } from 'react-router-dom';

const TermsPage: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto py-12 px-4">
      <Link to="/" className="text-brand-orange hover:underline mb-6 inline-block">
        ← Back to Home
      </Link>

      <h1 className="text-4xl font-black text-navy-900 mb-8">Terms & Conditions</h1>

      <div className="prose prose-slate max-w-none space-y-6 text-slate-700">
        <section>
          <h2 className="text-2xl font-bold text-navy-900 mb-4">1. Introduction</h2>
          <p>
            Welcome to ZaFashion. By accessing and using our website, you agree to be bound by these Terms and Conditions.
            If you do not agree with any part of these terms, please do not use our services.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-navy-900 mb-4">2. Use of Website</h2>
          <p>You agree to use this website only for lawful purposes and in a manner that does not infringe the rights of others.</p>
          <ul className="list-disc pl-6 space-y-2">
            <li>You must be at least 18 years old to make purchases</li>
            <li>You must provide accurate and complete information</li>
            <li>You are responsible for maintaining the confidentiality of your account</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-navy-900 mb-4">3. Products and Pricing</h2>
          <p>
            All product descriptions, images, and prices are subject to change without notice.
            We reserve the right to limit quantities and refuse service to anyone at our discretion.
          </p>
          <p className="mt-3">
            Prices are listed in South African Rand (ZAR) and include 15% VAT where applicable.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-navy-900 mb-4">4. Payments</h2>
          <p>
            We accept payments via credit/debit cards processed securely through Stripe.
            Payment is required at the time of order placement.
          </p>
          <p className="mt-3">
            We do not store your credit card information. All payment data is handled by our
            PCI-compliant payment processor, Stripe.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-navy-900 mb-4">5. Shipping & Delivery</h2>
          <p>
            We offer free shipping to all South African addresses. Delivery takes 3-5 business days.
          </p>
          <p className="mt-3">
            You will receive an order confirmation email after successful payment.
            We are not responsible for delays caused by courier services.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-navy-900 mb-4">6. Returns & Refunds</h2>
          <p>
            Please see our <Link to="/refund-policy" className="text-brand-orange hover:underline">Refund Policy</Link> for
            detailed information about returns and refunds.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-navy-900 mb-4">7. Limitation of Liability</h2>
          <p>
            ZaFashion shall not be liable for any indirect, incidental, or consequential damages
            arising from the use of our website or products.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-navy-900 mb-4">8. Changes to Terms</h2>
          <p>
            We reserve the right to modify these terms at any time. Changes will be effective
            immediately upon posting to this page.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-navy-900 mb-4">9. Contact Information</h2>
          <p>
            For questions about these Terms & Conditions, please contact us at:
          </p>
          <p className="mt-2 font-semibold">
            Email: support@zafashion.co.za
          </p>
        </section>

        <p className="text-sm text-slate-500 mt-12 pt-6 border-t">
          Last updated: January 14, 2026
        </p>
      </div>
    </div>
  );
};

export default TermsPage;
