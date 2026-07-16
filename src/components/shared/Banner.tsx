import Link from "next/link";
import React from "react";

type BannerProps = {
  title: string;
  description: string;
  links?: { name: string; href: string }[];
  tag?: string;
};
const Banner = ({ description, title, links, tag }: BannerProps) => {
  return (
    <header className="relative overflow-hidden bg-linear-to-r from-neutral-900 via-neutral-950 to-indigo-950 py-16 text-white dark:from-neutral-950 dark:via-indigo-950 dark:to-neutral-900">
      <div className="bg-size[14px_24px] absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] mask-[radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]" />

      {/* Visual Element */}
      <span className="absolute -top-40 -left-40 size-80 rounded-full bg-indigo-500/20 blur-3xl" />
      <span className="absolute -right-40 -bottom-40 size-80 rounded-full bg-purple-500/20 blur-3xl" />

      <section className="wrapper relative z-10 space-y-3">
        <div className="flex items-center gap-2 text-xs font-semibold tracking-wider text-indigo-400 uppercase">
          <Link href="/" className="transition-300 hover:text-indigo-300">
            Home
          </Link>
          {links && links.length > 0
            ? links.map(({ href, name }, indx) => (
                <React.Fragment key={indx}>
                  <span>/</span>
                  <Link
                    href={href}
                    className="transition-300 hover:text-indigo-300"
                  >
                    {name}
                  </Link>
                </React.Fragment>
              ))
            : ""}
          {tag && (
            <>
              <span>/</span>
              <span className="text-white">{tag}</span>
            </>
          )}
        </div>

        <h1 className="text-3xl font-extrabold tracking-tight capitalize md:text-5xl">
          {title}
        </h1>
        <p className="max-w-2xl text-sm text-balance text-neutral-400">
          {description}
        </p>
      </section>
    </header>
  );
};

export default Banner;
