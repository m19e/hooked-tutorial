import React, { useState } from "react";

const initialPosition = {
    y: 0,
    x: 0,
};

const Text = (): JSX.Element => {
    const [text, setText] = useState("");
    const [position, setPosition] = useState(initialPosition);

    const getPosition = (draft: string, i: number): any => {
        const ahead = draft.slice(0, i);
        const y = (ahead.match(/\n/g) || []).length;
        let x = ahead.split("").reverse().indexOf("\n");
        if (x < 0) x = i;

        return { y: y, x: x };
    };

    const getNextSelection = (draft: string, y: number, x: number): number => {
        const next = draft.split("\n").slice(0, y).join("");
        if (y === 0 && next.length === 0) return 0;
        return next.length + y + x;
    };

    const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setText(e.target.value);
        const ta = e.target as HTMLTextAreaElement;
        const start = ta.selectionStart;
        setPosition(getPosition(e.target.value, start));
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
        if (e.key.includes("Arrow")) {
            e.preventDefault();
            console.log(`pressed ${e.key} key`);

            const ta = e.target as HTMLTextAreaElement;
            const start = ta.selectionStart;
            const end = ta.selectionEnd;

            console.log(`Now  => start: ${start}, end: ${end}`);

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
            console.log(
                `Step => start: ${ta.selectionStart}, end: ${ta.selectionEnd}`
            );
            console.log(JSON.stringify(getPosition(text, ta.selectionStart)));
        }
    };

    return <textarea onChange={handleChange} onKeyDown={handleKeyDown} />;
};

export default Text;
