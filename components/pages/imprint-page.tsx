"use client"

import { useState } from "react";
import { FileContentContainer } from "@/components/portfolio/file-content-container";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LangToggle, type Lang } from "@/components/portfolio/lang-toggle";

export default function ImprintPage() {
  const [lang, setLang] = useState<Lang>("en")

  return (
    <FileContentContainer
      filePath="Impressum.md"
      title={<span className="text-primary">Imprint</span>}
      subtitle={lang === "en" ? "Legal Information" : "Rechtliche Angaben"}
      headerRight={<LangToggle lang={lang} onChange={setLang} />}
    >
      <div className="space-y-6">
        {lang === "en" ? <EnglishContent /> : <GermanContent />}
      </div>
    </FileContentContainer>
  )
}

function EnglishContent() {
  return (
    <>
      <Card className="bg-popover">
        <CardHeader className="pb-3">
          <CardTitle className="font-headline text-base">Imprint</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3 text-sm text-muted-foreground">
          <p>
            Merten Dieckmann<br />
            Memmingerstrasse 35<br />
            89231 Neu-Ulm, Germany
          </p>
        </CardContent>
      </Card>

      <Card className="bg-popover">
        <CardHeader className="pb-3">
          <CardTitle className="font-headline text-base">Contact</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3 text-sm text-muted-foreground">
          <p>
            Email:{" "}
            <a href="mailto:merten.dieckmann@web.de" className="text-primary hover:underline">
              merten.dieckmann@web.de
            </a>
          </p>
        </CardContent>
      </Card>

      <Card className="bg-popover">
        <CardHeader className="pb-3">
          <CardTitle className="font-headline text-base">Responsible for content</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3 text-sm text-muted-foreground">
          <p>
            Merten Dieckmann<br />
            Memmingerstrasse 35<br />
            89231 Neu-Ulm, Germany
          </p>
        </CardContent>
      </Card>

      <Card className="bg-popover">
        <CardHeader className="pb-3">
          <CardTitle className="font-headline text-base">EU Dispute Resolution</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3 text-sm text-muted-foreground">
          <p>
            The European Commission provides a platform for online dispute resolution (OS):{" "}
            <a href="https://ec.europa.eu/consumers/odr/" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
              https://ec.europa.eu/consumers/odr/
            </a>
            .<br />
            You can find our email address in the imprint above.
          </p>
        </CardContent>
      </Card>

      <Card className="bg-popover">
        <CardHeader className="pb-3">
          <CardTitle className="font-headline text-base">Consumer dispute resolution / Universal arbitration board</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3 text-sm text-muted-foreground">
          <p>
            We are not willing or obliged to participate in dispute resolution proceedings before a consumer arbitration board.
          </p>
        </CardContent>
      </Card>

      <p className="text-xs text-muted-foreground">
        Source:{" "}
        <a href="https://www.e-recht24.de" target="_blank" rel="noopener noreferrer" className="underline hover:text-primary">
          e-recht24.de
        </a>
      </p>
    </>
  )
}

function GermanContent() {
  return (
    <>
      <Card className="bg-popover">
        <CardHeader className="pb-3">
          <CardTitle className="font-headline text-base">Impressum</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3 text-sm text-muted-foreground">
          <p>
            Merten Dieckmann<br />
            Memmingerstraße 35<br />
            89231 Neu-Ulm
          </p>
        </CardContent>
      </Card>

      <Card className="bg-popover">
        <CardHeader className="pb-3">
          <CardTitle className="font-headline text-base">Kontakt</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3 text-sm text-muted-foreground">
          <p>
            E-Mail:{" "}
            <a href="mailto:merten.dieckmann@web.de" className="text-primary hover:underline">
              merten.dieckmann@web.de
            </a>
          </p>
        </CardContent>
      </Card>

      <Card className="bg-popover">
        <CardHeader className="pb-3">
          <CardTitle className="font-headline text-base">Verantwortlich für den Inhalt</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3 text-sm text-muted-foreground">
          <p>
            Merten Dieckmann<br />
            Memmingerstraße 35<br />
            89231 Neu-Ulm
          </p>
        </CardContent>
      </Card>

      <Card className="bg-popover">
        <CardHeader className="pb-3">
          <CardTitle className="font-headline text-base">EU-Streitschlichtung</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3 text-sm text-muted-foreground">
          <p>
            Die Europäische Kommission stellt eine Plattform zur Online-Streitbeilegung (OS) bereit:{" "}
            <a href="https://ec.europa.eu/consumers/odr/" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
              https://ec.europa.eu/consumers/odr/
            </a>
            .<br />
            Unsere E-Mail-Adresse finden Sie oben im Impressum.
          </p>
        </CardContent>
      </Card>

      <Card className="bg-popover">
        <CardHeader className="pb-3">
          <CardTitle className="font-headline text-base">Verbraucherstreitbeilegung / Universalschlichtungsstelle</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3 text-sm text-muted-foreground">
          <p>
            Wir sind nicht bereit oder verpflichtet, an Streitbeilegungsverfahren vor einer Verbraucherschlichtungsstelle teilzunehmen.
          </p>
        </CardContent>
      </Card>

      <p className="text-xs text-muted-foreground">
        Quelle:{" "}
        <a href="https://www.e-recht24.de" target="_blank" rel="noopener noreferrer" className="underline hover:text-primary">
          e-recht24.de
        </a>
      </p>
    </>
  )
}
