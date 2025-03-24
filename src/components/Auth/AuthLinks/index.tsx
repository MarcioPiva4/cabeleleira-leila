import Link from "next/link";

interface AuthLinksProps {
  href: string;
  linkText: string;
  questionText: string;
}

export const AuthLinks = ({ href, linkText, questionText }: AuthLinksProps) => {
  return (
    <div className="mt-6 text-center">
      <p className="text-sm text-gray-600">
        {questionText}{" "}
        <Link
          href={href}
          className="text-orange-400 hover:text-orange-500 font-medium">
          {linkText}
        </Link>
      </p>
    </div>
  );
};
