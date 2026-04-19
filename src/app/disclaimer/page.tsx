import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { LegalPage } from '@/components/layout/LegalPage';

export const metadata = {
  title: 'Disclaimer | STYL Digital Marketing',
  description: 'Important disclaimers regarding STYL Digital Marketing\'s services and website content.',
};

export default function DisclaimerPage() {
  return (
    <>
      <Navbar />
      <LegalPage title="Disclaimer" lastUpdated="April 2025">
        <h2>1. General Information</h2>
        <p>
          The information provided on <strong>doitinstyl.com</strong> is for general informational purposes only. STYL Digital Marketing (&quot;we&quot;, &quot;our&quot;, or &quot;us&quot;) makes no representations or warranties of any kind, express or implied, about the completeness, accuracy, reliability, suitability, or availability of the information, products, services, or related graphics contained on the website.
        </p>

        <h2>2. No Professional Advice</h2>
        <p>
          The content on this website does not constitute professional medical, legal, financial, or business advice. All case studies, results, and testimonials presented are specific to the clients and circumstances described and should not be taken as a guarantee of similar outcomes for your organisation.
        </p>

        <h2>3. Results and Performance</h2>
        <p>
          Any results, statistics, or metrics cited on this website (including but not limited to ROI figures, patient footfall increases, or lead generation improvements) represent past performance of specific client engagements. These results:
        </p>
        <ul>
          <li>Are not guaranteed for any future client or campaign</li>
          <li>Depend on multiple factors including market conditions, budget, client cooperation, and industry dynamics</li>
          <li>Should not be relied upon as a promise or guarantee of future performance</li>
        </ul>

        <h2>4. Healthcare Marketing Compliance</h2>
        <p>
          STYL Digital Marketing endeavours to ensure that all healthcare marketing campaigns comply with applicable Indian regulations, including guidelines issued by the Medical Council of India and the Advertising Standards Council of India (ASCI). However, it is the client&apos;s responsibility to ensure that all content approved and published complies with the specific regulations governing their medical specialty and practice.
        </p>

        <h2>5. Third-Party Links</h2>
        <p>
          Our website may contain links to third-party websites. These links are provided for your convenience. We have no control over the content of those sites and accept no responsibility for them or for any loss or damage that may arise from your use of them.
        </p>

        <h2>6. Intellectual Property</h2>
        <p>
          All content on this website — including text, graphics, logos, images, and video — is the property of STYL Digital Marketing or its content suppliers and is protected under applicable intellectual property laws. Please see our <a href="/copyright">Copyright and Content Usage Policy</a> for details on permitted use.
        </p>

        <h2>7. Limitation of Liability</h2>
        <p>
          To the fullest extent permitted by applicable law, STYL Digital Marketing shall not be liable for any indirect, incidental, special, consequential, or punitive damages arising from your use of, or reliance on, any content or information on this website.
        </p>

        <h2>8. Accuracy of Information</h2>
        <p>
          While we strive to keep information on this website accurate and up to date, we make no warranty that the website will be error-free or uninterrupted. We reserve the right to modify or remove content at any time without notice.
        </p>

        <h2>9. Contact Us</h2>
        <p>If you have questions about this Disclaimer, please contact:</p>
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
