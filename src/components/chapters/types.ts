export type HeroProps = {
  /**
   * "chapter": one of three stacked heroes on the home page (uses an h2, links onward).
   * "page": the top of that hero's own page (uses the page's h1, offers the main action).
   */
  variant: "chapter" | "page";
  id?: string;
  className?: string;
};
