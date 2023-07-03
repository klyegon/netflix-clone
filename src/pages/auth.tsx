import Input from "@/components/Input";
import React, { useCallback, useState } from "react";
import axios from "axios";
import { signIn } from "next-auth/react";
import { useRouter } from "next/router";

import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";

type Props = {};

function Auth({ }: Props) {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [variant, setVariant] = useState("login");
  const toggleVariant = useCallback(() => {
    setVariant((currentVariant) =>
      currentVariant === "login" ? "register" : "login"
    );
  }, []);

  const login = useCallback(async () => {
    try {
      await signIn("credentials", { email, password, redirect: false, callbackUrl: "/" });
      router.push("/")
    } catch (error) {
      console.log(error);
    }
  }, [email, password, router]);

  const register = useCallback(async () => {
    try {
      await axios.post("/api/register", { email, name, password });
      login();
    } catch (error) {
      console.log(error);
    }
  }, [email, name, password, login]);

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
                <button onClick={variant === "login" ? login : register} className="mt-10 w-full rounded-md bg-red-600 py-3 text-white transition hover:bg-red-700">
                  {variant === "login" ? "Login" : "Signup"}
                </button>
                <div className="flex flex-row item-center gap-4 mt-8 justify-center">
                  <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center cursor-pointer hover:opacity-80 transition"
                    onClick={() => signIn("google", { callbackUrl: "/" })}>
                    <FcGoogle size={30} />
                  </div>
                  <div className="w-10 ht-10 bg-white rounded-full flex items-center justify-center cursor-pointer hover:opacity-80 transition"
                    onClick={() => signIn("github", { callbackUrl: "/" })}>
                    <FaGithub size={30} />
                  </div>
                </div>
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
