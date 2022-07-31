Deno.readTextFileSync('.env').split('\n').map(line => line.trim().split('=')).filter(([ key, value ]) => key.length && value.length).forEach(([ key, value ]) => {
	const env = Deno.env.get(key)
	env ? console.warn(`Env already exists as: ${key}=${env}\nSkipping...`) : Deno.env.set(key, value)
})
