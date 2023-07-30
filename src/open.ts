import http from "http";
import path from "path";
import fs from "fs";
import mime from "mime";
import chokidar from "chokidar";
import { exec } from "child_process";

chokidar.watch(['html', 'template.ejs']).on('all', () => {
	exec("npm start");
	console.log("Update");
})

http.createServer((req, res) => {
	const file = path.join("public", req.url!!);
	const stat = fs.statSync(file, { throwIfNoEntry: false });
	if (!stat) {
		if (fs.statSync(file + '.html', { throwIfNoEntry: false })?.isFile()) {
			res.setHeader('content-type', 'text/html');
			res.end(fs.readFileSync(file + '.html'));
		}
		res.statusCode = 404;
		res.end();
	} else if (stat.isFile()) {
		if (mime.getType(file)) {
			res.setHeader('content-type', mime.getType(file)!!);
		}
		res.end(fs.readFileSync(file));
	} else if (stat.isDirectory()) {
		if (fs.statSync(path.join(file, 'index.html'), { throwIfNoEntry: false })?.isFile()) {
			res.setHeader('content-type', 'text/html');
			res.end(fs.readFileSync(path.join(file, 'index.html')));
		}
	} else {
		res.statusCode = 500;
		res.end("500");
	}
}).listen(80, '127.0.0.1')

console.log("http://127.0.0.1");