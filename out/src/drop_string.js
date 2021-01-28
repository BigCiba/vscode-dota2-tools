"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DropHeroString = void 0;
class DropHeroString {
    constructor(sHeroName) {
        this.sHeroName = sHeroName;
        this.strDropVtex =
            `<!-- dmx encoding keyvalues2_noids 1 format vtex 1 -->
"CDmeVtex"
{
	"m_inputTextureArray" "element_array" 
	[
		"CDmeInputTexture"
		{
			"m_name" "string" "0"
			"m_fileName" "string" "materials/items/npc_dota_hero_${this.sHeroName}.tga"
			"m_colorSpace" "string" "srgb"
			"m_typeString" "string" "2D"
		}
	]
	"m_outputTypeString" "string" "2D"
	"m_outputFormat" "string" "DXT5"
	"m_textureOutputChannelArray" "element_array"
	[
		"CDmeTextureOutputChannel"
		{
			"m_inputTextureArray" "string_array"
				[
					"0"
				]
			"m_srcChannels" "string" "rgba"
			"m_dstChannels" "string" "rgba"
			"m_mipAlgorithm" "CDmeImageProcessor"
			{
				"m_algorithm" "string" ""
				"m_stringArg" "string" ""
				"m_vFloat4Arg" "vector4" "0 0 0 0"
			}
			"m_outputColorSpace" "string" "srgb"
		}
	]
}`;
        this.strDropVPCF =
            `<!-- kv3 encoding:text:version{e21c7f3c-8a33-41c5-9977-a76d3a32aa0d} format:vpcf26:version{26288658-411e-4f14-b698-2e1e5d00dec6} -->
{
	_class = "CParticleSystemDefinition"
	m_nBehaviorVersion = 10
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
		{
			_class = "C_INIT_PositionOffset"
			m_OffsetMin = [ 0.0, 0.0, 100.0 ]
			m_OffsetMax = [ 0.0, 0.0, 100.0 ]
		},
	]
	m_Operators = 
	[
		{
			_class = "C_OP_PositionLock"
		},
		{
			_class = "C_OP_EndCapTimedDecay"
		},
	]
	m_Renderers = 
	[
		{
			_class = "C_OP_RenderSprites"
			m_hTexture = resource:"materials/npc_dota_hero_${this.sHeroName}.vtex"
		},
	]
	m_Children = 
	[
		{
			m_ChildRef = resource:"particles/generic_gameplay/dropped_item.vpcf"
		},
	]
	m_nMaxParticles = 1
	m_flConstantRadius = 48.0
	m_controlPointConfigurations = 
	[
		{
			m_name = "preview"
			m_drivers = 
			[
				{
					m_iAttachType = "PATTACH_WORLDORIGIN"
					m_vecOffset = [ 0.0, 0.0, 0.0 ]
					m_angOffset = [ null, null, null ]
					m_entityName = "self"
				},
			]
		},
	]
}`;
    }
}
exports.DropHeroString = DropHeroString;
//# sourceMappingURL=drop_string.js.map