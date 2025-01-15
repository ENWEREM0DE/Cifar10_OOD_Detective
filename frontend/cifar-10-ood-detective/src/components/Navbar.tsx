import { Link } from 'react-router-dom'
import { Search } from 'lucide-react'

const Navbar = () => {
  return (
    <nav className="sticky top-0 bg-[#1A1A2E] text-[#F5F5DC] shadow-md">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Search className="h-6 w-6 text-[#FFD700] mr-2" />
            <span className="font-serif text-xl font-bold tracking-wide">CIFAR-10 OOD Detective</span>
          </div>
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4">
              <NavLink href="#case-files">The Case Files</NavLink>
              <NavLink href="#usual-suspects">The Usual Suspects</NavLink>
              <NavLink href="#interrogate">Interrogate an Image</NavLink>
            </div>
          </div>
        </div>
      </div>
      <div className="h-px bg-[#FFD700]"></div>
    </nav>
  )
}

const NavLink = ({ href, children }: { href: string; children: React.ReactNode }) => (
    <a
      href={href}
      onClick={(e) => {
        e.preventDefault()  // Prevent the default behavior of the anchor tag
        window.location.href = href // Set the location to the specified href
      }}
      className="font-serif text-sm hover:text-[#FFD700] hover:underline hover:decoration-[#800020] hover:decoration-2 transition-colors duration-200 flex items-center"
    >
      <Search className="h-4 w-4 mr-1" />
      {children}
    </a>
  )

export default Navbar
