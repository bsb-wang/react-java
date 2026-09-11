import type { LoginRequest } from "@/features/login/services/login.service";
import { http, HttpResponse } from "msw";

export const handlers = [
    http.post("/api/login", async ({ request }) => {

        const body = (await request.json()) as LoginRequest;
        const { username, password } = body;

        if (username !== "111") {
            return HttpResponse.json(
                { error: "USERNAME_ERROR", message: "用户名不存在" },
                { status: 400 }
            );
        }

        if (password !== "222") {
            return HttpResponse.json(
                { error: "PASSWORD_ERROR", message: "密码错误" },
                { status: 400 }
            );
        }

        return HttpResponse.json({
            user: { id: 1, name: "youmin" },
        });
    }),
    http.get("/api/skill-cat-list", () => HttpResponse.json([
        { skillCatId: "TECH", skillCatName: "技术" },
        { skillCatId: "BIZ", skillCatName: "业务" },
        { skillCatId: "MGMT", skillCatName: "管理" },
    ])),
    http.get("/api/skill-list", ({ request }) => {
        const url = new URL(request.url);
        const skillName = url.searchParams.get("skillName")?.toLowerCase() ?? "";
        const skillId = url.searchParams.get("skillId")?.toUpperCase() ?? "";
        const skillCatId = url.searchParams.get("skillCatId") ?? "";
        const skills = [
            { skillId: "JAVASCRIPT", skillName: "JavaScript开发", skillCatName: "技术", skillCatId: "TECH" },
            { skillId: "SPRING", skillName: "Spring Boot应用开发", skillCatName: "技术", skillCatId: "TECH" },
            { skillId: "DESIGN", skillName: "业务流程设计", skillCatName: "业务", skillCatId: "BIZ" },
            { skillId: "LEADER", skillName: "团队领导力", skillCatName: "管理", skillCatId: "MGMT" },
        ].filter((skill) => (!skillName || skill.skillName.toLowerCase().includes(skillName)) && (!skillId || skill.skillId.includes(skillId)) && (!skillCatId || skillCatId === "all" || skill.skillCatId === skillCatId));
        return HttpResponse.json(skills.map((skill) => ({
            skillId: skill.skillId,
            skillName: skill.skillName,
            skillCatName: skill.skillCatName,
        })));
    }),
];
