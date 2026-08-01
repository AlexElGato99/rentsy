import { LegalPage } from "@/components/layout/legal-page"
import { getLocale } from "@/lib/i18n/get-locale"
import { getDictionary } from "@/lib/i18n/get-dictionary"

export default async function PrivacyPage() {
  const dict = getDictionary(await getLocale())
  return (
    <LegalPage
      title={dict.legal.privacy.title}
      updated="July 30, 2026"
      lastUpdatedLabel={dict.legal.lastUpdated}
    >
      <p>
        This Privacy Policy explains what information Rentsy collects, how we
        use it, and the choices you have.
      </p>

      <h2>1. Information we collect</h2>
      <ul>
        <li>
          <strong>Account information:</strong> name, email address, and
          password when you sign up, plus phone/WhatsApp if you add them to
          your profile.
        </li>
        <li>
          <strong>Listing information:</strong> anything a seller includes in
          a listing, such as property details, photos, and contact
          information they choose to display publicly.
        </li>
        <li>
          <strong>Usage data:</strong> basic technical information (like
          pages visited) used to operate and improve the Service.
        </li>
      </ul>

      <h2>2. How we use your information</h2>
      <ul>
        <li>To create and manage your account.</li>
        <li>To publish and display listings you create.</li>
        <li>To let other users contact you about a listing.</li>
        <li>To keep the Service secure and prevent abuse.</li>
      </ul>

      <h2>3. What we share</h2>
      <p>
        Contact details you add to a listing (phone, WhatsApp, email) are
        shown publicly on that listing so renters can reach you directly.
        Your profile name is visible to other signed-in users. We do not sell
        your personal information to third parties.
      </p>

      <h2>4. Where your data lives</h2>
      <p>
        Account and listing data is stored with our infrastructure provider,
        Supabase, using industry-standard access controls. Photos are stored
        in Supabase Storage.
      </p>

      <h2>5. Your choices</h2>
      <ul>
        <li>You can edit or remove your contact information at any time.</li>
        <li>You can delete a listing you own at any time.</li>
        <li>
          You can request deletion of your account and associated data by
          contacting us.
        </li>
      </ul>

      <h2>6. Cookies</h2>
      <p>
        We use essential cookies to keep you signed in and to remember your
        session. We do not use third-party advertising cookies.
      </p>

      <h2>7. Changes to this policy</h2>
      <p>
        We may update this Privacy Policy from time to time. We&apos;ll post
        the updated version on this page with a new &quot;last updated&quot;
        date.
      </p>

      <h2>8. Contact</h2>
      <p>
        Questions about this policy can be sent through the contact details
        on our{" "}
        <a href="/about" className="text-primary underline underline-offset-4">
          About page
        </a>
        .
      </p>
    </LegalPage>
  )
}
