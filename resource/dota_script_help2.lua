---[[ AddFOWViewer  Add temporary vision for a given team. ]]
-- @return ViewerID
-- @param teamId DOTATeam_t
-- @param location Vector
-- @param radius float
-- @param duration float
-- @param obstructedVision bool
function AddFOWViewer( teamId, location, radius, duration, obstructedVision ) end

---[[ AngleDiff  Returns the number of degrees difference between two yaw angles. ]]
-- @return float
-- @param arg1 float
-- @param arg2 float
function AngleDiff( arg1, arg2 ) end

---[[ AnglesToVector  Generate a vector given a QAngles. ]]
-- @return Vector
-- @param arg1 QAngle
function AnglesToVector( arg1 ) end

---[[ AppendToLogFile   ]]
-- @return nil
-- @param arg1 string
-- @param arg2 string
function AppendToLogFile( arg1, arg2 ) end

---[[ ApplyDamage  Damage an npc. ]]
-- @return float
-- @param options ApplyDamageOptions
function ApplyDamage( options ) end

---[[ AxisAngleToQuaternion  Constructs a quaternion representing a rotation by angle around the specified vector axis. ]]
-- @return Quaternion
-- @param arg1 Vector
-- @param arg2 float
function AxisAngleToQuaternion( arg1, arg2 ) end

---[[ CalcClosestPointOnEntityOBB  Compute the closest point on the OBB of an entity. ]]
-- @return Vector
-- @param arg1 handle
-- @param arg2 Vector
function CalcClosestPointOnEntityOBB( arg1, arg2 ) end

---[[ CalcDistanceBetweenEntityOBB  Compute the distance between two entity OBB. A negative return value indicates an input error. A return value of zero indicates that the OBBs are overlapping. ]]
-- @return float
-- @param arg1 handle
-- @param arg2 handle
function CalcDistanceBetweenEntityOBB( arg1, arg2 ) end

---[[ CalcDistanceToLineSegment2D   ]]
-- @return float
-- @param arg1 Vector
-- @param arg2 Vector
-- @param arg3 Vector
function CalcDistanceToLineSegment2D( arg1, arg2, arg3 ) end

---[[ CancelEntityIOEvents  Create all I/O events for a particular entity. ]]
-- @return nil
-- @param arg1 ehandle
function CancelEntityIOEvents( arg1 ) end

---[[ CenterCameraOnUnit  Centers each players' camera on a unit. ]]
-- @return nil
-- @param playerId PlayerID
-- @param unit CBaseEntity
function CenterCameraOnUnit( playerId, unit ) end

---[[ ClearTeamCustomHealthbarColor   ]]
-- @return nil
-- @param team DOTATeam_t
function ClearTeamCustomHealthbarColor( team ) end

---[[ CreateDamageInfo  Allocate a damageinfo object, used as an argument to TakeDamage(). Call DestroyDamageInfo( hInfo ) to free the object. ]]
-- @return CTakeDamageInfo
-- @param arg1 handle
-- @param arg2 handle
-- @param arg3 Vector
-- @param arg4 Vector
-- @param arg5 float
-- @param arg6 int
function CreateDamageInfo( arg1, arg2, arg3, arg4, arg5, arg6 ) end

---[[ CreateEffect  Pass table - Inputs: entity, effect. ]]
-- @return bool
-- @param arg1 handle
function CreateEffect( arg1 ) end

---[[ CreateHeroForPlayer  Creates a DOTA hero by its dota_npc_units.txt name and sets it as the given player's controlled hero. ]]
-- @return CDOTA_BaseNPC_Hero
-- @param heroName string
-- @param player CDOTAPlayerController
function CreateHeroForPlayer( heroName, player ) end

---[[ CreateHTTPRequest  Create an HTTP request. ]]
-- @return CScriptHTTPRequest
-- @param method string
-- @param url string
function CreateHTTPRequest( method, url ) end

---[[ CreateHTTPRequestScriptVM  Create an HTTP request. ]]
-- @return CScriptHTTPRequest
-- @param method string
-- @param url string
function CreateHTTPRequestScriptVM( method, url ) end

---[[ CreateIllusions  Create illusions of the passed hero that belong to passed unit using passed modifier data. ]]
-- @return [object Object]
-- @param owner CBaseEntity
-- @param heroToCopy CDOTA_BaseNPC_Hero
-- @param modifierKeys CreateIllusionsModifierKeys
-- @param numIllusions int
-- @param padding int
-- @param scramblePosition bool
-- @param findClearSpace bool
function CreateIllusions( owner, heroToCopy, modifierKeys, numIllusions, padding, scramblePosition, findClearSpace ) end

---[[ CreateItem  Create a DOTA item. ]]
-- @return CDOTA_Item
-- @param itemName string
-- @param owner CDOTAPlayerController
-- @param purchaser CDOTA_BaseNPC_Hero
function CreateItem( itemName, owner, purchaser ) end

---[[ CreateItemOnPositionForLaunch  Create a physical item at a given location, can start in air (but doesn't clear a space). ]]
-- @return CDOTA_Item_Physical
-- @param location Vector
-- @param item CDOTA_Item
function CreateItemOnPositionForLaunch( location, item ) end

---[[ CreateItemOnPositionSync  Create a physical item at a given location. ]]
-- @return CDOTA_Item_Physical
-- @param location Vector
-- @param item CDOTA_Item
function CreateItemOnPositionSync( location, item ) end

---[[ CreateModifierThinker  Create a modifier not associated with an NPC. ]]
-- @return CDOTA_BaseNPC
-- @param caster CDOTA_BaseNPC
-- @param ability CDOTABaseAbility
-- @param modifierName string
-- @param paramTable table
-- @param origin Vector
-- @param teamNumber DOTATeam_t
-- @param phantomBlocker bool
function CreateModifierThinker( caster, ability, modifierName, paramTable, origin, teamNumber, phantomBlocker ) end

---[[ CreateRune  Create a rune of the specified type. ]]
-- @return CBaseAnimatingActivity
-- @param location Vector
-- @param runeType DOTA_RUNES
function CreateRune( location, runeType ) end

---[[ CreateSceneEntity  Create a scene entity to play the specified scene. ]]
-- @return CBaseAnimatingActivity
-- @param arg1 string
function CreateSceneEntity( arg1 ) end

---[[ CreateTempTree  Create a temporary tree, uses a default tree model. ]]
-- @return CBaseAnimatingActivity
-- @param location Vector
-- @param duration float
function CreateTempTree( location, duration ) end

---[[ CreateTempTreeWithModel  Create a temporary tree, specifying the tree model name. ]]
-- @return CBaseAnimatingActivity
-- @param location Vector
-- @param duration float
-- @param modelName string
function CreateTempTreeWithModel( location, duration, modelName ) end

---[[ CreateTrigger  Creates and returns an AABB trigger. ]]
-- @return CBaseTrigger
-- @param arg1 Vector
-- @param arg2 Vector
-- @param arg3 Vector
function CreateTrigger( arg1, arg2, arg3 ) end

---[[ CreateTriggerRadiusApproximate  Creates and returns an AABB trigger thats bigger than the radius provided. ]]
-- @return CBaseTrigger
-- @param vecOrigin Vector
-- @param radius float
function CreateTriggerRadiusApproximate( vecOrigin, radius ) end

---[[ CreateUniformRandomStream  Creates a separate random number stream. ]]
-- @return CScriptUniformRandomStream
-- @param seed int
function CreateUniformRandomStream( seed ) end

---[[ CreateUnitByName  Creates a unit by its dota_npc_units.txt name.
The spawned unit will not be controllable by default. You can use unit.SetControllableByPlayer() to change this.
Warning: mass synchronous unit spawning may be slow. Prefer CreateUnitByNameAsync unless synchronous access is required. ]]
-- @return CDOTA_BaseNPC
-- @param unitName string
-- @param location Vector
-- @param findClearSpace bool
-- @param npcOwner CBaseEntity
-- @param entityOwner CBaseEntity
-- @param team DOTATeam_t
function CreateUnitByName( unitName, location, findClearSpace, npcOwner, entityOwner, team ) end

---[[ CreateUnitByNameAsync  Creates a unit by its dota_npc_units.txt name.
The spawned unit will not be controllable by default. You can use unit.SetControllableByPlayer() to change this. ]]
-- @return SpawnGroupHandle
-- @param unitName string
-- @param location Vector
-- @param findClearSpace bool
-- @param npcOwner CBaseEntity
-- @param entityOwner CBaseEntity
-- @param team DOTATeam_t
-- @param callback [object Object]
function CreateUnitByNameAsync( unitName, location, findClearSpace, npcOwner, entityOwner, team, callback ) end

---[[ CreateUnitFromTable  Creates a DOTA unit by its dota_npc_units.txt name from a table of entity key values and a position to spawn at. ]]
-- @return CDOTA_BaseNPC
-- @param options CreateUnitFromTableOptions
-- @param location Vector
function CreateUnitFromTable( options, location ) end

---[[ CrossVectors  Cross product between two vectors. ]]
-- @return Vector
-- @param arg1 Vector
-- @param arg2 Vector
function CrossVectors( arg1, arg2 ) end

---[[ cvar_getf  Gets the value of the given cvar, as a float. ]]
-- @return float
-- @param arg1 string
function cvar_getf( arg1 ) end

---[[ cvar_setf  Sets the value of the given cvar, as a float. ]]
-- @return bool
-- @param arg1 string
-- @param arg2 float
function cvar_setf( arg1, arg2 ) end

---[[ DebugBreak  Breaks in the debugger. ]]
-- @return nil
function DebugBreak(  ) end

---[[ DebugChangeTeam  Changes the team of the hero. ]]
-- @return nil
-- @param arg1 handle
function DebugChangeTeam( arg1 ) end

---[[ DebugCreateHeroWithVariant  Creates a unit with a specified hero variant, controllable by the specified player. ]]
-- @return int
-- @param arg1 handle
-- @param arg2 string
-- @param arg3 int
-- @param arg4 int
-- @param arg5 bool
-- @param arg6 handle
function DebugCreateHeroWithVariant( arg1, arg2, arg3, arg4, arg5, arg6 ) end

---[[ DebugCreateUnit  Creates a test unit controllable by the specified player. ]]
-- @return int
-- @param playerOwner CDOTAPlayerController
-- @param unitName string
-- @param team DOTATeam_t
-- @param arg4 bool
-- @param callback [object Object]
function DebugCreateUnit( playerOwner, unitName, team, arg4, callback ) end

---[[ DebugDrawBox  Draw a debug overlay box. ]]
-- @return nil
-- @param arg1 Vector
-- @param arg2 Vector
-- @param arg3 Vector
-- @param arg4 int
-- @param arg5 int
-- @param arg6 int
-- @param arg7 int
-- @param arg8 float
function DebugDrawBox( arg1, arg2, arg3, arg4, arg5, arg6, arg7, arg8 ) end

---[[ DebugDrawBoxDirection  Draw a debug forward box. ]]
-- @return nil
-- @param cent Vector
-- @param min Vector
-- @param max Vector
-- @param forward Vector
-- @param rgb Vector
-- @param a float
-- @param duration float
function DebugDrawBoxDirection( cent, min, max, forward, rgb, a, duration ) end

---[[ DebugDrawCircle  Draw a debug circle. ]]
-- @return nil
-- @param center Vector
-- @param rgb Vector
-- @param a float
-- @param rad float
-- @param ztest bool
-- @param duration float
function DebugDrawCircle( center, rgb, a, rad, ztest, duration ) end

---[[ DebugDrawClear  Try to clear all the debug overlay info. ]]
-- @return nil
function DebugDrawClear(  ) end

---[[ DebugDrawLine  Draw a debug overlay line. ]]
-- @return nil
-- @param origin Vector
-- @param target Vector
-- @param r int
-- @param g int
-- @param b int
-- @param ztest bool
-- @param duration float
function DebugDrawLine( origin, target, r, g, b, ztest, duration ) end

---[[ DebugDrawLine_vCol  Draw a debug line using color vec. ]]
-- @return nil
-- @param arg1 Vector
-- @param arg2 Vector
-- @param arg3 Vector
-- @param arg4 bool
-- @param arg5 float
function DebugDrawLine_vCol( arg1, arg2, arg3, arg4, arg5 ) end

---[[ DebugDrawScreenTextLine  Draw text with a line offset. ]]
-- @return nil
-- @param x float
-- @param y float
-- @param lineOffset int
-- @param text string
-- @param r int
-- @param g int
-- @param b int
-- @param a int
-- @param duration float
function DebugDrawScreenTextLine( x, y, lineOffset, text, r, g, b, a, duration ) end

---[[ DebugDrawSphere  Draw a debug sphere. ]]
-- @return nil
-- @param center Vector
-- @param rgb Vector
-- @param a float
-- @param rad float
-- @param ztest bool
-- @param duration float
function DebugDrawSphere( center, rgb, a, rad, ztest, duration ) end

---[[ DebugDrawText  Draw text in 3d. ]]
-- @return nil
-- @param origin Vector
-- @param text string
-- @param viewCheck bool
-- @param duration float
function DebugDrawText( origin, text, viewCheck, duration ) end

---[[ DebugScreenTextPretty  Draw pretty debug text. ]]
-- @return nil
-- @param x float
-- @param y float
-- @param lineOffset int
-- @param text string
-- @param r int
-- @param g int
-- @param b int
-- @param a int
-- @param duration float
-- @param font string
-- @param size int
-- @param bold bool
function DebugScreenTextPretty( x, y, lineOffset, text, r, g, b, a, duration, font, size, bold ) end

---[[ DeepPrintTable  Print out a table (and subtables) to the console. ]]
-- @return nil
-- @param table table
function DeepPrintTable( table ) end

---[[ DestroyDamageInfo  Free a damageinfo object that was created with CreateDamageInfo(). ]]
-- @return nil
-- @param damageInfo CTakeDamageInfo
function DestroyDamageInfo( damageInfo ) end

---[[ DisconnectClient  Kick a specific player from the game. ]]
-- @return nil
-- @param arg1 int
-- @param arg2 bool
function DisconnectClient( arg1, arg2 ) end

---[[ DoCleaveAttack   ]]
-- @return int
-- @param attacker CDOTA_BaseNPC
-- @param target CDOTA_BaseNPC
-- @param ability CDOTABaseAbility
-- @param damage float
-- @param startRadius float
-- @param endRadius float
-- @param distance float
-- @param effectName string
function DoCleaveAttack( attacker, target, ability, damage, startRadius, endRadius, distance, effectName ) end

---[[ DoEntFire  Generate and entity i/o event. ]]
-- @return nil
-- @param arg1 string
-- @param arg2 string
-- @param arg3 string
-- @param arg4 float
-- @param arg5 handle
-- @param arg6 handle
function DoEntFire( arg1, arg2, arg3, arg4, arg5, arg6 ) end

---[[ DoEntFireByInstanceHandle  Generate and entity i/o event. ]]
-- @return nil
-- @param arg1 handle
-- @param arg2 string
-- @param arg3 string
-- @param arg4 float
-- @param arg5 handle
-- @param arg6 handle
function DoEntFireByInstanceHandle( arg1, arg2, arg3, arg4, arg5, arg6 ) end

---[[ DoIncludeScript  Execute a script (internal). ]]
-- @return bool
-- @param arg1 string
-- @param arg2 handle
function DoIncludeScript( arg1, arg2 ) end

---[[ DoScriptAssert  Asserts the passed in value. Prints out a message and brings up the assert dialog. ]]
-- @return nil
-- @param arg1 bool
-- @param arg2 string
function DoScriptAssert( arg1, arg2 ) end

---[[ DOTA_SpawnMapAtPosition  Spawn a .vmap at the target location. ]]
-- @return SpawnGroupHandle
-- @param mapName string
-- @param location Vector
-- @param deferCompletion bool
-- @param onReadyToSpawn [object Object]
-- @param onSpawnComplete [object Object]
-- @param context table
function DOTA_SpawnMapAtPosition( mapName, location, deferCompletion, onReadyToSpawn, onSpawnComplete, context ) end

---[[ DotProduct   ]]
-- @return float
-- @param arg1 Vector
-- @param arg2 Vector
function DotProduct( arg1, arg2 ) end

---[[ DoUniqueString  Generate a string guaranteed to be unique across the life of the script VM, with an optional root string. Useful for adding data to tables when not sure what keys are already in use in that table. ]]
-- @return string
-- @param seed string
function DoUniqueString( seed ) end

---[[ DropNeutralItemAtPositionForHero  Drop a neutral item for the team of the hero at the given tier. ]]
-- @return CDOTA_Item_Physical
-- @param itemName string
-- @param location Vector
-- @param unit CDOTA_BaseNPC
-- @param tier int
-- @param arg5 bool
function DropNeutralItemAtPositionForHero( itemName, location, unit, tier, arg5 ) end

---[[ DropNeutralItemAtPositionForHeroWithOffset  Drop a neutral item for the team of the hero at the given tier. ]]
-- @return handle
-- @param arg1 string
-- @param arg2 Vector
-- @param arg3 handle
-- @param arg4 int
-- @param arg5 bool
-- @param arg6 Vector
function DropNeutralItemAtPositionForHeroWithOffset( arg1, arg2, arg3, arg4, arg5, arg6 ) end

---[[ Dynamic_Wrap  A function to re-lookup a function by name every time. ]]
-- @return unknown
-- @param context table
-- @param name string
function Dynamic_Wrap( context, name ) end

---[[ EmitAnnouncerSound  Emit an announcer sound for all players. ]]
-- @return nil
-- @param soundName string
function EmitAnnouncerSound( soundName ) end

---[[ EmitAnnouncerSoundForPlayer  Emit an announcer sound for a player. ]]
-- @return nil
-- @param soundName string
-- @param playerId PlayerID
function EmitAnnouncerSoundForPlayer( soundName, playerId ) end

---[[ EmitAnnouncerSoundForTeam  Emit an announcer sound for a team. ]]
-- @return nil
-- @param soundName string
-- @param team DOTATeam_t
function EmitAnnouncerSoundForTeam( soundName, team ) end

---[[ EmitAnnouncerSoundForTeamOnLocation  Emit an announcer sound for a team at a specific location. ]]
-- @return nil
-- @param soundName string
-- @param team DOTATeam_t
-- @param location Vector
function EmitAnnouncerSoundForTeamOnLocation( soundName, team, location ) end

---[[ EmitGlobalSound  Play named sound for all players. ]]
-- @return nil
-- @param soundName string
function EmitGlobalSound( soundName ) end

---[[ EmitSoundOn  Play named sound on Entity. ]]
-- @return nil
-- @param soundName string
-- @param entity CBaseEntity
function EmitSoundOn( soundName, entity ) end

---[[ EmitSoundOnClient  Play named sound only on the client for the passed in player. ]]
-- @return nil
-- @param soundName string
-- @param arg2 handle
function EmitSoundOnClient( soundName, arg2 ) end

---[[ EmitSoundOnEntityForPlayer  Emit a sound on an entity for only a specific player. ]]
-- @return nil
-- @param arg1 string
-- @param arg2 handle
-- @param arg3 int
function EmitSoundOnEntityForPlayer( arg1, arg2, arg3 ) end

---[[ EmitSoundOnLocationForAllies  Emit a sound on a location from a unit, only for players allied with that unit. ]]
-- @return nil
-- @param location Vector
-- @param soundName string
-- @param caster CBaseEntity
function EmitSoundOnLocationForAllies( location, soundName, caster ) end

---[[ EmitSoundOnLocationForPlayer  Emit a sound on a location for only a specific player. ]]
-- @return nil
-- @param arg1 string
-- @param arg2 Vector
-- @param arg3 int
function EmitSoundOnLocationForPlayer( arg1, arg2, arg3 ) end

---[[ EmitSoundOnLocationWithCaster  Emit a sound on a location from a unit. ]]
-- @return nil
-- @param location Vector
-- @param soundName string
-- @param caster CDOTA_BaseNPC
function EmitSoundOnLocationWithCaster( location, soundName, caster ) end

---[[ EntIndexToHScript  Turn an entity index integer to an HScript representing that entity's script instance. ]]
-- @return CBaseEntity
-- @param entityIndex EntityIndex
function EntIndexToHScript( entityIndex ) end

---[[ ExecuteOrderFromTable  Issue an order from a script table. ]]
-- @return nil
-- @param order ExecuteOrderOptions
function ExecuteOrderFromTable( order ) end

---[[ ExponentialDecay  Smooth curve decreasing slower as it approaches zero. ]]
-- @return float
-- @param arg1 float
-- @param arg2 float
-- @param arg3 float
function ExponentialDecay( arg1, arg2, arg3 ) end

---[[ FindClearRandomPositionAroundUnit  Finds a clear random position around a given target unit, using the target unit's padded collision radius. ]]
-- @return bool
-- @param arg1 handle
-- @param arg2 handle
-- @param arg3 int
function FindClearRandomPositionAroundUnit( arg1, arg2, arg3 ) end

---[[ FindClearSpaceForUnit  Place a unit somewhere not already occupied. ]]
-- @return bool
-- @param unit CDOTA_BaseNPC
-- @param location Vector
-- @param arg3 bool
function FindClearSpaceForUnit( unit, location, arg3 ) end

---[[ FindSpawnEntityForTeam  Find a spawn point for the given team. ]]
-- @return CBaseEntity
-- @param team DOTATeam_t
function FindSpawnEntityForTeam( team ) end

---[[ FindUnitsInLine  Find units that intersect the given line with the given flags. ]]
-- @return [object Object]
-- @param team DOTATeam_t
-- @param startPos Vector
-- @param endPos Vector
-- @param cacheUnit CBaseEntity
-- @param width float
-- @param teamFilter DOTA_UNIT_TARGET_TEAM
-- @param typeFilter DOTA_UNIT_TARGET_TYPE
-- @param flagFilter DOTA_UNIT_TARGET_FLAGS
function FindUnitsInLine( team, startPos, endPos, cacheUnit, width, teamFilter, typeFilter, flagFilter ) end

---[[ FindUnitsInRadius  Finds the units in a given radius with the given flags. ]]
-- @return [object Object]
-- @param team DOTATeam_t
-- @param location Vector
-- @param cacheUnit CBaseEntity
-- @param radius float
-- @param teamFilter DOTA_UNIT_TARGET_TEAM
-- @param typeFilter DOTA_UNIT_TARGET_TYPE
-- @param flagFilter DOTA_UNIT_TARGET_FLAGS
-- @param order FindOrder
-- @param canGrowCache bool
function FindUnitsInRadius( team, location, cacheUnit, radius, teamFilter, typeFilter, flagFilter, order, canGrowCache ) end

---[[ FireEntityIOInputNameOnly  Fire Entity's Action Input w/no data. ]]
-- @return nil
-- @param arg1 ehandle
-- @param arg2 string
function FireEntityIOInputNameOnly( arg1, arg2 ) end

---[[ FireEntityIOInputString  Fire Entity's Action Input with passed String - you own the memory. ]]
-- @return nil
-- @param arg1 ehandle
-- @param arg2 string
-- @param arg3 string
function FireEntityIOInputString( arg1, arg2, arg3 ) end

---[[ FireEntityIOInputVec  Fire Entity's Action Input with passed Vector - you own the memory. ]]
-- @return nil
-- @param arg1 ehandle
-- @param arg2 string
-- @param arg3 Vector
function FireEntityIOInputVec( arg1, arg2, arg3 ) end

---[[ FireGameEvent  Fire a game event. ]]
-- @return nil
-- @param eventName string
-- @param eventData table
function FireGameEvent( eventName, eventData ) end

---[[ FireGameEventLocal  Fire a game event without broadcasting to the client. ]]
-- @return nil
-- @param eventName string
-- @param eventData table
function FireGameEventLocal( eventName, eventData ) end

---[[ FrameTime  Get the time spent on the server in the last frame. ]]
-- @return float
function FrameTime(  ) end

---[[ GetAbilityKeyValuesByName  Get ability data by ability name. ]]
-- @return table
-- @param arg1 string
function GetAbilityKeyValuesByName( arg1 ) end

---[[ GetAbilityTextureNameForAbility  Gets the ability texture name for an ability. ]]
-- @return string
-- @param abilityName string
function GetAbilityTextureNameForAbility( abilityName ) end

---[[ GetActiveSpawnGroupHandle  Returns the currently active spawn group handle. ]]
-- @return SpawnGroupHandle
function GetActiveSpawnGroupHandle(  ) end

---[[ GetClearSpaceForUnit  Returns a location for the unit that is not already occupied. ]]
-- @return Vector
-- @param arg1 handle
-- @param arg2 Vector
function GetClearSpaceForUnit( arg1, arg2 ) end

---[[ GetDedicatedServerKey   ]]
-- @return string
-- @param version string
function GetDedicatedServerKey( version ) end

---[[ GetDedicatedServerKeyV2   ]]
-- @return string
-- @param version string
function GetDedicatedServerKeyV2( version ) end

---[[ GetDedicatedServerKeyV3   ]]
-- @return string
-- @param version string
function GetDedicatedServerKeyV3( version ) end

---[[ GetEntityIndexForTreeId  Get the enity index for a tree id specified as the entindex_target of a DOTA_UNIT_ORDER_CAST_TARGET_TREE. ]]
-- @return EntityIndex
-- @param treeId uint
function GetEntityIndexForTreeId( treeId ) end

---[[ GetFrameCount  Returns the engines current frame count. ]]
-- @return int
function GetFrameCount(  ) end

---[[ GetGroundHeight   ]]
-- @return float
-- @param location Vector
-- @param unitHull CDOTA_BaseNPC
function GetGroundHeight( location, unitHull ) end

---[[ GetGroundPosition  Returns the supplied position moved to the ground. Second parameter is an NPC for measuring movement collision hull offset. ]]
-- @return Vector
-- @param location Vector
-- @param unitHull CDOTA_BaseNPC
function GetGroundPosition( location, unitHull ) end

---[[ GetItemCost  Get the cost of an item by name. ]]
-- @return int
-- @param arg1 string
function GetItemCost( arg1 ) end

---[[ GetItemDefOwnedCount   ]]
-- @return int
-- @param arg1 int
-- @param arg2 int
function GetItemDefOwnedCount( arg1, arg2 ) end

---[[ GetItemDefQuantity   ]]
-- @return int
-- @param arg1 int
-- @param arg2 int
function GetItemDefQuantity( arg1, arg2 ) end

---[[ GetListenServerHost  Get the local player on a listen server. ]]
-- @return CDOTAPlayerController
function GetListenServerHost(  ) end

---[[ GetLobbyEventGameDetails   ]]
-- @return table
function GetLobbyEventGameDetails(  ) end

---[[ GetMapName  Get the name of the map. ]]
-- @return string
function GetMapName(  ) end

---[[ GetMaxOutputDelay  Get the longest delay for all events attached to an output. ]]
-- @return float
-- @param arg1 ehandle
-- @param arg2 string
function GetMaxOutputDelay( arg1, arg2 ) end

---[[ GetPhysAngularVelocity  Get Angular Velocity for VPHYS or normal object. Returns a vector of the axis of rotation, multiplied by the degrees of rotation per second. ]]
-- @return Vector
-- @param arg1 handle
function GetPhysAngularVelocity( arg1 ) end

---[[ GetPhysVelocity  Get Velocity for VPHYS or normal object. ]]
-- @return Vector
-- @param arg1 handle
function GetPhysVelocity( arg1 ) end

---[[ GetPotentialNeutralItemDrop  Given the item tier and the team, roll for the name of a valid neutral item drop, considering previous drops and consumables. ]]
-- @return string
-- @param tier int
-- @param team DOTATeam_t
function GetPotentialNeutralItemDrop( tier, team ) end

---[[ GetSystemDate  Get the current real world date. ]]
-- @return string
function GetSystemDate(  ) end

---[[ GetSystemTime  Get the current real world time. ]]
-- @return string
function GetSystemTime(  ) end

---[[ GetSystemTimeMS  Get system time in milliseconds. ]]
-- @return double
function GetSystemTimeMS(  ) end

---[[ GetTargetAOELocation   ]]
-- @return Vector
-- @param arg1 int
-- @param arg2 int
-- @param arg3 int
-- @param arg4 Vector
-- @param arg5 int
-- @param arg6 int
-- @param arg7 int
function GetTargetAOELocation( arg1, arg2, arg3, arg4, arg5, arg6, arg7 ) end

---[[ GetTargetLinearLocation   ]]
-- @return Vector
-- @param arg1 int
-- @param arg2 int
-- @param arg3 int
-- @param arg4 Vector
-- @param arg5 int
-- @param arg6 int
-- @param arg7 int
function GetTargetLinearLocation( arg1, arg2, arg3, arg4, arg5, arg6, arg7 ) end

---[[ GetTeamHeroKills   ]]
-- @return int
-- @param team DOTATeam_t
function GetTeamHeroKills( team ) end

---[[ GetTeamName   ]]
-- @return string
-- @param team DOTATeam_t
function GetTeamName( team ) end

---[[ GetTreeIdForEntityIndex  Given and entity index of a tree, get the tree id for use for use with with unit orders. ]]
-- @return int
-- @param entityIndex EntityIndex
function GetTreeIdForEntityIndex( entityIndex ) end

---[[ GetUnitKeyValuesByName  Get unit data by ability name. ]]
-- @return table
-- @param arg1 string
function GetUnitKeyValuesByName( arg1 ) end

---[[ GetWorldMaxX  Gets the world's maximum X position. ]]
-- @return float
function GetWorldMaxX(  ) end

---[[ GetWorldMaxY  Gets the world's maximum Y position. ]]
-- @return float
function GetWorldMaxY(  ) end

---[[ GetWorldMinX  Gets the world's minimum X position. ]]
-- @return float
function GetWorldMinX(  ) end

---[[ GetWorldMinY  Gets the world's minimum Y position. ]]
-- @return float
function GetWorldMinY(  ) end

---[[ GetXPNeededToReachNextLevel  Get amount of XP required to reach the next level. ]]
-- @return int
-- @param level int
function GetXPNeededToReachNextLevel( level ) end

---[[ HeroMaxLevel  Max out a hero's level and give them all appropriate abilities and talents. ]]
-- @return nil
-- @param arg1 handle
function HeroMaxLevel( arg1 ) end

---[[ InitLogFile   ]]
-- @return nil
-- @param arg1 string
-- @param arg2 string
function InitLogFile( arg1, arg2 ) end

---[[ IsClient  Returns true if this is lua running from the client.dll. ]]
-- @return bool
function IsClient(  ) end

---[[ IsDedicatedServer  Returns true if this server is a dedicated server. ]]
-- @return bool
function IsDedicatedServer(  ) end

---[[ IsInToolsMode  Returns true if this is lua running within tools mode. ]]
-- @return bool
function IsInToolsMode(  ) end

---[[ IsLocationVisible  Ask fog of war if a location is visible to a certain team. ]]
-- @return bool
-- @param team DOTATeam_t
-- @param location Vector
function IsLocationVisible( team, location ) end

---[[ IsMangoTree  Is this entity a mango tree? (hEntity). ]]
-- @return bool
-- @param entity CBaseEntity
function IsMangoTree( entity ) end

---[[ IsMarkedForDeletion  Returns true if the entity is valid and marked for deletion. ]]
-- @return bool
-- @param entity CBaseEntity
function IsMarkedForDeletion( entity ) end

---[[ IsServer  Returns true if this is lua running from the server.dll. ]]
-- @return bool
function IsServer(  ) end

---[[ IsUnitInValidPosition  Returns true if the unit is in a valid position in the gridnav. ]]
-- @return bool
-- @param unit CBaseEntity
function IsUnitInValidPosition( unit ) end

---[[ IsValidEntity  Checks to see if the given hScript is a valid entity. ]]
-- @return bool
-- @param entity table
function IsValidEntity( entity ) end

---[[ LerpVectors  Lerp between two vectors by a float factor returning new vector. ]]
-- @return Vector
-- @param arg1 Vector
-- @param arg2 Vector
-- @param arg3 float
function LerpVectors( arg1, arg2, arg3 ) end

---[[ LimitPathingSearchDepth  Set the limit on the pathfinding search space. ]]
-- @return nil
-- @param arg1 float
function LimitPathingSearchDepth( arg1 ) end

---[[ LinkLuaModifier  Link a lua-defined modifier with the associated class. ]]
-- @return nil
-- @param className string
-- @param filePath string
-- @param luaModifierType LuaModifierType
function LinkLuaModifier( className, filePath, luaModifierType ) end

---[[ ListenToGameEvent  Register as a listener for a game event from script. ]]
-- @return EventListenerID
-- @param eventName string
-- @param listener [object Object]
-- @param context table
function ListenToGameEvent( eventName, listener, context ) end

---[[ LoadKeyValues  Creates a table from the specified keyvalues text file. ]]
-- @return table
-- @param filePath string
function LoadKeyValues( filePath ) end

---[[ LoadKeyValuesFromString  Creates a table from the specified keyvalues string. ]]
-- @return table
-- @param kvString string
function LoadKeyValuesFromString( kvString ) end

---[[ LocalTime  Get the current local time. ]]
-- @return LocalTime
function LocalTime(  ) end

---[[ MakeStringToken  Checks to see if the given hScript is a valid entity. ]]
-- @return int
-- @param arg1 string
function MakeStringToken( arg1 ) end

---[[ ManuallyTriggerSpawnGroupCompletion  Triggers the creation of entities in a manually-completed spawn group. ]]
-- @return nil
-- @param handle SpawnGroupHandle
function ManuallyTriggerSpawnGroupCompletion( handle ) end

---[[ MinimapEvent  Start a minimap event. ]]
-- @return nil
-- @param team DOTATeam_t
-- @param entity CBaseEntity
-- @param xCoord int
-- @param yCoord int
-- @param eventType DOTAMinimapEvent_t
-- @param eventDuration int
function MinimapEvent( team, entity, xCoord, yCoord, eventType, eventDuration ) end

---[[ Msg  Print a message. ]]
-- @return nil
-- @param message string
function Msg( message ) end

---[[ PauseGame  Pause or unpause the game. ]]
-- @return nil
-- @param paused bool
function PauseGame( paused ) end

---[[ Plat_FloatTime  Get the current float time from the engine. ]]
-- @return float
function Plat_FloatTime(  ) end

---[[ PlayerInstanceFromIndex  Get a script instance of a player by index. ]]
-- @return CDOTAPlayerController
-- @param entityIndex EntityIndex
function PlayerInstanceFromIndex( entityIndex ) end

---[[ PrecacheEntityFromTable  Precache an entity from KeyValues in table. ]]
-- @return nil
-- @param arg1 string
-- @param arg2 handle
-- @param context CScriptPrecacheContext
function PrecacheEntityFromTable( arg1, arg2, context ) end

---[[ PrecacheEntityListFromTable  Precache a list of entity KeyValues tables. ]]
-- @return nil
-- @param arg1 handle
-- @param context CScriptPrecacheContext
function PrecacheEntityListFromTable( arg1, context ) end

---[[ PrecacheItemByNameAsync  Asynchronously precaches a DOTA item by its dota_npc_items.txt name, provides a callback when it's finished. ]]
-- @return nil
-- @param itemName string
-- @param callback [object Object]
function PrecacheItemByNameAsync( itemName, callback ) end

---[[ PrecacheItemByNameSync  Precaches a DOTA item by its dota_npc_items.txt name. ]]
-- @return nil
-- @param itemName string
-- @param context CScriptPrecacheContext
function PrecacheItemByNameSync( itemName, context ) end

---[[ PrecacheModel  Manually precache a single model. ]]
-- @return nil
-- @param modelName string
-- @param context CScriptPrecacheContext
function PrecacheModel( modelName, context ) end

---[[ PrecacheResource  Manually precache a single resource. ]]
-- @return nil
-- @param arg1 string
-- @param arg2 string
-- @param context CScriptPrecacheContext
function PrecacheResource( arg1, arg2, context ) end

---[[ PrecacheUnitByNameAsync  Asynchronously precaches a DOTA unit by its dota_npc_units.txt name, provides a callback when it's finished. ]]
-- @return nil
-- @param unitName string
-- @param callback [object Object]
-- @param playerId PlayerID
function PrecacheUnitByNameAsync( unitName, callback, playerId ) end

---[[ PrecacheUnitByNameSync  Precaches a DOTA unit by its dota_npc_units.txt name. ]]
-- @return nil
-- @param unitName string
-- @param context CScriptPrecacheContext
-- @param playerId PlayerID
function PrecacheUnitByNameSync( unitName, context, playerId ) end

---[[ PrecacheUnitFromTableAsync  Precaches a DOTA unit from a table of entity key values. ]]
-- @return nil
-- @param arg1 handle
-- @param callback [object Object]
function PrecacheUnitFromTableAsync( arg1, callback ) end

---[[ PrecacheUnitFromTableSync  Precaches a DOTA unit from a table of entity key values. ]]
-- @return nil
-- @param arg1 handle
-- @param context CScriptPrecacheContext
function PrecacheUnitFromTableSync( arg1, context ) end

---[[ PrintLinkedConsoleMessage  Print a console message with a linked console command. ]]
-- @return nil
-- @param message string
-- @param tooltip string
function PrintLinkedConsoleMessage( message, tooltip ) end

---[[ QSlerp  Spherical lerp of angle from->to based on time. ]]
-- @return QAngle
-- @param from_angle QAngle
-- @param to_angle QAngle
-- @param time float
function QSlerp( from_angle, to_angle, time ) end

---[[ RandomFloat  Get a random float within a range. ]]
-- @return float
-- @param min float
-- @param max float
function RandomFloat( min, max ) end

---[[ RandomFloatWrapper  Generate a random floating point number within a range, inclusive. ]]
-- @return float
-- @param arg1 float
-- @param arg2 float
function RandomFloatWrapper( arg1, arg2 ) end

---[[ RandomInt  Get a random int within a range. ]]
-- @return int
-- @param min int
-- @param max int
function RandomInt( min, max ) end

---[[ RandomVector  Get a random 2D vector of the given length. ]]
-- @return Vector
-- @param length float
function RandomVector( length ) end

---[[ RecordNeutralItemEarned  Record in player resources that a new neutral item has been created, if it hasn't already been, and show a toast. ]]
-- @return nil
-- @param arg1 handle
-- @param arg2 handle
-- @param arg3 int
function RecordNeutralItemEarned( arg1, arg2, arg3 ) end

---[[ RegisterCustomAnimationScriptForModel  Register a custom animation script to run when a model loads. ]]
-- @return nil
-- @param arg1 string
-- @param arg2 string
function RegisterCustomAnimationScriptForModel( arg1, arg2 ) end

---[[ RegisterSpawnGroupFilterProxy  Create a C proxy for a script-based spawn group filter. ]]
-- @return nil
-- @param arg1 string
function RegisterSpawnGroupFilterProxy( arg1 ) end

---[[ ReloadMOTD  Reloads the MotD file. ]]
-- @return nil
function ReloadMOTD(  ) end

---[[ RemoveFOWViewer  Remove temporary vision for a given team. ]]
-- @return nil
-- @param teamId DOTATeam_t
-- @param viewerId ViewerID
function RemoveFOWViewer( teamId, viewerId ) end

---[[ RemoveSpawnGroupFilterProxy  Remove the C proxy for a script-based spawn group filter. ]]
-- @return nil
-- @param arg1 string
function RemoveSpawnGroupFilterProxy( arg1 ) end

---[[ ResolveNPCPositions  Check and fix units that have been assigned a position inside collision radius of other NPCs. ]]
-- @return nil
-- @param location Vector
-- @param radius float
function ResolveNPCPositions( location, radius ) end

---[[ RollPercentage  Rolls a number from 1 to 100 and returns true if the roll is less than or equal to the number specified. ]]
-- @return bool
-- @param successPercentage int
function RollPercentage( successPercentage ) end

---[[ RollPseudoRandomPercentage   ]]
-- @return bool
-- @param chance uint
-- @param pseudoRandomId PseudoRandom
-- @param unit CDOTA_BaseNPC
function RollPseudoRandomPercentage( chance, pseudoRandomId, unit ) end

---[[ RotateOrientation  Rotate a QAngle by another QAngle. ]]
-- @return QAngle
-- @param arg1 QAngle
-- @param arg2 QAngle
function RotateOrientation( arg1, arg2 ) end

---[[ RotatePosition  Rotate a Vector around a point. ]]
-- @return Vector
-- @param arg1 Vector
-- @param arg2 QAngle
-- @param arg3 Vector
function RotatePosition( arg1, arg2, arg3 ) end

---[[ RotateQuaternionByAxisAngle  Rotates a quaternion by the specified angle around the specified vector axis. ]]
-- @return Quaternion
-- @param arg1 Quaternion
-- @param arg2 Vector
-- @param arg3 float
function RotateQuaternionByAxisAngle( arg1, arg2, arg3 ) end

---[[ RotationDelta  Find the delta between two QAngles. ]]
-- @return QAngle
-- @param arg1 QAngle
-- @param arg2 QAngle
function RotationDelta( arg1, arg2 ) end

---[[ RotationDeltaAsAngularVelocity  Converts delta QAngle to an angular velocity Vector. ]]
-- @return Vector
-- @param arg1 QAngle
-- @param arg2 QAngle
function RotationDeltaAsAngularVelocity( arg1, arg2 ) end

---[[ Say  Have Entity say string, and teamOnly or not. ]]
-- @return nil
-- @param entity CBaseEntity
-- @param message string
-- @param teamOnly bool
function Say( entity, message, teamOnly ) end

---[[ ScreenShake  Start a screenshake. ]]
-- @return nil
-- @param center Vector
-- @param amplitude float
-- @param frequency float
-- @param duration float
-- @param radius float
-- @param command [object Object]
-- @param airShake bool
function ScreenShake( center, amplitude, frequency, duration, radius, command, airShake ) end

---[[ Script_RandomFloat  Get a random float within a range. ]]
-- @return float
-- @param arg1 float
-- @param arg2 float
function Script_RandomFloat( arg1, arg2 ) end

---[[ Script_RemapValClamped  RemapValClamped. ]]
-- @return float
-- @param arg1 float
-- @param arg2 float
-- @param arg3 float
-- @param arg4 float
-- @param arg5 float
function Script_RemapValClamped( arg1, arg2, arg3, arg4, arg5 ) end

---[[ SendOverheadEventMessage   ]]
-- @return nil
-- @param sendToPlayer CDOTAPlayerController
-- @param messageType DOTA_OVERHEAD_ALERT
-- @param targetEntity CDOTA_BaseNPC
-- @param value int
-- @param sourcePlayer CDOTAPlayerController
function SendOverheadEventMessage( sendToPlayer, messageType, targetEntity, value, sourcePlayer ) end

---[[ SendToConsole  Send a string to the console as a client command. ]]
-- @return nil
-- @param arg1 string
function SendToConsole( arg1 ) end

---[[ SendToServerConsole  Send a string to the console as a server command. ]]
-- @return nil
-- @param arg1 string
function SendToServerConsole( arg1 ) end

---[[ SetOpvarFloatAll  Sets an opvar value for all players. ]]
-- @return nil
-- @param arg1 string
-- @param arg2 string
-- @param arg3 string
-- @param arg4 float
function SetOpvarFloatAll( arg1, arg2, arg3, arg4 ) end

---[[ SetOpvarFloatPlayer  Sets an opvar value for a single player. ]]
-- @return nil
-- @param arg1 string
-- @param arg2 string
-- @param arg3 string
-- @param arg4 float
-- @param arg5 handle
function SetOpvarFloatPlayer( arg1, arg2, arg3, arg4, arg5 ) end

---[[ SetPhysAngularVelocity  Set Angular Velocity for VPHYS or normal object, from a vector of the axis of rotation, multiplied by the degrees of rotation per second. ]]
-- @return nil
-- @param arg1 handle
-- @param arg2 Vector
function SetPhysAngularVelocity( arg1, arg2 ) end

---[[ SetQuestName  Set the current quest name. ]]
-- @return nil
-- @param arg1 string
function SetQuestName( arg1 ) end

---[[ SetQuestPhase  Set the current quest phase. ]]
-- @return nil
-- @param arg1 int
function SetQuestPhase( arg1 ) end

---[[ SetRenderingEnabled  Set rendering on/off for an ehandle. ]]
-- @return nil
-- @param arg1 ehandle
-- @param arg2 bool
function SetRenderingEnabled( arg1, arg2 ) end

---[[ SetTeamCustomHealthbarColor   ]]
-- @return nil
-- @param team DOTATeam_t
-- @param r int
-- @param g int
-- @param b int
function SetTeamCustomHealthbarColor( team, r, g, b ) end

---[[ ShowCustomHeaderMessage  Supports localized strings - %s1 = PlayerName, %s2 = Value, %s3 = TeamName. ]]
-- @return nil
-- @param message string
-- @param playerId PlayerID
-- @param value int
-- @param time float
function ShowCustomHeaderMessage( message, playerId, value, time ) end

---[[ ShowGenericPopup  Show a generic popup dialog for all players. ]]
-- @return nil
-- @param arg1 string
-- @param arg2 string
-- @param arg3 string
-- @param arg4 string
-- @param arg5 int
function ShowGenericPopup( arg1, arg2, arg3, arg4, arg5 ) end

---[[ ShowGenericPopupToPlayer  Show a generic popup dialog to a specific player. ]]
-- @return nil
-- @param arg1 handle
-- @param arg2 string
-- @param arg3 string
-- @param arg4 string
-- @param arg5 string
-- @param arg6 int
function ShowGenericPopupToPlayer( arg1, arg2, arg3, arg4, arg5, arg6 ) end

---[[ ShowMessage  Print a hud message on all clients. ]]
-- @return nil
-- @param arg1 string
function ShowMessage( arg1 ) end

---[[ SpawnDOTAShopTriggerRadiusApproximate   ]]
-- @return CDOTA_ShopTrigger
-- @param origin Vector
-- @param radius float
function SpawnDOTAShopTriggerRadiusApproximate( origin, radius ) end

---[[ SpawnEffigyOfUnitOrModel  Spawn an effigy of the target unit. ]]
-- @return handle
-- @param arg1 string
-- @param arg2 int
-- @param arg3 Vector
-- @param arg4 Vector
-- @param arg5 float
-- @param arg6 float
-- @param arg7 int
function SpawnEffigyOfUnitOrModel( arg1, arg2, arg3, arg4, arg5, arg6, arg7 ) end

---[[ SpawnEntityFromTableAsynchronous  Asynchronously spawns a single entity from a table. ]]
-- @return nil
-- @param arg1 string
-- @param arg2 handle
-- @param arg3 handle
-- @param arg4 handle
function SpawnEntityFromTableAsynchronous( arg1, arg2, arg3, arg4 ) end

---[[ SpawnEntityFromTableSynchronous  Synchronously spawns a single entity from a table. ]]
-- @return CBaseEntity
-- @param baseclass string
-- @param data table
function SpawnEntityFromTableSynchronous( baseclass, data ) end

---[[ SpawnEntityGroupFromTable  Hierarchically spawn an entity group from a set of spawn tables. ]]
-- @return bool
-- @param arg1 handle
-- @param arg2 bool
-- @param arg3 handle
function SpawnEntityGroupFromTable( arg1, arg2, arg3 ) end

---[[ SpawnEntityListFromTableAsynchronous  Asynchronously spawn an entity group from a list of spawn tables. A callback will be triggered when the spawning is complete. ]]
-- @return int
-- @param arg1 handle
-- @param arg2 handle
function SpawnEntityListFromTableAsynchronous( arg1, arg2 ) end

---[[ SpawnEntityListFromTableSynchronous  Synchronously spawn an entity group from a list of spawn tables. ]]
-- @return handle
-- @param arg1 handle
function SpawnEntityListFromTableSynchronous( arg1 ) end

---[[ SpawnMangoTree  Spawn a mango tree. ]]
-- @return handle
-- @param pos Vector
-- @param team int
-- @param duration float
-- @param mangoInterval float
-- @param initialMangoes int
function SpawnMangoTree( pos, team, duration, mangoInterval, initialMangoes ) end

---[[ SplineQuaternions  Very basic interpolation of v0 to v1 over t on [0,1]. ]]
-- @return Quaternion
-- @param arg1 Quaternion
-- @param arg2 Quaternion
-- @param arg3 float
function SplineQuaternions( arg1, arg2, arg3 ) end

---[[ SplineVectors  Very basic interpolation of v0 to v1 over t on [0,1]. ]]
-- @return Vector
-- @param arg1 Vector
-- @param arg2 Vector
-- @param arg3 float
function SplineVectors( arg1, arg2, arg3 ) end

---[[ StartSoundEvent  Start a sound event. ]]
-- @return nil
-- @param arg1 string
-- @param arg2 handle
function StartSoundEvent( arg1, arg2 ) end

---[[ StartSoundEventFromPosition  Start a sound event from position. ]]
-- @return nil
-- @param soundName string
-- @param position Vector
function StartSoundEventFromPosition( soundName, position ) end

---[[ StartSoundEventFromPositionReliable  Start a sound event from position with reliable delivery. ]]
-- @return nil
-- @param soundName string
-- @param position Vector
function StartSoundEventFromPositionReliable( soundName, position ) end

---[[ StartSoundEventFromPositionUnreliable  Start a sound event from position with optional delivery. ]]
-- @return nil
-- @param soundName string
-- @param position Vector
function StartSoundEventFromPositionUnreliable( soundName, position ) end

---[[ StartSoundEventReliable  Start a sound event with reliable delivery. ]]
-- @return nil
-- @param arg1 string
-- @param arg2 handle
function StartSoundEventReliable( arg1, arg2 ) end

---[[ StartSoundEventUnreliable  Start a sound event with optional delivery. ]]
-- @return nil
-- @param arg1 string
-- @param arg2 handle
function StartSoundEventUnreliable( arg1, arg2 ) end

---[[ StopEffect  Pass entity and effect name. ]]
-- @return nil
-- @param arg1 handle
-- @param arg2 string
function StopEffect( arg1, arg2 ) end

---[[ StopGlobalSound  Stop named sound for all players. ]]
-- @return nil
-- @param arg1 string
function StopGlobalSound( arg1 ) end

---[[ StopListeningToAllGameEvents  Stop listening to all game events within a specific context. ]]
-- @return nil
-- @param arg1 handle
function StopListeningToAllGameEvents( arg1 ) end

---[[ StopListeningToGameEvent  Stop listening to a particular game event. ]]
-- @return bool
-- @param listenerId EventListenerID
function StopListeningToGameEvent( listenerId ) end

---[[ StopSoundEvent  Stops a sound event with optional delivery. ]]
-- @return nil
-- @param arg1 string
-- @param arg2 handle
function StopSoundEvent( arg1, arg2 ) end

---[[ StopSoundOn  Stop named sound on Entity. ]]
-- @return nil
-- @param arg1 string
-- @param arg2 handle
function StopSoundOn( arg1, arg2 ) end

---[[ Time  Get the current server time. ]]
-- @return float
function Time(  ) end

---[[ TraceCollideable   ]]
-- @return bool
-- @param query TraceCollideableInputs
function TraceCollideable( query ) end

---[[ TraceHull   ]]
-- @return bool
-- @param query TraceHullInputs
function TraceHull( query ) end

---[[ TraceLine   ]]
-- @return bool
-- @param query TraceLineInputs
function TraceLine( query ) end

---[[ UnitFilter  Check if a unit passes a set of filters. ]]
-- @return UnitFilterResult
-- @param npc CDOTA_BaseNPC
-- @param teamFilter DOTA_UNIT_TARGET_TEAM
-- @param typeFilter DOTA_UNIT_TARGET_TYPE
-- @param flagFilter DOTA_UNIT_TARGET_FLAGS
-- @param team DOTATeam_t
function UnitFilter( npc, teamFilter, typeFilter, flagFilter, team ) end

---[[ UnloadSpawnGroup  Unload a spawn group by name. ]]
-- @return nil
-- @param arg1 string
function UnloadSpawnGroup( arg1 ) end

---[[ UnloadSpawnGroupByHandle  Unload a spawn group by handle. ]]
-- @return nil
-- @param handle SpawnGroupHandle
function UnloadSpawnGroupByHandle( handle ) end

---[[ UpdateEventPoints   ]]
-- @return nil
-- @param eventPointData handle
function UpdateEventPoints( eventPointData ) end

---[[ UserIDToControllerHScript  Turn a userid integer (typically, fields named 'userid' in game events) to an HScript representing the associated player controller's script instance. ]]
-- @return handle
-- @param arg1 int
function UserIDToControllerHScript( arg1 ) end

---[[ UTIL_MessageText  Sends colored text to one client. ]]
-- @return nil
-- @param arg1 int
-- @param arg2 string
-- @param arg3 int
-- @param arg4 int
-- @param arg5 int
-- @param arg6 int
function UTIL_MessageText( arg1, arg2, arg3, arg4, arg5, arg6 ) end

---[[ UTIL_MessageText_WithContext  Sends colored text to one client. (Valid context keys: player_id, value, team_id). ]]
-- @return nil
-- @param arg1 int
-- @param arg2 string
-- @param arg3 int
-- @param arg4 int
-- @param arg5 int
-- @param arg6 int
-- @param arg7 handle
function UTIL_MessageText_WithContext( arg1, arg2, arg3, arg4, arg5, arg6, arg7 ) end

---[[ UTIL_MessageTextAll  Sends colored text to all clients. ]]
-- @return nil
-- @param arg1 string
-- @param arg2 int
-- @param arg3 int
-- @param arg4 int
-- @param arg5 int
function UTIL_MessageTextAll( arg1, arg2, arg3, arg4, arg5 ) end

---[[ UTIL_MessageTextAll_WithContext  Sends colored text to all clients. (Valid context keys: player_id, value, team_id). ]]
-- @return nil
-- @param arg1 string
-- @param arg2 int
-- @param arg3 int
-- @param arg4 int
-- @param arg5 int
-- @param arg6 handle
function UTIL_MessageTextAll_WithContext( arg1, arg2, arg3, arg4, arg5, arg6 ) end

---[[ UTIL_Remove  Removes the specified entity. ]]
-- @return nil
-- @param entity CBaseEntity
function UTIL_Remove( entity ) end

---[[ UTIL_RemoveImmediate  Immediately removes the specified entity. ]]
-- @return nil
-- @param entity CBaseEntity
function UTIL_RemoveImmediate( entity ) end

---[[ UTIL_ResetMessageText  Clear all message text on one client. ]]
-- @return nil
-- @param arg1 int
function UTIL_ResetMessageText( arg1 ) end

---[[ UTIL_ResetMessageTextAll  Clear all message text from all clients. ]]
-- @return nil
function UTIL_ResetMessageTextAll(  ) end

---[[ VectorAngles   ]]
-- @return QAngle
-- @param arg1 Vector
function VectorAngles( arg1 ) end

---[[ VectorToAngles  Get Qangles (with no roll) for a Vector. ]]
-- @return QAngle
-- @param arg1 Vector
function VectorToAngles( arg1 ) end

---[[ Warning  Print a warning. ]]
-- @return nil
-- @param message string
function Warning( message ) end

---[[ ActiveSequenceDuration  Returns the duration in seconds of the active sequence. ]]
-- @return float
function CBaseAnimatingActivity:ActiveSequenceDuration(  ) end

---[[ GetCycle  Get the cycle of the animation. ]]
-- @return float
function CBaseAnimatingActivity:GetCycle(  ) end

---[[ GetSequence  Returns the name of the active sequence. ]]
-- @return string
function CBaseAnimatingActivity:GetSequence(  ) end

---[[ IsSequenceFinished  Ask whether the main sequence is done playing. ]]
-- @return bool
function CBaseAnimatingActivity:IsSequenceFinished(  ) end

---[[ ResetSequence  Sets the active sequence by name, resetting the current cycle. ]]
-- @return nil
-- @param sequenceName string
function CBaseAnimatingActivity:ResetSequence( sequenceName ) end

---[[ SequenceDuration  Returns the duration in seconds of the given sequence name. ]]
-- @return float
-- @param sequenceName string
function CBaseAnimatingActivity:SequenceDuration( sequenceName ) end

---[[ SetCycle  Set the cycle of the animation. ]]
-- @return nil
-- @param cycle float
function CBaseAnimatingActivity:SetCycle( cycle ) end

---[[ SetPoseParameter  Set the specified pose parameter to the specified value. ]]
-- @return float
-- @param name string
-- @param value float
function CBaseAnimatingActivity:SetPoseParameter( name, value ) end

---[[ SetSequence  Sets the active sequence by name, keeping the current cycle. ]]
-- @return nil
-- @param sequenceName string
function CBaseAnimatingActivity:SetSequence( sequenceName ) end

---[[ StopAnimation  Stop the current animation by setting playback rate to 0.0. ]]
-- @return nil
function CBaseAnimatingActivity:StopAnimation(  ) end

---[[ AddEffects  Adds the render effect flag. ]]
-- @return nil
-- @param flags EntityEffects
function CBaseEntity:AddEffects( flags ) end

---[[ ApplyAbsVelocityImpulse  Apply a Velocity Impulse. ]]
-- @return nil
-- @param vecImpulse Vector
function CBaseEntity:ApplyAbsVelocityImpulse( vecImpulse ) end

---[[ ApplyLocalAngularVelocityImpulse  Apply an Ang Velocity Impulse. ]]
-- @return nil
-- @param angImpulse Vector
function CBaseEntity:ApplyLocalAngularVelocityImpulse( angImpulse ) end

---[[ Attribute_GetFloatValue  Get float value for an entity attribute. ]]
-- @return float
-- @param name string
-- @param default float
function CBaseEntity:Attribute_GetFloatValue( name, default ) end

---[[ Attribute_GetIntValue  Get int value for an entity attribute. ]]
-- @return int
-- @param name string
-- @param default int
function CBaseEntity:Attribute_GetIntValue( name, default ) end

---[[ Attribute_SetFloatValue  Set float value for an entity attribute. ]]
-- @return nil
-- @param name string
-- @param value float
function CBaseEntity:Attribute_SetFloatValue( name, value ) end

---[[ Attribute_SetIntValue  Set int value for an entity attribute. ]]
-- @return nil
-- @param name string
-- @param value int
function CBaseEntity:Attribute_SetIntValue( name, value ) end

---[[ DeleteAttribute  Delete an entity attribute. ]]
-- @return nil
-- @param name string
function CBaseEntity:DeleteAttribute( name ) end

---[[ EmitSound  Plays a sound from this entity. ]]
-- @return nil
-- @param soundname string
function CBaseEntity:EmitSound( soundname ) end

---[[ EmitSoundParams  Plays/modifies a sound from this entity. changes sound if nPitch and/or flVol or flSoundTime is > 0. ]]
-- @return nil
-- @param soundName string
-- @param pitch int
-- @param volume float
-- @param delay float
function CBaseEntity:EmitSoundParams( soundName, pitch, volume, delay ) end

---[[ EyeAngles  Get the qangles that this entity is looking at. ]]
-- @return QAngle
function CBaseEntity:EyeAngles(  ) end

---[[ EyePosition  Get vector to eye position - absolute coords. ]]
-- @return Vector
function CBaseEntity:EyePosition(  ) end

---[[ FirstMoveChild   ]]
-- @return CBaseEntity
function CBaseEntity:FirstMoveChild(  ) end

---[[ FollowEntity   ]]
-- @return nil
-- @param entity CBaseEntity
-- @param boneMerge bool
function CBaseEntity:FollowEntity( entity, boneMerge ) end

---[[ FollowEntityMerge  HEntity to follow, string BoneOrAttachName. ]]
-- @return nil
-- @param ent handle
-- @param boneOrAttachName string
function CBaseEntity:FollowEntityMerge( ent, boneOrAttachName ) end

---[[ GatherCriteria  Returns a table containing the criteria that would be used for response queries on this entity. This is the same as the table that is passed to response rule script function callbacks. ]]
-- @return nil
-- @param result handle
function CBaseEntity:GatherCriteria( result ) end

---[[ GetAbsOrigin   ]]
-- @return Vector
function CBaseEntity:GetAbsOrigin(  ) end

---[[ GetAbsScale   ]]
-- @return float
function CBaseEntity:GetAbsScale(  ) end

---[[ GetAngles   ]]
-- @return QAngle
function CBaseEntity:GetAngles(  ) end

---[[ GetAnglesAsVector  Get entity pitch, yaw, roll as a vector. ]]
-- @return Vector
function CBaseEntity:GetAnglesAsVector(  ) end

---[[ GetAngularVelocity  Get the local angular velocity - returns a vector of pitch,yaw,roll. ]]
-- @return Vector
function CBaseEntity:GetAngularVelocity(  ) end

---[[ GetBaseVelocity  Get Base? velocity. ]]
-- @return Vector
function CBaseEntity:GetBaseVelocity(  ) end

---[[ GetBoundingMaxs  Get a vector containing max bounds, centered on object. ]]
-- @return Vector
function CBaseEntity:GetBoundingMaxs(  ) end

---[[ GetBoundingMins  Get a vector containing min bounds, centered on object. ]]
-- @return Vector
function CBaseEntity:GetBoundingMins(  ) end

---[[ GetBounds  Get a table containing the 'Mins' & 'Maxs' vector bounds, centered on object. ]]
-- @return EntityBounds
function CBaseEntity:GetBounds(  ) end

---[[ GetCenter  Get vector to center of object - absolute coords. ]]
-- @return Vector
function CBaseEntity:GetCenter(  ) end

---[[ GetChildren  Get the entities parented to this entity. ]]
-- @return [object Object]
function CBaseEntity:GetChildren(  ) end

---[[ GetContext  Looks up a context and returns it if available. May return string, float, or null (if the context isn't found). ]]
-- @return string
-- @param name string
function CBaseEntity:GetContext( name ) end

---[[ GetForwardVector  Get the forward vector of the entity. ]]
-- @return Vector
function CBaseEntity:GetForwardVector(  ) end

---[[ GetHealth  Get the health of this entity. ]]
-- @return int
function CBaseEntity:GetHealth(  ) end

---[[ GetLeftVector  Get the left vector of the entity. ]]
-- @return Vector
function CBaseEntity:GetLeftVector(  ) end

---[[ GetLocalAngles  Get entity local pitch, yaw, roll as a QAngle. ]]
-- @return QAngle
function CBaseEntity:GetLocalAngles(  ) end

---[[ GetLocalAngularVelocity  Maybe local angvel. ]]
-- @return QAngle
function CBaseEntity:GetLocalAngularVelocity(  ) end

---[[ GetLocalOrigin  Get entity local origin as a Vector. ]]
-- @return Vector
function CBaseEntity:GetLocalOrigin(  ) end

---[[ GetLocalScale   ]]
-- @return float
function CBaseEntity:GetLocalScale(  ) end

---[[ GetLocalVelocity  Get Entity relative velocity. ]]
-- @return Vector
function CBaseEntity:GetLocalVelocity(  ) end

---[[ GetMass  Get the mass of an entity. (returns 0 if it doesn't have a physics object). ]]
-- @return float
function CBaseEntity:GetMass(  ) end

---[[ GetMaxHealth  Get the maximum health of this entity. ]]
-- @return int
function CBaseEntity:GetMaxHealth(  ) end

---[[ GetModelName  Returns the name of the model. ]]
-- @return string
function CBaseEntity:GetModelName(  ) end

---[[ GetMoveParent  If in hierarchy, retrieves the entity's parent. ]]
-- @return CBaseEntity
function CBaseEntity:GetMoveParent(  ) end

---[[ GetOrigin   ]]
-- @return Vector
function CBaseEntity:GetOrigin(  ) end

---[[ GetOwner  Gets this entity's owner. ]]
-- @return CBaseEntity
function CBaseEntity:GetOwner(  ) end

---[[ GetOwnerEntity  Get the owner entity, if there is one. ]]
-- @return CBaseEntity
function CBaseEntity:GetOwnerEntity(  ) end

---[[ GetRightVector  Get the right vector of the entity. WARNING: This produces a left-handed coordinate system. Use GetLeftVector instead (which is aligned with the y axis of the entity). ]]
-- @return Vector
function CBaseEntity:GetRightVector(  ) end

---[[ GetRootMoveParent  If in hierarchy, walks up the hierarchy to find the root parent. ]]
-- @return CBaseEntity
function CBaseEntity:GetRootMoveParent(  ) end

---[[ GetSoundDuration  Returns float duration of the sound. Takes soundname and optional actormodelname. ]]
-- @return float
-- @param soundname string
-- @param actormodel string
function CBaseEntity:GetSoundDuration( soundname, actormodel ) end

---[[ GetSpawnGroupHandle  Returns the spawn group handle of this entity. ]]
-- @return SpawnGroupHandle
function CBaseEntity:GetSpawnGroupHandle(  ) end

---[[ GetTeam  Get the team number of this entity. ]]
-- @return DOTATeam_t
function CBaseEntity:GetTeam(  ) end

---[[ GetTeamNumber  Get the team number of this entity. ]]
-- @return DOTATeam_t
function CBaseEntity:GetTeamNumber(  ) end

---[[ GetUpVector  Get the up vector of the entity. ]]
-- @return Vector
function CBaseEntity:GetUpVector(  ) end

---[[ GetVelocity   ]]
-- @return Vector
function CBaseEntity:GetVelocity(  ) end

---[[ HasAttribute  See if an entity has a particular attribute. ]]
-- @return bool
-- @param name string
function CBaseEntity:HasAttribute( name ) end

---[[ IsAlive  Is this entity alive? ]]
-- @return bool
function CBaseEntity:IsAlive(  ) end

---[[ IsBaseNPC  Is this entity an CDOTA_BaseNPC? ]]
-- @return bool
function CBaseEntity:IsBaseNPC(  ) end

---[[ IsDOTANPC  Is this entity a Dota NPC? ]]
-- @return bool
function CBaseEntity:IsDOTANPC(  ) end

---[[ IsInstance   ]]
-- @return bool
-- @param classOrClassName string
function CBaseEntity:IsInstance( classOrClassName ) end

---[[ IsNPC  Is this entity an CAI_BaseNPC? ]]
-- @return bool
function CBaseEntity:IsNPC(  ) end

---[[ IsPlayer  Back compat: Is this entity a player pawn *or* controller? ]]
-- @return bool
function CBaseEntity:IsPlayer(  ) end

---[[ IsPlayerController  Is this entity a player controller? ]]
-- @return bool
function CBaseEntity:IsPlayerController(  ) end

---[[ IsPlayerPawn  Is this entity a player pawn? ]]
-- @return bool
function CBaseEntity:IsPlayerPawn(  ) end

---[[ Kill   ]]
-- @return nil
function CBaseEntity:Kill(  ) end

---[[ NextMovePeer   ]]
-- @return CBaseEntity
function CBaseEntity:NextMovePeer(  ) end

---[[ PrecacheScriptSound  Precache a sound for later playing. ]]
-- @return nil
-- @param soundname string
function CBaseEntity:PrecacheScriptSound( soundname ) end

---[[ RemoveEffects  Removes the render effect flag. ]]
-- @return nil
-- @param flags EntityEffects
function CBaseEntity:RemoveEffects( flags ) end

---[[ SetAbsAngles  Set entity pitch, yaw, roll by component. ]]
-- @return nil
-- @param pitch float
-- @param yaw float
-- @param roll float
function CBaseEntity:SetAbsAngles( pitch, yaw, roll ) end

---[[ SetAbsOrigin   ]]
-- @return nil
-- @param origin Vector
function CBaseEntity:SetAbsOrigin( origin ) end

---[[ SetAbsScale   ]]
-- @return nil
-- @param scale float
function CBaseEntity:SetAbsScale( scale ) end

---[[ SetAngles  Set entity pitch, yaw, roll by component. ]]
-- @return nil
-- @param pitch float
-- @param yaw float
-- @param roll float
function CBaseEntity:SetAngles( pitch, yaw, roll ) end

---[[ SetAngularVelocity  Set the local angular velocity. ]]
-- @return nil
-- @param pitchVel float
-- @param yawVel float
-- @param rollVel float
function CBaseEntity:SetAngularVelocity( pitchVel, yawVel, rollVel ) end

---[[ SetConstraint  Set the position of the constraint. ]]
-- @return nil
-- @param pos Vector
function CBaseEntity:SetConstraint( pos ) end

---[[ SetContext  Store any key/value pair in this entity's dialog contexts. Value must be a string. Will last for duration (set 0 to mean 'forever'). ]]
-- @return nil
-- @param name string
-- @param value string
-- @param duration float
function CBaseEntity:SetContext( name, value, duration ) end

---[[ SetContextNum  Store any key/value pair in this entity's dialog contexts. Value must be a number (int or float). Will last for duration (set 0 to mean 'forever'). ]]
-- @return nil
-- @param name string
-- @param value float
-- @param duration float
function CBaseEntity:SetContextNum( name, value, duration ) end

---[[ SetContextThink  Set a think function on this entity. ]]
-- @return nil
-- @param contextName string
-- @param thinkFunc [object Object]
-- @param interval float
function CBaseEntity:SetContextThink( contextName, thinkFunc, interval ) end

---[[ SetEntityName  Set the name of an entity. ]]
-- @return nil
-- @param name string
function CBaseEntity:SetEntityName( name ) end

---[[ SetForwardVector  Set the orientation of the entity to have this forward vector. ]]
-- @return nil
-- @param v Vector
function CBaseEntity:SetForwardVector( v ) end

---[[ SetFriction  Set PLAYER friction, ignored for objects. ]]
-- @return nil
-- @param friction float
function CBaseEntity:SetFriction( friction ) end

---[[ SetGravity  Set PLAYER gravity, ignored for objects. ]]
-- @return nil
-- @param gravity float
function CBaseEntity:SetGravity( gravity ) end

---[[ SetHealth  Set the health of this entity. ]]
-- @return nil
-- @param health int
function CBaseEntity:SetHealth( health ) end

---[[ SetLocalAngles  Set entity local pitch, yaw, roll by component. ]]
-- @return nil
-- @param pitch float
-- @param yaw float
-- @param roll float
function CBaseEntity:SetLocalAngles( pitch, yaw, roll ) end

---[[ SetLocalOrigin  Set entity local origin from a Vector. ]]
-- @return nil
-- @param origin Vector
function CBaseEntity:SetLocalOrigin( origin ) end

---[[ SetLocalScale   ]]
-- @return nil
-- @param scale float
function CBaseEntity:SetLocalScale( scale ) end

---[[ SetMass  Set the mass of an entity. (does nothing if it doesn't have a physics object). ]]
-- @return nil
-- @param mass float
function CBaseEntity:SetMass( mass ) end

---[[ SetMaxHealth  Set the maximum health of this entity. ]]
-- @return nil
-- @param amt int
function CBaseEntity:SetMaxHealth( amt ) end

---[[ SetOrigin   ]]
-- @return nil
-- @param v Vector
function CBaseEntity:SetOrigin( v ) end

---[[ SetOwner  Sets this entity's owner. This entity will be returned by GetOwner() and GetOwnerEntity(). GetPlayerOwner() and GetPlayerOwnerID() will be automatically inferred from this entity. ]]
-- @return nil
-- @param owner CBaseEntity
function CBaseEntity:SetOwner( owner ) end

---[[ SetParent  Set the parent for this entity. ]]
-- @return nil
-- @param parent CBaseEntity
-- @param attachmentname string
function CBaseEntity:SetParent( parent, attachmentname ) end

---[[ SetTeam   ]]
-- @return nil
-- @param teamNum DOTATeam_t
function CBaseEntity:SetTeam( teamNum ) end

---[[ SetThink  Set a think function on this entity. Uses `CBaseEntity:SetContextThink` internally.
Note: optional parameters can be given in any order. ]]
-- @return nil
-- @param functionName [object Object]
-- @param context table
-- @param contextName string
-- @param initialDelay float
function CBaseEntity:SetThink( functionName, context, contextName, initialDelay ) end

---[[ SetVelocity   ]]
-- @return nil
-- @param vecVelocity Vector
function CBaseEntity:SetVelocity( vecVelocity ) end

---[[ StopSound  Stops a named sound playing from this entity. ]]
-- @return nil
-- @param soundname string
function CBaseEntity:StopSound( soundname ) end

---[[ StopThink  Stops thinker created with `CBaseEntity.SetThink`.
Alias for `CBaseEntity:SetContextThink(contextName, nil, 0)`. ]]
-- @return nil
-- @param contextName string
function CBaseEntity:StopThink( contextName ) end

---[[ TakeDamage  Apply damage to this entity. Use CreateDamageInfo() to create a damageinfo object. ]]
-- @return int
-- @param damageInfo CTakeDamageInfo
function CBaseEntity:TakeDamage( damageInfo ) end

---[[ TransformPointEntityToWorld  Returns the input Vector transformed from entity to world space. ]]
-- @return Vector
-- @param point Vector
function CBaseEntity:TransformPointEntityToWorld( point ) end

---[[ TransformPointWorldToEntity  Returns the input Vector transformed from world to entity space. ]]
-- @return Vector
-- @param point Vector
function CBaseEntity:TransformPointWorldToEntity( point ) end

---[[ Trigger  Fires off this entity's OnTrigger responses. ]]
-- @return nil
function CBaseEntity:Trigger(  ) end

---[[ ValidatePrivateScriptScope  Validates the private script scope and creates it if one doesn't exist. ]]
-- @return nil
function CBaseEntity:ValidatePrivateScriptScope(  ) end

---[[ GetAttachmentAngles  Get the attachment id's angles as a p,y,r vector. ]]
-- @return Vector
-- @param attachment int
function CBaseModelEntity:GetAttachmentAngles( attachment ) end

---[[ GetAttachmentForward  Get the attachment id's forward vector. ]]
-- @return Vector
-- @param attachment int
function CBaseModelEntity:GetAttachmentForward( attachment ) end

---[[ GetAttachmentOrigin  Get the attachment id's origin vector. ]]
-- @return Vector
-- @param attachment int
function CBaseModelEntity:GetAttachmentOrigin( attachment ) end

---[[ GetMaterialGroupHash  Get the material group hash of this entity. ]]
-- @return uint
function CBaseModelEntity:GetMaterialGroupHash(  ) end

---[[ GetMaterialGroupMask  Get the mesh group mask of this entity. ]]
-- @return Uint64
function CBaseModelEntity:GetMaterialGroupMask(  ) end

---[[ GetModelScale  Get scale of entity's model. ]]
-- @return float
function CBaseModelEntity:GetModelScale(  ) end

---[[ GetRenderAlpha  Get the alpha modulation of this entity. ]]
-- @return int
function CBaseModelEntity:GetRenderAlpha(  ) end

---[[ GetRenderColor  Get the render color of the entity. ]]
-- @return Vector
function CBaseModelEntity:GetRenderColor(  ) end

---[[ ScriptLookupAttachment  Get the named attachment id. ]]
-- @return int
-- @param attachmentName string
function CBaseModelEntity:ScriptLookupAttachment( attachmentName ) end

---[[ SetBodygroup  Sets a bodygroup. ]]
-- @return nil
-- @param bodyGroup int
-- @param choice int
function CBaseModelEntity:SetBodygroup( bodyGroup, choice ) end

---[[ SetBodygroupByName  Sets a bodygroup by name. ]]
-- @return nil
-- @param name string
-- @param value int
function CBaseModelEntity:SetBodygroupByName( name, value ) end

---[[ SetMaterialGroup  Set the material group of this entity. ]]
-- @return nil
-- @param materialGroup string
function CBaseModelEntity:SetMaterialGroup( materialGroup ) end

---[[ SetMaterialGroupHash  Set the material group hash of this entity. ]]
-- @return nil
-- @param hash uint
function CBaseModelEntity:SetMaterialGroupHash( hash ) end

---[[ SetMaterialGroupMask  Set the mesh group mask of this entity. ]]
-- @return nil
-- @param meshGroupMask Uint64
function CBaseModelEntity:SetMaterialGroupMask( meshGroupMask ) end

---[[ SetModel   ]]
-- @return nil
-- @param modelName string
function CBaseModelEntity:SetModel( modelName ) end

---[[ SetModelScale  Set scale of entity's model. ]]
-- @return nil
-- @param scale float
function CBaseModelEntity:SetModelScale( scale ) end

---[[ SetRenderAlpha  Set the alpha modulation of this entity. ]]
-- @return nil
-- @param alpha int
function CBaseModelEntity:SetRenderAlpha( alpha ) end

---[[ SetRenderColor  Sets the render color of the entity. ]]
-- @return nil
-- @param r int
-- @param g int
-- @param b int
function CBaseModelEntity:SetRenderColor( r, g, b ) end

---[[ SetRenderMode  Sets the render mode of the entity. ]]
-- @return nil
-- @param mode int
function CBaseModelEntity:SetRenderMode( mode ) end

---[[ SetSingleMeshGroup  Set a single mesh group for this entity. ]]
-- @return nil
-- @param meshGroupName string
function CBaseModelEntity:SetSingleMeshGroup( meshGroupName ) end

---[[ SetSize   ]]
-- @return nil
-- @param mins Vector
-- @param maxs Vector
function CBaseModelEntity:SetSize( mins, maxs ) end

---[[ SetSkin   ]]
-- @return nil
-- @param skin int
function CBaseModelEntity:SetSkin( skin ) end

---[[ GetPawn  Returns the pawn for this controller. ]]
-- @return handle
function CBasePlayerController:GetPawn(  ) end

---[[ GetController  Returns the controller for this pawn. ]]
-- @return handle
function CBasePlayerPawn:GetController(  ) end

---[[ GetEquippedWeapons  Returns an array of all the equipped weapons. ]]
-- @return table
function CBasePlayerPawn:GetEquippedWeapons(  ) end

---[[ GetWeaponCount  Gets the number of weapons currently equipped. ]]
-- @return int
function CBasePlayerPawn:GetWeaponCount(  ) end

---[[ IsNoclipping  Returns true if the player is in noclip mode. ]]
-- @return bool
function CBasePlayerPawn:IsNoclipping(  ) end

---[[ Disable  Disable's the trigger. ]]
-- @return nil
function CBaseTrigger:Disable(  ) end

---[[ Enable  Enable the trigger. ]]
-- @return nil
function CBaseTrigger:Enable(  ) end

---[[ IsTouching  Checks whether the passed entity is touching the trigger. ]]
-- @return bool
-- @param ent CBaseEntity
function CBaseTrigger:IsTouching( ent ) end

---[[ AddImpulseAtPosition  Apply an impulse at a worldspace position to the physics. ]]
-- @return nil
-- @param arg1 Vector
-- @param arg2 Vector
function CBodyComponent:AddImpulseAtPosition( arg1, arg2 ) end

---[[ AddVelocity  Add linear and angular velocity to the physics object. ]]
-- @return nil
-- @param arg1 Vector
-- @param arg2 Vector
function CBodyComponent:AddVelocity( arg1, arg2 ) end

---[[ DetachFromParent  Detach from its parent. ]]
-- @return nil
function CBodyComponent:DetachFromParent(  ) end

---[[ IsAttachedToParent  Is attached to parent. ]]
-- @return bool
function CBodyComponent:IsAttachedToParent(  ) end

---[[ SetAngularVelocity   ]]
-- @return nil
-- @param arg1 Vector
function CBodyComponent:SetAngularVelocity( arg1 ) end

---[[ SetMaterialGroup   ]]
-- @return nil
-- @param arg1 string
function CBodyComponent:SetMaterialGroup( arg1 ) end

---[[ SetVelocity   ]]
-- @return nil
-- @param arg1 Vector
function CBodyComponent:SetVelocity( arg1 ) end

---[[ RegisterListener  Register a callback to be called when a particular custom event arrives. Returns a listener ID that can be used to unregister later. ]]
-- @return CustomGameEventListenerID
-- @param eventName string
-- @param listener [object Object]
function CCustomGameEventManager:RegisterListener( eventName, listener ) end

---[[ Send_ServerToAllClients   ]]
-- @return nil
-- @param eventName string
-- @param eventData table
function CCustomGameEventManager:Send_ServerToAllClients( eventName, eventData ) end

---[[ Send_ServerToPlayer   ]]
-- @return nil
-- @param player CDOTAPlayerController
-- @param eventName string
-- @param eventData table
function CCustomGameEventManager:Send_ServerToPlayer( player, eventName, eventData ) end

---[[ Send_ServerToTeam   ]]
-- @return nil
-- @param team DOTATeam_t
-- @param eventName string
-- @param eventData table
function CCustomGameEventManager:Send_ServerToTeam( team, eventName, eventData ) end

---[[ UnregisterListener  Unregister a specific listener. ]]
-- @return nil
-- @param listenerId CustomGameEventListenerID
function CCustomGameEventManager:UnregisterListener( listenerId ) end

---[[ GetTableValue   ]]
-- @return table
-- @param tableName string
-- @param keyName string
function CCustomNetTableManager:GetTableValue( tableName, keyName ) end

---[[ SetTableValue   ]]
-- @return bool
-- @param tableName string
-- @param keyName string
-- @param value handle
function CCustomNetTableManager:SetTableValue( tableName, keyName, value ) end

---[[ Axis  Draws an axis. Specify origin + orientation in world space. ]]
-- @return nil
-- @param arg1 Vector
-- @param arg2 QAngle
-- @param arg3 float
-- @param arg4 bool
-- @param arg5 float
function CDebugOverlayScriptHelper:Axis( arg1, arg2, arg3, arg4, arg5 ) end

---[[ Box  Draws a world-space axis-aligned box. Specify bounds in world space. ]]
-- @return nil
-- @param arg1 Vector
-- @param arg2 Vector
-- @param arg3 int
-- @param arg4 int
-- @param arg5 int
-- @param arg6 int
-- @param arg7 bool
-- @param arg8 float
function CDebugOverlayScriptHelper:Box( arg1, arg2, arg3, arg4, arg5, arg6, arg7, arg8 ) end

---[[ BoxAngles  Draws an oriented box at the origin. Specify bounds in local space. ]]
-- @return nil
-- @param arg1 Vector
-- @param arg2 Vector
-- @param arg3 Vector
-- @param arg4 QAngle
-- @param arg5 int
-- @param arg6 int
-- @param arg7 int
-- @param arg8 int
-- @param arg9 bool
-- @param arg10 float
function CDebugOverlayScriptHelper:BoxAngles( arg1, arg2, arg3, arg4, arg5, arg6, arg7, arg8, arg9, arg10 ) end

---[[ Capsule  Draws a capsule. Specify base in world space. ]]
-- @return nil
-- @param arg1 Vector
-- @param arg2 QAngle
-- @param arg3 float
-- @param arg4 float
-- @param arg5 int
-- @param arg6 int
-- @param arg7 int
-- @param arg8 int
-- @param arg9 bool
-- @param arg10 float
function CDebugOverlayScriptHelper:Capsule( arg1, arg2, arg3, arg4, arg5, arg6, arg7, arg8, arg9, arg10 ) end

---[[ Circle  Draws a circle. Specify center in world space. ]]
-- @return nil
-- @param arg1 Vector
-- @param arg2 QAngle
-- @param arg3 float
-- @param arg4 int
-- @param arg5 int
-- @param arg6 int
-- @param arg7 int
-- @param arg8 bool
-- @param arg9 float
function CDebugOverlayScriptHelper:Circle( arg1, arg2, arg3, arg4, arg5, arg6, arg7, arg8, arg9 ) end

---[[ CircleScreenOriented  Draws a circle oriented to the screen. Specify center in world space. ]]
-- @return nil
-- @param arg1 Vector
-- @param arg2 float
-- @param arg3 int
-- @param arg4 int
-- @param arg5 int
-- @param arg6 int
-- @param arg7 bool
-- @param arg8 float
function CDebugOverlayScriptHelper:CircleScreenOriented( arg1, arg2, arg3, arg4, arg5, arg6, arg7, arg8 ) end

---[[ Cone  Draws a wireframe cone. Specify endpoint and direction in world space. ]]
-- @return nil
-- @param arg1 Vector
-- @param arg2 Vector
-- @param arg3 float
-- @param arg4 float
-- @param arg5 int
-- @param arg6 int
-- @param arg7 int
-- @param arg8 int
-- @param arg9 bool
-- @param arg10 float
function CDebugOverlayScriptHelper:Cone( arg1, arg2, arg3, arg4, arg5, arg6, arg7, arg8, arg9, arg10 ) end

---[[ Cross  Draws a screen-aligned cross. Specify origin in world space. ]]
-- @return nil
-- @param arg1 Vector
-- @param arg2 float
-- @param arg3 int
-- @param arg4 int
-- @param arg5 int
-- @param arg6 int
-- @param arg7 bool
-- @param arg8 float
function CDebugOverlayScriptHelper:Cross( arg1, arg2, arg3, arg4, arg5, arg6, arg7, arg8 ) end

---[[ Cross3D  Draws a world-aligned cross. Specify origin in world space. ]]
-- @return nil
-- @param arg1 Vector
-- @param arg2 float
-- @param arg3 int
-- @param arg4 int
-- @param arg5 int
-- @param arg6 int
-- @param arg7 bool
-- @param arg8 float
function CDebugOverlayScriptHelper:Cross3D( arg1, arg2, arg3, arg4, arg5, arg6, arg7, arg8 ) end

---[[ Cross3DOriented  Draws an oriented cross. Specify origin in world space. ]]
-- @return nil
-- @param arg1 Vector
-- @param arg2 QAngle
-- @param arg3 float
-- @param arg4 int
-- @param arg5 int
-- @param arg6 int
-- @param arg7 int
-- @param arg8 bool
-- @param arg9 float
function CDebugOverlayScriptHelper:Cross3DOriented( arg1, arg2, arg3, arg4, arg5, arg6, arg7, arg8, arg9 ) end

---[[ DrawTickMarkedLine  Draws a dashed line. Specify endpoints in world space. ]]
-- @return nil
-- @param arg1 Vector
-- @param arg2 Vector
-- @param arg3 float
-- @param arg4 int
-- @param arg5 int
-- @param arg6 int
-- @param arg7 int
-- @param arg8 int
-- @param arg9 bool
-- @param arg10 float
function CDebugOverlayScriptHelper:DrawTickMarkedLine( arg1, arg2, arg3, arg4, arg5, arg6, arg7, arg8, arg9, arg10 ) end

---[[ EntityAttachments  Draws the attachments of the entity. ]]
-- @return nil
-- @param arg1 ehandle
-- @param arg2 float
-- @param arg3 float
function CDebugOverlayScriptHelper:EntityAttachments( arg1, arg2, arg3 ) end

---[[ EntityAxis  Draws the axis of the entity origin. ]]
-- @return nil
-- @param arg1 ehandle
-- @param arg2 float
-- @param arg3 bool
-- @param arg4 float
function CDebugOverlayScriptHelper:EntityAxis( arg1, arg2, arg3, arg4 ) end

---[[ EntityBounds  Draws bounds of an entity. ]]
-- @return nil
-- @param arg1 ehandle
-- @param arg2 int
-- @param arg3 int
-- @param arg4 int
-- @param arg5 int
-- @param arg6 bool
-- @param arg7 float
function CDebugOverlayScriptHelper:EntityBounds( arg1, arg2, arg3, arg4, arg5, arg6, arg7 ) end

---[[ EntitySkeleton  Draws the skeleton of the entity. ]]
-- @return nil
-- @param arg1 ehandle
-- @param arg2 float
function CDebugOverlayScriptHelper:EntitySkeleton( arg1, arg2 ) end

---[[ EntityText  Draws text on an entity. ]]
-- @return nil
-- @param arg1 ehandle
-- @param arg2 int
-- @param arg3 string
-- @param arg4 int
-- @param arg5 int
-- @param arg6 int
-- @param arg7 int
-- @param arg8 float
function CDebugOverlayScriptHelper:EntityText( arg1, arg2, arg3, arg4, arg5, arg6, arg7, arg8 ) end

---[[ FilledRect2D  Draws a screen-space filled 2D rectangle. Coordinates are in pixels. ]]
-- @return nil
-- @param arg1 Vector2D
-- @param arg2 Vector2D
-- @param arg3 int
-- @param arg4 int
-- @param arg5 int
-- @param arg6 int
-- @param arg7 float
function CDebugOverlayScriptHelper:FilledRect2D( arg1, arg2, arg3, arg4, arg5, arg6, arg7 ) end

---[[ HorzArrow  Draws a horizontal arrow. Specify endpoints in world space. ]]
-- @return nil
-- @param arg1 Vector
-- @param arg2 Vector
-- @param arg3 float
-- @param arg4 int
-- @param arg5 int
-- @param arg6 int
-- @param arg7 int
-- @param arg8 bool
-- @param arg9 float
function CDebugOverlayScriptHelper:HorzArrow( arg1, arg2, arg3, arg4, arg5, arg6, arg7, arg8, arg9 ) end

---[[ Line  Draws a line between two points. ]]
-- @return nil
-- @param arg1 Vector
-- @param arg2 Vector
-- @param arg3 int
-- @param arg4 int
-- @param arg5 int
-- @param arg6 int
-- @param arg7 bool
-- @param arg8 float
function CDebugOverlayScriptHelper:Line( arg1, arg2, arg3, arg4, arg5, arg6, arg7, arg8 ) end

---[[ Line2D  Draws a line between two points in screenspace. ]]
-- @return nil
-- @param arg1 Vector2D
-- @param arg2 Vector2D
-- @param arg3 int
-- @param arg4 int
-- @param arg5 int
-- @param arg6 int
-- @param arg7 float
function CDebugOverlayScriptHelper:Line2D( arg1, arg2, arg3, arg4, arg5, arg6, arg7 ) end

---[[ PopDebugOverlayScope  Pops the identifier used to group overlays. Overlays marked with this identifier can be deleted in a big batch. ]]
-- @return nil
function CDebugOverlayScriptHelper:PopDebugOverlayScope(  ) end

---[[ PushAndClearDebugOverlayScope  Pushes an identifier used to group overlays. Deletes all existing overlays using this overlay id. ]]
-- @return nil
-- @param arg1 string
function CDebugOverlayScriptHelper:PushAndClearDebugOverlayScope( arg1 ) end

---[[ PushDebugOverlayScope  Pushes an identifier used to group overlays. Overlays marked with this identifier can be deleted in a big batch. ]]
-- @return nil
-- @param arg1 string
function CDebugOverlayScriptHelper:PushDebugOverlayScope( arg1 ) end

---[[ RemoveAllInScope  Removes all overlays marked with a specific identifier, regardless of their lifetime. ]]
-- @return nil
-- @param arg1 string
function CDebugOverlayScriptHelper:RemoveAllInScope( arg1 ) end

---[[ SolidCone  Draws a solid cone. Specify endpoint and direction in world space. ]]
-- @return nil
-- @param arg1 Vector
-- @param arg2 Vector
-- @param arg3 float
-- @param arg4 float
-- @param arg5 int
-- @param arg6 int
-- @param arg7 int
-- @param arg8 int
-- @param arg9 bool
-- @param arg10 float
function CDebugOverlayScriptHelper:SolidCone( arg1, arg2, arg3, arg4, arg5, arg6, arg7, arg8, arg9, arg10 ) end

---[[ Sphere  Draws a wireframe sphere. Specify center in world space. ]]
-- @return nil
-- @param arg1 Vector
-- @param arg2 float
-- @param arg3 int
-- @param arg4 int
-- @param arg5 int
-- @param arg6 int
-- @param arg7 bool
-- @param arg8 float
function CDebugOverlayScriptHelper:Sphere( arg1, arg2, arg3, arg4, arg5, arg6, arg7, arg8 ) end

---[[ SweptBox  Draws a swept box. Specify endpoints in world space and the bounds in local space. ]]
-- @return nil
-- @param arg1 Vector
-- @param arg2 Vector
-- @param arg3 Vector
-- @param arg4 Vector
-- @param arg5 QAngle
-- @param arg6 int
-- @param arg7 int
-- @param arg8 int
-- @param arg9 int
-- @param arg10 float
function CDebugOverlayScriptHelper:SweptBox( arg1, arg2, arg3, arg4, arg5, arg6, arg7, arg8, arg9, arg10 ) end

---[[ Text  Draws 2D text. Specify origin in world space. ]]
-- @return nil
-- @param arg1 Vector
-- @param arg2 int
-- @param arg3 string
-- @param arg4 float
-- @param arg5 int
-- @param arg6 int
-- @param arg7 int
-- @param arg8 int
-- @param arg9 float
function CDebugOverlayScriptHelper:Text( arg1, arg2, arg3, arg4, arg5, arg6, arg7, arg8, arg9 ) end

---[[ Texture  Draws a screen-space texture. Coordinates are in pixels. ]]
-- @return nil
-- @param arg1 string
-- @param arg2 Vector2D
-- @param arg3 Vector2D
-- @param arg4 int
-- @param arg5 int
-- @param arg6 int
-- @param arg7 int
-- @param arg8 Vector2D
-- @param arg9 Vector2D
-- @param arg10 float
function CDebugOverlayScriptHelper:Texture( arg1, arg2, arg3, arg4, arg5, arg6, arg7, arg8, arg9, arg10 ) end

---[[ Triangle  Draws a filled triangle. Specify vertices in world space. ]]
-- @return nil
-- @param arg1 Vector
-- @param arg2 Vector
-- @param arg3 Vector
-- @param arg4 int
-- @param arg5 int
-- @param arg6 int
-- @param arg7 int
-- @param arg8 bool
-- @param arg9 float
function CDebugOverlayScriptHelper:Triangle( arg1, arg2, arg3, arg4, arg5, arg6, arg7, arg8, arg9 ) end

---[[ VectorText3D  Draws 3D text. Specify origin + orientation in world space. ]]
-- @return nil
-- @param arg1 Vector
-- @param arg2 QAngle
-- @param arg3 string
-- @param arg4 int
-- @param arg5 int
-- @param arg6 int
-- @param arg7 int
-- @param arg8 bool
-- @param arg9 float
function CDebugOverlayScriptHelper:VectorText3D( arg1, arg2, arg3, arg4, arg5, arg6, arg7, arg8, arg9 ) end

---[[ VertArrow  Draws a vertical arrow. Specify endpoints in world space. ]]
-- @return nil
-- @param arg1 Vector
-- @param arg2 Vector
-- @param arg3 float
-- @param arg4 int
-- @param arg5 int
-- @param arg6 int
-- @param arg7 int
-- @param arg8 bool
-- @param arg9 float
function CDebugOverlayScriptHelper:VertArrow( arg1, arg2, arg3, arg4, arg5, arg6, arg7, arg8, arg9 ) end

---[[ YawArrow  Draws a arrow associated with a specific yaw. Specify endpoints in world space. ]]
-- @return nil
-- @param arg1 Vector
-- @param arg2 float
-- @param arg3 float
-- @param arg4 float
-- @param arg5 int
-- @param arg6 int
-- @param arg7 int
-- @param arg8 int
-- @param arg9 bool
-- @param arg10 float
function CDebugOverlayScriptHelper:YawArrow( arg1, arg2, arg3, arg4, arg5, arg6, arg7, arg8, arg9, arg10 ) end

---[[ LaunchSpear  Launch Spear to a target position from a source position. ]]
-- @return nil
-- @param target Vector
-- @param start Vector
function CDOTA_Ability_Aghanim_Spear:LaunchSpear( target, start ) end

---[[ SetPlaybackRate  Override playbackrate. ]]
-- @return nil
-- @param rate float
function CDOTA_Ability_Animation_Attack:SetPlaybackRate( rate ) end

---[[ SetPlaybackRate  Override playbackrate. ]]
-- @return nil
-- @param rate float
function CDOTA_Ability_Animation_TailSpin:SetPlaybackRate( rate ) end

---[[ ApplyDataDrivenModifier  Applies a data driven modifier to the target. ]]
-- @return CDOTA_Buff
-- @param caster CDOTA_BaseNPC
-- @param target CDOTA_BaseNPC
-- @param modifierName string
-- @param modifierTable table
function CDOTA_Ability_DataDriven:ApplyDataDrivenModifier( caster, target, modifierName, modifierTable ) end

---[[ ApplyDataDrivenThinker  Applies a data driven thinker at the location. ]]
-- @return CDOTA_Buff
-- @param caster CDOTA_BaseNPC
-- @param location Vector
-- @param modifierName string
-- @param modifierTable table
function CDOTA_Ability_DataDriven:ApplyDataDrivenThinker( caster, location, modifierName, modifierTable ) end

---[[ CastFilterResult  Determine whether an issued command with no target is valid. ]]
-- @return UnitFilterResult
function CDOTA_Ability_Lua:CastFilterResult(  ) end

---[[ CastFilterResultLocation  Determine whether an issued command on a location is valid. ]]
-- @return UnitFilterResult
-- @param location Vector
function CDOTA_Ability_Lua:CastFilterResultLocation( location ) end

---[[ CastFilterResultTarget  Determine whether an issued command on a target is valid. ]]
-- @return UnitFilterResult
-- @param target CDOTA_BaseNPC
function CDOTA_Ability_Lua:CastFilterResultTarget( target ) end

---[[ GetAbilityChargeRestoreTime   ]]
-- @return float
-- @param level int
function CDOTA_Ability_Lua:GetAbilityChargeRestoreTime( level ) end

---[[ GetAOERadius  Controls the size of the AOE casting cursor. ]]
-- @return float
function CDOTA_Ability_Lua:GetAOERadius(  ) end

---[[ GetAssociatedPrimaryAbilities  Returns abilities that are stolen simultaneously, or otherwise related in functionality. ]]
-- @return string
function CDOTA_Ability_Lua:GetAssociatedPrimaryAbilities(  ) end

---[[ GetAssociatedSecondaryAbilities  Returns other abilities that are stolen simultaneously, or otherwise related in functionality.  Generally hidden abilities. ]]
-- @return string
function CDOTA_Ability_Lua:GetAssociatedSecondaryAbilities(  ) end

---[[ GetBehavior  Return cast behavior type of this ability. ]]
-- @return DOTA_ABILITY_BEHAVIOR
function CDOTA_Ability_Lua:GetBehavior(  ) end

---[[ GetCastAnimation  Return casting animation of this ability. ]]
-- @return GameActivity_t
function CDOTA_Ability_Lua:GetCastAnimation(  ) end

---[[ GetCastPoint  Return cast point of this ability. ]]
-- @return float
function CDOTA_Ability_Lua:GetCastPoint(  ) end

---[[ GetCastRange  Return cast range of this ability. ]]
-- @return int
-- @param location Vector
-- @param target CDOTA_BaseNPC
function CDOTA_Ability_Lua:GetCastRange( location, target ) end

---[[ GetCastRangeBonus   ]]
-- @return int
-- @param target handle
-- @param pseudoCastRange int
function CDOTA_Ability_Lua:GetCastRangeBonus( target, pseudoCastRange ) end

---[[ GetChannelAnimation  Return channel animation of this ability. ]]
-- @return GameActivity_t
function CDOTA_Ability_Lua:GetChannelAnimation(  ) end

---[[ GetChannelledHealthCostPerSecond  Return health cost per second of channeling at the given level (-1 is current). ]]
-- @return int
-- @param level int
function CDOTA_Ability_Lua:GetChannelledHealthCostPerSecond( level ) end

---[[ GetChannelledManaCostPerSecond  Return mana cost at the given level per second while channeling (-1 is current). ]]
-- @return int
-- @param level int
function CDOTA_Ability_Lua:GetChannelledManaCostPerSecond( level ) end

---[[ GetChannelStartTime  Return the channel start time of this ability. ]]
-- @return float
function CDOTA_Ability_Lua:GetChannelStartTime(  ) end

---[[ GetChannelTime  Return the channel time of this ability. ]]
-- @return float
function CDOTA_Ability_Lua:GetChannelTime(  ) end

---[[ GetConceptRecipientType  Return who hears speech when this spell is cast. ]]
-- @return int
function CDOTA_Ability_Lua:GetConceptRecipientType(  ) end

---[[ GetCooldown  Return cooldown of this ability. ]]
-- @return float
-- @param level int
function CDOTA_Ability_Lua:GetCooldown( level ) end

---[[ GetCustomCastError  Return the error string of a failed command with no target. ]]
-- @return string
function CDOTA_Ability_Lua:GetCustomCastError(  ) end

---[[ GetCustomCastErrorLocation  Return the error string of a failed command on a location. ]]
-- @return string
-- @param location Vector
function CDOTA_Ability_Lua:GetCustomCastErrorLocation( location ) end

---[[ GetCustomCastErrorTarget  Return the error string of a failed command on a target. ]]
-- @return string
-- @param target CDOTA_BaseNPC
function CDOTA_Ability_Lua:GetCustomCastErrorTarget( target ) end

---[[ GetCustomHudErrorMessage  (DOTA_INVALID_ORDERS nReason) Return the error string of a failed order. ]]
-- @return string
-- @param reason int
function CDOTA_Ability_Lua:GetCustomHudErrorMessage( reason ) end

---[[ GetEffectiveCastRange  Return cast range of this ability, accounting for modifiers. ]]
-- @return int
-- @param location Vector
-- @param target handle
function CDOTA_Ability_Lua:GetEffectiveCastRange( location, target ) end

---[[ GetGoldCost  Return gold cost at the given level (-1 is current). ]]
-- @return int
-- @param level int
function CDOTA_Ability_Lua:GetGoldCost( level ) end

---[[ GetHealthCost  Return health cost at the given level (-1 is current). ]]
-- @return int
-- @param level int
function CDOTA_Ability_Lua:GetHealthCost( level ) end

---[[ GetIntrinsicModifierName  Returns the name of the modifier applied passively by this ability. ]]
-- @return string
function CDOTA_Ability_Lua:GetIntrinsicModifierName(  ) end

---[[ GetManaCost  Return mana cost at the given level (-1 is current). ]]
-- @return int
-- @param level int
function CDOTA_Ability_Lua:GetManaCost( level ) end

---[[ GetPlaybackRateOverride  Return the animation rate of the cast animation. ]]
-- @return float
function CDOTA_Ability_Lua:GetPlaybackRateOverride(  ) end

---[[ IsAttributeBonus  Is this ability an Attribute Bonus. ]]
-- @return bool
function CDOTA_Ability_Lua:IsAttributeBonus(  ) end

---[[ IsCosmetic  Is this a cosmetic only ability? ]]
-- @return bool
-- @param entity handle
function CDOTA_Ability_Lua:IsCosmetic( entity ) end

---[[ IsHiddenAbilityCastable  Returns true if this ability can be used when not on the action panel. ]]
-- @return bool
function CDOTA_Ability_Lua:IsHiddenAbilityCastable(  ) end

---[[ IsHiddenWhenStolen  Returns true if this ability is hidden when stolen by Spell Steal. ]]
-- @return bool
function CDOTA_Ability_Lua:IsHiddenWhenStolen(  ) end

---[[ IsRefreshable  Returns true if this ability is refreshed by Refresher Orb. ]]
-- @return bool
function CDOTA_Ability_Lua:IsRefreshable(  ) end

---[[ IsStealable  Returns true if this ability can be stolen by Spell Steal. ]]
-- @return bool
function CDOTA_Ability_Lua:IsStealable(  ) end

---[[ OnAbilityPhaseInterrupted  Cast time did not complete successfully. ]]
-- @return nil
function CDOTA_Ability_Lua:OnAbilityPhaseInterrupted(  ) end

---[[ OnAbilityPhaseStart  Cast time begins (return true for successful cast). ]]
-- @return bool
function CDOTA_Ability_Lua:OnAbilityPhaseStart(  ) end

---[[ OnAbilityPinged  The ability was pinged. ]]
-- @return nil
-- @param playerId PlayerID
-- @param ctrlHeld bool
function CDOTA_Ability_Lua:OnAbilityPinged( playerId, ctrlHeld ) end

---[[ OnAbilityUpgrade   ]]
-- @return nil
-- @param upgradeAbility handle
function CDOTA_Ability_Lua:OnAbilityUpgrade( upgradeAbility ) end

---[[ OnChannelFinish  Channel finished. ]]
-- @return nil
-- @param interrupted bool
function CDOTA_Ability_Lua:OnChannelFinish( interrupted ) end

---[[ OnChannelThink  Channeling is taking place. ]]
-- @return nil
-- @param interval float
function CDOTA_Ability_Lua:OnChannelThink( interval ) end

---[[ OnHeroCalculateStatBonus  Caster (hero only) gained a level, skilled an ability, or received a new stat bonus. ]]
-- @return nil
function CDOTA_Ability_Lua:OnHeroCalculateStatBonus(  ) end

---[[ OnHeroDiedNearby  A hero has died in the vicinity (ie Urn), takes table of params. ]]
-- @return nil
-- @param unit CDOTA_BaseNPC
-- @param attacker CDOTA_BaseNPC
-- @param event table
function CDOTA_Ability_Lua:OnHeroDiedNearby( unit, attacker, event ) end

---[[ OnHeroLevelUp  Caster gained a level. ]]
-- @return nil
function CDOTA_Ability_Lua:OnHeroLevelUp(  ) end

---[[ OnInventoryContentsChanged  Caster inventory changed. ]]
-- @return nil
function CDOTA_Ability_Lua:OnInventoryContentsChanged(  ) end

---[[ OnItemEquipped  Caster equipped item. ]]
-- @return nil
-- @param item CDOTA_Item
function CDOTA_Ability_Lua:OnItemEquipped( item ) end

---[[ OnOwnerDied  Caster died. ]]
-- @return nil
function CDOTA_Ability_Lua:OnOwnerDied(  ) end

---[[ OnOwnerSpawned  Caster respawned or spawned for the first time. ]]
-- @return nil
function CDOTA_Ability_Lua:OnOwnerSpawned(  ) end

---[[ OnProjectileHit  Projectile has collided with a given target or reached its destination. If 'true` is returned, projectile would be destroyed. ]]
-- @return bool
-- @param target CDOTA_BaseNPC
-- @param location Vector
function CDOTA_Ability_Lua:OnProjectileHit( target, location ) end

---[[ OnProjectileHit_ExtraData  Projectile has collided with a given target or reached its destination. If 'true` is returned, projectile would be destroyed. ]]
-- @return bool
-- @param target CDOTA_BaseNPC
-- @param location Vector
-- @param extraData table
function CDOTA_Ability_Lua:OnProjectileHit_ExtraData( target, location, extraData ) end

---[[ OnProjectileHitHandle  Projectile has collided with a given target or reached its destination. If 'true` is returned, projectile would be destroyed. ]]
-- @return bool
-- @param target CDOTA_BaseNPC
-- @param location Vector
-- @param projectileHandle ProjectileID
function CDOTA_Ability_Lua:OnProjectileHitHandle( target, location, projectileHandle ) end

---[[ OnProjectileThink  Projectile is actively moving. ]]
-- @return nil
-- @param location Vector
function CDOTA_Ability_Lua:OnProjectileThink( location ) end

---[[ OnProjectileThink_ExtraData  Projectile is actively moving. ]]
-- @return nil
-- @param location Vector
-- @param extraData table
function CDOTA_Ability_Lua:OnProjectileThink_ExtraData( location, extraData ) end

---[[ OnProjectileThinkHandle  Projectile is actively moving. ]]
-- @return nil
-- @param projectileHandle ProjectileID
function CDOTA_Ability_Lua:OnProjectileThinkHandle( projectileHandle ) end

---[[ OnSpellStart  Cast time finished, spell effects begin. ]]
-- @return nil
function CDOTA_Ability_Lua:OnSpellStart(  ) end

---[[ OnStolen  Special behavior when stolen by Spell Steal. ]]
-- @return nil
-- @param sourceAbility CDOTABaseAbility
function CDOTA_Ability_Lua:OnStolen( sourceAbility ) end

---[[ OnToggle  Ability is toggled on/off. ]]
-- @return nil
function CDOTA_Ability_Lua:OnToggle(  ) end

---[[ OnUnStolen  Special behavior when lost by Spell Steal. ]]
-- @return nil
function CDOTA_Ability_Lua:OnUnStolen(  ) end

---[[ OnUpgrade  Ability gained a level. ]]
-- @return nil
function CDOTA_Ability_Lua:OnUpgrade(  ) end

---[[ OtherAbilitiesAlwaysInterruptChanneling   ]]
-- @return bool
function CDOTA_Ability_Lua:OtherAbilitiesAlwaysInterruptChanneling(  ) end

---[[ ProcsMagicStick  Returns true if this ability will generate magic stick charges for nearby enemies. ]]
-- @return bool
function CDOTA_Ability_Lua:ProcsMagicStick(  ) end

---[[ RequiresFacing  Does this ability need the caster to face the target before executing? ]]
-- @return bool
function CDOTA_Ability_Lua:RequiresFacing(  ) end

---[[ ResetToggleOnRespawn  Returns true if this ability should return to the default toggle state when its parent respawns. ]]
-- @return bool
function CDOTA_Ability_Lua:ResetToggleOnRespawn(  ) end

---[[ SpeakTrigger  Return the type of speech used. ]]
-- @return int
function CDOTA_Ability_Lua:SpeakTrigger(  ) end

---[[ Init  Called first when ability entity is created. ]]
-- @return nil
function CDOTA_Ability_Lua:Init(  ) end

---[[ Precache   ]]
-- @return nil
-- @param context CScriptPrecacheContext
function CDOTA_Ability_Lua:Precache( context ) end

---[[ Spawn  Called when ability entity is created, after Init. ]]
-- @return nil
function CDOTA_Ability_Lua:Spawn(  ) end

---[[ SetPlaybackRate  Override playbackrate. ]]
-- @return nil
-- @param rate float
function CDOTA_Ability_Nian_Dive:SetPlaybackRate( rate ) end

---[[ SetPlaybackRate  Override playbackrate. ]]
-- @return nil
-- @param rate float
function CDOTA_Ability_Nian_Leap:SetPlaybackRate( rate ) end

---[[ GetCastCount  Number of times Nian has used the roar. ]]
-- @return int
function CDOTA_Ability_Nian_Roar:GetCastCount(  ) end

---[[ AddAbility  Add an ability to this unit by name. ]]
-- @return CDOTABaseAbility
-- @param abilityName string
function CDOTA_BaseNPC:AddAbility( abilityName ) end

---[[ AddActivityModifier  Add an activity modifier that affects future StartGesture calls. ]]
-- @return nil
-- @param name string
function CDOTA_BaseNPC:AddActivityModifier( name ) end

---[[ AddItem  Add an item to this unit's inventory. ]]
-- @return CDOTA_Item
-- @param item CDOTA_Item
function CDOTA_BaseNPC:AddItem( item ) end

---[[ AddItemByName  Add an item to this unit's inventory. ]]
-- @return CDOTA_Item
-- @param itemName string
function CDOTA_BaseNPC:AddItemByName( itemName ) end

---[[ AddNewModifier  Add a modifier to this unit. ]]
-- @return CDOTA_Buff
-- @param caster CDOTA_BaseNPC
-- @param ability CDOTABaseAbility
-- @param modifierName string
-- @param modifierTable table
function CDOTA_BaseNPC:AddNewModifier( caster, ability, modifierName, modifierTable ) end

---[[ AddNoDraw  Adds the no draw flag. ]]
-- @return nil
function CDOTA_BaseNPC:AddNoDraw(  ) end

---[[ AddSpeechBubble  Add a speech bubble(1-4 live at a time) to this NPC. ]]
-- @return nil
-- @param bubble int
-- @param speech string
-- @param duration float
-- @param unOffsetX uint
-- @param unOffsetY uint
function CDOTA_BaseNPC:AddSpeechBubble( bubble, speech, duration, unOffsetX, unOffsetY ) end

---[[ AlertNearbyUnits   ]]
-- @return nil
-- @param attacker CDOTA_BaseNPC
-- @param ability CDOTABaseAbility
function CDOTA_BaseNPC:AlertNearbyUnits( attacker, ability ) end

---[[ AngerNearbyUnits   ]]
-- @return nil
function CDOTA_BaseNPC:AngerNearbyUnits(  ) end

---[[ AttackNoEarlierThan   ]]
-- @return nil
-- @param time float
-- @param timeDisparityTolerance float
function CDOTA_BaseNPC:AttackNoEarlierThan( time, timeDisparityTolerance ) end

---[[ AttackReady   ]]
-- @return bool
function CDOTA_BaseNPC:AttackReady(  ) end

---[[ BoundingRadius2D   ]]
-- @return float
function CDOTA_BaseNPC:BoundingRadius2D(  ) end

---[[ CalculateGenericBonuses   ]]
-- @return nil
function CDOTA_BaseNPC:CalculateGenericBonuses(  ) end

---[[ CanBeSeenByAnyOpposingTeam   ]]
-- @return bool
function CDOTA_BaseNPC:CanBeSeenByAnyOpposingTeam(  ) end

---[[ CanEntityBeSeenByMyTeam  Check FoW to see if an entity is visible. ]]
-- @return bool
-- @param entity CDOTA_BaseNPC
function CDOTA_BaseNPC:CanEntityBeSeenByMyTeam( entity ) end

---[[ CanSellItems  Query if this unit can sell items. ]]
-- @return bool
function CDOTA_BaseNPC:CanSellItems(  ) end

---[[ CastAbilityImmediately  Cast an ability immediately. ]]
-- @return nil
-- @param ability CDOTABaseAbility
-- @param playerIndex int
function CDOTA_BaseNPC:CastAbilityImmediately( ability, playerIndex ) end

---[[ CastAbilityNoTarget  Cast an ability with no target. ]]
-- @return nil
-- @param ability CDOTABaseAbility
-- @param playerIndex int
function CDOTA_BaseNPC:CastAbilityNoTarget( ability, playerIndex ) end

---[[ CastAbilityOnPosition  Cast an ability on a position. ]]
-- @return nil
-- @param position Vector
-- @param ability CDOTABaseAbility
-- @param playerIndex int
function CDOTA_BaseNPC:CastAbilityOnPosition( position, ability, playerIndex ) end

---[[ CastAbilityOnTarget  Cast an ability on a target entity. ]]
-- @return nil
-- @param target CDOTA_BaseNPC
-- @param ability CDOTABaseAbility
-- @param playerIndex int
function CDOTA_BaseNPC:CastAbilityOnTarget( target, ability, playerIndex ) end

---[[ CastAbilityToggle  Toggle an ability. ]]
-- @return nil
-- @param ability CDOTABaseAbility
-- @param playerIndex int
function CDOTA_BaseNPC:CastAbilityToggle( ability, playerIndex ) end

---[[ ChangeTeam   ]]
-- @return nil
-- @param teamNum int
function CDOTA_BaseNPC:ChangeTeam( teamNum ) end

---[[ ClearActivityModifiers  Clear Activity modifiers. ]]
-- @return nil
function CDOTA_BaseNPC:ClearActivityModifiers(  ) end

---[[ ConsumeItem  Consume the item, deleting it from the inventory and granting the hero the specified bonuses. ]]
-- @return nil
-- @param item handle
function CDOTA_BaseNPC:ConsumeItem( item ) end

---[[ DestroyAllSpeechBubbles   ]]
-- @return nil
function CDOTA_BaseNPC:DestroyAllSpeechBubbles(  ) end

---[[ DisassembleItem  Disassemble the passed item in this unit's inventory. ]]
-- @return nil
-- @param item CDOTA_Item
function CDOTA_BaseNPC:DisassembleItem( item ) end

---[[ DropItemAtPosition  Drop an item at a given point. ]]
-- @return nil
-- @param dest Vector
-- @param item CDOTA_Item
function CDOTA_BaseNPC:DropItemAtPosition( dest, item ) end

---[[ DropItemAtPositionImmediate  Immediately drop a carried item at a given position. ]]
-- @return nil
-- @param item CDOTA_Item
-- @param position Vector
function CDOTA_BaseNPC:DropItemAtPositionImmediate( item, position ) end

---[[ EjectItemFromStash  Drops the selected item out of this unit's stash. ]]
-- @return nil
-- @param item CDOTA_Item
function CDOTA_BaseNPC:EjectItemFromStash( item ) end

---[[ FaceTowards  This unit will be set to face the target point. ]]
-- @return nil
-- @param target Vector
function CDOTA_BaseNPC:FaceTowards( target ) end

---[[ FadeGesture  Fade and remove the given gesture activity. ]]
-- @return nil
-- @param activity GameActivity_t
function CDOTA_BaseNPC:FadeGesture( activity ) end

---[[ FindAbilityByName  Retrieve an ability by name from the unit. ]]
-- @return CDOTABaseAbility
-- @param abilityName string
function CDOTA_BaseNPC:FindAbilityByName( abilityName ) end

---[[ FindAllModifiers  Returns a table of all of the modifiers on the NPC. ]]
-- @return [object Object]
function CDOTA_BaseNPC:FindAllModifiers(  ) end

---[[ FindAllModifiersByName  Returns a table of all of the modifiers on the NPC with the passed name (modifierName). ]]
-- @return [object Object]
-- @param modifierName string
function CDOTA_BaseNPC:FindAllModifiersByName( modifierName ) end

---[[ FindItemInInventory  Get handle to first item in inventory, else nil. ]]
-- @return CDOTA_Item
-- @param itemName string
function CDOTA_BaseNPC:FindItemInInventory( itemName ) end

---[[ FindModifierByName  Return a handle to the modifier of the given name if found, else nil (string Name ). ]]
-- @return CDOTA_Buff
-- @param modifierName string
function CDOTA_BaseNPC:FindModifierByName( modifierName ) end

---[[ FindModifierByNameAndCaster  Return a handle to the modifier of the given name from the passed caster if found, else nil. ]]
-- @return CDOTA_Buff
-- @param modifierName string
-- @param caster CDOTA_BaseNPC
function CDOTA_BaseNPC:FindModifierByNameAndCaster( modifierName, caster ) end

---[[ ForceKill  Kill this unit immediately. ]]
-- @return nil
-- @param reincarnate bool
function CDOTA_BaseNPC:ForceKill( reincarnate ) end

---[[ ForcePlayActivityOnce  Play an activity once, and then go back to idle. ]]
-- @return nil
-- @param activity GameActivity_t
function CDOTA_BaseNPC:ForcePlayActivityOnce( activity ) end

---[[ GetAbilityByIndex  Retrieve an ability by index from the unit. ]]
-- @return CDOTABaseAbility
-- @param index int
function CDOTA_BaseNPC:GetAbilityByIndex( index ) end

---[[ GetAbilityCount   ]]
-- @return int
function CDOTA_BaseNPC:GetAbilityCount(  ) end

---[[ GetAcquisitionRange  Gets the range at which this unit will auto-acquire. ]]
-- @return float
function CDOTA_BaseNPC:GetAcquisitionRange(  ) end

---[[ GetAdditionalBattleMusicWeight  Combat involving this creature will have this weight added to the music calcuations. ]]
-- @return float
function CDOTA_BaseNPC:GetAdditionalBattleMusicWeight(  ) end

---[[ GetAggroTarget  Returns this unit's aggro target. ]]
-- @return CDOTA_BaseNPC
function CDOTA_BaseNPC:GetAggroTarget(  ) end

---[[ GetAttackAnimationPoint   ]]
-- @return float
function CDOTA_BaseNPC:GetAttackAnimationPoint(  ) end

---[[ GetAttackCapability   ]]
-- @return DOTAUnitAttackCapability_t
function CDOTA_BaseNPC:GetAttackCapability(  ) end

---[[ GetAttackDamage  Returns a random integer between the minimum and maximum base damage of the unit. ]]
-- @return int
function CDOTA_BaseNPC:GetAttackDamage(  ) end

---[[ GetAttackRangeBuffer  Gets the attack range buffer. ]]
-- @return float
function CDOTA_BaseNPC:GetAttackRangeBuffer(  ) end

---[[ GetAttackSpeed   ]]
-- @return float
-- @param ignoreTempAttackSpeed bool
function CDOTA_BaseNPC:GetAttackSpeed( ignoreTempAttackSpeed ) end

---[[ GetAttacksPerSecond   ]]
-- @return float
-- @param ignoreTempAttackSpeed bool
function CDOTA_BaseNPC:GetAttacksPerSecond( ignoreTempAttackSpeed ) end

---[[ GetAttackTarget   ]]
-- @return CDOTA_BaseNPC
function CDOTA_BaseNPC:GetAttackTarget(  ) end

---[[ GetAverageTrueAttackDamage  Returns the average value of the minimum and maximum damage values. ]]
-- @return int
-- @param target CDOTA_BaseNPC
function CDOTA_BaseNPC:GetAverageTrueAttackDamage( target ) end

---[[ GetBaseAttackRange   ]]
-- @return int
function CDOTA_BaseNPC:GetBaseAttackRange(  ) end

---[[ GetBaseAttackTime   ]]
-- @return float
function CDOTA_BaseNPC:GetBaseAttackTime(  ) end

---[[ GetBaseDamageMax  Get the maximum attack damage of this unit. ]]
-- @return int
function CDOTA_BaseNPC:GetBaseDamageMax(  ) end

---[[ GetBaseDamageMin  Get the minimum attack damage of this unit. ]]
-- @return int
function CDOTA_BaseNPC:GetBaseDamageMin(  ) end

---[[ GetBaseDayTimeVisionRange  Returns the vision range before modifiers. ]]
-- @return int
function CDOTA_BaseNPC:GetBaseDayTimeVisionRange(  ) end

---[[ GetBaseHealthBarOffset   ]]
-- @return int
function CDOTA_BaseNPC:GetBaseHealthBarOffset(  ) end

---[[ GetBaseHealthRegen   ]]
-- @return float
function CDOTA_BaseNPC:GetBaseHealthRegen(  ) end

---[[ GetBaseMagicalResistanceValue  Returns base magical armor value. ]]
-- @return float
function CDOTA_BaseNPC:GetBaseMagicalResistanceValue(  ) end

---[[ GetBaseMaxHealth  Gets the base max health value. ]]
-- @return float
function CDOTA_BaseNPC:GetBaseMaxHealth(  ) end

---[[ GetBaseMoveSpeed   ]]
-- @return float
function CDOTA_BaseNPC:GetBaseMoveSpeed(  ) end

---[[ GetBaseNightTimeVisionRange  Returns the vision range after modifiers. ]]
-- @return int
function CDOTA_BaseNPC:GetBaseNightTimeVisionRange(  ) end

---[[ GetBonusManaRegen  This Mana regen is derived from constant bonuses like Basilius. ]]
-- @return float
function CDOTA_BaseNPC:GetBonusManaRegen(  ) end

---[[ GetCastPoint   ]]
-- @return float
-- @param attack bool
function CDOTA_BaseNPC:GetCastPoint( attack ) end

---[[ GetCastRangeBonus   ]]
-- @return float
function CDOTA_BaseNPC:GetCastRangeBonus(  ) end

---[[ GetCloneSource  Get clone source (Meepo Prime, if this is a Meepo). ]]
-- @return CDOTA_BaseNPC
function CDOTA_BaseNPC:GetCloneSource(  ) end

---[[ GetCollisionPadding  Returns the size of the collision padding around the hull. ]]
-- @return float
function CDOTA_BaseNPC:GetCollisionPadding(  ) end

---[[ GetCooldownReduction   ]]
-- @return float
function CDOTA_BaseNPC:GetCooldownReduction(  ) end

---[[ GetCreationTime   ]]
-- @return float
function CDOTA_BaseNPC:GetCreationTime(  ) end

---[[ GetCurrentActiveAbility  Get the ability this unit is currently casting. ]]
-- @return CDOTABaseAbility
function CDOTA_BaseNPC:GetCurrentActiveAbility(  ) end

---[[ GetCurrentVisionRange  Gets the current vision range. ]]
-- @return int
function CDOTA_BaseNPC:GetCurrentVisionRange(  ) end

---[[ GetCursorCastTarget   ]]
-- @return CDOTA_BaseNPC
function CDOTA_BaseNPC:GetCursorCastTarget(  ) end

---[[ GetCursorPosition   ]]
-- @return Vector
function CDOTA_BaseNPC:GetCursorPosition(  ) end

---[[ GetCursorTargetingNothing   ]]
-- @return bool
function CDOTA_BaseNPC:GetCursorTargetingNothing(  ) end

---[[ GetDamageMax  Get the maximum attack damage of this unit. ]]
-- @return int
function CDOTA_BaseNPC:GetDamageMax(  ) end

---[[ GetDamageMin  Get the minimum attack damage of this unit. ]]
-- @return int
function CDOTA_BaseNPC:GetDamageMin(  ) end

---[[ GetDayTimeVisionRange  Returns the vision range after modifiers. ]]
-- @return int
function CDOTA_BaseNPC:GetDayTimeVisionRange(  ) end

---[[ GetDeathXP  Get the XP bounty on this unit. ]]
-- @return int
function CDOTA_BaseNPC:GetDeathXP(  ) end

---[[ GetDisplayAttackSpeed  Attack speed expressed as constant value. ]]
-- @return float
function CDOTA_BaseNPC:GetDisplayAttackSpeed(  ) end

---[[ GetEvasion   ]]
-- @return float
function CDOTA_BaseNPC:GetEvasion(  ) end

---[[ GetForceAttackTarget   ]]
-- @return CDOTA_BaseNPC
function CDOTA_BaseNPC:GetForceAttackTarget(  ) end

---[[ GetGoldBounty  Get the gold bounty on this unit. ]]
-- @return int
function CDOTA_BaseNPC:GetGoldBounty(  ) end

---[[ GetHasteFactor   ]]
-- @return float
function CDOTA_BaseNPC:GetHasteFactor(  ) end

---[[ GetHealthDeficit  Returns integer amount of health missing from max. ]]
-- @return int
function CDOTA_BaseNPC:GetHealthDeficit(  ) end

---[[ GetHealthPercent  Get the current health percent of the unit. ]]
-- @return int
function CDOTA_BaseNPC:GetHealthPercent(  ) end

---[[ GetHealthRegen   ]]
-- @return float
function CDOTA_BaseNPC:GetHealthRegen(  ) end

---[[ GetHullRadius  Get the collision hull radius of this NPC. ]]
-- @return float
function CDOTA_BaseNPC:GetHullRadius(  ) end

---[[ GetIdealSpeed  Returns speed after all modifiers. ]]
-- @return float
function CDOTA_BaseNPC:GetIdealSpeed(  ) end

---[[ GetIdealSpeedNoSlows  Returns speed after all modifiers, but excluding those that reduce speed. ]]
-- @return float
function CDOTA_BaseNPC:GetIdealSpeedNoSlows(  ) end

---[[ GetIncreasedAttackSpeed   ]]
-- @return float
-- @param ignoreTempAttackSpeed bool
function CDOTA_BaseNPC:GetIncreasedAttackSpeed( ignoreTempAttackSpeed ) end

---[[ GetInitialGoalEntity  Returns the initial waypoint goal for this NPC. ]]
-- @return CBaseEntity
function CDOTA_BaseNPC:GetInitialGoalEntity(  ) end

---[[ GetInitialGoalPosition  Get waypoint position for this NPC. ]]
-- @return Vector
function CDOTA_BaseNPC:GetInitialGoalPosition(  ) end

---[[ GetItemInSlot  Returns nth item in inventory slot (index is zero based). ]]
-- @return CDOTA_Item
-- @param slot int
function CDOTA_BaseNPC:GetItemInSlot( slot ) end

---[[ GetLastAttackTime   ]]
-- @return float
function CDOTA_BaseNPC:GetLastAttackTime(  ) end

---[[ GetLastDamageTime  Get the last time this NPC took damage. ]]
-- @return float
function CDOTA_BaseNPC:GetLastDamageTime(  ) end

---[[ GetLastIdleChangeTime  Get the last game time that this unit switched to/from idle state. ]]
-- @return float
function CDOTA_BaseNPC:GetLastIdleChangeTime(  ) end

---[[ GetLevel  Returns the level of this unit. ]]
-- @return int
function CDOTA_BaseNPC:GetLevel(  ) end

---[[ GetMainControllingPlayer  Returns the player ID of the controlling player. ]]
-- @return int
function CDOTA_BaseNPC:GetMainControllingPlayer(  ) end

---[[ GetMana  Get the mana on this unit. ]]
-- @return float
function CDOTA_BaseNPC:GetMana(  ) end

---[[ GetManaPercent  Get the percent of mana remaining. ]]
-- @return int
function CDOTA_BaseNPC:GetManaPercent(  ) end

---[[ GetManaRegen   ]]
-- @return float
function CDOTA_BaseNPC:GetManaRegen(  ) end

---[[ GetMaximumGoldBounty  Get the maximum gold bounty for this unit. ]]
-- @return int
function CDOTA_BaseNPC:GetMaximumGoldBounty(  ) end

---[[ GetMaxMana  Get the maximum mana of this unit. ]]
-- @return float
function CDOTA_BaseNPC:GetMaxMana(  ) end

---[[ GetMinimumGoldBounty  Get the minimum gold bounty for this unit. ]]
-- @return int
function CDOTA_BaseNPC:GetMinimumGoldBounty(  ) end

---[[ GetModelRadius   ]]
-- @return float
function CDOTA_BaseNPC:GetModelRadius(  ) end

---[[ GetModifierCount  How many modifiers does this unit have? ]]
-- @return int
function CDOTA_BaseNPC:GetModifierCount(  ) end

---[[ GetModifierNameByIndex  Get a modifier name by index. ]]
-- @return string
-- @param index int
function CDOTA_BaseNPC:GetModifierNameByIndex( index ) end

---[[ GetModifierStackCount  Gets the stack count of a given modifier. ]]
-- @return int
-- @param modifierName string
-- @param caster CDOTA_BaseNPC
function CDOTA_BaseNPC:GetModifierStackCount( modifierName, caster ) end

---[[ GetMoveSpeedModifier   ]]
-- @return float
-- @param baseSpeed float
-- @param returnUnslowed bool
function CDOTA_BaseNPC:GetMoveSpeedModifier( baseSpeed, returnUnslowed ) end

---[[ GetMustReachEachGoalEntity  Set whether this NPC is required to reach each goal entity, rather than being allowed to unkink their path. ]]
-- @return bool
function CDOTA_BaseNPC:GetMustReachEachGoalEntity(  ) end

---[[ GetNeutralSpawnerName  Get the name of this camp's neutral spawner. ]]
-- @return string
function CDOTA_BaseNPC:GetNeutralSpawnerName(  ) end

---[[ GetNeverMoveToClearSpace  If set to true, we will never attempt to move this unit to clear space, even when it unphases. ]]
-- @return bool
function CDOTA_BaseNPC:GetNeverMoveToClearSpace(  ) end

---[[ GetNightTimeVisionRange  Returns the vision range after modifiers. ]]
-- @return int
function CDOTA_BaseNPC:GetNightTimeVisionRange(  ) end

---[[ GetOpposingTeamNumber   ]]
-- @return DOTATeam_t
function CDOTA_BaseNPC:GetOpposingTeamNumber(  ) end

---[[ GetPaddedCollisionRadius  Get the collision hull radius (including padding) of this NPC. ]]
-- @return float
function CDOTA_BaseNPC:GetPaddedCollisionRadius(  ) end

---[[ GetPhysicalArmorBaseValue  Returns base physical armor value. ]]
-- @return float
function CDOTA_BaseNPC:GetPhysicalArmorBaseValue(  ) end

---[[ GetPhysicalArmorValue  Returns current physical armor value. ]]
-- @return float
-- @param ignoreBase bool
function CDOTA_BaseNPC:GetPhysicalArmorValue( ignoreBase ) end

---[[ GetPlayerOwner  Returns the player that owns this unit. ]]
-- @return CDOTAPlayerController
function CDOTA_BaseNPC:GetPlayerOwner(  ) end

---[[ GetPlayerOwnerID  Get the owner player ID for this unit. ]]
-- @return PlayerID
function CDOTA_BaseNPC:GetPlayerOwnerID(  ) end

---[[ GetProjectileSpeed   ]]
-- @return int
function CDOTA_BaseNPC:GetProjectileSpeed(  ) end

---[[ GetRangedProjectileName   ]]
-- @return string
function CDOTA_BaseNPC:GetRangedProjectileName(  ) end

---[[ GetRangeToUnit   ]]
-- @return float
-- @param npc CDOTA_BaseNPC
function CDOTA_BaseNPC:GetRangeToUnit( npc ) end

---[[ GetRemainingPathLength   ]]
-- @return float
function CDOTA_BaseNPC:GetRemainingPathLength(  ) end

---[[ GetSecondsPerAttack   ]]
-- @return float
-- @param ignoreTempAttackSpeed bool
function CDOTA_BaseNPC:GetSecondsPerAttack( ignoreTempAttackSpeed ) end

---[[ GetSpellAmplification   ]]
-- @return float
-- @param baseOnly bool
function CDOTA_BaseNPC:GetSpellAmplification( baseOnly ) end

---[[ GetStatusResistance   ]]
-- @return float
function CDOTA_BaseNPC:GetStatusResistance(  ) end

---[[ GetTotalPurchasedUpgradeGoldCost  Get how much gold has been spent on ability upgrades. ]]
-- @return int
function CDOTA_BaseNPC:GetTotalPurchasedUpgradeGoldCost(  ) end

---[[ GetUnitLabel   ]]
-- @return string
function CDOTA_BaseNPC:GetUnitLabel(  ) end

---[[ GetUnitName  Get the name of this unit. ]]
-- @return string
function CDOTA_BaseNPC:GetUnitName(  ) end

---[[ GiveMana  Give mana to this unit, this can be used for mana gained by abilities or item usage. ]]
-- @return nil
-- @param mana float
function CDOTA_BaseNPC:GiveMana( mana ) end

---[[ HasAbility  See whether this unit has an ability by name. ]]
-- @return bool
-- @param abilityName string
function CDOTA_BaseNPC:HasAbility( abilityName ) end

---[[ HasAnyActiveAbilities   ]]
-- @return bool
function CDOTA_BaseNPC:HasAnyActiveAbilities(  ) end

---[[ HasAttackCapability   ]]
-- @return bool
function CDOTA_BaseNPC:HasAttackCapability(  ) end

---[[ HasFlyingVision   ]]
-- @return bool
function CDOTA_BaseNPC:HasFlyingVision(  ) end

---[[ HasFlyMovementCapability   ]]
-- @return bool
function CDOTA_BaseNPC:HasFlyMovementCapability(  ) end

---[[ HasGroundMovementCapability   ]]
-- @return bool
function CDOTA_BaseNPC:HasGroundMovementCapability(  ) end

---[[ HasInventory  Does this unit have an inventory. ]]
-- @return bool
function CDOTA_BaseNPC:HasInventory(  ) end

---[[ HasItemInInventory  See whether this unit has an item by name. ]]
-- @return bool
-- @param itemName string
function CDOTA_BaseNPC:HasItemInInventory( itemName ) end

---[[ HasModifier  Sees if this unit has a given modifier. ]]
-- @return bool
-- @param scriptName string
function CDOTA_BaseNPC:HasModifier( scriptName ) end

---[[ HasMovementCapability   ]]
-- @return bool
function CDOTA_BaseNPC:HasMovementCapability(  ) end

---[[ HasScepter   ]]
-- @return bool
function CDOTA_BaseNPC:HasScepter(  ) end

---[[ Heal  Heal this unit. ]]
-- @return nil
-- @param amount float
-- @param inflictor CDOTABaseAbility
function CDOTA_BaseNPC:Heal( amount, inflictor ) end

---[[ HealWithParams  Heal this unit (with more parameters). ]]
-- @return nil
-- @param amount float
-- @param inflictor handle
-- @param lifesteal bool
-- @param amplify bool
-- @param source handle
-- @param spellLifesteal bool
function CDOTA_BaseNPC:HealWithParams( amount, inflictor, lifesteal, amplify, source, spellLifesteal ) end

---[[ Hold  Hold position. ]]
-- @return nil
function CDOTA_BaseNPC:Hold(  ) end

---[[ Interrupt   ]]
-- @return nil
function CDOTA_BaseNPC:Interrupt(  ) end

---[[ InterruptChannel   ]]
-- @return nil
function CDOTA_BaseNPC:InterruptChannel(  ) end

---[[ InterruptMotionControllers   ]]
-- @return nil
-- @param findClearSpace bool
function CDOTA_BaseNPC:InterruptMotionControllers( findClearSpace ) end

---[[ IsAlive  Is this unit alive? ]]
-- @return bool
function CDOTA_BaseNPC:IsAlive(  ) end

---[[ IsAncient  Is this unit an Ancient? ]]
-- @return bool
function CDOTA_BaseNPC:IsAncient(  ) end

---[[ IsAttackImmune   ]]
-- @return bool
function CDOTA_BaseNPC:IsAttackImmune(  ) end

---[[ IsAttacking   ]]
-- @return bool
function CDOTA_BaseNPC:IsAttacking(  ) end

---[[ IsAttackingEntity   ]]
-- @return bool
-- @param entity CDOTA_BaseNPC
function CDOTA_BaseNPC:IsAttackingEntity( entity ) end

---[[ IsBarracks  Is this unit a Barracks? ]]
-- @return bool
function CDOTA_BaseNPC:IsBarracks(  ) end

---[[ IsBlind   ]]
-- @return bool
function CDOTA_BaseNPC:IsBlind(  ) end

---[[ IsBlockDisabled   ]]
-- @return bool
function CDOTA_BaseNPC:IsBlockDisabled(  ) end

---[[ IsBoss  Is this unit a boss? ]]
-- @return bool
function CDOTA_BaseNPC:IsBoss(  ) end

---[[ IsBossCreature  Is this unit a Boss Creature? (used by custom games). ]]
-- @return bool
function CDOTA_BaseNPC:IsBossCreature(  ) end

---[[ IsBuilding  Is this unit a building? ]]
-- @return bool
function CDOTA_BaseNPC:IsBuilding(  ) end

---[[ IsChanneling  Is this unit currently channeling a spell? ]]
-- @return bool
function CDOTA_BaseNPC:IsChanneling(  ) end

---[[ IsClone  Is this unit a clone? (Meepo). ]]
-- @return bool
function CDOTA_BaseNPC:IsClone(  ) end

---[[ IsCommandRestricted   ]]
-- @return bool
function CDOTA_BaseNPC:IsCommandRestricted(  ) end

---[[ IsConsideredHero  Is this unit a considered a hero for targeting purposes? ]]
-- @return bool
function CDOTA_BaseNPC:IsConsideredHero(  ) end

---[[ IsControllableByAnyPlayer  Is this unit controlled by any non-bot player? ]]
-- @return bool
function CDOTA_BaseNPC:IsControllableByAnyPlayer(  ) end

---[[ IsCourier  Is this unit a courier? ]]
-- @return bool
function CDOTA_BaseNPC:IsCourier(  ) end

---[[ IsCreature  Is this a Creature type NPC? ]]
-- @return bool
function CDOTA_BaseNPC:IsCreature(  ) end

---[[ IsCreep  Is this unit a creep? ]]
-- @return bool
function CDOTA_BaseNPC:IsCreep(  ) end

---[[ IsCreepHero  Is this unit a creep hero? ]]
-- @return bool
function CDOTA_BaseNPC:IsCreepHero(  ) end

---[[ IsCurrentlyHorizontalMotionControlled   ]]
-- @return bool
function CDOTA_BaseNPC:IsCurrentlyHorizontalMotionControlled(  ) end

---[[ IsCurrentlyVerticalMotionControlled   ]]
-- @return bool
function CDOTA_BaseNPC:IsCurrentlyVerticalMotionControlled(  ) end

---[[ IsDebuffImmune   ]]
-- @return bool
function CDOTA_BaseNPC:IsDebuffImmune(  ) end

---[[ IsDisarmed   ]]
-- @return bool
function CDOTA_BaseNPC:IsDisarmed(  ) end

---[[ IsDominated   ]]
-- @return bool
function CDOTA_BaseNPC:IsDominated(  ) end

---[[ IsEvadeDisabled   ]]
-- @return bool
function CDOTA_BaseNPC:IsEvadeDisabled(  ) end

---[[ IsFeared   ]]
-- @return bool
function CDOTA_BaseNPC:IsFeared(  ) end

---[[ IsFort  Is this unit an Ancient? ]]
-- @return bool
function CDOTA_BaseNPC:IsFort(  ) end

---[[ IsFrozen   ]]
-- @return bool
function CDOTA_BaseNPC:IsFrozen(  ) end

---[[ IsHero  Is this a hero or hero illusion? ]]
-- @return bool
function CDOTA_BaseNPC:IsHero(  ) end

---[[ IsHeroWard  Is this a Hero Ward? ]]
-- @return bool
function CDOTA_BaseNPC:IsHeroWard(  ) end

---[[ IsHexed   ]]
-- @return bool
function CDOTA_BaseNPC:IsHexed(  ) end

---[[ IsIdle  Is this creature currently idle? ]]
-- @return bool
function CDOTA_BaseNPC:IsIdle(  ) end

---[[ IsIllusion   ]]
-- @return bool
function CDOTA_BaseNPC:IsIllusion(  ) end

---[[ IsInRangeOfShop  Ask whether this unit is in range of the specified shop. ]]
-- @return bool
-- @param shopType DOTA_SHOP_TYPE
-- @param physical bool
function CDOTA_BaseNPC:IsInRangeOfShop( shopType, physical ) end

---[[ IsInvisible   ]]
-- @return bool
function CDOTA_BaseNPC:IsInvisible(  ) end

---[[ IsInvulnerable   ]]
-- @return bool
function CDOTA_BaseNPC:IsInvulnerable(  ) end

---[[ IsLowAttackPriority   ]]
-- @return bool
function CDOTA_BaseNPC:IsLowAttackPriority(  ) end

---[[ IsMagicImmune   ]]
-- @return bool
function CDOTA_BaseNPC:IsMagicImmune(  ) end

---[[ IsMovementImpaired   ]]
-- @return bool
function CDOTA_BaseNPC:IsMovementImpaired(  ) end

---[[ IsMoving  Is this unit moving? ]]
-- @return bool
function CDOTA_BaseNPC:IsMoving(  ) end

---[[ IsMuted   ]]
-- @return bool
function CDOTA_BaseNPC:IsMuted(  ) end

---[[ IsNeutralUnitType  Is this a neutral? ]]
-- @return bool
function CDOTA_BaseNPC:IsNeutralUnitType(  ) end

---[[ IsNightmared   ]]
-- @return bool
function CDOTA_BaseNPC:IsNightmared(  ) end

---[[ IsOpposingTeam   ]]
-- @return bool
-- @param team DOTATeam_t
function CDOTA_BaseNPC:IsOpposingTeam( team ) end

---[[ IsOther  Is this unit a ward-type unit? ]]
-- @return bool
function CDOTA_BaseNPC:IsOther(  ) end

---[[ IsOutOfGame   ]]
-- @return bool
function CDOTA_BaseNPC:IsOutOfGame(  ) end

---[[ IsOwnedByAnyPlayer  Is this unit owned by any non-bot player? ]]
-- @return bool
function CDOTA_BaseNPC:IsOwnedByAnyPlayer(  ) end

---[[ IsPhantom  Is this a phantom unit? ]]
-- @return bool
function CDOTA_BaseNPC:IsPhantom(  ) end

---[[ IsPhantomBlocker   ]]
-- @return bool
function CDOTA_BaseNPC:IsPhantomBlocker(  ) end

---[[ IsPhased   ]]
-- @return bool
function CDOTA_BaseNPC:IsPhased(  ) end

---[[ IsPositionInRange   ]]
-- @return bool
-- @param position Vector
-- @param range float
function CDOTA_BaseNPC:IsPositionInRange( position, range ) end

---[[ IsRangedAttacker  Is this unit a ranged attacker? ]]
-- @return bool
function CDOTA_BaseNPC:IsRangedAttacker(  ) end

---[[ IsRealHero  Is this a real hero? ]]
-- @return bool
function CDOTA_BaseNPC:IsRealHero(  ) end

---[[ IsReincarnating   ]]
-- @return bool
function CDOTA_BaseNPC:IsReincarnating(  ) end

---[[ IsRooted   ]]
-- @return bool
function CDOTA_BaseNPC:IsRooted(  ) end

---[[ IsShrine  Is this a shrine? ]]
-- @return bool
function CDOTA_BaseNPC:IsShrine(  ) end

---[[ IsSilenced   ]]
-- @return bool
function CDOTA_BaseNPC:IsSilenced(  ) end

---[[ IsSpeciallyDeniable   ]]
-- @return bool
function CDOTA_BaseNPC:IsSpeciallyDeniable(  ) end

---[[ IsSpeciallyUndeniable   ]]
-- @return bool
function CDOTA_BaseNPC:IsSpeciallyUndeniable(  ) end

---[[ IsStrongIllusion   ]]
-- @return bool
function CDOTA_BaseNPC:IsStrongIllusion(  ) end

---[[ IsStunned   ]]
-- @return bool
function CDOTA_BaseNPC:IsStunned(  ) end

---[[ IsSummoned  Is this unit summoned? ]]
-- @return bool
function CDOTA_BaseNPC:IsSummoned(  ) end

---[[ IsTaunted   ]]
-- @return bool
function CDOTA_BaseNPC:IsTaunted(  ) end

---[[ IsTempestDouble   ]]
-- @return bool
function CDOTA_BaseNPC:IsTempestDouble(  ) end

---[[ IsTower  Is this a tower? ]]
-- @return bool
function CDOTA_BaseNPC:IsTower(  ) end

---[[ IsUnableToMiss   ]]
-- @return bool
function CDOTA_BaseNPC:IsUnableToMiss(  ) end

---[[ IsUnselectable   ]]
-- @return bool
function CDOTA_BaseNPC:IsUnselectable(  ) end

---[[ IsUntargetableFrom   ]]
-- @return bool
-- @param targettingSource handle
function CDOTA_BaseNPC:IsUntargetableFrom( targettingSource ) end

---[[ IsWard  Is this a Ward? ]]
-- @return bool
function CDOTA_BaseNPC:IsWard(  ) end

---[[ IsZombie  Is this entity an Undying Zombie? ]]
-- @return bool
function CDOTA_BaseNPC:IsZombie(  ) end

---[[ Kill  Kills this NPC, with the params Ability and Attacker. ]]
-- @return nil
-- @param ability CDOTABaseAbility
-- @param attacker CDOTA_BaseNPC
function CDOTA_BaseNPC:Kill( ability, attacker ) end

---[[ MakeIllusion   ]]
-- @return nil
function CDOTA_BaseNPC:MakeIllusion(  ) end

---[[ MakePhantomBlocker   ]]
-- @return nil
function CDOTA_BaseNPC:MakePhantomBlocker(  ) end

---[[ MakeVisibleDueToAttack   ]]
-- @return nil
-- @param team DOTATeam_t
-- @param radius float
function CDOTA_BaseNPC:MakeVisibleDueToAttack( team, radius ) end

---[[ MakeVisibleToTeam   ]]
-- @return nil
-- @param team DOTATeam_t
-- @param duration float
function CDOTA_BaseNPC:MakeVisibleToTeam( team, duration ) end

---[[ ManageModelChanges   ]]
-- @return nil
function CDOTA_BaseNPC:ManageModelChanges(  ) end

---[[ ModifyHealth  Sets the health to a specific value, with optional flags or inflictors. ]]
-- @return nil
-- @param desiredHealthValue int
-- @param ability CDOTABaseAbility
-- @param lethal bool
-- @param additionalFlags int
function CDOTA_BaseNPC:ModifyHealth( desiredHealthValue, ability, lethal, additionalFlags ) end

---[[ MoveToNPC  Move to follow a unit. ]]
-- @return nil
-- @param npc CDOTA_BaseNPC
function CDOTA_BaseNPC:MoveToNPC( npc ) end

---[[ MoveToNPCToGiveItem  Give an item to another unit. ]]
-- @return nil
-- @param npc CDOTA_BaseNPC
-- @param item CDOTA_Item
function CDOTA_BaseNPC:MoveToNPCToGiveItem( npc, item ) end

---[[ MoveToPosition  Issue a Move-To command. ]]
-- @return nil
-- @param dest Vector
function CDOTA_BaseNPC:MoveToPosition( dest ) end

---[[ MoveToPositionAggressive  Issue an Attack-Move-To command. ]]
-- @return nil
-- @param dest Vector
function CDOTA_BaseNPC:MoveToPositionAggressive( dest ) end

---[[ MoveToTargetToAttack  Move to a target to attack. ]]
-- @return nil
-- @param target CDOTA_BaseNPC
function CDOTA_BaseNPC:MoveToTargetToAttack( target ) end

---[[ NoHealthBar   ]]
-- @return bool
function CDOTA_BaseNPC:NoHealthBar(  ) end

---[[ NoTeamMoveTo   ]]
-- @return bool
function CDOTA_BaseNPC:NoTeamMoveTo(  ) end

---[[ NoTeamSelect   ]]
-- @return bool
function CDOTA_BaseNPC:NoTeamSelect(  ) end

---[[ NotifyWearablesOfModelChange   ]]
-- @return nil
-- @param originalModel bool
function CDOTA_BaseNPC:NotifyWearablesOfModelChange( originalModel ) end

---[[ NotOnMinimap   ]]
-- @return bool
function CDOTA_BaseNPC:NotOnMinimap(  ) end

---[[ NotOnMinimapForEnemies   ]]
-- @return bool
function CDOTA_BaseNPC:NotOnMinimapForEnemies(  ) end

---[[ NoUnitCollision   ]]
-- @return bool
function CDOTA_BaseNPC:NoUnitCollision(  ) end

---[[ OnCommandMoveToDirection  Tells the underlying AI to move in the given direction, skipping Dota orders. ]]
-- @return nil
-- @param pos Vector
function CDOTA_BaseNPC:OnCommandMoveToDirection( pos ) end

---[[ PassivesDisabled   ]]
-- @return bool
function CDOTA_BaseNPC:PassivesDisabled(  ) end

---[[ PatrolToPosition  Issue a Patrol-To command. ]]
-- @return nil
-- @param dest Vector
function CDOTA_BaseNPC:PatrolToPosition( dest ) end

---[[ PerformAttack  Performs an attack on a target. ]]
-- @return nil
-- @param target CDOTA_BaseNPC
-- @param useCastAttackOrb bool
-- @param processProcs bool
-- @param skipCooldown bool
-- @param ignoreInvis bool
-- @param useProjectile bool
-- @param fakeAttack bool
-- @param neverMiss bool
function CDOTA_BaseNPC:PerformAttack( target, useCastAttackOrb, processProcs, skipCooldown, ignoreInvis, useProjectile, fakeAttack, neverMiss ) end

---[[ PickupDroppedItem  Pick up a dropped item. ]]
-- @return nil
-- @param item CDOTA_Item
function CDOTA_BaseNPC:PickupDroppedItem( item ) end

---[[ PickupRune  Pick up a rune. ]]
-- @return nil
-- @param item CDOTA_Item
function CDOTA_BaseNPC:PickupRune( item ) end

---[[ PlayVCD  Play a VCD on the NPC. ]]
-- @return nil
-- @param vcd string
function CDOTA_BaseNPC:PlayVCD( vcd ) end

---[[ ProvidesVision   ]]
-- @return bool
function CDOTA_BaseNPC:ProvidesVision(  ) end

---[[ Purge   ]]
-- @return nil
-- @param removePositiveBuffs bool
-- @param removeDebuffs bool
-- @param frameOnly bool
-- @param removeStuns bool
-- @param removeExceptions bool
function CDOTA_BaseNPC:Purge( removePositiveBuffs, removeDebuffs, frameOnly, removeStuns, removeExceptions ) end

---[[ QueueConcept  Queue a response system concept with the TLK_DOTA_CUSTOM concept, after a delay. ]]
-- @return nil
-- @param delay float
-- @param criteriaTable handle
-- @param completionCallbackFn [object Object]
-- @param context table
-- @param callbackInfo table
function CDOTA_BaseNPC:QueueConcept( delay, criteriaTable, completionCallbackFn, context, callbackInfo ) end

---[[ QueueTeamConcept  Queue a response system concept with the TLK_DOTA_CUSTOM concept, after a delay, for the same team this speaker is on. ]]
-- @return nil
-- @param delay float
-- @param criteriaTable handle
-- @param completionCallbackFn [object Object]
-- @param context table
-- @param callbackInfo table
function CDOTA_BaseNPC:QueueTeamConcept( delay, criteriaTable, completionCallbackFn, context, callbackInfo ) end

---[[ QueueTeamConceptNoSpectators  Queue a response system concept with the TLK_DOTA_CUSTOM concept, after a delay, for the same team this speaker is on. Is not played for spectators. ]]
-- @return nil
-- @param delay float
-- @param criteriaTable handle
-- @param completionCallbackFn [object Object]
-- @param context table
-- @param callbackInfo table
function CDOTA_BaseNPC:QueueTeamConceptNoSpectators( delay, criteriaTable, completionCallbackFn, context, callbackInfo ) end

---[[ RemoveAbility  Remove an ability from this unit by name. ]]
-- @return nil
-- @param abilityName string
function CDOTA_BaseNPC:RemoveAbility( abilityName ) end

---[[ RemoveAbilityByHandle  Remove the passed ability from this unit. ]]
-- @return nil
-- @param ability CDOTABaseAbility
function CDOTA_BaseNPC:RemoveAbilityByHandle( ability ) end

---[[ RemoveAbilityFromIndexByName   ]]
-- @return nil
-- @param abilityName string
function CDOTA_BaseNPC:RemoveAbilityFromIndexByName( abilityName ) end

---[[ RemoveAllModifiers   ]]
-- @return nil
-- @param targets [object Object]
-- @param now bool
-- @param permanent bool
-- @param death bool
function CDOTA_BaseNPC:RemoveAllModifiers( targets, now, permanent, death ) end

---[[ RemoveAllModifiersOfName  Removes all copies of a modifier. ]]
-- @return nil
-- @param scriptName string
function CDOTA_BaseNPC:RemoveAllModifiersOfName( scriptName ) end

---[[ RemoveGesture  Remove the given gesture activity. ]]
-- @return nil
-- @param activity GameActivity_t
function CDOTA_BaseNPC:RemoveGesture( activity ) end

---[[ RemoveHorizontalMotionController   ]]
-- @return nil
-- @param buff CDOTA_Buff
function CDOTA_BaseNPC:RemoveHorizontalMotionController( buff ) end

---[[ RemoveItem  Removes the passed item from this unit's inventory and deletes it. ]]
-- @return nil
-- @param item CDOTA_Item
function CDOTA_BaseNPC:RemoveItem( item ) end

---[[ RemoveModifierByName  Removes a modifier. ]]
-- @return nil
-- @param scriptName string
function CDOTA_BaseNPC:RemoveModifierByName( scriptName ) end

---[[ RemoveModifierByNameAndCaster  Removes a modifier that was cast by the given caster. ]]
-- @return nil
-- @param scriptName string
-- @param caster CDOTA_BaseNPC
function CDOTA_BaseNPC:RemoveModifierByNameAndCaster( scriptName, caster ) end

---[[ RemoveNoDraw  Remove the no draw flag. ]]
-- @return nil
function CDOTA_BaseNPC:RemoveNoDraw(  ) end

---[[ RemoveVerticalMotionController   ]]
-- @return nil
-- @param buff CDOTA_Buff
function CDOTA_BaseNPC:RemoveVerticalMotionController( buff ) end

---[[ RespawnUnit  Respawns the target unit if it can be respawned. ]]
-- @return nil
function CDOTA_BaseNPC:RespawnUnit(  ) end

---[[ Script_GetAttackRange  Gets this unit's attack range after all modifiers. ]]
-- @return float
function CDOTA_BaseNPC:Script_GetAttackRange(  ) end

---[[ Script_GetMagicalArmorValue  Returns current magical armor value. ]]
-- @return float
-- @param inflictor handle
function CDOTA_BaseNPC:Script_GetMagicalArmorValue( inflictor ) end

---[[ Script_IsDeniable   ]]
-- @return bool
function CDOTA_BaseNPC:Script_IsDeniable(  ) end

---[[ Script_ReduceMana  Remove mana from this unit, this can be used for involuntary mana loss, not for mana that is spent. ]]
-- @return float
-- @param mana float
-- @param ability handle
function CDOTA_BaseNPC:Script_ReduceMana( mana, ability ) end

---[[ SellItem  Sells the passed item in this unit's inventory. ]]
-- @return nil
-- @param item CDOTA_Item
function CDOTA_BaseNPC:SellItem( item ) end

---[[ SetAbilityByIndex  Set the ability by index. ]]
-- @return nil
-- @param ability CDOTABaseAbility
-- @param index int
function CDOTA_BaseNPC:SetAbilityByIndex( ability, index ) end

---[[ SetAcquisitionRange   ]]
-- @return nil
-- @param range int
function CDOTA_BaseNPC:SetAcquisitionRange( range ) end

---[[ SetAdditionalBattleMusicWeight  Combat involving this creature will have this weight added to the music calcuations. ]]
-- @return nil
-- @param weight float
function CDOTA_BaseNPC:SetAdditionalBattleMusicWeight( weight ) end

---[[ SetAggroTarget  Set this unit's aggro target to a specified unit. ]]
-- @return nil
-- @param aggroTarget CDOTA_BaseNPC
function CDOTA_BaseNPC:SetAggroTarget( aggroTarget ) end

---[[ SetAttackCapability   ]]
-- @return nil
-- @param attackCapabilities DOTAUnitAttackCapability_t
function CDOTA_BaseNPC:SetAttackCapability( attackCapabilities ) end

---[[ SetAttacking   ]]
-- @return nil
-- @param attackTarget CDOTA_BaseNPC
function CDOTA_BaseNPC:SetAttacking( attackTarget ) end

---[[ SetBaseAttackTime   ]]
-- @return nil
-- @param baseAttackTime float
function CDOTA_BaseNPC:SetBaseAttackTime( baseAttackTime ) end

---[[ SetBaseDamageMax  Sets the maximum base damage. ]]
-- @return nil
-- @param max int
function CDOTA_BaseNPC:SetBaseDamageMax( max ) end

---[[ SetBaseDamageMin  Sets the minimum base damage. ]]
-- @return nil
-- @param min int
function CDOTA_BaseNPC:SetBaseDamageMin( min ) end

---[[ SetBaseHealthRegen   ]]
-- @return nil
-- @param healthRegen float
function CDOTA_BaseNPC:SetBaseHealthRegen( healthRegen ) end

---[[ SetBaseMagicalResistanceValue  Sets base magical armor value. ]]
-- @return nil
-- @param magicalResistanceValue float
function CDOTA_BaseNPC:SetBaseMagicalResistanceValue( magicalResistanceValue ) end

---[[ SetBaseManaRegen   ]]
-- @return nil
-- @param manaRegen float
function CDOTA_BaseNPC:SetBaseManaRegen( manaRegen ) end

---[[ SetBaseMaxHealth  Set a new base max health value. ]]
-- @return nil
-- @param baseMaxHealth float
function CDOTA_BaseNPC:SetBaseMaxHealth( baseMaxHealth ) end

---[[ SetBaseMoveSpeed   ]]
-- @return nil
-- @param moveSpeed int
function CDOTA_BaseNPC:SetBaseMoveSpeed( moveSpeed ) end

---[[ SetCanSellItems  Set whether or not this unit is allowed to sell items (bCanSellItems). ]]
-- @return nil
-- @param canSell bool
function CDOTA_BaseNPC:SetCanSellItems( canSell ) end

---[[ SetControllableByAllPlayers  Set this unit controllable by all players. ]]
-- @return nil
-- @param controllableByAllPlayers bool
function CDOTA_BaseNPC:SetControllableByAllPlayers( controllableByAllPlayers ) end

---[[ SetControllableByPlayer  Set this unit controllable by the player with the passed ID. ]]
-- @return nil
-- @param playerId PlayerID
-- @param skipAdjustingPosition bool
function CDOTA_BaseNPC:SetControllableByPlayer( playerId, skipAdjustingPosition ) end

---[[ SetCursorCastTarget   ]]
-- @return nil
-- @param entity CDOTA_BaseNPC
function CDOTA_BaseNPC:SetCursorCastTarget( entity ) end

---[[ SetCursorPosition   ]]
-- @return nil
-- @param location Vector
function CDOTA_BaseNPC:SetCursorPosition( location ) end

---[[ SetCursorTargetingNothing   ]]
-- @return nil
-- @param targetingNothing bool
function CDOTA_BaseNPC:SetCursorTargetingNothing( targetingNothing ) end

---[[ SetCustomHealthLabel   ]]
-- @return nil
-- @param label string
-- @param r int
-- @param g int
-- @param b int
function CDOTA_BaseNPC:SetCustomHealthLabel( label, r, g, b ) end

---[[ SetDayTimeVisionRange  Set the base vision range. ]]
-- @return nil
-- @param range int
function CDOTA_BaseNPC:SetDayTimeVisionRange( range ) end

---[[ SetDeathXP  Set the XP bounty on this unit. ]]
-- @return nil
-- @param xpBounty int
function CDOTA_BaseNPC:SetDeathXP( xpBounty ) end

---[[ SetFollowRange   ]]
-- @return nil
-- @param followRange float
function CDOTA_BaseNPC:SetFollowRange( followRange ) end

---[[ SetForceAttackTarget   ]]
-- @return nil
-- @param npc CDOTA_BaseNPC
function CDOTA_BaseNPC:SetForceAttackTarget( npc ) end

---[[ SetForceAttackTargetAlly   ]]
-- @return nil
-- @param npc CDOTA_BaseNPC
function CDOTA_BaseNPC:SetForceAttackTargetAlly( npc ) end

---[[ SetHasInventory  Set if this unit has an inventory. ]]
-- @return nil
-- @param hasInventory bool
function CDOTA_BaseNPC:SetHasInventory( hasInventory ) end

---[[ SetHealthBarOffsetOverride   ]]
-- @return nil
-- @param offset int
function CDOTA_BaseNPC:SetHealthBarOffsetOverride( offset ) end

---[[ SetHullRadius  Set the collision hull radius of this NPC. ]]
-- @return nil
-- @param hullRadius float
function CDOTA_BaseNPC:SetHullRadius( hullRadius ) end

---[[ SetIdleAcquire   ]]
-- @return nil
-- @param idleAcquire bool
function CDOTA_BaseNPC:SetIdleAcquire( idleAcquire ) end

---[[ SetInitialGoalEntity  Sets the initial waypoint goal for this NPC. ]]
-- @return nil
-- @param goal CBaseEntity
function CDOTA_BaseNPC:SetInitialGoalEntity( goal ) end

---[[ SetInitialGoalPosition  Set waypoint position for this NPC. ]]
-- @return nil
-- @param position Vector
function CDOTA_BaseNPC:SetInitialGoalPosition( position ) end

---[[ SetMana  Set the mana on this unit. ]]
-- @return nil
-- @param mana float
function CDOTA_BaseNPC:SetMana( mana ) end

---[[ SetMaximumGoldBounty  Set the maximum gold bounty for this unit. ]]
-- @return nil
-- @param goldBountyMax int
function CDOTA_BaseNPC:SetMaximumGoldBounty( goldBountyMax ) end

---[[ SetMaxMana  Set the maximum mana of this unit. ]]
-- @return nil
-- @param maxMana float
function CDOTA_BaseNPC:SetMaxMana( maxMana ) end

---[[ SetMinimumGoldBounty  Set the minimum gold bounty for this unit. ]]
-- @return nil
-- @param goldBountyMin int
function CDOTA_BaseNPC:SetMinimumGoldBounty( goldBountyMin ) end

---[[ SetModifierStackCount  Sets the stack count of a given modifier. ]]
-- @return nil
-- @param scriptName string
-- @param caster CDOTA_BaseNPC
-- @param stackCount int
function CDOTA_BaseNPC:SetModifierStackCount( scriptName, caster, stackCount ) end

---[[ SetMoveCapability   ]]
-- @return nil
-- @param moveCapabilities DOTAUnitMoveCapability_t
function CDOTA_BaseNPC:SetMoveCapability( moveCapabilities ) end

---[[ SetMustReachEachGoalEntity  Set whether this NPC is required to reach each goal entity, rather than being allowed to unkink their path. ]]
-- @return nil
-- @param must bool
function CDOTA_BaseNPC:SetMustReachEachGoalEntity( must ) end

---[[ SetNeverMoveToClearSpace  If set to true, we will never attempt to move this unit to clear space, even when it unphases. ]]
-- @return nil
-- @param neverMoveToClearSpace bool
function CDOTA_BaseNPC:SetNeverMoveToClearSpace( neverMoveToClearSpace ) end

---[[ SetNightTimeVisionRange  Returns the vision range after modifiers. ]]
-- @return nil
-- @param range int
function CDOTA_BaseNPC:SetNightTimeVisionRange( range ) end

---[[ SetOrigin  Set the unit's origin. ]]
-- @return nil
-- @param location Vector
function CDOTA_BaseNPC:SetOrigin( location ) end

---[[ SetOriginalModel  Sets the original model of this entity, which it will tend to fall back to anytime its state changes. ]]
-- @return nil
-- @param modelName string
function CDOTA_BaseNPC:SetOriginalModel( modelName ) end

---[[ SetPhysicalArmorBaseValue  Sets base physical armor value. ]]
-- @return nil
-- @param physicalArmorValue float
function CDOTA_BaseNPC:SetPhysicalArmorBaseValue( physicalArmorValue ) end

---[[ SetRangedProjectileName   ]]
-- @return nil
-- @param projectileName string
function CDOTA_BaseNPC:SetRangedProjectileName( projectileName ) end

---[[ SetRevealRadius  Sets the client side map reveal radius for this unit. ]]
-- @return nil
-- @param revealRadius float
function CDOTA_BaseNPC:SetRevealRadius( revealRadius ) end

---[[ SetShouldComputeRemainingPathLength   ]]
-- @return nil
-- @param compute bool
function CDOTA_BaseNPC:SetShouldComputeRemainingPathLength( compute ) end

---[[ SetShouldDoFlyHeightVisual   ]]
-- @return nil
-- @param shouldVisuallyFly bool
function CDOTA_BaseNPC:SetShouldDoFlyHeightVisual( shouldVisuallyFly ) end

---[[ SetStolenScepter   ]]
-- @return nil
-- @param stolenScepter bool
function CDOTA_BaseNPC:SetStolenScepter( stolenScepter ) end

---[[ SetUnitCanRespawn   ]]
-- @return nil
-- @param canRespawn bool
function CDOTA_BaseNPC:SetUnitCanRespawn( canRespawn ) end

---[[ SetUnitName   ]]
-- @return nil
-- @param name string
function CDOTA_BaseNPC:SetUnitName( name ) end

---[[ ShouldIdleAcquire   ]]
-- @return bool
function CDOTA_BaseNPC:ShouldIdleAcquire(  ) end

---[[ SpeakConcept  Speak a response system concept with the TLK_DOTA_CUSTOM concept. ]]
-- @return nil
-- @param criteriaTable handle
function CDOTA_BaseNPC:SpeakConcept( criteriaTable ) end

---[[ SpendMana  Spend mana from this unit, this can be used for spending mana from abilities or item usage. ]]
-- @return nil
-- @param manaSpent float
-- @param ability CDOTABaseAbility
function CDOTA_BaseNPC:SpendMana( manaSpent, ability ) end

---[[ StartGesture  Add the given gesture activity. ]]
-- @return nil
-- @param activity GameActivity_t
function CDOTA_BaseNPC:StartGesture( activity ) end

---[[ StartGestureFadeWithSequenceSettings  Add the given gesture activity faded according to its sequence settings. ]]
-- @return nil
-- @param activity GameActivity_t
function CDOTA_BaseNPC:StartGestureFadeWithSequenceSettings( activity ) end

---[[ StartGestureWithFade  Add the given gesture activity faded according to to the parameters. ]]
-- @return nil
-- @param activity GameActivity_t
-- @param fadeIn float
-- @param fadeOut float
function CDOTA_BaseNPC:StartGestureWithFade( activity, fadeIn, fadeOut ) end

---[[ StartGestureWithFadeAndPlaybackRate  Add the given gesture activity faded according to to the parameters and with a playback rate override. ]]
-- @return nil
-- @param activity int
-- @param fadeIn float
-- @param fadeOut float
-- @param rate float
function CDOTA_BaseNPC:StartGestureWithFadeAndPlaybackRate( activity, fadeIn, fadeOut, rate ) end

---[[ StartGestureWithPlaybackRate  Add the given gesture activity with a playback rate override. ]]
-- @return nil
-- @param activity GameActivity_t
-- @param rate float
function CDOTA_BaseNPC:StartGestureWithPlaybackRate( activity, rate ) end

---[[ Stop  Stop the current order. ]]
-- @return nil
function CDOTA_BaseNPC:Stop(  ) end

---[[ StopFacing   ]]
-- @return nil
function CDOTA_BaseNPC:StopFacing(  ) end

---[[ SwapAbilities  Swaps the slots of the two passed abilities and sets them enabled/disabled. ]]
-- @return nil
-- @param abilityName1 string
-- @param abilityName2 string
-- @param enable1 bool
-- @param enable2 bool
function CDOTA_BaseNPC:SwapAbilities( abilityName1, abilityName2, enable1, enable2 ) end

---[[ SwapItems  Swap the contents of two item slots (slot1, slot2). ]]
-- @return nil
-- @param slot1 int
-- @param slot2 int
function CDOTA_BaseNPC:SwapItems( slot1, slot2 ) end

---[[ TakeItem  Removed the passed item from this unit's inventory. Returns the passed item. ]]
-- @return CDOTA_Item
-- @param item CDOTA_Item
function CDOTA_BaseNPC:TakeItem( item ) end

---[[ TimeUntilNextAttack   ]]
-- @return float
function CDOTA_BaseNPC:TimeUntilNextAttack(  ) end

---[[ TriggerModifierDodge   ]]
-- @return bool
-- @param ability handle
-- @param buff handle
function CDOTA_BaseNPC:TriggerModifierDodge( ability, buff ) end

---[[ TriggerSpellAbsorb   ]]
-- @return bool
-- @param ability CDOTABaseAbility
function CDOTA_BaseNPC:TriggerSpellAbsorb( ability ) end

---[[ TriggerSpellReflect  Trigger the Lotus Orb-like effect.(hAbility). ]]
-- @return nil
-- @param ability CDOTABaseAbility
function CDOTA_BaseNPC:TriggerSpellReflect( ability ) end

---[[ UnHideAbilityToSlot  Makes the first ability unhidden, and puts it where second ability currently is. Will do nothing if the first ability is already unhidden and in a valid slot. ]]
-- @return nil
-- @param abilityName string
-- @param replacedAbilityName string
function CDOTA_BaseNPC:UnHideAbilityToSlot( abilityName, replacedAbilityName ) end

---[[ UnitCanRespawn  Can the unit respawn? ]]
-- @return bool
function CDOTA_BaseNPC:UnitCanRespawn(  ) end

---[[ WasKilledPassively   ]]
-- @return bool
function CDOTA_BaseNPC:WasKilledPassively(  ) end

---[[ GetInvulnCount  Get the invulnerability count for a building. ]]
-- @return int
function CDOTA_BaseNPC_Building:GetInvulnCount(  ) end

---[[ SetInvulnCount  Set the invulnerability counter of this building. ]]
-- @return nil
-- @param invulnCount int
function CDOTA_BaseNPC_Building:SetInvulnCount( invulnCount ) end

---[[ AddItemDrop  Add the specified item drop to this creature. ]]
-- @return nil
-- @param dropData table
function CDOTA_BaseNPC_Creature:AddItemDrop( dropData ) end

---[[ CreatureLevelUp  Level the creature up by the specified number of levels. ]]
-- @return nil
-- @param levels int
function CDOTA_BaseNPC_Creature:CreatureLevelUp( levels ) end

---[[ GetDisableResistance  Set creature's current disable resistance. ]]
-- @return float
function CDOTA_BaseNPC_Creature:GetDisableResistance(  ) end

---[[ GetUltimateDisableResistance  Set creature's current disable resistance from ultimates. ]]
-- @return float
function CDOTA_BaseNPC_Creature:GetUltimateDisableResistance(  ) end

---[[ IsChampion  Is this unit a champion? ]]
-- @return bool
function CDOTA_BaseNPC_Creature:IsChampion(  ) end

---[[ IsReincarnating  Is this creature respawning? ]]
-- @return bool
function CDOTA_BaseNPC_Creature:IsReincarnating(  ) end

---[[ RemoveAllItemDrops  Remove all item drops from this creature. ]]
-- @return nil
function CDOTA_BaseNPC_Creature:RemoveAllItemDrops(  ) end

---[[ SetAggroOnOwnerOnDamage  Does this creature aggro on the owner of the attacking unit when taking damage? ]]
-- @return nil
-- @param aggro bool
function CDOTA_BaseNPC_Creature:SetAggroOnOwnerOnDamage( aggro ) end

---[[ SetArmorGain  Set the armor gained per level on this creature. ]]
-- @return nil
-- @param armorGain float
function CDOTA_BaseNPC_Creature:SetArmorGain( armorGain ) end

---[[ SetAttackTimeGain  Set the attack time gained per level on this creature. ]]
-- @return nil
-- @param attackTimeGain float
function CDOTA_BaseNPC_Creature:SetAttackTimeGain( attackTimeGain ) end

---[[ SetBountyGain  Set the bounty gold gained per level on this creature. ]]
-- @return nil
-- @param bountyGain int
function CDOTA_BaseNPC_Creature:SetBountyGain( bountyGain ) end

---[[ SetChampion  Flag this unit as a champion creature. ]]
-- @return nil
-- @param isChampion bool
function CDOTA_BaseNPC_Creature:SetChampion( isChampion ) end

---[[ SetDamageGain  Set the damage gained per level on this creature. ]]
-- @return nil
-- @param damageGain int
function CDOTA_BaseNPC_Creature:SetDamageGain( damageGain ) end

---[[ SetDisableResistance  Set creature's current disable resistance. ]]
-- @return nil
-- @param disableResistance float
function CDOTA_BaseNPC_Creature:SetDisableResistance( disableResistance ) end

---[[ SetDisableResistanceGain  Set the disable resistance gained per level on this creature. ]]
-- @return nil
-- @param disableResistanceGain float
function CDOTA_BaseNPC_Creature:SetDisableResistanceGain( disableResistanceGain ) end

---[[ SetEconItemGroup  Switches visible econ item group. ]]
-- @return nil
-- @param group int
function CDOTA_BaseNPC_Creature:SetEconItemGroup( group ) end

---[[ SetHPGain  Set the hit points gained per level on this creature. ]]
-- @return nil
-- @param hpGain int
function CDOTA_BaseNPC_Creature:SetHPGain( hpGain ) end

---[[ SetHPRegenGain  Set the hit points regen gained per level on this creature. ]]
-- @return nil
-- @param hpRegenGain float
function CDOTA_BaseNPC_Creature:SetHPRegenGain( hpRegenGain ) end

---[[ SetMagicResistanceGain  Set the magic resistance gained per level on this creature. ]]
-- @return nil
-- @param magicResistanceGain float
function CDOTA_BaseNPC_Creature:SetMagicResistanceGain( magicResistanceGain ) end

---[[ SetManaGain  Set the mana points gained per level on this creature. ]]
-- @return nil
-- @param manaGain int
function CDOTA_BaseNPC_Creature:SetManaGain( manaGain ) end

---[[ SetManaRegenGain  Set the mana points regen gained per level on this creature. ]]
-- @return nil
-- @param manaRegenGain float
function CDOTA_BaseNPC_Creature:SetManaRegenGain( manaRegenGain ) end

---[[ SetMoveSpeedGain  Set the move speed gained per level on this creature. ]]
-- @return nil
-- @param moveSpeedGain int
function CDOTA_BaseNPC_Creature:SetMoveSpeedGain( moveSpeedGain ) end

---[[ SetRequiresReachingEndPath  Set whether creatures require reaching their end path before becoming idle. ]]
-- @return nil
-- @param requiresReachingEndPath bool
function CDOTA_BaseNPC_Creature:SetRequiresReachingEndPath( requiresReachingEndPath ) end

---[[ SetUltimateDisableResistance  Set creature's current disable resistance from ultimates. ]]
-- @return nil
-- @param ultDisableResistance float
function CDOTA_BaseNPC_Creature:SetUltimateDisableResistance( ultDisableResistance ) end

---[[ SetXPGain  Set the XP gained per level on this creature. ]]
-- @return nil
-- @param xpGain int
function CDOTA_BaseNPC_Creature:SetXPGain( xpGain ) end

---[[ AddExperience   ]]
-- @return bool
-- @param xp float
-- @param reason EDOTA_ModifyXP_Reason
-- @param applyBotDifficultyScaling bool
-- @param incrementTotal bool
-- @param cloneCount int
function CDOTA_BaseNPC_Hero:AddExperience( xp, reason, applyBotDifficultyScaling, incrementTotal, cloneCount ) end

---[[ Buyback  Spend the gold and buyback with this hero. ]]
-- @return nil
function CDOTA_BaseNPC_Hero:Buyback(  ) end

---[[ CalculateStatBonus  Recalculate all stats after the hero gains stats. ]]
-- @return nil
-- @param force bool
function CDOTA_BaseNPC_Hero:CalculateStatBonus( force ) end

---[[ CanEarnGold  Returns boolean value result of buyback gold limit time less than game time. ]]
-- @return bool
function CDOTA_BaseNPC_Hero:CanEarnGold(  ) end

---[[ ClearLastHitMultikill  Value is stored in PlayerResource. ]]
-- @return nil
function CDOTA_BaseNPC_Hero:ClearLastHitMultikill(  ) end

---[[ ClearLastHitStreak  Value is stored in PlayerResource. ]]
-- @return nil
function CDOTA_BaseNPC_Hero:ClearLastHitStreak(  ) end

---[[ ClearStreak  Value is stored in PlayerResource. ]]
-- @return nil
function CDOTA_BaseNPC_Hero:ClearStreak(  ) end

---[[ GetAbilityPoints  Gets the current unspent ability points. ]]
-- @return int
function CDOTA_BaseNPC_Hero:GetAbilityPoints(  ) end

---[[ GetAdditionalOwnedUnits   ]]
-- @return [object Object]
function CDOTA_BaseNPC_Hero:GetAdditionalOwnedUnits(  ) end

---[[ GetAgility   ]]
-- @return float
function CDOTA_BaseNPC_Hero:GetAgility(  ) end

---[[ GetAgilityGain   ]]
-- @return float
function CDOTA_BaseNPC_Hero:GetAgilityGain(  ) end

---[[ GetAssists  Value is stored in PlayerResource. ]]
-- @return int
function CDOTA_BaseNPC_Hero:GetAssists(  ) end

---[[ GetAttacker   ]]
-- @return int
-- @param index int
function CDOTA_BaseNPC_Hero:GetAttacker( index ) end

---[[ GetBaseAgility   ]]
-- @return float
function CDOTA_BaseNPC_Hero:GetBaseAgility(  ) end

---[[ GetBaseDamageMax  Hero damage is also affected by attributes. ]]
-- @return int
function CDOTA_BaseNPC_Hero:GetBaseDamageMax(  ) end

---[[ GetBaseDamageMin  Hero damage is also affected by attributes. ]]
-- @return int
function CDOTA_BaseNPC_Hero:GetBaseDamageMin(  ) end

---[[ GetBaseIntellect   ]]
-- @return float
function CDOTA_BaseNPC_Hero:GetBaseIntellect(  ) end

---[[ GetBaseManaRegen  Returns the base mana regen. ]]
-- @return float
function CDOTA_BaseNPC_Hero:GetBaseManaRegen(  ) end

---[[ GetBaseStrength   ]]
-- @return float
function CDOTA_BaseNPC_Hero:GetBaseStrength(  ) end

---[[ GetBonusDamageFromPrimaryStat   ]]
-- @return int
function CDOTA_BaseNPC_Hero:GetBonusDamageFromPrimaryStat(  ) end

---[[ GetBuybackCooldownTime  Return float value for the amount of time left on cooldown for this hero's buyback. ]]
-- @return float
function CDOTA_BaseNPC_Hero:GetBuybackCooldownTime(  ) end

---[[ GetBuybackCost  Return integer value for the gold cost of a buyback. ]]
-- @return int
function CDOTA_BaseNPC_Hero:GetBuybackCost(  ) end

---[[ GetBuybackGoldLimitTime  Returns the amount of time gold gain is limited after buying back. ]]
-- @return float
function CDOTA_BaseNPC_Hero:GetBuybackGoldLimitTime(  ) end

---[[ GetCurrentXP  Returns the amount of XP. ]]
-- @return int
function CDOTA_BaseNPC_Hero:GetCurrentXP(  ) end

---[[ GetDeathGoldCost   ]]
-- @return int
function CDOTA_BaseNPC_Hero:GetDeathGoldCost(  ) end

---[[ GetDeaths  Value is stored in PlayerResource. ]]
-- @return int
function CDOTA_BaseNPC_Hero:GetDeaths(  ) end

---[[ GetDenies  Value is stored in PlayerResource. ]]
-- @return int
function CDOTA_BaseNPC_Hero:GetDenies(  ) end

---[[ GetGold  Returns gold amount for the player owning this hero. ]]
-- @return int
function CDOTA_BaseNPC_Hero:GetGold(  ) end

---[[ GetGoldBounty   ]]
-- @return int
function CDOTA_BaseNPC_Hero:GetGoldBounty(  ) end

---[[ GetHeroFacetID   ]]
-- @return uint
function CDOTA_BaseNPC_Hero:GetHeroFacetID(  ) end

---[[ GetHeroID   ]]
-- @return int
function CDOTA_BaseNPC_Hero:GetHeroID(  ) end

---[[ GetIncreasedAttackSpeed  Hero attack speed is also affected by agility. ]]
-- @return float
-- @param ignoreTempAttackSpeed bool
function CDOTA_BaseNPC_Hero:GetIncreasedAttackSpeed( ignoreTempAttackSpeed ) end

---[[ GetIntellect   ]]
-- @return float
-- @param skipNoConsume bool
function CDOTA_BaseNPC_Hero:GetIntellect( skipNoConsume ) end

---[[ GetIntellectGain   ]]
-- @return float
function CDOTA_BaseNPC_Hero:GetIntellectGain(  ) end

---[[ GetKills  Value is stored in PlayerResource. ]]
-- @return int
function CDOTA_BaseNPC_Hero:GetKills(  ) end

---[[ GetLastHits  Value is stored in PlayerResource. ]]
-- @return int
function CDOTA_BaseNPC_Hero:GetLastHits(  ) end

---[[ GetMostRecentDamageTime   ]]
-- @return float
function CDOTA_BaseNPC_Hero:GetMostRecentDamageTime(  ) end

---[[ GetMultipleKillCount   ]]
-- @return int
function CDOTA_BaseNPC_Hero:GetMultipleKillCount(  ) end

---[[ GetNumAttackers   ]]
-- @return int
function CDOTA_BaseNPC_Hero:GetNumAttackers(  ) end

---[[ GetNumItemsInInventory   ]]
-- @return int
function CDOTA_BaseNPC_Hero:GetNumItemsInInventory(  ) end

---[[ GetNumItemsInStash   ]]
-- @return int
function CDOTA_BaseNPC_Hero:GetNumItemsInStash(  ) end

---[[ GetPhysicalArmorBaseValue  Hero armor is affected by attributes. ]]
-- @return float
function CDOTA_BaseNPC_Hero:GetPhysicalArmorBaseValue(  ) end

---[[ GetPlayerID  Returns player ID of the player owning this hero. ]]
-- @return PlayerID
function CDOTA_BaseNPC_Hero:GetPlayerID(  ) end

---[[ GetPrimaryAttribute   ]]
-- @return Attributes
function CDOTA_BaseNPC_Hero:GetPrimaryAttribute(  ) end

---[[ GetPrimaryStatValue   ]]
-- @return float
function CDOTA_BaseNPC_Hero:GetPrimaryStatValue(  ) end

---[[ GetReplicatingOtherHero  If hero is under Replicate effect, returns original hero entity. ]]
-- @return CDOTA_BaseNPC_Hero
function CDOTA_BaseNPC_Hero:GetReplicatingOtherHero(  ) end

---[[ GetRespawnsDisabled  Is this hero prevented from respawning? ]]
-- @return bool
function CDOTA_BaseNPC_Hero:GetRespawnsDisabled(  ) end

---[[ GetRespawnTime   ]]
-- @return float
function CDOTA_BaseNPC_Hero:GetRespawnTime(  ) end

---[[ GetStreak  Value is stored in PlayerResource. ]]
-- @return int
function CDOTA_BaseNPC_Hero:GetStreak(  ) end

---[[ GetStrength   ]]
-- @return float
function CDOTA_BaseNPC_Hero:GetStrength(  ) end

---[[ GetStrengthGain   ]]
-- @return float
function CDOTA_BaseNPC_Hero:GetStrengthGain(  ) end

---[[ GetTimeUntilRespawn   ]]
-- @return float
function CDOTA_BaseNPC_Hero:GetTimeUntilRespawn(  ) end

---[[ GetTogglableWearable  Get wearable entity in slot (slot). ]]
-- @return CBaseFlex
-- @param slotType DOTASlotType_t
function CDOTA_BaseNPC_Hero:GetTogglableWearable( slotType ) end

---[[ HasAnyAvailableInventorySpace   ]]
-- @return bool
function CDOTA_BaseNPC_Hero:HasAnyAvailableInventorySpace(  ) end

---[[ HasFlyingVision   ]]
-- @return bool
function CDOTA_BaseNPC_Hero:HasFlyingVision(  ) end

---[[ HasOwnerAbandoned   ]]
-- @return bool
function CDOTA_BaseNPC_Hero:HasOwnerAbandoned(  ) end

---[[ HasRoomForItem   ]]
-- @return int
-- @param itemName string
-- @param includeStashCombines bool
-- @param allowSelling bool
function CDOTA_BaseNPC_Hero:HasRoomForItem( itemName, includeStashCombines, allowSelling ) end

---[[ HeroLevelUp  Levels up the hero, true or false to play effects. ]]
-- @return nil
-- @param playEffects bool
function CDOTA_BaseNPC_Hero:HeroLevelUp( playEffects ) end

---[[ IncrementAssists  Value is stored in PlayerResource. ]]
-- @return nil
-- @param killerId PlayerID
function CDOTA_BaseNPC_Hero:IncrementAssists( killerId ) end

---[[ IncrementDeaths  Value is stored in PlayerResource. ]]
-- @return nil
-- @param killerId PlayerID
function CDOTA_BaseNPC_Hero:IncrementDeaths( killerId ) end

---[[ IncrementDenies  Value is stored in PlayerResource. ]]
-- @return nil
function CDOTA_BaseNPC_Hero:IncrementDenies(  ) end

---[[ IncrementKills  Passed ID is for the victim, killer ID is ID of the current hero.  Value is stored in PlayerResource. ]]
-- @return nil
-- @param victimId PlayerID
function CDOTA_BaseNPC_Hero:IncrementKills( victimId ) end

---[[ IncrementLastHitMultikill  Value is stored in PlayerResource. ]]
-- @return nil
function CDOTA_BaseNPC_Hero:IncrementLastHitMultikill(  ) end

---[[ IncrementLastHits  Value is stored in PlayerResource. ]]
-- @return nil
function CDOTA_BaseNPC_Hero:IncrementLastHits(  ) end

---[[ IncrementLastHitStreak  Value is stored in PlayerResource. ]]
-- @return nil
function CDOTA_BaseNPC_Hero:IncrementLastHitStreak(  ) end

---[[ IncrementNearbyCreepDeaths  Value is stored in PlayerResource. ]]
-- @return nil
function CDOTA_BaseNPC_Hero:IncrementNearbyCreepDeaths(  ) end

---[[ IncrementStreak  Value is stored in PlayerResource. ]]
-- @return nil
function CDOTA_BaseNPC_Hero:IncrementStreak(  ) end

---[[ IsBuybackDisabledByDevilsBargain   ]]
-- @return bool
function CDOTA_BaseNPC_Hero:IsBuybackDisabledByDevilsBargain(  ) end

---[[ IsReincarnating   ]]
-- @return bool
function CDOTA_BaseNPC_Hero:IsReincarnating(  ) end

---[[ IsStashEnabled   ]]
-- @return bool
function CDOTA_BaseNPC_Hero:IsStashEnabled(  ) end

---[[ KilledHero   ]]
-- @return nil
-- @param hero CDOTA_BaseNPC_Hero
-- @param inflictor CDOTABaseAbility
function CDOTA_BaseNPC_Hero:KilledHero( hero, inflictor ) end

---[[ ModifyAgility  Adds passed value to base attribute value, then calls CalculateStatBonus. ]]
-- @return nil
-- @param newAgility float
function CDOTA_BaseNPC_Hero:ModifyAgility( newAgility ) end

---[[ ModifyGold  Gives this hero some gold. ]]
-- @return int
-- @param goldChange int
-- @param reliable bool
-- @param reason EDOTA_ModifyGold_Reason
function CDOTA_BaseNPC_Hero:ModifyGold( goldChange, reliable, reason ) end

---[[ ModifyGoldFiltered  Gives this hero some gold, using the gold filter if extra filtering is on. ]]
-- @return int
-- @param goldChange int
-- @param reliable bool
-- @param reason EDOTA_ModifyGold_Reason
function CDOTA_BaseNPC_Hero:ModifyGoldFiltered( goldChange, reliable, reason ) end

---[[ ModifyIntellect  Adds passed value to base attribute value, then calls CalculateStatBonus. ]]
-- @return nil
-- @param newIntellect float
function CDOTA_BaseNPC_Hero:ModifyIntellect( newIntellect ) end

---[[ ModifyStrength  Adds passed value to base attribute value, then calls CalculateStatBonus. ]]
-- @return nil
-- @param newStrength float
function CDOTA_BaseNPC_Hero:ModifyStrength( newStrength ) end

---[[ PerformTaunt   ]]
-- @return nil
function CDOTA_BaseNPC_Hero:PerformTaunt(  ) end

---[[ RecordLastHit   ]]
-- @return nil
function CDOTA_BaseNPC_Hero:RecordLastHit(  ) end

---[[ RespawnHero  Respawn this hero. ]]
-- @return nil
-- @param buyBack bool
-- @param respawnPenalty bool
function CDOTA_BaseNPC_Hero:RespawnHero( buyBack, respawnPenalty ) end

---[[ SetAbilityPoints  Sets the current unspent ability points. ]]
-- @return nil
-- @param points int
function CDOTA_BaseNPC_Hero:SetAbilityPoints( points ) end

---[[ SetBaseAgility   ]]
-- @return nil
-- @param agility float
function CDOTA_BaseNPC_Hero:SetBaseAgility( agility ) end

---[[ SetBaseIntellect   ]]
-- @return nil
-- @param intellect float
function CDOTA_BaseNPC_Hero:SetBaseIntellect( intellect ) end

---[[ SetBaseStrength   ]]
-- @return nil
-- @param strength float
function CDOTA_BaseNPC_Hero:SetBaseStrength( strength ) end

---[[ SetBotDifficulty   ]]
-- @return nil
-- @param difficulty int
function CDOTA_BaseNPC_Hero:SetBotDifficulty( difficulty ) end

---[[ SetBuybackCooldownTime  Sets the buyback cooldown time. ]]
-- @return nil
-- @param time float
function CDOTA_BaseNPC_Hero:SetBuybackCooldownTime( time ) end

---[[ SetBuyBackDisabledByDevilsBargain   ]]
-- @return nil
-- @param buybackDisabled bool
function CDOTA_BaseNPC_Hero:SetBuyBackDisabledByDevilsBargain( buybackDisabled ) end

---[[ SetBuybackGoldLimitTime  Set the amount of time gold gain is limited after buying back. ]]
-- @return nil
-- @param time float
function CDOTA_BaseNPC_Hero:SetBuybackGoldLimitTime( time ) end

---[[ SetCustomDeathXP  Sets a custom experience value for this hero.  Note, GameRules boolean must be set for this to work! ]]
-- @return nil
-- @param value int
function CDOTA_BaseNPC_Hero:SetCustomDeathXP( value ) end

---[[ SetGold  Sets the gold amount for the player owning this hero. ]]
-- @return nil
-- @param gold int
-- @param reliable bool
function CDOTA_BaseNPC_Hero:SetGold( gold, reliable ) end

---[[ SetPlayerID   ]]
-- @return nil
-- @param playerId PlayerID
function CDOTA_BaseNPC_Hero:SetPlayerID( playerId ) end

---[[ SetPrimaryAttribute  Set this hero's primary attribute value. ]]
-- @return nil
-- @param primaryAttribute Attributes
function CDOTA_BaseNPC_Hero:SetPrimaryAttribute( primaryAttribute ) end

---[[ SetRespawnPosition   ]]
-- @return nil
-- @param origin Vector
function CDOTA_BaseNPC_Hero:SetRespawnPosition( origin ) end

---[[ SetRespawnsDisabled  Prevent this hero from respawning. ]]
-- @return nil
-- @param disableRespawns bool
function CDOTA_BaseNPC_Hero:SetRespawnsDisabled( disableRespawns ) end

---[[ SetStashEnabled   ]]
-- @return nil
-- @param enabled bool
function CDOTA_BaseNPC_Hero:SetStashEnabled( enabled ) end

---[[ SetTimeUntilRespawn   ]]
-- @return nil
-- @param time float
function CDOTA_BaseNPC_Hero:SetTimeUntilRespawn( time ) end

---[[ ShouldDoFlyHeightVisual   ]]
-- @return bool
function CDOTA_BaseNPC_Hero:ShouldDoFlyHeightVisual(  ) end

---[[ SpendGold   ]]
-- @return nil
-- @param cost int
-- @param reason EDOTA_ModifyGold_Reason
function CDOTA_BaseNPC_Hero:SpendGold( cost, reason ) end

---[[ UpgradeAbility  This upgrades the passed ability if it exists and the hero has enough ability points. ]]
-- @return nil
-- @param ability CDOTABaseAbility
function CDOTA_BaseNPC_Hero:UpgradeAbility( ability ) end

---[[ WillReincarnate   ]]
-- @return bool
function CDOTA_BaseNPC_Hero:WillReincarnate(  ) end

---[[ GetShopType  Get the DOTA_SHOP_TYPE. ]]
-- @return DOTA_SHOP_TYPE
function CDOTA_BaseNPC_Shop:GetShopType(  ) end

---[[ SetShopType  Set the DOTA_SHOP_TYPE. ]]
-- @return nil
-- @param shopType DOTA_SHOP_TYPE
function CDOTA_BaseNPC_Shop:SetShopType( shopType ) end

---[[ GetTrapTarget  Get the trap target for this entity. ]]
-- @return Vector
function CDOTA_BaseNPC_Trap_Ward:GetTrapTarget(  ) end

---[[ SetAnimation  Set the animation sequence for this entity. ]]
-- @return nil
-- @param animation string
function CDOTA_BaseNPC_Trap_Ward:SetAnimation( animation ) end

---[[ GetInteractAbilityName  The name of the ability used when triggering interaction on the outpost. ]]
-- @return string
function CDOTA_BaseNPC_Watch_Tower:GetInteractAbilityName(  ) end

---[[ SetInteractAbilityName  The name of the ability used when triggering interaction on the outpost. ]]
-- @return nil
-- @param interactAbilityName string
function CDOTA_BaseNPC_Watch_Tower:SetInteractAbilityName( interactAbilityName ) end

---[[ AddParticle   ]]
-- @return nil
-- @param index int
-- @param destroyImmediately bool
-- @param statusEffect bool
-- @param priority int
-- @param heroEffect bool
-- @param overheadEffect bool
function CDOTA_Buff:AddParticle( index, destroyImmediately, statusEffect, priority, heroEffect, overheadEffect ) end

---[[ CheckStateToTable   ]]
-- @return nil
-- @param table handle
function CDOTA_Buff:CheckStateToTable( table ) end

---[[ DecrementStackCount  Decrease this modifier's stack count by 1. ]]
-- @return nil
function CDOTA_Buff:DecrementStackCount(  ) end

---[[ Destroy  Run all associated destroy functions, then remove the modifier. ]]
-- @return nil
function CDOTA_Buff:Destroy(  ) end

---[[ DestroyOnExpire   ]]
-- @return bool
function CDOTA_Buff:DestroyOnExpire(  ) end

---[[ ForceRefresh  Run all associated refresh functions on this modifier as if it was re-applied. ]]
-- @return nil
function CDOTA_Buff:ForceRefresh(  ) end

---[[ GetAbility  Get the ability that generated the modifier. ]]
-- @return CDOTABaseAbility
function CDOTA_Buff:GetAbility(  ) end

---[[ GetAuraDuration  Returns aura stickiness (default 0.5). ]]
-- @return float
function CDOTA_Buff:GetAuraDuration(  ) end

---[[ GetAuraOwner  Returns the owner of the aura modifier, that applied this modifier. Always `nil` on the client. ]]
-- @return CDOTA_BaseNPC
function CDOTA_Buff:GetAuraOwner(  ) end

---[[ GetCaster  Get the owner of the ability responsible for the modifier. ]]
-- @return CDOTA_BaseNPC
function CDOTA_Buff:GetCaster(  ) end

---[[ GetClass   ]]
-- @return string
function CDOTA_Buff:GetClass(  ) end

---[[ GetCreationTime   ]]
-- @return float
function CDOTA_Buff:GetCreationTime(  ) end

---[[ GetDieTime   ]]
-- @return float
function CDOTA_Buff:GetDieTime(  ) end

---[[ GetDuration   ]]
-- @return float
function CDOTA_Buff:GetDuration(  ) end

---[[ GetElapsedTime   ]]
-- @return float
function CDOTA_Buff:GetElapsedTime(  ) end

---[[ GetLastAppliedTime   ]]
-- @return float
function CDOTA_Buff:GetLastAppliedTime(  ) end

---[[ GetName   ]]
-- @return string
function CDOTA_Buff:GetName(  ) end

---[[ GetParent  Get the unit the modifier is parented to. ]]
-- @return CDOTA_BaseNPC
function CDOTA_Buff:GetParent(  ) end

---[[ GetRemainingTime   ]]
-- @return float
function CDOTA_Buff:GetRemainingTime(  ) end

---[[ GetSerialNumber   ]]
-- @return int
function CDOTA_Buff:GetSerialNumber(  ) end

---[[ GetStackCount   ]]
-- @return int
function CDOTA_Buff:GetStackCount(  ) end

---[[ HasFunction   ]]
-- @return bool
-- @param function modifierfunction
function CDOTA_Buff:HasFunction( function ) end

---[[ IncrementStackCount  Increase this modifier's stack count by 1. ]]
-- @return nil
function CDOTA_Buff:IncrementStackCount(  ) end

---[[ IsDebuff   ]]
-- @return bool
function CDOTA_Buff:IsDebuff(  ) end

---[[ IsHexDebuff   ]]
-- @return bool
function CDOTA_Buff:IsHexDebuff(  ) end

---[[ IsNull  Has underlying C++ entity object been deleted? ]]
-- @return bool
function CDOTA_Buff:IsNull(  ) end

---[[ IsStunDebuff   ]]
-- @return bool
function CDOTA_Buff:IsStunDebuff(  ) end

---[[ SendBuffRefreshToClients   ]]
-- @return nil
function CDOTA_Buff:SendBuffRefreshToClients(  ) end

---[[ SetDuration   ]]
-- @return nil
-- @param duration float
-- @param informClient bool
function CDOTA_Buff:SetDuration( duration, informClient ) end

---[[ SetOverheadEffectOffset   ]]
-- @return bool
-- @param offset float
function CDOTA_Buff:SetOverheadEffectOffset( offset ) end

---[[ SetStackCount   ]]
-- @return nil
-- @param count int
function CDOTA_Buff:SetStackCount( count ) end

---[[ StartIntervalThink  Start this modifier's think function (OnIntervalThink) with the given interval (float).  To stop, call with -1. ]]
-- @return nil
-- @param interval float
function CDOTA_Buff:StartIntervalThink( interval ) end

---[[ DynamicHud_Create  Create a new custom UI HUD element for the specified player(s). ]]
-- @return nil
-- @param playerId PlayerID
-- @param elementId string
-- @param layoutFileName string
-- @param dialogVariables handle
function CDOTA_CustomUIManager:DynamicHud_Create( playerId, elementId, layoutFileName, dialogVariables ) end

---[[ DynamicHud_Destroy  Destroy a custom hud element. ]]
-- @return nil
-- @param playerId PlayerID
-- @param elementId string
function CDOTA_CustomUIManager:DynamicHud_Destroy( playerId, elementId ) end

---[[ DynamicHud_SetDialogVariables  Add or modify dialog variables for an existing custom hud element. ]]
-- @return nil
-- @param playerId PlayerID
-- @param elementId string
-- @param dialogVariables handle
function CDOTA_CustomUIManager:DynamicHud_SetDialogVariables( playerId, elementId, dialogVariables ) end

---[[ DynamicHud_SetVisible  Toggle the visibility of an existing custom hud element. ]]
-- @return nil
-- @param playerId PlayerID
-- @param elementId string
-- @param visible bool
function CDOTA_CustomUIManager:DynamicHud_SetVisible( playerId, elementId, visible ) end

---[[ CanBeUsedOutOfInventory   ]]
-- @return bool
function CDOTA_Item:CanBeUsedOutOfInventory(  ) end

---[[ GetContainer  Get the container for this item. ]]
-- @return CDOTA_Item_Physical
function CDOTA_Item:GetContainer(  ) end

---[[ GetCost   ]]
-- @return int
function CDOTA_Item:GetCost(  ) end

---[[ GetCurrentCharges  Get the number of charges this item currently has. ]]
-- @return int
function CDOTA_Item:GetCurrentCharges(  ) end

---[[ GetInitialCharges  Get the initial number of charges this item has. ]]
-- @return int
function CDOTA_Item:GetInitialCharges(  ) end

---[[ GetItemSlot   ]]
-- @return [object Object]
function CDOTA_Item:GetItemSlot(  ) end

---[[ GetItemState  Gets whether item is unequipped or ready. ]]
-- @return int
function CDOTA_Item:GetItemState(  ) end

---[[ GetParent  Get the parent for this item. ]]
-- @return handle
function CDOTA_Item:GetParent(  ) end

---[[ GetPurchaser  Get the purchaser for this item. ]]
-- @return CDOTA_BaseNPC
function CDOTA_Item:GetPurchaser(  ) end

---[[ GetPurchaseTime  Get the purchase time of this item. ]]
-- @return float
function CDOTA_Item:GetPurchaseTime(  ) end

---[[ GetSecondaryCharges  Get the number of secondary charges this item currently has. ]]
-- @return int
function CDOTA_Item:GetSecondaryCharges(  ) end

---[[ GetShareability   ]]
-- @return EShareAbility
function CDOTA_Item:GetShareability(  ) end

---[[ GetValuelessCharges  Get the number of valueless charges this item currently has. ]]
-- @return int
function CDOTA_Item:GetValuelessCharges(  ) end

---[[ IsActiveNeutral   ]]
-- @return bool
function CDOTA_Item:IsActiveNeutral(  ) end

---[[ IsAlertableItem   ]]
-- @return bool
function CDOTA_Item:IsAlertableItem(  ) end

---[[ IsCastOnPickup   ]]
-- @return bool
function CDOTA_Item:IsCastOnPickup(  ) end

---[[ IsCombinable   ]]
-- @return bool
function CDOTA_Item:IsCombinable(  ) end

---[[ IsCombineLocked   ]]
-- @return bool
function CDOTA_Item:IsCombineLocked(  ) end

---[[ IsDisassemblable   ]]
-- @return bool
function CDOTA_Item:IsDisassemblable(  ) end

---[[ IsDroppable   ]]
-- @return bool
function CDOTA_Item:IsDroppable(  ) end

---[[ IsInBackpack   ]]
-- @return bool
function CDOTA_Item:IsInBackpack(  ) end

---[[ IsItem   ]]
-- @return bool
function CDOTA_Item:IsItem(  ) end

---[[ IsKillable   ]]
-- @return bool
function CDOTA_Item:IsKillable(  ) end

---[[ IsMuted   ]]
-- @return bool
function CDOTA_Item:IsMuted(  ) end

---[[ IsPermanent  Is this a permanent item? ]]
-- @return bool
function CDOTA_Item:IsPermanent(  ) end

---[[ IsPurchasable   ]]
-- @return bool
function CDOTA_Item:IsPurchasable(  ) end

---[[ IsRecipe   ]]
-- @return bool
function CDOTA_Item:IsRecipe(  ) end

---[[ IsRecipeGenerated   ]]
-- @return bool
function CDOTA_Item:IsRecipeGenerated(  ) end

---[[ IsSellable   ]]
-- @return bool
function CDOTA_Item:IsSellable(  ) end

---[[ IsStackable   ]]
-- @return bool
function CDOTA_Item:IsStackable(  ) end

---[[ LaunchLoot   ]]
-- @return nil
-- @param autoUse bool
-- @param height float
-- @param duration float
-- @param endPoint Vector
-- @param teleportOwner CDOTA_BaseNPC_Hero
function CDOTA_Item:LaunchLoot( autoUse, height, duration, endPoint, teleportOwner ) end

---[[ LaunchLootInitialHeight   ]]
-- @return nil
-- @param autoUse bool
-- @param initialHeight float
-- @param launchHeight float
-- @param duration float
-- @param endPoint Vector
function CDOTA_Item:LaunchLootInitialHeight( autoUse, initialHeight, launchHeight, duration, endPoint ) end

---[[ LaunchLootRequiredHeight   ]]
-- @return nil
-- @param autoUse bool
-- @param requiredHeight float
-- @param height float
-- @param duration float
-- @param endPoint Vector
function CDOTA_Item:LaunchLootRequiredHeight( autoUse, requiredHeight, height, duration, endPoint ) end

---[[ ModifyNumValuelessCharges  Modifies the number of valueless charges on this item. ]]
-- @return nil
-- @param charges int
function CDOTA_Item:ModifyNumValuelessCharges( charges ) end

---[[ OnEquip   ]]
-- @return nil
function CDOTA_Item:OnEquip(  ) end

---[[ OnUnequip   ]]
-- @return nil
function CDOTA_Item:OnUnequip(  ) end

---[[ RequiresCharges   ]]
-- @return bool
function CDOTA_Item:RequiresCharges(  ) end

---[[ SetCanBeUsedOutOfInventory   ]]
-- @return nil
-- @param value bool
function CDOTA_Item:SetCanBeUsedOutOfInventory( value ) end

---[[ SetCastOnPickup   ]]
-- @return nil
-- @param castOnPickUp bool
function CDOTA_Item:SetCastOnPickup( castOnPickUp ) end

---[[ SetCombineLocked   ]]
-- @return nil
-- @param combineLocked bool
function CDOTA_Item:SetCombineLocked( combineLocked ) end

---[[ SetCurrentCharges  Set the number of charges on this item. ]]
-- @return nil
-- @param charges int
function CDOTA_Item:SetCurrentCharges( charges ) end

---[[ SetDroppable   ]]
-- @return nil
-- @param droppable bool
function CDOTA_Item:SetDroppable( droppable ) end

---[[ SetItemState  Sets whether item is unequipped or ready. ]]
-- @return nil
-- @param state int
function CDOTA_Item:SetItemState( state ) end

---[[ SetOnlyPlayerHeroPickup   ]]
-- @return nil
-- @param onlyPlayerHero bool
function CDOTA_Item:SetOnlyPlayerHeroPickup( onlyPlayerHero ) end

---[[ SetPurchaser  Set the purchaser of record for this item. ]]
-- @return nil
-- @param purchaser CDOTA_BaseNPC
function CDOTA_Item:SetPurchaser( purchaser ) end

---[[ SetPurchaseTime  Set the purchase time of this item. ]]
-- @return nil
-- @param time float
function CDOTA_Item:SetPurchaseTime( time ) end

---[[ SetSecondaryCharges  Set the number of secondary charges on this item. ]]
-- @return nil
-- @param charges int
function CDOTA_Item:SetSecondaryCharges( charges ) end

---[[ SetSellable   ]]
-- @return nil
-- @param sellable bool
function CDOTA_Item:SetSellable( sellable ) end

---[[ SetShareability   ]]
-- @return nil
-- @param shareability EShareAbility
function CDOTA_Item:SetShareability( shareability ) end

---[[ SetStacksWithOtherOwners   ]]
-- @return nil
-- @param stacksWithOtherOwners bool
function CDOTA_Item:SetStacksWithOtherOwners( stacksWithOtherOwners ) end

---[[ SpendCharge   ]]
-- @return nil
-- @param delayRemove float
function CDOTA_Item:SpendCharge( delayRemove ) end

---[[ StacksWithOtherOwners   ]]
-- @return bool
function CDOTA_Item:StacksWithOtherOwners(  ) end

---[[ Think  Think this item. ]]
-- @return nil
function CDOTA_Item:Think(  ) end

---[[ SetLifeTime  Set the life time of this item. ]]
-- @return nil
-- @param time float
function CDOTA_Item_BagOfGold:SetLifeTime( time ) end

---[[ ApplyDataDrivenModifier  Applies a data driven modifier to the target. ]]
-- @return nil
-- @param caster CDOTA_BaseNPC
-- @param target CDOTA_BaseNPC
-- @param modifierName string
-- @param modifierTable table
function CDOTA_Item_DataDriven:ApplyDataDrivenModifier( caster, target, modifierName, modifierTable ) end

---[[ ApplyDataDrivenThinker  Applies a data driven thinker at the location. ]]
-- @return CDOTA_Buff
-- @param caster CDOTA_BaseNPC
-- @param location Vector
-- @param modifierName string
-- @param modifierTable table
function CDOTA_Item_DataDriven:ApplyDataDrivenThinker( caster, location, modifierName, modifierTable ) end

---[[ ClearStoredRune  Clear the stored rune. ]]
-- @return nil
function CDOTA_Item_EmptyBottle:ClearStoredRune(  ) end

---[[ OnRune  Place a rune in the bottle. ]]
-- @return bool
-- @param runeType int
function CDOTA_Item_EmptyBottle:OnRune( runeType ) end

---[[ SetStoredRune  Set the stored rune. ]]
-- @return nil
-- @param runeType int
function CDOTA_Item_EmptyBottle:SetStoredRune( runeType ) end

---[[ CanUnitPickUp  Returns true if this item can be picked up by the target unit. ]]
-- @return bool
-- @param unit CDOTA_BaseNPC
function CDOTA_Item_Lua:CanUnitPickUp( unit ) end

---[[ CastFilterResult  Determine whether an issued command with no target is valid. ]]
-- @return UnitFilterResult
function CDOTA_Item_Lua:CastFilterResult(  ) end

---[[ CastFilterResultLocation  Determine whether an issued command on a location is valid. ]]
-- @return UnitFilterResult
-- @param location Vector
function CDOTA_Item_Lua:CastFilterResultLocation( location ) end

---[[ CastFilterResultTarget  Determine whether an issued command on a target is valid. ]]
-- @return UnitFilterResult
-- @param target CDOTA_BaseNPC
function CDOTA_Item_Lua:CastFilterResultTarget( target ) end

---[[ GetAssociatedPrimaryAbilities  Returns abilities that are stolen simultaneously, or otherwise related in functionality. ]]
-- @return string
function CDOTA_Item_Lua:GetAssociatedPrimaryAbilities(  ) end

---[[ GetAssociatedSecondaryAbilities  Returns other abilities that are stolen simultaneously, or otherwise related in functionality.  Generally hidden abilities. ]]
-- @return string
function CDOTA_Item_Lua:GetAssociatedSecondaryAbilities(  ) end

---[[ GetBehavior  Return cast behavior type of this ability. ]]
-- @return DOTA_ABILITY_BEHAVIOR
function CDOTA_Item_Lua:GetBehavior(  ) end

---[[ GetCastRange  Return cast range of this ability. ]]
-- @return int
-- @param location Vector
-- @param target CDOTA_BaseNPC
function CDOTA_Item_Lua:GetCastRange( location, target ) end

---[[ GetChannelledHealthCostPerSecond  Return health cost per second of channeling at the given level (-1 is current). ]]
-- @return int
-- @param level int
function CDOTA_Item_Lua:GetChannelledHealthCostPerSecond( level ) end

---[[ GetChannelledManaCostPerSecond  Return mana cost at the given level per second while channeling (-1 is current). ]]
-- @return int
-- @param level int
function CDOTA_Item_Lua:GetChannelledManaCostPerSecond( level ) end

---[[ GetChannelStartTime  Return the channel start time of this ability. ]]
-- @return float
function CDOTA_Item_Lua:GetChannelStartTime(  ) end

---[[ GetChannelTime  Return the channel time of this ability. ]]
-- @return float
function CDOTA_Item_Lua:GetChannelTime(  ) end

---[[ GetConceptRecipientType  Return who hears speech when this spell is cast. ]]
-- @return int
function CDOTA_Item_Lua:GetConceptRecipientType(  ) end

---[[ GetCooldown  Return cooldown of this ability. ]]
-- @return float
-- @param level int
function CDOTA_Item_Lua:GetCooldown( level ) end

---[[ GetCustomCastError  Return the error string of a failed command with no target. ]]
-- @return string
function CDOTA_Item_Lua:GetCustomCastError(  ) end

---[[ GetCustomCastErrorLocation  Return the error string of a failed command on a location. ]]
-- @return string
-- @param location Vector
function CDOTA_Item_Lua:GetCustomCastErrorLocation( location ) end

---[[ GetCustomCastErrorTarget  Return the error string of a failed command on a target. ]]
-- @return string
-- @param target CDOTA_BaseNPC
function CDOTA_Item_Lua:GetCustomCastErrorTarget( target ) end

---[[ GetCustomHudErrorMessage  (DOTA_INVALID_ORDERS nReason) Return the error string of a failed order. ]]
-- @return string
-- @param reason int
function CDOTA_Item_Lua:GetCustomHudErrorMessage( reason ) end

---[[ GetEffectiveCastRange  Return cast range of this ability, taking modifiers into account. ]]
-- @return int
-- @param location Vector
-- @param target handle
function CDOTA_Item_Lua:GetEffectiveCastRange( location, target ) end

---[[ GetGoldCost  Return gold cost at the given level (-1 is current). ]]
-- @return int
-- @param level int
function CDOTA_Item_Lua:GetGoldCost( level ) end

---[[ GetHealthCost  Return health cost at the given level (-1 is current). ]]
-- @return int
-- @param level int
function CDOTA_Item_Lua:GetHealthCost( level ) end

---[[ GetIntrinsicModifierName  Returns the name of the modifier applied passively by this ability. ]]
-- @return string
function CDOTA_Item_Lua:GetIntrinsicModifierName(  ) end

---[[ GetManaCost  Return mana cost at the given level (-1 is current). ]]
-- @return int
-- @param level int
function CDOTA_Item_Lua:GetManaCost( level ) end

---[[ GetPlaybackRateOverride  Return the animation rate of the cast animation. ]]
-- @return float
function CDOTA_Item_Lua:GetPlaybackRateOverride(  ) end

---[[ IsHiddenAbilityCastable  Returns true if this ability can be used when not on the action panel. ]]
-- @return bool
function CDOTA_Item_Lua:IsHiddenAbilityCastable(  ) end

---[[ IsHiddenWhenStolen  Returns true if this ability is hidden when stolen by Spell Steal. ]]
-- @return bool
function CDOTA_Item_Lua:IsHiddenWhenStolen(  ) end

---[[ IsMuted  Returns whether this item is muted or not. ]]
-- @return bool
function CDOTA_Item_Lua:IsMuted(  ) end

---[[ IsRefreshable  Returns true if this ability is refreshed by Refresher Orb. ]]
-- @return bool
function CDOTA_Item_Lua:IsRefreshable(  ) end

---[[ IsStealable  Returns true if this ability can be stolen by Spell Steal. ]]
-- @return bool
function CDOTA_Item_Lua:IsStealable(  ) end

---[[ OnAbilityPhaseInterrupted  Cast time did not complete successfully. ]]
-- @return nil
function CDOTA_Item_Lua:OnAbilityPhaseInterrupted(  ) end

---[[ OnAbilityPhaseStart  Cast time begins (return true for successful cast). ]]
-- @return bool
function CDOTA_Item_Lua:OnAbilityPhaseStart(  ) end

---[[ OnChannelFinish  Channel finished. ]]
-- @return nil
-- @param interrupted bool
function CDOTA_Item_Lua:OnChannelFinish( interrupted ) end

---[[ OnChannelThink  Channeling is taking place. ]]
-- @return nil
-- @param interval float
function CDOTA_Item_Lua:OnChannelThink( interval ) end

---[[ OnChargeCountChanged  Runs when item's charge count changes. ]]
-- @return nil
function CDOTA_Item_Lua:OnChargeCountChanged(  ) end

---[[ OnHeroCalculateStatBonus  Caster (hero only) gained a level, skilled an ability, or received a new stat bonus. ]]
-- @return nil
function CDOTA_Item_Lua:OnHeroCalculateStatBonus(  ) end

---[[ OnHeroDiedNearby  A hero has died in the vicinity (ie Urn), takes table of params. ]]
-- @return nil
-- @param unit CDOTA_BaseNPC
-- @param attacker CDOTA_BaseNPC
-- @param event table
function CDOTA_Item_Lua:OnHeroDiedNearby( unit, attacker, event ) end

---[[ OnHeroLevelUp  Caster gained a level. ]]
-- @return nil
function CDOTA_Item_Lua:OnHeroLevelUp(  ) end

---[[ OnInventoryContentsChanged  Caster inventory changed. ]]
-- @return nil
function CDOTA_Item_Lua:OnInventoryContentsChanged(  ) end

---[[ OnItemEquipped  Caster equipped item. ]]
-- @return nil
-- @param item CDOTA_Item
function CDOTA_Item_Lua:OnItemEquipped( item ) end

---[[ OnOwnerDied  Caster died. ]]
-- @return nil
function CDOTA_Item_Lua:OnOwnerDied(  ) end

---[[ OnOwnerSpawned  Caster respawned or spawned for the first time. ]]
-- @return nil
function CDOTA_Item_Lua:OnOwnerSpawned(  ) end

---[[ OnProjectileHit  Projectile has collided with a given target or reached its destination. If 'true` is returned, projectile would be destroyed. ]]
-- @return bool
-- @param target CDOTA_BaseNPC
-- @param location Vector
function CDOTA_Item_Lua:OnProjectileHit( target, location ) end

---[[ OnProjectileThink  Projectile is actively moving. ]]
-- @return nil
-- @param location Vector
function CDOTA_Item_Lua:OnProjectileThink( location ) end

---[[ OnSpellStart  Cast time finished, spell effects begin. ]]
-- @return nil
function CDOTA_Item_Lua:OnSpellStart(  ) end

---[[ OnStolen  Special behavior when stolen by Spell Steal. ]]
-- @return nil
-- @param sourceAbility CDOTABaseAbility
function CDOTA_Item_Lua:OnStolen( sourceAbility ) end

---[[ OnToggle  Ability is toggled on/off. ]]
-- @return nil
function CDOTA_Item_Lua:OnToggle(  ) end

---[[ OnUnStolen  Special behavior when lost by Spell Steal. ]]
-- @return nil
function CDOTA_Item_Lua:OnUnStolen(  ) end

---[[ OnUpgrade  Ability gained a level. ]]
-- @return nil
function CDOTA_Item_Lua:OnUpgrade(  ) end

---[[ ProcsMagicStick  Returns true if this ability will generate magic stick charges for nearby enemies. ]]
-- @return bool
function CDOTA_Item_Lua:ProcsMagicStick(  ) end

---[[ SpeakTrigger  Return the type of speech used. ]]
-- @return int
function CDOTA_Item_Lua:SpeakTrigger(  ) end

---[[ Precache   ]]
-- @return nil
-- @param context CScriptPrecacheContext
function CDOTA_Item_Lua:Precache( context ) end

---[[ Spawn  Called when ability entity is created, after Init. ]]
-- @return nil
function CDOTA_Item_Lua:Spawn(  ) end

---[[ GetContainedItem  Returned the contained item. ]]
-- @return CDOTA_Item
function CDOTA_Item_Physical:GetContainedItem(  ) end

---[[ GetCreationTime  Returns the game time when this item was created in the world. ]]
-- @return float
function CDOTA_Item_Physical:GetCreationTime(  ) end

---[[ IsLoot  Is this drop flagged as a loot drop? ]]
-- @return bool
function CDOTA_Item_Physical:IsLoot(  ) end

---[[ SetContainedItem  Set the contained item. ]]
-- @return nil
-- @param item CDOTA_Item
function CDOTA_Item_Physical:SetContainedItem( item ) end

---[[ SetIsLoot  Set if this drop is flagged as a loot drop. ]]
-- @return nil
-- @param isLoot bool
function CDOTA_Item_Physical:SetIsLoot( isLoot ) end

---[[ GetItemName  Returns the item name. ]]
-- @return string
function CDOTA_ItemSpawner:GetItemName(  ) end

---[[ CutDown  Cuts down this tree. ]]
-- @return nil
-- @param teamNumberKnownTo int
function CDOTA_MapTree:CutDown( teamNumberKnownTo ) end

---[[ CutDownRegrowAfter  Cuts down this tree. ]]
-- @return nil
-- @param regrowAfter float
-- @param teamNumberKnownTo int
function CDOTA_MapTree:CutDownRegrowAfter( regrowAfter, teamNumberKnownTo ) end

---[[ GrowBack  Grows back the tree if it was cut down. ]]
-- @return nil
function CDOTA_MapTree:GrowBack(  ) end

---[[ IsStanding  Returns true if the tree is standing, false if it has been cut down. ]]
-- @return bool
function CDOTA_MapTree:IsStanding(  ) end

---[[ AllowIllusionDuplicate  True/false if this modifier is active on illusions. ]]
-- @return bool
function CDOTA_Modifier_Lua:AllowIllusionDuplicate(  ) end

---[[ CanParentBeAutoAttacked   ]]
-- @return bool
function CDOTA_Modifier_Lua:CanParentBeAutoAttacked(  ) end

---[[ DestroyOnExpire  True/false if this buff is removed when the duration expires. ]]
-- @return bool
function CDOTA_Modifier_Lua:DestroyOnExpire(  ) end

---[[ GetAttributes  Return the types of attributes applied to this modifier. ]]
-- @return DOTAModifierAttribute_t
function CDOTA_Modifier_Lua:GetAttributes(  ) end

---[[ GetAuraDuration  Returns aura stickiness. ]]
-- @return float
function CDOTA_Modifier_Lua:GetAuraDuration(  ) end

---[[ GetAuraEntityReject  Return true/false if this entity should receive the aura under specific conditions. ]]
-- @return bool
-- @param entity CDOTA_BaseNPC
function CDOTA_Modifier_Lua:GetAuraEntityReject( entity ) end

---[[ GetAuraRadius  Return the range around the parent this aura tries to apply its buff. ]]
-- @return float
function CDOTA_Modifier_Lua:GetAuraRadius(  ) end

---[[ GetAuraSearchFlags  Return the unit flags this aura respects when placing buffs. ]]
-- @return DOTA_UNIT_TARGET_FLAGS
function CDOTA_Modifier_Lua:GetAuraSearchFlags(  ) end

---[[ GetAuraSearchTeam  Return the teams this aura applies its buff to. ]]
-- @return DOTA_UNIT_TARGET_TEAM
function CDOTA_Modifier_Lua:GetAuraSearchTeam(  ) end

---[[ GetAuraSearchType  Return the unit classifications this aura applies its buff to. ]]
-- @return DOTA_UNIT_TARGET_TYPE
function CDOTA_Modifier_Lua:GetAuraSearchType(  ) end

---[[ GetCritDamage  A Modifier that listens to MODIFIER_PROPERTY_PREATTACK_CRITICALSTRIKE has to have a GetCritDamage implementation so we can know when to evaluate it. Value should be in 'times the original value format' e.g: 1.5 not 150. ]]
-- @return float
function CDOTA_Modifier_Lua:GetCritDamage(  ) end

---[[ GetEffectAttachType  Return the attach type of the particle system from GetEffectName. ]]
-- @return ParticleAttachment_t
function CDOTA_Modifier_Lua:GetEffectAttachType(  ) end

---[[ GetEffectName  Return the name of the particle system that is created while this modifier is active. ]]
-- @return string
function CDOTA_Modifier_Lua:GetEffectName(  ) end

---[[ GetHeroEffectName  Return the name of the hero effect particle system that is created while this modifier is active. ]]
-- @return string
function CDOTA_Modifier_Lua:GetHeroEffectName(  ) end

---[[ GetModifierAura  The name of the secondary modifier that will be applied by this modifier (if it is an aura). ]]
-- @return string
function CDOTA_Modifier_Lua:GetModifierAura(  ) end

---[[ GetPriority  Return the priority order this modifier will be applied over others. ]]
-- @return modifierpriority
function CDOTA_Modifier_Lua:GetPriority(  ) end

---[[ GetStatusEffectName  Return the name of the status effect particle system that is created while this modifier is active. ]]
-- @return string
function CDOTA_Modifier_Lua:GetStatusEffectName(  ) end

---[[ GetTexture  Return the name of the buff icon to be shown for this modifier. ]]
-- @return string
function CDOTA_Modifier_Lua:GetTexture(  ) end

---[[ HeroEffectPriority  Relationship of this hero effect with those from other buffs (higher is more likely to be shown). ]]
-- @return modifierpriority
function CDOTA_Modifier_Lua:HeroEffectPriority(  ) end

---[[ IsAura  True/false if this modifier is an aura. ]]
-- @return bool
function CDOTA_Modifier_Lua:IsAura(  ) end

---[[ IsAuraActiveOnDeath  True/false if this aura provides buffs when the parent is dead. ]]
-- @return bool
function CDOTA_Modifier_Lua:IsAuraActiveOnDeath(  ) end

---[[ IsDebuff  True/false if this modifier should be displayed as a debuff. ]]
-- @return bool
function CDOTA_Modifier_Lua:IsDebuff(  ) end

---[[ IsHidden  True/false if this modifier should be displayed on the buff bar. ]]
-- @return bool
function CDOTA_Modifier_Lua:IsHidden(  ) end

---[[ IsPermanent   ]]
-- @return bool
function CDOTA_Modifier_Lua:IsPermanent(  ) end

---[[ IsPurgable  True/false if this modifier can be purged. ]]
-- @return bool
function CDOTA_Modifier_Lua:IsPurgable(  ) end

---[[ IsPurgeException  True/false if this modifier can be purged by strong dispels. ]]
-- @return bool
function CDOTA_Modifier_Lua:IsPurgeException(  ) end

---[[ IsStunDebuff  True/false if this modifier is considered a stun for purge reasons. ]]
-- @return bool
function CDOTA_Modifier_Lua:IsStunDebuff(  ) end

---[[ OnCreated  Runs when the modifier is created. ]]
-- @return nil
-- @param params table
function CDOTA_Modifier_Lua:OnCreated( params ) end

---[[ OnDestroy  Runs when the modifier is destroyed (after unit loses modifier). ]]
-- @return nil
function CDOTA_Modifier_Lua:OnDestroy(  ) end

---[[ OnIntervalThink  Runs when the think interval occurs. ]]
-- @return nil
function CDOTA_Modifier_Lua:OnIntervalThink(  ) end

---[[ OnRefresh  Runs when the modifier is refreshed. ]]
-- @return nil
-- @param params table
function CDOTA_Modifier_Lua:OnRefresh( params ) end

---[[ OnRemoved  Runs when the modifier is destroyed (before unit loses modifier). ]]
-- @return nil
-- @param death bool
function CDOTA_Modifier_Lua:OnRemoved( death ) end

---[[ OnStackCountChanged  Runs when stack count changes (param is old count). ]]
-- @return nil
-- @param stackCount int
function CDOTA_Modifier_Lua:OnStackCountChanged( stackCount ) end

---[[ RemoveOnDeath  True/false if this modifier is removed when the parent dies. ]]
-- @return bool
function CDOTA_Modifier_Lua:RemoveOnDeath(  ) end

---[[ SetHasCustomTransmitterData   ]]
-- @return nil
-- @param hasCustomData bool
function CDOTA_Modifier_Lua:SetHasCustomTransmitterData( hasCustomData ) end

---[[ ShouldUseOverheadOffset  Apply the overhead offset to the attached effect. ]]
-- @return bool
function CDOTA_Modifier_Lua:ShouldUseOverheadOffset(  ) end

---[[ StatusEffectPriority  Relationship of this status effect with those from other buffs (higher is more likely to be shown). ]]
-- @return modifierpriority
function CDOTA_Modifier_Lua:StatusEffectPriority(  ) end

---[[ BotAttackScoreBonus   ]]
-- @return nil
function CDOTA_Modifier_Lua:BotAttackScoreBonus(  ) end

---[[ CheckState  Return a map of enabled/disabled states. ]]
-- @return [object Object]
function CDOTA_Modifier_Lua:CheckState(  ) end

---[[ DeclareFunctions  Return a list of modifier functions this modifier implements. ]]
-- @return [object Object]
function CDOTA_Modifier_Lua:DeclareFunctions(  ) end

---[[ GetAbsoluteNoDamageMagical   ]]
-- @return [object Object]
-- @param event ModifierAttackEvent
function CDOTA_Modifier_Lua:GetAbsoluteNoDamageMagical( event ) end

---[[ GetAbsoluteNoDamagePhysical   ]]
-- @return [object Object]
-- @param event ModifierAttackEvent
function CDOTA_Modifier_Lua:GetAbsoluteNoDamagePhysical( event ) end

---[[ GetAbsoluteNoDamagePure   ]]
-- @return [object Object]
-- @param event ModifierAttackEvent
function CDOTA_Modifier_Lua:GetAbsoluteNoDamagePure( event ) end

---[[ GetAbsorbSpell   ]]
-- @return [object Object]
-- @param event ModifierAbilityEvent
function CDOTA_Modifier_Lua:GetAbsorbSpell( event ) end

---[[ GetActivityTranslationModifiers   ]]
-- @return string
function CDOTA_Modifier_Lua:GetActivityTranslationModifiers(  ) end

---[[ GetAllowEtherealAttack   ]]
-- @return nil
function CDOTA_Modifier_Lua:GetAllowEtherealAttack(  ) end

---[[ GetAlwaysAllowAttack   ]]
-- @return [object Object]
function CDOTA_Modifier_Lua:GetAlwaysAllowAttack(  ) end

---[[ GetAlwaysAutoAttackWhileHoldPosition   ]]
-- @return nil
function CDOTA_Modifier_Lua:GetAlwaysAutoAttackWhileHoldPosition(  ) end

---[[ GetAttackSound   ]]
-- @return string
function CDOTA_Modifier_Lua:GetAttackSound(  ) end

---[[ GetBaseAttackPostBonus   ]]
-- @return nil
function CDOTA_Modifier_Lua:GetBaseAttackPostBonus(  ) end

---[[ GetBonusDayVision   ]]
-- @return float
function CDOTA_Modifier_Lua:GetBonusDayVision(  ) end

---[[ GetBonusDayVisionPercentage   ]]
-- @return nil
function CDOTA_Modifier_Lua:GetBonusDayVisionPercentage(  ) end

---[[ GetBonusNightVision   ]]
-- @return float
function CDOTA_Modifier_Lua:GetBonusNightVision(  ) end

---[[ GetBonusNightVisionUnique   ]]
-- @return float
function CDOTA_Modifier_Lua:GetBonusNightVisionUnique(  ) end

---[[ GetBonusVisionPercentage   ]]
-- @return float
function CDOTA_Modifier_Lua:GetBonusVisionPercentage(  ) end

---[[ GetBuffAmplification   ]]
-- @return nil
function CDOTA_Modifier_Lua:GetBuffAmplification(  ) end

---[[ GetConvertAttackPhysicalToPure   ]]
-- @return nil
function CDOTA_Modifier_Lua:GetConvertAttackPhysicalToPure(  ) end

---[[ GetCriticalStrikeBonus   ]]
-- @return nil
function CDOTA_Modifier_Lua:GetCriticalStrikeBonus(  ) end

---[[ GetDisableAutoAttack   ]]
-- @return [object Object]
function CDOTA_Modifier_Lua:GetDisableAutoAttack(  ) end

---[[ GetDisableHealing   ]]
-- @return [object Object]
function CDOTA_Modifier_Lua:GetDisableHealing(  ) end

---[[ GetDisableManaGain   ]]
-- @return nil
function CDOTA_Modifier_Lua:GetDisableManaGain(  ) end

---[[ GetFixedDayVision   ]]
-- @return float
function CDOTA_Modifier_Lua:GetFixedDayVision(  ) end

---[[ GetFixedNightVision   ]]
-- @return float
function CDOTA_Modifier_Lua:GetFixedNightVision(  ) end

---[[ GetForceDrawOnMinimap   ]]
-- @return [object Object]
function CDOTA_Modifier_Lua:GetForceDrawOnMinimap(  ) end

---[[ GetIsIllusion   ]]
-- @return [object Object]
function CDOTA_Modifier_Lua:GetIsIllusion(  ) end

---[[ GetMagicalArmorPiercingPercentageTarget   ]]
-- @return nil
function CDOTA_Modifier_Lua:GetMagicalArmorPiercingPercentageTarget(  ) end

---[[ GetMinHealth   ]]
-- @return float
function CDOTA_Modifier_Lua:GetMinHealth(  ) end

---[[ GetMinMana   ]]
-- @return nil
function CDOTA_Modifier_Lua:GetMinMana(  ) end

---[[ GetModifierAbilityLayout   ]]
-- @return float
function CDOTA_Modifier_Lua:GetModifierAbilityLayout(  ) end

---[[ GetModifierAbilityPoints   ]]
-- @return nil
function CDOTA_Modifier_Lua:GetModifierAbilityPoints(  ) end

---[[ GetModifierAdditionalNutralItemDrops   ]]
-- @return nil
function CDOTA_Modifier_Lua:GetModifierAdditionalNutralItemDrops(  ) end

---[[ GetModifierAoEBonusConstant   ]]
-- @return nil
function CDOTA_Modifier_Lua:GetModifierAoEBonusConstant(  ) end

---[[ GetModifierAoEBonusConstantStacking   ]]
-- @return nil
function CDOTA_Modifier_Lua:GetModifierAoEBonusConstantStacking(  ) end

---[[ GetModifierAoEBonusPercentage   ]]
-- @return float
function CDOTA_Modifier_Lua:GetModifierAoEBonusPercentage(  ) end

---[[ GetModifierAttackHeightBonus   ]]
-- @return nil
function CDOTA_Modifier_Lua:GetModifierAttackHeightBonus(  ) end

---[[ GetModifierAttackPointConstant   ]]
-- @return float
function CDOTA_Modifier_Lua:GetModifierAttackPointConstant(  ) end

---[[ GetModifierAttackRangeBonus   ]]
-- @return float
function CDOTA_Modifier_Lua:GetModifierAttackRangeBonus(  ) end

---[[ GetModifierAttackRangeBonusPercentage   ]]
-- @return float
function CDOTA_Modifier_Lua:GetModifierAttackRangeBonusPercentage(  ) end

---[[ GetModifierAttackRangeBonusUnique   ]]
-- @return float
function CDOTA_Modifier_Lua:GetModifierAttackRangeBonusUnique(  ) end

---[[ GetModifierAttackRangeOverride   ]]
-- @return float
function CDOTA_Modifier_Lua:GetModifierAttackRangeOverride(  ) end

---[[ GetModifierAttackSpeed_Limit   ]]
-- @return nil
function CDOTA_Modifier_Lua:GetModifierAttackSpeed_Limit(  ) end

---[[ GetModifierAttackSpeedAbsoluteMax   ]]
-- @return nil
function CDOTA_Modifier_Lua:GetModifierAttackSpeedAbsoluteMax(  ) end

---[[ GetModifierAttackSpeedBaseOverride   ]]
-- @return float
function CDOTA_Modifier_Lua:GetModifierAttackSpeedBaseOverride(  ) end

---[[ GetModifierAttackSpeedBonus_Constant   ]]
-- @return float
function CDOTA_Modifier_Lua:GetModifierAttackSpeedBonus_Constant(  ) end

---[[ GetModifierAttackSpeedPercentage   ]]
-- @return float
function CDOTA_Modifier_Lua:GetModifierAttackSpeedPercentage(  ) end

---[[ GetModifierAttackSpeedReductionPercentage   ]]
-- @return float
function CDOTA_Modifier_Lua:GetModifierAttackSpeedReductionPercentage(  ) end

---[[ GetModifierAvoidAttackProcs   ]]
-- @return nil
function CDOTA_Modifier_Lua:GetModifierAvoidAttackProcs(  ) end

---[[ GetModifierAvoidDamage   ]]
-- @return float
-- @param event ModifierAttackEvent
function CDOTA_Modifier_Lua:GetModifierAvoidDamage( event ) end

---[[ GetModifierAvoidDamageAfterReductions   ]]
-- @return float
-- @param event ModifierAttackEvent
function CDOTA_Modifier_Lua:GetModifierAvoidDamageAfterReductions( event ) end

---[[ GetModifierAvoidSpell   ]]
-- @return [object Object]
-- @param event ModifierAttackEvent
function CDOTA_Modifier_Lua:GetModifierAvoidSpell( event ) end

---[[ GetModifierBaseArmorPerAgiBonusPercentage   ]]
-- @return nil
function CDOTA_Modifier_Lua:GetModifierBaseArmorPerAgiBonusPercentage(  ) end

---[[ GetModifierBaseAttack_BonusDamage   ]]
-- @return float
function CDOTA_Modifier_Lua:GetModifierBaseAttack_BonusDamage(  ) end

---[[ GetModifierBaseAttackSpeedPerAgiBonusPercentage   ]]
-- @return nil
function CDOTA_Modifier_Lua:GetModifierBaseAttackSpeedPerAgiBonusPercentage(  ) end

---[[ GetModifierBaseAttackTimeConstant   ]]
-- @return float
function CDOTA_Modifier_Lua:GetModifierBaseAttackTimeConstant(  ) end

---[[ GetModifierBaseAttackTimeConstant_Adjust   ]]
-- @return float
function CDOTA_Modifier_Lua:GetModifierBaseAttackTimeConstant_Adjust(  ) end

---[[ GetModifierBaseAttackTimePercentage   ]]
-- @return float
function CDOTA_Modifier_Lua:GetModifierBaseAttackTimePercentage(  ) end

---[[ GetModifierBaseDamageOutgoing_Percentage   ]]
-- @return float
-- @param event ModifierAttackEvent
function CDOTA_Modifier_Lua:GetModifierBaseDamageOutgoing_Percentage( event ) end

---[[ GetModifierBaseDamageOutgoing_PercentageUnique   ]]
-- @return float
-- @param event ModifierAttackEvent
function CDOTA_Modifier_Lua:GetModifierBaseDamageOutgoing_PercentageUnique( event ) end

---[[ GetModifierBaseHpRegenPerStrBonusPercentage   ]]
-- @return nil
function CDOTA_Modifier_Lua:GetModifierBaseHpRegenPerStrBonusPercentage(  ) end

---[[ GetModifierBaseMagicResistPerIntBonusPercentage   ]]
-- @return nil
function CDOTA_Modifier_Lua:GetModifierBaseMagicResistPerIntBonusPercentage(  ) end

---[[ GetModifierBaseManaRegenPerIntBonusPercentage   ]]
-- @return nil
function CDOTA_Modifier_Lua:GetModifierBaseManaRegenPerIntBonusPercentage(  ) end

---[[ GetModifierBaseRegen   ]]
-- @return float
function CDOTA_Modifier_Lua:GetModifierBaseRegen(  ) end

---[[ GetModifierBecomeAgility   ]]
-- @return nil
function CDOTA_Modifier_Lua:GetModifierBecomeAgility(  ) end

---[[ GetModifierBecomeIntelligence   ]]
-- @return nil
function CDOTA_Modifier_Lua:GetModifierBecomeIntelligence(  ) end

---[[ GetModifierBecomeStrength   ]]
-- @return nil
function CDOTA_Modifier_Lua:GetModifierBecomeStrength(  ) end

---[[ GetModifierBecomeUniversal   ]]
-- @return [object Object]
function CDOTA_Modifier_Lua:GetModifierBecomeUniversal(  ) end

---[[ GetModifierBonusDamageOutgoing_Percentage   ]]
-- @return nil
function CDOTA_Modifier_Lua:GetModifierBonusDamageOutgoing_Percentage(  ) end

---[[ GetModifierBonusLotusHeal   ]]
-- @return nil
function CDOTA_Modifier_Lua:GetModifierBonusLotusHeal(  ) end

---[[ GetModifierBonusStats_Agility   ]]
-- @return float
function CDOTA_Modifier_Lua:GetModifierBonusStats_Agility(  ) end

---[[ GetModifierBonusStats_Agility_Percentage   ]]
-- @return float
function CDOTA_Modifier_Lua:GetModifierBonusStats_Agility_Percentage(  ) end

---[[ GetModifierBonusStats_Intellect   ]]
-- @return float
function CDOTA_Modifier_Lua:GetModifierBonusStats_Intellect(  ) end

---[[ GetModifierBonusStats_Intellect_Percentage   ]]
-- @return float
function CDOTA_Modifier_Lua:GetModifierBonusStats_Intellect_Percentage(  ) end

---[[ GetModifierBonusStats_Strength   ]]
-- @return float
function CDOTA_Modifier_Lua:GetModifierBonusStats_Strength(  ) end

---[[ GetModifierBonusStats_Strength_Percentage   ]]
-- @return float
function CDOTA_Modifier_Lua:GetModifierBonusStats_Strength_Percentage(  ) end

---[[ GetModifierBonusUphillMissChance   ]]
-- @return nil
function CDOTA_Modifier_Lua:GetModifierBonusUphillMissChance(  ) end

---[[ GetModifierBuybackPenaltyPercent   ]]
-- @return nil
function CDOTA_Modifier_Lua:GetModifierBuybackPenaltyPercent(  ) end

---[[ GetModifierCanAttackTrees   ]]
-- @return [object Object]
function CDOTA_Modifier_Lua:GetModifierCanAttackTrees(  ) end

---[[ GetModifierCastRangeBonus   ]]
-- @return float
-- @param event ModifierAbilityEvent
function CDOTA_Modifier_Lua:GetModifierCastRangeBonus( event ) end

---[[ GetModifierCastRangeBonusPercentage   ]]
-- @return float
-- @param event ModifierAbilityEvent
function CDOTA_Modifier_Lua:GetModifierCastRangeBonusPercentage( event ) end

---[[ GetModifierCastRangeBonusStacking   ]]
-- @return float
-- @param event ModifierAbilityEvent
function CDOTA_Modifier_Lua:GetModifierCastRangeBonusStacking( event ) end

---[[ GetModifierCastRangeBonusTarget   ]]
-- @return float
-- @param event ModifierAbilityEvent
function CDOTA_Modifier_Lua:GetModifierCastRangeBonusTarget( event ) end

---[[ GetModifierChangeAbilityValue   ]]
-- @return nil
function CDOTA_Modifier_Lua:GetModifierChangeAbilityValue(  ) end

---[[ GetModifierConstantDeathGoldCost   ]]
-- @return float
function CDOTA_Modifier_Lua:GetModifierConstantDeathGoldCost(  ) end

---[[ GetModifierConstantHealthRegen   ]]
-- @return float
function CDOTA_Modifier_Lua:GetModifierConstantHealthRegen(  ) end

---[[ GetModifierConstantManaRegen   ]]
-- @return float
function CDOTA_Modifier_Lua:GetModifierConstantManaRegen(  ) end

---[[ GetModifierConstantManaRegenUnique   ]]
-- @return float
function CDOTA_Modifier_Lua:GetModifierConstantManaRegenUnique(  ) end

---[[ GetModifierConstantRespawnTime   ]]
-- @return float
function CDOTA_Modifier_Lua:GetModifierConstantRespawnTime(  ) end

---[[ GetModifierConvertManaCostToHealthCost   ]]
-- @return nil
function CDOTA_Modifier_Lua:GetModifierConvertManaCostToHealthCost(  ) end

---[[ GetModifierCooldownReduction_Constant   ]]
-- @return float
-- @param event ModifierAbilityEvent
function CDOTA_Modifier_Lua:GetModifierCooldownReduction_Constant( event ) end

---[[ GetModifierCreateBonusIllusionChance   ]]
-- @return nil
function CDOTA_Modifier_Lua:GetModifierCreateBonusIllusionChance(  ) end

---[[ GetModifierCreateBonusIllusionCount   ]]
-- @return nil
function CDOTA_Modifier_Lua:GetModifierCreateBonusIllusionCount(  ) end

---[[ GetModifierCreepDenyPercent   ]]
-- @return nil
function CDOTA_Modifier_Lua:GetModifierCreepDenyPercent(  ) end

---[[ GetModifierDamageOutgoing_Percentage   ]]
-- @return float
-- @param event ModifierAttackEvent
function CDOTA_Modifier_Lua:GetModifierDamageOutgoing_Percentage( event ) end

---[[ GetModifierDamageOutgoing_Percentage_Illusion   ]]
-- @return float
-- @param event ModifierAttackEvent
function CDOTA_Modifier_Lua:GetModifierDamageOutgoing_Percentage_Illusion( event ) end

---[[ GetModifierDamageOutgoing_Percentage_Illusion_Amplify   ]]
-- @return nil
function CDOTA_Modifier_Lua:GetModifierDamageOutgoing_Percentage_Illusion_Amplify(  ) end

---[[ GetModifierDamageOutgoing_PercentageMultiplicative   ]]
-- @return nil
function CDOTA_Modifier_Lua:GetModifierDamageOutgoing_PercentageMultiplicative(  ) end

---[[ GetModifierDisableTurning   ]]
-- @return [object Object]
function CDOTA_Modifier_Lua:GetModifierDisableTurning(  ) end

---[[ GetModifierDisassembleAnything   ]]
-- @return nil
function CDOTA_Modifier_Lua:GetModifierDisassembleAnything(  ) end

---[[ GetModifierDodgeProjectile   ]]
-- @return [object Object]
function CDOTA_Modifier_Lua:GetModifierDodgeProjectile(  ) end

---[[ GetModifierEvasion_Constant   ]]
-- @return float
-- @param event ModifierAttackEvent
function CDOTA_Modifier_Lua:GetModifierEvasion_Constant( event ) end

---[[ GetModifierExtraHealthBonus   ]]
-- @return float
function CDOTA_Modifier_Lua:GetModifierExtraHealthBonus(  ) end

---[[ GetModifierExtraHealthPercentage   ]]
-- @return float
function CDOTA_Modifier_Lua:GetModifierExtraHealthPercentage(  ) end

---[[ GetModifierExtraManaBonus   ]]
-- @return float
function CDOTA_Modifier_Lua:GetModifierExtraManaBonus(  ) end

---[[ GetModifierExtraManaBonusPercentage   ]]
-- @return nil
function CDOTA_Modifier_Lua:GetModifierExtraManaBonusPercentage(  ) end

---[[ GetModifierExtraManaPercentage   ]]
-- @return nil
function CDOTA_Modifier_Lua:GetModifierExtraManaPercentage(  ) end

---[[ GetModifierExtraStrengthBonus   ]]
-- @return float
function CDOTA_Modifier_Lua:GetModifierExtraStrengthBonus(  ) end

---[[ GetModifierFixedAttackRate   ]]
-- @return float
function CDOTA_Modifier_Lua:GetModifierFixedAttackRate(  ) end

---[[ GetModifierFixedManaRegen   ]]
-- @return nil
function CDOTA_Modifier_Lua:GetModifierFixedManaRegen(  ) end

---[[ GetModifierForceMaxHealth   ]]
-- @return nil
function CDOTA_Modifier_Lua:GetModifierForceMaxHealth(  ) end

---[[ GetModifierForceMaxMana   ]]
-- @return nil
function CDOTA_Modifier_Lua:GetModifierForceMaxMana(  ) end

---[[ GetModifierFoWTeam   ]]
-- @return nil
function CDOTA_Modifier_Lua:GetModifierFoWTeam(  ) end

---[[ GetModifierHasBonusNeutralItemChoice   ]]
-- @return nil
function CDOTA_Modifier_Lua:GetModifierHasBonusNeutralItemChoice(  ) end

---[[ GetModifierHealAmplify_PercentageSource   ]]
-- @return nil
function CDOTA_Modifier_Lua:GetModifierHealAmplify_PercentageSource(  ) end

---[[ GetModifierHealAmplify_PercentageTarget   ]]
-- @return nil
function CDOTA_Modifier_Lua:GetModifierHealAmplify_PercentageTarget(  ) end

---[[ GetModifierHealthBarPips  Return value is a count of pips. ]]
-- @return float
-- @param event ModifierAttackEvent
function CDOTA_Modifier_Lua:GetModifierHealthBarPips( event ) end

---[[ GetModifierHealthBonus   ]]
-- @return float
function CDOTA_Modifier_Lua:GetModifierHealthBonus(  ) end

---[[ GetModifierHealthcostReduction_Constant   ]]
-- @return nil
function CDOTA_Modifier_Lua:GetModifierHealthcostReduction_Constant(  ) end

---[[ GetModifierHealthRegenPercentage   ]]
-- @return float
function CDOTA_Modifier_Lua:GetModifierHealthRegenPercentage(  ) end

---[[ GetModifierHealthRegenPercentageUnique   ]]
-- @return float
function CDOTA_Modifier_Lua:GetModifierHealthRegenPercentageUnique(  ) end

---[[ GetModifierHeroFacetOverride   ]]
-- @return nil
function CDOTA_Modifier_Lua:GetModifierHeroFacetOverride(  ) end

---[[ GetModifierHeroLevelScale   ]]
-- @return nil
function CDOTA_Modifier_Lua:GetModifierHeroLevelScale(  ) end

---[[ GetModifierHPRegenAmplify_Percentage   ]]
-- @return float
function CDOTA_Modifier_Lua:GetModifierHPRegenAmplify_Percentage(  ) end

---[[ GetModifierHPRegenMultiplierPreAmplification   ]]
-- @return nil
function CDOTA_Modifier_Lua:GetModifierHPRegenMultiplierPreAmplification(  ) end

---[[ GetModifierIgnoreCastAngle   ]]
-- @return [object Object]
function CDOTA_Modifier_Lua:GetModifierIgnoreCastAngle(  ) end

---[[ GetModifierIgnoreCooldown   ]]
-- @return [object Object]
function CDOTA_Modifier_Lua:GetModifierIgnoreCooldown(  ) end

---[[ GetModifierIgnoreMovespeedLimit   ]]
-- @return [object Object]
function CDOTA_Modifier_Lua:GetModifierIgnoreMovespeedLimit(  ) end

---[[ GetModifierIgnorePhysicalArmor   ]]
-- @return float
-- @param event ModifierAttackEvent
function CDOTA_Modifier_Lua:GetModifierIgnorePhysicalArmor( event ) end

---[[ GetModifierIllusionLabel   ]]
-- @return [object Object]
function CDOTA_Modifier_Lua:GetModifierIllusionLabel(  ) end

---[[ GetModifierIncomingDamage_Percentage   ]]
-- @return float
-- @param event ModifierAttackEvent
function CDOTA_Modifier_Lua:GetModifierIncomingDamage_Percentage( event ) end

---[[ GetModifierIncomingDamageConstant  This property controls 'universal' shield, if defined both on client and server. Return value on client should be current shield health, as a positive integer, on server - amount of damage blocked. ]]
-- @return float
-- @param event ModifierAttackEvent
function CDOTA_Modifier_Lua:GetModifierIncomingDamageConstant( event ) end

---[[ GetModifierIncomingPhysicalDamage_Percentage   ]]
-- @return float
-- @param event ModifierAttackEvent
function CDOTA_Modifier_Lua:GetModifierIncomingPhysicalDamage_Percentage( event ) end

---[[ GetModifierIncomingPhysicalDamageConstant  This property controls 'physical' shield, if defined both on client and server. Return value on client should be current shield health, as a positive integer, on server - amount of damage blocked. ]]
-- @return float
-- @param event ModifierAttackEvent
function CDOTA_Modifier_Lua:GetModifierIncomingPhysicalDamageConstant( event ) end

---[[ GetModifierIncomingSpellDamageConstant  This property controls 'spell' shield, if defined both on client and server. Return value on client should be current shield health, as a positive integer, on server - amount of damage blocked. ]]
-- @return float
-- @param event ModifierAttackEvent
function CDOTA_Modifier_Lua:GetModifierIncomingSpellDamageConstant( event ) end

---[[ GetModifierInnateDamageBlockPctOverride   ]]
-- @return nil
function CDOTA_Modifier_Lua:GetModifierInnateDamageBlockPctOverride(  ) end

---[[ GetModifierIntellectNone   ]]
-- @return nil
function CDOTA_Modifier_Lua:GetModifierIntellectNone(  ) end

---[[ GetModifierInventorySlotRestricted   ]]
-- @return nil
function CDOTA_Modifier_Lua:GetModifierInventorySlotRestricted(  ) end

---[[ GetModifierInvisibilityAttackBehaviorException   ]]
-- @return nil
function CDOTA_Modifier_Lua:GetModifierInvisibilityAttackBehaviorException(  ) end

---[[ GetModifierInvisibilityLevel   ]]
-- @return float
function CDOTA_Modifier_Lua:GetModifierInvisibilityLevel(  ) end

---[[ GetModifierIsPackRat   ]]
-- @return nil
function CDOTA_Modifier_Lua:GetModifierIsPackRat(  ) end

---[[ GetModifierItemSellbackCost   ]]
-- @return nil
function CDOTA_Modifier_Lua:GetModifierItemSellbackCost(  ) end

---[[ GetModifierKillStreakBonusGoldPercentage   ]]
-- @return nil
function CDOTA_Modifier_Lua:GetModifierKillStreakBonusGoldPercentage(  ) end

---[[ GetModifierKnockbackAmplification_Percentage   ]]
-- @return nil
function CDOTA_Modifier_Lua:GetModifierKnockbackAmplification_Percentage(  ) end

---[[ GetModifierLifestealRegenAmplify_Percentage   ]]
-- @return nil
function CDOTA_Modifier_Lua:GetModifierLifestealRegenAmplify_Percentage(  ) end

---[[ GetModifierMagical_ConstantBlock   ]]
-- @return float
-- @param event ModifierAttackEvent
function CDOTA_Modifier_Lua:GetModifierMagical_ConstantBlock( event ) end

---[[ GetModifierMagicalResistanceBaseReduction   ]]
-- @return nil
function CDOTA_Modifier_Lua:GetModifierMagicalResistanceBaseReduction(  ) end

---[[ GetModifierMagicalResistanceBonus   ]]
-- @return float
-- @param event ModifierAttackEvent
function CDOTA_Modifier_Lua:GetModifierMagicalResistanceBonus( event ) end

---[[ GetModifierMagicalResistanceBonusIllusions   ]]
-- @return nil
function CDOTA_Modifier_Lua:GetModifierMagicalResistanceBonusIllusions(  ) end

---[[ GetModifierMagicalResistanceBonusUnique   ]]
-- @return nil
function CDOTA_Modifier_Lua:GetModifierMagicalResistanceBonusUnique(  ) end

---[[ GetModifierMagicalResistanceDecrepifyUnique   ]]
-- @return float
-- @param event ModifierAttackEvent
function CDOTA_Modifier_Lua:GetModifierMagicalResistanceDecrepifyUnique( event ) end

---[[ GetModifierMagicalResistanceDirectModification   ]]
-- @return float
-- @param event ModifierAttackEvent
function CDOTA_Modifier_Lua:GetModifierMagicalResistanceDirectModification( event ) end

---[[ GetModifierManaBonus   ]]
-- @return float
function CDOTA_Modifier_Lua:GetModifierManaBonus(  ) end

---[[ GetModifierManacostReduction_Constant   ]]
-- @return float
-- @param event ModifierAbilityEvent
function CDOTA_Modifier_Lua:GetModifierManacostReduction_Constant( event ) end

---[[ GetModifierManaDrainAmplify_Percentage   ]]
-- @return nil
function CDOTA_Modifier_Lua:GetModifierManaDrainAmplify_Percentage(  ) end

---[[ GetModifierMaxAttackRange   ]]
-- @return float
function CDOTA_Modifier_Lua:GetModifierMaxAttackRange(  ) end

---[[ GetModifierMinPhysicalArmor   ]]
-- @return nil
function CDOTA_Modifier_Lua:GetModifierMinPhysicalArmor(  ) end

---[[ GetModifierMiss_Percentage   ]]
-- @return float
function CDOTA_Modifier_Lua:GetModifierMiss_Percentage(  ) end

---[[ GetModifierMiss_Percentage_Target   ]]
-- @return nil
function CDOTA_Modifier_Lua:GetModifierMiss_Percentage_Target(  ) end

---[[ GetModifierModelChange   ]]
-- @return string
function CDOTA_Modifier_Lua:GetModifierModelChange(  ) end

---[[ GetModifierModelScale   ]]
-- @return float
function CDOTA_Modifier_Lua:GetModifierModelScale(  ) end

---[[ GetModifierModelScaleAnimateTime   ]]
-- @return nil
function CDOTA_Modifier_Lua:GetModifierModelScaleAnimateTime(  ) end

---[[ GetModifierModelScaleConstant   ]]
-- @return nil
function CDOTA_Modifier_Lua:GetModifierModelScaleConstant(  ) end

---[[ GetModifierModelScaleUseInOutEase   ]]
-- @return nil
function CDOTA_Modifier_Lua:GetModifierModelScaleUseInOutEase(  ) end

---[[ GetModifierMoveSpeed_Absolute   ]]
-- @return float
function CDOTA_Modifier_Lua:GetModifierMoveSpeed_Absolute(  ) end

---[[ GetModifierMoveSpeed_AbsoluteMax   ]]
-- @return nil
function CDOTA_Modifier_Lua:GetModifierMoveSpeed_AbsoluteMax(  ) end

---[[ GetModifierMoveSpeed_AbsoluteMin   ]]
-- @return float
function CDOTA_Modifier_Lua:GetModifierMoveSpeed_AbsoluteMin(  ) end

---[[ GetModifierMoveSpeed_Limit   ]]
-- @return float
function CDOTA_Modifier_Lua:GetModifierMoveSpeed_Limit(  ) end

---[[ GetModifierMoveSpeed_MaxOverride   ]]
-- @return nil
function CDOTA_Modifier_Lua:GetModifierMoveSpeed_MaxOverride(  ) end

---[[ GetModifierMoveSpeed_MinOverride   ]]
-- @return nil
function CDOTA_Modifier_Lua:GetModifierMoveSpeed_MinOverride(  ) end

---[[ GetModifierMoveSpeedBonus_Constant   ]]
-- @return float
function CDOTA_Modifier_Lua:GetModifierMoveSpeedBonus_Constant(  ) end

---[[ GetModifierMoveSpeedBonus_Constant_Unique   ]]
-- @return nil
function CDOTA_Modifier_Lua:GetModifierMoveSpeedBonus_Constant_Unique(  ) end

---[[ GetModifierMoveSpeedBonus_Constant_Unique_2   ]]
-- @return float
function CDOTA_Modifier_Lua:GetModifierMoveSpeedBonus_Constant_Unique_2(  ) end

---[[ GetModifierMoveSpeedBonus_Percentage   ]]
-- @return float
function CDOTA_Modifier_Lua:GetModifierMoveSpeedBonus_Percentage(  ) end

---[[ GetModifierMoveSpeedBonus_Percentage_Unique   ]]
-- @return float
function CDOTA_Modifier_Lua:GetModifierMoveSpeedBonus_Percentage_Unique(  ) end

---[[ GetModifierMoveSpeedBonus_Special_Boots   ]]
-- @return float
function CDOTA_Modifier_Lua:GetModifierMoveSpeedBonus_Special_Boots(  ) end

---[[ GetModifierMoveSpeedBonus_Special_Boots_2   ]]
-- @return float
function CDOTA_Modifier_Lua:GetModifierMoveSpeedBonus_Special_Boots_2(  ) end

---[[ GetModifierMoveSpeedMax_BonusConstant   ]]
-- @return nil
function CDOTA_Modifier_Lua:GetModifierMoveSpeedMax_BonusConstant(  ) end

---[[ GetModifierMoveSpeedOverride   ]]
-- @return float
function CDOTA_Modifier_Lua:GetModifierMoveSpeedOverride(  ) end

---[[ GetModifierMoveSpeedPostMultiplierBonus_Constant    ]]
-- @return nil
function CDOTA_Modifier_Lua:GetModifierMoveSpeedPostMultiplierBonus_Constant (  ) end

---[[ GetModifierMoveSpeedReductionPercentage   ]]
-- @return nil
function CDOTA_Modifier_Lua:GetModifierMoveSpeedReductionPercentage(  ) end

---[[ GetModifierMPRegenAmplify_Percentage   ]]
-- @return float
function CDOTA_Modifier_Lua:GetModifierMPRegenAmplify_Percentage(  ) end

---[[ GetModifierMPRegenAmplify_Percentage_Unique   ]]
-- @return nil
function CDOTA_Modifier_Lua:GetModifierMPRegenAmplify_Percentage_Unique(  ) end

---[[ GetModifierMPRestoreAmplify_Percentage  Total amplify value is clamped to 0. ]]
-- @return float
function CDOTA_Modifier_Lua:GetModifierMPRestoreAmplify_Percentage(  ) end

---[[ GetModifierNegativeEvasion_Constant   ]]
-- @return float
function CDOTA_Modifier_Lua:GetModifierNegativeEvasion_Constant(  ) end

---[[ GetModifierNeutralEnhancementOptions   ]]
-- @return nil
function CDOTA_Modifier_Lua:GetModifierNeutralEnhancementOptions(  ) end

---[[ GetModifierNeutralTrinketOptions   ]]
-- @return nil
function CDOTA_Modifier_Lua:GetModifierNeutralTrinketOptions(  ) end

---[[ GetModifierNoFreeTPScrollOnDeath   ]]
-- @return nil
function CDOTA_Modifier_Lua:GetModifierNoFreeTPScrollOnDeath(  ) end

---[[ GetModifierNoVisionOfAttacker   ]]
-- @return nil
function CDOTA_Modifier_Lua:GetModifierNoVisionOfAttacker(  ) end

---[[ GetModifierOverrideAbilitySpecial   ]]
-- @return [object Object]
-- @param event ModifierOverrideAbilitySpecialEvent
function CDOTA_Modifier_Lua:GetModifierOverrideAbilitySpecial( event ) end

---[[ GetModifierOverrideAbilitySpecialValue   ]]
-- @return float
-- @param event ModifierOverrideAbilitySpecialEvent
function CDOTA_Modifier_Lua:GetModifierOverrideAbilitySpecialValue( event ) end

---[[ GetModifierOverrideAttackDamage   ]]
-- @return float
function CDOTA_Modifier_Lua:GetModifierOverrideAttackDamage(  ) end

---[[ GetModifierOverrideBaseDamage   ]]
-- @return nil
function CDOTA_Modifier_Lua:GetModifierOverrideBaseDamage(  ) end

---[[ GetModifierOverrideCreepBounty   ]]
-- @return nil
function CDOTA_Modifier_Lua:GetModifierOverrideCreepBounty(  ) end

---[[ GetModifierOverrideUntargetableFrom   ]]
-- @return nil
function CDOTA_Modifier_Lua:GetModifierOverrideUntargetableFrom(  ) end

---[[ GetModifierOverrideUntargetableTo   ]]
-- @return nil
function CDOTA_Modifier_Lua:GetModifierOverrideUntargetableTo(  ) end

---[[ GetModifierPercentageAttackAnimTime   ]]
-- @return float
function CDOTA_Modifier_Lua:GetModifierPercentageAttackAnimTime(  ) end

---[[ GetModifierPercentageCasttime   ]]
-- @return float
-- @param event ModifierAbilityEvent
function CDOTA_Modifier_Lua:GetModifierPercentageCasttime( event ) end

---[[ GetModifierPercentageConvertExpToGold   ]]
-- @return nil
function CDOTA_Modifier_Lua:GetModifierPercentageConvertExpToGold(  ) end

---[[ GetModifierPercentageCooldown   ]]
-- @return float
-- @param event ModifierAbilityEvent
function CDOTA_Modifier_Lua:GetModifierPercentageCooldown( event ) end

---[[ GetModifierPercentageCooldownOngoing   ]]
-- @return float
-- @param event ModifierAbilityEvent
function CDOTA_Modifier_Lua:GetModifierPercentageCooldownOngoing( event ) end

---[[ GetModifierPercentageCooldownStacking   ]]
-- @return float
-- @param event ModifierAbilityEvent
function CDOTA_Modifier_Lua:GetModifierPercentageCooldownStacking( event ) end

---[[ GetModifierPercentageDeathGoldCost   ]]
-- @return nil
function CDOTA_Modifier_Lua:GetModifierPercentageDeathGoldCost(  ) end

---[[ GetModifierPercentageExpRateBoost   ]]
-- @return float
function CDOTA_Modifier_Lua:GetModifierPercentageExpRateBoost(  ) end

---[[ GetModifierPercentageGoldRateBoost   ]]
-- @return nil
function CDOTA_Modifier_Lua:GetModifierPercentageGoldRateBoost(  ) end

---[[ GetModifierPercentageHealthcost   ]]
-- @return float
-- @param event ModifierAbilityEvent
function CDOTA_Modifier_Lua:GetModifierPercentageHealthcost( event ) end

---[[ GetModifierPercentageHealthcostStacking   ]]
-- @return float
-- @param event ModifierAbilityEvent
function CDOTA_Modifier_Lua:GetModifierPercentageHealthcostStacking( event ) end

---[[ GetModifierPercentageKillAssistGoldBoost   ]]
-- @return nil
function CDOTA_Modifier_Lua:GetModifierPercentageKillAssistGoldBoost(  ) end

---[[ GetModifierPercentageManacost   ]]
-- @return float
-- @param event ModifierAbilityEvent
function CDOTA_Modifier_Lua:GetModifierPercentageManacost( event ) end

---[[ GetModifierPercentageManacostStacking   ]]
-- @return float
function CDOTA_Modifier_Lua:GetModifierPercentageManacostStacking(  ) end

---[[ GetModifierPercentageRespawnTime   ]]
-- @return float
function CDOTA_Modifier_Lua:GetModifierPercentageRespawnTime(  ) end

---[[ GetModifierPersistentInvisibility   ]]
-- @return float
function CDOTA_Modifier_Lua:GetModifierPersistentInvisibility(  ) end

---[[ GetModifierPhysical_ConstantBlock   ]]
-- @return float
-- @param event ModifierAttackEvent
function CDOTA_Modifier_Lua:GetModifierPhysical_ConstantBlock( event ) end

---[[ GetModifierPhysical_ConstantBlockBonus   ]]
-- @return nil
function CDOTA_Modifier_Lua:GetModifierPhysical_ConstantBlockBonus(  ) end

---[[ GetModifierPhysical_ConstantBlockSpecial   ]]
-- @return float
function CDOTA_Modifier_Lua:GetModifierPhysical_ConstantBlockSpecial(  ) end

---[[ GetModifierPhysical_ConstantBlockUnavoidablePreArmor   ]]
-- @return float
-- @param event ModifierAttackEvent
function CDOTA_Modifier_Lua:GetModifierPhysical_ConstantBlockUnavoidablePreArmor( event ) end

---[[ GetModifierPhysicalArmorBase_Percentage  Values above 100% are ignored. ]]
-- @return float
function CDOTA_Modifier_Lua:GetModifierPhysicalArmorBase_Percentage(  ) end

---[[ GetModifierPhysicalArmorBonus   ]]
-- @return float
-- @param event ModifierAttackEvent
function CDOTA_Modifier_Lua:GetModifierPhysicalArmorBonus( event ) end

---[[ GetModifierPhysicalArmorBonusPost   ]]
-- @return nil
function CDOTA_Modifier_Lua:GetModifierPhysicalArmorBonusPost(  ) end

---[[ GetModifierPhysicalArmorBonusUnique   ]]
-- @return float
-- @param event ModifierAttackEvent
function CDOTA_Modifier_Lua:GetModifierPhysicalArmorBonusUnique( event ) end

---[[ GetModifierPhysicalArmorBonusUniqueActive   ]]
-- @return float
-- @param event ModifierAttackEvent
function CDOTA_Modifier_Lua:GetModifierPhysicalArmorBonusUniqueActive( event ) end

---[[ GetModifierPhysicalArmorTotal_Percentage   ]]
-- @return nil
function CDOTA_Modifier_Lua:GetModifierPhysicalArmorTotal_Percentage(  ) end

---[[ GetModifierPhysicalDamageOutgoing_Percentage   ]]
-- @return nil
function CDOTA_Modifier_Lua:GetModifierPhysicalDamageOutgoing_Percentage(  ) end

---[[ GetModifierPreAttack   ]]
-- @return float
-- @param event ModifierAttackEvent
function CDOTA_Modifier_Lua:GetModifierPreAttack( event ) end

---[[ GetModifierPreAttack_BonusDamage   ]]
-- @return float
function CDOTA_Modifier_Lua:GetModifierPreAttack_BonusDamage(  ) end

---[[ GetModifierPreAttack_BonusDamage_Proc   ]]
-- @return float
function CDOTA_Modifier_Lua:GetModifierPreAttack_BonusDamage_Proc(  ) end

---[[ GetModifierPreAttack_BonusDamage_Target   ]]
-- @return nil
function CDOTA_Modifier_Lua:GetModifierPreAttack_BonusDamage_Target(  ) end

---[[ GetModifierPreAttack_BonusDamagePostCrit   ]]
-- @return float
-- @param event ModifierAttackEvent
function CDOTA_Modifier_Lua:GetModifierPreAttack_BonusDamagePostCrit( event ) end

---[[ GetModifierPreAttack_CriticalStrike   ]]
-- @return float
-- @param event ModifierAttackEvent
function CDOTA_Modifier_Lua:GetModifierPreAttack_CriticalStrike( event ) end

---[[ GetModifierPreAttack_DeadlyBlow   ]]
-- @return nil
function CDOTA_Modifier_Lua:GetModifierPreAttack_DeadlyBlow(  ) end

---[[ GetModifierPreAttack_Target_CriticalStrike   ]]
-- @return float
function CDOTA_Modifier_Lua:GetModifierPreAttack_Target_CriticalStrike(  ) end

---[[ GetModifierPrereduceIncomingDamage_Mult   ]]
-- @return nil
function CDOTA_Modifier_Lua:GetModifierPrereduceIncomingDamage_Mult(  ) end

---[[ GetModifierPreserveNeutralItemPassives   ]]
-- @return nil
function CDOTA_Modifier_Lua:GetModifierPreserveNeutralItemPassives(  ) end

---[[ GetModifierProcAttack_BonusDamage_Magical   ]]
-- @return float
-- @param event ModifierAttackEvent
function CDOTA_Modifier_Lua:GetModifierProcAttack_BonusDamage_Magical( event ) end

---[[ GetModifierProcAttack_BonusDamage_Magical_Target   ]]
-- @return nil
function CDOTA_Modifier_Lua:GetModifierProcAttack_BonusDamage_Magical_Target(  ) end

---[[ GetModifierProcAttack_BonusDamage_Physical   ]]
-- @return float
-- @param event ModifierAttackEvent
function CDOTA_Modifier_Lua:GetModifierProcAttack_BonusDamage_Physical( event ) end

---[[ GetModifierProcAttack_BonusDamage_Pure   ]]
-- @return float
-- @param event ModifierAttackEvent
function CDOTA_Modifier_Lua:GetModifierProcAttack_BonusDamage_Pure( event ) end

---[[ GetModifierProcAttack_ConvertPhysicalToMagical   ]]
-- @return nil
function CDOTA_Modifier_Lua:GetModifierProcAttack_ConvertPhysicalToMagical(  ) end

---[[ GetModifierProcAttack_Feedback   ]]
-- @return float
-- @param event ModifierAttackEvent
function CDOTA_Modifier_Lua:GetModifierProcAttack_Feedback( event ) end

---[[ GetModifierProjectileName   ]]
-- @return string
function CDOTA_Modifier_Lua:GetModifierProjectileName(  ) end

---[[ GetModifierProjectileSpeed   ]]
-- @return float
function CDOTA_Modifier_Lua:GetModifierProjectileSpeed(  ) end

---[[ GetModifierProjectileSpeedBonus   ]]
-- @return float
function CDOTA_Modifier_Lua:GetModifierProjectileSpeedBonus(  ) end

---[[ GetModifierProjectileSpeedBonusPercentage   ]]
-- @return float
function CDOTA_Modifier_Lua:GetModifierProjectileSpeedBonusPercentage(  ) end

---[[ GetModifierProjectileSpeedTarget   ]]
-- @return nil
function CDOTA_Modifier_Lua:GetModifierProjectileSpeedTarget(  ) end

---[[ GetModifierProperty_MagicalLifesteal   ]]
-- @return nil
function CDOTA_Modifier_Lua:GetModifierProperty_MagicalLifesteal(  ) end

---[[ GetModifierProperty_PhysicalLifesteal   ]]
-- @return nil
function CDOTA_Modifier_Lua:GetModifierProperty_PhysicalLifesteal(  ) end

---[[ GetModifierPropertyConsumableUseSpeed   ]]
-- @return nil
function CDOTA_Modifier_Lua:GetModifierPropertyConsumableUseSpeed(  ) end

---[[ GetModifierPropertyForbidIllusions   ]]
-- @return nil
function CDOTA_Modifier_Lua:GetModifierPropertyForbidIllusions(  ) end

---[[ GetModifierPropertyHealingAmplificationUnique   ]]
-- @return nil
function CDOTA_Modifier_Lua:GetModifierPropertyHealingAmplificationUnique(  ) end

---[[ GetModifierPropertyManacostOverride   ]]
-- @return nil
function CDOTA_Modifier_Lua:GetModifierPropertyManacostOverride(  ) end

---[[ GetModifierPropertyRestorationAmplification   ]]
-- @return nil
function CDOTA_Modifier_Lua:GetModifierPropertyRestorationAmplification(  ) end

---[[ GetModifierPropertyRestorationAmplificationUnique   ]]
-- @return nil
function CDOTA_Modifier_Lua:GetModifierPropertyRestorationAmplificationUnique(  ) end

---[[ GetModifierPropertySuppressInvalidMoveAttackOrders   ]]
-- @return nil
function CDOTA_Modifier_Lua:GetModifierPropertySuppressInvalidMoveAttackOrders(  ) end

---[[ GetModifierPropertyUpgradeNeutralArtifacts   ]]
-- @return nil
function CDOTA_Modifier_Lua:GetModifierPropertyUpgradeNeutralArtifacts(  ) end

---[[ GetModifierPropetyFailAttack   ]]
-- @return nil
function CDOTA_Modifier_Lua:GetModifierPropetyFailAttack(  ) end

---[[ GetModifierProvidesFOWVision   ]]
-- @return [object Object]
function CDOTA_Modifier_Lua:GetModifierProvidesFOWVision(  ) end

---[[ GetModifierRadarCooldownReduction   ]]
-- @return float
function CDOTA_Modifier_Lua:GetModifierRadarCooldownReduction(  ) end

---[[ GetModifierScepter  Applies scepter when this property is active ]]
-- @return [object Object]
function CDOTA_Modifier_Lua:GetModifierScepter(  ) end

---[[ GetModifierShard  Applies shard when this property is active ]]
-- @return [object Object]
function CDOTA_Modifier_Lua:GetModifierShard(  ) end

---[[ GetModifierShareXPRune   ]]
-- @return nil
function CDOTA_Modifier_Lua:GetModifierShareXPRune(  ) end

---[[ GetModifierSlowResistance_Stacking   ]]
-- @return nil
function CDOTA_Modifier_Lua:GetModifierSlowResistance_Stacking(  ) end

---[[ GEtModifierSlowResistance_Unique   ]]
-- @return nil
function CDOTA_Modifier_Lua:GEtModifierSlowResistance_Unique(  ) end

---[[ GetModifierSlowResistanceAppliesToAttacks   ]]
-- @return nil
function CDOTA_Modifier_Lua:GetModifierSlowResistanceAppliesToAttacks(  ) end

---[[ GetModifierSpellAmplify_Percentage   ]]
-- @return float
-- @param event ModifierAttackEvent
function CDOTA_Modifier_Lua:GetModifierSpellAmplify_Percentage( event ) end

---[[ GetModifierSpellAmplify_PercentageTarget   ]]
-- @return nil
function CDOTA_Modifier_Lua:GetModifierSpellAmplify_PercentageTarget(  ) end

---[[ GetModifierSpellAmplify_PercentageUnique   ]]
-- @return float
function CDOTA_Modifier_Lua:GetModifierSpellAmplify_PercentageUnique(  ) end

---[[ GetModifierSpellLifestealRegenAmplify_Percentage   ]]
-- @return nil
function CDOTA_Modifier_Lua:GetModifierSpellLifestealRegenAmplify_Percentage(  ) end

---[[ GetModifierSpellLifestealRegenAmplify_Percentage_Unique   ]]
-- @return nil
function CDOTA_Modifier_Lua:GetModifierSpellLifestealRegenAmplify_Percentage_Unique(  ) end

---[[ GetModifierSpellRedirectTarget   ]]
-- @return nil
function CDOTA_Modifier_Lua:GetModifierSpellRedirectTarget(  ) end

---[[ GetModifierSpellsRequireHP   ]]
-- @return float
function CDOTA_Modifier_Lua:GetModifierSpellsRequireHP(  ) end

---[[ GetModifierStackingRespawnTime   ]]
-- @return float
function CDOTA_Modifier_Lua:GetModifierStackingRespawnTime(  ) end

---[[ GetModifierStatusResistance   ]]
-- @return float
function CDOTA_Modifier_Lua:GetModifierStatusResistance(  ) end

---[[ GetModifierStatusResistanceCaster   ]]
-- @return float
-- @param event ModifierUnitEvent
function CDOTA_Modifier_Lua:GetModifierStatusResistanceCaster( event ) end

---[[ GetModifierStatusResistanceStacking   ]]
-- @return float
function CDOTA_Modifier_Lua:GetModifierStatusResistanceStacking(  ) end

---[[ GetModifierStrongIllusion   ]]
-- @return nil
function CDOTA_Modifier_Lua:GetModifierStrongIllusion(  ) end

---[[ GetModifierSuperIllusion   ]]
-- @return [object Object]
function CDOTA_Modifier_Lua:GetModifierSuperIllusion(  ) end

---[[ GetModifierSuperIllusionWithItems   ]]
-- @return nil
function CDOTA_Modifier_Lua:GetModifierSuperIllusionWithItems(  ) end

---[[ GetModifierSuperIllusionWithUltimate   ]]
-- @return [object Object]
function CDOTA_Modifier_Lua:GetModifierSuperIllusionWithUltimate(  ) end

---[[ GetModifierSuppressFullscreenDeathFX   ]]
-- @return nil
function CDOTA_Modifier_Lua:GetModifierSuppressFullscreenDeathFX(  ) end

---[[ GetModifierTempestDouble   ]]
-- @return [object Object]
function CDOTA_Modifier_Lua:GetModifierTempestDouble(  ) end

---[[ GetModifierTickGold_Multiplier   ]]
-- @return nil
function CDOTA_Modifier_Lua:GetModifierTickGold_Multiplier(  ) end

---[[ GetModifierTotal_ConstantBlock   ]]
-- @return float
-- @param event ModifierAttackEvent
function CDOTA_Modifier_Lua:GetModifierTotal_ConstantBlock( event ) end

---[[ GetModifierTotal_ConstantBlockStacking   ]]
-- @return nil
function CDOTA_Modifier_Lua:GetModifierTotal_ConstantBlockStacking(  ) end

---[[ GetModifierTotalDamageOutgoing_Percentage   ]]
-- @return float
-- @param event ModifierAttackEvent
function CDOTA_Modifier_Lua:GetModifierTotalDamageOutgoing_Percentage( event ) end

---[[ GetModifierTotalPercentageManaRegen   ]]
-- @return float
function CDOTA_Modifier_Lua:GetModifierTotalPercentageManaRegen(  ) end

---[[ GetModifierTurnRate_Override   ]]
-- @return float
function CDOTA_Modifier_Lua:GetModifierTurnRate_Override(  ) end

---[[ GetModifierTurnRate_Percentage   ]]
-- @return float
function CDOTA_Modifier_Lua:GetModifierTurnRate_Percentage(  ) end

---[[ GetModifierTurnRateConstant   ]]
-- @return float
function CDOTA_Modifier_Lua:GetModifierTurnRateConstant(  ) end

---[[ GetModifierUnitDisllowUpgrading   ]]
-- @return [object Object]
function CDOTA_Modifier_Lua:GetModifierUnitDisllowUpgrading(  ) end

---[[ GetModifierUnitStatsNeedsRefresh   ]]
-- @return [object Object]
function CDOTA_Modifier_Lua:GetModifierUnitStatsNeedsRefresh(  ) end

---[[ GetModifierXPDuringDeath   ]]
-- @return nil
function CDOTA_Modifier_Lua:GetModifierXPDuringDeath(  ) end

---[[ GetModifierXPFountainCountdownTimeOverride   ]]
-- @return nil
function CDOTA_Modifier_Lua:GetModifierXPFountainCountdownTimeOverride(  ) end

---[[ GetModofierPropertyPseudoRandomBonus   ]]
-- @return nil
function CDOTA_Modifier_Lua:GetModofierPropertyPseudoRandomBonus(  ) end

---[[ GetOverrideAnimation   ]]
-- @return GameActivity_t
function CDOTA_Modifier_Lua:GetOverrideAnimation(  ) end

---[[ GetOverrideAnimationRate   ]]
-- @return float
function CDOTA_Modifier_Lua:GetOverrideAnimationRate(  ) end

---[[ GetOverrideAttackMagical   ]]
-- @return [object Object]
function CDOTA_Modifier_Lua:GetOverrideAttackMagical(  ) end

---[[ GetPhysicalArmorPiercingPercentageTarget   ]]
-- @return nil
function CDOTA_Modifier_Lua:GetPhysicalArmorPiercingPercentageTarget(  ) end

---[[ GetPrimaryStatDamageMultiplier   ]]
-- @return float
function CDOTA_Modifier_Lua:GetPrimaryStatDamageMultiplier(  ) end

---[[ GetRedirectSpell   ]]
-- @return nil
function CDOTA_Modifier_Lua:GetRedirectSpell(  ) end

---[[ GetReflectSpell   ]]
-- @return [object Object]
-- @param event ModifierAbilityEvent
function CDOTA_Modifier_Lua:GetReflectSpell( event ) end

---[[ GetRequiredLevel   ]]
-- @return nil
function CDOTA_Modifier_Lua:GetRequiredLevel(  ) end

---[[ GetSkipAttackRegulator   ]]
-- @return nil
function CDOTA_Modifier_Lua:GetSkipAttackRegulator(  ) end

---[[ GetSuppressAttackProcs   ]]
-- @return nil
function CDOTA_Modifier_Lua:GetSuppressAttackProcs(  ) end

---[[ GetSuppressCleave   ]]
-- @return [object Object]
-- @param event ModifierAttackEvent
function CDOTA_Modifier_Lua:GetSuppressCleave( event ) end

---[[ GetSuppressCrit   ]]
-- @return nil
function CDOTA_Modifier_Lua:GetSuppressCrit(  ) end

---[[ GetSuppressIncomingCrit   ]]
-- @return nil
function CDOTA_Modifier_Lua:GetSuppressIncomingCrit(  ) end

---[[ GetSuppressTeleport   ]]
-- @return [object Object]
function CDOTA_Modifier_Lua:GetSuppressTeleport(  ) end

---[[ GetTierTokenReroll   ]]
-- @return nil
function CDOTA_Modifier_Lua:GetTierTokenReroll(  ) end

---[[ GetTriggerCosmeticAndEndAttack   ]]
-- @return nil
function CDOTA_Modifier_Lua:GetTriggerCosmeticAndEndAttack(  ) end

---[[ GetUnitLifetimeFraction   ]]
-- @return float
function CDOTA_Modifier_Lua:GetUnitLifetimeFraction(  ) end

---[[ GetVisionDegreeRestriction   ]]
-- @return nil
function CDOTA_Modifier_Lua:GetVisionDegreeRestriction(  ) end

---[[ GetVisualZDelta   ]]
-- @return float
function CDOTA_Modifier_Lua:GetVisualZDelta(  ) end

---[[ GetVisualZSpeedBaseOverride   ]]
-- @return nil
function CDOTA_Modifier_Lua:GetVisualZSpeedBaseOverride(  ) end

---[[ HasBonusNeutralItemPassive   ]]
-- @return nil
function CDOTA_Modifier_Lua:HasBonusNeutralItemPassive(  ) end

---[[ MinAttributeLevel   ]]
-- @return nil
function CDOTA_Modifier_Lua:MinAttributeLevel(  ) end

---[[ MODIFIER_PROPERTY_INCOMING_DAMAGE_CONSTANT_POST   ]]
-- @return nil
function CDOTA_Modifier_Lua:MODIFIER_PROPERTY_INCOMING_DAMAGE_CONSTANT_POST(  ) end

---[[ OnAbilityEndChannel   ]]
-- @return nil
-- @param event ModifierAbilityEvent
function CDOTA_Modifier_Lua:OnAbilityEndChannel( event ) end

---[[ OnAbilityExecuted   ]]
-- @return nil
-- @param event ModifierAbilityEvent
function CDOTA_Modifier_Lua:OnAbilityExecuted( event ) end

---[[ OnAbilityFullyCast   ]]
-- @return nil
-- @param event ModifierAbilityEvent
function CDOTA_Modifier_Lua:OnAbilityFullyCast( event ) end

---[[ OnAbilityStart   ]]
-- @return nil
-- @param event ModifierAbilityEvent
function CDOTA_Modifier_Lua:OnAbilityStart( event ) end

---[[ OnAbilitySwapped   ]]
-- @return nil
function CDOTA_Modifier_Lua:OnAbilitySwapped(  ) end

---[[ OnAbilityToggled   ]]
-- @return nil
function CDOTA_Modifier_Lua:OnAbilityToggled(  ) end

---[[ OnAssist   ]]
-- @return nil
function CDOTA_Modifier_Lua:OnAssist(  ) end

---[[ OnAttack   ]]
-- @return nil
-- @param event ModifierAttackEvent
function CDOTA_Modifier_Lua:OnAttack( event ) end

---[[ OnAttackAllied  Happens even if attack can't be issued. ]]
-- @return nil
-- @param event ModifierAttackEvent
function CDOTA_Modifier_Lua:OnAttackAllied( event ) end

---[[ OnAttackCancelled   ]]
-- @return nil
-- @param event ModifierAttackEvent
function CDOTA_Modifier_Lua:OnAttackCancelled( event ) end

---[[ OnAttacked   ]]
-- @return nil
-- @param event ModifierAttackEvent
function CDOTA_Modifier_Lua:OnAttacked( event ) end

---[[ OnAttackFail   ]]
-- @return nil
-- @param event ModifierAttackEvent
function CDOTA_Modifier_Lua:OnAttackFail( event ) end

---[[ OnAttackFinished   ]]
-- @return nil
-- @param event ModifierAttackEvent
function CDOTA_Modifier_Lua:OnAttackFinished( event ) end

---[[ OnAttackLanded   ]]
-- @return nil
-- @param event ModifierAttackEvent
function CDOTA_Modifier_Lua:OnAttackLanded( event ) end

---[[ OnAttackRecord   ]]
-- @return nil
-- @param event ModifierAttackEvent
function CDOTA_Modifier_Lua:OnAttackRecord( event ) end

---[[ OnAttackRecordDestroy   ]]
-- @return nil
-- @param event ModifierAttackEvent
function CDOTA_Modifier_Lua:OnAttackRecordDestroy( event ) end

---[[ OnAttackStart   ]]
-- @return nil
-- @param event ModifierAttackEvent
function CDOTA_Modifier_Lua:OnAttackStart( event ) end

---[[ OnAttemptProjectileDodge   ]]
-- @return nil
function CDOTA_Modifier_Lua:OnAttemptProjectileDodge(  ) end

---[[ OnBreakInvisibility   ]]
-- @return nil
function CDOTA_Modifier_Lua:OnBreakInvisibility(  ) end

---[[ OnBuildingKilled   ]]
-- @return nil
-- @param event ModifierInstanceEvent
function CDOTA_Modifier_Lua:OnBuildingKilled( event ) end

---[[ OnCleaveAttackLanded   ]]
-- @return nil
function CDOTA_Modifier_Lua:OnCleaveAttackLanded(  ) end

---[[ OnDamageCalculated   ]]
-- @return nil
-- @param event ModifierAttackEvent
function CDOTA_Modifier_Lua:OnDamageCalculated( event ) end

---[[ OnDamageHPLoss   ]]
-- @return nil
function CDOTA_Modifier_Lua:OnDamageHPLoss(  ) end

---[[ OnDamagePrevented   ]]
-- @return nil
function CDOTA_Modifier_Lua:OnDamagePrevented(  ) end

---[[ OnDayStarted   ]]
-- @return nil
function CDOTA_Modifier_Lua:OnDayStarted(  ) end

---[[ OnDeath   ]]
-- @return nil
-- @param event ModifierInstanceEvent
function CDOTA_Modifier_Lua:OnDeath( event ) end

---[[ OnDeathCompleted   ]]
-- @return nil
-- @param event ModifierInstanceEvent
function CDOTA_Modifier_Lua:OnDeathCompleted( event ) end

---[[ OnDominated   ]]
-- @return nil
-- @param event ModifierUnitEvent
function CDOTA_Modifier_Lua:OnDominated( event ) end

---[[ OnForceProcMagicStick   ]]
-- @return nil
function CDOTA_Modifier_Lua:OnForceProcMagicStick(  ) end

---[[ OnFoWTeamChanged   ]]
-- @return nil
function CDOTA_Modifier_Lua:OnFoWTeamChanged(  ) end

---[[ OnHealReceived   ]]
-- @return nil
-- @param event ModifierHealEvent
function CDOTA_Modifier_Lua:OnHealReceived( event ) end

---[[ OnHealthGained   ]]
-- @return nil
-- @param event ModifierHealEvent
function CDOTA_Modifier_Lua:OnHealthGained( event ) end

---[[ OnHeroBeginDying   ]]
-- @return nil
function CDOTA_Modifier_Lua:OnHeroBeginDying(  ) end

---[[ OnHeroKilled   ]]
-- @return nil
-- @param event ModifierAttackEvent
function CDOTA_Modifier_Lua:OnHeroKilled( event ) end

---[[ OnIllusionCreated   ]]
-- @return nil
function CDOTA_Modifier_Lua:OnIllusionCreated(  ) end

---[[ OnKill   ]]
-- @return nil
function CDOTA_Modifier_Lua:OnKill(  ) end

---[[ OnKnockbackAttempted   ]]
-- @return nil
function CDOTA_Modifier_Lua:OnKnockbackAttempted(  ) end

---[[ OnMagicDamageCalculated   ]]
-- @return nil
function CDOTA_Modifier_Lua:OnMagicDamageCalculated(  ) end

---[[ OnManaGained   ]]
-- @return nil
-- @param event ModifierUnitEvent
function CDOTA_Modifier_Lua:OnManaGained( event ) end

---[[ OnModelChanged   ]]
-- @return nil
-- @param event ModifierUnitEvent
function CDOTA_Modifier_Lua:OnModelChanged( event ) end

---[[ OnModifierAdded   ]]
-- @return nil
-- @param event ModifierAddedEvent
function CDOTA_Modifier_Lua:OnModifierAdded( event ) end

---[[ OnModifierRefreshed   ]]
-- @return nil
function CDOTA_Modifier_Lua:OnModifierRefreshed(  ) end

---[[ OnModifierRemoved   ]]
-- @return nil
function CDOTA_Modifier_Lua:OnModifierRemoved(  ) end

---[[ OnMuteDamageAbilities   ]]
-- @return nil
function CDOTA_Modifier_Lua:OnMuteDamageAbilities(  ) end

---[[ OnNightStarted   ]]
-- @return nil
function CDOTA_Modifier_Lua:OnNightStarted(  ) end

---[[ OnOrder   ]]
-- @return nil
-- @param event ModifierUnitEvent
function CDOTA_Modifier_Lua:OnOrder( event ) end

---[[ OnOrderReceived   ]]
-- @return nil
function CDOTA_Modifier_Lua:OnOrderReceived(  ) end

---[[ OnProcessCleave   ]]
-- @return nil
function CDOTA_Modifier_Lua:OnProcessCleave(  ) end

---[[ OnProjectileDodge   ]]
-- @return nil
-- @param event ModifierAttackEvent
function CDOTA_Modifier_Lua:OnProjectileDodge( event ) end

---[[ OnProjectileObstructionHit   ]]
-- @return nil
function CDOTA_Modifier_Lua:OnProjectileObstructionHit(  ) end

---[[ OnPureDamageCalculated   ]]
-- @return nil
function CDOTA_Modifier_Lua:OnPureDamageCalculated(  ) end

---[[ OnPurged   ]]
-- @return nil
function CDOTA_Modifier_Lua:OnPurged(  ) end

---[[ OnRespawn   ]]
-- @return nil
-- @param event ModifierUnitEvent
function CDOTA_Modifier_Lua:OnRespawn( event ) end

---[[ OnRuneSpawn   ]]
-- @return nil
function CDOTA_Modifier_Lua:OnRuneSpawn(  ) end

---[[ OnScepterUpgradeSelected   ]]
-- @return nil
function CDOTA_Modifier_Lua:OnScepterUpgradeSelected(  ) end

---[[ OnSetLocation   ]]
-- @return nil
-- @param event ModifierUnitEvent
function CDOTA_Modifier_Lua:OnSetLocation( event ) end

---[[ OnShardUpgradeSelected   ]]
-- @return nil
function CDOTA_Modifier_Lua:OnShardUpgradeSelected(  ) end

---[[ OnSpellAppliedSuccessfully   ]]
-- @return nil
-- @param event ModifierAbilityEvent
function CDOTA_Modifier_Lua:OnSpellAppliedSuccessfully( event ) end

---[[ OnSpellTargetReady   ]]
-- @return nil
function CDOTA_Modifier_Lua:OnSpellTargetReady(  ) end

---[[ OnSpentHealth   ]]
-- @return nil
-- @param event ModifierAbilityEvent
function CDOTA_Modifier_Lua:OnSpentHealth( event ) end

---[[ OnSpentItemCharge   ]]
-- @return nil
function CDOTA_Modifier_Lua:OnSpentItemCharge(  ) end

---[[ OnSpentMana   ]]
-- @return nil
-- @param event ModifierAbilityEvent
function CDOTA_Modifier_Lua:OnSpentMana( event ) end

---[[ OnStateChanged   ]]
-- @return nil
-- @param event ModifierUnitEvent
function CDOTA_Modifier_Lua:OnStateChanged( event ) end

---[[ OnTakeDamage   ]]
-- @return nil
-- @param event ModifierInstanceEvent
function CDOTA_Modifier_Lua:OnTakeDamage( event ) end

---[[ OnTakeDamageKillCredit   ]]
-- @return nil
-- @param event ModifierAttackEvent
function CDOTA_Modifier_Lua:OnTakeDamageKillCredit( event ) end

---[[ OnTakeDamagePostUnavoidableBlock   ]]
-- @return nil
function CDOTA_Modifier_Lua:OnTakeDamagePostUnavoidableBlock(  ) end

---[[ OnTeleported   ]]
-- @return nil
-- @param event ModifierUnitEvent
function CDOTA_Modifier_Lua:OnTeleported( event ) end

---[[ OnTeleporting   ]]
-- @return nil
-- @param event ModifierUnitEvent
function CDOTA_Modifier_Lua:OnTeleporting( event ) end

---[[ OnTierTokenRerolled   ]]
-- @return nil
function CDOTA_Modifier_Lua:OnTierTokenRerolled(  ) end

---[[ OnTooltip   ]]
-- @return float
function CDOTA_Modifier_Lua:OnTooltip(  ) end

---[[ OnTooltip2   ]]
-- @return float
function CDOTA_Modifier_Lua:OnTooltip2(  ) end

---[[ OnTreeCutDown   ]]
-- @return nil
function CDOTA_Modifier_Lua:OnTreeCutDown(  ) end

---[[ OnUnitMoved   ]]
-- @return nil
-- @param event ModifierUnitEvent
function CDOTA_Modifier_Lua:OnUnitMoved( event ) end

---[[ PreserveParticlesOnModelChanged   ]]
-- @return [object Object]
function CDOTA_Modifier_Lua:PreserveParticlesOnModelChanged(  ) end

---[[ ReincarnateSuppressFX   ]]
-- @return nil
function CDOTA_Modifier_Lua:ReincarnateSuppressFX(  ) end

---[[ ReincarnateTime   ]]
-- @return float
function CDOTA_Modifier_Lua:ReincarnateTime(  ) end

---[[ ApplyHorizontalMotionController  Starts the horizontal motion controller effects for this buff.  Returns true if successful. ]]
-- @return bool
function CDOTA_Modifier_Lua_Horizontal_Motion:ApplyHorizontalMotionController(  ) end

---[[ GetPriority  Get the priority. ]]
-- @return modifierpriority
function CDOTA_Modifier_Lua_Horizontal_Motion:GetPriority(  ) end

---[[ OnHorizontalMotionInterrupted  Called when the motion gets interrupted. ]]
-- @return nil
function CDOTA_Modifier_Lua_Horizontal_Motion:OnHorizontalMotionInterrupted(  ) end

---[[ SetPriority  Set the priority. ]]
-- @return nil
-- @param motionPriority modifierpriority
function CDOTA_Modifier_Lua_Horizontal_Motion:SetPriority( motionPriority ) end

---[[ UpdateHorizontalMotion  Perform any motion from the given interval on the NPC. ]]
-- @return nil
-- @param me CDOTA_BaseNPC
-- @param dt float
function CDOTA_Modifier_Lua_Horizontal_Motion:UpdateHorizontalMotion( me, dt ) end

---[[ ApplyHorizontalMotionController  Starts the horizontal motion controller effects for this buff.  Returns true if successful. ]]
-- @return bool
function CDOTA_Modifier_Lua_Motion_Both:ApplyHorizontalMotionController(  ) end

---[[ ApplyVerticalMotionController  Starts the vertical motion controller effects for this buff.  Returns true if successful. ]]
-- @return bool
function CDOTA_Modifier_Lua_Motion_Both:ApplyVerticalMotionController(  ) end

---[[ GetPriority  Get the priority. ]]
-- @return modifierpriority
function CDOTA_Modifier_Lua_Motion_Both:GetPriority(  ) end

---[[ OnHorizontalMotionInterrupted  Called when the motion gets interrupted. ]]
-- @return nil
function CDOTA_Modifier_Lua_Motion_Both:OnHorizontalMotionInterrupted(  ) end

---[[ OnVerticalMotionInterrupted  Called when the motion gets interrupted. ]]
-- @return nil
function CDOTA_Modifier_Lua_Motion_Both:OnVerticalMotionInterrupted(  ) end

---[[ SetPriority  Set the priority. ]]
-- @return nil
-- @param motionPriority modifierpriority
function CDOTA_Modifier_Lua_Motion_Both:SetPriority( motionPriority ) end

---[[ UpdateHorizontalMotion  Perform any motion from the given interval on the NPC. ]]
-- @return nil
-- @param me CDOTA_BaseNPC
-- @param dt float
function CDOTA_Modifier_Lua_Motion_Both:UpdateHorizontalMotion( me, dt ) end

---[[ UpdateVerticalMotion  Perform any motion from the given interval on the NPC. ]]
-- @return nil
-- @param me CDOTA_BaseNPC
-- @param dt float
function CDOTA_Modifier_Lua_Motion_Both:UpdateVerticalMotion( me, dt ) end

---[[ ApplyVerticalMotionController  Starts the vertical motion controller effects for this buff.  Returns true if successful. ]]
-- @return bool
function CDOTA_Modifier_Lua_Vertical_Motion:ApplyVerticalMotionController(  ) end

---[[ GetMotionPriority  Get the priority. ]]
-- @return modifierpriority
function CDOTA_Modifier_Lua_Vertical_Motion:GetMotionPriority(  ) end

---[[ OnVerticalMotionInterrupted  Called when the motion gets interrupted. ]]
-- @return nil
function CDOTA_Modifier_Lua_Vertical_Motion:OnVerticalMotionInterrupted(  ) end

---[[ SetMotionPriority  Set the priority. ]]
-- @return nil
-- @param motionPriority modifierpriority
function CDOTA_Modifier_Lua_Vertical_Motion:SetMotionPriority( motionPriority ) end

---[[ UpdateVerticalMotion  Perform any motion from the given interval on the NPC. ]]
-- @return nil
-- @param me CDOTA_BaseNPC
-- @param dt float
function CDOTA_Modifier_Lua_Vertical_Motion:UpdateVerticalMotion( me, dt ) end

---[[ CreatePendingUnits   ]]
-- @return nil
function CDOTA_NeutralSpawner:CreatePendingUnits(  ) end

---[[ SelectSpawnType   ]]
-- @return nil
function CDOTA_NeutralSpawner:SelectSpawnType(  ) end

---[[ SpawnNextBatch   ]]
-- @return nil
-- @param ignoreBlockers bool
function CDOTA_NeutralSpawner:SpawnNextBatch( ignoreBlockers ) end

---[[ AddAegisPickup   ]]
-- @return nil
-- @param playerId PlayerID
function CDOTA_PlayerResource:AddAegisPickup( playerId ) end

---[[ AddCandyEvent   ]]
-- @return nil
-- @param playerId PlayerID
-- @param reason int
function CDOTA_PlayerResource:AddCandyEvent( playerId, reason ) end

---[[ AddClaimedFarm   ]]
-- @return nil
-- @param playerId PlayerID
-- @param farmValue float
-- @param earnedValue bool
function CDOTA_PlayerResource:AddClaimedFarm( playerId, farmValue, earnedValue ) end

---[[ AddGoldSpentOnSupport   ]]
-- @return nil
-- @param playerId PlayerID
-- @param cost int
function CDOTA_PlayerResource:AddGoldSpentOnSupport( playerId, cost ) end

---[[ AddNeutralItemToStash   ]]
-- @return nil
-- @param playerId PlayerID
-- @param teamNumber DOTATeam_t
-- @param item CDOTA_Item
function CDOTA_PlayerResource:AddNeutralItemToStash( playerId, teamNumber, item ) end

---[[ AddRunePickup   ]]
-- @return nil
-- @param playerId PlayerID
-- @param runes int
function CDOTA_PlayerResource:AddRunePickup( playerId, runes ) end

---[[ AreUnitsSharedWithPlayerID   ]]
-- @return bool
-- @param unitOwnerPlayerId PlayerID
-- @param otherPlayerId PlayerID
function CDOTA_PlayerResource:AreUnitsSharedWithPlayerID( unitOwnerPlayerId, otherPlayerId ) end

---[[ CanRepick   ]]
-- @return bool
-- @param playerId PlayerID
function CDOTA_PlayerResource:CanRepick( playerId ) end

---[[ ClearKillsMatrix   ]]
-- @return nil
-- @param playerId PlayerID
function CDOTA_PlayerResource:ClearKillsMatrix( playerId ) end

---[[ ClearLastHitMultikill   ]]
-- @return nil
-- @param playerId PlayerID
function CDOTA_PlayerResource:ClearLastHitMultikill( playerId ) end

---[[ ClearLastHitStreak   ]]
-- @return nil
-- @param playerId PlayerID
function CDOTA_PlayerResource:ClearLastHitStreak( playerId ) end

---[[ ClearPlayer   ]]
-- @return nil
-- @param playerId PlayerID
function CDOTA_PlayerResource:ClearPlayer( playerId ) end

---[[ ClearRawPlayerDamageMatrix   ]]
-- @return nil
-- @param playerId PlayerID
function CDOTA_PlayerResource:ClearRawPlayerDamageMatrix( playerId ) end

---[[ ClearStreak   ]]
-- @return nil
-- @param playerId PlayerID
function CDOTA_PlayerResource:ClearStreak( playerId ) end

---[[ GetAegisPickups   ]]
-- @return int
-- @param playerId PlayerID
function CDOTA_PlayerResource:GetAegisPickups( playerId ) end

---[[ GetAssists   ]]
-- @return int
-- @param playerId PlayerID
function CDOTA_PlayerResource:GetAssists( playerId ) end

---[[ GetBroadcasterChannel   ]]
-- @return uint
-- @param playerId PlayerID
function CDOTA_PlayerResource:GetBroadcasterChannel( playerId ) end

---[[ GetBroadcasterChannelSlot   ]]
-- @return uint
-- @param playerId PlayerID
function CDOTA_PlayerResource:GetBroadcasterChannelSlot( playerId ) end

---[[ GetClaimedDenies   ]]
-- @return int
-- @param playerId PlayerID
function CDOTA_PlayerResource:GetClaimedDenies( playerId ) end

---[[ GetClaimedFarm   ]]
-- @return float
-- @param playerId PlayerID
-- @param onlyEarned bool
function CDOTA_PlayerResource:GetClaimedFarm( playerId, onlyEarned ) end

---[[ GetClaimedMisses   ]]
-- @return int
-- @param playerId PlayerID
function CDOTA_PlayerResource:GetClaimedMisses( playerId ) end

---[[ GetConnectionState   ]]
-- @return DOTAConnectionState_t
-- @param playerId PlayerID
function CDOTA_PlayerResource:GetConnectionState( playerId ) end

---[[ GetCreepDamageTaken   ]]
-- @return float
-- @param playerId PlayerID
-- @param total bool
function CDOTA_PlayerResource:GetCreepDamageTaken( playerId, total ) end

---[[ GetCustomBuybackCooldown   ]]
-- @return float
-- @param playerId PlayerID
function CDOTA_PlayerResource:GetCustomBuybackCooldown( playerId ) end

---[[ GetCustomBuybackCost   ]]
-- @return int
-- @param playerId PlayerID
function CDOTA_PlayerResource:GetCustomBuybackCost( playerId ) end

---[[ GetCustomTeamAssignment  Get the current custom team assignment for this player. ]]
-- @return int
-- @param playerId PlayerID
function CDOTA_PlayerResource:GetCustomTeamAssignment( playerId ) end

---[[ GetDamageDoneToHero   ]]
-- @return float
-- @param playerId PlayerID
-- @param victimId PlayerID
function CDOTA_PlayerResource:GetDamageDoneToHero( playerId, victimId ) end

---[[ GetDeaths   ]]
-- @return int
-- @param playerId PlayerID
function CDOTA_PlayerResource:GetDeaths( playerId ) end

---[[ GetDenies   ]]
-- @return int
-- @param playerId PlayerID
function CDOTA_PlayerResource:GetDenies( playerId ) end

---[[ GetEventGameUpgrades  (nPlayerID). ]]
-- @return handle
-- @param playerId PlayerID
function CDOTA_PlayerResource:GetEventGameUpgrades( playerId ) end

---[[ GetEventPointsForPlayerID   ]]
-- @return uint
-- @param playerId PlayerID
function CDOTA_PlayerResource:GetEventPointsForPlayerID( playerId ) end

---[[ GetEventPremiumPoints   ]]
-- @return uint
-- @param playerId PlayerID
function CDOTA_PlayerResource:GetEventPremiumPoints( playerId ) end

---[[ GetEventRanks   ]]
-- @return unknown
-- @param playerId PlayerID
function CDOTA_PlayerResource:GetEventRanks( playerId ) end

---[[ GetGold   ]]
-- @return int
-- @param playerId PlayerID
function CDOTA_PlayerResource:GetGold( playerId ) end

---[[ GetGoldLostToDeath   ]]
-- @return int
-- @param playerId PlayerID
function CDOTA_PlayerResource:GetGoldLostToDeath( playerId ) end

---[[ GetGoldPerMin   ]]
-- @return float
-- @param playerId PlayerID
function CDOTA_PlayerResource:GetGoldPerMin( playerId ) end

---[[ GetGoldSpentOnBuybacks   ]]
-- @return int
-- @param playerId PlayerID
function CDOTA_PlayerResource:GetGoldSpentOnBuybacks( playerId ) end

---[[ GetGoldSpentOnConsumables   ]]
-- @return int
-- @param playerId PlayerID
function CDOTA_PlayerResource:GetGoldSpentOnConsumables( playerId ) end

---[[ GetGoldSpentOnItems   ]]
-- @return int
-- @param playerId PlayerID
function CDOTA_PlayerResource:GetGoldSpentOnItems( playerId ) end

---[[ GetGoldSpentOnSupport   ]]
-- @return int
-- @param playerId PlayerID
function CDOTA_PlayerResource:GetGoldSpentOnSupport( playerId ) end

---[[ GetHealing   ]]
-- @return float
-- @param playerId PlayerID
function CDOTA_PlayerResource:GetHealing( playerId ) end

---[[ GetHeroDamageTaken   ]]
-- @return float
-- @param playerId PlayerID
-- @param total bool
function CDOTA_PlayerResource:GetHeroDamageTaken( playerId, total ) end

---[[ GetKills   ]]
-- @return int
-- @param playerId PlayerID
function CDOTA_PlayerResource:GetKills( playerId ) end

---[[ GetKillsDoneToHero   ]]
-- @return int
-- @param playerId PlayerID
-- @param victimId PlayerID
function CDOTA_PlayerResource:GetKillsDoneToHero( playerId, victimId ) end

---[[ GetLabyrinthEventGameHeroUnlocks  (nPlayerID). ]]
-- @return handle
-- @param playerId PlayerID
function CDOTA_PlayerResource:GetLabyrinthEventGameHeroUnlocks( playerId ) end

---[[ GetLastHitMultikill   ]]
-- @return int
-- @param playerId PlayerID
function CDOTA_PlayerResource:GetLastHitMultikill( playerId ) end

---[[ GetLastHits   ]]
-- @return int
-- @param playerId PlayerID
function CDOTA_PlayerResource:GetLastHits( playerId ) end

---[[ GetLastHitStreak   ]]
-- @return int
-- @param playerId PlayerID
function CDOTA_PlayerResource:GetLastHitStreak( playerId ) end

---[[ GetLevel   ]]
-- @return int
-- @param playerId PlayerID
function CDOTA_PlayerResource:GetLevel( playerId ) end

---[[ GetLiveSpectatorTeam   ]]
-- @return DOTATeam_t
-- @param playerId PlayerID
function CDOTA_PlayerResource:GetLiveSpectatorTeam( playerId ) end

---[[ GetMisses   ]]
-- @return int
-- @param playerId PlayerID
function CDOTA_PlayerResource:GetMisses( playerId ) end

---[[ GetNearbyCreepDeaths   ]]
-- @return int
-- @param playerId PlayerID
function CDOTA_PlayerResource:GetNearbyCreepDeaths( playerId ) end

---[[ GetNetworkedEventActionClaimCount   ]]
-- @return int
-- @param playerId PlayerID
-- @param eventId int
-- @param unActionId uint
function CDOTA_PlayerResource:GetNetworkedEventActionClaimCount( playerId, eventId, unActionId ) end

---[[ GetNetworkedEventActionClaimCountByName   ]]
-- @return int
-- @param playerId PlayerID
-- @param eventId int
-- @param actionName string
function CDOTA_PlayerResource:GetNetworkedEventActionClaimCountByName( playerId, eventId, actionName ) end

---[[ GetNetWorth   ]]
-- @return int
-- @param playerId PlayerID
function CDOTA_PlayerResource:GetNetWorth( playerId ) end

---[[ GetNthCourierForTeam   ]]
-- @return CDOTA_Unit_Courier
-- @param courierIndex int
-- @param teamNumber DOTATeam_t
function CDOTA_PlayerResource:GetNthCourierForTeam( courierIndex, teamNumber ) end

---[[ GetNthPlayerIDOnTeam   ]]
-- @return PlayerID
-- @param teamNumber DOTATeam_t
-- @param nthPlayer int
function CDOTA_PlayerResource:GetNthPlayerIDOnTeam( teamNumber, nthPlayer ) end

---[[ GetNumConnectedHumanPlayers  Players on a valid team (radiant, dire, or custom*) who haven't abandoned the game. ]]
-- @return int
function CDOTA_PlayerResource:GetNumConnectedHumanPlayers(  ) end

---[[ GetNumConsumablesPurchased   ]]
-- @return int
-- @param playerId PlayerID
function CDOTA_PlayerResource:GetNumConsumablesPurchased( playerId ) end

---[[ GetNumCouriersForTeam   ]]
-- @return int
-- @param teamNumber DOTATeam_t
function CDOTA_PlayerResource:GetNumCouriersForTeam( teamNumber ) end

---[[ GetNumItemsPurchased   ]]
-- @return int
-- @param playerId PlayerID
function CDOTA_PlayerResource:GetNumItemsPurchased( playerId ) end

---[[ GetPartyID   ]]
-- @return Uint64
-- @param playerId PlayerID
function CDOTA_PlayerResource:GetPartyID( playerId ) end

---[[ GetPlayer  Returns player entity for a player with specified id. Player entity represents a single connection, so a different entity might be returned. When player is disconnected nil would be returned. ]]
-- @return CDOTAPlayerController
-- @param playerId PlayerID
function CDOTA_PlayerResource:GetPlayer( playerId ) end

---[[ GetPlayerCount  Includes spectators and players not assigned to a team. ]]
-- @return int
function CDOTA_PlayerResource:GetPlayerCount(  ) end

---[[ GetPlayerCountForTeam   ]]
-- @return int
-- @param team DOTATeam_t
function CDOTA_PlayerResource:GetPlayerCountForTeam( team ) end

---[[ GetPlayerLoadedCompletely   ]]
-- @return bool
-- @param playerId PlayerID
function CDOTA_PlayerResource:GetPlayerLoadedCompletely( playerId ) end

---[[ GetPlayerName   ]]
-- @return string
-- @param playerId PlayerID
function CDOTA_PlayerResource:GetPlayerName( playerId ) end

---[[ GetPreferredCourierForPlayer   ]]
-- @return handle
-- @param playerId PlayerID
function CDOTA_PlayerResource:GetPreferredCourierForPlayer( playerId ) end

---[[ GetRawPlayerDamage   ]]
-- @return float
-- @param playerId PlayerID
function CDOTA_PlayerResource:GetRawPlayerDamage( playerId ) end

---[[ GetReliableGold   ]]
-- @return int
-- @param playerId PlayerID
function CDOTA_PlayerResource:GetReliableGold( playerId ) end

---[[ GetRespawnSeconds   ]]
-- @return int
-- @param playerId PlayerID
function CDOTA_PlayerResource:GetRespawnSeconds( playerId ) end

---[[ GetRoshanKills   ]]
-- @return int
-- @param playerId PlayerID
function CDOTA_PlayerResource:GetRoshanKills( playerId ) end

---[[ GetRunePickups   ]]
-- @return int
-- @param playerId PlayerID
function CDOTA_PlayerResource:GetRunePickups( playerId ) end

---[[ GetSelectedHeroEntity   ]]
-- @return CDOTA_BaseNPC_Hero
-- @param playerId PlayerID
function CDOTA_PlayerResource:GetSelectedHeroEntity( playerId ) end

---[[ GetSelectedHeroID   ]]
-- @return int
-- @param playerId PlayerID
function CDOTA_PlayerResource:GetSelectedHeroID( playerId ) end

---[[ GetSelectedHeroName   ]]
-- @return string
-- @param playerId PlayerID
function CDOTA_PlayerResource:GetSelectedHeroName( playerId ) end

---[[ GetSteamAccountID   ]]
-- @return uint
-- @param playerId PlayerID
function CDOTA_PlayerResource:GetSteamAccountID( playerId ) end

---[[ GetSteamID  Get the 64 bit steam ID for a given player. ]]
-- @return Uint64
-- @param playerId PlayerID
function CDOTA_PlayerResource:GetSteamID( playerId ) end

---[[ GetStreak   ]]
-- @return int
-- @param playerId PlayerID
function CDOTA_PlayerResource:GetStreak( playerId ) end

---[[ GetStuns   ]]
-- @return float
-- @param playerId PlayerID
function CDOTA_PlayerResource:GetStuns( playerId ) end

---[[ GetTeam   ]]
-- @return DOTATeam_t
-- @param playerId PlayerID
function CDOTA_PlayerResource:GetTeam( playerId ) end

---[[ GetTeamKills   ]]
-- @return int
-- @param team DOTATeam_t
function CDOTA_PlayerResource:GetTeamKills( team ) end

---[[ GetTeamPlayerCount  (Deprecated: use GetNumConnectedHumanPlayers) Players on a valid team (radiant, dire, or custom*) who haven't abandoned the game. ]]
-- @return int
function CDOTA_PlayerResource:GetTeamPlayerCount(  ) end

---[[ GetTimeOfLastConsumablePurchase   ]]
-- @return float
-- @param playerId PlayerID
function CDOTA_PlayerResource:GetTimeOfLastConsumablePurchase( playerId ) end

---[[ GetTimeOfLastDeath   ]]
-- @return float
-- @param playerId PlayerID
function CDOTA_PlayerResource:GetTimeOfLastDeath( playerId ) end

---[[ GetTimeOfLastItemPurchase   ]]
-- @return float
-- @param playerId PlayerID
function CDOTA_PlayerResource:GetTimeOfLastItemPurchase( playerId ) end

---[[ GetTotalEarnedGold   ]]
-- @return int
-- @param playerId PlayerID
function CDOTA_PlayerResource:GetTotalEarnedGold( playerId ) end

---[[ GetTotalEarnedXP   ]]
-- @return int
-- @param playerId PlayerID
function CDOTA_PlayerResource:GetTotalEarnedXP( playerId ) end

---[[ GetTotalGoldSpent   ]]
-- @return int
-- @param playerId PlayerID
function CDOTA_PlayerResource:GetTotalGoldSpent( playerId ) end

---[[ GetTowerDamageTaken   ]]
-- @return float
-- @param playerId PlayerID
-- @param total bool
function CDOTA_PlayerResource:GetTowerDamageTaken( playerId, total ) end

---[[ GetTowerKills   ]]
-- @return int
-- @param playerId PlayerID
function CDOTA_PlayerResource:GetTowerKills( playerId ) end

---[[ GetUnitShareMaskForPlayer   ]]
-- @return int
-- @param playerId PlayerID
-- @param otherPlayerId PlayerID
function CDOTA_PlayerResource:GetUnitShareMaskForPlayer( playerId, otherPlayerId ) end

---[[ GetUnreliableGold   ]]
-- @return int
-- @param playerId PlayerID
function CDOTA_PlayerResource:GetUnreliableGold( playerId ) end

---[[ GetXPPerMin   ]]
-- @return float
-- @param playerId PlayerID
function CDOTA_PlayerResource:GetXPPerMin( playerId ) end

---[[ HasCustomGameTicketForPlayerID  Does this player have a custom game ticket for this game? ]]
-- @return bool
-- @param playerId PlayerID
function CDOTA_PlayerResource:HasCustomGameTicketForPlayerID( playerId ) end

---[[ HasRandomed   ]]
-- @return bool
-- @param playerId PlayerID
function CDOTA_PlayerResource:HasRandomed( playerId ) end

---[[ HasSelectedHero   ]]
-- @return bool
-- @param playerId PlayerID
function CDOTA_PlayerResource:HasSelectedHero( playerId ) end

---[[ HasSetNetworkedEventActionClaimCount   ]]
-- @return bool
function CDOTA_PlayerResource:HasSetNetworkedEventActionClaimCount(  ) end

---[[ HaveAllPlayersJoined   ]]
-- @return bool
function CDOTA_PlayerResource:HaveAllPlayersJoined(  ) end

---[[ IncrementAssists   ]]
-- @return nil
-- @param playerId PlayerID
-- @param victimId PlayerID
function CDOTA_PlayerResource:IncrementAssists( playerId, victimId ) end

---[[ IncrementClaimedDenies   ]]
-- @return nil
-- @param playerId PlayerID
-- @param value int
function CDOTA_PlayerResource:IncrementClaimedDenies( playerId, value ) end

---[[ IncrementClaimedMisses   ]]
-- @return nil
-- @param playerId PlayerID
-- @param value int
function CDOTA_PlayerResource:IncrementClaimedMisses( playerId, value ) end

---[[ IncrementDeaths   ]]
-- @return nil
-- @param playerId PlayerID
-- @param killerId PlayerID
function CDOTA_PlayerResource:IncrementDeaths( playerId, killerId ) end

---[[ IncrementDenies   ]]
-- @return nil
-- @param playerId PlayerID
-- @param value int
function CDOTA_PlayerResource:IncrementDenies( playerId, value ) end

---[[ IncrementKills   ]]
-- @return nil
-- @param playerId PlayerID
-- @param victimId PlayerID
function CDOTA_PlayerResource:IncrementKills( playerId, victimId ) end

---[[ IncrementLastHitMultikill   ]]
-- @return nil
-- @param playerId PlayerID
-- @param count int
function CDOTA_PlayerResource:IncrementLastHitMultikill( playerId, count ) end

---[[ IncrementLastHits   ]]
-- @return nil
-- @param playerId PlayerID
-- @param count int
function CDOTA_PlayerResource:IncrementLastHits( playerId, count ) end

---[[ IncrementLastHitStreak   ]]
-- @return nil
-- @param playerId PlayerID
-- @param count int
function CDOTA_PlayerResource:IncrementLastHitStreak( playerId, count ) end

---[[ IncrementMisses   ]]
-- @return nil
-- @param playerId PlayerID
-- @param value int
function CDOTA_PlayerResource:IncrementMisses( playerId, value ) end

---[[ IncrementNearbyCreepDeaths   ]]
-- @return nil
-- @param playerId PlayerID
-- @param creeps int
function CDOTA_PlayerResource:IncrementNearbyCreepDeaths( playerId, creeps ) end

---[[ IncrementStreak   ]]
-- @return nil
-- @param playerId PlayerID
-- @param count int
function CDOTA_PlayerResource:IncrementStreak( playerId, count ) end

---[[ IncrementTotalEarnedXP   ]]
-- @return nil
-- @param playerId PlayerID
-- @param xp int
-- @param reason EDOTA_ModifyXP_Reason
function CDOTA_PlayerResource:IncrementTotalEarnedXP( playerId, xp, reason ) end

---[[ IsBroadcaster   ]]
-- @return bool
-- @param playerId PlayerID
function CDOTA_PlayerResource:IsBroadcaster( playerId ) end

---[[ IsDisableHelpSetForPlayerID   ]]
-- @return bool
-- @param playerId PlayerID
-- @param otherPlayerId PlayerID
function CDOTA_PlayerResource:IsDisableHelpSetForPlayerID( playerId, otherPlayerId ) end

---[[ IsFakeClient   ]]
-- @return bool
-- @param playerId PlayerID
function CDOTA_PlayerResource:IsFakeClient( playerId ) end

---[[ IsHeroSelected   ]]
-- @return bool
-- @param heroname string
-- @param ignoreUnrevealedPick bool
function CDOTA_PlayerResource:IsHeroSelected( heroname, ignoreUnrevealedPick ) end

---[[ IsHeroSharedWithPlayerID   ]]
-- @return bool
-- @param unitOwnerPlayerId PlayerID
-- @param otherPlayerId PlayerID
function CDOTA_PlayerResource:IsHeroSharedWithPlayerID( unitOwnerPlayerId, otherPlayerId ) end

---[[ IsValidPlayer   ]]
-- @return bool
-- @param playerId int
function CDOTA_PlayerResource:IsValidPlayer( playerId ) end

---[[ IsValidPlayerID   ]]
-- @return bool
-- @param playerId int
function CDOTA_PlayerResource:IsValidPlayerID( playerId ) end

---[[ IsValidTeamPlayer   ]]
-- @return bool
-- @param playerId int
function CDOTA_PlayerResource:IsValidTeamPlayer( playerId ) end

---[[ IsValidTeamPlayerID   ]]
-- @return bool
-- @param playerId int
function CDOTA_PlayerResource:IsValidTeamPlayerID( playerId ) end

---[[ ModifyGold   ]]
-- @return int
-- @param playerId PlayerID
-- @param goldChange int
-- @param reliable bool
-- @param reason EDOTA_ModifyGold_Reason
function CDOTA_PlayerResource:ModifyGold( playerId, goldChange, reliable, reason ) end

---[[ NumPlayers   ]]
-- @return int
function CDOTA_PlayerResource:NumPlayers(  ) end

---[[ NumTeamPlayers   ]]
-- @return int
function CDOTA_PlayerResource:NumTeamPlayers(  ) end

---[[ RecordConsumableAbilityChargeChange  Increment or decrement consumable charges (nPlayerID, item_definition_index, nChargeIncrementOrDecrement). ]]
-- @return nil
-- @param playerId PlayerID
-- @param itemDefinitionIndex int
-- @param chargeIncrementOrDecrement int
function CDOTA_PlayerResource:RecordConsumableAbilityChargeChange( playerId, itemDefinitionIndex, chargeIncrementOrDecrement ) end

---[[ RecordEventActionGrant   ]]
-- @return nil
-- @param playerId PlayerID
-- @param event int
-- @param unActionId int
-- @param unAudit int
-- @param unQuantity uint
-- @param unAuditData uint
function CDOTA_PlayerResource:RecordEventActionGrant( playerId, event, unActionId, unAudit, unQuantity, unAuditData ) end

---[[ RecordEventActionGrantForPrimaryEvent   ]]
-- @return nil
-- @param playerId PlayerID
-- @param actionName string
-- @param unAudit int
-- @param unQuantity uint
-- @param unAuditData uint
function CDOTA_PlayerResource:RecordEventActionGrantForPrimaryEvent( playerId, actionName, unAudit, unQuantity, unAuditData ) end

---[[ ReplaceHeroWith  Replaces the player's hero with a new one of the specified class, gold and XP. ]]
-- @return CDOTA_BaseNPC_Hero
-- @param playerId PlayerID
-- @param heroClass string
-- @param gold int
-- @param xp int
function CDOTA_PlayerResource:ReplaceHeroWith( playerId, heroClass, gold, xp ) end

---[[ ReplaceHeroWithNoTransfer  Replaces the player's hero with a new one of the specified class, gold and XP, without transferring items/abilities if same hero. ]]
-- @return handle
-- @param playerId PlayerID
-- @param heroClass string
-- @param gold int
-- @param xp int
function CDOTA_PlayerResource:ReplaceHeroWithNoTransfer( playerId, heroClass, gold, xp ) end

---[[ ResetBuybackCostTime   ]]
-- @return nil
-- @param playerId PlayerID
function CDOTA_PlayerResource:ResetBuybackCostTime( playerId ) end

---[[ ResetTotalEarnedGold   ]]
-- @return nil
-- @param playerId PlayerID
function CDOTA_PlayerResource:ResetTotalEarnedGold( playerId ) end

---[[ SetBuybackCooldownTime   ]]
-- @return nil
-- @param playerId PlayerID
-- @param buybackCooldown float
function CDOTA_PlayerResource:SetBuybackCooldownTime( playerId, buybackCooldown ) end

---[[ SetBuybackGoldLimitTime   ]]
-- @return nil
-- @param playerId PlayerID
-- @param buybackCooldown float
function CDOTA_PlayerResource:SetBuybackGoldLimitTime( playerId, buybackCooldown ) end

---[[ SetCameraTarget  Force the given player's camera to follow the given entity. ]]
-- @return nil
-- @param playerId PlayerID
-- @param target CBaseEntity
function CDOTA_PlayerResource:SetCameraTarget( playerId, target ) end

---[[ SetCanRepick   ]]
-- @return nil
-- @param playerId PlayerID
-- @param canRepick bool
function CDOTA_PlayerResource:SetCanRepick( playerId, canRepick ) end

---[[ SetCustomBuybackCooldown  Set the buyback cooldown for this player. ]]
-- @return nil
-- @param playerId PlayerID
-- @param cooldownTime float
function CDOTA_PlayerResource:SetCustomBuybackCooldown( playerId, cooldownTime ) end

---[[ SetCustomBuybackCost  Set the buyback cost for this player. ]]
-- @return nil
-- @param playerId PlayerID
-- @param goldCost int
function CDOTA_PlayerResource:SetCustomBuybackCost( playerId, goldCost ) end

---[[ SetCustomIntParam   ]]
-- @return nil
-- @param playerId PlayerID
-- @param param int
function CDOTA_PlayerResource:SetCustomIntParam( playerId, param ) end

---[[ SetCustomPlayerColor  Set custom color for player. ]]
-- @return nil
-- @param playerId PlayerID
-- @param r int
-- @param g int
-- @param b int
function CDOTA_PlayerResource:SetCustomPlayerColor( playerId, r, g, b ) end

---[[ SetCustomTeamAssignment  Set custom team assignment for this player. ]]
-- @return nil
-- @param playerId PlayerID
-- @param teamAssignment DOTATeam_t
function CDOTA_PlayerResource:SetCustomTeamAssignment( playerId, teamAssignment ) end

---[[ SetGold   ]]
-- @return nil
-- @param playerId PlayerID
-- @param gold int
-- @param reliable bool
function CDOTA_PlayerResource:SetGold( playerId, gold, reliable ) end

---[[ SetHasRandomed   ]]
-- @return nil
-- @param playerId PlayerID
function CDOTA_PlayerResource:SetHasRandomed( playerId ) end

---[[ SetLastBuybackTime   ]]
-- @return nil
-- @param playerId PlayerID
-- @param lastBuybackTime float
function CDOTA_PlayerResource:SetLastBuybackTime( playerId, lastBuybackTime ) end

---[[ SetOverrideSelectionEntity  Set the forced selection entity for a player. ]]
-- @return nil
-- @param playerId PlayerID
-- @param entity CDOTA_BaseNPC
function CDOTA_PlayerResource:SetOverrideSelectionEntity( playerId, entity ) end

---[[ SetUnitShareMaskForPlayer   ]]
-- @return nil
-- @param playerId PlayerID
-- @param otherPlayerId PlayerID
-- @param flag int
-- @param state bool
function CDOTA_PlayerResource:SetUnitShareMaskForPlayer( playerId, otherPlayerId, flag, state ) end

---[[ SpendGold   ]]
-- @return nil
-- @param playerId PlayerID
-- @param cost int
-- @param reason EDOTA_ModifyGold_Reason
function CDOTA_PlayerResource:SpendGold( playerId, cost, reason ) end

---[[ UpdateTeamSlot   ]]
-- @return nil
-- @param playerId PlayerID
-- @param teamNumber DOTATeam_t
-- @param desiredSlot int
function CDOTA_PlayerResource:UpdateTeamSlot( playerId, teamNumber, desiredSlot ) end

---[[ WhoSelectedHero   ]]
-- @return PlayerID
-- @param heroFilename string
-- @param ignoreUnrevealedPick bool
function CDOTA_PlayerResource:WhoSelectedHero( heroFilename, ignoreUnrevealedPick ) end

---[[ GetShopType  Get the DOTA_SHOP_TYPE. ]]
-- @return DOTA_SHOP_TYPE
function CDOTA_ShopTrigger:GetShopType(  ) end

---[[ SetShopType  Set the DOTA_SHOP_TYPE. ]]
-- @return nil
-- @param shopType DOTA_SHOP_TYPE
function CDOTA_ShopTrigger:SetShopType( shopType ) end

---[[ IsEnabled  Returns whether the obstruction is currently active. ]]
-- @return bool
function CDOTA_SimpleObstruction:IsEnabled(  ) end

---[[ SetEnabled  Enable or disable the obstruction. ]]
-- @return nil
-- @param enabled bool
-- @param force bool
function CDOTA_SimpleObstruction:SetEnabled( enabled, force ) end

---[[ RespawnCourier  Respawn the courier. ]]
-- @return nil
function CDOTA_Unit_Courier:RespawnCourier(  ) end

---[[ UpgradeCourier  Upgrade the courier ( int param ) times. ]]
-- @return nil
-- @param level int
function CDOTA_Unit_Courier:UpgradeCourier( level ) end

---[[ SetServerAuthoritative  Determines whether response criteria is matched on server or client. ]]
-- @return nil
-- @param isServerAuthoritative bool
function CDOTA_Unit_CustomGameAnnouncer:SetServerAuthoritative( isServerAuthoritative ) end

---[[ SetAnimation  Set the animation sequence for this entity. ]]
-- @return nil
-- @param animation string
function CDOTA_Unit_CustomGameAnnouncerAghanim:SetAnimation( animation ) end

---[[ SetServerAuthoritative  Determines whether response criteria is matched on server or client. ]]
-- @return nil
-- @param isServerAuthoritative bool
function CDOTA_Unit_CustomGameAnnouncerAghanim:SetServerAuthoritative( isServerAuthoritative ) end

---[[ GetHorn  Is the Nian horn? ]]
-- @return handle
function CDOTA_Unit_Nian:GetHorn(  ) end

---[[ GetTail  Is the Nian's tail broken? ]]
-- @return handle
function CDOTA_Unit_Nian:GetTail(  ) end

---[[ IsHornAlive  Is the Nian's horn broken? ]]
-- @return bool
function CDOTA_Unit_Nian:IsHornAlive(  ) end

---[[ IsTailAlive  Is the Nian's tail broken? ]]
-- @return bool
function CDOTA_Unit_Nian:IsTailAlive(  ) end

---[[ CanAbilityBeUpgraded   ]]
-- @return bool
function CDOTABaseAbility:CanAbilityBeUpgraded(  ) end

---[[ CastAbility   ]]
-- @return bool
function CDOTABaseAbility:CastAbility(  ) end

---[[ ContinueCasting   ]]
-- @return bool
function CDOTABaseAbility:ContinueCasting(  ) end

---[[ CreateVisibilityNode   ]]
-- @return nil
-- @param location Vector
-- @param radius float
-- @param duration float
function CDOTABaseAbility:CreateVisibilityNode( location, radius, duration ) end

---[[ DecrementModifierRefCount   ]]
-- @return nil
function CDOTABaseAbility:DecrementModifierRefCount(  ) end

---[[ EnableAbilityChargesOnTalentUpgrade   ]]
-- @return nil
-- @param ability handle
-- @param talentName string
function CDOTABaseAbility:EnableAbilityChargesOnTalentUpgrade( ability, talentName ) end

---[[ EndChannel   ]]
-- @return nil
-- @param interrupted bool
function CDOTABaseAbility:EndChannel( interrupted ) end

---[[ EndCooldown  Clear the cooldown remaining on this ability. ]]
-- @return nil
function CDOTABaseAbility:EndCooldown(  ) end

---[[ ForceSetFrozenCooldown   ]]
-- @return nil
-- @param value int
function CDOTABaseAbility:ForceSetFrozenCooldown( value ) end

---[[ GetAbilityChargeRestoreTime   ]]
-- @return float
-- @param level int
function CDOTABaseAbility:GetAbilityChargeRestoreTime( level ) end

---[[ GetAbilityDamage   ]]
-- @return int
function CDOTABaseAbility:GetAbilityDamage(  ) end

---[[ GetAbilityDamageType   ]]
-- @return DAMAGE_TYPES
function CDOTABaseAbility:GetAbilityDamageType(  ) end

---[[ GetAbilityIndex   ]]
-- @return int
function CDOTABaseAbility:GetAbilityIndex(  ) end

---[[ GetAbilityKeyValues  Gets the key values definition for this ability. ]]
-- @return table
function CDOTABaseAbility:GetAbilityKeyValues(  ) end

---[[ GetAbilityName  Returns the name of this ability. ]]
-- @return string
function CDOTABaseAbility:GetAbilityName(  ) end

---[[ GetAbilityTargetFlags   ]]
-- @return DOTA_UNIT_TARGET_FLAGS
function CDOTABaseAbility:GetAbilityTargetFlags(  ) end

---[[ GetAbilityTargetTeam   ]]
-- @return DOTA_UNIT_TARGET_TEAM
function CDOTABaseAbility:GetAbilityTargetTeam(  ) end

---[[ GetAbilityTargetType   ]]
-- @return DOTA_UNIT_TARGET_TYPE
function CDOTABaseAbility:GetAbilityTargetType(  ) end

---[[ GetAbilityType   ]]
-- @return int
function CDOTABaseAbility:GetAbilityType(  ) end

---[[ GetAnimationIgnoresModelScale   ]]
-- @return bool
function CDOTABaseAbility:GetAnimationIgnoresModelScale(  ) end

---[[ GetAOERadius   ]]
-- @return float
function CDOTABaseAbility:GetAOERadius(  ) end

---[[ GetAssociatedPrimaryAbilities   ]]
-- @return string
function CDOTABaseAbility:GetAssociatedPrimaryAbilities(  ) end

---[[ GetAssociatedSecondaryAbilities   ]]
-- @return string
function CDOTABaseAbility:GetAssociatedSecondaryAbilities(  ) end

---[[ GetAutoCastState   ]]
-- @return bool
function CDOTABaseAbility:GetAutoCastState(  ) end

---[[ GetBackswingTime   ]]
-- @return float
function CDOTABaseAbility:GetBackswingTime(  ) end

---[[ GetBehavior   ]]
-- @return DOTA_ABILITY_BEHAVIOR
function CDOTABaseAbility:GetBehavior(  ) end

---[[ GetBehaviorInt  Get ability behavior flags as an int for compatability. ]]
-- @return DOTA_ABILITY_BEHAVIOR
function CDOTABaseAbility:GetBehaviorInt(  ) end

---[[ GetCaster  Get the owner of this ability. ]]
-- @return CDOTA_BaseNPC
function CDOTABaseAbility:GetCaster(  ) end

---[[ GetCastPoint   ]]
-- @return float
function CDOTABaseAbility:GetCastPoint(  ) end

---[[ GetCastPointModifier   ]]
-- @return float
function CDOTABaseAbility:GetCastPointModifier(  ) end

---[[ GetCastRange  Gets the cast range of the ability. ]]
-- @return int
-- @param location Vector
-- @param target CDOTA_BaseNPC
function CDOTABaseAbility:GetCastRange( location, target ) end

---[[ GetChannelledHealthCostPerSecond   ]]
-- @return int
-- @param level int
function CDOTABaseAbility:GetChannelledHealthCostPerSecond( level ) end

---[[ GetChannelledManaCostPerSecond   ]]
-- @return int
-- @param level int
function CDOTABaseAbility:GetChannelledManaCostPerSecond( level ) end

---[[ GetChannelStartTime   ]]
-- @return float
function CDOTABaseAbility:GetChannelStartTime(  ) end

---[[ GetChannelTime   ]]
-- @return float
function CDOTABaseAbility:GetChannelTime(  ) end

---[[ GetCloneSource   ]]
-- @return CDOTA_BaseNPC
function CDOTABaseAbility:GetCloneSource(  ) end

---[[ GetConceptRecipientType   ]]
-- @return int
function CDOTABaseAbility:GetConceptRecipientType(  ) end

---[[ GetCooldown  Get the cooldown duration for this ability at a given level, not the amount of cooldown actually left. ]]
-- @return float
-- @param level int
function CDOTABaseAbility:GetCooldown( level ) end

---[[ GetCooldownTime   ]]
-- @return float
function CDOTABaseAbility:GetCooldownTime(  ) end

---[[ GetCooldownTimeRemaining   ]]
-- @return float
function CDOTABaseAbility:GetCooldownTimeRemaining(  ) end

---[[ GetCurrentAbilityCharges  The number of charges remaining on this ability. ]]
-- @return int
function CDOTABaseAbility:GetCurrentAbilityCharges(  ) end

---[[ GetCursorPosition   ]]
-- @return Vector
function CDOTABaseAbility:GetCursorPosition(  ) end

---[[ GetCursorTarget   ]]
-- @return CDOTA_BaseNPC
function CDOTABaseAbility:GetCursorTarget(  ) end

---[[ GetCursorTargetingNothing   ]]
-- @return bool
function CDOTABaseAbility:GetCursorTargetingNothing(  ) end

---[[ GetDuration   ]]
-- @return float
function CDOTABaseAbility:GetDuration(  ) end

---[[ GetEffectiveCastRange  Gets the cast range of the ability, taking modifiers into account. ]]
-- @return int
-- @param location Vector
-- @param target handle
function CDOTABaseAbility:GetEffectiveCastRange( location, target ) end

---[[ GetEffectiveCooldown   ]]
-- @return float
-- @param level int
function CDOTABaseAbility:GetEffectiveCooldown( level ) end

---[[ GetEffectiveHealthCost   ]]
-- @return int
-- @param level int
function CDOTABaseAbility:GetEffectiveHealthCost( level ) end

---[[ GetEffectiveManaCost   ]]
-- @return int
-- @param level int
function CDOTABaseAbility:GetEffectiveManaCost( level ) end

---[[ GetGoldCost   ]]
-- @return int
-- @param level int
function CDOTABaseAbility:GetGoldCost( level ) end

---[[ GetGoldCostForUpgrade   ]]
-- @return int
-- @param level int
function CDOTABaseAbility:GetGoldCostForUpgrade( level ) end

---[[ GetHealthCost   ]]
-- @return int
-- @param level int
function CDOTABaseAbility:GetHealthCost( level ) end

---[[ GetHeroLevelRequiredToUpgrade   ]]
-- @return int
function CDOTABaseAbility:GetHeroLevelRequiredToUpgrade(  ) end

---[[ GetInitialAbilityCharges   ]]
-- @return int
-- @param level int
function CDOTABaseAbility:GetInitialAbilityCharges( level ) end

---[[ GetIntrinsicModifierName   ]]
-- @return string
function CDOTABaseAbility:GetIntrinsicModifierName(  ) end

---[[ GetLevel  Get the current level of the ability. ]]
-- @return int
function CDOTABaseAbility:GetLevel(  ) end

---[[ GetLevelSpecialValueFor  Gets a value from this ability's special value block for passed level. ]]
-- @return float
-- @param name string
-- @param level int
function CDOTABaseAbility:GetLevelSpecialValueFor( name, level ) end

---[[ GetLevelSpecialValueNoOverride  Gets a value from this ability's special value block for passed level, ignoring MODIFIER_PROPERTY_OVERRIDE_ABILITY_SPECIAL. ]]
-- @return float
-- @param name string
-- @param level int
function CDOTABaseAbility:GetLevelSpecialValueNoOverride( name, level ) end

---[[ GetManaCost   ]]
-- @return int
-- @param level int
function CDOTABaseAbility:GetManaCost( level ) end

---[[ GetMaxAbilityCharges   ]]
-- @return int
-- @param level int
function CDOTABaseAbility:GetMaxAbilityCharges( level ) end

---[[ GetMaxLevel   ]]
-- @return int
function CDOTABaseAbility:GetMaxLevel(  ) end

---[[ GetModifierValue   ]]
-- @return float
function CDOTABaseAbility:GetModifierValue(  ) end

---[[ GetModifierValueBonus   ]]
-- @return float
function CDOTABaseAbility:GetModifierValueBonus(  ) end

---[[ GetPlaybackRateOverride   ]]
-- @return float
function CDOTABaseAbility:GetPlaybackRateOverride(  ) end

---[[ GetSharedCooldownName   ]]
-- @return string
function CDOTABaseAbility:GetSharedCooldownName(  ) end

---[[ GetSpecialValueFor  Gets a value from this ability's special value block for its current level. ]]
-- @return float
-- @param name string
function CDOTABaseAbility:GetSpecialValueFor( name ) end

---[[ GetStolenActivityModifier   ]]
-- @return string
function CDOTABaseAbility:GetStolenActivityModifier(  ) end

---[[ GetToggleState  Whether or not this ability is toggled. ]]
-- @return bool
function CDOTABaseAbility:GetToggleState(  ) end

---[[ GetUpgradeRecommended   ]]
-- @return bool
function CDOTABaseAbility:GetUpgradeRecommended(  ) end

---[[ HeroXPChange   ]]
-- @return bool
-- @param xp float
function CDOTABaseAbility:HeroXPChange( xp ) end

---[[ IncrementModifierRefCount   ]]
-- @return nil
function CDOTABaseAbility:IncrementModifierRefCount(  ) end

---[[ IsActivated   ]]
-- @return bool
function CDOTABaseAbility:IsActivated(  ) end

---[[ IsAttributeBonus   ]]
-- @return bool
function CDOTABaseAbility:IsAttributeBonus(  ) end

---[[ IsChanneling  Returns whether the ability is currently channeling. ]]
-- @return bool
function CDOTABaseAbility:IsChanneling(  ) end

---[[ IsCooldownReady   ]]
-- @return bool
function CDOTABaseAbility:IsCooldownReady(  ) end

---[[ IsCosmetic   ]]
-- @return bool
-- @param entity CBaseEntity
function CDOTABaseAbility:IsCosmetic( entity ) end

---[[ IsFullyCastable  Returns whether the ability can be cast. ]]
-- @return bool
function CDOTABaseAbility:IsFullyCastable(  ) end

---[[ IsHidden   ]]
-- @return bool
function CDOTABaseAbility:IsHidden(  ) end

---[[ IsHiddenAsSecondaryAbility   ]]
-- @return bool
function CDOTABaseAbility:IsHiddenAsSecondaryAbility(  ) end

---[[ IsHiddenWhenStolen   ]]
-- @return bool
function CDOTABaseAbility:IsHiddenWhenStolen(  ) end

---[[ IsInAbilityPhase  Returns whether the ability is currently casting. ]]
-- @return bool
function CDOTABaseAbility:IsInAbilityPhase(  ) end

---[[ IsItem  Whether or not this ability is an item. ]]
-- @return bool
function CDOTABaseAbility:IsItem(  ) end

---[[ IsOwnersGoldEnough   ]]
-- @return bool
-- @param issuerPlayerId PlayerID
function CDOTABaseAbility:IsOwnersGoldEnough( issuerPlayerId ) end

---[[ IsOwnersGoldEnoughForUpgrade   ]]
-- @return bool
function CDOTABaseAbility:IsOwnersGoldEnoughForUpgrade(  ) end

---[[ IsOwnersManaEnough   ]]
-- @return bool
function CDOTABaseAbility:IsOwnersManaEnough(  ) end

---[[ IsPassive   ]]
-- @return bool
function CDOTABaseAbility:IsPassive(  ) end

---[[ IsRefreshable   ]]
-- @return bool
function CDOTABaseAbility:IsRefreshable(  ) end

---[[ IsSharedWithTeammates   ]]
-- @return bool
function CDOTABaseAbility:IsSharedWithTeammates(  ) end

---[[ IsStealable   ]]
-- @return bool
function CDOTABaseAbility:IsStealable(  ) end

---[[ IsStolen   ]]
-- @return bool
function CDOTABaseAbility:IsStolen(  ) end

---[[ IsToggle   ]]
-- @return bool
function CDOTABaseAbility:IsToggle(  ) end

---[[ IsTrained   ]]
-- @return bool
function CDOTABaseAbility:IsTrained(  ) end

---[[ MarkAbilityButtonDirty  Mark the ability button for this ability as needing a refresh. ]]
-- @return nil
function CDOTABaseAbility:MarkAbilityButtonDirty(  ) end

---[[ NumModifiersUsingAbility   ]]
-- @return int
function CDOTABaseAbility:NumModifiersUsingAbility(  ) end

---[[ OnAbilityPhaseInterrupted   ]]
-- @return nil
function CDOTABaseAbility:OnAbilityPhaseInterrupted(  ) end

---[[ OnAbilityPhaseStart   ]]
-- @return bool
function CDOTABaseAbility:OnAbilityPhaseStart(  ) end

---[[ OnAbilityPinged   ]]
-- @return nil
-- @param playerId PlayerID
-- @param ctrlHeld bool
function CDOTABaseAbility:OnAbilityPinged( playerId, ctrlHeld ) end

---[[ OnChannelFinish   ]]
-- @return nil
-- @param interrupted bool
function CDOTABaseAbility:OnChannelFinish( interrupted ) end

---[[ OnChannelThink   ]]
-- @return nil
-- @param interval float
function CDOTABaseAbility:OnChannelThink( interval ) end

---[[ OnHeroCalculateStatBonus   ]]
-- @return nil
function CDOTABaseAbility:OnHeroCalculateStatBonus(  ) end

---[[ OnHeroLevelUp   ]]
-- @return nil
function CDOTABaseAbility:OnHeroLevelUp(  ) end

---[[ OnOwnerDied   ]]
-- @return nil
function CDOTABaseAbility:OnOwnerDied(  ) end

---[[ OnOwnerSpawned   ]]
-- @return nil
function CDOTABaseAbility:OnOwnerSpawned(  ) end

---[[ OnSpellStart   ]]
-- @return nil
function CDOTABaseAbility:OnSpellStart(  ) end

---[[ OnToggle   ]]
-- @return nil
function CDOTABaseAbility:OnToggle(  ) end

---[[ OnUpgrade   ]]
-- @return nil
function CDOTABaseAbility:OnUpgrade(  ) end

---[[ PayGoldCost   ]]
-- @return nil
function CDOTABaseAbility:PayGoldCost(  ) end

---[[ PayGoldCostForUpgrade   ]]
-- @return nil
function CDOTABaseAbility:PayGoldCostForUpgrade(  ) end

---[[ PayHealthCost   ]]
-- @return nil
function CDOTABaseAbility:PayHealthCost(  ) end

---[[ PayManaCost   ]]
-- @return nil
function CDOTABaseAbility:PayManaCost(  ) end

---[[ PlaysDefaultAnimWhenStolen   ]]
-- @return bool
function CDOTABaseAbility:PlaysDefaultAnimWhenStolen(  ) end

---[[ ProcsMagicStick   ]]
-- @return bool
function CDOTABaseAbility:ProcsMagicStick(  ) end

---[[ RefCountsModifiers   ]]
-- @return bool
function CDOTABaseAbility:RefCountsModifiers(  ) end

---[[ RefreshCharges   ]]
-- @return nil
function CDOTABaseAbility:RefreshCharges(  ) end

---[[ RefreshIntrinsicModifier   ]]
-- @return nil
function CDOTABaseAbility:RefreshIntrinsicModifier(  ) end

---[[ RefundHealthCost   ]]
-- @return nil
function CDOTABaseAbility:RefundHealthCost(  ) end

---[[ RefundManaCost   ]]
-- @return nil
function CDOTABaseAbility:RefundManaCost(  ) end

---[[ RequiresFacing   ]]
-- @return bool
function CDOTABaseAbility:RequiresFacing(  ) end

---[[ ResetToggleOnRespawn   ]]
-- @return bool
function CDOTABaseAbility:ResetToggleOnRespawn(  ) end

---[[ SetAbilityIndex   ]]
-- @return nil
-- @param index int
function CDOTABaseAbility:SetAbilityIndex( index ) end

---[[ SetActivated   ]]
-- @return nil
-- @param activated bool
function CDOTABaseAbility:SetActivated( activated ) end

---[[ SetChanneling   ]]
-- @return nil
-- @param channeling bool
function CDOTABaseAbility:SetChanneling( channeling ) end

---[[ SetCurrentAbilityCharges   ]]
-- @return nil
-- @param charges int
function CDOTABaseAbility:SetCurrentAbilityCharges( charges ) end

---[[ SetFrozenCooldown   ]]
-- @return nil
-- @param frozenCooldown bool
function CDOTABaseAbility:SetFrozenCooldown( frozenCooldown ) end

---[[ SetHidden   ]]
-- @return nil
-- @param hidden bool
function CDOTABaseAbility:SetHidden( hidden ) end

---[[ SetInAbilityPhase   ]]
-- @return nil
-- @param inAbilityPhase bool
function CDOTABaseAbility:SetInAbilityPhase( inAbilityPhase ) end

---[[ SetLevel  Sets the level of this ability. ]]
-- @return nil
-- @param level int
function CDOTABaseAbility:SetLevel( level ) end

---[[ SetOverrideCastPoint   ]]
-- @return nil
-- @param castPoint float
function CDOTABaseAbility:SetOverrideCastPoint( castPoint ) end

---[[ SetRefCountsModifiers   ]]
-- @return nil
-- @param refCounts bool
function CDOTABaseAbility:SetRefCountsModifiers( refCounts ) end

---[[ SetStealable   ]]
-- @return nil
-- @param stealable bool
function CDOTABaseAbility:SetStealable( stealable ) end

---[[ SetStolen   ]]
-- @return nil
-- @param stolen bool
function CDOTABaseAbility:SetStolen( stolen ) end

---[[ SetUpgradeRecommended   ]]
-- @return nil
-- @param upgradeRecommended bool
function CDOTABaseAbility:SetUpgradeRecommended( upgradeRecommended ) end

---[[ ShouldUseResources   ]]
-- @return bool
function CDOTABaseAbility:ShouldUseResources(  ) end

---[[ SpeakAbilityConcept   ]]
-- @return nil
-- @param concept int
function CDOTABaseAbility:SpeakAbilityConcept( concept ) end

---[[ SpeakTrigger   ]]
-- @return unknown
function CDOTABaseAbility:SpeakTrigger(  ) end

---[[ StartCooldown   ]]
-- @return nil
-- @param cooldown float
function CDOTABaseAbility:StartCooldown( cooldown ) end

---[[ ToggleAbility   ]]
-- @return nil
function CDOTABaseAbility:ToggleAbility(  ) end

---[[ ToggleAutoCast   ]]
-- @return nil
function CDOTABaseAbility:ToggleAutoCast(  ) end

---[[ UpgradeAbility   ]]
-- @return nil
-- @param supressSpeech bool
function CDOTABaseAbility:UpgradeAbility( supressSpeech ) end

---[[ UseResources   ]]
-- @return nil
-- @param mana bool
-- @param useHealth bool
-- @param gold bool
-- @param cooldown bool
function CDOTABaseAbility:UseResources( mana, useHealth, gold, cooldown ) end

---[[ AddAbilityUpgradeToWhitelist  Const char* pszAbilityName. ]]
-- @return nil
-- @param abilityName string
function CDOTABaseGameMode:AddAbilityUpgradeToWhitelist( abilityName ) end

---[[ AddItemToCustomShop  Add an item to purchase at a custom shop. ]]
-- @return nil
-- @param itemName string
-- @param shopName string
-- @param category string
function CDOTABaseGameMode:AddItemToCustomShop( itemName, shopName, category ) end

---[[ AddRealTimeCombatAnalyzerQuery  Begin tracking a sequence of events using the real time combat analyzer. ]]
-- @return CombatAnalyzerQueryID
-- @param queryTable handle
-- @param player CDOTAPlayerController
-- @param queryName string
function CDOTABaseGameMode:AddRealTimeCombatAnalyzerQuery( queryTable, player, queryName ) end

---[[ AllocateFowBlockerRegion  Allocates an entity which can be used by custom games to control FoW occlusion volumes. ]]
-- @return CFoWBlockerRegion
-- @param minX float
-- @param minY float
-- @param maxX float
-- @param maxY float
-- @param gridSize float
function CDOTABaseGameMode:AllocateFowBlockerRegion( minX, minY, maxX, maxY, gridSize ) end

---[[ AreWeatherEffectsDisabled  Get if weather effects are disabled on the client. ]]
-- @return bool
function CDOTABaseGameMode:AreWeatherEffectsDisabled(  ) end

---[[ ClearBountyRunePickupFilter  Clear the script filter that controls bounty rune pickup behavior. ]]
-- @return nil
function CDOTABaseGameMode:ClearBountyRunePickupFilter(  ) end

---[[ ClearDamageFilter  Clear the script filter that controls how a unit takes damage. ]]
-- @return nil
function CDOTABaseGameMode:ClearDamageFilter(  ) end

---[[ ClearExecuteOrderFilter  Clear the script filter that controls when a unit picks up an item. ]]
-- @return nil
function CDOTABaseGameMode:ClearExecuteOrderFilter(  ) end

---[[ ClearHealingFilter  Clear the script filter that controls how a unit heals. ]]
-- @return nil
function CDOTABaseGameMode:ClearHealingFilter(  ) end

---[[ ClearItemAddedToInventoryFilter  Clear the script filter that controls the item added to inventory filter. ]]
-- @return nil
function CDOTABaseGameMode:ClearItemAddedToInventoryFilter(  ) end

---[[ ClearModifierGainedFilter  Clear the script filter that controls the modifier filter. ]]
-- @return nil
function CDOTABaseGameMode:ClearModifierGainedFilter(  ) end

---[[ ClearModifyExperienceFilter  Clear the script filter that controls how hero experience is modified. ]]
-- @return nil
function CDOTABaseGameMode:ClearModifyExperienceFilter(  ) end

---[[ ClearModifyGoldFilter  Clear the script filter that controls how hero gold is modified. ]]
-- @return nil
function CDOTABaseGameMode:ClearModifyGoldFilter(  ) end

---[[ ClearRuneSpawnFilter  Clear the script filter that controls what rune spawns. ]]
-- @return nil
function CDOTABaseGameMode:ClearRuneSpawnFilter(  ) end

---[[ ClearTrackingProjectileFilter  Clear the script filter that controls when tracking projectiles are launched. ]]
-- @return nil
function CDOTABaseGameMode:ClearTrackingProjectileFilter(  ) end

---[[ DisableClumpingBehaviorByDefault  Disable npc_dota_creature clumping behavior by default. ]]
-- @return nil
-- @param disabled bool
function CDOTABaseGameMode:DisableClumpingBehaviorByDefault( disabled ) end

---[[ DisableHudFlip  Use to disable hud flip for this mod. ]]
-- @return nil
-- @param disable bool
function CDOTABaseGameMode:DisableHudFlip( disable ) end

---[[ EnableAbilityUpgradeWhitelist  Bool bEnabled. ]]
-- @return nil
-- @param enabled bool
function CDOTABaseGameMode:EnableAbilityUpgradeWhitelist( enabled ) end

---[[ GetAlwaysShowPlayerInventory  Show the player hero's inventory in the HUD, regardless of what unit is selected. ]]
-- @return bool
function CDOTABaseGameMode:GetAlwaysShowPlayerInventory(  ) end

---[[ GetAlwaysShowPlayerNames  Get whether player names are always shown, regardless of client setting. ]]
-- @return bool
function CDOTABaseGameMode:GetAlwaysShowPlayerNames(  ) end

---[[ GetAnnouncerDisabled  Are in-game announcers disabled? ]]
-- @return bool
function CDOTABaseGameMode:GetAnnouncerDisabled(  ) end

---[[ GetAnnouncerGameModeAnnounceDisabled  Is the announcer announcing the mode / saying Choose Your Hero on start of custom games disabled? ]]
-- @return bool
function CDOTABaseGameMode:GetAnnouncerGameModeAnnounceDisabled(  ) end

---[[ GetCameraDistanceOverride  Set a different camera distance; dota default is 1134. ]]
-- @return float
function CDOTABaseGameMode:GetCameraDistanceOverride(  ) end

---[[ GetCustomAttributeDerivedStatValue  Get current derived stat value constant. ]]
-- @return float
-- @param derivedStatType AttributeDerivedStats
function CDOTABaseGameMode:GetCustomAttributeDerivedStatValue( derivedStatType ) end

---[[ GetCustomBackpackCooldownPercent  Get the current rate cooldown ticks down for items in the backpack. ]]
-- @return float
function CDOTABaseGameMode:GetCustomBackpackCooldownPercent(  ) end

---[[ GetCustomBackpackSwapCooldown  Get the current custom backpack swap cooldown. ]]
-- @return float
function CDOTABaseGameMode:GetCustomBackpackSwapCooldown(  ) end

---[[ GetCustomBuybackCooldownEnabled  Turns on capability to define custom buyback cooldowns. ]]
-- @return bool
function CDOTABaseGameMode:GetCustomBuybackCooldownEnabled(  ) end

---[[ GetCustomBuybackCostEnabled  Turns on capability to define custom buyback costs. ]]
-- @return bool
function CDOTABaseGameMode:GetCustomBuybackCostEnabled(  ) end

---[[ GetCustomDireScore  Get the topbar score display value for dire. ]]
-- @return int
function CDOTABaseGameMode:GetCustomDireScore(  ) end

---[[ GetCustomGlyphCooldown  Get the current custom glyph cooldown. ]]
-- @return float
function CDOTABaseGameMode:GetCustomGlyphCooldown(  ) end

---[[ GetCustomHeroMaxLevel  Allows definition of the max level heroes can achieve (default is 25). ]]
-- @return int
function CDOTABaseGameMode:GetCustomHeroMaxLevel(  ) end

---[[ GetCustomRadiantScore  Get the topbar score display value for radiant. ]]
-- @return int
function CDOTABaseGameMode:GetCustomRadiantScore(  ) end

---[[ GetCustomScanCooldown  Get the current custom scan cooldown. ]]
-- @return float
function CDOTABaseGameMode:GetCustomScanCooldown(  ) end

---[[ GetDaynightCycleAdvanceRate  Get the rate at which the day/night cycle advances (1.0 = default). ]]
-- @return float
function CDOTABaseGameMode:GetDaynightCycleAdvanceRate(  ) end

---[[ GetEventGameSeed  Get the Game Seed passed from the GC. ]]
-- @return int
function CDOTABaseGameMode:GetEventGameSeed(  ) end

---[[ GetEventWindowStartTime  Get the Event Window Start Time passed from the GC. ]]
-- @return uint
function CDOTABaseGameMode:GetEventWindowStartTime(  ) end

---[[ GetFixedRespawnTime  Gets the fixed respawn time. ]]
-- @return float
function CDOTABaseGameMode:GetFixedRespawnTime(  ) end

---[[ GetFogOfWarDisabled  Turn the fog of war on or off. ]]
-- @return bool
function CDOTABaseGameMode:GetFogOfWarDisabled(  ) end

---[[ GetGoldSoundDisabled  Turn the sound when gold is acquired off/on. ]]
-- @return bool
function CDOTABaseGameMode:GetGoldSoundDisabled(  ) end

---[[ GetHUDVisible  Returns the HUD element visibility. ]]
-- @return bool
-- @param element int
function CDOTABaseGameMode:GetHUDVisible( element ) end

---[[ GetMaximumAttackSpeed  Get the maximum attack speed for units. ]]
-- @return int
function CDOTABaseGameMode:GetMaximumAttackSpeed(  ) end

---[[ GetMinimumAttackSpeed  Get the minimum attack speed for units. ]]
-- @return int
function CDOTABaseGameMode:GetMinimumAttackSpeed(  ) end

---[[ GetRecommendedItemsDisabled  Turn the panel for showing recommended items at the shop off/on. ]]
-- @return bool
function CDOTABaseGameMode:GetRecommendedItemsDisabled(  ) end

---[[ GetRespawnTimeScale  Returns the scale applied to non-fixed respawn times. ]]
-- @return float
function CDOTABaseGameMode:GetRespawnTimeScale(  ) end

---[[ GetStashPurchasingDisabled  Turn purchasing items to the stash off/on. If purchasing to the stash is off the player must be at a shop to purchase items. ]]
-- @return bool
function CDOTABaseGameMode:GetStashPurchasingDisabled(  ) end

---[[ GetStickyItemDisabled  Hide the sticky item in the quickbuy. ]]
-- @return bool
function CDOTABaseGameMode:GetStickyItemDisabled(  ) end

---[[ GetTopBarTeamValuesOverride  Override the values of the team values on the top game bar. ]]
-- @return bool
function CDOTABaseGameMode:GetTopBarTeamValuesOverride(  ) end

---[[ GetTopBarTeamValuesVisible  Turning on/off the team values on the top game bar. ]]
-- @return bool
function CDOTABaseGameMode:GetTopBarTeamValuesVisible(  ) end

---[[ GetTowerBackdoorProtectionEnabled  Gets whether tower backdoor protection is enabled or not. ]]
-- @return bool
function CDOTABaseGameMode:GetTowerBackdoorProtectionEnabled(  ) end

---[[ GetUseCustomHeroLevels  Are custom-defined XP values for hero level ups in use? ]]
-- @return bool
function CDOTABaseGameMode:GetUseCustomHeroLevels(  ) end

---[[ GetWaterRuneLastSpawnTime  Gets the time from game start during which water runes spawn. ]]
-- @return float
function CDOTABaseGameMode:GetWaterRuneLastSpawnTime(  ) end

---[[ IsAbilityUpgradeWhitelisted  Const char* pszAbilityName. ]]
-- @return bool
-- @param abilityName string
function CDOTABaseGameMode:IsAbilityUpgradeWhitelisted( abilityName ) end

---[[ IsBuybackEnabled  Enables or disables buyback completely. ]]
-- @return bool
function CDOTABaseGameMode:IsBuybackEnabled(  ) end

---[[ IsDaynightCycleDisabled  Is the day/night cycle disabled? ]]
-- @return bool
function CDOTABaseGameMode:IsDaynightCycleDisabled(  ) end

---[[ ListenForQueryFailed  Set function and context for real time combat analyzer query failed. ]]
-- @return nil
-- @param function [object Object]
-- @param context table
function CDOTABaseGameMode:ListenForQueryFailed( function, context ) end

---[[ ListenForQueryProgressChanged  Set function and context for real time combat analyzer query progress changed. ]]
-- @return nil
-- @param function [object Object]
-- @param context table
function CDOTABaseGameMode:ListenForQueryProgressChanged( function, context ) end

---[[ ListenForQuerySucceeded  Set function and context for real time combat analyzer query succeeded. ]]
-- @return nil
-- @param function [object Object]
-- @param context table
function CDOTABaseGameMode:ListenForQuerySucceeded( function, context ) end

---[[ RemoveAbilityUpgradeFromWhitelist  Const char* pszAbilityName. ]]
-- @return nil
-- @param abilityName string
function CDOTABaseGameMode:RemoveAbilityUpgradeFromWhitelist( abilityName ) end

---[[ RemoveItemFromCustomShop  Remove an item to purchase at a custom shop. ]]
-- @return nil
-- @param itemName string
-- @param shopName string
function CDOTABaseGameMode:RemoveItemFromCustomShop( itemName, shopName ) end

---[[ RemoveRealTimeCombatAnalyzerQuery  Stop tracking a combat analyzer query. ]]
-- @return nil
-- @param queryId CombatAnalyzerQueryID
function CDOTABaseGameMode:RemoveRealTimeCombatAnalyzerQuery( queryId ) end

---[[ SetAbilityTuningValueFilter  Set a filter function to control the tuning values that abilities use. (Modify the table and Return true to use new values, return false to use the old values). ]]
-- @return nil
-- @param filterFunc [object Object]
-- @param context table
function CDOTABaseGameMode:SetAbilityTuningValueFilter( filterFunc, context ) end

---[[ SetAllowNeutralItemDrops  If set to true, neutral items will be dropped on killing neutral monsters.  Otherwise nothing will be dropped. ]]
-- @return nil
-- @param enabled bool
function CDOTABaseGameMode:SetAllowNeutralItemDrops( enabled ) end

---[[ SetAlwaysShowPlayerInventory  Show the player hero's inventory in the HUD, regardless of what unit is selected. ]]
-- @return nil
-- @param alwaysShow bool
function CDOTABaseGameMode:SetAlwaysShowPlayerInventory( alwaysShow ) end

---[[ SetAlwaysShowPlayerNames  Set whether player names are always shown, regardless of client setting. ]]
-- @return nil
-- @param enabled bool
function CDOTABaseGameMode:SetAlwaysShowPlayerNames( enabled ) end

---[[ SetAnnouncerDisabled  Mutes the in-game announcer. ]]
-- @return nil
-- @param disabled bool
function CDOTABaseGameMode:SetAnnouncerDisabled( disabled ) end

---[[ SetAnnouncerGameModeAnnounceDisabled  Disables the announcer announcing the mode / saying Choose Your Hero on start of custom games. ]]
-- @return nil
-- @param disabled bool
function CDOTABaseGameMode:SetAnnouncerGameModeAnnounceDisabled( disabled ) end

---[[ SetBotsAlwaysPushWithHuman  Set if the bots should try their best to push with a human player. ]]
-- @return nil
-- @param alwaysPush bool
function CDOTABaseGameMode:SetBotsAlwaysPushWithHuman( alwaysPush ) end

---[[ SetBotsInLateGame  Set if bots should enable their late game behavior. ]]
-- @return nil
-- @param lateGame bool
function CDOTABaseGameMode:SetBotsInLateGame( lateGame ) end

---[[ SetBotsMaxPushTier  Set the max tier of tower that bots want to push. (-1 to disable). ]]
-- @return nil
-- @param maxTier int
function CDOTABaseGameMode:SetBotsMaxPushTier( maxTier ) end

---[[ SetBotThinkingEnabled  Enables/Disables bots in custom games. Note: this will only work with default heroes in the dota map. ]]
-- @return nil
-- @param enabled bool
function CDOTABaseGameMode:SetBotThinkingEnabled( enabled ) end

---[[ SetBountyRunePickupFilter  Set a filter function to control the behavior when a bounty rune is picked up. (Modify the table and Return true to use new values, return false to cancel the event). ]]
-- @return nil
-- @param filterFunc [object Object]
-- @param context table
function CDOTABaseGameMode:SetBountyRunePickupFilter( filterFunc, context ) end

---[[ SetBountyRuneSpawnInterval  Set bounty rune spawn rate. ]]
-- @return nil
-- @param interval float
function CDOTABaseGameMode:SetBountyRuneSpawnInterval( interval ) end

---[[ SetBuybackEnabled  Enables or disables buyback completely. ]]
-- @return nil
-- @param enabled bool
function CDOTABaseGameMode:SetBuybackEnabled( enabled ) end

---[[ SetCameraDistanceOverride  Set a different camera distance; dota default is 1134. ]]
-- @return nil
-- @param cameraDistanceOverride float
function CDOTABaseGameMode:SetCameraDistanceOverride( cameraDistanceOverride ) end

---[[ SetCameraSmoothCountOverride  Set a different camera smooth count; dota default is 8. ]]
-- @return nil
-- @param smoothCount int
function CDOTABaseGameMode:SetCameraSmoothCountOverride( smoothCount ) end

---[[ SetCameraZRange  Sets the camera Z range. ]]
-- @return nil
-- @param minZ float
-- @param maxZ float
function CDOTABaseGameMode:SetCameraZRange( minZ, maxZ ) end

---[[ SetCanSellAnywhere  Bool bAllow. ]]
-- @return nil
-- @param allow bool
function CDOTABaseGameMode:SetCanSellAnywhere( allow ) end

---[[ SetCustomAttributeDerivedStatValue  Modify derived stat value constants. ]]
-- @return nil
-- @param statType AttributeDerivedStats
-- @param newValue float
function CDOTABaseGameMode:SetCustomAttributeDerivedStatValue( statType, newValue ) end

---[[ SetCustomBackpackCooldownPercent  Set the rate cooldown ticks down for items in the backpack. ]]
-- @return nil
-- @param percent float
function CDOTABaseGameMode:SetCustomBackpackCooldownPercent( percent ) end

---[[ SetCustomBackpackSwapCooldown  Set a custom cooldown for swapping items into the backpack. ]]
-- @return nil
-- @param cooldown float
function CDOTABaseGameMode:SetCustomBackpackSwapCooldown( cooldown ) end

---[[ SetCustomBuybackCooldownEnabled  Turns on capability to define custom buyback cooldowns. ]]
-- @return nil
-- @param enabled bool
function CDOTABaseGameMode:SetCustomBuybackCooldownEnabled( enabled ) end

---[[ SetCustomBuybackCostEnabled  Turns on capability to define custom buyback costs. ]]
-- @return nil
-- @param enabled bool
function CDOTABaseGameMode:SetCustomBuybackCostEnabled( enabled ) end

---[[ SetCustomDireScore  Sets the topbar score display value for dire. ]]
-- @return nil
-- @param score int
function CDOTABaseGameMode:SetCustomDireScore( score ) end

---[[ SetCustomGameForceHero  Force all players to use the specified hero and disable the normal hero selection process. Must be used before hero selection. ]]
-- @return nil
-- @param heroName string
function CDOTABaseGameMode:SetCustomGameForceHero( heroName ) end

---[[ SetCustomGlyphCooldown  Set a custom cooldown for team Glyph ability. ]]
-- @return nil
-- @param cooldown float
function CDOTABaseGameMode:SetCustomGlyphCooldown( cooldown ) end

---[[ SetCustomHeroMaxLevel  Allows definition of the max level heroes can achieve (default is 25). ]]
-- @return nil
-- @param maxLevel int
function CDOTABaseGameMode:SetCustomHeroMaxLevel( maxLevel ) end

---[[ SetCustomRadiantScore  Sets the topbar score display value for radiant. ]]
-- @return nil
-- @param score int
function CDOTABaseGameMode:SetCustomRadiantScore( score ) end

---[[ SetCustomScanCooldown  Set a custom cooldown for team Scan ability. ]]
-- @return nil
-- @param cooldown float
function CDOTABaseGameMode:SetCustomScanCooldown( cooldown ) end

---[[ SetCustomScanMaxCharges  Set a custom max charges for team Scan ability. ]]
-- @return nil
-- @param maxCharges int
function CDOTABaseGameMode:SetCustomScanMaxCharges( maxCharges ) end

---[[ SetCustomTerrainWeatherEffect  Set the effect used as a custom weather effect, when units are on non-default terrain, in this mode. ]]
-- @return nil
-- @param effectName string
function CDOTABaseGameMode:SetCustomTerrainWeatherEffect( effectName ) end

---[[ SetCustomXPRequiredToReachNextLevel  Allows definition of a table of hero XP values.
Requires `SetUseCustomHeroLevels` to be enabled. ]]
-- @return nil
-- @param table [object Object]
function CDOTABaseGameMode:SetCustomXPRequiredToReachNextLevel( table ) end

---[[ SetDamageFilter  Set a filter function to control the behavior when a unit takes damage. (Modify the table and Return true to use new values, return false to cancel the event). ]]
-- @return nil
-- @param filterFunc [object Object]
-- @param context table
function CDOTABaseGameMode:SetDamageFilter( filterFunc, context ) end

---[[ SetDaynightCycleAdvanceRate  Sets the rate at which the day/night cycle advances (1.0 = default). ]]
-- @return nil
-- @param rate float
function CDOTABaseGameMode:SetDaynightCycleAdvanceRate( rate ) end

---[[ SetDaynightCycleDisabled  Enable or disable the day/night cycle. ]]
-- @return nil
-- @param disable bool
function CDOTABaseGameMode:SetDaynightCycleDisabled( disable ) end

---[[ SetDeathOverlayDisabled  Specify whether the full screen death overlay effect plays when the selected hero dies. ]]
-- @return nil
-- @param disabled bool
function CDOTABaseGameMode:SetDeathOverlayDisabled( disabled ) end

---[[ SetDeathTipsDisabled  Disables chat tips on death. ]]
-- @return nil
-- @param disabled bool
function CDOTABaseGameMode:SetDeathTipsDisabled( disabled ) end

---[[ SetDefaultStickyItem  Sets the default sticky item in the quickbuy. ]]
-- @return nil
-- @param item string
function CDOTABaseGameMode:SetDefaultStickyItem( item ) end

---[[ SetDraftingBanningTimeOverride  Set drafting hero banning time. ]]
-- @return nil
-- @param value float
function CDOTABaseGameMode:SetDraftingBanningTimeOverride( value ) end

---[[ SetDraftingHeroPickSelectTimeOverride  Set drafting hero pick time. ]]
-- @return nil
-- @param value float
function CDOTABaseGameMode:SetDraftingHeroPickSelectTimeOverride( value ) end

---[[ SetExecuteOrderFilter  Set a filter function to control the behavior when a unit picks up an item. (Modify the table and Return true to use new values, return false to cancel the event). ]]
-- @return nil
-- @param filterFunc [object Object]
-- @param context table
function CDOTABaseGameMode:SetExecuteOrderFilter( filterFunc, context ) end

---[[ SetFixedRespawnTime  Set a fixed delay for all players to respawn after. ]]
-- @return nil
-- @param fixedRespawnTime float
function CDOTABaseGameMode:SetFixedRespawnTime( fixedRespawnTime ) end

---[[ SetFogOfWarDisabled  Turn the fog of war on or off. ]]
-- @return nil
-- @param disabled bool
function CDOTABaseGameMode:SetFogOfWarDisabled( disabled ) end

---[[ SetForcedHeroCapOnReset  Caps the number of players spawned when the game is reset. Used in tutorials where players are spawned in the script. ]]
-- @return nil
-- @param cap int
function CDOTABaseGameMode:SetForcedHeroCapOnReset( cap ) end

---[[ SetForcedHUDSkin  Specify a HUD skin that is forced on for this game mode. ]]
-- @return nil
-- @param value string
function CDOTABaseGameMode:SetForcedHUDSkin( value ) end

---[[ SetForceRightClickAttackDisabled  Prevent users from using the right click deny setting. ]]
-- @return nil
-- @param disabled bool
function CDOTABaseGameMode:SetForceRightClickAttackDisabled( disabled ) end

---[[ SetFountainConstantManaRegen  Set the constant rate that the fountain will regen mana. (-1 for default). ]]
-- @return nil
-- @param constantManaRegen float
function CDOTABaseGameMode:SetFountainConstantManaRegen( constantManaRegen ) end

---[[ SetFountainPercentageHealthRegen  Set the percentage rate that the fountain will regen health. (-1 for default). ]]
-- @return nil
-- @param percentageHealthRegen float
function CDOTABaseGameMode:SetFountainPercentageHealthRegen( percentageHealthRegen ) end

---[[ SetFountainPercentageManaRegen  Set the percentage rate that the fountain will regen mana. (-1 for default). ]]
-- @return nil
-- @param percentageManaRegen float
function CDOTABaseGameMode:SetFountainPercentageManaRegen( percentageManaRegen ) end

---[[ SetFreeCourierModeEnabled  If set to true, enable 7.23 free courier mode. ]]
-- @return nil
-- @param enabled bool
function CDOTABaseGameMode:SetFreeCourierModeEnabled( enabled ) end

---[[ SetFriendlyBuildingMoveToEnabled  Allows clicks on friendly buildings to be handled normally. ]]
-- @return nil
-- @param enabled bool
function CDOTABaseGameMode:SetFriendlyBuildingMoveToEnabled( enabled ) end

---[[ SetGiveFreeTPOnDeath  Bool bGive. ]]
-- @return nil
-- @param give bool
function CDOTABaseGameMode:SetGiveFreeTPOnDeath( give ) end

---[[ SetGoldSoundDisabled  Turn the sound when gold is acquired off/on. ]]
-- @return nil
-- @param disabled bool
function CDOTABaseGameMode:SetGoldSoundDisabled( disabled ) end

---[[ SetHealingFilter  Set a filter function to control the behavior when a unit heals. (Modify the table and Return true to use new values, return false to cancel the event). ]]
-- @return nil
-- @param filterFunc [object Object]
-- @param context table
function CDOTABaseGameMode:SetHealingFilter( filterFunc, context ) end

---[[ SetHudCombatEventsDisabled  Specify whether the default combat events will show in the HUD. ]]
-- @return nil
-- @param disabled bool
function CDOTABaseGameMode:SetHudCombatEventsDisabled( disabled ) end

---[[ SetHUDVisible  Set the HUD element visibility. ]]
-- @return nil
-- @param hudElement DOTAHUDVisibility_t
-- @param visible bool
function CDOTABaseGameMode:SetHUDVisible( hudElement, visible ) end

---[[ SetInnateMeleeDamageBlockAmount  Set the amount blocked innately by melee heroes. ]]
-- @return nil
-- @param amount int
function CDOTABaseGameMode:SetInnateMeleeDamageBlockAmount( amount ) end

---[[ SetInnateMeleeDamageBlockPercent  Set the percent chance a melee hero will innately block damage. ]]
-- @return nil
-- @param percent int
function CDOTABaseGameMode:SetInnateMeleeDamageBlockPercent( percent ) end

---[[ SetInnateMeleeDamageBlockPerLevelAmount  Set the amount innately blocked by melee heroes gained per level. ]]
-- @return nil
-- @param perLevelAmount int
function CDOTABaseGameMode:SetInnateMeleeDamageBlockPerLevelAmount( perLevelAmount ) end

---[[ SetItemAddedToInventoryFilter  Set a filter function to control what happens to items that are added to an inventory, return false to cancel the event. ]]
-- @return nil
-- @param filterFunc [object Object]
-- @param context table
function CDOTABaseGameMode:SetItemAddedToInventoryFilter( filterFunc, context ) end

---[[ SetKillableTombstones  Set whether tombstones can be channeled to be removed by enemy heroes. ]]
-- @return nil
-- @param enabled bool
function CDOTABaseGameMode:SetKillableTombstones( enabled ) end

---[[ SetKillingSpreeAnnouncerDisabled  Mutes the in-game killing spree announcer. ]]
-- @return nil
-- @param disabled bool
function CDOTABaseGameMode:SetKillingSpreeAnnouncerDisabled( disabled ) end

---[[ SetLoseGoldOnDeath  Use to disable gold loss on death. ]]
-- @return nil
-- @param enabled bool
function CDOTABaseGameMode:SetLoseGoldOnDeath( enabled ) end

---[[ SetLuaGameMode   ]]
-- @return nil
-- @param script handle
function CDOTABaseGameMode:SetLuaGameMode( script ) end

---[[ SetMaximumAttackSpeed  Set the maximum attack speed for units. ]]
-- @return nil
-- @param maxSpeed int
function CDOTABaseGameMode:SetMaximumAttackSpeed( maxSpeed ) end

---[[ SetMinimumAttackSpeed  Set the minimum attack speed for units. ]]
-- @return nil
-- @param minSpeed int
function CDOTABaseGameMode:SetMinimumAttackSpeed( minSpeed ) end

---[[ SetModifierGainedFilter  Set a filter function to control modifiers that are gained, return false to destroy modifier. ]]
-- @return nil
-- @param filterFunc [object Object]
-- @param context table
function CDOTABaseGameMode:SetModifierGainedFilter( filterFunc, context ) end

---[[ SetModifyExperienceFilter  Set a filter function to control the behavior when a hero's experience is modified. (Modify the table and Return true to use new values, return false to cancel the event). ]]
-- @return nil
-- @param filterFunc [object Object]
-- @param context table
function CDOTABaseGameMode:SetModifyExperienceFilter( filterFunc, context ) end

---[[ SetModifyGoldFilter  Set a filter function to control the behavior when a hero's gold is modified. (Modify the table and Return true to use new values, return false to cancel the event). ]]
-- @return nil
-- @param filterFunc [object Object]
-- @param context table
function CDOTABaseGameMode:SetModifyGoldFilter( filterFunc, context ) end

---[[ SetNeutralItemHideUndiscoveredEnabled  When enabled, undiscovered items in the neutral item stash are hidden. ]]
-- @return nil
-- @param enable bool
function CDOTABaseGameMode:SetNeutralItemHideUndiscoveredEnabled( enable ) end

---[[ SetNeutralStashEnabled  Allow items to be sent to the neutral stash. ]]
-- @return nil
-- @param enable bool
function CDOTABaseGameMode:SetNeutralStashEnabled( enable ) end

---[[ SetNeutralStashTeamViewOnlyEnabled  When enabled, the all neutral items tab cannot be viewed. ]]
-- @return nil
-- @param enable bool
function CDOTABaseGameMode:SetNeutralStashTeamViewOnlyEnabled( enable ) end

---[[ SetOverrideSelectionEntity  Set an override for the default selection entity, instead of each player's hero. ]]
-- @return nil
-- @param overrideEntity CDOTA_BaseNPC
function CDOTABaseGameMode:SetOverrideSelectionEntity( overrideEntity ) end

---[[ SetPauseEnabled  Set pausing enabled/disabled. ]]
-- @return nil
-- @param enabled bool
function CDOTABaseGameMode:SetPauseEnabled( enabled ) end

---[[ SetPlayerHeroAvailabilityFiltered  Bool bFilter. ]]
-- @return nil
-- @param filter bool
function CDOTABaseGameMode:SetPlayerHeroAvailabilityFiltered( filter ) end

---[[ SetPowerRuneSpawnInterval  Set power rune spawn rate. ]]
-- @return nil
-- @param interval float
function CDOTABaseGameMode:SetPowerRuneSpawnInterval( interval ) end

---[[ SetRandomHeroBonusItemGrantDisabled  Disables bonus items for randoming a hero. ]]
-- @return nil
-- @param disabled bool
function CDOTABaseGameMode:SetRandomHeroBonusItemGrantDisabled( disabled ) end

---[[ SetRecommendedItemsDisabled  Turn the panel for showing recommended items at the shop off/on. ]]
-- @return nil
-- @param disabled bool
function CDOTABaseGameMode:SetRecommendedItemsDisabled( disabled ) end

---[[ SetRemoveIllusionsOnDeath  Make it so illusions are immediately removed upon death, rather than sticking around for a few seconds. ]]
-- @return nil
-- @param remove bool
function CDOTABaseGameMode:SetRemoveIllusionsOnDeath( remove ) end

---[[ SetRespawnTimeScale  Sets the scale applied to non-fixed respawn times. 1 = default DOTA respawn calculations. ]]
-- @return nil
-- @param value float
function CDOTABaseGameMode:SetRespawnTimeScale( value ) end

---[[ SetRuneEnabled  Set if a given type of rune is enabled. ]]
-- @return nil
-- @param rune DOTA_RUNES
-- @param enabled bool
function CDOTABaseGameMode:SetRuneEnabled( rune, enabled ) end

---[[ SetRuneSpawnFilter  Set a filter function to control what rune spawns. (Modify the table and Return true to use new values, return false to cancel the event). ]]
-- @return nil
-- @param filterFunc [object Object]
-- @param context table
function CDOTABaseGameMode:SetRuneSpawnFilter( filterFunc, context ) end

---[[ SetSelectionGoldPenaltyEnabled  Enable/disable gold penalty for late picking. ]]
-- @return nil
-- @param enabled bool
function CDOTABaseGameMode:SetSelectionGoldPenaltyEnabled( enabled ) end

---[[ SetSendToStashEnabled  Allow items to be sent to the stash. ]]
-- @return nil
-- @param enable bool
function CDOTABaseGameMode:SetSendToStashEnabled( enable ) end

---[[ SetStashPurchasingDisabled  Turn purchasing items to the stash off/on. If purchasing to the stash is off the player must be at a shop to purchase items. ]]
-- @return nil
-- @param disabled bool
function CDOTABaseGameMode:SetStashPurchasingDisabled( disabled ) end

---[[ SetStickyItemDisabled  Hide the sticky item in the quickbuy. ]]
-- @return nil
-- @param disabled bool
function CDOTABaseGameMode:SetStickyItemDisabled( disabled ) end

---[[ SetTopBarTeamValue  Set the team values on the top game bar. ]]
-- @return nil
-- @param team DOTATeam_t
-- @param value int
function CDOTABaseGameMode:SetTopBarTeamValue( team, value ) end

---[[ SetTopBarTeamValuesOverride  Override the values of the team values on the top game bar. ]]
-- @return nil
-- @param override bool
function CDOTABaseGameMode:SetTopBarTeamValuesOverride( override ) end

---[[ SetTopBarTeamValuesVisible  Turning on/off the team values on the top game bar. ]]
-- @return nil
-- @param visible bool
function CDOTABaseGameMode:SetTopBarTeamValuesVisible( visible ) end

---[[ SetTowerBackdoorProtectionEnabled  Enables/Disables tower backdoor protection. ]]
-- @return nil
-- @param enabled bool
function CDOTABaseGameMode:SetTowerBackdoorProtectionEnabled( enabled ) end

---[[ SetTPScrollSlotItemOverride  Sets the item which goes in the TP scroll slot. ]]
-- @return nil
-- @param itemName string
function CDOTABaseGameMode:SetTPScrollSlotItemOverride( itemName ) end

---[[ SetTrackingProjectileFilter  Set a filter function to control when tracking projectiles are launched. (Modify the table and Return true to use new values, return false to cancel the event). ]]
-- @return nil
-- @param filterFunc [object Object]
-- @param context table
function CDOTABaseGameMode:SetTrackingProjectileFilter( filterFunc, context ) end

---[[ SetUnseenFogOfWarEnabled  Enable or disable unseen fog of war. When enabled parts of the map the player has never seen will be completely hidden by fog of war. ]]
-- @return nil
-- @param enabled bool
function CDOTABaseGameMode:SetUnseenFogOfWarEnabled( enabled ) end

---[[ SetUseCustomHeroLevels  Turn on custom-defined XP values for hero level ups.  The table should be defined before switching this on. ]]
-- @return nil
-- @param enabled bool
function CDOTABaseGameMode:SetUseCustomHeroLevels( enabled ) end

---[[ SetUseDefaultDOTARuneSpawnLogic  If set to true, use current rune spawn rules.  Either setting respects custom spawn intervals. ]]
-- @return nil
-- @param enabled bool
function CDOTABaseGameMode:SetUseDefaultDOTARuneSpawnLogic( enabled ) end

---[[ SetUseTurboCouriers  Enables or disables turbo couriers. ]]
-- @return nil
-- @param enabled bool
function CDOTABaseGameMode:SetUseTurboCouriers( enabled ) end

---[[ SetWaterRuneLastSpawnTime  Sets the time from game start during which water runes spawn. ]]
-- @return nil
-- @param value float
function CDOTABaseGameMode:SetWaterRuneLastSpawnTime( value ) end

---[[ SetWeatherEffectsDisabled  Set if weather effects are disabled. ]]
-- @return nil
-- @param disable bool
function CDOTABaseGameMode:SetWeatherEffectsDisabled( disable ) end

---[[ SetXPRuneSpawnInterval  Set xp rune spawn rate. ]]
-- @return nil
-- @param interval float
function CDOTABaseGameMode:SetXPRuneSpawnInterval( interval ) end

---[[ ShouldGiveFreeTPOnDeath   ]]
-- @return bool
function CDOTABaseGameMode:ShouldGiveFreeTPOnDeath(  ) end

---[[ GetHeroDataByName_Script  Get the hero unit. ]]
-- @return table
-- @param heroName string
function CDOTAGameManager:GetHeroDataByName_Script( heroName ) end

---[[ GetHeroIDByName  Get the hero ID given the hero name. ]]
-- @return int
-- @param heroName string
function CDOTAGameManager:GetHeroIDByName( heroName ) end

---[[ GetHeroLocTokenByID  Get the localization token for the given hero ID. ]]
-- @return string
-- @param arg1 int
function CDOTAGameManager:GetHeroLocTokenByID( arg1 ) end

---[[ GetHeroNameByID  Get the hero name given a hero ID. ]]
-- @return string
-- @param heroId int
function CDOTAGameManager:GetHeroNameByID( heroId ) end

---[[ GetHeroNameForUnitName  Get the hero name given a unit name. ]]
-- @return string
-- @param unitName string
function CDOTAGameManager:GetHeroNameForUnitName( unitName ) end

---[[ GetHeroUnitNameByID  Get the hero unit name given the hero ID. ]]
-- @return string
-- @param heroId int
function CDOTAGameManager:GetHeroUnitNameByID( heroId ) end

---[[ AddBotPlayerWithEntityScript  Spawn a bot player of the passed hero name, player name, and team. ]]
-- @return CDOTA_BaseNPC_Hero
-- @param heroName string
-- @param playerName string
-- @param team DOTATeam_t
-- @param entityScript string
-- @param arg5 bool
function CDOTAGameRules:AddBotPlayerWithEntityScript( heroName, playerName, team, entityScript, arg5 ) end

---[[ AddEventMetadataLeaderboardEntry  Event-only. ]]
-- @return bool
-- @param nameSuffix string
-- @param stars uint
-- @param maxStars uint
-- @param extraData1 uint
-- @param extraData2 uint
-- @param extraData3 uint
-- @param extraData4 uint
-- @param extraData5 uint
-- @param extraData6 uint
function CDOTAGameRules:AddEventMetadataLeaderboardEntry( nameSuffix, stars, maxStars, extraData1, extraData2, extraData3, extraData4, extraData5, extraData6 ) end

---[[ AddEventMetadataLeaderboardEntryRawScore  Event-only. ]]
-- @return bool
-- @param nameSuffix string
-- @param score uint
-- @param extraData1 uint
-- @param extraData2 uint
-- @param extraData3 uint
-- @param extraData4 uint
-- @param extraData5 uint
-- @param extraData6 uint
function CDOTAGameRules:AddEventMetadataLeaderboardEntryRawScore( nameSuffix, score, extraData1, extraData2, extraData3, extraData4, extraData5, extraData6 ) end

---[[ AddHeroIDToBlacklist  Add the hero ID to the hero blacklist if it is not already present. ]]
-- @return nil
-- @param arg1 int
function CDOTAGameRules:AddHeroIDToBlacklist( arg1 ) end

---[[ AddHeroIDToWhitelist  Add the hero ID to the hero whitelist if it is not already present. ]]
-- @return nil
-- @param arg1 int
function CDOTAGameRules:AddHeroIDToWhitelist( arg1 ) end

---[[ AddHeroToBlacklist  Add the hero to the hero blacklist if it is not already present. ]]
-- @return nil
-- @param arg1 string
function CDOTAGameRules:AddHeroToBlacklist( arg1 ) end

---[[ AddHeroToPlayerAvailability  Adds hero of given ID to available heroes of player of given ID. ]]
-- @return nil
-- @param arg1 int
-- @param arg2 int
function CDOTAGameRules:AddHeroToPlayerAvailability( arg1, arg2 ) end

---[[ AddHeroToWhitelist  Add the hero to the hero whitelist if it is not already present. ]]
-- @return nil
-- @param arg1 string
function CDOTAGameRules:AddHeroToWhitelist( arg1 ) end

---[[ AddItemToWhiteList  Add an item to the whitelist. ]]
-- @return nil
-- @param itemName string
function CDOTAGameRules:AddItemToWhiteList( itemName ) end

---[[ AddMinimapDebugPoint  Add a point on the minimap. ]]
-- @return nil
-- @param arg1 int
-- @param arg2 Vector
-- @param arg3 int
-- @param arg4 int
-- @param arg5 int
-- @param arg6 int
-- @param arg7 float
function CDOTAGameRules:AddMinimapDebugPoint( arg1, arg2, arg3, arg4, arg5, arg6, arg7 ) end

---[[ AddMinimapDebugPointForTeam  Add a point on the minimap for a specific team. ]]
-- @return nil
-- @param arg1 int
-- @param arg2 Vector
-- @param arg3 int
-- @param arg4 int
-- @param arg5 int
-- @param arg6 int
-- @param arg7 float
-- @param arg8 int
function CDOTAGameRules:AddMinimapDebugPointForTeam( arg1, arg2, arg3, arg4, arg5, arg6, arg7, arg8 ) end

---[[ BeginNightstalkerNight  Begin night stalker night. ]]
-- @return nil
-- @param duration float
function CDOTAGameRules:BeginNightstalkerNight( duration ) end

---[[ BeginTemporaryNight  Begin temporary night. ]]
-- @return nil
-- @param duration float
-- @param arg2 int
function CDOTAGameRules:BeginTemporaryNight( duration, arg2 ) end

---[[ BotPopulate  Fills all the teams with bots if cheat mode is enabled. ]]
-- @return nil
function CDOTAGameRules:BotPopulate(  ) end

---[[ ClearHeroBlacklist  Clears the hero blacklist. ]]
-- @return nil
function CDOTAGameRules:ClearHeroBlacklist(  ) end

---[[ ClearHeroWhitelist  Clears the hero whitelist. ]]
-- @return nil
function CDOTAGameRules:ClearHeroWhitelist(  ) end

---[[ ClearPlayerHeroAvailability  Clears available heroes of player of given ID. ]]
-- @return nil
-- @param arg1 int
function CDOTAGameRules:ClearPlayerHeroAvailability( arg1 ) end

---[[ ClearRiverPaint  Clears the current river paint. ]]
-- @return nil
function CDOTAGameRules:ClearRiverPaint(  ) end

---[[ Defeated  Kills the ancient, etc. ]]
-- @return nil
function CDOTAGameRules:Defeated(  ) end

---[[ DidMatchSignoutTimeOut  True when we have waited some time after end of the game and not received signout. ]]
-- @return bool
function CDOTAGameRules:DidMatchSignoutTimeOut(  ) end

---[[ EnableCustomGameSetupAutoLaunch  Enabled (true) or disable (false) auto launch for custom game setup. ]]
-- @return nil
-- @param enabled bool
function CDOTAGameRules:EnableCustomGameSetupAutoLaunch( enabled ) end

---[[ ExecuteTeamPing  Sends a minimap ping to all players on the team. ]]
-- @return nil
-- @param team DOTATeam_t
-- @param xCoord float
-- @param yCoord float
-- @param entity CBaseEntity
-- @param type [object Object]
function CDOTAGameRules:ExecuteTeamPing( team, xCoord, yCoord, entity, type ) end

---[[ FinishCustomGameSetup  Indicate that the custom game setup phase is complete, and advance to the game. ]]
-- @return nil
function CDOTAGameRules:FinishCustomGameSetup(  ) end

---[[ ForceCreepSpawn  Spawn the next wave of creeps. ]]
-- @return nil
function CDOTAGameRules:ForceCreepSpawn(  ) end

---[[ ForceGameStart  Transition game state to DOTA_GAMERULES_STATE_GAME_IN_PROGRESS. ]]
-- @return nil
function CDOTAGameRules:ForceGameStart(  ) end

---[[ GetAnnouncer  Get the announcer for a team. ]]
-- @return CDOTA_BaseNPC
-- @param team DOTATeam_t
function CDOTAGameRules:GetAnnouncer( team ) end

---[[ GetBannedHeroes  Returns the hero unit names banned in this game, if any. ]]
-- @return [object Object]
function CDOTAGameRules:GetBannedHeroes(  ) end

---[[ GetBannedHeroIDs  Returns the hero unit IDs banned in this game, if any. ]]
-- @return table
function CDOTAGameRules:GetBannedHeroIDs(  ) end

---[[ GetCustomGameDifficulty  Returns the difficulty level of the custom game mode. ]]
-- @return int
function CDOTAGameRules:GetCustomGameDifficulty(  ) end

---[[ GetCustomGameTeamMaxPlayers  Get whether a team is selectable during game setup. ]]
-- @return int
-- @param team DOTATeam_t
function CDOTAGameRules:GetCustomGameTeamMaxPlayers( team ) end

---[[ GetDifficulty  Returns difficulty level of the custom game mode. ]]
-- @return int
function CDOTAGameRules:GetDifficulty(  ) end

---[[ GetDOTATime  Returns the actual DOTA in-game clock time. ]]
-- @return float
-- @param includePreGame bool
-- @param includeNegativeTime bool
function CDOTAGameRules:GetDOTATime( includePreGame, includeNegativeTime ) end

---[[ GetDroppedItem  Gets the Xth dropped item. ]]
-- @return CDOTA_Item_Physical
-- @param index int
function CDOTAGameRules:GetDroppedItem( index ) end

---[[ GetGameFrameTime  Returns the number of seconds elapsed since the last frame was renderered. This time doesn't count up when the game is paused. ]]
-- @return float
function CDOTAGameRules:GetGameFrameTime(  ) end

---[[ GetGameModeEntity  Get the game mode entity. ]]
-- @return CDOTABaseGameMode
function CDOTAGameRules:GetGameModeEntity(  ) end

---[[ GetGameSessionConfigValue  Get a string value from the game session config (map options). ]]
-- @return string
-- @param arg1 string
-- @param arg2 string
function CDOTAGameRules:GetGameSessionConfigValue( arg1, arg2 ) end

---[[ GetGameTime  Returns the number of seconds elapsed since map start. This time doesn't count up when the game is paused. ]]
-- @return float
function CDOTAGameRules:GetGameTime(  ) end

---[[ GetIetmStockDuration  Get the time it takes to add a new item to stock. ]]
-- @return float
-- @param arg1 int
-- @param arg2 string
-- @param arg3 int
function CDOTAGameRules:GetIetmStockDuration( arg1, arg2, arg3 ) end

---[[ GetItemStockCount  Get the stock count of the item. ]]
-- @return int
-- @param team DOTATeam_t
-- @param itemName string
-- @param playerId PlayerID
function CDOTAGameRules:GetItemStockCount( team, itemName, playerId ) end

---[[ GetItemStockTime  Get the time an item will be added to stock. ]]
-- @return float
-- @param team DOTATeam_t
-- @param itemName string
-- @param playerId PlayerID
function CDOTAGameRules:GetItemStockTime( team, itemName, playerId ) end

---[[ GetMatchSignoutComplete  Have we received the post match signout message that includes reward information. ]]
-- @return bool
function CDOTAGameRules:GetMatchSignoutComplete(  ) end

---[[ GetNeutralInitialSpawnOffset  Gets the extra offset to initial neutral creep spawn delay. ]]
-- @return float
function CDOTAGameRules:GetNeutralInitialSpawnOffset(  ) end

---[[ GetNextBountyRuneSpawnTime  Gets next bounty rune spawn time. ]]
-- @return float
function CDOTAGameRules:GetNextBountyRuneSpawnTime(  ) end

---[[ GetNextRuneSpawnTime  Gets next rune spawn time. ]]
-- @return float
function CDOTAGameRules:GetNextRuneSpawnTime(  ) end

---[[ GetNianTotalDamageTaken  For New Bloom, get total damage taken by the Nian / Year Beast. ]]
-- @return int
function CDOTAGameRules:GetNianTotalDamageTaken(  ) end

---[[ GetPlayerCustomGameAccountRecord  Gets the player's custom game account record, as it looked at the start of this session. ]]
-- @return table
-- @param playerId PlayerID
function CDOTAGameRules:GetPlayerCustomGameAccountRecord( playerId ) end

---[[ GetStateTransitionTime  Get time remaining between state changes. ]]
-- @return float
function CDOTAGameRules:GetStateTransitionTime(  ) end

---[[ GetTimeOfDay  Get the time of day. ]]
-- @return float
function CDOTAGameRules:GetTimeOfDay(  ) end

---[[ GetWeatherWindDirection  Get Weather Wind Direction Vector. ]]
-- @return Vector
function CDOTAGameRules:GetWeatherWindDirection(  ) end

---[[ IncreaseItemStock  Increase an item's stock count, clamped to item max. ]]
-- @return nil
-- @param team DOTATeam_t
-- @param itemName string
-- @param count int
-- @param playerId PlayerID
function CDOTAGameRules:IncreaseItemStock( team, itemName, count, playerId ) end

---[[ IsCheatMode  Are cheats enabled on the server. ]]
-- @return bool
function CDOTAGameRules:IsCheatMode(  ) end

---[[ IsDaytime  Is it day time? ]]
-- @return bool
function CDOTAGameRules:IsDaytime(  ) end

---[[ IsDev   ]]
-- @return bool
function CDOTAGameRules:IsDev(  ) end

---[[ IsGamePaused  Returns whether the game is paused. ]]
-- @return bool
function CDOTAGameRules:IsGamePaused(  ) end

---[[ IsHeroEnabledViaLists  Is the hero not blacklisted, and is it either whitelisted or the whitelist is empty? ]]
-- @return bool
-- @param arg1 string
function CDOTAGameRules:IsHeroEnabledViaLists( arg1 ) end

---[[ IsHeroRespawnEnabled  Returns whether hero respawn is enabled. ]]
-- @return bool
function CDOTAGameRules:IsHeroRespawnEnabled(  ) end

---[[ IsInBanPhase  Are we in the ban phase of hero pick? ]]
-- @return bool
function CDOTAGameRules:IsInBanPhase(  ) end

---[[ IsItemInWhiteList  Query an item in the whitelist. ]]
-- @return bool
-- @param itemName string
function CDOTAGameRules:IsItemInWhiteList( itemName ) end

---[[ IsNightstalkerNight  Is it night stalker night-time? ]]
-- @return bool
function CDOTAGameRules:IsNightstalkerNight(  ) end

---[[ IsSuggestAbilitiesEnabled  Returns whether Dota Plus ability suggestions are enabled or disabled. ]]
-- @return bool
function CDOTAGameRules:IsSuggestAbilitiesEnabled(  ) end

---[[ IsSuggestItemsEnabled  Returns whether Dota Plus item suggestions are enabled or disabled. ]]
-- @return bool
function CDOTAGameRules:IsSuggestItemsEnabled(  ) end

---[[ IsTemporaryNight  Is it temporarily night-time? ]]
-- @return bool
function CDOTAGameRules:IsTemporaryNight(  ) end

---[[ LockCustomGameSetupTeamAssignment  Lock (true) or unlock (false) team assignemnt. If team assignment is locked players cannot change teams. ]]
-- @return nil
-- @param locked bool
function CDOTAGameRules:LockCustomGameSetupTeamAssignment( locked ) end

---[[ MakeTeamLose  Makes the specified team lose. ]]
-- @return nil
-- @param team DOTATeam_t
function CDOTAGameRules:MakeTeamLose( team ) end

---[[ ModifyGoldFiltered  Like ModifyGold, but will use the gold filter if SetFilterMoreGold has been set true. ]]
-- @return int
-- @param playerId PlayerID
-- @param goldChange int
-- @param reliable bool
-- @param reason EDOTA_ModifyGold_Reason
function CDOTAGameRules:ModifyGoldFiltered( playerId, goldChange, reliable, reason ) end

---[[ NumDroppedItems  Returns the number of items currently dropped on the ground. ]]
-- @return int
function CDOTAGameRules:NumDroppedItems(  ) end

---[[ PlayerHasCustomGameHostPrivileges  Whether a player has custom game host privileges (shuffle teams, etc.). ]]
-- @return bool
-- @param player CDOTAPlayerController
function CDOTAGameRules:PlayerHasCustomGameHostPrivileges( player ) end

---[[ Playtesting_UpdateAddOnKeyValues  Updates custom hero, unit and ability KeyValues in memory with the latest values from disk. ]]
-- @return nil
function CDOTAGameRules:Playtesting_UpdateAddOnKeyValues(  ) end

---[[ PrepareSpawners  Prepare Dota lane style spawners with a given interval. ]]
-- @return nil
-- @param arg1 float
function CDOTAGameRules:PrepareSpawners( arg1 ) end

---[[ RemoveFakeClient  Removes a fake client. ]]
-- @return nil
-- @param playerId PlayerID
function CDOTAGameRules:RemoveFakeClient( playerId ) end

---[[ RemoveHeroFromBlacklist  Remove the hero from the hero blacklist if present. ]]
-- @return nil
-- @param arg1 string
function CDOTAGameRules:RemoveHeroFromBlacklist( arg1 ) end

---[[ RemoveHeroFromWhitelist  Remove the hero from the hero whitelist if present. ]]
-- @return nil
-- @param arg1 string
function CDOTAGameRules:RemoveHeroFromWhitelist( arg1 ) end

---[[ RemoveHeroIDFromBlacklist  Remove the hero ID from the hero blacklist if present. ]]
-- @return nil
-- @param arg1 int
function CDOTAGameRules:RemoveHeroIDFromBlacklist( arg1 ) end

---[[ RemoveHeroIDFromWhitelist  Remove the hero ID from the hero whitelist if present. ]]
-- @return nil
-- @param arg1 int
function CDOTAGameRules:RemoveHeroIDFromWhitelist( arg1 ) end

---[[ RemoveItemFromWhiteList  Remove an item from the whitelist. ]]
-- @return nil
-- @param itemName string
function CDOTAGameRules:RemoveItemFromWhiteList( itemName ) end

---[[ ResetDefeated  Restart after killing the ancient, etc. ]]
-- @return nil
function CDOTAGameRules:ResetDefeated(  ) end

---[[ ResetGameTime  Restart gametime from 0. ]]
-- @return nil
function CDOTAGameRules:ResetGameTime(  ) end

---[[ ResetPlayer  Resets the player of a given ID. ]]
-- @return nil
-- @param arg1 int
function CDOTAGameRules:ResetPlayer( arg1 ) end

---[[ ResetToCustomGameSetup  Restart at custom game setup. ]]
-- @return nil
function CDOTAGameRules:ResetToCustomGameSetup(  ) end

---[[ ResetToHeroSelection  Restart the game at hero selection. ]]
-- @return nil
function CDOTAGameRules:ResetToHeroSelection(  ) end

---[[ Script_GetMatchID  Get the MatchID for this game. ]]
-- @return Uint64
function CDOTAGameRules:Script_GetMatchID(  ) end

---[[ SendCustomMessage  Sends a message on behalf of a player. ]]
-- @return nil
-- @param arg1 string
-- @param arg2 int
-- @param arg3 int
function CDOTAGameRules:SendCustomMessage( arg1, arg2, arg3 ) end

---[[ SendCustomMessageToTeam  Sends a message on behalf of a player to the specified team. ]]
-- @return nil
-- @param arg1 string
-- @param arg2 int
-- @param arg3 int
-- @param arg4 int
function CDOTAGameRules:SendCustomMessageToTeam( arg1, arg2, arg3, arg4 ) end

---[[ SetAllowOutpostBonuses  Allow Outposts granting XP. ]]
-- @return nil
-- @param arg1 bool
function CDOTAGameRules:SetAllowOutpostBonuses( arg1 ) end

---[[ SetCreepMinimapIconScale  Scale the creep icons on the minimap. ]]
-- @return nil
-- @param scale float
function CDOTAGameRules:SetCreepMinimapIconScale( scale ) end

---[[ SetCreepSpawningEnabled  Sets whether the regular Dota creeps spawn. ]]
-- @return nil
-- @param arg1 bool
function CDOTAGameRules:SetCreepSpawningEnabled( arg1 ) end

---[[ SetCustomGameAccountRecordSaveFunction  Sets a callback to handle saving custom game account records (callback is passed a Player ID and should return a flat simple table). ]]
-- @return nil
-- @param arg1 handle
-- @param arg2 handle
function CDOTAGameRules:SetCustomGameAccountRecordSaveFunction( arg1, arg2 ) end

---[[ SetCustomGameAllowBattleMusic  Sets a flag to enable/disable the default music handling code for custom games. ]]
-- @return nil
-- @param allow bool
function CDOTAGameRules:SetCustomGameAllowBattleMusic( allow ) end

---[[ SetCustomGameAllowHeroPickMusic  Sets a flag to enable/disable the default music handling code for custom games. ]]
-- @return nil
-- @param allow bool
function CDOTAGameRules:SetCustomGameAllowHeroPickMusic( allow ) end

---[[ SetCustomGameAllowMusicAtGameStart  Sets a flag to enable/disable the default music handling code for custom games. ]]
-- @return nil
-- @param allow bool
function CDOTAGameRules:SetCustomGameAllowMusicAtGameStart( allow ) end

---[[ SetCustomGameAllowSecondaryAbilitiesOnOtherUnits  Sets a flag to enable/disable the casting secondary abilities from units other than the player's own hero. ]]
-- @return nil
-- @param arg1 bool
function CDOTAGameRules:SetCustomGameAllowSecondaryAbilitiesOnOtherUnits( arg1 ) end

---[[ SetCustomGameBansPerTeam  Set number of hero bans each team gets. ]]
-- @return nil
-- @param arg1 int
function CDOTAGameRules:SetCustomGameBansPerTeam( arg1 ) end

---[[ SetCustomGameDifficulty  Set the difficulty level of the custom game mode. ]]
-- @return nil
-- @param difficulty int
function CDOTAGameRules:SetCustomGameDifficulty( difficulty ) end

---[[ SetCustomGameEndDelay  Sets the game end delay. ]]
-- @return nil
-- @param delay float
function CDOTAGameRules:SetCustomGameEndDelay( delay ) end

---[[ SetCustomGameSetupAutoLaunchDelay  Set the amount of time to wait for auto launch. ]]
-- @return nil
-- @param delay float
function CDOTAGameRules:SetCustomGameSetupAutoLaunchDelay( delay ) end

---[[ SetCustomGameSetupRemainingTime  Set the amount of remaining time, in seconds, for custom game setup. 0 = finish immediately, -1 = wait forever. ]]
-- @return nil
-- @param remainingTime float
function CDOTAGameRules:SetCustomGameSetupRemainingTime( remainingTime ) end

---[[ SetCustomGameSetupTimeout  Setup (pre-gameplay) phase timeout. 0 = instant, -1 = forever (until FinishCustomGameSetup is called). ]]
-- @return nil
-- @param timeout float
function CDOTAGameRules:SetCustomGameSetupTimeout( timeout ) end

---[[ SetCustomGameTeamMaxPlayers  Set whether a team is selectable during game setup. ]]
-- @return nil
-- @param team DOTATeam_t
-- @param maxPlayers int
function CDOTAGameRules:SetCustomGameTeamMaxPlayers( team, maxPlayers ) end

---[[ SetCustomVictoryMessage  Sets the victory message. ]]
-- @return nil
-- @param message string
function CDOTAGameRules:SetCustomVictoryMessage( message ) end

---[[ SetCustomVictoryMessageDuration  Sets the victory message duration. ]]
-- @return nil
-- @param duration float
function CDOTAGameRules:SetCustomVictoryMessageDuration( duration ) end

---[[ SetEnableAlternateHeroGrids  Allow alternate hero grids to be used (DOTA+, etc).  True by default. ]]
-- @return nil
-- @param arg1 bool
function CDOTAGameRules:SetEnableAlternateHeroGrids( arg1 ) end

---[[ SetEventMetadataCustomTable  Event-only. ]]
-- @return bool
-- @param metadataTable handle
function CDOTAGameRules:SetEventMetadataCustomTable( metadataTable ) end

---[[ SetEventSignoutCustomTable  Event-only. ]]
-- @return bool
-- @param metadataTable handle
function CDOTAGameRules:SetEventSignoutCustomTable( metadataTable ) end

---[[ SetFilterMoreGold  Sets whether to filter more gold events than normal. ]]
-- @return nil
-- @param arg1 bool
function CDOTAGameRules:SetFilterMoreGold( arg1 ) end

---[[ SetFirstBloodActive  Sets whether First Blood has been triggered. ]]
-- @return nil
-- @param active bool
function CDOTAGameRules:SetFirstBloodActive( active ) end

---[[ SetGameWinner  Makes the specified team win. ]]
-- @return nil
-- @param team DOTATeam_t
function CDOTAGameRules:SetGameWinner( team ) end

---[[ SetGlyphCooldown  Set Glyph cooldown for team. ]]
-- @return nil
-- @param team DOTATeam_t
-- @param cooldown float
function CDOTAGameRules:SetGlyphCooldown( team, cooldown ) end

---[[ SetGoldPerTick  Set the auto gold increase per timed interval. ]]
-- @return nil
-- @param amount int
function CDOTAGameRules:SetGoldPerTick( amount ) end

---[[ SetGoldTickTime  Set the time interval between auto gold increases. ]]
-- @return nil
-- @param time float
function CDOTAGameRules:SetGoldTickTime( time ) end

---[[ SetHeroMinimapIconScale  Scale the hero minimap icons on the minimap. ]]
-- @return nil
-- @param scale float
function CDOTAGameRules:SetHeroMinimapIconScale( scale ) end

---[[ SetHeroRespawnEnabled  Control if the normal DOTA hero respawn rules apply. ]]
-- @return nil
-- @param enabled bool
function CDOTAGameRules:SetHeroRespawnEnabled( enabled ) end

---[[ SetHeroSelectionTime  Sets the amount of time players have to pick their hero. ]]
-- @return nil
-- @param selectionTime float
function CDOTAGameRules:SetHeroSelectionTime( selectionTime ) end

---[[ SetHeroSelectPenaltyTime  Sets amount of penalty time before randoming a hero. ]]
-- @return nil
-- @param arg1 float
function CDOTAGameRules:SetHeroSelectPenaltyTime( arg1 ) end

---[[ SetHideBlacklistedHeroes  Should blacklisted heroes be hidden, or just dimmed, in hero picking? ]]
-- @return nil
-- @param arg1 bool
function CDOTAGameRules:SetHideBlacklistedHeroes( arg1 ) end

---[[ SetHideKillMessageHeaders  Sets whether the multikill, streak, and first-blood banners appear at the top of the screen. ]]
-- @return nil
-- @param hideHeaders bool
function CDOTAGameRules:SetHideKillMessageHeaders( hideHeaders ) end

---[[ SetIgnoreLobbyTeamsInCustomGame  Set whether custom and event games should ignore Lobby teams when assigning players to teams. Defaults to true. ]]
-- @return nil
-- @param arg1 bool
function CDOTAGameRules:SetIgnoreLobbyTeamsInCustomGame( arg1 ) end

---[[ SetItemStockCount  Set the stock count of the item. ]]
-- @return nil
-- @param count int
-- @param team DOTATeam_t
-- @param itemName string
-- @param playerId PlayerID
function CDOTAGameRules:SetItemStockCount( count, team, itemName, playerId ) end

---[[ SetNeutralInitialSpawnOffset  Sets the extra offset to initial neutral creep spawn delay. ]]
-- @return nil
-- @param arg1 float
function CDOTAGameRules:SetNeutralInitialSpawnOffset( arg1 ) end

---[[ SetNextBountyRuneSpawnTime  Sets next bounty rune spawn time. ]]
-- @return nil
-- @param arg1 float
function CDOTAGameRules:SetNextBountyRuneSpawnTime( arg1 ) end

---[[ SetNextRuneSpawnTime  Sets next rune spawn time. ]]
-- @return nil
-- @param arg1 float
function CDOTAGameRules:SetNextRuneSpawnTime( arg1 ) end

---[[ SetOverlayHealthBarUnit  Show this unit's health on the overlay health bar. ]]
-- @return nil
-- @param unit CDOTA_BaseNPC
-- @param style int
function CDOTAGameRules:SetOverlayHealthBarUnit( unit, style ) end

---[[ SetPostGameColumns  Set columns to show in post game. ]]
-- @return bool
-- @param arg1 handle
function CDOTAGameRules:SetPostGameColumns( arg1 ) end

---[[ SetPostGameLayout  Configure post game to be single or double column layout. ]]
-- @return nil
-- @param arg1 int
function CDOTAGameRules:SetPostGameLayout( arg1 ) end

---[[ SetPostGameTeamScores  Set score value for each team. First element is for DOTA_TEAM_GOODGUYS. ]]
-- @return bool
-- @param arg1 handle
function CDOTAGameRules:SetPostGameTeamScores( arg1 ) end

---[[ SetPostGameTime  Sets the amount of time players have between the game ending and the server disconnecting them. ]]
-- @return nil
-- @param time float
function CDOTAGameRules:SetPostGameTime( time ) end

---[[ SetPreGameTime  Sets the amount of time players have between picking their hero and game start. ]]
-- @return nil
-- @param time float
function CDOTAGameRules:SetPreGameTime( time ) end

---[[ SetRiverPaint  Paints the river for a duration. ]]
-- @return nil
-- @param arg1 int
-- @param arg2 float
function CDOTAGameRules:SetRiverPaint( arg1, arg2 ) end

---[[ SetRuneMinimapIconScale  Scale the rune icons on the minimap. ]]
-- @return nil
-- @param minimapRuneIconScale float
function CDOTAGameRules:SetRuneMinimapIconScale( minimapRuneIconScale ) end

---[[ SetRuneSpawnTime  Sets the amount of time between rune spawns. ]]
-- @return nil
-- @param time float
function CDOTAGameRules:SetRuneSpawnTime( time ) end

---[[ SetSafeToLeave  Mark this game as safe to leave. ]]
-- @return nil
-- @param safeToLeave bool
function CDOTAGameRules:SetSafeToLeave( safeToLeave ) end

---[[ SetSameHeroSelectionEnabled  When true, players can repeatedly pick the same hero. ]]
-- @return nil
-- @param enabled bool
function CDOTAGameRules:SetSameHeroSelectionEnabled( enabled ) end

---[[ SetShowcaseTime  Sets the amount of time players have between the strategy phase and entering the pre-game phase. ]]
-- @return nil
-- @param time float
function CDOTAGameRules:SetShowcaseTime( time ) end

---[[ SetSpeechUseSpawnInsteadOfRespawnConcept  Set whether to speak a Spawn concept instead of a Respawn concept on respawn. ]]
-- @return nil
-- @param arg1 bool
function CDOTAGameRules:SetSpeechUseSpawnInsteadOfRespawnConcept( arg1 ) end

---[[ SetStartingGold  Set the starting gold amount. ]]
-- @return nil
-- @param amount int
function CDOTAGameRules:SetStartingGold( amount ) end

---[[ SetStrategyTime  Sets the amount of time players have between the hero selection and entering the showcase phase. ]]
-- @return nil
-- @param time float
function CDOTAGameRules:SetStrategyTime( time ) end

---[[ SetSuggestAbilitiesEnabled  Sets Dota Plus ability suggestions enabled or disabled. ]]
-- @return nil
-- @param arg1 bool
function CDOTAGameRules:SetSuggestAbilitiesEnabled( arg1 ) end

---[[ SetSuggestItemsEnabled  Sets Dota Plus ability item enabled or disabled. ]]
-- @return nil
-- @param arg1 bool
function CDOTAGameRules:SetSuggestItemsEnabled( arg1 ) end

---[[ SetTimeOfDay  Set the time of day. ]]
-- @return nil
-- @param time float
function CDOTAGameRules:SetTimeOfDay( time ) end

---[[ SetTreeRegrowTime  Sets the tree regrow time in seconds. ]]
-- @return nil
-- @param time float
function CDOTAGameRules:SetTreeRegrowTime( time ) end

---[[ SetUseBaseGoldBountyOnHeroes  Heroes will use the basic NPC functionality for determining their bounty, rather than DOTA specific formulas. ]]
-- @return nil
-- @param useBaseGoldBounties bool
function CDOTAGameRules:SetUseBaseGoldBountyOnHeroes( useBaseGoldBounties ) end

---[[ SetUseCustomHeroXPValues  Allows heroes in the map to give a specific amount of XP (this value must be set). ]]
-- @return nil
-- @param useCustomXPValues bool
function CDOTAGameRules:SetUseCustomHeroXPValues( useCustomXPValues ) end

---[[ SetUseUniversalShopMode  When true, all items are available at as long as any shop is in range. ]]
-- @return nil
-- @param useUniversalShopMode bool
function CDOTAGameRules:SetUseUniversalShopMode( useUniversalShopMode ) end

---[[ SetWeatherWindDirection  Set Weather Wind Direction Vector. ]]
-- @return nil
-- @param arg1 Vector
function CDOTAGameRules:SetWeatherWindDirection( arg1 ) end

---[[ SetWhiteListEnabled  Item whitelist functionality enable/disable. ]]
-- @return nil
-- @param whiteListEnabled bool
function CDOTAGameRules:SetWhiteListEnabled( whiteListEnabled ) end

---[[ ShouldHideBlacklistedHeroes  Are blacklisted heroes hidden, or just dimmed, in hero picking? ]]
-- @return bool
function CDOTAGameRules:ShouldHideBlacklistedHeroes(  ) end

---[[ SpawnAndReleaseCreeps  Spawn and release the next creep wave from Dota lane style spawners. ]]
-- @return nil
function CDOTAGameRules:SpawnAndReleaseCreeps(  ) end

---[[ SpawnNeutralCreeps  Spawn and release the next set of neutral camps. ]]
-- @return nil
function CDOTAGameRules:SpawnNeutralCreeps(  ) end

---[[ State_Get  Get the current Gamerules state. ]]
-- @return DOTA_GameState
function CDOTAGameRules:State_Get(  ) end

---[[ CheckForCourierSpawning  Attempt to spawn the appropriate couriers for this mode. ]]
-- @return handle
-- @param hero CDOTA_BaseNPC_Hero
function CDOTAPlayerController:CheckForCourierSpawning( hero ) end

---[[ GetAssignedHero  Get the player's hero. ]]
-- @return CDOTA_BaseNPC_Hero
function CDOTAPlayerController:GetAssignedHero(  ) end

---[[ GetPlayerID  Get the player's official PlayerID; notably is -1 when the player isn't yet on a team. ]]
-- @return PlayerID
function CDOTAPlayerController:GetPlayerID(  ) end

---[[ MakeRandomHeroSelection  Randoms this player's hero. ]]
-- @return nil
function CDOTAPlayerController:MakeRandomHeroSelection(  ) end

---[[ SetAssignedHeroEntity  Sets this player's hero . ]]
-- @return nil
-- @param hero handle
function CDOTAPlayerController:SetAssignedHeroEntity( hero ) end

---[[ SetKillCamUnit  Set the kill cam unit for this hero. ]]
-- @return nil
-- @param entity CDOTA_BaseNPC
function CDOTAPlayerController:SetKillCamUnit( entity ) end

---[[ SetMusicStatus  Set the music status for this player, note this will only really apply if dota_music_battle_enable is off. ]]
-- @return nil
-- @param musicStatus int
-- @param intensity float
function CDOTAPlayerController:SetMusicStatus( musicStatus, intensity ) end

---[[ SetSelectedHero  Sets this player's hero selection. ]]
-- @return nil
-- @param heroName string
function CDOTAPlayerController:SetSelectedHero( heroName ) end

---[[ SpawnCourierAtPosition  Spawn a courier for this player at the given position. ]]
-- @return CDOTA_Unit_Courier
-- @param location Vector
function CDOTAPlayerController:SpawnCourierAtPosition( location ) end

---[[ AddSubquest  Add a subquest to this quest. ]]
-- @return nil
-- @param subquest handle
function CDotaQuest:AddSubquest( subquest ) end

---[[ CompleteQuest  Mark this quest complete. ]]
-- @return nil
function CDotaQuest:CompleteQuest(  ) end

---[[ GetSubquest  Finds a subquest from this quest by index. ]]
-- @return handle
-- @param index int
function CDotaQuest:GetSubquest( index ) end

---[[ GetSubquestByName  Finds a subquest from this quest by name. ]]
-- @return handle
-- @param name string
function CDotaQuest:GetSubquestByName( name ) end

---[[ RemoveSubquest  Remove a subquest from this quest. ]]
-- @return nil
-- @param subquest handle
function CDotaQuest:RemoveSubquest( subquest ) end

---[[ SetTextReplaceString  Set the text replace string for this quest. ]]
-- @return nil
-- @param string string
function CDotaQuest:SetTextReplaceString( string ) end

---[[ SetTextReplaceValue  Set a quest value. ]]
-- @return nil
-- @param valueSlot int
-- @param value int
function CDotaQuest:SetTextReplaceValue( valueSlot, value ) end

---[[ CompleteSubquest  Mark this subquest complete. ]]
-- @return nil
function CDotaSubquestBase:CompleteSubquest(  ) end

---[[ SetTextReplaceString  Set the text replace string for this subquest. ]]
-- @return nil
-- @param string string
function CDotaSubquestBase:SetTextReplaceString( string ) end

---[[ SetTextReplaceValue  Set a subquest value. ]]
-- @return nil
-- @param valueSlot int
-- @param value int
function CDotaSubquestBase:SetTextReplaceValue( valueSlot, value ) end

---[[ AddBot  Add a computer controlled bot. ]]
-- @return bool
-- @param heroName string
-- @param arg2 string
-- @param arg3 string
-- @param arg4 bool
function CDOTATutorial:AddBot( heroName, arg2, arg3, arg4 ) end

---[[ AddQuest  Add a quest to the quest log. ]]
-- @return nil
-- @param arg1 string
-- @param arg2 int
-- @param arg3 string
-- @param arg4 string
function CDOTATutorial:AddQuest( arg1, arg2, arg3, arg4 ) end

---[[ AddShopWhitelistItem  Add an item to the shop whitelist. ]]
-- @return nil
-- @param itemName string
function CDOTATutorial:AddShopWhitelistItem( itemName ) end

---[[ CompleteQuest  Complete a quest,. ]]
-- @return nil
-- @param arg1 string
function CDOTATutorial:CompleteQuest( arg1 ) end

---[[ CreateLocationTask  Add a task to move to a specific location. ]]
-- @return nil
-- @param arg1 Vector
function CDOTATutorial:CreateLocationTask( arg1 ) end

---[[ EnableCreepAggroViz  Alert the player when a creep becomes agro to their hero. ]]
-- @return nil
-- @param arg1 bool
function CDOTATutorial:EnableCreepAggroViz( arg1 ) end

---[[ EnablePlayerOffscreenTip  Enable the tip to alert players how to find their hero. ]]
-- @return nil
-- @param arg1 bool
function CDOTATutorial:EnablePlayerOffscreenTip( arg1 ) end

---[[ EnableTowerAggroViz  Alert the player when a tower becomes agro to their hero. ]]
-- @return nil
-- @param arg1 bool
function CDOTATutorial:EnableTowerAggroViz( arg1 ) end

---[[ FinishTutorial  End the tutorial. ]]
-- @return nil
function CDOTATutorial:FinishTutorial(  ) end

---[[ ForceGameStart  Force the start of the game. ]]
-- @return nil
function CDOTATutorial:ForceGameStart(  ) end

---[[ IsItemInWhiteList  Is this item currently in the white list. ]]
-- @return bool
-- @param itemName string
function CDOTATutorial:IsItemInWhiteList( itemName ) end

---[[ MoveCameraToLocation  Moves the camera to a position. ]]
-- @return nil
-- @param arg1 Vector
function CDOTATutorial:MoveCameraToLocation( arg1 ) end

---[[ RemoveShopWhitelistItem  Remove an item from the shop whitelist. ]]
-- @return nil
-- @param itemName string
function CDOTATutorial:RemoveShopWhitelistItem( itemName ) end

---[[ SelectHero  Select a hero for the local player. ]]
-- @return nil
-- @param heroName string
function CDOTATutorial:SelectHero( heroName ) end

---[[ SelectPlayerTeam  Select the team for the local player. ]]
-- @return nil
-- @param arg1 string
function CDOTATutorial:SelectPlayerTeam( arg1 ) end

---[[ SetItemGuide  Set the current item guide. ]]
-- @return nil
-- @param arg1 string
function CDOTATutorial:SetItemGuide( arg1 ) end

---[[ SetOrModifyPlayerGold  Set gold amount for the tutorial player. ]]
-- @return nil
-- @param goldAmount int
-- @param setNotModify bool
function CDOTATutorial:SetOrModifyPlayerGold( goldAmount, setNotModify ) end

---[[ SetQuickBuy  Set players quick buy item. ]]
-- @return nil
-- @param itemName string
function CDOTATutorial:SetQuickBuy( itemName ) end

---[[ SetShopOpen  Set the shop open or closed. ]]
-- @return nil
-- @param open bool
function CDOTATutorial:SetShopOpen( open ) end

---[[ SetTutorialConvar  Set a tutorial convar. ]]
-- @return nil
-- @param arg1 string
-- @param arg2 string
function CDOTATutorial:SetTutorialConvar( arg1, arg2 ) end

---[[ SetTutorialUI  Set the UI to use a reduced version to focus attention to specific elements. ]]
-- @return nil
-- @param arg1 int
function CDOTATutorial:SetTutorialUI( arg1 ) end

---[[ SetWhiteListEnabled  Set if we should whitelist shop items. ]]
-- @return nil
-- @param whiteListEnabled bool
function CDOTATutorial:SetWhiteListEnabled( whiteListEnabled ) end

---[[ StartTutorialMode  Initialize Tutorial Mode. ]]
-- @return nil
function CDOTATutorial:StartTutorialMode(  ) end

---[[ UpgradePlayerAbility  Upgrade a specific ability for the local hero. ]]
-- @return nil
-- @param abilityName string
function CDOTATutorial:UpgradePlayerAbility( abilityName ) end

---[[ SetEnabled   ]]
-- @return nil
-- @param enabled bool
function CDotaTutorialNPCBlocker:SetEnabled( enabled ) end

---[[ SetOtherBlocker   ]]
-- @return nil
-- @param blocker handle
function CDotaTutorialNPCBlocker:SetOtherBlocker( blocker ) end

---[[ StartVote  Starts a vote, based upon a table of parameters. ]]
-- @return nil
-- @param arg1 handle
function CDOTAVoteSystem:StartVote( arg1 ) end

---[[ CreateByClassname  Creates an entity by classname. ]]
-- @return CBaseEntity
-- @param className string
function CEntities:CreateByClassname( className ) end

---[[ FindAllByClassname  Finds all entities by class name. Returns an array containing all the found entities. ]]
-- @return [object Object]
-- @param className string
function CEntities:FindAllByClassname( className ) end

---[[ FindAllByClassnameWithin  Find entities by class name within a radius. ]]
-- @return [object Object]
-- @param className string
-- @param location Vector
-- @param radius float
function CEntities:FindAllByClassnameWithin( className, location, radius ) end

---[[ FindAllByModel  Find entities by model name. ]]
-- @return [object Object]
-- @param modelName string
function CEntities:FindAllByModel( modelName ) end

---[[ FindAllByName  Find all entities by name. Returns an array containing all the found entities in it. ]]
-- @return [object Object]
-- @param name string
function CEntities:FindAllByName( name ) end

---[[ FindAllByNameWithin  Find entities by name within a radius. ]]
-- @return [object Object]
-- @param name string
-- @param location Vector
-- @param radius float
function CEntities:FindAllByNameWithin( name, location, radius ) end

---[[ FindAllByTarget  Find entities by targetname. ]]
-- @return [object Object]
-- @param target string
function CEntities:FindAllByTarget( target ) end

---[[ FindAllInSphere  Find entities within a radius. ]]
-- @return [object Object]
-- @param location Vector
-- @param radius float
function CEntities:FindAllInSphere( location, radius ) end

---[[ FindByClassname  Find entities by class name. Pass 'null' to start an iteration, or reference to a previously found entity to continue a search. ]]
-- @return CBaseEntity
-- @param previous CBaseEntity
-- @param className string
function CEntities:FindByClassname( previous, className ) end

---[[ FindByClassnameNearest  Find entities by class name nearest to a point. ]]
-- @return CBaseEntity
-- @param className string
-- @param location Vector
-- @param radius float
function CEntities:FindByClassnameNearest( className, location, radius ) end

---[[ FindByClassnameWithin  Find entities by class name within a radius. Pass 'null' to start an iteration, or reference to a previously found entity to continue a search. ]]
-- @return CBaseEntity
-- @param previous CBaseEntity
-- @param className string
-- @param location Vector
-- @param radius float
function CEntities:FindByClassnameWithin( previous, className, location, radius ) end

---[[ FindByModel  Find entities by model name. Pass 'null' to start an iteration, or reference to a previously found entity to continue a search. ]]
-- @return CBaseEntity
-- @param previous CBaseEntity
-- @param modelName string
function CEntities:FindByModel( previous, modelName ) end

---[[ FindByModelWithin  Find entities by model name within a radius. Pass 'null' to start an iteration, or reference to a previously found entity to continue a search. ]]
-- @return CBaseEntity
-- @param previous CBaseEntity
-- @param modelName string
-- @param location Vector
-- @param radius float
function CEntities:FindByModelWithin( previous, modelName, location, radius ) end

---[[ FindByName  Find entities by name. Pass 'null' to start an iteration, or reference to a previously found entity to continue a search. ]]
-- @return CBaseEntity
-- @param previous CBaseEntity
-- @param name string
function CEntities:FindByName( previous, name ) end

---[[ FindByNameNearest  Find entities by name nearest to a point. ]]
-- @return CBaseEntity
-- @param name string
-- @param location Vector
-- @param radius float
function CEntities:FindByNameNearest( name, location, radius ) end

---[[ FindByNameWithin  Find entities by name within a radius. Pass 'null' to start an iteration, or reference to a previously found entity to continue a search. ]]
-- @return CBaseEntity
-- @param previous CBaseEntity
-- @param name string
-- @param location Vector
-- @param radius float
function CEntities:FindByNameWithin( previous, name, location, radius ) end

---[[ FindByTarget  Find entities by targetname. Pass 'null' to start an iteration, or reference to a previously found entity to continue a search. ]]
-- @return CBaseEntity
-- @param previous CBaseEntity
-- @param target string
function CEntities:FindByTarget( previous, target ) end

---[[ FindInSphere  Find entities within a radius. Pass 'null' to start an iteration, or reference to a previously found entity to continue a search. ]]
-- @return CBaseEntity
-- @param previous CBaseEntity
-- @param location Vector
-- @param radius float
function CEntities:FindInSphere( previous, location, radius ) end

---[[ First  Begin an iteration over the list of entities. ]]
-- @return CBaseEntity
function CEntities:First(  ) end

---[[ GetLocalPlayer  Get the local player controller (backcompat). ]]
-- @return CDOTAPlayerController
function CEntities:GetLocalPlayer(  ) end

---[[ GetLocalPlayerController  Get the local player controller. ]]
-- @return handle
function CEntities:GetLocalPlayerController(  ) end

---[[ GetLocalPlayerPawn  Get the local player pawn. ]]
-- @return handle
function CEntities:GetLocalPlayerPawn(  ) end

---[[ Next  Continue an iteration over the list of entities, providing reference to a previously found entity. ]]
-- @return CBaseEntity
-- @param previous CBaseEntity
function CEntities:Next( previous ) end

---[[ ConnectOutput  Adds an I/O connection that will call the named function on this entity when the specified output fires. ]]
-- @return nil
-- @param arg1 string
-- @param arg2 string
function CEntityInstance:ConnectOutput( arg1, arg2 ) end

---[[ Destroy   ]]
-- @return nil
function CEntityInstance:Destroy(  ) end

---[[ DisconnectOutput  Removes a connected script function from an I/O event on this entity. ]]
-- @return nil
-- @param arg1 string
-- @param arg2 string
function CEntityInstance:DisconnectOutput( arg1, arg2 ) end

---[[ DisconnectRedirectedOutput  Removes a connected script function from an I/O event on the passed entity. ]]
-- @return nil
-- @param arg1 string
-- @param arg2 string
-- @param arg3 handle
function CEntityInstance:DisconnectRedirectedOutput( arg1, arg2, arg3 ) end

---[[ entindex   ]]
-- @return EntityIndex
function CEntityInstance:entindex(  ) end

---[[ FireOutput  Fire an entity output. ]]
-- @return nil
-- @param arg1 string
-- @param arg2 handle
-- @param arg3 handle
-- @param arg4 table
-- @param arg5 float
function CEntityInstance:FireOutput( arg1, arg2, arg3, arg4, arg5 ) end

---[[ GetClassname   ]]
-- @return string
function CEntityInstance:GetClassname(  ) end

---[[ GetDebugName  Get the entity name w/help if not defined (i.e. classname/etc). ]]
-- @return string
function CEntityInstance:GetDebugName(  ) end

---[[ GetEntityHandle  Get the entity as an EHANDLE. ]]
-- @return ehandle
function CEntityInstance:GetEntityHandle(  ) end

---[[ GetEntityIndex   ]]
-- @return EntityIndex
function CEntityInstance:GetEntityIndex(  ) end

---[[ GetIntAttr  Get Integer Attribute. ]]
-- @return int
-- @param arg1 string
function CEntityInstance:GetIntAttr( arg1 ) end

---[[ GetName  Get the entity name. ]]
-- @return string
function CEntityInstance:GetName(  ) end

---[[ GetOrCreatePrivateScriptScope  Retrieve, creating if necessary, the private per-instance script-side data associated with an entity. ]]
-- @return handle
function CEntityInstance:GetOrCreatePrivateScriptScope(  ) end

---[[ GetOrCreatePublicScriptScope  Retrieve, creating if necessary, the public script-side data associated with an entity. ]]
-- @return handle
function CEntityInstance:GetOrCreatePublicScriptScope(  ) end

---[[ GetPrivateScriptScope  Retrieve the private per-instance script-side data associated with an entity. ]]
-- @return handle
function CEntityInstance:GetPrivateScriptScope(  ) end

---[[ GetPublicScriptScope  Retrieve the public script-side data associated with an entity. ]]
-- @return handle
function CEntityInstance:GetPublicScriptScope(  ) end

---[[ IsNull  Has underlying C++ entity object been deleted? ]]
-- @return bool
function CEntityInstance:IsNull(  ) end

---[[ RedirectOutput  Adds an I/O connection that will call the named function on the passed entity when the specified output fires. ]]
-- @return nil
-- @param arg1 string
-- @param arg2 string
-- @param arg3 handle
function CEntityInstance:RedirectOutput( arg1, arg2, arg3 ) end

---[[ RemoveSelf  Delete this entity. ]]
-- @return nil
function CEntityInstance:RemoveSelf(  ) end

---[[ SetIntAttr  Set Integer Attribute. ]]
-- @return nil
-- @param arg1 string
-- @param arg2 int
function CEntityInstance:SetIntAttr( arg1, arg2 ) end

---[[ SpawnEntity  Create an entity at the location of the maker. ]]
-- @return nil
function CEnvEntityMaker:SpawnEntity(  ) end

---[[ SpawnEntityAtEntityOrigin  Create an entity at the location of a specified entity instance. ]]
-- @return nil
-- @param entity handle
function CEnvEntityMaker:SpawnEntityAtEntityOrigin( entity ) end

---[[ SpawnEntityAtLocation  Create an entity at a specified location and orientaton, orientation is Euler angle in degrees. ]]
-- @return nil
-- @param vecAlternateOrigin Vector
-- @param vecAlternateAngles Vector
function CEnvEntityMaker:SpawnEntityAtLocation( vecAlternateOrigin, vecAlternateAngles ) end

---[[ SpawnEntityAtNamedEntityOrigin  Create an entity at the location of a named entity. ]]
-- @return nil
-- @param name string
function CEnvEntityMaker:SpawnEntityAtNamedEntityOrigin( name ) end

---[[ AddRectangularBlocker  Sets or clears a blocker rectangle. ]]
-- @return nil
-- @param mins Vector
-- @param maxs Vector
-- @param clearRegion bool
function CFoWBlockerRegion:AddRectangularBlocker( mins, maxs, clearRegion ) end

---[[ AddRectangularOutlineBlocker  Sets or clears a blocker rectangle outline. ]]
-- @return nil
-- @param mins Vector
-- @param maxs Vector
-- @param clearRegion bool
function CFoWBlockerRegion:AddRectangularOutlineBlocker( mins, maxs, clearRegion ) end

---[[ QueryColor  Query color data for this key. ]]
-- @return Vector
-- @param tok string
-- @param default Vector
function CInfoData:QueryColor( tok, default ) end

---[[ QueryFloat  Query float data for this key. ]]
-- @return float
-- @param tok string
-- @param default float
function CInfoData:QueryFloat( tok, default ) end

---[[ QueryInt  Query int data for this key. ]]
-- @return int
-- @param tok string
-- @param default int
function CInfoData:QueryInt( tok, default ) end

---[[ QueryNumber  Query number data for this key. ]]
-- @return float
-- @param tok string
-- @param default float
function CInfoData:QueryNumber( tok, default ) end

---[[ QueryString  Query string data for this key. ]]
-- @return string
-- @param tok string
-- @param default string
function CInfoData:QueryString( tok, default ) end

---[[ QueryVector  Query vector data for this key. ]]
-- @return Vector
-- @param tok string
-- @param default Vector
function CInfoData:QueryVector( tok, default ) end

---[[ IsEnabled  Returns whether the object is currently active. ]]
-- @return bool
function CInfoPlayerStartDota:IsEnabled(  ) end

---[[ SetEnabled  Enable or disable the obstruction. ]]
-- @return nil
-- @param enabled bool
function CInfoPlayerStartDota:SetEnabled( enabled ) end

---[[ HideWorldLayer  Hides this layer. ]]
-- @return nil
function CInfoWorldLayer:HideWorldLayer(  ) end

---[[ ShowWorldLayer  Shows this layer. ]]
-- @return nil
function CInfoWorldLayer:ShowWorldLayer(  ) end

---[[ Trigger  Triggers the logic_relay. ]]
-- @return nil
-- @param activator CBaseEntity
-- @param caller CBaseEntity
function CLogicRelay:Trigger( activator, caller ) end

---[[ HasTag  Does this volume have the given tag. ]]
-- @return bool
-- @param tagName string
function CMarkupVolumeTagged:HasTag( tagName ) end

---[[ AddOutput  Add an output. ]]
-- @return nil
-- @param arg1 string
-- @param arg2 string
function CNativeOutputs:AddOutput( arg1, arg2 ) end

---[[ Init  Initialize with number of outputs. ]]
-- @return nil
-- @param arg1 int
function CNativeOutputs:Init( arg1 ) end

---[[ GetBool  Returns the convar as a boolean flag. ]]
-- @return bool
-- @param name string
function Convars:GetBool( name ) end

---[[ GetCommandClient  Returns the player who issued this console command. ]]
-- @return CDOTAPlayerController
function Convars:GetCommandClient(  ) end

---[[ GetDOTACommandClient  Returns the DOTA player who issued this console command. ]]
-- @return CDOTAPlayerController
function Convars:GetDOTACommandClient(  ) end

---[[ GetFloat  Returns the convar as a float. May return null if no such convar. ]]
-- @return float
-- @param name string
function Convars:GetFloat( name ) end

---[[ GetInt  Returns the convar as an int. May return null if no such convar. ]]
-- @return int
-- @param name string
function Convars:GetInt( name ) end

---[[ GetStr  Returns the convar as a string. May return null if no such convar. ]]
-- @return string
-- @param name string
function Convars:GetStr( name ) end

---[[ RegisterCommand  Register a console command. ]]
-- @return nil
-- @param name string
-- @param callback [object Object]
-- @param helpString string
-- @param flags ConVarFlags
function Convars:RegisterCommand( name, callback, helpString, flags ) end

---[[ RegisterConvar  Register a new console variable. ]]
-- @return nil
-- @param name string
-- @param defaultValue string
-- @param helpString string
-- @param flags ConVarFlags
function Convars:RegisterConvar( name, defaultValue, helpString, flags ) end

---[[ SetBool  Sets the value of the convar to the bool. ]]
-- @return nil
-- @param name string
-- @param value bool
function Convars:SetBool( name, value ) end

---[[ SetFloat  Sets the value of the convar to the float. ]]
-- @return nil
-- @param name string
-- @param value float
function Convars:SetFloat( name, value ) end

---[[ SetInt  Sets the value of the convar to the int. ]]
-- @return nil
-- @param name string
-- @param value int
function Convars:SetInt( name, value ) end

---[[ SetStr  Sets the value of the convar to the string. ]]
-- @return nil
-- @param name string
-- @param value string
function Convars:SetStr( name, value ) end

---[[ DisableMotion  Disable motion for the prop. ]]
-- @return nil
function CPhysicsProp:DisableMotion(  ) end

---[[ EnableMotion  Enable motion for the prop. ]]
-- @return nil
function CPhysicsProp:EnableMotion(  ) end

---[[ AcceptUserInput  Tells the panel to accept user input. ]]
-- @return nil
function CPointClientUIWorldPanel:AcceptUserInput(  ) end

---[[ AddCSSClasses  Adds CSS class(es) to the panel. ]]
-- @return nil
-- @param classes string
function CPointClientUIWorldPanel:AddCSSClasses( classes ) end

---[[ IgnoreUserInput  Tells the panel to ignore user input. ]]
-- @return nil
function CPointClientUIWorldPanel:IgnoreUserInput(  ) end

---[[ IsGrabbable  Returns whether this entity is grabbable. ]]
-- @return bool
function CPointClientUIWorldPanel:IsGrabbable(  ) end

---[[ RemoveCSSClasses  Remove CSS class(es) from the panel. ]]
-- @return nil
-- @param classes string
function CPointClientUIWorldPanel:RemoveCSSClasses( classes ) end

---[[ DeleteCreatedSpawnGroups  Deletes any spawn groups that this point_template has spawned. Note: The point_template will not be deleted by this. ]]
-- @return nil
function CPointTemplate:DeleteCreatedSpawnGroups(  ) end

---[[ ForceSpawn  Spawns all of the entities the point_template is pointing at. ]]
-- @return nil
function CPointTemplate:ForceSpawn(  ) end

---[[ GetSpawnedEntities  Get the list of the most recent spawned entities. ]]
-- @return handle
function CPointTemplate:GetSpawnedEntities(  ) end

---[[ SetSpawnCallback  Set a callback for when the template spawns entities. The spawned entities will be passed in as an array. ]]
-- @return nil
-- @param callbackFunc handle
-- @param callbackScope handle
function CPointTemplate:SetSpawnCallback( callbackFunc, callbackScope ) end

---[[ SetMessage  Set the message on this entity. ]]
-- @return nil
-- @param message string
function CPointWorldText:SetMessage( message ) end

---[[ AddBroadcastTeamTarget  Adds a team (by index) to the broadcast list. ]]
-- @return nil
-- @param arg1 int
function CSceneEntity:AddBroadcastTeamTarget( arg1 ) end

---[[ Cancel  Cancel scene playback. ]]
-- @return nil
function CSceneEntity:Cancel(  ) end

---[[ EstimateLength  Returns length of this scene in seconds. ]]
-- @return float
function CSceneEntity:EstimateLength(  ) end

---[[ FindNamedEntity  Given an entity reference, such as !target, get actual entity from scene object. ]]
-- @return handle
-- @param arg1 string
function CSceneEntity:FindNamedEntity( arg1 ) end

---[[ IsPaused  If this scene is currently paused. ]]
-- @return bool
function CSceneEntity:IsPaused(  ) end

---[[ IsPlayingBack  If this scene is currently playing. ]]
-- @return bool
function CSceneEntity:IsPlayingBack(  ) end

---[[ RemoveBroadcastTeamTarget  Removes a team (by index) from the broadcast list. ]]
-- @return nil
-- @param arg1 int
function CSceneEntity:RemoveBroadcastTeamTarget( arg1 ) end

---[[ Start  Start scene playback, takes activatorEntity as param. ]]
-- @return nil
-- @param arg1 handle
function CSceneEntity:Start( arg1 ) end

---[[ GetAllHeroes  Returns all the heroes in the world. ]]
-- @return [object Object]
function CScriptHeroList:GetAllHeroes(  ) end

---[[ GetHero  Get the Nth hero in the Hero List. ]]
-- @return CDOTA_BaseNPC_Hero
-- @param nth int
function CScriptHeroList:GetHero( nth ) end

---[[ GetHeroCount  Returns the number of heroes in the world. ]]
-- @return int
function CScriptHeroList:GetHeroCount(  ) end

---[[ Send  Send a HTTP request. ]]
-- @return bool
-- @param callback [object Object]
function CScriptHTTPRequest:Send( callback ) end

---[[ SetHTTPRequestAbsoluteTimeoutMS  Set the total timeout on the request. ]]
-- @return bool
-- @param milliseconds uint
function CScriptHTTPRequest:SetHTTPRequestAbsoluteTimeoutMS( milliseconds ) end

---[[ SetHTTPRequestGetOrPostParameter  Set a POST or GET parameter on the request. ]]
-- @return bool
-- @param name string
-- @param value string
function CScriptHTTPRequest:SetHTTPRequestGetOrPostParameter( name, value ) end

---[[ SetHTTPRequestHeaderValue  Set a header value on the request. ]]
-- @return bool
-- @param name string
-- @param value string
function CScriptHTTPRequest:SetHTTPRequestHeaderValue( name, value ) end

---[[ SetHTTPRequestNetworkActivityTimeout  Set the network timeout on the request - this timer is reset when any data is received. ]]
-- @return bool
-- @param seconds uint
function CScriptHTTPRequest:SetHTTPRequestNetworkActivityTimeout( seconds ) end

---[[ SetHTTPRequestRawPostBody  Set the literal body of a post - invalid after setting a post parameter. ]]
-- @return bool
-- @param contentType string
-- @param body string
function CScriptHTTPRequest:SetHTTPRequestRawPostBody( contentType, body ) end

---[[ GetValue  Reads a spawn key. ]]
-- @return table
-- @param arg1 string
function CScriptKeyValues:GetValue( arg1 ) end

---[[ CreateParticle  Creates a new particle effect. ]]
-- @return ParticleID
-- @param particleName string
-- @param particleAttach ParticleAttachment_t
-- @param owner CBaseEntity
function CScriptParticleManager:CreateParticle( particleName, particleAttach, owner ) end

---[[ CreateParticleForPlayer  Creates a new particle effect that only plays for the specified player. ]]
-- @return ParticleID
-- @param particleName string
-- @param particleAttach ParticleAttachment_t
-- @param owner CBaseEntity
-- @param player CDOTAPlayerController
function CScriptParticleManager:CreateParticleForPlayer( particleName, particleAttach, owner, player ) end

---[[ CreateParticleForTeam  Creates a new particle effect that only plays for the specified team. ]]
-- @return ParticleID
-- @param particleName string
-- @param particleAttach ParticleAttachment_t
-- @param owner CBaseEntity
-- @param team DOTATeam_t
function CScriptParticleManager:CreateParticleForTeam( particleName, particleAttach, owner, team ) end

---[[ DestroyParticle  Destroy a particle, if bDestroyImmediately destroy it without playing end caps. ]]
-- @return nil
-- @param particle ParticleID
-- @param immediate bool
function CScriptParticleManager:DestroyParticle( particle, immediate ) end

---[[ GetParticleReplacement   ]]
-- @return string
-- @param particleName string
-- @param hero CDOTA_BaseNPC_Hero
function CScriptParticleManager:GetParticleReplacement( particleName, hero ) end

---[[ ReleaseParticleIndex  Frees the specified particle index. ]]
-- @return nil
-- @param particle ParticleID
function CScriptParticleManager:ReleaseParticleIndex( particle ) end

---[[ SetParticleAlwaysSimulate   ]]
-- @return nil
-- @param particle ParticleID
function CScriptParticleManager:SetParticleAlwaysSimulate( particle ) end

---[[ SetParticleControl  Set the control point data for a control on a particle effect. ]]
-- @return nil
-- @param particle ParticleID
-- @param controlPoint int
-- @param value Vector
function CScriptParticleManager:SetParticleControl( particle, controlPoint, value ) end

---[[ SetParticleControlEnt   ]]
-- @return nil
-- @param particle ParticleID
-- @param controlPoint int
-- @param unit CBaseEntity
-- @param particleAttach ParticleAttachment_t
-- @param attachment string
-- @param offset Vector
-- @param lockOrientation bool
function CScriptParticleManager:SetParticleControlEnt( particle, controlPoint, unit, particleAttach, attachment, offset, lockOrientation ) end

---[[ SetParticleControlFallback   ]]
-- @return nil
-- @param particle ParticleID
-- @param controlPoint int
-- @param vecPosition Vector
function CScriptParticleManager:SetParticleControlFallback( particle, controlPoint, vecPosition ) end

---[[ SetParticleControlForward  [OBSOLETE - Use SetParticleControlTransformForward] (int nFXIndex, int nPoint, vForward). ]]
-- @return nil
-- @param particle ParticleID
-- @param controlPoint int
-- @param arg3 Vector
function CScriptParticleManager:SetParticleControlForward( particle, controlPoint, arg3 ) end

---[[ SetParticleControlOrientation  [OBSOLETE - Use SetParticleControlTransform] (int nFXIndex, int nPoint, vForward, vRight, vUp) - Set the orientation for a control on a particle effect (NOTE: This is left handed -- bad!!). ]]
-- @return nil
-- @param particle ParticleID
-- @param controlPoint int
-- @param arg3 Vector
-- @param arg4 Vector
-- @param arg5 Vector
function CScriptParticleManager:SetParticleControlOrientation( particle, controlPoint, arg3, arg4, arg5 ) end

---[[ SetParticleControlOrientationFLU  [OBSOLETE - Use SetParticleControlTransform] (int nFXIndex, int nPoint, Vector vecForward, Vector vecLeft, Vector vecUp) - Set the orientation for a control on a particle effect. ]]
-- @return nil
-- @param particle ParticleID
-- @param controlPoint int
-- @param arg3 Vector
-- @param arg4 Vector
-- @param arg5 Vector
function CScriptParticleManager:SetParticleControlOrientationFLU( particle, controlPoint, arg3, arg4, arg5 ) end

---[[ SetParticleControlTransform   ]]
-- @return nil
-- @param fxIndex int
-- @param point int
-- @param origin Vector
-- @param qAngles QAngle
function CScriptParticleManager:SetParticleControlTransform( fxIndex, point, origin, qAngles ) end

---[[ SetParticleControlTransformForward   ]]
-- @return nil
-- @param fxIndex int
-- @param point int
-- @param origin Vector
-- @param forward Vector
function CScriptParticleManager:SetParticleControlTransformForward( fxIndex, point, origin, forward ) end

---[[ SetParticleFoWProperties   ]]
-- @return nil
-- @param particle ParticleID
-- @param controlPoint int
-- @param controlPoint2 int
-- @param radius float
function CScriptParticleManager:SetParticleFoWProperties( particle, controlPoint, controlPoint2, radius ) end

---[[ SetParticleShouldCheckFoW   ]]
-- @return bool
-- @param particle ParticleID
-- @param checkFoW bool
function CScriptParticleManager:SetParticleShouldCheckFoW( particle, checkFoW ) end

---[[ AddResource  Precaches a specific resource. ]]
-- @return nil
-- @param resource string
function CScriptPrecacheContext:AddResource( resource ) end

---[[ GetValue  Reads a spawn key. ]]
-- @return table
-- @param key string
function CScriptPrecacheContext:GetValue( key ) end

---[[ RandomFloat   ]]
-- @return float
-- @param minVal float
-- @param maxVal float
function CScriptUniformRandomStream:RandomFloat( minVal, maxVal ) end

---[[ RandomFloatExp   ]]
-- @return float
-- @param minVal float
-- @param maxVal float
-- @param exponent float
function CScriptUniformRandomStream:RandomFloatExp( minVal, maxVal, exponent ) end

---[[ RandomInt   ]]
-- @return int
-- @param minVal int
-- @param maxVal int
function CScriptUniformRandomStream:RandomInt( minVal, maxVal ) end

---[[ RollPercentage   ]]
-- @return bool
-- @param percentage int
function CScriptUniformRandomStream:RollPercentage( percentage ) end

---[[ AddDamage   ]]
-- @return nil
-- @param addAmount float
function CTakeDamageInfo:AddDamage( addAmount ) end

---[[ AddDamageType   ]]
-- @return nil
-- @param damageType int
function CTakeDamageInfo:AddDamageType( damageType ) end

---[[ GetAmmoType   ]]
-- @return int
function CTakeDamageInfo:GetAmmoType(  ) end

---[[ GetAttacker   ]]
-- @return handle
function CTakeDamageInfo:GetAttacker(  ) end

---[[ GetDamage   ]]
-- @return float
function CTakeDamageInfo:GetDamage(  ) end

---[[ GetDamageCustom   ]]
-- @return int
function CTakeDamageInfo:GetDamageCustom(  ) end

---[[ GetDamageForce   ]]
-- @return Vector
function CTakeDamageInfo:GetDamageForce(  ) end

---[[ GetDamagePosition   ]]
-- @return Vector
function CTakeDamageInfo:GetDamagePosition(  ) end

---[[ GetDamageType   ]]
-- @return unknown
function CTakeDamageInfo:GetDamageType(  ) end

---[[ GetInflictor   ]]
-- @return handle
function CTakeDamageInfo:GetInflictor(  ) end

---[[ GetOriginalDamage   ]]
-- @return float
function CTakeDamageInfo:GetOriginalDamage(  ) end

---[[ GetReportedPosition   ]]
-- @return Vector
function CTakeDamageInfo:GetReportedPosition(  ) end

---[[ GetTotalledDamage   ]]
-- @return float
function CTakeDamageInfo:GetTotalledDamage(  ) end

---[[ HasDamageType   ]]
-- @return bool
-- @param damageType int
function CTakeDamageInfo:HasDamageType( damageType ) end

---[[ ScaleDamage   ]]
-- @return nil
-- @param scaleAmount float
function CTakeDamageInfo:ScaleDamage( scaleAmount ) end

---[[ SetAmmoType   ]]
-- @return nil
-- @param ammoType int
function CTakeDamageInfo:SetAmmoType( ammoType ) end

---[[ SetAttacker   ]]
-- @return nil
-- @param attacker handle
function CTakeDamageInfo:SetAttacker( attacker ) end

---[[ SetDamage   ]]
-- @return nil
-- @param damage float
function CTakeDamageInfo:SetDamage( damage ) end

---[[ SetDamageCustom   ]]
-- @return nil
-- @param damageCustom int
function CTakeDamageInfo:SetDamageCustom( damageCustom ) end

---[[ SetDamageForce   ]]
-- @return nil
-- @param damageForce Vector
function CTakeDamageInfo:SetDamageForce( damageForce ) end

---[[ SetDamagePosition   ]]
-- @return nil
-- @param damagePosition Vector
function CTakeDamageInfo:SetDamagePosition( damagePosition ) end

---[[ SetDamageType   ]]
-- @return nil
-- @param damageType int
function CTakeDamageInfo:SetDamageType( damageType ) end

---[[ SetOriginalDamage   ]]
-- @return nil
-- @param originalDamage float
function CTakeDamageInfo:SetOriginalDamage( originalDamage ) end

---[[ SetReportedPosition   ]]
-- @return nil
-- @param reportedPosition Vector
function CTakeDamageInfo:SetReportedPosition( reportedPosition ) end

---[[ CommandLineCheck  Returns true if the command line param was used, otherwise false. ]]
-- @return table
-- @param name string
function GlobalSys:CommandLineCheck( name ) end

---[[ CommandLineFloat  Returns the command line param as a float. ]]
-- @return table
-- @param arg1 string
-- @param arg2 float
function GlobalSys:CommandLineFloat( arg1, arg2 ) end

---[[ CommandLineInt  Returns the command line param as an int. ]]
-- @return table
-- @param arg1 string
-- @param arg2 int
function GlobalSys:CommandLineInt( arg1, arg2 ) end

---[[ CommandLineStr  Returns the command line param as a string. ]]
-- @return table
-- @param arg1 string
-- @param arg2 string
function GlobalSys:CommandLineStr( arg1, arg2 ) end

---[[ CanFindPath  Determine if it is possible to reach the specified end point from the specified start point. bool. ]]
-- @return bool
-- @param start Vector
-- @param end Vector
function GridNav:CanFindPath( start, end ) end

---[[ DestroyTreesAroundPoint  Destroy all trees in the area(vPosition, flRadius, bFullCollision. ]]
-- @return nil
-- @param arg1 Vector
-- @param arg2 float
-- @param arg3 bool
function GridNav:DestroyTreesAroundPoint( arg1, arg2, arg3 ) end

---[[ FindPathLength  Find a path between the two points an return the length of the path. If there is not a path between the points the returned value will be -1. ]]
-- @return float
-- @param start Vector
-- @param end Vector
function GridNav:FindPathLength( start, end ) end

---[[ GetAllTreesAroundPoint  Returns a table full of tree HSCRIPTS. ]]
-- @return [object Object]
-- @param position Vector
-- @param radius float
-- @param fullCollision bool
function GridNav:GetAllTreesAroundPoint( position, radius, fullCollision ) end

---[[ GridPosToWorldCenterX  Get the X position of the center of a given X index. ]]
-- @return float
-- @param arg1 int
function GridNav:GridPosToWorldCenterX( arg1 ) end

---[[ GridPosToWorldCenterY  Get the Y position of the center of a given Y index. ]]
-- @return float
-- @param arg1 int
function GridNav:GridPosToWorldCenterY( arg1 ) end

---[[ IsBlocked  Checks whether the given position is blocked. ]]
-- @return bool
-- @param arg1 Vector
function GridNav:IsBlocked( arg1 ) end

---[[ IsNearbyTree  Checks whether there are any trees overlapping the given point. ]]
-- @return bool
-- @param position Vector
-- @param radius float
-- @param checkFullTreeRadius bool
function GridNav:IsNearbyTree( position, radius, checkFullTreeRadius ) end

---[[ IsTraversable  Checks whether the given position is traversable. ]]
-- @return bool
-- @param arg1 Vector
function GridNav:IsTraversable( arg1 ) end

---[[ RegrowAllTrees  Causes all trees in the map to regrow. ]]
-- @return nil
function GridNav:RegrowAllTrees(  ) end

---[[ WorldToGridPosX  Get the X index of a given world X position. ]]
-- @return int
-- @param arg1 float
function GridNav:WorldToGridPosX( arg1 ) end

---[[ WorldToGridPosY  Get the Y index of a given world Y position. ]]
-- @return int
-- @param arg1 float
function GridNav:WorldToGridPosY( arg1 ) end

---[[ ChangeTrackingProjectileSpeed  Update speed. ]]
-- @return nil
-- @param ability CDOTABaseAbility
-- @param speed int
function ProjectileManager:ChangeTrackingProjectileSpeed( ability, speed ) end

---[[ CreateLinearProjectile  Creates a linear projectile and returns the projectile ID. ]]
-- @return ProjectileID
-- @param options CreateLinearProjectileOptions
function ProjectileManager:CreateLinearProjectile( options ) end

---[[ CreateTrackingProjectile  Creates a tracking projectile. ]]
-- @return ProjectileID
-- @param options CreateTrackingProjectileOptions
function ProjectileManager:CreateTrackingProjectile( options ) end

---[[ DestroyLinearProjectile  Destroys the linear projectile matching the argument ID. ]]
-- @return nil
-- @param projectile ProjectileID
function ProjectileManager:DestroyLinearProjectile( projectile ) end

---[[ DestroyTrackingProjectile  Destroy a tracking projectile early. ]]
-- @return nil
-- @param projectile ProjectileID
function ProjectileManager:DestroyTrackingProjectile( projectile ) end

---[[ GetLinearProjectileLocation  Returns current location of projectile. ]]
-- @return Vector
-- @param projectile ProjectileID
function ProjectileManager:GetLinearProjectileLocation( projectile ) end

---[[ GetLinearProjectileRadius  Returns current radius of projectile. ]]
-- @return float
-- @param projectile ProjectileID
function ProjectileManager:GetLinearProjectileRadius( projectile ) end

---[[ GetLinearProjectileVelocity  Returns a vector representing the current velocity of the projectile. ]]
-- @return Vector
-- @param projectile ProjectileID
function ProjectileManager:GetLinearProjectileVelocity( projectile ) end

---[[ GetTrackingProjectileLocation  Returns current location of projectile. ]]
-- @return Vector
-- @param projectile ProjectileID
function ProjectileManager:GetTrackingProjectileLocation( projectile ) end

---[[ IsValidProjectile  Is this a valid projectile? ]]
-- @return bool
-- @param value int
function ProjectileManager:IsValidProjectile( value ) end

---[[ ProjectileDodge  Makes the specified unit dodge projectiles. ]]
-- @return nil
-- @param unit CDOTA_BaseNPC
function ProjectileManager:ProjectileDodge( unit ) end

---[[ UpdateLinearProjectileDirection  Update velocity. ]]
-- @return nil
-- @param projectile ProjectileID
-- @param direction Vector
-- @param speed float
function ProjectileManager:UpdateLinearProjectileDirection( projectile, direction, speed ) end

---[[ __add  Overloaded +. Adds angles together. ]]
-- @return QAngle
-- @param b QAngle
function QAngle:__add( b ) end

---[[ __eq  Overloaded ==. Tests for Equality. ]]
-- @return bool
-- @param b QAngle
function QAngle:__eq( b ) end

---[[ __tostring  Overloaded .. Converts the QAngles to strings. ]]
-- @return string
function QAngle:__tostring(  ) end

---[[ Forward  Returns the forward vector. ]]
-- @return Vector
function QAngle:Forward(  ) end

---[[ Left  Returns the left vector. ]]
-- @return Vector
function QAngle:Left(  ) end

---[[ Up  Returns the up vector. ]]
-- @return Vector
function QAngle:Up(  ) end

---[[ IsPublicUniverse  Is the script connected to the public Steam universe. ]]
-- @return bool
function SteamInfo:IsPublicUniverse(  ) end

---[[ __eq   ]]
-- @return bool
-- @param b Uint64
function Uint64:__eq( b ) end

---[[ __tostring  Overloaded .. Converts Uint64s to strings. ]]
-- @return string
function Uint64:__tostring(  ) end

---[[ BitwiseAnd  Performs bitwise AND between two integers. ]]
-- @return Uint64
-- @param operand Uint64
function Uint64:BitwiseAnd( operand ) end

---[[ BitwiseOr  Performs bitwise OR between two integers. ]]
-- @return Uint64
-- @param operand Uint64
function Uint64:BitwiseOr( operand ) end

---[[ BitwiseXor  Performs bitwise XOR between two integers. ]]
-- @return Uint64
-- @param operand Uint64
function Uint64:BitwiseXor( operand ) end

---[[ BitwiseNot  Performs bitwise NOT. ]]
-- @return Uint64
function Uint64:BitwiseNot(  ) end

---[[ SetBit  Sets the specified bit. ]]
-- @return nil
-- @param bitvalue int
function Uint64:SetBit( bitvalue ) end

---[[ ClearBit  Clears the specified bit. ]]
-- @return int
-- @param bitvalue int
function Uint64:ClearBit( bitvalue ) end

---[[ IsBitSet  Checks if bit is set. ]]
-- @return int
-- @param bitvalue int
function Uint64:IsBitSet( bitvalue ) end

---[[ ToggleBit  Toggles the specified bit. ]]
-- @return int
-- @param bitvalue int
function Uint64:ToggleBit( bitvalue ) end

---[[ ToHexString  Returns a hexadecimal string representation of the integer. ]]
-- @return string
function Uint64:ToHexString(  ) end

---[[ __add  Overloaded +. Adds vectors together. ]]
-- @return Vector
-- @param b Vector
function Vector:__add( b ) end

---[[ __div  Overloaded /. Divides vectors. ]]
-- @return Vector
-- @param b Vector
function Vector:__div( b ) end

---[[ __eq  Overloaded ==. Tests for Equality. ]]
-- @return bool
-- @param b Vector
function Vector:__eq( b ) end

---[[ __len  Overloaded # returns the length of the vector. ]]
-- @return float
function Vector:__len(  ) end

---[[ __mul  Overloaded * returns the vectors multiplied together. Can also be used to multiply with scalars. ]]
-- @return Vector
-- @param b Vector
function Vector:__mul( b ) end

---[[ __sub  Overloaded -. Subtracts vectors. ]]
-- @return Vector
-- @param b Vector
function Vector:__sub( b ) end

---[[ __tostring  Overloaded .. Converts vectors to strings. ]]
-- @return string
function Vector:__tostring(  ) end

---[[ __unm  Overloaded - operator. Reverses the vector. ]]
-- @return Vector
function Vector:__unm(  ) end

---[[ Cross  Cross product of two vectors. ]]
-- @return Vector
-- @param b Vector
function Vector:Cross( b ) end

---[[ Dot  Dot product of two vectors. ]]
-- @return float
-- @param b Vector
function Vector:Dot( b ) end

---[[ Length  Length of the Vector. ]]
-- @return float
function Vector:Length(  ) end

---[[ Length2D  Length of the Vector in the XY plane. ]]
-- @return float
function Vector:Length2D(  ) end

---[[ Normalized  Returns the vector normalized. ]]
-- @return Vector
function Vector:Normalized(  ) end

---[[ Lerp  Linearly interpolates between two vectors.
This is most commonly used to find a point some fraction of the way along a line between two endpoints.
Same as `this + (b - this) * t`. ]]
-- @return Vector
-- @param b Vector
-- @param t float
function Vector:Lerp( b, t ) end

--- Enum Constants
DOTA_ITEM_INVENTORY_SIZE = 9

--- Enum Constants
DOTA_ITEM_MAX = 25

--- Enum Constants
DOTA_ITEM_STASH_MAX = 15

--- Enum Constants
DOTA_ITEM_STASH_MIN = 9

--- Enum Constants
DOTA_ITEM_STASH_SIZE = 6

--- Enum Constants
DOTA_MAX_ABILITIES = 40

--- Enum Constants
FIND_UNITS_EVERYWHERE = -1

--- Enum Constants
SPAWN_GROUP_HANDLE_INVALID = 0

--- Enum ABILITY_TYPES
ABILITY_TYPE_BASIC = 0
ABILITY_TYPE_ULTIMATE = 1
ABILITY_TYPE_ATTRIBUTES = 2
ABILITY_TYPE_HIDDEN = 3

--- Enum AbilityLearnResult_t
ABILITY_CAN_BE_UPGRADED = 0
ABILITY_CANNOT_BE_UPGRADED_NOT_UPGRADABLE = 1
ABILITY_CANNOT_BE_UPGRADED_AT_MAX = 2
ABILITY_CANNOT_BE_UPGRADED_REQUIRES_LEVEL = 3
ABILITY_NOT_LEARNABLE = 4

--- Enum ActivateType
ACTIVATE_TYPE_INITIAL_CREATION = 0
ACTIVATE_TYPE_DATAUPDATE_CREATION = 1
ACTIVATE_TYPE_ONRESTORE = 2

--- Enum attackfail
DOTA_ATTACK_RECORD_FAIL_NO = 0
DOTA_ATTACK_RECORD_FAIL_TERRAIN_MISS = 1
DOTA_ATTACK_RECORD_FAIL_SOURCE_MISS = 2
DOTA_ATTACK_RECORD_FAIL_TARGET_EVADED = 3
DOTA_ATTACK_RECORD_FAIL_TARGET_INVULNERABLE = 4
DOTA_ATTACK_RECORD_FAIL_TARGET_OUT_OF_RANGE = 5
DOTA_ATTACK_RECORD_CANNOT_FAIL = 6
DOTA_ATTACK_RECORD_FAIL_BLOCKED_BY_OBSTRUCTION = 7

--- Enum AttributeDerivedStats
DOTA_ATTRIBUTE_STRENGTH_DAMAGE = 0
DOTA_ATTRIBUTE_STRENGTH_HP = 1
DOTA_ATTRIBUTE_STRENGTH_HP_REGEN = 2
DOTA_ATTRIBUTE_AGILITY_DAMAGE = 3
DOTA_ATTRIBUTE_AGILITY_ARMOR = 4
DOTA_ATTRIBUTE_AGILITY_ATTACK_SPEED = 5
DOTA_ATTRIBUTE_INTELLIGENCE_DAMAGE = 6
DOTA_ATTRIBUTE_INTELLIGENCE_MANA = 7
DOTA_ATTRIBUTE_INTELLIGENCE_MANA_REGEN = 8
DOTA_ATTRIBUTE_INTELLIGENCE_MAGIC_RESIST = 9
DOTA_ATTRIBUTE_ALL_DAMAGE = 10

--- Enum Attributes
DOTA_ATTRIBUTE_INVALID = -1
DOTA_ATTRIBUTE_STRENGTH = 0
DOTA_ATTRIBUTE_AGILITY = 1
DOTA_ATTRIBUTE_INTELLECT = 2
DOTA_ATTRIBUTE_ALL = 3
DOTA_ATTRIBUTE_MAX = 4

--- Enum CLICK_BEHAVIORS
DOTA_CLICK_BEHAVIOR_NONE = 0
DOTA_CLICK_BEHAVIOR_MOVE = 1
DOTA_CLICK_BEHAVIOR_ATTACK = 2
DOTA_CLICK_BEHAVIOR_CAST = 3
DOTA_CLICK_BEHAVIOR_DROP_ITEM = 4
DOTA_CLICK_BEHAVIOR_DROP_SHOP_ITEM = 5
DOTA_CLICK_BEHAVIOR_DRAG = 6
DOTA_CLICK_BEHAVIOR_LEARN_ABILITY = 7
DOTA_CLICK_BEHAVIOR_PATROL = 8
DOTA_CLICK_BEHAVIOR_VECTOR_CAST = 9
DOTA_CLICK_BEHAVIOR_UNUSED = 10
DOTA_CLICK_BEHAVIOR_RADAR = 11
DOTA_CLICK_BEHAVIOR_LAST = 12

--- Enum ConVarFlags
FCVAR_NONE = 0
FCVAR_DEVELOPMENTONLY = 2
FCVAR_HIDDEN = 16
FCVAR_PROTECTED = 32
FCVAR_SPONLY = 64
FCVAR_ARCHIVE = 128
FCVAR_NOTIFY = 256
FCVAR_USERINFO = 512
FCVAR_UNLOGGED = 2048
FCVAR_REPLICATED = 8192
FCVAR_CHEAT = 16384
FCVAR_PER_USER = 32768
FCVAR_DEMO = 65536
FCVAR_DONTRECORD = 131072
FCVAR_VCONSOLE_SET_FOCUS = 134217728

--- Enum DAMAGE_TYPES
DAMAGE_TYPE_NONE = 0
DAMAGE_TYPE_PHYSICAL = 1
DAMAGE_TYPE_MAGICAL = 2
DAMAGE_TYPE_PURE = 4
DAMAGE_TYPE_ALL = 7
DAMAGE_TYPE_HP_REMOVAL = 8
DAMAGE_TYPE_ABILITY_DEFINED = 16

--- Enum DamageCategory_t
DOTA_DAMAGE_CATEGORY_SPELL = 0
DOTA_DAMAGE_CATEGORY_ATTACK = 1
DOTA_DAMAGE_CATEGORY_BARRIER = 2

--- Enum DOTA_ABILITY_BEHAVIOR
DOTA_ABILITY_BEHAVIOR_NONE = 0
DOTA_ABILITY_BEHAVIOR_HIDDEN = 1
DOTA_ABILITY_BEHAVIOR_PASSIVE = 2
DOTA_ABILITY_BEHAVIOR_NO_TARGET = 4
DOTA_ABILITY_BEHAVIOR_UNIT_TARGET = 8
DOTA_ABILITY_BEHAVIOR_POINT = 16
DOTA_ABILITY_BEHAVIOR_AOE = 32
DOTA_ABILITY_BEHAVIOR_NOT_LEARNABLE = 64
DOTA_ABILITY_BEHAVIOR_CHANNELLED = 128
DOTA_ABILITY_BEHAVIOR_ITEM = 256
DOTA_ABILITY_BEHAVIOR_TOGGLE = 512
DOTA_ABILITY_BEHAVIOR_DIRECTIONAL = 1024
DOTA_ABILITY_BEHAVIOR_IMMEDIATE = 2048
DOTA_ABILITY_BEHAVIOR_AUTOCAST = 4096
DOTA_ABILITY_BEHAVIOR_OPTIONAL_UNIT_TARGET = 8192
DOTA_ABILITY_BEHAVIOR_OPTIONAL_POINT = 16384
DOTA_ABILITY_BEHAVIOR_OPTIONAL_NO_TARGET = 32768
DOTA_ABILITY_BEHAVIOR_AURA = 65536
DOTA_ABILITY_BEHAVIOR_ATTACK = 131072
DOTA_ABILITY_BEHAVIOR_DONT_RESUME_MOVEMENT = 262144
DOTA_ABILITY_BEHAVIOR_ROOT_DISABLES = 524288
DOTA_ABILITY_BEHAVIOR_UNRESTRICTED = 1048576
DOTA_ABILITY_BEHAVIOR_IGNORE_PSEUDO_QUEUE = 2097152
DOTA_ABILITY_BEHAVIOR_IGNORE_CHANNEL = 4194304
DOTA_ABILITY_BEHAVIOR_DONT_CANCEL_MOVEMENT = 8388608
DOTA_ABILITY_BEHAVIOR_DONT_ALERT_TARGET = 16777216
DOTA_ABILITY_BEHAVIOR_DONT_RESUME_ATTACK = 33554432
DOTA_ABILITY_BEHAVIOR_NORMAL_WHEN_STOLEN = 67108864
DOTA_ABILITY_BEHAVIOR_IGNORE_BACKSWING = 134217728
DOTA_ABILITY_BEHAVIOR_RUNE_TARGET = 268435456
DOTA_ABILITY_BEHAVIOR_DONT_CANCEL_CHANNEL = 536870912
DOTA_ABILITY_BEHAVIOR_VECTOR_TARGETING = 1073741824
DOTA_ABILITY_BEHAVIOR_LAST_RESORT_POINT = 2147483648
DOTA_ABILITY_BEHAVIOR_CAN_SELF_CAST = 4294967296
DOTA_ABILITY_BEHAVIOR_SHOW_IN_GUIDES = 8589934592
DOTA_ABILITY_BEHAVIOR_UNLOCKED_BY_EFFECT_INDEX = 17179869184
DOTA_ABILITY_BEHAVIOR_SUPPRESS_ASSOCIATED_CONSUMABLE = 34359738368
DOTA_ABILITY_BEHAVIOR_FREE_DRAW_TARGETING = 68719476736
DOTA_ABILITY_BEHAVIOR_IGNORE_SILENCE = 137438953472
DOTA_ABILITY_BEHAVIOR_OVERSHOOT = 274877906944
DOTA_ABILITY_BEHAVIOR_IGNORE_MUTED = 549755813888
DOTA_ABILITY_BEHAVIOR_ALT_CASTABLE = 1099511627776
DOTA_ABILITY_BEHAVIOR_SKIP_FOR_KEYBINDS = 4398046511104
DOTA_ABILITY_BEHAVIOR_INNATE_UI = 8796093022208
DOTA_ABILITY_BEHAVIOR_UNSWAPPABLE = 17592186044416
DOTA_ABILITY_BEHAVIOR_DONT_PROC_OTHER_ABILITIES = 35184372088832
DOTA_ABILITY_BEHAVIOR_IGNORE_INVISIBLE = 70368744177664
DOTA_ABILITY_BEHAVIOR_AFFECTED_BY_MUTE = 140737488355328
DOTA_ABILITY_BEHAVIOR_IS_FAKE_ITEM = 281474976710656
DOTA_ABILITY_BEHAVIOR_FORCE_NO_INNATE_UI = 562949953421312
DOTA_ABILITY_BEHAVIOR_FORCE_KEYBIND = 1125899906842624
DOTA_ABILITY_BEHAVIOR_ITEM_IMBUE = 2251799813685248

--- Enum DOTA_GameState
DOTA_GAMERULES_STATE_INIT = 0
DOTA_GAMERULES_STATE_WAIT_FOR_PLAYERS_TO_LOAD = 1
DOTA_GAMERULES_STATE_CUSTOM_GAME_SETUP = 2
DOTA_GAMERULES_STATE_PLAYER_DRAFT = 3
DOTA_GAMERULES_STATE_HERO_SELECTION = 4
DOTA_GAMERULES_STATE_STRATEGY_TIME = 5
DOTA_GAMERULES_STATE_TEAM_SHOWCASE = 6
DOTA_GAMERULES_STATE_WAIT_FOR_MAP_TO_LOAD = 7
DOTA_GAMERULES_STATE_PRE_GAME = 8
DOTA_GAMERULES_STATE_SCENARIO_SETUP = 9
DOTA_GAMERULES_STATE_GAME_IN_PROGRESS = 10
DOTA_GAMERULES_STATE_POST_GAME = 11
DOTA_GAMERULES_STATE_DISCONNECT = 12

--- Enum DOTA_GC_TEAM
DOTA_GC_TEAM_GOOD_GUYS = 0
DOTA_GC_TEAM_BAD_GUYS = 1
DOTA_GC_TEAM_BROADCASTER = 2
DOTA_GC_TEAM_SPECTATOR = 3
DOTA_GC_TEAM_PLAYER_POOL = 4
DOTA_GC_TEAM_NOTEAM = 5
DOTA_GC_TEAM_CUSTOM_1 = 6
DOTA_GC_TEAM_CUSTOM_2 = 7
DOTA_GC_TEAM_CUSTOM_3 = 8
DOTA_GC_TEAM_CUSTOM_4 = 9
DOTA_GC_TEAM_CUSTOM_5 = 10
DOTA_GC_TEAM_CUSTOM_6 = 11
DOTA_GC_TEAM_CUSTOM_7 = 12
DOTA_GC_TEAM_CUSTOM_8 = 13
DOTA_GC_TEAM_NEUTRALS = 14

--- Enum DOTA_HeroPickState
DOTA_HEROPICK_STATE_NONE = 0
DOTA_HEROPICK_STATE_AP_SELECT = 1
DOTA_HEROPICK_STATE_SD_SELECT = 2
DOTA_HEROPICK_STATE_INTRO_SELECT_UNUSED = 3
DOTA_HEROPICK_STATE_RD_SELECT_UNUSED = 4
DOTA_HEROPICK_STATE_CM_INTRO = 5
DOTA_HEROPICK_STATE_CM_CAPTAINPICK = 6
DOTA_HEROPICK_STATE_CM_BAN1 = 7
DOTA_HEROPICK_STATE_CM_BAN2 = 8
DOTA_HEROPICK_STATE_CM_BAN3 = 9
DOTA_HEROPICK_STATE_CM_BAN4 = 10
DOTA_HEROPICK_STATE_CM_BAN5 = 11
DOTA_HEROPICK_STATE_CM_BAN6 = 12
DOTA_HEROPICK_STATE_CM_BAN7 = 13
DOTA_HEROPICK_STATE_CM_BAN8 = 14
DOTA_HEROPICK_STATE_CM_BAN9 = 15
DOTA_HEROPICK_STATE_CM_BAN10 = 16
DOTA_HEROPICK_STATE_CM_BAN11 = 17
DOTA_HEROPICK_STATE_CM_BAN12 = 18
DOTA_HEROPICK_STATE_CM_BAN13 = 19
DOTA_HEROPICK_STATE_CM_BAN14 = 20
DOTA_HEROPICK_STATE_CM_SELECT1 = 21
DOTA_HEROPICK_STATE_CM_SELECT2 = 22
DOTA_HEROPICK_STATE_CM_SELECT3 = 23
DOTA_HEROPICK_STATE_CM_SELECT4 = 24
DOTA_HEROPICK_STATE_CM_SELECT5 = 25
DOTA_HEROPICK_STATE_CM_SELECT6 = 26
DOTA_HEROPICK_STATE_CM_SELECT7 = 27
DOTA_HEROPICK_STATE_CM_SELECT8 = 28
DOTA_HEROPICK_STATE_CM_SELECT9 = 29
DOTA_HEROPICK_STATE_CM_SELECT10 = 30
DOTA_HEROPICK_STATE_CM_PICK = 31
DOTA_HEROPICK_STATE_AR_SELECT = 32
DOTA_HEROPICK_STATE_MO_SELECT = 33
DOTA_HEROPICK_STATE_FH_SELECT = 34
DOTA_HEROPICK_STATE_CD_INTRO = 35
DOTA_HEROPICK_STATE_CD_CAPTAINPICK = 36
DOTA_HEROPICK_STATE_CD_BAN1 = 37
DOTA_HEROPICK_STATE_CD_BAN2 = 38
DOTA_HEROPICK_STATE_CD_BAN3 = 39
DOTA_HEROPICK_STATE_CD_BAN4 = 40
DOTA_HEROPICK_STATE_CD_BAN5 = 41
DOTA_HEROPICK_STATE_CD_BAN6 = 42
DOTA_HEROPICK_STATE_CD_SELECT1 = 43
DOTA_HEROPICK_STATE_CD_SELECT2 = 44
DOTA_HEROPICK_STATE_CD_SELECT3 = 45
DOTA_HEROPICK_STATE_CD_SELECT4 = 46
DOTA_HEROPICK_STATE_CD_SELECT5 = 47
DOTA_HEROPICK_STATE_CD_SELECT6 = 48
DOTA_HEROPICK_STATE_CD_SELECT7 = 49
DOTA_HEROPICK_STATE_CD_SELECT8 = 50
DOTA_HEROPICK_STATE_CD_SELECT9 = 51
DOTA_HEROPICK_STATE_CD_SELECT10 = 52
DOTA_HEROPICK_STATE_CD_PICK = 53
DOTA_HEROPICK_STATE_BD_SELECT = 54
DOTA_HERO_PICK_STATE_ABILITY_DRAFT_SELECT = 55
DOTA_HERO_PICK_STATE_ARDM_SELECT = 56
DOTA_HEROPICK_STATE_ALL_DRAFT_SELECT = 57
DOTA_HERO_PICK_STATE_CUSTOMGAME_SELECT = 58
DOTA_HEROPICK_STATE_SELECT_PENALTY = 59
DOTA_HEROPICK_STATE_CUSTOM_PICK_RULES = 60
DOTA_HEROPICK_STATE_SCENARIO_PICK = 61
DOTA_HEROPICK_STATE_COUNT = 62

--- Enum DOTA_INVALID_ORDERS
DOTA_ORDER_SUCCESS = -1
DOTA_INVALID_ORDER_NOT_CONTROLLABLE_BY_PLAYER = 0
DOTA_INVALID_ORDER_UNIT_IS_NOT_NPC = 1
DOTA_INVALID_ORDER_BAD_ABILITY_ENTITY = 2
DOTA_INVALID_ORDER_UNRECOGNIZED_ORDER = 3
DOTA_INVALID_ORDER_ABILITY_REQUIRED = 4
DOTA_INVALID_ORDER_NPC_TARGET_REQUIRED = 5
DOTA_INVALID_ORDER_TARGET_TREE_INDEX_NOT_A_TREE = 6
DOTA_INVALID_ORDER_TARGET_ENTITY_INDEX_OUT_OF_RANGE = 7
DOTA_INVALID_ORDER_ABILITY_NOT_AN_ITEM = 8
DOTA_INVALID_ORDER_PHYSICAL_ITEM_TARGET_REQUIRED = 9
DOTA_INVALID_ORDER_RUNE_TARGET_REQUIRED = 10
DOTA_INVALID_ORDER_ABILITY_NOT_OWNED_BY_UNIT = 11
DOTA_INVALID_ORDER_ABILITY_CANT_BE_UPGRADED = 12
DOTA_INVALID_ORDER_NO_POINTS_FOR_ABILITY_UPGRADE = 13
DOTA_INVALID_ORDER_NOT_ENOUGH_MANA = 14
DOTA_INVALID_ORDER_ABILITY_IN_COOLDOWN = 15
DOTA_INVALID_ORDER_ABILITY_NOT_LEARNED = 16
DOTA_INVALID_ORDER_CANT_CAST_PASSIVE_ABILITY = 17
DOTA_INVALID_ORDER_PHANTOM_TARGET = 18
DOTA_INVALID_ORDER_DEAD_TARGET = 19
DOTA_INVALID_ORDER_UNIT_IS_DEAD = 20
DOTA_INVALID_ORDER_TARGET_MAGIC_IMMUNE_ENEMY = 21
DOTA_INVALID_ORDER_TARGET_INVULNERABLE = 22
DOTA_INVALID_ORDER_TARGET_ATTACK_IMMUNE = 23
DOTA_INVALID_ORDER_UNIT_SILENCED = 24
DOTA_INVALID_ORDER_ABILITY_CANT_BE_TOGGLED = 25
DOTA_INVALID_ORDER_TARGET_CANT_BE_SEEN = 26
DOTA_INVALID_ORDER_TARGET_INVISIBLE = 27
DOTA_INVALID_ORDER_HERO_CANT_BE_DENIED = 28
DOTA_INVALID_ORDER_CANT_CAST_ON_TEAMMATE = 29
DOTA_INVALID_ORDER_CANT_CAST_ON_ENEMY = 30
DOTA_INVALID_ORDER_UNIT_CANT_MOVE = 31
DOTA_INVALID_ORDER_CANT_CAST_ON_ATTACK_IMMUNE = 32
DOTA_INVALID_ORDER_PURCHASE_INVALID_ITEM = 33
DOTA_INVALID_ORDER_ITEM_NOT_IN_INVENTORY = 34
DOTA_INVALID_ORDER_ITEM_NOT_IN_UNIT_INVENTORY = 35
DOTA_INVALID_ORDER_TARGET_UNSELECTABLE = 36
DOTA_INVALID_ORDER_ITEM_NOT_IN_ACTIVE_INVENTORY = 37
DOTA_INVALID_ORDER_UNIT_CANT_PICK_UP_RUNES = 38
DOTA_INVALID_ORDER_UNIT_CANT_MANIPULATE_ITEMS = 39
DOTA_INVALID_ORDER_UNIT_IS_ILLUSION = 40
DOTA_INVALID_ORDER_UNIT_CANT_ATTACK = 41
DOTA_INVALID_ORDER_ITEM_CANT_BE_DROPPED = 42
DOTA_INVALID_ORDER_TARGET_TREE_NOT_ACTIVE = 43
DOTA_INVALID_ORDER_ABILITY_CANT_AUTO_CAST = 44
DOTA_INVALID_ORDER_TARGET_POSITION_OFF_MAP = 45
DOTA_INVALID_ORDER_UNIT_CANT_MOVE_TARGET_OUT_OF_RANGE = 46
DOTA_INVALID_ORDER_CANT_CAST_ON_HERO = 47
DOTA_INVALID_ORDER_CANT_CAST_ON_OTHER = 48
DOTA_INVALID_ORDER_CANT_CAST_ON_BUILDING = 49
DOTA_INVALID_ORDER_CANT_CAST_ON_ANCIENT = 50
DOTA_INVALID_ORDER_ITEM_CANT_BE_MOVED_TO_STASH = 51
DOTA_INVALID_ORDER_ITEM_CANT_BE_MOVED_TO_SLOT = 52
DOTA_INVALID_ORDER_CANT_CAST_ON_MECHANICAL = 53
DOTA_INVALID_ORDER_CANT_ACCEPT_ATTACK_TARGET = 54
DOTA_INVALID_ORDER_CANT_CAST_NO_CHARGES = 55
DOTA_INVALID_ORDER_CANT_CAST_ON_CREEP = 56
DOTA_INVALID_ORDER_TARGET_CANT_TAKE_ITEMS = 57
DOTA_INVALID_ORDER_CANT_GIVE_ITEM_TO_ENEMY = 58
DOTA_INVALID_ORDER_CANT_CAST_ON_COURIER = 59
DOTA_INVALID_ORDER_ABILITY_IS_HIDDEN = 60
DOTA_INVALID_ORDER_ITEM_IN_COOLDOWN = 61
DOTA_INVALID_ORDER_SECRET_SHOP_NOT_IN_RANGE = 62
DOTA_INVALID_ORDER_NOT_ENOUGH_GOLD = 63
DOTA_INVALID_ORDER_PURCHASE_AUTOCOMBINE_RECIPE = 64
DOTA_INVALID_ORDER_CANT_DENY_HEALTH_TOO_HIGH = 65
DOTA_INVALID_ORDER_SIDE_SHOP_NOT_IN_RANGE = 66
DOTA_INVALID_ORDER_HOME_SHOP_NOT_IN_RANGE = 67
DOTA_INVALID_ORDER_CANT_PICK_UP_ITEM = 68
DOTA_INVALID_ORDER_CANT_SELL_NO_SHOP_IN_RANGE = 69
DOTA_INVALID_ORDER_CANT_SELL_ITEM = 70
DOTA_INVALID_ORDER_CANT_SELL_ITEM_WHILE_DEAD = 71
DOTA_INVALID_ORDER_TARGET_CANT_BE_DENIED = 72
DOTA_INVALID_ORDER_ABILITY_DISABLED_BY_ROOT = 73
DOTA_INVALID_ORDER_UNIT_COMMAND_RESTRICTED = 74
DOTA_INVALID_ORDER_UNIT_MUTED = 75
DOTA_INVALID_ORDER_CANT_CAST_ON_SUMMONED = 76
DOTA_INVALID_ORDER_TARGET_MAGIC_IMMUNE_ALLY = 77
DOTA_INVALID_ORDER_CANT_PURCHASE_DISALLOWED_ITEM = 78
DOTA_INVALID_ORDER_CANT_CAST_ON_DOMINATED = 79
DOTA_INVALID_ORDER_CAST_CUSTOM = 80
DOTA_INVALID_ORDER_ITEM_NOT_DISASSEMBLABLE = 81
DOTA_INVALID_ORDER_ITEM_OUT_OF_STOCK = 82
DOTA_INVALID_ORDER_ABILITY_CANT_BE_UPGRADED_AT_MAX = 83
DOTA_INVALID_ORDER_ABILITY_INACTIVE = 84
DOTA_INVALID_ORDER_ITEM_NOT_IN_MAIN_INVENTORY = 85
DOTA_INVALID_ORDER_CANT_GLYPH = 86
DOTA_INVALID_ORDER_CANT_DRAG_CHANNELING_ITEM = 87
DOTA_INVALID_ORDER_CANT_BUYBACK_UNIT_NOT_A_HERO = 88
DOTA_INVALID_ORDER_CANT_BUYBACK_UNIT_NOT_DEAD = 89
DOTA_INVALID_ORDER_CANT_BUYBACK_NOT_ENOUGH_GOLD = 90
DOTA_INVALID_ORDER_CANT_BUYBACK_IN_COOLDOWN = 91
DOTA_INVALID_ORDER_CANT_DISASSEMBLE_STASH_OUT_OF_RANGE = 92
DOTA_INVALID_ORDER_CANT_EJECT_ITEM_NOT_IN_STASH = 93
DOTA_INVALID_ORDER_GAME_IS_PAUSED = 94
DOTA_INVALID_ORDER_CANT_CAST_ON_CONSIDERED_HERO = 95
DOTA_INVALID_ORDER_CANT_SHOP_AUTO_BUY_ENABLED = 96
DOTA_INVALID_ORDER_ONLY_DELIBERATE_CHANNELING_CANCEL = 97
DOTA_INVALID_ORDER_CANT_BUYBACK_DEVILS_BARGAIN = 98
DOTA_INVALID_ORDER_CANT_BUYBACK_DISABLED_BY_GAME_MODE = 99
DOTA_INVALID_ORDER_CANT_ABILITY_PING_BAD_TEAM = 100
DOTA_INVALID_ORDER_ABILITY_NOT_POSITIONED = 101
DOTA_INVALID_ORDER_ABILITY_NOT_TARGETTED = 102
DOTA_INVALID_ORDER_ABILITY_REQUIRES_TARGET = 103
DOTA_INVALID_ORDER_CANT_RADAR = 104
DOTA_INVALID_ORDER_NO_COURIER = 105
DOTA_INVALID_ORDER_CUSTOM_SHOP_NOT_IN_RANGE = 106
DOTA_INVALID_ORDER_CANT_CAST_RIVER_PAINT = 107
DOTA_INVALID_ORDER_UNIT_OBSTRUCTED = 108
DOTA_INVALID_ORDER_CANT_CAST_DRAG_REQUIRED = 109
DOTA_INVALID_ORDER_ABILITY_DISABLED_BY_TETHER = 110
DOTA_INVALID_ORDER_ABILITY_NOT_UNLOCKED = 111
DOTA_INVALID_ORDER_CANT_FOUNTAIN_DROP_UNIT_NOT_DEAD = 112
DOTA_INVALID_ORDER_ITEM_NOT_IN_NEUTRAL_ITEM_STASH = 113
DOTA_INVALID_ORDER_ITEM_ALREADY_PURCHASED = 114
DOTA_INVALID_ORDER_BEYOND_PHYSICAL_ITEM_LIMIT = 115
DOTA_INVALID_ORDER_ABILITY_PING_DEAD_ALLY = 116
DOTA_INVALID_ORDER_CANT_LOCKCOMBINE_NEUTRAL_ITEMS = 117
DOTA_INVALID_ORDER_ABILITY_CANT_ALT_CAST = 118
DOTA_INVALID_ORDER_ITEM_CANNOT_BE_CONSUMED = 119
DOTA_INVALID_ORDER_CANT_BUYBACK_CEASELESS_DIRGE = 120
DOTA_INVALID_ORDER_CANT_ATTACK_BUILDINGS = 121
DOTA_INVALID_ORDER_PURCHASE_LEVEL = 122
DOTA_INVALID_ORDER_COUNT = 123

--- Enum DOTA_MOTION_CONTROLLER_PRIORITY
DOTA_MOTION_CONTROLLER_PRIORITY_LOWEST = 0
DOTA_MOTION_CONTROLLER_PRIORITY_LOW = 1
DOTA_MOTION_CONTROLLER_PRIORITY_MEDIUM = 2
DOTA_MOTION_CONTROLLER_PRIORITY_HIGH = 3
DOTA_MOTION_CONTROLLER_PRIORITY_HIGHEST = 4
DOTA_MOTION_CONTROLLER_PRIORITY_ULTRA = 5

--- Enum DOTA_OVERHEAD_ALERT
OVERHEAD_ALERT_GOLD = 0
OVERHEAD_ALERT_DENY = 1
OVERHEAD_ALERT_CRITICAL = 2
OVERHEAD_ALERT_XP = 3
OVERHEAD_ALERT_BONUS_SPELL_DAMAGE = 4
OVERHEAD_ALERT_MISS = 5
OVERHEAD_ALERT_DAMAGE = 6
OVERHEAD_ALERT_EVADE = 7
OVERHEAD_ALERT_BLOCK = 8
OVERHEAD_ALERT_BONUS_POISON_DAMAGE = 9
OVERHEAD_ALERT_HEAL = 10
OVERHEAD_ALERT_MANA_ADD = 11
OVERHEAD_ALERT_MANA_LOSS = 12
OVERHEAD_ALERT_MAGICAL_BLOCK = 16
OVERHEAD_ALERT_INCOMING_DAMAGE = 17
OVERHEAD_ALERT_OUTGOING_DAMAGE = 18
OVERHEAD_ALERT_DISABLE_RESIST = 19
OVERHEAD_ALERT_DEATH = 20
OVERHEAD_ALERT_BLOCKED = 21
OVERHEAD_ALERT_ITEM_RECEIVED = 22
OVERHEAD_ALERT_SHARD = 23
OVERHEAD_ALERT_DEADLY_BLOW = 24
OVERHEAD_ALERT_FORCE_MISS = 25
OVERHEAD_ALERT_AEGIS = 26
OVERHEAD_ALERT_DISPEL = 27
OVERHEAD_ALERT_BONUS_PURE_DAMAGE = 28

--- Enum DOTA_RUNES
DOTA_RUNE_INVALID = -1
DOTA_RUNE_DOUBLEDAMAGE = 0
DOTA_RUNE_HASTE = 1
DOTA_RUNE_ILLUSION = 2
DOTA_RUNE_INVISIBILITY = 3
DOTA_RUNE_REGENERATION = 4
DOTA_RUNE_BOUNTY = 5
DOTA_RUNE_ARCANE = 6
DOTA_RUNE_WATER = 7
DOTA_RUNE_XP = 8
DOTA_RUNE_SHIELD = 9
DOTA_RUNE_COUNT = 10

--- Enum DOTA_SHOP_TYPE
DOTA_SHOP_HOME = 0
DOTA_SHOP_SIDE = 1
DOTA_SHOP_SECRET = 2
DOTA_SHOP_GROUND = 3
DOTA_SHOP_SIDE2 = 4
DOTA_SHOP_SECRET2 = 5
DOTA_SHOP_CUSTOM = 6
DOTA_SHOP_NEUTRALS = 7
DOTA_SHOP_NONE = 8

--- Enum DOTA_UNIT_TARGET_FLAGS
DOTA_UNIT_TARGET_FLAG_NONE = 0
DOTA_UNIT_TARGET_FLAG_RANGED_ONLY = 2
DOTA_UNIT_TARGET_FLAG_MELEE_ONLY = 4
DOTA_UNIT_TARGET_FLAG_DEAD = 8
DOTA_UNIT_TARGET_FLAG_MAGIC_IMMUNE_ENEMIES = 16
DOTA_UNIT_TARGET_FLAG_NOT_MAGIC_IMMUNE_ALLIES = 32
DOTA_UNIT_TARGET_FLAG_INVULNERABLE = 64
DOTA_UNIT_TARGET_FLAG_FOW_VISIBLE = 128
DOTA_UNIT_TARGET_FLAG_NO_INVIS = 256
DOTA_UNIT_TARGET_FLAG_CAN_BE_SEEN = 384
DOTA_UNIT_TARGET_FLAG_NOT_ANCIENTS = 512
DOTA_UNIT_TARGET_FLAG_PLAYER_CONTROLLED = 1024
DOTA_UNIT_TARGET_FLAG_NOT_DOMINATED = 2048
DOTA_UNIT_TARGET_FLAG_NOT_SUMMONED = 4096
DOTA_UNIT_TARGET_FLAG_NOT_ILLUSIONS = 8192
DOTA_UNIT_TARGET_FLAG_NOT_ATTACK_IMMUNE = 16384
DOTA_UNIT_TARGET_FLAG_MANA_ONLY = 32768
DOTA_UNIT_TARGET_FLAG_CHECK_DISABLE_HELP = 65536
DOTA_UNIT_TARGET_FLAG_NOT_CREEP_HERO = 131072
DOTA_UNIT_TARGET_FLAG_OUT_OF_WORLD = 262144
DOTA_UNIT_TARGET_FLAG_NOT_NIGHTMARED = 524288
DOTA_UNIT_TARGET_FLAG_PREFER_ENEMIES = 1048576
DOTA_UNIT_TARGET_FLAG_RESPECT_OBSTRUCTIONS = 2097152

--- Enum DOTA_UNIT_TARGET_TEAM
DOTA_UNIT_TARGET_TEAM_NONE = 0
DOTA_UNIT_TARGET_TEAM_FRIENDLY = 1
DOTA_UNIT_TARGET_TEAM_ENEMY = 2
DOTA_UNIT_TARGET_TEAM_BOTH = 3
DOTA_UNIT_TARGET_TEAM_CUSTOM = 4

--- Enum DOTA_UNIT_TARGET_TYPE
DOTA_UNIT_TARGET_NONE = 0
DOTA_UNIT_TARGET_HERO = 1
DOTA_UNIT_TARGET_CREEP = 2
DOTA_UNIT_TARGET_BUILDING = 4
DOTA_UNIT_TARGET_COURIER = 16
DOTA_UNIT_TARGET_BASIC = 18
DOTA_UNIT_TARGET_HEROES_AND_CREEPS = 19
DOTA_UNIT_TARGET_OTHER = 32
DOTA_UNIT_TARGET_ALL = 55
DOTA_UNIT_TARGET_TREE = 64
DOTA_UNIT_TARGET_CUSTOM = 128
DOTA_UNIT_TARGET_SELF = 256

--- Enum DOTAAbilitySpeakTrigger_t
DOTA_ABILITY_SPEAK_START_ACTION_PHASE = 0
DOTA_ABILITY_SPEAK_CAST = 1

--- Enum DOTAConnectionState_t
DOTA_CONNECTION_STATE_UNKNOWN = 0
DOTA_CONNECTION_STATE_NOT_YET_CONNECTED = 1
DOTA_CONNECTION_STATE_CONNECTED = 2
DOTA_CONNECTION_STATE_DISCONNECTED = 3
DOTA_CONNECTION_STATE_ABANDONED = 4
DOTA_CONNECTION_STATE_LOADING = 5
DOTA_CONNECTION_STATE_FAILED = 6

--- Enum DOTACustomCameraEventFlags_t
k_ECustomCameraEventFlags_Zoom = 1
k_ECustomCameraEventFlags_Position = 2
k_ECustomCameraEventFlags_PositionPlayerHero = 4
k_ECustomCameraEventFlags_Pitch = 8
k_ECustomCameraEventFlags_Yaw = 16
k_ECustomCameraEventFlags_Lock = 32
k_ECustomCameraEventFlags_Unlock = 64
k_ECustomCameraEventFlags_ResetDefault = 128
k_ECustomCameraEventFlags_SpecificPlayer = 256
k_ECustomCameraEventFlags_FadeOut = 512
k_ECustomCameraEventFlags_FadeIn = 1024
k_ECustomCameraEventFlags_LetterboxOn = 2048
k_ECustomCameraEventFlags_LetterboxOff = 4096

--- Enum DOTADamageFlag_t
DOTA_DAMAGE_FLAG_NONE = 0
DOTA_DAMAGE_FLAG_IGNORES_MAGIC_ARMOR = 1
DOTA_DAMAGE_FLAG_IGNORES_PHYSICAL_ARMOR = 2
DOTA_DAMAGE_FLAG_BYPASSES_INVULNERABILITY = 4
DOTA_DAMAGE_FLAG_BYPASSES_PHYSICAL_BLOCK = 8
DOTA_DAMAGE_FLAG_REFLECTION = 16
DOTA_DAMAGE_FLAG_HPLOSS = 32
DOTA_DAMAGE_FLAG_NO_DIRECTOR_EVENT = 64
DOTA_DAMAGE_FLAG_NON_LETHAL = 128
DOTA_DAMAGE_FLAG_NO_DAMAGE_MULTIPLIERS = 512
DOTA_DAMAGE_FLAG_NO_SPELL_AMPLIFICATION = 1024
DOTA_DAMAGE_FLAG_DONT_DISPLAY_DAMAGE_IF_SOURCE_HIDDEN = 2048
DOTA_DAMAGE_FLAG_NO_SPELL_LIFESTEAL = 4096
DOTA_DAMAGE_FLAG_PROPERTY_FIRE = 8192
DOTA_DAMAGE_FLAG_IGNORES_BASE_PHYSICAL_ARMOR = 16384
DOTA_DAMAGE_FLAG_SECONDARY_PROJECTILE_ATTACK = 32768
DOTA_DAMAGE_FLAG_FORCE_SPELL_AMPLIFICATION = 65536
DOTA_DAMAGE_FLAG_MAGIC_AUTO_ATTACK = 131072
DOTA_DAMAGE_FLAG_ATTACK_MODIFIER = 262144
DOTA_DAMAGE_FLAG_BYPASSES_ALL_BLOCK = 524288
DOTA_DAMAGE_FLAG_NO_REFLECTION = 1048576

--- Enum DotaDefaultUIElement_t
DOTA_DEFAULT_UI_INVALID = -1
DOTA_DEFAULT_UI_TOP_TIMEOFDAY = 0
DOTA_DEFAULT_UI_TOP_HEROES = 1
DOTA_DEFAULT_UI_FLYOUT_SCOREBOARD = 2
DOTA_DEFAULT_UI_ACTION_PANEL = 3
DOTA_DEFAULT_UI_ACTION_MINIMAP = 4
DOTA_DEFAULT_UI_INVENTORY_PANEL = 5
DOTA_DEFAULT_UI_INVENTORY_SHOP = 6
DOTA_DEFAULT_UI_INVENTORY_ITEMS = 7
DOTA_DEFAULT_UI_INVENTORY_QUICKBUY = 8
DOTA_DEFAULT_UI_INVENTORY_COURIER = 9
DOTA_DEFAULT_UI_INVENTORY_PROTECT = 10
DOTA_DEFAULT_UI_INVENTORY_GOLD = 11
DOTA_DEFAULT_UI_SHOP_SUGGESTEDITEMS = 12
DOTA_DEFAULT_UI_SHOP_COMMONITEMS = 13
DOTA_DEFAULT_UI_HERO_SELECTION_TEAMS = 14
DOTA_DEFAULT_UI_HERO_SELECTION_GAME_NAME = 15
DOTA_DEFAULT_UI_HERO_SELECTION_CLOCK = 16
DOTA_DEFAULT_UI_HERO_SELECTION_HEADER = 17
DOTA_DEFAULT_UI_TOP_MENU_BUTTONS = 18
DOTA_DEFAULT_UI_TOP_BAR_BACKGROUND = 19
DOTA_DEFAULT_UI_TOP_BAR_RADIANT_TEAM = 20
DOTA_DEFAULT_UI_TOP_BAR_DIRE_TEAM = 21
DOTA_DEFAULT_UI_TOP_BAR_SCORE = 22
DOTA_DEFAULT_UI_ENDGAME = 23
DOTA_DEFAULT_UI_ENDGAME_CHAT = 24
DOTA_DEFAULT_UI_QUICK_STATS = 25
DOTA_DEFAULT_UI_PREGAME_STRATEGYUI = 26
DOTA_DEFAULT_UI_KILLCAM = 27
DOTA_DEFAULT_UI_FIGHT_RECAP = 28
DOTA_DEFAULT_UI_TOP_BAR = 29
DOTA_DEFAULT_UI_CUSTOMUI_BEHIND_HUD_ELEMENTS = 30
DOTA_DEFAULT_UI_AGHANIMS_STATUS = 31
DOTA_DEFAULT_UI_ELEMENT_COUNT = 32

--- Enum DOTAHUDVisibility_t
DOTA_HUD_VISIBILITY_INVALID = -1
DOTA_HUD_VISIBILITY_TOP_TIMEOFDAY = 0
DOTA_HUD_VISIBILITY_TOP_HEROES = 1
DOTA_HUD_VISIBILITY_TOP_SCOREBOARD = 2
DOTA_HUD_VISIBILITY_ACTION_PANEL = 3
DOTA_HUD_VISIBILITY_ACTION_MINIMAP = 4
DOTA_HUD_VISIBILITY_INVENTORY_PANEL = 5
DOTA_HUD_VISIBILITY_INVENTORY_SHOP = 6
DOTA_HUD_VISIBILITY_INVENTORY_ITEMS = 7
DOTA_HUD_VISIBILITY_INVENTORY_QUICKBUY = 8
DOTA_HUD_VISIBILITY_INVENTORY_COURIER = 9
DOTA_HUD_VISIBILITY_INVENTORY_PROTECT = 10
DOTA_HUD_VISIBILITY_INVENTORY_GOLD = 11
DOTA_HUD_VISIBILITY_SHOP_SUGGESTEDITEMS = 12
DOTA_HUD_VISIBILITY_SHOP_COMMONITEMS = 13
DOTA_HUD_VISIBILITY_HERO_SELECTION_TEAMS = 14
DOTA_HUD_VISIBILITY_HERO_SELECTION_GAME_NAME = 15
DOTA_HUD_VISIBILITY_HERO_SELECTION_CLOCK = 16
DOTA_HUD_VISIBILITY_HERO_SELECTION_HEADER = 17
DOTA_HUD_VISIBILITY_TOP_MENU_BUTTONS = 18
DOTA_HUD_VISIBILITY_TOP_BAR_BACKGROUND = 19
DOTA_HUD_VISIBILITY_TOP_BAR_RADIANT_TEAM = 20
DOTA_HUD_VISIBILITY_TOP_BAR_DIRE_TEAM = 21
DOTA_HUD_VISIBILITY_TOP_BAR_SCORE = 22
DOTA_HUD_VISIBILITY_ENDGAME = 23
DOTA_HUD_VISIBILITY_ENDGAME_CHAT = 24
DOTA_HUD_VISIBILITY_QUICK_STATS = 25
DOTA_HUD_VISIBILITY_PREGAME_STRATEGYUI = 26
DOTA_HUD_VISIBILITY_KILLCAM = 27
DOTA_HUD_VISIBILITY_FIGHT_RECAP = 28
DOTA_HUD_VISIBILITY_TOP_BAR = 29
DOTA_HUD_CUSTOMUI_BEHIND_HUD_ELEMENTS = 30
DOTA_HUD_VISIBILITY_AGHANIMS_STATUS = 31
DOTA_HUD_VISIBILITY_COUNT = 32

--- Enum DOTAInventoryFlags_t
DOTA_INVENTORY_ALLOW_NONE = 0
DOTA_INVENTORY_ALLOW_MAIN = 1
DOTA_INVENTORY_ALLOW_STASH = 2
DOTA_INVENTORY_ALL_ACCESS = 3
DOTA_INVENTORY_ALLOW_DROP_ON_GROUND = 4
DOTA_INVENTORY_ALLOW_DROP_AT_FOUNTAIN = 8
DOTA_INVENTORY_LIMIT_DROP_ON_GROUND = 16

--- Enum DOTALimits_t
DOTA_DEFAULT_MAX_TEAM = 5
DOTA_DEFAULT_MAX_TEAM_PLAYERS = 10
DOTA_MAX_PLAYER_TEAMS = 10
DOTA_MAX_SPECTATOR_LOBBY_SIZE = 15
DOTA_MAX_TEAM = 24
DOTA_MAX_TEAM_PLAYERS = 24
DOTA_MAX_SPECTATOR_TEAM_SIZE = 40
DOTA_MAX_PLAYERS = 64

--- Enum DOTAMinimapEvent_t
DOTA_MINIMAP_EVENT_ANCIENT_UNDER_ATTACK = 2
DOTA_MINIMAP_EVENT_BASE_UNDER_ATTACK = 4
DOTA_MINIMAP_EVENT_BASE_GLYPHED = 8
DOTA_MINIMAP_EVENT_TEAMMATE_UNDER_ATTACK = 16
DOTA_MINIMAP_EVENT_TEAMMATE_TELEPORTING = 32
DOTA_MINIMAP_EVENT_TEAMMATE_DIED = 64
DOTA_MINIMAP_EVENT_TUTORIAL_TASK_ACTIVE = 128
DOTA_MINIMAP_EVENT_TUTORIAL_TASK_FINISHED = 256
DOTA_MINIMAP_EVENT_HINT_LOCATION = 512
DOTA_MINIMAP_EVENT_ENEMY_TELEPORTING = 1024
DOTA_MINIMAP_EVENT_CANCEL_TELEPORTING = 2048
DOTA_MINIMAP_EVENT_RADAR = 4096
DOTA_MINIMAP_EVENT_RADAR_TARGET = 8192
DOTA_MINIMAP_EVENT_MOVE_TO_TARGET = 16384

--- Enum DOTAModifierAttribute_t
MODIFIER_ATTRIBUTE_NONE = 0
MODIFIER_ATTRIBUTE_PERMANENT = 1
MODIFIER_ATTRIBUTE_MULTIPLE = 2
MODIFIER_ATTRIBUTE_IGNORE_INVULNERABLE = 4
MODIFIER_ATTRIBUTE_AURA_PRIORITY = 8
MODIFIER_ATTRIBUTE_IGNORE_DODGE = 16
MODIFIER_ATTRIBUTE_DUPLICATED = 32

--- Enum DOTAMusicStatus_t
DOTA_MUSIC_STATUS_NONE = 0
DOTA_MUSIC_STATUS_EXPLORATION = 1
DOTA_MUSIC_STATUS_BATTLE = 2
DOTA_MUSIC_STATUS_PRE_GAME_EXPLORATION = 3
DOTA_MUSIC_STATUS_DEAD = 4
DOTA_MUSIC_STATUS_LAST = 5

--- Enum DOTAPostGameColumn_t
DOTA_POST_GAME_COLUMN_LEVEL = 0
DOTA_POST_GAME_COLUMN_ITEMS = 1
DOTA_POST_GAME_COLUMN_KILLS = 2
DOTA_POST_GAME_COLUMN_DEATHS = 3
DOTA_POST_GAME_COLUMN_ASSISTS = 4
DOTA_POST_GAME_COLUMN_NET_WORTH = 5
DOTA_POST_GAME_COLUMN_LAST_HITS = 6
DOTA_POST_GAME_COLUMN_DENIES = 7
DOTA_POST_GAME_COLUMN_DAMAGE = 8
DOTA_POST_GAME_COLUMN_HEALING = 9
DOTA_POST_GAME_COLUMN_MAX = 10

--- Enum DOTAPostGameLayout_t
DOTA_POST_GAME_LAYOUT_DOUBLE_COLUMN = 0
DOTA_POST_GAME_LAYOUT_SINGLE_COLUMN = 1
DOTA_POST_GAME_LAYOUT_MAX = 2

--- Enum DOTAProjectileAttachment_t
DOTA_PROJECTILE_ATTACHMENT_NONE = 0
DOTA_PROJECTILE_ATTACHMENT_ATTACK_1 = 1
DOTA_PROJECTILE_ATTACHMENT_ATTACK_2 = 2
DOTA_PROJECTILE_ATTACHMENT_HITLOCATION = 3
DOTA_PROJECTILE_ATTACHMENT_ATTACK_3 = 4
DOTA_PROJECTILE_ATTACHMENT_ATTACK_4 = 5
DOTA_PROJECTILE_ATTACHMENT_LAST = 6

--- Enum DOTAScriptInventorySlot_t
DOTA_ITEM_SLOT_1 = 0
DOTA_ITEM_SLOT_2 = 1
DOTA_ITEM_SLOT_3 = 2
DOTA_ITEM_SLOT_4 = 3
DOTA_ITEM_SLOT_5 = 4
DOTA_ITEM_SLOT_6 = 5
DOTA_ITEM_SLOT_7 = 6
DOTA_ITEM_SLOT_8 = 7
DOTA_ITEM_SLOT_9 = 8
DOTA_STASH_SLOT_1 = 9
DOTA_STASH_SLOT_2 = 10
DOTA_STASH_SLOT_3 = 11
DOTA_STASH_SLOT_4 = 12
DOTA_STASH_SLOT_5 = 13
DOTA_STASH_SLOT_6 = 14
DOTA_ITEM_TP_SCROLL = 15
DOTA_ITEM_NEUTRAL_ACTIVE_SLOT = 16
DOTA_ITEM_NEUTRAL_PASSIVE_SLOT = 17
DOTA_ITEM_TRANSIENT_ITEM = 23
DOTA_ITEM_TRANSIENT_RECIPE = 24
DOTA_ITEM_TRANSIENT_CAST_ITEM = 26

--- Enum DOTASlotType_t
DOTA_LOADOUT_TYPE_INVALID = -1
DOTA_LOADOUT_TYPE_WEAPON = 0
DOTA_LOADOUT_TYPE_OFFHAND_WEAPON = 1
DOTA_LOADOUT_TYPE_WEAPON2 = 2
DOTA_LOADOUT_TYPE_OFFHAND_WEAPON2 = 3
DOTA_LOADOUT_TYPE_HEAD = 4
DOTA_LOADOUT_TYPE_SHOULDER = 5
DOTA_LOADOUT_TYPE_ARMS = 6
DOTA_LOADOUT_TYPE_ARMOR = 7
DOTA_LOADOUT_TYPE_BELT = 8
DOTA_LOADOUT_TYPE_NECK = 9
DOTA_LOADOUT_TYPE_BACK = 10
DOTA_LOADOUT_TYPE_GLOVES = 11
DOTA_LOADOUT_TYPE_LEGS = 12
DOTA_LOADOUT_TYPE_TAIL = 13
DOTA_LOADOUT_TYPE_MISC = 14
DOTA_LOADOUT_TYPE_COSTUME = 15
DOTA_LOADOUT_TYPE_HERO_BASE = 16
DOTA_LOADOUT_TYPE_BODY_HEAD = 17
DOTA_LOADOUT_TYPE_MOUNT = 18
DOTA_LOADOUT_TYPE_SUMMON = 19
DOTA_LOADOUT_TYPE_SHAPESHIFT = 20
DOTA_LOADOUT_TYPE_TAUNT = 21
DOTA_LOADOUT_TYPE_HERO_EFFIGY = 22
DOTA_LOADOUT_TYPE_AMBIENT_EFFECTS = 23
DOTA_LOADOUT_TYPE_ABILITY_ATTACK = 24
DOTA_LOADOUT_TYPE_ABILITY1 = 25
DOTA_LOADOUT_TYPE_ABILITY2 = 26
DOTA_LOADOUT_TYPE_ABILITY3 = 27
DOTA_LOADOUT_TYPE_ABILITY4 = 28
DOTA_LOADOUT_TYPE_ABILITY_ULTIMATE = 29
DOTA_LOADOUT_TYPE_ABILITY_EFFECTS_1 = 30
DOTA_LOADOUT_TYPE_ABILITY_EFFECTS_2 = 31
DOTA_LOADOUT_TYPE_ABILITY_EFFECTS_3 = 32
DOTA_LOADOUT_TYPE_ABILITY_EFFECTS_4 = 33
DOTA_LOADOUT_TYPE_ABILITY_EFFECTS_5 = 34
DOTA_LOADOUT_TYPE_ABILITY_EFFECTS_6 = 35
DOTA_LOADOUT_TYPE_ABILITY_EFFECTS_7 = 36
DOTA_LOADOUT_TYPE_ABILITY_EFFECTS_8 = 37
DOTA_LOADOUT_TYPE_ABILITY_EFFECTS_9 = 38
DOTA_LOADOUT_TYPE_VOICE = 39
DOTA_LOADOUT_PERSONA_1_START = 40
DOTA_LOADOUT_TYPE_WEAPON_PERSONA_1 = 40
DOTA_LOADOUT_TYPE_OFFHAND_WEAPON_PERSONA_1 = 41
DOTA_LOADOUT_TYPE_WEAPON2_PERSONA_1 = 42
DOTA_LOADOUT_TYPE_OFFHAND_WEAPON2_PERSONA_1 = 43
DOTA_LOADOUT_TYPE_HEAD_PERSONA_1 = 44
DOTA_LOADOUT_TYPE_SHOULDER_PERSONA_1 = 45
DOTA_LOADOUT_TYPE_ARMS_PERSONA_1 = 46
DOTA_LOADOUT_TYPE_ARMOR_PERSONA_1 = 47
DOTA_LOADOUT_TYPE_BELT_PERSONA_1 = 48
DOTA_LOADOUT_TYPE_NECK_PERSONA_1 = 49
DOTA_LOADOUT_TYPE_BACK_PERSONA_1 = 50
DOTA_LOADOUT_TYPE_LEGS_PERSONA_1 = 51
DOTA_LOADOUT_TYPE_GLOVES_PERSONA_1 = 52
DOTA_LOADOUT_TYPE_TAIL_PERSONA_1 = 53
DOTA_LOADOUT_TYPE_MISC_PERSONA_1 = 54
DOTA_LOADOUT_TYPE_BODY_HEAD_PERSONA_1 = 55
DOTA_LOADOUT_TYPE_MOUNT_PERSONA_1 = 56
DOTA_LOADOUT_TYPE_SUMMON_PERSONA_1 = 57
DOTA_LOADOUT_TYPE_SHAPESHIFT_PERSONA_1 = 58
DOTA_LOADOUT_TYPE_TAUNT_PERSONA_1 = 59
DOTA_LOADOUT_TYPE_HERO_EFFIGY_PERSONA_1 = 60
DOTA_LOADOUT_TYPE_AMBIENT_EFFECTS_PERSONA_1 = 61
DOTA_LOADOUT_TYPE_ABILITY_ATTACK_PERSONA_1 = 62
DOTA_LOADOUT_TYPE_ABILITY1_PERSONA_1 = 63
DOTA_LOADOUT_TYPE_ABILITY2_PERSONA_1 = 64
DOTA_LOADOUT_TYPE_ABILITY3_PERSONA_1 = 65
DOTA_LOADOUT_TYPE_ABILITY4_PERSONA_1 = 66
DOTA_LOADOUT_TYPE_ABILITY_ULTIMATE_PERSONA_1 = 67
DOTA_LOADOUT_PERSONA_1_END = 68
DOTA_LOADOUT_TYPE_VOICE_PERSONA_1 = 68
DOTA_LOADOUT_TYPE_PERSONA_SELECTOR = 69
DOTA_LOADOUT_TYPE_COURIER = 70
DOTA_PLAYER_LOADOUT_START = 70
DOTA_LOADOUT_TYPE_ANNOUNCER = 71
DOTA_LOADOUT_TYPE_MEGA_KILLS = 72
DOTA_LOADOUT_TYPE_MUSIC = 73
DOTA_LOADOUT_TYPE_WARD = 74
DOTA_LOADOUT_TYPE_HUD_SKIN = 75
DOTA_LOADOUT_TYPE_LOADING_SCREEN = 76
DOTA_LOADOUT_TYPE_WEATHER = 77
DOTA_LOADOUT_TYPE_HEROIC_STATUE = 78
DOTA_LOADOUT_TYPE_MULTIKILL_BANNER = 79
DOTA_LOADOUT_TYPE_CURSOR_PACK = 80
DOTA_LOADOUT_TYPE_TELEPORT_EFFECT = 81
DOTA_LOADOUT_TYPE_BLINK_EFFECT = 82
DOTA_LOADOUT_TYPE_EMBLEM = 83
DOTA_LOADOUT_TYPE_TERRAIN = 84
DOTA_LOADOUT_TYPE_RADIANT_CREEPS = 85
DOTA_LOADOUT_TYPE_DIRE_CREEPS = 86
DOTA_LOADOUT_TYPE_RADIANT_TOWER = 87
DOTA_LOADOUT_TYPE_DIRE_TOWER = 88
DOTA_LOADOUT_TYPE_VERSUS_SCREEN = 89
DOTA_LOADOUT_TYPE_STREAK_EFFECT = 90
DOTA_LOADOUT_TYPE_KILL_EFFECT = 91
DOTA_LOADOUT_TYPE_DEATH_EFFECT = 92
DOTA_LOADOUT_TYPE_HEAD_EFFECT = 93
DOTA_LOADOUT_TYPE_MAP_EFFECT = 94
DOTA_LOADOUT_TYPE_COURIER_EFFECT = 95
DOTA_LOADOUT_TYPE_RADIANT_SIEGE_CREEPS = 96
DOTA_LOADOUT_TYPE_DIRE_SIEGE_CREEPS = 97
DOTA_LOADOUT_TYPE_ROSHAN = 98
DOTA_LOADOUT_TYPE_TORMENTOR = 99
DOTA_LOADOUT_TYPE_ANCIENT = 100
DOTA_LOADOUT_TYPE_PET_EFFIGY = 101
DOTA_PLAYER_LOADOUT_END = 101
DOTA_LOADOUT_TYPE_NONE = 102
DOTA_LOADOUT_TYPE_COUNT = 103

--- Enum DOTASpeechType_t
DOTA_SPEECH_USER_INVALID = 0
DOTA_SPEECH_USER_SINGLE = 1
DOTA_SPEECH_USER_TEAM = 2
DOTA_SPEECH_USER_TEAM_NEARBY = 3
DOTA_SPEECH_USER_NEARBY = 4
DOTA_SPEECH_USER_ALL = 5
DOTA_SPEECH_GOOD_TEAM = 6
DOTA_SPEECH_BAD_TEAM = 7
DOTA_SPEECH_SPECTATOR = 8
DOTA_SPEECH_USER_TEAM_NOSPECTATOR = 9
DOTA_SPEECH_RECIPIENT_TYPE_MAX = 10

--- Enum DOTATeam_t
DOTA_TEAM_FIRST = 2
DOTA_TEAM_GOODGUYS = 2
DOTA_TEAM_BADGUYS = 3
DOTA_TEAM_NEUTRALS = 4
DOTA_TEAM_NOTEAM = 5
DOTA_TEAM_CUSTOM_1 = 6
DOTA_TEAM_CUSTOM_MIN = 6
DOTA_TEAM_CUSTOM_2 = 7
DOTA_TEAM_CUSTOM_3 = 8
DOTA_TEAM_CUSTOM_COUNT = 8
DOTA_TEAM_CUSTOM_4 = 9
DOTA_TEAM_CUSTOM_5 = 10
DOTA_TEAM_CUSTOM_6 = 11
DOTA_TEAM_CUSTOM_7 = 12
DOTA_TEAM_CUSTOM_8 = 13
DOTA_TEAM_CUSTOM_MAX = 13
DOTA_TEAM_DRAFT_POOL = 14
DOTA_TEAM_COUNT = 15

--- Enum DOTAUnitAttackCapability_t
DOTA_UNIT_CAP_NO_ATTACK = 0
DOTA_UNIT_CAP_MELEE_ATTACK = 1
DOTA_UNIT_CAP_RANGED_ATTACK = 2
DOTA_UNIT_ATTACK_CAPABILITY_BIT_COUNT = 3
DOTA_UNIT_CAP_RANGED_ATTACK_DIRECTIONAL = 4

--- Enum DOTAUnitMoveCapability_t
DOTA_UNIT_CAP_MOVE_NONE = 0
DOTA_UNIT_CAP_MOVE_GROUND = 1
DOTA_UNIT_CAP_MOVE_FLY = 2

--- Enum dotaunitorder_t
DOTA_UNIT_ORDER_NONE = 0
DOTA_UNIT_ORDER_MOVE_TO_POSITION = 1
DOTA_UNIT_ORDER_MOVE_TO_TARGET = 2
DOTA_UNIT_ORDER_ATTACK_MOVE = 3
DOTA_UNIT_ORDER_ATTACK_TARGET = 4
DOTA_UNIT_ORDER_CAST_POSITION = 5
DOTA_UNIT_ORDER_CAST_TARGET = 6
DOTA_UNIT_ORDER_CAST_TARGET_TREE = 7
DOTA_UNIT_ORDER_CAST_NO_TARGET = 8
DOTA_UNIT_ORDER_CAST_TOGGLE = 9
DOTA_UNIT_ORDER_HOLD_POSITION = 10
DOTA_UNIT_ORDER_TRAIN_ABILITY = 11
DOTA_UNIT_ORDER_DROP_ITEM = 12
DOTA_UNIT_ORDER_GIVE_ITEM = 13
DOTA_UNIT_ORDER_PICKUP_ITEM = 14
DOTA_UNIT_ORDER_PICKUP_RUNE = 15
DOTA_UNIT_ORDER_PURCHASE_ITEM = 16
DOTA_UNIT_ORDER_SELL_ITEM = 17
DOTA_UNIT_ORDER_DISASSEMBLE_ITEM = 18
DOTA_UNIT_ORDER_MOVE_ITEM = 19
DOTA_UNIT_ORDER_CAST_TOGGLE_AUTO = 20
DOTA_UNIT_ORDER_STOP = 21
DOTA_UNIT_ORDER_TAUNT = 22
DOTA_UNIT_ORDER_BUYBACK = 23
DOTA_UNIT_ORDER_GLYPH = 24
DOTA_UNIT_ORDER_EJECT_ITEM_FROM_STASH = 25
DOTA_UNIT_ORDER_CAST_RUNE = 26
DOTA_UNIT_ORDER_PING_ABILITY = 27
DOTA_UNIT_ORDER_MOVE_TO_DIRECTION = 28
DOTA_UNIT_ORDER_PATROL = 29
DOTA_UNIT_ORDER_VECTOR_TARGET_POSITION = 30
DOTA_UNIT_ORDER_RADAR = 31
DOTA_UNIT_ORDER_SET_ITEM_COMBINE_LOCK = 32
DOTA_UNIT_ORDER_CONTINUE = 33
DOTA_UNIT_ORDER_VECTOR_TARGET_CANCELED = 34
DOTA_UNIT_ORDER_CAST_RIVER_PAINT = 35
DOTA_UNIT_ORDER_PREGAME_ADJUST_ITEM_ASSIGNMENT = 36
DOTA_UNIT_ORDER_DROP_ITEM_AT_FOUNTAIN = 37
DOTA_UNIT_ORDER_TAKE_ITEM_FROM_NEUTRAL_ITEM_STASH = 38
DOTA_UNIT_ORDER_MOVE_RELATIVE = 39
DOTA_UNIT_ORDER_CAST_TOGGLE_ALT = 40
DOTA_UNIT_ORDER_CONSUME_ITEM = 41
DOTA_UNIT_ORDER_SET_ITEM_MARK_FOR_SELL = 42

--- Enum EDOTA_ModifyGold_Reason
DOTA_ModifyGold_Unspecified = 0
DOTA_ModifyGold_Death = 1
DOTA_ModifyGold_Buyback = 2
DOTA_ModifyGold_PurchaseConsumable = 3
DOTA_ModifyGold_PurchaseItem = 4
DOTA_ModifyGold_AbandonedRedistribute = 5
DOTA_ModifyGold_SellItem = 6
DOTA_ModifyGold_AbilityCost = 7
DOTA_ModifyGold_CheatCommand = 8
DOTA_ModifyGold_SelectionPenalty = 9
DOTA_ModifyGold_GameTick = 10
DOTA_ModifyGold_Building = 11
DOTA_ModifyGold_HeroKill = 12
DOTA_ModifyGold_CreepKill = 13
DOTA_ModifyGold_NeutralKill = 14
DOTA_ModifyGold_RoshanKill = 15
DOTA_ModifyGold_CourierKill = 16
DOTA_ModifyGold_BountyRune = 17
DOTA_ModifyGold_SharedGold = 18
DOTA_ModifyGold_AbilityGold = 19
DOTA_ModifyGold_WardKill = 20
DOTA_ModifyGold_CourierKilledByThisPlayer = 21

--- Enum EDOTA_ModifyXP_Reason
DOTA_ModifyXP_Unspecified = 0
DOTA_ModifyXP_HeroKill = 1
DOTA_ModifyXP_CreepKill = 2
DOTA_ModifyXP_RoshanKill = 3
DOTA_ModifyXP_TomeOfKnowledge = 4
DOTA_ModifyXP_Outpost = 5
DOTA_ModifyXP_CatchUp = 6
DOTA_ModifyXP_HeroAbility = 7
DOTA_ModifyXP_MAX = 8

--- Enum EntityEffects
EF_NODRAW = 32

--- Enum EntityThinkPhase
PRESIM = 0
PRESENSING = 1
POSTSENSING = 2

--- Enum EShareAbility
ITEM_FULLY_SHAREABLE = 0
ITEM_PARTIALLY_SHAREABLE = 1
ITEM_NOT_SHAREABLE = 2

--- Enum FindOrder
FIND_ANY_ORDER = 0
FIND_CLOSEST = 1
FIND_FARTHEST = 2

--- Enum GameActivity_t
ACT_RESET = 0
ACT_IDLE = 1
ACT_TRANSITION = 2
ACT_COVER = 3
ACT_COVER_MED = 4
ACT_COVER_LOW = 5
ACT_WALK = 6
ACT_WALK_AIM = 7
ACT_WALK_CROUCH = 8
ACT_WALK_CROUCH_AIM = 9
ACT_RUN = 10
ACT_RUN_AIM = 11
ACT_RUN_CROUCH = 12
ACT_RUN_CROUCH_AIM = 13
ACT_RUN_PROTECTED = 14
ACT_SCRIPT_CUSTOM_MOVE = 15
ACT_RANGE_ATTACK1 = 16
ACT_RANGE_ATTACK2 = 17
ACT_RANGE_ATTACK1_LOW = 18
ACT_RANGE_ATTACK2_LOW = 19
ACT_DIESIMPLE = 20
ACT_DIEBACKWARD = 21
ACT_DIEFORWARD = 22
ACT_DIEVIOLENT = 23
ACT_DIERAGDOLL = 24
ACT_FLY = 25
ACT_HOVER = 26
ACT_GLIDE = 27
ACT_SWIM = 28
ACT_JUMP = 29
ACT_HOP = 30
ACT_LEAP = 31
ACT_LAND = 32
ACT_CLIMB_UP = 33
ACT_CLIMB_DOWN = 34
ACT_CLIMB_DISMOUNT = 35
ACT_SHIPLADDER_UP = 36
ACT_SHIPLADDER_DOWN = 37
ACT_STRAFE_LEFT = 38
ACT_STRAFE_RIGHT = 39
ACT_ROLL_LEFT = 40
ACT_ROLL_RIGHT = 41
ACT_TURN_LEFT = 42
ACT_TURN_RIGHT = 43
ACT_CROUCH = 44
ACT_CROUCHIDLE = 45
ACT_STAND = 46
ACT_USE = 47
ACT_ALIEN_BURROW_IDLE = 48
ACT_ALIEN_BURROW_OUT = 49
ACT_SIGNAL1 = 50
ACT_SIGNAL2 = 51
ACT_SIGNAL3 = 52
ACT_SIGNAL_ADVANCE = 53
ACT_SIGNAL_FORWARD = 54
ACT_SIGNAL_GROUP = 55
ACT_SIGNAL_HALT = 56
ACT_SIGNAL_LEFT = 57
ACT_SIGNAL_RIGHT = 58
ACT_SIGNAL_TAKECOVER = 59
ACT_LOOKBACK_RIGHT = 60
ACT_LOOKBACK_LEFT = 61
ACT_COWER = 62
ACT_SMALL_FLINCH = 63
ACT_BIG_FLINCH = 64
ACT_MELEE_ATTACK1 = 65
ACT_MELEE_ATTACK2 = 66
ACT_RELOAD = 67
ACT_RELOAD_START = 68
ACT_RELOAD_FINISH = 69
ACT_RELOAD_LOW = 70
ACT_ARM = 71
ACT_DISARM = 72
ACT_DROP_WEAPON = 73
ACT_DROP_WEAPON_SHOTGUN = 74
ACT_PICKUP_GROUND = 75
ACT_PICKUP_RACK = 76
ACT_IDLE_ANGRY = 77
ACT_IDLE_RELAXED = 78
ACT_IDLE_STIMULATED = 79
ACT_IDLE_AGITATED = 80
ACT_IDLE_STEALTH = 81
ACT_IDLE_HURT = 82
ACT_WALK_RELAXED = 83
ACT_WALK_STIMULATED = 84
ACT_WALK_AGITATED = 85
ACT_WALK_STEALTH = 86
ACT_RUN_RELAXED = 87
ACT_RUN_STIMULATED = 88
ACT_RUN_AGITATED = 89
ACT_RUN_STEALTH = 90
ACT_IDLE_AIM_RELAXED = 91
ACT_IDLE_AIM_STIMULATED = 92
ACT_IDLE_AIM_AGITATED = 93
ACT_IDLE_AIM_STEALTH = 94
ACT_WALK_AIM_RELAXED = 95
ACT_WALK_AIM_STIMULATED = 96
ACT_WALK_AIM_AGITATED = 97
ACT_WALK_AIM_STEALTH = 98
ACT_RUN_AIM_RELAXED = 99
ACT_RUN_AIM_STIMULATED = 100
ACT_RUN_AIM_AGITATED = 101
ACT_RUN_AIM_STEALTH = 102
ACT_CROUCHIDLE_STIMULATED = 103
ACT_CROUCHIDLE_AIM_STIMULATED = 104
ACT_CROUCHIDLE_AGITATED = 105
ACT_WALK_HURT = 106
ACT_RUN_HURT = 107
ACT_SPECIAL_ATTACK1 = 108
ACT_SPECIAL_ATTACK2 = 109
ACT_COMBAT_IDLE = 110
ACT_WALK_SCARED = 111
ACT_RUN_SCARED = 112
ACT_VICTORY_DANCE = 113
ACT_DIE_HEADSHOT = 114
ACT_DIE_CHESTSHOT = 115
ACT_DIE_GUTSHOT = 116
ACT_DIE_BACKSHOT = 117
ACT_FLINCH_HEAD = 118
ACT_FLINCH_CHEST = 119
ACT_FLINCH_STOMACH = 120
ACT_FLINCH_LEFTARM = 121
ACT_FLINCH_RIGHTARM = 122
ACT_FLINCH_LEFTLEG = 123
ACT_FLINCH_RIGHTLEG = 124
ACT_FLINCH_PHYSICS = 125
ACT_FLINCH_HEAD_BACK = 126
ACT_FLINCH_CHEST_BACK = 127
ACT_FLINCH_STOMACH_BACK = 128
ACT_FLINCH_CROUCH_FRONT = 129
ACT_FLINCH_CROUCH_BACK = 130
ACT_FLINCH_CROUCH_LEFT = 131
ACT_FLINCH_CROUCH_RIGHT = 132
ACT_IDLE_ON_FIRE = 133
ACT_WALK_ON_FIRE = 134
ACT_RUN_ON_FIRE = 135
ACT_180_LEFT = 137
ACT_180_RIGHT = 138
ACT_90_LEFT = 139
ACT_90_RIGHT = 140
ACT_STEP_LEFT = 141
ACT_STEP_RIGHT = 142
ACT_STEP_BACK = 143
ACT_STEP_FORE = 144
ACT_GESTURE_RANGE_ATTACK1 = 145
ACT_GESTURE_RANGE_ATTACK2 = 146
ACT_GESTURE_MELEE_ATTACK1 = 147
ACT_GESTURE_MELEE_ATTACK2 = 148
ACT_GESTURE_RANGE_ATTACK1_LOW = 149
ACT_GESTURE_RANGE_ATTACK2_LOW = 150
ACT_MELEE_ATTACK_SWING_GESTURE = 151
ACT_GESTURE_SMALL_FLINCH = 152
ACT_GESTURE_BIG_FLINCH = 153
ACT_GESTURE_FLINCH_BLAST = 154
ACT_GESTURE_FLINCH_BLAST_SHOTGUN = 155
ACT_GESTURE_FLINCH_BLAST_DAMAGED = 156
ACT_GESTURE_FLINCH_BLAST_DAMAGED_SHOTGUN = 157
ACT_GESTURE_FLINCH_HEAD = 158
ACT_GESTURE_FLINCH_CHEST = 159
ACT_GESTURE_FLINCH_STOMACH = 160
ACT_GESTURE_FLINCH_LEFTARM = 161
ACT_GESTURE_FLINCH_RIGHTARM = 162
ACT_GESTURE_FLINCH_LEFTLEG = 163
ACT_GESTURE_FLINCH_RIGHTLEG = 164
ACT_GESTURE_TURN_LEFT = 165
ACT_GESTURE_TURN_RIGHT = 166
ACT_GESTURE_TURN_LEFT45 = 167
ACT_GESTURE_TURN_RIGHT45 = 168
ACT_GESTURE_TURN_LEFT90 = 169
ACT_GESTURE_TURN_RIGHT90 = 170
ACT_GESTURE_TURN_LEFT45_FLAT = 171
ACT_GESTURE_TURN_RIGHT45_FLAT = 172
ACT_GESTURE_TURN_LEFT90_FLAT = 173
ACT_GESTURE_TURN_RIGHT90_FLAT = 174
ACT_BARNACLE_HIT = 175
ACT_BARNACLE_PULL = 176
ACT_BARNACLE_CHOMP = 177
ACT_BARNACLE_CHEW = 178
ACT_DO_NOT_DISTURB = 179
ACT_SPECIFIC_SEQUENCE = 180
ACT_VM_DEPLOY = 181
ACT_VM_RELOAD_EMPTY = 182
ACT_VM_DRAW = 183
ACT_VM_HOLSTER = 184
ACT_VM_IDLE = 185
ACT_VM_FIDGET = 186
ACT_VM_PULLBACK = 187
ACT_VM_PULLBACK_HIGH = 188
ACT_VM_PULLBACK_LOW = 189
ACT_VM_THROW = 190
ACT_VM_DROP = 191
ACT_VM_PULLPIN = 192
ACT_VM_PRIMARYATTACK = 193
ACT_VM_SECONDARYATTACK = 194
ACT_VM_RELOAD = 195
ACT_VM_DRYFIRE = 196
ACT_VM_HITLEFT = 197
ACT_VM_HITLEFT2 = 198
ACT_VM_HITRIGHT = 199
ACT_VM_HITRIGHT2 = 200
ACT_VM_HITCENTER = 201
ACT_VM_HITCENTER2 = 202
ACT_VM_MISSLEFT = 203
ACT_VM_MISSLEFT2 = 204
ACT_VM_MISSRIGHT = 205
ACT_VM_MISSRIGHT2 = 206
ACT_VM_MISSCENTER = 207
ACT_VM_MISSCENTER2 = 208
ACT_VM_HAULBACK = 209
ACT_VM_SWINGHARD = 210
ACT_VM_SWINGMISS = 211
ACT_VM_SWINGHIT = 212
ACT_VM_IDLE_TO_LOWERED = 213
ACT_VM_IDLE_LOWERED = 214
ACT_VM_LOWERED_TO_IDLE = 215
ACT_VM_RECOIL1 = 216
ACT_VM_RECOIL2 = 217
ACT_VM_RECOIL3 = 218
ACT_VM_PICKUP = 219
ACT_VM_RELEASE = 220
ACT_VM_MAUL_LOOP = 221
ACT_VM_ATTACH_SILENCER = 222
ACT_VM_DETACH_SILENCER = 223
ACT_SLAM_STICKWALL_IDLE = 224
ACT_SLAM_STICKWALL_ND_IDLE = 225
ACT_SLAM_STICKWALL_ATTACH = 226
ACT_SLAM_STICKWALL_ATTACH2 = 227
ACT_SLAM_STICKWALL_ND_ATTACH = 228
ACT_SLAM_STICKWALL_ND_ATTACH2 = 229
ACT_SLAM_STICKWALL_DETONATE = 230
ACT_SLAM_STICKWALL_DETONATOR_HOLSTER = 231
ACT_SLAM_STICKWALL_DRAW = 232
ACT_SLAM_STICKWALL_ND_DRAW = 233
ACT_SLAM_STICKWALL_TO_THROW = 234
ACT_SLAM_STICKWALL_TO_THROW_ND = 235
ACT_SLAM_STICKWALL_TO_TRIPMINE_ND = 236
ACT_SLAM_THROW_IDLE = 237
ACT_SLAM_THROW_ND_IDLE = 238
ACT_SLAM_THROW_THROW = 239
ACT_SLAM_THROW_THROW2 = 240
ACT_SLAM_THROW_THROW_ND = 241
ACT_SLAM_THROW_THROW_ND2 = 242
ACT_SLAM_THROW_DRAW = 243
ACT_SLAM_THROW_ND_DRAW = 244
ACT_SLAM_THROW_TO_STICKWALL = 245
ACT_SLAM_THROW_TO_STICKWALL_ND = 246
ACT_SLAM_THROW_DETONATE = 247
ACT_SLAM_THROW_DETONATOR_HOLSTER = 248
ACT_SLAM_THROW_TO_TRIPMINE_ND = 249
ACT_SLAM_TRIPMINE_IDLE = 250
ACT_SLAM_TRIPMINE_DRAW = 251
ACT_SLAM_TRIPMINE_ATTACH = 252
ACT_SLAM_TRIPMINE_ATTACH2 = 253
ACT_SLAM_TRIPMINE_TO_STICKWALL_ND = 254
ACT_SLAM_TRIPMINE_TO_THROW_ND = 255
ACT_SLAM_DETONATOR_IDLE = 256
ACT_SLAM_DETONATOR_DRAW = 257
ACT_SLAM_DETONATOR_DETONATE = 258
ACT_SLAM_DETONATOR_HOLSTER = 259
ACT_SLAM_DETONATOR_STICKWALL_DRAW = 260
ACT_SLAM_DETONATOR_THROW_DRAW = 261
ACT_SHOTGUN_RELOAD_START = 262
ACT_SHOTGUN_RELOAD_FINISH = 263
ACT_SHOTGUN_PUMP = 264
ACT_SMG2_IDLE2 = 265
ACT_SMG2_FIRE2 = 266
ACT_SMG2_DRAW2 = 267
ACT_SMG2_RELOAD2 = 268
ACT_SMG2_DRYFIRE2 = 269
ACT_SMG2_TOAUTO = 270
ACT_SMG2_TOBURST = 271
ACT_PHYSCANNON_UPGRADE = 272
ACT_RANGE_ATTACK_AR1 = 273
ACT_RANGE_ATTACK_AR2 = 274
ACT_RANGE_ATTACK_AR2_LOW = 275
ACT_RANGE_ATTACK_AR2_GRENADE = 276
ACT_RANGE_ATTACK_HMG1 = 277
ACT_RANGE_ATTACK_ML = 278
ACT_RANGE_ATTACK_SMG1 = 279
ACT_RANGE_ATTACK_SMG1_LOW = 280
ACT_RANGE_ATTACK_SMG2 = 281
ACT_RANGE_ATTACK_SHOTGUN = 282
ACT_RANGE_ATTACK_SHOTGUN_LOW = 283
ACT_RANGE_ATTACK_PISTOL = 284
ACT_RANGE_ATTACK_PISTOL_LOW = 285
ACT_RANGE_ATTACK_SLAM = 286
ACT_RANGE_ATTACK_TRIPWIRE = 287
ACT_RANGE_ATTACK_THROW = 288
ACT_RANGE_ATTACK_SNIPER_RIFLE = 289
ACT_RANGE_ATTACK_RPG = 290
ACT_MELEE_ATTACK_SWING = 291
ACT_RANGE_AIM_LOW = 292
ACT_RANGE_AIM_SMG1_LOW = 293
ACT_RANGE_AIM_PISTOL_LOW = 294
ACT_RANGE_AIM_AR2_LOW = 295
ACT_COVER_PISTOL_LOW = 296
ACT_COVER_SMG1_LOW = 297
ACT_GESTURE_RANGE_ATTACK_AR1 = 298
ACT_GESTURE_RANGE_ATTACK_AR2 = 299
ACT_GESTURE_RANGE_ATTACK_AR2_GRENADE = 300
ACT_GESTURE_RANGE_ATTACK_HMG1 = 301
ACT_GESTURE_RANGE_ATTACK_ML = 302
ACT_GESTURE_RANGE_ATTACK_SMG1 = 303
ACT_GESTURE_RANGE_ATTACK_SMG1_LOW = 304
ACT_GESTURE_RANGE_ATTACK_SMG2 = 305
ACT_GESTURE_RANGE_ATTACK_SHOTGUN = 306
ACT_GESTURE_RANGE_ATTACK_PISTOL = 307
ACT_GESTURE_RANGE_ATTACK_PISTOL_LOW = 308
ACT_GESTURE_RANGE_ATTACK_SLAM = 309
ACT_GESTURE_RANGE_ATTACK_TRIPWIRE = 310
ACT_GESTURE_RANGE_ATTACK_THROW = 311
ACT_GESTURE_RANGE_ATTACK_SNIPER_RIFLE = 312
ACT_GESTURE_MELEE_ATTACK_SWING = 313
ACT_IDLE_RIFLE = 314
ACT_IDLE_SMG1 = 315
ACT_IDLE_ANGRY_SMG1 = 316
ACT_IDLE_PISTOL = 317
ACT_IDLE_ANGRY_PISTOL = 318
ACT_IDLE_ANGRY_SHOTGUN = 319
ACT_IDLE_STEALTH_PISTOL = 320
ACT_IDLE_PACKAGE = 321
ACT_WALK_PACKAGE = 322
ACT_IDLE_SUITCASE = 323
ACT_WALK_SUITCASE = 324
ACT_IDLE_SMG1_RELAXED = 325
ACT_IDLE_SMG1_STIMULATED = 326
ACT_WALK_RIFLE_RELAXED = 327
ACT_RUN_RIFLE_RELAXED = 328
ACT_WALK_RIFLE_STIMULATED = 329
ACT_RUN_RIFLE_STIMULATED = 330
ACT_IDLE_AIM_RIFLE_STIMULATED = 331
ACT_WALK_AIM_RIFLE_STIMULATED = 332
ACT_RUN_AIM_RIFLE_STIMULATED = 333
ACT_IDLE_SHOTGUN_RELAXED = 334
ACT_IDLE_SHOTGUN_STIMULATED = 335
ACT_IDLE_SHOTGUN_AGITATED = 336
ACT_WALK_ANGRY = 337
ACT_POLICE_HARASS1 = 338
ACT_POLICE_HARASS2 = 339
ACT_IDLE_MANNEDGUN = 340
ACT_IDLE_MELEE = 341
ACT_IDLE_ANGRY_MELEE = 342
ACT_IDLE_RPG_RELAXED = 343
ACT_IDLE_RPG = 344
ACT_IDLE_ANGRY_RPG = 345
ACT_COVER_LOW_RPG = 346
ACT_WALK_RPG = 347
ACT_RUN_RPG = 348
ACT_WALK_CROUCH_RPG = 349
ACT_RUN_CROUCH_RPG = 350
ACT_WALK_RPG_RELAXED = 351
ACT_RUN_RPG_RELAXED = 352
ACT_WALK_RIFLE = 353
ACT_WALK_AIM_RIFLE = 354
ACT_WALK_CROUCH_RIFLE = 355
ACT_WALK_CROUCH_AIM_RIFLE = 356
ACT_RUN_RIFLE = 357
ACT_RUN_AIM_RIFLE = 358
ACT_RUN_CROUCH_RIFLE = 359
ACT_RUN_CROUCH_AIM_RIFLE = 360
ACT_RUN_STEALTH_PISTOL = 361
ACT_WALK_AIM_SHOTGUN = 362
ACT_RUN_AIM_SHOTGUN = 363
ACT_WALK_PISTOL = 364
ACT_RUN_PISTOL = 365
ACT_WALK_AIM_PISTOL = 366
ACT_RUN_AIM_PISTOL = 367
ACT_WALK_STEALTH_PISTOL = 368
ACT_WALK_AIM_STEALTH_PISTOL = 369
ACT_RUN_AIM_STEALTH_PISTOL = 370
ACT_RELOAD_PISTOL = 371
ACT_RELOAD_PISTOL_LOW = 372
ACT_RELOAD_SMG1 = 373
ACT_RELOAD_SMG1_LOW = 374
ACT_RELOAD_SHOTGUN = 375
ACT_RELOAD_SHOTGUN_LOW = 376
ACT_GESTURE_RELOAD = 377
ACT_GESTURE_RELOAD_PISTOL = 378
ACT_GESTURE_RELOAD_SMG1 = 379
ACT_GESTURE_RELOAD_SHOTGUN = 380
ACT_BUSY_LEAN_LEFT = 381
ACT_BUSY_LEAN_LEFT_ENTRY = 382
ACT_BUSY_LEAN_LEFT_EXIT = 383
ACT_BUSY_LEAN_BACK = 384
ACT_BUSY_LEAN_BACK_ENTRY = 385
ACT_BUSY_LEAN_BACK_EXIT = 386
ACT_BUSY_SIT_GROUND = 387
ACT_BUSY_SIT_GROUND_ENTRY = 388
ACT_BUSY_SIT_GROUND_EXIT = 389
ACT_BUSY_SIT_CHAIR = 390
ACT_BUSY_SIT_CHAIR_ENTRY = 391
ACT_BUSY_SIT_CHAIR_EXIT = 392
ACT_BUSY_STAND = 393
ACT_BUSY_QUEUE = 394
ACT_DUCK_DODGE = 395
ACT_DIE_BARNACLE_SWALLOW = 396
ACT_GESTURE_BARNACLE_STRANGLE = 397
ACT_DIE_FRONTSIDE = 402
ACT_DIE_RIGHTSIDE = 403
ACT_DIE_BACKSIDE = 404
ACT_DIE_LEFTSIDE = 405
ACT_DIE_CROUCH_FRONTSIDE = 406
ACT_DIE_CROUCH_RIGHTSIDE = 407
ACT_DIE_CROUCH_BACKSIDE = 408
ACT_DIE_CROUCH_LEFTSIDE = 409
ACT_DIE_INCAP = 410
ACT_DIE_STANDING = 411
ACT_OPEN_DOOR = 412
ACT_DI_ALYX_ZOMBIE_MELEE = 413
ACT_DI_ALYX_ZOMBIE_TORSO_MELEE = 414
ACT_DI_ALYX_HEADCRAB_MELEE = 415
ACT_DI_ALYX_ANTLION = 416
ACT_DI_ALYX_ZOMBIE_SHOTGUN64 = 417
ACT_DI_ALYX_ZOMBIE_SHOTGUN26 = 418
ACT_READINESS_RELAXED_TO_STIMULATED = 419
ACT_READINESS_RELAXED_TO_STIMULATED_WALK = 420
ACT_READINESS_AGITATED_TO_STIMULATED = 421
ACT_READINESS_STIMULATED_TO_RELAXED = 422
ACT_READINESS_PISTOL_RELAXED_TO_STIMULATED = 423
ACT_READINESS_PISTOL_RELAXED_TO_STIMULATED_WALK = 424
ACT_READINESS_PISTOL_AGITATED_TO_STIMULATED = 425
ACT_READINESS_PISTOL_STIMULATED_TO_RELAXED = 426
ACT_IDLE_CARRY = 427
ACT_WALK_CARRY = 428
ACT_STARTDYING = 429
ACT_DYINGLOOP = 430
ACT_DYINGTODEAD = 431
ACT_RIDE_MANNED_GUN = 432
ACT_VM_SPRINT_ENTER = 433
ACT_VM_SPRINT_IDLE = 434
ACT_VM_SPRINT_LEAVE = 435
ACT_FIRE_START = 436
ACT_FIRE_LOOP = 437
ACT_FIRE_END = 438
ACT_CROUCHING_GRENADEIDLE = 439
ACT_CROUCHING_GRENADEREADY = 440
ACT_CROUCHING_PRIMARYATTACK = 441
ACT_OVERLAY_GRENADEIDLE = 442
ACT_OVERLAY_GRENADEREADY = 443
ACT_OVERLAY_PRIMARYATTACK = 444
ACT_OVERLAY_SHIELD_UP = 445
ACT_OVERLAY_SHIELD_DOWN = 446
ACT_OVERLAY_SHIELD_UP_IDLE = 447
ACT_OVERLAY_SHIELD_ATTACK = 448
ACT_OVERLAY_SHIELD_KNOCKBACK = 449
ACT_SHIELD_UP = 450
ACT_SHIELD_DOWN = 451
ACT_SHIELD_UP_IDLE = 452
ACT_SHIELD_ATTACK = 453
ACT_SHIELD_KNOCKBACK = 454
ACT_CROUCHING_SHIELD_UP = 455
ACT_CROUCHING_SHIELD_DOWN = 456
ACT_CROUCHING_SHIELD_UP_IDLE = 457
ACT_CROUCHING_SHIELD_ATTACK = 458
ACT_CROUCHING_SHIELD_KNOCKBACK = 459
ACT_TURNRIGHT45 = 460
ACT_TURNLEFT45 = 461
ACT_TURN = 462
ACT_OBJ_ASSEMBLING = 463
ACT_OBJ_DISMANTLING = 464
ACT_OBJ_STARTUP = 465
ACT_OBJ_RUNNING = 466
ACT_OBJ_IDLE = 467
ACT_OBJ_PLACING = 468
ACT_OBJ_DETERIORATING = 469
ACT_OBJ_UPGRADING = 470
ACT_DEPLOY = 471
ACT_DEPLOY_IDLE = 472
ACT_UNDEPLOY = 473
ACT_CROSSBOW_DRAW_UNLOADED = 474
ACT_GAUSS_SPINUP = 475
ACT_GAUSS_SPINCYCLE = 476
ACT_VM_PRIMARYATTACK_SILENCED = 477
ACT_VM_RELOAD_SILENCED = 478
ACT_VM_DRYFIRE_SILENCED = 479
ACT_VM_IDLE_SILENCED = 480
ACT_VM_DRAW_SILENCED = 481
ACT_VM_IDLE_EMPTY_LEFT = 482
ACT_VM_DRYFIRE_LEFT = 483
ACT_VM_IS_DRAW = 484
ACT_VM_IS_HOLSTER = 485
ACT_VM_IS_IDLE = 486
ACT_VM_IS_PRIMARYATTACK = 487
ACT_PLAYER_IDLE_FIRE = 488
ACT_PLAYER_CROUCH_FIRE = 489
ACT_PLAYER_CROUCH_WALK_FIRE = 490
ACT_PLAYER_WALK_FIRE = 491
ACT_PLAYER_RUN_FIRE = 492
ACT_IDLETORUN = 493
ACT_RUNTOIDLE = 494
ACT_VM_DRAW_DEPLOYED = 495
ACT_HL2MP_IDLE_MELEE = 496
ACT_HL2MP_RUN_MELEE = 497
ACT_HL2MP_IDLE_CROUCH_MELEE = 498
ACT_HL2MP_WALK_CROUCH_MELEE = 499
ACT_HL2MP_GESTURE_RANGE_ATTACK_MELEE = 500
ACT_HL2MP_GESTURE_RELOAD_MELEE = 501
ACT_HL2MP_JUMP_MELEE = 502
ACT_MP_STAND_IDLE = 503
ACT_MP_CROUCH_IDLE = 504
ACT_MP_CROUCH_DEPLOYED_IDLE = 505
ACT_MP_CROUCH_DEPLOYED = 506
ACT_MP_DEPLOYED_IDLE = 507
ACT_MP_RUN = 508
ACT_MP_WALK = 509
ACT_MP_AIRWALK = 510
ACT_MP_CROUCHWALK = 511
ACT_MP_SPRINT = 512
ACT_MP_JUMP = 513
ACT_MP_JUMP_START = 514
ACT_MP_JUMP_FLOAT = 515
ACT_MP_JUMP_LAND = 516
ACT_MP_DOUBLEJUMP = 517
ACT_MP_SWIM = 518
ACT_MP_DEPLOYED = 519
ACT_MP_SWIM_DEPLOYED = 520
ACT_MP_VCD = 521
ACT_MP_ATTACK_STAND_PRIMARYFIRE = 522
ACT_MP_ATTACK_STAND_PRIMARYFIRE_DEPLOYED = 523
ACT_MP_ATTACK_STAND_SECONDARYFIRE = 524
ACT_MP_ATTACK_STAND_GRENADE = 525
ACT_MP_ATTACK_CROUCH_PRIMARYFIRE = 526
ACT_MP_ATTACK_CROUCH_PRIMARYFIRE_DEPLOYED = 527
ACT_MP_ATTACK_CROUCH_SECONDARYFIRE = 528
ACT_MP_ATTACK_CROUCH_GRENADE = 529
ACT_MP_ATTACK_SWIM_PRIMARYFIRE = 530
ACT_MP_ATTACK_SWIM_SECONDARYFIRE = 531
ACT_MP_ATTACK_SWIM_GRENADE = 532
ACT_MP_ATTACK_AIRWALK_PRIMARYFIRE = 533
ACT_MP_ATTACK_AIRWALK_SECONDARYFIRE = 534
ACT_MP_ATTACK_AIRWALK_GRENADE = 535
ACT_MP_RELOAD_STAND = 536
ACT_MP_RELOAD_STAND_LOOP = 537
ACT_MP_RELOAD_STAND_END = 538
ACT_MP_RELOAD_CROUCH = 539
ACT_MP_RELOAD_CROUCH_LOOP = 540
ACT_MP_RELOAD_CROUCH_END = 541
ACT_MP_RELOAD_SWIM = 542
ACT_MP_RELOAD_SWIM_LOOP = 543
ACT_MP_RELOAD_SWIM_END = 544
ACT_MP_RELOAD_AIRWALK = 545
ACT_MP_RELOAD_AIRWALK_LOOP = 546
ACT_MP_RELOAD_AIRWALK_END = 547
ACT_MP_ATTACK_STAND_PREFIRE = 548
ACT_MP_ATTACK_STAND_POSTFIRE = 549
ACT_MP_ATTACK_STAND_STARTFIRE = 550
ACT_MP_ATTACK_CROUCH_PREFIRE = 551
ACT_MP_ATTACK_CROUCH_POSTFIRE = 552
ACT_MP_ATTACK_SWIM_PREFIRE = 553
ACT_MP_ATTACK_SWIM_POSTFIRE = 554
ACT_MP_STAND_PRIMARY = 555
ACT_MP_CROUCH_PRIMARY = 556
ACT_MP_RUN_PRIMARY = 557
ACT_MP_WALK_PRIMARY = 558
ACT_MP_AIRWALK_PRIMARY = 559
ACT_MP_CROUCHWALK_PRIMARY = 560
ACT_MP_JUMP_PRIMARY = 561
ACT_MP_JUMP_START_PRIMARY = 562
ACT_MP_JUMP_FLOAT_PRIMARY = 563
ACT_MP_JUMP_LAND_PRIMARY = 564
ACT_MP_SWIM_PRIMARY = 565
ACT_MP_DEPLOYED_PRIMARY = 566
ACT_MP_SWIM_DEPLOYED_PRIMARY = 567
ACT_MP_ATTACK_STAND_PRIMARY = 568
ACT_MP_ATTACK_STAND_PRIMARY_DEPLOYED = 569
ACT_MP_ATTACK_CROUCH_PRIMARY = 570
ACT_MP_ATTACK_CROUCH_PRIMARY_DEPLOYED = 571
ACT_MP_ATTACK_SWIM_PRIMARY = 572
ACT_MP_ATTACK_AIRWALK_PRIMARY = 573
ACT_MP_RELOAD_STAND_PRIMARY = 574
ACT_MP_RELOAD_STAND_PRIMARY_LOOP = 575
ACT_MP_RELOAD_STAND_PRIMARY_END = 576
ACT_MP_RELOAD_CROUCH_PRIMARY = 577
ACT_MP_RELOAD_CROUCH_PRIMARY_LOOP = 578
ACT_MP_RELOAD_CROUCH_PRIMARY_END = 579
ACT_MP_RELOAD_SWIM_PRIMARY = 580
ACT_MP_RELOAD_SWIM_PRIMARY_LOOP = 581
ACT_MP_RELOAD_SWIM_PRIMARY_END = 582
ACT_MP_RELOAD_AIRWALK_PRIMARY = 583
ACT_MP_RELOAD_AIRWALK_PRIMARY_LOOP = 584
ACT_MP_RELOAD_AIRWALK_PRIMARY_END = 585
ACT_MP_ATTACK_STAND_GRENADE_PRIMARY = 586
ACT_MP_ATTACK_CROUCH_GRENADE_PRIMARY = 587
ACT_MP_ATTACK_SWIM_GRENADE_PRIMARY = 588
ACT_MP_ATTACK_AIRWALK_GRENADE_PRIMARY = 589
ACT_MP_STAND_SECONDARY = 590
ACT_MP_CROUCH_SECONDARY = 591
ACT_MP_RUN_SECONDARY = 592
ACT_MP_WALK_SECONDARY = 593
ACT_MP_AIRWALK_SECONDARY = 594
ACT_MP_CROUCHWALK_SECONDARY = 595
ACT_MP_JUMP_SECONDARY = 596
ACT_MP_JUMP_START_SECONDARY = 597
ACT_MP_JUMP_FLOAT_SECONDARY = 598
ACT_MP_JUMP_LAND_SECONDARY = 599
ACT_MP_SWIM_SECONDARY = 600
ACT_MP_ATTACK_STAND_SECONDARY = 601
ACT_MP_ATTACK_CROUCH_SECONDARY = 602
ACT_MP_ATTACK_SWIM_SECONDARY = 603
ACT_MP_ATTACK_AIRWALK_SECONDARY = 604
ACT_MP_RELOAD_STAND_SECONDARY = 605
ACT_MP_RELOAD_STAND_SECONDARY_LOOP = 606
ACT_MP_RELOAD_STAND_SECONDARY_END = 607
ACT_MP_RELOAD_CROUCH_SECONDARY = 608
ACT_MP_RELOAD_CROUCH_SECONDARY_LOOP = 609
ACT_MP_RELOAD_CROUCH_SECONDARY_END = 610
ACT_MP_RELOAD_SWIM_SECONDARY = 611
ACT_MP_RELOAD_SWIM_SECONDARY_LOOP = 612
ACT_MP_RELOAD_SWIM_SECONDARY_END = 613
ACT_MP_RELOAD_AIRWALK_SECONDARY = 614
ACT_MP_RELOAD_AIRWALK_SECONDARY_LOOP = 615
ACT_MP_RELOAD_AIRWALK_SECONDARY_END = 616
ACT_MP_ATTACK_STAND_GRENADE_SECONDARY = 617
ACT_MP_ATTACK_CROUCH_GRENADE_SECONDARY = 618
ACT_MP_ATTACK_SWIM_GRENADE_SECONDARY = 619
ACT_MP_ATTACK_AIRWALK_GRENADE_SECONDARY = 620
ACT_MP_STAND_MELEE = 621
ACT_MP_CROUCH_MELEE = 622
ACT_MP_RUN_MELEE = 623
ACT_MP_WALK_MELEE = 624
ACT_MP_AIRWALK_MELEE = 625
ACT_MP_CROUCHWALK_MELEE = 626
ACT_MP_JUMP_MELEE = 627
ACT_MP_JUMP_START_MELEE = 628
ACT_MP_JUMP_FLOAT_MELEE = 629
ACT_MP_JUMP_LAND_MELEE = 630
ACT_MP_SWIM_MELEE = 631
ACT_MP_ATTACK_STAND_MELEE = 632
ACT_MP_ATTACK_STAND_MELEE_SECONDARY = 633
ACT_MP_ATTACK_CROUCH_MELEE = 634
ACT_MP_ATTACK_CROUCH_MELEE_SECONDARY = 635
ACT_MP_ATTACK_SWIM_MELEE = 636
ACT_MP_ATTACK_AIRWALK_MELEE = 637
ACT_MP_ATTACK_STAND_GRENADE_MELEE = 638
ACT_MP_ATTACK_CROUCH_GRENADE_MELEE = 639
ACT_MP_ATTACK_SWIM_GRENADE_MELEE = 640
ACT_MP_ATTACK_AIRWALK_GRENADE_MELEE = 641
ACT_MP_STAND_ITEM1 = 642
ACT_MP_CROUCH_ITEM1 = 643
ACT_MP_RUN_ITEM1 = 644
ACT_MP_WALK_ITEM1 = 645
ACT_MP_AIRWALK_ITEM1 = 646
ACT_MP_CROUCHWALK_ITEM1 = 647
ACT_MP_JUMP_ITEM1 = 648
ACT_MP_JUMP_START_ITEM1 = 649
ACT_MP_JUMP_FLOAT_ITEM1 = 650
ACT_MP_JUMP_LAND_ITEM1 = 651
ACT_MP_SWIM_ITEM1 = 652
ACT_MP_ATTACK_STAND_ITEM1 = 653
ACT_MP_ATTACK_STAND_ITEM1_SECONDARY = 654
ACT_MP_ATTACK_CROUCH_ITEM1 = 655
ACT_MP_ATTACK_CROUCH_ITEM1_SECONDARY = 656
ACT_MP_ATTACK_SWIM_ITEM1 = 657
ACT_MP_ATTACK_AIRWALK_ITEM1 = 658
ACT_MP_STAND_ITEM2 = 659
ACT_MP_CROUCH_ITEM2 = 660
ACT_MP_RUN_ITEM2 = 661
ACT_MP_WALK_ITEM2 = 662
ACT_MP_AIRWALK_ITEM2 = 663
ACT_MP_CROUCHWALK_ITEM2 = 664
ACT_MP_JUMP_ITEM2 = 665
ACT_MP_JUMP_START_ITEM2 = 666
ACT_MP_JUMP_FLOAT_ITEM2 = 667
ACT_MP_JUMP_LAND_ITEM2 = 668
ACT_MP_SWIM_ITEM2 = 669
ACT_MP_ATTACK_STAND_ITEM2 = 670
ACT_MP_ATTACK_STAND_ITEM2_SECONDARY = 671
ACT_MP_ATTACK_CROUCH_ITEM2 = 672
ACT_MP_ATTACK_CROUCH_ITEM2_SECONDARY = 673
ACT_MP_ATTACK_SWIM_ITEM2 = 674
ACT_MP_ATTACK_AIRWALK_ITEM2 = 675
ACT_MP_GESTURE_FLINCH = 676
ACT_MP_GESTURE_FLINCH_PRIMARY = 677
ACT_MP_GESTURE_FLINCH_SECONDARY = 678
ACT_MP_GESTURE_FLINCH_MELEE = 679
ACT_MP_GESTURE_FLINCH_ITEM1 = 680
ACT_MP_GESTURE_FLINCH_ITEM2 = 681
ACT_MP_GESTURE_FLINCH_HEAD = 682
ACT_MP_GESTURE_FLINCH_CHEST = 683
ACT_MP_GESTURE_FLINCH_STOMACH = 684
ACT_MP_GESTURE_FLINCH_LEFTARM = 685
ACT_MP_GESTURE_FLINCH_RIGHTARM = 686
ACT_MP_GESTURE_FLINCH_LEFTLEG = 687
ACT_MP_GESTURE_FLINCH_RIGHTLEG = 688
ACT_MP_GRENADE1_DRAW = 689
ACT_MP_GRENADE1_IDLE = 690
ACT_MP_GRENADE1_ATTACK = 691
ACT_MP_GRENADE2_DRAW = 692
ACT_MP_GRENADE2_IDLE = 693
ACT_MP_GRENADE2_ATTACK = 694
ACT_MP_PRIMARY_GRENADE1_DRAW = 695
ACT_MP_PRIMARY_GRENADE1_IDLE = 696
ACT_MP_PRIMARY_GRENADE1_ATTACK = 697
ACT_MP_PRIMARY_GRENADE2_DRAW = 698
ACT_MP_PRIMARY_GRENADE2_IDLE = 699
ACT_MP_PRIMARY_GRENADE2_ATTACK = 700
ACT_MP_SECONDARY_GRENADE1_DRAW = 701
ACT_MP_SECONDARY_GRENADE1_IDLE = 702
ACT_MP_SECONDARY_GRENADE1_ATTACK = 703
ACT_MP_SECONDARY_GRENADE2_DRAW = 704
ACT_MP_SECONDARY_GRENADE2_IDLE = 705
ACT_MP_SECONDARY_GRENADE2_ATTACK = 706
ACT_MP_MELEE_GRENADE1_DRAW = 707
ACT_MP_MELEE_GRENADE1_IDLE = 708
ACT_MP_MELEE_GRENADE1_ATTACK = 709
ACT_MP_MELEE_GRENADE2_DRAW = 710
ACT_MP_MELEE_GRENADE2_IDLE = 711
ACT_MP_MELEE_GRENADE2_ATTACK = 712
ACT_MP_ITEM1_GRENADE1_DRAW = 713
ACT_MP_ITEM1_GRENADE1_IDLE = 714
ACT_MP_ITEM1_GRENADE1_ATTACK = 715
ACT_MP_ITEM1_GRENADE2_DRAW = 716
ACT_MP_ITEM1_GRENADE2_IDLE = 717
ACT_MP_ITEM1_GRENADE2_ATTACK = 718
ACT_MP_ITEM2_GRENADE1_DRAW = 719
ACT_MP_ITEM2_GRENADE1_IDLE = 720
ACT_MP_ITEM2_GRENADE1_ATTACK = 721
ACT_MP_ITEM2_GRENADE2_DRAW = 722
ACT_MP_ITEM2_GRENADE2_IDLE = 723
ACT_MP_ITEM2_GRENADE2_ATTACK = 724
ACT_MP_STAND_BUILDING = 725
ACT_MP_CROUCH_BUILDING = 726
ACT_MP_RUN_BUILDING = 727
ACT_MP_WALK_BUILDING = 728
ACT_MP_AIRWALK_BUILDING = 729
ACT_MP_CROUCHWALK_BUILDING = 730
ACT_MP_JUMP_BUILDING = 731
ACT_MP_JUMP_START_BUILDING = 732
ACT_MP_JUMP_FLOAT_BUILDING = 733
ACT_MP_JUMP_LAND_BUILDING = 734
ACT_MP_SWIM_BUILDING = 735
ACT_MP_ATTACK_STAND_BUILDING = 736
ACT_MP_ATTACK_CROUCH_BUILDING = 737
ACT_MP_ATTACK_SWIM_BUILDING = 738
ACT_MP_ATTACK_AIRWALK_BUILDING = 739
ACT_MP_ATTACK_STAND_GRENADE_BUILDING = 740
ACT_MP_ATTACK_CROUCH_GRENADE_BUILDING = 741
ACT_MP_ATTACK_SWIM_GRENADE_BUILDING = 742
ACT_MP_ATTACK_AIRWALK_GRENADE_BUILDING = 743
ACT_MP_STAND_PDA = 744
ACT_MP_CROUCH_PDA = 745
ACT_MP_RUN_PDA = 746
ACT_MP_WALK_PDA = 747
ACT_MP_AIRWALK_PDA = 748
ACT_MP_CROUCHWALK_PDA = 749
ACT_MP_JUMP_PDA = 750
ACT_MP_JUMP_START_PDA = 751
ACT_MP_JUMP_FLOAT_PDA = 752
ACT_MP_JUMP_LAND_PDA = 753
ACT_MP_SWIM_PDA = 754
ACT_MP_ATTACK_STAND_PDA = 755
ACT_MP_ATTACK_SWIM_PDA = 756
ACT_MP_GESTURE_VC_HANDMOUTH = 757
ACT_MP_GESTURE_VC_FINGERPOINT = 758
ACT_MP_GESTURE_VC_FISTPUMP = 759
ACT_MP_GESTURE_VC_THUMBSUP = 760
ACT_MP_GESTURE_VC_NODYES = 761
ACT_MP_GESTURE_VC_NODNO = 762
ACT_MP_GESTURE_VC_HANDMOUTH_PRIMARY = 763
ACT_MP_GESTURE_VC_FINGERPOINT_PRIMARY = 764
ACT_MP_GESTURE_VC_FISTPUMP_PRIMARY = 765
ACT_MP_GESTURE_VC_THUMBSUP_PRIMARY = 766
ACT_MP_GESTURE_VC_NODYES_PRIMARY = 767
ACT_MP_GESTURE_VC_NODNO_PRIMARY = 768
ACT_MP_GESTURE_VC_HANDMOUTH_SECONDARY = 769
ACT_MP_GESTURE_VC_FINGERPOINT_SECONDARY = 770
ACT_MP_GESTURE_VC_FISTPUMP_SECONDARY = 771
ACT_MP_GESTURE_VC_THUMBSUP_SECONDARY = 772
ACT_MP_GESTURE_VC_NODYES_SECONDARY = 773
ACT_MP_GESTURE_VC_NODNO_SECONDARY = 774
ACT_MP_GESTURE_VC_HANDMOUTH_MELEE = 775
ACT_MP_GESTURE_VC_FINGERPOINT_MELEE = 776
ACT_MP_GESTURE_VC_FISTPUMP_MELEE = 777
ACT_MP_GESTURE_VC_THUMBSUP_MELEE = 778
ACT_MP_GESTURE_VC_NODYES_MELEE = 779
ACT_MP_GESTURE_VC_NODNO_MELEE = 780
ACT_MP_GESTURE_VC_HANDMOUTH_ITEM1 = 781
ACT_MP_GESTURE_VC_FINGERPOINT_ITEM1 = 782
ACT_MP_GESTURE_VC_FISTPUMP_ITEM1 = 783
ACT_MP_GESTURE_VC_THUMBSUP_ITEM1 = 784
ACT_MP_GESTURE_VC_NODYES_ITEM1 = 785
ACT_MP_GESTURE_VC_NODNO_ITEM1 = 786
ACT_MP_GESTURE_VC_HANDMOUTH_ITEM2 = 787
ACT_MP_GESTURE_VC_FINGERPOINT_ITEM2 = 788
ACT_MP_GESTURE_VC_FISTPUMP_ITEM2 = 789
ACT_MP_GESTURE_VC_THUMBSUP_ITEM2 = 790
ACT_MP_GESTURE_VC_NODYES_ITEM2 = 791
ACT_MP_GESTURE_VC_NODNO_ITEM2 = 792
ACT_MP_GESTURE_VC_HANDMOUTH_BUILDING = 793
ACT_MP_GESTURE_VC_FINGERPOINT_BUILDING = 794
ACT_MP_GESTURE_VC_FISTPUMP_BUILDING = 795
ACT_MP_GESTURE_VC_THUMBSUP_BUILDING = 796
ACT_MP_GESTURE_VC_NODYES_BUILDING = 797
ACT_MP_GESTURE_VC_NODNO_BUILDING = 798
ACT_MP_GESTURE_VC_HANDMOUTH_PDA = 799
ACT_MP_GESTURE_VC_FINGERPOINT_PDA = 800
ACT_MP_GESTURE_VC_FISTPUMP_PDA = 801
ACT_MP_GESTURE_VC_THUMBSUP_PDA = 802
ACT_MP_GESTURE_VC_NODYES_PDA = 803
ACT_MP_GESTURE_VC_NODNO_PDA = 804
ACT_VM_UNUSABLE = 805
ACT_VM_UNUSABLE_TO_USABLE = 806
ACT_VM_USABLE_TO_UNUSABLE = 807
ACT_PRIMARY_VM_DRAW = 808
ACT_PRIMARY_VM_HOLSTER = 809
ACT_PRIMARY_VM_IDLE = 810
ACT_PRIMARY_VM_PULLBACK = 811
ACT_PRIMARY_VM_PRIMARYATTACK = 812
ACT_PRIMARY_VM_SECONDARYATTACK = 813
ACT_PRIMARY_VM_RELOAD = 814
ACT_PRIMARY_VM_DRYFIRE = 815
ACT_PRIMARY_VM_IDLE_TO_LOWERED = 816
ACT_PRIMARY_VM_IDLE_LOWERED = 817
ACT_PRIMARY_VM_LOWERED_TO_IDLE = 818
ACT_SECONDARY_VM_DRAW = 819
ACT_SECONDARY_VM_HOLSTER = 820
ACT_SECONDARY_VM_IDLE = 821
ACT_SECONDARY_VM_PULLBACK = 822
ACT_SECONDARY_VM_PRIMARYATTACK = 823
ACT_SECONDARY_VM_SECONDARYATTACK = 824
ACT_SECONDARY_VM_RELOAD = 825
ACT_SECONDARY_VM_DRYFIRE = 826
ACT_SECONDARY_VM_IDLE_TO_LOWERED = 827
ACT_SECONDARY_VM_IDLE_LOWERED = 828
ACT_SECONDARY_VM_LOWERED_TO_IDLE = 829
ACT_MELEE_VM_DRAW = 830
ACT_MELEE_VM_HOLSTER = 831
ACT_MELEE_VM_IDLE = 832
ACT_MELEE_VM_PULLBACK = 833
ACT_MELEE_VM_PRIMARYATTACK = 834
ACT_MELEE_VM_SECONDARYATTACK = 835
ACT_MELEE_VM_RELOAD = 836
ACT_MELEE_VM_DRYFIRE = 837
ACT_MELEE_VM_IDLE_TO_LOWERED = 838
ACT_MELEE_VM_IDLE_LOWERED = 839
ACT_MELEE_VM_LOWERED_TO_IDLE = 840
ACT_PDA_VM_DRAW = 841
ACT_PDA_VM_HOLSTER = 842
ACT_PDA_VM_IDLE = 843
ACT_PDA_VM_PULLBACK = 844
ACT_PDA_VM_PRIMARYATTACK = 845
ACT_PDA_VM_SECONDARYATTACK = 846
ACT_PDA_VM_RELOAD = 847
ACT_PDA_VM_DRYFIRE = 848
ACT_PDA_VM_IDLE_TO_LOWERED = 849
ACT_PDA_VM_IDLE_LOWERED = 850
ACT_PDA_VM_LOWERED_TO_IDLE = 851
ACT_ITEM1_VM_DRAW = 852
ACT_ITEM1_VM_HOLSTER = 853
ACT_ITEM1_VM_IDLE = 854
ACT_ITEM1_VM_PULLBACK = 855
ACT_ITEM1_VM_PRIMARYATTACK = 856
ACT_ITEM1_VM_SECONDARYATTACK = 857
ACT_ITEM1_VM_RELOAD = 858
ACT_ITEM1_VM_DRYFIRE = 859
ACT_ITEM1_VM_IDLE_TO_LOWERED = 860
ACT_ITEM1_VM_IDLE_LOWERED = 861
ACT_ITEM1_VM_LOWERED_TO_IDLE = 862
ACT_ITEM2_VM_DRAW = 863
ACT_ITEM2_VM_HOLSTER = 864
ACT_ITEM2_VM_IDLE = 865
ACT_ITEM2_VM_PULLBACK = 866
ACT_ITEM2_VM_PRIMARYATTACK = 867
ACT_ITEM2_VM_SECONDARYATTACK = 868
ACT_ITEM2_VM_RELOAD = 869
ACT_ITEM2_VM_DRYFIRE = 870
ACT_ITEM2_VM_IDLE_TO_LOWERED = 871
ACT_ITEM2_VM_IDLE_LOWERED = 872
ACT_ITEM2_VM_LOWERED_TO_IDLE = 873
ACT_RELOAD_SUCCEED = 874
ACT_RELOAD_FAIL = 875
ACT_WALK_AIM_AUTOGUN = 876
ACT_RUN_AIM_AUTOGUN = 877
ACT_IDLE_AUTOGUN = 878
ACT_IDLE_AIM_AUTOGUN = 879
ACT_RELOAD_AUTOGUN = 880
ACT_CROUCH_IDLE_AUTOGUN = 881
ACT_RANGE_ATTACK_AUTOGUN = 882
ACT_JUMP_AUTOGUN = 883
ACT_IDLE_AIM_PISTOL = 884
ACT_WALK_AIM_DUAL = 885
ACT_RUN_AIM_DUAL = 886
ACT_IDLE_DUAL = 887
ACT_IDLE_AIM_DUAL = 888
ACT_RELOAD_DUAL = 889
ACT_CROUCH_IDLE_DUAL = 890
ACT_RANGE_ATTACK_DUAL = 891
ACT_JUMP_DUAL = 892
ACT_IDLE_AIM_SHOTGUN = 893
ACT_CROUCH_IDLE_SHOTGUN = 894
ACT_IDLE_AIM_RIFLE = 895
ACT_CROUCH_IDLE_RIFLE = 896
ACT_RANGE_ATTACK_RIFLE = 897
ACT_SLEEP = 898
ACT_WAKE = 899
ACT_FLICK_LEFT = 900
ACT_FLICK_LEFT_MIDDLE = 901
ACT_FLICK_RIGHT_MIDDLE = 902
ACT_FLICK_RIGHT = 903
ACT_SPINAROUND = 904
ACT_PREP_TO_FIRE = 905
ACT_FIRE = 906
ACT_FIRE_RECOVER = 907
ACT_SPRAY = 908
ACT_PREP_EXPLODE = 909
ACT_EXPLODE = 910
ACT_SCRIPT_CUSTOM_0 = 911
ACT_SCRIPT_CUSTOM_1 = 912
ACT_SCRIPT_CUSTOM_2 = 913
ACT_SCRIPT_CUSTOM_3 = 914
ACT_SCRIPT_CUSTOM_4 = 915
ACT_SCRIPT_CUSTOM_5 = 916
ACT_SCRIPT_CUSTOM_6 = 917
ACT_SCRIPT_CUSTOM_7 = 918
ACT_SCRIPT_CUSTOM_8 = 919
ACT_SCRIPT_CUSTOM_9 = 920
ACT_SCRIPT_CUSTOM_10 = 921
ACT_SCRIPT_CUSTOM_11 = 922
ACT_SCRIPT_CUSTOM_12 = 923
ACT_SCRIPT_CUSTOM_13 = 924
ACT_SCRIPT_CUSTOM_14 = 925
ACT_SCRIPT_CUSTOM_15 = 926
ACT_SCRIPT_CUSTOM_16 = 927
ACT_SCRIPT_CUSTOM_17 = 928
ACT_SCRIPT_CUSTOM_18 = 929
ACT_SCRIPT_CUSTOM_19 = 930
ACT_SCRIPT_CUSTOM_20 = 931
ACT_SCRIPT_CUSTOM_21 = 932
ACT_SCRIPT_CUSTOM_22 = 933
ACT_SCRIPT_CUSTOM_23 = 934
ACT_SCRIPT_CUSTOM_24 = 935
ACT_SCRIPT_CUSTOM_25 = 936
ACT_SCRIPT_CUSTOM_26 = 937
ACT_SCRIPT_CUSTOM_27 = 938
ACT_SCRIPT_CUSTOM_28 = 939
ACT_SCRIPT_CUSTOM_29 = 940
ACT_SCRIPT_CUSTOM_30 = 941
ACT_SCRIPT_CUSTOM_31 = 942
ACT_VR_PISTOL_LAST_SHOT = 943
ACT_VR_PISTOL_SLIDE_RELEASE = 944
ACT_VR_PISTOL_CLIP_OUT_CHAMBERED = 945
ACT_VR_PISTOL_CLIP_OUT_SLIDE_BACK = 946
ACT_VR_PISTOL_CLIP_IN_CHAMBERED = 947
ACT_VR_PISTOL_CLIP_IN_SLIDE_BACK = 948
ACT_VR_PISTOL_IDLE_SLIDE_BACK = 949
ACT_VR_PISTOL_IDLE_SLIDE_BACK_CLIP_READY = 950
ACT_RAGDOLL_RECOVERY_FRONT = 951
ACT_RAGDOLL_RECOVERY_BACK = 952
ACT_RAGDOLL_RECOVERY_LEFT = 953
ACT_RAGDOLL_RECOVERY_RIGHT = 954
ACT_GRABBITYGLOVES_GRAB = 955
ACT_GRABBITYGLOVES_RELEASE = 956
ACT_GRABBITYGLOVES_GRAB_IDLE = 957
ACT_GRABBITYGLOVES_ACTIVE = 958
ACT_GRABBITYGLOVES_ACTIVE_IDLE = 959
ACT_GRABBITYGLOVES_DEACTIVATE = 960
ACT_GRABBITYGLOVES_PULL = 961
ACT_HEADCRAB_SMOKE_BOMB = 962
ACT_HEADCRAB_SPIT = 963
ACT_ZOMBIE_TRIP = 964
ACT_ZOMBIE_LUNGE = 965
ACT_NEUTRAL_REF_POSE = 966
ACT_ANTLION_SCUTTLE_FORWARD = 967
ACT_ANTLION_SCUTTLE_BACK = 968
ACT_ANTLION_SCUTTLE_LEFT = 969
ACT_ANTLION_SCUTTLE_RIGHT = 970
ACT_VR_PISTOL_EMPTY_CLIP_IN_SLIDE_BACK = 971
ACT_VR_SHOTGUN_IDLE = 972
ACT_VR_SHOTGUN_OPEN_CHAMBER = 973
ACT_VR_SHOTGUN_RELOAD_1 = 974
ACT_VR_SHOTGUN_RELOAD_2 = 975
ACT_VR_SHOTGUN_RELOAD_3 = 976
ACT_VR_SHOTGUN_CLOSE_CHAMBER = 977
ACT_VR_SHOTGUN_TRIGGER_SQUEEZE = 978
ACT_VR_SHOTGUN_SHOOT = 979
ACT_VR_SHOTGUN_SLIDE_BACK = 980
ACT_VR_SHOTGUN_SLIDE_FORWARD = 981
ACT_VR_PISTOL_LONG_CLIP_IN_CHAMBERED = 982
ACT_VR_PISTOL_LONG_CLIP_IN_SLIDE_BACK = 983
ACT_VR_PISTOL_BURST_TOGGLE = 984
ACT_VR_PISTOL_LOW_KICK = 985
ACT_VR_PISTOL_BURST_ATTACK = 986
ACT_VR_SHOTGUN_GRENADE_TWIST = 987
ACT_DIE_STAND = 988
ACT_DIE_STAND_HEADSHOT = 989
ACT_DIE_CROUCH = 990
ACT_DIE_CROUCH_HEADSHOT = 991
ACT_CSGO_NULL = 992
ACT_CSGO_DEFUSE = 993
ACT_CSGO_DEFUSE_WITH_KIT = 994
ACT_CSGO_FLASHBANG_REACTION = 995
ACT_CSGO_FIRE_PRIMARY = 996
ACT_CSGO_FIRE_PRIMARY_OPT_1 = 997
ACT_CSGO_FIRE_PRIMARY_OPT_2 = 998
ACT_CSGO_FIRE_SECONDARY = 999
ACT_CSGO_FIRE_SECONDARY_OPT_1 = 1000
ACT_CSGO_FIRE_SECONDARY_OPT_2 = 1001
ACT_CSGO_RELOAD = 1002
ACT_CSGO_RELOAD_START = 1003
ACT_CSGO_RELOAD_LOOP = 1004
ACT_CSGO_RELOAD_END = 1005
ACT_CSGO_OPERATE = 1006
ACT_CSGO_DEPLOY = 1007
ACT_CSGO_CATCH = 1008
ACT_CSGO_SILENCER_DETACH = 1009
ACT_CSGO_SILENCER_ATTACH = 1010
ACT_CSGO_TWITCH = 1011
ACT_CSGO_TWITCH_BUYZONE = 1012
ACT_CSGO_PLANT_BOMB = 1013
ACT_CSGO_IDLE_TURN_BALANCEADJUST = 1014
ACT_CSGO_IDLE_ADJUST_STOPPEDMOVING = 1015
ACT_CSGO_ALIVE_LOOP = 1016
ACT_CSGO_FLINCH = 1017
ACT_CSGO_FLINCH_HEAD = 1018
ACT_CSGO_FLINCH_MOLOTOV = 1019
ACT_CSGO_JUMP = 1020
ACT_CSGO_FALL = 1021
ACT_CSGO_CLIMB_LADDER = 1022
ACT_CSGO_LAND_LIGHT = 1023
ACT_CSGO_LAND_HEAVY = 1024
ACT_CSGO_EXIT_LADDER_TOP = 1025
ACT_CSGO_EXIT_LADDER_BOTTOM = 1026
ACT_CSGO_PARACHUTE = 1027
ACT_CSGO_TAUNT = 1028
ACT_DOTA_IDLE = 1500
ACT_DOTA_IDLE_RARE = 1501
ACT_DOTA_RUN = 1502
ACT_DOTA_ATTACK = 1503
ACT_DOTA_ATTACK2 = 1504
ACT_DOTA_ATTACK_EVENT = 1505
ACT_DOTA_DIE = 1506
ACT_DOTA_FLINCH = 1507
ACT_DOTA_FLAIL = 1508
ACT_DOTA_DISABLED = 1509
ACT_DOTA_CAST_ABILITY_1 = 1510
ACT_DOTA_CAST_ABILITY_2 = 1511
ACT_DOTA_CAST_ABILITY_3 = 1512
ACT_DOTA_CAST_ABILITY_4 = 1513
ACT_DOTA_CAST_ABILITY_5 = 1514
ACT_DOTA_CAST_ABILITY_6 = 1515
ACT_DOTA_OVERRIDE_ABILITY_1 = 1516
ACT_DOTA_OVERRIDE_ABILITY_2 = 1517
ACT_DOTA_OVERRIDE_ABILITY_3 = 1518
ACT_DOTA_OVERRIDE_ABILITY_4 = 1519
ACT_DOTA_CHANNEL_ABILITY_1 = 1520
ACT_DOTA_CHANNEL_ABILITY_2 = 1521
ACT_DOTA_CHANNEL_ABILITY_3 = 1522
ACT_DOTA_CHANNEL_ABILITY_4 = 1523
ACT_DOTA_CHANNEL_ABILITY_5 = 1524
ACT_DOTA_CHANNEL_ABILITY_6 = 1525
ACT_DOTA_CHANNEL_END_ABILITY_1 = 1526
ACT_DOTA_CHANNEL_END_ABILITY_2 = 1527
ACT_DOTA_CHANNEL_END_ABILITY_3 = 1528
ACT_DOTA_CHANNEL_END_ABILITY_4 = 1529
ACT_DOTA_CHANNEL_END_ABILITY_5 = 1530
ACT_DOTA_CHANNEL_END_ABILITY_6 = 1531
ACT_DOTA_CONSTANT_LAYER = 1532
ACT_DOTA_CAPTURE = 1533
ACT_DOTA_SPAWN = 1534
ACT_DOTA_KILLTAUNT = 1535
ACT_DOTA_TAUNT = 1536
ACT_DOTA_THIRST = 1537
ACT_DOTA_CAST_DRAGONBREATH = 1538
ACT_DOTA_ECHO_SLAM = 1539
ACT_DOTA_CAST_ABILITY_1_END = 1540
ACT_DOTA_CAST_ABILITY_2_END = 1541
ACT_DOTA_CAST_ABILITY_3_END = 1542
ACT_DOTA_CAST_ABILITY_4_END = 1543
ACT_MIRANA_LEAP_END = 1544
ACT_WAVEFORM_START = 1545
ACT_WAVEFORM_END = 1546
ACT_DOTA_CAST_ABILITY_ROT = 1547
ACT_DOTA_DIE_SPECIAL = 1548
ACT_DOTA_RATTLETRAP_BATTERYASSAULT = 1549
ACT_DOTA_RATTLETRAP_POWERCOGS = 1550
ACT_DOTA_RATTLETRAP_HOOKSHOT_START = 1551
ACT_DOTA_RATTLETRAP_HOOKSHOT_LOOP = 1552
ACT_DOTA_RATTLETRAP_HOOKSHOT_END = 1553
ACT_STORM_SPIRIT_OVERLOAD_RUN_OVERRIDE = 1554
ACT_DOTA_TINKER_REARM1 = 1555
ACT_DOTA_TINKER_REARM2 = 1556
ACT_DOTA_TINKER_REARM3 = 1557
ACT_TINY_AVALANCHE = 1558
ACT_TINY_TOSS = 1559
ACT_TINY_GROWL = 1560
ACT_DOTA_WEAVERBUG_ATTACH = 1561
ACT_DOTA_CAST_WILD_AXES_END = 1562
ACT_DOTA_CAST_LIFE_BREAK_START = 1563
ACT_DOTA_CAST_LIFE_BREAK_END = 1564
ACT_DOTA_NIGHTSTALKER_TRANSITION = 1565
ACT_DOTA_LIFESTEALER_RAGE = 1566
ACT_DOTA_LIFESTEALER_OPEN_WOUNDS = 1567
ACT_DOTA_SAND_KING_BURROW_IN = 1568
ACT_DOTA_SAND_KING_BURROW_OUT = 1569
ACT_DOTA_EARTHSHAKER_TOTEM_ATTACK = 1570
ACT_DOTA_WHEEL_LAYER = 1571
ACT_DOTA_ALCHEMIST_CHEMICAL_RAGE_START = 1572
ACT_DOTA_ALCHEMIST_CONCOCTION = 1573
ACT_DOTA_JAKIRO_LIQUIDFIRE_START = 1574
ACT_DOTA_JAKIRO_LIQUIDFIRE_LOOP = 1575
ACT_DOTA_LIFESTEALER_INFEST = 1576
ACT_DOTA_LIFESTEALER_INFEST_END = 1577
ACT_DOTA_LASSO_LOOP = 1578
ACT_DOTA_ALCHEMIST_CONCOCTION_THROW = 1579
ACT_DOTA_ALCHEMIST_CHEMICAL_RAGE_END = 1580
ACT_DOTA_CAST_COLD_SNAP = 1581
ACT_DOTA_CAST_GHOST_WALK = 1582
ACT_DOTA_CAST_TORNADO = 1583
ACT_DOTA_CAST_EMP = 1584
ACT_DOTA_CAST_ALACRITY = 1585
ACT_DOTA_CAST_CHAOS_METEOR = 1586
ACT_DOTA_CAST_SUN_STRIKE = 1587
ACT_DOTA_CAST_FORGE_SPIRIT = 1588
ACT_DOTA_CAST_ICE_WALL = 1589
ACT_DOTA_CAST_DEAFENING_BLAST = 1590
ACT_DOTA_VICTORY = 1591
ACT_DOTA_DEFEAT = 1592
ACT_DOTA_SPIRIT_BREAKER_CHARGE_POSE = 1593
ACT_DOTA_SPIRIT_BREAKER_CHARGE_END = 1594
ACT_DOTA_TELEPORT = 1595
ACT_DOTA_TELEPORT_END = 1596
ACT_DOTA_CAST_REFRACTION = 1597
ACT_DOTA_CAST_ABILITY_7 = 1598
ACT_DOTA_CANCEL_SIREN_SONG = 1599
ACT_DOTA_CHANNEL_ABILITY_7 = 1600
ACT_DOTA_LOADOUT = 1601
ACT_DOTA_FORCESTAFF_END = 1602
ACT_DOTA_POOF_END = 1603
ACT_DOTA_SLARK_POUNCE = 1604
ACT_DOTA_MAGNUS_SKEWER_START = 1605
ACT_DOTA_MAGNUS_SKEWER_END = 1606
ACT_DOTA_MEDUSA_STONE_GAZE = 1607
ACT_DOTA_RELAX_START = 1608
ACT_DOTA_RELAX_LOOP = 1609
ACT_DOTA_RELAX_END = 1610
ACT_DOTA_CENTAUR_STAMPEDE = 1611
ACT_DOTA_BELLYACHE_START = 1612
ACT_DOTA_BELLYACHE_LOOP = 1613
ACT_DOTA_BELLYACHE_END = 1614
ACT_DOTA_ROQUELAIRE_LAND = 1615
ACT_DOTA_ROQUELAIRE_LAND_IDLE = 1616
ACT_DOTA_GREEVIL_CAST = 1617
ACT_DOTA_GREEVIL_OVERRIDE_ABILITY = 1618
ACT_DOTA_GREEVIL_HOOK_START = 1619
ACT_DOTA_GREEVIL_HOOK_END = 1620
ACT_DOTA_GREEVIL_BLINK_BONE = 1621
ACT_DOTA_IDLE_SLEEPING = 1622
ACT_DOTA_INTRO = 1623
ACT_DOTA_GESTURE_POINT = 1624
ACT_DOTA_GESTURE_ACCENT = 1625
ACT_DOTA_SLEEPING_END = 1626
ACT_DOTA_AMBUSH = 1627
ACT_DOTA_ITEM_LOOK = 1628
ACT_DOTA_STARTLE = 1629
ACT_DOTA_FRUSTRATION = 1630
ACT_DOTA_TELEPORT_REACT = 1631
ACT_DOTA_TELEPORT_END_REACT = 1632
ACT_DOTA_SHRUG = 1633
ACT_DOTA_RELAX_LOOP_END = 1634
ACT_DOTA_PRESENT_ITEM = 1635
ACT_DOTA_IDLE_IMPATIENT = 1636
ACT_DOTA_SHARPEN_WEAPON = 1637
ACT_DOTA_SHARPEN_WEAPON_OUT = 1638
ACT_DOTA_IDLE_SLEEPING_END = 1639
ACT_DOTA_BRIDGE_DESTROY = 1640
ACT_DOTA_TAUNT_SNIPER = 1641
ACT_DOTA_DEATH_BY_SNIPER = 1642
ACT_DOTA_LOOK_AROUND = 1643
ACT_DOTA_CAGED_CREEP_RAGE = 1644
ACT_DOTA_CAGED_CREEP_RAGE_OUT = 1645
ACT_DOTA_CAGED_CREEP_SMASH = 1646
ACT_DOTA_CAGED_CREEP_SMASH_OUT = 1647
ACT_DOTA_IDLE_IMPATIENT_SWORD_TAP = 1648
ACT_DOTA_INTRO_LOOP = 1649
ACT_DOTA_BRIDGE_THREAT = 1650
ACT_DOTA_DAGON = 1651
ACT_DOTA_CAST_ABILITY_2_ES_ROLL_START = 1652
ACT_DOTA_CAST_ABILITY_2_ES_ROLL = 1653
ACT_DOTA_CAST_ABILITY_2_ES_ROLL_END = 1654
ACT_DOTA_NIAN_PIN_START = 1655
ACT_DOTA_NIAN_PIN_LOOP = 1656
ACT_DOTA_NIAN_PIN_END = 1657
ACT_DOTA_LEAP_STUN = 1658
ACT_DOTA_LEAP_SWIPE = 1659
ACT_DOTA_NIAN_INTRO_LEAP = 1660
ACT_DOTA_AREA_DENY = 1661
ACT_DOTA_NIAN_PIN_TO_STUN = 1662
ACT_DOTA_RAZE_1 = 1663
ACT_DOTA_RAZE_2 = 1664
ACT_DOTA_RAZE_3 = 1665
ACT_DOTA_UNDYING_DECAY = 1666
ACT_DOTA_UNDYING_SOUL_RIP = 1667
ACT_DOTA_UNDYING_TOMBSTONE = 1668
ACT_DOTA_WHIRLING_AXES_RANGED = 1669
ACT_DOTA_SHALLOW_GRAVE = 1670
ACT_DOTA_COLD_FEET = 1671
ACT_DOTA_ICE_VORTEX = 1672
ACT_DOTA_CHILLING_TOUCH = 1673
ACT_DOTA_ENFEEBLE = 1674
ACT_DOTA_FATAL_BONDS = 1675
ACT_DOTA_MIDNIGHT_PULSE = 1676
ACT_DOTA_ANCESTRAL_SPIRIT = 1677
ACT_DOTA_THUNDER_STRIKE = 1678
ACT_DOTA_KINETIC_FIELD = 1679
ACT_DOTA_STATIC_STORM = 1680
ACT_DOTA_MINI_TAUNT = 1681
ACT_DOTA_ARCTIC_BURN_END = 1682
ACT_DOTA_LOADOUT_RARE = 1683
ACT_DOTA_SWIM = 1684
ACT_DOTA_FLEE = 1685
ACT_DOTA_TROT = 1686
ACT_DOTA_SHAKE = 1687
ACT_DOTA_SWIM_IDLE = 1688
ACT_DOTA_WAIT_IDLE = 1689
ACT_DOTA_GREET = 1690
ACT_DOTA_TELEPORT_COOP_START = 1691
ACT_DOTA_TELEPORT_COOP_WAIT = 1692
ACT_DOTA_TELEPORT_COOP_END = 1693
ACT_DOTA_TELEPORT_COOP_EXIT = 1694
ACT_DOTA_SHOPKEEPER_PET_INTERACT = 1695
ACT_DOTA_ITEM_PICKUP = 1696
ACT_DOTA_ITEM_DROP = 1697
ACT_DOTA_CAPTURE_PET = 1698
ACT_DOTA_PET_WARD_OBSERVER = 1699
ACT_DOTA_PET_WARD_SENTRY = 1700
ACT_DOTA_PET_LEVEL = 1701
ACT_DOTA_CAST_BURROW_END = 1702
ACT_DOTA_LIFESTEALER_ASSIMILATE = 1703
ACT_DOTA_LIFESTEALER_EJECT = 1704
ACT_DOTA_ATTACK_EVENT_BASH = 1705
ACT_DOTA_CAPTURE_RARE = 1706
ACT_DOTA_AW_MAGNETIC_FIELD = 1707
ACT_DOTA_CAST_GHOST_SHIP = 1708
ACT_DOTA_FXANIM = 1709
ACT_DOTA_VICTORY_START = 1710
ACT_DOTA_DEFEAT_START = 1711
ACT_DOTA_DP_SPIRIT_SIPHON = 1712
ACT_DOTA_TRICKS_END = 1713
ACT_DOTA_ES_STONE_CALLER = 1714
ACT_DOTA_MK_STRIKE = 1715
ACT_DOTA_VERSUS = 1716
ACT_DOTA_CAPTURE_CARD = 1717
ACT_DOTA_MK_SPRING_SOAR = 1718
ACT_DOTA_MK_SPRING_END = 1719
ACT_DOTA_MK_TREE_SOAR = 1720
ACT_DOTA_MK_TREE_END = 1721
ACT_DOTA_MK_FUR_ARMY = 1722
ACT_DOTA_MK_SPRING_CAST = 1723
ACT_DOTA_NECRO_GHOST_SHROUD = 1724
ACT_DOTA_OVERRIDE_ARCANA = 1725
ACT_DOTA_SLIDE = 1726
ACT_DOTA_SLIDE_LOOP = 1727
ACT_DOTA_GENERIC_CHANNEL_1 = 1728
ACT_DOTA_GS_SOUL_CHAIN = 1729
ACT_DOTA_GS_INK_CREATURE = 1730
ACT_DOTA_TRANSITION = 1731
ACT_DOTA_BLINK_DAGGER = 1732
ACT_DOTA_BLINK_DAGGER_END = 1733
ACT_DOTA_CUSTOM_TOWER_ATTACK = 1734
ACT_DOTA_CUSTOM_TOWER_IDLE = 1735
ACT_DOTA_CUSTOM_TOWER_DIE = 1736
ACT_DOTA_CAST_COLD_SNAP_ORB = 1737
ACT_DOTA_CAST_GHOST_WALK_ORB = 1738
ACT_DOTA_CAST_TORNADO_ORB = 1739
ACT_DOTA_CAST_EMP_ORB = 1740
ACT_DOTA_CAST_ALACRITY_ORB = 1741
ACT_DOTA_CAST_CHAOS_METEOR_ORB = 1742
ACT_DOTA_CAST_SUN_STRIKE_ORB = 1743
ACT_DOTA_CAST_FORGE_SPIRIT_ORB = 1744
ACT_DOTA_CAST_ICE_WALL_ORB = 1745
ACT_DOTA_CAST_DEAFENING_BLAST_ORB = 1746
ACT_DOTA_NOTICE = 1747
ACT_DOTA_CAST_ABILITY_2_ALLY = 1748
ACT_DOTA_SHUFFLE_L = 1749
ACT_DOTA_SHUFFLE_R = 1750
ACT_DOTA_OVERRIDE_LOADOUT = 1751
ACT_DOTA_TAUNT_SPECIAL = 1752
ACT_DOTA_TELEPORT_START = 1753
ACT_DOTA_GENERIC_CHANNEL_1_START = 1754
ACT_DOTA_CUSTOM_TOWER_IDLE_RARE = 1755
ACT_DOTA_CUSTOM_TOWER_TAUNT = 1756
ACT_DOTA_CUSTOM_TOWER_HIGH_FIVE = 1757
ACT_DOTA_ATTACK_SPECIAL = 1758
ACT_DOTA_TRANSITION_IDLE = 1759
ACT_DOTA_PIERCE_THE_VEIL = 1760
ACT_DOTA_RUN_RARE = 1761
ACT_DOTA_VIPER_DIVE = 1762
ACT_DOTA_VIPER_DIVE_END = 1763
ACT_DOTA_MK_STRIKE_END = 1764
ACT_DOTA_SHADOW_VAULT = 1765
ACT_DOTA_KEZ_KATANA_ULT_START = 1766
ACT_DOTA_KEZ_KATANA_ULT_CHAIN_A = 1767
ACT_DOTA_KEZ_KATANA_ULT_CHAIN_B = 1768
ACT_DOTA_KEZ_KATANA_ULT_END = 1769
ACT_DOTA_KEZ_KATANA_IMPALE = 1770
ACT_DOTA_KEZ_KATANA_IMPALE_FAST = 1771
ACT_DOTA_UNICYCLE = 1772
ACT_DOTA_UNICYCLE_END = 1773
ACT_DOTA_LARGO_ULT_STRUM_SUCCESS = 1774
ACT_DOTA_LARGO_ULT_STRUM_FAIL = 1775
ACT_DOTA_MVP_SCREEN = 1776
ACT_DOTA_LARGO_ULT_TOGGLE_ON = 1777
ACT_DOTA_LARGO_ULT_TOGGLE_OFF = 1778
ACT_DOTA_RUN_STATUE = 1779
ACT_DOTA_CAST1_STATUE = 1780
ACT_DOTA_CAST2_STATUE = 1781
ACT_DOTA_STUN_STATUE = 1782
ACT_DOTA_FLAIL_STATUE = 1783
ACT_DOTA_SPAWN_STATUE = 1784
ACT_DOTA_TELEPORT_END_STATUE = 1785
ACT_DOTA_ATTACK_STATUE = 1786
ACT_DOTA_FORCESTAFF_STATUE = 1787
ACT_DOTA_TELEPORT_STATUE = 1788
ACT_DOTA_VICTORY_STATUE = 1789
ACT_DOTA_TAUNT_STATUE = 1790
ACT_DOTA_DISABLED_END = 1791
ACT_DOTA_CAST3_STATUE = 1792
ACT_DOTA_CAST4_STATUE = 1793
ACT_DOTA_CAST5_STATUE = 1794
ACT_DOTA_IDLE_STATUE = 1795
ACT_DOTA_RELAX_IN = 1796
ACT_DOTA_RELAX_OUT = 1797
ACT_DOTA_CAST_FENCE = 1798
ACT_DOTA_RADIANT_CREEP_HAMMER = 1800
ACT_DOTA_SPWN = 1801
ACT_DOTA_RUN_ALT = 1805
ACT_DOTA_VOODOO_REST = 1806
ACT_DOTA_CYCLONE = 1807
ACT_DOTA_IMPALE = 1808

--- Enum LuaModifierType
LUA_MODIFIER_MOTION_NONE = 0
LUA_MODIFIER_MOTION_HORIZONTAL = 1
LUA_MODIFIER_MOTION_VERTICAL = 2
LUA_MODIFIER_MOTION_BOTH = 3
LUA_MODIFIER_INVALID = 4

--- Enum modifierfunction
MODIFIER_PROPERTY_PREATTACK_BONUS_DAMAGE = 0
MODIFIER_PROPERTY_PREATTACK_BONUS_DAMAGE_TARGET = 1
MODIFIER_PROPERTY_PREATTACK_BONUS_DAMAGE_PROC = 2
MODIFIER_PROPERTY_PREATTACK_BONUS_DAMAGE_POST_CRIT = 3
MODIFIER_PROPERTY_BASEATTACK_BONUSDAMAGE = 4
MODIFIER_PROPERTY_PROCATTACK_BONUS_DAMAGE_PHYSICAL = 5
MODIFIER_PROPERTY_PROCATTACK_CONVERT_PHYSICAL_TO_MAGICAL = 6
MODIFIER_PROPERTY_PROCATTACK_BONUS_DAMAGE_MAGICAL = 7
MODIFIER_PROPERTY_PROCATTACK_BONUS_DAMAGE_PURE = 8
MODIFIER_PROPERTY_PROCATTACK_BONUS_DAMAGE_MAGICAL_TARGET = 9
MODIFIER_PROPERTY_PROCATTACK_FEEDBACK = 10
MODIFIER_PROPERTY_OVERRIDE_ATTACK_DAMAGE = 11
MODIFIER_PROPERTY_PRE_ATTACK = 12
MODIFIER_PROPERTY_INVISIBILITY_LEVEL = 13
MODIFIER_PROPERTY_INVISIBILITY_ATTACK_BEHAVIOR_EXCEPTION = 14
MODIFIER_PROPERTY_PERSISTENT_INVISIBILITY = 15
MODIFIER_PROPERTY_MOVESPEED_BONUS_CONSTANT = 16
MODIFIER_PROPERTY_MOVESPEED_BASE_OVERRIDE = 17
MODIFIER_PROPERTY_MOVESPEED_MIN_OVERRIDE = 18
MODIFIER_PROPERTY_MOVESPEED_MAX_OVERRIDE = 19
MODIFIER_PROPERTY_MOVESPEED_BONUS_PERCENTAGE = 20
MODIFIER_PROPERTY_MOVESPEED_BONUS_PERCENTAGE_UNIQUE = 21
MODIFIER_PROPERTY_MOVESPEED_BONUS_UNIQUE = 22
MODIFIER_PROPERTY_MOVESPEED_BONUS_UNIQUE_2 = 23
MODIFIER_PROPERTY_MOVESPEED_BONUS_CONSTANT_UNIQUE = 24
MODIFIER_PROPERTY_MOVESPEED_BONUS_CONSTANT_UNIQUE_2 = 25
MODIFIER_PROPERTY_MOVESPEED_ABSOLUTE = 26
MODIFIER_PROPERTY_MOVESPEED_ABSOLUTE_MIN = 27
MODIFIER_PROPERTY_MOVESPEED_ABSOLUTE_MAX = 28
MODIFIER_PROPERTY_IGNORE_MOVESPEED_LIMIT = 29
MODIFIER_PROPERTY_MOVESPEED_LIMIT = 30
MODIFIER_PROPERTY_ATTACKSPEED_BASE_OVERRIDE = 31
MODIFIER_PROPERTY_FIXED_ATTACK_RATE = 32
MODIFIER_PROPERTY_ATTACKSPEED_BONUS_CONSTANT = 33
MODIFIER_PROPERTY_IGNORE_ATTACKSPEED_LIMIT = 34
MODIFIER_PROPERTY_COOLDOWN_REDUCTION_CONSTANT = 35
MODIFIER_PROPERTY_MANACOST_REDUCTION_CONSTANT = 36
MODIFIER_PROPERTY_HEALTHCOST_REDUCTION_CONSTANT = 37
MODIFIER_PROPERTY_BASE_ATTACK_TIME_CONSTANT = 38
MODIFIER_PROPERTY_BASE_ATTACK_TIME_CONSTANT_ADJUST = 39
MODIFIER_PROPERTY_BASE_ATTACK_TIME_PERCENTAGE = 40
MODIFIER_PROPERTY_ATTACK_POINT_CONSTANT = 41
MODIFIER_PROPERTY_BONUSDAMAGEOUTGOING_PERCENTAGE = 42
MODIFIER_PROPERTY_DAMAGEOUTGOING_PERCENTAGE = 43
MODIFIER_PROPERTY_DAMAGEOUTGOING_PERCENTAGE_ILLUSION = 44
MODIFIER_PROPERTY_DAMAGEOUTGOING_PERCENTAGE_ILLUSION_AMPLIFY = 45
MODIFIER_PROPERTY_TOTALDAMAGEOUTGOING_PERCENTAGE = 46
MODIFIER_PROPERTY_SPELL_AMPLIFY_PERCENTAGE = 47
MODIFIER_PROPERTY_SPELL_AMPLIFY_PERCENTAGE_UNIQUE = 48
MODIFIER_PROPERTY_SPELL_AMPLIFY_PERCENTAGE_TARGET = 49
MODIFIER_PROPERTY_HEAL_AMPLIFY_PERCENTAGE_SOURCE = 50
MODIFIER_PROPERTY_HEAL_AMPLIFY_PERCENTAGE_TARGET = 51
MODIFIER_PROPERTY_HP_REGEN_AMPLIFY_PERCENTAGE = 52
MODIFIER_PROPERTY_LIFESTEAL_AMPLIFY_PERCENTAGE = 53
MODIFIER_PROPERTY_SPELL_LIFESTEAL_AMPLIFY_PERCENTAGE = 54
MODIFIER_PROPERTY_SPELL_LIFESTEAL_AMPLIFY_PERCENTAGE_UNIQUE = 55
MODIFIER_PROPERTY_MP_REGEN_AMPLIFY_PERCENTAGE = 56
MODIFIER_PROPERTY_MP_REGEN_AMPLIFY_PERCENTAGE_UNIQUE = 57
MODIFIER_PROPERTY_MANA_DRAIN_AMPLIFY_PERCENTAGE = 58
MODIFIER_PROPERTY_MP_RESTORE_AMPLIFY_PERCENTAGE = 59
MODIFIER_PROPERTY_BASEDAMAGEOUTGOING_PERCENTAGE = 60
MODIFIER_PROPERTY_BASEDAMAGEOUTGOING_PERCENTAGE_UNIQUE = 61
MODIFIER_PROPERTY_INCOMING_DAMAGE_PERCENTAGE = 62
MODIFIER_PROPERTY_INCOMING_PHYSICAL_DAMAGE_PERCENTAGE = 63
MODIFIER_PROPERTY_INCOMING_PHYSICAL_DAMAGE_CONSTANT = 64
MODIFIER_PROPERTY_INCOMING_SPELL_DAMAGE_CONSTANT = 65
MODIFIER_PROPERTY_EVASION_CONSTANT = 66
MODIFIER_PROPERTY_NEGATIVE_EVASION_CONSTANT = 67
MODIFIER_PROPERTY_STATUS_RESISTANCE = 68
MODIFIER_PROPERTY_STATUS_RESISTANCE_STACKING = 69
MODIFIER_PROPERTY_STATUS_RESISTANCE_CASTER = 70
MODIFIER_PROPERTY_AVOID_DAMAGE = 71
MODIFIER_PROPERTY_AVOID_SPELL = 72
MODIFIER_PROPERTY_MISS_PERCENTAGE = 73
MODIFIER_PROPERTY_PHYSICAL_ARMOR_BASE_PERCENTAGE = 74
MODIFIER_PROPERTY_PHYSICAL_ARMOR_TOTAL_PERCENTAGE = 75
MODIFIER_PROPERTY_PHYSICAL_ARMOR_BONUS = 76
MODIFIER_PROPERTY_PHYSICAL_ARMOR_BONUS_UNIQUE = 77
MODIFIER_PROPERTY_PHYSICAL_ARMOR_BONUS_UNIQUE_ACTIVE = 78
MODIFIER_PROPERTY_PHYSICAL_ARMOR_BONUS_POST = 79
MODIFIER_PROPERTY_MIN_PHYSICAL_ARMOR = 80
MODIFIER_PROPERTY_IGNORE_PHYSICAL_ARMOR = 81
MODIFIER_PROPERTY_MAGICAL_RESISTANCE_BASE_REDUCTION = 82
MODIFIER_PROPERTY_MAGICAL_RESISTANCE_DIRECT_MODIFICATION = 83
MODIFIER_PROPERTY_MAGICAL_RESISTANCE_BONUS = 84
MODIFIER_PROPERTY_MAGICAL_RESISTANCE_BONUS_ILLUSIONS = 85
MODIFIER_PROPERTY_MAGICAL_RESISTANCE_BONUS_UNIQUE = 86
MODIFIER_PROPERTY_MAGICAL_RESISTANCE_DECREPIFY_UNIQUE = 87
MODIFIER_PROPERTY_BASE_MANA_REGEN = 88
MODIFIER_PROPERTY_MANA_REGEN_CONSTANT = 89
MODIFIER_PROPERTY_MANA_REGEN_CONSTANT_UNIQUE = 90
MODIFIER_PROPERTY_MANA_REGEN_TOTAL_PERCENTAGE = 91
MODIFIER_PROPERTY_HEALTH_REGEN_CONSTANT = 92
MODIFIER_PROPERTY_HEALTH_REGEN_PERCENTAGE = 93
MODIFIER_PROPERTY_HEALTH_REGEN_PERCENTAGE_UNIQUE = 94
MODIFIER_PROPERTY_HEALTH_BONUS = 95
MODIFIER_PROPERTY_MANA_BONUS = 96
MODIFIER_PROPERTY_EXTRA_STRENGTH_BONUS = 97
MODIFIER_PROPERTY_EXTRA_HEALTH_BONUS = 98
MODIFIER_PROPERTY_EXTRA_MANA_BONUS = 99
MODIFIER_PROPERTY_EXTRA_MANA_BONUS_PERCENTAGE = 100
MODIFIER_PROPERTY_EXTRA_HEALTH_PERCENTAGE = 101
MODIFIER_PROPERTY_EXTRA_MANA_PERCENTAGE = 102
MODIFIER_PROPERTY_STATS_STRENGTH_BONUS = 103
MODIFIER_PROPERTY_STATS_AGILITY_BONUS = 104
MODIFIER_PROPERTY_STATS_INTELLECT_BONUS = 105
MODIFIER_PROPERTY_STATS_STRENGTH_BONUS_PERCENTAGE = 106
MODIFIER_PROPERTY_STATS_AGILITY_BONUS_PERCENTAGE = 107
MODIFIER_PROPERTY_STATS_INTELLECT_BONUS_PERCENTAGE = 108
MODIFIER_PROPERTY_STATS_INTELLECT_NONE = 109
MODIFIER_PROPERTY_CAST_RANGE_BONUS = 110
MODIFIER_PROPERTY_CAST_RANGE_BONUS_PERCENTAGE = 111
MODIFIER_PROPERTY_CAST_RANGE_BONUS_TARGET = 112
MODIFIER_PROPERTY_CAST_RANGE_BONUS_STACKING = 113
MODIFIER_PROPERTY_ATTACK_RANGE_BASE_OVERRIDE = 114
MODIFIER_PROPERTY_ATTACK_RANGE_BONUS = 115
MODIFIER_PROPERTY_ATTACK_RANGE_BONUS_UNIQUE = 116
MODIFIER_PROPERTY_ATTACK_RANGE_BONUS_PERCENTAGE = 117
MODIFIER_PROPERTY_MAX_ATTACK_RANGE = 118
MODIFIER_PROPERTY_PROJECTILE_SPEED_BONUS = 119
MODIFIER_PROPERTY_PROJECTILE_SPEED_BONUS_PERCENTAGE = 120
MODIFIER_PROPERTY_PROJECTILE_NAME = 121
MODIFIER_PROPERTY_REINCARNATION = 122
MODIFIER_PROPERTY_REINCARNATION_SUPPRESS_FX = 123
MODIFIER_PROPERTY_RESPAWNTIME = 124
MODIFIER_PROPERTY_RESPAWNTIME_PERCENTAGE = 125
MODIFIER_PROPERTY_RESPAWNTIME_STACKING = 126
MODIFIER_PROPERTY_COOLDOWN_PERCENTAGE = 127
MODIFIER_PROPERTY_COOLDOWN_PERCENTAGE_ONGOING = 128
MODIFIER_PROPERTY_CASTTIME_PERCENTAGE = 129
MODIFIER_PROPERTY_ATTACK_ANIM_TIME_PERCENTAGE = 130
MODIFIER_PROPERTY_MANACOST_PERCENTAGE = 131
MODIFIER_PROPERTY_MANACOST_PERCENTAGE_STACKING = 132
MODIFIER_PROPERTY_HEALTHCOST_PERCENTAGE = 133
MODIFIER_PROPERTY_HEALTHCOST_PERCENTAGE_STACKING = 134
MODIFIER_PROPERTY_DEATHGOLDCOST = 135
MODIFIER_PROPERTY_PERCENTAGE_DEATHGOLDCOST = 136
MODIFIER_PROPERTY_EXP_RATE_BOOST = 137
MODIFIER_PROPERTY_GOLD_RATE_BOOST = 138
MODIFIER_PROPERTY_KILL_ASSIST_GOLD_BOOST = 139
MODIFIER_PROPERTY_CONVERT_EXP_TO_GOLD_PCT = 140
MODIFIER_PROPERTY_PREATTACK_CRITICALSTRIKE = 141
MODIFIER_PROPERTY_PREATTACK_TARGET_CRITICALSTRIKE = 142
MODIFIER_PROPERTY_MAGICAL_CONSTANT_BLOCK = 143
MODIFIER_PROPERTY_PHYSICAL_CONSTANT_BLOCK = 144
MODIFIER_PROPERTY_PHYSICAL_CONSTANT_BLOCK_SPECIAL = 145
MODIFIER_PROPERTY_PHYSICAL_CONSTANT_BLOCK_BONUS = 146
MODIFIER_PROPERTY_INNATE_DAMAGE_BLOCK_PCT_OVERRIDE = 147
MODIFIER_PROPERTY_TOTAL_CONSTANT_BLOCK_UNAVOIDABLE_PRE_ARMOR = 148
MODIFIER_PROPERTY_TOTAL_CONSTANT_BLOCK = 149
MODIFIER_PROPERTY_OVERRIDE_ANIMATION = 150
MODIFIER_PROPERTY_OVERRIDE_ANIMATION_RATE = 151
MODIFIER_PROPERTY_ABSORB_SPELL = 152
MODIFIER_PROPERTY_REFLECT_SPELL = 153
MODIFIER_PROPERTY_DISABLE_AUTOATTACK = 154
MODIFIER_PROPERTY_BONUS_DAY_VISION = 155
MODIFIER_PROPERTY_BONUS_DAY_VISION_PERCENTAGE = 156
MODIFIER_PROPERTY_BONUS_NIGHT_VISION = 157
MODIFIER_PROPERTY_BONUS_NIGHT_VISION_UNIQUE = 158
MODIFIER_PROPERTY_BONUS_VISION_PERCENTAGE = 159
MODIFIER_PROPERTY_FIXED_DAY_VISION = 160
MODIFIER_PROPERTY_FIXED_NIGHT_VISION = 161
MODIFIER_PROPERTY_MIN_HEALTH = 162
MODIFIER_PROPERTY_MIN_MANA = 163
MODIFIER_PROPERTY_ABSOLUTE_NO_DAMAGE_PHYSICAL = 164
MODIFIER_PROPERTY_ABSOLUTE_NO_DAMAGE_MAGICAL = 165
MODIFIER_PROPERTY_ABSOLUTE_NO_DAMAGE_PURE = 166
MODIFIER_PROPERTY_IS_ILLUSION = 167
MODIFIER_PROPERTY_ILLUSION_LABEL = 168
MODIFIER_PROPERTY_STRONG_ILLUSION = 169
MODIFIER_PROPERTY_SUPER_ILLUSION = 170
MODIFIER_PROPERTY_SUPER_ILLUSION_WITH_ULTIMATE = 171
MODIFIER_PROPERTY_XP_DURING_DEATH = 172
MODIFIER_PROPERTY_TURN_RATE_PERCENTAGE = 173
MODIFIER_PROPERTY_TURN_RATE_OVERRIDE = 174
MODIFIER_PROPERTY_DISABLE_HEALING = 175
MODIFIER_PROPERTY_DISABLE_MANA_GAIN = 176
MODIFIER_PROPERTY_ALWAYS_ALLOW_ATTACK = 177
MODIFIER_PROPERTY_ALWAYS_ETHEREAL_ATTACK = 178
MODIFIER_PROPERTY_OVERRIDE_ATTACK_MAGICAL = 179
MODIFIER_PROPERTY_UNIT_STATS_NEEDS_REFRESH = 180
MODIFIER_PROPERTY_BOUNTY_CREEP_MULTIPLIER = 181
MODIFIER_PROPERTY_BOUNTY_OTHER_MULTIPLIER = 182
MODIFIER_PROPERTY_UNIT_DISALLOW_UPGRADING = 183
MODIFIER_PROPERTY_DODGE_PROJECTILE = 184
MODIFIER_PROPERTY_TRIGGER_COSMETIC_AND_END_ATTACK = 185
MODIFIER_PROPERTY_PRIMARY_STAT_DAMAGE_MULTIPLIER = 186
MODIFIER_PROPERTY_PREATTACK_DEADLY_BLOW = 187
MODIFIER_PROPERTY_ALWAYS_AUTOATTACK_WHILE_HOLD_POSITION = 188
MODIFIER_PROPERTY_PHYSICAL_ARMOR_PIERCING_PERCENTAGE_TARGET = 189
MODIFIER_PROPERTY_MAGICAL_ARMOR_PIERCING_PERCENTAGE_TARGET = 190
MODIFIER_PROPERTY_CRITICAL_STRIKE_BONUS = 191
MODIFIER_PROPERTY_CONVERT_ATTACK_PHYSICAL_TO_PURE = 192
MODIFIER_PROPERTY_BUFF_AMPLIFICATION = 193
MODIFIER_EVENT_ON_SPELL_TARGET_READY = 194
MODIFIER_EVENT_ON_ATTACK_RECORD = 195
MODIFIER_EVENT_ON_ATTACK_START = 196
MODIFIER_EVENT_ON_ATTACK = 197
MODIFIER_EVENT_ON_ATTACK_LANDED = 198
MODIFIER_EVENT_ON_ATTACK_FAIL = 199
MODIFIER_EVENT_ON_ATTACK_ALLIED = 200
MODIFIER_EVENT_ON_PROJECTILE_DODGE = 201
MODIFIER_EVENT_ON_ORDER = 202
MODIFIER_EVENT_ON_ORDER_RECEIVED = 203
MODIFIER_EVENT_ON_UNIT_MOVED = 204
MODIFIER_EVENT_ON_ABILITY_START = 205
MODIFIER_EVENT_ON_ABILITY_EXECUTED = 206
MODIFIER_EVENT_ON_ABILITY_FULLY_CAST = 207
MODIFIER_EVENT_ON_BREAK_INVISIBILITY = 208
MODIFIER_EVENT_ON_ABILITY_END_CHANNEL = 209
MODIFIER_EVENT_ON_PROCESS_UPGRADE = 210
MODIFIER_EVENT_ON_REFRESH = 211
MODIFIER_EVENT_ON_TAKEDAMAGE = 212
MODIFIER_EVENT_ON_DEATH_PREVENTED = 213
MODIFIER_EVENT_ON_STATE_CHANGED = 214
MODIFIER_EVENT_ON_ORB_EFFECT = 215
MODIFIER_EVENT_ON_PROCESS_CLEAVE = 216
MODIFIER_EVENT_ON_DAMAGE_CALCULATED = 217
MODIFIER_EVENT_ON_MAGIC_DAMAGE_CALCULATED = 218
MODIFIER_EVENT_ON_ATTACKED = 219
MODIFIER_EVENT_ON_DEATH = 220
MODIFIER_EVENT_ON_DEATH_COMPLETED = 221
MODIFIER_EVENT_ON_RESPAWN = 222
MODIFIER_EVENT_ON_SPENT_MANA = 223
MODIFIER_EVENT_ON_SPENT_HEALTH = 224
MODIFIER_EVENT_ON_SPENT_ITEM_CHARGE = 225
MODIFIER_EVENT_ON_TELEPORTING = 226
MODIFIER_EVENT_ON_TELEPORTED = 227
MODIFIER_EVENT_ON_SET_LOCATION = 228
MODIFIER_EVENT_ON_HEALTH_GAINED = 229
MODIFIER_EVENT_ON_MANA_GAINED = 230
MODIFIER_EVENT_ON_TAKEDAMAGE_KILLCREDIT = 231
MODIFIER_EVENT_ON_HERO_KILLED = 232
MODIFIER_EVENT_ON_HEAL_RECEIVED = 233
MODIFIER_EVENT_ON_BUILDING_KILLED = 234
MODIFIER_EVENT_ON_MODEL_CHANGED = 235
MODIFIER_EVENT_ON_MODIFIER_ADDED = 236
MODIFIER_EVENT_ON_MODIFIER_REMOVED = 237
MODIFIER_EVENT_ON_KNOCKBACK_ATTEMPTED = 238
MODIFIER_EVENT_ON_SCEPTER_UPGRADE_SELECTED = 239
MODIFIER_EVENT_ON_SHARD_UPGRADE_SELECTED = 240
MODIFIER_PROPERTY_TOOLTIP = 241
MODIFIER_PROPERTY_MODEL_CHANGE = 242
MODIFIER_PROPERTY_MODEL_SCALE = 243
MODIFIER_PROPERTY_MODEL_SCALE_ANIMATE_TIME = 244
MODIFIER_PROPERTY_MODEL_SCALE_USE_IN_OUT_EASE = 245
MODIFIER_PROPERTY_MODEL_SCALE_CONSTANT = 246
MODIFIER_PROPERTY_IS_SCEPTER = 247
MODIFIER_PROPERTY_IS_SHARD = 248
MODIFIER_PROPERTY_RADAR_COOLDOWN_REDUCTION = 249
MODIFIER_PROPERTY_TRANSLATE_ACTIVITY_MODIFIERS = 250
MODIFIER_PROPERTY_TRANSLATE_ATTACK_SOUND = 251
MODIFIER_PROPERTY_LIFETIME_FRACTION = 252
MODIFIER_PROPERTY_PROVIDES_FOW_POSITION = 253
MODIFIER_PROPERTY_SPELLS_REQUIRE_HP = 254
MODIFIER_PROPERTY_CONVERT_MANA_COST_TO_HEALTH_COST = 255
MODIFIER_PROPERTY_FORCE_DRAW_MINIMAP = 256
MODIFIER_PROPERTY_DISABLE_TURNING = 257
MODIFIER_PROPERTY_IGNORE_CAST_ANGLE = 258
MODIFIER_PROPERTY_CHANGE_ABILITY_VALUE = 259
MODIFIER_PROPERTY_OVERRIDE_ABILITY_SPECIAL = 260
MODIFIER_PROPERTY_OVERRIDE_ABILITY_SPECIAL_VALUE = 261
MODIFIER_PROPERTY_ABILITY_LAYOUT = 262
MODIFIER_EVENT_ON_DOMINATED = 263
MODIFIER_EVENT_ON_KILL = 264
MODIFIER_EVENT_ON_ASSIST = 265
MODIFIER_PROPERTY_TEMPEST_DOUBLE = 266
MODIFIER_PROPERTY_PRESERVE_PARTICLES_ON_MODEL_CHANGE = 267
MODIFIER_EVENT_ON_ATTACK_FINISHED = 268
MODIFIER_PROPERTY_IGNORE_COOLDOWN = 269
MODIFIER_PROPERTY_CAN_ATTACK_TREES = 270
MODIFIER_PROPERTY_VISUAL_Z_DELTA = 271
MODIFIER_PROPERTY_VISUAL_Z_SPEED_BASE_OVERRIDE = 272
MODIFIER_PROPERTY_INCOMING_DAMAGE_ILLUSION = 273
MODIFIER_PROPERTY_DONT_GIVE_VISION_OF_ATTACKER = 274
MODIFIER_PROPERTY_TOOLTIP2 = 275
MODIFIER_EVENT_ON_ATTACK_RECORD_DESTROY = 276
MODIFIER_EVENT_ON_PROJECTILE_OBSTRUCTION_HIT = 277
MODIFIER_PROPERTY_SUPPRESS_TELEPORT = 278
MODIFIER_EVENT_ON_ATTACK_CANCELLED = 279
MODIFIER_PROPERTY_SUPPRESS_CLEAVE = 280
MODIFIER_PROPERTY_BOT_ATTACK_SCORE_BONUS = 281
MODIFIER_PROPERTY_ATTACKSPEED_REDUCTION_PERCENTAGE = 282
MODIFIER_PROPERTY_MOVESPEED_REDUCTION_PERCENTAGE = 283
MODIFIER_PROPERTY_ATTACK_WHILE_MOVING_TARGET = 284
MODIFIER_PROPERTY_ATTACKSPEED_PERCENTAGE = 285
MODIFIER_EVENT_ON_ATTEMPT_PROJECTILE_DODGE = 286
MODIFIER_PROPERTY_COOLDOWN_PERCENTAGE_STACKING = 287
MODIFIER_PROPERTY_SPELL_REDIRECT_TARGET = 288
MODIFIER_PROPERTY_TURN_RATE_CONSTANT = 289
MODIFIER_PROPERTY_PACK_RAT = 290
MODIFIER_PROPERTY_PHYSICALDAMAGEOUTGOING_PERCENTAGE = 291
MODIFIER_PROPERTY_KNOCKBACK_AMPLIFICATION_PERCENTAGE = 292
MODIFIER_PROPERTY_HEALTHBAR_PIPS = 293
MODIFIER_PROPERTY_INCOMING_DAMAGE_CONSTANT = 294
MODIFIER_EVENT_SPELL_APPLIED_SUCCESSFULLY = 295
MODIFIER_PROPERTY_AVOID_DAMAGE_AFTER_REDUCTIONS = 296
MODIFIER_PROPERTY_FAIL_ATTACK = 297
MODIFIER_PROPERTY_PREREDUCE_INCOMING_DAMAGE_MULT = 298
MODIFIER_PROPERTY_SUPPRESS_FULLSCREEN_DEATH_FX = 299
MODIFIER_PROPERTY_INCOMING_DAMAGE_CONSTANT_POST = 300
MODIFIER_PROPERTY_DAMAGEOUTGOING_PERCENTAGE_MULTIPLICATIVE = 301
MODIFIER_PROPERTY_TICK_GOLD_MULTIPLIER = 302
MODIFIER_PROPERTY_SLOW_RESISTANCE_UNIQUE = 303
MODIFIER_PROPERTY_SLOW_RESISTANCE_STACKING = 304
MODIFIER_PROPERTY_SLOW_RESISTANCE_APPLIES_TO_ATTACKS = 305
MODIFIER_PROPERTY_AOE_BONUS_PERCENTAGE = 306
MODIFIER_PROPERTY_PROJECTILE_SPEED = 307
MODIFIER_PROPERTY_PROJECTILE_SPEED_TARGET = 308
MODIFIER_PROPERTY_BECOME_STRENGTH = 309
MODIFIER_PROPERTY_BECOME_AGILITY = 310
MODIFIER_PROPERTY_BECOME_INTELLIGENCE = 311
MODIFIER_PROPERTY_BECOME_UNIVERSAL = 312
MODIFIER_EVENT_ON_FORCE_PROC_MAGIC_STICK = 313
MODIFIER_EVENT_ON_DAMAGE_HPLOSS = 314
MODIFIER_PROPERTY_SHARE_XPRUNE = 315
MODIFIER_PROPERTY_XP_FOUNTAIN_COUNTDOWN_TIME_OVERRIDE = 316
MODIFIER_PROPERTY_NO_FREE_TP_SCROLL_ON_DEATH = 317
MODIFIER_PROPERTY_HAS_BONUS_NEUTRAL_ITEM_CHOICE = 318
MODIFIER_PROPERTY_HAS_BONUS_NEUTRAL_ITEM_PASSIVE = 319
MODIFIER_PROPERTY_PRESERVE_NEUTRAL_ITEM_PASSIVES = 320
MODIFIER_PROPERTY_FORCE_MAX_HEALTH = 321
MODIFIER_PROPERTY_FORCE_MAX_MANA = 322
MODIFIER_PROPERTY_AOE_BONUS_CONSTANT = 323
MODIFIER_PROPERTY_AOE_BONUS_CONSTANT_STACKING = 324
MODIFIER_EVENT_ON_TAKEDAMAGE_POST_UNAVOIDABLE_BLOCK = 325
MODIFIER_EVENT_ON_MUTE_DAMAGE_ABILITIES = 326
MODIFIER_PROPERTY_SUPPRESS_CRIT = 327
MODIFIER_PROPERTY_ABILITY_POINTS = 328
MODIFIER_PROPERTY_BUYBACK_PENALTY_PERCENT = 329
MODIFIER_PROPERTY_ITEM_SELLBACK_COST = 330
MODIFIER_PROPERTY_DISASSEMBLE_ANYTHING = 331
MODIFIER_PROPERTY_FIXED_MANA_REGEN = 332
MODIFIER_PROPERTY_BONUS_UPHILL_MISS_CHANCE = 333
MODIFIER_PROPERTY_CREEP_DENY_PERCENT = 334
MODIFIER_PROPERTY_ATTACKSPEED_ABSOLUTE_MAX = 335
MODIFIER_PROPERTY_FOW_TEAM = 336
MODIFIER_EVENT_ON_HERO_BEGIN_DYING = 337
MODIFIER_PROPERTY_BONUS_LOTUS_HEAL = 338
MODIFIER_PROPERTY_BASE_HP_REGEN_PER_STR_BONUS_PERCENTAGE = 339
MODIFIER_PROPERTY_BASE_ARMOR_PER_AGI_BONUS_PERCENTAGE = 340
MODIFIER_PROPERTY_BASE_ATTACKSPEED_PER_AGI_BONUS_PERCENTAGE = 341
MODIFIER_PROPERTY_BASE_MP_REGEN_PER_INT_BONUS_PERCENTAGE = 342
MODIFIER_PROPERTY_BASE_MRES_PER_INT_BONUS_PERCENTAGE = 343
MODIFIER_EVENT_ON_DAY_STARTED = 344
MODIFIER_EVENT_ON_NIGHT_STARTED = 345
MODIFIER_PROPERTY_CREATE_BONUS_ILLUSION_CHANCE = 346
MODIFIER_PROPERTY_CREATE_BONUS_ILLUSION_COUNT = 347
MODIFIER_PROPERTY_PSEUDORANDOM_BONUS = 348
MODIFIER_PROPERTY_ATTACK_HEIGHT_BONUS = 349
MODIFIER_PROPERTY_SKIP_ATTACK_REGULATOR = 350
MODIFIER_PROPERTY_MISS_PERCENTAGE_TARGET = 351
MODIFIER_PROPERTY_ADDITIONAL_NEUTRAL_ITEM_DROPS = 352
MODIFIER_PROPERTY_KILL_STREAK_BONUS_GOLD_PERCENTAGE = 353
MODIFIER_PROPERTY_HP_REGEN_MULTIPLIER_PRE_AMPLIFICATION = 354
MODIFIER_PROPERTY_HEROFACET_OVERRIDE = 355
MODIFIER_EVENT_ON_TREE_CUT_DOWN = 356
MODIFIER_EVENT_ON_CLEAVE_ATTACK_LANDED = 357
MODIFIER_PROPERTY_MIN_ATTRIBUTE_LEVEL = 358
MODIFIER_PROPERTY_TIER_TOKEN_REROLL = 359
MODIFIER_PROPERTY_VISION_DEGREES_RESTRICTION = 360
MODIFIER_PROPERTY_TOTAL_CONSTANT_BLOCK_STACKING = 361
MODIFIER_PROPERTY_INVENTORY_SLOT_RESTRICTED = 362
MODIFIER_EVENT_ON_TIER_TOKEN_REROLLED = 363
MODIFIER_PROPERTY_REDIRECT_SPELL = 364
MODIFIER_PROPERTY_BASEATTACK_POSTBONUS = 365
MODIFIER_EVENT_ON_FOW_TEAM_CHANGED = 366
MODIFIER_PROPERTY_SUPPRESS_ATTACK_PROCS = 367
MODIFIER_EVENT_ON_ABILITY_TOGGLED = 368
MODIFIER_PROPERTY_AVOID_ATTACK_PROCS = 369
MODIFIER_EVENT_ON_RUNE_SPAWN = 370
MODIFIER_PROPERTY_PHYSICAL_LIFESTEAL = 371
MODIFIER_PROPERTY_MAGICAL_LIFESTEAL = 372
MODIFIER_EVENT_ON_PURE_DAMAGE_CALCULATED = 373
MODIFIER_EVENT_NEUTRAL_TRINKET_OPTIONS = 374
MODIFIER_EVENT_NEUTRAL_ENHANCEMENT_OPTIONS = 375
MODIFIER_PROPERTY_MOVESPEED_MAX_BONUS_CONSTANT = 376
MODIFIER_PROPERTY_MOVESPEED_POST_MULTIPLIER_BONUS_CONSTANT = 377
MODIFIER_PROPERTY_FORBID_ILLUSIONS = 378
MODIFIER_PROPERTY_MANACOST_OVERRIDE = 379
MODIFIER_PROPERTY_RESTORATION_AMPLIFICATION = 380
MODIFIER_PROPERTY_RESTORATION_AMPLIFICATION_UNIQUE = 381
MODIFIER_PROPERTY_HEAL_AMPLIFY_PERCENTAGE_SOURCE_UNIQUE = 382
MODIFIER_PROPERTY_SUPPRESS_INCOMING_CRIT = 383
MODIFIER_PROPERTY_UPGRADE_NEUTRAL_ARTIFACTS = 384
MODIFIER_PROPERTY_SUPPRESS_INVALID_MOVE_ATTACK_ORDERS = 385
MODIFIER_PROPERTY_CONSUMABLE_USE_SPEED = 386
MODIFIER_PROPERTY_REQUIRED_LEVEL = 387
MODIFIER_EVENT_ON_MODIFIER_REFRESHED = 388
MODIFIER_EVENT_ON_ABILITY_SWAPPED = 389
MODIFIER_PROPERTY_OVERRIDE_CREEP_BOUNTY = 390
MODIFIER_PROPERTY_OVERRIDE_BASE_DAMAGE = 391
MODIFIER_PROPERTY_UNTARGETABLE_FROM = 392
MODIFIER_PROPERTY_UNTARGETABLE_TO = 393
MODIFIER_PROPERTY_SUPER_ILLUSION_WITH_ITEMS = 394
MODIFIER_EVENT_ON_PURGE = 395
MODIFIER_EVENT_ON_ILLUSION_CREATED = 396
MODIFIER_PROPERTY_HEROLEVELSCALE = 397
MODIFIER_FUNCTION_LAST = 398
MODIFIER_FUNCTION_INVALID = 65535

--- Enum modifierpriority
MODIFIER_PRIORITY_LOW = 0
MODIFIER_PRIORITY_NORMAL = 1
MODIFIER_PRIORITY_HIGH = 2
MODIFIER_PRIORITY_ULTRA = 3
MODIFIER_PRIORITY_SUPER_ULTRA = 4

--- Enum modifierremove
DOTA_BUFF_REMOVE_ALL = 0
DOTA_BUFF_REMOVE_ENEMY = 1
DOTA_BUFF_REMOVE_ALLY = 2

--- Enum modifierstate
MODIFIER_STATE_ROOTED = 0
MODIFIER_STATE_DISARMED = 1
MODIFIER_STATE_ATTACK_IMMUNE = 2
MODIFIER_STATE_SILENCED = 3
MODIFIER_STATE_MUTED = 4
MODIFIER_STATE_STUNNED = 5
MODIFIER_STATE_HEXED = 6
MODIFIER_STATE_INVISIBLE = 7
MODIFIER_STATE_INVULNERABLE = 8
MODIFIER_STATE_MAGIC_IMMUNE = 9
MODIFIER_STATE_PROVIDES_VISION = 10
MODIFIER_STATE_NIGHTMARED = 11
MODIFIER_STATE_BLOCK_DISABLED = 12
MODIFIER_STATE_EVADE_DISABLED = 13
MODIFIER_STATE_UNSELECTABLE = 14
MODIFIER_STATE_CANNOT_TARGET_ENEMIES = 15
MODIFIER_STATE_CANNOT_TARGET_BUILDINGS = 16
MODIFIER_STATE_CANNOT_MISS = 17
MODIFIER_STATE_SPECIALLY_DENIABLE = 18
MODIFIER_STATE_FROZEN = 19
MODIFIER_STATE_COMMAND_RESTRICTED = 20
MODIFIER_STATE_NOT_ON_MINIMAP = 21
MODIFIER_STATE_LOW_ATTACK_PRIORITY = 22
MODIFIER_STATE_NO_HEALTH_BAR = 23
MODIFIER_STATE_NO_HEALTH_BAR_FOR_ENEMIES = 24
MODIFIER_STATE_NO_HEALTH_BAR_FOR_OTHER_PLAYERS = 25
MODIFIER_STATE_FLYING = 26
MODIFIER_STATE_NO_UNIT_COLLISION = 27
MODIFIER_STATE_NO_TEAM_MOVE_TO = 28
MODIFIER_STATE_NO_TEAM_SELECT = 29
MODIFIER_STATE_PASSIVES_DISABLED = 30
MODIFIER_STATE_DOMINATED = 31
MODIFIER_STATE_BLIND = 32
MODIFIER_STATE_OUT_OF_GAME = 33
MODIFIER_STATE_FAKE_ALLY = 34
MODIFIER_STATE_FLYING_FOR_PATHING_PURPOSES_ONLY = 35
MODIFIER_STATE_TRUESIGHT_IMMUNE = 36
MODIFIER_STATE_UNTARGETABLE = 37
MODIFIER_STATE_UNTARGETABLE_ALLIED = 38
MODIFIER_STATE_UNTARGETABLE_ENEMY = 39
MODIFIER_STATE_UNTARGETABLE_SELF = 40
MODIFIER_STATE_IGNORING_MOVE_AND_ATTACK_ORDERS = 41
MODIFIER_STATE_ALLOW_PATHING_THROUGH_TREES = 42
MODIFIER_STATE_NOT_ON_MINIMAP_FOR_ENEMIES = 43
MODIFIER_STATE_UNSLOWABLE = 44
MODIFIER_STATE_TETHERED = 45
MODIFIER_STATE_IGNORING_STOP_ORDERS = 46
MODIFIER_STATE_FEARED = 47
MODIFIER_STATE_TAUNTED = 48
MODIFIER_STATE_CANNOT_BE_MOTION_CONTROLLED = 49
MODIFIER_STATE_FORCED_FLYING_VISION = 50
MODIFIER_STATE_ATTACK_ALLIES = 51
MODIFIER_STATE_ALLOW_PATHING_THROUGH_CLIFFS = 52
MODIFIER_STATE_ALLOW_PATHING_THROUGH_POWER_COGS = 53
MODIFIER_STATE_SPECIALLY_UNDENIABLE = 54
MODIFIER_STATE_ALLOW_PATHING_THROUGH_OBSTRUCTIONS = 55
MODIFIER_STATE_DEBUFF_IMMUNE = 56
MODIFIER_STATE_ALLOW_PATHING_THROUGH_BASE_BLOCKER = 57
MODIFIER_STATE_IGNORING_MOVE_ORDERS = 58
MODIFIER_STATE_ATTACKS_ARE_MELEE = 59
MODIFIER_STATE_CAN_USE_BACKPACK_ITEMS = 60
MODIFIER_STATE_CASTS_IGNORE_CHANNELING = 61
MODIFIER_STATE_ATTACKS_DONT_REVEAL = 62
MODIFIER_STATE_NEUTRALS_DONT_ATTACK = 63
MODIFIER_STATE_LAST = 64

--- Enum ParticleAttachment_t
PATTACH_INVALID = -1
PATTACH_ABSORIGIN = 0
PATTACH_ABSORIGIN_FOLLOW = 1
PATTACH_CUSTOMORIGIN = 2
PATTACH_CUSTOMORIGIN_FOLLOW = 3
PATTACH_POINT = 4
PATTACH_POINT_FOLLOW = 5
PATTACH_EYES_FOLLOW = 6
PATTACH_OVERHEAD_FOLLOW = 7
PATTACH_WORLDORIGIN = 8
PATTACH_ROOTBONE_FOLLOW = 9
PATTACH_RENDERORIGIN_FOLLOW = 10
PATTACH_MAIN_VIEW = 11
PATTACH_WATERWAKE = 12
PATTACH_CENTER_FOLLOW = 13
PATTACH_CUSTOM_GAME_STATE_1 = 14
PATTACH_HEALTHBAR = 15
MAX_PATTACH_TYPES = 16

--- Enum PseudoRandom
DOTA_PSEUDO_RANDOM_NONE = 0
DOTA_PSEUDO_RANDOM_MAGNUS_SHARD = 1
DOTA_PSEUDO_RANDOM_PHANTOMASSASSIN_CRIT = 2
DOTA_PSEUDO_RANDOM_PHANTOMASSASSIN_DAGGER = 3
DOTA_PSEUDO_RANDOM_PHANTOMLANCER_JUXTAPOSE = 4
DOTA_PSEUDO_RANDOM_TINY_CRAGGY = 5
DOTA_PSEUDO_RANDOM_COLD_REBUKE = 6
DOTA_PSEUDO_RANDOM_WOLF_CRIT = 7
DOTA_PSEUDO_RANDOM_AXE_HELIX = 8
DOTA_PSEUDO_RANDOM_AXE_HELIX_ATTACK = 9
DOTA_PSEUDO_RANDOM_LEGION_MOMENT = 10
DOTA_PSEUDO_RANDOM_SLARDAR_BASH = 11
DOTA_PSEUDO_RANDOM_OD_ESSENCE = 12
DOTA_PSEUDO_RANDOM_DROW_MARKSMANSHIP = 13
DOTA_PSEUDO_RANDOM_OGRE_MAGI_FIREBLAST = 14
DOTA_PSEUDO_RANDOM_OGRE_ITEM_MULTICAST = 15
DOTA_PSEUDO_RANDOM_SPIRITBREAKER_GREATERBASH = 16
DOTA_PSEUDO_RANDOM_LONE_DRUID_ENTANGLE = 17
DOTA_PSEUDO_RANDOM_FACELESS_BASH = 18
DOTA_PSEUDO_RANDOM_FACELESS_EVADE_SPELL = 19
DOTA_PSEUDO_RANDOM_FACELESS_EVADE_ATTACK = 20
DOTA_PSEUDO_RANDOM_FACELESS_VOID_BACKTRACK = 21
DOTA_PSEUDO_RANDOM_BREWMASTER_CRIT = 22
DOTA_PSEUDO_RANDOM_BREWMASTER_CINDER_BREW = 23
DOTA_PSEUDO_RANDOM_SNIPER_HEADSHOT = 24
DOTA_PSEUDO_RANDOM_ATOS = 25
DOTA_PSEUDO_RANDOM_JUGG_CRIT = 26
DOTA_PSEUDO_RANDOM_DAZZLE_SCEPTER = 27
DOTA_PSEUDO_RANDOM_CHAOS_CRIT = 28
DOTA_PSEUDO_RANDOM_LYCAN_CRIT = 29
DOTA_PSEUDO_RANDOM_TUSK_CRIT = 30
DOTA_PSEUDO_RANDOM_CM_FREEZING_FIELD = 31
DOTA_PSEUDO_RANDOM_GENERIC_BASHER = 32
DOTA_PSEUDO_RANDOM_SKELETONKING_CRIT = 33
DOTA_PSEUDO_RANDOM_SKELETONKING_CRIT_MORTAL = 34
DOTA_PSEUDO_RANDOM_ITEM_GREATERCRIT = 35
DOTA_PSEUDO_RANDOM_ITEM_LESSERCRIT = 36
DOTA_PSEUDO_RANDOM_ITEM_BASHER = 37
DOTA_PSEUDO_RANDOM_ITEM_SOLAR_CREST = 38
DOTA_PSEUDO_RANDOM_ITEM_JAVELIN_ACCURACY = 39
DOTA_PSEUDO_RANDOM_ITEM_TRIDENT = 40
DOTA_PSEUDO_RANDOM_ITEM_ABYSSAL = 41
DOTA_PSEUDO_RANDOM_ITEM_ABYSSAL_BLOCK = 42
DOTA_PSEUDO_RANDOM_ITEM_STOUT = 43
DOTA_PSEUDO_RANDOM_ITEM_VANGUARD = 44
DOTA_PSEUDO_RANDOM_ITEM_CRIMSON_GUARD = 45
DOTA_PSEUDO_RANDOM_ITEM_PMS = 46
DOTA_PSEUDO_RANDOM_ITEM_HALBRED_MAIM = 47
DOTA_PSEUDO_RANDOM_ITEM_SANGEYASHA_MAIM = 48
DOTA_PSEUDO_RANDOM_ITEM_SANGEKAYA_MAIM = 49
DOTA_PSEUDO_RANDOM_ITEM_SANGE_MAIM = 50
DOTA_PSEUDO_RANDOM_ITEM_BUTTERFLY = 51
DOTA_PSEUDO_RANDOM_ITEM_MAELSTROM = 52
DOTA_PSEUDO_RANDOM_ITEM_MJOLLNIR = 53
DOTA_PSEUDO_RANDOM_ITEM_MJOLLNIR_STATIC = 54
DOTA_PSEUDO_RANDOM_ITEM_MKB = 55
DOTA_PSEUDO_RANDOM_ITEM_SILVER_EDGE = 56
DOTA_PSEUDO_RANDOM_ITEM_NAGINATA = 57
DOTA_PSEUDO_RANDOM_TROLL_BASH = 58
DOTA_PSEUDO_RANDOM_RIKI_SMOKE_SCREEN = 59
DOTA_PSEUDO_RANDOM_CHAOS_DOUBLE_CRIT = 60
DOTA_PSEUDO_RANDOM_CHAOS_TRIPLE_CRIT = 61
DOTA_PSEUDO_RANDOM_GENERIC_EVASION = 62
DOTA_PSEUDO_RANDOM_GENERIC_HEIGHT_MISS = 63
DOTA_PSEUDO_RANDOM_GENERIC_MISS = 64
DOTA_PSEUDO_RANDOM_ARMADILLO_HEARTPIERCER = 65
DOTA_PSEUDO_RANDOM_MARS_SHIELD = 66
DOTA_PSEUDO_RANDOM_CHAOS_KNIGHT_INNATE_REFUND = 67
DOTA_PSEUDO_RANDOM_NEUTRAL_DROP_TIER1 = 68
DOTA_PSEUDO_RANDOM_NEUTRAL_DROP_TIER2 = 69
DOTA_PSEUDO_RANDOM_NEUTRAL_DROP_TIER3 = 70
DOTA_PSEUDO_RANDOM_NEUTRAL_DROP_TIER4 = 71
DOTA_PSEUDO_RANDOM_NEUTRAL_DROP_TIER5 = 72
DOTA_PSEUDO_RANDOM_MARS_BULWARK = 73
DOTA_PSEUDO_RANDOM_MUERTA_GUNSLINGER = 74
DOTA_PSEUDO_RANDOM_TROLL_FERVOR_SHARD = 75
DOTA_PSEUDO_RANDOM_SNAPFIRE_GLANCING = 76
DOTA_PSEUDO_RANDOM_PANGOLIER_PARRY = 77
DOTA_PSEUDO_RANDOM_HOODWINK_REDIRECT = 78
DOTA_PSEUDO_RANDOM_KEZ_SAI = 79
DOTA_PSEUDO_RANDOM_CHAOS_KNIGHT_HAVOC = 80
DOTA_PSEUDO_RANDOM_LARGO_FROGSTOMP = 81
DOTA_PSEUDO_RANDOM_NAGA_RIPTIDE = 82
DOTA_PSEUDO_RANDOM_CUSTOM_GENERIC = 83
DOTA_PSEUDO_RANDOM_CUSTOM_GAME_1 = 84
DOTA_PSEUDO_RANDOM_CUSTOM_GAME_2 = 85
DOTA_PSEUDO_RANDOM_CUSTOM_GAME_3 = 86
DOTA_PSEUDO_RANDOM_CUSTOM_GAME_4 = 87
DOTA_PSEUDO_RANDOM_CUSTOM_GAME_5 = 88
DOTA_PSEUDO_RANDOM_CUSTOM_GAME_6 = 89
DOTA_PSEUDO_RANDOM_CUSTOM_GAME_7 = 90
DOTA_PSEUDO_RANDOM_CUSTOM_GAME_8 = 91
DOTA_PSEUDO_RANDOM_CUSTOM_GAME_9 = 92

--- Enum quest_text_replace_values_t
QUEST_TEXT_REPLACE_VALUE_CURRENT_VALUE = 0
QUEST_TEXT_REPLACE_VALUE_TARGET_VALUE = 1
QUEST_TEXT_REPLACE_VALUE_ROUND = 2
QUEST_TEXT_REPLACE_VALUE_REWARD = 3
QUEST_NUM_TEXT_REPLACE_VALUES = 4

--- Enum ShowGenericPopupType
DOTA_SHOWGENERICPOPUP_TINT_SCREEN = 1
DOTA_SHOWGENERICPOPUP_SHOW_NO_OTHER_DIALOGS = 2

--- Enum SourceEngineAnimationEvent
AE_EMPTY = 0
AE_CL_PLAYSOUND = 1
AE_CL_PLAYSOUND_ATTACHMENT = 2
AE_CL_PLAYSOUND_POSITION = 3
AE_SV_PLAYSOUND = 4
AE_CL_STOPSOUND = 5
AE_CL_PLAYSOUND_LOOPING = 6
AE_CL_CREATE_PARTICLE_EFFECT = 7
AE_CL_STOP_PARTICLE_EFFECT = 8
AE_CL_CREATE_PARTICLE_EFFECT_CFG = 9
AE_SV_CREATE_PARTICLE_EFFECT_CFG = 10
AE_SV_STOP_PARTICLE_EFFECT = 11
AE_FOOTSTEP = 12
AE_CL_STOP_RAGDOLL_CONTROL = 13
AE_CL_ENABLE_BODYGROUP = 14
AE_CL_DISABLE_BODYGROUP = 15
AE_BODYGROUP_SET_VALUE = 16
AE_WEAPON_PERFORM_ATTACK = 17
AE_FIRE_INPUT = 18
AE_CL_CLOTH_ATTR = 19
AE_CL_CLOTH_GROUND_OFFSET = 20
AE_CL_CLOTH_STIFFEN = 21
AE_CL_CLOTH_EFFECT = 22
AE_CL_CREATE_ANIM_SCOPE_PROP = 23
AE_SV_IKLOCK = 24
AE_PULSE_GRAPH = 25
AE_DISABLE_PLATFORM = 26
AE_ENABLE_PLATFORM_PLAYER_FOLLOWS_YAW = 27
AE_ENABLE_PLATFORM_PLAYER_IGNORES_YAW = 28
AE_DESTRUCTIBLE_PART_DESTROY = 29
AE_CL_SUPPRESS_EVENTS_WITH_TAG = 30
AE_CL_HIDE_PARTICLE_EFFECT = 31
AE_CL_SHOW_PARTICLE_EFFECT = 32
AE_CL_ADD_PARTICLE_EFFECT_CP = 33
AE_CL_SPEECH = 34
AE_CL_PANORAMA_EVENT = 35
AE_CL_DOTA_PLAY_STATUS_EFFECT = 36
AE_CL_DOTA_STOP_STATUS_EFFECT = 37
AE_CL_DOTA_NPC_CREATE_PARTICLE_EFFECT = 38
AE_CL_DOTA_RUBICK_ARCANA_CREATE_PARTICLE_EFFECT = 39
AE_DOTA_PET_ITEM_PICKUP = 40
AE_DOTA_PET_ITEM_DROP = 41
AE_DOTA_SUPPRESS_CONSTANT_LAYER = 42
AE_DOTA_PLAY_SOUND_ATTACK_SPECIAL = 43
AE_DOTA_CREATE_CLINKZ_ATTACK = 44
AE_DOTA_PLAY_SOUND_ATTACK_BACKSTAB = 45
AE_DOTA_DIE_PHANTOM_DEATH_PARTICLES = 46
AE_DOTA_SWITCH_ATTACK_COMBO = 47
AE_EF_NODRAW = 48
AE_EF_DRAW = 49
AE_DOTA_PLAY_SOUND_ATTACK = 50
AE_CL_CREATE_PARTICLE_BRASS = 51

--- Enum SourceEngineDamageTypes
DMG_GENERIC = 0
DMG_CRUSH = 1
DMG_BULLET = 2
DMG_SLASH = 4
DMG_BURN = 8
DMG_VEHICLE = 16
DMG_FALL = 32
DMG_BLAST = 64
DMG_CLUB = 128
DMG_SHOCK = 256
DMG_SONIC = 512
DMG_ENERGYBEAM = 1024
DMG_PREVENT_PHYSICS_FORCE = 2048
DMG_NEVERGIB = 4096
DMG_ALWAYSGIB = 8192
DMG_DROWN = 16384
DMG_PARALYZE = 32768
DMG_NERVEGAS = 65536
DMG_POISON = 131072
DMG_RADIATION = 262144

--- Enum SourceEngineSoundData
EMPTY = 0
SINGLE_SHOT = 2
DOUBLE_SHOT = 3
MELEE_MISS = 4
MELEE_HIT = 5
MELEE_HIT_WORLD = 6
SPECIAL1 = 9
SPECIAL2 = 10
SPECIAL3 = 11

--- Enum subquest_text_replace_values_t
SUBQUEST_TEXT_REPLACE_VALUE_CURRENT_VALUE = 0
SUBQUEST_TEXT_REPLACE_VALUE_TARGET_VALUE = 1
SUBQUEST_NUM_TEXT_REPLACE_VALUES = 2

--- Enum UnitFilterResult
UF_SUCCESS = 0
UF_FAIL_FRIENDLY = 1
UF_FAIL_ENEMY = 2
UF_FAIL_HERO = 3
UF_FAIL_CONSIDERED_HERO = 4
UF_FAIL_CREEP = 5
UF_FAIL_BUILDING = 6
UF_FAIL_COURIER = 7
UF_FAIL_OTHER = 8
UF_FAIL_ANCIENT = 9
UF_FAIL_ILLUSION = 10
UF_FAIL_SUMMONED = 11
UF_FAIL_DOMINATED = 12
UF_FAIL_MELEE = 13
UF_FAIL_RANGED = 14
UF_FAIL_DEAD = 15
UF_FAIL_MAGIC_IMMUNE_ALLY = 16
UF_FAIL_MAGIC_IMMUNE_ENEMY = 17
UF_FAIL_INVULNERABLE = 18
UF_FAIL_IN_FOW = 19
UF_FAIL_INVISIBLE = 20
UF_FAIL_NOT_PLAYER_CONTROLLED = 21
UF_FAIL_ATTACK_IMMUNE = 22
UF_FAIL_CUSTOM = 23
UF_FAIL_INVALID_LOCATION = 24
UF_FAIL_DISABLE_HELP = 25
UF_FAIL_OUT_OF_WORLD = 26
UF_FAIL_NIGHTMARED = 27
UF_FAIL_OBSTRUCTED = 28
