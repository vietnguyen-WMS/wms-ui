import { Button } from "@/components/ui";
import Input from "@/components/ui/Input";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));

    // Clear error when user types
    if (errors[name as keyof LoginError]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
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
      const res = await fetch("https://dummyjson.com/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.message || "Login failed!");
      }

      navigate("/");
    } catch (err: any) {
      setErrors({ general: err.message || "Login failed" });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <div className="flex justify-center items-center h-screen">
        <form className="mx-96 space-y-4" onSubmit={handleSubmit}>
          <div className="flex space-x-3">
            <Input
              name="username"
              value={form.username}
              onChange={handleChange}
              error={errors.username}
              placeholder="Enter your username"
              autoFocus
            />
          </div>
          <div className="flex space-x-3">
            <Input
              name="password"
              type="password"
              value={form.password}
              onChange={handleChange}
              error={errors.password}
              placeholder="Enter your password"
              showTogglePassword
            />
          </div>
          <div className="flex justify-center">
            <Button disabled={isSubmitting}>
              {isSubmitting ? "Loggin in..." : "Login"}
            </Button>
          </div>
        </form>
      </div>
    </>
  );
};

export default Login;
