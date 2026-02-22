import { TranslatorMic } from "./TranslatorMic";
import { TranslatorSwap } from "./TranslatorSwap";

export function TranslatorBottom() {
    return (
        <div className="flex flex-col items-center justify-center h-51 gap-6 ">
            <TranslatorSwap />
            <TranslatorMic />
        </div>
    );
}