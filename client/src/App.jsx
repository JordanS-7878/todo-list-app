import { NavLink, Outlet } from 'react-router-dom'

const menu = [
  { name: 'All Tasks', path: '/' },
  { name: 'Today', path: '/today' },
  { name: 'Overdue', path: '/overdue' },
]

export default function App() {
  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <div className="w-72 p-4 bg-gray-100 ">
        <div className="mb-6 p-3 hover:bg-gray-300 rounded cursor-pointer">
          <div className="">Jordan Seow</div>
          <div className="text-gray-400">seowjordan74@gmail.com</div>
        </div>

        <nav className="space-y-3">
          {menu.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              end={item.path === '/'}
              className={({ isActive }) =>
                `block p-3 rounded ${
                  isActive
                    ? 'bg-blue-500'
                    : 'hover:bg-gray-300'
                }`
              }
            >
              {item.name}
            </NavLink>
          ))}
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-6 bg-white">
        <Outlet />
      </div>
    </div>
  )
}