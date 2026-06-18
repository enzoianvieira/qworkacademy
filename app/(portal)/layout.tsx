import { Sidebar } from "@/components/sidebar";

export default function PortalLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="relative z-10">
      <Sidebar />
      <div className="lg:pl-[268px]">
        <main className="mx-auto w-full max-w-3xl px-6 pb-28 pt-24 sm:px-10 lg:pt-16">
          {children}
        </main>
      </div>
    </div>
  );
}
