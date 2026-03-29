import { FileContentContainer } from "@/components/portfolio/file-content-container";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function ImpressumPage() {
  return (
    <FileContentContainer
      filePath="Impressum.md"
      title={
        <>
          <span className="text-primary">Imprint</span>
        </>
      }
      subtitle="Legal Information"
    >
      <div className="space-y-6">
        <Card className="bg-popover">
          <CardHeader className="pb-3">
            <CardTitle className="font-headline text-base">Imprint</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 text-sm text-muted-foreground">
            <p>
              Merten Dieckmann<br />
              Memmingerstrasse 35<br />
              Apt. 2.110<br />
              89231 Neu-Ulm
            </p>
          </CardContent>
        </Card>

        <Card className="bg-popover">
          <CardHeader className="pb-3">
            <CardTitle className="font-headline text-base">Contact</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 text-sm text-muted-foreground">
            <p>
              Phone: +49 177 1969628<br />
              Email: merten.dieckmann@web.de
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
              Apt. 2.110<br />
              89231 Neu-Ulm
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

        <p className="mt-4 text-xs text-muted-foreground">
          Source: <a href="https://www.e-recht24.de" target="_blank" rel="noopener noreferrer" className="underline hover:text-primary">https://www.e-recht24.de</a>
        </p>
      </div>
    </FileContentContainer>
  );
}
