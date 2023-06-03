import { NavLink } from 'react-router-dom';

function Menu() {
  const links = [
    {
      name: 'ГЛАВНАЯ',
      path: 'featured',
    },
    {
      name: 'ПОСТЫ',
      path: 'articles',
    },
    {
      name: 'О БЛОГЕ',
      path: 'about',
    },
  ];

  return (
    <div className="channel__menu">
      <nav>
        {links.map((link, i) => (
          <NavLink
            key={i}
            className={({ isActive }) => (isActive ? 'active' : null)}
            activeclassname="is-active"
            to={link.path}>
            {link.name}
          </NavLink>
        ))}
      </nav>
    </div>
  );
}

export default Menu;
