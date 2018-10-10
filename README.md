<h1><strong>HTML-Harvester:</strong> <br>Стартер для веб разработки основанный на Gulp.</h1>
<p>Автор билда: iWatchYouFromAfar <a href="https://urbancreations.ru/" target="_blank">Urban Creations</a><br/>


<h2>Установка:</h2>
<p>Перед началом работы, нужно установить Node.js, далее из папки проекта вызвать терминал и прописать следующие команды:</p>
<ul>
	<li><strong>ncu</strong>: Запускаем дефолтные таски (css, js, images, watch, browserSync) для веб разработки;;</li>
	<li><strong>ncu -a</strong>: Устанавливаем обновления, если таковые имеются;</li>
	<li><strong>npm i</strong>: Устанавливаем Node компоненты;</li>
</ul>

<h2>Как использовать:</h2>
<p>Перед началом и в процессе работы, в терминале нужно прописывать следующие Gulp tasks:</p>
<ul>
	<li><strong>gulp</strong>: Запускаем дефолтные таски (css, js, images, watch, browserSync) для веб разработки;</li>
	<li><strong>gulp images</strong>: Оптимизация всех изображений в папке app/images и транспортировка их в папку dist/images</li>
	<li><strong>gulp clean</strong>: Очистка папки dist кроме папки с изображениями;</li>
  <li><strong>gulp build</strong>: Транспортировка всех оптимизированных файлов (css, js, fonts, html) в папку dist;</li>
</ul>

<h2>Особенности:</h2>
<p>Перед началом работы, в терминале нужно прописать следующие Gulp tasks:</p>
<ul>
	<li><strong>_vars.sass</strong>: Файл с переменными;</li>
	<li><strong>_fonts.sass</strong>: Файл в котором подключаем шрифты (работает на основе миксина /_mixins/_font-face.sass);</li>
	<li><strong>_libs.sass</strong>: Файл который подключает css библиотеки (js библиотеки подключаются в gulpfile.js, в одномименном таске);</li>
	<li><strong>/_mixins/_placeholder.sass</strong>: Миксин для быстрой стилизации плейсхолдеров;</li>
  	<li><strong>/_mixins/_transition.sass</strong>: Миксин для быстрой стилизации транзишн;</li>
	 <li><strong>/_mixins/_media.sass</strong>: Миксин с медиа запросами, можно развить на свой вкус;</li>
</ul>

<h2>HTML-Harvester включает в себя:</h2>
<h3>Библиотеки:</h3>
<ul>
	<li><strong>Bootstrap 4.1.3</strong>: SCSS исходники;</li>
	<li><strong>Eric Meyer reset</strong>: Файл сброса стилей от Эрика Мейера в SASS препроцессоре;</li>
	<li><strong>Normalize 8.0.0</strong>: Файл оформления стилей в разных браузерах к одному виду в в SASS препроцессоре;</li>
</ul>

<h2>Правила пользования стартером HTML-Harvester</h2>
<ol>
	<li>Стартер использует <strong>Sass</strong> синтаксис;</li>
	<li>Если в файлах <strong>SASS</strong>, присутствую non-ASCII символы, то в CSS будет автоматически добавляться @charset. При работе в разных файлах, в style.min.css будет компилиться по одному @charset из каждого <strong>SASS</strong> файла. Учтите это и проверяйте ваш CSS на ошибки;</li>
	<li>Добавлять или удалять CSS/SCSS/SASS библиотеки можно в файле sass/_libs.sass;</li>
	<li>Добавлять или удалять JS библиотеки можно в файле gulpfile.js, в одномименном таске;</li>
	<li>Все SASS переменные размещать в <strong>app/sass/_vars.sass | app/sass/_vars.sass</strong>;</li>
	<li>Все кастомные JS скрипты размещать в файле <strong>app/js/common.js</strong>;</li>
</ol>
