#!/usr/bin/swift
//
//  HUD.swift
//  GPT Nexus
//
//  Heads-up-display for Notifications.
//  Created for
//  - µBib (https://github.com/zeitlings/ubib)
//  - GPT Nexus (https://github.com/zeitlings/gptnexus)
//
//  Created by Patrick Sy on 12/05/2023.
//
// TODO: Extend lifetime if hovered?

import SwiftUI

enum Endpoint: String, Codable {
	case ChatGPT
	case Claude
	case Gemini
	case Proxy
	case LocalLLM = "Local LM"
	case Perplexity
	case Missing
}

struct Environment {
	static let env: [String:String] = ProcessInfo.processInfo.environment
	
	/// Doubled so we have it available for measuring the width of the entire string.
	/// Markdown formatting that is not initialized within `Text(_:)` gets ignored.
	static let text: String = "__Service:__ \(Environment.primary.rawValue) | __Model:__ \(Environment.model) | __System Prompt:__ \(Environment.usesSystemPrompt)"
	static let primary: Endpoint = .init(rawValue: env[.primary]!) ?? .Missing
	static let model: String = {
		switch primary {
		case .ChatGPT:    return getDefined(.modelOpenAIOverride)    ?? getDefined(.modelOpenAI)!
		case .Claude:     return getDefined(.modelAnthropicOverride) ?? getDefined(.modelAnthropic)!
		case .Gemini: 	  return getDefined(.modelGeminiOverride)    ?? getDefined(.modelGemini)!
		case .Perplexity: return getDefined(.modelPerplexity)!
		case .Proxy: 	  return getDefined(.modelProxy) ?? "Not Defined"
		case .LocalLLM:   return getDefined(.modelLocal) ?? "Not Defined"
		case .Missing:    return "Missing <\(primary.rawValue)>"
		}
	}()
	
	static let usesSystemPrompt: String = {
		var info: String = (env[.systemPrompt] ?? "").isEmpty ? "No" : "Yes"
		/// > Note that the search subsystem of the Online LLMs do not attend to the system prompt.
		/// > See <https://docs.perplexity.ai/docs/model-cards#online-llms>
		if primary == .Perplexity, info == "Yes", model.contains("online") {
			info += " (ineffective)"
		}
		return info
	}()
	
	
	/// Retrieves the value of an environment variable as a specified type if it is defined, i.e. is not an empty string..
	/// - Parameter variable: The name of the environment variable to retrieve.
	/// - Returns: The value of the environment variable as the specified type, or `nil` if the variable is not defined or its value is empty.
	/// - Note: The function requires the `T` type to conform to the `LosslessStringConvertible` protocol,
	/// 		which means it must have an initializer that takes a `String` and can create an instance of the type.
	///
	/// - Example:
	///  	```swift
	///  	let port: Int? = getDefined("PORT")
	///  	let apiKey: String? = getDefined("API_KEY")
	///  	let model: Model? = getDefined("MODEL") // Where `Model: LosslessStringConvertible`
	///  	```
	static func getDefined<T: LosslessStringConvertible>(_ variable: String) -> T? {
		if let value: String = env[variable], !value.isEmpty {
			return .init(value)
		}
		return nil
	}
}

struct HUDView: View {
	@State private var isShowing: Bool = false
	let width: CGFloat = Environment.text.width(font: NSFont.systemFont(ofSize: 13.0))
	let dismissAfter: TimeInterval = 3.5 // 2.0
	let fade: Double = 0.2 // 0.1
	
	var body: some View {
		ZStack {
			if isShowing {
				Background()
				DisplayText()
			}
		}
		//.frame(width: width - 20.0, height: 35, alignment: .center)
		.frame(width: width, height: 35, alignment: .center)
		.transition(.opacity)
		.task {
			withAnimation(.easeIn(duration: fade)) {
				isShowing = true
			}
			DispatchQueue.main.asyncAfter(deadline: .now() + (dismissAfter - fade)) {
				withAnimation(.easeOut(duration: fade)) {
					self.isShowing = false
				}
			}
			DispatchQueue.main.asyncAfter(deadline: .now() + dismissAfter) {
				NSApplication.shared.terminate(nil)
			}
		}
	}
	
	@ViewBuilder
	func Background() -> some View {
		let radius: CGFloat = 14.0 // 8.0 // 20.0
		Color(nsColor: NSColor.darkGray.withAlphaComponent(0.9))
			.cornerRadius(radius)
			.overlay(content: {
				RoundedRectangle(cornerRadius: radius)
					.stroke(.primary.opacity(0.1), lineWidth: 1)
			})
	}
	
	@ViewBuilder
	func DisplayText() -> some View {
		
		//Text("__Service:__ \(Environment.primary.rawValue)  ·  __Model:__ `\(Environment.model)`  ·  __System Prompt:__ \(Environment.usesSystemPrompt)")
		//Text("Service: __\(Environment.primary.rawValue)__  ·  Model: __\(Environment.model)__  ·  System Prompt: __\(Environment.usesSystemPrompt)__")
		Text("__Service:__ \(Environment.primary.rawValue)  ·  __Model:__ \(Environment.model)  ·  __System Prompt:__ \(Environment.usesSystemPrompt)")
			.font(.system(size: 13.0))
			.foregroundColor(.white)
			.padding([.leading, .trailing], 4)
			.frame(alignment: .center)
	}

}

final class HUDAppDelegate: NSObject, NSApplicationDelegate {
	var window: NSWindow!
	func applicationDidFinishLaunching(_ aNotification: Notification) {
		let dialogView = HUDView()
		window = NSWindow(
			contentRect: NSRect(x: 0, y: 0, width: 400, height: 50),
			styleMask: [.borderless],
			backing: .buffered,
			defer: false
		)
		window.isOpaque = false
		window.hasShadow = false
		window.backgroundColor = NSColor.clear
		window.setFrameAutosaveName("Main Window")
		window.contentView = NSHostingView(rootView: dialogView)
		window.level = NSWindow.Level(rawValue: Int(CGWindowLevelForKey(.maximumWindow)))
		window.collectionBehavior = [
			//NSWindow.CollectionBehavior.stationary,
			NSWindow.CollectionBehavior.fullScreenDisallowsTiling,
			NSWindow.CollectionBehavior.ignoresCycle
		]
		window.makeKeyAndOrderFront(nil)
		
		if let screenFrame: NSRect = NSScreen.main?.visibleFrame {
			let windowFrame = window.frame
			let x = screenFrame.midX - windowFrame.width / 2
			let y = screenFrame.midY - (screenFrame.midY * 0.825)
			window.setFrameOrigin(NSPoint(x: x, y: y))
		}
		
		NSApplication.shared.activate(ignoringOtherApps: false)
	}
}

extension String {
	
	static let primary: String = "primary_endpoint"
	static let modelOpenAIOverride: String = "openai_gpt_model_override"
	static let modelOpenAI: String = "openai_gpt_model"
	static let modelAnthropicOverride: String = "anthropic_gpt_model_override"
	static let modelAnthropic: String = "anthropic_gpt_model"
	static let modelPerplexity: String = "perplexity_gpt_model"
	static let modelGeminiOverride: String = "google_gpt_model_override"
	static let modelGemini: String = "google_gpt_model"
	static let modelProxy: String = "openai_alternative_proxy_gpt_model"
	static let modelLocal: String = "openai_alternative_local_gpt_model"
	static let systemPrompt: String = "gpt_system_prompt"
	
	func sizeOfString(font: NSFont) -> NSSize {
		let fontAttribute = [NSAttributedString.Key.font: font]
		let size = self.size(withAttributes: fontAttribute)
		return size
	}
	
	func width(font: NSFont) -> CGFloat {
		self.sizeOfString(font: font).width
	}
}

let app = NSApplication.shared
let delegate = HUDAppDelegate()
app.delegate = delegate
//app.activate(ignoringOtherApps: true)
app.setActivationPolicy(.accessory)
app.run()
