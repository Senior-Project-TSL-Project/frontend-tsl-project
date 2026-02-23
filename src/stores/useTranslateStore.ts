import { create } from "zustand";

interface TranslateState {
  sourceLang: {
	id: string;
	text: string;
  };
  targetLang: {
	id: string;
	text: string;
  };
  model: 'mt5' | 'llm';
  textInput: string;
  translationResult: string;
  confidence: number;
  isLoading: boolean;
  isMic: boolean;
  setSourceLang: (lang: { id: string; text: string }) => void;
  setTargetLang: (lang: { id: string; text: string }) => void;
  setModel: (model: 'mt5' | 'llm') => void;
  setTextInput: (text: string) => void;
  setTranslationResult: (result: string, confidence: number) => void;
  setIsLoading: (loading: boolean) => void;
  setIsMic: (isMic: boolean) => void;
  toggleMic: () => void;
  swapLanguages: () => void;
}

export const useTranslateStore = create<TranslateState>((set) => ({
  sourceLang: { id: "", text: "" },
  targetLang: { id: "", text: "" },
  model: 'mt5',
  textInput: '',
  translationResult: '',
  confidence: 0,
  isLoading: false,
  isMic: false,
  setSourceLang: (lang: { id: string; text: string }) => set({ sourceLang: lang }),
  setTargetLang: (lang: { id: string; text: string }) => set({ targetLang: lang }),
  setModel: (model: 'mt5' | 'llm') => set({ model }),
  setTextInput: (text: string) => set({ textInput: text }),
  setTranslationResult: (result: string, confidence: number) => set({ translationResult: result, confidence }),
  setIsLoading: (loading: boolean) => set({ isLoading: loading }),
  setIsMic: (isMic: boolean) => set({ isMic }),
  toggleMic: () => set((state) => ({ isMic: !state.isMic })),

  swapLanguages: () =>
    set((state) => ({
      sourceLang: state.targetLang,
      targetLang: state.sourceLang,
    })),
}));
