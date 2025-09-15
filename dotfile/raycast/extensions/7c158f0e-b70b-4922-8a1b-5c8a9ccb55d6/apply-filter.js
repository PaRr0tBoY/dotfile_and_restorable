"use strict";var De=Object.create;var R=Object.defineProperty;var Re=Object.getOwnPropertyDescriptor;var Ne=Object.getOwnPropertyNames;var _e=Object.getPrototypeOf,Oe=Object.prototype.hasOwnProperty;var Ue=(r,e)=>{for(var t in e)R(r,t,{get:e[t],enumerable:!0})},Z=(r,e,t,a)=>{if(e&&typeof e=="object"||typeof e=="function")for(let s of Ne(e))!Oe.call(r,s)&&s!==t&&R(r,s,{get:()=>e[s],enumerable:!(a=Re(e,s))||a.enumerable});return r};var $=(r,e,t)=>(t=r!=null?De(_e(r)):{},Z(e||!r||!r.__esModule?R(t,"default",{value:r,enumerable:!0}):t,r)),ze=r=>Z(R({},"__esModule",{value:!0}),r);var Qe={};Ue(Qe,{default:()=>Ae});module.exports=ze(Qe);var Pe=require("fs"),D=require("react"),g=require("@raycast/api");var S=$(require("react")),h=require("@raycast/api");var ee=$(require("node:child_process")),te=require("node:buffer"),E=$(require("node:stream")),re=require("node:util");var ae=require("react/jsx-runtime");var L=globalThis;var N=r=>!!r&&typeof r=="object"&&typeof r.removeListener=="function"&&typeof r.emit=="function"&&typeof r.reallyExit=="function"&&typeof r.listeners=="function"&&typeof r.kill=="function"&&typeof r.pid=="number"&&typeof r.on=="function",W=Symbol.for("signal-exit emitter"),B=class{constructor(){if(this.emitted={afterExit:!1,exit:!1},this.listeners={afterExit:[],exit:[]},this.count=0,this.id=Math.random(),L[W])return L[W];Object.defineProperty(L,W,{value:this,writable:!1,enumerable:!1,configurable:!1})}on(e,t){this.listeners[e].push(t)}removeListener(e,t){let a=this.listeners[e],s=a.indexOf(t);s!==-1&&(s===0&&a.length===1?a.length=0:a.splice(s,1))}emit(e,t,a){if(this.emitted[e])return!1;this.emitted[e]=!0;let s=!1;for(let o of this.listeners[e])s=o(t,a)===!0||s;return e==="exit"&&(s=this.emit("afterExit",t,a)||s),s}},V=class{onExit(){return()=>{}}load(){}unload(){}},j=class{#o;#t;#e;#i;#s;#n;#a;#r;constructor(e){this.#o=process.platform==="win32"?"SIGINT":"SIGHUP",this.#t=new B,this.#n={},this.#a=!1,this.#r=[],this.#r.push("SIGHUP","SIGINT","SIGTERM"),globalThis.process.platform!=="win32"&&this.#r.push("SIGALRM","SIGABRT","SIGVTALRM","SIGXCPU","SIGXFSZ","SIGUSR2","SIGTRAP","SIGSYS","SIGQUIT","SIGIOT"),globalThis.process.platform==="linux"&&this.#r.push("SIGIO","SIGPOLL","SIGPWR","SIGSTKFLT"),this.#e=e,this.#n={};for(let t of this.#r)this.#n[t]=()=>{let a=this.#e.listeners(t),{count:s}=this.#t,o=e;if(typeof o.__signal_exit_emitter__=="object"&&typeof o.__signal_exit_emitter__.count=="number"&&(s+=o.__signal_exit_emitter__.count),a.length===s){this.unload();let n=this.#t.emit("exit",null,t),c=t==="SIGHUP"?this.#o:t;n||e.kill(e.pid,c)}};this.#s=e.reallyExit,this.#i=e.emit}onExit(e,t){if(!N(this.#e))return()=>{};this.#a===!1&&this.load();let a=t?.alwaysLast?"afterExit":"exit";return this.#t.on(a,e),()=>{this.#t.removeListener(a,e),this.#t.listeners.exit.length===0&&this.#t.listeners.afterExit.length===0&&this.unload()}}load(){if(!this.#a){this.#a=!0,this.#t.count+=1;for(let e of this.#r)try{let t=this.#n[e];t&&this.#e.on(e,t)}catch{}this.#e.emit=(e,...t)=>this.#l(e,...t),this.#e.reallyExit=e=>this.#c(e)}}unload(){this.#a&&(this.#a=!1,this.#r.forEach(e=>{let t=this.#n[e];if(!t)throw new Error("Listener not defined for signal: "+e);try{this.#e.removeListener(e,t)}catch{}}),this.#e.emit=this.#i,this.#e.reallyExit=this.#s,this.#t.count-=1)}#c(e){return N(this.#e)?(this.#e.exitCode=e||0,this.#t.emit("exit",this.#e.exitCode,null),this.#s.call(this.#e,this.#e.exitCode)):0}#l(e,...t){let a=this.#i;if(e==="exit"&&N(this.#e)){typeof t[0]=="number"&&(this.#e.exitCode=t[0]);let s=a.call(this.#e,e,...t);return this.#t.emit("exit",this.#e.exitCode,null),s}else return a.call(this.#e,e,...t)}},M=null,Le=(r,e)=>(M||(M=N(process)?new j(process):new V),M.onExit(r,e));function We(r,{timeout:e}={}){let t=new Promise((c,d)=>{r.on("exit",(u,F)=>{c({exitCode:u,signal:F,timedOut:!1})}),r.on("error",u=>{d(u)}),r.stdin&&r.stdin.on("error",u=>{d(u)})}),a=Le(()=>{r.kill()});if(e===0||e===void 0)return t.finally(()=>a());let s,o=new Promise((c,d)=>{s=setTimeout(()=>{r.kill("SIGTERM"),d(Object.assign(new Error("Timed out"),{timedOut:!0,signal:"SIGTERM"}))},e)}),n=t.finally(()=>{clearTimeout(s)});return Promise.race([o,n]).finally(()=>a())}var H=class extends Error{constructor(){super("The output is too big"),this.name="MaxBufferError"}};function Me(r){let{encoding:e}=r,t=e==="buffer",a=new E.default.PassThrough({objectMode:!1});e&&e!=="buffer"&&a.setEncoding(e);let s=0,o=[];return a.on("data",n=>{o.push(n),s+=n.length}),a.getBufferedValue=()=>t?Buffer.concat(o,s):o.join(""),a.getBufferedLength=()=>s,a}async function q(r,e){let t=Me(e);return await new Promise((a,s)=>{let o=n=>{n&&t.getBufferedLength()<=te.constants.MAX_LENGTH&&(n.bufferedData=t.getBufferedValue()),s(n)};(async()=>{try{await(0,re.promisify)(E.default.pipeline)(r,t),a()}catch(n){o(n)}})(),t.on("data",()=>{t.getBufferedLength()>8e7&&o(new H)})}),t.getBufferedValue()}async function Q(r,e){r.destroy();try{return await e}catch(t){return t.bufferedData}}async function Be({stdout:r,stderr:e},{encoding:t},a){let s=q(r,{encoding:t}),o=q(e,{encoding:t});try{return await Promise.all([a,s,o])}catch(n){return Promise.all([{error:n,exitCode:null,signal:n.signal,timedOut:n.timedOut||!1},Q(r,s),Q(e,o)])}}function Ve(r){let e=typeof r=="string"?`
`:10,t=typeof r=="string"?"\r":13;return r[r.length-1]===e&&(r=r.slice(0,-1)),r[r.length-1]===t&&(r=r.slice(0,-1)),r}function Y(r,e){return r.stripFinalNewline?Ve(e):e}function je({timedOut:r,timeout:e,signal:t,exitCode:a}){return r?`timed out after ${e} milliseconds`:t!=null?`was killed with ${t}`:a!=null?`failed with exit code ${a}`:"failed"}function He({stdout:r,stderr:e,error:t,signal:a,exitCode:s,command:o,timedOut:n,options:c,parentError:d}){let F=`Command ${je({timedOut:n,timeout:c?.timeout,signal:a,exitCode:s})}: ${o}`,l=t?`${F}
${t.message}`:F,P=[l,e,r].filter(Boolean).join(`
`);return t?t.originalMessage=t.message:t=d,t.message=P,t.shortMessage=l,t.command=o,t.exitCode=s,t.signal=a,t.stdout=r,t.stderr=e,"bufferedData"in t&&delete t.bufferedData,t}function Ge({stdout:r,stderr:e,error:t,exitCode:a,signal:s,timedOut:o,command:n,options:c,parentError:d}){if(t||a!==0||s!==null)throw He({error:t,exitCode:a,signal:s,stdout:r,stderr:e,command:n,timedOut:o,options:c,parentError:d});return r}async function m(r,e,t){if(process.platform!=="darwin")throw new Error("AppleScript is only supported on macOS");let{humanReadableOutput:a,language:s,timeout:o,...n}=Array.isArray(e)?t||{}:e||{},c=a!==!1?[]:["-ss"];s==="JavaScript"&&c.push("-l","JavaScript"),Array.isArray(e)&&c.push("-",...e);let d=ee.default.spawn("osascript",c,{...n,env:{PATH:"/usr/local/bin:/usr/bin:/bin:/usr/sbin:/sbin"}}),u=We(d,{timeout:o??1e4});d.stdin.end(r);let[{error:F,exitCode:l,signal:P,timedOut:z},w,A]=await Be(d,{encoding:"utf8"},u),Ee=Y({stripFinalNewline:!0},w),Te=Y({stripFinalNewline:!0},A);return Ge({stdout:Ee,stderr:Te,error:F,exitCode:l,signal:P,timedOut:z,command:"osascript",options:t,parentError:new Error})}var i={blur:"Blur",colorAdjustment:"Color Adjustment",colorEffect:"Color Effect",compositeOperation:"Composite Operation",distortion:"Distortion",generator:"Generator",gradient:"Gradient",halftone:"Halftone",sharpen:"Sharpen",stylize:"Stylize",tile:"Tile",stillImage:"Still Image",interlaced:"Interlaced",highDynamicRange:"High Dynamic Range"};var pe=require("@raycast/api"),de=(r,e,t)=>`use framework "Foundation"
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
          theFilter's setDefaults()`,fe=`-- Get result & crop to original image size
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
    saveImage(theResult, sourcePath, destinationPath, i)`,Ke=`on saveImage(imageToSave, sourcePath, destinationPath, iter)
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
end saveImage`,he=async(r,e)=>m(`${de(e,"",r.CIFilterName)}
    set newWidth to 300

    try
      set scaleFactor to newWidth / (imgSize's width)
    on error
      set scaleFactor to 1
    end try

    set imgSize to current application's NSMakeSize(newWidth, (imgSize's height) * scaleFactor)

    set theCIImage to current application's CIImage's imageWithData:(theImage's TIFFRepresentation())
    set transform to current application's CGAffineTransformMakeScale(scaleFactor, scaleFactor)
    set smallImage to theCIImage's imageByApplyingTransform:transform highQualityDownsample:false

    theFilter's setValue:smallImage forKey:"inputImage"
    ${r.presets?Object.entries(r.presets).map(([t,a])=>`theFilter's setValue:${a} forKey:"${t}"`).join(`
`):""}
    ${fe}
  end repeat
  end applyFilter
  
  on saveImage(imageToSave, sourcePath, destinationPath, iter)
       global res
        -- Saves an NSImage to the supplied file path
        set theTIFFData to imageToSave's TIFFRepresentation()
        set theBitmapImageRep to current application's NSBitmapImageRep's imageRepWithData:theTIFFData
        set theImageProperties to current application's NSDictionary's dictionaryWithObject:1 forKey:(current application's NSImageCompressionFactor)
        set theResultData to theBitmapImageRep's representationUsingType:(current application's NSPNGFileType) |properties|:(missing value)
        set base64String to (theResultData's base64EncodedStringWithOptions:0) as text
        set res to "data:image/png;base64," & base64String
  end saveImage
  
  return res`),me=async(r,e,t)=>m(`${de(r,e,t.CIFilterName)}
          set theCIImage to current application's CIImage's imageWithData:(theImage's TIFFRepresentation())
          theFilter's setValue:theCIImage forKey:"inputImage"
          ${t.presets?Object.entries(t.presets).map(([a,s])=>`theFilter's setValue:${s} forKey:"${a}"`).join(`
`):""}
          ${fe}
        end repeat

        -- Save PDFs
        if "${r}" ends with ".pdf" then
          thePDF's writeToFile:"${e}"
        end if
    end applyFilter
    ${Ke}`),G=()=>{let r=(0,pe.getPreferenceValues)(),e=[];if((r.hiddenFilters||"").trim().length>0){let t=r.hiddenFilters.split(",").map(a=>a.trim());return t.includes("Blur")||e.push(...ne),t.includes("Color Effect")||e.push(...ie),t.includes("Halftone")||e.push(...se),t.includes("Distortion")||e.push(...oe),t.includes("Sharpen")||e.push(...ce),t.includes("Style")||e.push(...le),t.includes("Tile")||e.push(...ue),e.filter(a=>!t.includes(a.name))}return[...ne,...ie,...se,...oe,...ce,...le,...ue]},ne=[{name:"Bokeh Blur",description:"Applies a Bokeh effect",CIFilterName:"CIBokehBlur",thumbnail:"thumbnails/bokeh_blur.webp",category:i.blur},{name:"Box Blur",description:"Blur effect using a box-shaped convolution kernel",CIFilterName:"CIBoxBlur",thumbnail:"thumbnails/box_blur.webp",category:i.blur},{name:"Disc Blur",description:"Blur effect that uses a disc-shaped convolution kernel",CIFilterName:"CIDiscBlur",thumbnail:"thumbnails/disc_blur.webp",category:i.blur},{name:"Gaussian Blur",description:"Blurs the image using a Gaussian filter",CIFilterName:"CIGaussianBlur",thumbnail:"thumbnails/gaussian_blur.webp",category:i.blur},{name:"Median",description:"Reduces noise by calculating median pixel values",CIFilterName:"CIMedianFilter",thumbnail:"thumbnails/median.webp",category:i.blur},{name:"Motion Blur",description:"Blur effect simulating a camera moving while capturing an image",CIFilterName:"CIMotionBlur",thumbnail:"thumbnails/motion_blur.webp",category:i.blur},{name:"Noise Reduction",description:"Reduces noise by sharpening areas of low luminance",CIFilterName:"CINoiseReduction",thumbnail:"thumbnails/noise_reduction.webp",category:i.blur},{name:"Zoom Blur",description:"Blur simulating a camera zooming in while capturing an image",CIFilterName:"CIZoomBlur",thumbnail:"thumbnails/zoom_blur.webp",category:i.blur}],ie=[{name:"Chrome",description:"Increase brightness and saturation",CIFilterName:"CIPhotoEffectChrome",thumbnail:"thumbnails/chrome.webp",category:i.colorEffect},{name:"Dither",description:"Adds noise to reduce distortion",CIFilterName:"CIDither",thumbnail:"thumbnails/dither.webp",category:i.colorEffect},{name:"Document Enhancement",description:"Removes unwanted shadows, whitens background, and enhances contrast",CIFilterName:"CIDocumentEnhancer",thumbnail:"thumbnails/document_enhancement.webp",category:i.colorEffect},{name:"Fade",description:"Decreases saturation",CIFilterName:"CIPhotoEffectFade",thumbnail:"thumbnails/fade.webp",category:i.colorEffect},{name:"Instant",description:"Decreases saturation, reduces contrast",CIFilterName:"CIPhotoEffectInstant",thumbnail:"thumbnails/instant.webp",category:i.colorEffect},{name:"Invert",description:"Inverts colors",CIFilterName:"CIColorInvert",thumbnail:"thumbnails/invert.webp",category:i.colorEffect},{name:"Maximum Component",description:"Converts image to grayscale using the maximum of the three color components",CIFilterName:"CIMaximumComponent",thumbnail:"thumbnails/maximum_component.webp",category:i.colorEffect},{name:"Minimum Component",description:"Converts image to grayscale using the minimum of the three color components",CIFilterName:"CIMinimumComponent",thumbnail:"thumbnails/minimum_component.webp",category:i.colorEffect},{name:"Mono",description:"Desaturates images and reduces contrast",CIFilterName:"CIPhotoEffectMono",thumbnail:"thumbnails/mono.webp",category:i.colorEffect},{name:"Noir",description:"Desaturates images and increases contrast",CIFilterName:"CIPhotoEffectNoir",thumbnail:"thumbnails/noir.webp",category:i.colorEffect},{name:"Posterize",description:"Flattens colors",CIFilterName:"CIColorPosterize",thumbnail:"thumbnails/posterize.webp",category:i.colorEffect},{name:"Process",description:"Gives images a cooler toner",CIFilterName:"CIPhotoEffectProcess",thumbnail:"thumbnails/process.webp",category:i.colorEffect},{name:"Sepia",description:"Maps all colors to shades of brown",CIFilterName:"CISepiaTone",thumbnail:"thumbnails/sepia.webp",category:i.colorEffect},{name:"Thermal",description:"Thermal camera effect",CIFilterName:"CIThermal",thumbnail:"thumbnails/thermal.webp",category:i.colorEffect},{name:"Tonal",description:"Decreases saturation and contrast",CIFilterName:"CIPhotoEffectTonal",thumbnail:"thumbnails/tonal.webp",category:i.colorEffect},{name:"Transfer",description:"Makes images warmer",CIFilterName:"CIPhotoEffectTransfer",thumbnail:"thumbnails/transfer.webp",category:i.colorEffect},{name:"Vignette",description:"Adds shading to the corners of images",CIFilterName:"CIVignette",thumbnail:"thumbnails/vignette.webp",category:i.colorEffect,presets:{inputIntensity:1,inputRadius:"(imgSize's width / 2)"}},{name:"X-Ray",description:"X-Ray image effect",CIFilterName:"CIXRay",thumbnail:"thumbnails/x-ray.webp",category:i.colorEffect}],se=[{name:"Circular Screen",description:"Simulates a circular-shaped halftone screen",CIFilterName:"CICircularScreen",thumbnail:"thumbnails/circular_screen.webp",category:i.halftone},{name:"Dot Screen",description:"Simulates the dot pattern of a halftone screen",CIFilterName:"CIDotScreen",thumbnail:"thumbnails/dot_screen.webp",category:i.halftone},{name:"CMYK Halftone",description:"Creates a halftoned rendition of an image using cyan, magenta, yellow, and black",CIFilterName:"CICMYKHalftone",thumbnail:"thumbnails/cmyk_halftone.webp",category:i.halftone},{name:"Hatched Screen",description:"Simulates the hatched pattern of a halftone screen",CIFilterName:"CIHatchedScreen",thumbnail:"thumbnails/hatched_screen.webp",category:i.halftone},{name:"Line Screen",description:"Simulates the line pattern of a halftone screen",CIFilterName:"CILineScreen",thumbnail:"thumbnails/line_screen.webp",category:i.halftone}],oe=[{name:"Bump",description:"Creates a bump that originates from a point",CIFilterName:"CIBumpDistortion",thumbnail:"thumbnails/bump.webp",category:i.distortion,presets:{inputCenter:`(current application's CIVector's vectorWithString:"[" & imgSize's width / 2 & " " & imgSize's height / 2 & "]")`,inputRadius:"(imgSize's width / 3)"}},{name:"Circle Splash",description:"Radially replicates colors around a center circle",CIFilterName:"CICircleSplashDistortion",thumbnail:"thumbnails/circle_splash.webp",category:i.distortion,presets:{inputCenter:`(current application's CIVector's vectorWithString:"[" & imgSize's width / 2 & " " & imgSize's height / 2 & "]")`,inputRadius:"(imgSize's width / 4)"}},{name:"Circular Wrap",description:"Wraps an image around a transparent circle",CIFilterName:"CICircularWrap",thumbnail:"thumbnails/circular_wrap.webp",category:i.distortion},{name:"Droste",description:"Creates a recursive, M.C. Escher-like effect",CIFilterName:"CIDroste",thumbnail:"thumbnails/droste.webp",category:i.distortion,presets:{inputInsetPoint0:`(current application's CIVector's vectorWithString:"[" & imgSize's width * 1 / 10 & " " & imgSize's height * 9 / 10 & "]")`,inputInsetPoint1:`(current application's CIVector's vectorWithString:"[" & imgSize's width * 9 / 10 & " " & imgSize's height * 1 / 10 & "]")`,inputPeriodicity:0}},{name:"Glass Lozenge",description:"Distorts a portion of the image around lozenge-shaped lens",CIFilterName:"CIGlassLozenge",thumbnail:"thumbnails/glass_lozenge.webp",category:i.distortion,presets:{inputPoint0:`(current application's CIVector's vectorWithString:"[" & imgSize's width / 1.5 & " " & imgSize's height / 2 & "]")`,inputPoint1:`(current application's CIVector's vectorWithString:"[" & imgSize's width / 3 & " " & imgSize's height / 2 & "]")`,inputRadius:"(imgSize's width / 4)"}},{name:"Hole",description:"Creates a hole in the image, pushing the surrounding pixels outward",CIFilterName:"CIHoleDistortion",thumbnail:"thumbnails/hole.webp",category:i.distortion,presets:{inputCenter:`(current application's CIVector's vectorWithString:"[" & imgSize's width / 2 & " " & imgSize's height / 2 & "]")`,inputRadius:"(imgSize's width / 4)"}},{name:"Light Tunnel",description:"Rotates the image around a center area to create tunneling effect",CIFilterName:"CILightTunnel",thumbnail:"thumbnails/light_tunnel.webp",category:i.distortion,presets:{inputCenter:`(current application's CIVector's vectorWithString:"[" & imgSize's width / 2 & " " & imgSize's height / 2 & "]")`,inputRotation:3*Math.PI,inputRadius:"(imgSize's width / 4)"}},{name:"Linear Bump",description:"Creates a bump that originates from a line",CIFilterName:"CIBumpDistortionLinear",thumbnail:"thumbnails/linear_bump.webp",category:i.distortion,presets:{inputCenter:`(current application's CIVector's vectorWithString:"[" & imgSize's width / 2 & " " & imgSize's height / 2 & "]")`,inputRadius:"(imgSize's width / 3)",inputAngle:Math.PI/2}},{name:"Pinch",description:"Distorts an image by pinching it at a point",CIFilterName:"CIPinchDistortion",thumbnail:"thumbnails/pinch.webp",category:i.distortion,presets:{inputCenter:`(current application's CIVector's vectorWithString:"[" & imgSize's width / 2 & " " & imgSize's height / 2 & "]")`,inputRadius:"(imgSize's width / 2)"}},{name:"Torus Lens",description:"Distorts a portion on an image around a torus-shaped lens",CIFilterName:"CITorusLensDistortion",thumbnail:"thumbnails/torus_lens.webp",category:i.distortion,presets:{inputCenter:`(current application's CIVector's vectorWithString:"[" & imgSize's width / 2 & " " & imgSize's height / 2 & "]")`,inputRadius:"(imgSize's width / 2)",inputWidth:"(imgSize's width / 10)"}},{name:"Twirl",description:"Rotates pixels around a point to create a twirl effect",CIFilterName:"CITwirlDistortion",thumbnail:"thumbnails/twirl.webp",category:i.distortion,presets:{inputCenter:`(current application's CIVector's vectorWithString:"[" & imgSize's width / 2 & " " & imgSize's height / 2 & "]")`,inputRadius:"(imgSize's width / 2)",inputAngle:"(imgSize's width / 100) * "+Math.PI}},{name:"Vortex",description:"Rotates pixels around a point to create a vortex effect",CIFilterName:"CIVortexDistortion",thumbnail:"thumbnails/vortex.webp",category:i.distortion,presets:{inputCenter:`(current application's CIVector's vectorWithString:"[" & imgSize's width / 2 & " " & imgSize's height / 2 & "]")`,inputRadius:"(imgSize's width / 2)",inputAngle:"(imgSize's width / 10) * "+Math.PI}}],ce=[{name:"Sharpen Luminance",description:"Increases detailed by sharpening based on luminance",CIFilterName:"CISharpenLuminance",thumbnail:"thumbnails/sharpen_luminance.webp",category:i.sharpen},{name:"Unsharp Mask",description:"Sharpens images by increasing contrast along edges",CIFilterName:"CIUnsharpMask",thumbnail:"thumbnails/unsharp_mask.webp",category:i.sharpen}],le=[{name:"Bloom",description:"Softens edges and adds a glow",CIFilterName:"CIBloom",thumbnail:"thumbnails/bloom.webp",category:i.stylize},{name:"Comic",description:"Makes images look like comic book drawings",CIFilterName:"CIComicEffect",thumbnail:"thumbnails/comic.webp",category:i.stylize},{name:"Crystallize",description:"Creates polygon-shaped color blocks by aggregating pixel values",CIFilterName:"CICrystallize",thumbnail:"thumbnails/crystallize.webp",category:i.stylize},{name:"Depth Of Field",description:"Simulates tilt-shift",CIFilterName:"CIDepthOfField",thumbnail:"thumbnails/depth_of_field.webp",category:i.stylize},{name:"Edges",description:"Detects edges and highlights them colorfully, blackening other areas",CIFilterName:"CIEdges",thumbnail:"thumbnails/edges.webp",category:i.stylize},{name:"Edge Work",description:"White woodblock cutout effect",CIFilterName:"CIEdgeWork",thumbnail:"thumbnails/edge_work.webp",category:i.stylize},{name:"Gabor Gradients",description:"Applies a 5x5 Gabor filter to an image",CIFilterName:"CIGaborGradients",thumbnail:"thumbnails/gabor_gradients.webp",category:i.stylize},{name:"Gloom",description:"Dulls highlights",CIFilterName:"CIGloom",thumbnail:"thumbnails/gloom.webp",category:i.stylize},{name:"Height Field From Mask",description:"Generates a 3D height field from a grayscale mask",CIFilterName:"CIHeightFieldFromMask",thumbnail:"thumbnails/height_field_from_mask.webp",category:i.stylize},{name:"Hexagonal Pixellate",description:"Pixellates images using hexagons",CIFilterName:"CIHexagonalPixellate",thumbnail:"thumbnails/hexagonal_pixellate.webp",category:i.stylize},{name:"Line Overlay",description:"Black woodblock cutout effect",CIFilterName:"CILineOverlay",thumbnail:"thumbnails/line_overlay.webp",category:i.stylize},{name:"Pixellate",description:"Pixellates images with large square pixels",CIFilterName:"CIPixellate",thumbnail:"thumbnails/pixellate.webp",category:i.stylize},{name:"Pointillize",description:"Pixellates images with dots",CIFilterName:"CIPointillize",thumbnail:"thumbnails/pointillize.webp",category:i.stylize},{name:"Spotlight",description:"Adds a directional spotlight effect",CIFilterName:"CISpotLight",thumbnail:"thumbnails/spotlight.webp",category:i.stylize,presets:{inputLightPointsAt:`(current application's CIVector's vectorWithString:"[" & imgSize's width / 2 & " " & imgSize's height / 2 & " 0]")`,inputLightPosition:`(current application's CIVector's vectorWithString:"[" & imgSize's width / 2 & " " & imgSize's height / 2 & " 1000]")`,inputBrightness:5,inputConcentration:.1}}],ue=[{name:"Eightfold Reflected Tile",description:"Tiles an image by applyng an 8-way reflection",CIFilterName:"CIEightfoldReflectedTile",thumbnail:"thumbnails/eightfold_reflected_tile.webp",category:i.tile},{name:"Fourfold Reflected Tile",description:"Tiles an image by applying a 4-way reflection",CIFilterName:"CIFourfoldReflectedTile",thumbnail:"thumbnails/fourfold_reflected_tile.webp",category:i.tile},{name:"Fourfold Rotated Tile",description:"Tiles an image by rotating it at increments of 90 degrees",CIFilterName:"CIFourfoldRotatedTile",thumbnail:"thumbnails/fourfold_rotated_tile.webp",category:i.tile},{name:"Fourfold Translated Tile",description:"Tiles an image by applying a 4 translation operations",CIFilterName:"CIFourfoldTranslatedTile",thumbnail:"thumbnails/fourfold_translated_tile.webp",category:i.tile},{name:"Glide Reflected Tile",description:"Tiles an image by translating and smearing it",CIFilterName:"CIGlideReflectedTile",thumbnail:"thumbnails/glide_reflected_tile.webp",category:i.tile},{name:"Kaleidoscope",description:"Creates a kaleidoscopic image by applying 12-way symmetry",CIFilterName:"CIKaleidoscope",thumbnail:"thumbnails/kaleidoscope.webp",category:i.tile},{name:"Op Tile",description:"Segments and re-assembles images to mimic op art",CIFilterName:"CIOpTile",thumbnail:"thumbnails/op_tile.webp",category:i.tile},{name:"Parallelogram Tile",description:"Tiles an image after reflecting it in a parallelogram",CIFilterName:"CIParallelogramTile",thumbnail:"thumbnails/parallelogram_tile.webp",category:i.tile},{name:"Perspective Tile",description:"Applies a perspective transformation to an image and tiles the result",CIFilterName:"CIPerspectiveTile",thumbnail:"thumbnails/perspective_tile.webp",category:i.tile},{name:"Sixfold Reflected Tile",description:"Tiles an image by applying a 6-way reflection",CIFilterName:"CISixfoldReflectedTile",thumbnail:"thumbnails/sixfold_reflected_tile.webp",category:i.tile},{name:"Sixfold Rotated Tile",description:"Tiles an image by rotating it at increments of 60 degrees",CIFilterName:"CISixfoldRotatedTile",thumbnail:"thumbnails/sixfold_rotated_tile.webp",category:i.tile},{name:"Triangle Kaleidoscope",description:"Maps a triangular portion of an image to a kaleidoscopically tiled pattern",CIFilterName:"CITriangleKaleidoscope",thumbnail:"thumbnails/triangle_kaleidoscope.webp",category:i.tile},{name:"Triangle Tile",description:"Tiles a triangular portion of an image",CIFilterName:"CITriangleTile",thumbnail:"thumbnails/triangle_tile.webp",category:i.tile},{name:"Twelvefold Reflected Tile",description:"Tiles an image by applying a 12-way reflection",CIFilterName:"CITwelvefoldReflectedTile",thumbnail:"thumbnails/twelvefold_reflected_tile.webp",category:i.tile}];var C=$(require("fs")),y=$(require("os")),f=$(require("path")),p=require("@raycast/api");var _=require("@raycast/api");var ge=async()=>m(`use framework "AppKit"
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
      
      return filePaths`),be=async r=>{let e=Array.isArray(r)?r:[r];await m(`use framework "Foundation"
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
      end if`)};var I=$(require("path"));var O=require("child_process");function k(r,e){let t=e?.command,a=e?.language,s=[...e?.leadingArgs?.map(l=>l.toString())||[]],o=e?.trailingArgs||[];!t&&(a===void 0||a==="AppleScript"||a==="JXA")&&(t="/usr/bin/osascript",s.push("-l",a==="JXA"?"JavaScript":"AppleScript",...r.startsWith("/")?[]:["-e"],r,...o.map(l=>l.toString())));let n=process.env;if(e?.command&&(n.PATH=`${n.PATH}:${(0,O.execSync)(`$(/bin/bash -lc 'echo $SHELL') -lc 'echo "$PATH"'`).toString()}`,t=e.command,s.push(r,...o.map(l=>l.toString()))),!t)throw new Error("No command specified.");let c="",d=l=>{console.log(l)},u=(0,O.spawn)(t,s,{env:n});return e?.logDebugMessages&&console.log(`Running shell command "${t} ${s.join(" ")}"`),u.stdout?.on("data",l=>{c+=l.toString(),e?.logIntermediateOutput&&console.log(`Data from script: ${c}`)}),u.stderr?.on("data",l=>{e?.stderrCallback&&e.stderrCallback(l.toString()),e?.logErrors&&console.error(l.toString())}),u.stdin.on("error",l=>{e?.logErrors&&console.error(`Error writing to stdin: ${l}`)}),d=async l=>{l?.length>0&&(u.stdin.cork(),u.stdin.write(`${l}\r
`),process.nextTick(()=>u.stdin.uncork()),e?.logSentMessages&&console.log(`Sent message: ${l}`))},{data:(async()=>new Promise((l,P)=>{let z=e?.timeout?setTimeout(()=>{try{u.kill()}catch(w){e?.logErrors&&console.error(`Error killing process: ${w}`)}return e?.logErrors&&console.error("Script timed out"),u.stdin.end(),u.kill(),P("Script timed out")},e?.timeout):void 0;u.on("close",w=>{if(w!==0)return e?.logErrors&&console.error(`Script exited with code ${w}`),u.stdin.end(),u.kill(),P(`Script exited with code ${w}`);clearTimeout(z);let A;try{A=JSON.parse(c)}catch{A=c.trim()}return e?.logFinalOutput&&console.log(`Script output: ${A}`),l(A)})}))(),sendMessage:d}}var x=require("@raycast/api");async function ye(){let r=I.default.join(x.environment.assetsPath,"scripts","finder.scpt"),e=await k(r,{language:"AppleScript",stderrCallback:t=>b("Finder Selection Error",new Error(t))}).data;return Array.isArray(e)?e:e.split(",").map(t=>t.trim())}async function Fe(){let r=I.default.join(x.environment.assetsPath,"scripts","houdahSpot.scpt"),e=await k(r,{language:"AppleScript",stderrCallback:t=>b("HoudahSpot Selection Error",new Error(t))}).data;return Array.isArray(e)?e:e.split(",").map(t=>t.trim())}async function we(){let r=I.default.join(x.environment.assetsPath,"scripts","neofinder.scpt"),e=await k(r,{language:"AppleScript",stderrCallback:t=>b("NeoFinder Selection Error",new Error(t))}).data;return Array.isArray(e)?e:e.split(",").map(t=>t.trim())}async function $e(){let r=I.default.join(x.environment.assetsPath,"scripts","pathfinder.scpt"),e=await k(r,{language:"JXA",stderrCallback:t=>b("Path Finder Selection Error",new Error(t))}).data;return Array.isArray(e)?e:e.split(",").map(t=>t.trim())}async function Se(){let r=I.default.join(x.environment.assetsPath,"scripts","qspace.scpt"),e=await k(r,{language:"JXA",stderrCallback:t=>b("QSpace Pro Selection Error",new Error(t))}).data;return Array.isArray(e)?e:e.split(",").map(t=>t.trim())}async function ke(){let r=I.default.join(x.environment.assetsPath,"scripts","forklift-beta.scpt"),e=await k(r,{language:"JXA",stderrCallback:t=>b("ForkLift Selection Error",new Error(t))}).data;return Array.isArray(e)?e:e.split(",").map(t=>t.trim())}var U=async()=>{let e=(await p.LocalStorage.getItem("itemsToRemove")??"").toString().split(", ");for(let t of e)C.existsSync(t)&&await C.promises.rm(t,{recursive:!0});await p.LocalStorage.removeItem("itemsToRemove")},K=async()=>{let r=[],t=(0,p.getPreferenceValues)().inputMethod,a=!1;if(t=="Clipboard")try{let n=(await ge()).split(", ");if(await p.LocalStorage.setItem("itemsToRemove",n.join(", ")),n.filter(c=>c.trim().length>0).length>0)return n}catch(n){console.error(`Couldn't get images from clipboard: ${n}`),a=!0}let s=t;try{s=(await(0,p.getFrontmostApplication)()).name}catch(n){console.error(`Couldn't get frontmost application: ${n}`)}try{(t=="Path Finder"||s=="Path Finder")&&(r=await $e())}catch(n){console.error(`Couldn't get images from Path Finder: ${n}`),a=!0}try{(t=="NeoFinder"||s=="NeoFinder")&&(r=await we())}catch(n){console.error(`Couldn't get images from NeoFinder: ${n}`),a=!0}try{(t=="HoudahSpot"||s=="HoudahSpot")&&(r=await Fe())}catch(n){console.error(`Couldn't get images from HoudahSpot: ${n}`),a=!0}try{(t=="QSpace Pro"||s=="QSpace Pro")&&(r=await Se())}catch(n){console.error(`Couldn't get images from QSpace Pro: ${n}`),a=!0}try{(t=="ForkLift"||s=="ForkLift")&&(r=await ke())}catch(n){console.error(`Couldn't get images from ForkLift: ${n}`),a=!0}if(r.length>0)return r.filter((n,c)=>r.indexOf(n)===c);let o=await ye();return s=="Finder"||t=="Finder"||a?r=o:o.forEach(n=>{n.split("/").at(-2)=="Desktop"&&!r.includes(n)&&r.push(n)}),r.filter((n,c)=>r.indexOf(n)===c)},xe=async r=>{let e="Finder";try{e=(await(0,p.getFrontmostApplication)()).name}catch(a){console.error(`Couldn't get frontmost application: : ${a}`)}let t=(0,p.getPreferenceValues)();t.imageResultHandling=="copyToClipboard"?(await be(r),Ie(r)):t.imageResultHandling=="openInPreview"?(await Je(r),Ie(r)):t.inputMethod=="NeoFinder"||e=="NeoFinder"?await(0,p.showInFinder)(r[0]):(t.inputMethod=="HoudahSpot"||e=="HoudahSpot")&&await(0,p.showInFinder)(r[0])};var Je=async r=>{let e=Array.isArray(r)?r:[r],t=e.some(a=>f.default.extname(a)==".svg");await m(`use framework "Foundation"
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
          end tell`}`)},Ie=r=>{let e=Array.isArray(r)?r:[r];for(let t of e)C.unlinkSync(t)},Xe=async()=>m(`use framework "Foundation"
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
    end if`),Ze=async r=>{let e="Finder";try{e=await Xe()}catch(t){console.error(`Couldn't get frontmost application: ${t}`)}try{if(e=="Path Finder")return m(`tell application "Path Finder"
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
  end tell`)},Ce=async(r,e=!1,t=void 0)=>{let a=(0,p.getPreferenceValues)(),s=await Ze(r[0]);return r.map(o=>{let n=o;if(a.imageResultHandling=="saveToDownloads"?n=f.default.join(y.homedir(),"Downloads",f.default.basename(n)):a.imageResultHandling=="saveToDesktop"?n=f.default.join(y.homedir(),"Desktop",f.default.basename(n)):(a.imageResultHandling=="saveInContainingFolder"||a.imageResultHandling=="replaceOriginal")&&(a.inputMethod=="Clipboard"||e)?n=f.default.join(s,f.default.basename(n)):(a.imageResultHandling=="copyToClipboard"||a.imageResultHandling=="openInPreview")&&(n=f.default.join(y.tmpdir(),f.default.basename(n))),n=t?n.replace(f.default.extname(n),`.${t}`):n,a.imageResultHandling!="replaceOriginal"&&y.tmpdir()!=f.default.dirname(n)){let c=2;for(;C.existsSync(n);)n=f.default.join(f.default.dirname(n),f.default.basename(n,f.default.extname(n))+`-${c}${f.default.extname(n)}`),c++}return n})},b=async(r,e,t,a)=>{console.error(e),t?(t.title=r,t.message=a??e.message,t.style=p.Toast.Style.Failure,t.primaryAction={title:"Copy Error",onAction:async()=>{await p.Clipboard.copy(e.message)}}):t=await(0,p.showToast)({title:r,message:a??e.message,style:p.Toast.Style.Failure,primaryAction:{title:"Copy Error",onAction:async()=>{await p.Clipboard.copy(e.message)}}})};var ve=r=>{let e=y.homedir();if(r.startsWith("~"))return r.replace(/^~(?=$|\/|\\)/,e);let t=/(\/Users\/.*?)\/.*/,a=r.match(t);return a?r.replace(a[1],e):r};async function J(r,e){let t=[],a=r.map(s=>ve(s));for(let s of a){let o=(await Ce([s],!1,s.endsWith(".pdf")?"pdf":"png"))[0];await me(s,o,e),t.push(o)}return await xe(t),t}var v=require("@raycast/api");async function X(r){if(r.selectedImages.length===0||r.selectedImages.length===1&&r.selectedImages[0]===""){await(0,v.showToast)({title:"No images selected",message:"No images found in your selection. Make sure the image(s) still exist on the disk. If using a third-party file manager, make sure the app's index is up to date.",style:v.Toast.Style.Failure});return}let e=await(0,v.showToast)({title:r.inProgressMessage,style:v.Toast.Style.Animated}),t=`image${r.selectedImages.length===1?"":"s"}`;try{let a=await r.operation();return e.title=`${r.successMessage} ${r.selectedImages.length.toString()} ${t}`,e.style=v.Toast.Style.Success,a}catch(a){await b(`${r.failureMessage} ${r.selectedImages.length.toString()} ${t}`,a,e)}finally{await U()}}var T=require("react/jsx-runtime");function qe({filter:r,content:e}){return(0,T.jsx)(g.Grid.Item,{title:r.name,id:r.CIFilterName,accessory:{icon:{source:g.Icon.Info},tooltip:r.description},subtitle:r.category,content:e||{source:r.thumbnail},actions:(0,T.jsx)(g.ActionPanel,{children:(0,T.jsx)(g.Action,{title:`Apply ${r.name} Filter`,onAction:async()=>{let t=await K();await X({operation:()=>J(t,r),selectedImages:t,inProgressMessage:"Filtering in progress...",successMessage:"Applied filter to",failureMessage:"Failed to apply filter to"})}})})},r.CIFilterName)}function Ae(){let[r,e]=(0,D.useState)(),[t,a]=(0,D.useState)(""),s=(0,D.useRef)([]),o=(0,g.getPreferenceValues)();return(0,T.jsx)(g.Grid,{searchBarPlaceholder:"Search filters...",onSelectionChange:async n=>{!o.showPreviews||!n||(s.current.push(n),setTimeout(async()=>{if(s.current.at(-1)==n){let c=G().find(d=>d.CIFilterName===n);if(c&&c.name!==r?.name){a(""),e(c);let d=(await K()).at(0);if(d&&d.trim()!==""&&(0,Pe.statSync)(d).size<8e5){let u=await he(c,d);a(u)}await U()}}s.current=s.current.filter(c=>c!==n)},500))},children:G().map(n=>(0,T.jsx)(qe,{filter:n,content:r?.name===n.name?t:void 0},n.CIFilterName))})}
