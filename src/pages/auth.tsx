import Input from "@/components/Input";
import React, { useCallback, useState } from "react";

type Props = {};

function Auth({}: Props) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [variant, setVariant] = useState("login");
  const toggleVariant = useCallback(() => {
    setVariant((currentVariant) =>
      currentVariant === "login" ? "register" : "login"
    );
  }, []);
  return (
    <div className="relative h-full w-full bg-[url('/images/hero.jpg')] bg-cover bg-fixed bg-center bg-no-repeat">
      <div className="h-full w-full bg-black lg:bg-opacity-50">
        <nav className="px-12 py-5">
          <img className="h-12" src="/images/logo.png" alt="logo" />
          <div className="flex justify-center">
            <div className="mt-2 w-full self-center rounded-md bg-black bg-opacity-70 p-16 lg:w-2/5 lg:max-w-md">
              <h2 className="mb-8 text-4xl font-semibold text-white">
                {variant === "login" ? "Sign In" : "Register"}
              </h2>
              <div className="flex flex-col gap-4">
                {variant === "register" && (
                  <Input
                    label="Username"
                    onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                      setName(event.target.value)
                    }
                    id="name"
                    type="name"
                    value={name}
                  />
                )}
                <Input
                  label="Email"
                  onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                    setEmail(event.target.value)
                  }
                  id="email"
                  type="email"
                  value={email}
                />
                <Input
                  label="Password"
                  onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                    setPassword(event.target.value)
                  }
                  id="password"
                  type="password"
                  value={password}
                />
                <button className="mt-10 w-full rounded-md bg-red-600 py-3 text-white transition hover:bg-red-700">
                  {variant === "login" ? "Login" : "Signup"}
                </button>
                <p className="mt-12 text-neutral-500">
                  {variant === "login" ? "First time using Netflix? " : "Already have an account?"}
                  <span
                    onClick={toggleVariant}
                    className="ml-1 cursor-pointer text-white hover:underline"
                  >
                    {variant === "login" ? "Create An Account" : "Login"}
                  </span>
                </p>
              </div>
            </div>
          </div>
        </nav>
      </div>
    </div>
  );
}

export default Auth;
