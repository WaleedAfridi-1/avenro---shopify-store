import Link from "next/link";
import { X } from "lucide-react";
import { CiUser } from "react-icons/ci";
import { IoMdHeartEmpty } from "react-icons/io";
import { IoCallOutline } from "react-icons/io5";
import MobileNavigation from "./MobileNavigation";


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
      <div className="drawer-side z-9999">

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

          {/* Mobile Navigation */}
          <MobileNavigation/>


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