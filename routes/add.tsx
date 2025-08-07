import { Handlers, PageProps } from "$fresh/server.ts";
import { AddForm } from "../islands/AddForm.tsx";
import { Times } from "../islands/Times.tsx";
import { TopPortal } from "../islands/TopPortal.tsx";

export const handler: Handlers = {
  async GET(_, ctx) {
    return await ctx.render();
  },
  async POST(req, _) {
    const form = await req.json();
    console.log(form)
    // const name = form."name"?.toString();
    // const days = form.get("days")?.toString();
    // const description = form.get("description")?.toString();
    let temp = ""
    const uuid = uuidv4()
    if (form.desc != undefined && form.name != undefined && form.days != undefined) {    
        temp+="name:"+form.name+"\n";
        temp+="days:"+form.days+"\n";
        temp+="description:"+(form.desc
            .replaceAll("\r","")
            .replaceAll("\n","\\n")
            // .replaceAll("&", "&amp;")
            // .replaceAll("<", "&lt;")
            // .replaceAll(">", "&gt;")
            // .replaceAll('"', "&quot;")
            // .replaceAll("'", "&#39;")
            // .replaceAll(":", "&#58;")
        )+"\n";
        temp+="id:"+uuid+"\n";
    }
    if (form.fileContents != undefined) {
        Deno.writeFile("./static/user/"+uuid+"."+form.fname, dataURLtoFile(form.fileContents))
        temp+="img:"+uuid+"."+form.fname+"\n"
    }
    Deno.writeTextFile("./db/"+uuid+".def", temp)

    // console.log(form.get("file"))

    // console.log(temp)

    // Redirect user to main page (so we don't have to rerender).
    const headers = new Headers();
    headers.set("location", "/");
    return new Response(null, {
      status: 303, // See Other
      headers,
    });
  },
};

// https://stackoverflow.com/a/2117523
function uuidv4() {
  return "P"+("10000000-1000-4000-8000-100000000000".replace(/[018]/g, c =>
    (+c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> +c / 4).toString(16)
  ).replaceAll("-", "_"));
}

export default function Greet(_props: PageProps) {
  return (<div>
    <TopPortal exit_click={false} title="Add Plant">
        <a class="top_right icon" href="/">
            {"\ue903"}
        </a>
        <AddForm />
    </TopPortal>
  </div>)
}

function dataURLtoFile(dataurl: URL) {
    var arr = dataurl.split(','),
        mime = arr[0].match(/:(.*?);/)[1],
        bstr = atob(arr[arr.length - 1]),
        n = bstr.length,
        u8arr = new Uint8Array(n);
    while (n--) {
        u8arr[n] = bstr.charCodeAt(n);
    }
    return u8arr
}