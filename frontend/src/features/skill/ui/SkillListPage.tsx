import LanguageSwitcher from "@/components/common/Language-switcher";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useI18nStore } from "@/i18n/useI18nStore";
import { fetchSkillCategories, fetchSkills, type Skill, type SkillCategory, type SkillSearchCondition } from "@/features/skill/services/skill.service";
import { useAuthStore } from "@/shared/state/authStore";
import { ArrowLeft, ArrowUpDown, ChevronLeft, ChevronRight, LogOut, Plus, RotateCcw, Search, ShieldCheck } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";

const initialCondition: SkillSearchCondition = { skillName: '', skillId: '', skillCatId: '' };
const pageSizes = ['10', '20', '50', 'all'] as const;

export default function SkillListPage() {
    const navigate = useNavigate();
    const logout = useAuthStore((state) => state.logout);
    const user = useAuthStore((state) => state.user);
    const skillText = useI18nStore((state) => state.message.skillList ?? {});
    const [condition, setCondition] = useState(initialCondition);
    const [categories, setCategories] = useState<SkillCategory[]>([]);
    const [skills, setSkills] = useState<Skill[]>([]);
    const [pageSize, setPageSize] = useState<(typeof pageSizes)[number]>('10');
    const [page, setPage] = useState(1);
    const [sortKey, setSortKey] = useState<keyof Skill>('skillId');
    const [sortAsc, setSortAsc] = useState(true);
    const [message, setMessage] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    console.log("SkillListPage loaded");

    useEffect(() => {
        fetchSkillCategories().then(setCategories).catch(() => setMessage(skillText.categoryLoadError));
    }, [skillText.categoryLoadError]);

    const sortedSkills = useMemo(() => [...skills].sort((left, right) => {
        const result = left[sortKey].localeCompare(right[sortKey], 'zh-CN');
        return sortAsc ? result : -result;
    }), [skills, sortAsc, sortKey]);

    const totalPages = pageSize === 'all' ? 1 : Math.max(1, Math.ceil(sortedSkills.length / Number(pageSize)));
    const visibleSkills = pageSize === 'all'
        ? sortedSkills
        : sortedSkills.slice((page - 1) * Number(pageSize), page * Number(pageSize));

    const updateCondition = (key: keyof SkillSearchCondition, value: string) => {
        setCondition((current) => ({ ...current, [key]: value }));
        setMessage('');
    };

    const handleSearch = async () => {
        if (!condition.skillName && !condition.skillId && !condition.skillCatId) {
            setMessage(skillText.requiredCondition);
            setSkills([]);
            return;
        }
        setIsLoading(true);
        setMessage('');
        try {
            setSkills(await fetchSkills(condition));
            setPage(1);
        } catch (error) {
            setMessage(error instanceof Error ? error.message : skillText.loadError);
            setSkills([]);
        } finally {
            setIsLoading(false);
        }
    };

    const handleReset = () => {
        setCondition(initialCondition);
        setSkills([]);
        setPage(1);
        setMessage('');
    };

    const handleSort = (key: keyof Skill) => {
        if (sortKey === key) setSortAsc((current) => !current);
        else { setSortKey(key); setSortAsc(true); }
    };

    const handleLogout = () => { logout(); navigate('/login/show'); };

    return (
        <div className="min-h-screen bg-[radial-gradient(circle_at_top_right,_#dbeafe_0,_transparent_32%),linear-gradient(135deg,#f8fafc_0%,#eef6f7_100%)] text-slate-900">
            <header className="border-b border-slate-200/80 bg-white/90 backdrop-blur-md">
                <div className="mx-auto flex min-h-20 max-w-7xl items-center justify-between gap-4 px-5 py-4 sm:px-8">
                    <div className="flex items-center gap-3"><div className="flex size-11 items-center justify-center rounded-xl bg-slate-950 text-cyan-300 shadow-lg shadow-slate-950/15"><ShieldCheck className="size-6" aria-hidden="true" /></div><div><p className="text-lg font-bold tracking-tight text-slate-950">SkillNav</p><p className="text-xs font-medium uppercase tracking-[0.18em] text-slate-500">{skillText.systemLabel}</p></div></div>
                    <div className="flex items-center gap-3"><div className="hidden text-right sm:block"><p className="text-sm font-semibold text-slate-900">{user?.name}</p><p className="text-xs text-slate-500">{skillText.adminLabel}</p></div><LanguageSwitcher /><Button variant="outline" size="sm" onClick={handleLogout} aria-label={skillText.logout}><LogOut aria-hidden="true" /><span className="hidden sm:inline">{skillText.logout}</span></Button></div>
                </div>
            </header>

            <main className="mx-auto max-w-7xl px-5 py-8 sm:px-8 sm:py-10">
                <div className="mb-7 flex flex-wrap items-end justify-between gap-4"><div><p className="mb-2 text-sm font-bold uppercase tracking-[0.2em] text-cyan-700">{skillText.eyebrow}</p><h1 className="text-3xl font-bold tracking-tight text-slate-950">{skillText.title}</h1><p className="mt-2 text-sm text-slate-600">{skillText.description}</p></div><div className="flex gap-2"><Button className="bg-emerald-600 text-white hover:bg-emerald-700" onClick={() => setMessage(skillText.newSkillMessage)}><Plus aria-hidden="true" />{skillText.newButton}</Button><Button variant="outline" onClick={() => navigate('/top')}><ArrowLeft aria-hidden="true" />{skillText.backButton}</Button></div></div>
                <section className="rounded-2xl border border-slate-200 bg-white/90 p-5 shadow-sm sm:p-6" aria-labelledby="skill-search-title"><div className="mb-5 flex items-center gap-3"><div className="flex size-9 items-center justify-center rounded-lg bg-cyan-100 text-cyan-800"><Search className="size-4" aria-hidden="true" /></div><h2 id="skill-search-title" className="text-base font-bold">{skillText.searchTitle}</h2></div><div className="grid gap-4 md:grid-cols-2 xl:grid-cols-[1.2fr_1fr_1.1fr_auto_auto] xl:items-end"><label className="grid gap-1.5 text-sm font-medium"><span>{skillText.skillName}</span><Input value={condition.skillName} maxLength={20} onChange={(event) => updateCondition('skillName', event.target.value)} placeholder={skillText.skillNamePlaceholder} /></label><label className="grid gap-1.5 text-sm font-medium"><span>{skillText.skillId}</span><Input value={condition.skillId} maxLength={10} pattern="[A-Z]*" onChange={(event) => updateCondition('skillId', event.target.value.toUpperCase().replace(/[^A-Z]/g, ''))} placeholder={skillText.skillIdPlaceholder} /></label><label className="grid gap-1.5 text-sm font-medium"><span>{skillText.category}</span><Select value={condition.skillCatId} onValueChange={(value) => updateCondition('skillCatId', value ?? '')}><SelectTrigger className="h-9 w-full"><SelectValue placeholder={skillText.categoryPlaceholder} /></SelectTrigger><SelectContent><SelectItem value="all">{skillText.allCategories}</SelectItem>{categories.map((category) => <SelectItem key={category.skillCatId} value={category.skillCatId}>{category.skillCatName}</SelectItem>)}</SelectContent></Select></label><Button type="button" className="h-9 bg-sky-600 text-white hover:bg-sky-700" onClick={handleSearch} disabled={isLoading}><Search aria-hidden="true" />{isLoading ? skillText.searching : skillText.searchButton}</Button><Button type="button" className="h-9 bg-amber-500 text-white hover:bg-amber-600" onClick={handleReset}><RotateCcw aria-hidden="true" />{skillText.resetButton}</Button></div>{message && <p role="alert" className="mt-4 border-l-4 border-amber-500 bg-amber-50 px-3 py-2 text-sm font-medium text-amber-900">{message}</p>}</section>
                <section className="mt-7 rounded-2xl border border-slate-200 bg-white/90 shadow-sm" aria-labelledby="skill-result-title"><div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-200 px-5 py-4 sm:px-6"><h2 id="skill-result-title" className="font-bold">{skillText.resultTitle} <span className="ml-2 rounded-full bg-cyan-100 px-2.5 py-1 text-sm text-cyan-900">{skills.length}{skillText.resultCountSuffix}</span></h2><span className="text-xs text-slate-500">{skillText.resultHint}</span></div><Table><TableHeader><TableRow className="bg-slate-50/80"><TableHead className="w-[90px] text-center">{skillText.actionColumn}</TableHead><TableHead className="w-[110px] text-center"><button type="button" className="inline-flex items-center gap-1 font-medium" onClick={() => handleSort('skillId')}>{skillText.skillId}<ArrowUpDown className="size-3.5" /></button></TableHead><TableHead className="w-[260px]"><button type="button" className="inline-flex items-center gap-1 font-medium" onClick={() => handleSort('skillName')}>{skillText.skillName}<ArrowUpDown className="size-3.5" /></button></TableHead><TableHead className="w-[180px]"><button type="button" className="inline-flex items-center gap-1 font-medium" onClick={() => handleSort('skillCatName')}>{skillText.categoryName}<ArrowUpDown className="size-3.5" /></button></TableHead></TableRow></TableHeader><TableBody>{visibleSkills.length > 0 ? visibleSkills.map((skill) => <TableRow key={skill.skillId}><TableCell className="text-center"><Button variant="ghost" size="icon" aria-label={`${skill.skillName}${skillText.openAction}`} onClick={() => setMessage(`${skillText.openAction}: ${skill.skillName}`)}>...</Button></TableCell><TableCell className="text-center font-mono text-xs font-semibold">{skill.skillId}</TableCell><TableCell>{skill.skillName}</TableCell><TableCell>{skill.skillCatName}</TableCell></TableRow>) : <TableRow><TableCell colSpan={4} className="h-28 text-center text-sm text-slate-500">{skillText.empty}</TableCell></TableRow>}</TableBody></Table><div className="flex flex-wrap items-center justify-between gap-4 border-t border-slate-200 px-5 py-4 sm:px-6"><label className="flex items-center gap-2 text-sm text-slate-600">{skillText.pageSize}<Select value={pageSize} onValueChange={(value) => { if (value && pageSizes.includes(value as (typeof pageSizes)[number])) { setPageSize(value as (typeof pageSizes)[number]); setPage(1); } }}><SelectTrigger className="h-8 w-20"><SelectValue /></SelectTrigger><SelectContent>{pageSizes.map((size) => <SelectItem key={size} value={size}>{size === 'all' ? skillText.all : size}</SelectItem>)}</SelectContent></Select></label><div className="flex items-center gap-2"><span className="text-sm text-slate-600">{page} / {totalPages}</span><Button variant="outline" size="icon" aria-label={skillText.previousPage} disabled={page <= 1} onClick={() => setPage((current) => current - 1)}><ChevronLeft /></Button><Button variant="outline" size="icon" aria-label={skillText.nextPage} disabled={page >= totalPages} onClick={() => setPage((current) => current + 1)}><ChevronRight /></Button></div></div></section>
            </main>
        </div>
    );
}