#!/usr/bin/env node
"use strict";
// Generated runtime-specific entry point; maintained logic stays in the skill.
process.exitCode = require("../__SKILL_DIRECTORY__/shared-investigations/scripts/investigations.cjs").main();
