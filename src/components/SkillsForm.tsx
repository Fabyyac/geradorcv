import { Skill } from '../types';


interface Props {
items: Skill[];
onAdd: () => void;
onRemove: (id: string) => void;
onChange: (id: string, patch: Partial<Skill>) => void;
}


export default function SkillsForm({ items, onAdd, onRemove, onChange }: Props) {
return (
<section className="space-y-3">
<div className="flex items-center justify-between">
<h2 className="text-lg font-semibold">Habilidades</h2>
<button type="button" onClick={onAdd} className="rounded-md bg-neutral-900 px-3 py-1 text-white hover:opacity-90">+ Adicionar</button>
</div>


<div className="space-y-3">
{items.map((s) => (
<div key={s.id} className="grid grid-cols-4 gap-2 items-center">
<input
className="col-span-3 rounded-lg border border-neutral-300 px-3 py-2 outline-none focus:ring-2 focus:ring-[--color-brand]"
value={s.name}
onChange={(e) => onChange(s.id, { name: e.target.value })}
placeholder="Ex.: JavaScript" />


<select
className="rounded-lg border border-neutral-300 px-2 py-2 outline-none focus:ring-2 focus:ring-[--color-brand]"
value={s.level}
onChange={(e) => onChange(s.id, { level: Number(e.target.value) as any })}
>
<option value={1}>Básico</option>
<option value={2}>Intermediário</option>
<option value={3}>Avançado</option>
<option value={4}>Sênior</option>
<option value={5}>Expert</option>
</select>


<button type="button" onClick={() => onRemove(s.id)} className="justify-self-end text-sm text-red-600 hover:underline">remover</button>
</div>
))}


{items.length === 0 && (
<p className="text-sm text-neutral-500">Nenhuma habilidade adicionada ainda.</p>
)}
</div>
</section>
);
}