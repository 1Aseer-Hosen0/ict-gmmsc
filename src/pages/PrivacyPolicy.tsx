import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useDocumentTitle } from "@/hooks/useDocumentTitle";

const PrivacyPolicy = () => {
  useDocumentTitle("Privacy Policy - ICT Club");

  return (
    <main className="min-h-screen bg-background py-16">
      <div className="container mx-auto px-4 max-w-4xl">
        <Card>
          <CardHeader>
            <CardTitle className="text-3xl font-bold text-center">Privacy Policy</CardTitle>
            <p className="text-muted-foreground text-center">Last updated: {new Date().toLocaleDateString()}</p>
          </CardHeader>
          <CardContent className="prose prose-gray max-w-none dark:prose-invert">
            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">1. Information We Collect</h2>
              <h3 className="text-xl font-medium mb-2">Personal Information</h3>
              <p className="mb-4">When you register for our ICT Club, we collect:</p>
              <ul className="list-disc pl-6 mb-4">
                <li>Full name and email address</li>
                <li>Student ID and contact information</li>
                <li>Department and academic year</li>
                <li>Profile information you choose to share</li>
              </ul>
              
              <h3 className="text-xl font-medium mb-2">Quiz and Activity Data</h3>
              <p className="mb-4">We collect information about your participation in:</p>
              <ul className="list-disc pl-6 mb-4">
                <li>Quiz attempts and scores</li>
                <li>Event attendance and participation</li>
                <li>Blog comments and interactions</li>
                <li>Monthly performance tracking</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">2. How We Use Your Information</h2>
              <p className="mb-4">We use the collected information to:</p>
              <ul className="list-disc pl-6 mb-4">
                <li>Provide and improve our club services</li>
                <li>Track your quiz performance and progress</li>
                <li>Send notifications about events and activities</li>
                <li>Generate leaderboards and performance analytics</li>
                <li>Communicate important club updates</li>
                <li>Ensure security and prevent misuse</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">3. Information Sharing</h2>
              <p className="mb-4">We do not sell, trade, or rent your personal information to third parties. We may share your information only in the following circumstances:</p>
              <ul className="list-disc pl-6 mb-4">
                <li>With your explicit consent</li>
                <li>For club-related activities and events</li>
                <li>To comply with legal obligations</li>
                <li>To protect our rights and safety</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">4. Data Security</h2>
              <p className="mb-4">We implement appropriate security measures to protect your personal information:</p>
              <ul className="list-disc pl-6 mb-4">
                <li>Encrypted data transmission</li>
                <li>Secure password hashing</li>
                <li>Regular security updates</li>
                <li>Limited access to personal data</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">5. Your Rights</h2>
              <p className="mb-4">You have the right to:</p>
              <ul className="list-disc pl-6 mb-4">
                <li>Access your personal information</li>
                <li>Update or correct your data</li>
                <li>Delete your account and data</li>
                <li>Opt-out of non-essential communications</li>
                <li>Export your data</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">6. Cookies and Tracking</h2>
              <p className="mb-4">We use cookies and similar technologies to:</p>
              <ul className="list-disc pl-6 mb-4">
                <li>Remember your login status</li>
                <li>Improve user experience</li>
                <li>Analyze website usage</li>
                <li>Maintain security</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">7. Changes to This Policy</h2>
              <p className="mb-4">We may update this privacy policy from time to time. We will notify you of any changes by posting the new policy on this page and updating the "last updated" date.</p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">8. Contact Us</h2>
              <p className="mb-4">If you have any questions about this privacy policy, please contact us at:</p>
              <p className="mb-2"><strong>Email:</strong> privacy@ictclub.edu</p>
              <p className="mb-2"><strong>Address:</strong> ICT Club, University Campus</p>
            </section>
          </CardContent>
        </Card>
      </div>
    </main>
  );
};

export default PrivacyPolicy;