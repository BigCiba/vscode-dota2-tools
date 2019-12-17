# **Dota2 API**
## **Globals**
---
### `void AddFOWViewer(int_1, Vector_2, float_3, float_4, bool_5 )`
#### Function Description
Add temporary vision for a given team ( nTeamID, vLocation, flRadius, flDuration, bObstructedVision)
#### Parameters
Type|Name|Description
--|--|--
int|int_1|No Description Set
Vector|Vector_2|No Description Set
float|float_3|No Description Set
float|float_4|No Description Set
bool|bool_5|No Description Set
---
### `float AngleDiff(float_1, float_2 )`
#### Function Description
Returns the number of degrees difference between two yaw angles
#### Parameters
Type|Name|Description
--|--|--
float|float_1|No Description Set
float|float_2|No Description Set
---
### `void AppendToLogFile(string_1, string_2 )`
#### Function Description
AppendToLogFile is deprecated. Print to the console for logging instead.
#### Parameters
Type|Name|Description
--|--|--
string|string_1|No Description Set
string|string_2|No Description Set
---
### `float ApplyDamage(handle_1 )`
#### Function Description
Damage an npc.
#### Parameters
Type|Name|Description
--|--|--
handle|handle_1|No Description Set
---
### `Quaternion AxisAngleToQuaternion(Vector_1, float_2 )`
#### Function Description
(vector,float) constructs a quaternion representing a rotation by angle around the specified vector axis
#### Parameters
Type|Name|Description
--|--|--
Vector|Vector_1|No Description Set
float|float_2|No Description Set
---
### `Vector CalcClosestPointOnEntityOBB(handle_1, Vector_2 )`
#### Function Description
Compute the closest point on the OBB of an entity.
#### Parameters
Type|Name|Description
--|--|--
handle|handle_1|No Description Set
Vector|Vector_2|No Description Set
---
### `float CalcDistanceBetweenEntityOBB(handle_1, handle_2 )`
#### Function Description
Compute the distance between two entity OBB. A negative return value indicates an input error. A return value of zero indicates that the OBBs are overlapping.
#### Parameters
Type|Name|Description
--|--|--
handle|handle_1|No Description Set
handle|handle_2|No Description Set
---
### `float CalcDistanceToLineSegment2D(Vector_1, Vector_2, Vector_3 )`
#### Function Description

#### Parameters
Type|Name|Description
--|--|--
Vector|Vector_1|No Description Set
Vector|Vector_2|No Description Set
Vector|Vector_3|No Description Set
---
### `void CancelEntityIOEvents(ehandle_1 )`
#### Function Description
Create all I/O events for a particular entity
#### Parameters
Type|Name|Description
--|--|--
ehandle|ehandle_1|No Description Set
---
### `void ClearTeamCustomHealthbarColor(int_1 )`
#### Function Description
( teamNumber )
#### Parameters
Type|Name|Description
--|--|--
int|int_1|No Description Set
---
### `handle CreateDamageInfo(handle_1, handle_2, Vector_3, Vector_4, float_5, int_6 )`
#### Function Description
(hInflictor, hAttacker, flDamage) - Allocate a damageinfo object, used as an argument to TakeDamage(). Call DestroyDamageInfo( hInfo ) to free the object.
#### Parameters
Type|Name|Description
--|--|--
handle|handle_1|No Description Set
handle|handle_2|No Description Set
Vector|Vector_3|No Description Set
Vector|Vector_4|No Description Set
float|float_5|No Description Set
int|int_6|No Description Set
---
### `bool CreateEffect(handle_1 )`
#### Function Description
Pass table - Inputs: entity, effect
#### Parameters
Type|Name|Description
--|--|--
handle|handle_1|No Description Set
---
### `handle CreateHTTPRequest(string_1, string_2 )`
#### Function Description
Create an HTTP request.
#### Parameters
Type|Name|Description
--|--|--
string|string_1|No Description Set
string|string_2|No Description Set
---
### `handle CreateHTTPRequestScriptVM(string_1, string_2 )`
#### Function Description
Create an HTTP request.
#### Parameters
Type|Name|Description
--|--|--
string|string_1|No Description Set
string|string_2|No Description Set
---
### `handle CreateHeroForPlayer(string_1, handle_2 )`
#### Function Description
Creates a DOTA hero by its dota_npc_units.txt name and sets it as the given player's controlled hero
#### Parameters
Type|Name|Description
--|--|--
string|string_1|No Description Set
handle|handle_2|No Description Set
---
### `handle CreateItem(string_1, handle_2, handle_3 )`
#### Function Description
Create a DOTA item
#### Parameters
Type|Name|Description
--|--|--
string|string_1|No Description Set
handle|handle_2|No Description Set
handle|handle_3|No Description Set
---
### `handle CreateItemOnPositionForLaunch(Vector_1, handle_2 )`
#### Function Description
Create a physical item at a given location, can start in air (but doesn't clear a space)
#### Parameters
Type|Name|Description
--|--|--
Vector|Vector_1|No Description Set
handle|handle_2|No Description Set
---
### `handle CreateItemOnPositionSync(Vector_1, handle_2 )`
#### Function Description
Create a physical item at a given location
#### Parameters
Type|Name|Description
--|--|--
Vector|Vector_1|No Description Set
handle|handle_2|No Description Set
---
### `handle CreateModifierThinker(handle_1, handle_2, string_3, handle_4, Vector_5, int_6, bool_7 )`
#### Function Description
Create a modifier not associated with an NPC. ( hCaster, hAbility, modifierName, paramTable, vOrigin, nTeamNumber, bPhantomBlocker )
#### Parameters
Type|Name|Description
--|--|--
handle|handle_1|No Description Set
handle|handle_2|No Description Set
string|string_3|No Description Set
handle|handle_4|No Description Set
Vector|Vector_5|No Description Set
int|int_6|No Description Set
bool|bool_7|No Description Set
---
### `handle CreateSceneEntity(string_1 )`
#### Function Description
Create a scene entity to play the specified scene.
#### Parameters
Type|Name|Description
--|--|--
string|string_1|No Description Set
---
### `handle CreateTempTree(Vector_1, float_2 )`
#### Function Description
Create a temporary tree, uses a default tree model. (vLocation, flDuration).
#### Parameters
Type|Name|Description
--|--|--
Vector|Vector_1|No Description Set
float|float_2|No Description Set
---
### `handle CreateTempTreeWithModel(Vector_1, float_2, string_3 )`
#### Function Description
Create a temporary tree, specifying the tree model name. (vLocation, flDuration, szModelName).
#### Parameters
Type|Name|Description
--|--|--
Vector|Vector_1|No Description Set
float|float_2|No Description Set
string|string_3|No Description Set
---
### `handle CreateTrigger(Vector_1, Vector_2, Vector_3 )`
#### Function Description
CreateTrigger( vecMin, vecMax ) : Creates and returns an AABB trigger
#### Parameters
Type|Name|Description
--|--|--
Vector|Vector_1|No Description Set
Vector|Vector_2|No Description Set
Vector|Vector_3|No Description Set
---
### `handle CreateTriggerRadiusApproximate(Vector_1, float_2 )`
#### Function Description
CreateTriggerRadiusApproximate( vecOrigin, flRadius ) : Creates and returns an AABB trigger thats bigger than the radius provided
#### Parameters
Type|Name|Description
--|--|--
Vector|Vector_1|No Description Set
float|float_2|No Description Set
---
### `handle CreateUnitByName(string_1, Vector_2, bool_3, handle_4, handle_5, int_6 )`
#### Function Description
Creates a DOTA unit by its dota_npc_units.txt name
#### Parameters
Type|Name|Description
--|--|--
string|string_1|No Description Set
Vector|Vector_2|No Description Set
bool|bool_3|No Description Set
handle|handle_4|No Description Set
handle|handle_5|No Description Set
int|int_6|No Description Set
---
### `int CreateUnitByNameAsync(string_1, Vector_2, bool_3, handle_4, handle_5, int_6, handle_7 )`
#### Function Description
Creates a DOTA unit by its dota_npc_units.txt name
#### Parameters
Type|Name|Description
--|--|--
string|string_1|No Description Set
Vector|Vector_2|No Description Set
bool|bool_3|No Description Set
handle|handle_4|No Description Set
handle|handle_5|No Description Set
int|int_6|No Description Set
handle|handle_7|No Description Set
---
### `handle CreateUnitFromTable(handle_1, Vector_2 )`
#### Function Description
Creates a DOTA unit by its dota_npc_units.txt name from a table of entity key values and a position to spawn at.
#### Parameters
Type|Name|Description
--|--|--
handle|handle_1|No Description Set
Vector|Vector_2|No Description Set
---
### `Vector CrossVectors(Vector_1, Vector_2 )`
#### Function Description
(vector,vector) cross product between two vectors
#### Parameters
Type|Name|Description
--|--|--
Vector|Vector_1|No Description Set
Vector|Vector_2|No Description Set
---
### `void DebugBreak( )`
#### Function Description
Breaks in the debugger
---
### `void DebugDrawBox(Vector_1, Vector_2, Vector_3, int_4, int_5, int_6, int_7, float_8 )`
#### Function Description
Draw a debug overlay box (origin, mins, maxs, forward, r, g, b, a, duration )
#### Parameters
Type|Name|Description
--|--|--
Vector|Vector_1|No Description Set
Vector|Vector_2|No Description Set
Vector|Vector_3|No Description Set
int|int_4|No Description Set
int|int_5|No Description Set
int|int_6|No Description Set
int|int_7|No Description Set
float|float_8|No Description Set
---
### `void DebugDrawBoxDirection(Vector_1, Vector_2, Vector_3, Vector_4, Vector_5, float_6, float_7 )`
#### Function Description
Draw a debug forward box (cent, min, max, forward, vRgb, a, duration)
#### Parameters
Type|Name|Description
--|--|--
Vector|Vector_1|No Description Set
Vector|Vector_2|No Description Set
Vector|Vector_3|No Description Set
Vector|Vector_4|No Description Set
Vector|Vector_5|No Description Set
float|float_6|No Description Set
float|float_7|No Description Set
---
### `void DebugDrawCircle(Vector_1, Vector_2, float_3, float_4, bool_5, float_6 )`
#### Function Description
Draw a debug circle (center, vRgb, a, rad, ztest, duration)
#### Parameters
Type|Name|Description
--|--|--
Vector|Vector_1|No Description Set
Vector|Vector_2|No Description Set
float|float_3|No Description Set
float|float_4|No Description Set
bool|bool_5|No Description Set
float|float_6|No Description Set
---
### `void DebugDrawClear( )`
#### Function Description
Try to clear all the debug overlay info
---
### `void DebugDrawLine(Vector_1, Vector_2, int_3, int_4, int_5, bool_6, float_7 )`
#### Function Description
Draw a debug overlay line (origin, target, r, g, b, ztest, duration)
#### Parameters
Type|Name|Description
--|--|--
Vector|Vector_1|No Description Set
Vector|Vector_2|No Description Set
int|int_3|No Description Set
int|int_4|No Description Set
int|int_5|No Description Set
bool|bool_6|No Description Set
float|float_7|No Description Set
---
### `void DebugDrawLine_vCol(Vector_1, Vector_2, Vector_3, bool_4, float_5 )`
#### Function Description
Draw a debug line using color vec (start, end, vRgb, a, ztest, duration)
#### Parameters
Type|Name|Description
--|--|--
Vector|Vector_1|No Description Set
Vector|Vector_2|No Description Set
Vector|Vector_3|No Description Set
bool|bool_4|No Description Set
float|float_5|No Description Set
---
### `void DebugDrawScreenTextLine(float_1, float_2, int_3, string_4, int_5, int_6, int_7, int_8, float_9 )`
#### Function Description
Draw text with a line offset (x, y, lineOffset, text, r, g, b, a, duration)
#### Parameters
Type|Name|Description
--|--|--
float|float_1|No Description Set
float|float_2|No Description Set
int|int_3|No Description Set
string|string_4|No Description Set
int|int_5|No Description Set
int|int_6|No Description Set
int|int_7|No Description Set
int|int_8|No Description Set
float|float_9|No Description Set
---
### `void DebugDrawSphere(Vector_1, Vector_2, float_3, float_4, bool_5, float_6 )`
#### Function Description
Draw a debug sphere (center, vRgb, a, rad, ztest, duration)
#### Parameters
Type|Name|Description
--|--|--
Vector|Vector_1|No Description Set
Vector|Vector_2|No Description Set
float|float_3|No Description Set
float|float_4|No Description Set
bool|bool_5|No Description Set
float|float_6|No Description Set
---
### `void DebugDrawText(Vector_1, string_2, bool_3, float_4 )`
#### Function Description
Draw text in 3d (origin, text, bViewCheck, duration)
#### Parameters
Type|Name|Description
--|--|--
Vector|Vector_1|No Description Set
string|string_2|No Description Set
bool|bool_3|No Description Set
float|float_4|No Description Set
---
### `void DebugScreenTextPretty(float_1, float_2, int_3, string_4, int_5, int_6, int_7, int_8, float_9, string_10, int_11, bool_12 )`
#### Function Description
Draw pretty debug text (x, y, lineOffset, text, r, g, b, a, duration, font, size, bBold)
#### Parameters
Type|Name|Description
--|--|--
float|float_1|No Description Set
float|float_2|No Description Set
int|int_3|No Description Set
string|string_4|No Description Set
int|int_5|No Description Set
int|int_6|No Description Set
int|int_7|No Description Set
int|int_8|No Description Set
float|float_9|No Description Set
string|string_10|No Description Set
int|int_11|No Description Set
bool|bool_12|No Description Set
---
### `void DestroyDamageInfo(handle_1 )`
#### Function Description
Free a damageinfo object that was created with CreateDamageInfo().
#### Parameters
Type|Name|Description
--|--|--
handle|handle_1|No Description Set
---
### `int DoCleaveAttack(handle_1, handle_2, handle_3, float_4, float_5, float_6, float_7, string_8 )`
#### Function Description
(hAttacker, hTarget, hAbility, fDamage, fRadius, effectName)
#### Parameters
Type|Name|Description
--|--|--
handle|handle_1|No Description Set
handle|handle_2|No Description Set
handle|handle_3|No Description Set
float|float_4|No Description Set
float|float_5|No Description Set
float|float_6|No Description Set
float|float_7|No Description Set
string|string_8|No Description Set
---
### `void DoEntFire(string_1, string_2, string_3, float_4, handle_5, handle_6 )`
#### Function Description
#EntFire:Generate and entity i/o event
#### Parameters
Type|Name|Description
--|--|--
string|string_1|No Description Set
string|string_2|No Description Set
string|string_3|No Description Set
float|float_4|No Description Set
handle|handle_5|No Description Set
handle|handle_6|No Description Set
---
### `void DoEntFireByInstanceHandle(handle_1, string_2, string_3, float_4, handle_5, handle_6 )`
#### Function Description
#EntFireByHandle:Generate and entity i/o event
#### Parameters
Type|Name|Description
--|--|--
handle|handle_1|No Description Set
string|string_2|No Description Set
string|string_3|No Description Set
float|float_4|No Description Set
handle|handle_5|No Description Set
handle|handle_6|No Description Set
---
### `bool DoIncludeScript(string_1, handle_2 )`
#### Function Description
Execute a script (internal)
#### Parameters
Type|Name|Description
--|--|--
string|string_1|No Description Set
handle|handle_2|No Description Set
---
### `void DoScriptAssert(bool_1, string_2 )`
#### Function Description
#ScriptAssert:Asserts the passed in value. Prints out a message and brings up the assert dialog.
#### Parameters
Type|Name|Description
--|--|--
bool|bool_1|No Description Set
string|string_2|No Description Set
---
### `string DoUniqueString(string_1 )`
#### Function Description
#UniqueString:Generate a string guaranteed to be unique across the life of the script VM, with an optional root string. Useful for adding data to tables when not sure what keys are already in use in that table.
#### Parameters
Type|Name|Description
--|--|--
string|string_1|No Description Set
---
### `float DotProduct(Vector_1, Vector_2 )`
#### Function Description

#### Parameters
Type|Name|Description
--|--|--
Vector|Vector_1|No Description Set
Vector|Vector_2|No Description Set
---
### `void EmitAnnouncerSound(string_1 )`
#### Function Description
Emit an announcer sound for all players.
#### Parameters
Type|Name|Description
--|--|--
string|string_1|No Description Set
---
### `void EmitAnnouncerSoundForPlayer(string_1, int_2 )`
#### Function Description
Emit an announcer sound for a player.
#### Parameters
Type|Name|Description
--|--|--
string|string_1|No Description Set
int|int_2|No Description Set
---
### `void EmitAnnouncerSoundForTeam(string_1, int_2 )`
#### Function Description
Emit an announcer sound for a team.
#### Parameters
Type|Name|Description
--|--|--
string|string_1|No Description Set
int|int_2|No Description Set
---
### `void EmitAnnouncerSoundForTeamOnLocation(string_1, int_2, Vector_3 )`
#### Function Description
Emit an announcer sound for a team at a specific location.
#### Parameters
Type|Name|Description
--|--|--
string|string_1|No Description Set
int|int_2|No Description Set
Vector|Vector_3|No Description Set
---
### `void EmitGlobalSound(string_1 )`
#### Function Description
Play named sound for all players
#### Parameters
Type|Name|Description
--|--|--
string|string_1|No Description Set
---
### `void EmitSoundOn(string_1, handle_2 )`
#### Function Description
Play named sound on Entity
#### Parameters
Type|Name|Description
--|--|--
string|string_1|No Description Set
handle|handle_2|No Description Set
---
### `void EmitSoundOnClient(string_1, handle_2 )`
#### Function Description
Play named sound only on the client for the passed in player
#### Parameters
Type|Name|Description
--|--|--
string|string_1|No Description Set
handle|handle_2|No Description Set
---
### `void EmitSoundOnLocationForAllies(Vector_1, string_2, handle_3 )`
#### Function Description
Emit a sound on a location from a unit, only for players allied with that unit (vLocation, soundName, hCaster
#### Parameters
Type|Name|Description
--|--|--
Vector|Vector_1|No Description Set
string|string_2|No Description Set
handle|handle_3|No Description Set
---
### `void EmitSoundOnLocationWithCaster(Vector_1, string_2, handle_3 )`
#### Function Description
Emit a sound on a location from a unit. (vLocation, soundName, hCaster).
#### Parameters
Type|Name|Description
--|--|--
Vector|Vector_1|No Description Set
string|string_2|No Description Set
handle|handle_3|No Description Set
---
### `handle EntIndexToHScript(int_1 )`
#### Function Description
Turn an entity index integer to an HScript representing that entity's script instance.
#### Parameters
Type|Name|Description
--|--|--
int|int_1|No Description Set
---
### `void ExecuteOrderFromTable(handle_1 )`
#### Function Description
Issue an order from a script table
#### Parameters
Type|Name|Description
--|--|--
handle|handle_1|No Description Set
---
### `float ExponentialDecay(float_1, float_2, float_3 )`
#### Function Description
Smooth curve decreasing slower as it approaches zero
#### Parameters
Type|Name|Description
--|--|--
float|float_1|No Description Set
float|float_2|No Description Set
float|float_3|No Description Set
---
### `bool FindClearRandomPositionAroundUnit(handle_1, handle_2, int_3 )`
#### Function Description
Finds a clear random position around a given target unit, using the target unit's padded collision radius.
#### Parameters
Type|Name|Description
--|--|--
handle|handle_1|No Description Set
handle|handle_2|No Description Set
int|int_3|No Description Set
---
### `bool FindClearSpaceForUnit(handle_1, Vector_2, bool_3 )`
#### Function Description
Place a unit somewhere not already occupied.
#### Parameters
Type|Name|Description
--|--|--
handle|handle_1|No Description Set
Vector|Vector_2|No Description Set
bool|bool_3|No Description Set
---
### `table FindUnitsInLine(int_1, Vector_2, Vector_3, handle_4, float_5, int_6, int_7, int_8 )`
#### Function Description
Find units that intersect the given line with the given flags.
#### Parameters
Type|Name|Description
--|--|--
int|int_1|No Description Set
Vector|Vector_2|No Description Set
Vector|Vector_3|No Description Set
handle|handle_4|No Description Set
float|float_5|No Description Set
int|int_6|No Description Set
int|int_7|No Description Set
int|int_8|No Description Set
---
### `table FindUnitsInRadius(int_1, Vector_2, handle_3, float_4, int_5, int_6, int_7, int_8, bool_9 )`
#### Function Description
Finds the units in a given radius with the given flags.
#### Parameters
Type|Name|Description
--|--|--
int|int_1|No Description Set
Vector|Vector_2|No Description Set
handle|handle_3|No Description Set
float|float_4|No Description Set
int|int_5|No Description Set
int|int_6|No Description Set
int|int_7|No Description Set
int|int_8|No Description Set
bool|bool_9|No Description Set
---
### `void FireEntityIOInputNameOnly(ehandle_1, string_2 )`
#### Function Description
Fire Entity's Action Input w/no data
#### Parameters
Type|Name|Description
--|--|--
ehandle|ehandle_1|No Description Set
string|string_2|No Description Set
---
### `void FireEntityIOInputString(ehandle_1, string_2, string_3 )`
#### Function Description
Fire Entity's Action Input with passed String - you own the memory
#### Parameters
Type|Name|Description
--|--|--
ehandle|ehandle_1|No Description Set
string|string_2|No Description Set
string|string_3|No Description Set
---
### `void FireEntityIOInputVec(ehandle_1, string_2, Vector_3 )`
#### Function Description
Fire Entity's Action Input with passed Vector - you own the memory
#### Parameters
Type|Name|Description
--|--|--
ehandle|ehandle_1|No Description Set
string|string_2|No Description Set
Vector|Vector_3|No Description Set
---
### `void FireGameEvent(string_1, handle_2 )`
#### Function Description
Fire a game event.
#### Parameters
Type|Name|Description
--|--|--
string|string_1|No Description Set
handle|handle_2|No Description Set
---
### `void FireGameEventLocal(string_1, handle_2 )`
#### Function Description
Fire a game event without broadcasting to the client.
#### Parameters
Type|Name|Description
--|--|--
string|string_1|No Description Set
handle|handle_2|No Description Set
---
### `float FrameTime( )`
#### Function Description
Get the time spent on the server in the last frame
---
### `string GetDedicatedServerKey(string_1 )`
#### Function Description
( version )
#### Parameters
Type|Name|Description
--|--|--
string|string_1|No Description Set
---
### `string GetDedicatedServerKeyV2(string_1 )`
#### Function Description
( version )
#### Parameters
Type|Name|Description
--|--|--
string|string_1|No Description Set
---
### `<unknown> GetEntityIndexForTreeId(unsigned_1 )`
#### Function Description
Get the enity index for a tree id specified as the entindex_target of a DOTA_UNIT_ORDER_CAST_TARGET_TREE.
#### Parameters
Type|Name|Description
--|--|--
unsigned|unsigned_1|No Description Set
---
### `int GetFrameCount( )`
#### Function Description
Returns the engines current frame count
---
### `float GetGroundHeight(Vector_1, handle_2 )`
#### Function Description

#### Parameters
Type|Name|Description
--|--|--
Vector|Vector_1|No Description Set
handle|handle_2|No Description Set
---
### `Vector GetGroundPosition(Vector_1, handle_2 )`
#### Function Description
Returns the supplied position moved to the ground. Second parameter is an NPC for measuring movement collision hull offset.
#### Parameters
Type|Name|Description
--|--|--
Vector|Vector_1|No Description Set
handle|handle_2|No Description Set
---
### `int GetItemCost(string_1 )`
#### Function Description
Get the cost of an item by name.
#### Parameters
Type|Name|Description
--|--|--
string|string_1|No Description Set
---
### `int GetItemDefOwnedCount(int_1, int_2 )`
#### Function Description

#### Parameters
Type|Name|Description
--|--|--
int|int_1|No Description Set
int|int_2|No Description Set
---
### `int GetItemDefQuantity(int_1, int_2 )`
#### Function Description

#### Parameters
Type|Name|Description
--|--|--
int|int_1|No Description Set
int|int_2|No Description Set
---
### `handle GetListenServerHost( )`
#### Function Description
Get the local player on a listen server.
---
### `table GetLobbyEventGameDetails( )`
#### Function Description
( )
---
### `string GetMapName( )`
#### Function Description
Get the name of the map.
---
### `float GetMaxOutputDelay(ehandle_1, string_2 )`
#### Function Description
Get the longest delay for all events attached to an output
#### Parameters
Type|Name|Description
--|--|--
ehandle|ehandle_1|No Description Set
string|string_2|No Description Set
---
### `Vector GetPhysAngularVelocity(handle_1 )`
#### Function Description
Get Angular Velocity for VPHYS or normal object. Returns a vector of the axis of rotation, multiplied by the degrees of rotation per second.
#### Parameters
Type|Name|Description
--|--|--
handle|handle_1|No Description Set
---
### `Vector GetPhysVelocity(handle_1 )`
#### Function Description
Get Velocity for VPHYS or normal object
#### Parameters
Type|Name|Description
--|--|--
handle|handle_1|No Description Set
---
### `string GetSystemDate( )`
#### Function Description
Get the current real world date
---
### `string GetSystemTime( )`
#### Function Description
Get the current real world time
---
### `Vector GetTargetAOELocation(int_1, int_2, int_3, Vector_4, int_5, int_6, int_7 )`
#### Function Description

#### Parameters
Type|Name|Description
--|--|--
int|int_1|No Description Set
int|int_2|No Description Set
int|int_3|No Description Set
Vector|Vector_4|No Description Set
int|int_5|No Description Set
int|int_6|No Description Set
int|int_7|No Description Set
---
### `Vector GetTargetLinearLocation(int_1, int_2, int_3, Vector_4, int_5, int_6, int_7 )`
#### Function Description

#### Parameters
Type|Name|Description
--|--|--
int|int_1|No Description Set
int|int_2|No Description Set
int|int_3|No Description Set
Vector|Vector_4|No Description Set
int|int_5|No Description Set
int|int_6|No Description Set
int|int_7|No Description Set
---
### `int GetTeamHeroKills(int_1 )`
#### Function Description
( int teamID )
#### Parameters
Type|Name|Description
--|--|--
int|int_1|No Description Set
---
### `string GetTeamName(int_1 )`
#### Function Description
( int teamID )
#### Parameters
Type|Name|Description
--|--|--
int|int_1|No Description Set
---
### `int GetTreeIdForEntityIndex(int_1 )`
#### Function Description
Given and entity index of a tree, get the tree id for use for use with with unit orders.
#### Parameters
Type|Name|Description
--|--|--
int|int_1|No Description Set
---
### `float GetWorldMaxX( )`
#### Function Description
Gets the world's maximum X position.
---
### `float GetWorldMaxY( )`
#### Function Description
Gets the world's maximum Y position.
---
### `float GetWorldMinX( )`
#### Function Description
Gets the world's minimum X position.
---
### `float GetWorldMinY( )`
#### Function Description
Gets the world's minimum Y position.
---
### `void InitLogFile(string_1, string_2 )`
#### Function Description
InitLogFile is deprecated. Print to the console for logging instead.
#### Parameters
Type|Name|Description
--|--|--
string|string_1|No Description Set
string|string_2|No Description Set
---
### `bool IsClient( )`
#### Function Description
Returns true if this is lua running from the client.dll.
---
### `bool IsDedicatedServer( )`
#### Function Description
Returns true if this server is a dedicated server.
---
### `bool IsInToolsMode( )`
#### Function Description
Returns true if this is lua running within tools mode.
---
### `bool IsLocationVisible(int_1, Vector_2 )`
#### Function Description
Ask fog of war if a location is visible to a certain team (nTeamNumber, vLocation).
#### Parameters
Type|Name|Description
--|--|--
int|int_1|No Description Set
Vector|Vector_2|No Description Set
---
### `bool IsMarkedForDeletion(handle_1 )`
#### Function Description
Returns true if the entity is valid and marked for deletion.
#### Parameters
Type|Name|Description
--|--|--
handle|handle_1|No Description Set
---
### `bool IsServer( )`
#### Function Description
Returns true if this is lua running from the server.dll.
---
### `bool IsValidEntity(handle_1 )`
#### Function Description
Checks to see if the given hScript is a valid entity
#### Parameters
Type|Name|Description
--|--|--
handle|handle_1|No Description Set
---
### `Vector LerpVectors(Vector_1, Vector_2, float_3 )`
#### Function Description
(vector,vector,float) lerp between two vectors by a float factor returning new vector
#### Parameters
Type|Name|Description
--|--|--
Vector|Vector_1|No Description Set
Vector|Vector_2|No Description Set
float|float_3|No Description Set
---
### `void LimitPathingSearchDepth(float_1 )`
#### Function Description
Set the limit on the pathfinding search space.
#### Parameters
Type|Name|Description
--|--|--
float|float_1|No Description Set
---
### `void LinkLuaModifier(string_1, string_2, int_3 )`
#### Function Description
Link a lua-defined modifier with the associated class ( className, fileName, LuaModifierType).
#### Parameters
Type|Name|Description
--|--|--
string|string_1|No Description Set
string|string_2|No Description Set
int|int_3|No Description Set
---
### `int ListenToGameEvent(string_1, handle_2, handle_3 )`
#### Function Description
Register as a listener for a game event from script.
#### Parameters
Type|Name|Description
--|--|--
string|string_1|No Description Set
handle|handle_2|No Description Set
handle|handle_3|No Description Set
---
### `table LoadKeyValues(string_1 )`
#### Function Description
Creates a table from the specified keyvalues text file
#### Parameters
Type|Name|Description
--|--|--
string|string_1|No Description Set
---
### `table LoadKeyValuesFromString(string_1 )`
#### Function Description
Creates a table from the specified keyvalues string
#### Parameters
Type|Name|Description
--|--|--
string|string_1|No Description Set
---
### `table LocalTime( )`
#### Function Description
Get the current local time
---
### `int MakeStringToken(string_1 )`
#### Function Description
Checks to see if the given hScript is a valid entity
#### Parameters
Type|Name|Description
--|--|--
string|string_1|No Description Set
---
### `void MinimapEvent(int_1, handle_2, int_3, int_4, int_5, int_6 )`
#### Function Description
Start a minimap event. (nTeamID, hEntity, nXCoord, nYCoord, nEventType, nEventDuration).
#### Parameters
Type|Name|Description
--|--|--
int|int_1|No Description Set
handle|handle_2|No Description Set
int|int_3|No Description Set
int|int_4|No Description Set
int|int_5|No Description Set
int|int_6|No Description Set
---
### `void Msg(string_1 )`
#### Function Description
Print a message
#### Parameters
Type|Name|Description
--|--|--
string|string_1|No Description Set
---
### `void PauseGame(bool_1 )`
#### Function Description
Pause or unpause the game.
#### Parameters
Type|Name|Description
--|--|--
bool|bool_1|No Description Set
---
### `handle PlayerInstanceFromIndex(int_1 )`
#### Function Description
Get a script instance of a player by index.
#### Parameters
Type|Name|Description
--|--|--
int|int_1|No Description Set
---
### `void PrecacheEntityFromTable(string_1, handle_2, handle_3 )`
#### Function Description
Precache an entity from KeyValues in table
#### Parameters
Type|Name|Description
--|--|--
string|string_1|No Description Set
handle|handle_2|No Description Set
handle|handle_3|No Description Set
---
### `void PrecacheEntityListFromTable(handle_1, handle_2 )`
#### Function Description
Precache a list of entity KeyValues tables
#### Parameters
Type|Name|Description
--|--|--
handle|handle_1|No Description Set
handle|handle_2|No Description Set
---
### `void PrecacheItemByNameAsync(string_1, handle_2 )`
#### Function Description
Asynchronously precaches a DOTA item by its dota_npc_items.txt name, provides a callback when it's finished.
#### Parameters
Type|Name|Description
--|--|--
string|string_1|No Description Set
handle|handle_2|No Description Set
---
### `void PrecacheItemByNameSync(string_1, handle_2 )`
#### Function Description
Precaches a DOTA item by its dota_npc_items.txt name
#### Parameters
Type|Name|Description
--|--|--
string|string_1|No Description Set
handle|handle_2|No Description Set
---
### `void PrecacheModel(string_1, handle_2 )`
#### Function Description
( modelName, context ) - Manually precache a single model
#### Parameters
Type|Name|Description
--|--|--
string|string_1|No Description Set
handle|handle_2|No Description Set
---
### `void PrecacheResource(string_1, string_2, handle_3 )`
#### Function Description
Manually precache a single resource
#### Parameters
Type|Name|Description
--|--|--
string|string_1|No Description Set
string|string_2|No Description Set
handle|handle_3|No Description Set
---
### `void PrecacheUnitByNameAsync(string_1, handle_2, int_3 )`
#### Function Description
Asynchronously precaches a DOTA unit by its dota_npc_units.txt name, provides a callback when it's finished.
#### Parameters
Type|Name|Description
--|--|--
string|string_1|No Description Set
handle|handle_2|No Description Set
int|int_3|No Description Set
---
### `void PrecacheUnitByNameSync(string_1, handle_2, int_3 )`
#### Function Description
Precaches a DOTA unit by its dota_npc_units.txt name
#### Parameters
Type|Name|Description
--|--|--
string|string_1|No Description Set
handle|handle_2|No Description Set
int|int_3|No Description Set
---
### `void PrecacheUnitFromTableAsync(handle_1, handle_2 )`
#### Function Description
Precaches a DOTA unit from a table of entity key values.
#### Parameters
Type|Name|Description
--|--|--
handle|handle_1|No Description Set
handle|handle_2|No Description Set
---
### `void PrecacheUnitFromTableSync(handle_1, handle_2 )`
#### Function Description
Precaches a DOTA unit from a table of entity key values.
#### Parameters
Type|Name|Description
--|--|--
handle|handle_1|No Description Set
handle|handle_2|No Description Set
---
### `void PrintLinkedConsoleMessage(string_1, string_2 )`
#### Function Description
Print a console message with a linked console command
#### Parameters
Type|Name|Description
--|--|--
string|string_1|No Description Set
string|string_2|No Description Set
---
### `float RandomFloat(float_1, float_2 )`
#### Function Description
Get a random float within a range
#### Parameters
Type|Name|Description
--|--|--
float|float_1|No Description Set
float|float_2|No Description Set
---
### `int RandomInt(int_1, int_2 )`
#### Function Description
Get a random int within a range
#### Parameters
Type|Name|Description
--|--|--
int|int_1|No Description Set
int|int_2|No Description Set
---
### `Vector RandomVector(float_1 )`
#### Function Description
Get a random 2D vector of the given length.
#### Parameters
Type|Name|Description
--|--|--
float|float_1|No Description Set
---
### `void RegisterCustomAnimationScriptForModel(string_1, string_2 )`
#### Function Description
Register a custom animation script to run when a model loads
#### Parameters
Type|Name|Description
--|--|--
string|string_1|No Description Set
string|string_2|No Description Set
---
### `void RegisterSpawnGroupFilterProxy(string_1 )`
#### Function Description
Create a C proxy for a script-based spawn group filter
#### Parameters
Type|Name|Description
--|--|--
string|string_1|No Description Set
---
### `void ReloadMOTD( )`
#### Function Description
Reloads the MotD file
---
### `void RemoveSpawnGroupFilterProxy(string_1 )`
#### Function Description
Remove the C proxy for a script-based spawn group filter
#### Parameters
Type|Name|Description
--|--|--
string|string_1|No Description Set
---
### `void ResolveNPCPositions(Vector_1, float_2 )`
#### Function Description
Check and fix units that have been assigned a position inside collision radius of other NPCs.
#### Parameters
Type|Name|Description
--|--|--
Vector|Vector_1|No Description Set
float|float_2|No Description Set
---
### `bool RollPercentage(int_1 )`
#### Function Description
(int nPct)
#### Parameters
Type|Name|Description
--|--|--
int|int_1|No Description Set
---
### `QAngle RotateOrientation(QAngle_1, QAngle_2 )`
#### Function Description
Rotate a QAngle by another QAngle.
#### Parameters
Type|Name|Description
--|--|--
QAngle|QAngle_1|No Description Set
QAngle|QAngle_2|No Description Set
---
### `Vector RotatePosition(Vector_1, QAngle_2, Vector_3 )`
#### Function Description
Rotate a Vector around a point.
#### Parameters
Type|Name|Description
--|--|--
Vector|Vector_1|No Description Set
QAngle|QAngle_2|No Description Set
Vector|Vector_3|No Description Set
---
### `Quaternion RotateQuaternionByAxisAngle(Quaternion_1, Vector_2, float_3 )`
#### Function Description
(quaternion,vector,float) rotates a quaternion by the specified angle around the specified vector axis
#### Parameters
Type|Name|Description
--|--|--
Quaternion|Quaternion_1|No Description Set
Vector|Vector_2|No Description Set
float|float_3|No Description Set
---
### `QAngle RotationDelta(QAngle_1, QAngle_2 )`
#### Function Description
Find the delta between two QAngles.
#### Parameters
Type|Name|Description
--|--|--
QAngle|QAngle_1|No Description Set
QAngle|QAngle_2|No Description Set
---
### `Vector RotationDeltaAsAngularVelocity(QAngle_1, QAngle_2 )`
#### Function Description
converts delta QAngle to an angular velocity Vector
#### Parameters
Type|Name|Description
--|--|--
QAngle|QAngle_1|No Description Set
QAngle|QAngle_2|No Description Set
---
### `void Say(handle_1, string_2, bool_3 )`
#### Function Description
Have Entity say string, and teamOnly or not
#### Parameters
Type|Name|Description
--|--|--
handle|handle_1|No Description Set
string|string_2|No Description Set
bool|bool_3|No Description Set
---
### `void ScreenShake(Vector_1, float_2, float_3, float_4, float_5, int_6, bool_7 )`
#### Function Description
Start a screenshake with the following parameters. vecCenter, flAmplitude, flFrequency, flDuration, flRadius, eCommand( SHAKE_START = 0, SHAKE_STOP = 1 ), bAirShake
#### Parameters
Type|Name|Description
--|--|--
Vector|Vector_1|No Description Set
float|float_2|No Description Set
float|float_3|No Description Set
float|float_4|No Description Set
float|float_5|No Description Set
int|int_6|No Description Set
bool|bool_7|No Description Set
---
### `void SendOverheadEventMessage(handle_1, int_2, handle_3, int_4, handle_5 )`
#### Function Description
( DOTAPlayer sendToPlayer, int iMessageType, Entity targetEntity, int iValue, DOTAPlayer sourcePlayer ) - sendToPlayer and sourcePlayer can be nil - iMessageType is one of OVERHEAD_ALERT_*
#### Parameters
Type|Name|Description
--|--|--
handle|handle_1|No Description Set
int|int_2|No Description Set
handle|handle_3|No Description Set
int|int_4|No Description Set
handle|handle_5|No Description Set
---
### `void SendToConsole(string_1 )`
#### Function Description
Send a string to the console as a client command
#### Parameters
Type|Name|Description
--|--|--
string|string_1|No Description Set
---
### `void SendToServerConsole(string_1 )`
#### Function Description
Send a string to the console as a server command
#### Parameters
Type|Name|Description
--|--|--
string|string_1|No Description Set
---
### `void SetOpvarFloatAll(string_1, string_2, string_3, float_4 )`
#### Function Description
Sets an opvar value for all players
#### Parameters
Type|Name|Description
--|--|--
string|string_1|No Description Set
string|string_2|No Description Set
string|string_3|No Description Set
float|float_4|No Description Set
---
### `void SetOpvarFloatPlayer(string_1, string_2, string_3, float_4, handle_5 )`
#### Function Description
Sets an opvar value for a single player
#### Parameters
Type|Name|Description
--|--|--
string|string_1|No Description Set
string|string_2|No Description Set
string|string_3|No Description Set
float|float_4|No Description Set
handle|handle_5|No Description Set
---
### `void SetPhysAngularVelocity(handle_1, Vector_2 )`
#### Function Description
Set Angular Velocity for VPHYS or normal object, from a vector of the axis of rotation, multiplied by the degrees of rotation per second.
#### Parameters
Type|Name|Description
--|--|--
handle|handle_1|No Description Set
Vector|Vector_2|No Description Set
---
### `void SetQuestName(string_1 )`
#### Function Description
Set the current quest name.
#### Parameters
Type|Name|Description
--|--|--
string|string_1|No Description Set
---
### `void SetQuestPhase(int_1 )`
#### Function Description
Set the current quest phase.
#### Parameters
Type|Name|Description
--|--|--
int|int_1|No Description Set
---
### `void SetRenderingEnabled(ehandle_1, bool_2 )`
#### Function Description
Set rendering on/off for an ehandle
#### Parameters
Type|Name|Description
--|--|--
ehandle|ehandle_1|No Description Set
bool|bool_2|No Description Set
---
### `void SetTeamCustomHealthbarColor(int_1, int_2, int_3, int_4 )`
#### Function Description
( teamNumber, r, g, b )
#### Parameters
Type|Name|Description
--|--|--
int|int_1|No Description Set
int|int_2|No Description Set
int|int_3|No Description Set
int|int_4|No Description Set
---
### `void ShowCustomHeaderMessage(string_1, int_2, int_3, float_4 )`
#### Function Description
( const char *pszMessage, int nPlayerID, int nValue, float flTime ) - Supports localized strings - %s1 = PlayerName, %s2 = Value, %s3 = TeamName
#### Parameters
Type|Name|Description
--|--|--
string|string_1|No Description Set
int|int_2|No Description Set
int|int_3|No Description Set
float|float_4|No Description Set
---
### `void ShowGenericPopup(string_1, string_2, string_3, string_4, int_5 )`
#### Function Description
Show a generic popup dialog for all players.
#### Parameters
Type|Name|Description
--|--|--
string|string_1|No Description Set
string|string_2|No Description Set
string|string_3|No Description Set
string|string_4|No Description Set
int|int_5|No Description Set
---
### `void ShowGenericPopupToPlayer(handle_1, string_2, string_3, string_4, string_5, int_6 )`
#### Function Description
Show a generic popup dialog to a specific player.
#### Parameters
Type|Name|Description
--|--|--
handle|handle_1|No Description Set
string|string_2|No Description Set
string|string_3|No Description Set
string|string_4|No Description Set
string|string_5|No Description Set
int|int_6|No Description Set
---
### `void ShowMessage(string_1 )`
#### Function Description
Print a hud message on all clients
#### Parameters
Type|Name|Description
--|--|--
string|string_1|No Description Set
---
### `handle SpawnDOTAShopTriggerRadiusApproximate(Vector_1, float_2 )`
#### Function Description
(Vector vOrigin, float flRadius )
#### Parameters
Type|Name|Description
--|--|--
Vector|Vector_1|No Description Set
float|float_2|No Description Set
---
### `handle SpawnEntityFromTableSynchronous(string_1, handle_2 )`
#### Function Description
Synchronously spawns a single entity from a table
#### Parameters
Type|Name|Description
--|--|--
string|string_1|No Description Set
handle|handle_2|No Description Set
---
### `bool SpawnEntityGroupFromTable(handle_1, bool_2, handle_3 )`
#### Function Description
Hierarchically spawn an entity group from a set of spawn tables.
#### Parameters
Type|Name|Description
--|--|--
handle|handle_1|No Description Set
bool|bool_2|No Description Set
handle|handle_3|No Description Set
---
### `int SpawnEntityListFromTableAsynchronous(handle_1, handle_2 )`
#### Function Description
Asynchronously spawn an entity group from a list of spawn tables. A callback will be triggered when the spawning is complete
#### Parameters
Type|Name|Description
--|--|--
handle|handle_1|No Description Set
handle|handle_2|No Description Set
---
### `handle SpawnEntityListFromTableSynchronous(handle_1 )`
#### Function Description
Synchronously spawn an entity group from a list of spawn tables.
#### Parameters
Type|Name|Description
--|--|--
handle|handle_1|No Description Set
---
### `Quaternion SplineQuaternions(Quaternion_1, Quaternion_2, float_3 )`
#### Function Description
(quaternion,quaternion,float) very basic interpolation of v0 to v1 over t on [0,1]
#### Parameters
Type|Name|Description
--|--|--
Quaternion|Quaternion_1|No Description Set
Quaternion|Quaternion_2|No Description Set
float|float_3|No Description Set
---
### `Vector SplineVectors(Vector_1, Vector_2, float_3 )`
#### Function Description
(vector,vector,float) very basic interpolation of v0 to v1 over t on [0,1]
#### Parameters
Type|Name|Description
--|--|--
Vector|Vector_1|No Description Set
Vector|Vector_2|No Description Set
float|float_3|No Description Set
---
### `void StartSoundEvent(string_1, handle_2 )`
#### Function Description
Start a sound event
#### Parameters
Type|Name|Description
--|--|--
string|string_1|No Description Set
handle|handle_2|No Description Set
---
### `void StartSoundEventFromPosition(string_1, Vector_2 )`
#### Function Description
Start a sound event from position
#### Parameters
Type|Name|Description
--|--|--
string|string_1|No Description Set
Vector|Vector_2|No Description Set
---
### `void StartSoundEventFromPositionReliable(string_1, Vector_2 )`
#### Function Description
Start a sound event from position with reliable delivery
#### Parameters
Type|Name|Description
--|--|--
string|string_1|No Description Set
Vector|Vector_2|No Description Set
---
### `void StartSoundEventFromPositionUnreliable(string_1, Vector_2 )`
#### Function Description
Start a sound event from position with optional delivery
#### Parameters
Type|Name|Description
--|--|--
string|string_1|No Description Set
Vector|Vector_2|No Description Set
---
### `void StartSoundEventReliable(string_1, handle_2 )`
#### Function Description
Start a sound event with reliable delivery
#### Parameters
Type|Name|Description
--|--|--
string|string_1|No Description Set
handle|handle_2|No Description Set
---
### `void StartSoundEventUnreliable(string_1, handle_2 )`
#### Function Description
Start a sound event with optional delivery
#### Parameters
Type|Name|Description
--|--|--
string|string_1|No Description Set
handle|handle_2|No Description Set
---
### `void StopEffect(handle_1, string_2 )`
#### Function Description
Pass entity and effect name
#### Parameters
Type|Name|Description
--|--|--
handle|handle_1|No Description Set
string|string_2|No Description Set
---
### `void StopGlobalSound(string_1 )`
#### Function Description
Stop named sound for all players
#### Parameters
Type|Name|Description
--|--|--
string|string_1|No Description Set
---
### `void StopListeningToAllGameEvents(handle_1 )`
#### Function Description
Stop listening to all game events within a specific context.
#### Parameters
Type|Name|Description
--|--|--
handle|handle_1|No Description Set
---
### `bool StopListeningToGameEvent(int_1 )`
#### Function Description
Stop listening to a particular game event.
#### Parameters
Type|Name|Description
--|--|--
int|int_1|No Description Set
---
### `void StopSoundEvent(string_1, handle_2 )`
#### Function Description
Stops a sound event with optional delivery
#### Parameters
Type|Name|Description
--|--|--
string|string_1|No Description Set
handle|handle_2|No Description Set
---
### `void StopSoundOn(string_1, handle_2 )`
#### Function Description
Stop named sound on Entity
#### Parameters
Type|Name|Description
--|--|--
string|string_1|No Description Set
handle|handle_2|No Description Set
---
### `float Time( )`
#### Function Description
Get the current server time
---
### `bool TraceCollideable(handle_1 )`
#### Function Description
Pass table - Inputs: start, end, ent, (optional mins, maxs) -- outputs: pos, fraction, hit, startsolid, normal
#### Parameters
Type|Name|Description
--|--|--
handle|handle_1|No Description Set
---
### `bool TraceHull(handle_1 )`
#### Function Description
Pass table - Inputs: start, end, min, max, mask, ignore  -- outputs: pos, fraction, hit, enthit, startsolid
#### Parameters
Type|Name|Description
--|--|--
handle|handle_1|No Description Set
---
### `bool TraceLine(handle_1 )`
#### Function Description
Pass table - Inputs: startpos, endpos, mask, ignore  -- outputs: pos, fraction, hit, enthit, startsolid
#### Parameters
Type|Name|Description
--|--|--
handle|handle_1|No Description Set
---
### `float UTIL_AngleDiff(float_1, float_2 )`
#### Function Description
Returns the number of degrees difference between two yaw angles
#### Parameters
Type|Name|Description
--|--|--
float|float_1|No Description Set
float|float_2|No Description Set
---
### `void UTIL_MessageText(int_1, string_2, int_3, int_4, int_5, int_6 )`
#### Function Description
Sends colored text to one client.
#### Parameters
Type|Name|Description
--|--|--
int|int_1|No Description Set
string|string_2|No Description Set
int|int_3|No Description Set
int|int_4|No Description Set
int|int_5|No Description Set
int|int_6|No Description Set
---
### `void UTIL_MessageTextAll(string_1, int_2, int_3, int_4, int_5 )`
#### Function Description
Sends colored text to all clients.
#### Parameters
Type|Name|Description
--|--|--
string|string_1|No Description Set
int|int_2|No Description Set
int|int_3|No Description Set
int|int_4|No Description Set
int|int_5|No Description Set
---
### `void UTIL_MessageTextAll_WithContext(string_1, int_2, int_3, int_4, int_5, handle_6 )`
#### Function Description
Sends colored text to all clients. (Valid context keys: player_id, value, team_id)
#### Parameters
Type|Name|Description
--|--|--
string|string_1|No Description Set
int|int_2|No Description Set
int|int_3|No Description Set
int|int_4|No Description Set
int|int_5|No Description Set
handle|handle_6|No Description Set
---
### `void UTIL_MessageText_WithContext(int_1, string_2, int_3, int_4, int_5, int_6, handle_7 )`
#### Function Description
Sends colored text to one client. (Valid context keys: player_id, value, team_id)
#### Parameters
Type|Name|Description
--|--|--
int|int_1|No Description Set
string|string_2|No Description Set
int|int_3|No Description Set
int|int_4|No Description Set
int|int_5|No Description Set
int|int_6|No Description Set
handle|handle_7|No Description Set
---
### `void UTIL_Remove(handle_1 )`
#### Function Description
Removes the specified entity
#### Parameters
Type|Name|Description
--|--|--
handle|handle_1|No Description Set
---
### `void UTIL_RemoveImmediate(handle_1 )`
#### Function Description
Immediately removes the specified entity
#### Parameters
Type|Name|Description
--|--|--
handle|handle_1|No Description Set
---
### `void UTIL_ResetMessageText(int_1 )`
#### Function Description
Clear all message text on one client.
#### Parameters
Type|Name|Description
--|--|--
int|int_1|No Description Set
---
### `void UTIL_ResetMessageTextAll( )`
#### Function Description
Clear all message text from all clients.
---
### `int UnitFilter(handle_1, int_2, int_3, int_4, int_5 )`
#### Function Description
Check if a unit passes a set of filters. (hNPC, nTargetTeam, nTargetType, nTargetFlags, nTeam
#### Parameters
Type|Name|Description
--|--|--
handle|handle_1|No Description Set
int|int_2|No Description Set
int|int_3|No Description Set
int|int_4|No Description Set
int|int_5|No Description Set
---
### `void UnloadSpawnGroup(string_1 )`
#### Function Description
Unload a spawn group by name
#### Parameters
Type|Name|Description
--|--|--
string|string_1|No Description Set
---
### `void UnloadSpawnGroupByHandle(int_1 )`
#### Function Description
Unload a spawn group by handle
#### Parameters
Type|Name|Description
--|--|--
int|int_1|No Description Set
---
### `void UpdateEventPoints(handle_1 )`
#### Function Description
( hEventPointData )
#### Parameters
Type|Name|Description
--|--|--
handle|handle_1|No Description Set
---
### `QAngle VectorAngles(Vector_1 )`
#### Function Description

#### Parameters
Type|Name|Description
--|--|--
Vector|Vector_1|No Description Set
---
### `QAngle VectorToAngles(Vector_1 )`
#### Function Description
Get Qangles (with no roll) for a Vector.
#### Parameters
Type|Name|Description
--|--|--
Vector|Vector_1|No Description Set
---
### `void Warning(string_1 )`
#### Function Description
Print a warning
#### Parameters
Type|Name|Description
--|--|--
string|string_1|No Description Set
---
### `float cvar_getf(string_1 )`
#### Function Description
Gets the value of the given cvar, as a float.
#### Parameters
Type|Name|Description
--|--|--
string|string_1|No Description Set
---
### `bool cvar_setf(string_1, float_2 )`
#### Function Description
Sets the value of the given cvar, as a float.
#### Parameters
Type|Name|Description
--|--|--
string|string_1|No Description Set
float|float_2|No Description Set
---
### `bool rr_AddDecisionRule(handle_1 )`
#### Function Description
Add a rule to the decision database.
#### Parameters
Type|Name|Description
--|--|--
handle|handle_1|No Description Set
---
### `bool rr_CommitAIResponse(handle_1, handle_2 )`
#### Function Description
Commit the result of QueryBestResponse back to the given entity to play. Call with params (entity, airesponse)
#### Parameters
Type|Name|Description
--|--|--
handle|handle_1|No Description Set
handle|handle_2|No Description Set
---
### `handle rr_GetResponseTargets( )`
#### Function Description
Retrieve a table of all available expresser targets, in the form { name : handle, name: handle }.
---
### `bool rr_QueryBestResponse(handle_1, handle_2, handle_3 )`
#### Function Description
Params: (entity, query) : tests 'query' against entity's response system and returns the best response found (or null if none found).
#### Parameters
Type|Name|Description
--|--|--
handle|handle_1|No Description Set
handle|handle_2|No Description Set
handle|handle_3|No Description Set
---
## **CBaseAnimating**
---
### `float CBaseAnimating:ActiveSequenceDuration( )`
#### Function Description
Returns the duration in seconds of the active sequence.
---
### `Vector CBaseAnimating:GetAttachmentAngles(iAttachment )`
#### Function Description
Get the attachment id's angles as a p,y,r vector.
#### Parameters
Type|Name|Description
--|--|--
int|iAttachment|No Description Set
---
### `Vector CBaseAnimating:GetAttachmentForward(iAttachment )`
#### Function Description
Get the attachment id's forward vector.
#### Parameters
Type|Name|Description
--|--|--
int|iAttachment|No Description Set
---
### `Vector CBaseAnimating:GetAttachmentOrigin(iAttachment )`
#### Function Description
Get the attachment id's origin vector.
#### Parameters
Type|Name|Description
--|--|--
int|iAttachment|No Description Set
---
### `float CBaseAnimating:GetCycle( )`
#### Function Description
Get the cycle of the animation.
---
### `table CBaseAnimating:GetGraphParameter(pszParam )`
#### Function Description
Get the value of the given animGraph parameter
#### Parameters
Type|Name|Description
--|--|--
string|pszParam|No Description Set
---
### `float CBaseAnimating:GetModelScale( )`
#### Function Description
Get scale of entity's model.
---
### `string CBaseAnimating:GetSequence( )`
#### Function Description
Returns the name of the active sequence.
---
### `bool CBaseAnimating:IsSequenceFinished( )`
#### Function Description
Ask whether the main sequence is done playing.
---
### `void CBaseAnimating:ResetSequence(pSequenceName )`
#### Function Description
Sets the active sequence by name, resetting the current cycle.
#### Parameters
Type|Name|Description
--|--|--
string|pSequenceName|No Description Set
---
### `int CBaseAnimating:ScriptLookupAttachment(pAttachmentName )`
#### Function Description
Get the named attachment id.
#### Parameters
Type|Name|Description
--|--|--
string|pAttachmentName|No Description Set
---
### `float CBaseAnimating:SequenceDuration(pSequenceName )`
#### Function Description
Returns the duration in seconds of the given sequence name.
#### Parameters
Type|Name|Description
--|--|--
string|pSequenceName|No Description Set
---
### `void CBaseAnimating:SetGraphLookTarget(vValue )`
#### Function Description
Pass the desired look target in world space to the graph
#### Parameters
Type|Name|Description
--|--|--
Vector|vValue|No Description Set
---
### `void CBaseAnimating:SetGraphParameter(pszParam, svArg )`
#### Function Description
Set the specific param value, type is inferred from the type in script
#### Parameters
Type|Name|Description
--|--|--
string|pszParam|No Description Set
table|svArg|No Description Set
---
### `void CBaseAnimating:SetGraphParameterBool(szName, bValue )`
#### Function Description
Set the specific param on or off
#### Parameters
Type|Name|Description
--|--|--
string|szName|No Description Set
bool|bValue|No Description Set
---
### `void CBaseAnimating:SetGraphParameterEnum(szName, nValue )`
#### Function Description
Pass the enum (int) value to the specified param
#### Parameters
Type|Name|Description
--|--|--
string|szName|No Description Set
int|nValue|No Description Set
---
### `void CBaseAnimating:SetGraphParameterFloat(szName, flValue )`
#### Function Description
Pass the float value to the specified param
#### Parameters
Type|Name|Description
--|--|--
string|szName|No Description Set
float|flValue|No Description Set
---
### `void CBaseAnimating:SetGraphParameterInt(szName, nValue )`
#### Function Description
Pass the int value to the specified param
#### Parameters
Type|Name|Description
--|--|--
string|szName|No Description Set
int|nValue|No Description Set
---
### `void CBaseAnimating:SetGraphParameterVector(szName, vValue )`
#### Function Description
Pass the vector value to the specified param in the graph
#### Parameters
Type|Name|Description
--|--|--
string|szName|No Description Set
Vector|vValue|No Description Set
---
### `void CBaseAnimating:SetModelScale(flScale )`
#### Function Description
Set scale of entity's model.
#### Parameters
Type|Name|Description
--|--|--
float|flScale|No Description Set
---
### `float CBaseAnimating:SetPoseParameter(szName, fValue )`
#### Function Description
Set the specified pose parameter to the specified value.
#### Parameters
Type|Name|Description
--|--|--
string|szName|No Description Set
float|fValue|No Description Set
---
### `void CBaseAnimating:SetSequence(pSequenceName )`
#### Function Description
Sets the active sequence by name, keeping the current cycle.
#### Parameters
Type|Name|Description
--|--|--
string|pSequenceName|No Description Set
---
### `void CBaseAnimating:StopAnimation( )`
#### Function Description
Stop the current animation by setting playback rate to 0.0.
---
## **CBaseCombatCharacter**
---
### `table CBaseCombatCharacter:GetEquippedWeapons( )`
#### Function Description
GetEquippedWeapons() : Returns an array of all the equipped weapons
---
### `int CBaseCombatCharacter:GetFaction( )`
#### Function Description
Get the combat character faction.
---
### `int CBaseCombatCharacter:GetWeaponCount( )`
#### Function Description
GetWeaponCount() : Gets the number of weapons currently equipped
---
### `Vector CBaseCombatCharacter:ShootPosition(nHand, nMuzzle )`
#### Function Description
Returns the shoot position eyes (or hand in VR).
#### Parameters
Type|Name|Description
--|--|--
int|nHand|No Description Set
int|nMuzzle|No Description Set
---
## **CBaseEntity**
---
### `void CBaseEntity:AddEffects(nFlags )`
#### Function Description
AddEffects( int ): Adds the render effect flag.
#### Parameters
Type|Name|Description
--|--|--
int|nFlags|No Description Set
---
### `void CBaseEntity:ApplyAbsVelocityImpulse(vecImpulse )`
#### Function Description
Apply a Velocity Impulse
#### Parameters
Type|Name|Description
--|--|--
Vector|vecImpulse|No Description Set
---
### `void CBaseEntity:ApplyLocalAngularVelocityImpulse(angImpulse )`
#### Function Description
Apply an Ang Velocity Impulse
#### Parameters
Type|Name|Description
--|--|--
Vector|angImpulse|No Description Set
---
### `float CBaseEntity:Attribute_GetFloatValue(pName, flDefault )`
#### Function Description
Get float value for an entity attribute.
#### Parameters
Type|Name|Description
--|--|--
string|pName|No Description Set
float|flDefault|No Description Set
---
### `int CBaseEntity:Attribute_GetIntValue(pName, nDefault )`
#### Function Description
Get int value for an entity attribute.
#### Parameters
Type|Name|Description
--|--|--
string|pName|No Description Set
int|nDefault|No Description Set
---
### `void CBaseEntity:Attribute_SetFloatValue(pName, flValue )`
#### Function Description
Set float value for an entity attribute.
#### Parameters
Type|Name|Description
--|--|--
string|pName|No Description Set
float|flValue|No Description Set
---
### `void CBaseEntity:Attribute_SetIntValue(pName, nValue )`
#### Function Description
Set int value for an entity attribute.
#### Parameters
Type|Name|Description
--|--|--
string|pName|No Description Set
int|nValue|No Description Set
---
### `void CBaseEntity:DeleteAttribute(pName )`
#### Function Description
Delete an entity attribute.
#### Parameters
Type|Name|Description
--|--|--
string|pName|No Description Set
---
### `void CBaseEntity:EmitSound(soundname )`
#### Function Description
Plays a sound from this entity.
#### Parameters
Type|Name|Description
--|--|--
string|soundname|No Description Set
---
### `void CBaseEntity:EmitSoundParams(soundname, nPitch, flVolume, flDelay )`
#### Function Description
Plays/modifies a sound from this entity. changes sound if nPitch and/or flVol or flSoundTime is > 0.
#### Parameters
Type|Name|Description
--|--|--
string|soundname|No Description Set
int|nPitch|No Description Set
float|flVolume|No Description Set
float|flDelay|No Description Set
---
### `QAngle CBaseEntity:EyeAngles( )`
#### Function Description
Get the qangles that this entity is looking at.
---
### `Vector CBaseEntity:EyePosition( )`
#### Function Description
Get vector to eye position - absolute coords.
---
### `handle CBaseEntity:FirstMoveChild( )`
#### Function Description

---
### `void CBaseEntity:FollowEntity(hEnt, bBoneMerge )`
#### Function Description
hEntity to follow, bool bBoneMerge
#### Parameters
Type|Name|Description
--|--|--
handle|hEnt|No Description Set
bool|bBoneMerge|No Description Set
---
### `void CBaseEntity:GatherCriteria(hResult )`
#### Function Description
Returns a table containing the criteria that would be used for response queries on this entity. This is the same as the table that is passed to response rule script function callbacks.
#### Parameters
Type|Name|Description
--|--|--
handle|hResult|No Description Set
---
### `Vector CBaseEntity:GetAbsOrigin( )`
#### Function Description

---
### `float CBaseEntity:GetAbsScale( )`
#### Function Description

---
### `QAngle CBaseEntity:GetAngles( )`
#### Function Description

---
### `Vector CBaseEntity:GetAnglesAsVector( )`
#### Function Description
Get entity pitch, yaw, roll as a vector.
---
### `Vector CBaseEntity:GetAngularVelocity( )`
#### Function Description
Get the local angular velocity - returns a vector of pitch,yaw,roll
---
### `Vector CBaseEntity:GetBaseVelocity( )`
#### Function Description
Get Base? velocity.
---
### `Vector CBaseEntity:GetBoundingMaxs( )`
#### Function Description
Get a vector containing max bounds, centered on object.
---
### `Vector CBaseEntity:GetBoundingMins( )`
#### Function Description
Get a vector containing min bounds, centered on object.
---
### `table CBaseEntity:GetBounds( )`
#### Function Description
Get a table containing the 'Mins' & 'Maxs' vector bounds, centered on object.
---
### `Vector CBaseEntity:GetCenter( )`
#### Function Description
Get vector to center of object - absolute coords
---
### `handle CBaseEntity:GetChildren( )`
#### Function Description
Get the entities parented to this entity.
---
### `table CBaseEntity:GetContext(name )`
#### Function Description
GetContext( name ): looks up a context and returns it if available. May return string, float, or null (if the context isn't found).
#### Parameters
Type|Name|Description
--|--|--
string|name|No Description Set
---
### `Vector CBaseEntity:GetForwardVector( )`
#### Function Description
Get the forward vector of the entity.
---
### `int CBaseEntity:GetHealth( )`
#### Function Description
Get the health of this entity.
---
### `QAngle CBaseEntity:GetLocalAngles( )`
#### Function Description
Get entity local pitch, yaw, roll as a QAngle
---
### `QAngle CBaseEntity:GetLocalAngularVelocity( )`
#### Function Description
Maybe local angvel
---
### `Vector CBaseEntity:GetLocalOrigin( )`
#### Function Description
Get entity local origin as a Vector
---
### `float CBaseEntity:GetLocalScale( )`
#### Function Description

---
### `Vector CBaseEntity:GetLocalVelocity( )`
#### Function Description
Get Entity relative velocity.
---
### `float CBaseEntity:GetMass( )`
#### Function Description
Get the mass of an entity. (returns 0 if it doesn't have a physics object)
---
### `int CBaseEntity:GetMaxHealth( )`
#### Function Description
Get the maximum health of this entity.
---
### `string CBaseEntity:GetModelName( )`
#### Function Description
Returns the name of the model.
---
### `handle CBaseEntity:GetMoveParent( )`
#### Function Description
If in hierarchy, retrieves the entity's parent.
---
### `Vector CBaseEntity:GetOrigin( )`
#### Function Description

---
### `handle CBaseEntity:GetOwner( )`
#### Function Description
Gets this entity's owner
---
### `handle CBaseEntity:GetOwnerEntity( )`
#### Function Description
Get the owner entity, if there is one
---
### `Vector CBaseEntity:GetRightVector( )`
#### Function Description
Get the right vector of the entity.
---
### `handle CBaseEntity:GetRootMoveParent( )`
#### Function Description
If in hierarchy, walks up the hierarchy to find the root parent.
---
### `float CBaseEntity:GetSoundDuration(soundname, actormodel )`
#### Function Description
Returns float duration of the sound. Takes soundname and optional actormodelname.
#### Parameters
Type|Name|Description
--|--|--
string|soundname|No Description Set
string|actormodel|No Description Set
---
### `int CBaseEntity:GetTeam( )`
#### Function Description
Get the team number of this entity.
---
### `int CBaseEntity:GetTeamNumber( )`
#### Function Description
Get the team number of this entity.
---
### `Vector CBaseEntity:GetUpVector( )`
#### Function Description
Get the up vector of the entity.
---
### `Vector CBaseEntity:GetVelocity( )`
#### Function Description

---
### `bool CBaseEntity:HasAttribute(pName )`
#### Function Description
See if an entity has a particular attribute.
#### Parameters
Type|Name|Description
--|--|--
string|pName|No Description Set
---
### `bool CBaseEntity:IsAlive( )`
#### Function Description
Is this entity alive?
---
### `bool CBaseEntity:IsNPC( )`
#### Function Description
Is this entity an CAI_BaseNPC?
---
### `bool CBaseEntity:IsPlayer( )`
#### Function Description
Is this entity a player?
---
### `void CBaseEntity:Kill( )`
#### Function Description

---
### `handle CBaseEntity:NextMovePeer( )`
#### Function Description

---
### `void CBaseEntity:OverrideFriction(duration, friction )`
#### Function Description
Takes duration, value for a temporary override.
#### Parameters
Type|Name|Description
--|--|--
float|duration|No Description Set
float|friction|No Description Set
---
### `void CBaseEntity:PrecacheScriptSound(soundname )`
#### Function Description
Precache a sound for later playing.
#### Parameters
Type|Name|Description
--|--|--
string|soundname|No Description Set
---
### `void CBaseEntity:RemoveEffects(nFlags )`
#### Function Description
RemoveEffects( int ): Removes the render effect flag.
#### Parameters
Type|Name|Description
--|--|--
int|nFlags|No Description Set
---
### `void CBaseEntity:SetAbsAngles(fPitch, fYaw, fRoll )`
#### Function Description
Set entity pitch, yaw, roll by component.
#### Parameters
Type|Name|Description
--|--|--
float|fPitch|No Description Set
float|fYaw|No Description Set
float|fRoll|No Description Set
---
### `void CBaseEntity:SetAbsOrigin(origin )`
#### Function Description

#### Parameters
Type|Name|Description
--|--|--
Vector|origin|No Description Set
---
### `void CBaseEntity:SetAbsScale(flScale )`
#### Function Description

#### Parameters
Type|Name|Description
--|--|--
float|flScale|No Description Set
---
### `void CBaseEntity:SetAngles(fPitch, fYaw, fRoll )`
#### Function Description
Set entity pitch, yaw, roll by component.
#### Parameters
Type|Name|Description
--|--|--
float|fPitch|No Description Set
float|fYaw|No Description Set
float|fRoll|No Description Set
---
### `void CBaseEntity:SetAngularVelocity(pitchVel, yawVel, rollVel )`
#### Function Description
Set the local angular velocity - takes float pitch,yaw,roll velocities
#### Parameters
Type|Name|Description
--|--|--
float|pitchVel|No Description Set
float|yawVel|No Description Set
float|rollVel|No Description Set
---
### `void CBaseEntity:SetConstraint(vPos )`
#### Function Description
Set the position of the constraint.
#### Parameters
Type|Name|Description
--|--|--
Vector|vPos|No Description Set
---
### `void CBaseEntity:SetContext(pName, pValue, duration )`
#### Function Description
SetContext( name , value, duration ): store any key/value pair in this entity's dialog contexts. Value must be a string. Will last for duration (set 0 to mean 'forever').
#### Parameters
Type|Name|Description
--|--|--
string|pName|No Description Set
string|pValue|No Description Set
float|duration|No Description Set
---
### `void CBaseEntity:SetContextNum(pName, fValue, duration )`
#### Function Description
SetContextNum( name , value, duration ): store any key/value pair in this entity's dialog contexts. Value must be a number (int or float). Will last for duration (set 0 to mean 'forever').
#### Parameters
Type|Name|Description
--|--|--
string|pName|No Description Set
float|fValue|No Description Set
float|duration|No Description Set
---
### `void CBaseEntity:SetContextThink(pszContextName, hThinkFunc, flInterval )`
#### Function Description
Set a think function on this entity.
#### Parameters
Type|Name|Description
--|--|--
string|pszContextName|No Description Set
handle|hThinkFunc|No Description Set
float|flInterval|No Description Set
---
### `void CBaseEntity:SetEntityName(pName )`
#### Function Description
Set the name of an entity.
#### Parameters
Type|Name|Description
--|--|--
string|pName|No Description Set
---
### `void CBaseEntity:SetForwardVector(v )`
#### Function Description
Set the orientation of the entity to have this forward vector.
#### Parameters
Type|Name|Description
--|--|--
Vector|v|No Description Set
---
### `void CBaseEntity:SetFriction(flFriction )`
#### Function Description
Set PLAYER friction, ignored for objects.
#### Parameters
Type|Name|Description
--|--|--
float|flFriction|No Description Set
---
### `void CBaseEntity:SetGravity(flGravity )`
#### Function Description
Set PLAYER gravity, ignored for objects.
#### Parameters
Type|Name|Description
--|--|--
float|flGravity|No Description Set
---
### `void CBaseEntity:SetHealth(nHealth )`
#### Function Description
Set the health of this entity.
#### Parameters
Type|Name|Description
--|--|--
int|nHealth|No Description Set
---
### `void CBaseEntity:SetLocalAngles(fPitch, fYaw, fRoll )`
#### Function Description
Set entity local pitch, yaw, roll by component
#### Parameters
Type|Name|Description
--|--|--
float|fPitch|No Description Set
float|fYaw|No Description Set
float|fRoll|No Description Set
---
### `void CBaseEntity:SetLocalOrigin(origin )`
#### Function Description
Set entity local origin from a Vector
#### Parameters
Type|Name|Description
--|--|--
Vector|origin|No Description Set
---
### `void CBaseEntity:SetLocalScale(flScale )`
#### Function Description

#### Parameters
Type|Name|Description
--|--|--
float|flScale|No Description Set
---
### `void CBaseEntity:SetMass(flMass )`
#### Function Description
Set the mass of an entity. (does nothing if it doesn't have a physics object)
#### Parameters
Type|Name|Description
--|--|--
float|flMass|No Description Set
---
### `void CBaseEntity:SetMaxHealth(amt )`
#### Function Description
Set the maximum health of this entity.
#### Parameters
Type|Name|Description
--|--|--
int|amt|No Description Set
---
### `void CBaseEntity:SetOrigin(v )`
#### Function Description

#### Parameters
Type|Name|Description
--|--|--
Vector|v|No Description Set
---
### `void CBaseEntity:SetOwner(pOwner )`
#### Function Description
Sets this entity's owner
#### Parameters
Type|Name|Description
--|--|--
handle|pOwner|No Description Set
---
### `void CBaseEntity:SetParent(hParent, pAttachmentname )`
#### Function Description
Set the parent for this entity.
#### Parameters
Type|Name|Description
--|--|--
handle|hParent|No Description Set
string|pAttachmentname|No Description Set
---
### `void CBaseEntity:SetTeam(iTeamNum )`
#### Function Description

#### Parameters
Type|Name|Description
--|--|--
int|iTeamNum|No Description Set
---
### `void CBaseEntity:SetVelocity(vecVelocity )`
#### Function Description

#### Parameters
Type|Name|Description
--|--|--
Vector|vecVelocity|No Description Set
---
### `void CBaseEntity:StopSound(soundname )`
#### Function Description
Stops a named sound playing from this entity.
#### Parameters
Type|Name|Description
--|--|--
string|soundname|No Description Set
---
### `int CBaseEntity:TakeDamage(hInfo )`
#### Function Description
Apply damage to this entity. Use CreateDamageInfo() to create a damageinfo object.
#### Parameters
Type|Name|Description
--|--|--
handle|hInfo|No Description Set
---
### `Vector CBaseEntity:TransformPointEntityToWorld(vPoint )`
#### Function Description
Returns the input Vector transformed from entity to world space
#### Parameters
Type|Name|Description
--|--|--
Vector|vPoint|No Description Set
---
### `Vector CBaseEntity:TransformPointWorldToEntity(vPoint )`
#### Function Description
Returns the input Vector transformed from world to entity space
#### Parameters
Type|Name|Description
--|--|--
Vector|vPoint|No Description Set
---
### `void CBaseEntity:Trigger( )`
#### Function Description
Fires off this entity's OnTrigger responses.
---
### `void CBaseEntity:ValidatePrivateScriptScope( )`
#### Function Description
Validates the private script scope and creates it if one doesn't exist.
---
## **CBaseFlex**
---
### `handle CBaseFlex:GetCurrentScene( )`
#### Function Description
Returns the instance of the oldest active scene entity (if any).
---
### `handle CBaseFlex:GetSceneByIndex(index )`
#### Function Description
Returns the instance of the scene entity at the specified index.
#### Parameters
Type|Name|Description
--|--|--
int|index|No Description Set
---
### `float CBaseFlex:ScriptPlayScene(pszScene, flDelay )`
#### Function Description
( vcd file, delay ) - play specified vcd file
#### Parameters
Type|Name|Description
--|--|--
string|pszScene|No Description Set
float|flDelay|No Description Set
---
## **CBaseModelEntity**
---
### `unsigned CBaseModelEntity:GetMaterialGroupHash( )`
#### Function Description
GetMaterialGroupHash(): Get the material group hash of this entity.
---
### `uint64 CBaseModelEntity:GetMaterialGroupMask( )`
#### Function Description
GetMaterialGroupMask(): Get the mesh group mask of this entity.
---
### `int CBaseModelEntity:GetRenderAlpha( )`
#### Function Description
GetRenderAlpha(): Get the alpha modulation of this entity.
---
### `Vector CBaseModelEntity:GetRenderColor( )`
#### Function Description
GetRenderColor(): Get the render color of the entity.
---
### `void CBaseModelEntity:SetBodygroup(iGroup, iValue )`
#### Function Description
Sets a bodygroup.
#### Parameters
Type|Name|Description
--|--|--
int|iGroup|No Description Set
int|iValue|No Description Set
---
### `void CBaseModelEntity:SetBodygroupByName(pName, iValue )`
#### Function Description
Sets a bodygroup by name.
#### Parameters
Type|Name|Description
--|--|--
string|pName|No Description Set
int|iValue|No Description Set
---
### `void CBaseModelEntity:SetLightGroup(pLightGroup )`
#### Function Description
SetLightGroup( string ): Sets the light group of the entity.
#### Parameters
Type|Name|Description
--|--|--
string|pLightGroup|No Description Set
---
### `void CBaseModelEntity:SetMaterialGroup(pMaterialGroup )`
#### Function Description
SetMaterialGroup( string ): Set the material group of this entity.
#### Parameters
Type|Name|Description
--|--|--
string|pMaterialGroup|No Description Set
---
### `void CBaseModelEntity:SetMaterialGroupHash(nHash )`
#### Function Description
SetMaterialGroupHash( uint32 ): Set the material group hash of this entity.
#### Parameters
Type|Name|Description
--|--|--
unsigned|nHash|No Description Set
---
### `void CBaseModelEntity:SetMaterialGroupMask(nMeshGroupMask )`
#### Function Description
SetMaterialGroupMask( uint64 ): Set the mesh group mask of this entity.
#### Parameters
Type|Name|Description
--|--|--
uint64|nMeshGroupMask|No Description Set
---
### `void CBaseModelEntity:SetModel(pModelName )`
#### Function Description

#### Parameters
Type|Name|Description
--|--|--
string|pModelName|No Description Set
---
### `void CBaseModelEntity:SetRenderAlpha(nAlpha )`
#### Function Description
SetRenderAlpha( int ): Set the alpha modulation of this entity.
#### Parameters
Type|Name|Description
--|--|--
int|nAlpha|No Description Set
---
### `void CBaseModelEntity:SetRenderColor(r, g, b )`
#### Function Description
SetRenderColor( r, g, b ): Sets the render color of the entity.
#### Parameters
Type|Name|Description
--|--|--
int|r|No Description Set
int|g|No Description Set
int|b|No Description Set
---
### `void CBaseModelEntity:SetRenderMode(nMode )`
#### Function Description
SetRenderMode( int ): Sets the render mode of the entity.
#### Parameters
Type|Name|Description
--|--|--
int|nMode|No Description Set
---
### `void CBaseModelEntity:SetSingleMeshGroup(pMeshGroupName )`
#### Function Description
SetSingleMeshGroup( string ): Set a single mesh group for this entity.
#### Parameters
Type|Name|Description
--|--|--
string|pMeshGroupName|No Description Set
---
### `void CBaseModelEntity:SetSize(mins, maxs )`
#### Function Description

#### Parameters
Type|Name|Description
--|--|--
Vector|mins|No Description Set
Vector|maxs|No Description Set
---
### `void CBaseModelEntity:SetSkin(iSkin )`
#### Function Description
Set skin (int).
#### Parameters
Type|Name|Description
--|--|--
int|iSkin|No Description Set
---
## **CBasePlayer**
---
### `bool CBasePlayer:AreChaperoneBoundsVisible( )`
#### Function Description
Returns whether this player's chaperone bounds are visible.
---
### `handle CBasePlayer:GetHMDAnchor( )`
#### Function Description
Returns the HMD anchor entity for this player if it exists.
---
### `handle CBasePlayer:GetHMDAvatar( )`
#### Function Description
Returns the HMD Avatar entity for this player if it exists.
---
### `Vector CBasePlayer:GetPlayArea(nPoint )`
#### Function Description
Returns the Vector position of the point you ask for. Pass 0-3 to get the four points.
#### Parameters
Type|Name|Description
--|--|--
int|nPoint|No Description Set
---
### `int CBasePlayer:GetUserID( )`
#### Function Description
Returns the player's user id.
---
### `<unknown> CBasePlayer:GetVRControllerType( )`
#### Function Description
Returns the type of controller being used while in VR.
---
### `bool CBasePlayer:IsNoclipping( )`
#### Function Description
Returns true if the player is in noclip mode.
---
### `bool CBasePlayer:IsUsePressed( )`
#### Function Description
Returns true if the use key is pressed.
---
### `bool CBasePlayer:IsVRControllerButtonPressed(nButton )`
#### Function Description
Returns true if the controller button is pressed.
#### Parameters
Type|Name|Description
--|--|--
int|nButton|No Description Set
---
### `bool CBasePlayer:IsVRDashboardShowing( )`
#### Function Description
Returns true if the SteamVR dashboard is showing for this player.
---
## **CBaseTrigger**
---
### `void CBaseTrigger:Disable( )`
#### Function Description
Disable's the trigger
---
### `void CBaseTrigger:Enable( )`
#### Function Description
Enable the trigger
---
### `bool CBaseTrigger:IsTouching(hEnt )`
#### Function Description
Checks whether the passed entity is touching the trigger.
#### Parameters
Type|Name|Description
--|--|--
handle|hEnt|No Description Set
---
## **CBodyComponent**
---
### `void CBodyComponent:AddImpulseAtPosition(Vector_1, Vector_2 )`
#### Function Description
Apply an impulse at a worldspace position to the physics
#### Parameters
Type|Name|Description
--|--|--
Vector|Vector_1|No Description Set
Vector|Vector_2|No Description Set
---
### `void CBodyComponent:AddVelocity(Vector_1, Vector_2 )`
#### Function Description
Add linear and angular velocity to the physics object
#### Parameters
Type|Name|Description
--|--|--
Vector|Vector_1|No Description Set
Vector|Vector_2|No Description Set
---
### `void CBodyComponent:DetachFromParent( )`
#### Function Description
Detach from its parent
---
### `bool CBodyComponent:IsAttachedToParent( )`
#### Function Description
Is attached to parent
---
### `float CBodyComponent:SequenceDuration(string_1 )`
#### Function Description
Returns the duration in seconds of the specified sequence
#### Parameters
Type|Name|Description
--|--|--
string|string_1|No Description Set
---
### `void CBodyComponent:SetAngularVelocity(Vector_1 )`
#### Function Description

#### Parameters
Type|Name|Description
--|--|--
Vector|Vector_1|No Description Set
---
### `void CBodyComponent:SetAnimation(string_1 )`
#### Function Description
Pass string for the animation to play on this model
#### Parameters
Type|Name|Description
--|--|--
string|string_1|No Description Set
---
### `void CBodyComponent:SetMaterialGroup(utlstringtoken_1 )`
#### Function Description

#### Parameters
Type|Name|Description
--|--|--
utlstringtoken|utlstringtoken_1|No Description Set
---
### `void CBodyComponent:SetVelocity(Vector_1 )`
#### Function Description

#### Parameters
Type|Name|Description
--|--|--
Vector|Vector_1|No Description Set
---
## **CCustomGameEventManager**
---
### `int CCustomGameEventManager:RegisterListener(string_1, handle_2 )`
#### Function Description
( string EventName, func CallbackFunction ) - Register a callback to be called when a particular custom event arrives. Returns a listener ID that can be used to unregister later.
#### Parameters
Type|Name|Description
--|--|--
string|string_1|No Description Set
handle|handle_2|No Description Set
---
### `void CCustomGameEventManager:Send_ServerToAllClients(string_1, handle_2 )`
#### Function Description
( string EventName, table EventData )
#### Parameters
Type|Name|Description
--|--|--
string|string_1|No Description Set
handle|handle_2|No Description Set
---
### `void CCustomGameEventManager:Send_ServerToPlayer(handle_1, string_2, handle_3 )`
#### Function Description
( Entity Player, string EventName, table EventData )
#### Parameters
Type|Name|Description
--|--|--
handle|handle_1|No Description Set
string|string_2|No Description Set
handle|handle_3|No Description Set
---
### `void CCustomGameEventManager:Send_ServerToTeam(int_1, string_2, handle_3 )`
#### Function Description
( int TeamNumber, string EventName, table EventData )
#### Parameters
Type|Name|Description
--|--|--
int|int_1|No Description Set
string|string_2|No Description Set
handle|handle_3|No Description Set
---
### `void CCustomGameEventManager:UnregisterListener(int_1 )`
#### Function Description
( int ListnerID ) - Unregister a specific listener
#### Parameters
Type|Name|Description
--|--|--
int|int_1|No Description Set
---
## **CCustomNetTableManager**
---
### `table CCustomNetTableManager:GetTableValue(string_1, string_2 )`
#### Function Description
( string TableName, string KeyName )
#### Parameters
Type|Name|Description
--|--|--
string|string_1|No Description Set
string|string_2|No Description Set
---
### `bool CCustomNetTableManager:SetTableValue(string_1, string_2, handle_3 )`
#### Function Description
( string TableName, string KeyName, script_table Value )
#### Parameters
Type|Name|Description
--|--|--
string|string_1|No Description Set
string|string_2|No Description Set
handle|handle_3|No Description Set
---
## **CDOTABaseAbility**
---
### `<unknown> CDOTABaseAbility:CanAbilityBeUpgraded( )`
#### Function Description

---
### `bool CDOTABaseAbility:CastAbility( )`
#### Function Description

---
### `bool CDOTABaseAbility:ContinueCasting( )`
#### Function Description

---
### `void CDOTABaseAbility:CreateVisibilityNode(vLocation, fRadius, fDuration )`
#### Function Description

#### Parameters
Type|Name|Description
--|--|--
Vector|vLocation|No Description Set
float|fRadius|No Description Set
float|fDuration|No Description Set
---
### `void CDOTABaseAbility:DecrementModifierRefCount( )`
#### Function Description

---
### `void CDOTABaseAbility:EndChannel(bInterrupted )`
#### Function Description

#### Parameters
Type|Name|Description
--|--|--
bool|bInterrupted|No Description Set
---
### `void CDOTABaseAbility:EndCooldown( )`
#### Function Description
Clear the cooldown remaining on this ability.
---
### `int CDOTABaseAbility:GetAOERadius( )`
#### Function Description

---
### `int CDOTABaseAbility:GetAbilityDamage( )`
#### Function Description

---
### `int CDOTABaseAbility:GetAbilityDamageType( )`
#### Function Description

---
### `int CDOTABaseAbility:GetAbilityIndex( )`
#### Function Description

---
### `table CDOTABaseAbility:GetAbilityKeyValues( )`
#### Function Description
Gets the key values definition for this ability.
---
### `string CDOTABaseAbility:GetAbilityName( )`
#### Function Description
Returns the name of this ability.
---
### `int CDOTABaseAbility:GetAbilityTargetFlags( )`
#### Function Description

---
### `int CDOTABaseAbility:GetAbilityTargetTeam( )`
#### Function Description

---
### `int CDOTABaseAbility:GetAbilityTargetType( )`
#### Function Description

---
### `int CDOTABaseAbility:GetAbilityType( )`
#### Function Description

---
### `bool CDOTABaseAbility:GetAnimationIgnoresModelScale( )`
#### Function Description

---
### `string CDOTABaseAbility:GetAssociatedPrimaryAbilities( )`
#### Function Description

---
### `string CDOTABaseAbility:GetAssociatedSecondaryAbilities( )`
#### Function Description

---
### `bool CDOTABaseAbility:GetAutoCastState( )`
#### Function Description

---
### `float CDOTABaseAbility:GetBackswingTime( )`
#### Function Description

---
### `int CDOTABaseAbility:GetBehavior( )`
#### Function Description

---
### `float CDOTABaseAbility:GetCastPoint( )`
#### Function Description

---
### `int CDOTABaseAbility:GetCastRange(vLocation, hTarget )`
#### Function Description
Gets the cast range of the ability.
#### Parameters
Type|Name|Description
--|--|--
Vector|vLocation|No Description Set
handle|hTarget|No Description Set
---
### `handle CDOTABaseAbility:GetCaster( )`
#### Function Description

---
### `float CDOTABaseAbility:GetChannelStartTime( )`
#### Function Description

---
### `float CDOTABaseAbility:GetChannelTime( )`
#### Function Description

---
### `int CDOTABaseAbility:GetChannelledManaCostPerSecond(iLevel )`
#### Function Description

#### Parameters
Type|Name|Description
--|--|--
int|iLevel|No Description Set
---
### `handle CDOTABaseAbility:GetCloneSource( )`
#### Function Description

---
### `int CDOTABaseAbility:GetConceptRecipientType( )`
#### Function Description

---
### `float CDOTABaseAbility:GetCooldown(iLevel )`
#### Function Description
Get the cooldown duration for this ability at a given level, not the amount of cooldown actually left.
#### Parameters
Type|Name|Description
--|--|--
int|iLevel|No Description Set
---
### `float CDOTABaseAbility:GetCooldownTime( )`
#### Function Description

---
### `float CDOTABaseAbility:GetCooldownTimeRemaining( )`
#### Function Description

---
### `Vector CDOTABaseAbility:GetCursorPosition( )`
#### Function Description

---
### `handle CDOTABaseAbility:GetCursorTarget( )`
#### Function Description

---
### `bool CDOTABaseAbility:GetCursorTargetingNothing( )`
#### Function Description

---
### `float CDOTABaseAbility:GetDuration( )`
#### Function Description

---
### `float CDOTABaseAbility:GetEffectiveCooldown(iLevel )`
#### Function Description

#### Parameters
Type|Name|Description
--|--|--
int|iLevel|No Description Set
---
### `int CDOTABaseAbility:GetGoldCost(iLevel )`
#### Function Description

#### Parameters
Type|Name|Description
--|--|--
int|iLevel|No Description Set
---
### `int CDOTABaseAbility:GetGoldCostForUpgrade(iLevel )`
#### Function Description

#### Parameters
Type|Name|Description
--|--|--
int|iLevel|No Description Set
---
### `int CDOTABaseAbility:GetHeroLevelRequiredToUpgrade( )`
#### Function Description

---
### `string CDOTABaseAbility:GetIntrinsicModifierName( )`
#### Function Description

---
### `int CDOTABaseAbility:GetLevel( )`
#### Function Description
Get the current level of the ability.
---
### `table CDOTABaseAbility:GetLevelSpecialValueFor(szName, nLevel )`
#### Function Description

#### Parameters
Type|Name|Description
--|--|--
string|szName|No Description Set
int|nLevel|No Description Set
---
### `int CDOTABaseAbility:GetManaCost(iLevel )`
#### Function Description

#### Parameters
Type|Name|Description
--|--|--
int|iLevel|No Description Set
---
### `int CDOTABaseAbility:GetMaxLevel( )`
#### Function Description

---
### `float CDOTABaseAbility:GetModifierValue( )`
#### Function Description

---
### `float CDOTABaseAbility:GetModifierValueBonus( )`
#### Function Description

---
### `float CDOTABaseAbility:GetPlaybackRateOverride( )`
#### Function Description

---
### `string CDOTABaseAbility:GetSharedCooldownName( )`
#### Function Description

---
### `table CDOTABaseAbility:GetSpecialValueFor(szName )`
#### Function Description
Gets a value from this ability's special value block for its current level.
#### Parameters
Type|Name|Description
--|--|--
string|szName|No Description Set
---
### `string CDOTABaseAbility:GetStolenActivityModifier( )`
#### Function Description

---
### `bool CDOTABaseAbility:GetToggleState( )`
#### Function Description

---
### `bool CDOTABaseAbility:GetUpgradeRecommended( )`
#### Function Description

---
### `bool CDOTABaseAbility:HeroXPChange(flXP )`
#### Function Description

#### Parameters
Type|Name|Description
--|--|--
float|flXP|No Description Set
---
### `void CDOTABaseAbility:IncrementModifierRefCount( )`
#### Function Description

---
### `bool CDOTABaseAbility:IsActivated( )`
#### Function Description

---
### `bool CDOTABaseAbility:IsAttributeBonus( )`
#### Function Description

---
### `bool CDOTABaseAbility:IsChanneling( )`
#### Function Description
Returns whether the ability is currently channeling.
---
### `bool CDOTABaseAbility:IsCooldownReady( )`
#### Function Description

---
### `bool CDOTABaseAbility:IsCosmetic(hEntity )`
#### Function Description

#### Parameters
Type|Name|Description
--|--|--
handle|hEntity|No Description Set
---
### `bool CDOTABaseAbility:IsFullyCastable( )`
#### Function Description
Returns whether the ability can be cast.
---
### `bool CDOTABaseAbility:IsHidden( )`
#### Function Description

---
### `bool CDOTABaseAbility:IsHiddenAsSecondaryAbility( )`
#### Function Description

---
### `bool CDOTABaseAbility:IsHiddenWhenStolen( )`
#### Function Description

---
### `bool CDOTABaseAbility:IsInAbilityPhase( )`
#### Function Description
Returns whether the ability is currently casting.
---
### `bool CDOTABaseAbility:IsItem( )`
#### Function Description

---
### `bool CDOTABaseAbility:IsOwnersGoldEnough(nIssuerPlayerID )`
#### Function Description

#### Parameters
Type|Name|Description
--|--|--
int|nIssuerPlayerID|No Description Set
---
### `bool CDOTABaseAbility:IsOwnersGoldEnoughForUpgrade( )`
#### Function Description

---
### `bool CDOTABaseAbility:IsOwnersManaEnough( )`
#### Function Description

---
### `bool CDOTABaseAbility:IsPassive( )`
#### Function Description

---
### `bool CDOTABaseAbility:IsRefreshable( )`
#### Function Description

---
### `bool CDOTABaseAbility:IsSharedWithTeammates( )`
#### Function Description

---
### `bool CDOTABaseAbility:IsStealable( )`
#### Function Description

---
### `bool CDOTABaseAbility:IsStolen( )`
#### Function Description

---
### `bool CDOTABaseAbility:IsToggle( )`
#### Function Description

---
### `bool CDOTABaseAbility:IsTrained( )`
#### Function Description

---
### `void CDOTABaseAbility:MarkAbilityButtonDirty( )`
#### Function Description
Mark the ability button for this ability as needing a refresh.
---
### `int CDOTABaseAbility:NumModifiersUsingAbility( )`
#### Function Description

---
### `void CDOTABaseAbility:OnAbilityPhaseInterrupted( )`
#### Function Description

---
### `bool CDOTABaseAbility:OnAbilityPhaseStart( )`
#### Function Description

---
### `void CDOTABaseAbility:OnAbilityPinged(nPlayerID, bCtrlHeld )`
#### Function Description

#### Parameters
Type|Name|Description
--|--|--
int|nPlayerID|No Description Set
bool|bCtrlHeld|No Description Set
---
### `void CDOTABaseAbility:OnChannelFinish(bInterrupted )`
#### Function Description

#### Parameters
Type|Name|Description
--|--|--
bool|bInterrupted|No Description Set
---
### `void CDOTABaseAbility:OnChannelThink(flInterval )`
#### Function Description

#### Parameters
Type|Name|Description
--|--|--
float|flInterval|No Description Set
---
### `void CDOTABaseAbility:OnHeroCalculateStatBonus( )`
#### Function Description

---
### `void CDOTABaseAbility:OnHeroLevelUp( )`
#### Function Description

---
### `void CDOTABaseAbility:OnOwnerDied( )`
#### Function Description

---
### `void CDOTABaseAbility:OnOwnerSpawned( )`
#### Function Description

---
### `void CDOTABaseAbility:OnSpellStart( )`
#### Function Description

---
### `void CDOTABaseAbility:OnToggle( )`
#### Function Description

---
### `void CDOTABaseAbility:OnUpgrade( )`
#### Function Description

---
### `void CDOTABaseAbility:PayGoldCost( )`
#### Function Description

---
### `void CDOTABaseAbility:PayGoldCostForUpgrade( )`
#### Function Description

---
### `void CDOTABaseAbility:PayManaCost( )`
#### Function Description

---
### `bool CDOTABaseAbility:PlaysDefaultAnimWhenStolen( )`
#### Function Description

---
### `bool CDOTABaseAbility:ProcsMagicStick( )`
#### Function Description

---
### `bool CDOTABaseAbility:RefCountsModifiers( )`
#### Function Description

---
### `void CDOTABaseAbility:RefreshCharges( )`
#### Function Description

---
### `void CDOTABaseAbility:RefundManaCost( )`
#### Function Description

---
### `bool CDOTABaseAbility:ResetToggleOnRespawn( )`
#### Function Description

---
### `void CDOTABaseAbility:SetAbilityIndex(iIndex )`
#### Function Description

#### Parameters
Type|Name|Description
--|--|--
int|iIndex|No Description Set
---
### `void CDOTABaseAbility:SetActivated(bActivated )`
#### Function Description

#### Parameters
Type|Name|Description
--|--|--
bool|bActivated|No Description Set
---
### `void CDOTABaseAbility:SetChanneling(bChanneling )`
#### Function Description

#### Parameters
Type|Name|Description
--|--|--
bool|bChanneling|No Description Set
---
### `void CDOTABaseAbility:SetFrozenCooldown(bFrozenCooldown )`
#### Function Description

#### Parameters
Type|Name|Description
--|--|--
bool|bFrozenCooldown|No Description Set
---
### `void CDOTABaseAbility:SetHidden(bHidden )`
#### Function Description

#### Parameters
Type|Name|Description
--|--|--
bool|bHidden|No Description Set
---
### `void CDOTABaseAbility:SetInAbilityPhase(bInAbilityPhase )`
#### Function Description

#### Parameters
Type|Name|Description
--|--|--
bool|bInAbilityPhase|No Description Set
---
### `void CDOTABaseAbility:SetLevel(iLevel )`
#### Function Description
Sets the level of this ability.
#### Parameters
Type|Name|Description
--|--|--
int|iLevel|No Description Set
---
### `void CDOTABaseAbility:SetOverrideCastPoint(flCastPoint )`
#### Function Description

#### Parameters
Type|Name|Description
--|--|--
float|flCastPoint|No Description Set
---
### `void CDOTABaseAbility:SetRefCountsModifiers(bRefCounts )`
#### Function Description

#### Parameters
Type|Name|Description
--|--|--
bool|bRefCounts|No Description Set
---
### `void CDOTABaseAbility:SetStealable(bStealable )`
#### Function Description

#### Parameters
Type|Name|Description
--|--|--
bool|bStealable|No Description Set
---
### `void CDOTABaseAbility:SetStolen(bStolen )`
#### Function Description

#### Parameters
Type|Name|Description
--|--|--
bool|bStolen|No Description Set
---
### `void CDOTABaseAbility:SetUpgradeRecommended(bUpgradeRecommended )`
#### Function Description

#### Parameters
Type|Name|Description
--|--|--
bool|bUpgradeRecommended|No Description Set
---
### `bool CDOTABaseAbility:ShouldUseResources( )`
#### Function Description

---
### `void CDOTABaseAbility:SpeakAbilityConcept(iConcept )`
#### Function Description

#### Parameters
Type|Name|Description
--|--|--
int|iConcept|No Description Set
---
### `<unknown> CDOTABaseAbility:SpeakTrigger( )`
#### Function Description

---
### `void CDOTABaseAbility:StartCooldown(flCooldown )`
#### Function Description

#### Parameters
Type|Name|Description
--|--|--
float|flCooldown|No Description Set
---
### `void CDOTABaseAbility:ToggleAbility( )`
#### Function Description

---
### `void CDOTABaseAbility:ToggleAutoCast( )`
#### Function Description

---
### `void CDOTABaseAbility:UpgradeAbility(bSupressSpeech )`
#### Function Description

#### Parameters
Type|Name|Description
--|--|--
bool|bSupressSpeech|No Description Set
---
### `void CDOTABaseAbility:UseResources(bMana, bGold, bCooldown )`
#### Function Description

#### Parameters
Type|Name|Description
--|--|--
bool|bMana|No Description Set
bool|bGold|No Description Set
bool|bCooldown|No Description Set
---
## **CDOTABaseGameMode**
---
### `int CDOTABaseGameMode:AddRealTimeCombatAnalyzerQuery(hQueryTable, hPlayer, pszQueryName )`
#### Function Description
Begin tracking a sequence of events using the real time combat analyzer.
#### Parameters
Type|Name|Description
--|--|--
handle|hQueryTable|No Description Set
handle|hPlayer|No Description Set
string|pszQueryName|No Description Set
---
### `bool CDOTABaseGameMode:AreWeatherEffectsDisabled( )`
#### Function Description
Get if weather effects are disabled on the client.
---
### `void CDOTABaseGameMode:ClearBountyRunePickupFilter( )`
#### Function Description
Clear the script filter that controls bounty rune pickup behavior.
---
### `void CDOTABaseGameMode:ClearDamageFilter( )`
#### Function Description
Clear the script filter that controls how a unit takes damage.
---
### `void CDOTABaseGameMode:ClearExecuteOrderFilter( )`
#### Function Description
Clear the script filter that controls when a unit picks up an item.
---
### `void CDOTABaseGameMode:ClearHealingFilter( )`
#### Function Description
Clear the script filter that controls how a unit heals.
---
### `void CDOTABaseGameMode:ClearItemAddedToInventoryFilter( )`
#### Function Description
Clear the script filter that controls the item added to inventory filter.
---
### `void CDOTABaseGameMode:ClearModifierGainedFilter( )`
#### Function Description
Clear the script filter that controls the modifier filter.
---
### `void CDOTABaseGameMode:ClearModifyExperienceFilter( )`
#### Function Description
Clear the script filter that controls how hero experience is modified.
---
### `void CDOTABaseGameMode:ClearModifyGoldFilter( )`
#### Function Description
Clear the script filter that controls how hero gold is modified.
---
### `void CDOTABaseGameMode:ClearRuneSpawnFilter( )`
#### Function Description
Clear the script filter that controls what rune spawns.
---
### `void CDOTABaseGameMode:ClearTrackingProjectileFilter( )`
#### Function Description
Clear the script filter that controls when tracking projectiles are launched.
---
### `void CDOTABaseGameMode:DisableHudFlip(bDisable )`
#### Function Description
Use to disable hud flip for this mod
#### Parameters
Type|Name|Description
--|--|--
bool|bDisable|No Description Set
---
### `bool CDOTABaseGameMode:GetAlwaysShowPlayerInventory( )`
#### Function Description
Show the player hero's inventory in the HUD, regardless of what unit is selected.
---
### `bool CDOTABaseGameMode:GetAlwaysShowPlayerNames( )`
#### Function Description
Get whether player names are always shown, regardless of client setting.
---
### `bool CDOTABaseGameMode:GetAnnouncerDisabled( )`
#### Function Description
Are in-game announcers disabled?
---
### `float CDOTABaseGameMode:GetCameraDistanceOverride( )`
#### Function Description
Set a different camera distance; dota default is 1134.
---
### `float CDOTABaseGameMode:GetCustomAttributeDerivedStatValue(nDerivedStatType, hHero )`
#### Function Description
Get current derived stat value constant.
#### Parameters
Type|Name|Description
--|--|--
int|nDerivedStatType|No Description Set
handle|hHero|No Description Set
---
### `float CDOTABaseGameMode:GetCustomBackpackCooldownPercent( )`
#### Function Description
Get the current rate cooldown ticks down for items in the backpack.
---
### `float CDOTABaseGameMode:GetCustomBackpackSwapCooldown( )`
#### Function Description
Get the current custom backpack swap cooldown.
---
### `bool CDOTABaseGameMode:GetCustomBuybackCooldownEnabled( )`
#### Function Description
Turns on capability to define custom buyback cooldowns.
---
### `bool CDOTABaseGameMode:GetCustomBuybackCostEnabled( )`
#### Function Description
Turns on capability to define custom buyback costs.
---
### `float CDOTABaseGameMode:GetCustomGlyphCooldown( )`
#### Function Description
Get the current custom glyph cooldown.
---
### `int CDOTABaseGameMode:GetCustomHeroMaxLevel( )`
#### Function Description
Allows definition of the max level heroes can achieve (default is 25).
---
### `float CDOTABaseGameMode:GetCustomScanCooldown( )`
#### Function Description
Get the current custom scan cooldown.
---
### `float CDOTABaseGameMode:GetFixedRespawnTime( )`
#### Function Description
Gets the fixed respawn time.
---
### `bool CDOTABaseGameMode:GetFogOfWarDisabled( )`
#### Function Description
Turn the fog of war on or off.
---
### `bool CDOTABaseGameMode:GetGoldSoundDisabled( )`
#### Function Description
Turn the sound when gold is acquired off/on.
---
### `bool CDOTABaseGameMode:GetHUDVisible(iElement )`
#### Function Description
Returns the HUD element visibility.
#### Parameters
Type|Name|Description
--|--|--
int|iElement|No Description Set
---
### `int CDOTABaseGameMode:GetMaximumAttackSpeed( )`
#### Function Description
Get the maximum attack speed for units.
---
### `int CDOTABaseGameMode:GetMinimumAttackSpeed( )`
#### Function Description
Get the minimum attack speed for units.
---
### `bool CDOTABaseGameMode:GetRecommendedItemsDisabled( )`
#### Function Description
Turn the panel for showing recommended items at the shop off/on.
---
### `float CDOTABaseGameMode:GetRespawnTimeScale( )`
#### Function Description
Returns the scale applied to non-fixed respawn times.
---
### `bool CDOTABaseGameMode:GetStashPurchasingDisabled( )`
#### Function Description
Turn purchasing items to the stash off/on. If purchasing to the stash is off the player must be at a shop to purchase items.
---
### `bool CDOTABaseGameMode:GetStickyItemDisabled( )`
#### Function Description
Hide the sticky item in the quickbuy.
---
### `bool CDOTABaseGameMode:GetTopBarTeamValuesOverride( )`
#### Function Description
Override the values of the team values on the top game bar.
---
### `bool CDOTABaseGameMode:GetTopBarTeamValuesVisible( )`
#### Function Description
Turning on/off the team values on the top game bar.
---
### `bool CDOTABaseGameMode:GetTowerBackdoorProtectionEnabled( )`
#### Function Description
Gets whether tower backdoor protection is enabled or not.
---
### `bool CDOTABaseGameMode:GetUseCustomHeroLevels( )`
#### Function Description
Are custom-defined XP values for hero level ups in use?
---
### `bool CDOTABaseGameMode:IsBuybackEnabled( )`
#### Function Description
Enables or disables buyback completely.
---
### `bool CDOTABaseGameMode:IsDaynightCycleDisabled( )`
#### Function Description
Is the day/night cycle disabled?
---
### `void CDOTABaseGameMode:ListenForQueryFailed(hFunction, hContext )`
#### Function Description
Set function and context for real time combat analyzer query failed.
#### Parameters
Type|Name|Description
--|--|--
handle|hFunction|No Description Set
handle|hContext|No Description Set
---
### `void CDOTABaseGameMode:ListenForQueryProgressChanged(hFunction, hContext )`
#### Function Description
Set function and context for real time combat analyzer query progress changed.
#### Parameters
Type|Name|Description
--|--|--
handle|hFunction|No Description Set
handle|hContext|No Description Set
---
### `void CDOTABaseGameMode:ListenForQuerySucceeded(hFunction, hContext )`
#### Function Description
Set function and context for real time combat analyzer query succeeded.
#### Parameters
Type|Name|Description
--|--|--
handle|hFunction|No Description Set
handle|hContext|No Description Set
---
### `void CDOTABaseGameMode:RemoveRealTimeCombatAnalyzerQuery(nQueryID )`
#### Function Description
Stop tracking a combat analyzer query.
#### Parameters
Type|Name|Description
--|--|--
int|nQueryID|No Description Set
---
### `void CDOTABaseGameMode:SetAbilityTuningValueFilter(hFunction, hContext )`
#### Function Description
Set a filter function to control the tuning values that abilities use. (Modify the table and Return true to use new values, return false to use the old values)
#### Parameters
Type|Name|Description
--|--|--
handle|hFunction|No Description Set
handle|hContext|No Description Set
---
### `void CDOTABaseGameMode:SetAlwaysShowPlayerInventory(bAlwaysShow )`
#### Function Description
Show the player hero's inventory in the HUD, regardless of what unit is selected.
#### Parameters
Type|Name|Description
--|--|--
bool|bAlwaysShow|No Description Set
---
### `void CDOTABaseGameMode:SetAlwaysShowPlayerNames(bEnabled )`
#### Function Description
Set whether player names are always shown, regardless of client setting.
#### Parameters
Type|Name|Description
--|--|--
bool|bEnabled|No Description Set
---
### `void CDOTABaseGameMode:SetAnnouncerDisabled(bDisabled )`
#### Function Description
Mutes the in-game announcer.
#### Parameters
Type|Name|Description
--|--|--
bool|bDisabled|No Description Set
---
### `void CDOTABaseGameMode:SetBotThinkingEnabled(bEnabled )`
#### Function Description
Enables/Disables bots in custom games. Note: this will only work with default heroes in the dota map.
#### Parameters
Type|Name|Description
--|--|--
bool|bEnabled|No Description Set
---
### `void CDOTABaseGameMode:SetBotsAlwaysPushWithHuman(bAlwaysPush )`
#### Function Description
Set if the bots should try their best to push with a human player.
#### Parameters
Type|Name|Description
--|--|--
bool|bAlwaysPush|No Description Set
---
### `void CDOTABaseGameMode:SetBotsInLateGame(bLateGame )`
#### Function Description
Set if bots should enable their late game behavior.
#### Parameters
Type|Name|Description
--|--|--
bool|bLateGame|No Description Set
---
### `void CDOTABaseGameMode:SetBotsMaxPushTier(nMaxTier )`
#### Function Description
Set the max tier of tower that bots want to push. (-1 to disable)
#### Parameters
Type|Name|Description
--|--|--
int|nMaxTier|No Description Set
---
### `void CDOTABaseGameMode:SetBountyRunePickupFilter(hFunction, hContext )`
#### Function Description
Set a filter function to control the behavior when a bounty rune is picked up. (Modify the table and Return true to use new values, return false to cancel the event)
#### Parameters
Type|Name|Description
--|--|--
handle|hFunction|No Description Set
handle|hContext|No Description Set
---
### `void CDOTABaseGameMode:SetBountyRuneSpawnInterval(flInterval )`
#### Function Description
Set bounty rune spawn rate
#### Parameters
Type|Name|Description
--|--|--
float|flInterval|No Description Set
---
### `void CDOTABaseGameMode:SetBuybackEnabled(bEnabled )`
#### Function Description
Enables or disables buyback completely.
#### Parameters
Type|Name|Description
--|--|--
bool|bEnabled|No Description Set
---
### `void CDOTABaseGameMode:SetCameraDistanceOverride(flCameraDistanceOverride )`
#### Function Description
Set a different camera distance; dota default is 1134.
#### Parameters
Type|Name|Description
--|--|--
float|flCameraDistanceOverride|No Description Set
---
### `void CDOTABaseGameMode:SetCameraSmoothCountOverride(nSmoothCount )`
#### Function Description
Set a different camera smooth count; dota default is 8.
#### Parameters
Type|Name|Description
--|--|--
int|nSmoothCount|No Description Set
---
### `void CDOTABaseGameMode:SetCustomAttributeDerivedStatValue(nStatType, flNewValue )`
#### Function Description
Modify derived stat value constants. ( AttributeDerivedStat eStatType, float flNewValue.
#### Parameters
Type|Name|Description
--|--|--
int|nStatType|No Description Set
float|flNewValue|No Description Set
---
### `void CDOTABaseGameMode:SetCustomBackpackCooldownPercent(flPercent )`
#### Function Description
Set the rate cooldown ticks down for items in the backpack.
#### Parameters
Type|Name|Description
--|--|--
float|flPercent|No Description Set
---
### `void CDOTABaseGameMode:SetCustomBackpackSwapCooldown(flCooldown )`
#### Function Description
Set a custom cooldown for swapping items into the backpack.
#### Parameters
Type|Name|Description
--|--|--
float|flCooldown|No Description Set
---
### `void CDOTABaseGameMode:SetCustomBuybackCooldownEnabled(bEnabled )`
#### Function Description
Turns on capability to define custom buyback cooldowns.
#### Parameters
Type|Name|Description
--|--|--
bool|bEnabled|No Description Set
---
### `void CDOTABaseGameMode:SetCustomBuybackCostEnabled(bEnabled )`
#### Function Description
Turns on capability to define custom buyback costs.
#### Parameters
Type|Name|Description
--|--|--
bool|bEnabled|No Description Set
---
### `void CDOTABaseGameMode:SetCustomGameForceHero(pHeroName )`
#### Function Description
Force all players to use the specified hero and disable the normal hero selection process. Must be used before hero selection.
#### Parameters
Type|Name|Description
--|--|--
string|pHeroName|No Description Set
---
### `void CDOTABaseGameMode:SetCustomGlyphCooldown(flCooldown )`
#### Function Description
Set a custom cooldown for team Glyph ability.
#### Parameters
Type|Name|Description
--|--|--
float|flCooldown|No Description Set
---
### `void CDOTABaseGameMode:SetCustomHeroMaxLevel(int_1 )`
#### Function Description
Allows definition of the max level heroes can achieve (default is 25).
#### Parameters
Type|Name|Description
--|--|--
int|int_1|No Description Set
---
### `void CDOTABaseGameMode:SetCustomScanCooldown(flCooldown )`
#### Function Description
Set a custom cooldown for team Scan ability.
#### Parameters
Type|Name|Description
--|--|--
float|flCooldown|No Description Set
---
### `void CDOTABaseGameMode:SetCustomTerrainWeatherEffect(pszEffectName )`
#### Function Description
Set the effect used as a custom weather effect, when units are on non-default terrain, in this mode.
#### Parameters
Type|Name|Description
--|--|--
string|pszEffectName|No Description Set
---
### `void CDOTABaseGameMode:SetCustomXPRequiredToReachNextLevel(hTable )`
#### Function Description
Allows definition of a table of hero XP values.
#### Parameters
Type|Name|Description
--|--|--
handle|hTable|No Description Set
---
### `void CDOTABaseGameMode:SetDamageFilter(hFunction, hContext )`
#### Function Description
Set a filter function to control the behavior when a unit takes damage. (Modify the table and Return true to use new values, return false to cancel the event)
#### Parameters
Type|Name|Description
--|--|--
handle|hFunction|No Description Set
handle|hContext|No Description Set
---
### `void CDOTABaseGameMode:SetDaynightCycleDisabled(bDisable )`
#### Function Description
Enable or disable the day/night cycle.
#### Parameters
Type|Name|Description
--|--|--
bool|bDisable|No Description Set
---
### `void CDOTABaseGameMode:SetDeathOverlayDisabled(bDisabled )`
#### Function Description
Specify whether the full screen death overlay effect plays when the selected hero dies.
#### Parameters
Type|Name|Description
--|--|--
bool|bDisabled|No Description Set
---
### `void CDOTABaseGameMode:SetDraftingBanningTimeOverride(flValue )`
#### Function Description
Set drafting hero banning time
#### Parameters
Type|Name|Description
--|--|--
float|flValue|No Description Set
---
### `void CDOTABaseGameMode:SetDraftingHeroPickSelectTimeOverride(flValue )`
#### Function Description
Set drafting hero pick time
#### Parameters
Type|Name|Description
--|--|--
float|flValue|No Description Set
---
### `void CDOTABaseGameMode:SetExecuteOrderFilter(hFunction, hContext )`
#### Function Description
Set a filter function to control the behavior when a unit picks up an item. (Modify the table and Return true to use new values, return false to cancel the event)
#### Parameters
Type|Name|Description
--|--|--
handle|hFunction|No Description Set
handle|hContext|No Description Set
---
### `void CDOTABaseGameMode:SetFixedRespawnTime(flFixedRespawnTime )`
#### Function Description
Set a fixed delay for all players to respawn after.
#### Parameters
Type|Name|Description
--|--|--
float|flFixedRespawnTime|No Description Set
---
### `void CDOTABaseGameMode:SetFogOfWarDisabled(bDisabled )`
#### Function Description
Turn the fog of war on or off.
#### Parameters
Type|Name|Description
--|--|--
bool|bDisabled|No Description Set
---
### `void CDOTABaseGameMode:SetFountainConstantManaRegen(flConstantManaRegen )`
#### Function Description
Set the constant rate that the fountain will regen mana. (-1 for default)
#### Parameters
Type|Name|Description
--|--|--
float|flConstantManaRegen|No Description Set
---
### `void CDOTABaseGameMode:SetFountainPercentageHealthRegen(flPercentageHealthRegen )`
#### Function Description
Set the percentage rate that the fountain will regen health. (-1 for default)
#### Parameters
Type|Name|Description
--|--|--
float|flPercentageHealthRegen|No Description Set
---
### `void CDOTABaseGameMode:SetFountainPercentageManaRegen(flPercentageManaRegen )`
#### Function Description
Set the percentage rate that the fountain will regen mana. (-1 for default)
#### Parameters
Type|Name|Description
--|--|--
float|flPercentageManaRegen|No Description Set
---
### `void CDOTABaseGameMode:SetFriendlyBuildingMoveToEnabled(bEnabled )`
#### Function Description
Allows clicks on friendly buildings to be handled normally.
#### Parameters
Type|Name|Description
--|--|--
bool|bEnabled|No Description Set
---
### `void CDOTABaseGameMode:SetGoldSoundDisabled(bDisabled )`
#### Function Description
Turn the sound when gold is acquired off/on.
#### Parameters
Type|Name|Description
--|--|--
bool|bDisabled|No Description Set
---
### `void CDOTABaseGameMode:SetHUDVisible(iHUDElement, bVisible )`
#### Function Description
Set the HUD element visibility.
#### Parameters
Type|Name|Description
--|--|--
int|iHUDElement|No Description Set
bool|bVisible|No Description Set
---
### `void CDOTABaseGameMode:SetHealingFilter(hFunction, hContext )`
#### Function Description
Set a filter function to control the behavior when a unit heals. (Modify the table and Return true to use new values, return false to cancel the event)
#### Parameters
Type|Name|Description
--|--|--
handle|hFunction|No Description Set
handle|hContext|No Description Set
---
### `void CDOTABaseGameMode:SetHudCombatEventsDisabled(bDisabled )`
#### Function Description
Specify whether the default combat events will show in the HUD.
#### Parameters
Type|Name|Description
--|--|--
bool|bDisabled|No Description Set
---
### `void CDOTABaseGameMode:SetItemAddedToInventoryFilter(hFunction, hContext )`
#### Function Description
Set a filter function to control what happens to items that are added to an inventory, return false to cancel the event
#### Parameters
Type|Name|Description
--|--|--
handle|hFunction|No Description Set
handle|hContext|No Description Set
---
### `void CDOTABaseGameMode:SetKillableTombstones(bEnabled )`
#### Function Description
Set whether tombstones can be channeled to be removed by enemy heroes.
#### Parameters
Type|Name|Description
--|--|--
bool|bEnabled|No Description Set
---
### `void CDOTABaseGameMode:SetKillingSpreeAnnouncerDisabled(bDisabled )`
#### Function Description
Mutes the in-game killing spree announcer.
#### Parameters
Type|Name|Description
--|--|--
bool|bDisabled|No Description Set
---
### `void CDOTABaseGameMode:SetLoseGoldOnDeath(bEnabled )`
#### Function Description
Use to disable gold loss on death.
#### Parameters
Type|Name|Description
--|--|--
bool|bEnabled|No Description Set
---
### `void CDOTABaseGameMode:SetMaximumAttackSpeed(nMaxSpeed )`
#### Function Description
Set the maximum attack speed for units.
#### Parameters
Type|Name|Description
--|--|--
int|nMaxSpeed|No Description Set
---
### `void CDOTABaseGameMode:SetMinimumAttackSpeed(nMinSpeed )`
#### Function Description
Set the minimum attack speed for units.
#### Parameters
Type|Name|Description
--|--|--
int|nMinSpeed|No Description Set
---
### `void CDOTABaseGameMode:SetModifierGainedFilter(hFunction, hContext )`
#### Function Description
Set a filter function to control modifiers that are gained, return false to destroy modifier.
#### Parameters
Type|Name|Description
--|--|--
handle|hFunction|No Description Set
handle|hContext|No Description Set
---
### `void CDOTABaseGameMode:SetModifyExperienceFilter(hFunction, hContext )`
#### Function Description
Set a filter function to control the behavior when a hero's experience is modified. (Modify the table and Return true to use new values, return false to cancel the event)
#### Parameters
Type|Name|Description
--|--|--
handle|hFunction|No Description Set
handle|hContext|No Description Set
---
### `void CDOTABaseGameMode:SetModifyGoldFilter(hFunction, hContext )`
#### Function Description
Set a filter function to control the behavior when a hero's gold is modified. (Modify the table and Return true to use new values, return false to cancel the event)
#### Parameters
Type|Name|Description
--|--|--
handle|hFunction|No Description Set
handle|hContext|No Description Set
---
### `void CDOTABaseGameMode:SetOverrideSelectionEntity(hOverrideEntity )`
#### Function Description
Set an override for the default selection entity, instead of each player's hero.
#### Parameters
Type|Name|Description
--|--|--
handle|hOverrideEntity|No Description Set
---
### `void CDOTABaseGameMode:SetPauseEnabled(bEnabled )`
#### Function Description
Set pausing enabled/disabled
#### Parameters
Type|Name|Description
--|--|--
bool|bEnabled|No Description Set
---
### `void CDOTABaseGameMode:SetPowerRuneSpawnInterval(flInterval )`
#### Function Description
Set power rune spawn rate
#### Parameters
Type|Name|Description
--|--|--
float|flInterval|No Description Set
---
### `void CDOTABaseGameMode:SetRecommendedItemsDisabled(bDisabled )`
#### Function Description
Turn the panel for showing recommended items at the shop off/on.
#### Parameters
Type|Name|Description
--|--|--
bool|bDisabled|No Description Set
---
### `void CDOTABaseGameMode:SetRemoveIllusionsOnDeath(bRemove )`
#### Function Description
Make it so illusions are immediately removed upon death, rather than sticking around for a few seconds.
#### Parameters
Type|Name|Description
--|--|--
bool|bRemove|No Description Set
---
### `void CDOTABaseGameMode:SetRespawnTimeScale(flValue )`
#### Function Description
Sets the scale applied to non-fixed respawn times. 1 = default DOTA respawn calculations.
#### Parameters
Type|Name|Description
--|--|--
float|flValue|No Description Set
---
### `void CDOTABaseGameMode:SetRuneEnabled(nRune, bEnabled )`
#### Function Description
Set if a given type of rune is enabled.
#### Parameters
Type|Name|Description
--|--|--
int|nRune|No Description Set
bool|bEnabled|No Description Set
---
### `void CDOTABaseGameMode:SetRuneSpawnFilter(hFunction, hContext )`
#### Function Description
Set a filter function to control what rune spawns. (Modify the table and Return true to use new values, return false to cancel the event)
#### Parameters
Type|Name|Description
--|--|--
handle|hFunction|No Description Set
handle|hContext|No Description Set
---
### `void CDOTABaseGameMode:SetSelectionGoldPenaltyEnabled(bEnabled )`
#### Function Description
Enable/disable gold penalty for late picking.
#### Parameters
Type|Name|Description
--|--|--
bool|bEnabled|No Description Set
---
### `void CDOTABaseGameMode:SetStashPurchasingDisabled(bDisabled )`
#### Function Description
Turn purchasing items to the stash off/on. If purchasing to the stash is off the player must be at a shop to purchase items.
#### Parameters
Type|Name|Description
--|--|--
bool|bDisabled|No Description Set
---
### `void CDOTABaseGameMode:SetStickyItemDisabled(bDisabled )`
#### Function Description
Hide the sticky item in the quickbuy.
#### Parameters
Type|Name|Description
--|--|--
bool|bDisabled|No Description Set
---
### `void CDOTABaseGameMode:SetTopBarTeamValue(iTeam, nValue )`
#### Function Description
Set the team values on the top game bar.
#### Parameters
Type|Name|Description
--|--|--
int|iTeam|No Description Set
int|nValue|No Description Set
---
### `void CDOTABaseGameMode:SetTopBarTeamValuesOverride(bOverride )`
#### Function Description
Override the values of the team values on the top game bar.
#### Parameters
Type|Name|Description
--|--|--
bool|bOverride|No Description Set
---
### `void CDOTABaseGameMode:SetTopBarTeamValuesVisible(bVisible )`
#### Function Description
Turning on/off the team values on the top game bar.
#### Parameters
Type|Name|Description
--|--|--
bool|bVisible|No Description Set
---
### `void CDOTABaseGameMode:SetTowerBackdoorProtectionEnabled(bEnabled )`
#### Function Description
Enables/Disables tower backdoor protection.
#### Parameters
Type|Name|Description
--|--|--
bool|bEnabled|No Description Set
---
### `void CDOTABaseGameMode:SetTrackingProjectileFilter(hFunction, hContext )`
#### Function Description
Set a filter function to control when tracking projectiles are launched. (Modify the table and Return true to use new values, return false to cancel the event)
#### Parameters
Type|Name|Description
--|--|--
handle|hFunction|No Description Set
handle|hContext|No Description Set
---
### `void CDOTABaseGameMode:SetUnseenFogOfWarEnabled(bEnabled )`
#### Function Description
Enable or disable unseen fog of war. When enabled parts of the map the player has never seen will be completely hidden by fog of war.
#### Parameters
Type|Name|Description
--|--|--
bool|bEnabled|No Description Set
---
### `void CDOTABaseGameMode:SetUseCustomHeroLevels(bEnabled )`
#### Function Description
Turn on custom-defined XP values for hero level ups.  The table should be defined before switching this on.
#### Parameters
Type|Name|Description
--|--|--
bool|bEnabled|No Description Set
---
### `void CDOTABaseGameMode:SetUseDefaultDOTARuneSpawnLogic(bEnabled )`
#### Function Description
If set to true, use current rune spawn rules.  Either setting respects custom spawn intervals.
#### Parameters
Type|Name|Description
--|--|--
bool|bEnabled|No Description Set
---
### `void CDOTABaseGameMode:SetWeatherEffectsDisabled(bDisable )`
#### Function Description
Set if weather effects are disabled.
#### Parameters
Type|Name|Description
--|--|--
bool|bDisable|No Description Set
---
## **CDOTAGameManager**
---
### `table CDOTAGameManager:GetHeroDataByName_Script(string_1 )`
#### Function Description
Get the hero unit 
#### Parameters
Type|Name|Description
--|--|--
string|string_1|No Description Set
---
### `int CDOTAGameManager:GetHeroIDByName(string_1 )`
#### Function Description
Get the hero ID given the hero name.
#### Parameters
Type|Name|Description
--|--|--
string|string_1|No Description Set
---
### `string CDOTAGameManager:GetHeroNameByID(int_1 )`
#### Function Description
Get the hero name given a hero ID.
#### Parameters
Type|Name|Description
--|--|--
int|int_1|No Description Set
---
### `string CDOTAGameManager:GetHeroNameForUnitName(string_1 )`
#### Function Description
Get the hero name given a unit name.
#### Parameters
Type|Name|Description
--|--|--
string|string_1|No Description Set
---
### `string CDOTAGameManager:GetHeroUnitNameByID(int_1 )`
#### Function Description
Get the hero unit name given the hero ID.
#### Parameters
Type|Name|Description
--|--|--
int|int_1|No Description Set
---
## **CDOTAGamerules**
---
### `handle CDOTAGamerules:AddBotPlayerWithEntityScript(string_1, string_2, int_3, string_4 )`
#### Function Description
Spawn a bot player of the passed hero name, player name, and team.
#### Parameters
Type|Name|Description
--|--|--
string|string_1|No Description Set
string|string_2|No Description Set
int|int_3|No Description Set
string|string_4|No Description Set
---
### `bool CDOTAGamerules:AddEventMetadataLeaderboardEntry(string_1, unsigned_2, unsigned_3, unsigned_4, unsigned_5, unsigned_6, unsigned_7, unsigned_8, unsigned_9 )`
#### Function Description
Event-only ( string szNameSuffix, int nStars, int nMaxStars, int nExtraData1, int nExtraData2 )
#### Parameters
Type|Name|Description
--|--|--
string|string_1|No Description Set
unsigned|unsigned_2|No Description Set
unsigned|unsigned_3|No Description Set
unsigned|unsigned_4|No Description Set
unsigned|unsigned_5|No Description Set
unsigned|unsigned_6|No Description Set
unsigned|unsigned_7|No Description Set
unsigned|unsigned_8|No Description Set
unsigned|unsigned_9|No Description Set
---
### `void CDOTAGamerules:AddItemToWhiteList(string_1 )`
#### Function Description
Add an item to the whitelist
#### Parameters
Type|Name|Description
--|--|--
string|string_1|No Description Set
---
### `void CDOTAGamerules:AddMinimapDebugPoint(int_1, Vector_2, int_3, int_4, int_5, int_6, float_7 )`
#### Function Description
Add a point on the minimap.
#### Parameters
Type|Name|Description
--|--|--
int|int_1|No Description Set
Vector|Vector_2|No Description Set
int|int_3|No Description Set
int|int_4|No Description Set
int|int_5|No Description Set
int|int_6|No Description Set
float|float_7|No Description Set
---
### `void CDOTAGamerules:AddMinimapDebugPointForTeam(int_1, Vector_2, int_3, int_4, int_5, int_6, float_7, int_8 )`
#### Function Description
Add a point on the minimap for a specific team.
#### Parameters
Type|Name|Description
--|--|--
int|int_1|No Description Set
Vector|Vector_2|No Description Set
int|int_3|No Description Set
int|int_4|No Description Set
int|int_5|No Description Set
int|int_6|No Description Set
float|float_7|No Description Set
int|int_8|No Description Set
---
### `void CDOTAGamerules:BeginNightstalkerNight(float_1 )`
#### Function Description
Begin night stalker night.
#### Parameters
Type|Name|Description
--|--|--
float|float_1|No Description Set
---
### `void CDOTAGamerules:BeginTemporaryNight(float_1 )`
#### Function Description
Begin temporary night.
#### Parameters
Type|Name|Description
--|--|--
float|float_1|No Description Set
---
### `void CDOTAGamerules:BotPopulate( )`
#### Function Description
Fills all the teams with bots if cheat mode is enabled.
---
### `void CDOTAGamerules:Defeated( )`
#### Function Description
Kills the ancient, etc.
---
### `bool CDOTAGamerules:DidMatchSignoutTimeOut( )`
#### Function Description
true when we have waited some time after end of the game and not received signout
---
### `void CDOTAGamerules:EnableCustomGameSetupAutoLaunch(bool_1 )`
#### Function Description
Enabled (true) or disable (false) auto launch for custom game setup.
#### Parameters
Type|Name|Description
--|--|--
bool|bool_1|No Description Set
---
### `void CDOTAGamerules:FinishCustomGameSetup( )`
#### Function Description
Indicate that the custom game setup phase is complete, and advance to the game.
---
### `void CDOTAGamerules:ForceCreepSpawn( )`
#### Function Description
Spawn the next wave of creeps.
---
### `void CDOTAGamerules:ForceGameStart( )`
#### Function Description
Transition game state to DOTA_GAMERULES_STATE_GAME_IN_PROGRESS
---
### `int CDOTAGamerules:GetCustomGameDifficulty( )`
#### Function Description
Returns the difficulty level of the custom game mode
---
### `int CDOTAGamerules:GetCustomGameTeamMaxPlayers(int_1 )`
#### Function Description
Get whether a team is selectable during game setup
#### Parameters
Type|Name|Description
--|--|--
int|int_1|No Description Set
---
### `float CDOTAGamerules:GetDOTATime(bool_1, bool_2 )`
#### Function Description
(b IncludePregameTime b IncludeNegativeTime) Returns the actual DOTA in-game clock time.
#### Parameters
Type|Name|Description
--|--|--
bool|bool_1|No Description Set
bool|bool_2|No Description Set
---
### `int CDOTAGamerules:GetDifficulty( )`
#### Function Description
Returns difficulty level of the custom game mode
---
### `handle CDOTAGamerules:GetDroppedItem(int_1 )`
#### Function Description
Gets the Xth dropped item
#### Parameters
Type|Name|Description
--|--|--
int|int_1|No Description Set
---
### `float CDOTAGamerules:GetGameFrameTime( )`
#### Function Description
Returns the number of seconds elapsed since the last frame was renderered. This time doesn't count up when the game is paused
---
### `handle CDOTAGamerules:GetGameModeEntity( )`
#### Function Description
Get the game mode entity
---
### `string CDOTAGamerules:GetGameSessionConfigValue(string_1, string_2 )`
#### Function Description
Get a string value from the game session config (map options)
#### Parameters
Type|Name|Description
--|--|--
string|string_1|No Description Set
string|string_2|No Description Set
---
### `float CDOTAGamerules:GetGameTime( )`
#### Function Description
Returns the number of seconds elapsed since map start. This time doesn't count up when the game is paused
---
### `uint64 CDOTAGamerules:GetMatchID( )`
#### Function Description
Get the MatchID for this game.
---
### `bool CDOTAGamerules:GetMatchSignoutComplete( )`
#### Function Description
Have we received the post match signout message that includes reward information
---
### `int CDOTAGamerules:GetNianTotalDamageTaken( )`
#### Function Description
For New Bloom, get total damage taken by the Nian / Year Beast
---
### `table CDOTAGamerules:GetPlayerCustomGameAccountRecord(int_1 )`
#### Function Description
(Preview/Unreleased) Gets the player's custom game account record, as it looked at the start of this session
#### Parameters
Type|Name|Description
--|--|--
int|int_1|No Description Set
---
### `float CDOTAGamerules:GetStateTransitionTime( )`
#### Function Description
Get time remaining between state changes.
---
### `float CDOTAGamerules:GetTimeOfDay( )`
#### Function Description
Get the time of day
---
### `Vector CDOTAGamerules:GetWeatherWindDirection( )`
#### Function Description
Get Weather Wind Direction Vector
---
### `bool CDOTAGamerules:IsCheatMode( )`
#### Function Description
Are cheats enabled on the server
---
### `bool CDOTAGamerules:IsDaytime( )`
#### Function Description
Is it day time?
---
### `bool CDOTAGamerules:IsGamePaused( )`
#### Function Description
Returns whether the game is paused.
---
### `bool CDOTAGamerules:IsHeroRespawnEnabled( )`
#### Function Description
Returns whether hero respawn is enabled.
---
### `bool CDOTAGamerules:IsInBanPhase( )`
#### Function Description
Are we in the ban phase of hero pick?
---
### `bool CDOTAGamerules:IsItemInWhiteList(string_1 )`
#### Function Description
Query an item in the whitelist
#### Parameters
Type|Name|Description
--|--|--
string|string_1|No Description Set
---
### `bool CDOTAGamerules:IsNightstalkerNight( )`
#### Function Description
Is it night stalker night-time?
---
### `bool CDOTAGamerules:IsTemporaryNight( )`
#### Function Description
Is it temporarily night-time?
---
### `void CDOTAGamerules:LockCustomGameSetupTeamAssignment(bool_1 )`
#### Function Description
Lock (true) or unlock (false) team assignemnt. If team assignment is locked players cannot change teams.
#### Parameters
Type|Name|Description
--|--|--
bool|bool_1|No Description Set
---
### `void CDOTAGamerules:MakeTeamLose(int_1 )`
#### Function Description
Makes the specified team lose
#### Parameters
Type|Name|Description
--|--|--
int|int_1|No Description Set
---
### `int CDOTAGamerules:NumDroppedItems( )`
#### Function Description
Returns the number of items currently dropped on the ground
---
### `bool CDOTAGamerules:PlayerHasCustomGameHostPrivileges(handle_1 )`
#### Function Description
Whether a player has custom game host privileges (shuffle teams, etc.)
#### Parameters
Type|Name|Description
--|--|--
handle|handle_1|No Description Set
---
### `void CDOTAGamerules:Playtesting_UpdateAddOnKeyValues( )`
#### Function Description
Updates custom hero, unit and ability KeyValues in memory with the latest values from disk
---
### `void CDOTAGamerules:PrepareSpawners(float_1 )`
#### Function Description
Prepare Dota lane style spawners with a given interval
#### Parameters
Type|Name|Description
--|--|--
float|float_1|No Description Set
---
### `void CDOTAGamerules:RemoveItemFromWhiteList(string_1 )`
#### Function Description
Remove an item from the whitelist
#### Parameters
Type|Name|Description
--|--|--
string|string_1|No Description Set
---
### `void CDOTAGamerules:ResetDefeated( )`
#### Function Description
Restart after killing the ancient, etc.
---
### `void CDOTAGamerules:ResetGameTime( )`
#### Function Description
Restart gametime from 0
---
### `void CDOTAGamerules:ResetToCustomGameSetup( )`
#### Function Description
Restart at custom game setup.
---
### `void CDOTAGamerules:ResetToHeroSelection( )`
#### Function Description
Restart the game at hero selection
---
### `void CDOTAGamerules:SendCustomMessage(string_1, int_2, int_3 )`
#### Function Description
Sends a message on behalf of a player.
#### Parameters
Type|Name|Description
--|--|--
string|string_1|No Description Set
int|int_2|No Description Set
int|int_3|No Description Set
---
### `void CDOTAGamerules:SendCustomMessageToTeam(string_1, int_2, int_3, int_4 )`
#### Function Description
Sends a message on behalf of a player to the specified team.
#### Parameters
Type|Name|Description
--|--|--
string|string_1|No Description Set
int|int_2|No Description Set
int|int_3|No Description Set
int|int_4|No Description Set
---
### `void CDOTAGamerules:SetCreepMinimapIconScale(float_1 )`
#### Function Description
(flMinimapCreepIconScale) - Scale the creep icons on the minimap.
#### Parameters
Type|Name|Description
--|--|--
float|float_1|No Description Set
---
### `void CDOTAGamerules:SetCreepSpawningEnabled(bool_1 )`
#### Function Description
Sets whether the regular Dota creeps spawn.
#### Parameters
Type|Name|Description
--|--|--
bool|bool_1|No Description Set
---
### `void CDOTAGamerules:SetCustomGameAccountRecordSaveFunction(handle_1, handle_2 )`
#### Function Description
(Preview/Unreleased) Sets a callback to handle saving custom game account records (callback is passed a Player ID and should return a flat simple table)
#### Parameters
Type|Name|Description
--|--|--
handle|handle_1|No Description Set
handle|handle_2|No Description Set
---
### `void CDOTAGamerules:SetCustomGameAllowBattleMusic(bool_1 )`
#### Function Description
Sets a flag to enable/disable the default music handling code for custom games
#### Parameters
Type|Name|Description
--|--|--
bool|bool_1|No Description Set
---
### `void CDOTAGamerules:SetCustomGameAllowHeroPickMusic(bool_1 )`
#### Function Description
Sets a flag to enable/disable the default music handling code for custom games
#### Parameters
Type|Name|Description
--|--|--
bool|bool_1|No Description Set
---
### `void CDOTAGamerules:SetCustomGameAllowMusicAtGameStart(bool_1 )`
#### Function Description
Sets a flag to enable/disable the default music handling code for custom games
#### Parameters
Type|Name|Description
--|--|--
bool|bool_1|No Description Set
---
### `void CDOTAGamerules:SetCustomGameDifficulty(int_1 )`
#### Function Description
Set the difficulty level of the custom game mode
#### Parameters
Type|Name|Description
--|--|--
int|int_1|No Description Set
---
### `void CDOTAGamerules:SetCustomGameEndDelay(float_1 )`
#### Function Description
Sets the game end delay.
#### Parameters
Type|Name|Description
--|--|--
float|float_1|No Description Set
---
### `void CDOTAGamerules:SetCustomGameSetupAutoLaunchDelay(float_1 )`
#### Function Description
Set the amount of time to wait for auto launch.
#### Parameters
Type|Name|Description
--|--|--
float|float_1|No Description Set
---
### `void CDOTAGamerules:SetCustomGameSetupRemainingTime(float_1 )`
#### Function Description
Set the amount of remaining time, in seconds, for custom game setup. 0 = finish immediately, -1 = wait forever
#### Parameters
Type|Name|Description
--|--|--
float|float_1|No Description Set
---
### `void CDOTAGamerules:SetCustomGameSetupTimeout(float_1 )`
#### Function Description
Setup (pre-gameplay) phase timeout. 0 = instant, -1 = forever (until FinishCustomGameSetup is called)
#### Parameters
Type|Name|Description
--|--|--
float|float_1|No Description Set
---
### `void CDOTAGamerules:SetCustomGameTeamMaxPlayers(int_1, int_2 )`
#### Function Description
Set whether a team is selectable during game setup
#### Parameters
Type|Name|Description
--|--|--
int|int_1|No Description Set
int|int_2|No Description Set
---
### `void CDOTAGamerules:SetCustomVictoryMessage(string_1 )`
#### Function Description
Sets the victory message.
#### Parameters
Type|Name|Description
--|--|--
string|string_1|No Description Set
---
### `void CDOTAGamerules:SetCustomVictoryMessageDuration(float_1 )`
#### Function Description
Sets the victory message duration.
#### Parameters
Type|Name|Description
--|--|--
float|float_1|No Description Set
---
### `bool CDOTAGamerules:SetEventMetadataCustomTable(handle_1 )`
#### Function Description
Event-only ( table hMetadataTable )
#### Parameters
Type|Name|Description
--|--|--
handle|handle_1|No Description Set
---
### `bool CDOTAGamerules:SetEventSignoutCustomTable(handle_1 )`
#### Function Description
Event-only ( table hMetadataTable )
#### Parameters
Type|Name|Description
--|--|--
handle|handle_1|No Description Set
---
### `void CDOTAGamerules:SetFirstBloodActive(bool_1 )`
#### Function Description
Sets whether First Blood has been triggered.
#### Parameters
Type|Name|Description
--|--|--
bool|bool_1|No Description Set
---
### `void CDOTAGamerules:SetGameWinner(int_1 )`
#### Function Description
Makes the specified team win
#### Parameters
Type|Name|Description
--|--|--
int|int_1|No Description Set
---
### `void CDOTAGamerules:SetGoldPerTick(int_1 )`
#### Function Description
Set the auto gold increase per timed interval.
#### Parameters
Type|Name|Description
--|--|--
int|int_1|No Description Set
---
### `void CDOTAGamerules:SetGoldTickTime(float_1 )`
#### Function Description
Set the time interval between auto gold increases.
#### Parameters
Type|Name|Description
--|--|--
float|float_1|No Description Set
---
### `void CDOTAGamerules:SetHeroMinimapIconScale(float_1 )`
#### Function Description
(flMinimapHeroIconScale) - Scale the hero minimap icons on the minimap.
#### Parameters
Type|Name|Description
--|--|--
float|float_1|No Description Set
---
### `void CDOTAGamerules:SetHeroRespawnEnabled(bool_1 )`
#### Function Description
Control if the normal DOTA hero respawn rules apply.
#### Parameters
Type|Name|Description
--|--|--
bool|bool_1|No Description Set
---
### `void CDOTAGamerules:SetHeroSelectPenaltyTime(float_1 )`
#### Function Description
Sets amount of penalty time before randoming a hero
#### Parameters
Type|Name|Description
--|--|--
float|float_1|No Description Set
---
### `void CDOTAGamerules:SetHeroSelectionTime(float_1 )`
#### Function Description
Sets the amount of time players have to pick their hero.
#### Parameters
Type|Name|Description
--|--|--
float|float_1|No Description Set
---
### `void CDOTAGamerules:SetHideKillMessageHeaders(bool_1 )`
#### Function Description
Sets whether the multikill, streak, and first-blood banners appear at the top of the screen.
#### Parameters
Type|Name|Description
--|--|--
bool|bool_1|No Description Set
---
### `void CDOTAGamerules:SetOverlayHealthBarUnit(handle_1, int_2 )`
#### Function Description
Show this unit's health on the overlay health bar
#### Parameters
Type|Name|Description
--|--|--
handle|handle_1|No Description Set
int|int_2|No Description Set
---
### `void CDOTAGamerules:SetPostGameTime(float_1 )`
#### Function Description
Sets the amount of time players have between the game ending and the server disconnecting them.
#### Parameters
Type|Name|Description
--|--|--
float|float_1|No Description Set
---
### `void CDOTAGamerules:SetPreGameTime(float_1 )`
#### Function Description
Sets the amount of time players have between picking their hero and game start.
#### Parameters
Type|Name|Description
--|--|--
float|float_1|No Description Set
---
### `void CDOTAGamerules:SetRuneMinimapIconScale(float_1 )`
#### Function Description
(flMinimapRuneIconScale) - Scale the rune icons on the minimap.
#### Parameters
Type|Name|Description
--|--|--
float|float_1|No Description Set
---
### `void CDOTAGamerules:SetRuneSpawnTime(float_1 )`
#### Function Description
Sets the amount of time between rune spawns.
#### Parameters
Type|Name|Description
--|--|--
float|float_1|No Description Set
---
### `void CDOTAGamerules:SetSafeToLeave(bool_1 )`
#### Function Description
(bSafeToLeave) - Mark this game as safe to leave.
#### Parameters
Type|Name|Description
--|--|--
bool|bool_1|No Description Set
---
### `void CDOTAGamerules:SetSameHeroSelectionEnabled(bool_1 )`
#### Function Description
When true, players can repeatedly pick the same hero.
#### Parameters
Type|Name|Description
--|--|--
bool|bool_1|No Description Set
---
### `void CDOTAGamerules:SetShowcaseTime(float_1 )`
#### Function Description
Sets the amount of time players have between the strategy phase and entering the pre-game phase.
#### Parameters
Type|Name|Description
--|--|--
float|float_1|No Description Set
---
### `void CDOTAGamerules:SetStartingGold(int_1 )`
#### Function Description
Set the starting gold amount.
#### Parameters
Type|Name|Description
--|--|--
int|int_1|No Description Set
---
### `void CDOTAGamerules:SetStrategyTime(float_1 )`
#### Function Description
Sets the amount of time players have between the hero selection and entering the showcase phase.
#### Parameters
Type|Name|Description
--|--|--
float|float_1|No Description Set
---
### `void CDOTAGamerules:SetTimeOfDay(float_1 )`
#### Function Description
Set the time of day.
#### Parameters
Type|Name|Description
--|--|--
float|float_1|No Description Set
---
### `void CDOTAGamerules:SetTreeRegrowTime(float_1 )`
#### Function Description
Sets the tree regrow time in seconds.
#### Parameters
Type|Name|Description
--|--|--
float|float_1|No Description Set
---
### `void CDOTAGamerules:SetUseBaseGoldBountyOnHeroes(bool_1 )`
#### Function Description
Heroes will use the basic NPC functionality for determining their bounty, rather than DOTA specific formulas.
#### Parameters
Type|Name|Description
--|--|--
bool|bool_1|No Description Set
---
### `void CDOTAGamerules:SetUseCustomHeroXPValues(bool_1 )`
#### Function Description
Allows heroes in the map to give a specific amount of XP (this value must be set).
#### Parameters
Type|Name|Description
--|--|--
bool|bool_1|No Description Set
---
### `void CDOTAGamerules:SetUseUniversalShopMode(bool_1 )`
#### Function Description
When true, all items are available at as long as any shop is in range.
#### Parameters
Type|Name|Description
--|--|--
bool|bool_1|No Description Set
---
### `void CDOTAGamerules:SetWeatherWindDirection(Vector_1 )`
#### Function Description
Set Weather Wind Direction Vector
#### Parameters
Type|Name|Description
--|--|--
Vector|Vector_1|No Description Set
---
### `void CDOTAGamerules:SetWhiteListEnabled(bool_1 )`
#### Function Description
Item whitelist functionality enable/disable
#### Parameters
Type|Name|Description
--|--|--
bool|bool_1|No Description Set
---
### `void CDOTAGamerules:SpawnAndReleaseCreeps( )`
#### Function Description
Spawn and release the next creep wave from Dota lane style spawners.
---
### `int CDOTAGamerules:State_Get( )`
#### Function Description
Get the current Gamerules state
---
## **CDOTAPlayer**
---
### `handle CDOTAPlayer:GetAssignedHero( )`
#### Function Description
Get the player's hero.
---
### `int CDOTAPlayer:GetPlayerID( )`
#### Function Description
Get the player's official PlayerID; notably is -1 when the player isn't yet on a team.
---
### `void CDOTAPlayer:MakeRandomHeroSelection( )`
#### Function Description
Randoms this player's hero.
---
### `void CDOTAPlayer:SetAssignedHeroEntity(hHero )`
#### Function Description
Sets this player's hero .
#### Parameters
Type|Name|Description
--|--|--
handle|hHero|No Description Set
---
### `void CDOTAPlayer:SetKillCamUnit(hEntity )`
#### Function Description
Set the kill cam unit for this hero.
#### Parameters
Type|Name|Description
--|--|--
handle|hEntity|No Description Set
---
### `void CDOTAPlayer:SetMusicStatus(nMusicStatus, flIntensity )`
#### Function Description
(nMusicStatus, flIntensity) - Set the music status for this player, note this will only really apply if dota_music_battle_enable is off.
#### Parameters
Type|Name|Description
--|--|--
int|nMusicStatus|No Description Set
float|flIntensity|No Description Set
---
### `void CDOTAPlayer:SetSelectedHero(pszHeroName )`
#### Function Description
Sets this player's hero selection.
#### Parameters
Type|Name|Description
--|--|--
string|pszHeroName|No Description Set
---
## **CDOTATutorial**
---
### `bool CDOTATutorial:AddBot(string_1, string_2, string_3, bool_4 )`
#### Function Description
Add a computer controlled bot.
#### Parameters
Type|Name|Description
--|--|--
string|string_1|No Description Set
string|string_2|No Description Set
string|string_3|No Description Set
bool|bool_4|No Description Set
---
### `void CDOTATutorial:AddQuest(string_1, int_2, string_3, string_4 )`
#### Function Description
Add a quest to the quest log
#### Parameters
Type|Name|Description
--|--|--
string|string_1|No Description Set
int|int_2|No Description Set
string|string_3|No Description Set
string|string_4|No Description Set
---
### `void CDOTATutorial:AddShopWhitelistItem(string_1 )`
#### Function Description
Add an item to the shop whitelist.
#### Parameters
Type|Name|Description
--|--|--
string|string_1|No Description Set
---
### `void CDOTATutorial:CompleteQuest(string_1 )`
#### Function Description
Complete a quest,
#### Parameters
Type|Name|Description
--|--|--
string|string_1|No Description Set
---
### `void CDOTATutorial:CreateLocationTask(Vector_1 )`
#### Function Description
Add a task to move to a specific location
#### Parameters
Type|Name|Description
--|--|--
Vector|Vector_1|No Description Set
---
### `void CDOTATutorial:EnableCreepAggroViz(bool_1 )`
#### Function Description
Alert the player when a creep becomes agro to their hero.
#### Parameters
Type|Name|Description
--|--|--
bool|bool_1|No Description Set
---
### `void CDOTATutorial:EnablePlayerOffscreenTip(bool_1 )`
#### Function Description
Enable the tip to alert players how to find their hero.
#### Parameters
Type|Name|Description
--|--|--
bool|bool_1|No Description Set
---
### `void CDOTATutorial:EnableTowerAggroViz(bool_1 )`
#### Function Description
Alert the player when a tower becomes agro to their hero.
#### Parameters
Type|Name|Description
--|--|--
bool|bool_1|No Description Set
---
### `void CDOTATutorial:FinishTutorial( )`
#### Function Description
End the tutorial.
---
### `void CDOTATutorial:ForceGameStart( )`
#### Function Description
Force the start of the game.
---
### `bool CDOTATutorial:GetTimeFrozen( )`
#### Function Description
Is our time frozen?
---
### `bool CDOTATutorial:IsItemInWhiteList(string_1 )`
#### Function Description
Is this item currently in the white list.
#### Parameters
Type|Name|Description
--|--|--
string|string_1|No Description Set
---
### `void CDOTATutorial:RemoveShopWhitelistItem(string_1 )`
#### Function Description
Remove an item from the shop whitelist.
#### Parameters
Type|Name|Description
--|--|--
string|string_1|No Description Set
---
### `void CDOTATutorial:SelectHero(string_1 )`
#### Function Description
Select a hero for the local player
#### Parameters
Type|Name|Description
--|--|--
string|string_1|No Description Set
---
### `void CDOTATutorial:SelectPlayerTeam(string_1 )`
#### Function Description
Select the team for the local player
#### Parameters
Type|Name|Description
--|--|--
string|string_1|No Description Set
---
### `void CDOTATutorial:SetItemGuide(string_1 )`
#### Function Description
Set the current item guide.
#### Parameters
Type|Name|Description
--|--|--
string|string_1|No Description Set
---
### `void CDOTATutorial:SetOrModifyPlayerGold(int_1, bool_2 )`
#### Function Description
Set gold amount for the tutorial player. (int) GoldAmount, (bool) true=Set, false=Modify
#### Parameters
Type|Name|Description
--|--|--
int|int_1|No Description Set
bool|bool_2|No Description Set
---
### `void CDOTATutorial:SetQuickBuy(string_1 )`
#### Function Description
Set players quick buy item.
#### Parameters
Type|Name|Description
--|--|--
string|string_1|No Description Set
---
### `void CDOTATutorial:SetShopOpen(bool_1 )`
#### Function Description
Set the shop open or closed.
#### Parameters
Type|Name|Description
--|--|--
bool|bool_1|No Description Set
---
### `void CDOTATutorial:SetTimeFrozen(bool_1 )`
#### Function Description
Set if we should freeze time or not.
#### Parameters
Type|Name|Description
--|--|--
bool|bool_1|No Description Set
---
### `void CDOTATutorial:SetTutorialConvar(string_1, string_2 )`
#### Function Description
Set a tutorial convar
#### Parameters
Type|Name|Description
--|--|--
string|string_1|No Description Set
string|string_2|No Description Set
---
### `void CDOTATutorial:SetTutorialUI(int_1 )`
#### Function Description
Set the UI to use a reduced version to focus attention to specific elements.
#### Parameters
Type|Name|Description
--|--|--
int|int_1|No Description Set
---
### `void CDOTATutorial:SetWhiteListEnabled(bool_1 )`
#### Function Description
Set if we should whitelist shop items.
#### Parameters
Type|Name|Description
--|--|--
bool|bool_1|No Description Set
---
### `void CDOTATutorial:StartTutorialMode( )`
#### Function Description
Initialize Tutorial Mode
---
### `void CDOTATutorial:UpgradePlayerAbility(string_1 )`
#### Function Description
Upgrade a specific ability for the local hero
#### Parameters
Type|Name|Description
--|--|--
string|string_1|No Description Set
---
## **CDOTAVoteSystem**
---
### `void CDOTAVoteSystem:StartVote(handle_1 )`
#### Function Description
Starts a vote, based upon a table of parameters
#### Parameters
Type|Name|Description
--|--|--
handle|handle_1|No Description Set
---
## **CDOTA_Ability_Animation_Attack**
---
### `void CDOTA_Ability_Animation_Attack:SetPlaybackRate(flRate )`
#### Function Description
Override playbackrate
#### Parameters
Type|Name|Description
--|--|--
float|flRate|No Description Set
---
## **CDOTA_Ability_Animation_TailSpin**
---
### `void CDOTA_Ability_Animation_TailSpin:SetPlaybackRate(flRate )`
#### Function Description
Override playbackrate
#### Parameters
Type|Name|Description
--|--|--
float|flRate|No Description Set
---
## **CDOTA_Ability_DataDriven**
---
### `handle CDOTA_Ability_DataDriven:ApplyDataDrivenModifier(hCaster, hTarget, pszModifierName, hModifierTable )`
#### Function Description
Applies a data driven modifier to the target
#### Parameters
Type|Name|Description
--|--|--
handle|hCaster|No Description Set
handle|hTarget|No Description Set
string|pszModifierName|No Description Set
handle|hModifierTable|No Description Set
---
### `handle CDOTA_Ability_DataDriven:ApplyDataDrivenThinker(hCaster, vLocation, pszModifierName, hModifierTable )`
#### Function Description
Applies a data driven thinker at the location
#### Parameters
Type|Name|Description
--|--|--
handle|hCaster|No Description Set
Vector|vLocation|No Description Set
string|pszModifierName|No Description Set
handle|hModifierTable|No Description Set
---
## **CDOTA_Ability_Lua**
---
### `int CDOTA_Ability_Lua:CastFilterResult( )`
#### Function Description
Determine whether an issued command with no target is valid.
---
### `int CDOTA_Ability_Lua:CastFilterResultLocation(vLocation )`
#### Function Description
(Vector vLocation) Determine whether an issued command on a location is valid.
#### Parameters
Type|Name|Description
--|--|--
Vector|vLocation|No Description Set
---
### `int CDOTA_Ability_Lua:CastFilterResultTarget(hTarget )`
#### Function Description
(HSCRIPT hTarget) Determine whether an issued command on a target is valid.
#### Parameters
Type|Name|Description
--|--|--
handle|hTarget|No Description Set
---
### `float CDOTA_Ability_Lua:GetAOERadius( )`
#### Function Description
Controls the size of the AOE casting cursor.
---
### `string CDOTA_Ability_Lua:GetAssociatedPrimaryAbilities( )`
#### Function Description
Returns abilities that are stolen simultaneously, or otherwise related in functionality.
---
### `string CDOTA_Ability_Lua:GetAssociatedSecondaryAbilities( )`
#### Function Description
Returns other abilities that are stolen simultaneously, or otherwise related in functionality.  Generally hidden abilities.
---
### `int CDOTA_Ability_Lua:GetBehavior( )`
#### Function Description
Return cast behavior type of this ability.
---
### `int CDOTA_Ability_Lua:GetCastAnimation( )`
#### Function Description
Return casting animation of this ability.
---
### `float CDOTA_Ability_Lua:GetCastPoint( )`
#### Function Description
Return cast point of this ability.
---
### `int CDOTA_Ability_Lua:GetCastRange(vLocation, hTarget )`
#### Function Description
Return cast range of this ability.
#### Parameters
Type|Name|Description
--|--|--
Vector|vLocation|No Description Set
handle|hTarget|No Description Set
---
### `int CDOTA_Ability_Lua:GetChannelAnimation( )`
#### Function Description
Return channel animation of this ability.
---
### `float CDOTA_Ability_Lua:GetChannelTime( )`
#### Function Description
Return the channel time of this ability.
---
### `int CDOTA_Ability_Lua:GetChannelledManaCostPerSecond(iLevel )`
#### Function Description
Return mana cost at the given level per second while channeling (-1 is current).
#### Parameters
Type|Name|Description
--|--|--
int|iLevel|No Description Set
---
### `int CDOTA_Ability_Lua:GetConceptRecipientType( )`
#### Function Description
Return who hears speech when this spell is cast.
---
### `float CDOTA_Ability_Lua:GetCooldown(iLevel )`
#### Function Description
Return cooldown of this ability.
#### Parameters
Type|Name|Description
--|--|--
int|iLevel|No Description Set
---
### `string CDOTA_Ability_Lua:GetCustomCastError( )`
#### Function Description
Return the error string of a failed command with no target.
---
### `string CDOTA_Ability_Lua:GetCustomCastErrorLocation(vLocation )`
#### Function Description
(Vector vLocation) Return the error string of a failed command on a location.
#### Parameters
Type|Name|Description
--|--|--
Vector|vLocation|No Description Set
---
### `string CDOTA_Ability_Lua:GetCustomCastErrorTarget(hTarget )`
#### Function Description
(HSCRIPT hTarget) Return the error string of a failed command on a target.
#### Parameters
Type|Name|Description
--|--|--
handle|hTarget|No Description Set
---
### `int CDOTA_Ability_Lua:GetGoldCost(iLevel )`
#### Function Description
Return gold cost at the given level (-1 is current).
#### Parameters
Type|Name|Description
--|--|--
int|iLevel|No Description Set
---
### `string CDOTA_Ability_Lua:GetIntrinsicModifierName( )`
#### Function Description
Returns the name of the modifier applied passively by this ability.
---
### `int CDOTA_Ability_Lua:GetManaCost(iLevel )`
#### Function Description
Return mana cost at the given level (-1 is current).
#### Parameters
Type|Name|Description
--|--|--
int|iLevel|No Description Set
---
### `float CDOTA_Ability_Lua:GetPlaybackRateOverride( )`
#### Function Description
Return the animation rate of the cast animation.
---
### `bool CDOTA_Ability_Lua:IsHiddenAbilityCastable( )`
#### Function Description
Returns true if this ability can be used when not on the action panel.
---
### `bool CDOTA_Ability_Lua:IsHiddenWhenStolen( )`
#### Function Description
Returns true if this ability is hidden when stolen by Spell Steal.
---
### `bool CDOTA_Ability_Lua:IsRefreshable( )`
#### Function Description
Returns true if this ability is refreshed by Refresher Orb.
---
### `bool CDOTA_Ability_Lua:IsStealable( )`
#### Function Description
Returns true if this ability can be stolen by Spell Steal.
---
### `void CDOTA_Ability_Lua:OnAbilityPhaseInterrupted( )`
#### Function Description
Cast time did not complete successfully.
---
### `bool CDOTA_Ability_Lua:OnAbilityPhaseStart( )`
#### Function Description
Cast time begins (return true for successful cast).
---
### `void CDOTA_Ability_Lua:OnAbilityPinged(nPlayerID, bCtrlHeld )`
#### Function Description
The ability was pinged (nPlayerID, bCtrlHeld).
#### Parameters
Type|Name|Description
--|--|--
int|nPlayerID|No Description Set
bool|bCtrlHeld|No Description Set
---
### `void CDOTA_Ability_Lua:OnChannelFinish(bInterrupted )`
#### Function Description
(bool bInterrupted) Channel finished.
#### Parameters
Type|Name|Description
--|--|--
bool|bInterrupted|No Description Set
---
### `void CDOTA_Ability_Lua:OnChannelThink(flInterval )`
#### Function Description
(float flInterval) Channeling is taking place.
#### Parameters
Type|Name|Description
--|--|--
float|flInterval|No Description Set
---
### `void CDOTA_Ability_Lua:OnHeroCalculateStatBonus( )`
#### Function Description
Caster (hero only) gained a level, skilled an ability, or received a new stat bonus.
---
### `void CDOTA_Ability_Lua:OnHeroDiedNearby(unit, attacker, table )`
#### Function Description
A hero has died in the vicinity (ie Urn), takes table of params.
#### Parameters
Type|Name|Description
--|--|--
handle|unit|No Description Set
handle|attacker|No Description Set
handle|table|No Description Set
---
### `void CDOTA_Ability_Lua:OnHeroLevelUp( )`
#### Function Description
Caster gained a level.
---
### `void CDOTA_Ability_Lua:OnInventoryContentsChanged( )`
#### Function Description
Caster inventory changed.
---
### `void CDOTA_Ability_Lua:OnItemEquipped(hItem )`
#### Function Description
( HSCRIPT hItem ) Caster equipped item.
#### Parameters
Type|Name|Description
--|--|--
handle|hItem|No Description Set
---
### `void CDOTA_Ability_Lua:OnOwnerDied( )`
#### Function Description
Caster died.
---
### `void CDOTA_Ability_Lua:OnOwnerSpawned( )`
#### Function Description
Caster respawned or spawned for the first time.
---
### `bool CDOTA_Ability_Lua:OnProjectileHit(hTarget, vLocation )`
#### Function Description
(HSCRIPT hTarget, Vector vLocation) Projectile has collided with a given target or reached its destination (target is invalid).
#### Parameters
Type|Name|Description
--|--|--
handle|hTarget|No Description Set
Vector|vLocation|No Description Set
---
### `bool CDOTA_Ability_Lua:OnProjectileHitHandle(hTarget, vLocation, iProjectileHandle )`
#### Function Description
(HSCRIPT hTarget, Vector vLocation, int nHandle) Projectile has collided with a given target or reached its destination (target is invalid).
#### Parameters
Type|Name|Description
--|--|--
handle|hTarget|No Description Set
Vector|vLocation|No Description Set
int|iProjectileHandle|No Description Set
---
### `bool CDOTA_Ability_Lua:OnProjectileHit_ExtraData(hTarget, vLocation, table )`
#### Function Description
(HSCRIPT hTarget, Vector vLocation, table kv) Projectile has collided with a given target or reached its destination (target is invalid).
#### Parameters
Type|Name|Description
--|--|--
handle|hTarget|No Description Set
Vector|vLocation|No Description Set
handle|table|No Description Set
---
### `void CDOTA_Ability_Lua:OnProjectileThink(vLocation )`
#### Function Description
(Vector vLocation) Projectile is actively moving.
#### Parameters
Type|Name|Description
--|--|--
Vector|vLocation|No Description Set
---
### `void CDOTA_Ability_Lua:OnProjectileThinkHandle(iProjectileHandle )`
#### Function Description
(int nProjectileHandle) Projectile is actively moving.
#### Parameters
Type|Name|Description
--|--|--
int|iProjectileHandle|No Description Set
---
### `void CDOTA_Ability_Lua:OnProjectileThink_ExtraData(vLocation, table )`
#### Function Description
(Vector vLocation, table kv ) Projectile is actively moving.
#### Parameters
Type|Name|Description
--|--|--
Vector|vLocation|No Description Set
handle|table|No Description Set
---
### `void CDOTA_Ability_Lua:OnSpellStart( )`
#### Function Description
Cast time finished, spell effects begin.
---
### `void CDOTA_Ability_Lua:OnStolen(hSourceAbility )`
#### Function Description
( HSCRIPT hAbility ) Special behavior when stolen by Spell Steal.
#### Parameters
Type|Name|Description
--|--|--
handle|hSourceAbility|No Description Set
---
### `void CDOTA_Ability_Lua:OnToggle( )`
#### Function Description
Ability is toggled on/off.
---
### `void CDOTA_Ability_Lua:OnUnStolen( )`
#### Function Description
Special behavior when lost by Spell Steal.
---
### `void CDOTA_Ability_Lua:OnUpgrade( )`
#### Function Description
Ability gained a level.
---
### `bool CDOTA_Ability_Lua:ProcsMagicStick( )`
#### Function Description
Returns true if this ability will generate magic stick charges for nearby enemies.
---
### `bool CDOTA_Ability_Lua:ResetToggleOnRespawn( )`
#### Function Description
Returns true if this ability should return to the default toggle state when its parent respawns.
---
### `int CDOTA_Ability_Lua:SpeakTrigger( )`
#### Function Description
Return the type of speech used.
---
## **CDOTA_Ability_Nian_Dive**
---
### `void CDOTA_Ability_Nian_Dive:SetPlaybackRate(flRate )`
#### Function Description
Override playbackrate
#### Parameters
Type|Name|Description
--|--|--
float|flRate|No Description Set
---
## **CDOTA_Ability_Nian_Leap**
---
### `void CDOTA_Ability_Nian_Leap:SetPlaybackRate(flRate )`
#### Function Description
Override playbackrate
#### Parameters
Type|Name|Description
--|--|--
float|flRate|No Description Set
---
## **CDOTA_Ability_Nian_Roar**
---
### `int CDOTA_Ability_Nian_Roar:GetCastCount( )`
#### Function Description
Number of times Nian has used the roar
---
## **CDOTA_BaseNPC**
---
### `handle CDOTA_BaseNPC:AddAbility(pszAbilityName )`
#### Function Description
Add an ability to this unit by name.
#### Parameters
Type|Name|Description
--|--|--
string|pszAbilityName|No Description Set
---
### `void CDOTA_BaseNPC:AddActivityModifier(szName )`
#### Function Description
Add an activity modifier that affects future StartGesture calls
#### Parameters
Type|Name|Description
--|--|--
string|szName|No Description Set
---
### `handle CDOTA_BaseNPC:AddItem(hItem )`
#### Function Description
Add an item to this unit's inventory.
#### Parameters
Type|Name|Description
--|--|--
handle|hItem|No Description Set
---
### `handle CDOTA_BaseNPC:AddItemByName(pszItemName )`
#### Function Description
Add an item to this unit's inventory.
#### Parameters
Type|Name|Description
--|--|--
string|pszItemName|No Description Set
---
### `handle CDOTA_BaseNPC:AddNewModifier(hCaster, hAbility, pszScriptName, hModifierTable )`
#### Function Description
Add a modifier to this unit.
#### Parameters
Type|Name|Description
--|--|--
handle|hCaster|No Description Set
handle|hAbility|No Description Set
string|pszScriptName|No Description Set
handle|hModifierTable|No Description Set
---
### `void CDOTA_BaseNPC:AddNoDraw( )`
#### Function Description
Adds the no draw flag.
---
### `void CDOTA_BaseNPC:AddSpeechBubble(iBubble, pszSpeech, flDuration, unOffsetX, unOffsetY )`
#### Function Description
Add a speech bubble(1-4 live at a time) to this NPC.
#### Parameters
Type|Name|Description
--|--|--
int|iBubble|No Description Set
string|pszSpeech|No Description Set
float|flDuration|No Description Set
unsigned|unOffsetX|No Description Set
unsigned|unOffsetY|No Description Set
---
### `void CDOTA_BaseNPC:AlertNearbyUnits(hAttacker, hAbility )`
#### Function Description

#### Parameters
Type|Name|Description
--|--|--
handle|hAttacker|No Description Set
handle|hAbility|No Description Set
---
### `void CDOTA_BaseNPC:AngerNearbyUnits( )`
#### Function Description

---
### `void CDOTA_BaseNPC:AttackNoEarlierThan(flTime )`
#### Function Description

#### Parameters
Type|Name|Description
--|--|--
float|flTime|No Description Set
---
### `bool CDOTA_BaseNPC:AttackReady( )`
#### Function Description

---
### `float CDOTA_BaseNPC:BoundingRadius2D( )`
#### Function Description

---
### `bool CDOTA_BaseNPC:CanEntityBeSeenByMyTeam(hEntity )`
#### Function Description
Check FoW to see if an entity is visible.
#### Parameters
Type|Name|Description
--|--|--
handle|hEntity|No Description Set
---
### `bool CDOTA_BaseNPC:CanSellItems( )`
#### Function Description
Query if this unit can sell items.
---
### `void CDOTA_BaseNPC:CastAbilityImmediately(hAbility, iPlayerIndex )`
#### Function Description
Cast an ability immediately.
#### Parameters
Type|Name|Description
--|--|--
handle|hAbility|No Description Set
int|iPlayerIndex|No Description Set
---
### `void CDOTA_BaseNPC:CastAbilityNoTarget(hAbility, iPlayerIndex )`
#### Function Description
Cast an ability with no target.
#### Parameters
Type|Name|Description
--|--|--
handle|hAbility|No Description Set
int|iPlayerIndex|No Description Set
---
### `void CDOTA_BaseNPC:CastAbilityOnPosition(vPosition, hAbility, iPlayerIndex )`
#### Function Description
Cast an ability on a position.
#### Parameters
Type|Name|Description
--|--|--
Vector|vPosition|No Description Set
handle|hAbility|No Description Set
int|iPlayerIndex|No Description Set
---
### `void CDOTA_BaseNPC:CastAbilityOnTarget(hTarget, hAbility, iPlayerIndex )`
#### Function Description
Cast an ability on a target entity.
#### Parameters
Type|Name|Description
--|--|--
handle|hTarget|No Description Set
handle|hAbility|No Description Set
int|iPlayerIndex|No Description Set
---
### `void CDOTA_BaseNPC:CastAbilityToggle(hAbility, iPlayerIndex )`
#### Function Description
Toggle an ability.
#### Parameters
Type|Name|Description
--|--|--
handle|hAbility|No Description Set
int|iPlayerIndex|No Description Set
---
### `void CDOTA_BaseNPC:ClearActivityModifiers( )`
#### Function Description
Clear Activity modifiers
---
### `void CDOTA_BaseNPC:DestroyAllSpeechBubbles( )`
#### Function Description

---
### `void CDOTA_BaseNPC:DisassembleItem(hItem )`
#### Function Description
Disassemble the passed item in this unit's inventory.
#### Parameters
Type|Name|Description
--|--|--
handle|hItem|No Description Set
---
### `void CDOTA_BaseNPC:DropItemAtPosition(vDest, hItem )`
#### Function Description
Drop an item at a given point.
#### Parameters
Type|Name|Description
--|--|--
Vector|vDest|No Description Set
handle|hItem|No Description Set
---
### `void CDOTA_BaseNPC:DropItemAtPositionImmediate(hItem, vPosition )`
#### Function Description
Immediately drop a carried item at a given position.
#### Parameters
Type|Name|Description
--|--|--
handle|hItem|No Description Set
Vector|vPosition|No Description Set
---
### `void CDOTA_BaseNPC:EjectItemFromStash(hItem )`
#### Function Description
Drops the selected item out of this unit's stash.
#### Parameters
Type|Name|Description
--|--|--
handle|hItem|No Description Set
---
### `void CDOTA_BaseNPC:FaceTowards(vTarget )`
#### Function Description
This unit will be set to face the target point.
#### Parameters
Type|Name|Description
--|--|--
Vector|vTarget|No Description Set
---
### `void CDOTA_BaseNPC:FadeGesture(nActivity )`
#### Function Description
Fade and remove the given gesture activity.
#### Parameters
Type|Name|Description
--|--|--
int|nActivity|No Description Set
---
### `handle CDOTA_BaseNPC:FindAbilityByName(pAbilityName )`
#### Function Description
Retrieve an ability by name from the unit.
#### Parameters
Type|Name|Description
--|--|--
string|pAbilityName|No Description Set
---
### `table CDOTA_BaseNPC:FindAllModifiers( )`
#### Function Description
Returns a table of all of the modifiers on the NPC.
---
### `table CDOTA_BaseNPC:FindAllModifiersByName(pszScriptName )`
#### Function Description
Returns a table of all of the modifiers on the NPC with the passed name (modifierName)
#### Parameters
Type|Name|Description
--|--|--
string|pszScriptName|No Description Set
---
### `handle CDOTA_BaseNPC:FindItemInInventory(pszItemName )`
#### Function Description
Get handle to first item in inventory, else nil.
#### Parameters
Type|Name|Description
--|--|--
string|pszItemName|No Description Set
---
### `handle CDOTA_BaseNPC:FindModifierByName(pszScriptName )`
#### Function Description
Return a handle to the modifier of the given name if found, else nil (string Name )
#### Parameters
Type|Name|Description
--|--|--
string|pszScriptName|No Description Set
---
### `handle CDOTA_BaseNPC:FindModifierByNameAndCaster(pszScriptName, hCaster )`
#### Function Description
Return a handle to the modifier of the given name from the passed caster if found, else nil ( string Name, hCaster )
#### Parameters
Type|Name|Description
--|--|--
string|pszScriptName|No Description Set
handle|hCaster|No Description Set
---
### `void CDOTA_BaseNPC:ForceKill(bReincarnate )`
#### Function Description
Kill this unit immediately.
#### Parameters
Type|Name|Description
--|--|--
bool|bReincarnate|No Description Set
---
### `void CDOTA_BaseNPC:ForcePlayActivityOnce(nActivity )`
#### Function Description
Play an activity once, and then go back to idle.
#### Parameters
Type|Name|Description
--|--|--
int|nActivity|No Description Set
---
### `handle CDOTA_BaseNPC:GetAbilityByIndex(iIndex )`
#### Function Description
Retrieve an ability by index from the unit.
#### Parameters
Type|Name|Description
--|--|--
int|iIndex|No Description Set
---
### `int CDOTA_BaseNPC:GetAbilityCount( )`
#### Function Description

---
### `float CDOTA_BaseNPC:GetAcquisitionRange( )`
#### Function Description
Gets the range at which this unit will auto-acquire.
---
### `float CDOTA_BaseNPC:GetAdditionalBattleMusicWeight( )`
#### Function Description
Combat involving this creature will have this weight added to the music calcuations.
---
### `handle CDOTA_BaseNPC:GetAggroTarget( )`
#### Function Description
Returns this unit's aggro target.
---
### `float CDOTA_BaseNPC:GetAttackAnimationPoint( )`
#### Function Description

---
### `int CDOTA_BaseNPC:GetAttackCapability( )`
#### Function Description

---
### `int CDOTA_BaseNPC:GetAttackDamage( )`
#### Function Description
Returns a random integer between the minimum and maximum base damage of the unit.
---
### `float CDOTA_BaseNPC:GetAttackRangeBuffer( )`
#### Function Description
Gets the attack range buffer.
---
### `float CDOTA_BaseNPC:GetAttackSpeed( )`
#### Function Description

---
### `handle CDOTA_BaseNPC:GetAttackTarget( )`
#### Function Description

---
### `float CDOTA_BaseNPC:GetAttacksPerSecond( )`
#### Function Description

---
### `int CDOTA_BaseNPC:GetAverageTrueAttackDamage(hTarget )`
#### Function Description
Returns the average value of the minimum and maximum damage values.
#### Parameters
Type|Name|Description
--|--|--
handle|hTarget|No Description Set
---
### `int CDOTA_BaseNPC:GetBaseAttackRange( )`
#### Function Description

---
### `float CDOTA_BaseNPC:GetBaseAttackTime( )`
#### Function Description

---
### `int CDOTA_BaseNPC:GetBaseDamageMax( )`
#### Function Description
Get the maximum attack damage of this unit.
---
### `int CDOTA_BaseNPC:GetBaseDamageMin( )`
#### Function Description
Get the minimum attack damage of this unit.
---
### `int CDOTA_BaseNPC:GetBaseDayTimeVisionRange( )`
#### Function Description
Returns the vision range before modifiers.
---
### `float CDOTA_BaseNPC:GetBaseHealthRegen( )`
#### Function Description

---
### `float CDOTA_BaseNPC:GetBaseMagicalResistanceValue( )`
#### Function Description
Returns base magical armor value.
---
### `float CDOTA_BaseNPC:GetBaseMaxHealth( )`
#### Function Description
Gets the base max health value.
---
### `float CDOTA_BaseNPC:GetBaseMoveSpeed( )`
#### Function Description

---
### `int CDOTA_BaseNPC:GetBaseNightTimeVisionRange( )`
#### Function Description
Returns the vision range after modifiers.
---
### `float CDOTA_BaseNPC:GetBonusManaRegen( )`
#### Function Description
This Mana regen is derived from constant bonuses like Basilius.
---
### `float CDOTA_BaseNPC:GetCastPoint(bAttack )`
#### Function Description

#### Parameters
Type|Name|Description
--|--|--
bool|bAttack|No Description Set
---
### `float CDOTA_BaseNPC:GetCastRangeBonus( )`
#### Function Description

---
### `handle CDOTA_BaseNPC:GetCloneSource( )`
#### Function Description
Get clone source (Meepo Prime, if this is a Meepo)
---
### `float CDOTA_BaseNPC:GetCollisionPadding( )`
#### Function Description
Returns the size of the collision padding around the hull.
---
### `float CDOTA_BaseNPC:GetCooldownReduction( )`
#### Function Description

---
### `float CDOTA_BaseNPC:GetCreationTime( )`
#### Function Description

---
### `handle CDOTA_BaseNPC:GetCurrentActiveAbility( )`
#### Function Description
Get the ability this unit is currently casting.
---
### `int CDOTA_BaseNPC:GetCurrentVisionRange( )`
#### Function Description
Gets the current vision range.
---
### `handle CDOTA_BaseNPC:GetCursorCastTarget( )`
#### Function Description

---
### `Vector CDOTA_BaseNPC:GetCursorPosition( )`
#### Function Description

---
### `bool CDOTA_BaseNPC:GetCursorTargetingNothing( )`
#### Function Description

---
### `int CDOTA_BaseNPC:GetDayTimeVisionRange( )`
#### Function Description
Returns the vision range after modifiers.
---
### `int CDOTA_BaseNPC:GetDeathXP( )`
#### Function Description
Get the XP bounty on this unit.
---
### `float CDOTA_BaseNPC:GetDisplayAttackSpeed( )`
#### Function Description
Attack speed expressed as constant value
---
### `float CDOTA_BaseNPC:GetEvasion( )`
#### Function Description

---
### `handle CDOTA_BaseNPC:GetForceAttackTarget( )`
#### Function Description

---
### `int CDOTA_BaseNPC:GetGoldBounty( )`
#### Function Description
Get the gold bounty on this unit.
---
### `float CDOTA_BaseNPC:GetHasteFactor( )`
#### Function Description

---
### `int CDOTA_BaseNPC:GetHealthDeficit( )`
#### Function Description
Returns integer amount of health missing from max.
---
### `int CDOTA_BaseNPC:GetHealthPercent( )`
#### Function Description
Get the current health percent of the unit.
---
### `float CDOTA_BaseNPC:GetHealthRegen( )`
#### Function Description

---
### `float CDOTA_BaseNPC:GetHullRadius( )`
#### Function Description
Get the collision hull radius of this NPC.
---
### `float CDOTA_BaseNPC:GetIdealSpeed( )`
#### Function Description
Returns speed after all modifiers.
---
### `float CDOTA_BaseNPC:GetIdealSpeedNoSlows( )`
#### Function Description
Returns speed after all modifiers, but excluding those that reduce speed.
---
### `float CDOTA_BaseNPC:GetIncreasedAttackSpeed( )`
#### Function Description

---
### `handle CDOTA_BaseNPC:GetInitialGoalEntity( )`
#### Function Description
Returns the initial waypoint goal for this NPC.
---
### `Vector CDOTA_BaseNPC:GetInitialGoalPosition( )`
#### Function Description
Get waypoint position for this NPC.
---
### `handle CDOTA_BaseNPC:GetItemInSlot(i )`
#### Function Description
Returns nth item in inventory slot (index is zero based).
#### Parameters
Type|Name|Description
--|--|--
int|i|No Description Set
---
### `float CDOTA_BaseNPC:GetLastAttackTime( )`
#### Function Description

---
### `float CDOTA_BaseNPC:GetLastDamageTime( )`
#### Function Description
Get the last time this NPC took damage
---
### `float CDOTA_BaseNPC:GetLastIdleChangeTime( )`
#### Function Description
Get the last game time that this unit switched to/from idle state.
---
### `int CDOTA_BaseNPC:GetLevel( )`
#### Function Description
Returns the level of this unit.
---
### `float CDOTA_BaseNPC:GetMagicalArmorValue( )`
#### Function Description
Returns current magical armor value.
---
### `int CDOTA_BaseNPC:GetMainControllingPlayer( )`
#### Function Description
Returns the player ID of the controlling player.
---
### `float CDOTA_BaseNPC:GetMana( )`
#### Function Description
Get the mana on this unit.
---
### `int CDOTA_BaseNPC:GetManaPercent( )`
#### Function Description
Get the percent of mana remaining.
---
### `float CDOTA_BaseNPC:GetManaRegen( )`
#### Function Description

---
### `float CDOTA_BaseNPC:GetMaxMana( )`
#### Function Description
Get the maximum mana of this unit.
---
### `int CDOTA_BaseNPC:GetMaximumGoldBounty( )`
#### Function Description
Get the maximum gold bounty for this unit.
---
### `int CDOTA_BaseNPC:GetMinimumGoldBounty( )`
#### Function Description
Get the minimum gold bounty for this unit.
---
### `float CDOTA_BaseNPC:GetModelRadius( )`
#### Function Description

---
### `int CDOTA_BaseNPC:GetModifierCount( )`
#### Function Description
How many modifiers does this unit have?
---
### `string CDOTA_BaseNPC:GetModifierNameByIndex(nIndex )`
#### Function Description
Get a modifier name by index.
#### Parameters
Type|Name|Description
--|--|--
int|nIndex|No Description Set
---
### `int CDOTA_BaseNPC:GetModifierStackCount(pszScriptName, hCaster )`
#### Function Description
Gets the stack count of a given modifier.
#### Parameters
Type|Name|Description
--|--|--
string|pszScriptName|No Description Set
handle|hCaster|No Description Set
---
### `float CDOTA_BaseNPC:GetMoveSpeedModifier(flBaseSpeed, bReturnUnslowed )`
#### Function Description

#### Parameters
Type|Name|Description
--|--|--
float|flBaseSpeed|No Description Set
bool|bReturnUnslowed|No Description Set
---
### `bool CDOTA_BaseNPC:GetMustReachEachGoalEntity( )`
#### Function Description
Set whether this NPC is required to reach each goal entity, rather than being allowed to unkink their path.
---
### `bool CDOTA_BaseNPC:GetNeverMoveToClearSpace( )`
#### Function Description
If set to true, we will never attempt to move this unit to clear space, even when it unphases.
---
### `int CDOTA_BaseNPC:GetNightTimeVisionRange( )`
#### Function Description
Returns the vision range after modifiers.
---
### `int CDOTA_BaseNPC:GetOpposingTeamNumber( )`
#### Function Description

---
### `float CDOTA_BaseNPC:GetPaddedCollisionRadius( )`
#### Function Description
Get the collision hull radius (including padding) of this NPC.
---
### `float CDOTA_BaseNPC:GetPhysicalArmorBaseValue( )`
#### Function Description
Returns base physical armor value.
---
### `float CDOTA_BaseNPC:GetPhysicalArmorValue(bIgnoreBase )`
#### Function Description
Returns current physical armor value.
#### Parameters
Type|Name|Description
--|--|--
bool|bIgnoreBase|No Description Set
---
### `handle CDOTA_BaseNPC:GetPlayerOwner( )`
#### Function Description
Returns the player that owns this unit.
---
### `int CDOTA_BaseNPC:GetPlayerOwnerID( )`
#### Function Description
Get the owner player ID for this unit.
---
### `int CDOTA_BaseNPC:GetProjectileSpeed( )`
#### Function Description

---
### `float CDOTA_BaseNPC:GetRangeToUnit(hNPC )`
#### Function Description

#### Parameters
Type|Name|Description
--|--|--
handle|hNPC|No Description Set
---
### `string CDOTA_BaseNPC:GetRangedProjectileName( )`
#### Function Description

---
### `float CDOTA_BaseNPC:GetSecondsPerAttack( )`
#### Function Description

---
### `float CDOTA_BaseNPC:GetSpellAmplification(bBaseOnly )`
#### Function Description

#### Parameters
Type|Name|Description
--|--|--
bool|bBaseOnly|No Description Set
---
### `float CDOTA_BaseNPC:GetStatusResistance( )`
#### Function Description

---
### `int CDOTA_BaseNPC:GetTotalPurchasedUpgradeGoldCost( )`
#### Function Description
Get how much gold has been spent on ability upgrades.
---
### `string CDOTA_BaseNPC:GetUnitLabel( )`
#### Function Description

---
### `string CDOTA_BaseNPC:GetUnitName( )`
#### Function Description
Get the name of this unit.
---
### `void CDOTA_BaseNPC:GiveMana(flMana )`
#### Function Description
Give mana to this unit, this can be used for mana gained by abilities or item usage.
#### Parameters
Type|Name|Description
--|--|--
float|flMana|No Description Set
---
### `bool CDOTA_BaseNPC:HasAbility(pszAbilityName )`
#### Function Description
See whether this unit has an ability by name.
#### Parameters
Type|Name|Description
--|--|--
string|pszAbilityName|No Description Set
---
### `bool CDOTA_BaseNPC:HasAnyActiveAbilities( )`
#### Function Description

---
### `bool CDOTA_BaseNPC:HasAttackCapability( )`
#### Function Description

---
### `bool CDOTA_BaseNPC:HasFlyMovementCapability( )`
#### Function Description

---
### `bool CDOTA_BaseNPC:HasFlyingVision( )`
#### Function Description

---
### `bool CDOTA_BaseNPC:HasGroundMovementCapability( )`
#### Function Description

---
### `bool CDOTA_BaseNPC:HasInventory( )`
#### Function Description
Does this unit have an inventory.
---
### `bool CDOTA_BaseNPC:HasItemInInventory(pItemName )`
#### Function Description
See whether this unit has an item by name.
#### Parameters
Type|Name|Description
--|--|--
string|pItemName|No Description Set
---
### `bool CDOTA_BaseNPC:HasModifier(pszScriptName )`
#### Function Description
Sees if this unit has a given modifier.
#### Parameters
Type|Name|Description
--|--|--
string|pszScriptName|No Description Set
---
### `bool CDOTA_BaseNPC:HasMovementCapability( )`
#### Function Description

---
### `bool CDOTA_BaseNPC:HasScepter( )`
#### Function Description

---
### `void CDOTA_BaseNPC:Heal(flAmount, hInflictor )`
#### Function Description
Heal this unit.
#### Parameters
Type|Name|Description
--|--|--
float|flAmount|No Description Set
handle|hInflictor|No Description Set
---
### `void CDOTA_BaseNPC:Hold( )`
#### Function Description
Hold position.
---
### `void CDOTA_BaseNPC:Interrupt( )`
#### Function Description

---
### `void CDOTA_BaseNPC:InterruptChannel( )`
#### Function Description

---
### `void CDOTA_BaseNPC:InterruptMotionControllers(bFindClearSpace )`
#### Function Description

#### Parameters
Type|Name|Description
--|--|--
bool|bFindClearSpace|No Description Set
---
### `bool CDOTA_BaseNPC:IsAlive( )`
#### Function Description
Is this unit alive?
---
### `bool CDOTA_BaseNPC:IsAncient( )`
#### Function Description
Is this unit an Ancient?
---
### `bool CDOTA_BaseNPC:IsAttackImmune( )`
#### Function Description

---
### `bool CDOTA_BaseNPC:IsAttacking( )`
#### Function Description

---
### `bool CDOTA_BaseNPC:IsAttackingEntity(hEntity )`
#### Function Description

#### Parameters
Type|Name|Description
--|--|--
handle|hEntity|No Description Set
---
### `bool CDOTA_BaseNPC:IsBarracks( )`
#### Function Description
Is this unit a Barracks?
---
### `bool CDOTA_BaseNPC:IsBlind( )`
#### Function Description

---
### `bool CDOTA_BaseNPC:IsBlockDisabled( )`
#### Function Description

---
### `bool CDOTA_BaseNPC:IsBoss( )`
#### Function Description
Is this unit a boss?
---
### `bool CDOTA_BaseNPC:IsBuilding( )`
#### Function Description
Is this unit a building?
---
### `bool CDOTA_BaseNPC:IsChanneling( )`
#### Function Description
Is this unit currently channeling a spell?
---
### `bool CDOTA_BaseNPC:IsClone( )`
#### Function Description
Is this unit a clone? (Meepo)
---
### `bool CDOTA_BaseNPC:IsCommandRestricted( )`
#### Function Description

---
### `bool CDOTA_BaseNPC:IsConsideredHero( )`
#### Function Description
Is this unit a considered a hero for targeting purposes?
---
### `bool CDOTA_BaseNPC:IsControllableByAnyPlayer( )`
#### Function Description
Is this unit controlled by any non-bot player?
---
### `bool CDOTA_BaseNPC:IsCourier( )`
#### Function Description
Is this unit a courier?
---
### `bool CDOTA_BaseNPC:IsCreature( )`
#### Function Description
Is this a Creature type NPC?
---
### `bool CDOTA_BaseNPC:IsCreep( )`
#### Function Description
Is this unit a creep?
---
### `bool CDOTA_BaseNPC:IsDeniable( )`
#### Function Description

---
### `bool CDOTA_BaseNPC:IsDisarmed( )`
#### Function Description

---
### `bool CDOTA_BaseNPC:IsDominated( )`
#### Function Description

---
### `bool CDOTA_BaseNPC:IsEvadeDisabled( )`
#### Function Description

---
### `bool CDOTA_BaseNPC:IsFort( )`
#### Function Description
Is this unit an Ancient?
---
### `bool CDOTA_BaseNPC:IsFrozen( )`
#### Function Description

---
### `bool CDOTA_BaseNPC:IsHero( )`
#### Function Description
Is this a hero or hero illusion?
---
### `bool CDOTA_BaseNPC:IsHexed( )`
#### Function Description

---
### `bool CDOTA_BaseNPC:IsIdle( )`
#### Function Description
Is this creature currently idle?
---
### `bool CDOTA_BaseNPC:IsIllusion( )`
#### Function Description

---
### `bool CDOTA_BaseNPC:IsInRangeOfShop(nShopType, bPhysical )`
#### Function Description
Ask whether this unit is in range of the specified shop ( DOTA_SHOP_TYPE shop, bool bMustBePhysicallyNear
#### Parameters
Type|Name|Description
--|--|--
int|nShopType|No Description Set
bool|bPhysical|No Description Set
---
### `bool CDOTA_BaseNPC:IsInvisible( )`
#### Function Description

---
### `bool CDOTA_BaseNPC:IsInvulnerable( )`
#### Function Description

---
### `bool CDOTA_BaseNPC:IsLowAttackPriority( )`
#### Function Description

---
### `bool CDOTA_BaseNPC:IsMagicImmune( )`
#### Function Description

---
### `bool CDOTA_BaseNPC:IsMovementImpaired( )`
#### Function Description

---
### `bool CDOTA_BaseNPC:IsMoving( )`
#### Function Description
Is this unit moving?
---
### `bool CDOTA_BaseNPC:IsMuted( )`
#### Function Description

---
### `bool CDOTA_BaseNPC:IsNeutralUnitType( )`
#### Function Description
Is this a neutral?
---
### `bool CDOTA_BaseNPC:IsNightmared( )`
#### Function Description

---
### `bool CDOTA_BaseNPC:IsOpposingTeam(nTeam )`
#### Function Description

#### Parameters
Type|Name|Description
--|--|--
int|nTeam|No Description Set
---
### `bool CDOTA_BaseNPC:IsOther( )`
#### Function Description
Is this unit a ward-type unit?
---
### `bool CDOTA_BaseNPC:IsOutOfGame( )`
#### Function Description

---
### `bool CDOTA_BaseNPC:IsOwnedByAnyPlayer( )`
#### Function Description
Is this unit owned by any non-bot player?
---
### `bool CDOTA_BaseNPC:IsPhantom( )`
#### Function Description
Is this a phantom unit?
---
### `bool CDOTA_BaseNPC:IsPhantomBlocker( )`
#### Function Description

---
### `bool CDOTA_BaseNPC:IsPhased( )`
#### Function Description

---
### `bool CDOTA_BaseNPC:IsPositionInRange(vPosition, flRange )`
#### Function Description

#### Parameters
Type|Name|Description
--|--|--
Vector|vPosition|No Description Set
float|flRange|No Description Set
---
### `bool CDOTA_BaseNPC:IsRangedAttacker( )`
#### Function Description
Is this unit a ranged attacker?
---
### `bool CDOTA_BaseNPC:IsRealHero( )`
#### Function Description
Is this a real hero?
---
### `bool CDOTA_BaseNPC:IsRooted( )`
#### Function Description

---
### `bool CDOTA_BaseNPC:IsShrine( )`
#### Function Description
Is this a shrine?
---
### `bool CDOTA_BaseNPC:IsSilenced( )`
#### Function Description

---
### `bool CDOTA_BaseNPC:IsSpeciallyDeniable( )`
#### Function Description

---
### `bool CDOTA_BaseNPC:IsStunned( )`
#### Function Description

---
### `bool CDOTA_BaseNPC:IsSummoned( )`
#### Function Description
Is this unit summoned?
---
### `bool CDOTA_BaseNPC:IsTempestDouble( )`
#### Function Description

---
### `bool CDOTA_BaseNPC:IsTower( )`
#### Function Description
Is this a tower?
---
### `bool CDOTA_BaseNPC:IsUnableToMiss( )`
#### Function Description

---
### `bool CDOTA_BaseNPC:IsUnselectable( )`
#### Function Description

---
### `bool CDOTA_BaseNPC:IsUntargetable( )`
#### Function Description

---
### `void CDOTA_BaseNPC:Kill(hAbility, hAttacker )`
#### Function Description
Kills this NPC, with the params Ability and Attacker.
#### Parameters
Type|Name|Description
--|--|--
handle|hAbility|No Description Set
handle|hAttacker|No Description Set
---
### `void CDOTA_BaseNPC:MakeIllusion( )`
#### Function Description

---
### `void CDOTA_BaseNPC:MakePhantomBlocker( )`
#### Function Description

---
### `void CDOTA_BaseNPC:MakeVisibleDueToAttack(iTeam, flRadius )`
#### Function Description

#### Parameters
Type|Name|Description
--|--|--
int|iTeam|No Description Set
float|flRadius|No Description Set
---
### `void CDOTA_BaseNPC:MakeVisibleToTeam(iTeam, flDuration )`
#### Function Description

#### Parameters
Type|Name|Description
--|--|--
int|iTeam|No Description Set
float|flDuration|No Description Set
---
### `void CDOTA_BaseNPC:ManageModelChanges( )`
#### Function Description

---
### `void CDOTA_BaseNPC:ModifyHealth(iDesiredHealthValue, hAbility, bLethal, iAdditionalFlags )`
#### Function Description
Sets the health to a specific value, with optional flags or inflictors.
#### Parameters
Type|Name|Description
--|--|--
int|iDesiredHealthValue|No Description Set
handle|hAbility|No Description Set
bool|bLethal|No Description Set
int|iAdditionalFlags|No Description Set
---
### `void CDOTA_BaseNPC:MoveToNPC(hNPC )`
#### Function Description
Move to follow a unit.
#### Parameters
Type|Name|Description
--|--|--
handle|hNPC|No Description Set
---
### `void CDOTA_BaseNPC:MoveToNPCToGiveItem(hNPC, hItem )`
#### Function Description
Give an item to another unit.
#### Parameters
Type|Name|Description
--|--|--
handle|hNPC|No Description Set
handle|hItem|No Description Set
---
### `void CDOTA_BaseNPC:MoveToPosition(vDest )`
#### Function Description
Issue a Move-To command.
#### Parameters
Type|Name|Description
--|--|--
Vector|vDest|No Description Set
---
### `void CDOTA_BaseNPC:MoveToPositionAggressive(vDest )`
#### Function Description
Issue an Attack-Move-To command.
#### Parameters
Type|Name|Description
--|--|--
Vector|vDest|No Description Set
---
### `void CDOTA_BaseNPC:MoveToTargetToAttack(hTarget )`
#### Function Description
Move to a target to attack.
#### Parameters
Type|Name|Description
--|--|--
handle|hTarget|No Description Set
---
### `bool CDOTA_BaseNPC:NoHealthBar( )`
#### Function Description

---
### `bool CDOTA_BaseNPC:NoTeamMoveTo( )`
#### Function Description

---
### `bool CDOTA_BaseNPC:NoTeamSelect( )`
#### Function Description

---
### `bool CDOTA_BaseNPC:NoUnitCollision( )`
#### Function Description

---
### `bool CDOTA_BaseNPC:NotOnMinimap( )`
#### Function Description

---
### `bool CDOTA_BaseNPC:NotOnMinimapForEnemies( )`
#### Function Description

---
### `void CDOTA_BaseNPC:NotifyWearablesOfModelChange(bOriginalModel )`
#### Function Description

#### Parameters
Type|Name|Description
--|--|--
bool|bOriginalModel|No Description Set
---
### `bool CDOTA_BaseNPC:PassivesDisabled( )`
#### Function Description

---
### `void CDOTA_BaseNPC:PatrolToPosition(vDest )`
#### Function Description
Issue a Patrol-To command.
#### Parameters
Type|Name|Description
--|--|--
Vector|vDest|No Description Set
---
### `void CDOTA_BaseNPC:PerformAttack(hTarget, bUseCastAttackOrb, bProcessProcs, bSkipCooldown, bIgnoreInvis, bUseProjectile, bFakeAttack, bNeverMiss )`
#### Function Description
Performs an attack on a target.
#### Parameters
Type|Name|Description
--|--|--
handle|hTarget|No Description Set
bool|bUseCastAttackOrb|No Description Set
bool|bProcessProcs|No Description Set
bool|bSkipCooldown|No Description Set
bool|bIgnoreInvis|No Description Set
bool|bUseProjectile|No Description Set
bool|bFakeAttack|No Description Set
bool|bNeverMiss|No Description Set
---
### `void CDOTA_BaseNPC:PickupDroppedItem(hItem )`
#### Function Description
Pick up a dropped item.
#### Parameters
Type|Name|Description
--|--|--
handle|hItem|No Description Set
---
### `void CDOTA_BaseNPC:PickupRune(hItem )`
#### Function Description
Pick up a rune.
#### Parameters
Type|Name|Description
--|--|--
handle|hItem|No Description Set
---
### `void CDOTA_BaseNPC:PlayVCD(pVCD )`
#### Function Description
Play a VCD on the NPC.
#### Parameters
Type|Name|Description
--|--|--
string|pVCD|No Description Set
---
### `bool CDOTA_BaseNPC:ProvidesVision( )`
#### Function Description

---
### `void CDOTA_BaseNPC:Purge(bRemovePositiveBuffs, bRemoveDebuffs, bFrameOnly, bRemoveStuns, bRemoveExceptions )`
#### Function Description
(bool RemovePositiveBuffs, bool RemoveDebuffs, bool BuffsCreatedThisFrameOnly, bool RemoveStuns, bool RemoveExceptions
#### Parameters
Type|Name|Description
--|--|--
bool|bRemovePositiveBuffs|No Description Set
bool|bRemoveDebuffs|No Description Set
bool|bFrameOnly|No Description Set
bool|bRemoveStuns|No Description Set
bool|bRemoveExceptions|No Description Set
---
### `void CDOTA_BaseNPC:ReduceMana(flAmount )`
#### Function Description
Remove mana from this unit, this can be used for involuntary mana loss, not for mana that is spent.
#### Parameters
Type|Name|Description
--|--|--
float|flAmount|No Description Set
---
### `void CDOTA_BaseNPC:RemoveAbility(pszAbilityName )`
#### Function Description
Remove an ability from this unit by name.
#### Parameters
Type|Name|Description
--|--|--
string|pszAbilityName|No Description Set
---
### `void CDOTA_BaseNPC:RemoveAbilityByHandle(hAbility )`
#### Function Description
Remove the passed ability from this unit.
#### Parameters
Type|Name|Description
--|--|--
handle|hAbility|No Description Set
---
### `void CDOTA_BaseNPC:RemoveGesture(nActivity )`
#### Function Description
Remove the given gesture activity.
#### Parameters
Type|Name|Description
--|--|--
int|nActivity|No Description Set
---
### `void CDOTA_BaseNPC:RemoveHorizontalMotionController(hBuff )`
#### Function Description

#### Parameters
Type|Name|Description
--|--|--
handle|hBuff|No Description Set
---
### `void CDOTA_BaseNPC:RemoveItem(hItem )`
#### Function Description
Removes the passed item from this unit's inventory and deletes it.
#### Parameters
Type|Name|Description
--|--|--
handle|hItem|No Description Set
---
### `void CDOTA_BaseNPC:RemoveModifierByName(pszScriptName )`
#### Function Description
Removes a modifier.
#### Parameters
Type|Name|Description
--|--|--
string|pszScriptName|No Description Set
---
### `void CDOTA_BaseNPC:RemoveModifierByNameAndCaster(pszScriptName, hCaster )`
#### Function Description
Removes a modifier that was cast by the given caster.
#### Parameters
Type|Name|Description
--|--|--
string|pszScriptName|No Description Set
handle|hCaster|No Description Set
---
### `void CDOTA_BaseNPC:RemoveNoDraw( )`
#### Function Description
Remove the no draw flag.
---
### `void CDOTA_BaseNPC:RemoveVerticalMotionController(hBuff )`
#### Function Description

#### Parameters
Type|Name|Description
--|--|--
handle|hBuff|No Description Set
---
### `void CDOTA_BaseNPC:RespawnUnit( )`
#### Function Description
Respawns the target unit if it can be respawned.
---
### `float CDOTA_BaseNPC:Script_GetAttackRange( )`
#### Function Description
Gets this unit's attack range after all modifiers.
---
### `void CDOTA_BaseNPC:SellItem(hItem )`
#### Function Description
Sells the passed item in this unit's inventory.
#### Parameters
Type|Name|Description
--|--|--
handle|hItem|No Description Set
---
### `void CDOTA_BaseNPC:SetAbilityByIndex(hAbility, iIndex )`
#### Function Description
Set the ability by index.
#### Parameters
Type|Name|Description
--|--|--
handle|hAbility|No Description Set
int|iIndex|No Description Set
---
### `void CDOTA_BaseNPC:SetAcquisitionRange(nRange )`
#### Function Description

#### Parameters
Type|Name|Description
--|--|--
int|nRange|No Description Set
---
### `void CDOTA_BaseNPC:SetAdditionalBattleMusicWeight(flWeight )`
#### Function Description
Combat involving this creature will have this weight added to the music calcuations.
#### Parameters
Type|Name|Description
--|--|--
float|flWeight|No Description Set
---
### `void CDOTA_BaseNPC:SetAggroTarget(hAggroTarget )`
#### Function Description
Set this unit's aggro target to a specified unit.
#### Parameters
Type|Name|Description
--|--|--
handle|hAggroTarget|No Description Set
---
### `void CDOTA_BaseNPC:SetAttackCapability(iAttackCapabilities )`
#### Function Description

#### Parameters
Type|Name|Description
--|--|--
int|iAttackCapabilities|No Description Set
---
### `void CDOTA_BaseNPC:SetAttacking(hAttackTarget )`
#### Function Description

#### Parameters
Type|Name|Description
--|--|--
handle|hAttackTarget|No Description Set
---
### `void CDOTA_BaseNPC:SetBaseAttackTime(flBaseAttackTime )`
#### Function Description

#### Parameters
Type|Name|Description
--|--|--
float|flBaseAttackTime|No Description Set
---
### `void CDOTA_BaseNPC:SetBaseDamageMax(nMax )`
#### Function Description
Sets the maximum base damage.
#### Parameters
Type|Name|Description
--|--|--
int|nMax|No Description Set
---
### `void CDOTA_BaseNPC:SetBaseDamageMin(nMin )`
#### Function Description
Sets the minimum base damage.
#### Parameters
Type|Name|Description
--|--|--
int|nMin|No Description Set
---
### `void CDOTA_BaseNPC:SetBaseHealthRegen(flHealthRegen )`
#### Function Description

#### Parameters
Type|Name|Description
--|--|--
float|flHealthRegen|No Description Set
---
### `void CDOTA_BaseNPC:SetBaseMagicalResistanceValue(flMagicalResistanceValue )`
#### Function Description
Sets base magical armor value.
#### Parameters
Type|Name|Description
--|--|--
float|flMagicalResistanceValue|No Description Set
---
### `void CDOTA_BaseNPC:SetBaseManaRegen(flManaRegen )`
#### Function Description

#### Parameters
Type|Name|Description
--|--|--
float|flManaRegen|No Description Set
---
### `void CDOTA_BaseNPC:SetBaseMaxHealth(flBaseMaxHealth )`
#### Function Description
Set a new base max health value.
#### Parameters
Type|Name|Description
--|--|--
float|flBaseMaxHealth|No Description Set
---
### `void CDOTA_BaseNPC:SetBaseMoveSpeed(iMoveSpeed )`
#### Function Description

#### Parameters
Type|Name|Description
--|--|--
int|iMoveSpeed|No Description Set
---
### `void CDOTA_BaseNPC:SetCanSellItems(bCanSell )`
#### Function Description
Set whether or not this unit is allowed to sell items (bCanSellItems)
#### Parameters
Type|Name|Description
--|--|--
bool|bCanSell|No Description Set
---
### `void CDOTA_BaseNPC:SetControllableByPlayer(iIndex, bSkipAdjustingPosition )`
#### Function Description
Set this unit controllable by the player with the passed ID.
#### Parameters
Type|Name|Description
--|--|--
int|iIndex|No Description Set
bool|bSkipAdjustingPosition|No Description Set
---
### `void CDOTA_BaseNPC:SetCursorCastTarget(hEntity )`
#### Function Description

#### Parameters
Type|Name|Description
--|--|--
handle|hEntity|No Description Set
---
### `void CDOTA_BaseNPC:SetCursorPosition(vLocation )`
#### Function Description

#### Parameters
Type|Name|Description
--|--|--
Vector|vLocation|No Description Set
---
### `void CDOTA_BaseNPC:SetCursorTargetingNothing(bTargetingNothing )`
#### Function Description

#### Parameters
Type|Name|Description
--|--|--
bool|bTargetingNothing|No Description Set
---
### `void CDOTA_BaseNPC:SetCustomHealthLabel(pLabel, r, g, b )`
#### Function Description

#### Parameters
Type|Name|Description
--|--|--
string|pLabel|No Description Set
int|r|No Description Set
int|g|No Description Set
int|b|No Description Set
---
### `void CDOTA_BaseNPC:SetDayTimeVisionRange(iRange )`
#### Function Description
Set the base vision range.
#### Parameters
Type|Name|Description
--|--|--
int|iRange|No Description Set
---
### `void CDOTA_BaseNPC:SetDeathXP(iXPBounty )`
#### Function Description
Set the XP bounty on this unit.
#### Parameters
Type|Name|Description
--|--|--
int|iXPBounty|No Description Set
---
### `void CDOTA_BaseNPC:SetForceAttackTarget(hNPC )`
#### Function Description

#### Parameters
Type|Name|Description
--|--|--
handle|hNPC|No Description Set
---
### `void CDOTA_BaseNPC:SetForceAttackTargetAlly(hNPC )`
#### Function Description

#### Parameters
Type|Name|Description
--|--|--
handle|hNPC|No Description Set
---
### `void CDOTA_BaseNPC:SetHasInventory(bHasInventory )`
#### Function Description
Set if this unit has an inventory.
#### Parameters
Type|Name|Description
--|--|--
bool|bHasInventory|No Description Set
---
### `void CDOTA_BaseNPC:SetHullRadius(flHullRadius )`
#### Function Description
Set the collision hull radius of this NPC.
#### Parameters
Type|Name|Description
--|--|--
float|flHullRadius|No Description Set
---
### `void CDOTA_BaseNPC:SetIdleAcquire(bIdleAcquire )`
#### Function Description

#### Parameters
Type|Name|Description
--|--|--
bool|bIdleAcquire|No Description Set
---
### `void CDOTA_BaseNPC:SetInitialGoalEntity(hGoal )`
#### Function Description
Sets the initial waypoint goal for this NPC.
#### Parameters
Type|Name|Description
--|--|--
handle|hGoal|No Description Set
---
### `void CDOTA_BaseNPC:SetInitialGoalPosition(vPosition )`
#### Function Description
Set waypoint position for this NPC.
#### Parameters
Type|Name|Description
--|--|--
Vector|vPosition|No Description Set
---
### `void CDOTA_BaseNPC:SetMana(flMana )`
#### Function Description
Set the mana on this unit.
#### Parameters
Type|Name|Description
--|--|--
float|flMana|No Description Set
---
### `void CDOTA_BaseNPC:SetMaxMana(flMaxMana )`
#### Function Description
Set the maximum mana of this unit.
#### Parameters
Type|Name|Description
--|--|--
float|flMaxMana|No Description Set
---
### `void CDOTA_BaseNPC:SetMaximumGoldBounty(iGoldBountyMax )`
#### Function Description
Set the maximum gold bounty for this unit.
#### Parameters
Type|Name|Description
--|--|--
int|iGoldBountyMax|No Description Set
---
### `void CDOTA_BaseNPC:SetMinimumGoldBounty(iGoldBountyMin )`
#### Function Description
Set the minimum gold bounty for this unit.
#### Parameters
Type|Name|Description
--|--|--
int|iGoldBountyMin|No Description Set
---
### `void CDOTA_BaseNPC:SetModifierStackCount(pszScriptName, hCaster, nStackCount )`
#### Function Description
Sets the stack count of a given modifier.
#### Parameters
Type|Name|Description
--|--|--
string|pszScriptName|No Description Set
handle|hCaster|No Description Set
int|nStackCount|No Description Set
---
### `void CDOTA_BaseNPC:SetMoveCapability(iMoveCapabilities )`
#### Function Description

#### Parameters
Type|Name|Description
--|--|--
int|iMoveCapabilities|No Description Set
---
### `void CDOTA_BaseNPC:SetMustReachEachGoalEntity(must )`
#### Function Description
Set whether this NPC is required to reach each goal entity, rather than being allowed to unkink their path.
#### Parameters
Type|Name|Description
--|--|--
bool|must|No Description Set
---
### `void CDOTA_BaseNPC:SetNeverMoveToClearSpace(neverMoveToClearSpace )`
#### Function Description
If set to true, we will never attempt to move this unit to clear space, even when it unphases.
#### Parameters
Type|Name|Description
--|--|--
bool|neverMoveToClearSpace|No Description Set
---
### `void CDOTA_BaseNPC:SetNightTimeVisionRange(iRange )`
#### Function Description
Returns the vision range after modifiers.
#### Parameters
Type|Name|Description
--|--|--
int|iRange|No Description Set
---
### `void CDOTA_BaseNPC:SetOrigin(vLocation )`
#### Function Description
Set the unit's origin.
#### Parameters
Type|Name|Description
--|--|--
Vector|vLocation|No Description Set
---
### `void CDOTA_BaseNPC:SetOriginalModel(pszModelName )`
#### Function Description
Sets the original model of this entity, which it will tend to fall back to anytime its state changes.
#### Parameters
Type|Name|Description
--|--|--
string|pszModelName|No Description Set
---
### `void CDOTA_BaseNPC:SetPhysicalArmorBaseValue(flPhysicalArmorValue )`
#### Function Description
Sets base physical armor value.
#### Parameters
Type|Name|Description
--|--|--
float|flPhysicalArmorValue|No Description Set
---
### `void CDOTA_BaseNPC:SetRangedProjectileName(pProjectileName )`
#### Function Description

#### Parameters
Type|Name|Description
--|--|--
string|pProjectileName|No Description Set
---
### `void CDOTA_BaseNPC:SetRevealRadius(revealRadius )`
#### Function Description
sets the client side map reveal radius for this unit
#### Parameters
Type|Name|Description
--|--|--
float|revealRadius|No Description Set
---
### `void CDOTA_BaseNPC:SetShouldDoFlyHeightVisual(bShouldVisuallyFly )`
#### Function Description

#### Parameters
Type|Name|Description
--|--|--
bool|bShouldVisuallyFly|No Description Set
---
### `void CDOTA_BaseNPC:SetStolenScepter(bStolenScepter )`
#### Function Description

#### Parameters
Type|Name|Description
--|--|--
bool|bStolenScepter|No Description Set
---
### `void CDOTA_BaseNPC:SetUnitCanRespawn(bCanRespawn )`
#### Function Description

#### Parameters
Type|Name|Description
--|--|--
bool|bCanRespawn|No Description Set
---
### `void CDOTA_BaseNPC:SetUnitName(pName )`
#### Function Description

#### Parameters
Type|Name|Description
--|--|--
string|pName|No Description Set
---
### `bool CDOTA_BaseNPC:ShouldIdleAcquire( )`
#### Function Description

---
### `void CDOTA_BaseNPC:SpendMana(flManaSpent, hAbility )`
#### Function Description
Spend mana from this unit, this can be used for spending mana from abilities or item usage.
#### Parameters
Type|Name|Description
--|--|--
float|flManaSpent|No Description Set
handle|hAbility|No Description Set
---
### `void CDOTA_BaseNPC:StartGesture(nActivity )`
#### Function Description
Add the given gesture activity.
#### Parameters
Type|Name|Description
--|--|--
int|nActivity|No Description Set
---
### `void CDOTA_BaseNPC:StartGestureWithPlaybackRate(nActivity, flRate )`
#### Function Description
Add the given gesture activity with a playback rate override.
#### Parameters
Type|Name|Description
--|--|--
int|nActivity|No Description Set
float|flRate|No Description Set
---
### `void CDOTA_BaseNPC:Stop( )`
#### Function Description
Stop the current order.
---
### `void CDOTA_BaseNPC:StopFacing( )`
#### Function Description

---
### `void CDOTA_BaseNPC:SwapAbilities(pAbilityName1, pAbilityName2, bEnable1, bEnable2 )`
#### Function Description
Swaps the slots of the two passed abilities and sets them enabled/disabled.
#### Parameters
Type|Name|Description
--|--|--
string|pAbilityName1|No Description Set
string|pAbilityName2|No Description Set
bool|bEnable1|No Description Set
bool|bEnable2|No Description Set
---
### `void CDOTA_BaseNPC:SwapItems(nSlot1, nSlot2 )`
#### Function Description
Swap the contents of two item slots (slot1, slot2)
#### Parameters
Type|Name|Description
--|--|--
int|nSlot1|No Description Set
int|nSlot2|No Description Set
---
### `handle CDOTA_BaseNPC:TakeItem(hItem )`
#### Function Description
Removed the passed item from this unit's inventory.
#### Parameters
Type|Name|Description
--|--|--
handle|hItem|No Description Set
---
### `float CDOTA_BaseNPC:TimeUntilNextAttack( )`
#### Function Description

---
### `bool CDOTA_BaseNPC:TriggerModifierDodge( )`
#### Function Description

---
### `bool CDOTA_BaseNPC:TriggerSpellAbsorb(hAbility )`
#### Function Description

#### Parameters
Type|Name|Description
--|--|--
handle|hAbility|No Description Set
---
### `void CDOTA_BaseNPC:TriggerSpellReflect(hAbility )`
#### Function Description
Trigger the Lotus Orb-like effect.(hAbility)
#### Parameters
Type|Name|Description
--|--|--
handle|hAbility|No Description Set
---
### `void CDOTA_BaseNPC:UnHideAbilityToSlot(pszAbilityName, pszReplacedAbilityName )`
#### Function Description
Makes the first ability unhidden, and puts it where second ability currently is. Will do nothing if the first ability is already unhidden and in a valid slot.
#### Parameters
Type|Name|Description
--|--|--
string|pszAbilityName|No Description Set
string|pszReplacedAbilityName|No Description Set
---
### `bool CDOTA_BaseNPC:UnitCanRespawn( )`
#### Function Description

---
## **CDOTA_BaseNPC_Building**
---
### `int CDOTA_BaseNPC_Building:GetInvulnCount( )`
#### Function Description
Get the invulnerability count for a building.
---
### `void CDOTA_BaseNPC_Building:SetInvulnCount(nInvulnCount )`
#### Function Description
Set the invulnerability counter of this building.
#### Parameters
Type|Name|Description
--|--|--
int|nInvulnCount|No Description Set
---
## **CDOTA_BaseNPC_Creature**
---
### `void CDOTA_BaseNPC_Creature:AddItemDrop(hDropData )`
#### Function Description
Add the specified item drop to this creature.
#### Parameters
Type|Name|Description
--|--|--
handle|hDropData|No Description Set
---
### `void CDOTA_BaseNPC_Creature:CreatureLevelUp(iLevels )`
#### Function Description
Level the creature up by the specified number of levels
#### Parameters
Type|Name|Description
--|--|--
int|iLevels|No Description Set
---
### `bool CDOTA_BaseNPC_Creature:IsChampion( )`
#### Function Description
Is this unit a champion?
---
### `void CDOTA_BaseNPC_Creature:RemoveAllItemDrops( )`
#### Function Description
Remove all item drops from this creature.
---
### `void CDOTA_BaseNPC_Creature:SetArmorGain(flArmorGain )`
#### Function Description
Set the armor gained per level on this creature.
#### Parameters
Type|Name|Description
--|--|--
float|flArmorGain|No Description Set
---
### `void CDOTA_BaseNPC_Creature:SetAttackTimeGain(flAttackTimeGain )`
#### Function Description
Set the attack time gained per level on this creature.
#### Parameters
Type|Name|Description
--|--|--
float|flAttackTimeGain|No Description Set
---
### `void CDOTA_BaseNPC_Creature:SetBountyGain(nBountyGain )`
#### Function Description
Set the bounty gold gained per level on this creature.
#### Parameters
Type|Name|Description
--|--|--
int|nBountyGain|No Description Set
---
### `void CDOTA_BaseNPC_Creature:SetChampion(bIsChampion )`
#### Function Description
Flag this unit as a champion creature.
#### Parameters
Type|Name|Description
--|--|--
bool|bIsChampion|No Description Set
---
### `void CDOTA_BaseNPC_Creature:SetDamageGain(nDamageGain )`
#### Function Description
Set the damage gained per level on this creature.
#### Parameters
Type|Name|Description
--|--|--
int|nDamageGain|No Description Set
---
### `void CDOTA_BaseNPC_Creature:SetDisableResistanceGain(flDisableResistanceGain )`
#### Function Description
Set the disable resistance gained per level on this creature.
#### Parameters
Type|Name|Description
--|--|--
float|flDisableResistanceGain|No Description Set
---
### `void CDOTA_BaseNPC_Creature:SetHPGain(nHPGain )`
#### Function Description
Set the hit points gained per level on this creature.
#### Parameters
Type|Name|Description
--|--|--
int|nHPGain|No Description Set
---
### `void CDOTA_BaseNPC_Creature:SetHPRegenGain(flHPRegenGain )`
#### Function Description
Set the hit points regen gained per level on this creature.
#### Parameters
Type|Name|Description
--|--|--
float|flHPRegenGain|No Description Set
---
### `void CDOTA_BaseNPC_Creature:SetMagicResistanceGain(flMagicResistanceGain )`
#### Function Description
Set the magic resistance gained per level on this creature.
#### Parameters
Type|Name|Description
--|--|--
float|flMagicResistanceGain|No Description Set
---
### `void CDOTA_BaseNPC_Creature:SetManaGain(nManaGain )`
#### Function Description
Set the mana points gained per level on this creature.
#### Parameters
Type|Name|Description
--|--|--
int|nManaGain|No Description Set
---
### `void CDOTA_BaseNPC_Creature:SetManaRegenGain(flManaRegenGain )`
#### Function Description
Set the mana points regen gained per level on this creature.
#### Parameters
Type|Name|Description
--|--|--
float|flManaRegenGain|No Description Set
---
### `void CDOTA_BaseNPC_Creature:SetMoveSpeedGain(nMoveSpeedGain )`
#### Function Description
Set the move speed gained per level on this creature.
#### Parameters
Type|Name|Description
--|--|--
int|nMoveSpeedGain|No Description Set
---
### `void CDOTA_BaseNPC_Creature:SetRequiresReachingEndPath(bRequiresReachingEndPath )`
#### Function Description
Set whether creatures require reaching their end path before becoming idle
#### Parameters
Type|Name|Description
--|--|--
bool|bRequiresReachingEndPath|No Description Set
---
### `void CDOTA_BaseNPC_Creature:SetXPGain(nXPGain )`
#### Function Description
Set the XP gained per level on this creature.
#### Parameters
Type|Name|Description
--|--|--
int|nXPGain|No Description Set
---
## **CDOTA_BaseNPC_Hero**
---
### `bool CDOTA_BaseNPC_Hero:AddExperience(flXP, nReason, bApplyBotDifficultyScaling, bIncrementTotal )`
#### Function Description
Params: Float XP, Bool applyBotDifficultyScaling
#### Parameters
Type|Name|Description
--|--|--
float|flXP|No Description Set
int|nReason|No Description Set
bool|bApplyBotDifficultyScaling|No Description Set
bool|bIncrementTotal|No Description Set
---
### `void CDOTA_BaseNPC_Hero:Buyback( )`
#### Function Description
Spend the gold and buyback with this hero.
---
### `void CDOTA_BaseNPC_Hero:CalculateStatBonus( )`
#### Function Description
Recalculate all stats after the hero gains stats.
---
### `bool CDOTA_BaseNPC_Hero:CanEarnGold( )`
#### Function Description
Returns boolean value result of buyback gold limit time less than game time.
---
### `void CDOTA_BaseNPC_Hero:ClearLastHitMultikill( )`
#### Function Description
Value is stored in PlayerResource.
---
### `void CDOTA_BaseNPC_Hero:ClearLastHitStreak( )`
#### Function Description
Value is stored in PlayerResource.
---
### `void CDOTA_BaseNPC_Hero:ClearStreak( )`
#### Function Description
Value is stored in PlayerResource.
---
### `int CDOTA_BaseNPC_Hero:GetAbilityPoints( )`
#### Function Description
Gets the current unspent ability points.
---
### `table CDOTA_BaseNPC_Hero:GetAdditionalOwnedUnits( )`
#### Function Description

---
### `float CDOTA_BaseNPC_Hero:GetAgility( )`
#### Function Description

---
### `float CDOTA_BaseNPC_Hero:GetAgilityGain( )`
#### Function Description

---
### `int CDOTA_BaseNPC_Hero:GetAssists( )`
#### Function Description
Value is stored in PlayerResource.
---
### `int CDOTA_BaseNPC_Hero:GetAttacker(nIndex )`
#### Function Description

#### Parameters
Type|Name|Description
--|--|--
int|nIndex|No Description Set
---
### `float CDOTA_BaseNPC_Hero:GetBaseAgility( )`
#### Function Description

---
### `int CDOTA_BaseNPC_Hero:GetBaseDamageMax( )`
#### Function Description
Hero damage is also affected by attributes.
---
### `int CDOTA_BaseNPC_Hero:GetBaseDamageMin( )`
#### Function Description
Hero damage is also affected by attributes.
---
### `float CDOTA_BaseNPC_Hero:GetBaseIntellect( )`
#### Function Description

---
### `float CDOTA_BaseNPC_Hero:GetBaseManaRegen( )`
#### Function Description
Returns the base mana regen.
---
### `float CDOTA_BaseNPC_Hero:GetBaseStrength( )`
#### Function Description

---
### `int CDOTA_BaseNPC_Hero:GetBonusDamageFromPrimaryStat( )`
#### Function Description

---
### `float CDOTA_BaseNPC_Hero:GetBuybackCooldownTime( )`
#### Function Description
Return float value for the amount of time left on cooldown for this hero's buyback.
---
### `int CDOTA_BaseNPC_Hero:GetBuybackCost(bReturnOldValues )`
#### Function Description
Return integer value for the gold cost of a buyback.
#### Parameters
Type|Name|Description
--|--|--
bool|bReturnOldValues|No Description Set
---
### `float CDOTA_BaseNPC_Hero:GetBuybackGoldLimitTime( )`
#### Function Description
Returns the amount of time gold gain is limited after buying back.
---
### `int CDOTA_BaseNPC_Hero:GetCurrentXP( )`
#### Function Description
Returns the amount of XP 
---
### `int CDOTA_BaseNPC_Hero:GetDeathGoldCost( )`
#### Function Description

---
### `int CDOTA_BaseNPC_Hero:GetDeaths( )`
#### Function Description
Value is stored in PlayerResource.
---
### `int CDOTA_BaseNPC_Hero:GetDenies( )`
#### Function Description
Value is stored in PlayerResource.
---
### `int CDOTA_BaseNPC_Hero:GetGold( )`
#### Function Description
Returns gold amount for the player owning this hero
---
### `int CDOTA_BaseNPC_Hero:GetGoldBounty( )`
#### Function Description

---
### `float CDOTA_BaseNPC_Hero:GetIncreasedAttackSpeed( )`
#### Function Description
Hero attack speed is also affected by agility.
---
### `float CDOTA_BaseNPC_Hero:GetIntellect( )`
#### Function Description

---
### `float CDOTA_BaseNPC_Hero:GetIntellectGain( )`
#### Function Description

---
### `int CDOTA_BaseNPC_Hero:GetKills( )`
#### Function Description
Value is stored in PlayerResource.
---
### `int CDOTA_BaseNPC_Hero:GetLastHits( )`
#### Function Description
Value is stored in PlayerResource.
---
### `float CDOTA_BaseNPC_Hero:GetMostRecentDamageTime( )`
#### Function Description

---
### `int CDOTA_BaseNPC_Hero:GetMultipleKillCount( )`
#### Function Description

---
### `int CDOTA_BaseNPC_Hero:GetNumAttackers( )`
#### Function Description

---
### `int CDOTA_BaseNPC_Hero:GetNumItemsInInventory( )`
#### Function Description

---
### `int CDOTA_BaseNPC_Hero:GetNumItemsInStash( )`
#### Function Description

---
### `float CDOTA_BaseNPC_Hero:GetPhysicalArmorBaseValue( )`
#### Function Description
Hero armor is affected by attributes.
---
### `int CDOTA_BaseNPC_Hero:GetPlayerID( )`
#### Function Description
Returns player ID of the player owning this hero
---
### `int CDOTA_BaseNPC_Hero:GetPrimaryAttribute( )`
#### Function Description
0 = strength, 1 = agility, 2 = intelligence.
---
### `float CDOTA_BaseNPC_Hero:GetPrimaryStatValue( )`
#### Function Description

---
### `float CDOTA_BaseNPC_Hero:GetRespawnTime( )`
#### Function Description

---
### `bool CDOTA_BaseNPC_Hero:GetRespawnsDisabled( )`
#### Function Description
Is this hero prevented from respawning?
---
### `int CDOTA_BaseNPC_Hero:GetStreak( )`
#### Function Description
Value is stored in PlayerResource.
---
### `float CDOTA_BaseNPC_Hero:GetStrength( )`
#### Function Description

---
### `float CDOTA_BaseNPC_Hero:GetStrengthGain( )`
#### Function Description

---
### `float CDOTA_BaseNPC_Hero:GetTimeUntilRespawn( )`
#### Function Description

---
### `handle CDOTA_BaseNPC_Hero:GetTogglableWearable(nSlotType )`
#### Function Description
Get wearable entity in slot (slot)
#### Parameters
Type|Name|Description
--|--|--
int|nSlotType|No Description Set
---
### `bool CDOTA_BaseNPC_Hero:HasAnyAvailableInventorySpace( )`
#### Function Description

---
### `bool CDOTA_BaseNPC_Hero:HasFlyingVision( )`
#### Function Description

---
### `bool CDOTA_BaseNPC_Hero:HasOwnerAbandoned( )`
#### Function Description

---
### `int CDOTA_BaseNPC_Hero:HasRoomForItem(pItemName, bIncludeStashCombines, bAllowSelling )`
#### Function Description
Args: const char* pItemName, bool bIncludeStashCombines, bool bAllowSelling
#### Parameters
Type|Name|Description
--|--|--
string|pItemName|No Description Set
bool|bIncludeStashCombines|No Description Set
bool|bAllowSelling|No Description Set
---
### `void CDOTA_BaseNPC_Hero:HeroLevelUp(bPlayEffects )`
#### Function Description
Levels up the hero, true or false to play effects.
#### Parameters
Type|Name|Description
--|--|--
bool|bPlayEffects|No Description Set
---
### `void CDOTA_BaseNPC_Hero:IncrementAssists(iKillerID )`
#### Function Description
Value is stored in PlayerResource.
#### Parameters
Type|Name|Description
--|--|--
int|iKillerID|No Description Set
---
### `void CDOTA_BaseNPC_Hero:IncrementDeaths(iKillerID )`
#### Function Description
Value is stored in PlayerResource.
#### Parameters
Type|Name|Description
--|--|--
int|iKillerID|No Description Set
---
### `void CDOTA_BaseNPC_Hero:IncrementDenies( )`
#### Function Description
Value is stored in PlayerResource.
---
### `void CDOTA_BaseNPC_Hero:IncrementKills(iVictimID )`
#### Function Description
Passed ID is for the victim, killer ID is ID of the current hero.  Value is stored in PlayerResource.
#### Parameters
Type|Name|Description
--|--|--
int|iVictimID|No Description Set
---
### `void CDOTA_BaseNPC_Hero:IncrementLastHitMultikill( )`
#### Function Description
Value is stored in PlayerResource.
---
### `void CDOTA_BaseNPC_Hero:IncrementLastHitStreak( )`
#### Function Description
Value is stored in PlayerResource.
---
### `void CDOTA_BaseNPC_Hero:IncrementLastHits( )`
#### Function Description
Value is stored in PlayerResource.
---
### `void CDOTA_BaseNPC_Hero:IncrementNearbyCreepDeaths( )`
#### Function Description
Value is stored in PlayerResource.
---
### `void CDOTA_BaseNPC_Hero:IncrementStreak( )`
#### Function Description
Value is stored in PlayerResource.
---
### `bool CDOTA_BaseNPC_Hero:IsBuybackDisabledByReapersScythe( )`
#### Function Description

---
### `bool CDOTA_BaseNPC_Hero:IsReincarnating( )`
#### Function Description

---
### `bool CDOTA_BaseNPC_Hero:IsStashEnabled( )`
#### Function Description

---
### `void CDOTA_BaseNPC_Hero:KilledHero(hHero, hInflictor )`
#### Function Description
Args: Hero, Inflictor
#### Parameters
Type|Name|Description
--|--|--
handle|hHero|No Description Set
handle|hInflictor|No Description Set
---
### `void CDOTA_BaseNPC_Hero:ModifyAgility(flNewAgility )`
#### Function Description
Adds passed value to base attribute value, then calls CalculateStatBonus.
#### Parameters
Type|Name|Description
--|--|--
float|flNewAgility|No Description Set
---
### `int CDOTA_BaseNPC_Hero:ModifyGold(iGoldChange, bReliable, iReason )`
#### Function Description
Gives this hero some gold.  Args: int nGoldChange, bool bReliable, int reason
#### Parameters
Type|Name|Description
--|--|--
int|iGoldChange|No Description Set
bool|bReliable|No Description Set
int|iReason|No Description Set
---
### `void CDOTA_BaseNPC_Hero:ModifyIntellect(flNewIntellect )`
#### Function Description
Adds passed value to base attribute value, then calls CalculateStatBonus.
#### Parameters
Type|Name|Description
--|--|--
float|flNewIntellect|No Description Set
---
### `void CDOTA_BaseNPC_Hero:ModifyStrength(flNewStrength )`
#### Function Description
Adds passed value to base attribute value, then calls CalculateStatBonus.
#### Parameters
Type|Name|Description
--|--|--
float|flNewStrength|No Description Set
---
### `void CDOTA_BaseNPC_Hero:PerformTaunt( )`
#### Function Description

---
### `void CDOTA_BaseNPC_Hero:RecordLastHit( )`
#### Function Description

---
### `void CDOTA_BaseNPC_Hero:RespawnHero(bBuyBack, bRespawnPenalty )`
#### Function Description
Respawn this hero.
#### Parameters
Type|Name|Description
--|--|--
bool|bBuyBack|No Description Set
bool|bRespawnPenalty|No Description Set
---
### `void CDOTA_BaseNPC_Hero:SetAbilityPoints(iPoints )`
#### Function Description
Sets the current unspent ability points.
#### Parameters
Type|Name|Description
--|--|--
int|iPoints|No Description Set
---
### `void CDOTA_BaseNPC_Hero:SetBaseAgility(flAgility )`
#### Function Description

#### Parameters
Type|Name|Description
--|--|--
float|flAgility|No Description Set
---
### `void CDOTA_BaseNPC_Hero:SetBaseIntellect(flIntellect )`
#### Function Description

#### Parameters
Type|Name|Description
--|--|--
float|flIntellect|No Description Set
---
### `void CDOTA_BaseNPC_Hero:SetBaseStrength(flStrength )`
#### Function Description

#### Parameters
Type|Name|Description
--|--|--
float|flStrength|No Description Set
---
### `void CDOTA_BaseNPC_Hero:SetBotDifficulty(nDifficulty )`
#### Function Description

#### Parameters
Type|Name|Description
--|--|--
int|nDifficulty|No Description Set
---
### `void CDOTA_BaseNPC_Hero:SetBuyBackDisabledByReapersScythe(bBuybackDisabled )`
#### Function Description

#### Parameters
Type|Name|Description
--|--|--
bool|bBuybackDisabled|No Description Set
---
### `void CDOTA_BaseNPC_Hero:SetBuybackCooldownTime(flTime )`
#### Function Description
Sets the buyback cooldown time.
#### Parameters
Type|Name|Description
--|--|--
float|flTime|No Description Set
---
### `void CDOTA_BaseNPC_Hero:SetBuybackGoldLimitTime(flTime )`
#### Function Description
Set the amount of time gold gain is limited after buying back.
#### Parameters
Type|Name|Description
--|--|--
float|flTime|No Description Set
---
### `void CDOTA_BaseNPC_Hero:SetCustomDeathXP(iValue )`
#### Function Description
Sets a custom experience value for this hero.  Note, GameRules boolean must be set for this to work!
#### Parameters
Type|Name|Description
--|--|--
int|iValue|No Description Set
---
### `void CDOTA_BaseNPC_Hero:SetGold(iGold, bReliable )`
#### Function Description
Sets the gold amount for the player owning this hero
#### Parameters
Type|Name|Description
--|--|--
int|iGold|No Description Set
bool|bReliable|No Description Set
---
### `void CDOTA_BaseNPC_Hero:SetPlayerID(iPlayerID )`
#### Function Description

#### Parameters
Type|Name|Description
--|--|--
int|iPlayerID|No Description Set
---
### `void CDOTA_BaseNPC_Hero:SetPrimaryAttribute(nPrimaryAttribute )`
#### Function Description
Set this hero's primary attribute value.
#### Parameters
Type|Name|Description
--|--|--
int|nPrimaryAttribute|No Description Set
---
### `void CDOTA_BaseNPC_Hero:SetRespawnPosition(vOrigin )`
#### Function Description

#### Parameters
Type|Name|Description
--|--|--
Vector|vOrigin|No Description Set
---
### `void CDOTA_BaseNPC_Hero:SetRespawnsDisabled(bDisableRespawns )`
#### Function Description
Prevent this hero from respawning.
#### Parameters
Type|Name|Description
--|--|--
bool|bDisableRespawns|No Description Set
---
### `void CDOTA_BaseNPC_Hero:SetStashEnabled(bEnabled )`
#### Function Description

#### Parameters
Type|Name|Description
--|--|--
bool|bEnabled|No Description Set
---
### `void CDOTA_BaseNPC_Hero:SetTimeUntilRespawn(time )`
#### Function Description

#### Parameters
Type|Name|Description
--|--|--
float|time|No Description Set
---
### `bool CDOTA_BaseNPC_Hero:ShouldDoFlyHeightVisual( )`
#### Function Description

---
### `void CDOTA_BaseNPC_Hero:SpendGold(iCost, iReason )`
#### Function Description
Args: int nGold, int nReason
#### Parameters
Type|Name|Description
--|--|--
int|iCost|No Description Set
int|iReason|No Description Set
---
### `bool CDOTA_BaseNPC_Hero:UnitCanRespawn( )`
#### Function Description

---
### `void CDOTA_BaseNPC_Hero:UpgradeAbility(hAbility )`
#### Function Description
This upgrades the passed ability if it exists and the hero has enough ability points.
#### Parameters
Type|Name|Description
--|--|--
handle|hAbility|No Description Set
---
### `bool CDOTA_BaseNPC_Hero:WillReincarnate( )`
#### Function Description

---
## **CDOTA_BaseNPC_Shop**
---
### `int CDOTA_BaseNPC_Shop:GetShopType( )`
#### Function Description
Get the DOTA_SHOP_TYPE
---
### `void CDOTA_BaseNPC_Shop:SetShopType(eShopType )`
#### Function Description
Set the DOTA_SHOP_TYPE.
#### Parameters
Type|Name|Description
--|--|--
int|eShopType|No Description Set
---
## **CDOTA_BaseNPC_Trap_Ward**
---
### `Vector CDOTA_BaseNPC_Trap_Ward:GetTrapTarget( )`
#### Function Description
Get the trap target for this entity.
---
### `void CDOTA_BaseNPC_Trap_Ward:SetAnimation(pAnimation )`
#### Function Description
Set the animation sequence for this entity.
#### Parameters
Type|Name|Description
--|--|--
string|pAnimation|No Description Set
---
## **CDOTA_Buff**
---
### `void CDOTA_Buff:AddParticle(i, bDestroyImmediately, bStatusEffect, iPriority, bHeroEffect, bOverheadEffect )`
#### Function Description
(index, bDestroyImmediately, bStatusEffect, priority, bHeroEffect, bOverheadEffect
#### Parameters
Type|Name|Description
--|--|--
int|i|No Description Set
bool|bDestroyImmediately|No Description Set
bool|bStatusEffect|No Description Set
int|iPriority|No Description Set
bool|bHeroEffect|No Description Set
bool|bOverheadEffect|No Description Set
---
### `void CDOTA_Buff:DecrementStackCount( )`
#### Function Description
Decrease this modifier's stack count by 1.
---
### `void CDOTA_Buff:Destroy( )`
#### Function Description
Run all associated destroy functions, then remove the modifier.
---
### `void CDOTA_Buff:ForceRefresh( )`
#### Function Description
Run all associated refresh functions on this modifier as if it was re-applied.
---
### `handle CDOTA_Buff:GetAbility( )`
#### Function Description
Get the ability that generated the modifier.
---
### `float CDOTA_Buff:GetAuraDuration( )`
#### Function Description
Returns aura stickiness (default 0.5)
---
### `handle CDOTA_Buff:GetAuraOwner( )`
#### Function Description

---
### `handle CDOTA_Buff:GetCaster( )`
#### Function Description
Get the owner of the ability responsible for the modifier.
---
### `string CDOTA_Buff:GetClass( )`
#### Function Description

---
### `float CDOTA_Buff:GetCreationTime( )`
#### Function Description

---
### `float CDOTA_Buff:GetDieTime( )`
#### Function Description

---
### `float CDOTA_Buff:GetDuration( )`
#### Function Description

---
### `float CDOTA_Buff:GetElapsedTime( )`
#### Function Description

---
### `float CDOTA_Buff:GetLastAppliedTime( )`
#### Function Description

---
### `string CDOTA_Buff:GetName( )`
#### Function Description

---
### `handle CDOTA_Buff:GetParent( )`
#### Function Description
Get the unit the modifier is parented to.
---
### `float CDOTA_Buff:GetRemainingTime( )`
#### Function Description

---
### `int CDOTA_Buff:GetSerialNumber( )`
#### Function Description

---
### `int CDOTA_Buff:GetStackCount( )`
#### Function Description

---
### `bool CDOTA_Buff:HasFunction(iFunction )`
#### Function Description

#### Parameters
Type|Name|Description
--|--|--
int|iFunction|No Description Set
---
### `void CDOTA_Buff:IncrementStackCount( )`
#### Function Description
Increase this modifier's stack count by 1.
---
### `bool CDOTA_Buff:IsDebuff( )`
#### Function Description

---
### `bool CDOTA_Buff:IsHexDebuff( )`
#### Function Description

---
### `bool CDOTA_Buff:IsStunDebuff( )`
#### Function Description

---
### `void CDOTA_Buff:SetDuration(flDuration, bInformClient )`
#### Function Description
(flTime, bInformClients)
#### Parameters
Type|Name|Description
--|--|--
float|flDuration|No Description Set
bool|bInformClient|No Description Set
---
### `void CDOTA_Buff:SetStackCount(iCount )`
#### Function Description

#### Parameters
Type|Name|Description
--|--|--
int|iCount|No Description Set
---
### `void CDOTA_Buff:StartIntervalThink(flInterval )`
#### Function Description
Start this modifier's think function (OnIntervalThink) with the given interval (float).  To stop, call with -1.
#### Parameters
Type|Name|Description
--|--|--
float|flInterval|No Description Set
---
## **CDOTA_CustomUIManager**
---
### `void CDOTA_CustomUIManager:DynamicHud_Create(int_1, string_2, string_3, handle_4 )`
#### Function Description
Create a new custom UI HUD element for the specified player(s). ( int PlayerID /*-1 means everyone*/, string ElementID /* should be unique */, string LayoutFileName, table DialogVariables /* can be nil */ )
#### Parameters
Type|Name|Description
--|--|--
int|int_1|No Description Set
string|string_2|No Description Set
string|string_3|No Description Set
handle|handle_4|No Description Set
---
### `void CDOTA_CustomUIManager:DynamicHud_Destroy(int_1, string_2 )`
#### Function Description
Destroy a custom hud element ( int PlayerID /*-1 means everyone*/, string ElementID )
#### Parameters
Type|Name|Description
--|--|--
int|int_1|No Description Set
string|string_2|No Description Set
---
### `void CDOTA_CustomUIManager:DynamicHud_SetDialogVariables(int_1, string_2, handle_3 )`
#### Function Description
Add or modify dialog variables for an existing custom hud element ( int PlayerID /*-1 means everyone*/, string ElementID, table DialogVariables )
#### Parameters
Type|Name|Description
--|--|--
int|int_1|No Description Set
string|string_2|No Description Set
handle|handle_3|No Description Set
---
### `void CDOTA_CustomUIManager:DynamicHud_SetVisible(int_1, string_2, bool_3 )`
#### Function Description
Toggle the visibility of an existing custom hud element ( int PlayerID /*-1 means everyone*/, string ElementID, bool Visible )
#### Parameters
Type|Name|Description
--|--|--
int|int_1|No Description Set
string|string_2|No Description Set
bool|bool_3|No Description Set
---
## **CDOTA_Item**
---
### `bool CDOTA_Item:CanBeUsedOutOfInventory( )`
#### Function Description

---
### `handle CDOTA_Item:GetContainer( )`
#### Function Description
Get the container for this item.
---
### `int CDOTA_Item:GetCost( )`
#### Function Description

---
### `int CDOTA_Item:GetCurrentCharges( )`
#### Function Description
Get the number of charges this item currently has.
---
### `int CDOTA_Item:GetInitialCharges( )`
#### Function Description
Get the initial number of charges this item has.
---
### `int CDOTA_Item:GetItemSlot( )`
#### Function Description

---
### `int CDOTA_Item:GetItemState( )`
#### Function Description
Gets whether item is unequipped or ready.
---
### `handle CDOTA_Item:GetParent( )`
#### Function Description
Get the parent for this item.
---
### `float CDOTA_Item:GetPurchaseTime( )`
#### Function Description
Get the purchase time of this item
---
### `handle CDOTA_Item:GetPurchaser( )`
#### Function Description
Get the purchaser for this item.
---
### `int CDOTA_Item:GetSecondaryCharges( )`
#### Function Description
Get the number of secondary charges this item currently has.
---
### `int CDOTA_Item:GetShareability( )`
#### Function Description

---
### `bool CDOTA_Item:IsAlertableItem( )`
#### Function Description

---
### `bool CDOTA_Item:IsCastOnPickup( )`
#### Function Description

---
### `bool CDOTA_Item:IsCombinable( )`
#### Function Description

---
### `bool CDOTA_Item:IsDisassemblable( )`
#### Function Description

---
### `bool CDOTA_Item:IsDroppable( )`
#### Function Description

---
### `bool CDOTA_Item:IsInBackpack( )`
#### Function Description

---
### `bool CDOTA_Item:IsItem( )`
#### Function Description

---
### `bool CDOTA_Item:IsKillable( )`
#### Function Description

---
### `bool CDOTA_Item:IsMuted( )`
#### Function Description

---
### `bool CDOTA_Item:IsPermanent( )`
#### Function Description

---
### `bool CDOTA_Item:IsPurchasable( )`
#### Function Description

---
### `bool CDOTA_Item:IsRecipe( )`
#### Function Description

---
### `bool CDOTA_Item:IsRecipeGenerated( )`
#### Function Description

---
### `bool CDOTA_Item:IsSellable( )`
#### Function Description

---
### `bool CDOTA_Item:IsStackable( )`
#### Function Description

---
### `void CDOTA_Item:LaunchLoot(bAutoUse, flHeight, flDuration, vEndPoint )`
#### Function Description

#### Parameters
Type|Name|Description
--|--|--
bool|bAutoUse|No Description Set
float|flHeight|No Description Set
float|flDuration|No Description Set
Vector|vEndPoint|No Description Set
---
### `void CDOTA_Item:LaunchLootInitialHeight(bAutoUse, flInitialHeight, flLaunchHeight, flDuration, vEndPoint )`
#### Function Description

#### Parameters
Type|Name|Description
--|--|--
bool|bAutoUse|No Description Set
float|flInitialHeight|No Description Set
float|flLaunchHeight|No Description Set
float|flDuration|No Description Set
Vector|vEndPoint|No Description Set
---
### `void CDOTA_Item:OnEquip( )`
#### Function Description

---
### `void CDOTA_Item:OnUnequip( )`
#### Function Description

---
### `bool CDOTA_Item:RequiresCharges( )`
#### Function Description

---
### `void CDOTA_Item:SetCanBeUsedOutOfInventory(bValue )`
#### Function Description

#### Parameters
Type|Name|Description
--|--|--
bool|bValue|No Description Set
---
### `void CDOTA_Item:SetCastOnPickup(bCastOnPickUp )`
#### Function Description

#### Parameters
Type|Name|Description
--|--|--
bool|bCastOnPickUp|No Description Set
---
### `void CDOTA_Item:SetCurrentCharges(iCharges )`
#### Function Description
Set the number of charges on this item
#### Parameters
Type|Name|Description
--|--|--
int|iCharges|No Description Set
---
### `void CDOTA_Item:SetDroppable(bDroppable )`
#### Function Description

#### Parameters
Type|Name|Description
--|--|--
bool|bDroppable|No Description Set
---
### `void CDOTA_Item:SetItemState(iState )`
#### Function Description
Sets whether item is unequipped or ready.
#### Parameters
Type|Name|Description
--|--|--
int|iState|No Description Set
---
### `void CDOTA_Item:SetPurchaseTime(flTime )`
#### Function Description
Set the purchase time of this item
#### Parameters
Type|Name|Description
--|--|--
float|flTime|No Description Set
---
### `void CDOTA_Item:SetPurchaser(hPurchaser )`
#### Function Description
Set the purchaser of record for this item.
#### Parameters
Type|Name|Description
--|--|--
handle|hPurchaser|No Description Set
---
### `void CDOTA_Item:SetSecondaryCharges(iCharges )`
#### Function Description
Set the number of secondary charges on this item
#### Parameters
Type|Name|Description
--|--|--
int|iCharges|No Description Set
---
### `void CDOTA_Item:SetSellable(bSellable )`
#### Function Description

#### Parameters
Type|Name|Description
--|--|--
bool|bSellable|No Description Set
---
### `void CDOTA_Item:SetShareability(iShareability )`
#### Function Description

#### Parameters
Type|Name|Description
--|--|--
int|iShareability|No Description Set
---
### `void CDOTA_Item:SetStacksWithOtherOwners(bStacksWithOtherOwners )`
#### Function Description

#### Parameters
Type|Name|Description
--|--|--
bool|bStacksWithOtherOwners|No Description Set
---
### `void CDOTA_Item:SpendCharge( )`
#### Function Description

---
### `bool CDOTA_Item:StacksWithOtherOwners( )`
#### Function Description

---
### `void CDOTA_Item:Think( )`
#### Function Description
Think this item
---
## **CDOTA_ItemSpawner**
---
### `string CDOTA_ItemSpawner:GetItemName( )`
#### Function Description
Returns the item name
---
## **CDOTA_Item_DataDriven**
---
### `void CDOTA_Item_DataDriven:ApplyDataDrivenModifier(hCaster, hTarget, pszModifierName, hModifierTable )`
#### Function Description
Applies a data driven modifier to the target
#### Parameters
Type|Name|Description
--|--|--
handle|hCaster|No Description Set
handle|hTarget|No Description Set
string|pszModifierName|No Description Set
handle|hModifierTable|No Description Set
---
### `handle CDOTA_Item_DataDriven:ApplyDataDrivenThinker(hCaster, vLocation, pszModifierName, hModifierTable )`
#### Function Description
Applies a data driven thinker at the location
#### Parameters
Type|Name|Description
--|--|--
handle|hCaster|No Description Set
Vector|vLocation|No Description Set
string|pszModifierName|No Description Set
handle|hModifierTable|No Description Set
---
## **CDOTA_Item_Lua**
---
### `bool CDOTA_Item_Lua:CanUnitPickUp(hUnit )`
#### Function Description
Returns true if this item can be picked up by the target unit.
#### Parameters
Type|Name|Description
--|--|--
handle|hUnit|No Description Set
---
### `int CDOTA_Item_Lua:CastFilterResult( )`
#### Function Description
Determine whether an issued command with no target is valid.
---
### `int CDOTA_Item_Lua:CastFilterResultLocation(vLocation )`
#### Function Description
(Vector vLocation) Determine whether an issued command on a location is valid.
#### Parameters
Type|Name|Description
--|--|--
Vector|vLocation|No Description Set
---
### `int CDOTA_Item_Lua:CastFilterResultTarget(hTarget )`
#### Function Description
(HSCRIPT hTarget) Determine whether an issued command on a target is valid.
#### Parameters
Type|Name|Description
--|--|--
handle|hTarget|No Description Set
---
### `string CDOTA_Item_Lua:GetAssociatedPrimaryAbilities( )`
#### Function Description
Returns abilities that are stolen simultaneously, or otherwise related in functionality.
---
### `string CDOTA_Item_Lua:GetAssociatedSecondaryAbilities( )`
#### Function Description
Returns other abilities that are stolen simultaneously, or otherwise related in functionality.  Generally hidden abilities.
---
### `int CDOTA_Item_Lua:GetBehavior( )`
#### Function Description
Return cast behavior type of this ability.
---
### `int CDOTA_Item_Lua:GetCastRange(vLocation, hTarget )`
#### Function Description
Return cast range of this ability.
#### Parameters
Type|Name|Description
--|--|--
Vector|vLocation|No Description Set
handle|hTarget|No Description Set
---
### `float CDOTA_Item_Lua:GetChannelTime( )`
#### Function Description
Return the channel time of this ability.
---
### `int CDOTA_Item_Lua:GetChannelledManaCostPerSecond(iLevel )`
#### Function Description
Return mana cost at the given level per second while channeling (-1 is current).
#### Parameters
Type|Name|Description
--|--|--
int|iLevel|No Description Set
---
### `int CDOTA_Item_Lua:GetConceptRecipientType( )`
#### Function Description
Return who hears speech when this spell is cast.
---
### `float CDOTA_Item_Lua:GetCooldown(iLevel )`
#### Function Description
Return cooldown of this ability.
#### Parameters
Type|Name|Description
--|--|--
int|iLevel|No Description Set
---
### `string CDOTA_Item_Lua:GetCustomCastError( )`
#### Function Description
Return the error string of a failed command with no target.
---
### `string CDOTA_Item_Lua:GetCustomCastErrorLocation(vLocation )`
#### Function Description
(Vector vLocation) Return the error string of a failed command on a location.
#### Parameters
Type|Name|Description
--|--|--
Vector|vLocation|No Description Set
---
### `string CDOTA_Item_Lua:GetCustomCastErrorTarget(hTarget )`
#### Function Description
(HSCRIPT hTarget) Return the error string of a failed command on a target.
#### Parameters
Type|Name|Description
--|--|--
handle|hTarget|No Description Set
---
### `int CDOTA_Item_Lua:GetGoldCost(iLevel )`
#### Function Description
Return gold cost at the given level (-1 is current).
#### Parameters
Type|Name|Description
--|--|--
int|iLevel|No Description Set
---
### `string CDOTA_Item_Lua:GetIntrinsicModifierName( )`
#### Function Description
Returns the name of the modifier applied passively by this ability.
---
### `int CDOTA_Item_Lua:GetManaCost(iLevel )`
#### Function Description
Return mana cost at the given level (-1 is current).
#### Parameters
Type|Name|Description
--|--|--
int|iLevel|No Description Set
---
### `float CDOTA_Item_Lua:GetPlaybackRateOverride( )`
#### Function Description
Return the animation rate of the cast animation.
---
### `bool CDOTA_Item_Lua:IsHiddenAbilityCastable( )`
#### Function Description
Returns true if this ability can be used when not on the action panel.
---
### `bool CDOTA_Item_Lua:IsHiddenWhenStolen( )`
#### Function Description
Returns true if this ability is hidden when stolen by Spell Steal.
---
### `bool CDOTA_Item_Lua:IsMuted( )`
#### Function Description
Returns whether this item is muted or not.
---
### `bool CDOTA_Item_Lua:IsRefreshable( )`
#### Function Description
Returns true if this ability is refreshed by Refresher Orb.
---
### `bool CDOTA_Item_Lua:IsStealable( )`
#### Function Description
Returns true if this ability can be stolen by Spell Steal.
---
### `void CDOTA_Item_Lua:OnAbilityPhaseInterrupted( )`
#### Function Description
Cast time did not complete successfully.
---
### `bool CDOTA_Item_Lua:OnAbilityPhaseStart( )`
#### Function Description
Cast time begins (return true for successful cast).
---
### `void CDOTA_Item_Lua:OnChannelFinish(bInterrupted )`
#### Function Description
(bool bInterrupted) Channel finished.
#### Parameters
Type|Name|Description
--|--|--
bool|bInterrupted|No Description Set
---
### `void CDOTA_Item_Lua:OnChannelThink(flInterval )`
#### Function Description
(float flInterval) Channeling is taking place.
#### Parameters
Type|Name|Description
--|--|--
float|flInterval|No Description Set
---
### `void CDOTA_Item_Lua:OnHeroCalculateStatBonus( )`
#### Function Description
Caster (hero only) gained a level, skilled an ability, or received a new stat bonus.
---
### `void CDOTA_Item_Lua:OnHeroDiedNearby(unit, attacker, table )`
#### Function Description
A hero has died in the vicinity (ie Urn), takes table of params.
#### Parameters
Type|Name|Description
--|--|--
handle|unit|No Description Set
handle|attacker|No Description Set
handle|table|No Description Set
---
### `void CDOTA_Item_Lua:OnHeroLevelUp( )`
#### Function Description
Caster gained a level.
---
### `void CDOTA_Item_Lua:OnInventoryContentsChanged( )`
#### Function Description
Caster inventory changed.
---
### `void CDOTA_Item_Lua:OnItemEquipped(hItem )`
#### Function Description
( HSCRIPT hItem ) Caster equipped item.
#### Parameters
Type|Name|Description
--|--|--
handle|hItem|No Description Set
---
### `void CDOTA_Item_Lua:OnOwnerDied( )`
#### Function Description
Caster died.
---
### `void CDOTA_Item_Lua:OnOwnerSpawned( )`
#### Function Description
Caster respawned or spawned for the first time.
---
### `bool CDOTA_Item_Lua:OnProjectileHit(hTarget, vLocation )`
#### Function Description
(HSCRIPT hTarget, Vector vLocation) Projectile has collided with a given target or reached its destination (target is invalid).
#### Parameters
Type|Name|Description
--|--|--
handle|hTarget|No Description Set
Vector|vLocation|No Description Set
---
### `void CDOTA_Item_Lua:OnProjectileThink(vLocation )`
#### Function Description
(Vector vLocation) Projectile is actively moving.
#### Parameters
Type|Name|Description
--|--|--
Vector|vLocation|No Description Set
---
### `void CDOTA_Item_Lua:OnSpellStart( )`
#### Function Description
Cast time finished, spell effects begin.
---
### `void CDOTA_Item_Lua:OnStolen(hSourceAbility )`
#### Function Description
( HSCRIPT hAbility ) Special behavior when stolen by Spell Steal.
#### Parameters
Type|Name|Description
--|--|--
handle|hSourceAbility|No Description Set
---
### `void CDOTA_Item_Lua:OnToggle( )`
#### Function Description
Ability is toggled on/off.
---
### `void CDOTA_Item_Lua:OnUnStolen( )`
#### Function Description
Special behavior when lost by Spell Steal.
---
### `void CDOTA_Item_Lua:OnUpgrade( )`
#### Function Description
Ability gained a level.
---
### `bool CDOTA_Item_Lua:ProcsMagicStick( )`
#### Function Description
Returns true if this ability will generate magic stick charges for nearby enemies.
---
### `int CDOTA_Item_Lua:SpeakTrigger( )`
#### Function Description
Return the type of speech used.
---
## **CDOTA_Item_Physical**
---
### `handle CDOTA_Item_Physical:GetContainedItem( )`
#### Function Description
Returned the contained item.
---
### `float CDOTA_Item_Physical:GetCreationTime( )`
#### Function Description
Returns the game time when this item was created in the world
---
### `void CDOTA_Item_Physical:SetContainedItem(hItem )`
#### Function Description
Set the contained item.
#### Parameters
Type|Name|Description
--|--|--
handle|hItem|No Description Set
---
## **CDOTA_MapTree**
---
### `void CDOTA_MapTree:CutDown(nTeamNumberKnownTo )`
#### Function Description
Cuts down this tree. Parameters: int nTeamNumberKnownTo (-1 = invalid team)
#### Parameters
Type|Name|Description
--|--|--
int|nTeamNumberKnownTo|No Description Set
---
### `void CDOTA_MapTree:CutDownRegrowAfter(flRegrowAfter, nTeamNumberKnownTo )`
#### Function Description
Cuts down this tree. Parameters: float flRegrowAfter (-1 = never regrow), int nTeamNumberKnownTo (-1 = invalid team)
#### Parameters
Type|Name|Description
--|--|--
float|flRegrowAfter|No Description Set
int|nTeamNumberKnownTo|No Description Set
---
### `void CDOTA_MapTree:GrowBack( )`
#### Function Description
Grows back the tree if it was cut down.
---
### `bool CDOTA_MapTree:IsStanding( )`
#### Function Description
Returns true if the tree is standing, false if it has been cut down
---
## **CDOTA_Modifier_Lua**
---
### `bool CDOTA_Modifier_Lua:AllowIllusionDuplicate( )`
#### Function Description
True/false if this modifier is active on illusions.
---
### `bool CDOTA_Modifier_Lua:CanParentBeAutoAttacked( )`
#### Function Description

---
### `bool CDOTA_Modifier_Lua:DestroyOnExpire( )`
#### Function Description
True/false if this buff is removed when the duration expires.
---
### `int CDOTA_Modifier_Lua:GetAttributes( )`
#### Function Description
Return the types of attributes applied to this modifier (enum value from DOTAModifierAttribute_t
---
### `float CDOTA_Modifier_Lua:GetAuraDuration( )`
#### Function Description
Returns aura stickiness
---
### `bool CDOTA_Modifier_Lua:GetAuraEntityReject(hEntity )`
#### Function Description
Return true/false if this entity should receive the aura under specific conditions
#### Parameters
Type|Name|Description
--|--|--
handle|hEntity|No Description Set
---
### `int CDOTA_Modifier_Lua:GetAuraRadius( )`
#### Function Description
Return the range around the parent this aura tries to apply its buff.
---
### `int CDOTA_Modifier_Lua:GetAuraSearchFlags( )`
#### Function Description
Return the unit flags this aura respects when placing buffs.
---
### `int CDOTA_Modifier_Lua:GetAuraSearchTeam( )`
#### Function Description
Return the teams this aura applies its buff to.
---
### `int CDOTA_Modifier_Lua:GetAuraSearchType( )`
#### Function Description
Return the unit classifications this aura applies its buff to.
---
### `int CDOTA_Modifier_Lua:GetEffectAttachType( )`
#### Function Description
Return the attach type of the particle system from GetEffectName.
---
### `string CDOTA_Modifier_Lua:GetEffectName( )`
#### Function Description
Return the name of the particle system that is created while this modifier is active.
---
### `string CDOTA_Modifier_Lua:GetHeroEffectName( )`
#### Function Description
Return the name of the hero effect particle system that is created while this modifier is active.
---
### `string CDOTA_Modifier_Lua:GetModifierAura( )`
#### Function Description
The name of the secondary modifier that will be applied by this modifier (if it is an aura).
---
### `int CDOTA_Modifier_Lua:GetPriority( )`
#### Function Description
Return the priority order this modifier will be applied over others.
---
### `string CDOTA_Modifier_Lua:GetStatusEffectName( )`
#### Function Description
Return the name of the status effect particle system that is created while this modifier is active.
---
### `string CDOTA_Modifier_Lua:GetTexture( )`
#### Function Description
Return the name of the buff icon to be shown for this modifier.
---
### `int CDOTA_Modifier_Lua:HeroEffectPriority( )`
#### Function Description
Relationship of this hero effect with those from other buffs (higher is more likely to be shown).
---
### `bool CDOTA_Modifier_Lua:IsAura( )`
#### Function Description
True/false if this modifier is an aura.
---
### `bool CDOTA_Modifier_Lua:IsAuraActiveOnDeath( )`
#### Function Description
True/false if this aura provides buffs when the parent is dead.
---
### `bool CDOTA_Modifier_Lua:IsDebuff( )`
#### Function Description
True/false if this modifier should be displayed as a debuff.
---
### `bool CDOTA_Modifier_Lua:IsHidden( )`
#### Function Description
True/false if this modifier should be displayed on the buff bar.
---
### `bool CDOTA_Modifier_Lua:IsPermanent( )`
#### Function Description

---
### `bool CDOTA_Modifier_Lua:IsPurgable( )`
#### Function Description
True/false if this modifier can be purged.
---
### `bool CDOTA_Modifier_Lua:IsPurgeException( )`
#### Function Description
True/false if this modifier can be purged by strong dispels.
---
### `bool CDOTA_Modifier_Lua:IsStunDebuff( )`
#### Function Description
True/false if this modifier is considered a stun for purge reasons.
---
### `void CDOTA_Modifier_Lua:OnCreated(table )`
#### Function Description
Runs when the modifier is created.
#### Parameters
Type|Name|Description
--|--|--
handle|table|No Description Set
---
### `void CDOTA_Modifier_Lua:OnDestroy( )`
#### Function Description
Runs when the modifier is destroyed (after unit loses modifier).
---
### `void CDOTA_Modifier_Lua:OnIntervalThink( )`
#### Function Description
Runs when the think interval occurs.
---
### `void CDOTA_Modifier_Lua:OnRefresh(table )`
#### Function Description
Runs when the modifier is refreshed.
#### Parameters
Type|Name|Description
--|--|--
handle|table|No Description Set
---
### `void CDOTA_Modifier_Lua:OnRemoved( )`
#### Function Description
Runs when the modifier is destroyed (before unit loses modifier).
---
### `void CDOTA_Modifier_Lua:OnStackCountChanged(iStackCount )`
#### Function Description
Runs when stack count changes (param is old count).
#### Parameters
Type|Name|Description
--|--|--
int|iStackCount|No Description Set
---
### `bool CDOTA_Modifier_Lua:RemoveOnDeath( )`
#### Function Description
True/false if this modifier is removed when the parent dies.
---
### `bool CDOTA_Modifier_Lua:ShouldUseOverheadOffset( )`
#### Function Description
Apply the overhead offset to the attached effect.
---
### `int CDOTA_Modifier_Lua:StatusEffectPriority( )`
#### Function Description
Relationship of this status effect with those from other buffs (higher is more likely to be shown).
---
## **CDOTA_Modifier_Lua_Horizontal_Motion**
---
### `bool CDOTA_Modifier_Lua_Horizontal_Motion:ApplyHorizontalMotionController( )`
#### Function Description
Starts the horizontal motion controller effects for this buff.  Returns true if successful.
---
### `int CDOTA_Modifier_Lua_Horizontal_Motion:GetPriority( )`
#### Function Description
Get the priority
---
### `void CDOTA_Modifier_Lua_Horizontal_Motion:OnHorizontalMotionInterrupted( )`
#### Function Description
Called when the motion gets interrupted.
---
### `void CDOTA_Modifier_Lua_Horizontal_Motion:SetPriority(nMotionPriority )`
#### Function Description
Set the priority
#### Parameters
Type|Name|Description
--|--|--
int|nMotionPriority|No Description Set
---
### `void CDOTA_Modifier_Lua_Horizontal_Motion:UpdateHorizontalMotion(me, dt )`
#### Function Description
Perform any motion from the given interval on the NPC.
#### Parameters
Type|Name|Description
--|--|--
handle|me|No Description Set
float|dt|No Description Set
---
## **CDOTA_Modifier_Lua_Motion_Both**
---
### `bool CDOTA_Modifier_Lua_Motion_Both:ApplyHorizontalMotionController( )`
#### Function Description
Starts the horizontal motion controller effects for this buff.  Returns true if successful.
---
### `bool CDOTA_Modifier_Lua_Motion_Both:ApplyVerticalMotionController( )`
#### Function Description
Starts the vertical motion controller effects for this buff.  Returns true if successful.
---
### `int CDOTA_Modifier_Lua_Motion_Both:GetPriority( )`
#### Function Description
Get the priority
---
### `void CDOTA_Modifier_Lua_Motion_Both:OnHorizontalMotionInterrupted( )`
#### Function Description
Called when the motion gets interrupted.
---
### `void CDOTA_Modifier_Lua_Motion_Both:OnVerticalMotionInterrupted( )`
#### Function Description
Called when the motion gets interrupted.
---
### `void CDOTA_Modifier_Lua_Motion_Both:SetPriority(nMotionPriority )`
#### Function Description
Set the priority
#### Parameters
Type|Name|Description
--|--|--
int|nMotionPriority|No Description Set
---
### `void CDOTA_Modifier_Lua_Motion_Both:UpdateHorizontalMotion(me, dt )`
#### Function Description
Perform any motion from the given interval on the NPC.
#### Parameters
Type|Name|Description
--|--|--
handle|me|No Description Set
float|dt|No Description Set
---
### `void CDOTA_Modifier_Lua_Motion_Both:UpdateVerticalMotion(me, dt )`
#### Function Description
Perform any motion from the given interval on the NPC.
#### Parameters
Type|Name|Description
--|--|--
handle|me|No Description Set
float|dt|No Description Set
---
## **CDOTA_Modifier_Lua_Vertical_Motion**
---
### `bool CDOTA_Modifier_Lua_Vertical_Motion:ApplyVerticalMotionController( )`
#### Function Description
Starts the vertical motion controller effects for this buff.  Returns true if successful.
---
### `int CDOTA_Modifier_Lua_Vertical_Motion:GetMotionPriority( )`
#### Function Description
Get the priority
---
### `void CDOTA_Modifier_Lua_Vertical_Motion:OnVerticalMotionInterrupted( )`
#### Function Description
Called when the motion gets interrupted.
---
### `void CDOTA_Modifier_Lua_Vertical_Motion:SetMotionPriority(nMotionPriority )`
#### Function Description
Set the priority
#### Parameters
Type|Name|Description
--|--|--
int|nMotionPriority|No Description Set
---
### `void CDOTA_Modifier_Lua_Vertical_Motion:UpdateVerticalMotion(me, dt )`
#### Function Description
Perform any motion from the given interval on the NPC.
#### Parameters
Type|Name|Description
--|--|--
handle|me|No Description Set
float|dt|No Description Set
---
## **CDOTA_PlayerResource**
---
### `void CDOTA_PlayerResource:AddAegisPickup(iPlayerID )`
#### Function Description

#### Parameters
Type|Name|Description
--|--|--
int|iPlayerID|No Description Set
---
### `void CDOTA_PlayerResource:AddClaimedFarm(iPlayerID, flFarmValue, bEarnedValue )`
#### Function Description

#### Parameters
Type|Name|Description
--|--|--
int|iPlayerID|No Description Set
float|flFarmValue|No Description Set
bool|bEarnedValue|No Description Set
---
### `void CDOTA_PlayerResource:AddGoldSpentOnSupport(iPlayerID, iCost )`
#### Function Description

#### Parameters
Type|Name|Description
--|--|--
int|iPlayerID|No Description Set
int|iCost|No Description Set
---
### `void CDOTA_PlayerResource:AddRunePickup(iPlayerID )`
#### Function Description

#### Parameters
Type|Name|Description
--|--|--
int|iPlayerID|No Description Set
---
### `bool CDOTA_PlayerResource:AreUnitsSharedWithPlayerID(nUnitOwnerPlayerID, nOtherPlayerID )`
#### Function Description

#### Parameters
Type|Name|Description
--|--|--
int|nUnitOwnerPlayerID|No Description Set
int|nOtherPlayerID|No Description Set
---
### `bool CDOTA_PlayerResource:CanRepick(iPlayerID )`
#### Function Description

#### Parameters
Type|Name|Description
--|--|--
int|iPlayerID|No Description Set
---
### `void CDOTA_PlayerResource:ClearKillsMatrix(iPlayerID )`
#### Function Description

#### Parameters
Type|Name|Description
--|--|--
int|iPlayerID|No Description Set
---
### `void CDOTA_PlayerResource:ClearLastHitMultikill(iPlayerID )`
#### Function Description

#### Parameters
Type|Name|Description
--|--|--
int|iPlayerID|No Description Set
---
### `void CDOTA_PlayerResource:ClearLastHitStreak(iPlayerID )`
#### Function Description

#### Parameters
Type|Name|Description
--|--|--
int|iPlayerID|No Description Set
---
### `void CDOTA_PlayerResource:ClearRawPlayerDamageMatrix(iPlayerID )`
#### Function Description

#### Parameters
Type|Name|Description
--|--|--
int|iPlayerID|No Description Set
---
### `void CDOTA_PlayerResource:ClearStreak(iPlayerID )`
#### Function Description

#### Parameters
Type|Name|Description
--|--|--
int|iPlayerID|No Description Set
---
### `int CDOTA_PlayerResource:GetAegisPickups(iPlayerID )`
#### Function Description

#### Parameters
Type|Name|Description
--|--|--
int|iPlayerID|No Description Set
---
### `int CDOTA_PlayerResource:GetAssists(iPlayerID )`
#### Function Description

#### Parameters
Type|Name|Description
--|--|--
int|iPlayerID|No Description Set
---
### `unsigned CDOTA_PlayerResource:GetBroadcasterChannel(iPlayerID )`
#### Function Description

#### Parameters
Type|Name|Description
--|--|--
int|iPlayerID|No Description Set
---
### `unsigned CDOTA_PlayerResource:GetBroadcasterChannelSlot(iPlayerID )`
#### Function Description

#### Parameters
Type|Name|Description
--|--|--
int|iPlayerID|No Description Set
---
### `int CDOTA_PlayerResource:GetClaimedDenies(iPlayerID )`
#### Function Description

#### Parameters
Type|Name|Description
--|--|--
int|iPlayerID|No Description Set
---
### `float CDOTA_PlayerResource:GetClaimedFarm(iPlayerID, bOnlyEarned )`
#### Function Description

#### Parameters
Type|Name|Description
--|--|--
int|iPlayerID|No Description Set
bool|bOnlyEarned|No Description Set
---
### `int CDOTA_PlayerResource:GetClaimedMisses(iPlayerID )`
#### Function Description

#### Parameters
Type|Name|Description
--|--|--
int|iPlayerID|No Description Set
---
### `<unknown> CDOTA_PlayerResource:GetConnectionState(iPlayerID )`
#### Function Description

#### Parameters
Type|Name|Description
--|--|--
int|iPlayerID|No Description Set
---
### `int CDOTA_PlayerResource:GetCreepDamageTaken(iPlayerID, bTotal )`
#### Function Description

#### Parameters
Type|Name|Description
--|--|--
int|iPlayerID|No Description Set
bool|bTotal|No Description Set
---
### `float CDOTA_PlayerResource:GetCustomBuybackCooldown(iPlayerID )`
#### Function Description

#### Parameters
Type|Name|Description
--|--|--
int|iPlayerID|No Description Set
---
### `int CDOTA_PlayerResource:GetCustomBuybackCost(iPlayerID )`
#### Function Description

#### Parameters
Type|Name|Description
--|--|--
int|iPlayerID|No Description Set
---
### `int CDOTA_PlayerResource:GetCustomTeamAssignment(iPlayerID )`
#### Function Description
Get the current custom team assignment for this player.
#### Parameters
Type|Name|Description
--|--|--
int|iPlayerID|No Description Set
---
### `int CDOTA_PlayerResource:GetDamageDoneToHero(iPlayerID, iVictimID )`
#### Function Description

#### Parameters
Type|Name|Description
--|--|--
int|iPlayerID|No Description Set
int|iVictimID|No Description Set
---
### `int CDOTA_PlayerResource:GetDeaths(iPlayerID )`
#### Function Description

#### Parameters
Type|Name|Description
--|--|--
int|iPlayerID|No Description Set
---
### `int CDOTA_PlayerResource:GetDenies(iPlayerID )`
#### Function Description

#### Parameters
Type|Name|Description
--|--|--
int|iPlayerID|No Description Set
---
### `unsigned CDOTA_PlayerResource:GetEventPointsForPlayerID(nPlayerID )`
#### Function Description

#### Parameters
Type|Name|Description
--|--|--
int|nPlayerID|No Description Set
---
### `unsigned CDOTA_PlayerResource:GetEventPremiumPoints(nPlayerID )`
#### Function Description

#### Parameters
Type|Name|Description
--|--|--
int|nPlayerID|No Description Set
---
### `<unknown> CDOTA_PlayerResource:GetEventRanks(nPlayerID )`
#### Function Description

#### Parameters
Type|Name|Description
--|--|--
int|nPlayerID|No Description Set
---
### `int CDOTA_PlayerResource:GetGold(iPlayerID )`
#### Function Description

#### Parameters
Type|Name|Description
--|--|--
int|iPlayerID|No Description Set
---
### `int CDOTA_PlayerResource:GetGoldLostToDeath(iPlayerID )`
#### Function Description

#### Parameters
Type|Name|Description
--|--|--
int|iPlayerID|No Description Set
---
### `float CDOTA_PlayerResource:GetGoldPerMin(iPlayerID )`
#### Function Description

#### Parameters
Type|Name|Description
--|--|--
int|iPlayerID|No Description Set
---
### `int CDOTA_PlayerResource:GetGoldSpentOnBuybacks(iPlayerID )`
#### Function Description

#### Parameters
Type|Name|Description
--|--|--
int|iPlayerID|No Description Set
---
### `int CDOTA_PlayerResource:GetGoldSpentOnConsumables(iPlayerID )`
#### Function Description

#### Parameters
Type|Name|Description
--|--|--
int|iPlayerID|No Description Set
---
### `int CDOTA_PlayerResource:GetGoldSpentOnItems(iPlayerID )`
#### Function Description

#### Parameters
Type|Name|Description
--|--|--
int|iPlayerID|No Description Set
---
### `int CDOTA_PlayerResource:GetGoldSpentOnSupport(iPlayerID )`
#### Function Description

#### Parameters
Type|Name|Description
--|--|--
int|iPlayerID|No Description Set
---
### `float CDOTA_PlayerResource:GetHealing(iPlayerID )`
#### Function Description

#### Parameters
Type|Name|Description
--|--|--
int|iPlayerID|No Description Set
---
### `int CDOTA_PlayerResource:GetHeroDamageTaken(iPlayerID, bTotal )`
#### Function Description

#### Parameters
Type|Name|Description
--|--|--
int|iPlayerID|No Description Set
bool|bTotal|No Description Set
---
### `int CDOTA_PlayerResource:GetKills(iPlayerID )`
#### Function Description

#### Parameters
Type|Name|Description
--|--|--
int|iPlayerID|No Description Set
---
### `int CDOTA_PlayerResource:GetKillsDoneToHero(iPlayerID, iVictimID )`
#### Function Description

#### Parameters
Type|Name|Description
--|--|--
int|iPlayerID|No Description Set
int|iVictimID|No Description Set
---
### `int CDOTA_PlayerResource:GetLastHitMultikill(iPlayerID )`
#### Function Description

#### Parameters
Type|Name|Description
--|--|--
int|iPlayerID|No Description Set
---
### `int CDOTA_PlayerResource:GetLastHitStreak(iPlayerID )`
#### Function Description

#### Parameters
Type|Name|Description
--|--|--
int|iPlayerID|No Description Set
---
### `int CDOTA_PlayerResource:GetLastHits(iPlayerID )`
#### Function Description

#### Parameters
Type|Name|Description
--|--|--
int|iPlayerID|No Description Set
---
### `int CDOTA_PlayerResource:GetLevel(iPlayerID )`
#### Function Description

#### Parameters
Type|Name|Description
--|--|--
int|iPlayerID|No Description Set
---
### `int CDOTA_PlayerResource:GetMisses(iPlayerID )`
#### Function Description

#### Parameters
Type|Name|Description
--|--|--
int|iPlayerID|No Description Set
---
### `int CDOTA_PlayerResource:GetNearbyCreepDeaths(iPlayerID )`
#### Function Description

#### Parameters
Type|Name|Description
--|--|--
int|iPlayerID|No Description Set
---
### `int CDOTA_PlayerResource:GetNetWorth(iPlayerID )`
#### Function Description

#### Parameters
Type|Name|Description
--|--|--
int|iPlayerID|No Description Set
---
### `handle CDOTA_PlayerResource:GetNthCourierForTeam(nCourierIndex, nTeamNumber )`
#### Function Description

#### Parameters
Type|Name|Description
--|--|--
int|nCourierIndex|No Description Set
int|nTeamNumber|No Description Set
---
### `int CDOTA_PlayerResource:GetNthPlayerIDOnTeam(iTeamNumber, iNthPlayer )`
#### Function Description

#### Parameters
Type|Name|Description
--|--|--
int|iTeamNumber|No Description Set
int|iNthPlayer|No Description Set
---
### `int CDOTA_PlayerResource:GetNumConsumablesPurchased(iPlayerID )`
#### Function Description

#### Parameters
Type|Name|Description
--|--|--
int|iPlayerID|No Description Set
---
### `int CDOTA_PlayerResource:GetNumCouriersForTeam(nTeamNumber )`
#### Function Description

#### Parameters
Type|Name|Description
--|--|--
int|nTeamNumber|No Description Set
---
### `int CDOTA_PlayerResource:GetNumItemsPurchased(iPlayerID )`
#### Function Description

#### Parameters
Type|Name|Description
--|--|--
int|iPlayerID|No Description Set
---
### `uint64 CDOTA_PlayerResource:GetPartyID(iPlayerID )`
#### Function Description

#### Parameters
Type|Name|Description
--|--|--
int|iPlayerID|No Description Set
---
### `handle CDOTA_PlayerResource:GetPlayer(iPlayerID )`
#### Function Description

#### Parameters
Type|Name|Description
--|--|--
int|iPlayerID|No Description Set
---
### `int CDOTA_PlayerResource:GetPlayerCount( )`
#### Function Description
Includes spectators and players not assigned to a team
---
### `int CDOTA_PlayerResource:GetPlayerCountForTeam(iTeam )`
#### Function Description

#### Parameters
Type|Name|Description
--|--|--
int|iTeam|No Description Set
---
### `bool CDOTA_PlayerResource:GetPlayerLoadedCompletely(iPlayerID )`
#### Function Description

#### Parameters
Type|Name|Description
--|--|--
int|iPlayerID|No Description Set
---
### `string CDOTA_PlayerResource:GetPlayerName(iPlayerID )`
#### Function Description

#### Parameters
Type|Name|Description
--|--|--
int|iPlayerID|No Description Set
---
### `int CDOTA_PlayerResource:GetRawPlayerDamage(iPlayerID )`
#### Function Description

#### Parameters
Type|Name|Description
--|--|--
int|iPlayerID|No Description Set
---
### `int CDOTA_PlayerResource:GetReliableGold(iPlayerID )`
#### Function Description

#### Parameters
Type|Name|Description
--|--|--
int|iPlayerID|No Description Set
---
### `int CDOTA_PlayerResource:GetRespawnSeconds(iPlayerID )`
#### Function Description

#### Parameters
Type|Name|Description
--|--|--
int|iPlayerID|No Description Set
---
### `int CDOTA_PlayerResource:GetRoshanKills(iPlayerID )`
#### Function Description

#### Parameters
Type|Name|Description
--|--|--
int|iPlayerID|No Description Set
---
### `int CDOTA_PlayerResource:GetRunePickups(iPlayerID )`
#### Function Description

#### Parameters
Type|Name|Description
--|--|--
int|iPlayerID|No Description Set
---
### `handle CDOTA_PlayerResource:GetSelectedHeroEntity(iPlayerID )`
#### Function Description

#### Parameters
Type|Name|Description
--|--|--
int|iPlayerID|No Description Set
---
### `int CDOTA_PlayerResource:GetSelectedHeroID(iPlayerID )`
#### Function Description

#### Parameters
Type|Name|Description
--|--|--
int|iPlayerID|No Description Set
---
### `string CDOTA_PlayerResource:GetSelectedHeroName(iPlayerID )`
#### Function Description

#### Parameters
Type|Name|Description
--|--|--
int|iPlayerID|No Description Set
---
### `unsigned CDOTA_PlayerResource:GetSteamAccountID(iPlayerID )`
#### Function Description

#### Parameters
Type|Name|Description
--|--|--
int|iPlayerID|No Description Set
---
### `uint64 CDOTA_PlayerResource:GetSteamID(iPlayerID )`
#### Function Description
Get the 64 bit steam ID for a given player.
#### Parameters
Type|Name|Description
--|--|--
int|iPlayerID|No Description Set
---
### `int CDOTA_PlayerResource:GetStreak(iPlayerID )`
#### Function Description

#### Parameters
Type|Name|Description
--|--|--
int|iPlayerID|No Description Set
---
### `float CDOTA_PlayerResource:GetStuns(iPlayerID )`
#### Function Description

#### Parameters
Type|Name|Description
--|--|--
int|iPlayerID|No Description Set
---
### `int CDOTA_PlayerResource:GetTeam(iPlayerID )`
#### Function Description

#### Parameters
Type|Name|Description
--|--|--
int|iPlayerID|No Description Set
---
### `int CDOTA_PlayerResource:GetTeamKills(iTeam )`
#### Function Description

#### Parameters
Type|Name|Description
--|--|--
int|iTeam|No Description Set
---
### `int CDOTA_PlayerResource:GetTeamPlayerCount( )`
#### Function Description
Players on a valid team (radiant, dire, or custom*) who haven't abandoned the game
---
### `float CDOTA_PlayerResource:GetTimeOfLastConsumablePurchase(iPlayerID )`
#### Function Description

#### Parameters
Type|Name|Description
--|--|--
int|iPlayerID|No Description Set
---
### `float CDOTA_PlayerResource:GetTimeOfLastDeath(iPlayerID )`
#### Function Description

#### Parameters
Type|Name|Description
--|--|--
int|iPlayerID|No Description Set
---
### `float CDOTA_PlayerResource:GetTimeOfLastItemPurchase(iPlayerID )`
#### Function Description

#### Parameters
Type|Name|Description
--|--|--
int|iPlayerID|No Description Set
---
### `int CDOTA_PlayerResource:GetTotalEarnedGold(iPlayerID )`
#### Function Description

#### Parameters
Type|Name|Description
--|--|--
int|iPlayerID|No Description Set
---
### `int CDOTA_PlayerResource:GetTotalEarnedXP(iPlayerID )`
#### Function Description

#### Parameters
Type|Name|Description
--|--|--
int|iPlayerID|No Description Set
---
### `int CDOTA_PlayerResource:GetTotalGoldSpent(iPlayerID )`
#### Function Description

#### Parameters
Type|Name|Description
--|--|--
int|iPlayerID|No Description Set
---
### `int CDOTA_PlayerResource:GetTowerDamageTaken(iPlayerID, bTotal )`
#### Function Description

#### Parameters
Type|Name|Description
--|--|--
int|iPlayerID|No Description Set
bool|bTotal|No Description Set
---
### `int CDOTA_PlayerResource:GetTowerKills(iPlayerID )`
#### Function Description

#### Parameters
Type|Name|Description
--|--|--
int|iPlayerID|No Description Set
---
### `int CDOTA_PlayerResource:GetUnitShareMaskForPlayer(nPlayerID, nOtherPlayerID )`
#### Function Description

#### Parameters
Type|Name|Description
--|--|--
int|nPlayerID|No Description Set
int|nOtherPlayerID|No Description Set
---
### `int CDOTA_PlayerResource:GetUnreliableGold(iPlayerID )`
#### Function Description

#### Parameters
Type|Name|Description
--|--|--
int|iPlayerID|No Description Set
---
### `float CDOTA_PlayerResource:GetXPPerMin(iPlayerID )`
#### Function Description

#### Parameters
Type|Name|Description
--|--|--
int|iPlayerID|No Description Set
---
### `bool CDOTA_PlayerResource:HasCustomGameTicketForPlayerID(iPlayerID )`
#### Function Description
Does this player have a custom game ticket for this game?
#### Parameters
Type|Name|Description
--|--|--
int|iPlayerID|No Description Set
---
### `bool CDOTA_PlayerResource:HasRandomed(iPlayerID )`
#### Function Description

#### Parameters
Type|Name|Description
--|--|--
int|iPlayerID|No Description Set
---
### `bool CDOTA_PlayerResource:HasSelectedHero(iPlayerID )`
#### Function Description

#### Parameters
Type|Name|Description
--|--|--
int|iPlayerID|No Description Set
---
### `bool CDOTA_PlayerResource:HaveAllPlayersJoined( )`
#### Function Description

---
### `void CDOTA_PlayerResource:IncrementAssists(iPlayerID, iVictimID )`
#### Function Description

#### Parameters
Type|Name|Description
--|--|--
int|iPlayerID|No Description Set
int|iVictimID|No Description Set
---
### `void CDOTA_PlayerResource:IncrementClaimedDenies(iPlayerID )`
#### Function Description

#### Parameters
Type|Name|Description
--|--|--
int|iPlayerID|No Description Set
---
### `void CDOTA_PlayerResource:IncrementClaimedMisses(iPlayerID )`
#### Function Description

#### Parameters
Type|Name|Description
--|--|--
int|iPlayerID|No Description Set
---
### `void CDOTA_PlayerResource:IncrementDeaths(iPlayerID, iKillerID )`
#### Function Description

#### Parameters
Type|Name|Description
--|--|--
int|iPlayerID|No Description Set
int|iKillerID|No Description Set
---
### `void CDOTA_PlayerResource:IncrementDenies(iPlayerID )`
#### Function Description

#### Parameters
Type|Name|Description
--|--|--
int|iPlayerID|No Description Set
---
### `void CDOTA_PlayerResource:IncrementKills(iPlayerID, iVictimID )`
#### Function Description

#### Parameters
Type|Name|Description
--|--|--
int|iPlayerID|No Description Set
int|iVictimID|No Description Set
---
### `void CDOTA_PlayerResource:IncrementLastHitMultikill(iPlayerID )`
#### Function Description

#### Parameters
Type|Name|Description
--|--|--
int|iPlayerID|No Description Set
---
### `void CDOTA_PlayerResource:IncrementLastHitStreak(iPlayerID )`
#### Function Description

#### Parameters
Type|Name|Description
--|--|--
int|iPlayerID|No Description Set
---
### `void CDOTA_PlayerResource:IncrementLastHits(iPlayerID )`
#### Function Description

#### Parameters
Type|Name|Description
--|--|--
int|iPlayerID|No Description Set
---
### `void CDOTA_PlayerResource:IncrementMisses(iPlayerID )`
#### Function Description

#### Parameters
Type|Name|Description
--|--|--
int|iPlayerID|No Description Set
---
### `void CDOTA_PlayerResource:IncrementNearbyCreepDeaths(iPlayerID )`
#### Function Description

#### Parameters
Type|Name|Description
--|--|--
int|iPlayerID|No Description Set
---
### `void CDOTA_PlayerResource:IncrementStreak(iPlayerID )`
#### Function Description

#### Parameters
Type|Name|Description
--|--|--
int|iPlayerID|No Description Set
---
### `void CDOTA_PlayerResource:IncrementTotalEarnedXP(iPlayerID, iXP, nReason )`
#### Function Description

#### Parameters
Type|Name|Description
--|--|--
int|iPlayerID|No Description Set
int|iXP|No Description Set
int|nReason|No Description Set
---
### `bool CDOTA_PlayerResource:IsBroadcaster(iPlayerID )`
#### Function Description

#### Parameters
Type|Name|Description
--|--|--
int|iPlayerID|No Description Set
---
### `bool CDOTA_PlayerResource:IsDisableHelpSetForPlayerID(nPlayerID, nOtherPlayerID )`
#### Function Description

#### Parameters
Type|Name|Description
--|--|--
int|nPlayerID|No Description Set
int|nOtherPlayerID|No Description Set
---
### `bool CDOTA_PlayerResource:IsFakeClient(iPlayerID )`
#### Function Description

#### Parameters
Type|Name|Description
--|--|--
int|iPlayerID|No Description Set
---
### `bool CDOTA_PlayerResource:IsHeroSelected(pHeroname )`
#### Function Description

#### Parameters
Type|Name|Description
--|--|--
string|pHeroname|No Description Set
---
### `bool CDOTA_PlayerResource:IsHeroSharedWithPlayerID(nUnitOwnerPlayerID, nOtherPlayerID )`
#### Function Description

#### Parameters
Type|Name|Description
--|--|--
int|nUnitOwnerPlayerID|No Description Set
int|nOtherPlayerID|No Description Set
---
### `bool CDOTA_PlayerResource:IsValidPlayer(iPlayerID )`
#### Function Description

#### Parameters
Type|Name|Description
--|--|--
int|iPlayerID|No Description Set
---
### `bool CDOTA_PlayerResource:IsValidPlayerID(iPlayerID )`
#### Function Description

#### Parameters
Type|Name|Description
--|--|--
int|iPlayerID|No Description Set
---
### `bool CDOTA_PlayerResource:IsValidTeamPlayer(iPlayerID )`
#### Function Description

#### Parameters
Type|Name|Description
--|--|--
int|iPlayerID|No Description Set
---
### `bool CDOTA_PlayerResource:IsValidTeamPlayerID(iPlayerID )`
#### Function Description

#### Parameters
Type|Name|Description
--|--|--
int|iPlayerID|No Description Set
---
### `int CDOTA_PlayerResource:ModifyGold(iPlayerID, iGoldChange, bReliable, nReason )`
#### Function Description

#### Parameters
Type|Name|Description
--|--|--
int|iPlayerID|No Description Set
int|iGoldChange|No Description Set
bool|bReliable|No Description Set
int|nReason|No Description Set
---
### `int CDOTA_PlayerResource:NumPlayers( )`
#### Function Description

---
### `int CDOTA_PlayerResource:NumTeamPlayers( )`
#### Function Description

---
### `void CDOTA_PlayerResource:RecordConsumableAbilityChargeChange(iPlayerID, item_definition_index, nChargeIncrementOrDecrement )`
#### Function Description
Increment or decrement consumable charges (nPlayerID, item_definition_index, nChargeIncrementOrDecrement)
#### Parameters
Type|Name|Description
--|--|--
int|iPlayerID|No Description Set
int|item_definition_index|No Description Set
int|nChargeIncrementOrDecrement|No Description Set
---
### `handle CDOTA_PlayerResource:ReplaceHeroWith(iPlayerID, pszHeroClass, nGold, nXP )`
#### Function Description
(playerID, heroClassName, gold, XP) - replaces the player's hero with a new one of the specified class, gold and XP
#### Parameters
Type|Name|Description
--|--|--
int|iPlayerID|No Description Set
string|pszHeroClass|No Description Set
int|nGold|No Description Set
int|nXP|No Description Set
---
### `void CDOTA_PlayerResource:ResetBuybackCostTime(nPlayerID )`
#### Function Description

#### Parameters
Type|Name|Description
--|--|--
int|nPlayerID|No Description Set
---
### `void CDOTA_PlayerResource:ResetTotalEarnedGold(iPlayerID )`
#### Function Description

#### Parameters
Type|Name|Description
--|--|--
int|iPlayerID|No Description Set
---
### `void CDOTA_PlayerResource:SetBuybackCooldownTime(nPlayerID, flBuybackCooldown )`
#### Function Description

#### Parameters
Type|Name|Description
--|--|--
int|nPlayerID|No Description Set
float|flBuybackCooldown|No Description Set
---
### `void CDOTA_PlayerResource:SetBuybackGoldLimitTime(nPlayerID, flBuybackCooldown )`
#### Function Description

#### Parameters
Type|Name|Description
--|--|--
int|nPlayerID|No Description Set
float|flBuybackCooldown|No Description Set
---
### `void CDOTA_PlayerResource:SetCameraTarget(nPlayerID, hTarget )`
#### Function Description
(playerID, entity) - force the given player's camera to follow the given entity
#### Parameters
Type|Name|Description
--|--|--
int|nPlayerID|No Description Set
handle|hTarget|No Description Set
---
### `void CDOTA_PlayerResource:SetCanRepick(iPlayerID, bCanRepick )`
#### Function Description

#### Parameters
Type|Name|Description
--|--|--
int|iPlayerID|No Description Set
bool|bCanRepick|No Description Set
---
### `void CDOTA_PlayerResource:SetCustomBuybackCooldown(iPlayerID, flCooldownTime )`
#### Function Description
Set the buyback cooldown for this player.
#### Parameters
Type|Name|Description
--|--|--
int|iPlayerID|No Description Set
float|flCooldownTime|No Description Set
---
### `void CDOTA_PlayerResource:SetCustomBuybackCost(iPlayerID, iGoldCost )`
#### Function Description
Set the buyback cost for this player.
#### Parameters
Type|Name|Description
--|--|--
int|iPlayerID|No Description Set
int|iGoldCost|No Description Set
---
### `void CDOTA_PlayerResource:SetCustomPlayerColor(iPlayerID, r, g, b )`
#### Function Description
Set custom color for player (minimap, scoreboard, etc)
#### Parameters
Type|Name|Description
--|--|--
int|iPlayerID|No Description Set
int|r|No Description Set
int|g|No Description Set
int|b|No Description Set
---
### `void CDOTA_PlayerResource:SetCustomTeamAssignment(iPlayerID, iTeamAssignment )`
#### Function Description
Set custom team assignment for this player.
#### Parameters
Type|Name|Description
--|--|--
int|iPlayerID|No Description Set
int|iTeamAssignment|No Description Set
---
### `void CDOTA_PlayerResource:SetGold(iPlayerID, iGold, bReliable )`
#### Function Description

#### Parameters
Type|Name|Description
--|--|--
int|iPlayerID|No Description Set
int|iGold|No Description Set
bool|bReliable|No Description Set
---
### `void CDOTA_PlayerResource:SetHasRandomed(iPlayerID )`
#### Function Description

#### Parameters
Type|Name|Description
--|--|--
int|iPlayerID|No Description Set
---
### `void CDOTA_PlayerResource:SetLastBuybackTime(iPlayerID, iLastBuybackTime )`
#### Function Description

#### Parameters
Type|Name|Description
--|--|--
int|iPlayerID|No Description Set
int|iLastBuybackTime|No Description Set
---
### `void CDOTA_PlayerResource:SetOverrideSelectionEntity(nPlayerID, hEntity )`
#### Function Description
Set the forced selection entity for a player.
#### Parameters
Type|Name|Description
--|--|--
int|nPlayerID|No Description Set
handle|hEntity|No Description Set
---
### `void CDOTA_PlayerResource:SetUnitShareMaskForPlayer(nPlayerID, nOtherPlayerID, nFlag, bState )`
#### Function Description

#### Parameters
Type|Name|Description
--|--|--
int|nPlayerID|No Description Set
int|nOtherPlayerID|No Description Set
int|nFlag|No Description Set
bool|bState|No Description Set
---
### `void CDOTA_PlayerResource:SpendGold(iPlayerID, iCost, iReason )`
#### Function Description

#### Parameters
Type|Name|Description
--|--|--
int|iPlayerID|No Description Set
int|iCost|No Description Set
int|iReason|No Description Set
---
### `void CDOTA_PlayerResource:UpdateTeamSlot(iPlayerID, iTeamNumber, desiredSlot )`
#### Function Description

#### Parameters
Type|Name|Description
--|--|--
int|iPlayerID|No Description Set
int|iTeamNumber|No Description Set
int|desiredSlot|No Description Set
---
### `int CDOTA_PlayerResource:WhoSelectedHero(pHeroFilename )`
#### Function Description

#### Parameters
Type|Name|Description
--|--|--
string|pHeroFilename|No Description Set
---
## **CDOTA_ShopTrigger**
---
### `int CDOTA_ShopTrigger:GetShopType( )`
#### Function Description
Get the DOTA_SHOP_TYPE
---
### `void CDOTA_ShopTrigger:SetShopType(eShopType )`
#### Function Description
Set the DOTA_SHOP_TYPE.
#### Parameters
Type|Name|Description
--|--|--
int|eShopType|No Description Set
---
## **CDOTA_SimpleObstruction**
---
### `bool CDOTA_SimpleObstruction:IsEnabled( )`
#### Function Description
Returns whether the obstruction is currently active
---
### `void CDOTA_SimpleObstruction:SetEnabled(bEnabled, bForce )`
#### Function Description
Enable or disable the obstruction
#### Parameters
Type|Name|Description
--|--|--
bool|bEnabled|No Description Set
bool|bForce|No Description Set
---
## **CDOTA_Unit_Nian**
---
### `handle CDOTA_Unit_Nian:GetHorn( )`
#### Function Description
Is the Nian horn?
---
### `handle CDOTA_Unit_Nian:GetTail( )`
#### Function Description
Is the Nian's tail broken?
---
### `bool CDOTA_Unit_Nian:IsHornAlive( )`
#### Function Description
Is the Nian's horn broken?
---
### `bool CDOTA_Unit_Nian:IsTailAlive( )`
#### Function Description
Is the Nian's tail broken?
---
## **CDebugOverlayScriptHelper**
---
### `void CDebugOverlayScriptHelper:Axis(Vector_1, Quaternion_2, float_3, bool_4, float_5 )`
#### Function Description
Draws an axis. Specify origin + orientation in world space.
#### Parameters
Type|Name|Description
--|--|--
Vector|Vector_1|No Description Set
Quaternion|Quaternion_2|No Description Set
float|float_3|No Description Set
bool|bool_4|No Description Set
float|float_5|No Description Set
---
### `void CDebugOverlayScriptHelper:Box(Vector_1, Vector_2, int_3, int_4, int_5, int_6, bool_7, float_8 )`
#### Function Description
Draws a world-space axis-aligned box. Specify bounds in world space.
#### Parameters
Type|Name|Description
--|--|--
Vector|Vector_1|No Description Set
Vector|Vector_2|No Description Set
int|int_3|No Description Set
int|int_4|No Description Set
int|int_5|No Description Set
int|int_6|No Description Set
bool|bool_7|No Description Set
float|float_8|No Description Set
---
### `void CDebugOverlayScriptHelper:BoxAngles(Vector_1, Vector_2, Vector_3, Quaternion_4, int_5, int_6, int_7, int_8, bool_9, float_10 )`
#### Function Description
Draws an oriented box at the origin. Specify bounds in local space.
#### Parameters
Type|Name|Description
--|--|--
Vector|Vector_1|No Description Set
Vector|Vector_2|No Description Set
Vector|Vector_3|No Description Set
Quaternion|Quaternion_4|No Description Set
int|int_5|No Description Set
int|int_6|No Description Set
int|int_7|No Description Set
int|int_8|No Description Set
bool|bool_9|No Description Set
float|float_10|No Description Set
---
### `void CDebugOverlayScriptHelper:Capsule(Vector_1, Quaternion_2, float_3, float_4, int_5, int_6, int_7, int_8, bool_9, float_10 )`
#### Function Description
Draws a capsule. Specify base in world space.
#### Parameters
Type|Name|Description
--|--|--
Vector|Vector_1|No Description Set
Quaternion|Quaternion_2|No Description Set
float|float_3|No Description Set
float|float_4|No Description Set
int|int_5|No Description Set
int|int_6|No Description Set
int|int_7|No Description Set
int|int_8|No Description Set
bool|bool_9|No Description Set
float|float_10|No Description Set
---
### `void CDebugOverlayScriptHelper:Circle(Vector_1, Quaternion_2, float_3, int_4, int_5, int_6, int_7, bool_8, float_9 )`
#### Function Description
Draws a circle. Specify center in world space.
#### Parameters
Type|Name|Description
--|--|--
Vector|Vector_1|No Description Set
Quaternion|Quaternion_2|No Description Set
float|float_3|No Description Set
int|int_4|No Description Set
int|int_5|No Description Set
int|int_6|No Description Set
int|int_7|No Description Set
bool|bool_8|No Description Set
float|float_9|No Description Set
---
### `void CDebugOverlayScriptHelper:CircleScreenOriented(Vector_1, float_2, int_3, int_4, int_5, int_6, bool_7, float_8 )`
#### Function Description
Draws a circle oriented to the screen. Specify center in world space.
#### Parameters
Type|Name|Description
--|--|--
Vector|Vector_1|No Description Set
float|float_2|No Description Set
int|int_3|No Description Set
int|int_4|No Description Set
int|int_5|No Description Set
int|int_6|No Description Set
bool|bool_7|No Description Set
float|float_8|No Description Set
---
### `void CDebugOverlayScriptHelper:Cone(Vector_1, Vector_2, float_3, float_4, int_5, int_6, int_7, int_8, bool_9, float_10 )`
#### Function Description
Draws a wireframe cone. Specify endpoint and direction in world space.
#### Parameters
Type|Name|Description
--|--|--
Vector|Vector_1|No Description Set
Vector|Vector_2|No Description Set
float|float_3|No Description Set
float|float_4|No Description Set
int|int_5|No Description Set
int|int_6|No Description Set
int|int_7|No Description Set
int|int_8|No Description Set
bool|bool_9|No Description Set
float|float_10|No Description Set
---
### `void CDebugOverlayScriptHelper:Cross(Vector_1, float_2, int_3, int_4, int_5, int_6, bool_7, float_8 )`
#### Function Description
Draws a screen-aligned cross. Specify origin in world space.
#### Parameters
Type|Name|Description
--|--|--
Vector|Vector_1|No Description Set
float|float_2|No Description Set
int|int_3|No Description Set
int|int_4|No Description Set
int|int_5|No Description Set
int|int_6|No Description Set
bool|bool_7|No Description Set
float|float_8|No Description Set
---
### `void CDebugOverlayScriptHelper:Cross3D(Vector_1, float_2, int_3, int_4, int_5, int_6, bool_7, float_8 )`
#### Function Description
Draws a world-aligned cross. Specify origin in world space.
#### Parameters
Type|Name|Description
--|--|--
Vector|Vector_1|No Description Set
float|float_2|No Description Set
int|int_3|No Description Set
int|int_4|No Description Set
int|int_5|No Description Set
int|int_6|No Description Set
bool|bool_7|No Description Set
float|float_8|No Description Set
---
### `void CDebugOverlayScriptHelper:Cross3DOriented(Vector_1, Quaternion_2, float_3, int_4, int_5, int_6, int_7, bool_8, float_9 )`
#### Function Description
Draws an oriented cross. Specify origin in world space.
#### Parameters
Type|Name|Description
--|--|--
Vector|Vector_1|No Description Set
Quaternion|Quaternion_2|No Description Set
float|float_3|No Description Set
int|int_4|No Description Set
int|int_5|No Description Set
int|int_6|No Description Set
int|int_7|No Description Set
bool|bool_8|No Description Set
float|float_9|No Description Set
---
### `void CDebugOverlayScriptHelper:DrawTickMarkedLine(Vector_1, Vector_2, float_3, int_4, int_5, int_6, int_7, int_8, bool_9, float_10 )`
#### Function Description
Draws a dashed line. Specify endpoints in world space.
#### Parameters
Type|Name|Description
--|--|--
Vector|Vector_1|No Description Set
Vector|Vector_2|No Description Set
float|float_3|No Description Set
int|int_4|No Description Set
int|int_5|No Description Set
int|int_6|No Description Set
int|int_7|No Description Set
int|int_8|No Description Set
bool|bool_9|No Description Set
float|float_10|No Description Set
---
### `void CDebugOverlayScriptHelper:EntityAttachments(ehandle_1, float_2, float_3 )`
#### Function Description
Draws the attachments of the entity
#### Parameters
Type|Name|Description
--|--|--
ehandle|ehandle_1|No Description Set
float|float_2|No Description Set
float|float_3|No Description Set
---
### `void CDebugOverlayScriptHelper:EntityAxis(ehandle_1, float_2, bool_3, float_4 )`
#### Function Description
Draws the axis of the entity origin
#### Parameters
Type|Name|Description
--|--|--
ehandle|ehandle_1|No Description Set
float|float_2|No Description Set
bool|bool_3|No Description Set
float|float_4|No Description Set
---
### `void CDebugOverlayScriptHelper:EntityBounds(ehandle_1, int_2, int_3, int_4, int_5, bool_6, float_7 )`
#### Function Description
Draws bounds of an entity
#### Parameters
Type|Name|Description
--|--|--
ehandle|ehandle_1|No Description Set
int|int_2|No Description Set
int|int_3|No Description Set
int|int_4|No Description Set
int|int_5|No Description Set
bool|bool_6|No Description Set
float|float_7|No Description Set
---
### `void CDebugOverlayScriptHelper:EntitySkeleton(ehandle_1, float_2 )`
#### Function Description
Draws the skeleton of the entity
#### Parameters
Type|Name|Description
--|--|--
ehandle|ehandle_1|No Description Set
float|float_2|No Description Set
---
### `void CDebugOverlayScriptHelper:EntityText(ehandle_1, int_2, string_3, int_4, int_5, int_6, int_7, float_8 )`
#### Function Description
Draws text on an entity
#### Parameters
Type|Name|Description
--|--|--
ehandle|ehandle_1|No Description Set
int|int_2|No Description Set
string|string_3|No Description Set
int|int_4|No Description Set
int|int_5|No Description Set
int|int_6|No Description Set
int|int_7|No Description Set
float|float_8|No Description Set
---
### `void CDebugOverlayScriptHelper:FilledRect2D(Vector2D_1, Vector2D_2, int_3, int_4, int_5, int_6, float_7 )`
#### Function Description
Draws a screen-space filled 2D rectangle. Coordinates are in pixels.
#### Parameters
Type|Name|Description
--|--|--
Vector2D|Vector2D_1|No Description Set
Vector2D|Vector2D_2|No Description Set
int|int_3|No Description Set
int|int_4|No Description Set
int|int_5|No Description Set
int|int_6|No Description Set
float|float_7|No Description Set
---
### `void CDebugOverlayScriptHelper:HorzArrow(Vector_1, Vector_2, float_3, int_4, int_5, int_6, int_7, bool_8, float_9 )`
#### Function Description
Draws a horizontal arrow. Specify endpoints in world space.
#### Parameters
Type|Name|Description
--|--|--
Vector|Vector_1|No Description Set
Vector|Vector_2|No Description Set
float|float_3|No Description Set
int|int_4|No Description Set
int|int_5|No Description Set
int|int_6|No Description Set
int|int_7|No Description Set
bool|bool_8|No Description Set
float|float_9|No Description Set
---
### `void CDebugOverlayScriptHelper:Line(Vector_1, Vector_2, int_3, int_4, int_5, int_6, bool_7, float_8 )`
#### Function Description
Draws a line between two points
#### Parameters
Type|Name|Description
--|--|--
Vector|Vector_1|No Description Set
Vector|Vector_2|No Description Set
int|int_3|No Description Set
int|int_4|No Description Set
int|int_5|No Description Set
int|int_6|No Description Set
bool|bool_7|No Description Set
float|float_8|No Description Set
---
### `void CDebugOverlayScriptHelper:Line2D(Vector2D_1, Vector2D_2, int_3, int_4, int_5, int_6, float_7 )`
#### Function Description
Draws a line between two points in screenspace
#### Parameters
Type|Name|Description
--|--|--
Vector2D|Vector2D_1|No Description Set
Vector2D|Vector2D_2|No Description Set
int|int_3|No Description Set
int|int_4|No Description Set
int|int_5|No Description Set
int|int_6|No Description Set
float|float_7|No Description Set
---
### `void CDebugOverlayScriptHelper:PopDebugOverlayScope( )`
#### Function Description
Pops the identifier used to group overlays. Overlays marked with this identifier can be deleted in a big batch.
---
### `void CDebugOverlayScriptHelper:PushAndClearDebugOverlayScope(utlstringtoken_1 )`
#### Function Description
Pushes an identifier used to group overlays. Deletes all existing overlays using this overlay id.
#### Parameters
Type|Name|Description
--|--|--
utlstringtoken|utlstringtoken_1|No Description Set
---
### `void CDebugOverlayScriptHelper:PushDebugOverlayScope(utlstringtoken_1 )`
#### Function Description
Pushes an identifier used to group overlays. Overlays marked with this identifier can be deleted in a big batch.
#### Parameters
Type|Name|Description
--|--|--
utlstringtoken|utlstringtoken_1|No Description Set
---
### `void CDebugOverlayScriptHelper:RemoveAllInScope(utlstringtoken_1 )`
#### Function Description
Removes all overlays marked with a specific identifier, regardless of their lifetime.
#### Parameters
Type|Name|Description
--|--|--
utlstringtoken|utlstringtoken_1|No Description Set
---
### `void CDebugOverlayScriptHelper:SolidCone(Vector_1, Vector_2, float_3, float_4, int_5, int_6, int_7, int_8, bool_9, float_10 )`
#### Function Description
Draws a solid cone. Specify endpoint and direction in world space.
#### Parameters
Type|Name|Description
--|--|--
Vector|Vector_1|No Description Set
Vector|Vector_2|No Description Set
float|float_3|No Description Set
float|float_4|No Description Set
int|int_5|No Description Set
int|int_6|No Description Set
int|int_7|No Description Set
int|int_8|No Description Set
bool|bool_9|No Description Set
float|float_10|No Description Set
---
### `void CDebugOverlayScriptHelper:Sphere(Vector_1, float_2, int_3, int_4, int_5, int_6, bool_7, float_8 )`
#### Function Description
Draws a wireframe sphere. Specify center in world space.
#### Parameters
Type|Name|Description
--|--|--
Vector|Vector_1|No Description Set
float|float_2|No Description Set
int|int_3|No Description Set
int|int_4|No Description Set
int|int_5|No Description Set
int|int_6|No Description Set
bool|bool_7|No Description Set
float|float_8|No Description Set
---
### `void CDebugOverlayScriptHelper:SweptBox(Vector_1, Vector_2, Vector_3, Vector_4, Quaternion_5, int_6, int_7, int_8, int_9, float_10 )`
#### Function Description
Draws a swept box. Specify endpoints in world space and the bounds in local space.
#### Parameters
Type|Name|Description
--|--|--
Vector|Vector_1|No Description Set
Vector|Vector_2|No Description Set
Vector|Vector_3|No Description Set
Vector|Vector_4|No Description Set
Quaternion|Quaternion_5|No Description Set
int|int_6|No Description Set
int|int_7|No Description Set
int|int_8|No Description Set
int|int_9|No Description Set
float|float_10|No Description Set
---
### `void CDebugOverlayScriptHelper:Text(Vector_1, int_2, string_3, float_4, int_5, int_6, int_7, int_8, float_9 )`
#### Function Description
Draws 2D text. Specify origin in world space.
#### Parameters
Type|Name|Description
--|--|--
Vector|Vector_1|No Description Set
int|int_2|No Description Set
string|string_3|No Description Set
float|float_4|No Description Set
int|int_5|No Description Set
int|int_6|No Description Set
int|int_7|No Description Set
int|int_8|No Description Set
float|float_9|No Description Set
---
### `void CDebugOverlayScriptHelper:Texture(string_1, Vector2D_2, Vector2D_3, int_4, int_5, int_6, int_7, Vector2D_8, Vector2D_9, float_10 )`
#### Function Description
Draws a screen-space texture. Coordinates are in pixels.
#### Parameters
Type|Name|Description
--|--|--
string|string_1|No Description Set
Vector2D|Vector2D_2|No Description Set
Vector2D|Vector2D_3|No Description Set
int|int_4|No Description Set
int|int_5|No Description Set
int|int_6|No Description Set
int|int_7|No Description Set
Vector2D|Vector2D_8|No Description Set
Vector2D|Vector2D_9|No Description Set
float|float_10|No Description Set
---
### `void CDebugOverlayScriptHelper:Triangle(Vector_1, Vector_2, Vector_3, int_4, int_5, int_6, int_7, bool_8, float_9 )`
#### Function Description
Draws a filled triangle. Specify vertices in world space.
#### Parameters
Type|Name|Description
--|--|--
Vector|Vector_1|No Description Set
Vector|Vector_2|No Description Set
Vector|Vector_3|No Description Set
int|int_4|No Description Set
int|int_5|No Description Set
int|int_6|No Description Set
int|int_7|No Description Set
bool|bool_8|No Description Set
float|float_9|No Description Set
---
### `void CDebugOverlayScriptHelper:UnitTestCycleOverlayRenderType( )`
#### Function Description
Toggles the overlay render type, for unit tests
---
### `void CDebugOverlayScriptHelper:VectorText3D(Vector_1, Quaternion_2, string_3, int_4, int_5, int_6, int_7, bool_8, float_9 )`
#### Function Description
Draws 3D text. Specify origin + orientation in world space.
#### Parameters
Type|Name|Description
--|--|--
Vector|Vector_1|No Description Set
Quaternion|Quaternion_2|No Description Set
string|string_3|No Description Set
int|int_4|No Description Set
int|int_5|No Description Set
int|int_6|No Description Set
int|int_7|No Description Set
bool|bool_8|No Description Set
float|float_9|No Description Set
---
### `void CDebugOverlayScriptHelper:VertArrow(Vector_1, Vector_2, float_3, int_4, int_5, int_6, int_7, bool_8, float_9 )`
#### Function Description
Draws a vertical arrow. Specify endpoints in world space.
#### Parameters
Type|Name|Description
--|--|--
Vector|Vector_1|No Description Set
Vector|Vector_2|No Description Set
float|float_3|No Description Set
int|int_4|No Description Set
int|int_5|No Description Set
int|int_6|No Description Set
int|int_7|No Description Set
bool|bool_8|No Description Set
float|float_9|No Description Set
---
### `void CDebugOverlayScriptHelper:YawArrow(Vector_1, float_2, float_3, float_4, int_5, int_6, int_7, int_8, bool_9, float_10 )`
#### Function Description
Draws a arrow associated with a specific yaw. Specify endpoints in world space.
#### Parameters
Type|Name|Description
--|--|--
Vector|Vector_1|No Description Set
float|float_2|No Description Set
float|float_3|No Description Set
float|float_4|No Description Set
int|int_5|No Description Set
int|int_6|No Description Set
int|int_7|No Description Set
int|int_8|No Description Set
bool|bool_9|No Description Set
float|float_10|No Description Set
---
## **CDotaQuest**
---
### `void CDotaQuest:AddSubquest(hSubquest )`
#### Function Description
Add a subquest to this quest
#### Parameters
Type|Name|Description
--|--|--
handle|hSubquest|No Description Set
---
### `void CDotaQuest:CompleteQuest( )`
#### Function Description
Mark this quest complete
---
### `handle CDotaQuest:GetSubquest(nIndex )`
#### Function Description
Finds a subquest from this quest by index
#### Parameters
Type|Name|Description
--|--|--
int|nIndex|No Description Set
---
### `handle CDotaQuest:GetSubquestByName(pszName )`
#### Function Description
Finds a subquest from this quest by name
#### Parameters
Type|Name|Description
--|--|--
string|pszName|No Description Set
---
### `void CDotaQuest:RemoveSubquest(hSubquest )`
#### Function Description
Remove a subquest from this quest
#### Parameters
Type|Name|Description
--|--|--
handle|hSubquest|No Description Set
---
### `void CDotaQuest:SetTextReplaceString(pszString )`
#### Function Description
Set the text replace string for this quest
#### Parameters
Type|Name|Description
--|--|--
string|pszString|No Description Set
---
### `void CDotaQuest:SetTextReplaceValue(valueSlot, value )`
#### Function Description
Set a quest value
#### Parameters
Type|Name|Description
--|--|--
int|valueSlot|No Description Set
int|value|No Description Set
---
## **CDotaSubquestBase**
---
### `void CDotaSubquestBase:CompleteSubquest( )`
#### Function Description
Mark this subquest complete
---
### `void CDotaSubquestBase:SetTextReplaceString(pszString )`
#### Function Description
Set the text replace string for this subquest
#### Parameters
Type|Name|Description
--|--|--
string|pszString|No Description Set
---
### `void CDotaSubquestBase:SetTextReplaceValue(valueSlot, value )`
#### Function Description
Set a subquest value
#### Parameters
Type|Name|Description
--|--|--
int|valueSlot|No Description Set
int|value|No Description Set
---
## **CEntities**
---
### `handle CEntities:CreateByClassname(string_1 )`
#### Function Description
Creates an entity by classname
#### Parameters
Type|Name|Description
--|--|--
string|string_1|No Description Set
---
### `table CEntities:FindAllByClassname(string_1 )`
#### Function Description
Finds all entities by class name. Returns an array containing all the found entities.
#### Parameters
Type|Name|Description
--|--|--
string|string_1|No Description Set
---
### `table CEntities:FindAllByClassnameWithin(string_1, Vector_2, float_3 )`
#### Function Description
Find entities by class name within a radius.
#### Parameters
Type|Name|Description
--|--|--
string|string_1|No Description Set
Vector|Vector_2|No Description Set
float|float_3|No Description Set
---
### `table CEntities:FindAllByModel(string_1 )`
#### Function Description
Find entities by model name.
#### Parameters
Type|Name|Description
--|--|--
string|string_1|No Description Set
---
### `table CEntities:FindAllByName(string_1 )`
#### Function Description
Find all entities by name. Returns an array containing all the found entities in it.
#### Parameters
Type|Name|Description
--|--|--
string|string_1|No Description Set
---
### `table CEntities:FindAllByNameWithin(string_1, Vector_2, float_3 )`
#### Function Description
Find entities by name within a radius.
#### Parameters
Type|Name|Description
--|--|--
string|string_1|No Description Set
Vector|Vector_2|No Description Set
float|float_3|No Description Set
---
### `table CEntities:FindAllByTarget(string_1 )`
#### Function Description
Find entities by targetname.
#### Parameters
Type|Name|Description
--|--|--
string|string_1|No Description Set
---
### `table CEntities:FindAllInSphere(Vector_1, float_2 )`
#### Function Description
Find entities within a radius.
#### Parameters
Type|Name|Description
--|--|--
Vector|Vector_1|No Description Set
float|float_2|No Description Set
---
### `handle CEntities:FindByClassname(handle_1, string_2 )`
#### Function Description
Find entities by class name. Pass 'null' to start an iteration, or reference to a previously found entity to continue a search
#### Parameters
Type|Name|Description
--|--|--
handle|handle_1|No Description Set
string|string_2|No Description Set
---
### `handle CEntities:FindByClassnameNearest(string_1, Vector_2, float_3 )`
#### Function Description
Find entities by class name nearest to a point.
#### Parameters
Type|Name|Description
--|--|--
string|string_1|No Description Set
Vector|Vector_2|No Description Set
float|float_3|No Description Set
---
### `handle CEntities:FindByClassnameWithin(handle_1, string_2, Vector_3, float_4 )`
#### Function Description
Find entities by class name within a radius. Pass 'null' to start an iteration, or reference to a previously found entity to continue a search
#### Parameters
Type|Name|Description
--|--|--
handle|handle_1|No Description Set
string|string_2|No Description Set
Vector|Vector_3|No Description Set
float|float_4|No Description Set
---
### `handle CEntities:FindByModel(handle_1, string_2 )`
#### Function Description
Find entities by model name. Pass 'null' to start an iteration, or reference to a previously found entity to continue a search
#### Parameters
Type|Name|Description
--|--|--
handle|handle_1|No Description Set
string|string_2|No Description Set
---
### `handle CEntities:FindByModelWithin(handle_1, string_2, Vector_3, float_4 )`
#### Function Description
Find entities by model name within a radius. Pass 'null' to start an iteration, or reference to a previously found entity to continue a search
#### Parameters
Type|Name|Description
--|--|--
handle|handle_1|No Description Set
string|string_2|No Description Set
Vector|Vector_3|No Description Set
float|float_4|No Description Set
---
### `handle CEntities:FindByName(handle_1, string_2 )`
#### Function Description
Find entities by name. Pass 'null' to start an iteration, or reference to a previously found entity to continue a search
#### Parameters
Type|Name|Description
--|--|--
handle|handle_1|No Description Set
string|string_2|No Description Set
---
### `handle CEntities:FindByNameNearest(string_1, Vector_2, float_3 )`
#### Function Description
Find entities by name nearest to a point.
#### Parameters
Type|Name|Description
--|--|--
string|string_1|No Description Set
Vector|Vector_2|No Description Set
float|float_3|No Description Set
---
### `handle CEntities:FindByNameWithin(handle_1, string_2, Vector_3, float_4 )`
#### Function Description
Find entities by name within a radius. Pass 'null' to start an iteration, or reference to a previously found entity to continue a search
#### Parameters
Type|Name|Description
--|--|--
handle|handle_1|No Description Set
string|string_2|No Description Set
Vector|Vector_3|No Description Set
float|float_4|No Description Set
---
### `handle CEntities:FindByTarget(handle_1, string_2 )`
#### Function Description
Find entities by targetname. Pass 'null' to start an iteration, or reference to a previously found entity to continue a search
#### Parameters
Type|Name|Description
--|--|--
handle|handle_1|No Description Set
string|string_2|No Description Set
---
### `handle CEntities:FindInSphere(handle_1, Vector_2, float_3 )`
#### Function Description
Find entities within a radius. Pass 'null' to start an iteration, or reference to a previously found entity to continue a search
#### Parameters
Type|Name|Description
--|--|--
handle|handle_1|No Description Set
Vector|Vector_2|No Description Set
float|float_3|No Description Set
---
### `handle CEntities:First( )`
#### Function Description
Begin an iteration over the list of entities
---
### `handle CEntities:GetLocalPlayer( )`
#### Function Description
Get the local player.
---
### `handle CEntities:Next(handle_1 )`
#### Function Description
Continue an iteration over the list of entities, providing reference to a previously found entity
#### Parameters
Type|Name|Description
--|--|--
handle|handle_1|No Description Set
---
## **CEntityInstance**
---
### `void CEntityInstance:ConnectOutput(string_1, string_2 )`
#### Function Description
Adds an I/O connection that will call the named function on this entity when the specified output fires.
#### Parameters
Type|Name|Description
--|--|--
string|string_1|No Description Set
string|string_2|No Description Set
---
### `void CEntityInstance:Destroy( )`
#### Function Description

---
### `void CEntityInstance:DisconnectOutput(string_1, string_2 )`
#### Function Description
Removes a connected script function from an I/O event on this entity.
#### Parameters
Type|Name|Description
--|--|--
string|string_1|No Description Set
string|string_2|No Description Set
---
### `void CEntityInstance:DisconnectRedirectedOutput(string_1, string_2, handle_3 )`
#### Function Description
Removes a connected script function from an I/O event on the passed entity.
#### Parameters
Type|Name|Description
--|--|--
string|string_1|No Description Set
string|string_2|No Description Set
handle|handle_3|No Description Set
---
### `void CEntityInstance:FireOutput(string_1, handle_2, handle_3, table_4, float_5 )`
#### Function Description
Fire an entity output
#### Parameters
Type|Name|Description
--|--|--
string|string_1|No Description Set
handle|handle_2|No Description Set
handle|handle_3|No Description Set
table|table_4|No Description Set
float|float_5|No Description Set
---
### `string CEntityInstance:GetClassname( )`
#### Function Description

---
### `string CEntityInstance:GetDebugName( )`
#### Function Description
Get the entity name w/help if not defined (i.e. classname/etc)
---
### `ehandle CEntityInstance:GetEntityHandle( )`
#### Function Description
Get the entity as an EHANDLE
---
### `int CEntityInstance:GetEntityIndex( )`
#### Function Description

---
### `int CEntityInstance:GetIntAttr(string_1 )`
#### Function Description
Get Integer Attribute
#### Parameters
Type|Name|Description
--|--|--
string|string_1|No Description Set
---
### `string CEntityInstance:GetName( )`
#### Function Description

---
### `handle CEntityInstance:GetOrCreatePrivateScriptScope( )`
#### Function Description
Retrieve, creating if necessary, the private per-instance script-side data associated with an entity
---
### `handle CEntityInstance:GetOrCreatePublicScriptScope( )`
#### Function Description
Retrieve, creating if necessary, the public script-side data associated with an entity
---
### `handle CEntityInstance:GetPrivateScriptScope( )`
#### Function Description
Retrieve the private per-instance script-side data associated with an entity
---
### `handle CEntityInstance:GetPublicScriptScope( )`
#### Function Description
Retrieve the public script-side data associated with an entity
---
### `void CEntityInstance:RedirectOutput(string_1, string_2, handle_3 )`
#### Function Description
Adds an I/O connection that will call the named function on the passed entity when the specified output fires.
#### Parameters
Type|Name|Description
--|--|--
string|string_1|No Description Set
string|string_2|No Description Set
handle|handle_3|No Description Set
---
### `void CEntityInstance:RemoveSelf( )`
#### Function Description
Delete this entity
---
### `void CEntityInstance:SetIntAttr(string_1, int_2 )`
#### Function Description
Set Integer Attribute
#### Parameters
Type|Name|Description
--|--|--
string|string_1|No Description Set
int|int_2|No Description Set
---
### `int CEntityInstance:entindex( )`
#### Function Description

---
## **CEnvEntityMaker**
---
### `void CEnvEntityMaker:SpawnEntity( )`
#### Function Description
Create an entity at the location of the maker
---
### `void CEnvEntityMaker:SpawnEntityAtEntityOrigin(hEntity )`
#### Function Description
Create an entity at the location of a specified entity instance
#### Parameters
Type|Name|Description
--|--|--
handle|hEntity|No Description Set
---
### `void CEnvEntityMaker:SpawnEntityAtLocation(vecAlternateOrigin, vecAlternateAngles )`
#### Function Description
Create an entity at a specified location and orientaton, orientation is Euler angle in degrees (pitch, yaw, roll)
#### Parameters
Type|Name|Description
--|--|--
Vector|vecAlternateOrigin|No Description Set
Vector|vecAlternateAngles|No Description Set
---
### `void CEnvEntityMaker:SpawnEntityAtNamedEntityOrigin(pszName )`
#### Function Description
Create an entity at the location of a named entity
#### Parameters
Type|Name|Description
--|--|--
string|pszName|No Description Set
---
## **CEnvProjectedTexture**
---
### `void CEnvProjectedTexture:SetFarRange(flRange )`
#### Function Description
Set light maximum range
#### Parameters
Type|Name|Description
--|--|--
float|flRange|No Description Set
---
### `void CEnvProjectedTexture:SetLinearAttenuation(flAtten )`
#### Function Description
Set light linear attenuation value
#### Parameters
Type|Name|Description
--|--|--
float|flAtten|No Description Set
---
### `void CEnvProjectedTexture:SetNearRange(flRange )`
#### Function Description
Set light minimum range
#### Parameters
Type|Name|Description
--|--|--
float|flRange|No Description Set
---
### `void CEnvProjectedTexture:SetQuadraticAttenuation(flAtten )`
#### Function Description
Set light quadratic attenuation value
#### Parameters
Type|Name|Description
--|--|--
float|flAtten|No Description Set
---
### `void CEnvProjectedTexture:SetVolumetrics(bOn, flIntensity, flNoise, nPlanes, flPlaneOffset )`
#### Function Description
Turn on/off light volumetrics: bool bOn, float flIntensity, float flNoise, int nPlanes, float flPlaneOffset
#### Parameters
Type|Name|Description
--|--|--
bool|bOn|No Description Set
float|flIntensity|No Description Set
float|flNoise|No Description Set
int|nPlanes|No Description Set
float|flPlaneOffset|No Description Set
---
## **CInfoData**
---
### `Vector CInfoData:QueryColor(tok, vDefault )`
#### Function Description
Query color data for this key
#### Parameters
Type|Name|Description
--|--|--
utlstringtoken|tok|No Description Set
Vector|vDefault|No Description Set
---
### `float CInfoData:QueryFloat(tok, flDefault )`
#### Function Description
Query float data for this key
#### Parameters
Type|Name|Description
--|--|--
utlstringtoken|tok|No Description Set
float|flDefault|No Description Set
---
### `int CInfoData:QueryInt(tok, nDefault )`
#### Function Description
Query int data for this key
#### Parameters
Type|Name|Description
--|--|--
utlstringtoken|tok|No Description Set
int|nDefault|No Description Set
---
### `float CInfoData:QueryNumber(tok, flDefault )`
#### Function Description
Query number data for this key
#### Parameters
Type|Name|Description
--|--|--
utlstringtoken|tok|No Description Set
float|flDefault|No Description Set
---
### `string CInfoData:QueryString(tok, pDefault )`
#### Function Description
Query string data for this key
#### Parameters
Type|Name|Description
--|--|--
utlstringtoken|tok|No Description Set
string|pDefault|No Description Set
---
### `Vector CInfoData:QueryVector(tok, vDefault )`
#### Function Description
Query vector data for this key
#### Parameters
Type|Name|Description
--|--|--
utlstringtoken|tok|No Description Set
Vector|vDefault|No Description Set
---
## **CInfoWorldLayer**
---
### `void CInfoWorldLayer:HideWorldLayer( )`
#### Function Description
Hides this layer
---
### `void CInfoWorldLayer:ShowWorldLayer( )`
#### Function Description
Shows this layer
---
## **CMarkupVolumeTagged**
---
### `bool CMarkupVolumeTagged:HasTag(pszTagName )`
#### Function Description
Does this volume have the given tag.
#### Parameters
Type|Name|Description
--|--|--
string|pszTagName|No Description Set
---
## **CNativeOutputs**
---
### `void CNativeOutputs:AddOutput(string_1, string_2 )`
#### Function Description
Add an output
#### Parameters
Type|Name|Description
--|--|--
string|string_1|No Description Set
string|string_2|No Description Set
---
### `void CNativeOutputs:Init(int_1 )`
#### Function Description
Initialize with number of outputs
#### Parameters
Type|Name|Description
--|--|--
int|int_1|No Description Set
---
## **CPhysicsProp**
---
### `void CPhysicsProp:DisableMotion( )`
#### Function Description
Disable motion for the prop
---
### `void CPhysicsProp:EnableMotion( )`
#### Function Description
Enable motion for the prop
---
### `void CPhysicsProp:SetDynamicVsDynamicContinuous(bIsDynamicVsDynamicContinuousEnabled )`
#### Function Description
Enable/disable dynamic vs dynamic continuous collision traces
#### Parameters
Type|Name|Description
--|--|--
bool|bIsDynamicVsDynamicContinuousEnabled|No Description Set
---
## **CPointClientUIWorldPanel**
---
### `void CPointClientUIWorldPanel:AcceptUserInput( )`
#### Function Description
Tells the panel to accept user input.
---
### `void CPointClientUIWorldPanel:AddCSSClasses(pszClasses )`
#### Function Description
Adds CSS class(es) to the panel
#### Parameters
Type|Name|Description
--|--|--
string|pszClasses|No Description Set
---
### `void CPointClientUIWorldPanel:IgnoreUserInput( )`
#### Function Description
Tells the panel to ignore user input.
---
### `bool CPointClientUIWorldPanel:IsGrabbable( )`
#### Function Description
Returns whether this entity is grabbable.
---
### `void CPointClientUIWorldPanel:RemoveCSSClasses(pszClasses )`
#### Function Description
Remove CSS class(es) from the panel
#### Parameters
Type|Name|Description
--|--|--
string|pszClasses|No Description Set
---
## **CPointTemplate**
---
### `void CPointTemplate:DeleteCreatedSpawnGroups( )`
#### Function Description
DeleteCreatedSpawnGroups() : Deletes any spawn groups that this point_template has spawned. Note: The point_template will not be deleted by this.
---
### `void CPointTemplate:ForceSpawn( )`
#### Function Description
ForceSpawn() : Spawns all of the entities the point_template is pointing at.
---
### `handle CPointTemplate:GetSpawnedEntities( )`
#### Function Description
GetSpawnedEntities() : Get the list of the most recent spawned entities
---
### `void CPointTemplate:SetSpawnCallback(hCallbackFunc, hCallbackScope )`
#### Function Description
SetSpawnCallback( hCallbackFunc, hCallbackScope, hCallbackData ) : Set a callback for when the template spawns entities. The spawned entities will be passed in as an array.
#### Parameters
Type|Name|Description
--|--|--
handle|hCallbackFunc|No Description Set
handle|hCallbackScope|No Description Set
---
## **CPointWorldText**
---
### `void CPointWorldText:SetMessage(pMessage )`
#### Function Description
Set the message on this entity.
#### Parameters
Type|Name|Description
--|--|--
string|pMessage|No Description Set
---
## **CPropHMDAvatar**
---
### `handle CPropHMDAvatar:GetVRHand(nHandID )`
#### Function Description
Get VR hand by ID
#### Parameters
Type|Name|Description
--|--|--
int|nHandID|No Description Set
---
## **CPropVRHand**
---
### `void CPropVRHand:AddHandAttachment(hAttachment )`
#### Function Description
Add the attachment to this hand
#### Parameters
Type|Name|Description
--|--|--
handle|hAttachment|No Description Set
---
### `handle CPropVRHand:AddHandModelOverride(pModelName )`
#### Function Description
Add a model override for this hand
#### Parameters
Type|Name|Description
--|--|--
string|pModelName|No Description Set
---
### `handle CPropVRHand:FindHandModelOverride(pModelName )`
#### Function Description
Find a specific model override for this hand
#### Parameters
Type|Name|Description
--|--|--
string|pModelName|No Description Set
---
### `void CPropVRHand:FireHapticPulse(nStrength )`
#### Function Description
Fire a haptic pulse on this hand. [0,2] for strength.
#### Parameters
Type|Name|Description
--|--|--
int|nStrength|No Description Set
---
### `void CPropVRHand:FireHapticPulsePrecise(nPulseDuration )`
#### Function Description
Fire a haptic pulse on this hand. Specify the duration in micro seconds.
#### Parameters
Type|Name|Description
--|--|--
int|nPulseDuration|No Description Set
---
### `handle CPropVRHand:GetHandAttachment( )`
#### Function Description
Get the attachment on this hand
---
### `int CPropVRHand:GetHandID( )`
#### Function Description
Get hand ID
---
### `int CPropVRHand:GetLiteralHandType( )`
#### Function Description
Get literal type for this hand
---
### `handle CPropVRHand:GetPlayer( )`
#### Function Description
Get the player for this hand
---
### `Vector CPropVRHand:GetVelocity( )`
#### Function Description
Get the filtered controller velocity.
---
### `void CPropVRHand:RemoveAllHandModelOverrides( )`
#### Function Description
Remove all model overrides for this hand
---
### `void CPropVRHand:RemoveHandAttachmentByHandle(hAttachment )`
#### Function Description
Remove hand attachment by handle
#### Parameters
Type|Name|Description
--|--|--
handle|hAttachment|No Description Set
---
### `void CPropVRHand:RemoveHandModelOverride(pModelName )`
#### Function Description
Remove a model override for this hand
#### Parameters
Type|Name|Description
--|--|--
string|pModelName|No Description Set
---
### `void CPropVRHand:SetHandAttachment(hAttachment )`
#### Function Description
Set the attachment for this hand
#### Parameters
Type|Name|Description
--|--|--
handle|hAttachment|No Description Set
---
## **CSceneEntity**
---
### `void CSceneEntity:AddBroadcastTeamTarget(int_1 )`
#### Function Description
Adds a team (by index) to the broadcast list
#### Parameters
Type|Name|Description
--|--|--
int|int_1|No Description Set
---
### `void CSceneEntity:Cancel( )`
#### Function Description
Cancel scene playback
---
### `float CSceneEntity:EstimateLength( )`
#### Function Description
Returns length of this scene in seconds.
---
### `handle CSceneEntity:FindCamera( )`
#### Function Description
Get the camera
---
### `handle CSceneEntity:FindNamedEntity(string_1 )`
#### Function Description
given an entity reference, such as !target, get actual entity from scene object
#### Parameters
Type|Name|Description
--|--|--
string|string_1|No Description Set
---
### `bool CSceneEntity:IsPaused( )`
#### Function Description
If this scene is currently paused.
---
### `bool CSceneEntity:IsPlayingBack( )`
#### Function Description
If this scene is currently playing.
---
### `bool CSceneEntity:LoadSceneFromString(string_1, string_2 )`
#### Function Description
given a dummy scene name and a vcd string, load the scene
#### Parameters
Type|Name|Description
--|--|--
string|string_1|No Description Set
string|string_2|No Description Set
---
### `void CSceneEntity:RemoveBroadcastTeamTarget(int_1 )`
#### Function Description
Removes a team (by index) from the broadcast list
#### Parameters
Type|Name|Description
--|--|--
int|int_1|No Description Set
---
### `void CSceneEntity:Start(handle_1 )`
#### Function Description
Start scene playback, takes activatorEntity as param
#### Parameters
Type|Name|Description
--|--|--
handle|handle_1|No Description Set
---
## **CScriptHTTPRequest**
---
### `bool CScriptHTTPRequest:Send(handle_1 )`
#### Function Description
Send a HTTP request.
#### Parameters
Type|Name|Description
--|--|--
handle|handle_1|No Description Set
---
### `bool CScriptHTTPRequest:SetHTTPRequestAbsoluteTimeoutMS(unsigned_1 )`
#### Function Description
Set the total timeout on the request.
#### Parameters
Type|Name|Description
--|--|--
unsigned|unsigned_1|No Description Set
---
### `bool CScriptHTTPRequest:SetHTTPRequestGetOrPostParameter(string_1, string_2 )`
#### Function Description
Set a POST or GET parameter on the request.
#### Parameters
Type|Name|Description
--|--|--
string|string_1|No Description Set
string|string_2|No Description Set
---
### `bool CScriptHTTPRequest:SetHTTPRequestHeaderValue(string_1, string_2 )`
#### Function Description
Set a header value on the request.
#### Parameters
Type|Name|Description
--|--|--
string|string_1|No Description Set
string|string_2|No Description Set
---
### `bool CScriptHTTPRequest:SetHTTPRequestNetworkActivityTimeout(unsigned_1 )`
#### Function Description
Set the network timeout on the request - this timer is reset when any data is received.
#### Parameters
Type|Name|Description
--|--|--
unsigned|unsigned_1|No Description Set
---
### `bool CScriptHTTPRequest:SetHTTPRequestRawPostBody(string_1, string_2 )`
#### Function Description
Set the literal body of a post - invalid after setting a post parameter.
#### Parameters
Type|Name|Description
--|--|--
string|string_1|No Description Set
string|string_2|No Description Set
---
## **CScriptHeroList**
---
### `table CScriptHeroList:GetAllHeroes( )`
#### Function Description
Returns all the heroes in the world
---
### `handle CScriptHeroList:GetHero(int_1 )`
#### Function Description
Get the Nth hero in the Hero List
#### Parameters
Type|Name|Description
--|--|--
int|int_1|No Description Set
---
### `int CScriptHeroList:GetHeroCount( )`
#### Function Description
Returns the number of heroes in the world
---
## **CScriptKeyValues**
---
### `table CScriptKeyValues:GetValue(string_1 )`
#### Function Description
Reads a spawn key
#### Parameters
Type|Name|Description
--|--|--
string|string_1|No Description Set
---
## **CScriptParticleManager**
---
### `int CScriptParticleManager:CreateParticle(string_1, int_2, handle_3 )`
#### Function Description
Creates a new particle effect
#### Parameters
Type|Name|Description
--|--|--
string|string_1|No Description Set
int|int_2|No Description Set
handle|handle_3|No Description Set
---
### `int CScriptParticleManager:CreateParticleForPlayer(string_1, int_2, handle_3, handle_4 )`
#### Function Description
Creates a new particle effect that only plays for the specified player
#### Parameters
Type|Name|Description
--|--|--
string|string_1|No Description Set
int|int_2|No Description Set
handle|handle_3|No Description Set
handle|handle_4|No Description Set
---
### `int CScriptParticleManager:CreateParticleForTeam(string_1, int_2, handle_3, int_4 )`
#### Function Description
Creates a new particle effect that only plays for the specified team
#### Parameters
Type|Name|Description
--|--|--
string|string_1|No Description Set
int|int_2|No Description Set
handle|handle_3|No Description Set
int|int_4|No Description Set
---
### `void CScriptParticleManager:DestroyParticle(int_1, bool_2 )`
#### Function Description
(int index, bool bDestroyImmediately) - Destroy a particle, if bDestroyImmediately destroy it without playing end caps.
#### Parameters
Type|Name|Description
--|--|--
int|int_1|No Description Set
bool|bool_2|No Description Set
---
### `string CScriptParticleManager:GetParticleReplacement(string_1, handle_2 )`
#### Function Description

#### Parameters
Type|Name|Description
--|--|--
string|string_1|No Description Set
handle|handle_2|No Description Set
---
### `void CScriptParticleManager:ReleaseParticleIndex(int_1 )`
#### Function Description
Frees the specified particle index
#### Parameters
Type|Name|Description
--|--|--
int|int_1|No Description Set
---
### `void CScriptParticleManager:SetParticleAlwaysSimulate(int_1 )`
#### Function Description

#### Parameters
Type|Name|Description
--|--|--
int|int_1|No Description Set
---
### `void CScriptParticleManager:SetParticleControl(int_1, int_2, Vector_3 )`
#### Function Description
Set the control point data for a control on a particle effect
#### Parameters
Type|Name|Description
--|--|--
int|int_1|No Description Set
int|int_2|No Description Set
Vector|Vector_3|No Description Set
---
### `void CScriptParticleManager:SetParticleControlEnt(int_1, int_2, handle_3, int_4, string_5, Vector_6, bool_7 )`
#### Function Description

#### Parameters
Type|Name|Description
--|--|--
int|int_1|No Description Set
int|int_2|No Description Set
handle|handle_3|No Description Set
int|int_4|No Description Set
string|string_5|No Description Set
Vector|Vector_6|No Description Set
bool|bool_7|No Description Set
---
### `void CScriptParticleManager:SetParticleControlFallback(int_1, int_2, Vector_3 )`
#### Function Description
(int iIndex, int iPoint, Vector vecPosition)
#### Parameters
Type|Name|Description
--|--|--
int|int_1|No Description Set
int|int_2|No Description Set
Vector|Vector_3|No Description Set
---
### `void CScriptParticleManager:SetParticleControlForward(int_1, int_2, Vector_3 )`
#### Function Description
(int nFXIndex, int nPoint, vForward)
#### Parameters
Type|Name|Description
--|--|--
int|int_1|No Description Set
int|int_2|No Description Set
Vector|Vector_3|No Description Set
---
### `void CScriptParticleManager:SetParticleControlOrientation(int_1, int_2, Vector_3, Vector_4, Vector_5 )`
#### Function Description
(int nFXIndex, int nPoint, vForward, vRight, vUp) - Set the orientation for a control on a particle effect (NOTE: This is left handed -- bad!!)
#### Parameters
Type|Name|Description
--|--|--
int|int_1|No Description Set
int|int_2|No Description Set
Vector|Vector_3|No Description Set
Vector|Vector_4|No Description Set
Vector|Vector_5|No Description Set
---
### `void CScriptParticleManager:SetParticleControlOrientationFLU(int_1, int_2, Vector_3, Vector_4, Vector_5 )`
#### Function Description
(int nFXIndex, int nPoint, Vector vecForward, Vector vecLeft, Vector vecUp) - Set the orientation for a control on a particle effect
#### Parameters
Type|Name|Description
--|--|--
int|int_1|No Description Set
int|int_2|No Description Set
Vector|Vector_3|No Description Set
Vector|Vector_4|No Description Set
Vector|Vector_5|No Description Set
---
### `void CScriptParticleManager:SetParticleFoWProperties(int_1, int_2, int_3, float_4 )`
#### Function Description
int nfxindex, int nPoint, int nPoint2, float flRadius
#### Parameters
Type|Name|Description
--|--|--
int|int_1|No Description Set
int|int_2|No Description Set
int|int_3|No Description Set
float|float_4|No Description Set
---
### `bool CScriptParticleManager:SetParticleShouldCheckFoW(int_1, bool_2 )`
#### Function Description
int nfxindex, bool bCheckFoW
#### Parameters
Type|Name|Description
--|--|--
int|int_1|No Description Set
bool|bool_2|No Description Set
---
## **CScriptPrecacheContext**
---
### `void CScriptPrecacheContext:AddResource(string_1 )`
#### Function Description
Precaches a specific resource
#### Parameters
Type|Name|Description
--|--|--
string|string_1|No Description Set
---
### `table CScriptPrecacheContext:GetValue(string_1 )`
#### Function Description
Reads a spawn key
#### Parameters
Type|Name|Description
--|--|--
string|string_1|No Description Set
---
## **Convars**
---
### `table Convars:GetBool(string_1 )`
#### Function Description
GetBool(name) : returns the convar as a boolean flag.
#### Parameters
Type|Name|Description
--|--|--
string|string_1|No Description Set
---
### `handle Convars:GetCommandClient( )`
#### Function Description
GetCommandClient() : returns the player who issued this console command.
---
### `handle Convars:GetDOTACommandClient( )`
#### Function Description
GetDOTACommandClient() : returns the DOTA player who issued this console command.
---
### `table Convars:GetFloat(string_1 )`
#### Function Description
GetFloat(name) : returns the convar as a float. May return null if no such convar.
#### Parameters
Type|Name|Description
--|--|--
string|string_1|No Description Set
---
### `table Convars:GetInt(string_1 )`
#### Function Description
GetInt(name) : returns the convar as an int. May return null if no such convar.
#### Parameters
Type|Name|Description
--|--|--
string|string_1|No Description Set
---
### `table Convars:GetStr(string_1 )`
#### Function Description
GetStr(name) : returns the convar as a string. May return null if no such convar.
#### Parameters
Type|Name|Description
--|--|--
string|string_1|No Description Set
---
### `void Convars:RegisterCommand(string_1, handle_2, string_3, int_4 )`
#### Function Description
RegisterCommand(name, fn, helpString, flags) : register a console command.
#### Parameters
Type|Name|Description
--|--|--
string|string_1|No Description Set
handle|handle_2|No Description Set
string|string_3|No Description Set
int|int_4|No Description Set
---
### `void Convars:RegisterConvar(string_1, string_2, string_3, int_4 )`
#### Function Description
RegisterConvar(name, defaultValue, helpString, flags): register a new console variable.
#### Parameters
Type|Name|Description
--|--|--
string|string_1|No Description Set
string|string_2|No Description Set
string|string_3|No Description Set
int|int_4|No Description Set
---
### `void Convars:SetBool(string_1, bool_2 )`
#### Function Description
SetBool(name, val) : sets the value of the convar to the bool.
#### Parameters
Type|Name|Description
--|--|--
string|string_1|No Description Set
bool|bool_2|No Description Set
---
### `void Convars:SetFloat(string_1, float_2 )`
#### Function Description
SetFloat(name, val) : sets the value of the convar to the float.
#### Parameters
Type|Name|Description
--|--|--
string|string_1|No Description Set
float|float_2|No Description Set
---
### `void Convars:SetInt(string_1, int_2 )`
#### Function Description
SetInt(name, val) : sets the value of the convar to the int.
#### Parameters
Type|Name|Description
--|--|--
string|string_1|No Description Set
int|int_2|No Description Set
---
### `void Convars:SetStr(string_1, string_2 )`
#### Function Description
SetStr(name, val) : sets the value of the convar to the string.
#### Parameters
Type|Name|Description
--|--|--
string|string_1|No Description Set
string|string_2|No Description Set
---
## **GlobalSys**
---
### `table GlobalSys:CommandLineCheck(string_1 )`
#### Function Description
CommandLineCheck(name) : returns true if the command line param was used, otherwise false.
#### Parameters
Type|Name|Description
--|--|--
string|string_1|No Description Set
---
### `table GlobalSys:CommandLineFloat(string_1, float_2 )`
#### Function Description
CommandLineFloat(name) : returns the command line param as a float.
#### Parameters
Type|Name|Description
--|--|--
string|string_1|No Description Set
float|float_2|No Description Set
---
### `table GlobalSys:CommandLineInt(string_1, int_2 )`
#### Function Description
CommandLineInt(name) : returns the command line param as an int.
#### Parameters
Type|Name|Description
--|--|--
string|string_1|No Description Set
int|int_2|No Description Set
---
### `table GlobalSys:CommandLineStr(string_1, string_2 )`
#### Function Description
CommandLineStr(name) : returns the command line param as a string.
#### Parameters
Type|Name|Description
--|--|--
string|string_1|No Description Set
string|string_2|No Description Set
---
## **GridNav**
---
### `bool GridNav:CanFindPath(Vector_1, Vector_2 )`
#### Function Description
Determine if it is possible to reach the specified end point from the specified start point. bool (vStart, vEnd)
#### Parameters
Type|Name|Description
--|--|--
Vector|Vector_1|No Description Set
Vector|Vector_2|No Description Set
---
### `void GridNav:DestroyTreesAroundPoint(Vector_1, float_2, bool_3 )`
#### Function Description
Destroy all trees in the area(vPosition, flRadius, bFullCollision
#### Parameters
Type|Name|Description
--|--|--
Vector|Vector_1|No Description Set
float|float_2|No Description Set
bool|bool_3|No Description Set
---
### `float GridNav:FindPathLength(Vector_1, Vector_2 )`
#### Function Description
Find a path between the two points an return the length of the path. If there is not a path between the points the returned value will be -1. float (vStart, vEnd )
#### Parameters
Type|Name|Description
--|--|--
Vector|Vector_1|No Description Set
Vector|Vector_2|No Description Set
---
### `table GridNav:GetAllTreesAroundPoint(Vector_1, float_2, bool_3 )`
#### Function Description
Returns a table full of tree HSCRIPTS (vPosition, flRadius, bFullCollision).
#### Parameters
Type|Name|Description
--|--|--
Vector|Vector_1|No Description Set
float|float_2|No Description Set
bool|bool_3|No Description Set
---
### `float GridNav:GridPosToWorldCenterX(int_1 )`
#### Function Description
Get the X position of the center of a given X index
#### Parameters
Type|Name|Description
--|--|--
int|int_1|No Description Set
---
### `float GridNav:GridPosToWorldCenterY(int_1 )`
#### Function Description
Get the Y position of the center of a given Y index
#### Parameters
Type|Name|Description
--|--|--
int|int_1|No Description Set
---
### `bool GridNav:IsBlocked(Vector_1 )`
#### Function Description
Checks whether the given position is blocked
#### Parameters
Type|Name|Description
--|--|--
Vector|Vector_1|No Description Set
---
### `bool GridNav:IsNearbyTree(Vector_1, float_2, bool_3 )`
#### Function Description
(position, radius, checkFullTreeRadius?) Checks whether there are any trees overlapping the given point
#### Parameters
Type|Name|Description
--|--|--
Vector|Vector_1|No Description Set
float|float_2|No Description Set
bool|bool_3|No Description Set
---
### `bool GridNav:IsTraversable(Vector_1 )`
#### Function Description
Checks whether the given position is traversable
#### Parameters
Type|Name|Description
--|--|--
Vector|Vector_1|No Description Set
---
### `void GridNav:RegrowAllTrees( )`
#### Function Description
Causes all trees in the map to regrow
---
### `int GridNav:WorldToGridPosX(float_1 )`
#### Function Description
Get the X index of a given world X position
#### Parameters
Type|Name|Description
--|--|--
float|float_1|No Description Set
---
### `int GridNav:WorldToGridPosY(float_1 )`
#### Function Description
Get the Y index of a given world Y position
#### Parameters
Type|Name|Description
--|--|--
float|float_1|No Description Set
---
## **ProjectileManager**
---
### `void ProjectileManager:ChangeTrackingProjectileSpeed(handle_1, int_2 )`
#### Function Description
Update speed
#### Parameters
Type|Name|Description
--|--|--
handle|handle_1|No Description Set
int|int_2|No Description Set
---
### `int ProjectileManager:CreateLinearProjectile(handle_1 )`
#### Function Description
Creates a linear projectile and returns the projectile ID
#### Parameters
Type|Name|Description
--|--|--
handle|handle_1|No Description Set
---
### `void ProjectileManager:CreateTrackingProjectile(handle_1 )`
#### Function Description
Creates a tracking projectile
#### Parameters
Type|Name|Description
--|--|--
handle|handle_1|No Description Set
---
### `void ProjectileManager:DestroyLinearProjectile(int_1 )`
#### Function Description
Destroys the linear projectile matching the argument ID
#### Parameters
Type|Name|Description
--|--|--
int|int_1|No Description Set
---
### `Vector ProjectileManager:GetLinearProjectileLocation(int_1 )`
#### Function Description
Returns current location of projectile
#### Parameters
Type|Name|Description
--|--|--
int|int_1|No Description Set
---
### `float ProjectileManager:GetLinearProjectileRadius(int_1 )`
#### Function Description
Returns current radius of projectile
#### Parameters
Type|Name|Description
--|--|--
int|int_1|No Description Set
---
### `Vector ProjectileManager:GetLinearProjectileVelocity(int_1 )`
#### Function Description
Returns a vector representing the current velocity of the projectile.
#### Parameters
Type|Name|Description
--|--|--
int|int_1|No Description Set
---
### `void ProjectileManager:ProjectileDodge(handle_1 )`
#### Function Description
Makes the specified unit dodge projectiles
#### Parameters
Type|Name|Description
--|--|--
handle|handle_1|No Description Set
---
### `void ProjectileManager:UpdateLinearProjectileDirection(int_1, Vector_2, float_3 )`
#### Function Description
Update velocity
#### Parameters
Type|Name|Description
--|--|--
int|int_1|No Description Set
Vector|Vector_2|No Description Set
float|float_3|No Description Set
---
## **SteamInfo**
---
### `bool SteamInfo:IsPublicUniverse( )`
#### Function Description
Is the script connected to the public Steam universe
---
