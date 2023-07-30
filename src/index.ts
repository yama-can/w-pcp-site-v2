import fs from "fs";
import ejs from "ejs";
import path from "path";

(async () => {
	let dirs: string[] = [];

	dirs = fs.readdirSync("./html");

	for (let i = 0; i < dirs.length; i++) {
		dirs[i] = path.join('html', dirs[i]);

		if (fs.statSync(dirs[i]).isDirectory()) {
			dirs = dirs.concat(fs.readdirSync(dirs[i]).map((file) => path.join(dirs[i], file).replace(/^html\//, "")));
			console.log(dirs);
			continue;
		}

		const distFile = dirs[i].replace(/^html/, "public");

		fs.mkdirSync(path.join(distFile, '../'), { recursive: true });

		if (dirs[i].endsWith('.html')) {
			let html = fs.readFileSync(dirs[i], 'utf-8');
			const title = html.match(/<title>(.*)<\/title>/);
			let head = `<title>${(title ? title[1] : "早稲田PCプログラミング部")}</title>\n`;
			const metas = html.matchAll(/<meta (.*)>/g);
			let meta = metas.next();
			while (!meta.done) {
				head += meta.value[0];
				html = html.replace(meta.value[0], "");
				meta = metas.next();
			};
			fs.writeFileSync(distFile, await ejs.renderFile('./template.ejs', { data: html.replace(/<title>.*<\/title>/g, ""), head, title: (title ? title[1] : "早稲田PCプログラミング部") }));
		} else if (dirs[i].endsWith('.htm')) {
			fs.copyFileSync(dirs[i], distFile.replace(/.htm$/, ".html"));
		} else {
			fs.copyFileSync(dirs[i], distFile);
		}
	}
})().then(() => {
	process.exit(0);
});