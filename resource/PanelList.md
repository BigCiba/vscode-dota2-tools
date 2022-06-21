# Panel

# Label
## 属性
属性名|类型|描述
--|--|--
text|string|
htmlboolean|
allowtextselection|boolean|是否允许选取

# Image
## 属性
属性名|类型|描述
--|--|--
src|String|图片路径
scaling|String|定义图片的伸缩方式
## JS API
Function|Signature|Description
--|--|--
SetImage|SetImage(src: string): void|
SetScaling|SetScaling(scaling: string): void|
## 备注
scaling|Description
--|--
none|无，直接显示原始大小
stretch|默认
stretchx|只伸缩宽度
stretchy|只伸缩高度
stretch-to-fit-preserve-aspect|裁剪
stretch-to-fit-x-preserve-aspect|只裁剪宽度
stretch-to-fit-y-preserve-aspect|只裁剪高度
stretch-to-cover-preserve-aspect|裁剪至合适宽高

# DOTAAbilityImage
## 属性
属性名|类型|描述
--|--|--
abilityname|string|number
abilityid|number|
contextEntityIndex|number|技能实体index
showtooltip|boolean|默认为false

# DOTAItemImage
## 属性
属性名|类型|描述
--|--|--
itemname|string|
contextEntityIndex|number|物品实体index
showtooltip|boolean|默认为true

# DOTAHeroImage
## 属性
属性名|类型|描述
--|--|--
heroname|string|
heroid|number|HeroID
heroimagestyle|string|"icon" "portrait" "landscape"
usedefaultimage|boolean|

# DOTACountryFlagImage
## 属性
属性名|类型|描述
--|--|--
country_code|string|

# DOTALeagueImage
## 属性
属性名|类型|描述
--|--|--
leagueid|number|
leagueimagestyle|"Banner"(默认值) "Square" "LargeIcon"

# EconItemImage
## 属性
属性名|类型|描述
--|--|--
itemdef|number|

# AnimatedImageStrip
## 属性
属性名|类型|描述
--|--|--
frametime|string|
defaultframe|number|
animating|boolean|

# DOTAEmoticon
## 属性
属性名|类型|描述
--|--|--
emoticonid|number|
alias|string|

# Movie
## 属性
属性名|类型|描述
--|--|--
src|string|
repeat|boolean|
controls|string|"none" "minimal" "full"
title|string|
autoplay|string|"off" "onload"(默认值) "onfocus"
## JS API
Function|Signature|Description
--|--|--
SetMovie|SetMovie(source: string): void|
SetControls|SetControls(controls: 'none' \| 'minimal' \| 'full'): void|
SetTitle|SetTitle(title: string): void|
Play|Play(): void|
Pause|Pause(): void|
Stop|Stop(): void|
SetRepeat|SetRepeat(repeat: boolean): void|
SetPlaybackVolume|SetPlaybackVolume(volume: number): void|0-1
BAdjustingVolume|BAdjustingVolume(): boolean|

# DOTAHeroMovie
## 属性
属性名|类型|描述
--|--|--
heroid|number|
heroname|string|
persona|any|
autoplay|string|"off"(默认值) "onload" "onfocus"

# DOTAScenePanel
## 属性
属性名|类型|描述
--|--|--
unit|string|
activity-modifier|string|
map|string|
camera|string|
light|string|
pitchmin|number|
pitchmax|number|
yawmin|number|
yawmax|number|
allowrotation|boolean|
rotateonhover|boolean|
rotateonmousemove|boolean|
antialias|boolean|
panoramasurfaceheight|number|
panoramasurfacewidth|number|
panoramasurfacexml|string|
particleonly|boolean|
renderdeferred|boolean|
rendershadows|boolean|
## JS API
Function|Signature|Description
--|--|--
FireEntityInput|FireEntityInput(entityID: string, inputName: string, value: string): void|
PlayEntitySoundEvent|PlayEntitySoundEvent(arg1: any, arg2: any): number|
SetUnit|SetUnit(unitName: string, environment: string, drawBackground: boolean): void|
GetPanoramaSurfacePanel|GetPanoramaSurfacePanel(): Panel | null|
SetRotateParams|SetRotateParams(yawMin: number, yawMax: number, pitchMin: number, pitchMax: number): void|
SpawnHeroInScenePanelByPlayerSlot|SpawnHeroInScenePanelByPlayerSlot(unknown1: string, unknown2: number, unknown3: string): boolean|
SpawnHeroInScenePanelByHeroId|SpawnHeroInScenePanelByHeroId(unknown1: number, unknown2: string, unknown3: number): boolean|
SetScenePanelToPlayerHero|SetScenePanelToPlayerHero(unknown1: string, unknown2: number): boolean|
SetScenePanelToLocalHero|SetScenePanelToLocalHero(heroId: number): boolean|

# DOTAEconItem
## 属性
属性名|类型|描述
--|--|--
itemdef|number|
itemstyle|number|
## JS API
Function|Signature|Description
--|--|--
SetItemByDefinition|SetItemByDefinition(itemDef: number): void|
SetItemByDefinitionAndStyle|SetItemByDefinitionAndStyle(itemDef: number, style: number): void|

# ProgressBar
## 属性
属性名|类型|描述
--|--|--
value|number|
min|number|
max|number|

# CircularProgressBar
## 属性
属性名|类型|描述
--|--|--
value|number
min|number|
max|number|

# ProgressBarWithMiddle
## 属性
属性名|类型|描述
--|--|--
lowervalue|number|
uppervalue|number|
min|number|
max|number|

# DOTAUserName
## 属性
属性名|类型|描述
--|--|--
steamid|string|Steam64位ID，特别的local是表示本地玩家
accountid|string|Steam32位ID，就是Dota2的数字ID

# DOTAUserRichPresence
## 属性
属性名|类型|描述
--|--|--
steamid|string|Steam64位ID，特别的local是表示本地玩家
accountid|string|Steam32位ID，就是Dota2的数字ID

# DOTAAvatarImage
## 属性
属性名|类型|描述
--|--|--
steamid|string|Steam64位ID，特别的local是表示本地玩家
accountid|string|Steam32位ID，就是Dota2的数字ID
nocompendiumborder|boolean|是否去除边框，比如TI本子的玩家可能会有金色边框
lazy|boolean|
## JS API
Function|Signature|Description
--|--|--
SetAccountID|SetAccountID(accountid: number): void|

# Countdown
## 属性
属性名|类型|描述
--|--|--
startTime|number|
endTime|number|
updateInterval|number|默认为1
timeDialogVariable|string|默认为'countdown_time'

# Button
## 属性
属性名|类型|描述
--|--|--

# TextButton
## 属性
属性名|类型|描述
--|--|--

# ToggleButton
## 属性
属性名|类型|描述
--|--|--
text|string|
## JS API
Function|Signature|Description
--|--|--
SetSelected|SetSelected(value: boolean): void|

# RadioButton
## 属性
属性名|类型|描述
--|--|--
group|string|
text|string|
html|boolean|
selected|boolean|
onselect|event|
ondeselect|event|
## JS API
Function|Signature|Description
--|--|--
GetSelectedButton|GetSelectedButton(): RadioButton|

# TextEntry
## 属性
属性名|类型|描述
--|--|--
multiline|boolean|
placeholder|string|
maxchars|number|
textmode|string|"normal" "password" "numeric" "numericpassword"
text|string|
ontextentrychange|event|
oninputsubmit|event|
## JS API
Function|Signature|Description
--|--|--
RaiseChangeEvents|RaiseChangeEvents(bool: boolean): void|
SelectAll|SelectAll(): void|
ClearSelection|ClearSelection(): void|
GetMaxCharCount|GetMaxCharCount(): number|
SetMaxChars|SetMaxChars(value: number): void|
GetCursorOffset|GetCursorOffset(): number|1
SetCursorOffset|SetCursorOffset(value: number): void|

# NumberEntry
## 属性
属性名|类型|描述
--|--|--
value|number|
onvaluechanged|event|
min|number|默认0
max|number|默认1000000
increment|number|默认1

# Slider
## 属性
属性名|类型|描述
--|--|--
style|never|
value|number|
onvaluechanged|event|
min|number|默认0
max|number|默认1
direction|string|"vertical"(默认值) "horizontal" to make slider horizontal it also should have a `HorizontalSlider` class.
default|number|
increment|number|
mousedown|boolean|
## JS API
Function|Signature|Description
--|--|--
SetDirection|SetDirection(value: any): void|
SetRequiresSelection|SetRequiresSelection(value: boolean): void|
SetShowDefaultValue|SetShowDefaultValue(value: boolean): void|
SetValueNoEvents|SetValueNoEvents(value: number): void|

# SlottedSlider
## 属性
属性名|类型|描述
--|--|--
notches|number|

# DropDown
## 属性
属性名|类型|描述
--|--|--
selected|string|
oninputsubmit|event|
## JS API
Function|Signature|Description
--|--|--
HasOption|HasOption(id: string): boolean|
AddOption|AddOption(panel: Panel): void|
RemoveOption|RemoveOption(id: string): void|
RemoveAllOptions|RemoveAllOptions(): void|
GetSelected|GetSelected(): Panel|
SetSelected|SetSelected(id: string): void|
AccessDropDownMenu|AccessDropDownMenu(): Panel|
FindDropDownMenuChild|FindDropDownMenuChild(string: string): Panel|

# ContextMenuScript
## JS API
Function|Signature|Description
--|--|--
GetContentsPanel|GetContentsPanel(): Panel|

# Carousel
## 属性
属性名|类型|描述
--|--|--
focus|string|"center" "edge"
focus-offset|string|
wrap|boolean|
selectionposboundary|string|
panels-visible|number|
clipaftertransform|boolean|
AllowOversized|any|
autoscroll-delay|string|
x-offset|string|
## JS API
Function|Signature|Description
--|--|--
GetFocusIndex|GetFocusIndex(): number|
GetFocusChild|GetFocusChild(): Panel|
SetSelectedChild|SetSelectedChild(selected: Panel): void|

# CarouselNav
## 属性
属性名|类型|描述
--|--|--
carouselid|string|

# DOTAHUDOverlayMap
## 属性
属性名|类型|描述
--|--|--
maptexture|string|
mapscale|number|默认4
mapscroll|boolean|默认true
fixedoffsetenabled|boolean|默认false
## JS API
Function|Signature|Description
--|--|--
SetFixedOffset|SetFixedOffset(x: number, y: number): void|
SetFixedBackgroundTexturePosition|SetFixedBackgroundTexturePosition(size: number, x: number, y: number): void|

# DOTAMinimap
## 属性
属性名|类型|描述
--|--|--

# HTML
## 属性
属性名|类型|描述
--|--|--
url|string|
## JS API
Function|Signature|Description
--|--|--
SetURL|SetURL(url: string): void|
SetIgnoreCursor|SetIgnoreCursor(value: boolean): void|
RunJavascript|RunJavascript(js: string): void|

# CustomLayoutPanel
## 属性
属性名|类型|描述
--|--|--
layout|string|

# TabButton
## 属性
属性名|类型|描述
--|--|--
selected|boolean|默认是否被选择，对应JS中的checked属性
group|string|组，相同组的TabButton只能选择其中一个，此属性无法通过JS动态调整

# TabContents
## 属性
属性名|类型|描述
--|--|--
selected|boolean|默认是否被选择，对应JS中的checked属性
group|string|组，相同组的TabButton只能选择其中一个，此属性无法通过JS动态调整
tabid|string|对应TabButton中的id
## 范例
```html
<TabButton id="PlusAssistantFeatureTab" class="FeatureTab">
	<Label class="ThumbnailTitle" text="#DOTA_PlusPurchase_Assistant" />
</TabButton>
<TabButton id="GuildsFeatureTab" class="FeatureTab">
	<Label class="ThumbnailTitle" text="#DOTA_PlusPurchase_Guilds" />
</TabButton>

<TabContents tabid="PlusAssistantFeatureTab" class="FeatureTabContents">
</TabContents >
<TabContents tabid="GuildsFeatureTab" class="FeatureTabContents">
</TabContents >
```
```css
.FeatureTabContents{
	visibility: collapse;
}
.FeatureTabContents:selected{
	visibility: visible;
}
```