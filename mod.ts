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
		key = key.trimEnd().toUpperCase()
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

export function required(keys: string[]) {
	keys = keys.map(key => key.toUpperCase())
	const missing: string[] = []
	for (let i = 0; i < keys.length; ++i)
		if (!Deno.env.get(keys[ i ]))
			missing.push(keys[ i ])
	if (missing.length)
		throw `Missing Required Environmental Variables: ${missing.join(' | ')}`
}

export function defaults(env: Record<string, string>) {
	const list = Object.entries(env).map(([ key, value ]) => [ key.toUpperCase(), value ])
	for (let i = 0; i < list.length; ++i)
		if (!Deno.env.get(list[ i ][ 0 ]))
			Deno.env.set(list[ i ][ 0 ], list[ i ][ 1 ])
}
