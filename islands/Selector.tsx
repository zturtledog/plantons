interface SelectorProps {
  id: string,
  sub: Map<string, any>,
  def: any
}

export function Selector(props: SelectorProps) {
    const children = []

    for (const [k,v] of props.sub) {
        children.push((
            <div id={k} class="hidden selectable">
                {v}
            </div>
        ))
    }
  
    return (
        <div id={props.id} class="selector">
            {props.def}
            {children}
        </div>
    );
}
