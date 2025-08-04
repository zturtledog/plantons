import { Times } from "./Times.tsx";

interface HeaderProps {
  title: string,
  id: string,
  route: string
}

export function Header(props: HeaderProps) {
  return (
    <div class="header">
        <h1 class="header_segment" style="width:100%">{props.title}</h1>
        {/* <div class="icon">{"\ue900"}</div> */}
        <a class="icon" href={props.route}>{"\ue901"}</a>
        <div class="icon" onClick={()=>{
            const selector = document.getElementById(props.id)
            const del = []
            for (const child of selector?.children||[]) {
                if (child.id != "invalid") {
                    if (!child.classList.contains("hidden")) {
                        del.push(child.id)
                        console.log("delete: ",".card#"+child.id)
                        console.log("delete: ",".selectable#"+child.id)
                    }
                }
            }
            for (const todel of del) {
                document.querySelector(".card#"+todel)?.remove()
                document.querySelector(".selectable#"+todel)?.remove()
            }
            const header = document.querySelector(".header > .header_segment")
            if (header != undefined) {
                header.innerHTML = props.title
            }
        }}>{"\ue902"}</div>
    </div>
  );
}

//  onClick={()=>{
//             // const top = document.querySelector("#"+props.popup.id)
//             // if (top != undefined) {
//             //     top.classList.remove("hidden")
//             //     const title = top.querySelector("div > h1")
//             //     if (title != undefined) {
//             //         console.log(title)
//             //         title.innerHTML = props.popup.title
//             //     }
//             //     const content = top.querySelector(".content")
//             //     if (content != undefined) {
//             //         console.log(props.popup.content)
//             //         content.replaceChildren(props.popup.content)
//             //     }
//             // }
//         }}