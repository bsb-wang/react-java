import { http } from "@/shared/services/http";

export type SkillCategory = {
    skillCatId: string;
    skillCatName: string;
};

export type Skill = {
    skillId: string;
    skillName: string;
    skillCatName: string;
};

export type SkillSearchCondition = {
    skillName: string;
    skillId: string;
    skillCatId: string;
};

type SkillListResponse = Skill[] | { items?: Skill[]; content?: Skill[]; total?: number };

export async function fetchSkillCategories(): Promise<SkillCategory[]> {
    const response = await http<SkillCategory[]>('/api/skill-cat-list');
    if (!response.success || !response.data) {
        throw new Error(response.errors || '技能类别取得失败');
    }
    return response.data;
}

export async function fetchSkills(condition: SkillSearchCondition): Promise<Skill[]> {
    const params = new URLSearchParams();
    if (condition.skillName) params.set('skillName', condition.skillName);
    if (condition.skillId) params.set('skillId', condition.skillId);
    if (condition.skillCatId) params.set('skillCatId', condition.skillCatId);

    const response = await http<SkillListResponse>(`/api/skill-list?${params.toString()}`);
    if (!response.success || !response.data) {
        throw new Error(response.errors || '技能列表取得失败');
    }

    if (Array.isArray(response.data)) return response.data;
    return response.data.items ?? response.data.content ?? [];
}