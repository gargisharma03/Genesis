export default function Footer() {
  return (
    <footer className="bg-zinc-950 text-zinc-400 py-4 text-center">
        <p className="text-sm">
            &copy; {new Date().getFullYear()} Genesis OS. All rights reserved.
        </p>
    </footer>
  );
}