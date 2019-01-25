// // require 引入模块
// var gulp = require('gulp');
// var uglify = require('gulp-uglify');//压缩
// var concat = require('gulp-concat');//合并
// var rename = require('gulp-rename');//重命名
// const babel = require('gulp-babel');//转码es6-->es5
// connect = require('gulp-connect');//启动服务器
// const rev = require('gulp-rev');//生成哈希字符串，拼到文件名后面
// var revCollector = require('gulp-rev-collector');
// var del = require('del');//删除
// // var minify = require('gulp-minify');

// //task
// //创建一个任务
// //在cmd中执行任务 gulp + 任务名
// //src()查找文件
// //.pipe()下一步
// //.dest 文件输出

// //创建一个任务
// gulp.task('default', ['minijs', 'minihtml', 'watch', 'connect']);
// //压缩js
// gulp.task('minijs', function() {
//   gulp.src('app/**/*.js')
//   .pipe(babel({
//     presets: ['@babel/env']
// }))
//   // .pipe(concat('all.js'))//先合并再压缩
//   .pipe(uglify())
//   .pipe(rev())
//   // .pipe(rename({
//   //   //添加后缀
//   //   suffix: ".min",
//   // }))
//   .pipe(gulp.dest('dist'))//输出
//   .pipe(rev.manifest())//生成对应的路径json文件
//   .pipe(gulp.dest('rev/js'))
//   .pipe(connect.reload());//自动刷新
//   // 可以再次合并文件, 给文件重命名
//   // .pipe(concat('all.min.js'))
//   // .pipe(gulp.dest('dist'))
// })
// //合并
// // gulp.task('concatjs', function() {
// //   gulp.src('app/static/**/*.js')
// //   .pipe(concat('all.js'))
// //   .pipe(gulp.dest('dist'))
// // })
// gulp.task('minihtml', function() {
//   gulp.src(['rev/**/*.json','app/**/*.html'])
//   .pipe(revCollector())
//   .pipe(gulp.dest('dist'))
//   .pipe(connect.reload());
// })
// // gulp.task('minicss', function() {
// //     console.log('我要开始压缩css');
// // })
// // gulp.task('miniimage', function() {
// //     console.log('我要开始压缩image');
// // })
// gulp.task('watch', function() {
//   gulp.watch('app/**/*.html', ['minihtml'])
//   gulp.watch('app/**/*.js', ['minijs'])
// })

// // 开启服务器
// gulp.task('connect', function() {
//     connect.server({
//         root: 'dist',
//         port: '7777',
//         livereload: true
//     });
//   });


// //删除
// // gulp.task('clean',() => {
// //   del(['dist'])
// // })




//简易版本
//require 引入模块
var gulp = require('gulp');
var  connect = require('gulp-connect');
var del = require('del');
var sass = require('gulp-sass');
sass.compiler = require('node-sass');
var runSequence = require('run-sequence');//解决同步异步问题

//监听
gulp.task('watch', function() {
  gulp.watch('app/**/*.*', ['all','sass'])
})
//开启服务器
gulp.task('connect', function() {
  connect.server({
    root: 'dist',
    port: '7777',
    livereload: true
  });
});
//清空
gulp.task('clean', () => {
  del(['dist', 'rev'])
})
//自动刷新
gulp.task('all', function() {
  gulp.src(['app/**/*.*', '!app/static/**/*.scss'])
  .pipe(gulp.dest('dist'))
  .pipe(connect.reload())

})
//sass转css
gulp.task('sass', function () {
  return gulp.src('app./static/css/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('dist/static/css'));
});
//开发环境使用
gulp.task('dev', function() {
  runSequence('clean',
    'all',
    'sass',
    'connect',
    'watch');
  });
//正式环境使用
//压缩html，css，image
// gulp.task('release',[]);