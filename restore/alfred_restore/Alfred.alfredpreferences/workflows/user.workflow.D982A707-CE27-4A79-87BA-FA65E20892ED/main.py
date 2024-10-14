import json
import sys

csv_rows = [
    ("close", "Close the focused window"),
    (
        "close-all-windows-but-current",
        "On the focused workspace, close all windows but current",
    ),
    (
        "debug-windows",
        "Interactive command to record Accessibility API debug information to create bug reports",
    ),
    ("enable", "Temporarily disable window management"),
    ("flatten-workspace-tree", "Flatten the tree of currently focused workspace."),
    ("focus", "Set focus to the nearest window in in the given direction."),
    ("focus-monitor", "Focus monitor by relative direction, by order, or by pattern"),
    ("fullscreen", "Toggle the fullscreen mode for the currently focused window"),
    (
        "join-with",
        "Put the currently focused window and the nearest node in the specified direction under a common parent container",
    ),
    ("layout", "Change layout of the focused window to the given layout"),
    (
        "list-apps",
        "Print the list of running applications that appears in the Dock and may have a user interface",
    ),
    (
        "list-exec-env-vars",
        "List environment variables that exec-* commands and callbacks are run with",
    ),
    ("list-monitors", "Print monitors that satisfy conditions"),
    ("list-windows", "Print windows that satisfy conditions"),
    ("list-workspaces", "Print workspaces that satisfy conditions"),
    (
        "macos-native-fullscreen",
        "Toggle macOS fullscreen for the currently focused window",
    ),
    ("macos-native-minimize", "Toggle macOS minimize for the currently focused window"),
    ("mode", "Activate the specified binding mode"),
    ("move", "Move the window in the given direction"),
    (
        "move-node-to-monitor",
        "Move window to monitor targeted by relative direction, by order, or by pattern",
    ),
    (
        "move-node-to-workspace",
        "Move currently focused window to the specified workspace",
    ),
    (
        "move-workspace-to-monitor",
        "Move currently focused workspace to the next or previous monitor",
    ),
    ("reload-config", "Reload currently active config"),
    ("resize", "Resize the currently focused window"),
    ("split", "Split focused window"),
    ("workspace", "Focus the specified workspace"),
    (
        "workspace-back-and-forth",
        "Switch between currently focused workspace and previously focused workspace back and forth",
    ),
]


def generate_worflow_output(commands):
    return json.dumps(
        {
            "items": [
                {
                    "title": command,
                    "subtitle": description,
                    "arg": command,
                }
                for (command, description) in commands
            ]
        },
        ensure_ascii=False,
    )


text = sys.argv[1]
commands = []
for command, description in csv_rows:
    if text in command:
        commands.append((command, description))
print(generate_worflow_output(commands))
