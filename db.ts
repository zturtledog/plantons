export async function list_defs() : Promise<string[]> {
    const arr = []
    for await (const entry of Deno.readDir("./db/")) {
        if (entry.isFile) {
            arr.push(entry.name)
        }
    }
    return arr
}

export async function read_def(path: string) : Promise<Map<string,string[]>> {
    const map = new Map();
    for (const line of (await Deno.readTextFile("./db/"+path)).replaceAll("\r","").split("\n")) {
        if (line.includes(":")) {
            const kv = line.split(":",2)
            const k = kv[0].trim()
            const v = kv[1].trim()
            if (map.has(k)) {
                const values = map.get(k)
                values.push(v)
                map.set(k,values)
            } else {
                map.set(k, [v])
            }
        }
    }
    return map
}

export function list_defs_sync() : string[] {
    const arr = []
    for (const entry of Deno.readDirSync("./db/")) {
        if (entry.isFile) {
            arr.push(entry.name)
        }
    }
    return arr
}

export function read_def_sync(path: string) : Map<string,string[]> {
    const map = new Map();
    for (const line of (Deno.readTextFileSync("./db/"+path)).replaceAll("\r","").split("\n")) {
        if (line.includes(":")) {
            const kv = line.split(":",2)
            const k = kv[0].trim()
            const v = kv[1].trim()
            if (map.has(k)) {
                const values = map.get(k)
                values.push(v)
                map.set(k,values)
            } else {
                map.set(k, [v])
            }
        }
    }
    return map
}

export function read_file_sync(path: string) : Uint8Array<ArrayBuffer> {
    return Deno.readFileSync("./db/"+path) 
}

export function read_text_file_sync(path: string) : string {
    return Deno.readTextFileSync("./db/"+path) 
}