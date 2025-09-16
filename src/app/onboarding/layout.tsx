export default function OnboardingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="min-h-screen bg-gradient-to-br from-background to-muted text-foreground flex flex-col">
      <header className="flex justify-center p-6">
        <div className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-purple-600">
          MemoryNinja
        </div>
      </header>
      <section className="flex-1 flex items-center justify-center p-4">
        <div className="w-full max-w-md">{children}</div>
      </section>
      <div className="absolute bottom-0 left-0 right-0 h-1/3 bg-gradient-to-t from-purple-900/20 to-transparent -z-10" />
    </main>
  );
}
