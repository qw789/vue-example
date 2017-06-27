var work="app";
var gulp = require('gulp'),
		autoprefixer = require('gulp-autoprefixer'), //自动加前缀
		less = require("gulp-less"), //编译 less
		plumber = require('gulp-plumber'), //plumber是防止出错崩溃的插件
		browserSync = require('browser-sync'), //自动刷新
    LessPluginAutoPrefix = require("less-plugin-autoprefix"),//less自动加前缀
		reload = browserSync.reload;
// 任务处理的文件路径配置
// 如果你的文件层级比较深，您可以考虑使用 **（表示任意目录）匹配，任意目录下任意.css 或 .html文件。
var src={
	//
   thishtml:"./"+work+"/index.html",
	html:"./"+work+"/*.html",
	css:"./"+work+"/css/dist/*.css",
  csspath:"./"+work+"/css",
	js:"./"+work+"/js/*.js",
	less:"./"+work+"/css/dist/*.less",
	all:'**/*.**'
};
gulp.task('default',['browser-sync','myWatch'], function() {
  // 将你的默认的任务代码放在这
  console.log("run");
});

//less自动加上 css 前缀
var browsersList = new LessPluginAutoPrefix({
  browsers: [
    "ie >= 8",
    "ie_mob >= 10",
    "ff >= 26",
    "chrome >= 30",
    "safari >= 6",
    "opera >= 23",
    "ios >= 5",
    "android >= 2.3",
    "bb >= 10"
]});

/* 自动加上css前缀 */
gulp.task('autoprefixer', function() {
  return gulp.src(src.css)
      .pipe(plumber())
      .pipe(autoprefixer({
          browsers:["last 5 versions"],
          cascade:false}))
      .pipe(gulp.dest(src.csspath));
});

/* 防止出错崩溃  less 自动加上css前缀 */
gulp.task('lessADDpre', function() {
  return gulp.src(src.less)
  .pipe(plumber())
  .pipe(less({
    plugins: [browsersList]
  }))
  .pipe(gulp.dest(src.csspath))
  .pipe(reload({ stream:true }));//手动重载
});

gulp.task('browser-sync', function() {
  var files = [
  src.html,
  src.thishtml,
  src.csspath+"/*.css",
  src.js
  ];
 // browser: ["google chrome", "firefox"]
  browserSync.init(files,{
    server: {
    	//从应用程序目录中提供文件，指定特定文件名为索引
      	baseDir: "./",  //默认  "./"
      	index:"index.html"   //默认  "index.html"
    }
  });
});


gulp.task('myWatch', function() {
	gulp.watch(src.css,['autoprefixer']);
  gulp.watch(src.less, ['lessADDpre']);
});
