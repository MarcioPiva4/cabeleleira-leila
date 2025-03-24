import { MapComponent } from "@/components/Contact/MapComponent";

const CONTACT_INFO = [
  { label: "Endereço", value: "Rua Exemplo, 123, Bairro, Cidade - Estado" },
  { label: "Telefone", value: "(11) 1234-5678" },
  { label: "E-mail", value: "contato@salaoleila.com" },
];

export const ContactInfo = () => {
  return (
    <section className="py-16 bg-amber-50 text-center">
      <div className="container mx-auto">
        <h3 className="text-3xl font-semibold mb-6 text-gray-800">
          Informações de Contato
        </h3>

        <div className="mb-8">
          <p className="text-lg mb-4 text-gray-600">
            Você também pode nos contatar pelos seguintes meios:
          </p>
          <ul className="space-y-4 text-gray-700">
            {CONTACT_INFO.map((item, index) => (
              <li key={index}>
                <strong>{item.label}:</strong> {item.value}
              </li>
            ))}
          </ul>
        </div>

        <div className="mt-8">
          <h4 className="text-2xl font-semibold mb-4 text-gray-800">
            Nosso Local
          </h4>
          <MapComponent />
        </div>
      </div>
    </section>
  );
};
