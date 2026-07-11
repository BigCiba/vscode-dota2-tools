# Panel

# Label
## Properties
Property|Type|Description
--|--|--
text|string|
htmlboolean|
allowtextselection|boolean|Whether to allow text selection

# Image
## Properties
Property|Type|Description
--|--|--
src|String|Image path
scaling|String|Defines image scaling mode
## JS API
Function|Signature|Description
--|--|--
SetImage|SetImage(src: string): void|
SetScaling|SetScaling(scaling: string): void|
## Notes
scaling|Description
--|--
none|No scaling, displays original size
stretch|Default
stretchx|Stretch width only
stretchy|Stretch height only
stretch-to-fit-preserve-aspect|Fit with aspect ratio
stretch-to-fit-x-preserve-aspect|Fit width with aspect ratio
stretch-to-fit-y-preserve-aspect|Fit height with aspect ratio
stretch-to-cover-preserve-aspect|Cover with aspect ratio

# DOTAAbilityImage
## Properties
Property|Type|Description
--|--|--
abilityname|string|number
abilityid|number|
contextEntityIndex|number|Ability entity index
showtooltip|boolean|Default is false

# DOTAItemImage
## Properties
Property|Type|Description
--|--|--
itemname|string|
contextEntityIndex|number|Item entity index
showtooltip|boolean|Default is true

# DOTAHeroImage
## Properties
Property|Type|Description
--|--|--
heroname|string|
heroid|number|HeroID
heroimagestyle|string|"icon" "portrait" "landscape"
usedefaultimage|boolean|

# DOTACountryFlagImage
## Properties
Property|Type|Description
--|--|--
country_code|string|

# DOTALeagueImage
## Properties
Property|Type|Description
--|--|--
leagueid|number|
leagueimagestyle|"Banner"(default) "Square" "LargeIcon"

# EconItemImage
## Properties
Property|Type|Description
--|--|--
itemdef|number|

# AnimatedImageStrip
## Properties
Property|Type|Description
--|--|--
frametime|string|
defaultframe|number|
animating|boolean|

# DOTAEmoticon
## Properties
Property|Type|Description
--|--|--
emoticonid|number|
alias|string|

# Movie
## Properties
Property|Type|Description
--|--|--
src|string|
repeat|boolean|
controls|string|"none" "minimal" "full"
title|string|
autoplay|string|"off" "onload"(default) "onfocus"
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
## Properties
Property|Type|Description
--|--|--
heroid|number|
heroname|string|
persona|any|
autoplay|string|"off"(default) "onload" "onfocus"

# DOTAScenePanel
## Properties
Property|Type|Description
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
## Properties
Property|Type|Description
--|--|--
itemdef|number|
itemstyle|number|
## JS API
Function|Signature|Description
--|--|--
SetItemByDefinition|SetItemByDefinition(itemDef: number): void|
SetItemByDefinitionAndStyle|SetItemByDefinitionAndStyle(itemDef: number, style: number): void|

# ProgressBar
## Properties
Property|Type|Description
--|--|--
value|number|
min|number|
max|number|

# CircularProgressBar
## Properties
Property|Type|Description
--|--|--
value|number
min|number|
max|number|

# ProgressBarWithMiddle
## Properties
Property|Type|Description
--|--|--
lowervalue|number|
uppervalue|number|
min|number|
max|number|

# DOTAUserName
## Properties
Property|Type|Description
--|--|--
steamid|string|Steam 64-bit ID; "local" represents the local player
accountid|string|Steam 32-bit ID (Dota 2 numeric ID)

# DOTAUserRichPresence
## Properties
Property|Type|Description
--|--|--
steamid|string|Steam 64-bit ID; "local" represents the local player
accountid|string|Steam 32-bit ID (Dota 2 numeric ID)

# DOTAAvatarImage
## Properties
Property|Type|Description
--|--|--
steamid|string|Steam 64-bit ID; "local" represents the local player
accountid|string|Steam 32-bit ID (Dota 2 numeric ID)
nocompendiumborder|boolean|Whether to remove the border (e.g. TI compendium players may have a gold border)
lazy|boolean|
## JS API
Function|Signature|Description
--|--|--
SetAccountID|SetAccountID(accountid: number): void|

# Countdown
## Properties
Property|Type|Description
--|--|--
startTime|number|
endTime|number|
updateInterval|number|Default is 1
timeDialogVariable|string|Default is 'countdown_time'

# Button
## Properties
Property|Type|Description
--|--|--

# TextButton
## Properties
Property|Type|Description
--|--|--

# ToggleButton
## Properties
Property|Type|Description
--|--|--
text|string|
## JS API
Function|Signature|Description
--|--|--
SetSelected|SetSelected(value: boolean): void|

# RadioButton
## Properties
Property|Type|Description
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
## Properties
Property|Type|Description
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
## Properties
Property|Type|Description
--|--|--
value|number|
onvaluechanged|event|
min|number|Default 0
max|number|Default 1000000
increment|number|Default 1

# Slider
## Properties
Property|Type|Description
--|--|--
style|never|
value|number|
onvaluechanged|event|
min|number|Default 0
max|number|Default 1
direction|string|"vertical"(default) "horizontal" to make slider horizontal it also should have a `HorizontalSlider` class.
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
## Properties
Property|Type|Description
--|--|--
notches|number|

# DropDown
## Properties
Property|Type|Description
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
## Properties
Property|Type|Description
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
## Properties
Property|Type|Description
--|--|--
carouselid|string|

# DOTAHUDOverlayMap
## Properties
Property|Type|Description
--|--|--
maptexture|string|
mapscale|number|Default 4
mapscroll|boolean|Default true
fixedoffsetenabled|boolean|Default false
## JS API
Function|Signature|Description
--|--|--
SetFixedOffset|SetFixedOffset(x: number, y: number): void|
SetFixedBackgroundTexturePosition|SetFixedBackgroundTexturePosition(size: number, x: number, y: number): void|

# DOTAMinimap
## Properties
Property|Type|Description
--|--|--

# HTML
## Properties
Property|Type|Description
--|--|--
url|string|
## JS API
Function|Signature|Description
--|--|--
SetURL|SetURL(url: string): void|
SetIgnoreCursor|SetIgnoreCursor(value: boolean): void|
RunJavascript|RunJavascript(js: string): void|

# CustomLayoutPanel
## Properties
Property|Type|Description
--|--|--
layout|string|

# TabButton
## Properties
Property|Type|Description
--|--|--
selected|boolean|Default selection state, corresponds to the checked property in JS
group|string|Group name; only one TabButton in the same group can be selected; cannot be changed dynamically via JS

# TabContents
## Properties
Property|Type|Description
--|--|--
selected|boolean|Default selection state, corresponds to the checked property in JS
group|string|Group name; only one TabButton in the same group can be selected; cannot be changed dynamically via JS
tabid|string|Corresponds to the id of the TabButton
## Example
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