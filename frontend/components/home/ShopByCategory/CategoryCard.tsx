import Image from "next/image";
import React from "react";
import Link from "next/link";

interface CategoryCardProps {
  title: string;
  image: string;
  href: string;
}

const CategoryCard = ({
  title,
  image,
  href,
}: CategoryCardProps) => {
  return (
    <Link
      href={href}
      className="
        group
        relative
        shrink-0
        w-[75vw]
        sm:w-[45vw]
        md:w-[40vw]
        lg:w-[33vw]
        aspect-3/4
        overflow-hidden
        rounded
        bg-surface-muted
      "
    >
      {/* Image */}
      <Image
        src={image}
        alt={title}
        fill
        sizes="(max-width: 640px) 75vw, (max-width: 1024px) 45vw, 33vw"
        className="
          object-cover
          object-center
          transition-transform
          duration-1200
          ease-out
          group-hover:scale-105
        "
      />

      {/* Bottom */}
      <div
        className="
          absolute
          inset-x-0
          bottom-0
          h-1/2
          bg-linear-to-t
          from-foreground/60
          via-foreground/20
          to-transparent
          pointer-events-none
        "
      />

      {/* Content */}
      <div
        className="
          absolute
          inset-x-0
          bottom-0
          z-10
          flex
          items-end
          justify-between
          p-5
          md:p-6
        "
      >
        <h2
          className="
            text-primary-foreground
            
            text-xl
            lg:text-3xl
            font-semibold
            uppercase
            tracking-[0.12em]
          "
        >
          {title}
        </h2>

        <span
          className="
            text-primary-foreground
            text-xs
            md:text-sm
            uppercase
            tracking-[0.18em]
            border-b
            border-border-subtle/70
            pb-1
            transition-transform
            duration-300
            group-hover:translate-x-1
          "
        >
          Shop
        </span>
      </div>
    </Link>
  );
};

export default CategoryCard;