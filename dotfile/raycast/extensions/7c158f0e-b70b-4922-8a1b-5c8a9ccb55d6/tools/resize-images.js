"use strict";var Ie=Object.create;var U=Object.defineProperty;var Ae=Object.getOwnPropertyDescriptor;var Ee=Object.getOwnPropertyNames;var Re=Object.getPrototypeOf,Te=Object.prototype.hasOwnProperty;var te=(r,e)=>(e=Symbol[r])?e:Symbol.for("Symbol."+r),re=r=>{throw TypeError(r)};var Fe=(r,e)=>{for(var t in e)U(r,t,{get:e[t],enumerable:!0})},ae=(r,e,t,a)=>{if(e&&typeof e=="object"||typeof e=="function")for(let s of Ee(e))!Te.call(r,s)&&s!==t&&U(r,s,{get:()=>e[s],enumerable:!(a=Ae(e,s))||a.enumerable});return r};var $=(r,e,t)=>(t=r!=null?Ie(Re(r)):{},ae(e||!r||!r.__esModule?U(t,"default",{value:r,enumerable:!0}):t,r)),Ce=r=>ae(U({},"__esModule",{value:!0}),r);var O=(r,e,t)=>{if(e!=null){typeof e!="object"&&typeof e!="function"&&re("Object expected");var a,s;t&&(a=e[te("asyncDispose")]),a===void 0&&(a=e[te("dispose")],t&&(s=a)),typeof a!="function"&&re("Object not disposable"),s&&(a=function(){try{s.call(this)}catch(i){return Promise.reject(i)}}),r.push([t,a,e])}else t&&r.push([t]);return e},_=(r,e,t)=>{var a=typeof SuppressedError=="function"?SuppressedError:function(n,o,l,u){return u=Error(l),u.name="SuppressedError",u.error=n,u.suppressed=o,u},s=n=>e=t?new a(n,e,"An error was suppressed during disposal"):(t=!0,n),i=n=>{for(;n=r.pop();)try{var o=n[1]&&n[1].call(n[2]);if(n[0])return Promise.resolve(o).then(i,l=>(s(l),i()))}catch(l){s(l)}if(t)throw e};return i()};var Xe={};Fe(Xe,{default:()=>Je});module.exports=Ce(Xe);var S=require("child_process"),D=$(require("path")),Y=$(require("fs"));var k=require("child_process"),p=$(require("fs")),y=$(require("os")),d=$(require("path")),c=require("@raycast/api");var v=$(require("react")),h=require("@raycast/api");var oe=$(require("node:child_process")),ce=require("node:buffer"),T=$(require("node:stream")),le=require("node:util");var ue=require("react/jsx-runtime");var z=globalThis;var N=r=>!!r&&typeof r=="object"&&typeof r.removeListener=="function"&&typeof r.emit=="function"&&typeof r.reallyExit=="function"&&typeof r.listeners=="function"&&typeof r.kill=="function"&&typeof r.pid=="number"&&typeof r.on=="function",H=Symbol.for("signal-exit emitter"),G=class{constructor(){if(this.emitted={afterExit:!1,exit:!1},this.listeners={afterExit:[],exit:[]},this.count=0,this.id=Math.random(),z[H])return z[H];Object.defineProperty(z,H,{value:this,writable:!1,enumerable:!1,configurable:!1})}on(e,t){this.listeners[e].push(t)}removeListener(e,t){let a=this.listeners[e],s=a.indexOf(t);s!==-1&&(s===0&&a.length===1?a.length=0:a.splice(s,1))}emit(e,t,a){if(this.emitted[e])return!1;this.emitted[e]=!0;let s=!1;for(let i of this.listeners[e])s=i(t,a)===!0||s;return e==="exit"&&(s=this.emit("afterExit",t,a)||s),s}},K=class{onExit(){return()=>{}}load(){}unload(){}},J=class{#o;#t;#e;#s;#i;#n;#a;#r;constructor(e){this.#o=process.platform==="win32"?"SIGINT":"SIGHUP",this.#t=new G,this.#n={},this.#a=!1,this.#r=[],this.#r.push("SIGHUP","SIGINT","SIGTERM"),globalThis.process.platform!=="win32"&&this.#r.push("SIGALRM","SIGABRT","SIGVTALRM","SIGXCPU","SIGXFSZ","SIGUSR2","SIGTRAP","SIGSYS","SIGQUIT","SIGIOT"),globalThis.process.platform==="linux"&&this.#r.push("SIGIO","SIGPOLL","SIGPWR","SIGSTKFLT"),this.#e=e,this.#n={};for(let t of this.#r)this.#n[t]=()=>{let a=this.#e.listeners(t),{count:s}=this.#t,i=e;if(typeof i.__signal_exit_emitter__=="object"&&typeof i.__signal_exit_emitter__.count=="number"&&(s+=i.__signal_exit_emitter__.count),a.length===s){this.unload();let n=this.#t.emit("exit",null,t),o=t==="SIGHUP"?this.#o:t;n||e.kill(e.pid,o)}};this.#i=e.reallyExit,this.#s=e.emit}onExit(e,t){if(!N(this.#e))return()=>{};this.#a===!1&&this.load();let a=t?.alwaysLast?"afterExit":"exit";return this.#t.on(a,e),()=>{this.#t.removeListener(a,e),this.#t.listeners.exit.length===0&&this.#t.listeners.afterExit.length===0&&this.unload()}}load(){if(!this.#a){this.#a=!0,this.#t.count+=1;for(let e of this.#r)try{let t=this.#n[e];t&&this.#e.on(e,t)}catch{}this.#e.emit=(e,...t)=>this.#l(e,...t),this.#e.reallyExit=e=>this.#c(e)}}unload(){this.#a&&(this.#a=!1,this.#r.forEach(e=>{let t=this.#n[e];if(!t)throw new Error("Listener not defined for signal: "+e);try{this.#e.removeListener(e,t)}catch{}}),this.#e.emit=this.#s,this.#e.reallyExit=this.#i,this.#t.count-=1)}#c(e){return N(this.#e)?(this.#e.exitCode=e||0,this.#t.emit("exit",this.#e.exitCode,null),this.#i.call(this.#e,this.#e.exitCode)):0}#l(e,...t){let a=this.#s;if(e==="exit"&&N(this.#e)){typeof t[0]=="number"&&(this.#e.exitCode=t[0]);let s=a.call(this.#e,e,...t);return this.#t.emit("exit",this.#e.exitCode,null),s}else return a.call(this.#e,e,...t)}},B=null,De=(r,e)=>(B||(B=N(process)?new J(process):new K),B.onExit(r,e));function Ue(r,{timeout:e}={}){let t=new Promise((o,l)=>{r.on("exit",(u,g)=>{o({exitCode:u,signal:g,timedOut:!1})}),r.on("error",u=>{l(u)}),r.stdin&&r.stdin.on("error",u=>{l(u)})}),a=De(()=>{r.kill()});if(e===0||e===void 0)return t.finally(()=>a());let s,i=new Promise((o,l)=>{s=setTimeout(()=>{r.kill("SIGTERM"),l(Object.assign(new Error("Timed out"),{timedOut:!0,signal:"SIGTERM"}))},e)}),n=t.finally(()=>{clearTimeout(s)});return Promise.race([i,n]).finally(()=>a())}var X=class extends Error{constructor(){super("The output is too big"),this.name="MaxBufferError"}};function Oe(r){let{encoding:e}=r,t=e==="buffer",a=new T.default.PassThrough({objectMode:!1});e&&e!=="buffer"&&a.setEncoding(e);let s=0,i=[];return a.on("data",n=>{i.push(n),s+=n.length}),a.getBufferedValue=()=>t?Buffer.concat(i,s):i.join(""),a.getBufferedLength=()=>s,a}async function ne(r,e){let t=Oe(e);return await new Promise((a,s)=>{let i=n=>{n&&t.getBufferedLength()<=ce.constants.MAX_LENGTH&&(n.bufferedData=t.getBufferedValue()),s(n)};(async()=>{try{await(0,le.promisify)(T.default.pipeline)(r,t),a()}catch(n){i(n)}})(),t.on("data",()=>{t.getBufferedLength()>8e7&&i(new X)})}),t.getBufferedValue()}async function se(r,e){r.destroy();try{return await e}catch(t){return t.bufferedData}}async function _e({stdout:r,stderr:e},{encoding:t},a){let s=ne(r,{encoding:t}),i=ne(e,{encoding:t});try{return await Promise.all([a,s,i])}catch(n){return Promise.all([{error:n,exitCode:null,signal:n.signal,timedOut:n.timedOut||!1},se(r,s),se(e,i)])}}function Ne(r){let e=typeof r=="string"?`
`:10,t=typeof r=="string"?"\r":13;return r[r.length-1]===e&&(r=r.slice(0,-1)),r[r.length-1]===t&&(r=r.slice(0,-1)),r}function ie(r,e){return r.stripFinalNewline?Ne(e):e}function Le({timedOut:r,timeout:e,signal:t,exitCode:a}){return r?`timed out after ${e} milliseconds`:t!=null?`was killed with ${t}`:a!=null?`failed with exit code ${a}`:"failed"}function We({stdout:r,stderr:e,error:t,signal:a,exitCode:s,command:i,timedOut:n,options:o,parentError:l}){let g=`Command ${Le({timedOut:n,timeout:o?.timeout,signal:a,exitCode:s})}: ${i}`,f=t?`${g}
${t.message}`:g,E=[f,e,r].filter(Boolean).join(`
`);return t?t.originalMessage=t.message:t=l,t.message=E,t.shortMessage=f,t.command=i,t.exitCode=s,t.signal=a,t.stdout=r,t.stderr=e,"bufferedData"in t&&delete t.bufferedData,t}function Me({stdout:r,stderr:e,error:t,exitCode:a,signal:s,timedOut:i,command:n,options:o,parentError:l}){if(t||a!==0||s!==null)throw We({error:t,exitCode:a,signal:s,stdout:r,stderr:e,command:n,timedOut:i,options:o,parentError:l});return r}async function w(r,e,t){if(process.platform!=="darwin")throw new Error("AppleScript is only supported on macOS");let{humanReadableOutput:a,language:s,timeout:i,...n}=Array.isArray(e)?t||{}:e||{},o=a!==!1?[]:["-ss"];s==="JavaScript"&&o.push("-l","JavaScript"),Array.isArray(e)&&o.push("-",...e);let l=oe.default.spawn("osascript",o,{...n,env:{PATH:"/usr/local/bin:/usr/bin:/bin:/usr/sbin:/sbin"}}),u=Ue(l,{timeout:i??1e4});l.stdin.end(r);let[{error:g,exitCode:f,signal:E,timedOut:V},x,R]=await _e(l,{encoding:"utf8"},u),ve=ie({stripFinalNewline:!0},x),Pe=ie({stripFinalNewline:!0},R);return Me({stdout:ve,stderr:Pe,error:g,exitCode:f,signal:E,timedOut:V,command:"osascript",options:t,parentError:new Error})}var F=require("child_process"),m=require("@raycast/api");var fe=require("fs");async function je(){let r="";try{r=(0,F.execSync)(`/bin/zsh -lc 'realpath "$(which brew)"'`).toString().trim()}catch(e){console.error(e)}if(r==="")return await(0,m.showToast)({title:"Homebrew is required to install the AVIF encoder.",message:"Please install Homebrew and try again. Visit https://brew.sh for more information. Once Homebrew is installed, run the command `brew install libavif` to install the AVIF encoder manually (Otherwise, this command will be run automatically).",style:m.Toast.Style.Failure}),!1;if(await(0,m.confirmAlert)({title:"Install AVIF Encoder",message:"The libavif Homebrew formula is required to convert images to/from AVIF format. Would you like to install it now?",primaryAction:{title:"Install"}})){let e=await(0,m.showToast)({title:"Installing AVIF Encoder...",style:m.Toast.Style.Animated});try{if((0,F.execSync)(`/bin/zsh -ilc '${r} install --quiet libavif || true'`),!Ve())throw new Error("The avifenc binary has not been added to the user's $PATH");return e.title="AVIF Encoder installed successfully!",e.style=m.Toast.Style.Success,!0}catch(t){console.error(t),b("Failed to install AVIF Encoder.",t,e,"If you previously attempted to install libavif or avifenc, please run `brew doctor` followed by `brew cleanup` and try again.")}}return await(0,m.showToast)({title:"AVIF Encoder not installed.",style:m.Toast.Style.Failure}),!1}async function Ve(){let t=!1,a=0;for(;!t&&a<7;){let s=(0,F.execSync)("/bin/zsh -lc 'command -v avifenc'").toString().trim();if((0,fe.existsSync)(s)){t=!0;break}await new Promise(i=>setTimeout(i,1e3)),a++}return t}async function Z(){let r=await m.LocalStorage.getItem("avifEncoderPath"),e=await m.LocalStorage.getItem("avifDecoderPath");if(!r||!e)try{r=(0,F.execSync)(`/bin/zsh -lc 'realpath "$(which avifenc)"'`).toString().trim(),e=(0,F.execSync)(`/bin/zsh -lc 'realpath "$(which avifdec)"'`).toString().trim()}catch(t){if(await je())try{return await Z()}catch(a){console.error(a),b("AVIF Encoder not found.",a,void 0,"Please install the libavif Homebrew formula manually and try again.")}else b("AVIF Encoder not found.",t,void 0,"Please install the libavif Homebrew formula and try again.")}return{encoderPath:r,decoderPath:e}}var de=async()=>w(`use framework "AppKit"
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
      
      return filePaths`),pe=async r=>{let e=Array.isArray(r)?r:[r];await w(`use framework "Foundation"
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
      end if`)};var I=$(require("path"));var L=require("child_process");function P(r,e){let t=e?.command,a=e?.language,s=[...e?.leadingArgs?.map(f=>f.toString())||[]],i=e?.trailingArgs||[];!t&&(a===void 0||a==="AppleScript"||a==="JXA")&&(t="/usr/bin/osascript",s.push("-l",a==="JXA"?"JavaScript":"AppleScript",...r.startsWith("/")?[]:["-e"],r,...i.map(f=>f.toString())));let n=process.env;if(e?.command&&(n.PATH=`${n.PATH}:${(0,L.execSync)(`$(/bin/bash -lc 'echo $SHELL') -lc 'echo "$PATH"'`).toString()}`,t=e.command,s.push(r,...i.map(f=>f.toString()))),!t)throw new Error("No command specified.");let o="",l=f=>{console.log(f)},u=(0,L.spawn)(t,s,{env:n});return e?.logDebugMessages&&console.log(`Running shell command "${t} ${s.join(" ")}"`),u.stdout?.on("data",f=>{o+=f.toString(),e?.logIntermediateOutput&&console.log(`Data from script: ${o}`)}),u.stderr?.on("data",f=>{e?.stderrCallback&&e.stderrCallback(f.toString()),e?.logErrors&&console.error(f.toString())}),u.stdin.on("error",f=>{e?.logErrors&&console.error(`Error writing to stdin: ${f}`)}),l=async f=>{f?.length>0&&(u.stdin.cork(),u.stdin.write(`${f}\r
`),process.nextTick(()=>u.stdin.uncork()),e?.logSentMessages&&console.log(`Sent message: ${f}`))},{data:(async()=>new Promise((f,E)=>{let V=e?.timeout?setTimeout(()=>{try{u.kill()}catch(x){e?.logErrors&&console.error(`Error killing process: ${x}`)}return e?.logErrors&&console.error("Script timed out"),u.stdin.end(),u.kill(),E("Script timed out")},e?.timeout):void 0;u.on("close",x=>{if(x!==0)return e?.logErrors&&console.error(`Script exited with code ${x}`),u.stdin.end(),u.kill(),E(`Script exited with code ${x}`);clearTimeout(V);let R;try{R=JSON.parse(o)}catch{R=o.trim()}return e?.logFinalOutput&&console.log(`Script output: ${R}`),f(R)})}))(),sendMessage:l}}var A=require("@raycast/api");async function he(){let r=I.default.join(A.environment.assetsPath,"scripts","finder.scpt"),e=await P(r,{language:"AppleScript",stderrCallback:t=>b("Finder Selection Error",new Error(t))}).data;return Array.isArray(e)?e:e.split(",").map(t=>t.trim())}async function me(){let r=I.default.join(A.environment.assetsPath,"scripts","houdahSpot.scpt"),e=await P(r,{language:"AppleScript",stderrCallback:t=>b("HoudahSpot Selection Error",new Error(t))}).data;return Array.isArray(e)?e:e.split(",").map(t=>t.trim())}async function ge(){let r=I.default.join(A.environment.assetsPath,"scripts","neofinder.scpt"),e=await P(r,{language:"AppleScript",stderrCallback:t=>b("NeoFinder Selection Error",new Error(t))}).data;return Array.isArray(e)?e:e.split(",").map(t=>t.trim())}async function be(){let r=I.default.join(A.environment.assetsPath,"scripts","pathfinder.scpt"),e=await P(r,{language:"JXA",stderrCallback:t=>b("Path Finder Selection Error",new Error(t))}).data;return Array.isArray(e)?e:e.split(",").map(t=>t.trim())}async function ye(){let r=I.default.join(A.environment.assetsPath,"scripts","qspace.scpt"),e=await P(r,{language:"JXA",stderrCallback:t=>b("QSpace Pro Selection Error",new Error(t))}).data;return Array.isArray(e)?e:e.split(",").map(t=>t.trim())}async function $e(){let r=I.default.join(A.environment.assetsPath,"scripts","forklift-beta.scpt"),e=await P(r,{language:"JXA",stderrCallback:t=>b("ForkLift Selection Error",new Error(t))}).data;return Array.isArray(e)?e:e.split(",").map(t=>t.trim())}var q=async(r,e)=>{let t=d.default.join(y.tmpdir(),`${r}.${e}`);return{path:t,[Symbol.asyncDispose]:async()=>{p.existsSync(t)&&await p.promises.rm(t,{recursive:!0})}}};var ke=async()=>{let e=(await c.LocalStorage.getItem("itemsToRemove")??"").toString().split(", ");for(let t of e)p.existsSync(t)&&await p.promises.rm(t,{recursive:!0});await c.LocalStorage.removeItem("itemsToRemove")},Se=async()=>{let r=[],t=(0,c.getPreferenceValues)().inputMethod,a=!1;if(t=="Clipboard")try{let n=(await de()).split(", ");if(await c.LocalStorage.setItem("itemsToRemove",n.join(", ")),n.filter(o=>o.trim().length>0).length>0)return n}catch(n){console.error(`Couldn't get images from clipboard: ${n}`),a=!0}let s=t;try{s=(await(0,c.getFrontmostApplication)()).name}catch(n){console.error(`Couldn't get frontmost application: ${n}`)}try{(t=="Path Finder"||s=="Path Finder")&&(r=await be())}catch(n){console.error(`Couldn't get images from Path Finder: ${n}`),a=!0}try{(t=="NeoFinder"||s=="NeoFinder")&&(r=await ge())}catch(n){console.error(`Couldn't get images from NeoFinder: ${n}`),a=!0}try{(t=="HoudahSpot"||s=="HoudahSpot")&&(r=await me())}catch(n){console.error(`Couldn't get images from HoudahSpot: ${n}`),a=!0}try{(t=="QSpace Pro"||s=="QSpace Pro")&&(r=await ye())}catch(n){console.error(`Couldn't get images from QSpace Pro: ${n}`),a=!0}try{(t=="ForkLift"||s=="ForkLift")&&(r=await $e())}catch(n){console.error(`Couldn't get images from ForkLift: ${n}`),a=!0}if(r.length>0)return r.filter((n,o)=>r.indexOf(n)===o);let i=await he();return s=="Finder"||t=="Finder"||a?r=i:i.forEach(n=>{n.split("/").at(-2)=="Desktop"&&!r.includes(n)&&r.push(n)}),r.filter((n,o)=>r.indexOf(n)===o)},Q=async r=>{let e="Finder";try{e=(await(0,c.getFrontmostApplication)()).name}catch(a){console.error(`Couldn't get frontmost application: : ${a}`)}let t=(0,c.getPreferenceValues)();t.imageResultHandling=="copyToClipboard"?(await pe(r),we(r)):t.imageResultHandling=="openInPreview"?(await Be(r),we(r)):t.inputMethod=="NeoFinder"||e=="NeoFinder"?await(0,c.showInFinder)(r[0]):(t.inputMethod=="HoudahSpot"||e=="HoudahSpot")&&await(0,c.showInFinder)(r[0])},ze=async()=>(y.cpus()[0].model.includes("Apple")?"arm":"x86")=="arm"?((0,k.execSync)(`chmod +x ${c.environment.assetsPath}/webp/arm/dwebp`),(0,k.execSync)(`chmod +x ${c.environment.assetsPath}/webp/arm/cwebp`),p.existsSync(`${c.environment.assetsPath}/webp/x86/dwebp`)&&await p.promises.rm(`${c.environment.assetsPath}/webp/x86/dwebp`),p.existsSync(`${c.environment.assetsPath}/webp/x86/cwebp`)&&await p.promises.rm(`${c.environment.assetsPath}/webp/x86/cwebp`),[`${c.environment.assetsPath}/webp/arm/dwebp`,`${c.environment.assetsPath}/webp/arm/cwebp`]):((0,k.execSync)(`chmod +x ${c.environment.assetsPath}/webp/x86/dwebp`),(0,k.execSync)(`chmod +x ${c.environment.assetsPath}/webp/x86/cwebp`),p.existsSync(`${c.environment.assetsPath}/webp/arm/dwebp`)&&await p.promises.rm(`${c.environment.assetsPath}/webp/arm/dwebp`),p.existsSync(`${c.environment.assetsPath}/webp/arm/cwebp`)&&await p.promises.rm(`${c.environment.assetsPath}/webp/arm/cwebp`),[`${c.environment.assetsPath}/webp/x86/dwebp`,`${c.environment.assetsPath}/webp/x86/cwebp`]),W=async(r,e)=>{var o=[];try{let t=(0,c.getPreferenceValues)();let a=O(o,await q("tmp","png"),!0);let s=(await C([e]))[0];let[i,n]=await ze();(0,k.execSync)(`${i} "${e}" -o "${a.path}" && ${r} "${a.path}" && ${n} ${t.useLosslessConversion?"-lossless":""} "${a.path}" -o "${s}"`);return s}catch(l){var u=l,g=!0}finally{var f=_(o,u,g);f&&await f}},M=async(r,e)=>{var o=[];try{let t=(0,c.getPreferenceValues)();let a=O(o,await q("tmp","png"),!0);let s=(await C([e]))[0];let{encoderPath:i,decoderPath:n}=await Z();(0,k.execSync)(`${n} "${e}" "${a.path}" && ${r} "${a.path}" && ${i} ${t.useLosslessConversion?"-s 0 --min 0 --max 0 --minalpha 0 --maxalpha 0 --qcolor 100 --qalpha 100":""}  "${a.path}" "${s}"`);return s}catch(l){var u=l,g=!0}finally{var f=_(o,u,g);f&&await f}},j=async(r,e)=>{var s=[];try{let t=O(s,await q("tmp","bmp"),!0);let a=(await C([e]))[0];await He("BMP",e,t.path);(0,k.execSync)(`chmod +x ${c.environment.assetsPath}/potrace/potrace`);(0,k.execSync)(`${r} "${t.path}" && ${c.environment.assetsPath}/potrace/potrace -s --tight -o "${a}" "${t.path}"`);return a}catch(i){var n=i,o=!0}finally{var l=_(s,n,o);l&&await l}},He=async(r,e,t)=>w(`use framework "Foundation"
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
  pngData's writeToFile:"${t}" atomically:false`);var Be=async r=>{let e=Array.isArray(r)?r:[r],t=e.some(a=>d.default.extname(a)==".svg");await w(`use framework "Foundation"
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
          end tell`}`)},we=r=>{let e=Array.isArray(r)?r:[r];for(let t of e)p.unlinkSync(t)},Ge=async()=>w(`use framework "Foundation"
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
    end if`),Ke=async r=>{let e="Finder";try{e=await Ge()}catch(t){console.error(`Couldn't get frontmost application: ${t}`)}try{if(e=="Path Finder")return w(`tell application "Path Finder"
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
      end tell`)}catch(t){console.error(`Couldn't get current directory of Path Finder: ${t}`)}return w(`tell application "Finder"
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
  end tell`)},C=async(r,e=!1,t=void 0)=>{let a=(0,c.getPreferenceValues)(),s=await Ke(r[0]);return r.map(i=>{let n=i;if(a.imageResultHandling=="saveToDownloads"?n=d.default.join(y.homedir(),"Downloads",d.default.basename(n)):a.imageResultHandling=="saveToDesktop"?n=d.default.join(y.homedir(),"Desktop",d.default.basename(n)):(a.imageResultHandling=="saveInContainingFolder"||a.imageResultHandling=="replaceOriginal")&&(a.inputMethod=="Clipboard"||e)?n=d.default.join(s,d.default.basename(n)):(a.imageResultHandling=="copyToClipboard"||a.imageResultHandling=="openInPreview")&&(n=d.default.join(y.tmpdir(),d.default.basename(n))),n=t?n.replace(d.default.extname(n),`.${t}`):n,a.imageResultHandling!="replaceOriginal"&&y.tmpdir()!=d.default.dirname(n)){let o=2;for(;p.existsSync(n);)n=d.default.join(d.default.dirname(n),d.default.basename(n,d.default.extname(n))+`-${o}${d.default.extname(n)}`),o++}return n})},b=async(r,e,t,a)=>{console.error(e),t?(t.title=r,t.message=a??e.message,t.style=c.Toast.Style.Failure,t.primaryAction={title:"Copy Error",onAction:async()=>{await c.Clipboard.copy(e.message)}}):t=await(0,c.showToast)({title:r,message:a??e.message,style:c.Toast.Style.Failure,primaryAction:{title:"Copy Error",onAction:async()=>{await c.Clipboard.copy(e.message)}}})};var xe=r=>{let e=y.homedir();if(r.startsWith("~"))return r.replace(/^~(?=$|\/|\\)/,e);let t=/(\/Users\/.*?)\/.*/,a=r.match(t);return a?r.replace(a[1],e):r};async function ee(r,e,t){let a=r.map(n=>xe(n)),s='"'+a.join('" "')+'"',i=await C(a);if(s.toLocaleLowerCase().includes("webp")||s.toLocaleLowerCase().includes("svg")||s.toLocaleLowerCase().includes("avif")){let n=[];for(let o of a)if(o.toLowerCase().endsWith(".webp"))e!=-1&&t==-1?n.push(await W(`sips --resampleWidth ${e}`,o)):e==-1&&t!=-1?n.push(await W(`sips --resampleHeight ${t}`,o)):n.push(await W(`sips --resampleHeightWidth ${t} ${e}`,o));else if(o.toLowerCase().endsWith(".svg"))e!=-1&&t==-1?n.push(await j(`sips --resampleWidth ${e}`,o)):e==-1&&t!=-1?n.push(await j(`sips --resampleHeight ${t}`,o)):n.push(await j(`sips --resampleHeightWidth ${t} ${e}`,o));else if(o.toLowerCase().endsWith(".avif"))e!=-1&&t==-1?n.push(await M(`sips --resampleWidth ${e}`,o)):e==-1&&t!=-1?n.push(await M(`sips --resampleHeight ${t}`,o)):n.push(await M(`sips --resampleHeightWidth ${t} ${e}`,o));else{let l=i[a.indexOf(o)];n.push(l),e!=-1&&t==-1?(0,S.execSync)(`sips --resampleWidth ${e} -o "${l}" "${o}"`):e==-1&&t!=-1?(0,S.execSync)(`sips --resampleHeight ${t} -o "${l}" "${o}"`):(0,S.execSync)(`sips --resampleHeightWidth ${t} -o "${l}" ${e} "${o}"`)}return await Q(n),n}else{let n=i.length==1?i[0]:D.default.join(D.default.dirname(i[0]),"resized");i.length>1&&(0,S.execSync)(`mkdir -p "${n}"`),e!=-1&&t==-1?(0,S.execSync)(`sips --resampleWidth ${e} -o "${n}" ${s}`):e==-1&&t!=-1?(0,S.execSync)(`sips --resampleHeight ${t} -o "${n}" ${s}`):(0,S.execSync)(`sips --resampleHeightWidth ${t} ${e} -o "${n}" ${s}`),i.length>1&&(await Promise.all(a.map((o,l)=>Y.default.promises.rename(D.default.join(n,D.default.basename(o)),i[l]))),await Y.default.promises.rm(n,{recursive:!0,force:!0})),await Q(i)}return i}async function Je({width:r,height:e,imagePaths:t}){let a=parseInt(r.toString()),s=parseInt(e.toString());if(isNaN(a)||s!==-1&&a<1)throw new Error("Invalid width: must be a positive integer");if(isNaN(s)||s!==-1&&s<1)throw new Error("Invalid height: must be a positive integer");let i=t?.length?t:await Se(),n=await ee(i,a,s);return await ke(),n}
