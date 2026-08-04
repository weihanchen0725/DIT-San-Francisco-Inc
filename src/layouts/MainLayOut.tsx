const MainLayOut = ({ children }: { children: React.ReactNode }) => {
  return (
    <section className="flex flex-col min-h-screen bg-[var(--color-bg-primary)] transition-colors duration-200 py-20 sm:py-28">
      {children}
    </section>
  );
};

export default MainLayOut;
