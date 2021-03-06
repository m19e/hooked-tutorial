import React, { useState } from "react";
import "./Text.css";

const initialPosition = {
    y: 0,
    x: 0,
};

const Text = (): JSX.Element => {
    const [text, setText] = useState("");
    const [position, setPosition] = useState(initialPosition);
    const [arrow, setArrow] = useState("◇");

    const getPosition = (draft: string, i: number): any => {
        const ahead = draft.slice(0, i);
        const y = (ahead.match(/\n/g) || []).length;
        let x = ahead.split("").reverse().indexOf("\n");
        if (x < 0) x = i;

        return { y: y, x: x };
    };

    const getNextSelection = (draft: string, y: number, x: number): number => {
        const next = draft.split("\n").slice(0, y).join("");
        if (y < 0) return 0;
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
            const { y, x } = getPosition(text, start);

            // console.log(`Now  => start: ${start}, end: ${end}`);

            switch (e.key) {
                case "ArrowDown":
                    setArrow("↓");
                    ta.setSelectionRange(start + 1, start + 1);
                    break;
                case "ArrowUp":
                    setArrow("↑");
                    if (start === 0) return;
                    ta.setSelectionRange(start - 1, start - 1);
                    break;
                case "ArrowLeft":
                    setArrow("←");
                    const next = getNextSelection(text, y + 1, x);
                    ta.setSelectionRange(next, next);
                    break;
                case "ArrowRight":
                    setArrow("→");
                    const prev = getNextSelection(text, y - 1, x);
                    ta.setSelectionRange(prev, prev);
                    break;
                default:
                    break;
            }
            // console.log(
            //     `Step => start: ${ta.selectionStart}, end: ${ta.selectionEnd}`
            // );
            // console.log(JSON.stringify(getPosition(text, ta.selectionStart)));
            setPosition(getPosition(text, ta.selectionStart));
        }
    };

    return (
        <div>
            <h2>{arrow}</h2>
            <h3>{JSON.stringify({ x: position.y, y: position.x })}</h3>
            <textarea
                className="tate"
                rows={20}
                cols={40}
                onChange={handleChange}
                onKeyDown={handleKeyDown}
            />
        </div>
    );
};

export default Text;
