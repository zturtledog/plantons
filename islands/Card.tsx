import { Times } from "./Times.tsx";

interface CardProps {
  name: string,
  icon: string | undefined
  open: {id: string, select: string},
  tag: any,
}

export function Card(props: CardProps) {
  return (
    <div class="card" id={props.open.select} onClick={()=>{
        const selector = document.getElementById(props.open.id);
        for (const child of selector?.children||[]) {
            if (child.id != "invalid") {
                if (!child.classList.contains("hidden")) {
                    child.classList.add("hidden")
                }
            }
        }
        const self = document.querySelector("#"+props.open.id+" > #"+props.open.select)
        const header = document.querySelector(".header > .header_segment")
        if (header != undefined) {
            header.innerHTML = props.name
        }

        self?.classList.remove("hidden")
    }}>
        {props.icon != undefined ? <img src={props.icon}></img> : ""}
        <span>{props.name}</span>
        <Times days={props.tag} />
    </div>
  );
}
