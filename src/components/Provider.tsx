"use client";

import type { Session } from "next-auth";
import { SessionProvider } from "next-auth/react";
import type { FC } from "react";
type Props = {
  children: React.ReactNode;
  session: Session;
};

const Provider: FC<Props> = ({ children, session }) => {
  return <SessionProvider session={session}>{children}</SessionProvider>;
};

export default Provider;
