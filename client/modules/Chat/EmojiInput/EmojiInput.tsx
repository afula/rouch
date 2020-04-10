import 'emoji-mart/css/emoji-mart.css';
// import React, { useState, useCallback, useRef } from 'react';
import React, {  useRef } from 'react';

// import useClickOutside from "foundations/hooks/useClickOutside";
import { Picker, EmojiData } from 'emoji-mart';
// import { FunnyEmojiIcon } from "foundations/components/icons/FunnyEmojiIcon";
// import { Dialog } from './EmojiInput.style';
import Dialog from '../../../components/Dialog';
interface EmojiInputProps {
  // value: string;
    showPicker: boolean,
  onSelection(contentWithEmoji: string): any;
}

const EmojiInput = ({ showPicker, onSelection }: EmojiInputProps) => {
    // const [showPicker, setPickerState] = useState(false);
    const picker = useRef<HTMLDivElement>(null);

    // const dismissPicker = useCallback(() => {
    //     setPickerState(false);
    // }, [setPickerState]);

    // useClickOutside([picker], dismissPicker);

    // const togglePicker = () => {
    //     setPickerState(!showPicker);
    // };

    const addEmoji = (emoji: EmojiData) => {
        if ('native' in emoji) {
            onSelection(`${emoji.native}`);
            // dismissPicker();
        }
    };

    return (
        <div ref={picker}>
            {/*<Dialog>*/}
                <Picker emoji="" title="" native onSelect={addEmoji} />
            {/*</Dialog>*/}
            {/*<Dialog>*/}
            {/*    {showPicker && (*/}
            {/*        <Picker emoji="" title="" native onSelect={addEmoji} />*/}
            {/*    )}*/}
            {/*</Dialog>*/}
            {/*<EmojiButton onClick={togglePicker}>*/}
            {/*    /!*<FunnyEmojiIcon title="Open emoji selector" />*!/*/}
            {/*</EmojiButton>*/}
        </div>
    );
};

export default EmojiInput;
