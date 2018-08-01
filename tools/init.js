// import
import fs from 'fs'
import prompt from 'prompt'
import colors from 'colors/safe'

// folder path
const root_path = __dirname.split('tools')[0]

// file path
const package_path = `${root_path}package.json`
const md_path = `${root_path}README.md`

// function for rename the app
function rename(name, reg, path) {
	const curPath = path
	if (fs.statSync(curPath).isFile()) {
		const contents = fs.readFileSync(curPath).toString()
		const newContents = contents.replace(reg, name)
		fs.writeFileSync(curPath, newContents)
	}
}

// start
function start(name, description) {
	// const new_root_path = root_path.replace(/Node-Builder/ig, name)
	
	// file rename
	rename(name, /# Node-Builder/g, md_path)
	rename(description, /quickstart in node with express && ejs && mongodb/g, md_path)

	rename(name, /Node--Builder/g, package_path)
	rename(description, /simple start in express/g, package_path)

	// fs.renameSync(`${root_path}`, `${new_root_path}`)

	console.info('\x1B[36m', '----- file rename is complete -----\n')

	console.info('\x1B[32m', '----- success, It is all complete -----\n')
	console.info('\x1B[33m', '***** please run step by step on cmd *****\n')
	console.info('\x1B[40m\x1B[90m%s\x1B[39m\x1B[49m', `>>>>>>> cd ./${name}\n`)
	console.info('\x1B[40m\x1B[90m%s\x1B[39m\x1B[49m', '>>>>>>> npm i && npm run release && npm run dev\n')
}

// prompt
function promptGet() {
	const schema = {
		properties: {
			'project-name': {
				pattern: /^[a-zA-Z]{2,30}$/ig,
				description: colors.green('Tips: Demo'),
				message: colors.yellow('请看Tips'),
				required: true,
			},
			'description': {
				pattern: /^[\u4E00-\u9FA5]{3,30}$/ig,
				description: colors.green('Tips: 请输入中文描述'),
				message: colors.yellow('请输入中文描述'),
				required: true,
			},
		},
	}
	prompt.delimiter = colors.green(' >> ')
	prompt.start()
	prompt.get(schema, (err, res) => {
		start(res['project-name'], res.description)
	})
}

promptGet()
