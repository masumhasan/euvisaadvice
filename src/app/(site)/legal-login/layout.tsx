export default function LoginLayout({
  children,
}: {
  children: React.ReactNode
}) {
  // Standalone layout — no Navbar or Footer
  return <>{children}</>
}
