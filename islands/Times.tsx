interface TimesProps {
  days: string,
}

export function Times(props: TimesProps) {
    const days = []
    let i = 0;
    for (const chr of props.days) {
        days.push((
            <div class={chr!='_'?"day_active":"day_inactive"}>{"smtwtfs"[i%7]}</div>
        ))
        i++
    }
    return (
        <div class="days">
            {days}
        </div>
    );
}
