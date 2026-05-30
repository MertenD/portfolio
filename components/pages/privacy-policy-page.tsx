import { FileContentContainer } from "@/components/portfolio/file-content-container";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function PrivacyPolicyPage() {
  return (
    <FileContentContainer
      filePath="Privacy.md"
      title={
        <>
          <span className="text-primary">Privacy</span>
        </>
      }
      subtitle="Privacy Policy"
    >
      <div className="space-y-6">

        <Card className="bg-popover">
          <CardHeader className="pb-3">
            <CardTitle className="font-headline text-base">1. Controller</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 text-sm text-muted-foreground">
            <p>
              Merten Dieckmann<br />
              Memmingerstrasse 35<br />
              89231 Neu-Ulm, Germany<br />
              Email:{" "}
              <a href="mailto:merten.dieckmann@web.de" className="text-primary hover:underline">
                merten.dieckmann@web.de
              </a>
            </p>
          </CardContent>
        </Card>

        <Card className="bg-popover">
          <CardHeader className="pb-3">
            <CardTitle className="font-headline text-base">2. Hosting</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 text-sm text-muted-foreground">
            <p>
              This website is self-hosted on a dedicated server at Hetzner Online GmbH
              (data center Helsinki, Finland, EU). The reverse proxy (Traefik) is configured
              without access logging — no visitor IP addresses, User-Agents, or request
              details are written to log files by this website&apos;s application layer.
            </p>
            <p>
              Hetzner processes connection metadata at the infrastructure level (e.g. for
              DDoS protection). This includes the visitor&apos;s IP address, which is
              transmitted to Hetzner&apos;s infrastructure upon every connection by technical
              necessity, independently of application-level logging. Hetzner acts as a data
              processor under Art. 28 GDPR; a Data Processing Agreement (DPA) is in place.
              All data processing takes place exclusively within the European Union. See
              Hetzner&apos;s{" "}
              <a href="https://www.hetzner.com/legal/privacy-policy" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
                privacy policy
              </a>
              {" "}for details.
            </p>
          </CardContent>
        </Card>

        <Card className="bg-popover">
          <CardHeader className="pb-3">
            <CardTitle className="font-headline text-base">3. Cookieless Analytics (Privacy by Design)</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 text-sm text-muted-foreground">
            <p>
              This website uses a custom privacy-friendly analytics system.{" "}
              <strong>No cookies</strong> and <strong>no client-side storage</strong>{" "}
              (localStorage, sessionStorage — except as noted in Section 5) are used for
              analytics purposes.
            </p>
            <p>
              When you interact with certain elements, your browser sends a pseudonymous
              request to our server. The server computes a pseudonymous <strong>analytics
              session ID</strong> (distinct from the chat session identifier described in
              Section 4) using the following method:
            </p>
            <ul className="list-disc list-inside space-y-1">
              <li>Your IP address is anonymized: for IPv4 the last octet is zeroed (e.g. 192.168.1.0/24); for IPv6 the last two groups are removed.</li>
              <li>The anonymized IP is combined with your browser&apos;s User-Agent string and a daily salt that rotates at midnight UTC.</li>
              <li>A SHA-256 hash is computed from this combination and used as the analytics session ID.</li>
              <li>The hash changes every day, making cross-day correlation technically difficult — but not provably impossible, in particular for stable IP subnets and User-Agents.</li>
            </ul>
            <p>
              The User-Agent string is read exclusively from the HTTP request header
              transmitted by your browser. No JavaScript-based device fingerprinting or
              active reading of end-device data is performed. This passive processing does
              not constitute access to information stored on your end device within the
              meaning of § 25 TDDDG.
            </p>
            <p>
              The resulting session ID is pseudonymous personal data within the meaning of
              Art. 4(5) GDPR and Recital 26 GDPR. The full GDPR applies.
            </p>
            <p>
              Legal basis: Art. 6(1)(f) GDPR (legitimate interest in understanding how this
              website is used in order to improve it). You have the right to object to this
              processing at any time on grounds relating to your particular situation
              (Art. 21 GDPR). To exercise this right, contact{" "}
              <a href="mailto:merten.dieckmann@web.de" className="text-primary hover:underline">
                merten.dieckmann@web.de
              </a>
              .
            </p>
          </CardContent>
        </Card>

        <Card className="bg-popover">
          <CardHeader className="pb-3">
            <CardTitle className="font-headline text-base">4. AI Chat</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 text-sm text-muted-foreground">
            <p>
              This website offers an optional AI chat feature. It is only activated after
              you give explicit consent (see the consent notice displayed in the chat
              interface). When you use it, your messages are forwarded to external service
              providers for processing:
            </p>
            <ul className="list-disc list-inside space-y-1">
              <li>
                <strong>OpenRouter Inc.</strong> (USA) — API gateway that routes requests to
                the AI model. Zero Data Retention is enabled for our account: OpenRouter
                does not store requests persistently. Privacy policy:{" "}
                <a href="https://openrouter.ai/privacy" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
                  openrouter.ai/privacy
                </a>
              </li>
              <li>
                <strong>Google LLC</strong> (USA) — AI model: <code>google/gemini-3.1-flash-lite</code>,
                operated via OpenRouter. Google&apos;s data processing terms for API usage
                govern retention at this layer. Privacy policy:{" "}
                <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
                  policies.google.com/privacy
                </a>
              </li>
            </ul>
            <p>
              Chat histories are stored in pseudonymized form in a local SQLite database on
              our server, linked to a <strong>chat session ID</strong> (a random identifier
              held in your browser&apos;s memory for the duration of the session, distinct
              from the analytics session ID described in Section 3).
            </p>
            <p>
              Since OpenRouter and Google are based in the USA, this constitutes a transfer
              to a third country (Art. 44 ff. GDPR):
            </p>
            <ul className="list-disc list-inside space-y-1">
              <li>
                <strong>Google LLC</strong> is certified under the EU–US Data Privacy
                Framework (DPF). The transfer is based on the European Commission&apos;s
                adequacy decision of 10 July 2023 (Art. 45 GDPR, Implementing Decision
                (EU) 2023/1795).
              </li>
              <li>
                <strong>OpenRouter Inc.</strong> is not certified under the DPF. The
                transfer is based on Standard Contractual Clauses adopted by the European
                Commission (Art. 46(2)(c) GDPR), as provided in OpenRouter&apos;s published
                Data Processing Terms.
              </li>
            </ul>
            <p>
              Please do not enter any personal data (name, email address, etc.) in the chat.
            </p>
            <p>
              In compliance with Art. 50(1) of the EU AI Act (Regulation (EU) 2024/1689),
              you are informed before each chat session that you are interacting with an AI
              system via the consent notice and the introductory message in the chat
              interface.
            </p>
            <p>
              Legal basis: Art. 6(1)(a) GDPR — explicit consent given before first use of
              the chat feature. To comply with Art. 7(1) GDPR (burden of proof), a
              pseudonymous consent record (timestamp, policy version, and a randomly
              generated consent ID — no IP address) is stored server-side when you click
              the consent button. You may withdraw your consent at any time by clicking
              &quot;Withdraw consent&quot; in the chat interface; this does not affect the
              lawfulness of processing carried out before withdrawal (Art. 7(3) GDPR).
            </p>
          </CardContent>
        </Card>

        <Card className="bg-popover">
          <CardHeader className="pb-3">
            <CardTitle className="font-headline text-base">5. Cookies and Local Storage</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 text-sm text-muted-foreground">
            <p>
              This website sets <strong>no cookies</strong>. Neither first-party nor
              third-party cookies are used. No advertising technologies, social media pixels,
              or external tracking services are deployed.
            </p>
            <p>
              The following data is stored in your browser&apos;s local storage:
            </p>
            <ul className="list-disc list-inside space-y-1">
              <li>
                <strong>Theme preference</strong> (<code>portfolio-theme</code>, localStorage):
                stores your selected colour scheme (dark/light/system). This value never
                leaves your browser and is solely used to restore your display preference on
                subsequent visits. Legal basis: § 25(2)(2) TDDDG (strictly necessary for
                the service you requested).
              </li>
              <li>
                <strong>Chat consent</strong> (<code>portfolio-chat-consent</code>,
                sessionStorage): remembers whether you consented to use the chat during
                the current browser session. This value is tab-scoped, never transmitted to
                any server, and deleted automatically when you close the tab. Legal basis:
                § 25(2)(2) TDDDG (strictly necessary to operate the consent mechanism for
                the chat service you explicitly requested).
              </li>
            </ul>
          </CardContent>
        </Card>

        <Card className="bg-popover">
          <CardHeader className="pb-3">
            <CardTitle className="font-headline text-base">6. Data Retention</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 text-sm text-muted-foreground">
            <ul className="list-disc list-inside space-y-1">
              <li><strong>Analytics events</strong>: stored for 12 months, then deleted by an automated cleanup process.</li>
              <li><strong>Chat messages</strong>: deleted after 90 days by an automated cleanup process, or earlier upon request.</li>
              <li><strong>Chat session records</strong> (which contain the consent evidence — policy version and consent timestamp): retained for 3 years, then deleted by an automated cleanup process. This ensures the consent can be demonstrated for the standard civil-law limitation period even after the messages themselves are gone.</li>
              <li><strong>Theme preference / chat consent state</strong>: browser-local only — never stored server-side.</li>
            </ul>
          </CardContent>
        </Card>

        <Card className="bg-popover">
          <CardHeader className="pb-3">
            <CardTitle className="font-headline text-base">7. Your Rights</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 text-sm text-muted-foreground">
            <p>Under the GDPR you have the following rights:</p>
            <ul className="list-disc list-inside space-y-1">
              <li><strong>Access</strong> (Art. 15 GDPR)</li>
              <li><strong>Rectification</strong> (Art. 16 GDPR)</li>
              <li><strong>Erasure</strong> (Art. 17 GDPR)</li>
              <li><strong>Restriction of processing</strong> (Art. 18 GDPR)</li>
              <li><strong>Data portability</strong> (Art. 20 GDPR) — applies to chat data (consent basis); not applicable to analytics data (legitimate interest basis)</li>
              <li><strong>Objection</strong> (Art. 21 GDPR) — in particular for processing based on Art. 6(1)(f) (analytics)</li>
              <li><strong>Withdrawal of consent</strong> (Art. 7(3) GDPR) — for processing based on consent (chat)</li>
            </ul>
            <p>
              Analytics data is stored using a pseudonymous session ID. To exercise your
              rights regarding analytics data, please state the approximate date(s) of your
              visit and your IP address range in your request — this allows us to reconstruct
              the session ID as it would have been computed on that day. Note that
              identification across multiple days is not technically feasible due to the
              daily-rotating salt.
            </p>
            <p>
              For all other requests, please contact:{" "}
              <a href="mailto:merten.dieckmann@web.de" className="text-primary hover:underline">
                merten.dieckmann@web.de
              </a>
            </p>
            <p>
              You also have the right to lodge a complaint with the competent supervisory
              authority: <strong>Bayerisches Landesamt für Datenschutzaufsicht (BayLDA)</strong>,{" "}
              <a href="https://www.lda.bayern.de" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
                www.lda.bayern.de
              </a>
            </p>
          </CardContent>
        </Card>

        <p className="text-xs text-muted-foreground">
          Last updated: May 2026
        </p>

      </div>
    </FileContentContainer>
  );
}
