import fs from "fs";
import path from "path";

(async () => {
	let dirs = fs.readdirSync("w-pcp-site-v0/public").map((value) => path.join('w-pcp-site-v0/public', value));
	for (let i = 0; i < dirs.length; i++) {
		const stat = fs.statSync(dirs[i])
		if (stat.isDirectory()) {
			dirs = dirs.concat(fs.readdirSync(dirs[i]).map((value) => path.join(dirs[i], value)));
			continue;
		}
		if (stat.isFile()) {
			fs.mkdirSync(path.join(dirs[i].replace(/w-pcp-site-v0\/public/, "w-pcp-site-v0/dist"), ".."), { recursive: true });
			if (dirs[i].endsWith('.html.json')) continue;
			if (dirs[i].endsWith('.html')) {
				if (dirs[i].endsWith('.meta.html') || dirs[i].endsWith('.html.out.html')) continue;
				console.log(dirs[i]);
				const html = fs.readFileSync(dirs[i], 'utf-8');
				const json = JSON.parse(fs.readFileSync(dirs[i] + ".json", 'utf-8'));
				const meta = fs.readFileSync(dirs[i].replace(/\.html$/, ".meta.html"), 'utf-8');
				fs.writeFileSync(dirs[i].replace(/w-pcp-site-v0\/public/, "w-pcp-site-v0/dist"), `<title>${json.title}</title>
				<meta name="keywords" content="PCP,早稲田中学,プログラミング部,${(json.keywords as string[]).filter(Boolean).join(',')}">
				<meta name="description" content="${json.description}">
				<meta property="og:description" content="${json.description}">
				<meta property="og:title" content="${json.title}">
				${meta}
				${html}`);
			} else if (dirs[i].endsWith('.htm')) {
				fs.copyFileSync(dirs[i], dirs[i].replace(/w-pcp-site-v0\/public/, "w-pcp-site-v0/dist").replace(/\.htm$/, ".html"));
			} else {
				fs.copyFileSync(dirs[i], dirs[i].replace(/w-pcp-site-v0\/public/, "w-pcp-site-v0/dist"));
			}
		}
	}
	console.log(dirs);
})();