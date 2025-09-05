interface Props {
  error: { error: string; message: string };
}
export default function OrderNotFound({ error }: Props) {
  return (
    <div className="overflow-x-auto bg-surface p-6 rounded-xl shadow-lg">
      <h2>Error:{error?.error}</h2>
      <p>{error.message}</p>
    </div>
  );
}
