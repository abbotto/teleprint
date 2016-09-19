var gulp = require("gulp");
var bump = require("gulp-bump");
var jsdoc = require("gulp-jsdoc3");
var rename = require("gulp-rename");
var include = require("gulp-include");
var version = require("gulp-inject-version");

// Paths
var paths = {
	javascript: ["./src/**/*.js"]
};

// Versioning
gulp.task("bump-major", function () {
	gulp.src(["./bower.json", "./package.json"])
		.pipe(bump({ type: "major" }))
		.pipe(gulp.dest("./"));
});

gulp.task("bump-minor", function () {
	gulp.src(["./bower.json", "./package.json"])
		.pipe(bump({ type: "minor" }))
		.pipe(gulp.dest("./"));
});

gulp.task("bump-patch", function () {
	gulp.src(["./bower.json", "./package.json"])
		.pipe(bump({ type: "patch" }))
		.pipe(gulp.dest("./"));
});

gulp.task("compile-docs", function (cb) {
	console.log("-- gulp is running task 'compile-docs'");
	var config = require("./jsdoc.json");
	gulp.src(["./src/module.js", "./src/components/**/*.js"], { read: false })
		.pipe(jsdoc(config, cb));
});

gulp.task("compile-scripts", ["compile-docs"], function () {
	console.log("-- gulp is running task 'compile-scripts'");
	gulp.src("./src/module.js")
		.pipe(include())
		.pipe(version())
		.pipe(rename("teleprint.js"))
		.on("error", console.log)
		.pipe(gulp.dest("./"));
});

gulp.task("compile-tests", function () {
	console.log("-- gulp is running task 'compile-tests'");
	gulp.src("./tests/tasks.js")
		.pipe(include())
		.pipe(rename("test.js"))
		.on("error", console.log)
		.pipe(gulp.dest("./tests"));
});

// WATCH FILES FOR CHANGES
gulp.task("watch", function () {
	gulp.watch(paths.javascript, ["compile-scripts"]);
});

// Generates documentation and dist/teleprint.js
gulp.task("default", ["compile-scripts"]);