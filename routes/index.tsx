import { useSignal } from "@preact/signals";
import { Card } from "../islands/Card.tsx";
import { Partial } from "$fresh/runtime.ts";
import { list_defs_sync, read_def_sync } from "../db.ts";
import { Selector } from "../islands/Selector.tsx";
import { Times } from "../islands/Times.tsx";
import { Header } from "../islands/Header.tsx";
import { TopPortal } from "../islands/TopPortal.tsx";

export default function Home() {
    const cards: any[] = []
    const select_from = new Map()

    for (const path of list_defs_sync()) {
        const pairs = read_def_sync(path)

        const image = pairs.get("img")
        let img
        if (image != undefined) {
            img = "./user/"+image[0]
        }

        cards.push((<Card 
            name={(pairs.get("name") || [""])[0]}
            // icon={((+(pairs.get("img")||"")) || [undefined])[0]}
            icon = {img}
            open={{id:"page",select:(pairs.get("id") || ["invalid"])[0]}}
            tag={(pairs.get("days")||[""])[0]}
        />))

        select_from.set((pairs.get("id") || ["invalid"])[0],
            <div>
                <div style="float: right;">
                    {img!=undefined?
                        <div class="image_controls">
                            <img src={"./user/"+(pairs.get("img") || [undefined])[0]} style="width: 200px;"></img>
                            <div class="image_controls_holder">
                                <div>{(pairs.get("name") || [""])[0]}</div>
                            </div>
                        </div>
                    : ""}
                    <div style="float: right; margin-right:10px;">
                        <Times days={(pairs.get("days")||[""])[0]} />
                    </div>
                </div>

                {frez((pairs.get("description")||[""])[0])}
            </div>
        )
    }

    return (
        <div class="container">
            <div class="sidebar">
                {cards}
            </div>
            <Header title="Select A Plant :)" id="page" route="/add"/>
            <div class="body">
                <Selector id="page" sub={select_from} def={(<div id="invalid">
                    Select a plant or add one
                </div>)}/>
            </div>
        </div>
    );
}

function frez(inp: string) {
    const assembled = []
    
    for (const line of inp.split("\\n")) {
        if (line.startsWith("##")) assembled.push((<h2>{line.slice(2).trim()}</h2>)) 
        else
        if (line.startsWith("#")) assembled.push((<h1>{line.slice(1).trim()}</h1>))
        else assembled.push(line)
    }

    return (assembled)
}