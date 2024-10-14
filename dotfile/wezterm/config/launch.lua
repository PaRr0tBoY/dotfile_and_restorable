local platform = require("utils.platform")()

local options = {
  default_prog = {},
  launch_menu = {},
}

if platform.is_win then
  options.default_prog = { "powershell" }
  options.launch_menu = {
    { label = " PowerShell v1", args = { "powershell" } },
    { label = " PowerShell v7", args = { "pwsh" } },
    { label = " Cmd", args = { "cmd" } },
    { label = " Nushell", args = { "nu" } },
    {
      label = " GitBash",
      args = { "C:\\soft\\Git\\bin\\bash.exe" },
    },
    {
      label = " AlmaLinux",
      args = { "ssh", "kali@192.168.44.147", "-p", "22" },
    },
  }

elseif platform.is_mac then
  options.default_prog = { "/bin/zsh" }
  options.launch_menu = {
    { label = " Bash", args = { "bash" } },
    { label = " Zsh", args = { "/bin/zsh" } },
  }
end

return options
