# dota2 月之底插件
## 简介
提供一些可能有用的便利功能。水平有限，只实现功能，不讲究效率。
## 功能
- DOTA2 API 查询功能
- 监听本地化文件变化并自动合并，在项目game目录下新建localization\schinese文件夹，插件会将里面的文件自动合并至addon_schinese.txt。english同理。可在设置中关闭监听功能。  

	![Localization](https://gitee.com/bigciba/dota2-tools/raw/master/images/README/localization.gif)

- 在技能kv按住<kbd>ctrl</kbd>点击`ScriptFile`跳转到lua脚本  

	![kv2lua](https://gitee.com/bigciba/dota2-tools/raw/master/images/README/kv2lua.gif)

- 在技能lua右键点击转到技能kv可跳转至kv，多个技能在同一个lua脚本中可在技能名上右键跳转至指定技能kv  

	![kv2lua](https://gitee.com/bigciba/dota2-tools/raw/master/images/README/lua2kv.gif)
- 点击右上角音符按钮，输入vsnd路径获取事件名  

	![kv2lua](https://gitee.com/bigciba/dota2-tools/raw/master/images/README/vsnd.gif)
- 点击右上角图片按钮，点击技能图标，自动复制路径至剪切板（只提供Dota2自带图标）  

	![kv2lua](https://gitee.com/bigciba/dota2-tools/raw/master/images/README/texture.gif)
- excel与kv互转，需要在插件设置中配置路径，分别为技能转kv与单位转kv，功能略有不同。该功能会生成一个csv文件作为中间件，使多人合作时能合并。需要在excel中使用vba导入csv数据配合。参考[链接](https://github.com/BigCiba/GuardingAthena/tree/master/design/4_kv%E9%85%8D%E7%BD%AE%E8%A1%A8)。该功能尚不完善，也无法自动创建文件，kv导出到csv需要<kbd>ctrl</kbd>+<kbd>shift</kbd>+<kbd>p</kbd>输入kv转csv指令来使用。  

	![kv2lua](https://gitee.com/bigciba/dota2-tools/raw/master/images/README/setting.png)
	- 技能excel第一行为备注行，第二行为技能里的key值，key值为空不导出，第一列为技能名，AbilitySpecial值为特殊处理。不支持多层结构。  

	![kv2lua](https://gitee.com/bigciba/dota2-tools/raw/master/images/README/ability_excel.png)
	- 单位excel第一行为备注行，第二行为单位里的key值，key值为空不导出，第一列为单位名，AttachWearables值为特殊处理。支持多层结构，在key后面跟上`[{]`表示一个块的开始，使用`[}]`表示结束。  

	![kv2lua](https://gitee.com/bigciba/dota2-tools/raw/master/images/README/unit_excel.png)