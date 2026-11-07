"use client";

/**
 * `<select>` nativo que envia su formulario apenas cambia. Sin JavaScript sigue
 * funcionando: el formulario tiene su boton de "Buscar". Es nativo y no el
 * Select de Radix porque tiene que viajar en un formulario GET sin ayuda.
 */
export function SelectFiltro({
  name,
  label,
  defaultValue,
  opciones,
}: {
  name: string;
  label: string;
  defaultValue?: string;
  opciones: { value: string; label: string }[];
}) {
  return (
    <label className="flex flex-col gap-1 text-sm font-medium text-zinc-700">
      {label}
      <select
        name={name}
        defaultValue={defaultValue ?? ""}
        onChange={(e) => e.currentTarget.form?.requestSubmit()}
        className="h-9 rounded-lg border border-zinc-300 bg-white px-2 text-sm text-zinc-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/50"
      >
        <option value="">Todas</option>
        {opciones.map((o) => (
          <option key={o.value} value={o.value}>
            {o.label}
          </option>
        ))}
      </select>
    </label>
  );
}
