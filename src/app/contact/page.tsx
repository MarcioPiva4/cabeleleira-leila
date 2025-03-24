import { MainLayout } from "@/components/MainLayout";
import { ContactForm } from "@/components/Contact/ContactForm";
import { ContactInfo } from "@/components/Contact/ContactInfo";

export default function Contact() {
  return (
    <MainLayout>
      <section className="py-16 bg-gradient-to-r from-purple-600 to-orange-400 text-white text-center mt-5">
        <div className="container mx-auto">
          <h2 className="text-4xl font-semibold mb-6">Entre em Contato</h2>
          <p className="text-lg mb-8">
            Se tiver alguma dúvida, envie sua mensagem abaixo e retornaremos o
            mais rápido possível!
          </p>
          <ContactForm />
        </div>
      </section>

      <ContactInfo />
    </MainLayout>
  );
}
