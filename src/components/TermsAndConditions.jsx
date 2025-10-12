import React from "react";
import "../styles/ReviewStyles.css"; 

const TermsAndConditions = () => {
  return (
    <div className="terms-container">
      <h1 className="terms-title">Terms & Conditions</h1>
      <p className="terms-updated">Last updated: 30 September 2025</p>

      <section>
        <h2>1. Eligibility</h2>
        <p>
          You must be at least <strong>13 years old</strong> to use this
          platform. If you are under 18, parental or guardian consent is
          required to access our courses, classes, and services.
        </p>
      </section>

      <section>
        <h2>2. Account Registration</h2>
        <p>
          Users are required to provide accurate and updated information during
          registration. You are responsible for maintaining the confidentiality
          of your account details. Any suspicious or unauthorized use must be
          reported immediately.
        </p>
      </section>

      <section>
        <h2>3. Courses & Access</h2>
        <p>
          Course materials, including <strong>videos, PDFs, notes, and
          quizzes</strong>, are provided for personal educational purposes only.
          Sharing, selling, or distributing these resources is strictly
          prohibited.
        </p>
      </section>

      <section>
        <h2>4. Payments & Refunds</h2>
        <p>
          Payments for paid courses are processed through secure gateways. In
          case of technical issues, please contact support. Refund requests must
          be submitted within <strong>7 days</strong> of enrollment, subject to
          eligibility.
        </p>
      </section>

      <section>
        <h2>5. Attendance & Assessments</h2>
        <p>
          Attendance and quizzes are tracked digitally. Misuse such as
          impersonation, cheating, or plagiarism will result in disciplinary
          action, including suspension of access.
        </p>
      </section>

      <section>
        <h2>6. Intellectual Property</h2>
        <p>
          All content including course material, notes, PDFs, and assessments
          are the intellectual property of the website. Users are not allowed to
          reproduce, copy, or distribute any content without prior written
          consent.
        </p>
      </section>

      <section>
        <h2>7. Limitation of Liability</h2>
        <p>
          We are not responsible for technical failures, data loss, or
          interruptions beyond our control. Our liability will not exceed the
          amount paid for the specific course.
        </p>
      </section>

      <section>
        <h2>8. Termination</h2>
        <p>
          Violation of these Terms may result in account suspension or permanent
          termination. Users may also request account deletion via support.
        </p>
      </section>

      <section>
        <h2>9. Governing Law</h2>
        <p>
          These Terms & Conditions are governed by the laws of India. Any
          disputes shall be subject to the jurisdiction of Indore courts.
        </p>
      </section>

      <p className="terms-footer">
        For any queries, please contact us at:{" "}
        <a href="mailto:adnanansari.aa.114@gmail.com">
          xyz@gmail.com
        </a>
      </p>
    </div>
  );
};

export default TermsAndConditions;
