# 下拉选项和列描述的文件级别配置

## 功能说明

现在下拉选项编辑器和列描述编辑器都支持"仅在当前文件生效"的选项，并且默认勾选。

## 使用方法

### 1. 编辑下拉选项

1. 右键点击列头 → 选择"编辑下拉选项"
2. 在弹出的对话框中编辑选项
3. 注意左下角的复选框**"仅在当前文件生效"**（默认已勾选）
   - **勾选**：配置只对当前 KV 文件生效
   - **取消勾选**：配置对所有相同类型的 KV 文件生效（ability/item/unit/custom）
4. 点击"保存"

### 2. 编辑列描述

1. 右键点击列头 → 选择"为此列添加描述"
2. 输入显示标签和 Tooltip 描述
3. 注意底部的复选框**"仅在当前文件生效"**（默认已勾选）
   - **勾选**：描述只对当前 KV 文件生效
   - **取消勾选**：描述作为工作区默认配置
4. 点击"保存"

## 配置优先级

配置按以下优先级应用（从低到高）：

1. **内置配置**：扩展自带的默认配置（`resource/kv_editor_field_options.json`）
2. **全局 FolderType 配置**：工作区级别的配置，按文件类型区分（ability/item/unit/custom）
3. **文件级别配置**：特定 KV 文件的配置（**优先级最高**）

## 配置文件位置

所有配置保存在工作区的 `.vscode/kv_editor_setting.json` 文件中。

### 文件结构示例

```json
{
  "columns": {
    "BaseClass": {
      "ability": [
        { "value": "ability_datadriven" },
        { "value": "ability_lua" }
      ]
    }
  },
  "files": {
    "npc_abilities_custom.txt": {
      "columnOptions": {
        "BaseClass": [
          { "value": "ability_datadriven", "label": "数据驱动" },
          { "value": "ability_lua", "label": "Lua脚本" },
          { "value": "ability_typescript", "label": "TS脚本" }
        ]
      }
    }
  }
}
```

## 工作原理

### 下拉选项

1. **全局配置** (`columns` 字段)：
   - 按列名分组
   - 每列下按 folderType（ability/item/unit/custom）分组
   - 适用于所有相同类型的 KV 文件

2. **文件级别配置** (`files` 字段)：
   - 按文件路径分组
   - 每个文件下的 `columnOptions` 按列名存储选项
   - 只对特定文件生效

### 列描述

列描述的配置保存在 `.vscode/kv_editor_setting.json` 中：

1. **工作区默认** (`columnDescriptions` 字段)：
   - 作为所有文件的默认描述

2. **文件级别** (`files[文件路径].columnDescriptions` 字段)：
   - 覆盖工作区默认配置
   - 优先级最高

## 实际应用场景

### 场景 1：通用选项 + 特定文件扩展

假设你有多个技能文件，大部分使用相同的 BaseClass 选项，但某个特殊文件需要额外的选项：

1. 在任意技能文件中设置通用选项（取消勾选"仅在当前文件生效"）
2. 在特殊文件中设置额外选项（勾选"仅在当前文件生效"）

结果：
- 通用文件：显示通用选项
- 特殊文件：显示特殊选项（文件级别配置覆盖全局配置）

### 场景 2：不同文件不同风格

如果每个文件都有完全不同的需求：

- 始终勾选"仅在当前文件生效"
- 每个文件维护自己的配置
- 互不干扰

## 技术实现

### 前端修改（KvEditor.js）

1. **下拉选项编辑器**：
   - 添加 `scopeCheckbox` 复选框（默认 `checked = true`）
   - 提交时读取 `scopeCheckbox.checked`，设置 `scope: 'file' | 'global'`

2. **列描述编辑器**：
   - 将默认值从 `checked = false` 改为 `checked = true`

### 后端修改（kvEditorProvider.ts）

1. **接口扩展**：
   - `KvEditorSaveColumnOptionsMessage` 添加 `scope` 字段
   - `KvEditorColumnOptionsFile` 添加 `files` 字段
   - 新增 `KvEditorFileColumnOptions` 接口

2. **处理逻辑**：
   - `handleSaveColumnOptions`：根据 `scope` 决定保存位置
     - `scope === 'file'`：保存到 `files[documentKey].columnOptions`
     - `scope === 'global'`：保存到 `columns[columnKey][folderType]`

3. **解析优先级**：
   - `getResolvedColumnOptions`：
     1. 先应用内置配置
     2. 再应用全局 folderType 配置
     3. 最后应用文件级别配置（覆盖前面的）

4. **序列化/反序列化**：
   - `normalizeColumnOptionOverrides`：解析 `files` 字段
   - `copyColumnOptionOverrides`：深拷贝 `files` 字段
   - `serializeColumnOptionOverrides`：序列化 `files` 字段

## 注意事项

1. **文件路径标识**：使用 `getDocumentSettingsKey()` 生成的相对路径作为文件标识
2. **配置清理**：删除空对象以保持配置文件简洁
3. **向后兼容**：旧版本配置文件自动支持，不需要迁移
4. **默认行为变化**：现在默认为文件级别配置，更符合用户直觉
