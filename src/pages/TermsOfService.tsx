import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useDocumentTitle } from "@/hooks/useDocumentTitle";

const TermsOfService = () => {
  useDocumentTitle("Terms of Service - ICT Club");

  return (
    <main className="min-h-screen bg-background py-16">
      <div className="container mx-auto px-4 max-w-4xl">
        <Card>
          <CardHeader>
            <CardTitle className="text-3xl font-bold text-center">Terms of Service</CardTitle>
            <p className="text-muted-foreground text-center">Last updated: {new Date().toLocaleDateString()}</p>
          </CardHeader>
          <CardContent className="prose prose-gray max-w-none dark:prose-invert">
            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">1. Acceptance of Terms</h2>
              <p className="mb-4">By accessing and using the ICT Club website and services, you accept and agree to be bound by the terms and provision of this agreement. If you do not agree to abide by the above, please do not use this service.</p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">2. Membership and Registration</h2>
              <h3 className="text-xl font-medium mb-2">Eligibility</h3>
              <p className="mb-4">To become a member of the ICT Club, you must:</p>
              <ul className="list-disc pl-6 mb-4">
                <li>Be a current student of the university</li>
                <li>Provide accurate and complete registration information</li>
                <li>Maintain the confidentiality of your account credentials</li>
                <li>Accept responsibility for all activities under your account</li>
              </ul>
              
              <h3 className="text-xl font-medium mb-2">Account Responsibility</h3>
              <p className="mb-4">You are responsible for:</p>
              <ul className="list-disc pl-6 mb-4">
                <li>Maintaining accurate account information</li>
                <li>Keeping your password secure</li>
                <li>Notifying us of any unauthorized access</li>
                <li>All activities that occur under your account</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">3. Quiz and Assessment Rules</h2>
              <h3 className="text-xl font-medium mb-2">Fair Play Policy</h3>
              <p className="mb-4">When participating in quizzes, you must:</p>
              <ul className="list-disc pl-6 mb-4">
                <li>Complete quizzes independently without external assistance</li>
                <li>Not share quiz questions or answers with others</li>
                <li>Take each quiz only once per week as permitted</li>
                <li>Report any technical issues or suspected cheating</li>
              </ul>

              <h3 className="text-xl font-medium mb-2">Quiz Restrictions</h3>
              <p className="mb-4">Quiz participation is subject to:</p>
              <ul className="list-disc pl-6 mb-4">
                <li>Weekly limits per category (Science, General Knowledge, IQ)</li>
                <li>Time limits during quiz sessions</li>
                <li>Monthly performance tracking</li>
                <li>Leaderboard eligibility requirements</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">4. Content and Conduct</h2>
              <h3 className="text-xl font-medium mb-2">User-Generated Content</h3>
              <p className="mb-4">When posting content on our platform, you agree to:</p>
              <ul className="list-disc pl-6 mb-4">
                <li>Own or have permission to share the content</li>
                <li>Not post offensive, harmful, or inappropriate material</li>
                <li>Respect intellectual property rights</li>
                <li>Allow us to use your content for club purposes</li>
              </ul>

              <h3 className="text-xl font-medium mb-2">Prohibited Activities</h3>
              <p className="mb-4">You may not:</p>
              <ul className="list-disc pl-6 mb-4">
                <li>Use the service for illegal or unauthorized purposes</li>
                <li>Attempt to gain unauthorized access to our systems</li>
                <li>Interfere with or disrupt the service</li>
                <li>Create multiple accounts to bypass restrictions</li>
                <li>Harass, abuse, or harm other users</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">5. Events and Activities</h2>
              <p className="mb-4">Participation in ICT Club events is subject to:</p>
              <ul className="list-disc pl-6 mb-4">
                <li>Event-specific terms and conditions</li>
                <li>Registration deadlines and requirements</li>
                <li>Conduct expectations during events</li>
                <li>Safety and security protocols</li>
                <li>Photography and media consent for promotional purposes</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">6. Intellectual Property</h2>
              <p className="mb-4">All content, features, and functionality of the ICT Club website are owned by the club and are protected by copyright, trademark, and other intellectual property laws.</p>
              <p className="mb-4">You may not:</p>
              <ul className="list-disc pl-6 mb-4">
                <li>Copy, modify, or distribute our content without permission</li>
                <li>Use our trademarks or logos without authorization</li>
                <li>Reverse engineer or attempt to extract source code</li>
                <li>Create derivative works based on our content</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">7. Disclaimers and Limitations</h2>
              <h3 className="text-xl font-medium mb-2">Service Availability</h3>
              <p className="mb-4">We strive to maintain service availability but cannot guarantee:</p>
              <ul className="list-disc pl-6 mb-4">
                <li>Uninterrupted access to the service</li>
                <li>Error-free operation</li>
                <li>Compatibility with all devices and browsers</li>
                <li>Data backup and recovery</li>
              </ul>

              <h3 className="text-xl font-medium mb-2">Limitation of Liability</h3>
              <p className="mb-4">The ICT Club shall not be liable for any indirect, incidental, special, or consequential damages resulting from your use of the service.</p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">8. Termination</h2>
              <p className="mb-4">We reserve the right to:</p>
              <ul className="list-disc pl-6 mb-4">
                <li>Terminate or suspend accounts that violate these terms</li>
                <li>Remove content that violates our policies</li>
                <li>Modify or discontinue services with notice</li>
                <li>Investigate suspected violations and cooperate with authorities</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">9. Changes to Terms</h2>
              <p className="mb-4">We may revise these terms of service from time to time. The most current version will always be posted on this page. Continued use of the service after changes constitutes acceptance of the new terms.</p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">10. Contact Information</h2>
              <p className="mb-4">For questions about these terms of service, please contact us at:</p>
              <p className="mb-2"><strong>Email:</strong> legal@ictclub.edu</p>
              <p className="mb-2"><strong>Address:</strong> ICT Club, University Campus</p>
            </section>
          </CardContent>
        </Card>
      </div>
    </main>
  );
};

export default TermsOfService;