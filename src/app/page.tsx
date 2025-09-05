import WalletConnection from "@/components/walletConnection";
import OrderForm from "./_components/orderForm";

export default function Home() {
  return (
    <div className="bg-surface-darker min-h-screen text-text-primary font-sans">
      {/* Header */}
      <header className="flex items-center justify-between px-6 py-4 border-b border-border">
        <span className="font-heading font-bold text-2xl bg-[image:var(--color-primary-gradient)] bg-clip-text text-transparent [-webkit-text-fill-color:transparent]">
          CryptoPay
        </span>

        <WalletConnection showBalance={false} />
      </header>

      {/* Hero Section */}
      <section className="max-w-3xl mx-auto text-center py-20 px-6">
        <h1 className=" text-3xl lg:text-[3rem] leading-8 mb-6 lg:leading-14 font-heading font-bold text-text-primary ">
          CryptoPay is the new
          <br />{" "}
          <span className="bg-[image:var(--color-primary-gradient)] bg-clip-text text-transparent [-webkit-text-fill-color:transparent]">
            standard for payments
          </span>
        </h1>

        <p className=" text-base lg:text-lg font-body font-normal leading-5 text-text-secondary mb-8">
          Connect your wallet and create your first order seamlessly.
        </p>

        <OrderForm />
      </section>
    </div>
  );
}
