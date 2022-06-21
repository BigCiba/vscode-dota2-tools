/* eslint-disable @typescript-eslint/naming-convention */
import * as vscode from 'vscode';
import * as path from 'path';
import * as fs from 'fs';
import { readKeyValue2, writeKeyValue } from '../utils/kvUtils';
import { getContentDir, getGameDir } from '../module/addonInfo';

/**
 * 根据饰品文件创建对应的dota2物品kv
 * @export
 */
export function createWearableItems(context: vscode.ExtensionContext) {
	const gameDir = getGameDir();
	const contentDir = getContentDir();
	let localization = "";
	let itemsKV: any = {};
	let wearableKV = readKeyValue2(fs.readFileSync(path.join(gameDir, "scripts/npc/kv/wearable.kv"), 'utf-8')).Wearable;
	for (const heroName in wearableKV) {
		const wearableList = wearableKV[heroName];
		for (const wearableIndex in wearableList) {
			const wearableData = wearableList[wearableIndex];
			if (wearableData.model_player) {
				itemsKV["item_wearable_" + wearableIndex] = {
					Note: wearableData.note_name,
					BaseClass: "item_datadriven",
					item_rarity: wearableData.item_rarity,
					item_slot: wearableData.item_slot,
					Model: "models/development/invisiblebox.vmdl",
					AbilityBehavior: "DOTA_ABILITY_BEHAVIOR_PASSIVE",
					Effect: "particles/items_fx/wearable_" + wearableIndex + ".vpcf"
				};
				fs.writeFileSync(path.join(contentDir, "particles/items_fx/wearable_" + wearableIndex + ".vpcf"), getVpcf(wearableData.model_player));
				localization += `"DOTA_Tooltip_Ability_item_wearable_${wearableIndex}"				"${wearableData.note_name}"\n`;
			}
		}
	}
	fs.writeFileSync(path.join(gameDir, "scripts/npc/kv/abilities/wearable_items.kv"), writeKeyValue({ KeyValue: itemsKV }));
	fs.writeFileSync(path.join(gameDir, "localization/schinese/abilities/wearable_items.txt"), localization);
}
function getVpcf(model: string) {
	return `<!-- kv3 encoding:text:version{e21c7f3c-8a33-41c5-9977-a76d3a32aa0d} format:vpcf36:version{d15c9157-10e0-47bc-9333-1ac81da07b8d} -->
{
	_class = "CParticleSystemDefinition"
	m_nBehaviorVersion = 12
	m_flConstantRadius = 1.0
	m_controlPointConfigurations = 
	[
		{
			m_name = "preview"
		},
	]
	m_Emitters = 
	[
		{
			_class = "C_OP_InstantaneousEmitter"
			m_nParticlesToEmit = 
			{
				m_nType = "PF_TYPE_LITERAL"
				m_nMapType = "PF_MAP_TYPE_DIRECT"
				m_flLiteralValue = 1.0
				m_nControlPoint = 0
				m_nScalarAttribute = 3
				m_nVectorAttribute = 6
				m_nVectorComponent = 0
				m_flRandomMin = 0.0
				m_flRandomMax = 1.0
				m_nRandomMode = "PF_RANDOM_MODE_CONSTANT"
				m_flLOD0 = 0.0
				m_flLOD1 = 0.0
				m_flLOD2 = 0.0
				m_flLOD3 = 0.0
				m_flNoiseOutputMin = 0.0
				m_flNoiseOutputMax = 1.0
				m_flNoiseScale = 0.1
				m_vecNoiseOffsetRate = [ 0.0, 0.0, 0.0 ]
				m_flNoiseOffset = 0.0
				m_nNoiseOctaves = 1
				m_nNoiseTurbulence = "PF_NOISE_TURB_NONE"
				m_nNoiseType = "PF_NOISE_TYPE_PERLIN"
				m_nNoiseModifier = "PF_NOISE_MODIFIER_NONE"
				m_flNoiseTurbulenceScale = 1.0
				m_flNoiseTurbulenceMix = 0.5
				m_flNoiseImgPreviewScale = 1.0
				m_bNoiseImgPreviewLive = true
				m_nInputMode = "PF_INPUT_MODE_CLAMPED"
				m_flMultFactor = 1.0
				m_flInput0 = 0.0
				m_flInput1 = 1.0
				m_flOutput0 = 0.0
				m_flOutput1 = 1.0
				m_nBiasType = "PF_BIAS_TYPE_STANDARD"
				m_flBiasParameter = 0.0
				m_Curve = 
				{
					m_spline = [  ]
					m_tangents = [  ]
					m_vDomainMins = [ 0.0, 0.0 ]
					m_vDomainMaxs = [ 0.0, 0.0 ]
				}
			}
		},
	]
	m_Initializers = 
	[
		{
			_class = "C_INIT_CreateWithinSphere"
		},
	]
	m_Operators = 
	[
		{
			_class = "C_OP_EndCapTimedDecay"
		},
		{
			_class = "C_OP_SpinYaw"
			m_nSpinRateDegrees = 10
		},
		{
			_class = "C_OP_OscillateVectorSimple"
			m_Rate = [ 0.0, 0.0, 60.0 ]
			m_Frequency = [ 1.0, 1.0, 0.3 ]
		},
		{
			_class = "C_OP_PositionLock"
		},
	]
	m_Renderers = 
	[
		{
			_class = "C_OP_RenderModels"
			m_ModelList = 
			[
				{
					m_model = resource:"${model}"
				},
			]
			m_bIgnoreNormal = true
			m_vecLocalOffset = 
			{
				m_nType = "PVEC_TYPE_LITERAL"
				m_vLiteralValue = [ 0.0, 0.0, 200.0 ]
				m_LiteralColor = [ 0, 0, 0 ]
				m_nVectorAttribute = 6
				m_vVectorAttributeScale = [ 1.0, 1.0, 1.0 ]
				m_nControlPoint = 0
				m_vCPValueScale = [ 1.0, 1.0, 1.0 ]
				m_vCPRelativePosition = [ 0.0, 0.0, 0.0 ]
				m_vCPRelativeDir = [ 1.0, 0.0, 0.0 ]
				m_FloatComponentX = 
				{
					m_nType = "PF_TYPE_LITERAL"
					m_nMapType = "PF_MAP_TYPE_DIRECT"
					m_flLiteralValue = 0.0
					m_nControlPoint = 0
					m_nScalarAttribute = 3
					m_nVectorAttribute = 6
					m_nVectorComponent = 0
					m_flRandomMin = 0.0
					m_flRandomMax = 1.0
					m_nRandomMode = "PF_RANDOM_MODE_CONSTANT"
					m_flLOD0 = 0.0
					m_flLOD1 = 0.0
					m_flLOD2 = 0.0
					m_flLOD3 = 0.0
					m_flNoiseOutputMin = 0.0
					m_flNoiseOutputMax = 1.0
					m_flNoiseScale = 0.1
					m_vecNoiseOffsetRate = [ 0.0, 0.0, 0.0 ]
					m_flNoiseOffset = 0.0
					m_nNoiseOctaves = 1
					m_nNoiseTurbulence = "PF_NOISE_TURB_NONE"
					m_nNoiseType = "PF_NOISE_TYPE_PERLIN"
					m_nNoiseModifier = "PF_NOISE_MODIFIER_NONE"
					m_flNoiseTurbulenceScale = 1.0
					m_flNoiseTurbulenceMix = 0.5
					m_flNoiseImgPreviewScale = 1.0
					m_bNoiseImgPreviewLive = true
					m_nInputMode = "PF_INPUT_MODE_CLAMPED"
					m_flMultFactor = 1.0
					m_flInput0 = 0.0
					m_flInput1 = 1.0
					m_flOutput0 = 0.0
					m_flOutput1 = 1.0
					m_nBiasType = "PF_BIAS_TYPE_STANDARD"
					m_flBiasParameter = 0.0
					m_Curve = 
					{
						m_spline = [  ]
						m_tangents = [  ]
						m_vDomainMins = [ 0.0, 0.0 ]
						m_vDomainMaxs = [ 0.0, 0.0 ]
					}
				}
				m_FloatComponentY = 
				{
					m_nType = "PF_TYPE_LITERAL"
					m_nMapType = "PF_MAP_TYPE_DIRECT"
					m_flLiteralValue = 0.0
					m_nControlPoint = 0
					m_nScalarAttribute = 3
					m_nVectorAttribute = 6
					m_nVectorComponent = 0
					m_flRandomMin = 0.0
					m_flRandomMax = 1.0
					m_nRandomMode = "PF_RANDOM_MODE_CONSTANT"
					m_flLOD0 = 0.0
					m_flLOD1 = 0.0
					m_flLOD2 = 0.0
					m_flLOD3 = 0.0
					m_flNoiseOutputMin = 0.0
					m_flNoiseOutputMax = 1.0
					m_flNoiseScale = 0.1
					m_vecNoiseOffsetRate = [ 0.0, 0.0, 0.0 ]
					m_flNoiseOffset = 0.0
					m_nNoiseOctaves = 1
					m_nNoiseTurbulence = "PF_NOISE_TURB_NONE"
					m_nNoiseType = "PF_NOISE_TYPE_PERLIN"
					m_nNoiseModifier = "PF_NOISE_MODIFIER_NONE"
					m_flNoiseTurbulenceScale = 1.0
					m_flNoiseTurbulenceMix = 0.5
					m_flNoiseImgPreviewScale = 1.0
					m_bNoiseImgPreviewLive = true
					m_nInputMode = "PF_INPUT_MODE_CLAMPED"
					m_flMultFactor = 1.0
					m_flInput0 = 0.0
					m_flInput1 = 1.0
					m_flOutput0 = 0.0
					m_flOutput1 = 1.0
					m_nBiasType = "PF_BIAS_TYPE_STANDARD"
					m_flBiasParameter = 0.0
					m_Curve = 
					{
						m_spline = [  ]
						m_tangents = [  ]
						m_vDomainMins = [ 0.0, 0.0 ]
						m_vDomainMaxs = [ 0.0, 0.0 ]
					}
				}
				m_FloatComponentZ = 
				{
					m_nType = "PF_TYPE_LITERAL"
					m_nMapType = "PF_MAP_TYPE_DIRECT"
					m_flLiteralValue = 0.0
					m_nControlPoint = 0
					m_nScalarAttribute = 3
					m_nVectorAttribute = 6
					m_nVectorComponent = 0
					m_flRandomMin = 0.0
					m_flRandomMax = 1.0
					m_nRandomMode = "PF_RANDOM_MODE_CONSTANT"
					m_flLOD0 = 0.0
					m_flLOD1 = 0.0
					m_flLOD2 = 0.0
					m_flLOD3 = 0.0
					m_flNoiseOutputMin = 0.0
					m_flNoiseOutputMax = 1.0
					m_flNoiseScale = 0.1
					m_vecNoiseOffsetRate = [ 0.0, 0.0, 0.0 ]
					m_flNoiseOffset = 0.0
					m_nNoiseOctaves = 1
					m_nNoiseTurbulence = "PF_NOISE_TURB_NONE"
					m_nNoiseType = "PF_NOISE_TYPE_PERLIN"
					m_nNoiseModifier = "PF_NOISE_MODIFIER_NONE"
					m_flNoiseTurbulenceScale = 1.0
					m_flNoiseTurbulenceMix = 0.5
					m_flNoiseImgPreviewScale = 1.0
					m_bNoiseImgPreviewLive = true
					m_nInputMode = "PF_INPUT_MODE_CLAMPED"
					m_flMultFactor = 1.0
					m_flInput0 = 0.0
					m_flInput1 = 1.0
					m_flOutput0 = 0.0
					m_flOutput1 = 1.0
					m_nBiasType = "PF_BIAS_TYPE_STANDARD"
					m_flBiasParameter = 0.0
					m_Curve = 
					{
						m_spline = [  ]
						m_tangents = [  ]
						m_vDomainMins = [ 0.0, 0.0 ]
						m_vDomainMaxs = [ 0.0, 0.0 ]
					}
				}
				m_FloatInterp = 
				{
					m_nType = "PF_TYPE_LITERAL"
					m_nMapType = "PF_MAP_TYPE_DIRECT"
					m_flLiteralValue = 0.0
					m_nControlPoint = 0
					m_nScalarAttribute = 3
					m_nVectorAttribute = 6
					m_nVectorComponent = 0
					m_flRandomMin = 0.0
					m_flRandomMax = 1.0
					m_nRandomMode = "PF_RANDOM_MODE_CONSTANT"
					m_flLOD0 = 0.0
					m_flLOD1 = 0.0
					m_flLOD2 = 0.0
					m_flLOD3 = 0.0
					m_flNoiseOutputMin = 0.0
					m_flNoiseOutputMax = 1.0
					m_flNoiseScale = 0.1
					m_vecNoiseOffsetRate = [ 0.0, 0.0, 0.0 ]
					m_flNoiseOffset = 0.0
					m_nNoiseOctaves = 1
					m_nNoiseTurbulence = "PF_NOISE_TURB_NONE"
					m_nNoiseType = "PF_NOISE_TYPE_PERLIN"
					m_nNoiseModifier = "PF_NOISE_MODIFIER_NONE"
					m_flNoiseTurbulenceScale = 1.0
					m_flNoiseTurbulenceMix = 0.5
					m_flNoiseImgPreviewScale = 1.0
					m_bNoiseImgPreviewLive = true
					m_nInputMode = "PF_INPUT_MODE_CLAMPED"
					m_flMultFactor = 1.0
					m_flInput0 = 0.0
					m_flInput1 = 1.0
					m_flOutput0 = 0.0
					m_flOutput1 = 1.0
					m_nBiasType = "PF_BIAS_TYPE_STANDARD"
					m_flBiasParameter = 0.0
					m_Curve = 
					{
						m_spline = [  ]
						m_tangents = [  ]
						m_vDomainMins = [ 0.0, 0.0 ]
						m_vDomainMaxs = [ 0.0, 0.0 ]
					}
				}
				m_flInterpInput0 = 0.0
				m_flInterpInput1 = 1.0
				m_vInterpOutput0 = [ 0.0, 0.0, 0.0 ]
				m_vInterpOutput1 = [ 1.0, 1.0, 1.0 ]
				m_Gradient = 
				{
					m_Stops = [  ]
				}
			}
		},
	]
	m_Children = 
	[
		{
			m_ChildRef = resource:"particles/items_fx/general_item_drop_lvl_0.vpcf"
		},
		{
			m_ChildRef = resource:"particles/items_fx/wearable_pedestal.vpcf"
			m_flDelay = 0.75
		},
	]
}`;
}