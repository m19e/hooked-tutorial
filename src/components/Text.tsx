import React, { useState } from "react";

const Text = (): JSX.Element => {
    const [text, setText] = useState("");
    const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setText(e.target.value);
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
        if (e.key.includes("Arrow")) {
            e.preventDefault();
            console.log(`pressed ${e.key} key`);

            const ta = e.target as HTMLTextAreaElement;
            const start = ta.selectionStart;
            const end = ta.selectionEnd;

            console.log(`start: ${start}, end: ${end}`);

            switch (e.key) {
                case "ArrowDown":
                    ta.setSelectionRange(start + 1, start + 1);
                    break;
                case "ArrowUp":
                    if (start === 0) return;
                    ta.setSelectionRange(start - 1, start - 1);
                    break;
                case "ArrowLeft":
                    break;
                case "ArrowRight":
                    break;
                default:
                    break;
            }
        }
    };

    return (
        <textarea onChange={handleChange} onKeyDown={handleKeyDown}></textarea>
    );
};

export default Text;
