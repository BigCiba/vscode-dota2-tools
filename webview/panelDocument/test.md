# AddFOWViewer
```js
void AddFOWViewer(nTeamID, vLocation, flRadius, flDuration, bObstructedVision)
```
# Class
✔️ `Server: Global`  
❌ `Client: undefined`
# Function Description
为指定队伍添加临时视野
#  Parameters
Type|Name|Description
---|---|---
int|nTeamID|队伍ID
Vector|vLocation|位置
float|flRadius|半径
float|flDuration|持续时间
bool|bObstructedVision|是否有视野阻挡
# Example
```
-- 每帧提供一帧空中视野模拟飞行视野
function modifier_night_stalker_darkness:OnIntervalThink()
	local hCaster = self:GetCaster()
	local iTeamNumber = hCaster:GetTeamNumber()
	local vPosition = hCaster:GetAbsOrigin()
	local iRadius = self:GetAbility():GetSpecialValueFor("radius")
	AddFOWViewer(iTeamNumber, vPosition, iRadius, FrameTime(), false)
end
```