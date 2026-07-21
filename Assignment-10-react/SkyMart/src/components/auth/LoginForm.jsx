import { useState, useContext } from "react";
import { Eye, EyeOff, MoveRight } from "lucide-react";
import { useForm } from "react-hook-form";
import { Link } from "react-router";
import { toast } from "sonner";
import { AuthContext } from "../../context/AuthContext";

const LoginForm = () => {
  const [showPassword, setShowPassword] = useState(false);

  const { users, setCurrentUser } = useContext(AuthContext);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const formSubmit = (data) => {
    const { email, password } = data;

    const user = users[email];

    if (!user) {
      toast.error("User not found");
      return;
    }

    if (user.password !== password) {
      toast.error("Incorrect password");
      return;
    }

    toast.success("Login Successfull");

    setCurrentUser(email);
    reset();
  };

  return (
    <div className="w-full py-10">
      <form onSubmit={handleSubmit(formSubmit)} className="flex flex-col gap-8">
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

        {/* Button */}
        <button
          type="submit"
          className="mt-2 rounded-full bg-accent-foreground py-4 font-medium text-secondary transition-all duration-300 hover:bg-primary active:scale-95"
        >
          Sign In
        </button>

        {/* Register */}
        <div className="flex items-center justify-center gap-2 text-sm">
          <p className="text-muted-foreground">New here?</p>

          <Link
            to="/register"
            className="flex items-center gap-1 text-primary transition hover:underline"
          >
            Create an account
            <MoveRight size={14} />
          </Link>
        </div>
      </form>
    </div>
  );
};

export default LoginForm;
