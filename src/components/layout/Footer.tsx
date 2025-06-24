export default function Footer() {
  return (
    <footer className="w-full py-4 border-t text-sm text-muted-foreground text-center bg-white">
      © {new Date().getFullYear()} PACKUP Admin. All rights reserved.
    </footer>
  );
}
