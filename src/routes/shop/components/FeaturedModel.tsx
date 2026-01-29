import { Zap } from "lucide-react";

export default function FeaturedModel() {
  return (
    <div className="col-span-1 sm:col-span-2 xl:col-span-4 bg-linear-to-r from-[#00a388]/10 to-[#E6FF00]/5 border border-[#00a388]/20 rounded-3xl p-8 flex flex-col md:flex-row items-center justify-between gap-8 my-8 overflow-hidden relative">
      <div className="absolute top-0 right-0 w-64 h-64 bg-[#00a388]/20 blur-[100px] rounded-full -mr-20 -mt-20"></div>
      <div className="relative z-10 space-y-4 max-w-lg">
        <div className="flex items-center gap-2">
          <Zap className="text-[#00a388] fill-[#00a388]" size={16} />
          <span className="text-xs font-bold text-[#00a388] uppercase tracking-[0.2em]">
            AI Intelligence Best Value
          </span>
        </div>
        <h2 className="text-3xl font-bold tracking-tight">System Performance Bundle</h2>
        <p className="text-slate-400">
          Save 25% when you combine the AeroShift Pro Keyboard with the GlidePoint Z Mouse. Limited time offer
          for the digital elite.
        </p>
        <button className="px-8 py-3 bg-[#00a388] text-white font-bold rounded-xl hover:shadow-[0_0_20px_rgba(0,163,136,0.4)] transition-all">
          Claim Bundle Deal
        </button>
      </div>
      <div className="relative w-full md:w-1/2 aspect-video bg-[#161b22] rounded-2xl overflow-hidden border border-white/10 shadow-2xl">
        <img
          className="w-full h-full object-cover"
          alt="High-end PC setup with dual monitors"
          src="https://lh3.googleusercontent.com/aida-public/AB6AXuDlsLuRgSXMMbdtQpp3uX_dlGOxBdj-p8bYuiRsnxtmJ3iYmyJ4zHGWh-HWnHY6OUacYUfQ4ojlK9oSrszQgq_Tutfd0UvHGd3mNPuxlS9v4VdCSlkLU3hsF2vv4JivD9t0EaPt9LmSXPmA3tMpy1tgYp_QfMuXqwGAQQE1vSMVlJu51AYGkJ1kq6KrvJj4uk-Oe3EeLT2cmfzFgfbRxJMKdMwHH78NkX7h98CWRq6y-rPp3Gtlmitm1JdB2rrvgFXeK5VxInKzJKs"
        />
      </div>
    </div>
  );
}