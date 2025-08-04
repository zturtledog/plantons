import { Times } from "./Times.tsx";

export function AddForm() {
    return (
        <form onSubmit={(e)=>{
            if (e.target != null) {
                const name = e.target.querySelector('input[name="name"]').value
                const days = e.target.querySelector('input[name="days"]').value
                const desc = e.target.querySelector('textarea').value
            }

            e.preventDefault()
        }}>
            <h3>Name</h3>
            <input type="text" name="name" value="" required />
            <h3>Days</h3>
            <p style="margin-left:5px;">
                put an _ on days the plant won't be watered, any other character marks
                the day as watering, ex:{" "}
                <div style="display:flex;flex-direction:row;gap:5px;text-align:center;align-items:center;">
                <code>"hh__hh_" =</code>
                <Times days="hh__hh_" />
                </div>
            </p>
            <input type="text" name="days" value="" required />
            <h3>Image</h3>
            <input type="file" id="image" name="image" accept="image/*" />
            <h3>Description</h3>
            <textarea name="description" required />
            <h3>Submit</h3>
            <button name="submit">submit</button>
        </form>
    );
}
