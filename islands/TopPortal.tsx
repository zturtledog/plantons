interface TopPortalProps {
    exit_click: boolean,
    title: string,
    id?: string,
}

export function TopPortal(props: IntrinsicAttributes & TopPortalProps) {
    return (
        <div
        class="top_portal" 
        id={props.id||""}
        onMouseDown={(e)=>{
            if (e.target != undefined && props.exit_click) {
                if (e.target.classList.contains("top_portal")) {
                    e.target.classList.add("hidden")
                }
            }
        }}
        >
            <div>
                <h1>{props.title}</h1>
                <div>{props.children}</div>
            </div>
        </div>
    );
}
