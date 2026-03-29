import React, { ReactNode } from "react";

interface FileContentContainerProps {
  filePath: string;
  title: ReactNode;
  subtitle: ReactNode;
  children: ReactNode;
  headerRight?: ReactNode;
}

export function FileContentContainer({
  filePath,
  title,
  subtitle,
  children,
  headerRight,
}: FileContentContainerProps) {
  return (
    <section className="flex-1 min-h-0 h-full w-full p-4 md:p-8 overflow-y-auto">
      <div className="w-full max-w-4xl space-y-6">
        <header className="space-y-2">
          <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
            <div className="space-y-2">
              <p className="font-mono text-xs text-muted-foreground">{filePath}</p>
              <h1 className="font-headline text-2xl md:text-3xl tracking-tight text-foreground">
                {title}
              </h1>
              <p className="text-sm text-muted-foreground">{subtitle}</p>
            </div>
            {headerRight && <div className="flex items-center gap-2">{headerRight}</div>}
          </div>
        </header>
        {children}
      </div>
    </section>
  );
}

