import RegisterForm from "../../components/auth/RegisterForm.jsx";

const Register = () => {
  return (
    <div className="min-h-screen w-full bg-background flex">
      {/* Left Image */}
      <div className="hidden lg:flex lg:w-1/2">
        <img
          src="https://images.unsplash.com/photo-1483985988355-763728e1935b?w=1400&q=80"
          alt="Fashion"
          className="h-screen w-full object-cover sticky top-0"
        />
      </div>

      {/* Right Content */}
      <div className="flex w-full lg:w-1/2 justify-center">
        <div className="w-full max-w-xl px-6 sm:px-10 lg:px-16 py-12 flex flex-col justify-center">
          <div className="flex flex-col gap-4">
            <p className="font-sans text-xs font-semibold tracking-[0.25em] text-muted-foreground">
              NEW ARRIVAL
            </p>

            <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl leading-tight">
              Make it <br />
              <span className="italic text-primary">Yours.</span>
            </h1>

            <p className="max-w-md text-sm text-muted-foreground">
              Create an account to save your carts, orders, and wishlist.
            </p>
          </div>

          <RegisterForm />
        </div>
      </div>
    </div>
  );
};

export default Register;
