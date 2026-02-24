import { IconButton } from "@/components/buttons/IconButton";
import { useTranslateStore } from "@/stores/useTranslateStore";

export function TranslatorMic() {
    const { isMic, toggleMic } = useTranslateStore();
    return (
        <div className="relative flex items-center justify-center">
            {/* Animated circles behind the button when mic is active */}
            {isMic && (
                <>
                    <div className="absolute w-16 h-16 bg-blue-400 rounded-full opacity-75 animate-ping" />
                </>
            )}
            
            {/* Button */}
            <div className="relative z-10">
                {!isMic ? (
                    <IconButton icon="material-symbols:mic-outline-rounded" size={40} pattern="brand-inverted" onClick={toggleMic} />
                ) : (
                    <IconButton icon="material-symbols:stop-rounded" size={40} pattern="brand-inverted" onClick={toggleMic} />
                )}
            </div>
        </div>
    );
}