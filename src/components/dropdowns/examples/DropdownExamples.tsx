"use client";

import { useState } from "react";
import { DropdownInput } from "../DropdownInput";
import { DropdownItemProps } from "../DropdownItem";

// Sample data
const languageOptions: DropdownItemProps[] = [
    { id: "th", label: "ไทย", icon: "twemoji:flag-thailand" },
    { id: "en", label: "English", icon: "twemoji:flag-united-states" },
    { id: "jp", label: "日本語", icon: "twemoji:flag-japan" },
    { id: "kr", label: "한국어", icon: "twemoji:flag-south-korea" },
    { id: "cn", label: "中文", icon: "twemoji:flag-china" },
];

const fruitOptions: DropdownItemProps[] = [
    { id: "apple", label: "Apple 🍎" },
    { id: "banana", label: "Banana 🍌" },
    { id: "orange", label: "Orange 🍊" },
    { id: "grape", label: "Grape 🍇" },
    { id: "strawberry", label: "Strawberry 🍓" },
    { id: "watermelon", label: "Watermelon 🍉" },
    { id: "mango", label: "Mango 🥭" },
    { id: "pineapple", label: "Pineapple 🍍" },
];

export function DropdownExamples() {
    const [selectedLanguage, setSelectedLanguage] = useState<string | null>("th");
    const [selectedFruit, setSelectedFruit] = useState<string | null>(null);
    const [selectedModel, setSelectedModel] = useState<string | null>(null);

    return (
        <div className="min-h-screen bg-gray-50 p-8">
            <div className="max-w-4xl mx-auto space-y-8">
                {/* Header */}
                <div className="text-center mb-12">
                    <h1 className="text-4xl font-bold text-gray-900 mb-2">
                        Dropdown Examples
                    </h1>
                    <p className="text-gray-600">
                        SOLID-compliant dropdown components with mobile & desktop support
                    </p>
                </div>

                {/* Desktop Examples */}
                <section className="bg-white rounded-3xl shadow-lg p-8 space-y-6">
                    <h2 className="text-2xl font-bold text-gray-800 border-b pb-4">
                        🖥️ Desktop Mode
                    </h2>

                    {/* Example 1: Basic Primary Dropdown */}
                    <div className="space-y-3">
                        <label className="block text-sm font-semibold text-gray-700">
                            1. Primary Pattern (No Search)
                        </label>
                        <DropdownInput
                            pattern="primary"
                            size={48}
                            items={languageOptions}
                            selectedId={selectedLanguage}
                            onSelectionChange={setSelectedLanguage}
                            placeholder="Select language"
                            useMobileMode={false}
                            searchable={false}
                        />
                        <p className="text-sm text-gray-500">
                            Selected: <span className="font-mono">{selectedLanguage || "none"}</span>
                        </p>
                    </div>

                    {/* Example 2: Secondary with Search */}
                    <div className="space-y-3">
                        <label className="block text-sm font-semibold text-gray-700">
                            2. Secondary Pattern (With Search)
                        </label>
                        <DropdownInput
                            pattern="secondary"
                            size={48}
                            items={fruitOptions}
                            selectedId={selectedFruit}
                            onSelectionChange={setSelectedFruit}
                            placeholder="Select your favorite fruit"
                            useMobileMode={false}
                            searchable={true}
                            searchPlaceholder="Search fruits..."
                            canClearSelected={true}
                            groupLabel="Fruits"
                        />
                        <p className="text-sm text-gray-500">
                            Selected: <span className="font-mono">{selectedFruit || "none"}</span>
                        </p>
                    </div>

                    {/* Example 3: Tertiary Small Size */}
                    <div className="space-y-3">
                        <label className="block text-sm font-semibold text-gray-700">
                            3. Tertiary Pattern (Size 36)
                        </label>
                        <DropdownInput
                            pattern="tertiary"
                            size={36}
                            items={languageOptions}
                            placeholder="Compact dropdown"
                            useMobileMode={false}
                            searchable={false}
                        />
                    </div>

                    {/* Example 4: API Endpoint */}
                    <div className="space-y-3">
                        <label className="block text-sm font-semibold text-gray-700">
                            4. API Data Source (Models Dropdown)
                        </label>
                        <DropdownInput
                            pattern="secondary"
                            size={48}
                            endpoint="/models-dropdown"
                            valueKey="model_id"
                            labelKey="model_name"
                            selectedId={selectedModel}
                            onSelectionChange={setSelectedModel}
                            placeholder="Select AI model"
                            useMobileMode={false}
                            searchable={true}
                            searchPlaceholder="Search models..."
                            onLoading={(loading) => console.log("Loading:", loading)}
                            onLoadComplete={(data) => console.log("Loaded:", data)}
                        />
                        <p className="text-sm text-gray-500">
                            Selected: <span className="font-mono">{selectedModel || "loading..."}</span>
                        </p>
                        <p className="text-xs text-gray-400 italic">
                            💡 This dropdown fetches data from /api/models-dropdown
                        </p>
                    </div>

                    {/* Example 5: Disabled State */}
                    <div className="space-y-3">
                        <label className="block text-sm font-semibold text-gray-700">
                            5. Disabled State
                        </label>
                        <DropdownInput
                            pattern="secondary"
                            size={48}
                            items={languageOptions}
                            placeholder="This is disabled"
                            disabled
                            useMobileMode={false}
                        />
                    </div>
                </section>

                {/* Mobile Examples */}
                <section className="bg-white rounded-3xl shadow-lg p-8 space-y-6">
                    <h2 className="text-2xl font-bold text-gray-800 border-b pb-4">
                        📱 Mobile Mode (Bottom Sheet)
                    </h2>

                    {/* Example 6: Mobile Primary */}
                    <div className="space-y-3">
                        <label className="block text-sm font-semibold text-gray-700">
                            6. Mobile - Primary with Bottom Sheet
                        </label>
                        <DropdownInput
                            pattern="primary"
                            size={48}
                            items={languageOptions}
                            placeholder="Select language"
                            useMobileMode={true}
                            searchable={true}
                            bottomSheetTitle="Select Language"
                        />
                    </div>

                    {/* Example 7: Mobile Secondary with Search */}
                    <div className="space-y-3">
                        <label className="block text-sm font-semibold text-gray-700">
                            7. Mobile - Secondary with Search
                        </label>
                        <DropdownInput
                            pattern="secondary"
                            size={48}
                            items={fruitOptions}
                            placeholder="Choose a fruit"
                            useMobileMode={true}
                            searchable={true}
                            searchPlaceholder="Search fruits..."
                            bottomSheetTitle="Select Your Favorite Fruit"
                            groupLabel="All Fruits"
                        />
                    </div>

                    {/* Example 8: Mobile API */}
                    <div className="space-y-3">
                        <label className="block text-sm font-semibold text-gray-700">
                            8. Mobile - API Data with Bottom Sheet
                        </label>
                        <DropdownInput
                            pattern="secondary"
                            size={48}
                            endpoint="/models-dropdown"
                            valueKey="model_id"
                            labelKey="model_name"
                            placeholder="Select AI model"
                            useMobileMode={true}
                            searchable={true}
                            searchPlaceholder="Search models..."
                            bottomSheetTitle="Choose AI Model"
                            groupLabel="Available Models"
                        />
                    </div>
                </section>

                {/* Code Examples */}
                <section className="bg-linear-to-br from-gray-900 to-gray-800 rounded-3xl shadow-lg p-8 space-y-6">
                    <h2 className="text-2xl font-bold text-white border-b border-gray-700 pb-4">
                        💻 Code Examples
                    </h2>

                    {/* Basic Example */}
                    <div className="space-y-2">
                        <h3 className="text-lg font-semibold text-gray-200">Basic Usage</h3>
                        <pre className="bg-gray-950 p-4 rounded-xl overflow-x-auto">
                            <code className="text-sm text-green-400">{`// Desktop mode with static items
const [selected, setSelected] = useState<string | null>(null);

<DropdownInput
  pattern="secondary"
  size={48}
  items={[
    { id: "1", label: "Option 1" },
    { id: "2", label: "Option 2" }
  ]}
  selectedId={selected}
  onSelectionChange={setSelected}
  placeholder="Select option"
  useMobileMode={false}
  searchable={true}
/>`}</code>
                        </pre>
                    </div>

                    {/* API Example */}
                    <div className="space-y-2">
                        <h3 className="text-lg font-semibold text-gray-200">API Data Source</h3>
                        <pre className="bg-gray-950 p-4 rounded-xl overflow-x-auto">
                            <code className="text-sm text-blue-400">{`// Fetch from API endpoint
<DropdownInput
  pattern="secondary"
  endpoint="/api/models-dropdown"
  valueKey="model_id"
  labelKey="model_name"
  selectedId={selectedModel}
  onSelectionChange={setSelectedModel}
  useMobileMode={false}
  searchable={true}
  onLoading={(loading) => console.log(loading)}
  onLoadComplete={(data) => console.log(data)}
/>`}</code>
                        </pre>
                    </div>

                    {/* Mobile Example */}
                    <div className="space-y-2">
                        <h3 className="text-lg font-semibold text-gray-200">Mobile Mode</h3>
                        <pre className="bg-gray-950 p-4 rounded-xl overflow-x-auto">
                            <code className="text-sm text-purple-400">{`// Mobile mode with bottom sheet
<DropdownInput
  pattern="primary"
  items={options}
  placeholder="Select"
  useMobileMode={true}
  bottomSheetTitle="Choose Option"
  searchable={true}
  searchPlaceholder="Search..."
/>`}</code>
                        </pre>
                    </div>
                </section>

                {/* Features */}
                <section className="bg-white rounded-3xl shadow-lg p-8">
                    <h2 className="text-2xl font-bold text-gray-800 border-b pb-4 mb-6">
                        ✨ Features
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="flex items-start space-x-3">
                            <span className="text-green-500 text-xl">✓</span>
                            <div>
                                <h4 className="font-semibold">SOLID Principles</h4>
                                <p className="text-sm text-gray-600">Clean, maintainable architecture</p>
                            </div>
                        </div>
                        <div className="flex items-start space-x-3">
                            <span className="text-green-500 text-xl">✓</span>
                            <div>
                                <h4 className="font-semibold">Mobile & Desktop</h4>
                                <p className="text-sm text-gray-600">Responsive design with bottom sheet</p>
                            </div>
                        </div>
                        <div className="flex items-start space-x-3">
                            <span className="text-green-500 text-xl">✓</span>
                            <div>
                                <h4 className="font-semibold">Searchable</h4>
                                <p className="text-sm text-gray-600">Built-in search functionality</p>
                            </div>
                        </div>
                        <div className="flex items-start space-x-3">
                            <span className="text-green-500 text-xl">✓</span>
                            <div>
                                <h4 className="font-semibold">API Integration</h4>
                                <p className="text-sm text-gray-600">Fetch data from endpoints</p>
                            </div>
                        </div>
                        <div className="flex items-start space-x-3">
                            <span className="text-green-500 text-xl">✓</span>
                            <div>
                                <h4 className="font-semibold">Controlled/Uncontrolled</h4>
                                <p className="text-sm text-gray-600">Flexible state management</p>
                            </div>
                        </div>
                        <div className="flex items-start space-x-3">
                            <span className="text-green-500 text-xl">✓</span>
                            <div>
                                <h4 className="font-semibold">Type Safe</h4>
                                <p className="text-sm text-gray-600">Full TypeScript support</p>
                            </div>
                        </div>
                        <div className="flex items-start space-x-3">
                            <span className="text-green-500 text-xl">✓</span>
                            <div>
                                <h4 className="font-semibold">Auto-position</h4>
                                <p className="text-sm text-gray-600">Smart dropdown positioning</p>
                            </div>
                        </div>
                        <div className="flex items-start space-x-3">
                            <span className="text-green-500 text-xl">✓</span>
                            <div>
                                <h4 className="font-semibold">Click Outside</h4>
                                <p className="text-sm text-gray-600">Auto-close on outside click</p>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </div>
    );
}
