import Link from "next/link";
import { X, ChevronRight } from "lucide-react";
import { CiUser } from "react-icons/ci";
import { IoMdHeartEmpty } from "react-icons/io";
import { IoCallOutline } from "react-icons/io5";
const navItems = [
  {
    label: "New In",
    href: "#",
    ChevronRight : false
  },
  {
    label: "Men",
    href: "#",
    ChevronRight : true
  },
  {
    label: "Women",
    href: "#",
    ChevronRight : true
  },
  {
    label: "Accessories",
    href: "#",
    ChevronRight : true
  },
  {
    label: "Best Sellers",
    href: "#",
    ChevronRight : false
  },
  {
    label: "Sale",
    href: "#",
    ChevronRight : false
  },
];

export default function MobileDrawer() {
  return (
    <div className="drawer">
      {/* Drawer Toggle */}
      <input
        id="avenro-drawer"
        type="checkbox"
        className="drawer-toggle"
      />



      {/* =========================
          DRAWER
      ========================== */}
      <div className="drawer-side z-50">

        {/* Overlay */}
        <label
          htmlFor="avenro-drawer"
          aria-label="Close menu"
          className="drawer-overlay bg-foreground/50"
        />

        {/* Sidebar */}
        <aside className="flex min-h-full w-80 flex-col border-r border-border bg-surface">

          {/* Header */}
          <div className="flex items-center justify-between border-b border-border px-6 py-5">

            <Link
              href="/"
              className="text-xl font-semibold tracking-[0.2em]"
            >
              AVENRO
            </Link>

            <label
              htmlFor="avenro-drawer"
              className="flex h-9 w-9 cursor-pointer items-center justify-center border border-border text-text-secondary transition hover:bg-surface-hover hover:text-text-primary"
              aria-label="Close menu"
            >
              <X size={18} strokeWidth={1.5} />
            </label>

          </div>

          {/* Navigation */}
          <nav className="flex-1 px-4 py-6">

            <p className="mb-3 px-3 text-[11px] font-medium uppercase tracking-[0.2em] text-text-muted">
              Shop
            </p>

            <ul className="space-y-1">

              {navItems.map((item:any, ind : number) => (
                <li key={ind}>

                  <Link
                    href={item.href}
                    className="group flex items-center justify-between px-3 py-3 text-sm font-medium text-text-primary transition hover:bg-surface-hover"
                  >
                    <span>{item.label}</span>
                    {
                        item.ChevronRight && (
                            <ChevronRight
                              size={16}
                              strokeWidth={1.5}
                              className="text-text-muted transition-transform group-hover:translate-x-1"
                            />
                        )}
                  </Link>

                </li>
              ))}

            </ul>

          </nav>

          {/* Bottom */}
          <div className="border-t border-border px-6 py-6">

            <div className="space-y-3 text-sm">

              <Link
                href="/account"
                className="flex items-center  gap-2 text-text-secondary transition hover:text-text-primary"
              >
               <CiUser className="h-4 w-4"/> <p className="uppercase self-baseline text-xs tracking-widest ">My Account</p>
              </Link>

              <Link
                href="/wishlist"
                className="flex items-center gap-2 text-text-secondary transition hover:text-text-primary"
              >
               <IoMdHeartEmpty className="h-4 w-4"/> <p className="uppercase self-baseline text-xs tracking-widest ">Wishlist</p>
              </Link>

              <Link
                href="/contact"
                className="flex items-center gap-2 text-text-secondary transition hover:text-text-primary"
              >
              <IoCallOutline className="h-4 w-4"/> <p className="uppercase self-baseline text-xs tracking-widest ">Contact</p>
              </Link>

            </div>

          </div>

        </aside>
      </div>
    </div>
  );
}