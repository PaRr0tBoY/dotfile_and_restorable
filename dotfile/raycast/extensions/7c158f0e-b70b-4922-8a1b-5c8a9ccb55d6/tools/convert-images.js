"use strict";var rt=Object.create;var Z=Object.defineProperty;var at=Object.getOwnPropertyDescriptor;var nt=Object.getOwnPropertyNames;var st=Object.getPrototypeOf,it=Object.prototype.hasOwnProperty;var $e=(r,e)=>(e=Symbol[r])?e:Symbol.for("Symbol."+r),ye=r=>{throw TypeError(r)};var ot=(r,e)=>{for(var t in e)Z(r,t,{get:e[t],enumerable:!0})},we=(r,e,t,a)=>{if(e&&typeof e=="object"||typeof e=="function")for(let s of nt(e))!it.call(r,s)&&s!==t&&Z(r,s,{get:()=>e[s],enumerable:!(a=at(e,s))||a.enumerable});return r};var C=(r,e,t)=>(t=r!=null?rt(st(r)):{},we(e||!r||!r.__esModule?Z(t,"default",{value:r,enumerable:!0}):t,r)),ct=r=>we(Z({},"__esModule",{value:!0}),r);var D=(r,e,t)=>{if(e!=null){typeof e!="object"&&typeof e!="function"&&ye("Object expected");var a,s;t&&(a=e[$e("asyncDispose")]),a===void 0&&(a=e[$e("dispose")],t&&(s=a)),typeof a!="function"&&ye("Object not disposable"),s&&(a=function(){try{s.call(this)}catch(i){return Promise.reject(i)}}),r.push([t,a,e])}else t&&r.push([t]);return e},U=(r,e,t)=>{var a=typeof SuppressedError=="function"?SuppressedError:function(n,c,d,l){return l=Error(d),l.name="SuppressedError",l.error=n,l.suppressed=c,l},s=n=>e=t?new a(n,e,"An error was suppressed during disposal"):(t=!0,n),i=n=>{for(;n=r.pop();)try{var c=n[1]&&n[1].call(n[2]);if(n[0])return Promise.resolve(c).then(i,d=>(s(d),i()))}catch(d){s(d)}if(t)throw e};return i()};var xt={};ot(xt,{default:()=>St});module.exports=ct(xt);var m=require("child_process"),te=require("fs"),x=C(require("path")),O=require("@raycast/api");var B=require("child_process"),k=require("@raycast/api");var G=require("child_process"),y=C(require("fs")),A=C(require("os")),b=C(require("path")),o=require("@raycast/api");var _=C(require("react")),w=require("@raycast/api");var Pe=C(require("node:child_process")),ve=require("node:buffer"),V=C(require("node:stream")),Ie=require("node:util");var Ae=require("react/jsx-runtime");var ae=globalThis;var q=r=>!!r&&typeof r=="object"&&typeof r.removeListener=="function"&&typeof r.emit=="function"&&typeof r.reallyExit=="function"&&typeof r.listeners=="function"&&typeof r.kill=="function"&&typeof r.pid=="number"&&typeof r.on=="function",ne=Symbol.for("signal-exit emitter"),ie=class{constructor(){if(this.emitted={afterExit:!1,exit:!1},this.listeners={afterExit:[],exit:[]},this.count=0,this.id=Math.random(),ae[ne])return ae[ne];Object.defineProperty(ae,ne,{value:this,writable:!1,enumerable:!1,configurable:!1})}on(e,t){this.listeners[e].push(t)}removeListener(e,t){let a=this.listeners[e],s=a.indexOf(t);s!==-1&&(s===0&&a.length===1?a.length=0:a.splice(s,1))}emit(e,t,a){if(this.emitted[e])return!1;this.emitted[e]=!0;let s=!1;for(let i of this.listeners[e])s=i(t,a)===!0||s;return e==="exit"&&(s=this.emit("afterExit",t,a)||s),s}},oe=class{onExit(){return()=>{}}load(){}unload(){}},ce=class{#o;#t;#e;#s;#i;#n;#a;#r;constructor(e){this.#o=process.platform==="win32"?"SIGINT":"SIGHUP",this.#t=new ie,this.#n={},this.#a=!1,this.#r=[],this.#r.push("SIGHUP","SIGINT","SIGTERM"),globalThis.process.platform!=="win32"&&this.#r.push("SIGALRM","SIGABRT","SIGVTALRM","SIGXCPU","SIGXFSZ","SIGUSR2","SIGTRAP","SIGSYS","SIGQUIT","SIGIOT"),globalThis.process.platform==="linux"&&this.#r.push("SIGIO","SIGPOLL","SIGPWR","SIGSTKFLT"),this.#e=e,this.#n={};for(let t of this.#r)this.#n[t]=()=>{let a=this.#e.listeners(t),{count:s}=this.#t,i=e;if(typeof i.__signal_exit_emitter__=="object"&&typeof i.__signal_exit_emitter__.count=="number"&&(s+=i.__signal_exit_emitter__.count),a.length===s){this.unload();let n=this.#t.emit("exit",null,t),c=t==="SIGHUP"?this.#o:t;n||e.kill(e.pid,c)}};this.#i=e.reallyExit,this.#s=e.emit}onExit(e,t){if(!q(this.#e))return()=>{};this.#a===!1&&this.load();let a=t?.alwaysLast?"afterExit":"exit";return this.#t.on(a,e),()=>{this.#t.removeListener(a,e),this.#t.listeners.exit.length===0&&this.#t.listeners.afterExit.length===0&&this.unload()}}load(){if(!this.#a){this.#a=!0,this.#t.count+=1;for(let e of this.#r)try{let t=this.#n[e];t&&this.#e.on(e,t)}catch{}this.#e.emit=(e,...t)=>this.#l(e,...t),this.#e.reallyExit=e=>this.#c(e)}}unload(){this.#a&&(this.#a=!1,this.#r.forEach(e=>{let t=this.#n[e];if(!t)throw new Error("Listener not defined for signal: "+e);try{this.#e.removeListener(e,t)}catch{}}),this.#e.emit=this.#s,this.#e.reallyExit=this.#i,this.#t.count-=1)}#c(e){return q(this.#e)?(this.#e.exitCode=e||0,this.#t.emit("exit",this.#e.exitCode,null),this.#i.call(this.#e,this.#e.exitCode)):0}#l(e,...t){let a=this.#s;if(e==="exit"&&q(this.#e)){typeof t[0]=="number"&&(this.#e.exitCode=t[0]);let s=a.call(this.#e,e,...t);return this.#t.emit("exit",this.#e.exitCode,null),s}else return a.call(this.#e,e,...t)}},se=null,lt=(r,e)=>(se||(se=q(process)?new ce(process):new oe),se.onExit(r,e));function ut(r,{timeout:e}={}){let t=new Promise((c,d)=>{r.on("exit",(l,E)=>{c({exitCode:l,signal:E,timedOut:!1})}),r.on("error",l=>{d(l)}),r.stdin&&r.stdin.on("error",l=>{d(l)})}),a=lt(()=>{r.kill()});if(e===0||e===void 0)return t.finally(()=>a());let s,i=new Promise((c,d)=>{s=setTimeout(()=>{r.kill("SIGTERM"),d(Object.assign(new Error("Timed out"),{timedOut:!0,signal:"SIGTERM"}))},e)}),n=t.finally(()=>{clearTimeout(s)});return Promise.race([i,n]).finally(()=>a())}var le=class extends Error{constructor(){super("The output is too big"),this.name="MaxBufferError"}};function ft(r){let{encoding:e}=r,t=e==="buffer",a=new V.default.PassThrough({objectMode:!1});e&&e!=="buffer"&&a.setEncoding(e);let s=0,i=[];return a.on("data",n=>{i.push(n),s+=n.length}),a.getBufferedValue=()=>t?Buffer.concat(i,s):i.join(""),a.getBufferedLength=()=>s,a}async function ke(r,e){let t=ft(e);return await new Promise((a,s)=>{let i=n=>{n&&t.getBufferedLength()<=ve.constants.MAX_LENGTH&&(n.bufferedData=t.getBufferedValue()),s(n)};(async()=>{try{await(0,Ie.promisify)(V.default.pipeline)(r,t),a()}catch(n){i(n)}})(),t.on("data",()=>{t.getBufferedLength()>8e7&&i(new le)})}),t.getBufferedValue()}async function Se(r,e){r.destroy();try{return await e}catch(t){return t.bufferedData}}async function dt({stdout:r,stderr:e},{encoding:t},a){let s=ke(r,{encoding:t}),i=ke(e,{encoding:t});try{return await Promise.all([a,s,i])}catch(n){return Promise.all([{error:n,exitCode:null,signal:n.signal,timedOut:n.timedOut||!1},Se(r,s),Se(e,i)])}}function pt(r){let e=typeof r=="string"?`
`:10,t=typeof r=="string"?"\r":13;return r[r.length-1]===e&&(r=r.slice(0,-1)),r[r.length-1]===t&&(r=r.slice(0,-1)),r}function xe(r,e){return r.stripFinalNewline?pt(e):e}function ht({timedOut:r,timeout:e,signal:t,exitCode:a}){return r?`timed out after ${e} milliseconds`:t!=null?`was killed with ${t}`:a!=null?`failed with exit code ${a}`:"failed"}function mt({stdout:r,stderr:e,error:t,signal:a,exitCode:s,command:i,timedOut:n,options:c,parentError:d}){let E=`Command ${ht({timedOut:n,timeout:c?.timeout,signal:a,exitCode:s})}: ${i}`,u=t?`${E}
${t.message}`:E,F=[u,e,r].filter(Boolean).join(`
`);return t?t.originalMessage=t.message:t=d,t.message=F,t.shortMessage=u,t.command=i,t.exitCode=s,t.signal=a,t.stdout=r,t.stderr=e,"bufferedData"in t&&delete t.bufferedData,t}function gt({stdout:r,stderr:e,error:t,exitCode:a,signal:s,timedOut:i,command:n,options:c,parentError:d}){if(t||a!==0||s!==null)throw mt({error:t,exitCode:a,signal:s,stdout:r,stderr:e,command:n,timedOut:i,options:c,parentError:d});return r}async function I(r,e,t){if(process.platform!=="darwin")throw new Error("AppleScript is only supported on macOS");let{humanReadableOutput:a,language:s,timeout:i,...n}=Array.isArray(e)?t||{}:e||{},c=a!==!1?[]:["-ss"];s==="JavaScript"&&c.push("-l","JavaScript"),Array.isArray(e)&&c.push("-",...e);let d=Pe.default.spawn("osascript",c,{...n,env:{PATH:"/usr/local/bin:/usr/bin:/bin:/usr/sbin:/sbin"}}),l=ut(d,{timeout:i??1e4});d.stdin.end(r);let[{error:E,exitCode:u,signal:F,timedOut:H},R,T]=await dt(d,{encoding:"utf8"},l),K=xe({stripFinalNewline:!0},R),X=xe({stripFinalNewline:!0},T);return gt({stdout:K,stderr:X,error:E,exitCode:u,signal:F,timedOut:H,command:"osascript",options:t,parentError:new Error})}var Ee=async()=>I(`use framework "AppKit"
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
      
      return filePaths`),Fe=async r=>{let e=Array.isArray(r)?r:[r];await I(`use framework "Foundation"
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
      end if`)};var L=C(require("path"));var Q=require("child_process");function N(r,e){let t=e?.command,a=e?.language,s=[...e?.leadingArgs?.map(u=>u.toString())||[]],i=e?.trailingArgs||[];!t&&(a===void 0||a==="AppleScript"||a==="JXA")&&(t="/usr/bin/osascript",s.push("-l",a==="JXA"?"JavaScript":"AppleScript",...r.startsWith("/")?[]:["-e"],r,...i.map(u=>u.toString())));let n=process.env;if(e?.command&&(n.PATH=`${n.PATH}:${(0,Q.execSync)(`$(/bin/bash -lc 'echo $SHELL') -lc 'echo "$PATH"'`).toString()}`,t=e.command,s.push(r,...i.map(u=>u.toString()))),!t)throw new Error("No command specified.");let c="",d=u=>{console.log(u)},l=(0,Q.spawn)(t,s,{env:n});return e?.logDebugMessages&&console.log(`Running shell command "${t} ${s.join(" ")}"`),l.stdout?.on("data",u=>{c+=u.toString(),e?.logIntermediateOutput&&console.log(`Data from script: ${c}`)}),l.stderr?.on("data",u=>{e?.stderrCallback&&e.stderrCallback(u.toString()),e?.logErrors&&console.error(u.toString())}),l.stdin.on("error",u=>{e?.logErrors&&console.error(`Error writing to stdin: ${u}`)}),d=async u=>{u?.length>0&&(l.stdin.cork(),l.stdin.write(`${u}\r
`),process.nextTick(()=>l.stdin.uncork()),e?.logSentMessages&&console.log(`Sent message: ${u}`))},{data:(async()=>new Promise((u,F)=>{let H=e?.timeout?setTimeout(()=>{try{l.kill()}catch(R){e?.logErrors&&console.error(`Error killing process: ${R}`)}return e?.logErrors&&console.error("Script timed out"),l.stdin.end(),l.kill(),F("Script timed out")},e?.timeout):void 0;l.on("close",R=>{if(R!==0)return e?.logErrors&&console.error(`Script exited with code ${R}`),l.stdin.end(),l.kill(),F(`Script exited with code ${R}`);clearTimeout(H);let T;try{T=JSON.parse(c)}catch{T=c.trim()}return e?.logFinalOutput&&console.log(`Script output: ${T}`),u(T)})}))(),sendMessage:d}}var W=require("@raycast/api");async function Re(){let r=L.default.join(W.environment.assetsPath,"scripts","finder.scpt"),e=await N(r,{language:"AppleScript",stderrCallback:t=>P("Finder Selection Error",new Error(t))}).data;return Array.isArray(e)?e:e.split(",").map(t=>t.trim())}async function Te(){let r=L.default.join(W.environment.assetsPath,"scripts","houdahSpot.scpt"),e=await N(r,{language:"AppleScript",stderrCallback:t=>P("HoudahSpot Selection Error",new Error(t))}).data;return Array.isArray(e)?e:e.split(",").map(t=>t.trim())}async function Ce(){let r=L.default.join(W.environment.assetsPath,"scripts","neofinder.scpt"),e=await N(r,{language:"AppleScript",stderrCallback:t=>P("NeoFinder Selection Error",new Error(t))}).data;return Array.isArray(e)?e:e.split(",").map(t=>t.trim())}async function De(){let r=L.default.join(W.environment.assetsPath,"scripts","pathfinder.scpt"),e=await N(r,{language:"JXA",stderrCallback:t=>P("Path Finder Selection Error",new Error(t))}).data;return Array.isArray(e)?e:e.split(",").map(t=>t.trim())}async function Ue(){let r=L.default.join(W.environment.assetsPath,"scripts","qspace.scpt"),e=await N(r,{language:"JXA",stderrCallback:t=>P("QSpace Pro Selection Error",new Error(t))}).data;return Array.isArray(e)?e:e.split(",").map(t=>t.trim())}async function Oe(){let r=L.default.join(W.environment.assetsPath,"scripts","forklift-beta.scpt"),e=await N(r,{language:"JXA",stderrCallback:t=>P("ForkLift Selection Error",new Error(t))}).data;return Array.isArray(e)?e:e.split(",").map(t=>t.trim())}var Y=async r=>{let e=await o.LocalStorage.getItem("itemsToRemove")??"";await o.LocalStorage.setItem("itemsToRemove",e+", "+r)},M=async(r,e)=>{let t=b.default.join(A.tmpdir(),`${r}.${e}`);return{path:t,[Symbol.asyncDispose]:async()=>{y.existsSync(t)&&await y.promises.rm(t,{recursive:!0})}}};var Ne=async()=>{let e=(await o.LocalStorage.getItem("itemsToRemove")??"").toString().split(", ");for(let t of e)y.existsSync(t)&&await y.promises.rm(t,{recursive:!0});await o.LocalStorage.removeItem("itemsToRemove")},Le=async()=>{let r=[],t=(0,o.getPreferenceValues)().inputMethod,a=!1;if(t=="Clipboard")try{let n=(await Ee()).split(", ");if(await o.LocalStorage.setItem("itemsToRemove",n.join(", ")),n.filter(c=>c.trim().length>0).length>0)return n}catch(n){console.error(`Couldn't get images from clipboard: ${n}`),a=!0}let s=t;try{s=(await(0,o.getFrontmostApplication)()).name}catch(n){console.error(`Couldn't get frontmost application: ${n}`)}try{(t=="Path Finder"||s=="Path Finder")&&(r=await De())}catch(n){console.error(`Couldn't get images from Path Finder: ${n}`),a=!0}try{(t=="NeoFinder"||s=="NeoFinder")&&(r=await Ce())}catch(n){console.error(`Couldn't get images from NeoFinder: ${n}`),a=!0}try{(t=="HoudahSpot"||s=="HoudahSpot")&&(r=await Te())}catch(n){console.error(`Couldn't get images from HoudahSpot: ${n}`),a=!0}try{(t=="QSpace Pro"||s=="QSpace Pro")&&(r=await Ue())}catch(n){console.error(`Couldn't get images from QSpace Pro: ${n}`),a=!0}try{(t=="ForkLift"||s=="ForkLift")&&(r=await Oe())}catch(n){console.error(`Couldn't get images from ForkLift: ${n}`),a=!0}if(r.length>0)return r.filter((n,c)=>r.indexOf(n)===c);let i=await Re();return s=="Finder"||t=="Finder"||a?r=i:i.forEach(n=>{n.split("/").at(-2)=="Desktop"&&!r.includes(n)&&r.push(n)}),r.filter((n,c)=>r.indexOf(n)===c)},We=async r=>{let e="Finder";try{e=(await(0,o.getFrontmostApplication)()).name}catch(a){console.error(`Couldn't get frontmost application: : ${a}`)}let t=(0,o.getPreferenceValues)();t.imageResultHandling=="copyToClipboard"?(await Fe(r),_e(r)):t.imageResultHandling=="openInPreview"?(await bt(r),_e(r)):t.inputMethod=="NeoFinder"||e=="NeoFinder"?await(0,o.showInFinder)(r[0]):(t.inputMethod=="HoudahSpot"||e=="HoudahSpot")&&await(0,o.showInFinder)(r[0])},ee=async()=>(A.cpus()[0].model.includes("Apple")?"arm":"x86")=="arm"?((0,G.execSync)(`chmod +x ${o.environment.assetsPath}/webp/arm/dwebp`),(0,G.execSync)(`chmod +x ${o.environment.assetsPath}/webp/arm/cwebp`),y.existsSync(`${o.environment.assetsPath}/webp/x86/dwebp`)&&await y.promises.rm(`${o.environment.assetsPath}/webp/x86/dwebp`),y.existsSync(`${o.environment.assetsPath}/webp/x86/cwebp`)&&await y.promises.rm(`${o.environment.assetsPath}/webp/x86/cwebp`),[`${o.environment.assetsPath}/webp/arm/dwebp`,`${o.environment.assetsPath}/webp/arm/cwebp`]):((0,G.execSync)(`chmod +x ${o.environment.assetsPath}/webp/x86/dwebp`),(0,G.execSync)(`chmod +x ${o.environment.assetsPath}/webp/x86/cwebp`),y.existsSync(`${o.environment.assetsPath}/webp/arm/dwebp`)&&await y.promises.rm(`${o.environment.assetsPath}/webp/arm/dwebp`),y.existsSync(`${o.environment.assetsPath}/webp/arm/cwebp`)&&await y.promises.rm(`${o.environment.assetsPath}/webp/arm/cwebp`),[`${o.environment.assetsPath}/webp/x86/dwebp`,`${o.environment.assetsPath}/webp/x86/cwebp`]);var ue=async(r,e,t)=>I(`use framework "Foundation"
  use scripting additions

  -- Load SVG image from file
  set svgFilePath to "${e}"
  set svgData to current application's NSData's alloc()'s initWithContentsOfFile:svgFilePath
  
  -- Create image from SVG data
  set svgImage to current application's NSImage's alloc()'s initWithData:svgData
  
  -- Convert image to PNG data
  set tiffData to svgImage's TIFFRepresentation()
  set theBitmap to current application's NSBitmapImageRep's alloc()'s initWithData:tiffData

  try
    set pngData to theBitmap's representationUsingType:(current application's NSBitmapImageFileType${r}) |properties|:(missing value)
  on error
    set pngData to theBitmap's representationUsingType:(current application's NSBitmapImageFileTypePNG) |properties|:(missing value)
  end
  
  -- Save PNG data to file
  pngData's writeToFile:"${t}" atomically:false`),J=async(r,e,t)=>{let a=(0,o.getPreferenceValues)(),s="NSPNGFileType";return r=="JPEG"?s="NSJPEGFileType":r=="TIFF"&&(s="NSTIFFFileType"),I(`use framework "Foundation"
  use framework "PDFKit"
  
  -- Load the PDF file as NSData
  set pdfData to current application's NSData's dataWithContentsOfFile:"${e}"
  
  -- Create a PDFDocument from the PDF data
  set pdfDoc to current application's PDFDocument's alloc()'s initWithData:pdfData

  ${a.imageResultHandling=="copyToClipboard"||a.imageResultHandling=="openInPreview"?"set pageImages to current application's NSMutableArray's alloc()'s init()":""}
  
  set pageCount to (pdfDoc's pageCount()) - 1
  repeat with pageIndex from 0 to pageCount
    -- Create an NSImage from each page of the PDF document
    set pdfPage to (pdfDoc's pageAtIndex:pageIndex)
    set pdfRect to (pdfPage's boundsForBox:(current application's kPDFDisplayBoxMediaBox))
    set pdfImage to (current application's NSImage's alloc()'s initWithSize:{item 1 of item 2 of pdfRect, item 2 of item 2 of pdfRect})
    pdfImage's lockFocus()
    (pdfPage's drawWithBox:(current application's kPDFDisplayBoxMediaBox))
    pdfImage's unlockFocus()

    ${a.imageResultHandling=="copyToClipboard"?"pageImages's addObject:pdfImage":`
  
    -- Convert the NSImage to PNG data
    set pngData to pdfImage's TIFFRepresentation()
    set pngRep to (current application's NSBitmapImageRep's imageRepWithData:pngData)
    set pngData to (pngRep's representationUsingType:(current application's ${s}) |properties|:(missing value))
    
    -- Write the PNG data to a new file
    set filePath to "${t}/page-" & pageIndex + 1 & ".${r.toLowerCase()}"
    set fileURL to current application's NSURL's fileURLWithPath:filePath
    ${a.imageResultHandling=="openInPreview"?"pageImages's addObject:fileURL":""}
    pngData's writeToURL:fileURL atomically:false`}
  end repeat

  ${a.imageResultHandling=="openInPreview"?`
    -- Open the images of each page in Preview, then delete their temporary files
    tell application "Finder"
      set previewPath to POSIX path of ((application file id "com.apple.Preview") as text)
      set previewURL to current application's NSURL's fileURLWithPath:previewPath
    end tell

    set workspace to current application's NSWorkspace's sharedWorkspace()
    set config to current application's NSWorkspaceOpenConfiguration's configuration()
    workspace's openURLs:pageImages withApplicationAtURL:previewURL configuration:config completionHandler:(missing value)
    delay 1
    
    set fileManager to current application's NSFileManager's defaultManager()
    repeat with imageURL in pageImages
      fileManager's removeItemAtURL:imageURL |error|:(missing value)
    end repeat
    `:""}
  
  ${a.imageResultHandling=="copyToClipboard"?`
    -- Copy the image of each page to the clipboard
    set thePasteboard to current application's NSPasteboard's generalPasteboard()
    thePasteboard's clearContents()
    thePasteboard's writeObjects:pageImages`:""}`,{timeout:60*1e3*5})};var bt=async r=>{let e=Array.isArray(r)?r:[r],t=e.some(a=>b.default.extname(a)==".svg");await I(`use framework "Foundation"
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
          end tell`}`)},_e=r=>{let e=Array.isArray(r)?r:[r];for(let t of e)y.unlinkSync(t)},$t=async()=>I(`use framework "Foundation"
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
    end if`),yt=async r=>{let e="Finder";try{e=await $t()}catch(t){console.error(`Couldn't get frontmost application: ${t}`)}try{if(e=="Path Finder")return I(`tell application "Path Finder"
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
      end tell`)}catch(t){console.error(`Couldn't get current directory of Path Finder: ${t}`)}return I(`tell application "Finder"
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
  end tell`)},Me=async(r,e=!1,t=void 0)=>{let a=(0,o.getPreferenceValues)(),s=await yt(r[0]);return r.map(i=>{let n=i;if(a.imageResultHandling=="saveToDownloads"?n=b.default.join(A.homedir(),"Downloads",b.default.basename(n)):a.imageResultHandling=="saveToDesktop"?n=b.default.join(A.homedir(),"Desktop",b.default.basename(n)):(a.imageResultHandling=="saveInContainingFolder"||a.imageResultHandling=="replaceOriginal")&&(a.inputMethod=="Clipboard"||e)?n=b.default.join(s,b.default.basename(n)):(a.imageResultHandling=="copyToClipboard"||a.imageResultHandling=="openInPreview")&&(n=b.default.join(A.tmpdir(),b.default.basename(n))),n=t?n.replace(b.default.extname(n),`.${t}`):n,a.imageResultHandling!="replaceOriginal"&&A.tmpdir()!=b.default.dirname(n)){let c=2;for(;y.existsSync(n);)n=b.default.join(b.default.dirname(n),b.default.basename(n,b.default.extname(n))+`-${c}${b.default.extname(n)}`),c++}return n})},P=async(r,e,t,a)=>{console.error(e),t?(t.title=r,t.message=a??e.message,t.style=o.Toast.Style.Failure,t.primaryAction={title:"Copy Error",onAction:async()=>{await o.Clipboard.copy(e.message)}}):t=await(0,o.showToast)({title:r,message:a??e.message,style:o.Toast.Style.Failure,primaryAction:{title:"Copy Error",onAction:async()=>{await o.Clipboard.copy(e.message)}}})};var je=r=>{let e=A.homedir();if(r.startsWith("~"))return r.replace(/^~(?=$|\/|\\)/,e);let t=/(\/Users\/.*?)\/.*/,a=r.match(t);return a?r.replace(a[1],e):r};var Ve=require("fs");async function wt(){let r="";try{r=(0,B.execSync)(`/bin/zsh -lc 'realpath "$(which brew)"'`).toString().trim()}catch(e){console.error(e)}if(r==="")return await(0,k.showToast)({title:"Homebrew is required to install the AVIF encoder.",message:"Please install Homebrew and try again. Visit https://brew.sh for more information. Once Homebrew is installed, run the command `brew install libavif` to install the AVIF encoder manually (Otherwise, this command will be run automatically).",style:k.Toast.Style.Failure}),!1;if(await(0,k.confirmAlert)({title:"Install AVIF Encoder",message:"The libavif Homebrew formula is required to convert images to/from AVIF format. Would you like to install it now?",primaryAction:{title:"Install"}})){let e=await(0,k.showToast)({title:"Installing AVIF Encoder...",style:k.Toast.Style.Animated});try{if((0,B.execSync)(`/bin/zsh -ilc '${r} install --quiet libavif || true'`),!kt())throw new Error("The avifenc binary has not been added to the user's $PATH");return e.title="AVIF Encoder installed successfully!",e.style=k.Toast.Style.Success,!0}catch(t){console.error(t),P("Failed to install AVIF Encoder.",t,e,"If you previously attempted to install libavif or avifenc, please run `brew doctor` followed by `brew cleanup` and try again.")}}return await(0,k.showToast)({title:"AVIF Encoder not installed.",style:k.Toast.Style.Failure}),!1}async function kt(){let t=!1,a=0;for(;!t&&a<7;){let s=(0,B.execSync)("/bin/zsh -lc 'command -v avifenc'").toString().trim();if((0,Ve.existsSync)(s)){t=!0;break}await new Promise(i=>setTimeout(i,1e3)),a++}return t}async function z(){let r=await k.LocalStorage.getItem("avifEncoderPath"),e=await k.LocalStorage.getItem("avifDecoderPath");if(!r||!e)try{r=(0,B.execSync)(`/bin/zsh -lc 'realpath "$(which avifenc)"'`).toString().trim(),e=(0,B.execSync)(`/bin/zsh -lc 'realpath "$(which avifdec)"'`).toString().trim()}catch(t){if(await wt())try{return await z()}catch(a){console.error(a),P("AVIF Encoder not found.",a,void 0,"Please install the libavif Homebrew formula manually and try again.")}else P("AVIF Encoder not found.",t,void 0,"Please install the libavif Homebrew formula and try again.")}return{encoderPath:r,decoderPath:e}}async function j(r,e,t,a=!1){let s=(0,O.getPreferenceValues)();O.environment.commandName==="tools/convert-images"&&(s.jpegExtension="jpg");let i=[],n=r.map(re=>je(re));for(let[re,$]of n.entries()){let v=x.default.extname($).slice(1),tt=e==="JPEG"?s.jpegExtension:e.toLowerCase(),h=t?.[re]||(await Me([$],!1,tt))[0];if(e==="WEBP"&&v.toLowerCase()!=="svg"){let[,p]=await ee();if(v.toLowerCase()=="avif"){var c=[];try{let{decoderPath:f}=await z();let S=D(c,await M("tmp","png"),!0);(0,m.execSync)(`${f} '${$}' '${S.path}'`);(0,m.execSync)(`${p} ${s.useLosslessConversion?"-lossless":""} '${S.path}' -o '${h}'`)}catch(d){var l=d,E=!0}finally{var u=U(c,l,E);u&&await u}}else if(v.toLowerCase()=="pdf"){let f=x.default.join(h.split("/").slice(0,-1).join("/"),x.default.basename(h,".webp")+" WebP");(0,m.execSync)(`mkdir -p '${f}'`),await J("PNG",$,f);let S=(0,te.readdirSync)(f).map(g=>x.default.join(f,g));for(let g of S)(0,m.execSync)(`${p} ${s.useLosslessConversion?"-lossless":""} '${g}' -o '${g.replace(".png",".webp")}'`),await Y(g)}else(0,m.execSync)(`${p} ${s.useLosslessConversion?"-lossless":""} '${$}' -o '${h}'`)}else if(v.toLowerCase()=="svg")if(["AVIF","PDF","WEBP"].includes(e)){var F=[];try{let p=D(F,await M("tmp","png"),!0);await ue("PNG",$,p.path);return await j([p.path],e,[h])}catch(H){var R=H,T=!0}finally{var K=U(F,R,T);K&&await K}}else return await ue(e,$,h),await j([h],e,[h]);else if(e=="SVG"){var de=[];try{let p=D(de,await M("tmp","bmp"),!0);(0,m.execSync)(`chmod +x ${O.environment.assetsPath}/potrace/potrace`);if(v.toLowerCase()=="webp"){var X=[];try{let f=D(X,await M("tmp","png"),!0);let[S]=await ee();(0,m.execSync)(`${S} '${$}' -o '${f.path}'`);(0,m.execSync)(`sips --setProperty format "bmp" '${f.path}' --out '${p.path}' && ${O.environment.assetsPath}/potrace/potrace -s --tight -o '${h}' '${p.path}'`)}catch(ze){var Be=ze,He=!0}finally{var fe=U(X,Be,He);fe&&await fe}}else if(v.toLowerCase()=="pdf"){let f=x.default.join(h.split("/").slice(0,-1).join("/"),x.default.basename(h,".svg")+" SVG");(0,m.execSync)(`mkdir -p '${f}'`),await J("PNG",$,f);let S=(0,te.readdirSync)(f).map(g=>x.default.join(f,g));for(let g of S)(0,m.execSync)(`sips --setProperty format "bmp" '${g}' --out '${p.path}' && ${O.environment.assetsPath}/potrace/potrace -s --tight -o '${g.replace(".png",".svg")}' '${p.path}'`),await Y(g)}else(0,m.execSync)(`sips --setProperty format "bmp" '${$}' --out '${p.path}' && ${O.environment.assetsPath}/potrace/potrace -s --tight -o '${h}' '${p.path}'`)}catch(Ge){var Je=Ge,Ke=!0}finally{var pe=U(de,Je,Ke);pe&&await pe}}else if(e=="AVIF"){let{encoderPath:p}=await z();if(v.toLowerCase()=="pdf"){let f=x.default.join(h.split("/").slice(0,-1).join("/"),x.default.basename(h,".avif")+" AVIF");(0,m.execSync)(`mkdir -p '${f}'`),await J("PNG",$,f);let S=(0,te.readdirSync)(f).map(g=>x.default.join(f,g)).filter(g=>g.endsWith(".png"));for(let g of S)(0,m.execSync)(`${p} ${s.useLosslessConversion?"-s 0 --min 0 --max 0 --minalpha 0 --maxalpha 0 --qcolor 100 --qalpha 100 ":""}'${g}' '${g.replace(".png",".avif")}'`),await Y(g)}else{var he=[];try{let f=D(he,await M("tmp","png"),!0);await j([$],"PNG",[f.path],!0);(0,m.execSync)(`${p} ${s.useLosslessConversion?"-s 0 --min 0 --max 0 --minalpha 0 --maxalpha 0 --qcolor 100 --qalpha 100 ":""}'${f.path}' '${h}'`)}catch(Xe){var Ze=Xe,qe=!0}finally{var me=U(he,Ze,qe);me&&await me}}}else if(v.toLowerCase()=="webp"){let[p]=await ee();(0,m.execSync)(`${p} '${$}' -o '${h}'`),(0,m.execSync)(`sips --setProperty format ${e.toLowerCase()} '${h}'`)}else if(v.toLowerCase()=="pdf"){let p=x.default.basename($),f=`${p?.substring(0,p.lastIndexOf("."))} ${e}`,S=x.default.join(h.split("/").slice(0,-1).join("/"),f);(0,m.execSync)(`mkdir -p '${S}'`),await J(e,$,S)}else if(v.toLowerCase()=="avif"){var ge=[];try{let{decoderPath:p}=await z();let f=D(ge,await M("tmp","png"),!0);(0,m.execSync)(`${p} '${$}' '${f.path}'`);return await j([f.path],e,[h])}catch(Qe){var Ye=Qe,et=!0}finally{var be=U(ge,Ye,et);be&&await be}}else(0,m.execSync)(`sips --setProperty format ${e.toLowerCase()} '${$}' --out '${h}'`);i.push(h)}return a||await We(i),i}async function St({format:r,imagePaths:e}){let t=e?.length?e:await Le(),a=await j(t,r);return await Ne(),a}
