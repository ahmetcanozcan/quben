const gulp = require('gulp');
const ts = require('gulp-typescript');
const tsProject = ts.createProject('./tsconfig.json');
const del = require('del');

gulp.task('clean:output', function () {
  return del(['dist/']);
});

gulp.task('build', function () {
  return tsProject.src().pipe(tsProject()).js.pipe(gulp.dest('dist'));
});

gulp.task('default', gulp.series('clean:output', 'build'));
