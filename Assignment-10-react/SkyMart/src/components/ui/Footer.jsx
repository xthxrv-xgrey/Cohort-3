import React from "react";
import { Heart } from "lucide-react";

const Footer = () => {
  return (
    <footer className="border-t border-border bg-surface">
      <div className="min-h-[8vh] flex flex-col md:flex-row items-center justify-between gap-4 px-4 sm:px-8 md:px-12 lg:px-20 xl:px-32 2xl:px-40 py-6">
        <div>
          <h2 className="text-xl font-serif text-primary">Sky Mart</h2>
          <p className="text-sm text-muted-foreground">
            Your one-stop shopping destination.
          </p>
        </div>

        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <span>Made with</span>
          <Heart
            size={16}
            className="fill-red-500 text-red-500 animate-pulse"
          />
          <span>
            by <span className="font-semibold text-primary">Atharv Agrey</span>
          </span>
        </div>

        <div className="flex items-center gap-4 text-muted-foreground">
          <a
            href="https://github.com/xthxrv-xgrey"
            target="_blank"
            rel="noreferrer"
            className="hover:text-primary transition-colors duration-300"
            aria-label="GitHub"
          >
            <i className="ri-github-fill text-4xl"></i>
          </a>

          <a
            href="https://linkedin.com/in/xthxrv-xgrey"
            target="_blank"
            rel="noreferrer"
            className="hover:text-primary transition-colors duration-300"
            aria-label="LinkedIn"
          >
            <i className="ri-linkedin-box-fill text-4xl"></i>
          </a>
        </div>
      </div>

      <div className="border-t border-border py-4 text-center text-xs text-muted-foreground">
        © {new Date().getFullYear()} Sky Mart. Crafted by{" "}
        <span className="text-primary font-medium">Atharv Agrey</span>.
      </div>
    </footer>
  );
};

export default Footer;
