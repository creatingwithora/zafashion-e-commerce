import React from 'react';
import { Link } from 'react-router-dom';

const RefundPage: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto py-12 px-4">
      <Link to="/" className="text-brand-orange hover:underline mb-6 inline-block">
        ← Back to Home
      </Link>

      <h1 className="text-4xl font-black text-navy-900 mb-8">Refund & Returns Policy</h1>

      <div className="prose prose-slate max-w-none space-y-6 text-slate-700">
        <section>
          <h2 className="text-2xl font-bold text-navy-900 mb-4">30-Day Money-Back Guarantee</h2>
          <p>
            We want you to be completely satisfied with your purchase. If you're not happy for any reason,
            you can return your item within 30 days of delivery for a full refund.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-navy-900 mb-4">Return Eligibility</h2>
          <p>To be eligible for a return, items must meet the following conditions:</p>
          <ul className="list-disc pl-6 space-y-2">
            <li>Items must be unworn and unwashed</li>
            <li>Items must have all original tags attached</li>
            <li>Items must be in their original packaging</li>
            <li>Return must be initiated within 30 days of delivery</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-navy-900 mb-4">Non-Returnable Items</h2>
          <p>Certain items cannot be returned for hygiene and safety reasons:</p>
          <ul className="list-disc pl-6 space-y-2">
            <li>Underwear and swimwear</li>
            <li>Final sale items marked as non-returnable</li>
            <li>Items damaged due to misuse</li>
            <li>Gift cards</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-navy-900 mb-4">How to Return an Item</h2>
          <ol className="list-decimal pl-6 space-y-3">
            <li>
              <strong>Contact Us:</strong> Email support@zafashion.co.za with your order number
              and reason for return
            </li>
            <li>
              <strong>Receive Return Authorization:</strong> We'll send you a return authorization
              number and instructions
            </li>
            <li>
              <strong>Pack Your Item:</strong> Place item in original packaging with tags attached
            </li>
            <li>
              <strong>Ship It Back:</strong> Use the prepaid shipping label we provide
              (South African orders only)
            </li>
          </ol>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-navy-900 mb-4">Refund Processing</h2>
          <p>
            Once we receive and inspect your return, we'll process your refund within 5-7 business days.
          </p>
          <ul className="list-disc pl-6 space-y-2 mt-3">
            <li>Refunds will be issued to your original payment method</li>
            <li>It may take an additional 5-10 business days for the refund to appear on your statement</li>
            <li>Original shipping costs are non-refundable (unless item was defective)</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-navy-900 mb-4">Exchanges</h2>
          <p>
            We currently don't offer direct exchanges. If you need a different size or color,
            please return the original item for a refund and place a new order.
          </p>
          <p className="mt-3">
            This ensures you receive your new item as quickly as possible!
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-navy-900 mb-4">Damaged or Defective Items</h2>
          <p>
            If you receive a damaged or defective item, please contact us immediately with photos.
            We'll send a replacement or issue a full refund, including shipping costs.
          </p>
          <p className="mt-3">
            For damaged items, you do NOT need to return the product. Just send us photos and
            we'll take care of it!
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-navy-900 mb-4">Late or Missing Refunds</h2>
          <p>If you haven't received your refund after 14 business days:</p>
          <ul className="list-disc pl-6 space-y-2">
            <li>Check your bank account again</li>
            <li>Contact your credit card company (it may take time to post)</li>
            <li>Contact your bank</li>
            <li>If you've done all of this and still haven't received your refund, contact us</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-navy-900 mb-4">Questions?</h2>
          <p>
            If you have any questions about returns or refunds, please don't hesitate to contact us:
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

export default RefundPage;
