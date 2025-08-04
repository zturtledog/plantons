# **Plantons**

[ai was not used] [made with fresh] [repo]

run with deno task start

## \_what is it?

   Plantons is a website that runs locally; it helps you keep track of what plants you have and when to water them. It is theoretically responsive for all sorts of devices, though I wouldn’t recommend it. There is no real reason to use this, I just think it is fun :)

## \_architecture.

Because the project was made with the fresh framework, it inherits the architecture that the framework uses. So let’s go over how the app is architected within said framework.
###\_\_islands
Islands are little bits of interactivity on a webpage, throughout the application, islands allow for the page to be modified, because they contain the only javascript that is shipped to the client. The parts of the page that use islands include:

* The cards on the sidebar that change the page to reflect the current plant
* The header, specifically the add and delete buttons
* The add plant form, with the custom submit button

### \_\_routes
Each page is defined as a route, much like other frameworks. In this case there are two routes, / and /add the first is the main page, which contains all the stuff you need, specifically a list of all the plants and their information. The second /add (which is a page that allows the user to create a new plant entry) route exists because I don’t have time to properly architect the form as a floating box. It being a separate page serves two simple purposes, 1: it means I don’t need to live rerender the main page on the client, and 2: it is far easier to architect the form as a link to a separate page than to work it into the document layout.
 ### \_\_database
The database is designed separately because there is no native database for fresh (an argument could be made for deno kv). The database stored each plant entry in a .def file, which looks like this:
```js
name: Basil
id: d60dae04-7cab-469a-8298-d740bf4affde
img: basil.png
days: smt_tfs
description: it a plant
```
This file can be requested by filename from the database, the image is retrieved from the static files directory because that is the only place fresh can see them, otherwise they would be stored with the def files

## \_design language.

The visual design of the app follows the noal design scheme, which entails these key elements:

* Hover motion, when hovering on an element it should move or change in some way, either rotating, growing, or changing color.
* 6 color theme (background, middleground, middleground_active, foreground, foreground_active, accent)
* Rounded corners, usually 5px
* Use rounded fonts for headers (and some choice elements), and contrasting monospaced fonts for body text
* Icons are from google fonts (more specifically, material icons)

## \_some of the code (just for fun :) )

### From the code(tsx) that constructs the watering indicator:
```tsx
interface TimesProps {
  days: string,
}

export function Times(_props_: TimesProps) {
    const days = []
    let i = 0;
    for (const chr of props.days) {
        days.push((
            <div
                _class_={chr!='_'?"day_active":"day_inactive"}>{"smtwtfs"[i%7]}
            </div>
        ))
        i++
    }
    return (
        <div _class_="days">
            {days}
        </div>
    );
}
```
### From the code(css) that styles the button on the add plant form:
```css
button {
    width: 20%;
    font-family: inherit;
    border-radius: 5px;
    margin: 5px;
    padding: 5px;
    margin-left: calc(5% - 5px);
    border-style: none;
    background-color: var(--foreground);
    transition: transform 0.25s;
}

button:hover {
    transform: scale(1.12);
    background-color: var(--foreground_active);
    transition: transform 0.25s;
}
```

## \_conclusion

I think that this has been an exercise that has broadened at least my understanding of the fresh framework and typescript, though I think that the visual design language could use some more work, as well as the css.