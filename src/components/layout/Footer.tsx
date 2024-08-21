import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="flex flex-col mt-16 items-center">
      <div className="flex pb-4 space-x-2 text-sm text-gray-500">
        <div>Why am I here</div>
        <div>{` • `}</div>
        <div>{`© ${new Date().getFullYear()}`}</div>
        <div>{` • `}</div>
        <Link to="/">問題都答隊</Link>
      </div>
    </footer>
  );
};

export default Footer;
