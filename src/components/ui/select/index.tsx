import { twMerge } from "tailwind-merge";
type SelectProps = React.ComponentProps<"select"> & {
  className?: string;
};
export default function Select({ className, ...rest }: SelectProps) {
  return (
    <select
      className={twMerge(
        `w-full px-3 py-2 rounded-md bg-surface-lighter text-text-primary border border-border focus:outline-none`,
        className
      )}
      {...rest}
    />
  );
}
