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
  translationResult: string;
  confidence: number;
  isLoading: boolean;
  setSourceLang: (lang: { id: string; text: string }) => void;
  setTargetLang: (lang: { id: string; text: string }) => void;
  setModel: (model: 'mt5' | 'llm') => void;
  setTranslationResult: (result: string, confidence: number) => void;
  setIsLoading: (loading: boolean) => void;
  swapLanguages: () => void;
}

export const useTranslateStore = create<TranslateState>((set) => ({
  sourceLang: { id: "", text: "" },
  targetLang: { id: "", text: "" },
  model: 'mt5',
  translationResult: '',
  confidence: 0,
  isLoading: false,
  setSourceLang: (lang: { id: string; text: string }) => set({ sourceLang: lang }),
  setTargetLang: (lang: { id: string; text: string }) => set({ targetLang: lang }),
  setModel: (model: 'mt5' | 'llm') => set({ model }),
  setTranslationResult: (result: string, confidence: number) => set({ translationResult: result, confidence }),
  setIsLoading: (loading: boolean) => set({ isLoading: loading }),

  swapLanguages: () =>
    set((state) => ({
      sourceLang: state.targetLang,
      targetLang: state.sourceLang,
    })),
}));
