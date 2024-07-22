"use client";

import { getProviders, signIn, signOut, useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { type FC, useEffect, useState } from "react";
type Props = unknown;

const Nav: FC<Props> = () => {
  const { data: session } = useSession();

  const [toggleDropdown, setToggleDropdown] = useState<boolean>(false);

  const [providers, setProviders] =
    useState<Awaited<ReturnType<typeof getProviders>>>(null);

  useEffect(() => {
    (async () => {
      const res = await getProviders();
      setProviders(res);
    })();
  }, []);

  return (
    <nav className="flex-between mb-16 w-full pt-3">
      <Link href={"/"} className="flex-center flex gap-2">
        <Image
          alt={"Promptopia logo"}
          className="object-contain"
          height={30}
          src={"/assets/images/logo.svg"}
          width={30}
        />
        <p className="logo_text">Promptopia</p>
      </Link>

      {/* Desktop Navigation */}
      <div className="hidden sm:flex">
        {session?.user ? (
          <div className="flex gap-3 md:gap-5">
            <Link href={"/create-prompt"} className="black_btn">
              Create Post
            </Link>
            <button type="button" onClick={signOut} className="outline_btn">
              Sign Out
            </button>
            <Link href={"/profile"}>
              <Image
                alt={"profile"}
                className="rounded-full"
                height={37}
                src={session?.user.image || "/assets/icons/loader.svg"}
                width={37}
              />
            </Link>
          </div>
        ) : (
          <>
            {providers &&
              Object.values(providers).map((provider) => (
                <button
                  type="button"
                  key={provider.name}
                  onClick={() => signIn(provider.id)}
                  className="black_btn"
                >
                  Sign In
                </button>
              ))}
          </>
        )}
      </div>
      {/* Mobile Navigation */}
      <div className="relative flex sm:hidden">
        {session?.user ? (
          <div className="flex">
            <Image
              alt={"profile"}
              className="rounded-full"
              height={37}
              onClick={() => setToggleDropdown((prev) => !prev)}
              src={session?.user.image || "/assets/icons/loader.svg"}
              width={37}
            />
            {toggleDropdown && (
              <div className="dropdown">
                <Link
                  href={"/profile"}
                  className="dropdown_link"
                  onClick={() => setToggleDropdown(false)}
                >
                  My Profile
                </Link>
                <Link
                  href={"/create-prompt"}
                  className="dropdown_link"
                  onClick={() => setToggleDropdown(false)}
                >
                  Create Prompt
                </Link>
                <button
                  className="black_btn mt-5 w-full"
                  type="button"
                  onClick={() => {
                    signOut();
                    setToggleDropdown(false);
                  }}
                >
                  Sign Out
                </button>
              </div>
            )}
          </div>
        ) : (
          <>
            {providers &&
              Object.values(providers).map((provider) => (
                <button
                  type="button"
                  key={provider.name}
                  onClick={() => signIn(provider.id)}
                  className="black_btn"
                >
                  Sign In
                </button>
              ))}
          </>
        )}
      </div>
    </nav>
  );
};

export default Nav;
