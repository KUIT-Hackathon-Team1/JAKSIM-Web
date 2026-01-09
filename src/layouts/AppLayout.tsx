interface AppLayoutProps {
  children: React.ReactNode;
}

export default function AppLayout({ children }: AppLayoutProps) {
  return (
    <>
      <div className="w-full max-w-[375px] mx-auto min-h-screen">{children}</div>
    </>
  );
}
