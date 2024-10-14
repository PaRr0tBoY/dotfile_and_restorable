#!/usr/bin/swift
//
//  Message+Utils.swift
//  GPT Nexus
//
//  Created by Patrick Sy on 02/05/2024.
//

import Foundation

struct Message: Codable {
	let role: String
	let content: String
	let toolCalls: [ToolCall]?
	let toolCallID: String?
	let name: String?
	// ----------------------------
	let model: String?
	let service: String?
	let timestamp: Date?
	let inputTokens: Int?
	let outputTokens: Int?
	
	enum CodingKeys: String, CodingKey {
		case role, content, name
		case toolCalls = "tool_calls"
		case toolCallID = "tool_call_id"
		// Internal
		case model, service, timestamp, inputTokens, outputTokens
	}
	
	struct ToolCall: Codable {
		let index: Int
		let id: String?
		let type: String?
		var function: CalledFunction?
		
		struct CalledFunction: Codable {
			let name: String?
			var arguments: String?
		}
	}
}

extension Array where Element == Message {
	var formattedMarkdown: String {
		return reduce(into: "", { partialResult, message in
			switch message.role {
			case "assistant": partialResult += "\(message.content)\n\n"
			case "user": 
				let assistant: String? = message.service
				if let assistant {
					partialResult += "\n\n#### 􀀀  You\n\(message.content)\n\n#### 􀀁  \(assistant)\n\n"
				} else {
					partialResult += "\n\n#### 􀀀  You\n\(message.content)\n\n#### 􀀁  Assistant\n\n"
				}
			default: ()
			}
		})
	}
}

let arguments: [String] = CommandLine.arguments
let env: [String:String] = ProcessInfo.processInfo.environment
let chatFile: URL = URL(fileURLWithPath: env["alfred_workflow_cache"]!).appending(component: "chat").appendingPathExtension("json")
let content: Data = try Data(contentsOf: chatFile)
var messages: [Message] = try JSONDecoder().decode([Message].self, from: content)

if arguments.indices.contains(1) {
	let arg: String = arguments[1]
	if arg == "copy_last", let last: Message = messages.last(where: {
		$0.role == "assistant"
	}) {
		print(last.content, terminator: "")
		Darwin.exit(EXIT_SUCCESS)
		
	} else if arg == "remove_last", let last: Message = messages.last {
		// After successfully killing the stream process
		// the chat still contains the last user message.
		// If the process was cancelled, but actually finished
		// don't delete anything.
		guard last.role == "user" else {
			Darwin.exit(EXIT_SUCCESS)
		}
		messages.removeLast()
		let encoded: Data = try JSONEncoder().encode(messages)
		FileManager.default.createFile(atPath: chatFile.path(percentEncoded: false), contents: encoded)
		Darwin.exit(EXIT_SUCCESS)
	}

}

// Copy the entire conversation
print(messages.formattedMarkdown, terminator: "")
