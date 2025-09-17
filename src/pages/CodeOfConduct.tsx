import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useDocumentTitle } from "@/hooks/useDocumentTitle";

const CodeOfConduct = () => {
  useDocumentTitle("Code of Conduct - ICT Club");

  return (
    <main className="min-h-screen bg-background py-16">
      <div className="container mx-auto px-4 max-w-4xl">
        <Card>
          <CardHeader>
            <CardTitle className="text-3xl font-bold text-center">Code of Conduct</CardTitle>
            <p className="text-muted-foreground text-center">Guidelines for ICT Club Community</p>
          </CardHeader>
          <CardContent className="prose prose-gray max-w-none dark:prose-invert">
            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">Our Commitment</h2>
              <p className="mb-4">The ICT Club is committed to providing a welcoming, inclusive, and harassment-free experience for everyone, regardless of age, body size, disability, ethnicity, sex characteristics, gender identity and expression, level of experience, education, socio-economic status, nationality, personal appearance, race, religion, or sexual identity and orientation.</p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">Our Standards</h2>
              <h3 className="text-xl font-medium mb-2">Positive Behavior</h3>
              <p className="mb-4">Examples of behavior that contributes to a positive environment include:</p>
              <ul className="list-disc pl-6 mb-4">
                <li>Using welcoming and inclusive language</li>
                <li>Being respectful of differing viewpoints and experiences</li>
                <li>Gracefully accepting constructive criticism</li>
                <li>Focusing on what is best for the community</li>
                <li>Showing empathy towards other community members</li>
                <li>Supporting and encouraging fellow members</li>
                <li>Sharing knowledge and helping others learn</li>
              </ul>

              <h3 className="text-xl font-medium mb-2">Unacceptable Behavior</h3>
              <p className="mb-4">Examples of unacceptable behavior include:</p>
              <ul className="list-disc pl-6 mb-4">
                <li>The use of sexualized language or imagery</li>
                <li>Trolling, insulting, or derogatory comments</li>
                <li>Personal or political attacks</li>
                <li>Public or private harassment</li>
                <li>Publishing others' private information without permission</li>
                <li>Disrupting events, meetings, or online discussions</li>
                <li>Cheating or academic dishonesty in quizzes and activities</li>
                <li>Other conduct which could reasonably be considered inappropriate</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">Academic Integrity</h2>
              <h3 className="text-xl font-medium mb-2">Quiz and Assessment Conduct</h3>
              <p className="mb-4">All members must maintain academic integrity by:</p>
              <ul className="list-disc pl-6 mb-4">
                <li>Completing quizzes and assessments independently</li>
                <li>Not sharing questions, answers, or solutions</li>
                <li>Not using unauthorized resources during assessments</li>
                <li>Reporting suspected cheating or misconduct</li>
                <li>Respecting time limits and attempt restrictions</li>
              </ul>

              <h3 className="text-xl font-medium mb-2">Collaboration Guidelines</h3>
              <p className="mb-4">When working on collaborative projects:</p>
              <ul className="list-disc pl-6 mb-4">
                <li>Give credit to all contributors</li>
                <li>Respect intellectual property rights</li>
                <li>Share resources and knowledge openly</li>
                <li>Communicate honestly about your contributions</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">Digital Citizenship</h2>
              <h3 className="text-xl font-medium mb-2">Online Presence</h3>
              <p className="mb-4">As members of the ICT Club, you represent our community online. Please:</p>
              <ul className="list-disc pl-6 mb-4">
                <li>Use appropriate language in all communications</li>
                <li>Respect privacy and confidentiality</li>
                <li>Verify information before sharing</li>
                <li>Give proper attribution for content and ideas</li>
                <li>Report cyberbullying or harassment</li>
              </ul>

              <h3 className="text-xl font-medium mb-2">Social Media Guidelines</h3>
              <p className="mb-4">When representing the ICT Club on social media:</p>
              <ul className="list-disc pl-6 mb-4">
                <li>Follow university social media policies</li>
                <li>Respect copyright and intellectual property</li>
                <li>Maintain professional standards</li>
                <li>Obtain permission before posting photos of others</li>
                <li>Use official club accounts responsibly</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">Event Conduct</h2>
              <h3 className="text-xl font-medium mb-2">Workshop and Meeting Etiquette</h3>
              <p className="mb-4">During club events and meetings:</p>
              <ul className="list-disc pl-6 mb-4">
                <li>Arrive on time and prepared</li>
                <li>Listen respectfully to speakers and peers</li>
                <li>Participate constructively in discussions</li>
                <li>Keep devices on silent during presentations</li>
                <li>Clean up after yourself</li>
                <li>Follow all safety protocols</li>
              </ul>

              <h3 className="text-xl font-medium mb-2">Competition Guidelines</h3>
              <p className="mb-4">During competitions and contests:</p>
              <ul className="list-disc pl-6 mb-4">
                <li>Compete fairly and honestly</li>
                <li>Respect judges and organizers</li>
                <li>Accept results gracefully</li>
                <li>Support fellow competitors</li>
                <li>Follow all competition rules</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">Leadership Responsibilities</h2>
              <p className="mb-4">Club leaders and committee members have additional responsibilities to:</p>
              <ul className="list-disc pl-6 mb-4">
                <li>Model positive behavior for other members</li>
                <li>Address misconduct promptly and fairly</li>
                <li>Create inclusive environments for all activities</li>
                <li>Maintain confidentiality when appropriate</li>
                <li>Provide mentorship and support to members</li>
                <li>Communicate club policies clearly</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">Enforcement</h2>
              <h3 className="text-xl font-medium mb-2">Reporting Violations</h3>
              <p className="mb-4">If you experience or witness behavior that violates this code of conduct:</p>
              <ul className="list-disc pl-6 mb-4">
                <li>Report incidents to club leadership immediately</li>
                <li>Provide specific details about the incident</li>
                <li>All reports will be handled confidentially</li>
                <li>No retaliation will be tolerated against reporters</li>
              </ul>

              <h3 className="text-xl font-medium mb-2">Consequences</h3>
              <p className="mb-4">Violations may result in:</p>
              <ul className="list-disc pl-6 mb-4">
                <li>Verbal or written warnings</li>
                <li>Temporary suspension from activities</li>
                <li>Removal from leadership positions</li>
                <li>Permanent ban from club membership</li>
                <li>Referral to university disciplinary procedures</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">Appeals Process</h2>
              <p className="mb-4">Members who face disciplinary action have the right to:</p>
              <ul className="list-disc pl-6 mb-4">
                <li>Request a hearing with club leadership</li>
                <li>Present their side of the story</li>
                <li>Have a fair and impartial review</li>
                <li>Appeal decisions to university authorities if necessary</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">Continuous Improvement</h2>
              <p className="mb-4">This code of conduct is a living document that will be:</p>
              <ul className="list-disc pl-6 mb-4">
                <li>Reviewed annually by club leadership</li>
                <li>Updated based on community feedback</li>
                <li>Aligned with university policies</li>
                <li>Communicated to all new members</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">Contact Information</h2>
              <p className="mb-4">For questions about this code of conduct or to report violations:</p>
              <p className="mb-2"><strong>Email:</strong> conduct@ictclub.edu</p>
              <p className="mb-2"><strong>Phone:</strong> (555) 123-4567</p>
              <p className="mb-2"><strong>Office:</strong> ICT Club Room, Student Center</p>
              <p className="mb-4"><strong>Emergency:</strong> Contact university security or administration</p>
            </section>
          </CardContent>
        </Card>
      </div>
    </main>
  );
};

export default CodeOfConduct;