import { NavLink } from 'react-router-dom'

const ITEMS = [
  { to: '/', label: 'Today', glyph: '☉' },
  { to: '/journeys', label: 'Journeys', glyph: '❋' },
  { to: '/cycle', label: 'Cycle', glyph: '☾' },
  { to: '/altar', label: 'Altar', glyph: '△' },
]

export function Nav() {
  return (
    <nav className="nav" aria-label="Primary">
      {ITEMS.map((item) => (
        <NavLink
          key={item.to}
          to={item.to}
          end={item.to === '/'}
          className={({ isActive }) => `nav__item${isActive ? ' nav__item--on' : ''}`}
        >
          <span className="nav__glyph" aria-hidden="true">
            {item.glyph}
          </span>
          <span className="nav__text">{item.label}</span>
        </NavLink>
      ))}
    </nav>
  )
}
