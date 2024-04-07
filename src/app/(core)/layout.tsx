import React from "react";
import MainLayout from "~/components/custom/layouts/main-layout";

export default function layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="bg-muted/50">
      <MainLayout>{children}</MainLayout>
    </div>
  );
}
