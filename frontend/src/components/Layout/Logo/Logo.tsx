import { Link } from 'react-router-dom';

import logo from '@/assets/logo.svg';

export const Logo = () => {
  return (
    <Link className="flex items-center text-white" to="/">
      <img className="w-auto h-8" src={logo} alt="Shomrkm App" />
      <span className="text-xl font-semibold text-white">Shomrkm App</span>
    </Link>
  );
};
