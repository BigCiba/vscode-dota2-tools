# KV 编辑器公式使用指南

> 注意：本文后续章节记录的是 legacy 编辑器的 JavaScript 公式能力。
NaN
NaN

## 基本语法

公式必须以 `=` 开头，例如：
```
=1+2
=A1*2
=rowNumber * 100
```

## 单元格引用

使用 Excel 风格的单元格引用：
- 列字母（A-Z，支持多字母如 AA、AB）+ 行号（从1开始）
- 示例：`=A1 + B2`、`=C10 * 2`

## 可用变量

在公式中可以直接使用以下变量：

| 变量 | 说明 | 示例 |
|------|------|------|
| `rowIndex` | 当前行索引（从0开始） | `=rowIndex * 10` |
| `rowNumber` | 当前行号（从1开始） | `=rowNumber * 100` |
| `rowId` | 当前行的 ID | `=rowId.toLowerCase()` |
| `row` | 当前行的完整数据对象 | `=row.id` |
| `values` | 当前行的所有列值对象 | `=values.HP * 1.5` |

## 辅助函数

- **`toNumber(value, fallback)`** - 转换为数字，失败返回 fallback（默认0）
  ```javascript
  =toNumber(A1, 100)
  ```

- **`toString(value)`** - 转换为字符串
  ```javascript
  =toString(rowNumber)
  ```

## 内置对象

### Math 对象
所有 JavaScript Math 函数都可用：
```javascript
=Math.max(A1, B1, C1)
=Math.min(values.MinDamage, values.MaxDamage)
=Math.round(A1 * 1.5)
=Math.floor(rowNumber / 3)
=Math.ceil(values.Price / 100)
=Math.pow(2, rowNumber)
=Math.sqrt(values.Area)
```

### Number 和 String 构造函数
```javascript
=Number(A1)
=String(rowNumber).padStart(3, "0")
```

## 字符串处理

### 大小写转换
```javascript
=values.Name.toLowerCase()
=values.Name.toUpperCase()
=`ability_${values.BaseSkill.toLowerCase()}`
```

### 字符串拼接
```javascript
// 使用模板字符串（推荐）
=`npc_dota_hero_${rowId.toLowerCase()}`

// 传统拼接
="item_" + values.ItemName.toLowerCase()
```

### 字符串替换
```javascript
// 替换空格为下划线
=values.DisplayName.replace(/ /g, "_")

// 移除前缀
=values.FullName.replace("item_", "")

// 多重操作
=values.Name.replace(/ /g, "_").toLowerCase()
```

### 字符串截取
```javascript
// 前5个字符
=values.LongName.substring(0, 5)

// 后缀
=values.FileName.slice(-4)

// 从位置5开始
=values.Path.substring(5)
```

### 字符串判断
```javascript
// 包含检查
=values.AbilityName.includes("passive") ? "被动" : "主动"

// 开头检查
=values.ID.startsWith("npc_") ? values.ID : `npc_${values.ID}`

// 结尾检查
=values.FileName.endsWith(".lua") ? values.FileName : `${values.FileName}.lua`
```

### 去除空白
```javascript
=values.RawInput.trim()
=values.Text.trimStart()
=values.Text.trimEnd()
```

### 分割与连接
```javascript
// 分割获取第一部分
=values.CommaSeparated.split(",")[0]

// 获取最后部分
=values.Path.split("/").pop()

// 替换分隔符
=values.Words.split(" ").join("_")
```

### 字符串填充
```javascript
// 左侧填充0（生成编号）
=String(rowNumber).padStart(3, "0")  // "001", "002", ...

// 右侧填充空格
=values.ShortName.padEnd(10, " ")
```

## 条件表达式

使用三元运算符：
```javascript
=rowNumber % 2 === 0 ? "偶数行" : "奇数行"
=values.Type === "ACTIVE" ? "主动技能" : "被动技能"
=values.Price > 1000 ? "昂贵" : "便宜"
```

## 复杂示例

### 生成标准化 ID
```javascript
// 生成带编号的技能ID
=`ability_${values.HeroName.toLowerCase()}_special_${String(rowNumber).padStart(2, "0")}`
// 结果: ability_invoker_special_01

// 从路径提取文件名（不含扩展名）
=values.ScriptPath.split("/").pop().replace(".lua", "")
// "scripts/vscripts/heroes/hero_pudge.lua" → "hero_pudge"
```

### 清理并标准化名称
```javascript
=values.RawName
  .trim()
  .toLowerCase()
  .replace(/[^a-z0-9]/g, "_")
  .replace(/_+/g, "_")
// "  My Cool Ability!  " → "my_cool_ability"
```

### 数值计算与格式化
```javascript
// 组合多个单元格
=Math.round(A1 * 1.2 + B1 * 0.8)

// 百分比计算
=values.HP * 0.15

// 等级系统
=`level_${Math.floor(rowNumber / 3) + 1}_variant_${(rowNumber % 3) + 1}`
// 结果: level_1_variant_1, level_1_variant_2, ...
```

### 条件格式化
```javascript
=values.Type === "ACTIVE" 
  ? `DOTA_ABILITY_BEHAVIOR_${values.TargetType.toUpperCase()}` 
  : "DOTA_ABILITY_BEHAVIOR_PASSIVE"
```

## 快速填充公式

在拖拽填充对话框的"公式填充"模式中，额外支持：

| 变量 | 说明 |
|------|------|
| `base` | 起始单元格的原始值 |
| `baseNumber` | base 转为数字 |
| `offset` | 当前行相对起始行的距离 |
| `direction` | 填充方向（1=向下，-1=向上）|

### 快速填充示例
```javascript
// 等差序列
=baseNumber + offset

// 等差序列（步长2）
=baseNumber + offset * 2

// 等比序列
=baseNumber * Math.pow(2, offset)

// 方向控制
=direction === 1 ? baseNumber + offset : baseNumber - offset

// 交替填充
=offset % 2 === 0 ? "A" : "B"
```

## 填充模式

拖拽填充柄时提供以下模式：

1. **复制** - 直接复制公式（如有）或值
2. **序列** - 自动调整单元格引用（A1 → A2 → A3）
3. **等差填充** - 按固定步长填充数字
4. **等比填充** - 按固定比率填充数字
5. **公式填充** - 使用自定义公式表达式

## 错误提示

- `#ERROR!` - 公式执行错误
- `#CYCLE!` - 循环引用
- `#REF!` - 单元格引用错误

## 提示与技巧

1. **使用模板字符串**：`` `text_${variable}` `` 比字符串拼接更易读
2. **链式调用**：字符串方法可以连续调用，如 `.trim().toLowerCase().replace()`
3. **访问其他列**：使用 `values.ColumnName` 访问同一行其他列的值
4. **数学计算**：充分利用 Math 对象的函数处理复杂计算
5. **条件逻辑**：使用三元运算符 `condition ? true_value : false_value`

## 常见用例

### 生成序列 ID
```javascript
=`item_${String(rowNumber).padStart(4, "0")}`
// item_0001, item_0002, ...
```

### 根据其他列计算
```javascript
=values.BaseHealth + values.StrengthGain * 22
```

### 路径处理
```javascript
=`scripts/vscripts/${values.Category}/${values.FileName}.lua`
```

### 本地化键生成
```javascript
=`DOTA_Tooltip_ability_${values.AbilityName.toLowerCase()}`
```
