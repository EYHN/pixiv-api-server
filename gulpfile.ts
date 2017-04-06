import * as gulp from "gulp"
import * as ts from "gulp-typescript"
import * as babel from "gulp-babel"
import * as sourcemaps from "gulp-sourcemaps"
import * as path from "path"
const tsProject = ts.createProject("tsconfig.json");

gulp.task('default', ['build'], function () {
})

gulp.task('build', function () {
  return gulp.src('src/**/*.ts')
    .pipe(sourcemaps.init())
    .pipe(tsProject())
    .pipe(babel({
      presets: ['es2015', 'stage-2']
    }))
    .pipe(sourcemaps.write('.', {
      includeContent: false,
      sourceRoot: function (file: any) {
        if (file.sourceMap.sources.length >= 1) {
          var nums = file.sourceMap.sources[file.sourceMap.sources.length - 1].match(/\//g).length
          nums -= 4;
          var res = ""
          if (nums > 0) {
            for (let i = 0; i < nums; i++) {
              res += "../"
            }
          }
          return res;
        }
      }
    }))
    .pipe(gulp.dest("dist"));
})

gulp.task('watch', function () {
  gulp.watch('src/**/*', ['build']);
});

gulp.task('dev',['build','watch'],function(){
  
})