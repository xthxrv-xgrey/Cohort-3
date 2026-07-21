import { Link } from "react-router";
import { MoveRight } from "lucide-react";

const Landing = () => {
  return (
    <div>
      <header className="h-[8vh] z-50 bg-background py-4 border-b-2 border-border flex justify-between items-center px-4 sm:px-8 md:px-12 lg:px-20 xl:px-32 2xl:px-40">
        <Link to="/home">
          <h1 className="font-serif text-2xl">Sky Mart</h1>
        </Link>

        <div className="flex">
          <Link
            className="py-2 px-8 text-accent-foreground font-sans text-sm rounded-4xl hover:text-muted-foreground active:scale-95"
            to={"/login"}
          >
            Sign in
          </Link>
          <Link
            className="bg-accent-foreground py-2 px-6 text-background font-sans text-xs rounded-4xl border-accent-foreground border-2 hover:bg-background hover:text-accent-foreground active:scale-95"
            to={"/register"}
          >
            JOIN
          </Link>
        </div>
      </header>

      <div className="min-h-[70vh] pb-32 py-4 overflow-y-scroll hide-scrollbar flex flex-col gap-4 px-4 sm:px-8 md:px-12 lg:px-20 xl:px-32 2xl:px-40">
        <div className="pt-20 flex flex-col gap-8">
          <p className="font-sans text-xs text-muted-foreground font-semibold tracking-widest">
            VOLUME 01 — SPRING COLLECTION
          </p>
          <h1 className="font-serif text-8xl">
            Objects of
            <br />
            <span className="italic">quiet consequence</span>.
          </h1>
          <div className="flex flex-col justify-between gap-4 md:flex-row ">
            <p className="text-muted-foreground max-w-100">
              Sky Mart is a small, thoughtful store. We collect pieces across
              fashion, electronics, and jewelry — chosen for how they feel in
              the hand and how they last across seasons.
            </p>
            <Link
              className=" flex h-max justify-center items-center gap-4 bg-accent-foreground py-2 px-6 text-background font-sans text-xs rounded-4xl border-accent-foreground border-2 hover:bg-background hover:text-accent-foreground active:scale-95"
              to={"/login"}
            >
              Begin Shopping <MoveRight />
            </Link>
          </div>
        </div>
      </div>

      <div className="columns-1 lg:columns-2 gap-4 px-4 sm:px-8 md:px-12 lg:px-20 xl:px-32 2xl:px-40">
        <img
          src="https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?w=1600&q=80"
          className="w-full mb-4 rounded-4xl"
          alt=""
        />

        <img
          src="https://images.unsplash.com/photo-1512436991641-6745cdb1723f?w=1200&q=80"
          className="w-full mb-4 rounded-4xl"
          alt=""
        />
      </div>

      <div className="flex flex-col md:flex-row py-16">
        <div className="w-full border-2 border-border p-8 flex flex-col gap-8">
          <p className="font-serif text-2xl text-primary">01</p>
          <h2 className="font-serif text-4xl text-primary">Secure payments</h2>
          <p className="font-sans text-muted-foreground">
            Handled through trusted processors, encrypted end-to-end.
          </p>
        </div>
        <div className="w-full border-2 border-border p-8 flex flex-col gap-8">
          <p className="font-serif text-2xl text-primary">02</p>
          <h2 className="font-serif text-4xl text-primary">Quality curation</h2>
          <p className="font-sans text-muted-foreground">
            Every piece is reviewed by our editors before it lists.
          </p>
        </div>
        <div className="w-full border-2 border-border p-8 flex flex-col gap-8">
          <p className="font-serif text-2xl text-primary">03</p>
          <h2 className="font-serif text-4xl text-primary">
            Considered shipping
          </h2>
          <p className="font-sans text-muted-foreground">
            Carbon-conscious carriers, tracked from door to door.
          </p>
        </div>
      </div>

      <footer className="flex flex-col  justify-between items-center gap-4 py-8 sm:flex-row px-4 sm:px-8 md:px-12 lg:px-20 xl:px-32 2xl:px-40">
        <p className="text-primary font-sans text-sm">
          © 2026 Sky Mart. All goods, all considered.
        </p>
        <div className="flex gap-8">
          <Link
            to={"login"}
            className="text-muted-foreground text-xs hover:text-primary active:scale-95"
          >
            Sign in
          </Link>
          <Link
            to={"register"}
            className="text-muted-foreground text-xs hover:text-primary active:scale-95"
          >
            Create account
          </Link>
        </div>
      </footer>
    </div>
  );
};

export default Landing;
