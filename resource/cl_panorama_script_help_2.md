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
GetUnitLocToken|<code>GameUI.GetUnitLocToken( cstring pszUnitName )</code>|Returns the localization token to use for a particular unit, given the unit's name
GetUnitNameLocalized|<code>GameUI.GetUnitNameLocalized( cstring pszUnitName )</code>|Get the localized version of a unit's name
ConstructNumberString|<code>GameUI.ConstructNumberString( js_raw_args args )</code>|Creates a localized version of the number


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
CreatePanelWithProperties|<code>CreatePanelWithProperties( js_raw_args js_raw_args_1 )</code>|DEPRECATED: Use $.CreatePanel which has the same signature and supports properties.
Localize|<code>Localize( js_raw_args js_raw_args_1 )</code>|Localize a string. Optionally accepts Quantity, Precision, and Panel arguments.
LocalizePlural|<code>LocalizePlural( js_raw_args js_raw_args_1 )</code>|DEPRECATED: Use $.Localize which has the same signature and supports pluralization.
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
BImageFileExists|<code>BImageFileExists( js_raw_args js_raw_args_1 )</code>|Return true if a file exists.  Path will usually start with 'file://{images}'


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
GetPosition|<code>DOTAHeroModelOverlay.GetPosition( boolean boolean_1 )</code>|
ApplyStyles|<code>DOTAHeroModelOverlay.ApplyStyles( boolean boolean_1 )</code>|
ClearPropertyFromCode|<code>DOTAHeroModelOverlay.ClearPropertyFromCode( unknown_variant_type unknown_variant_type_1 )</code>|
DeleteAsync|<code>DOTAHeroModelOverlay.DeleteAsync( float float_1 )</code>|
BIsTransparent|<code>DOTAHeroModelOverlay.BIsTransparent()</code>|
BAcceptsInput|<code>DOTAHeroModelOverlay.BAcceptsInput()</code>|
BAcceptsFocus|<code>DOTAHeroModelOverlay.BAcceptsFocus()</code>|
SetFocus|<code>DOTAHeroModelOverlay.SetFocus()</code>|
UpdateFocusInContext|<code>DOTAHeroModelOverlay.UpdateFocusInContext()</code>|
BHasHoverStyle|<code>DOTAHeroModelOverlay.BHasHoverStyle()</code>|
SetAcceptsInput|<code>DOTAHeroModelOverlay.SetAcceptsInput( boolean boolean_1 )</code>|
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
BGetSnippetNames|<code>DOTAHeroModelOverlay.BGetSnippetNames( unknown_variant_type unknown_variant_type_1 )</code>|
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
debug.description|<code>DOTAHeroModelOverlay.debug.description( js_raw_args js_raw_args_1 )</code>|
SetSendScrollPositionChangedEvents|<code>DOTAHeroModelOverlay.SetSendScrollPositionChangedEvents( boolean boolean_1 )</code>|
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
GetPosition|<code>DOTAPlay.GetPosition( boolean boolean_1 )</code>|
ApplyStyles|<code>DOTAPlay.ApplyStyles( boolean boolean_1 )</code>|
ClearPropertyFromCode|<code>DOTAPlay.ClearPropertyFromCode( unknown_variant_type unknown_variant_type_1 )</code>|
DeleteAsync|<code>DOTAPlay.DeleteAsync( float float_1 )</code>|
BIsTransparent|<code>DOTAPlay.BIsTransparent()</code>|
BAcceptsInput|<code>DOTAPlay.BAcceptsInput()</code>|
BAcceptsFocus|<code>DOTAPlay.BAcceptsFocus()</code>|
SetFocus|<code>DOTAPlay.SetFocus()</code>|
UpdateFocusInContext|<code>DOTAPlay.UpdateFocusInContext()</code>|
BHasHoverStyle|<code>DOTAPlay.BHasHoverStyle()</code>|
SetAcceptsInput|<code>DOTAPlay.SetAcceptsInput( boolean boolean_1 )</code>|
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
BGetSnippetNames|<code>DOTAPlay.BGetSnippetNames( unknown_variant_type unknown_variant_type_1 )</code>|
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
debug.description|<code>DOTAPlay.debug.description( js_raw_args js_raw_args_1 )</code>|
SetSendScrollPositionChangedEvents|<code>DOTAPlay.SetSendScrollPositionChangedEvents( boolean boolean_1 )</code>|
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
GetPosition|<code>Panel.GetPosition( boolean boolean_1 )</code>|
ApplyStyles|<code>Panel.ApplyStyles( boolean boolean_1 )</code>|
ClearPropertyFromCode|<code>Panel.ClearPropertyFromCode( unknown_variant_type unknown_variant_type_1 )</code>|
DeleteAsync|<code>Panel.DeleteAsync( float float_1 )</code>|
BIsTransparent|<code>Panel.BIsTransparent()</code>|
BAcceptsInput|<code>Panel.BAcceptsInput()</code>|
BAcceptsFocus|<code>Panel.BAcceptsFocus()</code>|
SetFocus|<code>Panel.SetFocus()</code>|
UpdateFocusInContext|<code>Panel.UpdateFocusInContext()</code>|
BHasHoverStyle|<code>Panel.BHasHoverStyle()</code>|
SetAcceptsInput|<code>Panel.SetAcceptsInput( boolean boolean_1 )</code>|
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
BGetSnippetNames|<code>Panel.BGetSnippetNames( unknown_variant_type unknown_variant_type_1 )</code>|
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
debug.description|<code>Panel.debug.description( js_raw_args js_raw_args_1 )</code>|
SetSendScrollPositionChangedEvents|<code>Panel.SetSendScrollPositionChangedEvents( boolean boolean_1 )</code>|
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
GetPosition|<code>Label.GetPosition( boolean boolean_1 )</code>|
ApplyStyles|<code>Label.ApplyStyles( boolean boolean_1 )</code>|
ClearPropertyFromCode|<code>Label.ClearPropertyFromCode( unknown_variant_type unknown_variant_type_1 )</code>|
DeleteAsync|<code>Label.DeleteAsync( float float_1 )</code>|
BIsTransparent|<code>Label.BIsTransparent()</code>|
BAcceptsInput|<code>Label.BAcceptsInput()</code>|
BAcceptsFocus|<code>Label.BAcceptsFocus()</code>|
SetFocus|<code>Label.SetFocus()</code>|
UpdateFocusInContext|<code>Label.UpdateFocusInContext()</code>|
BHasHoverStyle|<code>Label.BHasHoverStyle()</code>|
SetAcceptsInput|<code>Label.SetAcceptsInput( boolean boolean_1 )</code>|
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
BGetSnippetNames|<code>Label.BGetSnippetNames( unknown_variant_type unknown_variant_type_1 )</code>|
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
debug.description|<code>Label.debug.description( js_raw_args js_raw_args_1 )</code>|
SetSendScrollPositionChangedEvents|<code>Label.SetSendScrollPositionChangedEvents( boolean boolean_1 )</code>|
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
GetPosition|<code>ToggleButton.GetPosition( boolean boolean_1 )</code>|
ApplyStyles|<code>ToggleButton.ApplyStyles( boolean boolean_1 )</code>|
ClearPropertyFromCode|<code>ToggleButton.ClearPropertyFromCode( unknown_variant_type unknown_variant_type_1 )</code>|
DeleteAsync|<code>ToggleButton.DeleteAsync( float float_1 )</code>|
BIsTransparent|<code>ToggleButton.BIsTransparent()</code>|
BAcceptsInput|<code>ToggleButton.BAcceptsInput()</code>|
BAcceptsFocus|<code>ToggleButton.BAcceptsFocus()</code>|
SetFocus|<code>ToggleButton.SetFocus()</code>|
UpdateFocusInContext|<code>ToggleButton.UpdateFocusInContext()</code>|
BHasHoverStyle|<code>ToggleButton.BHasHoverStyle()</code>|
SetAcceptsInput|<code>ToggleButton.SetAcceptsInput( boolean boolean_1 )</code>|
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
BGetSnippetNames|<code>ToggleButton.BGetSnippetNames( unknown_variant_type unknown_variant_type_1 )</code>|
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
debug.description|<code>ToggleButton.debug.description( js_raw_args js_raw_args_1 )</code>|
SetSendScrollPositionChangedEvents|<code>ToggleButton.SetSendScrollPositionChangedEvents( boolean boolean_1 )</code>|
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
GetPosition|<code>TabButton.GetPosition( boolean boolean_1 )</code>|
ApplyStyles|<code>TabButton.ApplyStyles( boolean boolean_1 )</code>|
ClearPropertyFromCode|<code>TabButton.ClearPropertyFromCode( unknown_variant_type unknown_variant_type_1 )</code>|
DeleteAsync|<code>TabButton.DeleteAsync( float float_1 )</code>|
BIsTransparent|<code>TabButton.BIsTransparent()</code>|
BAcceptsInput|<code>TabButton.BAcceptsInput()</code>|
BAcceptsFocus|<code>TabButton.BAcceptsFocus()</code>|
SetFocus|<code>TabButton.SetFocus()</code>|
UpdateFocusInContext|<code>TabButton.UpdateFocusInContext()</code>|
BHasHoverStyle|<code>TabButton.BHasHoverStyle()</code>|
SetAcceptsInput|<code>TabButton.SetAcceptsInput( boolean boolean_1 )</code>|
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
BGetSnippetNames|<code>TabButton.BGetSnippetNames( unknown_variant_type unknown_variant_type_1 )</code>|
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
debug.description|<code>TabButton.debug.description( js_raw_args js_raw_args_1 )</code>|
SetSendScrollPositionChangedEvents|<code>TabButton.SetSendScrollPositionChangedEvents( boolean boolean_1 )</code>|
SetPanelEvent|<code>TabButton.SetPanelEvent( js_raw_args js_raw_args_1 )</code>|
RunScriptInPanelContext|<code>TabButton.RunScriptInPanelContext( js_raw_args js_raw_args_1 )</code>|
rememberchildfocus|<code>TabButton.rememberchildfocus( boolean boolean_1 )</code>|
paneltype|<code>TabButton.paneltype()</code>|


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
GetPosition|<code>DOTACustomUIRoot.GetPosition( boolean boolean_1 )</code>|
ApplyStyles|<code>DOTACustomUIRoot.ApplyStyles( boolean boolean_1 )</code>|
ClearPropertyFromCode|<code>DOTACustomUIRoot.ClearPropertyFromCode( unknown_variant_type unknown_variant_type_1 )</code>|
DeleteAsync|<code>DOTACustomUIRoot.DeleteAsync( float float_1 )</code>|
BIsTransparent|<code>DOTACustomUIRoot.BIsTransparent()</code>|
BAcceptsInput|<code>DOTACustomUIRoot.BAcceptsInput()</code>|
BAcceptsFocus|<code>DOTACustomUIRoot.BAcceptsFocus()</code>|
SetFocus|<code>DOTACustomUIRoot.SetFocus()</code>|
UpdateFocusInContext|<code>DOTACustomUIRoot.UpdateFocusInContext()</code>|
BHasHoverStyle|<code>DOTACustomUIRoot.BHasHoverStyle()</code>|
SetAcceptsInput|<code>DOTACustomUIRoot.SetAcceptsInput( boolean boolean_1 )</code>|
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
BGetSnippetNames|<code>DOTACustomUIRoot.BGetSnippetNames( unknown_variant_type unknown_variant_type_1 )</code>|
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
debug.description|<code>DOTACustomUIRoot.debug.description( js_raw_args js_raw_args_1 )</code>|
SetSendScrollPositionChangedEvents|<code>DOTACustomUIRoot.SetSendScrollPositionChangedEvents( boolean boolean_1 )</code>|
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
GetPosition|<code>DOTAHud.GetPosition( boolean boolean_1 )</code>|
ApplyStyles|<code>DOTAHud.ApplyStyles( boolean boolean_1 )</code>|
ClearPropertyFromCode|<code>DOTAHud.ClearPropertyFromCode( unknown_variant_type unknown_variant_type_1 )</code>|
DeleteAsync|<code>DOTAHud.DeleteAsync( float float_1 )</code>|
BIsTransparent|<code>DOTAHud.BIsTransparent()</code>|
BAcceptsInput|<code>DOTAHud.BAcceptsInput()</code>|
BAcceptsFocus|<code>DOTAHud.BAcceptsFocus()</code>|
SetFocus|<code>DOTAHud.SetFocus()</code>|
UpdateFocusInContext|<code>DOTAHud.UpdateFocusInContext()</code>|
BHasHoverStyle|<code>DOTAHud.BHasHoverStyle()</code>|
SetAcceptsInput|<code>DOTAHud.SetAcceptsInput( boolean boolean_1 )</code>|
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
BGetSnippetNames|<code>DOTAHud.BGetSnippetNames( unknown_variant_type unknown_variant_type_1 )</code>|
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
debug.description|<code>DOTAHud.debug.description( js_raw_args js_raw_args_1 )</code>|
SetSendScrollPositionChangedEvents|<code>DOTAHud.SetSendScrollPositionChangedEvents( boolean boolean_1 )</code>|
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
GetPosition|<code>DOTAPaused.GetPosition( boolean boolean_1 )</code>|
ApplyStyles|<code>DOTAPaused.ApplyStyles( boolean boolean_1 )</code>|
ClearPropertyFromCode|<code>DOTAPaused.ClearPropertyFromCode( unknown_variant_type unknown_variant_type_1 )</code>|
DeleteAsync|<code>DOTAPaused.DeleteAsync( float float_1 )</code>|
BIsTransparent|<code>DOTAPaused.BIsTransparent()</code>|
BAcceptsInput|<code>DOTAPaused.BAcceptsInput()</code>|
BAcceptsFocus|<code>DOTAPaused.BAcceptsFocus()</code>|
SetFocus|<code>DOTAPaused.SetFocus()</code>|
UpdateFocusInContext|<code>DOTAPaused.UpdateFocusInContext()</code>|
BHasHoverStyle|<code>DOTAPaused.BHasHoverStyle()</code>|
SetAcceptsInput|<code>DOTAPaused.SetAcceptsInput( boolean boolean_1 )</code>|
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
BGetSnippetNames|<code>DOTAPaused.BGetSnippetNames( unknown_variant_type unknown_variant_type_1 )</code>|
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
debug.description|<code>DOTAPaused.debug.description( js_raw_args js_raw_args_1 )</code>|
SetSendScrollPositionChangedEvents|<code>DOTAPaused.SetSendScrollPositionChangedEvents( boolean boolean_1 )</code>|
SetPanelEvent|<code>DOTAPaused.SetPanelEvent( js_raw_args js_raw_args_1 )</code>|
RunScriptInPanelContext|<code>DOTAPaused.RunScriptInPanelContext( js_raw_args js_raw_args_1 )</code>|
rememberchildfocus|<code>DOTAPaused.rememberchildfocus( boolean boolean_1 )</code>|
paneltype|<code>DOTAPaused.paneltype()</code>|


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
GetPosition|<code>Button.GetPosition( boolean boolean_1 )</code>|
ApplyStyles|<code>Button.ApplyStyles( boolean boolean_1 )</code>|
ClearPropertyFromCode|<code>Button.ClearPropertyFromCode( unknown_variant_type unknown_variant_type_1 )</code>|
DeleteAsync|<code>Button.DeleteAsync( float float_1 )</code>|
BIsTransparent|<code>Button.BIsTransparent()</code>|
BAcceptsInput|<code>Button.BAcceptsInput()</code>|
BAcceptsFocus|<code>Button.BAcceptsFocus()</code>|
SetFocus|<code>Button.SetFocus()</code>|
UpdateFocusInContext|<code>Button.UpdateFocusInContext()</code>|
BHasHoverStyle|<code>Button.BHasHoverStyle()</code>|
SetAcceptsInput|<code>Button.SetAcceptsInput( boolean boolean_1 )</code>|
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
BGetSnippetNames|<code>Button.BGetSnippetNames( unknown_variant_type unknown_variant_type_1 )</code>|
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
debug.description|<code>Button.debug.description( js_raw_args js_raw_args_1 )</code>|
SetSendScrollPositionChangedEvents|<code>Button.SetSendScrollPositionChangedEvents( boolean boolean_1 )</code>|
SetPanelEvent|<code>Button.SetPanelEvent( js_raw_args js_raw_args_1 )</code>|
RunScriptInPanelContext|<code>Button.RunScriptInPanelContext( js_raw_args js_raw_args_1 )</code>|
rememberchildfocus|<code>Button.rememberchildfocus( boolean boolean_1 )</code>|
paneltype|<code>Button.paneltype()</code>|


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
GetPosition|<code>DOTAChat.GetPosition( boolean boolean_1 )</code>|
ApplyStyles|<code>DOTAChat.ApplyStyles( boolean boolean_1 )</code>|
ClearPropertyFromCode|<code>DOTAChat.ClearPropertyFromCode( unknown_variant_type unknown_variant_type_1 )</code>|
DeleteAsync|<code>DOTAChat.DeleteAsync( float float_1 )</code>|
BIsTransparent|<code>DOTAChat.BIsTransparent()</code>|
BAcceptsInput|<code>DOTAChat.BAcceptsInput()</code>|
BAcceptsFocus|<code>DOTAChat.BAcceptsFocus()</code>|
SetFocus|<code>DOTAChat.SetFocus()</code>|
UpdateFocusInContext|<code>DOTAChat.UpdateFocusInContext()</code>|
BHasHoverStyle|<code>DOTAChat.BHasHoverStyle()</code>|
SetAcceptsInput|<code>DOTAChat.SetAcceptsInput( boolean boolean_1 )</code>|
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
BGetSnippetNames|<code>DOTAChat.BGetSnippetNames( unknown_variant_type unknown_variant_type_1 )</code>|
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
debug.description|<code>DOTAChat.debug.description( js_raw_args js_raw_args_1 )</code>|
SetSendScrollPositionChangedEvents|<code>DOTAChat.SetSendScrollPositionChangedEvents( boolean boolean_1 )</code>|
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
GetPosition|<code>DOTAAvatarImage.GetPosition( boolean boolean_1 )</code>|
ApplyStyles|<code>DOTAAvatarImage.ApplyStyles( boolean boolean_1 )</code>|
ClearPropertyFromCode|<code>DOTAAvatarImage.ClearPropertyFromCode( unknown_variant_type unknown_variant_type_1 )</code>|
DeleteAsync|<code>DOTAAvatarImage.DeleteAsync( float float_1 )</code>|
BIsTransparent|<code>DOTAAvatarImage.BIsTransparent()</code>|
BAcceptsInput|<code>DOTAAvatarImage.BAcceptsInput()</code>|
BAcceptsFocus|<code>DOTAAvatarImage.BAcceptsFocus()</code>|
SetFocus|<code>DOTAAvatarImage.SetFocus()</code>|
UpdateFocusInContext|<code>DOTAAvatarImage.UpdateFocusInContext()</code>|
BHasHoverStyle|<code>DOTAAvatarImage.BHasHoverStyle()</code>|
SetAcceptsInput|<code>DOTAAvatarImage.SetAcceptsInput( boolean boolean_1 )</code>|
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
BGetSnippetNames|<code>DOTAAvatarImage.BGetSnippetNames( unknown_variant_type unknown_variant_type_1 )</code>|
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
debug.description|<code>DOTAAvatarImage.debug.description( js_raw_args js_raw_args_1 )</code>|
SetSendScrollPositionChangedEvents|<code>DOTAAvatarImage.SetSendScrollPositionChangedEvents( boolean boolean_1 )</code>|
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
GetPosition|<code>CustomUIElement.GetPosition( boolean boolean_1 )</code>|
ApplyStyles|<code>CustomUIElement.ApplyStyles( boolean boolean_1 )</code>|
ClearPropertyFromCode|<code>CustomUIElement.ClearPropertyFromCode( unknown_variant_type unknown_variant_type_1 )</code>|
DeleteAsync|<code>CustomUIElement.DeleteAsync( float float_1 )</code>|
BIsTransparent|<code>CustomUIElement.BIsTransparent()</code>|
BAcceptsInput|<code>CustomUIElement.BAcceptsInput()</code>|
BAcceptsFocus|<code>CustomUIElement.BAcceptsFocus()</code>|
SetFocus|<code>CustomUIElement.SetFocus()</code>|
UpdateFocusInContext|<code>CustomUIElement.UpdateFocusInContext()</code>|
BHasHoverStyle|<code>CustomUIElement.BHasHoverStyle()</code>|
SetAcceptsInput|<code>CustomUIElement.SetAcceptsInput( boolean boolean_1 )</code>|
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
BGetSnippetNames|<code>CustomUIElement.BGetSnippetNames( unknown_variant_type unknown_variant_type_1 )</code>|
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
debug.description|<code>CustomUIElement.debug.description( js_raw_args js_raw_args_1 )</code>|
SetSendScrollPositionChangedEvents|<code>CustomUIElement.SetSendScrollPositionChangedEvents( boolean boolean_1 )</code>|
SetPanelEvent|<code>CustomUIElement.SetPanelEvent( js_raw_args js_raw_args_1 )</code>|
RunScriptInPanelContext|<code>CustomUIElement.RunScriptInPanelContext( js_raw_args js_raw_args_1 )</code>|
rememberchildfocus|<code>CustomUIElement.rememberchildfocus( boolean boolean_1 )</code>|
paneltype|<code>CustomUIElement.paneltype()</code>|


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
GetPosition|<code>DOTALoadingScreen.GetPosition( boolean boolean_1 )</code>|
ApplyStyles|<code>DOTALoadingScreen.ApplyStyles( boolean boolean_1 )</code>|
ClearPropertyFromCode|<code>DOTALoadingScreen.ClearPropertyFromCode( unknown_variant_type unknown_variant_type_1 )</code>|
DeleteAsync|<code>DOTALoadingScreen.DeleteAsync( float float_1 )</code>|
BIsTransparent|<code>DOTALoadingScreen.BIsTransparent()</code>|
BAcceptsInput|<code>DOTALoadingScreen.BAcceptsInput()</code>|
BAcceptsFocus|<code>DOTALoadingScreen.BAcceptsFocus()</code>|
SetFocus|<code>DOTALoadingScreen.SetFocus()</code>|
UpdateFocusInContext|<code>DOTALoadingScreen.UpdateFocusInContext()</code>|
BHasHoverStyle|<code>DOTALoadingScreen.BHasHoverStyle()</code>|
SetAcceptsInput|<code>DOTALoadingScreen.SetAcceptsInput( boolean boolean_1 )</code>|
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
BGetSnippetNames|<code>DOTALoadingScreen.BGetSnippetNames( unknown_variant_type unknown_variant_type_1 )</code>|
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
debug.description|<code>DOTALoadingScreen.debug.description( js_raw_args js_raw_args_1 )</code>|
SetSendScrollPositionChangedEvents|<code>DOTALoadingScreen.SetSendScrollPositionChangedEvents( boolean boolean_1 )</code>|
SetPanelEvent|<code>DOTALoadingScreen.SetPanelEvent( js_raw_args js_raw_args_1 )</code>|
RunScriptInPanelContext|<code>DOTALoadingScreen.RunScriptInPanelContext( js_raw_args js_raw_args_1 )</code>|
rememberchildfocus|<code>DOTALoadingScreen.rememberchildfocus( boolean boolean_1 )</code>|
paneltype|<code>DOTALoadingScreen.paneltype()</code>|


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
GetPosition|<code>TextButton.GetPosition( boolean boolean_1 )</code>|
ApplyStyles|<code>TextButton.ApplyStyles( boolean boolean_1 )</code>|
ClearPropertyFromCode|<code>TextButton.ClearPropertyFromCode( unknown_variant_type unknown_variant_type_1 )</code>|
DeleteAsync|<code>TextButton.DeleteAsync( float float_1 )</code>|
BIsTransparent|<code>TextButton.BIsTransparent()</code>|
BAcceptsInput|<code>TextButton.BAcceptsInput()</code>|
BAcceptsFocus|<code>TextButton.BAcceptsFocus()</code>|
SetFocus|<code>TextButton.SetFocus()</code>|
UpdateFocusInContext|<code>TextButton.UpdateFocusInContext()</code>|
BHasHoverStyle|<code>TextButton.BHasHoverStyle()</code>|
SetAcceptsInput|<code>TextButton.SetAcceptsInput( boolean boolean_1 )</code>|
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
BGetSnippetNames|<code>TextButton.BGetSnippetNames( unknown_variant_type unknown_variant_type_1 )</code>|
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
debug.description|<code>TextButton.debug.description( js_raw_args js_raw_args_1 )</code>|
SetSendScrollPositionChangedEvents|<code>TextButton.SetSendScrollPositionChangedEvents( boolean boolean_1 )</code>|
text|<code>TextButton.text( cstring cstring_1 )</code>|
SetPanelEvent|<code>TextButton.SetPanelEvent( js_raw_args js_raw_args_1 )</code>|
RunScriptInPanelContext|<code>TextButton.RunScriptInPanelContext( js_raw_args js_raw_args_1 )</code>|
rememberchildfocus|<code>TextButton.rememberchildfocus( boolean boolean_1 )</code>|
paneltype|<code>TextButton.paneltype()</code>|


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
GetPosition|<code>Image.GetPosition( boolean boolean_1 )</code>|
ApplyStyles|<code>Image.ApplyStyles( boolean boolean_1 )</code>|
ClearPropertyFromCode|<code>Image.ClearPropertyFromCode( unknown_variant_type unknown_variant_type_1 )</code>|
DeleteAsync|<code>Image.DeleteAsync( float float_1 )</code>|
BIsTransparent|<code>Image.BIsTransparent()</code>|
BAcceptsInput|<code>Image.BAcceptsInput()</code>|
BAcceptsFocus|<code>Image.BAcceptsFocus()</code>|
SetFocus|<code>Image.SetFocus()</code>|
UpdateFocusInContext|<code>Image.UpdateFocusInContext()</code>|
BHasHoverStyle|<code>Image.BHasHoverStyle()</code>|
SetAcceptsInput|<code>Image.SetAcceptsInput( boolean boolean_1 )</code>|
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
BGetSnippetNames|<code>Image.BGetSnippetNames( unknown_variant_type unknown_variant_type_1 )</code>|
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
debug.description|<code>Image.debug.description( js_raw_args js_raw_args_1 )</code>|
SetSendScrollPositionChangedEvents|<code>Image.SetSendScrollPositionChangedEvents( boolean boolean_1 )</code>|
SetImage|<code>Image.SetImage( cstring cstring_1 )</code>|
SetImageFromPanel|<code>Image.SetImageFromPanel( unknown_variant_type unknown_variant_type_1, boolean boolean_2 )</code>|
SetScaling|<code>Image.SetScaling( cstring cstring_1 )</code>|
SetPanelEvent|<code>Image.SetPanelEvent( js_raw_args js_raw_args_1 )</code>|
RunScriptInPanelContext|<code>Image.RunScriptInPanelContext( js_raw_args js_raw_args_1 )</code>|
rememberchildfocus|<code>Image.rememberchildfocus( boolean boolean_1 )</code>|
paneltype|<code>Image.paneltype()</code>|


# DOTAScenePanel
Function|Signature|Description
--|--|--
visible|<code>DOTAScenePanel.visible( boolean boolean_1 )</code>|
enabled|<code>DOTAScenePanel.enabled( boolean boolean_1 )</code>|
checked|<code>DOTAScenePanel.checked( boolean boolean_1 )</code>|
defaultfocus|<code>DOTAScenePanel.defaultfocus( cstring cstring_1 )</code>|
inputnamespace|<code>DOTAScenePanel.inputnamespace( cstring cstring_1 )</code>|
hittest|<code>DOTAScenePanel.hittest( boolean boolean_1 )</code>|
hittestchildren|<code>DOTAScenePanel.hittestchildren( boolean boolean_1 )</code>|
tabindex|<code>DOTAScenePanel.tabindex( float float_1 )</code>|
selectionpos_x|<code>DOTAScenePanel.selectionpos_x( float float_1 )</code>|
selectionpos_y|<code>DOTAScenePanel.selectionpos_y( float float_1 )</code>|
type|<code>DOTAScenePanel.type()</code>|
id|<code>DOTAScenePanel.id()</code>|
layoutfile|<code>DOTAScenePanel.layoutfile()</code>|
contentwidth|<code>DOTAScenePanel.contentwidth()</code>|
contentheight|<code>DOTAScenePanel.contentheight()</code>|
desiredlayoutwidth|<code>DOTAScenePanel.desiredlayoutwidth()</code>|
desiredlayoutheight|<code>DOTAScenePanel.desiredlayoutheight()</code>|
actuallayoutwidth|<code>DOTAScenePanel.actuallayoutwidth()</code>|
actuallayoutheight|<code>DOTAScenePanel.actuallayoutheight()</code>|
actualxoffset|<code>DOTAScenePanel.actualxoffset()</code>|
actualyoffset|<code>DOTAScenePanel.actualyoffset()</code>|
scrolloffset_y|<code>DOTAScenePanel.scrolloffset_y()</code>|
scrolloffset_x|<code>DOTAScenePanel.scrolloffset_x()</code>|
actualuiscale_y|<code>DOTAScenePanel.actualuiscale_y()</code>|
actualuiscale_x|<code>DOTAScenePanel.actualuiscale_x()</code>|
style|<code>DOTAScenePanel.style()</code>|
AddClass|<code>DOTAScenePanel.AddClass( cstring cstring_1 )</code>|
RemoveClass|<code>DOTAScenePanel.RemoveClass( cstring cstring_1 )</code>|
BHasClass|<code>DOTAScenePanel.BHasClass( cstring cstring_1 )</code>|
BAscendantHasClass|<code>DOTAScenePanel.BAscendantHasClass( cstring cstring_1 )</code>|
SetHasClass|<code>DOTAScenePanel.SetHasClass( cstring cstring_1, boolean boolean_2 )</code>|
ToggleClass|<code>DOTAScenePanel.ToggleClass( cstring cstring_1 )</code>|
SwitchClass|<code>DOTAScenePanel.SwitchClass( cstring cstring_1, cstring cstring_2 )</code>|
TriggerClass|<code>DOTAScenePanel.TriggerClass( cstring cstring_1 )</code>|
ClearPanelEvent|<code>DOTAScenePanel.ClearPanelEvent( cstring cstring_1 )</code>|
SetDraggable|<code>DOTAScenePanel.SetDraggable( boolean boolean_1 )</code>|
IsDraggable|<code>DOTAScenePanel.IsDraggable()</code>|
IsSizeValid|<code>DOTAScenePanel.IsSizeValid()</code>|
GetChildCount|<code>DOTAScenePanel.GetChildCount()</code>|
GetChild|<code>DOTAScenePanel.GetChild( integer integer_1 )</code>|
GetChildIndex|<code>DOTAScenePanel.GetChildIndex( unknown_variant_type unknown_variant_type_1 )</code>|
Children|<code>DOTAScenePanel.Children()</code>|
FindChildrenWithClassTraverse|<code>DOTAScenePanel.FindChildrenWithClassTraverse( cstring cstring_1 )</code>|
GetParent|<code>DOTAScenePanel.GetParent()</code>|
SetParent|<code>DOTAScenePanel.SetParent( unknown_variant_type unknown_variant_type_1 )</code>|
FindChild|<code>DOTAScenePanel.FindChild( cstring cstring_1 )</code>|
FindChildTraverse|<code>DOTAScenePanel.FindChildTraverse( cstring cstring_1 )</code>|
FindChildInLayoutFile|<code>DOTAScenePanel.FindChildInLayoutFile( cstring cstring_1 )</code>|
FindPanelInLayoutFile|<code>DOTAScenePanel.FindPanelInLayoutFile( cstring cstring_1 )</code>|
FindAncestor|<code>DOTAScenePanel.FindAncestor( cstring cstring_1 )</code>|
RemoveAndDeleteChildren|<code>DOTAScenePanel.RemoveAndDeleteChildren()</code>|
MoveChildBefore|<code>DOTAScenePanel.MoveChildBefore( unknown_variant_type unknown_variant_type_1, unknown_variant_type unknown_variant_type_2 )</code>|
MoveChildAfter|<code>DOTAScenePanel.MoveChildAfter( unknown_variant_type unknown_variant_type_1, unknown_variant_type unknown_variant_type_2 )</code>|
GetPositionWithinWindow|<code>DOTAScenePanel.GetPositionWithinWindow()</code>|
GetPositionWithinAncestor|<code>DOTAScenePanel.GetPositionWithinAncestor( unknown_variant_type unknown_variant_type_1 )</code>|
GetPosition|<code>DOTAScenePanel.GetPosition( boolean boolean_1 )</code>|
ApplyStyles|<code>DOTAScenePanel.ApplyStyles( boolean boolean_1 )</code>|
ClearPropertyFromCode|<code>DOTAScenePanel.ClearPropertyFromCode( unknown_variant_type unknown_variant_type_1 )</code>|
DeleteAsync|<code>DOTAScenePanel.DeleteAsync( float float_1 )</code>|
BIsTransparent|<code>DOTAScenePanel.BIsTransparent()</code>|
BAcceptsInput|<code>DOTAScenePanel.BAcceptsInput()</code>|
BAcceptsFocus|<code>DOTAScenePanel.BAcceptsFocus()</code>|
SetFocus|<code>DOTAScenePanel.SetFocus()</code>|
UpdateFocusInContext|<code>DOTAScenePanel.UpdateFocusInContext()</code>|
BHasHoverStyle|<code>DOTAScenePanel.BHasHoverStyle()</code>|
SetAcceptsInput|<code>DOTAScenePanel.SetAcceptsInput( boolean boolean_1 )</code>|
SetAcceptsFocus|<code>DOTAScenePanel.SetAcceptsFocus( boolean boolean_1 )</code>|
SetDisableFocusOnMouseDown|<code>DOTAScenePanel.SetDisableFocusOnMouseDown( boolean boolean_1 )</code>|
BHasKeyFocus|<code>DOTAScenePanel.BHasKeyFocus()</code>|
SetScrollParentToFitWhenFocused|<code>DOTAScenePanel.SetScrollParentToFitWhenFocused( boolean boolean_1 )</code>|
BScrollParentToFitWhenFocused|<code>DOTAScenePanel.BScrollParentToFitWhenFocused()</code>|
IsSelected|<code>DOTAScenePanel.IsSelected()</code>|
BHasDescendantKeyFocus|<code>DOTAScenePanel.BHasDescendantKeyFocus()</code>|
BLoadLayout|<code>DOTAScenePanel.BLoadLayout( cstring cstring_1, boolean boolean_2, boolean boolean_3 )</code>|
BLoadLayoutSnippet|<code>DOTAScenePanel.BLoadLayoutSnippet( cstring cstring_1 )</code>|
BHasLayoutSnippet|<code>DOTAScenePanel.BHasLayoutSnippet( cstring cstring_1 )</code>|
BGetSnippetNames|<code>DOTAScenePanel.BGetSnippetNames( unknown_variant_type unknown_variant_type_1 )</code>|
SetTopOfInputContext|<code>DOTAScenePanel.SetTopOfInputContext( boolean boolean_1 )</code>|
SetDialogVariable|<code>DOTAScenePanel.SetDialogVariable( cstring cstring_1, cstring cstring_2 )</code>|
SetDialogVariableInt|<code>DOTAScenePanel.SetDialogVariableInt( cstring cstring_1, integer integer_2 )</code>|
SetDialogVariableTime|<code>DOTAScenePanel.SetDialogVariableTime( cstring cstring_1, int64 int64_2 )</code>|
SetDialogVariableLocString|<code>DOTAScenePanel.SetDialogVariableLocString( cstring cstring_1, cstring cstring_2 )</code>|
SetDialogVariablePluralLocStringInt|<code>DOTAScenePanel.SetDialogVariablePluralLocStringInt( cstring cstring_1, cstring cstring_2, int64 int64_3 )</code>|
ScrollToTop|<code>DOTAScenePanel.ScrollToTop()</code>|
ScrollToBottom|<code>DOTAScenePanel.ScrollToBottom()</code>|
ScrollToLeftEdge|<code>DOTAScenePanel.ScrollToLeftEdge()</code>|
ScrollToRightEdge|<code>DOTAScenePanel.ScrollToRightEdge()</code>|
ScrollParentToMakePanelFit|<code>DOTAScenePanel.ScrollParentToMakePanelFit( unknown_variant_type unknown_variant_type_1, boolean boolean_2 )</code>|
ScrollToFitRegion|<code>DOTAScenePanel.ScrollToFitRegion( float float_1, float float_2, float float_3, float float_4, unknown_variant_type unknown_variant_type_5, boolean boolean_6, boolean boolean_7 )</code>|
BCanSeeInParentScroll|<code>DOTAScenePanel.BCanSeeInParentScroll()</code>|
GetAttributeInt|<code>DOTAScenePanel.GetAttributeInt( cstring cstring_1, integer integer_2 )</code>|
GetAttributeString|<code>DOTAScenePanel.GetAttributeString( cstring cstring_1, cstring cstring_2 )</code>|
GetAttributeUInt32|<code>DOTAScenePanel.GetAttributeUInt32( cstring cstring_1, unsigned unsigned_2 )</code>|
SetAttributeInt|<code>DOTAScenePanel.SetAttributeInt( cstring cstring_1, integer integer_2 )</code>|
SetAttributeString|<code>DOTAScenePanel.SetAttributeString( cstring cstring_1, cstring cstring_2 )</code>|
SetAttributeUInt32|<code>DOTAScenePanel.SetAttributeUInt32( cstring cstring_1, unsigned unsigned_2 )</code>|
SetInputNamespace|<code>DOTAScenePanel.SetInputNamespace( cstring cstring_1 )</code>|
RegisterForReadyEvents|<code>DOTAScenePanel.RegisterForReadyEvents( boolean boolean_1 )</code>|
BReadyForDisplay|<code>DOTAScenePanel.BReadyForDisplay()</code>|
SetReadyForDisplay|<code>DOTAScenePanel.SetReadyForDisplay( boolean boolean_1 )</code>|
SetPositionInPixels|<code>DOTAScenePanel.SetPositionInPixels( float float_1, float float_2, float float_3 )</code>|
Data|<code>DOTAScenePanel.Data( js_raw_args js_raw_args_1 )</code>|
debug.description|<code>DOTAScenePanel.debug.description( js_raw_args js_raw_args_1 )</code>|
SetSendScrollPositionChangedEvents|<code>DOTAScenePanel.SetSendScrollPositionChangedEvents( boolean boolean_1 )</code>|
FireEntityInput|<code>DOTAScenePanel.FireEntityInput( js_raw_args js_raw_args_1 )</code>|
PlayEntitySoundEvent|<code>DOTAScenePanel.PlayEntitySoundEvent( cstring cstring_1, cstring cstring_2 )</code>|
SetUnit|<code>DOTAScenePanel.SetUnit( cstring cstring_1, cstring cstring_2, boolean boolean_3 )</code>|
SetAnimgraphParameterOnEntityInt|<code>DOTAScenePanel.SetAnimgraphParameterOnEntityInt( cstring cstring_1, cstring cstring_2, integer integer_3 )</code>|
SetAnimgraphParameterOnEntityFloat|<code>DOTAScenePanel.SetAnimgraphParameterOnEntityFloat( cstring cstring_1, cstring cstring_2, float float_3 )</code>|
SetAnimgraphParameterOnEntityEnum|<code>DOTAScenePanel.SetAnimgraphParameterOnEntityEnum( cstring cstring_1, cstring cstring_2, cstring cstring_3 )</code>|
GetPanoramaSurfacePanel|<code>DOTAScenePanel.GetPanoramaSurfacePanel()</code>|
SetRotateParams|<code>DOTAScenePanel.SetRotateParams( float float_1, float float_2, float float_3, float float_4 )</code>|
ReloadScene|<code>DOTAScenePanel.ReloadScene()</code>|
ClearScene|<code>DOTAScenePanel.ClearScene( boolean boolean_1 )</code>|
SpawnHeroInScenePanelByPlayerSlot|<code>DOTAScenePanel.SpawnHeroInScenePanelByPlayerSlot( cstring cstring_1, unknown_variant_type unknown_variant_type_2, cstring cstring_3 )</code>|
SpawnHeroInScenePanelByHeroId|<code>DOTAScenePanel.SpawnHeroInScenePanelByHeroId( integer integer_1, cstring cstring_2, integer integer_3 )</code>|
SetScenePanelToPlayerHero|<code>DOTAScenePanel.SetScenePanelToPlayerHero( cstring cstring_1, unknown_variant_type unknown_variant_type_2 )</code>|
SetScenePanelToLocalHero|<code>DOTAScenePanel.SetScenePanelToLocalHero( integer integer_1 )</code>|
ReplaceEconItemSlot|<code>DOTAScenePanel.ReplaceEconItemSlot( integer integer_1, integer integer_2, integer integer_3 )</code>|
SetPostProcessFade|<code>DOTAScenePanel.SetPostProcessFade( float float_1 )</code>|
SetCustomPostProcessMaterial|<code>DOTAScenePanel.SetCustomPostProcessMaterial( cstring cstring_1 )</code>|
SetCustomSpecialPostEffectMaterial|<code>DOTAScenePanel.SetCustomSpecialPostEffectMaterial( cstring cstring_1 )</code>|
SpawnHeroInScenePanelByPlayerSlotWithFullBodyView|<code>DOTAScenePanel.SpawnHeroInScenePanelByPlayerSlotWithFullBodyView( cstring cstring_1, unknown_variant_type unknown_variant_type_2 )</code>|
LerpToCameraEntity|<code>DOTAScenePanel.LerpToCameraEntity( cstring cstring_1, float float_2 )</code>|
SetPanelEvent|<code>DOTAScenePanel.SetPanelEvent( js_raw_args js_raw_args_1 )</code>|
RunScriptInPanelContext|<code>DOTAScenePanel.RunScriptInPanelContext( js_raw_args js_raw_args_1 )</code>|
rememberchildfocus|<code>DOTAScenePanel.rememberchildfocus( boolean boolean_1 )</code>|
paneltype|<code>DOTAScenePanel.paneltype()</code>|


# DOTAParticleScenePanel
Function|Signature|Description
--|--|--
visible|<code>DOTAParticleScenePanel.visible( boolean boolean_1 )</code>|
enabled|<code>DOTAParticleScenePanel.enabled( boolean boolean_1 )</code>|
checked|<code>DOTAParticleScenePanel.checked( boolean boolean_1 )</code>|
defaultfocus|<code>DOTAParticleScenePanel.defaultfocus( cstring cstring_1 )</code>|
inputnamespace|<code>DOTAParticleScenePanel.inputnamespace( cstring cstring_1 )</code>|
hittest|<code>DOTAParticleScenePanel.hittest( boolean boolean_1 )</code>|
hittestchildren|<code>DOTAParticleScenePanel.hittestchildren( boolean boolean_1 )</code>|
tabindex|<code>DOTAParticleScenePanel.tabindex( float float_1 )</code>|
selectionpos_x|<code>DOTAParticleScenePanel.selectionpos_x( float float_1 )</code>|
selectionpos_y|<code>DOTAParticleScenePanel.selectionpos_y( float float_1 )</code>|
type|<code>DOTAParticleScenePanel.type()</code>|
id|<code>DOTAParticleScenePanel.id()</code>|
layoutfile|<code>DOTAParticleScenePanel.layoutfile()</code>|
contentwidth|<code>DOTAParticleScenePanel.contentwidth()</code>|
contentheight|<code>DOTAParticleScenePanel.contentheight()</code>|
desiredlayoutwidth|<code>DOTAParticleScenePanel.desiredlayoutwidth()</code>|
desiredlayoutheight|<code>DOTAParticleScenePanel.desiredlayoutheight()</code>|
actuallayoutwidth|<code>DOTAParticleScenePanel.actuallayoutwidth()</code>|
actuallayoutheight|<code>DOTAParticleScenePanel.actuallayoutheight()</code>|
actualxoffset|<code>DOTAParticleScenePanel.actualxoffset()</code>|
actualyoffset|<code>DOTAParticleScenePanel.actualyoffset()</code>|
scrolloffset_y|<code>DOTAParticleScenePanel.scrolloffset_y()</code>|
scrolloffset_x|<code>DOTAParticleScenePanel.scrolloffset_x()</code>|
actualuiscale_y|<code>DOTAParticleScenePanel.actualuiscale_y()</code>|
actualuiscale_x|<code>DOTAParticleScenePanel.actualuiscale_x()</code>|
style|<code>DOTAParticleScenePanel.style()</code>|
AddClass|<code>DOTAParticleScenePanel.AddClass( cstring cstring_1 )</code>|
RemoveClass|<code>DOTAParticleScenePanel.RemoveClass( cstring cstring_1 )</code>|
BHasClass|<code>DOTAParticleScenePanel.BHasClass( cstring cstring_1 )</code>|
BAscendantHasClass|<code>DOTAParticleScenePanel.BAscendantHasClass( cstring cstring_1 )</code>|
SetHasClass|<code>DOTAParticleScenePanel.SetHasClass( cstring cstring_1, boolean boolean_2 )</code>|
ToggleClass|<code>DOTAParticleScenePanel.ToggleClass( cstring cstring_1 )</code>|
SwitchClass|<code>DOTAParticleScenePanel.SwitchClass( cstring cstring_1, cstring cstring_2 )</code>|
TriggerClass|<code>DOTAParticleScenePanel.TriggerClass( cstring cstring_1 )</code>|
ClearPanelEvent|<code>DOTAParticleScenePanel.ClearPanelEvent( cstring cstring_1 )</code>|
SetDraggable|<code>DOTAParticleScenePanel.SetDraggable( boolean boolean_1 )</code>|
IsDraggable|<code>DOTAParticleScenePanel.IsDraggable()</code>|
IsSizeValid|<code>DOTAParticleScenePanel.IsSizeValid()</code>|
GetChildCount|<code>DOTAParticleScenePanel.GetChildCount()</code>|
GetChild|<code>DOTAParticleScenePanel.GetChild( integer integer_1 )</code>|
GetChildIndex|<code>DOTAParticleScenePanel.GetChildIndex( unknown_variant_type unknown_variant_type_1 )</code>|
Children|<code>DOTAParticleScenePanel.Children()</code>|
FindChildrenWithClassTraverse|<code>DOTAParticleScenePanel.FindChildrenWithClassTraverse( cstring cstring_1 )</code>|
GetParent|<code>DOTAParticleScenePanel.GetParent()</code>|
SetParent|<code>DOTAParticleScenePanel.SetParent( unknown_variant_type unknown_variant_type_1 )</code>|
FindChild|<code>DOTAParticleScenePanel.FindChild( cstring cstring_1 )</code>|
FindChildTraverse|<code>DOTAParticleScenePanel.FindChildTraverse( cstring cstring_1 )</code>|
FindChildInLayoutFile|<code>DOTAParticleScenePanel.FindChildInLayoutFile( cstring cstring_1 )</code>|
FindPanelInLayoutFile|<code>DOTAParticleScenePanel.FindPanelInLayoutFile( cstring cstring_1 )</code>|
FindAncestor|<code>DOTAParticleScenePanel.FindAncestor( cstring cstring_1 )</code>|
RemoveAndDeleteChildren|<code>DOTAParticleScenePanel.RemoveAndDeleteChildren()</code>|
MoveChildBefore|<code>DOTAParticleScenePanel.MoveChildBefore( unknown_variant_type unknown_variant_type_1, unknown_variant_type unknown_variant_type_2 )</code>|
MoveChildAfter|<code>DOTAParticleScenePanel.MoveChildAfter( unknown_variant_type unknown_variant_type_1, unknown_variant_type unknown_variant_type_2 )</code>|
GetPositionWithinWindow|<code>DOTAParticleScenePanel.GetPositionWithinWindow()</code>|
GetPositionWithinAncestor|<code>DOTAParticleScenePanel.GetPositionWithinAncestor( unknown_variant_type unknown_variant_type_1 )</code>|
GetPosition|<code>DOTAParticleScenePanel.GetPosition( boolean boolean_1 )</code>|
ApplyStyles|<code>DOTAParticleScenePanel.ApplyStyles( boolean boolean_1 )</code>|
ClearPropertyFromCode|<code>DOTAParticleScenePanel.ClearPropertyFromCode( unknown_variant_type unknown_variant_type_1 )</code>|
DeleteAsync|<code>DOTAParticleScenePanel.DeleteAsync( float float_1 )</code>|
BIsTransparent|<code>DOTAParticleScenePanel.BIsTransparent()</code>|
BAcceptsInput|<code>DOTAParticleScenePanel.BAcceptsInput()</code>|
BAcceptsFocus|<code>DOTAParticleScenePanel.BAcceptsFocus()</code>|
SetFocus|<code>DOTAParticleScenePanel.SetFocus()</code>|
UpdateFocusInContext|<code>DOTAParticleScenePanel.UpdateFocusInContext()</code>|
BHasHoverStyle|<code>DOTAParticleScenePanel.BHasHoverStyle()</code>|
SetAcceptsInput|<code>DOTAParticleScenePanel.SetAcceptsInput( boolean boolean_1 )</code>|
SetAcceptsFocus|<code>DOTAParticleScenePanel.SetAcceptsFocus( boolean boolean_1 )</code>|
SetDisableFocusOnMouseDown|<code>DOTAParticleScenePanel.SetDisableFocusOnMouseDown( boolean boolean_1 )</code>|
BHasKeyFocus|<code>DOTAParticleScenePanel.BHasKeyFocus()</code>|
SetScrollParentToFitWhenFocused|<code>DOTAParticleScenePanel.SetScrollParentToFitWhenFocused( boolean boolean_1 )</code>|
BScrollParentToFitWhenFocused|<code>DOTAParticleScenePanel.BScrollParentToFitWhenFocused()</code>|
IsSelected|<code>DOTAParticleScenePanel.IsSelected()</code>|
BHasDescendantKeyFocus|<code>DOTAParticleScenePanel.BHasDescendantKeyFocus()</code>|
BLoadLayout|<code>DOTAParticleScenePanel.BLoadLayout( cstring cstring_1, boolean boolean_2, boolean boolean_3 )</code>|
BLoadLayoutSnippet|<code>DOTAParticleScenePanel.BLoadLayoutSnippet( cstring cstring_1 )</code>|
BHasLayoutSnippet|<code>DOTAParticleScenePanel.BHasLayoutSnippet( cstring cstring_1 )</code>|
BGetSnippetNames|<code>DOTAParticleScenePanel.BGetSnippetNames( unknown_variant_type unknown_variant_type_1 )</code>|
SetTopOfInputContext|<code>DOTAParticleScenePanel.SetTopOfInputContext( boolean boolean_1 )</code>|
SetDialogVariable|<code>DOTAParticleScenePanel.SetDialogVariable( cstring cstring_1, cstring cstring_2 )</code>|
SetDialogVariableInt|<code>DOTAParticleScenePanel.SetDialogVariableInt( cstring cstring_1, integer integer_2 )</code>|
SetDialogVariableTime|<code>DOTAParticleScenePanel.SetDialogVariableTime( cstring cstring_1, int64 int64_2 )</code>|
SetDialogVariableLocString|<code>DOTAParticleScenePanel.SetDialogVariableLocString( cstring cstring_1, cstring cstring_2 )</code>|
SetDialogVariablePluralLocStringInt|<code>DOTAParticleScenePanel.SetDialogVariablePluralLocStringInt( cstring cstring_1, cstring cstring_2, int64 int64_3 )</code>|
ScrollToTop|<code>DOTAParticleScenePanel.ScrollToTop()</code>|
ScrollToBottom|<code>DOTAParticleScenePanel.ScrollToBottom()</code>|
ScrollToLeftEdge|<code>DOTAParticleScenePanel.ScrollToLeftEdge()</code>|
ScrollToRightEdge|<code>DOTAParticleScenePanel.ScrollToRightEdge()</code>|
ScrollParentToMakePanelFit|<code>DOTAParticleScenePanel.ScrollParentToMakePanelFit( unknown_variant_type unknown_variant_type_1, boolean boolean_2 )</code>|
ScrollToFitRegion|<code>DOTAParticleScenePanel.ScrollToFitRegion( float float_1, float float_2, float float_3, float float_4, unknown_variant_type unknown_variant_type_5, boolean boolean_6, boolean boolean_7 )</code>|
BCanSeeInParentScroll|<code>DOTAParticleScenePanel.BCanSeeInParentScroll()</code>|
GetAttributeInt|<code>DOTAParticleScenePanel.GetAttributeInt( cstring cstring_1, integer integer_2 )</code>|
GetAttributeString|<code>DOTAParticleScenePanel.GetAttributeString( cstring cstring_1, cstring cstring_2 )</code>|
GetAttributeUInt32|<code>DOTAParticleScenePanel.GetAttributeUInt32( cstring cstring_1, unsigned unsigned_2 )</code>|
SetAttributeInt|<code>DOTAParticleScenePanel.SetAttributeInt( cstring cstring_1, integer integer_2 )</code>|
SetAttributeString|<code>DOTAParticleScenePanel.SetAttributeString( cstring cstring_1, cstring cstring_2 )</code>|
SetAttributeUInt32|<code>DOTAParticleScenePanel.SetAttributeUInt32( cstring cstring_1, unsigned unsigned_2 )</code>|
SetInputNamespace|<code>DOTAParticleScenePanel.SetInputNamespace( cstring cstring_1 )</code>|
RegisterForReadyEvents|<code>DOTAParticleScenePanel.RegisterForReadyEvents( boolean boolean_1 )</code>|
BReadyForDisplay|<code>DOTAParticleScenePanel.BReadyForDisplay()</code>|
SetReadyForDisplay|<code>DOTAParticleScenePanel.SetReadyForDisplay( boolean boolean_1 )</code>|
SetPositionInPixels|<code>DOTAParticleScenePanel.SetPositionInPixels( float float_1, float float_2, float float_3 )</code>|
Data|<code>DOTAParticleScenePanel.Data( js_raw_args js_raw_args_1 )</code>|
debug.description|<code>DOTAParticleScenePanel.debug.description( js_raw_args js_raw_args_1 )</code>|
SetSendScrollPositionChangedEvents|<code>DOTAParticleScenePanel.SetSendScrollPositionChangedEvents( boolean boolean_1 )</code>|
FireEntityInput|<code>DOTAParticleScenePanel.FireEntityInput( js_raw_args js_raw_args_1 )</code>|
PlayEntitySoundEvent|<code>DOTAParticleScenePanel.PlayEntitySoundEvent( cstring cstring_1, cstring cstring_2 )</code>|
SetUnit|<code>DOTAParticleScenePanel.SetUnit( cstring cstring_1, cstring cstring_2, boolean boolean_3 )</code>|
SetAnimgraphParameterOnEntityInt|<code>DOTAParticleScenePanel.SetAnimgraphParameterOnEntityInt( cstring cstring_1, cstring cstring_2, integer integer_3 )</code>|
SetAnimgraphParameterOnEntityFloat|<code>DOTAParticleScenePanel.SetAnimgraphParameterOnEntityFloat( cstring cstring_1, cstring cstring_2, float float_3 )</code>|
SetAnimgraphParameterOnEntityEnum|<code>DOTAParticleScenePanel.SetAnimgraphParameterOnEntityEnum( cstring cstring_1, cstring cstring_2, cstring cstring_3 )</code>|
GetPanoramaSurfacePanel|<code>DOTAParticleScenePanel.GetPanoramaSurfacePanel()</code>|
SetRotateParams|<code>DOTAParticleScenePanel.SetRotateParams( float float_1, float float_2, float float_3, float float_4 )</code>|
ReloadScene|<code>DOTAParticleScenePanel.ReloadScene()</code>|
ClearScene|<code>DOTAParticleScenePanel.ClearScene( boolean boolean_1 )</code>|
SpawnHeroInScenePanelByPlayerSlot|<code>DOTAParticleScenePanel.SpawnHeroInScenePanelByPlayerSlot( cstring cstring_1, unknown_variant_type unknown_variant_type_2, cstring cstring_3 )</code>|
SpawnHeroInScenePanelByHeroId|<code>DOTAParticleScenePanel.SpawnHeroInScenePanelByHeroId( integer integer_1, cstring cstring_2, integer integer_3 )</code>|
SetScenePanelToPlayerHero|<code>DOTAParticleScenePanel.SetScenePanelToPlayerHero( cstring cstring_1, unknown_variant_type unknown_variant_type_2 )</code>|
SetScenePanelToLocalHero|<code>DOTAParticleScenePanel.SetScenePanelToLocalHero( integer integer_1 )</code>|
ReplaceEconItemSlot|<code>DOTAParticleScenePanel.ReplaceEconItemSlot( integer integer_1, integer integer_2, integer integer_3 )</code>|
SetPostProcessFade|<code>DOTAParticleScenePanel.SetPostProcessFade( float float_1 )</code>|
SetCustomPostProcessMaterial|<code>DOTAParticleScenePanel.SetCustomPostProcessMaterial( cstring cstring_1 )</code>|
SetCustomSpecialPostEffectMaterial|<code>DOTAParticleScenePanel.SetCustomSpecialPostEffectMaterial( cstring cstring_1 )</code>|
SpawnHeroInScenePanelByPlayerSlotWithFullBodyView|<code>DOTAParticleScenePanel.SpawnHeroInScenePanelByPlayerSlotWithFullBodyView( cstring cstring_1, unknown_variant_type unknown_variant_type_2 )</code>|
LerpToCameraEntity|<code>DOTAParticleScenePanel.LerpToCameraEntity( cstring cstring_1, float float_2 )</code>|
StartParticles|<code>DOTAParticleScenePanel.StartParticles()</code>|
StopParticlesImmediately|<code>DOTAParticleScenePanel.StopParticlesImmediately( boolean boolean_1 )</code>|
StopParticlesWithEndcaps|<code>DOTAParticleScenePanel.StopParticlesWithEndcaps()</code>|
SetControlPoint|<code>DOTAParticleScenePanel.SetControlPoint( integer integer_1, float float_2, float float_3, float float_4 )</code>|
SetPanelEvent|<code>DOTAParticleScenePanel.SetPanelEvent( js_raw_args js_raw_args_1 )</code>|
RunScriptInPanelContext|<code>DOTAParticleScenePanel.RunScriptInPanelContext( js_raw_args js_raw_args_1 )</code>|
rememberchildfocus|<code>DOTAParticleScenePanel.rememberchildfocus( boolean boolean_1 )</code>|
paneltype|<code>DOTAParticleScenePanel.paneltype()</code>|


# DOTAUserName
Function|Signature|Description
--|--|--
visible|<code>DOTAUserName.visible( boolean boolean_1 )</code>|
enabled|<code>DOTAUserName.enabled( boolean boolean_1 )</code>|
checked|<code>DOTAUserName.checked( boolean boolean_1 )</code>|
defaultfocus|<code>DOTAUserName.defaultfocus( cstring cstring_1 )</code>|
inputnamespace|<code>DOTAUserName.inputnamespace( cstring cstring_1 )</code>|
hittest|<code>DOTAUserName.hittest( boolean boolean_1 )</code>|
hittestchildren|<code>DOTAUserName.hittestchildren( boolean boolean_1 )</code>|
tabindex|<code>DOTAUserName.tabindex( float float_1 )</code>|
selectionpos_x|<code>DOTAUserName.selectionpos_x( float float_1 )</code>|
selectionpos_y|<code>DOTAUserName.selectionpos_y( float float_1 )</code>|
type|<code>DOTAUserName.type()</code>|
id|<code>DOTAUserName.id()</code>|
layoutfile|<code>DOTAUserName.layoutfile()</code>|
contentwidth|<code>DOTAUserName.contentwidth()</code>|
contentheight|<code>DOTAUserName.contentheight()</code>|
desiredlayoutwidth|<code>DOTAUserName.desiredlayoutwidth()</code>|
desiredlayoutheight|<code>DOTAUserName.desiredlayoutheight()</code>|
actuallayoutwidth|<code>DOTAUserName.actuallayoutwidth()</code>|
actuallayoutheight|<code>DOTAUserName.actuallayoutheight()</code>|
actualxoffset|<code>DOTAUserName.actualxoffset()</code>|
actualyoffset|<code>DOTAUserName.actualyoffset()</code>|
scrolloffset_y|<code>DOTAUserName.scrolloffset_y()</code>|
scrolloffset_x|<code>DOTAUserName.scrolloffset_x()</code>|
actualuiscale_y|<code>DOTAUserName.actualuiscale_y()</code>|
actualuiscale_x|<code>DOTAUserName.actualuiscale_x()</code>|
style|<code>DOTAUserName.style()</code>|
AddClass|<code>DOTAUserName.AddClass( cstring cstring_1 )</code>|
RemoveClass|<code>DOTAUserName.RemoveClass( cstring cstring_1 )</code>|
BHasClass|<code>DOTAUserName.BHasClass( cstring cstring_1 )</code>|
BAscendantHasClass|<code>DOTAUserName.BAscendantHasClass( cstring cstring_1 )</code>|
SetHasClass|<code>DOTAUserName.SetHasClass( cstring cstring_1, boolean boolean_2 )</code>|
ToggleClass|<code>DOTAUserName.ToggleClass( cstring cstring_1 )</code>|
SwitchClass|<code>DOTAUserName.SwitchClass( cstring cstring_1, cstring cstring_2 )</code>|
TriggerClass|<code>DOTAUserName.TriggerClass( cstring cstring_1 )</code>|
ClearPanelEvent|<code>DOTAUserName.ClearPanelEvent( cstring cstring_1 )</code>|
SetDraggable|<code>DOTAUserName.SetDraggable( boolean boolean_1 )</code>|
IsDraggable|<code>DOTAUserName.IsDraggable()</code>|
IsSizeValid|<code>DOTAUserName.IsSizeValid()</code>|
GetChildCount|<code>DOTAUserName.GetChildCount()</code>|
GetChild|<code>DOTAUserName.GetChild( integer integer_1 )</code>|
GetChildIndex|<code>DOTAUserName.GetChildIndex( unknown_variant_type unknown_variant_type_1 )</code>|
Children|<code>DOTAUserName.Children()</code>|
FindChildrenWithClassTraverse|<code>DOTAUserName.FindChildrenWithClassTraverse( cstring cstring_1 )</code>|
GetParent|<code>DOTAUserName.GetParent()</code>|
SetParent|<code>DOTAUserName.SetParent( unknown_variant_type unknown_variant_type_1 )</code>|
FindChild|<code>DOTAUserName.FindChild( cstring cstring_1 )</code>|
FindChildTraverse|<code>DOTAUserName.FindChildTraverse( cstring cstring_1 )</code>|
FindChildInLayoutFile|<code>DOTAUserName.FindChildInLayoutFile( cstring cstring_1 )</code>|
FindPanelInLayoutFile|<code>DOTAUserName.FindPanelInLayoutFile( cstring cstring_1 )</code>|
FindAncestor|<code>DOTAUserName.FindAncestor( cstring cstring_1 )</code>|
RemoveAndDeleteChildren|<code>DOTAUserName.RemoveAndDeleteChildren()</code>|
MoveChildBefore|<code>DOTAUserName.MoveChildBefore( unknown_variant_type unknown_variant_type_1, unknown_variant_type unknown_variant_type_2 )</code>|
MoveChildAfter|<code>DOTAUserName.MoveChildAfter( unknown_variant_type unknown_variant_type_1, unknown_variant_type unknown_variant_type_2 )</code>|
GetPositionWithinWindow|<code>DOTAUserName.GetPositionWithinWindow()</code>|
GetPositionWithinAncestor|<code>DOTAUserName.GetPositionWithinAncestor( unknown_variant_type unknown_variant_type_1 )</code>|
GetPosition|<code>DOTAUserName.GetPosition( boolean boolean_1 )</code>|
ApplyStyles|<code>DOTAUserName.ApplyStyles( boolean boolean_1 )</code>|
ClearPropertyFromCode|<code>DOTAUserName.ClearPropertyFromCode( unknown_variant_type unknown_variant_type_1 )</code>|
DeleteAsync|<code>DOTAUserName.DeleteAsync( float float_1 )</code>|
BIsTransparent|<code>DOTAUserName.BIsTransparent()</code>|
BAcceptsInput|<code>DOTAUserName.BAcceptsInput()</code>|
BAcceptsFocus|<code>DOTAUserName.BAcceptsFocus()</code>|
SetFocus|<code>DOTAUserName.SetFocus()</code>|
UpdateFocusInContext|<code>DOTAUserName.UpdateFocusInContext()</code>|
BHasHoverStyle|<code>DOTAUserName.BHasHoverStyle()</code>|
SetAcceptsInput|<code>DOTAUserName.SetAcceptsInput( boolean boolean_1 )</code>|
SetAcceptsFocus|<code>DOTAUserName.SetAcceptsFocus( boolean boolean_1 )</code>|
SetDisableFocusOnMouseDown|<code>DOTAUserName.SetDisableFocusOnMouseDown( boolean boolean_1 )</code>|
BHasKeyFocus|<code>DOTAUserName.BHasKeyFocus()</code>|
SetScrollParentToFitWhenFocused|<code>DOTAUserName.SetScrollParentToFitWhenFocused( boolean boolean_1 )</code>|
BScrollParentToFitWhenFocused|<code>DOTAUserName.BScrollParentToFitWhenFocused()</code>|
IsSelected|<code>DOTAUserName.IsSelected()</code>|
BHasDescendantKeyFocus|<code>DOTAUserName.BHasDescendantKeyFocus()</code>|
BLoadLayout|<code>DOTAUserName.BLoadLayout( cstring cstring_1, boolean boolean_2, boolean boolean_3 )</code>|
BLoadLayoutSnippet|<code>DOTAUserName.BLoadLayoutSnippet( cstring cstring_1 )</code>|
BHasLayoutSnippet|<code>DOTAUserName.BHasLayoutSnippet( cstring cstring_1 )</code>|
BGetSnippetNames|<code>DOTAUserName.BGetSnippetNames( unknown_variant_type unknown_variant_type_1 )</code>|
SetTopOfInputContext|<code>DOTAUserName.SetTopOfInputContext( boolean boolean_1 )</code>|
SetDialogVariable|<code>DOTAUserName.SetDialogVariable( cstring cstring_1, cstring cstring_2 )</code>|
SetDialogVariableInt|<code>DOTAUserName.SetDialogVariableInt( cstring cstring_1, integer integer_2 )</code>|
SetDialogVariableTime|<code>DOTAUserName.SetDialogVariableTime( cstring cstring_1, int64 int64_2 )</code>|
SetDialogVariableLocString|<code>DOTAUserName.SetDialogVariableLocString( cstring cstring_1, cstring cstring_2 )</code>|
SetDialogVariablePluralLocStringInt|<code>DOTAUserName.SetDialogVariablePluralLocStringInt( cstring cstring_1, cstring cstring_2, int64 int64_3 )</code>|
ScrollToTop|<code>DOTAUserName.ScrollToTop()</code>|
ScrollToBottom|<code>DOTAUserName.ScrollToBottom()</code>|
ScrollToLeftEdge|<code>DOTAUserName.ScrollToLeftEdge()</code>|
ScrollToRightEdge|<code>DOTAUserName.ScrollToRightEdge()</code>|
ScrollParentToMakePanelFit|<code>DOTAUserName.ScrollParentToMakePanelFit( unknown_variant_type unknown_variant_type_1, boolean boolean_2 )</code>|
ScrollToFitRegion|<code>DOTAUserName.ScrollToFitRegion( float float_1, float float_2, float float_3, float float_4, unknown_variant_type unknown_variant_type_5, boolean boolean_6, boolean boolean_7 )</code>|
BCanSeeInParentScroll|<code>DOTAUserName.BCanSeeInParentScroll()</code>|
GetAttributeInt|<code>DOTAUserName.GetAttributeInt( cstring cstring_1, integer integer_2 )</code>|
GetAttributeString|<code>DOTAUserName.GetAttributeString( cstring cstring_1, cstring cstring_2 )</code>|
GetAttributeUInt32|<code>DOTAUserName.GetAttributeUInt32( cstring cstring_1, unsigned unsigned_2 )</code>|
SetAttributeInt|<code>DOTAUserName.SetAttributeInt( cstring cstring_1, integer integer_2 )</code>|
SetAttributeString|<code>DOTAUserName.SetAttributeString( cstring cstring_1, cstring cstring_2 )</code>|
SetAttributeUInt32|<code>DOTAUserName.SetAttributeUInt32( cstring cstring_1, unsigned unsigned_2 )</code>|
SetInputNamespace|<code>DOTAUserName.SetInputNamespace( cstring cstring_1 )</code>|
RegisterForReadyEvents|<code>DOTAUserName.RegisterForReadyEvents( boolean boolean_1 )</code>|
BReadyForDisplay|<code>DOTAUserName.BReadyForDisplay()</code>|
SetReadyForDisplay|<code>DOTAUserName.SetReadyForDisplay( boolean boolean_1 )</code>|
SetPositionInPixels|<code>DOTAUserName.SetPositionInPixels( float float_1, float float_2, float float_3 )</code>|
Data|<code>DOTAUserName.Data( js_raw_args js_raw_args_1 )</code>|
debug.description|<code>DOTAUserName.debug.description( js_raw_args js_raw_args_1 )</code>|
SetSendScrollPositionChangedEvents|<code>DOTAUserName.SetSendScrollPositionChangedEvents( boolean boolean_1 )</code>|
steamid|<code>DOTAUserName.steamid( cstring cstring_1 )</code>|
accountid|<code>DOTAUserName.accountid( cstring cstring_1 )</code>|
SetPanelEvent|<code>DOTAUserName.SetPanelEvent( js_raw_args js_raw_args_1 )</code>|
RunScriptInPanelContext|<code>DOTAUserName.RunScriptInPanelContext( js_raw_args js_raw_args_1 )</code>|
rememberchildfocus|<code>DOTAUserName.rememberchildfocus( boolean boolean_1 )</code>|
paneltype|<code>DOTAUserName.paneltype()</code>|


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
GetPosition|<code>DOTAAbilityImage.GetPosition( boolean boolean_1 )</code>|
ApplyStyles|<code>DOTAAbilityImage.ApplyStyles( boolean boolean_1 )</code>|
ClearPropertyFromCode|<code>DOTAAbilityImage.ClearPropertyFromCode( unknown_variant_type unknown_variant_type_1 )</code>|
DeleteAsync|<code>DOTAAbilityImage.DeleteAsync( float float_1 )</code>|
BIsTransparent|<code>DOTAAbilityImage.BIsTransparent()</code>|
BAcceptsInput|<code>DOTAAbilityImage.BAcceptsInput()</code>|
BAcceptsFocus|<code>DOTAAbilityImage.BAcceptsFocus()</code>|
SetFocus|<code>DOTAAbilityImage.SetFocus()</code>|
UpdateFocusInContext|<code>DOTAAbilityImage.UpdateFocusInContext()</code>|
BHasHoverStyle|<code>DOTAAbilityImage.BHasHoverStyle()</code>|
SetAcceptsInput|<code>DOTAAbilityImage.SetAcceptsInput( boolean boolean_1 )</code>|
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
BGetSnippetNames|<code>DOTAAbilityImage.BGetSnippetNames( unknown_variant_type unknown_variant_type_1 )</code>|
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
debug.description|<code>DOTAAbilityImage.debug.description( js_raw_args js_raw_args_1 )</code>|
SetSendScrollPositionChangedEvents|<code>DOTAAbilityImage.SetSendScrollPositionChangedEvents( boolean boolean_1 )</code>|
SetImage|<code>DOTAAbilityImage.SetImage( cstring cstring_1 )</code>|
SetImageFromPanel|<code>DOTAAbilityImage.SetImageFromPanel( unknown_variant_type unknown_variant_type_1, boolean boolean_2 )</code>|
SetScaling|<code>DOTAAbilityImage.SetScaling( cstring cstring_1 )</code>|
abilityid|<code>DOTAAbilityImage.abilityid( unknown_variant_type unknown_variant_type_1 )</code>|
abilityname|<code>DOTAAbilityImage.abilityname( cstring cstring_1 )</code>|
abilitylevel|<code>DOTAAbilityImage.abilitylevel( integer integer_1 )</code>|
contextEntityIndex|<code>DOTAAbilityImage.contextEntityIndex( unknown_variant_type unknown_variant_type_1 )</code>|
SetPanelEvent|<code>DOTAAbilityImage.SetPanelEvent( js_raw_args js_raw_args_1 )</code>|
RunScriptInPanelContext|<code>DOTAAbilityImage.RunScriptInPanelContext( js_raw_args js_raw_args_1 )</code>|
rememberchildfocus|<code>DOTAAbilityImage.rememberchildfocus( boolean boolean_1 )</code>|
paneltype|<code>DOTAAbilityImage.paneltype()</code>|


# DOTAItemImage
Function|Signature|Description
--|--|--
visible|<code>DOTAItemImage.visible( boolean boolean_1 )</code>|
enabled|<code>DOTAItemImage.enabled( boolean boolean_1 )</code>|
checked|<code>DOTAItemImage.checked( boolean boolean_1 )</code>|
defaultfocus|<code>DOTAItemImage.defaultfocus( cstring cstring_1 )</code>|
inputnamespace|<code>DOTAItemImage.inputnamespace( cstring cstring_1 )</code>|
hittest|<code>DOTAItemImage.hittest( boolean boolean_1 )</code>|
hittestchildren|<code>DOTAItemImage.hittestchildren( boolean boolean_1 )</code>|
tabindex|<code>DOTAItemImage.tabindex( float float_1 )</code>|
selectionpos_x|<code>DOTAItemImage.selectionpos_x( float float_1 )</code>|
selectionpos_y|<code>DOTAItemImage.selectionpos_y( float float_1 )</code>|
type|<code>DOTAItemImage.type()</code>|
id|<code>DOTAItemImage.id()</code>|
layoutfile|<code>DOTAItemImage.layoutfile()</code>|
contentwidth|<code>DOTAItemImage.contentwidth()</code>|
contentheight|<code>DOTAItemImage.contentheight()</code>|
desiredlayoutwidth|<code>DOTAItemImage.desiredlayoutwidth()</code>|
desiredlayoutheight|<code>DOTAItemImage.desiredlayoutheight()</code>|
actuallayoutwidth|<code>DOTAItemImage.actuallayoutwidth()</code>|
actuallayoutheight|<code>DOTAItemImage.actuallayoutheight()</code>|
actualxoffset|<code>DOTAItemImage.actualxoffset()</code>|
actualyoffset|<code>DOTAItemImage.actualyoffset()</code>|
scrolloffset_y|<code>DOTAItemImage.scrolloffset_y()</code>|
scrolloffset_x|<code>DOTAItemImage.scrolloffset_x()</code>|
actualuiscale_y|<code>DOTAItemImage.actualuiscale_y()</code>|
actualuiscale_x|<code>DOTAItemImage.actualuiscale_x()</code>|
style|<code>DOTAItemImage.style()</code>|
AddClass|<code>DOTAItemImage.AddClass( cstring cstring_1 )</code>|
RemoveClass|<code>DOTAItemImage.RemoveClass( cstring cstring_1 )</code>|
BHasClass|<code>DOTAItemImage.BHasClass( cstring cstring_1 )</code>|
BAscendantHasClass|<code>DOTAItemImage.BAscendantHasClass( cstring cstring_1 )</code>|
SetHasClass|<code>DOTAItemImage.SetHasClass( cstring cstring_1, boolean boolean_2 )</code>|
ToggleClass|<code>DOTAItemImage.ToggleClass( cstring cstring_1 )</code>|
SwitchClass|<code>DOTAItemImage.SwitchClass( cstring cstring_1, cstring cstring_2 )</code>|
TriggerClass|<code>DOTAItemImage.TriggerClass( cstring cstring_1 )</code>|
ClearPanelEvent|<code>DOTAItemImage.ClearPanelEvent( cstring cstring_1 )</code>|
SetDraggable|<code>DOTAItemImage.SetDraggable( boolean boolean_1 )</code>|
IsDraggable|<code>DOTAItemImage.IsDraggable()</code>|
IsSizeValid|<code>DOTAItemImage.IsSizeValid()</code>|
GetChildCount|<code>DOTAItemImage.GetChildCount()</code>|
GetChild|<code>DOTAItemImage.GetChild( integer integer_1 )</code>|
GetChildIndex|<code>DOTAItemImage.GetChildIndex( unknown_variant_type unknown_variant_type_1 )</code>|
Children|<code>DOTAItemImage.Children()</code>|
FindChildrenWithClassTraverse|<code>DOTAItemImage.FindChildrenWithClassTraverse( cstring cstring_1 )</code>|
GetParent|<code>DOTAItemImage.GetParent()</code>|
SetParent|<code>DOTAItemImage.SetParent( unknown_variant_type unknown_variant_type_1 )</code>|
FindChild|<code>DOTAItemImage.FindChild( cstring cstring_1 )</code>|
FindChildTraverse|<code>DOTAItemImage.FindChildTraverse( cstring cstring_1 )</code>|
FindChildInLayoutFile|<code>DOTAItemImage.FindChildInLayoutFile( cstring cstring_1 )</code>|
FindPanelInLayoutFile|<code>DOTAItemImage.FindPanelInLayoutFile( cstring cstring_1 )</code>|
FindAncestor|<code>DOTAItemImage.FindAncestor( cstring cstring_1 )</code>|
RemoveAndDeleteChildren|<code>DOTAItemImage.RemoveAndDeleteChildren()</code>|
MoveChildBefore|<code>DOTAItemImage.MoveChildBefore( unknown_variant_type unknown_variant_type_1, unknown_variant_type unknown_variant_type_2 )</code>|
MoveChildAfter|<code>DOTAItemImage.MoveChildAfter( unknown_variant_type unknown_variant_type_1, unknown_variant_type unknown_variant_type_2 )</code>|
GetPositionWithinWindow|<code>DOTAItemImage.GetPositionWithinWindow()</code>|
GetPositionWithinAncestor|<code>DOTAItemImage.GetPositionWithinAncestor( unknown_variant_type unknown_variant_type_1 )</code>|
GetPosition|<code>DOTAItemImage.GetPosition( boolean boolean_1 )</code>|
ApplyStyles|<code>DOTAItemImage.ApplyStyles( boolean boolean_1 )</code>|
ClearPropertyFromCode|<code>DOTAItemImage.ClearPropertyFromCode( unknown_variant_type unknown_variant_type_1 )</code>|
DeleteAsync|<code>DOTAItemImage.DeleteAsync( float float_1 )</code>|
BIsTransparent|<code>DOTAItemImage.BIsTransparent()</code>|
BAcceptsInput|<code>DOTAItemImage.BAcceptsInput()</code>|
BAcceptsFocus|<code>DOTAItemImage.BAcceptsFocus()</code>|
SetFocus|<code>DOTAItemImage.SetFocus()</code>|
UpdateFocusInContext|<code>DOTAItemImage.UpdateFocusInContext()</code>|
BHasHoverStyle|<code>DOTAItemImage.BHasHoverStyle()</code>|
SetAcceptsInput|<code>DOTAItemImage.SetAcceptsInput( boolean boolean_1 )</code>|
SetAcceptsFocus|<code>DOTAItemImage.SetAcceptsFocus( boolean boolean_1 )</code>|
SetDisableFocusOnMouseDown|<code>DOTAItemImage.SetDisableFocusOnMouseDown( boolean boolean_1 )</code>|
BHasKeyFocus|<code>DOTAItemImage.BHasKeyFocus()</code>|
SetScrollParentToFitWhenFocused|<code>DOTAItemImage.SetScrollParentToFitWhenFocused( boolean boolean_1 )</code>|
BScrollParentToFitWhenFocused|<code>DOTAItemImage.BScrollParentToFitWhenFocused()</code>|
IsSelected|<code>DOTAItemImage.IsSelected()</code>|
BHasDescendantKeyFocus|<code>DOTAItemImage.BHasDescendantKeyFocus()</code>|
BLoadLayout|<code>DOTAItemImage.BLoadLayout( cstring cstring_1, boolean boolean_2, boolean boolean_3 )</code>|
BLoadLayoutSnippet|<code>DOTAItemImage.BLoadLayoutSnippet( cstring cstring_1 )</code>|
BHasLayoutSnippet|<code>DOTAItemImage.BHasLayoutSnippet( cstring cstring_1 )</code>|
BGetSnippetNames|<code>DOTAItemImage.BGetSnippetNames( unknown_variant_type unknown_variant_type_1 )</code>|
SetTopOfInputContext|<code>DOTAItemImage.SetTopOfInputContext( boolean boolean_1 )</code>|
SetDialogVariable|<code>DOTAItemImage.SetDialogVariable( cstring cstring_1, cstring cstring_2 )</code>|
SetDialogVariableInt|<code>DOTAItemImage.SetDialogVariableInt( cstring cstring_1, integer integer_2 )</code>|
SetDialogVariableTime|<code>DOTAItemImage.SetDialogVariableTime( cstring cstring_1, int64 int64_2 )</code>|
SetDialogVariableLocString|<code>DOTAItemImage.SetDialogVariableLocString( cstring cstring_1, cstring cstring_2 )</code>|
SetDialogVariablePluralLocStringInt|<code>DOTAItemImage.SetDialogVariablePluralLocStringInt( cstring cstring_1, cstring cstring_2, int64 int64_3 )</code>|
ScrollToTop|<code>DOTAItemImage.ScrollToTop()</code>|
ScrollToBottom|<code>DOTAItemImage.ScrollToBottom()</code>|
ScrollToLeftEdge|<code>DOTAItemImage.ScrollToLeftEdge()</code>|
ScrollToRightEdge|<code>DOTAItemImage.ScrollToRightEdge()</code>|
ScrollParentToMakePanelFit|<code>DOTAItemImage.ScrollParentToMakePanelFit( unknown_variant_type unknown_variant_type_1, boolean boolean_2 )</code>|
ScrollToFitRegion|<code>DOTAItemImage.ScrollToFitRegion( float float_1, float float_2, float float_3, float float_4, unknown_variant_type unknown_variant_type_5, boolean boolean_6, boolean boolean_7 )</code>|
BCanSeeInParentScroll|<code>DOTAItemImage.BCanSeeInParentScroll()</code>|
GetAttributeInt|<code>DOTAItemImage.GetAttributeInt( cstring cstring_1, integer integer_2 )</code>|
GetAttributeString|<code>DOTAItemImage.GetAttributeString( cstring cstring_1, cstring cstring_2 )</code>|
GetAttributeUInt32|<code>DOTAItemImage.GetAttributeUInt32( cstring cstring_1, unsigned unsigned_2 )</code>|
SetAttributeInt|<code>DOTAItemImage.SetAttributeInt( cstring cstring_1, integer integer_2 )</code>|
SetAttributeString|<code>DOTAItemImage.SetAttributeString( cstring cstring_1, cstring cstring_2 )</code>|
SetAttributeUInt32|<code>DOTAItemImage.SetAttributeUInt32( cstring cstring_1, unsigned unsigned_2 )</code>|
SetInputNamespace|<code>DOTAItemImage.SetInputNamespace( cstring cstring_1 )</code>|
RegisterForReadyEvents|<code>DOTAItemImage.RegisterForReadyEvents( boolean boolean_1 )</code>|
BReadyForDisplay|<code>DOTAItemImage.BReadyForDisplay()</code>|
SetReadyForDisplay|<code>DOTAItemImage.SetReadyForDisplay( boolean boolean_1 )</code>|
SetPositionInPixels|<code>DOTAItemImage.SetPositionInPixels( float float_1, float float_2, float float_3 )</code>|
Data|<code>DOTAItemImage.Data( js_raw_args js_raw_args_1 )</code>|
debug.description|<code>DOTAItemImage.debug.description( js_raw_args js_raw_args_1 )</code>|
SetSendScrollPositionChangedEvents|<code>DOTAItemImage.SetSendScrollPositionChangedEvents( boolean boolean_1 )</code>|
SetImage|<code>DOTAItemImage.SetImage( cstring cstring_1 )</code>|
SetImageFromPanel|<code>DOTAItemImage.SetImageFromPanel( unknown_variant_type unknown_variant_type_1, boolean boolean_2 )</code>|
SetScaling|<code>DOTAItemImage.SetScaling( cstring cstring_1 )</code>|
itemname|<code>DOTAItemImage.itemname( cstring cstring_1 )</code>|
contextEntityIndex|<code>DOTAItemImage.contextEntityIndex( unknown_variant_type unknown_variant_type_1 )</code>|
SetPanelEvent|<code>DOTAItemImage.SetPanelEvent( js_raw_args js_raw_args_1 )</code>|
RunScriptInPanelContext|<code>DOTAItemImage.RunScriptInPanelContext( js_raw_args js_raw_args_1 )</code>|
rememberchildfocus|<code>DOTAItemImage.rememberchildfocus( boolean boolean_1 )</code>|
paneltype|<code>DOTAItemImage.paneltype()</code>|


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
GetPosition|<code>TextEntry.GetPosition( boolean boolean_1 )</code>|
ApplyStyles|<code>TextEntry.ApplyStyles( boolean boolean_1 )</code>|
ClearPropertyFromCode|<code>TextEntry.ClearPropertyFromCode( unknown_variant_type unknown_variant_type_1 )</code>|
DeleteAsync|<code>TextEntry.DeleteAsync( float float_1 )</code>|
BIsTransparent|<code>TextEntry.BIsTransparent()</code>|
BAcceptsInput|<code>TextEntry.BAcceptsInput()</code>|
BAcceptsFocus|<code>TextEntry.BAcceptsFocus()</code>|
SetFocus|<code>TextEntry.SetFocus()</code>|
UpdateFocusInContext|<code>TextEntry.UpdateFocusInContext()</code>|
BHasHoverStyle|<code>TextEntry.BHasHoverStyle()</code>|
SetAcceptsInput|<code>TextEntry.SetAcceptsInput( boolean boolean_1 )</code>|
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
BGetSnippetNames|<code>TextEntry.BGetSnippetNames( unknown_variant_type unknown_variant_type_1 )</code>|
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
debug.description|<code>TextEntry.debug.description( js_raw_args js_raw_args_1 )</code>|
SetSendScrollPositionChangedEvents|<code>TextEntry.SetSendScrollPositionChangedEvents( boolean boolean_1 )</code>|
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


# NumberEntry
Function|Signature|Description
--|--|--
visible|<code>NumberEntry.visible( boolean boolean_1 )</code>|
enabled|<code>NumberEntry.enabled( boolean boolean_1 )</code>|
checked|<code>NumberEntry.checked( boolean boolean_1 )</code>|
defaultfocus|<code>NumberEntry.defaultfocus( cstring cstring_1 )</code>|
inputnamespace|<code>NumberEntry.inputnamespace( cstring cstring_1 )</code>|
hittest|<code>NumberEntry.hittest( boolean boolean_1 )</code>|
hittestchildren|<code>NumberEntry.hittestchildren( boolean boolean_1 )</code>|
tabindex|<code>NumberEntry.tabindex( float float_1 )</code>|
selectionpos_x|<code>NumberEntry.selectionpos_x( float float_1 )</code>|
selectionpos_y|<code>NumberEntry.selectionpos_y( float float_1 )</code>|
type|<code>NumberEntry.type()</code>|
id|<code>NumberEntry.id()</code>|
layoutfile|<code>NumberEntry.layoutfile()</code>|
contentwidth|<code>NumberEntry.contentwidth()</code>|
contentheight|<code>NumberEntry.contentheight()</code>|
desiredlayoutwidth|<code>NumberEntry.desiredlayoutwidth()</code>|
desiredlayoutheight|<code>NumberEntry.desiredlayoutheight()</code>|
actuallayoutwidth|<code>NumberEntry.actuallayoutwidth()</code>|
actuallayoutheight|<code>NumberEntry.actuallayoutheight()</code>|
actualxoffset|<code>NumberEntry.actualxoffset()</code>|
actualyoffset|<code>NumberEntry.actualyoffset()</code>|
scrolloffset_y|<code>NumberEntry.scrolloffset_y()</code>|
scrolloffset_x|<code>NumberEntry.scrolloffset_x()</code>|
actualuiscale_y|<code>NumberEntry.actualuiscale_y()</code>|
actualuiscale_x|<code>NumberEntry.actualuiscale_x()</code>|
style|<code>NumberEntry.style()</code>|
AddClass|<code>NumberEntry.AddClass( cstring cstring_1 )</code>|
RemoveClass|<code>NumberEntry.RemoveClass( cstring cstring_1 )</code>|
BHasClass|<code>NumberEntry.BHasClass( cstring cstring_1 )</code>|
BAscendantHasClass|<code>NumberEntry.BAscendantHasClass( cstring cstring_1 )</code>|
SetHasClass|<code>NumberEntry.SetHasClass( cstring cstring_1, boolean boolean_2 )</code>|
ToggleClass|<code>NumberEntry.ToggleClass( cstring cstring_1 )</code>|
SwitchClass|<code>NumberEntry.SwitchClass( cstring cstring_1, cstring cstring_2 )</code>|
TriggerClass|<code>NumberEntry.TriggerClass( cstring cstring_1 )</code>|
ClearPanelEvent|<code>NumberEntry.ClearPanelEvent( cstring cstring_1 )</code>|
SetDraggable|<code>NumberEntry.SetDraggable( boolean boolean_1 )</code>|
IsDraggable|<code>NumberEntry.IsDraggable()</code>|
IsSizeValid|<code>NumberEntry.IsSizeValid()</code>|
GetChildCount|<code>NumberEntry.GetChildCount()</code>|
GetChild|<code>NumberEntry.GetChild( integer integer_1 )</code>|
GetChildIndex|<code>NumberEntry.GetChildIndex( unknown_variant_type unknown_variant_type_1 )</code>|
Children|<code>NumberEntry.Children()</code>|
FindChildrenWithClassTraverse|<code>NumberEntry.FindChildrenWithClassTraverse( cstring cstring_1 )</code>|
GetParent|<code>NumberEntry.GetParent()</code>|
SetParent|<code>NumberEntry.SetParent( unknown_variant_type unknown_variant_type_1 )</code>|
FindChild|<code>NumberEntry.FindChild( cstring cstring_1 )</code>|
FindChildTraverse|<code>NumberEntry.FindChildTraverse( cstring cstring_1 )</code>|
FindChildInLayoutFile|<code>NumberEntry.FindChildInLayoutFile( cstring cstring_1 )</code>|
FindPanelInLayoutFile|<code>NumberEntry.FindPanelInLayoutFile( cstring cstring_1 )</code>|
FindAncestor|<code>NumberEntry.FindAncestor( cstring cstring_1 )</code>|
RemoveAndDeleteChildren|<code>NumberEntry.RemoveAndDeleteChildren()</code>|
MoveChildBefore|<code>NumberEntry.MoveChildBefore( unknown_variant_type unknown_variant_type_1, unknown_variant_type unknown_variant_type_2 )</code>|
MoveChildAfter|<code>NumberEntry.MoveChildAfter( unknown_variant_type unknown_variant_type_1, unknown_variant_type unknown_variant_type_2 )</code>|
GetPositionWithinWindow|<code>NumberEntry.GetPositionWithinWindow()</code>|
GetPositionWithinAncestor|<code>NumberEntry.GetPositionWithinAncestor( unknown_variant_type unknown_variant_type_1 )</code>|
GetPosition|<code>NumberEntry.GetPosition( boolean boolean_1 )</code>|
ApplyStyles|<code>NumberEntry.ApplyStyles( boolean boolean_1 )</code>|
ClearPropertyFromCode|<code>NumberEntry.ClearPropertyFromCode( unknown_variant_type unknown_variant_type_1 )</code>|
DeleteAsync|<code>NumberEntry.DeleteAsync( float float_1 )</code>|
BIsTransparent|<code>NumberEntry.BIsTransparent()</code>|
BAcceptsInput|<code>NumberEntry.BAcceptsInput()</code>|
BAcceptsFocus|<code>NumberEntry.BAcceptsFocus()</code>|
SetFocus|<code>NumberEntry.SetFocus()</code>|
UpdateFocusInContext|<code>NumberEntry.UpdateFocusInContext()</code>|
BHasHoverStyle|<code>NumberEntry.BHasHoverStyle()</code>|
SetAcceptsInput|<code>NumberEntry.SetAcceptsInput( boolean boolean_1 )</code>|
SetAcceptsFocus|<code>NumberEntry.SetAcceptsFocus( boolean boolean_1 )</code>|
SetDisableFocusOnMouseDown|<code>NumberEntry.SetDisableFocusOnMouseDown( boolean boolean_1 )</code>|
BHasKeyFocus|<code>NumberEntry.BHasKeyFocus()</code>|
SetScrollParentToFitWhenFocused|<code>NumberEntry.SetScrollParentToFitWhenFocused( boolean boolean_1 )</code>|
BScrollParentToFitWhenFocused|<code>NumberEntry.BScrollParentToFitWhenFocused()</code>|
IsSelected|<code>NumberEntry.IsSelected()</code>|
BHasDescendantKeyFocus|<code>NumberEntry.BHasDescendantKeyFocus()</code>|
BLoadLayout|<code>NumberEntry.BLoadLayout( cstring cstring_1, boolean boolean_2, boolean boolean_3 )</code>|
BLoadLayoutSnippet|<code>NumberEntry.BLoadLayoutSnippet( cstring cstring_1 )</code>|
BHasLayoutSnippet|<code>NumberEntry.BHasLayoutSnippet( cstring cstring_1 )</code>|
BGetSnippetNames|<code>NumberEntry.BGetSnippetNames( unknown_variant_type unknown_variant_type_1 )</code>|
SetTopOfInputContext|<code>NumberEntry.SetTopOfInputContext( boolean boolean_1 )</code>|
SetDialogVariable|<code>NumberEntry.SetDialogVariable( cstring cstring_1, cstring cstring_2 )</code>|
SetDialogVariableInt|<code>NumberEntry.SetDialogVariableInt( cstring cstring_1, integer integer_2 )</code>|
SetDialogVariableTime|<code>NumberEntry.SetDialogVariableTime( cstring cstring_1, int64 int64_2 )</code>|
SetDialogVariableLocString|<code>NumberEntry.SetDialogVariableLocString( cstring cstring_1, cstring cstring_2 )</code>|
SetDialogVariablePluralLocStringInt|<code>NumberEntry.SetDialogVariablePluralLocStringInt( cstring cstring_1, cstring cstring_2, int64 int64_3 )</code>|
ScrollToTop|<code>NumberEntry.ScrollToTop()</code>|
ScrollToBottom|<code>NumberEntry.ScrollToBottom()</code>|
ScrollToLeftEdge|<code>NumberEntry.ScrollToLeftEdge()</code>|
ScrollToRightEdge|<code>NumberEntry.ScrollToRightEdge()</code>|
ScrollParentToMakePanelFit|<code>NumberEntry.ScrollParentToMakePanelFit( unknown_variant_type unknown_variant_type_1, boolean boolean_2 )</code>|
ScrollToFitRegion|<code>NumberEntry.ScrollToFitRegion( float float_1, float float_2, float float_3, float float_4, unknown_variant_type unknown_variant_type_5, boolean boolean_6, boolean boolean_7 )</code>|
BCanSeeInParentScroll|<code>NumberEntry.BCanSeeInParentScroll()</code>|
GetAttributeInt|<code>NumberEntry.GetAttributeInt( cstring cstring_1, integer integer_2 )</code>|
GetAttributeString|<code>NumberEntry.GetAttributeString( cstring cstring_1, cstring cstring_2 )</code>|
GetAttributeUInt32|<code>NumberEntry.GetAttributeUInt32( cstring cstring_1, unsigned unsigned_2 )</code>|
SetAttributeInt|<code>NumberEntry.SetAttributeInt( cstring cstring_1, integer integer_2 )</code>|
SetAttributeString|<code>NumberEntry.SetAttributeString( cstring cstring_1, cstring cstring_2 )</code>|
SetAttributeUInt32|<code>NumberEntry.SetAttributeUInt32( cstring cstring_1, unsigned unsigned_2 )</code>|
SetInputNamespace|<code>NumberEntry.SetInputNamespace( cstring cstring_1 )</code>|
RegisterForReadyEvents|<code>NumberEntry.RegisterForReadyEvents( boolean boolean_1 )</code>|
BReadyForDisplay|<code>NumberEntry.BReadyForDisplay()</code>|
SetReadyForDisplay|<code>NumberEntry.SetReadyForDisplay( boolean boolean_1 )</code>|
SetPositionInPixels|<code>NumberEntry.SetPositionInPixels( float float_1, float float_2, float float_3 )</code>|
Data|<code>NumberEntry.Data( js_raw_args js_raw_args_1 )</code>|
debug.description|<code>NumberEntry.debug.description( js_raw_args js_raw_args_1 )</code>|
SetSendScrollPositionChangedEvents|<code>NumberEntry.SetSendScrollPositionChangedEvents( boolean boolean_1 )</code>|
value|<code>NumberEntry.value( integer integer_1 )</code>|
min|<code>NumberEntry.min( integer integer_1 )</code>|
max|<code>NumberEntry.max( integer integer_1 )</code>|
increment|<code>NumberEntry.increment( integer integer_1 )</code>|
SetPanelEvent|<code>NumberEntry.SetPanelEvent( js_raw_args js_raw_args_1 )</code>|
RunScriptInPanelContext|<code>NumberEntry.RunScriptInPanelContext( js_raw_args js_raw_args_1 )</code>|
rememberchildfocus|<code>NumberEntry.rememberchildfocus( boolean boolean_1 )</code>|
paneltype|<code>NumberEntry.paneltype()</code>|


# RadioButton
Function|Signature|Description
--|--|--
visible|<code>RadioButton.visible( boolean boolean_1 )</code>|
enabled|<code>RadioButton.enabled( boolean boolean_1 )</code>|
checked|<code>RadioButton.checked( boolean boolean_1 )</code>|
defaultfocus|<code>RadioButton.defaultfocus( cstring cstring_1 )</code>|
inputnamespace|<code>RadioButton.inputnamespace( cstring cstring_1 )</code>|
hittest|<code>RadioButton.hittest( boolean boolean_1 )</code>|
hittestchildren|<code>RadioButton.hittestchildren( boolean boolean_1 )</code>|
tabindex|<code>RadioButton.tabindex( float float_1 )</code>|
selectionpos_x|<code>RadioButton.selectionpos_x( float float_1 )</code>|
selectionpos_y|<code>RadioButton.selectionpos_y( float float_1 )</code>|
type|<code>RadioButton.type()</code>|
id|<code>RadioButton.id()</code>|
layoutfile|<code>RadioButton.layoutfile()</code>|
contentwidth|<code>RadioButton.contentwidth()</code>|
contentheight|<code>RadioButton.contentheight()</code>|
desiredlayoutwidth|<code>RadioButton.desiredlayoutwidth()</code>|
desiredlayoutheight|<code>RadioButton.desiredlayoutheight()</code>|
actuallayoutwidth|<code>RadioButton.actuallayoutwidth()</code>|
actuallayoutheight|<code>RadioButton.actuallayoutheight()</code>|
actualxoffset|<code>RadioButton.actualxoffset()</code>|
actualyoffset|<code>RadioButton.actualyoffset()</code>|
scrolloffset_y|<code>RadioButton.scrolloffset_y()</code>|
scrolloffset_x|<code>RadioButton.scrolloffset_x()</code>|
actualuiscale_y|<code>RadioButton.actualuiscale_y()</code>|
actualuiscale_x|<code>RadioButton.actualuiscale_x()</code>|
style|<code>RadioButton.style()</code>|
AddClass|<code>RadioButton.AddClass( cstring cstring_1 )</code>|
RemoveClass|<code>RadioButton.RemoveClass( cstring cstring_1 )</code>|
BHasClass|<code>RadioButton.BHasClass( cstring cstring_1 )</code>|
BAscendantHasClass|<code>RadioButton.BAscendantHasClass( cstring cstring_1 )</code>|
SetHasClass|<code>RadioButton.SetHasClass( cstring cstring_1, boolean boolean_2 )</code>|
ToggleClass|<code>RadioButton.ToggleClass( cstring cstring_1 )</code>|
SwitchClass|<code>RadioButton.SwitchClass( cstring cstring_1, cstring cstring_2 )</code>|
TriggerClass|<code>RadioButton.TriggerClass( cstring cstring_1 )</code>|
ClearPanelEvent|<code>RadioButton.ClearPanelEvent( cstring cstring_1 )</code>|
SetDraggable|<code>RadioButton.SetDraggable( boolean boolean_1 )</code>|
IsDraggable|<code>RadioButton.IsDraggable()</code>|
IsSizeValid|<code>RadioButton.IsSizeValid()</code>|
GetChildCount|<code>RadioButton.GetChildCount()</code>|
GetChild|<code>RadioButton.GetChild( integer integer_1 )</code>|
GetChildIndex|<code>RadioButton.GetChildIndex( unknown_variant_type unknown_variant_type_1 )</code>|
Children|<code>RadioButton.Children()</code>|
FindChildrenWithClassTraverse|<code>RadioButton.FindChildrenWithClassTraverse( cstring cstring_1 )</code>|
GetParent|<code>RadioButton.GetParent()</code>|
SetParent|<code>RadioButton.SetParent( unknown_variant_type unknown_variant_type_1 )</code>|
FindChild|<code>RadioButton.FindChild( cstring cstring_1 )</code>|
FindChildTraverse|<code>RadioButton.FindChildTraverse( cstring cstring_1 )</code>|
FindChildInLayoutFile|<code>RadioButton.FindChildInLayoutFile( cstring cstring_1 )</code>|
FindPanelInLayoutFile|<code>RadioButton.FindPanelInLayoutFile( cstring cstring_1 )</code>|
FindAncestor|<code>RadioButton.FindAncestor( cstring cstring_1 )</code>|
RemoveAndDeleteChildren|<code>RadioButton.RemoveAndDeleteChildren()</code>|
MoveChildBefore|<code>RadioButton.MoveChildBefore( unknown_variant_type unknown_variant_type_1, unknown_variant_type unknown_variant_type_2 )</code>|
MoveChildAfter|<code>RadioButton.MoveChildAfter( unknown_variant_type unknown_variant_type_1, unknown_variant_type unknown_variant_type_2 )</code>|
GetPositionWithinWindow|<code>RadioButton.GetPositionWithinWindow()</code>|
GetPositionWithinAncestor|<code>RadioButton.GetPositionWithinAncestor( unknown_variant_type unknown_variant_type_1 )</code>|
GetPosition|<code>RadioButton.GetPosition( boolean boolean_1 )</code>|
ApplyStyles|<code>RadioButton.ApplyStyles( boolean boolean_1 )</code>|
ClearPropertyFromCode|<code>RadioButton.ClearPropertyFromCode( unknown_variant_type unknown_variant_type_1 )</code>|
DeleteAsync|<code>RadioButton.DeleteAsync( float float_1 )</code>|
BIsTransparent|<code>RadioButton.BIsTransparent()</code>|
BAcceptsInput|<code>RadioButton.BAcceptsInput()</code>|
BAcceptsFocus|<code>RadioButton.BAcceptsFocus()</code>|
SetFocus|<code>RadioButton.SetFocus()</code>|
UpdateFocusInContext|<code>RadioButton.UpdateFocusInContext()</code>|
BHasHoverStyle|<code>RadioButton.BHasHoverStyle()</code>|
SetAcceptsInput|<code>RadioButton.SetAcceptsInput( boolean boolean_1 )</code>|
SetAcceptsFocus|<code>RadioButton.SetAcceptsFocus( boolean boolean_1 )</code>|
SetDisableFocusOnMouseDown|<code>RadioButton.SetDisableFocusOnMouseDown( boolean boolean_1 )</code>|
BHasKeyFocus|<code>RadioButton.BHasKeyFocus()</code>|
SetScrollParentToFitWhenFocused|<code>RadioButton.SetScrollParentToFitWhenFocused( boolean boolean_1 )</code>|
BScrollParentToFitWhenFocused|<code>RadioButton.BScrollParentToFitWhenFocused()</code>|
IsSelected|<code>RadioButton.IsSelected()</code>|
BHasDescendantKeyFocus|<code>RadioButton.BHasDescendantKeyFocus()</code>|
BLoadLayout|<code>RadioButton.BLoadLayout( cstring cstring_1, boolean boolean_2, boolean boolean_3 )</code>|
BLoadLayoutSnippet|<code>RadioButton.BLoadLayoutSnippet( cstring cstring_1 )</code>|
BHasLayoutSnippet|<code>RadioButton.BHasLayoutSnippet( cstring cstring_1 )</code>|
BGetSnippetNames|<code>RadioButton.BGetSnippetNames( unknown_variant_type unknown_variant_type_1 )</code>|
SetTopOfInputContext|<code>RadioButton.SetTopOfInputContext( boolean boolean_1 )</code>|
SetDialogVariable|<code>RadioButton.SetDialogVariable( cstring cstring_1, cstring cstring_2 )</code>|
SetDialogVariableInt|<code>RadioButton.SetDialogVariableInt( cstring cstring_1, integer integer_2 )</code>|
SetDialogVariableTime|<code>RadioButton.SetDialogVariableTime( cstring cstring_1, int64 int64_2 )</code>|
SetDialogVariableLocString|<code>RadioButton.SetDialogVariableLocString( cstring cstring_1, cstring cstring_2 )</code>|
SetDialogVariablePluralLocStringInt|<code>RadioButton.SetDialogVariablePluralLocStringInt( cstring cstring_1, cstring cstring_2, int64 int64_3 )</code>|
ScrollToTop|<code>RadioButton.ScrollToTop()</code>|
ScrollToBottom|<code>RadioButton.ScrollToBottom()</code>|
ScrollToLeftEdge|<code>RadioButton.ScrollToLeftEdge()</code>|
ScrollToRightEdge|<code>RadioButton.ScrollToRightEdge()</code>|
ScrollParentToMakePanelFit|<code>RadioButton.ScrollParentToMakePanelFit( unknown_variant_type unknown_variant_type_1, boolean boolean_2 )</code>|
ScrollToFitRegion|<code>RadioButton.ScrollToFitRegion( float float_1, float float_2, float float_3, float float_4, unknown_variant_type unknown_variant_type_5, boolean boolean_6, boolean boolean_7 )</code>|
BCanSeeInParentScroll|<code>RadioButton.BCanSeeInParentScroll()</code>|
GetAttributeInt|<code>RadioButton.GetAttributeInt( cstring cstring_1, integer integer_2 )</code>|
GetAttributeString|<code>RadioButton.GetAttributeString( cstring cstring_1, cstring cstring_2 )</code>|
GetAttributeUInt32|<code>RadioButton.GetAttributeUInt32( cstring cstring_1, unsigned unsigned_2 )</code>|
SetAttributeInt|<code>RadioButton.SetAttributeInt( cstring cstring_1, integer integer_2 )</code>|
SetAttributeString|<code>RadioButton.SetAttributeString( cstring cstring_1, cstring cstring_2 )</code>|
SetAttributeUInt32|<code>RadioButton.SetAttributeUInt32( cstring cstring_1, unsigned unsigned_2 )</code>|
SetInputNamespace|<code>RadioButton.SetInputNamespace( cstring cstring_1 )</code>|
RegisterForReadyEvents|<code>RadioButton.RegisterForReadyEvents( boolean boolean_1 )</code>|
BReadyForDisplay|<code>RadioButton.BReadyForDisplay()</code>|
SetReadyForDisplay|<code>RadioButton.SetReadyForDisplay( boolean boolean_1 )</code>|
SetPositionInPixels|<code>RadioButton.SetPositionInPixels( float float_1, float float_2, float float_3 )</code>|
Data|<code>RadioButton.Data( js_raw_args js_raw_args_1 )</code>|
debug.description|<code>RadioButton.debug.description( js_raw_args js_raw_args_1 )</code>|
SetSendScrollPositionChangedEvents|<code>RadioButton.SetSendScrollPositionChangedEvents( boolean boolean_1 )</code>|
GetSelectedButton|<code>RadioButton.GetSelectedButton()</code>|
group|<code>RadioButton.group( cstring cstring_1 )</code>|
SetPanelEvent|<code>RadioButton.SetPanelEvent( js_raw_args js_raw_args_1 )</code>|
RunScriptInPanelContext|<code>RadioButton.RunScriptInPanelContext( js_raw_args js_raw_args_1 )</code>|
rememberchildfocus|<code>RadioButton.rememberchildfocus( boolean boolean_1 )</code>|
paneltype|<code>RadioButton.paneltype()</code>|


# TooltipContents
Function|Signature|Description
--|--|--
visible|<code>TooltipContents.visible( boolean boolean_1 )</code>|
enabled|<code>TooltipContents.enabled( boolean boolean_1 )</code>|
checked|<code>TooltipContents.checked( boolean boolean_1 )</code>|
defaultfocus|<code>TooltipContents.defaultfocus( cstring cstring_1 )</code>|
inputnamespace|<code>TooltipContents.inputnamespace( cstring cstring_1 )</code>|
hittest|<code>TooltipContents.hittest( boolean boolean_1 )</code>|
hittestchildren|<code>TooltipContents.hittestchildren( boolean boolean_1 )</code>|
tabindex|<code>TooltipContents.tabindex( float float_1 )</code>|
selectionpos_x|<code>TooltipContents.selectionpos_x( float float_1 )</code>|
selectionpos_y|<code>TooltipContents.selectionpos_y( float float_1 )</code>|
type|<code>TooltipContents.type()</code>|
id|<code>TooltipContents.id()</code>|
layoutfile|<code>TooltipContents.layoutfile()</code>|
contentwidth|<code>TooltipContents.contentwidth()</code>|
contentheight|<code>TooltipContents.contentheight()</code>|
desiredlayoutwidth|<code>TooltipContents.desiredlayoutwidth()</code>|
desiredlayoutheight|<code>TooltipContents.desiredlayoutheight()</code>|
actuallayoutwidth|<code>TooltipContents.actuallayoutwidth()</code>|
actuallayoutheight|<code>TooltipContents.actuallayoutheight()</code>|
actualxoffset|<code>TooltipContents.actualxoffset()</code>|
actualyoffset|<code>TooltipContents.actualyoffset()</code>|
scrolloffset_y|<code>TooltipContents.scrolloffset_y()</code>|
scrolloffset_x|<code>TooltipContents.scrolloffset_x()</code>|
actualuiscale_y|<code>TooltipContents.actualuiscale_y()</code>|
actualuiscale_x|<code>TooltipContents.actualuiscale_x()</code>|
style|<code>TooltipContents.style()</code>|
AddClass|<code>TooltipContents.AddClass( cstring cstring_1 )</code>|
RemoveClass|<code>TooltipContents.RemoveClass( cstring cstring_1 )</code>|
BHasClass|<code>TooltipContents.BHasClass( cstring cstring_1 )</code>|
BAscendantHasClass|<code>TooltipContents.BAscendantHasClass( cstring cstring_1 )</code>|
SetHasClass|<code>TooltipContents.SetHasClass( cstring cstring_1, boolean boolean_2 )</code>|
ToggleClass|<code>TooltipContents.ToggleClass( cstring cstring_1 )</code>|
SwitchClass|<code>TooltipContents.SwitchClass( cstring cstring_1, cstring cstring_2 )</code>|
TriggerClass|<code>TooltipContents.TriggerClass( cstring cstring_1 )</code>|
ClearPanelEvent|<code>TooltipContents.ClearPanelEvent( cstring cstring_1 )</code>|
SetDraggable|<code>TooltipContents.SetDraggable( boolean boolean_1 )</code>|
IsDraggable|<code>TooltipContents.IsDraggable()</code>|
IsSizeValid|<code>TooltipContents.IsSizeValid()</code>|
GetChildCount|<code>TooltipContents.GetChildCount()</code>|
GetChild|<code>TooltipContents.GetChild( integer integer_1 )</code>|
GetChildIndex|<code>TooltipContents.GetChildIndex( unknown_variant_type unknown_variant_type_1 )</code>|
Children|<code>TooltipContents.Children()</code>|
FindChildrenWithClassTraverse|<code>TooltipContents.FindChildrenWithClassTraverse( cstring cstring_1 )</code>|
GetParent|<code>TooltipContents.GetParent()</code>|
SetParent|<code>TooltipContents.SetParent( unknown_variant_type unknown_variant_type_1 )</code>|
FindChild|<code>TooltipContents.FindChild( cstring cstring_1 )</code>|
FindChildTraverse|<code>TooltipContents.FindChildTraverse( cstring cstring_1 )</code>|
FindChildInLayoutFile|<code>TooltipContents.FindChildInLayoutFile( cstring cstring_1 )</code>|
FindPanelInLayoutFile|<code>TooltipContents.FindPanelInLayoutFile( cstring cstring_1 )</code>|
FindAncestor|<code>TooltipContents.FindAncestor( cstring cstring_1 )</code>|
RemoveAndDeleteChildren|<code>TooltipContents.RemoveAndDeleteChildren()</code>|
MoveChildBefore|<code>TooltipContents.MoveChildBefore( unknown_variant_type unknown_variant_type_1, unknown_variant_type unknown_variant_type_2 )</code>|
MoveChildAfter|<code>TooltipContents.MoveChildAfter( unknown_variant_type unknown_variant_type_1, unknown_variant_type unknown_variant_type_2 )</code>|
GetPositionWithinWindow|<code>TooltipContents.GetPositionWithinWindow()</code>|
GetPositionWithinAncestor|<code>TooltipContents.GetPositionWithinAncestor( unknown_variant_type unknown_variant_type_1 )</code>|
GetPosition|<code>TooltipContents.GetPosition( boolean boolean_1 )</code>|
ApplyStyles|<code>TooltipContents.ApplyStyles( boolean boolean_1 )</code>|
ClearPropertyFromCode|<code>TooltipContents.ClearPropertyFromCode( unknown_variant_type unknown_variant_type_1 )</code>|
DeleteAsync|<code>TooltipContents.DeleteAsync( float float_1 )</code>|
BIsTransparent|<code>TooltipContents.BIsTransparent()</code>|
BAcceptsInput|<code>TooltipContents.BAcceptsInput()</code>|
BAcceptsFocus|<code>TooltipContents.BAcceptsFocus()</code>|
SetFocus|<code>TooltipContents.SetFocus()</code>|
UpdateFocusInContext|<code>TooltipContents.UpdateFocusInContext()</code>|
BHasHoverStyle|<code>TooltipContents.BHasHoverStyle()</code>|
SetAcceptsInput|<code>TooltipContents.SetAcceptsInput( boolean boolean_1 )</code>|
SetAcceptsFocus|<code>TooltipContents.SetAcceptsFocus( boolean boolean_1 )</code>|
SetDisableFocusOnMouseDown|<code>TooltipContents.SetDisableFocusOnMouseDown( boolean boolean_1 )</code>|
BHasKeyFocus|<code>TooltipContents.BHasKeyFocus()</code>|
SetScrollParentToFitWhenFocused|<code>TooltipContents.SetScrollParentToFitWhenFocused( boolean boolean_1 )</code>|
BScrollParentToFitWhenFocused|<code>TooltipContents.BScrollParentToFitWhenFocused()</code>|
IsSelected|<code>TooltipContents.IsSelected()</code>|
BHasDescendantKeyFocus|<code>TooltipContents.BHasDescendantKeyFocus()</code>|
BLoadLayout|<code>TooltipContents.BLoadLayout( cstring cstring_1, boolean boolean_2, boolean boolean_3 )</code>|
BLoadLayoutSnippet|<code>TooltipContents.BLoadLayoutSnippet( cstring cstring_1 )</code>|
BHasLayoutSnippet|<code>TooltipContents.BHasLayoutSnippet( cstring cstring_1 )</code>|
BGetSnippetNames|<code>TooltipContents.BGetSnippetNames( unknown_variant_type unknown_variant_type_1 )</code>|
SetTopOfInputContext|<code>TooltipContents.SetTopOfInputContext( boolean boolean_1 )</code>|
SetDialogVariable|<code>TooltipContents.SetDialogVariable( cstring cstring_1, cstring cstring_2 )</code>|
SetDialogVariableInt|<code>TooltipContents.SetDialogVariableInt( cstring cstring_1, integer integer_2 )</code>|
SetDialogVariableTime|<code>TooltipContents.SetDialogVariableTime( cstring cstring_1, int64 int64_2 )</code>|
SetDialogVariableLocString|<code>TooltipContents.SetDialogVariableLocString( cstring cstring_1, cstring cstring_2 )</code>|
SetDialogVariablePluralLocStringInt|<code>TooltipContents.SetDialogVariablePluralLocStringInt( cstring cstring_1, cstring cstring_2, int64 int64_3 )</code>|
ScrollToTop|<code>TooltipContents.ScrollToTop()</code>|
ScrollToBottom|<code>TooltipContents.ScrollToBottom()</code>|
ScrollToLeftEdge|<code>TooltipContents.ScrollToLeftEdge()</code>|
ScrollToRightEdge|<code>TooltipContents.ScrollToRightEdge()</code>|
ScrollParentToMakePanelFit|<code>TooltipContents.ScrollParentToMakePanelFit( unknown_variant_type unknown_variant_type_1, boolean boolean_2 )</code>|
ScrollToFitRegion|<code>TooltipContents.ScrollToFitRegion( float float_1, float float_2, float float_3, float float_4, unknown_variant_type unknown_variant_type_5, boolean boolean_6, boolean boolean_7 )</code>|
BCanSeeInParentScroll|<code>TooltipContents.BCanSeeInParentScroll()</code>|
GetAttributeInt|<code>TooltipContents.GetAttributeInt( cstring cstring_1, integer integer_2 )</code>|
GetAttributeString|<code>TooltipContents.GetAttributeString( cstring cstring_1, cstring cstring_2 )</code>|
GetAttributeUInt32|<code>TooltipContents.GetAttributeUInt32( cstring cstring_1, unsigned unsigned_2 )</code>|
SetAttributeInt|<code>TooltipContents.SetAttributeInt( cstring cstring_1, integer integer_2 )</code>|
SetAttributeString|<code>TooltipContents.SetAttributeString( cstring cstring_1, cstring cstring_2 )</code>|
SetAttributeUInt32|<code>TooltipContents.SetAttributeUInt32( cstring cstring_1, unsigned unsigned_2 )</code>|
SetInputNamespace|<code>TooltipContents.SetInputNamespace( cstring cstring_1 )</code>|
RegisterForReadyEvents|<code>TooltipContents.RegisterForReadyEvents( boolean boolean_1 )</code>|
BReadyForDisplay|<code>TooltipContents.BReadyForDisplay()</code>|
SetReadyForDisplay|<code>TooltipContents.SetReadyForDisplay( boolean boolean_1 )</code>|
SetPositionInPixels|<code>TooltipContents.SetPositionInPixels( float float_1, float float_2, float float_3 )</code>|
Data|<code>TooltipContents.Data( js_raw_args js_raw_args_1 )</code>|
debug.description|<code>TooltipContents.debug.description( js_raw_args js_raw_args_1 )</code>|
SetSendScrollPositionChangedEvents|<code>TooltipContents.SetSendScrollPositionChangedEvents( boolean boolean_1 )</code>|
GetTooltipTarget|<code>TooltipContents.GetTooltipTarget()</code>|
SetPanelEvent|<code>TooltipContents.SetPanelEvent( js_raw_args js_raw_args_1 )</code>|
RunScriptInPanelContext|<code>TooltipContents.RunScriptInPanelContext( js_raw_args js_raw_args_1 )</code>|
rememberchildfocus|<code>TooltipContents.rememberchildfocus( boolean boolean_1 )</code>|
paneltype|<code>TooltipContents.paneltype()</code>|


# TooltipCustomLayout
Function|Signature|Description
--|--|--
visible|<code>TooltipCustomLayout.visible( boolean boolean_1 )</code>|
enabled|<code>TooltipCustomLayout.enabled( boolean boolean_1 )</code>|
checked|<code>TooltipCustomLayout.checked( boolean boolean_1 )</code>|
defaultfocus|<code>TooltipCustomLayout.defaultfocus( cstring cstring_1 )</code>|
inputnamespace|<code>TooltipCustomLayout.inputnamespace( cstring cstring_1 )</code>|
hittest|<code>TooltipCustomLayout.hittest( boolean boolean_1 )</code>|
hittestchildren|<code>TooltipCustomLayout.hittestchildren( boolean boolean_1 )</code>|
tabindex|<code>TooltipCustomLayout.tabindex( float float_1 )</code>|
selectionpos_x|<code>TooltipCustomLayout.selectionpos_x( float float_1 )</code>|
selectionpos_y|<code>TooltipCustomLayout.selectionpos_y( float float_1 )</code>|
type|<code>TooltipCustomLayout.type()</code>|
id|<code>TooltipCustomLayout.id()</code>|
layoutfile|<code>TooltipCustomLayout.layoutfile()</code>|
contentwidth|<code>TooltipCustomLayout.contentwidth()</code>|
contentheight|<code>TooltipCustomLayout.contentheight()</code>|
desiredlayoutwidth|<code>TooltipCustomLayout.desiredlayoutwidth()</code>|
desiredlayoutheight|<code>TooltipCustomLayout.desiredlayoutheight()</code>|
actuallayoutwidth|<code>TooltipCustomLayout.actuallayoutwidth()</code>|
actuallayoutheight|<code>TooltipCustomLayout.actuallayoutheight()</code>|
actualxoffset|<code>TooltipCustomLayout.actualxoffset()</code>|
actualyoffset|<code>TooltipCustomLayout.actualyoffset()</code>|
scrolloffset_y|<code>TooltipCustomLayout.scrolloffset_y()</code>|
scrolloffset_x|<code>TooltipCustomLayout.scrolloffset_x()</code>|
actualuiscale_y|<code>TooltipCustomLayout.actualuiscale_y()</code>|
actualuiscale_x|<code>TooltipCustomLayout.actualuiscale_x()</code>|
style|<code>TooltipCustomLayout.style()</code>|
AddClass|<code>TooltipCustomLayout.AddClass( cstring cstring_1 )</code>|
RemoveClass|<code>TooltipCustomLayout.RemoveClass( cstring cstring_1 )</code>|
BHasClass|<code>TooltipCustomLayout.BHasClass( cstring cstring_1 )</code>|
BAscendantHasClass|<code>TooltipCustomLayout.BAscendantHasClass( cstring cstring_1 )</code>|
SetHasClass|<code>TooltipCustomLayout.SetHasClass( cstring cstring_1, boolean boolean_2 )</code>|
ToggleClass|<code>TooltipCustomLayout.ToggleClass( cstring cstring_1 )</code>|
SwitchClass|<code>TooltipCustomLayout.SwitchClass( cstring cstring_1, cstring cstring_2 )</code>|
TriggerClass|<code>TooltipCustomLayout.TriggerClass( cstring cstring_1 )</code>|
ClearPanelEvent|<code>TooltipCustomLayout.ClearPanelEvent( cstring cstring_1 )</code>|
SetDraggable|<code>TooltipCustomLayout.SetDraggable( boolean boolean_1 )</code>|
IsDraggable|<code>TooltipCustomLayout.IsDraggable()</code>|
IsSizeValid|<code>TooltipCustomLayout.IsSizeValid()</code>|
GetChildCount|<code>TooltipCustomLayout.GetChildCount()</code>|
GetChild|<code>TooltipCustomLayout.GetChild( integer integer_1 )</code>|
GetChildIndex|<code>TooltipCustomLayout.GetChildIndex( unknown_variant_type unknown_variant_type_1 )</code>|
Children|<code>TooltipCustomLayout.Children()</code>|
FindChildrenWithClassTraverse|<code>TooltipCustomLayout.FindChildrenWithClassTraverse( cstring cstring_1 )</code>|
GetParent|<code>TooltipCustomLayout.GetParent()</code>|
SetParent|<code>TooltipCustomLayout.SetParent( unknown_variant_type unknown_variant_type_1 )</code>|
FindChild|<code>TooltipCustomLayout.FindChild( cstring cstring_1 )</code>|
FindChildTraverse|<code>TooltipCustomLayout.FindChildTraverse( cstring cstring_1 )</code>|
FindChildInLayoutFile|<code>TooltipCustomLayout.FindChildInLayoutFile( cstring cstring_1 )</code>|
FindPanelInLayoutFile|<code>TooltipCustomLayout.FindPanelInLayoutFile( cstring cstring_1 )</code>|
FindAncestor|<code>TooltipCustomLayout.FindAncestor( cstring cstring_1 )</code>|
RemoveAndDeleteChildren|<code>TooltipCustomLayout.RemoveAndDeleteChildren()</code>|
MoveChildBefore|<code>TooltipCustomLayout.MoveChildBefore( unknown_variant_type unknown_variant_type_1, unknown_variant_type unknown_variant_type_2 )</code>|
MoveChildAfter|<code>TooltipCustomLayout.MoveChildAfter( unknown_variant_type unknown_variant_type_1, unknown_variant_type unknown_variant_type_2 )</code>|
GetPositionWithinWindow|<code>TooltipCustomLayout.GetPositionWithinWindow()</code>|
GetPositionWithinAncestor|<code>TooltipCustomLayout.GetPositionWithinAncestor( unknown_variant_type unknown_variant_type_1 )</code>|
GetPosition|<code>TooltipCustomLayout.GetPosition( boolean boolean_1 )</code>|
ApplyStyles|<code>TooltipCustomLayout.ApplyStyles( boolean boolean_1 )</code>|
ClearPropertyFromCode|<code>TooltipCustomLayout.ClearPropertyFromCode( unknown_variant_type unknown_variant_type_1 )</code>|
DeleteAsync|<code>TooltipCustomLayout.DeleteAsync( float float_1 )</code>|
BIsTransparent|<code>TooltipCustomLayout.BIsTransparent()</code>|
BAcceptsInput|<code>TooltipCustomLayout.BAcceptsInput()</code>|
BAcceptsFocus|<code>TooltipCustomLayout.BAcceptsFocus()</code>|
SetFocus|<code>TooltipCustomLayout.SetFocus()</code>|
UpdateFocusInContext|<code>TooltipCustomLayout.UpdateFocusInContext()</code>|
BHasHoverStyle|<code>TooltipCustomLayout.BHasHoverStyle()</code>|
SetAcceptsInput|<code>TooltipCustomLayout.SetAcceptsInput( boolean boolean_1 )</code>|
SetAcceptsFocus|<code>TooltipCustomLayout.SetAcceptsFocus( boolean boolean_1 )</code>|
SetDisableFocusOnMouseDown|<code>TooltipCustomLayout.SetDisableFocusOnMouseDown( boolean boolean_1 )</code>|
BHasKeyFocus|<code>TooltipCustomLayout.BHasKeyFocus()</code>|
SetScrollParentToFitWhenFocused|<code>TooltipCustomLayout.SetScrollParentToFitWhenFocused( boolean boolean_1 )</code>|
BScrollParentToFitWhenFocused|<code>TooltipCustomLayout.BScrollParentToFitWhenFocused()</code>|
IsSelected|<code>TooltipCustomLayout.IsSelected()</code>|
BHasDescendantKeyFocus|<code>TooltipCustomLayout.BHasDescendantKeyFocus()</code>|
BLoadLayout|<code>TooltipCustomLayout.BLoadLayout( cstring cstring_1, boolean boolean_2, boolean boolean_3 )</code>|
BLoadLayoutSnippet|<code>TooltipCustomLayout.BLoadLayoutSnippet( cstring cstring_1 )</code>|
BHasLayoutSnippet|<code>TooltipCustomLayout.BHasLayoutSnippet( cstring cstring_1 )</code>|
BGetSnippetNames|<code>TooltipCustomLayout.BGetSnippetNames( unknown_variant_type unknown_variant_type_1 )</code>|
SetTopOfInputContext|<code>TooltipCustomLayout.SetTopOfInputContext( boolean boolean_1 )</code>|
SetDialogVariable|<code>TooltipCustomLayout.SetDialogVariable( cstring cstring_1, cstring cstring_2 )</code>|
SetDialogVariableInt|<code>TooltipCustomLayout.SetDialogVariableInt( cstring cstring_1, integer integer_2 )</code>|
SetDialogVariableTime|<code>TooltipCustomLayout.SetDialogVariableTime( cstring cstring_1, int64 int64_2 )</code>|
SetDialogVariableLocString|<code>TooltipCustomLayout.SetDialogVariableLocString( cstring cstring_1, cstring cstring_2 )</code>|
SetDialogVariablePluralLocStringInt|<code>TooltipCustomLayout.SetDialogVariablePluralLocStringInt( cstring cstring_1, cstring cstring_2, int64 int64_3 )</code>|
ScrollToTop|<code>TooltipCustomLayout.ScrollToTop()</code>|
ScrollToBottom|<code>TooltipCustomLayout.ScrollToBottom()</code>|
ScrollToLeftEdge|<code>TooltipCustomLayout.ScrollToLeftEdge()</code>|
ScrollToRightEdge|<code>TooltipCustomLayout.ScrollToRightEdge()</code>|
ScrollParentToMakePanelFit|<code>TooltipCustomLayout.ScrollParentToMakePanelFit( unknown_variant_type unknown_variant_type_1, boolean boolean_2 )</code>|
ScrollToFitRegion|<code>TooltipCustomLayout.ScrollToFitRegion( float float_1, float float_2, float float_3, float float_4, unknown_variant_type unknown_variant_type_5, boolean boolean_6, boolean boolean_7 )</code>|
BCanSeeInParentScroll|<code>TooltipCustomLayout.BCanSeeInParentScroll()</code>|
GetAttributeInt|<code>TooltipCustomLayout.GetAttributeInt( cstring cstring_1, integer integer_2 )</code>|
GetAttributeString|<code>TooltipCustomLayout.GetAttributeString( cstring cstring_1, cstring cstring_2 )</code>|
GetAttributeUInt32|<code>TooltipCustomLayout.GetAttributeUInt32( cstring cstring_1, unsigned unsigned_2 )</code>|
SetAttributeInt|<code>TooltipCustomLayout.SetAttributeInt( cstring cstring_1, integer integer_2 )</code>|
SetAttributeString|<code>TooltipCustomLayout.SetAttributeString( cstring cstring_1, cstring cstring_2 )</code>|
SetAttributeUInt32|<code>TooltipCustomLayout.SetAttributeUInt32( cstring cstring_1, unsigned unsigned_2 )</code>|
SetInputNamespace|<code>TooltipCustomLayout.SetInputNamespace( cstring cstring_1 )</code>|
RegisterForReadyEvents|<code>TooltipCustomLayout.RegisterForReadyEvents( boolean boolean_1 )</code>|
BReadyForDisplay|<code>TooltipCustomLayout.BReadyForDisplay()</code>|
SetReadyForDisplay|<code>TooltipCustomLayout.SetReadyForDisplay( boolean boolean_1 )</code>|
SetPositionInPixels|<code>TooltipCustomLayout.SetPositionInPixels( float float_1, float float_2, float float_3 )</code>|
Data|<code>TooltipCustomLayout.Data( js_raw_args js_raw_args_1 )</code>|
debug.description|<code>TooltipCustomLayout.debug.description( js_raw_args js_raw_args_1 )</code>|
SetSendScrollPositionChangedEvents|<code>TooltipCustomLayout.SetSendScrollPositionChangedEvents( boolean boolean_1 )</code>|
GetTooltipTarget|<code>TooltipCustomLayout.GetTooltipTarget()</code>|
SetPanelEvent|<code>TooltipCustomLayout.SetPanelEvent( js_raw_args js_raw_args_1 )</code>|
RunScriptInPanelContext|<code>TooltipCustomLayout.RunScriptInPanelContext( js_raw_args js_raw_args_1 )</code>|
rememberchildfocus|<code>TooltipCustomLayout.rememberchildfocus( boolean boolean_1 )</code>|
paneltype|<code>TooltipCustomLayout.paneltype()</code>|


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
GetPosition|<code>ProgressBar.GetPosition( boolean boolean_1 )</code>|
ApplyStyles|<code>ProgressBar.ApplyStyles( boolean boolean_1 )</code>|
ClearPropertyFromCode|<code>ProgressBar.ClearPropertyFromCode( unknown_variant_type unknown_variant_type_1 )</code>|
DeleteAsync|<code>ProgressBar.DeleteAsync( float float_1 )</code>|
BIsTransparent|<code>ProgressBar.BIsTransparent()</code>|
BAcceptsInput|<code>ProgressBar.BAcceptsInput()</code>|
BAcceptsFocus|<code>ProgressBar.BAcceptsFocus()</code>|
SetFocus|<code>ProgressBar.SetFocus()</code>|
UpdateFocusInContext|<code>ProgressBar.UpdateFocusInContext()</code>|
BHasHoverStyle|<code>ProgressBar.BHasHoverStyle()</code>|
SetAcceptsInput|<code>ProgressBar.SetAcceptsInput( boolean boolean_1 )</code>|
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
BGetSnippetNames|<code>ProgressBar.BGetSnippetNames( unknown_variant_type unknown_variant_type_1 )</code>|
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
debug.description|<code>ProgressBar.debug.description( js_raw_args js_raw_args_1 )</code>|
SetSendScrollPositionChangedEvents|<code>ProgressBar.SetSendScrollPositionChangedEvents( boolean boolean_1 )</code>|
value|<code>ProgressBar.value( float float_1 )</code>|
min|<code>ProgressBar.min( float float_1 )</code>|
max|<code>ProgressBar.max( float float_1 )</code>|
hasNotches|<code>ProgressBar.hasNotches( boolean boolean_1 )</code>|
valuePerNotch|<code>ProgressBar.valuePerNotch( float float_1 )</code>|
SetPanelEvent|<code>ProgressBar.SetPanelEvent( js_raw_args js_raw_args_1 )</code>|
RunScriptInPanelContext|<code>ProgressBar.RunScriptInPanelContext( js_raw_args js_raw_args_1 )</code>|
rememberchildfocus|<code>ProgressBar.rememberchildfocus( boolean boolean_1 )</code>|
paneltype|<code>ProgressBar.paneltype()</code>|


# Carousel
Function|Signature|Description
--|--|--
visible|<code>Carousel.visible( boolean boolean_1 )</code>|
enabled|<code>Carousel.enabled( boolean boolean_1 )</code>|
checked|<code>Carousel.checked( boolean boolean_1 )</code>|
defaultfocus|<code>Carousel.defaultfocus( cstring cstring_1 )</code>|
inputnamespace|<code>Carousel.inputnamespace( cstring cstring_1 )</code>|
hittest|<code>Carousel.hittest( boolean boolean_1 )</code>|
hittestchildren|<code>Carousel.hittestchildren( boolean boolean_1 )</code>|
tabindex|<code>Carousel.tabindex( float float_1 )</code>|
selectionpos_x|<code>Carousel.selectionpos_x( float float_1 )</code>|
selectionpos_y|<code>Carousel.selectionpos_y( float float_1 )</code>|
type|<code>Carousel.type()</code>|
id|<code>Carousel.id()</code>|
layoutfile|<code>Carousel.layoutfile()</code>|
contentwidth|<code>Carousel.contentwidth()</code>|
contentheight|<code>Carousel.contentheight()</code>|
desiredlayoutwidth|<code>Carousel.desiredlayoutwidth()</code>|
desiredlayoutheight|<code>Carousel.desiredlayoutheight()</code>|
actuallayoutwidth|<code>Carousel.actuallayoutwidth()</code>|
actuallayoutheight|<code>Carousel.actuallayoutheight()</code>|
actualxoffset|<code>Carousel.actualxoffset()</code>|
actualyoffset|<code>Carousel.actualyoffset()</code>|
scrolloffset_y|<code>Carousel.scrolloffset_y()</code>|
scrolloffset_x|<code>Carousel.scrolloffset_x()</code>|
actualuiscale_y|<code>Carousel.actualuiscale_y()</code>|
actualuiscale_x|<code>Carousel.actualuiscale_x()</code>|
style|<code>Carousel.style()</code>|
AddClass|<code>Carousel.AddClass( cstring cstring_1 )</code>|
RemoveClass|<code>Carousel.RemoveClass( cstring cstring_1 )</code>|
BHasClass|<code>Carousel.BHasClass( cstring cstring_1 )</code>|
BAscendantHasClass|<code>Carousel.BAscendantHasClass( cstring cstring_1 )</code>|
SetHasClass|<code>Carousel.SetHasClass( cstring cstring_1, boolean boolean_2 )</code>|
ToggleClass|<code>Carousel.ToggleClass( cstring cstring_1 )</code>|
SwitchClass|<code>Carousel.SwitchClass( cstring cstring_1, cstring cstring_2 )</code>|
TriggerClass|<code>Carousel.TriggerClass( cstring cstring_1 )</code>|
ClearPanelEvent|<code>Carousel.ClearPanelEvent( cstring cstring_1 )</code>|
SetDraggable|<code>Carousel.SetDraggable( boolean boolean_1 )</code>|
IsDraggable|<code>Carousel.IsDraggable()</code>|
IsSizeValid|<code>Carousel.IsSizeValid()</code>|
GetChildCount|<code>Carousel.GetChildCount()</code>|
GetChild|<code>Carousel.GetChild( integer integer_1 )</code>|
GetChildIndex|<code>Carousel.GetChildIndex( unknown_variant_type unknown_variant_type_1 )</code>|
Children|<code>Carousel.Children()</code>|
FindChildrenWithClassTraverse|<code>Carousel.FindChildrenWithClassTraverse( cstring cstring_1 )</code>|
GetParent|<code>Carousel.GetParent()</code>|
SetParent|<code>Carousel.SetParent( unknown_variant_type unknown_variant_type_1 )</code>|
FindChild|<code>Carousel.FindChild( cstring cstring_1 )</code>|
FindChildTraverse|<code>Carousel.FindChildTraverse( cstring cstring_1 )</code>|
FindChildInLayoutFile|<code>Carousel.FindChildInLayoutFile( cstring cstring_1 )</code>|
FindPanelInLayoutFile|<code>Carousel.FindPanelInLayoutFile( cstring cstring_1 )</code>|
FindAncestor|<code>Carousel.FindAncestor( cstring cstring_1 )</code>|
RemoveAndDeleteChildren|<code>Carousel.RemoveAndDeleteChildren()</code>|
MoveChildBefore|<code>Carousel.MoveChildBefore( unknown_variant_type unknown_variant_type_1, unknown_variant_type unknown_variant_type_2 )</code>|
MoveChildAfter|<code>Carousel.MoveChildAfter( unknown_variant_type unknown_variant_type_1, unknown_variant_type unknown_variant_type_2 )</code>|
GetPositionWithinWindow|<code>Carousel.GetPositionWithinWindow()</code>|
GetPositionWithinAncestor|<code>Carousel.GetPositionWithinAncestor( unknown_variant_type unknown_variant_type_1 )</code>|
GetPosition|<code>Carousel.GetPosition( boolean boolean_1 )</code>|
ApplyStyles|<code>Carousel.ApplyStyles( boolean boolean_1 )</code>|
ClearPropertyFromCode|<code>Carousel.ClearPropertyFromCode( unknown_variant_type unknown_variant_type_1 )</code>|
DeleteAsync|<code>Carousel.DeleteAsync( float float_1 )</code>|
BIsTransparent|<code>Carousel.BIsTransparent()</code>|
BAcceptsInput|<code>Carousel.BAcceptsInput()</code>|
BAcceptsFocus|<code>Carousel.BAcceptsFocus()</code>|
SetFocus|<code>Carousel.SetFocus()</code>|
UpdateFocusInContext|<code>Carousel.UpdateFocusInContext()</code>|
BHasHoverStyle|<code>Carousel.BHasHoverStyle()</code>|
SetAcceptsInput|<code>Carousel.SetAcceptsInput( boolean boolean_1 )</code>|
SetAcceptsFocus|<code>Carousel.SetAcceptsFocus( boolean boolean_1 )</code>|
SetDisableFocusOnMouseDown|<code>Carousel.SetDisableFocusOnMouseDown( boolean boolean_1 )</code>|
BHasKeyFocus|<code>Carousel.BHasKeyFocus()</code>|
SetScrollParentToFitWhenFocused|<code>Carousel.SetScrollParentToFitWhenFocused( boolean boolean_1 )</code>|
BScrollParentToFitWhenFocused|<code>Carousel.BScrollParentToFitWhenFocused()</code>|
IsSelected|<code>Carousel.IsSelected()</code>|
BHasDescendantKeyFocus|<code>Carousel.BHasDescendantKeyFocus()</code>|
BLoadLayout|<code>Carousel.BLoadLayout( cstring cstring_1, boolean boolean_2, boolean boolean_3 )</code>|
BLoadLayoutSnippet|<code>Carousel.BLoadLayoutSnippet( cstring cstring_1 )</code>|
BHasLayoutSnippet|<code>Carousel.BHasLayoutSnippet( cstring cstring_1 )</code>|
BGetSnippetNames|<code>Carousel.BGetSnippetNames( unknown_variant_type unknown_variant_type_1 )</code>|
SetTopOfInputContext|<code>Carousel.SetTopOfInputContext( boolean boolean_1 )</code>|
SetDialogVariable|<code>Carousel.SetDialogVariable( cstring cstring_1, cstring cstring_2 )</code>|
SetDialogVariableInt|<code>Carousel.SetDialogVariableInt( cstring cstring_1, integer integer_2 )</code>|
SetDialogVariableTime|<code>Carousel.SetDialogVariableTime( cstring cstring_1, int64 int64_2 )</code>|
SetDialogVariableLocString|<code>Carousel.SetDialogVariableLocString( cstring cstring_1, cstring cstring_2 )</code>|
SetDialogVariablePluralLocStringInt|<code>Carousel.SetDialogVariablePluralLocStringInt( cstring cstring_1, cstring cstring_2, int64 int64_3 )</code>|
ScrollToTop|<code>Carousel.ScrollToTop()</code>|
ScrollToBottom|<code>Carousel.ScrollToBottom()</code>|
ScrollToLeftEdge|<code>Carousel.ScrollToLeftEdge()</code>|
ScrollToRightEdge|<code>Carousel.ScrollToRightEdge()</code>|
ScrollParentToMakePanelFit|<code>Carousel.ScrollParentToMakePanelFit( unknown_variant_type unknown_variant_type_1, boolean boolean_2 )</code>|
ScrollToFitRegion|<code>Carousel.ScrollToFitRegion( float float_1, float float_2, float float_3, float float_4, unknown_variant_type unknown_variant_type_5, boolean boolean_6, boolean boolean_7 )</code>|
BCanSeeInParentScroll|<code>Carousel.BCanSeeInParentScroll()</code>|
GetAttributeInt|<code>Carousel.GetAttributeInt( cstring cstring_1, integer integer_2 )</code>|
GetAttributeString|<code>Carousel.GetAttributeString( cstring cstring_1, cstring cstring_2 )</code>|
GetAttributeUInt32|<code>Carousel.GetAttributeUInt32( cstring cstring_1, unsigned unsigned_2 )</code>|
SetAttributeInt|<code>Carousel.SetAttributeInt( cstring cstring_1, integer integer_2 )</code>|
SetAttributeString|<code>Carousel.SetAttributeString( cstring cstring_1, cstring cstring_2 )</code>|
SetAttributeUInt32|<code>Carousel.SetAttributeUInt32( cstring cstring_1, unsigned unsigned_2 )</code>|
SetInputNamespace|<code>Carousel.SetInputNamespace( cstring cstring_1 )</code>|
RegisterForReadyEvents|<code>Carousel.RegisterForReadyEvents( boolean boolean_1 )</code>|
BReadyForDisplay|<code>Carousel.BReadyForDisplay()</code>|
SetReadyForDisplay|<code>Carousel.SetReadyForDisplay( boolean boolean_1 )</code>|
SetPositionInPixels|<code>Carousel.SetPositionInPixels( float float_1, float float_2, float float_3 )</code>|
Data|<code>Carousel.Data( js_raw_args js_raw_args_1 )</code>|
debug.description|<code>Carousel.debug.description( js_raw_args js_raw_args_1 )</code>|
SetSendScrollPositionChangedEvents|<code>Carousel.SetSendScrollPositionChangedEvents( boolean boolean_1 )</code>|
SetSelectedChild|<code>Carousel.SetSelectedChild( unknown_variant_type unknown_variant_type_1 )</code>|
GetFocusChild|<code>Carousel.GetFocusChild()</code>|
GetFocusIndex|<code>Carousel.GetFocusIndex()</code>|
SetAutoScrollEnabled|<code>Carousel.SetAutoScrollEnabled( boolean boolean_1 )</code>|
SetPanelEvent|<code>Carousel.SetPanelEvent( js_raw_args js_raw_args_1 )</code>|
RunScriptInPanelContext|<code>Carousel.RunScriptInPanelContext( js_raw_args js_raw_args_1 )</code>|
rememberchildfocus|<code>Carousel.rememberchildfocus( boolean boolean_1 )</code>|
paneltype|<code>Carousel.paneltype()</code>|


# DOTAUIEconSetPreview
Function|Signature|Description
--|--|--
visible|<code>DOTAUIEconSetPreview.visible( boolean boolean_1 )</code>|
enabled|<code>DOTAUIEconSetPreview.enabled( boolean boolean_1 )</code>|
checked|<code>DOTAUIEconSetPreview.checked( boolean boolean_1 )</code>|
defaultfocus|<code>DOTAUIEconSetPreview.defaultfocus( cstring cstring_1 )</code>|
inputnamespace|<code>DOTAUIEconSetPreview.inputnamespace( cstring cstring_1 )</code>|
hittest|<code>DOTAUIEconSetPreview.hittest( boolean boolean_1 )</code>|
hittestchildren|<code>DOTAUIEconSetPreview.hittestchildren( boolean boolean_1 )</code>|
tabindex|<code>DOTAUIEconSetPreview.tabindex( float float_1 )</code>|
selectionpos_x|<code>DOTAUIEconSetPreview.selectionpos_x( float float_1 )</code>|
selectionpos_y|<code>DOTAUIEconSetPreview.selectionpos_y( float float_1 )</code>|
type|<code>DOTAUIEconSetPreview.type()</code>|
id|<code>DOTAUIEconSetPreview.id()</code>|
layoutfile|<code>DOTAUIEconSetPreview.layoutfile()</code>|
contentwidth|<code>DOTAUIEconSetPreview.contentwidth()</code>|
contentheight|<code>DOTAUIEconSetPreview.contentheight()</code>|
desiredlayoutwidth|<code>DOTAUIEconSetPreview.desiredlayoutwidth()</code>|
desiredlayoutheight|<code>DOTAUIEconSetPreview.desiredlayoutheight()</code>|
actuallayoutwidth|<code>DOTAUIEconSetPreview.actuallayoutwidth()</code>|
actuallayoutheight|<code>DOTAUIEconSetPreview.actuallayoutheight()</code>|
actualxoffset|<code>DOTAUIEconSetPreview.actualxoffset()</code>|
actualyoffset|<code>DOTAUIEconSetPreview.actualyoffset()</code>|
scrolloffset_y|<code>DOTAUIEconSetPreview.scrolloffset_y()</code>|
scrolloffset_x|<code>DOTAUIEconSetPreview.scrolloffset_x()</code>|
actualuiscale_y|<code>DOTAUIEconSetPreview.actualuiscale_y()</code>|
actualuiscale_x|<code>DOTAUIEconSetPreview.actualuiscale_x()</code>|
style|<code>DOTAUIEconSetPreview.style()</code>|
AddClass|<code>DOTAUIEconSetPreview.AddClass( cstring cstring_1 )</code>|
RemoveClass|<code>DOTAUIEconSetPreview.RemoveClass( cstring cstring_1 )</code>|
BHasClass|<code>DOTAUIEconSetPreview.BHasClass( cstring cstring_1 )</code>|
BAscendantHasClass|<code>DOTAUIEconSetPreview.BAscendantHasClass( cstring cstring_1 )</code>|
SetHasClass|<code>DOTAUIEconSetPreview.SetHasClass( cstring cstring_1, boolean boolean_2 )</code>|
ToggleClass|<code>DOTAUIEconSetPreview.ToggleClass( cstring cstring_1 )</code>|
SwitchClass|<code>DOTAUIEconSetPreview.SwitchClass( cstring cstring_1, cstring cstring_2 )</code>|
TriggerClass|<code>DOTAUIEconSetPreview.TriggerClass( cstring cstring_1 )</code>|
ClearPanelEvent|<code>DOTAUIEconSetPreview.ClearPanelEvent( cstring cstring_1 )</code>|
SetDraggable|<code>DOTAUIEconSetPreview.SetDraggable( boolean boolean_1 )</code>|
IsDraggable|<code>DOTAUIEconSetPreview.IsDraggable()</code>|
IsSizeValid|<code>DOTAUIEconSetPreview.IsSizeValid()</code>|
GetChildCount|<code>DOTAUIEconSetPreview.GetChildCount()</code>|
GetChild|<code>DOTAUIEconSetPreview.GetChild( integer integer_1 )</code>|
GetChildIndex|<code>DOTAUIEconSetPreview.GetChildIndex( unknown_variant_type unknown_variant_type_1 )</code>|
Children|<code>DOTAUIEconSetPreview.Children()</code>|
FindChildrenWithClassTraverse|<code>DOTAUIEconSetPreview.FindChildrenWithClassTraverse( cstring cstring_1 )</code>|
GetParent|<code>DOTAUIEconSetPreview.GetParent()</code>|
SetParent|<code>DOTAUIEconSetPreview.SetParent( unknown_variant_type unknown_variant_type_1 )</code>|
FindChild|<code>DOTAUIEconSetPreview.FindChild( cstring cstring_1 )</code>|
FindChildTraverse|<code>DOTAUIEconSetPreview.FindChildTraverse( cstring cstring_1 )</code>|
FindChildInLayoutFile|<code>DOTAUIEconSetPreview.FindChildInLayoutFile( cstring cstring_1 )</code>|
FindPanelInLayoutFile|<code>DOTAUIEconSetPreview.FindPanelInLayoutFile( cstring cstring_1 )</code>|
FindAncestor|<code>DOTAUIEconSetPreview.FindAncestor( cstring cstring_1 )</code>|
RemoveAndDeleteChildren|<code>DOTAUIEconSetPreview.RemoveAndDeleteChildren()</code>|
MoveChildBefore|<code>DOTAUIEconSetPreview.MoveChildBefore( unknown_variant_type unknown_variant_type_1, unknown_variant_type unknown_variant_type_2 )</code>|
MoveChildAfter|<code>DOTAUIEconSetPreview.MoveChildAfter( unknown_variant_type unknown_variant_type_1, unknown_variant_type unknown_variant_type_2 )</code>|
GetPositionWithinWindow|<code>DOTAUIEconSetPreview.GetPositionWithinWindow()</code>|
GetPositionWithinAncestor|<code>DOTAUIEconSetPreview.GetPositionWithinAncestor( unknown_variant_type unknown_variant_type_1 )</code>|
GetPosition|<code>DOTAUIEconSetPreview.GetPosition( boolean boolean_1 )</code>|
ApplyStyles|<code>DOTAUIEconSetPreview.ApplyStyles( boolean boolean_1 )</code>|
ClearPropertyFromCode|<code>DOTAUIEconSetPreview.ClearPropertyFromCode( unknown_variant_type unknown_variant_type_1 )</code>|
DeleteAsync|<code>DOTAUIEconSetPreview.DeleteAsync( float float_1 )</code>|
BIsTransparent|<code>DOTAUIEconSetPreview.BIsTransparent()</code>|
BAcceptsInput|<code>DOTAUIEconSetPreview.BAcceptsInput()</code>|
BAcceptsFocus|<code>DOTAUIEconSetPreview.BAcceptsFocus()</code>|
SetFocus|<code>DOTAUIEconSetPreview.SetFocus()</code>|
UpdateFocusInContext|<code>DOTAUIEconSetPreview.UpdateFocusInContext()</code>|
BHasHoverStyle|<code>DOTAUIEconSetPreview.BHasHoverStyle()</code>|
SetAcceptsInput|<code>DOTAUIEconSetPreview.SetAcceptsInput( boolean boolean_1 )</code>|
SetAcceptsFocus|<code>DOTAUIEconSetPreview.SetAcceptsFocus( boolean boolean_1 )</code>|
SetDisableFocusOnMouseDown|<code>DOTAUIEconSetPreview.SetDisableFocusOnMouseDown( boolean boolean_1 )</code>|
BHasKeyFocus|<code>DOTAUIEconSetPreview.BHasKeyFocus()</code>|
SetScrollParentToFitWhenFocused|<code>DOTAUIEconSetPreview.SetScrollParentToFitWhenFocused( boolean boolean_1 )</code>|
BScrollParentToFitWhenFocused|<code>DOTAUIEconSetPreview.BScrollParentToFitWhenFocused()</code>|
IsSelected|<code>DOTAUIEconSetPreview.IsSelected()</code>|
BHasDescendantKeyFocus|<code>DOTAUIEconSetPreview.BHasDescendantKeyFocus()</code>|
BLoadLayout|<code>DOTAUIEconSetPreview.BLoadLayout( cstring cstring_1, boolean boolean_2, boolean boolean_3 )</code>|
BLoadLayoutSnippet|<code>DOTAUIEconSetPreview.BLoadLayoutSnippet( cstring cstring_1 )</code>|
BHasLayoutSnippet|<code>DOTAUIEconSetPreview.BHasLayoutSnippet( cstring cstring_1 )</code>|
BGetSnippetNames|<code>DOTAUIEconSetPreview.BGetSnippetNames( unknown_variant_type unknown_variant_type_1 )</code>|
SetTopOfInputContext|<code>DOTAUIEconSetPreview.SetTopOfInputContext( boolean boolean_1 )</code>|
SetDialogVariable|<code>DOTAUIEconSetPreview.SetDialogVariable( cstring cstring_1, cstring cstring_2 )</code>|
SetDialogVariableInt|<code>DOTAUIEconSetPreview.SetDialogVariableInt( cstring cstring_1, integer integer_2 )</code>|
SetDialogVariableTime|<code>DOTAUIEconSetPreview.SetDialogVariableTime( cstring cstring_1, int64 int64_2 )</code>|
SetDialogVariableLocString|<code>DOTAUIEconSetPreview.SetDialogVariableLocString( cstring cstring_1, cstring cstring_2 )</code>|
SetDialogVariablePluralLocStringInt|<code>DOTAUIEconSetPreview.SetDialogVariablePluralLocStringInt( cstring cstring_1, cstring cstring_2, int64 int64_3 )</code>|
ScrollToTop|<code>DOTAUIEconSetPreview.ScrollToTop()</code>|
ScrollToBottom|<code>DOTAUIEconSetPreview.ScrollToBottom()</code>|
ScrollToLeftEdge|<code>DOTAUIEconSetPreview.ScrollToLeftEdge()</code>|
ScrollToRightEdge|<code>DOTAUIEconSetPreview.ScrollToRightEdge()</code>|
ScrollParentToMakePanelFit|<code>DOTAUIEconSetPreview.ScrollParentToMakePanelFit( unknown_variant_type unknown_variant_type_1, boolean boolean_2 )</code>|
ScrollToFitRegion|<code>DOTAUIEconSetPreview.ScrollToFitRegion( float float_1, float float_2, float float_3, float float_4, unknown_variant_type unknown_variant_type_5, boolean boolean_6, boolean boolean_7 )</code>|
BCanSeeInParentScroll|<code>DOTAUIEconSetPreview.BCanSeeInParentScroll()</code>|
GetAttributeInt|<code>DOTAUIEconSetPreview.GetAttributeInt( cstring cstring_1, integer integer_2 )</code>|
GetAttributeString|<code>DOTAUIEconSetPreview.GetAttributeString( cstring cstring_1, cstring cstring_2 )</code>|
GetAttributeUInt32|<code>DOTAUIEconSetPreview.GetAttributeUInt32( cstring cstring_1, unsigned unsigned_2 )</code>|
SetAttributeInt|<code>DOTAUIEconSetPreview.SetAttributeInt( cstring cstring_1, integer integer_2 )</code>|
SetAttributeString|<code>DOTAUIEconSetPreview.SetAttributeString( cstring cstring_1, cstring cstring_2 )</code>|
SetAttributeUInt32|<code>DOTAUIEconSetPreview.SetAttributeUInt32( cstring cstring_1, unsigned unsigned_2 )</code>|
SetInputNamespace|<code>DOTAUIEconSetPreview.SetInputNamespace( cstring cstring_1 )</code>|
RegisterForReadyEvents|<code>DOTAUIEconSetPreview.RegisterForReadyEvents( boolean boolean_1 )</code>|
BReadyForDisplay|<code>DOTAUIEconSetPreview.BReadyForDisplay()</code>|
SetReadyForDisplay|<code>DOTAUIEconSetPreview.SetReadyForDisplay( boolean boolean_1 )</code>|
SetPositionInPixels|<code>DOTAUIEconSetPreview.SetPositionInPixels( float float_1, float float_2, float float_3 )</code>|
Data|<code>DOTAUIEconSetPreview.Data( js_raw_args js_raw_args_1 )</code>|
debug.description|<code>DOTAUIEconSetPreview.debug.description( js_raw_args js_raw_args_1 )</code>|
SetSendScrollPositionChangedEvents|<code>DOTAUIEconSetPreview.SetSendScrollPositionChangedEvents( boolean boolean_1 )</code>|
SetSticker|<code>DOTAUIEconSetPreview.SetSticker( unsigned unsigned_1, unsigned unsigned_2 )</code>|
SetPanelEvent|<code>DOTAUIEconSetPreview.SetPanelEvent( js_raw_args js_raw_args_1 )</code>|
RunScriptInPanelContext|<code>DOTAUIEconSetPreview.RunScriptInPanelContext( js_raw_args js_raw_args_1 )</code>|
rememberchildfocus|<code>DOTAUIEconSetPreview.rememberchildfocus( boolean boolean_1 )</code>|
paneltype|<code>DOTAUIEconSetPreview.paneltype()</code>|


# EconItemImage
Function|Signature|Description
--|--|--
visible|<code>EconItemImage.visible( boolean boolean_1 )</code>|
enabled|<code>EconItemImage.enabled( boolean boolean_1 )</code>|
checked|<code>EconItemImage.checked( boolean boolean_1 )</code>|
defaultfocus|<code>EconItemImage.defaultfocus( cstring cstring_1 )</code>|
inputnamespace|<code>EconItemImage.inputnamespace( cstring cstring_1 )</code>|
hittest|<code>EconItemImage.hittest( boolean boolean_1 )</code>|
hittestchildren|<code>EconItemImage.hittestchildren( boolean boolean_1 )</code>|
tabindex|<code>EconItemImage.tabindex( float float_1 )</code>|
selectionpos_x|<code>EconItemImage.selectionpos_x( float float_1 )</code>|
selectionpos_y|<code>EconItemImage.selectionpos_y( float float_1 )</code>|
type|<code>EconItemImage.type()</code>|
id|<code>EconItemImage.id()</code>|
layoutfile|<code>EconItemImage.layoutfile()</code>|
contentwidth|<code>EconItemImage.contentwidth()</code>|
contentheight|<code>EconItemImage.contentheight()</code>|
desiredlayoutwidth|<code>EconItemImage.desiredlayoutwidth()</code>|
desiredlayoutheight|<code>EconItemImage.desiredlayoutheight()</code>|
actuallayoutwidth|<code>EconItemImage.actuallayoutwidth()</code>|
actuallayoutheight|<code>EconItemImage.actuallayoutheight()</code>|
actualxoffset|<code>EconItemImage.actualxoffset()</code>|
actualyoffset|<code>EconItemImage.actualyoffset()</code>|
scrolloffset_y|<code>EconItemImage.scrolloffset_y()</code>|
scrolloffset_x|<code>EconItemImage.scrolloffset_x()</code>|
actualuiscale_y|<code>EconItemImage.actualuiscale_y()</code>|
actualuiscale_x|<code>EconItemImage.actualuiscale_x()</code>|
style|<code>EconItemImage.style()</code>|
AddClass|<code>EconItemImage.AddClass( cstring cstring_1 )</code>|
RemoveClass|<code>EconItemImage.RemoveClass( cstring cstring_1 )</code>|
BHasClass|<code>EconItemImage.BHasClass( cstring cstring_1 )</code>|
BAscendantHasClass|<code>EconItemImage.BAscendantHasClass( cstring cstring_1 )</code>|
SetHasClass|<code>EconItemImage.SetHasClass( cstring cstring_1, boolean boolean_2 )</code>|
ToggleClass|<code>EconItemImage.ToggleClass( cstring cstring_1 )</code>|
SwitchClass|<code>EconItemImage.SwitchClass( cstring cstring_1, cstring cstring_2 )</code>|
TriggerClass|<code>EconItemImage.TriggerClass( cstring cstring_1 )</code>|
ClearPanelEvent|<code>EconItemImage.ClearPanelEvent( cstring cstring_1 )</code>|
SetDraggable|<code>EconItemImage.SetDraggable( boolean boolean_1 )</code>|
IsDraggable|<code>EconItemImage.IsDraggable()</code>|
IsSizeValid|<code>EconItemImage.IsSizeValid()</code>|
GetChildCount|<code>EconItemImage.GetChildCount()</code>|
GetChild|<code>EconItemImage.GetChild( integer integer_1 )</code>|
GetChildIndex|<code>EconItemImage.GetChildIndex( unknown_variant_type unknown_variant_type_1 )</code>|
Children|<code>EconItemImage.Children()</code>|
FindChildrenWithClassTraverse|<code>EconItemImage.FindChildrenWithClassTraverse( cstring cstring_1 )</code>|
GetParent|<code>EconItemImage.GetParent()</code>|
SetParent|<code>EconItemImage.SetParent( unknown_variant_type unknown_variant_type_1 )</code>|
FindChild|<code>EconItemImage.FindChild( cstring cstring_1 )</code>|
FindChildTraverse|<code>EconItemImage.FindChildTraverse( cstring cstring_1 )</code>|
FindChildInLayoutFile|<code>EconItemImage.FindChildInLayoutFile( cstring cstring_1 )</code>|
FindPanelInLayoutFile|<code>EconItemImage.FindPanelInLayoutFile( cstring cstring_1 )</code>|
FindAncestor|<code>EconItemImage.FindAncestor( cstring cstring_1 )</code>|
RemoveAndDeleteChildren|<code>EconItemImage.RemoveAndDeleteChildren()</code>|
MoveChildBefore|<code>EconItemImage.MoveChildBefore( unknown_variant_type unknown_variant_type_1, unknown_variant_type unknown_variant_type_2 )</code>|
MoveChildAfter|<code>EconItemImage.MoveChildAfter( unknown_variant_type unknown_variant_type_1, unknown_variant_type unknown_variant_type_2 )</code>|
GetPositionWithinWindow|<code>EconItemImage.GetPositionWithinWindow()</code>|
GetPositionWithinAncestor|<code>EconItemImage.GetPositionWithinAncestor( unknown_variant_type unknown_variant_type_1 )</code>|
GetPosition|<code>EconItemImage.GetPosition( boolean boolean_1 )</code>|
ApplyStyles|<code>EconItemImage.ApplyStyles( boolean boolean_1 )</code>|
ClearPropertyFromCode|<code>EconItemImage.ClearPropertyFromCode( unknown_variant_type unknown_variant_type_1 )</code>|
DeleteAsync|<code>EconItemImage.DeleteAsync( float float_1 )</code>|
BIsTransparent|<code>EconItemImage.BIsTransparent()</code>|
BAcceptsInput|<code>EconItemImage.BAcceptsInput()</code>|
BAcceptsFocus|<code>EconItemImage.BAcceptsFocus()</code>|
SetFocus|<code>EconItemImage.SetFocus()</code>|
UpdateFocusInContext|<code>EconItemImage.UpdateFocusInContext()</code>|
BHasHoverStyle|<code>EconItemImage.BHasHoverStyle()</code>|
SetAcceptsInput|<code>EconItemImage.SetAcceptsInput( boolean boolean_1 )</code>|
SetAcceptsFocus|<code>EconItemImage.SetAcceptsFocus( boolean boolean_1 )</code>|
SetDisableFocusOnMouseDown|<code>EconItemImage.SetDisableFocusOnMouseDown( boolean boolean_1 )</code>|
BHasKeyFocus|<code>EconItemImage.BHasKeyFocus()</code>|
SetScrollParentToFitWhenFocused|<code>EconItemImage.SetScrollParentToFitWhenFocused( boolean boolean_1 )</code>|
BScrollParentToFitWhenFocused|<code>EconItemImage.BScrollParentToFitWhenFocused()</code>|
IsSelected|<code>EconItemImage.IsSelected()</code>|
BHasDescendantKeyFocus|<code>EconItemImage.BHasDescendantKeyFocus()</code>|
BLoadLayout|<code>EconItemImage.BLoadLayout( cstring cstring_1, boolean boolean_2, boolean boolean_3 )</code>|
BLoadLayoutSnippet|<code>EconItemImage.BLoadLayoutSnippet( cstring cstring_1 )</code>|
BHasLayoutSnippet|<code>EconItemImage.BHasLayoutSnippet( cstring cstring_1 )</code>|
BGetSnippetNames|<code>EconItemImage.BGetSnippetNames( unknown_variant_type unknown_variant_type_1 )</code>|
SetTopOfInputContext|<code>EconItemImage.SetTopOfInputContext( boolean boolean_1 )</code>|
SetDialogVariable|<code>EconItemImage.SetDialogVariable( cstring cstring_1, cstring cstring_2 )</code>|
SetDialogVariableInt|<code>EconItemImage.SetDialogVariableInt( cstring cstring_1, integer integer_2 )</code>|
SetDialogVariableTime|<code>EconItemImage.SetDialogVariableTime( cstring cstring_1, int64 int64_2 )</code>|
SetDialogVariableLocString|<code>EconItemImage.SetDialogVariableLocString( cstring cstring_1, cstring cstring_2 )</code>|
SetDialogVariablePluralLocStringInt|<code>EconItemImage.SetDialogVariablePluralLocStringInt( cstring cstring_1, cstring cstring_2, int64 int64_3 )</code>|
ScrollToTop|<code>EconItemImage.ScrollToTop()</code>|
ScrollToBottom|<code>EconItemImage.ScrollToBottom()</code>|
ScrollToLeftEdge|<code>EconItemImage.ScrollToLeftEdge()</code>|
ScrollToRightEdge|<code>EconItemImage.ScrollToRightEdge()</code>|
ScrollParentToMakePanelFit|<code>EconItemImage.ScrollParentToMakePanelFit( unknown_variant_type unknown_variant_type_1, boolean boolean_2 )</code>|
ScrollToFitRegion|<code>EconItemImage.ScrollToFitRegion( float float_1, float float_2, float float_3, float float_4, unknown_variant_type unknown_variant_type_5, boolean boolean_6, boolean boolean_7 )</code>|
BCanSeeInParentScroll|<code>EconItemImage.BCanSeeInParentScroll()</code>|
GetAttributeInt|<code>EconItemImage.GetAttributeInt( cstring cstring_1, integer integer_2 )</code>|
GetAttributeString|<code>EconItemImage.GetAttributeString( cstring cstring_1, cstring cstring_2 )</code>|
GetAttributeUInt32|<code>EconItemImage.GetAttributeUInt32( cstring cstring_1, unsigned unsigned_2 )</code>|
SetAttributeInt|<code>EconItemImage.SetAttributeInt( cstring cstring_1, integer integer_2 )</code>|
SetAttributeString|<code>EconItemImage.SetAttributeString( cstring cstring_1, cstring cstring_2 )</code>|
SetAttributeUInt32|<code>EconItemImage.SetAttributeUInt32( cstring cstring_1, unsigned unsigned_2 )</code>|
SetInputNamespace|<code>EconItemImage.SetInputNamespace( cstring cstring_1 )</code>|
RegisterForReadyEvents|<code>EconItemImage.RegisterForReadyEvents( boolean boolean_1 )</code>|
BReadyForDisplay|<code>EconItemImage.BReadyForDisplay()</code>|
SetReadyForDisplay|<code>EconItemImage.SetReadyForDisplay( boolean boolean_1 )</code>|
SetPositionInPixels|<code>EconItemImage.SetPositionInPixels( float float_1, float float_2, float float_3 )</code>|
Data|<code>EconItemImage.Data( js_raw_args js_raw_args_1 )</code>|
debug.description|<code>EconItemImage.debug.description( js_raw_args js_raw_args_1 )</code>|
SetSendScrollPositionChangedEvents|<code>EconItemImage.SetSendScrollPositionChangedEvents( boolean boolean_1 )</code>|
SetImage|<code>EconItemImage.SetImage( cstring cstring_1 )</code>|
SetImageFromPanel|<code>EconItemImage.SetImageFromPanel( unknown_variant_type unknown_variant_type_1, boolean boolean_2 )</code>|
SetScaling|<code>EconItemImage.SetScaling( cstring cstring_1 )</code>|
SetPanelEvent|<code>EconItemImage.SetPanelEvent( js_raw_args js_raw_args_1 )</code>|
RunScriptInPanelContext|<code>EconItemImage.RunScriptInPanelContext( js_raw_args js_raw_args_1 )</code>|
rememberchildfocus|<code>EconItemImage.rememberchildfocus( boolean boolean_1 )</code>|
paneltype|<code>EconItemImage.paneltype()</code>|


# DOTAShowcaseDecoration
Function|Signature|Description
--|--|--
visible|<code>DOTAShowcaseDecoration.visible( boolean boolean_1 )</code>|
enabled|<code>DOTAShowcaseDecoration.enabled( boolean boolean_1 )</code>|
checked|<code>DOTAShowcaseDecoration.checked( boolean boolean_1 )</code>|
defaultfocus|<code>DOTAShowcaseDecoration.defaultfocus( cstring cstring_1 )</code>|
inputnamespace|<code>DOTAShowcaseDecoration.inputnamespace( cstring cstring_1 )</code>|
hittest|<code>DOTAShowcaseDecoration.hittest( boolean boolean_1 )</code>|
hittestchildren|<code>DOTAShowcaseDecoration.hittestchildren( boolean boolean_1 )</code>|
tabindex|<code>DOTAShowcaseDecoration.tabindex( float float_1 )</code>|
selectionpos_x|<code>DOTAShowcaseDecoration.selectionpos_x( float float_1 )</code>|
selectionpos_y|<code>DOTAShowcaseDecoration.selectionpos_y( float float_1 )</code>|
type|<code>DOTAShowcaseDecoration.type()</code>|
id|<code>DOTAShowcaseDecoration.id()</code>|
layoutfile|<code>DOTAShowcaseDecoration.layoutfile()</code>|
contentwidth|<code>DOTAShowcaseDecoration.contentwidth()</code>|
contentheight|<code>DOTAShowcaseDecoration.contentheight()</code>|
desiredlayoutwidth|<code>DOTAShowcaseDecoration.desiredlayoutwidth()</code>|
desiredlayoutheight|<code>DOTAShowcaseDecoration.desiredlayoutheight()</code>|
actuallayoutwidth|<code>DOTAShowcaseDecoration.actuallayoutwidth()</code>|
actuallayoutheight|<code>DOTAShowcaseDecoration.actuallayoutheight()</code>|
actualxoffset|<code>DOTAShowcaseDecoration.actualxoffset()</code>|
actualyoffset|<code>DOTAShowcaseDecoration.actualyoffset()</code>|
scrolloffset_y|<code>DOTAShowcaseDecoration.scrolloffset_y()</code>|
scrolloffset_x|<code>DOTAShowcaseDecoration.scrolloffset_x()</code>|
actualuiscale_y|<code>DOTAShowcaseDecoration.actualuiscale_y()</code>|
actualuiscale_x|<code>DOTAShowcaseDecoration.actualuiscale_x()</code>|
style|<code>DOTAShowcaseDecoration.style()</code>|
AddClass|<code>DOTAShowcaseDecoration.AddClass( cstring cstring_1 )</code>|
RemoveClass|<code>DOTAShowcaseDecoration.RemoveClass( cstring cstring_1 )</code>|
BHasClass|<code>DOTAShowcaseDecoration.BHasClass( cstring cstring_1 )</code>|
BAscendantHasClass|<code>DOTAShowcaseDecoration.BAscendantHasClass( cstring cstring_1 )</code>|
SetHasClass|<code>DOTAShowcaseDecoration.SetHasClass( cstring cstring_1, boolean boolean_2 )</code>|
ToggleClass|<code>DOTAShowcaseDecoration.ToggleClass( cstring cstring_1 )</code>|
SwitchClass|<code>DOTAShowcaseDecoration.SwitchClass( cstring cstring_1, cstring cstring_2 )</code>|
TriggerClass|<code>DOTAShowcaseDecoration.TriggerClass( cstring cstring_1 )</code>|
ClearPanelEvent|<code>DOTAShowcaseDecoration.ClearPanelEvent( cstring cstring_1 )</code>|
SetDraggable|<code>DOTAShowcaseDecoration.SetDraggable( boolean boolean_1 )</code>|
IsDraggable|<code>DOTAShowcaseDecoration.IsDraggable()</code>|
IsSizeValid|<code>DOTAShowcaseDecoration.IsSizeValid()</code>|
GetChildCount|<code>DOTAShowcaseDecoration.GetChildCount()</code>|
GetChild|<code>DOTAShowcaseDecoration.GetChild( integer integer_1 )</code>|
GetChildIndex|<code>DOTAShowcaseDecoration.GetChildIndex( unknown_variant_type unknown_variant_type_1 )</code>|
Children|<code>DOTAShowcaseDecoration.Children()</code>|
FindChildrenWithClassTraverse|<code>DOTAShowcaseDecoration.FindChildrenWithClassTraverse( cstring cstring_1 )</code>|
GetParent|<code>DOTAShowcaseDecoration.GetParent()</code>|
SetParent|<code>DOTAShowcaseDecoration.SetParent( unknown_variant_type unknown_variant_type_1 )</code>|
FindChild|<code>DOTAShowcaseDecoration.FindChild( cstring cstring_1 )</code>|
FindChildTraverse|<code>DOTAShowcaseDecoration.FindChildTraverse( cstring cstring_1 )</code>|
FindChildInLayoutFile|<code>DOTAShowcaseDecoration.FindChildInLayoutFile( cstring cstring_1 )</code>|
FindPanelInLayoutFile|<code>DOTAShowcaseDecoration.FindPanelInLayoutFile( cstring cstring_1 )</code>|
FindAncestor|<code>DOTAShowcaseDecoration.FindAncestor( cstring cstring_1 )</code>|
RemoveAndDeleteChildren|<code>DOTAShowcaseDecoration.RemoveAndDeleteChildren()</code>|
MoveChildBefore|<code>DOTAShowcaseDecoration.MoveChildBefore( unknown_variant_type unknown_variant_type_1, unknown_variant_type unknown_variant_type_2 )</code>|
MoveChildAfter|<code>DOTAShowcaseDecoration.MoveChildAfter( unknown_variant_type unknown_variant_type_1, unknown_variant_type unknown_variant_type_2 )</code>|
GetPositionWithinWindow|<code>DOTAShowcaseDecoration.GetPositionWithinWindow()</code>|
GetPositionWithinAncestor|<code>DOTAShowcaseDecoration.GetPositionWithinAncestor( unknown_variant_type unknown_variant_type_1 )</code>|
GetPosition|<code>DOTAShowcaseDecoration.GetPosition( boolean boolean_1 )</code>|
ApplyStyles|<code>DOTAShowcaseDecoration.ApplyStyles( boolean boolean_1 )</code>|
ClearPropertyFromCode|<code>DOTAShowcaseDecoration.ClearPropertyFromCode( unknown_variant_type unknown_variant_type_1 )</code>|
DeleteAsync|<code>DOTAShowcaseDecoration.DeleteAsync( float float_1 )</code>|
BIsTransparent|<code>DOTAShowcaseDecoration.BIsTransparent()</code>|
BAcceptsInput|<code>DOTAShowcaseDecoration.BAcceptsInput()</code>|
BAcceptsFocus|<code>DOTAShowcaseDecoration.BAcceptsFocus()</code>|
SetFocus|<code>DOTAShowcaseDecoration.SetFocus()</code>|
UpdateFocusInContext|<code>DOTAShowcaseDecoration.UpdateFocusInContext()</code>|
BHasHoverStyle|<code>DOTAShowcaseDecoration.BHasHoverStyle()</code>|
SetAcceptsInput|<code>DOTAShowcaseDecoration.SetAcceptsInput( boolean boolean_1 )</code>|
SetAcceptsFocus|<code>DOTAShowcaseDecoration.SetAcceptsFocus( boolean boolean_1 )</code>|
SetDisableFocusOnMouseDown|<code>DOTAShowcaseDecoration.SetDisableFocusOnMouseDown( boolean boolean_1 )</code>|
BHasKeyFocus|<code>DOTAShowcaseDecoration.BHasKeyFocus()</code>|
SetScrollParentToFitWhenFocused|<code>DOTAShowcaseDecoration.SetScrollParentToFitWhenFocused( boolean boolean_1 )</code>|
BScrollParentToFitWhenFocused|<code>DOTAShowcaseDecoration.BScrollParentToFitWhenFocused()</code>|
IsSelected|<code>DOTAShowcaseDecoration.IsSelected()</code>|
BHasDescendantKeyFocus|<code>DOTAShowcaseDecoration.BHasDescendantKeyFocus()</code>|
BLoadLayout|<code>DOTAShowcaseDecoration.BLoadLayout( cstring cstring_1, boolean boolean_2, boolean boolean_3 )</code>|
BLoadLayoutSnippet|<code>DOTAShowcaseDecoration.BLoadLayoutSnippet( cstring cstring_1 )</code>|
BHasLayoutSnippet|<code>DOTAShowcaseDecoration.BHasLayoutSnippet( cstring cstring_1 )</code>|
BGetSnippetNames|<code>DOTAShowcaseDecoration.BGetSnippetNames( unknown_variant_type unknown_variant_type_1 )</code>|
SetTopOfInputContext|<code>DOTAShowcaseDecoration.SetTopOfInputContext( boolean boolean_1 )</code>|
SetDialogVariable|<code>DOTAShowcaseDecoration.SetDialogVariable( cstring cstring_1, cstring cstring_2 )</code>|
SetDialogVariableInt|<code>DOTAShowcaseDecoration.SetDialogVariableInt( cstring cstring_1, integer integer_2 )</code>|
SetDialogVariableTime|<code>DOTAShowcaseDecoration.SetDialogVariableTime( cstring cstring_1, int64 int64_2 )</code>|
SetDialogVariableLocString|<code>DOTAShowcaseDecoration.SetDialogVariableLocString( cstring cstring_1, cstring cstring_2 )</code>|
SetDialogVariablePluralLocStringInt|<code>DOTAShowcaseDecoration.SetDialogVariablePluralLocStringInt( cstring cstring_1, cstring cstring_2, int64 int64_3 )</code>|
ScrollToTop|<code>DOTAShowcaseDecoration.ScrollToTop()</code>|
ScrollToBottom|<code>DOTAShowcaseDecoration.ScrollToBottom()</code>|
ScrollToLeftEdge|<code>DOTAShowcaseDecoration.ScrollToLeftEdge()</code>|
ScrollToRightEdge|<code>DOTAShowcaseDecoration.ScrollToRightEdge()</code>|
ScrollParentToMakePanelFit|<code>DOTAShowcaseDecoration.ScrollParentToMakePanelFit( unknown_variant_type unknown_variant_type_1, boolean boolean_2 )</code>|
ScrollToFitRegion|<code>DOTAShowcaseDecoration.ScrollToFitRegion( float float_1, float float_2, float float_3, float float_4, unknown_variant_type unknown_variant_type_5, boolean boolean_6, boolean boolean_7 )</code>|
BCanSeeInParentScroll|<code>DOTAShowcaseDecoration.BCanSeeInParentScroll()</code>|
GetAttributeInt|<code>DOTAShowcaseDecoration.GetAttributeInt( cstring cstring_1, integer integer_2 )</code>|
GetAttributeString|<code>DOTAShowcaseDecoration.GetAttributeString( cstring cstring_1, cstring cstring_2 )</code>|
GetAttributeUInt32|<code>DOTAShowcaseDecoration.GetAttributeUInt32( cstring cstring_1, unsigned unsigned_2 )</code>|
SetAttributeInt|<code>DOTAShowcaseDecoration.SetAttributeInt( cstring cstring_1, integer integer_2 )</code>|
SetAttributeString|<code>DOTAShowcaseDecoration.SetAttributeString( cstring cstring_1, cstring cstring_2 )</code>|
SetAttributeUInt32|<code>DOTAShowcaseDecoration.SetAttributeUInt32( cstring cstring_1, unsigned unsigned_2 )</code>|
SetInputNamespace|<code>DOTAShowcaseDecoration.SetInputNamespace( cstring cstring_1 )</code>|
RegisterForReadyEvents|<code>DOTAShowcaseDecoration.RegisterForReadyEvents( boolean boolean_1 )</code>|
BReadyForDisplay|<code>DOTAShowcaseDecoration.BReadyForDisplay()</code>|
SetReadyForDisplay|<code>DOTAShowcaseDecoration.SetReadyForDisplay( boolean boolean_1 )</code>|
SetPositionInPixels|<code>DOTAShowcaseDecoration.SetPositionInPixels( float float_1, float float_2, float float_3 )</code>|
Data|<code>DOTAShowcaseDecoration.Data( js_raw_args js_raw_args_1 )</code>|
debug.description|<code>DOTAShowcaseDecoration.debug.description( js_raw_args js_raw_args_1 )</code>|
SetSendScrollPositionChangedEvents|<code>DOTAShowcaseDecoration.SetSendScrollPositionChangedEvents( boolean boolean_1 )</code>|
SetPanelEvent|<code>DOTAShowcaseDecoration.SetPanelEvent( js_raw_args js_raw_args_1 )</code>|
RunScriptInPanelContext|<code>DOTAShowcaseDecoration.RunScriptInPanelContext( js_raw_args js_raw_args_1 )</code>|
rememberchildfocus|<code>DOTAShowcaseDecoration.rememberchildfocus( boolean boolean_1 )</code>|
paneltype|<code>DOTAShowcaseDecoration.paneltype()</code>|


# DOTACrownfallToken
Function|Signature|Description
--|--|--
visible|<code>DOTACrownfallToken.visible( boolean boolean_1 )</code>|
enabled|<code>DOTACrownfallToken.enabled( boolean boolean_1 )</code>|
checked|<code>DOTACrownfallToken.checked( boolean boolean_1 )</code>|
defaultfocus|<code>DOTACrownfallToken.defaultfocus( cstring cstring_1 )</code>|
inputnamespace|<code>DOTACrownfallToken.inputnamespace( cstring cstring_1 )</code>|
hittest|<code>DOTACrownfallToken.hittest( boolean boolean_1 )</code>|
hittestchildren|<code>DOTACrownfallToken.hittestchildren( boolean boolean_1 )</code>|
tabindex|<code>DOTACrownfallToken.tabindex( float float_1 )</code>|
selectionpos_x|<code>DOTACrownfallToken.selectionpos_x( float float_1 )</code>|
selectionpos_y|<code>DOTACrownfallToken.selectionpos_y( float float_1 )</code>|
type|<code>DOTACrownfallToken.type()</code>|
id|<code>DOTACrownfallToken.id()</code>|
layoutfile|<code>DOTACrownfallToken.layoutfile()</code>|
contentwidth|<code>DOTACrownfallToken.contentwidth()</code>|
contentheight|<code>DOTACrownfallToken.contentheight()</code>|
desiredlayoutwidth|<code>DOTACrownfallToken.desiredlayoutwidth()</code>|
desiredlayoutheight|<code>DOTACrownfallToken.desiredlayoutheight()</code>|
actuallayoutwidth|<code>DOTACrownfallToken.actuallayoutwidth()</code>|
actuallayoutheight|<code>DOTACrownfallToken.actuallayoutheight()</code>|
actualxoffset|<code>DOTACrownfallToken.actualxoffset()</code>|
actualyoffset|<code>DOTACrownfallToken.actualyoffset()</code>|
scrolloffset_y|<code>DOTACrownfallToken.scrolloffset_y()</code>|
scrolloffset_x|<code>DOTACrownfallToken.scrolloffset_x()</code>|
actualuiscale_y|<code>DOTACrownfallToken.actualuiscale_y()</code>|
actualuiscale_x|<code>DOTACrownfallToken.actualuiscale_x()</code>|
style|<code>DOTACrownfallToken.style()</code>|
AddClass|<code>DOTACrownfallToken.AddClass( cstring cstring_1 )</code>|
RemoveClass|<code>DOTACrownfallToken.RemoveClass( cstring cstring_1 )</code>|
BHasClass|<code>DOTACrownfallToken.BHasClass( cstring cstring_1 )</code>|
BAscendantHasClass|<code>DOTACrownfallToken.BAscendantHasClass( cstring cstring_1 )</code>|
SetHasClass|<code>DOTACrownfallToken.SetHasClass( cstring cstring_1, boolean boolean_2 )</code>|
ToggleClass|<code>DOTACrownfallToken.ToggleClass( cstring cstring_1 )</code>|
SwitchClass|<code>DOTACrownfallToken.SwitchClass( cstring cstring_1, cstring cstring_2 )</code>|
TriggerClass|<code>DOTACrownfallToken.TriggerClass( cstring cstring_1 )</code>|
ClearPanelEvent|<code>DOTACrownfallToken.ClearPanelEvent( cstring cstring_1 )</code>|
SetDraggable|<code>DOTACrownfallToken.SetDraggable( boolean boolean_1 )</code>|
IsDraggable|<code>DOTACrownfallToken.IsDraggable()</code>|
IsSizeValid|<code>DOTACrownfallToken.IsSizeValid()</code>|
GetChildCount|<code>DOTACrownfallToken.GetChildCount()</code>|
GetChild|<code>DOTACrownfallToken.GetChild( integer integer_1 )</code>|
GetChildIndex|<code>DOTACrownfallToken.GetChildIndex( unknown_variant_type unknown_variant_type_1 )</code>|
Children|<code>DOTACrownfallToken.Children()</code>|
FindChildrenWithClassTraverse|<code>DOTACrownfallToken.FindChildrenWithClassTraverse( cstring cstring_1 )</code>|
GetParent|<code>DOTACrownfallToken.GetParent()</code>|
SetParent|<code>DOTACrownfallToken.SetParent( unknown_variant_type unknown_variant_type_1 )</code>|
FindChild|<code>DOTACrownfallToken.FindChild( cstring cstring_1 )</code>|
FindChildTraverse|<code>DOTACrownfallToken.FindChildTraverse( cstring cstring_1 )</code>|
FindChildInLayoutFile|<code>DOTACrownfallToken.FindChildInLayoutFile( cstring cstring_1 )</code>|
FindPanelInLayoutFile|<code>DOTACrownfallToken.FindPanelInLayoutFile( cstring cstring_1 )</code>|
FindAncestor|<code>DOTACrownfallToken.FindAncestor( cstring cstring_1 )</code>|
RemoveAndDeleteChildren|<code>DOTACrownfallToken.RemoveAndDeleteChildren()</code>|
MoveChildBefore|<code>DOTACrownfallToken.MoveChildBefore( unknown_variant_type unknown_variant_type_1, unknown_variant_type unknown_variant_type_2 )</code>|
MoveChildAfter|<code>DOTACrownfallToken.MoveChildAfter( unknown_variant_type unknown_variant_type_1, unknown_variant_type unknown_variant_type_2 )</code>|
GetPositionWithinWindow|<code>DOTACrownfallToken.GetPositionWithinWindow()</code>|
GetPositionWithinAncestor|<code>DOTACrownfallToken.GetPositionWithinAncestor( unknown_variant_type unknown_variant_type_1 )</code>|
GetPosition|<code>DOTACrownfallToken.GetPosition( boolean boolean_1 )</code>|
ApplyStyles|<code>DOTACrownfallToken.ApplyStyles( boolean boolean_1 )</code>|
ClearPropertyFromCode|<code>DOTACrownfallToken.ClearPropertyFromCode( unknown_variant_type unknown_variant_type_1 )</code>|
DeleteAsync|<code>DOTACrownfallToken.DeleteAsync( float float_1 )</code>|
BIsTransparent|<code>DOTACrownfallToken.BIsTransparent()</code>|
BAcceptsInput|<code>DOTACrownfallToken.BAcceptsInput()</code>|
BAcceptsFocus|<code>DOTACrownfallToken.BAcceptsFocus()</code>|
SetFocus|<code>DOTACrownfallToken.SetFocus()</code>|
UpdateFocusInContext|<code>DOTACrownfallToken.UpdateFocusInContext()</code>|
BHasHoverStyle|<code>DOTACrownfallToken.BHasHoverStyle()</code>|
SetAcceptsInput|<code>DOTACrownfallToken.SetAcceptsInput( boolean boolean_1 )</code>|
SetAcceptsFocus|<code>DOTACrownfallToken.SetAcceptsFocus( boolean boolean_1 )</code>|
SetDisableFocusOnMouseDown|<code>DOTACrownfallToken.SetDisableFocusOnMouseDown( boolean boolean_1 )</code>|
BHasKeyFocus|<code>DOTACrownfallToken.BHasKeyFocus()</code>|
SetScrollParentToFitWhenFocused|<code>DOTACrownfallToken.SetScrollParentToFitWhenFocused( boolean boolean_1 )</code>|
BScrollParentToFitWhenFocused|<code>DOTACrownfallToken.BScrollParentToFitWhenFocused()</code>|
IsSelected|<code>DOTACrownfallToken.IsSelected()</code>|
BHasDescendantKeyFocus|<code>DOTACrownfallToken.BHasDescendantKeyFocus()</code>|
BLoadLayout|<code>DOTACrownfallToken.BLoadLayout( cstring cstring_1, boolean boolean_2, boolean boolean_3 )</code>|
BLoadLayoutSnippet|<code>DOTACrownfallToken.BLoadLayoutSnippet( cstring cstring_1 )</code>|
BHasLayoutSnippet|<code>DOTACrownfallToken.BHasLayoutSnippet( cstring cstring_1 )</code>|
BGetSnippetNames|<code>DOTACrownfallToken.BGetSnippetNames( unknown_variant_type unknown_variant_type_1 )</code>|
SetTopOfInputContext|<code>DOTACrownfallToken.SetTopOfInputContext( boolean boolean_1 )</code>|
SetDialogVariable|<code>DOTACrownfallToken.SetDialogVariable( cstring cstring_1, cstring cstring_2 )</code>|
SetDialogVariableInt|<code>DOTACrownfallToken.SetDialogVariableInt( cstring cstring_1, integer integer_2 )</code>|
SetDialogVariableTime|<code>DOTACrownfallToken.SetDialogVariableTime( cstring cstring_1, int64 int64_2 )</code>|
SetDialogVariableLocString|<code>DOTACrownfallToken.SetDialogVariableLocString( cstring cstring_1, cstring cstring_2 )</code>|
SetDialogVariablePluralLocStringInt|<code>DOTACrownfallToken.SetDialogVariablePluralLocStringInt( cstring cstring_1, cstring cstring_2, int64 int64_3 )</code>|
ScrollToTop|<code>DOTACrownfallToken.ScrollToTop()</code>|
ScrollToBottom|<code>DOTACrownfallToken.ScrollToBottom()</code>|
ScrollToLeftEdge|<code>DOTACrownfallToken.ScrollToLeftEdge()</code>|
ScrollToRightEdge|<code>DOTACrownfallToken.ScrollToRightEdge()</code>|
ScrollParentToMakePanelFit|<code>DOTACrownfallToken.ScrollParentToMakePanelFit( unknown_variant_type unknown_variant_type_1, boolean boolean_2 )</code>|
ScrollToFitRegion|<code>DOTACrownfallToken.ScrollToFitRegion( float float_1, float float_2, float float_3, float float_4, unknown_variant_type unknown_variant_type_5, boolean boolean_6, boolean boolean_7 )</code>|
BCanSeeInParentScroll|<code>DOTACrownfallToken.BCanSeeInParentScroll()</code>|
GetAttributeInt|<code>DOTACrownfallToken.GetAttributeInt( cstring cstring_1, integer integer_2 )</code>|
GetAttributeString|<code>DOTACrownfallToken.GetAttributeString( cstring cstring_1, cstring cstring_2 )</code>|
GetAttributeUInt32|<code>DOTACrownfallToken.GetAttributeUInt32( cstring cstring_1, unsigned unsigned_2 )</code>|
SetAttributeInt|<code>DOTACrownfallToken.SetAttributeInt( cstring cstring_1, integer integer_2 )</code>|
SetAttributeString|<code>DOTACrownfallToken.SetAttributeString( cstring cstring_1, cstring cstring_2 )</code>|
SetAttributeUInt32|<code>DOTACrownfallToken.SetAttributeUInt32( cstring cstring_1, unsigned unsigned_2 )</code>|
SetInputNamespace|<code>DOTACrownfallToken.SetInputNamespace( cstring cstring_1 )</code>|
RegisterForReadyEvents|<code>DOTACrownfallToken.RegisterForReadyEvents( boolean boolean_1 )</code>|
BReadyForDisplay|<code>DOTACrownfallToken.BReadyForDisplay()</code>|
SetReadyForDisplay|<code>DOTACrownfallToken.SetReadyForDisplay( boolean boolean_1 )</code>|
SetPositionInPixels|<code>DOTACrownfallToken.SetPositionInPixels( float float_1, float float_2, float float_3 )</code>|
Data|<code>DOTACrownfallToken.Data( js_raw_args js_raw_args_1 )</code>|
debug.description|<code>DOTACrownfallToken.debug.description( js_raw_args js_raw_args_1 )</code>|
SetSendScrollPositionChangedEvents|<code>DOTACrownfallToken.SetSendScrollPositionChangedEvents( boolean boolean_1 )</code>|
overworld_id|<code>DOTACrownfallToken.overworld_id( integer integer_1 )</code>|
token_id|<code>DOTACrownfallToken.token_id( integer integer_1 )</code>|
SetPanelEvent|<code>DOTACrownfallToken.SetPanelEvent( js_raw_args js_raw_args_1 )</code>|
RunScriptInPanelContext|<code>DOTACrownfallToken.RunScriptInPanelContext( js_raw_args js_raw_args_1 )</code>|
rememberchildfocus|<code>DOTACrownfallToken.rememberchildfocus( boolean boolean_1 )</code>|
paneltype|<code>DOTACrownfallToken.paneltype()</code>|


# AnimatedImageStrip
Function|Signature|Description
--|--|--
visible|<code>AnimatedImageStrip.visible( boolean boolean_1 )</code>|
enabled|<code>AnimatedImageStrip.enabled( boolean boolean_1 )</code>|
checked|<code>AnimatedImageStrip.checked( boolean boolean_1 )</code>|
defaultfocus|<code>AnimatedImageStrip.defaultfocus( cstring cstring_1 )</code>|
inputnamespace|<code>AnimatedImageStrip.inputnamespace( cstring cstring_1 )</code>|
hittest|<code>AnimatedImageStrip.hittest( boolean boolean_1 )</code>|
hittestchildren|<code>AnimatedImageStrip.hittestchildren( boolean boolean_1 )</code>|
tabindex|<code>AnimatedImageStrip.tabindex( float float_1 )</code>|
selectionpos_x|<code>AnimatedImageStrip.selectionpos_x( float float_1 )</code>|
selectionpos_y|<code>AnimatedImageStrip.selectionpos_y( float float_1 )</code>|
type|<code>AnimatedImageStrip.type()</code>|
id|<code>AnimatedImageStrip.id()</code>|
layoutfile|<code>AnimatedImageStrip.layoutfile()</code>|
contentwidth|<code>AnimatedImageStrip.contentwidth()</code>|
contentheight|<code>AnimatedImageStrip.contentheight()</code>|
desiredlayoutwidth|<code>AnimatedImageStrip.desiredlayoutwidth()</code>|
desiredlayoutheight|<code>AnimatedImageStrip.desiredlayoutheight()</code>|
actuallayoutwidth|<code>AnimatedImageStrip.actuallayoutwidth()</code>|
actuallayoutheight|<code>AnimatedImageStrip.actuallayoutheight()</code>|
actualxoffset|<code>AnimatedImageStrip.actualxoffset()</code>|
actualyoffset|<code>AnimatedImageStrip.actualyoffset()</code>|
scrolloffset_y|<code>AnimatedImageStrip.scrolloffset_y()</code>|
scrolloffset_x|<code>AnimatedImageStrip.scrolloffset_x()</code>|
actualuiscale_y|<code>AnimatedImageStrip.actualuiscale_y()</code>|
actualuiscale_x|<code>AnimatedImageStrip.actualuiscale_x()</code>|
style|<code>AnimatedImageStrip.style()</code>|
AddClass|<code>AnimatedImageStrip.AddClass( cstring cstring_1 )</code>|
RemoveClass|<code>AnimatedImageStrip.RemoveClass( cstring cstring_1 )</code>|
BHasClass|<code>AnimatedImageStrip.BHasClass( cstring cstring_1 )</code>|
BAscendantHasClass|<code>AnimatedImageStrip.BAscendantHasClass( cstring cstring_1 )</code>|
SetHasClass|<code>AnimatedImageStrip.SetHasClass( cstring cstring_1, boolean boolean_2 )</code>|
ToggleClass|<code>AnimatedImageStrip.ToggleClass( cstring cstring_1 )</code>|
SwitchClass|<code>AnimatedImageStrip.SwitchClass( cstring cstring_1, cstring cstring_2 )</code>|
TriggerClass|<code>AnimatedImageStrip.TriggerClass( cstring cstring_1 )</code>|
ClearPanelEvent|<code>AnimatedImageStrip.ClearPanelEvent( cstring cstring_1 )</code>|
SetDraggable|<code>AnimatedImageStrip.SetDraggable( boolean boolean_1 )</code>|
IsDraggable|<code>AnimatedImageStrip.IsDraggable()</code>|
IsSizeValid|<code>AnimatedImageStrip.IsSizeValid()</code>|
GetChildCount|<code>AnimatedImageStrip.GetChildCount()</code>|
GetChild|<code>AnimatedImageStrip.GetChild( integer integer_1 )</code>|
GetChildIndex|<code>AnimatedImageStrip.GetChildIndex( unknown_variant_type unknown_variant_type_1 )</code>|
Children|<code>AnimatedImageStrip.Children()</code>|
FindChildrenWithClassTraverse|<code>AnimatedImageStrip.FindChildrenWithClassTraverse( cstring cstring_1 )</code>|
GetParent|<code>AnimatedImageStrip.GetParent()</code>|
SetParent|<code>AnimatedImageStrip.SetParent( unknown_variant_type unknown_variant_type_1 )</code>|
FindChild|<code>AnimatedImageStrip.FindChild( cstring cstring_1 )</code>|
FindChildTraverse|<code>AnimatedImageStrip.FindChildTraverse( cstring cstring_1 )</code>|
FindChildInLayoutFile|<code>AnimatedImageStrip.FindChildInLayoutFile( cstring cstring_1 )</code>|
FindPanelInLayoutFile|<code>AnimatedImageStrip.FindPanelInLayoutFile( cstring cstring_1 )</code>|
FindAncestor|<code>AnimatedImageStrip.FindAncestor( cstring cstring_1 )</code>|
RemoveAndDeleteChildren|<code>AnimatedImageStrip.RemoveAndDeleteChildren()</code>|
MoveChildBefore|<code>AnimatedImageStrip.MoveChildBefore( unknown_variant_type unknown_variant_type_1, unknown_variant_type unknown_variant_type_2 )</code>|
MoveChildAfter|<code>AnimatedImageStrip.MoveChildAfter( unknown_variant_type unknown_variant_type_1, unknown_variant_type unknown_variant_type_2 )</code>|
GetPositionWithinWindow|<code>AnimatedImageStrip.GetPositionWithinWindow()</code>|
GetPositionWithinAncestor|<code>AnimatedImageStrip.GetPositionWithinAncestor( unknown_variant_type unknown_variant_type_1 )</code>|
GetPosition|<code>AnimatedImageStrip.GetPosition( boolean boolean_1 )</code>|
ApplyStyles|<code>AnimatedImageStrip.ApplyStyles( boolean boolean_1 )</code>|
ClearPropertyFromCode|<code>AnimatedImageStrip.ClearPropertyFromCode( unknown_variant_type unknown_variant_type_1 )</code>|
DeleteAsync|<code>AnimatedImageStrip.DeleteAsync( float float_1 )</code>|
BIsTransparent|<code>AnimatedImageStrip.BIsTransparent()</code>|
BAcceptsInput|<code>AnimatedImageStrip.BAcceptsInput()</code>|
BAcceptsFocus|<code>AnimatedImageStrip.BAcceptsFocus()</code>|
SetFocus|<code>AnimatedImageStrip.SetFocus()</code>|
UpdateFocusInContext|<code>AnimatedImageStrip.UpdateFocusInContext()</code>|
BHasHoverStyle|<code>AnimatedImageStrip.BHasHoverStyle()</code>|
SetAcceptsInput|<code>AnimatedImageStrip.SetAcceptsInput( boolean boolean_1 )</code>|
SetAcceptsFocus|<code>AnimatedImageStrip.SetAcceptsFocus( boolean boolean_1 )</code>|
SetDisableFocusOnMouseDown|<code>AnimatedImageStrip.SetDisableFocusOnMouseDown( boolean boolean_1 )</code>|
BHasKeyFocus|<code>AnimatedImageStrip.BHasKeyFocus()</code>|
SetScrollParentToFitWhenFocused|<code>AnimatedImageStrip.SetScrollParentToFitWhenFocused( boolean boolean_1 )</code>|
BScrollParentToFitWhenFocused|<code>AnimatedImageStrip.BScrollParentToFitWhenFocused()</code>|
IsSelected|<code>AnimatedImageStrip.IsSelected()</code>|
BHasDescendantKeyFocus|<code>AnimatedImageStrip.BHasDescendantKeyFocus()</code>|
BLoadLayout|<code>AnimatedImageStrip.BLoadLayout( cstring cstring_1, boolean boolean_2, boolean boolean_3 )</code>|
BLoadLayoutSnippet|<code>AnimatedImageStrip.BLoadLayoutSnippet( cstring cstring_1 )</code>|
BHasLayoutSnippet|<code>AnimatedImageStrip.BHasLayoutSnippet( cstring cstring_1 )</code>|
BGetSnippetNames|<code>AnimatedImageStrip.BGetSnippetNames( unknown_variant_type unknown_variant_type_1 )</code>|
SetTopOfInputContext|<code>AnimatedImageStrip.SetTopOfInputContext( boolean boolean_1 )</code>|
SetDialogVariable|<code>AnimatedImageStrip.SetDialogVariable( cstring cstring_1, cstring cstring_2 )</code>|
SetDialogVariableInt|<code>AnimatedImageStrip.SetDialogVariableInt( cstring cstring_1, integer integer_2 )</code>|
SetDialogVariableTime|<code>AnimatedImageStrip.SetDialogVariableTime( cstring cstring_1, int64 int64_2 )</code>|
SetDialogVariableLocString|<code>AnimatedImageStrip.SetDialogVariableLocString( cstring cstring_1, cstring cstring_2 )</code>|
SetDialogVariablePluralLocStringInt|<code>AnimatedImageStrip.SetDialogVariablePluralLocStringInt( cstring cstring_1, cstring cstring_2, int64 int64_3 )</code>|
ScrollToTop|<code>AnimatedImageStrip.ScrollToTop()</code>|
ScrollToBottom|<code>AnimatedImageStrip.ScrollToBottom()</code>|
ScrollToLeftEdge|<code>AnimatedImageStrip.ScrollToLeftEdge()</code>|
ScrollToRightEdge|<code>AnimatedImageStrip.ScrollToRightEdge()</code>|
ScrollParentToMakePanelFit|<code>AnimatedImageStrip.ScrollParentToMakePanelFit( unknown_variant_type unknown_variant_type_1, boolean boolean_2 )</code>|
ScrollToFitRegion|<code>AnimatedImageStrip.ScrollToFitRegion( float float_1, float float_2, float float_3, float float_4, unknown_variant_type unknown_variant_type_5, boolean boolean_6, boolean boolean_7 )</code>|
BCanSeeInParentScroll|<code>AnimatedImageStrip.BCanSeeInParentScroll()</code>|
GetAttributeInt|<code>AnimatedImageStrip.GetAttributeInt( cstring cstring_1, integer integer_2 )</code>|
GetAttributeString|<code>AnimatedImageStrip.GetAttributeString( cstring cstring_1, cstring cstring_2 )</code>|
GetAttributeUInt32|<code>AnimatedImageStrip.GetAttributeUInt32( cstring cstring_1, unsigned unsigned_2 )</code>|
SetAttributeInt|<code>AnimatedImageStrip.SetAttributeInt( cstring cstring_1, integer integer_2 )</code>|
SetAttributeString|<code>AnimatedImageStrip.SetAttributeString( cstring cstring_1, cstring cstring_2 )</code>|
SetAttributeUInt32|<code>AnimatedImageStrip.SetAttributeUInt32( cstring cstring_1, unsigned unsigned_2 )</code>|
SetInputNamespace|<code>AnimatedImageStrip.SetInputNamespace( cstring cstring_1 )</code>|
RegisterForReadyEvents|<code>AnimatedImageStrip.RegisterForReadyEvents( boolean boolean_1 )</code>|
BReadyForDisplay|<code>AnimatedImageStrip.BReadyForDisplay()</code>|
SetReadyForDisplay|<code>AnimatedImageStrip.SetReadyForDisplay( boolean boolean_1 )</code>|
SetPositionInPixels|<code>AnimatedImageStrip.SetPositionInPixels( float float_1, float float_2, float float_3 )</code>|
Data|<code>AnimatedImageStrip.Data( js_raw_args js_raw_args_1 )</code>|
debug.description|<code>AnimatedImageStrip.debug.description( js_raw_args js_raw_args_1 )</code>|
SetSendScrollPositionChangedEvents|<code>AnimatedImageStrip.SetSendScrollPositionChangedEvents( boolean boolean_1 )</code>|
SetImage|<code>AnimatedImageStrip.SetImage( cstring cstring_1 )</code>|
SetImageFromPanel|<code>AnimatedImageStrip.SetImageFromPanel( unknown_variant_type unknown_variant_type_1, boolean boolean_2 )</code>|
SetScaling|<code>AnimatedImageStrip.SetScaling( cstring cstring_1 )</code>|
StartAnimating|<code>AnimatedImageStrip.StartAnimating()</code>|
StopAnimating|<code>AnimatedImageStrip.StopAnimating()</code>|
GetFrameCount|<code>AnimatedImageStrip.GetFrameCount()</code>|
StopAnimatingAtFrame|<code>AnimatedImageStrip.StopAnimatingAtFrame( integer integer_1 )</code>|
SetPanelEvent|<code>AnimatedImageStrip.SetPanelEvent( js_raw_args js_raw_args_1 )</code>|
RunScriptInPanelContext|<code>AnimatedImageStrip.RunScriptInPanelContext( js_raw_args js_raw_args_1 )</code>|
rememberchildfocus|<code>AnimatedImageStrip.rememberchildfocus( boolean boolean_1 )</code>|
paneltype|<code>AnimatedImageStrip.paneltype()</code>|


# DOTACrownfallPurchaseButton
Function|Signature|Description
--|--|--
visible|<code>DOTACrownfallPurchaseButton.visible( boolean boolean_1 )</code>|
enabled|<code>DOTACrownfallPurchaseButton.enabled( boolean boolean_1 )</code>|
checked|<code>DOTACrownfallPurchaseButton.checked( boolean boolean_1 )</code>|
defaultfocus|<code>DOTACrownfallPurchaseButton.defaultfocus( cstring cstring_1 )</code>|
inputnamespace|<code>DOTACrownfallPurchaseButton.inputnamespace( cstring cstring_1 )</code>|
hittest|<code>DOTACrownfallPurchaseButton.hittest( boolean boolean_1 )</code>|
hittestchildren|<code>DOTACrownfallPurchaseButton.hittestchildren( boolean boolean_1 )</code>|
tabindex|<code>DOTACrownfallPurchaseButton.tabindex( float float_1 )</code>|
selectionpos_x|<code>DOTACrownfallPurchaseButton.selectionpos_x( float float_1 )</code>|
selectionpos_y|<code>DOTACrownfallPurchaseButton.selectionpos_y( float float_1 )</code>|
type|<code>DOTACrownfallPurchaseButton.type()</code>|
id|<code>DOTACrownfallPurchaseButton.id()</code>|
layoutfile|<code>DOTACrownfallPurchaseButton.layoutfile()</code>|
contentwidth|<code>DOTACrownfallPurchaseButton.contentwidth()</code>|
contentheight|<code>DOTACrownfallPurchaseButton.contentheight()</code>|
desiredlayoutwidth|<code>DOTACrownfallPurchaseButton.desiredlayoutwidth()</code>|
desiredlayoutheight|<code>DOTACrownfallPurchaseButton.desiredlayoutheight()</code>|
actuallayoutwidth|<code>DOTACrownfallPurchaseButton.actuallayoutwidth()</code>|
actuallayoutheight|<code>DOTACrownfallPurchaseButton.actuallayoutheight()</code>|
actualxoffset|<code>DOTACrownfallPurchaseButton.actualxoffset()</code>|
actualyoffset|<code>DOTACrownfallPurchaseButton.actualyoffset()</code>|
scrolloffset_y|<code>DOTACrownfallPurchaseButton.scrolloffset_y()</code>|
scrolloffset_x|<code>DOTACrownfallPurchaseButton.scrolloffset_x()</code>|
actualuiscale_y|<code>DOTACrownfallPurchaseButton.actualuiscale_y()</code>|
actualuiscale_x|<code>DOTACrownfallPurchaseButton.actualuiscale_x()</code>|
style|<code>DOTACrownfallPurchaseButton.style()</code>|
AddClass|<code>DOTACrownfallPurchaseButton.AddClass( cstring cstring_1 )</code>|
RemoveClass|<code>DOTACrownfallPurchaseButton.RemoveClass( cstring cstring_1 )</code>|
BHasClass|<code>DOTACrownfallPurchaseButton.BHasClass( cstring cstring_1 )</code>|
BAscendantHasClass|<code>DOTACrownfallPurchaseButton.BAscendantHasClass( cstring cstring_1 )</code>|
SetHasClass|<code>DOTACrownfallPurchaseButton.SetHasClass( cstring cstring_1, boolean boolean_2 )</code>|
ToggleClass|<code>DOTACrownfallPurchaseButton.ToggleClass( cstring cstring_1 )</code>|
SwitchClass|<code>DOTACrownfallPurchaseButton.SwitchClass( cstring cstring_1, cstring cstring_2 )</code>|
TriggerClass|<code>DOTACrownfallPurchaseButton.TriggerClass( cstring cstring_1 )</code>|
ClearPanelEvent|<code>DOTACrownfallPurchaseButton.ClearPanelEvent( cstring cstring_1 )</code>|
SetDraggable|<code>DOTACrownfallPurchaseButton.SetDraggable( boolean boolean_1 )</code>|
IsDraggable|<code>DOTACrownfallPurchaseButton.IsDraggable()</code>|
IsSizeValid|<code>DOTACrownfallPurchaseButton.IsSizeValid()</code>|
GetChildCount|<code>DOTACrownfallPurchaseButton.GetChildCount()</code>|
GetChild|<code>DOTACrownfallPurchaseButton.GetChild( integer integer_1 )</code>|
GetChildIndex|<code>DOTACrownfallPurchaseButton.GetChildIndex( unknown_variant_type unknown_variant_type_1 )</code>|
Children|<code>DOTACrownfallPurchaseButton.Children()</code>|
FindChildrenWithClassTraverse|<code>DOTACrownfallPurchaseButton.FindChildrenWithClassTraverse( cstring cstring_1 )</code>|
GetParent|<code>DOTACrownfallPurchaseButton.GetParent()</code>|
SetParent|<code>DOTACrownfallPurchaseButton.SetParent( unknown_variant_type unknown_variant_type_1 )</code>|
FindChild|<code>DOTACrownfallPurchaseButton.FindChild( cstring cstring_1 )</code>|
FindChildTraverse|<code>DOTACrownfallPurchaseButton.FindChildTraverse( cstring cstring_1 )</code>|
FindChildInLayoutFile|<code>DOTACrownfallPurchaseButton.FindChildInLayoutFile( cstring cstring_1 )</code>|
FindPanelInLayoutFile|<code>DOTACrownfallPurchaseButton.FindPanelInLayoutFile( cstring cstring_1 )</code>|
FindAncestor|<code>DOTACrownfallPurchaseButton.FindAncestor( cstring cstring_1 )</code>|
RemoveAndDeleteChildren|<code>DOTACrownfallPurchaseButton.RemoveAndDeleteChildren()</code>|
MoveChildBefore|<code>DOTACrownfallPurchaseButton.MoveChildBefore( unknown_variant_type unknown_variant_type_1, unknown_variant_type unknown_variant_type_2 )</code>|
MoveChildAfter|<code>DOTACrownfallPurchaseButton.MoveChildAfter( unknown_variant_type unknown_variant_type_1, unknown_variant_type unknown_variant_type_2 )</code>|
GetPositionWithinWindow|<code>DOTACrownfallPurchaseButton.GetPositionWithinWindow()</code>|
GetPositionWithinAncestor|<code>DOTACrownfallPurchaseButton.GetPositionWithinAncestor( unknown_variant_type unknown_variant_type_1 )</code>|
GetPosition|<code>DOTACrownfallPurchaseButton.GetPosition( boolean boolean_1 )</code>|
ApplyStyles|<code>DOTACrownfallPurchaseButton.ApplyStyles( boolean boolean_1 )</code>|
ClearPropertyFromCode|<code>DOTACrownfallPurchaseButton.ClearPropertyFromCode( unknown_variant_type unknown_variant_type_1 )</code>|
DeleteAsync|<code>DOTACrownfallPurchaseButton.DeleteAsync( float float_1 )</code>|
BIsTransparent|<code>DOTACrownfallPurchaseButton.BIsTransparent()</code>|
BAcceptsInput|<code>DOTACrownfallPurchaseButton.BAcceptsInput()</code>|
BAcceptsFocus|<code>DOTACrownfallPurchaseButton.BAcceptsFocus()</code>|
SetFocus|<code>DOTACrownfallPurchaseButton.SetFocus()</code>|
UpdateFocusInContext|<code>DOTACrownfallPurchaseButton.UpdateFocusInContext()</code>|
BHasHoverStyle|<code>DOTACrownfallPurchaseButton.BHasHoverStyle()</code>|
SetAcceptsInput|<code>DOTACrownfallPurchaseButton.SetAcceptsInput( boolean boolean_1 )</code>|
SetAcceptsFocus|<code>DOTACrownfallPurchaseButton.SetAcceptsFocus( boolean boolean_1 )</code>|
SetDisableFocusOnMouseDown|<code>DOTACrownfallPurchaseButton.SetDisableFocusOnMouseDown( boolean boolean_1 )</code>|
BHasKeyFocus|<code>DOTACrownfallPurchaseButton.BHasKeyFocus()</code>|
SetScrollParentToFitWhenFocused|<code>DOTACrownfallPurchaseButton.SetScrollParentToFitWhenFocused( boolean boolean_1 )</code>|
BScrollParentToFitWhenFocused|<code>DOTACrownfallPurchaseButton.BScrollParentToFitWhenFocused()</code>|
IsSelected|<code>DOTACrownfallPurchaseButton.IsSelected()</code>|
BHasDescendantKeyFocus|<code>DOTACrownfallPurchaseButton.BHasDescendantKeyFocus()</code>|
BLoadLayout|<code>DOTACrownfallPurchaseButton.BLoadLayout( cstring cstring_1, boolean boolean_2, boolean boolean_3 )</code>|
BLoadLayoutSnippet|<code>DOTACrownfallPurchaseButton.BLoadLayoutSnippet( cstring cstring_1 )</code>|
BHasLayoutSnippet|<code>DOTACrownfallPurchaseButton.BHasLayoutSnippet( cstring cstring_1 )</code>|
BGetSnippetNames|<code>DOTACrownfallPurchaseButton.BGetSnippetNames( unknown_variant_type unknown_variant_type_1 )</code>|
SetTopOfInputContext|<code>DOTACrownfallPurchaseButton.SetTopOfInputContext( boolean boolean_1 )</code>|
SetDialogVariable|<code>DOTACrownfallPurchaseButton.SetDialogVariable( cstring cstring_1, cstring cstring_2 )</code>|
SetDialogVariableInt|<code>DOTACrownfallPurchaseButton.SetDialogVariableInt( cstring cstring_1, integer integer_2 )</code>|
SetDialogVariableTime|<code>DOTACrownfallPurchaseButton.SetDialogVariableTime( cstring cstring_1, int64 int64_2 )</code>|
SetDialogVariableLocString|<code>DOTACrownfallPurchaseButton.SetDialogVariableLocString( cstring cstring_1, cstring cstring_2 )</code>|
SetDialogVariablePluralLocStringInt|<code>DOTACrownfallPurchaseButton.SetDialogVariablePluralLocStringInt( cstring cstring_1, cstring cstring_2, int64 int64_3 )</code>|
ScrollToTop|<code>DOTACrownfallPurchaseButton.ScrollToTop()</code>|
ScrollToBottom|<code>DOTACrownfallPurchaseButton.ScrollToBottom()</code>|
ScrollToLeftEdge|<code>DOTACrownfallPurchaseButton.ScrollToLeftEdge()</code>|
ScrollToRightEdge|<code>DOTACrownfallPurchaseButton.ScrollToRightEdge()</code>|
ScrollParentToMakePanelFit|<code>DOTACrownfallPurchaseButton.ScrollParentToMakePanelFit( unknown_variant_type unknown_variant_type_1, boolean boolean_2 )</code>|
ScrollToFitRegion|<code>DOTACrownfallPurchaseButton.ScrollToFitRegion( float float_1, float float_2, float float_3, float float_4, unknown_variant_type unknown_variant_type_5, boolean boolean_6, boolean boolean_7 )</code>|
BCanSeeInParentScroll|<code>DOTACrownfallPurchaseButton.BCanSeeInParentScroll()</code>|
GetAttributeInt|<code>DOTACrownfallPurchaseButton.GetAttributeInt( cstring cstring_1, integer integer_2 )</code>|
GetAttributeString|<code>DOTACrownfallPurchaseButton.GetAttributeString( cstring cstring_1, cstring cstring_2 )</code>|
GetAttributeUInt32|<code>DOTACrownfallPurchaseButton.GetAttributeUInt32( cstring cstring_1, unsigned unsigned_2 )</code>|
SetAttributeInt|<code>DOTACrownfallPurchaseButton.SetAttributeInt( cstring cstring_1, integer integer_2 )</code>|
SetAttributeString|<code>DOTACrownfallPurchaseButton.SetAttributeString( cstring cstring_1, cstring cstring_2 )</code>|
SetAttributeUInt32|<code>DOTACrownfallPurchaseButton.SetAttributeUInt32( cstring cstring_1, unsigned unsigned_2 )</code>|
SetInputNamespace|<code>DOTACrownfallPurchaseButton.SetInputNamespace( cstring cstring_1 )</code>|
RegisterForReadyEvents|<code>DOTACrownfallPurchaseButton.RegisterForReadyEvents( boolean boolean_1 )</code>|
BReadyForDisplay|<code>DOTACrownfallPurchaseButton.BReadyForDisplay()</code>|
SetReadyForDisplay|<code>DOTACrownfallPurchaseButton.SetReadyForDisplay( boolean boolean_1 )</code>|
SetPositionInPixels|<code>DOTACrownfallPurchaseButton.SetPositionInPixels( float float_1, float float_2, float float_3 )</code>|
Data|<code>DOTACrownfallPurchaseButton.Data( js_raw_args js_raw_args_1 )</code>|
debug.description|<code>DOTACrownfallPurchaseButton.debug.description( js_raw_args js_raw_args_1 )</code>|
SetSendScrollPositionChangedEvents|<code>DOTACrownfallPurchaseButton.SetSendScrollPositionChangedEvents( boolean boolean_1 )</code>|
isStoreItemFocused|<code>DOTACrownfallPurchaseButton.isStoreItemFocused( boolean boolean_1 )</code>|
isDiscountModeActive|<code>DOTACrownfallPurchaseButton.isDiscountModeActive( boolean boolean_1 )</code>|
SetPanelEvent|<code>DOTACrownfallPurchaseButton.SetPanelEvent( js_raw_args js_raw_args_1 )</code>|
RunScriptInPanelContext|<code>DOTACrownfallPurchaseButton.RunScriptInPanelContext( js_raw_args js_raw_args_1 )</code>|
rememberchildfocus|<code>DOTACrownfallPurchaseButton.rememberchildfocus( boolean boolean_1 )</code>|
paneltype|<code>DOTACrownfallPurchaseButton.paneltype()</code>|


# MoviePanel
Function|Signature|Description
--|--|--
visible|<code>MoviePanel.visible( boolean boolean_1 )</code>|
enabled|<code>MoviePanel.enabled( boolean boolean_1 )</code>|
checked|<code>MoviePanel.checked( boolean boolean_1 )</code>|
defaultfocus|<code>MoviePanel.defaultfocus( cstring cstring_1 )</code>|
inputnamespace|<code>MoviePanel.inputnamespace( cstring cstring_1 )</code>|
hittest|<code>MoviePanel.hittest( boolean boolean_1 )</code>|
hittestchildren|<code>MoviePanel.hittestchildren( boolean boolean_1 )</code>|
tabindex|<code>MoviePanel.tabindex( float float_1 )</code>|
selectionpos_x|<code>MoviePanel.selectionpos_x( float float_1 )</code>|
selectionpos_y|<code>MoviePanel.selectionpos_y( float float_1 )</code>|
type|<code>MoviePanel.type()</code>|
id|<code>MoviePanel.id()</code>|
layoutfile|<code>MoviePanel.layoutfile()</code>|
contentwidth|<code>MoviePanel.contentwidth()</code>|
contentheight|<code>MoviePanel.contentheight()</code>|
desiredlayoutwidth|<code>MoviePanel.desiredlayoutwidth()</code>|
desiredlayoutheight|<code>MoviePanel.desiredlayoutheight()</code>|
actuallayoutwidth|<code>MoviePanel.actuallayoutwidth()</code>|
actuallayoutheight|<code>MoviePanel.actuallayoutheight()</code>|
actualxoffset|<code>MoviePanel.actualxoffset()</code>|
actualyoffset|<code>MoviePanel.actualyoffset()</code>|
scrolloffset_y|<code>MoviePanel.scrolloffset_y()</code>|
scrolloffset_x|<code>MoviePanel.scrolloffset_x()</code>|
actualuiscale_y|<code>MoviePanel.actualuiscale_y()</code>|
actualuiscale_x|<code>MoviePanel.actualuiscale_x()</code>|
style|<code>MoviePanel.style()</code>|
AddClass|<code>MoviePanel.AddClass( cstring cstring_1 )</code>|
RemoveClass|<code>MoviePanel.RemoveClass( cstring cstring_1 )</code>|
BHasClass|<code>MoviePanel.BHasClass( cstring cstring_1 )</code>|
BAscendantHasClass|<code>MoviePanel.BAscendantHasClass( cstring cstring_1 )</code>|
SetHasClass|<code>MoviePanel.SetHasClass( cstring cstring_1, boolean boolean_2 )</code>|
ToggleClass|<code>MoviePanel.ToggleClass( cstring cstring_1 )</code>|
SwitchClass|<code>MoviePanel.SwitchClass( cstring cstring_1, cstring cstring_2 )</code>|
TriggerClass|<code>MoviePanel.TriggerClass( cstring cstring_1 )</code>|
ClearPanelEvent|<code>MoviePanel.ClearPanelEvent( cstring cstring_1 )</code>|
SetDraggable|<code>MoviePanel.SetDraggable( boolean boolean_1 )</code>|
IsDraggable|<code>MoviePanel.IsDraggable()</code>|
IsSizeValid|<code>MoviePanel.IsSizeValid()</code>|
GetChildCount|<code>MoviePanel.GetChildCount()</code>|
GetChild|<code>MoviePanel.GetChild( integer integer_1 )</code>|
GetChildIndex|<code>MoviePanel.GetChildIndex( unknown_variant_type unknown_variant_type_1 )</code>|
Children|<code>MoviePanel.Children()</code>|
FindChildrenWithClassTraverse|<code>MoviePanel.FindChildrenWithClassTraverse( cstring cstring_1 )</code>|
GetParent|<code>MoviePanel.GetParent()</code>|
SetParent|<code>MoviePanel.SetParent( unknown_variant_type unknown_variant_type_1 )</code>|
FindChild|<code>MoviePanel.FindChild( cstring cstring_1 )</code>|
FindChildTraverse|<code>MoviePanel.FindChildTraverse( cstring cstring_1 )</code>|
FindChildInLayoutFile|<code>MoviePanel.FindChildInLayoutFile( cstring cstring_1 )</code>|
FindPanelInLayoutFile|<code>MoviePanel.FindPanelInLayoutFile( cstring cstring_1 )</code>|
FindAncestor|<code>MoviePanel.FindAncestor( cstring cstring_1 )</code>|
RemoveAndDeleteChildren|<code>MoviePanel.RemoveAndDeleteChildren()</code>|
MoveChildBefore|<code>MoviePanel.MoveChildBefore( unknown_variant_type unknown_variant_type_1, unknown_variant_type unknown_variant_type_2 )</code>|
MoveChildAfter|<code>MoviePanel.MoveChildAfter( unknown_variant_type unknown_variant_type_1, unknown_variant_type unknown_variant_type_2 )</code>|
GetPositionWithinWindow|<code>MoviePanel.GetPositionWithinWindow()</code>|
GetPositionWithinAncestor|<code>MoviePanel.GetPositionWithinAncestor( unknown_variant_type unknown_variant_type_1 )</code>|
GetPosition|<code>MoviePanel.GetPosition( boolean boolean_1 )</code>|
ApplyStyles|<code>MoviePanel.ApplyStyles( boolean boolean_1 )</code>|
ClearPropertyFromCode|<code>MoviePanel.ClearPropertyFromCode( unknown_variant_type unknown_variant_type_1 )</code>|
DeleteAsync|<code>MoviePanel.DeleteAsync( float float_1 )</code>|
BIsTransparent|<code>MoviePanel.BIsTransparent()</code>|
BAcceptsInput|<code>MoviePanel.BAcceptsInput()</code>|
BAcceptsFocus|<code>MoviePanel.BAcceptsFocus()</code>|
SetFocus|<code>MoviePanel.SetFocus()</code>|
UpdateFocusInContext|<code>MoviePanel.UpdateFocusInContext()</code>|
BHasHoverStyle|<code>MoviePanel.BHasHoverStyle()</code>|
SetAcceptsInput|<code>MoviePanel.SetAcceptsInput( boolean boolean_1 )</code>|
SetAcceptsFocus|<code>MoviePanel.SetAcceptsFocus( boolean boolean_1 )</code>|
SetDisableFocusOnMouseDown|<code>MoviePanel.SetDisableFocusOnMouseDown( boolean boolean_1 )</code>|
BHasKeyFocus|<code>MoviePanel.BHasKeyFocus()</code>|
SetScrollParentToFitWhenFocused|<code>MoviePanel.SetScrollParentToFitWhenFocused( boolean boolean_1 )</code>|
BScrollParentToFitWhenFocused|<code>MoviePanel.BScrollParentToFitWhenFocused()</code>|
IsSelected|<code>MoviePanel.IsSelected()</code>|
BHasDescendantKeyFocus|<code>MoviePanel.BHasDescendantKeyFocus()</code>|
BLoadLayout|<code>MoviePanel.BLoadLayout( cstring cstring_1, boolean boolean_2, boolean boolean_3 )</code>|
BLoadLayoutSnippet|<code>MoviePanel.BLoadLayoutSnippet( cstring cstring_1 )</code>|
BHasLayoutSnippet|<code>MoviePanel.BHasLayoutSnippet( cstring cstring_1 )</code>|
BGetSnippetNames|<code>MoviePanel.BGetSnippetNames( unknown_variant_type unknown_variant_type_1 )</code>|
SetTopOfInputContext|<code>MoviePanel.SetTopOfInputContext( boolean boolean_1 )</code>|
SetDialogVariable|<code>MoviePanel.SetDialogVariable( cstring cstring_1, cstring cstring_2 )</code>|
SetDialogVariableInt|<code>MoviePanel.SetDialogVariableInt( cstring cstring_1, integer integer_2 )</code>|
SetDialogVariableTime|<code>MoviePanel.SetDialogVariableTime( cstring cstring_1, int64 int64_2 )</code>|
SetDialogVariableLocString|<code>MoviePanel.SetDialogVariableLocString( cstring cstring_1, cstring cstring_2 )</code>|
SetDialogVariablePluralLocStringInt|<code>MoviePanel.SetDialogVariablePluralLocStringInt( cstring cstring_1, cstring cstring_2, int64 int64_3 )</code>|
ScrollToTop|<code>MoviePanel.ScrollToTop()</code>|
ScrollToBottom|<code>MoviePanel.ScrollToBottom()</code>|
ScrollToLeftEdge|<code>MoviePanel.ScrollToLeftEdge()</code>|
ScrollToRightEdge|<code>MoviePanel.ScrollToRightEdge()</code>|
ScrollParentToMakePanelFit|<code>MoviePanel.ScrollParentToMakePanelFit( unknown_variant_type unknown_variant_type_1, boolean boolean_2 )</code>|
ScrollToFitRegion|<code>MoviePanel.ScrollToFitRegion( float float_1, float float_2, float float_3, float float_4, unknown_variant_type unknown_variant_type_5, boolean boolean_6, boolean boolean_7 )</code>|
BCanSeeInParentScroll|<code>MoviePanel.BCanSeeInParentScroll()</code>|
GetAttributeInt|<code>MoviePanel.GetAttributeInt( cstring cstring_1, integer integer_2 )</code>|
GetAttributeString|<code>MoviePanel.GetAttributeString( cstring cstring_1, cstring cstring_2 )</code>|
GetAttributeUInt32|<code>MoviePanel.GetAttributeUInt32( cstring cstring_1, unsigned unsigned_2 )</code>|
SetAttributeInt|<code>MoviePanel.SetAttributeInt( cstring cstring_1, integer integer_2 )</code>|
SetAttributeString|<code>MoviePanel.SetAttributeString( cstring cstring_1, cstring cstring_2 )</code>|
SetAttributeUInt32|<code>MoviePanel.SetAttributeUInt32( cstring cstring_1, unsigned unsigned_2 )</code>|
SetInputNamespace|<code>MoviePanel.SetInputNamespace( cstring cstring_1 )</code>|
RegisterForReadyEvents|<code>MoviePanel.RegisterForReadyEvents( boolean boolean_1 )</code>|
BReadyForDisplay|<code>MoviePanel.BReadyForDisplay()</code>|
SetReadyForDisplay|<code>MoviePanel.SetReadyForDisplay( boolean boolean_1 )</code>|
SetPositionInPixels|<code>MoviePanel.SetPositionInPixels( float float_1, float float_2, float float_3 )</code>|
Data|<code>MoviePanel.Data( js_raw_args js_raw_args_1 )</code>|
debug.description|<code>MoviePanel.debug.description( js_raw_args js_raw_args_1 )</code>|
SetSendScrollPositionChangedEvents|<code>MoviePanel.SetSendScrollPositionChangedEvents( boolean boolean_1 )</code>|
SetPanelEvent|<code>MoviePanel.SetPanelEvent( js_raw_args js_raw_args_1 )</code>|
RunScriptInPanelContext|<code>MoviePanel.RunScriptInPanelContext( js_raw_args js_raw_args_1 )</code>|
rememberchildfocus|<code>MoviePanel.rememberchildfocus( boolean boolean_1 )</code>|
paneltype|<code>MoviePanel.paneltype()</code>|


# DemoModeButton
Function|Signature|Description
--|--|--
visible|<code>DemoModeButton.visible( boolean boolean_1 )</code>|
enabled|<code>DemoModeButton.enabled( boolean boolean_1 )</code>|
checked|<code>DemoModeButton.checked( boolean boolean_1 )</code>|
defaultfocus|<code>DemoModeButton.defaultfocus( cstring cstring_1 )</code>|
inputnamespace|<code>DemoModeButton.inputnamespace( cstring cstring_1 )</code>|
hittest|<code>DemoModeButton.hittest( boolean boolean_1 )</code>|
hittestchildren|<code>DemoModeButton.hittestchildren( boolean boolean_1 )</code>|
tabindex|<code>DemoModeButton.tabindex( float float_1 )</code>|
selectionpos_x|<code>DemoModeButton.selectionpos_x( float float_1 )</code>|
selectionpos_y|<code>DemoModeButton.selectionpos_y( float float_1 )</code>|
type|<code>DemoModeButton.type()</code>|
id|<code>DemoModeButton.id()</code>|
layoutfile|<code>DemoModeButton.layoutfile()</code>|
contentwidth|<code>DemoModeButton.contentwidth()</code>|
contentheight|<code>DemoModeButton.contentheight()</code>|
desiredlayoutwidth|<code>DemoModeButton.desiredlayoutwidth()</code>|
desiredlayoutheight|<code>DemoModeButton.desiredlayoutheight()</code>|
actuallayoutwidth|<code>DemoModeButton.actuallayoutwidth()</code>|
actuallayoutheight|<code>DemoModeButton.actuallayoutheight()</code>|
actualxoffset|<code>DemoModeButton.actualxoffset()</code>|
actualyoffset|<code>DemoModeButton.actualyoffset()</code>|
scrolloffset_y|<code>DemoModeButton.scrolloffset_y()</code>|
scrolloffset_x|<code>DemoModeButton.scrolloffset_x()</code>|
actualuiscale_y|<code>DemoModeButton.actualuiscale_y()</code>|
actualuiscale_x|<code>DemoModeButton.actualuiscale_x()</code>|
style|<code>DemoModeButton.style()</code>|
AddClass|<code>DemoModeButton.AddClass( cstring cstring_1 )</code>|
RemoveClass|<code>DemoModeButton.RemoveClass( cstring cstring_1 )</code>|
BHasClass|<code>DemoModeButton.BHasClass( cstring cstring_1 )</code>|
BAscendantHasClass|<code>DemoModeButton.BAscendantHasClass( cstring cstring_1 )</code>|
SetHasClass|<code>DemoModeButton.SetHasClass( cstring cstring_1, boolean boolean_2 )</code>|
ToggleClass|<code>DemoModeButton.ToggleClass( cstring cstring_1 )</code>|
SwitchClass|<code>DemoModeButton.SwitchClass( cstring cstring_1, cstring cstring_2 )</code>|
TriggerClass|<code>DemoModeButton.TriggerClass( cstring cstring_1 )</code>|
ClearPanelEvent|<code>DemoModeButton.ClearPanelEvent( cstring cstring_1 )</code>|
SetDraggable|<code>DemoModeButton.SetDraggable( boolean boolean_1 )</code>|
IsDraggable|<code>DemoModeButton.IsDraggable()</code>|
IsSizeValid|<code>DemoModeButton.IsSizeValid()</code>|
GetChildCount|<code>DemoModeButton.GetChildCount()</code>|
GetChild|<code>DemoModeButton.GetChild( integer integer_1 )</code>|
GetChildIndex|<code>DemoModeButton.GetChildIndex( unknown_variant_type unknown_variant_type_1 )</code>|
Children|<code>DemoModeButton.Children()</code>|
FindChildrenWithClassTraverse|<code>DemoModeButton.FindChildrenWithClassTraverse( cstring cstring_1 )</code>|
GetParent|<code>DemoModeButton.GetParent()</code>|
SetParent|<code>DemoModeButton.SetParent( unknown_variant_type unknown_variant_type_1 )</code>|
FindChild|<code>DemoModeButton.FindChild( cstring cstring_1 )</code>|
FindChildTraverse|<code>DemoModeButton.FindChildTraverse( cstring cstring_1 )</code>|
FindChildInLayoutFile|<code>DemoModeButton.FindChildInLayoutFile( cstring cstring_1 )</code>|
FindPanelInLayoutFile|<code>DemoModeButton.FindPanelInLayoutFile( cstring cstring_1 )</code>|
FindAncestor|<code>DemoModeButton.FindAncestor( cstring cstring_1 )</code>|
RemoveAndDeleteChildren|<code>DemoModeButton.RemoveAndDeleteChildren()</code>|
MoveChildBefore|<code>DemoModeButton.MoveChildBefore( unknown_variant_type unknown_variant_type_1, unknown_variant_type unknown_variant_type_2 )</code>|
MoveChildAfter|<code>DemoModeButton.MoveChildAfter( unknown_variant_type unknown_variant_type_1, unknown_variant_type unknown_variant_type_2 )</code>|
GetPositionWithinWindow|<code>DemoModeButton.GetPositionWithinWindow()</code>|
GetPositionWithinAncestor|<code>DemoModeButton.GetPositionWithinAncestor( unknown_variant_type unknown_variant_type_1 )</code>|
GetPosition|<code>DemoModeButton.GetPosition( boolean boolean_1 )</code>|
ApplyStyles|<code>DemoModeButton.ApplyStyles( boolean boolean_1 )</code>|
ClearPropertyFromCode|<code>DemoModeButton.ClearPropertyFromCode( unknown_variant_type unknown_variant_type_1 )</code>|
DeleteAsync|<code>DemoModeButton.DeleteAsync( float float_1 )</code>|
BIsTransparent|<code>DemoModeButton.BIsTransparent()</code>|
BAcceptsInput|<code>DemoModeButton.BAcceptsInput()</code>|
BAcceptsFocus|<code>DemoModeButton.BAcceptsFocus()</code>|
SetFocus|<code>DemoModeButton.SetFocus()</code>|
UpdateFocusInContext|<code>DemoModeButton.UpdateFocusInContext()</code>|
BHasHoverStyle|<code>DemoModeButton.BHasHoverStyle()</code>|
SetAcceptsInput|<code>DemoModeButton.SetAcceptsInput( boolean boolean_1 )</code>|
SetAcceptsFocus|<code>DemoModeButton.SetAcceptsFocus( boolean boolean_1 )</code>|
SetDisableFocusOnMouseDown|<code>DemoModeButton.SetDisableFocusOnMouseDown( boolean boolean_1 )</code>|
BHasKeyFocus|<code>DemoModeButton.BHasKeyFocus()</code>|
SetScrollParentToFitWhenFocused|<code>DemoModeButton.SetScrollParentToFitWhenFocused( boolean boolean_1 )</code>|
BScrollParentToFitWhenFocused|<code>DemoModeButton.BScrollParentToFitWhenFocused()</code>|
IsSelected|<code>DemoModeButton.IsSelected()</code>|
BHasDescendantKeyFocus|<code>DemoModeButton.BHasDescendantKeyFocus()</code>|
BLoadLayout|<code>DemoModeButton.BLoadLayout( cstring cstring_1, boolean boolean_2, boolean boolean_3 )</code>|
BLoadLayoutSnippet|<code>DemoModeButton.BLoadLayoutSnippet( cstring cstring_1 )</code>|
BHasLayoutSnippet|<code>DemoModeButton.BHasLayoutSnippet( cstring cstring_1 )</code>|
BGetSnippetNames|<code>DemoModeButton.BGetSnippetNames( unknown_variant_type unknown_variant_type_1 )</code>|
SetTopOfInputContext|<code>DemoModeButton.SetTopOfInputContext( boolean boolean_1 )</code>|
SetDialogVariable|<code>DemoModeButton.SetDialogVariable( cstring cstring_1, cstring cstring_2 )</code>|
SetDialogVariableInt|<code>DemoModeButton.SetDialogVariableInt( cstring cstring_1, integer integer_2 )</code>|
SetDialogVariableTime|<code>DemoModeButton.SetDialogVariableTime( cstring cstring_1, int64 int64_2 )</code>|
SetDialogVariableLocString|<code>DemoModeButton.SetDialogVariableLocString( cstring cstring_1, cstring cstring_2 )</code>|
SetDialogVariablePluralLocStringInt|<code>DemoModeButton.SetDialogVariablePluralLocStringInt( cstring cstring_1, cstring cstring_2, int64 int64_3 )</code>|
ScrollToTop|<code>DemoModeButton.ScrollToTop()</code>|
ScrollToBottom|<code>DemoModeButton.ScrollToBottom()</code>|
ScrollToLeftEdge|<code>DemoModeButton.ScrollToLeftEdge()</code>|
ScrollToRightEdge|<code>DemoModeButton.ScrollToRightEdge()</code>|
ScrollParentToMakePanelFit|<code>DemoModeButton.ScrollParentToMakePanelFit( unknown_variant_type unknown_variant_type_1, boolean boolean_2 )</code>|
ScrollToFitRegion|<code>DemoModeButton.ScrollToFitRegion( float float_1, float float_2, float float_3, float float_4, unknown_variant_type unknown_variant_type_5, boolean boolean_6, boolean boolean_7 )</code>|
BCanSeeInParentScroll|<code>DemoModeButton.BCanSeeInParentScroll()</code>|
GetAttributeInt|<code>DemoModeButton.GetAttributeInt( cstring cstring_1, integer integer_2 )</code>|
GetAttributeString|<code>DemoModeButton.GetAttributeString( cstring cstring_1, cstring cstring_2 )</code>|
GetAttributeUInt32|<code>DemoModeButton.GetAttributeUInt32( cstring cstring_1, unsigned unsigned_2 )</code>|
SetAttributeInt|<code>DemoModeButton.SetAttributeInt( cstring cstring_1, integer integer_2 )</code>|
SetAttributeString|<code>DemoModeButton.SetAttributeString( cstring cstring_1, cstring cstring_2 )</code>|
SetAttributeUInt32|<code>DemoModeButton.SetAttributeUInt32( cstring cstring_1, unsigned unsigned_2 )</code>|
SetInputNamespace|<code>DemoModeButton.SetInputNamespace( cstring cstring_1 )</code>|
RegisterForReadyEvents|<code>DemoModeButton.RegisterForReadyEvents( boolean boolean_1 )</code>|
BReadyForDisplay|<code>DemoModeButton.BReadyForDisplay()</code>|
SetReadyForDisplay|<code>DemoModeButton.SetReadyForDisplay( boolean boolean_1 )</code>|
SetPositionInPixels|<code>DemoModeButton.SetPositionInPixels( float float_1, float float_2, float float_3 )</code>|
Data|<code>DemoModeButton.Data( js_raw_args js_raw_args_1 )</code>|
debug.description|<code>DemoModeButton.debug.description( js_raw_args js_raw_args_1 )</code>|
SetSendScrollPositionChangedEvents|<code>DemoModeButton.SetSendScrollPositionChangedEvents( boolean boolean_1 )</code>|
SetPanelEvent|<code>DemoModeButton.SetPanelEvent( js_raw_args js_raw_args_1 )</code>|
RunScriptInPanelContext|<code>DemoModeButton.RunScriptInPanelContext( js_raw_args js_raw_args_1 )</code>|
rememberchildfocus|<code>DemoModeButton.rememberchildfocus( boolean boolean_1 )</code>|
paneltype|<code>DemoModeButton.paneltype()</code>|

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
dotaunitorder_t.DOTA_UNIT_ORDER_CAST_TOGGLE_ALT|40|
dotaunitorder_t.DOTA_UNIT_ORDER_CONSUME_ITEM|41|

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
DOTA_OVERHEAD_ALERT.OVERHEAD_ALERT_FORCE_MISS|25|

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
DOTA_UNIT_TARGET_TYPE.DOTA_UNIT_TARGET_HEROES_AND_CREEPS|19|

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
DOTA_ABILITY_BEHAVIOR.DOTA_ABILITY_BEHAVIOR_ALT_CASTABLE|1099511627776|
DOTA_ABILITY_BEHAVIOR.DOTA_ABILITY_BEHAVIOR_BREAK_DISABLES|2199023255552|
DOTA_ABILITY_BEHAVIOR.DOTA_ABILITY_BEHAVIOR_SKIP_FOR_KEYBINDS|4398046511104|
DOTA_ABILITY_BEHAVIOR.DOTA_ABILITY_BEHAVIOR_INNATE_UI|8796093022208|

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
EDOTA_ModifyXP_Reason.DOTA_ModifyXP_CatchUp|6|
EDOTA_ModifyXP_Reason.DOTA_ModifyXP_HeroAbility|7|
EDOTA_ModifyXP_Reason.DOTA_ModifyXP_MAX|8|

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
DOTASlotType_t.DOTA_LOADOUT_TYPE_TORMENTOR|96|
DOTASlotType_t.DOTA_LOADOUT_TYPE_ANCIENT|97|
DOTASlotType_t.DOTA_PLAYER_LOADOUT_START|67|
DOTASlotType_t.DOTA_PLAYER_LOADOUT_END|97|
DOTASlotType_t.DOTA_LOADOUT_TYPE_NONE|98|
DOTASlotType_t.DOTA_LOADOUT_TYPE_COUNT|99|

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
modifierfunction.MODIFIER_PROPERTY_MIN_PHYSICAL_ARMOR|77|GetModifierMinPhysicalArmor
modifierfunction.MODIFIER_PROPERTY_IGNORE_PHYSICAL_ARMOR|78|GetModifierIgnorePhysicalArmor
modifierfunction.MODIFIER_PROPERTY_MAGICAL_RESISTANCE_BASE_REDUCTION|79|GetModifierMagicalResistanceBaseReduction
modifierfunction.MODIFIER_PROPERTY_MAGICAL_RESISTANCE_DIRECT_MODIFICATION|80|GetModifierMagicalResistanceDirectModification
modifierfunction.MODIFIER_PROPERTY_MAGICAL_RESISTANCE_BONUS|81|GetModifierMagicalResistanceBonus
modifierfunction.MODIFIER_PROPERTY_MAGICAL_RESISTANCE_BONUS_ILLUSIONS|82|GetModifierMagicalResistanceBonusIllusions
modifierfunction.MODIFIER_PROPERTY_MAGICAL_RESISTANCE_BONUS_UNIQUE|83|GetModifierMagicalResistanceBonusUnique
modifierfunction.MODIFIER_PROPERTY_MAGICAL_RESISTANCE_DECREPIFY_UNIQUE|84|GetModifierMagicalResistanceDecrepifyUnique
modifierfunction.MODIFIER_PROPERTY_BASE_MANA_REGEN|85|GetModifierBaseRegen
modifierfunction.MODIFIER_PROPERTY_MANA_REGEN_CONSTANT|86|GetModifierConstantManaRegen
modifierfunction.MODIFIER_PROPERTY_MANA_REGEN_CONSTANT_UNIQUE|87|GetModifierConstantManaRegenUnique
modifierfunction.MODIFIER_PROPERTY_MANA_REGEN_TOTAL_PERCENTAGE|88|GetModifierTotalPercentageManaRegen
modifierfunction.MODIFIER_PROPERTY_HEALTH_REGEN_CONSTANT|89|GetModifierConstantHealthRegen
modifierfunction.MODIFIER_PROPERTY_HEALTH_REGEN_PERCENTAGE|90|GetModifierHealthRegenPercentage
modifierfunction.MODIFIER_PROPERTY_HEALTH_REGEN_PERCENTAGE_UNIQUE|91|GetModifierHealthRegenPercentageUnique
modifierfunction.MODIFIER_PROPERTY_HEALTH_BONUS|92|GetModifierHealthBonus
modifierfunction.MODIFIER_PROPERTY_MANA_BONUS|93|GetModifierManaBonus
modifierfunction.MODIFIER_PROPERTY_EXTRA_STRENGTH_BONUS|94|GetModifierExtraStrengthBonus
modifierfunction.MODIFIER_PROPERTY_EXTRA_HEALTH_BONUS|95|GetModifierExtraHealthBonus
modifierfunction.MODIFIER_PROPERTY_EXTRA_MANA_BONUS|96|GetModifierExtraManaBonus
modifierfunction.MODIFIER_PROPERTY_EXTRA_MANA_BONUS_PERCENTAGE|97|GetModifierExtraManaBonusPercentage
modifierfunction.MODIFIER_PROPERTY_EXTRA_HEALTH_PERCENTAGE|98|GetModifierExtraHealthPercentage
modifierfunction.MODIFIER_PROPERTY_EXTRA_MANA_PERCENTAGE|99|GetModifierExtraManaPercentage
modifierfunction.MODIFIER_PROPERTY_STATS_STRENGTH_BONUS|100|GetModifierBonusStats_Strength
modifierfunction.MODIFIER_PROPERTY_STATS_AGILITY_BONUS|101|GetModifierBonusStats_Agility
modifierfunction.MODIFIER_PROPERTY_STATS_INTELLECT_BONUS|102|GetModifierBonusStats_Intellect
modifierfunction.MODIFIER_PROPERTY_STATS_STRENGTH_BONUS_PERCENTAGE|103|GetModifierBonusStats_Strength_Percentage
modifierfunction.MODIFIER_PROPERTY_STATS_AGILITY_BONUS_PERCENTAGE|104|GetModifierBonusStats_Agility_Percentage
modifierfunction.MODIFIER_PROPERTY_STATS_INTELLECT_BONUS_PERCENTAGE|105|GetModifierBonusStats_Intellect_Percentage
modifierfunction.MODIFIER_PROPERTY_CAST_RANGE_BONUS|106|GetModifierCastRangeBonus
modifierfunction.MODIFIER_PROPERTY_CAST_RANGE_BONUS_PERCENTAGE|107|GetModifierCastRangeBonusPercentage
modifierfunction.MODIFIER_PROPERTY_CAST_RANGE_BONUS_TARGET|108|GetModifierCastRangeBonusTarget
modifierfunction.MODIFIER_PROPERTY_CAST_RANGE_BONUS_STACKING|109|GetModifierCastRangeBonusStacking
modifierfunction.MODIFIER_PROPERTY_ATTACK_RANGE_BASE_OVERRIDE|110|GetModifierAttackRangeOverride
modifierfunction.MODIFIER_PROPERTY_ATTACK_RANGE_BONUS|111|GetModifierAttackRangeBonus
modifierfunction.MODIFIER_PROPERTY_ATTACK_RANGE_BONUS_UNIQUE|112|GetModifierAttackRangeBonusUnique
modifierfunction.MODIFIER_PROPERTY_ATTACK_RANGE_BONUS_PERCENTAGE|113|GetModifierAttackRangeBonusPercentage
modifierfunction.MODIFIER_PROPERTY_MAX_ATTACK_RANGE|114|GetModifierMaxAttackRange
modifierfunction.MODIFIER_PROPERTY_PROJECTILE_SPEED_BONUS|115|GetModifierProjectileSpeedBonus
modifierfunction.MODIFIER_PROPERTY_PROJECTILE_SPEED_BONUS_PERCENTAGE|116|GetModifierProjectileSpeedBonusPercentage
modifierfunction.MODIFIER_PROPERTY_PROJECTILE_NAME|117|GetModifierProjectileName
modifierfunction.MODIFIER_PROPERTY_REINCARNATION|118|ReincarnateTime
modifierfunction.MODIFIER_PROPERTY_REINCARNATION_SUPPRESS_FX|119|ReincarnateSuppressFX
modifierfunction.MODIFIER_PROPERTY_RESPAWNTIME|120|GetModifierConstantRespawnTime
modifierfunction.MODIFIER_PROPERTY_RESPAWNTIME_PERCENTAGE|121|GetModifierPercentageRespawnTime
modifierfunction.MODIFIER_PROPERTY_RESPAWNTIME_STACKING|122|GetModifierStackingRespawnTime
modifierfunction.MODIFIER_PROPERTY_COOLDOWN_PERCENTAGE|123|GetModifierPercentageCooldown
modifierfunction.MODIFIER_PROPERTY_COOLDOWN_PERCENTAGE_ONGOING|124|GetModifierPercentageCooldownOngoing
modifierfunction.MODIFIER_PROPERTY_CASTTIME_PERCENTAGE|125|GetModifierPercentageCasttime
modifierfunction.MODIFIER_PROPERTY_ATTACK_ANIM_TIME_PERCENTAGE|126|GetModifierPercentageAttackAnimTime
modifierfunction.MODIFIER_PROPERTY_MANACOST_PERCENTAGE|127|GetModifierPercentageManacost
modifierfunction.MODIFIER_PROPERTY_MANACOST_PERCENTAGE_STACKING|128|GetModifierPercentageManacostStacking
modifierfunction.MODIFIER_PROPERTY_HEALTHCOST_PERCENTAGE|129|GetModifierPercentageHealthcost
modifierfunction.MODIFIER_PROPERTY_HEALTHCOST_PERCENTAGE_STACKING|130|GetModifierPercentageHealthcostStacking
modifierfunction.MODIFIER_PROPERTY_DEATHGOLDCOST|131|GetModifierConstantDeathGoldCost
modifierfunction.MODIFIER_PROPERTY_PERCENTAGE_DEATHGOLDCOST|132|GetModifierPercentageDeathGoldCost
modifierfunction.MODIFIER_PROPERTY_EXP_RATE_BOOST|133|GetModifierPercentageExpRateBoost
modifierfunction.MODIFIER_PROPERTY_GOLD_RATE_BOOST|134|GetModifierPercentageGoldRateBoost
modifierfunction.MODIFIER_PROPERTY_PREATTACK_CRITICALSTRIKE|135|GetModifierPreAttack_CriticalStrike
modifierfunction.MODIFIER_PROPERTY_PREATTACK_TARGET_CRITICALSTRIKE|136|GetModifierPreAttack_Target_CriticalStrike
modifierfunction.MODIFIER_PROPERTY_MAGICAL_CONSTANT_BLOCK|137|GetModifierMagical_ConstantBlock
modifierfunction.MODIFIER_PROPERTY_PHYSICAL_CONSTANT_BLOCK|138|GetModifierPhysical_ConstantBlock
modifierfunction.MODIFIER_PROPERTY_PHYSICAL_CONSTANT_BLOCK_SPECIAL|139|GetModifierPhysical_ConstantBlockSpecial
modifierfunction.MODIFIER_PROPERTY_TOTAL_CONSTANT_BLOCK_UNAVOIDABLE_PRE_ARMOR|140|GetModifierPhysical_ConstantBlockUnavoidablePreArmor
modifierfunction.MODIFIER_PROPERTY_TOTAL_CONSTANT_BLOCK|141|GetModifierTotal_ConstantBlock
modifierfunction.MODIFIER_PROPERTY_OVERRIDE_ANIMATION|142|GetOverrideAnimation
modifierfunction.MODIFIER_PROPERTY_OVERRIDE_ANIMATION_RATE|143|GetOverrideAnimationRate
modifierfunction.MODIFIER_PROPERTY_ABSORB_SPELL|144|GetAbsorbSpell
modifierfunction.MODIFIER_PROPERTY_REFLECT_SPELL|145|GetReflectSpell
modifierfunction.MODIFIER_PROPERTY_DISABLE_AUTOATTACK|146|GetDisableAutoAttack
modifierfunction.MODIFIER_PROPERTY_BONUS_DAY_VISION|147|GetBonusDayVision
modifierfunction.MODIFIER_PROPERTY_BONUS_DAY_VISION_PERCENTAGE|148|GetBonusDayVisionPercentage
modifierfunction.MODIFIER_PROPERTY_BONUS_NIGHT_VISION|149|GetBonusNightVision
modifierfunction.MODIFIER_PROPERTY_BONUS_NIGHT_VISION_UNIQUE|150|GetBonusNightVisionUnique
modifierfunction.MODIFIER_PROPERTY_BONUS_VISION_PERCENTAGE|151|GetBonusVisionPercentage
modifierfunction.MODIFIER_PROPERTY_FIXED_DAY_VISION|152|GetFixedDayVision
modifierfunction.MODIFIER_PROPERTY_FIXED_NIGHT_VISION|153|GetFixedNightVision
modifierfunction.MODIFIER_PROPERTY_MIN_HEALTH|154|GetMinHealth
modifierfunction.MODIFIER_PROPERTY_ABSOLUTE_NO_DAMAGE_PHYSICAL|155|GetAbsoluteNoDamagePhysical
modifierfunction.MODIFIER_PROPERTY_ABSOLUTE_NO_DAMAGE_MAGICAL|156|GetAbsoluteNoDamageMagical
modifierfunction.MODIFIER_PROPERTY_ABSOLUTE_NO_DAMAGE_PURE|157|GetAbsoluteNoDamagePure
modifierfunction.MODIFIER_PROPERTY_IS_ILLUSION|158|GetIsIllusion
modifierfunction.MODIFIER_PROPERTY_ILLUSION_LABEL|159|GetModifierIllusionLabel
modifierfunction.MODIFIER_PROPERTY_STRONG_ILLUSION|160|GetModifierStrongIllusion
modifierfunction.MODIFIER_PROPERTY_SUPER_ILLUSION|161|GetModifierSuperIllusion
modifierfunction.MODIFIER_PROPERTY_SUPER_ILLUSION_WITH_ULTIMATE|162|GetModifierSuperIllusionWithUltimate
modifierfunction.MODIFIER_PROPERTY_XP_DURING_DEATH|163|GetModifierXPDuringDeath
modifierfunction.MODIFIER_PROPERTY_TURN_RATE_PERCENTAGE|164|GetModifierTurnRate_Percentage
modifierfunction.MODIFIER_PROPERTY_TURN_RATE_OVERRIDE|165|GetModifierTurnRate_Override
modifierfunction.MODIFIER_PROPERTY_DISABLE_HEALING|166|GetDisableHealing
modifierfunction.MODIFIER_PROPERTY_ALWAYS_ALLOW_ATTACK|167|GetAlwaysAllowAttack
modifierfunction.MODIFIER_PROPERTY_ALWAYS_ETHEREAL_ATTACK|168|GetAllowEtherealAttack
modifierfunction.MODIFIER_PROPERTY_OVERRIDE_ATTACK_MAGICAL|169|GetOverrideAttackMagical
modifierfunction.MODIFIER_PROPERTY_UNIT_STATS_NEEDS_REFRESH|170|GetModifierUnitStatsNeedsRefresh
modifierfunction.MODIFIER_PROPERTY_BOUNTY_CREEP_MULTIPLIER|171|Unused
modifierfunction.MODIFIER_PROPERTY_BOUNTY_OTHER_MULTIPLIER|172|Unused
modifierfunction.MODIFIER_PROPERTY_UNIT_DISALLOW_UPGRADING|173|GetModifierUnitDisllowUpgrading
modifierfunction.MODIFIER_PROPERTY_DODGE_PROJECTILE|174|GetModifierDodgeProjectile
modifierfunction.MODIFIER_PROPERTY_TRIGGER_COSMETIC_AND_END_ATTACK|175|GetTriggerCosmeticAndEndAttack
modifierfunction.MODIFIER_PROPERTY_MAX_DEBUFF_DURATION|176|GetModifierMaxDebuffDuration
modifierfunction.MODIFIER_PROPERTY_PRIMARY_STAT_DAMAGE_MULTIPLIER|177|GetPrimaryStatDamageMultiplier
modifierfunction.MODIFIER_PROPERTY_PREATTACK_DEADLY_BLOW|178|GetModifierPreAttack_DeadlyBlow
modifierfunction.MODIFIER_PROPERTY_ALWAYS_AUTOATTACK_WHILE_HOLD_POSITION|179|GetAlwaysAutoAttackWhileHoldPosition
modifierfunction.MODIFIER_EVENT_ON_SPELL_TARGET_READY|180|OnSpellTargetReady
modifierfunction.MODIFIER_EVENT_ON_ATTACK_RECORD|181|OnAttackRecord
modifierfunction.MODIFIER_EVENT_ON_ATTACK_START|182|OnAttackStart
modifierfunction.MODIFIER_EVENT_ON_ATTACK|183|OnAttack
modifierfunction.MODIFIER_EVENT_ON_ATTACK_LANDED|184|OnAttackLanded
modifierfunction.MODIFIER_EVENT_ON_ATTACK_FAIL|185|OnAttackFail
modifierfunction.MODIFIER_EVENT_ON_ATTACK_ALLIED|186|OnAttackAllied
modifierfunction.MODIFIER_EVENT_ON_PROJECTILE_DODGE|187|OnProjectileDodge
modifierfunction.MODIFIER_EVENT_ON_ORDER|188|OnOrder
modifierfunction.MODIFIER_EVENT_ON_UNIT_MOVED|189|OnUnitMoved
modifierfunction.MODIFIER_EVENT_ON_ABILITY_START|190|OnAbilityStart
modifierfunction.MODIFIER_EVENT_ON_ABILITY_EXECUTED|191|OnAbilityExecuted
modifierfunction.MODIFIER_EVENT_ON_ABILITY_FULLY_CAST|192|OnAbilityFullyCast
modifierfunction.MODIFIER_EVENT_ON_BREAK_INVISIBILITY|193|OnBreakInvisibility
modifierfunction.MODIFIER_EVENT_ON_ABILITY_END_CHANNEL|194|OnAbilityEndChannel
modifierfunction.MODIFIER_EVENT_ON_PROCESS_UPGRADE|195|Unused
modifierfunction.MODIFIER_EVENT_ON_REFRESH|196|Unused
modifierfunction.MODIFIER_EVENT_ON_TAKEDAMAGE|197|OnTakeDamage
modifierfunction.MODIFIER_EVENT_ON_DEATH_PREVENTED|198|OnDamagePrevented
modifierfunction.MODIFIER_EVENT_ON_STATE_CHANGED|199|OnStateChanged
modifierfunction.MODIFIER_EVENT_ON_ORB_EFFECT|200|Unused
modifierfunction.MODIFIER_EVENT_ON_PROCESS_CLEAVE|201|OnProcessCleave
modifierfunction.MODIFIER_EVENT_ON_DAMAGE_CALCULATED|202|OnDamageCalculated
modifierfunction.MODIFIER_EVENT_ON_MAGIC_DAMAGE_CALCULATED|203|OnMagicDamageCalculated
modifierfunction.MODIFIER_EVENT_ON_ATTACKED|204|OnAttacked
modifierfunction.MODIFIER_EVENT_ON_DEATH|205|OnDeath
modifierfunction.MODIFIER_EVENT_ON_DEATH_COMPLETED|206|OnDeathCompleted
modifierfunction.MODIFIER_EVENT_ON_RESPAWN|207|OnRespawn
modifierfunction.MODIFIER_EVENT_ON_SPENT_MANA|208|OnSpentMana
modifierfunction.MODIFIER_EVENT_ON_SPENT_HEALTH|209|OnSpentHealth
modifierfunction.MODIFIER_EVENT_ON_TELEPORTING|210|OnTeleporting
modifierfunction.MODIFIER_EVENT_ON_TELEPORTED|211|OnTeleported
modifierfunction.MODIFIER_EVENT_ON_SET_LOCATION|212|OnSetLocation
modifierfunction.MODIFIER_EVENT_ON_HEALTH_GAINED|213|OnHealthGained
modifierfunction.MODIFIER_EVENT_ON_MANA_GAINED|214|OnManaGained
modifierfunction.MODIFIER_EVENT_ON_TAKEDAMAGE_KILLCREDIT|215|OnTakeDamageKillCredit
modifierfunction.MODIFIER_EVENT_ON_HERO_KILLED|216|OnHeroKilled
modifierfunction.MODIFIER_EVENT_ON_HEAL_RECEIVED|217|OnHealReceived
modifierfunction.MODIFIER_EVENT_ON_BUILDING_KILLED|218|OnBuildingKilled
modifierfunction.MODIFIER_EVENT_ON_MODEL_CHANGED|219|OnModelChanged
modifierfunction.MODIFIER_EVENT_ON_MODIFIER_ADDED|220|OnModifierAdded
modifierfunction.MODIFIER_EVENT_ON_MODIFIER_REMOVED|221|OnModifierRemoved
modifierfunction.MODIFIER_PROPERTY_TOOLTIP|222|OnTooltip
modifierfunction.MODIFIER_PROPERTY_MODEL_CHANGE|223|GetModifierModelChange
modifierfunction.MODIFIER_PROPERTY_MODEL_SCALE|224|GetModifierModelScale
modifierfunction.MODIFIER_PROPERTY_MODEL_SCALE_ANIMATE_TIME|225|GetModifierModelScaleAnimateTime
modifierfunction.MODIFIER_PROPERTY_MODEL_SCALE_USE_IN_OUT_EASE|226|GetModifierModelScaleUseInOutEase
modifierfunction.MODIFIER_PROPERTY_MODEL_SCALE_CONSTANT|227|GetModifierModelScaleConstant
modifierfunction.MODIFIER_PROPERTY_IS_SCEPTER|228|GetModifierScepter
modifierfunction.MODIFIER_PROPERTY_IS_SHARD|229|GetModifierShard
modifierfunction.MODIFIER_PROPERTY_RADAR_COOLDOWN_REDUCTION|230|GetModifierRadarCooldownReduction
modifierfunction.MODIFIER_PROPERTY_TRANSLATE_ACTIVITY_MODIFIERS|231|GetActivityTranslationModifiers
modifierfunction.MODIFIER_PROPERTY_TRANSLATE_ATTACK_SOUND|232|GetAttackSound
modifierfunction.MODIFIER_PROPERTY_LIFETIME_FRACTION|233|GetUnitLifetimeFraction
modifierfunction.MODIFIER_PROPERTY_PROVIDES_FOW_POSITION|234|GetModifierProvidesFOWVision
modifierfunction.MODIFIER_PROPERTY_SPELLS_REQUIRE_HP|235|GetModifierSpellsRequireHP
modifierfunction.MODIFIER_PROPERTY_CONVERT_MANA_COST_TO_HEALTH_COST|236|GetModifierConvertManaCostToHealthCost
modifierfunction.MODIFIER_PROPERTY_FORCE_DRAW_MINIMAP|237|GetForceDrawOnMinimap
modifierfunction.MODIFIER_PROPERTY_DISABLE_TURNING|238|GetModifierDisableTurning
modifierfunction.MODIFIER_PROPERTY_IGNORE_CAST_ANGLE|239|GetModifierIgnoreCastAngle
modifierfunction.MODIFIER_PROPERTY_CHANGE_ABILITY_VALUE|240|GetModifierChangeAbilityValue
modifierfunction.MODIFIER_PROPERTY_OVERRIDE_ABILITY_SPECIAL|241|GetModifierOverrideAbilitySpecial
modifierfunction.MODIFIER_PROPERTY_OVERRIDE_ABILITY_SPECIAL_VALUE|242|GetModifierOverrideAbilitySpecialValue
modifierfunction.MODIFIER_PROPERTY_ABILITY_LAYOUT|243|GetModifierAbilityLayout
modifierfunction.MODIFIER_EVENT_ON_DOMINATED|244|OnDominated
modifierfunction.MODIFIER_EVENT_ON_KILL|245|OnKill
modifierfunction.MODIFIER_EVENT_ON_ASSIST|246|OnAssist
modifierfunction.MODIFIER_PROPERTY_TEMPEST_DOUBLE|247|GetModifierTempestDouble
modifierfunction.MODIFIER_PROPERTY_PRESERVE_PARTICLES_ON_MODEL_CHANGE|248|PreserveParticlesOnModelChanged
modifierfunction.MODIFIER_EVENT_ON_ATTACK_FINISHED|249|OnAttackFinished
modifierfunction.MODIFIER_PROPERTY_IGNORE_COOLDOWN|250|GetModifierIgnoreCooldown
modifierfunction.MODIFIER_PROPERTY_CAN_ATTACK_TREES|251|GetModifierCanAttackTrees
modifierfunction.MODIFIER_PROPERTY_VISUAL_Z_DELTA|252|GetVisualZDelta
modifierfunction.MODIFIER_PROPERTY_VISUAL_Z_SPEED_BASE_OVERRIDE|253|GetVisualZSpeedBaseOverride
modifierfunction.MODIFIER_PROPERTY_INCOMING_DAMAGE_ILLUSION|254|
modifierfunction.MODIFIER_PROPERTY_DONT_GIVE_VISION_OF_ATTACKER|255|GetModifierNoVisionOfAttacker
modifierfunction.MODIFIER_PROPERTY_TOOLTIP2|256|OnTooltip2
modifierfunction.MODIFIER_EVENT_ON_ATTACK_RECORD_DESTROY|257|OnAttackRecordDestroy
modifierfunction.MODIFIER_EVENT_ON_PROJECTILE_OBSTRUCTION_HIT|258|OnProjectileObstructionHit
modifierfunction.MODIFIER_PROPERTY_SUPPRESS_TELEPORT|259|GetSuppressTeleport
modifierfunction.MODIFIER_EVENT_ON_ATTACK_CANCELLED|260|OnAttackCancelled
modifierfunction.MODIFIER_PROPERTY_SUPPRESS_CLEAVE|261|GetSuppressCleave
modifierfunction.MODIFIER_PROPERTY_BOT_ATTACK_SCORE_BONUS|262|BotAttackScoreBonus
modifierfunction.MODIFIER_PROPERTY_ATTACKSPEED_REDUCTION_PERCENTAGE|263|GetModifierAttackSpeedReductionPercentage
modifierfunction.MODIFIER_PROPERTY_MOVESPEED_REDUCTION_PERCENTAGE|264|GetModifierMoveSpeedReductionPercentage
modifierfunction.MODIFIER_PROPERTY_ATTACK_WHILE_MOVING_TARGET|265|
modifierfunction.MODIFIER_PROPERTY_ATTACKSPEED_PERCENTAGE|266|GetModifierAttackSpeedPercentage
modifierfunction.MODIFIER_EVENT_ON_ATTEMPT_PROJECTILE_DODGE|267|OnAttemptProjectileDodge
modifierfunction.MODIFIER_EVENT_ON_PREDEBUFF_APPLIED|268|OnPreDebuffApplied
modifierfunction.MODIFIER_PROPERTY_COOLDOWN_PERCENTAGE_STACKING|269|GetModifierPercentageCooldownStacking
modifierfunction.MODIFIER_PROPERTY_SPELL_REDIRECT_TARGET|270|GetModifierSpellRedirectTarget
modifierfunction.MODIFIER_PROPERTY_TURN_RATE_CONSTANT|271|GetModifierTurnRateConstant
modifierfunction.MODIFIER_PROPERTY_PACK_RAT|272|GetModifierIsPackRat
modifierfunction.MODIFIER_PROPERTY_PHYSICALDAMAGEOUTGOING_PERCENTAGE|273|GetModifierPhysicalDamageOutgoing_Percentage
modifierfunction.MODIFIER_PROPERTY_KNOCKBACK_AMPLIFICATION_PERCENTAGE|274|GetModifierKnockbackAmplification_Percentage
modifierfunction.MODIFIER_PROPERTY_HEALTHBAR_PIPS|275|GetModifierHealthBarPips
modifierfunction.MODIFIER_PROPERTY_INCOMING_DAMAGE_CONSTANT|276|GetModifierIncomingDamageConstant
modifierfunction.MODIFIER_EVENT_SPELL_APPLIED_SUCCESSFULLY|277|OnSpellAppliedSuccessfully
modifierfunction.MODIFIER_PROPERTY_AVOID_DAMAGE_AFTER_REDUCTIONS|278|GetModifierAvoidDamageAfterReductions
modifierfunction.MODIFIER_PROPERTY_FAIL_ATTACK|279|GetModifierPropetyFailAttack
modifierfunction.MODIFIER_PROPERTY_PREREDUCE_INCOMING_DAMAGE_MULT|280|GetModifierPrereduceIncomingDamage_Mult
modifierfunction.MODIFIER_PROPERTY_SUPPRESS_FULLSCREEN_DEATH_FX|281|GetModifierSuppressFullscreenDeathFX
modifierfunction.MODIFIER_PROPERTY_INCOMING_DAMAGE_CONSTANT_POST|282|MODIFIER_PROPERTY_INCOMING_DAMAGE_CONSTANT_POST
modifierfunction.MODIFIER_PROPERTY_DAMAGEOUTGOING_PERCENTAGE_MULTIPLICATIVE|283|GetModifierDamageOutgoing_PercentageMultiplicative
modifierfunction.MODIFIER_PROPERTY_TICK_GOLD_MULTIPLIER|284|GetModifierTickGold_Multiplier
modifierfunction.MODIFIER_PROPERTY_SLOW_RESISTANCE_UNIQUE|285|GEtModifierSlowResistance_Unique
modifierfunction.MODIFIER_PROPERTY_SLOW_RESISTANCE_STACKING|286|GetModifierSlowResistance_Stacking
modifierfunction.MODIFIER_PROPERTY_AOE_BONUS_PERCENTAGE|287|GetModifierAoEBonusPercentage
modifierfunction.MODIFIER_PROPERTY_PROJECTILE_SPEED|288|GetModifierProjectileSpeed
modifierfunction.MODIFIER_PROPERTY_PROJECTILE_SPEED_TARGET|289|GetModifierProjectileSpeedTarget
modifierfunction.MODIFIER_PROPERTY_BECOME_STRENGTH|290|GetModifierBecomeStrength
modifierfunction.MODIFIER_PROPERTY_BECOME_AGILITY|291|GetModifierBecomeAgility
modifierfunction.MODIFIER_PROPERTY_BECOME_INTELLIGENCE|292|GetModifierBecomeIntelligence
modifierfunction.MODIFIER_PROPERTY_BECOME_UNIVERSAL|293|GetModifierBecomeUniversal
modifierfunction.MODIFIER_EVENT_ON_FORCE_PROC_MAGIC_STICK|294|OnForceProcMagicStick
modifierfunction.MODIFIER_EVENT_ON_DAMAGE_HPLOSS|295|OnDamageHPLoss
modifierfunction.MODIFIER_PROPERTY_SHARE_XPRUNE|296|GetModifierShareXPRune
modifierfunction.MODIFIER_PROPERTY_NO_FREE_TP_SCROLL_ON_DEATH|297|GetModifierNoFreeTPScrollOnDeath
modifierfunction.MODIFIER_PROPERTY_HAS_BONUS_NEUTRAL_ITEM_CHOICE|298|GetModifierHasBonusNeutralItemChoice
modifierfunction.MODIFIER_PROPERTY_FORCE_MAX_HEALTH|299|GetModifierForceMaxHealth
modifierfunction.MODIFIER_PROPERTY_FORCE_MAX_MANA|300|GetModifierForceMaxMana
modifierfunction.MODIFIER_PROPERTY_AOE_BONUS_CONSTANT|301|GetModifierAoEBonusConstant
modifierfunction.MODIFIER_PROPERTY_AOE_BONUS_CONSTANT_STACKING|302|GetModifierAoEBonusConstantStacking
modifierfunction.MODIFIER_EVENT_ON_TAKEDAMAGE_POST_UNAVOIDABLE_BLOCK|303|OnTakeDamagePostUnavoidableBlock
modifierfunction.MODIFIER_EVENT_ON_MUTE_DAMAGE_ABILITIES|304|OnMuteDamageAbilities
modifierfunction.MODIFIER_PROPERTY_SUPPRESS_CRIT|305|GetSuppressCrit
modifierfunction.MODIFIER_PROPERTY_ABILITY_POINTS|306|GetModifierAbilityPoints
modifierfunction.MODIFIER_PROPERTY_BUYBACK_PENALTY_PERCENT|307|GetModifierBuybackPenaltyPercent
modifierfunction.MODIFIER_PROPERTY_ITEM_SELLBACK_COST|308|GetModifierItemSellbackCost
modifierfunction.MODIFIER_PROPERTY_DISASSEMBLE_ANYTHING|309|GetModifierDisassembleAnything
modifierfunction.MODIFIER_PROPERTY_FIXED_MANA_REGEN|310|GetModifierFixedManaRegen
modifierfunction.MODIFIER_PROPERTY_BONUS_UPHILL_MISS_CHANCE|311|GetModifierBonusUphillMissChance
modifierfunction.MODIFIER_PROPERTY_CREEP_DENY_PERCENT|312|GetModifierCreepDenyPercent
modifierfunction.MODIFIER_PROPERTY_ATTACKSPEED_ABSOLUTE_MAX|313|GetModifierAttackSpeedAbsoluteMax
modifierfunction.MODIFIER_PROPERTY_FOW_TEAM|314|GetModifierFoWTeam
modifierfunction.MODIFIER_EVENT_ON_HERO_BEGIN_DYING|315|OnHeroBeginDying
modifierfunction.MODIFIER_PROPERTY_BONUS_LOTUS_HEAL|316|GetModifierBonusLotusHeal
modifierfunction.MODIFIER_PROPERTY_BASE_HP_REGEN_PER_STR_BONUS_PERCENTAGE|317|GetModifierBonusLotusHeal
modifierfunction.MODIFIER_PROPERTY_BASE_ARMOR_PER_AGI_BONUS_PERCENTAGE|318|GetModifierBonusLotusHeal
modifierfunction.MODIFIER_PROPERTY_BASE_MP_REGEN_PER_INT_BONUS_PERCENTAGE|319|GetModifierBonusLotusHeal
modifierfunction.MODIFIER_PROPERTY_BASE_MRES_PER_INT_BONUS_PERCENTAGE|320|GetModifierBonusLotusHeal
modifierfunction.MODIFIER_EVENT_ON_DAY_STARTED|321|OnDayStarted
modifierfunction.MODIFIER_PROPERTY_CREATE_BONUS_ILLUSION_CHANCE|322|GetModifierCreateBonusIllusionChance
modifierfunction.MODIFIER_PROPERTY_CREATE_BONUS_ILLUSION_COUNT|323|GetModifierCreateBonusIllusionCount
modifierfunction.MODIFIER_PROPERTY_PSEUDORANDOM_BONUS|324|GetModofierPropertyPseudoRandomBonus
modifierfunction.MODIFIER_PROPERTY_ATTACK_HEIGHT_BONUS|325|GetModifierAttackHeightBonus
modifierfunction.MODIFIER_PROPERTY_SKIP_ATTACK_REGULATOR|326|GetSkipAttackRegulator
modifierfunction.MODIFIER_PROPERTY_MISS_PERCENTAGE_TARGET|327|GetModifierMiss_Percentage_Target
modifierfunction.MODIFIER_PROPERTY_ADDITIONAL_NEUTRAL_ITEM_DROPS|328|GetModifierAdditionalNutralItemDrops
modifierfunction.MODIFIER_PROPERTY_KILL_STREAK_BONUS_GOLD_PERCENTAGE|329|GetModifierKillStreakBonusGoldPercentage
modifierfunction.MODIFIER_PROPERTY_HP_REGEN_MULTIPLIER_PRE_AMPLIFICATION|330|GetModifierHPRegenMultiplierPreAmplification
modifierfunction.MODIFIER_PROPERTY_HEROFACET_OVERRIDE|331|GetModifierHeroFacetOverride
modifierfunction.MODIFIER_FUNCTION_LAST|332|
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
modifierstate.MODIFIER_STATE_IGNORING_MOVE_ORDERS|59|
modifierstate.MODIFIER_STATE_ATTACKS_ARE_MELEE|60|
modifierstate.MODIFIER_STATE_CAN_USE_BACKPACK_ITEMS|61|
modifierstate.MODIFIER_STATE_CASTS_IGNORE_CHANNELING|62|
modifierstate.MODIFIER_STATE_ATTACKS_DONT_REVEAL|63|
modifierstate.MODIFIER_STATE_LAST|64|

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
DOTAKeybindCommand_t.DOTA_KEYBIND_TOGGLE_OVERLAYMAP|149|
DOTAKeybindCommand_t.DOTA_KEYBIND_OVERLAYMAP_INPUTKEY|150|
DOTAKeybindCommand_t.DOTA_KEYBIND_FILTER_ENEMY|151|
DOTAKeybindCommand_t.DOTA_KEYBIND_FILTER_ALLY|152|
DOTAKeybindCommand_t.DOTA_KEYBIND_FILTER_HERO|153|
DOTAKeybindCommand_t.DOTA_KEYBIND_FILTER_NONHERO|154|
DOTAKeybindCommand_t.DOTA_KEYBIND_TAUNT|155|
DOTAKeybindCommand_t.DOTA_KEYBIND_SHOP_CONSUMABLES|156|
DOTAKeybindCommand_t.DOTA_KEYBIND_SHOP_ATTRIBUTES|157|
DOTAKeybindCommand_t.DOTA_KEYBIND_SHOP_ARMAMENTS|158|
DOTAKeybindCommand_t.DOTA_KEYBIND_SHOP_ARCANE|159|
DOTAKeybindCommand_t.DOTA_KEYBIND_SHOP_BASICS|160|
DOTAKeybindCommand_t.DOTA_KEYBIND_SHOP_SUPPORT|161|
DOTAKeybindCommand_t.DOTA_KEYBIND_SHOP_CASTER|162|
DOTAKeybindCommand_t.DOTA_KEYBIND_SHOP_WEAPONS|163|
DOTAKeybindCommand_t.DOTA_KEYBIND_SHOP_ARMOR|164|
DOTAKeybindCommand_t.DOTA_KEYBIND_SHOP_ARTIFACTS|165|
DOTAKeybindCommand_t.DOTA_KEYBIND_SHOP_SIDE_PAGE_1|166|
DOTAKeybindCommand_t.DOTA_KEYBIND_SHOP_SIDE_PAGE_2|167|
DOTAKeybindCommand_t.DOTA_KEYBIND_SHOP_SECRET|168|
DOTAKeybindCommand_t.DOTA_KEYBIND_SHOP_SEARCHBOX|169|
DOTAKeybindCommand_t.DOTA_KEYBIND_SHOP_SLOT_1|170|
DOTAKeybindCommand_t.DOTA_KEYBIND_SHOP_SLOT_2|171|
DOTAKeybindCommand_t.DOTA_KEYBIND_SHOP_SLOT_3|172|
DOTAKeybindCommand_t.DOTA_KEYBIND_SHOP_SLOT_4|173|
DOTAKeybindCommand_t.DOTA_KEYBIND_SHOP_SLOT_5|174|
DOTAKeybindCommand_t.DOTA_KEYBIND_SHOP_SLOT_6|175|
DOTAKeybindCommand_t.DOTA_KEYBIND_SHOP_SLOT_7|176|
DOTAKeybindCommand_t.DOTA_KEYBIND_SHOP_SLOT_8|177|
DOTAKeybindCommand_t.DOTA_KEYBIND_SHOP_SLOT_9|178|
DOTAKeybindCommand_t.DOTA_KEYBIND_SHOP_SLOT_10|179|
DOTAKeybindCommand_t.DOTA_KEYBIND_SHOP_SLOT_11|180|
DOTAKeybindCommand_t.DOTA_KEYBIND_SHOP_SLOT_12|181|
DOTAKeybindCommand_t.DOTA_KEYBIND_SHOP_SLOT_13|182|
DOTAKeybindCommand_t.DOTA_KEYBIND_SHOP_SLOT_14|183|
DOTAKeybindCommand_t.DOTA_KEYBIND_SPEC_CAMERA_UP|184|
DOTAKeybindCommand_t.DOTA_KEYBIND_SPEC_CAMERA_DOWN|185|
DOTAKeybindCommand_t.DOTA_KEYBIND_SPEC_CAMERA_LEFT|186|
DOTAKeybindCommand_t.DOTA_KEYBIND_SPEC_CAMERA_RIGHT|187|
DOTAKeybindCommand_t.DOTA_KEYBIND_SPEC_CAMERA_GRIP|188|
DOTAKeybindCommand_t.DOTA_KEYBIND_SPEC_CAMERA_SAVED_POSITION_1|189|
DOTAKeybindCommand_t.DOTA_KEYBIND_SPEC_CAMERA_SAVED_POSITION_2|190|
DOTAKeybindCommand_t.DOTA_KEYBIND_SPEC_CAMERA_SAVED_POSITION_3|191|
DOTAKeybindCommand_t.DOTA_KEYBIND_SPEC_CAMERA_SAVED_POSITION_4|192|
DOTAKeybindCommand_t.DOTA_KEYBIND_SPEC_CAMERA_SAVED_POSITION_5|193|
DOTAKeybindCommand_t.DOTA_KEYBIND_SPEC_CAMERA_SAVED_POSITION_6|194|
DOTAKeybindCommand_t.DOTA_KEYBIND_SPEC_CAMERA_SAVED_POSITION_7|195|
DOTAKeybindCommand_t.DOTA_KEYBIND_SPEC_CAMERA_SAVED_POSITION_8|196|
DOTAKeybindCommand_t.DOTA_KEYBIND_SPEC_CAMERA_SAVED_POSITION_9|197|
DOTAKeybindCommand_t.DOTA_KEYBIND_SPEC_CAMERA_SAVED_POSITION_10|198|
DOTAKeybindCommand_t.DOTA_KEYBIND_SPEC_UNIT_SELECT|199|
DOTAKeybindCommand_t.DOTA_KEYBIND_SPEC_HERO_SELECT|200|
DOTAKeybindCommand_t.DOTA_KEYBIND_SPEC_PAUSE|201|
DOTAKeybindCommand_t.DOTA_KEYBIND_SPEC_CHAT|202|
DOTAKeybindCommand_t.DOTA_KEYBIND_SPEC_SCOREBOARD|203|
DOTAKeybindCommand_t.DOTA_KEYBIND_SPEC_INCREASE_REPLAY_SPEED|204|
DOTAKeybindCommand_t.DOTA_KEYBIND_SPEC_DECREASE_REPLAY_SPEED|205|
DOTAKeybindCommand_t.DOTA_KEYBIND_SPEC_STATS_ITEM|206|
DOTAKeybindCommand_t.DOTA_KEYBIND_SPEC_STATS_GOLD|207|
DOTAKeybindCommand_t.DOTA_KEYBIND_SPEC_STATS_XP|208|
DOTAKeybindCommand_t.DOTA_KEYBIND_SPEC_STATS_FANTASY|209|
DOTAKeybindCommand_t.DOTA_KEYBIND_SPEC_STATS_WINCHANCE|210|
DOTAKeybindCommand_t.DOTA_KEYBIND_SPEC_FOW_TOGGLEBOTH|211|
DOTAKeybindCommand_t.DOTA_KEYBIND_SPEC_FOW_TOGGLERADIENT|212|
DOTAKeybindCommand_t.DOTA_KEYBIND_SPEC_FOW_TOGGLEDIRE|213|
DOTAKeybindCommand_t.DOTA_KEYBIND_SPEC_OPEN_BROADCASTER_MENU|214|
DOTAKeybindCommand_t.DOTA_KEYBIND_SPEC_DROPDOWN_KDA|215|
DOTAKeybindCommand_t.DOTA_KEYBIND_SPEC_DROPDOWN_LASTHITS_DENIES|216|
DOTAKeybindCommand_t.DOTA_KEYBIND_SPEC_DROPDOWN_LEVEL|217|
DOTAKeybindCommand_t.DOTA_KEYBIND_SPEC_DROPDOWN_XP_PER_MIN|218|
DOTAKeybindCommand_t.DOTA_KEYBIND_SPEC_DROPDOWN_GOLD|219|
DOTAKeybindCommand_t.DOTA_KEYBIND_SPEC_DROPDOWN_TOTALGOLD|220|
DOTAKeybindCommand_t.DOTA_KEYBIND_SPEC_DROPDOWN_GOLD_PER_MIN|221|
DOTAKeybindCommand_t.DOTA_KEYBIND_SPEC_DROPDOWN_BUYBACK|222|
DOTAKeybindCommand_t.DOTA_KEYBIND_SPEC_DROPDOWN_NETWORTH|223|
DOTAKeybindCommand_t.DOTA_KEYBIND_SPEC_DROPDOWN_FANTASY|224|
DOTAKeybindCommand_t.DOTA_KEYBIND_SPEC_DROPDOWN_SORT|225|
DOTAKeybindCommand_t.DOTA_KEYBIND_SPEC_DROPDOWN_CLOSE|226|
DOTAKeybindCommand_t.DOTA_KEYBIND_SPEC_FOCUS_PLAYER_1|227|
DOTAKeybindCommand_t.DOTA_KEYBIND_SPEC_FOCUS_PLAYER_2|228|
DOTAKeybindCommand_t.DOTA_KEYBIND_SPEC_FOCUS_PLAYER_3|229|
DOTAKeybindCommand_t.DOTA_KEYBIND_SPEC_FOCUS_PLAYER_4|230|
DOTAKeybindCommand_t.DOTA_KEYBIND_SPEC_FOCUS_PLAYER_5|231|
DOTAKeybindCommand_t.DOTA_KEYBIND_SPEC_FOCUS_PLAYER_6|232|
DOTAKeybindCommand_t.DOTA_KEYBIND_SPEC_FOCUS_PLAYER_7|233|
DOTAKeybindCommand_t.DOTA_KEYBIND_SPEC_FOCUS_PLAYER_8|234|
DOTAKeybindCommand_t.DOTA_KEYBIND_SPEC_FOCUS_PLAYER_9|235|
DOTAKeybindCommand_t.DOTA_KEYBIND_SPEC_FOCUS_PLAYER_10|236|
DOTAKeybindCommand_t.DOTA_KEYBIND_SPEC_COACH_VIEWTOGGLE|237|
DOTAKeybindCommand_t.DOTA_KEYBIND_INSPECTHEROINWORLD|238|
DOTAKeybindCommand_t.DOTA_KEYBIND_CAMERA_ZOOM_IN|239|
DOTAKeybindCommand_t.DOTA_KEYBIND_CAMERA_ZOOM_OUT|240|
DOTAKeybindCommand_t.DOTA_KEYBIND_CONTROL_GROUPCYCLEPREV|241|
DOTAKeybindCommand_t.DOTA_KEYBIND_DOTA_ALT|242|
DOTAKeybindCommand_t.DOTA_KEYBIND_DOTA_ALTERNATIVE_CAST_SWITCH|243|
DOTAKeybindCommand_t.DOTA_KEYBIND_COUNT|244|

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
