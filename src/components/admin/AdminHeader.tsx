import { AdminUser } from "@/lib/auth/session";
import { Send, UserCheck, Shield } from "lucide-react";

interface AdminHeaderProps {
  user: AdminUser;
}

export default function AdminHeader({ user }: AdminHeaderProps) {
  return (
    <header className="bg-white border-b border-paper-border h-16 px-6 flex items-center justify-between sticky top-0 z-20">
      <div className="flex items-center gap-3">
        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-sm bg-accent-light text-accent text-xs font-bold border border-accent-border">
          <Shield className="w-3.5 h-3.5" />
          <span>منطقة الإدارة الآمنة</span>
        </span>
      </div>

      <div className="flex items-center gap-4 text-xs">
        <a
          href="https://t.me/gccxic"
          target="_blank"
          rel="noopener noreferrer"
          className="hidden sm:inline-flex items-center gap-1.5 text-[#0c72a6] hover:underline font-semibold"
        >
          <Send className="w-3.5 h-3.5 text-[#229ED9]" />
          <span>قناة التلغرام: @gccxic</span>
        </a>

        <div className="flex items-center gap-2 pl-2 border-r border-paper-border">
          <div className="w-7 h-7 rounded-sm bg-ink text-paper-50 flex items-center justify-center font-bold text-xs">
            HA
          </div>
          <div className="hidden sm:block text-right">
            <span className="block font-bold text-ink leading-tight">
              {user.name}
            </span>
            <span className="block text-[10px] text-ink-muted ltr-text font-latin">
              {user.email}
            </span>
          </div>
        </div>
      </div>
    </header>
  );
}
