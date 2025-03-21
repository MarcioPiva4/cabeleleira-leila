import Link from "next/link";

export default function Header(){
    return(
        <header className="bg-pink-600 text-white py-4 px-6">
        <div className="container mx-auto flex justify-between items-center">
          <div className="text-2xl font-bold">
            <Link href="/">
              Salão Leila
            </Link>
          </div>
          <nav>
            <ul className="flex space-x-6">
              <li>
                <Link href="/login" className="hover:text-gray-200">
                  Login
                </Link>
              </li>
              <li>
                <Link href="/signup" className="hover:text-gray-200">
                  Cadastro
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-gray-200">
                  Contato
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      </header>
    )
}