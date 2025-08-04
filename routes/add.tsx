import { Handlers, PageProps } from "$fresh/server.ts";
import { AddForm } from "../islands/AddForm.tsx";
import { Times } from "../islands/Times.tsx";
import { TopPortal } from "../islands/TopPortal.tsx";

export const handler: Handlers = {
  async GET(_, ctx) {
    return await ctx.render();
  },
  async POST(req, _) {
    const form = await req.formData();
    const name = form.get("name")?.toString();
    const days = form.get("days")?.toString();
    const description = form.get("description")?.toString();
    let temp = ""

    if (description != undefined) {    
        temp+="name:"+name+"\n";
        temp+="days:"+days+"\n";
        temp+="description:"+(description.replaceAll("\r","").replaceAll("\n","\\n"))+"\n";
        temp+="id:"+uuidv4()+"\n";
    }

    console.log(form.get("file"))

    console.log(temp)

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
  return "10000000-1000-4000-8000-100000000000".replace(/[018]/g, c =>
    (+c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> +c / 4).toString(16)
  );
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
