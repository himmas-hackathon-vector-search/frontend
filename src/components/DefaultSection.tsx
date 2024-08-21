import { ReactNode } from "react";

const DefaultSection = ({ children }: { children: ReactNode }) => {
  return (
    <section className="flex flex-col p-8 my-8 shadow-lg rounded-md border border-gray-100">
      {children}
    </section>
  );
};

export default DefaultSection;
