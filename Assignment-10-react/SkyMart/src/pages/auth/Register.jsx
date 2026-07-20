import { useContext } from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router";
import { AuthContext } from "../../context/AuthContext";

const Register = () => {
  const { users, setUsers, setCurrentUser } = useContext(AuthContext);

  const {
    register,
    handleSubmit,
    setError,
    reset,
    formState: { errors },
  } = useForm();

  const submit = (data) => {
    const { name, email, password } = data;

    const existingUser = users[email];

    if (existingUser) {
      setError("email", {
        type: "manual",
        message: "User already exists",
      });
      return;
    }

    const newUser = {
      name,
      email,
      password,
      cart: {},
    };

    setUsers((prev) => ({
      ...prev,
      [email]: newUser,
    }));

    setCurrentUser(email);

    reset();
  };

  return (
    <div className="min-h-screen bg-slate-100 flex items-center justify-center p-4">
      <form
        onSubmit={handleSubmit(submit)}
        className="w-full max-w-md bg-white border border-slate-200 rounded-xl shadow-sm p-8 space-y-5"
      >
        <div className="space-y-1">
          <h1 className="text-2xl font-semibold text-slate-800">
            Create Account
          </h1>
          <p className="text-sm text-slate-500">Register to continue.</p>
        </div>

        <div>
          <input
            {...register("name", {
              required: "Name is required",
            })}
            type="text"
            placeholder="Full Name"
            className="w-full rounded-lg border border-slate-300 px-4 py-3 outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100"
          />
          {errors.name && (
            <p className="mt-1 text-sm text-red-500">{errors.name.message}</p>
          )}
        </div>

        <div>
          <input
            {...register("email", {
              required: "Email is required",
              pattern: {
                value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                message: "Enter a valid email",
              },
            })}
            type="email"
            placeholder="Email Address"
            className="w-full rounded-lg border border-slate-300 px-4 py-3 outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100"
          />
          {errors.email && (
            <p className="mt-1 text-sm text-red-500">{errors.email.message}</p>
          )}
        </div>

        <div>
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
            type="password"
            placeholder="Password"
            className="w-full rounded-lg border border-slate-300 px-4 py-3 outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100"
          />
          {errors.password && (
            <p className="mt-1 text-sm text-red-500">
              {errors.password.message}
            </p>
          )}
        </div>

        <button
          type="submit"
          className="w-full rounded-lg bg-emerald-600 py-3 font-medium text-white transition hover:bg-emerald-700 active:scale-[0.99]"
        >
          Register
        </button>

        <p className="text-center text-sm text-slate-600">
          Already have an account?{" "}
          <Link
            to="/login"
            className="font-medium text-emerald-600 hover:underline"
          >
            Login
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Register;
