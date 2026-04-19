import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { LegalPage } from '@/components/layout/LegalPage';

export const metadata = {
  title: 'Copyright & Content Usage Policy | STYL Digital Marketing',
  description: 'Terms governing the use of content created by or for STYL Digital Marketing.',
};

export default function CopyrightPage() {
  return (
    <>
      <Navbar />
      <LegalPage title="Copyright & Content Usage Policy" lastUpdated="April 2025">
        <h2>1. Ownership of Website Content</h2>
        <p>
          All content published on <strong>doitinstyl.com</strong> — including text, graphics, logos, icons, images, audio clips, video clips, digital downloads, and data compilations — is the property of STYL Digital Marketing or its licensors and is protected under the Copyright Act, 1957 (India) and applicable international intellectual property laws.
        </p>
        <p>
          The STYL name, logo, and all related product and service names, design marks, and slogans are trademarks or registered trademarks of STYL Digital Marketing. You may not use these marks without our prior written consent.
        </p>

        <h2>2. Permitted Use of Website Content</h2>
        <p>You are permitted to:</p>
        <ul>
          <li>View and access the website content for personal, non-commercial use</li>
          <li>Share links to our website pages on social media or in communications</li>
          <li>Quote brief excerpts (up to 50 words) with clear attribution and a link back to the original source</li>
        </ul>

        <h2>3. Prohibited Use of Website Content</h2>
        <p>Without our express prior written permission, you may <strong>not</strong>:</p>
        <ul>
          <li>Copy, reproduce, republish, or distribute our content in any medium</li>
          <li>Use our content for commercial purposes or in any product or service</li>
          <li>Modify, adapt, or create derivative works from our content</li>
          <li>Remove or alter any copyright, trademark, or proprietary notices</li>
          <li>Scrape or systematically download content from our website</li>
          <li>Use our brand assets (logos, images, graphics) in any format without permission</li>
        </ul>

        <h2>4. Client-Owned Deliverables</h2>
        <p>
          Content created exclusively for a client under a signed service agreement becomes the property of the client upon full payment of all applicable fees. This includes:
        </p>
        <ul>
          <li>Custom graphics, videos, and ad creatives produced for the client</li>
          <li>Written content, copy, and scripts created for the client&apos;s brand</li>
          <li>Website code and designs built specifically for the client</li>
        </ul>
        <p>
          STYL Digital Marketing retains the right to display work produced for clients in our portfolio, case studies, and marketing materials, unless the client explicitly requests otherwise in writing.
        </p>

        <h2>5. STYL-Owned Elements in Client Work</h2>
        <p>
          Certain elements used in client deliverables remain the property of STYL Digital Marketing and are licensed (not transferred) to the client for use within the agreed scope. These include:
        </p>
        <ul>
          <li>Proprietary frameworks, templates, and methodologies</li>
          <li>Pre-existing design assets adapted for the client</li>
          <li>Third-party licensed assets (stock footage, music, imagery) — which are subject to the respective third-party licence terms</li>
        </ul>

        <h2>6. Third-Party Content</h2>
        <p>
          Where our website incorporates content licensed from third parties (such as stock photography or embedded videos), that content remains subject to the original licensor&apos;s terms. We endeavour to use only properly licensed third-party content.
        </p>

        <h2>7. Reporting Copyright Infringement</h2>
        <p>
          If you believe that any content on our website infringes your copyright, please notify us with:
        </p>
        <ul>
          <li>A description of the copyrighted work you believe has been infringed</li>
          <li>A description of where the infringing material appears on our website</li>
          <li>Your contact information</li>
          <li>A statement that you have a good-faith belief that the use is not authorised</li>
        </ul>
        <p>Send notices to: <a href="mailto:styldoitwithit@gmail.com">styldoitwithit@gmail.com</a></p>

        <h2>8. Contact Us</h2>
        <p>For permissions, licensing enquiries, or questions about this policy:</p>
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
