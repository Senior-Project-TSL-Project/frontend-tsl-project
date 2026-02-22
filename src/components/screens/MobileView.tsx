"use client";

import { Header } from "../mobile/Header/Header";
import { Body } from "../mobile/Body/Body";
import { TranslatorBottom } from "../mobile/Footer/TranslatorBottom";
import { TranslateTextBox } from "../mobile/Body/TranslateTextBox";

export default function MobileView() {
    return (
        <div className="min-h-screen flex flex-col bg-[linear-gradient(100deg,var(--loading-bg-first),var(--loading-bg-last))]">
            <Header />

            {/* Body - Dynamic height (takes remaining space) */}
            <Body>
                <TranslateTextBox />
            </Body>

            {/* Footer - Fixed height */}
            <TranslatorBottom />
        </div>
    );
}