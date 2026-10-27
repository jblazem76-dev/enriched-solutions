import type { ComponentProps } from "react";
import { cn } from "@/lib/cn";

/** Page-width wrapper with the site's responsive gutters. */
export function Container({ className, ...props }: ComponentProps<"div">) {
  return <div className={cn("mx-auto w-full max-w-[88rem] px-6 sm:px-10 lg:px-16", className)} {...props} />;
}
