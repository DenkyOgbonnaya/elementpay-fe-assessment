"use client";
import { ConnectButton } from "@rainbow-me/rainbowkit";

type WalletConnectionProps = React.ComponentProps<typeof ConnectButton>;

export default function WalletConnection({ ...props }: WalletConnectionProps) {
  return <ConnectButton {...props} />;
}
