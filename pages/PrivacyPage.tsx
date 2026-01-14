import React from 'react';
import { Link } from 'react-router-dom';

const PrivacyPage: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto py-12 px-4">
      <Link to="/" className="text-brand-orange hover:underline mb-6 inline-block">
        ← Back to Home
      </Link>

      <h1 className="text-4xl font-black text-navy-900 mb-8">Privacy Policy</h1>

      <div className="prose prose-slate max-w-none space-y-6 text-slate-700">
        <section>
          <h2 className="text-2xl font-bold text-navy-900 mb-4">1. Information We Collect</h2>
          <p>We collect information that you provide directly to us when you:</p>
          <ul className="list-disc pl-6 space-y-2">
            <li>Create an account or place an order</li>
            <li>Subscribe to our newsletter</li>
            <li>Contact customer support</li>
          </ul>
          <p className="mt-4">This information may include:</p>
          <ul className="list-disc pl-6 space-y-2">
            <li>Name and email address</li>
            <li>Shipping and billing address</li>
            <li>Payment information (processed securely by Stripe)</li>
            <li>Purchase history</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-navy-900 mb-4">2. How We Use Your Information</h2>
          <p>We use the information we collect to:</p>
          <ul className="list-disc pl-6 space-y-2">
            <li>Process and fulfill your orders</li>
            <li>Send order confirmations and shipping updates</li>
            <li>Respond to your questions and provide customer support</li>
            <li>Send marketing communications (with your consent)</li>
            <li>Improve our website and services</li>
            <li>Prevent fraud and enhance security</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-navy-900 mb-4">3. Information Sharing</h2>
          <p>We do not sell your personal information. We may share your information with:</p>
          <ul className="list-disc pl-6 space-y-2">
            <li><strong>Payment Processors:</strong> Stripe processes payments securely</li>
            <li><strong>Shipping Partners:</strong> To deliver your orders</li>
            <li><strong>Analytics Services:</strong> To understand how our site is used</li>
            <li><strong>Legal Requirements:</strong> When required by law</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-navy-900 mb-4">4. Data Security</h2>
          <p>
            We implement appropriate security measures to protect your personal information.
            All payment data is encrypted and processed through Stripe's PCI-compliant infrastructure.
          </p>
          <p className="mt-3">
            However, no method of transmission over the internet is 100% secure.
            We cannot guarantee absolute security.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-navy-900 mb-4">5. Cookies</h2>
          <p>
            We use cookies and similar technologies to enhance your browsing experience,
            analyze site traffic, and understand where our visitors are coming from.
          </p>
          <p className="mt-3">
            You can control cookies through your browser settings, but disabling them may
            affect your ability to use certain features of our website.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-navy-900 mb-4">6. Your Rights</h2>
          <p>You have the right to:</p>
          <ul className="list-disc pl-6 space-y-2">
            <li>Access the personal information we hold about you</li>
            <li>Request correction of inaccurate information</li>
            <li>Request deletion of your information</li>
            <li>Opt-out of marketing communications</li>
            <li>Object to processing of your personal information</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-navy-900 mb-4">7. Children's Privacy</h2>
          <p>
            Our website is not intended for children under 18. We do not knowingly collect
            personal information from children.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-navy-900 mb-4">8. Changes to Privacy Policy</h2>
          <p>
            We may update this Privacy Policy from time to time. We will notify you of any
            changes by posting the new policy on this page.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-navy-900 mb-4">9. Contact Us</h2>
          <p>
            If you have questions about this Privacy Policy or our data practices, please contact us:
          </p>
          <p className="mt-2 font-semibold">
            Email: privacy@zafashion.co.za
          </p>
        </section>

        <p className="text-sm text-slate-500 mt-12 pt-6 border-t">
          Last updated: January 14, 2026
        </p>
      </div>
    </div>
  );
};

export default PrivacyPage;
