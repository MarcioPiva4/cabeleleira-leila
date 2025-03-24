import Link from "next/link";

export default function Page() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-purple-600 to-orange-400">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-lg text-center mx-4">
        <h1 className="text-6xl font-extrabold text-gray-800 mb-6">404</h1>
        <p className="text-xl text-gray-600 mb-4">
          A página que você está procurando não existe.
        </p>
        <p className="text-sm text-gray-500 mb-6">
          Parece que você seguiu um link quebrado ou digitou um endereço errado.
        </p>

        <Link
          href="/"
          className="bg-orange-400 text-white px-6 py-3 rounded-full shadow-md hover:bg-orange-500 transition-all font-medium">
          Voltar para a Página Inicial
        </Link>
      </div>
    </div>
  );
}
