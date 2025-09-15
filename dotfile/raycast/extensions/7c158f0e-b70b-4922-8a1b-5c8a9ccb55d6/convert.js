"use strict";var dt=Object.create;var te=Object.defineProperty;var pt=Object.getOwnPropertyDescriptor;var ht=Object.getOwnPropertyNames;var mt=Object.getPrototypeOf,gt=Object.prototype.hasOwnProperty;var Ie=(r,e)=>(e=Symbol[r])?e:Symbol.for("Symbol."+r),Ae=r=>{throw TypeError(r)};var bt=(r,e)=>{for(var t in e)te(r,t,{get:e[t],enumerable:!0})},Ee=(r,e,t,a)=>{if(e&&typeof e=="object"||typeof e=="function")for(let s of ht(e))!gt.call(r,s)&&s!==t&&te(r,s,{get:()=>e[s],enumerable:!(a=pt(e,s))||a.enumerable});return r};var O=(r,e,t)=>(t=r!=null?dt(mt(r)):{},Ee(e||!r||!r.__esModule?te(t,"default",{value:r,enumerable:!0}):t,r)),$t=r=>Ee(te({},"__esModule",{value:!0}),r);var N=(r,e,t)=>{if(e!=null){typeof e!="object"&&typeof e!="function"&&Ae("Object expected");var a,s;t&&(a=e[Ie("asyncDispose")]),a===void 0&&(a=e[Ie("dispose")],t&&(s=a)),typeof a!="function"&&Ae("Object not disposable"),s&&(a=function(){try{s.call(this)}catch(i){return Promise.reject(i)}}),r.push([t,a,e])}else t&&r.push([t]);return e},_=(r,e,t)=>{var a=typeof SuppressedError=="function"?SuppressedError:function(n,c,d,l){return l=Error(d),l.name="SuppressedError",l.error=n,l.suppressed=c,l},s=n=>e=t?new a(n,e,"An error was suppressed during disposal"):(t=!0,n),i=n=>{for(;n=r.pop();)try{var c=n[1]&&n[1].call(n[2]);if(n[0])return Promise.resolve(c).then(i,d=>(s(d),i()))}catch(d){s(d)}if(t)throw e};return i()};var Tt={};bt(Tt,{default:()=>Qe});module.exports=$t(Tt);var $=require("@raycast/api"),qe=require("react");var I=require("@raycast/api"),Z=require("react/jsx-runtime");function le(){return(0,Z.jsxs)(I.ActionPanel.Section,{title:"Settings",children:[(0,Z.jsx)(I.Action,{title:"Configure Command",icon:I.Icon.Gear,shortcut:{modifiers:["cmd","shift"],key:","},onAction:async()=>{await(0,I.openCommandPreferences)()}}),(0,Z.jsx)(I.Action,{title:"Configure Extension",icon:I.Icon.Gear,shortcut:{modifiers:["opt","cmd"],key:","},onAction:async()=>{await(0,I.openExtensionPreferences)()}})]})}var m=require("child_process"),ie=require("fs"),v=O(require("path")),L=require("@raycast/api");var K=require("child_process"),S=require("@raycast/api");var q=require("child_process"),w=O(require("fs")),C=O(require("os")),b=O(require("path")),o=require("@raycast/api");var W=O(require("react")),k=require("@raycast/api");var Te=O(require("node:child_process")),De=require("node:buffer"),G=O(require("node:stream")),Ue=require("node:util");var Oe=require("react/jsx-runtime");var ue=globalThis;var re=r=>!!r&&typeof r=="object"&&typeof r.removeListener=="function"&&typeof r.emit=="function"&&typeof r.reallyExit=="function"&&typeof r.listeners=="function"&&typeof r.kill=="function"&&typeof r.pid=="number"&&typeof r.on=="function",fe=Symbol.for("signal-exit emitter"),pe=class{constructor(){if(this.emitted={afterExit:!1,exit:!1},this.listeners={afterExit:[],exit:[]},this.count=0,this.id=Math.random(),ue[fe])return ue[fe];Object.defineProperty(ue,fe,{value:this,writable:!1,enumerable:!1,configurable:!1})}on(e,t){this.listeners[e].push(t)}removeListener(e,t){let a=this.listeners[e],s=a.indexOf(t);s!==-1&&(s===0&&a.length===1?a.length=0:a.splice(s,1))}emit(e,t,a){if(this.emitted[e])return!1;this.emitted[e]=!0;let s=!1;for(let i of this.listeners[e])s=i(t,a)===!0||s;return e==="exit"&&(s=this.emit("afterExit",t,a)||s),s}},he=class{onExit(){return()=>{}}load(){}unload(){}},me=class{#o;#t;#e;#s;#i;#n;#a;#r;constructor(e){this.#o=process.platform==="win32"?"SIGINT":"SIGHUP",this.#t=new pe,this.#n={},this.#a=!1,this.#r=[],this.#r.push("SIGHUP","SIGINT","SIGTERM"),globalThis.process.platform!=="win32"&&this.#r.push("SIGALRM","SIGABRT","SIGVTALRM","SIGXCPU","SIGXFSZ","SIGUSR2","SIGTRAP","SIGSYS","SIGQUIT","SIGIOT"),globalThis.process.platform==="linux"&&this.#r.push("SIGIO","SIGPOLL","SIGPWR","SIGSTKFLT"),this.#e=e,this.#n={};for(let t of this.#r)this.#n[t]=()=>{let a=this.#e.listeners(t),{count:s}=this.#t,i=e;if(typeof i.__signal_exit_emitter__=="object"&&typeof i.__signal_exit_emitter__.count=="number"&&(s+=i.__signal_exit_emitter__.count),a.length===s){this.unload();let n=this.#t.emit("exit",null,t),c=t==="SIGHUP"?this.#o:t;n||e.kill(e.pid,c)}};this.#i=e.reallyExit,this.#s=e.emit}onExit(e,t){if(!re(this.#e))return()=>{};this.#a===!1&&this.load();let a=t?.alwaysLast?"afterExit":"exit";return this.#t.on(a,e),()=>{this.#t.removeListener(a,e),this.#t.listeners.exit.length===0&&this.#t.listeners.afterExit.length===0&&this.unload()}}load(){if(!this.#a){this.#a=!0,this.#t.count+=1;for(let e of this.#r)try{let t=this.#n[e];t&&this.#e.on(e,t)}catch{}this.#e.emit=(e,...t)=>this.#l(e,...t),this.#e.reallyExit=e=>this.#c(e)}}unload(){this.#a&&(this.#a=!1,this.#r.forEach(e=>{let t=this.#n[e];if(!t)throw new Error("Listener not defined for signal: "+e);try{this.#e.removeListener(e,t)}catch{}}),this.#e.emit=this.#s,this.#e.reallyExit=this.#i,this.#t.count-=1)}#c(e){return re(this.#e)?(this.#e.exitCode=e||0,this.#t.emit("exit",this.#e.exitCode,null),this.#i.call(this.#e,this.#e.exitCode)):0}#l(e,...t){let a=this.#s;if(e==="exit"&&re(this.#e)){typeof t[0]=="number"&&(this.#e.exitCode=t[0]);let s=a.call(this.#e,e,...t);return this.#t.emit("exit",this.#e.exitCode,null),s}else return a.call(this.#e,e,...t)}},de=null,yt=(r,e)=>(de||(de=re(process)?new me(process):new he),de.onExit(r,e));function wt(r,{timeout:e}={}){let t=new Promise((c,d)=>{r.on("exit",(l,R)=>{c({exitCode:l,signal:R,timedOut:!1})}),r.on("error",l=>{d(l)}),r.stdin&&r.stdin.on("error",l=>{d(l)})}),a=yt(()=>{r.kill()});if(e===0||e===void 0)return t.finally(()=>a());let s,i=new Promise((c,d)=>{s=setTimeout(()=>{r.kill("SIGTERM"),d(Object.assign(new Error("Timed out"),{timedOut:!0,signal:"SIGTERM"}))},e)}),n=t.finally(()=>{clearTimeout(s)});return Promise.race([i,n]).finally(()=>a())}var ge=class extends Error{constructor(){super("The output is too big"),this.name="MaxBufferError"}};function kt(r){let{encoding:e}=r,t=e==="buffer",a=new G.default.PassThrough({objectMode:!1});e&&e!=="buffer"&&a.setEncoding(e);let s=0,i=[];return a.on("data",n=>{i.push(n),s+=n.length}),a.getBufferedValue=()=>t?Buffer.concat(i,s):i.join(""),a.getBufferedLength=()=>s,a}async function Fe(r,e){let t=kt(e);return await new Promise((a,s)=>{let i=n=>{n&&t.getBufferedLength()<=De.constants.MAX_LENGTH&&(n.bufferedData=t.getBufferedValue()),s(n)};(async()=>{try{await(0,Ue.promisify)(G.default.pipeline)(r,t),a()}catch(n){i(n)}})(),t.on("data",()=>{t.getBufferedLength()>8e7&&i(new ge)})}),t.getBufferedValue()}async function Ce(r,e){r.destroy();try{return await e}catch(t){return t.bufferedData}}async function St({stdout:r,stderr:e},{encoding:t},a){let s=Fe(r,{encoding:t}),i=Fe(e,{encoding:t});try{return await Promise.all([a,s,i])}catch(n){return Promise.all([{error:n,exitCode:null,signal:n.signal,timedOut:n.timedOut||!1},Ce(r,s),Ce(e,i)])}}function xt(r){let e=typeof r=="string"?`
`:10,t=typeof r=="string"?"\r":13;return r[r.length-1]===e&&(r=r.slice(0,-1)),r[r.length-1]===t&&(r=r.slice(0,-1)),r}function Re(r,e){return r.stripFinalNewline?xt(e):e}function Pt({timedOut:r,timeout:e,signal:t,exitCode:a}){return r?`timed out after ${e} milliseconds`:t!=null?`was killed with ${t}`:a!=null?`failed with exit code ${a}`:"failed"}function vt({stdout:r,stderr:e,error:t,signal:a,exitCode:s,command:i,timedOut:n,options:c,parentError:d}){let R=`Command ${Pt({timedOut:n,timeout:c?.timeout,signal:a,exitCode:s})}: ${i}`,u=t?`${R}
${t.message}`:R,T=[u,e,r].filter(Boolean).join(`
`);return t?t.originalMessage=t.message:t=d,t.message=T,t.shortMessage=u,t.command=i,t.exitCode=s,t.signal=a,t.stdout=r,t.stderr=e,"bufferedData"in t&&delete t.bufferedData,t}function It({stdout:r,stderr:e,error:t,exitCode:a,signal:s,timedOut:i,command:n,options:c,parentError:d}){if(t||a!==0||s!==null)throw vt({error:t,exitCode:a,signal:s,stdout:r,stderr:e,command:n,timedOut:i,options:c,parentError:d});return r}async function F(r,e,t){if(process.platform!=="darwin")throw new Error("AppleScript is only supported on macOS");let{humanReadableOutput:a,language:s,timeout:i,...n}=Array.isArray(e)?t||{}:e||{},c=a!==!1?[]:["-ss"];s==="JavaScript"&&c.push("-l","JavaScript"),Array.isArray(e)&&c.push("-",...e);let d=Te.default.spawn("osascript",c,{...n,env:{PATH:"/usr/local/bin:/usr/bin:/bin:/usr/sbin:/sbin"}}),l=wt(d,{timeout:i??1e4});d.stdin.end(r);let[{error:R,exitCode:u,signal:T,timedOut:X},D,U]=await St(d,{encoding:"utf8"},l),Y=Re({stripFinalNewline:!0},D),ee=Re({stripFinalNewline:!0},U);return It({stdout:Y,stderr:ee,error:R,exitCode:u,signal:T,timedOut:X,command:"osascript",options:t,parentError:new Error})}var Ne=async()=>F(`use framework "AppKit"
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
      
      return filePaths`),_e=async r=>{let e=Array.isArray(r)?r:[r];await F(`use framework "Foundation"
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
      end if`)};var V=O(require("path"));var ae=require("child_process");function j(r,e){let t=e?.command,a=e?.language,s=[...e?.leadingArgs?.map(u=>u.toString())||[]],i=e?.trailingArgs||[];!t&&(a===void 0||a==="AppleScript"||a==="JXA")&&(t="/usr/bin/osascript",s.push("-l",a==="JXA"?"JavaScript":"AppleScript",...r.startsWith("/")?[]:["-e"],r,...i.map(u=>u.toString())));let n=process.env;if(e?.command&&(n.PATH=`${n.PATH}:${(0,ae.execSync)(`$(/bin/bash -lc 'echo $SHELL') -lc 'echo "$PATH"'`).toString()}`,t=e.command,s.push(r,...i.map(u=>u.toString()))),!t)throw new Error("No command specified.");let c="",d=u=>{console.log(u)},l=(0,ae.spawn)(t,s,{env:n});return e?.logDebugMessages&&console.log(`Running shell command "${t} ${s.join(" ")}"`),l.stdout?.on("data",u=>{c+=u.toString(),e?.logIntermediateOutput&&console.log(`Data from script: ${c}`)}),l.stderr?.on("data",u=>{e?.stderrCallback&&e.stderrCallback(u.toString()),e?.logErrors&&console.error(u.toString())}),l.stdin.on("error",u=>{e?.logErrors&&console.error(`Error writing to stdin: ${u}`)}),d=async u=>{u?.length>0&&(l.stdin.cork(),l.stdin.write(`${u}\r
`),process.nextTick(()=>l.stdin.uncork()),e?.logSentMessages&&console.log(`Sent message: ${u}`))},{data:(async()=>new Promise((u,T)=>{let X=e?.timeout?setTimeout(()=>{try{l.kill()}catch(D){e?.logErrors&&console.error(`Error killing process: ${D}`)}return e?.logErrors&&console.error("Script timed out"),l.stdin.end(),l.kill(),T("Script timed out")},e?.timeout):void 0;l.on("close",D=>{if(D!==0)return e?.logErrors&&console.error(`Script exited with code ${D}`),l.stdin.end(),l.kill(),T(`Script exited with code ${D}`);clearTimeout(X);let U;try{U=JSON.parse(c)}catch{U=c.trim()}return e?.logFinalOutput&&console.log(`Script output: ${U}`),u(U)})}))(),sendMessage:d}}var z=require("@raycast/api");async function Le(){let r=V.default.join(z.environment.assetsPath,"scripts","finder.scpt"),e=await j(r,{language:"AppleScript",stderrCallback:t=>P("Finder Selection Error",new Error(t))}).data;return Array.isArray(e)?e:e.split(",").map(t=>t.trim())}async function Me(){let r=V.default.join(z.environment.assetsPath,"scripts","houdahSpot.scpt"),e=await j(r,{language:"AppleScript",stderrCallback:t=>P("HoudahSpot Selection Error",new Error(t))}).data;return Array.isArray(e)?e:e.split(",").map(t=>t.trim())}async function We(){let r=V.default.join(z.environment.assetsPath,"scripts","neofinder.scpt"),e=await j(r,{language:"AppleScript",stderrCallback:t=>P("NeoFinder Selection Error",new Error(t))}).data;return Array.isArray(e)?e:e.split(",").map(t=>t.trim())}async function je(){let r=V.default.join(z.environment.assetsPath,"scripts","pathfinder.scpt"),e=await j(r,{language:"JXA",stderrCallback:t=>P("Path Finder Selection Error",new Error(t))}).data;return Array.isArray(e)?e:e.split(",").map(t=>t.trim())}async function Ve(){let r=V.default.join(z.environment.assetsPath,"scripts","qspace.scpt"),e=await j(r,{language:"JXA",stderrCallback:t=>P("QSpace Pro Selection Error",new Error(t))}).data;return Array.isArray(e)?e:e.split(",").map(t=>t.trim())}async function ze(){let r=V.default.join(z.environment.assetsPath,"scripts","forklift-beta.scpt"),e=await j(r,{language:"JXA",stderrCallback:t=>P("ForkLift Selection Error",new Error(t))}).data;return Array.isArray(e)?e:e.split(",").map(t=>t.trim())}var ne=async r=>{let e=await o.LocalStorage.getItem("itemsToRemove")??"";await o.LocalStorage.setItem("itemsToRemove",e+", "+r)},B=async(r,e)=>{let t=b.default.join(C.tmpdir(),`${r}.${e}`);return{path:t,[Symbol.asyncDispose]:async()=>{w.existsSync(t)&&await w.promises.rm(t,{recursive:!0})}}};var He=async()=>{let e=(await o.LocalStorage.getItem("itemsToRemove")??"").toString().split(", ");for(let t of e)w.existsSync(t)&&await w.promises.rm(t,{recursive:!0});await o.LocalStorage.removeItem("itemsToRemove")},be=async()=>{let r=[],t=(0,o.getPreferenceValues)().inputMethod,a=!1;if(t=="Clipboard")try{let n=(await Ne()).split(", ");if(await o.LocalStorage.setItem("itemsToRemove",n.join(", ")),n.filter(c=>c.trim().length>0).length>0)return n}catch(n){console.error(`Couldn't get images from clipboard: ${n}`),a=!0}let s=t;try{s=(await(0,o.getFrontmostApplication)()).name}catch(n){console.error(`Couldn't get frontmost application: ${n}`)}try{(t=="Path Finder"||s=="Path Finder")&&(r=await je())}catch(n){console.error(`Couldn't get images from Path Finder: ${n}`),a=!0}try{(t=="NeoFinder"||s=="NeoFinder")&&(r=await We())}catch(n){console.error(`Couldn't get images from NeoFinder: ${n}`),a=!0}try{(t=="HoudahSpot"||s=="HoudahSpot")&&(r=await Me())}catch(n){console.error(`Couldn't get images from HoudahSpot: ${n}`),a=!0}try{(t=="QSpace Pro"||s=="QSpace Pro")&&(r=await Ve())}catch(n){console.error(`Couldn't get images from QSpace Pro: ${n}`),a=!0}try{(t=="ForkLift"||s=="ForkLift")&&(r=await ze())}catch(n){console.error(`Couldn't get images from ForkLift: ${n}`),a=!0}if(r.length>0)return r.filter((n,c)=>r.indexOf(n)===c);let i=await Le();return s=="Finder"||t=="Finder"||a?r=i:i.forEach(n=>{n.split("/").at(-2)=="Desktop"&&!r.includes(n)&&r.push(n)}),r.filter((n,c)=>r.indexOf(n)===c)},Ge=async r=>{let e="Finder";try{e=(await(0,o.getFrontmostApplication)()).name}catch(a){console.error(`Couldn't get frontmost application: : ${a}`)}let t=(0,o.getPreferenceValues)();t.imageResultHandling=="copyToClipboard"?(await _e(r),Be(r)):t.imageResultHandling=="openInPreview"?(await At(r),Be(r)):t.inputMethod=="NeoFinder"||e=="NeoFinder"?await(0,o.showInFinder)(r[0]):(t.inputMethod=="HoudahSpot"||e=="HoudahSpot")&&await(0,o.showInFinder)(r[0])},se=async()=>(C.cpus()[0].model.includes("Apple")?"arm":"x86")=="arm"?((0,q.execSync)(`chmod +x ${o.environment.assetsPath}/webp/arm/dwebp`),(0,q.execSync)(`chmod +x ${o.environment.assetsPath}/webp/arm/cwebp`),w.existsSync(`${o.environment.assetsPath}/webp/x86/dwebp`)&&await w.promises.rm(`${o.environment.assetsPath}/webp/x86/dwebp`),w.existsSync(`${o.environment.assetsPath}/webp/x86/cwebp`)&&await w.promises.rm(`${o.environment.assetsPath}/webp/x86/cwebp`),[`${o.environment.assetsPath}/webp/arm/dwebp`,`${o.environment.assetsPath}/webp/arm/cwebp`]):((0,q.execSync)(`chmod +x ${o.environment.assetsPath}/webp/x86/dwebp`),(0,q.execSync)(`chmod +x ${o.environment.assetsPath}/webp/x86/cwebp`),w.existsSync(`${o.environment.assetsPath}/webp/arm/dwebp`)&&await w.promises.rm(`${o.environment.assetsPath}/webp/arm/dwebp`),w.existsSync(`${o.environment.assetsPath}/webp/arm/cwebp`)&&await w.promises.rm(`${o.environment.assetsPath}/webp/arm/cwebp`),[`${o.environment.assetsPath}/webp/x86/dwebp`,`${o.environment.assetsPath}/webp/x86/cwebp`]);var $e=async(r,e,t)=>F(`use framework "Foundation"
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
  pngData's writeToFile:"${t}" atomically:false`),Q=async(r,e,t)=>{let a=(0,o.getPreferenceValues)(),s="NSPNGFileType";return r=="JPEG"?s="NSJPEGFileType":r=="TIFF"&&(s="NSTIFFFileType"),F(`use framework "Foundation"
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
    thePasteboard's writeObjects:pageImages`:""}`,{timeout:60*1e3*5})};var At=async r=>{let e=Array.isArray(r)?r:[r],t=e.some(a=>b.default.extname(a)==".svg");await F(`use framework "Foundation"
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
          end tell`}`)},Be=r=>{let e=Array.isArray(r)?r:[r];for(let t of e)w.unlinkSync(t)},Et=async()=>F(`use framework "Foundation"
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
    end if`),Ft=async r=>{let e="Finder";try{e=await Et()}catch(t){console.error(`Couldn't get frontmost application: ${t}`)}try{if(e=="Path Finder")return F(`tell application "Path Finder"
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
      end tell`)}catch(t){console.error(`Couldn't get current directory of Path Finder: ${t}`)}return F(`tell application "Finder"
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
  end tell`)},Je=async(r,e=!1,t=void 0)=>{let a=(0,o.getPreferenceValues)(),s=await Ft(r[0]);return r.map(i=>{let n=i;if(a.imageResultHandling=="saveToDownloads"?n=b.default.join(C.homedir(),"Downloads",b.default.basename(n)):a.imageResultHandling=="saveToDesktop"?n=b.default.join(C.homedir(),"Desktop",b.default.basename(n)):(a.imageResultHandling=="saveInContainingFolder"||a.imageResultHandling=="replaceOriginal")&&(a.inputMethod=="Clipboard"||e)?n=b.default.join(s,b.default.basename(n)):(a.imageResultHandling=="copyToClipboard"||a.imageResultHandling=="openInPreview")&&(n=b.default.join(C.tmpdir(),b.default.basename(n))),n=t?n.replace(b.default.extname(n),`.${t}`):n,a.imageResultHandling!="replaceOriginal"&&C.tmpdir()!=b.default.dirname(n)){let c=2;for(;w.existsSync(n);)n=b.default.join(b.default.dirname(n),b.default.basename(n,b.default.extname(n))+`-${c}${b.default.extname(n)}`),c++}return n})},P=async(r,e,t,a)=>{console.error(e),t?(t.title=r,t.message=a??e.message,t.style=o.Toast.Style.Failure,t.primaryAction={title:"Copy Error",onAction:async()=>{await o.Clipboard.copy(e.message)}}):t=await(0,o.showToast)({title:r,message:a??e.message,style:o.Toast.Style.Failure,primaryAction:{title:"Copy Error",onAction:async()=>{await o.Clipboard.copy(e.message)}}})};var Ke=r=>{let e=C.homedir();if(r.startsWith("~"))return r.replace(/^~(?=$|\/|\\)/,e);let t=/(\/Users\/.*?)\/.*/,a=r.match(t);return a?r.replace(a[1],e):r};var Xe=require("fs");async function Ct(){let r="";try{r=(0,K.execSync)(`/bin/zsh -lc 'realpath "$(which brew)"'`).toString().trim()}catch(e){console.error(e)}if(r==="")return await(0,S.showToast)({title:"Homebrew is required to install the AVIF encoder.",message:"Please install Homebrew and try again. Visit https://brew.sh for more information. Once Homebrew is installed, run the command `brew install libavif` to install the AVIF encoder manually (Otherwise, this command will be run automatically).",style:S.Toast.Style.Failure}),!1;if(await(0,S.confirmAlert)({title:"Install AVIF Encoder",message:"The libavif Homebrew formula is required to convert images to/from AVIF format. Would you like to install it now?",primaryAction:{title:"Install"}})){let e=await(0,S.showToast)({title:"Installing AVIF Encoder...",style:S.Toast.Style.Animated});try{if((0,K.execSync)(`/bin/zsh -ilc '${r} install --quiet libavif || true'`),!Rt())throw new Error("The avifenc binary has not been added to the user's $PATH");return e.title="AVIF Encoder installed successfully!",e.style=S.Toast.Style.Success,!0}catch(t){console.error(t),P("Failed to install AVIF Encoder.",t,e,"If you previously attempted to install libavif or avifenc, please run `brew doctor` followed by `brew cleanup` and try again.")}}return await(0,S.showToast)({title:"AVIF Encoder not installed.",style:S.Toast.Style.Failure}),!1}async function Rt(){let t=!1,a=0;for(;!t&&a<7;){let s=(0,K.execSync)("/bin/zsh -lc 'command -v avifenc'").toString().trim();if((0,Xe.existsSync)(s)){t=!0;break}await new Promise(i=>setTimeout(i,1e3)),a++}return t}async function J(){let r=await S.LocalStorage.getItem("avifEncoderPath"),e=await S.LocalStorage.getItem("avifDecoderPath");if(!r||!e)try{r=(0,K.execSync)(`/bin/zsh -lc 'realpath "$(which avifenc)"'`).toString().trim(),e=(0,K.execSync)(`/bin/zsh -lc 'realpath "$(which avifdec)"'`).toString().trim()}catch(t){if(await Ct())try{return await J()}catch(a){console.error(a),P("AVIF Encoder not found.",a,void 0,"Please install the libavif Homebrew formula manually and try again.")}else P("AVIF Encoder not found.",t,void 0,"Please install the libavif Homebrew formula and try again.")}return{encoderPath:r,decoderPath:e}}var Ze=["ASTC","AVIF","BMP","DDS","EXR","GIF","HEIC","HEICS","ICNS","ICO","JPEG","JP2","KTX","PBM","PDF","PNG","PSD","PVR","TGA","TIFF","WEBP","SVG"];async function M(r,e,t,a=!1){let s=(0,L.getPreferenceValues)();L.environment.commandName==="tools/convert-images"&&(s.jpegExtension="jpg");let i=[],n=r.map(ce=>Ke(ce));for(let[ce,y]of n.entries()){let E=v.default.extname(y).slice(1),ft=e==="JPEG"?s.jpegExtension:e.toLowerCase(),h=t?.[ce]||(await Je([y],!1,ft))[0];if(e==="WEBP"&&E.toLowerCase()!=="svg"){let[,p]=await se();if(E.toLowerCase()=="avif"){var c=[];try{let{decoderPath:f}=await J();let x=N(c,await B("tmp","png"),!0);(0,m.execSync)(`${f} '${y}' '${x.path}'`);(0,m.execSync)(`${p} ${s.useLosslessConversion?"-lossless":""} '${x.path}' -o '${h}'`)}catch(d){var l=d,R=!0}finally{var u=_(c,l,R);u&&await u}}else if(E.toLowerCase()=="pdf"){let f=v.default.join(h.split("/").slice(0,-1).join("/"),v.default.basename(h,".webp")+" WebP");(0,m.execSync)(`mkdir -p '${f}'`),await Q("PNG",y,f);let x=(0,ie.readdirSync)(f).map(g=>v.default.join(f,g));for(let g of x)(0,m.execSync)(`${p} ${s.useLosslessConversion?"-lossless":""} '${g}' -o '${g.replace(".png",".webp")}'`),await ne(g)}else(0,m.execSync)(`${p} ${s.useLosslessConversion?"-lossless":""} '${y}' -o '${h}'`)}else if(E.toLowerCase()=="svg")if(["AVIF","PDF","WEBP"].includes(e)){var T=[];try{let p=N(T,await B("tmp","png"),!0);await $e("PNG",y,p.path);return await M([p.path],e,[h])}catch(X){var D=X,U=!0}finally{var Y=_(T,D,U);Y&&await Y}}else return await $e(e,y,h),await M([h],e,[h]);else if(e=="SVG"){var we=[];try{let p=N(we,await B("tmp","bmp"),!0);(0,m.execSync)(`chmod +x ${L.environment.assetsPath}/potrace/potrace`);if(E.toLowerCase()=="webp"){var ee=[];try{let f=N(ee,await B("tmp","png"),!0);let[x]=await se();(0,m.execSync)(`${x} '${y}' -o '${f.path}'`);(0,m.execSync)(`sips --setProperty format "bmp" '${f.path}' --out '${p.path}' && ${L.environment.assetsPath}/potrace/potrace -s --tight -o '${h}' '${p.path}'`)}catch(Ye){var et=Ye,tt=!0}finally{var ye=_(ee,et,tt);ye&&await ye}}else if(E.toLowerCase()=="pdf"){let f=v.default.join(h.split("/").slice(0,-1).join("/"),v.default.basename(h,".svg")+" SVG");(0,m.execSync)(`mkdir -p '${f}'`),await Q("PNG",y,f);let x=(0,ie.readdirSync)(f).map(g=>v.default.join(f,g));for(let g of x)(0,m.execSync)(`sips --setProperty format "bmp" '${g}' --out '${p.path}' && ${L.environment.assetsPath}/potrace/potrace -s --tight -o '${g.replace(".png",".svg")}' '${p.path}'`),await ne(g)}else(0,m.execSync)(`sips --setProperty format "bmp" '${y}' --out '${p.path}' && ${L.environment.assetsPath}/potrace/potrace -s --tight -o '${h}' '${p.path}'`)}catch(rt){var at=rt,nt=!0}finally{var ke=_(we,at,nt);ke&&await ke}}else if(e=="AVIF"){let{encoderPath:p}=await J();if(E.toLowerCase()=="pdf"){let f=v.default.join(h.split("/").slice(0,-1).join("/"),v.default.basename(h,".avif")+" AVIF");(0,m.execSync)(`mkdir -p '${f}'`),await Q("PNG",y,f);let x=(0,ie.readdirSync)(f).map(g=>v.default.join(f,g)).filter(g=>g.endsWith(".png"));for(let g of x)(0,m.execSync)(`${p} ${s.useLosslessConversion?"-s 0 --min 0 --max 0 --minalpha 0 --maxalpha 0 --qcolor 100 --qalpha 100 ":""}'${g}' '${g.replace(".png",".avif")}'`),await ne(g)}else{var Se=[];try{let f=N(Se,await B("tmp","png"),!0);await M([y],"PNG",[f.path],!0);(0,m.execSync)(`${p} ${s.useLosslessConversion?"-s 0 --min 0 --max 0 --minalpha 0 --maxalpha 0 --qcolor 100 --qalpha 100 ":""}'${f.path}' '${h}'`)}catch(st){var it=st,ot=!0}finally{var xe=_(Se,it,ot);xe&&await xe}}}else if(E.toLowerCase()=="webp"){let[p]=await se();(0,m.execSync)(`${p} '${y}' -o '${h}'`),(0,m.execSync)(`sips --setProperty format ${e.toLowerCase()} '${h}'`)}else if(E.toLowerCase()=="pdf"){let p=v.default.basename(y),f=`${p?.substring(0,p.lastIndexOf("."))} ${e}`,x=v.default.join(h.split("/").slice(0,-1).join("/"),f);(0,m.execSync)(`mkdir -p '${x}'`),await Q(e,y,x)}else if(E.toLowerCase()=="avif"){var Pe=[];try{let{decoderPath:p}=await J();let f=N(Pe,await B("tmp","png"),!0);(0,m.execSync)(`${p} '${y}' '${f.path}'`);return await M([f.path],e,[h])}catch(ct){var lt=ct,ut=!0}finally{var ve=_(Pe,lt,ut);ve&&await ve}}else(0,m.execSync)(`sips --setProperty format ${e.toLowerCase()} '${y}' --out '${h}'`);i.push(h)}return a||await Ge(i),i}var H=require("@raycast/api");async function oe(r){if(r.selectedImages.length===0||r.selectedImages.length===1&&r.selectedImages[0]===""){await(0,H.showToast)({title:"No images selected",message:"No images found in your selection. Make sure the image(s) still exist on the disk. If using a third-party file manager, make sure the app's index is up to date.",style:H.Toast.Style.Failure});return}let e=await(0,H.showToast)({title:r.inProgressMessage,style:H.Toast.Style.Animated}),t=`image${r.selectedImages.length===1?"":"s"}`;try{let a=await r.operation();return e.title=`${r.successMessage} ${r.selectedImages.length.toString()} ${t}`,e.style=H.Toast.Style.Success,a}catch(a){await P(`${r.failureMessage} ${r.selectedImages.length.toString()} ${t}`,a,e)}finally{await He()}}var A=require("react/jsx-runtime");function Qe(r){let e=(0,$.getPreferenceValues)(),t=Ze.filter(a=>e[`show${a}`]);return(0,qe.useEffect)(()=>{if(r.launchContext&&"convertTo"in r.launchContext){let{convertTo:a}=r.launchContext;a&&Promise.resolve(be()).then(async s=>{await oe({operation:()=>M(s,a),selectedImages:s,inProgressMessage:"Conversion in progress...",successMessage:"Converted",failureMessage:"Failed to convert"})})}},[r.launchContext]),(0,A.jsxs)($.List,{searchBarPlaceholder:"Search image transformations...",children:[(0,A.jsx)($.List.EmptyView,{title:"No Formats Enabled",description:"Enable formats in the command preferences (\u2318\u21E7,)",icon:$.Icon.Image,actions:(0,A.jsx)($.ActionPanel,{children:(0,A.jsx)($.Action,{title:"Open Command Preferences",onAction:async()=>await(0,$.openCommandPreferences)(),shortcut:{modifiers:["cmd","shift"],key:","}})})}),t.map(a=>(0,A.jsx)($.List.Item,{title:a,actions:(0,A.jsxs)($.ActionPanel,{children:[(0,A.jsx)($.Action,{title:`Convert to ${a}`,icon:$.Icon.Switch,onAction:async()=>{let s=await be();await oe({operation:()=>M(s,a),selectedImages:s,inProgressMessage:"Conversion in progress...",successMessage:"Converted",failureMessage:"Failed to convert"})}}),(0,A.jsx)($.Action.CreateQuicklink,{title:"Create Quicklink",quicklink:{name:`Convert to ${a}`,link:`raycast://extensions/HelloImSteven/sips/convert?context=${encodeURIComponent(JSON.stringify({convertTo:a}))}`}}),(0,A.jsx)(le,{})]})},a))]})}
