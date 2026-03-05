"use client";

export default function ProfilePhoto() {
  return (
    <div>
      <div className="w-28 h-28 sm:w-32 sm:h-32 md:w-40 md:h-40 rounded-full overflow-hidden border-[3px] border-white/20 shadow-2xl shadow-[#0ea5e9]/15 ring-1 ring-white/[0.06]">
        <img
          src="/profile.jpg"
          alt="Dave Thibault"
          className="w-full h-full object-cover"
          onError={(e) => {
            (e.target as HTMLImageElement).style.display = "none";
          }}
        />
      </div>
    </div>
  );
}
