import {
    Select,
    SelectTrigger,
    SelectContent,
    SelectItem,
    SelectValue,
} from "@/components/ui/select";
import { useI18nStore } from '@/i18n/useI18nStore';

function LanguageSwitcher() {

    const locale = useI18nStore(state => state.locale)
    const setLocale = useI18nStore(state => state.setLocale)

    const handleLangChange = (value: string | null) => {
        if (value) {
            setLocale(value)
        }
    };


    return (
        <Select value={locale} onValueChange={handleLangChange}>
            <SelectTrigger className="w-[100px] h-8 bg-white/70 backdrop-blur-sm border-gray-300 text-gray-700">
                <SelectValue placeholder="Language" />
            </SelectTrigger>
            <SelectContent>
                <SelectItem value="ja">日本語</SelectItem>
                <SelectItem value="zh">中文</SelectItem>
                <SelectItem value="en">English</SelectItem>
            </SelectContent>
        </Select>
    )
}

export default LanguageSwitcher