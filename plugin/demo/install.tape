# VHS tape file for generating terminal demo
# Install VHS: https://github.com/charmbracelet/vhs
# Run: vhs install.tape

Output demo/terminal.gif
Output demo/terminal.webm

Set Shell "bash"
Set FontFamily "JetBrains Mono"
Set FontSize 14
Set Width 900
Set Height 500
Set Theme "Catppuccin Mocha"
Set Padding 20

Type "npx pm-ai-partner@latest"
Enter
Sleep 2s

# Simulated installer output
Type "1"
Enter
Sleep 500ms

Type "1"
Enter
Sleep 1s

Sleep 3s
