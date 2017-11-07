var gulp = require('gulp'),
	runSequence = require('run-sequence'),
	rev = require('gulp-rev'),
	revCollector = require('gulp-rev-collector');

var css_url_one = 'static/css/*.css',
    css_url_two = 'static/css/about/*.css',
    css_url_three = 'static/css/help/*.css',
   

	js_url_one = 'static/js/*.js',
	js_url_two = 'static/js/about/*.js',
	js_url_three = 'static/js/help/*.js';
	


gulp.task('rev_css_one', function() {
	return gulp.src(css_url_one)
	.pipe(rev())
	.pipe(rev.manifest({
		pwd_base: 'css'				// 静态文件上一级目录名
	})).pipe(gulp.dest('rev/css'));// 文件存放目录
});

gulp.task('rev_css_two', function() {
	return gulp.src(css_url_two)
	.pipe(rev())
	.pipe(rev.manifest({
		pwd_base: 'about'
	})).pipe(gulp.dest('rev/css/about'));
});

gulp.task('rev_css_three', function() {
	return gulp.src(css_url_three)
	.pipe(rev())
	.pipe(rev.manifest({
		pwd_base: 'help'
	})).pipe(gulp.dest('rev/css/help'));
});


gulp.task('rev_js_one', function() {
	return gulp.src(js_url_one)
	.pipe(rev())
	.pipe(rev.manifest({
		pwd_base: 'js'
	})).pipe(gulp.dest('rev/js'));
});
gulp.task('rev_js_two', function() {
	return gulp.src(js_url_two)
	.pipe(rev())
	.pipe(rev.manifest({
		pwd_base: 'about'
	})).pipe(gulp.dest('rev/js/about'));
});
gulp.task('rev_js_three', function() {
	return gulp.src(js_url_three)
	.pipe(rev())
	.pipe(rev.manifest({
		pwd_base: 'help'
	})).pipe(gulp.dest('rev/js/help'));
});


gulp.task('rev_html_one', function() {
	return gulp.src(['rev/**/*.json','project/html/*.html'])
	.pipe(revCollector())
	.pipe(gulp.dest('project/html'));
});
gulp.task('rev_html_two', function() {
	return gulp.src(['rev/**/*.json','project/html/about/*.html'])
	.pipe(revCollector())
	.pipe(gulp.dest('project/html/help'));
});
gulp.task('rev_html_three', function() {
	return gulp.src(['rev/**/*.json','project/html/help/*.html'])
	.pipe(revCollector())
	.pipe(gulp.dest('project/html/help'));
});


gulp.task('dev', function(done) {
	// condition = false;
	// 任务队列
	runSequence(['rev_css_one'],['rev_css_two'],['rev_css_three'],
		['rev_js_one'],['rev_js_two'],['rev_js_three'],
		 ['rev_html_one'],['rev_html_two'],['rev_html_three'], done);
});

gulp.task('default', ['dev']);

