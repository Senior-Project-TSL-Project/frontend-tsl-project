import { create } from "zustand";

interface TranslateState {
  sourceLang: {
    id: string;
    label: string;
  };
  targetLang: {
    id: string;
    label: string;
  };
  model: string;
  textInput: string;
  translationResult: string;
  confidence: number;
  isLoading: boolean;
  isMic: boolean;
  setSourceLang: (lang: {
    id: string;
    label: string;
    disabled?: boolean;
  }) => void;
  setTargetLang: (lang: {
    id: string;
    label: string;
    disabled?: boolean;
  }) => void;
  setModel: (model: string) => void;
  setTextInput: (text: string) => void;
  setTranslationResult: (result: string, confidence: number) => void;
  setIsLoading: (loading: boolean) => void;
  setIsMic: (isMic: boolean) => void;
  toggleMic: () => void;
  swapLanguages: () => void;
}

export const useTranslateStore = create<TranslateState>((set) => ({
  sourceLang: { id: "", label: "", disabled: false },
  targetLang: { id: "", label: "", disabled: false },
  model: "",
  textInput: "",
  translationResult: "",
  confidence: 0,
  isLoading: false,
  isMic: false,
  setSourceLang: (lang: { id: string; label: string; disabled?: boolean }) =>
    set({ sourceLang: lang }),
  setTargetLang: (lang: { id: string; label: string; disabled?: boolean }) =>
    set({ targetLang: lang }),
  setModel: (model: string) => set({ model }),
  setTextInput: (text: string) => set({ textInput: text }),
  setTranslationResult: (result: string, confidence: number) =>
    set({ translationResult: result, confidence }),
  setIsLoading: (loading: boolean) => set({ isLoading: loading }),
  setIsMic: (isMic: boolean) => set({ isMic }),
  toggleMic: () => set((state) => ({ isMic: !state.isMic })),

  swapLanguages: () =>
    set((state) => ({
      sourceLang: { ...state.targetLang },
      targetLang: { ...state.sourceLang },
    })),
}));
