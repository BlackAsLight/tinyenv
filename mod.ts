{
	const lines = Deno.readTextFileSync('.env').split('\n')
	let line: string
	for (let i = 0; i < lines.length; ++i) {
		line = lines[ i ].trim()
		if (!line.length || line[ 0 ] === '#')
			continue

		let [ key, value ] = line.split('=') as [ string, string | undefined ]
		if (!key.length) {
			console.warn(value
				? `Env value ${value.trimStart()} is missing a key.\nSkipping...`
				: `Line ${i + 1} has random \`=\` symbol on it.`)
			continue
		}
		key = key.trimEnd()
		if (value == undefined) {
			console.warn(`Env key ${key} is missing a value.\nSkipping...`)
			continue
		}

		const env = Deno.env.get(key)
		env
			? console.warn(`Env already exists as: ${key}=${env}\nSkipping...`)
			: Deno.env.set(key, value.trimStart())
	}
}
