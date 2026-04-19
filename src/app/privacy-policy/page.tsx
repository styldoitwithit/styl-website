import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { LegalPage } from '@/components/layout/LegalPage';

export const metadata = {
  title: 'Privacy Policy | STYL Digital Marketing',
  description: 'How STYL Digital Marketing collects, uses, and protects your personal information.',
};

export default function PrivacyPolicyPage() {
  return (
    <>
      <Navbar />
      <LegalPage title="Privacy Policy" lastUpdated="April 2025">
        <h2>1. Introduction</h2>
        <p>
          STYL Digital Marketing (&quot;we&quot;, &quot;our&quot;, or &quot;us&quot;), headquartered at Phase 1, GREETA TOWERS, Greeta Techpark, No: 99, Rajiv Gandhi Salai, Industrial Estate, Perungudi, Chennai, Tamil Nadu 600096, is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website <strong>doitinstyl.com</strong> or engage our services.
        </p>
        <p>
          By using our website or services, you consent to the data practices described in this policy. If you do not agree, please do not use our website or services.
        </p>

        <h2>2. Information We Collect</h2>
        <h3>2.1 Information You Provide Directly</h3>
        <ul>
          <li><strong>Contact forms:</strong> Name, email address, phone number, and message content when you reach out to us.</li>
          <li><strong>Service enquiries:</strong> Business name, role, and project details when you request a proposal or consultation.</li>
          <li><strong>Email correspondence:</strong> Any information you share when communicating with our team.</li>
        </ul>
        <h3>2.2 Information Collected Automatically</h3>
        <ul>
          <li><strong>Usage data:</strong> Pages visited, time spent on pages, referring URLs, and browser/device type.</li>
          <li><strong>Cookies and tracking technologies:</strong> Session cookies, preference cookies, and analytics cookies. See our <a href="/cookie-policy">Cookie Policy</a> for details.</li>
          <li><strong>IP address:</strong> Collected automatically for security and analytics purposes.</li>
        </ul>

        <h2>3. How We Use Your Information</h2>
        <p>We use the information we collect to:</p>
        <ul>
          <li>Respond to your enquiries and provide our services</li>
          <li>Send you proposals, reports, and service updates</li>
          <li>Improve our website, content, and service offerings</li>
          <li>Comply with legal obligations</li>
          <li>Detect and prevent fraud or misuse</li>
          <li>Send marketing communications (only with your consent, and you may opt out at any time)</li>
        </ul>

        <h2>4. Sharing Your Information</h2>
        <p>We do not sell, rent, or trade your personal information. We may share it with:</p>
        <ul>
          <li><strong>Service providers:</strong> Trusted third parties (e.g., hosting, analytics, email platforms) who process data on our behalf under strict confidentiality agreements.</li>
          <li><strong>Legal requirements:</strong> When required by law, court order, or governmental authority.</li>
          <li><strong>Business transfers:</strong> In connection with a merger, acquisition, or sale of assets, with notice to affected users.</li>
        </ul>

        <h2>5. Data Retention</h2>
        <p>
          We retain your personal information only as long as necessary to fulfil the purposes outlined in this policy or as required by law. Contact form submissions are retained for up to 3 years. Client project data is retained for the duration of the engagement and 5 years thereafter.
        </p>

        <h2>6. Your Rights</h2>
        <p>Under applicable Indian data protection law, you have the right to:</p>
        <ul>
          <li>Access the personal data we hold about you</li>
          <li>Request correction of inaccurate data</li>
          <li>Request deletion of your data (subject to legal obligations)</li>
          <li>Withdraw consent for marketing communications at any time</li>
          <li>Lodge a complaint with the relevant data protection authority</li>
        </ul>
        <p>To exercise these rights, contact us at <a href="mailto:styldoitwithit@gmail.com">styldoitwithit@gmail.com</a>.</p>

        <h2>7. Cookies</h2>
        <p>
          We use cookies to enhance your browsing experience and analyse site traffic. Please see our <a href="/cookie-policy">Cookie Policy</a> for full details on what cookies we use and how to manage them.
        </p>

        <h2>8. Third-Party Links</h2>
        <p>
          Our website may contain links to third-party websites (including our social media pages). We are not responsible for the privacy practices of those sites and encourage you to read their privacy policies.
        </p>

        <h2>9. Children&apos;s Privacy</h2>
        <p>
          Our services are not directed to individuals under the age of 18. We do not knowingly collect personal information from minors. If you believe we have inadvertently collected such information, please contact us immediately.
        </p>

        <h2>10. Security</h2>
        <p>
          We implement industry-standard technical and organisational measures to protect your data against unauthorised access, loss, or disclosure. However, no method of transmission over the internet is 100% secure, and we cannot guarantee absolute security.
        </p>

        <h2>11. Changes to This Policy</h2>
        <p>
          We may update this Privacy Policy periodically. We will notify you of significant changes by posting the new policy on this page with a revised date. Your continued use of our website after changes constitutes acceptance of the updated policy.
        </p>

        <h2>12. Contact Us</h2>
        <p>If you have questions or concerns about this Privacy Policy, please contact:</p>
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
