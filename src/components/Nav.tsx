"use client";

import { getProviders, signIn, signOut, useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { type FC, useEffect, useState } from "react";
type Props = unknown;

const Nav: FC<Props> = () => {
  const router = useRouter();
  const { data: session } = useSession();

  const [toggleDropdown, setToggleDropdown] = useState<boolean>(false);

  const [providers, setProviders] =
    useState<Awaited<ReturnType<typeof getProviders>>>(null);

  const signOutHandler = () => {
    signOut()
      .then(() => {
        setToggleDropdown(false);
      })
      .catch((error) => {
        console.error("Error signing out:", error);
      });
    toggleDropdown && setToggleDropdown(false);
  };

  useEffect(() => {
    (async () => {
      const res = await getProviders();
      setProviders(res);
    })().catch((error) => {
      console.error("Error getting providers:", error);
    });
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
            <button
              type="button"
              onClick={signOutHandler}
              className="outline_btn"
            >
              Sign Out
            </button>
            <Link
              href={`/profile?id=${session?.user?.id}&name=${session?.user?.name}`}
            >
              <Image
                alt={"profile"}
                className="rounded-full"
                height={37}
                src={session?.user.image ?? "/assets/icons/loader.svg"}
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
              src={"/assets/icons/menu.svg"}
              width={37}
            />
            {toggleDropdown && (
              <div className="dropdown">
                <div className="flex w-full items-center justify-between">
                  <Image
                    alt={"profile"}
                    className="cursor-pointer rounded-full"
                    height={37}
                    onClick={() => {
                      router.push(
                        `/profile?id=${session?.user?.id}&name=${session?.user?.name}`,
                      );
                      setToggleDropdown((prev) => !prev);
                    }}
                    src={session?.user.image ?? "/assets/icons/loader.svg"}
                    width={37}
                  />
                  <div className="flex flex-col gap-2">
                    <Link
                      href={`/profile?id=${session?.user.id}&name=${session?.user.name}`}
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
                      Create Post
                    </Link>
                  </div>
                </div>
                <button
                  className="black_btn mt-3 w-full"
                  type="button"
                  onClick={signOutHandler}
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
