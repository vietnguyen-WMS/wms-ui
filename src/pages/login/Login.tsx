import { Button, Input } from "@/components/ui";
import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "@/stores";

interface LoginFormState {
  username: string;
  password: string;
}

interface LoginError {
  username?: string;
  password?: string;
  general?: string;
}

const Login = () => {
  const [form, setForm] = useState<LoginFormState>({
    username: "",
    password: "",
  });
  const [errors, setErrors] = useState<LoginError>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const { checkAuth } = useAuth();

  const navigationFrom = location.state?.from || "/";

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));

    if (errors[name as keyof LoginError]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }

    if (errors.general) {
      setErrors((prev) => ({ ...prev, general: undefined }));
    }
  };

  const validateForm = (): boolean => {
    const newErrors: LoginError = {};
    if (!form.username) newErrors.username = "Username is required!";
    if (!form.password) newErrors.password = "Password is required!";
    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;
    setIsSubmitting(true);

    try {
      const res = await fetch("http://localhost:3000/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
        credentials: "include",
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.message || "Login failed!");
      }

      await checkAuth();

      navigate(navigationFrom, { replace: true });
    } catch (err: any) {
      setErrors({ general: err.message || "Login failed" });
    } finally {
      setIsSubmitting(false);
      setForm({ username: "", password: "" });
    }
  };

  return (
    <>
      <div className="flex justify-center pt-[200px] h-screen">
        <form
          className="max-w-96 space-y-4"
          onSubmit={handleSubmit}
          autoComplete="off"
        >
          <div className="block">
            <Input
              name="username"
              value={form.username}
              onChange={handleChange}
              error={errors.username}
              placeholder="Username"
              autoFocus
            />
          </div>
          <div className="block">
            <Input
              name="password"
              type="password"
              value={form.password}
              onChange={handleChange}
              error={errors.password}
              placeholder="Password"
              showTogglePassword
            />
          </div>
          {errors.general && (
            <div className="text-red-500 mb-2">{errors.general}</div>
          )}
          <div className="flex justify-center">
            <Button disabled={isSubmitting} className="w-full">
              Login
            </Button>
          </div>
        </form>
      </div>
    </>
  );
};

export default Login;
