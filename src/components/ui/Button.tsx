import Link from "next/link";
import type { ComponentProps, ReactNode } from "react";
import { cn } from "@/lib/cn";
import { ArrowIcon } from "./icons";

type Common = {
  variant?: "gold" | "outline" | "ghost";
  size?: "md" | "lg";
  /** Show a trailing arrow that nudges on hover. */
  arrow?: boolean;
  className?: string;
  children: ReactNode;
};

type AnchorProps = Common & { href: string } & Omit<ComponentProps<"a">, "href" | "className" | "children">;
type NativeButtonProps = Common & { href?: undefined } & Omit<ComponentProps<"button">, "className" | "children">;

const base =
  "group inline-flex items-center justify-center gap-3 rounded-full font-medium uppercase transition-[background-color,color,box-shadow,border-color,transform] duration-300 select-none";

const sizes = {
  md: "min-h-12 px-7 text-[0.72rem] tracking-[0.22em]",
  lg: "min-h-14 px-9 text-[0.78rem] tracking-[0.24em]",
};

const variants = {
  gold: "text-night-950 bg-[linear-gradient(100deg,#b88a35,#e2c57c_45%,#c89d47)] shadow-[0_0_0_1px_rgb(226_197_124/0.4),0_10px_40px_-12px_rgb(200_157_71/0.55)] hover:-translate-y-px hover:shadow-[0_0_0_1px_rgb(246_236_201/0.7),0_14px_50px_-10px_rgb(226_197_124/0.75)]",
  outline: "text-gold-300 border border-gold-500/60 hover:border-gold-300 hover:bg-gold-500/10",
  ghost: "text-ivory/85 hover:text-gold-300",
};

export function Button(props: AnchorProps | NativeButtonProps) {
  const { variant = "gold", size = "md", arrow = false, className, children, ...rest } = props;
  const classes = cn(base, sizes[size], variants[variant], className);
  const content = (
    <>
      <span>{children}</span>
      {arrow && <ArrowIcon className="h-[1.1em] w-[1.1em] transition-transform duration-300 group-hover:translate-x-1" />}
    </>
  );

  if ("href" in props && props.href !== undefined) {
    const { href, ...anchorRest } = rest as Omit<AnchorProps, keyof Common>;
    const external = /^(https?:|mailto:|tel:)/.test(href);
    if (external) {
      return (
        <a href={href} className={classes} {...anchorRest}>
          {content}
        </a>
      );
    }
    return (
      <Link href={href} className={classes} {...anchorRest}>
        {content}
      </Link>
    );
  }

  const buttonRest = rest as Omit<NativeButtonProps, keyof Common>;
  return (
    <button type="button" className={classes} {...buttonRest}>
      {content}
    </button>
  );
}
