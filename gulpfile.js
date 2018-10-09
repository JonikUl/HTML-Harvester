var gulp          = require('gulp'), // Подключаем Gulp в нашем файле
    sass          = require('gulp-sass'), // Подключаем компилятор Sass в CSS
    browserSync   = require('browser-sync'), // Подключаем живую перезагрузку с помощью Browser Sync
    concat        = require('gulp-concat'), // Подключаем пакет для конкатенации файлов
    autoprefixer  = require('gulp-autoprefixer'), // Подключаем пакет автоматических префиксов в CSS
    uglify        = require('gulp-uglify'), // Подключаем пакет минификации js файлов
    cleanCSS      = require('gulp-clean-css'), // Подключаем пакет минификации css файлов
    notify        = require("gulp-notify"), // Подключаем пакет минификации css файлов
    imagemin      = require('gulp-imagemin'), // Подключаем пакет минификации изображений
    cache         = require('gulp-cache'), // Подключаем пакет для оптимизации сжатия изображений
    runSequence   = require('run-sequence'), // Подключаем пакет последовательности задач
    del           = require('del'); // Подключаем пакет минификации очистки/удаления автоматически сгенерируемых файлов в папке dist

// Задача работы с SASS и CSS фалайами
gulp.task('css', function(){
  return gulp.src('app/sass/**/*.sass') // Получаем все файлы с окончанием .sass в папке app/scss и дочерних директориях
  .pipe(sass({ outputStyle: 'expand' }).on("error", notify.onError())) // Конвертируем Sass в CSS с помощью gulp-sass. Пакет notify покажет в консоле ошибку и не остановит работу галпа.
  .pipe(autoprefixer(['last 15 versions'])) // Проставляет последние 15 версий автопрефиксов
  .pipe(concat('styles.css')) // Все файлы SASS переименовываем в один styles.css
  .pipe(cleanCSS({compatibility: 'ie8'})) // Минифицируем CSS
  .pipe(gulp.dest('app/css')) // Транспортируем сжатый css файл в папку app/css
  .pipe(browserSync.reload({ stream: true })) // Теперь Browser Sync может вставлять новые стили в страницу браузера (обновлять CSS)
});

// Задача работы с JS фалайами
gulp.task('js', function() {
	return gulp.src([ // Массив с js файлами, которые поступят в обработку таска
  'app/libs/jquery/jquery.min.js', // jquery 3.3.1
  'app/js/common.js' // Всегда в конце
  ])
  .pipe(concat('scripts.min.js')) // Все JS файлы переименовываем в один scripts.min.js
  // .pipe(uglify()) // Минифицируем js (опционально)
  .pipe(gulp.dest('app/js')) // Транспортируем  сжатый js файл в папку app/js
  .pipe(browserSync.reload({ stream: true })) // Теперь Browser Sync может вставлять новые JS скрипты в страницу браузера (обновлять JS)
});

// Задача работы с изображениями
gulp.task('images', function(){
  return gulp.src('app/images/**/*.+(png|jpg|gif|svg)') // // Расширения изображений, которые поступят в обработку таска
  .pipe(imagemin()) // Минифицируем изображения
  .pipe(gulp.dest('dist/images')) // Транспортируем оптимизированные в папку dist/images
});

// Задача browserSync, поднятие сервера
gulp.task('browserSync', function() {
  browserSync({
 server: { // Поднимаем сервер
 baseDir: 'app' // Задаем корневую папку
 },
  })
})

/* 
1. Для живой перезагрузки нужно одновременно запустить две задачи, watch и browserSync.
2. И чтобы наш CSS был самой новой версии, необходимо, чтобы sass запускался перед watch.
*/
gulp.task('watch', ['browserSync', 'css', 'js', 'images'], function (){
  // Следим за всеми Sass файлами и запускаем задачу sass при любом изменении
  gulp.watch('app/sass/**/*.sass', ['css']);
  // Обновляем браузер при любых изменениях в HTML или JS
  gulp.watch(['libs/**/*.js', 'app/js/common.js'], ['js']);
  gulp.watch('app/*.html', browserSync.reload); 
  // другие ресурсы
})

// Задача для запуска всех задач в командой строке с помощью команды gulp при старте работы со сборщиком.
gulp.task('default', function (callback) {
  runSequence(['css','js','images','browserSync', 'watch'],
    callback
  )
})

// Задача для удаления всех файлов в папке dist
gulp.task('clean', function(callback) {
  del(['dist/**/*', '!dist/images', '!dist/images/**/*'], callback)
  return cache.clearAll(callback);
})

// Перемещаем css файлы из папки 'app/css' в 'dist/css'
gulp.task('css-build', function() {
  return gulp.src('app/css/**/*.css')
  .pipe(gulp.dest('dist/css'))
})

// Перемещаем шрифты из папки 'app/fonts' в 'dist/fonts'
gulp.task('fonts-build', function() {
  return gulp.src('app/fonts/**/*')
  .pipe(gulp.dest('dist/fonts'))
})

// Перемещаем js файл scripts.min.js из папки 'app/js' в 'dist/js'
gulp.task('js-build', function() {
  return gulp.src('app/js/scripts.min.js')
  .pipe(gulp.dest('dist/js'))
})

// Перемещаем html файлы из папки 'app' в 'dist'
gulp.task('html-build', function() {
  return gulp.src('app/*.html')
  .pipe(gulp.dest('dist'))
})

// Задача постройки готового шаблона в папке dist.
gulp.task('build', function (callback) {
  runSequence('clean', // Сначала очищаем папку dist всю, кроме изображений
  ['css-build', 'fonts-build', 'js-build','html-build'], // Затем в любой последовательности выполняем таски постройки папки dist
 callback
  )
})