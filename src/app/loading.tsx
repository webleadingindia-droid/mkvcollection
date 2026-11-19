export default function Loading() {
  return (
    <div className="container-x flex min-h-[50vh] items-center justify-center" role="status" aria-live="polite">
      <span className="h-10 w-10 animate-spin rounded-full border-4 border-peach border-t-maroon" />
      <span className="sr-only">Loading…</span>
    </div>
  );
}
