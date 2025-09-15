"use strict";var Se=Object.create;var T=Object.defineProperty;var ke=Object.getOwnPropertyDescriptor;var Ie=Object.getOwnPropertyNames;var xe=Object.getPrototypeOf,Ce=Object.prototype.hasOwnProperty;var ve=(r,e)=>{for(var t in e)T(r,t,{get:e[t],enumerable:!0})},B=(r,e,t,a)=>{if(e&&typeof e=="object"||typeof e=="function")for(let s of Ie(e))!Ce.call(r,s)&&s!==t&&T(r,s,{get:()=>e[s],enumerable:!(a=ke(e,s))||a.enumerable});return r};var w=(r,e,t)=>(t=r!=null?Se(xe(r)):{},B(e||!r||!r.__esModule?T(t,"default",{value:r,enumerable:!0}):t,r)),Pe=r=>B(T({},"__esModule",{value:!0}),r);var je={};ve(je,{default:()=>Ve});module.exports=Pe(je);var $=w(require("react")),f=require("@raycast/api");var G=w(require("node:child_process")),K=require("node:buffer"),P=w(require("node:stream")),J=require("node:util");var X=require("react/jsx-runtime");var N=globalThis;var A=r=>!!r&&typeof r=="object"&&typeof r.removeListener=="function"&&typeof r.emit=="function"&&typeof r.reallyExit=="function"&&typeof r.listeners=="function"&&typeof r.kill=="function"&&typeof r.pid=="number"&&typeof r.on=="function",_=Symbol.for("signal-exit emitter"),U=class{constructor(){if(this.emitted={afterExit:!1,exit:!1},this.listeners={afterExit:[],exit:[]},this.count=0,this.id=Math.random(),N[_])return N[_];Object.defineProperty(N,_,{value:this,writable:!1,enumerable:!1,configurable:!1})}on(e,t){this.listeners[e].push(t)}removeListener(e,t){let a=this.listeners[e],s=a.indexOf(t);s!==-1&&(s===0&&a.length===1?a.length=0:a.splice(s,1))}emit(e,t,a){if(this.emitted[e])return!1;this.emitted[e]=!0;let s=!1;for(let o of this.listeners[e])s=o(t,a)===!0||s;return e==="exit"&&(s=this.emit("afterExit",t,a)||s),s}},z=class{onExit(){return()=>{}}load(){}unload(){}},L=class{#o;#t;#e;#i;#s;#n;#a;#r;constructor(e){this.#o=process.platform==="win32"?"SIGINT":"SIGHUP",this.#t=new U,this.#n={},this.#a=!1,this.#r=[],this.#r.push("SIGHUP","SIGINT","SIGTERM"),globalThis.process.platform!=="win32"&&this.#r.push("SIGALRM","SIGABRT","SIGVTALRM","SIGXCPU","SIGXFSZ","SIGUSR2","SIGTRAP","SIGSYS","SIGQUIT","SIGIOT"),globalThis.process.platform==="linux"&&this.#r.push("SIGIO","SIGPOLL","SIGPWR","SIGSTKFLT"),this.#e=e,this.#n={};for(let t of this.#r)this.#n[t]=()=>{let a=this.#e.listeners(t),{count:s}=this.#t,o=e;if(typeof o.__signal_exit_emitter__=="object"&&typeof o.__signal_exit_emitter__.count=="number"&&(s+=o.__signal_exit_emitter__.count),a.length===s){this.unload();let n=this.#t.emit("exit",null,t),c=t==="SIGHUP"?this.#o:t;n||e.kill(e.pid,c)}};this.#s=e.reallyExit,this.#i=e.emit}onExit(e,t){if(!A(this.#e))return()=>{};this.#a===!1&&this.load();let a=t?.alwaysLast?"afterExit":"exit";return this.#t.on(a,e),()=>{this.#t.removeListener(a,e),this.#t.listeners.exit.length===0&&this.#t.listeners.afterExit.length===0&&this.unload()}}load(){if(!this.#a){this.#a=!0,this.#t.count+=1;for(let e of this.#r)try{let t=this.#n[e];t&&this.#e.on(e,t)}catch{}this.#e.emit=(e,...t)=>this.#l(e,...t),this.#e.reallyExit=e=>this.#c(e)}}unload(){this.#a&&(this.#a=!1,this.#r.forEach(e=>{let t=this.#n[e];if(!t)throw new Error("Listener not defined for signal: "+e);try{this.#e.removeListener(e,t)}catch{}}),this.#e.emit=this.#i,this.#e.reallyExit=this.#s,this.#t.count-=1)}#c(e){return A(this.#e)?(this.#e.exitCode=e||0,this.#t.emit("exit",this.#e.exitCode,null),this.#s.call(this.#e,this.#e.exitCode)):0}#l(e,...t){let a=this.#i;if(e==="exit"&&A(this.#e)){typeof t[0]=="number"&&(this.#e.exitCode=t[0]);let s=a.call(this.#e,e,...t);return this.#t.emit("exit",this.#e.exitCode,null),s}else return a.call(this.#e,e,...t)}},O=null,Te=(r,e)=>(O||(O=A(process)?new L(process):new z),O.onExit(r,e));function Ae(r,{timeout:e}={}){let t=new Promise((c,h)=>{r.on("exit",(d,y)=>{c({exitCode:d,signal:y,timedOut:!1})}),r.on("error",d=>{h(d)}),r.stdin&&r.stdin.on("error",d=>{h(d)})}),a=Te(()=>{r.kill()});if(e===0||e===void 0)return t.finally(()=>a());let s,o=new Promise((c,h)=>{s=setTimeout(()=>{r.kill("SIGTERM"),h(Object.assign(new Error("Timed out"),{timedOut:!0,signal:"SIGTERM"}))},e)}),n=t.finally(()=>{clearTimeout(s)});return Promise.race([o,n]).finally(()=>a())}var W=class extends Error{constructor(){super("The output is too big"),this.name="MaxBufferError"}};function Ee(r){let{encoding:e}=r,t=e==="buffer",a=new P.default.PassThrough({objectMode:!1});e&&e!=="buffer"&&a.setEncoding(e);let s=0,o=[];return a.on("data",n=>{o.push(n),s+=n.length}),a.getBufferedValue=()=>t?Buffer.concat(o,s):o.join(""),a.getBufferedLength=()=>s,a}async function V(r,e){let t=Ee(e);return await new Promise((a,s)=>{let o=n=>{n&&t.getBufferedLength()<=K.constants.MAX_LENGTH&&(n.bufferedData=t.getBufferedValue()),s(n)};(async()=>{try{await(0,J.promisify)(P.default.pipeline)(r,t),a()}catch(n){o(n)}})(),t.on("data",()=>{t.getBufferedLength()>8e7&&o(new W)})}),t.getBufferedValue()}async function j(r,e){r.destroy();try{return await e}catch(t){return t.bufferedData}}async function De({stdout:r,stderr:e},{encoding:t},a){let s=V(r,{encoding:t}),o=V(e,{encoding:t});try{return await Promise.all([a,s,o])}catch(n){return Promise.all([{error:n,exitCode:null,signal:n.signal,timedOut:n.timedOut||!1},j(r,s),j(e,o)])}}function Re(r){let e=typeof r=="string"?`
`:10,t=typeof r=="string"?"\r":13;return r[r.length-1]===e&&(r=r.slice(0,-1)),r[r.length-1]===t&&(r=r.slice(0,-1)),r}function H(r,e){return r.stripFinalNewline?Re(e):e}function Ne({timedOut:r,timeout:e,signal:t,exitCode:a}){return r?`timed out after ${e} milliseconds`:t!=null?`was killed with ${t}`:a!=null?`failed with exit code ${a}`:"failed"}function _e({stdout:r,stderr:e,error:t,signal:a,exitCode:s,command:o,timedOut:n,options:c,parentError:h}){let y=`Command ${Ne({timedOut:n,timeout:c?.timeout,signal:a,exitCode:s})}: ${o}`,l=t?`${y}
${t.message}`:y,C=[l,e,r].filter(Boolean).join(`
`);return t?t.originalMessage=t.message:t=h,t.message=C,t.shortMessage=l,t.command=o,t.exitCode=s,t.signal=a,t.stdout=r,t.stderr=e,"bufferedData"in t&&delete t.bufferedData,t}function Oe({stdout:r,stderr:e,error:t,exitCode:a,signal:s,timedOut:o,command:n,options:c,parentError:h}){if(t||a!==0||s!==null)throw _e({error:t,exitCode:a,signal:s,stdout:r,stderr:e,command:n,timedOut:o,options:c,parentError:h});return r}async function m(r,e,t){if(process.platform!=="darwin")throw new Error("AppleScript is only supported on macOS");let{humanReadableOutput:a,language:s,timeout:o,...n}=Array.isArray(e)?t||{}:e||{},c=a!==!1?[]:["-ss"];s==="JavaScript"&&c.push("-l","JavaScript"),Array.isArray(e)&&c.push("-",...e);let h=G.default.spawn("osascript",c,{...n,env:{PATH:"/usr/local/bin:/usr/bin:/bin:/usr/sbin:/sbin"}}),d=Ae(h,{timeout:o??1e4});h.stdin.end(r);let[{error:y,exitCode:l,signal:C,timedOut:R},F,v]=await De(h,{encoding:"utf8"},d),we=H({stripFinalNewline:!0},F),$e=H({stripFinalNewline:!0},v);return Oe({stdout:we,stderr:$e,error:y,exitCode:l,signal:C,timedOut:R,command:"osascript",options:t,parentError:new Error})}var i={blur:"Blur",colorAdjustment:"Color Adjustment",colorEffect:"Color Effect",compositeOperation:"Composite Operation",distortion:"Distortion",generator:"Generator",gradient:"Gradient",halftone:"Halftone",sharpen:"Sharpen",stylize:"Stylize",tile:"Tile",stillImage:"Still Image",interlaced:"Interlaced",highDynamicRange:"High Dynamic Range"};var ae=require("@raycast/api"),Ue=(r,e,t)=>`use framework "Foundation"
    use framework "Quartz"
    use framework "PDFKit"
    use scripting additions

    on getTrueSize(image)
      set rep to image's representations()'s objectAtIndex:0
      set imageSize to current application's NSMakeSize(rep's pixelsWide, rep's pixelsHigh)
      return imageSize as record
    end getTrueSize

    set res to ""
    set thePDF to missing value

    applyFilter("${r}", "${e}")
    on applyFilter(sourcePath, destinationPath)
        global thePDF
        set repeatCount to 1
        if "${r}" ends with ".pdf" then
            set thePDF to current application's PDFDocument's alloc()'s initWithURL:(current application's |NSURL|'s fileURLWithPath:sourcePath)
            set pageCount to thePDF's pageCount()
            set repeatCount to pageCount
        end if

        repeat with i from 1 to repeatCount
          if thePDF is not missing value then
            set thePage to thePDF's pageAtIndex:(i - 1)
            set theData to thePage's dataRepresentation()
            set theImage to current application's NSImage's alloc()'s initWithData:theData
          else
            set theImage to current application's NSImage's alloc()'s initWithContentsOfFile:sourcePath
          end if

          set imgSize to getTrueSize(theImage)
          
          -- Set up the Filter
          set filterName to "${t}"
          set theFilter to current application's CIFilter's filterWithName:filterName
          theFilter's setDefaults()`,ze=`-- Get result & crop to original image size
    set theBounds to current application's NSMakeRect(0, 0, imgSize's width, imgSize's height)
    set uncroppedOutput to theFilter's valueForKey:(current application's kCIOutputImageKey)
    set croppedOutput to uncroppedOutput's imageByCroppingToRect:(uncroppedOutput's extent())
    
    -- Detect if output is an infinite image, bound it to the original image size
    if item 1 of (item 2 of uncroppedOutput's extent()) > 100000 or item 2 of (item 2 of uncroppedOutput's extent()) > 100000 then
      set croppedOutput to uncroppedOutput's imageByCroppingToRect:theBounds
    end if
    
    -- Convert back to NSImage and save to file
    set theRep to current application's NSCIImageRep's imageRepWithCIImage:croppedOutput
    set theResult to current application's NSImage's alloc()'s initWithSize:(theRep's |size|())
    theResult's addRepresentation:theRep
    saveImage(theResult, sourcePath, destinationPath, i)`,Le=`on saveImage(imageToSave, sourcePath, destinationPath, iter)
    global thePDF
    if destinationPath ends with ".pdf" then
      -- Replaces the contents of a PDF page with the supplied NSImage
      set newPage to current application's PDFPage's alloc()'s initWithImage:imageToSave
      thePDF's removePageAtIndex:(iter - 1)
      thePDF's insertPage:newPage atIndex:(iter - 1)
    else
      -- Saves an NSImage to the supplied file path
      set theTIFFData to imageToSave's TIFFRepresentation()
      set theBitmapImageRep to current application's NSBitmapImageRep's imageRepWithData:theTIFFData
      set theImageProperties to current application's NSDictionary's dictionaryWithObject:1 forKey:(current application's NSImageCompressionFactor)
      set theResultData to theBitmapImageRep's representationUsingType:(current application's NSPNGFileType) |properties|:(missing value)
      theResultData's writeToFile:destinationPath atomically:false
    end if
end saveImage`;var ne=async(r,e,t)=>m(`${Ue(r,e,t.CIFilterName)}
          set theCIImage to current application's CIImage's imageWithData:(theImage's TIFFRepresentation())
          theFilter's setValue:theCIImage forKey:"inputImage"
          ${t.presets?Object.entries(t.presets).map(([a,s])=>`theFilter's setValue:${s} forKey:"${a}"`).join(`
`):""}
          ${ze}
        end repeat

        -- Save PDFs
        if "${r}" ends with ".pdf" then
          thePDF's writeToFile:"${e}"
        end if
    end applyFilter
    ${Le}`),ie=()=>{let r=(0,ae.getPreferenceValues)(),e=[];if((r.hiddenFilters||"").trim().length>0){let t=r.hiddenFilters.split(",").map(a=>a.trim());return t.includes("Blur")||e.push(...Z),t.includes("Color Effect")||e.push(...q),t.includes("Halftone")||e.push(...Y),t.includes("Distortion")||e.push(...Q),t.includes("Sharpen")||e.push(...ee),t.includes("Style")||e.push(...te),t.includes("Tile")||e.push(...re),e.filter(a=>!t.includes(a.name))}return[...Z,...q,...Y,...Q,...ee,...te,...re]},Z=[{name:"Bokeh Blur",description:"Applies a Bokeh effect",CIFilterName:"CIBokehBlur",thumbnail:"thumbnails/bokeh_blur.webp",category:i.blur},{name:"Box Blur",description:"Blur effect using a box-shaped convolution kernel",CIFilterName:"CIBoxBlur",thumbnail:"thumbnails/box_blur.webp",category:i.blur},{name:"Disc Blur",description:"Blur effect that uses a disc-shaped convolution kernel",CIFilterName:"CIDiscBlur",thumbnail:"thumbnails/disc_blur.webp",category:i.blur},{name:"Gaussian Blur",description:"Blurs the image using a Gaussian filter",CIFilterName:"CIGaussianBlur",thumbnail:"thumbnails/gaussian_blur.webp",category:i.blur},{name:"Median",description:"Reduces noise by calculating median pixel values",CIFilterName:"CIMedianFilter",thumbnail:"thumbnails/median.webp",category:i.blur},{name:"Motion Blur",description:"Blur effect simulating a camera moving while capturing an image",CIFilterName:"CIMotionBlur",thumbnail:"thumbnails/motion_blur.webp",category:i.blur},{name:"Noise Reduction",description:"Reduces noise by sharpening areas of low luminance",CIFilterName:"CINoiseReduction",thumbnail:"thumbnails/noise_reduction.webp",category:i.blur},{name:"Zoom Blur",description:"Blur simulating a camera zooming in while capturing an image",CIFilterName:"CIZoomBlur",thumbnail:"thumbnails/zoom_blur.webp",category:i.blur}],q=[{name:"Chrome",description:"Increase brightness and saturation",CIFilterName:"CIPhotoEffectChrome",thumbnail:"thumbnails/chrome.webp",category:i.colorEffect},{name:"Dither",description:"Adds noise to reduce distortion",CIFilterName:"CIDither",thumbnail:"thumbnails/dither.webp",category:i.colorEffect},{name:"Document Enhancement",description:"Removes unwanted shadows, whitens background, and enhances contrast",CIFilterName:"CIDocumentEnhancer",thumbnail:"thumbnails/document_enhancement.webp",category:i.colorEffect},{name:"Fade",description:"Decreases saturation",CIFilterName:"CIPhotoEffectFade",thumbnail:"thumbnails/fade.webp",category:i.colorEffect},{name:"Instant",description:"Decreases saturation, reduces contrast",CIFilterName:"CIPhotoEffectInstant",thumbnail:"thumbnails/instant.webp",category:i.colorEffect},{name:"Invert",description:"Inverts colors",CIFilterName:"CIColorInvert",thumbnail:"thumbnails/invert.webp",category:i.colorEffect},{name:"Maximum Component",description:"Converts image to grayscale using the maximum of the three color components",CIFilterName:"CIMaximumComponent",thumbnail:"thumbnails/maximum_component.webp",category:i.colorEffect},{name:"Minimum Component",description:"Converts image to grayscale using the minimum of the three color components",CIFilterName:"CIMinimumComponent",thumbnail:"thumbnails/minimum_component.webp",category:i.colorEffect},{name:"Mono",description:"Desaturates images and reduces contrast",CIFilterName:"CIPhotoEffectMono",thumbnail:"thumbnails/mono.webp",category:i.colorEffect},{name:"Noir",description:"Desaturates images and increases contrast",CIFilterName:"CIPhotoEffectNoir",thumbnail:"thumbnails/noir.webp",category:i.colorEffect},{name:"Posterize",description:"Flattens colors",CIFilterName:"CIColorPosterize",thumbnail:"thumbnails/posterize.webp",category:i.colorEffect},{name:"Process",description:"Gives images a cooler toner",CIFilterName:"CIPhotoEffectProcess",thumbnail:"thumbnails/process.webp",category:i.colorEffect},{name:"Sepia",description:"Maps all colors to shades of brown",CIFilterName:"CISepiaTone",thumbnail:"thumbnails/sepia.webp",category:i.colorEffect},{name:"Thermal",description:"Thermal camera effect",CIFilterName:"CIThermal",thumbnail:"thumbnails/thermal.webp",category:i.colorEffect},{name:"Tonal",description:"Decreases saturation and contrast",CIFilterName:"CIPhotoEffectTonal",thumbnail:"thumbnails/tonal.webp",category:i.colorEffect},{name:"Transfer",description:"Makes images warmer",CIFilterName:"CIPhotoEffectTransfer",thumbnail:"thumbnails/transfer.webp",category:i.colorEffect},{name:"Vignette",description:"Adds shading to the corners of images",CIFilterName:"CIVignette",thumbnail:"thumbnails/vignette.webp",category:i.colorEffect,presets:{inputIntensity:1,inputRadius:"(imgSize's width / 2)"}},{name:"X-Ray",description:"X-Ray image effect",CIFilterName:"CIXRay",thumbnail:"thumbnails/x-ray.webp",category:i.colorEffect}],Y=[{name:"Circular Screen",description:"Simulates a circular-shaped halftone screen",CIFilterName:"CICircularScreen",thumbnail:"thumbnails/circular_screen.webp",category:i.halftone},{name:"Dot Screen",description:"Simulates the dot pattern of a halftone screen",CIFilterName:"CIDotScreen",thumbnail:"thumbnails/dot_screen.webp",category:i.halftone},{name:"CMYK Halftone",description:"Creates a halftoned rendition of an image using cyan, magenta, yellow, and black",CIFilterName:"CICMYKHalftone",thumbnail:"thumbnails/cmyk_halftone.webp",category:i.halftone},{name:"Hatched Screen",description:"Simulates the hatched pattern of a halftone screen",CIFilterName:"CIHatchedScreen",thumbnail:"thumbnails/hatched_screen.webp",category:i.halftone},{name:"Line Screen",description:"Simulates the line pattern of a halftone screen",CIFilterName:"CILineScreen",thumbnail:"thumbnails/line_screen.webp",category:i.halftone}],Q=[{name:"Bump",description:"Creates a bump that originates from a point",CIFilterName:"CIBumpDistortion",thumbnail:"thumbnails/bump.webp",category:i.distortion,presets:{inputCenter:`(current application's CIVector's vectorWithString:"[" & imgSize's width / 2 & " " & imgSize's height / 2 & "]")`,inputRadius:"(imgSize's width / 3)"}},{name:"Circle Splash",description:"Radially replicates colors around a center circle",CIFilterName:"CICircleSplashDistortion",thumbnail:"thumbnails/circle_splash.webp",category:i.distortion,presets:{inputCenter:`(current application's CIVector's vectorWithString:"[" & imgSize's width / 2 & " " & imgSize's height / 2 & "]")`,inputRadius:"(imgSize's width / 4)"}},{name:"Circular Wrap",description:"Wraps an image around a transparent circle",CIFilterName:"CICircularWrap",thumbnail:"thumbnails/circular_wrap.webp",category:i.distortion},{name:"Droste",description:"Creates a recursive, M.C. Escher-like effect",CIFilterName:"CIDroste",thumbnail:"thumbnails/droste.webp",category:i.distortion,presets:{inputInsetPoint0:`(current application's CIVector's vectorWithString:"[" & imgSize's width * 1 / 10 & " " & imgSize's height * 9 / 10 & "]")`,inputInsetPoint1:`(current application's CIVector's vectorWithString:"[" & imgSize's width * 9 / 10 & " " & imgSize's height * 1 / 10 & "]")`,inputPeriodicity:0}},{name:"Glass Lozenge",description:"Distorts a portion of the image around lozenge-shaped lens",CIFilterName:"CIGlassLozenge",thumbnail:"thumbnails/glass_lozenge.webp",category:i.distortion,presets:{inputPoint0:`(current application's CIVector's vectorWithString:"[" & imgSize's width / 1.5 & " " & imgSize's height / 2 & "]")`,inputPoint1:`(current application's CIVector's vectorWithString:"[" & imgSize's width / 3 & " " & imgSize's height / 2 & "]")`,inputRadius:"(imgSize's width / 4)"}},{name:"Hole",description:"Creates a hole in the image, pushing the surrounding pixels outward",CIFilterName:"CIHoleDistortion",thumbnail:"thumbnails/hole.webp",category:i.distortion,presets:{inputCenter:`(current application's CIVector's vectorWithString:"[" & imgSize's width / 2 & " " & imgSize's height / 2 & "]")`,inputRadius:"(imgSize's width / 4)"}},{name:"Light Tunnel",description:"Rotates the image around a center area to create tunneling effect",CIFilterName:"CILightTunnel",thumbnail:"thumbnails/light_tunnel.webp",category:i.distortion,presets:{inputCenter:`(current application's CIVector's vectorWithString:"[" & imgSize's width / 2 & " " & imgSize's height / 2 & "]")`,inputRotation:3*Math.PI,inputRadius:"(imgSize's width / 4)"}},{name:"Linear Bump",description:"Creates a bump that originates from a line",CIFilterName:"CIBumpDistortionLinear",thumbnail:"thumbnails/linear_bump.webp",category:i.distortion,presets:{inputCenter:`(current application's CIVector's vectorWithString:"[" & imgSize's width / 2 & " " & imgSize's height / 2 & "]")`,inputRadius:"(imgSize's width / 3)",inputAngle:Math.PI/2}},{name:"Pinch",description:"Distorts an image by pinching it at a point",CIFilterName:"CIPinchDistortion",thumbnail:"thumbnails/pinch.webp",category:i.distortion,presets:{inputCenter:`(current application's CIVector's vectorWithString:"[" & imgSize's width / 2 & " " & imgSize's height / 2 & "]")`,inputRadius:"(imgSize's width / 2)"}},{name:"Torus Lens",description:"Distorts a portion on an image around a torus-shaped lens",CIFilterName:"CITorusLensDistortion",thumbnail:"thumbnails/torus_lens.webp",category:i.distortion,presets:{inputCenter:`(current application's CIVector's vectorWithString:"[" & imgSize's width / 2 & " " & imgSize's height / 2 & "]")`,inputRadius:"(imgSize's width / 2)",inputWidth:"(imgSize's width / 10)"}},{name:"Twirl",description:"Rotates pixels around a point to create a twirl effect",CIFilterName:"CITwirlDistortion",thumbnail:"thumbnails/twirl.webp",category:i.distortion,presets:{inputCenter:`(current application's CIVector's vectorWithString:"[" & imgSize's width / 2 & " " & imgSize's height / 2 & "]")`,inputRadius:"(imgSize's width / 2)",inputAngle:"(imgSize's width / 100) * "+Math.PI}},{name:"Vortex",description:"Rotates pixels around a point to create a vortex effect",CIFilterName:"CIVortexDistortion",thumbnail:"thumbnails/vortex.webp",category:i.distortion,presets:{inputCenter:`(current application's CIVector's vectorWithString:"[" & imgSize's width / 2 & " " & imgSize's height / 2 & "]")`,inputRadius:"(imgSize's width / 2)",inputAngle:"(imgSize's width / 10) * "+Math.PI}}],ee=[{name:"Sharpen Luminance",description:"Increases detailed by sharpening based on luminance",CIFilterName:"CISharpenLuminance",thumbnail:"thumbnails/sharpen_luminance.webp",category:i.sharpen},{name:"Unsharp Mask",description:"Sharpens images by increasing contrast along edges",CIFilterName:"CIUnsharpMask",thumbnail:"thumbnails/unsharp_mask.webp",category:i.sharpen}],te=[{name:"Bloom",description:"Softens edges and adds a glow",CIFilterName:"CIBloom",thumbnail:"thumbnails/bloom.webp",category:i.stylize},{name:"Comic",description:"Makes images look like comic book drawings",CIFilterName:"CIComicEffect",thumbnail:"thumbnails/comic.webp",category:i.stylize},{name:"Crystallize",description:"Creates polygon-shaped color blocks by aggregating pixel values",CIFilterName:"CICrystallize",thumbnail:"thumbnails/crystallize.webp",category:i.stylize},{name:"Depth Of Field",description:"Simulates tilt-shift",CIFilterName:"CIDepthOfField",thumbnail:"thumbnails/depth_of_field.webp",category:i.stylize},{name:"Edges",description:"Detects edges and highlights them colorfully, blackening other areas",CIFilterName:"CIEdges",thumbnail:"thumbnails/edges.webp",category:i.stylize},{name:"Edge Work",description:"White woodblock cutout effect",CIFilterName:"CIEdgeWork",thumbnail:"thumbnails/edge_work.webp",category:i.stylize},{name:"Gabor Gradients",description:"Applies a 5x5 Gabor filter to an image",CIFilterName:"CIGaborGradients",thumbnail:"thumbnails/gabor_gradients.webp",category:i.stylize},{name:"Gloom",description:"Dulls highlights",CIFilterName:"CIGloom",thumbnail:"thumbnails/gloom.webp",category:i.stylize},{name:"Height Field From Mask",description:"Generates a 3D height field from a grayscale mask",CIFilterName:"CIHeightFieldFromMask",thumbnail:"thumbnails/height_field_from_mask.webp",category:i.stylize},{name:"Hexagonal Pixellate",description:"Pixellates images using hexagons",CIFilterName:"CIHexagonalPixellate",thumbnail:"thumbnails/hexagonal_pixellate.webp",category:i.stylize},{name:"Line Overlay",description:"Black woodblock cutout effect",CIFilterName:"CILineOverlay",thumbnail:"thumbnails/line_overlay.webp",category:i.stylize},{name:"Pixellate",description:"Pixellates images with large square pixels",CIFilterName:"CIPixellate",thumbnail:"thumbnails/pixellate.webp",category:i.stylize},{name:"Pointillize",description:"Pixellates images with dots",CIFilterName:"CIPointillize",thumbnail:"thumbnails/pointillize.webp",category:i.stylize},{name:"Spotlight",description:"Adds a directional spotlight effect",CIFilterName:"CISpotLight",thumbnail:"thumbnails/spotlight.webp",category:i.stylize,presets:{inputLightPointsAt:`(current application's CIVector's vectorWithString:"[" & imgSize's width / 2 & " " & imgSize's height / 2 & " 0]")`,inputLightPosition:`(current application's CIVector's vectorWithString:"[" & imgSize's width / 2 & " " & imgSize's height / 2 & " 1000]")`,inputBrightness:5,inputConcentration:.1}}],re=[{name:"Eightfold Reflected Tile",description:"Tiles an image by applyng an 8-way reflection",CIFilterName:"CIEightfoldReflectedTile",thumbnail:"thumbnails/eightfold_reflected_tile.webp",category:i.tile},{name:"Fourfold Reflected Tile",description:"Tiles an image by applying a 4-way reflection",CIFilterName:"CIFourfoldReflectedTile",thumbnail:"thumbnails/fourfold_reflected_tile.webp",category:i.tile},{name:"Fourfold Rotated Tile",description:"Tiles an image by rotating it at increments of 90 degrees",CIFilterName:"CIFourfoldRotatedTile",thumbnail:"thumbnails/fourfold_rotated_tile.webp",category:i.tile},{name:"Fourfold Translated Tile",description:"Tiles an image by applying a 4 translation operations",CIFilterName:"CIFourfoldTranslatedTile",thumbnail:"thumbnails/fourfold_translated_tile.webp",category:i.tile},{name:"Glide Reflected Tile",description:"Tiles an image by translating and smearing it",CIFilterName:"CIGlideReflectedTile",thumbnail:"thumbnails/glide_reflected_tile.webp",category:i.tile},{name:"Kaleidoscope",description:"Creates a kaleidoscopic image by applying 12-way symmetry",CIFilterName:"CIKaleidoscope",thumbnail:"thumbnails/kaleidoscope.webp",category:i.tile},{name:"Op Tile",description:"Segments and re-assembles images to mimic op art",CIFilterName:"CIOpTile",thumbnail:"thumbnails/op_tile.webp",category:i.tile},{name:"Parallelogram Tile",description:"Tiles an image after reflecting it in a parallelogram",CIFilterName:"CIParallelogramTile",thumbnail:"thumbnails/parallelogram_tile.webp",category:i.tile},{name:"Perspective Tile",description:"Applies a perspective transformation to an image and tiles the result",CIFilterName:"CIPerspectiveTile",thumbnail:"thumbnails/perspective_tile.webp",category:i.tile},{name:"Sixfold Reflected Tile",description:"Tiles an image by applying a 6-way reflection",CIFilterName:"CISixfoldReflectedTile",thumbnail:"thumbnails/sixfold_reflected_tile.webp",category:i.tile},{name:"Sixfold Rotated Tile",description:"Tiles an image by rotating it at increments of 60 degrees",CIFilterName:"CISixfoldRotatedTile",thumbnail:"thumbnails/sixfold_rotated_tile.webp",category:i.tile},{name:"Triangle Kaleidoscope",description:"Maps a triangular portion of an image to a kaleidoscopically tiled pattern",CIFilterName:"CITriangleKaleidoscope",thumbnail:"thumbnails/triangle_kaleidoscope.webp",category:i.tile},{name:"Triangle Tile",description:"Tiles a triangular portion of an image",CIFilterName:"CITriangleTile",thumbnail:"thumbnails/triangle_tile.webp",category:i.tile},{name:"Twelvefold Reflected Tile",description:"Tiles an image by applying a 12-way reflection",CIFilterName:"CITwelvefoldReflectedTile",thumbnail:"thumbnails/twelvefold_reflected_tile.webp",category:i.tile}];var x=w(require("fs")),b=w(require("os")),p=w(require("path")),u=require("@raycast/api");var E=require("@raycast/api");var se=async()=>m(`use framework "AppKit"
      use framework "PDFKit"
      
      set pb to current application's NSPasteboard's generalPasteboard()
      set theItems to pb's readObjectsForClasses:({current application's NSURL, current application's NSImage, current application's NSAttributedString}) options:{}
      
      set theImages to {}
      repeat with i from 0 to ((theItems's |count|()) - 1)
        set theItem to (theItems's objectAtIndex:i)
        if (theItem's |class|()) is current application's NSImage then
          copy theItem to end of theImages
        else if (theItem's |class|()) is current application's NSURL then
          if (theItem's absoluteString() as text) ends with ".pdf" then
            set theImage to (current application's PDFDocument's alloc()'s initWithURL:theItem)
          else
            set theImage to (current application's NSImage's alloc()'s initWithContentsOfURL:theItem)
          end if
          if theImage is not missing value then
            copy theImage to end of theImages
          end if
        else if (theItem's |class|()) is current application's NSConcreteAttributedString then
          repeat with i from 0 to ((theItem's |length|()) - 1)
            set attrs to (theItem's attributesAtIndex:i longestEffectiveRange:(missing value) inRange:{i, (theItem's |length|()) - i})
            set theAttachment to (attrs's objectForKey:"NSAttachment")
            if theAttachment is not missing value then
              set cell to theAttachment's attachmentCell()
              set theImage to cell's image()
              copy theImage to end of theImages
            end if
          end repeat
        end if
      end repeat
      
      set tempDir to current application's NSTemporaryDirectory() as text
      set filePaths to {}
      repeat with i from 1 to count theImages
        set theImage to item i of theImages
        set theFile to tempDir & "clipboardImage_" & i
        if theImage's |class|() is current application's PDFDocument then
          set theFile to theFile & ".pdf"
          (theImage's writeToFile:theFile)
        else
          set theFile to theFile & ".png"
          set theTIFFData to theImage's TIFFRepresentation()
          set theBitmap to (current application's NSBitmapImageRep's alloc()'s initWithData:theTIFFData)
          set thePNGData to (theBitmap's representationUsingType:(current application's NSBitmapImageFileTypePNG) |properties|:(current application's NSDictionary's alloc()'s init()))
          (thePNGData's writeToFile:theFile atomically:false)
        end if
        copy theFile to end of filePaths
      end repeat
      
      return filePaths`),oe=async r=>{let e=Array.isArray(r)?r:[r];await m(`use framework "Foundation"
      use framework "PDFKit"
      use scripting additions
  
      set thePasteboard to current application's NSPasteboard's generalPasteboard()
      thePasteboard's clearContents()
      
      -- Handle PDFs separately
      set pdfPaths to {"${e.filter(t=>t.endsWith(".pdf")).join('", "')}"}
  
      set pdfItems to current application's NSMutableArray's alloc()'s init()
      repeat with pdfPath in pdfPaths
        if length of pdfPath is not 0 then
          set pdfItem to current application's NSPasteboardItem's alloc()'s init()
          set pdfData to current application's NSData's dataWithContentsOfFile:pdfPath
          pdfItem's setData:pdfData forType:(current application's NSPasteboardTypePDF)
          pdfItems's addObject:pdfItem
        end if
      end repeat
  
      if pdfItems's |count|() > 0 then
        thePasteboard's writeObjects:pdfItems
      end if
        
      -- Handle all other image types
      set theFiles to {"${e.join('", "')}"}
    
      set theImages to {}
      repeat with theFile in theFiles
        if length of theFile is not 0 then
          set theImage to (current application's NSImage's alloc()'s initWithContentsOfFile:theFile)
          if theImage is not missing value then
            copy theImage to end of theImages
          end if
        end if
      end repeat
      
      if (count theImages) > 0 then
        thePasteboard's writeObjects:theImages
      end if`)};var k=w(require("path"));var D=require("child_process");function S(r,e){let t=e?.command,a=e?.language,s=[...e?.leadingArgs?.map(l=>l.toString())||[]],o=e?.trailingArgs||[];!t&&(a===void 0||a==="AppleScript"||a==="JXA")&&(t="/usr/bin/osascript",s.push("-l",a==="JXA"?"JavaScript":"AppleScript",...r.startsWith("/")?[]:["-e"],r,...o.map(l=>l.toString())));let n=process.env;if(e?.command&&(n.PATH=`${n.PATH}:${(0,D.execSync)(`$(/bin/bash -lc 'echo $SHELL') -lc 'echo "$PATH"'`).toString()}`,t=e.command,s.push(r,...o.map(l=>l.toString()))),!t)throw new Error("No command specified.");let c="",h=l=>{console.log(l)},d=(0,D.spawn)(t,s,{env:n});return e?.logDebugMessages&&console.log(`Running shell command "${t} ${s.join(" ")}"`),d.stdout?.on("data",l=>{c+=l.toString(),e?.logIntermediateOutput&&console.log(`Data from script: ${c}`)}),d.stderr?.on("data",l=>{e?.stderrCallback&&e.stderrCallback(l.toString()),e?.logErrors&&console.error(l.toString())}),d.stdin.on("error",l=>{e?.logErrors&&console.error(`Error writing to stdin: ${l}`)}),h=async l=>{l?.length>0&&(d.stdin.cork(),d.stdin.write(`${l}\r
`),process.nextTick(()=>d.stdin.uncork()),e?.logSentMessages&&console.log(`Sent message: ${l}`))},{data:(async()=>new Promise((l,C)=>{let R=e?.timeout?setTimeout(()=>{try{d.kill()}catch(F){e?.logErrors&&console.error(`Error killing process: ${F}`)}return e?.logErrors&&console.error("Script timed out"),d.stdin.end(),d.kill(),C("Script timed out")},e?.timeout):void 0;d.on("close",F=>{if(F!==0)return e?.logErrors&&console.error(`Script exited with code ${F}`),d.stdin.end(),d.kill(),C(`Script exited with code ${F}`);clearTimeout(R);let v;try{v=JSON.parse(c)}catch{v=c.trim()}return e?.logFinalOutput&&console.log(`Script output: ${v}`),l(v)})}))(),sendMessage:h}}var I=require("@raycast/api");async function ce(){let r=k.default.join(I.environment.assetsPath,"scripts","finder.scpt"),e=await S(r,{language:"AppleScript",stderrCallback:t=>g("Finder Selection Error",new Error(t))}).data;return Array.isArray(e)?e:e.split(",").map(t=>t.trim())}async function le(){let r=k.default.join(I.environment.assetsPath,"scripts","houdahSpot.scpt"),e=await S(r,{language:"AppleScript",stderrCallback:t=>g("HoudahSpot Selection Error",new Error(t))}).data;return Array.isArray(e)?e:e.split(",").map(t=>t.trim())}async function ue(){let r=k.default.join(I.environment.assetsPath,"scripts","neofinder.scpt"),e=await S(r,{language:"AppleScript",stderrCallback:t=>g("NeoFinder Selection Error",new Error(t))}).data;return Array.isArray(e)?e:e.split(",").map(t=>t.trim())}async function de(){let r=k.default.join(I.environment.assetsPath,"scripts","pathfinder.scpt"),e=await S(r,{language:"JXA",stderrCallback:t=>g("Path Finder Selection Error",new Error(t))}).data;return Array.isArray(e)?e:e.split(",").map(t=>t.trim())}async function pe(){let r=k.default.join(I.environment.assetsPath,"scripts","qspace.scpt"),e=await S(r,{language:"JXA",stderrCallback:t=>g("QSpace Pro Selection Error",new Error(t))}).data;return Array.isArray(e)?e:e.split(",").map(t=>t.trim())}async function fe(){let r=k.default.join(I.environment.assetsPath,"scripts","forklift-beta.scpt"),e=await S(r,{language:"JXA",stderrCallback:t=>g("ForkLift Selection Error",new Error(t))}).data;return Array.isArray(e)?e:e.split(",").map(t=>t.trim())}var me=async()=>{let e=(await u.LocalStorage.getItem("itemsToRemove")??"").toString().split(", ");for(let t of e)x.existsSync(t)&&await x.promises.rm(t,{recursive:!0});await u.LocalStorage.removeItem("itemsToRemove")},ge=async()=>{let r=[],t=(0,u.getPreferenceValues)().inputMethod,a=!1;if(t=="Clipboard")try{let n=(await se()).split(", ");if(await u.LocalStorage.setItem("itemsToRemove",n.join(", ")),n.filter(c=>c.trim().length>0).length>0)return n}catch(n){console.error(`Couldn't get images from clipboard: ${n}`),a=!0}let s=t;try{s=(await(0,u.getFrontmostApplication)()).name}catch(n){console.error(`Couldn't get frontmost application: ${n}`)}try{(t=="Path Finder"||s=="Path Finder")&&(r=await de())}catch(n){console.error(`Couldn't get images from Path Finder: ${n}`),a=!0}try{(t=="NeoFinder"||s=="NeoFinder")&&(r=await ue())}catch(n){console.error(`Couldn't get images from NeoFinder: ${n}`),a=!0}try{(t=="HoudahSpot"||s=="HoudahSpot")&&(r=await le())}catch(n){console.error(`Couldn't get images from HoudahSpot: ${n}`),a=!0}try{(t=="QSpace Pro"||s=="QSpace Pro")&&(r=await pe())}catch(n){console.error(`Couldn't get images from QSpace Pro: ${n}`),a=!0}try{(t=="ForkLift"||s=="ForkLift")&&(r=await fe())}catch(n){console.error(`Couldn't get images from ForkLift: ${n}`),a=!0}if(r.length>0)return r.filter((n,c)=>r.indexOf(n)===c);let o=await ce();return s=="Finder"||t=="Finder"||a?r=o:o.forEach(n=>{n.split("/").at(-2)=="Desktop"&&!r.includes(n)&&r.push(n)}),r.filter((n,c)=>r.indexOf(n)===c)},be=async r=>{let e="Finder";try{e=(await(0,u.getFrontmostApplication)()).name}catch(a){console.error(`Couldn't get frontmost application: : ${a}`)}let t=(0,u.getPreferenceValues)();t.imageResultHandling=="copyToClipboard"?(await oe(r),he(r)):t.imageResultHandling=="openInPreview"?(await We(r),he(r)):t.inputMethod=="NeoFinder"||e=="NeoFinder"?await(0,u.showInFinder)(r[0]):(t.inputMethod=="HoudahSpot"||e=="HoudahSpot")&&await(0,u.showInFinder)(r[0])};var We=async r=>{let e=Array.isArray(r)?r:[r],t=e.some(a=>p.default.extname(a)==".svg");await m(`use framework "Foundation"
    use scripting additions
    set pageImages to {${e.map(a=>`current application's NSURL's fileURLWithPath:"${a}"`).join(", ")}}

    set workspace to current application's NSWorkspace's sharedWorkspace()
    set config to current application's NSWorkspaceOpenConfiguration's configuration()

    ${t?`tell application "Finder"
            set safariPath to POSIX path of ((application file id "com.apple.Safari") as text)
            set safariURL to current application's NSURL's fileURLWithPath:safariPath
          end tell

          workspace's openURLs:pageImages withApplicationAtURL:safariURL configuration:config completionHandler:(missing value)
          
          tell application "Safari"
            set finished to false
            set iter to 0
            repeat while ((count of windows) = 0 or finished is not true) and iter < 10
              delay 0.5
              set iter to iter + 1

              set currentStatus to true
              repeat with doc in (path of documents as list)
                repeat with thePath in {"${e.map(a=>encodeURI(`file://${a}`)).join('", "')}"}
                  if thePath is not in doc then
                    set currentStatus to false
                  end if
                end repeat
              end repeat
              set finished to currentStatus
            end repeat
          end tell
          `:`tell application "Finder"
            set previewPath to POSIX path of ((application file id "com.apple.Preview") as text)
            set previewURL to current application's NSURL's fileURLWithPath:previewPath
          end tell

          workspace's openURLs:pageImages withApplicationAtURL:previewURL configuration:config completionHandler:(missing value)
          
          tell application "Preview"
            set finished to false
            set iter to 0
            repeat while ((count of windows) = 0 or finished is not true) and iter < 10
              delay 0.5
              set iter to iter + 1

              set currentStatus to true
              repeat with doc in (path of documents as list)
                repeat with thePath in {"${e.join('", "')}"}
                  if thePath is not in doc then
                    set currentStatus to false
                  end if
                end repeat
              end repeat
              set finished to currentStatus
            end repeat
          end tell`}`)},he=r=>{let e=Array.isArray(r)?r:[r];for(let t of e)x.unlinkSync(t)},Me=async()=>m(`use framework "Foundation"
    use scripting additions
    set workspace to current application's NSWorkspace's sharedWorkspace()
    set runningApps to workspace's runningApplications()
    
    set targetApp to missing value
    repeat with theApp in runningApps
      if theApp's ownsMenuBar() then
        set targetApp to theApp
        exit repeat
      end if
    end repeat
    
    if targetApp is missing value then
      return "Finder"
    else
      return targetApp's localizedName() as text
    end if`),Be=async r=>{let e="Finder";try{e=await Me()}catch(t){console.error(`Couldn't get frontmost application: ${t}`)}try{if(e=="Path Finder")return m(`tell application "Path Finder"
        if 1 \u2264 (count finder windows) then
          try
          get POSIX path of (target of finder window 1)
          on error message number -1728
            -- Folder is nonstandard, use container of selection
            tell application "System Events"
              set itemPath to POSIX file "${r}" as alias
              return POSIX path of container of itemPath
            end tell
          end try
        else
          get POSIX path of desktop
        end if
      end tell`)}catch(t){console.error(`Couldn't get current directory of Path Finder: ${t}`)}return m(`tell application "Finder"
    if 1 \u2264 (count Finder windows) then
      try
        return POSIX path of (target of window 1 as alias)
      on error message number -1700
        -- Folder is nonstandard, use container of selection
        set itemPath to POSIX file "${r}" as alias
        return POSIX path of (container of itemPath as alias)
      end try
    else
      return POSIX path of (desktop as alias)
    end if
  end tell`)},ye=async(r,e=!1,t=void 0)=>{let a=(0,u.getPreferenceValues)(),s=await Be(r[0]);return r.map(o=>{let n=o;if(a.imageResultHandling=="saveToDownloads"?n=p.default.join(b.homedir(),"Downloads",p.default.basename(n)):a.imageResultHandling=="saveToDesktop"?n=p.default.join(b.homedir(),"Desktop",p.default.basename(n)):(a.imageResultHandling=="saveInContainingFolder"||a.imageResultHandling=="replaceOriginal")&&(a.inputMethod=="Clipboard"||e)?n=p.default.join(s,p.default.basename(n)):(a.imageResultHandling=="copyToClipboard"||a.imageResultHandling=="openInPreview")&&(n=p.default.join(b.tmpdir(),p.default.basename(n))),n=t?n.replace(p.default.extname(n),`.${t}`):n,a.imageResultHandling!="replaceOriginal"&&b.tmpdir()!=p.default.dirname(n)){let c=2;for(;x.existsSync(n);)n=p.default.join(p.default.dirname(n),p.default.basename(n,p.default.extname(n))+`-${c}${p.default.extname(n)}`),c++}return n})},g=async(r,e,t,a)=>{console.error(e),t?(t.title=r,t.message=a??e.message,t.style=u.Toast.Style.Failure,t.primaryAction={title:"Copy Error",onAction:async()=>{await u.Clipboard.copy(e.message)}}):t=await(0,u.showToast)({title:r,message:a??e.message,style:u.Toast.Style.Failure,primaryAction:{title:"Copy Error",onAction:async()=>{await u.Clipboard.copy(e.message)}}})};var Fe=r=>{let e=b.homedir();if(r.startsWith("~"))return r.replace(/^~(?=$|\/|\\)/,e);let t=/(\/Users\/.*?)\/.*/,a=r.match(t);return a?r.replace(a[1],e):r};async function M(r,e){let t=[],a=r.map(s=>Fe(s));for(let s of a){let o=(await ye([s],!1,s.endsWith(".pdf")?"pdf":"png"))[0];await ne(s,o,e),t.push(o)}return await be(t),t}async function Ve({filters:r,imagePaths:e}){let t=e?.length?e:await ge(),a=r.map(o=>ie().find(n=>n.name===o)),s=new Array;for(let o of a){if(!o)throw new Error(`Filter "${o}" not found.`);t=s?.length?s:t,s=await M(t,o)}return await me(),s}
