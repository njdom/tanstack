interface ProgressBarProps {
  amountToFreeShipping: number;
  shippingProgress: number;
}

export function ProgressBar({ amountToFreeShipping, shippingProgress }: ProgressBarProps) {
  return (
    <div className="mb-10 max-w-2xl">
      <div className="flex justify-between items-end mb-2">
        <p className="text-sm font-medium text-slate-400 uppercase tracking-widest">Free Express Shipping</p>
        {amountToFreeShipping > 0 ? (
          <p className="text-sm font-bold text-[#00a388]">${amountToFreeShipping.toFixed(2)} more to go</p>
        ) : (
          <p className="text-sm font-bold text-[#E6FF00]">Unlocked!</p>
        )}
      </div>
      <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
        <div
          className="h-full bg-[#00a388] transition-all duration-500"
          style={{ width: `${shippingProgress}%` }}
        ></div>
      </div>
    </div>
  );
}
