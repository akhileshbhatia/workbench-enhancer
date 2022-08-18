const manifest = {
  "name": "Workbench Enhancer Beta",
  "version": "0.1.5",
  "manifest_version": 2,
  "description": "An extension to add much needed improvements to Salesforce Workbench",
  "icons": {
    "16": "icons/icon16.png",
    "48": "icons/icon48.png",
    "128": "icons/icon128.png"
  },
  "permissions": [
    "storage"
  ],
  "background": {
    "scripts": [
      "background.js"
    ],
    "persistent": false
  },
  "content_scripts": [
    {
      "matches": [
        "https://workbench.developerforce.com/query.php*",
        "https://workbench.developerforce.com/execute.php*",
        "https://workbench.developerforce.com/search.php*"
      ],
      "css": [
        "styles/bootstrap.css",
        "styles/extension.css"
      ],
      "js": [
        "scripts/jquery.min.js",
        "scripts/bootstrap.min.js",
        "scripts/angular.min.js",
        "scripts/angular-route.min.js",
        "scripts/angular-animate.min.js",
        "scripts/bootstrap-tpls.min.js",
        "js/init.js"
      ]
    },
    {
      "matches": [
        "https://workbench.developerforce.com/login.php*"
      ],
      "css": [
        "styles/bootstrap_mod.css"
      ],
      "js": [
        "scripts/jquery.min.js",
        "js/login.js"
      ]
    }
  ],
  "content_security_policy": "script-src 'self' 'unsafe-eval'; object-src 'none'",
  "web_accessible_resources": [
    "views/base.html",
    "views/allData.html",
    "views/temp.html",
    "fonts/*",
    "icons/*"
  ]
}
module.exports = manifest;
