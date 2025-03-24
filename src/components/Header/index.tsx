import Link from "next/link";

export default function Header() {
  return (
    <header className="fixed top-0 left-0 w-full bg-purple-600 backdrop-blur-sm text-white py-4 px-6 z-50 shadow-lg border-b border-purple-500">
      <div className="container mx-auto flex justify-between items-center">
        <div className="text-2xl font-bold">
          <Link
            href="/"
            className="hover:text-orange-400 transition-colors duration-300 flex items-center gap-2">
            <span className="text-orange-400">•</span>
            Salão Leila
            <span className="text-orange-400">•</span>
          </Link>
        </div>

        <nav>
          <ul className="flex space-x-6">
            <li>
              <Link
                href="/login"
                className="hover:text-orange-400 transition-colors duration-300 font-medium px-3 py-1 rounded-lg hover:bg-white/10">
                Login
              </Link>
            </li>
            <li>
              <Link
                href="/signup"
                className="hover:text-orange-400 transition-colors duration-300 font-medium px-3 py-1 rounded-lg hover:bg-white/10">
                Cadastro
              </Link>
            </li>
            <li>
              <Link
                href="/contact"
                className="hover:text-orange-400 transition-colors duration-300 font-medium px-3 py-1 rounded-lg hover:bg-white/10">
                Contato
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}
