"use strict";var le=Object.create;var C=Object.defineProperty;var ue=Object.getOwnPropertyDescriptor;var pe=Object.getOwnPropertyNames;var de=Object.getPrototypeOf,fe=Object.prototype.hasOwnProperty;var he=(r,t)=>{for(var e in t)C(r,e,{get:t[e],enumerable:!0})},L=(r,t,e,n)=>{if(t&&typeof t=="object"||typeof t=="function")for(let a of pe(t))!fe.call(r,a)&&a!==e&&C(r,a,{get:()=>t[a],enumerable:!(n=ue(t,a))||n.enumerable});return r};var w=(r,t,e)=>(e=r!=null?le(de(r)):{},L(t||!r||!r.__esModule?C(e,"default",{value:r,enumerable:!0}):e,r)),me=r=>L(C({},"__esModule",{value:!0}),r);var Ae={};he(Ae,{default:()=>Fe});module.exports=me(Ae);var oe=w(require("os")),se=w(require("path"));var S=w(require("react")),d=require("@raycast/api");var H=w(require("node:child_process")),B=require("node:buffer"),v=w(require("node:stream")),G=require("node:util");var X=require("react/jsx-runtime");var T=globalThis;var P=r=>!!r&&typeof r=="object"&&typeof r.removeListener=="function"&&typeof r.emit=="function"&&typeof r.reallyExit=="function"&&typeof r.listeners=="function"&&typeof r.kill=="function"&&typeof r.pid=="number"&&typeof r.on=="function",E=Symbol.for("signal-exit emitter"),D=class{constructor(){if(this.emitted={afterExit:!1,exit:!1},this.listeners={afterExit:[],exit:[]},this.count=0,this.id=Math.random(),T[E])return T[E];Object.defineProperty(T,E,{value:this,writable:!1,enumerable:!1,configurable:!1})}on(t,e){this.listeners[t].push(e)}removeListener(t,e){let n=this.listeners[t],a=n.indexOf(e);a!==-1&&(a===0&&n.length===1?n.length=0:n.splice(a,1))}emit(t,e,n){if(this.emitted[t])return!1;this.emitted[t]=!0;let a=!1;for(let o of this.listeners[t])a=o(e,n)===!0||a;return t==="exit"&&(a=this.emit("afterExit",e,n)||a),a}},O=class{onExit(){return()=>{}}load(){}unload(){}},N=class{#s;#t;#e;#i;#o;#a;#n;#r;constructor(t){this.#s=process.platform==="win32"?"SIGINT":"SIGHUP",this.#t=new D,this.#a={},this.#n=!1,this.#r=[],this.#r.push("SIGHUP","SIGINT","SIGTERM"),globalThis.process.platform!=="win32"&&this.#r.push("SIGALRM","SIGABRT","SIGVTALRM","SIGXCPU","SIGXFSZ","SIGUSR2","SIGTRAP","SIGSYS","SIGQUIT","SIGIOT"),globalThis.process.platform==="linux"&&this.#r.push("SIGIO","SIGPOLL","SIGPWR","SIGSTKFLT"),this.#e=t,this.#a={};for(let e of this.#r)this.#a[e]=()=>{let n=this.#e.listeners(e),{count:a}=this.#t,o=t;if(typeof o.__signal_exit_emitter__=="object"&&typeof o.__signal_exit_emitter__.count=="number"&&(a+=o.__signal_exit_emitter__.count),n.length===a){this.unload();let i=this.#t.emit("exit",null,e),p=e==="SIGHUP"?this.#s:e;i||t.kill(t.pid,p)}};this.#o=t.reallyExit,this.#i=t.emit}onExit(t,e){if(!P(this.#e))return()=>{};this.#n===!1&&this.load();let n=e?.alwaysLast?"afterExit":"exit";return this.#t.on(n,t),()=>{this.#t.removeListener(n,t),this.#t.listeners.exit.length===0&&this.#t.listeners.afterExit.length===0&&this.unload()}}load(){if(!this.#n){this.#n=!0,this.#t.count+=1;for(let t of this.#r)try{let e=this.#a[t];e&&this.#e.on(t,e)}catch{}this.#e.emit=(t,...e)=>this.#l(t,...e),this.#e.reallyExit=t=>this.#c(t)}}unload(){this.#n&&(this.#n=!1,this.#r.forEach(t=>{let e=this.#a[t];if(!e)throw new Error("Listener not defined for signal: "+t);try{this.#e.removeListener(t,e)}catch{}}),this.#e.emit=this.#i,this.#e.reallyExit=this.#o,this.#t.count-=1)}#c(t){return P(this.#e)?(this.#e.exitCode=t||0,this.#t.emit("exit",this.#e.exitCode,null),this.#o.call(this.#e,this.#e.exitCode)):0}#l(t,...e){let n=this.#i;if(t==="exit"&&P(this.#e)){typeof e[0]=="number"&&(this.#e.exitCode=e[0]);let a=n.call(this.#e,t,...e);return this.#t.emit("exit",this.#e.exitCode,null),a}else return n.call(this.#e,t,...e)}},W=null,ge=(r,t)=>(W||(W=P(process)?new N(process):new O),W.onExit(r,t));function be(r,{timeout:t}={}){let e=new Promise((p,s)=>{r.on("exit",(l,f)=>{p({exitCode:l,signal:f,timedOut:!1})}),r.on("error",l=>{s(l)}),r.stdin&&r.stdin.on("error",l=>{s(l)})}),n=ge(()=>{r.kill()});if(t===0||t===void 0)return e.finally(()=>n());let a,o=new Promise((p,s)=>{a=setTimeout(()=>{r.kill("SIGTERM"),s(Object.assign(new Error("Timed out"),{timedOut:!0,signal:"SIGTERM"}))},t)}),i=e.finally(()=>{clearTimeout(a)});return Promise.race([o,i]).finally(()=>n())}var U=class extends Error{constructor(){super("The output is too big"),this.name="MaxBufferError"}};function $e(r){let{encoding:t}=r,e=t==="buffer",n=new v.default.PassThrough({objectMode:!1});t&&t!=="buffer"&&n.setEncoding(t);let a=0,o=[];return n.on("data",i=>{o.push(i),a+=i.length}),n.getBufferedValue=()=>e?Buffer.concat(o,a):o.join(""),n.getBufferedLength=()=>a,n}async function M(r,t){let e=$e(t);return await new Promise((n,a)=>{let o=i=>{i&&e.getBufferedLength()<=B.constants.MAX_LENGTH&&(i.bufferedData=e.getBufferedValue()),a(i)};(async()=>{try{await(0,G.promisify)(v.default.pipeline)(r,e),n()}catch(i){o(i)}})(),e.on("data",()=>{e.getBufferedLength()>8e7&&o(new U)})}),e.getBufferedValue()}async function j(r,t){r.destroy();try{return await t}catch(e){return e.bufferedData}}async function ye({stdout:r,stderr:t},{encoding:e},n){let a=M(r,{encoding:e}),o=M(t,{encoding:e});try{return await Promise.all([n,a,o])}catch(i){return Promise.all([{error:i,exitCode:null,signal:i.signal,timedOut:i.timedOut||!1},j(r,a),j(t,o)])}}function we(r){let t=typeof r=="string"?`
`:10,e=typeof r=="string"?"\r":13;return r[r.length-1]===t&&(r=r.slice(0,-1)),r[r.length-1]===e&&(r=r.slice(0,-1)),r}function z(r,t){return r.stripFinalNewline?we(t):t}function Se({timedOut:r,timeout:t,signal:e,exitCode:n}){return r?`timed out after ${t} milliseconds`:e!=null?`was killed with ${e}`:n!=null?`failed with exit code ${n}`:"failed"}function ke({stdout:r,stderr:t,error:e,signal:n,exitCode:a,command:o,timedOut:i,options:p,parentError:s}){let f=`Command ${Se({timedOut:i,timeout:p?.timeout,signal:n,exitCode:a})}: ${o}`,m=e?`${f}
${e.message}`:f,g=[m,t,r].filter(Boolean).join(`
`);return e?e.originalMessage=e.message:e=s,e.message=g,e.shortMessage=m,e.command=o,e.exitCode=a,e.signal=n,e.stdout=r,e.stderr=t,"bufferedData"in e&&delete e.bufferedData,e}function xe({stdout:r,stderr:t,error:e,exitCode:n,signal:a,timedOut:o,command:i,options:p,parentError:s}){if(e||n!==0||a!==null)throw ke({error:e,exitCode:n,signal:a,stdout:r,stderr:t,command:i,timedOut:o,options:p,parentError:s});return r}async function $(r,t,e){if(process.platform!=="darwin")throw new Error("AppleScript is only supported on macOS");let{humanReadableOutput:n,language:a,timeout:o,...i}=Array.isArray(t)?e||{}:t||{},p=n!==!1?[]:["-ss"];a==="JavaScript"&&p.push("-l","JavaScript"),Array.isArray(t)&&p.push("-",...t);let s=H.default.spawn("osascript",p,{...i,env:{PATH:"/usr/local/bin:/usr/bin:/bin:/usr/sbin:/sbin"}}),l=be(s,{timeout:o??1e4});s.stdin.end(r);let[{error:f,exitCode:m,signal:g,timedOut:b},I,c]=await ye(s,{encoding:"utf8"},l),F=z({stripFinalNewline:!0},I),A=z({stripFinalNewline:!0},c);return xe({stdout:F,stderr:A,error:f,exitCode:m,signal:g,timedOut:b,command:"osascript",options:e,parentError:new Error})}var y=async(r,t,e,n,a)=>$(`use framework "Foundation"
    use framework "Quartz"
    use scripting additions
    
    set filterName to "${t}"
    set theFilter to current application's CIFilter's filterWithName:filterName
    theFilter's setDefaults()

    set imgWidth to ${e}
    set imgHeight to ${n}

    set theCIImage to current application's CIImage's emptyImage()
    ${Object.entries(a).map(([o,i])=>`theFilter's setValue:(${i}) forKey:"${o}"`).join(`
`)}
    
    set theBounds to current application's NSMakeRect(0, 0, imgWidth, imgHeight)
    set uncroppedOutput to theFilter's valueForKey:(current application's kCIOutputImageKey)
    set croppedOutput to uncroppedOutput's imageByCroppingToRect:theBounds
    
    -- Convert back to NSImage and save to file
    set theRep to current application's NSCIImageRep's imageRepWithCIImage:croppedOutput
    set theResult to current application's NSImage's alloc()'s initWithSize:(theRep's |size|())
    theResult's addRepresentation:theRep
    saveImage(theResult, "${r}")
    
    on saveImage(imageToSave, destinationPath)
        -- Saves an NSImage to the supplied file path
        set theTIFFData to imageToSave's TIFFRepresentation()
        set theBitmapImageRep to current application's NSBitmapImageRep's imageRepWithData:theTIFFData
        set theResultData to theBitmapImageRep's representationUsingType:(current application's NSPNGFileType) |properties|:(missing value)
        theResultData's writeToFile:destinationPath atomically:false
    end saveImage`),_={Checkerboard:{applyMethod:y,CIFilterName:"CICheckerboardGenerator",name:"Checkerboard",thumbnail:"thumbnails/checkerboard.webp"},ConstantColor:{applyMethod:y,CIFilterName:"CIConstantColorGenerator",name:"Constant Color",thumbnail:"thumbnails/constant_color.webp"},LenticularHalo:{applyMethod:y,CIFilterName:"CILenticularHaloGenerator",name:"Lenticular Halo",thumbnail:"thumbnails/lenticular_halo.webp"},LinearGradient:{applyMethod:y,CIFilterName:"CILinearGradient",name:"Linear Gradient",thumbnail:"thumbnails/linear_gradient.webp"},RadialGradient:{applyMethod:y,CIFilterName:"CIRadialGradient",name:"Radial Gradient",thumbnail:"thumbnails/radial_gradient.webp"},Random:{applyMethod:y,CIFilterName:"CIRandomGenerator",name:"Random",thumbnail:"thumbnails/random.webp"},StarShine:{applyMethod:y,CIFilterName:"CIStarShineGenerator",name:"Star Shine",thumbnail:"thumbnails/star_shine.webp"},Stripes:{applyMethod:y,CIFilterName:"CIStripesGenerator",name:"Stripes",thumbnail:"thumbnails/stripes.webp"},Sunbeams:{applyMethod:y,CIFilterName:"CISunbeamsGenerator",name:"Sunbeams",thumbnail:"thumbnails/sunbeams.webp"}},K=(r,t,e,n,a)=>[{inputColor0:`current application's CIColor's colorWithRed:${r[0]/255} green:${t[0]/255} blue:${e[0]/255} alpha:${n[0]/255}`,inputColor1:`current application's CIColor's colorWithRed:${r[1]/255} green:${t[1]/255} blue:${e[1]/255} alpha:${n[1]/255}`,inputWidth:`imgWidth / ${a||4}`},{inputColor0:`current application's CIColor's colorWithRed:${r[2]/255} green:${t[2]/255} blue:${e[2]/255} alpha:${n[2]/255}`,inputColor1:`current application's CIColor's colorWithRed:${r[3]/255} green:${t[3]/255} blue:${e[3]/255} alpha:${n[3]/255}`,inputWidth:"imgWidth / 8"},{inputColor0:`current application's CIColor's colorWithRed:${r[4]/255} green:${t[4]/255} blue:${e[4]/255} alpha:${n[4]/255}`,inputColor1:`current application's CIColor's colorWithRed:${r[5]/255} green:${t[5]/255} blue:${e[5]/255} alpha:${n[5]/255}`,inputWidth:"imgWidth / 16"},{inputColor0:`current application's CIColor's colorWithRed:${r[6]/255} green:${t[6]/255} blue:${e[6]/255} alpha:${n[6]/255}`,inputColor1:`current application's CIColor's colorWithRed:${r[7]/255} green:${t[7]/255} blue:${e[7]/255} alpha:${n[7]/255}`,inputWidth:"imgWidth / 32"},{inputColor0:`current application's CIColor's colorWithRed:${r[8]/255} green:${t[8]/255} blue:${e[8]/255} alpha:${n[8]/255}`,inputColor1:`current application's CIColor's colorWithRed:${r[9]/255} green:${t[9]/255} blue:${e[9]/255} alpha:${n[9]/255}`,inputWidth:"imgWidth / 64"}],J=(r,t,e,n,a)=>[{inputColor0:`current application's CIColor's colorWithRed:${r[0]/255} green:${t[0]/255} blue:${e[0]/255} alpha:${n[0]/255}`,inputColor1:`current application's CIColor's colorWithRed:${r[1]/255} green:${t[1]/255} blue:${e[1]/255} alpha:${n[1]/255}`,inputWidth:`imgWidth / ${a||4}`},{inputColor0:`current application's CIColor's colorWithRed:${r[2]/255} green:${t[2]/255} blue:${e[2]/255} alpha:${n[2]/255}`,inputColor1:`current application's CIColor's colorWithRed:${r[3]/255} green:${t[3]/255} blue:${e[3]/255} alpha:${n[3]/255}`,inputWidth:"imgWidth / 8"},{inputColor0:`current application's CIColor's colorWithRed:${r[4]/255} green:${t[4]/255} blue:${e[4]/255} alpha:${n[4]/255}`,inputColor1:`current application's CIColor's colorWithRed:${r[5]/255} green:${t[5]/255} blue:${e[5]/255} alpha:${n[5]/255}`,inputWidth:"imgWidth / 16"},{inputColor0:`current application's CIColor's colorWithRed:${r[6]/255} green:${t[6]/255} blue:${e[6]/255} alpha:${n[6]/255}`,inputColor1:`current application's CIColor's colorWithRed:${r[7]/255} green:${t[7]/255} blue:${e[7]/255} alpha:${n[7]/255}`,inputWidth:"imgWidth / 32"},{inputColor0:`current application's CIColor's colorWithRed:${r[8]/255} green:${t[8]/255} blue:${e[8]/255} alpha:${n[8]/255}`,inputColor1:`current application's CIColor's colorWithRed:${r[9]/255} green:${t[9]/255} blue:${e[9]/255} alpha:${n[9]/255}`,inputWidth:"imgWidth / 64"}],Y=(r,t,e)=>Array(10).fill(0).map((n,a)=>({inputColor:`current application's CIColor's colorWithRed:${r[a]/255} green:${t[a]/255} blue:${e[a]/255} alpha:1.0`})),Z=(r,t,e,n)=>[{inputColor0:`current application's CIColor's colorWithRed:${r[0]/255} green:${t[0]/255} blue:${e[0]/255} alpha:${n[0]/255}`,inputColor1:`current application's CIColor's colorWithRed:${r[1]/255} green:${t[1]/255} blue:${e[1]/255} alpha:${n[1]/255}`,inputPoint0:"current application's CIVector's vectorWithX:((random number) * imgWidth) Y:((random number) * imgHeight)",inputPoint1:"current application's CIVector's vectorWithX:((random number) * imgWidth) Y:((random number) * imgHeight)"},{inputColor0:`current application's CIColor's colorWithRed:${r[2]/255} green:${t[2]/255} blue:${e[2]/255} alpha:${n[2]/255}`,inputColor1:`current application's CIColor's colorWithRed:${r[3]/255} green:${t[3]/255} blue:${e[3]/255} alpha:${n[3]/255}`,inputPoint0:"current application's CIVector's vectorWithX:((random number) * imgWidth) Y:((random number) * imgHeight)",inputPoint1:"current application's CIVector's vectorWithX:((random number) * imgWidth) Y:((random number) * imgHeight)"},{inputColor0:`current application's CIColor's colorWithRed:${r[4]/255} green:${t[4]/255} blue:${e[4]/255} alpha:${n[4]/255}`,inputColor1:`current application's CIColor's colorWithRed:${r[5]/255} green:${t[5]/255} blue:${e[5]/255} alpha:${n[5]/255}`,inputPoint0:"current application's CIVector's vectorWithX:((random number) * imgWidth) Y:((random number) * imgHeight)",inputPoint1:"current application's CIVector's vectorWithX:((random number) * imgWidth) Y:((random number) * imgHeight)"},{inputColor0:`current application's CIColor's colorWithRed:${r[6]/255} green:${t[6]/255} blue:${e[6]/255} alpha:${n[6]/255}`,inputColor1:`current application's CIColor's colorWithRed:${r[7]/255} green:${t[7]/255} blue:${e[7]/255} alpha:${n[7]/255}`,inputPoint0:"current application's CIVector's vectorWithX:((random number) * imgWidth) Y:((random number) * imgHeight)",inputPoint1:"current application's CIVector's vectorWithX:((random number) * imgWidth) Y:((random number) * imgHeight)"},{inputColor0:`current application's CIColor's colorWithRed:${r[8]/255} green:${t[8]/255} blue:${e[8]/255} alpha:${n[8]/255}`,inputColor1:`current application's CIColor's colorWithRed:${r[9]/255} green:${t[9]/255} blue:${e[9]/255} alpha:${n[9]/255}`,inputPoint0:"current application's CIVector's vectorWithX:((random number) * imgWidth) Y:((random number) * imgHeight)",inputPoint1:"current application's CIVector's vectorWithX:((random number) * imgWidth) Y:((random number) * imgHeight)"}],q=(r,t,e,n)=>[{inputColor0:`current application's CIColor's colorWithRed:${r[0]/255} green:${t[0]/255} blue:${e[0]/255} alpha:${n[0]/255}`,inputColor1:`current application's CIColor's colorWithRed:${r[1]/255} green:${t[1]/255} blue:${e[1]/255} alpha:${n[1]/255}`,inputCenter:"current application's CIVector's vectorWithX:((random number) * imgWidth) Y:((random number) * imgHeight)",inputRadius0:"((random number) * imgWidth)",inputRadius1:"((random number) * imgWidth)"},{inputColor0:`current application's CIColor's colorWithRed:${r[2]/255} green:${t[2]/255} blue:${e[2]/255} alpha:${n[2]/255}`,inputColor1:`current application's CIColor's colorWithRed:${r[3]/255} green:${t[3]/255} blue:${e[3]/255} alpha:${n[3]/255}`,inputCenter:"current application's CIVector's vectorWithX:((random number) * imgWidth) Y:((random number) * imgHeight)",inputRadius0:"((random number) * imgWidth)",inputRadius1:"((random number) * imgWidth)"},{inputColor0:`current application's CIColor's colorWithRed:${r[4]/255} green:${t[4]/255} blue:${e[4]/255} alpha:${n[4]/255}`,inputColor1:`current application's CIColor's colorWithRed:${r[5]/255} green:${t[5]/255} blue:${e[5]/255} alpha:${n[5]/255}`,inputCenter:"current application's CIVector's vectorWithX:((random number) * imgWidth) Y:((random number) * imgHeight)",inputRadius0:"((random number) * imgWidth)",inputRadius1:"((random number) * imgWidth)"},{inputColor0:`current application's CIColor's colorWithRed:${r[6]/255} green:${t[6]/255} blue:${e[6]/255} alpha:${n[6]/255}`,inputColor1:`current application's CIColor's colorWithRed:${r[7]/255} green:${t[7]/255} blue:${e[7]/255} alpha:${n[7]/255}`,inputCenter:"current application's CIVector's vectorWithX:((random number) * imgWidth) Y:((random number) * imgHeight)",inputRadius0:"((random number) * imgWidth)",inputRadius1:"((random number) * imgWidth)"},{inputColor0:`current application's CIColor's colorWithRed:${r[8]/255} green:${t[8]/255} blue:${e[8]/255} alpha:${n[8]/255}`,inputColor1:`current application's CIColor's colorWithRed:${r[9]/255} green:${t[9]/255} blue:${e[9]/255} alpha:${n[9]/255}`,inputCenter:"current application's CIVector's vectorWithX:((random number) * imgWidth) Y:((random number) * imgHeight)",inputRadius0:"((random number) * imgWidth)",inputRadius1:"((random number) * imgWidth)"}],Q=(r,t,e,n)=>({inputColor:`current application's CIColor's colorWithRed:${r[0]/255} green:${t[0]/255} blue:${e[0]/255} alpha:${n[0]/255}`,inputCrossScale:"((random number) * 10)",inputCrossAngle:"((random number) * 90)",inputCrossOpacity:"((random number) * 9) - 8",inputCrossWidth:"((random number) * imgWidth / 5)",inputEpsilon:"((random number) * 1)",inputRadius:"((random number) * imgWidth / 10)",inputCenter:"current application's CIVector's vectorWithX:((random number) * imgWidth) Y:((random number) * imgHeight)"}),V=(r,t,e,n)=>({inputColor:`current application's CIColor's colorWithRed:${r[0]/255} green:${t[0]/255} blue:${e[0]/255} alpha:${n[0]/255}`,inputHaloRadius:"((random number) * imgWidth / 10)",inputHaloWidth:"((random number) * imgWidth / 10)",inputStriationStrength:"((random number) * 1)",inputStriationContrast:"((random number) * 5)",inputTime:"((random number) * 10)",inputCenter:"current application's CIVector's vectorWithX:((random number) * imgWidth) Y:((random number) * imgHeight)",inputHaloOverlap:"((random number) * 0.99)"}),ee=(r,t,e,n)=>({inputColor:`current application's CIColor's colorWithRed:${r[0]/255} green:${t[0]/255} blue:${e[0]/255} alpha:${n[0]/255}`,inputSunRadius:"((random number) * imgWidth / 10)",inputMaxStriationRadius:"((random number) * imgWidth / 10)",inputStriationStrength:"((random number) * 1)",inputStriationContrast:"((random number) * 5)",inputTime:"((random number) * 10)",inputCenter:"current application's CIVector's vectorWithX:((random number) * imgWidth) Y:((random number) * imgHeight)"});var x=w(require("fs")),k=w(require("os")),u=w(require("path")),h=require("@raycast/api");var R=require("@raycast/api");var te=async r=>{let t=Array.isArray(r)?r:[r];await $(`use framework "Foundation"
      use framework "PDFKit"
      use scripting additions
  
      set thePasteboard to current application's NSPasteboard's generalPasteboard()
      thePasteboard's clearContents()
      
      -- Handle PDFs separately
      set pdfPaths to {"${t.filter(e=>e.endsWith(".pdf")).join('", "')}"}
  
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
      set theFiles to {"${t.join('", "')}"}
    
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
      end if`)};var Ie=require("@raycast/api");var ne=async()=>{let t=(await h.LocalStorage.getItem("itemsToRemove")??"").toString().split(", ");for(let e of t)x.existsSync(e)&&await x.promises.rm(e,{recursive:!0});await h.LocalStorage.removeItem("itemsToRemove")};var ae=async r=>{let t="Finder";try{t=(await(0,h.getFrontmostApplication)()).name}catch(n){console.error(`Couldn't get frontmost application: : ${n}`)}let e=(0,h.getPreferenceValues)();e.imageResultHandling=="copyToClipboard"?(await te(r),re(r)):e.imageResultHandling=="openInPreview"?(await Ce(r),re(r)):e.inputMethod=="NeoFinder"||t=="NeoFinder"?await(0,h.showInFinder)(r[0]):(e.inputMethod=="HoudahSpot"||t=="HoudahSpot")&&await(0,h.showInFinder)(r[0])};var Ce=async r=>{let t=Array.isArray(r)?r:[r],e=t.some(n=>u.default.extname(n)==".svg");await $(`use framework "Foundation"
    use scripting additions
    set pageImages to {${t.map(n=>`current application's NSURL's fileURLWithPath:"${n}"`).join(", ")}}

    set workspace to current application's NSWorkspace's sharedWorkspace()
    set config to current application's NSWorkspaceOpenConfiguration's configuration()

    ${e?`tell application "Finder"
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
                repeat with thePath in {"${t.map(n=>encodeURI(`file://${n}`)).join('", "')}"}
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
                repeat with thePath in {"${t.join('", "')}"}
                  if thePath is not in doc then
                    set currentStatus to false
                  end if
                end repeat
              end repeat
              set finished to currentStatus
            end repeat
          end tell`}`)},re=r=>{let t=Array.isArray(r)?r:[r];for(let e of t)x.unlinkSync(e)},Pe=async()=>$(`use framework "Foundation"
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
    end if`),Re=async r=>{let t="Finder";try{t=await Pe()}catch(e){console.error(`Couldn't get frontmost application: ${e}`)}try{if(t=="Path Finder")return $(`tell application "Path Finder"
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
      end tell`)}catch(e){console.error(`Couldn't get current directory of Path Finder: ${e}`)}return $(`tell application "Finder"
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
  end tell`)},ie=async(r,t=!1,e=void 0)=>{let n=(0,h.getPreferenceValues)(),a=await Re(r[0]);return r.map(o=>{let i=o;if(n.imageResultHandling=="saveToDownloads"?i=u.default.join(k.homedir(),"Downloads",u.default.basename(i)):n.imageResultHandling=="saveToDesktop"?i=u.default.join(k.homedir(),"Desktop",u.default.basename(i)):(n.imageResultHandling=="saveInContainingFolder"||n.imageResultHandling=="replaceOriginal")&&(n.inputMethod=="Clipboard"||t)?i=u.default.join(a,u.default.basename(i)):(n.imageResultHandling=="copyToClipboard"||n.imageResultHandling=="openInPreview")&&(i=u.default.join(k.tmpdir(),u.default.basename(i))),i=e?i.replace(u.default.extname(i),`.${e}`):i,n.imageResultHandling!="replaceOriginal"&&k.tmpdir()!=u.default.dirname(i)){let p=2;for(;x.existsSync(i);)i=u.default.join(u.default.dirname(i),u.default.basename(i,u.default.extname(i))+`-${p}${u.default.extname(i)}`),p++}return i})};async function Fe({style:r,width:t,height:e,colors:n}){if(!r)throw new Error("Missing required parameter: style");if(!t)throw new Error("Missing required parameter: width");if(!e)throw new Error("Missing required parameter: height");if(!n)throw new Error("Missing required parameter: colors");let a=Object.values(_).find(c=>c.name===r);if(!a)throw new Error(`Invalid value for style: must be one of ${Object.keys(_).join(", ")}`);let o=parseInt(t.toString()),i=parseInt(e.toString());if(isNaN(o)||o<1)throw new Error("Invalid value for width: must be a positive integer");if(isNaN(i)||i<1)throw new Error("Invalid value for height: must be a positive integer");if(!Array.isArray(n))throw new Error("Invalid value for colors: must be an array of HEX color strings");if(n.filter(c=>c.match(/^([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/)).length!==n.length)throw new Error("Invalid value for colors: must be an array of HEX color strings");let s=n.map(c=>{let F=parseInt(c.substring(0,2),16),A=parseInt(c.substring(2,4),16),ce=parseInt(c.substring(4,6),16);return{red:F,green:A,blue:ce,alpha:255}});s.length===0&&s.push({red:0,green:0,blue:0,alpha:255});let l=s.map(c=>c.red),f=s.map(c=>c.green),m=s.map(c=>c.blue),g=s.map(c=>c.alpha),b=K(l,f,m,g,16)[0];switch(a.name){case"Constant Color":b=Y(l,f,m)[0];break;case"Lenticular Halo":b=V(l,f,m,g);break;case"Linear Gradient":b=Z(l,f,m,g)[0];break;case"Radial Gradient":b=q(l,f,m,g)[0];break;case"Random":b={};break;case"Star Shine":b=Q(l,f,m,g);break;case"Stripes":b=J(l,f,m,g,32)[0];break;case"Sunbeams":b=ee(l,f,m,g);break}let I=await ie([se.default.join(oe.default.tmpdir(),`${r.replaceAll(" ","_").toLowerCase()}.png`)],!0);try{await a.applyMethod(I[0],a.CIFilterName,o,i,b),await ae(I)}catch(c){throw new Error(`Failed To Create ${r}: ${c}`)}finally{ne()}return I}
