# PM AI Partner — Install Demo
# Generate: cd plugin/demo && vhs install.tape
# Requires: node

Output install.gif
Output install.webm

Set Shell "bash"
Set FontFamily "JetBrains Mono"
Set FontSize 15
Set Width 900
Set Height 520
Set Theme "Catppuccin Mocha"
Set Padding 20
Set TypingSpeed 40ms

Type "# Install PM AI Partner — skills, commands & hooks for PMs"
Enter
Sleep 500ms

Type "node ../bin/install.js --claude --local"
Enter
Sleep 3s

Type ""
Sleep 2s

Type "# Verify — list installed skills"
Enter
Sleep 300ms

Type "ls .claude/skills/"
Enter
Sleep 2s

Type "# Verify — list installed commands"
Enter
Sleep 300ms

Type "ls .claude/commands/pm/"
Enter
Sleep 2s

Type "# Done! Run /pm:thought-partner in Claude Code to get started"
Enter
Sleep 3s
