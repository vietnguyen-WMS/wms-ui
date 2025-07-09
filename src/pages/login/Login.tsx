import { Button, Input } from "@/components/ui";
import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "@/stores";

interface LoginFormState {
  username: string;
  password: string;
}

const Login = () => {
  const [formData, setFormData] = useState<LoginFormState>({
    username: "",
    password: "",
  });
  const [loginError, setLoginError] = useState<string>("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const { checkAuth } = useAuth();

  const navigationFrom = location.state?.from || "/";

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));

    if (loginError) setLoginError("");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // if (!validateForm()) return;
    setIsSubmitting(true);

    try {
      const res = await fetch("http://localhost:3000/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
        credentials: "include",
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.message || "Login failed!");
      }

      await checkAuth();

      navigate(navigationFrom, { replace: true });
    } catch (err: any) {
      setLoginError(err.message || "Login failed");
    } finally {
      setIsSubmitting(false);
      setFormData({ username: "", password: "" });
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
              value={formData.username}
              onChange={handleInputChange}
              placeholder="Username"
            />
          </div>
          <div className="block">
            <Input
              name="password"
              type="password"
              value={formData.password}
              onChange={handleInputChange}
              placeholder="Password"
            />
          </div>
          {loginError && <div className="text-red-500 mb-2">{loginError}</div>}
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
