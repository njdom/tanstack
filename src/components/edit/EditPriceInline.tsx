import { productsCollection } from '@/db/products.db';
import { useState } from "react";
import { Pencil, Check, X } from 'lucide-react';
import { Product } from '@/types';

type PriceEditState =
  { inputPrice: string; forceFailure: boolean; submittedError?: string }

export function EditPriceInline({ productId, currentPrice }: Readonly<{ productId: Product['_id']; currentPrice: number }>) {
  const [isEditing, setIsEditing] = useState(false);
  const [state, setState] = useState<PriceEditState>({ inputPrice: currentPrice.toFixed(2), forceFailure: false });

  const save = async () => {
    if (!isEditing) return;
    const newPrice = Number.parseFloat(state.inputPrice);
    if (Number.isNaN(newPrice) || newPrice < 0) return;

    const tx = productsCollection.update(productId, (draft) => {
      draft.price = newPrice;
      draft.priceUpdateShouldFail = state.forceFailure;
    });
    setIsEditing(false);

    try {
      await tx.isPersisted.promise;
    } catch (error) {
      const message = error instanceof Error ? error.message : String(error);
      console.error(message);
    }
  };

  if (!isEditing) {
    return (
      <button
        onClick={() => setIsEditing(true)}
        className="flex items-center gap-1.5 text-xs font-bold text-slate-500 hover:text-[#00a388] transition-colors group"
      >
        <Pencil size={11} className="group-hover:scale-110 transition-transform" />
        Edit Price
      </button>
    );
  }

  if (isEditing) {
    return (
      <div className="flex flex-col gap-4 p-4 rounded-xl bg-[#161c24] border border-white/10">
        <div className="flex items-center gap-2">
          <span className="text-slate-400 text-lg font-black">$</span>
          <input
            type="number"
            value={state.inputPrice}
            onChange={(e) => setState({ ...state, inputPrice: e.target.value })}
            onKeyDown={(e) => {
              if (e.key === 'Enter') { save(); return; }
              if (e.key === 'Escape') { setIsEditing(false); }
            }}
            className="bg-transparent text-2xl font-black text-white w-32 outline-none border-b-2 border-[#00a388] pb-1 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
            autoFocus
          />
        </div>

        {/* Force failure toggle */}
        <button
          type="button"
          onClick={() => setState({ ...state, forceFailure: !state.forceFailure })}
          className="flex items-center gap-3 group w-fit"
        >
          <div
            className={`relative w-10 h-5 rounded-full transition-colors duration-200 ${state.forceFailure ? 'bg-red-500' : 'bg-white/10'}`}
          >
            <div
              className={`absolute top-0.5 left-0.5 size-4 bg-white rounded-full shadow transition-transform duration-200 ${state.forceFailure ? 'translate-x-5' : 'translate-x-0'}`}
            />
          </div>
          <span className={`text-xs font-bold transition-colors ${state.forceFailure ? 'text-red-400' : 'text-slate-500'}`}>
            {state.forceFailure ? '⚡ Simulate Server Failure ON' : 'Simulate Server Failure'}
          </span>
        </button>

        <div className="flex gap-2">
          <button
            onClick={save}
            className={`px-5 py-2 text-xs font-black uppercase tracking-widest rounded-lg transition-colors ${state.forceFailure ? 'bg-red-500/20 border border-red-500/40 text-red-400 hover:bg-red-500/30' : 'bg-[#00a388] hover:bg-[#008f77] text-white'}`}
          >
            Save
          </button>
          <button
            onClick={() => setIsEditing(false)}
            className="px-5 py-2 bg-white/5 hover:bg-white/10 text-slate-400 text-xs font-black uppercase tracking-widest rounded-lg transition-colors"
          >
            Cancel
          </button>
        </div>
      </div>
    );
  }

  if (state.submittedError !== undefined && state.submittedError === '') {
    return (
      <div className="flex items-center gap-2 text-xs font-bold text-[#00a388]">
        <Check size={13} />
        <span>Server confirmed! Price updated.</span>
      </div>
    );
  }

  if (state.submittedError) {
    return (
      <div className="flex flex-col gap-1">
        <div className="flex items-center gap-2 text-xs font-bold text-red-400">
          <X size={13} />
          <span>Server rejected — price rolled back</span>
        </div>
        <p className="text-[10px] text-slate-500 font-mono">{state.submittedError}</p>
      </div>
    );
  }
}