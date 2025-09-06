import WalletConnection from "@/components/walletConnection";
import Link from "next/link";

export default function Header() {
  return (
    <header className="flex items-center justify-between px-4 lg:px-6 py-4 border-b border-border">
      <Link
        href="/"
        className="font-heading font-bold text-2xl bg-[image:var(--color-primary-gradient)] bg-clip-text text-transparent [-webkit-text-fill-color:transparent]"
      >
        <span className=" hidden md:block">CryptoPay</span>
        <span className=" md:hidden">CP</span>
      </Link>

      <WalletConnection showBalance={false} />
    </header>
  );
}
