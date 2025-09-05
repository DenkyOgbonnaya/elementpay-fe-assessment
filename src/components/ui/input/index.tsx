import { twMerge } from "tailwind-merge";
type InputProps = React.ComponentProps<"input"> & {
  className?: string;
};
export default function Input({ className, ...rest }: InputProps) {
  return (
    <input
      className={twMerge(
        `w-full px-3 py-2 rounded-md bg-surface-lighter text-text-primary border border-border focus:outline-none`,
        className
      )}
      {...rest}
    />
  );
}
