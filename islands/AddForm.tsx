import { Times } from "./Times.tsx";

export function AddForm() {
    return (
        <form enctype="multipart/form-data" onSubmit={async (e)=>{
            e.preventDefault()
            if (e.target != null) {
                const name = e.target.querySelector('input[name="name"]').value
                const days = e.target.querySelector('input[name="days"]').value
                const desc = e.target.querySelector('textarea').value
                const file = e.target.querySelector('#image').files[0]; // Get the first selected file
                let fileContents;
                if (file) {
                    const reader = new FileReader();

                    reader.onload = async function(e) {
                        fileContents = e.target.result; // The content of the file
                        console.log(fileContents); // You can now use or display fileContents
                        try {
                            const response = await fetch("/add", {
                                method: "POST",
                                body: JSON.stringify({
                                    name,days,desc,fileContents,fname: file.name.split(".")[file.name.split(".").length-1]
                                }), // Send the FormData object as the request body
                            });
                            
                            if (response.ok) {
                                const result = await response.json();
                                console.log('Upload successful:', result);
                                // Handle success, e.g., display a message, clear form
                            } else {
                                console.error('Upload failed:', response.statusText);
                                // Handle errors
                            }
                        } catch (error) {
                            console.error('Network error during upload:', error);
                        }
                    };

                    // Choose the appropriate method to read the file:
                    reader.readAsDataURL(file); // For text-based files (e.g., .txt, .html, .css)
                    // reader.readAsDataURL(file); // For images or other binary files, provides a base64 encoded URL
                    // reader.readAsArrayBuffer(file); // For raw binary data
                } else
                
                try {
                    const response = await fetch("/add", {
                        method: "POST",
                        body: JSON.stringify({
                            name,days,desc
                        }), // Send the FormData object as the request body
                    });
                    
                    if (response.ok) {
                        const result = await response.json();
                        console.log('Upload successful:', result);
                        // Handle success, e.g., display a message, clear form
                    } else {
                        console.error('Upload failed:', response.statusText);
                        // Handle errors
                    }
                } catch (error) {
                    console.error('Network error during upload:', error);
                }
            }    
            // window.location.assign("/");
            window.location.replace("/");
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
