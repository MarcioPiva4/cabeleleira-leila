import Footer from "@/components/Footer";
import Header from "@/components/Header";
import Link from "next/link";

export default function Home() {
  return (
    <div>
      <Header></Header>

      <section className="bg-gradient-to-r from-pink-400 via-pink-500 to-pink-600 text-white text-center py-16">
        <div className="container mx-auto">
          <h1 className="text-5xl font-semibold mb-4">Bem-vindo ao Salão Leila!</h1>
          <p className="text-lg mb-8">
            O lugar perfeito para cuidar da sua beleza com atendimento especializado e agendamento online.
          </p>
          <Link href="/signup" className="bg-white text-pink-600 px-6 py-3 rounded-full text-lg hover:bg-pink-100 transition-all">
              Agende seu horário agora!
          </Link>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl font-semibold mb-12">Por que escolher o Salão Leila?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-pink-100 p-6 rounded-lg shadow-lg">
              <h3 className="text-2xl font-semibold mb-4">Atendimento Personalizado</h3>
              <p className="text-gray-600">
                Nossos profissionais estão sempre prontos para atender suas necessidades com carinho e dedicação.
              </p>
            </div>
            <div className="bg-pink-100 p-6 rounded-lg shadow-lg">
              <h3 className="text-2xl font-semibold mb-4">Agendamento Online</h3>
              <p className="text-gray-600">
                Agende seus serviços de forma simples e rápida através do nosso sistema online.
              </p>
            </div>
            <div className="bg-pink-100 p-6 rounded-lg shadow-lg">
              <h3 className="text-2xl font-semibold mb-4">Ambiente Aconchegante</h3>
              <p className="text-gray-600">
                Um espaço pensado para proporcionar conforto e relaxamento durante o seu atendimento.
              </p>
            </div>
          </div>
        </div>
      </section>

      <Footer></Footer>
    </div>
  );
}
