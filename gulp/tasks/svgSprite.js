import svgSprite from 'gulp-svg-sprite'
import cheerio from 'gulp-cheerio'
import replace from 'gulp-replace'
import svgmin from 'gulp-svgmin'

export const mySvgSprite = () => {
	return app.gulp
		.src(app.path.src.svgicons, {})
		.pipe(
			app.plugins.plumber(
				app.plugins.notify.onError({
					title: 'SVG',
					message: 'Error: <%= error.message %>',
				})
			)
		)
		.pipe(
			svgmin({
				js2svg: {
					pretty: true,
				},
			})
		)
		.pipe(
			cheerio({
				run: function ($) {
					$('[fill]').removeAttr('fill')
					// $('[stroke]').removeAttr('stroke')
					$('[style]').removeAttr('style')
				},
				parserOptions: { xmlMode: true },
			})
		)
		.pipe(replace('&gt;', '>'))
		.pipe(
			svgSprite({
				mode: {
					symbol: {
						sprite: 'sprite.svg',
					},
				},
			})
		)
		.pipe(app.gulp.dest(app.path.build.images))
}
