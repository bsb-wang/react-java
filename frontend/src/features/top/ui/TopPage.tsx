import LanguageSwitcher from "@/components/common/Language-switcher";
import { Button } from "@/components/ui/button";
import { useI18nStore } from "@/i18n/useI18nStore";
import { useAuthStore } from "@/shared/state/authStore";
import { Award, BookOpenCheck, LogOut, ShieldCheck, Star } from "lucide-react";
import { useNavigate } from "react-router-dom";

const featureIcons = [ShieldCheck, Star, BookOpenCheck, Award] as const;
const featureColors = [
    "border-cyan-200 bg-cyan-50 text-cyan-950 hover:border-cyan-400",
    "border-amber-200 bg-amber-50 text-amber-950 hover:border-amber-400",
    "border-emerald-200 bg-emerald-50 text-emerald-950 hover:border-emerald-400",
    "border-rose-200 bg-rose-50 text-rose-950 hover:border-rose-400",
] as const;

export default function TopPage() {
    const navigate = useNavigate();
    const logout = useAuthStore((state) => state.logout);
    const user = useAuthStore((state) => state.user);
    const home = useI18nStore((state) => state.message.home ?? {});


    const handleLogout = () => {
        logout();
        navigate("/login/show");
    };

    return (
        <div className="min-h-screen bg-[radial-gradient(circle_at_top_right,_#cffafe_0,_transparent_35%),linear-gradient(135deg,#f8fafc_0%,#eef6f7_100%)] text-slate-900">
            <header className="border-b border-slate-200/80 bg-white/85 backdrop-blur-md">
                <div className="mx-auto flex min-h-20 max-w-6xl items-center justify-between gap-4 px-5 py-4 sm:px-8">
                    <div className="flex items-center gap-3">
                        <div className="flex size-11 items-center justify-center rounded-xl bg-slate-950 text-cyan-300 shadow-lg shadow-slate-950/15">
                            <ShieldCheck className="size-6" aria-hidden="true" />
                        </div>
                        <div>
                            <p className="text-lg font-bold tracking-tight text-slate-950">SkillNav</p>
                            <p className="text-xs font-medium uppercase tracking-[0.18em] text-slate-500">{home.systemLabel}</p>
                        </div>
                    </div>

                    <div className="flex items-center gap-3">
                        <div className="hidden text-right sm:block">
                            <p className="text-sm font-semibold text-slate-900">{user?.name}</p>
                            <p className="text-xs text-slate-500">{home.adminLabel}</p>
                        </div>
                        <LanguageSwitcher />
                        <Button variant="outline" size="sm" onClick={handleLogout} aria-label={home.logout}>
                            <LogOut aria-hidden="true" />
                            <span className="hidden sm:inline">{home.logout}</span>
                        </Button>
                    </div>
                </div>
            </header>

            <main className="mx-auto max-w-6xl px-5 py-12 sm:px-8 sm:py-16">
                <section className="max-w-3xl">
                    <p className="mb-4 text-sm font-bold uppercase tracking-[0.22em] text-cyan-700">{home.eyebrow}</p>
                    <h1 className="text-3xl font-bold leading-tight tracking-tight text-slate-950 sm:text-5xl">
                        {home.title}
                    </h1>
                    <p className="mt-5 max-w-2xl text-base leading-8 text-slate-600 sm:text-lg">
                        {home.description}
                    </p>
                </section>

                <section className="mt-12 grid grid-cols-1 gap-5 sm:grid-cols-2" aria-label={home.actionsLabel}>
                    {home.actions?.map((label: string, index: number) => {
                        const Icon = featureIcons[index];
                        return (
                            <Button
                                key={label}
                                type="button"
                                variant="outline"
                                onClick={() => index === 1 && navigate("/top/skill-list")}
                                className={`group min-h-40 justify-between rounded-2xl border-2 p-6 text-left shadow-sm transition-all hover:-translate-y-1 hover:shadow-xl ${featureColors[index]}`}
                            >
                                <span className="flex flex-col items-start gap-4">
                                    <span className="flex size-12 items-center justify-center rounded-xl bg-white/80 shadow-sm">
                                        <Icon className="size-6" aria-hidden="true" />
                                    </span>
                                    <span className="text-xl font-bold">{label}</span>
                                </span>
                                <span className="text-3xl font-light opacity-40 transition-transform group-hover:translate-x-1" aria-hidden="true">→</span>
                            </Button>
                        );
                    })}
                </section>
            </main>
        </div>
    )
}