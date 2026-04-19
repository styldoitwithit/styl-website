import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { LegalPage } from '@/components/layout/LegalPage';

export const metadata = {
  title: 'Cookie Policy | STYL Digital Marketing',
  description: 'How STYL Digital Marketing uses cookies and similar tracking technologies on our website.',
};

export default function CookiePolicyPage() {
  return (
    <>
      <Navbar />
      <LegalPage title="Cookie Policy" lastUpdated="April 2025">
        <h2>1. What Are Cookies?</h2>
        <p>
          Cookies are small text files placed on your device when you visit a website. They help the website remember your preferences, improve performance, and provide anonymised data on how visitors use the site.
        </p>

        <h2>2. How We Use Cookies</h2>
        <p>STYL Digital Marketing uses cookies on <strong>doitinstyl.com</strong> for the following purposes:</p>

        <h3>2.1 Essential Cookies</h3>
        <p>
          These cookies are necessary for the website to function correctly. They enable core features such as page navigation, secure area access, and session management. The website cannot function properly without these cookies.
        </p>
        <table>
          <thead>
            <tr>
              <th>Cookie</th>
              <th>Purpose</th>
              <th>Duration</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>__session</td>
              <td>Maintains your session state</td>
              <td>Session</td>
            </tr>
          </tbody>
        </table>

        <h3>2.2 Analytics Cookies</h3>
        <p>
          These cookies help us understand how visitors interact with our website by collecting and reporting information anonymously. This allows us to improve our site and services.
        </p>
        <table>
          <thead>
            <tr>
              <th>Cookie</th>
              <th>Provider</th>
              <th>Purpose</th>
              <th>Duration</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>_ga</td>
              <td>Google Analytics</td>
              <td>Distinguishes unique users</td>
              <td>2 years</td>
            </tr>
            <tr>
              <td>_ga_*</td>
              <td>Google Analytics</td>
              <td>Session state persistence</td>
              <td>2 years</td>
            </tr>
          </tbody>
        </table>

        <h3>2.3 Preference Cookies</h3>
        <p>
          These cookies allow the website to remember choices you make (such as language preferences) and provide enhanced, more personal features.
        </p>

        <h3>2.4 Marketing Cookies</h3>
        <p>
          These cookies may be set through our site by advertising partners to build a profile of your interests and show you relevant advertising on other sites. They do not store personal information directly but are based on uniquely identifying your browser and device.
        </p>

        <h2>3. Third-Party Cookies</h2>
        <p>
          Some cookies on our website are placed by third-party services we use, including:
        </p>
        <ul>
          <li><strong>Google Analytics</strong> — website usage analytics</li>
          <li><strong>Firebase</strong> — content delivery and performance</li>
          <li><strong>Instagram/Meta</strong> — embedded social media content (where applicable)</li>
        </ul>
        <p>
          These third parties have their own privacy policies governing their use of cookies. We recommend reviewing their policies for full details.
        </p>

        <h2>4. Managing Your Cookie Preferences</h2>
        <p>You can control and manage cookies in several ways:</p>
        <ul>
          <li>
            <strong>Browser settings:</strong> Most browsers allow you to refuse cookies or delete existing ones. Visit your browser&apos;s help section for instructions:
            <ul>
              <li><a href="https://support.google.com/chrome/answer/95647" target="_blank" rel="noopener noreferrer">Google Chrome</a></li>
              <li><a href="https://support.mozilla.org/en-US/kb/enable-and-disable-cookies-website-preferences" target="_blank" rel="noopener noreferrer">Mozilla Firefox</a></li>
              <li><a href="https://support.apple.com/en-gb/guide/safari/sfri11471/mac" target="_blank" rel="noopener noreferrer">Safari</a></li>
              <li><a href="https://support.microsoft.com/en-us/microsoft-edge/delete-cookies-in-microsoft-edge-63947406-40ac-c3b8-57b9-2a946a29ae09" target="_blank" rel="noopener noreferrer">Microsoft Edge</a></li>
            </ul>
          </li>
          <li>
            <strong>Google Analytics opt-out:</strong> Install the <a href="https://tools.google.com/dlpage/gaoptout" target="_blank" rel="noopener noreferrer">Google Analytics Opt-out Browser Add-on</a>.
          </li>
        </ul>
        <p>
          Please note that disabling certain cookies may affect the functionality of our website.
        </p>

        <h2>5. Changes to This Policy</h2>
        <p>
          We may update this Cookie Policy from time to time to reflect changes in technology, regulation, or our business practices. We will post the updated policy on this page with a revised date.
        </p>

        <h2>6. Contact Us</h2>
        <p>If you have questions about our use of cookies, please contact:</p>
        <p>
          <strong>STYL Digital Marketing</strong><br />
          Email: <a href="mailto:styldoitwithit@gmail.com">styldoitwithit@gmail.com</a><br />
          Phone: <a href="tel:+919150088334">+91 91500 88334</a>
        </p>
      </LegalPage>
      <Footer />
    </>
  );
}
