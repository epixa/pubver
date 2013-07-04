#!/usr/bin/env node

var pubver = require('../index')
  , color = require('colorful')
  , os = require('os');

var publishing = pubver({ tagMessageFormat: 'Version ${version}' });
var EOL = os.EOL;

console.log(
  EOL,
  "Publishing version " + color.green(publishing.version),
  "of module " + color.green(publishing.name),
  EOL
);

publishing.progress(function(progress){
  var msg = "";
  switch (progress) {
    case pubver.TAGGING:
      msg = color.cyan("Creating annotated git tag...");
      break;
    case pubver.PUBLISHING:
      msg = color.cyan("Publishing to npm...");
      break;
  }
  console.log("  . " + msg);
});

publishing.then(function(){
  console.log(
    EOL,
    "Version", color.green(publishing.version), "published successfully",
    EOL, EOL,
    "If you have a remote repo, you'll probably want to push this new tag now:",
    EOL, EOL,
    "  git push origin +refs/tags/" + publishing.version,
    EOL
  );
  process.exit(0);
});

publishing.fail(function(err){
  console.error(EOL, color.red("pubver failed:"), err, EOL);
  process.exit(1);
});
