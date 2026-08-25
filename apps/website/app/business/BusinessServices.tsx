type BusinessServicesProps = {
  services: string[];
};

export default function BusinessServices({
  services,
}: BusinessServicesProps) {
  return (
    <section className="rounded-xl border bg-white p-6">
      <h2 className="mb-4 text-xl font-semibold">Services</h2>

      <div className="flex flex-wrap gap-3">
        {services.map((service) => (
          <span
            key={service}
            className="rounded-full bg-gray-100 px-4 py-2 text-sm"
          >
            {service}
          </span>
        ))}
      </div>
    </section>
  );
}
