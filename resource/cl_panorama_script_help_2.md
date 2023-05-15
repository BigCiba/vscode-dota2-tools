# CPanoramaScript_GameEvents
Function|Signature|Description
--|--|--
Subscribe|<code>GameEvents.Subscribe( cstring pEventName, js_value funcVal )</code>|Subscribe to a game event
Unsubscribe|<code>GameEvents.Unsubscribe( integer nCallbackHandle )</code>|Unsubscribe from a game event
SendCustomGameEventToServer|<code>GameEvents.SendCustomGameEventToServer( cstring pEventName, js_object jsObject )</code>|Send a custom game event to the server
SendCustomGameEventToAllClients|<code>GameEvents.SendCustomGameEventToAllClients( cstring pEventName, js_object jsObject )</code>|Send a custom game event to the server, which will send it to all clients
SendCustomGameEventToClient|<code>GameEvents.SendCustomGameEventToClient( cstring pEventName, integer playerIndex, js_object jsObject )</code>|Send a custom game event to the server, which will then send it to one client
SendEventClientSide|<code>GameEvents.SendEventClientSide( cstring pEventName, js_object jsObject )</code>|Send a client-side event using gameeventmanager (only useful for a few specific events)


# CPanoramaScript_CustomNetTables
Function|Signature|Description
--|--|--
GetTableValue|<code>CustomNetTables.GetTableValue( cstring pTableName, cstring pKeyName )</code>|Get a key from a custom net table
GetAllTableValues|<code>CustomNetTables.GetAllTableValues( cstring pTableName )</code>|Get all values from a custom net table
SubscribeNetTableListener|<code>CustomNetTables.SubscribeNetTableListener( js_raw_args args )</code>|Register a callback when a particular custom net table changes
UnsubscribeNetTableListener|<code>CustomNetTables.UnsubscribeNetTableListener( integer nCallbackHandle )</code>|Unsubscribe from a game event


# CPanoramaScript_SteamUGC
Function|Signature|Description
--|--|--
SubscribeItem|<code>SteamUGC.SubscribeItem( cstring pPublishedFileID, js_value funcVal )</code>|Subscribe to a piece of UGC
UnsubscribeItem|<code>SteamUGC.UnsubscribeItem( cstring pPublishedFileID, js_value funcVal )</code>|Unsubscribe from a piece of UGC
GetSubscriptionInfo|<code>SteamUGC.GetSubscriptionInfo( cstring pPublishedFileID )</code>|Get a key from a custom net table
SetUserItemVote|<code>SteamUGC.SetUserItemVote( cstring pPublishedFileID, boolean bVoteUp, js_value funcVal )</code>|Vote on a piece of UGC
GetUserItemVote|<code>SteamUGC.GetUserItemVote( cstring pPublishedFileID, js_value funcVal )</code>|Get the user's vote on a piece of UGC
AddToFavorites|<code>SteamUGC.AddToFavorites( cstring pPublishedFileID, js_value funcVal )</code>|Add an item to the user's favorites list
RemoveFromFavorites|<code>SteamUGC.RemoveFromFavorites( cstring pPublishedFileID, js_value funcVal )</code>|Remove an item from the user's favorites list
CreateQueryAllUGCRequest|<code>SteamUGC.CreateQueryAllUGCRequest( integer eQueryType, integer eMatchingeMatchingUGCTypeFileType, unsigned unPage )</code>|Create a request to query Steam for all UGC
CreateQueryUGCDetailsRequest|<code>SteamUGC.CreateQueryUGCDetailsRequest( js_array jsArray )</code>|Create a request to query Steam for specific UGC
AddRequiredTagToQuery|<code>SteamUGC.AddRequiredTagToQuery( integer handle, cstring pchTag )</code>|Adds a required tag to the query
AddExcludedTagToQuery|<code>SteamUGC.AddExcludedTagToQuery( integer handle, cstring pchTag )</code>|Adds an excluded tag to the query
ConfigureQuery|<code>SteamUGC.ConfigureQuery( integer handle, js_object jsObject )</code>|Adds a required tag to the query
SendUGCQuery|<code>SteamUGC.SendUGCQuery( integer handle, js_value funcVal )</code>|Sends the prepared query
RegisterDownloadItemResultCallback|<code>SteamUGC.RegisterDownloadItemResultCallback( cstring pPublishedFileID, js_value funcVal )</code>|Register a callback to be called when the item is downloaded


# CPanoramaScript_SteamFriends
Function|Signature|Description
--|--|--
RequestPersonaName|<code>SteamFriends.RequestPersonaName( cstring pchSteamID, js_value funcVal )</code>|Requests the user's persona name
SetLargeAvatarImage|<code>SteamFriends.SetLargeAvatarImage( js_raw_args args )</code>|Sets the avatar image on the image panel


# CPanoramaScript_SteamUtils
Function|Signature|Description
--|--|--
GetConnectedUniverse|<code>SteamUtils.GetConnectedUniverse()</code>|Returns the connected universe
GetAppID|<code>SteamUtils.GetAppID()</code>|Returns the appid of the current app


# CScriptBindingPR_Buffs
Function|Signature|Description
--|--|--
GetName|<code>Buffs.GetName( integer nEntity, integer nBuff )</code>|
GetClass|<code>Buffs.GetClass( integer nEntity, integer nBuff )</code>|
GetTexture|<code>Buffs.GetTexture( integer nEntity, integer nBuff )</code>|
GetDuration|<code>Buffs.GetDuration( integer nEntity, integer nBuff )</code>|
GetDieTime|<code>Buffs.GetDieTime( integer nEntity, integer nBuff )</code>|
GetRemainingTime|<code>Buffs.GetRemainingTime( integer nEntity, integer nBuff )</code>|
GetElapsedTime|<code>Buffs.GetElapsedTime( integer nEntity, integer nBuff )</code>|
GetCreationTime|<code>Buffs.GetCreationTime( integer nEntity, integer nBuff )</code>|
GetStackCount|<code>Buffs.GetStackCount( integer nEntity, integer nBuff )</code>|
IsDebuff|<code>Buffs.IsDebuff( integer nEntity, integer nBuff )</code>|
IsHidden|<code>Buffs.IsHidden( integer nEntity, integer nBuff )</code>|
GetCaster|<code>Buffs.GetCaster( integer nEntity, integer nBuff )</code>|Get the owner of the ability responsible for the modifier.
GetParent|<code>Buffs.GetParent( integer nEntity, integer nBuff )</code>|Get the unit the modifier is parented to.
GetAbility|<code>Buffs.GetAbility( integer nEntity, integer nBuff )</code>|Get the ability that generated the modifier.


# CScriptBindingPR_Players
Function|Signature|Description
--|--|--
GetMaxPlayers|<code>Players.GetMaxPlayers()</code>|Get the maximum number of players in the game.
GetMaxTeamPlayers|<code>Players.GetMaxTeamPlayers()</code>|Get the maximum number of players on teams.
GetLocalPlayer|<code>Players.GetLocalPlayer()</code>|Get the local player ID.
IsValidPlayerID|<code>Players.IsValidPlayerID( integer iPlayerID )</code>|Is the nth player a valid player?
GetPlayerName|<code>Players.GetPlayerName( integer iPlayerID )</code>|Return the name of a player.
GetPlayerHeroEntityIndex|<code>Players.GetPlayerHeroEntityIndex( integer iPlayerID )</code>|Get the entity index of the hero controlled by this player.
GetSelectedEntities|<code>Players.GetSelectedEntities( integer iPlayerID )</code>|Get the entities this player has selected.
GetQueryUnit|<code>Players.GetQueryUnit( integer iPlayerID )</code>|Get the entities this player is querying.
GetLocalPlayerPortraitUnit|<code>Players.GetLocalPlayerPortraitUnit()</code>|Get local player current portrait unit. (ie. Player's hero or primary selected unit.)
CanPlayerBuyback|<code>Players.CanPlayerBuyback( integer nPlayerID )</code>|Can the player buy back?
HasCustomGameTicketForPlayerID|<code>Players.HasCustomGameTicketForPlayerID( integer nPlayerID )</code>|Does this player have a custom game ticket?
GetAssists|<code>Players.GetAssists( integer nPlayerID )</code>|The number of assists credited to a player.
GetClaimedDenies|<code>Players.GetClaimedDenies( integer nPlayerID )</code>|
GetClaimedMisses|<code>Players.GetClaimedMisses( integer nPlayerID )</code>|
GetDeaths|<code>Players.GetDeaths( integer nPlayerID )</code>|The number of deaths a player has suffered.
GetDenies|<code>Players.GetDenies( integer nPlayerID )</code>|The number of denies credited to a player.
GetGold|<code>Players.GetGold( integer nPlayerID )</code>|The amount of gold a player has.
GetKills|<code>Players.GetKills( integer nPlayerID )</code>|The number of kills credited to a player.
GetLastBuybackTime|<code>Players.GetLastBuybackTime( integer nPlayerID )</code>|
GetLastHitMultikill|<code>Players.GetLastHitMultikill( integer nPlayerID )</code>|
GetLastHits|<code>Players.GetLastHits( integer nPlayerID )</code>|The number of last hits credited to a player.
GetLastHitStreak|<code>Players.GetLastHitStreak( integer nPlayerID )</code>|
GetLevel|<code>Players.GetLevel( integer nPlayerID )</code>|The current level of a player.
GetMisses|<code>Players.GetMisses( integer nPlayerID )</code>|
GetNearbyCreepDeaths|<code>Players.GetNearbyCreepDeaths( integer nPlayerID )</code>|
GetReliableGold|<code>Players.GetReliableGold( integer nPlayerID )</code>|Total reliable gold for this player.
GetRespawnSeconds|<code>Players.GetRespawnSeconds( integer nPlayerID )</code>|
GetStreak|<code>Players.GetStreak( integer nPlayerID )</code>|
GetTotalEarnedGold|<code>Players.GetTotalEarnedGold( integer nPlayerID )</code>|Total gold earned in this game by this player.
GetTotalEarnedXP|<code>Players.GetTotalEarnedXP( integer nPlayerID )</code>|Total xp earned in this game by this player.
GetUnreliableGold|<code>Players.GetUnreliableGold( integer nPlayerID )</code>|Total unreliable gold for this player.
GetTeam|<code>Players.GetTeam( integer nPlayerID )</code>|Get the team this player is on.
GetSelectedHeroID|<code>Players.GetSelectedHeroID( integer nPlayerID )</code>|Get the player's selected hero id.
GetGoldPerMin|<code>Players.GetGoldPerMin( integer nPlayerID )</code>|Average gold earned per minute for this player.
GetXPPerMin|<code>Players.GetXPPerMin( integer nPlayerID )</code>|Average xp earned per minute for this player.
GetPlayerSelectedHero|<code>Players.GetPlayerSelectedHero( integer nPlayerID )</code>|Return the name of the hero a player is controlling.
GetPlayerColor|<code>Players.GetPlayerColor( integer iPlayerID )</code>|Get the player color.
IsSpectator|<code>Players.IsSpectator( integer iPlayerID )</code>|Is this player a spectator.
PlayerPortraitClicked|<code>Players.PlayerPortraitClicked( integer nClickedPlayerID, boolean bHoldingCtrl, boolean bHoldingAlt )</code>|.
PlayerPortraitDoubleClicked|<code>Players.PlayerPortraitDoubleClicked( integer nClickedPlayerID, boolean bHoldingCtrl, boolean bHoldingAlt )</code>|.
BuffClicked|<code>Players.BuffClicked( integer nEntity, integer nBuffSerial, boolean bAlert )</code>|.
IsLocalPlayerLiveSpectating|<code>Players.IsLocalPlayerLiveSpectating()</code>|Is the local player live spectating?
IsLocalPlayerInPerspectiveCamera|<code>Players.IsLocalPlayerInPerspectiveCamera()</code>|If local player is in perspective camera, returns true. Else, false
GetPerspectivePlayerEntityIndex|<code>Players.GetPerspectivePlayerEntityIndex()</code>|If player is in perspective mode, returns the followed players entity index.  Else, -1.
GetPerspectivePlayerId|<code>Players.GetPerspectivePlayerId()</code>|If player is in perspective mode, returns the followed players id.  Else, -1.


# CScriptBindingPR_Entities
Function|Signature|Description
--|--|--
GetAbsOrigin|<code>Entities.GetAbsOrigin( integer nEntityIndex )</code>|Get the world origin of the entity.
GetAbsAngles|<code>Entities.GetAbsAngles( integer nEntityIndex )</code>|Get the world angles of the entity.
GetForward|<code>Entities.GetForward( integer nEntityIndex )</code>|Get the forward vector of the entity.
GetLeft|<code>Entities.GetLeft( integer nEntityIndex )</code>|Get the left vector of the entity.
GetRight|<code>Entities.GetRight( integer nEntityIndex )</code>|Get the right vector of the entity. WARNING: This produces a left-handed coordinate system. Use GetLeft instead!
GetUp|<code>Entities.GetUp( integer nEntityIndex )</code>|Get the up vector of the entity.
GetAllBuildingEntities|<code>Entities.GetAllBuildingEntities()</code>|Get all the building entities.
GetAllHeroEntities|<code>Entities.GetAllHeroEntities()</code>|Get all the hero entities.
GetAllEntitiesByName|<code>Entities.GetAllEntitiesByName( cstring pszName )</code>|Get all the entities with a given name.
GetAllEntitiesByClassname|<code>Entities.GetAllEntitiesByClassname( cstring pszName )</code>|Get all the entities with a given classname.
GetAllCreatureEntities|<code>Entities.GetAllCreatureEntities()</code>|Get all the creature entities.
GetAllEntities|<code>Entities.GetAllEntities()</code>|Get all the entities.
CanBeDominated|<code>Entities.CanBeDominated( integer nEntityIndex )</code>|
HasAttackCapability|<code>Entities.HasAttackCapability( integer nEntityIndex )</code>|
HasCastableAbilities|<code>Entities.HasCastableAbilities( integer nEntityIndex )</code>|
HasFlyingVision|<code>Entities.HasFlyingVision( integer nEntityIndex )</code>|
HasFlyMovementCapability|<code>Entities.HasFlyMovementCapability( integer nEntityIndex )</code>|
HasGroundMovementCapability|<code>Entities.HasGroundMovementCapability( integer nEntityIndex )</code>|
HasMovementCapability|<code>Entities.HasMovementCapability( integer nEntityIndex )</code>|
HasScepter|<code>Entities.HasScepter( integer nEntityIndex )</code>|
HasUpgradeableAbilities|<code>Entities.HasUpgradeableAbilities( integer nEntityIndex )</code>|
HasUpgradeableAbilitiesThatArentMaxed|<code>Entities.HasUpgradeableAbilitiesThatArentMaxed( integer nEntityIndex )</code>|
IsAlive|<code>Entities.IsAlive( integer nEntityIndex )</code>|
IsAncient|<code>Entities.IsAncient( integer nEntityIndex )</code>|
IsAttackImmune|<code>Entities.IsAttackImmune( integer nEntityIndex )</code>|
IsBarracks|<code>Entities.IsBarracks( integer nEntityIndex )</code>|
IsBlind|<code>Entities.IsBlind( integer nEntityIndex )</code>|
IsBoss|<code>Entities.IsBoss( integer nEntityIndex )</code>|
IsBossCreature|<code>Entities.IsBossCreature( integer nEntityIndex )</code>|
IsRoshan|<code>Entities.IsRoshan( integer nEntityIndex )</code>|
IsBuilding|<code>Entities.IsBuilding( integer nEntityIndex )</code>|
IsCommandRestricted|<code>Entities.IsCommandRestricted( integer nEntityIndex )</code>|
IsConsideredHero|<code>Entities.IsConsideredHero( integer nEntityIndex )</code>|
IsControllableByAnyPlayer|<code>Entities.IsControllableByAnyPlayer( integer nEntityIndex )</code>|
IsCourier|<code>Entities.IsCourier( integer nEntityIndex )</code>|
IsCreature|<code>Entities.IsCreature( integer nEntityIndex )</code>|
IsCreep|<code>Entities.IsCreep( integer nEntityIndex )</code>|
IsCreepHero|<code>Entities.IsCreepHero( integer nEntityIndex )</code>|
IsDeniable|<code>Entities.IsDeniable( integer nEntityIndex )</code>|
IsDominated|<code>Entities.IsDominated( integer nEntityIndex )</code>|
IsEnemy|<code>Entities.IsEnemy( integer nEntityIndex )</code>|
IsEvadeDisabled|<code>Entities.IsEvadeDisabled( integer nEntityIndex )</code>|
IsFort|<code>Entities.IsFort( integer nEntityIndex )</code>|
IsFrozen|<code>Entities.IsFrozen( integer nEntityIndex )</code>|
IsGeneratedByEconItem|<code>Entities.IsGeneratedByEconItem( integer nEntityIndex )</code>|
IsHallofFame|<code>Entities.IsHallofFame( integer nEntityIndex )</code>|
IsDisarmed|<code>Entities.IsDisarmed( integer nEntityIndex )</code>|
IsHero|<code>Entities.IsHero( integer nEntityIndex )</code>|
IsHexed|<code>Entities.IsHexed( integer nEntityIndex )</code>|
IsIllusion|<code>Entities.IsIllusion( integer nEntityIndex )</code>|
IsInRangeOfFountain|<code>Entities.IsInRangeOfFountain( integer nEntityIndex )</code>|
IsInventoryEnabled|<code>Entities.IsInventoryEnabled( integer nEntityIndex )</code>|
IsInvisible|<code>Entities.IsInvisible( integer nEntityIndex )</code>|
IsInvulnerable|<code>Entities.IsInvulnerable( integer nEntityIndex )</code>|
IsLaneCreep|<code>Entities.IsLaneCreep( integer nEntityIndex )</code>|
IsLowAttackPriority|<code>Entities.IsLowAttackPriority( integer nEntityIndex )</code>|
IsMagicImmune|<code>Entities.IsMagicImmune( integer nEntityIndex )</code>|
IsMuted|<code>Entities.IsMuted( integer nEntityIndex )</code>|
IsNeutralUnitType|<code>Entities.IsNeutralUnitType( integer nEntityIndex )</code>|
IsNightmared|<code>Entities.IsNightmared( integer nEntityIndex )</code>|
IsOther|<code>Entities.IsOther( integer nEntityIndex )</code>|
IsOutOfGame|<code>Entities.IsOutOfGame( integer nEntityIndex )</code>|
IsOwnedByAnyPlayer|<code>Entities.IsOwnedByAnyPlayer( integer nEntityIndex )</code>|
IsPhantom|<code>Entities.IsPhantom( integer nEntityIndex )</code>|
IsRangedAttacker|<code>Entities.IsRangedAttacker( integer nEntityIndex )</code>|
IsRealHero|<code>Entities.IsRealHero( integer nEntityIndex )</code>|
IsRooted|<code>Entities.IsRooted( integer nEntityIndex )</code>|
IsSelectable|<code>Entities.IsSelectable( integer nEntityIndex )</code>|
IsShop|<code>Entities.IsShop( integer nEntityIndex )</code>|
IsSilenced|<code>Entities.IsSilenced( integer nEntityIndex )</code>|
IsSpeciallyDeniable|<code>Entities.IsSpeciallyDeniable( integer nEntityIndex )</code>|
IsSpeciallyUndeniable|<code>Entities.IsSpeciallyUndeniable( integer nEntityIndex )</code>|
IsStunned|<code>Entities.IsStunned( integer nEntityIndex )</code>|
IsSummoned|<code>Entities.IsSummoned( integer nEntityIndex )</code>|
IsTower|<code>Entities.IsTower( integer nEntityIndex )</code>|
IsUnselectable|<code>Entities.IsUnselectable( integer nEntityIndex )</code>|
IsWard|<code>Entities.IsWard( integer nEntityIndex )</code>|
IsZombie|<code>Entities.IsZombie( integer nEntityIndex )</code>|
NoHealthBar|<code>Entities.NoHealthBar( integer nEntityIndex )</code>|
NoTeamMoveTo|<code>Entities.NoTeamMoveTo( integer nEntityIndex )</code>|
NoTeamSelect|<code>Entities.NoTeamSelect( integer nEntityIndex )</code>|
NotOnMinimap|<code>Entities.NotOnMinimap( integer nEntityIndex )</code>|
NotOnMinimapForEnemies|<code>Entities.NotOnMinimapForEnemies( integer nEntityIndex )</code>|
NoUnitCollision|<code>Entities.NoUnitCollision( integer nEntityIndex )</code>|
PassivesDisabled|<code>Entities.PassivesDisabled( integer nEntityIndex )</code>|
ProvidesVision|<code>Entities.ProvidesVision( integer nEntityIndex )</code>|
UsesHeroAbilityNumbers|<code>Entities.UsesHeroAbilityNumbers( integer nEntityIndex )</code>|
IsMoving|<code>Entities.IsMoving( integer nEntityIndex )</code>|
GetAbilityCount|<code>Entities.GetAbilityCount( integer nEntityIndex )</code>|
GetCurrentVisionRange|<code>Entities.GetCurrentVisionRange( integer nEntityIndex )</code>|
GetDamageBonus|<code>Entities.GetDamageBonus( integer nEntityIndex )</code>|
GetDamageMax|<code>Entities.GetDamageMax( integer nEntityIndex )</code>|
GetDamageMin|<code>Entities.GetDamageMin( integer nEntityIndex )</code>|
GetDayTimeVisionRange|<code>Entities.GetDayTimeVisionRange( integer nEntityIndex )</code>|
GetHealth|<code>Entities.GetHealth( integer nEntityIndex )</code>|
GetHealthPercent|<code>Entities.GetHealthPercent( integer nEntityIndex )</code>|
GetHealthThinkRegen|<code>Entities.GetHealthThinkRegen( integer nEntityIndex )</code>|
GetLevel|<code>Entities.GetLevel( integer nEntityIndex )</code>|
GetMaxHealth|<code>Entities.GetMaxHealth( integer nEntityIndex )</code>|
GetNightTimeVisionRange|<code>Entities.GetNightTimeVisionRange( integer nEntityIndex )</code>|
GetPlayerOwnerID|<code>Entities.GetPlayerOwnerID( integer nEntityIndex )</code>|
GetStates|<code>Entities.GetStates( integer nEntityIndex )</code>|
GetTotalPurchasedUpgradeGoldCost|<code>Entities.GetTotalPurchasedUpgradeGoldCost( integer nEntityIndex )</code>|
GetTeamNumber|<code>Entities.GetTeamNumber( integer nEntityIndex )</code>|
GetHealthBarOffset|<code>Entities.GetHealthBarOffset( integer nEntityIndex )</code>|
GetAttackRange|<code>Entities.GetAttackRange( integer nEntityIndex )</code>|
GetAttackSpeed|<code>Entities.GetAttackSpeed( integer nEntityIndex )</code>|
GetAttacksPerSecond|<code>Entities.GetAttacksPerSecond( integer nEntityIndex )</code>|
GetBaseAttackTime|<code>Entities.GetBaseAttackTime( integer nEntityIndex )</code>|
GetBaseMagicalResistanceValue|<code>Entities.GetBaseMagicalResistanceValue( integer nEntityIndex )</code>|
GetBaseMoveSpeed|<code>Entities.GetBaseMoveSpeed( integer nEntityIndex )</code>|
GetBonusPhysicalArmor|<code>Entities.GetBonusPhysicalArmor( integer nEntityIndex )</code>|
GetCollisionPadding|<code>Entities.GetCollisionPadding( integer nEntityIndex )</code>|
GetEffectiveInvisibilityLevel|<code>Entities.GetEffectiveInvisibilityLevel( integer nEntityIndex )</code>|
GetHasteFactor|<code>Entities.GetHasteFactor( integer nEntityIndex )</code>|
GetHullRadius|<code>Entities.GetHullRadius( integer nEntityIndex )</code>|
GetIdealSpeed|<code>Entities.GetIdealSpeed( integer nEntityIndex )</code>|
GetIncreasedAttackSpeed|<code>Entities.GetIncreasedAttackSpeed( integer nEntityIndex )</code>|
GetMana|<code>Entities.GetMana( integer nEntityIndex )</code>|
GetManaThinkRegen|<code>Entities.GetManaThinkRegen( integer nEntityIndex )</code>|
GetMaxMana|<code>Entities.GetMaxMana( integer nEntityIndex )</code>|
GetMagicalArmorValue|<code>Entities.GetMagicalArmorValue( integer nEntityIndex )</code>|
GetPaddedCollisionRadius|<code>Entities.GetPaddedCollisionRadius( integer nEntityIndex )</code>|
GetPercentInvisible|<code>Entities.GetPercentInvisible( integer nEntityIndex )</code>|
GetPhysicalArmorValue|<code>Entities.GetPhysicalArmorValue( integer nEntityIndex )</code>|
GetProjectileCollisionSize|<code>Entities.GetProjectileCollisionSize( integer nEntityIndex )</code>|
GetRingRadius|<code>Entities.GetRingRadius( integer nEntityIndex )</code>|
GetSecondsPerAttack|<code>Entities.GetSecondsPerAttack( integer nEntityIndex )</code>|
ManaFraction|<code>Entities.ManaFraction( integer nEntityIndex )</code>|
GetClassNameAsCStr|<code>Entities.GetClassNameAsCStr( integer nEntityIndex )</code>|
GetDisplayedUnitName|<code>Entities.GetDisplayedUnitName( integer nEntityIndex )</code>|
GetSelectionGroup|<code>Entities.GetSelectionGroup( integer nEntityIndex )</code>|
GetSoundSet|<code>Entities.GetSoundSet( integer nEntityIndex )</code>|
GetUnitLabel|<code>Entities.GetUnitLabel( integer nEntityIndex )</code>|
GetUnitName|<code>Entities.GetUnitName( integer nEntityIndex )</code>|
GetTotalDamageTaken|<code>Entities.GetTotalDamageTaken( integer nEntityIndex )</code>|
IsControllableByPlayer|<code>Entities.IsControllableByPlayer( integer nEntityIndex, integer nPlayerIndex )</code>|
GetChosenTarget|<code>Entities.GetChosenTarget( integer nEntityIndex )</code>|
HasItemInInventory|<code>Entities.HasItemInInventory( integer nEntityIndex, cstring pItemName )</code>|
GetRangeToUnit|<code>Entities.GetRangeToUnit( integer nEntityIndex, integer nEntityIndex2 )</code>|
IsEntityInRange|<code>Entities.IsEntityInRange( integer nEntityIndex, integer nEntityIndex2, float flRange )</code>|
GetMoveSpeedModifier|<code>Entities.GetMoveSpeedModifier( integer nEntityIndex, float flBaseSpeed )</code>|
CanAcceptTargetToAttack|<code>Entities.CanAcceptTargetToAttack( integer nEntityIndex, integer nEntityIndex2 )</code>|
InState|<code>Entities.InState( integer nEntityIndex, integer nState )</code>|
GetArmorForDamageType|<code>Entities.GetArmorForDamageType( integer nEntityIndex, integer iDamageType )</code>|
GetArmorReductionForDamageType|<code>Entities.GetArmorReductionForDamageType( integer nEntityIndex, integer iDamageType )</code>|
IsInRangeOfShop|<code>Entities.IsInRangeOfShop( integer nEntityIndex, integer iShopType, boolean bSpecific )</code>|
GetNumItemsInStash|<code>Entities.GetNumItemsInStash( integer nEntityIndex )</code>|
GetNumItemsInInventory|<code>Entities.GetNumItemsInInventory( integer nEntityIndex )</code>|
GetItemInSlot|<code>Entities.GetItemInSlot( integer nEntityIndex, integer nSlotIndex )</code>|
GetAbility|<code>Entities.GetAbility( integer nEntityIndex, integer nSlotIndex )</code>|
GetAbilityByName|<code>Entities.GetAbilityByName( integer nEntityIndex, cstring pszAbilityName )</code>|
GetNumBuffs|<code>Entities.GetNumBuffs( integer nEntityIndex )</code>|
GetBuff|<code>Entities.GetBuff( integer nEntityIndex, integer nBufIndex )</code>|
SetMinimapIcon|<code>Entities.SetMinimapIcon( integer nEntityIndex, cstring pszMinimapIcon )</code>|Set the minimap icon on this client.
GetAbilityPoints|<code>Entities.GetAbilityPoints( integer nEntityIndex )</code>|
GetCurrentXP|<code>Entities.GetCurrentXP( integer nEntityIndex )</code>|
GetNeededXPToLevel|<code>Entities.GetNeededXPToLevel( integer nEntityIndex )</code>|
GetSelectionEntities|<code>Entities.GetSelectionEntities( integer nEntityIndex )</code>|Get the currently selected entities
IsValidEntity|<code>Entities.IsValidEntity( integer nEntityIndex )</code>|Is this a valid entity index?
IsItemPhysical|<code>Entities.IsItemPhysical( integer nEntityIndex )</code>|Is this entity an item container in the world?
GetContainedItem|<code>Entities.GetContainedItem( integer nEntityIndex )</code>|Get the item contained in this physical item container.


# CScriptBindingPR_Abilities
Function|Signature|Description
--|--|--
GetAbilityName|<code>Abilities.GetAbilityName( integer nEntityIndex )</code>|
GetAbilityTextureName|<code>Abilities.GetAbilityTextureName( integer nEntityIndex )</code>|
GetAssociatedPrimaryAbilities|<code>Abilities.GetAssociatedPrimaryAbilities( integer nEntityIndex )</code>|
GetAssociatedSecondaryAbilities|<code>Abilities.GetAssociatedSecondaryAbilities( integer nEntityIndex )</code>|
GetHotkeyOverride|<code>Abilities.GetHotkeyOverride( integer nEntityIndex )</code>|
GetIntrinsicModifierName|<code>Abilities.GetIntrinsicModifierName( integer nEntityIndex )</code>|
GetSharedCooldownName|<code>Abilities.GetSharedCooldownName( integer nEntityIndex )</code>|
AbilityReady|<code>Abilities.AbilityReady( integer nEntityIndex )</code>|
CanAbilityBeUpgraded|<code>Abilities.CanAbilityBeUpgraded( integer nEntityIndex )</code>|Returns an AbilityLearnResult_t
CanBeExecuted|<code>Abilities.CanBeExecuted( integer nEntityIndex )</code>|
GetAbilityDamage|<code>Abilities.GetAbilityDamage( integer nEntityIndex )</code>|
GetAbilityDamageType|<code>Abilities.GetAbilityDamageType( integer nEntityIndex )</code>|
GetAbilityTargetFlags|<code>Abilities.GetAbilityTargetFlags( integer nEntityIndex )</code>|
GetAbilityTargetTeam|<code>Abilities.GetAbilityTargetTeam( integer nEntityIndex )</code>|
GetAbilityTargetType|<code>Abilities.GetAbilityTargetType( integer nEntityIndex )</code>|
GetAbilityType|<code>Abilities.GetAbilityType( integer nEntityIndex )</code>|
GetBehavior|<code>Abilities.GetBehavior( integer nEntityIndex )</code>|
GetCastRange|<code>Abilities.GetCastRange( integer nEntityIndex )</code>|
GetChannelledManaCostPerSecond|<code>Abilities.GetChannelledManaCostPerSecond( integer nEntityIndex )</code>|
GetCurrentCharges|<code>Abilities.GetCurrentCharges( integer nEntityIndex )</code>|
GetCurrentAbilityCharges|<code>Abilities.GetCurrentAbilityCharges( integer nEntityIndex )</code>|
GetEffectiveLevel|<code>Abilities.GetEffectiveLevel( integer nEntityIndex )</code>|
GetHeroLevelRequiredToUpgrade|<code>Abilities.GetHeroLevelRequiredToUpgrade( integer nEntityIndex )</code>|
GetLevel|<code>Abilities.GetLevel( integer nEntityIndex )</code>|
GetManaCost|<code>Abilities.GetManaCost( integer nEntityIndex )</code>|
GetMaxLevel|<code>Abilities.GetMaxLevel( integer nEntityIndex )</code>|
AttemptToUpgrade|<code>Abilities.AttemptToUpgrade( integer nEntityIndex )</code>|
CanLearn|<code>Abilities.CanLearn( integer nEntityIndex )</code>|
GetAutoCastState|<code>Abilities.GetAutoCastState( integer nEntityIndex )</code>|
GetToggleState|<code>Abilities.GetToggleState( integer nEntityIndex )</code>|
HasScepterUpgradeTooltip|<code>Abilities.HasScepterUpgradeTooltip( integer nEntityIndex )</code>|
IsActivated|<code>Abilities.IsActivated( integer nEntityIndex )</code>|
IsActivatedChanging|<code>Abilities.IsActivatedChanging( integer nEntityIndex )</code>|
IsAttributeBonus|<code>Abilities.IsAttributeBonus( integer nEntityIndex )</code>|
IsAutocast|<code>Abilities.IsAutocast( integer nEntityIndex )</code>|
IsCooldownReady|<code>Abilities.IsCooldownReady( integer nEntityIndex )</code>|
IsDisplayedAbility|<code>Abilities.IsDisplayedAbility( integer nEntityIndex )</code>|
IsHidden|<code>Abilities.IsHidden( integer nEntityIndex )</code>|
IsHiddenWhenStolen|<code>Abilities.IsHiddenWhenStolen( integer nEntityIndex )</code>|
IsInAbilityPhase|<code>Abilities.IsInAbilityPhase( integer nEntityIndex )</code>|
IsItem|<code>Abilities.IsItem( integer nEntityIndex )</code>|
IsMarkedAsDirty|<code>Abilities.IsMarkedAsDirty( integer nEntityIndex )</code>|
IsMuted|<code>Abilities.IsMuted( integer nEntityIndex )</code>|
IsOnCastbar|<code>Abilities.IsOnCastbar( integer nEntityIndex )</code>|
IsOnLearnbar|<code>Abilities.IsOnLearnbar( integer nEntityIndex )</code>|
IsOwnersGoldEnough|<code>Abilities.IsOwnersGoldEnough( integer nEntityIndex )</code>|
IsOwnersGoldEnoughForUpgrade|<code>Abilities.IsOwnersGoldEnoughForUpgrade( integer nEntityIndex )</code>|
IsOwnersManaEnough|<code>Abilities.IsOwnersManaEnough( integer nEntityIndex )</code>|
IsPassive|<code>Abilities.IsPassive( integer nEntityIndex )</code>|
IsRecipe|<code>Abilities.IsRecipe( integer nEntityIndex )</code>|
IsSharedWithTeammates|<code>Abilities.IsSharedWithTeammates( integer nEntityIndex )</code>|
IsStealable|<code>Abilities.IsStealable( integer nEntityIndex )</code>|
IsStolen|<code>Abilities.IsStolen( integer nEntityIndex )</code>|
IsToggle|<code>Abilities.IsToggle( integer nEntityIndex )</code>|
UsesAbilityCharges|<code>Abilities.UsesAbilityCharges( integer nEntityIndex )</code>|
GetAOERadius|<code>Abilities.GetAOERadius( integer nEntityIndex )</code>|
GetBackswingTime|<code>Abilities.GetBackswingTime( integer nEntityIndex )</code>|
GetCastPoint|<code>Abilities.GetCastPoint( integer nEntityIndex )</code>|
GetChannelStartTime|<code>Abilities.GetChannelStartTime( integer nEntityIndex )</code>|
GetChannelTime|<code>Abilities.GetChannelTime( integer nEntityIndex )</code>|
GetCooldown|<code>Abilities.GetCooldown( integer nEntityIndex )</code>|
GetCooldownLength|<code>Abilities.GetCooldownLength( integer nEntityIndex )</code>|
GetCooldownTime|<code>Abilities.GetCooldownTime( integer nEntityIndex )</code>|
GetCooldownTimeRemaining|<code>Abilities.GetCooldownTimeRemaining( integer nEntityIndex )</code>|
GetDuration|<code>Abilities.GetDuration( integer nEntityIndex )</code>|
GetUpgradeBlend|<code>Abilities.GetUpgradeBlend( integer nEntityIndex )</code>|
GetAbilityChargeRestoreTimeRemaining|<code>Abilities.GetAbilityChargeRestoreTimeRemaining( integer nEntityIndex )</code>|
GetLocalPlayerActiveAbility|<code>Abilities.GetLocalPlayerActiveAbility()</code>|Get the local player's current active ability. (Pre-cast targetting state.)
GetCaster|<code>Abilities.GetCaster( integer nAbilityIndex )</code>|
GetCustomValueFor|<code>Abilities.GetCustomValueFor( integer nAbilityIndex, cstring pszAbilityVarName )</code>|
GetLevelSpecialValueFor|<code>Abilities.GetLevelSpecialValueFor( integer nAbilityIndex, cstring szName, integer nLevel )</code>|
GetSpecialValueFor|<code>Abilities.GetSpecialValueFor( integer nAbilityIndex, cstring szName )</code>|
IsCosmetic|<code>Abilities.IsCosmetic( integer nAbilityIndex, integer nTargetEntityIndex )</code>|
ExecuteAbility|<code>Abilities.ExecuteAbility( integer nAbilityEntIndex, integer nCasterEntIndex, boolean bIsQuickCast )</code>|Attempt to execute the specified ability (Equivalent to clicking the ability in the HUD action bar)
GetMaxAbilityCharges|<code>Abilities.GetMaxAbilityCharges( integer nAbilityEntIndex )</code>|Get the max ability charge count.
CreateDoubleTapCastOrder|<code>Abilities.CreateDoubleTapCastOrder( integer nAbilityEntIndex, integer nCasterEntIndex )</code>|Attempt to double-tap (self-cast) the specified ability (Equivalent to double-clicking the ability in the HUD action bar)
PingAbility|<code>Abilities.PingAbility( integer nAbilityIndex )</code>|Ping the specified ability (Equivalent to alt-clicking the ability in the HUD action bar)
GetKeybind|<code>Abilities.GetKeybind( integer nAbilityEntIndex )</code>|Returns the keybind (as a string) for the specified ability.


# CScriptBindingPR_Items
Function|Signature|Description
--|--|--
ShouldDisplayCharges|<code>Items.ShouldDisplayCharges( integer nEntityIndex )</code>|
AlwaysDisplayCharges|<code>Items.AlwaysDisplayCharges( integer nEntityIndex )</code>|
ShowSecondaryCharges|<code>Items.ShowSecondaryCharges( integer nEntityIndex )</code>|
CanBeSoldByLocalPlayer|<code>Items.CanBeSoldByLocalPlayer( integer nEntityIndex )</code>|
CanDoubleTapCast|<code>Items.CanDoubleTapCast( integer nEntityIndex )</code>|
ForceHideCharges|<code>Items.ForceHideCharges( integer nEntityIndex )</code>|
IsAlertableItem|<code>Items.IsAlertableItem( integer nEntityIndex )</code>|
IsCastOnPickup|<code>Items.IsCastOnPickup( integer nEntityIndex )</code>|
IsDisassemblable|<code>Items.IsDisassemblable( integer nEntityIndex )</code>|
IsDroppable|<code>Items.IsDroppable( integer nEntityIndex )</code>|
IsInnatelyDisassemblable|<code>Items.IsInnatelyDisassemblable( integer nEntityIndex )</code>|
IsKillable|<code>Items.IsKillable( integer nEntityIndex )</code>|
IsMuted|<code>Items.IsMuted( integer nEntityIndex )</code>|
IsPermanent|<code>Items.IsPermanent( integer nEntityIndex )</code>|
IsPurchasable|<code>Items.IsPurchasable( integer nEntityIndex )</code>|
IsRecipe|<code>Items.IsRecipe( integer nEntityIndex )</code>|
IsRecipeGenerated|<code>Items.IsRecipeGenerated( integer nEntityIndex )</code>|
IsSellable|<code>Items.IsSellable( integer nEntityIndex )</code>|
IsStackable|<code>Items.IsStackable( integer nEntityIndex )</code>|
ProRatesChargesWhenSelling|<code>Items.ProRatesChargesWhenSelling( integer nEntityIndex )</code>|
RequiresCharges|<code>Items.RequiresCharges( integer nEntityIndex )</code>|
CanBeExecuted|<code>Items.CanBeExecuted( integer nEntityIndex )</code>|
GetCost|<code>Items.GetCost( integer nEntityIndex )</code>|
GetCurrentCharges|<code>Items.GetCurrentCharges( integer nEntityIndex )</code>|
GetSecondaryCharges|<code>Items.GetSecondaryCharges( integer nEntityIndex )</code>|
GetDisplayedCharges|<code>Items.GetDisplayedCharges( integer nEntityIndex )</code>|
GetInitialCharges|<code>Items.GetInitialCharges( integer nEntityIndex )</code>|
GetItemColor|<code>Items.GetItemColor( integer nEntityIndex )</code>|
GetShareability|<code>Items.GetShareability( integer nEntityIndex )</code>|
GetAbilityTextureSF|<code>Items.GetAbilityTextureSF( integer nEntityIndex )</code>|
GetAssembledTime|<code>Items.GetAssembledTime( integer nEntityIndex )</code>|
GetPurchaseTime|<code>Items.GetPurchaseTime( integer nEntityIndex )</code>|
GetPurchaser|<code>Items.GetPurchaser( integer nItemID )</code>|
LocalPlayerDisassembleItem|<code>Items.LocalPlayerDisassembleItem( integer nItem )</code>|Attempt to have the local player disassemble the specified item. Returns false if the order wasn't issued.
LocalPlayerDropItemFromStash|<code>Items.LocalPlayerDropItemFromStash( integer nItem )</code>|Attempt to have the local player drop the specified item from its stash. Returns false if the order wasn't issued.
LocalPlayerItemAlertAllies|<code>Items.LocalPlayerItemAlertAllies( integer nItem )</code>|Attempt to have the local player alert allies about the specified item. Returns false if the order wasn't issued.
LocalPlayerMoveItemToStash|<code>Items.LocalPlayerMoveItemToStash( integer nItem )</code>|Attempt to have the local player move the specified item to its stash. Returns false if the order wasn't issued.
LocalPlayerSellItem|<code>Items.LocalPlayerSellItem( integer nItem )</code>|Attempt to have the local player sell the specified item. Returns false if the order wasn't issued.


# CScriptBindingPR_Game
Function|Signature|Description
--|--|--
Time|<code>Game.Time()</code>|
GetGameTime|<code>Game.GetGameTime()</code>|
GetGameFrameTime|<code>Game.GetGameFrameTime()</code>|
GetDOTATime|<code>Game.GetDOTATime( boolean bIncludePreGame, boolean bIncludeNegativeTime )</code>|
IsGamePaused|<code>Game.IsGamePaused()</code>|
IsDayTime|<code>Game.IsDayTime()</code>|
IsInToolsMode|<code>Game.IsInToolsMode()</code>|
IsInBanPhase|<code>Game.IsInBanPhase()</code>|
GetGameWinner|<code>Game.GetGameWinner()</code>|Return the team id of the winning team.
GetStateTransitionTime|<code>Game.GetStateTransitionTime()</code>|
GetCustomGameDifficulty|<code>Game.GetCustomGameDifficulty()</code>|Get the difficulty setting of the game.
IsHUDFlipped|<code>Game.IsHUDFlipped()</code>|Returns true if the user has enabled flipped HUD
GetScreenWidth|<code>Game.GetScreenWidth()</code>|Returns the width of the display.
GetScreenHeight|<code>Game.GetScreenHeight()</code>|Returns the height of the display.
WorldToScreenX|<code>Game.WorldToScreenX( float x, float y, float z )</code>|Converts the specified x,y,z world co-ordinate into an x screen coordinate. Returns -1 if behind the camera
WorldToScreenY|<code>Game.WorldToScreenY( float x, float y, float z )</code>|Converts the specified x,y,z world co-ordinate into a y screen coordinate. Returns -1 if behind the camera
ScreenXYToWorld|<code>Game.ScreenXYToWorld( integer nX, integer nY )</code>|Converts the specified x, y screen coordinates into a x, y, z world coordinates.
GetKeybindForAbility|<code>Game.GetKeybindForAbility( integer iSlot )</code>|Returns the keybind (as a string) for the requested ability slot.
GetKeybindForInventorySlot|<code>Game.GetKeybindForInventorySlot( integer iSlot )</code>|Returns the keybind (as a string) for the requested inventory slot.
GetKeybindForCommand|<code>Game.GetKeybindForCommand( integer nCommand )</code>|Returns the keybind (as a string).
CreateCustomKeyBind|<code>Game.CreateCustomKeyBind( cstring pszKey, cstring pszCommand )</code>|Create a new keybind.
GetNianFightTimeLeft|<code>Game.GetNianFightTimeLeft()</code>|
Diretide2020ShouldShowGameInfo|<code>Game.Diretide2020ShouldShowGameInfo()</code>|
Diretide2020SetShowGameInfo|<code>Game.Diretide2020SetShowGameInfo( boolean bShowGameInfo )</code>|
Diretide2020GetGameplayTipNumber|<code>Game.Diretide2020GetGameplayTipNumber()</code>|
Diretide2020SetGameplayTipNumber|<code>Game.Diretide2020SetGameplayTipNumber( integer nGameplayTipNumber )</code>|
NemesticeGetGameplayTipNumber|<code>Game.NemesticeGetGameplayTipNumber()</code>|
NemesticeSetGameplayTipNumber|<code>Game.NemesticeSetGameplayTipNumber( integer nGameplayTipNumber )</code>|
NemesticeShouldShowGameInfo|<code>Game.NemesticeShouldShowGameInfo()</code>|
NemesticeSetShowGameInfo|<code>Game.NemesticeSetShowGameInfo( boolean bShowGameInfo )</code>|
Winter2022ShouldShowGameInfo|<code>Game.Winter2022ShouldShowGameInfo()</code>|
Winter2022SetShowGameInfo|<code>Game.Winter2022SetShowGameInfo( boolean bShowGameInfo )</code>|
Winter2022GetGameplayTipNumber|<code>Game.Winter2022GetGameplayTipNumber()</code>|
Winter2022SetGameplayTipNumber|<code>Game.Winter2022SetGameplayTipNumber( integer nGameplayTipNumber )</code>|
ForceCustomUILoad|<code>Game.ForceCustomUILoad()</code>|
CutToDefaultCamera|<code>Game.CutToDefaultCamera()</code>|
PlayDataDrivenCamera|<code>Game.PlayDataDrivenCamera( cstring pszCameraName )</code>|
GetState|<code>Game.GetState()</code>|
GameStateIs|<code>Game.GameStateIs( integer nState )</code>|
GameStateIsBefore|<code>Game.GameStateIsBefore( integer nState )</code>|
GameStateIsAfter|<code>Game.GameStateIsAfter( integer nState )</code>|
AddCommand|<code>Game.AddCommand( cstring pszCommandName, js_value callback, cstring pszDescription, integer nFlags )</code>|
GetJoyFocusPanel|<code>Game.GetJoyFocusPanel()</code>|
SetJoyFocusPanel|<code>Game.SetJoyFocusPanel( js_value pPanelArg )</code>|
PushJoyFocusPanel|<code>Game.PushJoyFocusPanel( js_value pPanelArg )</code>|
PopJoyFocusPanel|<code>Game.PopJoyFocusPanel()</code>|
GetLocalPlayerID|<code>Game.GetLocalPlayerID()</code>|
PlayerJoinTeam|<code>Game.PlayerJoinTeam( integer nTeamID )</code>|Assign the local player to the specified team
AutoAssignPlayersToTeams|<code>Game.AutoAssignPlayersToTeams()</code>|Assign the currently unassigned players to teams
ShufflePlayerTeamAssignments|<code>Game.ShufflePlayerTeamAssignments()</code>|Shuffle the team assignments of all of the players currently assigned to a team.
SetRemainingSetupTime|<code>Game.SetRemainingSetupTime( float flSeconds )</code>|Set the remaining seconds in team setup before the game starts. -1 to stop the countdown timer
SetAutoLaunchDelay|<code>Game.SetAutoLaunchDelay( float flSeconds )</code>|Set the amount of time in seconds that will be set as the remaining time when all players are assigned to a team.
SetAutoLaunchEnabled|<code>Game.SetAutoLaunchEnabled( boolean bEnable )</code>|Enable or disable automatically starting the game once all players are assigned to a team
GetAutoLaunchEnabled|<code>Game.GetAutoLaunchEnabled()</code>|Return true of false indicating if automatically starting the game is enabled.
SetTeamSelectionLocked|<code>Game.SetTeamSelectionLocked( boolean bLockTeams )</code>|Lock the team selection preventing players from swiching teams.
GetTeamSelectionLocked|<code>Game.GetTeamSelectionLocked()</code>|Returns true or false to indicate if team selection is locked
GetAllTeamIDs|<code>Game.GetAllTeamIDs()</code>|Get all team IDs
GetAllPlayerIDs|<code>Game.GetAllPlayerIDs()</code>|Get all player IDs
GetUnassignedPlayerIDs|<code>Game.GetUnassignedPlayerIDs()</code>|Get unassigned player IDs
GetPlayerUltimateStateOrTime|<code>Game.GetPlayerUltimateStateOrTime( integer nPlayerID )</code>|Get info about the player hero ultimate ability
IsPlayerMuted|<code>Game.IsPlayerMuted( integer nPlayerID )</code>|Whether the local player has muted text and voice chat for the specified player id
SetPlayerMuted|<code>Game.SetPlayerMuted( integer nPlayerID, boolean bMuted )</code>|Set whether the local player has muted text and voice chat for the specified player id
IsPlayerMutedVoice|<code>Game.IsPlayerMutedVoice( integer nPlayerID )</code>|Whether the local player has muted voice chat for the specified player id
SetPlayerMutedVoice|<code>Game.SetPlayerMutedVoice( integer nPlayerID, boolean bMutedVoice )</code>|Set whether the local player has muted voice chat for the specified player id
IsPlayerMutedText|<code>Game.IsPlayerMutedText( integer nPlayerID )</code>|Whether the local player has muted text chat for the specified player id
SetPlayerMutedText|<code>Game.SetPlayerMutedText( integer nPlayerID, boolean bMutedText )</code>|Set whether the local player has muted text chat for the specified player id
GetTeamDetails|<code>Game.GetTeamDetails( integer nTeam )</code>|Get detailed information for the given team
GetLocalPlayerInfo|<code>Game.GetLocalPlayerInfo()</code>|Get details for the local player
GetPlayerItems|<code>Game.GetPlayerItems( integer nPlayerID )</code>|Get info about the player items.
GetPlayerInfo|<code>Game.GetPlayerInfo( integer nPlayerID )</code>|Get info about the given player
GetPlayerIDsOnTeam|<code>Game.GetPlayerIDsOnTeam( integer nTeam )</code>|Get player IDs for the given team
ServerCmd|<code>Game.ServerCmd( cstring pMsg )</code>|
SetDotaRefractHeroes|<code>Game.SetDotaRefractHeroes( boolean bEnabled )</code>|
FinishGame|<code>Game.FinishGame()</code>|
LeaveCurrentGame|<code>Game.LeaveCurrentGame()</code>|
Disconnect|<code>Game.Disconnect()</code>|
FindEventMatch|<code>Game.FindEventMatch()</code>|
SlideOutEventGamePlayButton|<code>Game.SlideOutEventGamePlayButton()</code>|
EmitSound|<code>Game.EmitSound( cstring pSoundEventName )</code>|Emit a sound for the local player. Returns an integer handle that can be passed to StopSound. (Returns 0 on failure.)
StopSound|<code>Game.StopSound( integer nHandle )</code>|Stop a current playing sound on the local player. Takes handle from a call to EmitSound.
IsShopOpen|<code>Game.IsShopOpen()</code>|Ask whether the in game shop is open.
SetCustomShopEntityString|<code>Game.SetCustomShopEntityString( cstring pszCustomShopEntityString )</code>|Set custom shop context.
GetConvarBool|<code>Game.GetConvarBool( cstring cvar )</code>|Get the bool value of the specific convar. Asserts if invalid and returns false
GetConvarInt|<code>Game.GetConvarInt( cstring cvar )</code>|Get the int value of the specific convar. Asserts if invalid and returns 0
GetConvarFloat|<code>Game.GetConvarFloat( cstring cvar )</code>|Get the float value of the specific convar. Asserts if invalid and returns 0.f
GetMapInfo|<code>Game.GetMapInfo()</code>|Return information about the current map.
PrepareUnitOrders|<code>Game.PrepareUnitOrders( js_raw_args args )</code>|Orders from the local player - takes a single arguments object that supports: dotaunitorder_t OrderType, ent_index TargetIndex, vector Position, ent_index AbilityIndex, OrderIssuer_t OrderIssuer, ent_index UnitIndex, OrderQueueBehavior_t QueueBehavior, bool ShowEffects.
DropItemAtCursor|<code>Game.DropItemAtCursor( integer nControlledUnitEnt, integer nItemEnt )</code>|Order a unit to drop the specified item at the current cursor location.
Length2D|<code>Game.Length2D( js_value vec1, js_value vec2 )</code>|Calculate 2D length.
Normalized|<code>Game.Normalized( js_value vec )</code>|Returns normalized vector.
EnterAbilityLearnMode|<code>Game.EnterAbilityLearnMode()</code>|
EndAbilityLearnMode|<code>Game.EndAbilityLearnMode()</code>|
IsInAbilityLearnMode|<code>Game.IsInAbilityLearnMode()</code>|


# CDOTA_PanoramaScript_GameUI
Function|Signature|Description
--|--|--
SetDefaultUIEnabled|<code>GameUI.SetDefaultUIEnabled( integer nElementType, boolean bVisible )</code>|Control whether the default UI is enabled
SavePersistentEventGameData|<code>GameUI.SavePersistentEventGameData( js_value val )</code>|Save persistent data used by an event game
LoadPersistentEventGameData|<code>GameUI.LoadPersistentEventGameData( js_raw_args args )</code>|Load persistent data used by an event game
CustomUIConfig|<code>GameUI.CustomUIConfig( js_raw_args args )</code>|Get the current UI configuration
PingMinimapAtLocation|<code>GameUI.PingMinimapAtLocation( js_value vec3 )</code>|Create a minimap ping at the given location
SetMouseCallback|<code>GameUI.SetMouseCallback( js_value callbackFn )</code>|Install a mouse input filter
AreTipsAvailable|<code>GameUI.AreTipsAvailable()</code>|Query to check if Tips are available for the local player
IsPlayerTippable|<code>GameUI.IsPlayerTippable( integer iPlayerID )</code>|Query to see if the local player can tip a specific player
TipPlayer|<code>GameUI.TipPlayer( integer iPlayerID )</code>|Tip a player
EnableAliMode|<code>GameUI.EnableAliMode( boolean bEnable, integer nPort, js_value offsetVal, float flScale )</code>|
GetCursorPosition|<code>GameUI.GetCursorPosition( js_raw_args args )</code>|Get the current mouse position.
FindScreenEntities|<code>GameUI.FindScreenEntities( js_raw_args args )</code>|Return the entity index of the entity under the given screen position.
GetScreenWorldPosition|<code>GameUI.GetScreenWorldPosition( js_raw_args args )</code>|Get the world position of the screen position, or null if the cursor is out of the world.
WasMousePressed|<code>GameUI.WasMousePressed( integer nButtonNum )</code>|Install a mouse input filter
WasMouseDoublePressed|<code>GameUI.WasMouseDoublePressed( integer nButtonNum )</code>|Install a mouse input filter
IsMouseDown|<code>GameUI.IsMouseDown( integer nButtonNum )</code>|Install a mouse input filter
IsShiftDown|<code>GameUI.IsShiftDown()</code>|Is the shift button pressed?
IsAltDown|<code>GameUI.IsAltDown()</code>|Is the alt button pressed?
IsControlDown|<code>GameUI.IsControlDown()</code>|Is the control button pressed?
GetClickBehaviors|<code>GameUI.GetClickBehaviors()</code>|Get the current UI click interaction mode.
SelectUnit|<code>GameUI.SelectUnit( integer nEntityIndex, boolean bAddToGroup )</code>|Select a unit, adding it to the group or replacing the current selection.
GetCameraLookAtPosition|<code>GameUI.GetCameraLookAtPosition()</code>|Get the current look at position.
GetCameraPosition|<code>GameUI.GetCameraPosition()</code>|Get the current camera position.
GetCameraLookAtPositionHeightOffset|<code>GameUI.GetCameraLookAtPositionHeightOffset()</code>|Get the current look at position height offset.
SetCameraPitchMin|<code>GameUI.SetCameraPitchMin( float flPitchMin )</code>|Set the minimum camera pitch angle.
SetCameraPitchMax|<code>GameUI.SetCameraPitchMax( float flPitchMax )</code>|Set the maximum camera pitch angle.
SetCameraYaw|<code>GameUI.SetCameraYaw( float flCameraYaw )</code>|Set the camera's yaw.
GetCameraYaw|<code>GameUI.GetCameraYaw()</code>|Get the camera's yaw.
SetCameraLookAtPositionHeightOffset|<code>GameUI.SetCameraLookAtPositionHeightOffset( float flCameraLookAtHeightOffset )</code>|Offset the camera's look at point.
SetCameraPositionFromLateralLookAtPosition|<code>GameUI.SetCameraPositionFromLateralLookAtPosition( float x, float y )</code>|Set the camera from a lateral position.
SetCameraTerrainAdjustmentEnabled|<code>GameUI.SetCameraTerrainAdjustmentEnabled( boolean bEnabled )</code>|Set whether the camera should automatically adjust to average terrain height.
SetCameraDistance|<code>GameUI.SetCameraDistance( float flDistance )</code>|Set the camera distance from the look at point.
SetRenderBottomInsetOverride|<code>GameUI.SetRenderBottomInsetOverride( integer nInset )</code>|Set the gap between the bottom of the screen and the game rendering viewport. (Value expressed as pixels in a normalized 1024x768 viewport.)
SetRenderTopInsetOverride|<code>GameUI.SetRenderTopInsetOverride( integer nInset )</code>|Set the gap between the top of the screen and the game rendering viewport. (Value expressed as pixels in a normalized 1024x768 viewport.)
SetCameraTarget|<code>GameUI.SetCameraTarget( integer nTargetEntIndex )</code>|Set the camera target for the local player, or -1 to clear.
SetCameraTargetPosition|<code>GameUI.SetCameraTargetPosition( js_value vec3, float flLerp )</code>|Set the camera target as position for the local player over specified lerp.
MoveCameraToEntity|<code>GameUI.MoveCameraToEntity( integer nTargetEntIndex )</code>|Moves the camera to an entity, but doesn't lock the camera on that entity.
WorldToScreenXYClamped|<code>GameUI.WorldToScreenXYClamped( js_value vec3 )</code>|Converts the specified x,y,z world co-ordinate into an x,y screen coordinate. Will clamp position to always be in front of camera.  Position returned as 0->1.0
GetPlayerScoreboardScore|<code>GameUI.GetPlayerScoreboardScore( cstring pszScoreboardName )</code>|Get the current players scoreboard score for the specified zone.
SendCustomHUDError|<code>GameUI.SendCustomHUDError( cstring pszErrorText, cstring pszErrorSound )</code>|Send a custom client side error message with passed string and soundevent.
ReplaceDOTAAbilitySpecialValues|<code>GameUI.ReplaceDOTAAbilitySpecialValues( js_raw_args args )</code>|Given a passed ability, replace the special value variables in the passed localized text.
DisplayCustomContextualTip|<code>GameUI.DisplayCustomContextualTip( js_raw_args args )</code>|Display a custom contextual tip (wizard tip) with specific loc string and duration
SetupDOTATalentNameLabel|<code>GameUI.SetupDOTATalentNameLabel( js_raw_args args )</code>|Set the text of a passed label for a DOTA Talent using ability values.
IsAbilityDOTATalent|<code>GameUI.IsAbilityDOTATalent( cstring pszAbilityName )</code>|Returns true if the passed ability is a talent.


# CDOTA_PanoramaScript_Particles
Function|Signature|Description
--|--|--
CreateParticle|<code>Particles.CreateParticle( cstring pParticleName, integer nAttachType, integer nEntityToAttach )</code>|Create a particle system
ReleaseParticleIndex|<code>Particles.ReleaseParticleIndex( integer iIndex )</code>|Release a particle system
DestroyParticleEffect|<code>Particles.DestroyParticleEffect( integer iIndex, boolean bDestroyImmediately )</code>|Destroy a particle system
SetParticleControl|<code>Particles.SetParticleControl( integer iIndex, integer iPoint, js_value vPosVal )</code>|Set a control point on a particle system
SetParticleControlForward|<code>Particles.SetParticleControlForward( integer iIndex, integer iPoint, js_value vForwardVal )</code>|[OBSOLETE - Use SetParticleControlTransformForward] Set the orientation on a control point on a particle system
SetParticleControlTransform|<code>Particles.SetParticleControlTransform( integer iIndex, integer iPoint, js_value vOriginVal, js_value vAnglesVal )</code>|Set the position and orientation on a control point on a particle system
SetParticleControlTransformForward|<code>Particles.SetParticleControlTransformForward( integer iIndex, integer iPoint, js_value vOriginVal, js_value vForwardVal )</code>|Set the position and orientation (derived from a forward direction) on a control point on a particle system
SetParticleAlwaysSimulate|<code>Particles.SetParticleAlwaysSimulate( integer iIndex )</code>|
SetParticleControlEnt|<code>Particles.SetParticleControlEnt( integer iIndex, integer iPoint, integer iEntIndex, integer iAttachType, cstring pszAttachName, js_value vecFallbackPositionVal, boolean bIncludeWearables )</code>|Set a control point to track an entity on a particle system


# CDOTA_PanoramaScript_EventData
Function|Signature|Description
--|--|--
GetEventActionScore|<code>EventData.GetEventActionScore( integer unEventID, integer unActionID )</code>|Get the score of an EventAction
GetPeriodicResourceUsed|<code>EventData.GetPeriodicResourceUsed( unsigned unPeriodicResourceID )</code>|Get a periodic resource value used
GetPeriodicResourceMax|<code>EventData.GetPeriodicResourceMax( unsigned unPeriodicResourceID )</code>|Get a periodic resource value max
IsFirstRunThisEvent|<code>EventData.IsFirstRunThisEvent()</code>|Is this the first time we've launched this season?


# CDOTA_PanoramaScript_LocalInventory
Function|Signature|Description
--|--|--
HasItemByDefinition|<code>LocalInventory.HasItemByDefinition( integer nDefIndex )</code>|Does the player have an inventory item of a given item definition index?


# $
Function|Signature|Description
--|--|--
Msg|<code>Msg( js_raw_args js_raw_args_1 )</code>|Log a message
AssertHelper|<code>AssertHelper( js_raw_args js_raw_args_1 )</code>|Trigger an assert
Warning|<code>Warning( js_raw_args js_raw_args_1 )</code>|Log a warning message to specified channel
DispatchEvent|<code>DispatchEvent( js_raw_args js_raw_args_1 )</code>|Dispatch an event
DispatchEventAsync|<code>DispatchEventAsync( js_raw_args js_raw_args_1 )</code>|Dispatch an event to occur later
RegisterEventHandler|<code>RegisterEventHandler( js_raw_args js_raw_args_1 )</code>|Register an event handler
RegisterForUnhandledEvent|<code>RegisterForUnhandledEvent( js_raw_args js_raw_args_1 )</code>|Register a handler for an event that is not otherwise handled
UnregisterForUnhandledEvent|<code>UnregisterForUnhandledEvent( js_raw_args js_raw_args_1 )</code>|Remove an unhandled event handler
FindChildInContext|<code>FindChildInContext( js_raw_args js_raw_args_1 )</code>|Find an element
AsyncWebRequest|<code>AsyncWebRequest( js_raw_args js_raw_args_1 )</code>|Make a web request (disabled)
CreatePanel|<code>CreatePanel( js_raw_args js_raw_args_1 )</code>|Create a new panel
CreatePanelWithProperties|<code>CreatePanelWithProperties( js_raw_args js_raw_args_1 )</code>|Create a new panel supplying a JS object as a fourth parameter containing properties to be applied to the panel
Localize|<code>Localize( js_raw_args js_raw_args_1 )</code>|Localize a string. Optionally accepts Quantity, Precision, and Panel arguments.
LocalizePlural|<code>LocalizePlural( js_raw_args js_raw_args_1 )</code>|Localize a plural string
Language|<code>Language( js_raw_args js_raw_args_1 )</code>|Get the current language
Schedule|<code>Schedule( js_raw_args js_raw_args_1 )</code>|Schedule a function to be called later
CancelScheduled|<code>CancelScheduled( js_raw_args js_raw_args_1 )</code>|Cancels a scheduled function
FrameTime|<code>FrameTime( js_raw_args js_raw_args_1 )</code>|Gets the time this frame started, in seconds since panorama was initialized
GetContextPanel|<code>GetContextPanel( js_raw_args js_raw_args_1 )</code>|Get the current panel context
RegisterKeyBind|<code>RegisterKeyBind( js_raw_args js_raw_args_1 )</code>|Register a key binding
Each|<code>Each( js_raw_args js_raw_args_1 )</code>|Call a function on each given item
DbgIsReloadingScript|<code>DbgIsReloadingScript( js_raw_args js_raw_args_1 )</code>|Call during JS startup code to check if script is being reloaded
HTMLEscape|<code>HTMLEscape( js_raw_args js_raw_args_1 )</code>|Convert a string to HTML-safe
LogChannel|<code>LogChannel( js_raw_args js_raw_args_1 )</code>|Create a logging channel


# DOTAHeroModelOverlay
Function|Signature|Description
--|--|--
visible|<code>DOTAHeroModelOverlay.visible( boolean boolean_1 )</code>|
enabled|<code>DOTAHeroModelOverlay.enabled( boolean boolean_1 )</code>|
checked|<code>DOTAHeroModelOverlay.checked( boolean boolean_1 )</code>|
defaultfocus|<code>DOTAHeroModelOverlay.defaultfocus( cstring cstring_1 )</code>|
inputnamespace|<code>DOTAHeroModelOverlay.inputnamespace( cstring cstring_1 )</code>|
hittest|<code>DOTAHeroModelOverlay.hittest( boolean boolean_1 )</code>|
hittestchildren|<code>DOTAHeroModelOverlay.hittestchildren( boolean boolean_1 )</code>|
tabindex|<code>DOTAHeroModelOverlay.tabindex( float float_1 )</code>|
selectionpos_x|<code>DOTAHeroModelOverlay.selectionpos_x( float float_1 )</code>|
selectionpos_y|<code>DOTAHeroModelOverlay.selectionpos_y( float float_1 )</code>|
type|<code>DOTAHeroModelOverlay.type()</code>|
id|<code>DOTAHeroModelOverlay.id()</code>|
layoutfile|<code>DOTAHeroModelOverlay.layoutfile()</code>|
contentwidth|<code>DOTAHeroModelOverlay.contentwidth()</code>|
contentheight|<code>DOTAHeroModelOverlay.contentheight()</code>|
desiredlayoutwidth|<code>DOTAHeroModelOverlay.desiredlayoutwidth()</code>|
desiredlayoutheight|<code>DOTAHeroModelOverlay.desiredlayoutheight()</code>|
actuallayoutwidth|<code>DOTAHeroModelOverlay.actuallayoutwidth()</code>|
actuallayoutheight|<code>DOTAHeroModelOverlay.actuallayoutheight()</code>|
actualxoffset|<code>DOTAHeroModelOverlay.actualxoffset()</code>|
actualyoffset|<code>DOTAHeroModelOverlay.actualyoffset()</code>|
scrolloffset_y|<code>DOTAHeroModelOverlay.scrolloffset_y()</code>|
scrolloffset_x|<code>DOTAHeroModelOverlay.scrolloffset_x()</code>|
actualuiscale_y|<code>DOTAHeroModelOverlay.actualuiscale_y()</code>|
actualuiscale_x|<code>DOTAHeroModelOverlay.actualuiscale_x()</code>|
style|<code>DOTAHeroModelOverlay.style()</code>|
AddClass|<code>DOTAHeroModelOverlay.AddClass( cstring cstring_1 )</code>|
RemoveClass|<code>DOTAHeroModelOverlay.RemoveClass( cstring cstring_1 )</code>|
BHasClass|<code>DOTAHeroModelOverlay.BHasClass( cstring cstring_1 )</code>|
BAscendantHasClass|<code>DOTAHeroModelOverlay.BAscendantHasClass( cstring cstring_1 )</code>|
SetHasClass|<code>DOTAHeroModelOverlay.SetHasClass( cstring cstring_1, boolean boolean_2 )</code>|
ToggleClass|<code>DOTAHeroModelOverlay.ToggleClass( cstring cstring_1 )</code>|
SwitchClass|<code>DOTAHeroModelOverlay.SwitchClass( cstring cstring_1, cstring cstring_2 )</code>|
TriggerClass|<code>DOTAHeroModelOverlay.TriggerClass( cstring cstring_1 )</code>|
ClearPanelEvent|<code>DOTAHeroModelOverlay.ClearPanelEvent( cstring cstring_1 )</code>|
SetDraggable|<code>DOTAHeroModelOverlay.SetDraggable( boolean boolean_1 )</code>|
IsDraggable|<code>DOTAHeroModelOverlay.IsDraggable()</code>|
IsSizeValid|<code>DOTAHeroModelOverlay.IsSizeValid()</code>|
GetChildCount|<code>DOTAHeroModelOverlay.GetChildCount()</code>|
GetChild|<code>DOTAHeroModelOverlay.GetChild( integer integer_1 )</code>|
GetChildIndex|<code>DOTAHeroModelOverlay.GetChildIndex( unknown_variant_type unknown_variant_type_1 )</code>|
Children|<code>DOTAHeroModelOverlay.Children()</code>|
FindChildrenWithClassTraverse|<code>DOTAHeroModelOverlay.FindChildrenWithClassTraverse( cstring cstring_1 )</code>|
GetParent|<code>DOTAHeroModelOverlay.GetParent()</code>|
SetParent|<code>DOTAHeroModelOverlay.SetParent( unknown_variant_type unknown_variant_type_1 )</code>|
FindChild|<code>DOTAHeroModelOverlay.FindChild( cstring cstring_1 )</code>|
FindChildTraverse|<code>DOTAHeroModelOverlay.FindChildTraverse( cstring cstring_1 )</code>|
FindChildInLayoutFile|<code>DOTAHeroModelOverlay.FindChildInLayoutFile( cstring cstring_1 )</code>|
FindPanelInLayoutFile|<code>DOTAHeroModelOverlay.FindPanelInLayoutFile( cstring cstring_1 )</code>|
FindAncestor|<code>DOTAHeroModelOverlay.FindAncestor( cstring cstring_1 )</code>|
RemoveAndDeleteChildren|<code>DOTAHeroModelOverlay.RemoveAndDeleteChildren()</code>|
MoveChildBefore|<code>DOTAHeroModelOverlay.MoveChildBefore( unknown_variant_type unknown_variant_type_1, unknown_variant_type unknown_variant_type_2 )</code>|
MoveChildAfter|<code>DOTAHeroModelOverlay.MoveChildAfter( unknown_variant_type unknown_variant_type_1, unknown_variant_type unknown_variant_type_2 )</code>|
GetPositionWithinWindow|<code>DOTAHeroModelOverlay.GetPositionWithinWindow()</code>|
GetPositionWithinAncestor|<code>DOTAHeroModelOverlay.GetPositionWithinAncestor( unknown_variant_type unknown_variant_type_1 )</code>|
ApplyStyles|<code>DOTAHeroModelOverlay.ApplyStyles( boolean boolean_1 )</code>|
ClearPropertyFromCode|<code>DOTAHeroModelOverlay.ClearPropertyFromCode( unknown_variant_type unknown_variant_type_1 )</code>|
DeleteAsync|<code>DOTAHeroModelOverlay.DeleteAsync( float float_1 )</code>|
BIsTransparent|<code>DOTAHeroModelOverlay.BIsTransparent()</code>|
BAcceptsInput|<code>DOTAHeroModelOverlay.BAcceptsInput()</code>|
BAcceptsFocus|<code>DOTAHeroModelOverlay.BAcceptsFocus()</code>|
SetFocus|<code>DOTAHeroModelOverlay.SetFocus()</code>|
UpdateFocusInContext|<code>DOTAHeroModelOverlay.UpdateFocusInContext()</code>|
BHasHoverStyle|<code>DOTAHeroModelOverlay.BHasHoverStyle()</code>|
SetAcceptsFocus|<code>DOTAHeroModelOverlay.SetAcceptsFocus( boolean boolean_1 )</code>|
SetDisableFocusOnMouseDown|<code>DOTAHeroModelOverlay.SetDisableFocusOnMouseDown( boolean boolean_1 )</code>|
BHasKeyFocus|<code>DOTAHeroModelOverlay.BHasKeyFocus()</code>|
SetScrollParentToFitWhenFocused|<code>DOTAHeroModelOverlay.SetScrollParentToFitWhenFocused( boolean boolean_1 )</code>|
BScrollParentToFitWhenFocused|<code>DOTAHeroModelOverlay.BScrollParentToFitWhenFocused()</code>|
IsSelected|<code>DOTAHeroModelOverlay.IsSelected()</code>|
BHasDescendantKeyFocus|<code>DOTAHeroModelOverlay.BHasDescendantKeyFocus()</code>|
BLoadLayout|<code>DOTAHeroModelOverlay.BLoadLayout( cstring cstring_1, boolean boolean_2, boolean boolean_3 )</code>|
BLoadLayoutSnippet|<code>DOTAHeroModelOverlay.BLoadLayoutSnippet( cstring cstring_1 )</code>|
BHasLayoutSnippet|<code>DOTAHeroModelOverlay.BHasLayoutSnippet( cstring cstring_1 )</code>|
SetTopOfInputContext|<code>DOTAHeroModelOverlay.SetTopOfInputContext( boolean boolean_1 )</code>|
SetDialogVariable|<code>DOTAHeroModelOverlay.SetDialogVariable( cstring cstring_1, cstring cstring_2 )</code>|
SetDialogVariableInt|<code>DOTAHeroModelOverlay.SetDialogVariableInt( cstring cstring_1, integer integer_2 )</code>|
SetDialogVariableTime|<code>DOTAHeroModelOverlay.SetDialogVariableTime( cstring cstring_1, int64 int64_2 )</code>|
SetDialogVariableLocString|<code>DOTAHeroModelOverlay.SetDialogVariableLocString( cstring cstring_1, cstring cstring_2 )</code>|
SetDialogVariablePluralLocStringInt|<code>DOTAHeroModelOverlay.SetDialogVariablePluralLocStringInt( cstring cstring_1, cstring cstring_2, int64 int64_3 )</code>|
ScrollToTop|<code>DOTAHeroModelOverlay.ScrollToTop()</code>|
ScrollToBottom|<code>DOTAHeroModelOverlay.ScrollToBottom()</code>|
ScrollToLeftEdge|<code>DOTAHeroModelOverlay.ScrollToLeftEdge()</code>|
ScrollToRightEdge|<code>DOTAHeroModelOverlay.ScrollToRightEdge()</code>|
ScrollParentToMakePanelFit|<code>DOTAHeroModelOverlay.ScrollParentToMakePanelFit( unknown_variant_type unknown_variant_type_1, boolean boolean_2 )</code>|
ScrollToFitRegion|<code>DOTAHeroModelOverlay.ScrollToFitRegion( float float_1, float float_2, float float_3, float float_4, unknown_variant_type unknown_variant_type_5, boolean boolean_6, boolean boolean_7 )</code>|
BCanSeeInParentScroll|<code>DOTAHeroModelOverlay.BCanSeeInParentScroll()</code>|
GetAttributeInt|<code>DOTAHeroModelOverlay.GetAttributeInt( cstring cstring_1, integer integer_2 )</code>|
GetAttributeString|<code>DOTAHeroModelOverlay.GetAttributeString( cstring cstring_1, cstring cstring_2 )</code>|
GetAttributeUInt32|<code>DOTAHeroModelOverlay.GetAttributeUInt32( cstring cstring_1, unsigned unsigned_2 )</code>|
SetAttributeInt|<code>DOTAHeroModelOverlay.SetAttributeInt( cstring cstring_1, integer integer_2 )</code>|
SetAttributeString|<code>DOTAHeroModelOverlay.SetAttributeString( cstring cstring_1, cstring cstring_2 )</code>|
SetAttributeUInt32|<code>DOTAHeroModelOverlay.SetAttributeUInt32( cstring cstring_1, unsigned unsigned_2 )</code>|
SetInputNamespace|<code>DOTAHeroModelOverlay.SetInputNamespace( cstring cstring_1 )</code>|
RegisterForReadyEvents|<code>DOTAHeroModelOverlay.RegisterForReadyEvents( boolean boolean_1 )</code>|
BReadyForDisplay|<code>DOTAHeroModelOverlay.BReadyForDisplay()</code>|
SetReadyForDisplay|<code>DOTAHeroModelOverlay.SetReadyForDisplay( boolean boolean_1 )</code>|
SetPositionInPixels|<code>DOTAHeroModelOverlay.SetPositionInPixels( float float_1, float float_2, float float_3 )</code>|
Data|<code>DOTAHeroModelOverlay.Data( js_raw_args js_raw_args_1 )</code>|
SetPanelEvent|<code>DOTAHeroModelOverlay.SetPanelEvent( js_raw_args js_raw_args_1 )</code>|
RunScriptInPanelContext|<code>DOTAHeroModelOverlay.RunScriptInPanelContext( js_raw_args js_raw_args_1 )</code>|
rememberchildfocus|<code>DOTAHeroModelOverlay.rememberchildfocus( boolean boolean_1 )</code>|
paneltype|<code>DOTAHeroModelOverlay.paneltype()</code>|


# DOTAPlay
Function|Signature|Description
--|--|--
visible|<code>DOTAPlay.visible( boolean boolean_1 )</code>|
enabled|<code>DOTAPlay.enabled( boolean boolean_1 )</code>|
checked|<code>DOTAPlay.checked( boolean boolean_1 )</code>|
defaultfocus|<code>DOTAPlay.defaultfocus( cstring cstring_1 )</code>|
inputnamespace|<code>DOTAPlay.inputnamespace( cstring cstring_1 )</code>|
hittest|<code>DOTAPlay.hittest( boolean boolean_1 )</code>|
hittestchildren|<code>DOTAPlay.hittestchildren( boolean boolean_1 )</code>|
tabindex|<code>DOTAPlay.tabindex( float float_1 )</code>|
selectionpos_x|<code>DOTAPlay.selectionpos_x( float float_1 )</code>|
selectionpos_y|<code>DOTAPlay.selectionpos_y( float float_1 )</code>|
type|<code>DOTAPlay.type()</code>|
id|<code>DOTAPlay.id()</code>|
layoutfile|<code>DOTAPlay.layoutfile()</code>|
contentwidth|<code>DOTAPlay.contentwidth()</code>|
contentheight|<code>DOTAPlay.contentheight()</code>|
desiredlayoutwidth|<code>DOTAPlay.desiredlayoutwidth()</code>|
desiredlayoutheight|<code>DOTAPlay.desiredlayoutheight()</code>|
actuallayoutwidth|<code>DOTAPlay.actuallayoutwidth()</code>|
actuallayoutheight|<code>DOTAPlay.actuallayoutheight()</code>|
actualxoffset|<code>DOTAPlay.actualxoffset()</code>|
actualyoffset|<code>DOTAPlay.actualyoffset()</code>|
scrolloffset_y|<code>DOTAPlay.scrolloffset_y()</code>|
scrolloffset_x|<code>DOTAPlay.scrolloffset_x()</code>|
actualuiscale_y|<code>DOTAPlay.actualuiscale_y()</code>|
actualuiscale_x|<code>DOTAPlay.actualuiscale_x()</code>|
style|<code>DOTAPlay.style()</code>|
AddClass|<code>DOTAPlay.AddClass( cstring cstring_1 )</code>|
RemoveClass|<code>DOTAPlay.RemoveClass( cstring cstring_1 )</code>|
BHasClass|<code>DOTAPlay.BHasClass( cstring cstring_1 )</code>|
BAscendantHasClass|<code>DOTAPlay.BAscendantHasClass( cstring cstring_1 )</code>|
SetHasClass|<code>DOTAPlay.SetHasClass( cstring cstring_1, boolean boolean_2 )</code>|
ToggleClass|<code>DOTAPlay.ToggleClass( cstring cstring_1 )</code>|
SwitchClass|<code>DOTAPlay.SwitchClass( cstring cstring_1, cstring cstring_2 )</code>|
TriggerClass|<code>DOTAPlay.TriggerClass( cstring cstring_1 )</code>|
ClearPanelEvent|<code>DOTAPlay.ClearPanelEvent( cstring cstring_1 )</code>|
SetDraggable|<code>DOTAPlay.SetDraggable( boolean boolean_1 )</code>|
IsDraggable|<code>DOTAPlay.IsDraggable()</code>|
IsSizeValid|<code>DOTAPlay.IsSizeValid()</code>|
GetChildCount|<code>DOTAPlay.GetChildCount()</code>|
GetChild|<code>DOTAPlay.GetChild( integer integer_1 )</code>|
GetChildIndex|<code>DOTAPlay.GetChildIndex( unknown_variant_type unknown_variant_type_1 )</code>|
Children|<code>DOTAPlay.Children()</code>|
FindChildrenWithClassTraverse|<code>DOTAPlay.FindChildrenWithClassTraverse( cstring cstring_1 )</code>|
GetParent|<code>DOTAPlay.GetParent()</code>|
SetParent|<code>DOTAPlay.SetParent( unknown_variant_type unknown_variant_type_1 )</code>|
FindChild|<code>DOTAPlay.FindChild( cstring cstring_1 )</code>|
FindChildTraverse|<code>DOTAPlay.FindChildTraverse( cstring cstring_1 )</code>|
FindChildInLayoutFile|<code>DOTAPlay.FindChildInLayoutFile( cstring cstring_1 )</code>|
FindPanelInLayoutFile|<code>DOTAPlay.FindPanelInLayoutFile( cstring cstring_1 )</code>|
FindAncestor|<code>DOTAPlay.FindAncestor( cstring cstring_1 )</code>|
RemoveAndDeleteChildren|<code>DOTAPlay.RemoveAndDeleteChildren()</code>|
MoveChildBefore|<code>DOTAPlay.MoveChildBefore( unknown_variant_type unknown_variant_type_1, unknown_variant_type unknown_variant_type_2 )</code>|
MoveChildAfter|<code>DOTAPlay.MoveChildAfter( unknown_variant_type unknown_variant_type_1, unknown_variant_type unknown_variant_type_2 )</code>|
GetPositionWithinWindow|<code>DOTAPlay.GetPositionWithinWindow()</code>|
GetPositionWithinAncestor|<code>DOTAPlay.GetPositionWithinAncestor( unknown_variant_type unknown_variant_type_1 )</code>|
ApplyStyles|<code>DOTAPlay.ApplyStyles( boolean boolean_1 )</code>|
ClearPropertyFromCode|<code>DOTAPlay.ClearPropertyFromCode( unknown_variant_type unknown_variant_type_1 )</code>|
DeleteAsync|<code>DOTAPlay.DeleteAsync( float float_1 )</code>|
BIsTransparent|<code>DOTAPlay.BIsTransparent()</code>|
BAcceptsInput|<code>DOTAPlay.BAcceptsInput()</code>|
BAcceptsFocus|<code>DOTAPlay.BAcceptsFocus()</code>|
SetFocus|<code>DOTAPlay.SetFocus()</code>|
UpdateFocusInContext|<code>DOTAPlay.UpdateFocusInContext()</code>|
BHasHoverStyle|<code>DOTAPlay.BHasHoverStyle()</code>|
SetAcceptsFocus|<code>DOTAPlay.SetAcceptsFocus( boolean boolean_1 )</code>|
SetDisableFocusOnMouseDown|<code>DOTAPlay.SetDisableFocusOnMouseDown( boolean boolean_1 )</code>|
BHasKeyFocus|<code>DOTAPlay.BHasKeyFocus()</code>|
SetScrollParentToFitWhenFocused|<code>DOTAPlay.SetScrollParentToFitWhenFocused( boolean boolean_1 )</code>|
BScrollParentToFitWhenFocused|<code>DOTAPlay.BScrollParentToFitWhenFocused()</code>|
IsSelected|<code>DOTAPlay.IsSelected()</code>|
BHasDescendantKeyFocus|<code>DOTAPlay.BHasDescendantKeyFocus()</code>|
BLoadLayout|<code>DOTAPlay.BLoadLayout( cstring cstring_1, boolean boolean_2, boolean boolean_3 )</code>|
BLoadLayoutSnippet|<code>DOTAPlay.BLoadLayoutSnippet( cstring cstring_1 )</code>|
BHasLayoutSnippet|<code>DOTAPlay.BHasLayoutSnippet( cstring cstring_1 )</code>|
SetTopOfInputContext|<code>DOTAPlay.SetTopOfInputContext( boolean boolean_1 )</code>|
SetDialogVariable|<code>DOTAPlay.SetDialogVariable( cstring cstring_1, cstring cstring_2 )</code>|
SetDialogVariableInt|<code>DOTAPlay.SetDialogVariableInt( cstring cstring_1, integer integer_2 )</code>|
SetDialogVariableTime|<code>DOTAPlay.SetDialogVariableTime( cstring cstring_1, int64 int64_2 )</code>|
SetDialogVariableLocString|<code>DOTAPlay.SetDialogVariableLocString( cstring cstring_1, cstring cstring_2 )</code>|
SetDialogVariablePluralLocStringInt|<code>DOTAPlay.SetDialogVariablePluralLocStringInt( cstring cstring_1, cstring cstring_2, int64 int64_3 )</code>|
ScrollToTop|<code>DOTAPlay.ScrollToTop()</code>|
ScrollToBottom|<code>DOTAPlay.ScrollToBottom()</code>|
ScrollToLeftEdge|<code>DOTAPlay.ScrollToLeftEdge()</code>|
ScrollToRightEdge|<code>DOTAPlay.ScrollToRightEdge()</code>|
ScrollParentToMakePanelFit|<code>DOTAPlay.ScrollParentToMakePanelFit( unknown_variant_type unknown_variant_type_1, boolean boolean_2 )</code>|
ScrollToFitRegion|<code>DOTAPlay.ScrollToFitRegion( float float_1, float float_2, float float_3, float float_4, unknown_variant_type unknown_variant_type_5, boolean boolean_6, boolean boolean_7 )</code>|
BCanSeeInParentScroll|<code>DOTAPlay.BCanSeeInParentScroll()</code>|
GetAttributeInt|<code>DOTAPlay.GetAttributeInt( cstring cstring_1, integer integer_2 )</code>|
GetAttributeString|<code>DOTAPlay.GetAttributeString( cstring cstring_1, cstring cstring_2 )</code>|
GetAttributeUInt32|<code>DOTAPlay.GetAttributeUInt32( cstring cstring_1, unsigned unsigned_2 )</code>|
SetAttributeInt|<code>DOTAPlay.SetAttributeInt( cstring cstring_1, integer integer_2 )</code>|
SetAttributeString|<code>DOTAPlay.SetAttributeString( cstring cstring_1, cstring cstring_2 )</code>|
SetAttributeUInt32|<code>DOTAPlay.SetAttributeUInt32( cstring cstring_1, unsigned unsigned_2 )</code>|
SetInputNamespace|<code>DOTAPlay.SetInputNamespace( cstring cstring_1 )</code>|
RegisterForReadyEvents|<code>DOTAPlay.RegisterForReadyEvents( boolean boolean_1 )</code>|
BReadyForDisplay|<code>DOTAPlay.BReadyForDisplay()</code>|
SetReadyForDisplay|<code>DOTAPlay.SetReadyForDisplay( boolean boolean_1 )</code>|
SetPositionInPixels|<code>DOTAPlay.SetPositionInPixels( float float_1, float float_2, float float_3 )</code>|
Data|<code>DOTAPlay.Data( js_raw_args js_raw_args_1 )</code>|
GetActiveFeaturedGamemode|<code>DOTAPlay.GetActiveFeaturedGamemode( js_raw_args js_raw_args_1 )</code>|
GetFeaturedGamemodeProgress|<code>DOTAPlay.GetFeaturedGamemodeProgress()</code>|
GetFeaturedGamemodeMax|<code>DOTAPlay.GetFeaturedGamemodeMax()</code>|
GetSelectedGameModes|<code>DOTAPlay.GetSelectedGameModes()</code>|
UpdateCasualGameModeCheckboxes|<code>DOTAPlay.UpdateCasualGameModeCheckboxes()</code>|
SetPanelEvent|<code>DOTAPlay.SetPanelEvent( js_raw_args js_raw_args_1 )</code>|
RunScriptInPanelContext|<code>DOTAPlay.RunScriptInPanelContext( js_raw_args js_raw_args_1 )</code>|
rememberchildfocus|<code>DOTAPlay.rememberchildfocus( boolean boolean_1 )</code>|
paneltype|<code>DOTAPlay.paneltype()</code>|


# Panel
Function|Signature|Description
--|--|--
visible|<code>Panel.visible( boolean boolean_1 )</code>|
enabled|<code>Panel.enabled( boolean boolean_1 )</code>|
checked|<code>Panel.checked( boolean boolean_1 )</code>|
defaultfocus|<code>Panel.defaultfocus( cstring cstring_1 )</code>|
inputnamespace|<code>Panel.inputnamespace( cstring cstring_1 )</code>|
hittest|<code>Panel.hittest( boolean boolean_1 )</code>|
hittestchildren|<code>Panel.hittestchildren( boolean boolean_1 )</code>|
tabindex|<code>Panel.tabindex( float float_1 )</code>|
selectionpos_x|<code>Panel.selectionpos_x( float float_1 )</code>|
selectionpos_y|<code>Panel.selectionpos_y( float float_1 )</code>|
type|<code>Panel.type()</code>|
id|<code>Panel.id()</code>|
layoutfile|<code>Panel.layoutfile()</code>|
contentwidth|<code>Panel.contentwidth()</code>|
contentheight|<code>Panel.contentheight()</code>|
desiredlayoutwidth|<code>Panel.desiredlayoutwidth()</code>|
desiredlayoutheight|<code>Panel.desiredlayoutheight()</code>|
actuallayoutwidth|<code>Panel.actuallayoutwidth()</code>|
actuallayoutheight|<code>Panel.actuallayoutheight()</code>|
actualxoffset|<code>Panel.actualxoffset()</code>|
actualyoffset|<code>Panel.actualyoffset()</code>|
scrolloffset_y|<code>Panel.scrolloffset_y()</code>|
scrolloffset_x|<code>Panel.scrolloffset_x()</code>|
actualuiscale_y|<code>Panel.actualuiscale_y()</code>|
actualuiscale_x|<code>Panel.actualuiscale_x()</code>|
style|<code>Panel.style()</code>|
AddClass|<code>Panel.AddClass( cstring cstring_1 )</code>|
RemoveClass|<code>Panel.RemoveClass( cstring cstring_1 )</code>|
BHasClass|<code>Panel.BHasClass( cstring cstring_1 )</code>|
BAscendantHasClass|<code>Panel.BAscendantHasClass( cstring cstring_1 )</code>|
SetHasClass|<code>Panel.SetHasClass( cstring cstring_1, boolean boolean_2 )</code>|
ToggleClass|<code>Panel.ToggleClass( cstring cstring_1 )</code>|
SwitchClass|<code>Panel.SwitchClass( cstring cstring_1, cstring cstring_2 )</code>|
TriggerClass|<code>Panel.TriggerClass( cstring cstring_1 )</code>|
ClearPanelEvent|<code>Panel.ClearPanelEvent( cstring cstring_1 )</code>|
SetDraggable|<code>Panel.SetDraggable( boolean boolean_1 )</code>|
IsDraggable|<code>Panel.IsDraggable()</code>|
IsSizeValid|<code>Panel.IsSizeValid()</code>|
GetChildCount|<code>Panel.GetChildCount()</code>|
GetChild|<code>Panel.GetChild( integer integer_1 )</code>|
GetChildIndex|<code>Panel.GetChildIndex( unknown_variant_type unknown_variant_type_1 )</code>|
Children|<code>Panel.Children()</code>|
FindChildrenWithClassTraverse|<code>Panel.FindChildrenWithClassTraverse( cstring cstring_1 )</code>|
GetParent|<code>Panel.GetParent()</code>|
SetParent|<code>Panel.SetParent( unknown_variant_type unknown_variant_type_1 )</code>|
FindChild|<code>Panel.FindChild( cstring cstring_1 )</code>|
FindChildTraverse|<code>Panel.FindChildTraverse( cstring cstring_1 )</code>|
FindChildInLayoutFile|<code>Panel.FindChildInLayoutFile( cstring cstring_1 )</code>|
FindPanelInLayoutFile|<code>Panel.FindPanelInLayoutFile( cstring cstring_1 )</code>|
FindAncestor|<code>Panel.FindAncestor( cstring cstring_1 )</code>|
RemoveAndDeleteChildren|<code>Panel.RemoveAndDeleteChildren()</code>|
MoveChildBefore|<code>Panel.MoveChildBefore( unknown_variant_type unknown_variant_type_1, unknown_variant_type unknown_variant_type_2 )</code>|
MoveChildAfter|<code>Panel.MoveChildAfter( unknown_variant_type unknown_variant_type_1, unknown_variant_type unknown_variant_type_2 )</code>|
GetPositionWithinWindow|<code>Panel.GetPositionWithinWindow()</code>|
GetPositionWithinAncestor|<code>Panel.GetPositionWithinAncestor( unknown_variant_type unknown_variant_type_1 )</code>|
ApplyStyles|<code>Panel.ApplyStyles( boolean boolean_1 )</code>|
ClearPropertyFromCode|<code>Panel.ClearPropertyFromCode( unknown_variant_type unknown_variant_type_1 )</code>|
DeleteAsync|<code>Panel.DeleteAsync( float float_1 )</code>|
BIsTransparent|<code>Panel.BIsTransparent()</code>|
BAcceptsInput|<code>Panel.BAcceptsInput()</code>|
BAcceptsFocus|<code>Panel.BAcceptsFocus()</code>|
SetFocus|<code>Panel.SetFocus()</code>|
UpdateFocusInContext|<code>Panel.UpdateFocusInContext()</code>|
BHasHoverStyle|<code>Panel.BHasHoverStyle()</code>|
SetAcceptsFocus|<code>Panel.SetAcceptsFocus( boolean boolean_1 )</code>|
SetDisableFocusOnMouseDown|<code>Panel.SetDisableFocusOnMouseDown( boolean boolean_1 )</code>|
BHasKeyFocus|<code>Panel.BHasKeyFocus()</code>|
SetScrollParentToFitWhenFocused|<code>Panel.SetScrollParentToFitWhenFocused( boolean boolean_1 )</code>|
BScrollParentToFitWhenFocused|<code>Panel.BScrollParentToFitWhenFocused()</code>|
IsSelected|<code>Panel.IsSelected()</code>|
BHasDescendantKeyFocus|<code>Panel.BHasDescendantKeyFocus()</code>|
BLoadLayout|<code>Panel.BLoadLayout( cstring cstring_1, boolean boolean_2, boolean boolean_3 )</code>|
BLoadLayoutSnippet|<code>Panel.BLoadLayoutSnippet( cstring cstring_1 )</code>|
BHasLayoutSnippet|<code>Panel.BHasLayoutSnippet( cstring cstring_1 )</code>|
SetTopOfInputContext|<code>Panel.SetTopOfInputContext( boolean boolean_1 )</code>|
SetDialogVariable|<code>Panel.SetDialogVariable( cstring cstring_1, cstring cstring_2 )</code>|
SetDialogVariableInt|<code>Panel.SetDialogVariableInt( cstring cstring_1, integer integer_2 )</code>|
SetDialogVariableTime|<code>Panel.SetDialogVariableTime( cstring cstring_1, int64 int64_2 )</code>|
SetDialogVariableLocString|<code>Panel.SetDialogVariableLocString( cstring cstring_1, cstring cstring_2 )</code>|
SetDialogVariablePluralLocStringInt|<code>Panel.SetDialogVariablePluralLocStringInt( cstring cstring_1, cstring cstring_2, int64 int64_3 )</code>|
ScrollToTop|<code>Panel.ScrollToTop()</code>|
ScrollToBottom|<code>Panel.ScrollToBottom()</code>|
ScrollToLeftEdge|<code>Panel.ScrollToLeftEdge()</code>|
ScrollToRightEdge|<code>Panel.ScrollToRightEdge()</code>|
ScrollParentToMakePanelFit|<code>Panel.ScrollParentToMakePanelFit( unknown_variant_type unknown_variant_type_1, boolean boolean_2 )</code>|
ScrollToFitRegion|<code>Panel.ScrollToFitRegion( float float_1, float float_2, float float_3, float float_4, unknown_variant_type unknown_variant_type_5, boolean boolean_6, boolean boolean_7 )</code>|
BCanSeeInParentScroll|<code>Panel.BCanSeeInParentScroll()</code>|
GetAttributeInt|<code>Panel.GetAttributeInt( cstring cstring_1, integer integer_2 )</code>|
GetAttributeString|<code>Panel.GetAttributeString( cstring cstring_1, cstring cstring_2 )</code>|
GetAttributeUInt32|<code>Panel.GetAttributeUInt32( cstring cstring_1, unsigned unsigned_2 )</code>|
SetAttributeInt|<code>Panel.SetAttributeInt( cstring cstring_1, integer integer_2 )</code>|
SetAttributeString|<code>Panel.SetAttributeString( cstring cstring_1, cstring cstring_2 )</code>|
SetAttributeUInt32|<code>Panel.SetAttributeUInt32( cstring cstring_1, unsigned unsigned_2 )</code>|
SetInputNamespace|<code>Panel.SetInputNamespace( cstring cstring_1 )</code>|
RegisterForReadyEvents|<code>Panel.RegisterForReadyEvents( boolean boolean_1 )</code>|
BReadyForDisplay|<code>Panel.BReadyForDisplay()</code>|
SetReadyForDisplay|<code>Panel.SetReadyForDisplay( boolean boolean_1 )</code>|
SetPositionInPixels|<code>Panel.SetPositionInPixels( float float_1, float float_2, float float_3 )</code>|
Data|<code>Panel.Data( js_raw_args js_raw_args_1 )</code>|
SetPanelEvent|<code>Panel.SetPanelEvent( js_raw_args js_raw_args_1 )</code>|
RunScriptInPanelContext|<code>Panel.RunScriptInPanelContext( js_raw_args js_raw_args_1 )</code>|
rememberchildfocus|<code>Panel.rememberchildfocus( boolean boolean_1 )</code>|
paneltype|<code>Panel.paneltype()</code>|


# Label
Function|Signature|Description
--|--|--
visible|<code>Label.visible( boolean boolean_1 )</code>|
enabled|<code>Label.enabled( boolean boolean_1 )</code>|
checked|<code>Label.checked( boolean boolean_1 )</code>|
defaultfocus|<code>Label.defaultfocus( cstring cstring_1 )</code>|
inputnamespace|<code>Label.inputnamespace( cstring cstring_1 )</code>|
hittest|<code>Label.hittest( boolean boolean_1 )</code>|
hittestchildren|<code>Label.hittestchildren( boolean boolean_1 )</code>|
tabindex|<code>Label.tabindex( float float_1 )</code>|
selectionpos_x|<code>Label.selectionpos_x( float float_1 )</code>|
selectionpos_y|<code>Label.selectionpos_y( float float_1 )</code>|
type|<code>Label.type()</code>|
id|<code>Label.id()</code>|
layoutfile|<code>Label.layoutfile()</code>|
contentwidth|<code>Label.contentwidth()</code>|
contentheight|<code>Label.contentheight()</code>|
desiredlayoutwidth|<code>Label.desiredlayoutwidth()</code>|
desiredlayoutheight|<code>Label.desiredlayoutheight()</code>|
actuallayoutwidth|<code>Label.actuallayoutwidth()</code>|
actuallayoutheight|<code>Label.actuallayoutheight()</code>|
actualxoffset|<code>Label.actualxoffset()</code>|
actualyoffset|<code>Label.actualyoffset()</code>|
scrolloffset_y|<code>Label.scrolloffset_y()</code>|
scrolloffset_x|<code>Label.scrolloffset_x()</code>|
actualuiscale_y|<code>Label.actualuiscale_y()</code>|
actualuiscale_x|<code>Label.actualuiscale_x()</code>|
style|<code>Label.style()</code>|
AddClass|<code>Label.AddClass( cstring cstring_1 )</code>|
RemoveClass|<code>Label.RemoveClass( cstring cstring_1 )</code>|
BHasClass|<code>Label.BHasClass( cstring cstring_1 )</code>|
BAscendantHasClass|<code>Label.BAscendantHasClass( cstring cstring_1 )</code>|
SetHasClass|<code>Label.SetHasClass( cstring cstring_1, boolean boolean_2 )</code>|
ToggleClass|<code>Label.ToggleClass( cstring cstring_1 )</code>|
SwitchClass|<code>Label.SwitchClass( cstring cstring_1, cstring cstring_2 )</code>|
TriggerClass|<code>Label.TriggerClass( cstring cstring_1 )</code>|
ClearPanelEvent|<code>Label.ClearPanelEvent( cstring cstring_1 )</code>|
SetDraggable|<code>Label.SetDraggable( boolean boolean_1 )</code>|
IsDraggable|<code>Label.IsDraggable()</code>|
IsSizeValid|<code>Label.IsSizeValid()</code>|
GetChildCount|<code>Label.GetChildCount()</code>|
GetChild|<code>Label.GetChild( integer integer_1 )</code>|
GetChildIndex|<code>Label.GetChildIndex( unknown_variant_type unknown_variant_type_1 )</code>|
Children|<code>Label.Children()</code>|
FindChildrenWithClassTraverse|<code>Label.FindChildrenWithClassTraverse( cstring cstring_1 )</code>|
GetParent|<code>Label.GetParent()</code>|
SetParent|<code>Label.SetParent( unknown_variant_type unknown_variant_type_1 )</code>|
FindChild|<code>Label.FindChild( cstring cstring_1 )</code>|
FindChildTraverse|<code>Label.FindChildTraverse( cstring cstring_1 )</code>|
FindChildInLayoutFile|<code>Label.FindChildInLayoutFile( cstring cstring_1 )</code>|
FindPanelInLayoutFile|<code>Label.FindPanelInLayoutFile( cstring cstring_1 )</code>|
FindAncestor|<code>Label.FindAncestor( cstring cstring_1 )</code>|
RemoveAndDeleteChildren|<code>Label.RemoveAndDeleteChildren()</code>|
MoveChildBefore|<code>Label.MoveChildBefore( unknown_variant_type unknown_variant_type_1, unknown_variant_type unknown_variant_type_2 )</code>|
MoveChildAfter|<code>Label.MoveChildAfter( unknown_variant_type unknown_variant_type_1, unknown_variant_type unknown_variant_type_2 )</code>|
GetPositionWithinWindow|<code>Label.GetPositionWithinWindow()</code>|
GetPositionWithinAncestor|<code>Label.GetPositionWithinAncestor( unknown_variant_type unknown_variant_type_1 )</code>|
ApplyStyles|<code>Label.ApplyStyles( boolean boolean_1 )</code>|
ClearPropertyFromCode|<code>Label.ClearPropertyFromCode( unknown_variant_type unknown_variant_type_1 )</code>|
DeleteAsync|<code>Label.DeleteAsync( float float_1 )</code>|
BIsTransparent|<code>Label.BIsTransparent()</code>|
BAcceptsInput|<code>Label.BAcceptsInput()</code>|
BAcceptsFocus|<code>Label.BAcceptsFocus()</code>|
SetFocus|<code>Label.SetFocus()</code>|
UpdateFocusInContext|<code>Label.UpdateFocusInContext()</code>|
BHasHoverStyle|<code>Label.BHasHoverStyle()</code>|
SetAcceptsFocus|<code>Label.SetAcceptsFocus( boolean boolean_1 )</code>|
SetDisableFocusOnMouseDown|<code>Label.SetDisableFocusOnMouseDown( boolean boolean_1 )</code>|
BHasKeyFocus|<code>Label.BHasKeyFocus()</code>|
SetScrollParentToFitWhenFocused|<code>Label.SetScrollParentToFitWhenFocused( boolean boolean_1 )</code>|
BScrollParentToFitWhenFocused|<code>Label.BScrollParentToFitWhenFocused()</code>|
IsSelected|<code>Label.IsSelected()</code>|
BHasDescendantKeyFocus|<code>Label.BHasDescendantKeyFocus()</code>|
BLoadLayout|<code>Label.BLoadLayout( cstring cstring_1, boolean boolean_2, boolean boolean_3 )</code>|
BLoadLayoutSnippet|<code>Label.BLoadLayoutSnippet( cstring cstring_1 )</code>|
BHasLayoutSnippet|<code>Label.BHasLayoutSnippet( cstring cstring_1 )</code>|
SetTopOfInputContext|<code>Label.SetTopOfInputContext( boolean boolean_1 )</code>|
SetDialogVariable|<code>Label.SetDialogVariable( cstring cstring_1, cstring cstring_2 )</code>|
SetDialogVariableInt|<code>Label.SetDialogVariableInt( cstring cstring_1, integer integer_2 )</code>|
SetDialogVariableTime|<code>Label.SetDialogVariableTime( cstring cstring_1, int64 int64_2 )</code>|
SetDialogVariableLocString|<code>Label.SetDialogVariableLocString( cstring cstring_1, cstring cstring_2 )</code>|
SetDialogVariablePluralLocStringInt|<code>Label.SetDialogVariablePluralLocStringInt( cstring cstring_1, cstring cstring_2, int64 int64_3 )</code>|
ScrollToTop|<code>Label.ScrollToTop()</code>|
ScrollToBottom|<code>Label.ScrollToBottom()</code>|
ScrollToLeftEdge|<code>Label.ScrollToLeftEdge()</code>|
ScrollToRightEdge|<code>Label.ScrollToRightEdge()</code>|
ScrollParentToMakePanelFit|<code>Label.ScrollParentToMakePanelFit( unknown_variant_type unknown_variant_type_1, boolean boolean_2 )</code>|
ScrollToFitRegion|<code>Label.ScrollToFitRegion( float float_1, float float_2, float float_3, float float_4, unknown_variant_type unknown_variant_type_5, boolean boolean_6, boolean boolean_7 )</code>|
BCanSeeInParentScroll|<code>Label.BCanSeeInParentScroll()</code>|
GetAttributeInt|<code>Label.GetAttributeInt( cstring cstring_1, integer integer_2 )</code>|
GetAttributeString|<code>Label.GetAttributeString( cstring cstring_1, cstring cstring_2 )</code>|
GetAttributeUInt32|<code>Label.GetAttributeUInt32( cstring cstring_1, unsigned unsigned_2 )</code>|
SetAttributeInt|<code>Label.SetAttributeInt( cstring cstring_1, integer integer_2 )</code>|
SetAttributeString|<code>Label.SetAttributeString( cstring cstring_1, cstring cstring_2 )</code>|
SetAttributeUInt32|<code>Label.SetAttributeUInt32( cstring cstring_1, unsigned unsigned_2 )</code>|
SetInputNamespace|<code>Label.SetInputNamespace( cstring cstring_1 )</code>|
RegisterForReadyEvents|<code>Label.RegisterForReadyEvents( boolean boolean_1 )</code>|
BReadyForDisplay|<code>Label.BReadyForDisplay()</code>|
SetReadyForDisplay|<code>Label.SetReadyForDisplay( boolean boolean_1 )</code>|
SetPositionInPixels|<code>Label.SetPositionInPixels( float float_1, float float_2, float float_3 )</code>|
Data|<code>Label.Data( js_raw_args js_raw_args_1 )</code>|
text|<code>Label.text( cstring cstring_1 )</code>|
html|<code>Label.html( boolean boolean_1 )</code>|
SetLocString|<code>Label.SetLocString( cstring cstring_1 )</code>|
SetAlreadyLocalizedText|<code>Label.SetAlreadyLocalizedText( cstring cstring_1 )</code>|
SetPanelEvent|<code>Label.SetPanelEvent( js_raw_args js_raw_args_1 )</code>|
RunScriptInPanelContext|<code>Label.RunScriptInPanelContext( js_raw_args js_raw_args_1 )</code>|
rememberchildfocus|<code>Label.rememberchildfocus( boolean boolean_1 )</code>|
paneltype|<code>Label.paneltype()</code>|


# ToggleButton
Function|Signature|Description
--|--|--
visible|<code>ToggleButton.visible( boolean boolean_1 )</code>|
enabled|<code>ToggleButton.enabled( boolean boolean_1 )</code>|
checked|<code>ToggleButton.checked( boolean boolean_1 )</code>|
defaultfocus|<code>ToggleButton.defaultfocus( cstring cstring_1 )</code>|
inputnamespace|<code>ToggleButton.inputnamespace( cstring cstring_1 )</code>|
hittest|<code>ToggleButton.hittest( boolean boolean_1 )</code>|
hittestchildren|<code>ToggleButton.hittestchildren( boolean boolean_1 )</code>|
tabindex|<code>ToggleButton.tabindex( float float_1 )</code>|
selectionpos_x|<code>ToggleButton.selectionpos_x( float float_1 )</code>|
selectionpos_y|<code>ToggleButton.selectionpos_y( float float_1 )</code>|
type|<code>ToggleButton.type()</code>|
id|<code>ToggleButton.id()</code>|
layoutfile|<code>ToggleButton.layoutfile()</code>|
contentwidth|<code>ToggleButton.contentwidth()</code>|
contentheight|<code>ToggleButton.contentheight()</code>|
desiredlayoutwidth|<code>ToggleButton.desiredlayoutwidth()</code>|
desiredlayoutheight|<code>ToggleButton.desiredlayoutheight()</code>|
actuallayoutwidth|<code>ToggleButton.actuallayoutwidth()</code>|
actuallayoutheight|<code>ToggleButton.actuallayoutheight()</code>|
actualxoffset|<code>ToggleButton.actualxoffset()</code>|
actualyoffset|<code>ToggleButton.actualyoffset()</code>|
scrolloffset_y|<code>ToggleButton.scrolloffset_y()</code>|
scrolloffset_x|<code>ToggleButton.scrolloffset_x()</code>|
actualuiscale_y|<code>ToggleButton.actualuiscale_y()</code>|
actualuiscale_x|<code>ToggleButton.actualuiscale_x()</code>|
style|<code>ToggleButton.style()</code>|
AddClass|<code>ToggleButton.AddClass( cstring cstring_1 )</code>|
RemoveClass|<code>ToggleButton.RemoveClass( cstring cstring_1 )</code>|
BHasClass|<code>ToggleButton.BHasClass( cstring cstring_1 )</code>|
BAscendantHasClass|<code>ToggleButton.BAscendantHasClass( cstring cstring_1 )</code>|
SetHasClass|<code>ToggleButton.SetHasClass( cstring cstring_1, boolean boolean_2 )</code>|
ToggleClass|<code>ToggleButton.ToggleClass( cstring cstring_1 )</code>|
SwitchClass|<code>ToggleButton.SwitchClass( cstring cstring_1, cstring cstring_2 )</code>|
TriggerClass|<code>ToggleButton.TriggerClass( cstring cstring_1 )</code>|
ClearPanelEvent|<code>ToggleButton.ClearPanelEvent( cstring cstring_1 )</code>|
SetDraggable|<code>ToggleButton.SetDraggable( boolean boolean_1 )</code>|
IsDraggable|<code>ToggleButton.IsDraggable()</code>|
IsSizeValid|<code>ToggleButton.IsSizeValid()</code>|
GetChildCount|<code>ToggleButton.GetChildCount()</code>|
GetChild|<code>ToggleButton.GetChild( integer integer_1 )</code>|
GetChildIndex|<code>ToggleButton.GetChildIndex( unknown_variant_type unknown_variant_type_1 )</code>|
Children|<code>ToggleButton.Children()</code>|
FindChildrenWithClassTraverse|<code>ToggleButton.FindChildrenWithClassTraverse( cstring cstring_1 )</code>|
GetParent|<code>ToggleButton.GetParent()</code>|
SetParent|<code>ToggleButton.SetParent( unknown_variant_type unknown_variant_type_1 )</code>|
FindChild|<code>ToggleButton.FindChild( cstring cstring_1 )</code>|
FindChildTraverse|<code>ToggleButton.FindChildTraverse( cstring cstring_1 )</code>|
FindChildInLayoutFile|<code>ToggleButton.FindChildInLayoutFile( cstring cstring_1 )</code>|
FindPanelInLayoutFile|<code>ToggleButton.FindPanelInLayoutFile( cstring cstring_1 )</code>|
FindAncestor|<code>ToggleButton.FindAncestor( cstring cstring_1 )</code>|
RemoveAndDeleteChildren|<code>ToggleButton.RemoveAndDeleteChildren()</code>|
MoveChildBefore|<code>ToggleButton.MoveChildBefore( unknown_variant_type unknown_variant_type_1, unknown_variant_type unknown_variant_type_2 )</code>|
MoveChildAfter|<code>ToggleButton.MoveChildAfter( unknown_variant_type unknown_variant_type_1, unknown_variant_type unknown_variant_type_2 )</code>|
GetPositionWithinWindow|<code>ToggleButton.GetPositionWithinWindow()</code>|
GetPositionWithinAncestor|<code>ToggleButton.GetPositionWithinAncestor( unknown_variant_type unknown_variant_type_1 )</code>|
ApplyStyles|<code>ToggleButton.ApplyStyles( boolean boolean_1 )</code>|
ClearPropertyFromCode|<code>ToggleButton.ClearPropertyFromCode( unknown_variant_type unknown_variant_type_1 )</code>|
DeleteAsync|<code>ToggleButton.DeleteAsync( float float_1 )</code>|
BIsTransparent|<code>ToggleButton.BIsTransparent()</code>|
BAcceptsInput|<code>ToggleButton.BAcceptsInput()</code>|
BAcceptsFocus|<code>ToggleButton.BAcceptsFocus()</code>|
SetFocus|<code>ToggleButton.SetFocus()</code>|
UpdateFocusInContext|<code>ToggleButton.UpdateFocusInContext()</code>|
BHasHoverStyle|<code>ToggleButton.BHasHoverStyle()</code>|
SetAcceptsFocus|<code>ToggleButton.SetAcceptsFocus( boolean boolean_1 )</code>|
SetDisableFocusOnMouseDown|<code>ToggleButton.SetDisableFocusOnMouseDown( boolean boolean_1 )</code>|
BHasKeyFocus|<code>ToggleButton.BHasKeyFocus()</code>|
SetScrollParentToFitWhenFocused|<code>ToggleButton.SetScrollParentToFitWhenFocused( boolean boolean_1 )</code>|
BScrollParentToFitWhenFocused|<code>ToggleButton.BScrollParentToFitWhenFocused()</code>|
IsSelected|<code>ToggleButton.IsSelected()</code>|
BHasDescendantKeyFocus|<code>ToggleButton.BHasDescendantKeyFocus()</code>|
BLoadLayout|<code>ToggleButton.BLoadLayout( cstring cstring_1, boolean boolean_2, boolean boolean_3 )</code>|
BLoadLayoutSnippet|<code>ToggleButton.BLoadLayoutSnippet( cstring cstring_1 )</code>|
BHasLayoutSnippet|<code>ToggleButton.BHasLayoutSnippet( cstring cstring_1 )</code>|
SetTopOfInputContext|<code>ToggleButton.SetTopOfInputContext( boolean boolean_1 )</code>|
SetDialogVariable|<code>ToggleButton.SetDialogVariable( cstring cstring_1, cstring cstring_2 )</code>|
SetDialogVariableInt|<code>ToggleButton.SetDialogVariableInt( cstring cstring_1, integer integer_2 )</code>|
SetDialogVariableTime|<code>ToggleButton.SetDialogVariableTime( cstring cstring_1, int64 int64_2 )</code>|
SetDialogVariableLocString|<code>ToggleButton.SetDialogVariableLocString( cstring cstring_1, cstring cstring_2 )</code>|
SetDialogVariablePluralLocStringInt|<code>ToggleButton.SetDialogVariablePluralLocStringInt( cstring cstring_1, cstring cstring_2, int64 int64_3 )</code>|
ScrollToTop|<code>ToggleButton.ScrollToTop()</code>|
ScrollToBottom|<code>ToggleButton.ScrollToBottom()</code>|
ScrollToLeftEdge|<code>ToggleButton.ScrollToLeftEdge()</code>|
ScrollToRightEdge|<code>ToggleButton.ScrollToRightEdge()</code>|
ScrollParentToMakePanelFit|<code>ToggleButton.ScrollParentToMakePanelFit( unknown_variant_type unknown_variant_type_1, boolean boolean_2 )</code>|
ScrollToFitRegion|<code>ToggleButton.ScrollToFitRegion( float float_1, float float_2, float float_3, float float_4, unknown_variant_type unknown_variant_type_5, boolean boolean_6, boolean boolean_7 )</code>|
BCanSeeInParentScroll|<code>ToggleButton.BCanSeeInParentScroll()</code>|
GetAttributeInt|<code>ToggleButton.GetAttributeInt( cstring cstring_1, integer integer_2 )</code>|
GetAttributeString|<code>ToggleButton.GetAttributeString( cstring cstring_1, cstring cstring_2 )</code>|
GetAttributeUInt32|<code>ToggleButton.GetAttributeUInt32( cstring cstring_1, unsigned unsigned_2 )</code>|
SetAttributeInt|<code>ToggleButton.SetAttributeInt( cstring cstring_1, integer integer_2 )</code>|
SetAttributeString|<code>ToggleButton.SetAttributeString( cstring cstring_1, cstring cstring_2 )</code>|
SetAttributeUInt32|<code>ToggleButton.SetAttributeUInt32( cstring cstring_1, unsigned unsigned_2 )</code>|
SetInputNamespace|<code>ToggleButton.SetInputNamespace( cstring cstring_1 )</code>|
RegisterForReadyEvents|<code>ToggleButton.RegisterForReadyEvents( boolean boolean_1 )</code>|
BReadyForDisplay|<code>ToggleButton.BReadyForDisplay()</code>|
SetReadyForDisplay|<code>ToggleButton.SetReadyForDisplay( boolean boolean_1 )</code>|
SetPositionInPixels|<code>ToggleButton.SetPositionInPixels( float float_1, float float_2, float float_3 )</code>|
Data|<code>ToggleButton.Data( js_raw_args js_raw_args_1 )</code>|
SetSelected|<code>ToggleButton.SetSelected( boolean boolean_1 )</code>|
text|<code>ToggleButton.text( cstring cstring_1 )</code>|
SetPanelEvent|<code>ToggleButton.SetPanelEvent( js_raw_args js_raw_args_1 )</code>|
RunScriptInPanelContext|<code>ToggleButton.RunScriptInPanelContext( js_raw_args js_raw_args_1 )</code>|
rememberchildfocus|<code>ToggleButton.rememberchildfocus( boolean boolean_1 )</code>|
paneltype|<code>ToggleButton.paneltype()</code>|


# TabButton
Function|Signature|Description
--|--|--
visible|<code>TabButton.visible( boolean boolean_1 )</code>|
enabled|<code>TabButton.enabled( boolean boolean_1 )</code>|
checked|<code>TabButton.checked( boolean boolean_1 )</code>|
defaultfocus|<code>TabButton.defaultfocus( cstring cstring_1 )</code>|
inputnamespace|<code>TabButton.inputnamespace( cstring cstring_1 )</code>|
hittest|<code>TabButton.hittest( boolean boolean_1 )</code>|
hittestchildren|<code>TabButton.hittestchildren( boolean boolean_1 )</code>|
tabindex|<code>TabButton.tabindex( float float_1 )</code>|
selectionpos_x|<code>TabButton.selectionpos_x( float float_1 )</code>|
selectionpos_y|<code>TabButton.selectionpos_y( float float_1 )</code>|
type|<code>TabButton.type()</code>|
id|<code>TabButton.id()</code>|
layoutfile|<code>TabButton.layoutfile()</code>|
contentwidth|<code>TabButton.contentwidth()</code>|
contentheight|<code>TabButton.contentheight()</code>|
desiredlayoutwidth|<code>TabButton.desiredlayoutwidth()</code>|
desiredlayoutheight|<code>TabButton.desiredlayoutheight()</code>|
actuallayoutwidth|<code>TabButton.actuallayoutwidth()</code>|
actuallayoutheight|<code>TabButton.actuallayoutheight()</code>|
actualxoffset|<code>TabButton.actualxoffset()</code>|
actualyoffset|<code>TabButton.actualyoffset()</code>|
scrolloffset_y|<code>TabButton.scrolloffset_y()</code>|
scrolloffset_x|<code>TabButton.scrolloffset_x()</code>|
actualuiscale_y|<code>TabButton.actualuiscale_y()</code>|
actualuiscale_x|<code>TabButton.actualuiscale_x()</code>|
style|<code>TabButton.style()</code>|
AddClass|<code>TabButton.AddClass( cstring cstring_1 )</code>|
RemoveClass|<code>TabButton.RemoveClass( cstring cstring_1 )</code>|
BHasClass|<code>TabButton.BHasClass( cstring cstring_1 )</code>|
BAscendantHasClass|<code>TabButton.BAscendantHasClass( cstring cstring_1 )</code>|
SetHasClass|<code>TabButton.SetHasClass( cstring cstring_1, boolean boolean_2 )</code>|
ToggleClass|<code>TabButton.ToggleClass( cstring cstring_1 )</code>|
SwitchClass|<code>TabButton.SwitchClass( cstring cstring_1, cstring cstring_2 )</code>|
TriggerClass|<code>TabButton.TriggerClass( cstring cstring_1 )</code>|
ClearPanelEvent|<code>TabButton.ClearPanelEvent( cstring cstring_1 )</code>|
SetDraggable|<code>TabButton.SetDraggable( boolean boolean_1 )</code>|
IsDraggable|<code>TabButton.IsDraggable()</code>|
IsSizeValid|<code>TabButton.IsSizeValid()</code>|
GetChildCount|<code>TabButton.GetChildCount()</code>|
GetChild|<code>TabButton.GetChild( integer integer_1 )</code>|
GetChildIndex|<code>TabButton.GetChildIndex( unknown_variant_type unknown_variant_type_1 )</code>|
Children|<code>TabButton.Children()</code>|
FindChildrenWithClassTraverse|<code>TabButton.FindChildrenWithClassTraverse( cstring cstring_1 )</code>|
GetParent|<code>TabButton.GetParent()</code>|
SetParent|<code>TabButton.SetParent( unknown_variant_type unknown_variant_type_1 )</code>|
FindChild|<code>TabButton.FindChild( cstring cstring_1 )</code>|
FindChildTraverse|<code>TabButton.FindChildTraverse( cstring cstring_1 )</code>|
FindChildInLayoutFile|<code>TabButton.FindChildInLayoutFile( cstring cstring_1 )</code>|
FindPanelInLayoutFile|<code>TabButton.FindPanelInLayoutFile( cstring cstring_1 )</code>|
FindAncestor|<code>TabButton.FindAncestor( cstring cstring_1 )</code>|
RemoveAndDeleteChildren|<code>TabButton.RemoveAndDeleteChildren()</code>|
MoveChildBefore|<code>TabButton.MoveChildBefore( unknown_variant_type unknown_variant_type_1, unknown_variant_type unknown_variant_type_2 )</code>|
MoveChildAfter|<code>TabButton.MoveChildAfter( unknown_variant_type unknown_variant_type_1, unknown_variant_type unknown_variant_type_2 )</code>|
GetPositionWithinWindow|<code>TabButton.GetPositionWithinWindow()</code>|
GetPositionWithinAncestor|<code>TabButton.GetPositionWithinAncestor( unknown_variant_type unknown_variant_type_1 )</code>|
ApplyStyles|<code>TabButton.ApplyStyles( boolean boolean_1 )</code>|
ClearPropertyFromCode|<code>TabButton.ClearPropertyFromCode( unknown_variant_type unknown_variant_type_1 )</code>|
DeleteAsync|<code>TabButton.DeleteAsync( float float_1 )</code>|
BIsTransparent|<code>TabButton.BIsTransparent()</code>|
BAcceptsInput|<code>TabButton.BAcceptsInput()</code>|
BAcceptsFocus|<code>TabButton.BAcceptsFocus()</code>|
SetFocus|<code>TabButton.SetFocus()</code>|
UpdateFocusInContext|<code>TabButton.UpdateFocusInContext()</code>|
BHasHoverStyle|<code>TabButton.BHasHoverStyle()</code>|
SetAcceptsFocus|<code>TabButton.SetAcceptsFocus( boolean boolean_1 )</code>|
SetDisableFocusOnMouseDown|<code>TabButton.SetDisableFocusOnMouseDown( boolean boolean_1 )</code>|
BHasKeyFocus|<code>TabButton.BHasKeyFocus()</code>|
SetScrollParentToFitWhenFocused|<code>TabButton.SetScrollParentToFitWhenFocused( boolean boolean_1 )</code>|
BScrollParentToFitWhenFocused|<code>TabButton.BScrollParentToFitWhenFocused()</code>|
IsSelected|<code>TabButton.IsSelected()</code>|
BHasDescendantKeyFocus|<code>TabButton.BHasDescendantKeyFocus()</code>|
BLoadLayout|<code>TabButton.BLoadLayout( cstring cstring_1, boolean boolean_2, boolean boolean_3 )</code>|
BLoadLayoutSnippet|<code>TabButton.BLoadLayoutSnippet( cstring cstring_1 )</code>|
BHasLayoutSnippet|<code>TabButton.BHasLayoutSnippet( cstring cstring_1 )</code>|
SetTopOfInputContext|<code>TabButton.SetTopOfInputContext( boolean boolean_1 )</code>|
SetDialogVariable|<code>TabButton.SetDialogVariable( cstring cstring_1, cstring cstring_2 )</code>|
SetDialogVariableInt|<code>TabButton.SetDialogVariableInt( cstring cstring_1, integer integer_2 )</code>|
SetDialogVariableTime|<code>TabButton.SetDialogVariableTime( cstring cstring_1, int64 int64_2 )</code>|
SetDialogVariableLocString|<code>TabButton.SetDialogVariableLocString( cstring cstring_1, cstring cstring_2 )</code>|
SetDialogVariablePluralLocStringInt|<code>TabButton.SetDialogVariablePluralLocStringInt( cstring cstring_1, cstring cstring_2, int64 int64_3 )</code>|
ScrollToTop|<code>TabButton.ScrollToTop()</code>|
ScrollToBottom|<code>TabButton.ScrollToBottom()</code>|
ScrollToLeftEdge|<code>TabButton.ScrollToLeftEdge()</code>|
ScrollToRightEdge|<code>TabButton.ScrollToRightEdge()</code>|
ScrollParentToMakePanelFit|<code>TabButton.ScrollParentToMakePanelFit( unknown_variant_type unknown_variant_type_1, boolean boolean_2 )</code>|
ScrollToFitRegion|<code>TabButton.ScrollToFitRegion( float float_1, float float_2, float float_3, float float_4, unknown_variant_type unknown_variant_type_5, boolean boolean_6, boolean boolean_7 )</code>|
BCanSeeInParentScroll|<code>TabButton.BCanSeeInParentScroll()</code>|
GetAttributeInt|<code>TabButton.GetAttributeInt( cstring cstring_1, integer integer_2 )</code>|
GetAttributeString|<code>TabButton.GetAttributeString( cstring cstring_1, cstring cstring_2 )</code>|
GetAttributeUInt32|<code>TabButton.GetAttributeUInt32( cstring cstring_1, unsigned unsigned_2 )</code>|
SetAttributeInt|<code>TabButton.SetAttributeInt( cstring cstring_1, integer integer_2 )</code>|
SetAttributeString|<code>TabButton.SetAttributeString( cstring cstring_1, cstring cstring_2 )</code>|
SetAttributeUInt32|<code>TabButton.SetAttributeUInt32( cstring cstring_1, unsigned unsigned_2 )</code>|
SetInputNamespace|<code>TabButton.SetInputNamespace( cstring cstring_1 )</code>|
RegisterForReadyEvents|<code>TabButton.RegisterForReadyEvents( boolean boolean_1 )</code>|
BReadyForDisplay|<code>TabButton.BReadyForDisplay()</code>|
SetReadyForDisplay|<code>TabButton.SetReadyForDisplay( boolean boolean_1 )</code>|
SetPositionInPixels|<code>TabButton.SetPositionInPixels( float float_1, float float_2, float float_3 )</code>|
Data|<code>TabButton.Data( js_raw_args js_raw_args_1 )</code>|
SetPanelEvent|<code>TabButton.SetPanelEvent( js_raw_args js_raw_args_1 )</code>|
RunScriptInPanelContext|<code>TabButton.RunScriptInPanelContext( js_raw_args js_raw_args_1 )</code>|
rememberchildfocus|<code>TabButton.rememberchildfocus( boolean boolean_1 )</code>|
paneltype|<code>TabButton.paneltype()</code>|


# DOTAMapUpdate2023Page
Function|Signature|Description
--|--|--
visible|<code>DOTAMapUpdate2023Page.visible( boolean boolean_1 )</code>|
enabled|<code>DOTAMapUpdate2023Page.enabled( boolean boolean_1 )</code>|
checked|<code>DOTAMapUpdate2023Page.checked( boolean boolean_1 )</code>|
defaultfocus|<code>DOTAMapUpdate2023Page.defaultfocus( cstring cstring_1 )</code>|
inputnamespace|<code>DOTAMapUpdate2023Page.inputnamespace( cstring cstring_1 )</code>|
hittest|<code>DOTAMapUpdate2023Page.hittest( boolean boolean_1 )</code>|
hittestchildren|<code>DOTAMapUpdate2023Page.hittestchildren( boolean boolean_1 )</code>|
tabindex|<code>DOTAMapUpdate2023Page.tabindex( float float_1 )</code>|
selectionpos_x|<code>DOTAMapUpdate2023Page.selectionpos_x( float float_1 )</code>|
selectionpos_y|<code>DOTAMapUpdate2023Page.selectionpos_y( float float_1 )</code>|
type|<code>DOTAMapUpdate2023Page.type()</code>|
id|<code>DOTAMapUpdate2023Page.id()</code>|
layoutfile|<code>DOTAMapUpdate2023Page.layoutfile()</code>|
contentwidth|<code>DOTAMapUpdate2023Page.contentwidth()</code>|
contentheight|<code>DOTAMapUpdate2023Page.contentheight()</code>|
desiredlayoutwidth|<code>DOTAMapUpdate2023Page.desiredlayoutwidth()</code>|
desiredlayoutheight|<code>DOTAMapUpdate2023Page.desiredlayoutheight()</code>|
actuallayoutwidth|<code>DOTAMapUpdate2023Page.actuallayoutwidth()</code>|
actuallayoutheight|<code>DOTAMapUpdate2023Page.actuallayoutheight()</code>|
actualxoffset|<code>DOTAMapUpdate2023Page.actualxoffset()</code>|
actualyoffset|<code>DOTAMapUpdate2023Page.actualyoffset()</code>|
scrolloffset_y|<code>DOTAMapUpdate2023Page.scrolloffset_y()</code>|
scrolloffset_x|<code>DOTAMapUpdate2023Page.scrolloffset_x()</code>|
actualuiscale_y|<code>DOTAMapUpdate2023Page.actualuiscale_y()</code>|
actualuiscale_x|<code>DOTAMapUpdate2023Page.actualuiscale_x()</code>|
style|<code>DOTAMapUpdate2023Page.style()</code>|
AddClass|<code>DOTAMapUpdate2023Page.AddClass( cstring cstring_1 )</code>|
RemoveClass|<code>DOTAMapUpdate2023Page.RemoveClass( cstring cstring_1 )</code>|
BHasClass|<code>DOTAMapUpdate2023Page.BHasClass( cstring cstring_1 )</code>|
BAscendantHasClass|<code>DOTAMapUpdate2023Page.BAscendantHasClass( cstring cstring_1 )</code>|
SetHasClass|<code>DOTAMapUpdate2023Page.SetHasClass( cstring cstring_1, boolean boolean_2 )</code>|
ToggleClass|<code>DOTAMapUpdate2023Page.ToggleClass( cstring cstring_1 )</code>|
SwitchClass|<code>DOTAMapUpdate2023Page.SwitchClass( cstring cstring_1, cstring cstring_2 )</code>|
TriggerClass|<code>DOTAMapUpdate2023Page.TriggerClass( cstring cstring_1 )</code>|
ClearPanelEvent|<code>DOTAMapUpdate2023Page.ClearPanelEvent( cstring cstring_1 )</code>|
SetDraggable|<code>DOTAMapUpdate2023Page.SetDraggable( boolean boolean_1 )</code>|
IsDraggable|<code>DOTAMapUpdate2023Page.IsDraggable()</code>|
IsSizeValid|<code>DOTAMapUpdate2023Page.IsSizeValid()</code>|
GetChildCount|<code>DOTAMapUpdate2023Page.GetChildCount()</code>|
GetChild|<code>DOTAMapUpdate2023Page.GetChild( integer integer_1 )</code>|
GetChildIndex|<code>DOTAMapUpdate2023Page.GetChildIndex( unknown_variant_type unknown_variant_type_1 )</code>|
Children|<code>DOTAMapUpdate2023Page.Children()</code>|
FindChildrenWithClassTraverse|<code>DOTAMapUpdate2023Page.FindChildrenWithClassTraverse( cstring cstring_1 )</code>|
GetParent|<code>DOTAMapUpdate2023Page.GetParent()</code>|
SetParent|<code>DOTAMapUpdate2023Page.SetParent( unknown_variant_type unknown_variant_type_1 )</code>|
FindChild|<code>DOTAMapUpdate2023Page.FindChild( cstring cstring_1 )</code>|
FindChildTraverse|<code>DOTAMapUpdate2023Page.FindChildTraverse( cstring cstring_1 )</code>|
FindChildInLayoutFile|<code>DOTAMapUpdate2023Page.FindChildInLayoutFile( cstring cstring_1 )</code>|
FindPanelInLayoutFile|<code>DOTAMapUpdate2023Page.FindPanelInLayoutFile( cstring cstring_1 )</code>|
FindAncestor|<code>DOTAMapUpdate2023Page.FindAncestor( cstring cstring_1 )</code>|
RemoveAndDeleteChildren|<code>DOTAMapUpdate2023Page.RemoveAndDeleteChildren()</code>|
MoveChildBefore|<code>DOTAMapUpdate2023Page.MoveChildBefore( unknown_variant_type unknown_variant_type_1, unknown_variant_type unknown_variant_type_2 )</code>|
MoveChildAfter|<code>DOTAMapUpdate2023Page.MoveChildAfter( unknown_variant_type unknown_variant_type_1, unknown_variant_type unknown_variant_type_2 )</code>|
GetPositionWithinWindow|<code>DOTAMapUpdate2023Page.GetPositionWithinWindow()</code>|
GetPositionWithinAncestor|<code>DOTAMapUpdate2023Page.GetPositionWithinAncestor( unknown_variant_type unknown_variant_type_1 )</code>|
ApplyStyles|<code>DOTAMapUpdate2023Page.ApplyStyles( boolean boolean_1 )</code>|
ClearPropertyFromCode|<code>DOTAMapUpdate2023Page.ClearPropertyFromCode( unknown_variant_type unknown_variant_type_1 )</code>|
DeleteAsync|<code>DOTAMapUpdate2023Page.DeleteAsync( float float_1 )</code>|
BIsTransparent|<code>DOTAMapUpdate2023Page.BIsTransparent()</code>|
BAcceptsInput|<code>DOTAMapUpdate2023Page.BAcceptsInput()</code>|
BAcceptsFocus|<code>DOTAMapUpdate2023Page.BAcceptsFocus()</code>|
SetFocus|<code>DOTAMapUpdate2023Page.SetFocus()</code>|
UpdateFocusInContext|<code>DOTAMapUpdate2023Page.UpdateFocusInContext()</code>|
BHasHoverStyle|<code>DOTAMapUpdate2023Page.BHasHoverStyle()</code>|
SetAcceptsFocus|<code>DOTAMapUpdate2023Page.SetAcceptsFocus( boolean boolean_1 )</code>|
SetDisableFocusOnMouseDown|<code>DOTAMapUpdate2023Page.SetDisableFocusOnMouseDown( boolean boolean_1 )</code>|
BHasKeyFocus|<code>DOTAMapUpdate2023Page.BHasKeyFocus()</code>|
SetScrollParentToFitWhenFocused|<code>DOTAMapUpdate2023Page.SetScrollParentToFitWhenFocused( boolean boolean_1 )</code>|
BScrollParentToFitWhenFocused|<code>DOTAMapUpdate2023Page.BScrollParentToFitWhenFocused()</code>|
IsSelected|<code>DOTAMapUpdate2023Page.IsSelected()</code>|
BHasDescendantKeyFocus|<code>DOTAMapUpdate2023Page.BHasDescendantKeyFocus()</code>|
BLoadLayout|<code>DOTAMapUpdate2023Page.BLoadLayout( cstring cstring_1, boolean boolean_2, boolean boolean_3 )</code>|
BLoadLayoutSnippet|<code>DOTAMapUpdate2023Page.BLoadLayoutSnippet( cstring cstring_1 )</code>|
BHasLayoutSnippet|<code>DOTAMapUpdate2023Page.BHasLayoutSnippet( cstring cstring_1 )</code>|
SetTopOfInputContext|<code>DOTAMapUpdate2023Page.SetTopOfInputContext( boolean boolean_1 )</code>|
SetDialogVariable|<code>DOTAMapUpdate2023Page.SetDialogVariable( cstring cstring_1, cstring cstring_2 )</code>|
SetDialogVariableInt|<code>DOTAMapUpdate2023Page.SetDialogVariableInt( cstring cstring_1, integer integer_2 )</code>|
SetDialogVariableTime|<code>DOTAMapUpdate2023Page.SetDialogVariableTime( cstring cstring_1, int64 int64_2 )</code>|
SetDialogVariableLocString|<code>DOTAMapUpdate2023Page.SetDialogVariableLocString( cstring cstring_1, cstring cstring_2 )</code>|
SetDialogVariablePluralLocStringInt|<code>DOTAMapUpdate2023Page.SetDialogVariablePluralLocStringInt( cstring cstring_1, cstring cstring_2, int64 int64_3 )</code>|
ScrollToTop|<code>DOTAMapUpdate2023Page.ScrollToTop()</code>|
ScrollToBottom|<code>DOTAMapUpdate2023Page.ScrollToBottom()</code>|
ScrollToLeftEdge|<code>DOTAMapUpdate2023Page.ScrollToLeftEdge()</code>|
ScrollToRightEdge|<code>DOTAMapUpdate2023Page.ScrollToRightEdge()</code>|
ScrollParentToMakePanelFit|<code>DOTAMapUpdate2023Page.ScrollParentToMakePanelFit( unknown_variant_type unknown_variant_type_1, boolean boolean_2 )</code>|
ScrollToFitRegion|<code>DOTAMapUpdate2023Page.ScrollToFitRegion( float float_1, float float_2, float float_3, float float_4, unknown_variant_type unknown_variant_type_5, boolean boolean_6, boolean boolean_7 )</code>|
BCanSeeInParentScroll|<code>DOTAMapUpdate2023Page.BCanSeeInParentScroll()</code>|
GetAttributeInt|<code>DOTAMapUpdate2023Page.GetAttributeInt( cstring cstring_1, integer integer_2 )</code>|
GetAttributeString|<code>DOTAMapUpdate2023Page.GetAttributeString( cstring cstring_1, cstring cstring_2 )</code>|
GetAttributeUInt32|<code>DOTAMapUpdate2023Page.GetAttributeUInt32( cstring cstring_1, unsigned unsigned_2 )</code>|
SetAttributeInt|<code>DOTAMapUpdate2023Page.SetAttributeInt( cstring cstring_1, integer integer_2 )</code>|
SetAttributeString|<code>DOTAMapUpdate2023Page.SetAttributeString( cstring cstring_1, cstring cstring_2 )</code>|
SetAttributeUInt32|<code>DOTAMapUpdate2023Page.SetAttributeUInt32( cstring cstring_1, unsigned unsigned_2 )</code>|
SetInputNamespace|<code>DOTAMapUpdate2023Page.SetInputNamespace( cstring cstring_1 )</code>|
RegisterForReadyEvents|<code>DOTAMapUpdate2023Page.RegisterForReadyEvents( boolean boolean_1 )</code>|
BReadyForDisplay|<code>DOTAMapUpdate2023Page.BReadyForDisplay()</code>|
SetReadyForDisplay|<code>DOTAMapUpdate2023Page.SetReadyForDisplay( boolean boolean_1 )</code>|
SetPositionInPixels|<code>DOTAMapUpdate2023Page.SetPositionInPixels( float float_1, float float_2, float float_3 )</code>|
Data|<code>DOTAMapUpdate2023Page.Data( js_raw_args js_raw_args_1 )</code>|
GetMapStatValue|<code>DOTAMapUpdate2023Page.GetMapStatValue( cstring cstring_1 )</code>|
SetPanelEvent|<code>DOTAMapUpdate2023Page.SetPanelEvent( js_raw_args js_raw_args_1 )</code>|
RunScriptInPanelContext|<code>DOTAMapUpdate2023Page.RunScriptInPanelContext( js_raw_args js_raw_args_1 )</code>|
rememberchildfocus|<code>DOTAMapUpdate2023Page.rememberchildfocus( boolean boolean_1 )</code>|
paneltype|<code>DOTAMapUpdate2023Page.paneltype()</code>|


# DOTADashboard
Function|Signature|Description
--|--|--
visible|<code>DOTADashboard.visible( boolean boolean_1 )</code>|
enabled|<code>DOTADashboard.enabled( boolean boolean_1 )</code>|
checked|<code>DOTADashboard.checked( boolean boolean_1 )</code>|
defaultfocus|<code>DOTADashboard.defaultfocus( cstring cstring_1 )</code>|
inputnamespace|<code>DOTADashboard.inputnamespace( cstring cstring_1 )</code>|
hittest|<code>DOTADashboard.hittest( boolean boolean_1 )</code>|
hittestchildren|<code>DOTADashboard.hittestchildren( boolean boolean_1 )</code>|
tabindex|<code>DOTADashboard.tabindex( float float_1 )</code>|
selectionpos_x|<code>DOTADashboard.selectionpos_x( float float_1 )</code>|
selectionpos_y|<code>DOTADashboard.selectionpos_y( float float_1 )</code>|
type|<code>DOTADashboard.type()</code>|
id|<code>DOTADashboard.id()</code>|
layoutfile|<code>DOTADashboard.layoutfile()</code>|
contentwidth|<code>DOTADashboard.contentwidth()</code>|
contentheight|<code>DOTADashboard.contentheight()</code>|
desiredlayoutwidth|<code>DOTADashboard.desiredlayoutwidth()</code>|
desiredlayoutheight|<code>DOTADashboard.desiredlayoutheight()</code>|
actuallayoutwidth|<code>DOTADashboard.actuallayoutwidth()</code>|
actuallayoutheight|<code>DOTADashboard.actuallayoutheight()</code>|
actualxoffset|<code>DOTADashboard.actualxoffset()</code>|
actualyoffset|<code>DOTADashboard.actualyoffset()</code>|
scrolloffset_y|<code>DOTADashboard.scrolloffset_y()</code>|
scrolloffset_x|<code>DOTADashboard.scrolloffset_x()</code>|
actualuiscale_y|<code>DOTADashboard.actualuiscale_y()</code>|
actualuiscale_x|<code>DOTADashboard.actualuiscale_x()</code>|
style|<code>DOTADashboard.style()</code>|
AddClass|<code>DOTADashboard.AddClass( cstring cstring_1 )</code>|
RemoveClass|<code>DOTADashboard.RemoveClass( cstring cstring_1 )</code>|
BHasClass|<code>DOTADashboard.BHasClass( cstring cstring_1 )</code>|
BAscendantHasClass|<code>DOTADashboard.BAscendantHasClass( cstring cstring_1 )</code>|
SetHasClass|<code>DOTADashboard.SetHasClass( cstring cstring_1, boolean boolean_2 )</code>|
ToggleClass|<code>DOTADashboard.ToggleClass( cstring cstring_1 )</code>|
SwitchClass|<code>DOTADashboard.SwitchClass( cstring cstring_1, cstring cstring_2 )</code>|
TriggerClass|<code>DOTADashboard.TriggerClass( cstring cstring_1 )</code>|
ClearPanelEvent|<code>DOTADashboard.ClearPanelEvent( cstring cstring_1 )</code>|
SetDraggable|<code>DOTADashboard.SetDraggable( boolean boolean_1 )</code>|
IsDraggable|<code>DOTADashboard.IsDraggable()</code>|
IsSizeValid|<code>DOTADashboard.IsSizeValid()</code>|
GetChildCount|<code>DOTADashboard.GetChildCount()</code>|
GetChild|<code>DOTADashboard.GetChild( integer integer_1 )</code>|
GetChildIndex|<code>DOTADashboard.GetChildIndex( unknown_variant_type unknown_variant_type_1 )</code>|
Children|<code>DOTADashboard.Children()</code>|
FindChildrenWithClassTraverse|<code>DOTADashboard.FindChildrenWithClassTraverse( cstring cstring_1 )</code>|
GetParent|<code>DOTADashboard.GetParent()</code>|
SetParent|<code>DOTADashboard.SetParent( unknown_variant_type unknown_variant_type_1 )</code>|
FindChild|<code>DOTADashboard.FindChild( cstring cstring_1 )</code>|
FindChildTraverse|<code>DOTADashboard.FindChildTraverse( cstring cstring_1 )</code>|
FindChildInLayoutFile|<code>DOTADashboard.FindChildInLayoutFile( cstring cstring_1 )</code>|
FindPanelInLayoutFile|<code>DOTADashboard.FindPanelInLayoutFile( cstring cstring_1 )</code>|
FindAncestor|<code>DOTADashboard.FindAncestor( cstring cstring_1 )</code>|
RemoveAndDeleteChildren|<code>DOTADashboard.RemoveAndDeleteChildren()</code>|
MoveChildBefore|<code>DOTADashboard.MoveChildBefore( unknown_variant_type unknown_variant_type_1, unknown_variant_type unknown_variant_type_2 )</code>|
MoveChildAfter|<code>DOTADashboard.MoveChildAfter( unknown_variant_type unknown_variant_type_1, unknown_variant_type unknown_variant_type_2 )</code>|
GetPositionWithinWindow|<code>DOTADashboard.GetPositionWithinWindow()</code>|
GetPositionWithinAncestor|<code>DOTADashboard.GetPositionWithinAncestor( unknown_variant_type unknown_variant_type_1 )</code>|
ApplyStyles|<code>DOTADashboard.ApplyStyles( boolean boolean_1 )</code>|
ClearPropertyFromCode|<code>DOTADashboard.ClearPropertyFromCode( unknown_variant_type unknown_variant_type_1 )</code>|
DeleteAsync|<code>DOTADashboard.DeleteAsync( float float_1 )</code>|
BIsTransparent|<code>DOTADashboard.BIsTransparent()</code>|
BAcceptsInput|<code>DOTADashboard.BAcceptsInput()</code>|
BAcceptsFocus|<code>DOTADashboard.BAcceptsFocus()</code>|
SetFocus|<code>DOTADashboard.SetFocus()</code>|
UpdateFocusInContext|<code>DOTADashboard.UpdateFocusInContext()</code>|
BHasHoverStyle|<code>DOTADashboard.BHasHoverStyle()</code>|
SetAcceptsFocus|<code>DOTADashboard.SetAcceptsFocus( boolean boolean_1 )</code>|
SetDisableFocusOnMouseDown|<code>DOTADashboard.SetDisableFocusOnMouseDown( boolean boolean_1 )</code>|
BHasKeyFocus|<code>DOTADashboard.BHasKeyFocus()</code>|
SetScrollParentToFitWhenFocused|<code>DOTADashboard.SetScrollParentToFitWhenFocused( boolean boolean_1 )</code>|
BScrollParentToFitWhenFocused|<code>DOTADashboard.BScrollParentToFitWhenFocused()</code>|
IsSelected|<code>DOTADashboard.IsSelected()</code>|
BHasDescendantKeyFocus|<code>DOTADashboard.BHasDescendantKeyFocus()</code>|
BLoadLayout|<code>DOTADashboard.BLoadLayout( cstring cstring_1, boolean boolean_2, boolean boolean_3 )</code>|
BLoadLayoutSnippet|<code>DOTADashboard.BLoadLayoutSnippet( cstring cstring_1 )</code>|
BHasLayoutSnippet|<code>DOTADashboard.BHasLayoutSnippet( cstring cstring_1 )</code>|
SetTopOfInputContext|<code>DOTADashboard.SetTopOfInputContext( boolean boolean_1 )</code>|
SetDialogVariable|<code>DOTADashboard.SetDialogVariable( cstring cstring_1, cstring cstring_2 )</code>|
SetDialogVariableInt|<code>DOTADashboard.SetDialogVariableInt( cstring cstring_1, integer integer_2 )</code>|
SetDialogVariableTime|<code>DOTADashboard.SetDialogVariableTime( cstring cstring_1, int64 int64_2 )</code>|
SetDialogVariableLocString|<code>DOTADashboard.SetDialogVariableLocString( cstring cstring_1, cstring cstring_2 )</code>|
SetDialogVariablePluralLocStringInt|<code>DOTADashboard.SetDialogVariablePluralLocStringInt( cstring cstring_1, cstring cstring_2, int64 int64_3 )</code>|
ScrollToTop|<code>DOTADashboard.ScrollToTop()</code>|
ScrollToBottom|<code>DOTADashboard.ScrollToBottom()</code>|
ScrollToLeftEdge|<code>DOTADashboard.ScrollToLeftEdge()</code>|
ScrollToRightEdge|<code>DOTADashboard.ScrollToRightEdge()</code>|
ScrollParentToMakePanelFit|<code>DOTADashboard.ScrollParentToMakePanelFit( unknown_variant_type unknown_variant_type_1, boolean boolean_2 )</code>|
ScrollToFitRegion|<code>DOTADashboard.ScrollToFitRegion( float float_1, float float_2, float float_3, float float_4, unknown_variant_type unknown_variant_type_5, boolean boolean_6, boolean boolean_7 )</code>|
BCanSeeInParentScroll|<code>DOTADashboard.BCanSeeInParentScroll()</code>|
GetAttributeInt|<code>DOTADashboard.GetAttributeInt( cstring cstring_1, integer integer_2 )</code>|
GetAttributeString|<code>DOTADashboard.GetAttributeString( cstring cstring_1, cstring cstring_2 )</code>|
GetAttributeUInt32|<code>DOTADashboard.GetAttributeUInt32( cstring cstring_1, unsigned unsigned_2 )</code>|
SetAttributeInt|<code>DOTADashboard.SetAttributeInt( cstring cstring_1, integer integer_2 )</code>|
SetAttributeString|<code>DOTADashboard.SetAttributeString( cstring cstring_1, cstring cstring_2 )</code>|
SetAttributeUInt32|<code>DOTADashboard.SetAttributeUInt32( cstring cstring_1, unsigned unsigned_2 )</code>|
SetInputNamespace|<code>DOTADashboard.SetInputNamespace( cstring cstring_1 )</code>|
RegisterForReadyEvents|<code>DOTADashboard.RegisterForReadyEvents( boolean boolean_1 )</code>|
BReadyForDisplay|<code>DOTADashboard.BReadyForDisplay()</code>|
SetReadyForDisplay|<code>DOTADashboard.SetReadyForDisplay( boolean boolean_1 )</code>|
SetPositionInPixels|<code>DOTADashboard.SetPositionInPixels( float float_1, float float_2, float float_3 )</code>|
Data|<code>DOTADashboard.Data( js_raw_args js_raw_args_1 )</code>|
SetPanelEvent|<code>DOTADashboard.SetPanelEvent( js_raw_args js_raw_args_1 )</code>|
RunScriptInPanelContext|<code>DOTADashboard.RunScriptInPanelContext( js_raw_args js_raw_args_1 )</code>|
rememberchildfocus|<code>DOTADashboard.rememberchildfocus( boolean boolean_1 )</code>|
paneltype|<code>DOTADashboard.paneltype()</code>|


# PageManager
Function|Signature|Description
--|--|--
visible|<code>PageManager.visible( boolean boolean_1 )</code>|
enabled|<code>PageManager.enabled( boolean boolean_1 )</code>|
checked|<code>PageManager.checked( boolean boolean_1 )</code>|
defaultfocus|<code>PageManager.defaultfocus( cstring cstring_1 )</code>|
inputnamespace|<code>PageManager.inputnamespace( cstring cstring_1 )</code>|
hittest|<code>PageManager.hittest( boolean boolean_1 )</code>|
hittestchildren|<code>PageManager.hittestchildren( boolean boolean_1 )</code>|
tabindex|<code>PageManager.tabindex( float float_1 )</code>|
selectionpos_x|<code>PageManager.selectionpos_x( float float_1 )</code>|
selectionpos_y|<code>PageManager.selectionpos_y( float float_1 )</code>|
type|<code>PageManager.type()</code>|
id|<code>PageManager.id()</code>|
layoutfile|<code>PageManager.layoutfile()</code>|
contentwidth|<code>PageManager.contentwidth()</code>|
contentheight|<code>PageManager.contentheight()</code>|
desiredlayoutwidth|<code>PageManager.desiredlayoutwidth()</code>|
desiredlayoutheight|<code>PageManager.desiredlayoutheight()</code>|
actuallayoutwidth|<code>PageManager.actuallayoutwidth()</code>|
actuallayoutheight|<code>PageManager.actuallayoutheight()</code>|
actualxoffset|<code>PageManager.actualxoffset()</code>|
actualyoffset|<code>PageManager.actualyoffset()</code>|
scrolloffset_y|<code>PageManager.scrolloffset_y()</code>|
scrolloffset_x|<code>PageManager.scrolloffset_x()</code>|
actualuiscale_y|<code>PageManager.actualuiscale_y()</code>|
actualuiscale_x|<code>PageManager.actualuiscale_x()</code>|
style|<code>PageManager.style()</code>|
AddClass|<code>PageManager.AddClass( cstring cstring_1 )</code>|
RemoveClass|<code>PageManager.RemoveClass( cstring cstring_1 )</code>|
BHasClass|<code>PageManager.BHasClass( cstring cstring_1 )</code>|
BAscendantHasClass|<code>PageManager.BAscendantHasClass( cstring cstring_1 )</code>|
SetHasClass|<code>PageManager.SetHasClass( cstring cstring_1, boolean boolean_2 )</code>|
ToggleClass|<code>PageManager.ToggleClass( cstring cstring_1 )</code>|
SwitchClass|<code>PageManager.SwitchClass( cstring cstring_1, cstring cstring_2 )</code>|
TriggerClass|<code>PageManager.TriggerClass( cstring cstring_1 )</code>|
ClearPanelEvent|<code>PageManager.ClearPanelEvent( cstring cstring_1 )</code>|
SetDraggable|<code>PageManager.SetDraggable( boolean boolean_1 )</code>|
IsDraggable|<code>PageManager.IsDraggable()</code>|
IsSizeValid|<code>PageManager.IsSizeValid()</code>|
GetChildCount|<code>PageManager.GetChildCount()</code>|
GetChild|<code>PageManager.GetChild( integer integer_1 )</code>|
GetChildIndex|<code>PageManager.GetChildIndex( unknown_variant_type unknown_variant_type_1 )</code>|
Children|<code>PageManager.Children()</code>|
FindChildrenWithClassTraverse|<code>PageManager.FindChildrenWithClassTraverse( cstring cstring_1 )</code>|
GetParent|<code>PageManager.GetParent()</code>|
SetParent|<code>PageManager.SetParent( unknown_variant_type unknown_variant_type_1 )</code>|
FindChild|<code>PageManager.FindChild( cstring cstring_1 )</code>|
FindChildTraverse|<code>PageManager.FindChildTraverse( cstring cstring_1 )</code>|
FindChildInLayoutFile|<code>PageManager.FindChildInLayoutFile( cstring cstring_1 )</code>|
FindPanelInLayoutFile|<code>PageManager.FindPanelInLayoutFile( cstring cstring_1 )</code>|
FindAncestor|<code>PageManager.FindAncestor( cstring cstring_1 )</code>|
RemoveAndDeleteChildren|<code>PageManager.RemoveAndDeleteChildren()</code>|
MoveChildBefore|<code>PageManager.MoveChildBefore( unknown_variant_type unknown_variant_type_1, unknown_variant_type unknown_variant_type_2 )</code>|
MoveChildAfter|<code>PageManager.MoveChildAfter( unknown_variant_type unknown_variant_type_1, unknown_variant_type unknown_variant_type_2 )</code>|
GetPositionWithinWindow|<code>PageManager.GetPositionWithinWindow()</code>|
GetPositionWithinAncestor|<code>PageManager.GetPositionWithinAncestor( unknown_variant_type unknown_variant_type_1 )</code>|
ApplyStyles|<code>PageManager.ApplyStyles( boolean boolean_1 )</code>|
ClearPropertyFromCode|<code>PageManager.ClearPropertyFromCode( unknown_variant_type unknown_variant_type_1 )</code>|
DeleteAsync|<code>PageManager.DeleteAsync( float float_1 )</code>|
BIsTransparent|<code>PageManager.BIsTransparent()</code>|
BAcceptsInput|<code>PageManager.BAcceptsInput()</code>|
BAcceptsFocus|<code>PageManager.BAcceptsFocus()</code>|
SetFocus|<code>PageManager.SetFocus()</code>|
UpdateFocusInContext|<code>PageManager.UpdateFocusInContext()</code>|
BHasHoverStyle|<code>PageManager.BHasHoverStyle()</code>|
SetAcceptsFocus|<code>PageManager.SetAcceptsFocus( boolean boolean_1 )</code>|
SetDisableFocusOnMouseDown|<code>PageManager.SetDisableFocusOnMouseDown( boolean boolean_1 )</code>|
BHasKeyFocus|<code>PageManager.BHasKeyFocus()</code>|
SetScrollParentToFitWhenFocused|<code>PageManager.SetScrollParentToFitWhenFocused( boolean boolean_1 )</code>|
BScrollParentToFitWhenFocused|<code>PageManager.BScrollParentToFitWhenFocused()</code>|
IsSelected|<code>PageManager.IsSelected()</code>|
BHasDescendantKeyFocus|<code>PageManager.BHasDescendantKeyFocus()</code>|
BLoadLayout|<code>PageManager.BLoadLayout( cstring cstring_1, boolean boolean_2, boolean boolean_3 )</code>|
BLoadLayoutSnippet|<code>PageManager.BLoadLayoutSnippet( cstring cstring_1 )</code>|
BHasLayoutSnippet|<code>PageManager.BHasLayoutSnippet( cstring cstring_1 )</code>|
SetTopOfInputContext|<code>PageManager.SetTopOfInputContext( boolean boolean_1 )</code>|
SetDialogVariable|<code>PageManager.SetDialogVariable( cstring cstring_1, cstring cstring_2 )</code>|
SetDialogVariableInt|<code>PageManager.SetDialogVariableInt( cstring cstring_1, integer integer_2 )</code>|
SetDialogVariableTime|<code>PageManager.SetDialogVariableTime( cstring cstring_1, int64 int64_2 )</code>|
SetDialogVariableLocString|<code>PageManager.SetDialogVariableLocString( cstring cstring_1, cstring cstring_2 )</code>|
SetDialogVariablePluralLocStringInt|<code>PageManager.SetDialogVariablePluralLocStringInt( cstring cstring_1, cstring cstring_2, int64 int64_3 )</code>|
ScrollToTop|<code>PageManager.ScrollToTop()</code>|
ScrollToBottom|<code>PageManager.ScrollToBottom()</code>|
ScrollToLeftEdge|<code>PageManager.ScrollToLeftEdge()</code>|
ScrollToRightEdge|<code>PageManager.ScrollToRightEdge()</code>|
ScrollParentToMakePanelFit|<code>PageManager.ScrollParentToMakePanelFit( unknown_variant_type unknown_variant_type_1, boolean boolean_2 )</code>|
ScrollToFitRegion|<code>PageManager.ScrollToFitRegion( float float_1, float float_2, float float_3, float float_4, unknown_variant_type unknown_variant_type_5, boolean boolean_6, boolean boolean_7 )</code>|
BCanSeeInParentScroll|<code>PageManager.BCanSeeInParentScroll()</code>|
GetAttributeInt|<code>PageManager.GetAttributeInt( cstring cstring_1, integer integer_2 )</code>|
GetAttributeString|<code>PageManager.GetAttributeString( cstring cstring_1, cstring cstring_2 )</code>|
GetAttributeUInt32|<code>PageManager.GetAttributeUInt32( cstring cstring_1, unsigned unsigned_2 )</code>|
SetAttributeInt|<code>PageManager.SetAttributeInt( cstring cstring_1, integer integer_2 )</code>|
SetAttributeString|<code>PageManager.SetAttributeString( cstring cstring_1, cstring cstring_2 )</code>|
SetAttributeUInt32|<code>PageManager.SetAttributeUInt32( cstring cstring_1, unsigned unsigned_2 )</code>|
SetInputNamespace|<code>PageManager.SetInputNamespace( cstring cstring_1 )</code>|
RegisterForReadyEvents|<code>PageManager.RegisterForReadyEvents( boolean boolean_1 )</code>|
BReadyForDisplay|<code>PageManager.BReadyForDisplay()</code>|
SetReadyForDisplay|<code>PageManager.SetReadyForDisplay( boolean boolean_1 )</code>|
SetPositionInPixels|<code>PageManager.SetPositionInPixels( float float_1, float float_2, float float_3 )</code>|
Data|<code>PageManager.Data( js_raw_args js_raw_args_1 )</code>|
SetPanelEvent|<code>PageManager.SetPanelEvent( js_raw_args js_raw_args_1 )</code>|
RunScriptInPanelContext|<code>PageManager.RunScriptInPanelContext( js_raw_args js_raw_args_1 )</code>|
rememberchildfocus|<code>PageManager.rememberchildfocus( boolean boolean_1 )</code>|
paneltype|<code>PageManager.paneltype()</code>|


# DOTAHomePage
Function|Signature|Description
--|--|--
visible|<code>DOTAHomePage.visible( boolean boolean_1 )</code>|
enabled|<code>DOTAHomePage.enabled( boolean boolean_1 )</code>|
checked|<code>DOTAHomePage.checked( boolean boolean_1 )</code>|
defaultfocus|<code>DOTAHomePage.defaultfocus( cstring cstring_1 )</code>|
inputnamespace|<code>DOTAHomePage.inputnamespace( cstring cstring_1 )</code>|
hittest|<code>DOTAHomePage.hittest( boolean boolean_1 )</code>|
hittestchildren|<code>DOTAHomePage.hittestchildren( boolean boolean_1 )</code>|
tabindex|<code>DOTAHomePage.tabindex( float float_1 )</code>|
selectionpos_x|<code>DOTAHomePage.selectionpos_x( float float_1 )</code>|
selectionpos_y|<code>DOTAHomePage.selectionpos_y( float float_1 )</code>|
type|<code>DOTAHomePage.type()</code>|
id|<code>DOTAHomePage.id()</code>|
layoutfile|<code>DOTAHomePage.layoutfile()</code>|
contentwidth|<code>DOTAHomePage.contentwidth()</code>|
contentheight|<code>DOTAHomePage.contentheight()</code>|
desiredlayoutwidth|<code>DOTAHomePage.desiredlayoutwidth()</code>|
desiredlayoutheight|<code>DOTAHomePage.desiredlayoutheight()</code>|
actuallayoutwidth|<code>DOTAHomePage.actuallayoutwidth()</code>|
actuallayoutheight|<code>DOTAHomePage.actuallayoutheight()</code>|
actualxoffset|<code>DOTAHomePage.actualxoffset()</code>|
actualyoffset|<code>DOTAHomePage.actualyoffset()</code>|
scrolloffset_y|<code>DOTAHomePage.scrolloffset_y()</code>|
scrolloffset_x|<code>DOTAHomePage.scrolloffset_x()</code>|
actualuiscale_y|<code>DOTAHomePage.actualuiscale_y()</code>|
actualuiscale_x|<code>DOTAHomePage.actualuiscale_x()</code>|
style|<code>DOTAHomePage.style()</code>|
AddClass|<code>DOTAHomePage.AddClass( cstring cstring_1 )</code>|
RemoveClass|<code>DOTAHomePage.RemoveClass( cstring cstring_1 )</code>|
BHasClass|<code>DOTAHomePage.BHasClass( cstring cstring_1 )</code>|
BAscendantHasClass|<code>DOTAHomePage.BAscendantHasClass( cstring cstring_1 )</code>|
SetHasClass|<code>DOTAHomePage.SetHasClass( cstring cstring_1, boolean boolean_2 )</code>|
ToggleClass|<code>DOTAHomePage.ToggleClass( cstring cstring_1 )</code>|
SwitchClass|<code>DOTAHomePage.SwitchClass( cstring cstring_1, cstring cstring_2 )</code>|
TriggerClass|<code>DOTAHomePage.TriggerClass( cstring cstring_1 )</code>|
ClearPanelEvent|<code>DOTAHomePage.ClearPanelEvent( cstring cstring_1 )</code>|
SetDraggable|<code>DOTAHomePage.SetDraggable( boolean boolean_1 )</code>|
IsDraggable|<code>DOTAHomePage.IsDraggable()</code>|
IsSizeValid|<code>DOTAHomePage.IsSizeValid()</code>|
GetChildCount|<code>DOTAHomePage.GetChildCount()</code>|
GetChild|<code>DOTAHomePage.GetChild( integer integer_1 )</code>|
GetChildIndex|<code>DOTAHomePage.GetChildIndex( unknown_variant_type unknown_variant_type_1 )</code>|
Children|<code>DOTAHomePage.Children()</code>|
FindChildrenWithClassTraverse|<code>DOTAHomePage.FindChildrenWithClassTraverse( cstring cstring_1 )</code>|
GetParent|<code>DOTAHomePage.GetParent()</code>|
SetParent|<code>DOTAHomePage.SetParent( unknown_variant_type unknown_variant_type_1 )</code>|
FindChild|<code>DOTAHomePage.FindChild( cstring cstring_1 )</code>|
FindChildTraverse|<code>DOTAHomePage.FindChildTraverse( cstring cstring_1 )</code>|
FindChildInLayoutFile|<code>DOTAHomePage.FindChildInLayoutFile( cstring cstring_1 )</code>|
FindPanelInLayoutFile|<code>DOTAHomePage.FindPanelInLayoutFile( cstring cstring_1 )</code>|
FindAncestor|<code>DOTAHomePage.FindAncestor( cstring cstring_1 )</code>|
RemoveAndDeleteChildren|<code>DOTAHomePage.RemoveAndDeleteChildren()</code>|
MoveChildBefore|<code>DOTAHomePage.MoveChildBefore( unknown_variant_type unknown_variant_type_1, unknown_variant_type unknown_variant_type_2 )</code>|
MoveChildAfter|<code>DOTAHomePage.MoveChildAfter( unknown_variant_type unknown_variant_type_1, unknown_variant_type unknown_variant_type_2 )</code>|
GetPositionWithinWindow|<code>DOTAHomePage.GetPositionWithinWindow()</code>|
GetPositionWithinAncestor|<code>DOTAHomePage.GetPositionWithinAncestor( unknown_variant_type unknown_variant_type_1 )</code>|
ApplyStyles|<code>DOTAHomePage.ApplyStyles( boolean boolean_1 )</code>|
ClearPropertyFromCode|<code>DOTAHomePage.ClearPropertyFromCode( unknown_variant_type unknown_variant_type_1 )</code>|
DeleteAsync|<code>DOTAHomePage.DeleteAsync( float float_1 )</code>|
BIsTransparent|<code>DOTAHomePage.BIsTransparent()</code>|
BAcceptsInput|<code>DOTAHomePage.BAcceptsInput()</code>|
BAcceptsFocus|<code>DOTAHomePage.BAcceptsFocus()</code>|
SetFocus|<code>DOTAHomePage.SetFocus()</code>|
UpdateFocusInContext|<code>DOTAHomePage.UpdateFocusInContext()</code>|
BHasHoverStyle|<code>DOTAHomePage.BHasHoverStyle()</code>|
SetAcceptsFocus|<code>DOTAHomePage.SetAcceptsFocus( boolean boolean_1 )</code>|
SetDisableFocusOnMouseDown|<code>DOTAHomePage.SetDisableFocusOnMouseDown( boolean boolean_1 )</code>|
BHasKeyFocus|<code>DOTAHomePage.BHasKeyFocus()</code>|
SetScrollParentToFitWhenFocused|<code>DOTAHomePage.SetScrollParentToFitWhenFocused( boolean boolean_1 )</code>|
BScrollParentToFitWhenFocused|<code>DOTAHomePage.BScrollParentToFitWhenFocused()</code>|
IsSelected|<code>DOTAHomePage.IsSelected()</code>|
BHasDescendantKeyFocus|<code>DOTAHomePage.BHasDescendantKeyFocus()</code>|
BLoadLayout|<code>DOTAHomePage.BLoadLayout( cstring cstring_1, boolean boolean_2, boolean boolean_3 )</code>|
BLoadLayoutSnippet|<code>DOTAHomePage.BLoadLayoutSnippet( cstring cstring_1 )</code>|
BHasLayoutSnippet|<code>DOTAHomePage.BHasLayoutSnippet( cstring cstring_1 )</code>|
SetTopOfInputContext|<code>DOTAHomePage.SetTopOfInputContext( boolean boolean_1 )</code>|
SetDialogVariable|<code>DOTAHomePage.SetDialogVariable( cstring cstring_1, cstring cstring_2 )</code>|
SetDialogVariableInt|<code>DOTAHomePage.SetDialogVariableInt( cstring cstring_1, integer integer_2 )</code>|
SetDialogVariableTime|<code>DOTAHomePage.SetDialogVariableTime( cstring cstring_1, int64 int64_2 )</code>|
SetDialogVariableLocString|<code>DOTAHomePage.SetDialogVariableLocString( cstring cstring_1, cstring cstring_2 )</code>|
SetDialogVariablePluralLocStringInt|<code>DOTAHomePage.SetDialogVariablePluralLocStringInt( cstring cstring_1, cstring cstring_2, int64 int64_3 )</code>|
ScrollToTop|<code>DOTAHomePage.ScrollToTop()</code>|
ScrollToBottom|<code>DOTAHomePage.ScrollToBottom()</code>|
ScrollToLeftEdge|<code>DOTAHomePage.ScrollToLeftEdge()</code>|
ScrollToRightEdge|<code>DOTAHomePage.ScrollToRightEdge()</code>|
ScrollParentToMakePanelFit|<code>DOTAHomePage.ScrollParentToMakePanelFit( unknown_variant_type unknown_variant_type_1, boolean boolean_2 )</code>|
ScrollToFitRegion|<code>DOTAHomePage.ScrollToFitRegion( float float_1, float float_2, float float_3, float float_4, unknown_variant_type unknown_variant_type_5, boolean boolean_6, boolean boolean_7 )</code>|
BCanSeeInParentScroll|<code>DOTAHomePage.BCanSeeInParentScroll()</code>|
GetAttributeInt|<code>DOTAHomePage.GetAttributeInt( cstring cstring_1, integer integer_2 )</code>|
GetAttributeString|<code>DOTAHomePage.GetAttributeString( cstring cstring_1, cstring cstring_2 )</code>|
GetAttributeUInt32|<code>DOTAHomePage.GetAttributeUInt32( cstring cstring_1, unsigned unsigned_2 )</code>|
SetAttributeInt|<code>DOTAHomePage.SetAttributeInt( cstring cstring_1, integer integer_2 )</code>|
SetAttributeString|<code>DOTAHomePage.SetAttributeString( cstring cstring_1, cstring cstring_2 )</code>|
SetAttributeUInt32|<code>DOTAHomePage.SetAttributeUInt32( cstring cstring_1, unsigned unsigned_2 )</code>|
SetInputNamespace|<code>DOTAHomePage.SetInputNamespace( cstring cstring_1 )</code>|
RegisterForReadyEvents|<code>DOTAHomePage.RegisterForReadyEvents( boolean boolean_1 )</code>|
BReadyForDisplay|<code>DOTAHomePage.BReadyForDisplay()</code>|
SetReadyForDisplay|<code>DOTAHomePage.SetReadyForDisplay( boolean boolean_1 )</code>|
SetPositionInPixels|<code>DOTAHomePage.SetPositionInPixels( float float_1, float float_2, float float_3 )</code>|
Data|<code>DOTAHomePage.Data( js_raw_args js_raw_args_1 )</code>|
SetPanelEvent|<code>DOTAHomePage.SetPanelEvent( js_raw_args js_raw_args_1 )</code>|
RunScriptInPanelContext|<code>DOTAHomePage.RunScriptInPanelContext( js_raw_args js_raw_args_1 )</code>|
rememberchildfocus|<code>DOTAHomePage.rememberchildfocus( boolean boolean_1 )</code>|
paneltype|<code>DOTAHomePage.paneltype()</code>|


# Movie
Function|Signature|Description
--|--|--
visible|<code>Movie.visible( boolean boolean_1 )</code>|
enabled|<code>Movie.enabled( boolean boolean_1 )</code>|
checked|<code>Movie.checked( boolean boolean_1 )</code>|
defaultfocus|<code>Movie.defaultfocus( cstring cstring_1 )</code>|
inputnamespace|<code>Movie.inputnamespace( cstring cstring_1 )</code>|
hittest|<code>Movie.hittest( boolean boolean_1 )</code>|
hittestchildren|<code>Movie.hittestchildren( boolean boolean_1 )</code>|
tabindex|<code>Movie.tabindex( float float_1 )</code>|
selectionpos_x|<code>Movie.selectionpos_x( float float_1 )</code>|
selectionpos_y|<code>Movie.selectionpos_y( float float_1 )</code>|
type|<code>Movie.type()</code>|
id|<code>Movie.id()</code>|
layoutfile|<code>Movie.layoutfile()</code>|
contentwidth|<code>Movie.contentwidth()</code>|
contentheight|<code>Movie.contentheight()</code>|
desiredlayoutwidth|<code>Movie.desiredlayoutwidth()</code>|
desiredlayoutheight|<code>Movie.desiredlayoutheight()</code>|
actuallayoutwidth|<code>Movie.actuallayoutwidth()</code>|
actuallayoutheight|<code>Movie.actuallayoutheight()</code>|
actualxoffset|<code>Movie.actualxoffset()</code>|
actualyoffset|<code>Movie.actualyoffset()</code>|
scrolloffset_y|<code>Movie.scrolloffset_y()</code>|
scrolloffset_x|<code>Movie.scrolloffset_x()</code>|
actualuiscale_y|<code>Movie.actualuiscale_y()</code>|
actualuiscale_x|<code>Movie.actualuiscale_x()</code>|
style|<code>Movie.style()</code>|
AddClass|<code>Movie.AddClass( cstring cstring_1 )</code>|
RemoveClass|<code>Movie.RemoveClass( cstring cstring_1 )</code>|
BHasClass|<code>Movie.BHasClass( cstring cstring_1 )</code>|
BAscendantHasClass|<code>Movie.BAscendantHasClass( cstring cstring_1 )</code>|
SetHasClass|<code>Movie.SetHasClass( cstring cstring_1, boolean boolean_2 )</code>|
ToggleClass|<code>Movie.ToggleClass( cstring cstring_1 )</code>|
SwitchClass|<code>Movie.SwitchClass( cstring cstring_1, cstring cstring_2 )</code>|
TriggerClass|<code>Movie.TriggerClass( cstring cstring_1 )</code>|
ClearPanelEvent|<code>Movie.ClearPanelEvent( cstring cstring_1 )</code>|
SetDraggable|<code>Movie.SetDraggable( boolean boolean_1 )</code>|
IsDraggable|<code>Movie.IsDraggable()</code>|
IsSizeValid|<code>Movie.IsSizeValid()</code>|
GetChildCount|<code>Movie.GetChildCount()</code>|
GetChild|<code>Movie.GetChild( integer integer_1 )</code>|
GetChildIndex|<code>Movie.GetChildIndex( unknown_variant_type unknown_variant_type_1 )</code>|
Children|<code>Movie.Children()</code>|
FindChildrenWithClassTraverse|<code>Movie.FindChildrenWithClassTraverse( cstring cstring_1 )</code>|
GetParent|<code>Movie.GetParent()</code>|
SetParent|<code>Movie.SetParent( unknown_variant_type unknown_variant_type_1 )</code>|
FindChild|<code>Movie.FindChild( cstring cstring_1 )</code>|
FindChildTraverse|<code>Movie.FindChildTraverse( cstring cstring_1 )</code>|
FindChildInLayoutFile|<code>Movie.FindChildInLayoutFile( cstring cstring_1 )</code>|
FindPanelInLayoutFile|<code>Movie.FindPanelInLayoutFile( cstring cstring_1 )</code>|
FindAncestor|<code>Movie.FindAncestor( cstring cstring_1 )</code>|
RemoveAndDeleteChildren|<code>Movie.RemoveAndDeleteChildren()</code>|
MoveChildBefore|<code>Movie.MoveChildBefore( unknown_variant_type unknown_variant_type_1, unknown_variant_type unknown_variant_type_2 )</code>|
MoveChildAfter|<code>Movie.MoveChildAfter( unknown_variant_type unknown_variant_type_1, unknown_variant_type unknown_variant_type_2 )</code>|
GetPositionWithinWindow|<code>Movie.GetPositionWithinWindow()</code>|
GetPositionWithinAncestor|<code>Movie.GetPositionWithinAncestor( unknown_variant_type unknown_variant_type_1 )</code>|
ApplyStyles|<code>Movie.ApplyStyles( boolean boolean_1 )</code>|
ClearPropertyFromCode|<code>Movie.ClearPropertyFromCode( unknown_variant_type unknown_variant_type_1 )</code>|
DeleteAsync|<code>Movie.DeleteAsync( float float_1 )</code>|
BIsTransparent|<code>Movie.BIsTransparent()</code>|
BAcceptsInput|<code>Movie.BAcceptsInput()</code>|
BAcceptsFocus|<code>Movie.BAcceptsFocus()</code>|
SetFocus|<code>Movie.SetFocus()</code>|
UpdateFocusInContext|<code>Movie.UpdateFocusInContext()</code>|
BHasHoverStyle|<code>Movie.BHasHoverStyle()</code>|
SetAcceptsFocus|<code>Movie.SetAcceptsFocus( boolean boolean_1 )</code>|
SetDisableFocusOnMouseDown|<code>Movie.SetDisableFocusOnMouseDown( boolean boolean_1 )</code>|
BHasKeyFocus|<code>Movie.BHasKeyFocus()</code>|
SetScrollParentToFitWhenFocused|<code>Movie.SetScrollParentToFitWhenFocused( boolean boolean_1 )</code>|
BScrollParentToFitWhenFocused|<code>Movie.BScrollParentToFitWhenFocused()</code>|
IsSelected|<code>Movie.IsSelected()</code>|
BHasDescendantKeyFocus|<code>Movie.BHasDescendantKeyFocus()</code>|
BLoadLayout|<code>Movie.BLoadLayout( cstring cstring_1, boolean boolean_2, boolean boolean_3 )</code>|
BLoadLayoutSnippet|<code>Movie.BLoadLayoutSnippet( cstring cstring_1 )</code>|
BHasLayoutSnippet|<code>Movie.BHasLayoutSnippet( cstring cstring_1 )</code>|
SetTopOfInputContext|<code>Movie.SetTopOfInputContext( boolean boolean_1 )</code>|
SetDialogVariable|<code>Movie.SetDialogVariable( cstring cstring_1, cstring cstring_2 )</code>|
SetDialogVariableInt|<code>Movie.SetDialogVariableInt( cstring cstring_1, integer integer_2 )</code>|
SetDialogVariableTime|<code>Movie.SetDialogVariableTime( cstring cstring_1, int64 int64_2 )</code>|
SetDialogVariableLocString|<code>Movie.SetDialogVariableLocString( cstring cstring_1, cstring cstring_2 )</code>|
SetDialogVariablePluralLocStringInt|<code>Movie.SetDialogVariablePluralLocStringInt( cstring cstring_1, cstring cstring_2, int64 int64_3 )</code>|
ScrollToTop|<code>Movie.ScrollToTop()</code>|
ScrollToBottom|<code>Movie.ScrollToBottom()</code>|
ScrollToLeftEdge|<code>Movie.ScrollToLeftEdge()</code>|
ScrollToRightEdge|<code>Movie.ScrollToRightEdge()</code>|
ScrollParentToMakePanelFit|<code>Movie.ScrollParentToMakePanelFit( unknown_variant_type unknown_variant_type_1, boolean boolean_2 )</code>|
ScrollToFitRegion|<code>Movie.ScrollToFitRegion( float float_1, float float_2, float float_3, float float_4, unknown_variant_type unknown_variant_type_5, boolean boolean_6, boolean boolean_7 )</code>|
BCanSeeInParentScroll|<code>Movie.BCanSeeInParentScroll()</code>|
GetAttributeInt|<code>Movie.GetAttributeInt( cstring cstring_1, integer integer_2 )</code>|
GetAttributeString|<code>Movie.GetAttributeString( cstring cstring_1, cstring cstring_2 )</code>|
GetAttributeUInt32|<code>Movie.GetAttributeUInt32( cstring cstring_1, unsigned unsigned_2 )</code>|
SetAttributeInt|<code>Movie.SetAttributeInt( cstring cstring_1, integer integer_2 )</code>|
SetAttributeString|<code>Movie.SetAttributeString( cstring cstring_1, cstring cstring_2 )</code>|
SetAttributeUInt32|<code>Movie.SetAttributeUInt32( cstring cstring_1, unsigned unsigned_2 )</code>|
SetInputNamespace|<code>Movie.SetInputNamespace( cstring cstring_1 )</code>|
RegisterForReadyEvents|<code>Movie.RegisterForReadyEvents( boolean boolean_1 )</code>|
BReadyForDisplay|<code>Movie.BReadyForDisplay()</code>|
SetReadyForDisplay|<code>Movie.SetReadyForDisplay( boolean boolean_1 )</code>|
SetPositionInPixels|<code>Movie.SetPositionInPixels( float float_1, float float_2, float float_3 )</code>|
Data|<code>Movie.Data( js_raw_args js_raw_args_1 )</code>|
SetMovie|<code>Movie.SetMovie( cstring cstring_1 )</code>|
SetCaptions|<code>Movie.SetCaptions( cstring cstring_1 )</code>|
SetControls|<code>Movie.SetControls( cstring cstring_1 )</code>|
SetTitle|<code>Movie.SetTitle( cstring cstring_1 )</code>|
Play|<code>Movie.Play()</code>|
Pause|<code>Movie.Pause()</code>|
Stop|<code>Movie.Stop()</code>|
SetRepeat|<code>Movie.SetRepeat( boolean boolean_1 )</code>|
SetPlaybackVolume|<code>Movie.SetPlaybackVolume( float float_1 )</code>|
BAdjustingVolume|<code>Movie.BAdjustingVolume()</code>|
SetPanelEvent|<code>Movie.SetPanelEvent( js_raw_args js_raw_args_1 )</code>|
RunScriptInPanelContext|<code>Movie.RunScriptInPanelContext( js_raw_args js_raw_args_1 )</code>|
rememberchildfocus|<code>Movie.rememberchildfocus( boolean boolean_1 )</code>|
paneltype|<code>Movie.paneltype()</code>|


# DOTALoadingScreen
Function|Signature|Description
--|--|--
visible|<code>DOTALoadingScreen.visible( boolean boolean_1 )</code>|
enabled|<code>DOTALoadingScreen.enabled( boolean boolean_1 )</code>|
checked|<code>DOTALoadingScreen.checked( boolean boolean_1 )</code>|
defaultfocus|<code>DOTALoadingScreen.defaultfocus( cstring cstring_1 )</code>|
inputnamespace|<code>DOTALoadingScreen.inputnamespace( cstring cstring_1 )</code>|
hittest|<code>DOTALoadingScreen.hittest( boolean boolean_1 )</code>|
hittestchildren|<code>DOTALoadingScreen.hittestchildren( boolean boolean_1 )</code>|
tabindex|<code>DOTALoadingScreen.tabindex( float float_1 )</code>|
selectionpos_x|<code>DOTALoadingScreen.selectionpos_x( float float_1 )</code>|
selectionpos_y|<code>DOTALoadingScreen.selectionpos_y( float float_1 )</code>|
type|<code>DOTALoadingScreen.type()</code>|
id|<code>DOTALoadingScreen.id()</code>|
layoutfile|<code>DOTALoadingScreen.layoutfile()</code>|
contentwidth|<code>DOTALoadingScreen.contentwidth()</code>|
contentheight|<code>DOTALoadingScreen.contentheight()</code>|
desiredlayoutwidth|<code>DOTALoadingScreen.desiredlayoutwidth()</code>|
desiredlayoutheight|<code>DOTALoadingScreen.desiredlayoutheight()</code>|
actuallayoutwidth|<code>DOTALoadingScreen.actuallayoutwidth()</code>|
actuallayoutheight|<code>DOTALoadingScreen.actuallayoutheight()</code>|
actualxoffset|<code>DOTALoadingScreen.actualxoffset()</code>|
actualyoffset|<code>DOTALoadingScreen.actualyoffset()</code>|
scrolloffset_y|<code>DOTALoadingScreen.scrolloffset_y()</code>|
scrolloffset_x|<code>DOTALoadingScreen.scrolloffset_x()</code>|
actualuiscale_y|<code>DOTALoadingScreen.actualuiscale_y()</code>|
actualuiscale_x|<code>DOTALoadingScreen.actualuiscale_x()</code>|
style|<code>DOTALoadingScreen.style()</code>|
AddClass|<code>DOTALoadingScreen.AddClass( cstring cstring_1 )</code>|
RemoveClass|<code>DOTALoadingScreen.RemoveClass( cstring cstring_1 )</code>|
BHasClass|<code>DOTALoadingScreen.BHasClass( cstring cstring_1 )</code>|
BAscendantHasClass|<code>DOTALoadingScreen.BAscendantHasClass( cstring cstring_1 )</code>|
SetHasClass|<code>DOTALoadingScreen.SetHasClass( cstring cstring_1, boolean boolean_2 )</code>|
ToggleClass|<code>DOTALoadingScreen.ToggleClass( cstring cstring_1 )</code>|
SwitchClass|<code>DOTALoadingScreen.SwitchClass( cstring cstring_1, cstring cstring_2 )</code>|
TriggerClass|<code>DOTALoadingScreen.TriggerClass( cstring cstring_1 )</code>|
ClearPanelEvent|<code>DOTALoadingScreen.ClearPanelEvent( cstring cstring_1 )</code>|
SetDraggable|<code>DOTALoadingScreen.SetDraggable( boolean boolean_1 )</code>|
IsDraggable|<code>DOTALoadingScreen.IsDraggable()</code>|
IsSizeValid|<code>DOTALoadingScreen.IsSizeValid()</code>|
GetChildCount|<code>DOTALoadingScreen.GetChildCount()</code>|
GetChild|<code>DOTALoadingScreen.GetChild( integer integer_1 )</code>|
GetChildIndex|<code>DOTALoadingScreen.GetChildIndex( unknown_variant_type unknown_variant_type_1 )</code>|
Children|<code>DOTALoadingScreen.Children()</code>|
FindChildrenWithClassTraverse|<code>DOTALoadingScreen.FindChildrenWithClassTraverse( cstring cstring_1 )</code>|
GetParent|<code>DOTALoadingScreen.GetParent()</code>|
SetParent|<code>DOTALoadingScreen.SetParent( unknown_variant_type unknown_variant_type_1 )</code>|
FindChild|<code>DOTALoadingScreen.FindChild( cstring cstring_1 )</code>|
FindChildTraverse|<code>DOTALoadingScreen.FindChildTraverse( cstring cstring_1 )</code>|
FindChildInLayoutFile|<code>DOTALoadingScreen.FindChildInLayoutFile( cstring cstring_1 )</code>|
FindPanelInLayoutFile|<code>DOTALoadingScreen.FindPanelInLayoutFile( cstring cstring_1 )</code>|
FindAncestor|<code>DOTALoadingScreen.FindAncestor( cstring cstring_1 )</code>|
RemoveAndDeleteChildren|<code>DOTALoadingScreen.RemoveAndDeleteChildren()</code>|
MoveChildBefore|<code>DOTALoadingScreen.MoveChildBefore( unknown_variant_type unknown_variant_type_1, unknown_variant_type unknown_variant_type_2 )</code>|
MoveChildAfter|<code>DOTALoadingScreen.MoveChildAfter( unknown_variant_type unknown_variant_type_1, unknown_variant_type unknown_variant_type_2 )</code>|
GetPositionWithinWindow|<code>DOTALoadingScreen.GetPositionWithinWindow()</code>|
GetPositionWithinAncestor|<code>DOTALoadingScreen.GetPositionWithinAncestor( unknown_variant_type unknown_variant_type_1 )</code>|
ApplyStyles|<code>DOTALoadingScreen.ApplyStyles( boolean boolean_1 )</code>|
ClearPropertyFromCode|<code>DOTALoadingScreen.ClearPropertyFromCode( unknown_variant_type unknown_variant_type_1 )</code>|
DeleteAsync|<code>DOTALoadingScreen.DeleteAsync( float float_1 )</code>|
BIsTransparent|<code>DOTALoadingScreen.BIsTransparent()</code>|
BAcceptsInput|<code>DOTALoadingScreen.BAcceptsInput()</code>|
BAcceptsFocus|<code>DOTALoadingScreen.BAcceptsFocus()</code>|
SetFocus|<code>DOTALoadingScreen.SetFocus()</code>|
UpdateFocusInContext|<code>DOTALoadingScreen.UpdateFocusInContext()</code>|
BHasHoverStyle|<code>DOTALoadingScreen.BHasHoverStyle()</code>|
SetAcceptsFocus|<code>DOTALoadingScreen.SetAcceptsFocus( boolean boolean_1 )</code>|
SetDisableFocusOnMouseDown|<code>DOTALoadingScreen.SetDisableFocusOnMouseDown( boolean boolean_1 )</code>|
BHasKeyFocus|<code>DOTALoadingScreen.BHasKeyFocus()</code>|
SetScrollParentToFitWhenFocused|<code>DOTALoadingScreen.SetScrollParentToFitWhenFocused( boolean boolean_1 )</code>|
BScrollParentToFitWhenFocused|<code>DOTALoadingScreen.BScrollParentToFitWhenFocused()</code>|
IsSelected|<code>DOTALoadingScreen.IsSelected()</code>|
BHasDescendantKeyFocus|<code>DOTALoadingScreen.BHasDescendantKeyFocus()</code>|
BLoadLayout|<code>DOTALoadingScreen.BLoadLayout( cstring cstring_1, boolean boolean_2, boolean boolean_3 )</code>|
BLoadLayoutSnippet|<code>DOTALoadingScreen.BLoadLayoutSnippet( cstring cstring_1 )</code>|
BHasLayoutSnippet|<code>DOTALoadingScreen.BHasLayoutSnippet( cstring cstring_1 )</code>|
SetTopOfInputContext|<code>DOTALoadingScreen.SetTopOfInputContext( boolean boolean_1 )</code>|
SetDialogVariable|<code>DOTALoadingScreen.SetDialogVariable( cstring cstring_1, cstring cstring_2 )</code>|
SetDialogVariableInt|<code>DOTALoadingScreen.SetDialogVariableInt( cstring cstring_1, integer integer_2 )</code>|
SetDialogVariableTime|<code>DOTALoadingScreen.SetDialogVariableTime( cstring cstring_1, int64 int64_2 )</code>|
SetDialogVariableLocString|<code>DOTALoadingScreen.SetDialogVariableLocString( cstring cstring_1, cstring cstring_2 )</code>|
SetDialogVariablePluralLocStringInt|<code>DOTALoadingScreen.SetDialogVariablePluralLocStringInt( cstring cstring_1, cstring cstring_2, int64 int64_3 )</code>|
ScrollToTop|<code>DOTALoadingScreen.ScrollToTop()</code>|
ScrollToBottom|<code>DOTALoadingScreen.ScrollToBottom()</code>|
ScrollToLeftEdge|<code>DOTALoadingScreen.ScrollToLeftEdge()</code>|
ScrollToRightEdge|<code>DOTALoadingScreen.ScrollToRightEdge()</code>|
ScrollParentToMakePanelFit|<code>DOTALoadingScreen.ScrollParentToMakePanelFit( unknown_variant_type unknown_variant_type_1, boolean boolean_2 )</code>|
ScrollToFitRegion|<code>DOTALoadingScreen.ScrollToFitRegion( float float_1, float float_2, float float_3, float float_4, unknown_variant_type unknown_variant_type_5, boolean boolean_6, boolean boolean_7 )</code>|
BCanSeeInParentScroll|<code>DOTALoadingScreen.BCanSeeInParentScroll()</code>|
GetAttributeInt|<code>DOTALoadingScreen.GetAttributeInt( cstring cstring_1, integer integer_2 )</code>|
GetAttributeString|<code>DOTALoadingScreen.GetAttributeString( cstring cstring_1, cstring cstring_2 )</code>|
GetAttributeUInt32|<code>DOTALoadingScreen.GetAttributeUInt32( cstring cstring_1, unsigned unsigned_2 )</code>|
SetAttributeInt|<code>DOTALoadingScreen.SetAttributeInt( cstring cstring_1, integer integer_2 )</code>|
SetAttributeString|<code>DOTALoadingScreen.SetAttributeString( cstring cstring_1, cstring cstring_2 )</code>|
SetAttributeUInt32|<code>DOTALoadingScreen.SetAttributeUInt32( cstring cstring_1, unsigned unsigned_2 )</code>|
SetInputNamespace|<code>DOTALoadingScreen.SetInputNamespace( cstring cstring_1 )</code>|
RegisterForReadyEvents|<code>DOTALoadingScreen.RegisterForReadyEvents( boolean boolean_1 )</code>|
BReadyForDisplay|<code>DOTALoadingScreen.BReadyForDisplay()</code>|
SetReadyForDisplay|<code>DOTALoadingScreen.SetReadyForDisplay( boolean boolean_1 )</code>|
SetPositionInPixels|<code>DOTALoadingScreen.SetPositionInPixels( float float_1, float float_2, float float_3 )</code>|
Data|<code>DOTALoadingScreen.Data( js_raw_args js_raw_args_1 )</code>|
SetPanelEvent|<code>DOTALoadingScreen.SetPanelEvent( js_raw_args js_raw_args_1 )</code>|
RunScriptInPanelContext|<code>DOTALoadingScreen.RunScriptInPanelContext( js_raw_args js_raw_args_1 )</code>|
rememberchildfocus|<code>DOTALoadingScreen.rememberchildfocus( boolean boolean_1 )</code>|
paneltype|<code>DOTALoadingScreen.paneltype()</code>|


# Button
Function|Signature|Description
--|--|--
visible|<code>Button.visible( boolean boolean_1 )</code>|
enabled|<code>Button.enabled( boolean boolean_1 )</code>|
checked|<code>Button.checked( boolean boolean_1 )</code>|
defaultfocus|<code>Button.defaultfocus( cstring cstring_1 )</code>|
inputnamespace|<code>Button.inputnamespace( cstring cstring_1 )</code>|
hittest|<code>Button.hittest( boolean boolean_1 )</code>|
hittestchildren|<code>Button.hittestchildren( boolean boolean_1 )</code>|
tabindex|<code>Button.tabindex( float float_1 )</code>|
selectionpos_x|<code>Button.selectionpos_x( float float_1 )</code>|
selectionpos_y|<code>Button.selectionpos_y( float float_1 )</code>|
type|<code>Button.type()</code>|
id|<code>Button.id()</code>|
layoutfile|<code>Button.layoutfile()</code>|
contentwidth|<code>Button.contentwidth()</code>|
contentheight|<code>Button.contentheight()</code>|
desiredlayoutwidth|<code>Button.desiredlayoutwidth()</code>|
desiredlayoutheight|<code>Button.desiredlayoutheight()</code>|
actuallayoutwidth|<code>Button.actuallayoutwidth()</code>|
actuallayoutheight|<code>Button.actuallayoutheight()</code>|
actualxoffset|<code>Button.actualxoffset()</code>|
actualyoffset|<code>Button.actualyoffset()</code>|
scrolloffset_y|<code>Button.scrolloffset_y()</code>|
scrolloffset_x|<code>Button.scrolloffset_x()</code>|
actualuiscale_y|<code>Button.actualuiscale_y()</code>|
actualuiscale_x|<code>Button.actualuiscale_x()</code>|
style|<code>Button.style()</code>|
AddClass|<code>Button.AddClass( cstring cstring_1 )</code>|
RemoveClass|<code>Button.RemoveClass( cstring cstring_1 )</code>|
BHasClass|<code>Button.BHasClass( cstring cstring_1 )</code>|
BAscendantHasClass|<code>Button.BAscendantHasClass( cstring cstring_1 )</code>|
SetHasClass|<code>Button.SetHasClass( cstring cstring_1, boolean boolean_2 )</code>|
ToggleClass|<code>Button.ToggleClass( cstring cstring_1 )</code>|
SwitchClass|<code>Button.SwitchClass( cstring cstring_1, cstring cstring_2 )</code>|
TriggerClass|<code>Button.TriggerClass( cstring cstring_1 )</code>|
ClearPanelEvent|<code>Button.ClearPanelEvent( cstring cstring_1 )</code>|
SetDraggable|<code>Button.SetDraggable( boolean boolean_1 )</code>|
IsDraggable|<code>Button.IsDraggable()</code>|
IsSizeValid|<code>Button.IsSizeValid()</code>|
GetChildCount|<code>Button.GetChildCount()</code>|
GetChild|<code>Button.GetChild( integer integer_1 )</code>|
GetChildIndex|<code>Button.GetChildIndex( unknown_variant_type unknown_variant_type_1 )</code>|
Children|<code>Button.Children()</code>|
FindChildrenWithClassTraverse|<code>Button.FindChildrenWithClassTraverse( cstring cstring_1 )</code>|
GetParent|<code>Button.GetParent()</code>|
SetParent|<code>Button.SetParent( unknown_variant_type unknown_variant_type_1 )</code>|
FindChild|<code>Button.FindChild( cstring cstring_1 )</code>|
FindChildTraverse|<code>Button.FindChildTraverse( cstring cstring_1 )</code>|
FindChildInLayoutFile|<code>Button.FindChildInLayoutFile( cstring cstring_1 )</code>|
FindPanelInLayoutFile|<code>Button.FindPanelInLayoutFile( cstring cstring_1 )</code>|
FindAncestor|<code>Button.FindAncestor( cstring cstring_1 )</code>|
RemoveAndDeleteChildren|<code>Button.RemoveAndDeleteChildren()</code>|
MoveChildBefore|<code>Button.MoveChildBefore( unknown_variant_type unknown_variant_type_1, unknown_variant_type unknown_variant_type_2 )</code>|
MoveChildAfter|<code>Button.MoveChildAfter( unknown_variant_type unknown_variant_type_1, unknown_variant_type unknown_variant_type_2 )</code>|
GetPositionWithinWindow|<code>Button.GetPositionWithinWindow()</code>|
GetPositionWithinAncestor|<code>Button.GetPositionWithinAncestor( unknown_variant_type unknown_variant_type_1 )</code>|
ApplyStyles|<code>Button.ApplyStyles( boolean boolean_1 )</code>|
ClearPropertyFromCode|<code>Button.ClearPropertyFromCode( unknown_variant_type unknown_variant_type_1 )</code>|
DeleteAsync|<code>Button.DeleteAsync( float float_1 )</code>|
BIsTransparent|<code>Button.BIsTransparent()</code>|
BAcceptsInput|<code>Button.BAcceptsInput()</code>|
BAcceptsFocus|<code>Button.BAcceptsFocus()</code>|
SetFocus|<code>Button.SetFocus()</code>|
UpdateFocusInContext|<code>Button.UpdateFocusInContext()</code>|
BHasHoverStyle|<code>Button.BHasHoverStyle()</code>|
SetAcceptsFocus|<code>Button.SetAcceptsFocus( boolean boolean_1 )</code>|
SetDisableFocusOnMouseDown|<code>Button.SetDisableFocusOnMouseDown( boolean boolean_1 )</code>|
BHasKeyFocus|<code>Button.BHasKeyFocus()</code>|
SetScrollParentToFitWhenFocused|<code>Button.SetScrollParentToFitWhenFocused( boolean boolean_1 )</code>|
BScrollParentToFitWhenFocused|<code>Button.BScrollParentToFitWhenFocused()</code>|
IsSelected|<code>Button.IsSelected()</code>|
BHasDescendantKeyFocus|<code>Button.BHasDescendantKeyFocus()</code>|
BLoadLayout|<code>Button.BLoadLayout( cstring cstring_1, boolean boolean_2, boolean boolean_3 )</code>|
BLoadLayoutSnippet|<code>Button.BLoadLayoutSnippet( cstring cstring_1 )</code>|
BHasLayoutSnippet|<code>Button.BHasLayoutSnippet( cstring cstring_1 )</code>|
SetTopOfInputContext|<code>Button.SetTopOfInputContext( boolean boolean_1 )</code>|
SetDialogVariable|<code>Button.SetDialogVariable( cstring cstring_1, cstring cstring_2 )</code>|
SetDialogVariableInt|<code>Button.SetDialogVariableInt( cstring cstring_1, integer integer_2 )</code>|
SetDialogVariableTime|<code>Button.SetDialogVariableTime( cstring cstring_1, int64 int64_2 )</code>|
SetDialogVariableLocString|<code>Button.SetDialogVariableLocString( cstring cstring_1, cstring cstring_2 )</code>|
SetDialogVariablePluralLocStringInt|<code>Button.SetDialogVariablePluralLocStringInt( cstring cstring_1, cstring cstring_2, int64 int64_3 )</code>|
ScrollToTop|<code>Button.ScrollToTop()</code>|
ScrollToBottom|<code>Button.ScrollToBottom()</code>|
ScrollToLeftEdge|<code>Button.ScrollToLeftEdge()</code>|
ScrollToRightEdge|<code>Button.ScrollToRightEdge()</code>|
ScrollParentToMakePanelFit|<code>Button.ScrollParentToMakePanelFit( unknown_variant_type unknown_variant_type_1, boolean boolean_2 )</code>|
ScrollToFitRegion|<code>Button.ScrollToFitRegion( float float_1, float float_2, float float_3, float float_4, unknown_variant_type unknown_variant_type_5, boolean boolean_6, boolean boolean_7 )</code>|
BCanSeeInParentScroll|<code>Button.BCanSeeInParentScroll()</code>|
GetAttributeInt|<code>Button.GetAttributeInt( cstring cstring_1, integer integer_2 )</code>|
GetAttributeString|<code>Button.GetAttributeString( cstring cstring_1, cstring cstring_2 )</code>|
GetAttributeUInt32|<code>Button.GetAttributeUInt32( cstring cstring_1, unsigned unsigned_2 )</code>|
SetAttributeInt|<code>Button.SetAttributeInt( cstring cstring_1, integer integer_2 )</code>|
SetAttributeString|<code>Button.SetAttributeString( cstring cstring_1, cstring cstring_2 )</code>|
SetAttributeUInt32|<code>Button.SetAttributeUInt32( cstring cstring_1, unsigned unsigned_2 )</code>|
SetInputNamespace|<code>Button.SetInputNamespace( cstring cstring_1 )</code>|
RegisterForReadyEvents|<code>Button.RegisterForReadyEvents( boolean boolean_1 )</code>|
BReadyForDisplay|<code>Button.BReadyForDisplay()</code>|
SetReadyForDisplay|<code>Button.SetReadyForDisplay( boolean boolean_1 )</code>|
SetPositionInPixels|<code>Button.SetPositionInPixels( float float_1, float float_2, float float_3 )</code>|
Data|<code>Button.Data( js_raw_args js_raw_args_1 )</code>|
SetPanelEvent|<code>Button.SetPanelEvent( js_raw_args js_raw_args_1 )</code>|
RunScriptInPanelContext|<code>Button.RunScriptInPanelContext( js_raw_args js_raw_args_1 )</code>|
rememberchildfocus|<code>Button.rememberchildfocus( boolean boolean_1 )</code>|
paneltype|<code>Button.paneltype()</code>|


# Image
Function|Signature|Description
--|--|--
visible|<code>Image.visible( boolean boolean_1 )</code>|
enabled|<code>Image.enabled( boolean boolean_1 )</code>|
checked|<code>Image.checked( boolean boolean_1 )</code>|
defaultfocus|<code>Image.defaultfocus( cstring cstring_1 )</code>|
inputnamespace|<code>Image.inputnamespace( cstring cstring_1 )</code>|
hittest|<code>Image.hittest( boolean boolean_1 )</code>|
hittestchildren|<code>Image.hittestchildren( boolean boolean_1 )</code>|
tabindex|<code>Image.tabindex( float float_1 )</code>|
selectionpos_x|<code>Image.selectionpos_x( float float_1 )</code>|
selectionpos_y|<code>Image.selectionpos_y( float float_1 )</code>|
type|<code>Image.type()</code>|
id|<code>Image.id()</code>|
layoutfile|<code>Image.layoutfile()</code>|
contentwidth|<code>Image.contentwidth()</code>|
contentheight|<code>Image.contentheight()</code>|
desiredlayoutwidth|<code>Image.desiredlayoutwidth()</code>|
desiredlayoutheight|<code>Image.desiredlayoutheight()</code>|
actuallayoutwidth|<code>Image.actuallayoutwidth()</code>|
actuallayoutheight|<code>Image.actuallayoutheight()</code>|
actualxoffset|<code>Image.actualxoffset()</code>|
actualyoffset|<code>Image.actualyoffset()</code>|
scrolloffset_y|<code>Image.scrolloffset_y()</code>|
scrolloffset_x|<code>Image.scrolloffset_x()</code>|
actualuiscale_y|<code>Image.actualuiscale_y()</code>|
actualuiscale_x|<code>Image.actualuiscale_x()</code>|
style|<code>Image.style()</code>|
AddClass|<code>Image.AddClass( cstring cstring_1 )</code>|
RemoveClass|<code>Image.RemoveClass( cstring cstring_1 )</code>|
BHasClass|<code>Image.BHasClass( cstring cstring_1 )</code>|
BAscendantHasClass|<code>Image.BAscendantHasClass( cstring cstring_1 )</code>|
SetHasClass|<code>Image.SetHasClass( cstring cstring_1, boolean boolean_2 )</code>|
ToggleClass|<code>Image.ToggleClass( cstring cstring_1 )</code>|
SwitchClass|<code>Image.SwitchClass( cstring cstring_1, cstring cstring_2 )</code>|
TriggerClass|<code>Image.TriggerClass( cstring cstring_1 )</code>|
ClearPanelEvent|<code>Image.ClearPanelEvent( cstring cstring_1 )</code>|
SetDraggable|<code>Image.SetDraggable( boolean boolean_1 )</code>|
IsDraggable|<code>Image.IsDraggable()</code>|
IsSizeValid|<code>Image.IsSizeValid()</code>|
GetChildCount|<code>Image.GetChildCount()</code>|
GetChild|<code>Image.GetChild( integer integer_1 )</code>|
GetChildIndex|<code>Image.GetChildIndex( unknown_variant_type unknown_variant_type_1 )</code>|
Children|<code>Image.Children()</code>|
FindChildrenWithClassTraverse|<code>Image.FindChildrenWithClassTraverse( cstring cstring_1 )</code>|
GetParent|<code>Image.GetParent()</code>|
SetParent|<code>Image.SetParent( unknown_variant_type unknown_variant_type_1 )</code>|
FindChild|<code>Image.FindChild( cstring cstring_1 )</code>|
FindChildTraverse|<code>Image.FindChildTraverse( cstring cstring_1 )</code>|
FindChildInLayoutFile|<code>Image.FindChildInLayoutFile( cstring cstring_1 )</code>|
FindPanelInLayoutFile|<code>Image.FindPanelInLayoutFile( cstring cstring_1 )</code>|
FindAncestor|<code>Image.FindAncestor( cstring cstring_1 )</code>|
RemoveAndDeleteChildren|<code>Image.RemoveAndDeleteChildren()</code>|
MoveChildBefore|<code>Image.MoveChildBefore( unknown_variant_type unknown_variant_type_1, unknown_variant_type unknown_variant_type_2 )</code>|
MoveChildAfter|<code>Image.MoveChildAfter( unknown_variant_type unknown_variant_type_1, unknown_variant_type unknown_variant_type_2 )</code>|
GetPositionWithinWindow|<code>Image.GetPositionWithinWindow()</code>|
GetPositionWithinAncestor|<code>Image.GetPositionWithinAncestor( unknown_variant_type unknown_variant_type_1 )</code>|
ApplyStyles|<code>Image.ApplyStyles( boolean boolean_1 )</code>|
ClearPropertyFromCode|<code>Image.ClearPropertyFromCode( unknown_variant_type unknown_variant_type_1 )</code>|
DeleteAsync|<code>Image.DeleteAsync( float float_1 )</code>|
BIsTransparent|<code>Image.BIsTransparent()</code>|
BAcceptsInput|<code>Image.BAcceptsInput()</code>|
BAcceptsFocus|<code>Image.BAcceptsFocus()</code>|
SetFocus|<code>Image.SetFocus()</code>|
UpdateFocusInContext|<code>Image.UpdateFocusInContext()</code>|
BHasHoverStyle|<code>Image.BHasHoverStyle()</code>|
SetAcceptsFocus|<code>Image.SetAcceptsFocus( boolean boolean_1 )</code>|
SetDisableFocusOnMouseDown|<code>Image.SetDisableFocusOnMouseDown( boolean boolean_1 )</code>|
BHasKeyFocus|<code>Image.BHasKeyFocus()</code>|
SetScrollParentToFitWhenFocused|<code>Image.SetScrollParentToFitWhenFocused( boolean boolean_1 )</code>|
BScrollParentToFitWhenFocused|<code>Image.BScrollParentToFitWhenFocused()</code>|
IsSelected|<code>Image.IsSelected()</code>|
BHasDescendantKeyFocus|<code>Image.BHasDescendantKeyFocus()</code>|
BLoadLayout|<code>Image.BLoadLayout( cstring cstring_1, boolean boolean_2, boolean boolean_3 )</code>|
BLoadLayoutSnippet|<code>Image.BLoadLayoutSnippet( cstring cstring_1 )</code>|
BHasLayoutSnippet|<code>Image.BHasLayoutSnippet( cstring cstring_1 )</code>|
SetTopOfInputContext|<code>Image.SetTopOfInputContext( boolean boolean_1 )</code>|
SetDialogVariable|<code>Image.SetDialogVariable( cstring cstring_1, cstring cstring_2 )</code>|
SetDialogVariableInt|<code>Image.SetDialogVariableInt( cstring cstring_1, integer integer_2 )</code>|
SetDialogVariableTime|<code>Image.SetDialogVariableTime( cstring cstring_1, int64 int64_2 )</code>|
SetDialogVariableLocString|<code>Image.SetDialogVariableLocString( cstring cstring_1, cstring cstring_2 )</code>|
SetDialogVariablePluralLocStringInt|<code>Image.SetDialogVariablePluralLocStringInt( cstring cstring_1, cstring cstring_2, int64 int64_3 )</code>|
ScrollToTop|<code>Image.ScrollToTop()</code>|
ScrollToBottom|<code>Image.ScrollToBottom()</code>|
ScrollToLeftEdge|<code>Image.ScrollToLeftEdge()</code>|
ScrollToRightEdge|<code>Image.ScrollToRightEdge()</code>|
ScrollParentToMakePanelFit|<code>Image.ScrollParentToMakePanelFit( unknown_variant_type unknown_variant_type_1, boolean boolean_2 )</code>|
ScrollToFitRegion|<code>Image.ScrollToFitRegion( float float_1, float float_2, float float_3, float float_4, unknown_variant_type unknown_variant_type_5, boolean boolean_6, boolean boolean_7 )</code>|
BCanSeeInParentScroll|<code>Image.BCanSeeInParentScroll()</code>|
GetAttributeInt|<code>Image.GetAttributeInt( cstring cstring_1, integer integer_2 )</code>|
GetAttributeString|<code>Image.GetAttributeString( cstring cstring_1, cstring cstring_2 )</code>|
GetAttributeUInt32|<code>Image.GetAttributeUInt32( cstring cstring_1, unsigned unsigned_2 )</code>|
SetAttributeInt|<code>Image.SetAttributeInt( cstring cstring_1, integer integer_2 )</code>|
SetAttributeString|<code>Image.SetAttributeString( cstring cstring_1, cstring cstring_2 )</code>|
SetAttributeUInt32|<code>Image.SetAttributeUInt32( cstring cstring_1, unsigned unsigned_2 )</code>|
SetInputNamespace|<code>Image.SetInputNamespace( cstring cstring_1 )</code>|
RegisterForReadyEvents|<code>Image.RegisterForReadyEvents( boolean boolean_1 )</code>|
BReadyForDisplay|<code>Image.BReadyForDisplay()</code>|
SetReadyForDisplay|<code>Image.SetReadyForDisplay( boolean boolean_1 )</code>|
SetPositionInPixels|<code>Image.SetPositionInPixels( float float_1, float float_2, float float_3 )</code>|
Data|<code>Image.Data( js_raw_args js_raw_args_1 )</code>|
SetImage|<code>Image.SetImage( cstring cstring_1 )</code>|
SetScaling|<code>Image.SetScaling( cstring cstring_1 )</code>|
SetPanelEvent|<code>Image.SetPanelEvent( js_raw_args js_raw_args_1 )</code>|
RunScriptInPanelContext|<code>Image.RunScriptInPanelContext( js_raw_args js_raw_args_1 )</code>|
rememberchildfocus|<code>Image.rememberchildfocus( boolean boolean_1 )</code>|
paneltype|<code>Image.paneltype()</code>|


# DOTACustomUIRoot
Function|Signature|Description
--|--|--
visible|<code>DOTACustomUIRoot.visible( boolean boolean_1 )</code>|
enabled|<code>DOTACustomUIRoot.enabled( boolean boolean_1 )</code>|
checked|<code>DOTACustomUIRoot.checked( boolean boolean_1 )</code>|
defaultfocus|<code>DOTACustomUIRoot.defaultfocus( cstring cstring_1 )</code>|
inputnamespace|<code>DOTACustomUIRoot.inputnamespace( cstring cstring_1 )</code>|
hittest|<code>DOTACustomUIRoot.hittest( boolean boolean_1 )</code>|
hittestchildren|<code>DOTACustomUIRoot.hittestchildren( boolean boolean_1 )</code>|
tabindex|<code>DOTACustomUIRoot.tabindex( float float_1 )</code>|
selectionpos_x|<code>DOTACustomUIRoot.selectionpos_x( float float_1 )</code>|
selectionpos_y|<code>DOTACustomUIRoot.selectionpos_y( float float_1 )</code>|
type|<code>DOTACustomUIRoot.type()</code>|
id|<code>DOTACustomUIRoot.id()</code>|
layoutfile|<code>DOTACustomUIRoot.layoutfile()</code>|
contentwidth|<code>DOTACustomUIRoot.contentwidth()</code>|
contentheight|<code>DOTACustomUIRoot.contentheight()</code>|
desiredlayoutwidth|<code>DOTACustomUIRoot.desiredlayoutwidth()</code>|
desiredlayoutheight|<code>DOTACustomUIRoot.desiredlayoutheight()</code>|
actuallayoutwidth|<code>DOTACustomUIRoot.actuallayoutwidth()</code>|
actuallayoutheight|<code>DOTACustomUIRoot.actuallayoutheight()</code>|
actualxoffset|<code>DOTACustomUIRoot.actualxoffset()</code>|
actualyoffset|<code>DOTACustomUIRoot.actualyoffset()</code>|
scrolloffset_y|<code>DOTACustomUIRoot.scrolloffset_y()</code>|
scrolloffset_x|<code>DOTACustomUIRoot.scrolloffset_x()</code>|
actualuiscale_y|<code>DOTACustomUIRoot.actualuiscale_y()</code>|
actualuiscale_x|<code>DOTACustomUIRoot.actualuiscale_x()</code>|
style|<code>DOTACustomUIRoot.style()</code>|
AddClass|<code>DOTACustomUIRoot.AddClass( cstring cstring_1 )</code>|
RemoveClass|<code>DOTACustomUIRoot.RemoveClass( cstring cstring_1 )</code>|
BHasClass|<code>DOTACustomUIRoot.BHasClass( cstring cstring_1 )</code>|
BAscendantHasClass|<code>DOTACustomUIRoot.BAscendantHasClass( cstring cstring_1 )</code>|
SetHasClass|<code>DOTACustomUIRoot.SetHasClass( cstring cstring_1, boolean boolean_2 )</code>|
ToggleClass|<code>DOTACustomUIRoot.ToggleClass( cstring cstring_1 )</code>|
SwitchClass|<code>DOTACustomUIRoot.SwitchClass( cstring cstring_1, cstring cstring_2 )</code>|
TriggerClass|<code>DOTACustomUIRoot.TriggerClass( cstring cstring_1 )</code>|
ClearPanelEvent|<code>DOTACustomUIRoot.ClearPanelEvent( cstring cstring_1 )</code>|
SetDraggable|<code>DOTACustomUIRoot.SetDraggable( boolean boolean_1 )</code>|
IsDraggable|<code>DOTACustomUIRoot.IsDraggable()</code>|
IsSizeValid|<code>DOTACustomUIRoot.IsSizeValid()</code>|
GetChildCount|<code>DOTACustomUIRoot.GetChildCount()</code>|
GetChild|<code>DOTACustomUIRoot.GetChild( integer integer_1 )</code>|
GetChildIndex|<code>DOTACustomUIRoot.GetChildIndex( unknown_variant_type unknown_variant_type_1 )</code>|
Children|<code>DOTACustomUIRoot.Children()</code>|
FindChildrenWithClassTraverse|<code>DOTACustomUIRoot.FindChildrenWithClassTraverse( cstring cstring_1 )</code>|
GetParent|<code>DOTACustomUIRoot.GetParent()</code>|
SetParent|<code>DOTACustomUIRoot.SetParent( unknown_variant_type unknown_variant_type_1 )</code>|
FindChild|<code>DOTACustomUIRoot.FindChild( cstring cstring_1 )</code>|
FindChildTraverse|<code>DOTACustomUIRoot.FindChildTraverse( cstring cstring_1 )</code>|
FindChildInLayoutFile|<code>DOTACustomUIRoot.FindChildInLayoutFile( cstring cstring_1 )</code>|
FindPanelInLayoutFile|<code>DOTACustomUIRoot.FindPanelInLayoutFile( cstring cstring_1 )</code>|
FindAncestor|<code>DOTACustomUIRoot.FindAncestor( cstring cstring_1 )</code>|
RemoveAndDeleteChildren|<code>DOTACustomUIRoot.RemoveAndDeleteChildren()</code>|
MoveChildBefore|<code>DOTACustomUIRoot.MoveChildBefore( unknown_variant_type unknown_variant_type_1, unknown_variant_type unknown_variant_type_2 )</code>|
MoveChildAfter|<code>DOTACustomUIRoot.MoveChildAfter( unknown_variant_type unknown_variant_type_1, unknown_variant_type unknown_variant_type_2 )</code>|
GetPositionWithinWindow|<code>DOTACustomUIRoot.GetPositionWithinWindow()</code>|
GetPositionWithinAncestor|<code>DOTACustomUIRoot.GetPositionWithinAncestor( unknown_variant_type unknown_variant_type_1 )</code>|
ApplyStyles|<code>DOTACustomUIRoot.ApplyStyles( boolean boolean_1 )</code>|
ClearPropertyFromCode|<code>DOTACustomUIRoot.ClearPropertyFromCode( unknown_variant_type unknown_variant_type_1 )</code>|
DeleteAsync|<code>DOTACustomUIRoot.DeleteAsync( float float_1 )</code>|
BIsTransparent|<code>DOTACustomUIRoot.BIsTransparent()</code>|
BAcceptsInput|<code>DOTACustomUIRoot.BAcceptsInput()</code>|
BAcceptsFocus|<code>DOTACustomUIRoot.BAcceptsFocus()</code>|
SetFocus|<code>DOTACustomUIRoot.SetFocus()</code>|
UpdateFocusInContext|<code>DOTACustomUIRoot.UpdateFocusInContext()</code>|
BHasHoverStyle|<code>DOTACustomUIRoot.BHasHoverStyle()</code>|
SetAcceptsFocus|<code>DOTACustomUIRoot.SetAcceptsFocus( boolean boolean_1 )</code>|
SetDisableFocusOnMouseDown|<code>DOTACustomUIRoot.SetDisableFocusOnMouseDown( boolean boolean_1 )</code>|
BHasKeyFocus|<code>DOTACustomUIRoot.BHasKeyFocus()</code>|
SetScrollParentToFitWhenFocused|<code>DOTACustomUIRoot.SetScrollParentToFitWhenFocused( boolean boolean_1 )</code>|
BScrollParentToFitWhenFocused|<code>DOTACustomUIRoot.BScrollParentToFitWhenFocused()</code>|
IsSelected|<code>DOTACustomUIRoot.IsSelected()</code>|
BHasDescendantKeyFocus|<code>DOTACustomUIRoot.BHasDescendantKeyFocus()</code>|
BLoadLayout|<code>DOTACustomUIRoot.BLoadLayout( cstring cstring_1, boolean boolean_2, boolean boolean_3 )</code>|
BLoadLayoutSnippet|<code>DOTACustomUIRoot.BLoadLayoutSnippet( cstring cstring_1 )</code>|
BHasLayoutSnippet|<code>DOTACustomUIRoot.BHasLayoutSnippet( cstring cstring_1 )</code>|
SetTopOfInputContext|<code>DOTACustomUIRoot.SetTopOfInputContext( boolean boolean_1 )</code>|
SetDialogVariable|<code>DOTACustomUIRoot.SetDialogVariable( cstring cstring_1, cstring cstring_2 )</code>|
SetDialogVariableInt|<code>DOTACustomUIRoot.SetDialogVariableInt( cstring cstring_1, integer integer_2 )</code>|
SetDialogVariableTime|<code>DOTACustomUIRoot.SetDialogVariableTime( cstring cstring_1, int64 int64_2 )</code>|
SetDialogVariableLocString|<code>DOTACustomUIRoot.SetDialogVariableLocString( cstring cstring_1, cstring cstring_2 )</code>|
SetDialogVariablePluralLocStringInt|<code>DOTACustomUIRoot.SetDialogVariablePluralLocStringInt( cstring cstring_1, cstring cstring_2, int64 int64_3 )</code>|
ScrollToTop|<code>DOTACustomUIRoot.ScrollToTop()</code>|
ScrollToBottom|<code>DOTACustomUIRoot.ScrollToBottom()</code>|
ScrollToLeftEdge|<code>DOTACustomUIRoot.ScrollToLeftEdge()</code>|
ScrollToRightEdge|<code>DOTACustomUIRoot.ScrollToRightEdge()</code>|
ScrollParentToMakePanelFit|<code>DOTACustomUIRoot.ScrollParentToMakePanelFit( unknown_variant_type unknown_variant_type_1, boolean boolean_2 )</code>|
ScrollToFitRegion|<code>DOTACustomUIRoot.ScrollToFitRegion( float float_1, float float_2, float float_3, float float_4, unknown_variant_type unknown_variant_type_5, boolean boolean_6, boolean boolean_7 )</code>|
BCanSeeInParentScroll|<code>DOTACustomUIRoot.BCanSeeInParentScroll()</code>|
GetAttributeInt|<code>DOTACustomUIRoot.GetAttributeInt( cstring cstring_1, integer integer_2 )</code>|
GetAttributeString|<code>DOTACustomUIRoot.GetAttributeString( cstring cstring_1, cstring cstring_2 )</code>|
GetAttributeUInt32|<code>DOTACustomUIRoot.GetAttributeUInt32( cstring cstring_1, unsigned unsigned_2 )</code>|
SetAttributeInt|<code>DOTACustomUIRoot.SetAttributeInt( cstring cstring_1, integer integer_2 )</code>|
SetAttributeString|<code>DOTACustomUIRoot.SetAttributeString( cstring cstring_1, cstring cstring_2 )</code>|
SetAttributeUInt32|<code>DOTACustomUIRoot.SetAttributeUInt32( cstring cstring_1, unsigned unsigned_2 )</code>|
SetInputNamespace|<code>DOTACustomUIRoot.SetInputNamespace( cstring cstring_1 )</code>|
RegisterForReadyEvents|<code>DOTACustomUIRoot.RegisterForReadyEvents( boolean boolean_1 )</code>|
BReadyForDisplay|<code>DOTACustomUIRoot.BReadyForDisplay()</code>|
SetReadyForDisplay|<code>DOTACustomUIRoot.SetReadyForDisplay( boolean boolean_1 )</code>|
SetPositionInPixels|<code>DOTACustomUIRoot.SetPositionInPixels( float float_1, float float_2, float float_3 )</code>|
Data|<code>DOTACustomUIRoot.Data( js_raw_args js_raw_args_1 )</code>|
SetPanelEvent|<code>DOTACustomUIRoot.SetPanelEvent( js_raw_args js_raw_args_1 )</code>|
RunScriptInPanelContext|<code>DOTACustomUIRoot.RunScriptInPanelContext( js_raw_args js_raw_args_1 )</code>|
rememberchildfocus|<code>DOTACustomUIRoot.rememberchildfocus( boolean boolean_1 )</code>|
paneltype|<code>DOTACustomUIRoot.paneltype()</code>|


# DOTAHud
Function|Signature|Description
--|--|--
visible|<code>DOTAHud.visible( boolean boolean_1 )</code>|
enabled|<code>DOTAHud.enabled( boolean boolean_1 )</code>|
checked|<code>DOTAHud.checked( boolean boolean_1 )</code>|
defaultfocus|<code>DOTAHud.defaultfocus( cstring cstring_1 )</code>|
inputnamespace|<code>DOTAHud.inputnamespace( cstring cstring_1 )</code>|
hittest|<code>DOTAHud.hittest( boolean boolean_1 )</code>|
hittestchildren|<code>DOTAHud.hittestchildren( boolean boolean_1 )</code>|
tabindex|<code>DOTAHud.tabindex( float float_1 )</code>|
selectionpos_x|<code>DOTAHud.selectionpos_x( float float_1 )</code>|
selectionpos_y|<code>DOTAHud.selectionpos_y( float float_1 )</code>|
type|<code>DOTAHud.type()</code>|
id|<code>DOTAHud.id()</code>|
layoutfile|<code>DOTAHud.layoutfile()</code>|
contentwidth|<code>DOTAHud.contentwidth()</code>|
contentheight|<code>DOTAHud.contentheight()</code>|
desiredlayoutwidth|<code>DOTAHud.desiredlayoutwidth()</code>|
desiredlayoutheight|<code>DOTAHud.desiredlayoutheight()</code>|
actuallayoutwidth|<code>DOTAHud.actuallayoutwidth()</code>|
actuallayoutheight|<code>DOTAHud.actuallayoutheight()</code>|
actualxoffset|<code>DOTAHud.actualxoffset()</code>|
actualyoffset|<code>DOTAHud.actualyoffset()</code>|
scrolloffset_y|<code>DOTAHud.scrolloffset_y()</code>|
scrolloffset_x|<code>DOTAHud.scrolloffset_x()</code>|
actualuiscale_y|<code>DOTAHud.actualuiscale_y()</code>|
actualuiscale_x|<code>DOTAHud.actualuiscale_x()</code>|
style|<code>DOTAHud.style()</code>|
AddClass|<code>DOTAHud.AddClass( cstring cstring_1 )</code>|
RemoveClass|<code>DOTAHud.RemoveClass( cstring cstring_1 )</code>|
BHasClass|<code>DOTAHud.BHasClass( cstring cstring_1 )</code>|
BAscendantHasClass|<code>DOTAHud.BAscendantHasClass( cstring cstring_1 )</code>|
SetHasClass|<code>DOTAHud.SetHasClass( cstring cstring_1, boolean boolean_2 )</code>|
ToggleClass|<code>DOTAHud.ToggleClass( cstring cstring_1 )</code>|
SwitchClass|<code>DOTAHud.SwitchClass( cstring cstring_1, cstring cstring_2 )</code>|
TriggerClass|<code>DOTAHud.TriggerClass( cstring cstring_1 )</code>|
ClearPanelEvent|<code>DOTAHud.ClearPanelEvent( cstring cstring_1 )</code>|
SetDraggable|<code>DOTAHud.SetDraggable( boolean boolean_1 )</code>|
IsDraggable|<code>DOTAHud.IsDraggable()</code>|
IsSizeValid|<code>DOTAHud.IsSizeValid()</code>|
GetChildCount|<code>DOTAHud.GetChildCount()</code>|
GetChild|<code>DOTAHud.GetChild( integer integer_1 )</code>|
GetChildIndex|<code>DOTAHud.GetChildIndex( unknown_variant_type unknown_variant_type_1 )</code>|
Children|<code>DOTAHud.Children()</code>|
FindChildrenWithClassTraverse|<code>DOTAHud.FindChildrenWithClassTraverse( cstring cstring_1 )</code>|
GetParent|<code>DOTAHud.GetParent()</code>|
SetParent|<code>DOTAHud.SetParent( unknown_variant_type unknown_variant_type_1 )</code>|
FindChild|<code>DOTAHud.FindChild( cstring cstring_1 )</code>|
FindChildTraverse|<code>DOTAHud.FindChildTraverse( cstring cstring_1 )</code>|
FindChildInLayoutFile|<code>DOTAHud.FindChildInLayoutFile( cstring cstring_1 )</code>|
FindPanelInLayoutFile|<code>DOTAHud.FindPanelInLayoutFile( cstring cstring_1 )</code>|
FindAncestor|<code>DOTAHud.FindAncestor( cstring cstring_1 )</code>|
RemoveAndDeleteChildren|<code>DOTAHud.RemoveAndDeleteChildren()</code>|
MoveChildBefore|<code>DOTAHud.MoveChildBefore( unknown_variant_type unknown_variant_type_1, unknown_variant_type unknown_variant_type_2 )</code>|
MoveChildAfter|<code>DOTAHud.MoveChildAfter( unknown_variant_type unknown_variant_type_1, unknown_variant_type unknown_variant_type_2 )</code>|
GetPositionWithinWindow|<code>DOTAHud.GetPositionWithinWindow()</code>|
GetPositionWithinAncestor|<code>DOTAHud.GetPositionWithinAncestor( unknown_variant_type unknown_variant_type_1 )</code>|
ApplyStyles|<code>DOTAHud.ApplyStyles( boolean boolean_1 )</code>|
ClearPropertyFromCode|<code>DOTAHud.ClearPropertyFromCode( unknown_variant_type unknown_variant_type_1 )</code>|
DeleteAsync|<code>DOTAHud.DeleteAsync( float float_1 )</code>|
BIsTransparent|<code>DOTAHud.BIsTransparent()</code>|
BAcceptsInput|<code>DOTAHud.BAcceptsInput()</code>|
BAcceptsFocus|<code>DOTAHud.BAcceptsFocus()</code>|
SetFocus|<code>DOTAHud.SetFocus()</code>|
UpdateFocusInContext|<code>DOTAHud.UpdateFocusInContext()</code>|
BHasHoverStyle|<code>DOTAHud.BHasHoverStyle()</code>|
SetAcceptsFocus|<code>DOTAHud.SetAcceptsFocus( boolean boolean_1 )</code>|
SetDisableFocusOnMouseDown|<code>DOTAHud.SetDisableFocusOnMouseDown( boolean boolean_1 )</code>|
BHasKeyFocus|<code>DOTAHud.BHasKeyFocus()</code>|
SetScrollParentToFitWhenFocused|<code>DOTAHud.SetScrollParentToFitWhenFocused( boolean boolean_1 )</code>|
BScrollParentToFitWhenFocused|<code>DOTAHud.BScrollParentToFitWhenFocused()</code>|
IsSelected|<code>DOTAHud.IsSelected()</code>|
BHasDescendantKeyFocus|<code>DOTAHud.BHasDescendantKeyFocus()</code>|
BLoadLayout|<code>DOTAHud.BLoadLayout( cstring cstring_1, boolean boolean_2, boolean boolean_3 )</code>|
BLoadLayoutSnippet|<code>DOTAHud.BLoadLayoutSnippet( cstring cstring_1 )</code>|
BHasLayoutSnippet|<code>DOTAHud.BHasLayoutSnippet( cstring cstring_1 )</code>|
SetTopOfInputContext|<code>DOTAHud.SetTopOfInputContext( boolean boolean_1 )</code>|
SetDialogVariable|<code>DOTAHud.SetDialogVariable( cstring cstring_1, cstring cstring_2 )</code>|
SetDialogVariableInt|<code>DOTAHud.SetDialogVariableInt( cstring cstring_1, integer integer_2 )</code>|
SetDialogVariableTime|<code>DOTAHud.SetDialogVariableTime( cstring cstring_1, int64 int64_2 )</code>|
SetDialogVariableLocString|<code>DOTAHud.SetDialogVariableLocString( cstring cstring_1, cstring cstring_2 )</code>|
SetDialogVariablePluralLocStringInt|<code>DOTAHud.SetDialogVariablePluralLocStringInt( cstring cstring_1, cstring cstring_2, int64 int64_3 )</code>|
ScrollToTop|<code>DOTAHud.ScrollToTop()</code>|
ScrollToBottom|<code>DOTAHud.ScrollToBottom()</code>|
ScrollToLeftEdge|<code>DOTAHud.ScrollToLeftEdge()</code>|
ScrollToRightEdge|<code>DOTAHud.ScrollToRightEdge()</code>|
ScrollParentToMakePanelFit|<code>DOTAHud.ScrollParentToMakePanelFit( unknown_variant_type unknown_variant_type_1, boolean boolean_2 )</code>|
ScrollToFitRegion|<code>DOTAHud.ScrollToFitRegion( float float_1, float float_2, float float_3, float float_4, unknown_variant_type unknown_variant_type_5, boolean boolean_6, boolean boolean_7 )</code>|
BCanSeeInParentScroll|<code>DOTAHud.BCanSeeInParentScroll()</code>|
GetAttributeInt|<code>DOTAHud.GetAttributeInt( cstring cstring_1, integer integer_2 )</code>|
GetAttributeString|<code>DOTAHud.GetAttributeString( cstring cstring_1, cstring cstring_2 )</code>|
GetAttributeUInt32|<code>DOTAHud.GetAttributeUInt32( cstring cstring_1, unsigned unsigned_2 )</code>|
SetAttributeInt|<code>DOTAHud.SetAttributeInt( cstring cstring_1, integer integer_2 )</code>|
SetAttributeString|<code>DOTAHud.SetAttributeString( cstring cstring_1, cstring cstring_2 )</code>|
SetAttributeUInt32|<code>DOTAHud.SetAttributeUInt32( cstring cstring_1, unsigned unsigned_2 )</code>|
SetInputNamespace|<code>DOTAHud.SetInputNamespace( cstring cstring_1 )</code>|
RegisterForReadyEvents|<code>DOTAHud.RegisterForReadyEvents( boolean boolean_1 )</code>|
BReadyForDisplay|<code>DOTAHud.BReadyForDisplay()</code>|
SetReadyForDisplay|<code>DOTAHud.SetReadyForDisplay( boolean boolean_1 )</code>|
SetPositionInPixels|<code>DOTAHud.SetPositionInPixels( float float_1, float float_2, float float_3 )</code>|
Data|<code>DOTAHud.Data( js_raw_args js_raw_args_1 )</code>|
SetPanelEvent|<code>DOTAHud.SetPanelEvent( js_raw_args js_raw_args_1 )</code>|
RunScriptInPanelContext|<code>DOTAHud.RunScriptInPanelContext( js_raw_args js_raw_args_1 )</code>|
rememberchildfocus|<code>DOTAHud.rememberchildfocus( boolean boolean_1 )</code>|
paneltype|<code>DOTAHud.paneltype()</code>|


# DOTAPaused
Function|Signature|Description
--|--|--
visible|<code>DOTAPaused.visible( boolean boolean_1 )</code>|
enabled|<code>DOTAPaused.enabled( boolean boolean_1 )</code>|
checked|<code>DOTAPaused.checked( boolean boolean_1 )</code>|
defaultfocus|<code>DOTAPaused.defaultfocus( cstring cstring_1 )</code>|
inputnamespace|<code>DOTAPaused.inputnamespace( cstring cstring_1 )</code>|
hittest|<code>DOTAPaused.hittest( boolean boolean_1 )</code>|
hittestchildren|<code>DOTAPaused.hittestchildren( boolean boolean_1 )</code>|
tabindex|<code>DOTAPaused.tabindex( float float_1 )</code>|
selectionpos_x|<code>DOTAPaused.selectionpos_x( float float_1 )</code>|
selectionpos_y|<code>DOTAPaused.selectionpos_y( float float_1 )</code>|
type|<code>DOTAPaused.type()</code>|
id|<code>DOTAPaused.id()</code>|
layoutfile|<code>DOTAPaused.layoutfile()</code>|
contentwidth|<code>DOTAPaused.contentwidth()</code>|
contentheight|<code>DOTAPaused.contentheight()</code>|
desiredlayoutwidth|<code>DOTAPaused.desiredlayoutwidth()</code>|
desiredlayoutheight|<code>DOTAPaused.desiredlayoutheight()</code>|
actuallayoutwidth|<code>DOTAPaused.actuallayoutwidth()</code>|
actuallayoutheight|<code>DOTAPaused.actuallayoutheight()</code>|
actualxoffset|<code>DOTAPaused.actualxoffset()</code>|
actualyoffset|<code>DOTAPaused.actualyoffset()</code>|
scrolloffset_y|<code>DOTAPaused.scrolloffset_y()</code>|
scrolloffset_x|<code>DOTAPaused.scrolloffset_x()</code>|
actualuiscale_y|<code>DOTAPaused.actualuiscale_y()</code>|
actualuiscale_x|<code>DOTAPaused.actualuiscale_x()</code>|
style|<code>DOTAPaused.style()</code>|
AddClass|<code>DOTAPaused.AddClass( cstring cstring_1 )</code>|
RemoveClass|<code>DOTAPaused.RemoveClass( cstring cstring_1 )</code>|
BHasClass|<code>DOTAPaused.BHasClass( cstring cstring_1 )</code>|
BAscendantHasClass|<code>DOTAPaused.BAscendantHasClass( cstring cstring_1 )</code>|
SetHasClass|<code>DOTAPaused.SetHasClass( cstring cstring_1, boolean boolean_2 )</code>|
ToggleClass|<code>DOTAPaused.ToggleClass( cstring cstring_1 )</code>|
SwitchClass|<code>DOTAPaused.SwitchClass( cstring cstring_1, cstring cstring_2 )</code>|
TriggerClass|<code>DOTAPaused.TriggerClass( cstring cstring_1 )</code>|
ClearPanelEvent|<code>DOTAPaused.ClearPanelEvent( cstring cstring_1 )</code>|
SetDraggable|<code>DOTAPaused.SetDraggable( boolean boolean_1 )</code>|
IsDraggable|<code>DOTAPaused.IsDraggable()</code>|
IsSizeValid|<code>DOTAPaused.IsSizeValid()</code>|
GetChildCount|<code>DOTAPaused.GetChildCount()</code>|
GetChild|<code>DOTAPaused.GetChild( integer integer_1 )</code>|
GetChildIndex|<code>DOTAPaused.GetChildIndex( unknown_variant_type unknown_variant_type_1 )</code>|
Children|<code>DOTAPaused.Children()</code>|
FindChildrenWithClassTraverse|<code>DOTAPaused.FindChildrenWithClassTraverse( cstring cstring_1 )</code>|
GetParent|<code>DOTAPaused.GetParent()</code>|
SetParent|<code>DOTAPaused.SetParent( unknown_variant_type unknown_variant_type_1 )</code>|
FindChild|<code>DOTAPaused.FindChild( cstring cstring_1 )</code>|
FindChildTraverse|<code>DOTAPaused.FindChildTraverse( cstring cstring_1 )</code>|
FindChildInLayoutFile|<code>DOTAPaused.FindChildInLayoutFile( cstring cstring_1 )</code>|
FindPanelInLayoutFile|<code>DOTAPaused.FindPanelInLayoutFile( cstring cstring_1 )</code>|
FindAncestor|<code>DOTAPaused.FindAncestor( cstring cstring_1 )</code>|
RemoveAndDeleteChildren|<code>DOTAPaused.RemoveAndDeleteChildren()</code>|
MoveChildBefore|<code>DOTAPaused.MoveChildBefore( unknown_variant_type unknown_variant_type_1, unknown_variant_type unknown_variant_type_2 )</code>|
MoveChildAfter|<code>DOTAPaused.MoveChildAfter( unknown_variant_type unknown_variant_type_1, unknown_variant_type unknown_variant_type_2 )</code>|
GetPositionWithinWindow|<code>DOTAPaused.GetPositionWithinWindow()</code>|
GetPositionWithinAncestor|<code>DOTAPaused.GetPositionWithinAncestor( unknown_variant_type unknown_variant_type_1 )</code>|
ApplyStyles|<code>DOTAPaused.ApplyStyles( boolean boolean_1 )</code>|
ClearPropertyFromCode|<code>DOTAPaused.ClearPropertyFromCode( unknown_variant_type unknown_variant_type_1 )</code>|
DeleteAsync|<code>DOTAPaused.DeleteAsync( float float_1 )</code>|
BIsTransparent|<code>DOTAPaused.BIsTransparent()</code>|
BAcceptsInput|<code>DOTAPaused.BAcceptsInput()</code>|
BAcceptsFocus|<code>DOTAPaused.BAcceptsFocus()</code>|
SetFocus|<code>DOTAPaused.SetFocus()</code>|
UpdateFocusInContext|<code>DOTAPaused.UpdateFocusInContext()</code>|
BHasHoverStyle|<code>DOTAPaused.BHasHoverStyle()</code>|
SetAcceptsFocus|<code>DOTAPaused.SetAcceptsFocus( boolean boolean_1 )</code>|
SetDisableFocusOnMouseDown|<code>DOTAPaused.SetDisableFocusOnMouseDown( boolean boolean_1 )</code>|
BHasKeyFocus|<code>DOTAPaused.BHasKeyFocus()</code>|
SetScrollParentToFitWhenFocused|<code>DOTAPaused.SetScrollParentToFitWhenFocused( boolean boolean_1 )</code>|
BScrollParentToFitWhenFocused|<code>DOTAPaused.BScrollParentToFitWhenFocused()</code>|
IsSelected|<code>DOTAPaused.IsSelected()</code>|
BHasDescendantKeyFocus|<code>DOTAPaused.BHasDescendantKeyFocus()</code>|
BLoadLayout|<code>DOTAPaused.BLoadLayout( cstring cstring_1, boolean boolean_2, boolean boolean_3 )</code>|
BLoadLayoutSnippet|<code>DOTAPaused.BLoadLayoutSnippet( cstring cstring_1 )</code>|
BHasLayoutSnippet|<code>DOTAPaused.BHasLayoutSnippet( cstring cstring_1 )</code>|
SetTopOfInputContext|<code>DOTAPaused.SetTopOfInputContext( boolean boolean_1 )</code>|
SetDialogVariable|<code>DOTAPaused.SetDialogVariable( cstring cstring_1, cstring cstring_2 )</code>|
SetDialogVariableInt|<code>DOTAPaused.SetDialogVariableInt( cstring cstring_1, integer integer_2 )</code>|
SetDialogVariableTime|<code>DOTAPaused.SetDialogVariableTime( cstring cstring_1, int64 int64_2 )</code>|
SetDialogVariableLocString|<code>DOTAPaused.SetDialogVariableLocString( cstring cstring_1, cstring cstring_2 )</code>|
SetDialogVariablePluralLocStringInt|<code>DOTAPaused.SetDialogVariablePluralLocStringInt( cstring cstring_1, cstring cstring_2, int64 int64_3 )</code>|
ScrollToTop|<code>DOTAPaused.ScrollToTop()</code>|
ScrollToBottom|<code>DOTAPaused.ScrollToBottom()</code>|
ScrollToLeftEdge|<code>DOTAPaused.ScrollToLeftEdge()</code>|
ScrollToRightEdge|<code>DOTAPaused.ScrollToRightEdge()</code>|
ScrollParentToMakePanelFit|<code>DOTAPaused.ScrollParentToMakePanelFit( unknown_variant_type unknown_variant_type_1, boolean boolean_2 )</code>|
ScrollToFitRegion|<code>DOTAPaused.ScrollToFitRegion( float float_1, float float_2, float float_3, float float_4, unknown_variant_type unknown_variant_type_5, boolean boolean_6, boolean boolean_7 )</code>|
BCanSeeInParentScroll|<code>DOTAPaused.BCanSeeInParentScroll()</code>|
GetAttributeInt|<code>DOTAPaused.GetAttributeInt( cstring cstring_1, integer integer_2 )</code>|
GetAttributeString|<code>DOTAPaused.GetAttributeString( cstring cstring_1, cstring cstring_2 )</code>|
GetAttributeUInt32|<code>DOTAPaused.GetAttributeUInt32( cstring cstring_1, unsigned unsigned_2 )</code>|
SetAttributeInt|<code>DOTAPaused.SetAttributeInt( cstring cstring_1, integer integer_2 )</code>|
SetAttributeString|<code>DOTAPaused.SetAttributeString( cstring cstring_1, cstring cstring_2 )</code>|
SetAttributeUInt32|<code>DOTAPaused.SetAttributeUInt32( cstring cstring_1, unsigned unsigned_2 )</code>|
SetInputNamespace|<code>DOTAPaused.SetInputNamespace( cstring cstring_1 )</code>|
RegisterForReadyEvents|<code>DOTAPaused.RegisterForReadyEvents( boolean boolean_1 )</code>|
BReadyForDisplay|<code>DOTAPaused.BReadyForDisplay()</code>|
SetReadyForDisplay|<code>DOTAPaused.SetReadyForDisplay( boolean boolean_1 )</code>|
SetPositionInPixels|<code>DOTAPaused.SetPositionInPixels( float float_1, float float_2, float float_3 )</code>|
Data|<code>DOTAPaused.Data( js_raw_args js_raw_args_1 )</code>|
SetPanelEvent|<code>DOTAPaused.SetPanelEvent( js_raw_args js_raw_args_1 )</code>|
RunScriptInPanelContext|<code>DOTAPaused.RunScriptInPanelContext( js_raw_args js_raw_args_1 )</code>|
rememberchildfocus|<code>DOTAPaused.rememberchildfocus( boolean boolean_1 )</code>|
paneltype|<code>DOTAPaused.paneltype()</code>|


# DOTAChat
Function|Signature|Description
--|--|--
visible|<code>DOTAChat.visible( boolean boolean_1 )</code>|
enabled|<code>DOTAChat.enabled( boolean boolean_1 )</code>|
checked|<code>DOTAChat.checked( boolean boolean_1 )</code>|
defaultfocus|<code>DOTAChat.defaultfocus( cstring cstring_1 )</code>|
inputnamespace|<code>DOTAChat.inputnamespace( cstring cstring_1 )</code>|
hittest|<code>DOTAChat.hittest( boolean boolean_1 )</code>|
hittestchildren|<code>DOTAChat.hittestchildren( boolean boolean_1 )</code>|
tabindex|<code>DOTAChat.tabindex( float float_1 )</code>|
selectionpos_x|<code>DOTAChat.selectionpos_x( float float_1 )</code>|
selectionpos_y|<code>DOTAChat.selectionpos_y( float float_1 )</code>|
type|<code>DOTAChat.type()</code>|
id|<code>DOTAChat.id()</code>|
layoutfile|<code>DOTAChat.layoutfile()</code>|
contentwidth|<code>DOTAChat.contentwidth()</code>|
contentheight|<code>DOTAChat.contentheight()</code>|
desiredlayoutwidth|<code>DOTAChat.desiredlayoutwidth()</code>|
desiredlayoutheight|<code>DOTAChat.desiredlayoutheight()</code>|
actuallayoutwidth|<code>DOTAChat.actuallayoutwidth()</code>|
actuallayoutheight|<code>DOTAChat.actuallayoutheight()</code>|
actualxoffset|<code>DOTAChat.actualxoffset()</code>|
actualyoffset|<code>DOTAChat.actualyoffset()</code>|
scrolloffset_y|<code>DOTAChat.scrolloffset_y()</code>|
scrolloffset_x|<code>DOTAChat.scrolloffset_x()</code>|
actualuiscale_y|<code>DOTAChat.actualuiscale_y()</code>|
actualuiscale_x|<code>DOTAChat.actualuiscale_x()</code>|
style|<code>DOTAChat.style()</code>|
AddClass|<code>DOTAChat.AddClass( cstring cstring_1 )</code>|
RemoveClass|<code>DOTAChat.RemoveClass( cstring cstring_1 )</code>|
BHasClass|<code>DOTAChat.BHasClass( cstring cstring_1 )</code>|
BAscendantHasClass|<code>DOTAChat.BAscendantHasClass( cstring cstring_1 )</code>|
SetHasClass|<code>DOTAChat.SetHasClass( cstring cstring_1, boolean boolean_2 )</code>|
ToggleClass|<code>DOTAChat.ToggleClass( cstring cstring_1 )</code>|
SwitchClass|<code>DOTAChat.SwitchClass( cstring cstring_1, cstring cstring_2 )</code>|
TriggerClass|<code>DOTAChat.TriggerClass( cstring cstring_1 )</code>|
ClearPanelEvent|<code>DOTAChat.ClearPanelEvent( cstring cstring_1 )</code>|
SetDraggable|<code>DOTAChat.SetDraggable( boolean boolean_1 )</code>|
IsDraggable|<code>DOTAChat.IsDraggable()</code>|
IsSizeValid|<code>DOTAChat.IsSizeValid()</code>|
GetChildCount|<code>DOTAChat.GetChildCount()</code>|
GetChild|<code>DOTAChat.GetChild( integer integer_1 )</code>|
GetChildIndex|<code>DOTAChat.GetChildIndex( unknown_variant_type unknown_variant_type_1 )</code>|
Children|<code>DOTAChat.Children()</code>|
FindChildrenWithClassTraverse|<code>DOTAChat.FindChildrenWithClassTraverse( cstring cstring_1 )</code>|
GetParent|<code>DOTAChat.GetParent()</code>|
SetParent|<code>DOTAChat.SetParent( unknown_variant_type unknown_variant_type_1 )</code>|
FindChild|<code>DOTAChat.FindChild( cstring cstring_1 )</code>|
FindChildTraverse|<code>DOTAChat.FindChildTraverse( cstring cstring_1 )</code>|
FindChildInLayoutFile|<code>DOTAChat.FindChildInLayoutFile( cstring cstring_1 )</code>|
FindPanelInLayoutFile|<code>DOTAChat.FindPanelInLayoutFile( cstring cstring_1 )</code>|
FindAncestor|<code>DOTAChat.FindAncestor( cstring cstring_1 )</code>|
RemoveAndDeleteChildren|<code>DOTAChat.RemoveAndDeleteChildren()</code>|
MoveChildBefore|<code>DOTAChat.MoveChildBefore( unknown_variant_type unknown_variant_type_1, unknown_variant_type unknown_variant_type_2 )</code>|
MoveChildAfter|<code>DOTAChat.MoveChildAfter( unknown_variant_type unknown_variant_type_1, unknown_variant_type unknown_variant_type_2 )</code>|
GetPositionWithinWindow|<code>DOTAChat.GetPositionWithinWindow()</code>|
GetPositionWithinAncestor|<code>DOTAChat.GetPositionWithinAncestor( unknown_variant_type unknown_variant_type_1 )</code>|
ApplyStyles|<code>DOTAChat.ApplyStyles( boolean boolean_1 )</code>|
ClearPropertyFromCode|<code>DOTAChat.ClearPropertyFromCode( unknown_variant_type unknown_variant_type_1 )</code>|
DeleteAsync|<code>DOTAChat.DeleteAsync( float float_1 )</code>|
BIsTransparent|<code>DOTAChat.BIsTransparent()</code>|
BAcceptsInput|<code>DOTAChat.BAcceptsInput()</code>|
BAcceptsFocus|<code>DOTAChat.BAcceptsFocus()</code>|
SetFocus|<code>DOTAChat.SetFocus()</code>|
UpdateFocusInContext|<code>DOTAChat.UpdateFocusInContext()</code>|
BHasHoverStyle|<code>DOTAChat.BHasHoverStyle()</code>|
SetAcceptsFocus|<code>DOTAChat.SetAcceptsFocus( boolean boolean_1 )</code>|
SetDisableFocusOnMouseDown|<code>DOTAChat.SetDisableFocusOnMouseDown( boolean boolean_1 )</code>|
BHasKeyFocus|<code>DOTAChat.BHasKeyFocus()</code>|
SetScrollParentToFitWhenFocused|<code>DOTAChat.SetScrollParentToFitWhenFocused( boolean boolean_1 )</code>|
BScrollParentToFitWhenFocused|<code>DOTAChat.BScrollParentToFitWhenFocused()</code>|
IsSelected|<code>DOTAChat.IsSelected()</code>|
BHasDescendantKeyFocus|<code>DOTAChat.BHasDescendantKeyFocus()</code>|
BLoadLayout|<code>DOTAChat.BLoadLayout( cstring cstring_1, boolean boolean_2, boolean boolean_3 )</code>|
BLoadLayoutSnippet|<code>DOTAChat.BLoadLayoutSnippet( cstring cstring_1 )</code>|
BHasLayoutSnippet|<code>DOTAChat.BHasLayoutSnippet( cstring cstring_1 )</code>|
SetTopOfInputContext|<code>DOTAChat.SetTopOfInputContext( boolean boolean_1 )</code>|
SetDialogVariable|<code>DOTAChat.SetDialogVariable( cstring cstring_1, cstring cstring_2 )</code>|
SetDialogVariableInt|<code>DOTAChat.SetDialogVariableInt( cstring cstring_1, integer integer_2 )</code>|
SetDialogVariableTime|<code>DOTAChat.SetDialogVariableTime( cstring cstring_1, int64 int64_2 )</code>|
SetDialogVariableLocString|<code>DOTAChat.SetDialogVariableLocString( cstring cstring_1, cstring cstring_2 )</code>|
SetDialogVariablePluralLocStringInt|<code>DOTAChat.SetDialogVariablePluralLocStringInt( cstring cstring_1, cstring cstring_2, int64 int64_3 )</code>|
ScrollToTop|<code>DOTAChat.ScrollToTop()</code>|
ScrollToBottom|<code>DOTAChat.ScrollToBottom()</code>|
ScrollToLeftEdge|<code>DOTAChat.ScrollToLeftEdge()</code>|
ScrollToRightEdge|<code>DOTAChat.ScrollToRightEdge()</code>|
ScrollParentToMakePanelFit|<code>DOTAChat.ScrollParentToMakePanelFit( unknown_variant_type unknown_variant_type_1, boolean boolean_2 )</code>|
ScrollToFitRegion|<code>DOTAChat.ScrollToFitRegion( float float_1, float float_2, float float_3, float float_4, unknown_variant_type unknown_variant_type_5, boolean boolean_6, boolean boolean_7 )</code>|
BCanSeeInParentScroll|<code>DOTAChat.BCanSeeInParentScroll()</code>|
GetAttributeInt|<code>DOTAChat.GetAttributeInt( cstring cstring_1, integer integer_2 )</code>|
GetAttributeString|<code>DOTAChat.GetAttributeString( cstring cstring_1, cstring cstring_2 )</code>|
GetAttributeUInt32|<code>DOTAChat.GetAttributeUInt32( cstring cstring_1, unsigned unsigned_2 )</code>|
SetAttributeInt|<code>DOTAChat.SetAttributeInt( cstring cstring_1, integer integer_2 )</code>|
SetAttributeString|<code>DOTAChat.SetAttributeString( cstring cstring_1, cstring cstring_2 )</code>|
SetAttributeUInt32|<code>DOTAChat.SetAttributeUInt32( cstring cstring_1, unsigned unsigned_2 )</code>|
SetInputNamespace|<code>DOTAChat.SetInputNamespace( cstring cstring_1 )</code>|
RegisterForReadyEvents|<code>DOTAChat.RegisterForReadyEvents( boolean boolean_1 )</code>|
BReadyForDisplay|<code>DOTAChat.BReadyForDisplay()</code>|
SetReadyForDisplay|<code>DOTAChat.SetReadyForDisplay( boolean boolean_1 )</code>|
SetPositionInPixels|<code>DOTAChat.SetPositionInPixels( float float_1, float float_2, float float_3 )</code>|
Data|<code>DOTAChat.Data( js_raw_args js_raw_args_1 )</code>|
SetPanelEvent|<code>DOTAChat.SetPanelEvent( js_raw_args js_raw_args_1 )</code>|
RunScriptInPanelContext|<code>DOTAChat.RunScriptInPanelContext( js_raw_args js_raw_args_1 )</code>|
rememberchildfocus|<code>DOTAChat.rememberchildfocus( boolean boolean_1 )</code>|
paneltype|<code>DOTAChat.paneltype()</code>|


# DOTAAvatarImage
Function|Signature|Description
--|--|--
visible|<code>DOTAAvatarImage.visible( boolean boolean_1 )</code>|
enabled|<code>DOTAAvatarImage.enabled( boolean boolean_1 )</code>|
checked|<code>DOTAAvatarImage.checked( boolean boolean_1 )</code>|
defaultfocus|<code>DOTAAvatarImage.defaultfocus( cstring cstring_1 )</code>|
inputnamespace|<code>DOTAAvatarImage.inputnamespace( cstring cstring_1 )</code>|
hittest|<code>DOTAAvatarImage.hittest( boolean boolean_1 )</code>|
hittestchildren|<code>DOTAAvatarImage.hittestchildren( boolean boolean_1 )</code>|
tabindex|<code>DOTAAvatarImage.tabindex( float float_1 )</code>|
selectionpos_x|<code>DOTAAvatarImage.selectionpos_x( float float_1 )</code>|
selectionpos_y|<code>DOTAAvatarImage.selectionpos_y( float float_1 )</code>|
type|<code>DOTAAvatarImage.type()</code>|
id|<code>DOTAAvatarImage.id()</code>|
layoutfile|<code>DOTAAvatarImage.layoutfile()</code>|
contentwidth|<code>DOTAAvatarImage.contentwidth()</code>|
contentheight|<code>DOTAAvatarImage.contentheight()</code>|
desiredlayoutwidth|<code>DOTAAvatarImage.desiredlayoutwidth()</code>|
desiredlayoutheight|<code>DOTAAvatarImage.desiredlayoutheight()</code>|
actuallayoutwidth|<code>DOTAAvatarImage.actuallayoutwidth()</code>|
actuallayoutheight|<code>DOTAAvatarImage.actuallayoutheight()</code>|
actualxoffset|<code>DOTAAvatarImage.actualxoffset()</code>|
actualyoffset|<code>DOTAAvatarImage.actualyoffset()</code>|
scrolloffset_y|<code>DOTAAvatarImage.scrolloffset_y()</code>|
scrolloffset_x|<code>DOTAAvatarImage.scrolloffset_x()</code>|
actualuiscale_y|<code>DOTAAvatarImage.actualuiscale_y()</code>|
actualuiscale_x|<code>DOTAAvatarImage.actualuiscale_x()</code>|
style|<code>DOTAAvatarImage.style()</code>|
AddClass|<code>DOTAAvatarImage.AddClass( cstring cstring_1 )</code>|
RemoveClass|<code>DOTAAvatarImage.RemoveClass( cstring cstring_1 )</code>|
BHasClass|<code>DOTAAvatarImage.BHasClass( cstring cstring_1 )</code>|
BAscendantHasClass|<code>DOTAAvatarImage.BAscendantHasClass( cstring cstring_1 )</code>|
SetHasClass|<code>DOTAAvatarImage.SetHasClass( cstring cstring_1, boolean boolean_2 )</code>|
ToggleClass|<code>DOTAAvatarImage.ToggleClass( cstring cstring_1 )</code>|
SwitchClass|<code>DOTAAvatarImage.SwitchClass( cstring cstring_1, cstring cstring_2 )</code>|
TriggerClass|<code>DOTAAvatarImage.TriggerClass( cstring cstring_1 )</code>|
ClearPanelEvent|<code>DOTAAvatarImage.ClearPanelEvent( cstring cstring_1 )</code>|
SetDraggable|<code>DOTAAvatarImage.SetDraggable( boolean boolean_1 )</code>|
IsDraggable|<code>DOTAAvatarImage.IsDraggable()</code>|
IsSizeValid|<code>DOTAAvatarImage.IsSizeValid()</code>|
GetChildCount|<code>DOTAAvatarImage.GetChildCount()</code>|
GetChild|<code>DOTAAvatarImage.GetChild( integer integer_1 )</code>|
GetChildIndex|<code>DOTAAvatarImage.GetChildIndex( unknown_variant_type unknown_variant_type_1 )</code>|
Children|<code>DOTAAvatarImage.Children()</code>|
FindChildrenWithClassTraverse|<code>DOTAAvatarImage.FindChildrenWithClassTraverse( cstring cstring_1 )</code>|
GetParent|<code>DOTAAvatarImage.GetParent()</code>|
SetParent|<code>DOTAAvatarImage.SetParent( unknown_variant_type unknown_variant_type_1 )</code>|
FindChild|<code>DOTAAvatarImage.FindChild( cstring cstring_1 )</code>|
FindChildTraverse|<code>DOTAAvatarImage.FindChildTraverse( cstring cstring_1 )</code>|
FindChildInLayoutFile|<code>DOTAAvatarImage.FindChildInLayoutFile( cstring cstring_1 )</code>|
FindPanelInLayoutFile|<code>DOTAAvatarImage.FindPanelInLayoutFile( cstring cstring_1 )</code>|
FindAncestor|<code>DOTAAvatarImage.FindAncestor( cstring cstring_1 )</code>|
RemoveAndDeleteChildren|<code>DOTAAvatarImage.RemoveAndDeleteChildren()</code>|
MoveChildBefore|<code>DOTAAvatarImage.MoveChildBefore( unknown_variant_type unknown_variant_type_1, unknown_variant_type unknown_variant_type_2 )</code>|
MoveChildAfter|<code>DOTAAvatarImage.MoveChildAfter( unknown_variant_type unknown_variant_type_1, unknown_variant_type unknown_variant_type_2 )</code>|
GetPositionWithinWindow|<code>DOTAAvatarImage.GetPositionWithinWindow()</code>|
GetPositionWithinAncestor|<code>DOTAAvatarImage.GetPositionWithinAncestor( unknown_variant_type unknown_variant_type_1 )</code>|
ApplyStyles|<code>DOTAAvatarImage.ApplyStyles( boolean boolean_1 )</code>|
ClearPropertyFromCode|<code>DOTAAvatarImage.ClearPropertyFromCode( unknown_variant_type unknown_variant_type_1 )</code>|
DeleteAsync|<code>DOTAAvatarImage.DeleteAsync( float float_1 )</code>|
BIsTransparent|<code>DOTAAvatarImage.BIsTransparent()</code>|
BAcceptsInput|<code>DOTAAvatarImage.BAcceptsInput()</code>|
BAcceptsFocus|<code>DOTAAvatarImage.BAcceptsFocus()</code>|
SetFocus|<code>DOTAAvatarImage.SetFocus()</code>|
UpdateFocusInContext|<code>DOTAAvatarImage.UpdateFocusInContext()</code>|
BHasHoverStyle|<code>DOTAAvatarImage.BHasHoverStyle()</code>|
SetAcceptsFocus|<code>DOTAAvatarImage.SetAcceptsFocus( boolean boolean_1 )</code>|
SetDisableFocusOnMouseDown|<code>DOTAAvatarImage.SetDisableFocusOnMouseDown( boolean boolean_1 )</code>|
BHasKeyFocus|<code>DOTAAvatarImage.BHasKeyFocus()</code>|
SetScrollParentToFitWhenFocused|<code>DOTAAvatarImage.SetScrollParentToFitWhenFocused( boolean boolean_1 )</code>|
BScrollParentToFitWhenFocused|<code>DOTAAvatarImage.BScrollParentToFitWhenFocused()</code>|
IsSelected|<code>DOTAAvatarImage.IsSelected()</code>|
BHasDescendantKeyFocus|<code>DOTAAvatarImage.BHasDescendantKeyFocus()</code>|
BLoadLayout|<code>DOTAAvatarImage.BLoadLayout( cstring cstring_1, boolean boolean_2, boolean boolean_3 )</code>|
BLoadLayoutSnippet|<code>DOTAAvatarImage.BLoadLayoutSnippet( cstring cstring_1 )</code>|
BHasLayoutSnippet|<code>DOTAAvatarImage.BHasLayoutSnippet( cstring cstring_1 )</code>|
SetTopOfInputContext|<code>DOTAAvatarImage.SetTopOfInputContext( boolean boolean_1 )</code>|
SetDialogVariable|<code>DOTAAvatarImage.SetDialogVariable( cstring cstring_1, cstring cstring_2 )</code>|
SetDialogVariableInt|<code>DOTAAvatarImage.SetDialogVariableInt( cstring cstring_1, integer integer_2 )</code>|
SetDialogVariableTime|<code>DOTAAvatarImage.SetDialogVariableTime( cstring cstring_1, int64 int64_2 )</code>|
SetDialogVariableLocString|<code>DOTAAvatarImage.SetDialogVariableLocString( cstring cstring_1, cstring cstring_2 )</code>|
SetDialogVariablePluralLocStringInt|<code>DOTAAvatarImage.SetDialogVariablePluralLocStringInt( cstring cstring_1, cstring cstring_2, int64 int64_3 )</code>|
ScrollToTop|<code>DOTAAvatarImage.ScrollToTop()</code>|
ScrollToBottom|<code>DOTAAvatarImage.ScrollToBottom()</code>|
ScrollToLeftEdge|<code>DOTAAvatarImage.ScrollToLeftEdge()</code>|
ScrollToRightEdge|<code>DOTAAvatarImage.ScrollToRightEdge()</code>|
ScrollParentToMakePanelFit|<code>DOTAAvatarImage.ScrollParentToMakePanelFit( unknown_variant_type unknown_variant_type_1, boolean boolean_2 )</code>|
ScrollToFitRegion|<code>DOTAAvatarImage.ScrollToFitRegion( float float_1, float float_2, float float_3, float float_4, unknown_variant_type unknown_variant_type_5, boolean boolean_6, boolean boolean_7 )</code>|
BCanSeeInParentScroll|<code>DOTAAvatarImage.BCanSeeInParentScroll()</code>|
GetAttributeInt|<code>DOTAAvatarImage.GetAttributeInt( cstring cstring_1, integer integer_2 )</code>|
GetAttributeString|<code>DOTAAvatarImage.GetAttributeString( cstring cstring_1, cstring cstring_2 )</code>|
GetAttributeUInt32|<code>DOTAAvatarImage.GetAttributeUInt32( cstring cstring_1, unsigned unsigned_2 )</code>|
SetAttributeInt|<code>DOTAAvatarImage.SetAttributeInt( cstring cstring_1, integer integer_2 )</code>|
SetAttributeString|<code>DOTAAvatarImage.SetAttributeString( cstring cstring_1, cstring cstring_2 )</code>|
SetAttributeUInt32|<code>DOTAAvatarImage.SetAttributeUInt32( cstring cstring_1, unsigned unsigned_2 )</code>|
SetInputNamespace|<code>DOTAAvatarImage.SetInputNamespace( cstring cstring_1 )</code>|
RegisterForReadyEvents|<code>DOTAAvatarImage.RegisterForReadyEvents( boolean boolean_1 )</code>|
BReadyForDisplay|<code>DOTAAvatarImage.BReadyForDisplay()</code>|
SetReadyForDisplay|<code>DOTAAvatarImage.SetReadyForDisplay( boolean boolean_1 )</code>|
SetPositionInPixels|<code>DOTAAvatarImage.SetPositionInPixels( float float_1, float float_2, float float_3 )</code>|
Data|<code>DOTAAvatarImage.Data( js_raw_args js_raw_args_1 )</code>|
steamid|<code>DOTAAvatarImage.steamid( cstring cstring_1 )</code>|
accountid|<code>DOTAAvatarImage.accountid( cstring cstring_1 )</code>|
SetAccountID|<code>DOTAAvatarImage.SetAccountID( unsigned unsigned_1 )</code>|
SetPanelEvent|<code>DOTAAvatarImage.SetPanelEvent( js_raw_args js_raw_args_1 )</code>|
RunScriptInPanelContext|<code>DOTAAvatarImage.RunScriptInPanelContext( js_raw_args js_raw_args_1 )</code>|
rememberchildfocus|<code>DOTAAvatarImage.rememberchildfocus( boolean boolean_1 )</code>|
paneltype|<code>DOTAAvatarImage.paneltype()</code>|


# CustomUIElement
Function|Signature|Description
--|--|--
visible|<code>CustomUIElement.visible( boolean boolean_1 )</code>|
enabled|<code>CustomUIElement.enabled( boolean boolean_1 )</code>|
checked|<code>CustomUIElement.checked( boolean boolean_1 )</code>|
defaultfocus|<code>CustomUIElement.defaultfocus( cstring cstring_1 )</code>|
inputnamespace|<code>CustomUIElement.inputnamespace( cstring cstring_1 )</code>|
hittest|<code>CustomUIElement.hittest( boolean boolean_1 )</code>|
hittestchildren|<code>CustomUIElement.hittestchildren( boolean boolean_1 )</code>|
tabindex|<code>CustomUIElement.tabindex( float float_1 )</code>|
selectionpos_x|<code>CustomUIElement.selectionpos_x( float float_1 )</code>|
selectionpos_y|<code>CustomUIElement.selectionpos_y( float float_1 )</code>|
type|<code>CustomUIElement.type()</code>|
id|<code>CustomUIElement.id()</code>|
layoutfile|<code>CustomUIElement.layoutfile()</code>|
contentwidth|<code>CustomUIElement.contentwidth()</code>|
contentheight|<code>CustomUIElement.contentheight()</code>|
desiredlayoutwidth|<code>CustomUIElement.desiredlayoutwidth()</code>|
desiredlayoutheight|<code>CustomUIElement.desiredlayoutheight()</code>|
actuallayoutwidth|<code>CustomUIElement.actuallayoutwidth()</code>|
actuallayoutheight|<code>CustomUIElement.actuallayoutheight()</code>|
actualxoffset|<code>CustomUIElement.actualxoffset()</code>|
actualyoffset|<code>CustomUIElement.actualyoffset()</code>|
scrolloffset_y|<code>CustomUIElement.scrolloffset_y()</code>|
scrolloffset_x|<code>CustomUIElement.scrolloffset_x()</code>|
actualuiscale_y|<code>CustomUIElement.actualuiscale_y()</code>|
actualuiscale_x|<code>CustomUIElement.actualuiscale_x()</code>|
style|<code>CustomUIElement.style()</code>|
AddClass|<code>CustomUIElement.AddClass( cstring cstring_1 )</code>|
RemoveClass|<code>CustomUIElement.RemoveClass( cstring cstring_1 )</code>|
BHasClass|<code>CustomUIElement.BHasClass( cstring cstring_1 )</code>|
BAscendantHasClass|<code>CustomUIElement.BAscendantHasClass( cstring cstring_1 )</code>|
SetHasClass|<code>CustomUIElement.SetHasClass( cstring cstring_1, boolean boolean_2 )</code>|
ToggleClass|<code>CustomUIElement.ToggleClass( cstring cstring_1 )</code>|
SwitchClass|<code>CustomUIElement.SwitchClass( cstring cstring_1, cstring cstring_2 )</code>|
TriggerClass|<code>CustomUIElement.TriggerClass( cstring cstring_1 )</code>|
ClearPanelEvent|<code>CustomUIElement.ClearPanelEvent( cstring cstring_1 )</code>|
SetDraggable|<code>CustomUIElement.SetDraggable( boolean boolean_1 )</code>|
IsDraggable|<code>CustomUIElement.IsDraggable()</code>|
IsSizeValid|<code>CustomUIElement.IsSizeValid()</code>|
GetChildCount|<code>CustomUIElement.GetChildCount()</code>|
GetChild|<code>CustomUIElement.GetChild( integer integer_1 )</code>|
GetChildIndex|<code>CustomUIElement.GetChildIndex( unknown_variant_type unknown_variant_type_1 )</code>|
Children|<code>CustomUIElement.Children()</code>|
FindChildrenWithClassTraverse|<code>CustomUIElement.FindChildrenWithClassTraverse( cstring cstring_1 )</code>|
GetParent|<code>CustomUIElement.GetParent()</code>|
SetParent|<code>CustomUIElement.SetParent( unknown_variant_type unknown_variant_type_1 )</code>|
FindChild|<code>CustomUIElement.FindChild( cstring cstring_1 )</code>|
FindChildTraverse|<code>CustomUIElement.FindChildTraverse( cstring cstring_1 )</code>|
FindChildInLayoutFile|<code>CustomUIElement.FindChildInLayoutFile( cstring cstring_1 )</code>|
FindPanelInLayoutFile|<code>CustomUIElement.FindPanelInLayoutFile( cstring cstring_1 )</code>|
FindAncestor|<code>CustomUIElement.FindAncestor( cstring cstring_1 )</code>|
RemoveAndDeleteChildren|<code>CustomUIElement.RemoveAndDeleteChildren()</code>|
MoveChildBefore|<code>CustomUIElement.MoveChildBefore( unknown_variant_type unknown_variant_type_1, unknown_variant_type unknown_variant_type_2 )</code>|
MoveChildAfter|<code>CustomUIElement.MoveChildAfter( unknown_variant_type unknown_variant_type_1, unknown_variant_type unknown_variant_type_2 )</code>|
GetPositionWithinWindow|<code>CustomUIElement.GetPositionWithinWindow()</code>|
GetPositionWithinAncestor|<code>CustomUIElement.GetPositionWithinAncestor( unknown_variant_type unknown_variant_type_1 )</code>|
ApplyStyles|<code>CustomUIElement.ApplyStyles( boolean boolean_1 )</code>|
ClearPropertyFromCode|<code>CustomUIElement.ClearPropertyFromCode( unknown_variant_type unknown_variant_type_1 )</code>|
DeleteAsync|<code>CustomUIElement.DeleteAsync( float float_1 )</code>|
BIsTransparent|<code>CustomUIElement.BIsTransparent()</code>|
BAcceptsInput|<code>CustomUIElement.BAcceptsInput()</code>|
BAcceptsFocus|<code>CustomUIElement.BAcceptsFocus()</code>|
SetFocus|<code>CustomUIElement.SetFocus()</code>|
UpdateFocusInContext|<code>CustomUIElement.UpdateFocusInContext()</code>|
BHasHoverStyle|<code>CustomUIElement.BHasHoverStyle()</code>|
SetAcceptsFocus|<code>CustomUIElement.SetAcceptsFocus( boolean boolean_1 )</code>|
SetDisableFocusOnMouseDown|<code>CustomUIElement.SetDisableFocusOnMouseDown( boolean boolean_1 )</code>|
BHasKeyFocus|<code>CustomUIElement.BHasKeyFocus()</code>|
SetScrollParentToFitWhenFocused|<code>CustomUIElement.SetScrollParentToFitWhenFocused( boolean boolean_1 )</code>|
BScrollParentToFitWhenFocused|<code>CustomUIElement.BScrollParentToFitWhenFocused()</code>|
IsSelected|<code>CustomUIElement.IsSelected()</code>|
BHasDescendantKeyFocus|<code>CustomUIElement.BHasDescendantKeyFocus()</code>|
BLoadLayout|<code>CustomUIElement.BLoadLayout( cstring cstring_1, boolean boolean_2, boolean boolean_3 )</code>|
BLoadLayoutSnippet|<code>CustomUIElement.BLoadLayoutSnippet( cstring cstring_1 )</code>|
BHasLayoutSnippet|<code>CustomUIElement.BHasLayoutSnippet( cstring cstring_1 )</code>|
SetTopOfInputContext|<code>CustomUIElement.SetTopOfInputContext( boolean boolean_1 )</code>|
SetDialogVariable|<code>CustomUIElement.SetDialogVariable( cstring cstring_1, cstring cstring_2 )</code>|
SetDialogVariableInt|<code>CustomUIElement.SetDialogVariableInt( cstring cstring_1, integer integer_2 )</code>|
SetDialogVariableTime|<code>CustomUIElement.SetDialogVariableTime( cstring cstring_1, int64 int64_2 )</code>|
SetDialogVariableLocString|<code>CustomUIElement.SetDialogVariableLocString( cstring cstring_1, cstring cstring_2 )</code>|
SetDialogVariablePluralLocStringInt|<code>CustomUIElement.SetDialogVariablePluralLocStringInt( cstring cstring_1, cstring cstring_2, int64 int64_3 )</code>|
ScrollToTop|<code>CustomUIElement.ScrollToTop()</code>|
ScrollToBottom|<code>CustomUIElement.ScrollToBottom()</code>|
ScrollToLeftEdge|<code>CustomUIElement.ScrollToLeftEdge()</code>|
ScrollToRightEdge|<code>CustomUIElement.ScrollToRightEdge()</code>|
ScrollParentToMakePanelFit|<code>CustomUIElement.ScrollParentToMakePanelFit( unknown_variant_type unknown_variant_type_1, boolean boolean_2 )</code>|
ScrollToFitRegion|<code>CustomUIElement.ScrollToFitRegion( float float_1, float float_2, float float_3, float float_4, unknown_variant_type unknown_variant_type_5, boolean boolean_6, boolean boolean_7 )</code>|
BCanSeeInParentScroll|<code>CustomUIElement.BCanSeeInParentScroll()</code>|
GetAttributeInt|<code>CustomUIElement.GetAttributeInt( cstring cstring_1, integer integer_2 )</code>|
GetAttributeString|<code>CustomUIElement.GetAttributeString( cstring cstring_1, cstring cstring_2 )</code>|
GetAttributeUInt32|<code>CustomUIElement.GetAttributeUInt32( cstring cstring_1, unsigned unsigned_2 )</code>|
SetAttributeInt|<code>CustomUIElement.SetAttributeInt( cstring cstring_1, integer integer_2 )</code>|
SetAttributeString|<code>CustomUIElement.SetAttributeString( cstring cstring_1, cstring cstring_2 )</code>|
SetAttributeUInt32|<code>CustomUIElement.SetAttributeUInt32( cstring cstring_1, unsigned unsigned_2 )</code>|
SetInputNamespace|<code>CustomUIElement.SetInputNamespace( cstring cstring_1 )</code>|
RegisterForReadyEvents|<code>CustomUIElement.RegisterForReadyEvents( boolean boolean_1 )</code>|
BReadyForDisplay|<code>CustomUIElement.BReadyForDisplay()</code>|
SetReadyForDisplay|<code>CustomUIElement.SetReadyForDisplay( boolean boolean_1 )</code>|
SetPositionInPixels|<code>CustomUIElement.SetPositionInPixels( float float_1, float float_2, float float_3 )</code>|
Data|<code>CustomUIElement.Data( js_raw_args js_raw_args_1 )</code>|
SetPanelEvent|<code>CustomUIElement.SetPanelEvent( js_raw_args js_raw_args_1 )</code>|
RunScriptInPanelContext|<code>CustomUIElement.RunScriptInPanelContext( js_raw_args js_raw_args_1 )</code>|
rememberchildfocus|<code>CustomUIElement.rememberchildfocus( boolean boolean_1 )</code>|
paneltype|<code>CustomUIElement.paneltype()</code>|


# DOTACustomUITypeContainer
Function|Signature|Description
--|--|--
visible|<code>DOTACustomUITypeContainer.visible( boolean boolean_1 )</code>|
enabled|<code>DOTACustomUITypeContainer.enabled( boolean boolean_1 )</code>|
checked|<code>DOTACustomUITypeContainer.checked( boolean boolean_1 )</code>|
defaultfocus|<code>DOTACustomUITypeContainer.defaultfocus( cstring cstring_1 )</code>|
inputnamespace|<code>DOTACustomUITypeContainer.inputnamespace( cstring cstring_1 )</code>|
hittest|<code>DOTACustomUITypeContainer.hittest( boolean boolean_1 )</code>|
hittestchildren|<code>DOTACustomUITypeContainer.hittestchildren( boolean boolean_1 )</code>|
tabindex|<code>DOTACustomUITypeContainer.tabindex( float float_1 )</code>|
selectionpos_x|<code>DOTACustomUITypeContainer.selectionpos_x( float float_1 )</code>|
selectionpos_y|<code>DOTACustomUITypeContainer.selectionpos_y( float float_1 )</code>|
type|<code>DOTACustomUITypeContainer.type()</code>|
id|<code>DOTACustomUITypeContainer.id()</code>|
layoutfile|<code>DOTACustomUITypeContainer.layoutfile()</code>|
contentwidth|<code>DOTACustomUITypeContainer.contentwidth()</code>|
contentheight|<code>DOTACustomUITypeContainer.contentheight()</code>|
desiredlayoutwidth|<code>DOTACustomUITypeContainer.desiredlayoutwidth()</code>|
desiredlayoutheight|<code>DOTACustomUITypeContainer.desiredlayoutheight()</code>|
actuallayoutwidth|<code>DOTACustomUITypeContainer.actuallayoutwidth()</code>|
actuallayoutheight|<code>DOTACustomUITypeContainer.actuallayoutheight()</code>|
actualxoffset|<code>DOTACustomUITypeContainer.actualxoffset()</code>|
actualyoffset|<code>DOTACustomUITypeContainer.actualyoffset()</code>|
scrolloffset_y|<code>DOTACustomUITypeContainer.scrolloffset_y()</code>|
scrolloffset_x|<code>DOTACustomUITypeContainer.scrolloffset_x()</code>|
actualuiscale_y|<code>DOTACustomUITypeContainer.actualuiscale_y()</code>|
actualuiscale_x|<code>DOTACustomUITypeContainer.actualuiscale_x()</code>|
style|<code>DOTACustomUITypeContainer.style()</code>|
AddClass|<code>DOTACustomUITypeContainer.AddClass( cstring cstring_1 )</code>|
RemoveClass|<code>DOTACustomUITypeContainer.RemoveClass( cstring cstring_1 )</code>|
BHasClass|<code>DOTACustomUITypeContainer.BHasClass( cstring cstring_1 )</code>|
BAscendantHasClass|<code>DOTACustomUITypeContainer.BAscendantHasClass( cstring cstring_1 )</code>|
SetHasClass|<code>DOTACustomUITypeContainer.SetHasClass( cstring cstring_1, boolean boolean_2 )</code>|
ToggleClass|<code>DOTACustomUITypeContainer.ToggleClass( cstring cstring_1 )</code>|
SwitchClass|<code>DOTACustomUITypeContainer.SwitchClass( cstring cstring_1, cstring cstring_2 )</code>|
TriggerClass|<code>DOTACustomUITypeContainer.TriggerClass( cstring cstring_1 )</code>|
ClearPanelEvent|<code>DOTACustomUITypeContainer.ClearPanelEvent( cstring cstring_1 )</code>|
SetDraggable|<code>DOTACustomUITypeContainer.SetDraggable( boolean boolean_1 )</code>|
IsDraggable|<code>DOTACustomUITypeContainer.IsDraggable()</code>|
IsSizeValid|<code>DOTACustomUITypeContainer.IsSizeValid()</code>|
GetChildCount|<code>DOTACustomUITypeContainer.GetChildCount()</code>|
GetChild|<code>DOTACustomUITypeContainer.GetChild( integer integer_1 )</code>|
GetChildIndex|<code>DOTACustomUITypeContainer.GetChildIndex( unknown_variant_type unknown_variant_type_1 )</code>|
Children|<code>DOTACustomUITypeContainer.Children()</code>|
FindChildrenWithClassTraverse|<code>DOTACustomUITypeContainer.FindChildrenWithClassTraverse( cstring cstring_1 )</code>|
GetParent|<code>DOTACustomUITypeContainer.GetParent()</code>|
SetParent|<code>DOTACustomUITypeContainer.SetParent( unknown_variant_type unknown_variant_type_1 )</code>|
FindChild|<code>DOTACustomUITypeContainer.FindChild( cstring cstring_1 )</code>|
FindChildTraverse|<code>DOTACustomUITypeContainer.FindChildTraverse( cstring cstring_1 )</code>|
FindChildInLayoutFile|<code>DOTACustomUITypeContainer.FindChildInLayoutFile( cstring cstring_1 )</code>|
FindPanelInLayoutFile|<code>DOTACustomUITypeContainer.FindPanelInLayoutFile( cstring cstring_1 )</code>|
FindAncestor|<code>DOTACustomUITypeContainer.FindAncestor( cstring cstring_1 )</code>|
RemoveAndDeleteChildren|<code>DOTACustomUITypeContainer.RemoveAndDeleteChildren()</code>|
MoveChildBefore|<code>DOTACustomUITypeContainer.MoveChildBefore( unknown_variant_type unknown_variant_type_1, unknown_variant_type unknown_variant_type_2 )</code>|
MoveChildAfter|<code>DOTACustomUITypeContainer.MoveChildAfter( unknown_variant_type unknown_variant_type_1, unknown_variant_type unknown_variant_type_2 )</code>|
GetPositionWithinWindow|<code>DOTACustomUITypeContainer.GetPositionWithinWindow()</code>|
GetPositionWithinAncestor|<code>DOTACustomUITypeContainer.GetPositionWithinAncestor( unknown_variant_type unknown_variant_type_1 )</code>|
ApplyStyles|<code>DOTACustomUITypeContainer.ApplyStyles( boolean boolean_1 )</code>|
ClearPropertyFromCode|<code>DOTACustomUITypeContainer.ClearPropertyFromCode( unknown_variant_type unknown_variant_type_1 )</code>|
DeleteAsync|<code>DOTACustomUITypeContainer.DeleteAsync( float float_1 )</code>|
BIsTransparent|<code>DOTACustomUITypeContainer.BIsTransparent()</code>|
BAcceptsInput|<code>DOTACustomUITypeContainer.BAcceptsInput()</code>|
BAcceptsFocus|<code>DOTACustomUITypeContainer.BAcceptsFocus()</code>|
SetFocus|<code>DOTACustomUITypeContainer.SetFocus()</code>|
UpdateFocusInContext|<code>DOTACustomUITypeContainer.UpdateFocusInContext()</code>|
BHasHoverStyle|<code>DOTACustomUITypeContainer.BHasHoverStyle()</code>|
SetAcceptsFocus|<code>DOTACustomUITypeContainer.SetAcceptsFocus( boolean boolean_1 )</code>|
SetDisableFocusOnMouseDown|<code>DOTACustomUITypeContainer.SetDisableFocusOnMouseDown( boolean boolean_1 )</code>|
BHasKeyFocus|<code>DOTACustomUITypeContainer.BHasKeyFocus()</code>|
SetScrollParentToFitWhenFocused|<code>DOTACustomUITypeContainer.SetScrollParentToFitWhenFocused( boolean boolean_1 )</code>|
BScrollParentToFitWhenFocused|<code>DOTACustomUITypeContainer.BScrollParentToFitWhenFocused()</code>|
IsSelected|<code>DOTACustomUITypeContainer.IsSelected()</code>|
BHasDescendantKeyFocus|<code>DOTACustomUITypeContainer.BHasDescendantKeyFocus()</code>|
BLoadLayout|<code>DOTACustomUITypeContainer.BLoadLayout( cstring cstring_1, boolean boolean_2, boolean boolean_3 )</code>|
BLoadLayoutSnippet|<code>DOTACustomUITypeContainer.BLoadLayoutSnippet( cstring cstring_1 )</code>|
BHasLayoutSnippet|<code>DOTACustomUITypeContainer.BHasLayoutSnippet( cstring cstring_1 )</code>|
SetTopOfInputContext|<code>DOTACustomUITypeContainer.SetTopOfInputContext( boolean boolean_1 )</code>|
SetDialogVariable|<code>DOTACustomUITypeContainer.SetDialogVariable( cstring cstring_1, cstring cstring_2 )</code>|
SetDialogVariableInt|<code>DOTACustomUITypeContainer.SetDialogVariableInt( cstring cstring_1, integer integer_2 )</code>|
SetDialogVariableTime|<code>DOTACustomUITypeContainer.SetDialogVariableTime( cstring cstring_1, int64 int64_2 )</code>|
SetDialogVariableLocString|<code>DOTACustomUITypeContainer.SetDialogVariableLocString( cstring cstring_1, cstring cstring_2 )</code>|
SetDialogVariablePluralLocStringInt|<code>DOTACustomUITypeContainer.SetDialogVariablePluralLocStringInt( cstring cstring_1, cstring cstring_2, int64 int64_3 )</code>|
ScrollToTop|<code>DOTACustomUITypeContainer.ScrollToTop()</code>|
ScrollToBottom|<code>DOTACustomUITypeContainer.ScrollToBottom()</code>|
ScrollToLeftEdge|<code>DOTACustomUITypeContainer.ScrollToLeftEdge()</code>|
ScrollToRightEdge|<code>DOTACustomUITypeContainer.ScrollToRightEdge()</code>|
ScrollParentToMakePanelFit|<code>DOTACustomUITypeContainer.ScrollParentToMakePanelFit( unknown_variant_type unknown_variant_type_1, boolean boolean_2 )</code>|
ScrollToFitRegion|<code>DOTACustomUITypeContainer.ScrollToFitRegion( float float_1, float float_2, float float_3, float float_4, unknown_variant_type unknown_variant_type_5, boolean boolean_6, boolean boolean_7 )</code>|
BCanSeeInParentScroll|<code>DOTACustomUITypeContainer.BCanSeeInParentScroll()</code>|
GetAttributeInt|<code>DOTACustomUITypeContainer.GetAttributeInt( cstring cstring_1, integer integer_2 )</code>|
GetAttributeString|<code>DOTACustomUITypeContainer.GetAttributeString( cstring cstring_1, cstring cstring_2 )</code>|
GetAttributeUInt32|<code>DOTACustomUITypeContainer.GetAttributeUInt32( cstring cstring_1, unsigned unsigned_2 )</code>|
SetAttributeInt|<code>DOTACustomUITypeContainer.SetAttributeInt( cstring cstring_1, integer integer_2 )</code>|
SetAttributeString|<code>DOTACustomUITypeContainer.SetAttributeString( cstring cstring_1, cstring cstring_2 )</code>|
SetAttributeUInt32|<code>DOTACustomUITypeContainer.SetAttributeUInt32( cstring cstring_1, unsigned unsigned_2 )</code>|
SetInputNamespace|<code>DOTACustomUITypeContainer.SetInputNamespace( cstring cstring_1 )</code>|
RegisterForReadyEvents|<code>DOTACustomUITypeContainer.RegisterForReadyEvents( boolean boolean_1 )</code>|
BReadyForDisplay|<code>DOTACustomUITypeContainer.BReadyForDisplay()</code>|
SetReadyForDisplay|<code>DOTACustomUITypeContainer.SetReadyForDisplay( boolean boolean_1 )</code>|
SetPositionInPixels|<code>DOTACustomUITypeContainer.SetPositionInPixels( float float_1, float float_2, float float_3 )</code>|
Data|<code>DOTACustomUITypeContainer.Data( js_raw_args js_raw_args_1 )</code>|
SetPanelEvent|<code>DOTACustomUITypeContainer.SetPanelEvent( js_raw_args js_raw_args_1 )</code>|
RunScriptInPanelContext|<code>DOTACustomUITypeContainer.RunScriptInPanelContext( js_raw_args js_raw_args_1 )</code>|
rememberchildfocus|<code>DOTACustomUITypeContainer.rememberchildfocus( boolean boolean_1 )</code>|
paneltype|<code>DOTACustomUITypeContainer.paneltype()</code>|


# ToastManager
Function|Signature|Description
--|--|--
visible|<code>ToastManager.visible( boolean boolean_1 )</code>|
enabled|<code>ToastManager.enabled( boolean boolean_1 )</code>|
checked|<code>ToastManager.checked( boolean boolean_1 )</code>|
defaultfocus|<code>ToastManager.defaultfocus( cstring cstring_1 )</code>|
inputnamespace|<code>ToastManager.inputnamespace( cstring cstring_1 )</code>|
hittest|<code>ToastManager.hittest( boolean boolean_1 )</code>|
hittestchildren|<code>ToastManager.hittestchildren( boolean boolean_1 )</code>|
tabindex|<code>ToastManager.tabindex( float float_1 )</code>|
selectionpos_x|<code>ToastManager.selectionpos_x( float float_1 )</code>|
selectionpos_y|<code>ToastManager.selectionpos_y( float float_1 )</code>|
type|<code>ToastManager.type()</code>|
id|<code>ToastManager.id()</code>|
layoutfile|<code>ToastManager.layoutfile()</code>|
contentwidth|<code>ToastManager.contentwidth()</code>|
contentheight|<code>ToastManager.contentheight()</code>|
desiredlayoutwidth|<code>ToastManager.desiredlayoutwidth()</code>|
desiredlayoutheight|<code>ToastManager.desiredlayoutheight()</code>|
actuallayoutwidth|<code>ToastManager.actuallayoutwidth()</code>|
actuallayoutheight|<code>ToastManager.actuallayoutheight()</code>|
actualxoffset|<code>ToastManager.actualxoffset()</code>|
actualyoffset|<code>ToastManager.actualyoffset()</code>|
scrolloffset_y|<code>ToastManager.scrolloffset_y()</code>|
scrolloffset_x|<code>ToastManager.scrolloffset_x()</code>|
actualuiscale_y|<code>ToastManager.actualuiscale_y()</code>|
actualuiscale_x|<code>ToastManager.actualuiscale_x()</code>|
style|<code>ToastManager.style()</code>|
AddClass|<code>ToastManager.AddClass( cstring cstring_1 )</code>|
RemoveClass|<code>ToastManager.RemoveClass( cstring cstring_1 )</code>|
BHasClass|<code>ToastManager.BHasClass( cstring cstring_1 )</code>|
BAscendantHasClass|<code>ToastManager.BAscendantHasClass( cstring cstring_1 )</code>|
SetHasClass|<code>ToastManager.SetHasClass( cstring cstring_1, boolean boolean_2 )</code>|
ToggleClass|<code>ToastManager.ToggleClass( cstring cstring_1 )</code>|
SwitchClass|<code>ToastManager.SwitchClass( cstring cstring_1, cstring cstring_2 )</code>|
TriggerClass|<code>ToastManager.TriggerClass( cstring cstring_1 )</code>|
ClearPanelEvent|<code>ToastManager.ClearPanelEvent( cstring cstring_1 )</code>|
SetDraggable|<code>ToastManager.SetDraggable( boolean boolean_1 )</code>|
IsDraggable|<code>ToastManager.IsDraggable()</code>|
IsSizeValid|<code>ToastManager.IsSizeValid()</code>|
GetChildCount|<code>ToastManager.GetChildCount()</code>|
GetChild|<code>ToastManager.GetChild( integer integer_1 )</code>|
GetChildIndex|<code>ToastManager.GetChildIndex( unknown_variant_type unknown_variant_type_1 )</code>|
Children|<code>ToastManager.Children()</code>|
FindChildrenWithClassTraverse|<code>ToastManager.FindChildrenWithClassTraverse( cstring cstring_1 )</code>|
GetParent|<code>ToastManager.GetParent()</code>|
SetParent|<code>ToastManager.SetParent( unknown_variant_type unknown_variant_type_1 )</code>|
FindChild|<code>ToastManager.FindChild( cstring cstring_1 )</code>|
FindChildTraverse|<code>ToastManager.FindChildTraverse( cstring cstring_1 )</code>|
FindChildInLayoutFile|<code>ToastManager.FindChildInLayoutFile( cstring cstring_1 )</code>|
FindPanelInLayoutFile|<code>ToastManager.FindPanelInLayoutFile( cstring cstring_1 )</code>|
FindAncestor|<code>ToastManager.FindAncestor( cstring cstring_1 )</code>|
RemoveAndDeleteChildren|<code>ToastManager.RemoveAndDeleteChildren()</code>|
MoveChildBefore|<code>ToastManager.MoveChildBefore( unknown_variant_type unknown_variant_type_1, unknown_variant_type unknown_variant_type_2 )</code>|
MoveChildAfter|<code>ToastManager.MoveChildAfter( unknown_variant_type unknown_variant_type_1, unknown_variant_type unknown_variant_type_2 )</code>|
GetPositionWithinWindow|<code>ToastManager.GetPositionWithinWindow()</code>|
GetPositionWithinAncestor|<code>ToastManager.GetPositionWithinAncestor( unknown_variant_type unknown_variant_type_1 )</code>|
ApplyStyles|<code>ToastManager.ApplyStyles( boolean boolean_1 )</code>|
ClearPropertyFromCode|<code>ToastManager.ClearPropertyFromCode( unknown_variant_type unknown_variant_type_1 )</code>|
DeleteAsync|<code>ToastManager.DeleteAsync( float float_1 )</code>|
BIsTransparent|<code>ToastManager.BIsTransparent()</code>|
BAcceptsInput|<code>ToastManager.BAcceptsInput()</code>|
BAcceptsFocus|<code>ToastManager.BAcceptsFocus()</code>|
SetFocus|<code>ToastManager.SetFocus()</code>|
UpdateFocusInContext|<code>ToastManager.UpdateFocusInContext()</code>|
BHasHoverStyle|<code>ToastManager.BHasHoverStyle()</code>|
SetAcceptsFocus|<code>ToastManager.SetAcceptsFocus( boolean boolean_1 )</code>|
SetDisableFocusOnMouseDown|<code>ToastManager.SetDisableFocusOnMouseDown( boolean boolean_1 )</code>|
BHasKeyFocus|<code>ToastManager.BHasKeyFocus()</code>|
SetScrollParentToFitWhenFocused|<code>ToastManager.SetScrollParentToFitWhenFocused( boolean boolean_1 )</code>|
BScrollParentToFitWhenFocused|<code>ToastManager.BScrollParentToFitWhenFocused()</code>|
IsSelected|<code>ToastManager.IsSelected()</code>|
BHasDescendantKeyFocus|<code>ToastManager.BHasDescendantKeyFocus()</code>|
BLoadLayout|<code>ToastManager.BLoadLayout( cstring cstring_1, boolean boolean_2, boolean boolean_3 )</code>|
BLoadLayoutSnippet|<code>ToastManager.BLoadLayoutSnippet( cstring cstring_1 )</code>|
BHasLayoutSnippet|<code>ToastManager.BHasLayoutSnippet( cstring cstring_1 )</code>|
SetTopOfInputContext|<code>ToastManager.SetTopOfInputContext( boolean boolean_1 )</code>|
SetDialogVariable|<code>ToastManager.SetDialogVariable( cstring cstring_1, cstring cstring_2 )</code>|
SetDialogVariableInt|<code>ToastManager.SetDialogVariableInt( cstring cstring_1, integer integer_2 )</code>|
SetDialogVariableTime|<code>ToastManager.SetDialogVariableTime( cstring cstring_1, int64 int64_2 )</code>|
SetDialogVariableLocString|<code>ToastManager.SetDialogVariableLocString( cstring cstring_1, cstring cstring_2 )</code>|
SetDialogVariablePluralLocStringInt|<code>ToastManager.SetDialogVariablePluralLocStringInt( cstring cstring_1, cstring cstring_2, int64 int64_3 )</code>|
ScrollToTop|<code>ToastManager.ScrollToTop()</code>|
ScrollToBottom|<code>ToastManager.ScrollToBottom()</code>|
ScrollToLeftEdge|<code>ToastManager.ScrollToLeftEdge()</code>|
ScrollToRightEdge|<code>ToastManager.ScrollToRightEdge()</code>|
ScrollParentToMakePanelFit|<code>ToastManager.ScrollParentToMakePanelFit( unknown_variant_type unknown_variant_type_1, boolean boolean_2 )</code>|
ScrollToFitRegion|<code>ToastManager.ScrollToFitRegion( float float_1, float float_2, float float_3, float float_4, unknown_variant_type unknown_variant_type_5, boolean boolean_6, boolean boolean_7 )</code>|
BCanSeeInParentScroll|<code>ToastManager.BCanSeeInParentScroll()</code>|
GetAttributeInt|<code>ToastManager.GetAttributeInt( cstring cstring_1, integer integer_2 )</code>|
GetAttributeString|<code>ToastManager.GetAttributeString( cstring cstring_1, cstring cstring_2 )</code>|
GetAttributeUInt32|<code>ToastManager.GetAttributeUInt32( cstring cstring_1, unsigned unsigned_2 )</code>|
SetAttributeInt|<code>ToastManager.SetAttributeInt( cstring cstring_1, integer integer_2 )</code>|
SetAttributeString|<code>ToastManager.SetAttributeString( cstring cstring_1, cstring cstring_2 )</code>|
SetAttributeUInt32|<code>ToastManager.SetAttributeUInt32( cstring cstring_1, unsigned unsigned_2 )</code>|
SetInputNamespace|<code>ToastManager.SetInputNamespace( cstring cstring_1 )</code>|
RegisterForReadyEvents|<code>ToastManager.RegisterForReadyEvents( boolean boolean_1 )</code>|
BReadyForDisplay|<code>ToastManager.BReadyForDisplay()</code>|
SetReadyForDisplay|<code>ToastManager.SetReadyForDisplay( boolean boolean_1 )</code>|
SetPositionInPixels|<code>ToastManager.SetPositionInPixels( float float_1, float float_2, float float_3 )</code>|
Data|<code>ToastManager.Data( js_raw_args js_raw_args_1 )</code>|
QueueToast|<code>ToastManager.QueueToast( unknown_variant_type unknown_variant_type_1 )</code>|
RemoveToast|<code>ToastManager.RemoveToast( unknown_variant_type unknown_variant_type_1 )</code>|
SetPanelEvent|<code>ToastManager.SetPanelEvent( js_raw_args js_raw_args_1 )</code>|
RunScriptInPanelContext|<code>ToastManager.RunScriptInPanelContext( js_raw_args js_raw_args_1 )</code>|
rememberchildfocus|<code>ToastManager.rememberchildfocus( boolean boolean_1 )</code>|
paneltype|<code>ToastManager.paneltype()</code>|


# DOTACombatEvents
Function|Signature|Description
--|--|--
visible|<code>DOTACombatEvents.visible( boolean boolean_1 )</code>|
enabled|<code>DOTACombatEvents.enabled( boolean boolean_1 )</code>|
checked|<code>DOTACombatEvents.checked( boolean boolean_1 )</code>|
defaultfocus|<code>DOTACombatEvents.defaultfocus( cstring cstring_1 )</code>|
inputnamespace|<code>DOTACombatEvents.inputnamespace( cstring cstring_1 )</code>|
hittest|<code>DOTACombatEvents.hittest( boolean boolean_1 )</code>|
hittestchildren|<code>DOTACombatEvents.hittestchildren( boolean boolean_1 )</code>|
tabindex|<code>DOTACombatEvents.tabindex( float float_1 )</code>|
selectionpos_x|<code>DOTACombatEvents.selectionpos_x( float float_1 )</code>|
selectionpos_y|<code>DOTACombatEvents.selectionpos_y( float float_1 )</code>|
type|<code>DOTACombatEvents.type()</code>|
id|<code>DOTACombatEvents.id()</code>|
layoutfile|<code>DOTACombatEvents.layoutfile()</code>|
contentwidth|<code>DOTACombatEvents.contentwidth()</code>|
contentheight|<code>DOTACombatEvents.contentheight()</code>|
desiredlayoutwidth|<code>DOTACombatEvents.desiredlayoutwidth()</code>|
desiredlayoutheight|<code>DOTACombatEvents.desiredlayoutheight()</code>|
actuallayoutwidth|<code>DOTACombatEvents.actuallayoutwidth()</code>|
actuallayoutheight|<code>DOTACombatEvents.actuallayoutheight()</code>|
actualxoffset|<code>DOTACombatEvents.actualxoffset()</code>|
actualyoffset|<code>DOTACombatEvents.actualyoffset()</code>|
scrolloffset_y|<code>DOTACombatEvents.scrolloffset_y()</code>|
scrolloffset_x|<code>DOTACombatEvents.scrolloffset_x()</code>|
actualuiscale_y|<code>DOTACombatEvents.actualuiscale_y()</code>|
actualuiscale_x|<code>DOTACombatEvents.actualuiscale_x()</code>|
style|<code>DOTACombatEvents.style()</code>|
AddClass|<code>DOTACombatEvents.AddClass( cstring cstring_1 )</code>|
RemoveClass|<code>DOTACombatEvents.RemoveClass( cstring cstring_1 )</code>|
BHasClass|<code>DOTACombatEvents.BHasClass( cstring cstring_1 )</code>|
BAscendantHasClass|<code>DOTACombatEvents.BAscendantHasClass( cstring cstring_1 )</code>|
SetHasClass|<code>DOTACombatEvents.SetHasClass( cstring cstring_1, boolean boolean_2 )</code>|
ToggleClass|<code>DOTACombatEvents.ToggleClass( cstring cstring_1 )</code>|
SwitchClass|<code>DOTACombatEvents.SwitchClass( cstring cstring_1, cstring cstring_2 )</code>|
TriggerClass|<code>DOTACombatEvents.TriggerClass( cstring cstring_1 )</code>|
ClearPanelEvent|<code>DOTACombatEvents.ClearPanelEvent( cstring cstring_1 )</code>|
SetDraggable|<code>DOTACombatEvents.SetDraggable( boolean boolean_1 )</code>|
IsDraggable|<code>DOTACombatEvents.IsDraggable()</code>|
IsSizeValid|<code>DOTACombatEvents.IsSizeValid()</code>|
GetChildCount|<code>DOTACombatEvents.GetChildCount()</code>|
GetChild|<code>DOTACombatEvents.GetChild( integer integer_1 )</code>|
GetChildIndex|<code>DOTACombatEvents.GetChildIndex( unknown_variant_type unknown_variant_type_1 )</code>|
Children|<code>DOTACombatEvents.Children()</code>|
FindChildrenWithClassTraverse|<code>DOTACombatEvents.FindChildrenWithClassTraverse( cstring cstring_1 )</code>|
GetParent|<code>DOTACombatEvents.GetParent()</code>|
SetParent|<code>DOTACombatEvents.SetParent( unknown_variant_type unknown_variant_type_1 )</code>|
FindChild|<code>DOTACombatEvents.FindChild( cstring cstring_1 )</code>|
FindChildTraverse|<code>DOTACombatEvents.FindChildTraverse( cstring cstring_1 )</code>|
FindChildInLayoutFile|<code>DOTACombatEvents.FindChildInLayoutFile( cstring cstring_1 )</code>|
FindPanelInLayoutFile|<code>DOTACombatEvents.FindPanelInLayoutFile( cstring cstring_1 )</code>|
FindAncestor|<code>DOTACombatEvents.FindAncestor( cstring cstring_1 )</code>|
RemoveAndDeleteChildren|<code>DOTACombatEvents.RemoveAndDeleteChildren()</code>|
MoveChildBefore|<code>DOTACombatEvents.MoveChildBefore( unknown_variant_type unknown_variant_type_1, unknown_variant_type unknown_variant_type_2 )</code>|
MoveChildAfter|<code>DOTACombatEvents.MoveChildAfter( unknown_variant_type unknown_variant_type_1, unknown_variant_type unknown_variant_type_2 )</code>|
GetPositionWithinWindow|<code>DOTACombatEvents.GetPositionWithinWindow()</code>|
GetPositionWithinAncestor|<code>DOTACombatEvents.GetPositionWithinAncestor( unknown_variant_type unknown_variant_type_1 )</code>|
ApplyStyles|<code>DOTACombatEvents.ApplyStyles( boolean boolean_1 )</code>|
ClearPropertyFromCode|<code>DOTACombatEvents.ClearPropertyFromCode( unknown_variant_type unknown_variant_type_1 )</code>|
DeleteAsync|<code>DOTACombatEvents.DeleteAsync( float float_1 )</code>|
BIsTransparent|<code>DOTACombatEvents.BIsTransparent()</code>|
BAcceptsInput|<code>DOTACombatEvents.BAcceptsInput()</code>|
BAcceptsFocus|<code>DOTACombatEvents.BAcceptsFocus()</code>|
SetFocus|<code>DOTACombatEvents.SetFocus()</code>|
UpdateFocusInContext|<code>DOTACombatEvents.UpdateFocusInContext()</code>|
BHasHoverStyle|<code>DOTACombatEvents.BHasHoverStyle()</code>|
SetAcceptsFocus|<code>DOTACombatEvents.SetAcceptsFocus( boolean boolean_1 )</code>|
SetDisableFocusOnMouseDown|<code>DOTACombatEvents.SetDisableFocusOnMouseDown( boolean boolean_1 )</code>|
BHasKeyFocus|<code>DOTACombatEvents.BHasKeyFocus()</code>|
SetScrollParentToFitWhenFocused|<code>DOTACombatEvents.SetScrollParentToFitWhenFocused( boolean boolean_1 )</code>|
BScrollParentToFitWhenFocused|<code>DOTACombatEvents.BScrollParentToFitWhenFocused()</code>|
IsSelected|<code>DOTACombatEvents.IsSelected()</code>|
BHasDescendantKeyFocus|<code>DOTACombatEvents.BHasDescendantKeyFocus()</code>|
BLoadLayout|<code>DOTACombatEvents.BLoadLayout( cstring cstring_1, boolean boolean_2, boolean boolean_3 )</code>|
BLoadLayoutSnippet|<code>DOTACombatEvents.BLoadLayoutSnippet( cstring cstring_1 )</code>|
BHasLayoutSnippet|<code>DOTACombatEvents.BHasLayoutSnippet( cstring cstring_1 )</code>|
SetTopOfInputContext|<code>DOTACombatEvents.SetTopOfInputContext( boolean boolean_1 )</code>|
SetDialogVariable|<code>DOTACombatEvents.SetDialogVariable( cstring cstring_1, cstring cstring_2 )</code>|
SetDialogVariableInt|<code>DOTACombatEvents.SetDialogVariableInt( cstring cstring_1, integer integer_2 )</code>|
SetDialogVariableTime|<code>DOTACombatEvents.SetDialogVariableTime( cstring cstring_1, int64 int64_2 )</code>|
SetDialogVariableLocString|<code>DOTACombatEvents.SetDialogVariableLocString( cstring cstring_1, cstring cstring_2 )</code>|
SetDialogVariablePluralLocStringInt|<code>DOTACombatEvents.SetDialogVariablePluralLocStringInt( cstring cstring_1, cstring cstring_2, int64 int64_3 )</code>|
ScrollToTop|<code>DOTACombatEvents.ScrollToTop()</code>|
ScrollToBottom|<code>DOTACombatEvents.ScrollToBottom()</code>|
ScrollToLeftEdge|<code>DOTACombatEvents.ScrollToLeftEdge()</code>|
ScrollToRightEdge|<code>DOTACombatEvents.ScrollToRightEdge()</code>|
ScrollParentToMakePanelFit|<code>DOTACombatEvents.ScrollParentToMakePanelFit( unknown_variant_type unknown_variant_type_1, boolean boolean_2 )</code>|
ScrollToFitRegion|<code>DOTACombatEvents.ScrollToFitRegion( float float_1, float float_2, float float_3, float float_4, unknown_variant_type unknown_variant_type_5, boolean boolean_6, boolean boolean_7 )</code>|
BCanSeeInParentScroll|<code>DOTACombatEvents.BCanSeeInParentScroll()</code>|
GetAttributeInt|<code>DOTACombatEvents.GetAttributeInt( cstring cstring_1, integer integer_2 )</code>|
GetAttributeString|<code>DOTACombatEvents.GetAttributeString( cstring cstring_1, cstring cstring_2 )</code>|
GetAttributeUInt32|<code>DOTACombatEvents.GetAttributeUInt32( cstring cstring_1, unsigned unsigned_2 )</code>|
SetAttributeInt|<code>DOTACombatEvents.SetAttributeInt( cstring cstring_1, integer integer_2 )</code>|
SetAttributeString|<code>DOTACombatEvents.SetAttributeString( cstring cstring_1, cstring cstring_2 )</code>|
SetAttributeUInt32|<code>DOTACombatEvents.SetAttributeUInt32( cstring cstring_1, unsigned unsigned_2 )</code>|
SetInputNamespace|<code>DOTACombatEvents.SetInputNamespace( cstring cstring_1 )</code>|
RegisterForReadyEvents|<code>DOTACombatEvents.RegisterForReadyEvents( boolean boolean_1 )</code>|
BReadyForDisplay|<code>DOTACombatEvents.BReadyForDisplay()</code>|
SetReadyForDisplay|<code>DOTACombatEvents.SetReadyForDisplay( boolean boolean_1 )</code>|
SetPositionInPixels|<code>DOTACombatEvents.SetPositionInPixels( float float_1, float float_2, float float_3 )</code>|
Data|<code>DOTACombatEvents.Data( js_raw_args js_raw_args_1 )</code>|
SetPanelEvent|<code>DOTACombatEvents.SetPanelEvent( js_raw_args js_raw_args_1 )</code>|
RunScriptInPanelContext|<code>DOTACombatEvents.RunScriptInPanelContext( js_raw_args js_raw_args_1 )</code>|
rememberchildfocus|<code>DOTACombatEvents.rememberchildfocus( boolean boolean_1 )</code>|
paneltype|<code>DOTACombatEvents.paneltype()</code>|


# TextButton
Function|Signature|Description
--|--|--
visible|<code>TextButton.visible( boolean boolean_1 )</code>|
enabled|<code>TextButton.enabled( boolean boolean_1 )</code>|
checked|<code>TextButton.checked( boolean boolean_1 )</code>|
defaultfocus|<code>TextButton.defaultfocus( cstring cstring_1 )</code>|
inputnamespace|<code>TextButton.inputnamespace( cstring cstring_1 )</code>|
hittest|<code>TextButton.hittest( boolean boolean_1 )</code>|
hittestchildren|<code>TextButton.hittestchildren( boolean boolean_1 )</code>|
tabindex|<code>TextButton.tabindex( float float_1 )</code>|
selectionpos_x|<code>TextButton.selectionpos_x( float float_1 )</code>|
selectionpos_y|<code>TextButton.selectionpos_y( float float_1 )</code>|
type|<code>TextButton.type()</code>|
id|<code>TextButton.id()</code>|
layoutfile|<code>TextButton.layoutfile()</code>|
contentwidth|<code>TextButton.contentwidth()</code>|
contentheight|<code>TextButton.contentheight()</code>|
desiredlayoutwidth|<code>TextButton.desiredlayoutwidth()</code>|
desiredlayoutheight|<code>TextButton.desiredlayoutheight()</code>|
actuallayoutwidth|<code>TextButton.actuallayoutwidth()</code>|
actuallayoutheight|<code>TextButton.actuallayoutheight()</code>|
actualxoffset|<code>TextButton.actualxoffset()</code>|
actualyoffset|<code>TextButton.actualyoffset()</code>|
scrolloffset_y|<code>TextButton.scrolloffset_y()</code>|
scrolloffset_x|<code>TextButton.scrolloffset_x()</code>|
actualuiscale_y|<code>TextButton.actualuiscale_y()</code>|
actualuiscale_x|<code>TextButton.actualuiscale_x()</code>|
style|<code>TextButton.style()</code>|
AddClass|<code>TextButton.AddClass( cstring cstring_1 )</code>|
RemoveClass|<code>TextButton.RemoveClass( cstring cstring_1 )</code>|
BHasClass|<code>TextButton.BHasClass( cstring cstring_1 )</code>|
BAscendantHasClass|<code>TextButton.BAscendantHasClass( cstring cstring_1 )</code>|
SetHasClass|<code>TextButton.SetHasClass( cstring cstring_1, boolean boolean_2 )</code>|
ToggleClass|<code>TextButton.ToggleClass( cstring cstring_1 )</code>|
SwitchClass|<code>TextButton.SwitchClass( cstring cstring_1, cstring cstring_2 )</code>|
TriggerClass|<code>TextButton.TriggerClass( cstring cstring_1 )</code>|
ClearPanelEvent|<code>TextButton.ClearPanelEvent( cstring cstring_1 )</code>|
SetDraggable|<code>TextButton.SetDraggable( boolean boolean_1 )</code>|
IsDraggable|<code>TextButton.IsDraggable()</code>|
IsSizeValid|<code>TextButton.IsSizeValid()</code>|
GetChildCount|<code>TextButton.GetChildCount()</code>|
GetChild|<code>TextButton.GetChild( integer integer_1 )</code>|
GetChildIndex|<code>TextButton.GetChildIndex( unknown_variant_type unknown_variant_type_1 )</code>|
Children|<code>TextButton.Children()</code>|
FindChildrenWithClassTraverse|<code>TextButton.FindChildrenWithClassTraverse( cstring cstring_1 )</code>|
GetParent|<code>TextButton.GetParent()</code>|
SetParent|<code>TextButton.SetParent( unknown_variant_type unknown_variant_type_1 )</code>|
FindChild|<code>TextButton.FindChild( cstring cstring_1 )</code>|
FindChildTraverse|<code>TextButton.FindChildTraverse( cstring cstring_1 )</code>|
FindChildInLayoutFile|<code>TextButton.FindChildInLayoutFile( cstring cstring_1 )</code>|
FindPanelInLayoutFile|<code>TextButton.FindPanelInLayoutFile( cstring cstring_1 )</code>|
FindAncestor|<code>TextButton.FindAncestor( cstring cstring_1 )</code>|
RemoveAndDeleteChildren|<code>TextButton.RemoveAndDeleteChildren()</code>|
MoveChildBefore|<code>TextButton.MoveChildBefore( unknown_variant_type unknown_variant_type_1, unknown_variant_type unknown_variant_type_2 )</code>|
MoveChildAfter|<code>TextButton.MoveChildAfter( unknown_variant_type unknown_variant_type_1, unknown_variant_type unknown_variant_type_2 )</code>|
GetPositionWithinWindow|<code>TextButton.GetPositionWithinWindow()</code>|
GetPositionWithinAncestor|<code>TextButton.GetPositionWithinAncestor( unknown_variant_type unknown_variant_type_1 )</code>|
ApplyStyles|<code>TextButton.ApplyStyles( boolean boolean_1 )</code>|
ClearPropertyFromCode|<code>TextButton.ClearPropertyFromCode( unknown_variant_type unknown_variant_type_1 )</code>|
DeleteAsync|<code>TextButton.DeleteAsync( float float_1 )</code>|
BIsTransparent|<code>TextButton.BIsTransparent()</code>|
BAcceptsInput|<code>TextButton.BAcceptsInput()</code>|
BAcceptsFocus|<code>TextButton.BAcceptsFocus()</code>|
SetFocus|<code>TextButton.SetFocus()</code>|
UpdateFocusInContext|<code>TextButton.UpdateFocusInContext()</code>|
BHasHoverStyle|<code>TextButton.BHasHoverStyle()</code>|
SetAcceptsFocus|<code>TextButton.SetAcceptsFocus( boolean boolean_1 )</code>|
SetDisableFocusOnMouseDown|<code>TextButton.SetDisableFocusOnMouseDown( boolean boolean_1 )</code>|
BHasKeyFocus|<code>TextButton.BHasKeyFocus()</code>|
SetScrollParentToFitWhenFocused|<code>TextButton.SetScrollParentToFitWhenFocused( boolean boolean_1 )</code>|
BScrollParentToFitWhenFocused|<code>TextButton.BScrollParentToFitWhenFocused()</code>|
IsSelected|<code>TextButton.IsSelected()</code>|
BHasDescendantKeyFocus|<code>TextButton.BHasDescendantKeyFocus()</code>|
BLoadLayout|<code>TextButton.BLoadLayout( cstring cstring_1, boolean boolean_2, boolean boolean_3 )</code>|
BLoadLayoutSnippet|<code>TextButton.BLoadLayoutSnippet( cstring cstring_1 )</code>|
BHasLayoutSnippet|<code>TextButton.BHasLayoutSnippet( cstring cstring_1 )</code>|
SetTopOfInputContext|<code>TextButton.SetTopOfInputContext( boolean boolean_1 )</code>|
SetDialogVariable|<code>TextButton.SetDialogVariable( cstring cstring_1, cstring cstring_2 )</code>|
SetDialogVariableInt|<code>TextButton.SetDialogVariableInt( cstring cstring_1, integer integer_2 )</code>|
SetDialogVariableTime|<code>TextButton.SetDialogVariableTime( cstring cstring_1, int64 int64_2 )</code>|
SetDialogVariableLocString|<code>TextButton.SetDialogVariableLocString( cstring cstring_1, cstring cstring_2 )</code>|
SetDialogVariablePluralLocStringInt|<code>TextButton.SetDialogVariablePluralLocStringInt( cstring cstring_1, cstring cstring_2, int64 int64_3 )</code>|
ScrollToTop|<code>TextButton.ScrollToTop()</code>|
ScrollToBottom|<code>TextButton.ScrollToBottom()</code>|
ScrollToLeftEdge|<code>TextButton.ScrollToLeftEdge()</code>|
ScrollToRightEdge|<code>TextButton.ScrollToRightEdge()</code>|
ScrollParentToMakePanelFit|<code>TextButton.ScrollParentToMakePanelFit( unknown_variant_type unknown_variant_type_1, boolean boolean_2 )</code>|
ScrollToFitRegion|<code>TextButton.ScrollToFitRegion( float float_1, float float_2, float float_3, float float_4, unknown_variant_type unknown_variant_type_5, boolean boolean_6, boolean boolean_7 )</code>|
BCanSeeInParentScroll|<code>TextButton.BCanSeeInParentScroll()</code>|
GetAttributeInt|<code>TextButton.GetAttributeInt( cstring cstring_1, integer integer_2 )</code>|
GetAttributeString|<code>TextButton.GetAttributeString( cstring cstring_1, cstring cstring_2 )</code>|
GetAttributeUInt32|<code>TextButton.GetAttributeUInt32( cstring cstring_1, unsigned unsigned_2 )</code>|
SetAttributeInt|<code>TextButton.SetAttributeInt( cstring cstring_1, integer integer_2 )</code>|
SetAttributeString|<code>TextButton.SetAttributeString( cstring cstring_1, cstring cstring_2 )</code>|
SetAttributeUInt32|<code>TextButton.SetAttributeUInt32( cstring cstring_1, unsigned unsigned_2 )</code>|
SetInputNamespace|<code>TextButton.SetInputNamespace( cstring cstring_1 )</code>|
RegisterForReadyEvents|<code>TextButton.RegisterForReadyEvents( boolean boolean_1 )</code>|
BReadyForDisplay|<code>TextButton.BReadyForDisplay()</code>|
SetReadyForDisplay|<code>TextButton.SetReadyForDisplay( boolean boolean_1 )</code>|
SetPositionInPixels|<code>TextButton.SetPositionInPixels( float float_1, float float_2, float float_3 )</code>|
Data|<code>TextButton.Data( js_raw_args js_raw_args_1 )</code>|
text|<code>TextButton.text( cstring cstring_1 )</code>|
SetPanelEvent|<code>TextButton.SetPanelEvent( js_raw_args js_raw_args_1 )</code>|
RunScriptInPanelContext|<code>TextButton.RunScriptInPanelContext( js_raw_args js_raw_args_1 )</code>|
rememberchildfocus|<code>TextButton.rememberchildfocus( boolean boolean_1 )</code>|
paneltype|<code>TextButton.paneltype()</code>|


# TextEntry
Function|Signature|Description
--|--|--
visible|<code>TextEntry.visible( boolean boolean_1 )</code>|
enabled|<code>TextEntry.enabled( boolean boolean_1 )</code>|
checked|<code>TextEntry.checked( boolean boolean_1 )</code>|
defaultfocus|<code>TextEntry.defaultfocus( cstring cstring_1 )</code>|
inputnamespace|<code>TextEntry.inputnamespace( cstring cstring_1 )</code>|
hittest|<code>TextEntry.hittest( boolean boolean_1 )</code>|
hittestchildren|<code>TextEntry.hittestchildren( boolean boolean_1 )</code>|
tabindex|<code>TextEntry.tabindex( float float_1 )</code>|
selectionpos_x|<code>TextEntry.selectionpos_x( float float_1 )</code>|
selectionpos_y|<code>TextEntry.selectionpos_y( float float_1 )</code>|
type|<code>TextEntry.type()</code>|
id|<code>TextEntry.id()</code>|
layoutfile|<code>TextEntry.layoutfile()</code>|
contentwidth|<code>TextEntry.contentwidth()</code>|
contentheight|<code>TextEntry.contentheight()</code>|
desiredlayoutwidth|<code>TextEntry.desiredlayoutwidth()</code>|
desiredlayoutheight|<code>TextEntry.desiredlayoutheight()</code>|
actuallayoutwidth|<code>TextEntry.actuallayoutwidth()</code>|
actuallayoutheight|<code>TextEntry.actuallayoutheight()</code>|
actualxoffset|<code>TextEntry.actualxoffset()</code>|
actualyoffset|<code>TextEntry.actualyoffset()</code>|
scrolloffset_y|<code>TextEntry.scrolloffset_y()</code>|
scrolloffset_x|<code>TextEntry.scrolloffset_x()</code>|
actualuiscale_y|<code>TextEntry.actualuiscale_y()</code>|
actualuiscale_x|<code>TextEntry.actualuiscale_x()</code>|
style|<code>TextEntry.style()</code>|
AddClass|<code>TextEntry.AddClass( cstring cstring_1 )</code>|
RemoveClass|<code>TextEntry.RemoveClass( cstring cstring_1 )</code>|
BHasClass|<code>TextEntry.BHasClass( cstring cstring_1 )</code>|
BAscendantHasClass|<code>TextEntry.BAscendantHasClass( cstring cstring_1 )</code>|
SetHasClass|<code>TextEntry.SetHasClass( cstring cstring_1, boolean boolean_2 )</code>|
ToggleClass|<code>TextEntry.ToggleClass( cstring cstring_1 )</code>|
SwitchClass|<code>TextEntry.SwitchClass( cstring cstring_1, cstring cstring_2 )</code>|
TriggerClass|<code>TextEntry.TriggerClass( cstring cstring_1 )</code>|
ClearPanelEvent|<code>TextEntry.ClearPanelEvent( cstring cstring_1 )</code>|
SetDraggable|<code>TextEntry.SetDraggable( boolean boolean_1 )</code>|
IsDraggable|<code>TextEntry.IsDraggable()</code>|
IsSizeValid|<code>TextEntry.IsSizeValid()</code>|
GetChildCount|<code>TextEntry.GetChildCount()</code>|
GetChild|<code>TextEntry.GetChild( integer integer_1 )</code>|
GetChildIndex|<code>TextEntry.GetChildIndex( unknown_variant_type unknown_variant_type_1 )</code>|
Children|<code>TextEntry.Children()</code>|
FindChildrenWithClassTraverse|<code>TextEntry.FindChildrenWithClassTraverse( cstring cstring_1 )</code>|
GetParent|<code>TextEntry.GetParent()</code>|
SetParent|<code>TextEntry.SetParent( unknown_variant_type unknown_variant_type_1 )</code>|
FindChild|<code>TextEntry.FindChild( cstring cstring_1 )</code>|
FindChildTraverse|<code>TextEntry.FindChildTraverse( cstring cstring_1 )</code>|
FindChildInLayoutFile|<code>TextEntry.FindChildInLayoutFile( cstring cstring_1 )</code>|
FindPanelInLayoutFile|<code>TextEntry.FindPanelInLayoutFile( cstring cstring_1 )</code>|
FindAncestor|<code>TextEntry.FindAncestor( cstring cstring_1 )</code>|
RemoveAndDeleteChildren|<code>TextEntry.RemoveAndDeleteChildren()</code>|
MoveChildBefore|<code>TextEntry.MoveChildBefore( unknown_variant_type unknown_variant_type_1, unknown_variant_type unknown_variant_type_2 )</code>|
MoveChildAfter|<code>TextEntry.MoveChildAfter( unknown_variant_type unknown_variant_type_1, unknown_variant_type unknown_variant_type_2 )</code>|
GetPositionWithinWindow|<code>TextEntry.GetPositionWithinWindow()</code>|
GetPositionWithinAncestor|<code>TextEntry.GetPositionWithinAncestor( unknown_variant_type unknown_variant_type_1 )</code>|
ApplyStyles|<code>TextEntry.ApplyStyles( boolean boolean_1 )</code>|
ClearPropertyFromCode|<code>TextEntry.ClearPropertyFromCode( unknown_variant_type unknown_variant_type_1 )</code>|
DeleteAsync|<code>TextEntry.DeleteAsync( float float_1 )</code>|
BIsTransparent|<code>TextEntry.BIsTransparent()</code>|
BAcceptsInput|<code>TextEntry.BAcceptsInput()</code>|
BAcceptsFocus|<code>TextEntry.BAcceptsFocus()</code>|
SetFocus|<code>TextEntry.SetFocus()</code>|
UpdateFocusInContext|<code>TextEntry.UpdateFocusInContext()</code>|
BHasHoverStyle|<code>TextEntry.BHasHoverStyle()</code>|
SetAcceptsFocus|<code>TextEntry.SetAcceptsFocus( boolean boolean_1 )</code>|
SetDisableFocusOnMouseDown|<code>TextEntry.SetDisableFocusOnMouseDown( boolean boolean_1 )</code>|
BHasKeyFocus|<code>TextEntry.BHasKeyFocus()</code>|
SetScrollParentToFitWhenFocused|<code>TextEntry.SetScrollParentToFitWhenFocused( boolean boolean_1 )</code>|
BScrollParentToFitWhenFocused|<code>TextEntry.BScrollParentToFitWhenFocused()</code>|
IsSelected|<code>TextEntry.IsSelected()</code>|
BHasDescendantKeyFocus|<code>TextEntry.BHasDescendantKeyFocus()</code>|
BLoadLayout|<code>TextEntry.BLoadLayout( cstring cstring_1, boolean boolean_2, boolean boolean_3 )</code>|
BLoadLayoutSnippet|<code>TextEntry.BLoadLayoutSnippet( cstring cstring_1 )</code>|
BHasLayoutSnippet|<code>TextEntry.BHasLayoutSnippet( cstring cstring_1 )</code>|
SetTopOfInputContext|<code>TextEntry.SetTopOfInputContext( boolean boolean_1 )</code>|
SetDialogVariable|<code>TextEntry.SetDialogVariable( cstring cstring_1, cstring cstring_2 )</code>|
SetDialogVariableInt|<code>TextEntry.SetDialogVariableInt( cstring cstring_1, integer integer_2 )</code>|
SetDialogVariableTime|<code>TextEntry.SetDialogVariableTime( cstring cstring_1, int64 int64_2 )</code>|
SetDialogVariableLocString|<code>TextEntry.SetDialogVariableLocString( cstring cstring_1, cstring cstring_2 )</code>|
SetDialogVariablePluralLocStringInt|<code>TextEntry.SetDialogVariablePluralLocStringInt( cstring cstring_1, cstring cstring_2, int64 int64_3 )</code>|
ScrollToTop|<code>TextEntry.ScrollToTop()</code>|
ScrollToBottom|<code>TextEntry.ScrollToBottom()</code>|
ScrollToLeftEdge|<code>TextEntry.ScrollToLeftEdge()</code>|
ScrollToRightEdge|<code>TextEntry.ScrollToRightEdge()</code>|
ScrollParentToMakePanelFit|<code>TextEntry.ScrollParentToMakePanelFit( unknown_variant_type unknown_variant_type_1, boolean boolean_2 )</code>|
ScrollToFitRegion|<code>TextEntry.ScrollToFitRegion( float float_1, float float_2, float float_3, float float_4, unknown_variant_type unknown_variant_type_5, boolean boolean_6, boolean boolean_7 )</code>|
BCanSeeInParentScroll|<code>TextEntry.BCanSeeInParentScroll()</code>|
GetAttributeInt|<code>TextEntry.GetAttributeInt( cstring cstring_1, integer integer_2 )</code>|
GetAttributeString|<code>TextEntry.GetAttributeString( cstring cstring_1, cstring cstring_2 )</code>|
GetAttributeUInt32|<code>TextEntry.GetAttributeUInt32( cstring cstring_1, unsigned unsigned_2 )</code>|
SetAttributeInt|<code>TextEntry.SetAttributeInt( cstring cstring_1, integer integer_2 )</code>|
SetAttributeString|<code>TextEntry.SetAttributeString( cstring cstring_1, cstring cstring_2 )</code>|
SetAttributeUInt32|<code>TextEntry.SetAttributeUInt32( cstring cstring_1, unsigned unsigned_2 )</code>|
SetInputNamespace|<code>TextEntry.SetInputNamespace( cstring cstring_1 )</code>|
RegisterForReadyEvents|<code>TextEntry.RegisterForReadyEvents( boolean boolean_1 )</code>|
BReadyForDisplay|<code>TextEntry.BReadyForDisplay()</code>|
SetReadyForDisplay|<code>TextEntry.SetReadyForDisplay( boolean boolean_1 )</code>|
SetPositionInPixels|<code>TextEntry.SetPositionInPixels( float float_1, float float_2, float float_3 )</code>|
Data|<code>TextEntry.Data( js_raw_args js_raw_args_1 )</code>|
text|<code>TextEntry.text( cstring cstring_1 )</code>|
SetMaxChars|<code>TextEntry.SetMaxChars( unsigned unsigned_1 )</code>|
GetMaxCharCount|<code>TextEntry.GetMaxCharCount()</code>|
GetCursorOffset|<code>TextEntry.GetCursorOffset()</code>|
SetCursorOffset|<code>TextEntry.SetCursorOffset( integer integer_1 )</code>|
ClearSelection|<code>TextEntry.ClearSelection()</code>|
SelectAll|<code>TextEntry.SelectAll()</code>|
RaiseChangeEvents|<code>TextEntry.RaiseChangeEvents( boolean boolean_1 )</code>|
SetPanelEvent|<code>TextEntry.SetPanelEvent( js_raw_args js_raw_args_1 )</code>|
RunScriptInPanelContext|<code>TextEntry.RunScriptInPanelContext( js_raw_args js_raw_args_1 )</code>|
rememberchildfocus|<code>TextEntry.rememberchildfocus( boolean boolean_1 )</code>|
paneltype|<code>TextEntry.paneltype()</code>|


# ProgressBar
Function|Signature|Description
--|--|--
visible|<code>ProgressBar.visible( boolean boolean_1 )</code>|
enabled|<code>ProgressBar.enabled( boolean boolean_1 )</code>|
checked|<code>ProgressBar.checked( boolean boolean_1 )</code>|
defaultfocus|<code>ProgressBar.defaultfocus( cstring cstring_1 )</code>|
inputnamespace|<code>ProgressBar.inputnamespace( cstring cstring_1 )</code>|
hittest|<code>ProgressBar.hittest( boolean boolean_1 )</code>|
hittestchildren|<code>ProgressBar.hittestchildren( boolean boolean_1 )</code>|
tabindex|<code>ProgressBar.tabindex( float float_1 )</code>|
selectionpos_x|<code>ProgressBar.selectionpos_x( float float_1 )</code>|
selectionpos_y|<code>ProgressBar.selectionpos_y( float float_1 )</code>|
type|<code>ProgressBar.type()</code>|
id|<code>ProgressBar.id()</code>|
layoutfile|<code>ProgressBar.layoutfile()</code>|
contentwidth|<code>ProgressBar.contentwidth()</code>|
contentheight|<code>ProgressBar.contentheight()</code>|
desiredlayoutwidth|<code>ProgressBar.desiredlayoutwidth()</code>|
desiredlayoutheight|<code>ProgressBar.desiredlayoutheight()</code>|
actuallayoutwidth|<code>ProgressBar.actuallayoutwidth()</code>|
actuallayoutheight|<code>ProgressBar.actuallayoutheight()</code>|
actualxoffset|<code>ProgressBar.actualxoffset()</code>|
actualyoffset|<code>ProgressBar.actualyoffset()</code>|
scrolloffset_y|<code>ProgressBar.scrolloffset_y()</code>|
scrolloffset_x|<code>ProgressBar.scrolloffset_x()</code>|
actualuiscale_y|<code>ProgressBar.actualuiscale_y()</code>|
actualuiscale_x|<code>ProgressBar.actualuiscale_x()</code>|
style|<code>ProgressBar.style()</code>|
AddClass|<code>ProgressBar.AddClass( cstring cstring_1 )</code>|
RemoveClass|<code>ProgressBar.RemoveClass( cstring cstring_1 )</code>|
BHasClass|<code>ProgressBar.BHasClass( cstring cstring_1 )</code>|
BAscendantHasClass|<code>ProgressBar.BAscendantHasClass( cstring cstring_1 )</code>|
SetHasClass|<code>ProgressBar.SetHasClass( cstring cstring_1, boolean boolean_2 )</code>|
ToggleClass|<code>ProgressBar.ToggleClass( cstring cstring_1 )</code>|
SwitchClass|<code>ProgressBar.SwitchClass( cstring cstring_1, cstring cstring_2 )</code>|
TriggerClass|<code>ProgressBar.TriggerClass( cstring cstring_1 )</code>|
ClearPanelEvent|<code>ProgressBar.ClearPanelEvent( cstring cstring_1 )</code>|
SetDraggable|<code>ProgressBar.SetDraggable( boolean boolean_1 )</code>|
IsDraggable|<code>ProgressBar.IsDraggable()</code>|
IsSizeValid|<code>ProgressBar.IsSizeValid()</code>|
GetChildCount|<code>ProgressBar.GetChildCount()</code>|
GetChild|<code>ProgressBar.GetChild( integer integer_1 )</code>|
GetChildIndex|<code>ProgressBar.GetChildIndex( unknown_variant_type unknown_variant_type_1 )</code>|
Children|<code>ProgressBar.Children()</code>|
FindChildrenWithClassTraverse|<code>ProgressBar.FindChildrenWithClassTraverse( cstring cstring_1 )</code>|
GetParent|<code>ProgressBar.GetParent()</code>|
SetParent|<code>ProgressBar.SetParent( unknown_variant_type unknown_variant_type_1 )</code>|
FindChild|<code>ProgressBar.FindChild( cstring cstring_1 )</code>|
FindChildTraverse|<code>ProgressBar.FindChildTraverse( cstring cstring_1 )</code>|
FindChildInLayoutFile|<code>ProgressBar.FindChildInLayoutFile( cstring cstring_1 )</code>|
FindPanelInLayoutFile|<code>ProgressBar.FindPanelInLayoutFile( cstring cstring_1 )</code>|
FindAncestor|<code>ProgressBar.FindAncestor( cstring cstring_1 )</code>|
RemoveAndDeleteChildren|<code>ProgressBar.RemoveAndDeleteChildren()</code>|
MoveChildBefore|<code>ProgressBar.MoveChildBefore( unknown_variant_type unknown_variant_type_1, unknown_variant_type unknown_variant_type_2 )</code>|
MoveChildAfter|<code>ProgressBar.MoveChildAfter( unknown_variant_type unknown_variant_type_1, unknown_variant_type unknown_variant_type_2 )</code>|
GetPositionWithinWindow|<code>ProgressBar.GetPositionWithinWindow()</code>|
GetPositionWithinAncestor|<code>ProgressBar.GetPositionWithinAncestor( unknown_variant_type unknown_variant_type_1 )</code>|
ApplyStyles|<code>ProgressBar.ApplyStyles( boolean boolean_1 )</code>|
ClearPropertyFromCode|<code>ProgressBar.ClearPropertyFromCode( unknown_variant_type unknown_variant_type_1 )</code>|
DeleteAsync|<code>ProgressBar.DeleteAsync( float float_1 )</code>|
BIsTransparent|<code>ProgressBar.BIsTransparent()</code>|
BAcceptsInput|<code>ProgressBar.BAcceptsInput()</code>|
BAcceptsFocus|<code>ProgressBar.BAcceptsFocus()</code>|
SetFocus|<code>ProgressBar.SetFocus()</code>|
UpdateFocusInContext|<code>ProgressBar.UpdateFocusInContext()</code>|
BHasHoverStyle|<code>ProgressBar.BHasHoverStyle()</code>|
SetAcceptsFocus|<code>ProgressBar.SetAcceptsFocus( boolean boolean_1 )</code>|
SetDisableFocusOnMouseDown|<code>ProgressBar.SetDisableFocusOnMouseDown( boolean boolean_1 )</code>|
BHasKeyFocus|<code>ProgressBar.BHasKeyFocus()</code>|
SetScrollParentToFitWhenFocused|<code>ProgressBar.SetScrollParentToFitWhenFocused( boolean boolean_1 )</code>|
BScrollParentToFitWhenFocused|<code>ProgressBar.BScrollParentToFitWhenFocused()</code>|
IsSelected|<code>ProgressBar.IsSelected()</code>|
BHasDescendantKeyFocus|<code>ProgressBar.BHasDescendantKeyFocus()</code>|
BLoadLayout|<code>ProgressBar.BLoadLayout( cstring cstring_1, boolean boolean_2, boolean boolean_3 )</code>|
BLoadLayoutSnippet|<code>ProgressBar.BLoadLayoutSnippet( cstring cstring_1 )</code>|
BHasLayoutSnippet|<code>ProgressBar.BHasLayoutSnippet( cstring cstring_1 )</code>|
SetTopOfInputContext|<code>ProgressBar.SetTopOfInputContext( boolean boolean_1 )</code>|
SetDialogVariable|<code>ProgressBar.SetDialogVariable( cstring cstring_1, cstring cstring_2 )</code>|
SetDialogVariableInt|<code>ProgressBar.SetDialogVariableInt( cstring cstring_1, integer integer_2 )</code>|
SetDialogVariableTime|<code>ProgressBar.SetDialogVariableTime( cstring cstring_1, int64 int64_2 )</code>|
SetDialogVariableLocString|<code>ProgressBar.SetDialogVariableLocString( cstring cstring_1, cstring cstring_2 )</code>|
SetDialogVariablePluralLocStringInt|<code>ProgressBar.SetDialogVariablePluralLocStringInt( cstring cstring_1, cstring cstring_2, int64 int64_3 )</code>|
ScrollToTop|<code>ProgressBar.ScrollToTop()</code>|
ScrollToBottom|<code>ProgressBar.ScrollToBottom()</code>|
ScrollToLeftEdge|<code>ProgressBar.ScrollToLeftEdge()</code>|
ScrollToRightEdge|<code>ProgressBar.ScrollToRightEdge()</code>|
ScrollParentToMakePanelFit|<code>ProgressBar.ScrollParentToMakePanelFit( unknown_variant_type unknown_variant_type_1, boolean boolean_2 )</code>|
ScrollToFitRegion|<code>ProgressBar.ScrollToFitRegion( float float_1, float float_2, float float_3, float float_4, unknown_variant_type unknown_variant_type_5, boolean boolean_6, boolean boolean_7 )</code>|
BCanSeeInParentScroll|<code>ProgressBar.BCanSeeInParentScroll()</code>|
GetAttributeInt|<code>ProgressBar.GetAttributeInt( cstring cstring_1, integer integer_2 )</code>|
GetAttributeString|<code>ProgressBar.GetAttributeString( cstring cstring_1, cstring cstring_2 )</code>|
GetAttributeUInt32|<code>ProgressBar.GetAttributeUInt32( cstring cstring_1, unsigned unsigned_2 )</code>|
SetAttributeInt|<code>ProgressBar.SetAttributeInt( cstring cstring_1, integer integer_2 )</code>|
SetAttributeString|<code>ProgressBar.SetAttributeString( cstring cstring_1, cstring cstring_2 )</code>|
SetAttributeUInt32|<code>ProgressBar.SetAttributeUInt32( cstring cstring_1, unsigned unsigned_2 )</code>|
SetInputNamespace|<code>ProgressBar.SetInputNamespace( cstring cstring_1 )</code>|
RegisterForReadyEvents|<code>ProgressBar.RegisterForReadyEvents( boolean boolean_1 )</code>|
BReadyForDisplay|<code>ProgressBar.BReadyForDisplay()</code>|
SetReadyForDisplay|<code>ProgressBar.SetReadyForDisplay( boolean boolean_1 )</code>|
SetPositionInPixels|<code>ProgressBar.SetPositionInPixels( float float_1, float float_2, float float_3 )</code>|
Data|<code>ProgressBar.Data( js_raw_args js_raw_args_1 )</code>|
value|<code>ProgressBar.value( float float_1 )</code>|
min|<code>ProgressBar.min( float float_1 )</code>|
max|<code>ProgressBar.max( float float_1 )</code>|
hasNotches|<code>ProgressBar.hasNotches( boolean boolean_1 )</code>|
valuePerNotch|<code>ProgressBar.valuePerNotch( float float_1 )</code>|
SetPanelEvent|<code>ProgressBar.SetPanelEvent( js_raw_args js_raw_args_1 )</code>|
RunScriptInPanelContext|<code>ProgressBar.RunScriptInPanelContext( js_raw_args js_raw_args_1 )</code>|
rememberchildfocus|<code>ProgressBar.rememberchildfocus( boolean boolean_1 )</code>|
paneltype|<code>ProgressBar.paneltype()</code>|


# DOTABuffList
Function|Signature|Description
--|--|--
visible|<code>DOTABuffList.visible( boolean boolean_1 )</code>|
enabled|<code>DOTABuffList.enabled( boolean boolean_1 )</code>|
checked|<code>DOTABuffList.checked( boolean boolean_1 )</code>|
defaultfocus|<code>DOTABuffList.defaultfocus( cstring cstring_1 )</code>|
inputnamespace|<code>DOTABuffList.inputnamespace( cstring cstring_1 )</code>|
hittest|<code>DOTABuffList.hittest( boolean boolean_1 )</code>|
hittestchildren|<code>DOTABuffList.hittestchildren( boolean boolean_1 )</code>|
tabindex|<code>DOTABuffList.tabindex( float float_1 )</code>|
selectionpos_x|<code>DOTABuffList.selectionpos_x( float float_1 )</code>|
selectionpos_y|<code>DOTABuffList.selectionpos_y( float float_1 )</code>|
type|<code>DOTABuffList.type()</code>|
id|<code>DOTABuffList.id()</code>|
layoutfile|<code>DOTABuffList.layoutfile()</code>|
contentwidth|<code>DOTABuffList.contentwidth()</code>|
contentheight|<code>DOTABuffList.contentheight()</code>|
desiredlayoutwidth|<code>DOTABuffList.desiredlayoutwidth()</code>|
desiredlayoutheight|<code>DOTABuffList.desiredlayoutheight()</code>|
actuallayoutwidth|<code>DOTABuffList.actuallayoutwidth()</code>|
actuallayoutheight|<code>DOTABuffList.actuallayoutheight()</code>|
actualxoffset|<code>DOTABuffList.actualxoffset()</code>|
actualyoffset|<code>DOTABuffList.actualyoffset()</code>|
scrolloffset_y|<code>DOTABuffList.scrolloffset_y()</code>|
scrolloffset_x|<code>DOTABuffList.scrolloffset_x()</code>|
actualuiscale_y|<code>DOTABuffList.actualuiscale_y()</code>|
actualuiscale_x|<code>DOTABuffList.actualuiscale_x()</code>|
style|<code>DOTABuffList.style()</code>|
AddClass|<code>DOTABuffList.AddClass( cstring cstring_1 )</code>|
RemoveClass|<code>DOTABuffList.RemoveClass( cstring cstring_1 )</code>|
BHasClass|<code>DOTABuffList.BHasClass( cstring cstring_1 )</code>|
BAscendantHasClass|<code>DOTABuffList.BAscendantHasClass( cstring cstring_1 )</code>|
SetHasClass|<code>DOTABuffList.SetHasClass( cstring cstring_1, boolean boolean_2 )</code>|
ToggleClass|<code>DOTABuffList.ToggleClass( cstring cstring_1 )</code>|
SwitchClass|<code>DOTABuffList.SwitchClass( cstring cstring_1, cstring cstring_2 )</code>|
TriggerClass|<code>DOTABuffList.TriggerClass( cstring cstring_1 )</code>|
ClearPanelEvent|<code>DOTABuffList.ClearPanelEvent( cstring cstring_1 )</code>|
SetDraggable|<code>DOTABuffList.SetDraggable( boolean boolean_1 )</code>|
IsDraggable|<code>DOTABuffList.IsDraggable()</code>|
IsSizeValid|<code>DOTABuffList.IsSizeValid()</code>|
GetChildCount|<code>DOTABuffList.GetChildCount()</code>|
GetChild|<code>DOTABuffList.GetChild( integer integer_1 )</code>|
GetChildIndex|<code>DOTABuffList.GetChildIndex( unknown_variant_type unknown_variant_type_1 )</code>|
Children|<code>DOTABuffList.Children()</code>|
FindChildrenWithClassTraverse|<code>DOTABuffList.FindChildrenWithClassTraverse( cstring cstring_1 )</code>|
GetParent|<code>DOTABuffList.GetParent()</code>|
SetParent|<code>DOTABuffList.SetParent( unknown_variant_type unknown_variant_type_1 )</code>|
FindChild|<code>DOTABuffList.FindChild( cstring cstring_1 )</code>|
FindChildTraverse|<code>DOTABuffList.FindChildTraverse( cstring cstring_1 )</code>|
FindChildInLayoutFile|<code>DOTABuffList.FindChildInLayoutFile( cstring cstring_1 )</code>|
FindPanelInLayoutFile|<code>DOTABuffList.FindPanelInLayoutFile( cstring cstring_1 )</code>|
FindAncestor|<code>DOTABuffList.FindAncestor( cstring cstring_1 )</code>|
RemoveAndDeleteChildren|<code>DOTABuffList.RemoveAndDeleteChildren()</code>|
MoveChildBefore|<code>DOTABuffList.MoveChildBefore( unknown_variant_type unknown_variant_type_1, unknown_variant_type unknown_variant_type_2 )</code>|
MoveChildAfter|<code>DOTABuffList.MoveChildAfter( unknown_variant_type unknown_variant_type_1, unknown_variant_type unknown_variant_type_2 )</code>|
GetPositionWithinWindow|<code>DOTABuffList.GetPositionWithinWindow()</code>|
GetPositionWithinAncestor|<code>DOTABuffList.GetPositionWithinAncestor( unknown_variant_type unknown_variant_type_1 )</code>|
ApplyStyles|<code>DOTABuffList.ApplyStyles( boolean boolean_1 )</code>|
ClearPropertyFromCode|<code>DOTABuffList.ClearPropertyFromCode( unknown_variant_type unknown_variant_type_1 )</code>|
DeleteAsync|<code>DOTABuffList.DeleteAsync( float float_1 )</code>|
BIsTransparent|<code>DOTABuffList.BIsTransparent()</code>|
BAcceptsInput|<code>DOTABuffList.BAcceptsInput()</code>|
BAcceptsFocus|<code>DOTABuffList.BAcceptsFocus()</code>|
SetFocus|<code>DOTABuffList.SetFocus()</code>|
UpdateFocusInContext|<code>DOTABuffList.UpdateFocusInContext()</code>|
BHasHoverStyle|<code>DOTABuffList.BHasHoverStyle()</code>|
SetAcceptsFocus|<code>DOTABuffList.SetAcceptsFocus( boolean boolean_1 )</code>|
SetDisableFocusOnMouseDown|<code>DOTABuffList.SetDisableFocusOnMouseDown( boolean boolean_1 )</code>|
BHasKeyFocus|<code>DOTABuffList.BHasKeyFocus()</code>|
SetScrollParentToFitWhenFocused|<code>DOTABuffList.SetScrollParentToFitWhenFocused( boolean boolean_1 )</code>|
BScrollParentToFitWhenFocused|<code>DOTABuffList.BScrollParentToFitWhenFocused()</code>|
IsSelected|<code>DOTABuffList.IsSelected()</code>|
BHasDescendantKeyFocus|<code>DOTABuffList.BHasDescendantKeyFocus()</code>|
BLoadLayout|<code>DOTABuffList.BLoadLayout( cstring cstring_1, boolean boolean_2, boolean boolean_3 )</code>|
BLoadLayoutSnippet|<code>DOTABuffList.BLoadLayoutSnippet( cstring cstring_1 )</code>|
BHasLayoutSnippet|<code>DOTABuffList.BHasLayoutSnippet( cstring cstring_1 )</code>|
SetTopOfInputContext|<code>DOTABuffList.SetTopOfInputContext( boolean boolean_1 )</code>|
SetDialogVariable|<code>DOTABuffList.SetDialogVariable( cstring cstring_1, cstring cstring_2 )</code>|
SetDialogVariableInt|<code>DOTABuffList.SetDialogVariableInt( cstring cstring_1, integer integer_2 )</code>|
SetDialogVariableTime|<code>DOTABuffList.SetDialogVariableTime( cstring cstring_1, int64 int64_2 )</code>|
SetDialogVariableLocString|<code>DOTABuffList.SetDialogVariableLocString( cstring cstring_1, cstring cstring_2 )</code>|
SetDialogVariablePluralLocStringInt|<code>DOTABuffList.SetDialogVariablePluralLocStringInt( cstring cstring_1, cstring cstring_2, int64 int64_3 )</code>|
ScrollToTop|<code>DOTABuffList.ScrollToTop()</code>|
ScrollToBottom|<code>DOTABuffList.ScrollToBottom()</code>|
ScrollToLeftEdge|<code>DOTABuffList.ScrollToLeftEdge()</code>|
ScrollToRightEdge|<code>DOTABuffList.ScrollToRightEdge()</code>|
ScrollParentToMakePanelFit|<code>DOTABuffList.ScrollParentToMakePanelFit( unknown_variant_type unknown_variant_type_1, boolean boolean_2 )</code>|
ScrollToFitRegion|<code>DOTABuffList.ScrollToFitRegion( float float_1, float float_2, float float_3, float float_4, unknown_variant_type unknown_variant_type_5, boolean boolean_6, boolean boolean_7 )</code>|
BCanSeeInParentScroll|<code>DOTABuffList.BCanSeeInParentScroll()</code>|
GetAttributeInt|<code>DOTABuffList.GetAttributeInt( cstring cstring_1, integer integer_2 )</code>|
GetAttributeString|<code>DOTABuffList.GetAttributeString( cstring cstring_1, cstring cstring_2 )</code>|
GetAttributeUInt32|<code>DOTABuffList.GetAttributeUInt32( cstring cstring_1, unsigned unsigned_2 )</code>|
SetAttributeInt|<code>DOTABuffList.SetAttributeInt( cstring cstring_1, integer integer_2 )</code>|
SetAttributeString|<code>DOTABuffList.SetAttributeString( cstring cstring_1, cstring cstring_2 )</code>|
SetAttributeUInt32|<code>DOTABuffList.SetAttributeUInt32( cstring cstring_1, unsigned unsigned_2 )</code>|
SetInputNamespace|<code>DOTABuffList.SetInputNamespace( cstring cstring_1 )</code>|
RegisterForReadyEvents|<code>DOTABuffList.RegisterForReadyEvents( boolean boolean_1 )</code>|
BReadyForDisplay|<code>DOTABuffList.BReadyForDisplay()</code>|
SetReadyForDisplay|<code>DOTABuffList.SetReadyForDisplay( boolean boolean_1 )</code>|
SetPositionInPixels|<code>DOTABuffList.SetPositionInPixels( float float_1, float float_2, float float_3 )</code>|
Data|<code>DOTABuffList.Data( js_raw_args js_raw_args_1 )</code>|
SetPanelEvent|<code>DOTABuffList.SetPanelEvent( js_raw_args js_raw_args_1 )</code>|
RunScriptInPanelContext|<code>DOTABuffList.RunScriptInPanelContext( js_raw_args js_raw_args_1 )</code>|
rememberchildfocus|<code>DOTABuffList.rememberchildfocus( boolean boolean_1 )</code>|
paneltype|<code>DOTABuffList.paneltype()</code>|


# DOTAPortrait
Function|Signature|Description
--|--|--
visible|<code>DOTAPortrait.visible( boolean boolean_1 )</code>|
enabled|<code>DOTAPortrait.enabled( boolean boolean_1 )</code>|
checked|<code>DOTAPortrait.checked( boolean boolean_1 )</code>|
defaultfocus|<code>DOTAPortrait.defaultfocus( cstring cstring_1 )</code>|
inputnamespace|<code>DOTAPortrait.inputnamespace( cstring cstring_1 )</code>|
hittest|<code>DOTAPortrait.hittest( boolean boolean_1 )</code>|
hittestchildren|<code>DOTAPortrait.hittestchildren( boolean boolean_1 )</code>|
tabindex|<code>DOTAPortrait.tabindex( float float_1 )</code>|
selectionpos_x|<code>DOTAPortrait.selectionpos_x( float float_1 )</code>|
selectionpos_y|<code>DOTAPortrait.selectionpos_y( float float_1 )</code>|
type|<code>DOTAPortrait.type()</code>|
id|<code>DOTAPortrait.id()</code>|
layoutfile|<code>DOTAPortrait.layoutfile()</code>|
contentwidth|<code>DOTAPortrait.contentwidth()</code>|
contentheight|<code>DOTAPortrait.contentheight()</code>|
desiredlayoutwidth|<code>DOTAPortrait.desiredlayoutwidth()</code>|
desiredlayoutheight|<code>DOTAPortrait.desiredlayoutheight()</code>|
actuallayoutwidth|<code>DOTAPortrait.actuallayoutwidth()</code>|
actuallayoutheight|<code>DOTAPortrait.actuallayoutheight()</code>|
actualxoffset|<code>DOTAPortrait.actualxoffset()</code>|
actualyoffset|<code>DOTAPortrait.actualyoffset()</code>|
scrolloffset_y|<code>DOTAPortrait.scrolloffset_y()</code>|
scrolloffset_x|<code>DOTAPortrait.scrolloffset_x()</code>|
actualuiscale_y|<code>DOTAPortrait.actualuiscale_y()</code>|
actualuiscale_x|<code>DOTAPortrait.actualuiscale_x()</code>|
style|<code>DOTAPortrait.style()</code>|
AddClass|<code>DOTAPortrait.AddClass( cstring cstring_1 )</code>|
RemoveClass|<code>DOTAPortrait.RemoveClass( cstring cstring_1 )</code>|
BHasClass|<code>DOTAPortrait.BHasClass( cstring cstring_1 )</code>|
BAscendantHasClass|<code>DOTAPortrait.BAscendantHasClass( cstring cstring_1 )</code>|
SetHasClass|<code>DOTAPortrait.SetHasClass( cstring cstring_1, boolean boolean_2 )</code>|
ToggleClass|<code>DOTAPortrait.ToggleClass( cstring cstring_1 )</code>|
SwitchClass|<code>DOTAPortrait.SwitchClass( cstring cstring_1, cstring cstring_2 )</code>|
TriggerClass|<code>DOTAPortrait.TriggerClass( cstring cstring_1 )</code>|
ClearPanelEvent|<code>DOTAPortrait.ClearPanelEvent( cstring cstring_1 )</code>|
SetDraggable|<code>DOTAPortrait.SetDraggable( boolean boolean_1 )</code>|
IsDraggable|<code>DOTAPortrait.IsDraggable()</code>|
IsSizeValid|<code>DOTAPortrait.IsSizeValid()</code>|
GetChildCount|<code>DOTAPortrait.GetChildCount()</code>|
GetChild|<code>DOTAPortrait.GetChild( integer integer_1 )</code>|
GetChildIndex|<code>DOTAPortrait.GetChildIndex( unknown_variant_type unknown_variant_type_1 )</code>|
Children|<code>DOTAPortrait.Children()</code>|
FindChildrenWithClassTraverse|<code>DOTAPortrait.FindChildrenWithClassTraverse( cstring cstring_1 )</code>|
GetParent|<code>DOTAPortrait.GetParent()</code>|
SetParent|<code>DOTAPortrait.SetParent( unknown_variant_type unknown_variant_type_1 )</code>|
FindChild|<code>DOTAPortrait.FindChild( cstring cstring_1 )</code>|
FindChildTraverse|<code>DOTAPortrait.FindChildTraverse( cstring cstring_1 )</code>|
FindChildInLayoutFile|<code>DOTAPortrait.FindChildInLayoutFile( cstring cstring_1 )</code>|
FindPanelInLayoutFile|<code>DOTAPortrait.FindPanelInLayoutFile( cstring cstring_1 )</code>|
FindAncestor|<code>DOTAPortrait.FindAncestor( cstring cstring_1 )</code>|
RemoveAndDeleteChildren|<code>DOTAPortrait.RemoveAndDeleteChildren()</code>|
MoveChildBefore|<code>DOTAPortrait.MoveChildBefore( unknown_variant_type unknown_variant_type_1, unknown_variant_type unknown_variant_type_2 )</code>|
MoveChildAfter|<code>DOTAPortrait.MoveChildAfter( unknown_variant_type unknown_variant_type_1, unknown_variant_type unknown_variant_type_2 )</code>|
GetPositionWithinWindow|<code>DOTAPortrait.GetPositionWithinWindow()</code>|
GetPositionWithinAncestor|<code>DOTAPortrait.GetPositionWithinAncestor( unknown_variant_type unknown_variant_type_1 )</code>|
ApplyStyles|<code>DOTAPortrait.ApplyStyles( boolean boolean_1 )</code>|
ClearPropertyFromCode|<code>DOTAPortrait.ClearPropertyFromCode( unknown_variant_type unknown_variant_type_1 )</code>|
DeleteAsync|<code>DOTAPortrait.DeleteAsync( float float_1 )</code>|
BIsTransparent|<code>DOTAPortrait.BIsTransparent()</code>|
BAcceptsInput|<code>DOTAPortrait.BAcceptsInput()</code>|
BAcceptsFocus|<code>DOTAPortrait.BAcceptsFocus()</code>|
SetFocus|<code>DOTAPortrait.SetFocus()</code>|
UpdateFocusInContext|<code>DOTAPortrait.UpdateFocusInContext()</code>|
BHasHoverStyle|<code>DOTAPortrait.BHasHoverStyle()</code>|
SetAcceptsFocus|<code>DOTAPortrait.SetAcceptsFocus( boolean boolean_1 )</code>|
SetDisableFocusOnMouseDown|<code>DOTAPortrait.SetDisableFocusOnMouseDown( boolean boolean_1 )</code>|
BHasKeyFocus|<code>DOTAPortrait.BHasKeyFocus()</code>|
SetScrollParentToFitWhenFocused|<code>DOTAPortrait.SetScrollParentToFitWhenFocused( boolean boolean_1 )</code>|
BScrollParentToFitWhenFocused|<code>DOTAPortrait.BScrollParentToFitWhenFocused()</code>|
IsSelected|<code>DOTAPortrait.IsSelected()</code>|
BHasDescendantKeyFocus|<code>DOTAPortrait.BHasDescendantKeyFocus()</code>|
BLoadLayout|<code>DOTAPortrait.BLoadLayout( cstring cstring_1, boolean boolean_2, boolean boolean_3 )</code>|
BLoadLayoutSnippet|<code>DOTAPortrait.BLoadLayoutSnippet( cstring cstring_1 )</code>|
BHasLayoutSnippet|<code>DOTAPortrait.BHasLayoutSnippet( cstring cstring_1 )</code>|
SetTopOfInputContext|<code>DOTAPortrait.SetTopOfInputContext( boolean boolean_1 )</code>|
SetDialogVariable|<code>DOTAPortrait.SetDialogVariable( cstring cstring_1, cstring cstring_2 )</code>|
SetDialogVariableInt|<code>DOTAPortrait.SetDialogVariableInt( cstring cstring_1, integer integer_2 )</code>|
SetDialogVariableTime|<code>DOTAPortrait.SetDialogVariableTime( cstring cstring_1, int64 int64_2 )</code>|
SetDialogVariableLocString|<code>DOTAPortrait.SetDialogVariableLocString( cstring cstring_1, cstring cstring_2 )</code>|
SetDialogVariablePluralLocStringInt|<code>DOTAPortrait.SetDialogVariablePluralLocStringInt( cstring cstring_1, cstring cstring_2, int64 int64_3 )</code>|
ScrollToTop|<code>DOTAPortrait.ScrollToTop()</code>|
ScrollToBottom|<code>DOTAPortrait.ScrollToBottom()</code>|
ScrollToLeftEdge|<code>DOTAPortrait.ScrollToLeftEdge()</code>|
ScrollToRightEdge|<code>DOTAPortrait.ScrollToRightEdge()</code>|
ScrollParentToMakePanelFit|<code>DOTAPortrait.ScrollParentToMakePanelFit( unknown_variant_type unknown_variant_type_1, boolean boolean_2 )</code>|
ScrollToFitRegion|<code>DOTAPortrait.ScrollToFitRegion( float float_1, float float_2, float float_3, float float_4, unknown_variant_type unknown_variant_type_5, boolean boolean_6, boolean boolean_7 )</code>|
BCanSeeInParentScroll|<code>DOTAPortrait.BCanSeeInParentScroll()</code>|
GetAttributeInt|<code>DOTAPortrait.GetAttributeInt( cstring cstring_1, integer integer_2 )</code>|
GetAttributeString|<code>DOTAPortrait.GetAttributeString( cstring cstring_1, cstring cstring_2 )</code>|
GetAttributeUInt32|<code>DOTAPortrait.GetAttributeUInt32( cstring cstring_1, unsigned unsigned_2 )</code>|
SetAttributeInt|<code>DOTAPortrait.SetAttributeInt( cstring cstring_1, integer integer_2 )</code>|
SetAttributeString|<code>DOTAPortrait.SetAttributeString( cstring cstring_1, cstring cstring_2 )</code>|
SetAttributeUInt32|<code>DOTAPortrait.SetAttributeUInt32( cstring cstring_1, unsigned unsigned_2 )</code>|
SetInputNamespace|<code>DOTAPortrait.SetInputNamespace( cstring cstring_1 )</code>|
RegisterForReadyEvents|<code>DOTAPortrait.RegisterForReadyEvents( boolean boolean_1 )</code>|
BReadyForDisplay|<code>DOTAPortrait.BReadyForDisplay()</code>|
SetReadyForDisplay|<code>DOTAPortrait.SetReadyForDisplay( boolean boolean_1 )</code>|
SetPositionInPixels|<code>DOTAPortrait.SetPositionInPixels( float float_1, float float_2, float float_3 )</code>|
Data|<code>DOTAPortrait.Data( js_raw_args js_raw_args_1 )</code>|
SetPanelEvent|<code>DOTAPortrait.SetPanelEvent( js_raw_args js_raw_args_1 )</code>|
RunScriptInPanelContext|<code>DOTAPortrait.RunScriptInPanelContext( js_raw_args js_raw_args_1 )</code>|
rememberchildfocus|<code>DOTAPortrait.rememberchildfocus( boolean boolean_1 )</code>|
paneltype|<code>DOTAPortrait.paneltype()</code>|


# DOTAHeroImage
Function|Signature|Description
--|--|--
visible|<code>DOTAHeroImage.visible( boolean boolean_1 )</code>|
enabled|<code>DOTAHeroImage.enabled( boolean boolean_1 )</code>|
checked|<code>DOTAHeroImage.checked( boolean boolean_1 )</code>|
defaultfocus|<code>DOTAHeroImage.defaultfocus( cstring cstring_1 )</code>|
inputnamespace|<code>DOTAHeroImage.inputnamespace( cstring cstring_1 )</code>|
hittest|<code>DOTAHeroImage.hittest( boolean boolean_1 )</code>|
hittestchildren|<code>DOTAHeroImage.hittestchildren( boolean boolean_1 )</code>|
tabindex|<code>DOTAHeroImage.tabindex( float float_1 )</code>|
selectionpos_x|<code>DOTAHeroImage.selectionpos_x( float float_1 )</code>|
selectionpos_y|<code>DOTAHeroImage.selectionpos_y( float float_1 )</code>|
type|<code>DOTAHeroImage.type()</code>|
id|<code>DOTAHeroImage.id()</code>|
layoutfile|<code>DOTAHeroImage.layoutfile()</code>|
contentwidth|<code>DOTAHeroImage.contentwidth()</code>|
contentheight|<code>DOTAHeroImage.contentheight()</code>|
desiredlayoutwidth|<code>DOTAHeroImage.desiredlayoutwidth()</code>|
desiredlayoutheight|<code>DOTAHeroImage.desiredlayoutheight()</code>|
actuallayoutwidth|<code>DOTAHeroImage.actuallayoutwidth()</code>|
actuallayoutheight|<code>DOTAHeroImage.actuallayoutheight()</code>|
actualxoffset|<code>DOTAHeroImage.actualxoffset()</code>|
actualyoffset|<code>DOTAHeroImage.actualyoffset()</code>|
scrolloffset_y|<code>DOTAHeroImage.scrolloffset_y()</code>|
scrolloffset_x|<code>DOTAHeroImage.scrolloffset_x()</code>|
actualuiscale_y|<code>DOTAHeroImage.actualuiscale_y()</code>|
actualuiscale_x|<code>DOTAHeroImage.actualuiscale_x()</code>|
style|<code>DOTAHeroImage.style()</code>|
AddClass|<code>DOTAHeroImage.AddClass( cstring cstring_1 )</code>|
RemoveClass|<code>DOTAHeroImage.RemoveClass( cstring cstring_1 )</code>|
BHasClass|<code>DOTAHeroImage.BHasClass( cstring cstring_1 )</code>|
BAscendantHasClass|<code>DOTAHeroImage.BAscendantHasClass( cstring cstring_1 )</code>|
SetHasClass|<code>DOTAHeroImage.SetHasClass( cstring cstring_1, boolean boolean_2 )</code>|
ToggleClass|<code>DOTAHeroImage.ToggleClass( cstring cstring_1 )</code>|
SwitchClass|<code>DOTAHeroImage.SwitchClass( cstring cstring_1, cstring cstring_2 )</code>|
TriggerClass|<code>DOTAHeroImage.TriggerClass( cstring cstring_1 )</code>|
ClearPanelEvent|<code>DOTAHeroImage.ClearPanelEvent( cstring cstring_1 )</code>|
SetDraggable|<code>DOTAHeroImage.SetDraggable( boolean boolean_1 )</code>|
IsDraggable|<code>DOTAHeroImage.IsDraggable()</code>|
IsSizeValid|<code>DOTAHeroImage.IsSizeValid()</code>|
GetChildCount|<code>DOTAHeroImage.GetChildCount()</code>|
GetChild|<code>DOTAHeroImage.GetChild( integer integer_1 )</code>|
GetChildIndex|<code>DOTAHeroImage.GetChildIndex( unknown_variant_type unknown_variant_type_1 )</code>|
Children|<code>DOTAHeroImage.Children()</code>|
FindChildrenWithClassTraverse|<code>DOTAHeroImage.FindChildrenWithClassTraverse( cstring cstring_1 )</code>|
GetParent|<code>DOTAHeroImage.GetParent()</code>|
SetParent|<code>DOTAHeroImage.SetParent( unknown_variant_type unknown_variant_type_1 )</code>|
FindChild|<code>DOTAHeroImage.FindChild( cstring cstring_1 )</code>|
FindChildTraverse|<code>DOTAHeroImage.FindChildTraverse( cstring cstring_1 )</code>|
FindChildInLayoutFile|<code>DOTAHeroImage.FindChildInLayoutFile( cstring cstring_1 )</code>|
FindPanelInLayoutFile|<code>DOTAHeroImage.FindPanelInLayoutFile( cstring cstring_1 )</code>|
FindAncestor|<code>DOTAHeroImage.FindAncestor( cstring cstring_1 )</code>|
RemoveAndDeleteChildren|<code>DOTAHeroImage.RemoveAndDeleteChildren()</code>|
MoveChildBefore|<code>DOTAHeroImage.MoveChildBefore( unknown_variant_type unknown_variant_type_1, unknown_variant_type unknown_variant_type_2 )</code>|
MoveChildAfter|<code>DOTAHeroImage.MoveChildAfter( unknown_variant_type unknown_variant_type_1, unknown_variant_type unknown_variant_type_2 )</code>|
GetPositionWithinWindow|<code>DOTAHeroImage.GetPositionWithinWindow()</code>|
GetPositionWithinAncestor|<code>DOTAHeroImage.GetPositionWithinAncestor( unknown_variant_type unknown_variant_type_1 )</code>|
ApplyStyles|<code>DOTAHeroImage.ApplyStyles( boolean boolean_1 )</code>|
ClearPropertyFromCode|<code>DOTAHeroImage.ClearPropertyFromCode( unknown_variant_type unknown_variant_type_1 )</code>|
DeleteAsync|<code>DOTAHeroImage.DeleteAsync( float float_1 )</code>|
BIsTransparent|<code>DOTAHeroImage.BIsTransparent()</code>|
BAcceptsInput|<code>DOTAHeroImage.BAcceptsInput()</code>|
BAcceptsFocus|<code>DOTAHeroImage.BAcceptsFocus()</code>|
SetFocus|<code>DOTAHeroImage.SetFocus()</code>|
UpdateFocusInContext|<code>DOTAHeroImage.UpdateFocusInContext()</code>|
BHasHoverStyle|<code>DOTAHeroImage.BHasHoverStyle()</code>|
SetAcceptsFocus|<code>DOTAHeroImage.SetAcceptsFocus( boolean boolean_1 )</code>|
SetDisableFocusOnMouseDown|<code>DOTAHeroImage.SetDisableFocusOnMouseDown( boolean boolean_1 )</code>|
BHasKeyFocus|<code>DOTAHeroImage.BHasKeyFocus()</code>|
SetScrollParentToFitWhenFocused|<code>DOTAHeroImage.SetScrollParentToFitWhenFocused( boolean boolean_1 )</code>|
BScrollParentToFitWhenFocused|<code>DOTAHeroImage.BScrollParentToFitWhenFocused()</code>|
IsSelected|<code>DOTAHeroImage.IsSelected()</code>|
BHasDescendantKeyFocus|<code>DOTAHeroImage.BHasDescendantKeyFocus()</code>|
BLoadLayout|<code>DOTAHeroImage.BLoadLayout( cstring cstring_1, boolean boolean_2, boolean boolean_3 )</code>|
BLoadLayoutSnippet|<code>DOTAHeroImage.BLoadLayoutSnippet( cstring cstring_1 )</code>|
BHasLayoutSnippet|<code>DOTAHeroImage.BHasLayoutSnippet( cstring cstring_1 )</code>|
SetTopOfInputContext|<code>DOTAHeroImage.SetTopOfInputContext( boolean boolean_1 )</code>|
SetDialogVariable|<code>DOTAHeroImage.SetDialogVariable( cstring cstring_1, cstring cstring_2 )</code>|
SetDialogVariableInt|<code>DOTAHeroImage.SetDialogVariableInt( cstring cstring_1, integer integer_2 )</code>|
SetDialogVariableTime|<code>DOTAHeroImage.SetDialogVariableTime( cstring cstring_1, int64 int64_2 )</code>|
SetDialogVariableLocString|<code>DOTAHeroImage.SetDialogVariableLocString( cstring cstring_1, cstring cstring_2 )</code>|
SetDialogVariablePluralLocStringInt|<code>DOTAHeroImage.SetDialogVariablePluralLocStringInt( cstring cstring_1, cstring cstring_2, int64 int64_3 )</code>|
ScrollToTop|<code>DOTAHeroImage.ScrollToTop()</code>|
ScrollToBottom|<code>DOTAHeroImage.ScrollToBottom()</code>|
ScrollToLeftEdge|<code>DOTAHeroImage.ScrollToLeftEdge()</code>|
ScrollToRightEdge|<code>DOTAHeroImage.ScrollToRightEdge()</code>|
ScrollParentToMakePanelFit|<code>DOTAHeroImage.ScrollParentToMakePanelFit( unknown_variant_type unknown_variant_type_1, boolean boolean_2 )</code>|
ScrollToFitRegion|<code>DOTAHeroImage.ScrollToFitRegion( float float_1, float float_2, float float_3, float float_4, unknown_variant_type unknown_variant_type_5, boolean boolean_6, boolean boolean_7 )</code>|
BCanSeeInParentScroll|<code>DOTAHeroImage.BCanSeeInParentScroll()</code>|
GetAttributeInt|<code>DOTAHeroImage.GetAttributeInt( cstring cstring_1, integer integer_2 )</code>|
GetAttributeString|<code>DOTAHeroImage.GetAttributeString( cstring cstring_1, cstring cstring_2 )</code>|
GetAttributeUInt32|<code>DOTAHeroImage.GetAttributeUInt32( cstring cstring_1, unsigned unsigned_2 )</code>|
SetAttributeInt|<code>DOTAHeroImage.SetAttributeInt( cstring cstring_1, integer integer_2 )</code>|
SetAttributeString|<code>DOTAHeroImage.SetAttributeString( cstring cstring_1, cstring cstring_2 )</code>|
SetAttributeUInt32|<code>DOTAHeroImage.SetAttributeUInt32( cstring cstring_1, unsigned unsigned_2 )</code>|
SetInputNamespace|<code>DOTAHeroImage.SetInputNamespace( cstring cstring_1 )</code>|
RegisterForReadyEvents|<code>DOTAHeroImage.RegisterForReadyEvents( boolean boolean_1 )</code>|
BReadyForDisplay|<code>DOTAHeroImage.BReadyForDisplay()</code>|
SetReadyForDisplay|<code>DOTAHeroImage.SetReadyForDisplay( boolean boolean_1 )</code>|
SetPositionInPixels|<code>DOTAHeroImage.SetPositionInPixels( float float_1, float float_2, float float_3 )</code>|
Data|<code>DOTAHeroImage.Data( js_raw_args js_raw_args_1 )</code>|
SetImage|<code>DOTAHeroImage.SetImage( cstring cstring_1 )</code>|
SetScaling|<code>DOTAHeroImage.SetScaling( cstring cstring_1 )</code>|
heroid|<code>DOTAHeroImage.heroid( integer integer_1 )</code>|
heroname|<code>DOTAHeroImage.heroname( cstring cstring_1 )</code>|
persona|<code>DOTAHeroImage.persona( unknown_variant_type unknown_variant_type_1 )</code>|
heroimagestyle|<code>DOTAHeroImage.heroimagestyle( cstring cstring_1 )</code>|
SetPanelEvent|<code>DOTAHeroImage.SetPanelEvent( js_raw_args js_raw_args_1 )</code>|
RunScriptInPanelContext|<code>DOTAHeroImage.RunScriptInPanelContext( js_raw_args js_raw_args_1 )</code>|
rememberchildfocus|<code>DOTAHeroImage.rememberchildfocus( boolean boolean_1 )</code>|
paneltype|<code>DOTAHeroImage.paneltype()</code>|


# DOTAAbilityImage
Function|Signature|Description
--|--|--
visible|<code>DOTAAbilityImage.visible( boolean boolean_1 )</code>|
enabled|<code>DOTAAbilityImage.enabled( boolean boolean_1 )</code>|
checked|<code>DOTAAbilityImage.checked( boolean boolean_1 )</code>|
defaultfocus|<code>DOTAAbilityImage.defaultfocus( cstring cstring_1 )</code>|
inputnamespace|<code>DOTAAbilityImage.inputnamespace( cstring cstring_1 )</code>|
hittest|<code>DOTAAbilityImage.hittest( boolean boolean_1 )</code>|
hittestchildren|<code>DOTAAbilityImage.hittestchildren( boolean boolean_1 )</code>|
tabindex|<code>DOTAAbilityImage.tabindex( float float_1 )</code>|
selectionpos_x|<code>DOTAAbilityImage.selectionpos_x( float float_1 )</code>|
selectionpos_y|<code>DOTAAbilityImage.selectionpos_y( float float_1 )</code>|
type|<code>DOTAAbilityImage.type()</code>|
id|<code>DOTAAbilityImage.id()</code>|
layoutfile|<code>DOTAAbilityImage.layoutfile()</code>|
contentwidth|<code>DOTAAbilityImage.contentwidth()</code>|
contentheight|<code>DOTAAbilityImage.contentheight()</code>|
desiredlayoutwidth|<code>DOTAAbilityImage.desiredlayoutwidth()</code>|
desiredlayoutheight|<code>DOTAAbilityImage.desiredlayoutheight()</code>|
actuallayoutwidth|<code>DOTAAbilityImage.actuallayoutwidth()</code>|
actuallayoutheight|<code>DOTAAbilityImage.actuallayoutheight()</code>|
actualxoffset|<code>DOTAAbilityImage.actualxoffset()</code>|
actualyoffset|<code>DOTAAbilityImage.actualyoffset()</code>|
scrolloffset_y|<code>DOTAAbilityImage.scrolloffset_y()</code>|
scrolloffset_x|<code>DOTAAbilityImage.scrolloffset_x()</code>|
actualuiscale_y|<code>DOTAAbilityImage.actualuiscale_y()</code>|
actualuiscale_x|<code>DOTAAbilityImage.actualuiscale_x()</code>|
style|<code>DOTAAbilityImage.style()</code>|
AddClass|<code>DOTAAbilityImage.AddClass( cstring cstring_1 )</code>|
RemoveClass|<code>DOTAAbilityImage.RemoveClass( cstring cstring_1 )</code>|
BHasClass|<code>DOTAAbilityImage.BHasClass( cstring cstring_1 )</code>|
BAscendantHasClass|<code>DOTAAbilityImage.BAscendantHasClass( cstring cstring_1 )</code>|
SetHasClass|<code>DOTAAbilityImage.SetHasClass( cstring cstring_1, boolean boolean_2 )</code>|
ToggleClass|<code>DOTAAbilityImage.ToggleClass( cstring cstring_1 )</code>|
SwitchClass|<code>DOTAAbilityImage.SwitchClass( cstring cstring_1, cstring cstring_2 )</code>|
TriggerClass|<code>DOTAAbilityImage.TriggerClass( cstring cstring_1 )</code>|
ClearPanelEvent|<code>DOTAAbilityImage.ClearPanelEvent( cstring cstring_1 )</code>|
SetDraggable|<code>DOTAAbilityImage.SetDraggable( boolean boolean_1 )</code>|
IsDraggable|<code>DOTAAbilityImage.IsDraggable()</code>|
IsSizeValid|<code>DOTAAbilityImage.IsSizeValid()</code>|
GetChildCount|<code>DOTAAbilityImage.GetChildCount()</code>|
GetChild|<code>DOTAAbilityImage.GetChild( integer integer_1 )</code>|
GetChildIndex|<code>DOTAAbilityImage.GetChildIndex( unknown_variant_type unknown_variant_type_1 )</code>|
Children|<code>DOTAAbilityImage.Children()</code>|
FindChildrenWithClassTraverse|<code>DOTAAbilityImage.FindChildrenWithClassTraverse( cstring cstring_1 )</code>|
GetParent|<code>DOTAAbilityImage.GetParent()</code>|
SetParent|<code>DOTAAbilityImage.SetParent( unknown_variant_type unknown_variant_type_1 )</code>|
FindChild|<code>DOTAAbilityImage.FindChild( cstring cstring_1 )</code>|
FindChildTraverse|<code>DOTAAbilityImage.FindChildTraverse( cstring cstring_1 )</code>|
FindChildInLayoutFile|<code>DOTAAbilityImage.FindChildInLayoutFile( cstring cstring_1 )</code>|
FindPanelInLayoutFile|<code>DOTAAbilityImage.FindPanelInLayoutFile( cstring cstring_1 )</code>|
FindAncestor|<code>DOTAAbilityImage.FindAncestor( cstring cstring_1 )</code>|
RemoveAndDeleteChildren|<code>DOTAAbilityImage.RemoveAndDeleteChildren()</code>|
MoveChildBefore|<code>DOTAAbilityImage.MoveChildBefore( unknown_variant_type unknown_variant_type_1, unknown_variant_type unknown_variant_type_2 )</code>|
MoveChildAfter|<code>DOTAAbilityImage.MoveChildAfter( unknown_variant_type unknown_variant_type_1, unknown_variant_type unknown_variant_type_2 )</code>|
GetPositionWithinWindow|<code>DOTAAbilityImage.GetPositionWithinWindow()</code>|
GetPositionWithinAncestor|<code>DOTAAbilityImage.GetPositionWithinAncestor( unknown_variant_type unknown_variant_type_1 )</code>|
ApplyStyles|<code>DOTAAbilityImage.ApplyStyles( boolean boolean_1 )</code>|
ClearPropertyFromCode|<code>DOTAAbilityImage.ClearPropertyFromCode( unknown_variant_type unknown_variant_type_1 )</code>|
DeleteAsync|<code>DOTAAbilityImage.DeleteAsync( float float_1 )</code>|
BIsTransparent|<code>DOTAAbilityImage.BIsTransparent()</code>|
BAcceptsInput|<code>DOTAAbilityImage.BAcceptsInput()</code>|
BAcceptsFocus|<code>DOTAAbilityImage.BAcceptsFocus()</code>|
SetFocus|<code>DOTAAbilityImage.SetFocus()</code>|
UpdateFocusInContext|<code>DOTAAbilityImage.UpdateFocusInContext()</code>|
BHasHoverStyle|<code>DOTAAbilityImage.BHasHoverStyle()</code>|
SetAcceptsFocus|<code>DOTAAbilityImage.SetAcceptsFocus( boolean boolean_1 )</code>|
SetDisableFocusOnMouseDown|<code>DOTAAbilityImage.SetDisableFocusOnMouseDown( boolean boolean_1 )</code>|
BHasKeyFocus|<code>DOTAAbilityImage.BHasKeyFocus()</code>|
SetScrollParentToFitWhenFocused|<code>DOTAAbilityImage.SetScrollParentToFitWhenFocused( boolean boolean_1 )</code>|
BScrollParentToFitWhenFocused|<code>DOTAAbilityImage.BScrollParentToFitWhenFocused()</code>|
IsSelected|<code>DOTAAbilityImage.IsSelected()</code>|
BHasDescendantKeyFocus|<code>DOTAAbilityImage.BHasDescendantKeyFocus()</code>|
BLoadLayout|<code>DOTAAbilityImage.BLoadLayout( cstring cstring_1, boolean boolean_2, boolean boolean_3 )</code>|
BLoadLayoutSnippet|<code>DOTAAbilityImage.BLoadLayoutSnippet( cstring cstring_1 )</code>|
BHasLayoutSnippet|<code>DOTAAbilityImage.BHasLayoutSnippet( cstring cstring_1 )</code>|
SetTopOfInputContext|<code>DOTAAbilityImage.SetTopOfInputContext( boolean boolean_1 )</code>|
SetDialogVariable|<code>DOTAAbilityImage.SetDialogVariable( cstring cstring_1, cstring cstring_2 )</code>|
SetDialogVariableInt|<code>DOTAAbilityImage.SetDialogVariableInt( cstring cstring_1, integer integer_2 )</code>|
SetDialogVariableTime|<code>DOTAAbilityImage.SetDialogVariableTime( cstring cstring_1, int64 int64_2 )</code>|
SetDialogVariableLocString|<code>DOTAAbilityImage.SetDialogVariableLocString( cstring cstring_1, cstring cstring_2 )</code>|
SetDialogVariablePluralLocStringInt|<code>DOTAAbilityImage.SetDialogVariablePluralLocStringInt( cstring cstring_1, cstring cstring_2, int64 int64_3 )</code>|
ScrollToTop|<code>DOTAAbilityImage.ScrollToTop()</code>|
ScrollToBottom|<code>DOTAAbilityImage.ScrollToBottom()</code>|
ScrollToLeftEdge|<code>DOTAAbilityImage.ScrollToLeftEdge()</code>|
ScrollToRightEdge|<code>DOTAAbilityImage.ScrollToRightEdge()</code>|
ScrollParentToMakePanelFit|<code>DOTAAbilityImage.ScrollParentToMakePanelFit( unknown_variant_type unknown_variant_type_1, boolean boolean_2 )</code>|
ScrollToFitRegion|<code>DOTAAbilityImage.ScrollToFitRegion( float float_1, float float_2, float float_3, float float_4, unknown_variant_type unknown_variant_type_5, boolean boolean_6, boolean boolean_7 )</code>|
BCanSeeInParentScroll|<code>DOTAAbilityImage.BCanSeeInParentScroll()</code>|
GetAttributeInt|<code>DOTAAbilityImage.GetAttributeInt( cstring cstring_1, integer integer_2 )</code>|
GetAttributeString|<code>DOTAAbilityImage.GetAttributeString( cstring cstring_1, cstring cstring_2 )</code>|
GetAttributeUInt32|<code>DOTAAbilityImage.GetAttributeUInt32( cstring cstring_1, unsigned unsigned_2 )</code>|
SetAttributeInt|<code>DOTAAbilityImage.SetAttributeInt( cstring cstring_1, integer integer_2 )</code>|
SetAttributeString|<code>DOTAAbilityImage.SetAttributeString( cstring cstring_1, cstring cstring_2 )</code>|
SetAttributeUInt32|<code>DOTAAbilityImage.SetAttributeUInt32( cstring cstring_1, unsigned unsigned_2 )</code>|
SetInputNamespace|<code>DOTAAbilityImage.SetInputNamespace( cstring cstring_1 )</code>|
RegisterForReadyEvents|<code>DOTAAbilityImage.RegisterForReadyEvents( boolean boolean_1 )</code>|
BReadyForDisplay|<code>DOTAAbilityImage.BReadyForDisplay()</code>|
SetReadyForDisplay|<code>DOTAAbilityImage.SetReadyForDisplay( boolean boolean_1 )</code>|
SetPositionInPixels|<code>DOTAAbilityImage.SetPositionInPixels( float float_1, float float_2, float float_3 )</code>|
Data|<code>DOTAAbilityImage.Data( js_raw_args js_raw_args_1 )</code>|
SetImage|<code>DOTAAbilityImage.SetImage( cstring cstring_1 )</code>|
SetScaling|<code>DOTAAbilityImage.SetScaling( cstring cstring_1 )</code>|
abilityid|<code>DOTAAbilityImage.abilityid( unknown_variant_type unknown_variant_type_1 )</code>|
abilityname|<code>DOTAAbilityImage.abilityname( cstring cstring_1 )</code>|
abilitylevel|<code>DOTAAbilityImage.abilitylevel( integer integer_1 )</code>|
contextEntityIndex|<code>DOTAAbilityImage.contextEntityIndex( unknown_variant_type unknown_variant_type_1 )</code>|
SetPanelEvent|<code>DOTAAbilityImage.SetPanelEvent( js_raw_args js_raw_args_1 )</code>|
RunScriptInPanelContext|<code>DOTAAbilityImage.RunScriptInPanelContext( js_raw_args js_raw_args_1 )</code>|
rememberchildfocus|<code>DOTAAbilityImage.rememberchildfocus( boolean boolean_1 )</code>|
paneltype|<code>DOTAAbilityImage.paneltype()</code>|

# SteamUGCQuery
Enumerator|Value|Description
--|--|--
SteamUGCQuery.RankedByVote|0|
SteamUGCQuery.RankedByPublicationDate|1|
SteamUGCQuery.AcceptedForGameRankedByAcceptanceDate|2|
SteamUGCQuery.RankedByTrend|3|
SteamUGCQuery.FavoritedByFriendsRankedByPublicationDate|4|
SteamUGCQuery.CreatedByFriendsRankedByPublicationDate|5|
SteamUGCQuery.RankedByNumTimesReported|6|
SteamUGCQuery.CreatedByFollowedUsersRankedByPublicationDate|7|
SteamUGCQuery.NotYetRated|8|
SteamUGCQuery.RankedByTotalVotesAsc|9|
SteamUGCQuery.RankedByVotesUp|10|
SteamUGCQuery.RankedByTextSearch|11|
SteamUGCQuery.RankedByTotalUniqueSubscriptions|12|
SteamUGCQuery.RankedByPlaytimeTrend|13|
SteamUGCQuery.RankedByTotalPlaytime|14|
SteamUGCQuery.RankedByAveragePlaytimeTrend|15|
SteamUGCQuery.RankedByLifetimeAveragePlaytime|16|
SteamUGCQuery.RankedByPlaytimeSessionsTrend|17|
SteamUGCQuery.RankedByLifetimePlaytimeSessions|18|

# SteamUGCMatchingUGCType
Enumerator|Value|Description
--|--|--
SteamUGCMatchingUGCType.Items|0|
SteamUGCMatchingUGCType.Items_Mtx|1|
SteamUGCMatchingUGCType.Items_ReadyToUse|2|
SteamUGCMatchingUGCType.Collections|3|
SteamUGCMatchingUGCType.Artwork|4|
SteamUGCMatchingUGCType.Videos|5|
SteamUGCMatchingUGCType.Screenshots|6|
SteamUGCMatchingUGCType.AllGuides|7|
SteamUGCMatchingUGCType.WebGuides|8|
SteamUGCMatchingUGCType.IntegratedGuides|9|
SteamUGCMatchingUGCType.UsableInGame|10|
SteamUGCMatchingUGCType.ControllerBindings|11|
SteamUGCMatchingUGCType.GameManagedItems|12|
SteamUGCMatchingUGCType.All|-1|

# SteamUniverse
Enumerator|Value|Description
--|--|--
SteamUniverse.Invalid|0|
SteamUniverse.Internal|3|
SteamUniverse.Dev|4|
SteamUniverse.Beta|2|
SteamUniverse.Public|1|

# DOTA_GameState
Enumerator|Value|Description
--|--|--
DOTA_GameState.DOTA_GAMERULES_STATE_INIT|0|
DOTA_GameState.DOTA_GAMERULES_STATE_WAIT_FOR_PLAYERS_TO_LOAD|1|
DOTA_GameState.DOTA_GAMERULES_STATE_HERO_SELECTION|4|
DOTA_GameState.DOTA_GAMERULES_STATE_STRATEGY_TIME|5|
DOTA_GameState.DOTA_GAMERULES_STATE_PRE_GAME|8|
DOTA_GameState.DOTA_GAMERULES_STATE_GAME_IN_PROGRESS|10|
DOTA_GameState.DOTA_GAMERULES_STATE_POST_GAME|11|
DOTA_GameState.DOTA_GAMERULES_STATE_DISCONNECT|12|
DOTA_GameState.DOTA_GAMERULES_STATE_TEAM_SHOWCASE|6|
DOTA_GameState.DOTA_GAMERULES_STATE_CUSTOM_GAME_SETUP|2|
DOTA_GameState.DOTA_GAMERULES_STATE_WAIT_FOR_MAP_TO_LOAD|7|
DOTA_GameState.DOTA_GAMERULES_STATE_SCENARIO_SETUP|9|
DOTA_GameState.DOTA_GAMERULES_STATE_PLAYER_DRAFT|3|
DOTA_GameState.DOTA_GAMERULES_STATE_LAST|0|

# DOTA_GC_TEAM
Enumerator|Value|Description
--|--|--
DOTA_GC_TEAM.DOTA_GC_TEAM_GOOD_GUYS|0|
DOTA_GC_TEAM.DOTA_GC_TEAM_BAD_GUYS|1|
DOTA_GC_TEAM.DOTA_GC_TEAM_BROADCASTER|2|
DOTA_GC_TEAM.DOTA_GC_TEAM_SPECTATOR|3|
DOTA_GC_TEAM.DOTA_GC_TEAM_PLAYER_POOL|4|
DOTA_GC_TEAM.DOTA_GC_TEAM_NOTEAM|5|
DOTA_GC_TEAM.DOTA_GC_TEAM_CUSTOM_1|6|
DOTA_GC_TEAM.DOTA_GC_TEAM_CUSTOM_2|7|
DOTA_GC_TEAM.DOTA_GC_TEAM_CUSTOM_3|8|
DOTA_GC_TEAM.DOTA_GC_TEAM_CUSTOM_4|9|
DOTA_GC_TEAM.DOTA_GC_TEAM_CUSTOM_5|10|
DOTA_GC_TEAM.DOTA_GC_TEAM_CUSTOM_6|11|
DOTA_GC_TEAM.DOTA_GC_TEAM_CUSTOM_7|12|
DOTA_GC_TEAM.DOTA_GC_TEAM_CUSTOM_8|13|
DOTA_GC_TEAM.DOTA_GC_TEAM_NEUTRALS|14|

# DOTA_GameMode
Enumerator|Value|Description
--|--|--
DOTA_GameMode.DOTA_GAMEMODE_NONE|0|
DOTA_GameMode.DOTA_GAMEMODE_AP|1|
DOTA_GameMode.DOTA_GAMEMODE_CM|2|
DOTA_GameMode.DOTA_GAMEMODE_RD|3|
DOTA_GameMode.DOTA_GAMEMODE_SD|4|
DOTA_GameMode.DOTA_GAMEMODE_AR|5|
DOTA_GameMode.DOTA_GAMEMODE_INTRO|6|
DOTA_GameMode.DOTA_GAMEMODE_HW|7|
DOTA_GameMode.DOTA_GAMEMODE_REVERSE_CM|8|
DOTA_GameMode.DOTA_GAMEMODE_XMAS|9|
DOTA_GameMode.DOTA_GAMEMODE_TUTORIAL|10|
DOTA_GameMode.DOTA_GAMEMODE_MO|11|
DOTA_GameMode.DOTA_GAMEMODE_LP|12|
DOTA_GameMode.DOTA_GAMEMODE_POOL1|13|
DOTA_GameMode.DOTA_GAMEMODE_FH|14|
DOTA_GameMode.DOTA_GAMEMODE_CUSTOM|15|
DOTA_GameMode.DOTA_GAMEMODE_CD|16|
DOTA_GameMode.DOTA_GAMEMODE_BD|17|
DOTA_GameMode.DOTA_GAMEMODE_ABILITY_DRAFT|18|
DOTA_GameMode.DOTA_GAMEMODE_EVENT|19|
DOTA_GameMode.DOTA_GAMEMODE_ARDM|20|
DOTA_GameMode.DOTA_GAMEMODE_1V1MID|21|
DOTA_GameMode.DOTA_GAMEMODE_ALL_DRAFT|22|
DOTA_GameMode.DOTA_GAMEMODE_TURBO|23|
DOTA_GameMode.DOTA_GAMEMODE_MUTATION|24|
DOTA_GameMode.DOTA_GAMEMODE_COACHES_CHALLENGE|25|

# DOTAConnectionState_t
Enumerator|Value|Description
--|--|--
DOTAConnectionState_t.DOTA_CONNECTION_STATE_UNKNOWN|0|
DOTAConnectionState_t.DOTA_CONNECTION_STATE_NOT_YET_CONNECTED|1|
DOTAConnectionState_t.DOTA_CONNECTION_STATE_CONNECTED|2|
DOTAConnectionState_t.DOTA_CONNECTION_STATE_DISCONNECTED|3|
DOTAConnectionState_t.DOTA_CONNECTION_STATE_ABANDONED|4|
DOTAConnectionState_t.DOTA_CONNECTION_STATE_LOADING|5|
DOTAConnectionState_t.DOTA_CONNECTION_STATE_FAILED|6|

# dotaunitorder_t
Enumerator|Value|Description
--|--|--
dotaunitorder_t.DOTA_UNIT_ORDER_NONE|0|
dotaunitorder_t.DOTA_UNIT_ORDER_MOVE_TO_POSITION|1|
dotaunitorder_t.DOTA_UNIT_ORDER_MOVE_TO_TARGET|2|
dotaunitorder_t.DOTA_UNIT_ORDER_ATTACK_MOVE|3|
dotaunitorder_t.DOTA_UNIT_ORDER_ATTACK_TARGET|4|
dotaunitorder_t.DOTA_UNIT_ORDER_CAST_POSITION|5|
dotaunitorder_t.DOTA_UNIT_ORDER_CAST_TARGET|6|
dotaunitorder_t.DOTA_UNIT_ORDER_CAST_TARGET_TREE|7|
dotaunitorder_t.DOTA_UNIT_ORDER_CAST_NO_TARGET|8|
dotaunitorder_t.DOTA_UNIT_ORDER_CAST_TOGGLE|9|
dotaunitorder_t.DOTA_UNIT_ORDER_HOLD_POSITION|10|
dotaunitorder_t.DOTA_UNIT_ORDER_TRAIN_ABILITY|11|
dotaunitorder_t.DOTA_UNIT_ORDER_DROP_ITEM|12|
dotaunitorder_t.DOTA_UNIT_ORDER_GIVE_ITEM|13|
dotaunitorder_t.DOTA_UNIT_ORDER_PICKUP_ITEM|14|
dotaunitorder_t.DOTA_UNIT_ORDER_PICKUP_RUNE|15|
dotaunitorder_t.DOTA_UNIT_ORDER_PURCHASE_ITEM|16|
dotaunitorder_t.DOTA_UNIT_ORDER_SELL_ITEM|17|
dotaunitorder_t.DOTA_UNIT_ORDER_DISASSEMBLE_ITEM|18|
dotaunitorder_t.DOTA_UNIT_ORDER_MOVE_ITEM|19|
dotaunitorder_t.DOTA_UNIT_ORDER_CAST_TOGGLE_AUTO|20|
dotaunitorder_t.DOTA_UNIT_ORDER_STOP|21|
dotaunitorder_t.DOTA_UNIT_ORDER_TAUNT|22|
dotaunitorder_t.DOTA_UNIT_ORDER_BUYBACK|23|
dotaunitorder_t.DOTA_UNIT_ORDER_GLYPH|24|
dotaunitorder_t.DOTA_UNIT_ORDER_EJECT_ITEM_FROM_STASH|25|
dotaunitorder_t.DOTA_UNIT_ORDER_CAST_RUNE|26|
dotaunitorder_t.DOTA_UNIT_ORDER_PING_ABILITY|27|
dotaunitorder_t.DOTA_UNIT_ORDER_MOVE_TO_DIRECTION|28|
dotaunitorder_t.DOTA_UNIT_ORDER_PATROL|29|
dotaunitorder_t.DOTA_UNIT_ORDER_VECTOR_TARGET_POSITION|30|
dotaunitorder_t.DOTA_UNIT_ORDER_RADAR|31|
dotaunitorder_t.DOTA_UNIT_ORDER_SET_ITEM_COMBINE_LOCK|32|
dotaunitorder_t.DOTA_UNIT_ORDER_CONTINUE|33|
dotaunitorder_t.DOTA_UNIT_ORDER_VECTOR_TARGET_CANCELED|34|
dotaunitorder_t.DOTA_UNIT_ORDER_CAST_RIVER_PAINT|35|
dotaunitorder_t.DOTA_UNIT_ORDER_PREGAME_ADJUST_ITEM_ASSIGNMENT|36|
dotaunitorder_t.DOTA_UNIT_ORDER_DROP_ITEM_AT_FOUNTAIN|37|
dotaunitorder_t.DOTA_UNIT_ORDER_TAKE_ITEM_FROM_NEUTRAL_ITEM_STASH|38|
dotaunitorder_t.DOTA_UNIT_ORDER_MOVE_RELATIVE|39|

# DOTA_OVERHEAD_ALERT
Enumerator|Value|Description
--|--|--
DOTA_OVERHEAD_ALERT.OVERHEAD_ALERT_GOLD|0|
DOTA_OVERHEAD_ALERT.OVERHEAD_ALERT_DENY|1|
DOTA_OVERHEAD_ALERT.OVERHEAD_ALERT_CRITICAL|2|
DOTA_OVERHEAD_ALERT.OVERHEAD_ALERT_XP|3|
DOTA_OVERHEAD_ALERT.OVERHEAD_ALERT_BONUS_SPELL_DAMAGE|4|
DOTA_OVERHEAD_ALERT.OVERHEAD_ALERT_MISS|5|
DOTA_OVERHEAD_ALERT.OVERHEAD_ALERT_DAMAGE|6|
DOTA_OVERHEAD_ALERT.OVERHEAD_ALERT_EVADE|7|
DOTA_OVERHEAD_ALERT.OVERHEAD_ALERT_BLOCK|8|
DOTA_OVERHEAD_ALERT.OVERHEAD_ALERT_BONUS_POISON_DAMAGE|9|
DOTA_OVERHEAD_ALERT.OVERHEAD_ALERT_HEAL|10|
DOTA_OVERHEAD_ALERT.OVERHEAD_ALERT_MANA_ADD|11|
DOTA_OVERHEAD_ALERT.OVERHEAD_ALERT_MANA_LOSS|12|
DOTA_OVERHEAD_ALERT.OVERHEAD_ALERT_LAST_HIT_EARLY|13|
DOTA_OVERHEAD_ALERT.OVERHEAD_ALERT_LAST_HIT_CLOSE|14|
DOTA_OVERHEAD_ALERT.OVERHEAD_ALERT_LAST_HIT_MISS|15|
DOTA_OVERHEAD_ALERT.OVERHEAD_ALERT_MAGICAL_BLOCK|16|
DOTA_OVERHEAD_ALERT.OVERHEAD_ALERT_INCOMING_DAMAGE|17|
DOTA_OVERHEAD_ALERT.OVERHEAD_ALERT_OUTGOING_DAMAGE|18|
DOTA_OVERHEAD_ALERT.OVERHEAD_ALERT_DISABLE_RESIST|19|
DOTA_OVERHEAD_ALERT.OVERHEAD_ALERT_DEATH|20|
DOTA_OVERHEAD_ALERT.OVERHEAD_ALERT_BLOCKED|21|
DOTA_OVERHEAD_ALERT.OVERHEAD_ALERT_ITEM_RECEIVED|22|
DOTA_OVERHEAD_ALERT.OVERHEAD_ALERT_SHARD|23|
DOTA_OVERHEAD_ALERT.OVERHEAD_ALERT_DEADLY_BLOW|24|

# DOTA_HeroPickState
Enumerator|Value|Description
--|--|--
DOTA_HeroPickState.DOTA_HEROPICK_STATE_NONE|0|
DOTA_HeroPickState.DOTA_HEROPICK_STATE_AP_SELECT|1|
DOTA_HeroPickState.DOTA_HEROPICK_STATE_SD_SELECT|2|
DOTA_HeroPickState.DOTA_HEROPICK_STATE_INTRO_SELECT_UNUSED|3|
DOTA_HeroPickState.DOTA_HEROPICK_STATE_RD_SELECT_UNUSED|4|
DOTA_HeroPickState.DOTA_HEROPICK_STATE_CM_INTRO|5|
DOTA_HeroPickState.DOTA_HEROPICK_STATE_CM_CAPTAINPICK|6|
DOTA_HeroPickState.DOTA_HEROPICK_STATE_CM_BAN1|7|
DOTA_HeroPickState.DOTA_HEROPICK_STATE_CM_BAN2|8|
DOTA_HeroPickState.DOTA_HEROPICK_STATE_CM_BAN3|9|
DOTA_HeroPickState.DOTA_HEROPICK_STATE_CM_BAN4|10|
DOTA_HeroPickState.DOTA_HEROPICK_STATE_CM_BAN5|11|
DOTA_HeroPickState.DOTA_HEROPICK_STATE_CM_BAN6|12|
DOTA_HeroPickState.DOTA_HEROPICK_STATE_CM_BAN7|13|
DOTA_HeroPickState.DOTA_HEROPICK_STATE_CM_BAN8|14|
DOTA_HeroPickState.DOTA_HEROPICK_STATE_CM_BAN9|15|
DOTA_HeroPickState.DOTA_HEROPICK_STATE_CM_BAN10|16|
DOTA_HeroPickState.DOTA_HEROPICK_STATE_CM_BAN11|17|
DOTA_HeroPickState.DOTA_HEROPICK_STATE_CM_BAN12|18|
DOTA_HeroPickState.DOTA_HEROPICK_STATE_CM_BAN13|19|
DOTA_HeroPickState.DOTA_HEROPICK_STATE_CM_BAN14|20|
DOTA_HeroPickState.DOTA_HEROPICK_STATE_CM_SELECT1|21|
DOTA_HeroPickState.DOTA_HEROPICK_STATE_CM_SELECT2|22|
DOTA_HeroPickState.DOTA_HEROPICK_STATE_CM_SELECT3|23|
DOTA_HeroPickState.DOTA_HEROPICK_STATE_CM_SELECT4|24|
DOTA_HeroPickState.DOTA_HEROPICK_STATE_CM_SELECT5|25|
DOTA_HeroPickState.DOTA_HEROPICK_STATE_CM_SELECT6|26|
DOTA_HeroPickState.DOTA_HEROPICK_STATE_CM_SELECT7|27|
DOTA_HeroPickState.DOTA_HEROPICK_STATE_CM_SELECT8|28|
DOTA_HeroPickState.DOTA_HEROPICK_STATE_CM_SELECT9|29|
DOTA_HeroPickState.DOTA_HEROPICK_STATE_CM_SELECT10|30|
DOTA_HeroPickState.DOTA_HEROPICK_STATE_CM_PICK|31|
DOTA_HeroPickState.DOTA_HEROPICK_STATE_AR_SELECT|32|
DOTA_HeroPickState.DOTA_HEROPICK_STATE_MO_SELECT|33|
DOTA_HeroPickState.DOTA_HEROPICK_STATE_FH_SELECT|34|
DOTA_HeroPickState.DOTA_HEROPICK_STATE_CD_INTRO|35|
DOTA_HeroPickState.DOTA_HEROPICK_STATE_CD_CAPTAINPICK|36|
DOTA_HeroPickState.DOTA_HEROPICK_STATE_CD_BAN1|37|
DOTA_HeroPickState.DOTA_HEROPICK_STATE_CD_BAN2|38|
DOTA_HeroPickState.DOTA_HEROPICK_STATE_CD_BAN3|39|
DOTA_HeroPickState.DOTA_HEROPICK_STATE_CD_BAN4|40|
DOTA_HeroPickState.DOTA_HEROPICK_STATE_CD_BAN5|41|
DOTA_HeroPickState.DOTA_HEROPICK_STATE_CD_BAN6|42|
DOTA_HeroPickState.DOTA_HEROPICK_STATE_CD_SELECT1|43|
DOTA_HeroPickState.DOTA_HEROPICK_STATE_CD_SELECT2|44|
DOTA_HeroPickState.DOTA_HEROPICK_STATE_CD_SELECT3|45|
DOTA_HeroPickState.DOTA_HEROPICK_STATE_CD_SELECT4|46|
DOTA_HeroPickState.DOTA_HEROPICK_STATE_CD_SELECT5|47|
DOTA_HeroPickState.DOTA_HEROPICK_STATE_CD_SELECT6|48|
DOTA_HeroPickState.DOTA_HEROPICK_STATE_CD_SELECT7|49|
DOTA_HeroPickState.DOTA_HEROPICK_STATE_CD_SELECT8|50|
DOTA_HeroPickState.DOTA_HEROPICK_STATE_CD_SELECT9|51|
DOTA_HeroPickState.DOTA_HEROPICK_STATE_CD_SELECT10|52|
DOTA_HeroPickState.DOTA_HEROPICK_STATE_CD_PICK|53|
DOTA_HeroPickState.DOTA_HEROPICK_STATE_BD_SELECT|54|
DOTA_HeroPickState.DOTA_HERO_PICK_STATE_ABILITY_DRAFT_SELECT|55|
DOTA_HeroPickState.DOTA_HERO_PICK_STATE_ARDM_SELECT|56|
DOTA_HeroPickState.DOTA_HEROPICK_STATE_ALL_DRAFT_SELECT|57|
DOTA_HeroPickState.DOTA_HERO_PICK_STATE_CUSTOMGAME_SELECT|58|
DOTA_HeroPickState.DOTA_HEROPICK_STATE_SELECT_PENALTY|59|
DOTA_HeroPickState.DOTA_HEROPICK_STATE_CUSTOM_PICK_RULES|60|
DOTA_HeroPickState.DOTA_HEROPICK_STATE_SCENARIO_PICK|61|
DOTA_HeroPickState.DOTA_HEROPICK_STATE_COUNT|62|

# DOTATeam_t
Enumerator|Value|Description
--|--|--
DOTATeam_t.DOTA_TEAM_FIRST|2|
DOTATeam_t.DOTA_TEAM_GOODGUYS|2|
DOTATeam_t.DOTA_TEAM_BADGUYS|3|
DOTATeam_t.DOTA_TEAM_NEUTRALS|4|
DOTATeam_t.DOTA_TEAM_NOTEAM|5|
DOTATeam_t.DOTA_TEAM_CUSTOM_1|6|
DOTATeam_t.DOTA_TEAM_CUSTOM_2|7|
DOTATeam_t.DOTA_TEAM_CUSTOM_3|8|
DOTATeam_t.DOTA_TEAM_CUSTOM_4|9|
DOTATeam_t.DOTA_TEAM_CUSTOM_5|10|
DOTATeam_t.DOTA_TEAM_CUSTOM_6|11|
DOTATeam_t.DOTA_TEAM_CUSTOM_7|12|
DOTATeam_t.DOTA_TEAM_CUSTOM_8|13|
DOTATeam_t.DOTA_TEAM_DRAFT_POOL|14|
DOTATeam_t.DOTA_TEAM_COUNT|15|
DOTATeam_t.DOTA_TEAM_CUSTOM_MIN|6|
DOTATeam_t.DOTA_TEAM_CUSTOM_MAX|13|
DOTATeam_t.DOTA_TEAM_CUSTOM_COUNT|8|

# DOTA_RUNES
Enumerator|Value|Description
--|--|--
DOTA_RUNES.DOTA_RUNE_INVALID|-1|
DOTA_RUNES.DOTA_RUNE_DOUBLEDAMAGE|0|
DOTA_RUNES.DOTA_RUNE_HASTE|1|
DOTA_RUNES.DOTA_RUNE_ILLUSION|2|
DOTA_RUNES.DOTA_RUNE_INVISIBILITY|3|
DOTA_RUNES.DOTA_RUNE_REGENERATION|4|
DOTA_RUNES.DOTA_RUNE_BOUNTY|5|
DOTA_RUNES.DOTA_RUNE_ARCANE|6|
DOTA_RUNES.DOTA_RUNE_WATER|7|
DOTA_RUNES.DOTA_RUNE_XP|8|
DOTA_RUNES.DOTA_RUNE_SHIELD|9|
DOTA_RUNES.DOTA_RUNE_COUNT|10|

# DOTA_UNIT_TARGET_TEAM
Enumerator|Value|Description
--|--|--
DOTA_UNIT_TARGET_TEAM.DOTA_UNIT_TARGET_TEAM_NONE|0|
DOTA_UNIT_TARGET_TEAM.DOTA_UNIT_TARGET_TEAM_FRIENDLY|1|
DOTA_UNIT_TARGET_TEAM.DOTA_UNIT_TARGET_TEAM_ENEMY|2|
DOTA_UNIT_TARGET_TEAM.DOTA_UNIT_TARGET_TEAM_CUSTOM|4|
DOTA_UNIT_TARGET_TEAM.DOTA_UNIT_TARGET_TEAM_BOTH|3|

# DOTA_UNIT_TARGET_TYPE
Enumerator|Value|Description
--|--|--
DOTA_UNIT_TARGET_TYPE.DOTA_UNIT_TARGET_NONE|0|
DOTA_UNIT_TARGET_TYPE.DOTA_UNIT_TARGET_HERO|1|
DOTA_UNIT_TARGET_TYPE.DOTA_UNIT_TARGET_CREEP|2|
DOTA_UNIT_TARGET_TYPE.DOTA_UNIT_TARGET_BUILDING|4|
DOTA_UNIT_TARGET_TYPE.DOTA_UNIT_TARGET_COURIER|16|
DOTA_UNIT_TARGET_TYPE.DOTA_UNIT_TARGET_OTHER|32|
DOTA_UNIT_TARGET_TYPE.DOTA_UNIT_TARGET_TREE|64|
DOTA_UNIT_TARGET_TYPE.DOTA_UNIT_TARGET_CUSTOM|128|
DOTA_UNIT_TARGET_TYPE.DOTA_UNIT_TARGET_SELF|256|
DOTA_UNIT_TARGET_TYPE.DOTA_UNIT_TARGET_BASIC|18|
DOTA_UNIT_TARGET_TYPE.DOTA_UNIT_TARGET_ALL|55|

# DOTA_UNIT_TARGET_FLAGS
Enumerator|Value|Description
--|--|--
DOTA_UNIT_TARGET_FLAGS.DOTA_UNIT_TARGET_FLAG_NONE|0|
DOTA_UNIT_TARGET_FLAGS.DOTA_UNIT_TARGET_FLAG_RANGED_ONLY|2|
DOTA_UNIT_TARGET_FLAGS.DOTA_UNIT_TARGET_FLAG_MELEE_ONLY|4|
DOTA_UNIT_TARGET_FLAGS.DOTA_UNIT_TARGET_FLAG_DEAD|8|
DOTA_UNIT_TARGET_FLAGS.DOTA_UNIT_TARGET_FLAG_MAGIC_IMMUNE_ENEMIES|16|
DOTA_UNIT_TARGET_FLAGS.DOTA_UNIT_TARGET_FLAG_NOT_MAGIC_IMMUNE_ALLIES|32|
DOTA_UNIT_TARGET_FLAGS.DOTA_UNIT_TARGET_FLAG_INVULNERABLE|64|
DOTA_UNIT_TARGET_FLAGS.DOTA_UNIT_TARGET_FLAG_FOW_VISIBLE|128|
DOTA_UNIT_TARGET_FLAGS.DOTA_UNIT_TARGET_FLAG_NO_INVIS|256|
DOTA_UNIT_TARGET_FLAGS.DOTA_UNIT_TARGET_FLAG_NOT_ANCIENTS|512|
DOTA_UNIT_TARGET_FLAGS.DOTA_UNIT_TARGET_FLAG_PLAYER_CONTROLLED|1024|
DOTA_UNIT_TARGET_FLAGS.DOTA_UNIT_TARGET_FLAG_NOT_DOMINATED|2048|
DOTA_UNIT_TARGET_FLAGS.DOTA_UNIT_TARGET_FLAG_NOT_SUMMONED|4096|
DOTA_UNIT_TARGET_FLAGS.DOTA_UNIT_TARGET_FLAG_NOT_ILLUSIONS|8192|
DOTA_UNIT_TARGET_FLAGS.DOTA_UNIT_TARGET_FLAG_NOT_ATTACK_IMMUNE|16384|
DOTA_UNIT_TARGET_FLAGS.DOTA_UNIT_TARGET_FLAG_MANA_ONLY|32768|
DOTA_UNIT_TARGET_FLAGS.DOTA_UNIT_TARGET_FLAG_CHECK_DISABLE_HELP|65536|
DOTA_UNIT_TARGET_FLAGS.DOTA_UNIT_TARGET_FLAG_NOT_CREEP_HERO|131072|
DOTA_UNIT_TARGET_FLAGS.DOTA_UNIT_TARGET_FLAG_OUT_OF_WORLD|262144|
DOTA_UNIT_TARGET_FLAGS.DOTA_UNIT_TARGET_FLAG_NOT_NIGHTMARED|524288|
DOTA_UNIT_TARGET_FLAGS.DOTA_UNIT_TARGET_FLAG_PREFER_ENEMIES|1048576|
DOTA_UNIT_TARGET_FLAGS.DOTA_UNIT_TARGET_FLAG_RESPECT_OBSTRUCTIONS|2097152|

# DOTALimits_t
Enumerator|Value|Description
--|--|--
DOTALimits_t.DOTA_MAX_PLAYERS|64|Max number of players connected to the server including spectators.
DOTALimits_t.DOTA_MAX_TEAM|24|Max number of players per team.
DOTALimits_t.DOTA_MAX_PLAYER_TEAMS|10|Max number of player teams supported.
DOTALimits_t.DOTA_MAX_TEAM_PLAYERS|24|Max number of non-spectator players supported.
DOTALimits_t.DOTA_MAX_SPECTATOR_TEAM_SIZE|40|How many spectators can watch.
DOTALimits_t.DOTA_MAX_SPECTATOR_LOBBY_SIZE|15|Max number of viewers in a spectator lobby.
DOTALimits_t.DOTA_DEFAULT_MAX_TEAM|5|Default number of players per team.
DOTALimits_t.DOTA_DEFAULT_MAX_TEAM_PLAYERS|10|Default number of non-spectator players supported.

# DOTAInventoryFlags_t
Enumerator|Value|Description
--|--|--
DOTAInventoryFlags_t.DOTA_INVENTORY_ALLOW_NONE|0|
DOTAInventoryFlags_t.DOTA_INVENTORY_ALLOW_MAIN|1|
DOTAInventoryFlags_t.DOTA_INVENTORY_ALLOW_STASH|2|
DOTAInventoryFlags_t.DOTA_INVENTORY_ALLOW_DROP_ON_GROUND|4|
DOTAInventoryFlags_t.DOTA_INVENTORY_ALLOW_DROP_AT_FOUNTAIN|8|
DOTAInventoryFlags_t.DOTA_INVENTORY_LIMIT_DROP_ON_GROUND|16|
DOTAInventoryFlags_t.DOTA_INVENTORY_ALL_ACCESS|3|

# EDOTA_ModifyGold_Reason
Enumerator|Value|Description
--|--|--
EDOTA_ModifyGold_Reason.DOTA_ModifyGold_Unspecified|0|
EDOTA_ModifyGold_Reason.DOTA_ModifyGold_Death|1|
EDOTA_ModifyGold_Reason.DOTA_ModifyGold_Buyback|2|
EDOTA_ModifyGold_Reason.DOTA_ModifyGold_PurchaseConsumable|3|
EDOTA_ModifyGold_Reason.DOTA_ModifyGold_PurchaseItem|4|
EDOTA_ModifyGold_Reason.DOTA_ModifyGold_AbandonedRedistribute|5|
EDOTA_ModifyGold_Reason.DOTA_ModifyGold_SellItem|6|
EDOTA_ModifyGold_Reason.DOTA_ModifyGold_AbilityCost|7|
EDOTA_ModifyGold_Reason.DOTA_ModifyGold_CheatCommand|8|
EDOTA_ModifyGold_Reason.DOTA_ModifyGold_SelectionPenalty|9|
EDOTA_ModifyGold_Reason.DOTA_ModifyGold_GameTick|10|
EDOTA_ModifyGold_Reason.DOTA_ModifyGold_Building|11|
EDOTA_ModifyGold_Reason.DOTA_ModifyGold_HeroKill|12|
EDOTA_ModifyGold_Reason.DOTA_ModifyGold_CreepKill|13|
EDOTA_ModifyGold_Reason.DOTA_ModifyGold_NeutralKill|14|
EDOTA_ModifyGold_Reason.DOTA_ModifyGold_RoshanKill|15|
EDOTA_ModifyGold_Reason.DOTA_ModifyGold_CourierKill|16|
EDOTA_ModifyGold_Reason.DOTA_ModifyGold_BountyRune|17|
EDOTA_ModifyGold_Reason.DOTA_ModifyGold_SharedGold|18|
EDOTA_ModifyGold_Reason.DOTA_ModifyGold_AbilityGold|19|
EDOTA_ModifyGold_Reason.DOTA_ModifyGold_WardKill|20|
EDOTA_ModifyGold_Reason.DOTA_ModifyGold_CourierKilledByThisPlayer|21|

# DOTAUnitAttackCapability_t
Enumerator|Value|Description
--|--|--
DOTAUnitAttackCapability_t.DOTA_UNIT_CAP_NO_ATTACK|0|
DOTAUnitAttackCapability_t.DOTA_UNIT_CAP_MELEE_ATTACK|1|
DOTAUnitAttackCapability_t.DOTA_UNIT_CAP_RANGED_ATTACK|2|
DOTAUnitAttackCapability_t.DOTA_UNIT_CAP_RANGED_ATTACK_DIRECTIONAL|4|
DOTAUnitAttackCapability_t.DOTA_UNIT_ATTACK_CAPABILITY_BIT_COUNT|3|

# DOTAUnitMoveCapability_t
Enumerator|Value|Description
--|--|--
DOTAUnitMoveCapability_t.DOTA_UNIT_CAP_MOVE_NONE|0|
DOTAUnitMoveCapability_t.DOTA_UNIT_CAP_MOVE_GROUND|1|
DOTAUnitMoveCapability_t.DOTA_UNIT_CAP_MOVE_FLY|2|

# EShareAbility
Enumerator|Value|Description
--|--|--
EShareAbility.ITEM_FULLY_SHAREABLE|0|
EShareAbility.ITEM_PARTIALLY_SHAREABLE|1|
EShareAbility.ITEM_NOT_SHAREABLE|2|

# DOTAMusicStatus_t
Enumerator|Value|Description
--|--|--
DOTAMusicStatus_t.DOTA_MUSIC_STATUS_NONE|0|
DOTAMusicStatus_t.DOTA_MUSIC_STATUS_EXPLORATION|1|
DOTAMusicStatus_t.DOTA_MUSIC_STATUS_BATTLE|2|
DOTAMusicStatus_t.DOTA_MUSIC_STATUS_PRE_GAME_EXPLORATION|3|
DOTAMusicStatus_t.DOTA_MUSIC_STATUS_DEAD|4|
DOTAMusicStatus_t.DOTA_MUSIC_STATUS_LAST|5|

# DOTA_ABILITY_BEHAVIOR
Enumerator|Value|Description
--|--|--
DOTA_ABILITY_BEHAVIOR.DOTA_ABILITY_BEHAVIOR_NONE|0|
DOTA_ABILITY_BEHAVIOR.DOTA_ABILITY_BEHAVIOR_HIDDEN|1|
DOTA_ABILITY_BEHAVIOR.DOTA_ABILITY_BEHAVIOR_PASSIVE|2|
DOTA_ABILITY_BEHAVIOR.DOTA_ABILITY_BEHAVIOR_NO_TARGET|4|
DOTA_ABILITY_BEHAVIOR.DOTA_ABILITY_BEHAVIOR_UNIT_TARGET|8|
DOTA_ABILITY_BEHAVIOR.DOTA_ABILITY_BEHAVIOR_POINT|16|
DOTA_ABILITY_BEHAVIOR.DOTA_ABILITY_BEHAVIOR_AOE|32|
DOTA_ABILITY_BEHAVIOR.DOTA_ABILITY_BEHAVIOR_NOT_LEARNABLE|64|
DOTA_ABILITY_BEHAVIOR.DOTA_ABILITY_BEHAVIOR_CHANNELLED|128|
DOTA_ABILITY_BEHAVIOR.DOTA_ABILITY_BEHAVIOR_ITEM|256|
DOTA_ABILITY_BEHAVIOR.DOTA_ABILITY_BEHAVIOR_TOGGLE|512|
DOTA_ABILITY_BEHAVIOR.DOTA_ABILITY_BEHAVIOR_DIRECTIONAL|1024|
DOTA_ABILITY_BEHAVIOR.DOTA_ABILITY_BEHAVIOR_IMMEDIATE|2048|
DOTA_ABILITY_BEHAVIOR.DOTA_ABILITY_BEHAVIOR_AUTOCAST|4096|
DOTA_ABILITY_BEHAVIOR.DOTA_ABILITY_BEHAVIOR_OPTIONAL_UNIT_TARGET|8192|
DOTA_ABILITY_BEHAVIOR.DOTA_ABILITY_BEHAVIOR_OPTIONAL_POINT|16384|
DOTA_ABILITY_BEHAVIOR.DOTA_ABILITY_BEHAVIOR_OPTIONAL_NO_TARGET|32768|
DOTA_ABILITY_BEHAVIOR.DOTA_ABILITY_BEHAVIOR_AURA|65536|
DOTA_ABILITY_BEHAVIOR.DOTA_ABILITY_BEHAVIOR_ATTACK|131072|
DOTA_ABILITY_BEHAVIOR.DOTA_ABILITY_BEHAVIOR_DONT_RESUME_MOVEMENT|262144|
DOTA_ABILITY_BEHAVIOR.DOTA_ABILITY_BEHAVIOR_ROOT_DISABLES|524288|
DOTA_ABILITY_BEHAVIOR.DOTA_ABILITY_BEHAVIOR_UNRESTRICTED|1048576|
DOTA_ABILITY_BEHAVIOR.DOTA_ABILITY_BEHAVIOR_IGNORE_PSEUDO_QUEUE|2097152|
DOTA_ABILITY_BEHAVIOR.DOTA_ABILITY_BEHAVIOR_IGNORE_CHANNEL|4194304|
DOTA_ABILITY_BEHAVIOR.DOTA_ABILITY_BEHAVIOR_DONT_CANCEL_MOVEMENT|8388608|
DOTA_ABILITY_BEHAVIOR.DOTA_ABILITY_BEHAVIOR_DONT_ALERT_TARGET|16777216|
DOTA_ABILITY_BEHAVIOR.DOTA_ABILITY_BEHAVIOR_DONT_RESUME_ATTACK|33554432|
DOTA_ABILITY_BEHAVIOR.DOTA_ABILITY_BEHAVIOR_NORMAL_WHEN_STOLEN|67108864|
DOTA_ABILITY_BEHAVIOR.DOTA_ABILITY_BEHAVIOR_IGNORE_BACKSWING|134217728|
DOTA_ABILITY_BEHAVIOR.DOTA_ABILITY_BEHAVIOR_RUNE_TARGET|268435456|
DOTA_ABILITY_BEHAVIOR.DOTA_ABILITY_BEHAVIOR_DONT_CANCEL_CHANNEL|536870912|
DOTA_ABILITY_BEHAVIOR.DOTA_ABILITY_BEHAVIOR_VECTOR_TARGETING|1073741824|
DOTA_ABILITY_BEHAVIOR.DOTA_ABILITY_BEHAVIOR_LAST_RESORT_POINT|2147483648|
DOTA_ABILITY_BEHAVIOR.DOTA_ABILITY_BEHAVIOR_CAN_SELF_CAST|4294967296|
DOTA_ABILITY_BEHAVIOR.DOTA_ABILITY_BEHAVIOR_SHOW_IN_GUIDES|8589934592|
DOTA_ABILITY_BEHAVIOR.DOTA_ABILITY_BEHAVIOR_UNLOCKED_BY_EFFECT_INDEX|17179869184|
DOTA_ABILITY_BEHAVIOR.DOTA_ABILITY_BEHAVIOR_SUPPRESS_ASSOCIATED_CONSUMABLE|34359738368|
DOTA_ABILITY_BEHAVIOR.DOTA_ABILITY_BEHAVIOR_FREE_DRAW_TARGETING|68719476736|
DOTA_ABILITY_BEHAVIOR.DOTA_ABILITY_BEHAVIOR_IGNORE_SILENCE|137438953472|
DOTA_ABILITY_BEHAVIOR.DOTA_ABILITY_BEHAVIOR_OVERSHOOT|274877906944|
DOTA_ABILITY_BEHAVIOR.DOTA_ABILITY_BEHAVIOR_IGNORE_MUTED|549755813888|

# DAMAGE_TYPES
Enumerator|Value|Description
--|--|--
DAMAGE_TYPES.DAMAGE_TYPE_NONE|0|
DAMAGE_TYPES.DAMAGE_TYPE_PHYSICAL|1|
DAMAGE_TYPES.DAMAGE_TYPE_MAGICAL|2|
DAMAGE_TYPES.DAMAGE_TYPE_PURE|4|
DAMAGE_TYPES.DAMAGE_TYPE_HP_REMOVAL|8|
DAMAGE_TYPES.DAMAGE_TYPE_ABILITY_DEFINED|22|
DAMAGE_TYPES.DAMAGE_TYPE_ALL|7|

# ABILITY_TYPES
Enumerator|Value|Description
--|--|--
ABILITY_TYPES.ABILITY_TYPE_BASIC|0|
ABILITY_TYPES.ABILITY_TYPE_ULTIMATE|1|
ABILITY_TYPES.ABILITY_TYPE_ATTRIBUTES|2|
ABILITY_TYPES.ABILITY_TYPE_HIDDEN|3|

# SPELL_IMMUNITY_TYPES
Enumerator|Value|Description
--|--|--
SPELL_IMMUNITY_TYPES.SPELL_IMMUNITY_NONE|0|
SPELL_IMMUNITY_TYPES.SPELL_IMMUNITY_ALLIES_YES|1|
SPELL_IMMUNITY_TYPES.SPELL_IMMUNITY_ALLIES_NO|2|
SPELL_IMMUNITY_TYPES.SPELL_IMMUNITY_ENEMIES_YES|3|
SPELL_IMMUNITY_TYPES.SPELL_IMMUNITY_ENEMIES_NO|4|
SPELL_IMMUNITY_TYPES.SPELL_IMMUNITY_ALLIES_YES_ENEMIES_NO|5|

# DOTADamageFlag_t
Enumerator|Value|Description
--|--|--
DOTADamageFlag_t.DOTA_DAMAGE_FLAG_NONE|0|
DOTADamageFlag_t.DOTA_DAMAGE_FLAG_IGNORES_MAGIC_ARMOR|1|
DOTADamageFlag_t.DOTA_DAMAGE_FLAG_IGNORES_PHYSICAL_ARMOR|2|
DOTADamageFlag_t.DOTA_DAMAGE_FLAG_BYPASSES_INVULNERABILITY|4|
DOTADamageFlag_t.DOTA_DAMAGE_FLAG_BYPASSES_BLOCK|8|
DOTADamageFlag_t.DOTA_DAMAGE_FLAG_REFLECTION|16|
DOTADamageFlag_t.DOTA_DAMAGE_FLAG_HPLOSS|32|
DOTADamageFlag_t.DOTA_DAMAGE_FLAG_NO_DIRECTOR_EVENT|64|
DOTADamageFlag_t.DOTA_DAMAGE_FLAG_NON_LETHAL|128|
DOTADamageFlag_t.DOTA_DAMAGE_FLAG_NO_DAMAGE_MULTIPLIERS|512|
DOTADamageFlag_t.DOTA_DAMAGE_FLAG_NO_SPELL_AMPLIFICATION|1024|
DOTADamageFlag_t.DOTA_DAMAGE_FLAG_DONT_DISPLAY_DAMAGE_IF_SOURCE_HIDDEN|2048|
DOTADamageFlag_t.DOTA_DAMAGE_FLAG_NO_SPELL_LIFESTEAL|4096|
DOTADamageFlag_t.DOTA_DAMAGE_FLAG_PROPERTY_FIRE|8192|
DOTADamageFlag_t.DOTA_DAMAGE_FLAG_IGNORES_BASE_PHYSICAL_ARMOR|16384|
DOTADamageFlag_t.DOTA_DAMAGE_FLAG_SECONDARY_PROJECTILE_ATTACK|32768|
DOTADamageFlag_t.DOTA_DAMAGE_FLAG_FORCE_SPELL_AMPLIFICATION|65536|
DOTADamageFlag_t.DOTA_DAMAGE_FLAG_MAGIC_AUTO_ATTACK|131072|
DOTADamageFlag_t.DOTA_DAMAGE_FLAG_ATTACK_MODIFIER|262144|

# EDOTA_ModifyXP_Reason
Enumerator|Value|Description
--|--|--
EDOTA_ModifyXP_Reason.DOTA_ModifyXP_Unspecified|0|
EDOTA_ModifyXP_Reason.DOTA_ModifyXP_HeroKill|1|
EDOTA_ModifyXP_Reason.DOTA_ModifyXP_CreepKill|2|
EDOTA_ModifyXP_Reason.DOTA_ModifyXP_RoshanKill|3|
EDOTA_ModifyXP_Reason.DOTA_ModifyXP_TomeOfKnowledge|4|
EDOTA_ModifyXP_Reason.DOTA_ModifyXP_Outpost|5|
EDOTA_ModifyXP_Reason.DOTA_ModifyXP_MAX|6|

# GameActivity_t
Enumerator|Value|Description
--|--|--
GameActivity_t.ACT_DOTA_IDLE|1500|
GameActivity_t.ACT_DOTA_IDLE_RARE|1501|
GameActivity_t.ACT_DOTA_RUN|1502|
GameActivity_t.ACT_DOTA_ATTACK|1503|
GameActivity_t.ACT_DOTA_ATTACK2|1504|
GameActivity_t.ACT_DOTA_ATTACK_EVENT|1505|
GameActivity_t.ACT_DOTA_DIE|1506|
GameActivity_t.ACT_DOTA_FLINCH|1507|
GameActivity_t.ACT_DOTA_FLAIL|1508|
GameActivity_t.ACT_DOTA_DISABLED|1509|
GameActivity_t.ACT_DOTA_CAST_ABILITY_1|1510|
GameActivity_t.ACT_DOTA_CAST_ABILITY_2|1511|
GameActivity_t.ACT_DOTA_CAST_ABILITY_3|1512|
GameActivity_t.ACT_DOTA_CAST_ABILITY_4|1513|
GameActivity_t.ACT_DOTA_CAST_ABILITY_5|1514|
GameActivity_t.ACT_DOTA_CAST_ABILITY_6|1515|
GameActivity_t.ACT_DOTA_OVERRIDE_ABILITY_1|1516|
GameActivity_t.ACT_DOTA_OVERRIDE_ABILITY_2|1517|
GameActivity_t.ACT_DOTA_OVERRIDE_ABILITY_3|1518|
GameActivity_t.ACT_DOTA_OVERRIDE_ABILITY_4|1519|
GameActivity_t.ACT_DOTA_CHANNEL_ABILITY_1|1520|
GameActivity_t.ACT_DOTA_CHANNEL_ABILITY_2|1521|
GameActivity_t.ACT_DOTA_CHANNEL_ABILITY_3|1522|
GameActivity_t.ACT_DOTA_CHANNEL_ABILITY_4|1523|
GameActivity_t.ACT_DOTA_CHANNEL_ABILITY_5|1524|
GameActivity_t.ACT_DOTA_CHANNEL_ABILITY_6|1525|
GameActivity_t.ACT_DOTA_CHANNEL_END_ABILITY_1|1526|
GameActivity_t.ACT_DOTA_CHANNEL_END_ABILITY_2|1527|
GameActivity_t.ACT_DOTA_CHANNEL_END_ABILITY_3|1528|
GameActivity_t.ACT_DOTA_CHANNEL_END_ABILITY_4|1529|
GameActivity_t.ACT_DOTA_CHANNEL_END_ABILITY_5|1530|
GameActivity_t.ACT_DOTA_CHANNEL_END_ABILITY_6|1531|
GameActivity_t.ACT_DOTA_CONSTANT_LAYER|1532|
GameActivity_t.ACT_DOTA_CAPTURE|1533|
GameActivity_t.ACT_DOTA_SPAWN|1534|
GameActivity_t.ACT_DOTA_KILLTAUNT|1535|
GameActivity_t.ACT_DOTA_TAUNT|1536|
GameActivity_t.ACT_DOTA_THIRST|1537|
GameActivity_t.ACT_DOTA_CAST_DRAGONBREATH|1538|
GameActivity_t.ACT_DOTA_ECHO_SLAM|1539|
GameActivity_t.ACT_DOTA_CAST_ABILITY_1_END|1540|
GameActivity_t.ACT_DOTA_CAST_ABILITY_2_END|1541|
GameActivity_t.ACT_DOTA_CAST_ABILITY_3_END|1542|
GameActivity_t.ACT_DOTA_CAST_ABILITY_4_END|1543|
GameActivity_t.ACT_MIRANA_LEAP_END|1544|
GameActivity_t.ACT_WAVEFORM_START|1545|
GameActivity_t.ACT_WAVEFORM_END|1546|
GameActivity_t.ACT_DOTA_CAST_ABILITY_ROT|1547|
GameActivity_t.ACT_DOTA_DIE_SPECIAL|1548|
GameActivity_t.ACT_DOTA_RATTLETRAP_BATTERYASSAULT|1549|
GameActivity_t.ACT_DOTA_RATTLETRAP_POWERCOGS|1550|
GameActivity_t.ACT_DOTA_RATTLETRAP_HOOKSHOT_START|1551|
GameActivity_t.ACT_DOTA_RATTLETRAP_HOOKSHOT_LOOP|1552|
GameActivity_t.ACT_DOTA_RATTLETRAP_HOOKSHOT_END|1553|
GameActivity_t.ACT_STORM_SPIRIT_OVERLOAD_RUN_OVERRIDE|1554|
GameActivity_t.ACT_DOTA_TINKER_REARM1|1555|
GameActivity_t.ACT_DOTA_TINKER_REARM2|1556|
GameActivity_t.ACT_DOTA_TINKER_REARM3|1557|
GameActivity_t.ACT_TINY_AVALANCHE|1558|
GameActivity_t.ACT_TINY_TOSS|1559|
GameActivity_t.ACT_TINY_GROWL|1560|
GameActivity_t.ACT_DOTA_WEAVERBUG_ATTACH|1561|
GameActivity_t.ACT_DOTA_CAST_WILD_AXES_END|1562|
GameActivity_t.ACT_DOTA_CAST_LIFE_BREAK_START|1563|
GameActivity_t.ACT_DOTA_CAST_LIFE_BREAK_END|1564|
GameActivity_t.ACT_DOTA_NIGHTSTALKER_TRANSITION|1565|
GameActivity_t.ACT_DOTA_LIFESTEALER_RAGE|1566|
GameActivity_t.ACT_DOTA_LIFESTEALER_OPEN_WOUNDS|1567|
GameActivity_t.ACT_DOTA_SAND_KING_BURROW_IN|1568|
GameActivity_t.ACT_DOTA_SAND_KING_BURROW_OUT|1569|
GameActivity_t.ACT_DOTA_EARTHSHAKER_TOTEM_ATTACK|1570|
GameActivity_t.ACT_DOTA_WHEEL_LAYER|1571|
GameActivity_t.ACT_DOTA_ALCHEMIST_CHEMICAL_RAGE_START|1572|
GameActivity_t.ACT_DOTA_ALCHEMIST_CONCOCTION|1573|
GameActivity_t.ACT_DOTA_JAKIRO_LIQUIDFIRE_START|1574|
GameActivity_t.ACT_DOTA_JAKIRO_LIQUIDFIRE_LOOP|1575|
GameActivity_t.ACT_DOTA_LIFESTEALER_INFEST|1576|
GameActivity_t.ACT_DOTA_LIFESTEALER_INFEST_END|1577|
GameActivity_t.ACT_DOTA_LASSO_LOOP|1578|
GameActivity_t.ACT_DOTA_ALCHEMIST_CONCOCTION_THROW|1579|
GameActivity_t.ACT_DOTA_ALCHEMIST_CHEMICAL_RAGE_END|1580|
GameActivity_t.ACT_DOTA_CAST_COLD_SNAP|1581|
GameActivity_t.ACT_DOTA_CAST_GHOST_WALK|1582|
GameActivity_t.ACT_DOTA_CAST_TORNADO|1583|
GameActivity_t.ACT_DOTA_CAST_EMP|1584|
GameActivity_t.ACT_DOTA_CAST_ALACRITY|1585|
GameActivity_t.ACT_DOTA_CAST_CHAOS_METEOR|1586|
GameActivity_t.ACT_DOTA_CAST_SUN_STRIKE|1587|
GameActivity_t.ACT_DOTA_CAST_FORGE_SPIRIT|1588|
GameActivity_t.ACT_DOTA_CAST_ICE_WALL|1589|
GameActivity_t.ACT_DOTA_CAST_DEAFENING_BLAST|1590|
GameActivity_t.ACT_DOTA_VICTORY|1591|
GameActivity_t.ACT_DOTA_DEFEAT|1592|
GameActivity_t.ACT_DOTA_SPIRIT_BREAKER_CHARGE_POSE|1593|
GameActivity_t.ACT_DOTA_SPIRIT_BREAKER_CHARGE_END|1594|
GameActivity_t.ACT_DOTA_TELEPORT|1595|
GameActivity_t.ACT_DOTA_TELEPORT_END|1596|
GameActivity_t.ACT_DOTA_CAST_REFRACTION|1597|
GameActivity_t.ACT_DOTA_CAST_ABILITY_7|1598|
GameActivity_t.ACT_DOTA_CANCEL_SIREN_SONG|1599|
GameActivity_t.ACT_DOTA_CHANNEL_ABILITY_7|1600|
GameActivity_t.ACT_DOTA_LOADOUT|1601|
GameActivity_t.ACT_DOTA_FORCESTAFF_END|1602|
GameActivity_t.ACT_DOTA_POOF_END|1603|
GameActivity_t.ACT_DOTA_SLARK_POUNCE|1604|
GameActivity_t.ACT_DOTA_MAGNUS_SKEWER_START|1605|
GameActivity_t.ACT_DOTA_MAGNUS_SKEWER_END|1606|
GameActivity_t.ACT_DOTA_MEDUSA_STONE_GAZE|1607|
GameActivity_t.ACT_DOTA_RELAX_START|1608|
GameActivity_t.ACT_DOTA_RELAX_LOOP|1609|
GameActivity_t.ACT_DOTA_RELAX_END|1610|
GameActivity_t.ACT_DOTA_CENTAUR_STAMPEDE|1611|
GameActivity_t.ACT_DOTA_BELLYACHE_START|1612|
GameActivity_t.ACT_DOTA_BELLYACHE_LOOP|1613|
GameActivity_t.ACT_DOTA_BELLYACHE_END|1614|
GameActivity_t.ACT_DOTA_ROQUELAIRE_LAND|1615|
GameActivity_t.ACT_DOTA_ROQUELAIRE_LAND_IDLE|1616|
GameActivity_t.ACT_DOTA_GREEVIL_CAST|1617|
GameActivity_t.ACT_DOTA_GREEVIL_OVERRIDE_ABILITY|1618|
GameActivity_t.ACT_DOTA_GREEVIL_HOOK_START|1619|
GameActivity_t.ACT_DOTA_GREEVIL_HOOK_END|1620|
GameActivity_t.ACT_DOTA_GREEVIL_BLINK_BONE|1621|
GameActivity_t.ACT_DOTA_IDLE_SLEEPING|1622|
GameActivity_t.ACT_DOTA_INTRO|1623|
GameActivity_t.ACT_DOTA_GESTURE_POINT|1624|
GameActivity_t.ACT_DOTA_GESTURE_ACCENT|1625|
GameActivity_t.ACT_DOTA_SLEEPING_END|1626|
GameActivity_t.ACT_DOTA_AMBUSH|1627|
GameActivity_t.ACT_DOTA_ITEM_LOOK|1628|
GameActivity_t.ACT_DOTA_STARTLE|1629|
GameActivity_t.ACT_DOTA_FRUSTRATION|1630|
GameActivity_t.ACT_DOTA_TELEPORT_REACT|1631|
GameActivity_t.ACT_DOTA_TELEPORT_END_REACT|1632|
GameActivity_t.ACT_DOTA_SHRUG|1633|
GameActivity_t.ACT_DOTA_RELAX_LOOP_END|1634|
GameActivity_t.ACT_DOTA_PRESENT_ITEM|1635|
GameActivity_t.ACT_DOTA_IDLE_IMPATIENT|1636|
GameActivity_t.ACT_DOTA_SHARPEN_WEAPON|1637|
GameActivity_t.ACT_DOTA_SHARPEN_WEAPON_OUT|1638|
GameActivity_t.ACT_DOTA_IDLE_SLEEPING_END|1639|
GameActivity_t.ACT_DOTA_BRIDGE_DESTROY|1640|
GameActivity_t.ACT_DOTA_TAUNT_SNIPER|1641|
GameActivity_t.ACT_DOTA_DEATH_BY_SNIPER|1642|
GameActivity_t.ACT_DOTA_LOOK_AROUND|1643|
GameActivity_t.ACT_DOTA_CAGED_CREEP_RAGE|1644|
GameActivity_t.ACT_DOTA_CAGED_CREEP_RAGE_OUT|1645|
GameActivity_t.ACT_DOTA_CAGED_CREEP_SMASH|1646|
GameActivity_t.ACT_DOTA_CAGED_CREEP_SMASH_OUT|1647|
GameActivity_t.ACT_DOTA_IDLE_IMPATIENT_SWORD_TAP|1648|
GameActivity_t.ACT_DOTA_INTRO_LOOP|1649|
GameActivity_t.ACT_DOTA_BRIDGE_THREAT|1650|
GameActivity_t.ACT_DOTA_DAGON|1651|
GameActivity_t.ACT_DOTA_CAST_ABILITY_2_ES_ROLL_START|1652|
GameActivity_t.ACT_DOTA_CAST_ABILITY_2_ES_ROLL|1653|
GameActivity_t.ACT_DOTA_CAST_ABILITY_2_ES_ROLL_END|1654|
GameActivity_t.ACT_DOTA_NIAN_PIN_START|1655|
GameActivity_t.ACT_DOTA_NIAN_PIN_LOOP|1656|
GameActivity_t.ACT_DOTA_NIAN_PIN_END|1657|
GameActivity_t.ACT_DOTA_LEAP_STUN|1658|
GameActivity_t.ACT_DOTA_LEAP_SWIPE|1659|
GameActivity_t.ACT_DOTA_NIAN_INTRO_LEAP|1660|
GameActivity_t.ACT_DOTA_AREA_DENY|1661|
GameActivity_t.ACT_DOTA_NIAN_PIN_TO_STUN|1662|
GameActivity_t.ACT_DOTA_RAZE_1|1663|
GameActivity_t.ACT_DOTA_RAZE_2|1664|
GameActivity_t.ACT_DOTA_RAZE_3|1665|
GameActivity_t.ACT_DOTA_UNDYING_DECAY|1666|
GameActivity_t.ACT_DOTA_UNDYING_SOUL_RIP|1667|
GameActivity_t.ACT_DOTA_UNDYING_TOMBSTONE|1668|
GameActivity_t.ACT_DOTA_WHIRLING_AXES_RANGED|1669|
GameActivity_t.ACT_DOTA_SHALLOW_GRAVE|1670|
GameActivity_t.ACT_DOTA_COLD_FEET|1671|
GameActivity_t.ACT_DOTA_ICE_VORTEX|1672|
GameActivity_t.ACT_DOTA_CHILLING_TOUCH|1673|
GameActivity_t.ACT_DOTA_ENFEEBLE|1674|
GameActivity_t.ACT_DOTA_FATAL_BONDS|1675|
GameActivity_t.ACT_DOTA_MIDNIGHT_PULSE|1676|
GameActivity_t.ACT_DOTA_ANCESTRAL_SPIRIT|1677|
GameActivity_t.ACT_DOTA_THUNDER_STRIKE|1678|
GameActivity_t.ACT_DOTA_KINETIC_FIELD|1679|
GameActivity_t.ACT_DOTA_STATIC_STORM|1680|
GameActivity_t.ACT_DOTA_MINI_TAUNT|1681|
GameActivity_t.ACT_DOTA_ARCTIC_BURN_END|1682|
GameActivity_t.ACT_DOTA_LOADOUT_RARE|1683|
GameActivity_t.ACT_DOTA_SWIM|1684|
GameActivity_t.ACT_DOTA_FLEE|1685|
GameActivity_t.ACT_DOTA_TROT|1686|
GameActivity_t.ACT_DOTA_SHAKE|1687|
GameActivity_t.ACT_DOTA_SWIM_IDLE|1688|
GameActivity_t.ACT_DOTA_WAIT_IDLE|1689|
GameActivity_t.ACT_DOTA_GREET|1690|
GameActivity_t.ACT_DOTA_TELEPORT_COOP_START|1691|
GameActivity_t.ACT_DOTA_TELEPORT_COOP_WAIT|1692|
GameActivity_t.ACT_DOTA_TELEPORT_COOP_END|1693|
GameActivity_t.ACT_DOTA_TELEPORT_COOP_EXIT|1694|
GameActivity_t.ACT_DOTA_SHOPKEEPER_PET_INTERACT|1695|
GameActivity_t.ACT_DOTA_ITEM_PICKUP|1696|
GameActivity_t.ACT_DOTA_ITEM_DROP|1697|
GameActivity_t.ACT_DOTA_CAPTURE_PET|1698|
GameActivity_t.ACT_DOTA_PET_WARD_OBSERVER|1699|
GameActivity_t.ACT_DOTA_PET_WARD_SENTRY|1700|
GameActivity_t.ACT_DOTA_PET_LEVEL|1701|
GameActivity_t.ACT_DOTA_CAST_BURROW_END|1702|
GameActivity_t.ACT_DOTA_LIFESTEALER_ASSIMILATE|1703|
GameActivity_t.ACT_DOTA_LIFESTEALER_EJECT|1704|
GameActivity_t.ACT_DOTA_ATTACK_EVENT_BASH|1705|
GameActivity_t.ACT_DOTA_CAPTURE_RARE|1706|
GameActivity_t.ACT_DOTA_AW_MAGNETIC_FIELD|1707|
GameActivity_t.ACT_DOTA_CAST_GHOST_SHIP|1708|
GameActivity_t.ACT_DOTA_FXANIM|1709|
GameActivity_t.ACT_DOTA_VICTORY_START|1710|
GameActivity_t.ACT_DOTA_DEFEAT_START|1711|
GameActivity_t.ACT_DOTA_DP_SPIRIT_SIPHON|1712|
GameActivity_t.ACT_DOTA_TRICKS_END|1713|
GameActivity_t.ACT_DOTA_ES_STONE_CALLER|1714|
GameActivity_t.ACT_DOTA_MK_STRIKE|1715|
GameActivity_t.ACT_DOTA_VERSUS|1716|
GameActivity_t.ACT_DOTA_CAPTURE_CARD|1717|
GameActivity_t.ACT_DOTA_MK_SPRING_SOAR|1718|
GameActivity_t.ACT_DOTA_MK_SPRING_END|1719|
GameActivity_t.ACT_DOTA_MK_TREE_SOAR|1720|
GameActivity_t.ACT_DOTA_MK_TREE_END|1721|
GameActivity_t.ACT_DOTA_MK_FUR_ARMY|1722|
GameActivity_t.ACT_DOTA_MK_SPRING_CAST|1723|
GameActivity_t.ACT_DOTA_NECRO_GHOST_SHROUD|1724|
GameActivity_t.ACT_DOTA_OVERRIDE_ARCANA|1725|
GameActivity_t.ACT_DOTA_SLIDE|1726|
GameActivity_t.ACT_DOTA_SLIDE_LOOP|1727|
GameActivity_t.ACT_DOTA_GENERIC_CHANNEL_1|1728|
GameActivity_t.ACT_DOTA_GS_SOUL_CHAIN|1729|
GameActivity_t.ACT_DOTA_GS_INK_CREATURE|1730|
GameActivity_t.ACT_DOTA_TRANSITION|1731|
GameActivity_t.ACT_DOTA_BLINK_DAGGER|1732|
GameActivity_t.ACT_DOTA_BLINK_DAGGER_END|1733|
GameActivity_t.ACT_DOTA_CUSTOM_TOWER_ATTACK|1734|
GameActivity_t.ACT_DOTA_CUSTOM_TOWER_IDLE|1735|
GameActivity_t.ACT_DOTA_CUSTOM_TOWER_DIE|1736|
GameActivity_t.ACT_DOTA_CAST_COLD_SNAP_ORB|1737|
GameActivity_t.ACT_DOTA_CAST_GHOST_WALK_ORB|1738|
GameActivity_t.ACT_DOTA_CAST_TORNADO_ORB|1739|
GameActivity_t.ACT_DOTA_CAST_EMP_ORB|1740|
GameActivity_t.ACT_DOTA_CAST_ALACRITY_ORB|1741|
GameActivity_t.ACT_DOTA_CAST_CHAOS_METEOR_ORB|1742|
GameActivity_t.ACT_DOTA_CAST_SUN_STRIKE_ORB|1743|
GameActivity_t.ACT_DOTA_CAST_FORGE_SPIRIT_ORB|1744|
GameActivity_t.ACT_DOTA_CAST_ICE_WALL_ORB|1745|
GameActivity_t.ACT_DOTA_CAST_DEAFENING_BLAST_ORB|1746|
GameActivity_t.ACT_DOTA_NOTICE|1747|
GameActivity_t.ACT_DOTA_CAST_ABILITY_2_ALLY|1748|
GameActivity_t.ACT_DOTA_SHUFFLE_L|1749|
GameActivity_t.ACT_DOTA_SHUFFLE_R|1750|
GameActivity_t.ACT_DOTA_OVERRIDE_LOADOUT|1751|
GameActivity_t.ACT_DOTA_TAUNT_SPECIAL|1752|
GameActivity_t.ACT_DOTA_TELEPORT_START|1753|
GameActivity_t.ACT_DOTA_GENERIC_CHANNEL_1_START|1754|
GameActivity_t.ACT_DOTA_CUSTOM_TOWER_IDLE_RARE|1755|
GameActivity_t.ACT_DOTA_CUSTOM_TOWER_TAUNT|1756|
GameActivity_t.ACT_DOTA_CUSTOM_TOWER_HIGH_FIVE|1757|
GameActivity_t.ACT_DOTA_ATTACK_SPECIAL|1758|
GameActivity_t.ACT_DOTA_TRANSITION_IDLE|1759|
GameActivity_t.ACT_DOTA_PIERCE_THE_VEIL|1760|
GameActivity_t.ACT_DOTA_RUN_RARE|1761|
GameActivity_t.ACT_DOTA_VIPER_DIVE|1762|
GameActivity_t.ACT_DOTA_VIPER_DIVE_END|1763|
GameActivity_t.ACT_DOTA_MK_STRIKE_END|1764|

# DOTAMinimapEvent_t
Enumerator|Value|Description
--|--|--
DOTAMinimapEvent_t.DOTA_MINIMAP_EVENT_ANCIENT_UNDER_ATTACK|2|
DOTAMinimapEvent_t.DOTA_MINIMAP_EVENT_BASE_UNDER_ATTACK|4|
DOTAMinimapEvent_t.DOTA_MINIMAP_EVENT_BASE_GLYPHED|8|
DOTAMinimapEvent_t.DOTA_MINIMAP_EVENT_TEAMMATE_UNDER_ATTACK|16|
DOTAMinimapEvent_t.DOTA_MINIMAP_EVENT_TEAMMATE_TELEPORTING|32|
DOTAMinimapEvent_t.DOTA_MINIMAP_EVENT_TEAMMATE_DIED|64|
DOTAMinimapEvent_t.DOTA_MINIMAP_EVENT_TUTORIAL_TASK_ACTIVE|128|
DOTAMinimapEvent_t.DOTA_MINIMAP_EVENT_TUTORIAL_TASK_FINISHED|256|
DOTAMinimapEvent_t.DOTA_MINIMAP_EVENT_HINT_LOCATION|512|
DOTAMinimapEvent_t.DOTA_MINIMAP_EVENT_ENEMY_TELEPORTING|1024|
DOTAMinimapEvent_t.DOTA_MINIMAP_EVENT_CANCEL_TELEPORTING|2048|
DOTAMinimapEvent_t.DOTA_MINIMAP_EVENT_RADAR|4096|
DOTAMinimapEvent_t.DOTA_MINIMAP_EVENT_RADAR_TARGET|8192|
DOTAMinimapEvent_t.DOTA_MINIMAP_EVENT_MOVE_TO_TARGET|16384|

# DOTASlotType_t
Enumerator|Value|Description
--|--|--
DOTASlotType_t.DOTA_LOADOUT_TYPE_INVALID|-1|
DOTASlotType_t.DOTA_LOADOUT_TYPE_WEAPON|0|
DOTASlotType_t.DOTA_LOADOUT_TYPE_OFFHAND_WEAPON|1|
DOTASlotType_t.DOTA_LOADOUT_TYPE_WEAPON2|2|
DOTASlotType_t.DOTA_LOADOUT_TYPE_OFFHAND_WEAPON2|3|
DOTASlotType_t.DOTA_LOADOUT_TYPE_HEAD|4|
DOTASlotType_t.DOTA_LOADOUT_TYPE_SHOULDER|5|
DOTASlotType_t.DOTA_LOADOUT_TYPE_ARMS|6|
DOTASlotType_t.DOTA_LOADOUT_TYPE_ARMOR|7|
DOTASlotType_t.DOTA_LOADOUT_TYPE_BELT|8|
DOTASlotType_t.DOTA_LOADOUT_TYPE_NECK|9|
DOTASlotType_t.DOTA_LOADOUT_TYPE_BACK|10|
DOTASlotType_t.DOTA_LOADOUT_TYPE_GLOVES|11|
DOTASlotType_t.DOTA_LOADOUT_TYPE_LEGS|12|
DOTASlotType_t.DOTA_LOADOUT_TYPE_TAIL|13|
DOTASlotType_t.DOTA_LOADOUT_TYPE_MISC|14|
DOTASlotType_t.DOTA_LOADOUT_TYPE_COSTUME|15|
DOTASlotType_t.DOTA_LOADOUT_TYPE_BODY_HEAD|16|
DOTASlotType_t.DOTA_LOADOUT_TYPE_MOUNT|17|
DOTASlotType_t.DOTA_LOADOUT_TYPE_SUMMON|18|
DOTASlotType_t.DOTA_LOADOUT_TYPE_SHAPESHIFT|19|
DOTASlotType_t.DOTA_LOADOUT_TYPE_TAUNT|20|
DOTASlotType_t.DOTA_LOADOUT_TYPE_AMBIENT_EFFECTS|21|
DOTASlotType_t.DOTA_LOADOUT_TYPE_ABILITY_ATTACK|22|
DOTASlotType_t.DOTA_LOADOUT_TYPE_ABILITY1|23|
DOTASlotType_t.DOTA_LOADOUT_TYPE_ABILITY2|24|
DOTASlotType_t.DOTA_LOADOUT_TYPE_ABILITY3|25|
DOTASlotType_t.DOTA_LOADOUT_TYPE_ABILITY4|26|
DOTASlotType_t.DOTA_LOADOUT_TYPE_ABILITY_ULTIMATE|27|
DOTASlotType_t.DOTA_LOADOUT_TYPE_ABILITY_EFFECTS_1|28|
DOTASlotType_t.DOTA_LOADOUT_TYPE_ABILITY_EFFECTS_2|29|
DOTASlotType_t.DOTA_LOADOUT_TYPE_ABILITY_EFFECTS_3|30|
DOTASlotType_t.DOTA_LOADOUT_TYPE_ABILITY_EFFECTS_4|31|
DOTASlotType_t.DOTA_LOADOUT_TYPE_ABILITY_EFFECTS_5|32|
DOTASlotType_t.DOTA_LOADOUT_TYPE_ABILITY_EFFECTS_6|33|
DOTASlotType_t.DOTA_LOADOUT_TYPE_ABILITY_EFFECTS_7|34|
DOTASlotType_t.DOTA_LOADOUT_TYPE_ABILITY_EFFECTS_8|35|
DOTASlotType_t.DOTA_LOADOUT_TYPE_ABILITY_EFFECTS_9|36|
DOTASlotType_t.DOTA_LOADOUT_TYPE_VOICE|37|
DOTASlotType_t.DOTA_LOADOUT_TYPE_WEAPON_PERSONA_1|38|
DOTASlotType_t.DOTA_LOADOUT_TYPE_OFFHAND_WEAPON_PERSONA_1|39|
DOTASlotType_t.DOTA_LOADOUT_TYPE_WEAPON2_PERSONA_1|40|
DOTASlotType_t.DOTA_LOADOUT_TYPE_OFFHAND_WEAPON2_PERSONA_1|41|
DOTASlotType_t.DOTA_LOADOUT_TYPE_HEAD_PERSONA_1|42|
DOTASlotType_t.DOTA_LOADOUT_TYPE_SHOULDER_PERSONA_1|43|
DOTASlotType_t.DOTA_LOADOUT_TYPE_ARMS_PERSONA_1|44|
DOTASlotType_t.DOTA_LOADOUT_TYPE_ARMOR_PERSONA_1|45|
DOTASlotType_t.DOTA_LOADOUT_TYPE_BELT_PERSONA_1|46|
DOTASlotType_t.DOTA_LOADOUT_TYPE_NECK_PERSONA_1|47|
DOTASlotType_t.DOTA_LOADOUT_TYPE_BACK_PERSONA_1|48|
DOTASlotType_t.DOTA_LOADOUT_TYPE_LEGS_PERSONA_1|49|
DOTASlotType_t.DOTA_LOADOUT_TYPE_GLOVES_PERSONA_1|50|
DOTASlotType_t.DOTA_LOADOUT_TYPE_TAIL_PERSONA_1|51|
DOTASlotType_t.DOTA_LOADOUT_TYPE_MISC_PERSONA_1|52|
DOTASlotType_t.DOTA_LOADOUT_TYPE_BODY_HEAD_PERSONA_1|53|
DOTASlotType_t.DOTA_LOADOUT_TYPE_MOUNT_PERSONA_1|54|
DOTASlotType_t.DOTA_LOADOUT_TYPE_SUMMON_PERSONA_1|55|
DOTASlotType_t.DOTA_LOADOUT_TYPE_SHAPESHIFT_PERSONA_1|56|
DOTASlotType_t.DOTA_LOADOUT_TYPE_TAUNT_PERSONA_1|57|
DOTASlotType_t.DOTA_LOADOUT_TYPE_AMBIENT_EFFECTS_PERSONA_1|58|
DOTASlotType_t.DOTA_LOADOUT_TYPE_ABILITY_ATTACK_PERSONA_1|59|
DOTASlotType_t.DOTA_LOADOUT_TYPE_ABILITY1_PERSONA_1|60|
DOTASlotType_t.DOTA_LOADOUT_TYPE_ABILITY2_PERSONA_1|61|
DOTASlotType_t.DOTA_LOADOUT_TYPE_ABILITY3_PERSONA_1|62|
DOTASlotType_t.DOTA_LOADOUT_TYPE_ABILITY4_PERSONA_1|63|
DOTASlotType_t.DOTA_LOADOUT_TYPE_ABILITY_ULTIMATE_PERSONA_1|64|
DOTASlotType_t.DOTA_LOADOUT_TYPE_VOICE_PERSONA_1|65|
DOTASlotType_t.DOTA_LOADOUT_PERSONA_1_START|38|
DOTASlotType_t.DOTA_LOADOUT_PERSONA_1_END|65|
DOTASlotType_t.DOTA_LOADOUT_TYPE_PERSONA_SELECTOR|66|
DOTASlotType_t.DOTA_LOADOUT_TYPE_COURIER|67|
DOTASlotType_t.DOTA_LOADOUT_TYPE_ANNOUNCER|68|
DOTASlotType_t.DOTA_LOADOUT_TYPE_MEGA_KILLS|69|
DOTASlotType_t.DOTA_LOADOUT_TYPE_MUSIC|70|
DOTASlotType_t.DOTA_LOADOUT_TYPE_WARD|71|
DOTASlotType_t.DOTA_LOADOUT_TYPE_HUD_SKIN|72|
DOTASlotType_t.DOTA_LOADOUT_TYPE_LOADING_SCREEN|73|
DOTASlotType_t.DOTA_LOADOUT_TYPE_WEATHER|74|
DOTASlotType_t.DOTA_LOADOUT_TYPE_HEROIC_STATUE|75|
DOTASlotType_t.DOTA_LOADOUT_TYPE_MULTIKILL_BANNER|76|
DOTASlotType_t.DOTA_LOADOUT_TYPE_CURSOR_PACK|77|
DOTASlotType_t.DOTA_LOADOUT_TYPE_TELEPORT_EFFECT|78|
DOTASlotType_t.DOTA_LOADOUT_TYPE_BLINK_EFFECT|79|
DOTASlotType_t.DOTA_LOADOUT_TYPE_EMBLEM|80|
DOTASlotType_t.DOTA_LOADOUT_TYPE_TERRAIN|81|
DOTASlotType_t.DOTA_LOADOUT_TYPE_RADIANT_CREEPS|82|
DOTASlotType_t.DOTA_LOADOUT_TYPE_DIRE_CREEPS|83|
DOTASlotType_t.DOTA_LOADOUT_TYPE_RADIANT_TOWER|84|
DOTASlotType_t.DOTA_LOADOUT_TYPE_DIRE_TOWER|85|
DOTASlotType_t.DOTA_LOADOUT_TYPE_VERSUS_SCREEN|86|
DOTASlotType_t.DOTA_LOADOUT_TYPE_STREAK_EFFECT|87|
DOTASlotType_t.DOTA_LOADOUT_TYPE_KILL_EFFECT|88|
DOTASlotType_t.DOTA_LOADOUT_TYPE_DEATH_EFFECT|89|
DOTASlotType_t.DOTA_LOADOUT_TYPE_HEAD_EFFECT|90|
DOTASlotType_t.DOTA_LOADOUT_TYPE_MAP_EFFECT|91|
DOTASlotType_t.DOTA_LOADOUT_TYPE_COURIER_EFFECT|92|
DOTASlotType_t.DOTA_LOADOUT_TYPE_RADIANT_SIEGE_CREEPS|93|
DOTASlotType_t.DOTA_LOADOUT_TYPE_DIRE_SIEGE_CREEPS|94|
DOTASlotType_t.DOTA_LOADOUT_TYPE_ROSHAN|95|
DOTASlotType_t.DOTA_PLAYER_LOADOUT_START|67|
DOTASlotType_t.DOTA_PLAYER_LOADOUT_END|95|
DOTASlotType_t.DOTA_LOADOUT_TYPE_NONE|96|
DOTASlotType_t.DOTA_LOADOUT_TYPE_COUNT|97|

# modifierfunction
Enumerator|Value|Description
--|--|--
modifierfunction.MODIFIER_PROPERTY_PREATTACK_BONUS_DAMAGE|0|GetModifierPreAttack_BonusDamage
modifierfunction.MODIFIER_PROPERTY_PREATTACK_BONUS_DAMAGE_TARGET|1|GetModifierPreAttack_BonusDamage_Target
modifierfunction.MODIFIER_PROPERTY_PREATTACK_BONUS_DAMAGE_PROC|2|GetModifierPreAttack_BonusDamage_Proc
modifierfunction.MODIFIER_PROPERTY_PREATTACK_BONUS_DAMAGE_POST_CRIT|3|GetModifierPreAttack_BonusDamagePostCrit
modifierfunction.MODIFIER_PROPERTY_BASEATTACK_BONUSDAMAGE|4|GetModifierBaseAttack_BonusDamage
modifierfunction.MODIFIER_PROPERTY_PROCATTACK_BONUS_DAMAGE_PHYSICAL|5|GetModifierProcAttack_BonusDamage_Physical
modifierfunction.MODIFIER_PROPERTY_PROCATTACK_CONVERT_PHYSICAL_TO_MAGICAL|6|GetModifierProcAttack_ConvertPhysicalToMagical
modifierfunction.MODIFIER_PROPERTY_PROCATTACK_BONUS_DAMAGE_MAGICAL|7|GetModifierProcAttack_BonusDamage_Magical
modifierfunction.MODIFIER_PROPERTY_PROCATTACK_BONUS_DAMAGE_PURE|8|GetModifierProcAttack_BonusDamage_Pure
modifierfunction.MODIFIER_PROPERTY_PROCATTACK_BONUS_DAMAGE_MAGICAL_TARGET|9|GetModifierProcAttack_BonusDamage_Magical_Target
modifierfunction.MODIFIER_PROPERTY_PROCATTACK_FEEDBACK|10|GetModifierProcAttack_Feedback
modifierfunction.MODIFIER_PROPERTY_OVERRIDE_ATTACK_DAMAGE|11|GetModifierOverrideAttackDamage
modifierfunction.MODIFIER_PROPERTY_PRE_ATTACK|12|GetModifierPreAttack
modifierfunction.MODIFIER_PROPERTY_INVISIBILITY_LEVEL|13|GetModifierInvisibilityLevel
modifierfunction.MODIFIER_PROPERTY_INVISIBILITY_ATTACK_BEHAVIOR_EXCEPTION|14|GetModifierInvisibilityAttackBehaviorException
modifierfunction.MODIFIER_PROPERTY_PERSISTENT_INVISIBILITY|15|GetModifierPersistentInvisibility
modifierfunction.MODIFIER_PROPERTY_MOVESPEED_BONUS_CONSTANT|16|GetModifierMoveSpeedBonus_Constant
modifierfunction.MODIFIER_PROPERTY_MOVESPEED_BASE_OVERRIDE|17|GetModifierMoveSpeedOverride
modifierfunction.MODIFIER_PROPERTY_MOVESPEED_BONUS_PERCENTAGE|18|GetModifierMoveSpeedBonus_Percentage
modifierfunction.MODIFIER_PROPERTY_MOVESPEED_BONUS_PERCENTAGE_UNIQUE|19|GetModifierMoveSpeedBonus_Percentage_Unique
modifierfunction.MODIFIER_PROPERTY_MOVESPEED_BONUS_UNIQUE|20|GetModifierMoveSpeedBonus_Special_Boots
modifierfunction.MODIFIER_PROPERTY_MOVESPEED_BONUS_UNIQUE_2|21|GetModifierMoveSpeedBonus_Special_Boots_2
modifierfunction.MODIFIER_PROPERTY_MOVESPEED_BONUS_CONSTANT_UNIQUE|22|GetModifierMoveSpeedBonus_Constant_Unique
modifierfunction.MODIFIER_PROPERTY_MOVESPEED_BONUS_CONSTANT_UNIQUE_2|23|GetModifierMoveSpeedBonus_Constant_Unique_2
modifierfunction.MODIFIER_PROPERTY_MOVESPEED_ABSOLUTE|24|GetModifierMoveSpeed_Absolute
modifierfunction.MODIFIER_PROPERTY_MOVESPEED_ABSOLUTE_MIN|25|GetModifierMoveSpeed_AbsoluteMin
modifierfunction.MODIFIER_PROPERTY_MOVESPEED_ABSOLUTE_MAX|26|GetModifierMoveSpeed_AbsoluteMax
modifierfunction.MODIFIER_PROPERTY_IGNORE_MOVESPEED_LIMIT|27|GetModifierIgnoreMovespeedLimit
modifierfunction.MODIFIER_PROPERTY_MOVESPEED_LIMIT|28|GetModifierMoveSpeed_Limit
modifierfunction.MODIFIER_PROPERTY_ATTACKSPEED_BASE_OVERRIDE|29|GetModifierAttackSpeedBaseOverride
modifierfunction.MODIFIER_PROPERTY_FIXED_ATTACK_RATE|30|GetModifierFixedAttackRate
modifierfunction.MODIFIER_PROPERTY_ATTACKSPEED_BONUS_CONSTANT|31|GetModifierAttackSpeedBonus_Constant
modifierfunction.MODIFIER_PROPERTY_IGNORE_ATTACKSPEED_LIMIT|32|GetModifierAttackSpeed_Limit
modifierfunction.MODIFIER_PROPERTY_COOLDOWN_REDUCTION_CONSTANT|33|GetModifierCooldownReduction_Constant
modifierfunction.MODIFIER_PROPERTY_MANACOST_REDUCTION_CONSTANT|34|GetModifierManacostReduction_Constant
modifierfunction.MODIFIER_PROPERTY_HEALTHCOST_REDUCTION_CONSTANT|35|GetModifierHealthcostReduction_Constant
modifierfunction.MODIFIER_PROPERTY_BASE_ATTACK_TIME_CONSTANT|36|GetModifierBaseAttackTimeConstant
modifierfunction.MODIFIER_PROPERTY_BASE_ATTACK_TIME_CONSTANT_ADJUST|37|GetModifierBaseAttackTimeConstant_Adjust
modifierfunction.MODIFIER_PROPERTY_BASE_ATTACK_TIME_PERCENTAGE|38|GetModifierBaseAttackTimePercentage
modifierfunction.MODIFIER_PROPERTY_ATTACK_POINT_CONSTANT|39|GetModifierAttackPointConstant
modifierfunction.MODIFIER_PROPERTY_BONUSDAMAGEOUTGOING_PERCENTAGE|40|GetModifierBonusDamageOutgoing_Percentage
modifierfunction.MODIFIER_PROPERTY_DAMAGEOUTGOING_PERCENTAGE|41|GetModifierDamageOutgoing_Percentage
modifierfunction.MODIFIER_PROPERTY_DAMAGEOUTGOING_PERCENTAGE_ILLUSION|42|GetModifierDamageOutgoing_Percentage_Illusion
modifierfunction.MODIFIER_PROPERTY_DAMAGEOUTGOING_PERCENTAGE_ILLUSION_AMPLIFY|43|GetModifierDamageOutgoing_Percentage_Illusion_Amplify
modifierfunction.MODIFIER_PROPERTY_TOTALDAMAGEOUTGOING_PERCENTAGE|44|GetModifierTotalDamageOutgoing_Percentage
modifierfunction.MODIFIER_PROPERTY_SPELL_AMPLIFY_PERCENTAGE_CREEP|45|GetModifierSpellAmplify_PercentageCreep
modifierfunction.MODIFIER_PROPERTY_SPELL_AMPLIFY_PERCENTAGE|46|GetModifierSpellAmplify_Percentage
modifierfunction.MODIFIER_PROPERTY_SPELL_AMPLIFY_PERCENTAGE_UNIQUE|47|GetModifierSpellAmplify_PercentageUnique
modifierfunction.MODIFIER_PROPERTY_HEAL_AMPLIFY_PERCENTAGE_SOURCE|48|GetModifierHealAmplify_PercentageSource
modifierfunction.MODIFIER_PROPERTY_HEAL_AMPLIFY_PERCENTAGE_TARGET|49|GetModifierHealAmplify_PercentageTarget
modifierfunction.MODIFIER_PROPERTY_HP_REGEN_CAN_BE_NEGATIVE|50|GetModifierHPRegen_CanBeNegative
modifierfunction.MODIFIER_PROPERTY_HP_REGEN_AMPLIFY_PERCENTAGE|51|GetModifierHPRegenAmplify_Percentage
modifierfunction.MODIFIER_PROPERTY_LIFESTEAL_AMPLIFY_PERCENTAGE|52|GetModifierLifestealRegenAmplify_Percentage
modifierfunction.MODIFIER_PROPERTY_SPELL_LIFESTEAL_AMPLIFY_PERCENTAGE|53|GetModifierSpellLifestealRegenAmplify_Percentage
modifierfunction.MODIFIER_PROPERTY_MP_REGEN_AMPLIFY_PERCENTAGE|54|GetModifierMPRegenAmplify_Percentage
modifierfunction.MODIFIER_PROPERTY_MANA_DRAIN_AMPLIFY_PERCENTAGE|55|GetModifierManaDrainAmplify_Percentage
modifierfunction.MODIFIER_PROPERTY_MP_RESTORE_AMPLIFY_PERCENTAGE|56|GetModifierMPRestoreAmplify_Percentage
modifierfunction.MODIFIER_PROPERTY_BASEDAMAGEOUTGOING_PERCENTAGE|57|GetModifierBaseDamageOutgoing_Percentage
modifierfunction.MODIFIER_PROPERTY_BASEDAMAGEOUTGOING_PERCENTAGE_UNIQUE|58|GetModifierBaseDamageOutgoing_PercentageUnique
modifierfunction.MODIFIER_PROPERTY_INCOMING_DAMAGE_PERCENTAGE|59|GetModifierIncomingDamage_Percentage
modifierfunction.MODIFIER_PROPERTY_INCOMING_PHYSICAL_DAMAGE_PERCENTAGE|60|GetModifierIncomingPhysicalDamage_Percentage
modifierfunction.MODIFIER_PROPERTY_INCOMING_PHYSICAL_DAMAGE_CONSTANT|61|GetModifierIncomingPhysicalDamageConstant
modifierfunction.MODIFIER_PROPERTY_INCOMING_SPELL_DAMAGE_CONSTANT|62|GetModifierIncomingSpellDamageConstant
modifierfunction.MODIFIER_PROPERTY_EVASION_CONSTANT|63|GetModifierEvasion_Constant
modifierfunction.MODIFIER_PROPERTY_NEGATIVE_EVASION_CONSTANT|64|GetModifierNegativeEvasion_Constant
modifierfunction.MODIFIER_PROPERTY_STATUS_RESISTANCE|65|GetModifierStatusResistance
modifierfunction.MODIFIER_PROPERTY_STATUS_RESISTANCE_STACKING|66|GetModifierStatusResistanceStacking
modifierfunction.MODIFIER_PROPERTY_STATUS_RESISTANCE_CASTER|67|GetModifierStatusResistanceCaster
modifierfunction.MODIFIER_PROPERTY_AVOID_DAMAGE|68|GetModifierAvoidDamage
modifierfunction.MODIFIER_PROPERTY_AVOID_SPELL|69|GetModifierAvoidSpell
modifierfunction.MODIFIER_PROPERTY_MISS_PERCENTAGE|70|GetModifierMiss_Percentage
modifierfunction.MODIFIER_PROPERTY_PHYSICAL_ARMOR_BASE_PERCENTAGE|71|GetModifierPhysicalArmorBase_Percentage
modifierfunction.MODIFIER_PROPERTY_PHYSICAL_ARMOR_TOTAL_PERCENTAGE|72|GetModifierPhysicalArmorTotal_Percentage
modifierfunction.MODIFIER_PROPERTY_PHYSICAL_ARMOR_BONUS|73|GetModifierPhysicalArmorBonus
modifierfunction.MODIFIER_PROPERTY_PHYSICAL_ARMOR_BONUS_UNIQUE|74|GetModifierPhysicalArmorBonusUnique
modifierfunction.MODIFIER_PROPERTY_PHYSICAL_ARMOR_BONUS_UNIQUE_ACTIVE|75|GetModifierPhysicalArmorBonusUniqueActive
modifierfunction.MODIFIER_PROPERTY_PHYSICAL_ARMOR_BONUS_POST|76|GetModifierPhysicalArmorBonusPost
modifierfunction.MODIFIER_PROPERTY_IGNORE_PHYSICAL_ARMOR|77|GetModifierIgnorePhysicalArmor
modifierfunction.MODIFIER_PROPERTY_MAGICAL_RESISTANCE_BASE_REDUCTION|78|GetModifierMagicalResistanceBaseReduction
modifierfunction.MODIFIER_PROPERTY_MAGICAL_RESISTANCE_DIRECT_MODIFICATION|79|GetModifierMagicalResistanceDirectModification
modifierfunction.MODIFIER_PROPERTY_MAGICAL_RESISTANCE_BONUS|80|GetModifierMagicalResistanceBonus
modifierfunction.MODIFIER_PROPERTY_MAGICAL_RESISTANCE_BONUS_ILLUSIONS|81|GetModifierMagicalResistanceBonusIllusions
modifierfunction.MODIFIER_PROPERTY_MAGICAL_RESISTANCE_BONUS_UNIQUE|82|GetModifierMagicalResistanceBonusUnique
modifierfunction.MODIFIER_PROPERTY_MAGICAL_RESISTANCE_DECREPIFY_UNIQUE|83|GetModifierMagicalResistanceDecrepifyUnique
modifierfunction.MODIFIER_PROPERTY_BASE_MANA_REGEN|84|GetModifierBaseRegen
modifierfunction.MODIFIER_PROPERTY_MANA_REGEN_CONSTANT|85|GetModifierConstantManaRegen
modifierfunction.MODIFIER_PROPERTY_MANA_REGEN_CONSTANT_UNIQUE|86|GetModifierConstantManaRegenUnique
modifierfunction.MODIFIER_PROPERTY_MANA_REGEN_TOTAL_PERCENTAGE|87|GetModifierTotalPercentageManaRegen
modifierfunction.MODIFIER_PROPERTY_HEALTH_REGEN_CONSTANT|88|GetModifierConstantHealthRegen
modifierfunction.MODIFIER_PROPERTY_HEALTH_REGEN_PERCENTAGE|89|GetModifierHealthRegenPercentage
modifierfunction.MODIFIER_PROPERTY_HEALTH_REGEN_PERCENTAGE_UNIQUE|90|GetModifierHealthRegenPercentageUnique
modifierfunction.MODIFIER_PROPERTY_HEALTH_BONUS|91|GetModifierHealthBonus
modifierfunction.MODIFIER_PROPERTY_MANA_BONUS|92|GetModifierManaBonus
modifierfunction.MODIFIER_PROPERTY_EXTRA_STRENGTH_BONUS|93|GetModifierExtraStrengthBonus
modifierfunction.MODIFIER_PROPERTY_EXTRA_HEALTH_BONUS|94|GetModifierExtraHealthBonus
modifierfunction.MODIFIER_PROPERTY_EXTRA_MANA_BONUS|95|GetModifierExtraManaBonus
modifierfunction.MODIFIER_PROPERTY_EXTRA_MANA_BONUS_PERCENTAGE|96|GetModifierExtraManaBonusPercentage
modifierfunction.MODIFIER_PROPERTY_EXTRA_HEALTH_PERCENTAGE|97|GetModifierExtraHealthPercentage
modifierfunction.MODIFIER_PROPERTY_EXTRA_MANA_PERCENTAGE|98|GetModifierExtraManaPercentage
modifierfunction.MODIFIER_PROPERTY_STATS_STRENGTH_BONUS|99|GetModifierBonusStats_Strength
modifierfunction.MODIFIER_PROPERTY_STATS_AGILITY_BONUS|100|GetModifierBonusStats_Agility
modifierfunction.MODIFIER_PROPERTY_STATS_INTELLECT_BONUS|101|GetModifierBonusStats_Intellect
modifierfunction.MODIFIER_PROPERTY_STATS_STRENGTH_BONUS_PERCENTAGE|102|GetModifierBonusStats_Strength_Percentage
modifierfunction.MODIFIER_PROPERTY_STATS_AGILITY_BONUS_PERCENTAGE|103|GetModifierBonusStats_Agility_Percentage
modifierfunction.MODIFIER_PROPERTY_STATS_INTELLECT_BONUS_PERCENTAGE|104|GetModifierBonusStats_Intellect_Percentage
modifierfunction.MODIFIER_PROPERTY_CAST_RANGE_BONUS|105|GetModifierCastRangeBonus
modifierfunction.MODIFIER_PROPERTY_CAST_RANGE_BONUS_PERCENTAGE|106|GetModifierCastRangeBonusPercentage
modifierfunction.MODIFIER_PROPERTY_CAST_RANGE_BONUS_TARGET|107|GetModifierCastRangeBonusTarget
modifierfunction.MODIFIER_PROPERTY_CAST_RANGE_BONUS_STACKING|108|GetModifierCastRangeBonusStacking
modifierfunction.MODIFIER_PROPERTY_ATTACK_RANGE_BASE_OVERRIDE|109|GetModifierAttackRangeOverride
modifierfunction.MODIFIER_PROPERTY_ATTACK_RANGE_BONUS|110|GetModifierAttackRangeBonus
modifierfunction.MODIFIER_PROPERTY_ATTACK_RANGE_BONUS_UNIQUE|111|GetModifierAttackRangeBonusUnique
modifierfunction.MODIFIER_PROPERTY_ATTACK_RANGE_BONUS_PERCENTAGE|112|GetModifierAttackRangeBonusPercentage
modifierfunction.MODIFIER_PROPERTY_MAX_ATTACK_RANGE|113|GetModifierMaxAttackRange
modifierfunction.MODIFIER_PROPERTY_PROJECTILE_SPEED_BONUS|114|GetModifierProjectileSpeedBonus
modifierfunction.MODIFIER_PROPERTY_PROJECTILE_SPEED_BONUS_PERCENTAGE|115|GetModifierProjectileSpeedBonusPercentage
modifierfunction.MODIFIER_PROPERTY_PROJECTILE_NAME|116|GetModifierProjectileName
modifierfunction.MODIFIER_PROPERTY_REINCARNATION|117|ReincarnateTime
modifierfunction.MODIFIER_PROPERTY_RESPAWNTIME|118|GetModifierConstantRespawnTime
modifierfunction.MODIFIER_PROPERTY_RESPAWNTIME_PERCENTAGE|119|GetModifierPercentageRespawnTime
modifierfunction.MODIFIER_PROPERTY_RESPAWNTIME_STACKING|120|GetModifierStackingRespawnTime
modifierfunction.MODIFIER_PROPERTY_COOLDOWN_PERCENTAGE|121|GetModifierPercentageCooldown
modifierfunction.MODIFIER_PROPERTY_COOLDOWN_PERCENTAGE_ONGOING|122|GetModifierPercentageCooldownOngoing
modifierfunction.MODIFIER_PROPERTY_CASTTIME_PERCENTAGE|123|GetModifierPercentageCasttime
modifierfunction.MODIFIER_PROPERTY_ATTACK_ANIM_TIME_PERCENTAGE|124|GetModifierPercentageAttackAnimTime
modifierfunction.MODIFIER_PROPERTY_MANACOST_PERCENTAGE|125|GetModifierPercentageManacost
modifierfunction.MODIFIER_PROPERTY_MANACOST_PERCENTAGE_STACKING|126|GetModifierPercentageManacostStacking
modifierfunction.MODIFIER_PROPERTY_HEALTHCOST_PERCENTAGE|127|GetModifierPercentageHealthcost
modifierfunction.MODIFIER_PROPERTY_HEALTHCOST_PERCENTAGE_STACKING|128|GetModifierPercentageHealthcostStacking
modifierfunction.MODIFIER_PROPERTY_DEATHGOLDCOST|129|GetModifierConstantDeathGoldCost
modifierfunction.MODIFIER_PROPERTY_EXP_RATE_BOOST|130|GetModifierPercentageExpRateBoost
modifierfunction.MODIFIER_PROPERTY_GOLD_RATE_BOOST|131|GetModifierPercentageGoldRateBoost
modifierfunction.MODIFIER_PROPERTY_PREATTACK_CRITICALSTRIKE|132|GetModifierPreAttack_CriticalStrike
modifierfunction.MODIFIER_PROPERTY_PREATTACK_TARGET_CRITICALSTRIKE|133|GetModifierPreAttack_Target_CriticalStrike
modifierfunction.MODIFIER_PROPERTY_MAGICAL_CONSTANT_BLOCK|134|GetModifierMagical_ConstantBlock
modifierfunction.MODIFIER_PROPERTY_PHYSICAL_CONSTANT_BLOCK|135|GetModifierPhysical_ConstantBlock
modifierfunction.MODIFIER_PROPERTY_PHYSICAL_CONSTANT_BLOCK_SPECIAL|136|GetModifierPhysical_ConstantBlockSpecial
modifierfunction.MODIFIER_PROPERTY_TOTAL_CONSTANT_BLOCK_UNAVOIDABLE_PRE_ARMOR|137|GetModifierPhysical_ConstantBlockUnavoidablePreArmor
modifierfunction.MODIFIER_PROPERTY_TOTAL_CONSTANT_BLOCK|138|GetModifierTotal_ConstantBlock
modifierfunction.MODIFIER_PROPERTY_OVERRIDE_ANIMATION|139|GetOverrideAnimation
modifierfunction.MODIFIER_PROPERTY_OVERRIDE_ANIMATION_WEIGHT|140|GetOverrideAnimationWeight
modifierfunction.MODIFIER_PROPERTY_OVERRIDE_ANIMATION_RATE|141|GetOverrideAnimationRate
modifierfunction.MODIFIER_PROPERTY_ABSORB_SPELL|142|GetAbsorbSpell
modifierfunction.MODIFIER_PROPERTY_REFLECT_SPELL|143|GetReflectSpell
modifierfunction.MODIFIER_PROPERTY_DISABLE_AUTOATTACK|144|GetDisableAutoAttack
modifierfunction.MODIFIER_PROPERTY_BONUS_DAY_VISION|145|GetBonusDayVision
modifierfunction.MODIFIER_PROPERTY_BONUS_NIGHT_VISION|146|GetBonusNightVision
modifierfunction.MODIFIER_PROPERTY_BONUS_NIGHT_VISION_UNIQUE|147|GetBonusNightVisionUnique
modifierfunction.MODIFIER_PROPERTY_BONUS_VISION_PERCENTAGE|148|GetBonusVisionPercentage
modifierfunction.MODIFIER_PROPERTY_FIXED_DAY_VISION|149|GetFixedDayVision
modifierfunction.MODIFIER_PROPERTY_FIXED_NIGHT_VISION|150|GetFixedNightVision
modifierfunction.MODIFIER_PROPERTY_MIN_HEALTH|151|GetMinHealth
modifierfunction.MODIFIER_PROPERTY_ABSOLUTE_NO_DAMAGE_PHYSICAL|152|GetAbsoluteNoDamagePhysical
modifierfunction.MODIFIER_PROPERTY_ABSOLUTE_NO_DAMAGE_MAGICAL|153|GetAbsoluteNoDamageMagical
modifierfunction.MODIFIER_PROPERTY_ABSOLUTE_NO_DAMAGE_PURE|154|GetAbsoluteNoDamagePure
modifierfunction.MODIFIER_PROPERTY_IS_ILLUSION|155|GetIsIllusion
modifierfunction.MODIFIER_PROPERTY_ILLUSION_LABEL|156|GetModifierIllusionLabel
modifierfunction.MODIFIER_PROPERTY_STRONG_ILLUSION|157|GetModifierStrongIllusion
modifierfunction.MODIFIER_PROPERTY_SUPER_ILLUSION|158|GetModifierSuperIllusion
modifierfunction.MODIFIER_PROPERTY_SUPER_ILLUSION_WITH_ULTIMATE|159|GetModifierSuperIllusionWithUltimate
modifierfunction.MODIFIER_PROPERTY_XP_DURING_DEATH|160|GetModifierXPDuringDeath
modifierfunction.MODIFIER_PROPERTY_TURN_RATE_PERCENTAGE|161|GetModifierTurnRate_Percentage
modifierfunction.MODIFIER_PROPERTY_TURN_RATE_OVERRIDE|162|GetModifierTurnRate_Override
modifierfunction.MODIFIER_PROPERTY_DISABLE_HEALING|163|GetDisableHealing
modifierfunction.MODIFIER_PROPERTY_ALWAYS_ALLOW_ATTACK|164|GetAlwaysAllowAttack
modifierfunction.MODIFIER_PROPERTY_ALWAYS_ETHEREAL_ATTACK|165|GetAllowEtherealAttack
modifierfunction.MODIFIER_PROPERTY_OVERRIDE_ATTACK_MAGICAL|166|GetOverrideAttackMagical
modifierfunction.MODIFIER_PROPERTY_UNIT_STATS_NEEDS_REFRESH|167|GetModifierUnitStatsNeedsRefresh
modifierfunction.MODIFIER_PROPERTY_BOUNTY_CREEP_MULTIPLIER|168|Unused
modifierfunction.MODIFIER_PROPERTY_BOUNTY_OTHER_MULTIPLIER|169|Unused
modifierfunction.MODIFIER_PROPERTY_UNIT_DISALLOW_UPGRADING|170|GetModifierUnitDisllowUpgrading
modifierfunction.MODIFIER_PROPERTY_DODGE_PROJECTILE|171|GetModifierDodgeProjectile
modifierfunction.MODIFIER_PROPERTY_TRIGGER_COSMETIC_AND_END_ATTACK|172|GetTriggerCosmeticAndEndAttack
modifierfunction.MODIFIER_PROPERTY_MAX_DEBUFF_DURATION|173|GetModifierMaxDebuffDuration
modifierfunction.MODIFIER_PROPERTY_PRIMARY_STAT_DAMAGE_MULTIPLIER|174|GetPrimaryStatDamageMultiplier
modifierfunction.MODIFIER_PROPERTY_PREATTACK_DEADLY_BLOW|175|GetModifierPreAttack_DeadlyBlow
modifierfunction.MODIFIER_PROPERTY_ALWAYS_AUTOATTACK_WHILE_HOLD_POSITION|176|GetAlwaysAutoAttackWhileHoldPosition
modifierfunction.MODIFIER_EVENT_ON_SPELL_TARGET_READY|177|OnSpellTargetReady
modifierfunction.MODIFIER_EVENT_ON_ATTACK_RECORD|178|OnAttackRecord
modifierfunction.MODIFIER_EVENT_ON_ATTACK_START|179|OnAttackStart
modifierfunction.MODIFIER_EVENT_ON_ATTACK|180|OnAttack
modifierfunction.MODIFIER_EVENT_ON_ATTACK_LANDED|181|OnAttackLanded
modifierfunction.MODIFIER_EVENT_ON_ATTACK_FAIL|182|OnAttackFail
modifierfunction.MODIFIER_EVENT_ON_ATTACK_ALLIED|183|OnAttackAllied
modifierfunction.MODIFIER_EVENT_ON_PROJECTILE_DODGE|184|OnProjectileDodge
modifierfunction.MODIFIER_EVENT_ON_ORDER|185|OnOrder
modifierfunction.MODIFIER_EVENT_ON_UNIT_MOVED|186|OnUnitMoved
modifierfunction.MODIFIER_EVENT_ON_ABILITY_START|187|OnAbilityStart
modifierfunction.MODIFIER_EVENT_ON_ABILITY_EXECUTED|188|OnAbilityExecuted
modifierfunction.MODIFIER_EVENT_ON_ABILITY_FULLY_CAST|189|OnAbilityFullyCast
modifierfunction.MODIFIER_EVENT_ON_BREAK_INVISIBILITY|190|OnBreakInvisibility
modifierfunction.MODIFIER_EVENT_ON_ABILITY_END_CHANNEL|191|OnAbilityEndChannel
modifierfunction.MODIFIER_EVENT_ON_PROCESS_UPGRADE|192|Unused
modifierfunction.MODIFIER_EVENT_ON_REFRESH|193|Unused
modifierfunction.MODIFIER_EVENT_ON_TAKEDAMAGE|194|OnTakeDamage
modifierfunction.MODIFIER_EVENT_ON_DEATH_PREVENTED|195|OnDamagePrevented
modifierfunction.MODIFIER_EVENT_ON_STATE_CHANGED|196|OnStateChanged
modifierfunction.MODIFIER_EVENT_ON_ORB_EFFECT|197|Unused
modifierfunction.MODIFIER_EVENT_ON_PROCESS_CLEAVE|198|OnProcessCleave
modifierfunction.MODIFIER_EVENT_ON_DAMAGE_CALCULATED|199|OnDamageCalculated
modifierfunction.MODIFIER_EVENT_ON_MAGIC_DAMAGE_CALCULATED|200|OnMagicDamageCalculated
modifierfunction.MODIFIER_EVENT_ON_ATTACKED|201|OnAttacked
modifierfunction.MODIFIER_EVENT_ON_DEATH|202|OnDeath
modifierfunction.MODIFIER_EVENT_ON_DEATH_COMPLETED|203|OnDeathCompleted
modifierfunction.MODIFIER_EVENT_ON_RESPAWN|204|OnRespawn
modifierfunction.MODIFIER_EVENT_ON_SPENT_MANA|205|OnSpentMana
modifierfunction.MODIFIER_EVENT_ON_SPENT_HEALTH|206|OnSpentHealth
modifierfunction.MODIFIER_EVENT_ON_TELEPORTING|207|OnTeleporting
modifierfunction.MODIFIER_EVENT_ON_TELEPORTED|208|OnTeleported
modifierfunction.MODIFIER_EVENT_ON_SET_LOCATION|209|OnSetLocation
modifierfunction.MODIFIER_EVENT_ON_HEALTH_GAINED|210|OnHealthGained
modifierfunction.MODIFIER_EVENT_ON_MANA_GAINED|211|OnManaGained
modifierfunction.MODIFIER_EVENT_ON_TAKEDAMAGE_KILLCREDIT|212|OnTakeDamageKillCredit
modifierfunction.MODIFIER_EVENT_ON_HERO_KILLED|213|OnHeroKilled
modifierfunction.MODIFIER_EVENT_ON_HEAL_RECEIVED|214|OnHealReceived
modifierfunction.MODIFIER_EVENT_ON_BUILDING_KILLED|215|OnBuildingKilled
modifierfunction.MODIFIER_EVENT_ON_MODEL_CHANGED|216|OnModelChanged
modifierfunction.MODIFIER_EVENT_ON_MODIFIER_ADDED|217|OnModifierAdded
modifierfunction.MODIFIER_PROPERTY_TOOLTIP|218|OnTooltip
modifierfunction.MODIFIER_PROPERTY_MODEL_CHANGE|219|GetModifierModelChange
modifierfunction.MODIFIER_PROPERTY_MODEL_SCALE|220|GetModifierModelScale
modifierfunction.MODIFIER_PROPERTY_MODEL_SCALE_ANIMATE_TIME|221|GetModifierModelScaleAnimateTime
modifierfunction.MODIFIER_PROPERTY_IS_SCEPTER|222|GetModifierScepter
modifierfunction.MODIFIER_PROPERTY_IS_SHARD|223|GetModifierShard
modifierfunction.MODIFIER_PROPERTY_RADAR_COOLDOWN_REDUCTION|224|GetModifierRadarCooldownReduction
modifierfunction.MODIFIER_PROPERTY_TRANSLATE_ACTIVITY_MODIFIERS|225|GetActivityTranslationModifiers
modifierfunction.MODIFIER_PROPERTY_TRANSLATE_ATTACK_SOUND|226|GetAttackSound
modifierfunction.MODIFIER_PROPERTY_LIFETIME_FRACTION|227|GetUnitLifetimeFraction
modifierfunction.MODIFIER_PROPERTY_PROVIDES_FOW_POSITION|228|GetModifierProvidesFOWVision
modifierfunction.MODIFIER_PROPERTY_SPELLS_REQUIRE_HP|229|GetModifierSpellsRequireHP
modifierfunction.MODIFIER_PROPERTY_FORCE_DRAW_MINIMAP|230|GetForceDrawOnMinimap
modifierfunction.MODIFIER_PROPERTY_DISABLE_TURNING|231|GetModifierDisableTurning
modifierfunction.MODIFIER_PROPERTY_IGNORE_CAST_ANGLE|232|GetModifierIgnoreCastAngle
modifierfunction.MODIFIER_PROPERTY_CHANGE_ABILITY_VALUE|233|GetModifierChangeAbilityValue
modifierfunction.MODIFIER_PROPERTY_OVERRIDE_ABILITY_SPECIAL|234|GetModifierOverrideAbilitySpecial
modifierfunction.MODIFIER_PROPERTY_OVERRIDE_ABILITY_SPECIAL_VALUE|235|GetModifierOverrideAbilitySpecialValue
modifierfunction.MODIFIER_PROPERTY_ABILITY_LAYOUT|236|GetModifierAbilityLayout
modifierfunction.MODIFIER_EVENT_ON_DOMINATED|237|OnDominated
modifierfunction.MODIFIER_EVENT_ON_KILL|238|OnKill
modifierfunction.MODIFIER_EVENT_ON_ASSIST|239|OnAssist
modifierfunction.MODIFIER_PROPERTY_TEMPEST_DOUBLE|240|GetModifierTempestDouble
modifierfunction.MODIFIER_PROPERTY_PRESERVE_PARTICLES_ON_MODEL_CHANGE|241|PreserveParticlesOnModelChanged
modifierfunction.MODIFIER_EVENT_ON_ATTACK_FINISHED|242|OnAttackFinished
modifierfunction.MODIFIER_PROPERTY_IGNORE_COOLDOWN|243|GetModifierIgnoreCooldown
modifierfunction.MODIFIER_PROPERTY_CAN_ATTACK_TREES|244|GetModifierCanAttackTrees
modifierfunction.MODIFIER_PROPERTY_VISUAL_Z_DELTA|245|GetVisualZDelta
modifierfunction.MODIFIER_PROPERTY_VISUAL_Z_SPEED_BASE_OVERRIDE|246|GetVisualZSpeedBaseOverride
modifierfunction.MODIFIER_PROPERTY_INCOMING_DAMAGE_ILLUSION|247|
modifierfunction.MODIFIER_PROPERTY_DONT_GIVE_VISION_OF_ATTACKER|248|GetModifierNoVisionOfAttacker
modifierfunction.MODIFIER_PROPERTY_TOOLTIP2|249|OnTooltip2
modifierfunction.MODIFIER_EVENT_ON_ATTACK_RECORD_DESTROY|250|OnAttackRecordDestroy
modifierfunction.MODIFIER_EVENT_ON_PROJECTILE_OBSTRUCTION_HIT|251|OnProjectileObstructionHit
modifierfunction.MODIFIER_PROPERTY_SUPPRESS_TELEPORT|252|GetSuppressTeleport
modifierfunction.MODIFIER_EVENT_ON_ATTACK_CANCELLED|253|OnAttackCancelled
modifierfunction.MODIFIER_PROPERTY_SUPPRESS_CLEAVE|254|GetSuppressCleave
modifierfunction.MODIFIER_PROPERTY_BOT_ATTACK_SCORE_BONUS|255|BotAttackScoreBonus
modifierfunction.MODIFIER_PROPERTY_ATTACKSPEED_REDUCTION_PERCENTAGE|256|GetModifierAttackSpeedReductionPercentage
modifierfunction.MODIFIER_PROPERTY_MOVESPEED_REDUCTION_PERCENTAGE|257|GetModifierMoveSpeedReductionPercentage
modifierfunction.MODIFIER_PROPERTY_ATTACK_WHILE_MOVING_TARGET|258|
modifierfunction.MODIFIER_PROPERTY_ATTACKSPEED_PERCENTAGE|259|GetModifierAttackSpeedPercentage
modifierfunction.MODIFIER_EVENT_ON_ATTEMPT_PROJECTILE_DODGE|260|OnAttemptProjectileDodge
modifierfunction.MODIFIER_EVENT_ON_PREDEBUFF_APPLIED|261|OnPreDebuffApplied
modifierfunction.MODIFIER_PROPERTY_COOLDOWN_PERCENTAGE_STACKING|262|GetModifierPercentageCooldownStacking
modifierfunction.MODIFIER_PROPERTY_SPELL_REDIRECT_TARGET|263|GetModifierSpellRedirectTarget
modifierfunction.MODIFIER_PROPERTY_TURN_RATE_CONSTANT|264|GetModifierTurnRateConstant
modifierfunction.MODIFIER_PROPERTY_RAT_PACK|265|GetModifierIsRatPack
modifierfunction.MODIFIER_PROPERTY_PHYSICALDAMAGEOUTGOING_PERCENTAGE|266|GetModifierPhysicalDamageOutgoing_Percentage
modifierfunction.MODIFIER_PROPERTY_KNOCKBACK_AMPLIFICATION_PERCENTAGE|267|GetModifierKnockbackAmplification_Percentage
modifierfunction.MODIFIER_PROPERTY_HEALTHBAR_PIPS|268|GetModifierHealthBarPips
modifierfunction.MODIFIER_PROPERTY_INCOMING_DAMAGE_CONSTANT|269|GetModifierIncomingDamageConstant
modifierfunction.MODIFIER_EVENT_SPELL_APPLIED_SUCCESSFULLY|270|OnSpellAppliedSuccessfully
modifierfunction.MODIFIER_PROPERTY_AVOID_DAMAGE_AFTER_REDUCTIONS|271|GetModifierAvoidDamageAfterReductions
modifierfunction.MODIFIER_FUNCTION_LAST|272|
modifierfunction.MODIFIER_FUNCTION_INVALID|65535|

# modifierstate
Enumerator|Value|Description
--|--|--
modifierstate.MODIFIER_STATE_ROOTED|0|
modifierstate.MODIFIER_STATE_DISARMED|1|
modifierstate.MODIFIER_STATE_ATTACK_IMMUNE|2|
modifierstate.MODIFIER_STATE_SILENCED|3|
modifierstate.MODIFIER_STATE_MUTED|4|
modifierstate.MODIFIER_STATE_STUNNED|5|
modifierstate.MODIFIER_STATE_HEXED|6|
modifierstate.MODIFIER_STATE_INVISIBLE|7|
modifierstate.MODIFIER_STATE_INVULNERABLE|8|
modifierstate.MODIFIER_STATE_MAGIC_IMMUNE|9|
modifierstate.MODIFIER_STATE_PROVIDES_VISION|10|
modifierstate.MODIFIER_STATE_NIGHTMARED|11|
modifierstate.MODIFIER_STATE_BLOCK_DISABLED|12|
modifierstate.MODIFIER_STATE_EVADE_DISABLED|13|
modifierstate.MODIFIER_STATE_UNSELECTABLE|14|
modifierstate.MODIFIER_STATE_CANNOT_TARGET_ENEMIES|15|
modifierstate.MODIFIER_STATE_CANNOT_TARGET_BUILDINGS|16|
modifierstate.MODIFIER_STATE_CANNOT_MISS|17|
modifierstate.MODIFIER_STATE_SPECIALLY_DENIABLE|18|
modifierstate.MODIFIER_STATE_FROZEN|19|
modifierstate.MODIFIER_STATE_COMMAND_RESTRICTED|20|
modifierstate.MODIFIER_STATE_NOT_ON_MINIMAP|21|
modifierstate.MODIFIER_STATE_LOW_ATTACK_PRIORITY|22|
modifierstate.MODIFIER_STATE_NO_HEALTH_BAR|23|
modifierstate.MODIFIER_STATE_NO_HEALTH_BAR_FOR_ENEMIES|24|
modifierstate.MODIFIER_STATE_NO_HEALTH_BAR_FOR_OTHER_PLAYERS|25|
modifierstate.MODIFIER_STATE_FLYING|26|
modifierstate.MODIFIER_STATE_NO_UNIT_COLLISION|27|
modifierstate.MODIFIER_STATE_NO_TEAM_MOVE_TO|28|
modifierstate.MODIFIER_STATE_NO_TEAM_SELECT|29|
modifierstate.MODIFIER_STATE_PASSIVES_DISABLED|30|
modifierstate.MODIFIER_STATE_DOMINATED|31|
modifierstate.MODIFIER_STATE_BLIND|32|
modifierstate.MODIFIER_STATE_OUT_OF_GAME|33|
modifierstate.MODIFIER_STATE_FAKE_ALLY|34|
modifierstate.MODIFIER_STATE_FLYING_FOR_PATHING_PURPOSES_ONLY|35|
modifierstate.MODIFIER_STATE_TRUESIGHT_IMMUNE|36|
modifierstate.MODIFIER_STATE_UNTARGETABLE|37|
modifierstate.MODIFIER_STATE_UNTARGETABLE_ALLIED|38|
modifierstate.MODIFIER_STATE_UNTARGETABLE_ENEMY|39|
modifierstate.MODIFIER_STATE_UNTARGETABLE_SELF|40|
modifierstate.MODIFIER_STATE_IGNORING_MOVE_AND_ATTACK_ORDERS|41|
modifierstate.MODIFIER_STATE_ALLOW_PATHING_THROUGH_TREES|42|
modifierstate.MODIFIER_STATE_NOT_ON_MINIMAP_FOR_ENEMIES|43|
modifierstate.MODIFIER_STATE_UNSLOWABLE|44|
modifierstate.MODIFIER_STATE_TETHERED|45|
modifierstate.MODIFIER_STATE_IGNORING_STOP_ORDERS|46|
modifierstate.MODIFIER_STATE_FEARED|47|
modifierstate.MODIFIER_STATE_TAUNTED|48|
modifierstate.MODIFIER_STATE_CANNOT_BE_MOTION_CONTROLLED|49|
modifierstate.MODIFIER_STATE_FORCED_FLYING_VISION|50|
modifierstate.MODIFIER_STATE_ATTACK_ALLIES|51|
modifierstate.MODIFIER_STATE_ALLOW_PATHING_THROUGH_CLIFFS|52|
modifierstate.MODIFIER_STATE_ALLOW_PATHING_THROUGH_FISSURE|53|
modifierstate.MODIFIER_STATE_SPECIALLY_UNDENIABLE|54|
modifierstate.MODIFIER_STATE_ALLOW_PATHING_THROUGH_OBSTRUCTIONS|55|
modifierstate.MODIFIER_STATE_DEBUFF_IMMUNE|56|
modifierstate.MODIFIER_STATE_NO_INVISIBILITY_VISUALS|57|
modifierstate.MODIFIER_STATE_ALLOW_PATHING_THROUGH_BASE_BLOCKER|58|
modifierstate.MODIFIER_STATE_LAST|59|

# DOTAModifierAttribute_t
Enumerator|Value|Description
--|--|--
DOTAModifierAttribute_t.MODIFIER_ATTRIBUTE_NONE|0|
DOTAModifierAttribute_t.MODIFIER_ATTRIBUTE_PERMANENT|1|
DOTAModifierAttribute_t.MODIFIER_ATTRIBUTE_MULTIPLE|2|
DOTAModifierAttribute_t.MODIFIER_ATTRIBUTE_IGNORE_INVULNERABLE|4|
DOTAModifierAttribute_t.MODIFIER_ATTRIBUTE_AURA_PRIORITY|8|
DOTAModifierAttribute_t.MODIFIER_ATTRIBUTE_IGNORE_DODGE|16|

# Attributes
Enumerator|Value|Description
--|--|--
Attributes.DOTA_ATTRIBUTE_STRENGTH|0|
Attributes.DOTA_ATTRIBUTE_AGILITY|1|
Attributes.DOTA_ATTRIBUTE_INTELLECT|2|
Attributes.DOTA_ATTRIBUTE_ALL|3|
Attributes.DOTA_ATTRIBUTE_MAX|4|
Attributes.DOTA_ATTRIBUTE_INVALID|-1|

# ParticleAttachment_t
Enumerator|Value|Description
--|--|--
ParticleAttachment_t.PATTACH_INVALID|-1|
ParticleAttachment_t.PATTACH_ABSORIGIN|0|
ParticleAttachment_t.PATTACH_ABSORIGIN_FOLLOW|1|
ParticleAttachment_t.PATTACH_CUSTOMORIGIN|2|
ParticleAttachment_t.PATTACH_CUSTOMORIGIN_FOLLOW|3|
ParticleAttachment_t.PATTACH_POINT|4|
ParticleAttachment_t.PATTACH_POINT_FOLLOW|5|
ParticleAttachment_t.PATTACH_EYES_FOLLOW|6|
ParticleAttachment_t.PATTACH_OVERHEAD_FOLLOW|7|
ParticleAttachment_t.PATTACH_WORLDORIGIN|8|
ParticleAttachment_t.PATTACH_ROOTBONE_FOLLOW|9|
ParticleAttachment_t.PATTACH_RENDERORIGIN_FOLLOW|10|
ParticleAttachment_t.PATTACH_MAIN_VIEW|11|
ParticleAttachment_t.PATTACH_WATERWAKE|12|
ParticleAttachment_t.PATTACH_CENTER_FOLLOW|13|
ParticleAttachment_t.PATTACH_CUSTOM_GAME_STATE_1|14|
ParticleAttachment_t.PATTACH_HEALTHBAR|15|
ParticleAttachment_t.MAX_PATTACH_TYPES|16|

# DOTA_MOTION_CONTROLLER_PRIORITY
Enumerator|Value|Description
--|--|--
DOTA_MOTION_CONTROLLER_PRIORITY.DOTA_MOTION_CONTROLLER_PRIORITY_LOWEST|0|
DOTA_MOTION_CONTROLLER_PRIORITY.DOTA_MOTION_CONTROLLER_PRIORITY_LOW|1|
DOTA_MOTION_CONTROLLER_PRIORITY.DOTA_MOTION_CONTROLLER_PRIORITY_MEDIUM|2|
DOTA_MOTION_CONTROLLER_PRIORITY.DOTA_MOTION_CONTROLLER_PRIORITY_HIGH|3|
DOTA_MOTION_CONTROLLER_PRIORITY.DOTA_MOTION_CONTROLLER_PRIORITY_HIGHEST|4|
DOTA_MOTION_CONTROLLER_PRIORITY.DOTA_MOTION_CONTROLLER_PRIORITY_ULTRA|5|

# DOTASpeechType_t
Enumerator|Value|Description
--|--|--
DOTASpeechType_t.DOTA_SPEECH_USER_INVALID|0|
DOTASpeechType_t.DOTA_SPEECH_USER_SINGLE|1|
DOTASpeechType_t.DOTA_SPEECH_USER_TEAM|2|
DOTASpeechType_t.DOTA_SPEECH_USER_TEAM_NEARBY|3|
DOTASpeechType_t.DOTA_SPEECH_USER_NEARBY|4|
DOTASpeechType_t.DOTA_SPEECH_USER_ALL|5|
DOTASpeechType_t.DOTA_SPEECH_GOOD_TEAM|6|
DOTASpeechType_t.DOTA_SPEECH_BAD_TEAM|7|
DOTASpeechType_t.DOTA_SPEECH_SPECTATOR|8|
DOTASpeechType_t.DOTA_SPEECH_USER_TEAM_NOSPECTATOR|9|
DOTASpeechType_t.DOTA_SPEECH_RECIPIENT_TYPE_MAX|10|

# DOTAAbilitySpeakTrigger_t
Enumerator|Value|Description
--|--|--
DOTAAbilitySpeakTrigger_t.DOTA_ABILITY_SPEAK_START_ACTION_PHASE|0|
DOTAAbilitySpeakTrigger_t.DOTA_ABILITY_SPEAK_CAST|1|

# DotaCustomUIType_t
Enumerator|Value|Description
--|--|--
DotaCustomUIType_t.DOTA_CUSTOM_UI_TYPE_HUD|0|
DotaCustomUIType_t.DOTA_CUSTOM_UI_TYPE_HERO_SELECTION|1|
DotaCustomUIType_t.DOTA_CUSTOM_UI_TYPE_PREGAME_STRATEGY|2|
DotaCustomUIType_t.DOTA_CUSTOM_UI_TYPE_GAME_INFO|3|
DotaCustomUIType_t.DOTA_CUSTOM_UI_TYPE_GAME_SETUP|4|
DotaCustomUIType_t.DOTA_CUSTOM_UI_TYPE_FLYOUT_SCOREBOARD|5|
DotaCustomUIType_t.DOTA_CUSTOM_UI_TYPE_HUD_TOP_BAR|6|
DotaCustomUIType_t.DOTA_CUSTOM_UI_TYPE_END_SCREEN|7|
DotaCustomUIType_t.DOTA_CUSTOM_UI_TYPE_COUNT|8|
DotaCustomUIType_t.DOTA_CUSTOM_UI_TYPE_INVALID|-1|

# DotaDefaultUIElement_t
Enumerator|Value|Description
--|--|--
DotaDefaultUIElement_t.DOTA_DEFAULT_UI_INVALID|-1|
DotaDefaultUIElement_t.DOTA_DEFAULT_UI_TOP_TIMEOFDAY|0|
DotaDefaultUIElement_t.DOTA_DEFAULT_UI_TOP_HEROES|1|
DotaDefaultUIElement_t.DOTA_DEFAULT_UI_FLYOUT_SCOREBOARD|2|
DotaDefaultUIElement_t.DOTA_DEFAULT_UI_ACTION_PANEL|3|
DotaDefaultUIElement_t.DOTA_DEFAULT_UI_ACTION_MINIMAP|4|
DotaDefaultUIElement_t.DOTA_DEFAULT_UI_INVENTORY_PANEL|5|
DotaDefaultUIElement_t.DOTA_DEFAULT_UI_INVENTORY_SHOP|6|
DotaDefaultUIElement_t.DOTA_DEFAULT_UI_INVENTORY_ITEMS|7|
DotaDefaultUIElement_t.DOTA_DEFAULT_UI_INVENTORY_QUICKBUY|8|
DotaDefaultUIElement_t.DOTA_DEFAULT_UI_INVENTORY_COURIER|9|
DotaDefaultUIElement_t.DOTA_DEFAULT_UI_INVENTORY_PROTECT|10|
DotaDefaultUIElement_t.DOTA_DEFAULT_UI_INVENTORY_GOLD|11|
DotaDefaultUIElement_t.DOTA_DEFAULT_UI_SHOP_SUGGESTEDITEMS|12|
DotaDefaultUIElement_t.DOTA_DEFAULT_UI_SHOP_COMMONITEMS|13|
DotaDefaultUIElement_t.DOTA_DEFAULT_UI_HERO_SELECTION_TEAMS|14|
DotaDefaultUIElement_t.DOTA_DEFAULT_UI_HERO_SELECTION_GAME_NAME|15|
DotaDefaultUIElement_t.DOTA_DEFAULT_UI_HERO_SELECTION_CLOCK|16|
DotaDefaultUIElement_t.DOTA_DEFAULT_UI_HERO_SELECTION_HEADER|17|
DotaDefaultUIElement_t.DOTA_DEFAULT_UI_TOP_MENU_BUTTONS|18|
DotaDefaultUIElement_t.DOTA_DEFAULT_UI_TOP_BAR_BACKGROUND|19|
DotaDefaultUIElement_t.DOTA_DEFAULT_UI_TOP_BAR_RADIANT_TEAM|20|
DotaDefaultUIElement_t.DOTA_DEFAULT_UI_TOP_BAR_DIRE_TEAM|21|
DotaDefaultUIElement_t.DOTA_DEFAULT_UI_TOP_BAR_SCORE|22|
DotaDefaultUIElement_t.DOTA_DEFAULT_UI_ENDGAME|23|
DotaDefaultUIElement_t.DOTA_DEFAULT_UI_ENDGAME_CHAT|24|
DotaDefaultUIElement_t.DOTA_DEFAULT_UI_QUICK_STATS|25|
DotaDefaultUIElement_t.DOTA_DEFAULT_UI_PREGAME_STRATEGYUI|26|
DotaDefaultUIElement_t.DOTA_DEFAULT_UI_KILLCAM|27|
DotaDefaultUIElement_t.DOTA_DEFAULT_UI_FIGHT_RECAP|28|
DotaDefaultUIElement_t.DOTA_DEFAULT_UI_TOP_BAR|29|
DotaDefaultUIElement_t.DOTA_DEFAULT_UI_CUSTOMUI_BEHIND_HUD_ELEMENTS|30|
DotaDefaultUIElement_t.DOTA_DEFAULT_UI_AGHANIMS_STATUS|31|
DotaDefaultUIElement_t.DOTA_DEFAULT_UI_ELEMENT_COUNT|32|

# PlayerUltimateStateOrTime_t
Enumerator|Value|Description
--|--|--
PlayerUltimateStateOrTime_t.PLAYER_ULTIMATE_STATE_READY|0|
PlayerUltimateStateOrTime_t.PLAYER_ULTIMATE_STATE_NO_MANA|-1|
PlayerUltimateStateOrTime_t.PLAYER_ULTIMATE_STATE_NOT_LEVELED|-2|
PlayerUltimateStateOrTime_t.PLAYER_ULTIMATE_STATE_HIDDEN|-3|

# PlayerOrderIssuer_t
Enumerator|Value|Description
--|--|--
PlayerOrderIssuer_t.DOTA_ORDER_ISSUER_SELECTED_UNITS|0|
PlayerOrderIssuer_t.DOTA_ORDER_ISSUER_CURRENT_UNIT_ONLY|1|
PlayerOrderIssuer_t.DOTA_ORDER_ISSUER_HERO_ONLY|2|
PlayerOrderIssuer_t.DOTA_ORDER_ISSUER_PASSED_UNIT_ONLY|3|

# OrderQueueBehavior_t
Enumerator|Value|Description
--|--|--
OrderQueueBehavior_t.DOTA_ORDER_QUEUE_DEFAULT|0|
OrderQueueBehavior_t.DOTA_ORDER_QUEUE_NEVER|1|
OrderQueueBehavior_t.DOTA_ORDER_QUEUE_ALWAYS|2|

# CLICK_BEHAVIORS
Enumerator|Value|Description
--|--|--
CLICK_BEHAVIORS.DOTA_CLICK_BEHAVIOR_NONE|0|
CLICK_BEHAVIORS.DOTA_CLICK_BEHAVIOR_MOVE|1|
CLICK_BEHAVIORS.DOTA_CLICK_BEHAVIOR_ATTACK|2|
CLICK_BEHAVIORS.DOTA_CLICK_BEHAVIOR_CAST|3|
CLICK_BEHAVIORS.DOTA_CLICK_BEHAVIOR_DROP_ITEM|4|
CLICK_BEHAVIORS.DOTA_CLICK_BEHAVIOR_DROP_SHOP_ITEM|5|
CLICK_BEHAVIORS.DOTA_CLICK_BEHAVIOR_DRAG|6|
CLICK_BEHAVIORS.DOTA_CLICK_BEHAVIOR_LEARN_ABILITY|7|
CLICK_BEHAVIORS.DOTA_CLICK_BEHAVIOR_PATROL|8|
CLICK_BEHAVIORS.DOTA_CLICK_BEHAVIOR_VECTOR_CAST|9|
CLICK_BEHAVIORS.DOTA_CLICK_BEHAVIOR_UNUSED|10|
CLICK_BEHAVIORS.DOTA_CLICK_BEHAVIOR_RADAR|11|
CLICK_BEHAVIORS.DOTA_CLICK_BEHAVIOR_LAST|12|

# AbilityLearnResult_t
Enumerator|Value|Description
--|--|--
AbilityLearnResult_t.ABILITY_CAN_BE_UPGRADED|0|
AbilityLearnResult_t.ABILITY_CANNOT_BE_UPGRADED_NOT_UPGRADABLE|1|
AbilityLearnResult_t.ABILITY_CANNOT_BE_UPGRADED_AT_MAX|2|
AbilityLearnResult_t.ABILITY_CANNOT_BE_UPGRADED_REQUIRES_LEVEL|3|
AbilityLearnResult_t.ABILITY_NOT_LEARNABLE|4|

# DOTAKeybindCommand_t
Enumerator|Value|Description
--|--|--
DOTAKeybindCommand_t.DOTA_KEYBIND_NONE|0|
DOTAKeybindCommand_t.DOTA_KEYBIND_FIRST|1|
DOTAKeybindCommand_t.DOTA_KEYBIND_CAMERA_UP|1|
DOTAKeybindCommand_t.DOTA_KEYBIND_CAMERA_DOWN|2|
DOTAKeybindCommand_t.DOTA_KEYBIND_CAMERA_LEFT|3|
DOTAKeybindCommand_t.DOTA_KEYBIND_CAMERA_RIGHT|4|
DOTAKeybindCommand_t.DOTA_KEYBIND_CAMERA_GRIP|5|
DOTAKeybindCommand_t.DOTA_KEYBIND_CAMERA_YAW_GRIP|6|
DOTAKeybindCommand_t.DOTA_KEYBIND_CAMERA_SAVED_POSITION_1|7|
DOTAKeybindCommand_t.DOTA_KEYBIND_CAMERA_SAVED_POSITION_2|8|
DOTAKeybindCommand_t.DOTA_KEYBIND_CAMERA_SAVED_POSITION_3|9|
DOTAKeybindCommand_t.DOTA_KEYBIND_CAMERA_SAVED_POSITION_4|10|
DOTAKeybindCommand_t.DOTA_KEYBIND_CAMERA_SAVED_POSITION_5|11|
DOTAKeybindCommand_t.DOTA_KEYBIND_CAMERA_SAVED_POSITION_6|12|
DOTAKeybindCommand_t.DOTA_KEYBIND_CAMERA_SAVED_POSITION_7|13|
DOTAKeybindCommand_t.DOTA_KEYBIND_CAMERA_SAVED_POSITION_8|14|
DOTAKeybindCommand_t.DOTA_KEYBIND_CAMERA_SAVED_POSITION_9|15|
DOTAKeybindCommand_t.DOTA_KEYBIND_CAMERA_SAVED_POSITION_10|16|
DOTAKeybindCommand_t.DOTA_KEYBIND_HERO_ATTACK|17|
DOTAKeybindCommand_t.DOTA_KEYBIND_HERO_MOVE|18|
DOTAKeybindCommand_t.DOTA_KEYBIND_HERO_MOVE_DIRECTION|19|
DOTAKeybindCommand_t.DOTA_KEYBIND_PATROL|20|
DOTAKeybindCommand_t.DOTA_KEYBIND_HERO_STOP|21|
DOTAKeybindCommand_t.DOTA_KEYBIND_HERO_HOLD|22|
DOTAKeybindCommand_t.DOTA_KEYBIND_HERO_SELECT|23|
DOTAKeybindCommand_t.DOTA_KEYBIND_COURIER_SELECT|24|
DOTAKeybindCommand_t.DOTA_KEYBIND_COURIER_DELIVER|25|
DOTAKeybindCommand_t.DOTA_KEYBIND_COURIER_BURST|26|
DOTAKeybindCommand_t.DOTA_KEYBIND_COURIER_SHIELD|27|
DOTAKeybindCommand_t.DOTA_KEYBIND_PAUSE|28|
DOTAKeybindCommand_t.DOTA_SELECT_ALL|29|
DOTAKeybindCommand_t.DOTA_SELECT_ALL_OTHERS|30|
DOTAKeybindCommand_t.DOTA_RECENT_EVENT|31|
DOTAKeybindCommand_t.DOTA_KEYBIND_CHAT_TEAM|32|
DOTAKeybindCommand_t.DOTA_KEYBIND_CHAT_GLOBAL|33|
DOTAKeybindCommand_t.DOTA_KEYBIND_CHAT_TEAM2|34|
DOTAKeybindCommand_t.DOTA_KEYBIND_CHAT_GLOBAL2|35|
DOTAKeybindCommand_t.DOTA_KEYBIND_CHAT_VOICE_PARTY|36|
DOTAKeybindCommand_t.DOTA_KEYBIND_CHAT_VOICE_TEAM|37|
DOTAKeybindCommand_t.DOTA_KEYBIND_CHAT_WHEEL|38|
DOTAKeybindCommand_t.DOTA_KEYBIND_CHAT_WHEEL2|39|
DOTAKeybindCommand_t.DOTA_KEYBIND_CHAT_WHEEL_CARE|40|
DOTAKeybindCommand_t.DOTA_KEYBIND_CHAT_WHEEL_BACK|41|
DOTAKeybindCommand_t.DOTA_KEYBIND_CHAT_WHEEL_NEED_WARDS|42|
DOTAKeybindCommand_t.DOTA_KEYBIND_CHAT_WHEEL_STUN|43|
DOTAKeybindCommand_t.DOTA_KEYBIND_CHAT_WHEEL_HELP|44|
DOTAKeybindCommand_t.DOTA_KEYBIND_CHAT_WHEEL_GET_PUSH|45|
DOTAKeybindCommand_t.DOTA_KEYBIND_CHAT_WHEEL_GOOD_JOB|46|
DOTAKeybindCommand_t.DOTA_KEYBIND_CHAT_WHEEL_MISSING|47|
DOTAKeybindCommand_t.DOTA_KEYBIND_CHAT_WHEEL_MISSING_TOP|48|
DOTAKeybindCommand_t.DOTA_KEYBIND_CHAT_WHEEL_MISSING_MIDDLE|49|
DOTAKeybindCommand_t.DOTA_KEYBIND_CHAT_WHEEL_MISSING_BOTTOM|50|
DOTAKeybindCommand_t.DOTA_KEYBIND_HERO_CHAT_WHEEL|51|
DOTAKeybindCommand_t.DOTA_KEYBIND_SPRAY_WHEEL|52|
DOTAKeybindCommand_t.DOTA_KEYBIND_ABILITY_PRIMARY1|53|
DOTAKeybindCommand_t.DOTA_KEYBIND_ABILITY_PRIMARY2|54|
DOTAKeybindCommand_t.DOTA_KEYBIND_ABILITY_PRIMARY3|55|
DOTAKeybindCommand_t.DOTA_KEYBIND_ABILITY_SECONDARY1|56|
DOTAKeybindCommand_t.DOTA_KEYBIND_ABILITY_SECONDARY2|57|
DOTAKeybindCommand_t.DOTA_KEYBIND_ABILITY_ULTIMATE|58|
DOTAKeybindCommand_t.DOTA_KEYBIND_TALENT_UPGRADE_LEFT|59|
DOTAKeybindCommand_t.DOTA_KEYBIND_TALENT_UPGRADE_RIGHT|60|
DOTAKeybindCommand_t.DOTA_KEYBIND_TALENT_UPGRADE_ATTRIBUTE|61|
DOTAKeybindCommand_t.DOTA_KEYBIND_ABILITY_PRIMARY1_QUICKCAST|62|
DOTAKeybindCommand_t.DOTA_KEYBIND_ABILITY_PRIMARY2_QUICKCAST|63|
DOTAKeybindCommand_t.DOTA_KEYBIND_ABILITY_PRIMARY3_QUICKCAST|64|
DOTAKeybindCommand_t.DOTA_KEYBIND_ABILITY_SECONDARY1_QUICKCAST|65|
DOTAKeybindCommand_t.DOTA_KEYBIND_ABILITY_SECONDARY2_QUICKCAST|66|
DOTAKeybindCommand_t.DOTA_KEYBIND_ABILITY_ULTIMATE_QUICKCAST|67|
DOTAKeybindCommand_t.DOTA_KEYBIND_ABILITY_PRIMARY1_EXPLICIT_AUTOCAST|68|
DOTAKeybindCommand_t.DOTA_KEYBIND_ABILITY_PRIMARY2_EXPLICIT_AUTOCAST|69|
DOTAKeybindCommand_t.DOTA_KEYBIND_ABILITY_PRIMARY3_EXPLICIT_AUTOCAST|70|
DOTAKeybindCommand_t.DOTA_KEYBIND_ABILITY_SECONDARY1_EXPLICIT_AUTOCAST|71|
DOTAKeybindCommand_t.DOTA_KEYBIND_ABILITY_SECONDARY2_EXPLICIT_AUTOCAST|72|
DOTAKeybindCommand_t.DOTA_KEYBIND_ABILITY_ULTIMATE_EXPLICIT_AUTOCAST|73|
DOTAKeybindCommand_t.DOTA_KEYBIND_ABILITY_PRIMARY1_QUICKCAST_AUTOCAST|74|
DOTAKeybindCommand_t.DOTA_KEYBIND_ABILITY_PRIMARY2_QUICKCAST_AUTOCAST|75|
DOTAKeybindCommand_t.DOTA_KEYBIND_ABILITY_PRIMARY3_QUICKCAST_AUTOCAST|76|
DOTAKeybindCommand_t.DOTA_KEYBIND_ABILITY_SECONDARY1_QUICKCAST_AUTOCAST|77|
DOTAKeybindCommand_t.DOTA_KEYBIND_ABILITY_SECONDARY2_QUICKCAST_AUTOCAST|78|
DOTAKeybindCommand_t.DOTA_KEYBIND_ABILITY_ULTIMATE_QUICKCAST_AUTOCAST|79|
DOTAKeybindCommand_t.DOTA_KEYBIND_ABILITY_PRIMARY1_AUTOMATIC_AUTOCAST|80|
DOTAKeybindCommand_t.DOTA_KEYBIND_ABILITY_PRIMARY2_AUTOMATIC_AUTOCAST|81|
DOTAKeybindCommand_t.DOTA_KEYBIND_ABILITY_PRIMARY3_AUTOMATIC_AUTOCAST|82|
DOTAKeybindCommand_t.DOTA_KEYBIND_ABILITY_SECONDARY1_AUTOMATIC_AUTOCAST|83|
DOTAKeybindCommand_t.DOTA_KEYBIND_ABILITY_SECONDARY2_AUTOMATIC_AUTOCAST|84|
DOTAKeybindCommand_t.DOTA_KEYBIND_ABILITY_ULTIMATE_AUTOMATIC_AUTOCAST|85|
DOTAKeybindCommand_t.DOTA_KEYBIND_INVENTORY1|86|
DOTAKeybindCommand_t.DOTA_KEYBIND_INVENTORY2|87|
DOTAKeybindCommand_t.DOTA_KEYBIND_INVENTORY3|88|
DOTAKeybindCommand_t.DOTA_KEYBIND_INVENTORY4|89|
DOTAKeybindCommand_t.DOTA_KEYBIND_INVENTORY5|90|
DOTAKeybindCommand_t.DOTA_KEYBIND_INVENTORY6|91|
DOTAKeybindCommand_t.DOTA_KEYBIND_INVENTORYTP|92|
DOTAKeybindCommand_t.DOTA_KEYBIND_INVENTORYNEUTRAL|93|
DOTAKeybindCommand_t.DOTA_KEYBIND_INVENTORY1_QUICKCAST|94|
DOTAKeybindCommand_t.DOTA_KEYBIND_INVENTORY2_QUICKCAST|95|
DOTAKeybindCommand_t.DOTA_KEYBIND_INVENTORY3_QUICKCAST|96|
DOTAKeybindCommand_t.DOTA_KEYBIND_INVENTORY4_QUICKCAST|97|
DOTAKeybindCommand_t.DOTA_KEYBIND_INVENTORY5_QUICKCAST|98|
DOTAKeybindCommand_t.DOTA_KEYBIND_INVENTORY6_QUICKCAST|99|
DOTAKeybindCommand_t.DOTA_KEYBIND_INVENTORYTP_QUICKCAST|100|
DOTAKeybindCommand_t.DOTA_KEYBIND_INVENTORYNEUTRAL_QUICKCAST|101|
DOTAKeybindCommand_t.DOTA_KEYBIND_INVENTORY1_AUTOCAST|102|
DOTAKeybindCommand_t.DOTA_KEYBIND_INVENTORY2_AUTOCAST|103|
DOTAKeybindCommand_t.DOTA_KEYBIND_INVENTORY3_AUTOCAST|104|
DOTAKeybindCommand_t.DOTA_KEYBIND_INVENTORY4_AUTOCAST|105|
DOTAKeybindCommand_t.DOTA_KEYBIND_INVENTORY5_AUTOCAST|106|
DOTAKeybindCommand_t.DOTA_KEYBIND_INVENTORY6_AUTOCAST|107|
DOTAKeybindCommand_t.DOTA_KEYBIND_INVENTORYTP_AUTOCAST|108|
DOTAKeybindCommand_t.DOTA_KEYBIND_INVENTORYNEUTRAL_AUTOCAST|109|
DOTAKeybindCommand_t.DOTA_KEYBIND_INVENTORY1_QUICKAUTOCAST|110|
DOTAKeybindCommand_t.DOTA_KEYBIND_INVENTORY2_QUICKAUTOCAST|111|
DOTAKeybindCommand_t.DOTA_KEYBIND_INVENTORY3_QUICKAUTOCAST|112|
DOTAKeybindCommand_t.DOTA_KEYBIND_INVENTORY4_QUICKAUTOCAST|113|
DOTAKeybindCommand_t.DOTA_KEYBIND_INVENTORY5_QUICKAUTOCAST|114|
DOTAKeybindCommand_t.DOTA_KEYBIND_INVENTORY6_QUICKAUTOCAST|115|
DOTAKeybindCommand_t.DOTA_KEYBIND_INVENTORYTP_QUICKAUTOCAST|116|
DOTAKeybindCommand_t.DOTA_KEYBIND_INVENTORYNEUTRAL_QUICKAUTOCAST|117|
DOTAKeybindCommand_t.DOTA_KEYBIND_CONTROL_GROUP1|118|
DOTAKeybindCommand_t.DOTA_KEYBIND_CONTROL_GROUP2|119|
DOTAKeybindCommand_t.DOTA_KEYBIND_CONTROL_GROUP3|120|
DOTAKeybindCommand_t.DOTA_KEYBIND_CONTROL_GROUP4|121|
DOTAKeybindCommand_t.DOTA_KEYBIND_CONTROL_GROUP5|122|
DOTAKeybindCommand_t.DOTA_KEYBIND_CONTROL_GROUP6|123|
DOTAKeybindCommand_t.DOTA_KEYBIND_CONTROL_GROUP7|124|
DOTAKeybindCommand_t.DOTA_KEYBIND_CONTROL_GROUP8|125|
DOTAKeybindCommand_t.DOTA_KEYBIND_CONTROL_GROUP9|126|
DOTAKeybindCommand_t.DOTA_KEYBIND_CONTROL_GROUP10|127|
DOTAKeybindCommand_t.DOTA_KEYBIND_CONTROL_GROUPCYCLE|128|
DOTAKeybindCommand_t.DOTA_KEYBIND_SELECT_ALLY1|129|
DOTAKeybindCommand_t.DOTA_KEYBIND_SELECT_ALLY2|130|
DOTAKeybindCommand_t.DOTA_KEYBIND_SELECT_ALLY3|131|
DOTAKeybindCommand_t.DOTA_KEYBIND_SELECT_ALLY4|132|
DOTAKeybindCommand_t.DOTA_KEYBIND_SELECT_ALLY5|133|
DOTAKeybindCommand_t.DOTA_KEYBIND_SHOP_TOGGLE|134|
DOTAKeybindCommand_t.DOTA_KEYBIND_SCOREBOARD_TOGGLE|135|
DOTAKeybindCommand_t.DOTA_KEYBIND_COMBATLOG_TOGGLE|136|
DOTAKeybindCommand_t.DOTA_KEYBIND_SCREENSHOT|137|
DOTAKeybindCommand_t.DOTA_KEYBIND_ESCAPE|138|
DOTAKeybindCommand_t.DOTA_KEYBIND_CONSOLE|139|
DOTAKeybindCommand_t.DOTA_KEYBIND_DEATH_SUMMARY|140|
DOTAKeybindCommand_t.DOTA_KEYBIND_LEARN_ABILITIES|141|
DOTAKeybindCommand_t.DOTA_KEYBIND_LEARN_STATS|142|
DOTAKeybindCommand_t.DOTA_KEYBIND_ACTIVATE_GLYPH|143|
DOTAKeybindCommand_t.DOTA_KEYBIND_ACTIVATE_RADAR|144|
DOTAKeybindCommand_t.DOTA_KEYBIND_PURCHASE_QUICKBUY|145|
DOTAKeybindCommand_t.DOTA_KEYBIND_PURCHASE_STICKY|146|
DOTAKeybindCommand_t.DOTA_KEYBIND_GRAB_STASH_ITEMS|147|
DOTAKeybindCommand_t.DOTA_KEYBIND_TOGGLE_AUTOATTACK|148|
DOTAKeybindCommand_t.DOTA_KEYBIND_TAUNT|149|
DOTAKeybindCommand_t.DOTA_KEYBIND_SHOP_CONSUMABLES|150|
DOTAKeybindCommand_t.DOTA_KEYBIND_SHOP_ATTRIBUTES|151|
DOTAKeybindCommand_t.DOTA_KEYBIND_SHOP_ARMAMENTS|152|
DOTAKeybindCommand_t.DOTA_KEYBIND_SHOP_ARCANE|153|
DOTAKeybindCommand_t.DOTA_KEYBIND_SHOP_BASICS|154|
DOTAKeybindCommand_t.DOTA_KEYBIND_SHOP_SUPPORT|155|
DOTAKeybindCommand_t.DOTA_KEYBIND_SHOP_CASTER|156|
DOTAKeybindCommand_t.DOTA_KEYBIND_SHOP_WEAPONS|157|
DOTAKeybindCommand_t.DOTA_KEYBIND_SHOP_ARMOR|158|
DOTAKeybindCommand_t.DOTA_KEYBIND_SHOP_ARTIFACTS|159|
DOTAKeybindCommand_t.DOTA_KEYBIND_SHOP_SIDE_PAGE_1|160|
DOTAKeybindCommand_t.DOTA_KEYBIND_SHOP_SIDE_PAGE_2|161|
DOTAKeybindCommand_t.DOTA_KEYBIND_SHOP_SECRET|162|
DOTAKeybindCommand_t.DOTA_KEYBIND_SHOP_SEARCHBOX|163|
DOTAKeybindCommand_t.DOTA_KEYBIND_SHOP_SLOT_1|164|
DOTAKeybindCommand_t.DOTA_KEYBIND_SHOP_SLOT_2|165|
DOTAKeybindCommand_t.DOTA_KEYBIND_SHOP_SLOT_3|166|
DOTAKeybindCommand_t.DOTA_KEYBIND_SHOP_SLOT_4|167|
DOTAKeybindCommand_t.DOTA_KEYBIND_SHOP_SLOT_5|168|
DOTAKeybindCommand_t.DOTA_KEYBIND_SHOP_SLOT_6|169|
DOTAKeybindCommand_t.DOTA_KEYBIND_SHOP_SLOT_7|170|
DOTAKeybindCommand_t.DOTA_KEYBIND_SHOP_SLOT_8|171|
DOTAKeybindCommand_t.DOTA_KEYBIND_SHOP_SLOT_9|172|
DOTAKeybindCommand_t.DOTA_KEYBIND_SHOP_SLOT_10|173|
DOTAKeybindCommand_t.DOTA_KEYBIND_SHOP_SLOT_11|174|
DOTAKeybindCommand_t.DOTA_KEYBIND_SHOP_SLOT_12|175|
DOTAKeybindCommand_t.DOTA_KEYBIND_SHOP_SLOT_13|176|
DOTAKeybindCommand_t.DOTA_KEYBIND_SHOP_SLOT_14|177|
DOTAKeybindCommand_t.DOTA_KEYBIND_SPEC_CAMERA_UP|178|
DOTAKeybindCommand_t.DOTA_KEYBIND_SPEC_CAMERA_DOWN|179|
DOTAKeybindCommand_t.DOTA_KEYBIND_SPEC_CAMERA_LEFT|180|
DOTAKeybindCommand_t.DOTA_KEYBIND_SPEC_CAMERA_RIGHT|181|
DOTAKeybindCommand_t.DOTA_KEYBIND_SPEC_CAMERA_GRIP|182|
DOTAKeybindCommand_t.DOTA_KEYBIND_SPEC_CAMERA_SAVED_POSITION_1|183|
DOTAKeybindCommand_t.DOTA_KEYBIND_SPEC_CAMERA_SAVED_POSITION_2|184|
DOTAKeybindCommand_t.DOTA_KEYBIND_SPEC_CAMERA_SAVED_POSITION_3|185|
DOTAKeybindCommand_t.DOTA_KEYBIND_SPEC_CAMERA_SAVED_POSITION_4|186|
DOTAKeybindCommand_t.DOTA_KEYBIND_SPEC_CAMERA_SAVED_POSITION_5|187|
DOTAKeybindCommand_t.DOTA_KEYBIND_SPEC_CAMERA_SAVED_POSITION_6|188|
DOTAKeybindCommand_t.DOTA_KEYBIND_SPEC_CAMERA_SAVED_POSITION_7|189|
DOTAKeybindCommand_t.DOTA_KEYBIND_SPEC_CAMERA_SAVED_POSITION_8|190|
DOTAKeybindCommand_t.DOTA_KEYBIND_SPEC_CAMERA_SAVED_POSITION_9|191|
DOTAKeybindCommand_t.DOTA_KEYBIND_SPEC_CAMERA_SAVED_POSITION_10|192|
DOTAKeybindCommand_t.DOTA_KEYBIND_SPEC_UNIT_SELECT|193|
DOTAKeybindCommand_t.DOTA_KEYBIND_SPEC_HERO_SELECT|194|
DOTAKeybindCommand_t.DOTA_KEYBIND_SPEC_PAUSE|195|
DOTAKeybindCommand_t.DOTA_KEYBIND_SPEC_CHAT|196|
DOTAKeybindCommand_t.DOTA_KEYBIND_SPEC_SCOREBOARD|197|
DOTAKeybindCommand_t.DOTA_KEYBIND_SPEC_INCREASE_REPLAY_SPEED|198|
DOTAKeybindCommand_t.DOTA_KEYBIND_SPEC_DECREASE_REPLAY_SPEED|199|
DOTAKeybindCommand_t.DOTA_KEYBIND_SPEC_STATS_HARVEST|200|
DOTAKeybindCommand_t.DOTA_KEYBIND_SPEC_STATS_ITEM|201|
DOTAKeybindCommand_t.DOTA_KEYBIND_SPEC_STATS_GOLD|202|
DOTAKeybindCommand_t.DOTA_KEYBIND_SPEC_STATS_XP|203|
DOTAKeybindCommand_t.DOTA_KEYBIND_SPEC_STATS_FANTASY|204|
DOTAKeybindCommand_t.DOTA_KEYBIND_SPEC_STATS_WINCHANCE|205|
DOTAKeybindCommand_t.DOTA_KEYBIND_SPEC_FOW_TOGGLEBOTH|206|
DOTAKeybindCommand_t.DOTA_KEYBIND_SPEC_FOW_TOGGLERADIENT|207|
DOTAKeybindCommand_t.DOTA_KEYBIND_SPEC_FOW_TOGGLEDIRE|208|
DOTAKeybindCommand_t.DOTA_KEYBIND_SPEC_OPEN_BROADCASTER_MENU|209|
DOTAKeybindCommand_t.DOTA_KEYBIND_SPEC_DROPDOWN_KDA|210|
DOTAKeybindCommand_t.DOTA_KEYBIND_SPEC_DROPDOWN_LASTHITS_DENIES|211|
DOTAKeybindCommand_t.DOTA_KEYBIND_SPEC_DROPDOWN_LEVEL|212|
DOTAKeybindCommand_t.DOTA_KEYBIND_SPEC_DROPDOWN_XP_PER_MIN|213|
DOTAKeybindCommand_t.DOTA_KEYBIND_SPEC_DROPDOWN_GOLD|214|
DOTAKeybindCommand_t.DOTA_KEYBIND_SPEC_DROPDOWN_TOTALGOLD|215|
DOTAKeybindCommand_t.DOTA_KEYBIND_SPEC_DROPDOWN_GOLD_PER_MIN|216|
DOTAKeybindCommand_t.DOTA_KEYBIND_SPEC_DROPDOWN_BUYBACK|217|
DOTAKeybindCommand_t.DOTA_KEYBIND_SPEC_DROPDOWN_NETWORTH|218|
DOTAKeybindCommand_t.DOTA_KEYBIND_SPEC_DROPDOWN_FANTASY|219|
DOTAKeybindCommand_t.DOTA_KEYBIND_SPEC_DROPDOWN_SORT|220|
DOTAKeybindCommand_t.DOTA_KEYBIND_SPEC_DROPDOWN_CLOSE|221|
DOTAKeybindCommand_t.DOTA_KEYBIND_SPEC_FOCUS_PLAYER_1|222|
DOTAKeybindCommand_t.DOTA_KEYBIND_SPEC_FOCUS_PLAYER_2|223|
DOTAKeybindCommand_t.DOTA_KEYBIND_SPEC_FOCUS_PLAYER_3|224|
DOTAKeybindCommand_t.DOTA_KEYBIND_SPEC_FOCUS_PLAYER_4|225|
DOTAKeybindCommand_t.DOTA_KEYBIND_SPEC_FOCUS_PLAYER_5|226|
DOTAKeybindCommand_t.DOTA_KEYBIND_SPEC_FOCUS_PLAYER_6|227|
DOTAKeybindCommand_t.DOTA_KEYBIND_SPEC_FOCUS_PLAYER_7|228|
DOTAKeybindCommand_t.DOTA_KEYBIND_SPEC_FOCUS_PLAYER_8|229|
DOTAKeybindCommand_t.DOTA_KEYBIND_SPEC_FOCUS_PLAYER_9|230|
DOTAKeybindCommand_t.DOTA_KEYBIND_SPEC_FOCUS_PLAYER_10|231|
DOTAKeybindCommand_t.DOTA_KEYBIND_SPEC_COACH_VIEWTOGGLE|232|
DOTAKeybindCommand_t.DOTA_KEYBIND_INSPECTHEROINWORLD|233|
DOTAKeybindCommand_t.DOTA_KEYBIND_CAMERA_ZOOM_IN|234|
DOTAKeybindCommand_t.DOTA_KEYBIND_CAMERA_ZOOM_OUT|235|
DOTAKeybindCommand_t.DOTA_KEYBIND_CONTROL_GROUPCYCLEPREV|236|
DOTAKeybindCommand_t.DOTA_KEYBIND_DOTA_ALT|237|
DOTAKeybindCommand_t.DOTA_KEYBIND_COUNT|238|

# DOTA_SHOP_TYPE
Enumerator|Value|Description
--|--|--
DOTA_SHOP_TYPE.DOTA_SHOP_HOME|0|
DOTA_SHOP_TYPE.DOTA_SHOP_SIDE|1|
DOTA_SHOP_TYPE.DOTA_SHOP_SECRET|2|
DOTA_SHOP_TYPE.DOTA_SHOP_GROUND|3|
DOTA_SHOP_TYPE.DOTA_SHOP_SIDE2|4|
DOTA_SHOP_TYPE.DOTA_SHOP_SECRET2|5|
DOTA_SHOP_TYPE.DOTA_SHOP_CUSTOM|6|
DOTA_SHOP_TYPE.DOTA_SHOP_NEUTRALS|7|
DOTA_SHOP_TYPE.DOTA_SHOP_NONE|8|
