export const server = (done, port) => {
	app.plugins.browsersync.init({
		server: {
			baseDir: `${app.path.build.html}`,
		},
		notify: false,
		port: port ? port : 3000,
	})
}
