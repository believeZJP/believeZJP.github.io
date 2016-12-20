/**
 * 一、定义插件
 * ****/

var gulp = require('gulp'),	//本地安装的gulp
//	  less = require('gulp-less'),//编译less
	  cleanCSS = require('gulp-clean-css'),//压缩css
	  cleanDest = require('gulp-clean-dest'),//清除目标文件中的所有内容
	  rev = require('gulp-rev'),//给文件添加版本号
//	  revCollector = require('gulp-rev-collector'),//替换html中的文件名
	  revAppendAll = require('gulp-rev-append-all'),//gulp plugin for cache-busting files using query string file hash
//	  clean = require('gulp-clean'),//清空文件夹，避免文件冗余
	  runSequence = require('run-sequence')//执行顺序，避免上一个任务未完成就开始执行下一个任务
	  
	  ;



//gulp.src(['./src/**/*','!./src/**/less/**/*'])



//将html中js和css后缀添加版本号 eg:style.css---> style.css?v=123
gulp.task('revAppendAll', function(){
	gulp.src('./src/*.html')
		.pipe(revAppendAll())
		.pipe(gulp.dest('./dest'));//将文件生成到指定目录下。
//		.pipe(gulp.dest('.'));//文件在原文件中
});

//Static asset revisioning by appending content hash to filenames: unicorn.css => unicorn-d41d8cd98f.css
//静态文件添加版本号eg:main.css=> main-fwer34.css
gulp.task('rev', function(){
	/*gulp.src('./src/css/*.css')
		.pipe(gulp.dest('dest/css'))
		.pipe(rev())
		.pipe(gulp.dest('dest/css'))
		.pipe(rev.manifest())//对应的版本号和原始文件用json表示出来
		.pipe(gulp.dest('./dest'));
	*/
	gulp.src(['src/css/*.css', 'src/js/*.js'], {base: 'src'})
        .pipe(gulp.dest('dest'))  //将源文件直接拷贝到目标文件中
        .pipe(rev())
        .pipe(gulp.dest('dest'))  //将添加了版本号的文件添加到目标文件中 
        .pipe(rev.manifest())
        .pipe(gulp.dest('dest')); // 更新 manifest 
	
	
});



//整理css文件，并生成到指定目录中{}
gulp.task('cleanCss', function(){
	gulp.src('./src/css/*.css')
		.pipe(cleanCSS({debug: true}, function(details) {
            console.log(details.name + ': ' + details.stats.originalSize);
            console.log(details.name + ': ' + details.stats.minifiedSize);
        })
		)
		.pipe(gulp.dest('./dest/css'));
});

//清除生成目标文件中的所有内容
//src的第二个参数的{read:false}，是不读取文件加快程序。
gulp.task('cleanDest', function(){
//	gulp.src('dest/').pipe(cleanDest('dest')); //错误，不能删除文件夹，只能删除里边的内容
//	gulp.src('dest/*',{read: false}).pipe(cleanDest('dest'));// 错误，不能自动识别文件夹以下的文件
//	gulp.src(['dest/*.html','./dest/css/*.css'],{read: false}).pipe(cleanDest('dest'));
//	gulp.src('dest/css/*.css',{read: false}).pipe(cleanDest('dest/css',{extension: '.css'}));
	gulp.src('dest/css/*.css',{read: false}).pipe(cleanDest('dest/css'));
	gulp.src('dest/*.html',{read: false}).pipe(cleanDest('dest'));
	gulp.src('dest/js/*.js',{read: false}).pipe(cleanDest('dest/js'));
	gulp.src('dest/*.json',{read: false}).pipe(cleanDest('dest'));
	
});


//执行默认 任务
gulp.task('default', function(){
	//默认任务放在这里
	
	//按照顺序执行以下文件
	runSequence(
		'revAppendAll',
		'cleanCss'
	);
	
});

/***
 * 运行gulp: 默认default中的任务会执行
 * 要单独执行某个任务，运行gulp <task> <other task>
 * 
 */