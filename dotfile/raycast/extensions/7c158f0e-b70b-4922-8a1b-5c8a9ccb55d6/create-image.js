"use strict";var ft=Object.create;var ue=Object.defineProperty;var mt=Object.getOwnPropertyDescriptor;var ht=Object.getOwnPropertyNames;var gt=Object.getPrototypeOf,bt=Object.prototype.hasOwnProperty;var $t=(r,t)=>{for(var e in t)ue(r,e,{get:t[e],enumerable:!0})},xe=(r,t,e,n)=>{if(t&&typeof t=="object"||typeof t=="function")for(let a of ht(t))!bt.call(r,a)&&a!==e&&ue(r,a,{get:()=>t[a],enumerable:!(n=mt(t,a))||n.enumerable});return r};var x=(r,t,e)=>(e=r!=null?ft(gt(r)):{},xe(t||!r||!r.__esModule?ue(e,"default",{value:r,enumerable:!0}):e,r)),yt=r=>xe(ue({},"__esModule",{value:!0}),r);var Et={};$t(Et,{default:()=>qe});module.exports=yt(Et);var k=require("@raycast/api"),fe=require("react");var Ke=x(require("os")),Je=x(require("path")),b=require("@raycast/api"),I=require("react");var z=x(require("react")),C=require("@raycast/api");var Fe=x(require("node:child_process")),Ee=require("node:buffer"),K=x(require("node:stream")),We=require("node:util");var De=require("react/jsx-runtime");var ye=globalThis;var pe=r=>!!r&&typeof r=="object"&&typeof r.removeListener=="function"&&typeof r.emit=="function"&&typeof r.reallyExit=="function"&&typeof r.listeners=="function"&&typeof r.kill=="function"&&typeof r.pid=="number"&&typeof r.on=="function",we=Symbol.for("signal-exit emitter"),ke=class{constructor(){if(this.emitted={afterExit:!1,exit:!1},this.listeners={afterExit:[],exit:[]},this.count=0,this.id=Math.random(),ye[we])return ye[we];Object.defineProperty(ye,we,{value:this,writable:!1,enumerable:!1,configurable:!1})}on(t,e){this.listeners[t].push(e)}removeListener(t,e){let n=this.listeners[t],a=n.indexOf(e);a!==-1&&(a===0&&n.length===1?n.length=0:n.splice(a,1))}emit(t,e,n){if(this.emitted[t])return!1;this.emitted[t]=!0;let a=!1;for(let u of this.listeners[t])a=u(e,n)===!0||a;return t==="exit"&&(a=this.emit("afterExit",e,n)||a),a}},Ce=class{onExit(){return()=>{}}load(){}unload(){}},Ie=class{#s;#t;#e;#i;#o;#a;#n;#r;constructor(t){this.#s=process.platform==="win32"?"SIGINT":"SIGHUP",this.#t=new ke,this.#a={},this.#n=!1,this.#r=[],this.#r.push("SIGHUP","SIGINT","SIGTERM"),globalThis.process.platform!=="win32"&&this.#r.push("SIGALRM","SIGABRT","SIGVTALRM","SIGXCPU","SIGXFSZ","SIGUSR2","SIGTRAP","SIGSYS","SIGQUIT","SIGIOT"),globalThis.process.platform==="linux"&&this.#r.push("SIGIO","SIGPOLL","SIGPWR","SIGSTKFLT"),this.#e=t,this.#a={};for(let e of this.#r)this.#a[e]=()=>{let n=this.#e.listeners(e),{count:a}=this.#t,u=t;if(typeof u.__signal_exit_emitter__=="object"&&typeof u.__signal_exit_emitter__.count=="number"&&(a+=u.__signal_exit_emitter__.count),n.length===a){this.unload();let i=this.#t.emit("exit",null,e),s=e==="SIGHUP"?this.#s:e;i||t.kill(t.pid,s)}};this.#o=t.reallyExit,this.#i=t.emit}onExit(t,e){if(!pe(this.#e))return()=>{};this.#n===!1&&this.load();let n=e?.alwaysLast?"afterExit":"exit";return this.#t.on(n,t),()=>{this.#t.removeListener(n,t),this.#t.listeners.exit.length===0&&this.#t.listeners.afterExit.length===0&&this.unload()}}load(){if(!this.#n){this.#n=!0,this.#t.count+=1;for(let t of this.#r)try{let e=this.#a[t];e&&this.#e.on(t,e)}catch{}this.#e.emit=(t,...e)=>this.#l(t,...e),this.#e.reallyExit=t=>this.#c(t)}}unload(){this.#n&&(this.#n=!1,this.#r.forEach(t=>{let e=this.#a[t];if(!e)throw new Error("Listener not defined for signal: "+t);try{this.#e.removeListener(t,e)}catch{}}),this.#e.emit=this.#i,this.#e.reallyExit=this.#o,this.#t.count-=1)}#c(t){return pe(this.#e)?(this.#e.exitCode=t||0,this.#t.emit("exit",this.#e.exitCode,null),this.#o.call(this.#e,this.#e.exitCode)):0}#l(t,...e){let n=this.#i;if(t==="exit"&&pe(this.#e)){typeof e[0]=="number"&&(this.#e.exitCode=e[0]);let a=n.call(this.#e,t,...e);return this.#t.emit("exit",this.#e.exitCode,null),a}else return n.call(this.#e,t,...e)}},Se=null,wt=(r,t)=>(Se||(Se=pe(process)?new Ie(process):new Ce),Se.onExit(r,t));function St(r,{timeout:t}={}){let e=new Promise((s,o)=>{r.on("exit",(w,O)=>{s({exitCode:w,signal:O,timedOut:!1})}),r.on("error",w=>{o(w)}),r.stdin&&r.stdin.on("error",w=>{o(w)})}),n=wt(()=>{r.kill()});if(t===0||t===void 0)return e.finally(()=>n());let a,u=new Promise((s,o)=>{a=setTimeout(()=>{r.kill("SIGTERM"),o(Object.assign(new Error("Timed out"),{timedOut:!0,signal:"SIGTERM"}))},t)}),i=e.finally(()=>{clearTimeout(a)});return Promise.race([u,i]).finally(()=>n())}var ve=class extends Error{constructor(){super("The output is too big"),this.name="MaxBufferError"}};function kt(r){let{encoding:t}=r,e=t==="buffer",n=new K.default.PassThrough({objectMode:!1});t&&t!=="buffer"&&n.setEncoding(t);let a=0,u=[];return n.on("data",i=>{u.push(i),a+=i.length}),n.getBufferedValue=()=>e?Buffer.concat(u,a):u.join(""),n.getBufferedLength=()=>a,n}async function Re(r,t){let e=kt(t);return await new Promise((n,a)=>{let u=i=>{i&&e.getBufferedLength()<=Ee.constants.MAX_LENGTH&&(i.bufferedData=e.getBufferedValue()),a(i)};(async()=>{try{await(0,We.promisify)(K.default.pipeline)(r,e),n()}catch(i){u(i)}})(),e.on("data",()=>{e.getBufferedLength()>8e7&&u(new ve)})}),e.getBufferedValue()}async function Ae(r,t){r.destroy();try{return await t}catch(e){return e.bufferedData}}async function Ct({stdout:r,stderr:t},{encoding:e},n){let a=Re(r,{encoding:e}),u=Re(t,{encoding:e});try{return await Promise.all([n,a,u])}catch(i){return Promise.all([{error:i,exitCode:null,signal:i.signal,timedOut:i.timedOut||!1},Ae(r,a),Ae(t,u)])}}function It(r){let t=typeof r=="string"?`
`:10,e=typeof r=="string"?"\r":13;return r[r.length-1]===t&&(r=r.slice(0,-1)),r[r.length-1]===e&&(r=r.slice(0,-1)),r}function Te(r,t){return r.stripFinalNewline?It(t):t}function vt({timedOut:r,timeout:t,signal:e,exitCode:n}){return r?`timed out after ${t} milliseconds`:e!=null?`was killed with ${e}`:n!=null?`failed with exit code ${n}`:"failed"}function Pt({stdout:r,stderr:t,error:e,signal:n,exitCode:a,command:u,timedOut:i,options:s,parentError:o}){let O=`Command ${vt({timedOut:i,timeout:s?.timeout,signal:n,exitCode:a})}: ${u}`,X=e?`${O}
${e.message}`:O,Q=[X,t,r].filter(Boolean).join(`
`);return e?e.originalMessage=e.message:e=o,e.message=Q,e.shortMessage=X,e.command=u,e.exitCode=a,e.signal=n,e.stdout=r,e.stderr=t,"bufferedData"in e&&delete e.bufferedData,e}function xt({stdout:r,stderr:t,error:e,exitCode:n,signal:a,timedOut:u,command:i,options:s,parentError:o}){if(e||n!==0||a!==null)throw Pt({error:e,exitCode:n,signal:a,stdout:r,stderr:t,command:i,timedOut:u,options:s,parentError:o});return r}async function E(r,t,e){if(process.platform!=="darwin")throw new Error("AppleScript is only supported on macOS");let{humanReadableOutput:n,language:a,timeout:u,...i}=Array.isArray(t)?e||{}:t||{},s=n!==!1?[]:["-ss"];a==="JavaScript"&&s.push("-l","JavaScript"),Array.isArray(t)&&s.push("-",...t);let o=Fe.default.spawn("osascript",s,{...i,env:{PATH:"/usr/local/bin:/usr/bin:/bin:/usr/sbin:/sbin"}}),w=St(o,{timeout:u??1e4});o.stdin.end(r);let[{error:O,exitCode:X,signal:Q,timedOut:me},he,ge]=await Ct(o,{encoding:"utf8"},w),V=Te({stripFinalNewline:!0},he),be=Te({stripFinalNewline:!0},ge);return xt({stdout:V,stderr:be,error:O,exitCode:X,signal:Q,timedOut:me,command:"osascript",options:e,parentError:new Error})}var j=[1024,512,256,128,100,64,50,32],ee=async(r,t,e)=>E(`use framework "Foundation"
        use framework "Quartz"
        
        set theCIImage to current application's CIImage's imageWithColor:(current application's CIColor's grayColor())
        set theBounds to current application's NSMakeRect(0, 0, ${r}, ${t})
        set croppedOutput to theCIImage's imageByCroppingToRect:theBounds
        
        -- Convert back to NSImage and save to file
        set theRep to current application's NSCIImageRep's imageRepWithCIImage:croppedOutput
        set theResult to current application's NSImage's alloc()'s initWithSize:(theRep's |size|())
        theResult's addRepresentation:theRep
        ${e==null?`set theTIFFData to theResult's TIFFRepresentation()
              set theBitmapImageRep to current application's NSBitmapImageRep's imageRepWithData:theTIFFData
              set theResultData to theBitmapImageRep's representationUsingType:(current application's NSPNGFileType) |properties|:(missing value)
              set theBase64String to theResultData's base64EncodedStringWithOptions:0
              return "data:image/png;base64," & theBase64String`:`saveImage(theResult, "${e}")
        
        on saveImage(imageToSave, destinationPath)
            -- Saves an NSImage to the supplied file path
            set theTIFFData to imageToSave's TIFFRepresentation()
            set theBitmapImageRep to current application's NSBitmapImageRep's imageRepWithData:theTIFFData
            set theResultData to theBitmapImageRep's representationUsingType:(current application's NSPNGFileType) |properties|:(missing value)
            theResultData's writeToFile:destinationPath atomically:false
        end saveImage`}`),N=async(r,t)=>E(`use framework "Foundation"
      use framework "Quartz"
      use scripting additions
      
      set filterName to "${r}"
      set theFilter to current application's CIFilter's filterWithName:filterName
      theFilter's setDefaults()

      set imgWidth to 256
      set imgHeight to 256
  
      set theCIImage to current application's CIImage's emptyImage()
      ${Object.entries(t).map(([e,n])=>`theFilter's setValue:(${n}) forKey:"${e}"`).join(`
`)}
      
      set theBounds to current application's NSMakeRect(0, 0, imgWidth, imgHeight)
      set uncroppedOutput to theFilter's valueForKey:(current application's kCIOutputImageKey)
      set croppedOutput to uncroppedOutput's imageByCroppingToRect:theBounds
      
      -- Convert back to NSImage and save to file
      set theRep to current application's NSCIImageRep's imageRepWithCIImage:croppedOutput
      set theResult to current application's NSImage's alloc()'s initWithSize:(theRep's |size|())
      theResult's addRepresentation:theRep

      -- Saves an NSImage to the supplied file path
      set theTIFFData to theResult's TIFFRepresentation()
      set theBitmapImageRep to current application's NSBitmapImageRep's imageRepWithData:theTIFFData
      set theResultData to theBitmapImageRep's representationUsingType:(current application's NSPNGFileType) |properties|:(missing value)
      set theBase64String to (theResultData's base64EncodedStringWithOptions:0) as text
      return "data:image/png;base64," & theBase64String
  `,{timeout:0}),M=async(r,t,e,n,a)=>E(`use framework "Foundation"
    use framework "Quartz"
    use scripting additions
    
    set filterName to "${t}"
    set theFilter to current application's CIFilter's filterWithName:filterName
    theFilter's setDefaults()

    set imgWidth to ${e}
    set imgHeight to ${n}

    set theCIImage to current application's CIImage's emptyImage()
    ${Object.entries(a).map(([u,i])=>`theFilter's setValue:(${i}) forKey:"${u}"`).join(`
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
    end saveImage`),c={Checkerboard:{applyMethod:M,CIFilterName:"CICheckerboardGenerator",name:"Checkerboard",thumbnail:"thumbnails/checkerboard.webp"},ConstantColor:{applyMethod:M,CIFilterName:"CIConstantColorGenerator",name:"Constant Color",thumbnail:"thumbnails/constant_color.webp"},LenticularHalo:{applyMethod:M,CIFilterName:"CILenticularHaloGenerator",name:"Lenticular Halo",thumbnail:"thumbnails/lenticular_halo.webp"},LinearGradient:{applyMethod:M,CIFilterName:"CILinearGradient",name:"Linear Gradient",thumbnail:"thumbnails/linear_gradient.webp"},RadialGradient:{applyMethod:M,CIFilterName:"CIRadialGradient",name:"Radial Gradient",thumbnail:"thumbnails/radial_gradient.webp"},Random:{applyMethod:M,CIFilterName:"CIRandomGenerator",name:"Random",thumbnail:"thumbnails/random.webp"},StarShine:{applyMethod:M,CIFilterName:"CIStarShineGenerator",name:"Star Shine",thumbnail:"thumbnails/star_shine.webp"},Stripes:{applyMethod:M,CIFilterName:"CIStripesGenerator",name:"Stripes",thumbnail:"thumbnails/stripes.webp"},Sunbeams:{applyMethod:M,CIFilterName:"CISunbeamsGenerator",name:"Sunbeams",thumbnail:"thumbnails/sunbeams.webp"}},Oe=(r,t,e,n,a)=>[{inputColor0:`current application's CIColor's colorWithRed:${r[0]/255} green:${t[0]/255} blue:${e[0]/255} alpha:${n[0]/255}`,inputColor1:`current application's CIColor's colorWithRed:${r[1]/255} green:${t[1]/255} blue:${e[1]/255} alpha:${n[1]/255}`,inputWidth:`imgWidth / ${a||4}`},{inputColor0:`current application's CIColor's colorWithRed:${r[2]/255} green:${t[2]/255} blue:${e[2]/255} alpha:${n[2]/255}`,inputColor1:`current application's CIColor's colorWithRed:${r[3]/255} green:${t[3]/255} blue:${e[3]/255} alpha:${n[3]/255}`,inputWidth:"imgWidth / 8"},{inputColor0:`current application's CIColor's colorWithRed:${r[4]/255} green:${t[4]/255} blue:${e[4]/255} alpha:${n[4]/255}`,inputColor1:`current application's CIColor's colorWithRed:${r[5]/255} green:${t[5]/255} blue:${e[5]/255} alpha:${n[5]/255}`,inputWidth:"imgWidth / 16"},{inputColor0:`current application's CIColor's colorWithRed:${r[6]/255} green:${t[6]/255} blue:${e[6]/255} alpha:${n[6]/255}`,inputColor1:`current application's CIColor's colorWithRed:${r[7]/255} green:${t[7]/255} blue:${e[7]/255} alpha:${n[7]/255}`,inputWidth:"imgWidth / 32"},{inputColor0:`current application's CIColor's colorWithRed:${r[8]/255} green:${t[8]/255} blue:${e[8]/255} alpha:${n[8]/255}`,inputColor1:`current application's CIColor's colorWithRed:${r[9]/255} green:${t[9]/255} blue:${e[9]/255} alpha:${n[9]/255}`,inputWidth:"imgWidth / 64"}],Ne=(r,t,e,n,a)=>[{inputColor0:`current application's CIColor's colorWithRed:${r[0]/255} green:${t[0]/255} blue:${e[0]/255} alpha:${n[0]/255}`,inputColor1:`current application's CIColor's colorWithRed:${r[1]/255} green:${t[1]/255} blue:${e[1]/255} alpha:${n[1]/255}`,inputWidth:`imgWidth / ${a||4}`},{inputColor0:`current application's CIColor's colorWithRed:${r[2]/255} green:${t[2]/255} blue:${e[2]/255} alpha:${n[2]/255}`,inputColor1:`current application's CIColor's colorWithRed:${r[3]/255} green:${t[3]/255} blue:${e[3]/255} alpha:${n[3]/255}`,inputWidth:"imgWidth / 8"},{inputColor0:`current application's CIColor's colorWithRed:${r[4]/255} green:${t[4]/255} blue:${e[4]/255} alpha:${n[4]/255}`,inputColor1:`current application's CIColor's colorWithRed:${r[5]/255} green:${t[5]/255} blue:${e[5]/255} alpha:${n[5]/255}`,inputWidth:"imgWidth / 16"},{inputColor0:`current application's CIColor's colorWithRed:${r[6]/255} green:${t[6]/255} blue:${e[6]/255} alpha:${n[6]/255}`,inputColor1:`current application's CIColor's colorWithRed:${r[7]/255} green:${t[7]/255} blue:${e[7]/255} alpha:${n[7]/255}`,inputWidth:"imgWidth / 32"},{inputColor0:`current application's CIColor's colorWithRed:${r[8]/255} green:${t[8]/255} blue:${e[8]/255} alpha:${n[8]/255}`,inputColor1:`current application's CIColor's colorWithRed:${r[9]/255} green:${t[9]/255} blue:${e[9]/255} alpha:${n[9]/255}`,inputWidth:"imgWidth / 64"}],Ue=(r,t,e)=>Array(10).fill(0).map((n,a)=>({inputColor:`current application's CIColor's colorWithRed:${r[a]/255} green:${t[a]/255} blue:${e[a]/255} alpha:1.0`})),Le=(r,t,e,n)=>[{inputColor0:`current application's CIColor's colorWithRed:${r[0]/255} green:${t[0]/255} blue:${e[0]/255} alpha:${n[0]/255}`,inputColor1:`current application's CIColor's colorWithRed:${r[1]/255} green:${t[1]/255} blue:${e[1]/255} alpha:${n[1]/255}`,inputPoint0:"current application's CIVector's vectorWithX:((random number) * imgWidth) Y:((random number) * imgHeight)",inputPoint1:"current application's CIVector's vectorWithX:((random number) * imgWidth) Y:((random number) * imgHeight)"},{inputColor0:`current application's CIColor's colorWithRed:${r[2]/255} green:${t[2]/255} blue:${e[2]/255} alpha:${n[2]/255}`,inputColor1:`current application's CIColor's colorWithRed:${r[3]/255} green:${t[3]/255} blue:${e[3]/255} alpha:${n[3]/255}`,inputPoint0:"current application's CIVector's vectorWithX:((random number) * imgWidth) Y:((random number) * imgHeight)",inputPoint1:"current application's CIVector's vectorWithX:((random number) * imgWidth) Y:((random number) * imgHeight)"},{inputColor0:`current application's CIColor's colorWithRed:${r[4]/255} green:${t[4]/255} blue:${e[4]/255} alpha:${n[4]/255}`,inputColor1:`current application's CIColor's colorWithRed:${r[5]/255} green:${t[5]/255} blue:${e[5]/255} alpha:${n[5]/255}`,inputPoint0:"current application's CIVector's vectorWithX:((random number) * imgWidth) Y:((random number) * imgHeight)",inputPoint1:"current application's CIVector's vectorWithX:((random number) * imgWidth) Y:((random number) * imgHeight)"},{inputColor0:`current application's CIColor's colorWithRed:${r[6]/255} green:${t[6]/255} blue:${e[6]/255} alpha:${n[6]/255}`,inputColor1:`current application's CIColor's colorWithRed:${r[7]/255} green:${t[7]/255} blue:${e[7]/255} alpha:${n[7]/255}`,inputPoint0:"current application's CIVector's vectorWithX:((random number) * imgWidth) Y:((random number) * imgHeight)",inputPoint1:"current application's CIVector's vectorWithX:((random number) * imgWidth) Y:((random number) * imgHeight)"},{inputColor0:`current application's CIColor's colorWithRed:${r[8]/255} green:${t[8]/255} blue:${e[8]/255} alpha:${n[8]/255}`,inputColor1:`current application's CIColor's colorWithRed:${r[9]/255} green:${t[9]/255} blue:${e[9]/255} alpha:${n[9]/255}`,inputPoint0:"current application's CIVector's vectorWithX:((random number) * imgWidth) Y:((random number) * imgHeight)",inputPoint1:"current application's CIVector's vectorWithX:((random number) * imgWidth) Y:((random number) * imgHeight)"}],_e=(r,t,e,n)=>[{inputColor0:`current application's CIColor's colorWithRed:${r[0]/255} green:${t[0]/255} blue:${e[0]/255} alpha:${n[0]/255}`,inputColor1:`current application's CIColor's colorWithRed:${r[1]/255} green:${t[1]/255} blue:${e[1]/255} alpha:${n[1]/255}`,inputCenter:"current application's CIVector's vectorWithX:((random number) * imgWidth) Y:((random number) * imgHeight)",inputRadius0:"((random number) * imgWidth)",inputRadius1:"((random number) * imgWidth)"},{inputColor0:`current application's CIColor's colorWithRed:${r[2]/255} green:${t[2]/255} blue:${e[2]/255} alpha:${n[2]/255}`,inputColor1:`current application's CIColor's colorWithRed:${r[3]/255} green:${t[3]/255} blue:${e[3]/255} alpha:${n[3]/255}`,inputCenter:"current application's CIVector's vectorWithX:((random number) * imgWidth) Y:((random number) * imgHeight)",inputRadius0:"((random number) * imgWidth)",inputRadius1:"((random number) * imgWidth)"},{inputColor0:`current application's CIColor's colorWithRed:${r[4]/255} green:${t[4]/255} blue:${e[4]/255} alpha:${n[4]/255}`,inputColor1:`current application's CIColor's colorWithRed:${r[5]/255} green:${t[5]/255} blue:${e[5]/255} alpha:${n[5]/255}`,inputCenter:"current application's CIVector's vectorWithX:((random number) * imgWidth) Y:((random number) * imgHeight)",inputRadius0:"((random number) * imgWidth)",inputRadius1:"((random number) * imgWidth)"},{inputColor0:`current application's CIColor's colorWithRed:${r[6]/255} green:${t[6]/255} blue:${e[6]/255} alpha:${n[6]/255}`,inputColor1:`current application's CIColor's colorWithRed:${r[7]/255} green:${t[7]/255} blue:${e[7]/255} alpha:${n[7]/255}`,inputCenter:"current application's CIVector's vectorWithX:((random number) * imgWidth) Y:((random number) * imgHeight)",inputRadius0:"((random number) * imgWidth)",inputRadius1:"((random number) * imgWidth)"},{inputColor0:`current application's CIColor's colorWithRed:${r[8]/255} green:${t[8]/255} blue:${e[8]/255} alpha:${n[8]/255}`,inputColor1:`current application's CIColor's colorWithRed:${r[9]/255} green:${t[9]/255} blue:${e[9]/255} alpha:${n[9]/255}`,inputCenter:"current application's CIVector's vectorWithX:((random number) * imgWidth) Y:((random number) * imgHeight)",inputRadius0:"((random number) * imgWidth)",inputRadius1:"((random number) * imgWidth)"}],Me=(r,t,e,n)=>({inputColor:`current application's CIColor's colorWithRed:${r[0]/255} green:${t[0]/255} blue:${e[0]/255} alpha:${n[0]/255}`,inputCrossScale:"((random number) * 10)",inputCrossAngle:"((random number) * 90)",inputCrossOpacity:"((random number) * 9) - 8",inputCrossWidth:"((random number) * imgWidth / 5)",inputEpsilon:"((random number) * 1)",inputRadius:"((random number) * imgWidth / 10)",inputCenter:"current application's CIVector's vectorWithX:((random number) * imgWidth) Y:((random number) * imgHeight)"}),je=(r,t,e,n)=>({inputColor:`current application's CIColor's colorWithRed:${r[0]/255} green:${t[0]/255} blue:${e[0]/255} alpha:${n[0]/255}`,inputHaloRadius:"((random number) * imgWidth / 10)",inputHaloWidth:"((random number) * imgWidth / 10)",inputStriationStrength:"((random number) * 1)",inputStriationContrast:"((random number) * 5)",inputTime:"((random number) * 10)",inputCenter:"current application's CIVector's vectorWithX:((random number) * imgWidth) Y:((random number) * imgHeight)",inputHaloOverlap:"((random number) * 0.99)"}),Ge=(r,t,e,n)=>({inputColor:`current application's CIColor's colorWithRed:${r[0]/255} green:${t[0]/255} blue:${e[0]/255} alpha:${n[0]/255}`,inputSunRadius:"((random number) * imgWidth / 10)",inputMaxStriationRadius:"((random number) * imgWidth / 10)",inputStriationStrength:"((random number) * 1)",inputStriationContrast:"((random number) * 5)",inputTime:"((random number) * 10)",inputCenter:"current application's CIVector's vectorWithX:((random number) * imgWidth) Y:((random number) * imgHeight)"});var B=x(require("fs")),H=x(require("os")),S=x(require("path")),$=require("@raycast/api");var de=require("@raycast/api");var ze=async r=>{let t=Array.isArray(r)?r:[r];await E(`use framework "Foundation"
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
      end if`)};var Rt=require("@raycast/api");var J=async()=>{let t=(await $.LocalStorage.getItem("itemsToRemove")??"").toString().split(", ");for(let e of t)B.existsSync(e)&&await B.promises.rm(e,{recursive:!0});await $.LocalStorage.removeItem("itemsToRemove")};var Y=async r=>{let t="Finder";try{t=(await(0,$.getFrontmostApplication)()).name}catch(n){console.error(`Couldn't get frontmost application: : ${n}`)}let e=(0,$.getPreferenceValues)();e.imageResultHandling=="copyToClipboard"?(await ze(r),He(r)):e.imageResultHandling=="openInPreview"?(await At(r),He(r)):e.inputMethod=="NeoFinder"||t=="NeoFinder"?await(0,$.showInFinder)(r[0]):(e.inputMethod=="HoudahSpot"||t=="HoudahSpot")&&await(0,$.showInFinder)(r[0])};var At=async r=>{let t=Array.isArray(r)?r:[r],e=t.some(n=>S.default.extname(n)==".svg");await E(`use framework "Foundation"
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
          end tell`}`)},He=r=>{let t=Array.isArray(r)?r:[r];for(let e of t)B.unlinkSync(e)},Tt=async()=>E(`use framework "Foundation"
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
    end if`),Ft=async r=>{let t="Finder";try{t=await Tt()}catch(e){console.error(`Couldn't get frontmost application: ${e}`)}try{if(t=="Path Finder")return E(`tell application "Path Finder"
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
      end tell`)}catch(e){console.error(`Couldn't get current directory of Path Finder: ${e}`)}return E(`tell application "Finder"
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
  end tell`)},Z=async(r,t=!1,e=void 0)=>{let n=(0,$.getPreferenceValues)(),a=await Ft(r[0]);return r.map(u=>{let i=u;if(n.imageResultHandling=="saveToDownloads"?i=S.default.join(H.homedir(),"Downloads",S.default.basename(i)):n.imageResultHandling=="saveToDesktop"?i=S.default.join(H.homedir(),"Desktop",S.default.basename(i)):(n.imageResultHandling=="saveInContainingFolder"||n.imageResultHandling=="replaceOriginal")&&(n.inputMethod=="Clipboard"||t)?i=S.default.join(a,S.default.basename(i)):(n.imageResultHandling=="copyToClipboard"||n.imageResultHandling=="openInPreview")&&(i=S.default.join(H.tmpdir(),S.default.basename(i))),i=e?i.replace(S.default.extname(i),`.${e}`):i,n.imageResultHandling!="replaceOriginal"&&H.tmpdir()!=S.default.dirname(i)){let s=2;for(;B.existsSync(i);)i=S.default.join(S.default.dirname(i),S.default.basename(i,S.default.extname(i))+`-${s}${S.default.extname(i)}`),s++}return i})},G=async(r,t,e,n)=>{console.error(t),e?(e.title=r,e.message=n??t.message,e.style=$.Toast.Style.Failure,e.primaryAction={title:"Copy Error",onAction:async()=>{await $.Clipboard.copy(t.message)}}):e=await(0,$.showToast)({title:r,message:n??t.message,style:$.Toast.Style.Failure,primaryAction:{title:"Copy Error",onAction:async()=>{await $.Clipboard.copy(t.message)}}})};var Be=x(require("os")),Xe=x(require("path")),y=require("@raycast/api");var R=require("@raycast/api"),te=require("react/jsx-runtime");function re(){return(0,te.jsxs)(R.ActionPanel.Section,{title:"Settings",children:[(0,te.jsx)(R.Action,{title:"Configure Command",icon:R.Icon.Gear,shortcut:{modifiers:["cmd","shift"],key:","},onAction:async()=>{await(0,R.openCommandPreferences)()}}),(0,te.jsx)(R.Action,{title:"Configure Extension",icon:R.Icon.Gear,shortcut:{modifiers:["opt","cmd"],key:","},onAction:async()=>{await(0,R.openExtensionPreferences)()}})]})}var W=require("react/jsx-runtime");function D(r){let{generator:t,width:e,height:n,preview:a,options:u,objectType:i,regeneratePreviews:s}=r;return(0,W.jsxs)(y.ActionPanel,{children:[(0,W.jsx)(y.Action,{title:`Create ${i}`,icon:y.Icon.Image,onAction:async()=>{let o=await Z([Xe.default.join(Be.default.tmpdir(),`${i.replaceAll(" ","_").toLowerCase()}.png`)],!0),w=await(0,y.showToast)({title:`Creating ${i}...`,style:y.Toast.Style.Animated});try{await t.applyMethod(o[0],t.CIFilterName,e,n,u),await Y(o),w.title=`Created ${i}`,w.style=y.Toast.Style.Success,(0,y.showInFinder)(o[0])}catch(O){await G(`Failed To Create ${i}`,O,w)}finally{J()}}}),(0,W.jsx)(y.Action,{title:"Randomize Colors",icon:y.Icon.Shuffle,shortcut:{modifiers:["cmd"],key:"r"},onAction:s}),(0,W.jsx)(y.Action.CreateQuicklink,{title:"Create Quicklink",shortcut:{modifiers:["cmd"],key:"l"},quicklink:{name:`Create ${e}x${n} ${i} Image`,link:`raycast://extensions/HelloImSteven/sips/create-image?context=${encodeURIComponent(JSON.stringify({imageWidth:e,imageHeight:n,imagePattern:{name:i,options:u}}))}`}}),(0,W.jsxs)(y.ActionPanel.Section,{title:"Clipboard Actions",children:[(0,W.jsx)(y.Action.Paste,{title:"Paste Preview in Active App",shortcut:{modifiers:["cmd","shift"],key:"v"},content:{html:`<img src="${a}" />`}}),(0,W.jsx)(y.Action.CopyToClipboard,{title:"Copy Preview Image",shortcut:{modifiers:["cmd","shift"],key:"c"},content:{html:`<img src="${a}" />`}}),(0,W.jsx)(y.Action.CopyToClipboard,{title:"Copy Preview Data URL",content:a,shortcut:{modifiers:["cmd","shift"],key:"u"}})]}),(0,W.jsx)(re,{})]})}var g=require("react/jsx-runtime");function ne(r){let{width:t,height:e,pattern:n}=r,[a,u]=(0,I.useState)(!0),[i,s]=(0,I.useState)(Array(5).fill(["",{}])),[o,w]=(0,I.useState)(Array(5).fill(["",{}])),[O,X]=(0,I.useState)(Array(10).fill(["","",{}])),[Q,me]=(0,I.useState)(Array(5).fill(["",{}])),[he,ge]=(0,I.useState)(Array(5).fill(["",{}])),[V,be]=(0,I.useState)(""),[ae,Qe]=(0,I.useState)(["",{}]),[ie,Ve]=(0,I.useState)(["",{}]),[oe,et]=(0,I.useState)(["",{}]),[se,tt]=(0,I.useState)(),U=(0,b.getPreferenceValues)(),rt=()=>{let l=Array(10).fill(0).map(()=>Math.floor(Math.random()*256)),m=Array(10).fill(0).map(()=>Math.floor(Math.random()*256)),p=Array(10).fill(0).map(()=>Math.floor(Math.random()*256)),P=Array(10).fill(0).map(()=>Math.floor(Math.random()*256));return tt(l.map((d,h)=>`#${d.toString(16).padEnd(2,"0")}${m[h].toString(16).padEnd(2,"0")}${p[h].toString(16).padEnd(2,"0")}`)),{redValues:l,greenValues:m,blueValues:p,alphaValues:P}},T=async()=>{u(!0);let{redValues:l,greenValues:m,blueValues:p,alphaValues:P}=rt();Promise.all([Promise.all(Oe(l,m,p,P).map(async(d,h)=>{let L=c.Checkerboard.thumbnail,_=h>0?L.replace(".",`${h+1}.`):L,F=U.generatePreviews?await N(c.Checkerboard.CIFilterName,d):_;s($e=>{let le=[...$e];return le[h]=[F,d],le})})),Promise.all(Ne(l,m,p,P).map(async(d,h)=>{let L=U.generatePreviews?await N(c.Stripes.CIFilterName,d):c.Stripes.thumbnail;w(_=>{let F=[..._];return F[h]=[L,d],F})})),Promise.all(Ue(l,m,p).map(async(d,h)=>{let _=`<svg width="100" height="100" xmlns="http://www.w3.org/2000/svg">
              <rect x="0" y="0" width="100" height="100" fill="${`#${l[h].toString(16).padEnd(2,"0")}${m[h].toString(16).padEnd(2,"0")}${p[h].toString(16).padEnd(2,"0")}`}" />
            </svg>`,$e=`data:image/svg+xml;base64,${Buffer.from(_).toString("base64")}`,le=U.generatePreviews?await N(c.ConstantColor.CIFilterName,d):$e;X(dt=>{let Pe=[...dt];return Pe[h]=[le,`#${l[h].toString(16).padEnd(2,"0")}${m[h].toString(16).padEnd(2,"0")}${p[h].toString(16).padEnd(2,"0")}`,d],Pe})})),Promise.all(Le(l,m,p,P).map(async(d,h)=>{let L=U.generatePreviews?await N(c.LinearGradient.CIFilterName,d):c.LinearGradient.thumbnail;me(_=>{let F=[..._];return F[h]=[L,d],F})})),Promise.all(_e(l,m,p,P).map(async(d,h)=>{let L=U.generatePreviews?await N(c.RadialGradient.CIFilterName,d):c.RadialGradient.thumbnail;ge(_=>{let F=[..._];return F[h]=[L,d],F})})),Promise.resolve((async()=>{let d=U.generatePreviews?await N(c.Random.CIFilterName,{}):c.Random.thumbnail;be(d)})()),Promise.resolve((async()=>{let d=Me(l,m,p,P),h=U.generatePreviews?await N(c.StarShine.CIFilterName,d):c.StarShine.thumbnail;Qe([h,d])})()),Promise.resolve((async()=>{let d=je(l,m,p,P),h=U.generatePreviews?await N(c.LenticularHalo.CIFilterName,d):c.LenticularHalo.thumbnail;Ve([h,d])})()),Promise.resolve((async()=>{let d=Ge(l,m,p,P),h=U.generatePreviews?await N(c.Sunbeams.CIFilterName,d):c.Sunbeams.thumbnail;et([h,d])})())]).then(()=>u(!1))},nt=i.map(([l,m],p)=>(0,g.jsx)(b.Grid.Item,{title:`Checkerboard ${p+1}`,content:{source:l==""?c.Checkerboard.thumbnail:l,tintColor:se?.[p]},actions:(0,g.jsx)(D,{objectType:"Checkerboard",generator:c.Checkerboard,width:t,height:e,preview:l,options:m,regeneratePreviews:T})},`Checkerboard ${p+1}`)),at=o.map(([l,m],p)=>(0,g.jsx)(b.Grid.Item,{title:`Stripes ${p+1}`,content:{source:l==""?c.Stripes.thumbnail:l,tintColor:se?.[p]},actions:(0,g.jsx)(D,{objectType:"Stripes",generator:c.Stripes,width:t,height:e,preview:l,options:m,regeneratePreviews:T})},`Stripes ${p+1}`)),it=O.map(([l,m,p],P)=>(0,g.jsx)(b.Grid.Item,{title:m,content:{source:l==""?c.Checkerboard.thumbnail:l},actions:(0,g.jsx)(D,{objectType:m,generator:c.ConstantColor,width:t,height:e,preview:l,options:p,regeneratePreviews:T})},`Solid Color ${P+1}`)),ot=Q.map(([l,m],p)=>(0,g.jsx)(b.Grid.Item,{title:`Linear Gradient ${p+1}`,content:{source:l==""?c.LinearGradient.thumbnail:l,tintColor:se?.[p]},actions:(0,g.jsx)(D,{objectType:"Linear Gradient",generator:c.LinearGradient,width:t,height:e,preview:l,options:m,regeneratePreviews:T})},`Linear Gradient ${p+1}`)),st=he.map(([l,m],p)=>(0,g.jsx)(b.Grid.Item,{title:`Radial Gradient ${p+1}`,content:{source:l==""?c.RadialGradient.thumbnail:l,tintColor:se?.[p]},actions:(0,g.jsx)(D,{objectType:"Radial Gradient",generator:c.RadialGradient,width:t,height:e,preview:l,options:m,regeneratePreviews:T})},`Radial Gradient ${p+1}`)),ct=(0,g.jsx)(b.Grid.Item,{title:"Random",content:{source:V==""?c.Random.thumbnail:V},actions:(0,g.jsx)(D,{objectType:"Random",generator:c.Random,width:t,height:e,preview:V,options:{},regeneratePreviews:T})},"Random"),lt=(0,g.jsx)(b.Grid.Item,{title:"Star Shine",content:{source:ae[0]==""?c.StarShine.thumbnail:ae[0]},actions:(0,g.jsx)(D,{objectType:"Star Shine",generator:c.StarShine,width:t,height:e,preview:ae[0],options:ae[1],regeneratePreviews:T})},"Star Shine"),ut=(0,g.jsx)(b.Grid.Item,{title:"Lenticular Halo",content:{source:ie[0]==""?c.LenticularHalo.thumbnail:ie[0]},actions:(0,g.jsx)(D,{objectType:"Lenticular Halo",generator:c.LenticularHalo,width:t,height:e,preview:ie[0],options:ie[1],regeneratePreviews:T})},"Lenticular Halo"),pt=(0,g.jsx)(b.Grid.Item,{title:"Sunbeams",content:{source:oe[0]==""?c.Sunbeams.thumbnail:oe[0]},actions:(0,g.jsx)(D,{objectType:"Sunbeams",generator:c.Sunbeams,width:t,height:e,preview:oe[0],options:oe[1],regeneratePreviews:T})},"Sunbeams"),ce=(0,I.useRef)(!1);return(0,I.useEffect)(()=>{if(n&&!ce.current){ce.current=!0;let l=c.Checkerboard,m=n.options;n.name==="Stripes"?l=c.Stripes:n.name.startsWith("#")?l=c.ConstantColor:n.name==="Linear Gradient"?l=c.LinearGradient:n.name==="Radial Gradient"?l=c.RadialGradient:n.name==="Random"?l=c.Random:n.name==="Star Shine"?l=c.StarShine:n.name==="Lenticular Halo"?l=c.LenticularHalo:n.name==="Sunbeams"&&(l=c.Sunbeams),Promise.resolve(Z([Je.default.join(Ke.default.tmpdir(),`${n.name.replaceAll(" ","_").toLowerCase()}.png`)],!0)).then(async p=>{let P=await(0,b.showToast)({title:`Creating ${n.name}...`,style:b.Toast.Style.Animated});try{await l.applyMethod(p[0],l.CIFilterName,t,e,m),await Y(p),P.title=`Created ${n.name}`,P.style=b.Toast.Style.Success,(0,b.showInFinder)(p[0])}catch(d){await G(`Failed To Create ${n.name}`,d,P)}finally{J()}T()})}else!n&&!ce.current&&(ce.current=!0,T())},[n]),(0,g.jsxs)(b.Grid,{navigationTitle:"Image Pattern Options",isLoading:a,inset:b.Grid.Inset.Small,children:[(0,g.jsxs)(b.Grid.Section,{title:"Patterns",children:[nt,at]}),(0,g.jsx)(b.Grid.Section,{title:"Solid Colors",children:it}),(0,g.jsxs)(b.Grid.Section,{title:"Gradients",children:[ot,st]}),(0,g.jsxs)(b.Grid.Section,{title:"Other",children:[ut,ct,lt,pt]})]})}var Ye=x(require("os")),Ze=x(require("path")),f=require("@raycast/api");var A=require("react/jsx-runtime");function q(r){let{width:t,height:e}=r;return(0,A.jsxs)(f.ActionPanel,{children:[(0,A.jsx)(f.Action.Push,{title:`Select Size ${t}x${e}`,icon:f.Icon.Center,target:(0,A.jsx)(ne,{width:t,height:e})}),(0,A.jsx)(f.Action,{title:`Create ${t}x${e} Placeholder`,icon:f.Icon.Image,onAction:async()=>{let n=await Z([Ze.default.join(Ye.default.tmpdir(),`${t}x${e}.png`)],!0),a=await(0,f.showToast)({title:"Creating Placeholder...",style:f.Toast.Style.Animated});try{await ee(t,e,n[0]),await Y(n),a.title="Created Placeholder",a.style=f.Toast.Style.Success}catch(u){await G("Failed To Create Placeholder",u,a)}finally{J()}}}),(0,A.jsx)(f.Action.CreateQuicklink,{title:"Create Quicklink",shortcut:{modifiers:["cmd"],key:"l"},quicklink:{name:`Create ${t}x${e} Image`,link:`raycast://extensions/HelloImSteven/sips/create-image?context=${encodeURIComponent(JSON.stringify({imageWidth:t,imageHeight:e}))}`}}),(0,A.jsxs)(f.ActionPanel.Section,{title:"Clipboard Actions",children:[(0,A.jsx)(f.Action,{title:"Paste Placeholder in Active App",icon:f.Icon.Clipboard,shortcut:{modifiers:["cmd","shift"],key:"v"},onAction:async()=>{let n=await ee(t,e);await f.Clipboard.paste({html:`<img src="${n}" />`}),await(0,f.showHUD)("Pasted Placeholder Image")}}),(0,A.jsx)(f.Action,{title:"Copy Placeholder Image",icon:f.Icon.Clipboard,shortcut:{modifiers:["cmd","shift"],key:"c"},onAction:async()=>{let n=await ee(t,e);await f.Clipboard.copy({html:`<img src="${n}" />`}),await(0,f.showHUD)("Copied Placeholder Image")}}),(0,A.jsx)(f.Action,{title:"Copy Placeholder Data URL",icon:f.Icon.Clipboard,shortcut:{modifiers:["cmd","shift"],key:"u"},onAction:async()=>{let n=await ee(t,e);await f.Clipboard.copy(n),await(0,f.showHUD)("Copied Placeholder Data URL")}})]}),(0,A.jsx)(re,{})]})}var v=require("react/jsx-runtime");function qe(r){let t=(0,fe.useRef)(!1),{push:e}=(0,k.useNavigation)();(0,fe.useEffect)(()=>{if(r.launchContext&&!t.current){t.current=!0;let{imageWidth:s,imageHeight:o,imagePattern:w}=r.launchContext;e((0,v.jsx)(ne,{width:s,height:o,pattern:w}))}},[r.launchContext]);let n=j.map(s=>j.filter(o=>s==o).map(o=>(0,v.jsx)(k.Grid.Item,{title:`${s}x${o}`,content:{source:`thumbnails/${s}x${o}.webp`},actions:(0,v.jsx)(q,{width:s,height:o})},`${s}x${o}`))),a=j.map(s=>j.filter(o=>s/o>4/3&&s/o<15/3).map(o=>(0,v.jsx)(k.Grid.Item,{title:`${s}x${o}`,content:{source:`thumbnails/${s}x${o}.webp`,tintColor:k.Color.Red},actions:(0,v.jsx)(q,{width:s,height:o})},`${s}x${o}`))),u=j.map(s=>j.filter(o=>o/s>4/3&&o/s<15/3).map(o=>(0,v.jsx)(k.Grid.Item,{title:`${s}x${o}`,content:{source:`thumbnails/${s}x${o}.webp`,tintColor:k.Color.Green},actions:(0,v.jsx)(q,{width:s,height:o})},`${s}x${o}`))),i=j.map(s=>j.filter(o=>o/s>15/3||s/o>15/3).map(o=>(0,v.jsx)(k.Grid.Item,{title:`${s}x${o}`,content:{source:`thumbnails/${s}x${o}.webp`,tintColor:k.Color.Blue},actions:(0,v.jsx)(q,{width:s,height:o})},`${s}x${o}`)));return(0,v.jsxs)(k.Grid,{navigationTitle:"Image Size Options",searchBarPlaceholder:"Search image sizes...",inset:k.Grid.Inset.Small,isLoading:!1,children:[(0,v.jsx)(k.Grid.Section,{title:"Square",children:n}),(0,v.jsx)(k.Grid.Section,{title:"Wide",children:a}),(0,v.jsx)(k.Grid.Section,{title:"Tall",children:u}),(0,v.jsx)(k.Grid.Section,{title:"Extreme",children:i})]})}
