import { useState, useContext } from "react";
import { Eye, EyeOff, MoveRight } from "lucide-react";
import { useForm } from "react-hook-form";
import { Link } from "react-router";
import { toast } from "sonner";
import { AuthContext } from "../../context/AuthContext.jsx";
import { CartContext } from "../../context/CartContext.jsx";

const RegisterForm = () => {
  const [showPassword, setShowPassword] = useState(false);

  const { users, setUsers, setCurrentUser } = useContext(AuthContext);
  const { setCart } = useContext(CartContext);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const formSubmit = (data) => {
    const { firstName, lastName, email, password } = data;

    const existingUser = users[email];

    if (existingUser) {
      toast.error("User already exists");
      reset();
      return;
    }

    toast.success("Registration Successfull");

    const newUser = {
      firstName,
      lastName,
      email,
      password,
    };

    setUsers((prev) => ({
      ...prev,
      [email]: newUser,
    }));

    setCart((prev) => ({
      ...prev,
      [email]: {},
    }));

    setCurrentUser(email);

    reset();
  };

  return (
    <div className="w-full py-10">
      <form onSubmit={handleSubmit(formSubmit)} className="flex flex-col gap-8">
        {/* Name */}
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2">
          {/* First Name */}
          <div>
            <label className="text-xs tracking-[0.2em] text-muted-foreground">
              FIRST NAME
            </label>

            <input
              {...register("firstName", {
                required: "First name is required",
              })}
              type="text"
              className="mt-3 w-full border-b border-border bg-transparent py-3 text-sm outline-none transition-colors focus:border-primary"
            />

            {errors.firstName && (
              <p className="mt-2 text-xs text-red-500">
                {errors.firstName.message}
              </p>
            )}
          </div>

          {/* Last Name */}
          <div>
            <label className="text-xs tracking-[0.2em] text-muted-foreground">
              LAST NAME
            </label>

            <input
              {...register("lastName")}
              type="text"
              placeholder="(optional)"
              className="mt-3 w-full border-b border-border bg-transparent py-3 text-sm outline-none transition-colors focus:border-primary placeholder:text-xs"
            />
          </div>
        </div>

        {/* Email */}
        <div>
          <label className="text-xs tracking-[0.2em] text-muted-foreground">
            EMAIL
          </label>

          <input
            {...register("email", {
              required: "Email is required",
              pattern: {
                value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                message: "Enter a valid email",
              },
            })}
            type="email"
            className="mt-3 w-full border-b border-border bg-transparent py-3 text-sm outline-none transition-colors focus:border-primary"
          />

          {errors.email && (
            <p className="mt-2 text-xs text-red-500">{errors.email.message}</p>
          )}
        </div>

        {/* Password */}
        <div>
          <label className="text-xs tracking-[0.2em] text-muted-foreground">
            PASSWORD
          </label>

          <div className="relative mt-3">
            <input
              {...register("password", {
                required: "Password is required",
                pattern: {
                  value:
                    /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9]).{8,}$/,
                  message:
                    "Must contain 8+ characters, uppercase, lowercase, number & special character",
                },
              })}
              type={showPassword ? "text" : "password"}
              className="w-full border-b border-border bg-transparent py-3 pr-10 text-sm outline-none transition-colors focus:border-primary"
            />

            <button
              type="button"
              onClick={() => setShowPassword((prev) => !prev)}
              className="absolute right-1 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-primary"
            >
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>

          {errors.password && (
            <p className="mt-2 text-xs text-red-500">
              {errors.password.message}
            </p>
          )}
        </div>

        {/* Submit */}
        <button
          type="submit"
          className="mt-2 rounded-full bg-accent-foreground py-4 font-medium text-secondary transition-all duration-300 hover:bg-primary active:scale-95"
        >
          Create Account
        </button>

        {/* Login */}
        <div className="flex items-center justify-center gap-2 text-sm">
          <p className="text-muted-foreground">Already have an account?</p>

          <Link
            to="/login"
            className="flex items-center gap-1 text-primary transition hover:underline"
          >
            Sign in
            <MoveRight size={14} />
          </Link>
        </div>
      </form>
    </div>
  );
};

export default RegisterForm;
