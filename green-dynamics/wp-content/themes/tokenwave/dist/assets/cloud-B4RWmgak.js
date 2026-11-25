import{P as I,S as O,U as X,F as $,V as T,W as G,H as Q,N as ee,T as te,C as j,a as N,A as ie,M as ae,R as se,b as re,c as oe,L as le,d as ne,e as ue,f as he,g as ce,h as fe,i as de,j as pe,k as me,l as ge,G as ve,D as xe,m as be,n as Me,B as Se,o as we,I as Te,p as _e,q as V,r as Ce,s as ye}from"./Pass-CHVVrSE1.js";import{d as b}from"./main-DmFuflSV.js";import { sampleGreenDynamicsLogo } from "./gd-logo-sampling.js";
function Pe(){return sampleGreenDynamicsLogo(b)}const Re=`
attribute vec4 aSeed;
attribute vec3 aDirection;
attribute float aShade;
uniform float uJoinDensity,uJoinSpread,uAssemble;
uniform float uSpillVisibility,uFlowTime,uMotion,uRange,uSizeRatio,uHover,uHoverRadius;
varying float vOpacity;
vec3 curlField(vec3 p,float t){
 return vec3(-cos(p.y*.9+t*.31)-1.3*cos(p.z*1.3+t*.27),
             -cos(p.z+t*.23)-1.2*cos(p.x*1.2+t*.33),
             -cos(p.x+t*.29)-1.1*cos(p.y*1.1+t*.21))*.42;
}
`,Fe=`
float life=fract(aSeed.x+uFlowTime*aSeed.y);
float release=smoothstep(.06,.88,life);
float envelope=smoothstep(0.,.12,life)*(1.-smoothstep(.72,1.,life));
vec3 field=curlField(aHome*8.+aSeed.x*3.,uFlowTime*.18);
vec3 travel=aDirection*release+field*sin(life*3.14159265)*.30;
travel/=max(1.,length(travel));
float intensity=uMotion/.30;
vec3 ambient=field*.006*uMotion*(.35+.65*sin(aSeed.x*6.283+uFlowTime*.12));
p+=ambient*(1.-aSeed.w)+aSeed.w*uRange*travel*intensity;
// Smoothly open gaps only as the logo reaches the careers section.
float joinBlend=clamp((1.-uSpillVisibility)/.8,0.,1.);
p+=joinBlend*(1.-aSeed.w)*uJoinSpread*(field+vec3(sin(aSeed.x*41.),cos(aSeed.x*29.),sin(aSeed.x*17.))*.45);
float coreKeep=1.-smoothstep(uJoinDensity-.04,uJoinDensity+.04,aSeed.x);
float motionSize=clamp(aSeed.z*(.8+.2*release)+aSeed.w*.12*release,0.,1.);
float pixelScale=(1.+(uSizeRatio-1.)*motionSize)*mix(1.,.39,joinBlend);
vOpacity=mix(1.,mix(coreKeep,1.,aSeed.w),joinBlend)*mix(.88,.48*envelope,aSeed.w)*mix(1.,uSpillVisibility,aSeed.w);
`,W={name:"CopyShader",uniforms:{tDiffuse:{value:null},opacity:{value:1}},vertexShader:`

		varying vec2 vUv;

		void main() {

			vUv = uv;
			gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );

		}`,fragmentShader:`

		uniform float opacity;

		uniform sampler2D tDiffuse;

		varying vec2 vUv;

		void main() {

			vec4 texel = texture2D( tDiffuse, vUv );
			gl_FragColor = opacity * texel;


		}`};class Ae extends I{constructor(e,i="tDiffuse"){super(),this.textureID=i,this.uniforms=null,this.material=null,e instanceof O?(this.uniforms=e.uniforms,this.material=e):e&&(this.uniforms=X.clone(e.uniforms),this.material=new O({name:e.name!==void 0?e.name:"unspecified",defines:Object.assign({},e.defines),uniforms:this.uniforms,vertexShader:e.vertexShader,fragmentShader:e.fragmentShader})),this._fsQuad=new $(this.material)}render(e,i,o){this.uniforms[this.textureID]&&(this.uniforms[this.textureID].value=o.texture),this._fsQuad.material=this.material,this.renderToScreen?(e.setRenderTarget(null),this._fsQuad.render(e)):(e.setRenderTarget(i),this.clear&&e.clear(e.autoClearColor,e.autoClearDepth,e.autoClearStencil),this._fsQuad.render(e))}dispose(){this.material.dispose(),this._fsQuad.dispose()}}class q extends I{constructor(e,i){super(),this.scene=e,this.camera=i,this.clear=!0,this.needsSwap=!1,this.inverse=!1}render(e,i,o){const a=e.getContext(),t=e.state;t.buffers.color.setMask(!1),t.buffers.depth.setMask(!1),t.buffers.color.setLocked(!0),t.buffers.depth.setLocked(!0);let s,f;this.inverse?(s=0,f=1):(s=1,f=0),t.buffers.stencil.setTest(!0),t.buffers.stencil.setOp(a.REPLACE,a.REPLACE,a.REPLACE),t.buffers.stencil.setFunc(a.ALWAYS,s,4294967295),t.buffers.stencil.setClear(f),t.buffers.stencil.setLocked(!0),e.setRenderTarget(o),this.clear&&e.clear(),e.render(this.scene,this.camera),e.setRenderTarget(i),this.clear&&e.clear(),e.render(this.scene,this.camera),t.buffers.color.setLocked(!1),t.buffers.depth.setLocked(!1),t.buffers.color.setMask(!0),t.buffers.depth.setMask(!0),t.buffers.stencil.setLocked(!1),t.buffers.stencil.setFunc(a.EQUAL,1,4294967295),t.buffers.stencil.setOp(a.KEEP,a.KEEP,a.KEEP),t.buffers.stencil.setLocked(!0)}}class De extends I{constructor(){super(),this.needsSwap=!1}render(e){e.state.buffers.stencil.setLocked(!1),e.state.buffers.stencil.setTest(!1)}}class Be{constructor(e,i){if(this.renderer=e,this._pixelRatio=e.getPixelRatio(),i===void 0){const o=e.getSize(new T);this._width=o.width,this._height=o.height,i=new G(this._width*this._pixelRatio,this._height*this._pixelRatio,{type:Q}),i.texture.name="EffectComposer.rt1"}else this._width=i.width,this._height=i.height;this.renderTarget1=i,this.renderTarget2=i.clone(),this.renderTarget2.texture.name="EffectComposer.rt2",this.writeBuffer=this.renderTarget1,this.readBuffer=this.renderTarget2,this.renderToScreen=!0,this.passes=[],this.copyPass=new Ae(W),this.copyPass.material.blending=ee,this.timer=new te}swapBuffers(){const e=this.readBuffer;this.readBuffer=this.writeBuffer,this.writeBuffer=e}addPass(e){this.passes.push(e),e.setSize(this._width*this._pixelRatio,this._height*this._pixelRatio)}insertPass(e,i){this.passes.splice(i,0,e),e.setSize(this._width*this._pixelRatio,this._height*this._pixelRatio)}removePass(e){const i=this.passes.indexOf(e);i!==-1&&this.passes.splice(i,1)}isLastEnabledPass(e){for(let i=e+1;i<this.passes.length;i++)if(this.passes[i].enabled)return!1;return!0}render(e){this.timer.update(),e===void 0&&(e=this.timer.getDelta());const i=this.renderer.getRenderTarget();let o=!1;for(let a=0,t=this.passes.length;a<t;a++){const s=this.passes[a];if(s.enabled!==!1){if(s.renderToScreen=this.renderToScreen&&this.isLastEnabledPass(a),s.render(this.renderer,this.writeBuffer,this.readBuffer,e,o),s.needsSwap){if(o){const f=this.renderer.getContext(),r=this.renderer.state.buffers.stencil;r.setFunc(f.NOTEQUAL,1,4294967295),this.copyPass.render(this.renderer,this.writeBuffer,this.readBuffer,e),r.setFunc(f.EQUAL,1,4294967295)}this.swapBuffers()}q!==void 0&&(s instanceof q?o=!0:s instanceof De&&(o=!1))}}this.renderer.setRenderTarget(i)}reset(e){if(e===void 0){const i=this.renderer.getSize(new T);this._pixelRatio=this.renderer.getPixelRatio(),this._width=i.width,this._height=i.height,e=this.renderTarget1.clone(),e.setSize(this._width*this._pixelRatio,this._height*this._pixelRatio)}this.renderTarget1.dispose(),this.renderTarget2.dispose(),this.renderTarget1=e,this.renderTarget2=e.clone(),this.writeBuffer=this.renderTarget1,this.readBuffer=this.renderTarget2}setSize(e,i){this._width=e,this._height=i;const o=this._width*this._pixelRatio,a=this._height*this._pixelRatio;this.renderTarget1.setSize(o,a),this.renderTarget2.setSize(o,a);for(let t=0;t<this.passes.length;t++)this.passes[t].setSize(o,a)}setPixelRatio(e){this._pixelRatio=e,this.setSize(this._width,this._height)}dispose(){this.renderTarget1.dispose(),this.renderTarget2.dispose(),this.copyPass.dispose()}}class ze extends I{constructor(e,i,o=null,a=null,t=null){super(),this.scene=e,this.camera=i,this.overrideMaterial=o,this.clearColor=a,this.clearAlpha=t,this.clear=!0,this.clearDepth=!1,this.needsSwap=!1,this.isRenderPass=!0,this._oldClearColor=new j}render(e,i,o){const a=e.autoClear;e.autoClear=!1;let t,s;this.overrideMaterial!==null&&(s=this.scene.overrideMaterial,this.scene.overrideMaterial=this.overrideMaterial),this.clearColor!==null&&(e.getClearColor(this._oldClearColor),e.setClearColor(this.clearColor,e.getClearAlpha())),this.clearAlpha!==null&&(t=e.getClearAlpha(),e.setClearAlpha(this.clearAlpha)),this.clearDepth==!0&&e.clearDepth(),e.setRenderTarget(this.renderToScreen?null:o),this.clear===!0&&e.clear(e.autoClearColor,e.autoClearDepth,e.autoClearStencil),e.render(this.scene,this.camera),this.clearColor!==null&&e.setClearColor(this._oldClearColor),this.clearAlpha!==null&&e.setClearAlpha(t),this.overrideMaterial!==null&&(this.scene.overrideMaterial=s),e.autoClear=a}}const Ee={uniforms:{tDiffuse:{value:null},luminosityThreshold:{value:1},smoothWidth:{value:1},defaultColor:{value:new j(0)},defaultOpacity:{value:0}},vertexShader:`

		varying vec2 vUv;

		void main() {

			vUv = uv;

			gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );

		}`,fragmentShader:`

		uniform sampler2D tDiffuse;
		uniform vec3 defaultColor;
		uniform float defaultOpacity;
		uniform float luminosityThreshold;
		uniform float smoothWidth;

		varying vec2 vUv;

		void main() {

			vec4 texel = texture2D( tDiffuse, vUv );

			float v = luminance( texel.xyz );

			vec4 outputColor = vec4( defaultColor.rgb, defaultOpacity );

			float alpha = smoothstep( luminosityThreshold, luminosityThreshold + smoothWidth, v );

			gl_FragColor = mix( outputColor, texel, alpha );

		}`};class H extends I{constructor(e,i=1,o,a){super(),this.strength=i,this.radius=o,this.threshold=a,this.resolution=e!==void 0?new T(e.x,e.y):new T(256,256),this.clearColor=new j(0,0,0),this.needsSwap=!1,this.renderTargetsHorizontal=[],this.renderTargetsVertical=[],this.nMips=5;let t=Math.round(this.resolution.x/2),s=Math.round(this.resolution.y/2);this.renderTargetBright=new G(t,s,{type:Q,depthBuffer:!1}),this.renderTargetBright.texture.name="UnrealBloomPass.bright",this.renderTargetBright.texture.generateMipmaps=!1;for(let M=0;M<this.nMips;M++){const y=new G(t,s,{type:Q,depthBuffer:!1});y.texture.name="UnrealBloomPass.h"+M,y.texture.generateMipmaps=!1,this.renderTargetsHorizontal.push(y);const n=new G(t,s,{type:Q,depthBuffer:!1});n.texture.name="UnrealBloomPass.v"+M,n.texture.generateMipmaps=!1,this.renderTargetsVertical.push(n),t=Math.round(t/2),s=Math.round(s/2)}const f=Ee;this.highPassUniforms=X.clone(f.uniforms),this.highPassUniforms.luminosityThreshold.value=a,this.highPassUniforms.smoothWidth.value=.01,this.materialHighPassFilter=new O({uniforms:this.highPassUniforms,vertexShader:f.vertexShader,fragmentShader:f.fragmentShader}),this.separableBlurMaterials=[];const r=[6,10,14,18,22];t=Math.round(this.resolution.x/2),s=Math.round(this.resolution.y/2);for(let M=0;M<this.nMips;M++)this.separableBlurMaterials.push(this._getSeparableBlurMaterial(r[M])),this.separableBlurMaterials[M].uniforms.invSize.value=new T(1/t,1/s),t=Math.round(t/2),s=Math.round(s/2);this.compositeMaterial=this._getCompositeMaterial(this.nMips),this.compositeMaterial.uniforms.blurTexture1.value=this.renderTargetsVertical[0].texture,this.compositeMaterial.uniforms.blurTexture2.value=this.renderTargetsVertical[1].texture,this.compositeMaterial.uniforms.blurTexture3.value=this.renderTargetsVertical[2].texture,this.compositeMaterial.uniforms.blurTexture4.value=this.renderTargetsVertical[3].texture,this.compositeMaterial.uniforms.blurTexture5.value=this.renderTargetsVertical[4].texture,this.compositeMaterial.uniforms.bloomStrength.value=i,this.compositeMaterial.uniforms.bloomRadius.value=.1;const F=[1,.8,.6,.4,.2];this.compositeMaterial.uniforms.bloomFactors.value=F,this.bloomTintColors=[new N(1,1,1),new N(1,1,1),new N(1,1,1),new N(1,1,1),new N(1,1,1)],this.compositeMaterial.uniforms.bloomTintColors.value=this.bloomTintColors,this.copyUniforms=X.clone(W.uniforms),this.blendMaterial=new O({uniforms:this.copyUniforms,vertexShader:W.vertexShader,fragmentShader:W.fragmentShader,premultipliedAlpha:!0,blending:ie,depthTest:!1,depthWrite:!1,transparent:!0}),this._oldClearColor=new j,this._oldClearAlpha=1,this._basic=new ae,this._fsQuad=new $(null)}dispose(){for(let e=0;e<this.renderTargetsHorizontal.length;e++)this.renderTargetsHorizontal[e].dispose();for(let e=0;e<this.renderTargetsVertical.length;e++)this.renderTargetsVertical[e].dispose();this.renderTargetBright.dispose();for(let e=0;e<this.separableBlurMaterials.length;e++)this.separableBlurMaterials[e].dispose();this.compositeMaterial.dispose(),this.blendMaterial.dispose(),this._basic.dispose(),this._fsQuad.dispose()}setSize(e,i){let o=Math.round(e/2),a=Math.round(i/2);this.renderTargetBright.setSize(o,a);for(let t=0;t<this.nMips;t++)this.renderTargetsHorizontal[t].setSize(o,a),this.renderTargetsVertical[t].setSize(o,a),this.separableBlurMaterials[t].uniforms.invSize.value=new T(1/o,1/a),o=Math.round(o/2),a=Math.round(a/2)}render(e,i,o,a,t){e.getClearColor(this._oldClearColor),this._oldClearAlpha=e.getClearAlpha();const s=e.autoClear;e.autoClear=!1,e.setClearColor(this.clearColor,0),t&&e.state.buffers.stencil.setTest(!1),this.renderToScreen&&(this._fsQuad.material=this._basic,this._basic.map=o.texture,e.setRenderTarget(null),e.clear(),this._fsQuad.render(e)),this.highPassUniforms.tDiffuse.value=o.texture,this.highPassUniforms.luminosityThreshold.value=this.threshold,this._fsQuad.material=this.materialHighPassFilter,e.setRenderTarget(this.renderTargetBright),e.clear(),this._fsQuad.render(e);let f=this.renderTargetBright;for(let r=0;r<this.nMips;r++)this._fsQuad.material=this.separableBlurMaterials[r],this.separableBlurMaterials[r].uniforms.colorTexture.value=f.texture,this.separableBlurMaterials[r].uniforms.direction.value=H.BlurDirectionX,e.setRenderTarget(this.renderTargetsHorizontal[r]),e.clear(),this._fsQuad.render(e),this.separableBlurMaterials[r].uniforms.colorTexture.value=this.renderTargetsHorizontal[r].texture,this.separableBlurMaterials[r].uniforms.direction.value=H.BlurDirectionY,e.setRenderTarget(this.renderTargetsVertical[r]),e.clear(),this._fsQuad.render(e),f=this.renderTargetsVertical[r];this._fsQuad.material=this.compositeMaterial,this.compositeMaterial.uniforms.bloomStrength.value=this.strength,this.compositeMaterial.uniforms.bloomRadius.value=this.radius,this.compositeMaterial.uniforms.bloomTintColors.value=this.bloomTintColors,e.setRenderTarget(this.renderTargetsHorizontal[0]),e.clear(),this._fsQuad.render(e),this._fsQuad.material=this.blendMaterial,this.copyUniforms.tDiffuse.value=this.renderTargetsHorizontal[0].texture,t&&e.state.buffers.stencil.setTest(!0),this.renderToScreen?(e.setRenderTarget(null),this._fsQuad.render(e)):(e.setRenderTarget(o),this._fsQuad.render(e)),e.setClearColor(this._oldClearColor,this._oldClearAlpha),e.autoClear=s}_getSeparableBlurMaterial(e){const i=[],o=e/3;for(let s=0;s<e;s++)i.push(.39894*Math.exp(-.5*s*s/(o*o))/o);const a=[],t=[];for(let s=1;s<e;s+=2){const f=i[s],r=s+1<e?i[s+1]:0,F=f+r;a.push((s*f+(s+1)*r)/F),t.push(F)}return new O({defines:{KERNEL_PAIRS:a.length},uniforms:{colorTexture:{value:null},invSize:{value:new T(.5,.5)},direction:{value:new T(.5,.5)},centerWeight:{value:i[0]},gaussianOffsets:{value:a},gaussianWeights:{value:t}},vertexShader:`

				varying vec2 vUv;

				void main() {

					vUv = uv;
					gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );

				}`,fragmentShader:`

				#include <common>

				varying vec2 vUv;

				uniform sampler2D colorTexture;
				uniform vec2 invSize;
				uniform vec2 direction;
				uniform float centerWeight;
				uniform float gaussianOffsets[KERNEL_PAIRS];
				uniform float gaussianWeights[KERNEL_PAIRS];

				void main() {

					vec3 diffuseSum = texture2D( colorTexture, vUv ).rgb * centerWeight;

					for ( int i = 0; i < KERNEL_PAIRS; i ++ ) {

						vec2 uvOffset = direction * invSize * gaussianOffsets[ i ];
						vec3 sample1 = texture2D( colorTexture, vUv + uvOffset ).rgb;
						vec3 sample2 = texture2D( colorTexture, vUv - uvOffset ).rgb;
						diffuseSum += ( sample1 + sample2 ) * gaussianWeights[ i ];

					}

					gl_FragColor = vec4( diffuseSum, 1.0 );

				}`})}_getCompositeMaterial(e){return new O({defines:{NUM_MIPS:e},uniforms:{blurTexture1:{value:null},blurTexture2:{value:null},blurTexture3:{value:null},blurTexture4:{value:null},blurTexture5:{value:null},bloomStrength:{value:1},bloomFactors:{value:null},bloomTintColors:{value:null},bloomRadius:{value:0}},vertexShader:`

				varying vec2 vUv;

				void main() {

					vUv = uv;
					gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );

				}`,fragmentShader:`

				varying vec2 vUv;

				uniform sampler2D blurTexture1;
				uniform sampler2D blurTexture2;
				uniform sampler2D blurTexture3;
				uniform sampler2D blurTexture4;
				uniform sampler2D blurTexture5;
				uniform float bloomStrength;
				uniform float bloomRadius;
				uniform float bloomFactors[NUM_MIPS];
				uniform vec3 bloomTintColors[NUM_MIPS];

				float lerpBloomFactor( const in float factor ) {

					float mirrorFactor = 1.2 - factor;
					return mix( factor, mirrorFactor, bloomRadius );

				}

				void main() {

					// 3.0 for backwards compatibility with previous alpha-based intensity
					vec3 bloom = 3.0 * bloomStrength * (
						lerpBloomFactor( bloomFactors[ 0 ] ) * bloomTintColors[ 0 ] * texture2D( blurTexture1, vUv ).rgb +
						lerpBloomFactor( bloomFactors[ 1 ] ) * bloomTintColors[ 1 ] * texture2D( blurTexture2, vUv ).rgb +
						lerpBloomFactor( bloomFactors[ 2 ] ) * bloomTintColors[ 2 ] * texture2D( blurTexture3, vUv ).rgb +
						lerpBloomFactor( bloomFactors[ 3 ] ) * bloomTintColors[ 3 ] * texture2D( blurTexture4, vUv ).rgb +
						lerpBloomFactor( bloomFactors[ 4 ] ) * bloomTintColors[ 4 ] * texture2D( blurTexture5, vUv ).rgb
					);

					float bloomAlpha = max( bloom.r, max( bloom.g, bloom.b ) );
					gl_FragColor = vec4( bloom, bloomAlpha );

				}`})}}H.BlurDirectionX=new T(1,0);H.BlurDirectionY=new T(0,1);const k={name:"OutputShader",uniforms:{tDiffuse:{value:null},toneMappingExposure:{value:1}},vertexShader:`
		precision highp float;

		uniform mat4 modelViewMatrix;
		uniform mat4 projectionMatrix;

		attribute vec3 position;
		attribute vec2 uv;

		varying vec2 vUv;

		void main() {

			vUv = uv;
			gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );

		}`,fragmentShader:`

		precision highp float;

		uniform sampler2D tDiffuse;

		#include <tonemapping_pars_fragment>
		#include <colorspace_pars_fragment>

		varying vec2 vUv;

		void main() {

			gl_FragColor = texture2D( tDiffuse, vUv );

			// tone mapping

			#ifdef LINEAR_TONE_MAPPING

				gl_FragColor.rgb = LinearToneMapping( gl_FragColor.rgb );

			#elif defined( REINHARD_TONE_MAPPING )

				gl_FragColor.rgb = ReinhardToneMapping( gl_FragColor.rgb );

			#elif defined( CINEON_TONE_MAPPING )

				gl_FragColor.rgb = CineonToneMapping( gl_FragColor.rgb );

			#elif defined( ACES_FILMIC_TONE_MAPPING )

				gl_FragColor.rgb = ACESFilmicToneMapping( gl_FragColor.rgb );

			#elif defined( AGX_TONE_MAPPING )

				gl_FragColor.rgb = AgXToneMapping( gl_FragColor.rgb );

			#elif defined( NEUTRAL_TONE_MAPPING )

				gl_FragColor.rgb = NeutralToneMapping( gl_FragColor.rgb );

			#elif defined( CUSTOM_TONE_MAPPING )

				gl_FragColor.rgb = CustomToneMapping( gl_FragColor.rgb );

			#endif

			// color space

			#ifdef SRGB_TRANSFER

				gl_FragColor = sRGBTransferOETF( gl_FragColor );

			#endif

		}`};class Ne extends I{constructor(){super(),this.isOutputPass=!0,this.uniforms=X.clone(k.uniforms),this.material=new se({name:k.name,uniforms:this.uniforms,vertexShader:k.vertexShader,fragmentShader:k.fragmentShader}),this._fsQuad=new $(this.material),this._outputColorSpace=null,this._toneMapping=null}render(e,i,o){this.uniforms.tDiffuse.value=o.texture,this.uniforms.toneMappingExposure.value=e.toneMappingExposure,(this._outputColorSpace!==e.outputColorSpace||this._toneMapping!==e.toneMapping)&&(this._outputColorSpace=e.outputColorSpace,this._toneMapping=e.toneMapping,this.material.defines={},re.getTransfer(this._outputColorSpace)===oe&&(this.material.defines.SRGB_TRANSFER=""),this._toneMapping===le?this.material.defines.LINEAR_TONE_MAPPING="":this._toneMapping===ne?this.material.defines.REINHARD_TONE_MAPPING="":this._toneMapping===ue?this.material.defines.CINEON_TONE_MAPPING="":this._toneMapping===he?this.material.defines.ACES_FILMIC_TONE_MAPPING="":this._toneMapping===ce?this.material.defines.AGX_TONE_MAPPING="":this._toneMapping===fe?this.material.defines.NEUTRAL_TONE_MAPPING="":this._toneMapping===de&&(this.material.defines.CUSTOM_TONE_MAPPING=""),this.material.needsUpdate=!0),this.renderToScreen===!0?(e.setRenderTarget(null),this._fsQuad.render(e)):(e.setRenderTarget(i),this.clear&&e.clear(e.autoClearColor,e.autoClearDepth,e.autoClearStencil),this._fsQuad.render(e))}dispose(){this.material.dispose(),this._fsQuad.dispose()}}const L={pointSize:.0053,bloom:.008,height:.7,bleed:.07};function K(w){const e=new j(w);return`vec3(${e.r.toFixed(6)},${e.g.toFixed(6)},${e.b.toFixed(6)})`}function He(w){const e=document.querySelector(w),i=new pe({alpha:!0,antialias:!1});i.setPixelRatio(Math.min(devicePixelRatio,2)),i.setClearColor(0,0),e.append(i.domElement);const o=new me,a=new ge(30,1,.01,40),t=new ve;t.rotation.order="YXZ",o.add(t);const s=new Be(i,new G(1,1,{type:Q}));s.addPass(new ze(o,a));const f=new H(new T(1,1),L.bloom,.9,0),r=i.getPixelRatio();f.compositeMaterial.fragmentShader=f.compositeMaterial.fragmentShader.replace("3.0 * bloomStrength * (","3.0 * (").replace("float bloomAlpha","float lum=max(dot(bloom,vec3(.2126,.7152,.0722)),1e-5); bloom=bloomStrength*bloom*(pow(lum,.60)/lum); float bloomAlpha"),[3,5,7,9,11].forEach((l,g)=>{f.separableBlurMaterials[g].dispose(),f.separableBlurMaterials[g]=f._getSeparableBlurMaterial(l)});const F=f.setSize.bind(f);f.setSize=(l,g)=>{F(Math.round(l/r),Math.round(g/r)),f.highPassUniforms.uSrc.value.set(r/2/l,r/2/g)},f.highPassUniforms.uSrc={value:new T},f.materialHighPassFilter.fragmentShader=`uniform vec2 uSrc;
`+f.materialHighPassFilter.fragmentShader.replace(/texture2D\( tDiffuse, vUv \)/g,"(.25*(texture2D(tDiffuse,vUv+uSrc)+texture2D(tDiffuse,vUv-uSrc)+texture2D(tDiffuse,vUv+vec2(uSrc.x,-uSrc.y))+texture2D(tDiffuse,vUv+vec2(-uSrc.x,uSrc.y))))"),s.addPass(f);const M=new Ne;M.material.fragmentShader=M.material.fragmentShader.replace(/(#ifdef SRGB_TRANSFER[\s\S]*?#endif)/,`$1
 gl_FragColor.a=max(gl_FragColor.a,max(gl_FragColor.r,max(gl_FragColor.g,gl_FragColor.b)));`),s.addPass(M);const y=new xe(new Float32Array(4),1,1,be,Me);y.needsUpdate=!0;const n={uAssemble:{value:document.documentElement.classList.contains("hero-assembly-pending")?0:1},uFlowTime:{value:0},uSpillVisibility:{value:1},uJoinDensity:{value:b.joinCoreDensity},uJoinSpread:{value:b.joinSpread},uMotion:{value:b.motionIntensity},uRange:{value:b.spillRange*.867},uSizeRatio:{value:b.sizeRatio},uHover:{value:0},uHoverRadius:{value:b.hoverRadius},uState:{value:y},uFlow:{value:y},uOrigin:{value:new T},uSpan:{value:1},uUnits:{value:1},uSize:{value:L.pointSize},uViewport:{value:new T},uCenter:{value:new T(0,.1)},uScatter:{value:0},uDim:{value:0},uTime:{value:0},uHead:{value:new T},uHeadR:{value:1}};let p,m,h,x,c,u,v,P=[0,0,0],A=0;const d={renderer:i,scene:o,camera:a,rig:t,uniforms:n,stage:e,stageBox:{s:1,tx:0,ty:0},headNdc:new N,headPx:{w:1,h:1},heroY:0,render:()=>s.render(),place:U,ready:null};function U(l,g=[0,0,0],_=0){var C;if(!p)return;n.uRange.value=b.spillRange*.867/Math.max(.45,d.stageBox.s),v=l,P=g,A=_;const R=l.scale;t.scale.setScalar(R),t.rotation.set(l.pitch+g[0]*_,l.yaw+g[1]*_,l.roll+g[2]*_);const B=c.clone().multiplyScalar(R).applyEuler(t.rotation),z=(a.position.z-B.z)*Math.tan(Math.PI/12);t.position.set(l.x*z*a.aspect-B.x,l.y*z-B.y,0),t.rotation.set(l.pitch+g[0],l.yaw+g[1],l.roll+g[2]),t.updateMatrixWorld(!0),d.localPerPx=x/e.clientHeight/R,n.uUnits.value=d.localPerPx,n.uSize.value=L.pointSize*R,d.headNdc.copy(new N(0,.1,0).applyMatrix4(p.matrixWorld).project(a)),d.headPx={w:u.x*R/(x/e.clientHeight),h:u.y*R/(x/e.clientHeight)},n.uHead.value.set(d.headNdc.x,d.headNdc.y),n.uHeadR.value=Math.max(d.headPx.h/e.clientHeight,.001),(C=d.onPlace)==null||C.call(d)}function D(){var _;const l=e.clientWidth,g=e.clientHeight;i.setSize(l,g,!1),s.setSize(l,g),a.aspect=l/g,n.uViewport.value.set(l,g),m&&(x=Math.max(h.y/L.height,h.x/(.82*a.aspect)),a.position.z=x/2/Math.tan(Math.PI/12),d.heroY=.1/(x/2),document.documentElement.style.setProperty("--bust-top",`${(1+L.bleed-h.y/x)*100}%`)),a.updateProjectionMatrix(),v&&U(v,P,A),(_=d.onResize)==null||_.call(d),d.render()}d.ready=Promise.resolve().then(()=>{const{positions:l,seeds:g,directions:_,shades:R}=Pe(),B=new Se;B.setAttribute("position",new we(l,3)),B.computeBoundingBox(),m=B.boundingBox.clone(),h=m.getSize(new N),c=new N(0,.1-m.min.y,0),u=h.clone(),d.box=m,d.home=l,d.side=2**Math.ceil(Math.log2(Math.sqrt(l.length/3)));const z=new Float32Array(l.length/3*2);for(let E=0;E<l.length/3;E++)z[E*2]=(E%d.side+.5)/d.side,z[E*2+1]=(Math.floor(E/d.side)+.5)/d.side;const C=new Te;C.setAttribute("position",new _e([-1,-1,0,1,-1,0,-1,1,0,1,1,0],3)),C.setIndex([0,1,2,2,1,3]),C.setAttribute("aHome",new V(l,3)),C.setAttribute("aSeed",new V(g,4)),C.setAttribute("aDirection",new V(_,3)),C.setAttribute("aShade",new V(R,1)),C.setAttribute("aRef",new V(z,2)),C.instanceCount=l.length/3;const Y=new O({uniforms:n,side:Ce,transparent:!0,depthWrite:!1,vertexShader:`${Re}attribute vec3 aHome;attribute vec2 aRef;uniform sampler2D uState,uFlow;uniform float uUnits,uSize,uScatter,uTime,uSpan;uniform vec2 uViewport,uCenter,uOrigin;varying vec3 vCol;varying float vDrop,vTail,vFade;varying vec2 vNdc;void main(){vec4 st=texture2D(uState,aRef);vec3 r=fract(sin(vec3(dot(aRef,vec2(12.9898,78.233)),dot(aRef,vec2(39.3468,11.135)),dot(aRef,vec2(73.156,52.235))))*vec3(43758.5453,24634.6345,9631.7453));vec3 fling=normalize(r-.5+.001)*(.35+.65*r.x)*.05;vec3 drift=vec3(sin(uTime*.7+r.y*6.283),cos(uTime*.6+r.z*6.283),0.)*.01;vec3 p=aHome+vec3(st.xy*uUnits,0.)+(fling+drift)*uScatter*uScatter;${Fe}vDrop=step(1.-uScatter*.7,r.z);vec4 c=projectionMatrix*modelViewMatrix*vec4(p,1.);// Travel from all four viewport edges into each particle's exact live 3D target.
float arrival=clamp((uAssemble-aSeed.x*.16)/.84,0.,1.);
float gather=arrival*arrival*(3.-2.*arrival);
float angle=r.x*6.2831853;
vec2 radial=vec2(cos(angle),sin(angle));
vec2 start=radial/max(abs(radial.x),abs(radial.y))*(1.12+r.y*.65);
vec2 targetNdc=c.xy/c.w;
vec2 curl=vec2(-radial.y,radial.x)*sin(gather*3.14159265)*(.10+.16*r.z)*(1.-gather);
c.xy=(mix(start,targetNdc,gather)+curl)*c.w;
vOpacity*=smoothstep(0.,.12,arrival);
vec4 next=projectionMatrix*modelViewMatrix*vec4(p+vec3(st.zw*uUnits,0.),1.);vec2 v=(next.xy/next.w-c.xy/c.w)*uViewport*.5;float h=uSize*pixelScale*(1.-.45*uScatter)/(2.*c.w)*.5*uViewport.y;
// Equal pixel dimensions on both axes: no streaks, circles or stretched sprites.
// Final section: thin the lower field and protect mobile copy with a soft left-edge falloff.
vec2 joinNdc=c.xy/c.w;
float lowerDensity=mix(.08,1.,smoothstep(-.45,.55,joinNdc.y));
float lowerKeep=1.-smoothstep(lowerDensity-.03,lowerDensity+.03,r.z);
float mobileCopy=mix(1.,.12+.88*(1.-smoothstep(-.95,-.45,joinNdc.x)),1.-step(701.,uViewport.x));
vOpacity*=mix(1.,lowerKeep*mobileCopy,joinBlend);
vFade=0.;vTail=0.;vec2 off=position.xy*h;vNdc=c.xy/c.w;c.xy+=off/uViewport*2.*c.w;gl_Position=c;float height=clamp((aHome.y+.44)/.88,0.,1.);
vec3 col=mix(${K(b.blue)},${K(b.cyan)},height*.48);
float ink=texture2D(uFlow,clamp((aHome.xy-uOrigin)/uSpan,0.,1.)).w;
float proximity=1.-smoothstep(0.,uHoverRadius,distance(aHome.xy,uCenter));
float touch=clamp(max(ink*.95,proximity*uHover),0.,1.);
// A few green flow accents; pointer contact blooms locally into lime then recedes.
float accent=aSeed.w*smoothstep(.60,.96,height)*.65;
col=mix(col,${K(b.green)},max(touch,accent));
vCol=col*aShade*(.76+.24*r.y);
}`,fragmentShader:`varying float vOpacity;uniform float uDim,uHeadR;uniform vec2 uHead,uViewport;varying vec3 vCol;varying float vDrop,vTail,vFade;varying vec2 vNdc;void main(){float hash=fract(sin(dot(gl_FragCoord.xy,vec2(12.9898,78.233)))*43758.5453);if(vOpacity<.005||vDrop>.5||clamp(vTail,0.,1.)*.55*vFade>hash)discard;vec3 col=vCol*mix(.665,1.335,hash);float r=length((vNdc-uHead)*vec2(uViewport.x/uViewport.y,1.))/uHeadR;float edge=smoothstep(.3,1.3,r);float dir=-clamp(uHead.x/.3,-1.,1.);float side=smoothstep(-.2,1.,dir*(vNdc.x-uHead.x));col*=(1.-uDim*.1)*(1.-uDim*.6*edge)*(1.-uDim*.45*side);gl_FragColor=vec4(col,vOpacity);#include <colorspace_fragment>
}`.replace(";#include",`;
#include`)});return p=new ye(C,Y),p.frustumCulled=!1,p.position.y=-m.min.y,t.add(p),d.points=p,D(),U({x:0,y:d.heroY,scale:1,yaw:0,pitch:0,roll:0}),d.render(),d});const S=new ResizeObserver(D);return S.observe(e),d.dispose=()=>{S.disconnect(),p==null||p.geometry.dispose(),p==null||p.material.dispose(),y.dispose(),f.dispose(),M.dispose(),s.dispose(),i.dispose(),i.forceContextLoss(),i.domElement.remove()},d}export{He as initCloud};
