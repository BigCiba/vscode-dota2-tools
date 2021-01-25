LinkLuaModifier( "modifier_filename", "path.lua", LUA_MODIFIER_MOTION_NONE )
--Abilities
if filename == nil then
	filename = class({})
end
function filename:GetIntrinsicModifierName()
	return "modifier_filename"
end
---------------------------------------------------------------------
--Modifiers
if modifier_filename == nil then
	modifier_filename = class({})
end
function modifier_filename:OnCreated(params)
	if IsServer() then
	end
end
function modifier_filename:OnRefresh(params)
	if IsServer() then
	end
end
function modifier_filename:OnDestroy()
	if IsServer() then
	end
end
function modifier_filename:DeclareFunctions()
	return {
	}
end