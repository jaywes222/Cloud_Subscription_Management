// EmojiPickerComponent.jsx
import React from "react";
import Picker from "@emoji-mart/react";
import data from "@emoji-mart/data";
import { customEmojis } from "./custom-emojis";

const EmojiPickerComponent = ({ onSelectEmoji }) => {
  const handleEmojiSelect = (emoji) => {
    console.log(emoji, "emoji");
    onSelectEmoji(emoji.native);
  };

  return (
    <div className="relative w-full !max-w-8">
      <Picker
        data={data}
        custom={customEmojis}
        categories={["pharmtech_workflow"]} // custom category only
        categoryIcons={{
          pharmtech_workflow: {
            svg: `
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512">
                <path d="M576 0H64C28.65 0 0 28.65 0 64v384c0 35.35 28.65 64 64 64h512c35.35 0 64-28.65 64-64V64C640 28.65 611.3 0 576 0zM320 448c-70.69 0-128-57.31-128-128s57.31-128 128-128s128 57.31 128 128S390.7 448 320 448z"/>
              </svg>
            `,
          },
        }}
        onEmojiSelect={handleEmojiSelect}
        emojiSize={20}
        showPreview={false}
        showSkinTones={false}
        theme="light"
        navPosition="top"
        maxFrequentRows={0}
        emojiButtonColors={["rgba(102, 51, 153, .2)"]}
        className="h-[40px]"
      />
    </div>
  );
};

export default EmojiPickerComponent;
