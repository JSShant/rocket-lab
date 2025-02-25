import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

export const Login: React.FC = () => {
  const [error, setError] = useState();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm();

  const navigate = useNavigate();

  const onSubmit = async (data: any) => {
    try {
      const authLogin = {
        authLogin: {
          email: data.email,
          pass: data.pass,
        },
      };
      const response = await fetch("https://testvm1.rokt.io/api/jsonql", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
          "x-api-key": "c37861c7-7414-4a40-bbd8-3343662e4483",
        },
        body: JSON.stringify(authLogin),
      });

      if (!response.ok) {
        throw new Error("Invalid Credentials");
      }

      const result = await response.json();
      console.log("Login Successful", result, data);
      result.authLogin !== "invalid credentials" && navigate("/user");
      result.authLogin === "invalid credentials" && setError(result.authLogin);
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.error("Login Failed", error.message);
      } else {
        console.error("Unknown error");
      }
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div>
        <label>Email:</label>
        <input
          type="email"
          {...register("email", { required: "Email is required" })}
        />
        {errors.email && <p>{String(errors.email.message)}</p>}
      </div>

      <div>
        <label>Password:</label>
        <input
          type="password"
          {...register("pass", { required: "Password is required" })}
        />
      </div>

      <button type="submit" disabled={isSubmitting}>
        {isSubmitting ? "Submitting..." : "Login"}
      </button>
      <p>{error}</p>
    </form>
  );
};
