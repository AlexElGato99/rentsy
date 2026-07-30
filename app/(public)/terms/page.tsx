import { LegalPage } from "@/components/layout/legal-page"

export default function TermsPage() {
  return (
    <LegalPage title="Terms of Service" updated="July 30, 2026">
      <p>
        These Terms of Service (&quot;Terms&quot;) govern your use of Rentsy
        (&quot;we,&quot; &quot;us,&quot; the &quot;Service&quot;). By creating
        an account or using the Service, you agree to these Terms.
      </p>

      <h2>1. What Rentsy is</h2>
      <p>
        Rentsy is a listings marketplace that connects property owners
        (&quot;sellers&quot;) with people looking to rent
        (&quot;customers&quot;). Rentsy does not own, manage, or broker any
        property, and we are not a party to any rental agreement made between
        a seller and a customer. All arrangements &mdash; viewings, rental
        terms, payments, contracts &mdash; are made directly between the
        parties, off-platform.
      </p>

      <h2>2. Accounts</h2>
      <ul>
        <li>
          You must provide accurate information when creating an account and
          keep your login credentials secure.
        </li>
        <li>
          You choose your account type (renter or property owner) at
          sign-up. Administrator access is not self-service and is granted
          only by an existing administrator.
        </li>
        <li>
          You are responsible for all activity that happens under your
          account.
        </li>
      </ul>

      <h2>3. Listings</h2>
      <ul>
        <li>
          Sellers are solely responsible for the accuracy of their listings,
          including price, availability, photos, and contact details.
        </li>
        <li>
          Listings are published immediately upon creation. Rentsy may
          unpublish or remove any listing that violates these Terms, contains
          misleading information, or is reported as fraudulent.
        </li>
        <li>
          You may not post a listing for a property you do not have the
          legal right to rent out.
        </li>
      </ul>

      <h2>4. Acceptable use</h2>
      <p>You agree not to:</p>
      <ul>
        <li>Post false, misleading, or fraudulent listings or reviews.</li>
        <li>
          Use another person&apos;s account, or the Service to harass,
          scam, or discriminate against another user.
        </li>
        <li>
          Scrape, copy, or redistribute listing data without our written
          permission.
        </li>
        <li>Attempt to bypass, disable, or interfere with the Service.</li>
      </ul>

      <h2>5. No transactions on Rentsy</h2>
      <p>
        Rentsy does not process rent payments, deposits, or any other funds
        between sellers and customers, and we do not verify or guarantee any
        listing, user, or arrangement. Exercise the same caution you would
        with any other classifieds platform: verify the property and the
        other party before sending money or signing anything.
      </p>

      <h2>6. Disclaimers &amp; limitation of liability</h2>
      <p>
        The Service is provided &quot;as is,&quot; without warranties of any
        kind. To the maximum extent permitted by law, Rentsy is not liable
        for any dispute, loss, or damage arising from a rental arrangement,
        listing content, or interaction between users.
      </p>

      <h2>7. Changes to these Terms</h2>
      <p>
        We may update these Terms from time to time. Continued use of the
        Service after a change means you accept the updated Terms.
      </p>

      <h2>8. Contact</h2>
      <p>
        Questions about these Terms can be sent through the contact details
        on our{" "}
        <a href="/about" className="text-primary underline underline-offset-4">
          About page
        </a>
        .
      </p>
    </LegalPage>
  )
}
