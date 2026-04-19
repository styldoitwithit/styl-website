import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { LegalPage } from '@/components/layout/LegalPage';

export const metadata = {
  title: 'Refund & Cancellation Policy | STYL Digital Marketing',
  description: 'STYL Digital Marketing\'s policies on refunds, cancellations, and service termination.',
};

export default function RefundPolicyPage() {
  return (
    <>
      <Navbar />
      <LegalPage title="Refund & Cancellation Policy" lastUpdated="April 2025">
        <h2>1. Overview</h2>
        <p>
          At STYL Digital Marketing, we are committed to delivering high-quality digital marketing services to our healthcare clients. This policy outlines the terms governing refunds and cancellations for our services. Please read this carefully before engaging our services.
        </p>

        <h2>2. Service Commencement and Payments</h2>
        <p>
          Our services are offered on a retainer or project basis as agreed in your service agreement. Payment schedules, milestones, and terms are defined in the signed agreement between STYL Digital Marketing and the client. Work commences only after receipt of the agreed upfront payment or deposit.
        </p>

        <h2>3. Cancellation by the Client</h2>
        <h3>3.1 Retainer Services</h3>
        <p>
          For ongoing monthly retainer engagements, clients may cancel by providing a minimum of <strong>30 days&apos; written notice</strong> before the next billing cycle. No refund will be issued for the current active billing period. Services will continue through the end of the paid period.
        </p>
        <h3>3.2 Project-Based Services</h3>
        <p>
          For fixed-scope projects (e.g., website development, ad production, brand strategy), the following cancellation terms apply:
        </p>
        <ul>
          <li><strong>Before project commencement:</strong> Full refund of any advance paid, minus a 10% administrative fee.</li>
          <li><strong>After commencement but before 50% completion:</strong> 50% of the total project fee is non-refundable to cover work already completed.</li>
          <li><strong>After 50% or more completion:</strong> No refund will be issued. Any deliverables completed to date will be provided to the client.</li>
        </ul>

        <h2>4. Cancellation by STYL Digital Marketing</h2>
        <p>
          We reserve the right to terminate a service engagement under the following circumstances:
        </p>
        <ul>
          <li>Non-payment or persistent delayed payment beyond agreed terms</li>
          <li>Client conduct that violates our terms of service or is damaging to our team</li>
          <li>Requests to produce content that violates applicable law, medical regulations, or ethical standards</li>
          <li>Circumstances beyond our reasonable control (force majeure)</li>
        </ul>
        <p>
          In the event of termination by us due to reasons within our control, a pro-rated refund for unrendered services will be issued within 14 business days.
        </p>

        <h2>5. Refunds for Dissatisfaction</h2>
        <p>
          If you are dissatisfied with a deliverable, we encourage you to raise concerns within <strong>7 days of delivery</strong> so we can address them through revisions as per the agreed scope. We do not offer refunds solely on grounds of subjective dissatisfaction once deliverables have been accepted.
        </p>
        <p>
          For legitimate quality failures where deliverables do not meet the agreed specifications, we will first offer to redo the work. If a resolution cannot be reached, a partial refund proportionate to the failed deliverable may be issued at our discretion.
        </p>

        <h2>6. Third-Party Costs</h2>
        <p>
          Any third-party costs incurred on your behalf — including but not limited to advertising spend, software subscriptions, stock media licences, or domain registrations — are non-refundable once committed. These charges are passed through at cost and are governed by the respective third-party terms.
        </p>

        <h2>7. How to Request a Refund or Cancellation</h2>
        <p>
          To initiate a cancellation or refund request, please contact us in writing:
        </p>
        <p>
          Email: <a href="mailto:styldoitwithit@gmail.com">styldoitwithit@gmail.com</a><br />
          Subject line: <em>Cancellation/Refund Request — [Your Company Name]</em>
        </p>
        <p>
          We will acknowledge your request within 2 business days and process eligible refunds within 14 business days of approval.
        </p>

        <h2>8. Changes to This Policy</h2>
        <p>
          We reserve the right to update this policy at any time. Changes will be posted on this page and will apply to new engagements entered into after the updated policy date.
        </p>

        <h2>9. Contact Us</h2>
        <p>
          <strong>STYL Digital Marketing</strong><br />
          Phase 1, GREETA TOWERS, Greeta Techpark, No: 99, Rajiv Gandhi Salai,<br />
          Industrial Estate, Perungudi, Chennai, Tamil Nadu 600096<br />
          Email: <a href="mailto:styldoitwithit@gmail.com">styldoitwithit@gmail.com</a><br />
          Phone: <a href="tel:+919150088334">+91 91500 88334</a>
        </p>
      </LegalPage>
      <Footer />
    </>
  );
}
