"use client";

import { Body } from "@/components/screen/Body/Body";
import { TranslateTextBox } from "@/components/screen/Body/TranslateTextBox";
import { Footer } from "@/components/screen/Footer/Footer";
import { TranslatorMic } from "@/components/screen/Footer/TranslatorMic";
import { TranslatorSwap } from "@/components/screen/Footer/TranslatorSwap";
import { Header } from "@/components/screen/Header/Header";

export default function View() {
    return (
        <div className="min-h-screen flex flex-col bg-[linear-gradient(100deg,var(--loading-bg-first),var(--loading-bg-last))]">
            <Header />

            <Body>
                {/* Desktop: แสดงด้านบน */}
                <div className="hidden md:block">
                    <TranslatorSwap
                        pattern="tertiary"
                        width="480px"
                        align="center"
                    />
                </div>

                <TranslateTextBox />

                {/* Desktop: แสดง Mic ด้านล่าง */}
                <div className="hidden md:block">
                    <TranslatorMic />
                </div>
            </Body>

            {/* Mobile: Footer */}
            <Footer className="md:hidden">
                <TranslatorSwap
                    pattern="secondary"
                    align="center"
                    useMobileMode
                />
                <TranslatorMic />
            </Footer>
        </div>
    );
}