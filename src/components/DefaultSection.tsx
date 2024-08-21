import { ReactNode } from "react";

interface DefaultSectionProps {
  children: ReactNode;
  remind?: string;
  title?: string;
  description?: string;
}

const DefaultSection = ({
  children,
  remind,
  title,
  description,
}: DefaultSectionProps) => {
  return (
    <section className="flex flex-col p-8 mt-4 mb-8 shadow-lg rounded-md border border-gray-100">
      <header className="mb-6 pb-2 space-y-2 border-b border-black">
        {remind && (
          <p className="text-sm text-gray-400 font-medium uppercase">
            {remind}
          </p>
        )}
        {title && (
          <h1 className="text-3xl text-black font-bold text-center">{title}</h1>
        )}
        {description && (
          <p className="px-4 text-sm text-gray-400 text-center whitespace-pre-line">
            {description}
          </p>
        )}
      </header>
      <main>{children}</main>
    </section>
  );
};

export default DefaultSection;
