生成技能列表画面(skill-list),布局如下
共通header：左边为系统图标和系统名称SkillNav，右侧为用户信息，语言切换，退出按钮
标题行：左侧为描述skill-list概要（技能列表） 右侧为新规按钮和后退按钮，后退按钮按下时退回home页面
检索区域：
|项目名|物理名|类型|要求|
|-----|------|----|----|
|技能名|skillName|input（text）|最大20文字|
|技能ID|skillId|input（text）|最大10个大写英文字母|
|类别|cmbSkillCat|combobox|使用`/api/skill-cat-list`从服务器取得|
|检索|btnSearch|button|使用`/api/skill-list`从服务器取得|
|重置|btnReset|button|恢复页面的初期状态|
检索条件一个也没输入的时候，显示message：请输入检索条件
检索结果区域：
- 检索结果：显示取得的件数
- 检索结果<Table>：
|列名|物理名|类型|对齐|宽度|排序|编辑|
|----|-----|----|---|----|---|----|
|操作|没有|icon|中间对齐|90px|不可|没有|
|技能ID|skillId|文本|中间对齐|110px|可|没有|
|技能名|skillName|文本|左对齐|260px|可|没有|
|类型名|skillCatName|文本|左对齐|180px|可|没有|
- 操作行：左侧选择一页表示的件数（10|20|50|all）, 右侧为前后也移动按钮